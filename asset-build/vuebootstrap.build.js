(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vuebootstrap"],{

/***/ "./src/components/dialog/index.js":
/*!****************************************!*\
  !*** ./src/components/dialog/index.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
!(function webpackMissingModule() { var e = new Error("Cannot find module './dialog'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());

!(function webpackMissingModule() { var e = new Error("Cannot find module './dialog'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).install = function(Vue) {
  Vue.component(!(function webpackMissingModule() { var e = new Error("Cannot find module './dialog'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).name, !(function webpackMissingModule() { var e = new Error("Cannot find module './dialog'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
  Vue.component(!(function webpackMissingModule() { var e = new Error("Cannot find module './dialog'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).name).defaultBtn = {
    close : false,
    theme : 'default',
    handler : function(){},
    text : "",
    iconCls : ''
  };
};
/* harmony default export */ __webpack_exports__["default"] = (!(function webpackMissingModule() { var e = new Error("Cannot find module './dialog'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/dialog */ "./src/components/dialog/index.js");


const components = [
  _components_dialog__WEBPACK_IMPORTED_MODULE_0__["default"]
];
const install = function(Vue) {
  components.forEach(component => {
    component.install(Vue);
  });
};
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
/* harmony default export */ __webpack_exports__["default"] = ({
  version : '1.0.0',
  install,
  Dialog: _components_dialog__WEBPACK_IMPORTED_MODULE_0__["default"]
});

/***/ })

},[["./src/index.js","common"]]]);
//# sourceMappingURL=vuebootstrap.build.js.map