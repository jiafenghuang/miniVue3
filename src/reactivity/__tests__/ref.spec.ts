import { describe, expect, test, vi } from "vitest"
import { effect } from "../effect"
import { reactive } from "../reactive";
import { isRef, ref, unRef } from "../ref"

describe("ref test", () => {
    test("observe the basic ref", () => {
        const target = ref(1)
        expect(target.value).toBe(1)
    });

    test("observe the effect", () => {
        const target = ref(1)
        let dummy, call = 0
        effect(() => {
            call++
            dummy = target.value
        })
        expect(dummy).toBe(1)
        expect(call).toBe(1)

        target.value = 2

        expect(dummy).toBe(2)
        expect(call).toBe(2)

        //the variable call will change?
        target.value = 2
        expect(dummy).toBe(2)
        expect(call).toBe(2)
    });

    test("handle object by ref", () => {
        const target = ref({ count: 1 })
        let dummy, call = 0
        effect(() => {
            call++
            dummy = target.value.count
        })
        expect(dummy).toBe(1)
        expect(call).toBe(1)

        target.value.count = 2

        expect(dummy).toBe(2)
        expect(call).toBe(2)
    });


    test("isRef & unRef", () => {
        const a = ref(1)
        const user = reactive({
            age: 1
        })
        const b = 1
        expect(isRef(a)).toBe(true)
        expect(isRef(b)).toBe(false)
        expect(isRef(user)).toBe(false)

        expect(unRef(a)).toBe(1)
        expect(unRef(b)).toBe(1)


    })


})