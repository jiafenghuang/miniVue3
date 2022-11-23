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
    counter.num2++
    expect(dummy).toBe(18);
  })

  test.skip("observe the boolean properties", () => {
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



  test.skip("should observe function call chains", () => {
    let dummy;
    const counter = reactive({ num: 0 });
    effect(() => (dummy = getNum()));

    function getNum() {
      return counter.num;
    }

    expect(dummy).toBe(0);
    counter.num = 2;
    expect(dummy).toBe(2);
  });

  test.skip("observe the nested properties", () => {
    let dummy;
    const counter = reactive({ nested: { num: 0 } });
    effect(() => (dummy = counter.nested.num));
    expect(dummy).toBe(0);
    counter.nested.num = 8
    expect(dummy).toBe(8);
  })

  test("should handle multiple effects", () => {
    let dummy1, dummy2;
    const counter = reactive({ num: 0 });
    effect(() => (dummy1 = counter.num));
    effect(() => (dummy2 = counter.num));

    expect(dummy1).toBe(0);
    expect(dummy2).toBe(0);
    counter.num++;
    expect(dummy1).toBe(1);
    expect(dummy2).toBe(1);
  });

  // test("scheduler", () => {

  // })
  // test("stop", () => {

  // })
  // test("events: onStop", () => {

  // });
});
