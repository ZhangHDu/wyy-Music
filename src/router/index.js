import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect:"/Discover-music", //默认进入个性推荐页面
    children : [
      {
        // 个性推荐
        path:"/Discover-music",
        name:"Discover-music",
        component:()=>import(/* webpackChunkName: "nucleic" */ '../views/all/Discover-music.vue'),
        meta:{
          keepAlive:true
        }
      },
      {
        // 私人FM
        path:"/FM",
        name:"FM",
        component:()=>import(/* webpackChunkName: "nucleic" */ '../views/all/FM.vue')
      },
      { 
        // 视频
        path:"/video",
        name:"video",
        component:()=>import(/* webpackChunkName: "nucleic" */ '../views/all/video.vue')
      },
      {
        // 朋友
        path:"/friend",
        name:"friend",
        component:()=>import(/* webpackChunkName: "nucleic" */ '../views/all/friend.vue')
      },
      {
        // 歌单
        path:"/playList",
        name:"playList",
        component:()=>import(/* webpackChunkName: "nucleic" */ '../views/all/Discover/playList'),
      },
      {
        // 歌单详情
        path:"/details",
        name:"details",
        component:()=>import(/* webpackChunkName: "nucleic" */ '../views/all/details'),
      },
      {
        // 主播电台
        path:"/station",
        name:"station",
        component:()=>import(/* webpackChunkName: "nucleic" */ '../views/all/Discover/station'),
      }
    ]
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
