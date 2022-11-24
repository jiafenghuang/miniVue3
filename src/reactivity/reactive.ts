import { mutableHandler, readonlyHandler } from './baseHandlers'




export function reactive(target) {
    return createActiveObject(target,mutableHandler)
}

export function readonly(target){
    return createActiveObject(target,readonlyHandler)
}
function createActiveObject(target ,baseHandler){
    return new Proxy(target, readonlyHandler)
    
}