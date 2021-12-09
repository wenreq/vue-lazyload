import Vue from 'vue'
import App from './App.vue'
// import VueLazyLoad from 'vue-lazyload'
import VueLazyLoad from './modules/vue-lazyload'

Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
  loading: 'http://localhost:3000/images/loading.gif',
  error: 'http://localhost:3000/images/error.jpeg',
  preload: 1
});

new Vue({
  render: h => h(App),
}).$mount('#app')
