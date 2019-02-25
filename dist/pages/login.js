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
      joinKey: ''
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
        var url = _this4.joinKey ? 'login?key=' + _this4.joinKey : 'classList';
        wx.reLaunch({
          url: url
        });
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad(e) {
      var _this5 = this;

      this.joinKey = e.key;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbImxvZ2luIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ1bmlvbmlkIiwid3h0b2tlbiIsIm9wZW5pZCIsInNob3dfbGF5Iiwibmlja25hbWUiLCJzZXgiLCJoZWFkX2ltZyIsInBob25lIiwib3Blbl9pZCIsImpvaW5LZXkiLCJtZXRob2RzIiwiZ2V0VXNlckluZm8iLCJlIiwiZGV0YWlsIiwiZW5jcnlwdGVkRGF0YSIsIml2Iiwid3hhcHBfdG9rZW4iLCJ0aGVuIiwicmVzIiwiZGVjcnlwdGVkRGF0YSIsInVuaW9uSWQiLCJuaWNrTmFtZSIsImdlbmRlciIsImF2YXRhclVybCIsIm9wZW5JZCIsIiRhcHBseSIsImdldFBob25lTnVtYmVyIiwicGhvbmVOdW1iZXIiLCJsb2dpbkJ5V2VpeGluIiwiYXV0aF9pZCIsIm1vYmlsZSIsIm1lbWJlckluZm8iLCJPYmplY3QiLCJjcmVhdGUiLCJtZW1iZXJfaWQiLCJtZW1iZXJfdG9rZW4iLCJhdmF0YXIiLCJ3eCIsInNldFN0b3JhZ2VTeW5jIiwidXJsIiwicmVMYXVuY2giLCJrZXkiLCJzdWNjZXNzIiwib2xkX3d4YXBwX3Rva2VuIiwiZ2V0U3RvcmFnZVN5bmMiLCJjb2RlIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUdBOzs7O0FBQ0E7Ozs7Ozs7OztBQUhBO0FBQ0E7OztJQUdxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLGVBQVMsRUFESjtBQUVMQyxlQUFTLEVBRko7QUFHTEMsY0FBUSxFQUhIO0FBSUxDLGdCQUFVLEtBSkw7QUFLTEMsZ0JBQVUsSUFMTDtBQU1MQyxXQUFLLEVBTkE7QUFPTEMsZ0JBQVUsRUFQTDtBQVFMQyxhQUFPLEVBUkY7QUFTTEMsZUFBUyxFQVRKO0FBVUxDLGVBQVM7QUFWSixLLFFBWVBDLE8sR0FBVTtB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QUFHQyxjQUFILENBQWtCLFNBQWxCLEVBQTZCLE9BQUtyQyxPQUFsQztBQUNELFdBVkQ7QUFXRDtBQWRNLE9BQVQ7QUFnQkQ7Ozs7RUEzRmdDNkMsZUFBS0MsSTs7a0JBQW5CbkQsSyIsImZpbGUiOiJsb2dpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4vLyDlpoLmnpznm7TmjqXmi7/liLDkuoZ1bmlvbl9pZCzpgqMgbmlja25hbWUs6L+Z5Lqb5piv5LuA5LmI5pe25YCZ5ou/5Yiw55qE77yfXHJcbi8v5oql6ZSZ5L+h5oGv5aW95YOP5rKh5aSE55CGXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCB7IGdldFNlc3Npb25LZXksIGRlY3J5cHREYXRhLCB3eExvZ2luIH0gZnJvbSAnLi4vYXBpL2xvZ2luJ1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBsb2dpbiBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+eZu+W9lSdcclxuICB9O1xyXG4gIGRhdGEgPSB7XHJcbiAgICB1bmlvbmlkOiAnJyxcclxuICAgIHd4dG9rZW46ICcnLFxyXG4gICAgb3BlbmlkOiAnJyxcclxuICAgIHNob3dfbGF5OiBmYWxzZSxcclxuICAgIG5pY2tuYW1lOiAn55So5oi3JyxcclxuICAgIHNleDogJycsXHJcbiAgICBoZWFkX2ltZzogJycsXHJcbiAgICBwaG9uZTogJycsXHJcbiAgICBvcGVuX2lkOiAnJyxcclxuICAgIGpvaW5LZXk6ICcnXHJcbiAgfTtcclxuICBtZXRob2RzID0ge1xyXG4gICAgZ2V0VXNlckluZm8oZSkge1xyXG4gICAgICBjb25zdCBkZXRhaWwgPSBlLmRldGFpbFxyXG4gICAgICBkZWNyeXB0RGF0YSh7XHJcbiAgICAgICAgZW5jcnlwdGVkRGF0YTogZGV0YWlsLmVuY3J5cHRlZERhdGEsXHJcbiAgICAgICAgaXY6IGRldGFpbC5pdixcclxuICAgICAgICB3eGFwcF90b2tlbjogdGhpcy53eHRva2VuXHJcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhLmRlY3J5cHRlZERhdGFcclxuICAgICAgICB0aGlzLnVuaW9uaWQgPSBkYXRhLnVuaW9uSWRcclxuICAgICAgICB0aGlzLm5pY2tuYW1lID0gZGF0YS5uaWNrTmFtZVxyXG4gICAgICAgIHRoaXMuc2V4ID0gZGF0YS5nZW5kZXJcclxuICAgICAgICB0aGlzLmhlYWRfaW1nID0gZGF0YS5hdmF0YXJVcmxcclxuICAgICAgICB0aGlzLnNob3dfbGF5ID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMub3Blbl9pZCA9IGRhdGEub3BlbklkXHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIGdldFBob25lTnVtYmVyKGUpIHtcclxuICAgICAgY29uc3QgZGV0YWlsID0gZS5kZXRhaWxcclxuICAgICAgZGVjcnlwdERhdGEoe1xyXG4gICAgICAgIGVuY3J5cHRlZERhdGE6IGRldGFpbC5lbmNyeXB0ZWREYXRhLFxyXG4gICAgICAgIGl2OiBkZXRhaWwuaXYsXHJcbiAgICAgICAgd3hhcHBfdG9rZW46IHRoaXMud3h0b2tlblxyXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgdGhpcy5waG9uZSA9IHJlcy5kYXRhLmRlY3J5cHRlZERhdGEucGhvbmVOdW1iZXJcclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgdGhpcy5sb2dpbkJ5V2VpeGluKClcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9O1xyXG4gIGxvZ2luQnlXZWl4aW4oKSB7XHJcbiAgICB3eExvZ2luKHtcclxuICAgICAgb3Blbl9pZDogdGhpcy5vcGVuX2lkLFxyXG4gICAgICBuaWNrbmFtZTogdGhpcy5uaWNrbmFtZSxcclxuICAgICAgaGVhZF9pbWc6IHRoaXMuaGVhZF9pbWcsXHJcbiAgICAgIHNleDogdGhpcy5zZXgsXHJcbiAgICAgIGF1dGhfaWQ6IHRoaXMudW5pb25pZCxcclxuICAgICAgd3hhcHBfdG9rZW46IHRoaXMud3h0b2tlbixcclxuICAgICAgbW9iaWxlOiB0aGlzLnBob25lXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGxldCBkYXRhID0gcmVzLmRhdGEuZGF0YVxyXG4gICAgICBsZXQgbWVtYmVySW5mbyA9IE9iamVjdC5jcmVhdGUobnVsbClcclxuICAgICAgbWVtYmVySW5mbyA9IHtcclxuICAgICAgICBtZW1iZXJfaWQ6IGRhdGEubWVtYmVyX2lkLFxyXG4gICAgICAgIG1lbWJlcl90b2tlbjogZGF0YS5tZW1iZXJfdG9rZW4sXHJcbiAgICAgICAgcGhvbmU6IHRoaXMucGhvbmUsXHJcbiAgICAgICAgbmlja25hbWU6IHRoaXMubmlja25hbWUsXHJcbiAgICAgICAgYXZhdGFyOiB0aGlzLmhlYWRfaW1nXHJcbiAgICAgIH1cclxuICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nLCBtZW1iZXJJbmZvKVxyXG4gICAgICBsZXQgdXJsID0gdGhpcy5qb2luS2V5ID8gYGxvZ2luP2tleT0ke3RoaXMuam9pbktleX1gIDogJ2NsYXNzTGlzdCdcclxuICAgICAgd3gucmVMYXVuY2goe1xyXG4gICAgICAgIHVybDogdXJsXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH1cclxuICBvbkxvYWQoZSkge1xyXG4gICAgdGhpcy5qb2luS2V5ID0gZS5rZXlcclxuICAgIHd4LmxvZ2luKHtcclxuICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICBsZXQgb2xkX3d4YXBwX3Rva2VuID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3d4dG9rZW4nKVxyXG4gICAgICAgIGdldFNlc3Npb25LZXkoe1xyXG4gICAgICAgICAgY29kZTogcmVzLmNvZGUsXHJcbiAgICAgICAgICBvbGRfd3hhcHBfdG9rZW46IG9sZF93eGFwcF90b2tlblxyXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGFcclxuICAgICAgICAgIHRoaXMudW5pb25pZCA9IGRhdGEudW5pb25pZCA/IGRhdGEudW5pb25pZCA6ICcnXHJcbiAgICAgICAgICB0aGlzLnd4dG9rZW4gPSBkYXRhLnd4YXBwX3Rva2VuXHJcbiAgICAgICAgICB0aGlzLm9wZW5pZCA9IGRhdGEub3BlbmlkXHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnd3h0b2tlbicsIHRoaXMud3h0b2tlbilcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG4iXX0=