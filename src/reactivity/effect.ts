

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

let targetMap = new WeakMap()

let activeEffect: any;

export function track (target: object, key: PropertyKey){
    if(!activeEffect) return
    let depsMap = targetMap.get(target)

    if(!depsMap){
        depsMap = new Map()
        targetMap.set(target,depsMap)
    }

    let dep = depsMap.get(key)

    if(!dep){
        dep = createDeps()
        depsMap.set(key, dep)
    }

    if(!dep.has(activeEffect)){
        dep.add(activeEffect)
        //activeEffect.dep.push(dep)
    }
}
export function trigger (target: object, key: PropertyKey, value: any){
    let depsMap = targetMap.get(target)
    if(!depsMap) return;
    let deps: Array<any> = [];
    let effectFns: Array<any> = [];
    let dep = depsMap.get(key);
    deps.push(...dep);
    deps.forEach((dep)=>{
        effectFns.push(...dep)
    })
    for(let effectFn of effectFns){

        effectFn.run()
    }
}
export function effect(fn: Function){
    const effect = new ReactiveEffect(fn)
    effect.run()
}