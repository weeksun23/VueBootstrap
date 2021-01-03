export default{
	getColumnsMixin(){
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
								re.push("<p>"+ii+"</p>");
							}
							return re.join("");
						}},
						{field : 'returnVal',title : '返回值'},
						{field : 'desc',title : '说明'}
					]
				}
			}
		}
	}
}
