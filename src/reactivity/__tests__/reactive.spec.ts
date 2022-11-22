import { expect, test } from "vitest";
import { reactive } from "../reactive";

test("test reactivty initial", () => {
    const original: { num: number } = {
        num: 1
    }
    const observed = reactive(original)
    expect(observed).not.toBe(original)
    expect(observed.num).toBe(1)
    observed.num = 2
    expect(observed.num).toBe(2)
})
