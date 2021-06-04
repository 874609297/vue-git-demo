<template>
    <div>
      <van-nav-bar title="搜索" style="background-color:rgb(0,166,124)"/>
     <van-search
     v-model="value"
     show-action
     placeholder="请输入搜索关键词"
     @search="onSearch"
     > 
    <template #action>
    <div @click="onSearch" style="background-color:rgb(0,166,124);color:white">搜索</div>
    </template>
    </van-search>

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
import { NavBar ,Search } from 'vant';
export default {
    name:'seekpage',
    components:{
        NavBar,
        Search
    },
    data() {
        return {
            value:'',
            listShop:null,
        }
    },
    methods: {
        clickItem:function(id){
            this.$router.push('/shopinfo/' + id)
        },
        onSearch:function(){
            let that = this ;
            this.$axios.get('/biz/queryAllShopsInfoByName?name='+this.value).then(function(res){
                that.listShop=res.data;
            })
        },
        onCancel:function(){

        },
        fetchDataShopInfo:function(){
            let that = this;
            this.$axios.post('/biz/queryAllShopsInfo').then(function(res){
                that.listShop=res.data;
            })
        }
    },
    created() {
        this.fetchDataShopInfo()
    },
}
</script>

<style lang="">
    .van-nav-bar__title{
         color: white;
     }
</style>