import { createComponentInstance, setupComponent, setupRenderEffect } from "./component"

export function render(vnode: any, container: any) {
    patch(vnode, container)
}

export function patch(vnode: any, container: any) {
    // TODO判断是否为element，是则处理element，不再递归使用patch
    processComponent(vnode, container)
}
function processComponent(vnode: any, container: any) {
    mountComponent(vnode, container)
}

function mountComponent(vnode: any, container) {
    const instance = createComponentInstance(vnode)
    setupComponent(instance)
    setupRenderEffect(instance, container)
}