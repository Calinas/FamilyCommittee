'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkMobile = checkMobile;
exports.showMsg = showMsg;
exports.isEmptyString = isEmptyString;
exports.friendlyDate = friendlyDate;
exports.uploadImage = uploadImage;
exports.previewImage = previewImage;
exports.getOnlyDate = getOnlyDate;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkMobile(phone) {
  var patrn = /^[1][345789]\d{9}$/;
  if (!patrn.exec(phone)) return false;
  return true;
}

// 2秒钟的弹窗
function showMsg(msg) {
  var timer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;

  wx.showToast({
    title: msg,
    icon: 'none',
    duration: timer
  });
}

// 检查是否为空字符串
function isEmptyString(str) {
  return !str || str.length === 0 || /^\s*$/.test(str);
}

// 获取时间戳
function friendlyDate(stime) {
  var da = new Date();
  var sda = new Date(stime * 1000);
  var time2 = da.getTime();
  var time1 = stime * 1000;
  var time = 0;
  if (time1 > time2) {
    time = time1 - time2;
    sda = da;
  } else {
    time = time2 - time1;
  }
  if (time < 1000) return '刚刚';
  time = parseInt(time / 1000);
  if (time > 86400) {
    var day = parseInt(time / (24 * 60 * 60));
    if (day === 1) {
      return '昨天 ' + sda.getHours() + ':' + sda.getMinutes();
    } else if (day > 1 && day < 365) {
      var month = sda.getMonth() + 1;
      var date = sda.getDate();
      if (month <= 9) {
        month = '0' + month;
      }
      if (date <= 9) {
        date = '0' + date;
      }
      return month + '-' + date;
    } else {
      var month = sda.getMonth() + 1;
      var date = sda.getDate();
      if (month <= 9) {
        month = '0' + month;
      }
      if (date <= 9) {
        date = '0' + date;
      }
      return sda.getFullYear() + '-' + month + "-" + date;
    }
  } else if (time > 3600) {
    var hour = parseInt(time / (60 * 60));
    return hour + '小时前';
  } else if (time > 60) {
    var hour = parseInt(time / 60);
    return hour + '分钟前';
  } else {
    return time + '秒前';
  }
}

function uploadImage() {
  var memberInfo = wx.getStorageSync('memberInfo');
  return new Promise(function (resolve, reject) {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function success(res) {
        var tempFilePaths = res.tempFilePaths;
        wx.showLoading();
        wx.uploadFile({
          url: 'https://test.ctjwh.com/api/v1/file/uploadPic',
          filePath: tempFilePaths[0],
          formData: {
            'member_id': memberInfo.member_id,
            'member_token': memberInfo.member_token,
            'folder': 'committee'
          },
          name: 'file',
          success: function success(res) {
            var data = JSON.parse(res.data);
            var url = data.data.file_url;
            wx.hideLoading();
            resolve(url);
          }
        });
      }
    });
  });
}

// 图片放大功能
function previewImage(src, imgList) {
  wx.previewImage({
    current: src,
    urls: imgList
  });
}

// 只获取日期
function getOnlyDate(timeStr) {
  return timeStr.split(' ')[0];
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi5qcyJdLCJuYW1lcyI6WyJjaGVja01vYmlsZSIsInNob3dNc2ciLCJpc0VtcHR5U3RyaW5nIiwiZnJpZW5kbHlEYXRlIiwidXBsb2FkSW1hZ2UiLCJwcmV2aWV3SW1hZ2UiLCJnZXRPbmx5RGF0ZSIsInBob25lIiwicGF0cm4iLCJleGVjIiwibXNnIiwidGltZXIiLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImR1cmF0aW9uIiwic3RyIiwibGVuZ3RoIiwidGVzdCIsInN0aW1lIiwiZGEiLCJEYXRlIiwic2RhIiwidGltZTIiLCJnZXRUaW1lIiwidGltZTEiLCJ0aW1lIiwicGFyc2VJbnQiLCJkYXkiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJtb250aCIsImdldE1vbnRoIiwiZGF0ZSIsImdldERhdGUiLCJnZXRGdWxsWWVhciIsImhvdXIiLCJtZW1iZXJJbmZvIiwiZ2V0U3RvcmFnZVN5bmMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImNob29zZUltYWdlIiwiY291bnQiLCJzaXplVHlwZSIsInNvdXJjZVR5cGUiLCJzdWNjZXNzIiwidGVtcEZpbGVQYXRocyIsInJlcyIsInNob3dMb2FkaW5nIiwidXBsb2FkRmlsZSIsInVybCIsImZpbGVQYXRoIiwiZm9ybURhdGEiLCJtZW1iZXJfaWQiLCJtZW1iZXJfdG9rZW4iLCJuYW1lIiwiZGF0YSIsIkpTT04iLCJwYXJzZSIsImZpbGVfdXJsIiwiaGlkZUxvYWRpbmciLCJzcmMiLCJpbWdMaXN0IiwiY3VycmVudCIsInVybHMiLCJ0aW1lU3RyIiwic3BsaXQiXSwibWFwcGluZ3MiOiI7Ozs7O1FBRWdCQSxXLEdBQUFBLFc7UUFPQUMsTyxHQUFBQSxPO1FBU0FDLGEsR0FBQUEsYTtRQUtBQyxZLEdBQUFBLFk7UUFrREFDLFcsR0FBQUEsVztRQWdDQUMsWSxHQUFBQSxZO1FBUUFDLFcsR0FBQUEsVzs7QUFqSGhCOzs7Ozs7QUFFTyxTQUFTTixXQUFULENBQXFCTyxLQUFy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ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja01vYmlsZShwaG9uZSkge1xuICBsZXQgcGF0cm4gPSAvXlsxXVszNDU3ODldXFxkezl9JC9cbiAgaWYgKCFwYXRybi5leGVjKHBob25lKSkgcmV0dXJuIGZhbHNlXG4gIHJldHVybiB0cnVlXG59XG5cbi8vIDLnp5Lpkp/nmoTlvLnnqpdcbmV4cG9ydCBmdW5jdGlvbiBzaG93TXNnKG1zZywgdGltZXIgPSAyMDAwKSB7XG4gIHd4LnNob3dUb2FzdCh7XG4gICAgdGl0bGU6IG1zZyxcbiAgICBpY29uOiAnbm9uZScsXG4gICAgZHVyYXRpb246IHRpbWVyXG4gIH0pXG59XG5cbi8vIOajgOafpeaYr+WQpuS4uuepuuWtl+espuS4slxuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHlTdHJpbmcoc3RyKSB7XG4gIHJldHVybiAoIXN0ciB8fCBzdHIubGVuZ3RoID09PSAwIHx8IC9eXFxzKiQvLnRlc3Qoc3RyKSlcbn1cblxuLy8g6I635Y+W5pe26Ze05oizXG5leHBvcnQgZnVuY3Rpb24gZnJpZW5kbHlEYXRlKHN0aW1lKSB7XG4gIHZhciBkYSA9IG5ldyBEYXRlKClcbiAgdmFyIHNkYSA9IG5ldyBEYXRlKHN0aW1lICogMTAwMClcbiAgdmFyIHRpbWUyID0gZGEuZ2V0VGltZSgpXG4gIHZhciB0aW1lMSA9IHN0aW1lICogMTAwMFxuICB2YXIgdGltZSA9IDBcbiAgaWYgKHRpbWUxID4gdGltZTIpIHtcbiAgICB0aW1lID0gdGltZTEgLSB0aW1lMlxuICAgIHNkYSA9IGRhXG4gIH0gZWxzZSB7XG4gICAgdGltZSA9IHRpbWUyIC0gdGltZTFcbiAgfVxuICBpZiAodGltZSA8IDEwMDApIHJldHVybiAn5Yia5YiaJ1xuICB0aW1lID0gcGFyc2VJbnQodGltZSAvIDEwMDApXG4gIGlmICh0aW1lID4gODY0MDApIHtcbiAgICB2YXIgZGF5ID0gcGFyc2VJbnQodGltZSAvICgyNCAqIDYwICogNjApKVxuICAgIGlmIChkYXkgPT09IDEpIHtcbiAgICAgIHJldHVybiAn5pio5aSpICcgKyBzZGEuZ2V0SG91cnMoKSArICc6JyArIHNkYS5nZXRNaW51dGVzKClcbiAgICB9IGVsc2UgaWYgKGRheSA+IDEgJiYgZGF5IDwgMzY1KSB7XG4gICAgICB2YXIgbW9udGggPSBzZGEuZ2V0TW9udGgoKSArIDFcbiAgICAgIHZhciBkYXRlID0gc2RhLmdldERhdGUoKVxuICAgICAgaWYgKG1vbnRoIDw9IDkpIHtcbiAgICAgICAgbW9udGggPSAnMCcgKyBtb250aFxuICAgICAgfVxuICAgICAgaWYgKGRhdGUgPD0gOSkge1xuICAgICAgICBkYXRlID0gJzAnICsgZGF0ZVxuICAgICAgfVxuICAgICAgcmV0dXJuIG1vbnRoICsgJy0nICsgZGF0ZVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgbW9udGggPSBzZGEuZ2V0TW9udGgoKSArIDFcbiAgICAgIHZhciBkYXRlID0gc2RhLmdldERhdGUoKVxuICAgICAgaWYgKG1vbnRoIDw9IDkpIHtcbiAgICAgICAgbW9udGggPSAnMCcgKyBtb250aFxuICAgICAgfVxuICAgICAgaWYgKGRhdGUgPD0gOSkge1xuICAgICAgICBkYXRlID0gJzAnICsgZGF0ZVxuICAgICAgfVxuICAgICAgcmV0dXJuIHNkYS5nZXRGdWxsWWVhcigpICsgJy0nICsgbW9udGggKyBcIi1cIiArIGRhdGVcbiAgICB9XG4gIH0gZWxzZSBpZiAodGltZSA+IDM2MDApIHtcbiAgICB2YXIgaG91ciA9IHBhcnNlSW50KHRpbWUgLyAoNjAgKiA2MCkpXG4gICAgcmV0dXJuIGhvdXIgKyAn5bCP5pe25YmNJ1xuICB9IGVsc2UgaWYgKHRpbWUgPiA2MCkge1xuICAgIHZhciBob3VyID0gcGFyc2VJbnQodGltZSAvIDYwKVxuICAgIHJldHVybiBob3VyICsgJ+WIhumSn+WJjSdcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdGltZSArICfnp5LliY0nXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwbG9hZEltYWdlKCkge1xuICBjb25zdCBtZW1iZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nKVxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHd4LmNob29zZUltYWdlKHtcbiAgICAgIGNvdW50OiAxLFxuICAgICAgc2l6ZVR5cGU6IFsnb3JpZ2luYWwnLCAnY29tcHJlc3NlZCddLFxuICAgICAgc291cmNlVHlwZTogWydhbGJ1bScsICdjYW1lcmEnXSxcbiAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgIGNvbnN0IHRlbXBGaWxlUGF0aHMgPSByZXMudGVtcEZpbGVQYXRoc1xuICAgICAgICB3eC5zaG93TG9hZGluZygpXG4gICAgICAgIHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICAgIHVybDogJ2h0dHBzOi8vdGVzdC5jdGp3aC5jb20vYXBpL3YxL2ZpbGUvdXBsb2FkUGljJyxcbiAgICAgICAgICBmaWxlUGF0aDogdGVtcEZpbGVQYXRoc1swXSxcbiAgICAgICAgICBmb3JtRGF0YToge1xuICAgICAgICAgICAgJ21lbWJlcl9pZCc6IG1lbWJlckluZm8ubWVtYmVyX2lkLFxuICAgICAgICAgICAgJ21lbWJlcl90b2tlbic6IG1lbWJlckluZm8ubWVtYmVyX3Rva2VuLFxuICAgICAgICAgICAgJ2ZvbGRlcic6ICdjb21taXR0ZWUnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBuYW1lOiAnZmlsZScsXG4gICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKVxuICAgICAgICAgICAgY29uc3QgdXJsID0gZGF0YS5kYXRhLmZpbGVfdXJsXG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICAgICAgICByZXNvbHZlKHVybClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfSlcbn1cblxuLy8g5Zu+54mH5pS+5aSn5Yqf6IO9XG5leHBvcnQgZnVuY3Rpb24gcHJldmlld0ltYWdlKHNyYywgaW1nTGlzdCkge1xuICB3eC5wcmV2aWV3SW1hZ2Uoe1xuICAgIGN1cnJlbnQ6IHNyYyxcbiAgICB1cmxzOiBpbWdMaXN0XG4gIH0pXG59XG5cbi8vIOWPquiOt+WPluaXpeacn1xuZXhwb3J0IGZ1bmN0aW9uIGdldE9ubHlEYXRlKHRpbWVTdHIpIHtcbiAgcmV0dXJuIHRpbWVTdHIuc3BsaXQoJyAnKVswXVxufVxuIl19