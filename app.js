const fs = require("fs");
const chokidar = require("chokidar");
const processor = require("./app/processor");
const assembler = require("./app/assembler");

const watcher = chokidar.watch("input", {
    ignored: /(^|[/\\])\../,
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
    } else if (event === "add" || event === "change") {
        console.log("Compiling " + filename);
        compile(filename);
    } else if (event === "unlink") {
        console.log("Removing " + filename);
        fs.unlinkSync("output/" + filename);
    }
});

function compileAll() {
    fs.readdir("input", (err, filenames) => {
        if (err) throw err;

        filenames.filter(it => it.startsWith("_")).forEach(it => compile(it));
    });
}

function compile(filename) {
    // Process _.rules
    const includeFileContents = fs.readFileSync("input/_.rules", "UTF-8").split("\n");
    const processedIncludeFile = processor.process(includeFileContents, "output/_.rules.processing");

    // Process filename
    const fileContents = fs.readFileSync("input/" + filename, "UTF-8").split("\n");
    const processedFileResult = processor.process(fileContents, "output/" + filename + ".processing");

    assembler.assemble("output/" + filename, processedIncludeFile, processedFileResult);
}
