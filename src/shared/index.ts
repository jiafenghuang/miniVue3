const getType = (value: any) => {
    return Object.prototype.toString.call(value).slice(8, -1)
}

export const isObject = (value: any) => value !== null && typeof value === "object"

export const extend = Object.assign

export const hasChanged = (val, newVal) => {
    return !Object.is(val, newVal)
}
export const isOn=( key:string )=> /^on[A-Z]/.test(key)