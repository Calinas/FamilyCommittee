'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterArrayByValue = undefined;
exports.checkMobile = checkMobile;
exports.showMsg = showMsg;
exports.isEmptyString = isEmptyString;
exports.friendlyDate = friendlyDate;
exports.uploadImage = uploadImage;
exports.previewImage = previewImage;
exports.getOnlyDate = getOnlyDate;
exports.throttle = throttle;
exports.checkHasJoinClass = checkHasJoinClass;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkMobile(phone) {
  var pattern = /^[1][345789]\d{9}$/;
  if (!pattern.exec(phone)) return false;
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

// 函数节流
function throttle(method) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  var timer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 300;

  clearTimeout(method.tId);
  method.tId = setTimeout(function () {
    method.call(context);
  }, timer);
}

function checkHasJoinClass(classId, classList) {
  var returnArray = classList.filter(function (item) {
    return Number(item.class.id) === Number(classId);
  });
  return !!returnArray.length;
}

var filterArrayByValue = exports.filterArrayByValue = function filterArrayByValue(keyName, arr, booleanValue, newObj) {
  var currentIdx = -1;
  for (var i = 0, len = arr.length; i < len; i++) {
    if (arr[i].member_id === keyName) {
      currentIdx = i;
      break;
    }
  }
  if (booleanValue) {
    console.log(booleanValue, currentIdx, arr);
    console.log(arr.splice(currentIdx, 1));
    return arr.splice(currentIdx, 1);
  } else {
    return arr.concat(newObj);
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi5qcyJdLCJuYW1lcyI6WyJjaGVja01vYmlsZSIsInNob3dNc2ciLCJpc0VtcHR5U3RyaW5nIiwiZnJpZW5kbHlEYXRlIiwidXBsb2FkSW1hZ2UiLCJwcmV2aWV3SW1hZ2UiLCJnZXRPbmx5RGF0ZSIsInRocm90dGxlIiwiY2hlY2tIYXNKb2luQ2xhc3MiLCJwaG9uZSIsInBhdHRlcm4iLCJleGVjIiwibXNnIiwidGltZXIiLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImR1cmF0aW9uIiwic3RyIiwibGVuZ3RoIiwidGVzdCIsInN0aW1lIiwiZGEiLCJEYXRlIiwic2RhIiwidGltZTIiLCJnZXRUaW1lIiwidGltZTEiLCJ0aW1lIiwicGFyc2VJbnQiLCJkYXkiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJtb250aCIsImdldE1vbnRoIiwiZGF0ZSIsImdldERhdGUiLCJnZXRGdWxsWWVhciIsImhvdXIiLCJtZW1iZXJJbmZvIiwiZ2V0U3RvcmFnZVN5bmMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImNob29zZUltYWdlIiwiY291bnQiLCJzaXplVHlwZSIsInNvdXJjZVR5cGUiLCJzdWNjZXNzIiwidGVtcEZpbGVQYXRocyIsInJlcyIsInNob3dMb2FkaW5nIiwidXBsb2FkRmlsZSIsInVybCIsImZpbGVQYXRoIiwiZm9ybURhdGEiLCJtZW1iZXJfaWQiLCJtZW1iZXJfdG9rZW4iLCJuYW1lIiwiZGF0YSIsIkpTT04iLCJwYXJzZSIsImZpbGVfdXJsIiwiaGlkZUxvYWRpbmciLCJzcmMiLCJpbWdMaXN0IiwiY3VycmVudCIsInVybHMiLCJ0aW1lU3RyIiwic3BsaXQiLCJtZXRob2QiLCJjb250ZXh0Iiwid2luZG93IiwiY2xlYXJUaW1lb3V0IiwidElkIiwic2V0VGltZW91dCIsImNhbGwiLCJjbGFzc0lkIiwiY2xhc3NMaXN0IiwicmV0dXJuQXJyYXkiLCJmaWx0ZXIiLCJOdW1iZXIiLCJpdGVtIiwiY2xhc3MiLCJpZCIsImZpbHRlckFycmF5QnlWYWx1ZSIsImtleU5hbWUiLCJhcnIiLCJib29sZWFuVmFsdWUiLCJuZXdPYmoiLCJjdXJyZW50SWR4IiwiaSIsImxlbiIsImNvbnNvbGUiLCJsb2ciLCJzcGxpY2UiLCJjb25jYXQiXSwibWFwcGluZ3MiOiI7Ozs7OztRQUVnQkEsVyxHQUFBQSxXO1FBT0FDLE8sR0FBQUEsTztRQVNBQyxhLEdBQUFBLGE7UUFLQUMsWSxHQUFBQSxZO1FBa0RBQyxXLEdBQUFBLFc7UUFnQ0FDLFksR0FBQUEsWTtRQVFBQyxXLEdBQUFBLFc7UUFLQUMsUSxHQUFBQSxRO1FBT0FDLGlCLEdBQUFBLGlCOztBQTdIaEI7Ozs7OztBQUVPLFNBQVNSLFdBQVQsQ0FBcUJTLEtBQXJCLEVBQTRCO0FBQ2pDLE1BQUlDLFVBQVUsb0JBQWQ7QUFDQSxNQUFJLENBQUNBLFFBQVFDLElBQVIsQ0FBYUYsS0FBYixDQUFMLEVBQTBCLE9BQU8sS0FBUDtBQUMxQixTQUFPLElBQVA7QUFDRDs7QUFFRDtBQUNPLFNBQVNSLE9BQVQsQ0FBaUJXLEdBQWpCLEVBQW9DO0FBQUEsTUFBZEMsS0FBYyx1RUFBTixJQUFNOztBQUN6Q0MsS0FBR0MsU0FBSCxDQUFhO0FBQ1hDLFdBQU9KLEdBREk7QUFFWEssVUFBTSxNQUZLO0FBR1hDLGNBQVVMO0FBSEMsR0FBYjtBQUtEOztBQUVEO0FBQ08sU0FBU1gsYUFBVCxDQUF1QmlCLEdBQXZCLEVBQTRCO0FBQ2pDLFNBQVEsQ0FBQ0EsR0FBRCxJQUFRQSxJQUFJQyxNQUFKLEtBQWUsQ0FBdkIsSUFBNEIsUUFBUUMsSUFBUixDQUFhRixHQUFiLENBQXBDO0FBQ0Q7O0FBRUQ7QUFDTyxTQUFTaEIsWUFBVCxDQUFzQm1CLEtBQXRCLEVBQTZCO0FBQ2xDLE1BQUlDLEtBQUssSUFBSUMsSUFBSixFQUFUO0FBQ0EsTUFBSUMsTUFBTSxJQUFJRCxJQUFKLENBQVNGLFFBQVEsSUFBakIsQ0FBVjtBQUNBLE1BQUlJLFFBQVFILEdBQUdJLE9BQUgsRUFBWjtBQUNBLE1BQUlDLFFBQVFOLFFB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RSxJQUFJQyxHQUF0QyxFQUEyQ0QsR0FBM0MsRUFBZ0Q7QUFDOUMsUUFBSUosSUFBSUksQ0FBSixFQUFPbkMsU0FBUCxLQUFxQjhCLE9BQXpCLEVBQWtDO0FBQ2hDSSxtQkFBYUMsQ0FBYjtBQUNBO0FBQ0Q7QUFDRjtBQUNELE1BQUlILFlBQUosRUFBa0I7QUFDaEJLLFlBQVFDLEdBQVIsQ0FBWU4sWUFBWixFQUEwQkUsVUFBMUIsRUFBc0NILEdBQXRDO0FBQ0FNLFlBQVFDLEdBQVIsQ0FBWVAsSUFBSVEsTUFBSixDQUFXTCxVQUFYLEVBQXVCLENBQXZCLENBQVo7QUFDQSxXQUFPSCxJQUFJUSxNQUFKLENBQVdMLFVBQVgsRUFBdUIsQ0FBdkIsQ0FBUDtBQUNELEdBSkQsTUFJTztBQUNMLFdBQU9ILElBQUlTLE1BQUosQ0FBV1AsTUFBWCxDQUFQO0FBQ0Q7QUFDRixDQWZNIiwiZmlsZSI6ImNvbW1vbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja01vYmlsZShwaG9uZSkge1xuICBsZXQgcGF0dGVybiA9IC9eWzFdWzM0NTc4OV1cXGR7OX0kL1xuICBpZiAoIXBhdHRlcm4uZXhlYyhwaG9uZSkpIHJldHVybiBmYWxzZVxuICByZXR1cm4gdHJ1ZVxufVxuXG4vLyAy56eS6ZKf55qE5by556qXXG5leHBvcnQgZnVuY3Rpb24gc2hvd01zZyhtc2csIHRpbWVyID0gMjAwMCkge1xuICB3eC5zaG93VG9hc3Qoe1xuICAgIHRpdGxlOiBtc2csXG4gICAgaWNvbjogJ25vbmUnLFxuICAgIGR1cmF0aW9uOiB0aW1lclxuICB9KVxufVxuXG4vLyDmo4Dmn6XmmK/lkKbkuLrnqbrlrZfnrKbkuLJcbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5U3RyaW5nKHN0cikge1xuICByZXR1cm4gKCFzdHIgfHwgc3RyLmxlbmd0aCA9PT0gMCB8fCAvXlxccyokLy50ZXN0KHN0cikpXG59XG5cbi8vIOiOt+WPluaXtumXtOaIs1xuZXhwb3J0IGZ1bmN0aW9uIGZyaWVuZGx5RGF0ZShzdGltZSkge1xuICB2YXIgZGEgPSBuZXcgRGF0ZSgpXG4gIHZhciBzZGEgPSBuZXcgRGF0ZShzdGltZSAqIDEwMDApXG4gIHZhciB0aW1lMiA9IGRhLmdldFRpbWUoKVxuICB2YXIgdGltZTEgPSBzdGltZSAqIDEwMDBcbiAgdmFyIHRpbWUgPSAwXG4gIGlmICh0aW1lMSA+IHRpbWUyKSB7XG4gICAgdGltZSA9IHRpbWUxIC0gdGltZTJcbiAgICBzZGEgPSBkYVxuICB9IGVsc2Uge1xuICAgIHRpbWUgPSB0aW1lMiAtIHRpbWUxXG4gIH1cbiAgaWYgKHRpbWUgPCAxMDAwKSByZXR1cm4gJ+WImuWImidcbiAgdGltZSA9IHBhcnNlSW50KHRpbWUgLyAxMDAwKVxuICBpZiAodGltZSA+IDg2NDAwKSB7XG4gICAgdmFyIGRheSA9IHBhcnNlSW50KHRpbWUgLyAoMjQgKiA2MCAqIDYwKSlcbiAgICBpZiAoZGF5ID09PSAxKSB7XG4gICAgICByZXR1cm4gJ+aYqOWkqSAnICsgc2RhLmdldEhvdXJzKCkgKyAnOicgKyBzZGEuZ2V0TWludXRlcygpXG4gICAgfSBlbHNlIGlmIChkYXkgPiAxICYmIGRheSA8IDM2NSkge1xuICAgICAgdmFyIG1vbnRoID0gc2RhLmdldE1vbnRoKCkgKyAxXG4gICAgICB2YXIgZGF0ZSA9IHNkYS5nZXREYXRlKClcbiAgICAgIGlmIChtb250aCA8PSA5KSB7XG4gICAgICAgIG1vbnRoID0gJzAnICsgbW9udGhcbiAgICAgIH1cbiAgICAgIGlmIChkYXRlIDw9IDkpIHtcbiAgICAgICAgZGF0ZSA9ICcwJyArIGRhdGVcbiAgICAgIH1cbiAgICAgIHJldHVybiBtb250aCArICctJyArIGRhdGVcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIG1vbnRoID0gc2RhLmdldE1vbnRoKCkgKyAxXG4gICAgICB2YXIgZGF0ZSA9IHNkYS5nZXREYXRlKClcbiAgICAgIGlmIChtb250aCA8PSA5KSB7XG4gICAgICAgIG1vbnRoID0gJzAnICsgbW9udGhcbiAgICAgIH1cbiAgICAgIGlmIChkYXRlIDw9IDkpIHtcbiAgICAgICAgZGF0ZSA9ICcwJyArIGRhdGVcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZGEuZ2V0RnVsbFllYXIoKSArICctJyArIG1vbnRoICsgXCItXCIgKyBkYXRlXG4gICAgfVxuICB9IGVsc2UgaWYgKHRpbWUgPiAzNjAwKSB7XG4gICAgdmFyIGhvdXIgPSBwYXJzZUludCh0aW1lIC8gKDYwICogNjApKVxuICAgIHJldHVybiBob3VyICsgJ+Wwj+aXtuWJjSdcbiAgfSBlbHNlIGlmICh0aW1lID4gNjApIHtcbiAgICB2YXIgaG91ciA9IHBhcnNlSW50KHRpbWUgLyA2MClcbiAgICByZXR1cm4gaG91ciArICfliIbpkp/liY0nXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRpbWUgKyAn56eS5YmNJ1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGxvYWRJbWFnZSgpIHtcbiAgY29uc3QgbWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3eC5jaG9vc2VJbWFnZSh7XG4gICAgICBjb3VudDogMSxcbiAgICAgIHNpemVUeXBlOiBbJ29yaWdpbmFsJywgJ2NvbXByZXNzZWQnXSxcbiAgICAgIHNvdXJjZVR5cGU6IFsnYWxidW0nLCAnY2FtZXJhJ10sXG4gICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICBjb25zdCB0ZW1wRmlsZVBhdGhzID0gcmVzLnRlbXBGaWxlUGF0aHNcbiAgICAgICAgd3guc2hvd0xvYWRpbmcoKVxuICAgICAgICB3eC51cGxvYWRGaWxlKHtcbiAgICAgICAgICB1cmw6ICdodHRwczovL3Rlc3QuY3Rqd2guY29tL2FwaS92MS9maWxlL3VwbG9hZFBpYycsXG4gICAgICAgICAgZmlsZVBhdGg6IHRlbXBGaWxlUGF0aHNbMF0sXG4gICAgICAgICAgZm9ybURhdGE6IHtcbiAgICAgICAgICAgICdtZW1iZXJfaWQnOiBtZW1iZXJJbmZvLm1lbWJlcl9pZCxcbiAgICAgICAgICAgICdtZW1iZXJfdG9rZW4nOiBtZW1iZXJJbmZvLm1lbWJlcl90b2tlbixcbiAgICAgICAgICAgICdmb2xkZXInOiAnY29tbWl0dGVlJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSlcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IGRhdGEuZGF0YS5maWxlX3VybFxuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgICAgICAgcmVzb2x2ZSh1cmwpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOWbvueJh+aUvuWkp+WKn+iDvVxuZXhwb3J0IGZ1bmN0aW9uIHByZXZpZXdJbWFnZShzcmMsIGltZ0xpc3QpIHtcbiAgd3gucHJldmlld0ltYWdlKHtcbiAgICBjdXJyZW50OiBzcmMsXG4gICAgdXJsczogaW1nTGlzdFxuICB9KVxufVxuXG4vLyDlj6rojrflj5bml6XmnJ9cbmV4cG9ydCBmdW5jdGlvbiBnZXRPbmx5RGF0ZSh0aW1lU3RyKSB7XG4gIHJldHVybiB0aW1lU3RyLnNwbGl0KCcgJylbMF1cbn1cblxuLy8g5Ye95pWw6IqC5rWBXG5leHBvcnQgZnVuY3Rpb24gdGhyb3R0bGUobWV0aG9kLCBjb250ZXh0ID0gd2luZG93LCB0aW1lciA9IDMwMCkge1xuICBjbGVhclRpbWVvdXQobWV0aG9kLnRJZClcbiAgbWV0aG9kLnRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIG1ldGhvZC5jYWxsKGNvbnRleHQpXG4gIH0sIHRpbWVyKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tIYXNKb2luQ2xhc3MoY2xhc3NJZCwgY2xhc3NMaXN0KSB7XG4gIGxldCByZXR1cm5BcnJheSA9IGNsYXNzTGlzdC5maWx0ZXIoaXRlbSA9PiBOdW1iZXIoaXRlbS5jbGFzcy5pZCkgPT09IE51bWJlcihjbGFzc0lkKSlcbiAgcmV0dXJuICEhcmV0dXJuQXJyYXkubGVuZ3RoXG59XG5cbmV4cG9ydCBjb25zdCBmaWx0ZXJBcnJheUJ5VmFsdWUgPSAoa2V5TmFtZSwgYXJyLCBib29sZWFuVmFsdWUsIG5ld09iaikgPT4ge1xuICBsZXQgY3VycmVudElkeCA9IC0xXG4gIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhcnIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoYXJyW2ldLm1lbWJlcl9pZCA9PT0ga2V5TmFtZSkge1xuICAgICAgY3VycmVudElkeCA9IGlcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG4gIGlmIChib29sZWFuVmFsdWUpIHtcbiAgICBjb25zb2xlLmxvZyhib29sZWFuVmFsdWUsIGN1cnJlbnRJZHgsIGFycilcbiAgICBjb25zb2xlLmxvZyhhcnIuc3BsaWNlKGN1cnJlbnRJZHgsIDEpKVxuICAgIHJldHVybiBhcnIuc3BsaWNlKGN1cnJlbnRJZHgsIDEpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGFyci5jb25jYXQobmV3T2JqKVxuICB9XG59XG4iXX0=