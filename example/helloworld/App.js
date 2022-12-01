import { h } from "../../lib/guide-mini-vue.esm.js"

const App= {
    render(){
        return h( "div", "Hi," + this.msg )
    },
    setup(){
        return {
            msg: "miniVue3"
        }
    }
}


export default App