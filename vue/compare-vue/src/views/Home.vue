<template>
  <div class="home">
    <button @click="renewal">renewal data</button>
    <div class="item-list-container">
      <Item  v-for="i in itemList" :key="i.name" :info="i"></Item>
    </div>
    <div class="result">
      update Start : {{ updateStart }}
      <br/>
      update End : {{ updateEnd }}
      <br/>
      소요시간 : {{ updateEnd - updateStart }}
      <br/>
      update Avg: {{ updateTotal / (updateCount || 1) }}
      <br/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
    Item: () => import('@/components/Item.vue')
  },
  data () {
    return {
      itemList: [],
      updateStart: 0,
      updateEnd: 0,
      updateCount: 0,
      updateTotal: 0,
    }
  },
  beforeMount () {
    this.itemList = new Array(10000).fill(0).map((val,index) => {
      let obj = {
        name: '11' + index,
        number: 123 + '-' + index
      }
      Object.freeze(obj)
      return obj
    })
  },
  methods: {
    renewal () {
      this.updateStart = new Date().getTime();
      this.updateCount++;
      this.itemList = new Array(10000).fill(0).map((val,index) => {
        let obj = {
				name: 'd' + index,
				number: Math.random(3)* 100 + '-' + index
			}
      Object.freeze(obj)
			return obj
		})
    this.$nextTick(() => {
      this.updateEnd = new Date().getTime();
      this.updateTotal += (this.updateEnd - this.updateStart);
    })
    }
  }
}
</script>

