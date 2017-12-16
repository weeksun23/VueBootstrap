var tpl = require("./datetimepicker.html");
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
