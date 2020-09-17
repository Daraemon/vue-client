import axios, { AxiosPromise, AxiosRequestConfig } from 'axios'

export function request(config: AxiosRequestConfig): AxiosPromise {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_URL,
    timeout: 5000
  })

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
    console.log(err)
  })

  return instance(config)
}
