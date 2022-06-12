<template>
   <div class="player">
      <div class="top"></div>
      <div class="bottom">
         <div class="left">
        <img :src=playData.img alt="">
        <div class="msg">
          <div class="name">{{playData.name}} - {{playData.artname}}</div>
          <div class="time">00:00/4:27</div>
        </div>
      </div>
      <div class="middle">
        <div class="collection">
          <img src="../assets/images/未收藏.png" alt="">
        </div>
        <div class="pre">
           <img src="../assets/images/上一首.png" alt="">
        </div>
        <div class="play" @click="isPlay">
           <img v-show="!is_play" src="../assets/images/播放.png" alt="">
           <img v-show="is_play" src="../assets/images/暂停.png" alt="">
        </div>
        <div class="next">
           <img src="../assets/images/下一首.png" alt="">
        </div>
      </div>
      <div class="right">
        <div class="circle">
          <img src="../assets/images/循环.png" alt="">
        </div>
        <div class="menu">
           <img src="../assets/images/歌单.png" alt="">
        </div>
        <div class="vice">
          <img src="../assets/images/音量.png" alt="">
        </div>
      </div>
    </div>
     <audio :src="url" ref="audio" @play="is_play=true" @pause="is_play=false" preload:auto></audio>
    </div>
    
</template>

<script>
import api from '../api/index.js'
import {mapState} from 'vuex'
export default {
    data(){
        return{
            is_play:false, // 是否播放
            playData:{
              name:'',
              artname:'',
              time:'',
              img:''
            },
            url:''
        }
    },
    methods:{
        // 是否播放
        isPlay(){
            this.is_play = !this.is_play
            if(this.is_play ==true){
                setTimeout(()=>{
                  this.$refs.audio.play() // 播放
                  console.log('开始播放');
                },500)
                
               
            }else{
                this.$refs.audio.pause() // 暂停
                console.log('暂停');
            }
        },
        // 获取音乐url
        async getUrl(id){
            this.url = null
            const res = await api.getMusicUrl(id)
            // console.log(res.data.data);
            this.url = res.data.data[0].url
        },
        // 从vuex获取数据
        getData(){
              if(this.playList.length != 0){
                const id = this.playList[this.playList.length-1].id
                this.playData.name = this.playList[this.playList.length-1].name
                this.playData.artname = this.playList[this.playList.length-1].artName
                this.playData.time = this.playList[this.playList.length-1].duration
                this.playData.img = this.playList[this.playList.length-1].img
                this.getUrl(id)
              }else{
                console.log('当前没有歌曲缓存');
                return 
              }
              
        }
    },
    created(){
              // 默认优先加载缓存中的最后一首歌 
              this.getData()
    },
    mounted(){
      console.log(this.playList);
    },
    computed:{
      ...mapState(['playList'])
    },
    watch:{
      playList(){
        console.log('歌单更新',this.playList[this.playList.length-1].name);
        // 暂停播放，切歌后再播放
        this.$refs.audio.pause() // 暂停
        this.getData()
        this.$refs.audio.play() // 播放
      }
    }
}
</script>

<style scoped lang="less">
 .player{
    width: 100%;
    height: 70px;
    position: fixed;
    bottom: 0;
    background: #fff;
    .top{
      width: 100%;
      height: 2px;
      background: red;
    }
    .bottom{
      display: flex;
      justify-content: space-between;
      .left{
      display: flex;
      img{
        width: 50px;
        height: 50px;
        border-radius: 5px;
        margin: 10px;
      }
      .msg{
        margin: 10px 0;
        font-size: 14px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .time{
          color: var(--color-input-placeholder);
        }
      }
    }
      .middle{
        display: flex;
        align-items: center;
        margin-left: -150px;
        img{
          width: 35px;
          
        }
        .collection{
          margin-right: 50px;
        }
        .play{
          margin: 0 20px;
          img{
            width: 50px;
          }
        }
      }
      .right{
        display: flex;
        align-items: center;
         img{
          width: 25px;
          margin-right: 20px;
        }
      }
    }
  }
</style>