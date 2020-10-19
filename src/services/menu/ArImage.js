import request from '../index'
// load all ArImage
export function loadAllArImage () {
  return request({
    url: '/api/v1/menu/arimage/list',
    method: 'GET'
  })
}
// Insert
export function insertArImage (arimageObject) {
  return request({
    url: '/api/v1/menu/arimage/insert',
    method: 'POST',
    data: arimageObject
  })
}
// Update Arimage
export function updateArimage (arimageId, formData) {
  return request({
    url: '/api/v1/menu/arimage/update/' + arimageId,
    method: 'PUT',
    data: formData
  })
}
// Delete Arimage
export function deleteArImage (arimageId) {
  return request({
    url: '/api/v1/menu/arimage/delete/' + arimageId,
    method: 'DELETE'
  })
}
