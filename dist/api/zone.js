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
        moment_id: data.moment_id,
        class_id: data.class_id
      }),
      method: 'delete'
    }).then(function (res) {
      resolve(res);
    });
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInpvbmUuanMiXSwibmFtZXMiOlsiYWRkQ2lyY2xlcyIsImFkZENvbGxlY3Rpb24iLCJhZGRBY3Rpdml0eSIsImFkZEFjY291bnQiLCJhZGROb3RpZnkiLCJhZGRQaG90byIsInBob3RvSW5kZXgiLCJnZXRDaXJjbGVMaXN0IiwiYWRkQ29tbWVudCIsImpvaW5BY3Rpdml0eSIsImdldENvbW1lbnRMaXN0IiwiZGVsZXRlQ2lyY2xlIiwiZGF0YSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwid2VweSIsInJlcXVlc3QiLCJ1cmwiLCJPYmplY3QiLCJhc3NpZ24iLCJjbGFzc19pZCIsInNlZV90eXBlIiwiZGVzY3JpcHRpb24iLCJkZXNjIiwiaW1nX3VybCIsIm1ldGhvZCIsInRoZW4iLCJyZXMiLCJ0eXBlIiwiaXRlbSIsInNpZ25fdHlwZSIsInNlbGVjdF90eXBlIiwic2VsZWN0VHlwZSIsIm1vbmV5IiwiaW1nTGlzdCIsImlzX3JlbWluZCIsInJlbWluZCIsInBuIiwicHMiLCJtb21lbnRfaWQiLCJjb250ZW50Iiwicm9vdF9pZCIsInRvX2NvbW1lbnRfaWQiLCJhY3Rpdml0eV9pZCIsImFjdGl2aXR5X2l0ZW1faWQiLCJvZmZzZXQiXSwibWFwcGluZ3MiOiI7Ozs7O1FBSWdCQSxVLEdBQUFBLFU7UUFrQkFDLGEsR0FBQUEsYTtRQWtCQUMsVyxHQUFBQSxXO1FBb0JBQyxVLEdBQUFBLFU7UUFtQkFDLFMsR0FBQUEsUztRQWtCQUMsUSxHQUFBQSxRO1FBZ0JBQyxVLEdBQUFBLFU7UUFnQkFDLGEsR0FBQUEsYTtRQWtCQUMsVSxHQUFBQSxVO1FBbUJBQyxZLEdBQUFBLFk7UUFpQkFDLGMsR0FBQUEsYztRQWlCQUMsWSxHQUFBQSxZOztBQXhNaEI7Ozs7QUFDQTs7Ozs7O0FBRUE7QUFDTyxTQUFTWCxVQUFULENBQW9CWSxJQUFwQixFQUEwQjtBQUMvQixTQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdEND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QWxDLENBRks7QUFNWEssY0FBUTtBQU5HLEtBQWIsRUFPR0MsSUFQSCxDQU9RLGVBQU87QUFDYmIsY0FBUWMsR0FBUjtBQUNELEtBVEQ7QUFVRCxHQVhNLENBQVA7QUFZRCIsImZpbGUiOiJ6b25lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IGNvbW1vblBhcmFtcyBmcm9tICcuL2NvbW1vbkRhdGEnXHJcblxyXG4vLyDlj5HluIPlnIjlrZBcclxuZXhwb3J0IGZ1bmN0aW9uIGFkZENpcmNsZXMoZGF0YSkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICB1cmw6ICcvbW9tZW50L2FkZENpcmNsZXMnLFxyXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xyXG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxyXG4gICAgICAgIHNlZV90eXBlOiBkYXRhLnNlZV90eXBlLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBkYXRhLmRlc2MsXHJcbiAgICAgICAgaW1nX3VybDogZGF0YS5pbWdfdXJsXHJcbiAgICAgIH0pLFxyXG4gICAgICBtZXRob2Q6ICdwb3N0J1xyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICByZXNvbHZlKHJlcylcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG5cclxuLy8g5Y+R5biD5pS25qy+XHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRDb2xsZWN0aW9uKGRhdGEpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiAnL21vbWVudC9hZGRDb2xsZWN0aW9uJyxcclxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcclxuICAgICAgICBjbGFzc19pZDogZGF0YS5jbGFzc19pZCxcclxuICAgICAgICB0eXBlOiBkYXRhLnR5cGUsXHJcbiAgICAgICAgZGVzY3JpcHRpb246IGRhdGEuZGVzYyxcclxuICAgICAgICBpdGVtOiBkYXRhLml0ZW1cclxuICAgICAgfSksXHJcbiAgICAgIG1ldGhvZDogJ3Bvc3QnXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHJlc29sdmUocmVzKVxyXG4gICAgfSlcclxuICB9KVxyXG59XHJcblxyXG4vLyDlj5HluIPmtLvliqhcclxuZXhwb3J0IGZ1bmN0aW9uIGFkZEFjdGl2aXR5KGRhdGEpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiAnL21vbWVudC9hZGRBY3Rpdml0eScsXHJcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XHJcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXHJcbiAgICAgICAgc2lnbl90eXBlOiBkYXRhLnNpZ25fdHlwZSxcclxuICAgICAgICBkZXNjcmlwdGlvbjogZGF0YS5kZXNjLFxyXG4gICAgICAgIHNlbGVjdF90eXBlOiBkYXRhLnNlbGVjdFR5cGUsXHJcbiAgICAgICAgaXRlbTogZGF0YS5pdGVtLFxyXG4gICAgICAgIGltZ191cmw6IGRhdGEuaW1nX3VybFxyXG4gICAgICB9KSxcclxuICAgICAgbWV0aG9kOiAncG9zdCdcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgcmVzb2x2ZShyZXMpXHJcbiAgICB9KVxyXG4gIH0pXHJcbn1cclxuXHJcbi8vIOWPkeW4g+iusOi0plxyXG5leHBvcnQgZnVuY3Rpb24gYWRkQWNjb3VudChkYXRhKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgIHVybDogJy9tb21lbnQvYWRkQWNjb3VudCcsXHJcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XHJcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXHJcbiAgICAgICAgdHlwZTogZGF0YS50eXBlLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBkYXRhLmRlc2MsXHJcbiAgICAgICAgbW9uZXk6IGRhdGEubW9uZXksXHJcbiAgICAgICAgaW1nX3VybDogZGF0YS5pbWdMaXN0XHJcbiAgICAgIH0pLFxyXG4gICAgICBtZXRob2Q6ICdwb3N0J1xyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICByZXNvbHZlKHJlcylcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG5cclxuLy8g5Y+R5biD6YCa55+lXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGROb3RpZnkoZGF0YSkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICB1cmw6ICcvbW9tZW50L2FkZE5vdGlmeScsXHJcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XHJcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXHJcbiAgICAgICAgc2VlX3R5cGU6IGRhdGEudHlwZSxcclxuICAgICAgICBkZXNjcmlwdGlvbjogZGF0YS5kZXNjLFxyXG4gICAgICAgIGlzX3JlbWluZDogZGF0YS5yZW1pbmRcclxuICAgICAgfSksXHJcbiAgICAgIG1ldGhvZDogJ3Bvc3QnXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHJlc29sdmUocmVzKVxyXG4gICAgfSlcclxuICB9KVxyXG59XHJcblxyXG4vLyDkuIrkvKDnm7jlhoxcclxuZXhwb3J0IGZ1bmN0aW9uIGFkZFBob3RvKGRhdGEpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiAnL2NsYXNzL3Bob3RvL2FkZCcsXHJcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XHJcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXHJcbiAgICAgICAgaW1nX3VybDogZGF0YS5pbWdfdXJsXHJcbiAgICAgIH0pLFxyXG4gICAgICBtZXRob2Q6ICdwb3N0J1xyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICByZXNvbHZlKHJlcylcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG5cclxuLy8g54+t57qn55u45YaM5YiX6KGoXHJcbmV4cG9ydCBmdW5jdGlvbiBwaG90b0luZGV4KGRhdGEpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiAnL2NsYXNzL3Bob3RvL2luZGV4JyxcclxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcclxuICAgICAgICBjbGFzc19pZDogZGF0YS5jbGFzc19pZCxcclxuICAgICAgICBwbjogZGF0YS5wbixcclxuICAgICAgICBwczogZGF0YS5wc1xyXG4gICAgICB9KVxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICByZXNvbHZlKHJlcylcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG5cclxuLy8g6I635Y+W5ZyI5a2Q5YiX6KGoXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDaXJjbGVMaXN0KGRhdGEpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiAnL21vbWVudC9saXN0JyxcclxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcclxuICAgICAgICBjbGFzc19pZDogZGF0YS5jbGFzc19pZCxcclxuICAgICAgICBzZWVfdHlwZTogZGF0YS5zZWVfdHlwZSxcclxuICAgICAgICB0eXBlOiBkYXRhLnR5cGUsXHJcbiAgICAgICAgcG46IGRhdGEucG4sXHJcbiAgICAgICAgcHM6IGRhdGEucHNcclxuICAgICAgfSlcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgcmVzb2x2ZShyZXMpXHJcbiAgICB9KVxyXG4gIH0pXHJcbn1cclxuXHJcbi8vIOWPkeW4g+WciOWtkOivhOiuulxyXG5leHBvcnQgZnVuY3Rpb24gYWRkQ29tbWVudChkYXRhKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgIHVybDogJy9tb21lbnQvYWRkQ29tbWVudCcsXHJcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XHJcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXHJcbiAgICAgICAgbW9tZW50X2lkOiBkYXRhLm1vbWVudF9pZCxcclxuICAgICAgICBjb250ZW50OiBkYXRhLmNvbnRlbnQsXHJcbiAgICAgICAgcm9vdF9pZDogZGF0YS5yb290X2lkLFxyXG4gICAgICAgIHRvX2NvbW1lbnRfaWQ6IGRhdGEudG9fY29tbWVudF9pZFxyXG4gICAgICB9KSxcclxuICAgICAgbWV0aG9kOiAncG9zdCdcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgcmVzb2x2ZShyZXMpXHJcbiAgICB9KVxyXG4gIH0pXHJcbn1cclxuXHJcbi8vIOWPguWKoOWciOWtkOa0u+WKqFxyXG5leHBvcnQgZnVuY3Rpb24gam9pbkFjdGl2aXR5KGRhdGEpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiAnL21vbWVudC9hY3Rpdml0eS9hZGRBcHBseScsXHJcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XHJcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXHJcbiAgICAgICAgYWN0aXZpdHlfaWQ6IGRhdGEuYWN0aXZpdHlfaWQsXHJcbiAgICAgICAgYWN0aXZpdHlfaXRlbV9pZDogZGF0YS5hY3Rpdml0eV9pdGVtX2lkXHJcbiAgICAgIH0pLFxyXG4gICAgICBtZXRob2Q6ICdwb3N0J1xyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICByZXNvbHZlKHJlcylcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG5cclxuLy8g5Yqg6L295pu05aSa6K+E6K665YiX6KGoXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDb21tZW50TGlzdChkYXRhKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgIHVybDogJy9tb21lbnQvZ2V0Q29tbWVudExpc3QnLFxyXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xyXG4gICAgICAgIG1vbWVudF9pZDogZGF0YS5tb21lbnRfaWQsXHJcbiAgICAgICAgcG46IGRhdGEucG4sXHJcbiAgICAgICAgcHM6IGRhdGEucHMsXHJcbiAgICAgICAgb2Zmc2V0OiBkYXRhLm9mZnNldFxyXG4gICAgICB9KVxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICByZXNvbHZlKHJlcylcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG5cclxuLy8g5Yig6Zmk5ZyI5a2QXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVDaXJjbGUoZGF0YSkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICB1cmw6ICcvbW9tZW50L2RlbGV0ZScsXHJcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XHJcbiAgICAgICAgbW9tZW50X2lkOiBkYXRhLm1vbWVudF9pZCxcclxuICAgICAgICBjbGFzc19pZDogZGF0YS5jbGFzc19pZFxyXG4gICAgICB9KSxcclxuICAgICAgbWV0aG9kOiAnZGVsZXRlJ1xyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICByZXNvbHZlKHJlcylcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG4iXX0=