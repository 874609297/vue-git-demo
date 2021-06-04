import Vue from 'vue';
import vuex from 'vuex';
import mutations from './mutations.js';
Vue.use(vuex);

const store =new vuex.Store({
    state:{
        topic:[
            {name:'homepage',desc:'外卖'},
            {name:'seekpage',desc:'搜索'},
            {name:'orderpage',desc:'订单'},
            {name:'infomation',desc:'我的'}
        ],
        //是否登录
        isLogin:false,
        //用户名
        UserName:'',
    },
    mutations
})

export default store