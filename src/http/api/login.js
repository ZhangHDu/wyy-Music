import service from '../index.js'
const login = { 
     // 退出登录
    Logout(){
        return service({
            url: "/logout",
            method: "get",
        })
    },
    // 二维码key
    getQRKey(timestamp){
        return service({
            url: "/login/qr/key?timestamp="+timestamp,
            method: "get",
        })
    },
    // 生成二维码
    getQR(key){
        return service({
            url: "/login/qr/create?key="+key,
            method: "get",
        })
    },
    // 检测扫码状态
    checkQR(key,timestamp){
        return service({
            url: '/login/qr/check?key='+key+'&timestamp='+timestamp,
            method: "get",
        })
    },
}
export default login