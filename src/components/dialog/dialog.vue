<template>
	<teleport to="body">
		<transition enter-active-class='fade' enter-to-class='show' leave-from-class='show' leave-active-class='fade'
			@after-enter="afterEnter" @after-leave="afterLeave" :duration="300">
			<div class='vb-dialog modal' v-show="show"
				:style="{zIndex : zIndex,left : left,top : top,right : right,width : width,
				overflow : modal ? 'hidden' : 'visible',
				bottom : bottom}" @click='close'>
				<div class="modal-dialog" :style="!modal && {width : 'auto',margin : 0}">
					<div class="modal-content">
						<div class="modal-header" v-if='title'>
							<h5 class="modal-title">{{title}}</h5>
							<button type="button" class="btn-close" v-on:click='close(null)'></button>
						</div>
						<div class="modal-body" v-bind:style="bodyStyle" v-if="!content">
							<slot></slot>
						</div>
						<div class='modal-body' v-bind:style="bodyStyle" v-html="content" v-if="content">
						</div>
						<div class="modal-footer" v-if='normalizedButtons && normalizedButtons.length > 0' v-bind:style="{'text-align' : btnAlign}">
							<button v-for='(btn,i) in normalizedButtons' :key='i' type="button" class="btn" :class="['btn-' + btn.theme]" 
								v-on:click='clickBtn(btn)'>
								<i v-if='btn.iconCls' class='glyphicon ' v-bind:class='btn.iconCls'></i> {{btn.text}}
							</button>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</teleport>
</template>
<script>
	import {DomUtil} from 'vue-bootstrap/src/utils';
	import Modal from 'vue-bootstrap/src/components/modal';
	import {defineComponent,nextTick} from 'vue';
	const DefaultWidth = 600;
	const defaultBtnOptions = {
		close : false,
    theme : 'secondary',
    handler : function(){},
    text : "",
    iconCls : ''
	};
	export default defineComponent({
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
	  	initTitle : {type : String,default : ""},
	  	initContent : {type : String,default : ''},
	  	onBeforeClose : {type : Function,default : function(){}},
	  	onClose : {type : Function,default : function(){}},
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
			},
			modal : {type : Boolean,default : true}
		},
		beforeCreate(){
			Modal.init();
		},
		created(){
			if(!this.modal){
				this.right = 'auto';
				this.bottom = 'auto';
				this.top = '30px';
				this.doResize();
				DomUtil.addReisze(this);
			}
		},
		beforeUnmount(){
			if(this.modal){
				Modal.remove(this);
			}else{
				DomUtil.removeResize(this);
			}
		},
	  data(){
	  	return {
	  		show : false,
		  	zIndex : null,
				$isClosing : false,
				title : this.initTitle,
				content : this.initContent,
				left : 0,
				top : 0,
				right : 0,
				bottom : 0,
				width : 'auto'
			};
	  },
	  methods : {
			afterEnter(){
				this.onOpen();
			},
			afterLeave(){
				this.$isClosing = false;
			},
	  	close : function(e){
				if(e && !e.target.classList.contains("modal")){
					return;
				}
				if(this.onBeforeClose() === false || this.$isClosing) return;
				this.show = false;
				this.$isClosing = true;
				this.onClose();
				if(this.modal){
					Modal.pop();
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
				if(this.modal){
					Modal.push(this);
				}else{
					this.doResize();
				}
				this.show = true;
			},
			doResize : function(){
				let dw = document.body.offsetWidth;
				if(dw > DefaultWidth){
					this.left = (dw - DefaultWidth) / 2 + 'px';
					this.right = 'auto';
					this.width = DefaultWidth + 'px';
				}else{
					this.left = 0;
					this.right = 0;
					this.width = 'auto';
				}
			},
			resize : function(){
				if(this.modal || !this.show) return;
				this.doResize();
			}
	  }
	});
</script>
<style>
	/*modal样式默认是display:none,解决无法用v-show控制显示的问题*/
	.vb-dialog{display: block;}
</style>