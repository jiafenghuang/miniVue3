import { expect,test } from "vitest";
import { reactive } from "../reactive";

test("test reactivty",()=>{
    const original = {
        foo:1
    }
    const observed = reactive(original)
    expect(observed).not.toBe(original)
    expect(observed.foo).toBe(1)
    observed.foo = 2
    expect(observed.foo).toBe(2)
})