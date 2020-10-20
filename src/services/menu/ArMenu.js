import request from '../index'
// load all
export function loadAllArMenu () {
  return request({
    url: '/api/v1/menu/armenu/list',
    method: 'GET'
  })
}
// Insert
export function insertArMenu (armenuObject) {
  return request({
    url: '/api/v1/menu/armenu/insert',
    method: 'POST',
    data: armenuObject
  })
}
// Update
export function updateArMenu (armenuId, formData) {
  return request({
    url: '/api/v1/menu/armenu/update/' + armenuId,
    method: 'PUT',
    data: formData
  })
}
// Delete
export function deleteArMenu (armenuId) {
  return request({
    url: '/api/v1/menu/armenu/delete/' + armenuId,
    method: 'DELETE'
  })
}
