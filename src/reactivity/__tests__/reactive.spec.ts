import { expect, test } from "vitest";
import { isProxy, isReactive, reactive } from "../reactive";

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
    expect(isProxy(observed)).toBe(true)
})

test("test the nested obj", () => {
    const original = {
        nested: {
            foo: 1
        },
        arr: [{ bar: 2 }]
    }
    const observed = reactive(original)

    expect(isReactive(observed.nested)).toBe(true)
    expect(isReactive(observed.arr)).toBe(true)
    expect(isReactive(observed.arr[0])).toBe(true)
})