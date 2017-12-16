var tpl = require("./loading.html");
module.exports = {
	html : tpl,
	init : function() {
		new Vue({
			el : "#demo-loading",
			data : {
				isShow : false
			},
			methods : {
				toggleLoading : function(){
					if(this.isShow){
						this.$refs.loading.hide();
					}else{
						this.$refs.loading.show();
					}
					this.isShow = !this.isShow;
				}
			}
		});
	}
};
