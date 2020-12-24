import Dialog from './components/dialog';
import Table from './components/table';
import Select from './components/select';
const components = [
  Dialog,Table,Select
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
  Table,
  Select
}