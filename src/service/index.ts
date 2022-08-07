import TbRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '../utils/cache'
const tbRequest = new TbRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptor: {
    requestInterceptor: (config) => {
      //该实例请求携带token
      const token = localCache.getCache('token') ?? ''
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      // console.log('请求失败的拦截~')
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (err) => {
      // console.log('响应失败的拦截~')
      return err
    }
  }
})
export default tbRequest
