import service from '../index.js'
const music = { 
    // 获取音乐url
    getMusicUrl(id){
        return service({
            url: 'song/url?id='+id,
            method: "get",
        })
    },
    // 相似音乐
    simi(id){
        return service({
            url: '/simi/song?id='+id,
            method: "get",
        })
    },
    // 相似歌单
    simiList(id){
        return service({
            url: '/simi/playlist?id='+id,
            method: "get",
        })
    },
    // 歌曲评论
    comment(id){
        return service({
            url: '/comment/music?id='+id,
            method: "get",
        })
    },
    // 歌词
    lyric(id){
        return service({
            url: '/lyric?id='+id,
            method: "get",
        })
    },
}
export default music