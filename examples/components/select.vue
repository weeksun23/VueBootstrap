<template>
	<div class='demo'>
		<h2>初始化</h2>
		<code>html:</code>
		<highlightjs language='html' :code="htmlCode"/>
		<code>js:</code>
		<highlightjs language='javascript' :code="jsCode"/>
		<code>结果:</code>
		<form class="form-horizontal">
      <div class="form-group">
				<label class="col-sm-2 control-label">可写</label>
				<div class="col-sm-10">
					<vb-select :data="data1" :editable='true'></vb-select>
				</div>
      </div>
			<div class="form-group">
				<label class="col-sm-2 control-label">不可写</label>
				<div class='col-sm-10'>
					<vb-select :data="data2"></vb-select>
				</div>
      </div>
    </form>
		<!-- -->
		<h2>props</h2>
		<vb-table :columns="propColumns" :pagination='false' :init-front-page-data="propData"></vb-table>
		<h2>methods</h2>
		<vb-table :columns="methodsColumns" :pagination='false' :init-front-page-data="methodsData"></vb-table>
		<h2>其它</h2>
		
	</div>
</template>
<script>
	import Util from '../util';
	export default{
		data(){
			return {
				htmlCode : 
Util.formatCode(`<form>
  <div class="form-group">
    <vb-select></vb-select>
  </div>
</form>`),
			  jsCode : 
Util.formatCode(`data : {

},
methods : {

}`),
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
				],
				data2 :[
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
				],
				propColumns : Util.getAttrColumns(),
				propData : [],
				methodsColumns : Util.getMethodsColumns(),
				methodsData : [],
				content : ``
			}
		},
		methods : {

		}
	}
</script>