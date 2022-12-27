import { h } from "../../lib/guide-mini-vue.esm.js"
import { Child } from "./Child.js"
window.self = null
const App= {
    name:"App",
    render(){
        window.self = this
        return h( "div", {
            id:"root",
            class:"test",
            style:"color:red",
            onClick:()=>{
                console.log("11")
            }},
            [h("div",{},"app" + this.msg),h(Child,{count:1})]) 
    },
    setup(){
        return {
            msg: "miniVue3"
        }
    }
}


export default App