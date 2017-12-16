var tpl = require("./table.html");
module.exports = {
	html : tpl,
	init : function() {
		new Vue({
			el : "#demo-table",
			data : {
				columns : [{
					title : "a1",field : "a1"
				},{
					title : "a2",field : "a2",style : {'word-break':'break-word'}
				},{
					title : "a3",field : "a3"
				},{
					title : "a4",field : "a4",formatter : function(v,r,i){
						return "<button class='btn btn-primary' data-method='add' data-field='a4'>添加</button>" + 
						"<button class='btn btn-primary' data-method='edit' data-field='a4'>编辑</button>";
					}
				}],
				pageSizeArr : [5,10,20],
				pageSize : 5,
				frontPageData : [{
					a1 : "QWe12r12r",a2 : 'qweqweqewqeqweqweqewqeqweqweqewqeqweqweqewqeqweqweqewqeqweqweqewqeqweqweqewqeqweqweqewqeqweqweqewqe',a3 : 'h54hrthrth',a4 : 'g43t3'
				},{
					a1 : '364345',a2 : 'weg34y3y',a3 : 'h54hrthrth',a4 : 'jyj56u65'
				},{
					a1 : "QWe12r12r",a2 : 'weg34y3y',a3 : 'h54hrthrth',a4 : 'g43t3'
				},{
					a1 : "QWe12r12r",a2 : 'weg34y3y',a3 : 'h54hrthrth',a4 : 'g43t3'
				},{
					a1 : "QWe12r12r",a2 : 'weg34y3y',a3 : 'h54hrthrth',a4 : 'g43t3'
				},{
					a1 : "QWe12r12r",a2 : 'weg34y3y',a3 : 'h54hrthrth',a4 : 'g43t3'
				},{
					a1 : "QWe12r12r",a2 : 'weg34y3y',a3 : 'h54hrthrth',a4 : 'g43t3'
				},{
					a1 : "QWe12r12r",a2 : 'weg34y3y',a3 : 'h54hrthrth',a4 : 'g43t3'
				},{
					a1 : "QWe12r12r",a2 : 'weg34y3y',a3 : 'h54hrthrth',a4 : 'g43t3'
				},{
					a1 : "QWe12r12r",a2 : 'weg34y3y',a3 : 'h54hrthrth',a4 : 'g43t3'
				},{
					a1 : "QWe12r12r",a2 : 'weg34y3y',a3 : 'h54hrthrth',a4 : 'g43t3'
				},{
					a1 : "QWe12r12r",a2 : 'weg34y3y',a3 : 'h54hrthrth',a4 : 'g43t3'
				},{
					a1 : "QWe12r12r",a2 : 'weg34y3y',a3 : 'h54hrthrth',a4 : 'g43t3'
				},{
					a1 : "QWe12r12r",a2 : 'weg34y3y',a3 : 'h54hrthrth',a4 : 'g43t3'
				},{
					a1 : "QWe12r12r",a2 : 'weg34y3y',a3 : 'h54hrthrth',a4 : 'g43t3'
				},{
					a1 : "QWe12r12r",a2 : 'weg34y3y',a3 : 'h54hrthrth',a4 : 'g43t3'
				},{
					a1 : "QWe12r12r",a2 : 'weg34y3y',a3 : 'h54hrthrth',a4 : 'g43t3'
				},{
					a1 : "QWe12r12r",a2 : 'weg34y3y',a3 : 'h54hrthrth',a4 : 'g43t3'
				},{
					a1 : "QWe12r12r",a2 : 'weg34y3y',a3 : 'h54hrthrth',a4 : 'g43t3'
				},{
					a1 : "QWe12r12r",a2 : 'weg34y3y',a3 : 'h54hrthrth',a4 : 'g43t3'
				},{
					a1 : "QWe12r12r",a2 : 'weg34y3y',a3 : 'h54hrthrth',a4 : 'g43t3'
				}]
			},
			methods : {
				addColumn : function(){
					this.columns.push({
						title : "add",field :"add"
					});
				},
				onClickTdBtn : function(method,v,r,i){
					console.log(method,v,r,i);
				},
				removeColumn : function(){
					this.columns.pop();
				}
			}
		});
	}
};
