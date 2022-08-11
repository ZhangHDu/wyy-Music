<template>
 <div class="commentList" v-if="comments">
                            <!-- 评论 -->
                            <div class="comment" v-for="item in commentsList" :key="item.commentId">
                                <!-- 左侧头像 -->
                                <div class="left">
                                    <img :src="item.user.avatarUrl" alt="">
                                </div>
                                <!-- 右侧评论 -->
                                <div class="right">
                                    <!-- 评论 -->
                                    <div class="rightTop">
                                        <span class="name">{{item.user.nickname}}:&nbsp;</span>
                                        <span class="content">{{item.content}}</span>
                                    </div>
                                    <!-- 评论回复 -->
                                    <div class="rightMiddle" v-if="item.beReplied.length">
                                        <span class="RPname">@{{item.beReplied[0].user.nickname}}:</span>&nbsp;
                                        <span class="RPcontent">{{item.beReplied[0].content}}</span>
                                    </div>
                                    <!-- 评论时间以及点赞分享评论按钮 -->
                                    <div class="rightBottom">
                                        <!-- 发布时间 -->
                                        <div class="time">{{item.timeStr}}</div>
                                        <div class="btn">
                                            <!-- 举报 -->
                                            <div class="jb">举报</div>
                                            <!-- 点赞 -->
                                            <div class="dz">
                                                <img src="../assets/images/赞.png" alt="">
                                                <div class="likecount">
                                                    {{item.likedCount}}
                                                </div>
                                            </div>
                                            <!-- 分享 -->
                                            <div class="fx">
                                                <img src="../assets/images/分享2.png" alt="">
                                            </div>
                                            <!-- 评论 -->
                                            <div class="pl">
                                                <img src="../assets/images/评论.png" alt="">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                           
                        </div>
</template>

<script>
export default {
    name:'comments',
    props:['comments'],
    data(){
        return{
            commentsList:this.comments
        }
    },
    watch:{
        comments(){
            this.commentsList = this.comments
        }
    }
}
</script>

<style lang="less" scoped>
.commentList{
    .comment{
        display: flex;
        margin-bottom: 20px;
        .left{
            padding: 0 15px 15px 0;
            img{
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
        }
        .right{
            width: 709px;
            border-bottom: 1px solid rgba(161, 161, 161, 0.414);
            .rightTop{
                    font-size: 13px;
                    padding-bottom: 7px;
                    color: rgb(27, 27, 27);
                    .name{
                        color: rgb(102, 161, 225);
                        white-space: nowrap;
                        
                    }
            }
            .rightMiddle{
                font-size: 13px;
                background-color: rgba(230, 230, 230, 0.538);
                padding: 8px;
                border-radius: 6px;
                margin-bottom: 8px;
                .RPname{
                    color: rgb(102, 161, 225);
                    white-space: nowrap;
                    float: left;
                }
                .RPcontent{
                    color: rgb(120, 120, 120);
                }
            }
            .rightBottom{
                    font-size: 12px;
                    display: flex;
                    justify-content: space-between;
                    color: rgba(161, 161, 161, 0.805);
                    height: 20px;
                    line-height: 20px;
                    .time{
                        // margin-top: 7px;
                                
                    }
                    .btn{
                        display: flex;
                        div{
                            padding: 0 15px;
                            border-right: 1px solid rgba(214, 214, 214, 0.271);
                            img{
                                width: 15px;
                                height: 15px;
                                padding-right: 5px;
                            }
                        }
                        .dz{
                            display: flex;
                            .likecount{
                                 padding: 0;
                            }

                        }
                        .jb{
                            display: none;
                        }
                        .pl{
                            border: none;
                        }
                    }
            }
        }
    }
    .comment:hover{
                .right{
                    .rightBottom{
                                .btn{
                                    .jb{
                                        display: block;
                                    }
                                }
                    }
                }
    }
            }
</style>