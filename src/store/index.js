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
            topStyle:false, //顶部样式控制
            user:{} // 用户信息
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
        getUserDetails(state,user){
          return state.user = user
        },
        // 添加播放列表里的歌曲
        changePlayList(state,obj){
          // 先判断添加的歌曲是否已存在播放列表中
          state.playList.some((item,i)=>{
            if(item.id == obj.id){
              // 删除已存在项
              state.playList.splice(i,1)
              return true
            }
          })
          // 添加到歌单末尾
          state.playList.push(obj)
        },
        // 更改当前播放歌曲信息
        changeNowPlay(state,obj){
          // 重置播放时间
          // obj.switchTime = '00:00'
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
            }else{
              item.isNowPlay = true
            }
            }); 
        },
        // 替换播放列表
        replacePlayList(state,obj){
          state.playList = []
          state.playList = obj
        },
        // 添加播放列表
        addPlayList(state,obj){
          state.playList = [...state.playList,...obj]
        },
        changeTopStyle(state,a){
          return state.topStyle = a
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