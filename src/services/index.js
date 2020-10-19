import axios from 'axios'
import { Loading, LocalStorage } from 'quasar'

const loadFunction = config => {
  Loading.show()
  return config
}
const finishFunction = response => {
  Loading.hide()
  return response
}
const errorFunction = error => {
  Loading.hide()
  return Promise.reject(error)
}

const service = axios.create({
  // baseURL: process.env.API, // api base_url
  baseURL: 'http://localhost:8080',
  timeout: 20000, // request timeout
  headers: {
    Authorization: 'Bearer ' + LocalStorage.getItem('LocalAccessToken')
  }
})

service.interceptors.request.use(loadFunction)
service.interceptors.response.use(finishFunction, errorFunction)

export default service
