const fs = require("fs");

module.exports = (config) => {
    let _tempFile;

    function processLine(line) {
        // Get rid of nasty windows carriage returns
        let output = line.replace(/\r/g, "");

        if (isCommand(output)) {
            output = getCommand(output);
        } else if (isOutput(output)) {
            output = getOutput(output);
        } else {
            output = getCopy(output);
        }

        return output;
    }

    function isCommand(line) {
        return line.trim().startsWith(config.commandString) || line.trim().endsWith(config.commandString);
    }

    function getCommand(line) {
        if (line.trim().startsWith(config.commandString)) {
            return line.trim().substring(config.commandString.length).trim();
        }

        return line.trim().substring(0, line.length - config.commandString.length);
    }

    function isOutput(line) {
        return line.trim().startsWith(config.outputString) || line.trim().endsWith(config.outputString);
    }

    function getOutput(line) {
        const whitespaces = /^(\s*)(.*)/.exec(line)[1];
        let output = /^(\s*)(.*)/.exec(line)[2];

        if (line.trim().startsWith(config.outputString)) {
            // Remove //! and extra spaces
            output = output.substring(config.outputString.length).trim();
        } else {
            output = output.substring(0, output.length - config.outputString.length).trim();
        }

        // Treat as string template (allows use of JS variables)
        output = "write(`" + whitespaces + output + "`)";

        return output;
    }

    function getCopy(line) {
        // Escape double-quotes
        let output = line.replace(/"/g, "\\\"");

        // Treat as literal output
        output = "write(\"" + output + "\")";

        return output;
    }

    // eslint-disable-next-line no-unused-vars
    function write(data) {
        fs.appendFileSync(_tempFile, data + "\n", "UTF-8");
    }

    return {
        process: (input, tempFile) => {
            _tempFile = tempFile;

            // Process
            const toBeEvaled = [];
            input.forEach(line => toBeEvaled.push(processLine(line)));

            // Write to _tempFile
            fs.writeFileSync(_tempFile, "", "UTF-8");
            eval(toBeEvaled.join("\n")); // eslint-disable-line no-eval

            // Get _tempFile contents and delete it
            const output = fs.readFileSync(_tempFile, "UTF-8");
            fs.unlinkSync(_tempFile);

            return output;
        }
    };
};
