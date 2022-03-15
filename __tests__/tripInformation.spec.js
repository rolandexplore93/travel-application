/**
 * @jest-environment jsdom
 */

 import 'regenerator-runtime/runtime';
 import { tripInformation } from '../src/client/js/execution'

 describe("Check if trip information runs correctly", () => {
    test("tripInformation()", () => {
        expect(tripInformation).toBeDefined();
    })
})