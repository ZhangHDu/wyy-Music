<template>
  <div class="isplay">
      <header>
          <div class="close">
              <img src="../assets/images/close.png" alt="">
          </div>
          <div class="title">替换播放列表</div>
      </header>
      <main>
          <div class="msg">“双击播放”会用当前列表的音乐替换播放列表，是否继续？（可在设置-常规中更改）</div>
          <div class="checkbox">
              <input type="checkbox">
              不再提醒</div>
      </main>
      <footer>
          <div class="btn">继&nbsp;续</div>
      </footer>
  </div>
</template>

<script>
export default {
    
}
</script>

<style lang='less' scoped>
.isplay{
    width: 30%;
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 9999;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 5px 5px 5px #0000002d;
    header{
        display: flex;
        .close{
            padding: 10px;
            img{
                width: 20px;
                height: 20px;
            }
        }
        .title{
            padding: 10px 0;
            width: 100%;
            text-align: center;
            margin-left: -40px;
            font-weight: 600;
        }
    }
    main{
        width: 75%;
        margin: 0 auto;
        font-size: 14px;
        padding-top: 30px;
        .msg{}
        .checkbox{
            font-size: 12px;
            padding-top: 30px;
            height: 20px;
            line-height: 20px;
            display: flex;
            color: #5b5b5b;
            input{
               margin-right: 5px;
               display: block;
            }
        }
    }
    footer{
        font-size: 14px;
        .btn{
            margin: 30px auto;
            width: 9%;
            text-align: center;
            padding: 5px 20px;
            color: #fff;
            background-color: #f24d37;
            border-radius: 29px;
            
        }
    }
}
</style>