import VbDialog from './dialog';
VbDialog.install = function(Vue) {
	VbDialog.Vue = Vue;
  Vue.component(VbDialog.name, VbDialog);
  Vue.component(VbDialog.name).defaultBtn = {
    close : false,
    theme : 'default',
    handler : function(){},
    text : "",
    iconCls : ''
  };
};
export default VbDialog;