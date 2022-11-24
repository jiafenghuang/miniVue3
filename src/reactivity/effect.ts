

/*
{
    target:{
        key:[deps]
    }
}
*/
import { extend } from '../shared'
import { createDeps } from './deps'
class ReactiveEffect {
    private _fn: Function
    deps: []
    active: boolean
    onStop?: Function
    constructor(fn: Function,public scheduler?) {
        this._fn = fn
        this.deps = []
        this.active = true
        this.scheduler = scheduler
    }

    run() {
        activeEffect = this
        //cleanupEffect(this)
        return this._fn()
    }
    stop(){
        if(this.active){
            cleanupEffect(this)
            
            if(this.onStop){
                this.onStop()
            }
            this.active = false
        }
        
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
    activeEffect.deps.push(dep) 
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
    const _effect = new ReactiveEffect(fn,options.scheduler)

    extend(_effect,options)
    _effect.run()
    
    const runner = _effect.run.bind(_effect)
    runner.effect = _effect 
    return runner
}

export function stop(runner){
    runner.effect.stop() 
}