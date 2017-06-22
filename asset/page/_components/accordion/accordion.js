var tpl = require("./accordion.html");
module.exports = {
	html : tpl,
	init : function() {
		new Vue({
			el : "#demo-accordion",
			data : {
				initData : [{
		      title : "a1",
		      children : [{
		        title : "a1-1"
		      },{
		        title : "a1-2",
		        iconCls : "glyphicon-text-height"
		      }]
		    },{
		      title : "a2",
		      children : [{
		        title : "a2-1",iconCls : "glyphicon-ok"
		      },{
		        title : "a2-2"
		      }]
		    },{
		      title : "content",
		      content : "<h1>testtest</h1>"
		    }]
			}
		});
	}
};
