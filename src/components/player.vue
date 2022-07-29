<template>
   <div class="player">
    <!-- 播放列表 -->
      <div class="list" v-show="isShowList">
        <div class="playTop">
          <div class="title">当前播放</div>
          <div class="other">
            <div class="left">总{{playList.length}}首</div>
            <div class="right">
              <div class="all">收藏全部</div>
              <div class="clear" @click="clear">清空列表</div>
            </div>
          </div>
        </div>
        <div class="add" v-show="!playList.length">
          <p>你还没有添加任何歌曲！</p>
          <p>去首页<a @click.prevent="toHome">发现音乐</a></p>
        </div>
        <div class="playBottom" v-show="playList.length">
          <ul>
            <li v-for="item in playList" :key="item.index">
              <div class="PBLeft">
                <div class="PBIcon" >
                  <img v-if="item.isNowPlay" src="../assets/images/pause.png" alt="">
                </div>
                <div class="singname">{{item.name}}</div>
                <div class="alias" v-if="item.alias">&nbsp;{{"("+item.alias+")"}}</div>
                <div class="sq" v-if="item.sq">SQ</div>
                <div class="mv" v-if="item.mvid">MV</div>
              </div>
              <div class="PBRight">
                  <div class="singer" >
                    <div v-for="art in item.artName" :key="art.index">{{art.name}}</div>
                  </div>
                  <div class="songtimes">{{item.duration}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 进度条 -->
      <div class="top"></div>
      <div class="bottom">
         <div class="left">
          <!-- 歌曲封面 -->
          <img :src=playData.img alt="" v-show="playData.img">
          <div class="msg">
            <div class="name">
              <!-- 歌名 -->
              <div class="songName">
                {{playData.name}}&nbsp;&nbsp;
              </div>
              <!-- 歌手 -->
              <div class="art" v-show="playData.artName">
                <div v-for="art in playData.artName" :key="art.index">-&nbsp;{{art.name}}</div>
                
              </div>
            </div>
            <!-- 歌曲时长 -->
            <div class="time" v-show="playData.duration">00:00/{{playData.duration}}</div>
          </div>
        </div>
      <!-- 播放控件 -->
      <div class="middle">
        <div class="collection">
          <img src="../assets/images/未收藏.png" alt="">
        </div>
        <!-- 上一首 -->
        <div class="pre">
           <img src="../assets/images/上一首.png" alt="">
        </div>
        <!-- 播放暂停键 -->
        <div class="play" @click="isPlay">
           <img v-show="!is_play" src="../assets/images/播放.png" alt="">
           <img v-show="is_play" src="../assets/images/暂停.png" alt="">
        </div>
        <!-- 下一首 -->
        <div class="next">
           <img src="../assets/images/下一首.png" alt="">
        </div>
      </div>
      <div class="right">
        <!-- 播放模式 -->
        <div class="circle">
          <img src="../assets/images/循环.png" alt="">
        </div>
        <!-- 播放列表 -->
        <div class="menu" @click="showList">
           <img src="../assets/images/歌单.png" alt="">
        </div>
        <!-- 音量 -->
        <div class="vice">
          <img src="../assets/images/音量.png" alt="">
        </div>
      </div>
    </div>
    <!-- 播放器 -->
     <audio :src="playData.url" ref="audio" @play="is_play=true" @pause="is_play=false" preload:auto></audio>
    </div>
   
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
    data(){
        return{
            is_play:false, // 是否播放
            // 在播放音乐的属性
            playData:{},
            isShowList:false,
        }
    },
    methods:{
        ...mapMutations(['clearPlayList']),
        // 是否播放
        isPlay(){
            if(this.playData.url){
              this.is_play = !this.is_play
            }
            
        },
        // 歌曲列表展示
        showList(){
            this.isShowList = !this.isShowList
        },
        // 清空播放列表
        clear(){
          // 清除正在播放
          this.playData = {},
          // 清空vuex中的播放列表
          this.clearPlayList()
          // 暂停音乐
          this.$refs.audio.pause() // 暂停
        },
        // 前往首页
        toHome(){
          if(this.$route.path === '/Discover-music'){
            // 隐藏播放列表
            this.isShowList = false
          }else{
             // 隐藏播放列表
            this.isShowList = false
            // 前往个性推荐页
            this.$router.push('/Discover-music')
          }
        }
    },
    created(){
          // 获取正在播放到歌曲信息
          this.playData = this.nowplay 
    },
    mounted(){
      
    },
    computed:{
      ...mapState(['playList','nowplay'])
    },
    watch:{
      nowplay(){
        if(this.nowplay.id){
          this.is_play = false
          this.playData = this.nowplay
          setTimeout(()=>{
            console.log('开始播放音乐');
            this.is_play = true
          },1)
        }
      },
      playList(){
        this.playList.forEach(item => {
            if(item.id !== this.nowplay.id){
              item.isNowPlay = false
            }
        });
      },
      // 通过控制is_play属性来决定播放和暂停
      is_play(){
        if(this.is_play){
            this.$refs.audio.play() // 播放
        }else{
            this.$refs.audio.pause() // 暂停
        }
      }
    }
}
</script>
<style scoped lang="less">
 .player{
    width: 1000px;
    height: 70px;
    position: absolute;
    top: 600px;
    background: #fff;
    z-index: 9999;
    .list{
      height: 550px;
      width: 40%;
      overflow: hidden;
      overflow-y: scroll;
      background-color: rgb(255, 255, 255);
      position: absolute;
      top: -550px;
      right: 0;
      box-shadow: -3px 0 5px rgba(0, 0, 0, 0.132);
      .playTop{
        padding: 15px 20px 0 20px;
        .title{
          font-size: 22px;
          font-weight: bolder ;
          padding-bottom: 20px;
        }
        .other{
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #c2c2c2;
          padding-bottom: 10px;
          .right{
            display: flex;
            font-size: 13px;
            .all{}
            .clear{
              color: rgb(61, 141, 234);
              padding-left: 20px;
            }
          }
          .left{
            font-size: 12px;
            color: rgb(173, 173, 173);
          }
        }
      }
      .add{
        font-size: 13px;
        color: rgb(173, 173, 173);
        margin-top: 100px;
        p{
          text-align: center;
          line-height: 40px;
          a{
            text-decoration: underline;
          }
        }
      }
      .playBottom{
        ul{
          li{
            display: flex;
            font-size: 12px;
            padding: 8px 25px 8px 0;
            .PBLeft{
              display: flex;
              width: 50%;
              align-items: center;
              .PBIcon{
                height:24px;
                width:20px;
                display: flex;
                justify-content: center;
                align-items: center;
                img{
                  width: 10px;
                  height: 10px;
                }
              }
              .singname{
                max-width: 140px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .alias{
                max-width: 100px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                color: #a6a6a6;
              }
              .sq{
                box-sizing: border-box;
                transform: scale(0.7);
                color: #d33939;
                border: 1px solid #d33939;
                padding: 0 2px;
                border-radius: 5px;
              }
              .mv{
                color: red;
                border: 1px solid red;
                padding: 0 2px;
                border-radius: 5px;
                transform: scale(0.7);
              }
              
            }
            .PBRight{
              width:50%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              .singer{
                color: #767676;
                display: flex;
                div{
                  margin-right: 10px;
                }
              }
              .songtimes{
                color: #a6a6a6;
              }
        }
          }
          li:nth-child(2n){
            background-color: rgb(242, 242, 242);
          }
          li:hover{
            background-color: rgb(238, 238, 238);
          }
        }
      }
    }
    .top{
      width: 100%;
      height: 2px;
      background: red;
    }
    .bottom{
      display: flex;
      
      height: 60px;
      .left{
        display: flex;
        img{
          width: 40px;
          height: 40px;
          border-radius: 5px;
          margin: 10px;
        }
        .msg{
          margin: 10px 0;
          font-size: 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .name{
            display: flex;
            width: 280px;
            .songName{
              width: 160px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .art{
              font-size: 12px;
              color: #8a8a8a;
              display: flex;
              div{
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          
          }
          .time{
            font-size: 12px;
            color: #bababa;
          }
        }
    }
      .middle{
        display: flex;
        align-items: center;
        
        img{
          width: 20px;
          
        }
        .collection{
          margin-right: 50px;
        }
        .play{
          margin: 0 20px;
          img{
            width: 45px;
          }
        }
      }
      .right{
        display: flex;
        align-items: center;
         img{
          width: 20px;
          height: 20px;
          margin-right: 20px;
        }
      }
    }
  }
</style>