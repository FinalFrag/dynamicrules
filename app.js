const fs = require("fs");
const chokidar = require("chokidar");
const processor = require("./app/processor");
const assembler = require("./app/assembler");

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
    const processingResult = processor.process("input/" + filename, "output/" + filename + ".processing");
    assembler.assemble("output/" + filename, processingResult);
}