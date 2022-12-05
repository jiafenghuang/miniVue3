import { isObject } from './../shared/index';
import { createComponentInstance, setupComponent } from "./component"

export function render(vnode: any, container: any) {
    patch(vnode, container)
}

export function patch(vnode: any, container: any) {
    // TODO判断是否为element，是则处理element，不再递归使用patch
    const vnodeType = vnode.type
    if (typeof vnodeType === "string") {
        processElement(vnode, container)
    } else if (isObject(vnodeType))
        processComponent(vnode, container)
}
function processComponent(vnode: any, container: any) {
    mountComponent(vnode, container)
}

function mountComponent(initialVnode: any, container) {
    const instance = createComponentInstance(initialVnode)
    setupComponent(instance)
    setupRenderEffect(instance,initialVnode, container)
}
function setupRenderEffect(instance,initialVnode, container) {
    const { proxy } = instance

    const subTree = instance.render.call(proxy)

    patch(subTree, container)

    //全部element 都处理完成,subtre
    initialVnode.el = subTree.el
}


function processElement(vnode, container) {
    mountElement(vnode, container)
}
function mountElement(vnode: any, container: any) {
    const { type, children, props } = vnode
    const el =(vnode.el = document.createElement(type))
    for (let key in props) {
        const val = props[key]
        el.setAttribute(key, val)
    }
    if (Array.isArray(children)) {
        mountChildren(vnode, el)

    } else if (typeof children === "string") {
        el.textContent = children
    }
    container.append(el)

}

function mountChildren(vnode, container) {
    vnode.children.forEach(child => {
        patch(child, container)
    })
}

