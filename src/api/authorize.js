import wepy from 'wepy'
import commonParams from './commonData'

// 添加班级权限
export function addAuth(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/class/auth/add',
      data: Object.assign({}, commonParams, {
        class_id: data.class_id,
        role_id: data.role_id,
        join_member_id: data.join_member_id
      }),
      method: 'post'
    }).then(res => {
      resolve(res)
    })
  })
}

// 获取我的班级权限列表
export function getAuth(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/member/auth',
      data: Object.assign({}, commonParams, {
        class_id: data.class_id
      })
    }).then(res => {
      resolve(res)
    })
  })
}

// 获取所有权限列表
export function authList(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/class/auth/index',
      data: Object.assign({}, commonParams, {
        class_id: data.class_id
      })
    }).then(res => {
      resolve(res)
    })
  })
}

// 搜索家长名称
export function searchMember(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/class/searchMember',
      data: Object.assign({}, commonParams, {
        class_id: data.class_id,
        keywords: data.keywords
      })
    }).then(res => {
      resolve(res)
    })
  })
}
