import { shallowReadonly } from '../reactivity/reactive';
import { emit } from './componentEmit';
import { initProps } from './componentProps';
import { publicInstanceProxyHandlers } from './componentPublicInstance';
import { initSlots } from './componentSlots';

export function createComponentInstance(vnode, parent) {
	console.log('createComponentInstance', parent);
	const component = {
		vnode,
		type: vnode.type,
		setupState: {},
		props: {},
		slots: {},
		provides: parent ? parent.provides : {},
		parent,
		emit: () => {},
	};
	component.emit = emit.bind(null, component) as any; //偏函数，预设一个instance值
	return component;
}

export function setupComponent(instance) {
	initProps(instance, instance.vnode.props);
	initSlots(instance, instance.vnode.children);
	setupStatefulComponent(instance);
}
function setupStatefulComponent(instance) {
	const component = instance.type;

	//ctx
	instance.proxy = new Proxy({ _: instance }, publicInstanceProxyHandlers);
	const { setup } = component;
	if (setup) {
		setCurrentInstance(instance);
		const setupResult = setup(shallowReadonly(instance.props), {
			emit: instance.emit,
		});
		setCurrentInstance(null);
		handleSetupResult(instance, setupResult);
	}
}

function handleSetupResult(instance, setupResult: any) {
	if (typeof setupResult === 'object') {
		instance.setupState = setupResult;
	}
	finishComponentSetup(instance);
}

function finishComponentSetup(instance) {
	const Component = instance.type;
	if (Component.render) {
		instance.render = Component.render;
	}
}

let currentInstance = null;
export function getCurrentInstance() {
	return currentInstance;
}
function setCurrentInstance(instance) {
	currentInstance = instance;
}
