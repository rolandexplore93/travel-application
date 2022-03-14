const getGeoNamesData = require('../src/server/index');

describe("Validating if getGeoNamesData() is working perfectly", () => {
    test("getGeoNamesData()", () => {
        expect(getGeoNamesData).toBeDefined();
    })
})