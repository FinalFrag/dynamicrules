const fs = require("fs");

exports.assemble = function(filename, includePart, contentPart) {
    // Clear file
    fs.writeFileSync(filename, "", "UTF-8");

    // Insert header
    fs.appendFileSync(filename, fs.readFileSync("./app/assets/header.txt", "UTF-8"), "UTF-8");
    fs.appendFileSync(filename, "\n", "UTF-8");

    // Insert includePart
    fs.appendFileSync(filename, includePart, "UTF-8");
    fs.appendFileSync(filename, "\n", "UTF-8");

    // Insert separator
    fs.appendFileSync(filename, fs.readFileSync("./app/assets/separator.txt", "UTF-8"), "UTF-8");
    fs.appendFileSync(filename, "\n", "UTF-8");

    // Insert contentPart
    fs.appendFileSync(filename, contentPart, "UTF-8");
}