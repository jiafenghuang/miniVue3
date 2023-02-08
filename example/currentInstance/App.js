import { h, getCurrentInstance } from '../../lib/guide-mini-vue.esm.js';
import Foo from './Foo.js';
const App = {
	name: 'App',
	render() {
		var testInstance = h('p', {}, 'testCurrentInstance demo');
		return h('div', {}, [testInstance, h(Foo)]);
	},
	setup() {
		const instance = getCurrentInstance();
		console.log('instance', instance);
	},
};

export default App;
