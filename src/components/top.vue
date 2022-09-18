<template>
  <div class="head">
         <div class="top">
          <div class="top-left">
            <div class="red"></div>
            <div class="yellow"></div>
            <div class="green"></div>
          </div>
          <div class="top-right">
            <div class="pre" @click="preRouter">
              <img src="../assets/images/上一页.png" alt="">
            </div>
            <div class="next" @click="nextRouter">
              <img src="../assets/images/下一页.png" alt="">
            </div>
          </div>
        </div>
        <div class="title" >
          <div class="aside" v-if="routePath === '/Discover-music'">
            <router-link to="/Discover-music">
              <div class="recommend">个性推荐</div>
            </router-link>
            <router-link to="/playList">
                <div class="Playlist">歌单</div>
            </router-link>
            <router-link to="/station">
              <div class="station">主播电台</div>
            </router-link>
            <div class="rank">排行榜</div>
            <div class="singer">歌手</div>
            <div class="news">最新音乐</div>
          </div>
          <div class="aside" v-if="routePath === '/video'">
            <div class="video">视频</div>
            <div class="mv">MV</div>
          </div>
          <div class="aside" v-else></div>
          <div class="base">
            <div class="search">
              <input type="text" value="孤勇者" :style="changeStyle">
            </div>
            <div class="set" v-if="!topStyle">
              <div class="setbtn">
                  <img src="../assets/images/设置白.png" alt="">
              </div>
               <!-- <div class="msg">
                     <img src="../assets/images/邮件白.png" alt="">
               </div>
              <div class="skill">
                    <img src="../assets/images/衣服白.png" alt="">
              </div> -->
          </div>
           <div class="set" v-if="topStyle">
              <div class="setbtn">
                  <img src="../assets/images/设置黑.png" alt="">
              </div>
               <!-- <div class="msg">
                     <img src="../assets/images/邮件黑.png" alt="">
               </div>
              <div class="skill">
                    <img src="../assets/images/衣服黑.png" alt="">
              </div> -->
          </div>
          </div>
          
        </div>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default { 
    data(){
      return{
        changeStyle:'background: rgb(221, 109, 94);color:rgba(255, 255, 255, 0.742);', //搜索框样式
        setStyle:'',
        routePath:'/Discover-music'
      }
    },
    props:['all'],
    methods:{
      ...mapMutations(['changeTopStyle']),
      preRouter(){
        this.$router.go(-1)
      },
      nextRouter(){
        this.$router.go(1)
      }
    },
    created(){
       this.changeTopStyle(false)
    },
    watch:{
      topStyle(){
        if(this.topStyle){
          // 白色
          setTimeout(()=>{
            this.changeStyle = "background:rgb(230, 232, 232);color: #2c2c2c;"
          },350)
        }else{
          // 红色
          this.changeStyle = "background: rgb(221, 109, 94);color: rgba(255, 255, 255, 0.742);"
        }
      },
      $route(){
        if(this.$route.path == '/Discover-music'){
          this.routePath = '/Discover-music'
        }else if(this.$route.path == '/video'){
          this.routePath = '/video'
        }else{
          this.routePath = 'none'
        }
      }
    },
    computed:{
      ...mapState(['topStyle'])
    },
}
</script>

<style scoped lang='less'>
.head{
    display: flex;
    width: 100%;
    .top{
          height: 50px;
          width: 196px;
          background: #da5948;
          display: flex;
          justify-content: space-between;
          .top-left{
            width: 196px;
            display: flex;
            margin-top: 10px;
            margin-left: 10px;
            position: relative;
            div{
              position: absolute;
              z-index: 9999;
              width: 12px;
              height: 12px;
              border-radius: 50%;
            }
            .red{
              background-color: #ec7070;
            }
            .yellow{
              background-color: rgb(241, 217, 78);
              left: 20px;
            }
            .green{
              background-color: rgb(96, 212, 96);
              left: 40px;
            }
          }
          .top-right{
            display: flex;
            align-self: flex-end;
            margin-bottom: 5px;
            img{
              width: 20px;
            }
            img:hover{
              background-color: #fb5b46;
              border-radius: 50%;
            }
            .pre{
              margin-right: 15px;
            }
          }
        }
         .title{
          width: 100%;
          height: 50px;
          
          background: #d75341;
          display: flex;
          justify-content: space-between;
          .aside{
            display: flex;
            align-items: center;
            font-size: 14px;
            margin-left: 10px;
            color: rgba(255, 255, 255, 0.742);
            a{
               color: rgba(255, 255, 255, 0.742);
            }
            div{
              height: 25px;
              line-height: 25px;
              margin: 0 10px;
            }
            div:hover{
              color: #fff;
            }
          }
          .base{
            display: flex;
            position: absolute;
            right: 0;
            z-index: 9999;
            .search{
            line-height: 50px;
            input{
              height: 25px;
              padding: 0;
              border: 0;
              border-radius: 12.5px;
              font-size: 12px;
              outline: none;
              padding-left: 20px;
              // background: #fc9b8e;
              // color: rgba(255, 255, 255, 0.742);
            }
          }
          .set{
              display: flex;
              align-items: center;
              margin-right: 10px;
              div{
                  margin: 0 10px;
                  width: 30px;
                  height: 30px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
              }
              div:hover{
                  border-radius: 15px;
                  background-color: #d04f3e;
              }
              img{
                 width: 20px;
             }
          }
          }
        }
}

</style>