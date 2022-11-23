

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

    constructor(fn: Function,public scheduler?) {
        this._fn = fn
        this.scheduler = scheduler
    }

    run() {
        activeEffect = this
        //cleanupEffect(this)
        return this._fn()
    }

}

let targetMap = new WeakMap()

let activeEffect: any;

export function track(target: object, key: PropertyKey) {
    if (!activeEffect) return
    let depsMap = targetMap.get(target)

    if (!depsMap) {
        depsMap = new Map()
        targetMap.set(target, depsMap)
    }

    let dep = depsMap.get(key)

    if (!dep) {
        dep = createDeps()
        depsMap.set(key, dep)
    }

    dep.add(activeEffect)
    activeEffect.deps = dep
}
export function trigger(target: object, key: PropertyKey) {
    let depsMap = targetMap.get(target)
    if (!depsMap) return;
    let deps: Array<any> = [];
    let dep = depsMap.get(key);
    deps.push(...dep)
    for (let effectFn of deps) {
        if(effectFn.scheduler){
            effectFn.scheduler()
        }else{
            effectFn.run()
        }
        
    }
}

function cleanupEffect(effect) {
    effect.deps.forEach(dep => {
        dep.delete(effect)
    })
}

export function effect(fn: Function,options:any={} ) {
    const scheduler = options.scheduler

    
    const _effect = new ReactiveEffect(fn,scheduler)
    
    _effect.run()
    return _effect.run.bind(_effect)
}