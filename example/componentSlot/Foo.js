import { h,renderSlots } from "../../lib/guide-mini-vue.esm.js"
const Foo = {
    name:"Foo",
    render(){
      const foo = h("p", {}, "foo")
      const age = 18
      console.log(this.$slots)
      return h("div",
        {}, 
        [
          renderSlots(this.$slots,"header",{age}),
          foo,
          renderSlots(this.$slots,"footer")
        ])
    },

    setup(){
        return {}
    }
}


export default Foo