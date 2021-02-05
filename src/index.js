import Dialog from './components/dialog';
import Table from './components/table';
// import Select from './components/select';
// import Tree from './components/tree';
// import Tooltip from './components/tooltip';
// import Setting from './setting';
const components = [
  Dialog,Table
];
const install = function(app) {
  components.forEach(component => {
    app.use(component);
  });
  return app;
};
export default {
  version : '2.0.0',
  install,
  Dialog,
  Table
}