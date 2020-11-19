var tpl = require("./vue.validate.html");
var validateObj = {
	required : {
		message : '该字段必须填写',
		//返回true表示验证成功
		excute : function(val){
			return val !== '';
		}
	},
	positiveIngter : {
		message : '请输入正整数',
		excute : function(val){
			return /^[\d]+$/.test(val);
		}
	}
};
Vue.validate = function(name,message,func){
	validateObj[name] = {
		message : message,
		excute : func
	};
};
Vue.validate.excute = function(valueVm,parentVm){
	if(!parentVm){
		parentVm = valueVm;
	}
	var chs = parentVm.$children;
	var isVali = true;
	for(var i=0,ch;ch=chs[i++];){
		if(ch.$options.$isValidateComponent){
			if(!ch.doVali(valueVm)){
				isVali = false;
			}
		}
	}
	return isVali;
};
Vue.component('v-validate', {
	$isValidateComponent : true,
	template: tpl,
	props : {
		cls : {
			type : String,
      default : ''
		},
		valiKey : {
			type : String,
      default : ''
		},
		rule : {
			type : String,
      default : ''
		},
		initMessage : {
			type : String,
      default : ''
		}
	},
	data : function(){
		return {
			isVali : true,
			isFile : false,
			message : this.initMessage
		};
	},
	methods : {
		doVali : function(vm){
			if(this.isFile){
				var input = this.$el.querySelector('input');
				var file = input.files[0];
				if(!file){
					this.isVali = false;
					this.message = '请选择文件';
					return false;
				}else{
					if(this.rule){
						//限制文件后缀
						var name = file.name;
						var arr = name.split(".");
						var fix = arr[arr.length - 1];
						var fixArr = this.rule.split(',');
						for(var i=0,ii;ii=fixArr[i++];){
							if(fix.toLowerCase() === ii.toLowerCase()){
								return true;
							}
						}
						return false;
					}
					return true;
				}
			}
			var target = validateObj[this.rule];
			var value = vm[this.valiKey];
			this.isVali = target.excute(value);
			this.message = this.message || target.message;
			return this.isVali;
		}
	},
	mounted : function(){
		var input = this.$el.querySelector('input') || this.$el.querySelector("textarea");
		var me = this;
		if(input){
			if(input.type && input.type.toLowerCase() === 'file'){
				this.isFile = true;
				input.addEventListener("change",function(){
					me.isVali = true;
				});
			}else{
				input.addEventListener("input",function(){
					me.isVali = true;
				});
			}
		}
	}
});