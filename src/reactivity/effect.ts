

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
    onStop?: Function
    private active: boolean
    options: {}
    constructor(fn: Function, public scheduler?) {
        this._fn = fn
        this.deps = []
        this.active = true
        this.scheduler = scheduler
        this.options = {}

    }
    run() {
        shouldTrack = false

        if (!this.active) {
            return this._fn()
        }

        shouldTrack = true
        activeEffect = this
        const result = this._fn()
        shouldTrack = false

        return result
    }

    stop() {
        if (this.active) {
            cleanupEffect(this)
            if (this.onStop) {
                this.onStop()
            }
            this.active = false
        }

    }
}

let targetMap = new WeakMap()
let activeEffect: any;
let shouldTrack: boolean //是否要收集依赖

export function track(target: object, key: PropertyKey) {
    if (!isTracking()) return

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

    if (dep.has(activeEffect)) return

    dep.add(activeEffect)
    activeEffect.deps.push(dep)
}
function isTracking() {
    // if (!shouldTrack) return
    // if (!activeEffect) return
    return shouldTrack && activeEffect !== undefined
}
export function trigger(target: object, key: PropertyKey) {
    let depsMap = targetMap.get(target)
    if (!depsMap) return;
    let deps = depsMap.get(key);
    let effectToRun: any[] = []
    effectToRun.push(...deps)
    for (let effectFn of effectToRun) {
        if (effectFn.scheduler) {
            effectFn.scheduler()
        } else {
            effectFn.run()
        }
    }
}

function cleanupEffect(effect) {
    effect.deps.forEach(dep => {
        dep.delete(effect)
    })
    effect.deps.length = 0
}
export function effect(fn: Function, options: any = {}) {
    const _effect = new ReactiveEffect(fn, options.scheduler)
    extend(_effect, options)
    _effect.run()
    const runner = _effect.run.bind(_effect)
    runner.effect = _effect
    return runner
}
export function stop(runner) {
    runner.effect.stop()
}