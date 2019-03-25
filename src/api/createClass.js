import wepy from 'wepy'
import commonParams from './commonData'

// 获取学校列表
export function schoolList(params) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/school/index',
      data: Object.assign({}, commonParams(), {
        keywords: params.keywords,
        pn: 1,
        ps: 100,
        city_name: params.city_name
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
      data: Object.assign({}, commonParams(), {
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
      data: Object.assign({}, commonParams(), {
        class_id: data.class_id,
        join_key: data.join_key
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
      data: Object.assign({}, commonParams(), {
        ps: 100
      })
    }).then(res => {
      resolve(res)
    })
  })
}

// 班级查询
export function searchClass(params) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/class/search',
      data: Object.assign({}, commonParams(), {
        school_id: params.school_id,
        grade_type: params.grade,
        year_class: params.year,
        class: params.class
      })
    }).then(res => {
      resolve(res)
    })
  })
}

// 根据经纬度查询城市名称
export function getCityInfo(params) {
  return new Promise((resolve) => {
    wepy.request({
      url: '/system/regeocode',
      data: Object.assign({}, commonParams(), {
        lat: params.lat,
        lng: params.lng
      })
    }).then(res => {
      resolve(res)
    })
  })
}

// 获取城市列表
export const getCityList = () => {
  return new Promise((resolve) => {
    wepy.request({
      url: '/system/getCityList',
      data: Object.assign({}, commonParams())
    }).then(res => {
      resolve(res)
    })
  })
}

// 创建学校
export const createSchool = (params) => {
  return new Promise((resolve) => {
    wepy.request({
      url: '/school/add',
      data: Object.assign({}, {
        name: params.name,
        city_name: params.city_name
      }, commonParams()),
      method: 'post'
    }).then(res => {
      resolve(res)
    })
  })
}
