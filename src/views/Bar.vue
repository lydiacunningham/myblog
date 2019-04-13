<template>
<div class="bar">
    <div class="ui grid">
      <div class="six wide column"></div>
      <div class="four wide column">
        <router-link to="/">
          <button class="ui positive basic fluid button">
            <a class="item">Home <i class="home icon"></i> </a>
          </button>
        </router-link>
      </div>
      <div class="six wide column"></div>
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
