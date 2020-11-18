!function(t){var n={};function e(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,e),i.l=!0,i.exports}e.m=t,e.c=n,e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:o})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var i in t)e.d(o,i,function(n){return t[n]}.bind(null,i));return o},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="/",e(e.s=0)}([function(t,n,e){"use strict";e.r(n);var o=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"modal fade",class:{in:t.isIn},style:{zIndex:t.zIndex,display:t.isOpen?"block":"none"},on:{click:t.close}},[e("div",{staticClass:"modal-dialog",on:{transitionend:t.transitionend}},[e("div",{staticClass:"modal-content"},[t.title?e("div",{staticClass:"modal-header"},[e("button",{staticClass:"close",attrs:{type:"button"},on:{click:function(n){return t.close(null)}}},[e("span",[t._v("×")])]),t._v(" "),e("h4",{staticClass:"modal-title"},[t._v(t._s(t.title))])]):t._e(),t._v(" "),t.content?t._e():e("div",{staticClass:"modal-body",style:t.bodyStyle},[t._t("default")],2),t._v(" "),t.content?e("div",{staticClass:"modal-body",style:t.bodyStyle,domProps:{innerHTML:t._s(t.content)}}):t._e(),t._v(" "),t.normalizedButtons&&t.normalizedButtons.length>0?e("div",{staticClass:"modal-footer",style:{"text-align":t.btnAlign}},t._l(t.normalizedButtons,(function(n,o){return e("button",{key:o,staticClass:"btn",class:["btn-"+n.theme],attrs:{type:"button"},on:{click:function(e){return t.clickBtn(n)}}},[n.iconCls?e("i",{staticClass:"glyphicon ",class:n.iconCls}):t._e(),t._v(" "+t._s(n.text)+"\n        ")])})),0):t._e()])])])};function i(t){var n=t.offsetTop;return null!=t.offsetParent&&(n+=i(t.offsetParent)),n}function s(t){var n=t.offsetLeft;return null!=t.offsetParent&&(n+=s(t.offsetParent)),n}o._withStripped=!0;const l={appendHTML(t,n){var e=document.createElement("div"),o=document.createDocumentFragment();e.innerHTML=n;for(var i,s=e.childNodes,l=0,r=s.length;l<r;l++){var a=s[l].cloneNode(!0);i||(i=a),o.appendChild(a)}return t.appendChild(o),i},findTargetParent(t,n){for(var e=typeof n;t;){if("function"==e){if(n(t))return t}else{if("string"!=e)throw new Error("vali参数非法");if(t.classList)for(var o,i=n.split(","),s=0;o=i[s++];)if(t.classList.contains(o))return t}if("string"==typeof t.tagName&&"body"===t.tagName.toLowerCase())return null;t=t.parentNode}return null},offsetEl:t=>({left:s(t),top:i(t)}),getElBox(t){var n=this.offsetEl(t);return{left:n.left,top:n.top,width:t.offsetWidth,height:t.offsetHeight}}};let r=null;var a=function(t,n,e,o,i,s,l,r){var a,d="function"==typeof t?t.options:t;if(n&&(d.render=n,d.staticRenderFns=e,d._compiled=!0),o&&(d.functional=!0),s&&(d._scopeId="data-v-"+s),l?(a=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(l)},d._ssrRegister=a):i&&(a=r?function(){i.call(this,(d.functional?this.parent:this).$root.$options.shadowRoot)}:i),a)if(d.functional){d._injectStyles=a;var c=d.render;d.render=function(t,n){return a.call(n),c(t,n)}}else{var u=d.beforeCreate;d.beforeCreate=u?[].concat(u,a):[a]}return{exports:t,options:d}}({name:"VbDialog",computed:{normalizedButtons(){for(var t,n=this.buttons,e=Vue.component(VBDialog.name).defaultBtn,o=0;t=n[o++];)for(var i in e)void 0===t[i]&&(t[i]=e[i]);return n}},props:{title:{type:String,default:""},onBeforeClose:{type:Function,default:function(){}},onClose:{type:Function,default:function(){}},onBeforeOpen:{type:Function,default:function(){}},onOpen:{type:Function,default:function(){}},buttons:{type:Array,default:function(){return[]}},content:{type:String,default:""},bodyStyle:{type:String,default:""},btnAlign:{type:String,default:""}},beforeCreate(){null===r&&(l.appendHTML(document.body,"<div id='modalBackDrop' class='modal-backdrop fade' v-bind:class='{in : isIn}' v-on:transitionend='transitionend' v-show='visible'></div>"),r=new Vue({el:"#modalBackDrop",data:{isIn:!1,visible:!1,$curDialogs:[]},methods:{transitionend:function(){this.isIn||(this.visible=!1)}}}))},data:()=>({isOpen:!1,isIn:!1,zIndex:null,$isClosing:!1}),methods:{close:function(t){if((!t||t.target.classList.contains("modal"))&&!1!==this.onBeforeClose()&&!this.$isClosing){this.isIn=!1,this.$isClosing=!0;var n=r.$data.$curDialogs;n.pop();var e=n.length;e>0?n[e-1].zIndex=1050:(document.body.classList.remove("modal-open"),r.isIn=!1),this.onClose()}},transitionend:function(t){this.isIn?this.onOpen():(this.isOpen=!1,this.$isClosing=!1)},clickBtn:function(t){!1!==t.handler.call(this,t)&&t.close&&this.close()},open:function(){if(!1!==this.onBeforeOpen()){document.body.classList.add("modal-open"),this.isOpen=!0,r.visible=!0;var t=this;Vue.nextTick((function(){t.$el.offsetWidth,r.$el.offsetWidth,t.isIn=!0,r.isIn=!0;var n=r.$data.$curDialogs,e=n.length;e>0&&(n[e-1].zIndex=1e3);n.push(t)}))}}}},o,[],!1,null,null,null);a.options.__file="src/components/dialog/dialog.vue";var d=a.exports;d.install=function(t){t.component(d.name,d),t.component(d.name).defaultBtn={close:!1,theme:"default",handler:function(){},text:"",iconCls:""}};var c=d;const u=[c],f=function(t){u.forEach(n=>{n.install(t)})};"undefined"!=typeof window&&window.Vue&&f(window.Vue);n.default={version:"1.0.0",install:f,Dialog:c,DomUtil:l}}]);