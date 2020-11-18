//dom相关操作帮助类
export default {
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
	findParentByCls(el,vali){
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
	}
}