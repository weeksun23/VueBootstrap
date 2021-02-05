<template>
	<teleport to="body">
		<transition enter-active-class='fade' enter-to-class='show' leave-from-class='show' leave-active-class='fade'
			@before-enter="beforeEnter" @after-enter="afterEnter" @after-leave="afterLeave" :duration="300">
			<div class='vb-dialog modal' v-show="show" :class="{'fade' : preShowStatic,'show' : preShowStatic,'modal-static' : showStatic}"
				:style="{zIndex : zIndex}" @click='close'>
				<div class="modal-dialog" @transitionend="transitionend"
					:class="[scrollable && 'modal-dialog-scrollable',centered && 'modal-dialog-centered',size && ('modal-' + size)]">
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
	import Modal from 'vue-bootstrap/src/components/modal';
	import {defineComponent} from 'vue';
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
			static : {type : Boolean,default : false},
			scrollable : {type : Boolean,default : false},
			centered : {type : Boolean,default : false},
			size : {type : String,default : null}
		},
		beforeCreate(){
			Modal.init();
		},
		beforeUnmount(){
			Modal.remove(this);
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
				width : 'auto',
				preShowStatic : false,
				showStatic : false,
				isShowing : false//是否在打开动画过程中
			};
	  },
	  methods : {
			beforeEnter(){
				this.isShowing = true;
			},
			afterEnter(){
				this.onOpen();
				this.isShowing = false;
			},
			afterLeave(){
				this.$isClosing = false;
			},
			transitionend(){
				if(this.showStatic){
					this.showStatic = false;
				}else{
					this.preShowStatic = false;
				}
			},
	  	close : function(e){
				if(e && !e.target.classList.contains("modal")){
					return;
				}
				if(this.onBeforeClose() === false || this.$isClosing) return;
				if(this.static && e){
					//打开动画还没结束 不能开始静态动画效果
					if(!this.isShowing){
						this.preShowStatic = true;
						this.showStatic = true;
					}
					return;
				}
				this.show = false;
				this.$isClosing = true;
				this.onClose();
				Modal.pop();
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
				this.show = true;
			}
	  }
	});
</script>
<style>
	/*modal样式默认是display:none,解决无法用v-show控制显示的问题*/
	.vb-dialog{display: block;}
</style>