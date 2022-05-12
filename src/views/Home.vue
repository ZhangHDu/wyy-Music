<template>
  <div class="home">
    <!-- 头部组件 -->
     <top :all="all"/>
     <!-- 内容区 -->
    <div class="main"> 
      <div class="left">
        <aside>
          <div class="user" @click="showLogin">
            <img src="../assets/images/用户名.png" alt="" v-if='!cookie'>
            <img :src="this.avatarUrl" alt="" v-if="cookie">
           
            <div class="name">{{username}}</div>
          </div>
          <div class="all">
            <router-link to="/Discover-music">
              <div class="all1 active" @click="toDiscover" v-show="all.isInDiscover">
                <img src="../assets/images/音乐2.png" alt="">
              发现音乐
              </div>
              <div class="all1" @click="toDiscover" v-show="!all.isInDiscover">
                <img src="../assets/images/音乐.png" alt="">
              发现音乐
              </div>
            </router-link>
            <router-link to="/FM" >
              <div class="all2 active" @click="toFM" v-show="all.isInFM">
               <img src="../assets/images/电台2.png" alt="">
              私人FM
              </div>
              <div class="all2" @click="toFM" v-show="!all.isInFM">
               <img src="../assets/images/电台.png" alt="">
              私人FM
              </div>
            </router-link>
            <router-link to="/video">
              <div class="all3 active" @click="toVideo" v-show="all.isInVideo">
                <img src="../assets/images/视频2.png" alt="">
              视频
              </div>
              <div class="all3" @click="toVideo" v-show="!all.isInVideo">
                <img src="../assets/images/视频.png" alt="">
              视频
              </div>
            </router-link>
            <router-link to="/friend">
              <div class="all4 active" @click='toFriend' v-show="all.isInFriend">
               <img src="../assets/images/friend2.png" alt="">
              朋友
              </div>
               <div class="all4" @click='toFriend' v-show="!all.isInFriend">
               <img src="../assets/images/friend.png" alt="">
              朋友
              </div>
            </router-link>
            
          </div>
          <div class="myMusic"></div>
          <div class="myList"></div>
        </aside>
      </div>
      <div class="right">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
        
      </div>
    </div>
    <!-- 登陆 -->
    <login v-model="isShowLogin" v-if="isShowLogin"/>
    <!-- 底部播放器组件 -->
    <player />
  </div>
</template>

<script>
// @ is an alias to /src
// import api from '../api/index.js'
import player from '../components/player'
import top from '../components/top'
import login from '../components/login'
import {mapState} from 'vuex'
export default {
  name: 'Home',
  data(){
    return{
      all:{
        // 用于控制导航栏变化
        isInDiscover:true, 
        isInVideo:false,
        isInFriend:false,
        isInFM:false
      },
      isShowLogin:false,
      username:'未登录'
    }
  },
  methods:{
    toDiscover(){
      this.all.isInDiscover = true
      this.all.isInVideo = false
      this.all.isInFriend = false
      this.all.isInFM = false
    },
    toFM(){
      this.all.isInDiscover = false
      this.all.isInVideo = false
      this.all.isInFriend = false
      this.all.isInFM = true
    },
    toVideo(){
      this.all.isInDiscover = false
      this.all.isInVideo = true
      this.all.isInFriend = false
      this.all.isInFM = false
    },
    toFriend(){
      this.all.isInDiscover = false
      this.all.isInVideo = false
      this.all.isInFriend = true
      this.all.isInFM = false
    },
    showLogin(){
      // 如果未登录，就改为true，显示登录界面。如果登录了点击进入个人页面
      if(!this.cookie){
         this.isShowLogin = true
      }else{
        this.isShowLogin = false
        console.log('个人中心');
      }
     
    }
  },
  created(){
  //  api.Search('周深').then(res=>{console.log(res.data);});
  },
  components:{
    player,
    top,
    login
  },
  computed:{
    ...mapState(['name','cookie','avatarUrl'])
  },
  updated(){
   this.username = this.name
  }
}
</script>
<style scoped lang="less">
.home{
  // width: 100%;
  // position: relative;
  min-width: 1000px;
  .main{
    display: flex;
    width: 100%;
      .left{
        height: 90vh;
        width: 216px;
        background: #eaeaea;
        aside{
          .user{
            display: flex;
            align-items: center;
            font-size: 14px;
            img{
              width: 40px;
              border-radius: 50%;
              margin: 10px;
            }
          }
          .all{
            width: 216px;
            font-size: 14px;
            color: #8a8a8a;
            .active{
              color: #d81e06;
              background: #dadada;
            }
            div{
              display: flex;
              align-items: center;
              padding: 10px 0 10px 20px;
            }
            div:hover{
              background-color: #dadada;
            }
            a{
               color: #8a8a8a;
            }
            img{
              width: 20px;
              margin-right: 10px;
            }
          }
        }
      }
      .right{
        width: 100%;
       
        
      }
  }
 
}
</style>