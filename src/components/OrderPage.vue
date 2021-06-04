<template>
    <div>
        <van-nav-bar title="订单列表" style="background-color:rgb(0,166,124)"/>
        <div v-if="!isLogin" style="text-align: center;">
        <van-empty
         class="custom-image"
        image="error"
        description="登陆后查看外卖订单"
        />
        <van-button type="primary" to='/userlogin' style="margin:auto">立即登录</van-button>
        </div>
        <div v-else>
            <van-tabs v-model="active">
            <van-tab title="外卖订单">
               <van-card
               v-for="(item,index) in order"
               :key="index"
                :title="item.shopName"
                thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
                >
                <template #desc>
                    <div style="margin-top:25px">
                        {{item.list[0].foodName}}等{{item.list[0].buyCount}}件商品
                    </div>
                </template>
                <template #footer>
                <van-tag round plain>删除订单</van-tag>
                <van-tag round type="primary" color="rgb(91,199,121)" plain>再来一单</van-tag>
                </template>
            </van-card>
            </van-tab>
            <van-tab title="待评价">待评价</van-tab>
            <van-tab title="退款">退款</van-tab>
            <van-tab title="其他订单">其他订单</van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
import { Empty ,NavBar,Button,Tab, Tabs ,Card,Tag ,List  } from 'vant';
import{mapState} from 'vuex';
export default {
    name:'orderpage',
    data() {
        return {
            active:0,
            order:null
        }
    },
    components:{
        Empty,
        NavBar,
        Button,
        Tab,
        Tabs,
        Card,
        Tag,
        List
    },
    computed:{
        ...mapState(['isLogin'])
    },
    methods: {
        fetchData:function(id){
            var that =this;
            this.$axios.get('/biz/queryOrdersByUserId?userId=' + id).then(function(res){
                that.order=res.data
            })
        }
    },
    created() {
        var id=window.localStorage.getItem('id');
        if(window.localStorage.getItem('name')){
            this.fetchData(id)
        }
    },
}
</script>

<style lang="">
    .van-nav-bar__title{
         color: white;
     }
</style>