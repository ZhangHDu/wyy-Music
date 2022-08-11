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
            <li v-for="item in playList" :key="item.index" @dblclick="playNow(item)">
              <div class="PBLeft">
                <div class="PBIcon" >
                  <img v-if="item.isNowPlay && !is_play" src="../assets/images/pause.png" alt="">
                  <img v-if="item.isNowPlay && is_play" src="../assets/images/播放2.png" alt="">
                </div>
                <div class="singname" v-if="!item.isNowPlay">{{item.name}}</div>
                <div class="singname" v-if="item.isNowPlay" style="color:#d81e06;">{{item.name}}</div>
                <div class="alias" v-if="item.alias&&!item.isNowPlay">&nbsp;{{"("+item.alias+")"}}</div>
                <div class="alias" v-if="item.alias&&item.isNowPlay" style="color:#d81e06;">&nbsp;{{"("+item.alias+")"}}</div>
                <div class="sq" v-if="item.sq">SQ</div>
                <div class="mv" v-if="item.mvid">MV</div>
              </div>
              <div class="PBRight">
                  <div class="singer" v-if="item.isNowPlay" style="color:#d81e06;">
                    <div>{{item.artName}}</div>
                  </div>
                  <div class="singer" v-else>
                     <div>{{item.artName}}</div>
                  </div>
                  <div class="songtimes">{{item.time}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="songDetail" ref="songDetail" :style="detailStyle">
        <div class="SDTop">

        </div>
        <div class="SDMiddle">
          <div class="SDMLeft">
            <!-- 唱针 -->
            <div class="arm" :style="armStyle">
              <img src="../assets/images/唱针.png" alt="">
            </div>
            <!-- 黑胶唱片 -->
            <div class="black">
              <div class="blackBox">
                <img src="../assets/images/唱片.png" alt="">
                <img :src="playData.img" alt="" v-if="playData.img" :style="blackStyle">
              </div>
              
            </div>
            <!-- 收藏，添加歌单，下载，分享 -->
            <div class="fourBtn">
              <div class="iLove">
                <img src="../assets/images/爱心.png" alt="">
              </div>
              <div class="addList">
                <img src="../assets/images/添加文件.png" alt="">
              </div>
              <div class="download">
                <img src="../assets/images/下载.png" alt="">
              </div>
              <div class="share">
                <img src="../assets/images/分享.png" alt="">
              </div>
            </div>
          </div>
          <!-- 歌词 -->
          <div class="SDMRight">
            <!-- 歌名 -->
            <div class="SDname">
              {{playData.name}}
              <div class="SDMRmv" v-show="playData.mvid">MV</div>
            </div>
            <!-- 简介 -->
            <div class="alias" v-if="playData.alias">
              {{playData.alias}}
            </div>
            <div class="SDother">
              <!-- 专辑 -->
              <div class="cd">专辑：
                <div class="name">
                  {{playData.name}}</div>
                </div> 
                <!-- 歌手 -->
              <div class="songer">歌手：
                <div class="art">
                  {{playData.artName}}
                </div>
              </div>
              <!-- 来源 -->
              <div class="for">来源：
                <div class="from">
                  {{playData.for}}
                </div>
              </div>
            </div>
            <!-- 歌词 -->
            <div class="lyrics" ref="lrc" v-if="lrcArr.length !=0">
              <div v-for="item in lrcArr" :key="item.index" :class="item.active" >{{item.content}}</div>
            </div>
            <div class="lyrics2" v-else>
              还没有歌词哦～
            </div>
          </div>
        </div>
        <!-- 评论 -->
        <div class="SDComments">
          <!-- 评论 -->
          <div class="SDCleft">
            <div class="sendComments">
              <div class="SDtitle">听友评论&nbsp;</div>
              <div class="SDnums">（已有{{total}}条评论）</div>
            </div>
            <div class="sendWindow">
              <div class="swleft">
                <img src="../assets/images/write.png" alt="">
                发表评论
              </div>
              <div class="swright">
                <img src="../assets/images/笑脸.png" alt="">
                <img src="../assets/images/at.png" alt="">
              </div>
            </div>
            <div class="title">精彩评论</div>
            <comments :comments='hotComments'/>
            <div class="title">最新评论</div>
             <comments :comments='comments' />
          </div>
          <!-- 包含歌单 -->
          <!-- 相似歌曲 -->
          <div class="SDCright">
            <div class="SDCtitle" v-if="simiList.length != 0">包含这首歌的歌单</div>
             <div class="simi" v-for="item in simiList" :key="item.index" @click="toDetails(item.id)">
              <div class="simileft">
                <img :src="item.coverImgUrl" alt="">
              </div>
              <div class="simiright">
                <div class="smrT">
                  <div class="siminame">
                    {{item.name}}&nbsp;
                  </div>
                </div>
                <div class="smrB">
                  <div class="art">
                    {{item.playCount}}
                  </div>
                </div>
              </div>
            </div>
            <div class="SDCtitle">相似歌曲</div>
            <div class="simi" v-for="item in simi" :key="item.index" @click="playThis(item)">
              <div class="simileft">
                <img :src="item.album.blurPicUrl" alt="">
              </div>
              <div class="simiright">
                <div class="smrT">
                  <div class="siminame">
                    {{item.album.name}}&nbsp;
                  </div>
                  <div class="smalias" v-if="item.alias">
                    {{item.alias[0]}}
                  </div>
                </div>
                <div class="smrB">
                  <div class="art" v-for="art in item.album.artists" :key="art.index">
                    {{art.name}}&nbsp;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 进度条 -->
      <div class="top">
        <div class="light" ref="light" :style="long"></div>
      </div>
      <div class="bottom">
         <div class="left">
          <!-- 歌曲封面 -->
          <div class="imgBox" >
             <img :src=playData.img alt="" v-if="playData.img">
             <div class="blur" @click="showSongDetail" v-if="playData.img"></div>
          </div>
          <div class="msg">
            <div class="name">
              <!-- 歌名 -->
              <div class="songName">
                {{playData.name}}&nbsp;
              </div>
              <!-- 歌手 -->
              <div class="art" v-show="playData.artName">
                {{"-"+" "+playData.artName}}
              </div>
            </div>
            <!-- 歌曲时长 -->
            <div class="time" v-show="playData.duration">{{playData.switchTime}}/{{playData.time}}</div>
          </div>
        </div>
      <!-- 播放控件 -->
      <div class="middle">
        <div class="collection">
          <img src="../assets/images/未收藏.png" alt="">
        </div>
        <!-- 上一首 -->
        <div class="pre" @click="prePlay">
           <img src="../assets/images/上一首.png" alt="">
        </div>
        <!-- 播放暂停键 -->
        <div class="play" @click="isPlay">
           <img v-show="!is_play" src="../assets/images/播放.png" alt="">
           <img v-show="is_play" src="../assets/images/暂停.png" alt="">
        </div>
        <!-- 下一首 -->
        <div class="next" @click="nextPlay">
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
     <audio :src="playData.url" ref="audio" @play="is_play=true" @pause="is_play=false" @timeupdate="changeTime" preload:auto></audio>
    </div>
   
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import comments from './comments'
import music from '../http/api/music'
export default {
    data(){
        return{
            is_play:false, // 是否播放
            // 在播放音乐的属性
            playData:{},
            isShowList:false,
            timer:null, // 是否清除定时器
            long:"width:0%", // 进度条百分比
            showDetail:false, // 显示歌曲详情
            detailStyle:null, 
            armStyle:'transform: rotate(318deg);', // 唱针样式
            blackStyle:"transform: rotate(0deg);", // 唱片旋转
            simi:[], // 相关视频
            simiList:[], // 包含这首歌的歌单
            comments:[], //最新评论
            hotComments:[], // 精彩评论
            total:0, // 评论数
            lyric:null, // 原生歌词
            lrcArr:[], // 处理完成的原生歌词
        }
    },
    components:{
      comments
    },
    methods:{
        ...mapMutations(['clearPlayList','changeIsNowPlay','changeNowPlay','changePlayList','changeTopStyle']),
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
          // 清空歌曲详情并隐藏

          this.showDetail = false
          // this.playData = {},
          this.changeTopStyle(this.showDetail)
          // 清空进度条
          this.long = "width:0%"
          // 暂停音乐
          this.is_play = false
          this.$refs.audio.pause() // 暂停
          setTimeout(()=>{
            // 清空vuex中的播放列表
          this.clearPlayList()
          },1000)
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
        },
        // 双击播放列表
        playNow(a){
          this.changeNowPlay(a)
        },
        // 播放时长随时间增加
        timeRun(){
            clearInterval(this.timer)
            this.timer = setInterval(()=>{
              if(!this.is_play || this.$refs.audio.currentTime >=this.$refs.audio.duration){
                // 当按下暂停或者播放时间大于歌曲时长时，清除定时器
                clearInterval(this.timer)
              }else if(this.is_play && this.$refs.audio.currentTime < this.$refs.audio.duration){
                // 当按下播放键并且此时播放时间小于歌曲时长
                this.long = "width:"+(this.$refs.audio.currentTime/this.$refs.audio.duration)*100 + '%'
                this.playData.runTime = parseInt(this.$refs.audio.currentTime*1000)
              }
            },1)
        },
        // 时间戳转换
        getTime(id,a){
            if(a == 1){
                const time = new Date(id)
                let y = time.getFullYear()+ '-';
                let m = (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1) + '-';
                let d = (time.getDate() < 10 ? '0' + time.getDate() : time.getDate()) + ' ';
                return y+m+d
            }else if( a == 2){
                const date = new Date(id)
                let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
                let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
                return m+s
            }
        },
        // 上一首
        prePlay(){
          // 获取正在播放歌曲的index
          let a = this.playList.findIndex((item)=>{
            return item.id === this.nowplay.id
          })
          if(a === 0){
            // 如果当前播放是第一首的话，点击上一首跳至最后一首
            this.changeNowPlay(this.playList[this.playList.length-1])
          }else{
            // 否则播放上一首歌曲
            this.changeNowPlay(this.playList[a-1])
          }
        },
        // 下一首
        nextPlay(){
          // 获取正在播放歌曲的index
          let a = this.playList.findIndex((item)=>{
            return item.id === this.nowplay.id
          })
          if(a === this.playList.length -1){
            // 如果播放的是最后一首的话，点击下一首切换至第一首
            this.changeNowPlay(this.playList[0])
          }else{
            // 否则播放下一首
            this.changeNowPlay(this.playList[a+1])
          }
          if(this.nowplay === {}){
            this.$refs.audio.pause() // 暂停
            this.playData = {}
          }
        },
        // 是否显示歌词页面
        showSongDetail(){
          this.showDetail = !this.showDetail
          this.changeTopStyle(this.showDetail)
          
        },
        // 获取相关音乐
        async getSimi(id){
          const res = await music.simi(id)
          this.simi = res.songs
        },
        async getSimiList(id){
          const res = await music.simiList(id)
          if(res.playlists){
            this.simiList = res.playlists
            this.simiList.forEach(item=>{
              if(item.playCount>9999){
                item.playCount = parseInt(item.playCount/10000) +"万"
              }
            })
          }
        },
        // 获取评论
        async getComments(id){
          const res = await music.comment(id)
          // 最新评论
          this.comments = res.comments
          // 精彩评论
          this.hotComments = res.hotComments
          // 评论数
          this.total = res.total
        },
        // 获取歌词
        async getLyric(id){
          this.lrcArr = []
          const res = await music.lyric(id)
          // 切割歌词
          this.lyric = res.lrc.lyric.split('\n')
          // 进一步切割
          this.lyric.forEach(item => {
            const arr = []
            arr.push(item.split("]"))
            const obj = {}
            const time = arr[0][0].substr(1)
            if(time){
              const min = parseInt(time.slice(0,2))
              const sec = parseInt(time.slice(3,5))
              const ms = parseInt(time.slice(6))
              obj.dur = min*60*1000 + sec*1000 + ms
              obj.content = arr[0][1]
              obj.active = false
              this.lrcArr.push(obj)
            } 
          });
          // 获取上一句歌词的时间
          this.lrcArr.forEach((item,i)=>{
            if(i == 0){
              item.pre = 0
            }else if(i== this.lrcArr.length-1){
              item.next = 0
            }else{
              item.pre = this.lrcArr[i - 1].dur
              item.next = this.lrcArr[i + 1].dur
            }
          })
        },
        // 监听播放进度
        changeTime(){
          // 给当前歌词添加样式
          this.lrcArr.forEach((item) => {
             if(this.playData.runTime+50 >= item.dur && this.playData.runTime+50 <=item.next){
              item.active = "active"
              
             }else{
              item.active = ""
             }
          });
          
        },
        async playThis(item){
           const res = await music.getMusicUrl(item.id)
           const newMusic = {
                id:item.id, // 歌曲id
                name:item.name, // 歌名
                artName:item.artists[0].name, // 作者
                duration:item.duration, // 时长
                time:this.getTime(item.duration,2),
                img:item.album.blurPicUrl, // 图片
                url:res.data[0].url, // 歌曲url
                alias:item.album.alias[0]?item.album.alias[0]:null, // 简介
                mvid:item.mvid === 0 ? null : item.mvid, // mvid
                sq: item.sqMusic ? true :false,// sq
                isNowPlay:true, // 是否立即播放
                runTime:0, // 播放进度
                switchTime:"00:00", // 转换后的时间
                for:item.name, // 来源页
            }
            
           // 添加到歌单列表中
          this.changePlayList(newMusic)
            // 将当前歌曲添加到正在播放
          this.changeNowPlay(newMusic)
          // 重新获取相关歌曲
          this.getSimi(item.id)
          // 重新获取评论
          this.getComments(item.id)
          // 重新获取歌词
          this.getLyric(item.id)
          // 重新获取包含歌单
          this.getSimiList(item.id)
        },
        toDetails(id){
          
          if(this.$route.query.id == id){
            this.showDetail = false
            this.changeTopStyle(this.showDetail)
          }else{
            this.$router.push({ path: '/details', query: { id: id } })
            this.showDetail = false
            this.changeTopStyle(this.showDetail)
          }
          
          
        }
    },
    created(){
          // 获取正在播放到歌曲信息
          this.playData = this.nowplay
    },
    computed:{
      ...mapState(['playList','nowplay']),
    },
    watch:{
      nowplay(){
        if(this.nowplay){
          this.is_play = false
          this.playData = this.nowplay
          // 重置播放时间
          this.playData.switchTime = "00:00"
          if(this.nowplay.id){
             // 是否当前播放标签
            this.changeIsNowPlay()
            setTimeout(()=>{
              console.log('开始播放音乐');
              this.is_play = true
            },1)
          }
         
        }else{
          // 正在播放被清除时，暂停播放器，清空播放数据
          this.playData = {}
          this.$refs.audio.pause() // 暂停
        }
      },
      playList(){
        this.changeIsNowPlay()
      },
      // 通过控制is_play属性来决定播放和暂停
      is_play(){
        if(this.is_play){
            this.$refs.audio.play() // 播放
            this.armStyle = "transform: rotate(351deg);"
            
        }else{
            this.$refs.audio.pause() // 暂停
            this.armStyle = "transform: rotate(318deg);"
        }
        this.timeRun()
      },
      // 播放完切换下一首以及歌词滚动
      'playData.runTime':{
        handler(){
          // 播放完毕切换下一首
          if(this.playData.switchTime === this.playData.time){
            this.nextPlay()
          }
          this.playData.switchTime = this.getTime(this.playData.runTime,2)
          
         
        },
        deep: true
      },
      'playData.id':{
        handler(){
          if(this.playData.id){
            const id = this.playData.id
            this.getSimi(id)
            this.getComments(id)
            this.getLyric(id)
            this.getSimiList(id)
        }
        },
        deep: true
      },
      // 控制歌曲详情显示隐藏
      showDetail(){
        if(this.showDetail){
            this.detailStyle = "top:-600px"
          }else{
            this.detailStyle = "top:70px"
          }
      },
      // 控制唱片旋转
      long(){
        this.blackStyle = "transform: rotate("+(this.$refs.audio.currentTime/this.$refs.audio.duration)*1500+"deg);"
        // console.log(this.$refs.audio.currentTime);
      },
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
    z-index: 999;
    // 当前播放
    .list{
      height: 550px;
      width: 40%;
      overflow: hidden;
      overflow-y: scroll;
      z-index: 9999;
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
              width: 60%;
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
              width:40%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              .singer{
                width: 75px;
                color: #767676;
                div{
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
              }
              .songtimes{
                
                color: #a6a6a6;
              }
        }
          }
          li:nth-child(2n){
            background-color: rgb(250, 250, 250);
          }
          li:hover{
            
            background-color: rgb(245, 245, 245);
            .PBRight{
              .singer{
                color:#000;
              }
              .songtimes{
                color:#000;
              }
            }
          }
        }
      }
    }
    // 歌曲详情
    .songDetail{
      width: 100%;
      height: 600px;
      overflow-y: scroll;
      background: rgb(243, 243, 243);
      position:absolute;
      top: 70px;
      left: 0;
      transition: top 0.5s ease;
      .SDTop{
        height: 50px;
        width: 100%;
        background: rgb(243, 243, 243);
      }
      .SDMiddle{
        display: flex;
        .SDMLeft{
          width: 50%;
          position: relative;
          .arm{
            position: absolute;
            left: 236px;
            z-index: 9999;
            transform-origin: 14px 14px;
            transition: transform 0.5s linear;
            img{
              width: 100px;
            }
          }
          .black{
            padding-top: 130px;
            display: flex;
            justify-content: center;
            align-items: center;
            
            .blackBox{
              width: 330px;
              position: relative;
              display: flex;
              justify-content: center;
              align-items: center;
              img:first-child{
                width: 330px;
                position: absolute;
                z-index: 10;
              }
              img:nth-child(2){
                width: 220px;
                transform-origin: 110px 110px;
                transition: transform 1s linear;
              }
            }
          
          }
          // 我喜欢 收藏 下载 分享
          .fourBtn{
            padding: 0 50px;
            margin-top: 80px;
            display: flex;
            justify-content: space-evenly;
            margin-bottom: 50px;
            .iLove,.addList,.download,.share{
              img{
                width: 20px;
              }
              width: 40px;
              height: 40px;
              background-color: rgb(230, 230, 230);
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 50%;
            }
          }
        }
        .SDMRight{
          width: 50%;
          .SDname{
            margin-top: 30px;
            font-size: 23px;
            display: flex;
            align-items: center;
            .SDMRmv{
              color:rgb(205, 67, 67);
              font-size: 13px;
              border: 1px solid rgb(205, 67, 67);
              padding: 1px 4px;
              border-radius: 4px;
              margin:0 10px
            }
          }
          .alias{
            font-size: 14px;
            padding-top: 15px;
          }
          .SDother{
            font-size: 12px;
            display:flex;
            justify-content: space-between;
            margin-right: 120px;
            margin-top: 15px;
            margin-bottom: 15px;
            .cd,.songer,.for{
              display: flex;
              color: #767676;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              max-width: 150px;
              div{
                color: rgb(71, 124, 188);
                white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              }
            }
          }
          .lyrics{
            margin-right: 120px;
            height: 340px;
            overflow-y: scroll;
            div{
              font-size: 14px;
              margin: 10px 0;
              color: #626262;
            }
            .active{
              font-size: 16px;
              color: #000;
              
            }
          }
          .lyrics2{
            margin-right: 120px;
            height: 340px;
            text-align:center;
            font-size: 14px;
            line-height: 340px;
          }
        }
      }
      .SDComments{
        margin: 0 50px;
        display: flex;
        .SDCleft{
          box-sizing: border-box;
          width: 75%;
          padding-right: 30px;
          .sendComments{
            display: flex;
            align-items: center;
            .SDnums{
              font-size: 12px;
              color: #767676;
            }
          }
          .sendWindow{
            margin-top: 10px;
            margin-bottom: 50px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #cdcdcd;
            font-size: 13px;
            background-color: #fff;
            padding: 5px 10px;
            border-radius: 5px;
            border: 1px solid rgb(194, 194, 194);
            .swleft{
              display: flex;
              align-items: center;
              img{
                width: 20px;
                padding-right: 5px;
              }
            }
            .swright{
              display: flex;
              align-items: center;
              img{
                width: 18px;
                padding-left: 8px;
              }
            }
          }
          .title{
            font-size: 15px;
            margin: 20px 0;
          }
        }
        .SDCright{
          width: 25%;
          .SDCtitle{
            padding-left: 5px;
            padding-bottom: 10px;
          }
          .simi:hover{
              background-color: rgb(217, 217, 217);
              border-radius:5px;
            }
          .simi{
            display: flex;
            overflow: hidden;
            .simileft{
              padding: 5px;
              width: 50px;
              height: 50px;
              img{
                width: 50px;
                height: 50px;
                border-radius: 5px;
              }
            }
            .simiright{
              padding: 5px;
              .smrT{
                width:150px;
                font-size: 14px;
                display:flex;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                .siminame{
                  max-width: 150px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  flex-shrink: 0;
                }
                .smalias{
                  color: #8a8a8a;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  
                }
              }
              .smrB{
                font-size: 12px;
                color: #717171;
                display: flex;
              }
            }
          }
        }
      }
      
    }
    // 进度条
    .top{
      width: 100%;
      height: 2px;
      background-color: #eaeaea;
      position: absolute;
      top: -2px;
      .light{
        height:2px;
        background-color: rgb(206, 8, 8);
      }
      
    }
    // 播放器控件
    .bottom{
      z-index: 9999 !important;
      display: flex;
      justify-content: space-between;
      height: 60px;
      background-color: #fff;
      position: absolute;
      width: 100%;
      .left{
        width: 320px;
        display: flex;
      .imgBox{
        position: relative;
          img{
            width: 40px;
            height: 40px;
            border-radius: 5px;
            margin: 10px;
            
          }
          .blur{
            width: 40px;
            height: 40px;
            border-radius: 5px;
            margin: 10px;
            position: absolute;
            top:0;
            left:0;
            
          }
          .blur:hover{
            background-color: rgba(0, 0, 0,.3);
          }
      }
        .msg{
          margin: 10px 0;
          font-size: 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .name{
            display: flex;
            // width: 280px;
            align-items: center;
            .songName{
              max-width: 200px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .art{
              max-width: 130px;
              font-size: 12px;
              color: #8a8a8a;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          
          }
          .time{
            font-size: 12px;
            color: #bababa;
          }
        }
    }
      .middle{
        width: 450px;
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