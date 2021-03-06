//dom相关操作工具类
//获取元素的纵坐标 
function getTop(e,pNode){ 
	var offset = e.offsetTop;
	if(pNode && e.offsetParent === pNode) return offset;
	if(e.offsetParent != null) offset += getTop(e.offsetParent,pNode); 
	return offset;
}
//获取元素的横坐标 
function getLeft(e,pNode){ 
	var offset = e.offsetLeft;
	if(pNode && e.offsetParent === pNode) return offset;
	if(e.offsetParent != null) offset += getLeft(e.offsetParent,pNode); 
	return offset; 
}
//window resize vm
let resizeVms = [];
function doResize(){
	console.log('doResize',resizeVms.length);
	for(var i=0,ii;ii=resizeVms[i++];){
		ii.resize();
	}
}
function addResizeVm(vm){
	if(resizeVms.length === 0){
		window.addEventListener("resize",doResize);
	}
	resizeVms.push(vm);
}
function removeReiszeVm(vm){
	for(var i=0;i<resizeVms.length;i++){
		if(resizeVms[i] === vm){
			resizeVms.splice(i,1);
			break;
		}
	}
	if(resizeVms.length === 0){
		window.removeEventListener('resize',doResize);
	}
}
export default {
	keyCode : Object.freeze({
		up : 38,
		down : 40,
		enter : 13
	}),
	appendHTML(el,htmlStr){
		var div = document.createElement("div");
		var fragment = document.createDocumentFragment();
		div.innerHTML = htmlStr;
		var nodes = div.childNodes;
		var first;
	  for (var i=0, length=nodes.length; i<length; i++) {
	  	var node = nodes[i].cloneNode(true);
	  	if(!first){
	  		first = node;
	  	}
	    fragment.appendChild(node);
	  }
	  el.appendChild(fragment);
	  return first;
	},
	//向上遍历目标元素的所有祖先元素 直到找到class含vali或者vali()返回true并返回
	findTargetParent(el,vali){
		var type = typeof vali;
		while(el){
			if(type == 'function'){
				if(vali(el)){
					return el;
				}
			}else if(type == 'string'){
		    if(el.classList){
		    	var clsArr = vali.split(",");
		    	for(var i=0,ii;ii=clsArr[i++];){
		    		if(el.classList.contains(ii)){
		    			return el;
		    		}
		    	}
		    }
			}else{
				throw new Error("vali参数非法");
			}
	    if(typeof el.tagName == 'string' && el.tagName.toLowerCase() === 'body'){
	    	return null;
	    }
	    el = el.parentNode;
	  }
	  return null;
	},
	offsetEl(el,pNode){
		return {
			left : getLeft(el,pNode),
			top : getTop(el,pNode)
		}
	},
	getElBox(el){
		var offset = this.offsetEl(el);
		return {
			left : offset.left,
			top : offset.top,
			width : el.offsetWidth,
			height : el.offsetHeight
		}
	},
	addReisze(vm){
		addResizeVm(vm);
	},
	removeResize(vm){
		removeReiszeVm(vm);
	}
}