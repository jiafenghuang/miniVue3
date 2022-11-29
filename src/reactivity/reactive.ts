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

function createActiveObject(target, baseHandler) {
    return new Proxy(target, baseHandler)

}

export function isReactive(target) {
    return !!target[ReactiveFlags.IS_REACTIVE]
}

export function isReadonly(target) {
    return !!target[ReactiveFlags.IS_READONLY]
}