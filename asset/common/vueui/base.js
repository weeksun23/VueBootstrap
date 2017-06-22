Vue.me = {
	//追加html 并返回所追加的html的第一个元素
	appendHTML : function(el,htmlStr){
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
	//向上遍历目标元素的所有祖先元素 直到找到class含cls的并返回
	findParentByCls : function(el,cls){
		while(el && el.tagName.toLowerCase() !== 'body'){
	    if(el.classList.contains(cls)){
	      return el;
	    }
	    el = el.parentNode;
	  }
	  return null;
	},
	//为对象设置默认属性
	setObjDefaultAttrs : function(target,defaultObj){
		for(var j in defaultObj){
	    if(target[j] === undefined){
	      Vue.set(target,j,defaultObj[j]);
	    }
	  }
	  return target;
	}
};