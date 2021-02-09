import ListgroupConstructor from './listgroup';
import {h,render} from 'vue';
const Listgroup = {
  init(data,pNode){
    pNode = pNode || document.body;
    let container = document.createElement("div");
    const vnode = h(ListgroupConstructor,{
      onDestroy(){
        //destroy事件，由select触发
        console.log('listgroup destroy');
        render(null,container);
        container = null;
      }
    });
    render(vnode, container);
    pNode.appendChild(container.firstElementChild);
    let proxy = vnode.component.proxy;
    //init listgroup data
    proxy.setData(data);
    return proxy;
  }
};
export default Listgroup;