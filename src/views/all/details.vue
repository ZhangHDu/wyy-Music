<template>
  <div class="Details">
        <!-- 是否替换列表 -->
        <isRepeat v-if="isShowRepeat" :nowplay="musicDetails[0]" v-model="isShowRepeat" />
      <!-- 加载中 -->
        <div class="loading" v-show="!details.songs.length || isChange">
            <div class="loadingBox">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
      <!-- 歌单详情 -->
      <div class="msg" v-if="details.songs.length">
          <!-- 歌单图片 -->
          <div class="msgLeft" >
              <img :src="details.coverImgUrl" alt="">
          </div>
          <!-- 歌单信息 -->
          <div class="msgRight">
              <!-- 歌单名 -->
              <div class="name">
                  <div class="icon">歌单</div>
                  <p>{{details.name}}</p>
              </div>
              <!-- 创建人以及创建时间 -->
              <div class="creator">
                  <!-- 头像 -->
                  <img :src="details.avatarUrl" alt="">
                  <!-- 名字 -->
                  <p>{{details.userName}}</p>
                  <!-- 创建时间 -->
                  <div class="time">{{details.createTime}}创建</div>
              </div>
              <!-- 播放全部，收藏，分享，下载全部 -->
              <div class="allBtn">
                  <div class="playAll">
                      <div class="left" @click="allPlay">
                          <img src="../../assets/images/播放 (2).png" alt="" >
                          <p >播放全部</p>
                      </div>
                      <div class="right" @click="addAll">
                          <img src="../../assets/images/添加.png" alt="">
                      </div>
                  </div>
                  <div class="collection">
                      <img src="../../assets/images/添加文件.png" alt="">
                      <p>收藏({{details.subscribedCount}})</p>
                  </div>
                  <div class="share">
                      <img src="../../assets/images/分享.png" alt="">
                      <p>分享({{details.shareCount}})</p>
                  </div>
                  <div class="dowload">
                      <img src="../../assets/images/下载.png" alt="">
                      <p>下载全部</p>
                  </div>
              </div>
              <!-- tags -->
              <div class="tags">
                  标&nbsp;&nbsp;签：
                  <p>{{details.tags[0]}}</p>
                    <template v-if="details.tags[1]">
                        /<p>{{details.tags[1]}}</p>
                    </template>
                    <template v-if="details.tags[2]">
                        /<p>{{details.tags[2]}}</p>
                    </template>
              </div>
              <!-- 数据 -->
              <div class="nums">
                  <!-- 歌曲数量 -->
                  <div class="songs">
                      歌曲数：<p>{{details.trackCount}}</p>
                  </div>
                  <!-- 播放量 -->
                  <div class="plays">
                      播放量：<p>{{details.playCount}}</p>
                  </div>
              </div>
              <!-- 简介 -->
              <div class="description" @click="showLong">
                  简&nbsp;&nbsp;介：<p class="short" v-show="longOrshort">{{details.description}}</p><p class="long" v-show="!longOrshort">{{details.description}}</p>
              </div>
          </div>
      </div>
      <!-- 歌曲列表 -->
      <div class="list" v-if="details.songs.length">
          <!-- 列表 -->
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="歌曲列表" name="first">
                    <el-table
                        :data="details.songs"
                        lazy
                        stripe
                        @row-dblclick="dbPlay"
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
                <!-- 评论 -->
                <el-tab-pane :label="'评论('+details.commentCount+')'" name="second">
                    <div class="inputArea">
                       <el-input 
                        type="textarea"
                        placeholder="输入评论或@朋友"
                        v-model="textarea"
                        maxlength="140"
                        resize="none"
                        show-word-limit
                        rows="3"
                       ></el-input>
                       <div class="inputIcon">
                            <div class="iILeft">
                                <div class="small">
                                    <img src="../../assets/images/笑脸.png" alt="">
                                </div>
                                <div class="at">
                                    <img src="../../assets/images/at.png" alt="">
                                </div>
                                <div class="jing">
                                    <img src="../../assets/images/井号键.png" alt="">
                                </div>
                            </div>
                            <div class="iIRight">
                                <div class="PLbtn">评论</div>
                            </div>
                       </div>
                    </div>
                    <div class="comments">
                        <div class="title">精彩评论</div>
                        <!-- 评论组件 -->
                        <comments :comments="details.hotComments" />
                        <div class="title">最新评论</div>
                        <!-- 评论组件 -->
                        <comments :comments="details.comments" />
                    </div>
                </el-tab-pane>
                <!-- 收藏 -->
                <el-tab-pane label="收藏者" name="third">
                    <div class="subList">
                        <div class="subs" v-for="item in details.subscribers" :key="item.index">
                            <div class="subL">
                                <!-- 头像 -->
                                <img :src="item.avatarUrl" alt="">
                            </div>
                            <div class="subR">
                               <div class="subRND">
                                    <!-- 用户名 -->
                                    <div class="subName">
                                        {{item.nickname}}
                                        <div class="gender">
                                            <img src="../../assets/images/男.png" alt="" class="man" v-if="item.gender == 1">
                                            <img src="../../assets/images/女.png" alt="" class="woman" v-if="item.gender == 2">
                                        </div>
                                    </div>
                                    <!-- 签名 -->
                                    <div class="subDes">
                                        {{item.signature}}
                                    </div>
                               </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
      </div>
     
  </div>
</template>

<script>
import isRepeat from '../../components/isRepeat'
import detail from '../../http/api/detail'
import user from '../../http/api/user'
import music from '../../http/api/music'
import comments from '../../components/comments'
import {mapMutations,mapState} from 'vuex'
export default {
    name:'Details',
    data(){
        return{
            activeName: 'first', // 默认显示歌单列表
            details:{
                coverImgUrl:null, // 歌单封面
                name:null, // 歌单名
                createTime:null, // 创建时间
                avatarUrl:null, // 创建者头像
                commentCount:null, // 评论数量
                tags:[], // 标签
                description:'', // 简介
                trackCount:0, // 歌曲数
                playCount:0, // 播放量
                userName:null, // 歌单创建者
                songs:[], // 歌单列表
                subscribedCount:0, // 收藏数量
                shareCount:0, // 分享数量
                comments:null, // 最新评论
                hotComments:null, // 热评
                subscribers:null, // 收藏者
            },
            getpage:false, // 是否获取新页面
            longOrshort:true,// 简介显示隐藏
            isFirst:true, // 是否第一次加载
            isChange:false, // 是否切换路由
            textarea:"", // 评论
            musicDetails:[],
            isShowRepeat:false
        }
    },
    components:{
        comments,
        isRepeat
    },
    methods:{
         ...mapMutations(['clearPlayList','replacePlayList','changeNowPlay','addPlayList','changePlayList']),
        // 获取歌单详情
        async getDetails(id){
            if(!this.isFirst){
                this.isChange = true
            }
            const res = await detail.getDetails(id)
            console.log(res);
            const {coverImgUrl,name,createTime,commentCount,creator,tags,description,trackCount,playCount,userId,subscribedCount,shareCount} = res.playlist
            // 获取歌单封面
            this.details.coverImgUrl = coverImgUrl
            // 获取歌单名
            this.details.name = name
            // 获取创建时间
            this.details.createTime = this.getTime(createTime,1)
            // 获取评论数量
            if(commentCount>9999){
                this.details.commentCount = Math.floor(commentCount/10000) +'万'
            }else{
                this.details.commentCount = commentCount
            }
            // 获取创建信息
            // this.creator = creator
            this.details.avatarUrl = creator.avatarUrl
            // 获取标签
            this.details.tags = tags
            // 获取简介
            this.details.description = description
            //  获取歌曲数
            this.details.trackCount = trackCount
            //  获取播放量
            if(playCount>9999){
                this.details.playCount = Math.floor(playCount/10000) +'万'
            }else{
                this.details.playCount = playCount
            }
            // 获取收藏数
            if(subscribedCount>9999){
                this.details.subscribedCount = Math.floor(subscribedCount/10000) +'万'
            }else{
                this.details.subscribedCount = subscribedCount
            }
            // 获取分享数
            if(shareCount>9999){
                this.details.shareCount = Math.floor(shareCount/10000) +'万'
            }else{
                this.details.shareCount = shareCount
            }
            // 获取创建者id
            this.getName(userId)
            
        },
        // 获取所有歌曲
        async getSongs(id){
            const allSong = await detail.getDetailsSong(id)
            this.details.songs = allSong.songs
            this.details.songs.forEach(item => {
                item.time = this.getTime(item.dt,2)
            });
        },
        // 获取歌单评论
        async getComment(id){
            const res = await detail.getDetailsComment(id)
            // 最新评论
            this.details.comments = res.comments
            // this.details.comments.forEach((item)=>{
            //     item.time = this.getTime(item.time,1)
            // })
            // 热评
            this.details.hotComments = res.hotComments
            // this.details.hotComments.forEach((item)=>{
            //     item.time = this.getTime(item.time,1)
            // })
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
        // 获取用户详情
        async getName(id){
            const res = await user.getUser(id)
            this.details.userName = res.profile.nickname
        },
        //  获取收藏者
        async getSubs(id){
            const res = await detail.getSubscribers(id)
            this.details.subscribers = res.subscribers
            // 如果不是第一次进入，即是切换路由
            if(!this.isFirst){
                this.isChange = false
            }
        },
        // tabs切换事件
        async handleClick(tab) {
            console.log(tab.index);
        },
        // 简介隐藏和显示
        showLong(){
            this.longOrshort = !this.longOrshort
        },
        // 播放全部，替换播放列表，立即播放
        allPlay(){
                console.log('替换当前播放列表');
                this.musicDetails = []
                // 获取所有歌曲详情，并整理好数据
                this.musicDetail()
                // 替换播放列表
                this.replacePlayList(this.musicDetails)
                // 播放第一首歌曲   
                this.isShowRepeat = true  
                // setTimeout(()=>{
                //     this.changeNowPlay(this.musicDetails[0])
                // },1)
        },
        // 全部添加到播放列表，不播放
        addAll(){
            console.log('将歌单到歌添加到播放列表中');
            // this.musicDetails = []
            // this.musicDetail()
            // this.addPlayList(this.musicDetails)
            
        },
        // 获取歌单歌曲详情
        musicDetail(){
            this.details.songs.forEach(async(item)=>{
                const res = await music.getMusicUrl(item.id)
                console.log(item);
                const obj = {
                    id:item.id, // 歌曲id
                    name:item.name, // 歌名
                    artName:item.ar[0].name, // 作者
                    duration:item.dt, // 时长
                    time:this.getTime(item.dt,2),
                    img:item.al.picUrl, // 图片
                    url:res.data[0].url, // 歌曲url
                    alias:null, // 简介
                    mvid:item.mv === 0 ? null : item.mv, // mvid
                    sq: item.sq ? true :false,// sq
                    isNowPlay:false, // 是否立即播放
                    runTime:null, // 播放进度
                    switchTime:"00:00", // 转换后的时间
                    fee:item.fee, // 0免费 1Vip 4购买专辑 8非会员可以播放低音质
                    for:this.details.name, // 歌曲来源
               }
                this.musicDetails.push(obj)
            })
            
        },
        async dbPlay(row){
            console.log(row);
            // this.changeNowPlay(row.al)
            this.musicDetails = []
                // 获取所有歌曲详情，并整理好数据
            this.musicDetail()
                // 替换播放列表
            this.replacePlayList(this.musicDetails)
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
                for:this.details.name
            }
            this.changePlayList(newMusic)
            this.changeNowPlay(newMusic)
        }
    },
    created(){ 
        if(this.isFirst){
            // 第一次进入路由
             this.getDetails(this.$route.query.id)
             this.getSongs(this.$route.query.id)
              // 获取歌单评论
             this.getComment(this.$route.query.id)
              //  获取收藏者
             this.getSubs(this.$route.query.id) 
             this.isFirst = false 
             
        }
    },
    computed:{
      ...mapState(['playList','nowplay'])
    },
    watch:{
       $route(){
            //    当路由发送变化的时候（二次进入路由
           // 判断id有无值，有值才发请求获取歌单详情
           if(this.$route.query.id){
                // 选项卡默认第一个
                this.activeName = "first"
                // 重新加载
                // 获取详情
                this.getDetails(this.$route.query.id) 
                // 获取音乐
                this.getSongs(this.$route.query.id) 
                // 获取歌单评论
                this.getComment(this.$route.query.id)
                //  获取收藏者
                this.getSubs(this.$route.query.id)
           }
       },
    }
}
</script>

<style lang="less" scoped>
@keyframes loading{
    0%,
    100%{
        height: 80px;
    }
    40%{
        height: 40px;
    }
}

.Details{
    height: 610px;
    width: 784px;
    overflow-y: scroll;
    position: relative;
    .loading{
        margin-left: 20px;
        height: 610px;
        width: 100%;
        position: absolute;
        background-color: rgb(255, 255, 255);
        z-index: 996;
        .loadingBox{
            width: 105px;
            height: 105px;
            border: 1px solid #000;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            div{
                width: 10px;
                height: 80px;
                border-radius: 10px;
                background-color: #000;
                animation: loading infinite 1s ease-in-out;
            }
            div:nth-child(2){
                animation: loading infinite 1s ease-in-out -0.8s;
            }
            div:nth-child(3){
                animation: loading infinite 1s ease-in-out -1.6s;
            }
        }
    }
    .msg{
        margin: 20px 0 20px 30px;
        width: 744px;
        display: flex;
        color: rgb(66, 66, 66);
        .msgLeft{
            margin-right: 30px;
            img{
                width: 200px;
                height: 200px;
                border-radius: 10px;
            }
            .nullImg{
                width: 230px;
                height: 230px;
                border-radius: 15px;
                background-color: rgb(213, 213, 213);
            }
        }
        .msgRight{
            width: 500px;
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
                    color: rgb(111, 160, 212);
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
                justify-content: space-between;
                .playAll{ 
                    display: flex;
                    align-items: center;
                    color: #fff;
                    font-size: 12px;  
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
                            width: 16px;
                            height: 16px;
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
                    
                    img{
                        width: 20px;
                        height: 20px;
                        padding-right: 5px;
                    }
                    p{
                        font-size: 12px;
                    }
                }
                .collection:hover,.share:hover,.dowload:hover{
                    background: #e4e4e4;
                }
            }
            .tags{
                display: flex;
                p{
                     color: rgb(125, 172, 222);
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
            // 简介
            .description{
                display: flex;
                width: 500px;
                .short{
                    color: rgb(110, 110, 110);
                    overflow:hidden; // 超出隐藏
                    text-overflow:ellipsis;//当文本溢出时显示（...）
                    white-space: nowrap;
                }
                .long{
                    color: rgb(110, 110, 110);
                }
            }
            .tags,.nums,.description{
                padding: 5px 0;
            }
        }
    }
    .list{
        margin-left:20px;
        margin-bottom: 74px;
        // 修改tabs组件样式
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
        // 修改输入框的样式
        .el-textarea /deep/ .el-textarea__inner{
             font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        }
        .el-textarea /deep/ .el-textarea__inner:focus {
            border-color: rgb(175, 175, 175);
 }
        .comments{
            .title{
                font-size: 14px;
                padding-bottom: 15px;
            }
            
        }
        .inputArea{
            padding-top: 5px;
            .inputIcon{
                display: flex;
                justify-content: space-between;
                padding: 20px 0 30px 0;

                .iILeft{
                    display: flex;
                    img{
                        width: 20px;
                        height: 20px;
                    }
                    div{
                        padding-right: 10px;
                    }
                    .small{

                    }
                    .at{

                    }
                    .jing{

                    }
                }
                .iIRight{
                    .PLbtn{
                        font-size: 14px;
                        font-weight: 300;
                        border: 1px solid rgb(169, 169, 169);
                        padding: 5px 15px;
                        border-radius: 20px;
                    }
                }
            }

        }
        .subList{
            display: grid;
            grid-template-columns: 1fr 1fr;
            .subs{
                display: flex;
                padding: 5px 0;
                .subL{
                    padding-right: 10px;
                    img{
                        width: 90px;
                        height: 90px;
                        border-radius: 50%;
                    }
                }
                .subR{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .subRND{
                        
                        .subName{
                            font-size: 14px;
                            display: flex;
                            .gender{
                                margin-left: 5px;
                                width: 20px;
                                height: 20px;
                                border-radius: 50%;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                img{
                                    width: 15px;
                                }
                            }
                        }
                        .subDes{
                            font-size: 13px;
                            color: rgba(126, 126, 126, 0.549);
                            padding-top: 10px;
                        }
                    }
                }
            }
        }
    }
}
</style>