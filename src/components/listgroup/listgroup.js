import Vue from 'vue';
import './listgroup.css';
const tpl = `<div class='list-group vb-list-group' v-show='show'
  :style="{left : left + 'px',top : top + 'px',width : width,'max-height' : maxHeight + 'px'}">
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
  init(data){
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
          top : 0,
          show : false,
          width : 'auto',
          //最大高度，列表项总高度超过该高度则自动滚动
          maxHeight : 300
        };
      },
      methods : {
        destroy(){
          document.body.removeChild(this.$el);
          this.$destroy();
        },
        setData(data){
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
          if(!unHide){
            this.show = false;
          }
          if(lastSelectItem !== el){
            if(lastSelectItem){
              lastSelectItem.selected = false;
            }
            el.selected = true;
            this.$options.lastSelectItem = el;
            selectVm.setItem(el);
          }
          selectVm.canBlur = true;
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
            this.clickItem(target,true);
            this.resetPreSelect();
          }
        }
      }
    });
    var component = new comp().$mount();
    document.body.appendChild(component.$el);
    return component;
  }
};
export default Listgroup;