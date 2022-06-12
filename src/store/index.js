import Vue from 'vue'
import vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
Vue.use(vuex)
const store = new vuex.Store({
    state:{
            name:"",//用户名
            avatarUrl:"",//头像
            cookie:"",
            playList:[] //播放歌单
       
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
        },
        getUser(state,name,url,cookie){
            return state.name = name,
                    state.url = url,
                    state.cookie = cookie
        },
        changePlayList(state,obj){
          // 如果歌曲id已经存在，则放置最后，即当前播放音乐(暂时不做)
            return state.playList.push(obj)
        }
    },
    plugins: [
		createPersistedState({
      // 存储方式：localStorage、sessionStorage、cookies
			storage: window.sessionStorage,
      // 存储的 key 的key值
			key: "store",
			render(state) {
        // 要存储的数据：本项目采用es6扩展运算符的方式存储了state中所有的数据
				return { ...state };
			}
		})
	]
})
export default store