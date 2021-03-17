<template>
  <div class="item-container">
    <div class="item-top">
      <div class="item-thumb" :style="{'backgroundImage': `url(${require('../assets/logo.png')})`}"></div>
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
.item-container{ width: 100px; height: 100px; position: relative;}
.item-top { width: 70%; height: 70%; }
.item-thumb { background-size: contain; height: 100%; }
.item-bottom { width: 100%; font-size: 13pt; }
</style>