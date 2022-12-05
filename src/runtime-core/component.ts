import { patch } from "./renderer"

export function createComponentInstance(vnode) {
    const component = {
        vnode,
        type: vnode.type
    }
    return component
}

export function setupComponent(instance) {
    //initProps()
    //initSlots()
    setupStatefulComponent(instance)
}
function setupStatefulComponent(instance) {
    const component = instance.type

    //ctx
    instance.proxy = new Proxy({},{
        get(target,key){
            //setupState
            const {setupState} = instance
            if(key in setupState){
                return setupState[key]
            }
        },
    })
    const { setup } = component
    if (setup) {
        const setupResult = setup()
        handleSetupResult(instance, setupResult)
    }
}
export function setupRenderEffect(instance, container) {
    const { proxy } = instance

    const subTree = instance.render.call(proxy)

    patch(subTree, container)
}



function handleSetupResult(instance, setupResult: any) {
    if (typeof setupResult === "object") {
        instance.setupState = setupResult
    }
    finishComponentSetup(instance)
}

function finishComponentSetup(instance) {
    const Component = instance.type
    if (Component.render) {
        instance.render = Component.render
    }
}

function initProps() {
    throw new Error("Function not implemented.")
}

function initSlots() {
    throw new Error("Function not implemented.")
}
