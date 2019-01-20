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
