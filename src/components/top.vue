<template>
  <div class="head">
         <div class="top">
          <div class="top-left">
            <div class="red"></div>
            <div class="yellow"></div>
            <div class="green"></div>
          </div>
          <div class="top-right">
            <div class="pre">
              <img src="../assets/images/上一页.png" alt="">
            </div>
            <div class="next">
              <img src="../assets/images/下一页.png" alt="">
            </div>
          </div>
        </div>
        <div class="title">
          <div class="aside">
            <router-link to="/Discover-music">
              <div class="recommend">个性推荐</div>
            </router-link>
            <router-link to="/playList">
                <div class="Playlist">歌单</div>
            </router-link>
            
            <div class="station">主播电台</div>
            <div class="rank">排行榜</div>
            <div class="singer">歌手</div>
            <div class="news">最新音乐</div>
          </div>
          <div class="base">
            <div class="search">
              <input type="text" value="孤勇者">
            </div>
            <div class="set">
              <div class="setbtn">
                  <img src="../assets/images/设置.png" alt="">
              </div>
               <div class="msg">
                     <img src="../assets/images/信息.png" alt="">
               </div>
              <div class="skill">
                    <img src="../assets/images/衣服.png" alt="">
              </div>
             
          </div>
          </div>
          
        </div>
  </div>
</template>

<script>
export default {
    props:['all'],
    created(){
       
    },
    watch:{
        
    }
}
</script>

<style scoped lang='less'>
.head{
    display: flex;
    width: 100%;
    // position: fixed;
    // top: 0;

    .top{
          height: 50px;
          width: 216px;
          background: #f24d37;
          display: flex;
          justify-content: space-between;
          .top-left{
            width: 216px;
            display: flex;
            margin-top: 10px;
            margin-left: 10px;
            div{
              margin-right: 5px;
            }
            .red{
              width: 15px;
              height: 15px;
              background-color: #ec7070;
              border-radius: 50%;
            }
            .yellow{
              width: 15px;
              height: 15px;
              background-color: rgb(241, 217, 78);
              border-radius: 50%;
            }
            .green{
              width: 15px;
              height: 15px;
              background-color: rgb(96, 212, 96);
              border-radius: 50%;
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
          background: #f56552;
          display: flex;
          justify-content: space-between;
          
          .aside{
            display: flex;
            align-items: center;
            font-size: 17px;
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
            .search{
            line-height: 50px;
            input{
              height: 25px;
              padding: 0;
              border: 0;
              border-radius: 12.5px;
              background: #fc9b8e;
              outline: none;
              padding-left: 20px;
              color: rgba(255, 255, 255, 0.742);
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