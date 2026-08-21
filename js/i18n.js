/**
 * PACER Data Engineering - Internationalization (i18n) Engine
 * Supports English (en) and Mongolian (mn) localization with instant reactive switching.
 */

var I18n = (function() {
    const STORAGE_KEY = 'pacer_lang';
    let currentLang = (typeof localStorage !== 'undefined' && localStorage.getItem(STORAGE_KEY)) || 'en';

    function getLang() {
        return currentLang;
    }

    function setLang(lang) {
        currentLang = lang;
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, lang);
        }
    }

    const dict = {
        en: {
            brandTitle: "PACER Data Engineering",
            brandSubtitle: "10-Week Mastery Curriculum",
            aiSetupTitle: "AI Reviewer Setup",
            aiOfflineStatus: "Offline AST Mode",
            aiActiveSuffix: " Active",
            targetLabel: "Target: ",
            clickCell: "Click an editor cell to begin",
            pyodideReady: "Python 3.10 Runtime Ready",
            pyodideInit: "Initializing Python runtime...",
            runBtn: "Run",
            rabbitBtn: "Code Rabbit",
            resetBtn: "Reset",
            runTestsBtn: "Run Tests",
            dataInspector: "Data Inspector",
            showSolution: "Solution",
            hideSolution: "Hide",
            solutionLockedMsg: "Solution unlocks after 3 code run attempts. Attempt: ",
            attemptsLabel: "runs",
            solveTimeLabel: "Time: ",
            architectureMap: "Data Architecture Pipeline Flow",
            benchmarkBtn: "Benchmark",
            progressTitle: "Curriculum Progress",
            progressLabel: "Challenges Solved",
            testsPassed: "Unit Tests Passed",
            allTestsPassed: "All Automated Unit Tests Passed",
            testsFailed: "Unit Tests Failed",
            copySolution: "Copy to Editor",
            execTime: "Execution Time",
            memoryUsage: "Memory Footprint",
            varName: "Variable",
            varType: "Type",
            varShape: "Shape",
            varMissing: "Nulls",
            openNewTab: "Open in new tab",
            practiceHeader: "Practice Challenges (10 Tiers per Topic)",
            practiceSub: "Apply the concepts you just read in the official text above. Each challenge uses a unique dataset.",
            examTitleSub: "Comprehensive Phase Evaluation — Advanced End-to-End Pipeline",
            examCardTitle: "Final Phase Exam",
            examNotice: "This exam evaluates every core concept covered in this phase. You have a blank slate. Write and execute your entire solution below.",
            terminalOutput: "Terminal Output",
            codeRabbitReview: "Code Rabbit Review",
            pressRun: "Press Ctrl+Enter or click Run to execute code.",
            pressRunExam: "Press Ctrl+Enter or click Run to execute solution.",
            running: "Running...",
            executing: "Executing Python runtime...",
            success: "Success",
            error: "Error",
            emptyOutput: "Code executed successfully (no output produced).",
            shortcutRun: "Run Code",
            shortcutReview: "AI Review",
            levelEasy: "Easy",
            levelIntermediate: "Intermediate",
            levelAdvanced: "Advanced",
            levelComplex: "Complex",
            levelMastery: "Mastery",
            modalTitle: "Code Rabbit AI Reviewer Configuration",
            modalDesc: "Connect your API key to enable live generative code reviews on your Python submissions. If left blank, Code Rabbit operates in <strong>Offline AST Inspector Mode</strong>.",
            providerLabel: "AI Provider",
            apiKeyLabel: "API Key",
            apiKeyPlaceholder: "Paste your API key (e.g. AIzaSy...)",
            geminiHelpTitle: "Free Google Gemini API Key:",
            geminiHelpDesc: "Visit Google AI Studio to generate a key in seconds (no credit card required).",
            privacyNote: "Your API key is stored strictly in your browser local storage and only communicates directly with the selected AI endpoint.",
            clearBtn: "Clear",
            testBtn: "Test Connection",
            saveBtn: "Save Key",
            analyzingCode: "Analyzing Code...",
            inspectingAst: "Inspecting syntax, vectorization, and data pipeline logic",
            liveAiReviewBadge: "Live AI Review",
            offlineAstBadge: "Offline AST Inspector Mode"
        },
        mn: {
            brandTitle: "PACER Өгөгдлийн Инженерчлэл",
            brandSubtitle: "10 Долоо хоногийн Цогц Хөтөлбөр",
            aiSetupTitle: "AI Код Шалгагч Тохиргоо",
            aiOfflineStatus: "Офлайн AST Горим",
            aiActiveSuffix: " Идэвхтэй",
            targetLabel: "Идэвхтэй нүд: ",
            clickCell: "Код бичих нүдэн дээр дарж эхлүүлнэ үү",
            pyodideReady: "Python 3.10 Хөдөлгүүр Бэлэн",
            pyodideInit: "Python орчныг ачааллаж байна...",
            runBtn: "Ажиллуулах",
            rabbitBtn: "Код Шалгах",
            resetBtn: "Шинэчлэх",
            runTestsBtn: "Тест Ажиллуулах",
            dataInspector: "Дата Хянагч",
            showSolution: "Шийдэл",
            hideSolution: "Нуух",
            solutionLockedMsg: "Шийдлийг нээхийн тулд кодоо 3 удаа ажиллуулна уу. Оролдлого: ",
            attemptsLabel: "удаа",
            solveTimeLabel: "Хугацаа: ",
            architectureMap: "Өгөгдлийн Бүтэц ба Пайплайн Схем",
            benchmarkBtn: "Хурд Хэмжих",
            progressTitle: "Сургалтын Явц",
            progressLabel: "Бодсон Даалгавар",
            testsPassed: "Амжилттай Давсан Тест",
            allTestsPassed: "Бүх Автомат Юнит Тест Амжилттай Давлаа",
            testsFailed: "Тест Амжилтгүй",
            copySolution: "Код руу хуулах",
            execTime: "Ажилласан хугацаа",
            memoryUsage: "Санах ой ашиглалт",
            varName: "Хувьсагч",
            varType: "Төрөл",
            varShape: "Хэмжээ",
            varMissing: "Хоосон утга",
            openNewTab: "Шинэ таб дээр нээх",
            practiceHeader: "Дадлага Даалгаврууд (Сэдэв бүрт 10 Түвшин)",
            practiceSub: "Дээр уншсан онолын мэдлэгээ бодит датасет дээр туршин баталгаажуулна уу. Даалгавар бүр өвөрмөц бүтэцтэй өгөгдөлтэй.",
            examTitleSub: "Үе шатны Нэгдсэн Үнэлгээ — Төгсгөлийн Цогц Пайплайн Шалгалт",
            examCardTitle: "Үе Шатны Төгсгөлийн Шалгалт",
            examNotice: "Энэхүү шалгалт нь тухайн үе шатанд судалсан бүх чухал концепцуудыг шалгана. Танд хоосон хуудас өгөгдсөн бөгөөд бүтэн шийдлээ доор бичиж ажиллуулна уу.",
            terminalOutput: "Терминал Гаралт",
            codeRabbitReview: "Code Rabbit Зөвлөгөө",
            pressRun: "Кодоо ажиллуулахын тулд Ctrl+Enter дарах эсвэл Ажиллуулах товчийг дарна уу.",
            pressRunExam: "Шалгалтын шийдлийг ажиллуулахын тулд Ctrl+Enter эсвэл Ажиллуулах товчийг дарна уу.",
            running: "Ажиллаж байна...",
            executing: "Python кодыг ажиллуулж байна...",
            success: "Амжилттай",
            error: "Алдаа гарлаа",
            emptyOutput: "Код амжилттай ажиллалаа (гаралт хоосон байна).",
            shortcutRun: "Код Ажиллуулах",
            shortcutReview: "AI Шалгалт",
            levelEasy: "Хялбар",
            levelIntermediate: "Дунд шат",
            levelAdvanced: "Ахисан шат",
            levelComplex: "Гүнзгий шат",
            levelMastery: "Мастер шалгалт",
            modalTitle: "Code Rabbit AI Тохиргоо",
            modalDesc: "Python кодондоо хиймэл оюуны бодит зөвлөгөө авахын тулд API түлхүүрээ оруулна уу. Түлхүүргүй тохиолдолд <strong>Офлайн AST шалгагч горимоор</strong> ажиллана.",
            providerLabel: "AI Үйлчилгээ үзүүлэгч",
            apiKeyLabel: "API Түлхүүр (API Key)",
            apiKeyPlaceholder: "API түлхүүрээ энд буулгана уу (ж.нь AIzaSy...)",
            geminiHelpTitle: "Үнэгүй Google Gemini API Түлхүүр авах:",
            geminiHelpDesc: "Google AI Studio дээр зочилж хэдхэн секундэд үнэгүй түлхүүр үүсгэх боломжтой (карт шаардахгүй).",
            privacyNote: "Таны API түлхүүр зөвхөн таны хөтчийн санах ойд хадгалагдах бөгөөд зөвхөн AI үйлчилгээтэй шууд холбогдоно.",
            clearBtn: "Арилгах",
            testBtn: "Холболт Шалгах",
            saveBtn: "Хадгалах",
            analyzingCode: "Кодыг Шинжилж Байна...",
            inspectingAst: "Синтакс, векторжуулалт болон өгөгдлийн логикийг шалгаж байна",
            liveAiReviewBadge: "Бодит AI Зөвлөгөө",
            offlineAstBadge: "Офлайн AST Шалгагч Горим"
        }
    };

    const phaseTitlesMn = {
        "intro": "Танилцуулга ба 10 Долоо Хоногийн Төлөвлөгөө",
        "1": "Үе шат 1: Python суурь ба Git",
        "2": "Үе шат 2: NumPy Тоон Өгөгдөл",
        "3": "Үе шат 3: Pandas ба Дата Аудит",
        "4": "Үе шат 4: Визуализаци ба Статистик",
        "5": "Үе шат 5: Өгөгдлийн Пайплайн Бүтээх",
        "6": "Үе шат 6: Scikit-learn Пайплайн"
    };

    const lessonTitlesMn = {
        "intro": "10 Долоо хоногийн Хөтөлбөр ба Эх Сурвалжууд",
        "p1_overview": "Үе шат 1: Төслийн Зорилго",
        "p1_git": "Pro Git: Суурь Ухагдахуун",
        "p2_overview": "Үе шат 2: Төслийн Зорилго",
        "p3_overview": "Үе шат 3: Төслийн Зорилго",
        "p4_overview": "Үе шат 4: Төслийн Зорилго",
        "p5_overview": "Үе шат 5: Төслийн Зорилго",
        "p5_monitoring": "Google ML: Продакшн Хяналт (Monitoring)",
        "p6_overview": "Үе шат 6: Төслийн Зорилго",
        "w2_exam": "NumPy Төгсгөлийн Шалгалт",
        "w3_exam": "Pandas Төгсгөлийн Шалгалт",
        "w4_exam": "Matplotlib Төгсгөлийн Шалгалт",
        "w6_exam": "Scikit-Learn Төгсгөлийн Шалгалт"
    };

    function t(key) {
        const lang = getLang();
        if (dict[lang] && dict[lang][key]) {
            return dict[lang][key];
        }
        return dict['en'][key] || key;
    }

    function getPhaseTitle(phaseId, fallbackEn) {
        if (getLang() === 'mn' && phaseTitlesMn[phaseId]) {
            return phaseTitlesMn[phaseId];
        }
        return fallbackEn;
    }

    function getLessonTitle(lessonId, fallbackEn) {
        if (getLang() === 'mn' && lessonTitlesMn[lessonId]) {
            return lessonTitlesMn[lessonId];
        }
        return fallbackEn;
    }

    return {
        getLang: getLang,
        setLang: setLang,
        t: t,
        getPhaseTitle: getPhaseTitle,
        getLessonTitle: getLessonTitle
    };
})();
