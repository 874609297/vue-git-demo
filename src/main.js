import Vue from 'vue'
import App from './App.vue'
import vant from 'vant';
import router from './router/index';
import store from './store';
import request from './ajax.js';
Vue.prototype.$axios=request
import 'vant/lib/index.css';
Vue.use(vant)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
