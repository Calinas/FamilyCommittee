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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi5qcyJdLCJuYW1lcyI6WyJjaGVja01vYmlsZSIsInNob3dNc2ciLCJpc0VtcHR5U3RyaW5nIiwiZnJpZW5kbHlEYXRlIiwidXBsb2FkSW1hZ2UiLCJwcmV2aWV3SW1hZ2UiLCJnZXRPbmx5RGF0ZSIsInRocm90dGxlIiwiY2hlY2tIYXNKb2luQ2xhc3MiLCJwaG9uZSIsInBhdHJuIiwiZXhlYyIsIm1zZyIsInRpbWVyIiwid3giLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsInN0ciIsImxlbmd0aCIsInRlc3QiLCJzdGltZSIsImRhIiwiRGF0ZSIsInNkYSIsInRpbWUyIiwiZ2V0VGltZSIsInRpbWUxIiwidGltZSIsInBhcnNlSW50IiwiZGF5IiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwibW9udGgiLCJnZXRNb250aCIsImRhdGUiLCJnZXREYXRlIiwiZ2V0RnVsbFllYXIiLCJob3VyIiwibWVtYmVySW5mbyIsImdldFN0b3JhZ2VTeW5jIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJjaG9vc2VJbWFnZSIsImNvdW50Iiwic2l6ZVR5cGUiLCJzb3VyY2VUeXBlIiwic3VjY2VzcyIsInRlbXBGaWxlUGF0aHMiLCJyZXMiLCJzaG93TG9hZGluZyIsInVwbG9hZEZpbGUiLCJ1cmwiLCJmaWxlUGF0aCIsImZvcm1EYXRhIiwibWVtYmVyX2lkIiwibWVtYmVyX3Rva2VuIiwibmFtZSIsImRhdGEiLCJKU09OIiwicGFyc2UiLCJmaWxlX3VybCIsImhpZGVMb2FkaW5nIiwic3JjIiwiaW1nTGlzdCIsImN1cnJlbnQiLCJ1cmxzIiwidGltZVN0ciIsInNwbGl0IiwibWV0aG9kIiwiY29udGV4dCIsIndpbmRvdyIsImNsZWFyVGltZW91dCIsInRJZCIsInNldFRpbWVvdXQiLCJjYWxsIiwiY2xhc3NJZCIsImNsYXNzTGlzdCIsInJldHVybkFycmF5IiwiZmlsdGVyIiwiTnVtYmVyIiwiaXRlbSIsImNsYXNzIiwiaWQiLCJmaWx0ZXJBcnJheUJ5VmFsdWUiLCJrZXlOYW1lIiwiYXJyIiwiYm9vbGVhblZhbHVlIiwibmV3T2JqIiwiY3VycmVudElkeCIsImkiLCJsZW4iLCJjb25zb2xlIiwibG9nIiwic3BsaWNlIiwiY29uY2F0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7UUFFZ0JBLFcsR0FBQUEsVztRQU9BQyxPLEdBQUFBLE87UUFTQUMsYSxHQUFBQSxhO1FBS0FDLFksR0FBQUEsWTtRQWtEQUMsVyxHQUFBQSxXO1FBZ0NBQyxZLEdBQUFBLFk7UUFRQUMsVyxHQUFBQSxXO1FBS0FDLFEsR0FBQUEsUTtRQU9BQyxpQixHQUFBQSxpQjs7QUE3SGhCOzs7Ozs7QUFFTyxTQUFTUixXQUFULENBQXFCUyxLQUFyQixFQUE0QjtBQUNqQyxNQUFJQyxRQUFRLG9CQUFaO0FBQ0EsTUFBSSxDQUFDQSxNQUFNQyxJQUFOLENBQVdGLEtBQVgsQ0FBTCxFQUF3QixPQUFPLEtBQVA7QUFDeEIsU0FBTyxJQUFQO0FBQ0Q7O0FBRUQ7QUFDTyxTQUFTUixPQUFULENBQWlCVyxHQUFqQixFQUFvQztBQUFBLE1BQWRDLEtBQWMsdUVBQU4sSUFBTTs7QUFDekNDLEtBQUdDLFNBQUgsQ0FBYTtBQUNYQyxXQUFPSixHQURJO0FBRVhLLFVBQU0sTUFGSztBQUdYQyxjQUFVTDtBQUhDLEdBQWI7QUFLRDs7QUFFRDtBQUNPLFNBQVNYLGFBQVQsQ0FBdUJpQixHQUF2QixFQUE0QjtBQUNqQyxTQUFRLENBQUNBLEdBQUQsSUFBUUEsSUFBSUMsTUFBSixLQUFlLENBQXZCLElBQTRCLFFBQVFDLElBQVIsQ0FBYUYsR0FBYixDQUFwQztBQUNEOztBQUVEO0FBQ08sU0FBU2hCLFlBQVQsQ0FBc0JtQixLQUF0QixFQUE2QjtBQUNsQyxNQUFJQyxLQUFLLElBQUlDLElBQUosRUFBVDtBQUNBLE1BQUlDLE1BQU0sSUFBSUQsSUFBSixDQUFTRixRQUFRLElBQWpCLENBQVY7QUFDQSxNQUFJSSxRQUFRSCxHQUFHSSxPQUFILEVBQVo7QUFDQSxNQUFJQyxRQUFRTixRQUFR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SUFBSUMsR0FBdEMsRUFBMkNELEdBQTNDLEVBQWdEO0FBQzlDLFFBQUlKLElBQUlJLENBQUosRUFBT25DLFNBQVAsS0FBcUI4QixPQUF6QixFQUFrQztBQUNoQ0ksbUJBQWFDLENBQWI7QUFDQTtBQUNEO0FBQ0Y7QUFDRCxNQUFJSCxZQUFKLEVBQWtCO0FBQ2hCSyxZQUFRQyxHQUFSLENBQVlOLFlBQVosRUFBMEJFLFVBQTFCLEVBQXNDSCxHQUF0QztBQUNBTSxZQUFRQyxHQUFSLENBQVlQLElBQUlRLE1BQUosQ0FBV0wsVUFBWCxFQUF1QixDQUF2QixDQUFaO0FBQ0EsV0FBT0gsSUFBSVEsTUFBSixDQUFXTCxVQUFYLEVBQXVCLENBQXZCLENBQVA7QUFDRCxHQUpELE1BSU87QUFDTCxXQUFPSCxJQUFJUyxNQUFKLENBQVdQLE1BQVgsQ0FBUDtBQUNEO0FBQ0YsQ0FmTSIsImZpbGUiOiJjb21tb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tNb2JpbGUocGhvbmUpIHtcbiAgbGV0IHBhdHJuID0gL15bMV1bMzQ1Nzg5XVxcZHs5fSQvXG4gIGlmICghcGF0cm4uZXhlYyhwaG9uZSkpIHJldHVybiBmYWxzZVxuICByZXR1cm4gdHJ1ZVxufVxuXG4vLyAy56eS6ZKf55qE5by556qXXG5leHBvcnQgZnVuY3Rpb24gc2hvd01zZyhtc2csIHRpbWVyID0gMjAwMCkge1xuICB3eC5zaG93VG9hc3Qoe1xuICAgIHRpdGxlOiBtc2csXG4gICAgaWNvbjogJ25vbmUnLFxuICAgIGR1cmF0aW9uOiB0aW1lclxuICB9KVxufVxuXG4vLyDmo4Dmn6XmmK/lkKbkuLrnqbrlrZfnrKbkuLJcbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5U3RyaW5nKHN0cikge1xuICByZXR1cm4gKCFzdHIgfHwgc3RyLmxlbmd0aCA9PT0gMCB8fCAvXlxccyokLy50ZXN0KHN0cikpXG59XG5cbi8vIOiOt+WPluaXtumXtOaIs1xuZXhwb3J0IGZ1bmN0aW9uIGZyaWVuZGx5RGF0ZShzdGltZSkge1xuICB2YXIgZGEgPSBuZXcgRGF0ZSgpXG4gIHZhciBzZGEgPSBuZXcgRGF0ZShzdGltZSAqIDEwMDApXG4gIHZhciB0aW1lMiA9IGRhLmdldFRpbWUoKVxuICB2YXIgdGltZTEgPSBzdGltZSAqIDEwMDBcbiAgdmFyIHRpbWUgPSAwXG4gIGlmICh0aW1lMSA+IHRpbWUyKSB7XG4gICAgdGltZSA9IHRpbWUxIC0gdGltZTJcbiAgICBzZGEgPSBkYVxuICB9IGVsc2Uge1xuICAgIHRpbWUgPSB0aW1lMiAtIHRpbWUxXG4gIH1cbiAgaWYgKHRpbWUgPCAxMDAwKSByZXR1cm4gJ+WImuWImidcbiAgdGltZSA9IHBhcnNlSW50KHRpbWUgLyAxMDAwKVxuICBpZiAodGltZSA+IDg2NDAwKSB7XG4gICAgdmFyIGRheSA9IHBhcnNlSW50KHRpbWUgLyAoMjQgKiA2MCAqIDYwKSlcbiAgICBpZiAoZGF5ID09PSAxKSB7XG4gICAgICByZXR1cm4gJ+aYqOWkqSAnICsgc2RhLmdldEhvdXJzKCkgKyAnOicgKyBzZGEuZ2V0TWludXRlcygpXG4gICAgfSBlbHNlIGlmIChkYXkgPiAxICYmIGRheSA8IDM2NSkge1xuICAgICAgdmFyIG1vbnRoID0gc2RhLmdldE1vbnRoKCkgKyAxXG4gICAgICB2YXIgZGF0ZSA9IHNkYS5nZXREYXRlKClcbiAgICAgIGlmIChtb250aCA8PSA5KSB7XG4gICAgICAgIG1vbnRoID0gJzAnICsgbW9udGhcbiAgICAgIH1cbiAgICAgIGlmIChkYXRlIDw9IDkpIHtcbiAgICAgICAgZGF0ZSA9ICcwJyArIGRhdGVcbiAgICAgIH1cbiAgICAgIHJldHVybiBtb250aCArICctJyArIGRhdGVcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIG1vbnRoID0gc2RhLmdldE1vbnRoKCkgKyAxXG4gICAgICB2YXIgZGF0ZSA9IHNkYS5nZXREYXRlKClcbiAgICAgIGlmIChtb250aCA8PSA5KSB7XG4gICAgICAgIG1vbnRoID0gJzAnICsgbW9udGhcbiAgICAgIH1cbiAgICAgIGlmIChkYXRlIDw9IDkpIHtcbiAgICAgICAgZGF0ZSA9ICcwJyArIGRhdGVcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZGEuZ2V0RnVsbFllYXIoKSArICctJyArIG1vbnRoICsgXCItXCIgKyBkYXRlXG4gICAgfVxuICB9IGVsc2UgaWYgKHRpbWUgPiAzNjAwKSB7XG4gICAgdmFyIGhvdXIgPSBwYXJzZUludCh0aW1lIC8gKDYwICogNjApKVxuICAgIHJldHVybiBob3VyICsgJ+Wwj+aXtuWJjSdcbiAgfSBlbHNlIGlmICh0aW1lID4gNjApIHtcbiAgICB2YXIgaG91ciA9IHBhcnNlSW50KHRpbWUgLyA2MClcbiAgICByZXR1cm4gaG91ciArICfliIbpkp/liY0nXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRpbWUgKyAn56eS5YmNJ1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGxvYWRJbWFnZSgpIHtcbiAgY29uc3QgbWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3eC5jaG9vc2VJbWFnZSh7XG4gICAgICBjb3VudDogMSxcbiAgICAgIHNpemVUeXBlOiBbJ29yaWdpbmFsJywgJ2NvbXByZXNzZWQnXSxcbiAgICAgIHNvdXJjZVR5cGU6IFsnYWxidW0nLCAnY2FtZXJhJ10sXG4gICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICBjb25zdCB0ZW1wRmlsZVBhdGhzID0gcmVzLnRlbXBGaWxlUGF0aHNcbiAgICAgICAgd3guc2hvd0xvYWRpbmcoKVxuICAgICAgICB3eC51cGxvYWRGaWxlKHtcbiAgICAgICAgICB1cmw6ICdodHRwczovL3Rlc3QuY3Rqd2guY29tL2FwaS92MS9maWxlL3VwbG9hZFBpYycsXG4gICAgICAgICAgZmlsZVBhdGg6IHRlbXBGaWxlUGF0aHNbMF0sXG4gICAgICAgICAgZm9ybURhdGE6IHtcbiAgICAgICAgICAgICdtZW1iZXJfaWQnOiBtZW1iZXJJbmZvLm1lbWJlcl9pZCxcbiAgICAgICAgICAgICdtZW1iZXJfdG9rZW4nOiBtZW1iZXJJbmZvLm1lbWJlcl90b2tlbixcbiAgICAgICAgICAgICdmb2xkZXInOiAnY29tbWl0dGVlJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSlcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IGRhdGEuZGF0YS5maWxlX3VybFxuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgICAgICAgcmVzb2x2ZSh1cmwpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOWbvueJh+aUvuWkp+WKn+iDvVxuZXhwb3J0IGZ1bmN0aW9uIHByZXZpZXdJbWFnZShzcmMsIGltZ0xpc3QpIHtcbiAgd3gucHJldmlld0ltYWdlKHtcbiAgICBjdXJyZW50OiBzcmMsXG4gICAgdXJsczogaW1nTGlzdFxuICB9KVxufVxuXG4vLyDlj6rojrflj5bml6XmnJ9cbmV4cG9ydCBmdW5jdGlvbiBnZXRPbmx5RGF0ZSh0aW1lU3RyKSB7XG4gIHJldHVybiB0aW1lU3RyLnNwbGl0KCcgJylbMF1cbn1cblxuLy8g5Ye95pWw6IqC5rWBXG5leHBvcnQgZnVuY3Rpb24gdGhyb3R0bGUobWV0aG9kLCBjb250ZXh0ID0gd2luZG93LCB0aW1lciA9IDMwMCkge1xuICBjbGVhclRpbWVvdXQobWV0aG9kLnRJZClcbiAgbWV0aG9kLnRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIG1ldGhvZC5jYWxsKGNvbnRleHQpXG4gIH0sIHRpbWVyKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tIYXNKb2luQ2xhc3MoY2xhc3NJZCwgY2xhc3NMaXN0KSB7XG4gIGxldCByZXR1cm5BcnJheSA9IGNsYXNzTGlzdC5maWx0ZXIoaXRlbSA9PiBOdW1iZXIoaXRlbS5jbGFzcy5pZCkgPT09IE51bWJlcihjbGFzc0lkKSlcbiAgcmV0dXJuICEhcmV0dXJuQXJyYXkubGVuZ3RoXG59XG5cbmV4cG9ydCBjb25zdCBmaWx0ZXJBcnJheUJ5VmFsdWUgPSAoa2V5TmFtZSwgYXJyLCBib29sZWFuVmFsdWUsIG5ld09iaikgPT4ge1xuICBsZXQgY3VycmVudElkeCA9IC0xXG4gIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhcnIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoYXJyW2ldLm1lbWJlcl9pZCA9PT0ga2V5TmFtZSkge1xuICAgICAgY3VycmVudElkeCA9IGlcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG4gIGlmIChib29sZWFuVmFsdWUpIHtcbiAgICBjb25zb2xlLmxvZyhib29sZWFuVmFsdWUsIGN1cnJlbnRJZHgsIGFycilcbiAgICBjb25zb2xlLmxvZyhhcnIuc3BsaWNlKGN1cnJlbnRJZHgsIDEpKVxuICAgIHJldHVybiBhcnIuc3BsaWNlKGN1cnJlbnRJZHgsIDEpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGFyci5jb25jYXQobmV3T2JqKVxuICB9XG59XG4iXX0=