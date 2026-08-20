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
        
    `
};

const initialCode = {
    'git-1': `# Simulate bash command via python\nimport os\n\n# TODO: Run 'git status' using os.system()\nos.system('echo Git is ready!')`,    'w2_00-0': `# Practice: 2. Introduction to NumPy
# Scenario: Apply the concepts from 2. Introduction to NumPy.
import numpy as np

# 1. Create a dummy dataset relevant to this topic.
# 2. Apply a core function from the reading to solve a problem.
`,    'w2_01-0': `# Easy: Array Creation and Inspection
# Scenario: You are collecting temperature readings.
import numpy as np
import pandas as pd

# Data:
temperatures_list = [22.5, 23.1, "24.5", 21.8, 22.0]

# 1. Convert the mixed list to a NumPy array of type float.
# 2. Print the shape, ndim, dtype, and itemsize of the array.
# 3. Create a 3x3 array of zeros to hold tomorrow's forecasts.
`,    'w2_01-1': `# Intermediate: Slicing and Reshaping
# Scenario: A 1D array of 24 hourly readings needs to be converted into a 2D array of (days, hours).
import numpy as np

# Data:
hourly = np.arange(1, 25)

# 1. Reshape the 24-element array into a (3 days, 8 hours) matrix.
# 2. Extract the readings for the second day (index 1).
# 3. Extract the last two hours of every day using slicing.
`,    'w2_01-2': `# Complex: Advanced Extraction
# Scenario: You have a matrix of image pixel intensities.
import numpy as np

# Data:
rng = np.random.default_rng(42)
pixels = rng.integers(0, 256, size=(10, 10))

# 1. Extract a 3x3 sub-grid from the exact center of the matrix.
# 2. Replace the four corner pixels of the full matrix with 0.
# 3. Print the modified matrix.
`,    'w2_02-0': `# Easy: Array Creation and Inspection
# Scenario: You are collecting temperature readings.
import numpy as np
import pandas as pd

# Data:
temperatures_list = [22.5, 23.1, "24.5", 21.8, 22.0]

# 1. Convert the mixed list to a NumPy array of type float.
# 2. Print the shape, ndim, dtype, and itemsize of the array.
# 3. Create a 3x3 array of zeros to hold tomorrow's forecasts.
`,    'w2_02-1': `# Intermediate: Slicing and Reshaping
# Scenario: A 1D array of 24 hourly readings needs to be converted into a 2D array of (days, hours).
import numpy as np

# Data:
hourly = np.arange(1, 25)

# 1. Reshape the 24-element array into a (3 days, 8 hours) matrix.
# 2. Extract the readings for the second day (index 1).
# 3. Extract the last two hours of every day using slicing.
`,    'w2_02-2': `# Complex: Advanced Extraction
# Scenario: You have a matrix of image pixel intensities.
import numpy as np

# Data:
rng = np.random.default_rng(42)
pixels = rng.integers(0, 256, size=(10, 10))

# 1. Extract a 3x3 sub-grid from the exact center of the matrix.
# 2. Replace the four corner pixels of the full matrix with 0.
# 3. Print the modified matrix.
`,    'w2_03-0': `# Easy: Vectorized Arithmetic
# Scenario: Apply a currency conversion rate to a list of prices.
import numpy as np

# Data:
usd_prices = np.array([19.99, 5.50, 150.00, 2.99])
conversion_rate = 3400 # to MNT

# 1. Multiply all prices by the conversion rate without using loops.
# 2. Round the results to the nearest integer.
`,    'w2_03-1': `# Intermediate: Ufuncs and broadcasting
# Scenario: You have base prices and a list of different tax rates.
import numpy as np

# Data:
base_prices = np.array([[10], [20], [30]]) # shape (3,1)
tax_rates = np.array([1.05, 1.10, 1.20]) # shape (3,)

# 1. Add the tax to the base prices using broadcasting (result should be 3x3).
# 2. Find the absolute difference between the highest and lowest taxed prices for each item.
`,    'w2_04-0': `# Intermediate: Axis Aggregations
# Scenario: You have test scores for 5 students across 3 exams.
import numpy as np

# Data:
scores = np.array([
    [85, 90, 88],
    [70, 75, 72],
    [95, 98, 100],
    [60, 65, 62],
    [80, 85, 82]
])

# 1. Find the mean score for the entire class.
# 2. Find the minimum score on each exam (columns).
# 3. Find the maximum score for each student (rows).
`,    'w2_05-0': `# Easy: Vectorized Arithmetic
# Scenario: Apply a currency conversion rate to a list of prices.
import numpy as np

# Data:
usd_prices = np.array([19.99, 5.50, 150.00, 2.99])
conversion_rate = 3400 # to MNT

# 1. Multiply all prices by the conversion rate without using loops.
# 2. Round the results to the nearest integer.
`,    'w2_05-1': `# Intermediate: Ufuncs and broadcasting
# Scenario: You have base prices and a list of different tax rates.
import numpy as np

# Data:
base_prices = np.array([[10], [20], [30]]) # shape (3,1)
tax_rates = np.array([1.05, 1.10, 1.20]) # shape (3,)

# 1. Add the tax to the base prices using broadcasting (result should be 3x3).
# 2. Find the absolute difference between the highest and lowest taxed prices for each item.
`,    'w2_06-0': `# Complex: Boolean Masking and Filtering
# Scenario: Sensor anomaly detection.
import numpy as np

# Data:
rng = np.random.default_rng(2026)
sensor_readings = rng.normal(loc=20, scale=5, size=100)

# 1. Find how many readings are considered anomalies (below 10 or above 30).
# 2. Create a clean array containing ONLY the normal readings using a boolean mask.
# 3. Instead of dropping anomalies, use np.clip to restrict all values to the 10-30 range.
`,    'w2_07-0': `# Practice: Fancy Indexing
# Scenario: Apply the concepts from Fancy Indexing.
import numpy as np

# 1. Create a dummy dataset relevant to this topic.
# 2. Apply a core function from the reading to solve a problem.
`,    'w2_08-0': `# Practice: Sorting Arrays
# Scenario: Apply the concepts from Sorting Arrays.
import numpy as np

# 1. Create a dummy dataset relevant to this topic.
# 2. Apply a core function from the reading to solve a problem.
`,    'w2_09-0': `# Practice: Structured Data: NumPy's Structured Arrays
# Scenario: Apply the concepts from Structured Data: NumPy's Structured Arrays.
import numpy as np

# 1. Create a dummy dataset relevant to this topic.
# 2. Apply a core function from the reading to solve a problem.
`,    'w4_00-0': `# Easy Practice: 4. Visualization with Matplotlib
import pandas as pd
import numpy as np

# Write your code below to practice the concepts from the textbook:
`,    'w4_00-1': `# Complex Practice: 4. Visualization with Matplotlib
import pandas as pd
import numpy as np

# Think of an edge case or dirty dataset and apply 4. Visualization with Matplotlib to clean it.
`,    'w4_01-0': `# Easy Practice: Simple Line Plots
import pandas as pd
import numpy as np

# Write your code below to practice the concepts from the textbook:
`,    'w4_01-1': `# Complex Practice: Simple Line Plots
import pandas as pd
import numpy as np

# Think of an edge case or dirty dataset and apply Simple Line Plots to clean it.
`,    'w4_02-0': `# Easy Practice: Simple Scatter Plots
import pandas as pd
import numpy as np

# Write your code below to practice the concepts from the textbook:
`,    'w4_02-1': `# Complex Practice: Simple Scatter Plots
import pandas as pd
import numpy as np

# Think of an edge case or dirty dataset and apply Simple Scatter Plots to clean it.
`,    'w4_03-0': `# Easy Practice: Visualizing Errors
import pandas as pd
import numpy as np

# Write your code below to practice the concepts from the textbook:
`,    'w4_03-1': `# Complex Practice: Visualizing Errors
import pandas as pd
import numpy as np

# Think of an edge case or dirty dataset and apply Visualizing Errors to clean it.
`,    'w4_04-0': `# Easy Practice: Density and Contour Plots
import pandas as pd
import numpy as np

# Write your code below to practice the concepts from the textbook:
`,    'w4_04-1': `# Complex Practice: Density and Contour Plots
import pandas as pd
import numpy as np

# Think of an edge case or dirty dataset and apply Density and Contour Plots to clean it.
`,    'w4_05-0': `# Easy Practice: Histograms, Binnings, and Density
import pandas as pd
import numpy as np

# Write your code below to practice the concepts from the textbook:
`,    'w4_05-1': `# Complex Practice: Histograms, Binnings, and Density
import pandas as pd
import numpy as np

# Think of an edge case or dirty dataset and apply Histograms, Binnings, and Density to clean it.
`,    'w4_06-0': `# Easy Practice: Customizing Plot Legends
import pandas as pd
import numpy as np

# Write your code below to practice the concepts from the textbook:
`,    'w4_06-1': `# Complex Practice: Customizing Plot Legends
import pandas as pd
import numpy as np

# Think of an edge case or dirty dataset and apply Customizing Plot Legends to clean it.
`,    'w4_07-0': `# Easy Practice: Customizing Colorbars
import pandas as pd
import numpy as np

# Write your code below to practice the concepts from the textbook:
`,    'w4_07-1': `# Complex Practice: Customizing Colorbars
import pandas as pd
import numpy as np

# Think of an edge case or dirty dataset and apply Customizing Colorbars to clean it.
`,    'w4_08-0': `# Easy Practice: Multiple Subplots
import pandas as pd
import numpy as np

# Write your code below to practice the concepts from the textbook:
`,    'w4_08-1': `# Complex Practice: Multiple Subplots
import pandas as pd
import numpy as np

# Think of an edge case or dirty dataset and apply Multiple Subplots to clean it.
`,    'w4_09-0': `# Easy Practice: Text and Annotation
import pandas as pd
import numpy as np

# Write your code below to practice the concepts from the textbook:
`,    'w4_09-1': `# Complex Practice: Text and Annotation
import pandas as pd
import numpy as np

# Think of an edge case or dirty dataset and apply Text and Annotation to clean it.
`,    'w4_10-0': `# Easy Practice: Customizing Ticks
import pandas as pd
import numpy as np

# Write your code below to practice the concepts from the textbook:
`,    'w4_10-1': `# Complex Practice: Customizing Ticks
import pandas as pd
import numpy as np

# Think of an edge case or dirty dataset and apply Customizing Ticks to clean it.
`,    'w4_11-0': `# Easy Practice: Customizing Matplotlib: Configurations and Stylesheets
import pandas as pd
import numpy as np

# Write your code below to practice the concepts from the textbook:
`,    'w4_11-1': `# Complex Practice: Customizing Matplotlib: Configurations and Stylesheets
import pandas as pd
import numpy as np

# Think of an edge case or dirty dataset and apply Customizing Matplotlib: Configurations and Stylesheets to clean it.
`,    'w4_12-0': `# Easy Practice: Three-Dimensional Plotting in Matplotlib
import pandas as pd
import numpy as np

# Write your code below to practice the concepts from the textbook:
`,    'w4_12-1': `# Complex Practice: Three-Dimensional Plotting in Matplotlib
import pandas as pd
import numpy as np

# Think of an edge case or dirty dataset and apply Three-Dimensional Plotting in Matplotlib to clean it.
`,    'w4_13-0': `# Easy Practice: Geographic Data with Basemap
import pandas as pd
import numpy as np

# Write your code below to practice the concepts from the textbook:
`,    'w4_13-1': `# Complex Practice: Geographic Data with Basemap
import pandas as pd
import numpy as np

# Think of an edge case or dirty dataset and apply Geographic Data with Basemap to clean it.
`,    'w4_14-0': `# Easy Practice: Visualization with Seaborn
import pandas as pd
import numpy as np

# Write your code below to practice the concepts from the textbook:
`,    'w4_14-1': `# Complex Practice: Visualization with Seaborn
import pandas as pd
import numpy as np

# Think of an edge case or dirty dataset and apply Visualization with Seaborn to clean it.
`,    'w4_15-0': `# Easy Practice: Further Resources
import pandas as pd
import numpy as np

# Write your code below to practice the concepts from the textbook:
`,    'w4_15-1': `# Complex Practice: Further Resources
import pandas as pd
import numpy as np

# Think of an edge case or dirty dataset and apply Further Resources to clean it.
`,    'w3_0-0': `# Easy: Student Series Report
# Scenario: A school assistant gives you this list of exam scores.
import pandas as pd
import numpy as np

scores = [76, 91, 84, 68, 95, 88, 73]
names = ["Ari", "Bataa", "Caraa", "Davaa", "Enkh", "Faraa", "Ganaa"]

# 1. Create a Pandas Series named \`score_series\` using the names as index labels.
# 2. Print the score for "Caraa".
# 3. Print students with scores of at least 85.
# 4. Find the mean, minimum, maximum, and median score.
# 5. Add 5 bonus points to every score, but cap scores at 100 (use clip).
`,    'w3_0-1': `# Intermediate: Build and Inspect a DataFrame
# Scenario: A small bookstore inventory.
import pandas as pd

data = {
    "title": ["The Steppe", "Blue Sky", "Nomad Code", "River Song", "Altan Book"],
    "category": ["History", "Fiction", "Technology", "Fiction", "History"],
    "price": [18.5, 12.0, 25.0, 15.5, 20.0],
    "stock": [8, 15, 4, 0, 11],
    "rating": [4.7, 4.2, 4.9, 4.0, 4.6]
}

# 1. Create \`books_df\`.
# 2. Print its shape, column names, index, and dtypes.
# 3. Select books that cost more than 18.
# 4. Add an \`inventory_value\` column equal to \`price * stock\`.
# 5. Find the title of the book with the largest inventory value.
`,    'w3_1-0': `# Intermediate: CSV Round Trip
# Scenario: Handling CSV data natively in python.
import pandas as pd
import io

csv_text = """order_id,customer,product,quantity,total,status
1001,Ari,Notebook,2,10.0,paid
1002,Bataa,Pen,5,7.5,paid
1003,Caraa,Backpack,1,45.0,pending
1004,Davaa,Notebook,,5.0,paid
1005,Enkh,Pen,3,invalid,cancelled
1005,Enkh,Pen,3,invalid,cancelled"""

# 1. Load the csv_text into a DataFrame using pd.read_csv(io.StringIO(csv_text)).
# 2. Convert \`total\` to numeric using pd.to_numeric(..., errors='coerce').
# 3. Remove exact duplicate rows.
# 4. Create \`valid_orders\`: only paid orders with non-missing quantity and total.
`,    'w3_1-1': `# Complex: JSON Records and Data Quality
import pandas as pd

records = [
    {"id": 1, "name": "Ari", "country": "Mongolia", "score": 88, "active": True},
    {"id": 2, "name": "Bataa", "country": "Mongolia", "score": None, "active": True},
    {"id": 3, "name": "Caraa", "country": "Japan", "score": 91, "active": False},
    {"id": 4, "name": "Davaa", "country": "Mongolia", "score": "unknown", "active": True}
]

# 1. Convert \`records\` to a DataFrame.
# 2. Convert \`score\` to numeric, making "unknown" missing.
# 3. Fill missing \`country\` values with "Unknown".
# 4. Fill missing score with the median valid score.
`,    'w3_2-0': `# Complex: Clean a Messy Table
import pandas as pd
import numpy as np

members = pd.DataFrame({
    "name": [" Ari ", "BATAA", "Caraa", "Davaa", "Enkh", "Enkh", None],
    "age": [16, 17, None, 150, 15, 15, 18],
    "city": ["Ulaanbaatar", "ulaanbaatar", "Darkhan", "Ulaanbaatar", "Erdenet", "Erdenet", "Khovd"],
    "hours_volunteered": [8, 12, "ten", 6, None, None, 4]
})

# 1. Create \`clean_members = members.copy()\`.
# 2. Clean names: remove outer whitespace (.str.strip()) and convert to title case.
# 3. Convert "ten" to 10 and change \`hours_volunteered\` to numeric.
# 4. Treat ages below 13 or above 100 as invalid (replace with np.nan).
# 5. Remove rows missing a name. Remove duplicate rows.
`,    'w3_3-0': `# Practice: Mini Data Pipeline
import pandas as pd
import numpy as np

raw_data = pd.DataFrame({
    "user_id": [101, 102, 103, 104, 105, 105, 106, 107],
    "name": ["Ari", "Bataa", "Caraa", "Davaa", "Enkh", "Enkh", "Faraa", None],
    "age": [16, 17, 150, 15, np.nan, np.nan, 18, 20],
    "hours_online": [3.5, 7.0, -2.0, "five", 4.5, 4.5, np.nan, 6.0],
    "subscription": ["free", "premium", "free", "basic", "premium", "premium", "basic", "free"]
})

# FINAL CHALLENGE:
# 1. Convert hours_online to numeric.
# 2. Replace negative hours and ages > 100 with np.nan.
# 3. Fill missing ages and hours with their respective medians.
# 4. Drop duplicates by user_id.
# 5. Create 'daily_cost' based on subscription (free: 0, basic: 0.5, premium: 1.0) using np.select or map.
`,    'w3_4-0': `# Intermediate: Game Scoreboard
import pandas as pd
import numpy as np

rng = np.random.default_rng(2026)
players = np.array(["Ari", "Bataa", "Caraa", "Davaa", "Enkh", "Faraa"])
round_scores = rng.integers(0, 101, size=(6, 5))

# 1. Build a DataFrame with players as its index and columns round_1 through round_5.
# 2. Add 'total', 'mean', 'best_round', and 'worst_round' columns.
# 3. Add a 'rank' column, where rank 1 is the highest total (use df['total'].rank(ascending=False)).
`,    'w3_4-1': `# Complex: Product Inventory Validation
import pandas as pd
import numpy as np

inventory = pd.DataFrame({
    "product_id": np.arange(101, 109),
    "product": ["Tea", "Coffee", "Juice", "Milk", "Bread", "Rice", "Eggs", "Salt"],
    "price": [4.5, 8.0, 3.2, 2.8, 1.5, 10.0, 6.5, 1.2],
    "stock": [20, -3, 15, np.nan, 50, 10, 12, 200],
    "reorder_level": [5, 5, 8, 10, 20, 3, 6, 25]
})

# 1. Replace missing or negative stock with 0.
# 2. Add inventory_value = price * stock.
# 3. Add a boolean column \`needs_reorder\` (stock <= reorder_level).
# 4. Use np.clip to cap stock at 100 for a separate \`stock_capped\` column.
`,    'w3_5-0': `# Intermediate: Game Scoreboard
import pandas as pd
import numpy as np

rng = np.random.default_rng(2026)
players = np.array(["Ari", "Bataa", "Caraa", "Davaa", "Enkh", "Faraa"])
round_scores = rng.integers(0, 101, size=(6, 5))

# 1. Build a DataFrame with players as its index and columns round_1 through round_5.
# 2. Add 'total', 'mean', 'best_round', and 'worst_round' columns.
# 3. Add a 'rank' column, where rank 1 is the highest total (use df['total'].rank(ascending=False)).
`,    'w3_5-1': `# Complex: Product Inventory Validation
import pandas as pd
import numpy as np

inventory = pd.DataFrame({
    "product_id": np.arange(101, 109),
    "product": ["Tea", "Coffee", "Juice", "Milk", "Bread", "Rice", "Eggs", "Salt"],
    "price": [4.5, 8.0, 3.2, 2.8, 1.5, 10.0, 6.5, 1.2],
    "stock": [20, -3, 15, np.nan, 50, 10, 12, 200],
    "reorder_level": [5, 5, 8, 10, 20, 3, 6, 25]
})

# 1. Replace missing or negative stock with 0.
# 2. Add inventory_value = price * stock.
# 3. Add a boolean column \`needs_reorder\` (stock <= reorder_level).
# 4. Use np.clip to cap stock at 100 for a separate \`stock_capped\` column.
`,    'w3_6-0': `# Practice: Mini Data Pipeline
import pandas as pd
import numpy as np

raw_data = pd.DataFrame({
    "user_id": [101, 102, 103, 104, 105, 105, 106, 107],
    "name": ["Ari", "Bataa", "Caraa", "Davaa", "Enkh", "Enkh", "Faraa", None],
    "age": [16, 17, 150, 15, np.nan, np.nan, 18, 20],
    "hours_online": [3.5, 7.0, -2.0, "five", 4.5, 4.5, np.nan, 6.0],
    "subscription": ["free", "premium", "free", "basic", "premium", "premium", "basic", "free"]
})

# FINAL CHALLENGE:
# 1. Convert hours_online to numeric.
# 2. Replace negative hours and ages > 100 with np.nan.
# 3. Fill missing ages and hours with their respective medians.
# 4. Drop duplicates by user_id.
# 5. Create 'daily_cost' based on subscription (free: 0, basic: 0.5, premium: 1.0) using np.select or map.
`,    'w3_7-0': `# Intermediate: Game Scoreboard
import pandas as pd
import numpy as np

rng = np.random.default_rng(2026)
players = np.array(["Ari", "Bataa", "Caraa", "Davaa", "Enkh", "Faraa"])
round_scores = rng.integers(0, 101, size=(6, 5))

# 1. Build a DataFrame with players as its index and columns round_1 through round_5.
# 2. Add 'total', 'mean', 'best_round', and 'worst_round' columns.
# 3. Add a 'rank' column, where rank 1 is the highest total (use df['total'].rank(ascending=False)).
`,    'w3_7-1': `# Complex: Product Inventory Validation
import pandas as pd
import numpy as np

inventory = pd.DataFrame({
    "product_id": np.arange(101, 109),
    "product": ["Tea", "Coffee", "Juice", "Milk", "Bread", "Rice", "Eggs", "Salt"],
    "price": [4.5, 8.0, 3.2, 2.8, 1.5, 10.0, 6.5, 1.2],
    "stock": [20, -3, 15, np.nan, 50, 10, 12, 200],
    "reorder_level": [5, 5, 8, 10, 20, 3, 6, 25]
})

# 1. Replace missing or negative stock with 0.
# 2. Add inventory_value = price * stock.
# 3. Add a boolean column \`needs_reorder\` (stock <= reorder_level).
# 4. Use np.clip to cap stock at 100 for a separate \`stock_capped\` column.
`,    'w3_8-0': `# Practice: Mini Data Pipeline
import pandas as pd
import numpy as np

raw_data = pd.DataFrame({
    "user_id": [101, 102, 103, 104, 105, 105, 106, 107],
    "name": ["Ari", "Bataa", "Caraa", "Davaa", "Enkh", "Enkh", "Faraa", None],
    "age": [16, 17, 150, 15, np.nan, np.nan, 18, 20],
    "hours_online": [3.5, 7.0, -2.0, "five", 4.5, 4.5, np.nan, 6.0],
    "subscription": ["free", "premium", "free", "basic", "premium", "premium", "basic", "free"]
})

# FINAL CHALLENGE:
# 1. Convert hours_online to numeric.
# 2. Replace negative hours and ages > 100 with np.nan.
# 3. Fill missing ages and hours with their respective medians.
# 4. Drop duplicates by user_id.
# 5. Create 'daily_cost' based on subscription (free: 0, basic: 0.5, premium: 1.0) using np.select or map.
`,    'w6_0-0': `# Easy Practice: Getting Started with Scikit-learn
import pandas as pd
import numpy as np

# Write your code below to practice the concepts from the textbook:
`,    'w6_0-1': `# Complex Practice: Getting Started with Scikit-learn
import pandas as pd
import numpy as np

# Think of an edge case or dirty dataset and apply Getting Started with Scikit-learn to clean it.
`,    'w6_1-0': `# Easy Practice: Pipeline Documentation
import pandas as pd
import numpy as np

# Write your code below to practice the concepts from the textbook:
`,    'w6_1-1': `# Complex Practice: Pipeline Documentation
import pandas as pd
import numpy as np

# Think of an edge case or dirty dataset and apply Pipeline Documentation to clean it.
`,    'w6_2-0': `# Easy Practice: ColumnTransformer Documentation
import pandas as pd
import numpy as np

# Write your code below to practice the concepts from the textbook:
`,    'w6_2-1': `# Complex Practice: ColumnTransformer Documentation
import pandas as pd
import numpy as np

# Think of an edge case or dirty dataset and apply ColumnTransformer Documentation to clean it.
`,    'w6_3-0': `# Easy Practice: Preprocessing Data
import pandas as pd
import numpy as np

# Write your code below to practice the concepts from the textbook:
`,    'w6_3-1': `# Complex Practice: Preprocessing Data
import pandas as pd
import numpy as np

# Think of an edge case or dirty dataset and apply Preprocessing Data to clean it.
`,    'w6_4-0': `# Easy Practice: Train Test Split
import pandas as pd
import numpy as np

# Write your code below to practice the concepts from the textbook:
`,    'w6_4-1': `# Complex Practice: Train Test Split
import pandas as pd
import numpy as np

# Think of an edge case or dirty dataset and apply Train Test Split to clean it.
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
