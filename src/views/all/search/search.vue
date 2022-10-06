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
          <el-table
                        :data="songs"
                        lazy
                        stripe
                        style="width: 100%">
                            <!-- 序号 -->
                            <el-table-column
                            type='index'
                            align="center"
                            width="50"> 
                            </el-table-column>
                            <!-- 添加我喜欢 -->
                            <el-table-column
                            width="40">
                            <img src="../../../assets/images/收藏 (1).png" width="20px" height="20px" alt="">
                            </el-table-column>
                            <!-- 点击下载 -->
                            <el-table-column
                            width="40">
                             <img src="../../../assets/images/下载.png" width="18px" height="18px" alt="">
                            </el-table-column>
                            <!-- 音乐标题 -->
                            <el-table-column
                            prop="name"
                            label="音乐标题"
                            show-overflow-tooltip
                            width="240">
                            </el-table-column>
                            <!-- 歌手名称 -->
                            <el-table-column
                            prop="ar[0].name"
                            show-overflow-tooltip
                            label="歌手">
                            </el-table-column>
                            <!-- 专辑名 -->
                            <el-table-column
                            prop="al.name"
                            show-overflow-tooltip
                            width="150"
                            label="专辑">
                            </el-table-column>
                            <!-- 时长 -->
                            <el-table-column
                            prop="time"
                            width="70"
                            label="时长">
                            </el-table-column>
                    </el-table>
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
                {{item.playTime}}
              </div>
              <div class="time">{{item.time}}</div>
            </div>
            <div class="msg">
              <div class="videotitle">
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
          // 已经请求过就别请求了
          if(this.artists.length ===0){
             this.getSearch(this.value,20,0,this.type)
          }
        }else if(tab.index == 2){
          // 专辑
          this.type = 10
          this.limit = 20
          if(this.albums.length === 0){
            this.getSearch(this.value,20,0,this.type)
          }
        }else if(tab.index == 3){
          // 视频
          this.limit = 21
          this.type = 1014
          if(this.videos.length === 0){
             this.getSearch(this.value,21,0,this.type)
          }
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
    }
    },
    created(){
    },
    watch:{
      $route(){
        if(this.$route.query.value){
          this.activeName = '1'  
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
          .videotitle{
            width: 225px;
            font-size: 12px;
            padding: 5px 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
           
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