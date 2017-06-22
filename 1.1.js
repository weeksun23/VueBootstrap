webpackJsonp([1],{

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

	var map = {
		"./accordion/accordion": 26,
		"./accordion/accordion.html": 27,
		"./accordion/accordion.js": 26,
		"./dialog/dialog": 28,
		"./dialog/dialog.html": 29,
		"./dialog/dialog.js": 28,
		"./overview/overview": 30,
		"./overview/overview.html": 31,
		"./overview/overview.js": 30
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
	webpackContext.id = 25;


/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

	var tpl = __webpack_require__(27);
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


/***/ }),

/***/ 27:
/***/ (function(module, exports) {

	module.exports = "<div id=\"demo-accordion\" class='demo'>\r\n\t<h2>初始化</h2>\r\n\t<h3>从initData属性初始化</h3>\r\n\t<code>html:</code>\r\n\t<pre class='demo-code' v-pre>\r\n\t\t<vaccordion :init-data=\"initData\"></vaccordion>\r\n\t</pre>\r\n\t<code>js:</code>\r\n\t<pre class='demo-code' v-pre>\r\n\t\tdata : {\r\n\t    initData : [{\r\n\t      title : \"a1\",\r\n\t      children : [{\r\n\t        title : \"a1-1\"\r\n\t      },{\r\n\t        title : \"a1-2\",\r\n\t        iconCls : \"glyphicon-text-height\"\r\n\t      }]\r\n\t    },{\r\n\t      title : \"a2\",\r\n\t      children : [{\r\n\t        title : \"a2-1\",iconCls : \"glyphicon-text-height\"\r\n\t      },{\r\n\t        title : \"a2-2\"\r\n\t      }]\r\n\t    },{\r\n\t      title : \"content\",\r\n\t      content : \"<h1>testtest</h1>\"\r\n\t    }]\r\n\t  }\r\n\t</pre>\r\n\t<code>结果:</code>\r\n\t<vaccordion :init-data=\"initData\"></vaccordion>\r\n\t<h3>从html初始化</h3>\r\n\t<code>html:</code>\r\n\t<pre class='demo-code' v-pre>\r\n\t\t<vaccordion>\r\n\t    <div title='a1'><h2>testetst</h2></div>\r\n\t    <div title='a2'><h2>f3f323e32e</h2><p>wfewwef</p><h3>fewg34h3</h3></div>\r\n\t    <div title='a3'><h2>dfherhe</h2></div>\r\n\t  </vaccordion>\r\n\t</pre>\r\n\t<code>结果:</code>\r\n\t<vaccordion>\r\n\t\t<div title='a1'><h2>testetst</h2></div>\r\n    <div title='a2'><h2>f3f323e32e</h2><p>wfewwef</p><h3>fewg34h3</h3></div>\r\n    <div title='a3'><h2>dfherhe</h2></div>\r\n\t</vaccordion>\r\n\t<!-- \r\n\t<h2>配置项说明</h2>\r\n\t<xmp :widget=\"@$attr\"></xmp>\r\n\t<xmp :widget=\"@$attr_data\"></xmp>\r\n\t<xmp :widget=\"@$attr_data_children\"></xmp> -->\r\n\t<!-- <hr> -->\r\n\t<!-- <xmp :widget=\"@$method\"></xmp> -->\r\n</div>\r\n";

/***/ }),

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

	var tpl = __webpack_require__(29);
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


/***/ }),

/***/ 29:
/***/ (function(module, exports) {

	module.exports = "<div id=\"demo-dialog\" class='demo'>\r\n\t<h2>初始化</h2>\r\n\t<code>html:</code>\r\n\t<pre class='demo-code' v-pre>\r\n\t\t<vdialog ref='htmlDialog' title=\"htmlDialog\">\r\n\t    <h1>wefwefwef</h1><h1>wefwefwef</h1><h1>wefwefwef</h1><h1>wefwefwef</h1>\r\n\t  </vdialog>\r\n\t  <vdialog ref='jsDialog' title='jsDialog' content='<h1>rr444rrr</h1><h2>regergrg</h2>' :buttons=\"buttons\"></vdialog>\r\n\t</pre>\r\n\t<code>js:</code>\r\n\t<pre class='demo-code'>\r\n\t\tdata : {\r\n\t\t\tbuttons : [{text : 'ok',close : true}]\r\n\t\t},\r\n\t\tmethods : {\r\n\t\t\tshowHtmlDialog : function(){\r\n\t\t\t\tthis.$refs.htmlDialog.open();\r\n\t\t\t},\r\n\t\t\tshowJsDialog : function(){\r\n\t\t\t\tthis.$refs.jsDialog.open();\r\n\t\t\t}\r\n\t\t}\r\n\t</pre>\r\n\t<code>结果:</code>\r\n\t<vdialog ref='htmlDialog' title=\"htmlDialog\">\r\n    <h1>wefwefwef</h1><h1>wefwefwef</h1><h1>wefwefwef</h1><h1>wefwefwef</h1>\r\n  </vdialog>\r\n  <vdialog ref='jsDialog' title='jsDialog' content='<h1>rr444rrr</h1><h2>regergrg</h2>' :buttons=\"buttons\"></vdialog>\r\n\t<button class='btn btn-default' @click=\"showHtmlDialog\">从html初始化的dialog</button>\r\n\t<button class='btn btn-default' @click=\"showJsDialog\">从js初始化的dialog</button>\r\n\t<!-- <xmp ms-widget='@$htmlconfig'>\r\n    <h1>wefwefwef</h1><h1>wefwefwef</h1><h1>wefwefwef</h1><h1>wefwefwef</h1>\r\n  </xmp>\r\n  <xmp ms-widget='@$jsconfig'></xmp>\r\n  <h2>配置项说明</h2>\r\n  <xmp :widget=\"@$attr\"></xmp>\r\n  <xmp :widget=\"@$attr_buttons\"></xmp>\r\n  <hr>\r\n  <xmp :widget=\"@$method\"></xmp>\r\n  <hr>\r\n  <xmp :widget=\"@$eve\"></xmp> -->\r\n</div>\r\n";

/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

	var tpl = __webpack_require__(31);
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

/***/ 31:
/***/ (function(module, exports) {

	module.exports = "<div id=\"demo-overview\" class='demo'>\r\n\t<h2>VueBootstrap</h2>\r\n\t<ul>\r\n\t\t<li>\r\n\t\t\t基于vue2.3.3和Bootstrap3\r\n\t\t</li>\r\n\t\t<li>\r\n\t\t\t内置基于reqwest.js的ajax模块\r\n\t\t</li>\r\n\t\t<li>\r\n\t\t\t使用webpack构建\r\n\t\t</li>\r\n\t</ul>\r\n</div>";

/***/ })

});