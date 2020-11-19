<template>
	<div class='modal fade' v-bind:class="{'in' : isIn}" v-bind:style="{zIndex : zIndex,display : isOpen ? 'block' : 'none'}" v-on:click='close'>
	  <div class="modal-dialog" v-on:transitionend="transitionend">
	    <div class="modal-content">
	      <div class="modal-header" v-if='title'>
	        <button type="button" class="close" v-on:click='close(null)'><span>&times;</span></button>
	        <h4 class="modal-title">{{title}}</h4>
	      </div>
	      <div class="modal-body" v-bind:style="bodyStyle" v-if="!content">
	        <slot></slot>
	      </div>
	      <div class='modal-body' v-bind:style="bodyStyle" v-html="content" v-if="content">
	      </div>
	      <div class="modal-footer" v-if='normalizedButtons && normalizedButtons.length > 0' v-bind:style="{'text-align' : btnAlign}">
	        <button v-for='(btn,i) in normalizedButtons' :key='i' type="button" class="btn" :class="['btn-' + btn.theme]" v-on:click='clickBtn(btn)'>
	          <i v-if='btn.iconCls' class='glyphicon ' v-bind:class='btn.iconCls'></i> {{btn.text}}
	        </button>
	      </div>
	    </div>
	  </div>
	</div>
</template>
<script>
	import {DomUtil} from 'vue-bootstrap/src/utils';
	import Vue from 'vue';
	//所有dialog共享的遮罩层
	let ModalBackDropVm = null;
	let Dialog = {
		name : 'VbDialog',
		computed : {
	  	normalizedButtons(){
				var buttons = this.buttons;
			 	var defaultBtn = Vue.component(Dialog.name).defaultBtn;
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
		beforeCreate(){
			if(ModalBackDropVm === null){
				DomUtil.appendHTML(document.body,"<div id='modalBackDrop' class='modal-backdrop fade' "+
					"v-bind:class='{in : isIn}' v-on:transitionend='transitionend' v-show='visible'></div>");
				ModalBackDropVm = new Vue({
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
			}
		},
	  data(){
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
				var dgs = ModalBackDropVm.$data.$curDialogs;
				dgs.pop();
				var len = dgs.length;
				if(len > 0){
					dgs[len - 1].zIndex = 1050;
				}else{
					document.body.classList.remove('modal-open');
					ModalBackDropVm.isIn = false;
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
				ModalBackDropVm.visible = true;
				var vm = this;
	      this.$nextTick(function(){
	        //do reflow
	        vm.$el.offsetWidth;
	        ModalBackDropVm.$el.offsetWidth;
	        vm.isIn = true;
	        ModalBackDropVm.isIn = true;
	        //处理重叠窗口
	        var dgs = ModalBackDropVm.$data.$curDialogs;
	        var len = dgs.length;
	        if(len > 0){
	          var last = dgs[len - 1];
	          last.zIndex = 1000;
	        }
	        dgs.push(vm);
	      });
			}
	  }
	};
	export default Dialog;
</script>