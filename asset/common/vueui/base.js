function paddingZero(str,len){
	len = len || 2;
	str = str + "";
	var strLen = str.length;
	if(strLen >= len) return str;
	return new Array(len - strLen + 1).join('0') + str;
}
function getDate(value){
  //handle undefined null
  if(!value) return null;
  if(typeof value == 'string'){
  	value = Number(value);
  	if(isNaN(value)){
  		return null;
  	}
  }
  if(typeof value == "object"){
    if(value.getFullYear){
      //handle date
      var date = value;
    }else if(value.time){
      //handle {time:58566888,......}
      date = new Date(value.time);
    }else{
      return null;
    }
  }else if(typeof value == "number"){
    //handle 45345345
    date = new Date(value);
  }else{
    return null;
  }
  return date;
}
Vue.filter('date', function (value,format,unPaddingZero) {
  var date = getDate(value);
  if(!date) return '';
  format = format || "yyyy-MM-dd hh:mm:ss";
  return format.replace("yyyy",date.getFullYear())
    .replace("MM",unPaddingZero ? (date.getMonth()+1) : paddingZero(date.getMonth()+1))
    .replace("dd",unPaddingZero ? date.getDate() : paddingZero(date.getDate()))
    .replace("hh",unPaddingZero ? date.getHours() : paddingZero(date.getHours()))
    .replace("mm",unPaddingZero ? date.getMinutes() : paddingZero(date.getMinutes()))
    .replace("ss",unPaddingZero ? date.getSeconds() : paddingZero(date.getSeconds()));
});
Vue.me = {
	debug : true,
	//空函数
	noop : function(){},
	//覆盖整个body的loadingVm，默认的加载效果展示
	loading : null,
	log : function(){
		this.debug && console.log.apply(console,arguments);
	},
	mix : function(){
		var src, copy, name, options,
	    target = arguments[0] || {},
	    i = 1,
	    length = arguments.length;
	  if ( typeof target !== "object") {
	    target = {};
	  }

	  // extend jQuery itself if only one argument is passed
	  if ( length === i ) {   // 处理这种情况 jQuery.extend(obj)，或 jQuery.fn.extend( obj )
	    target = this;  // jQuery.extend时，this指的是jQuery；jQuery.fn.extend时，this指的是jQuery.fn
	    --i;
	  }
	  for ( ; i < length; i++ ) {
	    // Only deal with non-null/undefined values
	    if ( (options = arguments[ i ]) != null ) { // 比如 jQuery.extend( obj1, obj2, obj3, ojb4 )，options则为 obj2、obj3...
	      // Extend the base object
	      for ( name in options ) {
	        src = target[ name ];
	        copy = options[ name ];
	        // Prevent never-ending loop
	        if ( target === copy ) {    // 防止自引用，不赘述
	          continue;
	        }
	        if ( copy !== undefined ) {  // 浅拷贝，且属性值不为undefined
	          target[ name ] = copy;
	        }
	      }
	    }
	  }
	  return target;
	},
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
	//向上遍历目标元素的所有祖先元素 直到找到class含vali或者vali()返回true并返回
	findParentByCls : function(el,vali){
		var type = typeof vali;
		while(el){
			if(type == 'function'){
				if(vali(el)){
					return el;
				}
			}else if(type == 'string'){
		    if(el.classList.contains(vali)){
		      return el;
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
	//为对象设置监听属性
	setObjDefaultAttrs : function(target,defaultObj){
		for(var j in defaultObj){
	    if(target[j] === undefined){
	      Vue.set(target,j,defaultObj[j]);
	    }
	  }
	  return target;
	}
};