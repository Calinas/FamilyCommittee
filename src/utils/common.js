import wepy from 'wepy'

export function checkMobile(phone) {
  let patrn = /^[1][345789]\d{9}$/
  if (!patrn.exec(phone)) return false
  return true
}

// 2秒钟的弹窗
export function showMsg(msg, timer = 2000) {
  wx.showToast({
    title: msg,
    icon: 'none',
    duration: timer
  })
}

// 检查是否为空字符串
export function isEmptyString(str) {
  return (!str || str.length === 0 || /^\s*$/.test(str))
}

// 获取时间戳
export function friendlyDate(stime) {
  var da = new Date()
  var sda = new Date(stime * 1000)
  var time2 = da.getTime()
  var time1 = stime * 1000
  var time = 0
  if (time1 > time2) {
    time = time1 - time2
    sda = da
  } else {
    time = time2 - time1
  }
  if (time < 1000) return '刚刚'
  time = parseInt(time / 1000)
  if (time > 86400) {
    var day = parseInt(time / (24 * 60 * 60))
    if (day === 1) {
      return '昨天 ' + sda.getHours() + ':' + sda.getMinutes()
    } else if (day > 1 && day < 365) {
      var month = sda.getMonth() + 1
      var date = sda.getDate()
      if (month <= 9) {
        month = '0' + month
      }
      if (date <= 9) {
        date = '0' + date
      }
      return month + '-' + date
    } else {
      var month = sda.getMonth() + 1
      var date = sda.getDate()
      if (month <= 9) {
        month = '0' + month
      }
      if (date <= 9) {
        date = '0' + date
      }
      return sda.getFullYear() + '-' + month + "-" + date
    }
  } else if (time > 3600) {
    var hour = parseInt(time / (60 * 60))
    return hour + '小时前'
  } else if (time > 60) {
    var hour = parseInt(time / 60)
    return hour + '分钟前'
  } else {
    return time + '秒前'
  }
}

export function uploadImage() {
  const memberInfo = wx.getStorageSync('memberInfo')
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const tempFilePaths = res.tempFilePaths
        wx.showLoading()
        wx.uploadFile({
          url: 'https://test.ctjwh.com/api/v1/file/uploadPic',
          filePath: tempFilePaths[0],
          formData: {
            'member_id': memberInfo.member_id,
            'member_token': memberInfo.member_token,
            'folder': 'committee'
          },
          name: 'file',
          success: res => {
            const data = JSON.parse(res.data)
            const url = data.data.file_url
            wx.hideLoading()
            resolve(url)
          }
        })
      }
    })
  })
}

// 图片放大功能
export function previewImage(src, imgList) {
  wx.previewImage({
    current: src,
    urls: imgList
  })
}

// 只获取日期
export function getOnlyDate(timeStr) {
  return timeStr.split(' ')[0]
}

// 函数节流
export function throttle(method, context = window) {
  clearTimeout(method.tId)
  method.tId = setTimeout(() => {
    method.call(context)
  }, 1000)
}
