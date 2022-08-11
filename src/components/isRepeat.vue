<template>
  <div class="isRepeat">
    <div class="IRtop">
        <div class="close">
            <img src="../assets/images/close.png" alt="">
        </div>
        <div class="title">替换播放列表</div>
    </div>
    <div class="IRmiddle">
        <div class="tips">"播放全部"将会替换当前的播放列表，是否继续？
             <div class="check">
            <input type="checkbox" name="" id="">
            不再提醒
        </div>
        </div>
       
    </div>
    <div class="IRbottom">
        <div class="IRbtn" @click="repeat">继&nbsp;续</div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
    name:"isRepeat",
    data(){
        return{
            isShow:this.value
        }
    },
    props:['value','nowplay'],
    methods:{
        ...mapMutations(['changeNowPlay']),
        repeat(){
            this.$emit('input',this.isShow = false)
            this.changeNowPlay(this.nowplay)
        }
    },
    mounted(){
       
    }
}
</script>

<style lang='less'>
.isRepeat{
    width: 60%;
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 9999;
    background-color: #fff;
    border-radius: 7px;
    box-shadow: 0px 0px 10px #0000002d;
    box-sizing: border-box;
    padding: 10px;
    .IRtop{
        display: flex;
        align-items: center;
        padding-bottom: 35px;
        .close{
            img{
                width: 22px;
                height: 22px;
            }
        }
        .title{
            width: 100%;
            text-align: center;
        }
    }
    .IRmiddle{
        display: flex;
        justify-content: center;
        padding-bottom: 20px;
        .tips{
            font-size: 14px;
            .check{
            display: flex;
            align-items: center;
            padding-top: 20px;
            font-size: 12px;
            color: rgb(113, 113, 113);
            input{ 
                display: block;
            }
        }
        }
        
    }
    .IRbottom{
        display: flex;
        justify-content: center;
        padding-bottom: 15px;
        .IRbtn{
            font-size: 14px;
            color: #fff;
            background: red;
            padding: 5px 25px;
            border-radius: 20px;
        }
    }
}
</style>