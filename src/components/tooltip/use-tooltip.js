import {h,render,nextTick} from 'vue';
import {DomUtil,CommonUtil} from 'vue-bootstrap/src/utils';
import TooltipConstructor from './tooltip';
const arrowSize = 0;
const Tooltip = {
  install(app){
    app.directive("tooltip",{
      mounted(el,binding){
        let component = null;
        let position = binding.arg || 'top';
        el.addEventListener("mouseover",(e) => {
          if(component) return;
          let box = DomUtil.getElBox(el);
          let container = document.createElement("div");
          const vnode = h(TooltipConstructor,{
            onDestroy(){
              CommonUtil.log('tooltip destroy');
              render(null, container);
              container = null;
            }
          });
          render(vnode, container);
          document.body.appendChild(container.firstElementChild);
          component = vnode.component.proxy;
          component.position = position;
          component.message = binding.value;
          component.show = true;
          nextTick(() => {
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
              case 'start':
                left = box.left - (toolTipWidth - arrowSize / 2);
                top = leftRightTop;
                break;
              case 'bottom':
                left = topBottomLeft;
                top = box.top + box.height - arrowSize / 2;
                break;
              case 'end':
                left = box.left + box.width - arrowSize / 2;
                top = leftRightTop;
            }
            if(left === undefined){
              console.error("tooltip的position值错误");
              return;
            }
            component.left = left;
            component.top = top;
          });
        });
        el.addEventListener("mouseout",(e) => {
          component.show = false;
          component = null;
        });
      }
    });
  }
};
export default Tooltip;