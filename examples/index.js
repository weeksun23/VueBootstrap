import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import {createApp} from 'vue';
import {createRouter,createWebHashHistory} from 'vue-router';
//set highlightjs
import 'highlight.js/styles/github.css';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);
window.hljs = hljs;
//demo components
import Demo from './components/demo';
import About from './components/about';
import Dialog from './components/dialog';
import Select from './components/select';
import Table from './components/table';
import Tooltip from './components/tooltip';
import Tree from './components/tree';
//VueBootstrap
import VueBootstrap from '../src/index';
// Vue.use(hljs.vuePlugin);
//beautify
let {js,html} = require('js-beautify');
window.JS = (code) => {
	return js(code,{indent_size : 2,preserve_newlines : false});
};
window.HTML = (code) => {
	return html(code,{indent_size : 2,preserve_newlines : false});
};
const routes = [
	{name : 'about',path : "/component/about",component : About},
	{name : 'dialog',path : "/component/dialog",component : Dialog},
	{name : 'select',path : '/component/select',component : Select},
	{name : 'table',path : '/component/table',component : Table},
	{name : 'tooltip',path : '/component/tooltip',component : Tooltip},
	{name : 'tree',path : "/component/tree",component : Tree}
];
const router = createRouter({
	history: createWebHashHistory(),
  routes
});
router.beforeEach((to, from, next) => {
  if(!to.name){
  	next({ name: 'about' })
  }else{
  	next();
  }
});
let app = createApp({
	data(){
		return {
			curPage : ''
		}
	},
	methods : {
	},
	mounted(){
		this.curPage = this.$route.name;
	}
});
app.component('demo',Demo);
app.use(router);
app.use(VueBootstrap);
app.mount("#app");
router.afterEach((to, from) => {
	app.curPage = to.name;
});
