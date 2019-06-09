const fs = require("fs");
const chokidar = require("chokidar");

const watcher = chokidar.watch("input", {
    ignored: /(^|[\/\\])\../,
    usePolling: true,
    ignoreInitial: true
});

watcher.on("ready", () => console.log("Watching for changes"));

watcher.on("all", (event, path) => {
    const filename = path.replace("input/", "");

    if (filename.startsWith("_")) {
        // Include file
        console.log("_.rules changed, recompiling all files");
        compileAll();
    } else {
        // Regular file
        if (event === "add" || event === "change") {
            console.log("Compiling " + filename);
            compile(filename);
        } else if (event === "unlink") {
            console.log("Removing " + filename);
            fs.unlinkSync("output/" + filename);
        }
    }
});

function compileAll() {
    fs.readdir("input", (err, filenames) => {
        if (err) throw err;

        for (const filename of filenames) {
            if (!filename.startsWith("_")) {
                compile(filename);
            }
        }
    });
}

function compile(filename) {
    var content = [];
    content.push("//////////////////////////////////////////////////");
    content.push("//           THIS IS A GENERATED FILE           //");
    content.push("//       MAKE CHANGES IN THE INPUT FOLDER       //");
    content.push("//        CHANGES MADE HERE WILL BE LOST        //");
    content.push("//////////////////////////////////////////////////");
    content.push("");
    content.push(fs.readFileSync("input/_.rules", "utf-8"));
    content.push("//////////////////////////////////////////////////");
    content.push("");
    content.push(fs.readFileSync("input/" + filename, "utf-8"));

    fs.writeFileSync("output/" + filename, content.join("\n"), "utf-8");
}
