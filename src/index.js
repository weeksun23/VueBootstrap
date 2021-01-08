import Dialog from './components/dialog';
import Table from './components/table';
import Select from './components/select';
import Tree from './components/tree';
import Tooltip from './components/tooltip';
import Setting from './setting';
const components = [
  Dialog,Table,Select,Tree,Tooltip
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
  Select,
  Tree,
  Tooltip,
  Setting
}