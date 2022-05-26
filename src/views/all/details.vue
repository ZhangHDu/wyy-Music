<template>
  <div class="Details" v-if="isShow">
      <!-- 歌单详情 -->
      <div class="msg">
          <!-- 歌单图片 -->
          <div class="left">
              <img :src="coverImgUrl" alt="">
          </div>
          <!-- 歌单信息 -->
          <div class="right">
              <!-- 歌单名 -->
              <div class="name">
                  <div class="icon">歌单</div>
                  <p>{{name}}</p>
              </div>
              <!-- 创建人以及创建时间 -->
              <div class="creator">
                  <!-- 头像 -->
                  <img :src="avatarUrl" alt="">
                  <!-- 名字 -->
                  <p>{{userName}}</p>
                  <!-- 创建时间 -->
                  <div class="time">{{time}}创建</div>
              </div>
              <!-- 播放全部，收藏，分享，下载全部 -->
              <div class="allBtn">
                  <div class="playAll">
                      <div class="left">
                          <img src="../../assets/images/播放 (2).png" alt="">
                          <p>播放全部</p>
                      </div>
                      <div class="right">
                          <img src="../../assets/images/添加.png" alt="">
                      </div>
                  </div>
                  <div class="collection">
                      <img src="../../assets/images/添加文件.png" alt="">
                      <p>收藏</p>
                  </div>
                  <div class="share">
                      <img src="../../assets/images/分享.png" alt="">
                      <p>分享</p>
                  </div>
                  <div class="dowload">
                      <img src="../../assets/images/下载.png" alt="">
                      <p>下载全部</p>
                  </div>
              </div>
              <!-- tags -->
              <div class="tags">
                  标&nbsp;&nbsp;签：<p>{{tags[0]}}</p>/<p>{{tags[1]}}</p>/<p>{{tags[2]}}</p>
              </div>
              <!-- 数据 -->
              <div class="nums">
                  <!-- 歌曲数量 -->
                  <div class="songs">
                      歌曲数：<p>{{trackCount}}</p>
                  </div>
                  <!-- 播放量 -->
                  <div class="plays">
                      播放量：<p>{{playCount}}</p>
                  </div>
              </div>
              <!-- 简介 -->
              <div class="description">
                  简&nbsp;&nbsp;介：<p>{{description}}</p>
              </div>
          </div>
      </div>
      <!-- 歌曲列表 -->
      <div class="list">
          <!-- 列表 -->
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="歌曲列表" name="first">
                    <el-table
                        :data="songs"
                        lazy="true"
                        stripe
                        style="width: 100%">
                            <!-- 序号 -->
                            <el-table-column
                            type='index'
                            width="40"> 
                            </el-table-column>
                            <!-- 添加我喜欢 -->
                            <el-table-column
                            width="40">
                            <img src="../../assets/images/收藏 (1).png" width="20px" height="20px" alt="">
                            </el-table-column>
                            <!-- 点击下载 -->
                            <el-table-column
                            width="40">
                             <img src="../../assets/images/下载.png" width="18px" height="18px" alt="">
                            </el-table-column>
                            <!-- 音乐标题 -->
                            <el-table-column
                            prop="name"
                            label="音乐标题"
                            width="280">
                            </el-table-column>
                            <!-- 歌手名称 -->
                            <el-table-column
                            prop="ar[0].name"
                            label="歌手">
                            </el-table-column>
                            <!-- 专辑名 -->
                            <el-table-column
                            prop="al.name"
                            show-overflow-tooltip="true"
                            width="280"
                            label="专辑">
                            </el-table-column>
                            <!-- 时长 -->
                            <el-table-column
                            prop="dt"
                            width="70"
                            label="时长">
                            </el-table-column>
                    </el-table>
                </el-tab-pane>
                <!-- 评论 -->
                <el-tab-pane label="评论" name="second">评论</el-tab-pane>
                <!-- 收藏 -->
                <el-tab-pane label="收藏者" name="third">收藏者</el-tab-pane>
            </el-tabs>
      </div>
  </div>
</template>

<script>
import api from '../../api'
export default {
    name:'Details',
    data(){
        return{
            activeName: 'first',
            details:{},
            isShow:false,
            coverImgUrl:this.$route.query.url, // 歌单封面
            name:null, // 歌单名
            createTime:null, // 创建时间戳
            time:null, // 创建时间
            avatarUrl:null, // 创建者头像
            // creator:null, // 创建者信息
            commentCount:null, // 评论数量
            tags:[], // 标签
            description:'', // 简介
            trackCount:0, // 歌曲数
            playCount:0, // 播放量
            userName:null, // 歌单创建者
            songs:[], // 歌单列表
        }
    },
    methods:{
        // 获取歌单详情
        async getDetails(id){
            const res = await api.getDetails(id)
            const allSong = await api.getDetailsSong(id)
            this.songs = allSong.data.songs
            this.songs.forEach(item => {
                item.dt = this.getTime(item.dt,2)
            });
            this.isShow = true
            this.details = res.data
            const {coverImgUrl,name,createTime,commentCount,creator,tags,description,trackCount,playCount,userId} = res.data.playlist
            // 获取歌单封面
            this.coverImgUrl = coverImgUrl
            // 获取歌单名
            this.name = name
            // 获取创建时间
            this.createTime = createTime
            // 获取评论数量
            this.commentCount = commentCount
            // 获取创建信息
            // this.creator = creator
            this.avatarUrl = creator.avatarUrl
            // 获取标签
            this.tags = tags
            // 获取简介
            this.description = description
            //  获取歌曲数
            this.trackCount = trackCount
            //  获取播放量
            this.playCount = playCount
            // 获取创建者id
            this.getName(userId)
        },
        // 转换时间
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
        // 获取用户详情
        async getName(id){
            const res = await api.getUser(id)
            this.userName = res.data.profile.nickname
        },
        handleClick(tab, event) {
            console.log(tab, event);
        }
    },
    created(){
        // 获取歌单详情
        this.getDetails(this.$route.query.id)
    },
    watch:{
       $route(){
        //    当路由发送变化的时候
           this.isShow = false // 页面卸载
           // 判断id有无值，有值才发请求获取歌单详情
           if(this.$route.query.id){
               this.getDetails(this.$route.query.id)
           }
           
       },
       createTime(){
            this.time = this.getTime(this.createTime,1)
       }
    }
}
</script>

<style lang="less" scoped>
.Details{
    height: 90vh;
    overflow-y: scroll;
    .msg{
        margin: 20px 30px;
        display: flex;
        .left{
            margin-right: 30px;
            img{
                width: 230px;
                height: 230px;
                border-radius: 15px;
            }
            .nullImg{
                width: 230px;
                height: 230px;
                border-radius: 15px;
                background-color: rgb(213, 213, 213);
            }
        }
        .right{
            font-size: 12px;
            .name{
                display: flex;
                align-items: center;
                 
                .icon{
                    color:red;
                    padding: 1px 3px;
                    border: 1px solid red;
                    border-radius: 5px;
                   
                    margin-right: 10px;
                }
                p{
                    font-size: 20px;
                }
            }
            .creator{
                padding: 15px 0;
                display: flex;
                align-items: center;
                img{
                    width: 25px;
                    border-radius: 50%;
                    margin-right: 10px;
                }
                p{
                    color: rgb(49, 125, 206);
                    margin-right: 10px;
                }
                .time{
                    font-size: 12px;
                }
            }
            .allBtn{
                display: flex;
                height: 40px;
                align-items: center;
                .playAll{ 
                    display: flex;
                    align-items: center;
                    color: #fff;
                    font-size: 14px;  
                    .left{
                        display: flex;
                        align-items: center;
                        height: 30px;
                        background: rgb(230, 24, 24);
                        border-top-left-radius: 20px;
                        border-bottom-left-radius: 20px;
                        margin: 0;
                        padding: 0 13px;
                        img{
                            width: 20px;
                            height: 20px;
                            padding-right: 7px;
                        }
                       
                    }
                    .left:hover{
                         background: rgb(205, 18, 18);
                    }
                    .right{
                        height: 30px;
                        border-top-right-radius: 20px;
                        border-bottom-right-radius: 20px;
                        display: flex;
                        align-items: center;
                        padding-left: 7px;
                        padding: 0 13px;
                        background-color: rgb(236, 50, 50);
                        border-left: 1px  solid rgba(236, 236, 236, 0.251);
                        img{
                            width: 14px;
                            height: 14px;
                        }
                    }
                    .right:hover{
                        background-color: rgb(210, 36, 36);
                    }
                }
                .collection,.share,.dowload{
                    display: flex;
                    height: 30px;
                    border-radius: 20px;
                    border: 1px solid #c6c6c6;
                    align-items: center;
                    padding: 0 13px;
                    margin-left: 15px;
                    img{
                        width: 20px;
                        height: 20px;
                        padding-right: 5px;
                    }
                    p{
                        font-size: 14px;
                    }
                }
                .collection:hover,.share:hover,.dowload:hover{
                    background: #e4e4e4;
                }
            }
            .tags{
                display: flex;
                p{
                     color: rgb(49, 125, 206);
                }
            }
            .nums{
                display: flex;
                .songs,.plays{
                    display: flex;
                }
                .songs{
                    margin-right: 15px;
                }
            }
            .description{
                display: flex;
                p{
                    color: rgb(110, 110, 110);
                }
            }
            .tags,.nums,.description{
                padding: 5px 0;
            }
        }
    }
    .list{
        margin: 20px 30px;
        .el-tabs__item.is-active {
            color: red;
        }
    }
}
</style>