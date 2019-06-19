/* eslint-disable func-names, prefer-arrow-callback */

require("chai").should();
const fs = require("fs");
const config = require("../../app/config");
const processorFactory = require("../../app/processor");

function runTest(processor, inputFile, outputFile) {
    const input = fs.readFileSync("./test/resources/" + inputFile, "UTF-8").split("\n");
    const expectedOutput = fs.readFileSync("./test/resources/" + outputFile, "UTF-8") + "\n";

    const output = processor.process(input, "./output/test.rules");

    output.should.equal(expectedOutput);
}

describe("Processor", function () {
    it("should work with the default config", function () {
        runTest(processorFactory(config), "processor-input.rules", "processor-output.rules");
    });

    it("should work with a custom config", function () {
        const processor = processorFactory({
            commentString: "'",
            commandString: ">",
            outputString: "!"
        });

        runTest(processor, "processor-input-custom.rules", "processor-output.rules");
    });

    it("should work with markers at the end of the line", function () {
        runTest(processorFactory(config), "processor-input-eol.rules", "processor-output.rules");
    });
});
