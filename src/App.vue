<template>
  <div id="app">
    <img class="ui centered small circular image" src="./assets/me.png">
    <About msg="Software Engineer at Red Hat"/>
  </div>
</template>

<script>
import About from './components/About.vue'

export default {
  name: 'app',
  components: {
    About
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
