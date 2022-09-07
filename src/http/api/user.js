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
    // 用户歌单
    getSubcount(){
        return service({
            url: "/user/subcount",
            method: "get",
        })
    }
}
export default user