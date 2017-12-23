var tpl = require("./overview.html");
module.exports = {
	html : tpl,
	init : function() {
		new Vue({
			el : "#demo-overview",
			data : {
				nodeList : [{
					text : 'vuebootstrap',
					state : 'open',
					children : [{
						text : '各种组件文件夹...',
						state : 'open',
						children : [{
							iconCls : 'glyphicon-minus',
							text : '每个组件含三部分css(可选)html(可选)js(必须),文件名以vue.{componentname}命名'
						}]
					},{
						text : 'ajax.js',
						state : 'open',
						children : [{
							iconCls : 'glyphicon-minus',
							text : '提供基于reqwest的ajax模块'
						}]
					},{
						text : 'base.js',
						state : 'open',
						children : [{
							iconCls : 'glyphicon-minus',
							text : 'ui基础库'
						}]
					},{
						text : 'reqwest.js',
						state : 'open',
						children : [{
							iconCls : 'glyphicon-minus',
							text : 'reqwest库'
						}]
					},{
						text : 'vuebootstrap.js',
						state : 'open',
						children : [{
							iconCls : 'glyphicon-minus',
							text : 'vuebootstrap的入口，聚合引入上述的基础库、各种组件、ajax模块'
						}]
					}]
				}]
			},
			methods : {
				
			}
		});
	}
};
