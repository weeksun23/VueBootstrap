<template>
  <transition enter-active-class='fade' enter-to-class='show' leave-from-class='show' leave-active-class='fade'>
    <div class='modal-backdrop vb-modal-backdrop' v-show='show'></div>
  </transition>
</template>
<script>
import {defineComponent,ref} from 'vue';
export default defineComponent({
  setup(){
    let show = ref(false);
    return {
      show
    }
  }
})
</script>
<style>
  .vb-modal-backdrop{display: block;opacity: .5;}
</style>