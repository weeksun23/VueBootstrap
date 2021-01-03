import Util from '../../util';
import demoHtmls from './demos.html';
let templates = demoHtmls.split("SPLIT");
function getMixin1(){
  return {
    data(){
      return {
        value1 : null,
        data1 : [
					{text : 'te23tcst1',value : 0},
					{text : 'tet34444st2',value : 1},
					{text : 'tead33j778st3',value : 2},
					{text : 'tesqwd21t4',value : 3},
					{text : 'y5y78454uuuu',value : 4},
					{text : '123456556eeee',value : 5},
					{text : '12e1223',value : 6},
					{text : 'wd1212d',value : 7},
					{text : '12e121212rewwfd',value : 8},
					{text : '4r4334t34t',value : 9}
				]
      }
    },
    methods : {
      setValue1(value){
        this.$refs.select1.setValue(value);
      }
    }
  };
}
function getMixin2(){
  return {
    data(){
      return {
        data2 : [
					{text : 'te23tcst1',value : 0},
					{text : 'tet34444st2',value : 1},
					{text : 'tead33j778st3',value : 2},
					{text : 'tesqwd21t4',value : 3},
					{text : 'y5y78454uuuu',value : 4},
					{text : '123456556eeee',value : 5},
					{text : '12e1223',value : 6},
					{text : 'wd1212d',value : 7},
					{text : '12e121212rewwfd',value : 8},
					{text : '4r4334t34t',value : 9}
				]
      }
    }
  }
}
const data = [{
  title : '可写',htmlCode : templates[0],
  jsCode : getMixin1.toString()
},{
  title : '不可写',htmlCode : templates[1],
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
      propData : [],
      methodsData : []
    }
  },
  methods : {
  }
}