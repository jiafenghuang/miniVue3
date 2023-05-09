import { ShapeFlags } from '../shared/ShapeFlags';
import { isObject, isOn } from './../shared/index';
import { createComponentInstance, setupComponent } from './component';
import { Fragment, Text } from './vnode';

export function render(vnode: any, container: any) {
	patch(vnode, container, null);
}

export function patch(vnode: any, container: any, parentComponent) {
	// TODO判断是否为element，是则处理element，不再递归使用patch
	const { type, shapeFlag } = vnode;
	switch (type) {
		case Fragment:
			processFragment(vnode, container, parentComponent);
			break;
		case Text:
			processText(vnode, container);
			break;

		default:
			if (shapeFlag & ShapeFlags.ELEMENT) {
				processElement(vnode, container, parentComponent);
			} else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) processComponent(vnode, container, parentComponent);
			break;
	}

	//Fragment => 只渲染 children
}
function processComponent(vnode: any, container: any, parentComponent) {
	mountComponent(vnode, container, parentComponent);
}

function mountComponent(initialVnode: any, container, parentComponent) {
	const instance = createComponentInstance(initialVnode, parentComponent);
	setupComponent(instance);
	setupRenderEffect(instance, initialVnode, container);
}

function setupRenderEffect(instance, initialVnode, container) {
	const { proxy } = instance;

	const subTree = instance.render.call(proxy);

	patch(subTree, container, instance);

	//全部element 都处理完成,subtre
	initialVnode.el = subTree.el;
}

function processElement(vnode, container, parentComponent) {
	mountElement(vnode, container, parentComponent);
}

function mountElement(vnode: any, container: any, parentComponent) {
	const { type, children, props, shapeFlag } = vnode;
	const el = (vnode.el = document.createElement(type));
	for (let key in props) {
		const val = props[key];

		if (isOn(key)) {
			el.addEventListener(key.slice(2).toLowerCase(), val);
		}

		el.setAttribute(key, val);
	}
	if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
		mountChildren(vnode, el, parentComponent);
	} else if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
		el.textContent = children;
	}
	container.append(el);
}

function mountChildren(vnode, container, parentComponent) {
	vnode.children.forEach(child => {
		patch(child, container, parentComponent);
	});
}
function processFragment(vnode: any, container: any, parentComponent) {
	mountChildren(vnode, container, parentComponent);
}

function processText(vnode, container) {
	const { children } = vnode;
	const textNode = (vnode.el = document.createTextNode(children));
	container.append(textNode);
}
