import Vue from 'vue';
import {DomUtil} from 'vue-bootstrap/src/utils';
let template = `<div class="tooltip fade" :class="[position,isIn ? 'in' : '']" 
  :style="{left : left + 'px',top : top + 'px'}" @transitionend='transitionend'>
  <div class="tooltip-arrow"></div>
  <div class="tooltip-inner">
    {{message}}
  </div>
</div>`;
function create(){
  
}
const arrowSize = 5;
const Tooltip = {
  install(){
    Vue.directive("tooltip",{
      inserted(el,binding){
        let component = null;
        let position = binding.arg || 'top';
        el.addEventListener("mouseover",(e) => {
          if(component) return;
          let box = DomUtil.getElBox(el);
          let comp = Vue.extend({
            template,
            data(){
              return {
                position,
                isIn : false,
                left : -9999,
                top : -9999,
                message : binding.value
              };
            },
            methods : {
              transitionend(){
                if(!this.isIn){
                  document.body.removeChild(this.$el);
                  this.$destroy();
                }
              }
            }
          });
          component = new comp().$mount();
          document.body.appendChild(component.$el);
          let toolTipWidth = component.$el.offsetWidth;
          let toolTipHeight = component.$el.offsetHeight;
          let topBottomLeft = box.left + (box.width - toolTipWidth) / 2;
          let leftRightTop = box.top + (box.height - toolTipHeight) / 2;
          let left,top;
          switch(position){
            case 'top':
              left = topBottomLeft;
              top = box.top - (toolTipHeight  - arrowSize / 2);
              break;
            case 'left':
              left = box.left - (toolTipWidth - arrowSize / 2);
              top = leftRightTop;
              break;
            case 'bottom':
              left = topBottomLeft;
              top = box.top + box.height - arrowSize / 2;
              break;
            case 'right':
              left = box.left + box.width - arrowSize / 2;
              top = leftRightTop;
          }
          if(left === undefined){
            console.error("tooltip的position值错误");
            return;
          }
          component.left = left;
          component.top = top;
          component.$nextTick(() => {
            component.isIn = true;
          });
        });
        el.addEventListener("mouseout",(e) => {
          component.isIn = false;
          component = null;
        });
      }
    });
  }
};
export default Tooltip;