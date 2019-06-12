const fs = require("fs");

var _tempFile;

function processLine(line) {
    var value = line;

    // Get rid of nasty windows carriage returns
    value = value.replace(/\r/g, "");

    if (value.startsWith("//-")) {
        // Process as JS
        // Remove "//-" and extra spaces
        value = value.substring(3).trim();
    } else if (value.startsWith("//!")) {
        // Process as JS output
        // Remove //! and extra spaces
        value = value.substring(3).trim();

        // Treat as string template (allows use of JS variables)
        value = "write(`" + value + "`)";
    } else {
        // Process as regular text
        // Escape double-quotes
        value = value.replace(/\"/g, "\\\"");

        // Treat as literal output
        value = "write(\"" + value + "\")";
    }

    return value;
}

function write(data) {
    fs.appendFileSync(_tempFile, data + "\n", "UTF-8");
}

exports.process = function (inputFile, tempFile) {
    _tempFile = tempFile;

    // Read input file
    const lines = fs.readFileSync(inputFile, "UTF-8").split("\n");

    // Process
    const toBeEvaled = [];
    lines.forEach(line => toBeEvaled.push(processLine(line)));

    // Write to _tempFile
    fs.writeFileSync(_tempFile, "", "UTF-8");
    eval(toBeEvaled.join("\n"));

    // Get _tempFile contents and delete it
    const output = fs.readFileSync(_tempFile, "UTF-8");
    fs.unlinkSync(_tempFile);

    return output;
};