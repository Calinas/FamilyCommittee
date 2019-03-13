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
            url: 'joinClass?classId=' + _this4.classId + '&name=' + _this4.name
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbImxvZ2luIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ1bmlvbmlkIiwid3h0b2tlbiIsIm9wZW5pZCIsInNob3dfbGF5Iiwibmlja25hbWUiLCJzZXgiLCJoZWFkX2ltZyIsInBob25lIiwib3Blbl9pZCIsImpvaW5LZXkiLCJjbGFzc0lkIiwibmFtZSIsIm1ldGhvZHMiLCJnZXRVc2VySW5mbyIsImUiLCJkZXRhaWwiLCJlbmNyeXB0ZWREYXRhIiwiaXYiLCJ3eGFwcF90b2tlbiIsInRoZW4iLCJyZXMiLCJkZWNyeXB0ZWREYXRhIiwidW5pb25JZCIsIm5pY2tOYW1lIiwiZ2VuZGVyIiwiYXZhdGFyVXJsIiwib3BlbklkIiwiJGFwcGx5IiwiZ2V0UGhvbmVOdW1iZXIiLCJwaG9uZU51bWJlciIsImxvZ2luQnlXZWl4aW4iLCJhdXRoX2lkIiwibW9iaWxlIiwibWVtYmVySW5mbyIsIk9iamVjdCIsImNyZWF0ZSIsIm1lbWJlcl9pZCIsIm1lbWJlcl90b2tlbiIsImF2YXRhciIsInd4Iiwic2V0U3RvcmFnZVN5bmMiLCJyZUxhdW5jaCIsInVybCIsImtleSIsInN1Y2Nlc3MiLCJvbGRfd3hhcHBfdG9rZW4iLCJnZXRTdG9yYWdlU3luYyIsImNvZGUiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7Ozs7Ozs7O0FBSEE7QUFDQTs7O0lBR3FCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsZUFBUyxFQURKO0FBRUxDLGVBQVMsRUFGSjtBQUdMQyxjQUFRLEVBSEg7QUFJTEMsZ0JBQVUsS0FKTDtBQUtMQyxnQkFBVSxJQUxMO0FBTUxDLFdBQUssRUFOQTtBQU9MQyxnQkFBVSxFQVBMO0FBUUxDLGFBQU8sRUFSRjtBQVNMQyxlQUFTLEVBVEo7QUFVTEMsZUFBUyxFQVZK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LGdCQUFJcEIsT0FBT3FCLElBQUlyQixJQUFmO0FBQ0EsbUJBQUtDLE9BQUwsR0FBZUQsS0FBS0MsT0FBTCxHQUFlRCxLQUFLQyxPQUFwQixHQUE4QixFQUE3QztBQUNBLG1CQUFLQyxPQUFMLEdBQWVGLEtBQUttQixXQUFwQjtBQUNBLG1CQUFLaEIsTUFBTCxHQUFjSCxLQUFLRyxNQUFuQjtBQUNBLG1CQUFLeUIsTUFBTDtBQUNBWSxlQUFHQyxjQUFILENBQWtCLFNBQWxCLEVBQTZCLE9BQUt2QyxPQUFsQztBQUNELFdBVkQ7QUFXRDtBQWRNLE9BQVQ7QUFnQkQ7Ozs7RUFwR2dDK0MsZUFBS0MsSTs7a0JBQW5CckQsSyIsImZpbGUiOiJsb2dpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4vLyDlpoLmnpznm7TmjqXmi7/liLDkuoZ1bmlvbl9pZCzpgqMgbmlja25hbWUs6L+Z5Lqb5piv5LuA5LmI5pe25YCZ5ou/5Yiw55qE77yfXHJcbi8v5oql6ZSZ5L+h5oGv5aW95YOP5rKh5aSE55CGXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCB7IGdldFNlc3Npb25LZXksIGRlY3J5cHREYXRhLCB3eExvZ2luIH0gZnJvbSAnLi4vYXBpL2xvZ2luJ1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBsb2dpbiBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+eZu+W9lSdcclxuICB9O1xyXG4gIGRhdGEgPSB7XHJcbiAgICB1bmlvbmlkOiAnJyxcclxuICAgIHd4dG9rZW46ICcnLFxyXG4gICAgb3BlbmlkOiAnJyxcclxuICAgIHNob3dfbGF5OiBmYWxzZSxcclxuICAgIG5pY2tuYW1lOiAn55So5oi3JyxcclxuICAgIHNleDogJycsXHJcbiAgICBoZWFkX2ltZzogJycsXHJcbiAgICBwaG9uZTogJycsXHJcbiAgICBvcGVuX2lkOiAnJyxcclxuICAgIGpvaW5LZXk6ICcnLFxyXG4gICAgY2xhc3NJZDogLTEsXHJcbiAgICBuYW1lOiAnJ1xyXG4gIH07XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGdldFVzZXJJbmZvKGUpIHtcclxuICAgICAgY29uc3QgZGV0YWlsID0gZS5kZXRhaWxcclxuICAgICAgZGVjcnlwdERhdGEoe1xyXG4gICAgICAgIGVuY3J5cHRlZERhdGE6IGRldGFpbC5lbmNyeXB0ZWREYXRhLFxyXG4gICAgICAgIGl2OiBkZXRhaWwuaXYsXHJcbiAgICAgICAgd3hhcHBfdG9rZW46IHRoaXMud3h0b2tlblxyXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YS5kZWNyeXB0ZWREYXRhXHJcbiAgICAgICAgdGhpcy51bmlvbmlkID0gZGF0YS51bmlvbklkXHJcbiAgICAgICAgdGhpcy5uaWNrbmFtZSA9IGRhdGEubmlja05hbWVcclxuICAgICAgICB0aGlzLnNleCA9IGRhdGEuZ2VuZGVyXHJcbiAgICAgICAgdGhpcy5oZWFkX2ltZyA9IGRhdGEuYXZhdGFyVXJsXHJcbiAgICAgICAgdGhpcy5zaG93X2xheSA9IHRydWVcclxuICAgICAgICB0aGlzLm9wZW5faWQgPSBkYXRhLm9wZW5JZFxyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBnZXRQaG9uZU51bWJlcihlKSB7XHJcbiAgICAgIGNvbnN0IGRldGFpbCA9IGUuZGV0YWlsXHJcbiAgICAgIGRlY3J5cHREYXRhKHtcclxuICAgICAgICBlbmNyeXB0ZWREYXRhOiBkZXRhaWwuZW5jcnlwdGVkRGF0YSxcclxuICAgICAgICBpdjogZGV0YWlsLml2LFxyXG4gICAgICAgIHd4YXBwX3Rva2VuOiB0aGlzLnd4dG9rZW5cclxuICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgIHRoaXMucGhvbmUgPSByZXMuZGF0YS5kZWNyeXB0ZWREYXRhLnBob25lTnVtYmVyXHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIHRoaXMubG9naW5CeVdlaXhpbigpXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfTtcclxuICBsb2dpbkJ5V2VpeGluKCkge1xyXG4gICAgd3hMb2dpbih7XHJcbiAgICAgIG9wZW5faWQ6IHRoaXMub3Blbl9pZCxcclxuICAgICAgbmlja25hbWU6IHRoaXMubmlja25hbWUsXHJcbiAgICAgIGhlYWRfaW1nOiB0aGlzLmhlYWRfaW1nLFxyXG4gICAgICBzZXg6IHRoaXMuc2V4LFxyXG4gICAgICBhdXRoX2lkOiB0aGlzLnVuaW9uaWQsXHJcbiAgICAgIHd4YXBwX3Rva2VuOiB0aGlzLnd4dG9rZW4sXHJcbiAgICAgIG1vYmlsZTogdGhpcy5waG9uZVxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhLmRhdGFcclxuICAgICAgbGV0IG1lbWJlckluZm8gPSBPYmplY3QuY3JlYXRlKG51bGwpXHJcbiAgICAgIG1lbWJlckluZm8gPSB7XHJcbiAgICAgICAgbWVtYmVyX2lkOiBkYXRhLm1lbWJlcl9pZCxcclxuICAgICAgICBtZW1iZXJfdG9rZW46IGRhdGEubWVtYmVyX3Rva2VuLFxyXG4gICAgICAgIHBob25lOiB0aGlzLnBob25lLFxyXG4gICAgICAgIG5pY2tuYW1lOiB0aGlzLm5pY2tuYW1lLFxyXG4gICAgICAgIGF2YXRhcjogdGhpcy5oZWFkX2ltZ1xyXG4gICAgICB9XHJcbiAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJywgbWVtYmVySW5mbylcclxuICAgICAgaWYgKHRoaXMuam9pbktleSkge1xyXG4gICAgICAgIHd4LnJlTGF1bmNoKHtcclxuICAgICAgICAgIHVybDogYGpvaW5DbGFzcz9jbGFzc0lkPSR7dGhpcy5jbGFzc0lkfSZuYW1lPSR7dGhpcy5uYW1lfWBcclxuICAgICAgICB9KVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHd4LnJlTGF1bmNoKHtcclxuICAgICAgICAgIHVybDogJ2NsYXNzTGlzdCdcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuICBvbkxvYWQoZSkge1xyXG4gICAgdGhpcy5qb2luS2V5ID0gZS5rZXlcclxuICAgIHRoaXMuY2xhc3NJZCA9IGUuY2xhc3NJZFxyXG4gICAgdGhpcy5uYW1lID0gZS5uYW1lXHJcbiAgICB3eC5sb2dpbih7XHJcbiAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgbGV0IG9sZF93eGFwcF90b2tlbiA9IHd4LmdldFN0b3JhZ2VTeW5jKCd3eHRva2VuJylcclxuICAgICAgICBnZXRTZXNzaW9uS2V5KHtcclxuICAgICAgICAgIGNvZGU6IHJlcy5jb2RlLFxyXG4gICAgICAgICAgb2xkX3d4YXBwX3Rva2VuOiBvbGRfd3hhcHBfdG9rZW5cclxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhXHJcbiAgICAgICAgICB0aGlzLnVuaW9uaWQgPSBkYXRhLnVuaW9uaWQgPyBkYXRhLnVuaW9uaWQgOiAnJ1xyXG4gICAgICAgICAgdGhpcy53eHRva2VuID0gZGF0YS53eGFwcF90b2tlblxyXG4gICAgICAgICAgdGhpcy5vcGVuaWQgPSBkYXRhLm9wZW5pZFxyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3d4dG9rZW4nLCB0aGlzLnd4dG9rZW4pXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuIl19