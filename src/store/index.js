import Vue from 'vue'
import vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
Vue.use(vuex)
const store = new vuex.Store({
    state:{
            name:"",//用户名
            avatarUrl:"",//头像
            cookie:"",
            playList:[], //播放歌单
            nowplay:{}, //当前播放
       
    },
    mutations:{
        // 更新用户名
        getName(state,name){
           return state.name = name
        },
        // 更新用户头像
        getAvatarUrl(state,url){
            return state.avatarUrl = url
         
         },
        //  更新cookie
        getCookie(state,cookie){
            return state.cookie = cookie
        },
        // 更新用户信息
        getUser(state,name,url,cookie){
            return state.name = name,
                    state.url = url,
                    state.cookie = cookie
        },
        // 添加播放列表里的歌曲
        changePlayList(state,obj){
          // 如果歌曲已经存在,不添加
          state.playList.push(obj)
        },
        // 更改当前播放歌曲信息
        changeNowPlay(state,obj){
           state.nowplay = obj
        },
        // 清空播放列表
        clearPlayList(state){
          return state.playList = [],state.nowplay = {}
        },
        // 是否播放标签修改
        changeIsNowPlay(state){
          state.playList.forEach(item => {
            if(item.id !== state.nowplay.id){
              item.isNowPlay = false
            }
        });
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