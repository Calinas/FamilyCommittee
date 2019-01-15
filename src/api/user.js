import wepy from 'wepy'
import { requestGet, requestPost } from 'request'

// 绑定身份
export function bindIDentity(data) {
  return new Promise((resolve, reject) => {
    requestPost({
      url: '/class/member/bindIDentity',
      data: {
        identity_id: data.id,
        student_name: name
      }
    }).then(res => {
      resolve(res)
    })
  })
}

// 绑定手机
export function bindMobile(data) {
  return new Promise((resolve, reject) => {
    requestPost({
      url: '/member/bindMobile',
      data: {
        member_id: data.id,
        mobile: data.mobile
      }
    }).then(res => {
      resolve(res)
    })
  })
}

// 获取手机验证码
export function validateCode(data) {
  return new Promise((resolve, reject) => {
    requestGet({
      url: '/auth/validateCode',
      data: {
        mobile: data.mobile,
        action: 'bind_mobile'
      }
    }).then(res => {
      resolve(res)
    })
  })
}

// 更换手机
export function replaceMobile(data) {
  return new Promise((resolve, reject) => {
    requestGet({
      url: '/class/member/replaceMobile',
      data: {
        mobile: data.mobile,
        member_id: data.id,
        code: data.code
      }
    }).then(res => {
      resolve(res)
    })
  })
}
