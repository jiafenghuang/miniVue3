import { isObject } from '../shared'
import { track, trigger } from './effect'

const baseHander = {
    get: (target: object, key: PropertyKey) => {
        track(target, key)
        const res = Reflect.get(target, key)
        if (isObject(res)) {
            return reactive(res)
        }
        return res
    },
    set: (target: object, key: PropertyKey, value: any) => {
        const res = Reflect.set(target, key, value)
        trigger(target, key)
        return res
    }
}
export function reactive(target) {
    return new Proxy(target, baseHander)
}