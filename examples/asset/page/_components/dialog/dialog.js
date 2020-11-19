var tpl = require("./dialog.html");
module.exports = {
	html : tpl,
	init : function() {
		//修改按钮默认配置
		// Vue.component("v-dialog").defaultBtn.theme = 'danger';
		new Vue({
			el : "#demo-dialog",
			data : {
				buttons : [{text : 'ok',close : true}],
				insideDialogBtns : [{
					text : '取消',
					close : true
				},{
					text : '确定',
					theme : 'primary',
					handler : function(){
						alert("aaa");
						this.close();
					}
				}],
				propColumns : app.attrColumns,
				propData : [{
					name : 'title',type : 'String',defaultVal : "''",desc : '表格标题'
				},{
					name : 'buttons',type : 'Array',defaultVal : '[]',desc : '按钮数组',
					children_title : '按钮项说明',
					children : [{
						name : 'close',type : 'boolean',defaultVal : 'false',desc : '点击按钮后是否自动关闭窗口'
					},{
						name : 'theme',type : 'String',defaultVal : 'default',desc : '按钮bootstrap样式'
					},{
						name : 'handler',type : 'Function',defaultVal : '空函数',desc : '点击按钮事件，this指向当前dialog实例'
					},{
						name : 'text',type : 'String',defaultVal : "''",desc : '按钮文字'
					},{
						name : 'iconCls',type : 'String',defaultVal : "''",desc : '按钮iconfont图标'
					}]
				},{
					name : 'content',type : 'String',defaultVal : "''",desc : '窗口内容HTML'
				},{
					name : 'bodyStyle',type : 'String',defaultVal : "''",desc : '窗口内容区域内联样式'
				},{
					name : 'btnAlign',type : 'String',defaultVal : "''",desc : '按钮对齐方式，为空默认bootstrap样式'
				},{
					name : 'onBeforeClose',type : 'Function',defaultVal : "空函数",desc : '关闭窗口前触发，若返回false终止关闭'
				},{
					name : 'onClose',type : 'Function',defaultVal : "空函数",desc : '关闭窗口事件，关闭动画开始前触发'
				},{
					name : 'onBeforeOpen',type : 'Function',defaultVal : "空函数",desc : '打开窗口前触发，若返回false终止打开'
				},{
					name : 'onOpen',type : 'Function',defaultVal : "空函数",desc : '打开窗口事件，打开动画结束后触发'
				}],
				methodsColumns : app.methodsColumns,
				methodsData : [{
					name : 'open',params : 'none',returnVal : 'none',desc : '打开窗口'
				},{
					name : 'close',params : 'none',returnVal : 'none',desc : '关闭窗口'
				}]
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
