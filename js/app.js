let pyodideReadyPromise;
let pyodideInstance;
let pyodideLoaded = false;
let pyodideStatus = "Loading Python environment (this may take a minute on first load)...";
let editors = {};

// Load UI immediately
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
        console.log("Pyodide and packages loaded.");
    } catch (err) {
        console.error("Failed to load Pyodide:", err);
        pyodideStatus = "Error loading Python. Please check console.";
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
        <h1>Data Engineering Mastery (10-Week Roadmap)</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status">Initializing...</div>
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
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="pacer-section">
            <h3><span class="badge">C</span> Conceptual: Why Solidify Python First?</h3>
            <p>Data engineering pipelines require robust, reusable code. Before diving into pandas or ML, you need to confidently write functions, handle exceptions (try/except), use pathlib for file paths, and understand Git for version control.</p>
        </div>

        <div class="pacer-section">
            <h3><span class="badge">P</span> Procedural: Building Data Utilities</h3>
            <p>Your goal is to build reusable functions. For example, a function to validate a numeric range using assertions.</p>
            <p><strong>Practice:</strong> Complete the function below. Then run the cell.</p>
        </div>

        <div class="notebook-cell" id="cell-week1">
            <div class="cell-header"><span>[ ] In: Python 3</span></div>
            <div class="editor-container" id="editor-week1"></div>
            <div class="controls">
                <button onclick="runCode('week1')">▶ Run Cell</button>
                <button class="secondary" onclick="reviewCode('week1')">🔍 Code Rabbit Review</button>
            </div>
            <div class="output-container" id="output-week1"></div>
            <div class="review-panel" id="review-week1"></div>
        </div>
    `,
    'week2': `
        <h1>Phase 2: NumPy for numerical data</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="pacer-section">
            <h3><span class="badge">C</span> Conceptual: The Foundation of Data Science</h3>
            <p>NumPy provides the high-performance multidimensional array object (ndarray). You need to understand shapes, indexing, masks, and broadcasting.</p>
        </div>
        
        <div class="pacer-section">
            <h3><span class="badge">P</span> Procedural: Creating and Filtering</h3>
            <p>Use boolean masks to filter numerical data efficiently.</p>
        </div>

        <div class="notebook-cell" id="cell-week2">
            <div class="cell-header"><span>[ ] In: Python 3</span></div>
            <div class="editor-container" id="editor-week2"></div>
            <div class="controls">
                <button onclick="runCode('week2')">▶ Run Cell</button>
                <button class="secondary" onclick="reviewCode('week2')">🔍 Code Rabbit Review</button>
            </div>
            <div class="output-container" id="output-week2"></div>
            <div class="review-panel" id="review-week2"></div>
        </div>
    `,
    'week3': `
        <h1>Phase 3: Pandas and EDA</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="pacer-section">
            <h3><span class="badge">C</span> Conceptual: Tabular Data Mastery</h3>
            <p>Pandas is built on top of NumPy and provides DataFrames. It is essential for data cleaning, EDA (Exploratory Data Analysis), and feature engineering.</p>
        </div>
        <div class="pacer-section">
            <h3><span class="badge">P</span> Procedural: Summary Statistics</h3>
            <p>Use <code>df.info()</code>, <code>df.describe()</code>, and <code>df.isna().sum()</code> to audit your datasets immediately after loading.</p>
        </div>
        <div class="notebook-cell" id="cell-week3">
            <div class="cell-header"><span>[ ] In: Python 3</span></div>
            <div class="editor-container" id="editor-week3"></div>
            <div class="controls">
                <button onclick="runCode('week3')">▶ Run Cell</button>
                <button class="secondary" onclick="reviewCode('week3')">🔍 Code Rabbit Review</button>
            </div>
            <div class="output-container" id="output-week3"></div>
            <div class="review-panel" id="review-week3"></div>
        </div>
    `,
    'week4': `
        <h1>Phase 4: Visualization and Statistics</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="pacer-section">
            <h3><span class="badge">E</span> Evidence: Visualizing Outliers</h3>
            <p>Before throwing data into a model, you must *look* at it. A boxplot or histogram instantly reveals skewness and outliers that a simple mean might hide.</p>
        </div>
        <div class="notebook-cell" id="cell-week4">
            <div class="cell-header"><span>[ ] In: Python 3</span></div>
            <div class="editor-container" id="editor-week4"></div>
            <div class="controls">
                <button onclick="runCode('week4')">▶ Run Cell</button>
                <button class="secondary" onclick="reviewCode('week4')">🔍 Code Rabbit Review</button>
            </div>
            <div class="output-container" id="output-week4"></div>
            <div class="review-panel" id="review-week4"></div>
        </div>
    `,
    'week5': `
        <h1>Phase 5: Build a Proper Data Pipeline</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="pacer-section">
            <h3><span class="badge">A</span> Analogous: Factory Assembly Line</h3>
            <p>Think of a pipeline like a factory. Raw data comes in, it gets checked (validation), cleaned (imputation), and shaped (encoding) before it reaches the model. If the factory logic is scattered, data leakage occurs.</p>
        </div>
        <div class="notebook-cell" id="cell-week5">
            <div class="cell-header"><span>[ ] In: Python 3</span></div>
            <div class="editor-container" id="editor-week5"></div>
            <div class="controls">
                <button onclick="runCode('week5')">▶ Run Cell</button>
                <button class="secondary" onclick="reviewCode('week5')">🔍 Code Rabbit Review</button>
            </div>
            <div class="output-container" id="output-week5"></div>
            <div class="review-panel" id="review-week5"></div>
        </div>
    `,
    'week6': `
        <h1>Phase 6: Scikit-learn Pipelines</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="pacer-section">
            <h3><span class="badge">P</span> Procedural: ColumnTransformers</h3>
            <p>Scikit-learn's Pipeline and ColumnTransformer ensure that training and testing data are processed identically, preventing the most common ML bug: data leakage.</p>
        </div>
        <div class="notebook-cell" id="cell-week6">
            <div class="cell-header"><span>[ ] In: Python 3</span></div>
            <div class="editor-container" id="editor-week6"></div>
            <div class="controls">
                <button onclick="runCode('week6')">▶ Run Cell</button>
                <button class="secondary" onclick="reviewCode('week6')">🔍 Code Rabbit Review</button>
            </div>
            <div class="output-container" id="output-week6"></div>
            <div class="review-panel" id="review-week6"></div>
        </div>
    `,
    'resources': `
        <h1>Resources & Final Practice</h1>
        <div class="pacer-section">
            <h3><span class="badge">R</span> Reference</h3>
            <ul>
                <li><a href="https://jakevdp.github.io/PythonDataScienceHandbook/" target="_blank">Python Data Science Handbook</a></li>
                <li><a href="https://pandas.pydata.org/docs/getting_started/intro_tutorials/" target="_blank">Pandas Getting Started Tutorials</a></li>
                <li><a href="https://scikit-learn.org/stable/user_guide.html" target="_blank">scikit-learn User Guide</a></li>
                <li>Practical Statistics for Data Scientists, 2nd edition</li>
            </ul>
        </div>
        <div class="notebook-cell" id="cell-resources">
            <div class="cell-header"><span>[ ] In: Python 3 - Final Sandbox</span></div>
            <div class="editor-container" id="editor-resources"></div>
            <div class="controls">
                <button onclick="runCode('resources')">▶ Run Cell</button>
            </div>
            <div class="output-container" id="output-resources"></div>
        </div>
    `
};

const initialCode = {
    'week1': `def validate_numeric_range(val, min_val, max_val):
    """
    Validates if a value is within the given range.
    Raises ValueError if not.
    """
    # TODO: Write logic to check if val is outside [min_val, max_val]
    # If it is, raise a ValueError
    pass

# Test code
try:
    validate_numeric_range(50, 13, 100)
    print("Passed valid age check!")
    validate_numeric_range(12, 13, 100)
except ValueError:
    print("Correctly caught invalid age!")`,

    'week2': `import numpy as np

# 10 rows, 3 columns of random integers
rng = np.random.default_rng(42)
X = rng.integers(0, 100, size=(10, 3))

print("Original Data:\\n", X)

# TODO: Create a mask to select rows where column 0 is > 50
# mask = ...
# filtered_X = X[mask]

# print("\\nFiltered Data:\\n", filtered_X)`,

    'week3': `import pandas as pd
import numpy as np

# Create synthetic dataset
data = {
    'customer_id': [1, 2, 3, 4, 5],
    'age': [25, 45, np.nan, 34, 112], # Note the outlier and missing value
    'monthly_spend': [50.5, 120.0, 80.0, np.nan, 200.0]
}
df = pd.DataFrame(data)

# TODO: Use a pandas method to fill missing 'monthly_spend' with the median
# df['monthly_spend'] = ...

# TODO: Print the summary statistics of the dataframe
# ...
print(df)`,

    'week4': `# (Note: In this browser sandbox, plotting directly to the screen requires special setup.
# Let's practice calculating the statistics needed for a boxplot instead.)
import numpy as np

data = np.array([12, 15, 14, 16, 18, 12, 110, 15, 14]) # 110 is an outlier

# TODO: Calculate the 25th percentile (Q1) and 75th percentile (Q3)
# q1 = ...
# q3 = ...
# iqr = q3 - q1

# print(f"IQR is: {iqr}")`,

    'week5': `import pandas as pd

def check_data_leakage(train_df, test_df):
    """
    Ensures no customer_id exists in both training and test sets.
    """
    # TODO: Find if any IDs intersect
    # train_ids = set(...)
    # test_ids = set(...)
    # overlap = ...
    # print(f"Number of overlapping IDs: {len(overlap)}")
    pass

# Mock data
train = pd.DataFrame({'customer_id': [1, 2, 3, 4]})
test = pd.DataFrame({'customer_id': [4, 5, 6]})

check_data_leakage(train, test)`,

    'week6': `from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
import numpy as np

# Sample data with missing values
X_train = np.array([[1.0, 2.0], [np.nan, 3.0], [4.0, np.nan]])

# TODO: Create a pipeline with a SimpleImputer (mean) and StandardScaler
# pipeline = Pipeline([
#     ...
# ])

# transformed = pipeline.fit_transform(X_train)
# print(transformed)`,

    'resources': `# Sandbox for any code testing!
import numpy as np
import pandas as pd

print("Ready to code!")`
};

function loadLesson(lessonId) {
    document.querySelectorAll('.sidebar a').forEach(el => el.classList.remove('active'));
    
    // Find the link that was clicked and make it active
    const links = document.querySelectorAll('.sidebar a');
    links.forEach(link => {
        if(link.getAttribute('onclick').includes(lessonId)) {
            link.classList.add('active');
        }
    });

    const container = document.getElementById('content-container');
    container.innerHTML = lessons[lessonId] || "<h1>Coming Soon</h1><p>Under construction.</p>";
    
    updatePyodideStatus();

    if (initialCode[lessonId]) {
        // Wait for DOM to update
        setTimeout(() => {
            const editorEl = document.getElementById(\`editor-\${lessonId}\`);
            if(editorEl) {
                // Clear any existing editor in this element (if any)
                editorEl.innerHTML = '';
                editors[lessonId] = CodeMirror(editorEl, {
                    value: initialCode[lessonId],
                    mode: "python",
                    theme: "monokai",
                    lineNumbers: true,
                    indentUnit: 4,
                    matchBrackets: true
                });
            }
        }, 50);
    }
}

async function runCode(lessonId) {
    if (!pyodideLoaded) {
        alert("Python environment is still loading. Please wait a moment and try again.");
        return;
    }
    
    const code = editors[lessonId].getValue();
    const outputContainer = document.getElementById(\`output-\${lessonId}\`);
    const header = document.querySelector(\`#cell-\${lessonId} .cell-header span\`);
    
    header.innerText = "[*] Running...";
    outputContainer.innerText = "Executing...";
    
    try {
        await pyodideInstance.runPythonAsync(\`
            import sys
            import io
            sys.stdout = io.StringIO()
            sys.stderr = io.StringIO()
        \`);
        
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

function reviewCode(lessonId) {
    const code = editors[lessonId].getValue();
    const reviewPanel = document.getElementById(\`review-\${lessonId}\`);
    reviewPanel.style.display = "block";
    
    let feedback = "<h4>🐇 Code Rabbit Review</h4><ul>";
    
    if (lessonId === 'week1') {
        if (!code.includes("raise ValueError")) {
            feedback += "<li>🔴 <strong>Bug:</strong> You forgot to <code>raise ValueError</code> inside the function.</li>";
        } else {
            feedback += "<li>🟢 <strong>Great job!</strong> ValueError raised correctly.</li>";
        }
    } else if (lessonId === 'week2') {
        if (!code.includes("X[:, 0]")) {
             feedback += "<li>🔴 <strong>Logic Error:</strong> Remember to slice the first column using <code>X[:, 0]</code>.</li>";
        } else {
             feedback += "<li>🟢 <strong>Excellent!</strong> Correct indexing.</li>";
        }
    } else if (lessonId === 'week3') {
        if (!code.includes("fillna") && !code.includes("median()")) {
             feedback += "<li>🟡 <strong>Tip:</strong> Use <code>df['monthly_spend'].fillna(df['monthly_spend'].median())</code></li>";
        } else {
             feedback += "<li>🟢 <strong>Nice!</strong> Handled missing values well.</li>";
        }
    } else if (lessonId === 'week4') {
        if (!code.includes("np.percentile")) {
            feedback += "<li>🟡 <strong>Tip:</strong> <code>np.percentile(data, 25)</code> is a great way to find quartiles.</li>";
        }
    } else if (lessonId === 'week5') {
        if (!code.includes("set(")) {
            feedback += "<li>🟡 <strong>Tip:</strong> Converting lists to sets and using the <code>&</code> operator or <code>.intersection()</code> is the fastest way to find overlapping IDs.</li>";
        }
    } else if (lessonId === 'week6') {
        if (!code.includes("Pipeline")) {
            feedback += "<li>🔴 <strong>Missing:</strong> Construct the pipeline using <code>Pipeline([('imputer', SimpleImputer()), ('scaler', StandardScaler())])</code></li>";
        } else {
            feedback += "<li>🟢 <strong>Pipeline built correctly!</strong></li>";
        }
    }
    
    feedback += "<li>💡 <em>General Advice:</em> Keep pushing forward! Code review helps build robust data engineering habits.</li></ul>";
    reviewPanel.innerHTML = feedback;
}
