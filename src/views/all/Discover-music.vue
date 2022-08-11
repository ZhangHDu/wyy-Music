<template>
  <div class="Discover-music">
      <!-- 轮播图 -->
      <div class="swiper">
        <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in banners" :key="item.index">
                <img :src="item.imageUrl" width="100%" height="100%" alt="" >
            </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 推荐歌单 -->
      <div class="Discover">
          <router-link to="/playList">
                <p>推荐歌单</p>
                <img src="../../assets/images/more.png" alt="">
          </router-link>
          <div class="playList">
              <div class="DisBox" v-for="item in discover" :key="item.index" @click="toDetails(item.id)">
                  <div class="icon">
                        <img src="../../assets/images/play.png" alt="">
                    </div>
                    <img :src="item.picUrl" alt="">
                    <p>{{item.name}}</p>
              </div>
          </div>
      </div>
      <!-- 独家放送 -->
        <div class="personalized">
            <router-link to="/playList">
                <p>独家放送</p>
                <img src="../../assets/images/more.png" alt="">
            </router-link>
            <div class="videoList">
                <div class="video" v-for="item in personalized" :key="item.index">
                     <div class="icon">
                        <img src="../../assets/images/play.png" alt="">
                    </div>
                    <img :src="item.sPicUrl" alt="">
                    <p>{{item.copywriter}}</p>
                </div>
            </div>
        </div>
      <!-- 最新音乐 -->
      <div class="newMusic">
          <router-link to="/playList">
                <p>最新音乐</p>
                <img src="../../assets/images/more.png" alt="">
            </router-link>
            <div class="newMusicList">
                    <div class="musicCard" v-for="item in newMusic" :key="item.index" @dblclick="getSongMsg(item)">
                        <div class="left">
                            <div class="icon">
                                <img src="../../assets/images/play.png" alt="">
                                <!-- <img src="../../assets/images/播放.png" alt=""> -->
                            </div>
                            <img :src="item.picUrl" alt="">
                            <div class="num">
                                {{item.index}}
                            </div>
                            <div class="song">
                                <div class="name">
                                    {{item.name}}
                                    <p v-show="item.song.album.alias[0]">{{"("+item.song.album.alias[0]+")"}}</p>
                                </div>
                                <div class="art" >
                                    <div class="sq" v-show="item.song.sqMusic">
                                        SQ
                                    </div>
                                    <div class="artList">
                                         <div v-for="arts in item.song.artists" :key="arts.index">
                                            {{arts.name}}&nbsp;&nbsp;
                                        </div>
                                    </div>
                                   
                                   
                                </div>
                            </div>
                            <div class="video" v-show="item.song.mvid">
                               MV
                            </div>
                        </div>
                        <div class="right"></div>
                    </div>
            </div>
      </div>
      <!-- 推荐MV -->
       <div class="DisMV">
            <router-link to="/playList">
                <p>推荐MV</p>
                <img src="../../assets/images/more.png" alt="">
            </router-link>
            <div class="MVList">
                <div class="MV" v-for="item in DisMV" :key="item.index">
                    <img :src="item.picUrl" alt="">
                    <div class="count">
                        <img src="../../assets/images/播放4.png" alt="">
                        &nbsp;{{item.playCount}}
                    </div>
                    <div class="disMsg">
                        {{item.copywriter}}
                    </div>
                    <p>{{item.name}}</p>
                    <p class="art">{{item.artistName}}</p>
                </div>
            </div>
        </div>
      <!-- 主播电台 -->
      <!-- LOOK直播 -->
      <isplay v-if="false"/>
  </div>
</template>

<script>
import home from '../../http/api/home.js'
import isplay from '../../components/isplay.vue'
import music from '../../http/api/music'
import {mapMutations,mapState} from 'vuex'

export default {
    data(){
        return{
            banners:[{},{},{}], //轮播图
            discover:[], // 推荐歌单
            personalized:[], //独家放送
            DisMV:[], // 推荐mv
            newMusic:[] //最新音乐
        }
    },
    components:{
        isplay
    },
    methods:{
        ...mapMutations(['changePlayList','changeNowPlay']),
        // 获取轮播图
        async getBanner(){
            const res = await home.getBanners()
            this.banners = res.banners
        },
        // 获取首页数据
        async getDiscover(){
            const res = await home.getHome()
            this.discover = res.data.blocks[1].creatives

        },
        // 获取推荐歌单
        async getDis(){
            const res = await home.getDis()
            this.discover = res.result
        },
        // 独家放送
        async getPersonalized(){
            const res = await home.getPersonalized()
            this.personalized = res.result
        },
        // 推荐MV
        async getDisMV(){
            const res = await home.getDisMV()
            this.DisMV = res.result
        },
        // 最新音乐
        getNewMusic(){
            home.getNewMusic().then(res=>{
                this.newMusic = res.result
                // 处理歌曲前面的数字
                this.newMusic.forEach((item,index) => {
                    item.index = index+1
                    if(item.index<10){
                        item.index = '0'+item.index
                        item.duration = item.song.duration
                    }
                });
            })
        },
        // 点击歌单前往歌单详情
        toDetails(id){
            console.log(id);    
            this.$router.push({ path: '/details', query: { id: id } })
        },
        
        // 双击歌曲播放
        async getSongMsg(a){
            // 获取双击歌曲的数据
            const res = await music.getMusicUrl(a.song.id)
            // 添加到vuex中
            console.log(a);
            // 处理作者名称
            const art = []
            // 多作者存储到数组中
            a.song.artists.forEach(item=>{
                art.push(item.name)
            })
            // 数组转化为字符串
            const artStr = art.join(' / ')
            // 整理数据
            const newMusic = {
                id:a.song.id, // 歌曲id
                name:a.song.name, // 歌名
                artName:artStr, // 作者
                duration:a.song.duration, // 时长
                time:this.getTime(a.song.duration,2),
                img:a.picUrl, // 图片
                url:res.data[0].url, // 歌曲url
                alias:a.song.album.alias[0]?a.song.album.alias[0]:null, // 简介
                mvid:a.song.mvid === 0 ? null : a.song.mvid, // mvid
                sq: a.song.sqMusic ? true :false,// sq
                isNowPlay:true, // 是否立即播放
                runTime:0, // 播放进度
                switchTime:"00:00", // 转换后的时间
                for:'发现页'
            }
            // 添加到歌单列表中
            this.changePlayList(newMusic)
            // 将当前歌曲添加到正在播放
            this.changeNowPlay(newMusic)
            
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
        }
        
    },
    created(){
        // 获取轮播图
        this.getBanner()
        // 获取推荐歌单
        this.getDis()
        // 获取独家放送
        this.getPersonalized()
        // 获取推荐MV
        this.getDisMV()
        // 获取最新音乐
        this.getNewMusic()
    },
    computed:{
        ...mapState(['playList'])
    }
}
</script>

<style scoped lang="less">
.Discover-music{
    height: 610px;
    overflow-y: scroll;
    overflow-x: scroll;
    width: 804px;
    // 轮播图
    .swiper{
        z-index: 100;
        margin: 20px;
       .el-carousel__item h3 {
            color: #475669;
            font-size: 14px;
            opacity: 0.75;
            // line-height: 200px;
            margin: 0;
        }
  
        .el-carousel__item:nth-child(2n) {
            background-color: #99a9bf;
        }
  
        .el-carousel__item:nth-child(2n+1) {
            background-color: #d3dce6;
        }
    }
    // 推荐歌单
    .Discover{
        margin: 0 20px;
        a{
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            width: 80px;
        }
        img{
            width: 15px;
            height: 15px;
        }
        p:first-child{
            font-weight: bolder;
            font-size: 15px;
        }
        .playList{
            width: 100%;
            overflow: hidden;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            justify-content: space-between;
            font-size: 14px;
            margin-bottom: 20px;
            .DisBox{
                width: 125px;
                position: relative;
                margin-bottom: 40px;
                margin-right: 25px;
                img{
                    width: 125px;
                    height: 125px;
                    border-radius: 10px;
                }
                p{
                    overflow:hidden; // 超出隐藏
                    text-overflow:ellipsis;//当文本溢出时显示（...）
                    display:-webkit-box; // 将对象作为弹性伸缩盒子模型显示
                    -webkit-line-clamp:2; //2行文本隐藏
                    -webkit-box-orient:vertical; //定义排列方式
                }
                a{
                    display: block;
                }
                .icon{
                    width: 125px;
                    height: 125px;
                    position: absolute;
                    img{
                        position: absolute;
                        width: 40px;
                        height: 40px;
                        right: 0;
                        bottom: 0;
                        margin: 12px;
                        opacity: 0;
                        transition: all 300ms ease;
                    } 
                }
                .icon:hover{
                        img{
                            opacity: 100%;
                        }
                    }
            }
        }
    }
    // 独家放送
    .personalized{      
        margin: 0 20px 50px 20px;
        a{
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            width: 80px;    
        }
        img{
            width: 15px;
            height: 15px;
            border-radius: 5px;
        }
        p:first-child{
            font-weight: bolder;
            font-size: 15px;
}
        .videoList{
            display: flex;
            justify-content: space-between;
            .video{
                width: 170px;
                position: relative;
                img{
                    width: 170px;
                    height: 95px;
                }
                p{
                    overflow:hidden; // 超出隐藏
                    text-overflow:ellipsis;//当文本溢出时显示（...）
                    display:-webkit-box; // 将对象作为弹性伸缩盒子模型显示
                    -webkit-line-clamp:2; //2行文本隐藏
                    -webkit-box-orient:vertical; //定义排列方式
                    font-size: 13px;
                }
                .icon{
                    width: 170px;
                    height: 95px;
                    position: absolute;
                    img{
                        position: absolute;
                        width: 25px;
                        height: 25px;
                        left: 0;
                        top: 0;
                        margin: 6px;
                        
                    } 
                }
            }
        }
    }
    // 推荐MV
     .DisMV{      
        margin: 0 20px 50px 20px;
        a{
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            width: 80px;
        }
        img{
            width: 15px;
            height: 15px;
        }
        p:first-child{
            font-size: 15px;
            font-weight: bolder;
        }
        .MVList{
            display: flex;
            justify-content: space-between;
            .MV{
                width: 170px;
                position: relative;
                overflow: hidden;
                img{
                    width: 170px;
                    height: 95px;
                    border-radius: 5px;
                }
                p{
                    overflow:hidden; // 超出隐藏
                    text-overflow:ellipsis;//当文本溢出时显示（...）
                    display:-webkit-box; // 将对象作为弹性伸缩盒子模型显示
                    -webkit-line-clamp:2; //2行文本隐藏
                    -webkit-box-orient:vertical; //定义排列方式
                    font-size: 13px;
                }
                .art{
                    color: #909090de;
                    font-size: 12px;
                }
                .count{
                    color: #fff;
                    position: absolute;
                    top:0;
                    right: 0;
                    display: flex;
                    font-size: 12px;
                    margin: 5px 10px;
                    font-weight: bolder;
                    img{
                        width: 13px;
                        height: 13px;
                        margin-top: 2px;
                    }
                }
                .disMsg{
                    width:170px;
                    height: 24px;
                    position: absolute;
                    top: -24px;
                    padding-left: 15px;
                    line-height: 24px;
                    font-size: 12px;
                    color: #fff;
                    background: rgba(0, 0, 0, 0.42);
                    border-radius: 5px 5px 0 0;
                    transition: all 300ms ease;
                }
            }
            .MV:hover{
                .disMsg{
                    top: 0;
                }
                .count{
                    opacity: 0;
                }
            }
        }
    }
    // 最新音乐
    .newMusic{
        margin: 0 20px 50px 20px;
        overflow: hidden;
        a{
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            width:80px;
        }
        p:first-child{
            font-size: 15px;
            font-weight: bolder;
        }
        img{
            width: 15px;
            height: 15px;
        }
        .newMusicList{
            width:784px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            .musicCard:hover{
                    background: #cfcfcf59;
                    border-radius:10px;
                }
            .musicCard{
                    box-sizing: border-box;
                    width: 362px;
                    font-size: 14px;
                    padding: 0 10px;
                    margin: 0 5px;
                   overflow: hidden;
                    display: block;
                    .left{
                        border-bottom: 1px solid rgb(224, 224, 224);
                        display: flex;
                        align-items: center;
                        padding: 10px 0;
                        position: relative;
                        .icon{
                            position: absolute;
                            width: 60px;
                            height: 60px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            img{
                                width: 35px;
                                height: 35px;

                            }
                        }
                        img{
                            width: 60px;
                            height: 60px;
                            border-radius: 8px;
                        }
                        .num{
                            margin: 0 10px;
                            color: #bdbdbd;
                            img{
                                width: 15px;
                                height: 15px;
                                // transform: rotateX(90deg);
                            }
                        }
                        .song{
                            width:200px;
                            .name{
                                color: rgb(77, 77, 77);
                                font-size: 14px;
                                margin-bottom: 5px;
                                display: flex;
                                white-space:nowrap;
                                overflow:hidden;
                                text-overflow: ellipsis;
                                p{
                                    font-size: 14px;
                                    color: #adadad;
                                    font-weight: 400;
                                    padding-left: 5px;
                                    white-space:nowrap;
                                    overflow:hidden;
                                    text-overflow: ellipsis;
                                }
                            }
                            .art{
                                font-size: 12px;
                                color: #6b6b6b;
                                display: flex;
                                
                                .sq{
                                    color: #d33939;
                                    border: 1px solid #d33939;
                                    padding: 0 5px;
                                    margin-right: 5px;
                                    border-radius: 5px;
                                    flex-shrink: 0;
                                }
                                .artList{
                                    width: 150px;
                                    display: flex;
                                    white-space:nowrap;
                                    overflow:hidden;
                                    text-overflow: ellipsis;
                                }
                            }
                        }
                        .video{
                            font-size: 12px;
                            color: rgb(252, 80, 80);
                            border: 1px solid rgb(252, 80, 80);
                            padding: 0 5px;
                            border-radius: 5px;
                           
                        }
                    }
                }
            ul::after{
                content: '';
                height: 0;
                display: block;
                clear: both;
            }
        }
    }
}

</style>