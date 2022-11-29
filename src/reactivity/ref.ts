import { hasChanged, isObject } from "../shared"
import { createDeps } from "./deps"
import { isTracking, trackEffect, triggerEffect } from "./effect"
import { reactive } from "./reactive"
class RefImpl {
    private _value: any
    private dep: any
    private _rawValue: any
    constructor(value) {
        this._rawValue = value
        this._value = convert(value)
        this.dep = createDeps()
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