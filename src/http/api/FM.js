import service from '../index.js'
const fm = {
    //私人fm
    getFM(){
        return service({
            url:'/personal_fm',
            method:'get'
        })
    }
}
export default fm