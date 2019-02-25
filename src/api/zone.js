import wepy from 'wepy'
import commonParams from './commonData'

// 发布圈子
export function addCircles(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/moment/addCircles',
      data: Object.assign({}, commonParams(), {
        class_id: data.class_id,
        see_type: data.see_type,
        description: data.desc,
        img_url: data.img_url
      }),
      method: 'post'
    }).then(res => {
      resolve(res)
    })
  })
}

// 发布收款
export function addCollection(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/moment/addCollection',
      data: Object.assign({}, commonParams(), {
        class_id: data.class_id,
        type: data.type,
        description: data.desc,
        item: data.item
      }),
      method: 'post'
    }).then(res => {
      resolve(res)
    })
  })
}

// 发布活动
export function addActivity(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/moment/addActivity',
      data: Object.assign({}, commonParams(), {
        class_id: data.class_id,
        sign_type: data.sign_type,
        description: data.desc,
        select_type: data.selectType,
        item: data.item,
        img_url: data.img_url
      }),
      method: 'post'
    }).then(res => {
      resolve(res)
    })
  })
}

// 发布记账
export function addAccount(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/moment/addAccount',
      data: Object.assign({}, commonParams(), {
        class_id: data.class_id,
        type: data.type,
        description: data.desc,
        money: data.money,
        img_url: data.imgList
      }),
      method: 'post'
    }).then(res => {
      resolve(res)
    })
  })
}

// 发布通知
export function addNotify(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/moment/addNotify',
      data: Object.assign({}, commonParams(), {
        class_id: data.class_id,
        see_type: data.type,
        description: data.desc,
        is_remind: data.remind
      }),
      method: 'post'
    }).then(res => {
      resolve(res)
    })
  })
}

// 上传相册
export function addPhoto(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/class/photo/add',
      data: Object.assign({}, commonParams(), {
        class_id: data.class_id,
        img_url: data.img_url
      }),
      method: 'post'
    }).then(res => {
      resolve(res)
    })
  })
}

// 班级相册列表
export function photoIndex(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/class/photo/index',
      data: Object.assign({}, commonParams(), {
        class_id: data.class_id,
        pn: data.pn,
        ps: data.ps
      })
    }).then(res => {
      resolve(res)
    })
  })
}

// 获取圈子列表
export function getCircleList(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/moment/list',
      data: Object.assign({}, commonParams(), {
        class_id: data.class_id,
        see_type: data.see_type,
        type: data.type,
        pn: data.pn,
        ps: data.ps
      })
    }).then(res => {
      resolve(res)
    })
  })
}

// 发布圈子评论
export function addComment(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/moment/addComment',
      data: Object.assign({}, commonParams(), {
        class_id: data.class_id,
        moment_id: data.moment_id,
        content: data.content,
        root_id: data.root_id,
        to_comment_id: data.to_comment_id
      }),
      method: 'post'
    }).then(res => {
      resolve(res)
    })
  })
}

// 参加圈子活动
export function joinActivity(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/moment/activity/addApply',
      data: Object.assign({}, commonParams(), {
        class_id: data.class_id,
        activity_id: data.activity_id,
        activity_item_id: data.activity_item_id
      }),
      method: 'post'
    }).then(res => {
      resolve(res)
    })
  })
}

// 加载更多评论列表
export function getCommentList(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/moment/getCommentList',
      data: Object.assign({}, commonParams(), {
        moment_id: data.moment_id,
        pn: data.pn,
        ps: data.ps,
        offset: data.offset
      })
    }).then(res => {
      resolve(res)
    })
  })
}

// 删除圈子
export function deleteCircle(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/moment/delete',
      data: Object.assign({}, commonParams(), {
        moment_id: data.moment_id
      }),
      method: 'delete'
    }).then(res => {
      resolve(res)
    })
  })
}
