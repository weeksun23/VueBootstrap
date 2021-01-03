import Util from '../../util';
import demoHtmls from './demos.html';
let templates = demoHtmls.split("SPLIT");
function getMixin1(){
  return {
  };
}
function getMixin2(){
  return {
  }
}
const data = [];
export default{
  template : `<div class='doc'>
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