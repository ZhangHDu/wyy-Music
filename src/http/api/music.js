import service from '../index.js'
const music = { 
    // 检测扫码状态
    checkQR(key,timestamp){
        return service({
            url: '/login/qr/check?key='+key+'&timestamp='+timestamp,
            method: "get",
        })
    },
    // 获取音乐url
    getMusicUrl(id){
        return service({
            url: 'song/url?id='+id,
            method: "get",
        })
    },
}
export default music