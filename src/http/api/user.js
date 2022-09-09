import service from '../index.js'
const user = {
    // 用户详情
    getUser(id){
        return service({
            url: "/user/detail?uid="+id,
            method: "get",
        })
    },
    // 账号信息
    getAccount(){
        return service({
            url: "/user/account",
            method: "get",
        })
    },
    // 获取用户信息 , 歌单，收藏，mv, dj 数量
    getSubcount(){
        return service({
            url: "/user/subcount",
            method: "get",
        })
    },
    // 获取用户歌单
    getPlayList(id){
        return service({
            url: "/user/playlist?uid="+id,
            method: "get",
        })
    },
    getLevel(){
        return service({
            url: '/user/level',
            method: "get",
        })
    }
}
export default user