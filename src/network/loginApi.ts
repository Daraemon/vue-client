import { AxiosPromise } from 'axios'
import { request } from './request'

// 登录接口
export function login(data: object): AxiosPromise {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}
