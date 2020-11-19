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
Vue.use(VueBootstrap);
Vue.use(VueRouter);
const routes = [
	{path : "/component/about",component : {template : `<div>VueBootstrap,基于Bootstrap的Vue Ui框架</div>`}},
	{path : "/component/dialog",component : Dialog}
];
const router = new VueRouter({
  routes
});
window.formatCode = function(str){
	return str.replace(/\t/g,'  ');
};
new Vue({
	router,
	el : "#app",
	data : {
	},
	methods : {
	}
});