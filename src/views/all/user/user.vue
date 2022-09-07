<template>
  <div class="user">
    <div class="userMsg">
        <div class="avatar"><img :src="profile.avatarUrl" alt=""></div>
        <div class="msg">
            <div class="msgTop">
                <div class="username">{{profile.nickname}}</div>
                <div class="others">
                    <div class="othersLeft">
                        <div class="level">Lv{{details.level}}</div>
                        <div class="sex" v-if="details.profile.gender ==1">男</div>
                        <div class='sex' v-else>女</div>
                    </div>
                    <div class="othersRight">
                        <div class="changeUser">编辑个人信息</div>
                    </div>
                </div>
            </div>
            <div class="msgBottom"></div>
        </div>
    </div>
    <div class="userCreate"></div>
    <div class="userStr"></div>
  </div>
</template>

<script>
import user from '../../../http/api/user'
export default {
    data(){
        return{
            account:{},
            profile:{},
            details:{}
        }
    },
    methods:{
        // 获取账号信息
        async getAccount(){
            const account = await user.getAccount()
            this.account = account.account
            this.profile = account.profile
            // 根据account中的uid获取用户详情
            this.getUser(this.account.id) 
        },
        // 获取用户详情
        async getUser(id){
            const details = await user.getUser(id)
            this.details = details
        }
    },
    created(){
        this.getAccount()
       
        
    },
}
</script>

<style lang='less' scoped>
.user{
    .userMsg{
        display: flex;
        // align-items: center;
        padding-top: 15px;
        .avatar{
            width: 200px;
            height: 200px;
            padding: 0 30px;
            img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }
        .msg{
            .msgTop{
                .username{
                    font-size: 25px;
                }
                .others{
                    display: flex;
                    .othersLeft{
                        display: flex;
                        align-items: center;
                        .level{
                            font-size: 12px;
                            padding: 0 7px;
                            background-color: red;
                            border-radius: 15px;
                        }
                        .sex{

                        }
                    }
                    .othersRight{

                    }
                }
            }
            .msgBottom{

            }
        }
    }
    .userCreate{

    }
    .userStr{

    }
}
</style>