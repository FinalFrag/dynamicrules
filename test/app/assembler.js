/* eslint-disable func-names, prefer-arrow-callback */

const chai = require("chai");
const chaiFiles = require("chai-files");
const config = require("../../app/config");
const assemblerFactory = require("../../app/assembler")(config);

chai.should();
chai.use(chaiFiles);

const { file } = chaiFiles;

describe("Assembler", function () {
    it("should work with the default config", function () {
        assemblerFactory(config).assemble("./output/test.rules", "INCLUDE\n", "CONTENT\n", "CONTENT\n");

        file("./output/test.rules").should.equal(file("./test/resources/assembler-output.rules"));
    });

    it("should work with a custom config", function () {
        const assembler = assemblerFactory({
            commentString: "'",
            commandString: ">",
            outputString: "!"
        });

        assembler.assemble("./output/test.rules", "INCLUDE\n", "CONTENT\n", "CONTENT\n");

        file("./output/test.rules").should.equal(file("./test/resources/assembler-output-custom.rules"));
    });
});
