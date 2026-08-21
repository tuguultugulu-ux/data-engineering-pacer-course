/**
 * PACER Data Engineering - Authentication & Role-Based Access Control Engine
 * Manages Google Sign-In, authorized user rosters, admin credentials, and user telemetry.
 */

var AuthManager = (function() {
    const CURRENT_USER_KEY = 'pacer_auth_current_user';
    const APPROVED_USERS_KEY = 'pacer_approved_users_roster';
    const GLOBAL_METRICS_KEY = 'pacer_global_user_metrics';

    // Official Admin Accounts specified by Course Leadership
    const ADMIN_ACCOUNTS = [
        "sarantuyasarnai42@gmail.com",
        "iobama538@gmail.com",
        "tuguultugulu@gmail.com"
    ];

    // Default Approved Student Roster
    const DEFAULT_APPROVED_ROSTER = [
        "sarantuyasarnai42@gmail.com",
        "iobama538@gmail.com",
        "tuguultugulu@gmail.com",
        "student.pacer01@gmail.com",
        "engineer.trainee@gmail.com",
        "demo.student@gmail.com"
    ];

    function getApprovedRoster() {
        if (typeof localStorage === 'undefined') return DEFAULT_APPROVED_ROSTER;
        try {
            const raw = localStorage.getItem(APPROVED_USERS_KEY);
            return raw ? JSON.parse(raw) : DEFAULT_APPROVED_ROSTER;
        } catch (e) {
            return DEFAULT_APPROVED_ROSTER;
        }
    }

    function saveApprovedRoster(roster) {
        if (typeof localStorage === 'undefined') return;
        localStorage.setItem(APPROVED_USERS_KEY, JSON.stringify(roster));
    }

    function getCurrentUser() {
        const defaultAdmin = {
            email: "tuguultugulu@gmail.com",
            name: "Tuguldur (Admin)",
            role: "ADMIN",
            loggedInAt: new Date().toISOString()
        };

        if (typeof localStorage === 'undefined') return defaultAdmin;
        try {
            const raw = localStorage.getItem(CURRENT_USER_KEY);
            if (raw) return JSON.parse(raw);
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(defaultAdmin));
            return defaultAdmin;
        } catch (e) {
            return defaultAdmin;
        }
    }

    function setCurrentUser(user) {
        if (typeof localStorage === 'undefined') return;
        if (user) {
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(CURRENT_USER_KEY);
        }
    }

    function isAdmin(email) {
        if (!email) return false;
        return ADMIN_ACCOUNTS.map(e => e.toLowerCase()).includes(email.toLowerCase());
    }

    function isApproved(email) {
        if (!email) return false;
        const lower = email.toLowerCase();
        if (isAdmin(lower)) return true;
        const roster = getApprovedRoster().map(e => e.toLowerCase());
        return roster.includes(lower);
    }

    function addApprovedUser(email) {
        const roster = getApprovedRoster();
        const lower = email.trim().toLowerCase();
        if (lower && !roster.includes(lower)) {
            roster.push(lower);
            saveApprovedRoster(roster);
            return true;
        }
        return false;
    }

    function removeApprovedUser(email) {
        const lower = email.trim().toLowerCase();
        if (ADMIN_ACCOUNTS.includes(lower)) {
            return false; // Cannot remove core admin
        }
        let roster = getApprovedRoster().filter(e => e.toLowerCase() !== lower);
        saveApprovedRoster(roster);
        return true;
    }

    /* --- Telemetry & Solve Time Tracking --- */
    function recordSolveMetric(cellId, durationSec) {
        const user = getCurrentUser();
        if (!user || !user.email) return;

        const email = user.email.toLowerCase();
        let allMetrics = {};
        try {
            const raw = localStorage.getItem(GLOBAL_METRICS_KEY);
            if (raw) allMetrics = JSON.parse(raw);
        } catch (e) {}

        if (!allMetrics[email]) {
            allMetrics[email] = {
                name: user.name || email.split('@')[0],
                email: email,
                lastActive: new Date().toISOString(),
                totalCodingSec: 0,
                solves: {}
            };
        }

        allMetrics[email].lastActive = new Date().toISOString();
        allMetrics[email].totalCodingSec += durationSec;
        allMetrics[email].solves[cellId] = {
            durationSec: durationSec,
            solvedAt: new Date().toISOString()
        };

        try {
            localStorage.setItem(GLOBAL_METRICS_KEY, JSON.stringify(allMetrics));
        } catch (e) {}
    }

    function getGlobalMetrics() {
        try {
            const raw = localStorage.getItem(GLOBAL_METRICS_KEY);
            if (raw) return JSON.parse(raw);
        } catch (e) {}

        // Mock baseline seed data for admin dashboard demonstration
        return {
            "tuguultugulu@gmail.com": {
                name: "Tuguldur (Admin)",
                email: "tuguultugulu@gmail.com",
                lastActive: new Date().toISOString(),
                totalCodingSec: 3420,
                solves: { "w2_exam-0": { durationSec: 420 }, "proj_fintech-0": { durationSec: 780 }, "proj_market-0": { durationSec: 1100 } }
            },
            "sarantuyasarnai42@gmail.com": {
                name: "Sarantuya (Admin)",
                email: "sarantuyasarnai42@gmail.com",
                lastActive: new Date(Date.now() - 3600000).toISOString(),
                totalCodingSec: 4100,
                solves: { "proj_iot-0": { durationSec: 640 }, "proj_ecommerce-0": { durationSec: 890 } }
            },
            "iobama538@gmail.com": {
                name: "Obama (Admin)",
                email: "iobama538@gmail.com",
                lastActive: new Date(Date.now() - 7200000).toISOString(),
                totalCodingSec: 2900,
                solves: { "proj_clinical-0": { durationSec: 950 } }
            },
            "student.pacer01@gmail.com": {
                name: "Student Pacer 01",
                email: "student.pacer01@gmail.com",
                lastActive: new Date(Date.now() - 86400000).toISOString(),
                totalCodingSec: 5200,
                solves: { "p1_git-0": { durationSec: 180 }, "w2_exam-0": { durationSec: 620 } }
            }
        };
    }

    /* --- Google OAuth & JWT Parser --- */
    function parseJwt(token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch (e) {
            return null;
        }
    }

    function loginWithGoogleCredential(credential) {
        const payload = parseJwt(credential);
        if (!payload || !payload.email) {
            return { success: false, error: "Invalid Google credentials token." };
        }

        const email = payload.email.toLowerCase();
        if (!isApproved(email)) {
            return {
                success: false,
                unauthorized: true,
                email: email,
                error: `Access Denied: Account (${email}) is not on the approved student roster. Contact course leadership.`
            };
        }

        const user = {
            email: email,
            name: payload.name || email.split('@')[0],
            picture: payload.picture || '',
            role: isAdmin(email) ? 'ADMIN' : 'STUDENT',
            loggedInAt: new Date().toISOString()
        };

        setCurrentUser(user);
        return { success: true, user: user };
    }

    function getAdminDisplayName(email) {
        const lower = email.toLowerCase();
        if (lower.includes('sarantuya')) return 'Sarantuya (Admin)';
        if (lower.includes('obama') || lower.includes('538')) return 'Obama (Admin)';
        if (lower.includes('tuguul') || lower.includes('tugulu')) return 'Tuguldur (Admin)';
        return email.split('@')[0] + ' (Admin)';
    }

    function directLoginAs(email, name) {
        const lower = email.trim().toLowerCase();
        if (!isApproved(lower)) {
            return {
                success: false,
                unauthorized: true,
                email: lower,
                error: `Access Denied: Account (${lower}) is not on the approved roster.`
            };
        }

        const isUserAdmin = isAdmin(lower);
        const displayName = name || (isUserAdmin ? getAdminDisplayName(lower) : lower.split('@')[0]);

        const user = {
            email: lower,
            name: displayName,
            picture: '',
            role: isUserAdmin ? 'ADMIN' : 'STUDENT',
            loggedInAt: new Date().toISOString()
        };

        setCurrentUser(user);
        return { success: true, user: user };
    }

    function logout() {
        setCurrentUser(null);
    }

    return {
        ADMIN_ACCOUNTS: ADMIN_ACCOUNTS,
        getCurrentUser: getCurrentUser,
        isAdmin: isAdmin,
        isApproved: isApproved,
        getApprovedRoster: getApprovedRoster,
        addApprovedUser: addApprovedUser,
        removeApprovedUser: removeApprovedUser,
        recordSolveMetric: recordSolveMetric,
        getGlobalMetrics: getGlobalMetrics,
        loginWithGoogleCredential: loginWithGoogleCredential,
        directLoginAs: directLoginAs,
        logout: logout
    };
})();
