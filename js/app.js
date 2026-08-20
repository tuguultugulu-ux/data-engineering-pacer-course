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
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
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
        
        <div class="notebook-cell" id="cell-w3_00-2">
            <div class="cell-header"><span>[ ] Practice 3: 3. Data Manipulation with Pandas</span></div>
            <div class="editor-container" id="editor-w3_00-2"></div>
            <div class="controls"><button onclick="runCode('w3_00-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_00-2"></div>
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
        
        <div class="notebook-cell" id="cell-w3_01-1">
            <div class="cell-header"><span>[ ] Practice 2: Introducing Pandas Objects</span></div>
            <div class="editor-container" id="editor-w3_01-1"></div>
            <div class="controls"><button onclick="runCode('w3_01-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_01-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_01-2">
            <div class="cell-header"><span>[ ] Practice 3: Introducing Pandas Objects</span></div>
            <div class="editor-container" id="editor-w3_01-2"></div>
            <div class="controls"><button onclick="runCode('w3_01-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_01-2"></div>
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
        
        <div class="notebook-cell" id="cell-w3_02-1">
            <div class="cell-header"><span>[ ] Practice 2: Data Indexing and Selection</span></div>
            <div class="editor-container" id="editor-w3_02-1"></div>
            <div class="controls"><button onclick="runCode('w3_02-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_02-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_02-2">
            <div class="cell-header"><span>[ ] Practice 3: Data Indexing and Selection</span></div>
            <div class="editor-container" id="editor-w3_02-2"></div>
            <div class="controls"><button onclick="runCode('w3_02-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_02-2"></div>
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
        
        <div class="notebook-cell" id="cell-w3_03-1">
            <div class="cell-header"><span>[ ] Practice 2: Operating on Data in Pandas</span></div>
            <div class="editor-container" id="editor-w3_03-1"></div>
            <div class="controls"><button onclick="runCode('w3_03-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_03-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_03-2">
            <div class="cell-header"><span>[ ] Practice 3: Operating on Data in Pandas</span></div>
            <div class="editor-container" id="editor-w3_03-2"></div>
            <div class="controls"><button onclick="runCode('w3_03-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_03-2"></div>
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
        
        <div class="notebook-cell" id="cell-w3_04-2">
            <div class="cell-header"><span>[ ] Practice 3: Handling Missing Data</span></div>
            <div class="editor-container" id="editor-w3_04-2"></div>
            <div class="controls"><button onclick="runCode('w3_04-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_04-2"></div>
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
        
        <div class="notebook-cell" id="cell-w3_05-1">
            <div class="cell-header"><span>[ ] Practice 2: Hierarchical Indexing</span></div>
            <div class="editor-container" id="editor-w3_05-1"></div>
            <div class="controls"><button onclick="runCode('w3_05-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_05-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_05-2">
            <div class="cell-header"><span>[ ] Practice 3: Hierarchical Indexing</span></div>
            <div class="editor-container" id="editor-w3_05-2"></div>
            <div class="controls"><button onclick="runCode('w3_05-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_05-2"></div>
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
        
        <div class="notebook-cell" id="cell-w3_06-1">
            <div class="cell-header"><span>[ ] Practice 2: Combining Datasets: Concat and Append</span></div>
            <div class="editor-container" id="editor-w3_06-1"></div>
            <div class="controls"><button onclick="runCode('w3_06-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_06-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_06-2">
            <div class="cell-header"><span>[ ] Practice 3: Combining Datasets: Concat and Append</span></div>
            <div class="editor-container" id="editor-w3_06-2"></div>
            <div class="controls"><button onclick="runCode('w3_06-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_06-2"></div>
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
        
        <div class="notebook-cell" id="cell-w3_07-1">
            <div class="cell-header"><span>[ ] Practice 2: Combining Datasets: Merge and Join</span></div>
            <div class="editor-container" id="editor-w3_07-1"></div>
            <div class="controls"><button onclick="runCode('w3_07-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_07-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_07-2">
            <div class="cell-header"><span>[ ] Practice 3: Combining Datasets: Merge and Join</span></div>
            <div class="editor-container" id="editor-w3_07-2"></div>
            <div class="controls"><button onclick="runCode('w3_07-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_07-2"></div>
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
        
        <div class="notebook-cell" id="cell-w3_08-1">
            <div class="cell-header"><span>[ ] Practice 2: Aggregation and Grouping</span></div>
            <div class="editor-container" id="editor-w3_08-1"></div>
            <div class="controls"><button onclick="runCode('w3_08-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_08-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_08-2">
            <div class="cell-header"><span>[ ] Practice 3: Aggregation and Grouping</span></div>
            <div class="editor-container" id="editor-w3_08-2"></div>
            <div class="controls"><button onclick="runCode('w3_08-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_08-2"></div>
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
        
        <div class="notebook-cell" id="cell-w3_09-1">
            <div class="cell-header"><span>[ ] Practice 2: Pivot Tables</span></div>
            <div class="editor-container" id="editor-w3_09-1"></div>
            <div class="controls"><button onclick="runCode('w3_09-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_09-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_09-2">
            <div class="cell-header"><span>[ ] Practice 3: Pivot Tables</span></div>
            <div class="editor-container" id="editor-w3_09-2"></div>
            <div class="controls"><button onclick="runCode('w3_09-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_09-2"></div>
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
        
        <div class="notebook-cell" id="cell-w3_10-2">
            <div class="cell-header"><span>[ ] Practice 3: Vectorized String Operations</span></div>
            <div class="editor-container" id="editor-w3_10-2"></div>
            <div class="controls"><button onclick="runCode('w3_10-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_10-2"></div>
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
        
        <div class="notebook-cell" id="cell-w3_11-1">
            <div class="cell-header"><span>[ ] Practice 2: Working with Time Series</span></div>
            <div class="editor-container" id="editor-w3_11-1"></div>
            <div class="controls"><button onclick="runCode('w3_11-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_11-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_11-2">
            <div class="cell-header"><span>[ ] Practice 3: Working with Time Series</span></div>
            <div class="editor-container" id="editor-w3_11-2"></div>
            <div class="controls"><button onclick="runCode('w3_11-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_11-2"></div>
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
        
        <div class="notebook-cell" id="cell-w3_12-1">
            <div class="cell-header"><span>[ ] Practice 2: High-Performance Pandas: eval() and query()</span></div>
            <div class="editor-container" id="editor-w3_12-1"></div>
            <div class="controls"><button onclick="runCode('w3_12-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_12-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w3_12-2">
            <div class="cell-header"><span>[ ] Practice 3: High-Performance Pandas: eval() and query()</span></div>
            <div class="editor-container" id="editor-w3_12-2"></div>
            <div class="controls"><button onclick="runCode('w3_12-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_12-2"></div>
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
        
        <div class="notebook-cell" id="cell-w3_13-2">
            <div class="cell-header"><span>[ ] Practice 3: Further Resources</span></div>
            <div class="editor-container" id="editor-w3_13-2"></div>
            <div class="controls"><button onclick="runCode('w3_13-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w3_13-2"></div>
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
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
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
        <p>Apply what you just read in the textbook chapter above. Solve each practice module below.</p>
        
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
        
        <div class="notebook-cell" id="cell-w4_15-2">
            <div class="cell-header"><span>[ ] Practice 3: Further Resources</span></div>
            <div class="editor-container" id="editor-w4_15-2"></div>
            <div class="controls"><button onclick="runCode('w4_15-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w4_15-2"></div>
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
        
        <div class="notebook-cell" id="cell-w5_00-2">
            <div class="cell-header"><span>[ ] Practice 3: 5. Machine Learning</span></div>
            <div class="editor-container" id="editor-w5_00-2"></div>
            <div class="controls"><button onclick="runCode('w5_00-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_00-2"></div>
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
        
        <div class="notebook-cell" id="cell-w5_01-2">
            <div class="cell-header"><span>[ ] Practice 3: What Is Machine Learning?</span></div>
            <div class="editor-container" id="editor-w5_01-2"></div>
            <div class="controls"><button onclick="runCode('w5_01-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_01-2"></div>
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
        
        <div class="notebook-cell" id="cell-w5_02-1">
            <div class="cell-header"><span>[ ] Practice 2: Introducing Scikit-Learn</span></div>
            <div class="editor-container" id="editor-w5_02-1"></div>
            <div class="controls"><button onclick="runCode('w5_02-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_02-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w5_02-2">
            <div class="cell-header"><span>[ ] Practice 3: Introducing Scikit-Learn</span></div>
            <div class="editor-container" id="editor-w5_02-2"></div>
            <div class="controls"><button onclick="runCode('w5_02-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_02-2"></div>
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
        
        <div class="notebook-cell" id="cell-w5_03-1">
            <div class="cell-header"><span>[ ] Practice 2: Hyperparameters and Model Validation</span></div>
            <div class="editor-container" id="editor-w5_03-1"></div>
            <div class="controls"><button onclick="runCode('w5_03-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_03-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w5_03-2">
            <div class="cell-header"><span>[ ] Practice 3: Hyperparameters and Model Validation</span></div>
            <div class="editor-container" id="editor-w5_03-2"></div>
            <div class="controls"><button onclick="runCode('w5_03-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_03-2"></div>
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
        
        <div class="notebook-cell" id="cell-w5_04-1">
            <div class="cell-header"><span>[ ] Practice 2: Feature Engineering</span></div>
            <div class="editor-container" id="editor-w5_04-1"></div>
            <div class="controls"><button onclick="runCode('w5_04-1')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_04-1"></div>
        </div>
        
        <div class="notebook-cell" id="cell-w5_04-2">
            <div class="cell-header"><span>[ ] Practice 3: Feature Engineering</span></div>
            <div class="editor-container" id="editor-w5_04-2"></div>
            <div class="controls"><button onclick="runCode('w5_04-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_04-2"></div>
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
        
        <div class="notebook-cell" id="cell-w5_05-2">
            <div class="cell-header"><span>[ ] Practice 3: In Depth: Naive Bayes Classification</span></div>
            <div class="editor-container" id="editor-w5_05-2"></div>
            <div class="controls"><button onclick="runCode('w5_05-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_05-2"></div>
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
        
        <div class="notebook-cell" id="cell-w5_06-2">
            <div class="cell-header"><span>[ ] Practice 3: In Depth: Linear Regression</span></div>
            <div class="editor-container" id="editor-w5_06-2"></div>
            <div class="controls"><button onclick="runCode('w5_06-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_06-2"></div>
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
        
        <div class="notebook-cell" id="cell-w5_07-2">
            <div class="cell-header"><span>[ ] Practice 3: In-Depth: Support Vector Machines</span></div>
            <div class="editor-container" id="editor-w5_07-2"></div>
            <div class="controls"><button onclick="runCode('w5_07-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_07-2"></div>
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
        
        <div class="notebook-cell" id="cell-w5_08-2">
            <div class="cell-header"><span>[ ] Practice 3: In-Depth: Decision Trees and Random Forests</span></div>
            <div class="editor-container" id="editor-w5_08-2"></div>
            <div class="controls"><button onclick="runCode('w5_08-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_08-2"></div>
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
        
        <div class="notebook-cell" id="cell-w5_09-2">
            <div class="cell-header"><span>[ ] Practice 3: In Depth: Principal Component Analysis</span></div>
            <div class="editor-container" id="editor-w5_09-2"></div>
            <div class="controls"><button onclick="runCode('w5_09-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_09-2"></div>
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
        
        <div class="notebook-cell" id="cell-w5_10-2">
            <div class="cell-header"><span>[ ] Practice 3: In-Depth: Manifold Learning</span></div>
            <div class="editor-container" id="editor-w5_10-2"></div>
            <div class="controls"><button onclick="runCode('w5_10-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_10-2"></div>
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
        
        <div class="notebook-cell" id="cell-w5_11-2">
            <div class="cell-header"><span>[ ] Practice 3: In Depth: k-Means Clustering</span></div>
            <div class="editor-container" id="editor-w5_11-2"></div>
            <div class="controls"><button onclick="runCode('w5_11-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_11-2"></div>
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
        
        <div class="notebook-cell" id="cell-w5_12-2">
            <div class="cell-header"><span>[ ] Practice 3: In Depth: Gaussian Mixture Models</span></div>
            <div class="editor-container" id="editor-w5_12-2"></div>
            <div class="controls"><button onclick="runCode('w5_12-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_12-2"></div>
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
        
        <div class="notebook-cell" id="cell-w5_13-2">
            <div class="cell-header"><span>[ ] Practice 3: In-Depth: Kernel Density Estimation</span></div>
            <div class="editor-container" id="editor-w5_13-2"></div>
            <div class="controls"><button onclick="runCode('w5_13-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_13-2"></div>
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
        
        <div class="notebook-cell" id="cell-w5_14-2">
            <div class="cell-header"><span>[ ] Practice 3: Application: A Face Detection Pipeline</span></div>
            <div class="editor-container" id="editor-w5_14-2"></div>
            <div class="controls"><button onclick="runCode('w5_14-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_14-2"></div>
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
        
        <div class="notebook-cell" id="cell-w5_15-2">
            <div class="cell-header"><span>[ ] Practice 3: Further Machine Learning Resources</span></div>
            <div class="editor-container" id="editor-w5_15-2"></div>
            <div class="controls"><button onclick="runCode('w5_15-2')">▶ Run Cell</button></div>
            <div class="output-container" id="output-w5_15-2"></div>
        </div>
        
    `
};

const initialCode = {
    'w2_00-0': `# Practice 1 for 2. Introduction to NumPy\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w2_00-1': `# Practice 2 for 2. Introduction to NumPy\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w2_00-2': `# Practice 3 for 2. Introduction to NumPy\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w2_01-0': `# Practice 1: Creating arrays from Python lists\nimport numpy as np\n\n# TODO: Create an integer array from a list and print its dtype\narr_int = np.array([1, 2, 3, 4])\nprint('Int array dtype:', arr_int.dtype)\n\n# TODO: Create a float array and print its dtype\n`,    'w2_01-1': `# Practice 2: Upcasting in NumPy\nimport numpy as np\n\n# TODO: Create an array with both integers and floats. What happens?\narr = np.array([3.14, 4, 2, 3])\nprint('Array:', arr)\nprint('Dtype:', arr.dtype)\n`,    'w2_01-2': `# Practice 3: Explicit typing\nimport numpy as np\n\n# TODO: Create an array of integers but explicitly set dtype to 'float32'\narr_explicit = np.array([1, 2, 3, 4], dtype='float32')\nprint('Explicit dtype array:', arr_explicit)\n`,    'w2_02-0': `# Practice 1: Array Attributes\nimport numpy as np\nnp.random.seed(0)\n\nx3 = np.random.randint(10, size=(3, 4, 5))\n\n# TODO: Print the ndim, shape, and size of x3\nprint('x3 ndim: ', x3.ndim)\nprint('x3 shape:', x3.shape)\nprint('x3 size: ', x3.size)\n`,    'w2_02-1': `# Practice 2: Array Indexing\nimport numpy as np\n\nx1 = np.array([5, 0, 3, 3, 7, 9])\n# TODO: Access the first and last elements\nprint('First:', x1[0])\nprint('Last:', x1[-1])\n`,    'w2_02-2': `# Practice 3: Array Slicing\nimport numpy as np\n\nx = np.arange(10)\n# TODO: Get the first five elements, and elements after index 5\nprint('First five:', x[:5])\nprint('Elements after 5:', x[5:])\n`,    'w2_03-0': `# Practice 1: Array Arithmetic (UFuncs)\nimport numpy as np\n\nx = np.arange(4)\nprint('x     =', x)\nprint('x + 5 =', x + 5)\nprint('x * 2 =', x * 2)\n`,    'w2_03-1': `# Practice 2: Absolute Value\nimport numpy as np\n\nx = np.array([-2, -1, 0, 1, 2])\n# TODO: Find the absolute value of all elements using np.abs()\nprint('Absolute values:', np.abs(x))\n`,    'w2_03-2': `# Practice 3: Trigonometric functions\nimport numpy as np\n\ntheta = np.linspace(0, np.pi, 3)\n# TODO: compute sin(theta) and cos(theta)\nprint('sin(theta) =', np.sin(theta))\nprint('cos(theta) =', np.cos(theta))\n`,    'w2_04-0': `# Practice 1: Summing the values in an array\nimport numpy as np\n\nL = np.random.random(100)\n# TODO: Compute the sum of L using np.sum()\nprint('Sum:', np.sum(L))\n`,    'w2_04-1': `# Practice 2: Minimum and Maximum\nimport numpy as np\n\nbig_array = np.random.rand(1000)\n# TODO: Find the min and max of big_array\nprint('Min:', np.min(big_array))\nprint('Max:', np.max(big_array))\n`,    'w2_04-2': `# Practice 3: Multi-dimensional aggregates\nimport numpy as np\n\nM = np.random.random((3, 4))\nprint(M)\n# TODO: Find the minimum value within each column (axis=0)\nprint('Column mins:', M.min(axis=0))\n`,    'w2_05-0': `# Practice 1: Broadcasting Basics\nimport numpy as np\n\na = np.array([0, 1, 2])\nb = np.array([5, 5, 5])\n# TODO: Add arrays a and b\nprint('a + b =', a + b)\n`,    'w2_05-1': `# Practice 2: Broadcasting with a scalar\nimport numpy as np\n\na = np.array([0, 1, 2])\n# TODO: Add 5 to array a\nprint('a + 5 =', a + 5)\n`,    'w2_05-2': `# Practice 3: Broadcasting 1D to 2D\nimport numpy as np\n\nM = np.ones((3, 3))\na = np.array([0, 1, 2])\n# TODO: Add 1D array a to 2D array M\nprint('M + a =\n', M + a)\n`,    'w2_06-0': `# Practice 1: Comparison Operators\nimport numpy as np\n\nx = np.array([1, 2, 3, 4, 5])\n# TODO: Find elements less than 3\nprint('x < 3:', x < 3)\n`,    'w2_06-1': `# Practice 2: Working with Boolean Arrays\nimport numpy as np\n\nx = np.random.randint(10, size=(3, 4))\nprint(x)\n# TODO: Count how many values are less than 6\nprint('Count < 6:', np.count_nonzero(x < 6))\n`,    'w2_06-2': `# Practice 3: Boolean Arrays as Masks\nimport numpy as np\n\nx = np.random.randint(10, size=(3, 4))\n# TODO: Extract all values less than 5\nmask = x < 5\nprint('Values < 5:', x[mask])\n`,    'w2_07-0': `# Practice 1: Fancy Indexing basics\nimport numpy as np\nrand = np.random.RandomState(42)\n\nx = rand.randint(100, size=10)\nprint('x:', x)\n# TODO: Access elements at indices 3, 7, and 2 using a list\nind = [3, 7, 2]\nprint('Elements:', x[ind])\n`,    'w2_07-1': `# Practice 2: Fancy Indexing changing shape\nimport numpy as np\nrand = np.random.RandomState(42)\nx = rand.randint(100, size=10)\n# TODO: Reshape the output by passing a 2D array of indices\nind = np.array([[3, 7], [4, 5]])\nprint('2D Elements:\n', x[ind])\n`,    'w2_07-2': `# Practice 3: Combined Indexing\nimport numpy as np\nX = np.arange(12).reshape((3, 4))\nprint(X)\n# TODO: Combine simple and fancy indexing\nprint('Combined:\n', X[2, [2, 0, 1]])\n`,    'w2_08-0': `# Practice 1: Fast Sorting\nimport numpy as np\n\nx = np.array([2, 1, 4, 3, 5])\n# TODO: Return a sorted version of x\nprint('Sorted:', np.sort(x))\n`,    'w2_08-1': `# Practice 2: Argsort\nimport numpy as np\n\nx = np.array([2, 1, 4, 3, 5])\n# TODO: Return the indices that would sort x\nprint('Argsort:', np.argsort(x))\n`,    'w2_08-2': `# Practice 3: Sorting along columns or rows\nimport numpy as np\nrand = np.random.RandomState(42)\nX = rand.randint(0, 10, (4, 6))\nprint('Original:\n', X)\n# TODO: Sort each column of X\nprint('Sorted columns:\n', np.sort(X, axis=0))\n`,    'w2_09-0': `# Practice 1: Structured Arrays\nimport numpy as np\n\nname = ['Alice', 'Bob', 'Cathy', 'Doug']\nage = [25, 45, 37, 19]\nweight = [55.0, 85.5, 68.0, 61.5]\n# TODO: Create a structured array for this data\ndata = np.zeros(4, dtype={'names':('name', 'age', 'weight'), 'formats':('U10', 'i4', 'f8')})\ndata['name'] = name\ndata['age'] = age\ndata['weight'] = weight\nprint(data)\n`,    'w2_09-1': `# Practice 2: Indexing Structured Arrays\nimport numpy as np\n# Use the 'data' array from Practice 1\n# (Simulated data below)\ndata = np.array([('Alice', 25, 55.), ('Bob', 45, 85.5)], dtype=[('name', 'U10'), ('age', 'i4'), ('weight', 'f8')])\n# TODO: Get all names\nprint('Names:', data['name'])\n`,    'w2_09-2': `# Practice 3: Boolean masking on Structured Arrays\nimport numpy as np\ndata = np.array([('Alice', 25, 55.), ('Bob', 45, 85.5)], dtype=[('name', 'U10'), ('age', 'i4'), ('weight', 'f8')])\n# TODO: Get names where age is under 30\nprint('Age < 30:', data[data['age'] < 30]['name'])\n`,    'w3_00-0': `# Practice 1 for 3. Data Manipulation with Pandas\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w3_00-1': `# Practice 2 for 3. Data Manipulation with Pandas\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w3_00-2': `# Practice 3 for 3. Data Manipulation with Pandas\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w3_01-0': `# Practice 1: The Pandas Series\nimport pandas as pd\n\ndata = pd.Series([0.25, 0.5, 0.75, 1.0])\n# TODO: Print the Series and its values\nprint('Series:\n', data)\nprint('Values:', data.values)\n`,    'w3_01-1': `# Practice 2: The Pandas DataFrame\nimport pandas as pd\n\npopulation_dict = {'California': 38332521, 'Texas': 26448193, 'New York': 19651127}\narea_dict = {'California': 423967, 'Texas': 695662, 'New York': 141297}\n# TODO: Create a DataFrame from the dictionaries\nstates = pd.DataFrame({'population': population_dict, 'area': area_dict})\nprint(states)\n`,    'w3_01-2': `# Practice 3: The Pandas Index\nimport pandas as pd\n\nind = pd.Index([2, 3, 5, 7, 11])\n# TODO: Treat the index like an array\nprint('Index at 1:', ind[1])\nprint('Index slice:', ind[::2])\n`,    'w3_02-0': `# Practice 1: Series as dictionary\nimport pandas as pd\n\ndata = pd.Series([0.25, 0.5, 0.75, 1.0], index=['a', 'b', 'c', 'd'])\n# TODO: Access value by key\nprint('Value at b:', data['b'])\n`,    'w3_02-1': `# Practice 2: DataFrame as a dictionary\nimport pandas as pd\n\narea = pd.Series({'California': 423967, 'Texas': 695662, 'New York': 141297})\npop = pd.Series({'California': 38332521, 'Texas': 26448193, 'New York': 19651127})\ndata = pd.DataFrame({'area':area, 'pop':pop})\n# TODO: Access the area column\nprint(data['area'])\n`,    'w3_02-2': `# Practice 3: Loc and Iloc\nimport pandas as pd\n\ndata = pd.Series(['a', 'b', 'c'], index=[1, 3, 5])\n# TODO: Use loc for explicit index, iloc for implicit index\nprint('loc[1]:', data.loc[1])\nprint('iloc[1]:', data.iloc[1])\n`,    'w3_03-0': `# Practice 1 for Operating on Data in Pandas\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w3_03-1': `# Practice 2 for Operating on Data in Pandas\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w3_03-2': `# Practice 3 for Operating on Data in Pandas\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w3_04-0': `# Practice 1: Detecting null values\nimport pandas as pd\nimport numpy as np\n\ndata = pd.Series([1, np.nan, 'hello', None])\n# TODO: Create a boolean mask of null values\nprint('Nulls:\n', data.isnull())\n`,    'w3_04-1': `# Practice 2: Dropping null values\nimport pandas as pd\nimport numpy as np\n\ndata = pd.Series([1, np.nan, 'hello', None])\n# TODO: Drop the null values\nprint('Dropped:\n', data.dropna())\n`,    'w3_04-2': `# Practice 3: Filling null values\nimport pandas as pd\nimport numpy as np\n\ndata = pd.Series([1, np.nan, 2, None, 3], index=list('abcde'))\n# TODO: Fill null values with 0\nprint('Filled:\n', data.fillna(0))\n`,    'w3_05-0': `# Practice 1 for Hierarchical Indexing\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w3_05-1': `# Practice 2 for Hierarchical Indexing\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w3_05-2': `# Practice 3 for Hierarchical Indexing\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w3_06-0': `# Practice 1 for Combining Datasets: Concat and Append\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w3_06-1': `# Practice 2 for Combining Datasets: Concat and Append\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w3_06-2': `# Practice 3 for Combining Datasets: Concat and Append\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w3_07-0': `# Practice 1 for Combining Datasets: Merge and Join\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w3_07-1': `# Practice 2 for Combining Datasets: Merge and Join\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w3_07-2': `# Practice 3 for Combining Datasets: Merge and Join\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w3_08-0': `# Practice 1 for Aggregation and Grouping\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w3_08-1': `# Practice 2 for Aggregation and Grouping\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w3_08-2': `# Practice 3 for Aggregation and Grouping\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w3_09-0': `# Practice 1 for Pivot Tables\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w3_09-1': `# Practice 2 for Pivot Tables\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w3_09-2': `# Practice 3 for Pivot Tables\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w3_10-0': `# Practice 1 for Vectorized String Operations\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w3_10-1': `# Practice 2 for Vectorized String Operations\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w3_10-2': `# Practice 3 for Vectorized String Operations\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w3_11-0': `# Practice 1 for Working with Time Series\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w3_11-1': `# Practice 2 for Working with Time Series\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w3_11-2': `# Practice 3 for Working with Time Series\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w3_12-0': `# Practice 1 for High-Performance Pandas: eval() and query()\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w3_12-1': `# Practice 2 for High-Performance Pandas: eval() and query()\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w3_12-2': `# Practice 3 for High-Performance Pandas: eval() and query()\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w3_13-0': `# Practice 1 for Further Resources\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w3_13-1': `# Practice 2 for Further Resources\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w3_13-2': `# Practice 3 for Further Resources\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w4_00-0': `# Practice 1 for 4. Visualization with Matplotlib\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w4_00-1': `# Practice 2 for 4. Visualization with Matplotlib\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w4_00-2': `# Practice 3 for 4. Visualization with Matplotlib\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w4_01-0': `# Practice 1 for Simple Line Plots\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w4_01-1': `# Practice 2 for Simple Line Plots\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w4_01-2': `# Practice 3 for Simple Line Plots\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w4_02-0': `# Practice 1 for Simple Scatter Plots\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w4_02-1': `# Practice 2 for Simple Scatter Plots\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w4_02-2': `# Practice 3 for Simple Scatter Plots\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w4_03-0': `# Practice 1 for Visualizing Errors\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w4_03-1': `# Practice 2 for Visualizing Errors\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w4_03-2': `# Practice 3 for Visualizing Errors\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w4_04-0': `# Practice 1 for Density and Contour Plots\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w4_04-1': `# Practice 2 for Density and Contour Plots\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w4_04-2': `# Practice 3 for Density and Contour Plots\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w4_05-0': `# Practice 1 for Histograms, Binnings, and Density\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w4_05-1': `# Practice 2 for Histograms, Binnings, and Density\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w4_05-2': `# Practice 3 for Histograms, Binnings, and Density\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w4_06-0': `# Practice 1 for Customizing Plot Legends\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w4_06-1': `# Practice 2 for Customizing Plot Legends\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w4_06-2': `# Practice 3 for Customizing Plot Legends\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w4_07-0': `# Practice 1 for Customizing Colorbars\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w4_07-1': `# Practice 2 for Customizing Colorbars\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w4_07-2': `# Practice 3 for Customizing Colorbars\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w4_08-0': `# Practice 1 for Multiple Subplots\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w4_08-1': `# Practice 2 for Multiple Subplots\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w4_08-2': `# Practice 3 for Multiple Subplots\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w4_09-0': `# Practice 1 for Text and Annotation\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w4_09-1': `# Practice 2 for Text and Annotation\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w4_09-2': `# Practice 3 for Text and Annotation\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w4_10-0': `# Practice 1 for Customizing Ticks\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w4_10-1': `# Practice 2 for Customizing Ticks\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w4_10-2': `# Practice 3 for Customizing Ticks\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w4_11-0': `# Practice 1 for Customizing Matplotlib: Configurations and Stylesheets\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w4_11-1': `# Practice 2 for Customizing Matplotlib: Configurations and Stylesheets\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w4_11-2': `# Practice 3 for Customizing Matplotlib: Configurations and Stylesheets\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w4_12-0': `# Practice 1 for Three-Dimensional Plotting in Matplotlib\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w4_12-1': `# Practice 2 for Three-Dimensional Plotting in Matplotlib\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w4_12-2': `# Practice 3 for Three-Dimensional Plotting in Matplotlib\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w4_13-0': `# Practice 1 for Geographic Data with Basemap\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w4_13-1': `# Practice 2 for Geographic Data with Basemap\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w4_13-2': `# Practice 3 for Geographic Data with Basemap\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w4_14-0': `# Practice 1 for Visualization with Seaborn\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w4_14-1': `# Practice 2 for Visualization with Seaborn\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w4_14-2': `# Practice 3 for Visualization with Seaborn\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w4_15-0': `# Practice 1 for Further Resources\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w4_15-1': `# Practice 2 for Further Resources\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w4_15-2': `# Practice 3 for Further Resources\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w5_00-0': `# Practice 1 for 5. Machine Learning\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w5_00-1': `# Practice 2 for 5. Machine Learning\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w5_00-2': `# Practice 3 for 5. Machine Learning\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w5_01-0': `# Practice 1 for What Is Machine Learning?\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w5_01-1': `# Practice 2 for What Is Machine Learning?\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w5_01-2': `# Practice 3 for What Is Machine Learning?\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w5_02-0': `# Practice 1 for Introducing Scikit-Learn\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w5_02-1': `# Practice 2 for Introducing Scikit-Learn\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w5_02-2': `# Practice 3 for Introducing Scikit-Learn\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w5_03-0': `# Practice 1 for Hyperparameters and Model Validation\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w5_03-1': `# Practice 2 for Hyperparameters and Model Validation\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w5_03-2': `# Practice 3 for Hyperparameters and Model Validation\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w5_04-0': `# Practice 1 for Feature Engineering\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w5_04-1': `# Practice 2 for Feature Engineering\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w5_04-2': `# Practice 3 for Feature Engineering\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w5_05-0': `# Practice 1 for In Depth: Naive Bayes Classification\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w5_05-1': `# Practice 2 for In Depth: Naive Bayes Classification\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w5_05-2': `# Practice 3 for In Depth: Naive Bayes Classification\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w5_06-0': `# Practice 1 for In Depth: Linear Regression\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w5_06-1': `# Practice 2 for In Depth: Linear Regression\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w5_06-2': `# Practice 3 for In Depth: Linear Regression\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w5_07-0': `# Practice 1 for In-Depth: Support Vector Machines\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w5_07-1': `# Practice 2 for In-Depth: Support Vector Machines\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w5_07-2': `# Practice 3 for In-Depth: Support Vector Machines\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w5_08-0': `# Practice 1 for In-Depth: Decision Trees and Random Forests\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w5_08-1': `# Practice 2 for In-Depth: Decision Trees and Random Forests\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w5_08-2': `# Practice 3 for In-Depth: Decision Trees and Random Forests\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w5_09-0': `# Practice 1 for In Depth: Principal Component Analysis\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w5_09-1': `# Practice 2 for In Depth: Principal Component Analysis\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w5_09-2': `# Practice 3 for In Depth: Principal Component Analysis\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w5_10-0': `# Practice 1 for In-Depth: Manifold Learning\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w5_10-1': `# Practice 2 for In-Depth: Manifold Learning\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w5_10-2': `# Practice 3 for In-Depth: Manifold Learning\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w5_11-0': `# Practice 1 for In Depth: k-Means Clustering\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w5_11-1': `# Practice 2 for In Depth: k-Means Clustering\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w5_11-2': `# Practice 3 for In Depth: k-Means Clustering\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w5_12-0': `# Practice 1 for In Depth: Gaussian Mixture Models\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w5_12-1': `# Practice 2 for In Depth: Gaussian Mixture Models\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w5_12-2': `# Practice 3 for In Depth: Gaussian Mixture Models\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w5_13-0': `# Practice 1 for In-Depth: Kernel Density Estimation\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w5_13-1': `# Practice 2 for In-Depth: Kernel Density Estimation\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w5_13-2': `# Practice 3 for In-Depth: Kernel Density Estimation\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w5_14-0': `# Practice 1 for Application: A Face Detection Pipeline\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w5_14-1': `# Practice 2 for Application: A Face Detection Pipeline\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w5_14-2': `# Practice 3 for Application: A Face Detection Pipeline\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`,    'w5_15-0': `# Practice 1 for Further Machine Learning Resources\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice basic concept 1\nprint('Ready for practice 1!')\n`,    'w5_15-1': `# Practice 2 for Further Machine Learning Resources\nimport numpy as np\nimport pandas as pd\n\n# TODO: Practice advanced concept 2\nprint('Ready for practice 2!')\n`,    'w5_15-2': `# Practice 3 for Further Machine Learning Resources\nimport numpy as np\nimport pandas as pd\n\n# TODO: Integrate concepts 1 and 2\nprint('Ready for practice 3!')\n`
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
