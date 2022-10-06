<template>
  <div class="videoDetail">
    <div class="left">
      <div class="back">
        <img src="../../../assets/images/video/返回.png" alt="" @click="back">
        视频详情
      </div>
      <div class="video">
        <video :src="url" controls></video>
      </div>
      <div class="data">
        <div class="user">
          <img :src="detail.avatarUrl" alt="">
          {{detail.creatorName}}
        </div>
        <div class="strBtn">关注</div>
      </div>
      <div class="title">{{detail.title}}</div>
      <div class="timeAndNums">
        <div class="time">发布：{{detail.time}}</div>
        <div class="nums">播放：{{detail.playTime}}次</div>
      </div>
      <div class="tabs">
        <div class="tab" v-for="item in detail.videoGroup" :key="item.index">
          {{item.name}}
        </div>
      </div>
      <div class="controlBtn">
        <div class="cBLeft">
          <div class="good">
            <img src="../../../assets/images/video/点赞2.png" alt="">
            赞({{detail.praisedCount}})
          </div>
          <div class="str">
            收藏({{detail.subscribeCount}})
          </div>
          <div class="share">
            分享({{detail.shareCount}})
          </div>
        </div>
        <div class="cBRight">举报</div>
      </div>
      <div class="commentName" v-if="hotComments.length !== 0">精彩评论</div>
      <comments :comments='hotComments'/>
      <div class="commentName" v-if="comments.length !== 0">最新评论</div>
      <comments :comments='comments' />
    </div>
    <div class="right">
      <div class="otherVideo">相关推荐</div>
      <div class="videoList">
        <div class="rVideo" v-for="item in relatedVideo" :key="item.key" @click="toRelVideo(item.vid)">
          <div class="rVImg">
            <img :src="item.coverUrl" alt="">
          </div>
          <div class="rVData">
            <div class="rVName">{{item.title}}</div>
            <div class="rVCreator">by {{item.art}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import video from '../../../http/api/video.js'
import comments from '../../../components/comments.vue'
export default {
    name:'videoDetail',
    data(){
      return{
        detail:{},
        url:null,
        comments:[],
        hotComments:[],
        relatedVideo:[]
      }
    },
    methods:{
      // 获取视频详情
      async getDetail(id){
        const res = await video.getVideoDetail(id)
        console.log(res);
        this.detail = res.data
      },
      // 获取视频路径
      async getUrl(id){
        const res = await video.getVideoUrl(id)
        if(res.urls[0].url){
           this.url = res.urls[0].url
        }
      },
      // 获取评论
      async getComments(id){
        const res = await video.getVideoComments(id)
        this.comments = res.comments
        this.hotComments = res.hotComments
      },
      // 获取相关视频
      async getRelated(id){
        const res = await video.getRelated(id)
        this.relatedVideo = res.data
        if(this.relatedVideo){
           this.relatedVideo.forEach(item => {
            item.art = item.creator[0].userName
        });
        }
       
      },
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
      // 前往相关视频
      toRelVideo(id){
        this.$router.push({ path: '/videoDetail', query: { id: id} })
      },
      back(){
        this.$router.push({path:'/video'})
      }
    },
    components:{
      comments
    },
    created(){
      this.getDetail(this.$route.query.id)
      this.getUrl(this.$route.query.id)
      this.getComments(this.$route.query.id)
      this.getRelated(this.$route.query.id)
    },
    watch:{
      detail(){
        this.detail.creatorName = this.detail.creator.nickname
        this.detail.time = this.getTime(this.detail.publishTime,1)
      },
      $route(){
        if(this.$route.query.id){
          this.getDetail(this.$route.query.id)
          this.getUrl(this.$route.query.id)
          this.getComments(this.$route.query.id)
          this.getRelated(this.$route.query.id)
        }
        
      }
    }
}
</script>

<style lang='less' scoped>
.videoDetail{
  padding: 20px;
  height: 610px;
  box-sizing: border-box;
  overflow-y:scroll;
  display: flex;
  .left{
    width: 65%;
    .back{
      display:flex;
      align-items:center;
      font-size: 15px;
      padding-bottom: 10px;
      img{
        width:15px;
        height:15px;
        margin-right: 10px;
      }
    }
    .video{     
      video{
        width: 100%;
        height: 350px;
        border-radius: 7px;
      }
    }
    .data{
      display: flex;
      align-items: center;
      padding: 20px 0;
      justify-content: space-between;
      .user{
        display:flex;
        align-items:center;
        font-size: 14px;
        img{
          width: 40px;
          height: 40px;;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
      .strBtn{
        font-size: 12px;
        color: #d81e06;
        padding: 5px 23px;
        background-color: rgb(255, 232, 232);
        border-radius: 15px;
      }
    }
    .title{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .timeAndNums{
      display:flex;
      font-size:12px;
      color: rgb(199, 198, 198);
      padding: 10px 0;
      .time{
        margin-right: 30px;
      }
    }
    .tabs{
      display: flex;
      font-size: 12px;
      flex-wrap: wrap;
      .tab{
        padding: 3px 8px;
        background-color: rgba(244, 244, 244, 0.849);
        border-radius: 15px;
        margin-right: 5px;
        margin-bottom: 5px;
      }
    }
    .controlBtn{
      display:flex;
      font-size:13px;
      align-items: center;
      justify-content: space-between;
      padding:40px 0;
      .cBLeft{
        display:flex;
        align-items: center;
        div{
          border: 1px solid rgb(197, 197, 197);
          padding: 3px 15px;
          margin-right: 10px;
          border-radius: 20px;
          display:flex;
          align-items: center;
          img{
            width:15px;
            height:15px;
            margin-right: 3px;
        }
        
        }
        div:hover{
          background-color: rgb(237, 237, 237);
        }
      }
      .cBRight{
        font-size: 12px;
        color:  rgb(197, 197, 197);
        text-decoration: underline;
      }
      .cBRight:hover{
        color:  rgb(160, 160, 160);
      }
    }
    .commentName{
      font-size:14px;
      padding-bottom:20px;
    }
  }
  .right{
    width: 35%;
    padding-left:20px;
    .otherVideo{
      padding-bottom:10px;
    }
    .videoList{
      width: 100%;
      .rVideo{
        display:flex;
        padding-bottom:10px;
        .rVImg{
          padding-right: 10px;;
          img{
            width:150px;
            height:84px;
            border-radius: 4px;
          }
        }
        .rVData{
          font-size:12px;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          .rVName{
            overflow: hidden;
            text-overflow: ellipsis;
            display:-webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .rVCreator{
            color:#bfbfbf;
          }
        }
      }
    }
  }
}
</style>