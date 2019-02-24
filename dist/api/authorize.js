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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGhvcml6ZS5qcyJdLCJuYW1lcyI6WyJhZGRBdXRoIiwiZ2V0QXV0aCIsImF1dGhMaXN0Iiwic2VhcmNoTWVtYmVyIiwiZGVsZXRlQXV0aCIsImRhdGEiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIndlcHkiLCJyZXF1ZXN0IiwidXJsIiwiT2JqZWN0IiwiYXNzaWduIiwiY2xhc3NfaWQiLCJyb2xlX2lkIiwiam9pbl9tZW1iZXJfaWQiLCJtZXRob2QiLCJ0aGVuIiwicmVzIiwia2V5d29yZHMiLCJjbGFzc19hdXRoX2lkIl0sIm1hcHBpbmdzIjoiOzs7OztRQUlnQkEsTyxHQUFBQSxPO1FBaUJBQyxPLEdBQUFBLE87UUFjQUMsUSxHQUFBQSxRO1FBY0FDLFksR0FBQUEsWTtRQWVBQyxVLEdBQUFBLFU7O0FBaEVoQjs7OztBQUNBOzs7Ozs7QUFFQTtBQUNPLFNBQVNKLE9BQVQsQ0FBaUJLLElBQWpCLEVBQXVCO0FBQzVCLFNBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q0MsbUJBQUtDLE9BQUwsQ0FBYTtBQUNYQyxXQUFLLGlCQURNO0FBRVhOLFlBQU1PLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLDJCQUFsQixFQUFrQztBQUN0Q0Msa0JBQVVULEtBQUtTLFFBRHVCO0FBRXRDQyxpQkFBU1YsS0FBS1UsT0FGd0I7QUFHdENDLHdCQUFnQlgsS0FBS1c7QUFIaUIsT0FBbEMsQ0FGSztBQU9YQyxjQUFRO0FBUEcsS0FBYixFQVFHQyxJQVJILENBUVEsZUFBTztBQUNiWCxjQUFRWSxHQUFSO0FBQ0QsS0FWRDtBQVdELEdBWk0sQ0FBUDtBQWFEOztBQUVEO0FBQ08sU0FBU2xCLE9BQVQsQ0FBaUJJLElBQWpCLEVBQXVCO0FBQzVCLFNBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q0MsbUJBQUtDLE9BQUwsQ0FBYTtBQUNYQyxXQUFLLGNBRE07QUFFWE4sWUFBTU8sT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsMkJBQWxCLEVBQWtDO0FBQ3RDQyxrQkFBVVQsS0FBS1M7QUFEdUIsT0FBbEM7QUFGSyxLQUFiLEVBS0dJLElBTEgsQ0FLUSxlQUFPO0FBQ2JYLGNBQVFZLEdBQVI7QUFDRCxLQVBEO0FBUUQsR0FUTSxDQUFQO0FBVUQ7O0FBRUQ7QUFDTyxTQUFTakIsUUFBVCxDQUFrQkcsSUFBbEIsRUFBd0I7QUFDN0IsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLFdBQUssbUJBRE07QUFFWE4sWUFBTU8sT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsMkJBQWxCLEVBQWtDO0FBQ3RDQyxrQkFBVVQsS0FBS1M7QUFEdUIsT0FBbEM7QUFGSyxLQUFiLEVBS0dJLElBTEgsQ0FLUSxlQUFPO0FBQ2JYLGNBQVFZLEdBQVI7QUFDRCxLQVBEO0FBUUQsR0FUTSxDQUFQO0FBVUQ7O0FBRUQ7QUFDTyxTQUFTaEIsWUFBVCxDQUFzQkUsSUFBdEIsRUFBNEI7QUFDakMsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLFdBQUsscUJBRE07QUFFWE4sWUFBTU8sT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsMkJBQWxCLEVBQWtDO0FBQ3RDQyxrQkFBVVQsS0FBS1MsUUFEdUI7QUFFdENNLGtCQUFVZixLQUFLZTtBQUZ1QixPQUFsQztBQUZLLEtBQWIsRUFNR0YsSUFOSCxDQU1RLGVBQU87QUFDYlgsY0FBUVksR0FBUjtBQUNELEtBUkQ7QUFTRCxHQVZNLENBQVA7QUFXRDs7QUFFRDtBQUNPLFNBQVNmLFVBQVQsQ0FBb0JDLElBQXBCLEVBQTBCO0FBQy9CLFNBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q0MsbUJBQUtDLE9BQUwsQ0FBYTtBQUNYQyxXQUFLLG9CQURNO0FBRVhOLFlBQU1PLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLDJCQUFsQixFQUFrQztBQUN0Q0Msa0JBQVVULEtBQUtTLFFBRHVCO0FBRXRDTyx1QkFBZWhCLEtBQUtnQjtBQUZrQixPQUFsQyxDQUZLO0FBTVhKLGNBQVE7QUFORyxLQUFiLEVBT0dDLElBUEgsQ0FPUSxlQUFPO0FBQ2JYLGNBQVFZLEdBQVI7QUFDRCxLQVREO0FBVUQsR0FYTSxDQUFQO0FBWUQiLCJmaWxlIjoiYXV0aG9yaXplLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IGNvbW1vblBhcmFtcyBmcm9tICcuL2NvbW1vbkRhdGEnXHJcblxyXG4vLyDmt7vliqDnj63nuqfmnYPpmZBcclxuZXhwb3J0IGZ1bmN0aW9uIGFkZEF1dGgoZGF0YSkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICB1cmw6ICcvY2xhc3MvYXV0aC9hZGQnLFxyXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xyXG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxyXG4gICAgICAgIHJvbGVfaWQ6IGRhdGEucm9sZV9pZCxcclxuICAgICAgICBqb2luX21lbWJlcl9pZDogZGF0YS5qb2luX21lbWJlcl9pZFxyXG4gICAgICB9KSxcclxuICAgICAgbWV0aG9kOiAncG9zdCdcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgcmVzb2x2ZShyZXMpXHJcbiAgICB9KVxyXG4gIH0pXHJcbn1cclxuXHJcbi8vIOiOt+WPluaIkeeahOePree6p+adg+mZkOWIl+ihqFxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXV0aChkYXRhKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgIHVybDogJy9tZW1iZXIvYXV0aCcsXHJcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XHJcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWRcclxuICAgICAgfSlcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgcmVzb2x2ZShyZXMpXHJcbiAgICB9KVxyXG4gIH0pXHJcbn1cclxuXHJcbi8vIOiOt+WPluaJgOacieadg+mZkOWIl+ihqFxyXG5leHBvcnQgZnVuY3Rpb24gYXV0aExpc3QoZGF0YSkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICB1cmw6ICcvY2xhc3MvYXV0aC9pbmRleCcsXHJcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XHJcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWRcclxuICAgICAgfSlcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgcmVzb2x2ZShyZXMpXHJcbiAgICB9KVxyXG4gIH0pXHJcbn1cclxuXHJcbi8vIOaQnOe0ouWutumVv+WQjeensFxyXG5leHBvcnQgZnVuY3Rpb24gc2VhcmNoTWVtYmVyKGRhdGEpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiAnL2NsYXNzL3NlYXJjaE1lbWJlcicsXHJcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XHJcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXHJcbiAgICAgICAga2V5d29yZHM6IGRhdGEua2V5d29yZHNcclxuICAgICAgfSlcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgcmVzb2x2ZShyZXMpXHJcbiAgICB9KVxyXG4gIH0pXHJcbn1cclxuXHJcbi8vIOWIoOmZpOePree6p+inkuiJsuadg+mZkFxyXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlQXV0aChkYXRhKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgIHVybDogJy9jbGFzcy9hdXRoL2RlbGV0ZScsXHJcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XHJcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXHJcbiAgICAgICAgY2xhc3NfYXV0aF9pZDogZGF0YS5jbGFzc19hdXRoX2lkXHJcbiAgICAgIH0pLFxyXG4gICAgICBtZXRob2Q6ICdwb3N0J1xyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICByZXNvbHZlKHJlcylcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG4iXX0=