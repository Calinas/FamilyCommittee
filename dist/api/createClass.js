'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSchool = exports.getCityList = undefined;
exports.schoolList = schoolList;
exports.addClass = addClass;
exports.joinClass = joinClass;
exports.getClassList = getClassList;
exports.searchClass = searchClass;
exports.getCityInfo = getCityInfo;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _commonData = require('./commonData.js');

var _commonData2 = _interopRequireDefault(_commonData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 获取学校列表
function schoolList(params) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/school/index',
      data: Object.assign({}, (0, _commonData2.default)(), {
        keywords: params.keywords,
        pn: 1,
        ps: 100,
        city_name: params.city_name
      })
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 创建班级
function addClass(data) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/class/addClass',
      data: Object.assign({}, (0, _commonData2.default)(), {
        school_id: data.school_id,
        grade_type: data.grade_type,
        year_class: data.year_class,
        class: data.class,
        item: data.item
      }),
      method: 'post'
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 加入班级
function joinClass(data) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/member/class/join',
      data: Object.assign({}, (0, _commonData2.default)(), {
        class_id: data.class_id,
        join_key: data.join_key
      }),
      method: 'post'
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 获取班级列表
function getClassList(data) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/member/class/index',
      data: Object.assign({}, (0, _commonData2.default)(), {
        ps: 100
      })
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 班级查询
function searchClass(params) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/class/search',
      data: Object.assign({}, (0, _commonData2.default)(), {
        school_id: params.school_id,
        grade_type: params.grade,
        year_class: params.year,
        class: params.class
      })
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 根据经纬度查询城市名称
function getCityInfo(params) {
  return new Promise(function (resolve) {
    _wepy2.default.request({
      url: '/system/regeocode',
      data: Object.assign({}, (0, _commonData2.default)(), {
        lat: params.lat,
        lng: params.lng
      })
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 获取城市列表
var getCityList = exports.getCityList = function getCityList() {
  return new Promise(function (resolve) {
    _wepy2.default.request({
      url: '/system/getCityList'
    }).then(function (res) {
      resolve(res);
    });
  });
};

// 创建学校
var createSchool = exports.createSchool = function createSchool(params) {
  return new Promise(function (resolve) {
    _wepy2.default.request({
      url: '/school/add',
      data: Object.assign({}, {
        name: params.name,
        city_name: params.city_name
      }),
      method: 'post'
    }).then(function (res) {
      resolve(res);
    });
  });
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZUNsYXNzLmpzIl0sIm5hbWVzIjpbInNjaG9vbExpc3QiLCJhZGRDbGFzcyIsImpvaW5DbGFzcyIsImdldENsYXNzTGlzdCIsInNlYXJjaENsYXNzIiwiZ2V0Q2l0eUluZm8iLCJwYXJhbXMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIndlcHkiLCJyZXF1ZXN0IiwidXJsIiwiZGF0YSIsIk9iamVjdCIsImFzc2lnbiIsImtleXdvcmRzIiwicG4iLCJwcyIsImNpdHlfbmFtZSIsInRoZW4iLCJyZXMiLCJzY2hvb2xfaWQiLCJncmFkZV90eXBlIiwieWVhcl9jbGFzcyIsImNsYXNzIiwiaXRlbSIsIm1ldGhvZCIsImNsYXNzX2lkIiwiam9pbl9rZXkiLCJncmFkZSIsInllYXIiLCJsYXQiLCJsbmciLCJnZXRDaXR5TGlzdCIsImNyZWF0ZVNjaG9vbCIsIm5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7OztRQUlnQkEsVSxHQUFBQSxVO1FBaUJBQyxRLEdBQUFBLFE7UUFtQkFDLFMsR0FBQUEsUztRQWdCQUMsWSxHQUFBQSxZO1FBY0FDLFcsR0FBQUEsVztRQWlCQUMsVyxHQUFBQSxXOztBQXZGaEI7Ozs7QUFDQTs7Ozs7O0FBRUE7QUFDTyxTQUFTTCxVQUFULENBQW9CTSxNQUFwQixFQUE0QjtBQUNqQyxTQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLG1CQUFLQyxPQUFMLENBQWE7QUFDWEMsV0FBSyxlQURNO0FBRVhDLFlBQU1DLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLDJCQUFsQixFQUFrQztBQUN0Q0Msa0JBQVVWLE9BQU9VLFFBRHFCO0FBRXRDQyxZQUFJLENBRmtDO0FBR3RDQyxZQUFJLEdBSGtDO0FBSXRDQyxtQkFBV2IsT0FBT2E7QUFKb0IsT0FBbEM7QUFGSyxLQUFiLEVBUUdDLElBUkgsQ0FRUSxlQUFPO0FBQ2JaLGNBQVFhLEdBQVI7QUFDRCxLQVZEO0FBV0QsR0FaTSxD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QU07QUFDL0IsU0FBTyxJQUFJM0IsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBYTtBQUM5QkUsbUJBQUtDLE9BQUwsQ0FBYTtBQUNYQyxXQUFLO0FBRE0sS0FBYixFQUVHUSxJQUZILENBRVEsZUFBTztBQUNiWixjQUFRYSxHQUFSO0FBQ0QsS0FKRDtBQUtELEdBTk0sQ0FBUDtBQU9ELENBUk07O0FBVVA7QUFDTyxJQUFNYyxzQ0FBZSxTQUFmQSxZQUFlLENBQUM3QixNQUFELEVBQVk7QUFDdEMsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFhO0FBQzlCRSxtQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLFdBQUssYUFETTtBQUVYQyxZQUFNQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQjtBQUN0QnFCLGNBQU05QixPQUFPOEIsSUFEUztBQUV0QmpCLG1CQUFXYixPQUFPYTtBQUZJLE9BQWxCLENBRks7QUFNWFEsY0FBUTtBQU5HLEtBQWIsRUFPR1AsSUFQSCxDQU9RLGVBQU87QUFDYlosY0FBUWEsR0FBUjtBQUNELEtBVEQ7QUFVRCxHQVhNLENBQVA7QUFZRCxDQWJNIiwiZmlsZSI6ImNyZWF0ZUNsYXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCBjb21tb25QYXJhbXMgZnJvbSAnLi9jb21tb25EYXRhJ1xuXG4vLyDojrflj5blrabmoKHliJfooahcbmV4cG9ydCBmdW5jdGlvbiBzY2hvb2xMaXN0KHBhcmFtcykge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvc2Nob29sL2luZGV4JyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIGtleXdvcmRzOiBwYXJhbXMua2V5d29yZHMsXG4gICAgICAgIHBuOiAxLFxuICAgICAgICBwczogMTAwLFxuICAgICAgICBjaXR5X25hbWU6IHBhcmFtcy5jaXR5X25hbWVcbiAgICAgIH0pXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLy8g5Yib5bu654+t57qnXG5leHBvcnQgZnVuY3Rpb24gYWRkQ2xhc3MoZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvY2xhc3MvYWRkQ2xhc3MnLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcbiAgICAgICAgc2Nob29sX2lkOiBkYXRhLnNjaG9vbF9pZCxcbiAgICAgICAgZ3JhZGVfdHlwZTogZGF0YS5ncmFkZV90eXBlLFxuICAgICAgICB5ZWFyX2NsYXNzOiBkYXRhLnllYXJfY2xhc3MsXG4gICAgICAgIGNsYXNzOiBkYXRhLmNsYXNzLFxuICAgICAgICBpdGVtOiBkYXRhLml0ZW1cbiAgICAgIH0pLFxuICAgICAgbWV0aG9kOiAncG9zdCdcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDliqDlhaXnj63nuqdcbmV4cG9ydCBmdW5jdGlvbiBqb2luQ2xhc3MoZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvbWVtYmVyL2NsYXNzL2pvaW4nLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXG4gICAgICAgIGpvaW5fa2V5OiBkYXRhLmpvaW5fa2V5XG4gICAgICB9KSxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLy8g6I635Y+W54+t57qn5YiX6KGoXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2xhc3NMaXN0KGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL21lbWJlci9jbGFzcy9pbmRleCcsXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xuICAgICAgICBwczogMTAwXG4gICAgICB9KVxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOePree6p+afpeivolxuZXhwb3J0IGZ1bmN0aW9uIHNlYXJjaENsYXNzKHBhcmFtcykge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvY2xhc3Mvc2VhcmNoJyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIHNjaG9vbF9pZDogcGFyYW1zLnNjaG9vbF9pZCxcbiAgICAgICAgZ3JhZGVfdHlwZTogcGFyYW1zLmdyYWRlLFxuICAgICAgICB5ZWFyX2NsYXNzOiBwYXJhbXMueWVhcixcbiAgICAgICAgY2xhc3M6IHBhcmFtcy5jbGFzc1xuICAgICAgfSlcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDmoLnmja7nu4/nuqzluqbmn6Xor6Lln47luILlkI3np7BcbmV4cG9ydCBmdW5jdGlvbiBnZXRDaXR5SW5mbyhwYXJhbXMpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9zeXN0ZW0vcmVnZW9jb2RlJyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIGxhdDogcGFyYW1zLmxhdCxcbiAgICAgICAgbG5nOiBwYXJhbXMubG5nXG4gICAgICB9KVxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOiOt+WPluWfjuW4guWIl+ihqFxuZXhwb3J0IGNvbnN0IGdldENpdHlMaXN0ID0gKCkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL3N5c3RlbS9nZXRDaXR5TGlzdCdcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDliJvlu7rlrabmoKFcbmV4cG9ydCBjb25zdCBjcmVhdGVTY2hvb2wgPSAocGFyYW1zKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvc2Nob29sL2FkZCcsXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCB7XG4gICAgICAgIG5hbWU6IHBhcmFtcy5uYW1lLFxuICAgICAgICBjaXR5X25hbWU6IHBhcmFtcy5jaXR5X25hbWVcbiAgICAgIH0pLFxuICAgICAgbWV0aG9kOiAncG9zdCdcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuIl19