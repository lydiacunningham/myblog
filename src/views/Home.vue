<template>
  <div class="Home">
    <div class="ui grid">
      <div class="seven wide column"></div>
      <div class="two wide column">
        <h1>{{ msg }}</h1>
        <img class="ui centered small circular image" src="../assets/me.png">
        <br>
      </div>
      <div class="seven wide column"></div>
    </div>
    <div class="ui grid">
      <div class="seven wide column"></div>
      <div class="three wide column">
        <a href="https://github.com/austincunningham"><i class="big github icon"></i></a>
        <a href="https://twitter.com/auscunningham"><i class="big twitter icon"></i></a>
        <a href="https://www.linkedin.com/in/austin-cunningham-90365729/"><i class="big linkedin icon"></i></a>
        <a href="https://medium.com/@auscunningham"><i class="big medium icon"></i></a>
        <a href="https://austin-cunningham.surge.sh/"><i class="big edit outline icon"></i></a>
      </div>
      <div class="six wide colum"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
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
