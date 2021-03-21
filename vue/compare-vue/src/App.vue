<template>
  <div id="app">
    <header>Performance comparison between Vue.js & Svelte.js</header>
    <div id="nav">
      <ul>
        <li @click="$router.push('/')">List</li>
        <li @click="$router.push('/e')">Other</li>
      </ul>
    </div>
    <router-view/>
    <footer>학사졸업논문 작성을 위한 연구용 페이지 | 작성자: 엄세진 | 한양대학교 소프웨어학부 | <a href="https://github.com/sejin1031/vue-svelte-comparison" target="_blank">Github repository</a></footer>
  </div>
</template>

<style>

</style>
