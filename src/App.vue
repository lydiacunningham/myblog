<template>
  <div id="app">
    <bar/>
    <router-view></router-view>
  </div>
</template>

<!-- Global site tag (gtag.js) - Google Analytics -->

<script>
import bar from './views/Bar.vue'


export default {
  name: 'app',
  components:{
    bar
  }
}


</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
  
}

</style>
