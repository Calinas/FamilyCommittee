'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addCircles = addCircles;
exports.addCollection = addCollection;
exports.addActivity = addActivity;
exports.addAccount = addAccount;
exports.addNotify = addNotify;
exports.addPhoto = addPhoto;
exports.photoIndex = photoIndex;
exports.getCircleList = getCircleList;
exports.addComment = addComment;
exports.joinActivity = joinActivity;
exports.getCommentList = getCommentList;
exports.deleteCircle = deleteCircle;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _commonData = require('./commonData.js');

var _commonData2 = _interopRequireDefault(_commonData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 发布圈子
function addCircles(data) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/moment/addCircles',
      data: Object.assign({}, (0, _commonData2.default)(), {
        class_id: data.class_id,
        see_type: data.see_type,
        description: data.desc,
        img_url: data.img_url
      }),
      method: 'post'
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 发布收款
function addCollection(data) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/moment/addCollection',
      data: Object.assign({}, (0, _commonData2.default)(), {
        class_id: data.class_id,
        type: data.type,
        description: data.desc,
        item: data.item
      }),
      method: 'post'
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 发布活动
function addActivity(data) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/moment/addActivity',
      data: Object.assign({}, (0, _commonData2.default)(), {
        class_id: data.class_id,
        sign_type: data.sign_type,
        description: data.desc,
        select_type: data.selectType,
        item: data.item,
        img_url: data.img_url
      }),
      method: 'post'
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 发布记账
function addAccount(data) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/moment/addAccount',
      data: Object.assign({}, (0, _commonData2.default)(), {
        class_id: data.class_id,
        type: data.type,
        description: data.desc,
        money: data.money,
        img_url: data.imgList
      }),
      method: 'post'
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 发布通知
function addNotify(data) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/moment/addNotify',
      data: Object.assign({}, (0, _commonData2.default)(), {
        class_id: data.class_id,
        see_type: data.type,
        description: data.desc,
        is_remind: data.remind
      }),
      method: 'post'
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 上传相册
function addPhoto(data) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/class/photo/add',
      data: Object.assign({}, (0, _commonData2.default)(), {
        class_id: data.class_id,
        img_url: data.img_url
      }),
      method: 'post'
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 班级相册列表
function photoIndex(data) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/class/photo/index',
      data: Object.assign({}, (0, _commonData2.default)(), {
        class_id: data.class_id,
        pn: data.pn,
        ps: data.ps
      })
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 获取圈子列表
function getCircleList(data) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/moment/list',
      data: Object.assign({}, (0, _commonData2.default)(), {
        class_id: data.class_id,
        see_type: data.see_type,
        type: data.type,
        pn: data.pn,
        ps: data.ps
      })
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 发布圈子评论
function addComment(data) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/moment/addComment',
      data: Object.assign({}, (0, _commonData2.default)(), {
        class_id: data.class_id,
        moment_id: data.moment_id,
        content: data.content,
        root_id: data.root_id,
        to_comment_id: data.to_comment_id
      }),
      method: 'post'
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 参加圈子活动
function joinActivity(data) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/moment/activity/addApply',
      data: Object.assign({}, (0, _commonData2.default)(), {
        class_id: data.class_id,
        activity_id: data.activity_id,
        activity_item_id: data.activity_item_id
      }),
      method: 'post'
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 加载更多评论列表
function getCommentList(data) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/moment/getCommentList',
      data: Object.assign({}, (0, _commonData2.default)(), {
        moment_id: data.moment_id,
        pn: data.pn,
        ps: data.ps,
        offset: data.offset
      })
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 删除圈子
function deleteCircle(data) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/moment/delete',
      data: Object.assign({}, (0, _commonData2.default)(), {
        moment_id: data.moment_id
      }),
      method: 'delete'
    }).then(function (res) {
      resolve(res);
    });
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInpvbmUuanMiXSwibmFtZXMiOlsiYWRkQ2lyY2xlcyIsImFkZENvbGxlY3Rpb24iLCJhZGRBY3Rpdml0eSIsImFkZEFjY291bnQiLCJhZGROb3RpZnkiLCJhZGRQaG90byIsInBob3RvSW5kZXgiLCJnZXRDaXJjbGVMaXN0IiwiYWRkQ29tbWVudCIsImpvaW5BY3Rpdml0eSIsImdldENvbW1lbnRMaXN0IiwiZGVsZXRlQ2lyY2xlIiwiZGF0YSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwid2VweSIsInJlcXVlc3QiLCJ1cmwiLCJPYmplY3QiLCJhc3NpZ24iLCJjbGFzc19pZCIsInNlZV90eXBlIiwiZGVzY3JpcHRpb24iLCJkZXNjIiwiaW1nX3VybCIsIm1ldGhvZCIsInRoZW4iLCJyZXMiLCJ0eXBlIiwiaXRlbSIsInNpZ25fdHlwZSIsInNlbGVjdF90eXBlIiwic2VsZWN0VHlwZSIsIm1vbmV5IiwiaW1nTGlzdCIsImlzX3JlbWluZCIsInJlbWluZCIsInBuIiwicHMiLCJtb21lbnRfaWQiLCJjb250ZW50Iiwicm9vdF9pZCIsInRvX2NvbW1lbnRfaWQiLCJhY3Rpdml0eV9pZCIsImFjdGl2aXR5X2l0ZW1faWQiLCJvZmZzZXQiXSwibWFwcGluZ3MiOiI7Ozs7O1FBSWdCQSxVLEdBQUFBLFU7UUFrQkFDLGEsR0FBQUEsYTtRQWtCQUMsVyxHQUFBQSxXO1FBb0JBQyxVLEdBQUFBLFU7UUFtQkFDLFMsR0FBQUEsUztRQWtCQUMsUSxHQUFBQSxRO1FBZ0JBQyxVLEdBQUFBLFU7UUFnQkFDLGEsR0FBQUEsYTtRQWtCQUMsVSxHQUFBQSxVO1FBbUJBQyxZLEdBQUFBLFk7UUFpQkFDLGMsR0FBQUEsYztRQWlCQUMsWSxHQUFBQSxZOztBQXhNaEI7Ozs7QUFDQTs7Ozs7O0FBRUE7QUFDTyxTQUFTWCxVQUFULENBQW9CWSxJQUFwQixFQUEwQjtBQUMvQixTQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdEND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QWIsRUFNR0MsSUFOSCxDQU1RLGVBQU87QUFDYmIsY0FBUWMsR0FBUjtBQUNELEtBUkQ7QUFTRCxHQVZNLENBQVA7QUFXRCIsImZpbGUiOiJ6b25lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCBjb21tb25QYXJhbXMgZnJvbSAnLi9jb21tb25EYXRhJ1xuXG4vLyDlj5HluIPlnIjlrZBcbmV4cG9ydCBmdW5jdGlvbiBhZGRDaXJjbGVzKGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL21vbWVudC9hZGRDaXJjbGVzJyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxuICAgICAgICBzZWVfdHlwZTogZGF0YS5zZWVfdHlwZSxcbiAgICAgICAgZGVzY3JpcHRpb246IGRhdGEuZGVzYyxcbiAgICAgICAgaW1nX3VybDogZGF0YS5pbWdfdXJsXG4gICAgICB9KSxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLy8g5Y+R5biD5pS25qy+XG5leHBvcnQgZnVuY3Rpb24gYWRkQ29sbGVjdGlvbihkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9tb21lbnQvYWRkQ29sbGVjdGlvbicsXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xuICAgICAgICBjbGFzc19pZDogZGF0YS5jbGFzc19pZCxcbiAgICAgICAgdHlwZTogZGF0YS50eXBlLFxuICAgICAgICBkZXNjcmlwdGlvbjogZGF0YS5kZXNjLFxuICAgICAgICBpdGVtOiBkYXRhLml0ZW1cbiAgICAgIH0pLFxuICAgICAgbWV0aG9kOiAncG9zdCdcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDlj5HluIPmtLvliqhcbmV4cG9ydCBmdW5jdGlvbiBhZGRBY3Rpdml0eShkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9tb21lbnQvYWRkQWN0aXZpdHknLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXG4gICAgICAgIHNpZ25fdHlwZTogZGF0YS5zaWduX3R5cGUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBkYXRhLmRlc2MsXG4gICAgICAgIHNlbGVjdF90eXBlOiBkYXRhLnNlbGVjdFR5cGUsXG4gICAgICAgIGl0ZW06IGRhdGEuaXRlbSxcbiAgICAgICAgaW1nX3VybDogZGF0YS5pbWdfdXJsXG4gICAgICB9KSxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLy8g5Y+R5biD6K6w6LSmXG5leHBvcnQgZnVuY3Rpb24gYWRkQWNjb3VudChkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9tb21lbnQvYWRkQWNjb3VudCcsXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xuICAgICAgICBjbGFzc19pZDogZGF0YS5jbGFzc19pZCxcbiAgICAgICAgdHlwZTogZGF0YS50eXBlLFxuICAgICAgICBkZXNjcmlwdGlvbjogZGF0YS5kZXNjLFxuICAgICAgICBtb25leTogZGF0YS5tb25leSxcbiAgICAgICAgaW1nX3VybDogZGF0YS5pbWdMaXN0XG4gICAgICB9KSxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLy8g5Y+R5biD6YCa55+lXG5leHBvcnQgZnVuY3Rpb24gYWRkTm90aWZ5KGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL21vbWVudC9hZGROb3RpZnknLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXG4gICAgICAgIHNlZV90eXBlOiBkYXRhLnR5cGUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBkYXRhLmRlc2MsXG4gICAgICAgIGlzX3JlbWluZDogZGF0YS5yZW1pbmRcbiAgICAgIH0pLFxuICAgICAgbWV0aG9kOiAncG9zdCdcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDkuIrkvKDnm7jlhoxcbmV4cG9ydCBmdW5jdGlvbiBhZGRQaG90byhkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9jbGFzcy9waG90by9hZGQnLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXG4gICAgICAgIGltZ191cmw6IGRhdGEuaW1nX3VybFxuICAgICAgfSksXG4gICAgICBtZXRob2Q6ICdwb3N0J1xuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOePree6p+ebuOWGjOWIl+ihqFxuZXhwb3J0IGZ1bmN0aW9uIHBob3RvSW5kZXgoZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvY2xhc3MvcGhvdG8vaW5kZXgnLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXG4gICAgICAgIHBuOiBkYXRhLnBuLFxuICAgICAgICBwczogZGF0YS5wc1xuICAgICAgfSlcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDojrflj5blnIjlrZDliJfooahcbmV4cG9ydCBmdW5jdGlvbiBnZXRDaXJjbGVMaXN0KGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL21vbWVudC9saXN0JyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxuICAgICAgICBzZWVfdHlwZTogZGF0YS5zZWVfdHlwZSxcbiAgICAgICAgdHlwZTogZGF0YS50eXBlLFxuICAgICAgICBwbjogZGF0YS5wbixcbiAgICAgICAgcHM6IGRhdGEucHNcbiAgICAgIH0pXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLy8g5Y+R5biD5ZyI5a2Q6K+E6K66XG5leHBvcnQgZnVuY3Rpb24gYWRkQ29tbWVudChkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9tb21lbnQvYWRkQ29tbWVudCcsXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xuICAgICAgICBjbGFzc19pZDogZGF0YS5jbGFzc19pZCxcbiAgICAgICAgbW9tZW50X2lkOiBkYXRhLm1vbWVudF9pZCxcbiAgICAgICAgY29udGVudDogZGF0YS5jb250ZW50LFxuICAgICAgICByb290X2lkOiBkYXRhLnJvb3RfaWQsXG4gICAgICAgIHRvX2NvbW1lbnRfaWQ6IGRhdGEudG9fY29tbWVudF9pZFxuICAgICAgfSksXG4gICAgICBtZXRob2Q6ICdwb3N0J1xuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOWPguWKoOWciOWtkOa0u+WKqFxuZXhwb3J0IGZ1bmN0aW9uIGpvaW5BY3Rpdml0eShkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9tb21lbnQvYWN0aXZpdHkvYWRkQXBwbHknLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXG4gICAgICAgIGFjdGl2aXR5X2lkOiBkYXRhLmFjdGl2aXR5X2lkLFxuICAgICAgICBhY3Rpdml0eV9pdGVtX2lkOiBkYXRhLmFjdGl2aXR5X2l0ZW1faWRcbiAgICAgIH0pLFxuICAgICAgbWV0aG9kOiAncG9zdCdcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDliqDovb3mm7TlpJror4TorrrliJfooahcbmV4cG9ydCBmdW5jdGlvbiBnZXRDb21tZW50TGlzdChkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9tb21lbnQvZ2V0Q29tbWVudExpc3QnLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcbiAgICAgICAgbW9tZW50X2lkOiBkYXRhLm1vbWVudF9pZCxcbiAgICAgICAgcG46IGRhdGEucG4sXG4gICAgICAgIHBzOiBkYXRhLnBzLFxuICAgICAgICBvZmZzZXQ6IGRhdGEub2Zmc2V0XG4gICAgICB9KVxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOWIoOmZpOWciOWtkFxuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZUNpcmNsZShkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9tb21lbnQvZGVsZXRlJyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIG1vbWVudF9pZDogZGF0YS5tb21lbnRfaWRcbiAgICAgIH0pLFxuICAgICAgbWV0aG9kOiAnZGVsZXRlJ1xuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG4iXX0=