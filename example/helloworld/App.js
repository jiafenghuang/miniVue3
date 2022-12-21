import { h } from "../../lib/guide-mini-vue.esm.js"
window.self = null
const App= {
    render(){
        window.self = this
        return h( "div", {
            id:"root",
            class:"test",
            style:"color:red",
            onClick:()=>{
                console.log("11")
            }},'sheldon')
    },
    setup(){
        return {
            msg: "miniVue3"
        }
    }
}


export default App