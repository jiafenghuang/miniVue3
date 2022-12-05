import { publicInstanceProxyHandlers } from "./componentPublicInstance"

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
    instance.proxy = new Proxy({_:instance},publicInstanceProxyHandlers)
    const { setup } = component
    if (setup) {
        const setupResult = setup()
        handleSetupResult(instance, setupResult)
    }
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
