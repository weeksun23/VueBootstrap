import Vue from 'vue';
import './listgroup.css';
const tpl = `<div class='list-group vb-list-group' v-show='show'
  :style="{left : left,top : top,width : width,'max-height' : maxHeight + 'px'}">
  <div class='vb-empty text-muted' v-show='data.length === 0'>
    暂无数据
  </div>
  <a v-for="(el,i) in data" href="javascript:void(0)" class="list-group-item" @click="clickItem(el)"
    :class="{active : el.selected,'vb-pre-select' : i === preSelIndex && !el.selected}">
    {{el.text}}
  </a>
</div>`;
const defaultItemAttrs = {
  //是否被选中
  selected : false,
  text : '',
  value : null
};
function initData(data){
  for(let i=0,ii;ii=data[i++];){
    for(let key in defaultItemAttrs){
      if(ii[key] === undefined){
        ii[key] = defaultItemAttrs[key];
      }
    }
  }
}
const Listgroup = {
  init(data,pNode){
    pNode = pNode || document.body;
    initData(data);
    let comp = Vue.extend({
      template: tpl,
      //所绑定的select vm
      selectVm : null,
      //上一次选择的项
      lastSelectItem : null,
      data(){
        return {
          preSelIndex : -1,
          data : data,
          left : 0,
          top : '100%',
          show : false,
          width : 'auto',
          //最大高度，列表项总高度超过该高度则自动滚动
          maxHeight : 300
        };
      },
      methods : {
        destroy(){
          pNode.removeChild(this.$el);
          this.$destroy();
        },
        setData(data,forceUpdate){
          if(this.data.length === data.length && !forceUpdate) return;
          initData(data);
          this.data = data;
          let existIndex = null;
          let lastSelectItem = this.$options.lastSelectItem;
          if(lastSelectItem){
            data.forEach((el,i) => {
              if(el.value === lastSelectItem.value){
                existIndex = i;
                return false;
              }
            });
          }
          if(existIndex === null){
            this.preSelIndex = -1;
          }else{
            this.preSelIndex = existIndex;
          }
        },
        clickItem(el,unHide){
          let {lastSelectItem,selectVm} = this.$options;
          selectVm.canBlur = false;
          selectVm.canShowItemsWhileTextChange = false;
          if(!unHide){
            selectVm.showItems = false;
          }
          if(lastSelectItem !== el){
            if(lastSelectItem){
              lastSelectItem.selected = false;
            }
            el.selected = true;
            this.$options.lastSelectItem = el;
            selectVm.text = el.text;
            selectVm.value = el.value;
          }
          selectVm.$nextTick(() => {
            selectVm.canBlur = true;
            selectVm.canShowItemsWhileTextChange = true;
          });
        },
        clearSelect(){
          let {lastSelectItem} = this.$options;
          if(lastSelectItem){
            lastSelectItem.selected = false;
          }
          this.$options.lastSelectItem = null;
        },
        resetPreSelect(){
          this.preSelIndex = -1;
        },
        preSelect(d){
          let len = this.data.length;
          if(len === 0) return;
          if(d > 0 && this.preSelIndex === len - 1){
            this.preSelIndex = -1;
          }else if(d < 0 && this.preSelIndex <= 0){
            this.preSelIndex = len;
          }
          this.preSelIndex += d;
        },
        setPreSelect(){
          if(this.preSelIndex === -1) return;
          let target = this.data[this.preSelIndex];
          if(target){
            this.clickItem(target);
            this.resetPreSelect();
          }
        },
        setValue(v){
          if(v === null){
            //清空
            this.clearSelect();
            return;
          }
          this.data.forEach((el) => {
            if(el.value === v){
              this.clickItem(el);
              return false;
            }
          });
        }
      }
    });
    var component = new comp().$mount();
    pNode.appendChild(component.$el);
    return component;
  }
};
export default Listgroup;