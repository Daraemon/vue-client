import axios, { AxiosPromise, AxiosRequestConfig } from 'axios'
import { message } from 'ant-design-vue'

export function request(config: AxiosRequestConfig): AxiosPromise {
  const instance = axios.create({
    // baseURL: process.env.VUE_APP_URL,
    timeout: 5000
  })

  // instance.defaults.withCredentials = true

  // 2.axios的拦截器
  // 2.1.请求拦截
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err)
  })

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    message.error(`请求错误code：${err.response.status}`)
    return Promise.reject(err)
  })

  return instance(config)
}
