import { describe, expect, test } from "vitest"
import { effect } from "../effect"
import { reactive } from "../reactive"

describe("test", () => {
  test("observe the basic properties",() => {
    let dummy;
    const counter = reactive({ num: 0 });
    effect(() => (dummy = counter.num));
    expect(dummy).toBe(0);
    counter.num = 7;
    expect(dummy).toBe(7);
  })
});
