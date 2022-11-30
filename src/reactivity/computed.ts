import { ReactiveEffect } from "./effect"

export function computed(getter){
  return new ComputedRefImpl(getter)
}

class ComputedRefImpl{
  private _getter: any
  private _value: any
  private _dirty: any = true
  private _effect: ReactiveEffect

  constructor(getter){
    this._getter = getter
    this._effect = new ReactiveEffect(this._getter,()=>{
      this._dirty = true
    })
  }
  get value(){
    if(this._dirty){
      this._dirty = false
      this._value = this._effect.run()
    }
    return this._value
  }
}