<template>
    <div>
    <van-nav-bar title="我的" style="background-color:rgb(0,166,124)"/>
    <van-card
    style="background-color:rgb(0,166,124);margin-top:0px;font-size:14px"
    num="2"
    title="登录/注册"
    round
    >
    <template #thumb>
        <van-image
        round
        height="5rem"
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
    />
    </template>
    <template #desc>
        <div style="margin-top:25px;font-size:14px" >
            <van-icon name="manager" />        
            <span>暂无绑定手机号</span>
        </div>
    </template>
    </van-card>
    <van-grid  column-num="3">
    <van-grid-item>
        <p><b style="color:rgb(247,157,57); font-size:30px">0.00</b> <span>元</span></p>
        <p>我的余额</p>
    </van-grid-item>
    <van-grid-item>
         <p><b style="color:rgb(237,119,120);font-size:30px">0</b> <span>个</span></p>
        <p>我的优惠</p>
    </van-grid-item>
     <van-grid-item>
         <p><b style="color:rgb(131,192,79);font-size:30px">0</b> <span>分</span></p>
        <p>我的积分</p>
    </van-grid-item>
    </van-grid>

        <van-cell-group>
            <van-cell>
                <van-icon name="bill-o"  color="#B6D6C4"/><span>我的订单</span>
            </van-cell>
            <van-cell>
                <van-icon name="points" color="#F4BDB7"/><span>积分商城</span>
            </van-cell>
            <van-cell>
                <van-icon name="bill-o"  color="#F6C99A"/><span>小zhang的外卖会员卡</span>
            </van-cell>
            <van-cell>
                <van-icon name="bill-o"  color="#5DAD89"/><span>服务中心</span>
            </van-cell>
        </van-cell-group>   
    </div>
</template>
<script>
import {NavBar,Card,Image as VanImage,Icon , Grid, GridItem, Cell, CellGroup} from 'vant';
export default {
    name:'Informationpage',
    components:{
        NavBar,
        Card,
        VanImage,
        Icon ,
        Grid,
        GridItem,
        Cell,
        CellGroup
    }
}
</script>

<style lang="">
    .van-nav-bar__title{
         color: white;
     }
     
</style>