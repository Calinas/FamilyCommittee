import wepy from 'wepy'
import { requestGet, requestPost } from 'request'

// 获取学校列表
export function schoolList() {
  return new Promise((resolve, reject) => {
    requestGet({
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
    requestPost({
      url: '/class/addClass',
      data: {
        school_id: data.school_id,
        grade_type: data.grade,
        year_class: data.year,
        class: data.class
      }
    }).then(res => {
      resolve(res)
    })
  })
}

// 加入班级
export function joinClass(data) {
  return new Promise((resolve, reject) => {
    requestPost({
      url: '/member/class/join',
      data: {
        member_id: data.member_id,
        join_key: data.key
      }
    }).then(res => {
      resolve(res)
    })
  })
}
