<template>
  <div class="isplay">
      <header>
          <div class="close"></div>
          <div class="title">替换播放列表</div>
      </header>
      <main>
          <div class="msg">“双击播放”会用当前列表的音乐替换播放列表，是否继续？（可在设置-常规中更改）</div>
          <div class="checkbox">不再提醒</div>
      </main>
      <footer>
          <div class="btn">继续</div>
      </footer>
  </div>
</template>

<script>
export default {
    
}
</script>

<style lang='less' scoped>
.isplay{
    width: 50%;
    height: 300px;
    border: 1px solid #000;
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 9999;
    background-color: #fff;
    border-radius: 15px;
}
</style>