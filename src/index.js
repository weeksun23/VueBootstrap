import Dialog from './components/dialog';
import Table from './components/table';
const components = [
  Dialog,Table
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
  Table
}