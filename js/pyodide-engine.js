/**
 * PACER Data Engineering - Pyodide Runtime Engine
 * Handles Python initialization, package loading, performance profiling, and scope inspection.
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

            // Setup AST Interactive Execution & Scope Inspection Helper
            await pyodide.runPythonAsync(
                "import sys, io, ast, traceback, json\n" +
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
                "    return out, err\n\n" +
                "def __inspect_scope_data__():\n" +
                "    import pandas as pd\n" +
                "    import numpy as np\n" +
                "    res = []\n" +
                "    for k, v in list(globals().items()):\n" +
                "        if k.startswith('_') or k in ('sys', 'io', 'ast', 'json', 'traceback', 'pd', 'np', 'plt'):\n" +
                "            continue\n" +
                "        try:\n" +
                "            if isinstance(v, pd.DataFrame):\n" +
                "                res.append({\n" +
                "                    'name': k,\n" +
                "                    'type': 'DataFrame',\n" +
                "                    'shape': str(v.shape),\n" +
                "                    'nulls': int(v.isna().sum().sum()),\n" +
                "                    'preview': str(v.head(3))\n" +
                "                })\n" +
                "            elif isinstance(v, np.ndarray):\n" +
                "                res.append({\n" +
                "                    'name': k,\n" +
                "                    'type': 'ndarray (' + str(v.dtype) + ')',\n" +
                "                    'shape': str(v.shape),\n" +
                "                    'nulls': int(np.isnan(v).sum()) if np.issubdtype(v.dtype, np.number) else 0,\n" +
                "                    'preview': str(v[:3]) if v.ndim == 1 else str(v[:2, :2])\n" +
                "                })\n" +
                "        except Exception:\n" +
                "            pass\n" +
                "    return json.dumps(res)\n"
            );

            setStatus("Python Environment Ready", true);
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
                stderr: "Python environment is still initializing. Please wait for runtime ready and execute again.",
                durationMs: 0,
                scope: []
            };
        }

        const startTime = performance.now();

        try {
            try {
                await pyodide.loadPackagesFromImports(code);
            } catch (importErr) {
                console.warn("loadPackagesFromImports warning:", importErr);
            }

            pyodide.globals.set('_cell_code_to_run', code);
            const res = await pyodide.runPythonAsync('__pacer_execute_cell__(_cell_code_to_run)');
            const [stdout, stderr] = res.toJs();
            const durationMs = Math.round((performance.now() - startTime) * 100) / 100;

            // Extract variable scope data
            let scopeData = [];
            try {
                const scopeJson = await pyodide.runPythonAsync('__inspect_scope_data__()');
                scopeData = JSON.parse(scopeJson);
            } catch (sErr) {
                console.warn("Scope inspection warning:", sErr);
            }

            return {
                success: !stderr || stderr.trim().length === 0,
                stdout: stdout ? stdout.trimEnd() : "",
                stderr: stderr ? stderr.trimEnd() : "",
                durationMs: durationMs,
                scope: scopeData
            };
        } catch (err) {
            return {
                success: false,
                stdout: "",
                stderr: "Execution Error: " + (err.message || String(err)),
                durationMs: 0,
                scope: []
            };
        }
    }

    async function runUnitTests(userCode, testScript) {
        if (!isLoaded || !pyodide) return [];

        try {
            pyodide.globals.set('_user_code_str', userCode);
            // Execute user code first in sandbox
            await pyodide.runPythonAsync('__pacer_execute_cell__(_user_code_str)');
            
            // Execute test script
            const testResJson = await pyodide.runPythonAsync(testScript);
            return JSON.parse(testResJson);
        } catch (err) {
            console.error("Test execution error:", err);
            return [
                { name: "Unit Test Runner", passed: false, msg: "Test failed to complete: " + (err.message || String(err)) }
            ];
        }
    }

    return {
        init: init,
        execute: execute,
        runUnitTests: runUnitTests,
        onStatusChange: onStatusChange,
        isReady: function() { return isLoaded; },
        getStatus: function() { return status; }
    };
})();
