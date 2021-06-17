import Vue from 'vue'
import App from './App.vue'
import vant from 'vant';
import router from './router/index';
import store from './store';
import request from './ajax.js';
Vue.prototype.$axios=request
import 'vant/lib/index.css';
import VueAMap from 'vue-amap';
Vue.use(VueAMap);
Vue.use(vant);
// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德的key
  key:'5a42892ed91569333f4acb2ef152bc38',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4'
});
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
