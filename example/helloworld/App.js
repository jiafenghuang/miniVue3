import { h } from "../../lib/guide-mini-vue.esm.js"
window.self = null
const App= {
    render(){
        window.self = this
        return h( "div", {
            id:"root",
            class:"test",
            style:"color:red"

        },[h("label",{class:"red"},"hi"+this.msg), h("p",{class:"blue"},"blue")] )
    },
    setup(){
        return {
            msg: "miniVue3"
        }
    }
}


export default App