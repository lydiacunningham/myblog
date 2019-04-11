<template>
<div class="bar">
    <div class="ui grid">
      <div class="seven wide column"></div>
      <div class="two wide column">
        <div class="ui compact menu">
          <a class="item"><router-link to="/"> Home Page <i class="home icon"></i></router-link> </a>
        </div>
      </div>
    </div>
</div>
</template>
<script>

export default {
  name: 'Bar'
}
</script>

<style>
h3 {
  margin: 40px 0 0;
}
ul {
  text-align: center;
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
