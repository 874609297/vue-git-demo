const mutations ={
    mutationsLogin:function(state,playload){
        state.isLogin=true;
        state.UserName=playload
    },
}
export default mutations;