'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSessionKey = getSessionKey;
exports.decryptData = decryptData;
exports.wxLogin = wxLogin;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 获取sessionKey
function getSessionKey(data) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/wxapp/onLogin',
      method: 'post',
      data: {
        code: data.code,
        old_wxapp_token: data.old_wxapp_token
      }
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 解密敏感数据
function decryptData(data) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/wxapp/decryptData',
      method: 'post',
      data: {
        encryptedData: data.encryptedData,
        iv: data.iv,
        wxapp_token: data.wxapp_token
      }
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 微信登录
function wxLogin(data) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/auth/wxLogin',
      method: 'post',
      data: {
        open_id: data.open_id,
        nickname: data.nickname,
        head_img: data.head_img,
        sex: data.sex,
        auth_id: data.auth_id,
        wxapp_token: data.wxapp_token,
        mobile: data.mobile
      }
    }).then(function (res) {
      resolve(res);
    });
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbImdldFNlc3Npb25LZXkiLCJkZWNyeXB0RGF0YSIsInd4TG9naW4iLCJkYXRhIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ3ZXB5IiwicmVxdWVzdCIsInVybCIsIm1ldGhvZCIsImNvZGUiLCJvbGRfd3hhcHBfdG9rZW4iLCJ0aGVuIiwicmVzIiwiZW5jcnlwdGVkRGF0YSIsIml2Iiwid3hhcHBfdG9rZW4iLCJvcGVuX2lkIiwibmlja25hbWUiLCJoZWFkX2ltZyIsInNleCIsImF1dGhfaWQiLCJtb2JpbGUiXSwibWFwcGluZ3MiOiI7Ozs7O1FBR2dCQSxhLEdBQUFBLGE7UUFnQkFDLFcsR0FBQUEsVztRQWlCQUMsTyxHQUFBQSxPOztBQXBDaEI7Ozs7OztBQUVBO0FBQ08sU0FBU0YsYUFBVCxDQUF1QkcsSUFBdkIsRUFBNkI7QUFDbEMsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLFdBQUssZ0JBRE07QUFFWEMsY0FBUSxNQUZHO0FBR1hQLFlBQU07QUFDSlEsY0FBTVIsS0FBS1EsSUFEUDtBQUVKQyx5QkFBaUJULEtBQUtTO0FBRmxCO0FBSEssS0FBYixFQU9HQyxJQVBILENBT1EsZUFBTztBQUNiUixjQUFRUyxHQUFSO0FBQ0QsS0FURDtBQVVELEdBWE0sQ0FBUDtBQVlEOztBQUVEO0FBQ08sU0FBU2IsV0FBVCxDQUFxQkUsSUFBckIsRUFBMkI7QUFDaEMsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLFdBQUssb0JBRE07QUFFWEMsY0FBUSxNQUZHO0FBR1hQLFlBQU07QUFDSlksdUJBQWVaLEtBQUtZLGFBRGhCO0FBRUpDLFlBQUliLEtBQUthLEVBRkw7QUFHSkMscUJBQWFkLEtBQUtjO0FBSGQ7QUFISyxLQUFiLEVBUUdKLElBUkgsQ0FRUSxlQUFPO0FBQ2JSLGNBQVFTLEdBQVI7QUFDRCxLQVZEO0FBV0QsR0FaTSxDQUFQO0FBYUQ7O0FBRUQ7QUFDTyxTQUFTWixPQUFULENBQWlCQyxJQUFqQixFQUF1QjtBQUM1QixTQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLG1CQUFLQyxPQUFMLENBQWE7QUFDWEMsV0FBSyxlQURNO0FBRVhDLGNBQVEsTUFGRztBQUdYUCxZQUFNO0FBQ0plLGlCQUFTZixLQUFLZSxPQURWO0FBRUpDLGtCQUFVaEIsS0FBS2dCLFFBRlg7QUFHSkMsa0JBQVVqQixLQUFLaUIsUUFIWDtBQUlKQyxhQUFLbEIsS0FBS2tCLEdBSk47QUFLSkMsaUJBQVNuQixLQUFLbUIsT0FMVjtBQU1KTCxxQkFBYWQsS0FBS2MsV0FOZDtBQU9KTSxnQkFBUXBCLEtBQUtvQjtBQVBUO0FBSEssS0FBYixFQVlHVixJQVpILENBWVEsZUFBTztBQUNiUixjQUFRUyxHQUFSO0FBQ0QsS0FkRDtBQWVELEdBaEJNLENBQVA7QUFpQkQiLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5cclxuLy8g6I635Y+Wc2Vzc2lvbktleVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2Vzc2lvbktleShkYXRhKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgIHVybDogJy93eGFwcC9vbkxvZ2luJyxcclxuICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBjb2RlOiBkYXRhLmNvZGUsXHJcbiAgICAgICAgb2xkX3d4YXBwX3Rva2VuOiBkYXRhLm9sZF93eGFwcF90b2tlblxyXG4gICAgICB9XHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHJlc29sdmUocmVzKVxyXG4gICAgfSlcclxuICB9KVxyXG59XHJcblxyXG4vLyDop6Plr4bmlY/mhJ/mlbDmja5cclxuZXhwb3J0IGZ1bmN0aW9uIGRlY3J5cHREYXRhKGRhdGEpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiAnL3d4YXBwL2RlY3J5cHREYXRhJyxcclxuICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBlbmNyeXB0ZWREYXRhOiBkYXRhLmVuY3J5cHRlZERhdGEsXHJcbiAgICAgICAgaXY6IGRhdGEuaXYsXHJcbiAgICAgICAgd3hhcHBfdG9rZW46IGRhdGEud3hhcHBfdG9rZW5cclxuICAgICAgfVxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICByZXNvbHZlKHJlcylcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG5cclxuLy8g5b6u5L+h55m75b2VXHJcbmV4cG9ydCBmdW5jdGlvbiB3eExvZ2luKGRhdGEpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiAnL2F1dGgvd3hMb2dpbicsXHJcbiAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgb3Blbl9pZDogZGF0YS5vcGVuX2lkLFxyXG4gICAgICAgIG5pY2tuYW1lOiBkYXRhLm5pY2tuYW1lLFxyXG4gICAgICAgIGhlYWRfaW1nOiBkYXRhLmhlYWRfaW1nLFxyXG4gICAgICAgIHNleDogZGF0YS5zZXgsXHJcbiAgICAgICAgYXV0aF9pZDogZGF0YS5hdXRoX2lkLFxyXG4gICAgICAgIHd4YXBwX3Rva2VuOiBkYXRhLnd4YXBwX3Rva2VuLFxyXG4gICAgICAgIG1vYmlsZTogZGF0YS5tb2JpbGVcclxuICAgICAgfVxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICByZXNvbHZlKHJlcylcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG4iXX0=