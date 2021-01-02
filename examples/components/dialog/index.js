import Util from '../../util';
import demoHtmls from './demos.html';
let templates = demoHtmls.split("SPLIT");
function getMixin1(){
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
function getMixin2(){
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
const data = [{
  title : '初始化',htmlCode : templates[0],
  jsCode : getMixin1.toString()
},{
  title : '嵌套dialog',htmlCode : templates[1],
  jsCode : getMixin2.toString()
}];
export default{
  template : `<div class='doc'>
    <demo :title='data[0].title' :html-code="data[0].htmlCode" :js-code="data[0].jsCode">${templates[0]}</demo>
    <demo :title='data[1].title' :html-code="data[1].htmlCode" :js-code="data[1].jsCode">${templates[1]}</demo>
    <h2>props</h2>
		<vb-table :columns="propColumns" :pagination='false' :init-front-page-data="propData"></vb-table>
		<h2>methods</h2>
		<vb-table :columns="methodsColumns" :pagination='false' :init-front-page-data="methodsData"></vb-table>
  </div>`,
  mixins : [getMixin1(),getMixin2(),Util.getColumnsMixin()],
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
}