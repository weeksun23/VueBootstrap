import VBDialog from './dialog';
VBDialog.install = function(Vue) {
  Vue.component(VBDialog.name, VBDialog);
  var defaultBtn = Vue.component(VBDialog.name).defaultBtn = {
    close : false,
    theme : 'default',
    handler : function(){},
    text : "",
    iconCls : ''
  };
  Vue.me.appendHTML(document.body,"<div id='modalBackDrop' class='modal-backdrop fade' "+
    "v-bind:class='{in : isIn}' v-on:transitionend='transitionend' v-show='visible'></div>");
  var modalBackDropVm = new Vue({
    el: '#modalBackDrop',
    data: {
      isIn : false,
      visible : false,
      $curDialogs : []
    },
    methods : {
      transitionend : function(){
        if(!this.isIn){
          this.visible = false;
        }
      }
    }
  });
};
export default VBDialog;