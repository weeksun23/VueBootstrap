<template>
	<div class='demo mb-3'>
		<h2>{{title}}</h2>
    <div class="card">
      <div class="card-body">
        <slot></slot>
      </div>
      <div class="card-footer" @click="showCode = !showCode">{{showCode ? "隐藏代码" : "展开代码"}}</div>
    </div>
    <div class='demo-code' v-show='showCode'>
      <pre><code class='html' ref='html'>{{formatHtmlCode}}</code></pre>
      <pre v-if="formatJsCode"><code class='javascript' ref='javascript'>{{formatJsCode}}</code></pre>
    </div>
	</div>
</template>
<script>
import {defineComponent} from 'vue';
export default defineComponent({
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
      if(!this.jsCode) return null;
      let arr = this.jsCode.split("return");
      if(arr.length > 1){
        arr.shift();
      }
      return JS("export default"+arr.join("return").replace(/}$/,''));
    }
  },
  mounted(){
    hljs.highlightBlock(this.$refs.html);
    this.$refs.javascript && hljs.highlightBlock(this.$refs.javascript);
  }
})
</script>
<style>
  .demo .card-footer{cursor: pointer;}
</style>