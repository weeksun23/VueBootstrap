require("./vue.accordion.css");
var tpl = require("./vue.accordion.html");
function findItem(vm,func){
	for(var i=0,ii;ii=vm.data[i++];){
		if(!ii.children) continue;
		for(var j=0,jj;jj=ii.children[j++];){
			if(func.call(vm,jj,i - 1)){
				return jj;
			}
		}
	}
	return null;
}
var defaultPanel = {
	title : '',
	content : '',
	iconCls : '',
	children : [],
	selected : false
};
var defaultItem = {
  iconCls : '',
  selected : false,
  title : ''
};
function togglePanel(el,panel){
  var content = panel.querySelector(".panel-collapse");
  var body = content.querySelector("div");
  if(el.selected){
    el.selected = false;
    content.style.height = body.offsetHeight + 'px';
    content.classList.add('collapsing');
    content.offsetHeight;
    content.style.height = '0px';
  }else{
    el.selected = true;
    content.classList.add("collapsing");
    content.classList.add("in");
    content.style.height = body.offsetHeight + 'px';
  }
}
Vue.component('vaccordion', {
  template: tpl,
  $lastSel : null,
  $lastSelPanel : null,
  props : {
  	initData : {
  		type : Array,
  		default : function(){
  			return [];
  		}
  	},
    multipleSel : {
      type : Boolean,
      default : false
    },
    onSelectItem : {
      type : Function,
      default : function(){}
    }
  },
  data : function(){
  	return {
  		data : this.initData
		};
  },
  methods : {
  	clickHeader : function(el,e){
      var panel = e.target ? e.target : e;
      panel = Vue.me.findParentByCls(panel,'panel');
      if(this.multipleSel){
        togglePanel(el,panel);
      }else{
        var lastSel = this.$options.$lastSel;
        if(lastSel){
          togglePanel(lastSel,this.$options.$lastSelPanel);
        }
        if(lastSel === el) {
          this.$options.$lastSel = null;
          this.$options.$lastSelPanel = null;
          return;
        }
        togglePanel(el,panel);
        this.$options.$lastSel = el;
        this.$options.$lastSelPanel = panel;
      }
  	},
    transitionend : function(el,e){
      var content = e.target;
      content.classList.remove("collapsing");
      if(content.style.height === '0px'){
        el.selected = false;
        content.classList.remove("in");
      }
      content.style.height = '';
    },
    //方法
    selectPanel : function(i){
      var el = this.data[i];
      if(el.selected) return;
      this.clickHeader(el,{
        target : this.$el.querySelectorAll(".panel")[i]
      });
    },
    //选中item
    selectItem : function(ch){
      if(ch.selected) return;
      var sel = this.getSelectedItem();
      sel && (sel.selected = false);
      ch.selected = true;
      this.onSelectItem(ch);
    },
    //func(item,itemIndex,panel,panelIndex)
    findItem : function(func){
      for(var i=0,ii;ii=this.data[i++];){
        if(!ii.children) continue;
        for(var j=0,jj;jj=ii.children[j++];){
          if(func.call(this,jj,j-1,ii,i - 1)){
            return jj;
          }
        }
      }
      return null;
    },
    //获取所选的panel下的子item
    getSelectedItem : function(){
      return this.findItem(function(jj){
        return jj.selected;
      });
    },
    //根据text选取item
    selectItemByText : function(text){
      return this.findItem(function(item,itemIndex,panel,panelIndex){
        if(item.title === text){
          this.curIndex = panelIndex;
          this.selectItem(item);
          return true;
        }
      });
    }
  },
  beforeCreate : function(){
    var propsData = this.$options.propsData;
    var initData = propsData.initData;
    if(initData && initData.length > 0){
      for(var i=0,panel;panel=initData[i++];){
        Vue.me.setObjDefaultAttrs(panel,defaultPanel);
        if(panel.children.length > 0){
          for(var j=0,item;item=panel.children[j++];){
            Vue.me.setObjDefaultAttrs(item,defaultItem);
          }
        }
      }
    }
  },
  mounted : function(){
  	if(this.data.length > 0) return;
  	var slots = this.$slots.default;
  	var data = [];
  	for(var i=0,slot;slot=slots[i++];){
  		if(slot.tag === 'div'){
  			data.push(Vue.me.setObjDefaultAttrs({
  				title  : slot.data.attrs.title,
  				content : slot.elm.innerHTML
  			},defaultPanel));
  		}
  	}
  	this.data = data;
  }
});