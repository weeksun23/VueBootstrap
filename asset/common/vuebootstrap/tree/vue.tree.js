require("./vue.tree.css");
var tpl = require("./vue.tree.html");
var props = {
	nodeList : {type : Array,default : function(){return [];}},
	//节点是否带图标
	icon : {type : Boolean,default : true},
	//节点是否带checkbox
	checkbox : {type : Boolean,default : false},
	//是否级联检查
	cascadeCheck : {type : Boolean,default : true},
	//
	loadFilter : {type : Function,default : function(resp){
		return Vue.component('v-tree').loadFilter(resp);
	}},
	//异步获取数据的url
	initUrl : {type : String,default : ''},
	method : {type : String,default : 'GET'},
	queryParams : {type : Object,default : function(){return {};}},
	isRoot : {type : Boolean,default : true},
	//事件
	// onContextMenu : {type : Function,default : Vue.me.noop},
	onBeforeSelect : {type : Function,default : Vue.me.noop},
	onSelect : {type : Function,default : Vue.me.noop},
	onBeforeExpand : {type : Function,default : Vue.me.noop},
	onExpand : {type : Function,default : Vue.me.noop},
	onBeforeCollapse : {type : Function,default : Vue.me.noop},
	onCollapse : {type : Function,default : Vue.me.noop},
	onBeforeLoad : {type : Function,default : Vue.me.noop},
	onLoadSuccess : {type : Function,default : Vue.me.noop},
	onLoadError : {type : Function,default : Vue.me.noop}
};
tpl = (function(){
	function change(str){
		var re = [];
		for(var i=0,ii=str.length;i<ii;i++){
			var word = str.charAt(i);
			if(/^[A-Z]$/.test(word)){
				re.push("-" + word.toLowerCase());
			}else{
				re.push(word);
			}
		}
		return re.join('');
	}
	var arr = [];
	for(var i in props){
		if(/^(nodeList|isRoot)$/.test(i)){
			continue;
		}
		arr.push(":" + change(i) + "='"+i+"'");
	}
	return tpl.replace("REPLACE",arr.join(" "));
})();
Vue.component("v-tree",{
	template : tpl,
	beforeCreate : function(){
		var propsData = this.$options.propsData;
		// if(propsData.isRoot === false){
		// 	var parent = this.$parent;
		// 	var parentProps = parent.$options.propsData;
		// 	for(var i in parentProps){
		// 		if(i === 'nodeList') continue;
		// 		propsData[i] = parentProps[i];
		// 	}
		// }
		// console.log(propsData);
		var nodeList = propsData.nodeList;
    eachNode(nodeList);
	},
	props : props,
	data : function(){
		return {
			url : this.initUrl
		}
	},
	methods : {
		getRoot : function(){
			var target = this;
			while(target.isRoot !== true){
				target = target.$parent;
			}
			return target;
		},
		getRootNodeList : function(){
			return this.getRoot().nodeList;
		},
		toggleOpenExpand : function(el){
			if(!el.state) return;
			if(el.loading) return;
			if(el.state === 'closed'){
				expandNode(this,el);
			}else{
				collapseNode(this,el);
			}
		},
		clickContent : function(el){
			selectNode(el,this);
		},
		/****************************方法****************************/
		toggleCheck : function(el,checked){
			if(typeof el !== 'object'){
				el = this.getNode(el).node;
			}
			toggleCheck(this,el,checked);
		},
		loadData : function(data){
			eachNode(data);
			Vue.set(this,'nodeList',data);
		},
		getNode : function(target){
			var result = null;
			findNode(this.nodeList,target,function(item,i,list){
				result = {
					node : item,
					index : i,
					list : list
				};
			});
			return result;
		},
		reload : function(target){
			var vmodel = this;
			if(!vmodel.url) return;
			if(target !== null && target !== undefined){
				findNode(vmodel.nodeList,target,function(item){
					ajaxLoad(item,vmodel);
				});
			}else{
				ajaxLoad(null,vmodel);
			}
		},
		getParents : function(target){
			var pArr = [];
			getParents(this.getRootNodeList(),target,pArr);
			return pArr;
		},
		//展开或收缩
		toggleState : function(state,el){
			if(el !== undefined && typeof el !== 'object'){
				el = this.getNode(el).node;
			}
			var vmodel = this;
			if(el){
				toggleElState(vmodel,el,state);
			}else{
				eachNode(vmodel.nodeList,function(el){
					toggleElState(vmodel,el,state);
				});
			}
		},
		//展开到指定节点
		expandTo : function(target){
			var vmodel = this;
			var pArr = [];
			getParents(this.getRootNodeList(),target,pArr);
			for(var i=0,ii;ii=pArr[i++];){
				expandNode(vmodel,ii);
			}
		},
		//获取当前选中的节点
		getSelected : function(){
			return this.getRoot().$options.curSelEl;
		},
		/*
		移除指定节点
		target : 节点id或节点监控对象
		*/
		removeNode : function(target){
			var vmodel = this;
			findNode(vmodel.nodeList,target,function(item,i,list){
				if(item.loading) return;
				var pArr = [];
				getParents(vmodel.getRootNodeList(),item,pArr);
				if(item === vmodel.$options.curSelEl){
					vmodel.$options.curSelEl = null;
				}
				list.spice(i,1);
				eachParentsCheck(pArr);
			});
		},
		/*
		增加节点
		data : 节点数据数组
		parent : 若不指定则默认添加到根节点，若为string或number则是节点id，若为object则是节点的监控对象
		*/
		appendNodes : function(data,parent){
			var target,el;
			if(parent){
				if(typeof parent == 'object'){
					el = parent;
				}else{
					findNode(this.nodeList,parent,function(item){
						el = item;
					});
				}
				if(!el){
					return Vue.me.log("找不到目标节点,appendNodes失败");
				}
				el.state = 'open';
				target = el.children;
			}else{
				target = this.nodeList;
			}
			if(target){
				eachNode(data,null);
				var params = [target.length,0].concat(data);
				target.splice.apply(target,params);
				if(el && !el.chLoaded){
					el.chLoaded = true;
				}
			}
		}
	}
});
var nodeAttr = {
	id : null,
	iconCls : "",
	openIconCls : "",
	text : "",
	loading : false,
	selected : false,
	//1:选中 0:没选中 2:预选
	checked : 0,
	chLoaded : false,
	state : '',
	children : []
};
var defaultLoadFilter = function(resp){
	return resp;
};
Vue.component('v-tree').loadFilter = defaultLoadFilter;
//初始化节点属性
function initNodeAttr(item){
	if(!item.children){
		Vue.set(item,'children',[]);
	}
	//是否已加载子节点标志
	Vue.set(item,'chLoaded',item.state === 'open');
	if(item.children.length){
		if(item.state !== 'open'){
			Vue.set(item,'state','closed');
		}
	}else{
		if(item.state !== 'closed'){
			Vue.set(item,'state','');
		}
	}
	Vue.me.setObjDefaultAttrs(item,nodeAttr);
}
//遍历list中的所有节点，若传入回调则执行回调，否则初始化节点属性
function eachNode(list,func){
	for(var i=0,ii=list.length;i<ii;i++){
		var item = list[i];
		if(!item) continue;
		if(func){
			if(func(item,i,list) === false){
				return false;
			}
		}else{
			initNodeAttr(item);
		}
		var ch = item.children;
		if(ch && ch.length > 0 && eachNode(ch,func) === false){
			return false;
		}
	}
}
//查找指定节点并执行回调
function findNode(list,target,func){
	for(var i=0,ii=list.length;i<ii;i++){
		var item = list[i];
		if((typeof target == 'object' && target === item) || item.id === target){
			func(item,i,list);
			return false;
		}
		if(item.children && findNode(item.children,target,func) === false){
			return false;
		}
	}
}
//获取target的所有父节点
function getParents(list,target,pArr){
	for(var i=0,ii=list.length;i<ii;i++){
		var item = list[i];
		if((typeof target == 'object' && target === item) || item.id === target){
			return false;
		}
		var ch = item.children;
		if(ch.length > 0){
			pArr.push(item);
			if(getParents(ch,target,pArr) === false){
				return false;
			}
		}
	}
	pArr.pop();
}
//由叶子到根部的方向 遍历父节点 查看其下一层子节点勾选情况
//全部勾选则置为勾选 全部没有勾选则置为反选 有一个或多以上勾上则置为预选
function eachParentsCheck(pArr){
	for(var i=pArr.length - 1;i>=0;i--){
		var p = pArr[i];
		var allChecked = true;
		var allUnChecked = true;
		eachNode(p.children,function(el){
			if(el.checked === 1){
				allUnChecked = false;
			}else{
				allChecked = false;
			}
		});
		if(allChecked && !allUnChecked){
			p.checked = 1;
		}else if(!allChecked && allUnChecked){
			p.checked = 0;
		}else{
			p.checked = 2;
		}
	}
}
function ajaxLoad(el,vmodel,func){
	var callBackEl = el;
	if(!el){
		//如果节点为空 则说明树节点还没创建加载根数据
		callBackEl = null;
		el = {
			id : null
		};
	}
	var param = {id : el.id};
	Vue.me.mix(param,vmodel.queryParams);
	if(vmodel.onBeforeLoad(param,callBackEl) === false){
		return;
	}
	el.loading = true;
	Vue[vmodel.method === 'GET' ? 'ajaxGet' : 'ajaxPost'](vmodel.url,param,function(param1,param2){
		var deal = function(ch){
			if(callBackEl){
				el.state = 'open';
				if(vmodel.checkbox && vmodel.cascadeCheck){
					//如果存在勾选框且有级联检查
					eachNode(ch,function(item){
						initNodeAttr(item);
						item.checked = el.checked === 2 ? 0 : el.checked;
					},el);
				}else{
					eachNode(ch);
				}
				Vue.set(el,'children',ch);
				if(!el.chLoaded){
					el.chLoaded = true;
				}
			}else{
				eachNode(ch);
				Vue.set(vmodel,'nodeList',ch);
				func && func();
			}
			vmodel.onLoadSuccess(ch,callBackEl);
		};
		el.loading = false;
		if(Vue.me.ajaxLoadFilter){
			if(Vue.component('v-tree').loadFilter === defaultLoadFilter){
				throw new Error("若定义了Vue.me.ajaxLoadFilter，则必须同时重写Vue.component('v-tree').loadFilter");
			}
			var resp = vmodel.loadFilter(param1);
			if(resp.error){
				vmodel.onLoadError(resp.error,callBackEl);
			}else{
				deal(resp.data);
			}
		}else{
			if(param1){
				vmodel.onLoadError(param1,callBackEl);
			}else{
				param2 = vmodel.loadFilter(param2);
				deal(param2);
			}
		}
	},null);
}
function expandNode(vmodel,el){
	if(vmodel.onBeforeExpand(el) === false){
		return;
	}
	if(el.children && el.children.length){
		if(el.state === 'closed'){
			el.state = 'open';
		}
		if(!el.chLoaded){
			el.chLoaded = true;
		}
	}else if(vmodel.url){
		ajaxLoad(el,vmodel);
	}
	vmodel.onExpand(el);
}
function collapseNode(vmodel,el){
	if(vmodel.onBeforeCollapse(el) === false){
		return;
	}
	el.state = 'closed';
	vmodel.onCollapse(el);
}
function toggleElState(vmodel,el,state){
	if(!el.state) return;
	if(state === 'open'){
		el.state === 'closed' && expandNode(vmodel,el);
	}else{
		el.state === 'open' && collapseNode(vmodel,el);
	}
}
/*
展开节点 如果节点的子节点数>0则直接展开，否则根据url异步加载数据
*/
function toggleOpenExpand(vmodel,el){
	if(!el.state) return;
	if(el.loading) return;
	if(el.state === 'closed'){
		expandNode(vmodel,el);
	}else{
		collapseNode(vmodel,el);
	}
}
//勾选或反选节点
function toggleCheck(vmodel,el,checked){
	if(checked === undefined){
		var _checked = el.checked;
		if(_checked === 1){
			checked = el.checked = 0;
		}else{
			checked = el.checked = 1;
		}
	}else{
		el.checked = checked;
	}
	if(vmodel.cascadeCheck){
		if(el.children.length){
			//勾选或反选所有子节点
			eachNode(el.children,function(item){
				item.checked = checked;
			});
		}
		var pArr = [];
		getParents(vmodel.getRootNodeList(),el,pArr);
		eachParentsCheck(pArr);
		// if(checked === 1){
		// 	for(var i=0,ii;ii=pArr[i++];){
		// 		ii.checked = 2;
		// 	}
		// }else{
		// 	eachParentsCheck(pArr);
		// }
	}
}
//往上查找节点 直到找到nodecontent 执行回调
function findNodeContent(target,func){
	if(target.getAttribute("data-type") === "nodeContent"){
		func(target.parentNode["data-el"]);
	}else{
		var pNode = target.parentNode;
		while(pNode.tagName.toUpperCase() !== 'BODY'){
			if(pNode.getAttribute("data-type") === "nodeContent"){
				func(pNode.parentNode["data-el"]);
				return;
			}
			pNode = pNode.parentNode;
		}
	}
}
function selectNode(el,vmodel){
	var root = vmodel.getRoot();
	var curSelEl = root.$options.curSelEl;
	if(root.onBeforeSelect(el) === false){
		return;
	}
	if(curSelEl){
		curSelEl.selected = false;
	}
	if(curSelEl === el) return;
	el.selected = true;
	root.onSelect(root.$options.curSelEl = el);
}