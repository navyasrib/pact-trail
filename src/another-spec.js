const chai = require('chai');
const sampleData = require("./SampleData");
const expect = chai.expect;

describe("sample test", () => {
    it("should give something", async () => {
        const res = await sampleData();
        expect(res).to.deep.equal({metadata: {uuid: "uuid"}});
    });
});