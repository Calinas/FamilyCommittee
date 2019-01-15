import wepy from 'wepy'
import { requestGet, requestPost } from 'request.js'

// 获取学校列表
export function getSchoolList(params) {
  params = Object.assign({}, params)
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/school/index',
      data: params,
      method: 'get'
    }).then(res => {
      resolve(res)
    })
  })
}

export function createClass(params) {
  params = Object.assign({}, params)
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/class/addClass',
      data: params,
      method: 'post'
    }).then(res => {
      resolve(res)
    })
  })
}

export function addClass(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/class/addClass',
      data: params,
      method: 'post'
    }).then(res => {
      resolve(res)
    })
  })
}

