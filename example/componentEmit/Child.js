
import { h } from "../../lib/guide-mini-vue.esm.js"


export const Child ={
  setup(props,{emit}){
    console.log(props)
    const emitAdd = ()=>{
      console.log("happen emitAdd")
      emit("add",1,2)
       
      emit("add-foo",1,2)
      return 
    }
    return {emitAdd}
  },
  render(){
    const btn = h("button",{
      onClick:this.emitAdd
    }, "handleEmitAdd")
    const foo = h("p",{},"foo")
    return h("div",{},[foo,btn])
  }
}