import base from './base.js'
import axios from 'axios'
const api = {
    // 首页
    getHome(){
        return axios.get(base.host+'/homepage/block/page')
    },
    // 轮播图
    getBanners(){
        return axios.get(base.host+'/banner')
    },
    // 推荐歌单
    getDis(){
        return axios.get(base.host+'/personalized?limit=12')
    },
    // 独家放送
    getPersonalized(){
        return axios.get(base.host+'/personalized/privatecontent/list?limit=4')
    },
    // 推荐MV
    getDisMV(){
        return axios.get(base.host+'/personalized/mv')
    },
    // 最新音乐
    getNewMusic(){
        return axios.get(base.host+'/personalized/newsong?limit=10')
    },
    // 二维码key
    getQRKey(timestamp){
        return axios.get(base.host+'/login/qr/key?timestamp='+timestamp)
    },
    // 生成二维码
    getQR(key){
        return axios.get(base.host+'/login/qr/create?key='+key)
    },
    // 检测扫码状态
    checkQR(key,timestamp){
        return axios.get(base.host+'/login/qr/check?key='+key+'&timestamp='+timestamp)
    },
    // 获取音乐url
    getMusicUrl(id){
        return axios.get(base.host+'/song/url?id='+id)
    },
    // 私人FM
    getFM(){
        return axios.get(base.host+'/personal_fm')
    },
    // 退出登录
    Logout(){
        return axios.get(base.host+'/logout')
    },



    // 搜索
    Search(name){
       return axios.get(base.host+'/search?keywords='+name)
    }
}
export default api