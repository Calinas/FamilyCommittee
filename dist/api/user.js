'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bindIdentity = bindIdentity;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsiYmluZElkZW50aXR5IiwiYmluZE1vYmlsZSIsInZhbGlkYXRlQ29kZSIsInJlcGxhY2VNb2JpbGUiLCJnZXRJZGVudGl0eUxpc3QiLCJjaGVja1N0dWRlbnQiLCJpZGVudGl0eUxpc3QiLCJkYXRhIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ3ZXB5IiwicmVxdWVzdCIsInVybCIsIk9iamVjdCIsImFzc2lnbiIsImNsYXNzX2lkIiwiaXRlbSIsIm1ldGhvZCIsInRoZW4iLCJyZXMiLCJtZW1iZXJfaWQiLCJpZCIsIm1vYmlsZSIsImFjdGlvbiIsImNvZGUiLCJtb21lbnRfaWQiLCJpc19wYXkiXSwibWFwcGluZ3MiOiI7Ozs7O1FBSWdCQSxZLEdBQUFBLFk7UUFnQkFDLFUsR0FBQUEsVTtRQWdCQUMsWSxHQUFBQSxZO1FBZ0JBQyxhLEdBQUFBLGE7UUFpQkFDLGUsR0FBQUEsZTtRQVlBQyxZLEdBQUFBLFk7UUFnQkFDLFksR0FBQUEsWTs7QUFqR2hCOzs7O0FBQ0E7Ozs7OztBQUVBO0FBQ08sU0FBU04sWUFBVCxDQUFzQk8sSUFBdEIsRUFBNEI7QUFDakMsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLFdBQUssNEJBRE07QUFFWE4sWUFBTU8sT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsMkJBQWxCLEVBQWtDO0FBQ3RDQyxrQkFBVVQsS0FBS1MsUUFEdUI7QUFFdENDLGNBQU1WLEtBQUtVO0FBRjJCLE9BQWxDLENBRks7QUFNWEMsY0FBUTtBQU5HLEtBQWIsRUFPR0MsSUFQSCxDQU9RLGVBQU87QUFDYlYsY0FBUVcsR0FBUjtBQUNELEtBVEQ7QUFVRCxHQVhNLENBQVA7QUFZRDs7QUFFRDtBQUNPLFNBQVNuQixVQUFULENBQW9CTSxJQUFwQixFQUEwQjtBQUMvQixTQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLG1CQUFLQyxPQUFMLENBQWE7QUFDWEMsV0FBSyxvQkFETTtBQUVYTixZQUFNO0FBQ0pjLG1CQUFXZCxLQUFLZSxFQURaO0FBRUpDLGdCQUFRaEIsS0FBS2dCO0FBRlQsT0FGSztBQU1YTCxjQUFRO0FBTkcsS0FBYixFQU9HQyxJQVBILENBT1EsZUFBTztBQUNiVixjQUFRVyxHQUFSO0FBQ0QsS0FURDtBQVVELEdBWE0sQ0FBUDtBQVlEOztBQUVEO0FBQ08sU0FBU2xCLFlBQVQsQ0FBc0JLLElBQXRCLEVBQTRCO0FBQ2pDLFNBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q0MsbUJBQUtDLE9BQUwsQ0FBYTtBQUNYQyxXQUFLLG9CQURNO0FBRVhOLFlBQU07QUFDSmdCLGdCQUFRaEIsS0FBS2dCLE1BRFQ7QUFFSkMsZ0JBQVE7QUFGSixPQUZLO0FBTVhOLGNBQVE7QUFORyxLQUFiLEVBT0dDLElBUEgsQ0FPUSxlQUFPO0FBQ2JWLGNBQVFXLEdBQVI7QUFDRCxLQVREO0FBVUQsR0FYTSxDQUFQO0FBWUQ7O0FBRUQ7QUFDTyxTQUFTakIsYUFBVCxDQUF1QkksSUFBdkIsRUFBNkI7QUFDbEMsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLFdBQUssNkJBRE07QUFFWE4sWUFBTTtBQUNKZ0IsZ0JBQVFoQixLQUFLZ0IsTUFEVDtBQUVKRixtQkFBV2QsS0FBS2UsRUFGWjtBQUdKRyxjQUFNbEIsS0FBS2tCO0FBSFAsT0FGSztBQU9YUCxjQUFRO0FBUEcsS0FBYixFQVFHQyxJQVJILENBUVEsZUFBTztBQUNiVixjQUFRVyxHQUFSO0FBQ0QsS0FWRDtBQVdELEdBWk0sQ0FBUDtBQWFEOztBQUVEO0FBQ08sU0FBU2hCLGVBQVQsQ0FBeUJHLElBQXpCLEVBQStCO0FBQ3BDLFNBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q0MsbUJBQUtDLE9BQUwsQ0FBYTtBQUNYQyxXQUFLLHdCQURNO0FBRVhOLFlBQU1PLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLDJCQUFsQjtBQUZLLEtBQWIsRUFHR0ksSUFISCxDQUdRLGVBQU87QUFDYlYsY0FBUVcsR0FBUjtBQUNELEtBTEQ7QUFNRCxHQVBNLENBQVA7QUFRRDs7QUFFRDtBQUNPLFNBQVNmLFlBQVQsQ0FBc0JFLElBQXRCLEVBQTRCO0FBQ2pDLFNBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q0MsbUJBQUtDLE9BQUwsQ0FBYTtBQUNYQyxXQUFLLDJCQURNO0FBRVhOLFlBQU1PLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLDJCQUFsQixFQUFrQztBQUN0Q0Msa0JBQVVULEtBQUtTLFFBRHVCO0FBRXRDVSxtQkFBV25CLEtBQUttQixTQUZzQjtBQUd0Q0MsZ0JBQVFwQixLQUFLb0I7QUFIeUIsT0FBbEM7QUFGSyxLQUFiLEVBT0dSLElBUEgsQ0FPUSxlQUFPO0FBQ2JWLGNBQVFXLEdBQVI7QUFDRCxLQVREO0FBVUQsR0FYTSxDQUFQO0FBWUQ7O0FBRUQ7QUFDTyxTQUFTZCxZQUFULENBQXNCQyxJQUF0QixFQUE0QjtBQUNqQyxTQUFPLElBQUlDLE9BQUosQ0FBWSxtQkFBVztBQUM1QkcsbUJBQUtDLE9BQUwsQ0FBYTtBQUNYQyxXQUFLLDRCQURNO0FBRVhOLFlBQU1PLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLDJCQUFsQixFQUFrQztBQUN0Q0Msa0JBQVVULEtBQUtTO0FBRHVCLE9BQWxDO0FBRkssS0FBYixFQUtHRyxJQUxILENBS1EsZUFBTztBQUNiVixjQUFRVyxHQUFSO0FBQ0QsS0FQRDtBQVFELEdBVE0sQ0FBUDtBQVVEIiwiZmlsZSI6InVzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IGNvbW1vblBhcmFtcyBmcm9tICcuL2NvbW1vbkRhdGEnXG5cbi8vIOe7keWumui6q+S7vVxuZXhwb3J0IGZ1bmN0aW9uIGJpbmRJZGVudGl0eShkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9tZW1iZXIvY2xhc3MvYmluZElkZW50aXR5JyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxuICAgICAgICBpdGVtOiBkYXRhLml0ZW1cbiAgICAgIH0pLFxuICAgICAgbWV0aG9kOiAncG9zdCdcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDnu5HlrprmiYvmnLpcbmV4cG9ydCBmdW5jdGlvbiBiaW5kTW9iaWxlKGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL21lbWJlci9iaW5kTW9iaWxlJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgbWVtYmVyX2lkOiBkYXRhLmlkLFxuICAgICAgICBtb2JpbGU6IGRhdGEubW9iaWxlXG4gICAgICB9LFxuICAgICAgbWV0aG9kOiAncG9zdCdcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDojrflj5bmiYvmnLrpqozor4HnoIFcbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUNvZGUoZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvYXV0aC92YWxpZGF0ZUNvZGUnLFxuICAgICAgZGF0YToge1xuICAgICAgICBtb2JpbGU6IGRhdGEubW9iaWxlLFxuICAgICAgICBhY3Rpb246ICdiaW5kX21vYmlsZSdcbiAgICAgIH0sXG4gICAgICBtZXRob2Q6ICdwb3N0J1xuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOabtOaNouaJi+aculxuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VNb2JpbGUoZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvY2xhc3MvbWVtYmVyL3JlcGxhY2VNb2JpbGUnLFxuICAgICAgZGF0YToge1xuICAgICAgICBtb2JpbGU6IGRhdGEubW9iaWxlLFxuICAgICAgICBtZW1iZXJfaWQ6IGRhdGEuaWQsXG4gICAgICAgIGNvZGU6IGRhdGEuY29kZVxuICAgICAgfSxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLy8g6I635Y+W6Lqr5Lu95YiX6KGoXG5leHBvcnQgZnVuY3Rpb24gZ2V0SWRlbnRpdHlMaXN0KGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2NsYXNzL2dldElkZW50aXR5TGlzdCcsXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSlcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDmo4Dmn6XnlKjmiLfmmK/lkKbmnInlpJrkuKrlrabnlJ9cbmV4cG9ydCBmdW5jdGlvbiBjaGVja1N0dWRlbnQoZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvbWVtYmVyL2NsYXNzL2JpbmRTdHVkZW50JyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxuICAgICAgICBtb21lbnRfaWQ6IGRhdGEubW9tZW50X2lkLFxuICAgICAgICBpc19wYXk6IGRhdGEuaXNfcGF5XG4gICAgICB9KVxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOiOt+WPluePree6p+e7keWumuW+l+i6q+S7veWIl+ihqFxuZXhwb3J0IGZ1bmN0aW9uIGlkZW50aXR5TGlzdChkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL21lbWJlci9jbGFzcy9pZGVudGl0eUxpc3QnLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWRcbiAgICAgIH0pXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cbiJdfQ==