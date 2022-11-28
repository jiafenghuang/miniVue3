import { expect, test } from "vitest";
import { isReactive, reactive } from "../reactive";

test("test reactivty initial", () => {
    const original: { num: number } = {
        num: 1
    }
    const observed = reactive(original)
    expect(observed).not.toBe(original)
    expect(observed.num).toBe(1)
    observed.num = 2
    expect(observed.num).toBe(2)

    expect(isReactive(observed)).toBe(true)
    expect(isReactive(original)).toBe(false)
})
