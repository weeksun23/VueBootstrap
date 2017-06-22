require("../../lib/bootstrap/css/bootstrap.css");
require("../../common/demo.css");
require("./index.css");
require("../../common/vueui/vueui");
var navData = [{
  title : "起始",
  children : [
    {title : '概述',$hash : "overview"}
  ]
},{
  title : 'UI组件',
  children : [
    {title : 'accordion'},
    {title : "dialog"}
  ]
}];
var initDemoData = [];
var pageObj = (function(navData){
  var re = {};
  for(var i=0,ii;ii=navData[i++];){
    for(var j=0,jj;jj=ii.children[j++];){
      re[jj.$hash || jj.title] = initDemoData.length;
      initDemoData.push({
        name : jj.title,
        html : "加载中...",
        $init : false,
        $hash : jj.$hash
      });
    }
  }
  return re;
})(navData);
function getSingleSpaces(space){
  var len = 0;
  for(var j=0;j<space.length;j++){
    var ch = space[j];
    if(ch === "\t"){
      len += 2;
    }else if(ch === " "){
      len++;
    }
  }
  return new Array(len + 1).join(" ");
}
function dealDemoHtml(html){
  var div = document.createElement("div");
  div.innerHTML = html;
  var divs = div.getElementsByTagName('*');
  for(var i=0,ii;ii=divs[i++];){
    if(ii.classList.contains("demo-code")){
      var str = ii.innerHTML;
      var arr = str.split("\n");
      for(var j=arr.length-1;j>=0;j--){
        var spaces = arr[j].match(/^\s+/);
        if(!spaces){
          arr.splice(j,1);
        }
      }
      var spaces = arr[0].match(/^\s+/);
      var singleSpaces = getSingleSpaces(spaces[0]);
      for(var j=0;j<arr.length;j++){
        spaces = arr[j].match(/^\s+/);
        var s = getSingleSpaces(spaces[0]).replace(singleSpaces,"");
        arr[j] = arr[j].replace(/^\s+/,s);
      }
      var textNode = document.createTextNode(arr.join("\n"));
      ii.innerHTML = '';
      ii.appendChild(textNode);
    }
  }
  return div.innerHTML;
}
var app = new Vue({
  el: '#app',
  data: {
    initData : navData,
    demoData : initDemoData,
    curIndex : -1
  },
  methods : {
    dealHashChange : function(){
      var page = location.hash.substring(1);
      var target = pageObj[page];
      if(target === undefined){
        page = 'overview';
        target = 0;
      }
      this.curIndex = target;
      var demo = this.demoData[target];
      if(!demo.$init){
        require(["../_components/" + page + "/" + page],function(demoOptions){
          demo.html = dealDemoHtml(demoOptions.html);
          demo.$init = true;
          Vue.nextTick(function(){
            demoOptions.init();
          });
        });
      }
      this.$refs.nav.findItem(function(item,itemIndex,panel,panelIndex){
        if((item.$hash || item.title) === page){
          this.selectPanel(panelIndex);
          this.selectItem(item);
          return true;
        }
      });
    },
  	onSelectItem : function(item){
      console.log('onSelectItem');
      location.hash = item.$hash || item.title;
    }
  }
});
Vue.nextTick(function(){
  window.onhashchange = function(){
    app.dealHashChange();
  };
  app.dealHashChange();
});