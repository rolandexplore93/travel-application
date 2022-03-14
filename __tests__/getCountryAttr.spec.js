const getCountryAttr = require('../src/server/index');

describe("Validating if getCountryAttr() is working perfectly", () => {
    test("getCountryAttr()", () => {
        expect(getCountryAttr).toBeDefined();
    })
})