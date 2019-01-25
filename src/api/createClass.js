import wepy from 'wepy'
import commonParams from './commonData'

// 获取学校列表
export function schoolList() {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/school/index',
      data: Object.assign({}, commonParams, {
        keywords: '',
        pn: 1,
        ps: 10
      })
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
      data: Object.assign({}, commonParams, {
        school_id: data.school_id,
        grade_type: data.grade_type,
        year_class: data.year_class,
        class: data.class,
        item: data.item
      }),
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
      data: Object.assign({}, commonParams, {
        join_key: data.key
      }),
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
      data: commonParams
    }).then(res => {
      resolve(res)
    })
  })
}
