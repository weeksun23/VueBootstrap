<template>
  <transition enter-active-class='fade' enter-to-class='show' leave-from-class='show' leave-active-class='fade'
    @after-leave="$emit('destroy')">
    <div class="tooltip vb-tooltip" :class="['bs-tooltip-' + position]" v-show='show'
      :style="{left : left + 'px',top : top + 'px'}" @transitionend='transitionend'>
      <div class="tooltip-arrow" :class="['vb-tooltip-arrow-' + position]"></div>
      <div class="tooltip-inner" v-html="message">
      </div>
    </div>
  </transition>
</template>
<script>
import {defineComponent,ref} from 'vue';
export default defineComponent({
  setup(){
    let show = ref(false);
    //start end top bottom
    let position = ref('top');
    let left = ref(-9999);
    let top = ref(-9999);
    let message = ref('');
    return {
      show,
      position,
      left,
      top,
      message
    }
  },
  emits : ['destroy']
})
</script>
<style>
  .vb-tooltip{opacity: 1;}
  .vb-tooltip-arrow-top,.vb-tooltip-arrow-bottom{
    left : 50%;
    transform:translateX(-50%);
    -ms-transform:translateX(-50%);
    -webkit-transform:translateX(-50%);
  }
  .vb-tooltip-arrow-start,.vb-tooltip-arrow-end{
    top : 50%;
    transform:translateY(-50%);
    -ms-transform:translateY(-50%);
    -webkit-transform:translateY(-50%);
  }
</style>