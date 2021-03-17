<main>
	<div class="home">
		<button on:click={renewal}>renewal data</button>
		<div class="item-list-container">			
			{#each itemList as item}
			<Item {...item}></Item>
			{/each}
		</div>
	</div>
</main>

<script>
	import Item from './Item.svelte'
	let itemList = new Array(10000).fill(0).map((val,index) => {
      return {
        name: 'abc' + index,
        number: 123 + '-' + index
      }
		});
	function renewal () {
		itemList = new Array(10000).fill(0).map((val,index) => {
			return {
				name: 'd' + index,
				number: Math.random(3)* 100 + '-' + index
			}
		})
	}
</script>
