import Util from '../../util';
import demoHtmls from './demos.html';
let templates = demoHtmls.split("SPLIT");
function getMixin1(){
  return {
    data(){
      return {
        icon : true,
        checkbox : false,
        cascadeCheck : true,
        treeData1 : [
          {id : 1,text : 'test1',children : [
            {id : 11,text : 'aaaa'},
            {id : 12,text : 'aaaa1'},
            {id : 13,text : 'aaaa2'},
            {id : 14,text : 'aaaa3',state : 'closed'}
          ]},
          {id : 2,text : 'test2'},
          {id : 3,text : 'test3'},
          {id : 4,text : 'test4'}
        ]
      }
    }
  };
}
function getMixin2(){
  return {
  }
}
const data = [
  {title : '初始化',htmlCode : templates[0],jsCode : getMixin1.toString()}
];
export default{
  template : `<div class='doc'>
    <demo :title='data[0].title' :html-code="data[0].htmlCode" :js-code="data[0].jsCode">${templates[0]}</demo>
    <h2>props</h2>
		<vb-table :columns="propColumns" :pagination='false' :init-front-page-data="propData"></vb-table>
		<h2>methods</h2>
		<vb-table :columns="methodsColumns" :pagination='false' :init-front-page-data="methodsData"></vb-table>
  </div>`,
  mixins : [getMixin1(),getMixin2(),Util.getColumnsMixin()],
  data(){
    return {
      data,
      propData : [],
      methodsData : []
    }
  },
  methods : {
  }
}