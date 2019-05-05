'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bindIdentity = bindIdentity;
exports.bindTeacher = bindTeacher;
exports.bindMobile = bindMobile;
exports.validateCode = validateCode;
exports.replaceMobile = replaceMobile;
exports.getIdentityList = getIdentityList;
exports.checkStudent = checkStudent;
exports.identityList = identityList;
exports.getMemberList = getMemberList;
exports.memberInfo = memberInfo;
exports.addAdvice = addAdvice;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _commonData = require('./commonData.js');

var _commonData2 = _interopRequireDefault(_commonData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 绑定身份
function bindIdentity(data) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/member/class/bindIdentity',
      data: Object.assign({}, (0, _commonData2.default)(), {
        class_id: data.class_id,
        item: data.item
      }),
      method: 'post'
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 绑定老师
function bindTeacher(data) {
  return new Promise(function (resolve) {
    _wepy2.default.request({
      url: '/member/class/bindTeacher',
      data: Object.assign({}, (0, _commonData2.default)(), {
        class_id: data.class_id,
        name: data.name
      }),
      method: 'post'
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 绑定手机
function bindMobile(data) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/member/bindMobile',
      data: {
        member_id: data.id,
        mobile: data.mobile
      },
      method: 'post'
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 获取手机验证码
function validateCode(data) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/auth/validateCode',
      data: {
        mobile: data.mobile,
        action: 'bind_mobile'
      },
      method: 'post'
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 更换手机
function replaceMobile(data) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/class/member/replaceMobile',
      data: {
        mobile: data.mobile,
        member_id: data.id,
        code: data.code
      },
      method: 'post'
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 获取身份列表
function getIdentityList(data) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/class/getIdentityList',
      data: Object.assign({}, (0, _commonData2.default)())
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 检查用户是否有多个学生
function checkStudent(data) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/member/class/bindStudent',
      data: Object.assign({}, (0, _commonData2.default)(), {
        class_id: data.class_id,
        moment_id: data.moment_id,
        is_pay: data.is_pay
      })
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 获取班级绑定得身份列表
function identityList(data) {
  return new Promise(function (resolve) {
    _wepy2.default.request({
      url: '/member/class/identityList',
      data: Object.assign({}, (0, _commonData2.default)(), {
        class_id: data.class_id
      })
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 获取班级人员列表
function getMemberList(data) {
  return new Promise(function (resolve) {
    _wepy2.default.request({
      url: '/class/getMemberList',
      data: Object.assign({}, (0, _commonData2.default)(), {
        class_id: data.class_id
      })
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 获取会员信息
function memberInfo(data) {
  return new Promise(function (resolve) {
    _wepy2.default.request({
      url: '/member/info',
      data: Object.assign({}, (0, _commonData2.default)(), {
        class_id: data.class_id
      })
    }).then(function (res) {
      resolve(res);
    });
  });
}

function addAdvice(data) {
  return new Promise(function (resolve) {
    _wepy2.default.request({
      url: '/postAdvice',
      data: Object.assign({}, (0, _commonData2.default)(), {
        description: data.description,
        img_url: data.imgList
      }),
      method: 'post'
    }).then(function (res) {
      resolve(res);
    });
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsiYmluZElkZW50aXR5IiwiYmluZFRlYWNoZXIiLCJiaW5kTW9iaWxlIiwidmFsaWRhdGVDb2RlIiwicmVwbGFjZU1vYmlsZSIsImdldElkZW50aXR5TGlzdCIsImNoZWNrU3R1ZGVudCIsImlkZW50aXR5TGlzdCIsImdldE1lbWJlckxpc3QiLCJtZW1iZXJJbmZvIiwiYWRkQWR2aWNlIiwiZGF0YSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwid2VweSIsInJlcXVlc3QiLCJ1cmwiLCJPYmplY3QiLCJhc3NpZ24iLCJjbGFzc19pZCIsIml0ZW0iLCJtZXRob2QiLCJ0aGVuIiwicmVzIiwibmFtZSIsIm1lbWJlcl9pZCIsImlkIiwibW9iaWxlIiwiYWN0aW9uIiwiY29kZSIsIm1vbWVudF9pZCIsImlzX3BheSIsImRlc2NyaXB0aW9uIiwiaW1nX3VybCIsImltZ0xpc3QiXSwibWFwcGluZ3MiOiI7Ozs7O1FBSWdCQSxZLEdBQUFBLFk7UUFnQkFDLFcsR0FBQUEsVztRQWdCQUMsVSxHQUFBQSxVO1FBZ0JBQyxZLEdBQUFBLFk7UUFnQkFDLGEsR0FBQUEsYTtRQWlCQUMsZSxHQUFBQSxlO1FBWUFDLFksR0FBQUEsWTtRQWdCQUMsWSxHQUFBQSxZO1FBY0FDLGEsR0FBQUEsYTtRQWNBQyxVLEdBQUFBLFU7UUFhQUMsUyxHQUFBQSxTOztBQTFKaEI7Ozs7QUFDQTs7Ozs7O0FBRUE7QUFDTyxTQUFTVixZQUFULENBQXNCVyxJQUF0QixFQUE0QjtBQUNqQyxTQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLG1CQUFLQyxPQUFMLENBQWE7QUFDWEMsV0FBSyw0QkFETTtBQUVYTixZQUFNTyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQiwyQkFBbEIsRUFBa0M7QUFDdENDLGtCQUFVVCxLQUFLUyxRQUR1QjtBQUV0Q0MsY0FBTVYsS0FBS1U7QUFGMkIsT0FBbEMsQ0FGSztB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RUFLR0csSUFMSCxDQUtRLGVBQU87QUFDYlYsY0FBUVcsR0FBUjtBQUNELEtBUEQ7QUFRRCxHQVRNLENBQVA7QUFVRDs7QUFFTSxTQUFTZCxTQUFULENBQW1CQyxJQUFuQixFQUF5QjtBQUM5QixTQUFPLElBQUlDLE9BQUosQ0FBWSxtQkFBVztBQUM1QkcsbUJBQUtDLE9BQUwsQ0FBYTtBQUNYQyxXQUFLLGFBRE07QUFFWE4sWUFBTU8sT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsMkJBQWxCLEVBQWtDO0FBQ3RDYyxxQkFBYXRCLEtBQUtzQixXQURvQjtBQUV0Q0MsaUJBQVN2QixLQUFLd0I7QUFGd0IsT0FBbEMsQ0FGSztBQU1YYixjQUFRO0FBTkcsS0FBYixFQU9HQyxJQVBILENBT1EsZUFBTztBQUNiVixjQUFRVyxHQUFSO0FBQ0QsS0FURDtBQVVELEdBWE0sQ0FBUDtBQVlEIiwiZmlsZSI6InVzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IGNvbW1vblBhcmFtcyBmcm9tICcuL2NvbW1vbkRhdGEnXG5cbi8vIOe7keWumui6q+S7vVxuZXhwb3J0IGZ1bmN0aW9uIGJpbmRJZGVudGl0eShkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9tZW1iZXIvY2xhc3MvYmluZElkZW50aXR5JyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxuICAgICAgICBpdGVtOiBkYXRhLml0ZW1cbiAgICAgIH0pLFxuICAgICAgbWV0aG9kOiAncG9zdCdcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDnu5HlrprogIHluIhcbmV4cG9ydCBmdW5jdGlvbiBiaW5kVGVhY2hlcihkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvbWVtYmVyL2NsYXNzL2JpbmRUZWFjaGVyJyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxuICAgICAgICBuYW1lOiBkYXRhLm5hbWVcbiAgICAgIH0pLFxuICAgICAgbWV0aG9kOiAncG9zdCdcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDnu5HlrprmiYvmnLpcbmV4cG9ydCBmdW5jdGlvbiBiaW5kTW9iaWxlKGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL21lbWJlci9iaW5kTW9iaWxlJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgbWVtYmVyX2lkOiBkYXRhLmlkLFxuICAgICAgICBtb2JpbGU6IGRhdGEubW9iaWxlXG4gICAgICB9LFxuICAgICAgbWV0aG9kOiAncG9zdCdcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDojrflj5bmiYvmnLrpqozor4HnoIFcbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUNvZGUoZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvYXV0aC92YWxpZGF0ZUNvZGUnLFxuICAgICAgZGF0YToge1xuICAgICAgICBtb2JpbGU6IGRhdGEubW9iaWxlLFxuICAgICAgICBhY3Rpb246ICdiaW5kX21vYmlsZSdcbiAgICAgIH0sXG4gICAgICBtZXRob2Q6ICdwb3N0J1xuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOabtOaNouaJi+aculxuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VNb2JpbGUoZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvY2xhc3MvbWVtYmVyL3JlcGxhY2VNb2JpbGUnLFxuICAgICAgZGF0YToge1xuICAgICAgICBtb2JpbGU6IGRhdGEubW9iaWxlLFxuICAgICAgICBtZW1iZXJfaWQ6IGRhdGEuaWQsXG4gICAgICAgIGNvZGU6IGRhdGEuY29kZVxuICAgICAgfSxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLy8g6I635Y+W6Lqr5Lu95YiX6KGoXG5leHBvcnQgZnVuY3Rpb24gZ2V0SWRlbnRpdHlMaXN0KGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2NsYXNzL2dldElkZW50aXR5TGlzdCcsXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSlcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDmo4Dmn6XnlKjmiLfmmK/lkKbmnInlpJrkuKrlrabnlJ9cbmV4cG9ydCBmdW5jdGlvbiBjaGVja1N0dWRlbnQoZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvbWVtYmVyL2NsYXNzL2JpbmRTdHVkZW50JyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxuICAgICAgICBtb21lbnRfaWQ6IGRhdGEubW9tZW50X2lkLFxuICAgICAgICBpc19wYXk6IGRhdGEuaXNfcGF5XG4gICAgICB9KVxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOiOt+WPluePree6p+e7keWumuW+l+i6q+S7veWIl+ihqFxuZXhwb3J0IGZ1bmN0aW9uIGlkZW50aXR5TGlzdChkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL21lbWJlci9jbGFzcy9pZGVudGl0eUxpc3QnLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWRcbiAgICAgIH0pXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLy8g6I635Y+W54+t57qn5Lq65ZGY5YiX6KGoXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWVtYmVyTGlzdChkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2NsYXNzL2dldE1lbWJlckxpc3QnLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWRcbiAgICAgIH0pXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLy8g6I635Y+W5Lya5ZGY5L+h5oGvXG5leHBvcnQgZnVuY3Rpb24gbWVtYmVySW5mbyhkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL21lbWJlci9pbmZvJyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkXG4gICAgICB9KVxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRBZHZpY2UoZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9wb3N0QWR2aWNlJyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBkYXRhLmRlc2NyaXB0aW9uLFxuICAgICAgICBpbWdfdXJsOiBkYXRhLmltZ0xpc3RcbiAgICAgIH0pLFxuICAgICAgbWV0aG9kOiAncG9zdCdcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuIl19