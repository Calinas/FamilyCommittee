import wepy from 'wepy'
import commonParams from './commonData'

// 绑定身份
export function bindIdentity(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/member/class/bindIdentity',
      data: Object.assign({}, commonParams(), {
        class_id: data.class_id,
        item: data.item
      }),
      method: 'post'
    }).then(res => {
      resolve(res)
    })
  })
}

// 绑定手机
export function bindMobile(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/member/bindMobile',
      data: {
        member_id: data.id,
        mobile: data.mobile
      },
      method: 'post'
    }).then(res => {
      resolve(res)
    })
  })
}

// 获取手机验证码
export function validateCode(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/auth/validateCode',
      data: {
        mobile: data.mobile,
        action: 'bind_mobile'
      },
      method: 'post'
    }).then(res => {
      resolve(res)
    })
  })
}

// 更换手机
export function replaceMobile(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/class/member/replaceMobile',
      data: {
        mobile: data.mobile,
        member_id: data.id,
        code: data.code
      },
      method: 'post'
    }).then(res => {
      resolve(res)
    })
  })
}

// 获取身份列表
export function getIdentityList(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/class/getIdentityList',
      data: Object.assign({}, commonParams())
    }).then(res => {
      resolve(res)
    })
  })
}

// 检查用户是否有多个学生
export function checkStudent(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/member/class/bindStudent',
      data: Object.assign({}, commonParams(), {
        class_id: data.class_id,
        moment_id: data.moment_id,
        is_pay: data.is_pay
      })
    }).then(res => {
      resolve(res)
    })
  })
}

// 获取班级绑定得身份列表
export function identityList(data) {
  return new Promise(resolve => {
    wepy.request({
      url: '/member/class/identityList',
      data: Object.assign({}, commonParams(), {
        class_id: data.class_id
      })
    }).then(res => {
      resolve(res)
    })
  })
}
