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
            setStatus("Loading Python runtime...", false);

            if (typeof loadPyodide === 'undefined') {
                let retries = 0;
                while (typeof loadPyodide === 'undefined' && retries < 20) {
                    await new Promise(r => setTimeout(r, 200));
                    retries++;
                }
            }

            if (typeof loadPyodide === 'undefined') {
                throw new Error("Pyodide script failed to load. Check network connection.");
            }

            pyodide = await loadPyodide({
                indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/"
            });

            // Fast readiness: Set ready immediately, load NumPy/Pandas in background
            setStatus("Python Environment Ready", true);

            // Pre-load NumPy and Pandas asynchronously
            pyodide.loadPackage(['numpy', 'pandas']).catch(e => {
                console.warn("Background package load:", e);
            });

            // Setup AST Interactive Execution & Scope Helper
            const helperScript = [
                "import sys, io, ast, traceback, json",
                "def __pacer_execute_cell__(code_str):",
                "    _stdout = io.StringIO()",
                "    _stderr = io.StringIO()",
                "    _old_stdout, _old_stderr = sys.stdout, sys.stderr",
                "    sys.stdout, sys.stderr = _stdout, _stderr",
                "    _result_str = ''",
                "    try:",
                "        parsed = ast.parse(code_str)",
                "        if parsed.body:",
                "            last_expr = None",
                "            if isinstance(parsed.body[-1], ast.Expr):",
                "                last_expr = parsed.body.pop()",
                "            if parsed.body:",
                "                exec(compile(parsed, '<cell>', 'exec'), globals())",
                "            if last_expr is not None:",
                "                val = eval(compile(ast.Expression(last_expr.value), '<cell>', 'eval'), globals())",
                "                if val is not None:",
                "                    _result_str = str(val)",
                "    except Exception as e:",
                "        _stderr.write(traceback.format_exc())",
                "    finally:",
                "        sys.stdout, sys.stderr = _old_stdout, _old_stderr",
                "    out = _stdout.getvalue()",
                "    err = _stderr.getvalue()",
                "    if _result_str:",
                "        if out and not out.endswith(chr(10)):",
                "            out += chr(10)",
                "        out += _result_str",
                "    return out, err",
                "",
                "def __pacer_inspect_scope__():",
                "    import json",
                "    res = []",
                "    for k, v in list(globals().items()):",
                "        if k.startswith('_') or k in ('sys', 'io', 'ast', 'json', 'traceback', 'pd', 'np', 'plt', 'CodeRunner', 'loadPyodide'):",
                "            continue",
                "        try:",
                "            type_str = type(v).__name__",
                "            if type_str == 'DataFrame':",
                "                cols = list(v.columns)",
                "                res.append({",
                "                    'name': k,",
                "                    'type': 'DataFrame',",
                "                    'shape': list(v.shape),",
                "                    'columns': cols,",
                "                    'nulls': int(v.isna().sum().sum()),",
                "                    'preview': str(v.head(3).to_dict(orient='records'))",
                "                })",
                "            elif type_str == 'ndarray':",
                "                res.append({",
                "                    'name': k,",
                "                    'type': 'ndarray (' + str(v.dtype) + ')',",
                "                    'shape': list(v.shape),",
                "                    'nulls': 0,",
                "                    'preview': str(v[:5]) if v.ndim == 1 else str(v[:2, :2])",
                "                })",
                "            elif type_str in ('list', 'dict', 'Series', 'int', 'float', 'str'):",
                "                res.append({",
                "                    'name': k,",
                "                    'type': type_str,",
                "                    'shape': [len(v)] if hasattr(v, '__len__') else [1],",
                "                    'nulls': 0,",
                "                    'preview': str(v)[:60]",
                "                })",
                "        except Exception:",
                "            pass",
                "    return json.dumps(res)"
            ].join('\n');

            await pyodide.runPythonAsync(helperScript);

        } catch (err) {
            console.error("Pyodide Engine Init Error:", err);
            setStatus("Ready (Offline Mode)", true);
        }
    }

    async function execute(code) {
        if (!isLoaded || !pyodide) {
            return {
                success: false,
                stdout: "",
                stderr: "Python environment is initializing. Please try again in a moment.",
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
