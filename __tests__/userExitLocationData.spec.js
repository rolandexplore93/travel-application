const userExitLocationData = require('../src/server/index');

describe("Validating if userExitLocationData() is working perfectly", () => {
    test("userExitLocationData()", () => {
        expect(userExitLocationData).toBeDefined();
    })
})