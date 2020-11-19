var tpl = require("./vue.dialog.html");
Vue.component('v-dialog', {
  template: tpl,
  computed : {
  	normalizedButtons : function(){
  		var buttons = this.buttons;
  		for(var i=0,ii;ii=buttons[i++];){
				for(var j in defaultBtn){
					if(ii[j] === undefined){
						ii[j] = defaultBtn[j];
					}
				}
  		}
  		return buttons;
  	}
  },
  props : {
  	title : {
  		type : String,
  		default : ""
  	},
  	onBeforeClose : {
  		type : Function,
  		default : function(){}
  	},
  	onClose : {
  		type : Function,
  		default : function(){}
  	},
  	onBeforeOpen : {
  		type : Function,
  		default : function(){}
  	},
  	onOpen : {
  		type : Function,
  		default : function(){}
  	},
  	buttons : {
  		type : Array,
  		default : function(){
  			return [];
  		}
  	},
  	content : {
  		type : String,
  		default : ''
  	},
  	bodyStyle : {
  		type : String,
  		default : ''
  	},
  	btnAlign : {
  		type : String,
  		default : ''
  	}
  },
  data : function(){
  	return {
  		isOpen : false,
	  	isIn : false,
	  	zIndex : null,
	 		$isClosing : false
		};
  },
  methods : {
  	close : function(e){
			if(e && !e.target.classList.contains("modal")){
				return;
			}
			if(this.onBeforeClose() === false || this.$isClosing) return;
			this.isIn = false;
			this.$isClosing = true;
			var dgs = modalBackDropVm.$data.$curDialogs;
			dgs.pop();
			var len = dgs.length;
			if(len > 0){
				dgs[len - 1].zIndex = 1050;
			}else{
				document.body.classList.remove('modal-open');
				modalBackDropVm.isIn = false;
			}
			this.onClose();
  	},
  	transitionend : function(e){
  		//窗口打开或结束后事件
			if(this.isIn){
				this.onOpen();
			}else{
				this.isOpen = false;
				this.$isClosing = false;
			}
  	},
  	clickBtn : function(btn){
  		var handler = btn.handler;
  		var re = handler.call(this,btn);
  		if(re !== false && btn.close){
  			this.close();
  		}
  	},
  	open : function(){
			if(this.onBeforeOpen() === false) return;
			document.body.classList.add("modal-open");
			this.isOpen = true;
			modalBackDropVm.visible = true;
			var vm = this;
      Vue.nextTick(function(){
        //do reflow
        vm.$el.offsetWidth;
        modalBackDropVm.$el.offsetWidth;
        vm.isIn = true;
        modalBackDropVm.isIn = true;
        //处理重叠窗口
        var dgs = modalBackDropVm.$data.$curDialogs;
        var len = dgs.length;
        if(len > 0){
          var last = dgs[len - 1];
          last.zIndex = 1000;
        }
        dgs.push(vm);
      });
		}
  }
});
var defaultBtn = Vue.component("v-dialog").defaultBtn = {
  close : false,
  theme : 'default',
  handler : function(){},
  text : "",
  iconCls : ''
};
Vue.me.appendHTML(document.body,"<div id='modalBackDrop' class='modal-backdrop fade' "+
	"v-bind:class='{in : isIn}' v-on:transitionend='transitionend' v-show='visible'></div>");
var modalBackDropVm = new Vue({
  el: '#modalBackDrop',
  data: {
  	isIn : false,
  	visible : false,
  	$curDialogs : []
  },
  methods : {
  	transitionend : function(){
  		if(!this.isIn){
				this.visible = false;
			}
  	}
  }
});