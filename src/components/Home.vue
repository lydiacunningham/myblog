<template>
  <div class="Home">
    <h1>{{ msg }}</h1>
    
    <div class="ui grid">
      <div class="sixteen wide column">
        <a href="https://github.com/austincunningham"><i class="big github icon"></i></a>
        <a href="https://twitter.com/auscunningham"><i class="big twitter icon"></i></a>
        <a href="https://www.linkedin.com/in/austin-cunningham-90365729/"><i class="big linkedin icon"></i></a>
        <a href="https://medium.com/@auscunningham"><i class="big medium icon"></i></a>
        <a href="https://austin-cunningham.surge.sh/"><i class="big edit outline icon"></i></a>
      </div>
    </div>

    <h3>More Info</h3>
    <ul>
      <li><a href="https://austin-cunningham.surge.sh/" rel="noopener">About</a></li>
      <li><a href="/blog" rel="noopener">Blog</a></li>
    </ul>

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
