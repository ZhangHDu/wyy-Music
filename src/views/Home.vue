<template>
  <div class="home">
    <!-- 头部组件 -->
     <top :all="all"/>
     <!-- 内容区 -->
    <div class="main"> 
      <div class="left">
        <aside>
          <!-- 用户头像以及名称 -->
          <div class="user" >
            <!-- 未登录时 -->
            <img src="../assets/images/用户名.png" alt="" v-if='!cookie'>
            <!-- 登录后用户头像 -->
            <router-link to="user">
              <img :src="this.avatarUrl" alt="" v-if="cookie">
            </router-link>
            
            <!-- 用户昵称 -->
            <div class="name" @click.stop="showLogin">{{username}}</div>
            <div class="more" @click.stop="showLogin">
              <img src="../assets/images/右三角形.png" alt="">
            </div>
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
    <!-- 个人信息 -->
    <userCard v-if="isShowUser" v-model="isShowUser"/>
    <!-- 底部播放器组件 -->
    <player />

  </div>
</template>

<script>
import user from '../http/api/user'
import player from '../components/player'
import top from '../components/top'
import login from '../components/login'
import userCard from '../components/userCard'
import {mapMutations,mapState} from 'vuex'

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
      isShowLogin:false, // 是否显示登录页面
      isShowUser:false, // 是否显示用户信息
      username:'未登录',
      user:{
        sex:null,
        eventCount:null,
        follows:null,
        followeds:null,
        description:null,
        createdPlaylistCount:null,
        subPlaylistCount:null,
        createPlaylist:[],
        subPlaylist:[],
        levelData:{}
      }
      
    }
  },
  methods:{
    ...mapMutations(['getUserDetails']),
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
        this.isShowUser = true
        console.log('个人中心');
      }
     
    },
    // 获取账号信息
        async getAccount(){
            const account = await user.getAccount()
           
            // 根据account中的uid获取用户详情
            this.getUser(account.account.id) 
            // 获取歌单
            this.getPlayList(account.account.id)
        },
        // 获取用户详情
        async getUser(id){
            const details = await user.getUser(id)
            // 获取性别
            this.user.sex = details.profile.gender
            // 动态
            this.user.eventCount = details.profile.eventCount
            // 关注
            this.user.follows = details.profile.follows
            // 粉丝
            this.user.followeds = details.profile.followeds
            // 个人介绍
            this.user.description = details.profile.description
        },
         // 获取用户信息 , 歌单，收藏，mv, dj 数量
        async getUserNums(){
            const {createdPlaylistCount,subPlaylistCount} = await user.getSubcount()
            this.user.createdPlaylistCount = createdPlaylistCount
            this.user.subPlaylistCount = subPlaylistCount
        },
        // 获取用户歌单
        async getPlayList(id){
            const res = await user.getPlayList(id)
            const allList = res.playlist
            // 根据创建歌单数量对总歌单切割获取用户创建的歌单
            this.user.createPlaylist = allList.slice(0,this.user.createdPlaylistCount)
            // 剩下的就是用户收藏的歌单
            this.user.subPlaylist = allList.slice(this.user.createdPlaylistCount,allList.length)
            
        },
        async getLevel(){
          const res = await user.getLevel()
          this.user.levelData = res.data
        }
  },
  created(){
    this.username = this.name
     
    if(this.cookie){
      // 获取账号信息
      this.getAccount()
      // 获取用户信息 , 歌单，收藏，mv, dj 数量
      this.getUserNums()
      // 获取等级
      this.getLevel()
      // 将整理好的用户信息通过vuex管理
      this.getUserDetails(this.user)
    }
  },
  components:{
    player,
    top,
    login,
    userCard
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
  border-radius: 10px;
  position: relative;
  margin: 10px auto;
  width: 1000px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.298);
  .main{
    display: flex;
    width: 100%;
      .left{
        height: 610px;
        width: 196px;
        background: #eaeaea;
        aside{
          .user{
            display: flex;
            align-items: center;
            font-size: 14px;
            justify-content: space-around;
            img{
              width: 40px;
              border-radius: 50%;
              margin: 10px;
            }
            .name{
              width: 100px;
              overflow: hidden;
              white-space: nowrap; //不允许换行
              text-overflow: ellipsis;
            }
            .more{
              height: 60px;
              display: flex;
              align-items: center;
              img{
                width: 10px;
                height: 10px;
              }
            }
          }
          .all{
            width: 196px;
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