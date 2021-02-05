//全局唯一模态层
import ModalConstructor from './modal';
import { h, render,nextTick,createApp} from 'vue'
const Modal = {
  items : [],
  vm : null,
  init : function(){
    if(this.vm) return;
    const vnode = h(ModalConstructor);
    render(vnode, document.body);
    this.vm = vnode.component;
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
    console.log('modal push',items.length);
  },
  push(item){
    this._check();
    let items = this.items;
    let len = items.length;
    if(len === 0){
      document.body.classList.add("modal-open");
      this.vm.proxy.visible = true;
      nextTick(() => {
        this.vm.vnode.el.offsetWidth;
        this.vm.proxy.show = true;
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
      //最后一个zindex为1050 其它都是1000
      items[len - 1].zIndex = 1050;
    }else{
      document.body.classList.remove('modal-open');
      this.vm.proxy.show = false;
    }
  },
  //当vm destroy的时候，必须调用该方法移除相应vm
  remove(vm){
    let items = this.items;
    if(vm === items[items.length - 1]){
      this.pop();
    }else{
      for(var i=0;i<items.length - 1;i++){
        if(items[i] === vm){
          items.splice(i,1);
          break;
        }
      }
    }
  }
};
export default Modal;