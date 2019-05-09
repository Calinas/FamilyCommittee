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
exports.deleteRecord = deleteRecord;
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

//删除记账
function deleteRecord(data) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/moment/delete',
      data: Object.assign({}, (0, _commonData2.default)(), {
        moment_id: data.moment_id,
        class_id: data.class_id,
        undo_msg: data.undo_msg
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInpvbmUuanMiXSwibmFtZXMiOlsiYWRkQ2lyY2xlcyIsImFkZENvbGxlY3Rpb24iLCJhZGRBY3Rpdml0eSIsImFkZEFjY291bnQiLCJhZGROb3RpZnkiLCJhZGRQaG90byIsImRlbFBob3RvIiwicGhvdG9JbmRleCIsImdldENpcmNsZUxpc3QiLCJhZGRDb21tZW50Iiwiam9pbkFjdGl2aXR5IiwiZ2V0Q29tbWVudExpc3QiLCJkZWxldGVDaXJjbGUiLCJkZWxldGVSZWNvcmQiLCJhZGRMaWtlIiwiZGF0YSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwid2VweSIsInJlcXVlc3QiLCJ1cmwiLCJPYmplY3QiLCJhc3NpZ24iLCJjbGFzc19pZCIsInNlZV90eXBlIiwiZGVzY3JpcHRpb24iLCJkZXNjIiwiaW1nX3VybCIsIm1ldGhvZCIsInRoZW4iLCJyZXMiLCJ0eXBlIiwiaXRlbSIsInNpZ25fdHlwZSIsInNlbGVjdF90eXBlIiwic2VsZWN0VHlwZSIsIm1vbmV5IiwiaW1nTGlzdCIsImlzX3JlbWluZCIsInJlbWluZCIsInBob3RvX2ltZ19pZHMiLCJwbiIsInBzIiwibW9tZW50X2lkIiwiY29udGVudCIsInJvb3RfaWQiLCJ0b19jb21tZW50X2lkIiwiYWN0aXZpdHlfaWQiLCJhY3Rpdml0eV9pdGVtX2lkIiwib2Zmc2V0IiwidW5kb19tc2ciXSwibWFwcGluZ3MiOiI7Ozs7O1FBSWdCQSxVLEdBQUFBLFU7UUFrQkFDLGEsR0FBQUEsYTtRQWtCQUMsVyxHQUFBQSxXO1FBb0JBQyxVLEdBQUFBLFU7UUFtQkFDLFMsR0FBQUEsUztRQWtCQUMsUSxHQUFBQSxRO1FBZ0JBQyxRLEdBQUFBLFE7UUFnQkFDLFUsR0FBQUEsVTtRQWdCQUMsYSxHQUFBQSxhO1FBa0JBQyxVLEdBQUFBLFU7UUFtQkFDLFksR0FBQUEsWTtRQWlCQUMsYyxHQUFBQSxjO1FBaUJBQyxZLEdBQUFBLFk7UUFnQkFDLFksR0FBQUEsWTtRQWlCQUMsTyxHQUFBQSxPOztBQXpQaEI7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O0FBV0QsR0FaTSxDQUFQO0FBYUQ7O0FBRUQ7QUFDTyxTQUFTakIsT0FBVCxDQUFpQkMsSUFBakIsRUFBdUI7QUFDNUIsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLFdBQUssY0FETTtBQUVYTixZQUFNTyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQiwyQkFBbEIsRUFBa0M7QUFDdENxQixtQkFBVzdCLEtBQUs2QixTQURzQjtBQUV0Q3BCLGtCQUFVVCxLQUFLUztBQUZ1QixPQUFsQyxDQUZLO0FBTVhLLGNBQVE7QUFORyxLQUFiLEVBT0dDLElBUEgsQ0FPUSxlQUFPO0FBQ2JiLGNBQVFjLEdBQVI7QUFDRCxLQVREO0FBVUQsR0FYTSxDQUFQO0FBWUQiLCJmaWxlIjoiem9uZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgY29tbW9uUGFyYW1zIGZyb20gJy4vY29tbW9uRGF0YSdcblxuLy8g5Y+R5biD5ZyI5a2QXG5leHBvcnQgZnVuY3Rpb24gYWRkQ2lyY2xlcyhkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9tb21lbnQvYWRkQ2lyY2xlcycsXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xuICAgICAgICBjbGFzc19pZDogZGF0YS5jbGFzc19pZCxcbiAgICAgICAgc2VlX3R5cGU6IGRhdGEuc2VlX3R5cGUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBkYXRhLmRlc2MsXG4gICAgICAgIGltZ191cmw6IGRhdGEuaW1nX3VybFxuICAgICAgfSksXG4gICAgICBtZXRob2Q6ICdwb3N0J1xuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOWPkeW4g+aUtuasvlxuZXhwb3J0IGZ1bmN0aW9uIGFkZENvbGxlY3Rpb24oZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvbW9tZW50L2FkZENvbGxlY3Rpb24nLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXG4gICAgICAgIHR5cGU6IGRhdGEudHlwZSxcbiAgICAgICAgZGVzY3JpcHRpb246IGRhdGEuZGVzYyxcbiAgICAgICAgaXRlbTogZGF0YS5pdGVtXG4gICAgICB9KSxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLy8g5Y+R5biD5rS75YqoXG5leHBvcnQgZnVuY3Rpb24gYWRkQWN0aXZpdHkoZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvbW9tZW50L2FkZEFjdGl2aXR5JyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxuICAgICAgICBzaWduX3R5cGU6IGRhdGEuc2lnbl90eXBlLFxuICAgICAgICBkZXNjcmlwdGlvbjogZGF0YS5kZXNjLFxuICAgICAgICBzZWxlY3RfdHlwZTogZGF0YS5zZWxlY3RUeXBlLFxuICAgICAgICBpdGVtOiBkYXRhLml0ZW0sXG4gICAgICAgIGltZ191cmw6IGRhdGEuaW1nX3VybFxuICAgICAgfSksXG4gICAgICBtZXRob2Q6ICdwb3N0J1xuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOWPkeW4g+iusOi0plxuZXhwb3J0IGZ1bmN0aW9uIGFkZEFjY291bnQoZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvbW9tZW50L2FkZEFjY291bnQnLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXG4gICAgICAgIHR5cGU6IGRhdGEudHlwZSxcbiAgICAgICAgZGVzY3JpcHRpb246IGRhdGEuZGVzYyxcbiAgICAgICAgbW9uZXk6IGRhdGEubW9uZXksXG4gICAgICAgIGltZ191cmw6IGRhdGEuaW1nTGlzdFxuICAgICAgfSksXG4gICAgICBtZXRob2Q6ICdwb3N0J1xuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOWPkeW4g+mAmuefpVxuZXhwb3J0IGZ1bmN0aW9uIGFkZE5vdGlmeShkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9tb21lbnQvYWRkTm90aWZ5JyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxuICAgICAgICBzZWVfdHlwZTogZGF0YS50eXBlLFxuICAgICAgICBkZXNjcmlwdGlvbjogZGF0YS5kZXNjLFxuICAgICAgICBpc19yZW1pbmQ6IGRhdGEucmVtaW5kXG4gICAgICB9KSxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLy8g5LiK5Lyg55u45YaMXG5leHBvcnQgZnVuY3Rpb24gYWRkUGhvdG8oZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvY2xhc3MvcGhvdG8vYWRkJyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxuICAgICAgICBpbWdfdXJsOiBkYXRhLmltZ191cmxcbiAgICAgIH0pLFxuICAgICAgbWV0aG9kOiAncG9zdCdcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vL+WIoOmZpOebuOWGjFxuZXhwb3J0IGZ1bmN0aW9uIGRlbFBob3RvKGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9jbGFzcy9waG90by9kZWwnLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXG4gICAgICAgIHBob3RvX2ltZ19pZHM6IGRhdGEucGhvdG9faW1nX2lkc1xuICAgICAgfSksXG4gICAgICBtZXRob2Q6ICdkZWxldGUnXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLy8g54+t57qn55u45YaM5YiX6KGoXG5leHBvcnQgZnVuY3Rpb24gcGhvdG9JbmRleChkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9jbGFzcy9waG90by9pbmRleCcsXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xuICAgICAgICBjbGFzc19pZDogZGF0YS5jbGFzc19pZCxcbiAgICAgICAgcG46IGRhdGEucG4sXG4gICAgICAgIHBzOiBkYXRhLnBzXG4gICAgICB9KVxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOiOt+WPluWciOWtkOWIl+ihqFxuZXhwb3J0IGZ1bmN0aW9uIGdldENpcmNsZUxpc3QoZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvbW9tZW50L2xpc3QnLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXG4gICAgICAgIHNlZV90eXBlOiBkYXRhLnNlZV90eXBlLFxuICAgICAgICB0eXBlOiBkYXRhLnR5cGUsXG4gICAgICAgIHBuOiBkYXRhLnBuLFxuICAgICAgICBwczogZGF0YS5wc1xuICAgICAgfSlcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDlj5HluIPlnIjlrZDor4TorrpcbmV4cG9ydCBmdW5jdGlvbiBhZGRDb21tZW50KGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL21vbWVudC9hZGRDb21tZW50JyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxuICAgICAgICBtb21lbnRfaWQ6IGRhdGEubW9tZW50X2lkLFxuICAgICAgICBjb250ZW50OiBkYXRhLmNvbnRlbnQsXG4gICAgICAgIHJvb3RfaWQ6IGRhdGEucm9vdF9pZCxcbiAgICAgICAgdG9fY29tbWVudF9pZDogZGF0YS50b19jb21tZW50X2lkXG4gICAgICB9KSxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLy8g5Y+C5Yqg5ZyI5a2Q5rS75YqoXG5leHBvcnQgZnVuY3Rpb24gam9pbkFjdGl2aXR5KGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL21vbWVudC9hY3Rpdml0eS9hZGRBcHBseScsXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xuICAgICAgICBjbGFzc19pZDogZGF0YS5jbGFzc19pZCxcbiAgICAgICAgYWN0aXZpdHlfaWQ6IGRhdGEuYWN0aXZpdHlfaWQsXG4gICAgICAgIGFjdGl2aXR5X2l0ZW1faWQ6IGRhdGEuYWN0aXZpdHlfaXRlbV9pZFxuICAgICAgfSksXG4gICAgICBtZXRob2Q6ICdwb3N0J1xuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOWKoOi9veabtOWkmuivhOiuuuWIl+ihqFxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbW1lbnRMaXN0KGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL21vbWVudC9nZXRDb21tZW50TGlzdCcsXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xuICAgICAgICBtb21lbnRfaWQ6IGRhdGEubW9tZW50X2lkLFxuICAgICAgICBwbjogZGF0YS5wbixcbiAgICAgICAgcHM6IGRhdGEucHMsXG4gICAgICAgIG9mZnNldDogZGF0YS5vZmZzZXRcbiAgICAgIH0pXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLy8g5Yig6Zmk5ZyI5a2QXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlQ2lyY2xlKGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL21vbWVudC9kZWxldGUnLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcbiAgICAgICAgbW9tZW50X2lkOiBkYXRhLm1vbWVudF9pZCxcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWRcbiAgICAgIH0pLFxuICAgICAgbWV0aG9kOiAnZGVsZXRlJ1xuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8v5Yig6Zmk6K6w6LSmXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlUmVjb3JkKGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL21vbWVudC9kZWxldGUnLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcbiAgICAgICAgbW9tZW50X2lkOiBkYXRhLm1vbWVudF9pZCxcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXG4gICAgICAgIHVuZG9fbXNnOiBkYXRhLnVuZG9fbXNnXG4gICAgICB9KSxcbiAgICAgIG1ldGhvZDogJ2RlbGV0ZSdcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDngrnotZ5cbmV4cG9ydCBmdW5jdGlvbiBhZGRMaWtlKGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL21vbWVudC9saWtlJyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIG1vbWVudF9pZDogZGF0YS5tb21lbnRfaWQsXG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkXG4gICAgICB9KSxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cbiJdfQ==