var tpl = require("./dialog.html");
module.exports = {
	html : tpl,
	init : function() {
		new Vue({
			el : "#demo-dialog",
			data : {
				buttons : [{text : 'ok',close : true}]
			},
			methods : {
				showHtmlDialog : function(){
					this.$refs.htmlDialog.open();
				},
				showJsDialog : function(){
					this.$refs.jsDialog.open();
				}
			}
		});
	}
};
