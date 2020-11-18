import Dialog from './components/dialog';
import {DomUtil} from './utils';

const components = [
  Dialog
];
const install = function(Vue) {
  components.forEach(component => {
    component.install(Vue);
  });
};
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export default {
  version : '1.0.0',
  install,
  Dialog,
  DomUtil
}