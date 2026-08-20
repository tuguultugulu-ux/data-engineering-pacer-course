let pyodideReadyPromise;
let pyodideInstance;
let editors = {};

async function main() {
    // Initialize Pyodide
    try {
        pyodideReadyPromise = loadPyodide();
        pyodideInstance = await pyodideReadyPromise;
        // Load common data science packages
        await pyodideInstance.loadPackage(['numpy', 'pandas', 'scikit-learn', 'matplotlib']);
        console.log("Pyodide and packages loaded.");
        
        // Initial load of the intro lesson
        loadLesson('intro');
    } catch (err) {
        console.error("Failed to load Pyodide:", err);
        document.getElementById('content-container').innerHTML = "<h1>Error</h1><p>Failed to load the Python environment. Please ensure you have an active internet connection.</p>";
    }
}

// Start initialization
main();

const lessons = {
    'intro': `
        <h1>Data Engineering Mastery (10-Week Roadmap)</h1>
        <p>This platform uses the <strong>PACER</strong> system to help you master Data Engineering and Machine Learning:</p>
        <ul>
            <li><span class="badge">P</span> <strong>Procedural:</strong> Step-by-step guides and "how-to".</li>
            <li><span class="badge">A</span> <strong>Analogous:</strong> Seeing similar functions or concepts.</li>
            <li><span class="badge">C</span> <strong>Conceptual:</strong> Deep understanding of the "why".</li>
            <li><span class="badge">E</span> <strong>Evidence:</strong> Visuals, datasets, and proofs.</li>
            <li><span class="badge">R</span> <strong>Reference:</strong> Links to official docs and books.</li>
        </ul>
        <p>Select a module from the sidebar to begin. Every module contains an interactive Jupyter-like cell where you can immediately practice what you learn.</p>
        
        <div class="resource-list">
            <h3>Core Books & References</h3>
            <ul>
                <li><a href="https://jakevdp.github.io/PythonDataScienceHandbook/" target="_blank">Python Data Science Handbook</a> (NumPy, Pandas, Matplotlib, Scikit-Learn)</li>
                <li><a href="https://pandas.pydata.org/docs/getting_started/intro_tutorials/" target="_blank">Pandas Getting Started Tutorials</a></li>
                <li>Practical Statistics for Data Scientists, 2nd edition — Bruce, Bruce, Gedeck</li>
                <li><a href="https://developers.google.com/machine-learning/crash-course/linear-regression#linear_regression_equation" target="_blank">Google Machine Learning Crash Course</a></li>
                <li><a href="https://scikit-learn.org/stable/user_guide.html" target="_blank">scikit-learn User Guide</a></li>
                <li><a href="https://git-scm.com/book/en/v2" target="_blank">Pro Git</a></li>
            </ul>
        </div>
    `,
    'week1': `
        <h1>Phase 1: Strengthen Python and Git</h1>
        
        <div class="pacer-section">
            <h3><span class="badge">C</span> Conceptual: Why Solidify Python First?</h3>
            <p>Data engineering pipelines require robust, reusable code. Before diving into pandas or ML, you need to confidently write functions, handle exceptions (try/except), use pathlib for file paths, and understand Git for version control.</p>
        </div>

        <div class="pacer-section">
            <h3><span class="badge">P</span> Procedural: Building Data Utilities</h3>
            <p>Your goal is to build reusable functions. For example, a function to clean age data:</p>
            <pre><code>def clean_age(value):
    if pd.isna(value) or value < 13 or value > 100:
        return np.nan
    return value</code></pre>
            <p><strong>Practice:</strong> Complete the function below to validate a numeric range using assertions. Then run the cell.</p>
        </div>

        <div class="notebook-cell" id="cell-week1">
            <div class="cell-header">
                <span>[ ] In: Python 3</span>
            </div>
            <div class="editor-container" id="editor-week1"></div>
            <div class="controls">
                <button onclick="runCode('week1')">▶ Run Cell</button>
                <button class="secondary" onclick="reviewCode('week1')">🔍 Code Rabbit Review</button>
            </div>
            <div class="output-container" id="output-week1"></div>
            <div class="review-panel" id="review-week1"></div>
        </div>

        <div class="pacer-section">
            <h3><span class="badge">R</span> Reference</h3>
            <ul>
                <li><a href="https://git-scm.com/book/en/v2" target="_blank">Pro Git Chapters on Basics and Branching</a></li>
            </ul>
        </div>
    `,
    'week2': `
        <h1>Phase 2: NumPy for numerical data</h1>
        <div class="pacer-section">
            <h3><span class="badge">C</span> Conceptual: The Foundation of Data Science</h3>
            <p>NumPy provides the high-performance multidimensional array object (ndarray). You need to understand shapes, indexing, masks, and broadcasting.</p>
        </div>
        
        <div class="pacer-section">
            <h3><span class="badge">P</span> Procedural: Creating and Filtering</h3>
            <p>Use random generators and boolean masks.</p>
        </div>

        <div class="notebook-cell" id="cell-week2">
            <div class="cell-header">
                <span>[ ] In: Python 3</span>
            </div>
            <div class="editor-container" id="editor-week2"></div>
            <div class="controls">
                <button onclick="runCode('week2')">▶ Run Cell</button>
                <button class="secondary" onclick="reviewCode('week2')">🔍 Code Rabbit Review</button>
            </div>
            <div class="output-container" id="output-week2"></div>
            <div class="review-panel" id="review-week2"></div>
        </div>
    `
    // Add more weeks as needed
};

const initialCode = {
    'week1': `import numpy as np
import pandas as pd

def validate_numeric_range(val, min_val, max_val):
    """
    Validates if a value is within the given range.
    Raises ValueError if not.
    """
    # TODO: write your validation logic here
    pass

# Test your code
try:
    validate_numeric_range(50, 13, 100)
    print("Valid age passed!")
    validate_numeric_range(12, 13, 100)
except ValueError as e:
    print(f"Caught error correctly: {e}")
`,
    'week2': `import numpy as np

# Create a synthetic dataset with NumPy
# 10 rows, 3 columns
rng = np.random.default_rng(42)
X = rng.integers(0, 100, size=(10, 3))

print("Original Shape:", X.shape)
print("Data:\\n", X)

# TODO: Create a mask to select only rows where the first column is > 50
# mask = ...
# filtered_X = ...

# print("Filtered Data:\\n", filtered_X)
`
};

function loadLesson(lessonId) {
    // Update active nav
    document.querySelectorAll('.sidebar a').forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');

    const container = document.getElementById('content-container');
    container.innerHTML = lessons[lessonId] || "<h1>Coming Soon</h1><p>This module is under construction.</p>";

    // Initialize editor if there's a notebook cell
    if (initialCode[lessonId]) {
        setTimeout(() => {
            const editorEl = document.getElementById(\`editor-\${lessonId}\`);
            editors[lessonId] = CodeMirror(editorEl, {
                value: initialCode[lessonId],
                mode: "python",
                theme: "monokai",
                lineNumbers: true,
                indentUnit: 4,
                matchBrackets: true
            });
        }, 100);
    }
}

async function runCode(lessonId) {
    const code = editors[lessonId].getValue();
    const outputContainer = document.getElementById(\`output-\${lessonId}\`);
    const header = document.querySelector(\`#cell-\${lessonId} .cell-header span\`);
    
    header.innerText = "[*] Running...";
    outputContainer.innerText = "Executing...";
    
    try {
        // Redirect stdout to capture print statements
        await pyodideInstance.runPythonAsync(\`
            import sys
            import io
            sys.stdout = io.StringIO()
        \`);
        
        await pyodideInstance.runPythonAsync(code);
        
        const stdout = await pyodideInstance.runPythonAsync("sys.stdout.getvalue()");
        outputContainer.innerText = stdout || "Executed successfully (no output).";
        outputContainer.style.color = "var(--text-color)";
    } catch (err) {
        outputContainer.innerText = err;
        outputContainer.style.color = "red";
    } finally {
        header.innerText = "[✓] Finished";
    }
}

function reviewCode(lessonId) {
    const code = editors[lessonId].getValue();
    const reviewPanel = document.getElementById(\`review-\${lessonId}\`);
    reviewPanel.style.display = "block";
    
    // Simulate an AI Code Review (Code Rabbit style)
    let feedback = "<h4>🐇 Code Rabbit Review</h4><ul>";
    
    if (lessonId === 'week1') {
        if (!code.includes("raise ValueError")) {
            feedback += "<li>🔴 <strong>Bug:</strong> You forgot to <code>raise ValueError</code> inside the function if the check fails.</li>";
        } else {
            feedback += "<li>🟢 <strong>Great job!</strong> You correctly raised the ValueError.</li>";
        }
        if (!code.includes("if val < min_val or val > max_val:")) {
            feedback += "<li>🟡 <strong>Tip:</strong> Make sure your condition accurately checks boundaries (inclusive vs exclusive).</li>";
        }
    } else if (lessonId === 'week2') {
        if (!code.includes("X[:, 0] > 50")) {
             feedback += "<li>🔴 <strong>Logic Error:</strong> To check the first column, you need to slice it using <code>X[:, 0]</code>.</li>";
        } else {
             feedback += "<li>🟢 <strong>Excellent!</strong> Correct use of boolean masking.</li>";
        }
    }
    
    feedback += "<li>💡 <em>General Advice:</em> Always ensure docstrings match implementation details.</li></ul>";
    reviewPanel.innerHTML = feedback;
}
