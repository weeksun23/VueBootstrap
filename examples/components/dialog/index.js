import Util from '../../util';
import demos from './demos.html';
import {defineComponent} from 'vue';
const data = [{
  title : '初始化',
  jsCode(){
    return {
      data(){
        return {
          buttons1 : [{text : 'ok',close : true}]
        }
      },
      methods : {
        showDialog1 : function(){
          this.$refs.dialog1.open();
        }
      }
    };
  }
},{
  title : '嵌套dialog',
  jsCode(){
    return {
      data(){
        return {
          buttons2 : [{text : 'ok',close : true}],
        }
      },
      methods : {
        showDialog2 : function(){
          this.$refs.dialog2.open();
        },
        showDialog3 : function(){
          this.$refs.dialog3.open();
        }
      }
    }
  }
},{
  title : '静态dialog',
  jsCode(){
    return {
      data(){
        return {
          buttons3 : [{text : 'ok',close : true}],
        }
      },
      methods : {
        showDialog4: function(){
          this.$refs.dialog4.open();
        }
      }
    }
  }
},{
  title : '长内容dialog',
  jsCode(){
    return {
      data(){
        return {}
      },
      methods : {
        showDialog5: function(){
          this.$refs.dialog5.open();
        }
      }
    }
  }
},{
  title : '长内容dialog(scroll body)',
  jsCode(){
    return {
      data(){
        return {}
      },
      methods : {
        showDialog6: function(){
          this.$refs.dialog6.open();
        }
      }
    }
  }
},{
  title : '垂直居中',
  jsCode(){
    return {
      data(){
        return {}
      },
      methods : {
        showDialog7: function(){
          this.$refs.dialog7.open();
        }
      }
    }
  }
},{
  title : '尺寸',
  jsCode(){
    return {
      data(){
        return {}
      },
      methods : {
        showSizeDialog: function(size){
          this.$refs[size + 'Dialog'].open();
        }
      }
    }
  }
}];
export default defineComponent({
  ...Util.getDemoOptions(data,demos,`<h2>props</h2>
    <vb-table :columns="propColumns" :pagination='false' :init-front-page-data="propData" :striped='false'></vb-table>
    <h2 class='mt-3'>methods</h2>
    <vb-table :columns="methodsColumns" :pagination='false' :init-front-page-data="methodsData" :striped='false'></vb-table>`),
  data(){
    return {
      data,
      propData : [{
        name : 'title',type : 'String',defaultVal : "''",desc : '表格标题'
      },{
        name : 'buttons',type : 'Array',defaultVal : '[]',desc : '对话框按钮组',
        children_title : '按钮项说明',
        children : [{
          name : 'close',type : 'boolean',defaultVal : 'false',desc : '点击按钮后是否自动关闭窗口'
        },{
          name : 'theme',type : 'String',defaultVal : 'default',desc : '按钮bootstrap样式'
        },{
          name : 'handler',type : 'Function',defaultVal : '空函数',desc : '点击按钮事件，this指向当前dialog实例'
        },{
          name : 'text',type : 'String',defaultVal : "''",desc : '按钮文字'
        },{
          name : 'iconCls',type : 'String',defaultVal : "''",desc : '按钮iconfont图标'
        }]
      },{
        name : 'content',type : 'String',defaultVal : "''",desc : '窗口内容HTML'
      },{
        name : 'bodyStyle',type : 'String',defaultVal : "''",desc : '窗口内容区域内联样式'
      },{
        name : 'btnAlign',type : 'String',defaultVal : "''",desc : '按钮对齐方式，为空默认bootstrap样式'
      },{
        name : 'onBeforeClose',type : 'Function',defaultVal : "空函数",desc : '关闭窗口前触发，若返回false终止关闭'
      },{
        name : 'onClose',type : 'Function',defaultVal : "空函数",desc : '关闭窗口事件，关闭动画开始前触发'
      },{
        name : 'onBeforeOpen',type : 'Function',defaultVal : "空函数",desc : '打开窗口前触发，若返回false终止打开'
      },{
        name : 'onOpen',type : 'Function',defaultVal : "空函数",desc : '打开窗口事件，打开动画结束后触发'
      }],
      methodsData : [{
        name : 'open',params : 'none',returnVal : 'none',desc : '打开窗口'
      },{
        name : 'close',params : 'none',returnVal : 'none',desc : '关闭窗口'
      }]
    }
  },
  methods : {
  }
});