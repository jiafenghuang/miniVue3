const getType = (val) => Object.prototype.toString.call(val).slice(8, -1)

export const isObject = (val) => val !== null && typeof val === "object"

export const hasChanged = (val, newVal) => !Object.is(val, newVal)

export const isOn = (key:string) => /^on[A-Z]/.test(key)

export const hasOwn = (Obj, key) => Object.prototype.hasOwnProperty.call(Obj, key)

export const capitalize = (str:string) => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`

export const toHandlerKey = (str:string) => str ? "on" + capitalize(str) : "" 

export const camelize = (str:string) => str.replace(/-(\w)/,(_,v)=>(v && v.toUpperCase()) ?? "")


export const extend = Object.assign