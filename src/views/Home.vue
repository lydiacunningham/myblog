<template>
  <div class="Home">
    <div class="ui grid">
      <div class="three wide column"></div>
      
      <div class="center aligned ten wide column">
        <img class="ui centered small circular image" src="../assets/me.png">
        <br>
        <h1 class="ui center aligned header">Austin Cunningham</h1>
        <h2 class="ui center aligned header">Software Engineer at Red Hat</h2>
      </div>
      <div class="three wide column"></div>
    </div>
    <div class="ui grid">
      <div class="three wide column"></div>
      <div class="center aligned ten wide column">
        <a href="https://github.com/austincunningham"><i class="big github icon"></i></a>
        <a href="https://twitter.com/auscunningham"><i class="big twitter icon"></i></a>
        <a href="https://www.linkedin.com/in/austin-cunningham-90365729/"><i class="big linkedin icon"></i></a>
        <a href="https://medium.com/@auscunningham"><i class="big medium icon"></i></a>
        <a href="https://austin-cunningham.surge.sh/"><i class="big edit outline icon"></i></a>
      </div>
      <div class="three wide colum"></div>
    </div>
    <div class="ui grid">
      <div class="four wide column"></div>
      <div class="eight wide column">
        <div class="sections">
          <div v-for="(section, index) in Object.keys(entries)" :key="index" class="group">
            <br>
            <h2 class="center">{{section}}</h2>
            <div class="section" v-for="entry in entries[section]" :key="entry.id">
              <div class="entry">
                <h3 @click="$router.push({name: entry.id})">
                   <i class="linkify icon"></i> {{entry.title}}
                  <span class="subtitle">....({{entry.date}})</span>
                </h3>
                <p>{{entry.description}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="four wide column"></div>
    </div>
  </div>
</template>

<script>
import BLOGENTRIES from '../static/bloglist.json'

export default {
  name: 'Home',
  computed: {
    entries() {
      return BLOGENTRIES
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
  color: #42b883;
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
