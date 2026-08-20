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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: 2. Introduction to NumPy</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Restaurant Orders</strong>\n1. Implement the basic functionality of 2. Introduction to NumPy.
            </div>
            <div class="editor-container" id="editor-w2_00-0"></div>
            <div class="controls"><button onclick="runCode('w2_00-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_00-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_00-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: 2. Introduction to NumPy</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Restaurant Orders</strong>\n1. Handle edge cases for 2. Introduction to NumPy.
            </div>
            <div class="editor-container" id="editor-w2_00-1"></div>
            <div class="controls"><button onclick="runCode('w2_00-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_00-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_00-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: 2. Introduction to NumPy</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Restaurant Orders</strong>\n1. Combine 2. Introduction to NumPy with boolean masks.
            </div>
            <div class="editor-container" id="editor-w2_00-2"></div>
            <div class="controls"><button onclick="runCode('w2_00-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_00-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_00-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: NumPy - 2. Introduction to NumPy</strong><br>You must write a fully vectorized solution (NO loops allowed) that processes the raw data, identifies statistical outliers (values > 2 standard deviations from the median), replaces them with the rolling mean, and reshapes the final array into a 3D tensor representing (batches, rows, columns). <br>You must prove your mastery of <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">2. Introduction to NumPy</code> by integrating it deeply into this pipeline. If your solution uses a <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">for</code> loop, you fail.
            </div>
            <div class="editor-container" id="editor-w2_00-3"></div>
            <div class="controls"><button onclick="runCode('w2_00-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_00-3"></div>
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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: Array Creation and Inspection</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Music Library</strong><br>You are collecting raw numerical readings.<br>1. Convert <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">prices</code> to a NumPy array of type float32.<br>2. Print the shape, ndim, dtype, and itemsize of the array.<br>3. Create a 3x3 array of zeros of type int8.
            </div>
            <div class="editor-container" id="editor-w2_01-0"></div>
            <div class="controls"><button onclick="runCode('w2_01-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_01-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_01-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: Indexing and Slicing</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Music Library</strong><br>You have a 2D matrix of data that needs segmentation.<br>1. Print the original 5x5 matrix.<br>2. Extract the first row and the last column.<br>3. Extract a 2x2 sub-matrix from the top-right corner.<br>4. Reverse the order of the rows in the matrix.
            </div>
            <div class="editor-container" id="editor-w2_01-1"></div>
            <div class="controls"><button onclick="runCode('w2_01-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_01-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_01-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: Reshaping and Copies</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Music Library</strong><br>You are streaming hourly data that must be structured.<br>1. Reshape <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">raw_stream</code> into a 3D array of shape (3, 4, 3) representing (days, hours, sensors).<br>2. Extract the data for the second day (index 1).<br>3. Create a completely independent copy (not a view) of the first day's data.<br>4. Modify a value in the copy and prove the original <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">raw_stream</code> is unchanged.
            </div>
            <div class="editor-container" id="editor-w2_01-2"></div>
            <div class="controls"><button onclick="runCode('w2_01-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_01-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_01-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: NumPy - Understanding Data Types in Python</strong><br>You must write a fully vectorized solution (NO loops allowed) that processes the raw data, identifies statistical outliers (values > 2 standard deviations from the median), replaces them with the rolling mean, and reshapes the final array into a 3D tensor representing (batches, rows, columns). <br>You must prove your mastery of <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">Understanding Data Types in Python</code> by integrating it deeply into this pipeline. If your solution uses a <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">for</code> loop, you fail.
            </div>
            <div class="editor-container" id="editor-w2_01-3"></div>
            <div class="controls"><button onclick="runCode('w2_01-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_01-3"></div>
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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: Array Creation and Inspection</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Zoo Animal Diet</strong><br>You are collecting raw numerical readings.<br>1. Convert <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">prices</code> to a NumPy array of type float32.<br>2. Print the shape, ndim, dtype, and itemsize of the array.<br>3. Create a 3x3 array of zeros of type int8.
            </div>
            <div class="editor-container" id="editor-w2_02-0"></div>
            <div class="controls"><button onclick="runCode('w2_02-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_02-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_02-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: Indexing and Slicing</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Zoo Animal Diet</strong><br>You have a 2D matrix of data that needs segmentation.<br>1. Print the original 5x5 matrix.<br>2. Extract the first row and the last column.<br>3. Extract a 2x2 sub-matrix from the top-right corner.<br>4. Reverse the order of the rows in the matrix.
            </div>
            <div class="editor-container" id="editor-w2_02-1"></div>
            <div class="controls"><button onclick="runCode('w2_02-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_02-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_02-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: Reshaping and Copies</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Zoo Animal Diet</strong><br>You are streaming hourly data that must be structured.<br>1. Reshape <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">raw_stream</code> into a 3D array of shape (3, 4, 3) representing (days, hours, sensors).<br>2. Extract the data for the second day (index 1).<br>3. Create a completely independent copy (not a view) of the first day's data.<br>4. Modify a value in the copy and prove the original <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">raw_stream</code> is unchanged.
            </div>
            <div class="editor-container" id="editor-w2_02-2"></div>
            <div class="controls"><button onclick="runCode('w2_02-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_02-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_02-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: NumPy - The Basics of NumPy Arrays</strong><br>You must write a fully vectorized solution (NO loops allowed) that processes the raw data, identifies statistical outliers (values > 2 standard deviations from the median), replaces them with the rolling mean, and reshapes the final array into a 3D tensor representing (batches, rows, columns). <br>You must prove your mastery of <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">The Basics of NumPy Arrays</code> by integrating it deeply into this pipeline. If your solution uses a <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">for</code> loop, you fail.
            </div>
            <div class="editor-container" id="editor-w2_02-3"></div>
            <div class="controls"><button onclick="runCode('w2_02-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_02-3"></div>
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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: Vectorized Arithmetic</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Social Media Posts</strong><br>1. Multiply all <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">base_values</code> by the <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">multiplier</code> without using loops.<br>2. Add 50 to the result.<br>3. Round the final values to 1 decimal place using <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">np.round</code>.
            </div>
            <div class="editor-container" id="editor-w2_03-0"></div>
            <div class="controls"><button onclick="runCode('w2_03-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_03-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_03-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: Ufuncs and Broadcasting</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Social Media Posts</strong><br>1. Add the vector to the matrix (Broadcasting).<br>2. Compute the natural logarithm (<code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">np.log</code>) of the resulting matrix.<br>3. Explain in a comment how broadcasting matched the shapes.
            </div>
            <div class="editor-container" id="editor-w2_03-1"></div>
            <div class="controls"><button onclick="runCode('w2_03-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_03-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_03-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: Advanced Ufuncs</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Social Media Posts</strong><br>1. Use <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">np.power</code> to square every element in x.<br>2. Use <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">np.sin</code> and <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">np.cos</code> to compute <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">sin(x)^2 + cos(x)^2</code>.<br>3. Verify that all results in step 2 are exactly (or close to) 1.0.<br>4. Find the sum of all elements using <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">np.add.reduce</code>.
            </div>
            <div class="editor-container" id="editor-w2_03-2"></div>
            <div class="controls"><button onclick="runCode('w2_03-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_03-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_03-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: NumPy - Computation on NumPy Arrays: Universal Functions</strong><br>You must write a fully vectorized solution (NO loops allowed) that processes the raw data, identifies statistical outliers (values > 2 standard deviations from the median), replaces them with the rolling mean, and reshapes the final array into a 3D tensor representing (batches, rows, columns). <br>You must prove your mastery of <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">Computation on NumPy Arrays: Universal Functions</code> by integrating it deeply into this pipeline. If your solution uses a <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">for</code> loop, you fail.
            </div>
            <div class="editor-container" id="editor-w2_03-3"></div>
            <div class="controls"><button onclick="runCode('w2_03-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_03-3"></div>
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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: Simple Aggregations</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Streaming Service Views</strong><br>1. Find the min, max, and mean of the scores.<br>2. Find the index of the highest score using <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">np.argmax</code>.<br>3. Find the median score using <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">np.median</code>.
            </div>
            <div class="editor-container" id="editor-w2_04-0"></div>
            <div class="controls"><button onclick="runCode('w2_04-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_04-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_04-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: Axis Aggregations</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Streaming Service Views</strong><br>1. Calculate the mean score for each student (axis=1). Notice what NaN does.<br>2. Use <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">np.nanmean</code> to calculate the mean score for each student while ignoring NaNs.<br>3. Find the maximum score achieved on each exam (axis=0) using <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">np.nanmax</code>.
            </div>
            <div class="editor-container" id="editor-w2_04-1"></div>
            <div class="controls"><button onclick="runCode('w2_04-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_04-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_04-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: Multi-dimensional Aggregations</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Streaming Service Views</strong><br>1. Find the total sum of all elements.<br>2. Find the maximum value for each week (reduce across days and hours).<br>3. Find the average value for each hour of the day (average across weeks and days).<br>4. Verify the shape of the result from step 3 is (8,).
            </div>
            <div class="editor-container" id="editor-w2_04-2"></div>
            <div class="controls"><button onclick="runCode('w2_04-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_04-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_04-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: NumPy - Aggregations: Min, Max, and Everything In Between</strong><br>You must write a fully vectorized solution (NO loops allowed) that processes the raw data, identifies statistical outliers (values > 2 standard deviations from the median), replaces them with the rolling mean, and reshapes the final array into a 3D tensor representing (batches, rows, columns). <br>You must prove your mastery of <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">Aggregations: Min, Max, and Everything In Between</code> by integrating it deeply into this pipeline. If your solution uses a <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">for</code> loop, you fail.
            </div>
            <div class="editor-container" id="editor-w2_04-3"></div>
            <div class="controls"><button onclick="runCode('w2_04-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_04-3"></div>
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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: Vectorized Arithmetic</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Gym Memberships</strong><br>1. Multiply all <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">base_values</code> by the <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">multiplier</code> without using loops.<br>2. Add 50 to the result.<br>3. Round the final values to 1 decimal place using <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">np.round</code>.
            </div>
            <div class="editor-container" id="editor-w2_05-0"></div>
            <div class="controls"><button onclick="runCode('w2_05-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_05-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_05-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: Ufuncs and Broadcasting</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Gym Memberships</strong><br>1. Add the vector to the matrix (Broadcasting).<br>2. Compute the natural logarithm (<code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">np.log</code>) of the resulting matrix.<br>3. Explain in a comment how broadcasting matched the shapes.
            </div>
            <div class="editor-container" id="editor-w2_05-1"></div>
            <div class="controls"><button onclick="runCode('w2_05-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_05-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_05-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: Advanced Ufuncs</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Gym Memberships</strong><br>1. Use <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">np.power</code> to square every element in x.<br>2. Use <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">np.sin</code> and <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">np.cos</code> to compute <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">sin(x)^2 + cos(x)^2</code>.<br>3. Verify that all results in step 2 are exactly (or close to) 1.0.<br>4. Find the sum of all elements using <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">np.add.reduce</code>.
            </div>
            <div class="editor-container" id="editor-w2_05-2"></div>
            <div class="controls"><button onclick="runCode('w2_05-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_05-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_05-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: NumPy - Computation on Arrays: Broadcasting</strong><br>You must write a fully vectorized solution (NO loops allowed) that processes the raw data, identifies statistical outliers (values > 2 standard deviations from the median), replaces them with the rolling mean, and reshapes the final array into a 3D tensor representing (batches, rows, columns). <br>You must prove your mastery of <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">Computation on Arrays: Broadcasting</code> by integrating it deeply into this pipeline. If your solution uses a <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">for</code> loop, you fail.
            </div>
            <div class="editor-container" id="editor-w2_05-3"></div>
            <div class="controls"><button onclick="runCode('w2_05-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_05-3"></div>
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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: Boolean Masks</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Bank Loan Approvals</strong><br>1. Create a boolean mask for ages >= 18.<br>2. Print the mask itself.<br>3. Use the mask to extract and print only the adult ages.
            </div>
            <div class="editor-container" id="editor-w2_06-0"></div>
            <div class="controls"><button onclick="runCode('w2_06-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_06-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_06-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: Compound Logic</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Bank Loan Approvals</strong><br>1. Create a mask for temperatures that are "comfortable": between 15 and 25 inclusive.<br>2. Use the mask to extract the comfortable temperatures.<br>3. Count how many comfortable temperatures there are using <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">np.count_nonzero()</code>.<br>4. Use bitwise OR (|) to find temperatures that are extreme (<-5 OR >35).
            </div>
            <div class="editor-container" id="editor-w2_06-1"></div>
            <div class="controls"><button onclick="runCode('w2_06-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_06-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_06-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: np.where and Conditional Assignment</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Bank Loan Approvals</strong><br>1. Use <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">np.where</code> to create a new array: if value > 120, set to "High", else "Normal".<br>2. Replace all values in the original array that are negative with 0 (using boolean indexing).<br>3. Use <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">np.clip</code> to restrict the array values to a minimum of 50 and maximum of 150.
            </div>
            <div class="editor-container" id="editor-w2_06-2"></div>
            <div class="controls"><button onclick="runCode('w2_06-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_06-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_06-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: NumPy - Comparisons, Masks, and Boolean Logic</strong><br>You must write a fully vectorized solution (NO loops allowed) that processes the raw data, identifies statistical outliers (values > 2 standard deviations from the median), replaces them with the rolling mean, and reshapes the final array into a 3D tensor representing (batches, rows, columns). <br>You must prove your mastery of <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">Comparisons, Masks, and Boolean Logic</code> by integrating it deeply into this pipeline. If your solution uses a <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">for</code> loop, you fail.
            </div>
            <div class="editor-container" id="editor-w2_06-3"></div>
            <div class="controls"><button onclick="runCode('w2_06-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_06-3"></div>
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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: Fancy Indexing 1D</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Hotel Bookings</strong><br>1. Use the <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">indices</code> list to extract elements "A", "D", and "F" in one operation.<br>2. Create a new index array <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">[5, 5, 5]</code> and use it to extract "F" three times.
            </div>
            <div class="editor-container" id="editor-w2_07-0"></div>
            <div class="controls"><button onclick="runCode('w2_07-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_07-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_07-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: Fancy Indexing 2D</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Hotel Bookings</strong><br>1. Extract the elements at coordinates (0,1), (2,3), and (4,4) using two arrays of indices.<br>2. Extract the entire 1st and 3rd rows using fancy indexing.<br>3. Reorder the columns of the matrix to be in the order: 4, 3, 2, 1, 0.
            </div>
            <div class="editor-container" id="editor-w2_07-1"></div>
            <div class="controls"><button onclick="runCode('w2_07-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_07-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_07-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: Combined Indexing</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Hotel Bookings</strong><br>1. Combine fancy indexing and slicing: Extract rows [0, 2, 4] and columns 1 through 3.<br>2. Combine fancy indexing and masking: Select rows [1, 3, 5], then keep only values > 50.<br>3. Modify the original matrix: set all elements at coordinates (1,1), (2,2), (3,3) to 999.
            </div>
            <div class="editor-container" id="editor-w2_07-2"></div>
            <div class="controls"><button onclick="runCode('w2_07-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_07-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_07-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: NumPy - Fancy Indexing</strong><br>You must write a fully vectorized solution (NO loops allowed) that processes the raw data, identifies statistical outliers (values > 2 standard deviations from the median), replaces them with the rolling mean, and reshapes the final array into a 3D tensor representing (batches, rows, columns). <br>You must prove your mastery of <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">Fancy Indexing</code> by integrating it deeply into this pipeline. If your solution uses a <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">for</code> loop, you fail.
            </div>
            <div class="editor-container" id="editor-w2_07-3"></div>
            <div class="controls"><button onclick="runCode('w2_07-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_07-3"></div>
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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: Basic Sorting</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Retail Store Stock</strong><br>1. Use <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">np.sort()</code> to return a sorted copy of the data.<br>2. Call the <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">.sort()</code> method on the array to sort it in-place.<br>3. Verify the array is sorted.
            </div>
            <div class="editor-container" id="editor-w2_08-0"></div>
            <div class="controls"><button onclick="runCode('w2_08-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_08-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_08-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: argsort</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Retail Store Stock</strong><br>1. Use <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">np.argsort()</code> on the <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">scores</code> array to get the sorted indices.<br>2. Use those indices to print the <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">names</code> array in order of lowest to highest score.<br>3. Reverse the indices to print the names from highest to lowest score.
            </div>
            <div class="editor-container" id="editor-w2_08-1"></div>
            <div class="controls"><button onclick="runCode('w2_08-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_08-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_08-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: Multi-dimensional Sorting</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Retail Store Stock</strong><br>1. Sort each column of the matrix independently (axis=0).<br>2. Sort each row of the matrix independently (axis=1).<br>3. Sort the entire matrix ROWS based entirely on the values in the 2nd column. (Hint: Use argsort on the 2nd column, then fancy index the rows).
            </div>
            <div class="editor-container" id="editor-w2_08-2"></div>
            <div class="controls"><button onclick="runCode('w2_08-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_08-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_08-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: NumPy - Sorting Arrays</strong><br>You must write a fully vectorized solution (NO loops allowed) that processes the raw data, identifies statistical outliers (values > 2 standard deviations from the median), replaces them with the rolling mean, and reshapes the final array into a 3D tensor representing (batches, rows, columns). <br>You must prove your mastery of <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">Sorting Arrays</code> by integrating it deeply into this pipeline. If your solution uses a <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">for</code> loop, you fail.
            </div>
            <div class="editor-container" id="editor-w2_08-3"></div>
            <div class="controls"><button onclick="runCode('w2_08-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_08-3"></div>
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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: Structured Data: NumPy's Structured Arrays</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Hospital Pharmacy</strong>\n1. Implement the basic functionality of Structured Data: NumPy's Structured Arrays.
            </div>
            <div class="editor-container" id="editor-w2_09-0"></div>
            <div class="controls"><button onclick="runCode('w2_09-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_09-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_09-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: Structured Data: NumPy's Structured Arrays</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Hospital Pharmacy</strong>\n1. Handle edge cases for Structured Data: NumPy's Structured Arrays.
            </div>
            <div class="editor-container" id="editor-w2_09-1"></div>
            <div class="controls"><button onclick="runCode('w2_09-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_09-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_09-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: Structured Data: NumPy's Structured Arrays</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Hospital Pharmacy</strong>\n1. Combine Structured Data: NumPy's Structured Arrays with boolean masks.
            </div>
            <div class="editor-container" id="editor-w2_09-2"></div>
            <div class="controls"><button onclick="runCode('w2_09-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_09-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w2_09-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: NumPy - Structured Data: NumPy's Structured Arrays</strong><br>You must write a fully vectorized solution (NO loops allowed) that processes the raw data, identifies statistical outliers (values > 2 standard deviations from the median), replaces them with the rolling mean, and reshapes the final array into a 3D tensor representing (batches, rows, columns). <br>You must prove your mastery of <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">Structured Data: NumPy's Structured Arrays</code> by integrating it deeply into this pipeline. If your solution uses a <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">for</code> loop, you fail.
            </div>
            <div class="editor-container" id="editor-w2_09-3"></div>
            <div class="controls"><button onclick="runCode('w2_09-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_09-3"></div>
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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: 4. Visualization with Matplotlib</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Implement the plotting basics for 4. Visualization with Matplotlib. (Note: Plots don't render in the browser sandbox, but write the correct code).
            </div>
            <div class="editor-container" id="editor-w4_00-0"></div>
            <div class="controls"><button onclick="runCode('w4_00-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_00-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_00-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: 4. Visualization with Matplotlib</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Add labels, titles, and legends.
            </div>
            <div class="editor-container" id="editor-w4_00-1"></div>
            <div class="controls"><button onclick="runCode('w4_00-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_00-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_00-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: 4. Visualization with Matplotlib</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Create multiple subplots.
            </div>
            <div class="editor-container" id="editor-w4_00-2"></div>
            <div class="controls"><button onclick="runCode('w4_00-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_00-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_00-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: Matplotlib - 4. Visualization with Matplotlib</strong><br>Create publication-ready visualizations. You must implement a multi-axis subplot layout (using GridSpec), apply custom styling, map a third continuous variable to a colorbar, and annotate the specific global maximum using arrows and text.
            </div>
            <div class="editor-container" id="editor-w4_00-3"></div>
            <div class="controls"><button onclick="runCode('w4_00-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_00-3"></div>
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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: Simple Line Plots</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Implement the plotting basics for Simple Line Plots. (Note: Plots don't render in the browser sandbox, but write the correct code).
            </div>
            <div class="editor-container" id="editor-w4_01-0"></div>
            <div class="controls"><button onclick="runCode('w4_01-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_01-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_01-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: Simple Line Plots</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Add labels, titles, and legends.
            </div>
            <div class="editor-container" id="editor-w4_01-1"></div>
            <div class="controls"><button onclick="runCode('w4_01-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_01-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_01-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: Simple Line Plots</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Create multiple subplots.
            </div>
            <div class="editor-container" id="editor-w4_01-2"></div>
            <div class="controls"><button onclick="runCode('w4_01-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_01-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_01-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: Matplotlib - Simple Line Plots</strong><br>Create publication-ready visualizations. You must implement a multi-axis subplot layout (using GridSpec), apply custom styling, map a third continuous variable to a colorbar, and annotate the specific global maximum using arrows and text.
            </div>
            <div class="editor-container" id="editor-w4_01-3"></div>
            <div class="controls"><button onclick="runCode('w4_01-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_01-3"></div>
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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: Simple Scatter Plots</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Implement the plotting basics for Simple Scatter Plots. (Note: Plots don't render in the browser sandbox, but write the correct code).
            </div>
            <div class="editor-container" id="editor-w4_02-0"></div>
            <div class="controls"><button onclick="runCode('w4_02-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_02-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_02-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: Simple Scatter Plots</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Add labels, titles, and legends.
            </div>
            <div class="editor-container" id="editor-w4_02-1"></div>
            <div class="controls"><button onclick="runCode('w4_02-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_02-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_02-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: Simple Scatter Plots</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Create multiple subplots.
            </div>
            <div class="editor-container" id="editor-w4_02-2"></div>
            <div class="controls"><button onclick="runCode('w4_02-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_02-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_02-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: Matplotlib - Simple Scatter Plots</strong><br>Create publication-ready visualizations. You must implement a multi-axis subplot layout (using GridSpec), apply custom styling, map a third continuous variable to a colorbar, and annotate the specific global maximum using arrows and text.
            </div>
            <div class="editor-container" id="editor-w4_02-3"></div>
            <div class="controls"><button onclick="runCode('w4_02-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_02-3"></div>
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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: Visualizing Errors</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Implement the plotting basics for Visualizing Errors. (Note: Plots don't render in the browser sandbox, but write the correct code).
            </div>
            <div class="editor-container" id="editor-w4_03-0"></div>
            <div class="controls"><button onclick="runCode('w4_03-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_03-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_03-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: Visualizing Errors</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Add labels, titles, and legends.
            </div>
            <div class="editor-container" id="editor-w4_03-1"></div>
            <div class="controls"><button onclick="runCode('w4_03-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_03-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_03-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: Visualizing Errors</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Create multiple subplots.
            </div>
            <div class="editor-container" id="editor-w4_03-2"></div>
            <div class="controls"><button onclick="runCode('w4_03-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_03-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_03-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: Matplotlib - Visualizing Errors</strong><br>Create publication-ready visualizations. You must implement a multi-axis subplot layout (using GridSpec), apply custom styling, map a third continuous variable to a colorbar, and annotate the specific global maximum using arrows and text.
            </div>
            <div class="editor-container" id="editor-w4_03-3"></div>
            <div class="controls"><button onclick="runCode('w4_03-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_03-3"></div>
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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: Density and Contour Plots</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Implement the plotting basics for Density and Contour Plots. (Note: Plots don't render in the browser sandbox, but write the correct code).
            </div>
            <div class="editor-container" id="editor-w4_04-0"></div>
            <div class="controls"><button onclick="runCode('w4_04-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_04-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_04-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: Density and Contour Plots</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Add labels, titles, and legends.
            </div>
            <div class="editor-container" id="editor-w4_04-1"></div>
            <div class="controls"><button onclick="runCode('w4_04-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_04-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_04-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: Density and Contour Plots</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Create multiple subplots.
            </div>
            <div class="editor-container" id="editor-w4_04-2"></div>
            <div class="controls"><button onclick="runCode('w4_04-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_04-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_04-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: Matplotlib - Density and Contour Plots</strong><br>Create publication-ready visualizations. You must implement a multi-axis subplot layout (using GridSpec), apply custom styling, map a third continuous variable to a colorbar, and annotate the specific global maximum using arrows and text.
            </div>
            <div class="editor-container" id="editor-w4_04-3"></div>
            <div class="controls"><button onclick="runCode('w4_04-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_04-3"></div>
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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: Histograms, Binnings, and Density</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Implement the plotting basics for Histograms, Binnings, and Density. (Note: Plots don't render in the browser sandbox, but write the correct code).
            </div>
            <div class="editor-container" id="editor-w4_05-0"></div>
            <div class="controls"><button onclick="runCode('w4_05-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_05-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_05-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: Histograms, Binnings, and Density</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Add labels, titles, and legends.
            </div>
            <div class="editor-container" id="editor-w4_05-1"></div>
            <div class="controls"><button onclick="runCode('w4_05-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_05-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_05-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: Histograms, Binnings, and Density</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Create multiple subplots.
            </div>
            <div class="editor-container" id="editor-w4_05-2"></div>
            <div class="controls"><button onclick="runCode('w4_05-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_05-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_05-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: Matplotlib - Histograms, Binnings, and Density</strong><br>Create publication-ready visualizations. You must implement a multi-axis subplot layout (using GridSpec), apply custom styling, map a third continuous variable to a colorbar, and annotate the specific global maximum using arrows and text.
            </div>
            <div class="editor-container" id="editor-w4_05-3"></div>
            <div class="controls"><button onclick="runCode('w4_05-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_05-3"></div>
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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: Customizing Plot Legends</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Implement the plotting basics for Customizing Plot Legends. (Note: Plots don't render in the browser sandbox, but write the correct code).
            </div>
            <div class="editor-container" id="editor-w4_06-0"></div>
            <div class="controls"><button onclick="runCode('w4_06-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_06-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_06-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: Customizing Plot Legends</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Add labels, titles, and legends.
            </div>
            <div class="editor-container" id="editor-w4_06-1"></div>
            <div class="controls"><button onclick="runCode('w4_06-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_06-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_06-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: Customizing Plot Legends</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Create multiple subplots.
            </div>
            <div class="editor-container" id="editor-w4_06-2"></div>
            <div class="controls"><button onclick="runCode('w4_06-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_06-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_06-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: Matplotlib - Customizing Plot Legends</strong><br>Create publication-ready visualizations. You must implement a multi-axis subplot layout (using GridSpec), apply custom styling, map a third continuous variable to a colorbar, and annotate the specific global maximum using arrows and text.
            </div>
            <div class="editor-container" id="editor-w4_06-3"></div>
            <div class="controls"><button onclick="runCode('w4_06-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_06-3"></div>
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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: Customizing Colorbars</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Implement the plotting basics for Customizing Colorbars. (Note: Plots don't render in the browser sandbox, but write the correct code).
            </div>
            <div class="editor-container" id="editor-w4_07-0"></div>
            <div class="controls"><button onclick="runCode('w4_07-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_07-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_07-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: Customizing Colorbars</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Add labels, titles, and legends.
            </div>
            <div class="editor-container" id="editor-w4_07-1"></div>
            <div class="controls"><button onclick="runCode('w4_07-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_07-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_07-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: Customizing Colorbars</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Create multiple subplots.
            </div>
            <div class="editor-container" id="editor-w4_07-2"></div>
            <div class="controls"><button onclick="runCode('w4_07-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_07-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_07-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: Matplotlib - Customizing Colorbars</strong><br>Create publication-ready visualizations. You must implement a multi-axis subplot layout (using GridSpec), apply custom styling, map a third continuous variable to a colorbar, and annotate the specific global maximum using arrows and text.
            </div>
            <div class="editor-container" id="editor-w4_07-3"></div>
            <div class="controls"><button onclick="runCode('w4_07-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_07-3"></div>
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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: Multiple Subplots</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Implement the plotting basics for Multiple Subplots. (Note: Plots don't render in the browser sandbox, but write the correct code).
            </div>
            <div class="editor-container" id="editor-w4_08-0"></div>
            <div class="controls"><button onclick="runCode('w4_08-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_08-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_08-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: Multiple Subplots</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Add labels, titles, and legends.
            </div>
            <div class="editor-container" id="editor-w4_08-1"></div>
            <div class="controls"><button onclick="runCode('w4_08-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_08-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_08-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: Multiple Subplots</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Create multiple subplots.
            </div>
            <div class="editor-container" id="editor-w4_08-2"></div>
            <div class="controls"><button onclick="runCode('w4_08-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_08-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_08-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: Matplotlib - Multiple Subplots</strong><br>Create publication-ready visualizations. You must implement a multi-axis subplot layout (using GridSpec), apply custom styling, map a third continuous variable to a colorbar, and annotate the specific global maximum using arrows and text.
            </div>
            <div class="editor-container" id="editor-w4_08-3"></div>
            <div class="controls"><button onclick="runCode('w4_08-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_08-3"></div>
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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: Text and Annotation</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Implement the plotting basics for Text and Annotation. (Note: Plots don't render in the browser sandbox, but write the correct code).
            </div>
            <div class="editor-container" id="editor-w4_09-0"></div>
            <div class="controls"><button onclick="runCode('w4_09-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_09-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_09-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: Text and Annotation</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Add labels, titles, and legends.
            </div>
            <div class="editor-container" id="editor-w4_09-1"></div>
            <div class="controls"><button onclick="runCode('w4_09-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_09-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_09-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: Text and Annotation</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Create multiple subplots.
            </div>
            <div class="editor-container" id="editor-w4_09-2"></div>
            <div class="controls"><button onclick="runCode('w4_09-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_09-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_09-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: Matplotlib - Text and Annotation</strong><br>Create publication-ready visualizations. You must implement a multi-axis subplot layout (using GridSpec), apply custom styling, map a third continuous variable to a colorbar, and annotate the specific global maximum using arrows and text.
            </div>
            <div class="editor-container" id="editor-w4_09-3"></div>
            <div class="controls"><button onclick="runCode('w4_09-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_09-3"></div>
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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: Customizing Ticks</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Implement the plotting basics for Customizing Ticks. (Note: Plots don't render in the browser sandbox, but write the correct code).
            </div>
            <div class="editor-container" id="editor-w4_10-0"></div>
            <div class="controls"><button onclick="runCode('w4_10-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_10-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_10-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: Customizing Ticks</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Add labels, titles, and legends.
            </div>
            <div class="editor-container" id="editor-w4_10-1"></div>
            <div class="controls"><button onclick="runCode('w4_10-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_10-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_10-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: Customizing Ticks</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Create multiple subplots.
            </div>
            <div class="editor-container" id="editor-w4_10-2"></div>
            <div class="controls"><button onclick="runCode('w4_10-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_10-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_10-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: Matplotlib - Customizing Ticks</strong><br>Create publication-ready visualizations. You must implement a multi-axis subplot layout (using GridSpec), apply custom styling, map a third continuous variable to a colorbar, and annotate the specific global maximum using arrows and text.
            </div>
            <div class="editor-container" id="editor-w4_10-3"></div>
            <div class="controls"><button onclick="runCode('w4_10-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_10-3"></div>
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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: Customizing Matplotlib: Configurations and Stylesheets</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Implement the plotting basics for Customizing Matplotlib: Configurations and Stylesheets. (Note: Plots don't render in the browser sandbox, but write the correct code).
            </div>
            <div class="editor-container" id="editor-w4_11-0"></div>
            <div class="controls"><button onclick="runCode('w4_11-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_11-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_11-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: Customizing Matplotlib: Configurations and Stylesheets</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Add labels, titles, and legends.
            </div>
            <div class="editor-container" id="editor-w4_11-1"></div>
            <div class="controls"><button onclick="runCode('w4_11-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_11-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_11-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: Customizing Matplotlib: Configurations and Stylesheets</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Create multiple subplots.
            </div>
            <div class="editor-container" id="editor-w4_11-2"></div>
            <div class="controls"><button onclick="runCode('w4_11-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_11-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_11-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: Matplotlib - Customizing Matplotlib: Configurations and Stylesheets</strong><br>Create publication-ready visualizations. You must implement a multi-axis subplot layout (using GridSpec), apply custom styling, map a third continuous variable to a colorbar, and annotate the specific global maximum using arrows and text.
            </div>
            <div class="editor-container" id="editor-w4_11-3"></div>
            <div class="controls"><button onclick="runCode('w4_11-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_11-3"></div>
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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: Three-Dimensional Plotting in Matplotlib</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Implement the plotting basics for Three-Dimensional Plotting in Matplotlib. (Note: Plots don't render in the browser sandbox, but write the correct code).
            </div>
            <div class="editor-container" id="editor-w4_12-0"></div>
            <div class="controls"><button onclick="runCode('w4_12-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_12-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_12-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: Three-Dimensional Plotting in Matplotlib</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Add labels, titles, and legends.
            </div>
            <div class="editor-container" id="editor-w4_12-1"></div>
            <div class="controls"><button onclick="runCode('w4_12-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_12-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_12-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: Three-Dimensional Plotting in Matplotlib</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Create multiple subplots.
            </div>
            <div class="editor-container" id="editor-w4_12-2"></div>
            <div class="controls"><button onclick="runCode('w4_12-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_12-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_12-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: Matplotlib - Three-Dimensional Plotting in Matplotlib</strong><br>Create publication-ready visualizations. You must implement a multi-axis subplot layout (using GridSpec), apply custom styling, map a third continuous variable to a colorbar, and annotate the specific global maximum using arrows and text.
            </div>
            <div class="editor-container" id="editor-w4_12-3"></div>
            <div class="controls"><button onclick="runCode('w4_12-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_12-3"></div>
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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: Geographic Data with Basemap</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Implement the plotting basics for Geographic Data with Basemap. (Note: Plots don't render in the browser sandbox, but write the correct code).
            </div>
            <div class="editor-container" id="editor-w4_13-0"></div>
            <div class="controls"><button onclick="runCode('w4_13-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_13-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_13-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: Geographic Data with Basemap</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Add labels, titles, and legends.
            </div>
            <div class="editor-container" id="editor-w4_13-1"></div>
            <div class="controls"><button onclick="runCode('w4_13-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_13-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_13-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: Geographic Data with Basemap</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Create multiple subplots.
            </div>
            <div class="editor-container" id="editor-w4_13-2"></div>
            <div class="controls"><button onclick="runCode('w4_13-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_13-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_13-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: Matplotlib - Geographic Data with Basemap</strong><br>Create publication-ready visualizations. You must implement a multi-axis subplot layout (using GridSpec), apply custom styling, map a third continuous variable to a colorbar, and annotate the specific global maximum using arrows and text.
            </div>
            <div class="editor-container" id="editor-w4_13-3"></div>
            <div class="controls"><button onclick="runCode('w4_13-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_13-3"></div>
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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: Visualization with Seaborn</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Implement the plotting basics for Visualization with Seaborn. (Note: Plots don't render in the browser sandbox, but write the correct code).
            </div>
            <div class="editor-container" id="editor-w4_14-0"></div>
            <div class="controls"><button onclick="runCode('w4_14-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_14-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_14-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: Visualization with Seaborn</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Add labels, titles, and legends.
            </div>
            <div class="editor-container" id="editor-w4_14-1"></div>
            <div class="controls"><button onclick="runCode('w4_14-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_14-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_14-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: Visualization with Seaborn</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Create multiple subplots.
            </div>
            <div class="editor-container" id="editor-w4_14-2"></div>
            <div class="controls"><button onclick="runCode('w4_14-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_14-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_14-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: Matplotlib - Visualization with Seaborn</strong><br>Create publication-ready visualizations. You must implement a multi-axis subplot layout (using GridSpec), apply custom styling, map a third continuous variable to a colorbar, and annotate the specific global maximum using arrows and text.
            </div>
            <div class="editor-container" id="editor-w4_14-3"></div>
            <div class="controls"><button onclick="runCode('w4_14-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_14-3"></div>
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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: Further Resources</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Implement the plotting basics for Further Resources. (Note: Plots don't render in the browser sandbox, but write the correct code).
            </div>
            <div class="editor-container" id="editor-w4_15-0"></div>
            <div class="controls"><button onclick="runCode('w4_15-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_15-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_15-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: Further Resources</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Add labels, titles, and legends.
            </div>
            <div class="editor-container" id="editor-w4_15-1"></div>
            <div class="controls"><button onclick="runCode('w4_15-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_15-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_15-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: Further Resources</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Create multiple subplots.
            </div>
            <div class="editor-container" id="editor-w4_15-2"></div>
            <div class="controls"><button onclick="runCode('w4_15-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_15-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w4_15-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: Matplotlib - Further Resources</strong><br>Create publication-ready visualizations. You must implement a multi-axis subplot layout (using GridSpec), apply custom styling, map a third continuous variable to a colorbar, and annotate the specific global maximum using arrows and text.
            </div>
            <div class="editor-container" id="editor-w4_15-3"></div>
            <div class="controls"><button onclick="runCode('w4_15-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_15-3"></div>
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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: Series Construction</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Marketing Campaign ROI</strong><br>1. Convert the 'name' list from the data dict into a Pandas Series named <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">name_series</code>.<br>2. Print the first 3 elements of the Series.<br>3. Create a Series for 'salary' and find its mean.
            </div>
            <div class="editor-container" id="editor-w3_0-0"></div>
            <div class="controls"><button onclick="runCode('w3_0-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_0-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_0-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: DataFrame Construction</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Marketing Campaign ROI</strong><br>1. Convert the entire <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">data</code> dictionary into a Pandas DataFrame named <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">df</code>.<br>2. Print the <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">.shape</code>, <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">.columns</code>, and <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">.dtypes</code>.<br>3. Use <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">.head()</code> to show the first 4 rows.<br>4. Use <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">.info()</code> to inspect missing values.
            </div>
            <div class="editor-container" id="editor-w3_0-1"></div>
            <div class="controls"><button onclick="runCode('w3_0-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_0-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_0-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: DataFrame Operations</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Marketing Campaign ROI</strong><br>1. Convert <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">data</code> to a DataFrame <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">df</code>.<br>2. Set the index of the DataFrame to be the ID column.<br>3. Select only the numerical columns.<br>4. Sort the DataFrame by the last column in descending order.<br>5. Extract the top 3 rows into a new DataFrame.
            </div>
            <div class="editor-container" id="editor-w3_0-2"></div>
            <div class="controls"><button onclick="runCode('w3_0-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_0-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_0-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: Pandas - What kind of data does pandas handle?</strong><br>You have received a critically corrupt data dump. <br>1. Build a robust data pipeline function that implements <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">What kind of data does pandas handle?</code>.<br>2. You must simultaneously group by the primary category, impute missing values using group-specific distributions, detect and drop logical duplicates, and pivot the table.<br>3. You must write an assertion that verifies no data leakage occurred and that the final shape perfectly matches the expected business requirements.
            </div>
            <div class="editor-container" id="editor-w3_0-3"></div>
            <div class="controls"><button onclick="runCode('w3_0-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_0-3"></div>
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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: CSV Writing</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Bank Loan Approvals</strong><br>1. Convert <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">data</code> to a DataFrame <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">df</code>.<br>2. Save the DataFrame to a CSV string using <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">df.to_csv(index=False)</code>.<br>3. Print the resulting CSV string.
            </div>
            <div class="editor-container" id="editor-w3_1-0"></div>
            <div class="controls"><button onclick="runCode('w3_1-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_1-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_1-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: CSV Reading and Inspection</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Bank Loan Approvals</strong><br>1. Use <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">io.StringIO(csv_text)</code> to read the CSV into a DataFrame.<br>2. Inspect the dtypes. Notice that 'value' is an object (string) because of "invalid".<br>3. Convert 'value' to numeric using <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">pd.to_numeric(..., errors='coerce')</code>.<br>4. Check the dtypes again and print the missing value count.
            </div>
            <div class="editor-container" id="editor-w3_1-1"></div>
            <div class="controls"><button onclick="runCode('w3_1-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_1-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_1-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: JSON Round-Trip</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Bank Loan Approvals</strong><br>1. Convert <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">data</code> to a DataFrame <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">df</code>.<br>2. Export the DataFrame to JSON using <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">to_json(orient='records')</code>.<br>3. Read the JSON string back into a new DataFrame <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">df_json</code>.<br>4. Assert or verify that the shape and columns of <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">df_json</code> match the original <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">df</code>.<br>5. Explain in a comment why orient='records' is often preferred for web APIs.
            </div>
            <div class="editor-container" id="editor-w3_1-2"></div>
            <div class="controls"><button onclick="runCode('w3_1-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_1-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_1-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: Pandas - How do I read and write tabular data?</strong><br>You have received a critically corrupt data dump. <br>1. Build a robust data pipeline function that implements <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">How do I read and write tabular data?</code>.<br>2. You must simultaneously group by the primary category, impute missing values using group-specific distributions, detect and drop logical duplicates, and pivot the table.<br>3. You must write an assertion that verifies no data leakage occurred and that the final shape perfectly matches the expected business requirements.
            </div>
            <div class="editor-container" id="editor-w3_1-3"></div>
            <div class="controls"><button onclick="runCode('w3_1-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_1-3"></div>
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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: Selecting Columns</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Social Media Posts</strong><br>1. Create <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">df</code> from <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">data</code>.<br>2. Select just the first column (e.g. name or timestamp) as a Series.<br>3. Select the first column AND the last column as a DataFrame (use a list of columns).
            </div>
            <div class="editor-container" id="editor-w3_2-0"></div>
            <div class="controls"><button onclick="runCode('w3_2-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_2-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_2-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: loc vs iloc</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Social Media Posts</strong><br>1. Create <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">df</code> from <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">data</code>.<br>2. Change the index to be non-sequential (e.g., <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">df.index = [10, 20, 30...]</code>).<br>3. Use <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">.iloc</code> to select the exactly 3rd row (integer position).<br>4. Use <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">.loc</code> to select rows based on a specific label from your new index.<br>5. Use <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">.loc</code> to select the 3rd row BUT only the first two columns.
            </div>
            <div class="editor-container" id="editor-w3_2-1"></div>
            <div class="controls"><button onclick="runCode('w3_2-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_2-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_2-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: Boolean Filtering</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Social Media Posts</strong><br>1. Create <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">df</code> from <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">data</code>.<br>2. Filter the DataFrame to show only rows where the numerical column (salary, temp, or amount) is greater than its own mean.<br>3. Filter for rows where a categorical column equals a specific value, AND a numerical column is not null.<br>4. Use <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">.isin()</code> to filter for rows matching two different categorical values.<br>5. Reset the index of the final filtered DataFrame.
            </div>
            <div class="editor-container" id="editor-w3_2-2"></div>
            <div class="controls"><button onclick="runCode('w3_2-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_2-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_2-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: Pandas - How do I select a subset of a DataFrame?</strong><br>You have received a critically corrupt data dump. <br>1. Build a robust data pipeline function that implements <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">How do I select a subset of a DataFrame?</code>.<br>2. You must simultaneously group by the primary category, impute missing values using group-specific distributions, detect and drop logical duplicates, and pivot the table.<br>3. You must write an assertion that verifies no data leakage occurred and that the final shape perfectly matches the expected business requirements.
            </div>
            <div class="editor-container" id="editor-w3_2-3"></div>
            <div class="controls"><button onclick="runCode('w3_2-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_2-3"></div>
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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: How do I create plots in pandas?</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Implement the basics for How do I create plots in pandas?.
            </div>
            <div class="editor-container" id="editor-w3_3-0"></div>
            <div class="controls"><button onclick="runCode('w3_3-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_3-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_3-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: How do I create plots in pandas?</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Apply advanced concepts for How do I create plots in pandas?.
            </div>
            <div class="editor-container" id="editor-w3_3-1"></div>
            <div class="controls"><button onclick="runCode('w3_3-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_3-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_3-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: How do I create plots in pandas?</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Create a mini pipeline using How do I create plots in pandas?.
            </div>
            <div class="editor-container" id="editor-w3_3-2"></div>
            <div class="controls"><button onclick="runCode('w3_3-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_3-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_3-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: Pandas - How do I create plots in pandas?</strong><br>You have received a critically corrupt data dump. <br>1. Build a robust data pipeline function that implements <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">How do I create plots in pandas?</code>.<br>2. You must simultaneously group by the primary category, impute missing values using group-specific distributions, detect and drop logical duplicates, and pivot the table.<br>3. You must write an assertion that verifies no data leakage occurred and that the final shape perfectly matches the expected business requirements.
            </div>
            <div class="editor-container" id="editor-w3_3-3"></div>
            <div class="controls"><button onclick="runCode('w3_3-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_3-3"></div>
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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: Creating New Columns</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Crypto Portfolio</strong><br>1. Create <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">df</code> from <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">data</code>.<br>2. Create a new column that is exactly double the value of an existing numerical column.<br>3. Create a static column called <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">data_source</code> and set all its values to "System A".
            </div>
            <div class="editor-container" id="editor-w3_4-0"></div>
            <div class="controls"><button onclick="runCode('w3_4-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_4-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_4-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: Vectorized Logic</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Crypto Portfolio</strong><br>1. Create <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">df</code> from <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">data</code>.<br>2. Create a boolean column <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">is_high_value</code> which is True if the numerical column is greater than its mean.<br>3. Use <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">np.where()</code> to create a column <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">status_label</code>: if <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">is_high_value</code> is True, set to "Priority", else "Standard".
            </div>
            <div class="editor-container" id="editor-w3_4-1"></div>
            <div class="controls"><button onclick="runCode('w3_4-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_4-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_4-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: Complex Feature Engineering</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Crypto Portfolio</strong><br>1. Create <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">df = pd.DataFrame(data)</code>.<br>2. Clean the numerical column (fill NaNs).<br>3. Create a column <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">normalized_score</code>: subtract the min and divide by (max - min) for the numerical column.<br>4. Create a categorical column <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">band</code> using <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">pd.cut()</code> to divide the numerical column into 3 bins: 'Low', 'Medium', 'High'.
            </div>
            <div class="editor-container" id="editor-w3_4-2"></div>
            <div class="controls"><button onclick="runCode('w3_4-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_4-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_4-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: Pandas - How to create new columns derived from existing columns</strong><br>You have received a critically corrupt data dump. <br>1. Build a robust data pipeline function that implements <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">How to create new columns derived from existing columns</code>.<br>2. You must simultaneously group by the primary category, impute missing values using group-specific distributions, detect and drop logical duplicates, and pivot the table.<br>3. You must write an assertion that verifies no data leakage occurred and that the final shape perfectly matches the expected business requirements.
            </div>
            <div class="editor-container" id="editor-w3_4-3"></div>
            <div class="controls"><button onclick="runCode('w3_4-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_4-3"></div>
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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: Summary Statistics</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Music Library</strong><br>1. Create <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">df</code> from <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">data</code>.<br>2. Use <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">.describe()</code> to print summary statistics for all numeric columns.<br>3. Find the exact median of the numerical columns.<br>4. Use <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">.value_counts()</code> on one of the categorical columns to see the distribution.
            </div>
            <div class="editor-container" id="editor-w3_5-0"></div>
            <div class="controls"><button onclick="runCode('w3_5-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_5-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_5-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: GroupBy Basics</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Music Library</strong><br>1. Create <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">df</code> from <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">data</code>.<br>2. Group the DataFrame by one of the categorical columns.<br>3. Calculate the <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">.mean()</code> for the numerical columns within each group.<br>4. Calculate the <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">.count()</code> for each group to see how many records belong to each.
            </div>
            <div class="editor-container" id="editor-w3_5-1"></div>
            <div class="controls"><button onclick="runCode('w3_5-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_5-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_5-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: Advanced GroupBy and Aggregation</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Music Library</strong><br>1. Create <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">df</code> from <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">data</code>.<br>2. Group by the categorical column.<br>3. Use the <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">.agg()</code> method to simultaneously calculate the 'min', 'max', and 'mean' of a numerical column.<br>4. Sort the resulting grouped table by the 'mean' value in descending order.
            </div>
            <div class="editor-container" id="editor-w3_5-2"></div>
            <div class="controls"><button onclick="runCode('w3_5-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_5-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_5-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: Pandas - How to calculate summary statistics</strong><br>You have received a critically corrupt data dump. <br>1. Build a robust data pipeline function that implements <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">How to calculate summary statistics</code>.<br>2. You must simultaneously group by the primary category, impute missing values using group-specific distributions, detect and drop logical duplicates, and pivot the table.<br>3. You must write an assertion that verifies no data leakage occurred and that the final shape perfectly matches the expected business requirements.
            </div>
            <div class="editor-container" id="editor-w3_5-3"></div>
            <div class="controls"><button onclick="runCode('w3_5-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_5-3"></div>
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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: Pivot Tables Basics</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Library Book Loans</strong><br>1. Create <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">df</code> from <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">data</code>.<br>2. Use <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">pd.pivot_table()</code> to show the average numerical value for each category (e.g. department, sensor_id).
            </div>
            <div class="editor-container" id="editor-w3_6-0"></div>
            <div class="controls"><button onclick="runCode('w3_6-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_6-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_6-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: Multi-dimensional Pivots</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Analyzing sales by Region and Year.</strong><br>1. Create a pivot table with <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">Region</code> as the index, <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">Year</code> as columns, and <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">Sales</code> as values.<br>2. Use <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">aggfunc='sum'</code> to combine the two North 2022 records.
            </div>
            <div class="editor-container" id="editor-w3_6-1"></div>
            <div class="controls"><button onclick="runCode('w3_6-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_6-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_6-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: Melt / Unpivot</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Converting wide data to long format.</strong><br>1. Use <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">pd.melt()</code> to convert this from wide format to long format. The resulting columns should be 'Student', 'Subject', and 'Score'.<br>2. Sort the long DataFrame by 'Student'.
            </div>
            <div class="editor-container" id="editor-w3_6-2"></div>
            <div class="controls"><button onclick="runCode('w3_6-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_6-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_6-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: Pandas - How to reshape the layout of tables</strong><br>You have received a critically corrupt data dump. <br>1. Build a robust data pipeline function that implements <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">How to reshape the layout of tables</code>.<br>2. You must simultaneously group by the primary category, impute missing values using group-specific distributions, detect and drop logical duplicates, and pivot the table.<br>3. You must write an assertion that verifies no data leakage occurred and that the final shape perfectly matches the expected business requirements.
            </div>
            <div class="editor-container" id="editor-w3_6-3"></div>
            <div class="controls"><button onclick="runCode('w3_6-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_6-3"></div>
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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: Concatenation</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Combine logs from two servers.</strong><br>1. Use <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">pd.concat</code> to stack <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">df1</code> and <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">df2</code> vertically.<br>2. Ignore the index so the new DataFrame has a clean index from 0 to 3.
            </div>
            <div class="editor-container" id="editor-w3_7-0"></div>
            <div class="controls"><button onclick="runCode('w3_7-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_7-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_7-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: Merging (Inner Join)</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Link transactions with profiles.</strong><br>1. Use <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">pd.merge()</code> to join <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">sales</code> and <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">customers</code> on <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">cust_id</code>.<br>2. Print the result. Notice which <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">cust_id</code>s were dropped (inner join behavior).
            </div>
            <div class="editor-container" id="editor-w3_7-1"></div>
            <div class="controls"><button onclick="runCode('w3_7-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_7-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_7-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: Outer Joins and Indicators</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Reconcile two databases.</strong><br>1. Perform an outer merge on <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">user</code>, setting <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">indicator=True</code>.<br>2. Print the resulting DataFrame.<br>3. Filter the DataFrame to show ONLY rows that were present in the left database but missing in the right database.
            </div>
            <div class="editor-container" id="editor-w3_7-2"></div>
            <div class="controls"><button onclick="runCode('w3_7-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_7-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_7-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: Pandas - How to combine data from multiple tables</strong><br>You have received a critically corrupt data dump. <br>1. Build a robust data pipeline function that implements <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">How to combine data from multiple tables</code>.<br>2. You must simultaneously group by the primary category, impute missing values using group-specific distributions, detect and drop logical duplicates, and pivot the table.<br>3. You must write an assertion that verifies no data leakage occurred and that the final shape perfectly matches the expected business requirements.
            </div>
            <div class="editor-container" id="editor-w3_7-3"></div>
            <div class="controls"><button onclick="runCode('w3_7-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_7-3"></div>
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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: How to handle time series data with ease</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Implement the basics for How to handle time series data with ease.
            </div>
            <div class="editor-container" id="editor-w3_8-0"></div>
            <div class="controls"><button onclick="runCode('w3_8-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_8-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_8-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: How to handle time series data with ease</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Apply advanced concepts for How to handle time series data with ease.
            </div>
            <div class="editor-container" id="editor-w3_8-1"></div>
            <div class="controls"><button onclick="runCode('w3_8-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_8-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_8-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: How to handle time series data with ease</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Create a mini pipeline using How to handle time series data with ease.
            </div>
            <div class="editor-container" id="editor-w3_8-2"></div>
            <div class="controls"><button onclick="runCode('w3_8-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_8-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_8-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: Pandas - How to handle time series data with ease</strong><br>You have received a critically corrupt data dump. <br>1. Build a robust data pipeline function that implements <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">How to handle time series data with ease</code>.<br>2. You must simultaneously group by the primary category, impute missing values using group-specific distributions, detect and drop logical duplicates, and pivot the table.<br>3. You must write an assertion that verifies no data leakage occurred and that the final shape perfectly matches the expected business requirements.
            </div>
            <div class="editor-container" id="editor-w3_8-3"></div>
            <div class="controls"><button onclick="runCode('w3_8-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_8-3"></div>
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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: Getting Started with Scikit-learn</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Implement the basics for Getting Started with Scikit-learn.
            </div>
            <div class="editor-container" id="editor-w6_0-0"></div>
            <div class="controls"><button onclick="runCode('w6_0-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w6_0-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w6_0-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: Getting Started with Scikit-learn</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Apply advanced concepts for Getting Started with Scikit-learn.
            </div>
            <div class="editor-container" id="editor-w6_0-1"></div>
            <div class="controls"><button onclick="runCode('w6_0-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w6_0-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w6_0-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: Getting Started with Scikit-learn</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Combine Getting Started with Scikit-learn with pipelines.
            </div>
            <div class="editor-container" id="editor-w6_0-2"></div>
            <div class="controls"><button onclick="runCode('w6_0-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w6_0-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w6_0-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: Scikit-Learn - Getting Started with Scikit-learn</strong><br>Build a production-grade machine learning pipeline. <br>1. You must integrate <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">Getting Started with Scikit-learn</code> into an end-to-end <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">Pipeline</code> and <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">ColumnTransformer</code>.<br>2. Explicitly handle unseen categorical variables and impute missing numericals.<br>3. Your final pipeline must be cross-validated (using K-Fold) and you must extract the inner model coefficients or feature importances without breaking the pipeline abstraction.
            </div>
            <div class="editor-container" id="editor-w6_0-3"></div>
            <div class="controls"><button onclick="runCode('w6_0-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w6_0-3"></div>
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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: Pipeline Documentation</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Implement the basics for Pipeline Documentation.
            </div>
            <div class="editor-container" id="editor-w6_1-0"></div>
            <div class="controls"><button onclick="runCode('w6_1-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w6_1-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w6_1-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: Pipeline Documentation</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Apply advanced concepts for Pipeline Documentation.
            </div>
            <div class="editor-container" id="editor-w6_1-1"></div>
            <div class="controls"><button onclick="runCode('w6_1-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w6_1-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w6_1-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: Pipeline Documentation</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Combine Pipeline Documentation with pipelines.
            </div>
            <div class="editor-container" id="editor-w6_1-2"></div>
            <div class="controls"><button onclick="runCode('w6_1-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w6_1-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w6_1-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: Scikit-Learn - Pipeline Documentation</strong><br>Build a production-grade machine learning pipeline. <br>1. You must integrate <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">Pipeline Documentation</code> into an end-to-end <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">Pipeline</code> and <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">ColumnTransformer</code>.<br>2. Explicitly handle unseen categorical variables and impute missing numericals.<br>3. Your final pipeline must be cross-validated (using K-Fold) and you must extract the inner model coefficients or feature importances without breaking the pipeline abstraction.
            </div>
            <div class="editor-container" id="editor-w6_1-3"></div>
            <div class="controls"><button onclick="runCode('w6_1-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w6_1-3"></div>
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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: ColumnTransformer Documentation</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Implement the basics for ColumnTransformer Documentation.
            </div>
            <div class="editor-container" id="editor-w6_2-0"></div>
            <div class="controls"><button onclick="runCode('w6_2-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w6_2-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w6_2-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: ColumnTransformer Documentation</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Apply advanced concepts for ColumnTransformer Documentation.
            </div>
            <div class="editor-container" id="editor-w6_2-1"></div>
            <div class="controls"><button onclick="runCode('w6_2-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w6_2-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w6_2-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: ColumnTransformer Documentation</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Combine ColumnTransformer Documentation with pipelines.
            </div>
            <div class="editor-container" id="editor-w6_2-2"></div>
            <div class="controls"><button onclick="runCode('w6_2-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w6_2-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w6_2-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: Scikit-Learn - ColumnTransformer Documentation</strong><br>Build a production-grade machine learning pipeline. <br>1. You must integrate <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">ColumnTransformer Documentation</code> into an end-to-end <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">Pipeline</code> and <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">ColumnTransformer</code>.<br>2. Explicitly handle unseen categorical variables and impute missing numericals.<br>3. Your final pipeline must be cross-validated (using K-Fold) and you must extract the inner model coefficients or feature importances without breaking the pipeline abstraction.
            </div>
            <div class="editor-container" id="editor-w6_2-3"></div>
            <div class="controls"><button onclick="runCode('w6_2-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w6_2-3"></div>
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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: Preprocessing Data</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Implement the basics for Preprocessing Data.
            </div>
            <div class="editor-container" id="editor-w6_3-0"></div>
            <div class="controls"><button onclick="runCode('w6_3-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w6_3-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w6_3-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: Preprocessing Data</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Apply advanced concepts for Preprocessing Data.
            </div>
            <div class="editor-container" id="editor-w6_3-1"></div>
            <div class="controls"><button onclick="runCode('w6_3-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w6_3-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w6_3-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: Preprocessing Data</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                1. Combine Preprocessing Data with pipelines.
            </div>
            <div class="editor-container" id="editor-w6_3-2"></div>
            <div class="controls"><button onclick="runCode('w6_3-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w6_3-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w6_3-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: Scikit-Learn - Preprocessing Data</strong><br>Build a production-grade machine learning pipeline. <br>1. You must integrate <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">Preprocessing Data</code> into an end-to-end <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">Pipeline</code> and <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">ColumnTransformer</code>.<br>2. Explicitly handle unseen categorical variables and impute missing numericals.<br>3. Your final pipeline must be cross-validated (using K-Fold) and you must extract the inner model coefficients or feature importances without breaking the pipeline abstraction.
            </div>
            <div class="editor-container" id="editor-w6_3-3"></div>
            <div class="controls"><button onclick="runCode('w6_3-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w6_3-3"></div>
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
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Easy: Basic Train-Test Split</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Model Validation</strong><br>1. Use <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">train_test_split</code> to split X and y into 80% training and 20% testing sets.<br>2. Set <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">random_state=42</code> for reproducibility.<br>3. Print the shapes of X_train and X_test.
            </div>
            <div class="editor-container" id="editor-w6_4-0"></div>
            <div class="controls"><button onclick="runCode('w6_4-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w6_4-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w6_4-1">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Intermediate: Stratified Splitting</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: Imbalanced Target</strong><br>1. Split the data 70/30.<br>2. Use the <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">stratify</code> parameter to ensure the train and test sets have the same proportion of 0s and 1s as the original y.<br>3. Verify the proportions using <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">np.mean(y_train)</code> and <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">np.mean(y_test)</code>.
            </div>
            <div class="editor-container" id="editor-w6_4-1"></div>
            <div class="controls"><button onclick="runCode('w6_4-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w6_4-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w6_4-2">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>Complex: Splitting Pandas DataFrames</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Scenario: DataFrame Pipelines</strong><br>1. Separate <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">df</code> into <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">X</code> (features) and <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">y</code> (target).<br>2. Perform a train_test_split.<br>3. Verify that the indices of <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">X_train</code> and <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">y_train</code> perfectly match.
            </div>
            <div class="editor-container" id="editor-w6_4-2"></div>
            <div class="controls"><button onclick="runCode('w6_4-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w6_4-2"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w6_4-3">
            <div class="cell-header" style="background-color: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 6px 6px 0 0; font-weight: bold; font-size: 1.1em;"><span>🏆 Mastery Challenge: Final Test</span></div>
            <div class="problem-description" style="padding: 15px; background: white; border: 1px solid var(--border-color); border-left: 5px solid var(--accent-color); font-size: 1.0em; color: #333; line-height: 1.6;">
                <strong>Mastery Challenge: Scikit-Learn - Train Test Split</strong><br>Build a production-grade machine learning pipeline. <br>1. You must integrate <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">Train Test Split</code> into an end-to-end <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">Pipeline</code> and <code style="background:#eee;padding:2px 4px;border-radius:3px;color:#c0392b;">ColumnTransformer</code>.<br>2. Explicitly handle unseen categorical variables and impute missing numericals.<br>3. Your final pipeline must be cross-validated (using K-Fold) and you must extract the inner model coefficients or feature importances without breaking the pipeline abstraction.
            </div>
            <div class="editor-container" id="editor-w6_4-3"></div>
            <div class="controls"><button onclick="runCode('w6_4-3')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w6_4-3"></div>
        </div>
        
    `
};

const initialCode = {
    'git-1': `# Simulate bash command via python\nimport os\n\n# TODO: Run 'git status' using os.system()\nos.system('echo Git is ready!')`,    'w2_00-0': `import numpy as np\n\n# Code:\n`,    'w2_00-1': `import numpy as np\n\n# Code:\n`,    'w2_00-2': `import numpy as np\n\n# Code:\n`,    'w2_00-3': `import pandas as pd\nimport numpy as np\ndata = {'table': [1, 2, 3], 'bill': [50.0, 100.0, np.nan], 'tip': [5.0, 15.0, 0.0]}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
`,    'w2_01-0': `import numpy as np\n\nprices = [10.5, 20.0, '30.5', 40.0, 50.5]\n\n# Write your code here:\n`,    'w2_01-1': `import numpy as np\n\nrng = np.random.default_rng(2026)\nmatrix = rng.integers(1, 100, size=(5, 5))\n\n# Write your code here:\n`,    'w2_01-2': `import numpy as np\n\nraw_stream = np.arange(1, 37)\n\n# Write your code here:\n`,    'w2_01-3': `import pandas as pd\nimport numpy as np\ndata = {'song': ['S1', 'S2', 'S3'], 'duration_sec': [180, 240, np.nan], 'genre': ['Pop', 'Rock', 'Pop']}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
`,    'w2_02-0': `import numpy as np\n\nprices = [10.5, 20.0, '30.5', 40.0, 50.5]\n\n# Write your code here:\n`,    'w2_02-1': `import numpy as np\n\nrng = np.random.default_rng(2026)\nmatrix = rng.integers(1, 100, size=(5, 5))\n\n# Write your code here:\n`,    'w2_02-2': `import numpy as np\n\nraw_stream = np.arange(1, 37)\n\n# Write your code here:\n`,    'w2_02-3': `import pandas as pd\nimport numpy as np\ndata = {'animal': ['Lion', 'Elephant', 'Monkey'], 'food_kg': [10, 50, np.nan], 'enclosure': ['A', 'B', 'C']}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
`,    'w2_03-0': `import numpy as np\n\nbase_values = np.array([100, 200, 300, 400, 500])\nmultiplier = 1.15\n\n# Write your code here:\n`,    'w2_03-1': `import numpy as np\n\nmatrix = np.array([[10, 20], [30, 40], [50, 60]])\nvector = np.array([1, 2])\n\n# Write your code here:\n`,    'w2_03-2': `import numpy as np\n\nrng = np.random.default_rng(42)\nx = rng.uniform(1, 10, size=100)\n\n# Write your code here:\n`,    'w2_03-3': `import pandas as pd\nimport numpy as np\ndata = {'post_id': [1, 2, 3], 'likes': [100, 200, np.nan], 'text': ['Hello', ' World ', '  ']}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
`,    'w2_04-0': `import numpy as np\n\nscores = np.array([75, 88, 92, 60, 100, 85, 77, 95])\n\n# Write your code here:\n`,    'w2_04-1': `import numpy as np\n\nresults = np.array([[85, 90, 88], [70, 75, np.nan], [95, 98, 100], [60, np.nan, 62]])\n\n# Write your code here:\n`,    'w2_04-2': `import numpy as np\n\nrng = np.random.default_rng(99)\ndata_3d = rng.integers(10, 50, size=(4, 5, 8))\n\n# Write your code here:\n`,    'w2_04-3': `import pandas as pd\nimport numpy as np\ndata = {'user': ['U1', 'U2', 'U3'], 'minutes_watched': [120, 240, np.nan], 'plan': ['Free', 'Paid', 'Free']}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
`,    'w2_05-0': `import numpy as np\n\nbase_values = np.array([100, 200, 300, 400, 500])\nmultiplier = 1.15\n\n# Write your code here:\n`,    'w2_05-1': `import numpy as np\n\nmatrix = np.array([[10, 20], [30, 40], [50, 60]])\nvector = np.array([1, 2])\n\n# Write your code here:\n`,    'w2_05-2': `import numpy as np\n\nrng = np.random.default_rng(42)\nx = rng.uniform(1, 10, size=100)\n\n# Write your code here:\n`,    'w2_05-3': `import pandas as pd\nimport numpy as np\ndata = {'member': ['M1', 'M2', 'M3'], 'visits': [10, 20, np.nan], 'plan': ['Basic', 'Premium', 'Basic']}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
`,    'w2_06-0': `import numpy as np\n\nages = np.array([12, 18, 25, 30, 15, 45, 10, 60])\n\n# Write your code here:\n`,    'w2_06-1': `import numpy as np\n\nrng = np.random.default_rng(42)\ntemps = rng.integers(-10, 40, size=20)\n\n# Write your code here:\n`,    'w2_06-2': `import numpy as np\n\nrng = np.random.default_rng(2026)\nvalues = rng.normal(100, 20, size=50)\n\n# Write your code here:\n`,    'w2_06-3': `import pandas as pd\nimport numpy as np\ndata = {'applicant': ['A1', 'A2', 'A3'], 'income': [50000, 80000, np.nan], 'approved': [True, False, True]}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
`,    'w2_07-0': `import numpy as np\n\nitems = np.array(['A', 'B', 'C', 'D', 'E', 'F', 'G'])\nindices = [0, 3, 5]\n\n# Write your code here:\n`,    'w2_07-1': `import numpy as np\n\nmatrix = np.arange(25).reshape(5, 5)\n\n# Write your code here:\n`,    'w2_07-2': `import numpy as np\n\nrng = np.random.default_rng(123)\ndata = rng.integers(0, 100, size=(6, 6))\n\n# Write your code here:\n`,    'w2_07-3': `import pandas as pd\nimport numpy as np\ndata = {'booking_id': ['B1', 'B2', 'B3'], 'nights': [2, 5, np.nan], 'price_per_night': [100, 150, 200]}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
`,    'w2_08-0': `import numpy as np\n\nrng = np.random.default_rng(42)\nunsorted = rng.integers(1, 100, size=10)\n\n# Write your code here:\n`,    'w2_08-1': `import numpy as np\n\nnames = np.array(['Ari', 'Bataa', 'Caraa', 'Davaa'])\nscores = np.array([85, 92, 78, 88])\n\n# Write your code here:\n`,    'w2_08-2': `import numpy as np\n\nrng = np.random.default_rng(2026)\nmatrix = rng.integers(0, 50, size=(5, 4))\n\n# Write your code here:\n`,    'w2_08-3': `import pandas as pd\nimport numpy as np\ndata = {'item': ['Shoes', 'Shirts', 'Pants'], 'stock': [50, 100, np.nan], 'price': [60, 25, 40]}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
`,    'w2_09-0': `import numpy as np\n\n# Code:\n`,    'w2_09-1': `import numpy as np\n\n# Code:\n`,    'w2_09-2': `import numpy as np\n\n# Code:\n`,    'w2_09-3': `import pandas as pd\nimport numpy as np\ndata = {'drug': ['D1', 'D2', 'D3'], 'doses': [1000, 2000, np.nan], 'cost': [5000, 10000, 15000]}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
`,    'w4_00-0': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_00-1': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_00-2': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_00-3': `import pandas as pd\nimport numpy as np\ndata = {'campaign': ['C1', 'C2', 'C3'], 'spend': [1000, 2000, np.nan], 'revenue': [1500, 2500, 3000]}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
`,    'w4_01-0': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_01-1': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_01-2': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_01-3': `import pandas as pd\nimport numpy as np\ndata = {'post_id': [1, 2, 3], 'likes': [100, 200, np.nan], 'text': ['Hello', ' World ', '  ']}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
`,    'w4_02-0': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_02-1': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_02-2': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_02-3': `import pandas as pd\nimport numpy as np\ndata = {'date': ['01', '02', '03'], 'steps': [10000, 5000, np.nan], 'calories': [2500, 1800, 2000]}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
`,    'w4_03-0': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_03-1': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_03-2': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_03-3': `import pandas as pd\nimport numpy as np\ndata = {'emp_id': np.arange(1001, 1006), 'name': ['Ari', 'Bataa', 'Caraa', 'Davaa', 'Enkh'], 'salary': [1500, 2000, np.nan, 2500, 1800]}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
`,    'w4_04-0': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_04-1': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_04-2': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_04-3': `import pandas as pd\nimport numpy as np\ndata = {'member': ['M1', 'M2', 'M3'], 'visits': [10, 20, np.nan], 'plan': ['Basic', 'Premium', 'Basic']}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
`,    'w4_05-0': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_05-1': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_05-2': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_05-3': `import pandas as pd\nimport numpy as np\ndata = {'animal': ['Lion', 'Elephant', 'Monkey'], 'food_kg': [10, 50, np.nan], 'enclosure': ['A', 'B', 'C']}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
`,    'w4_06-0': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_06-1': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_06-2': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_06-3': `import pandas as pd\nimport numpy as np\ndata = {'player': ['P1', 'P2', 'P3'], 'score': [1000, 1500, np.nan], 'level': [1, 2, 3]}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
`,    'w4_07-0': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_07-1': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_07-2': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_07-3': `import pandas as pd\nimport numpy as np\ndata = {'drug': ['D1', 'D2', 'D3'], 'doses': [1000, 2000, np.nan], 'cost': [5000, 10000, 15000]}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
`,    'w4_08-0': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_08-1': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_08-2': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_08-3': `import pandas as pd\nimport numpy as np\ndata = {'table': [1, 2, 3], 'bill': [50.0, 100.0, np.nan], 'tip': [5.0, 15.0, 0.0]}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
`,    'w4_09-0': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_09-1': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_09-2': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_09-3': `import pandas as pd\nimport numpy as np\ndata = {'campaign': ['C1', 'C2', 'C3'], 'spend': [1000, 2000, np.nan], 'revenue': [1500, 2500, 3000]}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
`,    'w4_10-0': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_10-1': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_10-2': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_10-3': `import pandas as pd\nimport numpy as np\ndata = {'movie': ['M1', 'M2', 'M3'], 'tickets': [1000, 2000, np.nan], 'revenue': [15000, 30000, 0]}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
`,    'w4_11-0': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_11-1': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_11-2': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_11-3': `import pandas as pd\nimport numpy as np\ndata = {'flight': ['F1', 'F2', 'F3'], 'delay_mins': [15, 0, np.nan], 'airline': ['AirA', 'AirB', 'AirA']}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
`,    'w4_12-0': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_12-1': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_12-2': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_12-3': `import pandas as pd\nimport numpy as np\ndata = {'emp_id': np.arange(1001, 1006), 'name': ['Ari', 'Bataa', 'Caraa', 'Davaa', 'Enkh'], 'salary': [1500, 2000, np.nan, 2500, 1800]}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
`,    'w4_13-0': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_13-1': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_13-2': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_13-3': `import pandas as pd\nimport numpy as np\ndata = {'order_id': ['A1', 'A2', 'A3', 'A4'], 'amount': [100.5, 250.0, np.nan, 99.9], 'status': ['paid', 'pending', 'cancelled', 'paid']}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
`,    'w4_14-0': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_14-1': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_14-2': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_14-3': `import pandas as pd\nimport numpy as np\ndata = {'applicant': ['A1', 'A2', 'A3'], 'income': [50000, 80000, np.nan], 'approved': [True, False, True]}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
`,    'w4_15-0': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_15-1': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_15-2': `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Code:\n`,    'w4_15-3': `import pandas as pd\nimport numpy as np\ndata = {'item': ['Shoes', 'Shirts', 'Pants'], 'stock': [50, 100, np.nan], 'price': [60, 25, 40]}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
`,    'w3_0-0': `import pandas as pd\nimport numpy as np\ndata = {'campaign': ['C1', 'C2', 'C3'], 'spend': [1000, 2000, np.nan], 'revenue': [1500, 2500, 3000]}\n# Write your code here:\n`,    'w3_0-1': `import pandas as pd\nimport numpy as np\ndata = {'campaign': ['C1', 'C2', 'C3'], 'spend': [1000, 2000, np.nan], 'revenue': [1500, 2500, 3000]}\n# Write your code here:\n`,    'w3_0-2': `import pandas as pd\nimport numpy as np\ndata = {'campaign': ['C1', 'C2', 'C3'], 'spend': [1000, 2000, np.nan], 'revenue': [1500, 2500, 3000]}\n# Write your code here:\n`,    'w3_0-3': `import pandas as pd\nimport numpy as np\ndata = {'campaign': ['C1', 'C2', 'C3'], 'spend': [1000, 2000, np.nan], 'revenue': [1500, 2500, 3000]}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
`,    'w3_1-0': `import pandas as pd\nimport numpy as np\ndata = {'applicant': ['A1', 'A2', 'A3'], 'income': [50000, 80000, np.nan], 'approved': [True, False, True]}\n# Write your code here:\n`,    'w3_1-1': `import pandas as pd\nimport io\n\ncsv_text = '''id,name,value,date\n1,Ari,10.5,2026-01-01\n2,Bataa,,2026-01-02\n3,Caraa,invalid,2026-01-03\n4,Davaa,15.2,2026-01-04'''\n\n# Write your code here:\n`,    'w3_1-2': `import pandas as pd\nimport numpy as np\ndata = {'applicant': ['A1', 'A2', 'A3'], 'income': [50000, 80000, np.nan], 'approved': [True, False, True]}\n# Write your code here:\n`,    'w3_1-3': `import pandas as pd\nimport numpy as np\ndata = {'applicant': ['A1', 'A2', 'A3'], 'income': [50000, 80000, np.nan], 'approved': [True, False, True]}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
`,    'w3_2-0': `import pandas as pd\nimport numpy as np\ndata = {'post_id': [1, 2, 3], 'likes': [100, 200, np.nan], 'text': ['Hello', ' World ', '  ']}\n# Write your code here:\n`,    'w3_2-1': `import pandas as pd\nimport numpy as np\ndata = {'post_id': [1, 2, 3], 'likes': [100, 200, np.nan], 'text': ['Hello', ' World ', '  ']}\n# Write your code here:\n`,    'w3_2-2': `import pandas as pd\nimport numpy as np\ndata = {'post_id': [1, 2, 3], 'likes': [100, 200, np.nan], 'text': ['Hello', ' World ', '  ']}\n# Write your code here:\n`,    'w3_2-3': `import pandas as pd\nimport numpy as np\ndata = {'post_id': [1, 2, 3], 'likes': [100, 200, np.nan], 'text': ['Hello', ' World ', '  ']}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
`,    'w3_3-0': `import pandas as pd\nimport numpy as np\ndata = {'patient': ['P1', 'P2', 'P3', 'P4'], 'blood_pressure': [120, 130, np.nan, 140], 'age': [45, 32, 60, -5]}\n# Write your code here:\n`,    'w3_3-1': `import pandas as pd\nimport numpy as np\ndata = {'patient': ['P1', 'P2', 'P3', 'P4'], 'blood_pressure': [120, 130, np.nan, 140], 'age': [45, 32, 60, -5]}\n# Write your code here:\n`,    'w3_3-2': `import pandas as pd\nimport numpy as np\ndata = {'patient': ['P1', 'P2', 'P3', 'P4'], 'blood_pressure': [120, 130, np.nan, 140], 'age': [45, 32, 60, -5]}\n# Write your code here:\n`,    'w3_3-3': `import pandas as pd\nimport numpy as np\ndata = {'patient': ['P1', 'P2', 'P3', 'P4'], 'blood_pressure': [120, 130, np.nan, 140], 'age': [45, 32, 60, -5]}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
`,    'w3_4-0': `import pandas as pd\nimport numpy as np\ndata = {'coin': ['BTC', 'ETH', 'SOL'], 'amount': [0.5, 10.0, np.nan], 'value_usd': [30000, 2000, 50]}\n# Write your code here:\n`,    'w3_4-1': `import pandas as pd\nimport numpy as np\ndata = {'coin': ['BTC', 'ETH', 'SOL'], 'amount': [0.5, 10.0, np.nan], 'value_usd': [30000, 2000, 50]}\n# Write your code here:\n`,    'w3_4-2': `import pandas as pd\nimport numpy as np\ndata = {'coin': ['BTC', 'ETH', 'SOL'], 'amount': [0.5, 10.0, np.nan], 'value_usd': [30000, 2000, 50]}\n# Write your code here:\n`,    'w3_4-3': `import pandas as pd\nimport numpy as np\ndata = {'coin': ['BTC', 'ETH', 'SOL'], 'amount': [0.5, 10.0, np.nan], 'value_usd': [30000, 2000, 50]}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
`,    'w3_5-0': `import pandas as pd\nimport numpy as np\ndata = {'song': ['S1', 'S2', 'S3'], 'duration_sec': [180, 240, np.nan], 'genre': ['Pop', 'Rock', 'Pop']}\n# Write your code here:\n`,    'w3_5-1': `import pandas as pd\nimport numpy as np\ndata = {'song': ['S1', 'S2', 'S3'], 'duration_sec': [180, 240, np.nan], 'genre': ['Pop', 'Rock', 'Pop']}\n# Write your code here:\n`,    'w3_5-2': `import pandas as pd\nimport numpy as np\ndata = {'song': ['S1', 'S2', 'S3'], 'duration_sec': [180, 240, np.nan], 'genre': ['Pop', 'Rock', 'Pop']}\n# Write your code here:\n`,    'w3_5-3': `import pandas as pd\nimport numpy as np\ndata = {'song': ['S1', 'S2', 'S3'], 'duration_sec': [180, 240, np.nan], 'genre': ['Pop', 'Rock', 'Pop']}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
`,    'w3_6-0': `import pandas as pd\nimport numpy as np\ndata = {'book_id': ['B1', 'B2', 'B3'], 'days_loaned': [14, 7, np.nan], 'overdue_fines': [0, 5, 0]}\n# Write your code here:\n`,    'w3_6-1': `import pandas as pd\n\ndf = pd.DataFrame({'Region': ['North', 'North', 'South', 'South', 'North'], 'Year': [2022, 2023, 2022, 2023, 2022], 'Sales': [100, 150, 200, 250, 50]})\n\n# Write your code here:\n`,    'w3_6-2': `import pandas as pd\n\nwide_df = pd.DataFrame({'Student': ['Ari', 'Bataa'], 'Math': [90, 85], 'Science': [88, 92], 'History': [75, 80]})\n\n# Write your code here:\n`,    'w3_6-3': `import pandas as pd\nimport numpy as np\ndata = {'book_id': ['B1', 'B2', 'B3'], 'days_loaned': [14, 7, np.nan], 'overdue_fines': [0, 5, 0]}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
`,    'w3_7-0': `import pandas as pd\n\ndf1 = pd.DataFrame({'id': [1, 2], 'val': ['A', 'B']})\ndf2 = pd.DataFrame({'id': [3, 4], 'val': ['C', 'D']})\n\n# Write your code here:\n`,    'w3_7-1': `import pandas as pd\n\nsales = pd.DataFrame({'cust_id': [101, 102, 103], 'amount': [50, 100, 150]})\ncustomers = pd.DataFrame({'cust_id': [101, 103, 104], 'name': ['Ari', 'Caraa', 'Davaa']})\n\n# Write your code here:\n`,    'w3_7-2': `import pandas as pd\n\ndb_left = pd.DataFrame({'user': ['A', 'B', 'C'], 'score1': [10, 20, 30]})\ndb_right = pd.DataFrame({'user': ['B', 'C', 'D'], 'score2': [40, 50, 60]})\n\n# Write your code here:\n`,    'w3_7-3': `import pandas as pd\nimport numpy as np\ndata = {'applicant': ['A1', 'A2', 'A3'], 'income': [50000, 80000, np.nan], 'approved': [True, False, True]}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
`,    'w3_8-0': `import pandas as pd\nimport numpy as np\ndata = {'car_plate': ['A1', 'A2', 'A3'], 'speed': [60, 80, np.nan], 'limit': [50, 50, 50]}\n# Write your code here:\n`,    'w3_8-1': `import pandas as pd\nimport numpy as np\ndata = {'car_plate': ['A1', 'A2', 'A3'], 'speed': [60, 80, np.nan], 'limit': [50, 50, 50]}\n# Write your code here:\n`,    'w3_8-2': `import pandas as pd\nimport numpy as np\ndata = {'car_plate': ['A1', 'A2', 'A3'], 'speed': [60, 80, np.nan], 'limit': [50, 50, 50]}\n# Write your code here:\n`,    'w3_8-3': `import pandas as pd\nimport numpy as np\ndata = {'car_plate': ['A1', 'A2', 'A3'], 'speed': [60, 80, np.nan], 'limit': [50, 50, 50]}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
`,    'w6_0-0': `import sklearn\n\n# Code:\n`,    'w6_0-1': `import sklearn\n\n# Code:\n`,    'w6_0-2': `import sklearn\n\n# Code:\n`,    'w6_0-3': `import pandas as pd\nimport numpy as np\ndata = {'vin': ['V1', 'V2', 'V3'], 'mileage': [10000, 50000, np.nan], 'price': [20000, 15000, 10000]}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
`,    'w6_1-0': `import sklearn\n\n# Code:\n`,    'w6_1-1': `import sklearn\n\n# Code:\n`,    'w6_1-2': `import sklearn\n\n# Code:\n`,    'w6_1-3': `import pandas as pd\nimport numpy as np\ndata = {'patient': ['P1', 'P2', 'P3', 'P4'], 'blood_pressure': [120, 130, np.nan, 140], 'age': [45, 32, 60, -5]}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
`,    'w6_2-0': `import sklearn\n\n# Code:\n`,    'w6_2-1': `import sklearn\n\n# Code:\n`,    'w6_2-2': `import sklearn\n\n# Code:\n`,    'w6_2-3': `import pandas as pd\nimport numpy as np\ndata = {'day': [1, 2, 3, 4], 'wind_speed': [10, 15, np.nan, 25], 'rainfall': [0, 5, 10, 0]}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
`,    'w6_3-0': `import sklearn\n\n# Code:\n`,    'w6_3-1': `import sklearn\n\n# Code:\n`,    'w6_3-2': `import sklearn\n\n# Code:\n`,    'w6_3-3': `import pandas as pd\nimport numpy as np\ndata = {'patient': ['P1', 'P2', 'P3', 'P4'], 'blood_pressure': [120, 130, np.nan, 140], 'age': [45, 32, 60, -5]}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
`,    'w6_4-0': `from sklearn.model_selection import train_test_split\nimport numpy as np\n\nX = np.arange(100).reshape((50, 2))\ny = np.arange(50)\n\n# Write your code here:\n`,    'w6_4-1': `from sklearn.model_selection import train_test_split\nimport numpy as np\n\nX = np.random.rand(100, 5)\ny = np.array([0]*90 + [1]*10)\n\n# Write your code here:\n`,    'w6_4-2': `from sklearn.model_selection import train_test_split\nimport pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({'f1': np.random.randn(100), 'f2': np.random.randn(100), 'target': np.random.choice(['A', 'B'], size=100)})\n\n# Write your code here:\n`,    'w6_4-3': `import pandas as pd\nimport numpy as np\ndata = {'movie': ['M1', 'M2', 'M3'], 'tickets': [1000, 2000, np.nan], 'revenue': [15000, 30000, 0]}
# NO LOOPS ALLOWED. Write your mastery pipeline below:
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
