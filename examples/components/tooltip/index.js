import Util from '../../util';
import demos from './demos.html';
const data = [{
  title : '初始化'
},{
  title : 'html content'
}];
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