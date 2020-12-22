<template>
  <input type='text' class="form-control" :class="cls" :placeholder="placeholder">
</template>
<script>
export default {
  data(){
    return {
      data : []
    }
  },
  props : {
    cls : {type : String,default : ''},
    placeholder : {type : String,default : ''}
  }
}
</script>