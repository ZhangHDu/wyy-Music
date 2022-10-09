<template>
  <div class="search">
    <div class="title" v-if="type===1">
      <div class="value">{{value}}&nbsp;</div>
      找到{{songCount}}首单曲
    </div>
    <div class="title" v-if="type===100">
      <div class="value">{{value}}&nbsp;</div>
      找到{{artistCount}}位歌手
    </div>
     <div class="title" v-if="type===10">
      <div class="value">{{value}}&nbsp;</div>
      找到{{albumCount}}张专辑
    </div>
     <div class="title" v-if="type===1014">
      <div class="value">{{value}}&nbsp;</div>
      找到{{videoCount}}个视频
    </div>
    <div class="tabs">
      <el-tabs  v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="单曲" name="1">
          <div class="listHead">
            <div class="musicTitle">音乐标题</div>
            <div class="art">歌手</div>
            <div class="cd">专辑</div>
            <div class="time">时长</div>
          </div>
          <div class="songList">
            <div class="song" v-for="item,index in songs" :key="item.index" @dblclick="dbPlay(item)">
              <div class="index">{{index+1}}</div>
              <div class="icon">
                 <img src="../../../assets/images/收藏 (1).png"  alt="">
                 <img src="../../../assets/images/下载.png" alt="">
              </div>
              <div class="name">
                <div class="nameTop">
                  <div class="songName" >{{item.name}}</div>
                  
                  <div class="sq" v-if="item.sq">SQ</div>
                  <div class="mv" v-if="item.mv">MV</div>
                  <div class="vip" v-if="item.fee === 1">VIP</div>
                </div>
                <div class="alia">{{item.alia[0]}}</div>
              </div>
              <div class="arts" >
                <div class="art" v-for="art in item.ar" :key="art.index">
                  {{art.name}}
                </div>
                
              </div>
              <div class="cd">{{item.al.name}}</div>
              <div class="time">{{item.time}}</div>
             
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="歌手" name="2">
          <div class="artistList">
            <div class="artist" v-for="item in artists" :key='item.index'>
              <div class="artData">
                <img :src="item.picUrl" alt="">
                <div class="name">{{item.name}}</div>
                <div class="othername" v-show="item.alias[0]">({{item.alias[0]}})</div>
              </div>
              <div class="icon">
                <img src="../../../assets/images/search/用户名.png" alt="">
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="专辑" name="3">
          <div class="albums">
            <div class="album" v-for="item in albums" :key="item.index">
              <div class="cdMsg">
                <img :src="item.picUrl" alt="">
                <div class="name">{{item.name}}</div>
              </div>
              <div class="artName">{{item.artist.name}}&nbsp;<p v-if="item.artist.alias[0]">({{item.artist.alias[0]}})</p></div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="视频" name="4">
          <div class="videos">
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
              <div class="videotitle">
                <div class="icon" v-if="item.type === 0">MV</div>
                {{item.title}}
              </div>
              <div class="by">
                {{item.creator[0].userName}}
              </div>
            </div>
        </div>
      </div>
        </el-tab-pane>
        <el-tab-pane label="歌单" name="5">歌单</el-tab-pane>
        <el-tab-pane label="歌词" name="6">歌词</el-tab-pane>
        <el-tab-pane label="主播电台" name="7">主播电台</el-tab-pane>
        <el-tab-pane label="用户" name="8">用户</el-tab-pane>
      </el-tabs>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        hide-on-single-page
        @current-change="thisPage"
        :page-size="limit"
        :total="count">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import search from '../../../http/api/search.js'
import music from '../../../http/api/music'
import {mapMutations} from 'vuex'
export default {
    name:'search',
    data(){
      return{
        value:null, // 关键字
        songCount:0, // 单曲数量
        artistCount:0, // 歌手数量
        albumCount:0, // 专辑数量
        videoCount:0, // 视频数量
        videos:[], // 视频列表
        albums:[], // 专辑列表
        songs:[], // 单曲列表
        artists:[],// 歌手列表
        activeName:'1',
        count:0, // 根据type计算分页数量
        type:1, // 默认是1 单曲
        limit:100, //每页最大数量
      }
    },
    methods:{
      ...mapMutations(['changeNowPlay','changePlayList','changeType']),
      // 获取数据
      async getSearch(keyword,limit,offset,type){
        const res = await search.keywordSearch(keyword,limit,offset,type)
        console.log(res)
        if(this.type === 1){
          this.songCount = res.result.songCount
          this.songs = res.result.songs
          this.count = this.songCount
          this.songs.forEach(item => {
          item.time = this.getTime(item.dt,2)
        });
        }else if(this.type === 100){
          this.artistCount = res.result.artistCount
          this.artists = res.result.artists
          if(this.artistCount>20){
            this.count =this.artistCount
          }else{
            this.count = 0
          }         
        }else if(this.type === 10){
          this.albums = res.result.albums
          this.albumCount = res.result.albumCount
          this.count = this.albumCount
        }else if(this.type === 1014){
          this.videos = res.result.videos
          this.videoCount = res.result.videoCount
          this.count = this.videoCount
        }
      },
      // 点击tabs
      handleClick(tab) {
        if(tab.index == 0){
          // 单曲
          this.type = 1
          this.limit = 100
        }else if(tab.index == 1){
          // 歌手
          this.type = 100
          this.limit = 20
          this.getSearch(this.value,20,0,this.type)
        }else if(tab.index == 2){
          // 专辑
          this.type = 10
          this.limit = 20
          this.getSearch(this.value,20,0,this.type)
        }else if(tab.index == 3){
          // 视频
          this.limit = 21
          this.type = 1014
          this.getSearch(this.value,21,0,this.type)
        }else if(tab.index == 4){
          // 歌单
          this.type = 1000
        }else if(tab.index == 5){
          // 歌词
          this.type = 1006
        }else if(tab.index == 6){
          // 主播电台
          this.type = 1009
        }else if(tab.index == 7){
          // 用户
          this.type = 1002
        }
        
        console.log(this.type);
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
      // 分页器事件
      thisPage(val){
        if(this.type == 1){
         
          this.getSearch(this.value,100,val*100-100,1)
        }else if(this.type == 100){
          this.getSearch(this.value,20,val*20-20,100)
        }else if(this.type == 10){
          this.getSearch(this.value,20,val*20-20,10)
        }else if(this.type == 1014){
          this.getSearch(this.value,20,val*21-21,1014)
        }
        
        
      },
      // 视频详情
      toVideoDetail(id){
      this.$router.push({ path: '/videoDetail', query: { id: id } })
      },
      async dbPlay(row){
        this.changeType(0)
        if(row.fee === 1){
          // vip歌曲
          // 需要判断vuex中缓存的vip信息（未实现，不想做）
          console.log('需要vip');
        }else if(row.fee === 8 || row.fee === 0){
          // 8:非会员免费播放低音质 0:免费或无版权
          const res = await music.getMusicUrl(row.id)
          const newMusic = {
                id:row.id, // 歌曲id
                name:row.name, // 歌名
                artName:row.ar[0].name, // 作者
                duration:row.dt, // 时长
                time:row.time,
                img:row.al.picUrl, // 图片
                url:res.data[0].url, // 歌曲url
                mvid:row.mv === 0 ? null : row.mv, // mvid
                sq: row.sq ? true :false,// sq
                isNowPlay:true, // 是否立即播放
                runTime:0, // 播放进度
                switchTime:"00:00", // 转换后的时间
                for:"搜索页"
            }
        this.changePlayList(newMusic)
        this.changeNowPlay(newMusic)
      }else if(row.fee === 4){
        // 需要购买专辑
        console.log('需要购买专辑！！');
      }
        }
        
    },
    created(){
      this.value = this.$route.query.value
    },
    watch:{
      $route(){
        if(this.$route.query.value){
          // 默认进入单曲
          this.type = 1
          // 进入页面上总是显示第一个
          this.activeName = '1'  
          // 获取关键字
          this.value = this.$route.query.value
        }
      },
      value(){
        this.value = this.$route.query.value
        // 监视value值变化，如果不是第一次进入路由，并且当前已经在搜索结果页
        if(!this.isFirst && this.$route.path === '/search'){
          // 发请求获取数据  
          this.getSearch(this.value,100,0,1)
        }
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
    }
}
</script>

<style lang='less' scoped>
.search{
  padding: 20px 0;
  width: 804px;
  height: 600px;
  overflow: scroll;
  box-sizing:border-box;
  .title{
    display: flex;
    font-size: 12px;
    color: #5a5a5a;
    align-items: end;
    padding: 0 30px;
    .value{
      font-size: 18px;
      font-weight: bolder;
      
    }
  }
  .tabs{
    padding-bottom: 20px;
    ::v-deep .el-table{
      padding: 0 30px;
    }
    ::v-deep .el-tabs__item{
            font-size: 13px;
    }
    ::v-deep .el-tabs__item.is-active {
            color: rgb(208, 13, 13);
    }
    ::v-deep .el-tabs__item:hover{
             color: rgb(208, 13, 13);
    }
    ::v-deep .el-tabs__active-bar {
            background-color: rgb(208, 13, 13);
    }
    ::v-deep .el-tabs__header {
      margin:0;
      padding: 0 30px;
    }
    .listHead{
      display:flex;
      font-size:12px;
      color:#5a5a5a;
      padding: 10px 0;
      .musicTitle{
        padding-left: 135px;
        padding-right: 233px;
      }
      .art{
        padding-right: 75px;
      }
      .cd{
        padding-right: 165px;
      }
    }
    .songList{
      font-size: 12px;
      .song{
        display: flex;
        padding: 10px 0;
        margin: 0 30px;
        .index{
          padding-left: 30px;
          padding-right: 10px;
          color: #8a8a8a;
          padding-top: 2px;
        }
        .icon{
          padding-top: 2px;
          padding-right: 10px;
          img{
            width:15px;
            padding:0 5px
          }
        }
        .name{
          width: 280px;
          .nameTop{
            width: 280px;
            display: flex;
            align-items: center;
            .songName{
                max-width: 200px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .sq{
              border: 1px solid #f75b27;
              
              border-radius: 3px;
              padding: 0 1px;
              color: #f75b27;
              transform: scale(0.7);
            }
            .mv{
              border: 2px solid #f01a16;
              border-radius: 5px;
              padding: 0 2px;
              color: #f01a16;
              transform: scale(0.7);
            }
            .vip{
              border: 2px solid #f01a16;
              border-radius: 5px;
              padding: 0 2px;
              transform: scale(0.7);
              color:#fff;
              background-color: rgb(0, 0, 0);
            }
          }
          .alia{
            width: 280px;
            padding-top: 10px;
            color: #8a8a8a;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .arts{
          width: 100px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          display: flex;
          .art{
            max-width: 40px;
            padding-right: 5px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .cd{
          width: 160px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: #5a5a5a;
        }
        .time{
          color:#a5a5a5;
          padding-left:30px
        }
      }
      .song:nth-child(2n+1){
        background-color: #f1f1f1b5;
      }
    }
    .artistList{
      .artist{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 30px;
        .artData{
          display: flex;
          align-items: center;
          font-size: 14px;
          img{
            width: 60px;
            height: 60px;
            border-radius: 5px;
          }
          .name{
            padding-left: 10px;
          }
          .othername{
            color: #8a8a8a;
          }
        }
        .icon{
          img{
            width: 20px;
            height: 20px;
          }
        }
      }
      .artist:hover,.artist:nth-child(2n):hover{
        background:#eeeeee;
      }
      .artist:nth-child(2n){
        background-color: #f9f9f9;
      }
    }
    .albums{
      .album{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 30px;
        font-size: 14px;
        .cdMsg{
          display: flex;
          align-items: center;
           
          img{
            width:60px;
            height: 60px;
            border-radius: 5px;
          }
          .name{
            padding-left: 10px;
            width: 300px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .artName{
          width: 280px;
          display: flex;
          align-items: center;
          color: #5a5a5a;
          p{
            color: #8a8a8a;
          }
        }
      }
    }
    .videos{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      padding-top: 10px;
      padding-left: 30px;
      padding-right: 30px;
      .item{
         width: 240px;
        padding-bottom: 40px;
        .img{
          position: relative;
          img{
            width: 230px;
            height: 135px;
            border-radius: 5px;
          }
          .nums,.time{
            position: absolute;
            right:20px;
            color: #fff;
            font-size: 12px;
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
            bottom: 7px;
            right: 15px;
            font-weight: bolder;
          }
        }
        .msg{
          .videotitle{
            width: 225px;
            font-size: 12px;
            padding: 5px 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            
            .icon{
              display: inline-block;
              border: 1px solid #f01a16;
              border-radius: 5px;
              padding: 0 2px;
              color: #f01a16;
              transform: scale(0.7);
            }
          }
          .by{
            color: #d1d1d1;
            font-size: 12px;
          }
          .by:hover{
            color: rgb(186, 186, 186);
          }
        }
      }
    }
  }
  .pagination{
    padding-bottom: 50px;
    margin: 0 auto;
    .el-pagination{
      text-align:center;      
    }
    ::v-deep .el-pagination.is-background .el-pager li:hover{
      color: rgb(208, 13, 13);
    }
    ::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: rgb(208, 13, 13);
    color: #FFF;
}
  }
}
</style>