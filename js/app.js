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
        <p>Select a module from the sidebar to begin.</p>
    `,
    'week1': `
        <h1>Phase 1: Strengthen Python and Git</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <p><em>Check out Phase 2 and Phase 3 for the fully expanded textbook content.</em></p>
    `,
    'week2': `
        <h1>Phase 2: NumPy for Numerical Data</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        
        <div class="pacer-section">
            <h3><span class="badge">R</span> Textbook Reference: Understanding Data Types in Python</h3>
            <h4>Excerpt Study: Python Data Science Handbook</h4>
            <p>Effective data-driven science and computation requires understanding how data is stored and manipulated. Users of Python are often drawn to its ease of use, one piece of which is dynamic typing. While a statically-typed language like C or Java requires each variable to be explicitly declared, a dynamically-typed language like Python skips this specification. For example, in C you might specify a particular operation as follows:</p>
            <pre><code>/* C code */
int result = 0;
for(int i=0; i<100; i++){
    result += i;
}</code></pre>
            <p>While in Python the equivalent operation could be written this way:</p>
            <pre><code># Python code
result = 0
for i in range(100):
    result += i</code></pre>
            <p>Notice the main difference: in C, the data types of each variable are explicitly declared, while in Python the types are dynamically inferred. This means, for example, that we can assign any kind of data to any variable. However, this flexibility comes at a cost: every Python object contains overhead. A Python integer is more than just an integer; it is a C structure containing the reference count, type, and size. When you create a Python list of integers, it is actually an array of pointers, each pointing to a full Python object.</p>
            <p><strong>This is where NumPy comes in.</strong> At the core of data science in Python is the NumPy array (<code>ndarray</code>). Unlike Python lists, NumPy arrays contain values of a single type. Because they are homogenous and stored in contiguous memory blocks, operations on NumPy arrays can be pushed down into compiled C code, allowing for incredibly fast "vectorized" operations.</p>
            <p>When you create an array, you interact with its attributes: <code>ndim</code> (number of dimensions), <code>shape</code> (the size of each dimension), and <code>dtype</code> (the data type). If you try to put a floating-point number into an integer array, NumPy will silently upcast the entire array to floats to maintain homogeneity.</p>
        </div>

        <div class="notebook-cell" id="cell-w2-1">
            <div class="cell-header"><span>[ ] In: Python 3 - Practice: Array Attributes</span></div>
            <div class="editor-container" id="editor-w2-1"></div>
            <div class="controls"><button onclick="runCode('w2-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2-1"></div>
        </div>

        <div class="pacer-section">
            <h3><span class="badge">C</span> Conceptual: Comparisons, Masks, and Boolean Logic</h3>
            <h4>Excerpt Study: Python Data Science Handbook</h4>
            <p>This section covers the use of Boolean masks to examine and manipulate values within NumPy arrays. Masking comes up when you want to extract, modify, count, or otherwise manipulate values in an array based on some criterion: for example, you might wish to count all values greater than a certain value, or perhaps remove all outliers that are above some threshold. In NumPy, Boolean masking is often the most efficient way to accomplish these types of tasks.</p>
            <p>When you use a comparison operator (like <code><</code>, <code>></code>, <code>==</code>, <code>!=</code>) on an array, NumPy evaluates it element-wise, creating a new array of Boolean values. For example:</p>
            <pre><code>x = np.array([1, 2, 3, 4, 5])
x < 3
# Output: array([ True,  True, False, False, False])</code></pre>
            <p>This Boolean array can then be used as a mask to select particular subsets of the data themselves. Returning to our <code>x</code> array, suppose we want an array of all values in the array that are less than 3. We can do this simply by indexing on this Boolean array; this is known as a masking operation:</p>
            <pre><code>x[x < 3]
# Output: array([1, 2])</code></pre>
            <p>What is returned is a one-dimensional array filled with all the values that meet this condition. You can combine multiple conditions using bitwise logic operators: <code>&</code> (AND), <code>|</code> (OR), <code>^</code> (XOR), and <code>~</code> (NOT). <strong>Important note:</strong> you must use these bitwise operators rather than Python's native <code>and</code> / <code>or</code> keywords, because the evaluation must happen element-by-element, not on the array as a whole object.</p>
        </div>

        <div class="notebook-cell" id="cell-w2-2">
            <div class="cell-header"><span>[ ] In: Python 3 - Practice: Boolean Masking</span></div>
            <div class="editor-container" id="editor-w2-2"></div>
            <div class="controls"><button onclick="runCode('w2-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2-2"></div>
        </div>
    `,
    'week3': `
        <h1>Phase 3: Pandas and EDA</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        
        <div class="pacer-section">
            <h3><span class="badge">R</span> Textbook Reference: Handling Missing Data</h3>
            <h4>Excerpt Study: Python Data Science Handbook</h4>
            <p>The difference between data found in many tutorials and data in the real world is that real-world data is rarely clean and homogeneous. In particular, many interesting datasets will have some amount of data missing. To make matters even more complicated, different data sources may indicate missing data in different ways.</p>
            <p>Pandas chose to use sentinels for missing data, and further chose to use two already-existing Python null values: the special floating-point <code>NaN</code> value, and the Python <code>None</code> object.</p>
            <p><code>NaN</code> (acronym for Not a Number) is a special floating-point value recognized by all systems that use the standard IEEE floating-point representation. Because <code>NaN</code> is a float, if you introduce it into an array of integers, pandas will automatically upcast the integers to floats to accommodate the <code>NaN</code>.</p>
            <p>Pandas provides several useful methods for detecting, removing, and replacing null values in Pandas data structures. They are:</p>
            <ul>
                <li><code>isnull()</code> / <code>isna()</code>: Generate a boolean mask indicating missing values.</li>
                <li><code>notnull()</code> / <code>notna()</code>: Opposite of <code>isnull()</code>.</li>
                <li><code>dropna()</code>: Return a filtered version of the data. You can pass <code>axis='columns'</code> to drop columns containing NaNs, or <code>thresh=3</code> to keep rows with at least 3 non-null values.</li>
                <li><code>fillna()</code>: Return a copy of the data with missing values filled or imputed. You can pass a specific value (like 0, or the column's mean/median).</li>
            </ul>
            <p>In Data Engineering, blindly using <code>dropna()</code> is highly discouraged unless you understand *why* the data is missing. Missingness can be informative. Imputation (filling missing values with statistically sound estimates like the median) is often the preferred strategy.</p>
        </div>

        <div class="notebook-cell" id="cell-w3-1">
            <div class="cell-header"><span>[ ] In: Python 3 - Practice: Null Value Imputation</span></div>
            <div class="editor-container" id="editor-w3-1"></div>
            <div class="controls"><button onclick="runCode('w3-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3-1"></div>
        </div>
        
        <div class="pacer-section">
            <h3><span class="badge">C</span> Conceptual: Estimates of Location and Summary Statistics</h3>
            <h4>Excerpt Study: Practical Statistics for Data Scientists (Chapter 1 - Exploratory Data Analysis)</h4>
            <p>Variables with measured or count data might have thousands of distinct values. A basic step in exploring your data is getting a "typical value" for each feature (variable): an estimate of where most of the data is located (i.e., its central tendency).</p>
            <p><strong>The Mean:</strong> The most basic estimate of location is the mean, or average value. The mean is calculated by summing all values and dividing by the number of values.</p>
            <p><strong>The Median:</strong> The median is the middle number on a sorted list of the data. If there is an even number of data values, the middle value is one that is not actually in the data set, but rather the average of the two values that divide the sorted data into upper and lower halves. Compared to the mean, which uses all observations, the median depends only on the values in the center of the sorted data.</p>
            <p>Why do we need both? <strong>Because the mean is highly sensitive to outliers.</strong> If you are looking at the average income of a town of 100 people making $50,000, and Bill Gates moves into town, the *mean* income shoots up into the millions. The *median* income remains completely unchanged at $50,000. In data science, when you see a massive difference between a feature's mean and median, it is an immediate red flag that you have extreme outliers or highly skewed data.</p>
            <p>In Pandas, you can instantly generate these location estimates—along with standard deviation and quartiles—using the <code>df.describe()</code> method. Running this method is the procedural first step of Exploratory Data Analysis.</p>
        </div>

        <div class="notebook-cell" id="cell-w3-2">
            <div class="cell-header"><span>[ ] In: Python 3 - Practice: Identifying Outliers with Stats</span></div>
            <div class="editor-container" id="editor-w3-2"></div>
            <div class="controls"><button onclick="runCode('w3-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3-2"></div>
        </div>
    `,
    'week4': `
        <h1>Phase 4: Visualization and Statistics</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <p><em>Check out Phase 2 and Phase 3 for the fully expanded textbook content format.</em></p>
    `,
    'week5': `
        <h1>Phase 5: Build a Proper Data Pipeline</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <p><em>Check out Phase 2 and Phase 3 for the fully expanded textbook content format.</em></p>
    `,
    'week6': `
        <h1>Phase 6: Scikit-learn Pipelines</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <p><em>Check out Phase 2 and Phase 3 for the fully expanded textbook content format.</em></p>
    `
};

const initialCode = {
    'w2-1': `import numpy as np

# Practice: Memory & Attributes
# 1. Create a NumPy array from a python list containing integers.
# 2. Check its dtype.
# 3. Try to modify one element to a float (e.g. 3.14). What happens to the dtype?

# Write your code here:
arr = np.array([10, 20, 30, 40])
print("Original dtype:", arr.dtype)

# TODO: assign 3.14 to arr[0]
# arr[0] = ...
# print("Modified array:", arr)
# print("New dtype:", arr.dtype)`,
    
    'w2-2': `import numpy as np

# Practice: Complex Masking with Bitwise Operators
# You have a sensor array recording temperatures.
temps = np.array([72, 75, 102, 68, -5, 74, 99, 71, 200])

# TODO: Create a mask that finds "invalid" temperatures.
# We define invalid as anything less than 0 OR greater than 100.
# Hint: Use the bitwise OR operator (|) between two conditions in parentheses.
# invalid_mask = (temps < 0) | (temps > 100)

# TODO: Print the invalid values by applying the mask.
# print("Invalid sensor readings:", temps[invalid_mask])

# TODO: Create a clean array that only contains valid temperatures using the NOT operator (~)
# clean_temps = temps[~invalid_mask]
# print("Clean readings:", clean_temps)`,

    'w3-1': `import pandas as pd
import numpy as np

# Practice: Handling Missing Data the right way
data = {
    'customer_id': [101, 102, 103, 104, 105],
    'signup_source': ['Facebook', np.nan, 'Google', 'Google', np.nan],
    'monthly_spend': [50.5, np.nan, 80.0, np.nan, 200.0]
}
df = pd.DataFrame(data)
print("Original Data:\\n", df, "\\n")

# TODO: Calculate the median of the 'monthly_spend' column
# median_spend = ...

# TODO: Use fillna() to impute the missing monthly_spend values with the median
# df['monthly_spend'] = ...

# TODO: For a categorical column like 'signup_source', we might want to fill NaNs with a string "Unknown"
# df['signup_source'] = ...

# print("Cleaned Data:\\n", df)`,

    'w3-2': `import pandas as pd
import numpy as np

# Practice: Spotting Skewness and Outliers mathematically
# Let's create a dataset representing salaries at a small startup.
salaries = [60000, 65000, 70000, 58000, 62000, 75000, 80000, 2500000] # CEO makes 2.5m
df = pd.DataFrame({'salary': salaries})

# TODO: Calculate the raw mean and median using df['salary'].mean() and df['salary'].median()
# ...

# TODO: Run df.describe() and print it. 
# Look at the 'mean' vs the '50%' (which is the median/2nd quartile).
# The massive difference between mean and 50% proves the existence of severe right-skew/outliers without even needing a plot!
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
