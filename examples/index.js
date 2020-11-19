import '../lib/bootstrap-3.3.7-dist/css/bootstrap.css';
import './index.css';
import Vue from 'vue';
import VueRouter from 'vue-router'
import VueBootstrap from '../src/index';
//set highlightjs
import 'highlight.js/styles/github.css';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);
Vue.use(hljs.vuePlugin);
//examples
import Dialog from './components/dialog';
import Table from './components/table';
Vue.use(VueBootstrap);
Vue.use(VueRouter);
const routes = [
	{name : 'about',path : "/component/about",component : {template : `<div>VueBootstrap,基于Bootstrap的Vue Ui框架</div>`}},
	{name : 'dialog',path : "/component/dialog",component : Dialog},
	{name : 'table',path : "/component/table",component : Table},
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
