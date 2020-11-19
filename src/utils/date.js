import CommonUtil from './common';
function getDate(value){
  //handle undefined null
  if(!value) return null;
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
  }else if(typeof value == "number" || typeof value == 'string'){
    //handle 45345345 '2020-11-11 11:11:11'
    date = new Date(value);
  }else{
    return null;
  }
  return date;
}
export default{
	format(value,str,unPaddingZero){
		var date = getDate(value);
	  if(!date) return '';
	  str = str || "yyyyMMdd-hh:mm:ss";
	  return str.replace("yyyy",date.getFullYear())
	    .replace("MM",unPaddingZero ? (date.getMonth()+1) : CommonUtil.paddingZero(date.getMonth()+1))
	    .replace("dd",unPaddingZero ? date.getDate() : CommonUtil.paddingZero(date.getDate()))
	    .replace("hh",unPaddingZero ? date.getHours() : CommonUtil.paddingZero(date.getHours()))
	    .replace("mm",unPaddingZero ? date.getMinutes() : CommonUtil.paddingZero(date.getMinutes()))
	    .replace("ss",unPaddingZero ? date.getSeconds() : CommonUtil.paddingZero(date.getSeconds()));
	}
}