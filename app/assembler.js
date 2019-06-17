const fs = require("fs");

module.exports = config => ({
    assemble: (filename, ...contentParts) => {
        // Clear file
        fs.writeFileSync(filename, "", "UTF-8");

        // Insert header
        let headerContents = fs.readFileSync("./app/assets/header.txt", "UTF-8");
        headerContents = headerContents.replace(/#/g, config.commentString);

        fs.appendFileSync(filename, headerContents + "\n", "UTF-8");

        // Include all contentParts
        let includeSeparator = false;

        let separatorContents = fs.readFileSync("./app/assets/separator.txt", "UTF-8");
        separatorContents = separatorContents.replace(/#/g, config.commentString);

        contentParts.forEach((content) => {
            if (includeSeparator) {
                fs.appendFileSync(filename, "\n" + separatorContents + "\n", "UTF-8");
            }

            includeSeparator = true;

            fs.appendFileSync(filename, content, "UTF-8");
        });
    }
});
