import { hasChanged, isObject } from "../shared"
import { createDeps } from "./deps"
import { isTracking, trackEffect, triggerEffect } from "./effect"
import { reactive } from "./reactive"



class RefImpl {
    private _value: any
    private dep: any
    private _rawValue: any
    private __v__is_ref: boolean

    constructor(value) {
        this._rawValue = value
        this._value = convert(value)
        this.dep = createDeps()
        this.__v__is_ref = true
    }
    get value() {
        trackRefValue(this)
        return this._value
    }

    set value(newVal) {
        if (hasChanged(newVal, this._rawValue)) {
            this._rawValue = newVal
            this._value = convert(newVal)
            triggerEffect(this.dep)
        }
    }
}
function convert(value) {
    return isObject(value) ? reactive(value) : value
}

function trackRefValue(ref) {
    if (isTracking()) {
        trackEffect(ref.dep)
    }
}
export function ref(value) {
    return new RefImpl(value)
}

export function isRef(ref) {
    return !!ref["__v__is_ref"]
}

export function unRef(ref) {
    return isRef(ref) ? ref.value : ref
}
export function proxyRef(target) {
    return new Proxy(target, {
        get(target, key) {
            return unRef(Reflect.get(target, key))
        },
        set(target, key, value) {
            if (isRef(target[key]) && !isRef(value)) {
                return target[key].value = value
            } else {
                return Reflect.set(target, key, value)
            }
        }
    })
}