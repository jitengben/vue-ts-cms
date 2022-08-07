import type { AxiosRequestConfig, AxiosResponse } from 'axios'

//定义这两个接口的目的就是让他在new的时候把拦截器也传进来，这样可以让每一个实例都有一个自己的拦截器
export interface TbRequestInterceptor<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

//相当于在axios的config里再加个拦截器的属性
export interface TbRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptor?: TbRequestInterceptor<T>
  showLoading?: boolean //可能不需要loading的情况
}
