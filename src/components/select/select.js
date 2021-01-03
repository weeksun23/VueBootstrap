import Listgroup from 'vue-bootstrap/src/components/listgroup';
import {DomUtil} from 'vue-bootstrap/src/utils';
import template from './select.html';
import './select.css';
let tplArr = template.split("SPLIT");
const targetTpl = tplArr[1].replace(/INPUT/g,tplArr[0]);
export default {
  name : "VbSelect",
  template : targetTpl,
  data(){
    return {
      text : '',
      canBlur : true,
      showItems : false,
      canShowItemsWhileTextChange : false,
      value : this.initValue
    }
  },
  //绑定的列表项组vm
  listgroupVm : null,
  bodyClickHandler : null,
  props : {
    //应用在input上的class
    cls : {type : String,default : ''},
    placeholder : {type : String,default : ''},
    editable : {type : Boolean,default : false},
    data : {type : Array,default : []},
    //栅格类前缀 col-{{colCls}}-x
    colCls : {type : String,default : ''},
    //col-xx-2
    labelColSize : {type : Number,default : 2},
    //col-xx-10
    inputColSize : {type : Number,default : 10},
    labelText : {type : String,default : ''},
    initValue : [String,Number]
  },
  created(){
    
  },
  mounted(){
    let listgroupVm = Listgroup.init(this.data,this.$el.querySelector('div.vb-select-input'));
    listgroupVm.$options.selectVm = this;
    this.$options.listgroupVm = listgroupVm;
    if(this.value){
      this.setValue(this.value);
    }
  },
  beforeDestroy(){
    this.removeBodyClick();
    this.$options.listgroupVm.destroy();
  },
  watch : {
    text(val){
      if(!this.editable) return;
      let listgroupVm = this.$options.listgroupVm;
      if(!val){
        listgroupVm.setData(this.data);
        return;
      }
      if(!this.showItems && this.canShowItemsWhileTextChange){
        this.showItems = true;
      }
      let newData = [];
      for(let i=0,ii;ii=this.data[i++];){
        if(ii.text === val){
          listgroupVm.clickItem(ii,true);
        }
        if(ii.text.indexOf(val) !== -1){
          newData.push(ii);
        }
      }
      listgroupVm.setData(newData);
    },
    showItems(val){
      let listgroupVm = this.$options.listgroupVm;
      listgroupVm.show = val;
    },
    value(val){
      this.setValue(val);
    }
  },
  methods : {
    setValue(val){
      let listgroupVm = this.$options.listgroupVm;
      if(this.editable){
        //可写下 group可能只有部分数据，要先设置所有数据
        listgroupVm.setData(this.data);
      }
      listgroupVm.setValue(val);
      if(val === null){
        this.text = '';
      }
    },
    getInputEl(){
      return this.$el.querySelector("input");
    },
    removeBodyClick(){
      if(this.$options.bodyClickHandler){
        document.body.removeEventListener('click',this.$options.bodyClickHandler);
        this.$options.bodyClickHandler = null;
      }
    },
    doFocus(){
      let input = this.getInputEl();
      input.focus();
    },
    focus(){
      if(this.data.length === 0) return;
      this.showItems = true;
      this.removeBodyClick();
      this.$options.bodyClickHandler = (e) => {
        let inputAreaEl = this.$el.querySelector("div.vb-select-input");
        let result = DomUtil.findTargetParent(e.target,(node) => {
          return node === inputAreaEl;
        });
        if(!result){
          this.showItems = false;
          this.removeBodyClick();
        }
      };
      document.body.addEventListener('click',this.$options.bodyClickHandler);
    },
    blur(){
      if(!this.canBlur) return;
      let listgroupVm = this.$options.listgroupVm;
      if(this.text === ''){
        listgroupVm.clearSelect();
        return;
      }
      let item = listgroupVm.$options.lastSelectItem;
      if(item && this.text !== item.text){
        this.text = item.text;
      }else if(!item){
        this.text = '';
      }
    },
    keydown(e){
      if(!this.editable) return;
      let listgroupVm = this.$options.listgroupVm;
      switch(e.keyCode){
        case DomUtil.keyCode.up:
          listgroupVm.preSelect(-1);
          break;
        case DomUtil.keyCode.down:
          listgroupVm.preSelect(1);
          break;
        case DomUtil.keyCode.enter:
          listgroupVm.setPreSelect();
          break;
      }
    }
  }
}