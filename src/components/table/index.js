import VbTable from './table';
VbTable.install = function(app) {
  app.component(VbTable.name, VbTable);
};
export default VbTable;