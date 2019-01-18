import wepy from 'wepy'

// 获取权限列表
export function authList(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/class/auth/index',
      data: {
        member_id: data.member_id,
        class_id: data.class_id
      }
    }).then(res => {
      resolve(res)
    })
  })
}

// 添加班级权限
export function addAuth(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/class/auth/add',
      data: {
        member_id: data.member_id,
        class_id: data.class_id,
        role_id: data.role_id,
        join_member_id: data.join_member_id
      },
      method: 'post'
    }).then(res => {
      resolve(res)
    })
  })
}

// 获取我的班级权限
export function checkAuth(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/member/auth',
      data: {
        member_id: data.member_id,
        class_id: data.class_id
      }
    }).then(res => {
      resolve(res)
    })
  })
}
