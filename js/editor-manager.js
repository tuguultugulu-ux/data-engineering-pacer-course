/**
 * PACER Data Engineering - Editor & Execution Manager
 * Production-Grade Architecture:
 * - CodeMirror 5 with Jupyter-Style Auto-Closing Brackets & Quotes `() [] {} '' ""`
 * - Strict Real Automated Unit Test Runner & Assertion Verification
 * - Live Interactive DataFrame Scope Inspector
 * - Live Solve Stopwatch / Coding Timer (Starts on typing)
 * - 3-Attempt Solution Lock Gate
 */

var EditorManager = (function() {
    let editors = {};
    let activeCellId = null;
    let runCounts = {};
    let timers = {};

    function getProblemData(cellId) {
        if (typeof COURSE_DATA === 'undefined' || !COURSE_DATA.lessons) return null;
        for (let key in COURSE_DATA.lessons) {
            const l = COURSE_DATA.lessons[key];
            if (l.isExam && (l.id === cellId || (l.id + '-0') === cellId)) {
                return {
                    id: cellId,
                    title: I18n.getLessonTitle(l.id, l.examTitle || l.title),
                    markdown: l.description,
                    code: l.starterCode,
                    solution: l.starterCode + "\n# Production Architecture Solution\n# Ingest -> Impute -> Scale -> Transform -> Baseline\n",
                    pipeline_scheme: l.pipeline_scheme || [
                        {"step": "1. Ingest", "desc": "Raw Multi-source Data", "target": "Raw Ingestion"},
                        {"step": "2. Preprocess", "desc": "Imputation & Encoding", "target": "ColumnTransformer"},
                        {"step": "3. Pipeline", "desc": "Model Estimation", "target": "Evaluation Metric"}
                    ],
                    review: I18n.t('examNotice')
                };
            }
            if (l.practices) {
                const p = l.practices.find(item => item.id === cellId);
                if (p) return p;
            }
        }
        return null;
    }

    function getInitialCode(cellId) {
        const p = getProblemData(cellId);
        if (p && p.code) {
            return p.code.replace(/\\n/g, '\n');
        }
        return '';
    }

    function setActiveCell(cellId) {
        activeCellId = cellId;
        const footerLabel = document.getElementById('active-cell-label');
        if (footerLabel) {
            footerLabel.innerHTML = `${I18n.t('targetLabel')}<span style="color: #60a5fa; font-family: var(--font-mono);">${cellId}</span>`;
        }

        // Highlight active editor
        document.querySelectorAll('.CodeMirror').forEach(el => {
            el.style.borderColor = 'transparent';
        });
        if (editors[cellId]) {
            editors[cellId].getWrapperElement().style.borderColor = '#0071e3';
        }
    }

    /* --- Stopwatch / Timer Logic --- */
    function startTimer(cellId) {
        if (timers[cellId] && timers[cellId].running) return;

        const startTime = performance.now();
        const timerEl = document.getElementById('timer-' + cellId);
        if (timerEl) {
            timerEl.className = 'timer-badge active';
        }

        const interval = setInterval(() => {
            const elapsedSec = Math.floor((performance.now() - startTime) / 1000);
            const m = String(Math.floor(elapsedSec / 60)).padStart(2, '0');
            const s = String(elapsedSec % 60).padStart(2, '0');
            if (timerEl) {
                timerEl.innerText = `${m}:${s}`;
            }
        }, 1000);

        timers[cellId] = {
            startTime: startTime,
            interval: interval,
            running: true,
            solved: false
        };
    }

    function stopTimer(cellId, isSuccess = true) {
        if (timers[cellId] && timers[cellId].running) {
            clearInterval(timers[cellId].interval);
            timers[cellId].running = false;
            timers[cellId].solved = isSuccess;

            const elapsedSec = Math.floor((performance.now() - timers[cellId].startTime) / 1000);

            const timerEl = document.getElementById('timer-' + cellId);
            if (timerEl) {
                timerEl.className = isSuccess ? 'timer-badge solved' : 'timer-badge stopped';
            }

            // Transmit solve telemetry to AuthManager
            if (isSuccess && typeof AuthManager !== 'undefined') {
                AuthManager.recordSolveMetric(cellId, elapsedSec);
            }
        }
    }

    function initEditors(container) {
        editors = {};
        activeCellId = null;

        const editorContainers = container.querySelectorAll('.editor-container');
        editorContainers.forEach((el, index) => {
            const cellId = el.getAttribute('data-cell-id');
            const initialCode = getInitialCode(cellId);

            el.innerHTML = '';
            const cm = CodeMirror(el, {
                value: initialCode,
                mode: 'python',
                theme: 'monokai',
                lineNumbers: true,
                indentUnit: 4,
                tabSize: 4,
                smartIndent: true,
                matchBrackets: true,
                autoCloseBrackets: true, // Jupyter-style auto-closing () [] {} '' ""
                viewportMargin: Infinity,
                extraKeys: {
                    "Ctrl-Enter": function() { runCell(cellId); },
                    "Cmd-Enter": function() { runCell(cellId); },
                    "Shift-Enter": function() { runCell(cellId); },
                    "Alt-Enter": function() { runCell(cellId); },
                    "Ctrl-Space": function() { toggleRabbit(cellId); },
                    "Alt-R": function() { toggleRabbit(cellId); },
                    "Shift-Ctrl-Enter": function() { toggleRabbit(cellId); },
                    "Shift-Cmd-Enter": function() { toggleRabbit(cellId); }
                }
            });

            cm.on('focus', function() {
                setActiveCell(cellId);
            });

            // Start timer immediately upon user typing
            cm.on('change', function(instance, changeObj) {
                if (changeObj.origin !== 'setValue') {
                    startTimer(cellId);
                }
            });

            editors[cellId] = cm;

            // Set first editor as active by default
            if (index === 0) {
                setActiveCell(cellId);
            }
        });
    }

    let uniqueCodeAttempts = {};

    function normalizeCode(str) {
        if (!str) return '';
        return str.split('\n').map(l => l.trim()).filter(l => l.length > 0).join('\n');
    }

    function recordCodeAttempt(cellId, userCode) {
        const starterCode = getInitialCode(cellId);
        const normUser = normalizeCode(userCode);
        const normStarter = normalizeCode(starterCode);

        // 1. Must not be empty and must be different from unmodified starter template
        if (normUser.length === 0 || normUser === normStarter) {
            return false;
        }

        if (!uniqueCodeAttempts[cellId]) {
            uniqueCodeAttempts[cellId] = [];
        }

        // 2. Check if this code version is identical to any previously recorded attempt
        const alreadyTried = uniqueCodeAttempts[cellId].some(prev => prev === normUser);
        if (!alreadyTried) {
            uniqueCodeAttempts[cellId].push(normUser);
            updateSolutionButton(cellId);
            return true;
        }

        return false;
    }

    function getMeaningfulAttemptsCount(cellId) {
        return uniqueCodeAttempts[cellId] ? uniqueCodeAttempts[cellId].length : 0;
    }

    function updateSolutionButton(cellId) {
        const btn = document.getElementById('sol-btn-' + cellId);
        if (!btn) return;

        const attempts = getMeaningfulAttemptsCount(cellId);
        if (attempts >= 3) {
            btn.className = 'action-btn secondary-btn unlocked';
            btn.innerHTML = `<span>${I18n.t('showSolution')}</span>`;
        } else {
            btn.className = 'action-btn secondary-btn locked';
            btn.innerHTML = `<span>${I18n.t('showSolution')} (${attempts}/3)</span>`;
        }
    }

    async function runCell(cellId) {
        if (!cellId || !editors[cellId]) return;

        const cm = editors[cellId];
        const code = cm.getValue();
        recordCodeAttempt(cellId, code);
        const outputEl = document.getElementById('output-' + cellId);
        const statusBadge = document.getElementById('status-badge-' + cellId);
        const metaEl = document.getElementById('console-meta-' + cellId);

        if (statusBadge) {
            statusBadge.className = 'status-badge running';
            statusBadge.innerText = I18n.t('running');
        }

        if (outputEl) {
            outputEl.className = 'output-console running';
            outputEl.innerHTML = `<span class="console-loading">${I18n.t('executing')}</span>`;
        }

        const res = await PyodideEngine.execute(code);

        if (statusBadge) {
            if (res.success) {
                statusBadge.className = 'status-badge success';
                statusBadge.innerText = I18n.t('success');
            } else {
                statusBadge.className = 'status-badge error';
                statusBadge.innerText = I18n.t('error');
            }
        }

        if (metaEl) {
            metaEl.innerHTML = `<span style="font-family:var(--font-mono); color:#94a3b8; font-size:0.68rem;">${I18n.t('execTime')}: ${res.durationMs}ms</span>`;
        }

        // Update data inspector widget live if open
        const inspectorBox = document.getElementById('inspector-box-' + cellId);
        if (inspectorBox && !inspectorBox.classList.contains('hidden')) {
            renderScopeInspector(cellId, res.scope);
        }

        if (outputEl) {
            let parts = [];
            if (res.stdout) {
                parts.push(escapeHtml(res.stdout));
            }
            if (res.stderr) {
                parts.push('<div class="console-error">[Traceback]:\n' + escapeHtml(res.stderr) + '</div>');
            }

            let finalHtml = parts.join('\n\n');
            if (!finalHtml.trim()) {
                finalHtml = `<span class="console-empty">${I18n.t('emptyOutput')}</span>`;
            }

            outputEl.className = res.success ? 'output-console success' : 'output-console error';
            outputEl.innerHTML = finalHtml;
        }
    }

    async function runTests(cellId) {
        if (!cellId || !editors[cellId]) return;

        const cm = editors[cellId];
        const userCode = cm.getValue();
        recordCodeAttempt(cellId, userCode);
        const outputEl = document.getElementById('output-' + cellId);
        const statusBadge = document.getElementById('status-badge-' + cellId);
        const starterCode = getInitialCode(cellId);
        const problem = getProblemData(cellId) || {};

        if (statusBadge) {
            statusBadge.className = 'status-badge running';
            statusBadge.innerText = 'Testing...';
        }

        if (outputEl) {
            outputEl.className = 'output-console running';
            outputEl.innerHTML = `<span class="console-loading">Running strict automated unit test assertions...</span>`;
        }

        const tests = await PyodideEngine.runUnitTests(userCode, starterCode, problem);
        const allPassed = tests.length > 0 && tests.every(t => t.passed);

        if (statusBadge) {
            statusBadge.className = allPassed ? 'status-badge success' : 'status-badge error';
            statusBadge.innerText = allPassed ? I18n.t('testsPassed') : I18n.t('testsFailed');
        }

        if (allPassed) {
            stopTimer(cellId, true);
            if (typeof ProgressTracker !== 'undefined') {
                ProgressTracker.markCompleted(cellId);
            }
        }

        if (outputEl) {
            let testHtml = `<div style="padding: 4px 0; font-family: var(--font-mono); font-size: 0.8rem;">`;
            testHtml += `<div style="font-weight: 600; color: ${allPassed ? '#34d399' : '#f87171'}; margin-bottom: 8px;">`;
            testHtml += allPassed ? `[✓ ${I18n.t('allTestsPassed')}]` : `[✗ ${I18n.t('testsFailed')}]`;
            testHtml += `</div>`;

            tests.forEach((t, idx) => {
                const mark = t.passed ? '✓' : '✗';
                const color = t.passed ? '#34d399' : '#f87171';
                testHtml += `<div style="margin-bottom: 6px; padding-left: 8px; border-left: 2.5px solid ${color};">`;
                testHtml += `<span style="color:${color}; font-weight:600;">${mark} Test ${idx + 1}: ${escapeHtml(t.name)}</span>`;
                testHtml += `<div style="font-size:0.75rem; color:#cbd5e1; margin-top:2px;">${escapeHtml(t.msg)}</div>`;
                testHtml += `</div>`;
            });
            testHtml += `</div>`;

            outputEl.className = allPassed ? 'output-console success' : 'output-console error';
            outputEl.innerHTML = testHtml;
        }
    }

    async function toggleDataInspector(cellId) {
        const box = document.getElementById('inspector-box-' + cellId);
        if (!box) return;

        const isHidden = box.classList.contains('hidden');
        if (isHidden) {
            box.classList.remove('hidden');
            box.innerHTML = `<div style="padding: 10px 14px; font-size: 0.76rem; color: #94a3b8; font-family: var(--font-mono);">Inspecting in-memory Python scope...</div>`;
            const scope = await PyodideEngine.inspectScope();
            renderScopeInspector(cellId, scope);
        } else {
            box.classList.add('hidden');
        }
    }

    function renderScopeInspector(cellId, scopeData) {
        const box = document.getElementById('inspector-box-' + cellId);
        if (!box) return;

        if (!scopeData || scopeData.length === 0) {
            box.innerHTML = `<div style="padding: 12px 16px; font-size: 0.78rem; color: #94a3b8; font-family: var(--font-mono); background: rgba(0,0,0,0.35); border-radius: var(--radius-sm);">No active user DataFrames or NumPy arrays in memory. Run your Python code first to populate the variable scope.</div>`;
            return;
        }

        let html = `
            <div style="padding: 12px 16px; background: rgba(0,0,0,0.4); border: 1px solid var(--midnight-border); border-radius: var(--radius-sm); margin-top: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <span style="font-size: 0.78rem; font-weight: 600; color: #38bdf8; font-family: var(--font-mono);">
                        Active In-Memory Data Structures (${scopeData.length})
                    </span>
                    <button class="action-btn secondary-btn" style="padding: 2px 8px; font-size: 0.7rem;" onclick="EditorManager.refreshScope('${cellId}')">
                        Refresh Scope
                    </button>
                </div>
                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 0.76rem; font-family: var(--font-mono); color: #cbd5e1;">
                        <thead>
                            <tr style="border-bottom: 1.5px solid var(--midnight-border); text-align: left; color: #94a3b8;">
                                <th style="padding: 6px 8px;">${I18n.t('varName')}</th>
                                <th style="padding: 6px 8px;">${I18n.t('varType')}</th>
                                <th style="padding: 6px 8px;">${I18n.t('varShape')}</th>
                                <th style="padding: 6px 8px;">${I18n.t('varMissing')}</th>
                            </tr>
                        </thead>
                        <tbody>
        `;

        scopeData.forEach(v => {
            html += `
                <tr style="border-bottom: 1px solid var(--midnight-border-subtle);">
                    <td style="padding: 6px 8px; color: #38bdf8; font-weight: 600;">${escapeHtml(v.name)}</td>
                    <td style="padding: 6px 8px; color: #ffffff;">${escapeHtml(v.type)}</td>
                    <td style="padding: 6px 8px; color: #34d399; font-weight: 500;">${escapeHtml(JSON.stringify(v.shape))}</td>
                    <td style="padding: 6px 8px; color: ${v.nulls > 0 ? '#f87171' : '#94a3b8'};">${v.nulls}</td>
                </tr>
            `;
        });

        html += `</tbody></table></div></div>`;
        box.innerHTML = html;
    }

    async function refreshScope(cellId) {
        const scope = await PyodideEngine.inspectScope();
        renderScopeInspector(cellId, scope);
    }

    function toggleSolution(cellId) {
        const solContainer = document.getElementById('solution-box-' + cellId);
        const btn = document.getElementById('sol-btn-' + cellId);
        const problem = getProblemData(cellId);
        const attempts = getMeaningfulAttemptsCount(cellId);

        if (!solContainer) return;

        const isHidden = solContainer.classList.contains('hidden');
        if (isHidden) {
            solContainer.classList.remove('hidden');

            if (attempts < 3) {
                // Locked Notice
                solContainer.innerHTML = `
                    <div style="background: rgba(245, 158, 11, 0.1); border: 1.5px solid rgba(245, 158, 11, 0.35); border-radius: var(--radius-md); padding: 14px 18px; margin-top: 10px; color: #fbbf24; font-size: 0.82rem; line-height: 1.6;">
                        <strong style="color: #ffffff; font-size: 0.88rem; display: block; margin-bottom: 4px;">Solution Locked (Meaningful Attempts: ${attempts} / 3)</strong>
                        ${I18n.t('solutionLockedMsg')}<strong>${attempts} / 3</strong>.<br>
                        <span style="color: #e2e8f0; font-size: 0.78rem; margin-top: 4px; display: block;">${I18n.t('solutionSpamWarn')}</span>
                    </div>
                `;
                if (btn) btn.innerHTML = `<span>${I18n.t('hideSolution')}</span>`;
                return;
            }

            // Unlocked Solution
            if (btn) btn.innerHTML = `<span>${I18n.t('hideSolution')}</span>`;
            const rawSolution = problem && problem.solution ? problem.solution : '# Reference solution';
            solContainer.innerHTML = `
                <div style="background: #090d16; border: 1px solid var(--midnight-border); border-radius: var(--radius-md); padding: 12px 14px; margin-top: 10px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <span style="font-size: 0.76rem; font-weight: 500; color: #38bdf8; font-family: var(--font-mono);">Optimal Production Architecture</span>
                        <button class="action-btn secondary-btn" style="padding: 2px 8px; font-size: 0.72rem;" onclick="EditorManager.copySolutionToEditor('${cellId}')">
                            ${I18n.t('copySolution')}
                        </button>
                    </div>
                    <pre class="review-code-block" style="margin:0;"><code>${escapeHtml(rawSolution)}</code></pre>
                </div>
            `;
        } else {
            solContainer.classList.add('hidden');
            if (btn) updateSolutionButton(cellId);
        }
    }

    function copySolutionToEditor(cellId) {
        const problem = getProblemData(cellId);
        if (problem && problem.solution && editors[cellId]) {
            editors[cellId].setValue(problem.solution);
            runCell(cellId);
        }
    }

    function toggleScheme(cellId) {
        const box = document.getElementById('scheme-box-' + cellId);
        if (box) {
            box.classList.toggle('hidden');
        }
    }

    async function toggleRabbit(cellId) {
        if (!cellId) cellId = activeCellId;
        if (!cellId) return;

        const panel = document.getElementById('rabbit-' + cellId);
        const btn = document.getElementById('rabbit-btn-' + cellId);
        const body = panel ? panel.querySelector('.review-body') : null;

        if (panel) {
            const isHidden = panel.classList.contains('hidden');
            if (isHidden) {
                panel.classList.remove('hidden');
                if (btn) btn.classList.add('active');

                // Trigger review analysis
                if (editors[cellId] && body) {
                    body.innerHTML = `
                        <div style="text-align: center; padding: 28px 10px; color: var(--midnight-muted);">
                            <div style="font-size: 0.84rem; font-weight: 500; color: #ffffff; margin-bottom: 4px;">${I18n.t('analyzingCode')}</div>
                            <div style="font-size: 0.74rem; font-family: var(--font-mono);">${I18n.t('inspectingAst')}</div>
                        </div>
                    `;

                    const userCode = editors[cellId].getValue();
                    const outputEl = document.getElementById('output-' + cellId);
                    const lastOutput = outputEl ? outputEl.innerText : '';
                    const problem = getProblemData(cellId) || { title: cellId, markdown: '', review: '' };

                    const reviewRes = await AIReviewer.reviewCode(problem, userCode, lastOutput);
                    
                    let badgeHtml = '';
                    if (reviewRes.mode === 'ai') {
                        badgeHtml = `<div style="display:inline-block; font-size: 0.68rem; font-family:var(--font-mono); background:rgba(16,185,129,0.15); color:#34d399; padding:2px 6px; border-radius:4px; font-weight:500; margin-bottom:12px;">${I18n.t('liveAiReviewBadge')} (${reviewRes.provider.toUpperCase()})</div><br>`;
                    } else {
                        badgeHtml = `<div style="display:inline-block; font-size: 0.68rem; font-family:var(--font-mono); background:rgba(245,158,11,0.15); color:#fbbf24; padding:2px 6px; border-radius:4px; font-weight:500; margin-bottom:12px;">${I18n.t('offlineAstBadge')}</div><br>`;
                    }

                    body.innerHTML = badgeHtml + formatMarkdown(reviewRes.content);
                }
            } else {
                panel.classList.add('hidden');
                if (btn) btn.classList.remove('active');
            }

            // Refresh CodeMirror layout smoothly
            if (editors[cellId]) {
                setTimeout(() => {
                    editors[cellId].refresh();
                }, 60);
            }
        }
    }

    function resetCell(cellId) {
        if (!cellId || !editors[cellId]) return;
        const initialCode = getInitialCode(cellId);
        editors[cellId].setValue(initialCode);
        stopTimer(cellId, false);
    }

    function runActiveCell() {
        if (activeCellId) {
            runCell(activeCellId);
        }
    }

    function toggleActiveRabbit() {
        if (activeCellId) {
            toggleRabbit(activeCellId);
        }
    }

    function formatMarkdown(md) {
        if (!md) return '';
        let html = md;

        // Code blocks: ```python ... ```
        html = html.replace(/```(?:python|py)?\n([\s\S]*?)```/g, function(match, code) {
            return '<pre class="review-code-block"><code>' + escapeHtml(code.trim()) + '</code></pre>';
        });

        // Headers
        html = html.replace(/^### (.*$)/gim, '<h4 style="margin: 12px 0 6px; color: #ffffff; font-size: 0.88rem; font-weight:600;">$1</h4>');
        html = html.replace(/^## (.*$)/gim, '<h3 style="margin: 14px 0 8px; color: #ffffff; font-size: 0.95rem; font-weight:600;">$1</h3>');

        // Bold & Italic
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // Inline code
        html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

        // Lists
        html = html.replace(/^\s*-\s+(.*$)/gim, '<li style="margin-left: 15px; margin-bottom: 4px;">$1</li>');
        html = html.replace(/^\s*(\d+)\.\s+(.*$)/gim, '<li style="margin-left: 15px; margin-bottom: 4px;">$2</li>');

        // Line breaks
        const parts = html.split(/(<pre[\s\S]*?<\/pre>)/);
        for (let i = 0; i < parts.length; i++) {
            if (!parts[i].startsWith('<pre')) {
                parts[i] = parts[i].replace(/\n/g, '<br>');
            }
        }
        return parts.join('');
    }

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    return {
        initEditors: initEditors,
        runCell: runCell,
        runTests: runTests,
        toggleSolution: toggleSolution,
        copySolutionToEditor: copySolutionToEditor,
        toggleDataInspector: toggleDataInspector,
        refreshScope: refreshScope,
        toggleScheme: toggleScheme,
        toggleRabbit: toggleRabbit,
        resetCell: resetCell,
        runActiveCell: runActiveCell,
        toggleActiveRabbit: toggleActiveRabbit,
        setActiveCell: setActiveCell,
        getEditor: function(id) { return editors[id]; }
    };
})();
