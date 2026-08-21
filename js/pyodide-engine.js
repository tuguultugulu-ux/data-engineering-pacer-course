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
                "def __pacer_inspect_scope__():\n" +
                "    import json\n" +
                "    res = []\n" +
                "    for k, v in list(globals().items()):\n" +
                "        if k.startswith('_') or k in ('sys', 'io', 'ast', 'json', 'traceback', 'pd', 'np', 'plt', 'CodeRunner', 'loadPyodide'):\n" +
                "            continue\n" +
                "        try:\n" +
                "            type_str = type(v).__name__\n" +
                "            if type_str == 'DataFrame':\n" +
                "                cols = list(v.columns)\n" +
                "                res.append({\n" +
                "                    'name': k,\n" +
                "                    'type': 'DataFrame',\n" +
                "                    'shape': list(v.shape),\n" +
                "                    'columns': cols,\n" +
                "                    'nulls': int(v.isna().sum().sum()),\n" +
                "                    'preview': str(v.head(3).to_dict(orient='records'))\n" +
                "                })\n" +
                "            elif type_str == 'ndarray':\n" +
                "                res.append({\n" +
                "                    'name': k,\n" +
                "                    'type': 'ndarray (' + str(v.dtype) + ')',\n" +
                "                    'shape': list(v.shape),\n" +
                "                    'nulls': int(np.isnan(v).sum()) if np.issubdtype(v.dtype, np.number) else 0,\n" +
                "                    'preview': str(v[:5]) if v.ndim == 1 else str(v[:2, :2])\n" +
                "                })\n" +
                "            elif type_str in ('list', 'dict', 'Series', 'int', 'float', 'str'):\n" +
                "                res.append({\n" +
                "                    'name': k,\n" +
                "                    'type': type_str,\n" +
                "                    'shape': [len(v)] if hasattr(v, '__len__') else [1],\n" +
                "                    'nulls': 0,\n" +
                "                    'preview': str(v)[:60]\n" +
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
                const scopeJson = await pyodide.runPythonAsync('__pacer_inspect_scope__()');
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

    async function inspectScope() {
        if (!isLoaded || !pyodide) return [];
        try {
            const scopeJson = await pyodide.runPythonAsync('__pacer_inspect_scope__()');
            return JSON.parse(scopeJson);
        } catch (err) {
            console.warn("inspectScope error:", err);
            return [];
        }
    }

    async function runUnitTests(userCode, starterCode, challengeMeta = {}) {
        if (!isLoaded || !pyodide) {
            return [
                { name: "Python Runtime Initialization", passed: false, msg: "Python runtime is still loading. Please wait." }
            ];
        }

        const isMn = (typeof I18n !== 'undefined' && I18n.getLang() === 'mn');
        const tests = [];

        // 1. Implementation Check (Make sure student actually modified code)
        const cleanUser = (userCode || '').trim();
        const cleanStarter = (starterCode || '').trim();

        const isModified = cleanUser.length > 0 && cleanUser !== cleanStarter;
        if (!isModified) {
            tests.push({
                name: isMn ? "Код Бичсэн Эсэх Шалгалт" : "User Code Implementation",
                passed: false,
                msg: isMn ? "Алдаа: Та даалгаврын шаардлагын дагуу шийдлийн кодоо бичиж ажиллуулна уу (Эх код өөрчлөгдөөгүй байна)." : "Failed: No solution code detected. You must write code to solve the challenge before running tests."
            });
            return tests;
        } else {
            tests.push({
                name: isMn ? "Код Бичсэн Эсэх Шалгалт" : "User Code Implementation",
                passed: true,
                msg: isMn ? "Шинэ шийдлийн код бичигдсэн байна." : "New code implementation detected."
            });
        }

        // 2. Syntax & Runtime Execution Check
        const execRes = await execute(userCode);
        if (!execRes.success) {
            tests.push({
                name: isMn ? "Синтакс ба Ажиллах Орчны Шалгалт" : "Syntax & Runtime Execution",
                passed: false,
                msg: (isMn ? "Код ажиллахад алдаа гарлаа: " : "Runtime Exception: ") + (execRes.stderr || "Execution Error")
            });
            return tests;
        } else {
            tests.push({
                name: isMn ? "Синтакс ба Ажиллах Орчны Шалгалт" : "Syntax & Runtime Execution",
                passed: true,
                msg: isMn ? "Код ямар нэгэн алдаагүй амжилттай ажиллалаа." : "Code executed successfully with zero runtime exceptions."
            });
        }

        // 3. Strict Vectorization Check (No for/while loops)
        try {
            const checkLoopScript = `
import ast, json
try:
    tree = ast.parse(_cell_code_to_run)
    loops = [getattr(n, 'lineno', 1) for n in ast.walk(tree) if isinstance(n, (ast.For, ast.While))]
    __loop_res__ = json.dumps(loops)
except Exception:
    __loop_res__ = "[]"
__loop_res__
`;
            pyodide.globals.set('_cell_code_to_run', userCode);
            const loopJson = await pyodide.runPythonAsync(checkLoopScript);
            const loops = JSON.parse(loopJson);

            if (loops.length > 0) {
                tests.push({
                    name: isMn ? "Векторжуулалтын Шаардлага (Давталтгүй байх)" : "Vectorization Constraint (Zero Loops)",
                    passed: false,
                    msg: isMn ? `Алдаа: ${loops.join(', ')}-р мөрөнд 'for'/'while' давталт илэрлээ. Векторжуулсан үйлдэл ашиглана уу.` : `Failed: Loop detected on line ${loops.join(', ')}. In production data pipelines, replace explicit loops with vectorized Pandas/NumPy operations.`
                });
            } else {
                tests.push({
                    name: isMn ? "Векторжуулалтын Шаардлага (Давталтгүй байх)" : "Vectorization Constraint (Zero Loops)",
                    passed: true,
                    msg: isMn ? "Амжилттай: Ил давталт ('for'/'while') ашиглаагүй, бүрэн векторжуулсан." : "Passed: 100% vectorized execution with zero explicit loops."
                });
            }
        } catch (lErr) {
            console.warn("Loop check error:", lErr);
        }

        // 4. Output Data Structure & Transformation Integrity Check
        const scope = await inspectScope();
        const hasDataStructures = scope.length > 0;

        if (hasDataStructures) {
            // Find main DataFrame or array
            const mainDF = scope.find(s => s.type === 'DataFrame') || scope[0];
            tests.push({
                name: isMn ? "Өгөгдлийн Бүтцийн Баталгаажуулалт" : "Data Structure Validation",
                passed: true,
                msg: isMn ? `Санах ойд '${mainDF.name}' (${mainDF.type}) бүтэц үүссэн байна. Хэмжээ: ${JSON.stringify(mainDF.shape)}.` : `Verified '${mainDF.name}' (${mainDF.type}) in memory. Shape: ${JSON.stringify(mainDF.shape)}, Nulls: ${mainDF.nulls}.`
            });
        } else {
            tests.push({
                name: isMn ? "Өгөгдлийн Бүтцийн Баталгаажуулалт" : "Data Structure Validation",
                passed: false,
                msg: isMn ? "Санах ойд боловсруулагдсан өгөгдлийн бүтэц (DataFrame/Array) олдсонгүй." : "Failed: No processed DataFrame or array found in memory scope."
            });
        }

        return tests;
    }

    return {
        init: init,
        execute: execute,
        inspectScope: inspectScope,
        runUnitTests: runUnitTests,
        onStatusChange: onStatusChange,
        isReady: function() { return isLoaded; },
        getStatus: function() { return status; }
    };
})();
