<template>
  <div class="item-container">
    <div class="item-top">
      <div class="item-thumb"></div>
    </div>
    <div class="item-bottom">
      <div>{{ info.name }}</div>
      <span>{{ info.number }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Item",
  props: 
  {
    info: Object,
  },
  mounted () {
    
  }
  
}
</script>

<style>
</style>