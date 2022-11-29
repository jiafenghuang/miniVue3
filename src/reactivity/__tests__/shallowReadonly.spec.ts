import { describe, expect, test, vi } from "vitest"
import { isReadonly, shallowReadonly } from "../reactive"

describe("shallowReadonly test", () => {

  test("observe the basic shallowReadonly properties", () => {
    const original = {
      num: 1,
      foo: {
        bar: 2
      }
    }
    const wrapped = shallowReadonly(original)
    expect(wrapped).not.toBe(original)
    expect(wrapped.num).toBe(1)

    expect(isReadonly(wrapped)).toBe(true)
    expect(isReadonly(original)).toBe(false)

    expect(isReadonly(wrapped.foo)).toBe(false)

  })

  test("set shallowReadonly data ,then warn ", () => {
    const original = {
      num: 1,
    }
    console.warn = vi.fn()
    const wrapped = shallowReadonly(original)
    wrapped.num++
    expect(console.warn).toBeCalled()
  })
})