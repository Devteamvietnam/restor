import axios from 'axios'
import { LocalStorage } from 'quasar'
const API_URL = 'http://localhost:8080'

class AuthService {
  login (user) {
    return axios
      .post(API_URL + '/api/v1/user/signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          LocalStorage.set('user', JSON.stringify(response.data))
          LocalStorage.set('LocalAccessToken', response.data.accessToken)
        }

        return response.data
      })
  }

  logout () {
    localStorage.removeItem('user')
    localStorage.removeItem('LocalAccessToken')
  }

  register (user) {
    return axios.post(API_URL + '/api/v1/user/signup', {
      username: user.username,
      email: user.email,
      password: user.password
    })
  }
}

export default new AuthService()
