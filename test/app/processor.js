require("chai").should();
const fs = require("fs");
const processor = require("../../app/processor");

describe("Processor", function () {
    it("should process the input file correctly", function () {
        runTest("processor-input.rules", "processor-output.rules");
    });
});

function runTest(inputFile, outputFile) {
    const input = fs.readFileSync("./test/resources/" + inputFile, "UTF-8").split("\n");
    const expectedOutput = fs.readFileSync("./test/resources/" + outputFile, "UTF-8") + "\n";

    const output = processor.process(input, "./output/test.rules");

    output.should.equal(expectedOutput);
}