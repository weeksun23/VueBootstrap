!function(e){var t={};function n(o){if(t[o])return t[o].exports;var a=t[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(o,a,function(t){return e[t]}.bind(null,a));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="./",n(n.s=2)}([function(e,t){e.exports=void 0},function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",o=e[3];if(!o)return n;if(t&&"function"==typeof btoa){var a=(i=o,l=btoa(unescape(encodeURIComponent(JSON.stringify(i)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(l),"/*# ".concat(s," */")),r=o.sources.map((function(e){return"/*# sourceURL=".concat(o.sourceRoot||"").concat(e," */")}));return[n].concat(r).concat([a]).join("\n")}var i,l,s;return[n].join("\n")}(t,e);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,o){"string"==typeof e&&(e=[[null,e,""]]);var a={};if(o)for(var r=0;r<this.length;r++){var i=this[r][0];null!=i&&(a[i]=!0)}for(var l=0;l<e.length;l++){var s=[].concat(e[l]);o&&a[s[0]]||(n&&(s[2]?s[2]="".concat(n," and ").concat(s[2]):s[2]=n),t.push(s))}},t}},function(e,t,n){e.exports=n(7)},function(e,t){e.exports='<div class="panel panel-default vue-table"> <div class="panel-heading" v-if="title"> <h3 class="panel-title" v-html="title"></h3> </div> <div class="panel-body"> <div class="table-responsive" :class=\'{"vue-table-nowrap" : nowrap}\'> <table class="table" :class=\'{"table-striped" : striped,"table-bordered" : border}\'> <thead> <tr> <th v-for="el in columns" :style="{width:el.width + \'px\'}" @click="sort(el)" @mouseenter="hoverTh($event,\'add\')" @mouseleave="hoverTh($event,\'remove\')"> <div> {{el.title}} <span class="pull-right" v-if="el.sort" v-show="el.sortOrder"> <i class="glyphicon" :class="[\'glyphicon-triangle-\' + el.sortOrder]"></i> </span> </div> </th> </tr> </thead> <tbody> <tr v-for="(item,rowIndex) in rows" :class="{\'vue-table-tr-selected\':item._selected,\'vue-table-tr-parent\' : item._parent}" @click="toggleSelect(item,$event,rowIndex)" @mouseenter="hoverRow($event,\'add\')" @mouseleave="hoverRow($event,\'remove\')" v-show="!item.children || item.children.length === 0 || item._show"> <td v-if="item.children && item.children.length > 0" :colspan="columns.length"> <v-table :pagination="false" :init-front-page-data="item.children" :columns="columns" :title="item.title"></v-table> </td> <td v-if="!item.children || item.children.length === 0" v-for="(el,colIndex) in columns" :style=\'{width : el.width + "px"}\' :title="showColumnTitle ? el.title : \'\'" :class="{\'vue-table-checkbox\' : el.checkbox}" @click="clickTd(item,$event,rowIndex,colIndex)"> <label v-if="el.checkbox"> <input type="checkbox" v-model="item._selected"> </label> <div v-else-if="item._parent && colIndex === 0" class="vue-table-ch-head"> <i class="glyphicon" :class="[\'glyphicon-chevron-\' + (rows[rowIndex + 1]._show ? \'down\' : \'right\')]"></i> <span>{{item[el.field]}}</span> </div> <div v-else v-html="dealValue(item,el,rowIndex)" :style="el.style"></div> </td> </tr> </tbody> </table> </div> <h2 v-show="!rows || total === 0 || rows.length === 0" class="text-muted text-center">暂无数据</h2> </div> <div v-if="pagination" class="vue-pagination clearfix"> <div class="pull-left" onselectstart="return!1"> <button class="btn btn-default vue-pagination-first" type="button" :disabled="curPage <= 1" @click="toPage($event,\'first\')"> <i class="glyphicon glyphicon-backward"></i> </button> <button class="btn btn-default" type="button" :disabled="curPage <= 1" @click="toPage($event,-1)"> <i class="glyphicon glyphicon-chevron-left"></i> </button> <input class="form-control page" placeholder="页数" v-model.number="changeCurPage" @keydown.enter="toThePage"> <span>共{{sumPage}}页</span> <button class="btn btn-default" type="button" :disabled="curPage >= sumPage" @click="toPage($event,1)"> <i class="glyphicon glyphicon-chevron-right"></i> </button> <button class="btn btn-default vue-pagination-last" type="button" :disabled="curPage >= sumPage" @click="toPage($event,\'last\')"> <i class="glyphicon glyphicon-forward"></i> </button> </div> <div class="pull-right"> <span>当前第{{curPage}}页,{{start}}~{{end}}条,共{{total}}条</span> <select class="form-control" v-model="pageSize"> <option v-for="el in pageSizeArr" :value="el">{{el}}</option> </select> </div> </div> </div>'},function(e,t,n){var o=n(5),a=n(6);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[e.i,a,""]]);var r={insert:"head",singleton:!1};o(a,r);e.exports=a.locals||{}},function(e,t,n){"use strict";var o,a=function(){return void 0===o&&(o=Boolean(window&&document&&document.all&&!window.atob)),o},r=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}(),i=[];function l(e){for(var t=-1,n=0;n<i.length;n++)if(i[n].identifier===e){t=n;break}return t}function s(e,t){for(var n={},o=[],a=0;a<e.length;a++){var r=e[a],s=t.base?r[0]+t.base:r[0],c=n[s]||0,u="".concat(s," ").concat(c);n[s]=c+1;var d=l(u),f={css:r[1],media:r[2],sourceMap:r[3]};-1!==d?(i[d].references++,i[d].updater(f)):i.push({identifier:u,updater:g(f,t),references:1}),o.push(u)}return o}function c(e){var t=document.createElement("style"),o=e.attributes||{};if(void 0===o.nonce){var a=n.nc;a&&(o.nonce=a)}if(Object.keys(o).forEach((function(e){t.setAttribute(e,o[e])})),"function"==typeof e.insert)e.insert(t);else{var i=r(e.insert||"head");if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(t)}return t}var u,d=(u=[],function(e,t){return u[e]=t,u.filter(Boolean).join("\n")});function f(e,t,n,o){var a=n?"":o.media?"@media ".concat(o.media," {").concat(o.css,"}"):o.css;if(e.styleSheet)e.styleSheet.cssText=d(t,a);else{var r=document.createTextNode(a),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(r,i[t]):e.appendChild(r)}}function p(e,t,n){var o=n.css,a=n.media,r=n.sourceMap;if(a?e.setAttribute("media",a):e.removeAttribute("media"),r&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),e.styleSheet)e.styleSheet.cssText=o;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(o))}}var h=null,v=0;function g(e,t){var n,o,a;if(t.singleton){var r=v++;n=h||(h=c(t)),o=f.bind(null,n,r,!1),a=f.bind(null,n,r,!0)}else n=c(t),o=p.bind(null,n,t),a=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return o(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;o(e=t)}else a()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=a());var n=s(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var o=0;o<n.length;o++){var a=l(n[o]);i[a].references--}for(var r=s(e,t),c=0;c<n.length;c++){var u=l(n[c]);0===i[u].references&&(i[u].updater(),i.splice(u,1))}n=r}}}},function(e,t,n){"use strict";n.r(t);var o=n(1),a=n.n(o)()(!1);a.push([e.i,".vue-table.panel{\r\n\tborder: 0;position: relative;\r\n\tbox-shadow:none;margin-bottom: 0;\r\n\t-moz-box-shadow: none;\r\n\t-webkit-box-shadow:none;\r\n}\r\n.vue-table .table td{vertical-align: middle;}\r\n.vue-table.panel .panel-heading{border-width:1px 1px 0 1px;border-style: solid;}\r\n.vue-table .panel-body{padding:0;}\r\n.vue-table .table{margin-bottom:0}\r\n.vue-table .thead{background-color: #fff;}\r\n.vue-table .table-responsive{margin-bottom: 0;position: relative;}\r\n.vue-table .table-responsive th{padding: 0;}\r\n.vue-table .table-responsive th>div{padding: 8px;position: relative;}\r\n.vue-table .table-responsive.vue-table-nowrap{white-space: nowrap;}\r\n.vue-table h2{margin:0;padding:20px 0;border:1px solid #ddd;border-top:0}\r\n.vue-table .table-responsive .vue-table-tr-hover{background-color: #eee}\r\n.vue-table .table-responsive .vue-table-th-hover{background-color: #e2e2e2}\r\n.vue-table .table-responsive .vue-table-tr-selected{background-color: #FAF5B4}\r\n.vue-table-checkbox{width: 50px;text-align: center;}\r\n.vue-table-checkbox label{\r\n\tdisplay: block;\r\n}\r\n.vue-table-checkbox input{\r\n\twidth: 20px;height: 20px;\r\n}\r\n.vue-table-tr-parent > td:first-child{\r\n\tcursor: pointer;\r\n}\r\n.vue-table-ch-head>i,.vue-table-ch-head>span{\r\n\tvertical-align: middle;\r\n}\r\n.vue-pagination{margin-top: 5px;}\r\n.vue-pagination>div>span{display: inline-block;}\r\n.vue-pagination .form-control{display: inline-block;width: auto;}\r\n.vue-pagination input.form-control{vertical-align: middle;}\r\n.vue-pagination .glyphicon:hover{background-color: #e2e2e2}\r\n.vue-pagination .page{width: 80px}\r\n@media (max-width: 570px) {\r\n\t.vue-pagination .pull-right{display: none;}\r\n}\r\n@media (max-width: 340px) {\r\n\t.vue-pagination .vue-pagination-first,\r\n\t.vue-pagination .vue-pagination-last{display: none;}\r\n}\r\n.thead-fix{position: fixed;top: 0;}",""]),t.default=a},function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"modal fade",class:{in:e.isIn},style:{zIndex:e.zIndex,display:e.isOpen?"block":"none"},on:{click:e.close}},[n("div",{staticClass:"modal-dialog",on:{transitionend:e.transitionend}},[n("div",{staticClass:"modal-content"},[e.title?n("div",{staticClass:"modal-header"},[n("button",{staticClass:"close",attrs:{type:"button"},on:{click:function(t){return e.close(null)}}},[n("span",[e._v("×")])]),e._v(" "),n("h4",{staticClass:"modal-title"},[e._v(e._s(e.title))])]):e._e(),e._v(" "),e.content?e._e():n("div",{staticClass:"modal-body",style:e.bodyStyle},[e._t("default")],2),e._v(" "),e.content?n("div",{staticClass:"modal-body",style:e.bodyStyle,domProps:{innerHTML:e._s(e.content)}}):e._e(),e._v(" "),e.normalizedButtons&&e.normalizedButtons.length>0?n("div",{staticClass:"modal-footer",style:{"text-align":e.btnAlign}},e._l(e.normalizedButtons,(function(t,o){return n("button",{key:o,staticClass:"btn",class:["btn-"+t.theme],attrs:{type:"button"},on:{click:function(n){return e.clickBtn(t)}}},[t.iconCls?n("i",{staticClass:"glyphicon ",class:t.iconCls}):e._e(),e._v(" "+e._s(t.text)+"\n        ")])})),0):e._e()])])])};function a(e){var t=e.offsetTop;return null!=e.offsetParent&&(t+=a(e.offsetParent)),t}function r(e){var t=e.offsetLeft;return null!=e.offsetParent&&(t+=r(e.offsetParent)),t}o._withStripped=!0;var i={appendHTML(e,t){var n=document.createElement("div"),o=document.createDocumentFragment();n.innerHTML=t;for(var a,r=n.childNodes,i=0,l=r.length;i<l;i++){var s=r[i].cloneNode(!0);a||(a=s),o.appendChild(s)}return e.appendChild(o),a},findTargetParent(e,t){for(var n=typeof t;e;){if("function"==n){if(t(e))return e}else{if("string"!=n)throw new Error("vali参数非法");if(e.classList)for(var o,a=t.split(","),r=0;o=a[r++];)if(e.classList.contains(o))return e}if("string"==typeof e.tagName&&"body"===e.tagName.toLowerCase())return null;e=e.parentNode}return null},offsetEl:e=>({left:r(e),top:a(e)}),getElBox(e){var t=this.offsetEl(e);return{left:t.left,top:t.top,width:e.offsetWidth,height:e.offsetHeight}}},l=n(0),s=n.n(l),c={noop:function(){},setObjDefaultAttrs(e,t){for(var n in t)void 0===e[n]&&s.a.set(e,n,t[n])},paddingZero(e,t){var n=(e+="").length;return n>=(t=t||8)?e:new Array(t-n+1).join("0")+e}};var u={format(e,t,n){var o=function(e){if(!e)return null;if("object"==typeof e)if(e.getFullYear)var t=e;else{if(!e.time)return null;t=new Date(e.time)}else{if("number"!=typeof e&&"string"!=typeof e)return null;t=new Date(e)}return t}(e);return o?(t=t||"yyyyMMdd-hh:mm:ss").replace("yyyy",o.getFullYear()).replace("MM",n?o.getMonth()+1:c.paddingZero(o.getMonth()+1)).replace("dd",n?o.getDate():c.paddingZero(o.getDate())).replace("hh",n?o.getHours():c.paddingZero(o.getHours())).replace("mm",n?o.getMinutes():c.paddingZero(o.getMinutes())).replace("ss",n?o.getSeconds():c.paddingZero(o.getSeconds())):""}};let d=null,f={name:"VbDialog",computed:{normalizedButtons(){for(var e,t=this.buttons,n=s.a.component(f.name).defaultBtn,o=0;e=t[o++];)for(var a in n)void 0===e[a]&&(e[a]=n[a]);return t}},props:{title:{type:String,default:""},onBeforeClose:{type:Function,default:function(){}},onClose:{type:Function,default:function(){}},onBeforeOpen:{type:Function,default:function(){}},onOpen:{type:Function,default:function(){}},buttons:{type:Array,default:function(){return[]}},content:{type:String,default:""},bodyStyle:{type:String,default:""},btnAlign:{type:String,default:""}},beforeCreate(){null===d&&(i.appendHTML(document.body,"<div id='modalBackDrop' class='modal-backdrop fade' v-bind:class='{in : isIn}' v-on:transitionend='transitionend' v-show='visible'></div>"),d=new s.a({el:"#modalBackDrop",data:{isIn:!1,visible:!1,$curDialogs:[]},methods:{transitionend:function(){this.isIn||(this.visible=!1)}}}))},data:()=>({isOpen:!1,isIn:!1,zIndex:null,$isClosing:!1}),methods:{close:function(e){if((!e||e.target.classList.contains("modal"))&&!1!==this.onBeforeClose()&&!this.$isClosing){this.isIn=!1,this.$isClosing=!0;var t=d.$data.$curDialogs;t.pop();var n=t.length;n>0?t[n-1].zIndex=1050:(document.body.classList.remove("modal-open"),d.isIn=!1),this.onClose()}},transitionend:function(e){this.isIn?this.onOpen():(this.isOpen=!1,this.$isClosing=!1)},clickBtn:function(e){!1!==e.handler.call(this,e)&&e.close&&this.close()},open:function(){if(!1!==this.onBeforeOpen()){document.body.classList.add("modal-open"),this.isOpen=!0,d.visible=!0;var e=this;this.$nextTick((function(){e.$el.offsetWidth,d.$el.offsetWidth,e.isIn=!0,d.isIn=!0;var t=d.$data.$curDialogs,n=t.length;n>0&&(t[n-1].zIndex=1e3);t.push(e)}))}}}};var p=function(e,t,n,o,a,r,i,l){var s,c="function"==typeof e?e.options:e;if(t&&(c.render=t,c.staticRenderFns=n,c._compiled=!0),o&&(c.functional=!0),r&&(c._scopeId="data-v-"+r),i?(s=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),a&&a.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(i)},c._ssrRegister=s):a&&(s=l?function(){a.call(this,(c.functional?this.parent:this).$root.$options.shadowRoot)}:a),s)if(c.functional){c._injectStyles=s;var u=c.render;c.render=function(e,t){return s.call(t),u(e,t)}}else{var d=c.beforeCreate;c.beforeCreate=d?[].concat(d,s):[s]}return{exports:e,options:c}}(f,o,[],!1,null,null,null);p.options.__file="src/components/dialog/dialog.vue";var h=p.exports;h.install=function(e){e.component(h.name,h),e.component(h.name).defaultBtn={close:!1,theme:"default",handler:function(){},text:"",iconCls:""}};var v=h,g=n(3);n(4);var b={field:"",formatter:c.noop,title:"",width:null,sort:!1,checkbox:!1,sortOrder:"",style:{}};function m(e){for(var t,n={_selected:!1,_parent:!1},o=0;t=e[o++];)c.setObjDefaultAttrs(t,n);for(o=e.length-1;o>=0;o--){var a=e[o];if(a.children&&a.children.length>0)for(var r in a._parent=!0,e.splice(o+1,0,{children:a.children,title:a.children_title,_show:!1}),a)/^children/.test(r)&&delete a[r]}}function y(e,t,n){e.url?function(e,t,n){var o={};o[e.pageNoKey]=t,o[e.pageSizeKey]=e.pageSize,Object.assign(o,n),Object.assign(e.queryParams,o),e.queryParams[e.pageNoKey]--,s.a["GET"===e.method.toUpperCase()?"ajaxGet":"ajaxPost"](e.url,e.queryParams,(function(n,o){if(n)e.rows=[],e.total=0,e.changeCurPage=e.curPage=1,x(e),e.onLoadError(n);else{if(e.loadFilter&&(o=e.loadFilter.call(e,o)),e.onLoadSuccess(o),!o)return(r=e).rows=[],void(r.total=0);var a=o[e.rowsKey];m(a),e.rows=a,e.total=o[e.totalKey],e.changeCurPage=e.curPage=t,x(e)}var r}))}(e,t):w(e,t,n)}function w(e,t,n){if(!e.frontPageData)throw new Error("若不定义url，则请将数据源赋值给frontPageData属性");e.curPage=e.changeCurPage=t,x(e);var o=(t-1)*e.pageSize;o>=e.total&&(o=(e.sumPage-1)*e.pageSize);for(var a=o+e.pageSize,r=[];o<a;o++){var i=e.frontPageData[o];if(!i)break;r.push(i)}e.rows=r,n&&n()}function x(e){var t=e.total;if(0===t)for(var n,o=["sumPage","total","curPage","start","end"],a=0;n=o[a++];)e[n]=0;else e.sumPage=parseInt(t/e.pageSize,10)+(t%e.pageSize>0?1:0),0===e.curPage?e.changeCurPage=e.curPage=1:e.curPage>e.sumPage&&(e.changeCurPage=e.curPage=e.sumPage),e.start=1+e.pageSize*(e.curPage-1),e.start+e.pageSize>t?e.end=t:e.end=e.start+e.pageSize-1}var S={name:"VbTable",template:g,$lastSelect:null,props:{method:{type:String,default:"GET"},queryParams:{type:Object,default:function(){return{}}},title:{type:String,default:""},striped:{type:Boolean,default:!0},border:{type:Boolean,default:!0},initUrl:{type:String,default:""},totalKey:{type:String,default:"totalElements"},rowsKey:{type:String,default:"content"},columns:{type:Array,default:function(){return[]}},initFrontPageData:{type:Array,default:function(){return[]}},initSingleSelect:{type:Boolean,default:!0},pagination:{type:Boolean,default:!0},initPageSize:{type:Number,default:20},pageSizeArr:{type:Array,default:function(){return[20,40,60,80,100]}},nowrap:{type:Boolean,default:!1},showColumnTitle:{type:Boolean,default:!0},loadFilter:{type:Function,default:null},pageNoKey:{type:String,default:"page"},pageSizeKey:{type:String,default:"size"},onLoadSuccess:{type:Function,default:function(){}},onLoadError:{type:Function,default:function(){}},onSelect:{type:Function,default:function(){}},onClickTdBtn:{type:Function,default:function(){}}},data:function(){return{url:this.initUrl,singleSelect:!0,sumPage:0,curPage:0,changeCurPage:1,start:0,end:0,pageSize:this.initPageSize,frontPageData:this.initFrontPageData,rows:[],total:0}},methods:{clickTd:function(e,t,n,o){if(0===o&&e._parent){var a=this.rows[n+1];a._show=!a._show}var r=this,l=t.target;i.findTargetParent(l,(function(t){var o=t.getAttribute("data-method"),a=t.getAttribute("data-field");if(o)return r.onClickTdBtn(o,e[a],e,n),!0}))},toThePage:function(){y(this,this.changeCurPage||1)},sort:function(e){e.sort&&("bottom"===e.sortOrder?e.sortOrder="top":e.sortOrder="bottom")},toggleSelect:function(e,t,n){var o=t.target;i.findTargetParent(o,"vue-table-checkbox")?e._selected&&this.onSelect(e):this.singleSelect?e._selected?(e._selected=!1,this.$options.$lastSelect=null):(this.$options.$lastSelect&&(this.$options.$lastSelect._selected=!1),e._selected=!0,this.$options.$lastSelect=e,this.onSelect(e)):(e._selected=!e._selected,e._selected&&this.onSelect(e))},dealValue:function(e,t,n){var o=e[t.field];return t.formatter&&t.formatter!==c.noop?t.formatter(o,e,n):null==o?"":o},hoverTh:function(e,t){e.target.classList[t]("vue-table-th-hover")},hoverRow:function(e,t){e.target.classList[t]("vue-table-tr-hover")},toPage:function(e,t){if(!e.currentTarget.disabled){if("number"==typeof t)var n=this.curPage+t;else"first"==t?n=1:"last"==t&&(n=this.sumPage);y(this,n)}},reload:function(){y(this,this.curPage)},load:function(e){y(this,e||1)},getRow:function(e){return this.rows[e]},getSelected:function(){for(var e,t=this.rows,n=0;e=t[n++];)if(e._selected)return e;return null},getSelections:function(){for(var e,t=[],n=0;e=rows[n++];)e._selected&&t.push(e);return t},loadFrontPageData:function(e){if(this.url)throw new Error("table已定义url不能再加载前台分页数据");this.frontPageData=e,this.total=e.length,m(e),w(this,1)}},watch:{pageSize:function(){y(this,1)}},beforeCreate:function(){var e=this.$options.propsData,t=e.columns;if(t&&t.length>0&&function(e){for(var t,n=0;t=e[n++];)for(var o in b)void 0===t[o]?s.a.set(t,o,b[n]):"formatter"===o&&("datetime"===t.formatter?t.formatter=function(e){return u.format(e)}:"date"===t.formatter&&(t.formatter=function(e){return u.format(e,"yyyy-MM-dd")}))}(t),!e.url){var n=e.initFrontPageData;n&&m(n)}},created:function(){this.url||(this.total=this.frontPageData.length,w(this,1));for(var e,t=0;e=this.columns[t++];)if(e.checkbox){this.singleSelect=!1;break}},mounted:function(){this.url&&y(this,1)},install:function(e){e.component(S.name,S)}};const P=[v],_=function(e){P.forEach(t=>{t.install(e)})};"undefined"!=typeof window&&window.Vue&&_(window.Vue);t.default={version:"1.0.0",install:_,Dialog:v}}]);