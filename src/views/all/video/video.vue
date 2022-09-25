<template>
  <div class="video" ref="video">
    <!-- 头部标签 -->
      <div class="head">
        <div class="category" @click="showAll">{{thisTab}}<img src="../../../assets/images/video/展开.png" alt=""></div>
        <div class="list">
          <div class='tab' v-for="item in list" :key="item.id" @click="getcateId(item.id,item.name)">
            <div class="noactive" v-show="!item.selectTab">{{item.name}}</div>
            <div class="active" v-show="item.selectTab">{{item.name}}</div>
          </div>
        </div>
      </div>
      <!-- 视频 -->
      <div class="videos" v-if="!inMv">
        <div class="item" v-for="item in videos" :key="item.index" @click="toVideoDetail(item.vid)">
            <div class="img">
              <img :src="item.coverUrl" alt="">
              <div class="nums">
                <img src="../../../assets/images/播放4.png" alt="">
                {{item.nums}}
              </div>
              <div class="time">{{item.time}}</div>
            </div>
            <div class="msg">
              <div class="title">
                {{item.title}}
              </div>
              <div class="by" @click.stop="toCreater">by {{item.creator.nickname}}</div>
            </div>
        </div>
      </div>
      <!-- mv -->
      <div class="mvs" v-else>
        <div class="item" v-for="item in mvs" :key="item.index">
          <div class="img">
            <img :src="item.coverUrl" alt="">
              <div class="nums">
                <img src="../../../assets/images/播放4.png" alt="">
                {{item.nums}}
              </div>
              <div class="time">{{item.time}}</div>
          </div>
          <div class="msg">
              <div class="title">
                <div class="icon">MV</div>
                {{item.name}}
              </div>
              <div class="by">{{item.artists[0].name}}</div>
          </div>
        </div>
      </div>
      <!-- 全部视频展开 -->
      <div class="allList" v-show="show">
        <div class="top">
          <div class="topBtn">
            <div class="active" v-show="thisTab === '全部视频'" @click='showAll'>全部视频</div>
            <div class="noactive" v-show="thisTab !== '全部视频'" @click="getAll">全部视频</div>
          </div>
        </div>
        <div class="bottom">
          <div class='allTabs' v-for="item in allList" :key="item.id" @click="getcateId(item.id,item.name)">
            <div class="noactive" v-show="!item.selectTab">{{item.name}}</div>
            <div class="active" v-show="item.selectTab">{{item.name}}</div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import video from '../../../http/api/video.js'
export default {
  data(){
    return{
      list:[], // 分类列表
      allList:[], // 全部分类标签
      show:false, // 是否显示所有标签
      videos:[], // 视频
      mvs:[], // mv
      thisTab:'全部视频',
      inMv:false, // 是否显示mv
      type:0, // 默认全部视频
      page:0, // 默认第一页数据
      pre:0 // 上次请求数据的时间
    }
  },
  methods:{
    // 获取标签列表
    async getVideoCategory(){
      const res = await video.getVideoCategory()
      this.list = res.data
    },
    // 获取所有标签
    async getVideoGroup(){
      const res = await video.getVideoGroup()
      this.allList = res.data
    },
    // 获取全部视频
    async getAllVideo(id){
       const res = await video.getAllList(id)
       if(res.datas.length ===0){
        // 如果当前没有推荐视频，则显示第一个标签的视频
        this.type = this.list[0].id
        this.thisTab = this.list[0].name
       }else{
        res.datas.forEach(item => {
        if(item.data.title){
          this.videos.push(item.data)
        }
       });
       }
       
    },
    // 获取全部视频
    getAll(){
      this.thisTab = '全部视频'
      this.type = 0
      this.show = false
    },
    // 根据标签获取视频
    async getCateVideo(i){
      const res = await video.getVideo(i)
       res.datas.forEach(item => {
        if(item.type === 1){
          this.videos.push(item.data)
          this.inMv = false
        }else if(item.type ===2){
          // mv
          this.mvs.push(item.data)
          this.inMv = true
        }
       });
    },
    // 是否显示所有标签
    showAll(){
      this.show = !this.show
    },
    // 点击标签事件
    async getcateId(id,name){
      this.type = id
      this.thisTab = name
      this.videos = []
      this.mvs = []
      this.show = false
    },
    // 滚动事件
    handleScroll(){
        let now = +new Date()
        if(now - this.pre > 200){
          this.pre = now
            // 获取滚动距离
          let scrollTop = this.$refs.video.scrollTop
          // 获取页面高度
          let clientHeight = this.$refs.video.clientHeight
          // 获取可滚动距离
          let scrollHeight = this.$refs.video.scrollHeight
          // 加载更多
          if(scrollHeight - clientHeight <=scrollTop + 240){
            this.page +=1
            // 判断标签获取相应的视频
            if(this.type === 0){
              // 获取全部视频
              this.getAllVideo(this.page)
            }else{
              // 根据分类获取视频
              this.getCateVideo(this.type)
            }
            
          }
      }
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
    // 点击用户跳转用户详情
    toCreater(){
      console.log('前往用户详情');
    },
    // 前往视频详情页
    toVideoDetail(id){
      this.$router.push({ path: '/videoDetail', query: { id: id } })
    }
  },
  created(){
    // 获取标签列表
    this.getVideoCategory()
    // 获取全部标签
    this.getVideoGroup()
    // 获取全部视频
    this.getAllVideo(this.page)
  },
  mounted(){
    let video = this.$refs.video
    video.addEventListener('scroll',this.handleScroll,true)
  },
  beforeDestroy(){
    let video = this.$refs.video
    video.removeEventListener('scroll',this.handleScroll,true)
  },
  watch:{
    type(){
      this.page = 0
      this.videos = []
      this.mvs = []
      // 监视type，获取相应标签视频
      if(this.type !== 0){
        this.getCateVideo(this.type)
      }else{
        this.getAllVideo(this.page)
      }
      
      // 选中标签样式追加
      this.list.forEach(item=>{
        if(item.id === this.type){
          item.selectTab = true
        }else{
           item.selectTab = false
        }
      })
      // 全部标签同步样式追加
      this.allList.forEach(item=>{
        if(item.id === this.type){
          item.selectTab = true
        }else{
          item.selectTab = false
        }
      })

    },
    videos(){
      // 处理播放数量和时间戳
      this.videos.forEach(item=>{
        item.time = this.getTime(item.durationms,2)
        if(item.playTime > 9999){
          item.nums =  Math.floor(item.playTime/10000) +'万'
        }else{
          item.nums = item.playTime
        } 
      })
      // 数量不够一页获取多一页的数据
      if(this.videos.length<9 && this.type !==0){
        this.getCateVideo(this.type)
      }else if(this.videos.length<9 && this.type ===0){
        this.page +=1
        this.getAllVideo(this.page)
      }
    },
    mvs(){
      // 处理播放数量和时间戳
      this.mvs.forEach(item => {
        item.time = this.getTime(item.duration,2)
        if(item.playCount > 9999){
          item.nums =  Math.floor(item.playCount/10000) +'万'
        }else{
          item.nums = item.playCount
        } 
      })
    }
  }
}
</script>

<style lang='less' scoped>
.video{
    height: 610px;
    overflow-y: scroll;
    width: 804px;
    padding: 20px;
    box-sizing: border-box;
    font-size: 12px;
    position: relative;
    .head{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .category{
        color: #373737;
        border: 1px solid #cbcbcb;
        padding: 5px 20px;
        border-radius: 15px;
        display: flex;
        align-items: center;
        img{
          width: 12px;
          padding-left: 5px;
        }
      }
      .category:hover{
        background:rgb(236, 236, 236)
      }
      .list{
        display:flex;
        .tab{
          border-right: 1px solid #ebebeb;
          padding: 0 10px;
          .noactive{
            color: #545454; 
          }
          .noactive:hover{
            color:#000;
          }
          .active{
            color:#d81e06;
          }
          .active:hover{
            color: #d81e06;
          }
        }
        .tab:last-child{
          border: none;
        }
      }
    }
    .videos{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      padding-top: 30px;
      .item{
        padding-bottom: 40px;
        .img{
          position: relative;
          img{
            width: 240px;
            height: 135px;
            border-radius: 5px;
          }
          .nums,.time{
            position: absolute;
            right:20px;
            color: #fff;
          }
          .nums{
            top: 5px;
            display:flex;
            align-items: center;
            img{
              width:15px;
              height:15px;
              padding-right: 3px;
            }
          }
          .time{
            bottom: 5px;
          }
        }
        .msg{
          width: 240px;
          .title{
            padding: 5px 0;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
          .by{
            color: #d1d1d1;
          }
          .by:hover{
            color: rgb(186, 186, 186);
          }
        }
      }
    }
    .mvs{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      padding-top: 30px;
      .item{
        padding-bottom: 40px;
        .img{
          position: relative;
          img{
            width: 240px;
            height: 135px;
            border-radius: 5px;
          }
          .nums,.time{
            position: absolute;
            right:20px;
            color: #fff;
          }
          .nums{
            top: 5px;
            display:flex;
            align-items: center;
            img{
              width:15px;
              height:15px;
              padding-right: 3px;
            }
          }
          .time{
            bottom: 5px;
          }
        }
        .msg{
          width: 240px;
          .title{
            padding: 5px 0;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            display: flex;
            align-items: center;
            .icon{
              color: #d81e06;
              border: 1px solid #d81e06;
              border-radius: 3px;
              padding: 0 2px;
              transform: scale(0.8);
              margin-right: 3px;
            }
          }
          .by{
            color: #d1d1d1;
          }
        }
      }
    }
    .allList::before{
      content: '';
      height: 0px;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid #e8e8e8;
      position: absolute;
      top: -10px;
      left: 35px;
    }
    .allList{
      width: 750px;
      box-shadow: 0 0 3px rgba(188, 188, 188, 0.581);
      position: absolute;
      top: 60px;
      background-color: #fff;
      .top{
        height: 50px;
        border-bottom: 1px solid #e4e4e4;
        display: flex;
        align-items: center;
        .topBtn{
          margin-left: 20px;
          font-size: 14px;
             
          display: inline-block;
          .active{
            color: #d81e06;
            background-color: rgb(255, 245, 245);
            padding: 5px 10px;
            border-radius: 16px;  
          }
          .noactive{
            padding: 5px 10px;
          }
          .noactive:hover{
            color: #d81e06;
          }
        }
      }
      .bottom{
        overflow-y: scroll;
        margin-left: 20px;
        margin-top: 10px;
        display: grid;
        height: 450px;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        .allTabs{
          font-size: 13px;
          padding: 5px 10px;
          margin-bottom:30px;
          .noactive{
            color: #545454; 
          }
          .noactive:hover{
            color:#000;
          }
          .active{
            color:#d81e06;
          }
          .active:hover{
            color: #d81e06;
          }
        }
      }
    }
}
</style>