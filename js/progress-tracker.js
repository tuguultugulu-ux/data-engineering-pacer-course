/**
 * PACER Data Engineering - Progress Tracker Engine
 * Tracks completed practices, test suite passes, and 10-week curriculum completion.
 */

var ProgressTracker = (function() {
    const STORAGE_KEY = 'pacer_completed_challenges';

    function getCompletedSet() {
        if (typeof localStorage === 'undefined') return new Set();
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? new Set(JSON.parse(raw)) : new Set();
        } catch (e) {
            return new Set();
        }
    }

    function saveCompletedSet(set) {
        if (typeof localStorage === 'undefined') return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(set)));
    }

    function getTotalChallenges() {
        if (typeof COURSE_DATA === 'undefined' || !COURSE_DATA.lessons) return 212;
        let count = 0;
        for (let k in COURSE_DATA.lessons) {
            const l = COURSE_DATA.lessons[k];
            if (l.isExam) count += 1;
            if (l.practices) count += l.practices.length;
        }
        return count || 212;
    }

    function markCompleted(cellId) {
        const set = getCompletedSet();
        set.add(cellId);
        saveCompletedSet(set);
        updateProgressUI();
    }

    function isCompleted(cellId) {
        return getCompletedSet().has(cellId);
    }

    function getStats() {
        const completed = getCompletedSet().size;
        const total = getTotalChallenges();
        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
        return { completed, total, percent };
    }

    function updateProgressUI() {
        const { completed, total, percent } = getStats();
        
        const percentEl = document.getElementById('progress-percent');
        const fillEl = document.getElementById('progress-fill');
        const subEl = document.getElementById('progress-sub');
        const titleEl = document.getElementById('progress-card-title');

        if (titleEl && typeof I18n !== 'undefined') {
            titleEl.innerText = I18n.t('progressTitle');
        }
        if (percentEl) percentEl.innerText = percent + '%';
        if (fillEl) fillEl.style.width = percent + '%';
        if (subEl) {
            const label = typeof I18n !== 'undefined' ? I18n.t('progressLabel') : 'Challenges Solved';
            subEl.innerText = `${completed} / ${total} ${label}`;
        }
    }

    return {
        markCompleted: markCompleted,
        isCompleted: isCompleted,
        getStats: getStats,
        updateProgressUI: updateProgressUI
    };
})();
