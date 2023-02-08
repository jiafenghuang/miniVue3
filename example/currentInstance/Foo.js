import { h, getCurrentInstance } from '../../lib/guide-mini-vue.esm.js';
const Foo = {
	name: 'Foo',

	setup() {
		const instance = getCurrentInstance();
		console.log('instance', instance);
		return {};
	},
	render() {
		return h('p', {}, 'foo');
	},
};

export default Foo;
