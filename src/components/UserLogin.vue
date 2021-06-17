<template>
    <div>
        <van-nav-bar left-arrow/>
        <div class="title">
            <b>硅谷外卖</b>
        </div>
        <van-tabs v-model="active" style="margin-top:50px">
        <van-tab title="登录" style="text-align: center;">
            <van-cell-group>
            <van-field v-model="uid"  placeholder="请输入用户名" />
            <van-field v-model="upwd"  placeholder="请输入密码" :type="ftype">
                <template #button>
                    <van-switch v-model="checked" active-color="rgb(0,166,124)" @change="change"/>
                </template>
            </van-field>
            </van-cell-group>
            <van-button round type="primary" @click="LoginBtn" >登录</van-button>
        </van-tab>
        <van-tab title="注册" style="text-align: center;">
            <van-cell-group>
            <van-field v-model="uid"  placeholder="手机/邮箱/用户名" />
            <van-field v-model="upwd"  placeholder="请输入密码" />
            <van-field v-model="upwd"  placeholder="请输入您的姓名" />
            </van-cell-group>
            <van-button round type="primary">注册</van-button>
        </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { Field ,NavBar,Switch ,Button ,Notify } from 'vant';
import {mapMutations} from 'vuex'
export default {
    name:'userlogin',
    components:{
        Field,
        NavBar,
        Switch,
        Button,
        Notify 
    },
    data() {
        return {
            uid:'',
            upwd:'',
            active:0,
            checked:false,
            ftype:'password'
        }
    },
    methods: {
        ...mapMutations(['mutationsLogin']),
        change:function(any){
            if(any==true){
                this.ftype="text"
            }else{
                this.ftype="password"
            }
        },
        LoginBtn:function(){
            //账号 admin 密码 123456
            var that = this;
            this.$axios.post('/user/login',{"account":this.uid,"password":this.upwd}).then(function(res){
                if(res.data&&res.data.id){
                    that.mutationsLogin(res.data.name);
                    window.localStorage.setItem('name',res.data.name);
                    window.localStorage.setItem('id',res.data.id);
                    Notify({ type: 'success', message: '登录成功' });
                    that.$router.push('/homepage');
                }
            })
        }
    },
}
</script>

<style>
    .van-nav-bar .van-icon{
        color: gray;
    }
    .title{
        width: 100%;
        text-align: center;
    }
    .title b{
        font-size: 45px;
        color: rgb(0, 166, 124);
    }
    .van-cell{
        /* width: 75%; */
        margin-top: 20px;
    }
    .van-button{
        width: 200px;
        margin-top: 30px;
    }
</style>