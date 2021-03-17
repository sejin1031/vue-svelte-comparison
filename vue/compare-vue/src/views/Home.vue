<template>
  <div class="home">
    <button @click="renewal">renewal data</button>
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
    
  },
  methods: {
    renewal () {
      this.itemList = new Array(10000).fill(0).map((val,index) => {
			return {
				name: 'd' + index,
				number: Math.random(3)* 100 + '-' + index
			}
		})
    }
  }
}
</script>

