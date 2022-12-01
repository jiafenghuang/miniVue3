import { h } from "vitest/dist/index-2f5b6168"

export const App= {
    render(){
        return h( "div", "Hi," + this.msg )
    },
    setup(){
        return {
            msg: "miniVue3"
        }
    }
}

