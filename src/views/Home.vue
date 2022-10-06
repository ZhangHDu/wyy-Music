<template>
  <div class="home">
    <!-- 头部组件 -->
     <top :all="all"/>
     <!-- 内容区 -->
    <div class="main"> 
      <div class="left" v-show='showPlayer'>
        <!-- 侧边栏 -->
        <aside>
          <!-- 用户头像以及名称 -->
          <div class="user" @click="showLogin">
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
          <!-- 发现音乐 fm 视频 朋友 -->
          <div class="all">
            <router-link to="/Discover-music">
              <div class="all1 active" v-show="all.isInDiscover">
                <img src="../assets/images/音乐2.png" alt="">
              发现音乐
              </div>
              <div class="all1" v-show="!all.isInDiscover">
                <img src="../assets/images/音乐.png" alt="">
              发现音乐
              </div>
            </router-link>
            <router-link to="/FM" >
              <div class="all2 active" v-show="all.isInFM">
               <img src="../assets/images/声波2.png" alt="">
              私人FM
              </div>
              <div class="all2" v-show="!all.isInFM">
               <img src="../assets/images/声波.png" alt="">
              私人FM
              </div>
            </router-link>
            <router-link to="/video">
              <div class="all3 active" v-show="all.isInVideo">
                <img src="../assets/images/视频2.png" alt="">
              视频
              </div>
              <div class="all3" v-show="!all.isInVideo">
                <img src="../assets/images/视频.png" alt="">
              视频
              </div>
            </router-link>
            <router-link to="/friend">
              <div class="all4 active"  v-show="all.isInFriend">
               <img src="../assets/images/friend2.png" alt="">
              朋友
              </div>
               <div class="all4" v-show="!all.isInFriend">
               <img src="../assets/images/friend.png" alt="">
              朋友
              </div>
            </router-link>
            
          </div>
          <!-- 我的音乐 -->
          <div class="myMusic">
            <div class="mMtitle">我的音乐</div>
            <ul>
              <li>
                <img src="../assets/images/音乐3.png" alt="">
                iTunes音乐
              </li>
              <li>
                <img src="../assets/images/下载1.png" alt="">
                下载管理
              </li>
              <li>
                <img src="../assets/images/最近常用.png" alt="">
                最近播放
              </li>
              <li>
                <img src="../assets/images/云.png" alt="">
                我的音乐云盘
              </li>
              <li>
                <img src="../assets/images/电台.png" alt="">
                我的电台
              </li>
              <li>
                <img src="../assets/images/收藏1.png" alt="">
                我的收藏
              </li>
            </ul>
          </div>
          <!-- 我的歌单 -->
          <div class="myList">
            <div class="createList">
              <div class="cLtitle" @click="openList(true)">
                <div class="cLleft">
                  <div class="cLicon">
                    <img src="../assets/images/右三角形.png" alt="" v-show="!openCreateList">
                    <img src="../assets/images/下三角.png" alt="" v-show="openCreateList">
                  </div>
                  <div class="cLname">创建的歌单</div>
                </div>
                <div class="cLright">
                  <img src="../assets/images/添加1.png" alt="" @click.stop="createList">
                </div>
              </div>
              <ul v-show="openCreateList">
                <li v-for="item in user.createPlaylist" :key="item.id" @click="toPlayList(item.id)"> 
                     <img class="liIcon" src="../assets/images/歌单1.png" alt="" v-if="!item.isFirst">
                  <img class="liIcon" src="../assets/images/Love.png" alt="" v-else>
                  <div class="liname">
                    {{item.name}}
                  </div>
                  <img  src="../assets/images/心跳.png" alt="" v-if="item.isFirst">
                </li>
              </ul>
            </div>
            <div class="strList">
              <div class="sLtitle" @click="openList(false)">
                <div class="sLleft">
                  <div class="sLicon">
                    <img src="../assets/images/右三角形.png" alt="" v-show="!openStrList">
                    <img src="../assets/images/下三角.png" alt="" v-show="openStrList">
                  </div>
                  <div class="sLname">收藏的歌单</div>
                </div>
              </div>
              <ul v-show="openStrList">
                <li v-for="item in user.subPlaylist" :key="item.id" @click="toPlayList(item.id)">
                  <img class="liIcon" src="../assets/images/歌单1.png" alt="">
                 
                  <div class="liname">
                    {{item.name}}
                  </div>
                </li>
              </ul>
            </div>
          </div>
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
    <player v-show='showPlayer'/>

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
      openCreateList:false,// 是否展开创建的歌单
      openStrList:false,// 是否展开收藏的歌单
      username:'未登录',
      showPlayer:true, //显示底部播放器组件
      user:{
        sex:null,
        eventCount:null,
        follows:null,
        followeds:null,
        description:null,
        name:'未登录',
        avatar:null,
        createdPlaylistCount:null,
        subPlaylistCount:null,
        createPlaylist:[],
        subPlaylist:[],
        levelData:{}
      }
      
    }
  },
  methods:{
    ...mapMutations(['getUserDetails','getName','getAvatarUrl']),
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
            this.user.createPlaylist[0].isFirst = true
            // 剩下的就是用户收藏的歌单
            this.user.subPlaylist = allList.slice(this.user.createdPlaylistCount,allList.length)  
        },
        // 获取等级信息
        async getLevel(){
          const res = await user.getLevel()
          this.user.levelData = res.data
        },
        // 判断路由位置控制样式
        routeChange(){
          if(this.$route.path == '/FM'){
            this.all.isInFM = true
          }else{
            this.all.isInFM = false
          }
          if(this.$route.path == '/Discover-music'){
            this.all.isInDiscover = true
          }else{
            this.all.isInDiscover = false
          }
          if(this.$route.path == '/video'){
            this.all.isInVideo = true
            
          }else{
            this.all.isInVideo = false
          }
          if(this.$route.path == '/videoDetail'){
            this.showPlayer = false
          }else{
            this.showPlayer = true
          }
          if(this.$route.path == '/friend'){
            this.all.isInFriend = true
          }else{
            this.all.isInFriend = false
          }
        },
        // 跳转歌单详情
        toPlayList(id){
          this.$router.push({ path: '/details', query: { id: id } })
        },
        // 展开歌单
        openList(a){
          if(a){
            this.openCreateList = !this.openCreateList
          }else{
            this.openStrList = !this.openStrList
          }
        },
        // 创建歌单
        createList(){
          
        },
        // 创建时路由位置
        createdRoute(){
          if(this.$route.path!== '/Discover-music'){
            this.$router.push('/Discover-music')
          }
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
    this.createdRoute()
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
  watch:{
    $route(){
      this.routeChange()
    }
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
          width: 100%;
          height: 547px;
          overflow-y: scroll;
          .user{
            display: flex;
            align-items: center;
            font-size: 14px;
            justify-content: space-around;
            img{
              width: 40px;
              border-radius: 50%;
              margin: 5px;
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
            font-size: 13px;
            
            .active{
              color: #d81e06;
              background: #dadada;
            }
            div{
              display: flex;
              align-items: center;
              padding: 8px 0 8px 20px;
            }
            div:hover{
              background-color: #dadada;
            }
            a{
               color: #2c2c2c;
            }
            img{
              width: 20px;
              margin-right: 10px;
            }
            
          }
          .myMusic{
            .mMtitle{
              padding: 10px 20px;
              font-size: 13px;
              color: #8a8a8a;
            }
            ul{
              li{
                display: flex;
                align-items: center;
                font-size: 13px;
                color: #2c2c2c;
                padding: 8px 0 8px 20px;
                img{
                  width: 18px;
                  height: 18px;
                  padding-right: 10px;
                }
              }
            }
          }
          .myList{
            padding-top: 20px;
            .createList{
              margin-bottom: 20px;
              .cLtitle{
                  color: #8a8a8a;
                  font-size:13px;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  .cLleft{
                    display: flex;
                    align-items: center;
                    .cLicon{
                      img{
                        width: 10px;
                        padding: 0 5px;
                      }
                    } 
                  }
                  .cLright{
                    margin-right: 15px;
                    display: flex;
                    align-items: center;
                    img{
                      width: 13px;
                    }
                  }
              }
              ul{
                li{
                  display: flex;
                  align-items: center;
                  font-size: 13px;
                  color: #2c2c2c;
                  
                  padding: 7px 20px 7px 0;
                  .liIcon{
                    width: 15px;
                    padding: 0 10px 0 20px;
                  }
                  img{
                    width:18px;
                  }
                  .liname{
                    white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  }
                }
                li:hover{
                  background-color: #dadada;
                }
              }
            }
            .strList{
              .sLtitle{
                  color: #8a8a8a;
                  font-size:13px;
                  .sLleft{
                    display: flex;
                    align-items: center;
                    .sLicon{
                      img{
                        width: 10px;
                        padding: 0 5px;
                      }
                    } 
                  }
              }
              ul{
                li{
                  display: flex;
                  align-items: center;
                  font-size: 13px;
                  color: #2c2c2c;
                  
                  padding: 7px 20px 7px 0;
                  .liIcon{
                    width: 15px;
                    padding: 0 10px 0 20px;
                  }
                  img{
                    width:18px;
                  }
                  .liname{
                    white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  }
                }
                li:hover{
                  background-color: #dadada;
                }
              }
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