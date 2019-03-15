'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _login = require('./../api/login.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// 如果直接拿到了union_id,那 nickname,这些是什么时候拿到的？
//报错信息好像没处理


var login = function (_wepy$page) {
  _inherits(login, _wepy$page);

  function login() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, login);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = login.__proto__ || Object.getPrototypeOf(login)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '登录'
    }, _this.data = {
      unionid: '',
      wxtoken: '',
      openid: '',
      show_lay: false,
      nickname: '用户',
      sex: '',
      head_img: '',
      phone: '',
      open_id: '',
      joinKey: '',
      classId: -1,
      name: ''
    }, _this.methods = {
      getUserInfo: function getUserInfo(e) {
        var _this2 = this;

        var detail = e.detail;
        (0, _login.decryptData)({
          encryptedData: detail.encryptedData,
          iv: detail.iv,
          wxapp_token: this.wxtoken
        }).then(function (res) {
          var data = res.data.decryptedData;
          _this2.unionid = data.unionId;
          _this2.nickname = data.nickName;
          _this2.sex = data.gender;
          _this2.head_img = data.avatarUrl;
          _this2.show_lay = true;
          _this2.open_id = data.openId;
          _this2.$apply();
        });
      },
      getPhoneNumber: function getPhoneNumber(e) {
        var _this3 = this;

        var detail = e.detail;
        (0, _login.decryptData)({
          encryptedData: detail.encryptedData,
          iv: detail.iv,
          wxapp_token: this.wxtoken
        }).then(function (res) {
          _this3.phone = res.data.decryptedData.phoneNumber;
          _this3.$apply();
          _this3.loginByWeixin();
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(login, [{
    key: 'loginByWeixin',
    value: function loginByWeixin() {
      var _this4 = this;

      (0, _login.wxLogin)({
        open_id: this.open_id,
        nickname: this.nickname,
        head_img: this.head_img,
        sex: this.sex,
        auth_id: this.unionid,
        wxapp_token: this.wxtoken,
        mobile: this.phone
      }).then(function (res) {
        var data = res.data.data;
        var memberInfo = Object.create(null);
        memberInfo = {
          member_id: data.member_id,
          member_token: data.member_token,
          phone: _this4.phone,
          nickname: _this4.nickname,
          avatar: _this4.head_img
        };
        wx.setStorageSync('memberInfo', memberInfo);
        if (_this4.joinKey) {
          wx.reLaunch({
            url: 'joinClass?classId=' + _this4.classId + '&name=' + _this4.name + '&is_share=true'
          });
        } else {
          wx.reLaunch({
            url: 'classList'
          });
        }
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad(e) {
      var _this5 = this;

      this.joinKey = e.key;
      this.classId = e.classId;
      this.name = e.name;
      wx.login({
        success: function success(res) {
          var old_wxapp_token = wx.getStorageSync('wxtoken');
          (0, _login.getSessionKey)({
            code: res.code,
            old_wxapp_token: old_wxapp_token
          }).then(function (res) {
            var data = res.data;
            _this5.unionid = data.unionid ? data.unionid : '';
            _this5.wxtoken = data.wxapp_token;
            _this5.openid = data.openid;
            _this5.$apply();
            wx.setStorageSync('wxtoken', _this5.wxtoken);
          });
        }
      });
    }
  }]);

  return login;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(login , 'pages/login'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbImxvZ2luIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ1bmlvbmlkIiwid3h0b2tlbiIsIm9wZW5pZCIsInNob3dfbGF5Iiwibmlja25hbWUiLCJzZXgiLCJoZWFkX2ltZyIsInBob25lIiwib3Blbl9pZCIsImpvaW5LZXkiLCJjbGFzc0lkIiwibmFtZSIsIm1ldGhvZHMiLCJnZXRVc2VySW5mbyIsImUiLCJkZXRhaWwiLCJlbmNyeXB0ZWREYXRhIiwiaXYiLCJ3eGFwcF90b2tlbiIsInRoZW4iLCJyZXMiLCJkZWNyeXB0ZWREYXRhIiwidW5pb25JZCIsIm5pY2tOYW1lIiwiZ2VuZGVyIiwiYXZhdGFyVXJsIiwib3BlbklkIiwiJGFwcGx5IiwiZ2V0UGhvbmVOdW1iZXIiLCJwaG9uZU51bWJlciIsImxvZ2luQnlXZWl4aW4iLCJhdXRoX2lkIiwibW9iaWxlIiwibWVtYmVySW5mbyIsIk9iamVjdCIsImNyZWF0ZSIsIm1lbWJlcl9pZCIsIm1lbWJlcl90b2tlbiIsImF2YXRhciIsInd4Iiwic2V0U3RvcmFnZVN5bmMiLCJyZUxhdW5jaCIsInVybCIsImtleSIsInN1Y2Nlc3MiLCJvbGRfd3hhcHBfdG9rZW4iLCJnZXRTdG9yYWdlU3luYyIsImNvZGUiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7Ozs7Ozs7O0FBSEE7QUFDQTs7O0lBR3FCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsZUFBUyxFQURKO0FBRUxDLGVBQVMsRUFGSjtBQUdMQyxjQUFRLEVBSEg7QUFJTEMsZ0JBQVUsS0FKTDtBQUtMQyxnQkFBVSxJQUxMO0FBTUxDLFdBQUssRUFOQTtBQU9MQyxnQkFBVSxFQVBMO0FBUUxDLGFBQU8sRUFSRjtBQVNMQyxlQUFTLEVBVEo7QUFVTEMsZUFBUyxFQVZK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O0FBQ2IsZ0JBQUlwQixPQUFPcUIsSUFBSXJCLElBQWY7QUFDQSxtQkFBS0MsT0FBTCxHQUFlRCxLQUFLQyxPQUFMLEdBQWVELEtBQUtDLE9BQXBCLEdBQThCLEVBQTdDO0FBQ0EsbUJBQUtDLE9BQUwsR0FBZUYsS0FBS21CLFdBQXBCO0FBQ0EsbUJBQUtoQixNQUFMLEdBQWNILEtBQUtHLE1BQW5CO0FBQ0EsbUJBQUt5QixNQUFMO0FBQ0FZLGVBQUdDLGNBQUgsQ0FBa0IsU0FBbEIsRUFBNkIsT0FBS3ZDLE9BQWxDO0FBQ0QsV0FWRDtBQVdEO0FBZE0sT0FBVDtBQWdCRDs7OztFQXBHZ0MrQyxlQUFLQyxJOztrQkFBbkJyRCxLIiwiZmlsZSI6ImxvZ2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vLyDlpoLmnpznm7TmjqXmi7/liLDkuoZ1bmlvbl9pZCzpgqMgbmlja25hbWUs6L+Z5Lqb5piv5LuA5LmI5pe25YCZ5ou/5Yiw55qE77yfXG4vL+aKpemUmeS/oeaBr+WlveWDj+ayoeWkhOeQhlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7IGdldFNlc3Npb25LZXksIGRlY3J5cHREYXRhLCB3eExvZ2luIH0gZnJvbSAnLi4vYXBpL2xvZ2luJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgbG9naW4gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+eZu+W9lSdcbiAgfTtcbiAgZGF0YSA9IHtcbiAgICB1bmlvbmlkOiAnJyxcbiAgICB3eHRva2VuOiAnJyxcbiAgICBvcGVuaWQ6ICcnLFxuICAgIHNob3dfbGF5OiBmYWxzZSxcbiAgICBuaWNrbmFtZTogJ+eUqOaItycsXG4gICAgc2V4OiAnJyxcbiAgICBoZWFkX2ltZzogJycsXG4gICAgcGhvbmU6ICcnLFxuICAgIG9wZW5faWQ6ICcnLFxuICAgIGpvaW5LZXk6ICcnLFxuICAgIGNsYXNzSWQ6IC0xLFxuICAgIG5hbWU6ICcnXG4gIH07XG4gIG1ldGhvZHMgPSB7XG4gICAgZ2V0VXNlckluZm8oZSkge1xuICAgICAgY29uc3QgZGV0YWlsID0gZS5kZXRhaWxcbiAgICAgIGRlY3J5cHREYXRhKHtcbiAgICAgICAgZW5jcnlwdGVkRGF0YTogZGV0YWlsLmVuY3J5cHRlZERhdGEsXG4gICAgICAgIGl2OiBkZXRhaWwuaXYsXG4gICAgICAgIHd4YXBwX3Rva2VuOiB0aGlzLnd4dG9rZW5cbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YS5kZWNyeXB0ZWREYXRhXG4gICAgICAgIHRoaXMudW5pb25pZCA9IGRhdGEudW5pb25JZFxuICAgICAgICB0aGlzLm5pY2tuYW1lID0gZGF0YS5uaWNrTmFtZVxuICAgICAgICB0aGlzLnNleCA9IGRhdGEuZ2VuZGVyXG4gICAgICAgIHRoaXMuaGVhZF9pbWcgPSBkYXRhLmF2YXRhclVybFxuICAgICAgICB0aGlzLnNob3dfbGF5ID0gdHJ1ZVxuICAgICAgICB0aGlzLm9wZW5faWQgPSBkYXRhLm9wZW5JZFxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH0sXG4gICAgZ2V0UGhvbmVOdW1iZXIoZSkge1xuICAgICAgY29uc3QgZGV0YWlsID0gZS5kZXRhaWxcbiAgICAgIGRlY3J5cHREYXRhKHtcbiAgICAgICAgZW5jcnlwdGVkRGF0YTogZGV0YWlsLmVuY3J5cHRlZERhdGEsXG4gICAgICAgIGl2OiBkZXRhaWwuaXYsXG4gICAgICAgIHd4YXBwX3Rva2VuOiB0aGlzLnd4dG9rZW5cbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgdGhpcy5waG9uZSA9IHJlcy5kYXRhLmRlY3J5cHRlZERhdGEucGhvbmVOdW1iZXJcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB0aGlzLmxvZ2luQnlXZWl4aW4oKVxuICAgICAgfSlcbiAgICB9XG4gIH07XG4gIGxvZ2luQnlXZWl4aW4oKSB7XG4gICAgd3hMb2dpbih7XG4gICAgICBvcGVuX2lkOiB0aGlzLm9wZW5faWQsXG4gICAgICBuaWNrbmFtZTogdGhpcy5uaWNrbmFtZSxcbiAgICAgIGhlYWRfaW1nOiB0aGlzLmhlYWRfaW1nLFxuICAgICAgc2V4OiB0aGlzLnNleCxcbiAgICAgIGF1dGhfaWQ6IHRoaXMudW5pb25pZCxcbiAgICAgIHd4YXBwX3Rva2VuOiB0aGlzLnd4dG9rZW4sXG4gICAgICBtb2JpbGU6IHRoaXMucGhvbmVcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgIGxldCBtZW1iZXJJbmZvID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuICAgICAgbWVtYmVySW5mbyA9IHtcbiAgICAgICAgbWVtYmVyX2lkOiBkYXRhLm1lbWJlcl9pZCxcbiAgICAgICAgbWVtYmVyX3Rva2VuOiBkYXRhLm1lbWJlcl90b2tlbixcbiAgICAgICAgcGhvbmU6IHRoaXMucGhvbmUsXG4gICAgICAgIG5pY2tuYW1lOiB0aGlzLm5pY2tuYW1lLFxuICAgICAgICBhdmF0YXI6IHRoaXMuaGVhZF9pbWdcbiAgICAgIH1cbiAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJywgbWVtYmVySW5mbylcbiAgICAgIGlmICh0aGlzLmpvaW5LZXkpIHtcbiAgICAgICAgd3gucmVMYXVuY2goe1xuICAgICAgICAgIHVybDogYGpvaW5DbGFzcz9jbGFzc0lkPSR7dGhpcy5jbGFzc0lkfSZuYW1lPSR7dGhpcy5uYW1lfSZpc19zaGFyZT10cnVlYFxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd3gucmVMYXVuY2goe1xuICAgICAgICAgIHVybDogJ2NsYXNzTGlzdCdcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIG9uTG9hZChlKSB7XG4gICAgdGhpcy5qb2luS2V5ID0gZS5rZXlcbiAgICB0aGlzLmNsYXNzSWQgPSBlLmNsYXNzSWRcbiAgICB0aGlzLm5hbWUgPSBlLm5hbWVcbiAgICB3eC5sb2dpbih7XG4gICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICBsZXQgb2xkX3d4YXBwX3Rva2VuID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3d4dG9rZW4nKVxuICAgICAgICBnZXRTZXNzaW9uS2V5KHtcbiAgICAgICAgICBjb2RlOiByZXMuY29kZSxcbiAgICAgICAgICBvbGRfd3hhcHBfdG9rZW46IG9sZF93eGFwcF90b2tlblxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YVxuICAgICAgICAgIHRoaXMudW5pb25pZCA9IGRhdGEudW5pb25pZCA/IGRhdGEudW5pb25pZCA6ICcnXG4gICAgICAgICAgdGhpcy53eHRva2VuID0gZGF0YS53eGFwcF90b2tlblxuICAgICAgICAgIHRoaXMub3BlbmlkID0gZGF0YS5vcGVuaWRcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3d4dG9rZW4nLCB0aGlzLnd4dG9rZW4pXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuIl19