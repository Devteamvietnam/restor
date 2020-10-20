import request from '../index'
// load all
export function loadAllArVideo () {
  return request({
    url: '/api/v1/menu/arvideo/list',
    method: 'GET'
  })
}
// Insert
export function insertArVideo (arvideoObject) {
  return request({
    url: '/api/v1/menu/arvideo/insert',
    method: 'POST',
    data: arvideoObject
  })
}
// Update
export function updateArVideo (arvideoId, formData) {
  return request({
    url: '/api/v1/menu/arvideo/update/' + arvideoId,
    method: 'PUT',
    data: formData
  })
}
// Delete
export function deleteArVideo (arvideoId) {
  return request({
    url: '/api/v1/menu/arvideo/delete/' + arvideoId,
    method: 'DELETE'
  })
}
