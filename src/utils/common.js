import Vue from 'vue';
export default{
	//组件共享的ajax加载方法
	ajaxLoad : null,
	noop : function(){},
	setObjDefaultAttrs(target,defaultObj){
		for(var j in defaultObj){
	    if(target[j] === undefined){
	      Vue.set(target,j,defaultObj[j]);
	    }
	  }
	},
	paddingZero(str,len){
		len = len || 8;
  	str = str + "";
  	var strLen = str.length;
  	if(strLen >= len) return str;
  	return new Array(len - strLen + 1).join('0') + str;
	}
}