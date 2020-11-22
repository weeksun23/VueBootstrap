//全局唯一模态层
import {DomUtil} from 'vue-bootstrap/src/utils';
import Vue from 'vue';
const Modal = {
  items : [],
  vm : null,
  init(){
    if(this.vm) return;
    DomUtil.appendHTML(document.body,`<div id='vbModalBackDrop' class='modal-backdrop fade' 
      v-bind:class='{in : isIn}' v-on:transitionend='transitionend' v-show='visible'></div>`);
    this.vm = new Vue({
      el: '#vbModalBackDrop',
      data: {
        isIn : false,
        visible : false
      },
      methods : {
        transitionend : function(){
          if(!this.isIn){
            this.visible = false;
          }
        }
      }
    });
  },
  _check(){
    if(!this.vm){
      throw 'Model未初始化，请先执行Model.init()';
    }
  },
  _push(item){
    let items = this.items;
    let len = items.length;
    if(len > 0){
      var last = items[len - 1];
      last.zIndex = 1000;
    }
    items.push(item);
  },
  push(item){
    this._check();
    let items = this.items;
    let len = items.length;
    if(len === 0){
      document.body.classList.add("modal-open");
      this.vm.visible = true;
      this.vm.$nextTick(() => {
        this.vm.$el.offsetWidth;
        this.vm.isIn = true;
        this._push(item);
      });
    }else{
      this._push(item);
    }
  },
  pop(){
    this._check();
    let items = this.items;
    if(items.length === 0) return;
    items.pop();
    let len = items.length;
    if(len > 0){
      items[len - 1].zIndex = 1050;
    }else{
      document.body.classList.remove('modal-open');
      this.vm.isIn = false;
    }
  }
};
export default Modal;