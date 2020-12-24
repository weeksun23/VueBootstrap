<template>
  <input type='text' class="form-control" :class="cls" :placeholder="placeholder" 
    @focus="focus" @blur="blur">
</template>
<script>
import Dropdown from 'vue-bootstrap/src/components/dropdown';
import {DomUtil} from 'vue-bootstrap/src/utils';
export default {
  name : "VbSelect",
  data(){
    return {
      data : [
        {text : '121222'},{text : '22323r'},
        {text : '121222'},{text : '22323r'},
        {text : '121222'},{text : '22323r'},
        {text : '121222'},{text : '22323r'},
        {text : '121222'},{text : '22323r'},
        {text : '121222'},{text : '22323r'},
        {text : '121222'},{text : '22323r'},
        {text : '121222'},{text : '22323r'},
        {text : '121222'},{text : '22323r'},
        {text : '121222'},{text : '22323r'},
        {text : '121222'},{text : '22323r'},
        {text : '121222'},{text : '22323r'}
      ]
    }
  },
  props : {
    cls : {type : String,default : ''},
    placeholder : {type : String,default : ''}
  },
  created(){
    this.$options.dropdownVm = Dropdown.init(this.data);
  },
  beforeDestroy(){
    this.$options.dropdownVm.destroy();
  },
  methods : {
    focus(){
      let dropdown = this.$options.dropdownVm;
      dropdown.show = true;
      let el = this.$el;
      let box = DomUtil.getElBox(el);
      dropdown.left = box.left;
      dropdown.top = box.height + box.top;
      dropdown.width = box.width + 'px';
    },
    blur(){
      this.$options.dropdownVm.show = false;
    }
  }
}
</script>