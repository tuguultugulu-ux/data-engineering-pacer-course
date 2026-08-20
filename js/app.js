let pyodideReadyPromise;
let pyodideInstance;
let pyodideLoaded = false;
let pyodideStatus = "Loading Python environment (this may take a minute on first load)...";
let editors = {};

document.addEventListener("DOMContentLoaded", () => {
    loadLesson('intro');
    initPyodide();
});

function togglePhase(element) {
    document.querySelectorAll('.sidebar > ul > li').forEach(li => li.classList.remove('active'));
    element.parentElement.classList.add('active');
}

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
    'intro': `<div class="overview-content">    <h1>Your 10-Week Data Pipeline Curriculum</h1>    <p>Your finish line is: take raw CSV/JSON data, define the prediction target, validate and clean data, prevent leakage, create reproducible train/validation/test splits, transform data correctly, train a baseline, and save the pipeline.</p>    <p>Use the plan below over roughly <strong>8–10 weeks</strong>, building one growing project repository rather than isolated notebooks.</p>    <h2>Core resource stack</h2>    <p>Use <strong>one primary resource per area</strong>, not five at once.</p>    <table>        <tr><th>Skill</th><th>Primary resource</th><th>How to use it</th></tr>        <tr><td>NumPy, Pandas, Matplotlib, scikit-learn overview</td><td>Python Data Science Handbook</td><td>Read the relevant chapter, then rewrite the code from memory in your own notebook.</td></tr>        <tr><td>Pandas practical depth</td><td>Pandas Getting Started Tutorials</td><td>Complete these after each Pandas topic.</td></tr>        <tr><td>Statistics for data work</td><td>Practical Statistics for Data Scientists, 2nd edition</td><td>Best bridge from basic statistics to EDA, sampling, regression, classification, and statistical ML.</td></tr>        <tr><td>ML concepts and data preparation</td><td>Google Machine Learning Crash Course</td><td>Complete its modules on datasets, numerical/categorical data, overfitting, classification, metrics, and data preparation.</td></tr>        <tr><td>Classical ML implementation</td><td>scikit-learn User Guide + Getting Started</td><td>Use these as you implement each model.</td></tr>        <tr><td>Proper preprocessing</td><td>scikit-learn Pipeline docs</td><td>Learn Pipeline and ColumnTransformer early.</td></tr>        <tr><td>Data-quality engineering</td><td>Google production ML monitoring</td><td>Use it to learn schemas, validation tests, leakage checks, and training-serving consistency.</td></tr>        <tr><td>Version control</td><td>Pro Git</td><td>Read chapters on basics, branching, remotes, and collaboration. Use Git for every project from day one.</td></tr>    </table>    <h2>Your exact 10-week plan</h2>    <table>        <tr><th>Week</th><th>Learn</th><th>Build</th></tr>        <tr><td>1</td><td>Python functions, errors, files, assertions, Git</td><td><code>data_utils.py</code></td></tr>        <tr><td>2</td><td>NumPy refresh: masks, dtypes, axes, random seeds</td><td>Synthetic dirty dataset generator</td></tr>        <tr><td>3</td><td>Pandas loading, inspection, filtering, cleaning</td><td>Data audit notebook</td></tr>        <tr><td>4</td><td>Pandas grouping, merging, text/date operations</td><td>Cleaned dataset + data dictionary</td></tr>        <tr><td>5</td><td>Matplotlib/Seaborn + descriptive statistics</td><td>EDA report with findings</td></tr>        <tr><td>6</td><td>Leakage, feature/target logic, train/test splits</td><td>Data readiness report + validators</td></tr>        <tr><td>7</td><td>Scikit-learn preprocessing + Pipeline</td><td>Reusable preprocessing pipeline</td></tr>        <tr><td>8</td><td>Logistic regression, metrics, confusion matrix</td><td>First classification baseline</td></tr>        <tr><td>9</td><td>Trees, random forests, cross-validation</td><td>Model comparison report</td></tr>        <tr><td>10</td><td>Refactor, test, document, publish</td><td>Complete GitHub project</td></tr>    </table>    <h2>Avoid these mistakes</h2>    <ul>        <li>Do not spend months memorizing every NumPy/Pandas method.</li>        <li>Do not fit a scaler, imputer, encoder, or feature selector on the full dataset before splitting.</li>        <li>Do not drop every missing row without explaining why.</li>        <li>Do not use an ID or post-outcome column as a feature.</li>        <li>Do not judge an imbalanced classification model by accuracy alone.</li>        <li>Do not train without a baseline.</li>        <li>Do not keep all work in one giant notebook.</li>        <li>Do not commit raw private/sensitive data, API keys, .env files, or large model binaries to Git.</li>    </ul></div>`,    'p1_overview': `<div class="overview-content">    <h1>Phase 1: Strengthen Python and Git</h1>    <p><strong>Time:</strong> 1 week alongside the rest.</p>    <p>You should reliably write:</p>    <pre><code>def clean_age(value):    if pd.isna(value) or value < 13 or value > 100:        return np.nan    return value</code></pre>        <h3>Learn and practice:</h3>    <ul>        <li>Functions, docstrings, return values, keyword arguments</li>        <li>if/elif/else, loops only when vectorization is not appropriate</li>        <li>Lists, dictionaries, sets, tuples</li>        <li>File paths with <code>pathlib</code></li>        <li>Reading/writing text, CSV, JSON</li>        <li>Errors: ValueError, KeyError, FileNotFoundError</li>        <li>try/except only where recovery is sensible</li>        <li>Assertions</li>        <li>Virtual environments and requirements.txt</li>        <li>Git: status, add, commit, log, branch, merge, pull, push</li>    </ul>    <h3>Required mini-project</h3>    <p>Build <code>data_utils.py</code> with reusable functions:</p>    <pre><code>load_csv()validate_columns()validate_numeric_range()clean_text_column()report_missing_values()save_clean_dataset()</code></pre>    <p>Write a small README.md explaining how to run it.</p></div>`,    'p2_overview': `<div class="overview-content">    <h1>Phase 2: NumPy for numerical data</h1>    <p><strong>Time:</strong> 1–2 weeks.</p>    <p>You already studied a lot of this. Now focus only on skills used in pipelines:</p>    <pre><code>shape, ndim, dtypeindexing, slicing, masksreshape, transpose, axisbroadcastingmean, median, std, min, maxwhere, clip, isnanunique, argsortrandom generators and seeded permutations</code></pre>    <h3>What “ready” looks like</h3>    <p>You can explain these immediately:</p>    <pre><code>X.shape == (n_samples, n_features)y.shape == (n_samples,)</code></pre>    <pre><code>mask = (ages >= 13) & (ages <= 100)valid_ages = ages[mask]</code></pre>    <h3>Practice project</h3>    <p>Create a synthetic numerical dataset with NumPy:</p>    <ul>        <li>1,000 rows</li>        <li>5 useful numerical features</li>        <li>Missing values</li>        <li>Incorrect values</li>        <li>Outliers</li>        <li>A binary target</li>        <li>Duplicate rows</li>    </ul>    <p>Then clean it and export it as <code>synthetic_clean.csv</code>. Do not train a model yet. Your goal is to prove you can inspect, clean, validate, and split it.</p></div>`,    'p3_overview': `<div class="overview-content">    <h1>Phase 3: Pandas and EDA</h1>    <p><strong>Time:</strong> 2 weeks.</p>    <p>Follow the official Pandas getting-started tutorials in this order:</p>    <ol>        <li>Reading/writing tables</li>        <li>Selecting/filtering rows and columns</li>        <li>Creating derived columns</li>        <li>Summary statistics</li>        <li>Combining tables</li>        <li>Reshaping tables</li>        <li>Text cleaning</li>        <li>Datetime data</li>    </ol>    <h3>Practice project: dataset audit</h3>    <p>Pick any clean-enough public CSV dataset. Create <code>01_data_audit.ipynb</code> with:</p>    <ul>        <li>Problem statement</li>        <li>Unit of observation: what one row means</li>        <li>Shape, dtypes, head, info, describe</li>        <li>Missing-value table: count and percent by column</li>        <li>Duplicate report</li>        <li>Unique category report</li>        <li>Numeric range checks</li>        <li>Data dictionary</li>        <li>Initial risk notes: possible leakage, bias, bad labels, incorrect values</li>    </ul>    <p>You should save <code>audit_report.md</code> at the end.</p></div>`,    'p4_overview': `<div class="overview-content">    <h1>Phase 4: Visualization and statistics</h1>    <p><strong>Time:</strong> 1–2 weeks, parallel with Pandas.</p>    <p>Learn just enough Matplotlib/Seaborn to interrogate data: <code>plt.hist(), plt.scatter(), plt.boxplot(), sns.heatmap()</code></p>    <h3>Statistical concepts to learn</h3>    <p>Read Practical Statistics for Data Scientists while applying every concept in code.</p>    <table>        <tr><th>Topic</th><th>You must understand</th></tr>        <tr><td>Mean / median</td><td>Mean moves strongly with outliers; median is more robust</td></tr>        <tr><td>Variance / standard deviation</td><td>Spread around a center</td></tr>        <tr><td>Distributions</td><td>Center, spread, skew, tails, multimodality</td></tr>        <tr><td>Outliers</td><td>Data-entry error vs rare valid event</td></tr>        <tr><td>Leakage</td><td>A feature uses future/target information</td></tr>    </table>    <h3>Required EDA notebook</h3>    <p>For one dataset, include:</p>    <ul>        <li>Histogram for each main numerical feature</li>        <li>Boxplot for outlier inspection</li>        <li>Bar chart of target classes</li>        <li>Scatter plot of one important feature vs target</li>        <li>Correlation matrix for numerical fields</li>    </ul>    <p>Do not merely draw plots. Write one sentence below each: <strong>what it reveals and what decision it changes.</strong></p></div>`,    'p5_overview': `<div class="overview-content">    <h1>Phase 5: Build a proper data pipeline</h1>    <p><strong>Time:</strong> 2 weeks.</p>    <p>This is the important transition. A data pipeline is a reproducible sequence:</p>    <pre><code>Raw source data  → load  → inspect  → validate schema  → clean  → split  → fit preprocessing on training data only  → transform validation/test data  → train baseline model  → evaluate  → save pipeline and outputs</code></pre>    <h3>Data contract</h3>    <p>Create data/README.md or reports/data_dictionary.md. This forces you to decide what data *means*, not only what methods to call.</p>    <h3>Reusable validator</h3>    <p>Write this yourself and improve it per dataset:</p>    <pre><code>def validate_dataset(df, feature_cols, target_col, id_col=None):    required = set(feature_cols + [target_col])    missing_columns = required - set(df.columns)    assert not missing_columns, f"Missing columns: {missing_columns}"        # ... assert notna, isfinite, etc.</code></pre></div>`,    'p6_overview': `<div class="overview-content">    <h1>Phase 6: Scikit-learn pipelines</h1>    <p><strong>Time:</strong> 1–2 weeks.</p>    <p>Now begin classical ML. Learn this order:</p>    <ol>        <li>train_test_split</li>        <li>Baselines</li>        <li>SimpleImputer</li>        <li>StandardScaler</li>        <li>OneHotEncoder</li>        <li>ColumnTransformer</li>        <li>Pipeline</li>        <li>Logistic regression / linear regression</li>        <li>Decision tree / Random forest</li>        <li>Metrics</li>    </ol>    <h3>The model-ready pipeline pattern</h3>    <pre><code>numeric_pipeline = Pipeline([    ("imputer", SimpleImputer(strategy="median")),    ("scaler", StandardScaler())])categorical_pipeline = Pipeline([    ("imputer", SimpleImputer(strategy="most_frequent")),    ("onehot", OneHotEncoder(handle_unknown="ignore"))])preprocessor = ColumnTransformer([    ("num", numeric_pipeline, numeric_features),    ("cat", categorical_pipeline, categorical_features)])</code></pre></div>`,
    'p1_git': `
        <h1>Git Basics</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Pro Git: Chapter 2 <a href="https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository"></iframe>
        </div>
        <div class="notebook-cell" id="cell-git-1">
            <div class="cell-header"><span>[ ] Practice: Bash Simulator (Running git status)</span></div>
            <div class="editor-container" id="editor-git-1"></div>
            <div class="controls"><button onclick="runCode('git-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-git-1"></div>
        </div>
    `,
    'w2_00': `
        <h1>2. Introduction to NumPy</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">2. Introduction to NumPy <a href="https://jakevdp.github.io/PythonDataScienceHandbook/02.00-introduction-to-numpy.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/02.00-introduction-to-numpy.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above.</p>
        
        <div class="notebook-cell" id="cell-w2_00-0">
            <div class="cell-header"><span>[ ] Practice 1: 2. Introduction to NumPy</span></div>
            <div class="editor-container" id="editor-w2_00-0"></div>
            <div class="controls"><button onclick="runCode('w2_00-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_00-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_00-1">
            <div class="cell-header"><span>[ ] Practice 2: 2. Introduction to NumPy</span></div>
            <div class="editor-container" id="editor-w2_00-1"></div>
            <div class="controls"><button onclick="runCode('w2_00-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_00-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_00-2">
            <div class="cell-header"><span>[ ] Practice 3: 2. Introduction to NumPy</span></div>
            <div class="editor-container" id="editor-w2_00-2"></div>
            <div class="controls"><button onclick="runCode('w2_00-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_00-2"></div>
        </div>
        
    `,
    'w2_01': `
        <h1>Understanding Data Types in Python</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Understanding Data Types in Python <a href="https://jakevdp.github.io/PythonDataScienceHandbook/02.01-understanding-data-types.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/02.01-understanding-data-types.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above.</p>
        
        <div class="notebook-cell" id="cell-w2_01-0">
            <div class="cell-header"><span>[ ] Practice 1: Understanding Data Types in Python</span></div>
            <div class="editor-container" id="editor-w2_01-0"></div>
            <div class="controls"><button onclick="runCode('w2_01-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_01-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_01-1">
            <div class="cell-header"><span>[ ] Practice 2: Understanding Data Types in Python</span></div>
            <div class="editor-container" id="editor-w2_01-1"></div>
            <div class="controls"><button onclick="runCode('w2_01-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_01-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_01-2">
            <div class="cell-header"><span>[ ] Practice 3: Understanding Data Types in Python</span></div>
            <div class="editor-container" id="editor-w2_01-2"></div>
            <div class="controls"><button onclick="runCode('w2_01-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_01-2"></div>
        </div>
        
    `,
    'w2_02': `
        <h1>The Basics of NumPy Arrays</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">The Basics of NumPy Arrays <a href="https://jakevdp.github.io/PythonDataScienceHandbook/02.02-the-basics-of-numpy-arrays.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/02.02-the-basics-of-numpy-arrays.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above.</p>
        
        <div class="notebook-cell" id="cell-w2_02-0">
            <div class="cell-header"><span>[ ] Practice 1: The Basics of NumPy Arrays</span></div>
            <div class="editor-container" id="editor-w2_02-0"></div>
            <div class="controls"><button onclick="runCode('w2_02-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_02-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_02-1">
            <div class="cell-header"><span>[ ] Practice 2: The Basics of NumPy Arrays</span></div>
            <div class="editor-container" id="editor-w2_02-1"></div>
            <div class="controls"><button onclick="runCode('w2_02-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_02-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_02-2">
            <div class="cell-header"><span>[ ] Practice 3: The Basics of NumPy Arrays</span></div>
            <div class="editor-container" id="editor-w2_02-2"></div>
            <div class="controls"><button onclick="runCode('w2_02-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_02-2"></div>
        </div>
        
    `,
    'w2_03': `
        <h1>Computation on NumPy Arrays: Universal Functions</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Computation on NumPy Arrays: Universal Functions <a href="https://jakevdp.github.io/PythonDataScienceHandbook/02.03-computation-on-arrays-ufuncs.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/02.03-computation-on-arrays-ufuncs.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above.</p>
        
        <div class="notebook-cell" id="cell-w2_03-0">
            <div class="cell-header"><span>[ ] Practice 1: Computation on NumPy Arrays: Universal Functions</span></div>
            <div class="editor-container" id="editor-w2_03-0"></div>
            <div class="controls"><button onclick="runCode('w2_03-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_03-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_03-1">
            <div class="cell-header"><span>[ ] Practice 2: Computation on NumPy Arrays: Universal Functions</span></div>
            <div class="editor-container" id="editor-w2_03-1"></div>
            <div class="controls"><button onclick="runCode('w2_03-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_03-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_03-2">
            <div class="cell-header"><span>[ ] Practice 3: Computation on NumPy Arrays: Universal Functions</span></div>
            <div class="editor-container" id="editor-w2_03-2"></div>
            <div class="controls"><button onclick="runCode('w2_03-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_03-2"></div>
        </div>
        
    `,
    'w2_04': `
        <h1>Aggregations: Min, Max, and Everything In Between</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Aggregations: Min, Max, and Everything In Between <a href="https://jakevdp.github.io/PythonDataScienceHandbook/02.04-computation-on-arrays-aggregates.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/02.04-computation-on-arrays-aggregates.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above.</p>
        
        <div class="notebook-cell" id="cell-w2_04-0">
            <div class="cell-header"><span>[ ] Practice 1: Aggregations: Min, Max, and Everything In Between</span></div>
            <div class="editor-container" id="editor-w2_04-0"></div>
            <div class="controls"><button onclick="runCode('w2_04-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_04-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_04-1">
            <div class="cell-header"><span>[ ] Practice 2: Aggregations: Min, Max, and Everything In Between</span></div>
            <div class="editor-container" id="editor-w2_04-1"></div>
            <div class="controls"><button onclick="runCode('w2_04-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_04-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_04-2">
            <div class="cell-header"><span>[ ] Practice 3: Aggregations: Min, Max, and Everything In Between</span></div>
            <div class="editor-container" id="editor-w2_04-2"></div>
            <div class="controls"><button onclick="runCode('w2_04-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_04-2"></div>
        </div>
        
    `,
    'w2_05': `
        <h1>Computation on Arrays: Broadcasting</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Computation on Arrays: Broadcasting <a href="https://jakevdp.github.io/PythonDataScienceHandbook/02.05-computation-on-arrays-broadcasting.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/02.05-computation-on-arrays-broadcasting.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above.</p>
        
        <div class="notebook-cell" id="cell-w2_05-0">
            <div class="cell-header"><span>[ ] Practice 1: Computation on Arrays: Broadcasting</span></div>
            <div class="editor-container" id="editor-w2_05-0"></div>
            <div class="controls"><button onclick="runCode('w2_05-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_05-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_05-1">
            <div class="cell-header"><span>[ ] Practice 2: Computation on Arrays: Broadcasting</span></div>
            <div class="editor-container" id="editor-w2_05-1"></div>
            <div class="controls"><button onclick="runCode('w2_05-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_05-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_05-2">
            <div class="cell-header"><span>[ ] Practice 3: Computation on Arrays: Broadcasting</span></div>
            <div class="editor-container" id="editor-w2_05-2"></div>
            <div class="controls"><button onclick="runCode('w2_05-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_05-2"></div>
        </div>
        
    `,
    'w2_06': `
        <h1>Comparisons, Masks, and Boolean Logic</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Comparisons, Masks, and Boolean Logic <a href="https://jakevdp.github.io/PythonDataScienceHandbook/02.06-boolean-arrays-and-masks.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/02.06-boolean-arrays-and-masks.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above.</p>
        
        <div class="notebook-cell" id="cell-w2_06-0">
            <div class="cell-header"><span>[ ] Practice 1: Comparisons, Masks, and Boolean Logic</span></div>
            <div class="editor-container" id="editor-w2_06-0"></div>
            <div class="controls"><button onclick="runCode('w2_06-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_06-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_06-1">
            <div class="cell-header"><span>[ ] Practice 2: Comparisons, Masks, and Boolean Logic</span></div>
            <div class="editor-container" id="editor-w2_06-1"></div>
            <div class="controls"><button onclick="runCode('w2_06-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_06-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_06-2">
            <div class="cell-header"><span>[ ] Practice 3: Comparisons, Masks, and Boolean Logic</span></div>
            <div class="editor-container" id="editor-w2_06-2"></div>
            <div class="controls"><button onclick="runCode('w2_06-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_06-2"></div>
        </div>
        
    `,
    'w2_07': `
        <h1>Fancy Indexing</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Fancy Indexing <a href="https://jakevdp.github.io/PythonDataScienceHandbook/02.07-fancy-indexing.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/02.07-fancy-indexing.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above.</p>
        
        <div class="notebook-cell" id="cell-w2_07-0">
            <div class="cell-header"><span>[ ] Practice 1: Fancy Indexing</span></div>
            <div class="editor-container" id="editor-w2_07-0"></div>
            <div class="controls"><button onclick="runCode('w2_07-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_07-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_07-1">
            <div class="cell-header"><span>[ ] Practice 2: Fancy Indexing</span></div>
            <div class="editor-container" id="editor-w2_07-1"></div>
            <div class="controls"><button onclick="runCode('w2_07-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_07-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_07-2">
            <div class="cell-header"><span>[ ] Practice 3: Fancy Indexing</span></div>
            <div class="editor-container" id="editor-w2_07-2"></div>
            <div class="controls"><button onclick="runCode('w2_07-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_07-2"></div>
        </div>
        
    `,
    'w2_08': `
        <h1>Sorting Arrays</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Sorting Arrays <a href="https://jakevdp.github.io/PythonDataScienceHandbook/02.08-sorting.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/02.08-sorting.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above.</p>
        
        <div class="notebook-cell" id="cell-w2_08-0">
            <div class="cell-header"><span>[ ] Practice 1: Sorting Arrays</span></div>
            <div class="editor-container" id="editor-w2_08-0"></div>
            <div class="controls"><button onclick="runCode('w2_08-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_08-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_08-1">
            <div class="cell-header"><span>[ ] Practice 2: Sorting Arrays</span></div>
            <div class="editor-container" id="editor-w2_08-1"></div>
            <div class="controls"><button onclick="runCode('w2_08-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_08-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_08-2">
            <div class="cell-header"><span>[ ] Practice 3: Sorting Arrays</span></div>
            <div class="editor-container" id="editor-w2_08-2"></div>
            <div class="controls"><button onclick="runCode('w2_08-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_08-2"></div>
        </div>
        
    `,
    'w2_09': `
        <h1>Structured Data: NumPy\'s Structured Arrays</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Structured Data: NumPy\'s Structured Arrays <a href="https://jakevdp.github.io/PythonDataScienceHandbook/02.09-structured-data-numpy.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/02.09-structured-data-numpy.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above.</p>
        
        <div class="notebook-cell" id="cell-w2_09-0">
            <div class="cell-header"><span>[ ] Practice 1: Structured Data: NumPy's Structured Arrays</span></div>
            <div class="editor-container" id="editor-w2_09-0"></div>
            <div class="controls"><button onclick="runCode('w2_09-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_09-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_09-1">
            <div class="cell-header"><span>[ ] Practice 2: Structured Data: NumPy's Structured Arrays</span></div>
            <div class="editor-container" id="editor-w2_09-1"></div>
            <div class="controls"><button onclick="runCode('w2_09-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_09-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_09-2">
            <div class="cell-header"><span>[ ] Practice 3: Structured Data: NumPy's Structured Arrays</span></div>
            <div class="editor-container" id="editor-w2_09-2"></div>
            <div class="controls"><button onclick="runCode('w2_09-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_09-2"></div>
        </div>
        
    `,
    'w4_00': `
        <h1>4. Visualization with Matplotlib</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">4. Visualization with Matplotlib <a href="https://jakevdp.github.io/PythonDataScienceHandbook/04.00-introduction-to-matplotlib.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/04.00-introduction-to-matplotlib.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above.</p>
        
        <div class="notebook-cell" id="cell-w4_00-0">
            <div class="cell-header"><span>[ ] Practice 1: 4. Visualization with Matplotlib</span></div>
            <div class="editor-container" id="editor-w4_00-0"></div>
            <div class="controls"><button onclick="runCode('w4_00-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_00-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_00-1">
            <div class="cell-header"><span>[ ] Practice 2: 4. Visualization with Matplotlib</span></div>
            <div class="editor-container" id="editor-w4_00-1"></div>
            <div class="controls"><button onclick="runCode('w4_00-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_00-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_00-2">
            <div class="cell-header"><span>[ ] Practice 3: 4. Visualization with Matplotlib</span></div>
            <div class="editor-container" id="editor-w4_00-2"></div>
            <div class="controls"><button onclick="runCode('w4_00-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_00-2"></div>
        </div>
        
    `,
    'w4_01': `
        <h1>Simple Line Plots</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Simple Line Plots <a href="https://jakevdp.github.io/PythonDataScienceHandbook/04.01-simple-line-plots.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/04.01-simple-line-plots.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above.</p>
        
        <div class="notebook-cell" id="cell-w4_01-0">
            <div class="cell-header"><span>[ ] Practice 1: Simple Line Plots</span></div>
            <div class="editor-container" id="editor-w4_01-0"></div>
            <div class="controls"><button onclick="runCode('w4_01-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_01-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_01-1">
            <div class="cell-header"><span>[ ] Practice 2: Simple Line Plots</span></div>
            <div class="editor-container" id="editor-w4_01-1"></div>
            <div class="controls"><button onclick="runCode('w4_01-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_01-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_01-2">
            <div class="cell-header"><span>[ ] Practice 3: Simple Line Plots</span></div>
            <div class="editor-container" id="editor-w4_01-2"></div>
            <div class="controls"><button onclick="runCode('w4_01-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_01-2"></div>
        </div>
        
    `,
    'w4_02': `
        <h1>Simple Scatter Plots</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Simple Scatter Plots <a href="https://jakevdp.github.io/PythonDataScienceHandbook/04.02-simple-scatter-plots.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/04.02-simple-scatter-plots.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above.</p>
        
        <div class="notebook-cell" id="cell-w4_02-0">
            <div class="cell-header"><span>[ ] Practice 1: Simple Scatter Plots</span></div>
            <div class="editor-container" id="editor-w4_02-0"></div>
            <div class="controls"><button onclick="runCode('w4_02-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_02-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_02-1">
            <div class="cell-header"><span>[ ] Practice 2: Simple Scatter Plots</span></div>
            <div class="editor-container" id="editor-w4_02-1"></div>
            <div class="controls"><button onclick="runCode('w4_02-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_02-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_02-2">
            <div class="cell-header"><span>[ ] Practice 3: Simple Scatter Plots</span></div>
            <div class="editor-container" id="editor-w4_02-2"></div>
            <div class="controls"><button onclick="runCode('w4_02-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_02-2"></div>
        </div>
        
    `,
    'w4_03': `
        <h1>Visualizing Errors</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Visualizing Errors <a href="https://jakevdp.github.io/PythonDataScienceHandbook/04.03-errorbars.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/04.03-errorbars.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above.</p>
        
        <div class="notebook-cell" id="cell-w4_03-0">
            <div class="cell-header"><span>[ ] Practice 1: Visualizing Errors</span></div>
            <div class="editor-container" id="editor-w4_03-0"></div>
            <div class="controls"><button onclick="runCode('w4_03-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_03-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_03-1">
            <div class="cell-header"><span>[ ] Practice 2: Visualizing Errors</span></div>
            <div class="editor-container" id="editor-w4_03-1"></div>
            <div class="controls"><button onclick="runCode('w4_03-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_03-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_03-2">
            <div class="cell-header"><span>[ ] Practice 3: Visualizing Errors</span></div>
            <div class="editor-container" id="editor-w4_03-2"></div>
            <div class="controls"><button onclick="runCode('w4_03-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_03-2"></div>
        </div>
        
    `,
    'w4_04': `
        <h1>Density and Contour Plots</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Density and Contour Plots <a href="https://jakevdp.github.io/PythonDataScienceHandbook/04.04-density-and-contour-plots.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/04.04-density-and-contour-plots.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above.</p>
        
        <div class="notebook-cell" id="cell-w4_04-0">
            <div class="cell-header"><span>[ ] Practice 1: Density and Contour Plots</span></div>
            <div class="editor-container" id="editor-w4_04-0"></div>
            <div class="controls"><button onclick="runCode('w4_04-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_04-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_04-1">
            <div class="cell-header"><span>[ ] Practice 2: Density and Contour Plots</span></div>
            <div class="editor-container" id="editor-w4_04-1"></div>
            <div class="controls"><button onclick="runCode('w4_04-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_04-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_04-2">
            <div class="cell-header"><span>[ ] Practice 3: Density and Contour Plots</span></div>
            <div class="editor-container" id="editor-w4_04-2"></div>
            <div class="controls"><button onclick="runCode('w4_04-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_04-2"></div>
        </div>
        
    `,
    'w4_05': `
        <h1>Histograms, Binnings, and Density</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Histograms, Binnings, and Density <a href="https://jakevdp.github.io/PythonDataScienceHandbook/04.05-histograms-and-binnings.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/04.05-histograms-and-binnings.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above.</p>
        
        <div class="notebook-cell" id="cell-w4_05-0">
            <div class="cell-header"><span>[ ] Practice 1: Histograms, Binnings, and Density</span></div>
            <div class="editor-container" id="editor-w4_05-0"></div>
            <div class="controls"><button onclick="runCode('w4_05-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_05-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_05-1">
            <div class="cell-header"><span>[ ] Practice 2: Histograms, Binnings, and Density</span></div>
            <div class="editor-container" id="editor-w4_05-1"></div>
            <div class="controls"><button onclick="runCode('w4_05-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_05-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_05-2">
            <div class="cell-header"><span>[ ] Practice 3: Histograms, Binnings, and Density</span></div>
            <div class="editor-container" id="editor-w4_05-2"></div>
            <div class="controls"><button onclick="runCode('w4_05-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_05-2"></div>
        </div>
        
    `,
    'w4_06': `
        <h1>Customizing Plot Legends</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Customizing Plot Legends <a href="https://jakevdp.github.io/PythonDataScienceHandbook/04.06-customizing-legends.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/04.06-customizing-legends.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above.</p>
        
        <div class="notebook-cell" id="cell-w4_06-0">
            <div class="cell-header"><span>[ ] Practice 1: Customizing Plot Legends</span></div>
            <div class="editor-container" id="editor-w4_06-0"></div>
            <div class="controls"><button onclick="runCode('w4_06-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_06-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_06-1">
            <div class="cell-header"><span>[ ] Practice 2: Customizing Plot Legends</span></div>
            <div class="editor-container" id="editor-w4_06-1"></div>
            <div class="controls"><button onclick="runCode('w4_06-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_06-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_06-2">
            <div class="cell-header"><span>[ ] Practice 3: Customizing Plot Legends</span></div>
            <div class="editor-container" id="editor-w4_06-2"></div>
            <div class="controls"><button onclick="runCode('w4_06-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_06-2"></div>
        </div>
        
    `,
    'w4_07': `
        <h1>Customizing Colorbars</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Customizing Colorbars <a href="https://jakevdp.github.io/PythonDataScienceHandbook/04.07-customizing-colorbars.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/04.07-customizing-colorbars.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above.</p>
        
        <div class="notebook-cell" id="cell-w4_07-0">
            <div class="cell-header"><span>[ ] Practice 1: Customizing Colorbars</span></div>
            <div class="editor-container" id="editor-w4_07-0"></div>
            <div class="controls"><button onclick="runCode('w4_07-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_07-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_07-1">
            <div class="cell-header"><span>[ ] Practice 2: Customizing Colorbars</span></div>
            <div class="editor-container" id="editor-w4_07-1"></div>
            <div class="controls"><button onclick="runCode('w4_07-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_07-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_07-2">
            <div class="cell-header"><span>[ ] Practice 3: Customizing Colorbars</span></div>
            <div class="editor-container" id="editor-w4_07-2"></div>
            <div class="controls"><button onclick="runCode('w4_07-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_07-2"></div>
        </div>
        
    `,
    'w4_08': `
        <h1>Multiple Subplots</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Multiple Subplots <a href="https://jakevdp.github.io/PythonDataScienceHandbook/04.08-multiple-subplots.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/04.08-multiple-subplots.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above.</p>
        
        <div class="notebook-cell" id="cell-w4_08-0">
            <div class="cell-header"><span>[ ] Practice 1: Multiple Subplots</span></div>
            <div class="editor-container" id="editor-w4_08-0"></div>
            <div class="controls"><button onclick="runCode('w4_08-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_08-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_08-1">
            <div class="cell-header"><span>[ ] Practice 2: Multiple Subplots</span></div>
            <div class="editor-container" id="editor-w4_08-1"></div>
            <div class="controls"><button onclick="runCode('w4_08-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_08-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_08-2">
            <div class="cell-header"><span>[ ] Practice 3: Multiple Subplots</span></div>
            <div class="editor-container" id="editor-w4_08-2"></div>
            <div class="controls"><button onclick="runCode('w4_08-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_08-2"></div>
        </div>
        
    `,
    'w4_09': `
        <h1>Text and Annotation</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Text and Annotation <a href="https://jakevdp.github.io/PythonDataScienceHandbook/04.09-text-and-annotation.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/04.09-text-and-annotation.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above.</p>
        
        <div class="notebook-cell" id="cell-w4_09-0">
            <div class="cell-header"><span>[ ] Practice 1: Text and Annotation</span></div>
            <div class="editor-container" id="editor-w4_09-0"></div>
            <div class="controls"><button onclick="runCode('w4_09-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_09-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_09-1">
            <div class="cell-header"><span>[ ] Practice 2: Text and Annotation</span></div>
            <div class="editor-container" id="editor-w4_09-1"></div>
            <div class="controls"><button onclick="runCode('w4_09-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_09-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_09-2">
            <div class="cell-header"><span>[ ] Practice 3: Text and Annotation</span></div>
            <div class="editor-container" id="editor-w4_09-2"></div>
            <div class="controls"><button onclick="runCode('w4_09-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_09-2"></div>
        </div>
        
    `,
    'w4_10': `
        <h1>Customizing Ticks</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Customizing Ticks <a href="https://jakevdp.github.io/PythonDataScienceHandbook/04.10-customizing-ticks.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/04.10-customizing-ticks.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above.</p>
        
        <div class="notebook-cell" id="cell-w4_10-0">
            <div class="cell-header"><span>[ ] Practice 1: Customizing Ticks</span></div>
            <div class="editor-container" id="editor-w4_10-0"></div>
            <div class="controls"><button onclick="runCode('w4_10-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_10-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_10-1">
            <div class="cell-header"><span>[ ] Practice 2: Customizing Ticks</span></div>
            <div class="editor-container" id="editor-w4_10-1"></div>
            <div class="controls"><button onclick="runCode('w4_10-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_10-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_10-2">
            <div class="cell-header"><span>[ ] Practice 3: Customizing Ticks</span></div>
            <div class="editor-container" id="editor-w4_10-2"></div>
            <div class="controls"><button onclick="runCode('w4_10-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_10-2"></div>
        </div>
        
    `,
    'w4_11': `
        <h1>Customizing Matplotlib: Configurations and Stylesheets</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Customizing Matplotlib: Configurations and Stylesheets <a href="https://jakevdp.github.io/PythonDataScienceHandbook/04.11-settings-and-stylesheets.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/04.11-settings-and-stylesheets.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above.</p>
        
        <div class="notebook-cell" id="cell-w4_11-0">
            <div class="cell-header"><span>[ ] Practice 1: Customizing Matplotlib: Configurations and Stylesheets</span></div>
            <div class="editor-container" id="editor-w4_11-0"></div>
            <div class="controls"><button onclick="runCode('w4_11-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_11-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_11-1">
            <div class="cell-header"><span>[ ] Practice 2: Customizing Matplotlib: Configurations and Stylesheets</span></div>
            <div class="editor-container" id="editor-w4_11-1"></div>
            <div class="controls"><button onclick="runCode('w4_11-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_11-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_11-2">
            <div class="cell-header"><span>[ ] Practice 3: Customizing Matplotlib: Configurations and Stylesheets</span></div>
            <div class="editor-container" id="editor-w4_11-2"></div>
            <div class="controls"><button onclick="runCode('w4_11-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_11-2"></div>
        </div>
        
    `,
    'w4_12': `
        <h1>Three-Dimensional Plotting in Matplotlib</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Three-Dimensional Plotting in Matplotlib <a href="https://jakevdp.github.io/PythonDataScienceHandbook/04.12-three-dimensional-plotting.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/04.12-three-dimensional-plotting.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above.</p>
        
        <div class="notebook-cell" id="cell-w4_12-0">
            <div class="cell-header"><span>[ ] Practice 1: Three-Dimensional Plotting in Matplotlib</span></div>
            <div class="editor-container" id="editor-w4_12-0"></div>
            <div class="controls"><button onclick="runCode('w4_12-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_12-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_12-1">
            <div class="cell-header"><span>[ ] Practice 2: Three-Dimensional Plotting in Matplotlib</span></div>
            <div class="editor-container" id="editor-w4_12-1"></div>
            <div class="controls"><button onclick="runCode('w4_12-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_12-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_12-2">
            <div class="cell-header"><span>[ ] Practice 3: Three-Dimensional Plotting in Matplotlib</span></div>
            <div class="editor-container" id="editor-w4_12-2"></div>
            <div class="controls"><button onclick="runCode('w4_12-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_12-2"></div>
        </div>
        
    `,
    'w4_13': `
        <h1>Geographic Data with Basemap</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Geographic Data with Basemap <a href="https://jakevdp.github.io/PythonDataScienceHandbook/04.13-geographic-data-with-basemap.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/04.13-geographic-data-with-basemap.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above.</p>
        
        <div class="notebook-cell" id="cell-w4_13-0">
            <div class="cell-header"><span>[ ] Practice 1: Geographic Data with Basemap</span></div>
            <div class="editor-container" id="editor-w4_13-0"></div>
            <div class="controls"><button onclick="runCode('w4_13-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_13-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_13-1">
            <div class="cell-header"><span>[ ] Practice 2: Geographic Data with Basemap</span></div>
            <div class="editor-container" id="editor-w4_13-1"></div>
            <div class="controls"><button onclick="runCode('w4_13-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_13-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_13-2">
            <div class="cell-header"><span>[ ] Practice 3: Geographic Data with Basemap</span></div>
            <div class="editor-container" id="editor-w4_13-2"></div>
            <div class="controls"><button onclick="runCode('w4_13-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_13-2"></div>
        </div>
        
    `,
    'w4_14': `
        <h1>Visualization with Seaborn</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Visualization with Seaborn <a href="https://jakevdp.github.io/PythonDataScienceHandbook/04.14-visualization-with-seaborn.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/04.14-visualization-with-seaborn.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above.</p>
        
        <div class="notebook-cell" id="cell-w4_14-0">
            <div class="cell-header"><span>[ ] Practice 1: Visualization with Seaborn</span></div>
            <div class="editor-container" id="editor-w4_14-0"></div>
            <div class="controls"><button onclick="runCode('w4_14-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_14-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_14-1">
            <div class="cell-header"><span>[ ] Practice 2: Visualization with Seaborn</span></div>
            <div class="editor-container" id="editor-w4_14-1"></div>
            <div class="controls"><button onclick="runCode('w4_14-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_14-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_14-2">
            <div class="cell-header"><span>[ ] Practice 3: Visualization with Seaborn</span></div>
            <div class="editor-container" id="editor-w4_14-2"></div>
            <div class="controls"><button onclick="runCode('w4_14-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_14-2"></div>
        </div>
        
    `,
    'w4_15': `
        <h1>Further Resources</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Further Resources <a href="https://jakevdp.github.io/PythonDataScienceHandbook/04.15-further-resources.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/04.15-further-resources.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above.</p>
        
        <div class="notebook-cell" id="cell-w4_15-0">
            <div class="cell-header"><span>[ ] Practice 1: Further Resources</span></div>
            <div class="editor-container" id="editor-w4_15-0"></div>
            <div class="controls"><button onclick="runCode('w4_15-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_15-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_15-1">
            <div class="cell-header"><span>[ ] Practice 2: Further Resources</span></div>
            <div class="editor-container" id="editor-w4_15-1"></div>
            <div class="controls"><button onclick="runCode('w4_15-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_15-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_15-2">
            <div class="cell-header"><span>[ ] Practice 3: Further Resources</span></div>
            <div class="editor-container" id="editor-w4_15-2"></div>
            <div class="controls"><button onclick="runCode('w4_15-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_15-2"></div>
        </div>
        
    `,
    'w3_0': `
        <h1>What kind of data does pandas handle?</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">What kind of data does pandas handle? <a href="https://pandas.pydata.org/docs/getting_started/intro_tutorials/01_table_oriented.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://pandas.pydata.org/docs/getting_started/intro_tutorials/01_table_oriented.html"></iframe>
        </div>
        
        <div class="notebook-cell" id="cell-w3_0-0">
            <div class="cell-header"><span>[ ] Practice 1: Pandas</span></div>
            <div class="editor-container" id="editor-w3_0-0"></div>
            <div class="controls"><button onclick="runCode('w3_0-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_0-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_0-1">
            <div class="cell-header"><span>[ ] Practice 2: Pandas</span></div>
            <div class="editor-container" id="editor-w3_0-1"></div>
            <div class="controls"><button onclick="runCode('w3_0-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_0-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_0-2">
            <div class="cell-header"><span>[ ] Practice 3: Pandas</span></div>
            <div class="editor-container" id="editor-w3_0-2"></div>
            <div class="controls"><button onclick="runCode('w3_0-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_0-2"></div>
        </div>
        
    `,
    'w3_1': `
        <h1>How do I read and write tabular data?</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">How do I read and write tabular data? <a href="https://pandas.pydata.org/docs/getting_started/intro_tutorials/02_read_write.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://pandas.pydata.org/docs/getting_started/intro_tutorials/02_read_write.html"></iframe>
        </div>
        
        <div class="notebook-cell" id="cell-w3_1-0">
            <div class="cell-header"><span>[ ] Practice 1: Pandas</span></div>
            <div class="editor-container" id="editor-w3_1-0"></div>
            <div class="controls"><button onclick="runCode('w3_1-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_1-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_1-1">
            <div class="cell-header"><span>[ ] Practice 2: Pandas</span></div>
            <div class="editor-container" id="editor-w3_1-1"></div>
            <div class="controls"><button onclick="runCode('w3_1-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_1-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_1-2">
            <div class="cell-header"><span>[ ] Practice 3: Pandas</span></div>
            <div class="editor-container" id="editor-w3_1-2"></div>
            <div class="controls"><button onclick="runCode('w3_1-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_1-2"></div>
        </div>
        
    `,
    'w3_2': `
        <h1>How do I select a subset of a DataFrame?</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">How do I select a subset of a DataFrame? <a href="https://pandas.pydata.org/docs/getting_started/intro_tutorials/03_subset_data.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://pandas.pydata.org/docs/getting_started/intro_tutorials/03_subset_data.html"></iframe>
        </div>
        
        <div class="notebook-cell" id="cell-w3_2-0">
            <div class="cell-header"><span>[ ] Practice 1: Pandas</span></div>
            <div class="editor-container" id="editor-w3_2-0"></div>
            <div class="controls"><button onclick="runCode('w3_2-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_2-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_2-1">
            <div class="cell-header"><span>[ ] Practice 2: Pandas</span></div>
            <div class="editor-container" id="editor-w3_2-1"></div>
            <div class="controls"><button onclick="runCode('w3_2-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_2-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_2-2">
            <div class="cell-header"><span>[ ] Practice 3: Pandas</span></div>
            <div class="editor-container" id="editor-w3_2-2"></div>
            <div class="controls"><button onclick="runCode('w3_2-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_2-2"></div>
        </div>
        
    `,
    'w3_3': `
        <h1>How do I create plots in pandas?</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">How do I create plots in pandas? <a href="https://pandas.pydata.org/docs/getting_started/intro_tutorials/04_plotting.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://pandas.pydata.org/docs/getting_started/intro_tutorials/04_plotting.html"></iframe>
        </div>
        
        <div class="notebook-cell" id="cell-w3_3-0">
            <div class="cell-header"><span>[ ] Practice 1: Pandas</span></div>
            <div class="editor-container" id="editor-w3_3-0"></div>
            <div class="controls"><button onclick="runCode('w3_3-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_3-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_3-1">
            <div class="cell-header"><span>[ ] Practice 2: Pandas</span></div>
            <div class="editor-container" id="editor-w3_3-1"></div>
            <div class="controls"><button onclick="runCode('w3_3-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_3-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_3-2">
            <div class="cell-header"><span>[ ] Practice 3: Pandas</span></div>
            <div class="editor-container" id="editor-w3_3-2"></div>
            <div class="controls"><button onclick="runCode('w3_3-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_3-2"></div>
        </div>
        
    `,
    'w3_4': `
        <h1>How to create new columns derived from existing columns</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">How to create new columns derived from existing columns <a href="https://pandas.pydata.org/docs/getting_started/intro_tutorials/05_add_columns.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://pandas.pydata.org/docs/getting_started/intro_tutorials/05_add_columns.html"></iframe>
        </div>
        
        <div class="notebook-cell" id="cell-w3_4-0">
            <div class="cell-header"><span>[ ] Practice 1: Pandas</span></div>
            <div class="editor-container" id="editor-w3_4-0"></div>
            <div class="controls"><button onclick="runCode('w3_4-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_4-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_4-1">
            <div class="cell-header"><span>[ ] Practice 2: Pandas</span></div>
            <div class="editor-container" id="editor-w3_4-1"></div>
            <div class="controls"><button onclick="runCode('w3_4-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_4-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_4-2">
            <div class="cell-header"><span>[ ] Practice 3: Pandas</span></div>
            <div class="editor-container" id="editor-w3_4-2"></div>
            <div class="controls"><button onclick="runCode('w3_4-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_4-2"></div>
        </div>
        
    `,
    'w3_5': `
        <h1>How to calculate summary statistics</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">How to calculate summary statistics <a href="https://pandas.pydata.org/docs/getting_started/intro_tutorials/06_calculate_statistics.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://pandas.pydata.org/docs/getting_started/intro_tutorials/06_calculate_statistics.html"></iframe>
        </div>
        
        <div class="notebook-cell" id="cell-w3_5-0">
            <div class="cell-header"><span>[ ] Practice 1: Pandas</span></div>
            <div class="editor-container" id="editor-w3_5-0"></div>
            <div class="controls"><button onclick="runCode('w3_5-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_5-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_5-1">
            <div class="cell-header"><span>[ ] Practice 2: Pandas</span></div>
            <div class="editor-container" id="editor-w3_5-1"></div>
            <div class="controls"><button onclick="runCode('w3_5-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_5-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_5-2">
            <div class="cell-header"><span>[ ] Practice 3: Pandas</span></div>
            <div class="editor-container" id="editor-w3_5-2"></div>
            <div class="controls"><button onclick="runCode('w3_5-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_5-2"></div>
        </div>
        
    `,
    'w3_6': `
        <h1>How to reshape the layout of tables</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">How to reshape the layout of tables <a href="https://pandas.pydata.org/docs/getting_started/intro_tutorials/07_reshape_table_layout.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://pandas.pydata.org/docs/getting_started/intro_tutorials/07_reshape_table_layout.html"></iframe>
        </div>
        
        <div class="notebook-cell" id="cell-w3_6-0">
            <div class="cell-header"><span>[ ] Practice 1: Pandas</span></div>
            <div class="editor-container" id="editor-w3_6-0"></div>
            <div class="controls"><button onclick="runCode('w3_6-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_6-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_6-1">
            <div class="cell-header"><span>[ ] Practice 2: Pandas</span></div>
            <div class="editor-container" id="editor-w3_6-1"></div>
            <div class="controls"><button onclick="runCode('w3_6-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_6-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_6-2">
            <div class="cell-header"><span>[ ] Practice 3: Pandas</span></div>
            <div class="editor-container" id="editor-w3_6-2"></div>
            <div class="controls"><button onclick="runCode('w3_6-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_6-2"></div>
        </div>
        
    `,
    'w3_7': `
        <h1>How to combine data from multiple tables</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">How to combine data from multiple tables <a href="https://pandas.pydata.org/docs/getting_started/intro_tutorials/08_combine_dataframes.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://pandas.pydata.org/docs/getting_started/intro_tutorials/08_combine_dataframes.html"></iframe>
        </div>
        
        <div class="notebook-cell" id="cell-w3_7-0">
            <div class="cell-header"><span>[ ] Practice 1: Pandas</span></div>
            <div class="editor-container" id="editor-w3_7-0"></div>
            <div class="controls"><button onclick="runCode('w3_7-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_7-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_7-1">
            <div class="cell-header"><span>[ ] Practice 2: Pandas</span></div>
            <div class="editor-container" id="editor-w3_7-1"></div>
            <div class="controls"><button onclick="runCode('w3_7-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_7-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_7-2">
            <div class="cell-header"><span>[ ] Practice 3: Pandas</span></div>
            <div class="editor-container" id="editor-w3_7-2"></div>
            <div class="controls"><button onclick="runCode('w3_7-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_7-2"></div>
        </div>
        
    `,
    'w3_8': `
        <h1>How to handle time series data with ease</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">How to handle time series data with ease <a href="https://pandas.pydata.org/docs/getting_started/intro_tutorials/09_timeseries.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://pandas.pydata.org/docs/getting_started/intro_tutorials/09_timeseries.html"></iframe>
        </div>
        
        <div class="notebook-cell" id="cell-w3_8-0">
            <div class="cell-header"><span>[ ] Practice 1: Pandas</span></div>
            <div class="editor-container" id="editor-w3_8-0"></div>
            <div class="controls"><button onclick="runCode('w3_8-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_8-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_8-1">
            <div class="cell-header"><span>[ ] Practice 2: Pandas</span></div>
            <div class="editor-container" id="editor-w3_8-1"></div>
            <div class="controls"><button onclick="runCode('w3_8-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_8-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_8-2">
            <div class="cell-header"><span>[ ] Practice 3: Pandas</span></div>
            <div class="editor-container" id="editor-w3_8-2"></div>
            <div class="controls"><button onclick="runCode('w3_8-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_8-2"></div>
        </div>
        
    `,
    'p5_monitoring': `
        <h1>Google ML: Production Monitoring</h1>
        <p>Google blocks embedding their crash course directly on other websites. Please click the button below to read the chapter in a new tab, then return here to continue your pipeline!</p>
        <div style="text-align: center;">
            <a href="https://developers.google.com/machine-learning/crash-course/production-ml-systems/monitoring" target="_blank" class="external-link-btn">Read: Production ML Systems</a>
        </div>
    `,
    'w6_0': `
        <h1>Getting Started with Scikit-learn</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Getting Started with Scikit-learn <a href="https://scikit-learn.org/stable/getting_started.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://scikit-learn.org/stable/getting_started.html"></iframe>
        </div>
        
        <div class="notebook-cell" id="cell-w6_0-0">
            <div class="cell-header"><span>[ ] Practice 1: Scikit-learn</span></div>
            <div class="editor-container" id="editor-w6_0-0"></div>
            <div class="controls"><button onclick="runCode('w6_0-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w6_0-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w6_0-1">
            <div class="cell-header"><span>[ ] Practice 2: Scikit-learn</span></div>
            <div class="editor-container" id="editor-w6_0-1"></div>
            <div class="controls"><button onclick="runCode('w6_0-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w6_0-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w6_0-2">
            <div class="cell-header"><span>[ ] Practice 3: Scikit-learn</span></div>
            <div class="editor-container" id="editor-w6_0-2"></div>
            <div class="controls"><button onclick="runCode('w6_0-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w6_0-2"></div>
        </div>
        
    `,
    'w6_1': `
        <h1>Pipeline Documentation</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Pipeline Documentation <a href="https://scikit-learn.org/stable/modules/generated/sklearn.pipeline.Pipeline.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://scikit-learn.org/stable/modules/generated/sklearn.pipeline.Pipeline.html"></iframe>
        </div>
        
        <div class="notebook-cell" id="cell-w6_1-0">
            <div class="cell-header"><span>[ ] Practice 1: Scikit-learn</span></div>
            <div class="editor-container" id="editor-w6_1-0"></div>
            <div class="controls"><button onclick="runCode('w6_1-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w6_1-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w6_1-1">
            <div class="cell-header"><span>[ ] Practice 2: Scikit-learn</span></div>
            <div class="editor-container" id="editor-w6_1-1"></div>
            <div class="controls"><button onclick="runCode('w6_1-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w6_1-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w6_1-2">
            <div class="cell-header"><span>[ ] Practice 3: Scikit-learn</span></div>
            <div class="editor-container" id="editor-w6_1-2"></div>
            <div class="controls"><button onclick="runCode('w6_1-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w6_1-2"></div>
        </div>
        
    `,
    'w6_2': `
        <h1>ColumnTransformer Documentation</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">ColumnTransformer Documentation <a href="https://scikit-learn.org/stable/modules/generated/sklearn.compose.ColumnTransformer.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://scikit-learn.org/stable/modules/generated/sklearn.compose.ColumnTransformer.html"></iframe>
        </div>
        
        <div class="notebook-cell" id="cell-w6_2-0">
            <div class="cell-header"><span>[ ] Practice 1: Scikit-learn</span></div>
            <div class="editor-container" id="editor-w6_2-0"></div>
            <div class="controls"><button onclick="runCode('w6_2-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w6_2-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w6_2-1">
            <div class="cell-header"><span>[ ] Practice 2: Scikit-learn</span></div>
            <div class="editor-container" id="editor-w6_2-1"></div>
            <div class="controls"><button onclick="runCode('w6_2-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w6_2-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w6_2-2">
            <div class="cell-header"><span>[ ] Practice 3: Scikit-learn</span></div>
            <div class="editor-container" id="editor-w6_2-2"></div>
            <div class="controls"><button onclick="runCode('w6_2-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w6_2-2"></div>
        </div>
        
    `,
    'w6_3': `
        <h1>Preprocessing Data</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Preprocessing Data <a href="https://scikit-learn.org/stable/modules/preprocessing.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://scikit-learn.org/stable/modules/preprocessing.html"></iframe>
        </div>
        
        <div class="notebook-cell" id="cell-w6_3-0">
            <div class="cell-header"><span>[ ] Practice 1: Scikit-learn</span></div>
            <div class="editor-container" id="editor-w6_3-0"></div>
            <div class="controls"><button onclick="runCode('w6_3-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w6_3-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w6_3-1">
            <div class="cell-header"><span>[ ] Practice 2: Scikit-learn</span></div>
            <div class="editor-container" id="editor-w6_3-1"></div>
            <div class="controls"><button onclick="runCode('w6_3-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w6_3-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w6_3-2">
            <div class="cell-header"><span>[ ] Practice 3: Scikit-learn</span></div>
            <div class="editor-container" id="editor-w6_3-2"></div>
            <div class="controls"><button onclick="runCode('w6_3-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w6_3-2"></div>
        </div>
        
    `,
    'w6_4': `
        <h1>Train Test Split</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Train Test Split <a href="https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.train_test_split.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.train_test_split.html"></iframe>
        </div>
        
        <div class="notebook-cell" id="cell-w6_4-0">
            <div class="cell-header"><span>[ ] Practice 1: Scikit-learn</span></div>
            <div class="editor-container" id="editor-w6_4-0"></div>
            <div class="controls"><button onclick="runCode('w6_4-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w6_4-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w6_4-1">
            <div class="cell-header"><span>[ ] Practice 2: Scikit-learn</span></div>
            <div class="editor-container" id="editor-w6_4-1"></div>
            <div class="controls"><button onclick="runCode('w6_4-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w6_4-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w6_4-2">
            <div class="cell-header"><span>[ ] Practice 3: Scikit-learn</span></div>
            <div class="editor-container" id="editor-w6_4-2"></div>
            <div class="controls"><button onclick="runCode('w6_4-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w6_4-2"></div>
        </div>
        
    `
};

const initialCode = {
    'git-1': `# Simulate bash command via python\nimport os\n\n# TODO: Run 'git status' using os.system()\nos.system('echo Git is ready!')`,    'w2_00-0': `# Easy: 2. Introduction to NumPy
# Scenario: E-Commerce Sales
import numpy as np

# 1. Write a basic implementation of the core concept from the reading.
# 2. Print the result.
`,    'w2_00-1': `# Intermediate: 2. Introduction to NumPy
# Scenario: E-Commerce Sales
import numpy as np

# 1. Create a 2D array and apply the concept across axes.
`,    'w2_00-2': `# Complex: 2. Introduction to NumPy
# Scenario: E-Commerce Sales
import numpy as np

# 1. Combine this concept with a boolean mask and argsort.
`,    'w2_01-0': `# Easy: Understanding Array Types
# Scenario: Employee HR System
import numpy as np

# Data Setup
prices = [10.5, 20.0, "30.5", 40.0, 50.5]

# 1. Convert \`prices\` to a NumPy array of type float32.
# 2. Print the shape, ndim, dtype, and itemsize of the array.
# 3. Create a 3x3 array of zeros of type int8.
`,    'w2_01-1': `# Intermediate: Indexing and Slicing
# Scenario: Employee HR System
import numpy as np

# Data Setup
rng = np.random.default_rng(2026)
matrix = rng.integers(1, 100, size=(5, 5))

# 1. Print the original 5x5 matrix.
# 2. Extract the first row and the last column.
# 3. Extract a 2x2 sub-matrix from the top-right corner.
# 4. Reverse the order of the rows in the matrix.
`,    'w2_01-2': `# Complex: Reshaping and Copies
# Scenario: Employee HR System
import numpy as np

# Data Setup
raw_stream = np.arange(1, 37)

# 1. Reshape \`raw_stream\` into a 3D array of shape (3, 4, 3) representing (days, hours, sensors).
# 2. Extract the data for the second day (index 1).
# 3. Create a completely independent copy (not a view) of the first day's data.
# 4. Modify a value in the copy and prove the original \`raw_stream\` is unchanged.
`,    'w2_02-0': `# Easy: Understanding Array Types
# Scenario: Employee HR System
import numpy as np

# Data Setup
prices = [10.5, 20.0, "30.5", 40.0, 50.5]

# 1. Convert \`prices\` to a NumPy array of type float32.
# 2. Print the shape, ndim, dtype, and itemsize of the array.
# 3. Create a 3x3 array of zeros of type int8.
`,    'w2_02-1': `# Intermediate: Indexing and Slicing
# Scenario: Employee HR System
import numpy as np

# Data Setup
rng = np.random.default_rng(2026)
matrix = rng.integers(1, 100, size=(5, 5))

# 1. Print the original 5x5 matrix.
# 2. Extract the first row and the last column.
# 3. Extract a 2x2 sub-matrix from the top-right corner.
# 4. Reverse the order of the rows in the matrix.
`,    'w2_02-2': `# Complex: Reshaping and Copies
# Scenario: Employee HR System
import numpy as np

# Data Setup
raw_stream = np.arange(1, 37)

# 1. Reshape \`raw_stream\` into a 3D array of shape (3, 4, 3) representing (days, hours, sensors).
# 2. Extract the data for the second day (index 1).
# 3. Create a completely independent copy (not a view) of the first day's data.
# 4. Modify a value in the copy and prove the original \`raw_stream\` is unchanged.
`,    'w2_03-0': `# Easy: Vectorized Arithmetic
# Scenario: Employee HR System
import numpy as np

# Data Setup
base_values = np.array([100, 200, 300, 400, 500])
multiplier = 1.15

# 1. Multiply all base_values by the multiplier without using loops.
# 2. Add 50 to the result.
# 3. Round the final values to 1 decimal place using np.round.
`,    'w2_03-1': `# Intermediate: Ufuncs and Broadcasting
# Scenario: Employee HR System
import numpy as np

# Data Setup
matrix = np.array([[10, 20], [30, 40], [50, 60]]) # shape (3,2)
vector = np.array([1, 2]) # shape (2,)

# 1. Add the vector to the matrix (Broadcasting).
# 2. Compute the natural logarithm (np.log) of the resulting matrix.
# 3. Explain in a comment how broadcasting matched the shapes.
`,    'w2_03-2': `# Complex: Advanced Ufuncs
# Scenario: Employee HR System
import numpy as np

# Data Setup
rng = np.random.default_rng(42)
x = rng.uniform(1, 10, size=100)

# 1. Use np.power to square every element in x.
# 2. Use np.sin and np.cos to compute sin(x)^2 + cos(x)^2.
# 3. Assert or verify that all results in step 2 are exactly (or extremely close to) 1.0.
# 4. Find the sum of all elements using np.add.reduce.
`,    'w2_04-0': `# Easy: Simple Aggregations
# Scenario: E-Commerce Sales
import numpy as np

# Data Setup
scores = np.array([75, 88, 92, 60, 100, 85, 77, 95])

# 1. Find the min, max, and mean of the scores.
# 2. Find the index of the highest score using np.argmax.
# 3. Find the median score using np.median.
`,    'w2_04-1': `# Intermediate: Axis Aggregations
# Scenario: E-Commerce Sales
import numpy as np

# Data Setup
# Rows are students, columns are 3 different exams
results = np.array([
    [85, 90, 88],
    [70, 75, np.nan],
    [95, 98, 100],
    [60, np.nan, 62]
])

# 1. Calculate the mean score for each student (axis=1). Notice what NaN does.
# 2. Use np.nanmean to calculate the mean score for each student while ignoring NaNs.
# 3. Find the maximum score achieved on each exam (axis=0) using np.nanmax.
`,    'w2_04-2': `# Complex: Multi-dimensional Aggregations
# Scenario: E-Commerce Sales
import numpy as np

# Data Setup
rng = np.random.default_rng(99)
# shape (4 weeks, 5 days, 8 hours)
data_3d = rng.integers(10, 50, size=(4, 5, 8))

# 1. Find the total sum of all elements.
# 2. Find the maximum value for each week (reduce across days and hours).
# 3. Find the average value for each hour of the day (average across weeks and days).
# 4. Verify the shape of the result from step 3 is (8,).
`,    'w2_05-0': `# Easy: Vectorized Arithmetic
# Scenario: Employee HR System
import numpy as np

# Data Setup
base_values = np.array([100, 200, 300, 400, 500])
multiplier = 1.15

# 1. Multiply all base_values by the multiplier without using loops.
# 2. Add 50 to the result.
# 3. Round the final values to 1 decimal place using np.round.
`,    'w2_05-1': `# Intermediate: Ufuncs and Broadcasting
# Scenario: Employee HR System
import numpy as np

# Data Setup
matrix = np.array([[10, 20], [30, 40], [50, 60]]) # shape (3,2)
vector = np.array([1, 2]) # shape (2,)

# 1. Add the vector to the matrix (Broadcasting).
# 2. Compute the natural logarithm (np.log) of the resulting matrix.
# 3. Explain in a comment how broadcasting matched the shapes.
`,    'w2_05-2': `# Complex: Advanced Ufuncs
# Scenario: Employee HR System
import numpy as np

# Data Setup
rng = np.random.default_rng(42)
x = rng.uniform(1, 10, size=100)

# 1. Use np.power to square every element in x.
# 2. Use np.sin and np.cos to compute sin(x)^2 + cos(x)^2.
# 3. Assert or verify that all results in step 2 are exactly (or extremely close to) 1.0.
# 4. Find the sum of all elements using np.add.reduce.
`,    'w2_06-0': `# Easy: Boolean Masks
# Scenario: Employee HR System
import numpy as np

# Data Setup
ages = np.array([12, 18, 25, 30, 15, 45, 10, 60])

# 1. Create a boolean mask for ages >= 18.
# 2. Print the mask itself.
# 3. Use the mask to extract and print only the adult ages.
`,    'w2_06-1': `# Intermediate: Compound Logic
# Scenario: Employee HR System
import numpy as np

# Data Setup
rng = np.random.default_rng(42)
temps = rng.integers(-10, 40, size=20)

# 1. Create a mask for temperatures that are "comfortable": between 15 and 25 inclusive.
# 2. Use the mask to extract the comfortable temperatures.
# 3. Count how many comfortable temperatures there are using np.sum() or np.count_nonzero().
# 4. Use bitwise OR (|) to find temperatures that are extreme (<-5 OR >35).
`,    'w2_06-2': `# Complex: np.where and Conditional Assignment
# Scenario: Employee HR System
import numpy as np

# Data Setup
rng = np.random.default_rng(2026)
values = rng.normal(100, 20, size=50)

# 1. Use np.where to create a new array: if value > 120, set to "High", else "Normal".
# 2. Replace all values in the original array that are negative with 0 (using boolean indexing).
# 3. Use np.clip to restrict the array values to a minimum of 50 and maximum of 150.
# 4. Print the final cleaned array.
`,    'w2_07-0': `# Easy: Fancy Indexing 1D
# Scenario: Employee HR System
import numpy as np

# Data Setup
items = np.array(["A", "B", "C", "D", "E", "F", "G"])
indices = [0, 3, 5]

# 1. Use the \`indices\` list to extract elements "A", "D", and "F" in one operation.
# 2. Create a new index array \`[5, 5, 5]\` and use it to extract "F" three times.
`,    'w2_07-1': `# Intermediate: Fancy Indexing 2D
# Scenario: Employee HR System
import numpy as np

# Data Setup
matrix = np.arange(25).reshape(5, 5)

# 1. Extract the elements at coordinates (0,1), (2,3), and (4,4) using two arrays of indices.
# 2. Extract the entire 1st and 3rd rows using fancy indexing.
# 3. Reorder the columns of the matrix to be in the order: 4, 3, 2, 1, 0.
`,    'w2_07-2': `# Complex: Combined Indexing
# Scenario: Employee HR System
import numpy as np

# Data Setup
rng = np.random.default_rng(123)
data = rng.integers(0, 100, size=(6, 6))

# 1. Combine fancy indexing and slicing: Extract rows [0, 2, 4] and columns 1 through 3.
# 2. Combine fancy indexing and masking: Select rows [1, 3, 5], then keep only values > 50.
# 3. Modify the original matrix: set all elements at coordinates (1,1), (2,2), (3,3) to 999.
`,    'w2_08-0': `# Easy: Basic Sorting
# Scenario: IoT Sensor Network
import numpy as np

# Data Setup
rng = np.random.default_rng(42)
unsorted_data = rng.integers(1, 100, size=10)

# 1. Use np.sort() to return a sorted copy of the data.
# 2. Call the .sort() method on the array to sort it in-place.
# 3. Verify the array is sorted.
`,    'w2_08-1': `# Intermediate: argsort
# Scenario: IoT Sensor Network
import numpy as np

# Data Setup
names = np.array(["Ari", "Bataa", "Caraa", "Davaa"])
scores = np.array([85, 92, 78, 88])

# 1. Use np.argsort() on the \`scores\` array to get the sorted indices.
# 2. Use those indices to print the \`names\` array in order of lowest to highest score.
# 3. Reverse the indices to print the names from highest to lowest score.
`,    'w2_08-2': `# Complex: Multi-dimensional Sorting
# Scenario: IoT Sensor Network
import numpy as np

# Data Setup
rng = np.random.default_rng(2026)
matrix = rng.integers(0, 50, size=(5, 4))

# 1. Sort each column of the matrix independently (axis=0).
# 2. Sort each row of the matrix independently (axis=1).
# 3. Given the matrix, sort the entire matrix ROWS based entirely on the values in the 2nd column.
#    (Hint: Use argsort on the 2nd column, then fancy index the rows).
`,    'w2_09-0': `# Easy: Structured Data: NumPy's Structured Arrays
# Scenario: IoT Sensor Network
import numpy as np

# 1. Write a basic implementation of the core concept from the reading.
# 2. Print the result.
`,    'w2_09-1': `# Intermediate: Structured Data: NumPy's Structured Arrays
# Scenario: IoT Sensor Network
import numpy as np

# 1. Create a 2D array and apply the concept across axes.
`,    'w2_09-2': `# Complex: Structured Data: NumPy's Structured Arrays
# Scenario: IoT Sensor Network
import numpy as np

# 1. Combine this concept with a boolean mask and argsort.
`,    'w4_00-0': `# Easy: Matplotlib Basics
# Scenario: Employee HR System
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display in this terminal sandbox, but write the correct code.
# 1. Create x = np.arange(10) and y = x ** 2
# 2. Write the code to plot x vs y.
# 3. Add a title and x/y labels.
print("Write the plotting code!")
`,    'w4_00-1': `# Intermediate: Subplots
# Scenario: Employee HR System
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display.
# 1. Use plt.subplots(1, 2) to create a figure with two side-by-side axes.
# 2. Plot sin(x) on the first axis and cos(x) on the second axis.
print("Write the plotting code!")
`,    'w4_00-2': `# Complex: Customizations
# Scenario: Employee HR System
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display.
# 1. Create a scatter plot of 100 random points.
# 2. Color the points based on a third array of random values.
# 3. Add a colorbar and a legend.
print("Write the plotting code!")
`,    'w4_01-0': `# Easy: Matplotlib Basics
# Scenario: Employee HR System
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display in this terminal sandbox, but write the correct code.
# 1. Create x = np.arange(10) and y = x ** 2
# 2. Write the code to plot x vs y.
# 3. Add a title and x/y labels.
print("Write the plotting code!")
`,    'w4_01-1': `# Intermediate: Subplots
# Scenario: Employee HR System
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display.
# 1. Use plt.subplots(1, 2) to create a figure with two side-by-side axes.
# 2. Plot sin(x) on the first axis and cos(x) on the second axis.
print("Write the plotting code!")
`,    'w4_01-2': `# Complex: Customizations
# Scenario: Employee HR System
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display.
# 1. Create a scatter plot of 100 random points.
# 2. Color the points based on a third array of random values.
# 3. Add a colorbar and a legend.
print("Write the plotting code!")
`,    'w4_02-0': `# Easy: Matplotlib Basics
# Scenario: Employee HR System
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display in this terminal sandbox, but write the correct code.
# 1. Create x = np.arange(10) and y = x ** 2
# 2. Write the code to plot x vs y.
# 3. Add a title and x/y labels.
print("Write the plotting code!")
`,    'w4_02-1': `# Intermediate: Subplots
# Scenario: Employee HR System
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display.
# 1. Use plt.subplots(1, 2) to create a figure with two side-by-side axes.
# 2. Plot sin(x) on the first axis and cos(x) on the second axis.
print("Write the plotting code!")
`,    'w4_02-2': `# Complex: Customizations
# Scenario: Employee HR System
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display.
# 1. Create a scatter plot of 100 random points.
# 2. Color the points based on a third array of random values.
# 3. Add a colorbar and a legend.
print("Write the plotting code!")
`,    'w4_03-0': `# Easy: Matplotlib Basics
# Scenario: E-Commerce Sales
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display in this terminal sandbox, but write the correct code.
# 1. Create x = np.arange(10) and y = x ** 2
# 2. Write the code to plot x vs y.
# 3. Add a title and x/y labels.
print("Write the plotting code!")
`,    'w4_03-1': `# Intermediate: Subplots
# Scenario: E-Commerce Sales
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display.
# 1. Use plt.subplots(1, 2) to create a figure with two side-by-side axes.
# 2. Plot sin(x) on the first axis and cos(x) on the second axis.
print("Write the plotting code!")
`,    'w4_03-2': `# Complex: Customizations
# Scenario: E-Commerce Sales
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display.
# 1. Create a scatter plot of 100 random points.
# 2. Color the points based on a third array of random values.
# 3. Add a colorbar and a legend.
print("Write the plotting code!")
`,    'w4_04-0': `# Easy: Matplotlib Basics
# Scenario: Employee HR System
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display in this terminal sandbox, but write the correct code.
# 1. Create x = np.arange(10) and y = x ** 2
# 2. Write the code to plot x vs y.
# 3. Add a title and x/y labels.
print("Write the plotting code!")
`,    'w4_04-1': `# Intermediate: Subplots
# Scenario: Employee HR System
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display.
# 1. Use plt.subplots(1, 2) to create a figure with two side-by-side axes.
# 2. Plot sin(x) on the first axis and cos(x) on the second axis.
print("Write the plotting code!")
`,    'w4_04-2': `# Complex: Customizations
# Scenario: Employee HR System
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display.
# 1. Create a scatter plot of 100 random points.
# 2. Color the points based on a third array of random values.
# 3. Add a colorbar and a legend.
print("Write the plotting code!")
`,    'w4_05-0': `# Easy: Matplotlib Basics
# Scenario: IoT Sensor Network
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display in this terminal sandbox, but write the correct code.
# 1. Create x = np.arange(10) and y = x ** 2
# 2. Write the code to plot x vs y.
# 3. Add a title and x/y labels.
print("Write the plotting code!")
`,    'w4_05-1': `# Intermediate: Subplots
# Scenario: IoT Sensor Network
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display.
# 1. Use plt.subplots(1, 2) to create a figure with two side-by-side axes.
# 2. Plot sin(x) on the first axis and cos(x) on the second axis.
print("Write the plotting code!")
`,    'w4_05-2': `# Complex: Customizations
# Scenario: IoT Sensor Network
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display.
# 1. Create a scatter plot of 100 random points.
# 2. Color the points based on a third array of random values.
# 3. Add a colorbar and a legend.
print("Write the plotting code!")
`,    'w4_06-0': `# Easy: Matplotlib Basics
# Scenario: IoT Sensor Network
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display in this terminal sandbox, but write the correct code.
# 1. Create x = np.arange(10) and y = x ** 2
# 2. Write the code to plot x vs y.
# 3. Add a title and x/y labels.
print("Write the plotting code!")
`,    'w4_06-1': `# Intermediate: Subplots
# Scenario: IoT Sensor Network
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display.
# 1. Use plt.subplots(1, 2) to create a figure with two side-by-side axes.
# 2. Plot sin(x) on the first axis and cos(x) on the second axis.
print("Write the plotting code!")
`,    'w4_06-2': `# Complex: Customizations
# Scenario: IoT Sensor Network
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display.
# 1. Create a scatter plot of 100 random points.
# 2. Color the points based on a third array of random values.
# 3. Add a colorbar and a legend.
print("Write the plotting code!")
`,    'w4_07-0': `# Easy: Matplotlib Basics
# Scenario: IoT Sensor Network
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display in this terminal sandbox, but write the correct code.
# 1. Create x = np.arange(10) and y = x ** 2
# 2. Write the code to plot x vs y.
# 3. Add a title and x/y labels.
print("Write the plotting code!")
`,    'w4_07-1': `# Intermediate: Subplots
# Scenario: IoT Sensor Network
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display.
# 1. Use plt.subplots(1, 2) to create a figure with two side-by-side axes.
# 2. Plot sin(x) on the first axis and cos(x) on the second axis.
print("Write the plotting code!")
`,    'w4_07-2': `# Complex: Customizations
# Scenario: IoT Sensor Network
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display.
# 1. Create a scatter plot of 100 random points.
# 2. Color the points based on a third array of random values.
# 3. Add a colorbar and a legend.
print("Write the plotting code!")
`,    'w4_08-0': `# Easy: Matplotlib Basics
# Scenario: E-Commerce Sales
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display in this terminal sandbox, but write the correct code.
# 1. Create x = np.arange(10) and y = x ** 2
# 2. Write the code to plot x vs y.
# 3. Add a title and x/y labels.
print("Write the plotting code!")
`,    'w4_08-1': `# Intermediate: Subplots
# Scenario: E-Commerce Sales
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display.
# 1. Use plt.subplots(1, 2) to create a figure with two side-by-side axes.
# 2. Plot sin(x) on the first axis and cos(x) on the second axis.
print("Write the plotting code!")
`,    'w4_08-2': `# Complex: Customizations
# Scenario: E-Commerce Sales
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display.
# 1. Create a scatter plot of 100 random points.
# 2. Color the points based on a third array of random values.
# 3. Add a colorbar and a legend.
print("Write the plotting code!")
`,    'w4_09-0': `# Easy: Matplotlib Basics
# Scenario: IoT Sensor Network
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display in this terminal sandbox, but write the correct code.
# 1. Create x = np.arange(10) and y = x ** 2
# 2. Write the code to plot x vs y.
# 3. Add a title and x/y labels.
print("Write the plotting code!")
`,    'w4_09-1': `# Intermediate: Subplots
# Scenario: IoT Sensor Network
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display.
# 1. Use plt.subplots(1, 2) to create a figure with two side-by-side axes.
# 2. Plot sin(x) on the first axis and cos(x) on the second axis.
print("Write the plotting code!")
`,    'w4_09-2': `# Complex: Customizations
# Scenario: IoT Sensor Network
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display.
# 1. Create a scatter plot of 100 random points.
# 2. Color the points based on a third array of random values.
# 3. Add a colorbar and a legend.
print("Write the plotting code!")
`,    'w4_10-0': `# Easy: Matplotlib Basics
# Scenario: IoT Sensor Network
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display in this terminal sandbox, but write the correct code.
# 1. Create x = np.arange(10) and y = x ** 2
# 2. Write the code to plot x vs y.
# 3. Add a title and x/y labels.
print("Write the plotting code!")
`,    'w4_10-1': `# Intermediate: Subplots
# Scenario: IoT Sensor Network
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display.
# 1. Use plt.subplots(1, 2) to create a figure with two side-by-side axes.
# 2. Plot sin(x) on the first axis and cos(x) on the second axis.
print("Write the plotting code!")
`,    'w4_10-2': `# Complex: Customizations
# Scenario: IoT Sensor Network
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display.
# 1. Create a scatter plot of 100 random points.
# 2. Color the points based on a third array of random values.
# 3. Add a colorbar and a legend.
print("Write the plotting code!")
`,    'w4_11-0': `# Easy: Matplotlib Basics
# Scenario: IoT Sensor Network
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display in this terminal sandbox, but write the correct code.
# 1. Create x = np.arange(10) and y = x ** 2
# 2. Write the code to plot x vs y.
# 3. Add a title and x/y labels.
print("Write the plotting code!")
`,    'w4_11-1': `# Intermediate: Subplots
# Scenario: IoT Sensor Network
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display.
# 1. Use plt.subplots(1, 2) to create a figure with two side-by-side axes.
# 2. Plot sin(x) on the first axis and cos(x) on the second axis.
print("Write the plotting code!")
`,    'w4_11-2': `# Complex: Customizations
# Scenario: IoT Sensor Network
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display.
# 1. Create a scatter plot of 100 random points.
# 2. Color the points based on a third array of random values.
# 3. Add a colorbar and a legend.
print("Write the plotting code!")
`,    'w4_12-0': `# Easy: Matplotlib Basics
# Scenario: Employee HR System
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display in this terminal sandbox, but write the correct code.
# 1. Create x = np.arange(10) and y = x ** 2
# 2. Write the code to plot x vs y.
# 3. Add a title and x/y labels.
print("Write the plotting code!")
`,    'w4_12-1': `# Intermediate: Subplots
# Scenario: Employee HR System
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display.
# 1. Use plt.subplots(1, 2) to create a figure with two side-by-side axes.
# 2. Plot sin(x) on the first axis and cos(x) on the second axis.
print("Write the plotting code!")
`,    'w4_12-2': `# Complex: Customizations
# Scenario: Employee HR System
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display.
# 1. Create a scatter plot of 100 random points.
# 2. Color the points based on a third array of random values.
# 3. Add a colorbar and a legend.
print("Write the plotting code!")
`,    'w4_13-0': `# Easy: Matplotlib Basics
# Scenario: E-Commerce Sales
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display in this terminal sandbox, but write the correct code.
# 1. Create x = np.arange(10) and y = x ** 2
# 2. Write the code to plot x vs y.
# 3. Add a title and x/y labels.
print("Write the plotting code!")
`,    'w4_13-1': `# Intermediate: Subplots
# Scenario: E-Commerce Sales
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display.
# 1. Use plt.subplots(1, 2) to create a figure with two side-by-side axes.
# 2. Plot sin(x) on the first axis and cos(x) on the second axis.
print("Write the plotting code!")
`,    'w4_13-2': `# Complex: Customizations
# Scenario: E-Commerce Sales
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display.
# 1. Create a scatter plot of 100 random points.
# 2. Color the points based on a third array of random values.
# 3. Add a colorbar and a legend.
print("Write the plotting code!")
`,    'w4_14-0': `# Easy: Matplotlib Basics
# Scenario: Employee HR System
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display in this terminal sandbox, but write the correct code.
# 1. Create x = np.arange(10) and y = x ** 2
# 2. Write the code to plot x vs y.
# 3. Add a title and x/y labels.
print("Write the plotting code!")
`,    'w4_14-1': `# Intermediate: Subplots
# Scenario: Employee HR System
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display.
# 1. Use plt.subplots(1, 2) to create a figure with two side-by-side axes.
# 2. Plot sin(x) on the first axis and cos(x) on the second axis.
print("Write the plotting code!")
`,    'w4_14-2': `# Complex: Customizations
# Scenario: Employee HR System
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display.
# 1. Create a scatter plot of 100 random points.
# 2. Color the points based on a third array of random values.
# 3. Add a colorbar and a legend.
print("Write the plotting code!")
`,    'w4_15-0': `# Easy: Matplotlib Basics
# Scenario: E-Commerce Sales
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display in this terminal sandbox, but write the correct code.
# 1. Create x = np.arange(10) and y = x ** 2
# 2. Write the code to plot x vs y.
# 3. Add a title and x/y labels.
print("Write the plotting code!")
`,    'w4_15-1': `# Intermediate: Subplots
# Scenario: E-Commerce Sales
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display.
# 1. Use plt.subplots(1, 2) to create a figure with two side-by-side axes.
# 2. Plot sin(x) on the first axis and cos(x) on the second axis.
print("Write the plotting code!")
`,    'w4_15-2': `# Complex: Customizations
# Scenario: E-Commerce Sales
import matplotlib.pyplot as plt
import numpy as np

# Note: Plots won't display.
# 1. Create a scatter plot of 100 random points.
# 2. Color the points based on a third array of random values.
# 3. Add a colorbar and a legend.
print("Write the plotting code!")
`,    'w3_0-0': `# Easy: Series construction
# Scenario: Employee HR System
import pandas as pd
import numpy as np

rng = np.random.default_rng(2026)
names = ["Ari", "Bataa", "Caraa", "Davaa", "Enkh", "Faraa", "Ganaa", "Khas", "Ider", "Jargal"]
depts = ["IT", "HR", "Finance", "IT", "Sales", "IT", "HR", "Sales", "Finance", "IT"]

data = {
    "emp_id": np.arange(1001, 1011),
    "name": names,
    "department": depts,
    "salary": rng.integers(1000, 5000, size=10).astype(float),
    "hire_year": rng.integers(2015, 2024, size=10),
    "performance_score": rng.normal(75, 10, size=10).round(1)
}
# Introduce some missing/dirty data intentionally
data["salary"][2] = np.nan
data["performance_score"][5] = -10.0 # invalid
data["name"][7] = " Khas "


# 1. Convert the 'name' list from the data dict into a Pandas Series named \`name_series\`.
# 2. Print the first 3 elements of the Series.
# 3. Create a Series for 'salary' and find its mean.
`,    'w3_0-1': `# Intermediate: DataFrame Construction
# Scenario: Employee HR System
import pandas as pd
import numpy as np

rng = np.random.default_rng(2026)
names = ["Ari", "Bataa", "Caraa", "Davaa", "Enkh", "Faraa", "Ganaa", "Khas", "Ider", "Jargal"]
depts = ["IT", "HR", "Finance", "IT", "Sales", "IT", "HR", "Sales", "Finance", "IT"]

data = {
    "emp_id": np.arange(1001, 1011),
    "name": names,
    "department": depts,
    "salary": rng.integers(1000, 5000, size=10).astype(float),
    "hire_year": rng.integers(2015, 2024, size=10),
    "performance_score": rng.normal(75, 10, size=10).round(1)
}
# Introduce some missing/dirty data intentionally
data["salary"][2] = np.nan
data["performance_score"][5] = -10.0 # invalid
data["name"][7] = " Khas "


# 1. Convert the entire \`data\` dictionary into a Pandas DataFrame named \`df\`.
# 2. Print the \`.shape\`, \`.columns\`, and \`.dtypes\`.
# 3. Use \`.head()\` to show the first 4 rows.
# 4. Use \`.info()\` to inspect missing values.
`,    'w3_0-2': `# Complex: DataFrame Operations
# Scenario: Employee HR System
import pandas as pd
import numpy as np

rng = np.random.default_rng(2026)
names = ["Ari", "Bataa", "Caraa", "Davaa", "Enkh", "Faraa", "Ganaa", "Khas", "Ider", "Jargal"]
depts = ["IT", "HR", "Finance", "IT", "Sales", "IT", "HR", "Sales", "Finance", "IT"]

data = {
    "emp_id": np.arange(1001, 1011),
    "name": names,
    "department": depts,
    "salary": rng.integers(1000, 5000, size=10).astype(float),
    "hire_year": rng.integers(2015, 2024, size=10),
    "performance_score": rng.normal(75, 10, size=10).round(1)
}
# Introduce some missing/dirty data intentionally
data["salary"][2] = np.nan
data["performance_score"][5] = -10.0 # invalid
data["name"][7] = " Khas "


# 1. Convert \`data\` to a DataFrame \`df\`.
# 2. Set the index of the DataFrame to be the \`emp_id\` or \`order_id\` (whichever exists).
# 3. Select only the numerical columns.
# 4. Sort the DataFrame by the last column in descending order.
# 5. Extract the top 3 rows into a new DataFrame.
`,    'w3_1-0': `# Easy: CSV Writing
# Scenario: IoT Sensor Network
import pandas as pd
import numpy as np

rng = np.random.default_rng(42)
times = pd.date_range("2026-01-01", periods=10, freq="H")

data = {
    "timestamp": times,
    "sensor_id": rng.choice(["S1", "S2", "S3"], size=10),
    "temp_c": rng.normal(20, 5, size=10).round(1),
    "humidity": rng.integers(30, 90, size=10).astype(float),
    "error_flag": rng.choice([True, False], p=[0.2, 0.8], size=10)
}
data["temp_c"][4] = np.nan
data["humidity"][8] = 150.0 # impossible humidity


# 1. Convert \`data\` to a DataFrame \`df\`.
# 2. Save the DataFrame to a CSV string using \`df.to_csv(index=False)\`.
#    (We use strings here since we don't have a real filesystem in this sandbox).
# 3. Print the resulting CSV string.
`,    'w3_1-1': `# Intermediate: CSV Reading and Inspection
# Scenario: IoT Sensor Network
import pandas as pd
import io

csv_text = """id,name,value,date
1,Ari,10.5,2026-01-01
2,Bataa,,2026-01-02
3,Caraa,invalid,2026-01-03
4,Davaa,15.2,2026-01-04"""

# 1. Use io.StringIO(csv_text) to read the CSV into a DataFrame.
# 2. Inspect the dtypes. Notice that 'value' is an object (string) because of "invalid".
# 3. Convert 'value' to numeric using pd.to_numeric(..., errors='coerce').
# 4. Check the dtypes again and print the missing value count.
`,    'w3_1-2': `# Complex: JSON Round-Trip
# Scenario: IoT Sensor Network
import pandas as pd
import numpy as np

rng = np.random.default_rng(42)
times = pd.date_range("2026-01-01", periods=10, freq="H")

data = {
    "timestamp": times,
    "sensor_id": rng.choice(["S1", "S2", "S3"], size=10),
    "temp_c": rng.normal(20, 5, size=10).round(1),
    "humidity": rng.integers(30, 90, size=10).astype(float),
    "error_flag": rng.choice([True, False], p=[0.2, 0.8], size=10)
}
data["temp_c"][4] = np.nan
data["humidity"][8] = 150.0 # impossible humidity


# 1. Convert \`data\` to a DataFrame \`df\`.
# 2. Export the DataFrame to JSON using \`to_json(orient='records')\`.
# 3. Read the JSON string back into a new DataFrame \`df_json\`.
# 4. Assert or verify that the shape and columns of \`df_json\` match the original \`df\`.
# 5. Explain in a comment why orient='records' is often preferred for web APIs.
`,    'w3_2-0': `# Easy: Selecting Columns
# Scenario: E-Commerce Sales
import pandas as pd
import numpy as np

rng = np.random.default_rng(99)

data = {
    "order_id": ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"],
    "customer": ["Ari", "Bataa", "Ari", "Davaa", "Enkh", "Ari", "Ganaa", "Enkh", "Ider", "Jargal"],
    "category": ["Electronics", "Clothing", "Electronics", "Books", "Clothing", "Books", "Electronics", "Books", "Clothing", "Electronics"],
    "amount": rng.exponential(100, size=10).round(2),
    "status": rng.choice(["completed", "pending", "cancelled"], size=10)
}
data["amount"][3] = np.nan
data["status"][7] = "unknown"


# 1. Create \`df\` from \`data\`.
# 2. Select just the first column (e.g. name or timestamp) as a Series.
# 3. Select the first column AND the last column as a DataFrame (use a list of columns).
`,    'w3_2-1': `# Intermediate: loc vs iloc
# Scenario: E-Commerce Sales
import pandas as pd
import numpy as np

rng = np.random.default_rng(99)

data = {
    "order_id": ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"],
    "customer": ["Ari", "Bataa", "Ari", "Davaa", "Enkh", "Ari", "Ganaa", "Enkh", "Ider", "Jargal"],
    "category": ["Electronics", "Clothing", "Electronics", "Books", "Clothing", "Books", "Electronics", "Books", "Clothing", "Electronics"],
    "amount": rng.exponential(100, size=10).round(2),
    "status": rng.choice(["completed", "pending", "cancelled"], size=10)
}
data["amount"][3] = np.nan
data["status"][7] = "unknown"


# 1. Create \`df\` from \`data\`.
# 2. Change the index to be completely random strings or non-sequential integers.
# 3. Use \`.iloc\` to select the exactly 3rd row (integer position).
# 4. Use \`.loc\` to select rows based on a specific label from your new index.
# 5. Use \`.loc\` to select the 3rd row BUT only the first two columns.
`,    'w3_2-2': `# Complex: Boolean Filtering
# Scenario: E-Commerce Sales
import pandas as pd
import numpy as np

rng = np.random.default_rng(99)

data = {
    "order_id": ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"],
    "customer": ["Ari", "Bataa", "Ari", "Davaa", "Enkh", "Ari", "Ganaa", "Enkh", "Ider", "Jargal"],
    "category": ["Electronics", "Clothing", "Electronics", "Books", "Clothing", "Books", "Electronics", "Books", "Clothing", "Electronics"],
    "amount": rng.exponential(100, size=10).round(2),
    "status": rng.choice(["completed", "pending", "cancelled"], size=10)
}
data["amount"][3] = np.nan
data["status"][7] = "unknown"


# 1. Create \`df\` from \`data\`.
# 2. Filter the DataFrame to show only rows where the numerical column (salary, temp, or amount) is greater than its own mean.
# 3. Filter for rows where a categorical column (dept, sensor_id, category) equals a specific value, AND a numerical column is not null.
# 4. Use \`.isin()\` to filter for rows matching two different categorical values.
# 5. Reset the index of the final filtered DataFrame.
`,    'w3_3-0': `# Easy Practice: How do I create plots in pandas?
# Scenario: IoT Sensor Network
import pandas as pd
import numpy as np

rng = np.random.default_rng(42)
times = pd.date_range("2026-01-01", periods=10, freq="H")

data = {
    "timestamp": times,
    "sensor_id": rng.choice(["S1", "S2", "S3"], size=10),
    "temp_c": rng.normal(20, 5, size=10).round(1),
    "humidity": rng.integers(30, 90, size=10).astype(float),
    "error_flag": rng.choice([True, False], p=[0.2, 0.8], size=10)
}
data["temp_c"][4] = np.nan
data["humidity"][8] = 150.0 # impossible humidity


# 1. Load the data.
# 2. Apply a basic function related to 'How do I create plots in pandas?'.
`,    'w3_3-1': `# Intermediate Practice: How do I create plots in pandas?
# Scenario: IoT Sensor Network
import pandas as pd
import numpy as np

rng = np.random.default_rng(42)
times = pd.date_range("2026-01-01", periods=10, freq="H")

data = {
    "timestamp": times,
    "sensor_id": rng.choice(["S1", "S2", "S3"], size=10),
    "temp_c": rng.normal(20, 5, size=10).round(1),
    "humidity": rng.integers(30, 90, size=10).astype(float),
    "error_flag": rng.choice([True, False], p=[0.2, 0.8], size=10)
}
data["temp_c"][4] = np.nan
data["humidity"][8] = 150.0 # impossible humidity


# 1. Use the data to solve a multi-step problem for 'How do I create plots in pandas?'.
`,    'w3_3-2': `# Complex Practice: How do I create plots in pandas?
# Scenario: IoT Sensor Network
import pandas as pd
import numpy as np

rng = np.random.default_rng(42)
times = pd.date_range("2026-01-01", periods=10, freq="H")

data = {
    "timestamp": times,
    "sensor_id": rng.choice(["S1", "S2", "S3"], size=10),
    "temp_c": rng.normal(20, 5, size=10).round(1),
    "humidity": rng.integers(30, 90, size=10).astype(float),
    "error_flag": rng.choice([True, False], p=[0.2, 0.8], size=10)
}
data["temp_c"][4] = np.nan
data["humidity"][8] = 150.0 # impossible humidity


# 1. Combine How do I create plots in pandas? with grouping, missing data handling, and sorting.
`,    'w3_4-0': `# Easy: Creating New Columns
# Scenario: E-Commerce Sales
import pandas as pd
import numpy as np

rng = np.random.default_rng(99)

data = {
    "order_id": ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"],
    "customer": ["Ari", "Bataa", "Ari", "Davaa", "Enkh", "Ari", "Ganaa", "Enkh", "Ider", "Jargal"],
    "category": ["Electronics", "Clothing", "Electronics", "Books", "Clothing", "Books", "Electronics", "Books", "Clothing", "Electronics"],
    "amount": rng.exponential(100, size=10).round(2),
    "status": rng.choice(["completed", "pending", "cancelled"], size=10)
}
data["amount"][3] = np.nan
data["status"][7] = "unknown"


# 1. Create \`df\` from \`data\`.
# 2. Create a new column that is exactly double the value of an existing numerical column.
# 3. Create a static column called \`data_source\` and set all its values to "System A".
`,    'w3_4-1': `# Intermediate: Vectorized Logic
# Scenario: E-Commerce Sales
import pandas as pd
import numpy as np

rng = np.random.default_rng(99)

data = {
    "order_id": ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"],
    "customer": ["Ari", "Bataa", "Ari", "Davaa", "Enkh", "Ari", "Ganaa", "Enkh", "Ider", "Jargal"],
    "category": ["Electronics", "Clothing", "Electronics", "Books", "Clothing", "Books", "Electronics", "Books", "Clothing", "Electronics"],
    "amount": rng.exponential(100, size=10).round(2),
    "status": rng.choice(["completed", "pending", "cancelled"], size=10)
}
data["amount"][3] = np.nan
data["status"][7] = "unknown"


# 1. Create \`df\` from \`data\`.
# 2. Create a boolean column \`is_high_value\` which is True if the numerical column is greater than its mean.
# 3. Use \`np.where()\` to create a column \`status_label\`: if \`is_high_value\` is True, set to "Priority", else "Standard".
`,    'w3_4-2': `# Complex: Complex Feature Engineering
# Scenario: E-Commerce Sales
import pandas as pd
import numpy as np

rng = np.random.default_rng(99)

data = {
    "order_id": ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"],
    "customer": ["Ari", "Bataa", "Ari", "Davaa", "Enkh", "Ari", "Ganaa", "Enkh", "Ider", "Jargal"],
    "category": ["Electronics", "Clothing", "Electronics", "Books", "Clothing", "Books", "Electronics", "Books", "Clothing", "Electronics"],
    "amount": rng.exponential(100, size=10).round(2),
    "status": rng.choice(["completed", "pending", "cancelled"], size=10)
}
data["amount"][3] = np.nan
data["status"][7] = "unknown"


# 1. Create \`df = pd.DataFrame(data)\`.
# 2. Clean the numerical column (fill NaNs).
# 3. Create a column \`normalized_score\`: subtract the min and divide by (max - min) for the numerical column.
# 4. Create a categorical column \`band\` using \`pd.cut()\` to divide the numerical column into 3 bins: 'Low', 'Medium', 'High'.
# 5. Verify the distributions of your new bins using \`.value_counts()\`.
`,    'w3_5-0': `# Easy: Summary Statistics
# Scenario: Employee HR System
import pandas as pd
import numpy as np

rng = np.random.default_rng(2026)
names = ["Ari", "Bataa", "Caraa", "Davaa", "Enkh", "Faraa", "Ganaa", "Khas", "Ider", "Jargal"]
depts = ["IT", "HR", "Finance", "IT", "Sales", "IT", "HR", "Sales", "Finance", "IT"]

data = {
    "emp_id": np.arange(1001, 1011),
    "name": names,
    "department": depts,
    "salary": rng.integers(1000, 5000, size=10).astype(float),
    "hire_year": rng.integers(2015, 2024, size=10),
    "performance_score": rng.normal(75, 10, size=10).round(1)
}
# Introduce some missing/dirty data intentionally
data["salary"][2] = np.nan
data["performance_score"][5] = -10.0 # invalid
data["name"][7] = " Khas "


# 1. Create \`df\` from \`data\`.
# 2. Use \`.describe()\` to print summary statistics for all numeric columns.
# 3. Find the exact median of the numerical columns.
# 4. Use \`.value_counts()\` on one of the categorical columns to see the distribution.
`,    'w3_5-1': `# Intermediate: GroupBy Basics
# Scenario: Employee HR System
import pandas as pd
import numpy as np

rng = np.random.default_rng(2026)
names = ["Ari", "Bataa", "Caraa", "Davaa", "Enkh", "Faraa", "Ganaa", "Khas", "Ider", "Jargal"]
depts = ["IT", "HR", "Finance", "IT", "Sales", "IT", "HR", "Sales", "Finance", "IT"]

data = {
    "emp_id": np.arange(1001, 1011),
    "name": names,
    "department": depts,
    "salary": rng.integers(1000, 5000, size=10).astype(float),
    "hire_year": rng.integers(2015, 2024, size=10),
    "performance_score": rng.normal(75, 10, size=10).round(1)
}
# Introduce some missing/dirty data intentionally
data["salary"][2] = np.nan
data["performance_score"][5] = -10.0 # invalid
data["name"][7] = " Khas "


# 1. Create \`df\` from \`data\`.
# 2. Group the DataFrame by one of the categorical columns (department, sensor_id, category).
# 3. Calculate the \`.mean()\` for the numerical columns within each group.
# 4. Calculate the \`.count()\` for each group to see how many records belong to each.
`,    'w3_5-2': `# Complex: Advanced GroupBy and Aggregation
# Scenario: Employee HR System
import pandas as pd
import numpy as np

rng = np.random.default_rng(2026)
names = ["Ari", "Bataa", "Caraa", "Davaa", "Enkh", "Faraa", "Ganaa", "Khas", "Ider", "Jargal"]
depts = ["IT", "HR", "Finance", "IT", "Sales", "IT", "HR", "Sales", "Finance", "IT"]

data = {
    "emp_id": np.arange(1001, 1011),
    "name": names,
    "department": depts,
    "salary": rng.integers(1000, 5000, size=10).astype(float),
    "hire_year": rng.integers(2015, 2024, size=10),
    "performance_score": rng.normal(75, 10, size=10).round(1)
}
# Introduce some missing/dirty data intentionally
data["salary"][2] = np.nan
data["performance_score"][5] = -10.0 # invalid
data["name"][7] = " Khas "


# 1. Create \`df\` from \`data\`.
# 2. Group by the categorical column.
# 3. Use the \`.agg()\` method to simultaneously calculate the 'min', 'max', and 'mean' of a numerical column.
# 4. Sort the resulting grouped table by the 'mean' value in descending order.
# 5. Rename the multi-level columns if necessary, or just print the result.
`,    'w3_6-0': `# Easy: Pivot Tables Basics
# Scenario: E-Commerce Sales
import pandas as pd
import numpy as np

rng = np.random.default_rng(99)

data = {
    "order_id": ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"],
    "customer": ["Ari", "Bataa", "Ari", "Davaa", "Enkh", "Ari", "Ganaa", "Enkh", "Ider", "Jargal"],
    "category": ["Electronics", "Clothing", "Electronics", "Books", "Clothing", "Books", "Electronics", "Books", "Clothing", "Electronics"],
    "amount": rng.exponential(100, size=10).round(2),
    "status": rng.choice(["completed", "pending", "cancelled"], size=10)
}
data["amount"][3] = np.nan
data["status"][7] = "unknown"


# 1. Create \`df\` from \`data\`.
# 2. Use \`pd.pivot_table()\` to show the average numerical value (salary, temp, or amount) for each category (department, sensor_id, category).
`,    'w3_6-1': `# Intermediate: Multi-dimensional Pivots
# Scenario: Analyzing sales by Region and Year.
import pandas as pd

df = pd.DataFrame({
    "Region": ["North", "North", "South", "South", "North"],
    "Year": [2022, 2023, 2022, 2023, 2022],
    "Sales": [100, 150, 200, 250, 50]
})

# 1. Create a pivot table with \`Region\` as the index, \`Year\` as columns, and \`Sales\` as values.
# 2. Use aggfunc='sum' to combine the two North 2022 records.
`,    'w3_6-2': `# Complex: Melt / Unpivot
# Scenario: Converting wide data to long format.
import pandas as pd

wide_df = pd.DataFrame({
    "Student": ["Ari", "Bataa"],
    "Math": [90, 85],
    "Science": [88, 92],
    "History": [75, 80]
})

# 1. Use \`pd.melt()\` to convert this from wide format to long format.
#    The resulting columns should be 'Student', 'Subject', and 'Score'.
# 2. Sort the long DataFrame by 'Student'.
`,    'w3_7-0': `# Easy: Concatenation
# Scenario: Combine logs from two different servers.
import pandas as pd

df1 = pd.DataFrame({"id": [1, 2], "val": ["A", "B"]})
df2 = pd.DataFrame({"id": [3, 4], "val": ["C", "D"]})

# 1. Use pd.concat to stack df1 and df2 vertically.
# 2. Ignore the index so the new DataFrame has a clean index from 0 to 3.
`,    'w3_7-1': `# Intermediate: Merging (Inner Join)
# Scenario: Link transaction data with customer profiles.
import pandas as pd

sales = pd.DataFrame({"cust_id": [101, 102, 103], "amount": [50, 100, 150]})
customers = pd.DataFrame({"cust_id": [101, 103, 104], "name": ["Ari", "Bataa", "Caraa"]})

# 1. Use pd.merge() to join \`sales\` and \`customers\` on \`cust_id\`.
# 2. Print the result. Notice which \`cust_id\`s were dropped (inner join behavior).
`,    'w3_7-2': `# Complex: Outer Joins and Indicators
# Scenario: Reconcile two databases.
import pandas as pd

db_left = pd.DataFrame({"user": ["A", "B", "C"], "score1": [10, 20, 30]})
db_right = pd.DataFrame({"user": ["B", "C", "D"], "score2": [40, 50, 60]})

# 1. Perform an outer merge on \`user\`, setting \`indicator=True\`.
# 2. Print the resulting DataFrame.
# 3. Filter the DataFrame to show ONLY rows that were present in the left database but missing in the right database.
`,    'w3_8-0': `# Easy: Datetime Conversion
# Scenario: E-Commerce Sales
import pandas as pd

dates = pd.Series(["2026-01-01", "2026/02/01", "March 1st, 2026"])

# 1. Use pd.to_datetime() to convert the varied string formats into consistent datetime objects.
# 2. Extract the month from the datetime objects using \`.dt.month\`.
`,    'w3_8-1': `# Intermediate: Date Ranges and Shifting
import pandas as pd
import numpy as np

# 1. Create a datetime index of 14 consecutive days starting today using pd.date_range.
# 2. Create a Series with this index and random integer values.
# 3. Use \`.shift(1)\` to shift the values down by one day.
# 4. Calculate the daily difference (current day - previous day).
`,    'w3_8-2': `# Complex: Resampling
import pandas as pd
import numpy as np

# 1. Create a datetime index of 100 consecutive HOURS.
# 2. Create a DataFrame with this index and random values.
# 3. Use \`.resample('D').mean()\` to aggregate the hourly data into DAILY averages.
# 4. Print the resulting daily DataFrame.
`,    'w6_0-0': `# Easy: Basic Pipeline
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

# 1. Create a Scikit-Learn Pipeline with two steps:
#    - a StandardScaler named "scaler"
#    - a LogisticRegression model named "model"
# 2. Print the pipeline object.
`,    'w6_0-1': `# Intermediate: Fitting a Pipeline
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.tree import DecisionTreeClassifier
import numpy as np

# Setup
X = np.array([[1], [np.nan], [3], [4]])
y = np.array([0, 0, 1, 1])

# 1. Create a Pipeline with a SimpleImputer (strategy='mean') and a DecisionTreeClassifier.
# 2. Call \`.fit(X, y)\` on the pipeline.
# 3. Predict on a new array \`X_new = [[np.nan], [2]]\`.
`,    'w6_0-2': `# Complex: Accessing Pipeline Steps
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import MinMaxScaler
from sklearn.linear_model import LinearRegression
import numpy as np

# Setup
X = np.array([[10], [20], [30]])
y = np.array([100, 200, 300])

# 1. Create and fit a pipeline with MinMaxScaler and LinearRegression.
# 2. Access the fitted LinearRegression model from inside the pipeline using the \`named_steps\` attribute.
# 3. Print the \`.coef_\` of the fitted regression model.
`,    'w6_1-0': `# Easy: Basic Pipeline
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

# 1. Create a Scikit-Learn Pipeline with two steps:
#    - a StandardScaler named "scaler"
#    - a LogisticRegression model named "model"
# 2. Print the pipeline object.
`,    'w6_1-1': `# Intermediate: Fitting a Pipeline
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.tree import DecisionTreeClassifier
import numpy as np

# Setup
X = np.array([[1], [np.nan], [3], [4]])
y = np.array([0, 0, 1, 1])

# 1. Create a Pipeline with a SimpleImputer (strategy='mean') and a DecisionTreeClassifier.
# 2. Call \`.fit(X, y)\` on the pipeline.
# 3. Predict on a new array \`X_new = [[np.nan], [2]]\`.
`,    'w6_1-2': `# Complex: Accessing Pipeline Steps
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import MinMaxScaler
from sklearn.linear_model import LinearRegression
import numpy as np

# Setup
X = np.array([[10], [20], [30]])
y = np.array([100, 200, 300])

# 1. Create and fit a pipeline with MinMaxScaler and LinearRegression.
# 2. Access the fitted LinearRegression model from inside the pipeline using the \`named_steps\` attribute.
# 3. Print the \`.coef_\` of the fitted regression model.
`,    'w6_2-0': `# Easy: Simple Imputation
from sklearn.impute import SimpleImputer
import numpy as np

# Setup
X = np.array([[1.0, 2.0], [np.nan, 3.0], [7.0, np.nan]])

# 1. Instantiate a SimpleImputer to replace NaNs with the mean.
# 2. Fit and transform the data.
# 3. Print the transformed array.
`,    'w6_2-1': `# Intermediate: Scaling and Encoding
from sklearn.preprocessing import StandardScaler, OneHotEncoder
import numpy as np

# Setup
X_num = np.array([[100], [200], [300]])
X_cat = np.array([["Red"], ["Blue"], ["Red"]])

# 1. Fit and transform X_num using StandardScaler.
# 2. Fit and transform X_cat using OneHotEncoder(sparse_output=False).
# 3. Print both resulting arrays.
`,    'w6_2-2': `# Complex: ColumnTransformer
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
import pandas as pd

# Setup
df = pd.DataFrame({
    "age": [25, 30, 35],
    "city": ["Paris", "London", "Paris"]
})

# 1. Create a ColumnTransformer that applies StandardScaler to "age" and OneHotEncoder to "city".
# 2. Fit and transform the DataFrame.
# 3. Print the resulting combined numpy array.
`,    'w6_3-0': `# Easy: Simple Imputation
from sklearn.impute import SimpleImputer
import numpy as np

# Setup
X = np.array([[1.0, 2.0], [np.nan, 3.0], [7.0, np.nan]])

# 1. Instantiate a SimpleImputer to replace NaNs with the mean.
# 2. Fit and transform the data.
# 3. Print the transformed array.
`,    'w6_3-1': `# Intermediate: Scaling and Encoding
from sklearn.preprocessing import StandardScaler, OneHotEncoder
import numpy as np

# Setup
X_num = np.array([[100], [200], [300]])
X_cat = np.array([["Red"], ["Blue"], ["Red"]])

# 1. Fit and transform X_num using StandardScaler.
# 2. Fit and transform X_cat using OneHotEncoder(sparse_output=False).
# 3. Print both resulting arrays.
`,    'w6_3-2': `# Complex: ColumnTransformer
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
import pandas as pd

# Setup
df = pd.DataFrame({
    "age": [25, 30, 35],
    "city": ["Paris", "London", "Paris"]
})

# 1. Create a ColumnTransformer that applies StandardScaler to "age" and OneHotEncoder to "city".
# 2. Fit and transform the DataFrame.
# 3. Print the resulting combined numpy array.
`,    'w6_4-0': `# Easy: Basic Train-Test Split
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split

# Setup
X = np.arange(100).reshape((50, 2))
y = np.arange(50)

# 1. Use train_test_split to split X and y into 80% training and 20% testing sets.
# 2. Set random_state=42 for reproducibility.
# 3. Print the shapes of X_train and X_test.
`,    'w6_4-1': `# Intermediate: Stratified Splitting
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split

# Setup
X = np.random.rand(100, 5)
y = np.array([0]*90 + [1]*10) # Highly imbalanced target

# 1. Split the data 70/30.
# 2. Use the \`stratify\` parameter to ensure the train and test sets have the same proportion of 0s and 1s as the original y.
# 3. Verify the proportions using np.mean(y_train) and np.mean(y_test).
`,    'w6_4-2': `# Complex: Splitting Pandas DataFrames
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split

# Setup
df = pd.DataFrame({
    "feature1": np.random.randn(100),
    "feature2": np.random.randn(100),
    "target": np.random.choice(["A", "B", "C"], size=100)
})

# 1. Separate \`df\` into \`X\` (features) and \`y\` (target).
# 2. Perform a train_test_split.
# 3. Verify that the indices of \`X_train\` and \`y_train\` perfectly match.
`
};

function loadLesson(lessonId) {
    document.querySelectorAll('.sidebar a.sub-link').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.sidebar a.sub-link').forEach(link => {
        if(link.getAttribute('onclick').includes(lessonId)) {
            link.classList.add('active');
            
            const parentLi = link.closest('li:has(ul)');
            if(parentLi && !parentLi.classList.contains('active')) {
                document.querySelectorAll('.sidebar > ul > li').forEach(li => li.classList.remove('active'));
                parentLi.classList.add('active');
            }
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
    const outputContainer = document.getElementById('output-' + cellId);
    const header = document.querySelector('#cell-' + cellId + ' .cell-header span');
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
        if(stderr) outText += "\n[STDERR]:\n" + stderr;
        outputContainer.innerText = outText || "Executed successfully (no output).";
        outputContainer.style.color = stderr ? "var(--warning-color)" : "var(--text-color)";
    } catch (err) {
        outputContainer.innerText = err;
        outputContainer.style.color = "red";
    } finally {
        header.innerText = "[✓] Finished";
    }
}
