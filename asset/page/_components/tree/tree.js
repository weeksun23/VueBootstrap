var tpl = require("./tree.html");
module.exports = {
	html : tpl,
	init : function() {
		new Vue({
			el : "#demo-tree",
			data : {
				nodeList : [{
					text : '展开我异步加载数据',
					//需要异步加载下一层数据的节点state必须为closed
					state : 'closed'
				},{
					text : 'aaaaaa',
					iconCls : 'glyphicon-euro'
				},{
					text : 'aaaaaa',
					iconCls : 'glyphicon-heart'
				},{
					text : 'aaaaaa',
					children : [{
						text : 'bbbbbb',
						iconCls : 'glyphicon-star'
					},{
						text : 'bbbbbb',
						children : [{
							text : 'cccccc',
							iconCls : 'glyphicon-euro'
						},{
							text : 'cccccc',
							iconCls : 'glyphicon-euro'
						},{
							text : 'cccccc',
							iconCls : 'glyphicon-heart'
						}]
					},{
						text : 'bbbbbb'
					}]
				},{
					text : 'aaaaaa',
					iconCls : 'glyphicon-euro'
				},{
					text : 'aaaaaa',
					iconCls : 'glyphicon-euro'
				}],
				propColumns : app.attrColumns,
				propData : [{
					name : 'nodeList',type : 'Array',defaultVal : "[]",desc : '树节点数据',children_title : '节点属性说明',
					children : [{
						name : 'id',type : 'Number',defaultVal : "null",desc : '节点数据主键值若指定则必须唯一，当加载下一层节点数据时，组件会自动将该值作为参数发送到服务器'
					},{
						name : 'iconCls',type : 'String',defaultVal : "''",desc : '节点图标'
					},{
						name : 'openIconCls',type : 'String',defaultVal : "''",desc : '展开子节点列表时的图标'
					},{
						name : 'text',type : 'String',defaultVal : "''",desc : '节点文字'
					},{
						name : 'checked',type : 'Number',defaultVal : "0",desc : '节点checkbox状态 1:选中 0:没选中 2:预选'
					},{
						name : 'state',type : 'String',defaultVal : "''",desc : '节点展开状态,有值(closed|open)说明有子节点;若state值为closed，树定义了url，且children为空，展开该节点会自动异步加载下一层数据'
					},{
						name : 'children',type : 'Array',defaultVal : "[]",desc : '子节点列表'
					}]
				},{
					name : 'icon',type : 'Boolean',defaultVal : 'true',desc : '节点是否带图标'
				},{
					name : 'checkbox',type : 'Boolean',defaultVal : 'false',desc : '节点是否带checkbox'
				},{
					name : 'cascadeCheck',type : 'Boolean',defaultVal : 'true',desc : '节点勾选是否采取级联检查（仅在checkbox为true的情况下生效）'
				},{
					name : 'loadFilter',type : 'Function',defaultVal : "function(resp){" +
						"return Vue.component('v-tree').loadFilter(resp);" +
					"}",
					desc : '展开节点异步加载下一层数据的处理函数，若没定义Vue.me.ajaxLoadFilter，则必须返回处理后的节点数组；若定义了Vue.me.ajaxLoadFilter，则必须同时重写Vue.component("v-tree").loadFilter，且返回值必须是含error(错误对象)和data(节点数组)属性的对象'
				},{
					name : 'initUrl',type : 'String',defaultVal : 'true',desc : '异步获取节点下一层数据的url'
				},{
					name : 'method',type : 'String',defaultVal : 'GET',desc : '异步获取节点下一层数据的方法请求方式'
				},{
					name : 'queryParams',type : 'Object',defaultVal : '{}',desc : '异步获取节点下一层数据的方法请求参数'
				},{
					name : 'onBeforeSelect',type : 'Function',defaultVal : '空函数',desc : '选择节点前触发，返回false终止选择'
				},{
					name : 'onSelect',type : 'Function',defaultVal : '空函数',desc : '选择节点后触发'
				},{
					name : 'onBeforeExpand',type : 'Function',defaultVal : '空函数',desc : '展开节点前触发，返回false终止展开'
				},{
					name : 'onExpand',type : 'Function',defaultVal : '空函数',desc : '展开节点后触发'
				},{
					name : 'onBeforeCollapse',type : 'Function',defaultVal : '空函数',desc : '收起节点前触发，返回false终止收起'
				},{
					name : 'onCollapse',type : 'Function',defaultVal : '空函数',desc : '收起节点后触发'
				},{
					name : 'onBeforeLoad',type : 'Function',defaultVal : '空函数',desc : '加载节点下一层数据前触发，返回false终止加载'
				},{
					name : 'onLoadSuccess',type : 'Function',defaultVal : '空函数',desc : '成功加载节点下一层数据后触发'
				},{
					name : 'onLoadError',type : 'Function',defaultVal : '空函数',desc : '加载节点下一层数据失败时触发'
				}],
				methodsColumns : app.methodsColumns,
				methodsData : [{
					name : 'toggleCheck',params : 'el:节点对象或节点id|checked:勾选状态1:选中 0:没选中 2:预选，若缺省则切换勾选状态；',returnVal : 'none',desc : '切换或设置节点勾选状态'
				},{
					name : 'loadData',params : 'data:节点数组',returnVal : 'none',desc : '重新加载树数据'
				},{
					name : 'getNode',params : 'target:节点对象或节点id',returnVal : '{node : 节点对象,index : 节点索引,list : 节点所在数组}',desc : '获取节点的详细信息'
				},{
					name : 'reload',params : 'target:节点对象或节点id,若缺省则对象是整棵树',returnVal : 'none',desc : '重新加载节点或整棵树的数据'
				},{
					name : 'getParents',params : 'target:节点对象或节点id',returnVal : '所有祖先节点组成的数组',desc : '获取指定节点的所有祖先节点'
				},{
					name : 'toggleState',params : 'state:节点状态|el:节点对象，若缺省则是对整棵树所有节点进行操作',returnVal : 'none',desc : '展开或收缩节点'
				},{
					name : 'expandTo',params : 'target:节点对象或节点id',returnVal : 'none',desc : '展开到指定节点'
				},{
					name : 'getSelected',params : 'none',returnVal : '节点对象',desc : '获取当前选择的节点对象'
				},{
					name : 'removeNode',params : 'target:节点id或节点监控对象',returnVal : 'none',desc : '移除指定节点'
				},{
					name : 'appendNodes',params : 'data:节点数据数组|parent:若不指定则默认添加到根节点，若为string或number则是节点id，若为object则是节点的监控对象',returnVal : 'null',desc : '添加节点'
				}]
			},
			methods : {
				addNodes : function(){
					this.$refs.tree.appendNodes([{text : '11'},{text : '22'}]);
				},
				onSelect : function(node){
					console.log(node);
				}
			}
		});
	}
};