import { describe, expect, test, vi } from "vitest"
import { computed } from "../computed";
import { reactive } from "../reactive";

describe("computed test", () => {
    test("observe the basic computed", () => {
      const user  = reactive({
        foo:1
      })

      const res = computed(()=>user.foo)

      expect(res.value).toBe(1)

    });

    test("observe the computed acahe", () => {
      const user  = reactive({
        foo:1
      })
      const getter = vi.fn(()=>user.foo)

      const res = computed(getter)
      //lazy
      expect(getter).not.toBeCalled()
      expect(res.value).toBe(1)
      expect(getter).toBeCalledTimes(1)

      //should not calculate again
      res.value
      expect(getter).toBeCalledTimes(1)

      //set call once
      user.foo = 2
      expect(getter).toBeCalledTimes(1) //not needed

      expect(res.value).toBe(2)
      expect(getter).toBeCalledTimes(2)

      res.value
      expect(getter).toBeCalledTimes(2)

    });

})