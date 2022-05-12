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
              <div class="DisBox" v-for="item in discover" :key="item.index">
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
                <ul >
                    <li v-for="item in newMusic" :key="item.index">
                        <div class="left">
                            <img :src="item.picUrl" alt="">
                            <div class="song">
                                <div class="name">{{item.name}}</div>
                                <!-- <div class="art">{{item.song.artisits[0].name}}</div> -->
                            </div>
                        </div>
                        <div class="right"></div>
                    </li>
                </ul>
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
  </div>
</template>

<script>
import api from '../../api/index.js'
export default {
    data(){
        return{
            banners:[{},{},{}],
            discover:[],
            personalized:[],
            DisMV:[],
            newMusic:[]
        }
    },
    methods:{
        // 获取轮播图
        getBanner(){
            api.getBanners().then(res=>{
                this.banners = res.data.banners
            })
        },
        // 获取首页数据
        getDiscover(){
            api.getHome().then(res=>{
                this.discover = res.data.data.blocks[1].creatives
            })
        },
        // 获取推荐歌单
        getDis(){
            api.getDis().then(res=>{
                this.discover = res.data.result
            })
        },
        // 独家放送
        getPersonalized(){
            api.getPersonalized().then(res=>{
                this.personalized = res.data.result
            })
        },
        // 推荐MV
        getDisMV(){
            api.getDisMV().then(res=>{
                this.DisMV = res.data.result
            })
        },
        // 最新音乐
        getNewMusic(){
            api.getNewMusic().then(res=>{
                this.newMusic = res.data.result
                console.log(this.newMusic[0].song.artists[0].name);
            })
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
    }
}
</script>

<style scoped lang="less">
.Discover-music{
    height: 90vh;
    overflow-y: scroll;
    // 轮播图
    .swiper{
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
        }
        img{
            width: 15px;
            height: 15px;
        }
        .playList{
            width: 100%;
            overflow: hidden;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            font-size: 14px;
            margin-bottom: 20px;
            .DisBox{
                width: 170px;
                position: relative;
                margin-bottom: 50px;
                img{
                    width: 100%;
                    height: 170px;
                    border-radius: 10px;
                }
                p{
                    overflow:hidden; // 超出隐藏
                    text-overflow:ellipsis;//当文本溢出时显示（...）
                    display:-webkit-box; // 将对象作为弹性伸缩盒子模型显示
                    -webkit-line-clamp:2; //2行文本隐藏
                    -webkit-box-orient:vertical; //定义排列方式
                }
                .icon{
                    width: 170px;
                    height: 170px;
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
        }
        img{
            width: 15px;
            height: 15px;
            border-radius: 15px;
        }
        .videoList{
            display: flex;
            justify-content: space-between;
            .video{
                width: 250px;
                position: relative;
                img{
                    width: 250px;
                    height: 150px;
                }
                p{
                    overflow:hidden; // 超出隐藏
                    text-overflow:ellipsis;//当文本溢出时显示（...）
                    display:-webkit-box; // 将对象作为弹性伸缩盒子模型显示
                    -webkit-line-clamp:2; //2行文本隐藏
                    -webkit-box-orient:vertical; //定义排列方式
                }
                .icon{
                    width: 250px;
                    height: 150px;
                    position: absolute;
                    img{
                        position: absolute;
                        width: 35px;
                        height: 35px;
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
        }
        img{
            width: 15px;
            height: 15px;
        }
        .MVList{
            display: flex;
            justify-content: space-between;
            .MV{
                width: 250px;
                position: relative;
                overflow: hidden;
                img{
                    width: 250px;
                    height: 150px;
                    border-radius: 5px;
                }
                p{
                    overflow:hidden; // 超出隐藏
                    text-overflow:ellipsis;//当文本溢出时显示（...）
                    display:-webkit-box; // 将对象作为弹性伸缩盒子模型显示
                    -webkit-line-clamp:2; //2行文本隐藏
                    -webkit-box-orient:vertical; //定义排列方式
                }
                .art{
                    color: #727272;
                    font-size: 14px;
                }
                .count{
                    color: #fff;
                    position: absolute;
                    top:0;
                    right: 0;
                    display: flex;
                    font-size: 14px;
                    margin: 5px;
                    font-weight: bolder;
                    img{
                        width: 16px;
                        height: 16px;
                    }
                }
                .disMsg{
                    width:235px;
                    height: 25px;
                    position: absolute;
                    top: -25px;
                    padding-left: 15px;
                    font-size: 18px;
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
        margin: 0 20px 50px 10px;
        a{
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }
        p{
            margin-left: 10px;
        }
        img{
            width: 15px;
            height: 15px;
        }
        .newMusicList{
            width:100%;
            ul{
                li:hover{
                    background: #cfcfcf59;
                    border-radius:10px;
                }
                li{
                    width: 98%;
                    font-size: 14px;
                    padding: 0 10px;
                    
                    .left{
                        border-bottom: 1px solid rgb(224, 224, 224);
                        display: flex;
                        align-items: center;
                        padding: 10px 0;
                        img{
                            width: 60px;
                            height: 60px;
                            border-radius: 8px;
                        }
                        .song{
                            margin-left: 30px;
                        }
                    }
                }
                
            }
        }
    }
}

</style>