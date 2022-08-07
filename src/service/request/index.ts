import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { TbRequestInterceptor, TbRequestConfig } from './type'
import { ElLoading } from 'element-plus'
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

const DEFAULT_LOADING = true
class TbRequest {
  //首先每次导出都是不同的axios实例保证不同的实例有不同的配置
  instance: AxiosInstance
  interceptor?: TbRequestInterceptor
  loading?: ILoadingInstance
  showLoading?: boolean

  constructor(config: TbRequestConfig) {
    this.instance = axios.create(config)
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptor = config.interceptor
    //把传入的拦截器应用一下（实例才可以应用拦截）私有的
    this.instance.interceptors.request.use(
      this.interceptor?.requestInterceptor,
      this.interceptor?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptor?.responseInterceptor,
      this.interceptor?.responseInterceptorCatch
    )
    //添加所有的实例共有的拦截器，如果有先后顺序要求，改变代码顺序即可
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有请求都有的拦截器请求成功~')
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '加载中~',
            background: 'rgba(0,0,0,0.5)'
          })
        }
        return config
      },
      (err) => {
        // console.log('所有请求都有的拦截器请求失败~')
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有请求都有的拦截器响应成功~')
        this.loading?.close()
        return res.data
      },
      (err) => {
        // console.log('所有请求都有的拦截器响应失败~')
        //例子
        if (err.response.status === '404') {
          // console.log('请求失败404~')
        }
        return err
      }
    )
  }

  request<T>(config: TbRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      //实现如果有单个请求的拦截
      if (config.interceptor?.requestInterceptor) {
        config = config.interceptor.requestInterceptor(config)
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptor?.responseInterceptor) {
            res = config.interceptor.responseInterceptor(res)
          }
          // console.log(res)
          this.showLoading = DEFAULT_LOADING
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }

  get<T>(config: TbRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: TbRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: TbRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: TbRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}
export default TbRequest
