<template>
  <div class='modal-backdrop fade' :class='{show : show}' @transitionend='transitionend' v-show='visible' :style="{display : visible ? 'block' : 'none'}"></div>
</template>
<script>
import {defineComponent,ref} from 'vue';
export default defineComponent({
  setup(){
    let show = ref(false);
    let visible = ref(false);
    let transitionend = () => {
      if(!show.value){
        visible.value = false;
      }
    };
    return {
      show,
      visible,
      transitionend
    }
  }
})
</script>