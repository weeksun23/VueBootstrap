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
    this.$options.listgroupVm.destroy();
  },
  methods : {
    focus(){
      if(this.data.length === 0) return;
      let listgroupVm = this.$options.listgroupVm;
      listgroupVm.show = true;
      let el = this.$el;
      let box = DomUtil.getElBox(el);
      listgroupVm.left = box.left;
      listgroupVm.top = box.height + box.top;
      listgroupVm.width = box.width + 'px';
    },
    setItem(item){
      this.text = item.text;
    }
  }
}
</script>