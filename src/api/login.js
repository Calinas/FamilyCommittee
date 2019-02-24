import wepy from 'wepy'

// 获取sessionKey
export function getSessionKey(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/wxapp/onLogin',
      method: 'post',
      data: {
        code: data.code,
        old_wxapp_token: data.old_wxapp_token
      }
    }).then(res => {
      resolve(res)
    })
  })
}

// 解密敏感数据
export function decryptData(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/wxapp/decryptData',
      method: 'post',
      data: {
        encryptedData: data.encryptedData,
        iv: data.iv,
        wxapp_token: data.wxapp_token
      }
    }).then(res => {
      resolve(res)
    })
  })
}

// 微信登录
export function wxLogin(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/auth/wxLogin',
      method: 'post',
      data: {
        open_id: data.open_id,
        nickname: data.nickname,
        head_img: data.head_img,
        sex: data.sex,
        auth_id: data.auth_id,
        wxapp_token: data.wxapp_token,
        mobile: data.mobile
      }
    }).then(res => {
      resolve(res)
    })
  })
}
