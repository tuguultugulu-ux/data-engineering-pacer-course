/**
 * PACER Data Engineering - Editor & Execution Manager
 * Manages CodeMirror instances, UI interactions, hotkeys, and Code Rabbit review panels.
 */

var EditorManager = (function() {
    let editors = {};
    let activeCellId = null;

    function getInitialCode(cellId) {
        if (!window.COURSE_DATA || !COURSE_DATA.lessons) return '';
        for (let key in COURSE_DATA.lessons) {
            const l = COURSE_DATA.lessons[key];
            if (l.isExam && (l.id === cellId || (l.id + '-0') === cellId)) {
                return (l.starterCode || '').replace(/\\n/g, '\n');
            }
            if (l.practices) {
                const p = l.practices.find(item => item.id === cellId);
                if (p && p.code) {
                    return p.code.replace(/\\n/g, '\n');
                }
            }
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

    function toggleRabbit(cellId) {
        if (!cellId) cellId = activeCellId;
        if (!cellId) return;

        const panel = document.getElementById('rabbit-' + cellId);
        const btn = document.getElementById('rabbit-btn-' + cellId);

        if (panel) {
            const isHidden = panel.classList.contains('hidden');
            if (isHidden) {
                panel.classList.remove('hidden');
                if (btn) btn.classList.add('active');
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
        runActiveCell: runActiveCell,
        toggleActiveRabbit: toggleActiveRabbit,
        setActiveCell: setActiveCell,
        getEditor: function(id) { return editors[id]; }
    };
})();
