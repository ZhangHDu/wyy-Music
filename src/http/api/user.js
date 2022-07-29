import service from '../index.js'
const user = {
    // // 获取音乐url
    // getMusicUrl(id){
    //     return axios.get(base.host+'/song/url?id='+id)
    // },
    // // 私人FM
    // getFM(){
    //     return axios.get(base.host+'/personal_fm')
    // },
    // // 退出登录
    // Logout(){
    //     return axios.get(base.host+'/logout')
    // },
    // 用户详情
    getUser(id){
        return service({
            url: "/user/detail?uid="+id,
            method: "get",
        })
    },

    // // 搜索
    // Search(name){
    //    return axios.get(base.host+'/search?keywords='+name)
    // }
}
export default user