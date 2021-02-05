function getColumnsMixin(){
	return {
		data(){
			return {
				propColumns : [
					{field : 'name',title : '名称'},
					{field : 'type',title : '类型'},
					{field : 'defaultVal',title : '默认值'},
					{field : 'desc',title : '说明'}
				],
				methodsColumns : [
					{field : 'name',title : '名称'},
					{field : 'params',title : '参数',formatter : function(v,r){
						var arr = v.split("|");
						var re = [];
						for(var i=0,ii;ii=arr[i++];){
							re.push("<div>"+ii+"</pidv>");
						}
						return re.join("");
					}},
					{field : 'returnVal',title : '返回值'},
					{field : 'desc',title : '说明'}
				]
			}
		}
	};
}
export default{
	getDemoOptions(data,templates,extraHtml){
		templates = templates.split("SPLIT");
		const demoHtmlTemplate = [];
		const mixins = [getColumnsMixin()];
		data.forEach((item,i) => {
			item.htmlCode = templates[i];
			mixins.push(item.jsCode());
			item.jsCode = item.jsCode.toString();
			demoHtmlTemplate.push(`<demo :title='data[${i}].title' :html-code="data[${i}].htmlCode" :js-code="data[${i}].jsCode">${templates[i]}</demo>`);
		});
		return {
			template : `<div class='doc'>
				${demoHtmlTemplate.join("")}
				${extraHtml || ''}
			</div>`,
			mixins
		}
	}
}
