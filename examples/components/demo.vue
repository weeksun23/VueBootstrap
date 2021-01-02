<template>
	<div class='demo'>
		<h2>{{title}}</h2>
    <div class="panel panel-default">
      <div class="panel-body">
        <slot></slot>
      </div>
      <div class="panel-footer" @click="showCode = !showCode">{{showCode ? "隐藏代码" : "展开代码"}}</div>
    </div>
    <div class='demo-code' v-show='showCode'>
		  <highlightjs language='html' :code="formatHtmlCode"/>
		  <highlightjs language='javascript' :code="formatJsCode"/>
    </div>
	</div>
</template>
<script>
export default {
  name : 'demo',
  data(){
    return {
      showCode : false
    }
  },
  props: {
    title : {type : String,default : ''},
    htmlCode : {type : String,default : ''},
    jsCode : {type : String,default : ''}
  },
  computed : {
    formatHtmlCode(){
      return HTML(this.htmlCode);
    },
    formatJsCode(){
      let arr = this.jsCode.split("return");
      if(arr.length > 1){
        arr.shift();
      }
      return JS("export default"+arr.join("return").replace(/}$/,''));
    }
  }
}
</script>