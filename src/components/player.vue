<template>
   <div class="player">
      <div class="top"></div>
      <div class="bottom">
         <div class="left">
        <img src="../assets/images/1.jpeg" alt="">
        <div class="msg">
          <div class="name">情非得已</div>
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
     <audio :src="url" ref="audio" @play="is_play=true" @pause="is_play=false"></audio>
    </div>
    
</template>

<script>
export default {
    data(){
        return{
            is_play:false,
            url:''
        }
    },
    methods:{
        isPlay(){
            this.is_play = !this.is_play
            if(this.is_play ==true){
                this.$refs.audio.play()
            }else{
                this.$refs.audio.pause()
            }
    }
    },
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