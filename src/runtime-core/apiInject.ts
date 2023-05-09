import { getCurrentInstance } from './component';

export function provide(key, value) {
	const currentInstance = getCurrentInstance();
	if (currentInstance) {
		let { provides } = currentInstance;
		const parentProvides = currentInstance.parent.provides;

		//init
		if (provides === parentProvides) {
			provides = currentInstance.provides = Object.create(parentProvides); // 原型链
		}

		provides[key] = value;
	}
}

export function inject(key, defaultValue) {
	const currentInstance = getCurrentInstance();
	if (currentInstance) {
		const { parent } = currentInstance;
		const parentProvides = parent.provides;
		if (key in parentProvides) {
			return parentProvides[key];
		} else if (defaultValue) {
			if (defaultValue instanceof Function) {
				return defaultValue();
			}
			return defaultValue;
		}
	}
}
