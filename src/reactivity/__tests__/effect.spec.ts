import { describe, expect, test } from "vitest"
import { effect } from "../effect"
import { reactive } from "../reactive"

describe("test", () => {
  test.skip("observe the basic properties", () => {
    let dummy;
    const counter = reactive({ num: 0 });
    effect(() => (dummy = counter.num));
    expect(dummy).toBe(0);
    counter.num = 7;
    expect(dummy).toBe(7);
  })
  test.skip("observe the multiple properties", () => {
    let dummy;
    const counter = reactive({ num1: 0, num2: 0 });
    effect(() => (dummy = counter.num1 + counter.num2));
    expect(dummy).toBe(0);
    counter.num1 = 7;
    expect(dummy).toBe(7);
    counter.num2 = 10;
    expect(dummy).toBe(17);
  })
  test("observe the boolean properties", () => {
    let dummy;
    const counter = reactive({ isOK: true, num1: 0, num2: 0 });
    effect(() => (dummy = counter.isOK ? (counter.num1 + counter.num2) : counter.num1));
    expect(dummy).toBe(0);
    counter.num1 = 7;
    expect(dummy).toBe(7);
    counter.num2 = 10;
    expect(dummy).toBe(17);
    counter.isOK = false
    counter.num1 = 7;
    expect(dummy).toBe(7);
    counter.num2 = 10;
    expect(dummy).toBe(7);
  })
});
