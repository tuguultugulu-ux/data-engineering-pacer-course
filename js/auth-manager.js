/**
 * PACER Data Engineering - REAL Google Identity Services Authentication Engine
 * Integrated with Firebase Firestore for Real-time Global Sync
 */

var AuthManager = (function() {
    // Real Google Cloud OAuth 2.0 Client ID
    const GOOGLE_CLIENT_ID = '14912518856-9thfqfbne77r82p6kpicuv3l27aurr2q.apps.googleusercontent.com';

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

    const SESSION_KEY = 'pacer_verified_session_v4';

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
    
    // 1. Sync Approved Roster
    db.collection('settings').doc('roster').onSnapshot((doc) => {
        if (doc.exists) {
            localRoster = doc.data().emails || localRoster;
            refreshAdminUI();
        } else {
            // Seed database on first load
            db.collection('settings').doc('roster').set({ emails: localRoster }).catch(e => console.warn(e));
        }
    }, (error) => {
        console.warn("Firebase roster sync error (ensure DB is created in console):", error);
    });

    // 2. Sync Metrics (Student Progress)
    db.collection('metrics').onSnapshot((snapshot) => {
        const newMetrics = {};
        snapshot.forEach(doc => {
            newMetrics[doc.id] = doc.data();
        });
        localMetrics = newMetrics;
        refreshAdminUI();
    }, (error) => {
        console.warn("Firebase metrics sync error:", error);
    });

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

    function getApprovedRoster() {
        return localRoster;
    }

    function addApprovedUser(email) {
        const lower = email.trim().toLowerCase();
        if (lower && !localRoster.map(e=>e.toLowerCase()).includes(lower)) {
            const newRoster = [...localRoster, lower];
            db.collection('settings').doc('roster').set({ emails: newRoster }).catch(e => console.error(e));
            return true;
        }
        return false;
    }

    function removeApprovedUser(email) {
        const lower = email.trim().toLowerCase();
        if (ADMIN_EMAILS.includes(lower)) return false; // Never remove core admins
        const newRoster = localRoster.filter(e => e.toLowerCase() !== lower);
        db.collection('settings').doc('roster').set({ emails: newRoster }).catch(e => console.error(e));
        return true;
    }

    // ── Session Management (verified sessions only) ──────────────
    
    function parseJwt(token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = decodeURIComponent(atob(base64).split('').map(c =>
                '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            ).join(''));
            return JSON.parse(payload);
        } catch(e) { return null; }
    }

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

    function handleGoogleCredential(credential) {
        const payload = parseJwt(credential);
        if (!payload || !payload.email) return { success: false, error: 'Invalid token.' };

        const email = payload.email.toLowerCase();
        if (!isApproved(email)) {
            return {
                success: false,
                unauthorized: true,
                email: email,
                error: 'Access Denied: ' + email + ' is not on the approved roster.'
            };
        }

        const user = {
            email: email,
            name: payload.name || email.split('@')[0],
            picture: payload.picture || '',
            role: isAdmin(email) ? 'ADMIN' : 'STUDENT',
            verified: true,
            loggedInAt: new Date().toISOString()
        };

        setSession(user);
        return { success: true, user: user };
    }

    function logout() {
        setSession(null);
        try {
            if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
                google.accounts.id.disableAutoSelect();
            }
        } catch(e) {}
    }

    // ── Telemetry (Global Sync to Firestore) ─────────────────────
    
    function recordSolveMetric(cellId, durationSec) {
        const user = getCurrentUser();
        if (!user || !user.email) return;

        const email = user.email.toLowerCase();
        const actualDuration = Math.max(1, durationSec || 1);
        const solvedAt = new Date().toISOString();
        
        const docRef = db.collection('metrics').doc(email);
        
        // Transaction to safely update solves
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
        // Fill empty spots for roster members
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

    // ── GIS Initialization ───────────────────────────────────────
    
    function getClientId() { return GOOGLE_CLIENT_ID; }
    function setClientId(id) {} // No longer needed since it's hardcoded

    function initGoogleSignIn(buttonElementId, callback) {
        if (!GOOGLE_CLIENT_ID) return false;
        if (typeof google === 'undefined' || !google.accounts || !google.accounts.id) return false;

        google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: function(response) {
                if (response && response.credential) {
                    const result = handleGoogleCredential(response.credential);
                    if (callback) callback(result);
                }
            },
            auto_select: false,
            cancel_on_tap_outside: true
        });

        const btnEl = document.getElementById(buttonElementId);
        if (btnEl) {
            google.accounts.id.renderButton(btnEl, {
                theme: 'outline',
                size: 'large',
                width: 380,
                text: 'signin_with',
                shape: 'rectangular',
                logo_alignment: 'left'
            });
        }
        return true;
    }

    return {
        ADMIN_EMAILS: ADMIN_EMAILS,
        getCurrentUser: getCurrentUser,
        isAdmin: isAdmin,
        isApproved: isApproved,
        getApprovedRoster: getApprovedRoster,
        addApprovedUser: addApprovedUser,
        removeApprovedUser: removeApprovedUser,
        handleGoogleCredential: handleGoogleCredential,
        initGoogleSignIn: initGoogleSignIn,
        getClientId: getClientId,
        setClientId: setClientId,
        logout: logout,
        recordSolveMetric: recordSolveMetric,
        getGlobalMetrics: getGlobalMetrics
    };
})();
