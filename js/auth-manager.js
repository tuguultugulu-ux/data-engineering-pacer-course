/**
 * PACER Data Engineering - Secure Firebase Auth Engine
 * Integrated with Firebase Auth and Firestore for Global State Sync
 */

var AuthManager = (function() {
    // Firebase Configuration
    const firebaseConfig = {
      projectId: "pacer-course-14722",
      appId: "1:685757998637:web:31f1e4a5e4d0378efc3aa4",
      storageBucket: "pacer-course-14722.firebasestorage.app",
      apiKey: "AIzaSyAEVTeHCmYu01LLC5ljmZjoBUOC5OhRGP0",
      authDomain: "pacer-course-14722.firebaseapp.com",
      messagingSenderId: "685757998637"
    };

    // Initialize Firebase
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const db = firebase.firestore();
    const auth = firebase.auth();

    const SESSION_KEY = 'pacer_verified_session_v5';

    const ADMIN_EMAILS = [
        'sarantuyasarnai42@gmail.com',
        'iobama538@gmail.com',
        'tuguultugulu@gmail.com'
    ];

    let localRoster = [
        'sarantuyasarnai42@gmail.com',
        'iobama538@gmail.com',
        'tuguultugulu@gmail.com',
        'student.pacer01@gmail.com',
        'engineer.trainee@gmail.com',
        'demo.student@gmail.com'
    ];

    let localMetrics = {};

    // ── Real-Time Firebase Sync ──────────────────────────────────
    
    db.collection('settings').doc('roster').onSnapshot((doc) => {
        if (doc.exists) {
            localRoster = doc.data().emails || localRoster;
            refreshAdminUI();
        }
    }, (error) => console.warn("Firebase roster sync error:", error));

    db.collection('metrics').onSnapshot((snapshot) => {
        const newMetrics = {};
        snapshot.forEach(doc => {
            newMetrics[doc.id] = doc.data();
        });
        localMetrics = newMetrics;
        refreshAdminUI();
    }, (error) => console.warn("Firebase metrics sync error:", error));

    function refreshAdminUI() {
        if (typeof window !== 'undefined' && document.getElementById('admin-modal-backdrop') && document.getElementById('admin-modal-backdrop').style.display === 'flex') {
            if (typeof renderAdminDashboard === 'function') {
                renderAdminDashboard();
            }
        }
    }

    // ── Roster & Admin Logic ─────────────────────────────────────
    
    function isAdmin(email) {
        if (!email) return false;
        return ADMIN_EMAILS.includes(email.trim().toLowerCase());
    }

    function isApproved(email) {
        if (!email) return false;
        const lower = email.trim().toLowerCase();
        if (isAdmin(lower)) return true;
        return localRoster.map(e => e.toLowerCase()).includes(lower);
    }

    function getApprovedRoster() { return localRoster; }

    function addApprovedUser(email) {
        const lower = email.trim().toLowerCase();
        if (lower && !localRoster.map(e=>e.toLowerCase()).includes(lower)) {
            const newRoster = [...localRoster, lower];
            localRoster = newRoster; // Optimistic update
            db.collection('settings').doc('roster').set({ emails: newRoster }).catch(e => {
                console.error(e);
                alert("Database Error: Could not add user. Check Firebase Security Rules.");
            });
            return true;
        }
        return false;
    }

    function removeApprovedUser(email) {
        const lower = email.trim().toLowerCase();
        if (ADMIN_EMAILS.includes(lower)) return false; 
        const newRoster = localRoster.filter(e => e.toLowerCase() !== lower);
        localRoster = newRoster; // Optimistic update
        db.collection('settings').doc('roster').set({ emails: newRoster }).catch(e => {
            console.error(e);
            alert("Database Error: Could not remove user. Check Firebase Security Rules.");
        });
        return true;
    }

    // ── Session Management ───────────────────────────────────────
    
    function getCurrentUser() {
        try {
            const raw = localStorage.getItem(SESSION_KEY);
            if (!raw) return null;
            const session = JSON.parse(raw);
            if (!session || !session.email || !session.verified) return null;
            session.role = isAdmin(session.email) ? 'ADMIN' : 'STUDENT';
            return session;
        } catch(e) { return null; }
    }

    function setSession(user) {
        try {
            if (user) {
                localStorage.setItem(SESSION_KEY, JSON.stringify(user));
            } else {
                localStorage.removeItem(SESSION_KEY);
            }
        } catch(e) {}
    }

    // Restore session on load if Firebase remembers them
    auth.onAuthStateChanged((user) => {
        if (user && user.email) {
            const email = user.email.toLowerCase();
            
            db.collection('settings').doc('roster').get().then((doc) => {
                if (doc.exists) {
                    localRoster = doc.data().emails || localRoster;
                }
                
                if (isApproved(email)) {
                    setSession({
                        email: email,
                        name: user.displayName || email.split('@')[0],
                        picture: user.photoURL || '',
                        role: isAdmin(email) ? 'ADMIN' : 'STUDENT',
                        verified: true,
                        uid: user.uid
                    });
                    if (typeof checkAuthGate === 'function') checkAuthGate();
                } else {
                    auth.signOut();
                }
            }).catch(e => {
                // If network fails or rules block, just fallback to localRoster
                if (isApproved(email)) {
                    if (typeof checkAuthGate === 'function') checkAuthGate();
                } else {
                    auth.signOut();
                }
            });
        }
    });

    function signInWithFirebase() {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                const email = user.email.toLowerCase();
                
                // Fetch latest roster from DB now that we are authenticated
                db.collection('settings').doc('roster').get().then((doc) => {
                    if (doc.exists) {
                        localRoster = doc.data().emails || localRoster;
                    }
                    
                    if (!isApproved(email)) {
                        auth.signOut();
                        const errEl = document.getElementById('auth-error-msg');
                        if (errEl) {
                            errEl.style.display = 'block';
                            errEl.innerText = 'Access Denied: ' + email + ' is not on the approved roster.';
                        }
                        return;
                    }

                    setSession({
                        email: email,
                        name: user.displayName || email.split('@')[0],
                        picture: user.photoURL || '',
                        role: isAdmin(email) ? 'ADMIN' : 'STUDENT',
                        verified: true,
                        uid: user.uid
                    });

                    if (typeof checkAuthGate === 'function') checkAuthGate();
                    if (typeof buildSidebar === 'function') buildSidebar();
                    if (typeof ProgressTracker !== 'undefined') ProgressTracker.updateProgressUI();
                    if (typeof loadLesson === 'function' && typeof currentLessonId !== 'undefined') loadLesson(currentLessonId);
                }).catch(err => {
                    console.error("Failed to fetch roster during login", err);
                    auth.signOut();
                });
            })
            .catch((error) => {
                console.error(error);
                const errEl = document.getElementById('auth-error-msg');
                if (errEl) {
                    errEl.style.display = 'block';
                    errEl.innerText = error.message || 'Google Sign-In failed.';
                }
            });
    }

    function logout() {
        setSession(null);
        auth.signOut().then(() => {
            if (typeof checkAuthGate === 'function') checkAuthGate();
            var profileWidget = document.getElementById('sidebar-user-profile');
            if (profileWidget) profileWidget.innerHTML = '';
        });
    }

    // ── Telemetry (Global Sync to Firestore) ─────────────────────
    
    function recordSolveMetric(cellId, durationSec) {
        const user = getCurrentUser();
        if (!user || !user.email) return;

        const email = user.email.toLowerCase();
        const actualDuration = Math.max(1, durationSec || 1);
        const solvedAt = new Date().toISOString();
        
        const docRef = db.collection('metrics').doc(email);
        
        db.runTransaction((transaction) => {
            return transaction.get(docRef).then((doc) => {
                let data = doc.exists ? doc.data() : {
                    name: user.name || email.split('@')[0],
                    email: email,
                    solves: {},
                    totalCodingSec: 0
                };
                
                if (!data.solves) data.solves = {};
                data.solves[cellId] = {
                    durationSec: actualDuration,
                    solvedAt: solvedAt
                };
                
                data.lastActive = solvedAt;
                
                let total = 0;
                for (let k in data.solves) {
                    total += (data.solves[k].durationSec || 0);
                }
                data.totalCodingSec = total;
                
                transaction.set(docRef, data);
            });
        }).catch(e => console.warn("Failed to record metric in Firebase:", e));
    }

    function getGlobalMetrics() {
        const metrics = JSON.parse(JSON.stringify(localMetrics));
        localRoster.forEach(email => {
            const lower = email.toLowerCase();
            if (!metrics[lower]) {
                metrics[lower] = {
                    name: isAdmin(lower) ? lower.split('@')[0] : lower.split('@')[0],
                    email: lower,
                    lastActive: null,
                    totalCodingSec: 0,
                    solves: {}
                };
            }
        });
        return metrics;
    }

    return {
        ADMIN_EMAILS: ADMIN_EMAILS,
        getCurrentUser: getCurrentUser,
        isAdmin: isAdmin,
        isApproved: isApproved,
        getApprovedRoster: getApprovedRoster,
        addApprovedUser: addApprovedUser,
        removeApprovedUser: removeApprovedUser,
        signInWithFirebase: signInWithFirebase,
        logout: logout,
        recordSolveMetric: recordSolveMetric,
        getGlobalMetrics: getGlobalMetrics
    };
})();
