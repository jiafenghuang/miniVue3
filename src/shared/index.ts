const getType = (value: any) => {
    return Object.prototype.toString.call(value).slice(8, -1)
}

export const isObject = (value: any) => value !== null && typeof value === "object"

export const extend = Object.assign

export const hasChanged = (val, newVal) => {
    return !Object.is(val, newVal)
}
export const isOn=( key:string )=> /^on[A-Z]/.test(key)
export const hasOwn =(Obj, key)=> Object.prototype.hasOwnProperty.call(Obj, key)

export const capitalize = (string:string)=> string.charAt(0).toUpperCase() + string.slice(1) // add=> Add
export const toHandlerKey = (string:string)=> string ? "on" + capitalize(string) : "" 
export const camelize = (string:string)=> string.replace(/-(\w)/,(_,v)=>{
  return v ? v.toUpperCase() : ""
})