import '../lib/bootstrap-3.3.7-dist/css/bootstrap.css';
import './index.css';
import Vue from 'vue';
import VueRouter from 'vue-router'
import VueBootstrap from '../src/index';
import Demo from './components/demo';
//set highlightjs
import 'highlight.js/styles/github.css';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);
Vue.use(hljs.vuePlugin);
//beautify
let {js,html} = require('js-beautify');
window.JS = (code) => {
	return js(code,{indent_size : 2});
};
window.HTML = (code) => {
	return html(code,{indent_size : 2});
};
//examples
import Dialog from './components/dialog';
import Table from './components/table';
import Select from './components/select';
import Tree from './components/tree';
import Tooltip from './components/tooltip';
Vue.use(VueBootstrap);
Vue.use(VueRouter);
Vue.component(Demo.name,Demo);
const routes = [
	{name : 'about',path : "/component/about",component : {template : `<div>VueBootstrap,基于Bootstrap的Vue Ui框架</div>`}},
	{name : 'dialog',path : "/component/dialog",component : Dialog},
	{name : 'table',path : "/component/table",component : Table},
	{name : 'select',path : "/component/select",component : Select},
	{name : 'tree',path : "/component/tree",component : Tree},
	{name : 'tooltip',path : "/component/tooltip",component : Tooltip}
];
const router = new VueRouter({
  routes
});
router.beforeEach((to, from, next) => {
  if(to.name === null){
  	next({ name: 'about' })
  }else{
  	next();
  }
});
const app = new Vue({
	router,
	el : "#app",
	data : {
		curPage : ''
	},
	methods : {
	},
	mounted(){
		this.curPage = this.$route.name;
	}
});
router.afterEach((to, from) => {
	app.curPage = to.name;
});
