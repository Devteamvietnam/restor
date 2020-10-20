import request from '../index'
//---------------------------------Load--------------------------------------//
//load product
export function loadAllProduct() {
    return request({
        url: '/api/v1/menu/product/',
        method: 'get'
    })
}
// insert product
export function insertProduct(productObj){
    return request({
        url:'/api/v1/menu/insertproduct/',
        method:'post',
        data:productObj
    })
}
//update product
export function updateProduct(idupdate, setupdateproduct) {
    return request({
        url: '/api/v1/menu/updateproduct/' + idupdate,
        method: 'put',
        data: setupdateproduct
    })
}
//delete product
export function deleteProduct(productId) {
    return request({
        url: '/api/v1/menu/deleteproduct/' + productId,
        method: 'delete',
    })
}