import { getUserInfo, nav, toast } from '@/utils'
import  env  from '@/config/env'

export const BASE_URL = env.apiBaseUrl
// 当前页面是否是登录页面
// @ts-ignore
export const CURRENT_PAGE_LOGIN = getCurrentPages().route !== 'pages/account/login'


interface RequestOption {
  url: string,
  data: any,
  loading: boolean,
  method?:  UniApp.RequestOptions['method'];
}

// 最基础的请求函数
export function request(
  {
    url,
    data,
    loading,
    method
  }: RequestOption) {
  //'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNjc5MjIxNTcxLCJleHAiOjE2Nzk4MjYzNzF9.jEDEA0W206ZPMnDhyVHOgOlzKwSihRDGcYkF2tn32Mv1iWwO5pF5QM39rvna5irugTJVW8cCqPsGfLv0vgqYpg'
  return new Promise((resolve, reject) => {
    let value
    try {
      value = getUserInfo()
    } catch (e) {
      console.log(e)
      reject(e)
    }
    if (value || CURRENT_PAGE_LOGIN) {
      loading && uni.showLoading({
        title: '加载中'
      })
      uni.request({
        url: BASE_URL + url,
        data: data,
        method,
        header: {
          Authorization: value.token,
          'Content-Type': 'application/json'
        },
        success(data: any) {
          if (data.data.code === 401) {
            nav('reLaunch:pages/account/login')
          } else if (data.data.code !== 200) {
            data.data.msg && toast(data.data.msg)
          } else {
            resolve(data.data)
          }
        },
        fail(e) {
          reject(e)
        },
        complete() {
          loading && uni.hideLoading()
        }
      })
    } else {
      if (CURRENT_PAGE_LOGIN) {
        nav('reLaunch:pages/account/login')
      }
    }
  })
}

export function get(
  {
    url,
    loading,
    data
  }: RequestOption) {
  return request({
    url,
    data,
    loading,
    method: 'GET'
  })
}

export function post(
  {
    url,
    loading,
    data
  }: RequestOption) {
  return request({
    url,
    data,
    loading,
    method: 'POST'
  })
}
