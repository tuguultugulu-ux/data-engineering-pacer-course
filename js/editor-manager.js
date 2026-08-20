/**
 * PACER Data Engineering - Editor & Execution Manager
 * Manages CodeMirror instances, UI interactions, hotkeys, and dynamic Code Rabbit reviews.
 */

var EditorManager = (function() {
    let editors = {};
    let activeCellId = null;

    function getProblemData(cellId) {
        if (!window.COURSE_DATA || !COURSE_DATA.lessons) return null;
        for (let key in COURSE_DATA.lessons) {
            const l = COURSE_DATA.lessons[key];
            if (l.isExam && (l.id === cellId || (l.id + '-0') === cellId)) {
                return {
                    id: cellId,
                    title: l.examTitle,
                    markdown: l.description,
                    code: l.starterCode,
                    review: "This is a comprehensive final phase exam. Construct the complete pipeline from scratch!"
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
            footerLabel.innerHTML = 'Target: <strong style="color: #60a5fa;">' + cellId + '</strong> - Ready to execute';
        }

        // Highlight the active editor card
        document.querySelectorAll('.CodeMirror').forEach(el => {
            el.style.borderColor = '#334155';
        });
        if (editors[cellId]) {
            editors[cellId].getWrapperElement().style.borderColor = '#3b82f6';
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

            editors[cellId] = cm;

            // Set first editor as active by default
            if (index === 0) {
                setActiveCell(cellId);
            }
        });
    }

    async function runCell(cellId) {
        if (!cellId || !editors[cellId]) return;

        const cm = editors[cellId];
        const code = cm.getValue();
        const outputEl = document.getElementById('output-' + cellId);
        const statusBadge = document.getElementById('status-badge-' + cellId);

        if (statusBadge) {
            statusBadge.className = 'status-badge running';
            statusBadge.innerText = '⏳ Running...';
        }

        if (outputEl) {
            outputEl.className = 'output-console running';
            outputEl.innerHTML = '<span class="console-loading">⏳ Executing Python in WebAssembly environment...</span>';
        }

        const res = await PyodideEngine.execute(code);

        if (statusBadge) {
            if (res.success) {
                statusBadge.className = 'status-badge success';
                statusBadge.innerText = '✓ Success';
            } else {
                statusBadge.className = 'status-badge error';
                statusBadge.innerText = '✗ Error';
            }
        }

        if (outputEl) {
            let parts = [];
            if (res.stdout) {
                parts.push(escapeHtml(res.stdout));
            }
            if (res.stderr) {
                parts.push('<div class="console-error">[Error / Traceback]:\n' + escapeHtml(res.stderr) + '</div>');
            }

            let finalHtml = parts.join('\n\n');
            if (!finalHtml.trim()) {
                finalHtml = '<span class="console-empty">✓ Code executed successfully (no output produced).</span>';
            }

            outputEl.className = res.success ? 'output-console success' : 'output-console error';
            outputEl.innerHTML = finalHtml;
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

                // Trigger live review analysis if we have an editor
                if (editors[cellId] && body) {
                    body.innerHTML = `
                        <div style="text-align: center; padding: 25px 10px; color: #92400e;">
                            <div style="font-size: 1.5rem; margin-bottom: 8px;">🐰</div>
                            <strong>Code Rabbit is reviewing your code...</strong>
                            <div style="font-size: 0.8rem; margin-top: 5px; opacity: 0.8;">Checking syntax, vectorization, and data pipeline logic</div>
                        </div>
                    `;

                    const userCode = editors[cellId].getValue();
                    const outputEl = document.getElementById('output-' + cellId);
                    const lastOutput = outputEl ? outputEl.innerText : '';
                    const problem = getProblemData(cellId) || { title: cellId, markdown: '', review: '' };

                    const reviewRes = await AIReviewer.reviewCode(problem, userCode, lastOutput);
                    
                    let badgeHtml = '';
                    if (reviewRes.mode === 'ai') {
                        badgeHtml = `<div style="display:inline-block; font-size: 0.72rem; background:#dcfce7; color:#166534; padding:2px 6px; border-radius:4px; font-weight:bold; margin-bottom:10px;">✨ Live AI Mentor Review (${reviewRes.provider.toUpperCase()})</div><br>`;
                    } else {
                        badgeHtml = `<div style="display:inline-block; font-size: 0.72rem; background:#fef3c7; color:#92400e; padding:2px 6px; border-radius:4px; font-weight:bold; margin-bottom:10px;">⚡ Offline AST Inspector Mode</div><br>`;
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
        html = html.replace(/^### (.*$)/gim, '<h4 style="margin: 12px 0 6px; color: #78350f; font-size: 0.95rem;">$1</h4>');
        html = html.replace(/^## (.*$)/gim, '<h3 style="margin: 14px 0 8px; color: #78350f; font-size: 1.05rem;">$1</h3>');

        // Bold & Italic
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // Inline code
        html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

        // Lists
        html = html.replace(/^\s*-\s+(.*$)/gim, '<li style="margin-left: 15px; margin-bottom: 4px;">$1</li>');
        html = html.replace(/^\s*(\d+)\.\s+(.*$)/gim, '<li style="margin-left: 15px; margin-bottom: 4px;">$2</li>');

        // Line breaks (convert remaining \n to <br> outside <pre>)
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
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    return {
        initEditors: initEditors,
        runCell: runCell,
        toggleRabbit: toggleRabbit,
        resetCell: resetCell,
        runActiveCell: runActiveCell,
        toggleActiveRabbit: toggleActiveRabbit,
        setActiveCell: setActiveCell,
        getEditor: function(id) { return editors[id]; }
    };
})();
