<template>
    <div v-if="shopinfo">
        <van-nav-bar
        style="background-color:rgb(0,166,124)"
        left-arrow
        @click-left	="clickLeft"
        >
        <template #left>
            <van-icon name="arrow-left" color="white"/>
        </template>
        </van-nav-bar>
            <div style="width:100%;text-align: center;">
                <van-image
                class="imgTop"
                width="100"
                height="100"
                :src="'http://47.95.13.193:80/takeOutSystem-1.0-SNAPSHOT/'+shopinfo.photo"
                />
                <p class="spanmain">
                    <van-tag color="#FFEF07">品牌</van-tag>
                    <b>{{shopinfo.name}}</b>
                </p>
                <p style="font-size:11px">
                    <span> {{shopinfo.score}}
                    月售 {{shopinfo.sales}} 单
                    联想教育
                    约 {{shopinfo.deliveryTime}}分钟
                    距离 {{shopinfo.distance}}米
                    </span>
                </p>
                <p style="font-size:11px" @click="clickP">
                    <van-tag color="#FFEF07">首单</van-tag>
                    <span>新用户下单立减17元|不同其他</span>
                    <span> {{sortLength}} 个优惠</span>
                </p>
            </div>
<!-- 优惠栏 -->
            <van-action-sheet v-model="show"   title="优惠活动">
                <van-cell-group style="text-align: center;">
                <van-cell title="单元格" v-for="(item,index) in actions" :key="index">
                    <template #title>
                    <van-tag type="danger"> {{item.tag}} </van-tag>
                    <span> {{item.contents}} </span>
                    </template>
                </van-cell>
                </van-cell-group>
            </van-action-sheet>
            <van-tabs v-model="active">
            <van-tab title="点餐" style="">
            <van-row>
            <van-col span="6">
            <van-sidebar v-model="activeKey" @change="sidebarClick">
            <van-sidebar-item :title="item.name" v-for="(item,index) in foodSort" :key="index"/>
            </van-sidebar>
            </van-col>
            <van-col span="18">
            <van-card
            v-for="(item,index) in fidinfo"
            @click="addFood(item.name,$event)"
            :key="index"
            :price="price"
            :desc="item.info"
            :title="item.name"
            :thumb="'http://47.95.13.193:80/takeOutSystem-1.0-SNAPSHOT/'+item.photo"
            >
            <template #tags>
            <span>月售86份，好评率百分之百</span>
            </template>
            <template #footer>
            <van-button size="mini"><van-icon name="add-o" /></van-button>
            </template>
            </van-card>
            </van-col>
            </van-row>
            <!-- 结算 -->
            <van-submit-bar  label="" style="background:black" text-align="left">
                <template #button >
                    <van-button color="#51B14D" style="height:100%;width:8rem">结算</van-button>
                </template>
                   <template>
                       <div style="position:absolute;margin-right:16rem" @click="clickImg">
                        <van-icon name="cart" color="white" size="40"/>
                        <span style="color:white;font-size:1rem"> ￥{{FullPrice}} </span>
                       </div>
                   </template>
            </van-submit-bar>
            </van-tab>
            <van-tab title="评价">
            <van-row>
            <van-col span="7" style="text-align: center;">
                <b style="font-size:20px;color:orange"> {{shopinfo.score}} </b>
                <br>
                <b>综合评分</b>
                <p style="font-size:11px">高于周边商家99%</p>
            </van-col>
            <van-col span="14" offset="3">
                <van-rate v-model="shopinfo.serviceScore" allow-half/>
                <span>服务评分 </span><span style="color:orange"> {{shopinfo.serviceScore}} </span>
                <br>
                <van-rate v-model="shopinfo.goodsScore" allow-half/>
                <span>商品评分</span><span style="color:orange"> {{shopinfo.goodsScore}} </span>
                <br>
                <b>送达时间</b> <span>{{shopinfo.deliveryTime}}分钟</span>
            </van-col>
            </van-row>
            <div class="gray"></div>
            <van-tabs type="line ">
            <van-tab title="全部">
                <van-card
                v-for="(item,index) in remark"
                :key="index"
                >
                <template #title>
                    <van-image
                    round
                    width="2rem"
                    height="2rem"
                    src="https://img01.yzcdn.cn/vant/cat.jpeg"
                    />
                    <span> {{item.account}} </span>
                    <span style="float:right"> {{item.oederTime}} </span>
                </template>
                <template #desc	>
                    <div style="margin-left:2rem">
                        <van-rate v-model="item.score" /><br>
                        <span>{{item.comments}}</span><br>
                        <van-icon name="good-job" color="#F19D39" /><van-tag color="#ffe1e1" text-color="#ad0000">南瓜粥</van-tag>
                    </div>
                </template>
                </van-card>
            </van-tab>
            <van-tab title="满意" v-if="good">
                <van-card
                v-for="(item,index) in good"
                :key="index"
                >
                <template #title>
                    <van-image
                    round
                    width="2rem"
                    height="2rem"
                    src="https://img01.yzcdn.cn/vant/cat.jpeg"
                    />
                    <span> {{item.account}} </span>
                    <span style="float:right"> {{item.oederTime}} </span>
                </template>
                <template #desc	>
                    <div style="margin-left:2rem">
                        <van-rate v-model="five" /><br>
                        <span>{{item.comments}}</span><br>
                        <van-icon name="good-job" color="#F19D39" /><van-tag color="#ffe1e1" text-color="#ad0000">南瓜粥</van-tag>
                    </div>
                </template>
                </van-card>
            </van-tab>
            <van-tab title="不满意">内容 3</van-tab>
            </van-tabs>
        </van-tab>
        <van-tab title="商家">
            <b>配送信息</b><br>
            <van-tag color="#7232dd">联想外卖</van-tag>
            <span style="font-size:11px;color:gray">此商家配送提供配送，约三十分钟送达，距离 {{shopinfo.distance}}米 </span>
            <p style="font-size:11px;color:gray">配送费 ￥ {{shopinfo.transportationPrice}}</p>
            <div class="gray"></div>
            <b>活动与服务</b><br>
            <p v-for="(item,index) in actions" :key="index">
                <van-tag color="#7232dd">{{item.tag}}</van-tag>
                <span>{{item.contents}}</span>
            </p>
            <div class="gray"></div>
            <b>商家实景</b><br>
            <van-row   gutter="20">
            <van-col span="8"><van-image
            width="100"
            height="100"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
            /></van-col>
            <van-col span="8"><van-image
            width="100"
            height="100"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
            /></van-col>
            <van-col span="8"><van-image
            width="100"
            height="100"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
            /></van-col>
            </van-row>
        </van-tab>
        </van-tabs>
        <van-action-sheet v-model="imgshow">
        <template #default>
            <div>
                <div style="background-color:#F4F5F7">
                    <span style="float:left">购物车</span>
                    <span style="float:right" @click="EmptyMenu">清空</span>
                </div>
                <br>
               <ul>
                   <li v-for="(item,index) in foodMenu" :key="index"> {{item}} </li>
               </ul>
            </div>
        </template>
        </van-action-sheet>
    </div>
</template>

<script>
import { Col, Row,NavBar ,Image as VanImage,Tag,SubmitBar ,Button ,ActionSheet,Cell, CellGroup ,Tab, Tabs,Sidebar, SidebarItem,Card,Rate } from 'vant';
export default {
    data:function(){
        return{
            shopinfo:null,
            actions:[],
            show: false,
            active:0,
            activeKey:0,
            foodSort:null,
            fid:1,
            fidinfo:null,
            price:9,
            FullPrice:0,
            sortLength:null,
            remark:null,
            five:5,
            good:[],
            imgshow:false,
            foodMenu:[],
            isGood:[],
            nGood:[]
        }
    },
    components:{
        NavBar,VanImage,Tag,SubmitBar ,Button,ActionSheet ,Cell,
        CellGroup,Tab, Tabs,Sidebar,SidebarItem,Card ,Col, Row,
        Rate
    },
    name:'shopinfo',
    props:['id'],
    created() {
        this.fetchData();
    },
    methods: {
        fetchData:function(){
            var that = this ;
            this.$axios.get('/biz/queryInfoByShopId?shopId='+this.id).then(function(res){
                that.shopinfo=res.data;
            });
            this.$axios.get('/biz//querySpecialOfferByShopId?shopId='+this.id).then(function(res){ 
                that.actions=res.data;
                that.sortLength=res.data.length;
                });
            this.$axios.get('/biz/queryFoodCategory?id='+this.id).then(function(res){
                that.foodSort=res.data;
            });
            this.$axios.get('biz/queryFoodinfoByShopIdAndFoodCategoryId?shopId='+this.id+'&foodcategoryId='+this.fid).then(function(res){
                that.fidinfo=res.data;
            });
            //评价
            this.$axios.get('/biz//queryCommentByShopId?shopId='+this.id).then(function(res){
                that.remark=res.data;
                // for(let i=0;i<res.data.length;i++){
                //     if(res.data.isGood==0){
                //         isGood.push(res.data[i].isGood)
                //     }else{
                //         nGood.push(res.data[i].)
                //     }
                // }
            });
        },
        clickP:function(){
            this.show=true;
        },
        sidebarClick:function(index){
            this.fid=index+1;
            var that = this ;
            this.$axios.get('biz/queryFoodinfoByShopIdAndFoodCategoryId?shopId='+this.id+'&foodcategoryId='+this.fid).then(function(res){
                that.fidinfo=res.data;
            })
        },
        addFood:function(name,event){
            if(event.target.tagName.toLowerCase()=="button"){
                this.FullPrice+=9;
                this.foodMenu.push(name);
            }
        },
        clickLeft:function(){
            this.$router.go(-1);
        },
        clickImg:function(){
            this.imgshow=true;
        },
        EmptyMenu(){
            this.foodMenu=[];
            this.FullPrice=0;
        }
    },
    computed:{
        phoneNumber:function(){
           
        },
        isgood:function(){
            for(var i=0;i<this.remark.length;i++){
                if(this.remark.isGood==1){
                    this.good.push(this.remark[i]);
                }
            }
            return this.good;
        },
    }
    
}
</script>

<style lang="">
    .main{
        text-align: center;
        position: relative;
        height: 70px;
        border: 1px solid red;
    }
    .imgTop{
        margin-top: -20px;
        z-index: 1;
    }
    .gray{
        width: 100%;
        background:#F4F5F7 ;
        height: 20px;
    }
    .van-icon-arrow-left{
        color: white;
    }
    .van-submit-bar__bar{
        width: 100%;
    }
</style>