<template>
	<div class='demo'>
		<h2>{{title}}</h2>
		<code>html:</code>
		<highlightjs language='html' :code="htmlCode"/>
		<code>js:</code>
		<highlightjs language='javascript' :code="jsCode"/>
		<code>结果:</code>
    <slot></slot>
	</div>
</template>
<script>
export default {
  name : 'demo',
  props: {
    title : {type : String,default : ''},
    htmlCode : {type : String,default : ''},
    jsCode : {type : String,default : ''}
  }
}
</script>