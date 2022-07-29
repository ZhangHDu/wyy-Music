import service from '../index.js'
 const home = { 
    // 获取首页数据
    getHome (){
        return service({
            url: "/homepage/block/page",
            method: "get",
        })
    },
    // 获取轮播图
    getBanners(){
        return service({
            url: "/banner",
            method: "get",
        })
    },  
    // 推荐歌单
    getDis(){
        return service({
            url: "/personalized?limit=10",
            method: "get",
        })
    },
     // 独家放送
     getPersonalized(){
        return service({
            url: "/personalized/privatecontent/list?limit=4",
            method: "get",
        })
    },
    // 推荐MV
    getDisMV(){
        return service({
            url: "/personalized/mv",
            method: "get",
        })
    },
    // 最新音乐
    getNewMusic(){
        return service({
            url: "/personalized/newsong?limit=10",
            method: "get",
        })
    },
}
export default home