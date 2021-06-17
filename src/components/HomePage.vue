<template>
    <div>
        <!-- 开头导航 -->
        <van-nav-bar :title="positionAddress ? positionAddress:'正在定位'" :right-text=RightText right-arrow  @click-left="onClickLeft"
        @click-right="onClickRight" style="background-color:rgb(0,166,124);color:white">
        <template #left>
        <van-icon name="search" size="18" color="white"/>
        </template>
        </van-nav-bar>
        <!-- 图片轮播 -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="blue" >
        <van-swipe-item v-for="(item,index) in 2" :key="index">
        <van-grid :border="false">
        <van-grid-item :icon="'http://47.95.13.193:80/takeOutSystem-1.0-SNAPSHOT/'+item.photo" :text="item.name" v-for="(item,index) in listImg" :key="index" />
        </van-grid>
        </van-swipe-item>
        
        </van-swipe>
        <!-- 商家列表导航 -->
        <van-nav-bar>
        <template #left>
        <van-icon name="bars" size="18" color="black"/>
        <span>附近商家</span>
        </template>
        </van-nav-bar>
        <!-- 商品列表 -->
        <van-card
        @click="clickItem(item.id)"
        num="2"
        :title="item.name"
        :thumb="'http://47.95.13.193:80/takeOutSystem-1.0-SNAPSHOT/'+item.photo"
        v-for="(item,index) in listShop"
        :key="index"  
        >
        <template #title>
            <van-tag color="rgb(248,210,80)" text-color="#0D0D0D">品牌</van-tag>
            <b>{{listShop[index].name}}</b>
            <van-tag color="rgb(248,210,80)" text-color="#0D0D0D" style="float:right">快</van-tag>
            <van-tag color="rgb(248,210,80)" text-color="#0D0D0D" style="float:right">准</van-tag>
            <van-tag color="rgb(248,210,80)" text-color="#0D0D0D" style="float:right">保</van-tag>
        </template>
        <template slot="desc">
            <div style="margin-top:10px">
                <span v-for="index in 5" :key="index">
                    <van-icon v-if="index<item.score" name="star" color="rgb(283,10,36)"/>
                    <van-icon v-else name="star-o" />
                </span>
                <span> {{item.score}} </span>
                <span style="color:rgb(248,196,135)">月销{{item.sales}}单</span>
                <van-tag color="rgb(248,196,135)" text-color="rgb(248,196,135)" style="float:right" plain>联想教育</van-tag>
            </div>
        </template>
        <template #bottom>
            <span>￥{{item.minPrice}}起送</span>/<span>配送费约{{item.score}}</span>
        </template>
        </van-card>
    </div>
</template>

<script>
import { NavBar , Grid, GridItem,Swipe, SwipeItem ,Card,Tag } from 'vant';
import {mapState} from 'vuex';
export default {
    name:'homepage',
    components:{
        NavBar,
        Grid,
        GridItem,
        Swipe, 
        SwipeItem,
        Card,
        Tag 
    },
    data() {
        let self = this;
        return {
            text:'登录|注册',
            listImg:null,
            listShop:null,
            current: 0,
            center: [121.59996, 31.197646],
      lng: 0,
      lat: 0,
      positionAddress:"",
      loaded: false,
      plugin: [
        {
          pName: "Geolocation",
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                console.log(result);
                // console.log(result.addressComponent.township);
                if (result && result.position) {
                  var len = result.addressComponent.township.length;
                  var index = result.formattedAddress.indexOf(
                    result.addressComponent.township
                  );
                  self.positionAddress = result.formattedAddress.substring(
                    index + len
                  );
                  // self.lng = result.position.lng;
                  // self.lat = result.position.lat;
                  // self.center = [self.lng, self.lat];
                  self.loaded = true;
                  self.$nextTick();
                }
              });
            },
          },
        },
      ],

        }
    },
    computed:{
        ...mapState(['isLogin','UserName']),
        RightText:function(){
            if(this.isLogin==false){
                return this.text
            }else{
                return this.UserName
            }
        }
    },
    methods: {
        onClickLeft:function(){
            this.$router.push('/seekpage')
        },
        onClickRight:function(){
            if(this.isLogin==true){
                this.$router.push('/infomation')
            }else{
            this.$router.push('/userlogin')
            }
        },
        fetchData:function(){
            let that = this;
            this.$axios.post('/biz/queryBigCategory').then(function(res){
                that.listImg=res.data;
            })
        },
        fetchDataShopInfo:function(){
            let that = this;
            this.$axios.post('/biz/queryAllShopsInfo').then(function(res){
                that.listShop=res.data;
            })
        },
        clickItem:function(id){
            this.$router.push('/shopinfo/' + id)
        }
    },
    created() {
        this.fetchData();
        this.fetchDataShopInfo()
    },
}
</script>

<style lang="">
     .van-nav-bar__text{
         color: white;
     }
</style>