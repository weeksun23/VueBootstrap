import {DomUtil} from 'vue-bootstrap/src/utils';
import Vue from 'vue';
import './dropdown.css';
//class dropdown-menu中默认display:none，所以不能用v-show控制其显示隐藏
const tpl = `<div class='vb-select' v-show='show'
  :style="{left : left + 'px',top : top + 'px',width : width,'max-height' : maxHeight + 'px'}">
  <ul class='dropdown-menu'>
    <li v-for="el in data"><a href='javascript:void(0)'>{{el.text}}</a></li>
  </ul>
</div>`;
const Dropdown = {
  init(data){
    let comp = Vue.extend({
      template: tpl,
      data(){
        return {
          data : data,
          left : 0,
          top : 0,
          show : false,
          width : 'auto',
          //最大高度，ul高度超过该高度则自动滚动
          maxHeight : 300
        };
      },
      methods : {
        destroy(){
          document.body.removeChild(this.$el);
          this.$destroy();
        }
      }
    });
    var component = new comp().$mount();
    document.body.appendChild(component.$el);
    return component;
  }
};
export default Dropdown;