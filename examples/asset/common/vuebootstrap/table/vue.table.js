var tpl = require("./vue.table.html");
require("./vue.table.css");
var defaultColumnObj = {
	//column基本属性
	//字段名
	field : "",
	//格式化函数
	formatter : Vue.me.noop,
	//标题
	title : "",
	//列宽度
	width : null,
	//排序
	sort : false,
	checkbox : false,
	sortOrder : '',
	style : {}
};
function initColumns(columns){
	for(var j=0,column;column=columns[j++];){
		for(var i in defaultColumnObj){
			if(column[i] === undefined){
				Vue.set(column,i,defaultColumnObj[j]);
			}else{
				if(i === 'formatter'){
					if(column.formatter === 'datetime'){
						column.formatter = function(v){
							return Vue.filter('date')(v);
						};
					}else if(column.formatter === 'date'){
						column.formatter = function(v){
							return Vue.filter('date')(v,"yyyy-MM-dd");
						};
					}
				}
			}
		}
	}
}
//初始化每一行数据
function initRowsData(data){
	var obj = {
		_selected : false,
		_parent : false
	};
	for(var i=0,ii;ii=data[i++];){
		Vue.me.setObjDefaultAttrs(ii,obj);
	}
	for(i=data.length-1;i>=0;i--){
		var item = data[i];
		if(item.children && item.children.length > 0){
			item._parent = true;
			data.splice(i + 1,0,{
				children : item.children,
				title : item.children_title,
				_show : false
			});
			for(var j in item){
				if(/^children/.test(j)){
					delete item[j];
				}
			}
		}
	}
}
function setEmptyData(opts){
	opts.rows = [];
	opts.total = 0;
}
function getSelect(vmodel,isFirst){
	var data = vmodel.rows;
	var re = [];
	for(var i=0,ii;ii=data[i++];){
		if(ii._selected){
			if(isFirst){
				return ii;
			}
			re.push(ii);
		}
	}
	return isFirst ? null : re;
}
function loadDataByPage(vmodel,page,func){
	if(!vmodel.url){
		dealFrontPageData(vmodel,page,func);
	}else{
		ajaxLoad(vmodel,page);
	}
}
function dealFrontPageData(vmodel,page,func){
	if(!vmodel.frontPageData){
		throw new Error("若不定义url，则请将数据源赋值给frontPageData属性");
	}
	vmodel.curPage = vmodel.changeCurPage = page;
	updatePagination(vmodel);
	var start = (page - 1) * vmodel.pageSize;
	var total = vmodel.total;
	if(start >= total){
		start = (vmodel.sumPage - 1) * vmodel.pageSize;
	}
	var end = start + vmodel.pageSize;
	var re = [];
	for(;start < end;start++){
		var item = vmodel.frontPageData[start];
		if(!item) break;
		re.push(item);
	}
	vmodel.rows = re;
	func && func();
}
function ajaxLoad(vmodel,page,obj){
	var param = {};
	param[vmodel.pageNoKey] = page;
	param[vmodel.pageSizeKey] = vmodel.pageSize;
	Vue.me.mix(param,obj);
	Vue.me.mix(vmodel.queryParams,param);
	vmodel.queryParams[vmodel.pageNoKey]--;
	Vue[vmodel.method.toUpperCase() === 'GET' ? 'ajaxGet' : 'ajaxPost'](vmodel.url,vmodel.queryParams,function(err,resp){
		if(err){
			vmodel.rows = [];
			vmodel.total = 0;
			vmodel.changeCurPage = vmodel.curPage = 1;
			updatePagination(vmodel);
			vmodel.onLoadError(err);
		}else{
			if(vmodel.loadFilter){
				resp = vmodel.loadFilter.call(vmodel,resp);
			}
			vmodel.onLoadSuccess(resp);
			if(!resp){
				setEmptyData(vmodel);
				return;
			}
			var rowsData = resp[vmodel.rowsKey];
			initRowsData(rowsData);
			vmodel.rows = rowsData;
			vmodel.total = resp[vmodel.totalKey];
			vmodel.changeCurPage = vmodel.curPage = page;
			updatePagination(vmodel);
		}
	});
}
//更新分页信息
function updatePagination(vmodel){
	var total = vmodel.total;
	if(total === 0){
		var keys = ['sumPage','total','curPage','start','end'];
		for(var i=0,ii;ii=keys[i++];){
			vmodel[ii] = 0;
		}
	}else{
		vmodel.sumPage = parseInt(total / vmodel.pageSize,10) + (total % vmodel.pageSize > 0 ? 1 : 0);
		if(vmodel.curPage === 0){
			vmodel.changeCurPage = vmodel.curPage = 1;
		}else if(vmodel.curPage > vmodel.sumPage){
			vmodel.changeCurPage = vmodel.curPage = vmodel.sumPage;
		}
		vmodel.start = 1 + vmodel.pageSize * (vmodel.curPage - 1);
		if(vmodel.start + vmodel.pageSize > total){
			vmodel.end = total;
		}else{
			vmodel.end = vmodel.start + vmodel.pageSize - 1;
		}
	}
}

Vue.component('v-table', {
	template : tpl,
	$lastSelect : null,
	props : {
		method : {type : String,default : 'GET'},
		queryParams : {type : Object,default : function(){return {};}},
		title : {type : String,default : ''},
		striped : {type : Boolean,default : true},
		border : {type : Boolean,default : true},
		initUrl : {type : String,default : ''},
		totalKey : {type : String,default : 'totalElements'},
		rowsKey : {type : String,default : 'content'},
		columns : {type : Array,default : function(){return [];}},
		initFrontPageData : {type : Array,default : function(){return [];}},
		initSingleSelect : {type : Boolean,default : true},
		pagination : {type : Boolean,default : true},
		initPageSize : {type : Number,default : 20},
		pageSizeArr : {type : Array,default : function(){return [20,40,60,80,100];}},
		nowrap : {type : Boolean,default : false},
		showColumnTitle : {type : Boolean,default : true},
		loadFilter : {type : Function,default : null},
		pageNoKey : {type : String,default : 'page'},
		pageSizeKey : {type : String,default : 'size'},
		onLoadSuccess : {type : Function,default : function(){}},
		onLoadError : {type : Function,default : function(){}},
		onSelect : {type : Function,default : function(){}},
		onClickTdBtn : {type : Function,default : function(){}}
	},
	data : function(){
		return {
			url : this.initUrl,
			singleSelect : true,
			sumPage : 0,
			curPage : 0,
			changeCurPage : 1,
			start : 0,
			end : 0,
			pageSize : this.initPageSize,
			frontPageData : this.initFrontPageData,
			rows : [],
			total : 0
		}
	},
	methods : {
		clickTd : function(item,e,index,colIndex){
			if(colIndex === 0 && item._parent){
				var nextRow = this.rows[index + 1];
				nextRow._show = !nextRow._show;
			}
			var me = this;
			var target = e.target;
			Vue.me.findParentByCls(target,function(el){
				var method = el.getAttribute("data-method");
				var field = el.getAttribute("data-field");
				if(method){
					me.onClickTdBtn(method,item[field],item,index);
					return true;
				}
			});
		},
		toThePage : function(){
			loadDataByPage(this,this.changeCurPage || 1);
		},
		sort : function(item){
			if(item.sort){
				if(item.sortOrder === 'bottom'){
					item.sortOrder = 'top';
				}else{
					item.sortOrder = 'bottom';
				}
			}
		},
		toggleSelect : function(item,e,index){
			var target = e.target;
			//findParentByCls
			var me = this;
			var el = Vue.me.findParentByCls(target,'vue-table-checkbox');
			if(el){
				if(item._selected){
					this.onSelect(item);
				}
				return;
			}
			if(this.singleSelect){
				if(item._selected){
					item._selected = false;
					this.$options.$lastSelect = null;
				}else{
					if(this.$options.$lastSelect){
						this.$options.$lastSelect._selected = false;
					}
					item._selected = true;
					this.$options.$lastSelect = item;
					this.onSelect(item);
				}
			}else{
				item._selected = !item._selected;
				if(item._selected){
					this.onSelect(item);
				}
			}
		},
		dealValue : function(item,el,rowIndex){
			var value = item[el.field];
			if(el.formatter && el.formatter !== Vue.me.noop){
				return el.formatter(value,item,rowIndex);
			}
			if(value === null || value === undefined){
				return "";
			}
			return value;
		},
		hoverTh : function(e,action){
			e.target.classList[action]("vue-table-th-hover");
		},
		hoverRow : function(e,action){
			e.target.classList[action]("vue-table-tr-hover");
		},
		toPage : function(e,p){
			if(e.currentTarget.disabled) return;
			if(typeof p == 'number'){
				var page = this.curPage + p;
			}else if(p == 'first'){
				page = 1;
			}else if(p == 'last'){
				page = this.sumPage;
			}
			loadDataByPage(this,page);
		},
		//******************方法
		reload : function(){
			loadDataByPage(this,this.curPage);
		},
		load : function(page){
			loadDataByPage(this,page || 1);
		},
		getRow : function(index){
			return this.rows[index];
		},
		getSelected : function(){
			var rows = this.rows;
			for(var i=0,ii;ii=rows[i++];){
				if(ii._selected){
					return ii;
				}
			}
			return null;
		},
		getSelections : function(){
			var re = [];
			for(var i=0,ii;ii=rows[i++];){
				if(ii._selected){
					re.push(ii);
				}
			}
			return re;
		},
		loadFrontPageData : function(data){
			if(this.url){
				throw new Error('table已定义url不能再加载前台分页数据');
				return;
			}
			this.frontPageData = data;
			this.total = data.length;
			initRowsData(data);
			dealFrontPageData(this,1);
		}
	},
	watch : {
		pageSize : function(){
			loadDataByPage(this,1);
		}
	},
	beforeCreate : function(){
		var propsData = this.$options.propsData;
		var columns = propsData.columns;
    if(columns && columns.length > 0){
      initColumns(columns);
    }
    if(!propsData.url){
    	var data = propsData.initFrontPageData;
    	data && initRowsData(data);
    }
	},
	created : function(){
    if(!this.url){
    	this.total = this.frontPageData.length;
			dealFrontPageData(this,1);
    }
    for(var j=0,column;column=this.columns[j++];){
    	if(column.checkbox){
    		this.singleSelect = false;
    		break;
    	}
    }
  },
  mounted : function(){
  	if(this.url){
  		loadDataByPage(this,1);
  	}
  }
});