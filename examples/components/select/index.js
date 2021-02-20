import Util from '../../util';
import demos from './demos.html';
import {defineComponent} from 'vue';
const data = [{
  title : '可写',
  jsCode(){
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
},{
  title : '不可写',
  jsCode(){
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
}];
export default defineComponent({
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
})