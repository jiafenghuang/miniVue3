import { ShapeFlags } from '../shared/ShapeFlags';
import { isObject, isOn } from './../shared/index';
import { createComponentInstance, setupComponent } from './component';
import { Fragment } from './vnode';

export function render(vnode: any, container: any) {
	patch(vnode, container);
}

export function patch(vnode: any, container: any) {
	// TODO判断是否为element，是则处理element，不再递归使用patch
	const { type, shapeFlag } = vnode;
	switch (type) {
		case Fragment:
			processFragment(vnode, container);
			break;

		default:
			if (shapeFlag & ShapeFlags.ELEMENT) {
				processElement(vnode, container);
			} else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) processComponent(vnode, container);
			break;
	}

	//Fragment => 只渲染 children
}
function processComponent(vnode: any, container: any) {
	mountComponent(vnode, container);
}

function mountComponent(initialVnode: any, container) {
	const instance = createComponentInstance(initialVnode);
	setupComponent(instance);
	setupRenderEffect(instance, initialVnode, container);
}

function setupRenderEffect(instance, initialVnode, container) {
	const { proxy } = instance;

	const subTree = instance.render.call(proxy);

	patch(subTree, container);

	//全部element 都处理完成,subtre
	initialVnode.el = subTree.el;
}

function processElement(vnode, container) {
	mountElement(vnode, container);
}

function mountElement(vnode: any, container: any) {
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
		mountChildren(vnode, el);
	} else if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
		el.textContent = children;
	}
	container.append(el);
}

function mountChildren(vnode, container) {
	vnode.children.forEach(child => {
		patch(child, container);
	});
}
function processFragment(vnode: any, container: any) {
	mountChildren(vnode, container);
}
