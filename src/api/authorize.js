import wepy from 'wepy'
import commonParams from './commonData'

// 添加班级权限
export function addAuth(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/class/auth/add',
      data: Object.assign({}, commonParams(), {
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
      data: Object.assign({}, commonParams(), {
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
      data: Object.assign({}, commonParams(), {
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
      data: Object.assign({}, commonParams(), {
        class_id: data.class_id,
        keywords: data.keywords
      })
    }).then(res => {
      resolve(res)
    })
  })
}

// 删除班级角色权限
export function deleteAuth(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/class/auth/delete',
      data: Object.assign({}, commonParams(), {
        class_id: data.class_id,
        class_auth_id: data.class_auth_id
      }),
      method: 'post'
    }).then(res => {
      resolve(res)
    })
  })
}

// 修改班级验证码
export function changeCode(params) {
  return new Promise((resolve) => {
    wepy.request({
      url: '/class/updateJoinKey',
      data: Object.assign({}, commonParams(), {
        class_id: params.class_id,
        join_key: params.join_key
      }),
      method: 'post'
    }).then(res => {
      resolve(res)
    })
  })
}

// 逐出班级成员
export function removeMember(params) {
  return new Promise((resolve) => {
    wepy.request({
      url: '/class/removeMember',
      data: Object.assign({}, commonParams(), {
        class_id: params.class_id,
        remove_member_id: params.remove_member_id
      }),
      method: 'post'
    }).then(res => {
      resolve(res)
    })
  })
}
