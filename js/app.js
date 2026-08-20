/**
 * PACER Data Engineering - Main Application
 * Modern Apple / Linear Aesthetic Architecture:
 * - Dynamic Text Scramble Title Loading Animation
 * - Zero Emojis (Clean SVG Micro-Icons & Typography)
 * - Glassmorphic Submenu Accordions
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
            topStatus.innerHTML = `<span class="indicator-dot"></span><span>${statusText}</span>`;
            topStatus.className = isReady ? 'status-pill ready' : 'status-pill loading';
        }
        if (footerStatus) {
            footerStatus.innerHTML = isReady
                ? `<span class="indicator-dot" style="background:#10b981; margin-right:6px;"></span>Python 3.10 Runtime Ready`
                : `<span class="indicator-dot" style="background:#f59e0b; margin-right:6px;"></span>${statusText}`;
        }
    });

    PyodideEngine.init();

    // 3. Update AI status in sidebar
    updateSidebarAiStatus();

    // 4. Load initial lesson
    loadLesson('intro');

    // 5. Bind modal backdrop click
    setupAiModal();
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
    if (!navList || !window.COURSE_DATA) return;

    navList.innerHTML = '';

    COURSE_DATA.phases.forEach(phase => {
        const li = document.createElement('li');
        li.className = 'phase-item';
        li.id = 'phase-item-' + phase.id;

        const phaseTitle = document.createElement('a');
        phaseTitle.href = '#';
        phaseTitle.className = 'phase-title';
        phaseTitle.innerHTML = `
            <span>${escapeHtml(phase.title)}</span>
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

            link.innerText = lesson.title;

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
    if (h1) {
        scrambleText(h1, lesson.title || 'Lesson', 280);
    }

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
                <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">${escapeHtml(lesson.description)}</p>
                <div style="margin-top: 25px;">
                    <a href="${lesson.externalUrl}" target="_blank" class="primary-btn-large">
                        <span>Open ${escapeHtml(lesson.bookTitle)} in New Tab</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    </a>
                </div>
            </div>
        `;
    }

    // 3. Final Phase Exam
    if (lesson.isExam) {
        return `
            <div class="lesson-header">
                <h1>${escapeHtml(lesson.examTitle || lesson.title)}</h1>
                <p style="color: var(--text-secondary); font-size: 0.88rem; margin-top: 4px;">Comprehensive Phase Evaluation &mdash; Advanced End-to-End Pipeline</p>
            </div>

            <div class="practice-card" style="margin-bottom: 24px; background: #ffffff; box-shadow: 0 0 0 1px var(--border-subtle); color: var(--text-primary);">
                <div class="card-prompt" style="background: #ffffff; color: var(--text-primary); border-bottom: none;">
                    <span class="level-tag complex" style="margin-bottom: 8px; display: inline-block;">Final Phase Exam</span>
                    <p style="margin-top: 6px; font-size: 0.92rem; line-height: 1.6;">${escapeHtml(lesson.description)}</p>
                    <p style="margin-top: 10px; font-size: 0.82rem; color: var(--text-secondary); font-style: italic;">
                        This exam evaluates every core concept covered in this phase. You have a blank slate. Write and execute your entire solution below.
                    </p>
                </div>
            </div>

            <div class="practice-card" id="card-${lesson.id}-0">
                <div class="card-header">
                    <div class="card-title-group">
                        <span class="level-tag mastery">Exam Solution</span>
                        <h3 class="card-title">main.py</h3>
                    </div>
                    <div class="card-actions">
                        <span class="status-badge idle" id="status-badge-${lesson.id}-0">Idle</span>
                        <button class="action-btn secondary-btn" onclick="EditorManager.resetCell('${lesson.id}-0')" title="Reset starter code">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                            <span>Reset</span>
                        </button>
                        <button class="action-btn rabbit-btn" id="rabbit-btn-${lesson.id}-0" onclick="EditorManager.toggleRabbit('${lesson.id}-0')" title="Code Rabbit Review (Ctrl+Space)">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                            <span>Code Rabbit</span>
                        </button>
                        <button class="action-btn run-btn" onclick="EditorManager.runCell('${lesson.id}-0')" title="Execute code (Ctrl+Enter)">
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                            <span>Run</span>
                        </button>
                    </div>
                </div>

                <div class="editor-review-split">
                    <div class="editor-pane">
                        <div class="editor-container" data-cell-id="${lesson.id}-0"></div>
                    </div>
                    <div class="review-panel hidden" id="rabbit-${lesson.id}-0">
                        <div class="review-header">
                            <span>Code Rabbit Review</span>
                            <button class="close-panel-btn" onclick="EditorManager.toggleRabbit('${lesson.id}-0')">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            </button>
                        </div>
                        <div class="review-body">
                            Review will appear here.
                        </div>
                    </div>
                </div>

                <div class="console-wrapper">
                    <div class="console-header">
                        <span>Terminal Output</span>
                    </div>
                    <div class="output-console" id="output-${lesson.id}-0">
                        <span class="console-empty">Press Ctrl+Enter or click Run to execute solution.</span>
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
                <h2>Practice Challenges</h2>
                <p>Apply the concepts you just read in the official text above. Each challenge uses a unique dataset.</p>
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
                Write Python code in the interactive editors. Vectorized operations are evaluated automatically.
            </div>
            <div class="shortcut-pills">
                <span class="kbd-pill"><kbd>Ctrl</kbd>+<kbd>Enter</kbd> Run</span>
                <span class="kbd-pill"><kbd>Ctrl</kbd>+<kbd>Space</kbd> Review</span>
            </div>
        </div>

        ${lesson.bookUrl ? `
        <div class="book-card">
            <div class="book-header">
                <span class="book-name">${escapeHtml(lesson.bookTitle || lesson.title)}</span>
                <a href="${lesson.bookUrl}" target="_blank" class="book-link" title="Open textbook in a new tab">
                    <span>Open in new tab</span>
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
    let levelLabel = 'Easy';
    const lowerLevel = (practice.level || '').toLowerCase();
    if (lowerLevel.includes('intermediate') || lowerLevel.includes('medium')) {
        levelClass = 'intermediate';
        levelLabel = 'Intermediate';
    } else if (lowerLevel.includes('complex') || lowerLevel.includes('hard')) {
        levelClass = 'complex';
        levelLabel = 'Complex';
    } else if (lowerLevel.includes('mastery') || lowerLevel.includes('challenge')) {
        levelClass = 'mastery';
        levelLabel = 'Mastery';
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
                    <span class="level-tag ${levelClass}">${levelLabel}</span>
                    <h3 class="card-title">${escapeHtml(practice.title)}</h3>
                </div>
                <div class="card-actions">
                    <span class="status-badge idle" id="status-badge-${practice.id}">Idle</span>
                    <button class="action-btn secondary-btn" onclick="EditorManager.resetCell('${practice.id}')" title="Reset starter code">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                        <span>Reset</span>
                    </button>
                    <button class="action-btn rabbit-btn" id="rabbit-btn-${practice.id}" onclick="EditorManager.toggleRabbit('${practice.id}')" title="Toggle AI Code Review (Ctrl+Space)">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                        <span>Code Rabbit</span>
                    </button>
                    <button class="action-btn run-btn" onclick="EditorManager.runCell('${practice.id}')" title="Execute code (Ctrl+Enter)">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                        <span>Run</span>
                    </button>
                </div>
            </div>

            <div class="card-prompt">
                ${descHtml}
            </div>

            <div class="editor-review-split">
                <div class="editor-pane">
                    <div class="editor-container" data-cell-id="${practice.id}"></div>
                </div>
                <div class="review-panel hidden" id="rabbit-${practice.id}">
                    <div class="review-header">
                        <span>Code Rabbit Review</span>
                        <button class="close-panel-btn" onclick="EditorManager.toggleRabbit('${practice.id}')">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                    </div>
                    <div class="review-body">
                        ${practice.review || 'Review insights will appear here.'}
                    </div>
                </div>
            </div>

            <div class="console-wrapper">
                <div class="console-header">
                    <span>Terminal Output</span>
                </div>
                <div class="output-console" id="output-${practice.id}">
                    <span class="console-empty">Press Ctrl+Enter or click Run to execute code.</span>
                </div>
            </div>
        </div>
    `;
}

/* --- AI Settings Modal Handlers --- */
function updateSidebarAiStatus() {
    const statusEl = document.getElementById('sidebar-ai-status');
    if (statusEl) {
        if (AIReviewer.hasApiKey()) {
            statusEl.innerText = AIReviewer.getProvider().toUpperCase() + ' Active';
            statusEl.className = 'widget-status active';
        } else {
            statusEl.innerText = 'Offline AST Mode';
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
            statusBox.innerHTML = `<span style="color: #34d399; font-size:0.8rem; font-family: var(--font-mono);">${provider.toUpperCase()} API key saved. Live AI review active.</span>`;
        } else {
            statusBox.innerHTML = `<span style="color: #fbbf24; font-size:0.8rem; font-family: var(--font-mono);">Key removed. Operating in offline AST Mode.</span>`;
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
        if (statusBox) statusBox.innerHTML = `<span style="color: #f87171; font-size:0.8rem; font-family: var(--font-mono);">Please enter an API key to test.</span>`;
        return;
    }

    if (statusBox) statusBox.innerHTML = `<span style="color: #60a5fa; font-size:0.8rem; font-family: var(--font-mono);">Testing connection to ${provider.toUpperCase()}...</span>`;

    try {
        const testProblem = { title: "Test", markdown: "Test requirement", review: "" };
        const testRes = await AIReviewer.reviewCode(testProblem, "def f(): pass", "");
        if (testRes.mode === 'ai') {
            if (statusBox) statusBox.innerHTML = `<span style="color: #34d399; font-size:0.8rem; font-family: var(--font-mono);">Success: Connected to ${provider.toUpperCase()} API.</span>`;
        } else {
            throw new Error(testRes.error || "Failed to connect to AI provider.");
        }
    } catch (err) {
        if (statusBox) statusBox.innerHTML = `<span style="color: #f87171; font-size:0.8rem; font-family: var(--font-mono);">Error: ${escapeHtml(err.message)}</span>`;
    }
}

function clearAiSettings() {
    AIReviewer.setApiKey('');
    const keyInput = document.getElementById('ai-api-key-input');
    const statusBox = document.getElementById('ai-modal-status');
    if (keyInput) keyInput.value = '';
    if (statusBox) statusBox.innerHTML = `<span style="color: #fbbf24; font-size:0.8rem; font-family: var(--font-mono);">Key cleared.</span>`;
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
