import Util from '../../util';
import demoHtmls from './demos.html';
let templates = demoHtmls.split("SPLIT");
function getMixin1(){
  return {
    data(){
      return {
      }
    }
  };
}
const data = [{
  title : '初始化',htmlCode : templates[0],
  jsCode : getMixin1.toString()
}];
export default{
  template : `<div class='doc'>
    <demo :title='data[0].title' :html-code="data[0].htmlCode" :js-code="data[0].jsCode">${templates[0]}</demo>
    <h2>props</h2>
		<vb-table :columns="propColumns" :pagination='false' :init-front-page-data="propData"></vb-table>
		<h2>methods</h2>
		<vb-table :columns="methodsColumns" :pagination='false' :init-front-page-data="methodsData"></vb-table>
  </div>`,
  mixins : [getMixin1(),Util.getColumnsMixin()],
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