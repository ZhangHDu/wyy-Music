import service from '../index.js'
const detail = { 
    // 歌单详情
    getDetails(id){
        return service({
            url: "/playlist/detail?id="+id,
            method: "get",
        })
    },
     // 歌单所有歌曲
     getDetailsSong(id){
        return service({
            url: "/playlist/track/all?id="+id,
            method: "get",
        })
    },
    // 歌单评论
    getDetailsComment(id){
        return service({
            url: "/comment/playlist?id="+id,
            method: "get",
        })
    },
    getSubscribers(id){
        return service({
            url: "/playlist/subscribers?id="+id+"&limit=30",
            method: "get",
        })
    }
}
export default detail