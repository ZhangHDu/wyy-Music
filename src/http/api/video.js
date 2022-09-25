import service from '../index.js'
const video = {
    // 获取视频标签/分类下的视频
    getVideoGroup(){
        return service({
            url: '/video/group/list',
            method: "get",
        })
    },
    // 获取分类列表
    getVideoCategory(){
        return service({
            url: '/video/category/list',
            method: "get",
        })
    },
    // 获取全部视频列表
    getAllList(i){
        return service({
            url: '/video/timeline/all?offset='+i,
            method: "get",
        })
    },
    // 根据标签获取视频
    getVideo(id){
            return service({
                url:"/video/group?id="+id,
                method:"get"
            })
    },
    // 获取视频详情
    getVideoDetail(id){
        return service({
            url:"/video/detail?id="+id,
            method:"get"
        })
    },
    // 获取视频url
    getVideoUrl(id){
        return service({
            url:"/video/url?id="+id,
            method:"get"
        })
    },
    // 获取视频评论
    getVideoComments(id){
        return service({
            url:"/comment/video?id="+id,
            method:"get"
        })
    },
    // 获取相关视频
    getRelated(id){
        return service({
            url:"/related/allvideo?id="+id,
            method:"get"
        })
    }
}
export default video