/**
 * PACER Data Engineering - Code Rabbit AI Reviewer
 * Production-Grade Architecture:
 * - Option 1: Live LLM Mentor Review (Gemini / OpenAI / Groq) with User's API Key
 * - Option 3: Intelligent In-Browser Python AST Analyzer & Static Linter (Fallback when no key)
 * - Full Bilingual Support (English / Mongolian)
 * Zero Emojis, Strict Typographic Hierarchy
 */

var AIReviewer = (function() {
    const STORAGE_KEY = 'pacer_ai_key';
    const PROVIDER_KEY = 'pacer_ai_provider';

    function getApiKey() {
        return localStorage.getItem(STORAGE_KEY) || '';
    }

    function setApiKey(key) {
        if (key) {
            localStorage.setItem(STORAGE_KEY, key.trim());
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
    }

    function getProvider() {
        return localStorage.getItem(PROVIDER_KEY) || 'gemini';
    }

    function setProvider(provider) {
        localStorage.setItem(PROVIDER_KEY, provider);
    }

    function hasApiKey() {
        return !!getApiKey();
    }

    async function reviewCode(problem, userCode, lastOutput = '') {
        const apiKey = getApiKey();
        const provider = getProvider();

        if (apiKey) {
            try {
                const aiFeedback = await callLLM(provider, apiKey, problem, userCode, lastOutput);
                return {
                    success: true,
                    mode: 'ai',
                    provider: provider,
                    content: aiFeedback
                };
            } catch (err) {
                console.warn("AI API call failed, falling back to local AST analyzer:", err);
                const localReport = await runLocalASTAnalysis(problem, userCode, lastOutput);
                return {
                    success: true,
                    mode: 'ast_fallback',
                    error: err.message || String(err),
                    content: localReport
                };
            }
        } else {
            // No API Key: Run Option 3 (In-Browser Python AST static analysis)
            const localReport = await runLocalASTAnalysis(problem, userCode, lastOutput);
            return {
                success: true,
                mode: 'ast',
                content: localReport
            };
        }
    }

    async function callLLM(provider, apiKey, problem, userCode, lastOutput) {
        const isMn = (typeof I18n !== 'undefined' && I18n.getLang() === 'mn');

        const systemPrompt = isMn
            ? `Та бол Code Rabbit хэмээх туршлагатай Өгөгдлийн Ахлах Инженер бөгөөд багш юм.
Оюутны бичсэн Python кодыг Монгол хэлээр нягтлан шалгаж, заавар зөвлөгөө өгнө үү. Эможи бүү ашигла.
Хариуг дараах бүтэцтэйгээр Монгол хэлээр бичнэ үү:
1. **Зөв Эсэх ба Үнэлгээ**: Даалгаврын шаардлагыг зөв биелүүлсэн эсэх.
2. **Векторжуулалт ба Хурд**: Pandas/NumPy дээр шаардлагагүй 'for', 'while' давталт ашигласан эсэхийг шалгах.
3. **Онцгой Тохиолдол ба Цэвэр Код**: NaN утга боловсруулалт, санах ойн хэмнэлт, индекс.
4. **Сайжруулах Зөвлөмж ба Код**: Товч, оновчтой кодын жишээ.`
            : `You are Code Rabbit, a Senior Data Engineer and Python Mentor.
Your role is to review a student's Python code for a specific Data Engineering challenge.
Do not use emojis. Be direct, precise, and pedagogical.
Format your review with clear Markdown sections:
1. **Assessment & Correctness**: Did they solve the problem correctly?
2. **Vectorization & Performance**: Flag any unnecessary 'for' or 'while' loops in Pandas/NumPy. Verify if operations are vectorized.
3. **Edge Cases & Clean Code**: Mention NaN handling, memory efficiency, indexing, or method chaining.
4. **Suggested Solution / Improvement**: Provide a clean code snippet if they are stuck or can improve.`;

        const userPrompt = isMn
            ? `### Даалгавар:
**Сэдэв**: ${problem.title || 'Өгөгдлийн Пайплайн'}
**Шаардлага**:
${problem.markdown || 'Шаардлагыг биелүүлнэ үү.'}

### Оюутны Бичсэн Код:
\`\`\`python
${userCode || '# Код бичигдээгүй байна'}
\`\`\`

### Терминалын Гаралт:
\`\`\`
${lastOutput || 'Гаралт байхгүй.'}
\`\`\`

Дээрх шаардлагын дагуу оюутны кодыг нягтлан зөвлөгөө өгнө үү.`
            : `### Problem Scenario:
**Topic**: ${problem.title || 'Data Pipeline'}
**Requirements**:
${problem.markdown || 'Solve the prompt requirements.'}

### Student's Current Code:
\`\`\`python
${userCode || '# No code written yet'}
\`\`\`

### Execution Console Output:
\`\`\`
${lastOutput || 'No output recorded.'}
\`\`\`

Please review the student's code according to the requirements.`;

        if (provider === 'gemini') {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                { text: systemPrompt + "\n\n" + userPrompt }
                            ]
                        }
                    ],
                    generationConfig: {
                        temperature: 0.2,
                        maxOutputTokens: 1000
                    }
                })
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error?.message || `Gemini API Error: HTTP ${res.status}`);
            }

            const data = await res.json();
            return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received from Gemini.";
        } else if (provider === 'openai' || provider === 'groq') {
            const endpoint = provider === 'groq'
                ? 'https://api.groq.com/openai/v1/chat/completions'
                : 'https://api.openai.com/v1/chat/completions';

            const model = provider === 'groq' ? 'llama-3.3-70b-versatile' : 'gpt-4o-mini';

            const res = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: model,
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: userPrompt }
                    ],
                    temperature: 0.2,
                    max_tokens: 1000
                })
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error?.message || `${provider.toUpperCase()} API Error: HTTP ${res.status}`);
            }

            const data = await res.json();
            return data.choices?.[0]?.message?.content || "No response received.";
        } else {
            throw new Error(`Unsupported provider: ${provider}`);
        }
    }

    async function runLocalASTAnalysis(problem, userCode, lastOutput) {
        const isMn = (typeof I18n !== 'undefined' && I18n.getLang() === 'mn');

        if (!userCode || !userCode.trim()) {
            return isMn
                ? `### Code Rabbit Офлайн Шалгагч\n*Код бичих талбарт код бичигдээгүй байна.*\n\n**Зөвлөмж:**\n${problem.review || 'DataFrame-ийн хэлбэр болон багануудыг шалгана уу.'}\n\n---\n*Зөвлөгөө: Бодит AI дүгнэлт авахын тулд Тохиргоо хэсгээс үнэгүй Gemini API түлхүүрээ холбоно уу.*`
                : `### Code Rabbit Local Inspector\n*No code written yet in the editor.*\n\n**Curated Guidance:**\n${problem.review || 'Inspect your DataFrame shapes and use vectorized operations.'}\n\n---\n*Tip: Configure an AI API key in AI Settings to enable live generative code reviews.*`;
        }

        // Run in-browser AST analysis via Pyodide
        let astResult = null;
        if (typeof PyodideEngine !== 'undefined' && PyodideEngine.isReady()) {
            try {
                const pyScript = `
import ast, json

def __inspect_code_ast__(code_text):
    try:
        tree = ast.parse(code_text)
    except SyntaxError as e:
        return json.dumps({"syntax_error": f"Line {e.lineno}: {e.msg}"})
        
    loops = []
    for node in ast.walk(tree):
        if isinstance(node, (ast.For, ast.While)):
            loops.append(getattr(node, 'lineno', 1))
            
    calls = []
    for node in ast.walk(tree):
        if isinstance(node, ast.Call):
            if isinstance(node.func, ast.Attribute):
                calls.append(node.func.attr)
            elif isinstance(node.func, ast.Name):
                calls.append(node.func.id)
                
    return json.dumps({
        "valid": True,
        "loops": loops,
        "calls": list(set(calls))
    })

__inspect_code_ast__(_cell_code_to_run)
`;
                const rawJson = await PyodideEngine.execute(pyScript);
                if (rawJson.success && rawJson.stdout) {
                    astResult = JSON.parse(rawJson.stdout);
                }
            } catch (e) {
                console.warn("AST execution error:", e);
            }
        }

        let report = isMn ? `### Офлайн Код Шалгалт (AST Горим)\n\n` : `### Local Code Inspection (AST Mode)\n\n`;

        if (astResult) {
            if (astResult.syntax_error) {
                report += isMn ? `**Синтаксын Алдаа**: \`${astResult.syntax_error}\`\n\n` : `**Syntax Error**: \`${astResult.syntax_error}\`\n\n`;
            } else {
                report += isMn ? `**Python Синтакс**: Зөв AST бүтэцтэй\n\n` : `**Python Syntax**: Valid AST Structure\n\n`;
                if (astResult.loops && astResult.loops.length > 0) {
                    report += isMn
                        ? `**Векторжуулалтын Сануулга**: ${astResult.loops.join(', ')}-р мөрөнд давталт (\`for\`/\`while\`) илэрлээ.\n*Өгөгдлийн пайплайнд мөр дагасан давталтыг Pandas/NumPy-ийн векторжуулсан үйлдлээр солино уу.*\n\n`
                        : `**Vectorization Warning**: Detected Python loop (\`for\`/\`while\`) on line ${astResult.loops.join(', ')}.\n*In production data pipelines, replace row-by-row loops with vectorized Pandas/NumPy operations.*\n\n`;
                } else {
                    report += isMn ? `**Векторжуулалт**: Амжилттай (Ил давталт илрээгүй)\n\n` : `**Vectorization Check**: Passed (No explicit loops detected)\n\n`;
                }

                if (astResult.calls && astResult.calls.length > 0) {
                    report += isMn ? `**Дуудагдсан функцууд**: \`${astResult.calls.slice(0, 6).join('`, `')}\`\n\n` : `**Detected Method Calls**: \`${astResult.calls.slice(0, 6).join('`, `')}\`\n\n`;
                }
            }
        }

        report += isMn ? `### Багшийн Зөвлөмж:\n` : `### Curated Mentor Guidance:\n`;
        report += `${problem.review || (isMn ? 'DataFrame-ийн хэлбэр болон дутуу утгуудыг .info() болон .shape ашиглан шалгана уу.' : 'Inspect missing values and DataFrame shapes using .info() and .shape after every step.')}\n\n`;

        report += `---\n`;
        report += isMn ? `*Зөвлөгөө: Google Gemini эсвэл Groq API түлхүүр холбож бодит интерактив дүгнэлт авна уу.*` : `*Tip: Connect a free Google Gemini or Groq API Key in AI Settings to enable live interactive mentor feedback.*`;

        return report;
    }

    return {
        getApiKey: getApiKey,
        setApiKey: setApiKey,
        getProvider: getProvider,
        setProvider: setProvider,
        hasApiKey: hasApiKey,
        reviewCode: reviewCode
    };
})();
