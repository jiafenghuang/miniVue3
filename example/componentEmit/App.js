import { h } from "../../lib/guide-mini-vue.esm.js"
import { Child } from "./Child.js"
window.self = null
const App= {
    name:"App",
    render(){
        //emit
        return h( "div", {},[h("div",{},"App"),h(Child,{
            onAdd(a,b){
                console.log("app,onAdd",a,b)
            },
            onAddFoo(a,b){
                console.log("app,onAddFoo",a,b)
            }
        })]) 
    },
    setup(){
        return {}
    }
}


export default App