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
	import Modal from 'vue-bootstrap/src/components/modal';
	import Vue from 'vue';
	const defaultBtnOptions = {
		close : false,
    theme : 'default',
    handler : function(){},
    text : "",
    iconCls : ''
	};
	export default {
		name : 'VbDialog',
		defaultBtnOptions,
		computed : {
	  	normalizedButtons(){
				var buttons = this.buttons;
			 	var defaultBtn = this.$options.defaultBtnOptions;
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
	  	initTitle : {
	  		type : String,
	  		default : ""
	  	},
	  	initContent : {
	  		type : String,
	  		default : ''
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
			Modal.init();
		},
	  data(){
	  	return {
	  		isOpen : false,
		  	isIn : false,
		  	zIndex : null,
				$isClosing : false,
				title : this.initTitle,
				content : this.initContent
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
				this.onClose();
				Modal.pop();
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
				Modal.push(this);
				this.isOpen = true;
	      this.$nextTick(() => {
	        //do reflow
	        this.$el.offsetWidth;
	        this.isIn = true;
	      });
			}
	  }
	}
</script>