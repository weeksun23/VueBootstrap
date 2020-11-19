import '../lib/bootstrap-3.3.7-dist/css/bootstrap.css';
import Vue from 'vue';
import VueBootstrap from '../src/index';
Vue.use(VueBootstrap);
new Vue({
	el : "#app",
	data : {
	},
	methods : {
		test(){
			this.$refs.testDialog.open();
		}
	}
});