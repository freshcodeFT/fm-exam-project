import axios from 'axios'
import CONTANTS from '../../constants'

class AuthApi {
  #_client
  #_accessToken

  constructor (client) {
    this.#_client = client
    this._url = 'auth/'
    this.#_accessToken = null

    this.#_client.interceptors.request.use(this.requestInterceptor, err =>
      Promise.reject(err)
    )

    this.#_client.interceptors.response.use(
      this.responseInterceptor,
      this.responseInterceptorError
    )
  }

  login = async data => {
    return await this.#_client.post(`${this._url}sign-in`, data)
  }

  signup = async data => {
    return await this.#_client.post(`${this._url}sign-up`, data)
  }

  refresh = async data => {
    return await this.#_client.post(`${this._url}refresh`, {refreshToken: data})
  }

  logout = () => {
    window.localStorage.removeItem(CONTANTS.REFRESH_TOKEN)
    this.#_accessToken = null
  }

  _saveTokenPair = ({ refresh, access }) => {
    window.localStorage.setItem(CONTANTS.REFRESH_TOKEN, refresh)
    this.#_accessToken = access
  }

  requestInterceptor = config => {
    if (this.#_accessToken) {
      config.headers['Authorization'] = this.#_accessToken
    }
    return config
  }

  responseInterceptor = response => {
    const {
      config: { url }
    } = response
    if (url.includes(this._url)) {
      const {
        data: {
          data: { tokenPair }
        }
      } = response
      this._saveTokenPair(tokenPair)
    }
    return response
  }

  responseInterceptorError = async error => {
    const refreshToken = window.localStorage.getItem(CONTANTS.REFRESH_TOKEN)
    if (error.response.status === 419 && refreshToken) {
      const {
        data: {
          data: { tokenPair }
        }
      } = await this.refresh(refreshToken)
      this._saveTokenPair(tokenPair)
    } else if (error.response.status === 401 && refreshToken) {
      this.logout()
    }
    return Promise.reject(error)
  }
}

export default AuthApi
