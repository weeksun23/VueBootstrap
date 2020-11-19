var tpl = require("./accordion.html");
module.exports = {
	html : tpl,
	init : function() {
		new Vue({
			el : "#demo-accordion",
			data : {
				initData : [{
		      title : "a1",
		      iconCls : "glyphicon-text-height",
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
		    }],
		    propColumns : app.attrColumns,
				propData : [{
					name : 'initData',type : 'Array',defaultVal : "[]",desc : '手风琴数据',children_title : '数据项说明',
					children : [{
						name : 'title',type : 'String',defaultVal : "''",desc : '面板标题'
					},{
						name : 'iconCls',type : 'String',defaultVal : "''",desc : '面板图标'
					},{
						name : 'children',type : 'Array',defaultVal : 'undefined',desc : '子列表',children_title : '数据项说明',
						children : [{
							name : 'title',type : 'String',defaultVal : "''",desc : '项标题'
						},{
							name : 'iconCls',type : 'String',defaultVal : "''",desc : '项图标'
						}]
					}]
				},{
					name : 'multipleSel',type : 'Boolean',defaultVal : 'false',desc : '是否能同时展开多个面板'
				},{
					name : 'onSelectPanel',type : 'Function',defaultVal : '空函数',desc : '展开panel事件'
				},{
					name : 'onUnSelectPanel',type : 'Function',defaultVal : '空函数',desc : '折叠panel事件'
				},{
					name : 'onSelectItem',type : 'Function',defaultVal : '空函数',desc : '选中列表项事件'
				}],
				methodsColumns : app.methodsColumns,
				methodsData : [{
					name : 'selectPanel',params : 'i:面板索引',returnVal : 'none',desc : '展开指定面板'
				},{
					name : 'selectItem',params : 'ch:列表项对象',returnVal : 'none',desc : '选中列表项'
				},{
					name : 'findItem',params : 'func(item,itemIndex,panel,panelIndex):遍历列表项的处理函数，返回true终止遍历，并将当前列表项返回',
					returnVal : '列表项对象',desc : '遍历列表项'
				},{
					name : 'getSelectedItem',params : 'none',returnVal : '列表项对象',desc : '寻找选中的列表项'
				},{
					name : 'selectItemByTitle',params : 'title:列表项标题',returnVal : '列表项对象',desc : '根据列表项标题寻找列表项'
				}]
			},
			methods : {
				onSelectPanel : function(panel){
					console.log(panel);
				}
			}
		});
	}
};
