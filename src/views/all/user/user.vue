<template>
  <div class="user">
    <div class="userMsg">
        <div class="avatar"><img :src="avatarUrl" alt=""></div>
        <div class="msg">
            <div class="msgTop">
                <div class="username">{{name}}</div>
                <div class="others">
                    <div class="othersLeft">
                        <div class="level">Lv{{user.levelData.level}}</div>
                        <div class="sex" v-if="detail.sex==1">
                            <img src="../../../assets/images/男.png" alt="" style="background-color: rgb(193, 249, 251);">
                        </div>
                        <div class='sex' v-else>
                            <img src="../../../assets/images/女.png" style="background-color:rgb(241, 195, 238);" alt="">
                        </div>
                    </div>
                    <div class="othersRight">
                        <div class="changeUser">编辑个人信息</div>
                    </div>
                </div>
            </div>
            <div class="msgBottom">
                <div class="nums">
                    <div class="num1">
                        <div class="numTop">{{detail.eventCount}}</div>
                        <div class="numBottom">动态</div>
                    </div>
                    <div class="num2">
                        <div class="numTop">{{detail.follows}}</div>
                        <div class="numBottom">关注</div>
                    </div>
                    <div class="num3">
                        <div class="numTop">{{detail.followeds}}</div>
                        <div class="numBottom">粉丝</div>
                    </div>
                </div>
                <ul>
                    <li>个人介绍：{{detail.description===''?'暂无介绍':detail.description}}</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="createTitle">
        <div class="cTleft">我创建的歌单 <div class="nums">({{detail.createdPlaylistCount}})</div></div>
       
        <div class="cTright"></div>
    </div>
    <div class="userCreate">
        <div class="playlist" v-for="item in detail.createPlaylist" :key="item.index" @click=toDetail(item.id)>
            <div class="avatar">
                <img :src="item.coverImgUrl" alt="">
            </div>
            <div class="name">{{item.name}}</div>
            <div class="nums">{{item.trackCount}}首</div>
        </div>
    </div>
    <div class="strTitle">
        我收藏的歌单 <div class="nums">({{detail.subPlaylistCount}})</div>
    </div>
    <div class="userStr">
        <div class="playlist" v-for="item in detail.subPlaylist" :key="item.index" @click=toDetail(item.id)>
            <div class="avatar">
                <img :src="item.coverImgUrl" alt="">
            </div>
            <div class="name">{{item.name}}</div>
            <div class="nums">{{item.trackCount}}首</div>
        </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
        return{
            detail:{}
        }
    },
    methods:{
        // 点击歌单跳转歌单详情
        toDetail(id){
            this.$router.push({ path: '/details', query: { id: id } })
        }
    },
    created(){
       this.detail = this.user
        
    },
    computed:{
        ...mapState(['user','name','avatarUrl'])
    }
}
</script>

<style lang='less' scoped>
.user{
    overflow-y: scroll;
    overflow-x: scroll;
    height: 610px;
    padding: 0 30px;
    
    .userMsg{
        display: flex;
        // align-items: center;
        padding-top: 15px;
        padding-bottom: 40px;
        .avatar{
            width: 200px;
            height: 200px;
            padding-right: 30px;
            img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }
        .msg{
            .msgTop{
                width: 514px;
                padding-bottom: 10px;
                box-sizing: border-box;
                border-bottom: 1px solid #e5e5e5;
                .username{
                    font-size: 25px;
                }
                .others{
                    display: flex;
                    justify-content: space-between;
                    .othersLeft{
                        display: flex;
                        align-items: center;
                        .level{
                            font-size: 12px;
                            padding: 0 7px;
                            background-color: rgb(240, 240, 240);
                            border-radius: 15px;
                            margin-right: 5px;
                        }
                        .sex{
                            width: 12px;
                            height: 12px;
                            display: flex;
                            align-items: center;
                            img{
                                width:100%;
                                height:100%;
                                padding: 2px;
                                
                                border-radius: 50%;
                            }
                        }
                    }
                    .othersRight{
                        border:1px solid #cdcdcd;
                        padding: 5px 15px;
                        border-radius: 15px;
                        .changeUser{
                            font-size: 13px;
                            color: #5f5f5f;
                        }
                    }
                    .othersRight:hover{
                            background-color:rgba(33, 33, 33, .1);
                            .changeUser{
                                color:rgb(47, 47, 47);
                            }
                        }
                }
            }
            .msgBottom{
                padding-top: 20px;
                .nums{
                    display: flex;
                    .num1,.num2,.num3{
                        .numTop{
                            text-align: center;
                        }
                        .numBottom{
                            font-size: 12px;
                            color: #5f5f5f;
                            
                        }
                    }
                    .num1{
                        padding-right: 30px;
                    }
                    .num2{
                        padding: 0 30px;
                        border-left: 1px solid #e5e5e5;
                        border-right: 1px solid #e5e5e5;
                    }
                    .num3{
                        padding-left: 30px;
                    }
                    
                }
                ul{
                    padding-top: 5px;
                    li{
                        font-size: 12px;
                        color: #5f5f5f;
                        padding: 3px 0;
                    }
                }
            }
        }
    }
    .createTitle{
        display:flex;
        .cTleft{
            display:flex;
            .nums{
                font-size: 12px;
                color: #7b7b7b;
                margin-top: 5px;
                padding-left: 5px;
            }
        }
    }
    .userCreate,.userStr{
        padding-top: 20px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        .playlist{
            width: 150px;
            padding-bottom: 40px;
            .avatar{
                img{
                    width: 150px;
                    height: 150px;
                    border-radius: 5px;
                }
            }
            .name{
                font-size: 12px;
                line-height: 20px;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp:2;
                -webkit-box-orient:vertical;
                overflow: hidden;
                color: #2a2a2a;
            }
            .nums{
                font-size: 12px;
                color: #5f5f5f;
            }
        }
    }
    .strTitle{
        display:flex;
        .nums{
                font-size: 12px;
                color: #7b7b7b;
                margin-top: 5px;
                padding-left: 5px;
            }
    }
}
</style>