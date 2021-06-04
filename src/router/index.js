import Vue from 'vue'
import VueRouter from 'vue-router';
import homepage from '../components/HomePage.vue';
import seekpage from '../components/SeekPage.vue';
import orderpage from '../components/OrderPage.vue';
import infomation from '../components/InformationPage.vue';
import UserLogin from '../components/UserLogin.vue';
import shopinfo from '../components/shopInfo.vue';
Vue.use(VueRouter);
const routes=[
    {path:'/',redirect:'/homepage'},
    {path:'/homepage/',component:homepage,props:true},
    {path:'/seekpage',component:seekpage,props:true},
    {path:'/orderpage',component:orderpage,props:true},
    {path:'/infomation',component:infomation,props:true},
    {path:'/userlogin',component:UserLogin},
    {path:'/shopinfo/:id',component:shopinfo,props:true}
];
const router =new VueRouter({
    routes:routes
})
export default router;