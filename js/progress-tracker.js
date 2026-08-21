function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/**
 * PACER Data Engineering - Progress & Gamified XP Engine
 * Tracks completed practices, XP gain animations, level progression, and visual roadmap state.
 */

var ProgressTracker = (function() {
    const COMPLETED_KEY = 'pacer_completed_challenges';
    const XP_KEY = 'pacer_user_xp';

    function getCompletedSet() {
        if (typeof localStorage === 'undefined') return new Set();
        try {
            const raw = localStorage.getItem(COMPLETED_KEY);
            return raw ? new Set(JSON.parse(raw)) : new Set();
        } catch (e) {
            return new Set();
        }
    }

    function saveCompletedSet(set) {
        if (typeof localStorage === 'undefined') return;
        localStorage.setItem(COMPLETED_KEY, JSON.stringify(Array.from(set)));
    }

    function getXP() {
        if (typeof localStorage === 'undefined') return 0;
        return parseInt(localStorage.getItem(XP_KEY) || '0', 10);
    }

    function addXP(amount) {
        const current = getXP();
        const updated = current + amount;
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(XP_KEY, updated.toString());
        }
        return updated;
    }

    function getLevelInfo(xp) {
        const isMn = (typeof I18n !== 'undefined' && I18n.getLang() === 'mn');
        if (xp < 250) {
            return { level: 1, title: isMn ? "Өгөгдлийн Сурагч" : "Data Apprentice", nextXP: 250, currentLevelBase: 0 };
        } else if (xp < 600) {
            return { level: 2, title: isMn ? "Өгөгдлийн Туслах Инженер" : "Junior Data Engineer", nextXP: 600, currentLevelBase: 250 };
        } else if (xp < 1200) {
            return { level: 3, title: isMn ? "ETL Пайплайн Мэргэжилтэн" : "ETL Pipeline Specialist", nextXP: 1200, currentLevelBase: 600 };
        } else if (xp < 2200) {
            return { level: 4, title: isMn ? "Өгөгдлийн Архитектор" : "Data Systems Architect", nextXP: 2200, currentLevelBase: 1200 };
        } else {
            return { level: 5, title: isMn ? "Ахлах Өгөгдлийн Инженер" : "Principal Data Engineer", nextXP: 5000, currentLevelBase: 2200 };
        }
    }

    function getTotalChallenges() {
        if (typeof COURSE_DATA === 'undefined' || !COURSE_DATA.lessons) return 419;
        let count = 0;
        for (let k in COURSE_DATA.lessons) {
            const l = COURSE_DATA.lessons[k];
            if (l.isExam) count += 1;
            if (l.practices) count += l.practices.length;
        }
        return count || 419;
    }

    function markCompleted(cellId) {
        const set = getCompletedSet();
        const isNew = !set.has(cellId);
        
        set.add(cellId);
        saveCompletedSet(set);

        if (isNew) {
            // Calculate XP
            let xpGain = 50;
            if (cellId.includes('proj_')) xpGain = 200;
            else if (cellId.includes('_exam')) xpGain = 150;

            addXP(xpGain);
            triggerXpPopup(xpGain, cellId);
        }

        updateProgressUI();
    }

    function isCompleted(cellId) {
        return getCompletedSet().has(cellId);
    }

    function getStats() {
        const completed = getCompletedSet().size;
        const total = getTotalChallenges();
        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
        const xp = getXP();
        const levelInfo = getLevelInfo(xp);
        return { completed, total, percent, xp, levelInfo };
    }

    function updateProgressUI() {
        const { completed, total, percent, xp, levelInfo } = getStats();
        
        const percentEl = document.getElementById('progress-percent');
        const fillEl = document.getElementById('progress-fill');
        const subEl = document.getElementById('progress-sub');
        const titleEl = document.getElementById('progress-card-title');
        const xpBadgeEl = document.getElementById('sidebar-xp-badge');

        if (titleEl && typeof I18n !== 'undefined') {
            titleEl.innerText = I18n.t('progressTitle');
        }
        if (percentEl) percentEl.innerText = percent + '%';
        if (fillEl) fillEl.style.width = percent + '%';
        if (subEl) {
            const label = typeof I18n !== 'undefined' ? I18n.t('progressLabel') : 'Challenges Solved';
            subEl.innerText = `${completed} / ${total} ${label}`;
        }
        if (xpBadgeEl) {
            xpBadgeEl.innerHTML = `
                <span class="xp-level-text">Lv.${levelInfo.level} ${escapeHtml(levelInfo.title)}</span>
                <span class="xp-points">${xp} XP</span>
            `;
            xpBadgeEl.title = `${levelInfo.title} (${xp} / ${levelInfo.nextXP} XP)`;
        }
    }

    /* --- Floating XP Burst Animation --- */
    function triggerXpPopup(xpGain, cellId) {
        const container = document.getElementById('card-' + cellId) || document.body;
        const popup = document.createElement('div');
        popup.className = 'xp-floating-burst';
        popup.innerHTML = `
            <div class="xp-burst-inner">
                <span class="xp-plus">+${xpGain} XP</span>
                <span class="xp-text">${typeof I18n !== 'undefined' && I18n.getLang() === 'mn' ? 'Амжилттай Давлаа!' : 'Mastery Achieved!'}</span>
            </div>
        `;

        document.body.appendChild(popup);

        // Position popup near target or center
        const rect = container.getBoundingClientRect();
        const top = Math.max(80, rect.top + window.scrollY + 20);
        const left = Math.max(40, rect.left + (rect.width / 2) - 80);

        popup.style.top = `${top}px`;
        popup.style.left = `${left}px`;

        setTimeout(() => {
            popup.classList.add('animate');
        }, 20);

        setTimeout(() => {
            if (popup && popup.parentNode) {
                popup.parentNode.removeChild(popup);
            }
        }, 2200);
    }

    return {
        markCompleted: markCompleted,
        isCompleted: isCompleted,
        getXP: getXP,
        getLevelInfo: getLevelInfo,
        getStats: getStats,
        updateProgressUI: updateProgressUI
    };
})();
