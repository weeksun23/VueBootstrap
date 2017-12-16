var reqwest = require("./reqwest");
var defaultSetting = {
	crossOrigin : true,
	withCredentials : false
};
//
function doAjax(url,param,callback,loadingVm,setting,method){
	param = param || {};
	if(loadingVm !== null){
		loadingVm = loadingVm || Vue.me.loading;
	}
	loadingVm && loadingVm.show();
	Vue.me.log("发送参数",url,param);
	setting = Vue.me.mix({
		url : url,
		data : param,
		type : 'json',
		error : function(){
			loadingVm && loadingVm.hide();
			Vue.me.log('接收错误',url,arguments);
			callback && callback({
				code : -1,
				desc : "服务器错误"
			});
		},
		success : function(resp){
			loadingVm && loadingVm.hide();
			Vue.me.log("接收数据",url,resp);
			try{
				if(callback){
					callback(resp);
				}
			}catch(ex){
				Vue.me.log(ex);
			}
		}
	},defaultSetting,setting);
	setting.method = method;
	reqwest(setting);
}
Vue.ajaxPost = function(url,param,callback,loadingVm,setting){
	doAjax(url,param,callback,loadingVm,setting,"POST");
};
Vue.ajaxGet = function(url,param,callback,loadingVm,setting){
	doAjax(url,param,callback,loadingVm,setting,"GET");
};