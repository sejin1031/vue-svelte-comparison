<template>
  <div class="home">
    <div class="item-list-container">
      <Item  v-for="i in itemList" :key="i.name" :info="i"></Item>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    Item: () => import('@/components/Item.vue')
  },
  data () {
    return {
      dt: {
        name: 'abc',
        number: 123
      },
      itemList: []
    }
  },
  beforeMount () {
    this.itemList = new Array(10000).fill(0).map((val,index) => {
      return {
        name: 'abc' + index,
        number: 123 + '-' + index
      }
    })
  },
  mounted () {
    
  }
}
</script>

<style>
.item-list-container { display: grid; width: 1200px; grid-column: 5; }
</style>
