import { isObject } from '../shared'
import { mutableHandler, readonlyHandler, shallowReadonlyHandler } from './baseHandlers'


export const enum ReactiveFlags {
    IS_REACTIVE = "__v_isReactive",
    IS_READONLY = "__v_isReadOnly"
}


export function reactive(target) {
    return createActiveObject(target, mutableHandler)
}

export function readonly(target) {
    return createActiveObject(target, readonlyHandler)
}

export function shallowReadonly(target) {
    return createActiveObject(target, shallowReadonlyHandler)
}


export function isReactive(target) {
    return !!target[ReactiveFlags.IS_REACTIVE]
}

export function isReadonly(target) {
    return !!target[ReactiveFlags.IS_READONLY]
}

export function isProxy(target) {
    return isReadonly(target) || isReactive(target)

}
function createActiveObject(target, baseHandler) {
    if(!isObject(target)){
        console.warn("target is not a object type")
        return target
    }
    return new Proxy(target, baseHandler)

}
