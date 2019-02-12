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
        see_type: data.type,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInpvbmUuanMiXSwibmFtZXMiOlsiYWRkQ2lyY2xlcyIsImFkZENvbGxlY3Rpb24iLCJhZGRBY3Rpdml0eSIsImFkZEFjY291bnQiLCJhZGROb3RpZnkiLCJhZGRQaG90byIsInBob3RvSW5kZXgiLCJnZXRDaXJjbGVMaXN0IiwiYWRkQ29tbWVudCIsImpvaW5BY3Rpdml0eSIsImdldENvbW1lbnRMaXN0IiwiZGF0YSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwid2VweSIsInJlcXVlc3QiLCJ1cmwiLCJPYmplY3QiLCJhc3NpZ24iLCJjbGFzc19pZCIsInNlZV90eXBlIiwidHlwZSIsImRlc2NyaXB0aW9uIiwiZGVzYyIsImltZ191cmwiLCJtZXRob2QiLCJ0aGVuIiwicmVzIiwiaXRlbSIsInNpZ25fdHlwZSIsInNlbGVjdF90eXBlIiwic2VsZWN0VHlwZSIsIm1vbmV5IiwiaW1nTGlzdCIsImlzX3JlbWluZCIsInJlbWluZCIsInBuIiwicHMiLCJtb21lbnRfaWQiLCJjb250ZW50Iiwicm9vdF9pZCIsInRvX2NvbW1lbnRfaWQiLCJhY3Rpdml0eV9pZCIsImFjdGl2aXR5X2l0ZW1faWQiLCJvZmZzZXQiXSwibWFwcGluZ3MiOiI7Ozs7O1FBSWdCQSxVLEdBQUFBLFU7UUFrQkFDLGEsR0FBQUEsYTtRQWtCQUMsVyxHQUFBQSxXO1FBb0JBQyxVLEdBQUFBLFU7UUFtQkFDLFMsR0FBQUEsUztRQWtCQUMsUSxHQUFBQSxRO1FBZ0JBQyxVLEdBQUFBLFU7UUFnQkFDLGEsR0FBQUEsYTtRQWtCQUMsVSxHQUFBQSxVO1FBbUJBQyxZLEdBQUFBLFk7UUFpQkFDLGMsR0FBQUEsYzs7QUF2TGhCOzs7O0FBQ0E7Ozs7OztBQUVBO0FBQ08sU0FBU1YsVUFBVCxDQUFvQlcsSUFBcEIsRUFBMEI7QUFDL0IsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLFdBQUssb0JB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TU8sT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsMkJBQWxCLEVBQWtDO0FBQ3RDQyxrQkFBVVQsS0FBS1MsUUFEdUI7QUFFdEN1QixxQkFBYWhDLEtBQUtnQyxXQUZvQjtBQUd0Q0MsMEJBQWtCakMsS0FBS2lDO0FBSGUsT0FBbEMsQ0FGSztBQU9YbEIsY0FBUTtBQVBHLEtBQWIsRUFRR0MsSUFSSCxDQVFRLGVBQU87QUFDYmQsY0FBUWUsR0FBUjtBQUNELEtBVkQ7QUFXRCxHQVpNLENBQVA7QUFhRDs7QUFFRDtBQUNPLFNBQVNsQixjQUFULENBQXdCQyxJQUF4QixFQUE4QjtBQUNuQyxTQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLG1CQUFLQyxPQUFMLENBQWE7QUFDWEMsV0FBSyx3QkFETTtBQUVYTixZQUFNTyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQiwyQkFBbEIsRUFBa0M7QUFDdENvQixtQkFBVzVCLEtBQUs0QixTQURzQjtBQUV0Q0YsWUFBSTFCLEtBQUswQixFQUY2QjtBQUd0Q0MsWUFBSTNCLEtBQUsyQixFQUg2QjtBQUl0Q08sZ0JBQVFsQyxLQUFLa0M7QUFKeUIsT0FBbEM7QUFGSyxLQUFiLEVBUUdsQixJQVJILENBUVEsZUFBTztBQUNiZCxjQUFRZSxHQUFSO0FBQ0QsS0FWRDtBQVdELEdBWk0sQ0FBUDtBQWFEIiwiZmlsZSI6InpvbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IGNvbW1vblBhcmFtcyBmcm9tICcuL2NvbW1vbkRhdGEnXG5cbi8vIOWPkeW4g+WciOWtkFxuZXhwb3J0IGZ1bmN0aW9uIGFkZENpcmNsZXMoZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvbW9tZW50L2FkZENpcmNsZXMnLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXG4gICAgICAgIHNlZV90eXBlOiBkYXRhLnR5cGUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBkYXRhLmRlc2MsXG4gICAgICAgIGltZ191cmw6IGRhdGEuaW1nX3VybFxuICAgICAgfSksXG4gICAgICBtZXRob2Q6ICdwb3N0J1xuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOWPkeW4g+aUtuasvlxuZXhwb3J0IGZ1bmN0aW9uIGFkZENvbGxlY3Rpb24oZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvbW9tZW50L2FkZENvbGxlY3Rpb24nLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXG4gICAgICAgIHR5cGU6IGRhdGEudHlwZSxcbiAgICAgICAgZGVzY3JpcHRpb246IGRhdGEuZGVzYyxcbiAgICAgICAgaXRlbTogZGF0YS5pdGVtXG4gICAgICB9KSxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLy8g5Y+R5biD5rS75YqoXG5leHBvcnQgZnVuY3Rpb24gYWRkQWN0aXZpdHkoZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvbW9tZW50L2FkZEFjdGl2aXR5JyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxuICAgICAgICBzaWduX3R5cGU6IGRhdGEuc2lnbl90eXBlLFxuICAgICAgICBkZXNjcmlwdGlvbjogZGF0YS5kZXNjLFxuICAgICAgICBzZWxlY3RfdHlwZTogZGF0YS5zZWxlY3RUeXBlLFxuICAgICAgICBpdGVtOiBkYXRhLml0ZW0sXG4gICAgICAgIGltZ191cmw6IGRhdGEuaW1nX3VybFxuICAgICAgfSksXG4gICAgICBtZXRob2Q6ICdwb3N0J1xuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOWPkeW4g+iusOi0plxuZXhwb3J0IGZ1bmN0aW9uIGFkZEFjY291bnQoZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvbW9tZW50L2FkZEFjY291bnQnLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXG4gICAgICAgIHR5cGU6IGRhdGEudHlwZSxcbiAgICAgICAgZGVzY3JpcHRpb246IGRhdGEuZGVzYyxcbiAgICAgICAgbW9uZXk6IGRhdGEubW9uZXksXG4gICAgICAgIGltZ191cmw6IGRhdGEuaW1nTGlzdFxuICAgICAgfSksXG4gICAgICBtZXRob2Q6ICdwb3N0J1xuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOWPkeW4g+mAmuefpVxuZXhwb3J0IGZ1bmN0aW9uIGFkZE5vdGlmeShkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9tb21lbnQvYWRkTm90aWZ5JyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxuICAgICAgICBzZWVfdHlwZTogZGF0YS50eXBlLFxuICAgICAgICBkZXNjcmlwdGlvbjogZGF0YS5kZXNjLFxuICAgICAgICBpc19yZW1pbmQ6IGRhdGEucmVtaW5kXG4gICAgICB9KSxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLy8g5LiK5Lyg55u45YaMXG5leHBvcnQgZnVuY3Rpb24gYWRkUGhvdG8oZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvY2xhc3MvcGhvdG8vYWRkJyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxuICAgICAgICBpbWdfdXJsOiBkYXRhLmltZ191cmxcbiAgICAgIH0pLFxuICAgICAgbWV0aG9kOiAncG9zdCdcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDnj63nuqfnm7jlhozliJfooahcbmV4cG9ydCBmdW5jdGlvbiBwaG90b0luZGV4KGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2NsYXNzL3Bob3RvL2luZGV4JyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxuICAgICAgICBwbjogZGF0YS5wbixcbiAgICAgICAgcHM6IGRhdGEucHNcbiAgICAgIH0pXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLy8g6I635Y+W5ZyI5a2Q5YiX6KGoXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2lyY2xlTGlzdChkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9tb21lbnQvbGlzdCcsXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xuICAgICAgICBjbGFzc19pZDogZGF0YS5jbGFzc19pZCxcbiAgICAgICAgc2VlX3R5cGU6IGRhdGEuc2VlX3R5cGUsXG4gICAgICAgIHR5cGU6IGRhdGEudHlwZSxcbiAgICAgICAgcG46IGRhdGEucG4sXG4gICAgICAgIHBzOiBkYXRhLnBzXG4gICAgICB9KVxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOWPkeW4g+WciOWtkOivhOiuulxuZXhwb3J0IGZ1bmN0aW9uIGFkZENvbW1lbnQoZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvbW9tZW50L2FkZENvbW1lbnQnLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXG4gICAgICAgIG1vbWVudF9pZDogZGF0YS5tb21lbnRfaWQsXG4gICAgICAgIGNvbnRlbnQ6IGRhdGEuY29udGVudCxcbiAgICAgICAgcm9vdF9pZDogZGF0YS5yb290X2lkLFxuICAgICAgICB0b19jb21tZW50X2lkOiBkYXRhLnRvX2NvbW1lbnRfaWRcbiAgICAgIH0pLFxuICAgICAgbWV0aG9kOiAncG9zdCdcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDlj4LliqDlnIjlrZDmtLvliqhcbmV4cG9ydCBmdW5jdGlvbiBqb2luQWN0aXZpdHkoZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvbW9tZW50L2FjdGl2aXR5L2FkZEFwcGx5JyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxuICAgICAgICBhY3Rpdml0eV9pZDogZGF0YS5hY3Rpdml0eV9pZCxcbiAgICAgICAgYWN0aXZpdHlfaXRlbV9pZDogZGF0YS5hY3Rpdml0eV9pdGVtX2lkXG4gICAgICB9KSxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLy8g5Yqg6L295pu05aSa6K+E6K665YiX6KGoXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29tbWVudExpc3QoZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvbW9tZW50L2dldENvbW1lbnRMaXN0JyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIG1vbWVudF9pZDogZGF0YS5tb21lbnRfaWQsXG4gICAgICAgIHBuOiBkYXRhLnBuLFxuICAgICAgICBwczogZGF0YS5wcyxcbiAgICAgICAgb2Zmc2V0OiBkYXRhLm9mZnNldFxuICAgICAgfSlcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuIl19