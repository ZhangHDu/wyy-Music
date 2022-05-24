<template>
  <div class="FM">
      <div class="song">
        <div class="songLeft">
          <div class="pic"></div>
          <div class="icon">

          </div>
        </div>
        <div class="songRight">
          <div class="top"></div>
          <div class="lyrics"></div>
        </div>
      </div>
  </div>
</template>

<script>
import api from '../../api/index.js'
export default {
  data(){
    return{
      songMsg:[]
    }
  },
  created(){
    api.getFM().then(res=>{
      console.log(res);
      // this.songMsg = res.data.data[0]
    })
  }
}
</script>

<style>

</style>