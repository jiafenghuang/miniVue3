
import { h } from "../../lib/guide-mini-vue.esm.js"


export const Child ={
  setup(props){
    console.log(props)
  },
  render(){
    return h("div",{},"child"+this.count)
  }
}