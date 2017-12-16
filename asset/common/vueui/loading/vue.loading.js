require("./vue.loading.css");
var tpl = require("./vue.loading.html");
Vue.component('v-loading', {
	template: tpl,
	$loadingNum : 0,
	data : function(){
		return {
			isShow : false
		};
	},
	methods : {
		show : function(){
			if(++this.$options.$loadingNum === 1){
				this.isShow = true;
			}
		},
		hide : function(){
			if(!this.isShow) return;
			if(--this.$options.$loadingNum === 0){
				this.isShow = false;
			}
		}
	}
});