import { describe, expect, test, vi } from "vitest"
import { isReadonly, readonly } from "../reactive"

describe("readonly test", () => {

  test("observe the basic readonly properties", () => {
    const original = {
      num: 1,
      foo: {
        bar: 2
      }
    }
    const wrapped = readonly(original)
    expect(wrapped).not.toBe(original)
    expect(wrapped.num).toBe(1)

    expect(isReadonly(wrapped)).toBe(true)
    expect(isReadonly(original)).toBe(false)


    expect(isReadonly(wrapped.foo)).toBe(true)
    expect(isReadonly(original.foo)).toBe(false)

    expect(wrapped.foo.bar).toBe(2)

  })

  test("set readonly data ,then warn ", () => {
    const original = {
      num: 1,
    }
    console.warn = vi.fn()
    const wrapped = readonly(original)
    wrapped.num++
    expect(console.warn).toBeCalled()
  })
})