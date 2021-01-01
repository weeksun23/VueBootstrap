<template>
	<div class='demo'>
		<h2>初始化</h2>
		<code>html:</code>
		<highlightjs language='html' :code="htmlCode"/>
		<code>js:</code>
		<highlightjs language='javascript' :code="jsCode"/>
		<code>结果:</code>
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
Util.formatCode(``),
			  jsCode : 
Util.formatCode(``),
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