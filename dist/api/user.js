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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsiYmluZElkZW50aXR5IiwiYmluZFRlYWNoZXIiLCJiaW5kTW9iaWxlIiwidmFsaWRhdGVDb2RlIiwicmVwbGFjZU1vYmlsZSIsImdldElkZW50aXR5TGlzdCIsImNoZWNrU3R1ZGVudCIsImlkZW50aXR5TGlzdCIsImdldE1lbWJlckxpc3QiLCJkYXRhIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ3ZXB5IiwicmVxdWVzdCIsInVybCIsIk9iamVjdCIsImFzc2lnbiIsImNsYXNzX2lkIiwiaXRlbSIsIm1ldGhvZCIsInRoZW4iLCJyZXMiLCJuYW1lIiwibWVtYmVyX2lkIiwiaWQiLCJtb2JpbGUiLCJhY3Rpb24iLCJjb2RlIiwibW9tZW50X2lkIiwiaXNfcGF5Il0sIm1hcHBpbmdzIjoiOzs7OztRQUlnQkEsWSxHQUFBQSxZO1FBZ0JBQyxXLEdBQUFBLFc7UUFnQkFDLFUsR0FBQUEsVTtRQWdCQUMsWSxHQUFBQSxZO1FBZ0JBQyxhLEdBQUFBLGE7UUFpQkFDLGUsR0FBQUEsZTtRQVlBQyxZLEdBQUFBLFk7UUFnQkFDLFksR0FBQUEsWTtRQWNBQyxhLEdBQUFBLGE7O0FBL0hoQjs7OztBQUNBOzs7Ozs7QUFFQTtBQUNPLFNBQVNSLFlBQVQsQ0FBc0JTLElBQXRCLEVBQTRCO0FBQ2pDLFNBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q0MsbUJBQUtDLE9BQUwsQ0FBYTtBQUNYQyxXQUFLLDRCQURNO0FBRVhOLFlBQU1PLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLDJCQUFsQixFQUFrQztBQUN0Q0Msa0JBQVVULEtBQUtTLFFBRHVCO0FBRXRDQyxjQUFNVixLQUFLVTtBQUYyQixPQUFsQyxDQUZLO0FBTVhDLGNBQVE7QUFORyxLQUFiLEVBT0dDLElBUEgsQ0FPUSxlQUFPO0FBQ2JWLGNBQVFXLEdBQVI7QUFDRCxLQVREO0FBVUQsR0FYTSxDQUFQO0FBWUQ7O0FB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Q2JWLGNBQVFXLEdBQVI7QUFDRCxLQVREO0FBVUQsR0FYTSxDQUFQO0FBWUQ7O0FBRUQ7QUFDTyxTQUFTZixZQUFULENBQXNCRSxJQUF0QixFQUE0QjtBQUNqQyxTQUFPLElBQUlDLE9BQUosQ0FBWSxtQkFBVztBQUM1QkcsbUJBQUtDLE9BQUwsQ0FBYTtBQUNYQyxXQUFLLDRCQURNO0FBRVhOLFlBQU1PLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLDJCQUFsQixFQUFrQztBQUN0Q0Msa0JBQVVULEtBQUtTO0FBRHVCLE9BQWxDO0FBRkssS0FBYixFQUtHRyxJQUxILENBS1EsZUFBTztBQUNiVixjQUFRVyxHQUFSO0FBQ0QsS0FQRDtBQVFELEdBVE0sQ0FBUDtBQVVEOztBQUVEO0FBQ08sU0FBU2QsYUFBVCxDQUF1QkMsSUFBdkIsRUFBNkI7QUFDbEMsU0FBTyxJQUFJQyxPQUFKLENBQVksbUJBQVc7QUFDNUJHLG1CQUFLQyxPQUFMLENBQWE7QUFDWEMsV0FBSyxzQkFETTtBQUVYTixZQUFNTyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQiwyQkFBbEIsRUFBa0M7QUFDdENDLGtCQUFVVCxLQUFLUztBQUR1QixPQUFsQztBQUZLLEtBQWIsRUFLR0csSUFMSCxDQUtRLGVBQU87QUFDYlYsY0FBUVcsR0FBUjtBQUNELEtBUEQ7QUFRRCxHQVRNLENBQVA7QUFVRCIsImZpbGUiOiJ1c2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCBjb21tb25QYXJhbXMgZnJvbSAnLi9jb21tb25EYXRhJ1xuXG4vLyDnu5Hlrprouqvku71cbmV4cG9ydCBmdW5jdGlvbiBiaW5kSWRlbnRpdHkoZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvbWVtYmVyL2NsYXNzL2JpbmRJZGVudGl0eScsXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xuICAgICAgICBjbGFzc19pZDogZGF0YS5jbGFzc19pZCxcbiAgICAgICAgaXRlbTogZGF0YS5pdGVtXG4gICAgICB9KSxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLy8g57uR5a6a6ICB5biIXG5leHBvcnQgZnVuY3Rpb24gYmluZFRlYWNoZXIoZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL21lbWJlci9jbGFzcy9iaW5kVGVhY2hlcicsXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xuICAgICAgICBjbGFzc19pZDogZGF0YS5jbGFzc19pZCxcbiAgICAgICAgbmFtZTogZGF0YS5uYW1lXG4gICAgICB9KSxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLy8g57uR5a6a5omL5py6XG5leHBvcnQgZnVuY3Rpb24gYmluZE1vYmlsZShkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9tZW1iZXIvYmluZE1vYmlsZScsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIG1lbWJlcl9pZDogZGF0YS5pZCxcbiAgICAgICAgbW9iaWxlOiBkYXRhLm1vYmlsZVxuICAgICAgfSxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLy8g6I635Y+W5omL5py66aqM6K+B56CBXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVDb2RlKGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2F1dGgvdmFsaWRhdGVDb2RlJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgbW9iaWxlOiBkYXRhLm1vYmlsZSxcbiAgICAgICAgYWN0aW9uOiAnYmluZF9tb2JpbGUnXG4gICAgICB9LFxuICAgICAgbWV0aG9kOiAncG9zdCdcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDmm7TmjaLmiYvmnLpcbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlTW9iaWxlKGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2NsYXNzL21lbWJlci9yZXBsYWNlTW9iaWxlJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgbW9iaWxlOiBkYXRhLm1vYmlsZSxcbiAgICAgICAgbWVtYmVyX2lkOiBkYXRhLmlkLFxuICAgICAgICBjb2RlOiBkYXRhLmNvZGVcbiAgICAgIH0sXG4gICAgICBtZXRob2Q6ICdwb3N0J1xuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOiOt+WPlui6q+S7veWIl+ihqFxuZXhwb3J0IGZ1bmN0aW9uIGdldElkZW50aXR5TGlzdChkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9jbGFzcy9nZXRJZGVudGl0eUxpc3QnLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCkpXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLy8g5qOA5p+l55So5oi35piv5ZCm5pyJ5aSa5Liq5a2m55SfXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tTdHVkZW50KGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL21lbWJlci9jbGFzcy9iaW5kU3R1ZGVudCcsXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xuICAgICAgICBjbGFzc19pZDogZGF0YS5jbGFzc19pZCxcbiAgICAgICAgbW9tZW50X2lkOiBkYXRhLm1vbWVudF9pZCxcbiAgICAgICAgaXNfcGF5OiBkYXRhLmlzX3BheVxuICAgICAgfSlcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDojrflj5bnj63nuqfnu5Hlrprlvpfouqvku73liJfooahcbmV4cG9ydCBmdW5jdGlvbiBpZGVudGl0eUxpc3QoZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9tZW1iZXIvY2xhc3MvaWRlbnRpdHlMaXN0JyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkXG4gICAgICB9KVxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOiOt+WPluePree6p+S6uuWRmOWIl+ihqFxuZXhwb3J0IGZ1bmN0aW9uIGdldE1lbWJlckxpc3QoZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9jbGFzcy9nZXRNZW1iZXJMaXN0JyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkXG4gICAgICB9KVxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG4iXX0=