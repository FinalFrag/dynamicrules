const fs = require("fs");

exports.assemble = function(filename, contents) {
    // Clear file
    fs.writeFileSync(filename, "", "UTF-8");

    // Insert header
    fs.appendFileSync(filename, fs.readFileSync("./app/assets/header.txt", "UTF-8"), "UTF-8");
    fs.appendFileSync(filename, "\n", "UTF-8");

    // Insert _.rules
    fs.appendFileSync(filename, fs.readFileSync("./input/_.rules", "UTF-8"), "UTF-8");
    fs.appendFileSync(filename, "\n", "UTF-8");

    // Insert separator
    fs.appendFileSync(filename, fs.readFileSync("./app/assets/separator.txt", "UTF-8"), "UTF-8");
    fs.appendFileSync(filename, "\n", "UTF-8");

    // Insert contents
    fs.appendFileSync(filename, contents, "UTF-8");
}