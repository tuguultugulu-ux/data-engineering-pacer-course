let pyodideReadyPromise;
let pyodideInstance;
let pyodideLoaded = false;
let pyodideStatus = "Loading Python environment (this may take a minute on first load)...";
let editors = {};

document.addEventListener("DOMContentLoaded", () => {
    loadLesson('w2_01');
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

    'w2_00': `
        <h1>2. Introduction to NumPy</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">2. Introduction to NumPy <a href="https://jakevdp.github.io/PythonDataScienceHandbook/02.00-introduction-to-numpy.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/02.00-introduction-to-numpy.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w2_00">
            <div class="cell-header"><span>[ ] Practice: 2. Introduction to NumPy</span></div>
            <div class="editor-container" id="editor-w2_00"></div>
            <div class="controls"><button onclick="runCode('w2_00')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_00"></div>
        </div>
    `,
    'w2_01': `
        <h1>Understanding Data Types in Python</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Understanding Data Types in Python <a href="https://jakevdp.github.io/PythonDataScienceHandbook/02.01-understanding-data-types.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/02.01-understanding-data-types.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w2_01">
            <div class="cell-header"><span>[ ] Practice: Understanding Data Types in Python</span></div>
            <div class="editor-container" id="editor-w2_01"></div>
            <div class="controls"><button onclick="runCode('w2_01')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_01"></div>
        </div>
    `,
    'w2_02': `
        <h1>The Basics of NumPy Arrays</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">The Basics of NumPy Arrays <a href="https://jakevdp.github.io/PythonDataScienceHandbook/02.02-the-basics-of-numpy-arrays.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/02.02-the-basics-of-numpy-arrays.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w2_02">
            <div class="cell-header"><span>[ ] Practice: The Basics of NumPy Arrays</span></div>
            <div class="editor-container" id="editor-w2_02"></div>
            <div class="controls"><button onclick="runCode('w2_02')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_02"></div>
        </div>
    `,
    'w2_03': `
        <h1>Computation on NumPy Arrays: Universal Functions</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Computation on NumPy Arrays: Universal Functions <a href="https://jakevdp.github.io/PythonDataScienceHandbook/02.03-computation-on-arrays-ufuncs.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/02.03-computation-on-arrays-ufuncs.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w2_03">
            <div class="cell-header"><span>[ ] Practice: Computation on NumPy Arrays: Universal Functions</span></div>
            <div class="editor-container" id="editor-w2_03"></div>
            <div class="controls"><button onclick="runCode('w2_03')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_03"></div>
        </div>
    `,
    'w2_04': `
        <h1>Aggregations: Min, Max, and Everything In Between</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Aggregations: Min, Max, and Everything In Between <a href="https://jakevdp.github.io/PythonDataScienceHandbook/02.04-computation-on-arrays-aggregates.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/02.04-computation-on-arrays-aggregates.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w2_04">
            <div class="cell-header"><span>[ ] Practice: Aggregations: Min, Max, and Everything In Between</span></div>
            <div class="editor-container" id="editor-w2_04"></div>
            <div class="controls"><button onclick="runCode('w2_04')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_04"></div>
        </div>
    `,
    'w2_05': `
        <h1>Computation on Arrays: Broadcasting</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Computation on Arrays: Broadcasting <a href="https://jakevdp.github.io/PythonDataScienceHandbook/02.05-computation-on-arrays-broadcasting.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/02.05-computation-on-arrays-broadcasting.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w2_05">
            <div class="cell-header"><span>[ ] Practice: Computation on Arrays: Broadcasting</span></div>
            <div class="editor-container" id="editor-w2_05"></div>
            <div class="controls"><button onclick="runCode('w2_05')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_05"></div>
        </div>
    `,
    'w2_06': `
        <h1>Comparisons, Masks, and Boolean Logic</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Comparisons, Masks, and Boolean Logic <a href="https://jakevdp.github.io/PythonDataScienceHandbook/02.06-boolean-arrays-and-masks.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/02.06-boolean-arrays-and-masks.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w2_06">
            <div class="cell-header"><span>[ ] Practice: Comparisons, Masks, and Boolean Logic</span></div>
            <div class="editor-container" id="editor-w2_06"></div>
            <div class="controls"><button onclick="runCode('w2_06')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_06"></div>
        </div>
    `,
    'w2_07': `
        <h1>Fancy Indexing</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Fancy Indexing <a href="https://jakevdp.github.io/PythonDataScienceHandbook/02.07-fancy-indexing.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/02.07-fancy-indexing.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w2_07">
            <div class="cell-header"><span>[ ] Practice: Fancy Indexing</span></div>
            <div class="editor-container" id="editor-w2_07"></div>
            <div class="controls"><button onclick="runCode('w2_07')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_07"></div>
        </div>
    `,
    'w2_08': `
        <h1>Sorting Arrays</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Sorting Arrays <a href="https://jakevdp.github.io/PythonDataScienceHandbook/02.08-sorting.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/02.08-sorting.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w2_08">
            <div class="cell-header"><span>[ ] Practice: Sorting Arrays</span></div>
            <div class="editor-container" id="editor-w2_08"></div>
            <div class="controls"><button onclick="runCode('w2_08')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_08"></div>
        </div>
    `,
    'w2_09': `
        <h1>Structured Data: NumPy's Structured Arrays</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Structured Data: NumPy's Structured Arrays <a href="https://jakevdp.github.io/PythonDataScienceHandbook/02.09-structured-data-numpy.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/02.09-structured-data-numpy.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w2_09">
            <div class="cell-header"><span>[ ] Practice: Structured Data: NumPy's Structured Arrays</span></div>
            <div class="editor-container" id="editor-w2_09"></div>
            <div class="controls"><button onclick="runCode('w2_09')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_09"></div>
        </div>
    `,
    'w3_00': `
        <h1>3. Data Manipulation with Pandas</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">3. Data Manipulation with Pandas <a href="https://jakevdp.github.io/PythonDataScienceHandbook/03.00-introduction-to-pandas.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/03.00-introduction-to-pandas.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w3_00">
            <div class="cell-header"><span>[ ] Practice: 3. Data Manipulation with Pandas</span></div>
            <div class="editor-container" id="editor-w3_00"></div>
            <div class="controls"><button onclick="runCode('w3_00')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_00"></div>
        </div>
    `,
    'w3_01': `
        <h1>Introducing Pandas Objects</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Introducing Pandas Objects <a href="https://jakevdp.github.io/PythonDataScienceHandbook/03.01-introducing-pandas-objects.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/03.01-introducing-pandas-objects.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w3_01">
            <div class="cell-header"><span>[ ] Practice: Introducing Pandas Objects</span></div>
            <div class="editor-container" id="editor-w3_01"></div>
            <div class="controls"><button onclick="runCode('w3_01')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_01"></div>
        </div>
    `,
    'w3_02': `
        <h1>Data Indexing and Selection</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Data Indexing and Selection <a href="https://jakevdp.github.io/PythonDataScienceHandbook/03.02-data-indexing-and-selection.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/03.02-data-indexing-and-selection.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w3_02">
            <div class="cell-header"><span>[ ] Practice: Data Indexing and Selection</span></div>
            <div class="editor-container" id="editor-w3_02"></div>
            <div class="controls"><button onclick="runCode('w3_02')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_02"></div>
        </div>
    `,
    'w3_03': `
        <h1>Operating on Data in Pandas</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Operating on Data in Pandas <a href="https://jakevdp.github.io/PythonDataScienceHandbook/03.03-operations-in-pandas.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/03.03-operations-in-pandas.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w3_03">
            <div class="cell-header"><span>[ ] Practice: Operating on Data in Pandas</span></div>
            <div class="editor-container" id="editor-w3_03"></div>
            <div class="controls"><button onclick="runCode('w3_03')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_03"></div>
        </div>
    `,
    'w3_04': `
        <h1>Handling Missing Data</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Handling Missing Data <a href="https://jakevdp.github.io/PythonDataScienceHandbook/03.04-missing-values.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/03.04-missing-values.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w3_04">
            <div class="cell-header"><span>[ ] Practice: Handling Missing Data</span></div>
            <div class="editor-container" id="editor-w3_04"></div>
            <div class="controls"><button onclick="runCode('w3_04')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_04"></div>
        </div>
    `,
    'w3_05': `
        <h1>Hierarchical Indexing</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Hierarchical Indexing <a href="https://jakevdp.github.io/PythonDataScienceHandbook/03.05-hierarchical-indexing.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/03.05-hierarchical-indexing.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w3_05">
            <div class="cell-header"><span>[ ] Practice: Hierarchical Indexing</span></div>
            <div class="editor-container" id="editor-w3_05"></div>
            <div class="controls"><button onclick="runCode('w3_05')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_05"></div>
        </div>
    `,
    'w3_06': `
        <h1>Combining Datasets: Concat and Append</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Combining Datasets: Concat and Append <a href="https://jakevdp.github.io/PythonDataScienceHandbook/03.06-concat-and-append.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/03.06-concat-and-append.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w3_06">
            <div class="cell-header"><span>[ ] Practice: Combining Datasets: Concat and Append</span></div>
            <div class="editor-container" id="editor-w3_06"></div>
            <div class="controls"><button onclick="runCode('w3_06')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_06"></div>
        </div>
    `,
    'w3_07': `
        <h1>Combining Datasets: Merge and Join</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Combining Datasets: Merge and Join <a href="https://jakevdp.github.io/PythonDataScienceHandbook/03.07-merge-and-join.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/03.07-merge-and-join.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w3_07">
            <div class="cell-header"><span>[ ] Practice: Combining Datasets: Merge and Join</span></div>
            <div class="editor-container" id="editor-w3_07"></div>
            <div class="controls"><button onclick="runCode('w3_07')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_07"></div>
        </div>
    `,
    'w3_08': `
        <h1>Aggregation and Grouping</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Aggregation and Grouping <a href="https://jakevdp.github.io/PythonDataScienceHandbook/03.08-aggregation-and-grouping.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/03.08-aggregation-and-grouping.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w3_08">
            <div class="cell-header"><span>[ ] Practice: Aggregation and Grouping</span></div>
            <div class="editor-container" id="editor-w3_08"></div>
            <div class="controls"><button onclick="runCode('w3_08')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_08"></div>
        </div>
    `,
    'w3_09': `
        <h1>Pivot Tables</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Pivot Tables <a href="https://jakevdp.github.io/PythonDataScienceHandbook/03.09-pivot-tables.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/03.09-pivot-tables.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w3_09">
            <div class="cell-header"><span>[ ] Practice: Pivot Tables</span></div>
            <div class="editor-container" id="editor-w3_09"></div>
            <div class="controls"><button onclick="runCode('w3_09')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_09"></div>
        </div>
    `,
    'w3_10': `
        <h1>Vectorized String Operations</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Vectorized String Operations <a href="https://jakevdp.github.io/PythonDataScienceHandbook/03.10-working-with-strings.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/03.10-working-with-strings.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w3_10">
            <div class="cell-header"><span>[ ] Practice: Vectorized String Operations</span></div>
            <div class="editor-container" id="editor-w3_10"></div>
            <div class="controls"><button onclick="runCode('w3_10')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_10"></div>
        </div>
    `,
    'w3_11': `
        <h1>Working with Time Series</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Working with Time Series <a href="https://jakevdp.github.io/PythonDataScienceHandbook/03.11-working-with-time-series.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/03.11-working-with-time-series.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w3_11">
            <div class="cell-header"><span>[ ] Practice: Working with Time Series</span></div>
            <div class="editor-container" id="editor-w3_11"></div>
            <div class="controls"><button onclick="runCode('w3_11')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_11"></div>
        </div>
    `,
    'w3_12': `
        <h1>High-Performance Pandas: eval() and query()</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">High-Performance Pandas: eval() and query() <a href="https://jakevdp.github.io/PythonDataScienceHandbook/03.12-performance-eval-and-query.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/03.12-performance-eval-and-query.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w3_12">
            <div class="cell-header"><span>[ ] Practice: High-Performance Pandas: eval() and query()</span></div>
            <div class="editor-container" id="editor-w3_12"></div>
            <div class="controls"><button onclick="runCode('w3_12')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_12"></div>
        </div>
    `,
    'w3_13': `
        <h1>Further Resources</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Further Resources <a href="https://jakevdp.github.io/PythonDataScienceHandbook/03.13-further-resources.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/03.13-further-resources.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w3_13">
            <div class="cell-header"><span>[ ] Practice: Further Resources</span></div>
            <div class="editor-container" id="editor-w3_13"></div>
            <div class="controls"><button onclick="runCode('w3_13')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_13"></div>
        </div>
    `,
    'w4_00': `
        <h1>4. Visualization with Matplotlib</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">4. Visualization with Matplotlib <a href="https://jakevdp.github.io/PythonDataScienceHandbook/04.00-introduction-to-matplotlib.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/04.00-introduction-to-matplotlib.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w4_00">
            <div class="cell-header"><span>[ ] Practice: 4. Visualization with Matplotlib</span></div>
            <div class="editor-container" id="editor-w4_00"></div>
            <div class="controls"><button onclick="runCode('w4_00')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_00"></div>
        </div>
    `,
    'w4_01': `
        <h1>Simple Line Plots</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Simple Line Plots <a href="https://jakevdp.github.io/PythonDataScienceHandbook/04.01-simple-line-plots.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/04.01-simple-line-plots.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w4_01">
            <div class="cell-header"><span>[ ] Practice: Simple Line Plots</span></div>
            <div class="editor-container" id="editor-w4_01"></div>
            <div class="controls"><button onclick="runCode('w4_01')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_01"></div>
        </div>
    `,
    'w4_02': `
        <h1>Simple Scatter Plots</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Simple Scatter Plots <a href="https://jakevdp.github.io/PythonDataScienceHandbook/04.02-simple-scatter-plots.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/04.02-simple-scatter-plots.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w4_02">
            <div class="cell-header"><span>[ ] Practice: Simple Scatter Plots</span></div>
            <div class="editor-container" id="editor-w4_02"></div>
            <div class="controls"><button onclick="runCode('w4_02')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_02"></div>
        </div>
    `,
    'w4_03': `
        <h1>Visualizing Errors</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Visualizing Errors <a href="https://jakevdp.github.io/PythonDataScienceHandbook/04.03-errorbars.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/04.03-errorbars.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w4_03">
            <div class="cell-header"><span>[ ] Practice: Visualizing Errors</span></div>
            <div class="editor-container" id="editor-w4_03"></div>
            <div class="controls"><button onclick="runCode('w4_03')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_03"></div>
        </div>
    `,
    'w4_04': `
        <h1>Density and Contour Plots</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Density and Contour Plots <a href="https://jakevdp.github.io/PythonDataScienceHandbook/04.04-density-and-contour-plots.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/04.04-density-and-contour-plots.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w4_04">
            <div class="cell-header"><span>[ ] Practice: Density and Contour Plots</span></div>
            <div class="editor-container" id="editor-w4_04"></div>
            <div class="controls"><button onclick="runCode('w4_04')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_04"></div>
        </div>
    `,
    'w4_05': `
        <h1>Histograms, Binnings, and Density</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Histograms, Binnings, and Density <a href="https://jakevdp.github.io/PythonDataScienceHandbook/04.05-histograms-and-binnings.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/04.05-histograms-and-binnings.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w4_05">
            <div class="cell-header"><span>[ ] Practice: Histograms, Binnings, and Density</span></div>
            <div class="editor-container" id="editor-w4_05"></div>
            <div class="controls"><button onclick="runCode('w4_05')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_05"></div>
        </div>
    `,
    'w4_06': `
        <h1>Customizing Plot Legends</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Customizing Plot Legends <a href="https://jakevdp.github.io/PythonDataScienceHandbook/04.06-customizing-legends.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/04.06-customizing-legends.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w4_06">
            <div class="cell-header"><span>[ ] Practice: Customizing Plot Legends</span></div>
            <div class="editor-container" id="editor-w4_06"></div>
            <div class="controls"><button onclick="runCode('w4_06')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_06"></div>
        </div>
    `,
    'w4_07': `
        <h1>Customizing Colorbars</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Customizing Colorbars <a href="https://jakevdp.github.io/PythonDataScienceHandbook/04.07-customizing-colorbars.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/04.07-customizing-colorbars.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w4_07">
            <div class="cell-header"><span>[ ] Practice: Customizing Colorbars</span></div>
            <div class="editor-container" id="editor-w4_07"></div>
            <div class="controls"><button onclick="runCode('w4_07')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_07"></div>
        </div>
    `,
    'w4_08': `
        <h1>Multiple Subplots</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Multiple Subplots <a href="https://jakevdp.github.io/PythonDataScienceHandbook/04.08-multiple-subplots.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/04.08-multiple-subplots.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w4_08">
            <div class="cell-header"><span>[ ] Practice: Multiple Subplots</span></div>
            <div class="editor-container" id="editor-w4_08"></div>
            <div class="controls"><button onclick="runCode('w4_08')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_08"></div>
        </div>
    `,
    'w4_09': `
        <h1>Text and Annotation</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Text and Annotation <a href="https://jakevdp.github.io/PythonDataScienceHandbook/04.09-text-and-annotation.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/04.09-text-and-annotation.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w4_09">
            <div class="cell-header"><span>[ ] Practice: Text and Annotation</span></div>
            <div class="editor-container" id="editor-w4_09"></div>
            <div class="controls"><button onclick="runCode('w4_09')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_09"></div>
        </div>
    `,
    'w4_10': `
        <h1>Customizing Ticks</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Customizing Ticks <a href="https://jakevdp.github.io/PythonDataScienceHandbook/04.10-customizing-ticks.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/04.10-customizing-ticks.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w4_10">
            <div class="cell-header"><span>[ ] Practice: Customizing Ticks</span></div>
            <div class="editor-container" id="editor-w4_10"></div>
            <div class="controls"><button onclick="runCode('w4_10')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_10"></div>
        </div>
    `,
    'w4_11': `
        <h1>Customizing Matplotlib: Configurations and Stylesheets</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Customizing Matplotlib: Configurations and Stylesheets <a href="https://jakevdp.github.io/PythonDataScienceHandbook/04.11-settings-and-stylesheets.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/04.11-settings-and-stylesheets.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w4_11">
            <div class="cell-header"><span>[ ] Practice: Customizing Matplotlib: Configurations and Stylesheets</span></div>
            <div class="editor-container" id="editor-w4_11"></div>
            <div class="controls"><button onclick="runCode('w4_11')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_11"></div>
        </div>
    `,
    'w4_12': `
        <h1>Three-Dimensional Plotting in Matplotlib</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Three-Dimensional Plotting in Matplotlib <a href="https://jakevdp.github.io/PythonDataScienceHandbook/04.12-three-dimensional-plotting.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/04.12-three-dimensional-plotting.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w4_12">
            <div class="cell-header"><span>[ ] Practice: Three-Dimensional Plotting in Matplotlib</span></div>
            <div class="editor-container" id="editor-w4_12"></div>
            <div class="controls"><button onclick="runCode('w4_12')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_12"></div>
        </div>
    `,
    'w4_13': `
        <h1>Geographic Data with Basemap</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Geographic Data with Basemap <a href="https://jakevdp.github.io/PythonDataScienceHandbook/04.13-geographic-data-with-basemap.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/04.13-geographic-data-with-basemap.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w4_13">
            <div class="cell-header"><span>[ ] Practice: Geographic Data with Basemap</span></div>
            <div class="editor-container" id="editor-w4_13"></div>
            <div class="controls"><button onclick="runCode('w4_13')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_13"></div>
        </div>
    `,
    'w4_14': `
        <h1>Visualization with Seaborn</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Visualization with Seaborn <a href="https://jakevdp.github.io/PythonDataScienceHandbook/04.14-visualization-with-seaborn.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/04.14-visualization-with-seaborn.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w4_14">
            <div class="cell-header"><span>[ ] Practice: Visualization with Seaborn</span></div>
            <div class="editor-container" id="editor-w4_14"></div>
            <div class="controls"><button onclick="runCode('w4_14')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_14"></div>
        </div>
    `,
    'w4_15': `
        <h1>Further Resources</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Further Resources <a href="https://jakevdp.github.io/PythonDataScienceHandbook/04.15-further-resources.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/04.15-further-resources.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w4_15">
            <div class="cell-header"><span>[ ] Practice: Further Resources</span></div>
            <div class="editor-container" id="editor-w4_15"></div>
            <div class="controls"><button onclick="runCode('w4_15')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_15"></div>
        </div>
    `,
    'w5_00': `
        <h1>5. Machine Learning</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">5. Machine Learning <a href="https://jakevdp.github.io/PythonDataScienceHandbook/05.00-machine-learning.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/05.00-machine-learning.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w5_00">
            <div class="cell-header"><span>[ ] Practice: 5. Machine Learning</span></div>
            <div class="editor-container" id="editor-w5_00"></div>
            <div class="controls"><button onclick="runCode('w5_00')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_00"></div>
        </div>
    `,
    'w5_01': `
        <h1>What Is Machine Learning?</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">What Is Machine Learning? <a href="https://jakevdp.github.io/PythonDataScienceHandbook/05.01-what-is-machine-learning.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/05.01-what-is-machine-learning.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w5_01">
            <div class="cell-header"><span>[ ] Practice: What Is Machine Learning?</span></div>
            <div class="editor-container" id="editor-w5_01"></div>
            <div class="controls"><button onclick="runCode('w5_01')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_01"></div>
        </div>
    `,
    'w5_02': `
        <h1>Introducing Scikit-Learn</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Introducing Scikit-Learn <a href="https://jakevdp.github.io/PythonDataScienceHandbook/05.02-introducing-scikit-learn.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/05.02-introducing-scikit-learn.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w5_02">
            <div class="cell-header"><span>[ ] Practice: Introducing Scikit-Learn</span></div>
            <div class="editor-container" id="editor-w5_02"></div>
            <div class="controls"><button onclick="runCode('w5_02')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_02"></div>
        </div>
    `,
    'w5_03': `
        <h1>Hyperparameters and Model Validation</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Hyperparameters and Model Validation <a href="https://jakevdp.github.io/PythonDataScienceHandbook/05.03-hyperparameters-and-model-validation.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/05.03-hyperparameters-and-model-validation.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w5_03">
            <div class="cell-header"><span>[ ] Practice: Hyperparameters and Model Validation</span></div>
            <div class="editor-container" id="editor-w5_03"></div>
            <div class="controls"><button onclick="runCode('w5_03')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_03"></div>
        </div>
    `,
    'w5_04': `
        <h1>Feature Engineering</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Feature Engineering <a href="https://jakevdp.github.io/PythonDataScienceHandbook/05.04-feature-engineering.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/05.04-feature-engineering.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w5_04">
            <div class="cell-header"><span>[ ] Practice: Feature Engineering</span></div>
            <div class="editor-container" id="editor-w5_04"></div>
            <div class="controls"><button onclick="runCode('w5_04')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_04"></div>
        </div>
    `,
    'w5_05': `
        <h1>In Depth: Naive Bayes Classification</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">In Depth: Naive Bayes Classification <a href="https://jakevdp.github.io/PythonDataScienceHandbook/05.05-naive-bayes.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/05.05-naive-bayes.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w5_05">
            <div class="cell-header"><span>[ ] Practice: In Depth: Naive Bayes Classification</span></div>
            <div class="editor-container" id="editor-w5_05"></div>
            <div class="controls"><button onclick="runCode('w5_05')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_05"></div>
        </div>
    `,
    'w5_06': `
        <h1>In Depth: Linear Regression</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">In Depth: Linear Regression <a href="https://jakevdp.github.io/PythonDataScienceHandbook/05.06-linear-regression.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/05.06-linear-regression.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w5_06">
            <div class="cell-header"><span>[ ] Practice: In Depth: Linear Regression</span></div>
            <div class="editor-container" id="editor-w5_06"></div>
            <div class="controls"><button onclick="runCode('w5_06')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_06"></div>
        </div>
    `,
    'w5_07': `
        <h1>In-Depth: Support Vector Machines</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">In-Depth: Support Vector Machines <a href="https://jakevdp.github.io/PythonDataScienceHandbook/05.07-support-vector-machines.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/05.07-support-vector-machines.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w5_07">
            <div class="cell-header"><span>[ ] Practice: In-Depth: Support Vector Machines</span></div>
            <div class="editor-container" id="editor-w5_07"></div>
            <div class="controls"><button onclick="runCode('w5_07')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_07"></div>
        </div>
    `,
    'w5_08': `
        <h1>In-Depth: Decision Trees and Random Forests</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">In-Depth: Decision Trees and Random Forests <a href="https://jakevdp.github.io/PythonDataScienceHandbook/05.08-random-forests.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/05.08-random-forests.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w5_08">
            <div class="cell-header"><span>[ ] Practice: In-Depth: Decision Trees and Random Forests</span></div>
            <div class="editor-container" id="editor-w5_08"></div>
            <div class="controls"><button onclick="runCode('w5_08')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_08"></div>
        </div>
    `,
    'w5_09': `
        <h1>In Depth: Principal Component Analysis</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">In Depth: Principal Component Analysis <a href="https://jakevdp.github.io/PythonDataScienceHandbook/05.09-principal-component-analysis.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/05.09-principal-component-analysis.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w5_09">
            <div class="cell-header"><span>[ ] Practice: In Depth: Principal Component Analysis</span></div>
            <div class="editor-container" id="editor-w5_09"></div>
            <div class="controls"><button onclick="runCode('w5_09')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_09"></div>
        </div>
    `,
    'w5_10': `
        <h1>In-Depth: Manifold Learning</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">In-Depth: Manifold Learning <a href="https://jakevdp.github.io/PythonDataScienceHandbook/05.10-manifold-learning.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/05.10-manifold-learning.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w5_10">
            <div class="cell-header"><span>[ ] Practice: In-Depth: Manifold Learning</span></div>
            <div class="editor-container" id="editor-w5_10"></div>
            <div class="controls"><button onclick="runCode('w5_10')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_10"></div>
        </div>
    `,
    'w5_11': `
        <h1>In Depth: k-Means Clustering</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">In Depth: k-Means Clustering <a href="https://jakevdp.github.io/PythonDataScienceHandbook/05.11-k-means.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/05.11-k-means.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w5_11">
            <div class="cell-header"><span>[ ] Practice: In Depth: k-Means Clustering</span></div>
            <div class="editor-container" id="editor-w5_11"></div>
            <div class="controls"><button onclick="runCode('w5_11')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_11"></div>
        </div>
    `,
    'w5_12': `
        <h1>In Depth: Gaussian Mixture Models</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">In Depth: Gaussian Mixture Models <a href="https://jakevdp.github.io/PythonDataScienceHandbook/05.12-gaussian-mixtures.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/05.12-gaussian-mixtures.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w5_12">
            <div class="cell-header"><span>[ ] Practice: In Depth: Gaussian Mixture Models</span></div>
            <div class="editor-container" id="editor-w5_12"></div>
            <div class="controls"><button onclick="runCode('w5_12')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_12"></div>
        </div>
    `,
    'w5_13': `
        <h1>In-Depth: Kernel Density Estimation</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">In-Depth: Kernel Density Estimation <a href="https://jakevdp.github.io/PythonDataScienceHandbook/05.13-kernel-density-estimation.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/05.13-kernel-density-estimation.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w5_13">
            <div class="cell-header"><span>[ ] Practice: In-Depth: Kernel Density Estimation</span></div>
            <div class="editor-container" id="editor-w5_13"></div>
            <div class="controls"><button onclick="runCode('w5_13')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_13"></div>
        </div>
    `,
    'w5_14': `
        <h1>Application: A Face Detection Pipeline</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Application: A Face Detection Pipeline <a href="https://jakevdp.github.io/PythonDataScienceHandbook/05.14-image-features.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/05.14-image-features.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w5_14">
            <div class="cell-header"><span>[ ] Practice: Application: A Face Detection Pipeline</span></div>
            <div class="editor-container" id="editor-w5_14"></div>
            <div class="controls"><button onclick="runCode('w5_14')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_14"></div>
        </div>
    `,
    'w5_15': `
        <h1>Further Machine Learning Resources</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Further Machine Learning Resources <a href="https://jakevdp.github.io/PythonDataScienceHandbook/05.15-learning-more.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/05.15-learning-more.html"></iframe>
        </div>
        <div class="notebook-cell" id="cell-w5_15">
            <div class="cell-header"><span>[ ] Practice: Further Machine Learning Resources</span></div>
            <div class="editor-container" id="editor-w5_15"></div>
            <div class="controls"><button onclick="runCode('w5_15')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_15"></div>
        </div>
    `
};

const initialCode = {

    'w2_00': `# Practice Sandbox for 2. Introduction to NumPy\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w2_01': `# Practice Sandbox for Understanding Data Types in Python\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w2_02': `# Practice Sandbox for The Basics of NumPy Arrays\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w2_03': `# Practice Sandbox for Computation on NumPy Arrays: Universal Functions\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w2_04': `# Practice Sandbox for Aggregations: Min, Max, and Everything In Between\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w2_05': `# Practice Sandbox for Computation on Arrays: Broadcasting\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w2_06': `# Practice Sandbox for Comparisons, Masks, and Boolean Logic\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w2_07': `# Practice Sandbox for Fancy Indexing\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w2_08': `# Practice Sandbox for Sorting Arrays\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w2_09': `# Practice Sandbox for Structured Data: NumPy's Structured Arrays\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w3_00': `# Practice Sandbox for 3. Data Manipulation with Pandas\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w3_01': `# Practice Sandbox for Introducing Pandas Objects\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w3_02': `# Practice Sandbox for Data Indexing and Selection\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w3_03': `# Practice Sandbox for Operating on Data in Pandas\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w3_04': `# Practice Sandbox for Handling Missing Data\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w3_05': `# Practice Sandbox for Hierarchical Indexing\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w3_06': `# Practice Sandbox for Combining Datasets: Concat and Append\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w3_07': `# Practice Sandbox for Combining Datasets: Merge and Join\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w3_08': `# Practice Sandbox for Aggregation and Grouping\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w3_09': `# Practice Sandbox for Pivot Tables\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w3_10': `# Practice Sandbox for Vectorized String Operations\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w3_11': `# Practice Sandbox for Working with Time Series\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w3_12': `# Practice Sandbox for High-Performance Pandas: eval() and query()\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w3_13': `# Practice Sandbox for Further Resources\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w4_00': `# Practice Sandbox for 4. Visualization with Matplotlib\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w4_01': `# Practice Sandbox for Simple Line Plots\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w4_02': `# Practice Sandbox for Simple Scatter Plots\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w4_03': `# Practice Sandbox for Visualizing Errors\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w4_04': `# Practice Sandbox for Density and Contour Plots\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w4_05': `# Practice Sandbox for Histograms, Binnings, and Density\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w4_06': `# Practice Sandbox for Customizing Plot Legends\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w4_07': `# Practice Sandbox for Customizing Colorbars\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w4_08': `# Practice Sandbox for Multiple Subplots\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w4_09': `# Practice Sandbox for Text and Annotation\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w4_10': `# Practice Sandbox for Customizing Ticks\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w4_11': `# Practice Sandbox for Customizing Matplotlib: Configurations and Stylesheets\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w4_12': `# Practice Sandbox for Three-Dimensional Plotting in Matplotlib\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w4_13': `# Practice Sandbox for Geographic Data with Basemap\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w4_14': `# Practice Sandbox for Visualization with Seaborn\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w4_15': `# Practice Sandbox for Further Resources\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w5_00': `# Practice Sandbox for 5. Machine Learning\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w5_01': `# Practice Sandbox for What Is Machine Learning?\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w5_02': `# Practice Sandbox for Introducing Scikit-Learn\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w5_03': `# Practice Sandbox for Hyperparameters and Model Validation\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w5_04': `# Practice Sandbox for Feature Engineering\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w5_05': `# Practice Sandbox for In Depth: Naive Bayes Classification\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w5_06': `# Practice Sandbox for In Depth: Linear Regression\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w5_07': `# Practice Sandbox for In-Depth: Support Vector Machines\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w5_08': `# Practice Sandbox for In-Depth: Decision Trees and Random Forests\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w5_09': `# Practice Sandbox for In Depth: Principal Component Analysis\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w5_10': `# Practice Sandbox for In-Depth: Manifold Learning\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w5_11': `# Practice Sandbox for In Depth: k-Means Clustering\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w5_12': `# Practice Sandbox for In Depth: Gaussian Mixture Models\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w5_13': `# Practice Sandbox for In-Depth: Kernel Density Estimation\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w5_14': `# Practice Sandbox for Application: A Face Detection Pipeline\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`,
    'w5_15': `# Practice Sandbox for Further Machine Learning Resources\nimport numpy as np\nimport pandas as pd\n\n# Write your code here based on the reading above:\nprint("Ready to practice!")`
};

function loadLesson(lessonId) {
    document.querySelectorAll('.sidebar a.sub-link').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.sidebar a.sub-link').forEach(link => {
        if(link.getAttribute('onclick').includes(lessonId)) {
            link.classList.add('active');
            
            // expand parent if not expanded
            const parentLi = link.closest('li');
            if(parentLi && parentLi.parentElement && parentLi.parentElement.parentElement) {
                const mainLi = parentLi.parentElement.parentElement;
                if (!mainLi.classList.contains('active')) {
                    document.querySelectorAll('.sidebar > ul > li').forEach(li => li.classList.remove('active'));
                    mainLi.classList.add('active');
                }
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
