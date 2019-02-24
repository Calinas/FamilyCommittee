'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addAuth = addAuth;
exports.getAuth = getAuth;
exports.authList = authList;
exports.searchMember = searchMember;
exports.deleteAuth = deleteAuth;
exports.changeCode = changeCode;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _commonData = require('./commonData.js');

var _commonData2 = _interopRequireDefault(_commonData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 添加班级权限
function addAuth(data) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/class/auth/add',
      data: Object.assign({}, (0, _commonData2.default)(), {
        class_id: data.class_id,
        role_id: data.role_id,
        join_member_id: data.join_member_id
      }),
      method: 'post'
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 获取我的班级权限列表
function getAuth(data) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/member/auth',
      data: Object.assign({}, (0, _commonData2.default)(), {
        class_id: data.class_id
      })
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 获取所有权限列表
function authList(data) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/class/auth/index',
      data: Object.assign({}, (0, _commonData2.default)(), {
        class_id: data.class_id
      })
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 搜索家长名称
function searchMember(data) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/class/searchMember',
      data: Object.assign({}, (0, _commonData2.default)(), {
        class_id: data.class_id,
        keywords: data.keywords
      })
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 删除班级角色权限
function deleteAuth(data) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/class/auth/delete',
      data: Object.assign({}, (0, _commonData2.default)(), {
        class_id: data.class_id,
        class_auth_id: data.class_auth_id
      }),
      method: 'post'
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 修改班级验证码
function changeCode(params) {
  return new Promise(function (resolve) {
    _wepy2.default.request({
      url: '/class/updateJoinKey',
      data: Object.assign({}, (0, _commonData2.default)(), {
        class_id: params.class_id,
        join_key: params.join_key
      }),
      method: 'post'
    }).then(function (res) {
      resolve(res);
    });
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGhvcml6ZS5qcyJdLCJuYW1lcyI6WyJhZGRBdXRoIiwiZ2V0QXV0aCIsImF1dGhMaXN0Iiwic2VhcmNoTWVtYmVyIiwiZGVsZXRlQXV0aCIsImNoYW5nZUNvZGUiLCJkYXRhIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ3ZXB5IiwicmVxdWVzdCIsInVybCIsIk9iamVjdCIsImFzc2lnbiIsImNsYXNzX2lkIiwicm9sZV9pZCIsImpvaW5fbWVtYmVyX2lkIiwibWV0aG9kIiwidGhlbiIsInJlcyIsImtleXdvcmRzIiwiY2xhc3NfYXV0aF9pZCIsInBhcmFtcyIsImpvaW5fa2V5Il0sIm1hcHBpbmdzIjoiOzs7OztRQUlnQkEsTyxHQUFBQSxPO1FBaUJBQyxPLEdBQUFBLE87UUFjQUMsUSxHQUFBQSxRO1FBY0FDLFksR0FBQUEsWTtRQWVBQyxVLEdBQUFBLFU7UUFnQkFDLFUsR0FBQUEsVTs7QUFoRmhCOzs7O0FBQ0E7Ozs7OztBQUVBO0FBQ08sU0FBU0wsT0FBVCxDQUFpQk0sSUFBakIsRUFBdUI7QUFDNUIsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLFdBQUssaUJBRE07QUFFWE4sWUFBTU8sT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsMkJBQWxCLEVBQWtDO0FBQ3RDQyxrQkFBVVQsS0FBS1MsUUFEdUI7QUFFdENDLGlCQUFTVixLQUFLVSxPQUZ3QjtBQUd0Q0Msd0JBQWdCWCxLQUFLVztBQUhpQixPQUFsQyxDQUZLO0FBT1hDLGNBQVE7QUFQRyxLQUFiLEVBUUdDLElBUkgsQ0FRUSxlQUFPO0FBQ2JYLGNBQVFZLEdBQVI7QUFDRCxLQVZEO0FBV0QsR0FaTSxDQUFQO0FBYUQ7O0FBRUQ7QUFDTyxTQUFTbkIsT0FBVCxDQUFpQkssSUFBakIsRUFBdUI7QUFDNUIsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLFdBQUssY0FETTtBQUVYTixZQUFNTyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQiwyQkFBbEIsRUFBa0M7QUFDdENDLGtCQUFVVCxLQUFLUztBQUR1QixPQUFsQztBQUZLLEtBQWIsRUFLR0ksSUFMSCxDQUtRLGVBQU87QUFDYlgsY0FBUVksR0FBUjtBQUNELEtBUEQ7QUFRRCxHQVRNLENBQVA7QUFVRDs7QUFFRDtBQUNPLFNBQVNsQixRQUFULENBQWtCSSxJQUFsQixFQUF3QjtBQUM3QixTQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLG1CQUFLQyxPQUFMLENBQWE7QUFDWEMsV0FBSyxtQkFETTtBQUVYTixZQUFNTyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQiwyQkFBbEIsRUFBa0M7QUFDdENDLGtCQUFVVCxLQUFLUztBQUR1QixPQUFsQztBQUZLLEtBQWIsRUFLR0ksSUFMSCxDQUtRLGVBQU87QUFDYlgsY0FBUVksR0FBUjtBQUNELEtBUEQ7QUFRRCxHQVRNLENBQVA7QUFVRDs7QUFFRDtBQUNPLFNBQVNqQixZQUFULENBQXNCRyxJQUF0QixFQUE0QjtBQUNqQyxTQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLG1CQUFLQyxPQUFMLENBQWE7QUFDWEMsV0FBSyxxQkFETTtBQUVYTixZQUFNTyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQiwyQkFBbEIsRUFBa0M7QUFDdENDLGtCQUFVVCxLQUFLUyxRQUR1QjtBQUV0Q00sa0JBQVVmLEtBQUtlO0FBRnVCLE9BQWxDO0FBRkssS0FBYixFQU1HRixJQU5ILENBTVEsZUFBTztBQUNiWCxjQUFRWSxHQUFSO0FBQ0QsS0FSRDtBQVNELEdBVk0sQ0FBUDtBQVdEOztBQUVEO0FBQ08sU0FBU2hCLFVBQVQsQ0FBb0JFLElBQXBCLEVBQTBCO0FBQy9CLFNBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q0MsbUJBQUtDLE9BQUwsQ0FBYTtBQUNYQyxXQUFLLG9CQURNO0FBRVhOLFlBQU1PLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLDJCQUFsQixFQUFrQztBQUN0Q0Msa0JBQVVULEtBQUtTLFFBRHVCO0FBRXRDTyx1QkFBZWhCLEtBQUtnQjtBQUZrQixPQUFsQyxDQUZLO0FBTVhKLGNBQVE7QUFORyxLQUFiLEVBT0dDLElBUEgsQ0FPUSxlQUFPO0FBQ2JYLGNBQVFZLEdBQVI7QUFDRCxLQVREO0FBVUQsR0FYTSxDQUFQO0FBWUQ7O0FBRUQ7QUFDTyxTQUFTZixVQUFULENBQW9Ca0IsTUFBcEIsRUFBNEI7QUFDakMsU0FBTyxJQUFJaEIsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBYTtBQUM5QkUsbUJBQUtDLE9BQUwsQ0FBYTtBQUNYQyxXQUFLLHNCQURNO0FBRVhOLFlBQU1PLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLDJCQUFsQixFQUFrQztBQUN0Q0Msa0JBQVVRLE9BQU9SLFFBRHFCO0FBRXRDUyxrQkFBVUQsT0FBT0M7QUFGcUIsT0FBbEMsQ0FGSztBQU1YTixjQUFRO0FBTkcsS0FBYixFQU9HQyxJQVBILENBT1EsZUFBTztBQUNiWCxjQUFRWSxHQUFSO0FBQ0QsS0FURDtBQVVELEdBWE0sQ0FBUDtBQVlEIiwiZmlsZSI6ImF1dGhvcml6ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgY29tbW9uUGFyYW1zIGZyb20gJy4vY29tbW9uRGF0YSdcblxuLy8g5re75Yqg54+t57qn5p2D6ZmQXG5leHBvcnQgZnVuY3Rpb24gYWRkQXV0aChkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9jbGFzcy9hdXRoL2FkZCcsXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xuICAgICAgICBjbGFzc19pZDogZGF0YS5jbGFzc19pZCxcbiAgICAgICAgcm9sZV9pZDogZGF0YS5yb2xlX2lkLFxuICAgICAgICBqb2luX21lbWJlcl9pZDogZGF0YS5qb2luX21lbWJlcl9pZFxuICAgICAgfSksXG4gICAgICBtZXRob2Q6ICdwb3N0J1xuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOiOt+WPluaIkeeahOePree6p+adg+mZkOWIl+ihqFxuZXhwb3J0IGZ1bmN0aW9uIGdldEF1dGgoZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvbWVtYmVyL2F1dGgnLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWRcbiAgICAgIH0pXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLy8g6I635Y+W5omA5pyJ5p2D6ZmQ5YiX6KGoXG5leHBvcnQgZnVuY3Rpb24gYXV0aExpc3QoZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvY2xhc3MvYXV0aC9pbmRleCcsXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xuICAgICAgICBjbGFzc19pZDogZGF0YS5jbGFzc19pZFxuICAgICAgfSlcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDmkJzntKLlrrbplb/lkI3np7BcbmV4cG9ydCBmdW5jdGlvbiBzZWFyY2hNZW1iZXIoZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvY2xhc3Mvc2VhcmNoTWVtYmVyJyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxuICAgICAgICBrZXl3b3JkczogZGF0YS5rZXl3b3Jkc1xuICAgICAgfSlcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDliKDpmaTnj63nuqfop5LoibLmnYPpmZBcbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVBdXRoKGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2NsYXNzL2F1dGgvZGVsZXRlJyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxuICAgICAgICBjbGFzc19hdXRoX2lkOiBkYXRhLmNsYXNzX2F1dGhfaWRcbiAgICAgIH0pLFxuICAgICAgbWV0aG9kOiAncG9zdCdcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDkv67mlLnnj63nuqfpqozor4HnoIFcbmV4cG9ydCBmdW5jdGlvbiBjaGFuZ2VDb2RlKHBhcmFtcykge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2NsYXNzL3VwZGF0ZUpvaW5LZXknLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcbiAgICAgICAgY2xhc3NfaWQ6IHBhcmFtcy5jbGFzc19pZCxcbiAgICAgICAgam9pbl9rZXk6IHBhcmFtcy5qb2luX2tleVxuICAgICAgfSksXG4gICAgICBtZXRob2Q6ICdwb3N0J1xuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG4iXX0=