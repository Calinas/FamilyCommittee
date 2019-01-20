import wepy from 'wepy'

// 获取学校列表
export function schoolList() {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/school/index',
      data: {
        keywords: '',
        pn: 1,
        ps: 10
      }
    }).then(res => {
      resolve(res)
    })
  })
}

// 创建班级
export function addClass(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/class/addClass',
      data: {
        school_id: data.school_id,
        grade_type: data.grade,
        year_class: data.year,
        class: data.class
      },
      method: 'post'
    }).then(res => {
      resolve(res)
    })
  })
}

// 加入班级
export function joinClass(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/member/class/join',
      data: {
        member_id: data.member_id,
        join_key: data.key
      },
      method: 'post'
    }).then(res => {
      resolve(res)
    })
  })
}

// 获取班级列表

export function getClassList(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/member/class/index',
      data: {
        member_id: data.member_id
      }
    }).then(res => {
      resolve(res)
    })
  })
}
