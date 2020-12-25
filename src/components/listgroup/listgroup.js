import Vue from 'vue';
import './listgroup.css';
const tpl = `<div class='list-group vb-list-group' v-show='show'
  :style="{left : left + 'px',top : top + 'px',width : width,'max-height' : maxHeight + 'px'}">
  <a v-for="el in data" href="javascript:void(0)" class="list-group-item" @click="clickItem(el)">{{el.text}}</a>
</div>`;
const Listgroup = {
  init(data){
    let comp = Vue.extend({
      template: tpl,
      //所绑定的select vm
      selectVm : null,
      data(){
        return {
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
        clickItem(el){
          this.show = false;
          this.$options.selectVm.setItem(el);
        }
      }
    });
    var component = new comp().$mount();
    document.body.appendChild(component.$el);
    return component;
  }
};
export default Listgroup;