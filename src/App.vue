<template>
  <div id="app">
    <van-tabbar route>
    <van-tabbar-item replace to="/homepage" icon="home-o">外卖</van-tabbar-item>
    <van-tabbar-item replace to="/seekpage" icon="search">搜索</van-tabbar-item>
    <van-tabbar-item replace to="/orderpage" icon="orders-o">订单</van-tabbar-item>
    <van-tabbar-item replace to="/infomation" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
    <router-view></router-view>
  </div>
</template>
<script>
import { Tabbar, TabbarItem } from 'vant';
import {mapMutations} from 'vuex';
export default {
  name: 'app',
  data () {
    return {
      active: 0,
    }
  },
  components:{
    Tabbar,
    TabbarItem
  },
  methods: {
    ...mapMutations(['mutationsLogin']),
  },
  computed:{

  },
  created() {
    var user = window.localStorage.getItem('name');
    var uid =window.localStorage.getItem('id');
    if(user&&uid){
      this.mutationsLogin(user);
    }
  },
}
</script>
<style>
</style>
