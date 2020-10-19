import request from '../index'
//---------------------------------Load--------------------------------------//
//load slider
export function loadAllSlider() {
    return request({
        url: '/api/v1/menu/slider/',
        method: 'get'
    })
}
// insert slider
export function insertSlider(sliderObj){
    return request({
        url:'/api/v1/menu/insertslider/',
        method:'post',
        data:sliderObj
    })
}
//update slider
export function updateSlider(idupdate, setupdateslider) {
    return request({
        url: '/api/v1/menu/updateslider/' + idupdate,
        method: 'put',
        data: setupdateslider
    })
}
//delete slider
export function deleteSlider(sliderId) {
    return request({
        url: '/api/v1/menu/deleteslider/' + sliderId,
        method: 'delete',
    })
}