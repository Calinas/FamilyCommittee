import wepy from 'wepy'

// 发布圈子
export function addCircles(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
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

// 发布收款
export function addCollection(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
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

// 发布活动
export function addActivity(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/moment/addActivity',
      data: {
        member_id: data.member_id,
        class_id: data.class_id,
        sign_type: data.type,
        description: data.desc,
        select_type: data.selectType
      }
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

// 发布通知
export function addNotify(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/moment/addNotify',
      data: {
        member_id: data.member_id,
        class_id: data.class_id,
        see_type: data.type,
        description: data.desc,
        is_remind: data.remind
      }
    }).then(res => {
      resolve(res)
    })
  })
}

// 上传图片
export function uploadPic(data) {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: '/file/uploadPic',
      filePath: data.file,
      name: 'file',
      formData: {
        'member_id': data.member_id
      },
      success: res => {
        resolve(res)
      }
    })
  })
}

// 上传相册
export function addPhoto(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
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
    wepy.request({
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

// 获取圈子列表
export function getCircleList(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/moment/list',
      data: {
        member_id: data.member_id,
        class_id: data.class_id,
        see_type: data.see_type,
        type: data.type,
        pn: data.pn,
        ps: data.ps
      }
    }).then(res => {
      resolve(res)
    })
  })
}
