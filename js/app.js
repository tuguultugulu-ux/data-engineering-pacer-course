/**
 * PACER Data Engineering - Main Application
 * Coordinates navigation, lesson rendering, sidebar generation, and runtime status.
 */

document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    // 1. Build sidebar
    buildSidebar();

    // 2. Initialize Pyodide Runtime
    PyodideEngine.onStatusChange(function(statusText, isReady) {
        const topStatus = document.getElementById('pyodide-status-pill');
        const footerStatus = document.getElementById('footer-pyodide-status');

        if (topStatus) {
            topStatus.innerText = statusText;
            topStatus.className = isReady ? 'status-pill ready' : 'status-pill loading';
        }
        if (footerStatus) {
            footerStatus.innerText = isReady ? 'Pyodide (Python 3.10) Ready ✓' : statusText;
        }
    });

    PyodideEngine.init();

    // 3. Load initial lesson
    loadLesson('intro');
}

function buildSidebar() {
    const navList = document.getElementById('nav-list');
    if (!navList || !window.COURSE_DATA) return;

    navList.innerHTML = '';

    COURSE_DATA.phases.forEach(phase => {
        const li = document.createElement('li');
        li.id = 'phase-item-' + phase.id;

        const phaseTitle = document.createElement('a');
        phaseTitle.href = '#';
        phaseTitle.className = 'phase-title';
        phaseTitle.innerText = phase.title;
        phaseTitle.onclick = function(e) {
            e.preventDefault();
            togglePhase(phase.id);
        };
        li.appendChild(phaseTitle);

        const ul = document.createElement('ul');
        ul.id = 'phase-links-' + phase.id;

        // Find all lessons for this phase
        const phaseLessons = Object.values(COURSE_DATA.lessons).filter(l => l.phase === phase.id);
        phaseLessons.forEach(lesson => {
            const subLi = document.createElement('li');
            const link = document.createElement('a');
            link.href = '#';
            link.className = 'sub-link';
            link.setAttribute('data-lesson-id', lesson.id);

            let prefix = '📖 ';
            if (lesson.isOverview) prefix = '📋 ';
            if (lesson.isExam) prefix = '🏆 ';
            if (lesson.isExternal) prefix = '🔗 ';

            link.innerText = prefix + lesson.title;

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
    document.querySelectorAll('.sidebar > ul > li').forEach(li => {
        if (li.id === 'phase-item-' + phaseId) {
            li.classList.toggle('active');
        } else {
            li.classList.remove('active');
        }
    });
}

function loadLesson(lessonId) {
    const lesson = COURSE_DATA.lessons[lessonId];
    if (!lesson) return;

    // Update active states in sidebar
    document.querySelectorAll('.sidebar a.sub-link').forEach(link => {
        if (link.getAttribute('data-lesson-id') === lessonId) {
            link.classList.add('active');
            const parentLi = link.closest('li:has(ul)');
            if (parentLi) {
                document.querySelectorAll('.sidebar > ul > li').forEach(l => l.classList.remove('active'));
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

    // Initialize CodeMirror editors in the newly rendered HTML
    EditorManager.initEditors(contentContainer);
}

function renderLessonHtml(lesson) {
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
                <h1>${escapeHtml(lesson.title)}</h1>
            </div>
            <div class="external-resource-card">
                <p>${escapeHtml(lesson.description)}</p>
                <div style="text-align: center; margin-top: 25px;">
                    <a href="${lesson.externalUrl}" target="_blank" class="primary-btn-large">
                        🔗 Open ${escapeHtml(lesson.bookTitle)} in New Tab
                    </a>
                </div>
            </div>
        `;
    }

    // 3. Final Phase Exam
    if (lesson.isExam) {
        return `
            <div class="exam-header-banner">
                <h1>${escapeHtml(lesson.examTitle)}</h1>
                <p class="exam-subtitle">Holistic Phase Evaluation &mdash; Advanced Comprehensive Pipeline Challenge</p>
            </div>

            <div class="exam-prompt-card">
                <div class="exam-badge">🏆 Master-Level Challenge</div>
                <p class="exam-description">${escapeHtml(lesson.description)}</p>
                <div class="exam-notice">
                    <em>This exam tests every single concept from the entire phase in one holistic, highly complex scenario. You have a blank slate. Write and execute your entire solution below.</em>
                </div>
            </div>

            <div class="practice-card exam-card" id="card-${lesson.id}-0">
                <div class="card-header">
                    <div class="card-title-group">
                        <span class="level-pill mastery">Final Exam Execution</span>
                        <h3 class="card-title">Full Pipeline Solution</h3>
                    </div>
                    <div class="card-actions">
                        <span class="status-badge idle" id="status-badge-${lesson.id}-0">Idle</span>
                        <button class="action-btn run-btn" onclick="EditorManager.runCell('${lesson.id}-0')" title="Execute code (Ctrl+Enter)">
                            ▶ Run Solution
                        </button>
                    </div>
                </div>

                <div class="editor-review-split">
                    <div class="editor-pane">
                        <div class="editor-container" data-cell-id="${lesson.id}-0" ></div>
                    </div>
                </div>

                <div class="console-wrapper">
                    <div class="console-header">
                        <span>Console Output</span>
                    </div>
                    <div class="output-console" id="output-${lesson.id}-0">
                        <span class="console-empty">Press <strong>Ctrl+Enter</strong> or click <strong>▶ Run Solution</strong> to execute.</span>
                    </div>
                </div>
            </div>
        `;
    }

    // 4. Standard Chapter with Book & Practices
    let practicesHtml = '';
    if (lesson.practices && lesson.practices.length > 0) {
        practicesHtml = `
            <div class="practice-section-header">
                <h2>💻 Hands-on Practice Modules</h2>
                <p>Apply the concepts you just read in the official text above. Each problem features a unique industry dataset.</p>
            </div>
            <div class="practice-list">
                ${lesson.practices.map(p => renderPracticeCard(p)).join('')}
            </div>
        `;
    }

    return `
        <div class="lesson-header">
            <div class="lesson-title-row">
                <h1>${escapeHtml(lesson.title)}</h1>
                <div id="pyodide-status-pill" class="status-pill ${PyodideEngine.isReady() ? 'ready' : 'loading'}">
                    ${PyodideEngine.getStatus()}
                </div>
            </div>
        </div>

        <div class="instruction-banner">
            <div class="instruction-icon">🛠️</div>
            <div class="instruction-content">
                <strong>How to Practice:</strong> Write your Python code in the interactive editors below.
                <div class="shortcut-pills">
                    <span class="kbd-pill"><kbd>Ctrl</kbd> + <kbd>Enter</kbd> (or <kbd>Cmd</kbd> + <kbd>Enter</kbd>) to <strong>Run Code</strong></span>
                    <span class="kbd-pill"><kbd>Ctrl</kbd> + <kbd>Space</kbd> (or <kbd>Alt</kbd> + <kbd>R</kbd>) for <strong>Code Rabbit Review</strong></span>
                </div>
            </div>
        </div>

        ${lesson.bookUrl ? `
        <div class="book-card">
            <div class="book-header">
                <span class="book-name">📖 ${escapeHtml(lesson.bookTitle || lesson.title)}</span>
                <a href="${lesson.bookUrl}" target="_blank" class="book-link" title="Open textbook in a new tab">
                    Open in new tab ↗
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
    let levelLabel = '🟢 Easy';
    const lowerLevel = (practice.level || '').toLowerCase();
    if (lowerLevel.includes('intermediate') || lowerLevel.includes('medium')) {
        levelClass = 'intermediate';
        levelLabel = '🟡 Intermediate';
    } else if (lowerLevel.includes('complex') || lowerLevel.includes('hard')) {
        levelClass = 'complex';
        levelLabel = '🔴 Complex';
    } else if (lowerLevel.includes('mastery') || lowerLevel.includes('challenge')) {
        levelClass = 'mastery';
        levelLabel = '🏆 Mastery';
    }

    // Format markdown description
    let descHtml = escapeHtml(practice.markdown || '');
    descHtml = descHtml.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    descHtml = descHtml.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
    descHtml = descHtml.replace(/\n/g, '<br>');

    return `
        <div class="practice-card" id="card-${practice.id}">
            <div class="card-header">
                <div class="card-title-group">
                    <span class="level-pill ${levelClass}">${levelLabel}</span>
                    <h3 class="card-title">${escapeHtml(practice.title)}</h3>
                </div>
                <div class="card-actions">
                    <span class="status-badge idle" id="status-badge-${practice.id}">Idle</span>
                    <button class="action-btn rabbit-btn" id="rabbit-btn-${practice.id}" onclick="EditorManager.toggleRabbit('${practice.id}')" title="Toggle hints & review (Ctrl+Space)">
                        🔍 Code Rabbit
                    </button>
                    <button class="action-btn run-btn" onclick="EditorManager.runCell('${practice.id}')" title="Execute code (Ctrl+Enter)">
                        ▶ Run
                    </button>
                </div>
            </div>

            <div class="card-prompt">
                ${descHtml}
            </div>

            <div class="editor-review-split">
                <div class="editor-pane">
                    <div class="editor-container" data-cell-id="${practice.id}" ></div>
                </div>
                <div class="review-panel hidden" id="rabbit-${practice.id}">
                    <div class="review-header">
                        <strong>🔍 Code Rabbit Review & Hints</strong>
                        <button class="close-panel-btn" onclick="EditorManager.toggleRabbit('${practice.id}')">✕</button>
                    </div>
                    <div class="review-body">
                        ${practice.review || 'Inspect your DataFrame with .info() and .shape to verify transformations.'}
                    </div>
                </div>
            </div>

            <div class="console-wrapper">
                <div class="console-header">
                    <span>Console Output</span>
                </div>
                <div class="output-console" id="output-${practice.id}">
                    <span class="console-empty">Press <strong>Ctrl+Enter</strong> or click <strong>▶ Run</strong> to execute your code.</span>
                </div>
            </div>
        </div>
    `;
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function escapeHtmlAttr(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
