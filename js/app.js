let pyodideReadyPromise;
let pyodideInstance;
let pyodideLoaded = false;
let pyodideStatus = "Loading Python environment (this may take a minute on first load)...";
let editors = {};

document.addEventListener("DOMContentLoaded", () => {
    loadLesson('intro');
    initPyodide();
});

async function initPyodide() {
    try {
        pyodideReadyPromise = loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/"
        });
        pyodideInstance = await pyodideReadyPromise;
        pyodideStatus = "Loading Data Science packages (NumPy, Pandas, etc.)...";
        updatePyodideStatus();
        await pyodideInstance.loadPackage(['numpy', 'pandas', 'scikit-learn']);
        pyodideLoaded = true;
        pyodideStatus = "Python Environment Ready ✓";
        updatePyodideStatus();
    } catch (err) {
        pyodideStatus = "Error loading Python.";
        updatePyodideStatus();
    }
}

function updatePyodideStatus() {
    const statusEl = document.getElementById('pyodide-status');
    if(statusEl) {
        statusEl.innerText = pyodideStatus;
        if(pyodideLoaded) {
            statusEl.style.color = "var(--success-color)";
        } else if (pyodideStatus.includes("Error")) {
            statusEl.style.color = "red";
        } else {
            statusEl.style.color = "var(--warning-color)";
        }
    }
}

const lessons = {
    'intro': `
        <h1>Data Engineering Mastery</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status">Initializing...</div>
        <p>Welcome! Each phase below contains the <strong>literal textbook chapters</strong> embedded directly into the page, followed by interactive sandboxes.</p>
    `,
    'week1': `
        <h1>Phase 1: Strengthen Python and Git</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Pro Git: Chapter 2 - Git Basics <a href="https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository"></iframe>
        </div>
    `,
    'week2': `
        <h1>Phase 2: NumPy for Numerical Data</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        
        <div class="book-container">
            <div class="book-title">Python Data Science Handbook: Understanding Data Types <a href="https://jakevdp.github.io/PythonDataScienceHandbook/02.01-understanding-data-types.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/02.01-understanding-data-types.html"></iframe>
        </div>

        <div class="notebook-cell" id="cell-w2-1">
            <div class="cell-header"><span>[ ] Practice: Array Attributes (Based on the reading above)</span></div>
            <div class="editor-container" id="editor-w2-1"></div>
            <div class="controls"><button onclick="runCode('w2-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2-1"></div>
        </div>

        <div class="book-container">
            <div class="book-title">Python Data Science Handbook: Boolean Arrays and Masks <a href="https://jakevdp.github.io/PythonDataScienceHandbook/02.06-boolean-arrays-and-masks.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/02.06-boolean-arrays-and-masks.html"></iframe>
        </div>

        <div class="notebook-cell" id="cell-w2-2">
            <div class="cell-header"><span>[ ] Practice: Boolean Masking (Based on the reading above)</span></div>
            <div class="editor-container" id="editor-w2-2"></div>
            <div class="controls"><button onclick="runCode('w2-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2-2"></div>
        </div>
    `,
    'week3': `
        <h1>Phase 3: Pandas and EDA</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        
        <div class="book-container">
            <div class="book-title">Pandas Official Docs: What kind of data does pandas handle? <a href="https://pandas.pydata.org/docs/getting_started/intro_tutorials/01_table_oriented.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://pandas.pydata.org/docs/getting_started/intro_tutorials/01_table_oriented.html"></iframe>
        </div>

        <div class="notebook-cell" id="cell-w3-1">
            <div class="cell-header"><span>[ ] Practice: Pandas DataFrames</span></div>
            <div class="editor-container" id="editor-w3-1"></div>
            <div class="controls"><button onclick="runCode('w3-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3-1"></div>
        </div>
        
        <div class="book-container">
            <div class="book-title">Python Data Science Handbook: Handling Missing Data <a href="https://jakevdp.github.io/PythonDataScienceHandbook/03.04-missing-values.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/03.04-missing-values.html"></iframe>
        </div>

        <div class="notebook-cell" id="cell-w3-2">
            <div class="cell-header"><span>[ ] Practice: Handling Missing Data</span></div>
            <div class="editor-container" id="editor-w3-2"></div>
            <div class="controls"><button onclick="runCode('w3-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3-2"></div>
        </div>
    `,
    'week4': `
        <h1>Phase 4: Visualization and Statistics</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Pandas Official Docs: How to calculate summary statistics <a href="https://pandas.pydata.org/docs/getting_started/intro_tutorials/06_calculate_statistics.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://pandas.pydata.org/docs/getting_started/intro_tutorials/06_calculate_statistics.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w4-1">
            <div class="cell-header"><span>[ ] Practice: Summary Statistics</span></div>
            <div class="editor-container" id="editor-w4-1"></div>
            <div class="controls"><button onclick="runCode('w4-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4-1"></div>
        </div>
    `,
    'week5': `
        <h1>Phase 5: Build a Proper Data Pipeline</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Google ML Crash Course: Data Leakage <a href="https://developers.google.com/machine-learning/crash-course/data-preparation/data-leakage" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://developers.google.com/machine-learning/crash-course/data-preparation/data-leakage"></iframe>
        </div>
    `,
    'week6': `
        <h1>Phase 6: Scikit-learn Pipelines</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Scikit-Learn Docs: Pipelines <a href="https://scikit-learn.org/stable/modules/compose.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://scikit-learn.org/stable/modules/compose.html"></iframe>
        </div>
    `
};

const initialCode = {
    'w2-1': `import numpy as np

# Based on the reading above, create an array and inspect its attributes.
arr = np.array([10, 20, 30, 40])
print("Original dtype:", arr.dtype)

# TODO: assign a floating point number to arr[0] and see how numpy handles it
# arr[0] = ...
# print("Modified array:", arr)
# print("New dtype:", arr.dtype)`,
    
    'w2-2': `import numpy as np

# Based on the masking reading above, filter the invalid readings
temps = np.array([72, 75, 102, 68, -5, 74, 99, 71, 200])

# TODO: Create a mask for invalid temperatures (< 0 or > 100) using the bitwise | operator
# invalid_mask = ...

# TODO: Create a clean array using the bitwise NOT ~ operator
# clean_temps = temps[~invalid_mask]
# print("Clean readings:", clean_temps)`,

    'w3-1': `import pandas as pd

# Based on the DataFrame introduction, inspect the data
data = {'Name': ['Alice', 'Bob', 'Charlie'], 'Age': [25, 30, 35]}
df = pd.DataFrame(data)

# TODO: Print df.head() and df.info()
print(df.head())`,

    'w3-2': `import pandas as pd
import numpy as np

# Based on the handling missing values reading
data = {
    'customer_id': [101, 102, 103, 104],
    'monthly_spend': [50.5, np.nan, 80.0, np.nan]
}
df = pd.DataFrame(data)

# TODO: Use fillna() to impute the missing monthly_spend values with the median
# median_spend = df['monthly_spend'].median()
# df['monthly_spend'] = df['monthly_spend'].fillna(median_spend)
# print(df)`,

    'w4-1': `import pandas as pd

salaries = [60000, 65000, 70000, 58000, 62000, 75000, 80000, 2500000]
df = pd.DataFrame({'salary': salaries})

# TODO: Run df.describe() and observe the mean vs the median (50%)
# stats = df.describe()
# print(stats)`
};

function loadLesson(lessonId) {
    document.querySelectorAll('.sidebar a').forEach(el => el.classList.remove('active'));
    const links = document.querySelectorAll('.sidebar a');
    links.forEach(link => {
        if(link.getAttribute('onclick').includes(lessonId)) {
            link.classList.add('active');
        }
    });

    const container = document.getElementById('content-container');
    container.innerHTML = lessons[lessonId] || "<h1>Coming Soon</h1><p>Under construction.</p>";
    
    updatePyodideStatus();

    setTimeout(() => {
        const editorElements = document.querySelectorAll('.editor-container');
        editorElements.forEach(editorEl => {
            const cellId = editorEl.id.replace('editor-', '');
            if(initialCode[cellId]) {
                editorEl.innerHTML = '';
                editors[cellId] = CodeMirror(editorEl, {
                    value: initialCode[cellId],
                    mode: "python",
                    theme: "monokai",
                    lineNumbers: true,
                    indentUnit: 4,
                    matchBrackets: true
                });
            }
        });
    }, 50);
}

async function runCode(cellId) {
    if (!pyodideLoaded) {
        alert("Python environment is still loading. Please wait a moment and try again.");
        return;
    }
    const code = editors[cellId].getValue();
    const outputContainer = document.getElementById(`output-${cellId}`);
    const header = document.querySelector(`#cell-${cellId} .cell-header span`);
    header.innerText = "[*] Running...";
    outputContainer.innerText = "Executing...";
    try {
        await pyodideInstance.runPythonAsync(`
import sys, io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
`);
        await pyodideInstance.runPythonAsync(code);
        const stdout = await pyodideInstance.runPythonAsync("sys.stdout.getvalue()");
        const stderr = await pyodideInstance.runPythonAsync("sys.stderr.getvalue()");
        let outText = stdout;
        if(stderr) outText += "\\n[STDERR]:\\n" + stderr;
        outputContainer.innerText = outText || "Executed successfully (no output).";
        outputContainer.style.color = stderr ? "var(--warning-color)" : "var(--text-color)";
    } catch (err) {
        outputContainer.innerText = err;
        outputContainer.style.color = "red";
    } finally {
        header.innerText = "[✓] Finished";
    }
}
