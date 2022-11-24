import { describe, expect, test,vi } from "vitest"
import { effect ,stop} from "../effect"
import { reactive } from "../reactive"

describe("test", () => {

  test("observe the basic properties", () => {
    let dummy: any;
    const counter = reactive({ num: 0 });
    effect(() => (dummy = counter.num));
    expect(dummy).toBe(0);
    counter.num = 7;
    expect(dummy).toBe(7);
  })

  test("observe the multiple properties", () => {
    let dummy: any;
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

  test("observe the boolean properties", () => {
    let dummy: any;
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



  test("should observe function call chains", () => {
    let dummy: any;
    const counter = reactive({ num: 0 });
    effect(() => (dummy = getNum()));

    function getNum() {
      return counter.num;
    }

    expect(dummy).toBe(0);
    counter.num = 2;
    expect(dummy).toBe(2);
  });

  test("observe the nested properties", () => {
    let dummy: any;
    const counter = reactive({ nested: { num: 0 } });
    effect(() => (dummy = counter.nested.num));
    expect(dummy).toBe(0);
    counter.nested.num = 8
    expect(dummy).toBe(8);
  })

  test("should handle multiple effects", () => {
    let dummy1: any, dummy2: any;
    const counter = reactive({ num: 0 });
    effect(() => (dummy1 = counter.num));
    effect(() => (dummy2 = counter.num));

    expect(dummy1).toBe(0);
    expect(dummy2).toBe(0);
    counter.num++;
    expect(dummy1).toBe(1);
    expect(dummy2).toBe(1);
  });
  test("return runner",()=>{
    //1. effect(fn) -> function(runner)-> fn ->return  
    let foo = 10;
    const runner = effect(()=>{
      foo++;
      return "foo"

    })

    expect(foo).toBe(11);
    
    const r = runner()
    expect(foo).toBe(12);
    expect(r).toBe("foo")

  })
  test("scheduler", () => {
    let dummy: any,run: any
    const scheduler = vi.fn(()=>{
      run = runner
    })
    const obj = reactive({foo:1})

    const runner = effect(()=>{
      dummy = obj.foo
    },{scheduler})
    expect(scheduler).not.toHaveBeenCalled()  
    expect(dummy).toBe(1)
    obj.foo++
    expect(scheduler).toHaveBeenCalledTimes(1)
    expect(dummy).toBe(1);
    run()

    expect(dummy).toBe(2)


  })
  test("stop", () => {
    let dummy ;
    const obj = reactive({prop:1})
    const runner = effect(()=>{
      dummy = obj.prop
    })

    obj.prop = 2
    expect(dummy).toBe(2)
    stop(runner)
    obj.prop = 3
    expect(dummy).toBe(2)

    runner() //to call effect
    expect(dummy).toBe(3)

  })
  test("events: onStop", () => {
    const obj = reactive({prop:1})

    let dummy ;
    const onStop = vi.fn()

    const runner = effect(()=>{
      dummy = obj.prop
    },{onStop})


    stop(runner)
    expect(onStop).toBeCalledTimes(1)
  });
});
