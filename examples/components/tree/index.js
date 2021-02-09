import Util from '../../util';
import demos from './demos.html';
const data = [
  {title : '初始化',jsCode(){
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
              {id : 14,text : 'aaaa3',children : [
                {id : 15,text : 'bbb33'},
                {id : 16,text : 'bbb33'},
                {id : 17,text : 'bbb33'},
                {id : 18,text : 'bbb33'}
              ]},
            ]},
            {id : 2,text : 'test2'},
            {id : 3,text : 'test3'},
            {id : 4,text : 'test4'}
          ]
        }
      }
    };
  }}
];
export default{
  ...Util.getDemoOptions(data,demos,`<h2>props</h2>
    <vb-table :columns="propColumns" :pagination='false' :init-front-page-data="propData" :striped='false'></vb-table>
    <h2 class='mt-3'>methods</h2>
    <vb-table :columns="methodsColumns" :pagination='false' :init-front-page-data="methodsData" :striped='false'></vb-table>`),
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