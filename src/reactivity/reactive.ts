import {track,trigger} from './effect'
const baseHander = {
    get:(target: object,key: PropertyKey)=>{
        track(target, key)
        return Reflect.get(target, key)
    },
    set:(target: object,key: PropertyKey,value: any) =>{
        trigger(target, key, value)
        return Reflect.set(target, key, value)
    }
}
export function reactive(target){
    return new Proxy(target,baseHander)
}