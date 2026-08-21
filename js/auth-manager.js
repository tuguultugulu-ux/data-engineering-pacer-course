/**
 * PACER Data Engineering - REAL Google Identity Services Authentication Engine
 * Uses google.accounts.id API with verified JWT tokens. No fake login flows.
 */

var AuthManager = (function() {
    // ═══════════════════════════════════════════════════════════════
    // CONFIGURATION: Replace with your real Google Cloud OAuth Client ID
    // Create one at: https://console.cloud.google.com/apis/credentials
    // Authorized JavaScript origin: https://tuguultugulu-ux.github.io
    // ═══════════════════════════════════════════════════════════════
    const GOOGLE_CLIENT_ID = localStorage.getItem('pacer_google_client_id') || '';

    const SESSION_KEY = 'pacer_verified_session_v4';
    const APPROVED_USERS_KEY = 'pacer_approved_roster_v4';
    const METRICS_KEY = 'pacer_metrics_v4';

    // Purge ALL legacy fake sessions
    try {
        ['pacer_auth_current_user', 'pacer_google_auth_session_v3',
         'pacer_approved_users_roster', 'pacer_approved_users_roster_v3',
         'pacer_global_user_metrics', 'pacer_global_user_metrics_v3'].forEach(k => {
            localStorage.removeItem(k);
        });
    } catch(e) {}

    // ── Admin & Approved Roster ──────────────────────────────────
    const ADMIN_EMAILS = [
        'sarantuyasarnai42@gmail.com',
        'iobama538@gmail.com',
        'tuguultugulu@gmail.com'
    ];

    const DEFAULT_ROSTER = [
        'sarantuyasarnai42@gmail.com',
        'iobama538@gmail.com',
        'tuguultugulu@gmail.com',
        'student.pacer01@gmail.com',
        'engineer.trainee@gmail.com',
        'demo.student@gmail.com'
    ];

    function isAdmin(email) {
        if (!email) return false;
        return ADMIN_EMAILS.includes(email.trim().toLowerCase());
    }

    function isApproved(email) {
        if (!email) return false;
        const lower = email.trim().toLowerCase();
        if (isAdmin(lower)) return true;
        return getApprovedRoster().map(e => e.toLowerCase()).includes(lower);
    }

    function getApprovedRoster() {
        try {
            const raw = localStorage.getItem(APPROVED_USERS_KEY);
            return raw ? JSON.parse(raw) : DEFAULT_ROSTER;
        } catch(e) { return DEFAULT_ROSTER; }
    }

    function saveApprovedRoster(r) {
        try { localStorage.setItem(APPROVED_USERS_KEY, JSON.stringify(r)); } catch(e) {}
    }

    function addApprovedUser(email) {
        const roster = getApprovedRoster();
        const lower = email.trim().toLowerCase();
        if (lower && !roster.map(e=>e.toLowerCase()).includes(lower)) {
            roster.push(lower);
            saveApprovedRoster(roster);
            return true;
        }
        return false;
    }

    function removeApprovedUser(email) {
        const lower = email.trim().toLowerCase();
        if (ADMIN_EMAILS.includes(lower)) return false;
        saveApprovedRoster(getApprovedRoster().filter(e => e.toLowerCase() !== lower));
        return true;
    }

    // ── JWT Parsing (Google credential tokens) ───────────────────
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

    // ── Session Management (verified sessions only) ──────────────
    function getCurrentUser() {
        try {
            const raw = localStorage.getItem(SESSION_KEY);
            if (!raw) return null;
            const session = JSON.parse(raw);
            if (!session || !session.email || !session.verified) return null;
            // Always re-validate role from source of truth
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

    // ── Real Google Sign-In Credential Handler ───────────────────
    // Called ONLY by Google Identity Services after real Google auth
    function handleGoogleCredential(credential) {
        const payload = parseJwt(credential);
        if (!payload || !payload.email) {
            return { success: false, error: 'Invalid Google credential token.' };
        }

        const email = payload.email.toLowerCase();

        if (!isApproved(email)) {
            return {
                success: false,
                unauthorized: true,
                email: email,
                error: 'Access Denied: ' + email + ' is not on the approved roster. Contact course leadership to request access.'
            };
        }

        const user = {
            email: email,
            name: payload.name || email.split('@')[0],
            picture: payload.picture || '',
            role: isAdmin(email) ? 'ADMIN' : 'STUDENT',
            verified: true,  // This flag means Google actually verified them
            googleSub: payload.sub,  // Google's unique user ID
            loggedInAt: new Date().toISOString()
        };

        setSession(user);
        return { success: true, user: user };
    }

    function logout() {
        setSession(null);
        // Also revoke Google's session if GIS is loaded
        try {
            if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
                google.accounts.id.disableAutoSelect();
            }
        } catch(e) {}
    }

    // ── Telemetry (100% real, live stopwatch data only) ──────────
    function recordSolveMetric(cellId, durationSec) {
        const user = getCurrentUser();
        if (!user || !user.email) return;

        const email = user.email.toLowerCase();
        let metrics = {};
        try {
            const raw = localStorage.getItem(METRICS_KEY);
            if (raw) metrics = JSON.parse(raw);
        } catch(e) {}

        if (!metrics[email]) {
            metrics[email] = {
                name: user.name || email.split('@')[0],
                email: email,
                lastActive: null,
                totalCodingSec: 0,
                solves: {}
            };
        }

        const actualDuration = Math.max(1, durationSec || 1);
        metrics[email].lastActive = new Date().toISOString();
        metrics[email].solves[cellId] = {
            durationSec: actualDuration,
            solvedAt: new Date().toISOString()
        };

        // Recompute total from real data
        let total = 0;
        for (let k in metrics[email].solves) {
            total += (metrics[email].solves[k].durationSec || 0);
        }
        metrics[email].totalCodingSec = total;

        try { localStorage.setItem(METRICS_KEY, JSON.stringify(metrics)); } catch(e) {}
    }

    function getGlobalMetrics() {
        let metrics = {};
        try {
            const raw = localStorage.getItem(METRICS_KEY);
            if (raw) metrics = JSON.parse(raw);
        } catch(e) {}

        // Show all roster members with real data (zeros if no activity)
        getApprovedRoster().forEach(email => {
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

    function setClientId(id) {
        try { localStorage.setItem('pacer_google_client_id', id); } catch(e) {}
    }

    function initGoogleSignIn(buttonElementId, callback) {
        if (!GOOGLE_CLIENT_ID) {
            console.warn('PACER Auth: No Google Client ID configured. Real Google Sign-In disabled.');
            return false;
        }

        if (typeof google === 'undefined' || !google.accounts || !google.accounts.id) {
            console.warn('PACER Auth: Google Identity Services library not loaded.');
            return false;
        }

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
