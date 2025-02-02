// Initialize CodeMirror
let editor = CodeMirror.fromTextArea(document.getElementById("code-editor"), {
    lineNumbers: true,
    theme: "dracula",
    mode: "text/x-c++src",
    autoCloseBrackets: true,
    matchBrackets: true,
    indentUnit: 4,
    lineWrapping: true,
});

// DOM elements
const languageSelect = document.getElementById("language-select");
const runButton = document.getElementById("run-btn");
const saveButton = document.getElementById("save-btn");
const clearButton = document.getElementById("clear-btn");
const previewFrame = document.getElementById("preview-frame");
const consoleOutput = document.getElementById("console-output");
const activeFile = document.querySelector(".active-file");

// Default C++ template
const cppTemplate = `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`;

// Default HTML template
const htmlTemplate = `<!DOCTYPE html>
<html>
<head>
    <title>My Web Page</title>
    <style>
        /* Add your CSS here */
    </style>
</head>
<body>
    <!-- Add your HTML here -->
    <h1>Hello, World!</h1>

    <script>
        // Add your JavaScript here
    </script>
</body>
</html>`;

// Set initial content
editor.setValue(cppTemplate);

// Language change handler
languageSelect.addEventListener("change", () => {
    const language = languageSelect.value;
    switch (language) {
        case "html":
            editor.setOption("mode", "xml");
            activeFile.textContent = "index.html";
            editor.setValue(htmlTemplate);
            break;
        case "css":
            editor.setOption("mode", "css");
            activeFile.textContent = "styles.css";
            editor.setValue("/* Add your CSS here */");
            break;
        case "javascript":
            editor.setOption("mode", "javascript");
            activeFile.textContent = "script.js";
            editor.setValue("// Add your JavaScript here");
            break;
        case "cpp":
            editor.setOption("mode", "text/x-c++src");
            activeFile.textContent = "main.cpp";
            editor.setValue(cppTemplate);
            break;
    }
});

// Run code
runButton.addEventListener("click", () => {
    const language = languageSelect.value;
    const code = editor.getValue();

    if (language === "html") {
        previewFrame.innerHTML = code;
        consoleOutput.innerHTML = '<span class="success">Code executed successfully!</span>';
    } else if (language === "cpp") {
        // For C++, we'll just show a simulation since we can't compile in browser
        consoleOutput.innerHTML = '<span class="success">Program Output:</span><br>Hello, World!';
    } else {
        try {
            // For JavaScript, we can evaluate it
            if (language === "javascript") {
                const result = eval(code);
                consoleOutput.innerHTML = '<span class="success">Code executed successfully!</span><br>' + result;
            }
        } catch (error) {
            consoleOutput.innerHTML = '<span class="error">Error: ' + error.message + '</span>';
        }
    }
});

// Save code
saveButton.addEventListener("click", () => {
    const code = editor.getValue();
    const language = languageSelect.value;
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    
    switch (language) {
        case "html":
            a.download = "index.html";
            break;
        case "css":
            a.download = "styles.css";
            break;
        case "javascript":
            a.download = "script.js";
            break;
        case "cpp":
            a.download = "main.cpp";
            break;
    }
    
    a.href = url;
    a.click();
    URL.revokeObjectURL(url);
});

// Clear code
clearButton.addEventListener("click", () => {
    editor.setValue("");
    consoleOutput.innerHTML = "";
});

// Add some helpful initial console message
consoleOutput.innerHTML = '<span class="success">Welcome to CodeCraft! Select a language and start coding.</span>';
