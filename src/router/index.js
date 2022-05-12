import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children : [
      {
        path:"/Discover-music",
        name:"Discover-music",
        component:()=>import(/* webpackChunkName: "nucleic" */ '../views/all/Discover-music.vue'),
        meta:{
          keepAlive:true
        }
      },
      {
        path:"/FM",
        name:"FM",
        component:()=>import(/* webpackChunkName: "nucleic" */ '../views/all/FM.vue')
      },
      {
        path:"/video",
        name:"video",
        component:()=>import(/* webpackChunkName: "nucleic" */ '../views/all/video.vue')
      },
      {
        path:"/friend",
        name:"friend",
        component:()=>import(/* webpackChunkName: "nucleic" */ '../views/all/friend.vue')
      },
      {
        path:"/playList",
        name:"playList",
        component:()=>import(/* webpackChunkName: "nucleic" */ '../views/all/Discover/playList'),
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
