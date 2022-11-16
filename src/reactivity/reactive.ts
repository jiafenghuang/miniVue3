const baseHander = {
    get:(target,key)=>{
        return target[key]
    },
    set:(target,key,value) =>{
        const res = target[key] = value
        return res
    }
}
export function reactive(target){
    return new Proxy(target,baseHander)
}