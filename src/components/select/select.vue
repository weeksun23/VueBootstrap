<template>
  <input type='text' class="form-control" :class="cls" :placeholder="placeholder"
    @focus="focus" :readonly="!editable" v-model="text">
</template>
<script>
import Listgroup from 'vue-bootstrap/src/components/listgroup';
import {DomUtil} from 'vue-bootstrap/src/utils';
export default {
  name : "VbSelect",
  data(){
    return {
      text : ''
    }
  },
  //绑定的列表项组vm
  listgroupVm : null,
  bodyClickHandler : null,
  props : {
    cls : {type : String,default : ''},
    placeholder : {type : String,default : ''},
    editable : {type : Boolean,default : false},
    data : {type : Array,default : []}
  },
  created(){
    let listgroupVm = Listgroup.init(this.data);
    listgroupVm.$options.selectVm = this;
    this.$options.listgroupVm = listgroupVm;
  },
  beforeDestroy(){
    this.removeBodyClick();
    this.$options.listgroupVm.destroy();
  },
  methods : {
    removeBodyClick(){
      if(this.$options.bodyClickHandler){
        document.body.removeEventListener('click',this.$options.bodyClickHandler);
        this.$options.bodyClickHandler = null;
      }
    },
    focus(){
      if(this.data.length === 0) return;
      let listgroupVm = this.$options.listgroupVm;
      listgroupVm.show = true;
      let el = this.$el;
      let box = DomUtil.getElBox(el);
      listgroupVm.left = box.left;
      listgroupVm.top = box.height + box.top;
      listgroupVm.width = box.width + 'px';
      this.removeBodyClick();
      this.$options.bodyClickHandler = (e) => {
        if(e.target === el) return;
        let result = DomUtil.findTargetParent(e.target,(node) => {
          if(node === listgroupVm.$el) return true;
        });
        if(!result){
          listgroupVm.show = false;
          this.removeBodyClick();
        }
      };
      document.body.addEventListener('click',this.$options.bodyClickHandler);
    },
    setItem(item){
      this.text = item.text;
    }
  }
}
</script>