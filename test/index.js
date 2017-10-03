import Vue from 'vue'
import App from './App.vue'
import { safeProp } from './utils'
Vue.mixin({
  methods: {
    $propOr: safeProp,
    $safeProp: safeProp(null)
  }
})
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
})