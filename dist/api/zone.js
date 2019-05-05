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
exports.delPhoto = delPhoto;
exports.photoIndex = photoIndex;
exports.getCircleList = getCircleList;
exports.addComment = addComment;
exports.joinActivity = joinActivity;
exports.getCommentList = getCommentList;
exports.deleteCircle = deleteCircle;
exports.addLike = addLike;

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

//删除相册
function delPhoto(data) {
  return new Promise(function (resolve) {
    _wepy2.default.request({
      url: '/class/photo/del',
      data: Object.assign({}, (0, _commonData2.default)(), {
        class_id: data.class_id,
        photo_img_ids: data.photo_img_ids
      }),
      method: 'delete'
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

// 点赞
function addLike(data) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/moment/like',
      data: Object.assign({}, (0, _commonData2.default)(), {
        moment_id: data.moment_id,
        class_id: data.class_id
      }),
      method: 'post'
    }).then(function (res) {
      resolve(res);
    });
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInpvbmUuanMiXSwibmFtZXMiOlsiYWRkQ2lyY2xlcyIsImFkZENvbGxlY3Rpb24iLCJhZGRBY3Rpdml0eSIsImFkZEFjY291bnQiLCJhZGROb3RpZnkiLCJhZGRQaG90byIsImRlbFBob3RvIiwicGhvdG9JbmRleCIsImdldENpcmNsZUxpc3QiLCJhZGRDb21tZW50Iiwiam9pbkFjdGl2aXR5IiwiZ2V0Q29tbWVudExpc3QiLCJkZWxldGVDaXJjbGUiLCJhZGRMaWtlIiwiZGF0YSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwid2VweSIsInJlcXVlc3QiLCJ1cmwiLCJPYmplY3QiLCJhc3NpZ24iLCJjbGFzc19pZCIsInNlZV90eXBlIiwiZGVzY3JpcHRpb24iLCJkZXNjIiwiaW1nX3VybCIsIm1ldGhvZCIsInRoZW4iLCJyZXMiLCJ0eXBlIiwiaXRlbSIsInNpZ25fdHlwZSIsInNlbGVjdF90eXBlIiwic2VsZWN0VHlwZSIsIm1vbmV5IiwiaW1nTGlzdCIsImlzX3JlbWluZCIsInJlbWluZCIsInBob3RvX2ltZ19pZHMiLCJwbiIsInBzIiwibW9tZW50X2lkIiwiY29udGVudCIsInJvb3RfaWQiLCJ0b19jb21tZW50X2lkIiwiYWN0aXZpdHlfaWQiLCJhY3Rpdml0eV9pdGVtX2lkIiwib2Zmc2V0Il0sIm1hcHBpbmdzIjoiOzs7OztRQUlnQkEsVSxHQUFBQSxVO1FBa0JBQyxhLEdBQUFBLGE7UUFrQkFDLFcsR0FBQUEsVztRQW9CQUMsVSxHQUFBQSxVO1FBbUJBQyxTLEdBQUFBLFM7UUFrQkFDLFEsR0FBQUEsUTtRQWdCQUMsUSxHQUFBQSxRO1FBZ0JBQyxVLEdBQUFBLFU7UUFnQkFDLGEsR0FBQUEsYTtRQWtCQUMsVSxHQUFBQSxVO1FBbUJBQyxZLEdBQUFBLFk7UUFpQkFDLGMsR0FBQUEsYztRQWlCQUMsWSxHQUFBQSxZO1FBZ0JBQyxPLEdBQUFBLE87O0FBeE9oQjs7OztBQUNBOzs7Ozs7QUFFQTtBQUNPLFNBQVNiLFVBQVQsQ0FBb0JjLElB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ICd3ZXB5J1xuaW1wb3J0IGNvbW1vblBhcmFtcyBmcm9tICcuL2NvbW1vbkRhdGEnXG5cbi8vIOWPkeW4g+WciOWtkFxuZXhwb3J0IGZ1bmN0aW9uIGFkZENpcmNsZXMoZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvbW9tZW50L2FkZENpcmNsZXMnLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXG4gICAgICAgIHNlZV90eXBlOiBkYXRhLnNlZV90eXBlLFxuICAgICAgICBkZXNjcmlwdGlvbjogZGF0YS5kZXNjLFxuICAgICAgICBpbWdfdXJsOiBkYXRhLmltZ191cmxcbiAgICAgIH0pLFxuICAgICAgbWV0aG9kOiAncG9zdCdcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDlj5HluIPmlLbmrL5cbmV4cG9ydCBmdW5jdGlvbiBhZGRDb2xsZWN0aW9uKGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL21vbWVudC9hZGRDb2xsZWN0aW9uJyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxuICAgICAgICB0eXBlOiBkYXRhLnR5cGUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBkYXRhLmRlc2MsXG4gICAgICAgIGl0ZW06IGRhdGEuaXRlbVxuICAgICAgfSksXG4gICAgICBtZXRob2Q6ICdwb3N0J1xuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOWPkeW4g+a0u+WKqFxuZXhwb3J0IGZ1bmN0aW9uIGFkZEFjdGl2aXR5KGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL21vbWVudC9hZGRBY3Rpdml0eScsXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xuICAgICAgICBjbGFzc19pZDogZGF0YS5jbGFzc19pZCxcbiAgICAgICAgc2lnbl90eXBlOiBkYXRhLnNpZ25fdHlwZSxcbiAgICAgICAgZGVzY3JpcHRpb246IGRhdGEuZGVzYyxcbiAgICAgICAgc2VsZWN0X3R5cGU6IGRhdGEuc2VsZWN0VHlwZSxcbiAgICAgICAgaXRlbTogZGF0YS5pdGVtLFxuICAgICAgICBpbWdfdXJsOiBkYXRhLmltZ191cmxcbiAgICAgIH0pLFxuICAgICAgbWV0aG9kOiAncG9zdCdcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDlj5HluIPorrDotKZcbmV4cG9ydCBmdW5jdGlvbiBhZGRBY2NvdW50KGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL21vbWVudC9hZGRBY2NvdW50JyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxuICAgICAgICB0eXBlOiBkYXRhLnR5cGUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBkYXRhLmRlc2MsXG4gICAgICAgIG1vbmV5OiBkYXRhLm1vbmV5LFxuICAgICAgICBpbWdfdXJsOiBkYXRhLmltZ0xpc3RcbiAgICAgIH0pLFxuICAgICAgbWV0aG9kOiAncG9zdCdcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDlj5HluIPpgJrnn6VcbmV4cG9ydCBmdW5jdGlvbiBhZGROb3RpZnkoZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvbW9tZW50L2FkZE5vdGlmeScsXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xuICAgICAgICBjbGFzc19pZDogZGF0YS5jbGFzc19pZCxcbiAgICAgICAgc2VlX3R5cGU6IGRhdGEudHlwZSxcbiAgICAgICAgZGVzY3JpcHRpb246IGRhdGEuZGVzYyxcbiAgICAgICAgaXNfcmVtaW5kOiBkYXRhLnJlbWluZFxuICAgICAgfSksXG4gICAgICBtZXRob2Q6ICdwb3N0J1xuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOS4iuS8oOebuOWGjFxuZXhwb3J0IGZ1bmN0aW9uIGFkZFBob3RvKGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2NsYXNzL3Bob3RvL2FkZCcsXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xuICAgICAgICBjbGFzc19pZDogZGF0YS5jbGFzc19pZCxcbiAgICAgICAgaW1nX3VybDogZGF0YS5pbWdfdXJsXG4gICAgICB9KSxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLy/liKDpmaTnm7jlhoxcbmV4cG9ydCBmdW5jdGlvbiBkZWxQaG90byhkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvY2xhc3MvcGhvdG8vZGVsJyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxuICAgICAgICBwaG90b19pbWdfaWRzOiBkYXRhLnBob3RvX2ltZ19pZHNcbiAgICAgIH0pLFxuICAgICAgbWV0aG9kOiAnZGVsZXRlJ1xuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOePree6p+ebuOWGjOWIl+ihqFxuZXhwb3J0IGZ1bmN0aW9uIHBob3RvSW5kZXgoZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvY2xhc3MvcGhvdG8vaW5kZXgnLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXG4gICAgICAgIHBuOiBkYXRhLnBuLFxuICAgICAgICBwczogZGF0YS5wc1xuICAgICAgfSlcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDojrflj5blnIjlrZDliJfooahcbmV4cG9ydCBmdW5jdGlvbiBnZXRDaXJjbGVMaXN0KGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL21vbWVudC9saXN0JyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxuICAgICAgICBzZWVfdHlwZTogZGF0YS5zZWVfdHlwZSxcbiAgICAgICAgdHlwZTogZGF0YS50eXBlLFxuICAgICAgICBwbjogZGF0YS5wbixcbiAgICAgICAgcHM6IGRhdGEucHNcbiAgICAgIH0pXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLy8g5Y+R5biD5ZyI5a2Q6K+E6K66XG5leHBvcnQgZnVuY3Rpb24gYWRkQ29tbWVudChkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9tb21lbnQvYWRkQ29tbWVudCcsXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xuICAgICAgICBjbGFzc19pZDogZGF0YS5jbGFzc19pZCxcbiAgICAgICAgbW9tZW50X2lkOiBkYXRhLm1vbWVudF9pZCxcbiAgICAgICAgY29udGVudDogZGF0YS5jb250ZW50LFxuICAgICAgICByb290X2lkOiBkYXRhLnJvb3RfaWQsXG4gICAgICAgIHRvX2NvbW1lbnRfaWQ6IGRhdGEudG9fY29tbWVudF9pZFxuICAgICAgfSksXG4gICAgICBtZXRob2Q6ICdwb3N0J1xuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOWPguWKoOWciOWtkOa0u+WKqFxuZXhwb3J0IGZ1bmN0aW9uIGpvaW5BY3Rpdml0eShkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9tb21lbnQvYWN0aXZpdHkvYWRkQXBwbHknLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXG4gICAgICAgIGFjdGl2aXR5X2lkOiBkYXRhLmFjdGl2aXR5X2lkLFxuICAgICAgICBhY3Rpdml0eV9pdGVtX2lkOiBkYXRhLmFjdGl2aXR5X2l0ZW1faWRcbiAgICAgIH0pLFxuICAgICAgbWV0aG9kOiAncG9zdCdcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDliqDovb3mm7TlpJror4TorrrliJfooahcbmV4cG9ydCBmdW5jdGlvbiBnZXRDb21tZW50TGlzdChkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9tb21lbnQvZ2V0Q29tbWVudExpc3QnLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcbiAgICAgICAgbW9tZW50X2lkOiBkYXRhLm1vbWVudF9pZCxcbiAgICAgICAgcG46IGRhdGEucG4sXG4gICAgICAgIHBzOiBkYXRhLnBzLFxuICAgICAgICBvZmZzZXQ6IGRhdGEub2Zmc2V0XG4gICAgICB9KVxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOWIoOmZpOWciOWtkFxuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZUNpcmNsZShkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9tb21lbnQvZGVsZXRlJyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIG1vbWVudF9pZDogZGF0YS5tb21lbnRfaWQsXG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkXG4gICAgICB9KSxcbiAgICAgIG1ldGhvZDogJ2RlbGV0ZSdcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDngrnotZ5cbmV4cG9ydCBmdW5jdGlvbiBhZGRMaWtlKGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL21vbWVudC9saWtlJyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIG1vbWVudF9pZDogZGF0YS5tb21lbnRfaWQsXG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkXG4gICAgICB9KSxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cbiJdfQ==