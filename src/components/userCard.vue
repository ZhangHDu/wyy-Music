<template>
  <div class="userCard">
      <header>
          <div class="top">
              <a href="#">
                <nav>
                  <div class="num">1</div>
                  <div class="name">动态</div>
                </nav>
              </a>
            
              <nav>
                   <div class="num">9</div>
                  <div class="name">关注</div>
              </nav>
              <nav>
                   <div class="num">3</div>
                  <div class="name">粉丝</div>
              </nav>
          </div>
          <div class="bottom">
              <div class="btn">
                  签到
              </div>
          </div>
      </header>
      <div class="vip">
          <div class="vipCenter">
              <img src="../assets/images/3.1 会员.png" alt="">
              <p>会员中心</p>
          </div>
          <div class="level">
              <img src="../assets/images/勋章.png" alt="">
              <p>等级</p>
          </div>
          <div class="shop">
              <img src="../assets/images/购物车.png" alt="">
              <p>商城</p>
          </div>
      </div>
      <div class="set">
          <div class="person">
              <img src="../assets/images/设置 (1).png" alt="">
              <p>个人信息设置</p>
          </div>
          <div class="phone">
              <img src="../assets/images/手机.png" alt="">
              <p>绑定社交账号</p>
          </div>
      </div>
      <footer>
          <img src="../assets/images/关机.png" alt="">
          <p>退出登录</p>
      </footer>
  </div>
</template>

<script>
export default {
    props:['value'],
    methods:{
    },
    mounted(){
       
    }
}
</script>

<style scoped lang="less">
.userCard{
    // width: 310px;
    // height: 350px;
    background-color: #fff;
    position: fixed;
    top: 55px;
    left: 205px;
    z-index: 9999;
    box-shadow: 4px 4px 15px rgba(77, 77, 77, 0.515);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    img{
        width: 20px;
        height: 20px;
        padding-right: 10px;
        padding-left: 25px;
    }
    header{
        width: 100%;
        .top{
            display: flex;
            justify-content: space-between;
            margin: 20px 10px;
            nav{
                padding: 0 30px;
                border-left: 1px solid rgb(219, 219, 219);
                .num{
                font-size: 30px;
                text-align: center;
            }
                .name{
                font-size: 12px;
                color: rgb(132, 132, 132);
            }
            }
            nav:first-child{
                border: none;
            }
            nav:hover{
                .name{
                    color: rgb(68, 68, 68);
                }
            }
           
        }
        .bottom{
            width: 100%;
            display: flex;
            justify-content: center;
            font-size: 13px;
            color: rgb(95, 95, 95);
            margin-bottom: 12px;
            .btn{
                border: 1px solid rgb(95, 95, 95);
                width: 80px;
                padding: 5px 0;
                border-radius: 15px;
                text-align: center;
            }
        }
    }
    .vip,.set,footer{
         border-top: 1px solid rgb(199, 199, 199);
         font-size: 14px;
        //  padding-left: 25px;
         color: #5d5d5d;
    }
    .vip{
       .vipCenter,.shop,.level{
           display: flex;
           padding: 5px 0;
           width: 100%;
       }
       .vipCenter:hover{
            background-color: rgb(238, 238, 238);
       }
       .shop:hover{
            background-color: rgb(238, 238, 238);
       }
       .level:hover{
            background-color: rgb(238, 238, 238);
       }
    }
    .set{
        .person,.phone{
            display: flex;
            padding: 5px 0;
            width: 100%;
        }
        .person:hover{
            background-color: rgb(238, 238, 238);
        }
        .phone:hover{
            background-color: rgb(238, 238, 238);
        }
    }
    footer{
        display: flex;
        padding: 10px 0;
        width: 100%;
       
    }
    footer:hover{
            background-color: rgb(238, 238, 238);
            border-bottom-right-radius: 5px;
             border-bottom-left-radius: 5px;
        }
}
</style>