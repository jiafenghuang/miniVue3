

/*
{
    target:{
        key:[deps]
    }
}
*/
import { createDeps } from './deps'
class ReactiveEffect {

    private _fn: Function

    constructor(fn: Function){
        this._fn = fn
    }

    run(){
        activeEffect = this
        this._fn()
    }
}

let targetMap = new Map()

let activeEffect: any;

export function track (target: object, key: PropertyKey){
    // if(!activeEffect) return
    let depsMap = targetMap.get(target)

    if(!depsMap){
        depsMap = new Map()
        targetMap.set(target,depsMap)
    }

    let dep = depsMap.get(key)

    if(!dep){
        dep = new Set()
        depsMap.set(key, dep)
    }

    dep.add(activeEffect)
}
export function trigger (target: object, key: PropertyKey, value: any){
    let depsMap = targetMap.get(target)
    if(!depsMap) return;
    // let deps: Array<any> = [];
    let dep = depsMap.get(key);
    for(let effectFn of dep){
        effectFn.run()
    }
}
export function effect(fn: Function){
    const _effect = new ReactiveEffect(fn)
    _effect.run()
}