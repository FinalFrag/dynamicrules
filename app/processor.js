const fs = require("fs");

var _tempFile;
const _commandPrefix = /^(\s*)\/\/>(.*)/;
const _outputPrefix = /^(\s*)\/\/\!(.*)/;

function processLine(line) {
    // Get rid of nasty windows carriage returns
    line = line.replace(/\r/g, "");

    if (line.match(_commandPrefix)) {
        // Process as JS
        // Remove "//>" and extra spaces
        line = line.trim().substring(3).trim();
    } else if (line.match(_outputPrefix)) {
        // Process as JS output
        const whitespaces = _outputPrefix.exec(line)[1];
        
        // Remove //! and extra spaces
        line = line.trim().substring(3).trim();

        // Treat as string template (allows use of JS variables)
        line = "write(`" + whitespaces + line + "`)";
    } else {
        // Process as regular text
        // Escape double-quotes
        line = line.replace(/\"/g, "\\\"");

        // Treat as literal output
        line = "write(\"" + line + "\")";
    }

    return line;
}

function write(data) {
    fs.appendFileSync(_tempFile, data + "\n", "UTF-8");
}

exports.process = function (input, tempFile) {
    _tempFile = tempFile;

    // Process
    const toBeEvaled = [];
    input.forEach(line => toBeEvaled.push(processLine(line)));

    // Write to _tempFile
    fs.writeFileSync(_tempFile, "", "UTF-8");
    eval(toBeEvaled.join("\n"));

    // Get _tempFile contents and delete it
    const output = fs.readFileSync(_tempFile, "UTF-8");
    fs.unlinkSync(_tempFile);

    return output;
};