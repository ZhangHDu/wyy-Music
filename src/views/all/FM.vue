<template>
  <div class="FM">
      <div class="song">
        <div class="songLeft">
          <!-- 歌曲图片 -->
          <div class="pic">
            <div class="box" >
              <div class="cur">
                <img :src="img" alt="" v-if="nowPlay">
                <div class='img' v-else></div>
              </div>
              <div class="pre" v-if="preUrl">
                <img :src="preUrl" alt="">
              </div>
              
            </div>
          </div>
          <!-- 操作图标 -->
          <div class="icon">
            <div class="str">
              <img src="../../assets/images/FM/爱心.png" alt="">
            </div>
            <div class="del" @click="delThis">
              <img src="../../assets/images/FM/delete.png" alt="">
            </div>
            <div class="next" @click="nextFM">
              <img src="../../assets/images/FM/next.png" alt="">
            </div>
            <div class="more">
              <img src="../../assets/images/FM/更多.png" alt="">
            </div>
          </div>
        </div>
        <div class="songRight">
          <!-- 歌名 -->
          <div class="top">
            <div class="name">
              <!-- 歌名 -->
              <div class="songName">{{name}}</div>
              <!-- 音质 -->
              <div class="icon">标准音质</div>
            </div>
            <div class="other">
              <!-- 专辑 -->
              <div class="cd">
                专辑：<p>{{cd}}</p>
              </div>
              <!-- 歌手 -->
              <div class="art">
                歌手：<p>{{art}}</p>
              </div>
            </div>
          </div>
          <!-- 歌词 -->
          <div class="lyrics" v-if="lrcArr.length !=0" ref='lyric'>
              <div v-for="item in lrcArr" :key="item.index" :ref="item.active" :class="item.active" >{{item.content}}</div>
          </div>
          <div class="lyrics2" v-else>
              还没有歌词哦～
            </div>
        </div>
      </div>
      <!-- 评论 -->
        
      <div class="fmComments">
        <div class="sendComments">
              <div class="SDtitle">听友评论&nbsp;</div>
              <div class="SDnums">（已有{{total}}条评论）</div>
            </div>
            <div class="sendWindow">
              <div class="swleft">
                <img src="../../assets/images/write.png" alt="">
                发表评论
              </div>
              <div class="swright">
                <img src="../../assets/images/笑脸.png" alt="">
                <img src="../../assets/images/at.png" alt="">
              </div>
            </div>
        <div class="title">精彩评论</div>
        <comments :comments='hotComments'/>
        <div class="title">最新评论</div>
        <comments :comments='comments' />
      </div>
     
  </div>
</template>

<script>
import fm from '../../http/api/FM.js'
import music from '../../http/api/music.js'
import comments from '../../components/comments.vue'
import {mapState,mapMutations} from 'vuex'
export default {
  name:'FM',
  data(){
    return{
      songMsg:[],// fm所有歌曲
      nowPlay:{}, // 当前播放
      id:null,
      img:null,
      name:null,
      cd:null,
      art:null,
      url:null,
      preUrl:null,
      duration:0,
      isNext:false,
      lyric:null, // 原生歌词
      lrcArr:[], // 处理完成的原生歌词
      hotComments:[], // 精彩评论
      comments:[], // 评论
      total:0, // 评论数量
      top:null,// 歌词滚动参数，
    }
  },
  components:{
    comments
  },
  methods:{
    ...mapMutations(['changeNowPlay','changeType']),
    // 获取fm
    async getFM(){
      const res = await fm.getFM()
      this.songMsg = res.data
      this.play()
      
    },
    play(){
      this.nowPlay = this.songMsg[0]
      this.id = this.nowPlay.id
      this.img = this.nowPlay.album.picUrl
      this.name = this.nowPlay.name
      this.cd = this.nowPlay.album.name
      this.duration = this.nowPlay.duration
      if(this.nowPlay.artists.length>1){
        this.art = this.nowPlay.artists.reduce((pre,cur)=>{
        return pre.name +' '+ cur.name
        })
      }else{
        this.art = this.nowPlay.artists[0].name
      }
      this.getUrl(this.id)
    },
    // 获取音乐url
    async getUrl(id){
      const res = await music.getMusicUrl(id)
      console.log(res);
      this.url = res.data[0].url
      const obj = {
        artName:this.name,
        duration:this.duration,
        url:this.url,
        img:this.img,
        isNowPlay:true,
        switchTime:'00:00',
        runTime:0,
        time:this.getTime(this.duration,2),
        id:this.id,
      }
      // 改变当前播放
      this.changeNowPlay(obj)
      // 获取歌词
      this.getLyric(this.id)
      // 获取评论
      this.getComment(this.id)
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
    // 获取评论
    async getComment(id){
      const res = await music.comment(id)
      console.log(res);
      this.total=res.total
      this.comments = res.comments
      this.hotComments = res.hotComments
    },
    // 转换时间戳
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
    // 下一首
    async nextFM(){
      const a = this.songMsg.indexOf(this.nowPlay)
      if(a === this.songMsg.length-1){
        console.log('重新请求');
        this.getFM()
      }else{
        this.preUrl = this.nowPlay.album.picUrl
        this.nowPlay = this.songMsg[a+1]
        this.id = this.nowPlay.id
        this.img = this.nowPlay.album.picUrl
        this.name = this.nowPlay.name
        this.cd = this.nowPlay.album.name
        this.duration = this.nowPlay.duration
        if(this.nowPlay.artists.length>1){
          this.art = this.nowPlay.artists.reduce((pre,cur)=>{
          return pre.name +' '+ cur.name
          })
        }else{
          this.art = this.nowPlay.artists[0].name
        }
        this.getUrl(this.id)
      }
      
    },
    delThis(){
      console.log('删除当前，播放下一首');
    }
  },
  created(){
    this.changeType(1)
    // 获取fm歌曲
    this.getFM()
    
  },
  watch:{
    next(){
      this.nextFM()
    },
    $route(){
        if(this.$route.path === '/FM'&&this.type === 0){
            this.preUrl = null
            this.changeType(1)
            this.getFM()
        }
      },
     'nowplay.runTime':{
        handler(){
         this.lrcArr.forEach((item) => {
             if(this.nowplay.runTime >= item.dur && this.nowplay.runTime <=item.next){
              item.active = "active"
              
             }else{
              item.active = ""
             }
             
          });
          try {
             if(this.$refs.active && this.$refs.active[0].offsetTop){
                this.top = this.$refs.active[0].offsetTop
          }
          } catch (error) {
            return
          }
        },
        deep: true
      },
      top(){
        // 歌词滚动
        this.$refs.lyric.scrollTop = this.top - 280
        
      },
  },
  computed:{
    ...mapState(['nowplay','next','type'])
  },
}
</script>

<style lang='less' scoped>
.FM{
  width: 804px;
  height: 600px;
  overflow: scroll;
  .song{
    display: flex;
    .songLeft{
      width: 40%;
      padding: 40px;
      margin-top: 55px;
      .pic{
        display: flex;
        justify-content: center;
        .box{
          // 这里留内边距给后面图片空间
            padding-left: 40px;
            position: relative;
            height:260px;
            width:300px;
          .cur{
              width: 260px;
              height: 260px;
              position:absolute;
              z-index: 15;
              img{
                width: 260px;
                height: 260px;
                border-radius: 5px;
                border: 1px solid #d2d2d2;
              }
              .img{
                width: 260px;
                height: 260px;
                border-radius: 15px;
                color:#8a8a8a;
              }
              .playBtn{
                width:60px;
                height: 60px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                img{
                  width:100%;
                  height: 100%;
                  border: none;
                }
              }
          }
          
          .pre{
            width: 220px;
            height: 220px;
            z-index: 10;
            img{
              width: 100%;
              height: 100%;
              border-radius: 5px;
              border: 1px solid #d2d2d2;
            }
            position: absolute;
            left:0px;
            top: 20px;
          }
        }
      }
      .icon{
        padding-top: 50px;
        display: flex;
        justify-content: space-around;
        div{
          background-color: #f2f2f2;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          img{
            width: 20px;
            height: 20px;
          }
        }
      }
    }
    .songRight{
      padding-top: 40px;
      .top{
        .name{
          display: flex;
          align-items: center;
          .songName{
            font-size: 20px;
            max-width: 200px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .icon{
            margin-left: 15px;
            font-size: 12px;
            font-weight: 400;
            color: #d81e06;
            border: 1px solid #d81e06;
            border-radius: 3px;
            padding: 2px 3px;
          }
        }
        .other{
          display: flex;
          font-size: 12px;
          color: #999999;
          padding: 10px 0;
          .cd{
            margin-right: 10px;
          }
          .art,.cd{
            display: flex;
            p{
              max-width: 100px;
              color:rgb(57, 123, 163);
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
      .lyrics{
            margin-right: 120px;
            height: 340px;
            overflow-y: scroll;
            // 滚动过渡效果
            scroll-behavior: smooth;
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
  .fmComments{
    overflow: hidden;
    box-sizing: border-box;
    padding:0 30px;
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
            margin-bottom: 30px;
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
      font-size: 13px;
      padding: 20px 0;
    }
  }
}
</style>