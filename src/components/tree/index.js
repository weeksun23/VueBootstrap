import VbTree from './tree';
VbTree.install = function(app) {
  app.component(VbTree.name, VbTree);
};
export default VbTree;