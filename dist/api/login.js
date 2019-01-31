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
        wxapp_token: data.wxapp_token
      }
    }).then(function (res) {
      resolve(res);
    });
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbImdldFNlc3Npb25LZXkiLCJkZWNyeXB0RGF0YSIsInd4TG9naW4iLCJkYXRhIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ3ZXB5IiwicmVxdWVzdCIsInVybCIsIm1ldGhvZCIsImNvZGUiLCJvbGRfd3hhcHBfdG9rZW4iLCJ0aGVuIiwicmVzIiwiZW5jcnlwdGVkRGF0YSIsIml2Iiwid3hhcHBfdG9rZW4iLCJvcGVuX2lkIiwibmlja25hbWUiLCJoZWFkX2ltZyIsInNleCIsImF1dGhfaWQiXSwibWFwcGluZ3MiOiI7Ozs7O1FBR2dCQSxhLEdBQUFBLGE7UUFnQkFDLFcsR0FBQUEsVztRQWlCQUMsTyxHQUFBQSxPOztBQXBDaEI7Ozs7OztBQUVBO0FBQ08sU0FBU0YsYUFBVCxDQUF1QkcsSUFBdkIsRUFBNkI7QUFDbEMsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLFdBQUssZ0JBRE07QUFFWEMsY0FBUSxNQUZHO0FBR1hQLFlBQU07QUFDSlEsY0FBTVIsS0FBS1EsSUFEUDtBQUVKQyx5QkFBaUJULEtBQUtTO0FBRmxCO0FBSEssS0FBYixFQU9HQyxJQVBILENBT1EsZUFBTztBQUNiUixjQUFRUyxHQUFSO0FBQ0QsS0FURDtBQVVELEdBWE0sQ0FBUDtBQVlEOztBQUVEO0FBQ08sU0FBU2IsV0FBVCxDQUFxQkUsSUFBckIsRUFBMkI7QUFDaEMsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLFdBQUssb0JBRE07QUFFWEMsY0FBUSxNQUZHO0FBR1hQLFlBQU07QUFDSlksdUJBQWVaLEtBQUtZLGFBRGhCO0FBRUpDLFlBQUliLEtBQUthLEVBRkw7QUFHSkMscUJBQWFkLEtBQUtjO0FBSGQ7QUFISyxLQUFiLEVBUUdKLElBUkgsQ0FRUSxlQUFPO0FBQ2JSLGNBQVFTLEdBQVI7QUFDRCxLQVZEO0FBV0QsR0FaTSxDQUFQO0FBYUQ7O0FBRUQ7QUFDTyxTQUFTWixPQUFULENBQWlCQyxJQUFqQixFQUF1QjtBQUM1QixTQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLG1CQUFLQyxPQUFMLENBQWE7QUFDWEMsV0FBSyxlQURNO0FBRVhDLGNBQVEsTUFGRztBQUdYUCxZQUFNO0FBQ0plLGlCQUFTZixLQUFLZSxPQURWO0FBRUpDLGtCQUFVaEIsS0FBS2dCLFFBRlg7QUFHSkMsa0JBQVVqQixLQUFLaUIsUUFIWDtBQUlKQyxhQUFLbEIsS0FBS2tCLEdBSk47QUFLSkMsaUJBQVNuQixLQUFLbUIsT0FMVjtBQU1KTCxxQkFBYWQsS0FBS2M7QUFOZDtBQUhLLEtBQWIsRUFXR0osSUFYSCxDQVdRLGVBQU87QUFDYlIsY0FBUVMsR0FBUjtBQUNELEtBYkQ7QUFjRCxHQWZNLENBQVA7QUFnQkQiLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4vLyDojrflj5ZzZXNzaW9uS2V5XG5leHBvcnQgZnVuY3Rpb24gZ2V0U2Vzc2lvbktleShkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy93eGFwcC9vbkxvZ2luJyxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgZGF0YToge1xuICAgICAgICBjb2RlOiBkYXRhLmNvZGUsXG4gICAgICAgIG9sZF93eGFwcF90b2tlbjogZGF0YS5vbGRfd3hhcHBfdG9rZW5cbiAgICAgIH1cbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDop6Plr4bmlY/mhJ/mlbDmja5cbmV4cG9ydCBmdW5jdGlvbiBkZWNyeXB0RGF0YShkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy93eGFwcC9kZWNyeXB0RGF0YScsXG4gICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZW5jcnlwdGVkRGF0YTogZGF0YS5lbmNyeXB0ZWREYXRhLFxuICAgICAgICBpdjogZGF0YS5pdixcbiAgICAgICAgd3hhcHBfdG9rZW46IGRhdGEud3hhcHBfdG9rZW5cbiAgICAgIH1cbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDlvq7kv6HnmbvlvZVcbmV4cG9ydCBmdW5jdGlvbiB3eExvZ2luKGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2F1dGgvd3hMb2dpbicsXG4gICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgb3Blbl9pZDogZGF0YS5vcGVuX2lkLFxuICAgICAgICBuaWNrbmFtZTogZGF0YS5uaWNrbmFtZSxcbiAgICAgICAgaGVhZF9pbWc6IGRhdGEuaGVhZF9pbWcsXG4gICAgICAgIHNleDogZGF0YS5zZXgsXG4gICAgICAgIGF1dGhfaWQ6IGRhdGEuYXV0aF9pZCxcbiAgICAgICAgd3hhcHBfdG9rZW46IGRhdGEud3hhcHBfdG9rZW5cbiAgICAgIH1cbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuIl19