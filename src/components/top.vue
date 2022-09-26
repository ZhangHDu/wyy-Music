<template>
  <div class="head">
         <div class="top">
          <!-- 红黄绿按钮 -->
            <div class="top-left">
              <div class="red"></div>
              <div class="yellow"></div>
              <div class="green"></div>
            </div>
          <!-- 路由的前进和后退 -->
            <div class="top-right">
            <div class="pre" @click="preRouter">
              <img src="../assets/images/上一页.png" alt="">
            </div>
            <div class="next" @click="nextRouter">
              <img src="../assets/images/下一页.png" alt="">
            </div>
          </div>
        </div>
        <!-- 根据路由地址显示不同的内容 -->
        <div class="title" >
          <div class="aside" v-if="routePath === '/Discover-music'">
            <router-link to="/Discover-music">
              <div class="recommend">个性推荐</div>
            </router-link>
            <router-link to="/playList">
                <div class="Playlist">歌单</div>
            </router-link>
            <router-link to="/station">
              <div class="station">主播电台</div>
            </router-link>
            <div class="rank">排行榜</div>
            <div class="singer">歌手</div>
            <div class="news">最新音乐</div>
          </div>
          <div class="aside" v-if="routePath === '/video'">
            <div class="video">视频</div>
            <div class="mv">MV</div>
          </div>
          <div class="aside" v-else></div>
          <!-- 搜索框和其他按钮 -->
          <div class="base">
            <!-- 搜索 -->
            <div class="search">
              <img src="../assets/images/top/搜索.png" alt="" :style="changeStyle">
              <input type="text" placeholder="搜索" :style="changeStyle" @focus="showList" @blur="unshowList">
            </div>
            <!-- 设置 -->
            <div class="set" v-if="!topStyle">
              <div class="setbtn">
                  <img src="../assets/images/设置白.png" alt="">
              </div>
               <!-- <div class="msg">
                     <img src="../assets/images/邮件白.png" alt="">
               </div>
              <div class="skill">
                    <img src="../assets/images/衣服白.png" alt="">
              </div> -->
          </div>
           <div class="set" v-if="topStyle">
              <div class="setbtn">
                  <img src="../assets/images/设置黑.png" alt="">
              </div>
               <!-- <div class="msg">
                     <img src="../assets/images/邮件黑.png" alt="">
               </div>
              <div class="skill">
                    <img src="../assets/images/衣服黑.png" alt="">
              </div> -->
          </div>
          
        </div>        
        </div>
        <!-- 点击搜索框展示更多内容 -->
        <div class="searchList" v-show="show">
          <div class="history">
            <div class="historyTitle">
              <div class="hTLeft">
                搜索历史
                <img src="../assets/images/top/删除.png" alt="">
              </div>
              <div class="hTRight">
                查看全部
              </div>
            </div>
            <div class="historyList">
              <div class="old">陈奕迅</div>
              <div class="old">周杰伦</div>
              <div class="old">张学友</div>
              <div class="old">谭咏麟</div>
            </div>
          </div>
          <div class="hot">
            <div class="hotListTitle">
              热搜榜
            </div>
            <div class="hotList">
              <div class="hotItem" v-for="(item,index) in hotList" :key="index">
                <div class="index" style="color:#f73218;" v-if="index<=2">{{index + 1}}</div>
                <div class="index" v-else>{{index + 1}}</div>
                <div class="data">
                  <div class="name">
                    {{item.searchWord}}&nbsp;
                    <span class='score'>{{item.score}}</span>
                    <i class="hotIcon" v-if="index===0">HOT</i>
                  </div>
                  <div class="desc" v-if="item.content">{{item.content}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
  </div>
</template>

<script>
import search from '../http/api/search.js'
import {mapState,mapMutations} from 'vuex'
export default { 
    data(){
      return{
        changeStyle:'background: rgb(221, 109, 94);color:rgba(255, 255, 255, 0.742);', //搜索框样式
        setStyle:'',
        routePath:'/Discover-music',
        show:false, // 是否显示搜索内容
        history:[], // 搜索历史
        hotList:[], //热搜榜
      }
    },
    props:['all'],
    methods:{
      ...mapMutations(['changeTopStyle']),
      // 上一个路由地址
      preRouter(){
        this.$router.go(-1)
      },
      // 下一个路由地址
      nextRouter(){
        this.$router.go(1)
      },
      // 获取热搜榜
      async getHotSearch(){
        const res = await search.hotSearch()
        this.hotList = res.data
      },
      showList(){
        this.show = true
      },
      unshowList(){
        this.show = false
      }
    },
    created(){
       this.changeTopStyle(false)
       this.getHotSearch()
    },
    watch:{
      topStyle(){
        if(this.topStyle){
          // 白色
          setTimeout(()=>{
            this.changeStyle = "background:rgb(230, 232, 232);color: #2c2c2c;"
          },350)
        }else{
          // 红色
          this.changeStyle = "background: rgb(221, 109, 94);color: rgba(255, 255, 255, 0.742);"
        }
      },
      $route(){
        if(this.$route.path == '/Discover-music'){
          this.routePath = '/Discover-music'
        }else if(this.$route.path == '/video'){
          this.routePath = '/video'
        }else{
          this.routePath = 'none'
        }
      }
    },
    computed:{
      ...mapState(['topStyle'])
    },
}
</script>

<style scoped lang='less'>
.head{
    display: flex;
    width: 100%;
    position: relative;
    .top{
          height: 50px;
          width: 196px;
          background: #da5948;
          display: flex;
          justify-content: space-between;
          .top-left{
            width: 196px;
            display: flex;
            margin-top: 10px;
            margin-left: 10px;
            position: relative;
            div{
              position: absolute;
              z-index: 9999;
              width: 12px;
              height: 12px;
              border-radius: 50%;
            }
            .red{
              background-color: #ec7070;
            }
            .yellow{
              background-color: rgb(241, 217, 78);
              left: 20px;
            }
            .green{
              background-color: rgb(96, 212, 96);
              left: 40px;
            }
          }
          .top-right{
            display: flex;
            align-self: flex-end;
            margin-bottom: 5px;
            img{
              width: 20px;
            }
            img:hover{
              background-color: #fb5b46;
              border-radius: 50%;
            }
            .pre{
              margin-right: 15px;
            }
          }
        }
    .title{
          width: 100%;
          height: 50px;
          background: #d75341;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .aside{
            display: flex;
            align-items: center;
            font-size: 14px;
            margin-left: 10px;
            color: rgba(255, 255, 255, 0.742);
            a{
               color: rgba(255, 255, 255, 0.742);
            }
            div{
              height: 25px;
              line-height: 25px;
              margin: 0 10px;
            }
            div:hover{
              color: #fff;
            }
          }
          .base{
            display: flex;
            position: absolute;
            right: 0;
            z-index: 9999;
            .search{
            line-height: 50px;
            display: flex;
            align-items: center;
            img{
              width: 15px;
              height: 15px;
              padding-top: 5px;
              padding-bottom: 5px;
              padding-left: 7px;
              border-radius: 12.5px 0 0 12.5px;
            }
            input{
              height: 25px;
              padding: 0;
              border: 0;
              border-radius: 0 12.5px 12.5px 0;
              font-size: 12px;
              outline: none;
              padding-left: 5px;
            }
            input::-webkit-input-placeholder{
              color: rgba(255, 255, 255, 0.74);
            }
          }
          .set{
              display: flex;
              align-items: center;
              margin-right: 10px;
              div{
                  margin: 0 10px;
                  width: 30px;
                  height: 30px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
              }
              div:hover{
                  border-radius: 15px;
                  background-color: #d04f3e;
              }
              img{
                 width: 20px;
             }
          }
          }
        }
    .searchList{
      position: absolute;
      right: 0;
      top: 50px;
      width: 350px;
      height: 548px;
      background-color: #fff;
      z-index: 9999;
      box-shadow: -3px 0 4px rgba(40, 40, 40, 0.083);
      overflow-y: scroll;
      .history{
        padding:0 20px;
        .historyTitle{
          display:flex;
          align-item:center;
          padding: 20px 0;
          justify-content: space-between;
          color: #515151;
          .hTLeft{
            font-size: 15px;
            display: flex;
            align-items: center;
            img{
              margin-left: 7px;
              width: 15px;
              height: 15px;
            }
          }
          .hTRight{
            font-size: 12px;
          }
        }
        .historyList{
          font-size:12px;
          display:flex;
          flex-wrap: wrap;
          .old{
            border: 1px solid #adadad;
            padding: 3px 15px;
            border-radius: 15px;
            margin-right: 10px;
            margin-bottom: 10px;
          }
          .old:hover{
            background-color: rgb(228, 228, 228);
          }
        }
      }
      .hot{
        padding:0 20px;
        .hotListTitle{
          color: #515151;
          font-size: 15px;
          padding:20px 0;
        }
        .hotList{
          .hotItem{
            display:flex;
            align-items: center;
            padding: 20px 0;
            .index{
              font-size: 16px;
              padding-right: 25px;
            }
            .data{
              font-size: 12px;
              .name{
                font-weight: bold;
                .score{
                  font-weight: 400;
                  color:rgb(178, 178, 178);
                }
                .hotIcon{
                  color:#f73218;
                  margin-left: 20px;
                }
              }
              .desc{
                padding-top: 10px;
                color: #8d8d8d;
              }
            }
          }
        }
      }
    } 
}

</style>