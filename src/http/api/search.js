import service from '../index.js'
const search = { 
     // 退出登录
    hotSearch(){
        return service({
            url: "/search/hot/detail",
            method: "get",
        })
    },
}
export default search