const getType = (value: any) => {
    return Object.prototype.toString.call(value).slice(8, -1)
}

export const isObject = (value: Object) => getType(value) === "Object"

export const extend = Object.assign