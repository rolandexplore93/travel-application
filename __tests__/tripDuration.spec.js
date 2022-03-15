/**
 * @jest-environment jsdom
 */

import 'regenerator-runtime/runtime';
import { tripDuration } from '../src/client/js/execution'

describe("Check if trip duration is working", () => {
    test("tripDuration()", () => {
        expect(tripDuration).toBeDefined();
    })
})