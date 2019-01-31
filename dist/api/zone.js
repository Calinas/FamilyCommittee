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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInpvbmUuanMiXSwibmFtZXMiOlsiYWRkQ2lyY2xlcyIsImFkZENvbGxlY3Rpb24iLCJhZGRBY3Rpdml0eSIsImFkZEFjY291bnQiLCJhZGROb3RpZnkiLCJhZGRQaG90byIsInBob3RvSW5kZXgiLCJnZXRDaXJjbGVMaXN0IiwiYWRkQ29tbWVudCIsImpvaW5BY3Rpdml0eSIsImRhdGEiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIndlcHkiLCJyZXF1ZXN0IiwidXJsIiwiT2JqZWN0IiwiYXNzaWduIiwiY2xhc3NfaWQiLCJzZWVfdHlwZSIsInR5cGUiLCJkZXNjcmlwdGlvbiIsImRlc2MiLCJpbWdfdXJsIiwibWV0aG9kIiwidGhlbiIsInJlcyIsIml0ZW0iLCJzaWduX3R5cGUiLCJzZWxlY3RfdHlwZSIsInNlbGVjdFR5cGUiLCJtb25leSIsImltZ0xpc3QiLCJpc19yZW1pbmQiLCJyZW1pbmQiLCJwbiIsInBzIiwibW9tZW50X2lkIiwiY29udGVudCIsInJvb3RfaWQiLCJ0b19jb21tZW50X2lkIiwiYWN0aXZpdHlfaWQiLCJhY3Rpdml0eV9pdGVtX2lkIl0sIm1hcHBpbmdzIjoiOzs7OztRQUlnQkEsVSxHQUFBQSxVO1FBa0JBQyxhLEdBQUFBLGE7UUFrQkFDLFcsR0FBQUEsVztRQW9CQUMsVSxHQUFBQSxVO1FBbUJBQyxTLEdBQUFBLFM7UUFrQkFDLFEsR0FBQUEsUTtRQWdCQUMsVSxHQUFBQSxVO1FBZ0JBQyxhLEdBQUFBLGE7UUFrQkFDLFUsR0FBQUEsVTtRQW1CQUMsWSxHQUFBQSxZOztBQXRLaEI7Ozs7QUFDQTs7Ozs7O0FBRUE7QUFDTyxTQUFTVCxVQUFULENBQW9CVSxJQUFwQixFQUEwQjtBQUMvQixTQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLG1CQUFLQyxPQUFMLENBQWE7QUFDWEMsV0FBSyxvQkFETTtBQUVYTixZQUFNTyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQiwy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QUFDdENDLGtCQUFVVCxLQUFLUyxRQUR1QjtBQUV0Q3VCLHFCQUFhaEMsS0FBS2dDLFdBRm9CO0FBR3RDQywwQkFBa0JqQyxLQUFLaUM7QUFIZSxPQUFsQyxDQUZLO0FBT1hsQixjQUFRO0FBUEcsS0FBYixFQVFHQyxJQVJILENBUVEsZUFBTztBQUNiZCxjQUFRZSxHQUFSO0FBQ0QsS0FWRDtBQVdELEdBWk0sQ0FBUDtBQWFEIiwiZmlsZSI6InpvbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IGNvbW1vblBhcmFtcyBmcm9tICcuL2NvbW1vbkRhdGEnXG5cbi8vIOWPkeW4g+WciOWtkFxuZXhwb3J0IGZ1bmN0aW9uIGFkZENpcmNsZXMoZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvbW9tZW50L2FkZENpcmNsZXMnLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXG4gICAgICAgIHNlZV90eXBlOiBkYXRhLnR5cGUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBkYXRhLmRlc2MsXG4gICAgICAgIGltZ191cmw6IGRhdGEuaW1nX3VybFxuICAgICAgfSksXG4gICAgICBtZXRob2Q6ICdwb3N0J1xuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOWPkeW4g+aUtuasvlxuZXhwb3J0IGZ1bmN0aW9uIGFkZENvbGxlY3Rpb24oZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvbW9tZW50L2FkZENvbGxlY3Rpb24nLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXG4gICAgICAgIHR5cGU6IGRhdGEudHlwZSxcbiAgICAgICAgZGVzY3JpcHRpb246IGRhdGEuZGVzYyxcbiAgICAgICAgaXRlbTogZGF0YS5pdGVtXG4gICAgICB9KSxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLy8g5Y+R5biD5rS75YqoXG5leHBvcnQgZnVuY3Rpb24gYWRkQWN0aXZpdHkoZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvbW9tZW50L2FkZEFjdGl2aXR5JyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxuICAgICAgICBzaWduX3R5cGU6IGRhdGEuc2lnbl90eXBlLFxuICAgICAgICBkZXNjcmlwdGlvbjogZGF0YS5kZXNjLFxuICAgICAgICBzZWxlY3RfdHlwZTogZGF0YS5zZWxlY3RUeXBlLFxuICAgICAgICBpdGVtOiBkYXRhLml0ZW0sXG4gICAgICAgIGltZ191cmw6IGRhdGEuaW1nX3VybFxuICAgICAgfSksXG4gICAgICBtZXRob2Q6ICdwb3N0J1xuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOWPkeW4g+iusOi0plxuZXhwb3J0IGZ1bmN0aW9uIGFkZEFjY291bnQoZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvbW9tZW50L2FkZEFjY291bnQnLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXG4gICAgICAgIHR5cGU6IGRhdGEudHlwZSxcbiAgICAgICAgZGVzY3JpcHRpb246IGRhdGEuZGVzYyxcbiAgICAgICAgbW9uZXk6IGRhdGEubW9uZXksXG4gICAgICAgIGltZ191cmw6IGRhdGEuaW1nTGlzdFxuICAgICAgfSksXG4gICAgICBtZXRob2Q6ICdwb3N0J1xuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOWPkeW4g+mAmuefpVxuZXhwb3J0IGZ1bmN0aW9uIGFkZE5vdGlmeShkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9tb21lbnQvYWRkTm90aWZ5JyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxuICAgICAgICBzZWVfdHlwZTogZGF0YS50eXBlLFxuICAgICAgICBkZXNjcmlwdGlvbjogZGF0YS5kZXNjLFxuICAgICAgICBpc19yZW1pbmQ6IGRhdGEucmVtaW5kXG4gICAgICB9KSxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLy8g5LiK5Lyg55u45YaMXG5leHBvcnQgZnVuY3Rpb24gYWRkUGhvdG8oZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvY2xhc3MvcGhvdG8vYWRkJyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxuICAgICAgICBpbWdfdXJsOiBkYXRhLmltZ191cmxcbiAgICAgIH0pLFxuICAgICAgbWV0aG9kOiAncG9zdCdcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDnj63nuqfnm7jlhozliJfooahcbmV4cG9ydCBmdW5jdGlvbiBwaG90b0luZGV4KGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2NsYXNzL3Bob3RvL2luZGV4JyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxuICAgICAgICBwbjogZGF0YS5wbixcbiAgICAgICAgcHM6IGRhdGEucHNcbiAgICAgIH0pXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLy8g6I635Y+W5ZyI5a2Q5YiX6KGoXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2lyY2xlTGlzdChkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9tb21lbnQvbGlzdCcsXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xuICAgICAgICBjbGFzc19pZDogZGF0YS5jbGFzc19pZCxcbiAgICAgICAgc2VlX3R5cGU6IGRhdGEuc2VlX3R5cGUsXG4gICAgICAgIHR5cGU6IGRhdGEudHlwZSxcbiAgICAgICAgcG46IGRhdGEucG4sXG4gICAgICAgIHBzOiBkYXRhLnBzXG4gICAgICB9KVxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOWPkeW4g+WciOWtkOivhOiuulxuZXhwb3J0IGZ1bmN0aW9uIGFkZENvbW1lbnQoZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvbW9tZW50L2FkZENvbW1lbnQnLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXG4gICAgICAgIG1vbWVudF9pZDogZGF0YS5tb21lbnRfaWQsXG4gICAgICAgIGNvbnRlbnQ6IGRhdGEuY29udGVudCxcbiAgICAgICAgcm9vdF9pZDogZGF0YS5yb290X2lkLFxuICAgICAgICB0b19jb21tZW50X2lkOiBkYXRhLnRvX2NvbW1lbnRfaWRcbiAgICAgIH0pLFxuICAgICAgbWV0aG9kOiAncG9zdCdcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDlj4LliqDlnIjlrZDmtLvliqhcbmV4cG9ydCBmdW5jdGlvbiBqb2luQWN0aXZpdHkoZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvbW9tZW50L2FjdGl2aXR5L2FkZEFwcGx5JyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxuICAgICAgICBhY3Rpdml0eV9pZDogZGF0YS5hY3Rpdml0eV9pZCxcbiAgICAgICAgYWN0aXZpdHlfaXRlbV9pZDogZGF0YS5hY3Rpdml0eV9pdGVtX2lkXG4gICAgICB9KSxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cbiJdfQ==