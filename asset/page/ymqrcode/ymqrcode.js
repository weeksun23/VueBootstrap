require("../../lib/bootstrap/css/bootstrap.css");
require("../../common/vueui/vueui");
var QRCode = require("../../lib/qrcode/qrcode");
function paddingZero(str,len){
  len = len || 8;
  str = str + "";
  var strLen = str.length;
  if(strLen >= len) return str;
  return new Array(len - strLen + 1).join('0') + str;
}
var inputArea = new Vue({
  el: '#page',
  data: {
  	startCode : 0,
  	codeNum : 56,
  	type : 'YMV400-',
    data : []
  },
  methods : {
    paddingZero : function(code){
      if(this.type === 'YMV400-'){
        var len = 7;
      }else if(this.type === 'YMV400-P'){
        len = 6;
      }
      return paddingZero(code,len);
    },
  	excute : function(){
      if(typeof this.startCode != 'number') return;
      this.data = [];
  		var result = [];
      for(var i=this.startCode;i<=this.startCode + this.codeNum - 1;i++){
        result.push(this.type + this.paddingZero(i));
      }
      this.data = result;
      Vue.nextTick(function () {
        var els = document.querySelectorAll(".item-qrcode");
        for(var i=0,el;el=els[i++];){
          el.innerHTML = '';
          new QRCode(el, {
            text: el.getAttribute("data-code"),
            width: el.offsetWidth,
            height: el.offsetHeight,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
          });
        }
      });
  	}
  }
});