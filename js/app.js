/**
 * PACER Data Engineering - Main Application
 * Modern Apple / Linear Aesthetic Architecture:
 * - Dynamic Text Scramble Title Loading Animation
 * - Zero Emojis (Clean SVG Micro-Icons & Typography)
 * - Complete Bilingual Localization Engine (English / Mongolian)
 * - Automated Unit Test Runner & Assertion Verification
 * - Interactive DataFrame & Variable Scope Inspector
 * - Production Reference Solution & Diff Viewer (3-Attempt Gate)
 * - Live Solve Stopwatch / Coding Timer (Starts on typing)
 * - Data Architecture Mini-Map Pipeline Scheme (Ultra High Contrast)
 * - 5 Real-World Industry Capstone Projects with Authentic Raw File Ingestion & High-Contrast Mandate
 */

document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

let currentLessonId = 'intro';

function initApp() {
    // 1. Build sidebar
    buildSidebar();

    // 2. Initialize Pyodide Runtime
    PyodideEngine.onStatusChange(function(statusText, isReady) {
        const topStatus = document.getElementById('pyodide-status-pill');
        const footerStatus = document.getElementById('footer-pyodide-status');

        if (topStatus) {
            topStatus.innerHTML = `<span class="indicator-dot"></span><span>${statusText}</span>`;
            topStatus.className = isReady ? 'status-pill ready' : 'status-pill loading';
        }
        if (footerStatus) {
            const label = isReady ? I18n.t('pyodideReady') : statusText;
            const color = isReady ? '#10b981' : '#f59e0b';
            footerStatus.innerHTML = `
                <span class="indicator-dot" style="background:${color}; margin-right:6px;"></span>
                <span>${label}</span>
                <span style="margin: 0 10px; opacity: 0.3;">/</span>
                <span id="active-cell-label">${I18n.t('clickCell')}</span>
            `;
        }
    });

    PyodideEngine.init();

    // 3. Update AI and Progress UI
    updateSidebarAiStatus();
    if (typeof ProgressTracker !== 'undefined') {
        ProgressTracker.updateProgressUI();
    }

    // 4. Load initial lesson
    loadLesson(currentLessonId);

    // 5. Bind modal backdrop click
    setupAiModal();
}

function changeLanguage(lang) {
    I18n.setLang(lang);
    
    // Update language switch buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    // Rebuild UI in new language
    buildSidebar();
    updateSidebarAiStatus();
    if (typeof ProgressTracker !== 'undefined') {
        ProgressTracker.updateProgressUI();
    }
    loadLesson(currentLessonId);
}

/* --- Dynamic Text Decoding Animation --- */
function scrambleText(element, finalString, duration = 300) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_/-';
    const length = finalString.length;
    const start = performance.now();

    function update(time) {
        const elapsed = time - start;
        const progress = Math.min(elapsed / duration, 1);
        const revealedCount = Math.floor(progress * length);

        let output = finalString.slice(0, revealedCount);
        for (let i = revealedCount; i < length; i++) {
            if (finalString[i] === ' ' || finalString[i] === '\n') {
                output += finalString[i];
            } else {
                output += chars[Math.floor(Math.random() * chars.length)];
            }
        }
        element.textContent = output;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = finalString;
        }
    }
    requestAnimationFrame(update);
}

function buildSidebar() {
    const navList = document.getElementById('nav-list');
    const brandTitleEl = document.getElementById('sidebar-brand-title');
    const brandSubEl = document.getElementById('sidebar-brand-subtitle');

    if (brandTitleEl) brandTitleEl.innerText = I18n.t('brandTitle');
    if (brandSubEl) brandSubEl.innerText = ''; // 10-week text removed

    if (!navList || !window.COURSE_DATA) return;

    navList.innerHTML = '';

    COURSE_DATA.phases.forEach(phase => {
        const li = document.createElement('li');
        li.className = 'phase-item';
        li.id = 'phase-item-' + phase.id;

        const localizedPhaseTitle = I18n.getPhaseTitle(phase.id, phase.title);

        const phaseTitle = document.createElement('a');
        phaseTitle.href = '#';
        phaseTitle.className = 'phase-title';
        phaseTitle.innerHTML = `
            <span>${escapeHtml(localizedPhaseTitle)}</span>
            <svg class="chevron-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        `;
        phaseTitle.onclick = function(e) {
            e.preventDefault();
            togglePhase(phase.id);
        };
        li.appendChild(phaseTitle);

        const ul = document.createElement('ul');
        ul.className = 'phase-links';
        ul.id = 'phase-links-' + phase.id;

        // Find all lessons for this phase
        const phaseLessons = Object.values(COURSE_DATA.lessons).filter(l => l.phase === phase.id);
        phaseLessons.forEach(lesson => {
            const subLi = document.createElement('li');
            const link = document.createElement('a');
            link.href = '#';
            link.className = 'sub-link';
            link.setAttribute('data-lesson-id', lesson.id);

            const localizedLessonTitle = I18n.getLessonTitle(lesson.id, lesson.title);
            link.innerText = localizedLessonTitle;

            if (lesson.isExam) {
                link.className += ' exam-link';
            }

            link.onclick = function(e) {
                e.preventDefault();
                loadLesson(lesson.id);
            };

            subLi.appendChild(link);
            ul.appendChild(subLi);
        });

        li.appendChild(ul);
        navList.appendChild(li);
    });
}

function togglePhase(phaseId) {
    document.querySelectorAll('.sidebar-nav > li').forEach(li => {
        if (li.id === 'phase-item-' + phaseId) {
            li.classList.toggle('active');
        } else {
            li.classList.remove('active');
        }
    });
}

function loadLesson(lessonId) {
    currentLessonId = lessonId;
    const lesson = COURSE_DATA.lessons[lessonId];
    if (!lesson) return;

    // Update active states in sidebar
    document.querySelectorAll('.sidebar a.sub-link').forEach(link => {
        if (link.getAttribute('data-lesson-id') === lessonId) {
            link.classList.add('active');
            const parentLi = link.closest('.phase-item');
            if (parentLi) {
                document.querySelectorAll('.sidebar-nav > li').forEach(l => l.classList.remove('active'));
                parentLi.classList.add('active');
            }
        } else {
            link.classList.remove('active');
        }
    });

    const contentContainer = document.getElementById('content-container');
    if (!contentContainer) return;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Render Lesson View
    contentContainer.innerHTML = renderLessonHtml(lesson);

    // Apply title scramble effect
    const h1 = contentContainer.querySelector('.lesson-header h1');
    const localizedTitle = I18n.getLessonTitle(lesson.id, lesson.title);
    if (h1) {
        scrambleText(h1, localizedTitle || 'Lesson', 280);
    }

    // Initialize CodeMirror editors in the newly rendered HTML
    EditorManager.initEditors(contentContainer);
}

function renderLessonHtml(lesson) {
    const localizedTitle = I18n.getLessonTitle(lesson.id, lesson.title);

    // 1. Overview page
    if (lesson.isOverview) {
        return `
            <div class="overview-view">
                ${lesson.overviewHtml}
            </div>
        `;
    }

    // 2. External page (e.g. Google ML Monitoring)
    if (lesson.isExternal) {
        return `
            <div class="lesson-header">
                <h1>${escapeHtml(localizedTitle)}</h1>
            </div>
            <div class="external-resource-card">
                <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">${escapeHtml(lesson.description)}</p>
                <div style="margin-top: 25px;">
                    <a href="${lesson.externalUrl}" target="_blank" class="primary-btn-large">
                        <span>${I18n.t('openNewTab')} (${escapeHtml(lesson.bookTitle)})</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    </a>
                </div>
            </div>
        `;
    }

    
    // 3. Final Phase Exam or Capstone Project
    if (lesson.isExam) {
        const isProject = (lesson.phase === 'projects' || lesson.id.startsWith('proj_'));
        const badgeLabel = isProject ? I18n.t('projectCardTitle') : I18n.t('examCardTitle');
        const subLabel = isProject ? I18n.t('projectNotice') : I18n.t('examTitleSub');

        // Pipeline Scheme Mini-Map
        const schemeNodes = lesson.pipeline_scheme || [
            { step: "1. Ingest", desc: "Raw Messy Data Feed", target: "Uncleaned DataFrame" },
            { step: "2. Clean & Sanitize", desc: "Outlier & Missing Impute", target: "Clean Authenticity" },
            { step: "3. Feature Pipeline", desc: "Vectorized Transformations", target: "X & y Matrices" },
            { step: "4. Model Ready", desc: "Zero-Leakage Training Split", target: "High-Accuracy ML Ready" }
        ];

                let schemeHtml = `
            <div class="pipeline-breadcrumb" style="display: flex; align-items: center; gap: 10px; margin: 10px 16px 14px 16px; padding: 8px 14px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: var(--radius-sm); font-size: 0.75rem; font-family: var(--font-mono); color: #cbd5e1; overflow-x: auto;">
                <span class="pipeline-label" style="font-weight: 600; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.04em; font-size: 0.68rem; flex-shrink: 0;">${I18n.t('architectureMap')}:</span>
                <div class="pipeline-steps" style="display: flex; align-items: center; gap: 8px; flex-shrink: 0;">
                    ${schemeNodes.map((node, idx) => `
                        <span class="pipeline-step" style="display: inline-flex; align-items: center; gap: 5px; color: #cbd5e1;" title="${escapeHtml(node.target || '')}">
                            <span class="step-num" style="background: rgba(56, 189, 248, 0.18); border: 1px solid rgba(56, 189, 248, 0.4); color: #38bdf8; font-size: 0.65rem; font-weight: 600; padding: 1px 6px; border-radius: 3px;">${idx + 1}</span>
                            <span class="step-name" style="color: #ffffff; font-weight: 600; font-size: 0.78rem;">${escapeHtml(node.desc || node.step)}</span>
                        </span>
                        ${idx < (schemeNodes.length - 1) ? '<span class="pipeline-sep" style="color: #94a3b8; font-size: 0.85rem; font-weight: 600;">→</span>' : ''}
                    `).join('')}
                </div>
            </div>
        `;

        let projectDownloadRow = '';
        if (lesson.dataset_url) {
            projectDownloadRow = `
                <div class="project-actions-row" style="display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap;">
                    <a href="${lesson.dataset_url}" download class="action-btn download-btn" style="background: var(--accent); color: #ffffff; padding: 7px 16px; text-decoration: none; border-radius: var(--radius-sm); font-size: 0.82rem; font-weight: 500; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 2px 6px rgba(0, 113, 227, 0.25);">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                        <span>Download Raw Dataset (${escapeHtml(lesson.dataset_url.split('/').pop())})</span>
                    </a>
                    ${lesson.github_repo ? `
                    <a href="${lesson.github_repo}" target="_blank" class="action-btn secondary-btn" style="text-decoration: none; padding: 7px 16px; font-size: 0.82rem; display: inline-flex; align-items: center; gap: 8px; background: #ffffff; box-shadow: 0 0 0 1px var(--border-subtle); color: var(--text-primary);">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                        <span>GitHub Benchmark Repository (${escapeHtml(lesson.github_stars || 'Open Source')})</span>
                    </a>
                    ` : ''}
                </div>
            `;
        }

        return `
                        <div class="lesson-header">
                <h1>${escapeHtml(localizedTitle)}</h1>
                <p style="color: var(--text-secondary); font-size: 0.88rem; margin-top: 4px;">${subLabel}</p>
            </div>

            <!-- Prominent Red Data Engineering Mandate Callout (Ultra High Contrast) -->
            <div class="mandate-callout-red">
                <div class="mandate-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                </div>
                <div class="mandate-content">
                    <strong>${I18n.t('mandateTitle')}:</strong>
                    <p>${I18n.t('mandateText')}</p>
                </div>
            </div>

            ${projectDownloadRow}

            <div class="practice-card" style="margin-bottom: 24px; background: #ffffff; box-shadow: 0 0 0 1px var(--border-subtle); color: var(--text-primary);">
                <div class="card-prompt" style="background: #ffffff; color: var(--text-primary); border-bottom: none;">
                    <span class="level-tag complex" style="margin-bottom: 8px; display: inline-block;">${badgeLabel}</span>
                    <p style="margin-top: 6px; font-size: 0.92rem; line-height: 1.6;">${escapeHtml(lesson.description)}</p>
                    <p style="margin-top: 10px; font-size: 0.82rem; color: var(--text-secondary); font-style: italic;">
                        ${isProject ? I18n.t('projectNotice') : I18n.t('examNotice')}
                    </p>
                </div>
            </div>

            ${schemeHtml}

            <div class="practice-card" id="card-${lesson.id}-0">
                <div class="card-header">
                    <div class="card-title-group">
                        <span class="level-tag mastery">${isProject ? I18n.t('levelProject') : I18n.t('levelMastery')}</span>
                        <h3 class="card-title">pipeline.py</h3>
                                                <span class="timer-badge" id="timer-${lesson.id}-0">00:00</span>
                    </div>
                    <div class="card-actions">
                        <span class="status-badge idle" id="status-badge-${lesson.id}-0">Idle</span>
                        <button class="action-btn secondary-btn" onclick="EditorManager.resetCell('${lesson.id}-0')" title="${I18n.t('resetBtn')}">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                            <span>${I18n.t('resetBtn')}</span>
                        </button>
                        <button class="action-btn secondary-btn" id="sol-btn-${lesson.id}-0" onclick="EditorManager.toggleSolution('${lesson.id}-0')" title="${I18n.t('showSolution')}">
                            <span>${I18n.t('showSolution')} (0/3)</span>
                        </button>
                        <button class="action-btn secondary-btn" onclick="EditorManager.toggleDataInspector('${lesson.id}-0')" title="${I18n.t('dataInspector')}">
                            <span>${I18n.t('dataInspector')}</span>
                        </button>
                        <button class="action-btn test-btn" onclick="EditorManager.runTests('${lesson.id}-0')" title="${I18n.t('runTestsBtn')}">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            <span>${I18n.t('runTestsBtn')}</span>
                        </button>
                        <button class="action-btn rabbit-btn" id="rabbit-btn-${lesson.id}-0" onclick="EditorManager.toggleRabbit('${lesson.id}-0')" title="${I18n.t('codeRabbitReview')} (Ctrl+Space)">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                            <span>${I18n.t('rabbitBtn')}</span>
                        </button>
                        <button class="action-btn run-btn" onclick="EditorManager.runCell('${lesson.id}-0')" title="${I18n.t('runBtn')} (Ctrl+Enter)">
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                            <span>${I18n.t('runBtn')}</span>
                        </button>
                    </div>
                </div>

                <div id="solution-box-${lesson.id}-0" class="solution-box hidden"></div>
                <div id="inspector-box-${lesson.id}-0" class="inspector-box hidden"></div>

                <div class="editor-review-split">
                    <div class="editor-pane">
                        <div class="editor-container" data-cell-id="${lesson.id}-0"></div>
                    </div>
                    <div class="review-panel hidden" id="rabbit-${lesson.id}-0">
                        <div class="review-header">
                            <span>${I18n.t('codeRabbitReview')}</span>
                            <button class="close-panel-btn" onclick="EditorManager.toggleRabbit('${lesson.id}-0')">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            </button>
                        </div>
                        <div class="review-body">
                            ${I18n.t('pressRunExam')}
                        </div>
                    </div>
                </div>

                <div class="console-wrapper">
                    <div class="console-header">
                        <span>${I18n.t('terminalOutput')}</span>
                        <div id="console-meta-${lesson.id}-0"></div>
                    </div>
                    <div class="output-console" id="output-${lesson.id}-0">
                        <span class="console-empty">${I18n.t('pressRunExam')}</span>
                    </div>
                </div>
            </div>
        `;
    }

    // 4. Standard Chapter with Book & Practices (10 Tiers)
    let practicesHtml = '';
    if (lesson.practices && lesson.practices.length > 0) {
        practicesHtml = `
            <div class="practice-section-header">
                <h2>${I18n.t('practiceHeader')}</h2>
                <p>${I18n.t('practiceSub')}</p>
            </div>
            <div class="practice-list">
                ${lesson.practices.map(p => renderPracticeCard(p)).join('')}
            </div>
        `;
    }

    return `
                <div class="lesson-header">
            <div class="lesson-title-row">
                <h1>${escapeHtml(localizedTitle)}</h1>
                <div class="header-meta">
                    <div id="pyodide-status-pill" class="status-pill ${PyodideEngine.isReady() ? 'ready' : 'loading'}">
                        <span class="indicator-dot"></span>
                        <span>${PyodideEngine.getStatus()}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="instruction-banner">
            <div class="instruction-text">
                ${I18n.getLang() === 'mn' ? 'Кодоо интерактив талбарт бичнэ үү. Код бичиж эхлэхэд хугацаа автоматаар тоологдоно.' : 'Write Python code in the interactive editors. Coding stopwatch tracks your solve duration automatically.'}
            </div>
            <div class="shortcut-pills">
                <span class="kbd-pill"><kbd>Ctrl</kbd>+<kbd>Enter</kbd> ${I18n.t('shortcutRun')}</span>
                <span class="kbd-pill"><kbd>Ctrl</kbd>+<kbd>Space</kbd> ${I18n.t('shortcutReview')}</span>
            </div>
        </div>

        ${lesson.bookUrl ? `
        <div class="book-card">
            <div class="book-header">
                <span class="book-name">${escapeHtml(lesson.bookTitle || localizedTitle)}</span>
                <a href="${lesson.bookUrl}" target="_blank" class="book-link" title="${I18n.t('openNewTab')}">
                    <span>${I18n.t('openNewTab')}</span>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>
            </div>
            <iframe class="book-frame" src="${lesson.bookUrl}"></iframe>
        </div>
        ` : ''}

        ${practicesHtml}
    `;
}

function renderPracticeCard(practice) {
    let levelClass = 'easy';
    let levelLabel = I18n.t('levelEasy');
    const lowerLevel = (practice.level || '').toLowerCase();
    
    if (lowerLevel.includes('intermediate') || lowerLevel.includes('medium')) {
        levelClass = 'intermediate';
        levelLabel = I18n.t('levelIntermediate');
    } else if (lowerLevel.includes('advanced')) {
        levelClass = 'advanced';
        levelLabel = I18n.t('levelAdvanced');
    } else if (lowerLevel.includes('complex') || lowerLevel.includes('hard')) {
        levelClass = 'complex';
        levelLabel = I18n.t('levelComplex');
    } else if (lowerLevel.includes('mastery') || lowerLevel.includes('challenge')) {
        levelClass = 'mastery';
        levelLabel = I18n.t('levelMastery');
    }

    // Format markdown description
    let descHtml = escapeHtml(practice.markdown || '');
    descHtml = descHtml.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    descHtml = descHtml.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
    descHtml = descHtml.replace(/\n/g, '<br>');

    // Mini-map pipeline scheme (High Contrast)
    const schemeNodes = practice.pipeline_scheme || [
        { step: "1. Ingest", desc: "Raw Input", target: "DataFrame" },
        { step: "2. Clean", desc: "Data Quality", target: "Zero Nulls" },
        { step: "3. Output", desc: "Processed Array", target: "Target" }
    ];

                let schemeHtml = `
            <div class="pipeline-breadcrumb" style="display: flex; align-items: center; gap: 10px; margin: 10px 16px 14px 16px; padding: 8px 14px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: var(--radius-sm); font-size: 0.75rem; font-family: var(--font-mono); color: #cbd5e1; overflow-x: auto;">
                <span class="pipeline-label" style="font-weight: 600; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.04em; font-size: 0.68rem; flex-shrink: 0;">${I18n.t('architectureMap')}:</span>
                <div class="pipeline-steps" style="display: flex; align-items: center; gap: 8px; flex-shrink: 0;">
                    ${schemeNodes.map((node, idx) => `
                        <span class="pipeline-step" style="display: inline-flex; align-items: center; gap: 5px; color: #cbd5e1;" title="${escapeHtml(node.target || '')}">
                            <span class="step-num" style="background: rgba(56, 189, 248, 0.18); border: 1px solid rgba(56, 189, 248, 0.4); color: #38bdf8; font-size: 0.65rem; font-weight: 600; padding: 1px 6px; border-radius: 3px;">${idx + 1}</span>
                            <span class="step-name" style="color: #ffffff; font-weight: 600; font-size: 0.78rem;">${escapeHtml(node.desc || node.step)}</span>
                        </span>
                        ${idx < (schemeNodes.length - 1) ? '<span class="pipeline-sep" style="color: #94a3b8; font-size: 0.85rem; font-weight: 600;">→</span>' : ''}
                    `).join('')}
                </div>
            </div>
        `;

    return `
        <div class="practice-card" id="card-${practice.id}">
            <div class="card-header">
                <div class="card-title-group">
                    <span class="level-tag ${levelClass}">${levelLabel}</span>
                    <h3 class="card-title">${escapeHtml(practice.title)}</h3>
                                        <span class="timer-badge" id="timer-${practice.id}">00:00</span>
                </div>
                <div class="card-actions">
                    <span class="status-badge idle" id="status-badge-${practice.id}">Idle</span>
                    <button class="action-btn secondary-btn" onclick="EditorManager.resetCell('${practice.id}')" title="${I18n.t('resetBtn')}">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                        <span>${I18n.t('resetBtn')}</span>
                    </button>
                    <button class="action-btn secondary-btn" id="sol-btn-${practice.id}" onclick="EditorManager.toggleSolution('${practice.id}')" title="${I18n.t('showSolution')}">
                        <span>${I18n.t('showSolution')} (0/3)</span>
                    </button>
                    <button class="action-btn secondary-btn" onclick="EditorManager.toggleDataInspector('${practice.id}')" title="${I18n.t('dataInspector')}">
                        <span>${I18n.t('dataInspector')}</span>
                    </button>
                    <button class="action-btn test-btn" onclick="EditorManager.runTests('${practice.id}')" title="${I18n.t('runTestsBtn')}">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        <span>${I18n.t('runTestsBtn')}</span>
                    </button>
                    <button class="action-btn rabbit-btn" id="rabbit-btn-${practice.id}" onclick="EditorManager.toggleRabbit('${practice.id}')" title="${I18n.t('codeRabbitReview')} (Ctrl+Space)">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                        <span>${I18n.t('rabbitBtn')}</span>
                    </button>
                    <button class="action-btn run-btn" onclick="EditorManager.runCell('${practice.id}')" title="${I18n.t('runBtn')} (Ctrl+Enter)">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                        <span>${I18n.t('runBtn')}</span>
                    </button>
                </div>
            </div>

            <div class="card-prompt">
                ${descHtml}
            </div>

            ${schemeHtml}

            <div id="solution-box-${practice.id}" class="solution-box hidden"></div>
            <div id="inspector-box-${practice.id}" class="inspector-box hidden"></div>

            <div class="editor-review-split">
                <div class="editor-pane">
                    <div class="editor-container" data-cell-id="${practice.id}"></div>
                </div>
                <div class="review-panel hidden" id="rabbit-${practice.id}">
                    <div class="review-header">
                        <span>${I18n.t('codeRabbitReview')}</span>
                        <button class="close-panel-btn" onclick="EditorManager.toggleRabbit('${practice.id}')">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                    </div>
                    <div class="review-body">
                        ${practice.review || I18n.t('pressRun')}
                    </div>
                </div>
            </div>

            <div class="console-wrapper">
                <div class="console-header">
                    <span>${I18n.t('terminalOutput')}</span>
                    <div id="console-meta-${practice.id}"></div>
                </div>
                <div class="output-console" id="output-${practice.id}">
                    <span class="console-empty">${I18n.t('pressRun')}</span>
                </div>
            </div>
        </div>
    `;
}

/* --- AI Settings Modal Handlers --- */
function updateSidebarAiStatus() {
    const statusEl = document.getElementById('sidebar-ai-status');
    const titleEl = document.getElementById('sidebar-ai-title');
    if (titleEl) titleEl.innerText = I18n.t('aiSetupTitle');
    if (statusEl) {
        if (AIReviewer.hasApiKey()) {
            statusEl.innerText = AIReviewer.getProvider().toUpperCase() + I18n.t('aiActiveSuffix');
            statusEl.className = 'widget-status active';
        } else {
            statusEl.innerText = I18n.t('aiOfflineStatus');
            statusEl.className = 'widget-status';
        }
    }
}

function setupAiModal() {
    const modalBackdrop = document.getElementById('ai-modal-backdrop');
    if (modalBackdrop) {
        modalBackdrop.onclick = function(e) {
            if (e.target === modalBackdrop) {
                closeAiModal();
            }
        };
    }
}

function openAiModal() {
    const modal = document.getElementById('ai-modal-backdrop');
    const keyInput = document.getElementById('ai-api-key-input');
    const providerSelect = document.getElementById('ai-provider-select');
    const statusBox = document.getElementById('ai-modal-status');

    if (keyInput) keyInput.value = AIReviewer.getApiKey();
    if (providerSelect) providerSelect.value = AIReviewer.getProvider();
    if (statusBox) statusBox.innerHTML = '';

    if (modal) modal.style.display = 'flex';
}

function closeAiModal() {
    const modal = document.getElementById('ai-modal-backdrop');
    if (modal) modal.style.display = 'none';
}

function saveAiSettings() {
    const keyInput = document.getElementById('ai-api-key-input');
    const providerSelect = document.getElementById('ai-provider-select');
    const statusBox = document.getElementById('ai-modal-status');

    const key = keyInput ? keyInput.value.trim() : '';
    const provider = providerSelect ? providerSelect.value : 'gemini';

    AIReviewer.setApiKey(key);
    AIReviewer.setProvider(provider);
    updateSidebarAiStatus();

    if (statusBox) {
        if (key) {
            statusBox.innerHTML = `<span style="color: #34d399; font-size:0.8rem; font-family: var(--font-mono);">${provider.toUpperCase()} ${I18n.getLang() === 'mn' ? 'түлхүүр хадгалагдлаа. AI горим идэвхтэй.' : 'API key saved. Live AI review active.'}</span>`;
        } else {
            statusBox.innerHTML = `<span style="color: #fbbf24; font-size:0.8rem; font-family: var(--font-mono);">${I18n.getLang() === 'mn' ? 'Түлхүүр арилгагдлаа. Офлайн AST горим.' : 'Key removed. Operating in offline AST Mode.'}</span>`;
        }
    }

    setTimeout(closeAiModal, 800);
}

async function testAiConnection() {
    const keyInput = document.getElementById('ai-api-key-input');
    const providerSelect = document.getElementById('ai-provider-select');
    const statusBox = document.getElementById('ai-modal-status');

    const key = keyInput ? keyInput.value.trim() : '';
    const provider = providerSelect ? providerSelect.value : 'gemini';

    if (!key) {
        if (statusBox) statusBox.innerHTML = `<span style="color: #f87171; font-size:0.8rem; font-family: var(--font-mono);">${I18n.getLang() === 'mn' ? 'Шалгах API түлхүүрээ оруулна уу.' : 'Please enter an API key to test.'}</span>`;
        return;
    }

    if (statusBox) statusBox.innerHTML = `<span style="color: #60a5fa; font-size:0.8rem; font-family: var(--font-mono);">${provider.toUpperCase()} ${I18n.getLang() === 'mn' ? 'холболтыг шалгаж байна...' : 'Testing connection...'}</span>`;

    try {
        const testProblem = { title: "Test", markdown: "Test requirement", review: "" };
        const testRes = await AIReviewer.reviewCode(testProblem, "def f(): pass", "");
        if (testRes.mode === 'ai') {
            if (statusBox) statusBox.innerHTML = `<span style="color: #34d399; font-size:0.8rem; font-family: var(--font-mono);">${I18n.getLang() === 'mn' ? 'Амжилттай: ' + provider.toUpperCase() + ' холбогдлоо.' : 'Success: Connected to ' + provider.toUpperCase() + ' API.'}</span>`;
        } else {
            throw new Error(testRes.error || "Failed to connect to AI provider.");
        }
    } catch (err) {
        if (statusBox) statusBox.innerHTML = `<span style="color: #f87171; font-size:0.8rem; font-family: var(--font-mono);">${I18n.getLang() === 'mn' ? 'Алдаа: ' : 'Error: '}${escapeHtml(err.message)}</span>`;
    }
}

function clearAiSettings() {
    AIReviewer.setApiKey('');
    const keyInput = document.getElementById('ai-api-key-input');
    const statusBox = document.getElementById('ai-modal-status');
    if (keyInput) keyInput.value = '';
    if (statusBox) statusBox.innerHTML = `<span style="color: #fbbf24; font-size:0.8rem; font-family: var(--font-mono);">${I18n.getLang() === 'mn' ? 'Түлхүүр арилгагдлаа.' : 'Key cleared.'}</span>`;
    saveAiSettings();
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}


/* --- Visual Curriculum Quest Map Modal Handlers --- */
function openRoadmapModal() {
    const modal = document.getElementById('roadmap-modal-backdrop');
    const container = document.getElementById('roadmap-tree-container');
    const userStats = ProgressTracker.getStats();

    if (!modal || !container || typeof COURSE_DATA === 'undefined') return;

    // Render Quest Map
    let html = `
        <div class="roadmap-user-summary">
            <div class="user-tier-badge">
                <span class="badge-title">Rank Level ${userStats.levelInfo.level}</span>
                <strong>${escapeHtml(userStats.levelInfo.title)}</strong>
            </div>
            <div class="user-xp-box">
                <span>Total XP Earned:</span>
                <strong style="color: #38bdf8;">${userStats.xp} XP</strong>
            </div>
            <div class="user-completion-box">
                <span>Overall Mastery:</span>
                <strong style="color: #34d399;">${userStats.completed} / ${userStats.total} (${userStats.percent}%)</strong>
            </div>
        </div>

        <div class="roadmap-nodes-flow">
    `;

    const activeLesson = COURSE_DATA.lessons[currentLessonId] || {};
    const activePhaseId = activeLesson.phase || 'intro';

    COURSE_DATA.phases.forEach((phase, index) => {
        const phaseLessons = Object.values(COURSE_DATA.lessons).filter(l => l.phase === phase.id);
        const totalPhaseChallenges = phaseLessons.reduce((acc, l) => {
            let c = 0;
            if (l.isExam) c += 1;
            if (l.practices) c += l.practices.length;
            return acc + c;
        }, 0);

        let completedPhaseChallenges = 0;
        phaseLessons.forEach(l => {
            if (l.isExam && ProgressTracker.isCompleted(l.id + '-0')) completedPhaseChallenges += 1;
            if (l.practices) {
                l.practices.forEach(p => {
                    if (ProgressTracker.isCompleted(p.id)) completedPhaseChallenges += 1;
                });
            }
        });

        const isCurrent = (phase.id === activePhaseId);
        const isCompleted = (totalPhaseChallenges > 0 && completedPhaseChallenges >= totalPhaseChallenges);
        const localizedTitle = I18n.getPhaseTitle(phase.id, phase.title);
        const firstLessonId = phaseLessons.length > 0 ? phaseLessons[0].id : 'intro';

        let nodeStatusClass = 'upcoming';
        let statusBadgeText = I18n.t('lockedPhase');

        if (isCompleted) {
            nodeStatusClass = 'completed';
            statusBadgeText = I18n.t('completedPhase');
        } else if (isCurrent) {
            nodeStatusClass = 'active-current';
            statusBadgeText = I18n.t('youAreHere');
        } else if (completedPhaseChallenges > 0) {
            nodeStatusClass = 'in-progress';
            statusBadgeText = `${completedPhaseChallenges}/${totalPhaseChallenges}`;
        }

        html += `
            <div class="roadmap-phase-card ${nodeStatusClass}" onclick="navigateToPhase('${firstLessonId}')">
                <div class="phase-node-marker">
                    <span class="marker-number">${index + 1}</span>
                    ${isCurrent ? '<span class="radar-pulse-wave"></span>' : ''}
                </div>
                <div class="phase-node-body">
                    <div class="phase-node-header">
                        <h4>${escapeHtml(localizedTitle)}</h4>
                        <span class="phase-status-pill ${nodeStatusClass}">${statusBadgeText}</span>
                    </div>
                    <div class="phase-progress-mini">
                        <div class="mini-bar-track">
                            <div class="mini-bar-fill" style="width: ${totalPhaseChallenges > 0 ? Math.round((completedPhaseChallenges / totalPhaseChallenges) * 100) : 0}%;"></div>
                        </div>
                        <span class="mini-stats">${completedPhaseChallenges} / ${totalPhaseChallenges} Solved</span>
                    </div>
                </div>
            </div>
            ${index < COURSE_DATA.phases.length - 1 ? '<div class="roadmap-connector-line"></div>' : ''}
        `;
    });

    html += `</div>`;
    container.innerHTML = html;
    modal.style.display = 'flex';
}

function closeRoadmapModal() {
    const modal = document.getElementById('roadmap-modal-backdrop');
    if (modal) modal.style.display = 'none';
}

function navigateToPhase(firstLessonId) {
    closeRoadmapModal();
    loadLesson(firstLessonId);
}

window.openRoadmapModal = openRoadmapModal;
window.closeRoadmapModal = closeRoadmapModal;
