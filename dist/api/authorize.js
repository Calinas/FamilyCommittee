'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addAuth = addAuth;
exports.getAuth = getAuth;
exports.authList = authList;
exports.searchMember = searchMember;
exports.deleteAuth = deleteAuth;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGhvcml6ZS5qcyJdLCJuYW1lcyI6WyJhZGRBdXRoIiwiZ2V0QXV0aCIsImF1dGhMaXN0Iiwic2VhcmNoTWVtYmVyIiwiZGVsZXRlQXV0aCIsImRhdGEiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIndlcHkiLCJyZXF1ZXN0IiwidXJsIiwiT2JqZWN0IiwiYXNzaWduIiwiY2xhc3NfaWQiLCJyb2xlX2lkIiwiam9pbl9tZW1iZXJfaWQiLCJtZXRob2QiLCJ0aGVuIiwicmVzIiwia2V5d29yZHMiLCJjbGFzc19hdXRoX2lkIl0sIm1hcHBpbmdzIjoiOzs7OztRQUlnQkEsTyxHQUFBQSxPO1FBaUJBQyxPLEdBQUFBLE87UUFjQUMsUSxHQUFBQSxRO1FBY0FDLFksR0FBQUEsWTtRQWVBQyxVLEdBQUFBLFU7O0FBaEVoQjs7OztBQUNBOzs7Ozs7QUFFQTtBQUNPLFNBQVNKLE9BQVQsQ0FBaUJLLElBQWpCLEVBQXVCO0FBQzVCLFNBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q0MsbUJBQUtDLE9BQUwsQ0FBYTtBQUNYQyxXQUFLLGlCQURNO0FBRVhOLFlBQU1PLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLDJCQUFsQixFQUFrQztBQUN0Q0Msa0JBQVVULEtBQUtTLFFBRHVCO0FBRXRDQyxpQkFBU1YsS0FBS1UsT0FGd0I7QUFHdENDLHdCQUFnQlgsS0FBS1c7QUFIaUIsT0FBbEMsQ0FGSztBQU9YQyxjQUFRO0FBUEcsS0FBYixFQVFHQyxJQVJILENBUVEsZUFBTztBQUNiWCxjQUFRWSxHQUFSO0FBQ0QsS0FWRDtBQVdELEdBWk0sQ0FBUDtBQWFEOztBQUVEO0FBQ08sU0FBU2xCLE9BQVQsQ0FBaUJJLElBQWpCLEVBQXVCO0FBQzVCLFNBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q0MsbUJBQUtDLE9BQUwsQ0FBYTtBQUNYQyxXQUFLLGNBRE07QUFFWE4sWUFBTU8sT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsMkJBQWxCLEVBQWtDO0FBQ3RDQyxrQkFBVVQsS0FBS1M7QUFEdUIsT0FBbEM7QUFGSyxLQUFiLEVBS0dJLElBTEgsQ0FLUSxlQUFPO0FBQ2JYLGNBQVFZLEdBQVI7QUFDRCxLQVBEO0FBUUQsR0FUTSxDQUFQO0FBVUQ7O0FBRUQ7QUFDTyxTQUFTakIsUUFBVCxDQUFrQkcsSUFBbEIsRUFBd0I7QUFDN0IsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLFdBQUssbUJBRE07QUFFWE4sWUFBTU8sT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsMkJBQWxCLEVBQWtDO0FBQ3RDQyxrQkFBVVQsS0FBS1M7QUFEdUIsT0FBbEM7QUFGSyxLQUFiLEVBS0dJLElBTEgsQ0FLUSxlQUFPO0FBQ2JYLGNBQVFZLEdBQVI7QUFDRCxLQVBEO0FBUUQsR0FUTSxDQUFQO0FBVUQ7O0FBRUQ7QUFDTyxTQUFTaEIsWUFBVCxDQUFzQkUsSUFBdEIsRUFBNEI7QUFDakMsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLFdBQUsscUJBRE07QUFFWE4sWUFBTU8sT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsMkJBQWxCLEVBQWtDO0FBQ3RDQyxrQkFBVVQsS0FBS1MsUUFEdUI7QUFFdENNLGtCQUFVZixLQUFLZTtBQUZ1QixPQUFsQztBQUZLLEtBQWIsRUFNR0YsSUFOSCxDQU1RLGVBQU87QUFDYlgsY0FBUVksR0FBUjtBQUNELEtBUkQ7QUFTRCxHQVZNLENBQVA7QUFXRDs7QUFFRDtBQUNPLFNBQVNmLFVBQVQsQ0FBb0JDLElBQXBCLEVBQTBCO0FBQy9CLFNBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q0MsbUJBQUtDLE9BQUwsQ0FBYTtBQUNYQyxXQUFLLG9CQURNO0FBRVhOLFlBQU1PLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLDJCQUFsQixFQUFrQztBQUN0Q0Msa0JBQVVULEtBQUtTLFFBRHVCO0FBRXRDTyx1QkFBZWhCLEtBQUtnQjtBQUZrQixPQUFsQyxDQUZLO0FBTVhKLGNBQVE7QUFORyxLQUFiLEVBT0dDLElBUEgsQ0FPUSxlQUFPO0FBQ2JYLGNBQVFZLEdBQVI7QUFDRCxLQVREO0FBVUQsR0FYTSxDQUFQO0FBWUQiLCJmaWxlIjoiYXV0aG9yaXplLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCBjb21tb25QYXJhbXMgZnJvbSAnLi9jb21tb25EYXRhJ1xuXG4vLyDmt7vliqDnj63nuqfmnYPpmZBcbmV4cG9ydCBmdW5jdGlvbiBhZGRBdXRoKGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2NsYXNzL2F1dGgvYWRkJyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxuICAgICAgICByb2xlX2lkOiBkYXRhLnJvbGVfaWQsXG4gICAgICAgIGpvaW5fbWVtYmVyX2lkOiBkYXRhLmpvaW5fbWVtYmVyX2lkXG4gICAgICB9KSxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLy8g6I635Y+W5oiR55qE54+t57qn5p2D6ZmQ5YiX6KGoXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXV0aChkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9tZW1iZXIvYXV0aCcsXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xuICAgICAgICBjbGFzc19pZDogZGF0YS5jbGFzc19pZFxuICAgICAgfSlcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDojrflj5bmiYDmnInmnYPpmZDliJfooahcbmV4cG9ydCBmdW5jdGlvbiBhdXRoTGlzdChkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9jbGFzcy9hdXRoL2luZGV4JyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkXG4gICAgICB9KVxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOaQnOe0ouWutumVv+WQjeensFxuZXhwb3J0IGZ1bmN0aW9uIHNlYXJjaE1lbWJlcihkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9jbGFzcy9zZWFyY2hNZW1iZXInLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXG4gICAgICAgIGtleXdvcmRzOiBkYXRhLmtleXdvcmRzXG4gICAgICB9KVxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOWIoOmZpOePree6p+inkuiJsuadg+mZkFxuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZUF1dGgoZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvY2xhc3MvYXV0aC9kZWxldGUnLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXG4gICAgICAgIGNsYXNzX2F1dGhfaWQ6IGRhdGEuY2xhc3NfYXV0aF9pZFxuICAgICAgfSksXG4gICAgICBtZXRob2Q6ICdwb3N0J1xuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG4iXX0=