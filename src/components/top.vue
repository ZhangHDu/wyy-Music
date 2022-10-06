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
              <input v-model="value" type="text" :style="changeStyle" @input="suggestSearch" @keyup.13="search"  @focus="showList" @blur="unshowList">
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
          <!-- 搜索历史 -->
          <div class="history" v-show="history.length!==0 && !isSearch">
            <div class="historyTitle">
              <div class="hTLeft">
                搜索历史
                <img src="../assets/images/top/删除.png" alt="" @click="clearHis">
              </div>
              <div class="hTRight">
                查看全部
              </div>
            </div>
            <div class="historyList" >
              <div class="old" v-for="item in history" :key="item.index" @click="goValue(item)">{{item}}</div>
            </div>
          </div>
          <div class="hot" v-show="!isSearch">
            <div class="hotListTitle">
              热搜榜
            </div>
            <!-- 热搜列表 -->
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
          <!-- 搜索建议 -->
          <div class="isSearch" v-if="isSearch">
            <div class="searchTitle" @click="toValue">搜“<div class='value'>{{value}}</div>”相关的结果&gt;</div>
            <!-- 单曲 -->
            <div class="song" v-if="suggestData.songs">
              <div class="Title">
                <img src="../assets/images/top/音乐.png" alt="">
                单曲
              </div>
              <div class="songList">
                <div class="item" v-for="item in suggestData.songs" :key="item.index">
                  {{item.name}}
                  <div class="tran" v-if="item.transNames">&nbsp;&nbsp;({{item.transNames[0]}})</div>
                  -
                  <div class="art" v-for="art in item.artists" :key="art.index">{{art.name}}</div>
                </div>
              </div>
            </div>
            <!-- 歌手 -->
            <div class="singer" v-if="suggestData.artists">
              <div class="Title">
                <img src="../assets/images/top/用户.png" alt="">
                歌手
              </div>
              <div class="singerList">
                <div class="item" v-for="item in suggestData.artists" :key="item.index">{{item.name}}</div>
              </div>
            </div>
            <!-- 专辑 -->
            <div class="cd" v-if="suggestData.albums">
              <div class="Title">
                <img src="../assets/images/top/专辑.png" alt="">
                专辑
              </div>
              <div class="cdList">
                <div class="item" v-for="item in suggestData.albums" :key='item.index'>{{item.name}}</div>
              </div>
            </div>
            <!-- 歌单 -->
            <div class="playList" v-if="suggestData.playlists">
              <div class="Title">
                <img src="../assets/images/top/歌单.png" alt="">
                歌单
              </div>
              <div class="list">
                <div class="item" v-for="item in suggestData.playlists" :key="item.index">{{item.name}}</div>
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
        value:'搜索',
        hotList:[], //热搜榜
        isSearch:false,
        suggestData:{},
        timer:null,
        keyword:null
      }
    },
    props:['all'],
    methods:{
      ...mapMutations(['changeTopStyle','addHistory','clearHistory']),
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
      // 聚焦事件
      showList(){
        this.show = true
        if(this.value == '搜索'){
          this.value = ''
        }else if(this.value){
          this.isSearch = true
          this.suggestSearch()
        }else{
          this.isSearch = false
        }
        
      },
      // 搜索建议
      async suggestSearch(){
        if(this.value !=='' && this.value !== '搜索'){
          const res = await search.suggest(this.value)
          this.suggestData = res.result
          this.isSearch = true
        }
        
      },
      // 失焦事件
      unshowList(){
        if(this.value===''){
          this.value = '搜索'
        }
        setTimeout(()=>{
          this.show = false
        },100)
      },
      // 回车搜索
      search(){
        // 关闭搜索组件
        this.show = false
        // 如果不是位于搜索结果页，直接跳转
        if(this.$route.path !== '/search'){
          this.$router.push({path:'/search',query:{value:this.value}})
          this.addHistory(this.value)
          this.keyword = this.value
        }else{
          // 否则替换路由
          if(this.keyword !== this.value){
            this.$router.replace({path:'/search',query:{value:this.value}})
            this.addHistory(this.value)
            this.keyword = this.value
          }else{
            console.log('关键词未发生变化，不进行跳转')
          }
         
        }
       
      },
      // 回车提交事件
      toValue(){
        this.search()
      },
      // 清空历史记录
      clearHis(){
        this.clearHistory()
      },
      // 点击搜索历史
      goValue(a){
        this.value = a
        this.$router.push({path:'/search',query:{value:this.value}})
      }
    },
    created(){
      // 改变顶部样式
       this.changeTopStyle(false)
      //  获取热搜榜
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
      },
       value(){
        if(this.value ==="" || this.value === '搜索'){
          this.isSearch = false
        }
      },
    },
    computed:{
      ...mapState(['topStyle','history'])
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
      .isSearch{
        font-size: 12px;
        color: #8a8a8a;
        .searchTitle{
          display:flex;
          padding: 5px;
          .value{
            color:rgb(89, 161, 242);
          }
        }
        .searchTitle:hover{
          color: #5a5a5a;
        }
        .song,.singer,.cd,.playList{
          color: #3a3a3a;
          
          .Title{
            display: flex;
            align-items: center;
            padding: 10px 5px;
            color: #8a8a8a;
            img{
              margin-right: 5px;
              width: 16px;
              height: 16px;
            }
          }
        }
        .singer{
          .singerList{
            .item{
              width: 100%;
              box-sizing: border-box;
              padding:5px 20px;
            }
            .item:hover{
              background:#ececec;
            }
          }
        }
        .cd{
          .cdList{
            .item{
              width: 100%;
              box-sizing: border-box;
              padding:5px 20px;
            }
            .item:hover{
              background:#ececec;
            }
          }
        }
        .playList{
          .item{
            width: 100%;
              box-sizing: border-box;
              padding:5px 20px;
          }
          .item:hover{
              background:#ececec;
            }
        }
        .song{
          .songList{
            .item{
              width: 100%;
              box-sizing: border-box;
              overflow: hidden;
              white-space: normal;
              text-overflow: ellipsis;
              padding:5px 20px;
              display:flex;
              .tran{
                color:#8a8a8a;
              }
            }
            .item:hover{
              background:#ececec;
            }
          }
        }
      }
    } 
}

</style>