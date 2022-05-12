import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)
const store = new vuex.Store({
    state:{
            name:"",//用户名
            avatarUrl:"",//头像
            cookie:""
       
    },
    mutations:{
        getName(state,name){
           return state.name = name
        
        },
        getAvatarUrl(state,url){
            return state.avatarUrl = url
         
         },
        getCookie(state,cookie){
            return state.cookie = cookie
        }
    }
})
export default store