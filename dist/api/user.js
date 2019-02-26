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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsiYmluZElkZW50aXR5IiwiYmluZFRlYWNoZXIiLCJiaW5kTW9iaWxlIiwidmFsaWRhdGVDb2RlIiwicmVwbGFjZU1vYmlsZSIsImdldElkZW50aXR5TGlzdCIsImNoZWNrU3R1ZGVudCIsImlkZW50aXR5TGlzdCIsImRhdGEiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIndlcHkiLCJyZXF1ZXN0IiwidXJsIiwiT2JqZWN0IiwiYXNzaWduIiwiY2xhc3NfaWQiLCJpdGVtIiwibWV0aG9kIiwidGhlbiIsInJlcyIsIm5hbWUiLCJtZW1iZXJfaWQiLCJpZCIsIm1vYmlsZSIsImFjdGlvbiIsImNvZGUiLCJtb21lbnRfaWQiLCJpc19wYXkiXSwibWFwcGluZ3MiOiI7Ozs7O1FBSWdCQSxZLEdBQUFBLFk7UUFnQkFDLFcsR0FBQUEsVztRQWdCQUMsVSxHQUFBQSxVO1FBZ0JBQyxZLEdBQUFBLFk7UUFnQkFDLGEsR0FBQUEsYTtRQWlCQUMsZSxHQUFBQSxlO1FBWUFDLFksR0FBQUEsWTtRQWdCQUMsWSxHQUFBQSxZOztBQWpIaEI7Ozs7QUFDQTs7Ozs7O0FBRUE7QUFDTyxTQUFTUCxZQUFULENBQXNCUSxJQUF0QixFQUE0QjtBQUNqQyxTQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLG1CQUFLQyxPQUFMLENBQWE7QUFDWEMsV0FBSyw0QkFETTtBQUVYTixZQUFNTyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQiwyQkFBbEIsRUFBa0M7QUFDdENDLGtCQUFVVCxLQUFLUyxRQUR1QjtBQUV0Q0MsY0FBTVYsS0FBS1U7QUFGMkIsT0FBbEMsQ0FGSztBQU1YQyxjQUFRO0FBTkcsS0FBYixFQU9HQyxJQVBILENBT1EsZUFBTztBQUNiVixjQUFRVyxHQUFSO0FBQ0QsS0FURDtBQVVELEdBWE0sQ0FBUDtBQVlEOztBQUVEO0FBQ08sU0FBU3BCLFdBQVQsQ0FBcUJPLElBQXJC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TSxDQUFQO0FBWUQ7O0FBRUQ7QUFDTyxTQUFTZCxZQUFULENBQXNCQyxJQUF0QixFQUE0QjtBQUNqQyxTQUFPLElBQUlDLE9BQUosQ0FBWSxtQkFBVztBQUM1QkcsbUJBQUtDLE9BQUwsQ0FBYTtBQUNYQyxXQUFLLDRCQURNO0FBRVhOLFlBQU1PLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLDJCQUFsQixFQUFrQztBQUN0Q0Msa0JBQVVULEtBQUtTO0FBRHVCLE9BQWxDO0FBRkssS0FBYixFQUtHRyxJQUxILENBS1EsZUFBTztBQUNiVixjQUFRVyxHQUFSO0FBQ0QsS0FQRDtBQVFELEdBVE0sQ0FBUDtBQVVEIiwiZmlsZSI6InVzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgY29tbW9uUGFyYW1zIGZyb20gJy4vY29tbW9uRGF0YSdcclxuXHJcbi8vIOe7keWumui6q+S7vVxyXG5leHBvcnQgZnVuY3Rpb24gYmluZElkZW50aXR5KGRhdGEpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiAnL21lbWJlci9jbGFzcy9iaW5kSWRlbnRpdHknLFxyXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xyXG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxyXG4gICAgICAgIGl0ZW06IGRhdGEuaXRlbVxyXG4gICAgICB9KSxcclxuICAgICAgbWV0aG9kOiAncG9zdCdcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgcmVzb2x2ZShyZXMpXHJcbiAgICB9KVxyXG4gIH0pXHJcbn1cclxuXHJcbi8vIOe7keWumuiAgeW4iFxyXG5leHBvcnQgZnVuY3Rpb24gYmluZFRlYWNoZXIoZGF0YSkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiAnL21lbWJlci9jbGFzcy9iaW5kVGVhY2hlcicsXHJcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XHJcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXHJcbiAgICAgICAgbmFtZTogZGF0YS5uYW1lXHJcbiAgICAgIH0pLFxyXG4gICAgICBtZXRob2Q6ICdwb3N0J1xyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICByZXNvbHZlKHJlcylcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG5cclxuLy8g57uR5a6a5omL5py6XHJcbmV4cG9ydCBmdW5jdGlvbiBiaW5kTW9iaWxlKGRhdGEpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiAnL21lbWJlci9iaW5kTW9iaWxlJyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIG1lbWJlcl9pZDogZGF0YS5pZCxcclxuICAgICAgICBtb2JpbGU6IGRhdGEubW9iaWxlXHJcbiAgICAgIH0sXHJcbiAgICAgIG1ldGhvZDogJ3Bvc3QnXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHJlc29sdmUocmVzKVxyXG4gICAgfSlcclxuICB9KVxyXG59XHJcblxyXG4vLyDojrflj5bmiYvmnLrpqozor4HnoIFcclxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlQ29kZShkYXRhKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgIHVybDogJy9hdXRoL3ZhbGlkYXRlQ29kZScsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBtb2JpbGU6IGRhdGEubW9iaWxlLFxyXG4gICAgICAgIGFjdGlvbjogJ2JpbmRfbW9iaWxlJ1xyXG4gICAgICB9LFxyXG4gICAgICBtZXRob2Q6ICdwb3N0J1xyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICByZXNvbHZlKHJlcylcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG5cclxuLy8g5pu05o2i5omL5py6XHJcbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlTW9iaWxlKGRhdGEpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiAnL2NsYXNzL21lbWJlci9yZXBsYWNlTW9iaWxlJyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIG1vYmlsZTogZGF0YS5tb2JpbGUsXHJcbiAgICAgICAgbWVtYmVyX2lkOiBkYXRhLmlkLFxyXG4gICAgICAgIGNvZGU6IGRhdGEuY29kZVxyXG4gICAgICB9LFxyXG4gICAgICBtZXRob2Q6ICdwb3N0J1xyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICByZXNvbHZlKHJlcylcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG5cclxuLy8g6I635Y+W6Lqr5Lu95YiX6KGoXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRJZGVudGl0eUxpc3QoZGF0YSkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICB1cmw6ICcvY2xhc3MvZ2V0SWRlbnRpdHlMaXN0JyxcclxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCkpXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHJlc29sdmUocmVzKVxyXG4gICAgfSlcclxuICB9KVxyXG59XHJcblxyXG4vLyDmo4Dmn6XnlKjmiLfmmK/lkKbmnInlpJrkuKrlrabnlJ9cclxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrU3R1ZGVudChkYXRhKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgIHVybDogJy9tZW1iZXIvY2xhc3MvYmluZFN0dWRlbnQnLFxyXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xyXG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxyXG4gICAgICAgIG1vbWVudF9pZDogZGF0YS5tb21lbnRfaWQsXHJcbiAgICAgICAgaXNfcGF5OiBkYXRhLmlzX3BheVxyXG4gICAgICB9KVxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICByZXNvbHZlKHJlcylcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG5cclxuLy8g6I635Y+W54+t57qn57uR5a6a5b6X6Lqr5Lu95YiX6KGoXHJcbmV4cG9ydCBmdW5jdGlvbiBpZGVudGl0eUxpc3QoZGF0YSkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgIHVybDogJy9tZW1iZXIvY2xhc3MvaWRlbnRpdHlMaXN0JyxcclxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcclxuICAgICAgICBjbGFzc19pZDogZGF0YS5jbGFzc19pZFxyXG4gICAgICB9KVxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICByZXNvbHZlKHJlcylcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG4iXX0=