import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'


Vue.config.productionTip = false
Vue.use(Router)

const NotFound = { template: '<p>Page not found</p>' }
const Home = { template: App }
const Blog = { template: '<p>blog page</p>'}

const routes = {
  '/': Home,
  '/blog': Blog
}

new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || NotFound
    }
  },
  render (h) { return h(App) }
})
// new Vue({
//   render: h => h(App),
// }).$mount('#app')
