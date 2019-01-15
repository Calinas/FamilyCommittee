import wepy from 'wepy'
import { requestGet, requestPost } from 'request'

// 发布圈子
export function addCircles(data) {
  return new Promise((resolve, reject) => {
    requestPost({
      url: '/moment/addCircles',
      data: {
        member_id: data.member_id,
        class_id: data.class_id,
        see_type: data.type,
        description: data.desc,
        img_url: data.imgList
      }
    }).then(res => {
      resolve(res)
    })
  })
}

//发布收款
export function addCircles(data) {
  return new Promise((resolve, reject) => {
    requestPost({
      url: '/moment/addCollection',
      data: {
        member_id: data.member_id,
        class_id: data.class_id,
        type: data.type,
        description: data.desc,
        img_url: data.imgList
      }
    }).then(res => {
      resolve(res)
    })
  })
}

//发布活动
export function addActivity(data) {
  return new Promise((resolve, reject) => {
    requestPost({
      url: '/moment/addActivity',
      data: {
        member_id: data.member_id,
        class_id: data.class_id,
        sign_type: data.type,
        description: data.desc,
        select_type: 'radio'
      }
    }).then(res => {
      resolve(res)
    })
  })
}

//发布记账
export function addAccount(data) {
  return new Promise((resolve, reject) => {
    requestPost({
      url: '/moment/addAccount',
      data: {
        member_id: data.member_id,
        class_id: data.class_id,
        type: data.type,
        description: data.desc,
        money: 0,
        img_url: data.imgList
      }
    }).then(res => {
      resolve(res)
    })
  })
}

//获取圈子列表
export function addAccount(data) {
  return new Promise((resolve, reject) => {
    requestGet({
      url: '/moment/addAccount',
      data: {
        member_id: data.member_id,
        class_id: data.class_id,
        see_type: data.type,
        type: data.type,
        pn: data.pn,
        ps: data.ps,
        comment_num: data.comment_num
      }
    }).then(res => {
      resolve(res)
    })
  })
}

// 上传相册
export function addPhoto(data) {
  return new Promise((resolve, reject) => {
    requestPost({
      url: '/class/photo/add',
      data: {
        member_id: data.member_id,
        class_id: data.class_id,
        img_url: data.imgList
      }
    }).then(res => {
      resolve(res)
    })
  })
}

// 班级相册列表
export function photoIndex(data) {
  return new Promise((resolve, reject) => {
    requestPost({
      url: '/class/photo/index',
      data: {
        class_id: data.class_id,
        pn: data.pn,
        ps: data.ps
      }
    }).then(res => {
      resolve(res)
    })
  })
}

