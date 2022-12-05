import { h } from "../../lib/guide-mini-vue.esm.js"

const App= {
    render(){
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