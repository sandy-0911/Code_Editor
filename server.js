const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(__dirname));
app.use(express.json());

// Endpoint to compile and run C++ code
app.post('/compile', (req, res) => {
    const { code } = req.body;
    const fileName = 'temp.cpp';
    const outputFile = 'temp.exe';

    // Write the code to a temporary file
    fs.writeFileSync(fileName, code);

    // Compile the C++ code
    exec(`g++ ${fileName} -o ${outputFile}`, (error, stdout, stderr) => {
        if (error) {
            res.json({ error: stderr });
            return;
        }

        // Run the compiled program
        exec(`./${outputFile}`, (error, stdout, stderr) => {
            if (error) {
                res.json({ error: stderr });
                return;
            }
            res.json({ output: stdout });

            // Clean up temporary files
            fs.unlinkSync(fileName);
            fs.unlinkSync(outputFile);
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
