import Util from '../../util';
import demos from './demos.html';
const data = [{
  title : '初始化',
  jsCode(){
    return {
      data(){
        return {
          columns : [{
            title : "a1",field : "a1"
          },{
            title : "a2",field : "a2"
          },{
            title : "a3",field : "a3"
          },{
            title : "oper",field : "oper",formatter : function(v,r,i){
              return "<button class='btn btn-primary' data-method='add' data-field='a4'>添加</button>" + 
              "<button class='btn btn-primary' data-method='edit' data-field='a4'>编辑</button>";
            }
          }],
          pageSizeArr : [5,10,20],
          pageSize : 5,
          frontPageData : (function(){
            var re = [{
              a1 : "children属性演示",
              a2 : "--",
              a3 : '--',
              children_title : 'children列表',
              children : [{
                a1 : 'ch1',a2 : 'ch1',a3 : 'ch1'
              },{
                a1 : 'ch2',a2 : 'ch2',a3 : 'ch2'
              }]
            }];
            for(var i=0;i<100;i++){
              re.push({
                a1 : i,
                a2 : parseInt(Math.random() * 10000),
                a3 : parseInt(Math.random() * 100)
              });
            }
            return re;
          })(),
        }
      },
      methods : {
        onClickTdBtn : function(method,v,r,i){
          console.log(method,v,r,i);
        }
      }
    };
  }
}];
export default{
  ...Util.getDemoOptions(data,demos,`<h2>props</h2>
    <vb-table :columns="propColumns" :pagination='false' :init-front-page-data="propData" :striped='false'></vb-table>
    <h2 class='mt-3'>methods</h2>
    <vb-table :columns="methodsColumns" :pagination='false' :init-front-page-data="methodsData" :striped='false'></vb-table>
    <h2 class='mt-3'>data</h2>
		<vb-table :columns="propColumns" :pagination='false' :init-front-page-data="dataAttr" :striped='false'></vb-table>`),
  data(){
    return {
      data,
      propData : [{
        name : 'method',type : 'String',defaultVal : "GET",desc : 'ajax请求数据方式,暂时只支持get和post'
      },{
        name : 'queryParams',type : 'Object',defaultVal : "{}",desc : 'ajax请求参数对象'
      },{
        name : 'title',type : 'String',defaultVal : "''",desc : '表格标题'
      },{
        name : 'striped',type : 'Boolean',defaultVal : "true",desc : '是否隔行显示不同颜色'
      },{
        name : 'border',type : 'Boolean',defaultVal : "true",desc : '是否带边框'
      },{
        name : 'initUrl',type : 'String',defaultVal : "''",desc : 'ajax请求数据链接;当定义了该属性后，表格初始化后自动发送请求获取数据'
      },{
        name : 'totalKey',type : 'String',defaultVal : "totalElements",desc : 'ajax请求返回数据总数目的key值'
      },{
        name : 'rowsKey',type : 'String',defaultVal : "content",desc : 'ajax请求返回当前页数据的key值'
      },{
        name : 'columns',type : 'Array',defaultVal : "[]",desc : '表格列数组',
        children_title : '列对象说明',
        children : [{
          name : 'title',type : 'String',defaultVal : "''",desc : '列标题'
        },{
          name : 'field',type : 'String',defaultVal : "''",desc : '字段名'
        },{
          name : 'formatter',type : 'String|Function',defaultVal : "空函数",desc : '字段值格式化函数'
        },{
          name : 'width',type : 'Number',defaultVal : "null",desc : '列宽度'
        },{
          name : 'sort',type : 'Boolean',defaultVal : "false",desc : '是否排序字段(开发中)'
        },{
          name : 'checkbox',type : 'Boolean',defaultVal : "false",desc : '是否复选框字段'
        },{
          name : 'sortOrder',type : 'String',defaultVal : "''",desc : '排序order(开发中)'
        },{
          name : 'style',type : 'Object',defaultVal : "{}",desc : '单元格div上的style'
        }]
      },{
        name : 'initFrontPageData',type : 'Array',defaultVal : "[]",desc : '若initUrl为空，则取该数据作为表格数据'
      },{
        name : 'initSingleSelect',type : 'Boolean',defaultVal : "true",desc : '是否只能同时选择一行'
      },{
        name : 'pagination',type : 'Boolean',defaultVal : "true",desc : '是否显示分页组件'
      },{
        name : 'initPageSize',type : 'Number',defaultVal : "20",desc : '默认每页显示多少条记录'
      },{
        name : 'pageSizeArr',type : 'Array',defaultVal : "[20,40,60,80,100]",desc : '可供选择的每页总记录数数组'
      },{
        name : 'nowrap',type : 'Boolean',defaultVal : "false",desc : '表格内容是否不换行'
      },{
        name : 'showColumnTitle',type : 'Boolean',defaultVal : "true",desc : '鼠标悬留在单元格上时是否显示提示'
      },{
        name : 'loadFilter',type : 'Function(resp)',defaultVal : "null",desc : '对ajax请求返回数据加工处理的函数，必须返回包含rowsKey和totalKey的键值对象'
      },{
        name : 'pageNoKey',type : 'String',defaultVal : "page",desc : 'ajax请求参数当前页码的key值'
      },{
        name : 'pageSizeKey',type : 'String',defaultVal : "size",desc : 'ajax请求参数每页记录数的key值'
      },{
        name : 'onLoadSuccess',type : 'Function(resp:返回数据)',defaultVal : "空函数",desc : 'ajax请求成功回调'
      },{
        name : 'onLoadError',type : 'Function(resp:错误对象)',defaultVal : "空函数",desc : 'ajax请求失败回调'
      },{
        name : 'onSelect',type : 'Function(row:行对象)',defaultVal : "空函数",desc : 'ajax请求成功回调'
      },{
        name : 'onClickTdBtn',type : 'Function(method,v,r,i)',defaultVal : "空函数",desc : '点击单元格按钮时触发'
      }],
      methodsData : [{
        name : 'reload',params : 'none',returnVal : 'none',desc : '重新加载当前页数据'
      },{
        name : 'load',params : 'page:页码,缺省为第一页',returnVal : 'none',desc : '加载指定页数据'
      },{
        name : 'getRow',params : 'rowIndex',returnVal : '行对象',desc : '获取指定行数据'
      },{
        name : 'getSelected',params : 'none',returnVal : '行对象',desc : '获取所选行对象'
      },{
        name : 'getSelections',params : 'none',returnVal : '行对象数组',desc : '获取所选的行对象组成的数组'
      },{
        name : 'loadFrontPageData',params : 'data',returnVal : 'none',desc : '加载前台分页数据'
      }],
      dataAttr : [{
        name : 'rows',type : 'Array',defaultVal : '[]',desc : '行对象数组',
        children_title : '行对象内部属性说明',
        children : [{
          name : 'children',type : 'Array',defaultVal : 'undefined',desc : '嵌套表格的行数据'
        },{
          name : 'children_title',type : 'String',defaultVal : "''",desc : '嵌套表格的标题'
        }]
      }]
    }
  },
  methods : {
  }
}