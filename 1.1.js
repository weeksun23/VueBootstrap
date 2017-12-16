webpackJsonp([1,2],{

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

	var map = {
		"./accordion/accordion": 41,
		"./accordion/accordion.html": 42,
		"./accordion/accordion.js": 41,
		"./datetimepicker/datetimepicker": 43,
		"./datetimepicker/datetimepicker.html": 44,
		"./datetimepicker/datetimepicker.js": 43,
		"./dialog/dialog": 45,
		"./dialog/dialog.html": 46,
		"./dialog/dialog.js": 45,
		"./loading/loading": 47,
		"./loading/loading.html": 48,
		"./loading/loading.js": 47,
		"./overview/overview": 49,
		"./overview/overview.html": 50,
		"./overview/overview.js": 49,
		"./table/table": 51,
		"./table/table.html": 52,
		"./table/table.js": 51
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 40;


/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

	var tpl = __webpack_require__(42);
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


/***/ }),

/***/ 42:
/***/ (function(module, exports) {

	module.exports = "<div id=\"demo-accordion\" class='demo'>\r\n\t<h2>初始化</h2>\r\n\t<h3>从initData属性初始化</h3>\r\n\t<code>html:</code>\r\n\t<pre class='demo-code' v-pre>\r\n\t\t<v-accordion :init-data=\"initData\"></v-accordion>\r\n\t</pre>\r\n\t<code>js:</code>\r\n\t<pre class='demo-code' v-pre>\r\n\t\tdata : {\r\n\t    initData : [{\r\n\t      title : \"a1\",\r\n\t      children : [{\r\n\t        title : \"a1-1\"\r\n\t      },{\r\n\t        title : \"a1-2\",\r\n\t        iconCls : \"glyphicon-text-height\"\r\n\t      }]\r\n\t    },{\r\n\t      title : \"a2\",\r\n\t      children : [{\r\n\t        title : \"a2-1\",iconCls : \"glyphicon-text-height\"\r\n\t      },{\r\n\t        title : \"a2-2\"\r\n\t      }]\r\n\t    },{\r\n\t      title : \"content\",\r\n\t      content : \"<h1>testtest</h1>\"\r\n\t    }]\r\n\t  }\r\n\t</pre>\r\n\t<code>结果:</code>\r\n\t<v-accordion :init-data=\"initData\" :on-select-panel=\"onSelectPanel\"></v-accordion>\r\n\t<h3>从html初始化</h3>\r\n\t<code>html:</code>\r\n\t<pre class='demo-code' v-pre>\r\n\t\t<v-accordion>\r\n\t    <div title='a1'><h2>testetst</h2></div>\r\n\t    <div title='a2'><h2>f3f323e32e</h2><p>wfewwef</p><h3>fewg34h3</h3></div>\r\n\t    <div title='a3'><h2>dfherhe</h2></div>\r\n\t  </v-accordion>\r\n\t</pre>\r\n\t<code>结果:</code>\r\n\t<v-accordion>\r\n\t\t<div title='a1'><h2>testetst</h2></div>\r\n    <div title='a2'><h2>f3f323e32e</h2><p>wfewwef</p><h3>fewg34h3</h3></div>\r\n    <div title='a3'><h2>dfherhe</h2></div>\r\n\t</v-accordion>\r\n\t<h2>props</h2>\r\n\t<v-table :columns=\"propColumns\" :pagination='false' :init-front-page-data=\"propData\"></v-table>\r\n\t<h2>methods</h2>\r\n\t<v-table :columns=\"methodsColumns\" :pagination='false' :init-front-page-data=\"methodsData\"></v-table>\r\n</div>\r\n";

/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

	var tpl = __webpack_require__(44);
	module.exports = {
		html : tpl,
		init : function() {
			new Vue({
				el : "#demo-datetimepicker",
				data : {
					sDate : '',
					eDate : '',
					propColumns : app.attrColumns,
					methodsColumns : app.methodsColumns,
					propData : [{
						name : 'initLeft',type : 'String',defaultVal : "0px",desc : '时间组件left值'
					},{
						name : 'weekdaysName',type : 'Array',defaultVal : "['日','一','二','三','四','五','六']",desc : '每天的文字'
					},{
						name : 'monthName',type : 'Array',defaultVal : '["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]',desc : '每月的文字'
					},{
						name : 'yearText',type : 'String',defaultVal : "年",desc : '年的文字'
					},{
						name : 'position',type : 'String',defaultVal : "bottom-right",desc : '组件位置，暂时只支持bottom-left和bottom-right'
					},{
						name : 'format',type : 'String',defaultVal : "yyyy-MM-dd hh:mm:ss",desc : '日期格式'
					},{
						name : 'onChoose',type : 'Function(value:格式化后的日期字符串,date:日期对象)',defaultVal : "空函数",desc : '选择日期后触发的函数'
					}],
					methodsData : [{
						name : 'clear',params : 'none',returnVal : 'none',desc : '清空时间'
					},{
						name : 'setToday',params : 'none',returnVal : 'none',desc : '将当前时间设置为时间组件的时间'
					},{
						name : 'open',params : 'HTMLElement,vmodel,key|vmodel,key',returnVal : 'none',desc : '打开时间组件'
					},{
						name : 'setValue',params : 'date:时间对象',returnVal : 'none',desc : '设置指定时间'
					},{
						name : 'getValue',params : 'null',returnVal : '格式化时间字符串',desc : '获取时间组件的格式化时间字符串'
					},{
						name : 'getDate',params : 'null',returnVal : '时间对象',desc : '获取时间组件的时间对象'
					}]
				},
				methods : {
					showDate : function(e,key){
						comp.$refs.date.open(e.target,this,key);
					},
					showSingleDate : function(key){
						this.$refs[key].open(this,key);
					}
				}
			});
		}
	};


/***/ }),

/***/ 44:
/***/ (function(module, exports) {

	module.exports = "<div id=\"demo-datetimepicker\" class='demo'>\r\n\t<h2>共享模式初始化</h2>\r\n\t<code>html:</code>\r\n\t<pre class='demo-code' v-pre>\r\n\t\t<form class=\"form-horizontal\">\r\n\t\t  <div class=\"form-group\">\r\n\t\t    <label class=\"col-sm-2 control-label\">共享时间组件1</label>\r\n\t\t    <div class=\"col-sm-4\">\r\n\t\t    \t<div class=\"input-group datetimepicker-container\">\r\n\t\t\t\t\t  <input type=\"text\" class=\"form-control\" @click=\"showDate($event,'sDate')\" v-model='sDate' readonly>\r\n\t\t\t\t\t  <span class=\"input-group-addon\" @click='sDate = \"\"'>\r\n\t\t\t\t\t  \t<i class='glyphicon glyphicon-remove'></i>\r\n\t\t\t\t\t  </span>\r\n\t\t\t\t\t  <span class=\"input-group-addon\" @click=\"showDate($event,'sDate')\">\r\n\t\t\t\t\t  \t<i class='glyphicon glyphicon-calendar'></i>\r\n\t\t\t\t\t  </span>\r\n\t\t\t\t\t</div>\r\n\t\t    </div>\r\n\t\t    <label class=\"col-sm-2 control-label\">共享时间组件2</label>\r\n\t\t    <div class=\"col-sm-4\">\r\n\t\t      <div class=\"input-group datetimepicker-container\">\r\n\t\t\t\t\t  <input type=\"text\" class=\"form-control\" @click=\"showDate($event,'eDate')\" v-model='eDate' readonly>\r\n\t\t\t\t\t  <span class=\"input-group-addon\" @click='eDate = \"\"'>\r\n\t\t\t\t\t  \t<i class='glyphicon glyphicon-remove'></i>\r\n\t\t\t\t\t  </span>\r\n\t\t\t\t\t  <span class=\"input-group-addon\" @click=\"showDate($event,'eDate')\">\r\n\t\t\t\t\t  \t<i class='glyphicon glyphicon-calendar'></i>\r\n\t\t\t\t\t  </span>\r\n\t\t\t\t\t</div>\r\n\t\t    </div>\r\n\t\t  </div>\r\n\t\t</form>\r\n\t\t....\r\n\t\t<!-- 共享模式下datetimepicker的相对定位父元素必须是body -->\r\n\t\t<!-- comp父元素就是body -->\r\n\t\t<div id='comp'>\r\n\t\t\t<v-datetimepicker ref='date' format='yyyy-MM-dd'></v-datetimepicker>\r\n\t\t</div>\r\n\t</pre>\r\n\t<h2>单独模式初始化</h2>\r\n\t<code>html:</code>\r\n\t<pre class='demo-code' v-pre>\r\n\t\t<form class=\"form-horizontal\">\r\n\t\t  <div class=\"form-group\">\r\n\t\t    <label class=\"col-sm-2 control-label\">单独时间组件1</label>\r\n\t\t    <div class=\"col-sm-4 posr\">\r\n\t\t    \t<div class=\"input-group\">\r\n\t\t\t\t\t  <input type=\"text\" class=\"form-control\" @click=\"showSingleDate('sDate')\" v-model='sDate' readonly>\r\n\t\t\t\t\t  <span class=\"input-group-addon\" @click='sDate = \"\"'>\r\n\t\t\t\t\t  \t<i class='glyphicon glyphicon-remove'></i>\r\n\t\t\t\t\t  </span>\r\n\t\t\t\t\t  <span class=\"input-group-addon\" @click=\"showSingleDate('sDate')\">\r\n\t\t\t\t\t  \t<i class='glyphicon glyphicon-calendar'></i>\r\n\t\t\t\t\t  </span>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<v-datetimepicker ref='sDate' format='yyyy-MM-dd' init-left='15px'></v-datetimepicker>\r\n\t\t    </div>\r\n\t\t    <label class=\"col-sm-2 control-label\">单独时间组件2</label>\r\n\t\t    <div class=\"col-sm-4 posr\">\r\n\t\t      <div class=\"input-group\">\r\n\t\t\t\t\t  <input type=\"text\" class=\"form-control\" @click=\"showSingleDate('eDate')\" v-model='eDate' readonly>\r\n\t\t\t\t\t  <span class=\"input-group-addon\" @click='eDate = \"\"'>\r\n\t\t\t\t\t  \t<i class='glyphicon glyphicon-remove'></i>\r\n\t\t\t\t\t  </span>\r\n\t\t\t\t\t  <span class=\"input-group-addon\" @click=\"showSingleDate('eDate')\">\r\n\t\t\t\t\t  \t<i class='glyphicon glyphicon-calendar'></i>\r\n\t\t\t\t\t  </span>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<v-datetimepicker ref='eDate' format='yyyy-MM-dd' init-left='15px'></v-datetimepicker>\r\n\t\t    </div>\r\n\t\t  </div>\r\n\t\t</form>\r\n\t</pre>\r\n\t<code>js:</code>\r\n\t<pre class='demo-code'>\r\n\t\tdata : {\r\n\t\t\tsDate : '',\r\n\t\t\teDate : ''\r\n\t\t},\r\n\t\tmethods : {\r\n\t\t\tshowDate : function(e,key){\r\n\t\t\t\tcomp.$refs.date.open(e.target,this,key);\r\n\t\t\t},\r\n\t\t\tshowSingleDate : function(key){\r\n\t\t\t\tthis.$refs[key].open(this,key);\r\n\t\t\t}\r\n\t\t}\r\n\t</pre>\r\n\t<code>结果:</code>\r\n\t<div class='container-fluid'>\r\n\t\t<form class=\"form-horizontal\">\r\n\t\t  <div class=\"form-group\">\r\n\t\t    <label class=\"col-sm-2 control-label\">共享时间组件1</label>\r\n\t\t    <div class=\"col-sm-4\">\r\n\t\t    \t<div class=\"input-group datetimepicker-container\">\r\n\t\t\t\t\t  <input type=\"text\" class=\"form-control\" @click=\"showDate($event,'sDate')\" v-model='sDate' readonly>\r\n\t\t\t\t\t  <span class=\"input-group-addon\" @click='sDate = \"\"'>\r\n\t\t\t\t\t  \t<i class='glyphicon glyphicon-remove'></i>\r\n\t\t\t\t\t  </span>\r\n\t\t\t\t\t  <span class=\"input-group-addon\" @click=\"showDate($event,'sDate')\">\r\n\t\t\t\t\t  \t<i class='glyphicon glyphicon-calendar'></i>\r\n\t\t\t\t\t  </span>\r\n\t\t\t\t\t</div>\r\n\t\t    </div>\r\n\t\t    <label class=\"col-sm-2 control-label\">共享时间组件2</label>\r\n\t\t    <div class=\"col-sm-4\">\r\n\t\t      <div class=\"input-group datetimepicker-container\">\r\n\t\t\t\t\t  <input type=\"text\" class=\"form-control\" @click=\"showDate($event,'eDate')\" v-model='eDate' readonly>\r\n\t\t\t\t\t  <span class=\"input-group-addon\" @click='eDate = \"\"'>\r\n\t\t\t\t\t  \t<i class='glyphicon glyphicon-remove'></i>\r\n\t\t\t\t\t  </span>\r\n\t\t\t\t\t  <span class=\"input-group-addon\" @click=\"showDate($event,'eDate')\">\r\n\t\t\t\t\t  \t<i class='glyphicon glyphicon-calendar'></i>\r\n\t\t\t\t\t  </span>\r\n\t\t\t\t\t</div>\r\n\t\t    </div>\r\n\t\t  </div>\r\n\t\t</form>\r\n\t\t<form class=\"form-horizontal\">\r\n\t\t  <div class=\"form-group\">\r\n\t\t    <label class=\"col-sm-2 control-label\">单独时间组件1</label>\r\n\t\t    <div class=\"col-sm-4 posr\">\r\n\t\t    \t<div class=\"input-group\">\r\n\t\t\t\t\t  <input type=\"text\" class=\"form-control\" @click=\"showSingleDate('sDate')\" v-model='sDate' readonly>\r\n\t\t\t\t\t  <span class=\"input-group-addon\" @click='sDate = \"\"'>\r\n\t\t\t\t\t  \t<i class='glyphicon glyphicon-remove'></i>\r\n\t\t\t\t\t  </span>\r\n\t\t\t\t\t  <span class=\"input-group-addon\" @click=\"showSingleDate('sDate')\">\r\n\t\t\t\t\t  \t<i class='glyphicon glyphicon-calendar'></i>\r\n\t\t\t\t\t  </span>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<v-datetimepicker ref='sDate' format='yyyy-MM-dd' init-left='15px'></v-datetimepicker>\r\n\t\t    </div>\r\n\t\t    <label class=\"col-sm-2 control-label\">单独时间组件2</label>\r\n\t\t    <div class=\"col-sm-4 posr\">\r\n\t\t      <div class=\"input-group\">\r\n\t\t\t\t\t  <input type=\"text\" class=\"form-control\" @click=\"showSingleDate('eDate')\" v-model='eDate' readonly>\r\n\t\t\t\t\t  <span class=\"input-group-addon\" @click='eDate = \"\"'>\r\n\t\t\t\t\t  \t<i class='glyphicon glyphicon-remove'></i>\r\n\t\t\t\t\t  </span>\r\n\t\t\t\t\t  <span class=\"input-group-addon\" @click=\"showSingleDate('eDate')\">\r\n\t\t\t\t\t  \t<i class='glyphicon glyphicon-calendar'></i>\r\n\t\t\t\t\t  </span>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<v-datetimepicker ref='eDate' format='yyyy-MM-dd' init-left='15px'></v-datetimepicker>\r\n\t\t    </div>\r\n\t\t  </div>\r\n\t\t</form>\r\n\t</div>\r\n\t<h2>props</h2>\r\n\t<v-table :columns=\"propColumns\" :pagination='false' :init-front-page-data=\"propData\"></v-table>\r\n\t<h2>methods</h2>\r\n\t<v-table :columns=\"methodsColumns\" :pagination='false' :init-front-page-data=\"methodsData\"></v-table>\r\n</div>";

/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

	var tpl = __webpack_require__(46);
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


/***/ }),

/***/ 46:
/***/ (function(module, exports) {

	module.exports = "<div id=\"demo-dialog\" class='demo'>\r\n\t<h2>初始化</h2>\r\n\t<code>html:</code>\r\n\t<pre class='demo-code' v-pre>\r\n\t\t<v-dialog ref='htmlDialog' title=\"htmlDialog\">\r\n\t    <h1>wefwefwef</h1><h1>wefwefwef</h1><h1>wefwefwef</h1><h1>wefwefwef</h1>\r\n\t    <p>\r\n\t    \t<button class='btn btn-primary' @click='$refs.insideDialog.open()'>打开新的dialog</button>\r\n\t    </p>\r\n\t  </v-dialog>\r\n\t  <v-dialog ref='insideDialog' title='嵌套dialog' :buttons=\"insideDialogBtns\">\r\n\t  \t<h1>这是一个嵌套的dialog</h1>\r\n\t\t</v-dialog>\r\n\t  <v-dialog ref='jsDialog' title='jsDialog' content='<h1>rr444rrr</h1><h2>regergrg</h2>' :buttons=\"buttons\"></v-dialog>\r\n\t</pre>\r\n\t<code>js:</code>\r\n\t<pre class='demo-code'>\r\n\t\tdata : {\r\n\t\t\tbuttons : [{text : 'ok',close : true}],\r\n\t\t\tinsideDialogBtns : [{\r\n\t\t\t\ttext : '取消',\r\n\t\t\t\tclose : true\r\n\t\t\t},{\r\n\t\t\t\ttext : '确定',\r\n\t\t\t\ttheme : 'primary',\r\n\t\t\t\thandler : function(){\r\n\t\t\t\t\talert(\"aaa\");\r\n\t\t\t\t\tthis.close();\r\n\t\t\t\t}\r\n\t\t\t}]\r\n\t\t},\r\n\t\tmethods : {\r\n\t\t\tshowHtmlDialog : function(){\r\n\t\t\t\tthis.$refs.htmlDialog.open();\r\n\t\t\t},\r\n\t\t\tshowJsDialog : function(){\r\n\t\t\t\tthis.$refs.jsDialog.open();\r\n\t\t\t}\r\n\t\t}\r\n\t</pre>\r\n\t<code>结果:</code>\r\n\t<v-dialog ref='htmlDialog' title=\"htmlDialog\">\r\n    <h1>wefwefwef</h1><h1>wefwefwef</h1><h1>wefwefwef</h1><h1>wefwefwef</h1>\r\n    <p>\r\n    \t<button class='btn btn-primary' @click='$refs.insideDialog.open()'>打开新的dialog</button>\r\n    </p>\r\n  </v-dialog>\r\n  <v-dialog ref='insideDialog' title='嵌套dialog' :buttons=\"insideDialogBtns\">\r\n  \t<h1>这是一个嵌套的dialog</h1>\r\n\t</v-dialog>\r\n  <v-dialog ref='jsDialog' title='jsDialog' content='<h1>rr444rrr</h1><h2>regergrg</h2>' :buttons=\"buttons\"></v-dialog>\r\n\t<button class='btn btn-default' @click=\"showHtmlDialog\">从html初始化的dialog</button>\r\n\t<button class='btn btn-default' @click=\"showJsDialog\">从js初始化的dialog</button>\r\n\t<h2>props</h2>\r\n\t<v-table :columns=\"propColumns\" :pagination='false' :init-front-page-data=\"propData\"></v-table>\r\n\t<h2>methods</h2>\r\n\t<v-table :columns=\"methodsColumns\" :pagination='false' :init-front-page-data=\"methodsData\"></v-table>\r\n</div>\r\n";

/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

	var tpl = __webpack_require__(48);
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


/***/ }),

/***/ 48:
/***/ (function(module, exports) {

	module.exports = "<div id=\"demo-loading\" class='demo'>\r\n\t<h2>初始化</h2>\r\n\t<code>html:</code>\r\n\t<pre class='demo-code' v-pre>\r\n\t\t<p>\r\n\t\t\t<button class='btn btn-default' @click=\"toggleLoading\">{{isShow ? '隐藏' : '显示'}}</button>\r\n\t\t</p>\r\n\t\t<div style='width:300px;height:300px;position:relative;border:1px solid #ccc'>\r\n\t\t\t<v-loading ref='loading'/>\r\n\t\t</div>\r\n\t</pre>\r\n\t<code>js:</code>\r\n\t<pre class='demo-code'>\r\n\t\tdata : {\r\n\t\t\tisShow : false\r\n\t\t},\r\n\t\tmethods : {\r\n\t\t\ttoggleLoading : function(){\r\n\t\t\t\tif(this.isShow){\r\n\t\t\t\t\tthis.$refs.loading.hide();\r\n\t\t\t\t}else{\r\n\t\t\t\t\tthis.$refs.loading.show();\r\n\t\t\t\t}\r\n\t\t\t\tthis.isShow = !this.isShow;\r\n\t\t\t}\r\n\t\t}\r\n\t</pre>\r\n\t<code>结果:</code>\r\n\t<p>\r\n\t\t<button class='btn btn-default' @click=\"toggleLoading\">{{isShow ? '隐藏' : '显示'}}</button>\r\n\t</p>\r\n\t<div style='height:100px;position:relative;border:1px solid #ccc'>\r\n\t\t<v-loading ref='loading'/>\r\n\t</div>\r\n</div>";

/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

	var tpl = __webpack_require__(50);
	module.exports = {
		html : tpl,
		init : function() {
			new Vue({
				el : "#demo-overview",
				data : {

				},
				methods : {
					
				}
			});
		}
	};


/***/ }),

/***/ 50:
/***/ (function(module, exports) {

	module.exports = "<div id=\"demo-overview\" class='demo'>\r\n\t<h2>VueBootstrap</h2>\r\n\t<ul>\r\n\t\t<li>\r\n\t\t\t基于vue2.3.3和Bootstrap3\r\n\t\t</li>\r\n\t\t<li>\r\n\t\t\t内置基于reqwest.js的ajax模块\r\n\t\t</li>\r\n\t\t<li>\r\n\t\t\t使用webpack构建\r\n\t\t</li>\r\n\t</ul>\r\n</div>";

/***/ }),

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

	var tpl = __webpack_require__(52);
	module.exports = {
		html : tpl,
		init : function() {
			new Vue({
				el : "#demo-table",
				data : {
					columns : [{
						title : "a1",field : "a1"
					},{
						title : "a2",field : "a2"
					},{
						title : "a3",field : "a3"
					},{
						title : "oper",field : "oper",formatter : function(v,r,i){
							return "<button class='btn btn-primary' data-method='add' data-field='a4'>添加</button>" + 
							"<button class='btn btn-primary' data-method='edit' data-field='a4'>编辑</button>";
						}
					}],
					pageSizeArr : [5,10,20],
					pageSize : 5,
					frontPageData : (function(){
						var re = [{
							a1 : "children属性演示",
							a2 : "--",
							a3 : '--',
							children_title : 'children列表',
							children : [{
								a1 : 'ch1',a2 : 'ch1',a3 : 'ch1'
							},{
								a1 : 'ch2',a2 : 'ch2',a3 : 'ch2'
							}]
						}];
						for(var i=0;i<100;i++){
							re.push({
								a1 : i,
								a2 : parseInt(Math.random() * 10000),
								a3 : parseInt(Math.random() * 100)
							});
						}
						return re;
					})(),
					propColumns : app.attrColumns,
					propData : [{
						name : 'method',type : 'String',defaultVal : "GET",desc : 'ajax请求数据方式,暂时只支持get和post'
					},{
						name : 'queryParams',type : 'Object',defaultVal : "{}",desc : 'ajax请求参数对象'
					},{
						name : 'title',type : 'String',defaultVal : "''",desc : '表格标题'
					},{
						name : 'striped',type : 'Boolean',defaultVal : "true",desc : '是否隔行显示不同颜色'
					},{
						name : 'border',type : 'Boolean',defaultVal : "true",desc : '是否带边框'
					},{
						name : 'initUrl',type : 'String',defaultVal : "''",desc : 'ajax请求数据链接;当定义了该属性后，表格初始化后自动发送请求获取数据'
					},{
						name : 'totalKey',type : 'String',defaultVal : "totalElements",desc : 'ajax请求返回数据总数目的key值'
					},{
						name : 'rowsKey',type : 'String',defaultVal : "content",desc : 'ajax请求返回当前页数据的key值'
					},{
						name : 'columns',type : 'Array',defaultVal : "[]",desc : '表格列数组',
						children_title : '列对象说明',
						children : [{
							name : 'title',type : 'String',defaultVal : "''",desc : '列标题'
						},{
							name : 'title',type : 'String',defaultVal : "''",desc : '字段名'
						},{
							name : 'formatter',type : 'String|Function',defaultVal : "空函数",desc : '字段值格式化函数'
						},{
							name : 'width',type : 'Number',defaultVal : "null",desc : '列宽度'
						},{
							name : 'sort',type : 'Boolean',defaultVal : "false",desc : '是否排序字段(开发中)'
						},{
							name : 'checkbox',type : 'Boolean',defaultVal : "false",desc : '是否复选框字段'
						},{
							name : 'sortOrder',type : 'String',defaultVal : "''",desc : '排序order(开发中)'
						},{
							name : 'style',type : 'Object',defaultVal : "{}",desc : '单元格div上的style'
						}]
					},{
						name : 'initFrontPageData',type : 'Array',defaultVal : "[]",desc : '若initUrl为空，则取该数据作为表格数据'
					},{
						name : 'initSingleSelect',type : 'Boolean',defaultVal : "true",desc : '是否只能同时选择一行'
					},{
						name : 'pagination',type : 'Boolean',defaultVal : "true",desc : '是否显示分页组件'
					},{
						name : 'initPageSize',type : 'Number',defaultVal : "20",desc : '默认每页显示多少条记录'
					},{
						name : 'pageSizeArr',type : 'Array',defaultVal : "[20,40,60,80,100]",desc : '可供选择的每页总记录数数组'
					},{
						name : 'nowrap',type : 'Boolean',defaultVal : "false",desc : '表格内容是否不换行'
					},{
						name : 'showColumnTitle',type : 'Boolean',defaultVal : "true",desc : '鼠标悬留在单元格上时是否显示提示'
					},{
						name : 'loadFilter',type : 'Function(resp)',defaultVal : "null",desc : '对ajax请求返回数据加工处理的函数，必须返回包含rowsKey和totalKey的键值对象'
					},{
						name : 'pageNoKey',type : 'String',defaultVal : "page",desc : 'ajax请求参数当前页码的key值'
					},{
						name : 'pageSizeKey',type : 'String',defaultVal : "size",desc : 'ajax请求参数每页记录数的key值'
					},{
						name : 'onLoadSuccess',type : 'Function(resp:返回数据)',defaultVal : "空函数",desc : 'ajax请求成功回调'
					},{
						name : 'onLoadError',type : 'Function(resp:错误对象)',defaultVal : "空函数",desc : 'ajax请求失败回调'
					},{
						name : 'onSelect',type : 'Function(row:行对象)',defaultVal : "空函数",desc : 'ajax请求成功回调'
					},{
						name : 'onClickTdBtn',type : 'Function(method,v,r,i)',defaultVal : "空函数",desc : '点击单元格按钮时触发'
					}],
					methodsColumns : app.methodsColumns,
					methodsData : [{
						name : 'reload',params : 'none',returnVal : 'none',desc : '重新加载当前页数据'
					},{
						name : 'load',params : 'page:页码,缺省为第一页',returnVal : 'none',desc : '加载指定页数据'
					},{
						name : 'getRow',params : 'rowIndex',returnVal : '行对象',desc : '获取指定行数据'
					},{
						name : 'getSelected',params : 'none',returnVal : '行对象',desc : '获取所选行对象'
					},{
						name : 'getSelections',params : 'none',returnVal : '行对象数组',desc : '获取所选的行对象组成的数组'
					},{
						name : 'loadFrontPageData',params : 'data',returnVal : 'none',desc : '加载前台分页数据'
					}],
					data : [{
						name : 'rows',type : 'Array',defaultVal : '[]',desc : '行对象数组',
						children_title : '行对象内部属性说明',
						children : [{
							name : 'children',type : 'Array',defaultVal : 'undefined',desc : '嵌套表格的行数据'
						},{
							name : 'children_title',type : 'String',defaultVal : "''",desc : '嵌套表格的标题'
						}]
					}]
				},
				methods : {
					onClickTdBtn : function(method,v,r,i){
						console.log(method,v,r,i);
					}
				}
			});
		}
	};


/***/ }),

/***/ 52:
/***/ (function(module, exports) {

	module.exports = "<div id=\"demo-table\" class='demo'>\r\n\t<h2>初始化</h2>\r\n\t<code>html:</code>\r\n\t<pre class='demo-code' v-pre>\r\n\t\t<v-table ref='table' :columns=\"columns\" title=\"test\" :init-front-page-data='frontPageData' :on-click-td-btn='onClickTdBtn'></v-table>\r\n\t</pre>\r\n\t<code>js:</code>\r\n\t<pre class='demo-code'>\r\n\t\tdata : {\r\n\t\t\tcolumns : [{\r\n\t\t\t\ttitle : \"a1\",field : \"a1\"\r\n\t\t\t},{\r\n\t\t\t\ttitle : \"a2\",field : \"a2\"\r\n\t\t\t},{\r\n\t\t\t\ttitle : \"a3\",field : \"a3\"\r\n\t\t\t},{\r\n\t\t\t\ttitle : \"oper\",field : \"oper\",formatter : function(v,r,i){\r\n\t\t\t\t\treturn \"<button class='btn btn-primary' data-method='add' data-field='a4'>添加</button>\" + \r\n\t\t\t\t\t\"<button class='btn btn-primary' data-method='edit' data-field='a4'>编辑</button>\";\r\n\t\t\t\t}\r\n\t\t\t}],\r\n\t\t\tpageSizeArr : [5,10,20],\r\n\t\t\tpageSize : 5,\r\n\t\t\tfrontPageData : (function(){\r\n\t\t\t\tvar re = [{\r\n\t\t\t\t\ta1 : \"children属性演示\",\r\n\t\t\t\t\ta2 : \"--\",\r\n\t\t\t\t\ta3 : '--',\r\n\t\t\t\t\tchildren_title : 'children列表',\r\n\t\t\t\t\tchildren : [{\r\n\t\t\t\t\t\ta1 : 'ch1',a2 : 'ch1',a3 : 'ch1'\r\n\t\t\t\t\t},{\r\n\t\t\t\t\t\ta1 : 'ch2',a2 : 'ch2',a3 : 'ch2'\r\n\t\t\t\t\t}]\r\n\t\t\t\t}];\r\n\t\t\t\tfor(var i=0;i<100;i++){\r\n\t\t\t\t\tre.push({\r\n\t\t\t\t\t\ta1 : i,\r\n\t\t\t\t\t\ta2 : parseInt(Math.random() * 10000),\r\n\t\t\t\t\t\ta3 : parseInt(Math.random() * 100)\r\n\t\t\t\t\t});\r\n\t\t\t\t}\r\n\t\t\t\treturn re;\r\n\t\t\t})()\r\n\t\t},\r\n\t\tmethods : {\r\n\t\t\tonClickTdBtn : function(method,v,r,i){\r\n\t\t\t\tconsole.log(method,v,r,i);\r\n\t\t\t}\r\n\t\t}\r\n\t</pre>\r\n\t<code>结果:</code>\r\n\t<v-table ref='table' :columns=\"columns\" title=\"test\" :init-front-page-data='frontPageData' :on-click-td-btn='onClickTdBtn' :page-size-arr=\"[5,10,50]\" :init-page-size='5'></v-table>\r\n\t<h2>props</h2>\r\n\t<v-table :columns=\"propColumns\" :pagination='false' :init-front-page-data=\"propData\"></v-table>\r\n\t<h2>methods</h2>\r\n\t<v-table :columns=\"methodsColumns\" :pagination='false' :init-front-page-data=\"methodsData\"></v-table>\r\n\t<h2>data</h2>\r\n\t<v-table :columns=\"propColumns\" :pagination='false' :init-front-page-data=\"data\"></v-table>\r\n</div>";

/***/ })

});