const chai = require("chai");
chai.should();
const chaiFiles = require('chai-files');
chai.use(chaiFiles);
const file = chaiFiles.file;

const assembler = require("../../app/assembler");

describe("Assembler", function () {
    it("should assemble the output file correctly", function () {
        assembler.assemble("./output/test.rules", "INCLUDE\n", "CONTENT\n", "CONTENT\n");

        file("./output/test.rules").should.equal(file("./test/resources/assembler-output.rules"));
    });
});