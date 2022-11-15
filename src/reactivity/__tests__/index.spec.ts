import { describe, expect, test } from "vitest";
import { add, sub } from "../index"

describe("person", () => {
  test("add",() => expect(add(1,2)).toBe(3))
  test("sub",() => expect(sub(5,2)).toBe(3))
});
