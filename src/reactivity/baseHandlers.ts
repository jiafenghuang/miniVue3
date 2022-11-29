import { extend, isObject } from "../shared"
import { track, trigger } from "./effect"
import { reactive, ReactiveFlags, readonly } from "./reactive"

const get = createGetter()
const set = createSetter()

const readonlyGet = createGetter(true)
const shallowReadonlyGet = createGetter(true, true)
function createGetter(isReadOnly = false, isShallowReadonly = false) {
  return function get(target, key) {
    const res = Reflect.get(target, key)
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadOnly
    } else if (key === ReactiveFlags.IS_READONLY) {
      return isReadOnly
    }
    if (isShallowReadonly) {
      return res
    }

    if (!isReadOnly) {
      track(target, key)
    }
    if (isObject(res)) {
      return isReadOnly ? readonly(res) : reactive(res)
    }
    return res
  }
}

function createSetter() {
  return function set(target, key, value) {
    const res = Reflect.set(target, key, value)
    trigger(target, key)
    return res
  }
}
export const mutableHandler = {
  get,
  set
}
export const readonlyHandler = {
  get: readonlyGet,
  set: function set(target, key, value) {
    console.warn("this target is readonly")
    return true
  }
}

export const shallowReadonlyHandler = extend(readonlyHandler, {
  get: shallowReadonlyGet
})