<div id="app">
	<header>Performance comparison between Vue.js & Svelte.js</header>
	<div id="nav">
		<ul>
			<li>List</li>
			<li>Other</li>
		</ul>
	</div>
	<main>
		<div class="home">
			<button on:click={renewal}>renewal data</button>
			<div class="item-list-container">			
				{#each itemList as item}
				<Item {...item}></Item>
				{/each}
			</div>
			<div class="result">
				update Start : { updateStart }
				<br/>
				update End : { updateEnd }
				<br/>
				소요시간 : { updateEnd - updateStart }
				<br/>
				update Avg: { updateTotal / (updateCount || 1) }
				<br/>
			</div>
		</div>
	</main>
	<footer>학사졸업논문 작성을 위한 연구용 페이지 | 작성자: 엄세진 | 한양대학교 소프웨어학부 | <a href="https://github.com/sejin1031/vue-svelte-comparison" target="_blank">Github repository</a></footer>
</div>



<script>
	import Item from './Item.svelte'
	import { tick } from 'svelte'
	let itemList = new Array(10000).fill(0).map((val,index) => {
      return {
        name: 'abc' + index,
        number: 123 + '-' + index
      }
		});
	let updateStart = 0;
	let updateEnd = 0;
	let updateCount = 0;
	let updateTotal = 0;
	async function renewal () {
		updateStart = new Date().getTime()
		updateCount = updateCount + 1;
		itemList = new Array(10000).fill(0).map((val,index) => {
			return {
				name: 'd' + index,
				number: Math.random(3)* 100 + '-' + index
			}
		})

		await tick();
		
		updateEnd = new Date().getTime();
		updateTotal += (updateEnd - updateStart)
	}
</script>
