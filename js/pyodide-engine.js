/**
 * PACER Data Engineering - Pyodide Runtime Engine
 * Handles Python initialization, package loading, and Jupyter-style AST execution.
 */

var PyodideEngine = (function() {
    let pyodide = null;
    let isLoaded = false;
    let status = "Initializing Python runtime...";
    let statusListeners = [];

    function setStatus(newStatus, loaded = false) {
        status = newStatus;
        isLoaded = loaded;
        statusListeners.forEach(listener => {
            try { listener(status, isLoaded); } catch (e) { console.error(e); }
        });
    }

    function onStatusChange(callback) {
        statusListeners.push(callback);
        callback(status, isLoaded);
    }

    async function init() {
        try {
            setStatus("Loading Pyodide WebAssembly core...", false);
            
            pyodide = await loadPyodide({
                indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/"
            });

            setStatus("Pre-loading NumPy & Pandas...", false);
            try {
                await pyodide.loadPackage(['numpy', 'pandas']);
            } catch (pkgErr) {
                console.warn("Pre-load package warning:", pkgErr);
            }

            // Setup AST Interactive Execution Helper
            // Using chr(10) eliminates template string newline escape issues
            await pyodide.runPythonAsync(
                "import sys, io, ast, traceback\n" +
                "def __pacer_execute_cell__(code_str):\n" +
                "    _stdout = io.StringIO()\n" +
                "    _stderr = io.StringIO()\n" +
                "    _old_stdout, _old_stderr = sys.stdout, sys.stderr\n" +
                "    sys.stdout, sys.stderr = _stdout, _stderr\n" +
                "    _result_str = ''\n" +
                "    try:\n" +
                "        parsed = ast.parse(code_str)\n" +
                "        if parsed.body:\n" +
                "            last_expr = None\n" +
                "            if isinstance(parsed.body[-1], ast.Expr):\n" +
                "                last_expr = parsed.body.pop()\n" +
                "            if parsed.body:\n" +
                "                exec(compile(parsed, '<cell>', 'exec'), globals())\n" +
                "            if last_expr is not None:\n" +
                "                val = eval(compile(ast.Expression(last_expr.value), '<cell>', 'eval'), globals())\n" +
                "                if val is not None:\n" +
                "                    _result_str = str(val)\n" +
                "    except Exception as e:\n" +
                "        _stderr.write(traceback.format_exc())\n" +
                "    finally:\n" +
                "        sys.stdout, sys.stderr = _old_stdout, _old_stderr\n" +
                "    out = _stdout.getvalue()\n" +
                "    err = _stderr.getvalue()\n" +
                "    if _result_str:\n" +
                "        if out and not out.endswith(chr(10)):\n" +
                "            out += chr(10)\n" +
                "        out += _result_str\n" +
                "    return out, err\n"
            );

            setStatus("Python Environment Ready ✓", true);
        } catch (err) {
            console.error("Pyodide Engine Init Error:", err);
            setStatus("Error loading Python: " + (err.message || err), false);
        }
    }

    async function execute(code) {
        if (!isLoaded || !pyodide) {
            return {
                success: false,
                stdout: "",
                stderr: "Python environment is still initializing. Please wait for 'Python Environment Ready ✓' and run again."
            };
        }

        try {
            // Automatically install/load imported packages if needed (scikit-learn, matplotlib, etc.)
            try {
                await pyodide.loadPackagesFromImports(code);
            } catch (importErr) {
                console.warn("loadPackagesFromImports warning:", importErr);
            }

            pyodide.globals.set('_cell_code_to_run', code);
            const res = await pyodide.runPythonAsync('__pacer_execute_cell__(_cell_code_to_run)');
            const [stdout, stderr] = res.toJs();

            return {
                success: !stderr || stderr.trim().length === 0,
                stdout: stdout ? stdout.trimEnd() : "",
                stderr: stderr ? stderr.trimEnd() : ""
            };
        } catch (err) {
            return {
                success: false,
                stdout: "",
                stderr: "Execution Error: " + (err.message || String(err))
            };
        }
    }

    return {
        init: init,
        execute: execute,
        onStatusChange: onStatusChange,
        isReady: function() { return isLoaded; },
        getStatus: function() { return status; }
    };
})();
