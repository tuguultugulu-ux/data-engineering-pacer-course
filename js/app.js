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
        <p>Select a module from the sidebar to begin. Every module contains deep textbook excerpts followed by interactive Jupyter-like cells to immediately practice what you learn.</p>
    `,
    'week1': `
        <h1>Phase 1: Strengthen Python and Git</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        
        <div class="pacer-section">
            <h3><span class="badge">R</span> Reference: Python Control Flow & Functions</h3>
            <p><em>Adapted from the Python Data Science Handbook:</em> "While Python's flexibility is one of its greatest strengths, it requires discipline in data engineering. Writing reusable functions with clear type expectations and error handling (using <code>try/except</code>) is non-negotiable for production pipelines."</p>
            <p><strong>Topic: Validating Data and Handling Errors</strong><br>
            When building data pipelines, you cannot assume data is clean. You must aggressively validate inputs using <code>assert</code> statements or by raising exceptions like <code>ValueError</code>.</p>
        </div>

        <div class="notebook-cell" id="cell-w1-1">
            <div class="cell-header"><span>[ ] In: Python 3</span></div>
            <div class="editor-container" id="editor-w1-1"></div>
            <div class="controls"><button onclick="runCode('w1-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w1-1"></div>
        </div>

        <div class="pacer-section">
            <h3><span class="badge">R</span> Reference: Git Basics</h3>
            <p><em>Adapted from Pro Git (Chapter 2):</em> "Git thinks of its data more like a stream of snapshots. Every time you commit, or save the state of your project, Git basically takes a picture of what all your files look like at that moment and stores a reference to that snapshot."</p>
            <p><strong>Topic: Version Control</strong><br>
            Always track your data engineering scripts using Git. Commands like <code>git status</code>, <code>git add</code>, and <code>git commit</code> form the daily loop of your work.</p>
        </div>
    `,
    'week2': `
        <h1>Phase 2: NumPy for Numerical Data</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        
        <div class="pacer-section">
            <h3><span class="badge">R</span> Reference: The NumPy ndarray</h3>
            <p><em>Adapted from the Python Data Science Handbook (Jake VanderPlas):</em> "At the core of nearly all data science tools in Python is the NumPy array. Python's default list type provides great flexibility, but it falls short when dealing with large amounts of numerical data. NumPy arrays contain values of a single type, allowing for efficient memory storage and vectorized operations."</p>
            <p><strong>Topic: Array Attributes</strong><br>
            Every array has attributes like <code>ndim</code> (the number of dimensions), <code>shape</code> (the size of each dimension), and <code>dtype</code> (the data type of the array).</p>
        </div>

        <div class="notebook-cell" id="cell-w2-1">
            <div class="cell-header"><span>[ ] In: Python 3</span></div>
            <div class="editor-container" id="editor-w2-1"></div>
            <div class="controls"><button onclick="runCode('w2-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2-1"></div>
        </div>

        <div class="pacer-section">
            <h3><span class="badge">C</span> Conceptual: Boolean Masks</h3>
            <p><em>Adapted from the Python Data Science Handbook:</em> "Boolean masking is the process of using an array of boolean values (True/False) to extract, modify, or count values in another array. When applying a condition (like <code>x > 5</code>) to a NumPy array, it returns a mask. Passing this mask back into the array (<code>x[mask]</code>) selects only the valid elements."</p>
        </div>

        <div class="notebook-cell" id="cell-w2-2">
            <div class="cell-header"><span>[ ] In: Python 3</span></div>
            <div class="editor-container" id="editor-w2-2"></div>
            <div class="controls"><button onclick="runCode('w2-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2-2"></div>
        </div>
    `,
    'week3': `
        <h1>Phase 3: Pandas and EDA</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        
        <div class="pacer-section">
            <h3><span class="badge">R</span> Reference: The DataFrame Object</h3>
            <p><em>Adapted from the Pandas Getting Started Tutorials:</em> "A DataFrame is a 2-dimensional data structure that can store data of different types (including characters, integers, floating point values, categorical data and more) in columns. It is similar to a spreadsheet or a SQL table."</p>
            <p><strong>Topic: Inspecting Data</strong><br>
            The first thing you do after loading data via <code>pd.read_csv()</code> is run <code>df.info()</code> to see data types and missing values, and <code>df.describe()</code> for summary statistics.</p>
        </div>

        <div class="notebook-cell" id="cell-w3-1">
            <div class="cell-header"><span>[ ] In: Python 3</span></div>
            <div class="editor-container" id="editor-w3-1"></div>
            <div class="controls"><button onclick="runCode('w3-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3-1"></div>
        </div>
        
        <div class="pacer-section">
            <h3><span class="badge">P</span> Procedural: Handling Missing Data</h3>
            <p><em>Adapted from the Python Data Science Handbook:</em> "The difference between data found in many tutorials and data in the real world is that real-world data is rarely clean. Pandas represents missing data using the floating-point <code>NaN</code> value. We handle these using <code>dropna()</code> to remove them, or <code>fillna()</code> to impute them."</p>
        </div>

        <div class="notebook-cell" id="cell-w3-2">
            <div class="cell-header"><span>[ ] In: Python 3</span></div>
            <div class="editor-container" id="editor-w3-2"></div>
            <div class="controls"><button onclick="runCode('w3-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3-2"></div>
        </div>
    `,
    'week4': `
        <h1>Phase 4: Visualization and Statistics</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        
        <div class="pacer-section">
            <h3><span class="badge">R</span> Reference: Estimates of Location</h3>
            <p><em>Adapted from Practical Statistics for Data Scientists (Bruce & Bruce):</em> "The mean is strongly influenced by outliers (extreme values). To create a robust estimate of location, we use the median, which is the middle number on a sorted list of the data. The median is more resilient to data-entry errors or rare valid events."</p>
        </div>

        <div class="notebook-cell" id="cell-w4-1">
            <div class="cell-header"><span>[ ] In: Python 3</span></div>
            <div class="editor-container" id="editor-w4-1"></div>
            <div class="controls"><button onclick="runCode('w4-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4-1"></div>
        </div>
    `,
    'week5': `
        <h1>Phase 5: Build a Proper Data Pipeline</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        
        <div class="pacer-section">
            <h3><span class="badge">R</span> Reference: Data Leakage</h3>
            <p><em>Adapted from Google Machine Learning Crash Course:</em> "Data leakage occurs when information from outside the training dataset is used to create the model. This includes using target variables as features, or accidentally including test data in your training set. A pipeline must rigidly separate training data from validation/test data before any transformations are applied."</p>
        </div>

        <div class="notebook-cell" id="cell-w5-1">
            <div class="cell-header"><span>[ ] In: Python 3</span></div>
            <div class="editor-container" id="editor-w5-1"></div>
            <div class="controls"><button onclick="runCode('w5-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5-1"></div>
        </div>
    `,
    'week6': `
        <h1>Phase 6: Scikit-learn Pipelines</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        
        <div class="pacer-section">
            <h3><span class="badge">R</span> Reference: The Pipeline Object</h3>
            <p><em>Adapted from the Scikit-learn User Guide:</em> "The Pipeline can be used to chain multiple estimators into one. This is useful as there is often a fixed sequence of steps in processing the data, for example feature selection, normalization and classification. The Pipeline prevents data leakage by ensuring that data transformations are fit only on the training data during cross-validation."</p>
        </div>

        <div class="notebook-cell" id="cell-w6-1">
            <div class="cell-header"><span>[ ] In: Python 3</span></div>
            <div class="editor-container" id="editor-w6-1"></div>
            <div class="controls"><button onclick="runCode('w6-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w6-1"></div>
        </div>
    `
};

const initialCode = {
    'w1-1': `def clean_age(value):
    """
    Validates the age. If age is < 13 or > 100, raise a ValueError.
    """
    # TODO: Implement the validation logic based on the book's advice.
    pass

try:
    clean_age(12)
except ValueError as e:
    print("Caught invalid age!")`,
    
    'w2-1': `import numpy as np

# Practice: Array Attributes
# TODO: Create a 2-dimensional NumPy array of shape (3, 4) filled with ones.
# Hint: use np.ones()
my_array = None

print("Array:")
print(my_array)
if my_array is not None:
    print("Shape:", my_array.shape)
    print("Dimensions:", my_array.ndim)`,
    
    'w2-2': `import numpy as np
rng = np.random.default_rng(42)
ages = rng.integers(0, 110, size=20)
print("Original ages:", ages)

# Practice: Boolean Masking
# TODO: Create a mask for ages between 13 and 100 (inclusive)
# mask = ...
# valid_ages = ages[mask]
# print("Valid ages:", valid_ages)`,

    'w3-1': `import pandas as pd
import numpy as np

data = {'Name': ['Alice', 'Bob', 'Charlie', 'David'],
        'Age': [25, np.nan, 35, 40],
        'Salary': [50000, 60000, 70000, np.nan]}
df = pd.DataFrame(data)

# Practice: Inspecting Data
# TODO: Print the summary statistics of the DataFrame using .describe()
# ...

# TODO: Print the info to see missing values using .info()
# ...`,

    'w3-2': `import pandas as pd
import numpy as np

data = {'Age': [25, np.nan, 35, 40], 'Salary': [50000, 60000, 70000, np.nan]}
df = pd.DataFrame(data)

# Practice: Imputation
# TODO: Fill missing values in 'Salary' with the median salary.
# median_salary = ...
# df['Salary'] = df['Salary'].fillna(median_salary)

# print(df)`,

    'w4-1': `import numpy as np

salaries = np.array([45000, 50000, 55000, 48000, 60000, 1000000]) # Note the outlier

# Practice: Mean vs Median
# TODO: Calculate the mean and median of the salaries.
# mean_sal = ...
# median_sal = ...

# print(f"Mean: {mean_sal}")
# print(f"Median: {median_sal}")
# Observe how the outlier pulls the mean up dramatically!`,

    'w5-1': `import pandas as pd

train = pd.DataFrame({'customer_id': [1, 2, 3, 4], 'feature': [10, 20, 30, 40]})
test = pd.DataFrame({'customer_id': [4, 5, 6], 'feature': [40, 50, 60]})

# Practice: Leakage Audit
# TODO: Find if any customer_id exists in both train and test.
# train_ids = set(train['customer_id'])
# test_ids = set(test['customer_id'])
# overlap = train_ids.intersection(test_ids)
# print(f"Overlapping IDs: {overlap}")`,

    'w6-1': `from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
import numpy as np

X_train = np.array([[1.0, 2.0], [np.nan, 3.0], [4.0, np.nan]])

# Practice: The Pipeline Object
# TODO: Create a pipeline with SimpleImputer(strategy='median') and StandardScaler()
# pipe = Pipeline([
#     ('imputer', ...),
#     ('scaler', ...)
# ])

# transformed = pipe.fit_transform(X_train)
# print("Transformed Data:")
# print(transformed)`
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

    // Initialize all code editors in the newly loaded HTML
    setTimeout(() => {
        const editorElements = document.querySelectorAll('.editor-container');
        editorElements.forEach(editorEl => {
            const cellId = editorEl.id.replace('editor-', '');
            if(initialCode[cellId]) {
                editorEl.innerHTML = ''; // clear any existing
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
            import sys
            import io
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
