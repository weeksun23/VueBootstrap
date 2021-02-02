import VbDialog from './dialog';
VbDialog.install = function(app) {
  app.component(VbDialog.name, VbDialog);
};
export default VbDialog;