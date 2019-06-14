const fs = require("fs");

exports.assemble = function(filename, ...contentParts) {
    // Clear file
    fs.writeFileSync(filename, "", "UTF-8");

    // Insert header
    fs.appendFileSync(filename, fs.readFileSync("./app/assets/header.txt", "UTF-8") + "\n", "UTF-8");

    // Include all contentParts
    var includeSeparator = false;

    contentParts.forEach(content => {
        if (includeSeparator) {
            fs.appendFileSync(filename, "\n" + fs.readFileSync("./app/assets/separator.txt", "UTF-8") + "\n", "UTF-8");
        }

        includeSeparator = true;

        fs.appendFileSync(filename, content, "UTF-8");
    });
}