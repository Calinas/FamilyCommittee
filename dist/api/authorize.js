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
exports.removeMember = removeMember;

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

// 驱逐成员
function removeMember(params) {
  return new Promise(function (resolve) {
    _wepy2.default.request({
      url: '/class/removeMember',
      data: Object.assign({}, (0, _commonData2.default)(), {
        class_id: params.class_id,
        remove_member_id: params.remove_member_id
      }),
      method: 'post'
    }).then(function (res) {
      resolve(res);
    });
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGhvcml6ZS5qcyJdLCJuYW1lcyI6WyJhZGRBdXRoIiwiZ2V0QXV0aCIsImF1dGhMaXN0Iiwic2VhcmNoTWVtYmVyIiwiZGVsZXRlQXV0aCIsImNoYW5nZUNvZGUiLCJyZW1vdmVNZW1iZXIiLCJkYXRhIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ3ZXB5IiwicmVxdWVzdCIsInVybCIsIk9iamVjdCIsImFzc2lnbiIsImNsYXNzX2lkIiwicm9sZV9pZCIsImpvaW5fbWVtYmVyX2lkIiwibWV0aG9kIiwidGhlbiIsInJlcyIsImtleXdvcmRzIiwiY2xhc3NfYXV0aF9pZCIsInBhcmFtcyIsImpvaW5fa2V5IiwicmVtb3ZlX21lbWJlcl9pZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7UUFJZ0JBLE8sR0FBQUEsTztRQWlCQUMsTyxHQUFBQSxPO1FBY0FDLFEsR0FBQUEsUTtRQWNBQyxZLEdBQUFBLFk7UUFlQUMsVSxHQUFBQSxVO1FBZ0JBQyxVLEdBQUFBLFU7UUFnQkFDLFksR0FBQUEsWTs7QUFoR2hCOzs7O0FBQ0E7Ozs7OztBQUVBO0FBQ08sU0FBU04sT0FBVCxDQUFpQk8sSUFBakIsRUFBdUI7QUFDNUIsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLFdBQUssaUJBRE07QUFFWE4sWUFBTU8sT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsMkJBQWxCLEVBQWtDO0FBQ3RDQyxrQkFBVVQsS0FBS1MsUUFEdUI7QUFFdENDLGlCQUFTVixLQUFLVSxPQUZ3QjtBQUd0Q0Msd0JBQWdCWCxLQUFLVztBQUhpQixPQUFsQyxDQUZLO0FBT1hDLGNBQVE7QUFQRyxLQUFiLEVBUUdDLElBUkgsQ0FRUSxlQUFPO0FBQ2JYLGNBQVFZLEdBQVI7QUFDRCxLQVZEO0FBV0QsR0FaTSxDQUFQO0FBYUQ7O0FBRUQ7QUFDTyxTQUFTcEIsT0FBVCxDQUFpQk0sSUFBakIsRUFB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Y0FBUTtBQU5HLEtBQWIsRUFPR0MsSUFQSCxDQU9RLGVBQU87QUFDYlgsY0FBUVksR0FBUjtBQUNELEtBVEQ7QUFVRCxHQVhNLENBQVA7QUFZRCIsImZpbGUiOiJhdXRob3JpemUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgY29tbW9uUGFyYW1zIGZyb20gJy4vY29tbW9uRGF0YSdcclxuXHJcbi8vIOa3u+WKoOePree6p+adg+mZkFxyXG5leHBvcnQgZnVuY3Rpb24gYWRkQXV0aChkYXRhKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgIHVybDogJy9jbGFzcy9hdXRoL2FkZCcsXHJcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XHJcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXHJcbiAgICAgICAgcm9sZV9pZDogZGF0YS5yb2xlX2lkLFxyXG4gICAgICAgIGpvaW5fbWVtYmVyX2lkOiBkYXRhLmpvaW5fbWVtYmVyX2lkXHJcbiAgICAgIH0pLFxyXG4gICAgICBtZXRob2Q6ICdwb3N0J1xyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICByZXNvbHZlKHJlcylcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG5cclxuLy8g6I635Y+W5oiR55qE54+t57qn5p2D6ZmQ5YiX6KGoXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBdXRoKGRhdGEpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiAnL21lbWJlci9hdXRoJyxcclxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcclxuICAgICAgICBjbGFzc19pZDogZGF0YS5jbGFzc19pZFxyXG4gICAgICB9KVxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICByZXNvbHZlKHJlcylcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG5cclxuLy8g6I635Y+W5omA5pyJ5p2D6ZmQ5YiX6KGoXHJcbmV4cG9ydCBmdW5jdGlvbiBhdXRoTGlzdChkYXRhKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgIHVybDogJy9jbGFzcy9hdXRoL2luZGV4JyxcclxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcclxuICAgICAgICBjbGFzc19pZDogZGF0YS5jbGFzc19pZFxyXG4gICAgICB9KVxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICByZXNvbHZlKHJlcylcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG5cclxuLy8g5pCc57Si5a626ZW/5ZCN56ewXHJcbmV4cG9ydCBmdW5jdGlvbiBzZWFyY2hNZW1iZXIoZGF0YSkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICB1cmw6ICcvY2xhc3Mvc2VhcmNoTWVtYmVyJyxcclxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcclxuICAgICAgICBjbGFzc19pZDogZGF0YS5jbGFzc19pZCxcclxuICAgICAgICBrZXl3b3JkczogZGF0YS5rZXl3b3Jkc1xyXG4gICAgICB9KVxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICByZXNvbHZlKHJlcylcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG5cclxuLy8g5Yig6Zmk54+t57qn6KeS6Imy5p2D6ZmQXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVBdXRoKGRhdGEpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiAnL2NsYXNzL2F1dGgvZGVsZXRlJyxcclxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcclxuICAgICAgICBjbGFzc19pZDogZGF0YS5jbGFzc19pZCxcclxuICAgICAgICBjbGFzc19hdXRoX2lkOiBkYXRhLmNsYXNzX2F1dGhfaWRcclxuICAgICAgfSksXHJcbiAgICAgIG1ldGhvZDogJ3Bvc3QnXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHJlc29sdmUocmVzKVxyXG4gICAgfSlcclxuICB9KVxyXG59XHJcblxyXG4vLyDkv67mlLnnj63nuqfpqozor4HnoIFcclxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5nZUNvZGUocGFyYW1zKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICB1cmw6ICcvY2xhc3MvdXBkYXRlSm9pbktleScsXHJcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XHJcbiAgICAgICAgY2xhc3NfaWQ6IHBhcmFtcy5jbGFzc19pZCxcclxuICAgICAgICBqb2luX2tleTogcGFyYW1zLmpvaW5fa2V5XHJcbiAgICAgIH0pLFxyXG4gICAgICBtZXRob2Q6ICdwb3N0J1xyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICByZXNvbHZlKHJlcylcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG5cclxuLy8g6amx6YCQ5oiQ5ZGYXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVNZW1iZXIocGFyYW1zKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiAnL2NsYXNzL3JlbW92ZU1lbWJlcicsXHJcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XHJcbiAgICAgICAgY2xhc3NfaWQ6IHBhcmFtcy5jbGFzc19pZCxcclxuICAgICAgICByZW1vdmVfbWVtYmVyX2lkOiBwYXJhbXMucmVtb3ZlX21lbWJlcl9pZFxyXG4gICAgICB9KSxcclxuICAgICAgbWV0aG9kOiAncG9zdCdcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgcmVzb2x2ZShyZXMpXHJcbiAgICB9KVxyXG4gIH0pXHJcbn1cclxuIl19