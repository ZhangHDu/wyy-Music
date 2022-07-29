<template>
  <div class="login">
     <div class="top">
         <!-- 关闭当前组件 -->
         <div class="left" @click="closeLogin">
             <img src="../assets/images/close.png" alt="">
         </div>
         <!-- 切换扫码页面 -->
         <div class="right" v-show="isOther" >
             <img @click="toQR" src="../assets/images/二维码.png" alt="">
         </div>
     </div>
     <main v-show="!isOther">
         <div class="QR">
            <p>扫码登陆</p>
            <!-- 二维码加载中 -->
             <div class="loading" v-if="QRcode == false">
                <div class="loadingQR"></div>
            </div>
            <!-- 二维码 -->
            <img :src="QRcode" alt="" v-if="!this.user.avatarUrl">
            <!-- 扫码成功显示头像以及昵称 -->
            <div class="loading" v-if="this.user.avatarUrl">
                <div class="loadingQR">
                    <img :src="this.user.avatarUrl" alt="" style="width:100%;">
                </div>
            </div>
            <p v-show="this.user.avatarUrl">{{this.user.name}}</p>
            <!-- 超时显示重新加载 -->
            <div class="QRout" v-if="!QRtype">
                <p>二维码已过期</p>
                <div class='getQR' @click="getQRKey">点击刷新</div>
            </div>
            <!-- 扫码后隐藏 -->
            <p v-show="!this.user.avatarUrl">使用<span style="color:#0081CF" >网页云音乐APP</span>扫码登录</p>
        </div>
        <!-- 扫码后隐藏 -->
        <div class="toOthers" @click="toOther" v-show="!this.user.avatarUrl">
            <p class="other">选择其他登录模式></p>
         </div>
     </main>
     <main v-show="isOther">
         123
     </main>
     <div class="other" v-show="isOther">
         <div class="img" ></div>
         <div class="input"></div>
         <div class="logBtn"></div>
         <div class="regBtn"></div>
         <div class="icon"></div>
         <div class="msg"></div>
     </div>
  </div>
</template>

<script>
import login from '../http/api/login' //引入接口
import jrQrcode from 'jr-qrcode' //引入二维码转换插件
import {mapMutations,mapState} from 'vuex'
export default {
    props:['value'],
    data(){
        return{
           isShow:false,//是否显示登录页
           isOther:false,//其他登陆模式
           QRcode:'',//二维码
           QRtype:true,//扫码状态
           user:{
               name:null,
               avatarUrl:null,
               cookie:null
           }
        }
    },
    methods:{
        ...mapMutations(['getName','getCookie','getAvatarUrl']),//获取修改vue的方法
        // 点击关闭登陆框
        closeLogin(){
            this.isShow = false; //不显示登录页
            this.isOther = false; //不显示其他登录模式页
            this.$emit('input',false);//告知父组件关闭登录页
            // 结束请求
        },
        // 切换其他登录模式
        toOther(){
            this.isOther = !this.isOther  
        },
        // 切换扫码登录
        toQR(){
            this.isOther = !this.isOther
            // 切换回去记得重新获取二维码
            this.getQRKey()
        },
        // 获取二维码key
        async getQRKey(){
            this.isShow = true
            this.QRcode = '' //先清空二维码再请求
            
            let nowtime= Date.now()
            login.getQRKey(nowtime).then(res=>{
                let key = res.data.unikey
                this.getQR(key)
                // 检测扫码状态
                this.checkQR(key)
            })
            this.QRtype = true //等待扫码
        },
        // 生成二维码
        getQR(key){
            login.getQR(key).then(res => {
                const options = {
                    padding       : 10,   // 二维码四边空白（默认为10px）
                    width         : 160,  // 二维码图片宽度（默认为256px）
                    height        : 160,  // 二维码图片高度（默认为256px）
                    // correctLevel  : QRErrorCorrectLevel.H,    // 二维码容错level（默认为高）
                    reverse       : false,        // 反色二维码，二维码颜色为上层容器的背景颜色
                    background    : "#ffffff",    // 二维码背景颜色（默认白色）
                    foreground    : "#000000"     // 二维码颜色（默认黑色）
                }
                this.QRcode = jrQrcode.getQrBase64(res.data.qrurl, options)
                
            })
        },
        // 检查扫码状态
        checkQR(key){
            let check = setInterval(async ()=>{
                const timer = Date.now() //获取调用时间
                await login.checkQR(key,timer).then(res=>{
                console.log(res);
                if(res.code == 800){
                    // 超时修改扫码状态
                    this.QRtype = false
                    this.user.name = null
                    this.user.avatarUrl = null
                    clearInterval(check)
                }else if(res.code == 802){
                    this.user.name = res.nickname
                    this.user.avatarUrl = res.avatarUrl
                    // 缓存头像以及昵称
                    this.getName(res.nickname)
                    this.getAvatarUrl(res.avatarUrl)
                    // this.user.cookie = res.data.cookie
                }else if(res.code == 803){
                    // 提示框，提示登录成功
                    
                    // 关闭登录框
                    this.closeLogin()
                    this.getCookie(res.cookie)
                    clearInterval(check)
                }else if(this.isShow === false||this.isOther === true){
                    // 不显示二维码时清除定时器
                    clearInterval(check)
                }
                
            })
            },3000)
            
        }
    },
    watch:{
        value(){
            this.isShow = this.value
        }
    },
    computed:{
        ...mapState(['name','avatarUrl','cookie']),
    },
    created(){
        // 获取二维码的key
        this.getQRKey()
    },
}
</script>

<style scoped lang="less">
.login{
    width: 350px;
    height: 520px;
    background: white;
    box-shadow: 5px 5px 15px rgb(167, 167, 167) ;
    border-radius: 15px;
    position: fixed;
    top: 50px;
    left: 130px;
    z-index: 9999;
    .top{
        display: flex;
        justify-content: space-between;
        .left{
            img{
                width: 15px;
                margin: 10px;
            }
        }
        .right{
            
            img{
                border-top-right-radius: 15px;
                width: 60px;
                background: rgb(235, 235, 235);
            }
        }
    }
   main{
       margin-top: 50px;
       text-align: center;
       font-size: 14px;
        .QR{
        margin-bottom: 100px;
        p:first-child{
            font-size: 26px;
            margin-bottom: 18px;
        }
        img{
            margin-bottom: 10px;
        }
        .QRout{
            width: 140px;
            height: 140px;
            background: rgba(0, 0, 0, 0.631);
            position: absolute;
            top: 155px;
            left: 105px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            flex-direction: column;
            color: #fff;
            p{
                font-size: 16px;
                margin-top: 30px;
            }
            .getQR{  
                font-size: 14px;
                border-radius: 15px;
                background: rgb(228, 78, 78);
                padding: 5px 10px;

            }
        }
        .loading{
            display: flex;
            justify-content: center;
            align-items: center;
            .loadingQR{
                width: 160px;
                height: 160px;
                background: rgb(236, 236, 236);
            }
        }
    }
        .toOthers{
            font-size: 14px;
            color: rgb(131, 131, 131);
        }
   }
   
}
</style>