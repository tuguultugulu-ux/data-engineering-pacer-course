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
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
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
        
    `,
    'w2_01': `
        <h1>Understanding Data Types in Python</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Understanding Data Types in Python <a href="https://jakevdp.github.io/PythonDataScienceHandbook/02.01-understanding-data-types.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/02.01-understanding-data-types.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
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
        
    `,
    'w2_02': `
        <h1>The Basics of NumPy Arrays</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">The Basics of NumPy Arrays <a href="https://jakevdp.github.io/PythonDataScienceHandbook/02.02-the-basics-of-numpy-arrays.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/02.02-the-basics-of-numpy-arrays.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
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
        
    `,
    'w2_03': `
        <h1>Computation on NumPy Arrays: Universal Functions</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Computation on NumPy Arrays: Universal Functions <a href="https://jakevdp.github.io/PythonDataScienceHandbook/02.03-computation-on-arrays-ufuncs.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/02.03-computation-on-arrays-ufuncs.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
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
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
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
        
    `,
    'w2_05': `
        <h1>Computation on Arrays: Broadcasting</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Computation on Arrays: Broadcasting <a href="https://jakevdp.github.io/PythonDataScienceHandbook/02.05-computation-on-arrays-broadcasting.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/02.05-computation-on-arrays-broadcasting.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
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
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
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
        
    `,
    'w2_07': `
        <h1>Fancy Indexing</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Fancy Indexing <a href="https://jakevdp.github.io/PythonDataScienceHandbook/02.07-fancy-indexing.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/02.07-fancy-indexing.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
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
        
    `,
    'w2_08': `
        <h1>Sorting Arrays</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Sorting Arrays <a href="https://jakevdp.github.io/PythonDataScienceHandbook/02.08-sorting.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/02.08-sorting.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
        <div class="notebook-cell" id="cell-w2_08-0">
            <div class="cell-header"><span>[ ] Practice 1: Sorting Arrays</span></div>
            <div class="editor-container" id="editor-w2_08-0"></div>
            <div class="controls"><button onclick="runCode('w2_08-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_08-0"></div>
        </div>
        
    `,
    'w2_09': `
        <h1>Structured Data: NumPy's Structured Arrays</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Structured Data: NumPy's Structured Arrays <a href="https://jakevdp.github.io/PythonDataScienceHandbook/02.09-structured-data-numpy.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/02.09-structured-data-numpy.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
        <div class="notebook-cell" id="cell-w2_09-0">
            <div class="cell-header"><span>[ ] Practice 1: Structured Data: NumPy's Structured Arrays</span></div>
            <div class="editor-container" id="editor-w2_09-0"></div>
            <div class="controls"><button onclick="runCode('w2_09-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w2_09-0"></div>
        </div>
        
    `,
    'w3_00': `
        <h1>3. Data Manipulation with Pandas</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">3. Data Manipulation with Pandas <a href="https://jakevdp.github.io/PythonDataScienceHandbook/03.00-introduction-to-pandas.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/03.00-introduction-to-pandas.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
        <div class="notebook-cell" id="cell-w3_00-0">
            <div class="cell-header"><span>[ ] Practice 1: 3. Data Manipulation with Pandas</span></div>
            <div class="editor-container" id="editor-w3_00-0"></div>
            <div class="controls"><button onclick="runCode('w3_00-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_00-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_00-1">
            <div class="cell-header"><span>[ ] Practice 2: 3. Data Manipulation with Pandas</span></div>
            <div class="editor-container" id="editor-w3_00-1"></div>
            <div class="controls"><button onclick="runCode('w3_00-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_00-1"></div>
        </div>
        
    `,
    'w3_01': `
        <h1>Introducing Pandas Objects</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Introducing Pandas Objects <a href="https://jakevdp.github.io/PythonDataScienceHandbook/03.01-introducing-pandas-objects.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/03.01-introducing-pandas-objects.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
        <div class="notebook-cell" id="cell-w3_01-0">
            <div class="cell-header"><span>[ ] Practice 1: Introducing Pandas Objects</span></div>
            <div class="editor-container" id="editor-w3_01-0"></div>
            <div class="controls"><button onclick="runCode('w3_01-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_01-0"></div>
        </div>
        
    `,
    'w3_02': `
        <h1>Data Indexing and Selection</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Data Indexing and Selection <a href="https://jakevdp.github.io/PythonDataScienceHandbook/03.02-data-indexing-and-selection.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/03.02-data-indexing-and-selection.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
        <div class="notebook-cell" id="cell-w3_02-0">
            <div class="cell-header"><span>[ ] Practice 1: Data Indexing and Selection</span></div>
            <div class="editor-container" id="editor-w3_02-0"></div>
            <div class="controls"><button onclick="runCode('w3_02-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_02-0"></div>
        </div>
        
    `,
    'w3_03': `
        <h1>Operating on Data in Pandas</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Operating on Data in Pandas <a href="https://jakevdp.github.io/PythonDataScienceHandbook/03.03-operations-in-pandas.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/03.03-operations-in-pandas.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
        <div class="notebook-cell" id="cell-w3_03-0">
            <div class="cell-header"><span>[ ] Practice 1: Operating on Data in Pandas</span></div>
            <div class="editor-container" id="editor-w3_03-0"></div>
            <div class="controls"><button onclick="runCode('w3_03-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_03-0"></div>
        </div>
        
    `,
    'w3_04': `
        <h1>Handling Missing Data</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Handling Missing Data <a href="https://jakevdp.github.io/PythonDataScienceHandbook/03.04-missing-values.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/03.04-missing-values.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
        <div class="notebook-cell" id="cell-w3_04-0">
            <div class="cell-header"><span>[ ] Practice 1: Handling Missing Data</span></div>
            <div class="editor-container" id="editor-w3_04-0"></div>
            <div class="controls"><button onclick="runCode('w3_04-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_04-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_04-1">
            <div class="cell-header"><span>[ ] Practice 2: Handling Missing Data</span></div>
            <div class="editor-container" id="editor-w3_04-1"></div>
            <div class="controls"><button onclick="runCode('w3_04-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_04-1"></div>
        </div>
        
    `,
    'w3_05': `
        <h1>Hierarchical Indexing</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Hierarchical Indexing <a href="https://jakevdp.github.io/PythonDataScienceHandbook/03.05-hierarchical-indexing.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/03.05-hierarchical-indexing.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
        <div class="notebook-cell" id="cell-w3_05-0">
            <div class="cell-header"><span>[ ] Practice 1: Hierarchical Indexing</span></div>
            <div class="editor-container" id="editor-w3_05-0"></div>
            <div class="controls"><button onclick="runCode('w3_05-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_05-0"></div>
        </div>
        
    `,
    'w3_06': `
        <h1>Combining Datasets: Concat and Append</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Combining Datasets: Concat and Append <a href="https://jakevdp.github.io/PythonDataScienceHandbook/03.06-concat-and-append.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/03.06-concat-and-append.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
        <div class="notebook-cell" id="cell-w3_06-0">
            <div class="cell-header"><span>[ ] Practice 1: Combining Datasets: Concat and Append</span></div>
            <div class="editor-container" id="editor-w3_06-0"></div>
            <div class="controls"><button onclick="runCode('w3_06-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_06-0"></div>
        </div>
        
    `,
    'w3_07': `
        <h1>Combining Datasets: Merge and Join</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Combining Datasets: Merge and Join <a href="https://jakevdp.github.io/PythonDataScienceHandbook/03.07-merge-and-join.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/03.07-merge-and-join.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
        <div class="notebook-cell" id="cell-w3_07-0">
            <div class="cell-header"><span>[ ] Practice 1: Combining Datasets: Merge and Join</span></div>
            <div class="editor-container" id="editor-w3_07-0"></div>
            <div class="controls"><button onclick="runCode('w3_07-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_07-0"></div>
        </div>
        
    `,
    'w3_08': `
        <h1>Aggregation and Grouping</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Aggregation and Grouping <a href="https://jakevdp.github.io/PythonDataScienceHandbook/03.08-aggregation-and-grouping.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/03.08-aggregation-and-grouping.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
        <div class="notebook-cell" id="cell-w3_08-0">
            <div class="cell-header"><span>[ ] Practice 1: Aggregation and Grouping</span></div>
            <div class="editor-container" id="editor-w3_08-0"></div>
            <div class="controls"><button onclick="runCode('w3_08-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_08-0"></div>
        </div>
        
    `,
    'w3_09': `
        <h1>Pivot Tables</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Pivot Tables <a href="https://jakevdp.github.io/PythonDataScienceHandbook/03.09-pivot-tables.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/03.09-pivot-tables.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
        <div class="notebook-cell" id="cell-w3_09-0">
            <div class="cell-header"><span>[ ] Practice 1: Pivot Tables</span></div>
            <div class="editor-container" id="editor-w3_09-0"></div>
            <div class="controls"><button onclick="runCode('w3_09-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_09-0"></div>
        </div>
        
    `,
    'w3_10': `
        <h1>Vectorized String Operations</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Vectorized String Operations <a href="https://jakevdp.github.io/PythonDataScienceHandbook/03.10-working-with-strings.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/03.10-working-with-strings.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
        <div class="notebook-cell" id="cell-w3_10-0">
            <div class="cell-header"><span>[ ] Practice 1: Vectorized String Operations</span></div>
            <div class="editor-container" id="editor-w3_10-0"></div>
            <div class="controls"><button onclick="runCode('w3_10-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_10-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_10-1">
            <div class="cell-header"><span>[ ] Practice 2: Vectorized String Operations</span></div>
            <div class="editor-container" id="editor-w3_10-1"></div>
            <div class="controls"><button onclick="runCode('w3_10-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_10-1"></div>
        </div>
        
    `,
    'w3_11': `
        <h1>Working with Time Series</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Working with Time Series <a href="https://jakevdp.github.io/PythonDataScienceHandbook/03.11-working-with-time-series.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/03.11-working-with-time-series.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
        <div class="notebook-cell" id="cell-w3_11-0">
            <div class="cell-header"><span>[ ] Practice 1: Working with Time Series</span></div>
            <div class="editor-container" id="editor-w3_11-0"></div>
            <div class="controls"><button onclick="runCode('w3_11-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_11-0"></div>
        </div>
        
    `,
    'w3_12': `
        <h1>High-Performance Pandas: eval() and query()</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">High-Performance Pandas: eval() and query() <a href="https://jakevdp.github.io/PythonDataScienceHandbook/03.12-performance-eval-and-query.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/03.12-performance-eval-and-query.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
        <div class="notebook-cell" id="cell-w3_12-0">
            <div class="cell-header"><span>[ ] Practice 1: High-Performance Pandas: eval() and query()</span></div>
            <div class="editor-container" id="editor-w3_12-0"></div>
            <div class="controls"><button onclick="runCode('w3_12-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_12-0"></div>
        </div>
        
    `,
    'w3_13': `
        <h1>Further Resources</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Further Resources <a href="https://jakevdp.github.io/PythonDataScienceHandbook/03.13-further-resources.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/03.13-further-resources.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
        <div class="notebook-cell" id="cell-w3_13-0">
            <div class="cell-header"><span>[ ] Practice 1: Further Resources</span></div>
            <div class="editor-container" id="editor-w3_13-0"></div>
            <div class="controls"><button onclick="runCode('w3_13-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_13-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_13-1">
            <div class="cell-header"><span>[ ] Practice 2: Further Resources</span></div>
            <div class="editor-container" id="editor-w3_13-1"></div>
            <div class="controls"><button onclick="runCode('w3_13-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_13-1"></div>
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
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
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
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
        <div class="notebook-cell" id="cell-w4_01-0">
            <div class="cell-header"><span>[ ] Practice 1: Simple Line Plots</span></div>
            <div class="editor-container" id="editor-w4_01-0"></div>
            <div class="controls"><button onclick="runCode('w4_01-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_01-0"></div>
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
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
        <div class="notebook-cell" id="cell-w4_02-0">
            <div class="cell-header"><span>[ ] Practice 1: Simple Scatter Plots</span></div>
            <div class="editor-container" id="editor-w4_02-0"></div>
            <div class="controls"><button onclick="runCode('w4_02-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_02-0"></div>
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
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
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
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
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
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
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
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
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
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
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
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
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
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
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
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
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
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
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
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
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
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
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
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
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
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
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
    'w5_00': `
        <h1>5. Machine Learning</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">5. Machine Learning <a href="https://jakevdp.github.io/PythonDataScienceHandbook/05.00-machine-learning.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/05.00-machine-learning.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
        <div class="notebook-cell" id="cell-w5_00-0">
            <div class="cell-header"><span>[ ] Practice 1: 5. Machine Learning</span></div>
            <div class="editor-container" id="editor-w5_00-0"></div>
            <div class="controls"><button onclick="runCode('w5_00-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_00-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w5_00-1">
            <div class="cell-header"><span>[ ] Practice 2: 5. Machine Learning</span></div>
            <div class="editor-container" id="editor-w5_00-1"></div>
            <div class="controls"><button onclick="runCode('w5_00-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_00-1"></div>
        </div>
        
    `,
    'w5_01': `
        <h1>What Is Machine Learning?</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">What Is Machine Learning? <a href="https://jakevdp.github.io/PythonDataScienceHandbook/05.01-what-is-machine-learning.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/05.01-what-is-machine-learning.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
        <div class="notebook-cell" id="cell-w5_01-0">
            <div class="cell-header"><span>[ ] Practice 1: What Is Machine Learning?</span></div>
            <div class="editor-container" id="editor-w5_01-0"></div>
            <div class="controls"><button onclick="runCode('w5_01-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_01-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w5_01-1">
            <div class="cell-header"><span>[ ] Practice 2: What Is Machine Learning?</span></div>
            <div class="editor-container" id="editor-w5_01-1"></div>
            <div class="controls"><button onclick="runCode('w5_01-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_01-1"></div>
        </div>
        
    `,
    'w5_02': `
        <h1>Introducing Scikit-Learn</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Introducing Scikit-Learn <a href="https://jakevdp.github.io/PythonDataScienceHandbook/05.02-introducing-scikit-learn.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/05.02-introducing-scikit-learn.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
        <div class="notebook-cell" id="cell-w5_02-0">
            <div class="cell-header"><span>[ ] Practice 1: Introducing Scikit-Learn</span></div>
            <div class="editor-container" id="editor-w5_02-0"></div>
            <div class="controls"><button onclick="runCode('w5_02-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_02-0"></div>
        </div>
        
    `,
    'w5_03': `
        <h1>Hyperparameters and Model Validation</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Hyperparameters and Model Validation <a href="https://jakevdp.github.io/PythonDataScienceHandbook/05.03-hyperparameters-and-model-validation.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/05.03-hyperparameters-and-model-validation.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
        <div class="notebook-cell" id="cell-w5_03-0">
            <div class="cell-header"><span>[ ] Practice 1: Hyperparameters and Model Validation</span></div>
            <div class="editor-container" id="editor-w5_03-0"></div>
            <div class="controls"><button onclick="runCode('w5_03-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_03-0"></div>
        </div>
        
    `,
    'w5_04': `
        <h1>Feature Engineering</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Feature Engineering <a href="https://jakevdp.github.io/PythonDataScienceHandbook/05.04-feature-engineering.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/05.04-feature-engineering.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
        <div class="notebook-cell" id="cell-w5_04-0">
            <div class="cell-header"><span>[ ] Practice 1: Feature Engineering</span></div>
            <div class="editor-container" id="editor-w5_04-0"></div>
            <div class="controls"><button onclick="runCode('w5_04-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_04-0"></div>
        </div>
        
    `,
    'w5_05': `
        <h1>In Depth: Naive Bayes Classification</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">In Depth: Naive Bayes Classification <a href="https://jakevdp.github.io/PythonDataScienceHandbook/05.05-naive-bayes.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/05.05-naive-bayes.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
        <div class="notebook-cell" id="cell-w5_05-0">
            <div class="cell-header"><span>[ ] Practice 1: In Depth: Naive Bayes Classification</span></div>
            <div class="editor-container" id="editor-w5_05-0"></div>
            <div class="controls"><button onclick="runCode('w5_05-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_05-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w5_05-1">
            <div class="cell-header"><span>[ ] Practice 2: In Depth: Naive Bayes Classification</span></div>
            <div class="editor-container" id="editor-w5_05-1"></div>
            <div class="controls"><button onclick="runCode('w5_05-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_05-1"></div>
        </div>
        
    `,
    'w5_06': `
        <h1>In Depth: Linear Regression</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">In Depth: Linear Regression <a href="https://jakevdp.github.io/PythonDataScienceHandbook/05.06-linear-regression.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/05.06-linear-regression.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
        <div class="notebook-cell" id="cell-w5_06-0">
            <div class="cell-header"><span>[ ] Practice 1: In Depth: Linear Regression</span></div>
            <div class="editor-container" id="editor-w5_06-0"></div>
            <div class="controls"><button onclick="runCode('w5_06-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_06-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w5_06-1">
            <div class="cell-header"><span>[ ] Practice 2: In Depth: Linear Regression</span></div>
            <div class="editor-container" id="editor-w5_06-1"></div>
            <div class="controls"><button onclick="runCode('w5_06-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_06-1"></div>
        </div>
        
    `,
    'w5_07': `
        <h1>In-Depth: Support Vector Machines</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">In-Depth: Support Vector Machines <a href="https://jakevdp.github.io/PythonDataScienceHandbook/05.07-support-vector-machines.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/05.07-support-vector-machines.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
        <div class="notebook-cell" id="cell-w5_07-0">
            <div class="cell-header"><span>[ ] Practice 1: In-Depth: Support Vector Machines</span></div>
            <div class="editor-container" id="editor-w5_07-0"></div>
            <div class="controls"><button onclick="runCode('w5_07-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_07-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w5_07-1">
            <div class="cell-header"><span>[ ] Practice 2: In-Depth: Support Vector Machines</span></div>
            <div class="editor-container" id="editor-w5_07-1"></div>
            <div class="controls"><button onclick="runCode('w5_07-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_07-1"></div>
        </div>
        
    `,
    'w5_08': `
        <h1>In-Depth: Decision Trees and Random Forests</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">In-Depth: Decision Trees and Random Forests <a href="https://jakevdp.github.io/PythonDataScienceHandbook/05.08-random-forests.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/05.08-random-forests.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
        <div class="notebook-cell" id="cell-w5_08-0">
            <div class="cell-header"><span>[ ] Practice 1: In-Depth: Decision Trees and Random Forests</span></div>
            <div class="editor-container" id="editor-w5_08-0"></div>
            <div class="controls"><button onclick="runCode('w5_08-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_08-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w5_08-1">
            <div class="cell-header"><span>[ ] Practice 2: In-Depth: Decision Trees and Random Forests</span></div>
            <div class="editor-container" id="editor-w5_08-1"></div>
            <div class="controls"><button onclick="runCode('w5_08-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_08-1"></div>
        </div>
        
    `,
    'w5_09': `
        <h1>In Depth: Principal Component Analysis</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">In Depth: Principal Component Analysis <a href="https://jakevdp.github.io/PythonDataScienceHandbook/05.09-principal-component-analysis.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/05.09-principal-component-analysis.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
        <div class="notebook-cell" id="cell-w5_09-0">
            <div class="cell-header"><span>[ ] Practice 1: In Depth: Principal Component Analysis</span></div>
            <div class="editor-container" id="editor-w5_09-0"></div>
            <div class="controls"><button onclick="runCode('w5_09-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_09-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w5_09-1">
            <div class="cell-header"><span>[ ] Practice 2: In Depth: Principal Component Analysis</span></div>
            <div class="editor-container" id="editor-w5_09-1"></div>
            <div class="controls"><button onclick="runCode('w5_09-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_09-1"></div>
        </div>
        
    `,
    'w5_10': `
        <h1>In-Depth: Manifold Learning</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">In-Depth: Manifold Learning <a href="https://jakevdp.github.io/PythonDataScienceHandbook/05.10-manifold-learning.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/05.10-manifold-learning.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
        <div class="notebook-cell" id="cell-w5_10-0">
            <div class="cell-header"><span>[ ] Practice 1: In-Depth: Manifold Learning</span></div>
            <div class="editor-container" id="editor-w5_10-0"></div>
            <div class="controls"><button onclick="runCode('w5_10-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_10-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w5_10-1">
            <div class="cell-header"><span>[ ] Practice 2: In-Depth: Manifold Learning</span></div>
            <div class="editor-container" id="editor-w5_10-1"></div>
            <div class="controls"><button onclick="runCode('w5_10-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_10-1"></div>
        </div>
        
    `,
    'w5_11': `
        <h1>In Depth: k-Means Clustering</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">In Depth: k-Means Clustering <a href="https://jakevdp.github.io/PythonDataScienceHandbook/05.11-k-means.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/05.11-k-means.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
        <div class="notebook-cell" id="cell-w5_11-0">
            <div class="cell-header"><span>[ ] Practice 1: In Depth: k-Means Clustering</span></div>
            <div class="editor-container" id="editor-w5_11-0"></div>
            <div class="controls"><button onclick="runCode('w5_11-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_11-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w5_11-1">
            <div class="cell-header"><span>[ ] Practice 2: In Depth: k-Means Clustering</span></div>
            <div class="editor-container" id="editor-w5_11-1"></div>
            <div class="controls"><button onclick="runCode('w5_11-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_11-1"></div>
        </div>
        
    `,
    'w5_12': `
        <h1>In Depth: Gaussian Mixture Models</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">In Depth: Gaussian Mixture Models <a href="https://jakevdp.github.io/PythonDataScienceHandbook/05.12-gaussian-mixtures.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/05.12-gaussian-mixtures.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
        <div class="notebook-cell" id="cell-w5_12-0">
            <div class="cell-header"><span>[ ] Practice 1: In Depth: Gaussian Mixture Models</span></div>
            <div class="editor-container" id="editor-w5_12-0"></div>
            <div class="controls"><button onclick="runCode('w5_12-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_12-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w5_12-1">
            <div class="cell-header"><span>[ ] Practice 2: In Depth: Gaussian Mixture Models</span></div>
            <div class="editor-container" id="editor-w5_12-1"></div>
            <div class="controls"><button onclick="runCode('w5_12-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_12-1"></div>
        </div>
        
    `,
    'w5_13': `
        <h1>In-Depth: Kernel Density Estimation</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">In-Depth: Kernel Density Estimation <a href="https://jakevdp.github.io/PythonDataScienceHandbook/05.13-kernel-density-estimation.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/05.13-kernel-density-estimation.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
        <div class="notebook-cell" id="cell-w5_13-0">
            <div class="cell-header"><span>[ ] Practice 1: In-Depth: Kernel Density Estimation</span></div>
            <div class="editor-container" id="editor-w5_13-0"></div>
            <div class="controls"><button onclick="runCode('w5_13-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_13-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w5_13-1">
            <div class="cell-header"><span>[ ] Practice 2: In-Depth: Kernel Density Estimation</span></div>
            <div class="editor-container" id="editor-w5_13-1"></div>
            <div class="controls"><button onclick="runCode('w5_13-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_13-1"></div>
        </div>
        
    `,
    'w5_14': `
        <h1>Application: A Face Detection Pipeline</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Application: A Face Detection Pipeline <a href="https://jakevdp.github.io/PythonDataScienceHandbook/05.14-image-features.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/05.14-image-features.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
        <div class="notebook-cell" id="cell-w5_14-0">
            <div class="cell-header"><span>[ ] Practice 1: Application: A Face Detection Pipeline</span></div>
            <div class="editor-container" id="editor-w5_14-0"></div>
            <div class="controls"><button onclick="runCode('w5_14-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_14-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w5_14-1">
            <div class="cell-header"><span>[ ] Practice 2: Application: A Face Detection Pipeline</span></div>
            <div class="editor-container" id="editor-w5_14-1"></div>
            <div class="controls"><button onclick="runCode('w5_14-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_14-1"></div>
        </div>
        
    `,
    'w5_15': `
        <h1>Further Machine Learning Resources</h1>
        <div style="margin-bottom: 20px; font-weight: bold;" id="pyodide-status"></div>
        <div class="book-container">
            <div class="book-title">Further Machine Learning Resources <a href="https://jakevdp.github.io/PythonDataScienceHandbook/05.15-learning-more.html" target="_blank">Open in new tab</a></div>
            <iframe class="book-frame" src="https://jakevdp.github.io/PythonDataScienceHandbook/05.15-learning-more.html"></iframe>
        </div>
        <h3>Interactive Practice Modules</h3>
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
        <div class="notebook-cell" id="cell-w5_15-0">
            <div class="cell-header"><span>[ ] Practice 1: Further Machine Learning Resources</span></div>
            <div class="editor-container" id="editor-w5_15-0"></div>
            <div class="controls"><button onclick="runCode('w5_15-0')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_15-0"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w5_15-1">
            <div class="cell-header"><span>[ ] Practice 2: Further Machine Learning Resources</span></div>
            <div class="editor-container" id="editor-w5_15-1"></div>
            <div class="controls"><button onclick="runCode('w5_15-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_15-1"></div>
        </div>
        
    `
};

const initialCode = {
    'w2_00-0': `# Problem 1: Explore 2. Introduction to NumPy\n# TODO: Based on the reading above, implement a core function from the chapter to solve a mock problem.\nprint('Ready!')\n`,    'w2_00-1': `# Problem 2: Edge Cases for 2. Introduction to NumPy\n# TODO: Think of an edge case or error scenario mentioned in the text. Write code that triggers it, and write code that fixes it.\nprint('Ready!')\n`,    'w2_01-0': `# Problem 1: Upcasting\nimport numpy as np\n\n# TODO: Create a python list with integers and one float (e.g. 3.14).\n# TODO: Convert it to a numpy array.\n# TODO: Print the .dtype of the array and explain via comment why it chose that type.\n`,    'w2_01-1': `# Problem 2: Explicit Data Types\nimport numpy as np\n\n# TODO: Create an array of numbers from 1 to 5, but force the data type to be 32-bit floats.\n# TODO: Print the array and its dtype.\n`,    'w2_02-0': `# Problem 1: Array Attributes\nimport numpy as np\n\n# TODO: Use np.random.randint to create a 3-dimensional array of shape (3, 4, 5).\n# TODO: Print its .ndim, .shape, and .size attributes.\n`,    'w2_02-1': `# Problem 2: Slicing\nimport numpy as np\n\n# TODO: Create an array of numbers from 0 to 19 using np.arange().\n# TODO: Slice the array to get every second element starting from index 2 up to index 15.\n`,    'w2_03-0': `# Problem 1: Array Arithmetic (UFuncs)\nimport numpy as np\n\n# TODO: Create a numpy array of integers from 1 to 10.\n# TODO: Multiply every element by 5, then subtract 2, WITHOUT using any for-loops.\n# TODO: Print the final array.\n`,    'w2_03-1': `# Problem 2: Math Functions\nimport numpy as np\n\n# TODO: Create an array of 5 angles (in radians) evenly spaced between 0 and pi.\n# TODO: Use np.sin() and np.cos() to calculate the sine and cosine of these angles.\n`,    'w2_04-0': `# Problem 1: Global Aggregates\nimport numpy as np\n\n# TODO: Generate a massive array of 10,000 random numbers using np.random.rand().\n# TODO: Find the sum, minimum, and maximum values of the entire array using NumPy's built-in aggregation functions.\n`,    'w2_04-1': `# Problem 2: Multi-dimensional Aggregates\nimport numpy as np\n\n# TODO: Create a 5x5 matrix of random integers between 1 and 100.\n# TODO: Find the minimum value of each COLUMN (hint: use the axis argument).\n# TODO: Find the maximum value of each ROW.\n`,    'w2_05-0': `# Problem 1: Broadcasting Rules\nimport numpy as np\n\n# TODO: Create a 1D array of shape (3,) and a 2D array of shape (3, 3).\n# TODO: Add them together and print the result. Observe how the 1D array stretches across the 2D array.\n`,    'w2_05-1': `# Problem 2: Centering an Array\nimport numpy as np\n\n# TODO: Create a 10x3 array of random numbers.\n# TODO: Calculate the mean of each column.\n# TODO: Subtract the column means from the original array to 'center' the data. Print the result.\n`,    'w2_06-0': `# Problem 1: Counting with Booleans\nimport numpy as np\n\n# TODO: Create an array of 50 random integers between 0 and 100.\n# TODO: Use np.count_nonzero() to find how many numbers are strictly greater than 50.\n`,    'w2_06-1': `# Problem 2: Masking\nimport numpy as np\n\n# TODO: Using the same array from Problem 1, extract a new array containing ONLY the numbers that are strictly greater than 50 using boolean masking.\n# TODO: Print the new masked array.\n`,    'w2_07-0': `# Problem 1: Simple Fancy Indexing\nimport numpy as np\n\n# TODO: Create an array of 10 random numbers.\n# TODO: Create a python list containing the indices [2, 5, 8].\n# TODO: Use the list to extract just those three elements from the array.\n`,    'w2_07-1': `# Problem 2: 2D Fancy Indexing\nimport numpy as np\n\n# TODO: Create a 4x4 matrix.\n# TODO: Provide an array of row indices and an array of column indices to extract 4 specific items scattered across the matrix.\n`,    'w2_08-0': `# Problem 1: Sorting and Argsort\nimport numpy as np\n\n# TODO: Create an array of 5 random integers.\n# TODO: Sort the array and print the result.\n# TODO: Now use np.argsort() on the original array and print the resulting indices. Explain how argsort differs from sort.\n`,    'w2_09-0': `# Problem 1: Creating a Structured Array\nimport numpy as np\n\n# TODO: Create a structured array definition with fields for 'name' (string), 'age' (int), and 'salary' (float).\n# TODO: Fill it with data for 3 fictional employees and print the array.\n`,    'w3_00-0': `# Problem 1: Explore 3. Data Manipulation with Pandas\n# TODO: Based on the reading above, implement a core function from the chapter to solve a mock problem.\nprint('Ready!')\n`,    'w3_00-1': `# Problem 2: Edge Cases for 3. Data Manipulation with Pandas\n# TODO: Think of an edge case or error scenario mentioned in the text. Write code that triggers it, and write code that fixes it.\nprint('Ready!')\n`,    'w3_01-0': `# Problem 1: Series vs DataFrame\nimport pandas as pd\n\n# TODO: Create a Pandas Series from a python dictionary containing state populations.\n# TODO: Create a Pandas DataFrame by combining the population Series with a new Series representing state area.\n`,    'w3_02-0': `# Problem 1: loc vs iloc\nimport pandas as pd\n\n# TODO: Create a Series with a non-sequential integer index (e.g. index=[1, 3, 5]).\n# TODO: Access the first element using loc. Then access the first element using iloc. What is the difference?\n`,    'w3_03-0': `# Problem 1: Index Alignment\nimport pandas as pd\n\n# TODO: Create two Pandas Series with partially overlapping string indices (e.g. index=['A', 'B', 'C'] and index=['B', 'C', 'D']).\n# TODO: Add the two Series together. Print the result and observe how Pandas handles the non-overlapping indices (NaNs).\n`,    'w3_04-0': `# Problem 1: Detecting and Dropping\nimport pandas as pd\nimport numpy as np\n\n# TODO: Create a DataFrame with a few NaN values inserted intentionally.\n# TODO: Drop any ROW that contains a NaN value.\n# TODO: Drop any COLUMN that contains a NaN value.\n`,    'w3_04-1': `# Problem 2: Imputation\nimport pandas as pd\nimport numpy as np\n\n# TODO: Create a DataFrame with missing values in a numeric column.\n# TODO: Calculate the mean of that column.\n# TODO: Use fillna() to replace the NaNs with the calculated mean.\n`,    'w3_05-0': `# Problem 1: MultiIndex Creation\nimport pandas as pd\n\n# TODO: Create a MultiIndex from a list of arrays (e.g. levels for 'State' and 'Year').\n# TODO: Create a Series using this MultiIndex and print it.\n`,    'w3_06-0': `# Problem 1: Concatenation\nimport pandas as pd\n\n# TODO: Create two DataFrames with identical columns.\n# TODO: Use pd.concat() to stack them vertically.\n# TODO: Use pd.concat() to place them side-by-side horizontally (axis=1).\n`,    'w3_07-0': `# Problem 1: Inner vs Outer Joins\nimport pandas as pd\n\n# TODO: Create a 'employees' DataFrame and a 'departments' DataFrame that share a 'dept_id' column.\n# TODO: Perform an inner merge.\n# TODO: Perform an outer merge and observe the NaNs.\n`,    'w3_08-0': `# Problem 1: GroupBy Mechanics\nimport pandas as pd\n\n# TODO: Create a DataFrame representing sales data (columns: 'Store', 'Item', 'Revenue').\n# TODO: Group the DataFrame by 'Store'.\n# TODO: Calculate the total (sum) revenue for each store.\n`,    'w3_09-0': `# Problem 1: Creating a Pivot Table\nimport pandas as pd\n\n# TODO: Create a DataFrame with columns 'Year', 'Region', and 'Sales'.\n# TODO: Use the pivot_table method to show total Sales per Region across the Years.\n`,    'w3_10-0': `# Problem 1: Explore Vectorized String Operations\n# TODO: Based on the reading above, implement a core function from the chapter to solve a mock problem.\nprint('Ready!')\n`,    'w3_10-1': `# Problem 2: Edge Cases for Vectorized String Operations\n# TODO: Think of an edge case or error scenario mentioned in the text. Write code that triggers it, and write code that fixes it.\nprint('Ready!')\n`,    'w3_11-0': `# Problem 1: Datetime Index\nimport pandas as pd\n\n# TODO: Use pd.date_range to create an index of 10 consecutive days.\n# TODO: Create a Series using this index with random data.\n`,    'w3_12-0': `# Problem 1: Querying DataFrames\nimport pandas as pd\n\n# TODO: Create a DataFrame with columns 'A' and 'B' filled with random numbers.\n# TODO: Use the .query() method to filter rows where 'A' is greater than 'B'.\n`,    'w3_13-0': `# Problem 1: Explore Further Resources\n# TODO: Based on the reading above, implement a core function from the chapter to solve a mock problem.\nprint('Ready!')\n`,    'w3_13-1': `# Problem 2: Edge Cases for Further Resources\n# TODO: Think of an edge case or error scenario mentioned in the text. Write code that triggers it, and write code that fixes it.\nprint('Ready!')\n`,    'w4_00-0': `# Problem 1: Explore 4. Visualization with Matplotlib\n# TODO: Based on the reading above, implement a core function from the chapter to solve a mock problem.\nprint('Ready!')\n`,    'w4_00-1': `# Problem 2: Edge Cases for 4. Visualization with Matplotlib\n# TODO: Think of an edge case or error scenario mentioned in the text. Write code that triggers it, and write code that fixes it.\nprint('Ready!')\n`,    'w4_01-0': `# Problem 1: Line Plot Basics\nimport matplotlib.pyplot as plt\nimport numpy as np\n\n# TODO: Create an array x from 0 to 10.\n# TODO: Create an array y which is the sine of x.\n# TODO: (Note: plot won't display in this terminal sandbox, but write the code as if it would)\n# TODO: plt.plot(x, y)\nprint('Write the plotting code!')\n`,    'w4_02-0': `# Problem 1: Scatter Plot Basics\nimport matplotlib.pyplot as plt\nimport numpy as np\n\n# TODO: Create random x and y arrays of size 50.\n# TODO: Write the plt.scatter() code.\nprint('Write the plotting code!')\n`,    'w4_03-0': `# Problem 1: Explore Visualizing Errors\n# TODO: Based on the reading above, implement a core function from the chapter to solve a mock problem.\nprint('Ready!')\n`,    'w4_03-1': `# Problem 2: Edge Cases for Visualizing Errors\n# TODO: Think of an edge case or error scenario mentioned in the text. Write code that triggers it, and write code that fixes it.\nprint('Ready!')\n`,    'w4_04-0': `# Problem 1: Explore Density and Contour Plots\n# TODO: Based on the reading above, implement a core function from the chapter to solve a mock problem.\nprint('Ready!')\n`,    'w4_04-1': `# Problem 2: Edge Cases for Density and Contour Plots\n# TODO: Think of an edge case or error scenario mentioned in the text. Write code that triggers it, and write code that fixes it.\nprint('Ready!')\n`,    'w4_05-0': `# Problem 1: Explore Histograms, Binnings, and Density\n# TODO: Based on the reading above, implement a core function from the chapter to solve a mock problem.\nprint('Ready!')\n`,    'w4_05-1': `# Problem 2: Edge Cases for Histograms, Binnings, and Density\n# TODO: Think of an edge case or error scenario mentioned in the text. Write code that triggers it, and write code that fixes it.\nprint('Ready!')\n`,    'w4_06-0': `# Problem 1: Explore Customizing Plot Legends\n# TODO: Based on the reading above, implement a core function from the chapter to solve a mock problem.\nprint('Ready!')\n`,    'w4_06-1': `# Problem 2: Edge Cases for Customizing Plot Legends\n# TODO: Think of an edge case or error scenario mentioned in the text. Write code that triggers it, and write code that fixes it.\nprint('Ready!')\n`,    'w4_07-0': `# Problem 1: Explore Customizing Colorbars\n# TODO: Based on the reading above, implement a core function from the chapter to solve a mock problem.\nprint('Ready!')\n`,    'w4_07-1': `# Problem 2: Edge Cases for Customizing Colorbars\n# TODO: Think of an edge case or error scenario mentioned in the text. Write code that triggers it, and write code that fixes it.\nprint('Ready!')\n`,    'w4_08-0': `# Problem 1: Explore Multiple Subplots\n# TODO: Based on the reading above, implement a core function from the chapter to solve a mock problem.\nprint('Ready!')\n`,    'w4_08-1': `# Problem 2: Edge Cases for Multiple Subplots\n# TODO: Think of an edge case or error scenario mentioned in the text. Write code that triggers it, and write code that fixes it.\nprint('Ready!')\n`,    'w4_09-0': `# Problem 1: Explore Text and Annotation\n# TODO: Based on the reading above, implement a core function from the chapter to solve a mock problem.\nprint('Ready!')\n`,    'w4_09-1': `# Problem 2: Edge Cases for Text and Annotation\n# TODO: Think of an edge case or error scenario mentioned in the text. Write code that triggers it, and write code that fixes it.\nprint('Ready!')\n`,    'w4_10-0': `# Problem 1: Explore Customizing Ticks\n# TODO: Based on the reading above, implement a core function from the chapter to solve a mock problem.\nprint('Ready!')\n`,    'w4_10-1': `# Problem 2: Edge Cases for Customizing Ticks\n# TODO: Think of an edge case or error scenario mentioned in the text. Write code that triggers it, and write code that fixes it.\nprint('Ready!')\n`,    'w4_11-0': `# Problem 1: Explore Customizing Matplotlib: Configurations and Stylesheets\n# TODO: Based on the reading above, implement a core function from the chapter to solve a mock problem.\nprint('Ready!')\n`,    'w4_11-1': `# Problem 2: Edge Cases for Customizing Matplotlib: Configurations and Stylesheets\n# TODO: Think of an edge case or error scenario mentioned in the text. Write code that triggers it, and write code that fixes it.\nprint('Ready!')\n`,    'w4_12-0': `# Problem 1: Explore Three-Dimensional Plotting in Matplotlib\n# TODO: Based on the reading above, implement a core function from the chapter to solve a mock problem.\nprint('Ready!')\n`,    'w4_12-1': `# Problem 2: Edge Cases for Three-Dimensional Plotting in Matplotlib\n# TODO: Think of an edge case or error scenario mentioned in the text. Write code that triggers it, and write code that fixes it.\nprint('Ready!')\n`,    'w4_13-0': `# Problem 1: Explore Geographic Data with Basemap\n# TODO: Based on the reading above, implement a core function from the chapter to solve a mock problem.\nprint('Ready!')\n`,    'w4_13-1': `# Problem 2: Edge Cases for Geographic Data with Basemap\n# TODO: Think of an edge case or error scenario mentioned in the text. Write code that triggers it, and write code that fixes it.\nprint('Ready!')\n`,    'w4_14-0': `# Problem 1: Explore Visualization with Seaborn\n# TODO: Based on the reading above, implement a core function from the chapter to solve a mock problem.\nprint('Ready!')\n`,    'w4_14-1': `# Problem 2: Edge Cases for Visualization with Seaborn\n# TODO: Think of an edge case or error scenario mentioned in the text. Write code that triggers it, and write code that fixes it.\nprint('Ready!')\n`,    'w4_15-0': `# Problem 1: Explore Further Resources\n# TODO: Based on the reading above, implement a core function from the chapter to solve a mock problem.\nprint('Ready!')\n`,    'w4_15-1': `# Problem 2: Edge Cases for Further Resources\n# TODO: Think of an edge case or error scenario mentioned in the text. Write code that triggers it, and write code that fixes it.\nprint('Ready!')\n`,    'w5_00-0': `# Problem 1: Explore 5. Machine Learning\n# TODO: Based on the reading above, implement a core function from the chapter to solve a mock problem.\nprint('Ready!')\n`,    'w5_00-1': `# Problem 2: Edge Cases for 5. Machine Learning\n# TODO: Think of an edge case or error scenario mentioned in the text. Write code that triggers it, and write code that fixes it.\nprint('Ready!')\n`,    'w5_01-0': `# Problem 1: Explore What Is Machine Learning?\n# TODO: Based on the reading above, implement a core function from the chapter to solve a mock problem.\nprint('Ready!')\n`,    'w5_01-1': `# Problem 2: Edge Cases for What Is Machine Learning?\n# TODO: Think of an edge case or error scenario mentioned in the text. Write code that triggers it, and write code that fixes it.\nprint('Ready!')\n`,    'w5_02-0': `# Problem 1: The Estimator API\nfrom sklearn.linear_model import LinearRegression\nimport numpy as np\n\n# TODO: Instantiate a LinearRegression model.\n# TODO: Create dummy X (2D) and y (1D) data.\n# TODO: Call model.fit(X, y).\nprint('Write the Scikit-Learn code!')\n`,    'w5_03-0': `# Problem 1: Train/Test Split\nfrom sklearn.model_selection import train_test_split\nimport numpy as np\n\n# TODO: Create dummy X and y data with 100 samples.\n# TODO: Use train_test_split to hold out 20% of the data for testing.\n# TODO: Print the shapes of X_train, X_test, y_train, y_test.\n`,    'w5_04-0': `# Problem 1: One-Hot Encoding\nfrom sklearn.preprocessing import OneHotEncoder\nimport numpy as np\n\n# TODO: Create a 2D array representing categorical data (e.g. [['Red'], ['Blue'], ['Red']]).\n# TODO: Instantiate and fit a OneHotEncoder to transform the categorical data into binary flags.\n`,    'w5_05-0': `# Problem 1: Explore In Depth: Naive Bayes Classification\n# TODO: Based on the reading above, implement a core function from the chapter to solve a mock problem.\nprint('Ready!')\n`,    'w5_05-1': `# Problem 2: Edge Cases for In Depth: Naive Bayes Classification\n# TODO: Think of an edge case or error scenario mentioned in the text. Write code that triggers it, and write code that fixes it.\nprint('Ready!')\n`,    'w5_06-0': `# Problem 1: Explore In Depth: Linear Regression\n# TODO: Based on the reading above, implement a core function from the chapter to solve a mock problem.\nprint('Ready!')\n`,    'w5_06-1': `# Problem 2: Edge Cases for In Depth: Linear Regression\n# TODO: Think of an edge case or error scenario mentioned in the text. Write code that triggers it, and write code that fixes it.\nprint('Ready!')\n`,    'w5_07-0': `# Problem 1: Explore In-Depth: Support Vector Machines\n# TODO: Based on the reading above, implement a core function from the chapter to solve a mock problem.\nprint('Ready!')\n`,    'w5_07-1': `# Problem 2: Edge Cases for In-Depth: Support Vector Machines\n# TODO: Think of an edge case or error scenario mentioned in the text. Write code that triggers it, and write code that fixes it.\nprint('Ready!')\n`,    'w5_08-0': `# Problem 1: Explore In-Depth: Decision Trees and Random Forests\n# TODO: Based on the reading above, implement a core function from the chapter to solve a mock problem.\nprint('Ready!')\n`,    'w5_08-1': `# Problem 2: Edge Cases for In-Depth: Decision Trees and Random Forests\n# TODO: Think of an edge case or error scenario mentioned in the text. Write code that triggers it, and write code that fixes it.\nprint('Ready!')\n`,    'w5_09-0': `# Problem 1: Explore In Depth: Principal Component Analysis\n# TODO: Based on the reading above, implement a core function from the chapter to solve a mock problem.\nprint('Ready!')\n`,    'w5_09-1': `# Problem 2: Edge Cases for In Depth: Principal Component Analysis\n# TODO: Think of an edge case or error scenario mentioned in the text. Write code that triggers it, and write code that fixes it.\nprint('Ready!')\n`,    'w5_10-0': `# Problem 1: Explore In-Depth: Manifold Learning\n# TODO: Based on the reading above, implement a core function from the chapter to solve a mock problem.\nprint('Ready!')\n`,    'w5_10-1': `# Problem 2: Edge Cases for In-Depth: Manifold Learning\n# TODO: Think of an edge case or error scenario mentioned in the text. Write code that triggers it, and write code that fixes it.\nprint('Ready!')\n`,    'w5_11-0': `# Problem 1: Explore In Depth: k-Means Clustering\n# TODO: Based on the reading above, implement a core function from the chapter to solve a mock problem.\nprint('Ready!')\n`,    'w5_11-1': `# Problem 2: Edge Cases for In Depth: k-Means Clustering\n# TODO: Think of an edge case or error scenario mentioned in the text. Write code that triggers it, and write code that fixes it.\nprint('Ready!')\n`,    'w5_12-0': `# Problem 1: Explore In Depth: Gaussian Mixture Models\n# TODO: Based on the reading above, implement a core function from the chapter to solve a mock problem.\nprint('Ready!')\n`,    'w5_12-1': `# Problem 2: Edge Cases for In Depth: Gaussian Mixture Models\n# TODO: Think of an edge case or error scenario mentioned in the text. Write code that triggers it, and write code that fixes it.\nprint('Ready!')\n`,    'w5_13-0': `# Problem 1: Explore In-Depth: Kernel Density Estimation\n# TODO: Based on the reading above, implement a core function from the chapter to solve a mock problem.\nprint('Ready!')\n`,    'w5_13-1': `# Problem 2: Edge Cases for In-Depth: Kernel Density Estimation\n# TODO: Think of an edge case or error scenario mentioned in the text. Write code that triggers it, and write code that fixes it.\nprint('Ready!')\n`,    'w5_14-0': `# Problem 1: Explore Application: A Face Detection Pipeline\n# TODO: Based on the reading above, implement a core function from the chapter to solve a mock problem.\nprint('Ready!')\n`,    'w5_14-1': `# Problem 2: Edge Cases for Application: A Face Detection Pipeline\n# TODO: Think of an edge case or error scenario mentioned in the text. Write code that triggers it, and write code that fixes it.\nprint('Ready!')\n`,    'w5_15-0': `# Problem 1: Explore Further Machine Learning Resources\n# TODO: Based on the reading above, implement a core function from the chapter to solve a mock problem.\nprint('Ready!')\n`,    'w5_15-1': `# Problem 2: Edge Cases for Further Machine Learning Resources\n# TODO: Think of an edge case or error scenario mentioned in the text. Write code that triggers it, and write code that fixes it.\nprint('Ready!')\n`
};

function loadLesson(lessonId) {
    document.querySelectorAll('.sidebar a.sub-link').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.sidebar a.sub-link').forEach(link => {
        if(link.getAttribute('onclick').includes(lessonId)) {
            link.classList.add('active');
            
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
