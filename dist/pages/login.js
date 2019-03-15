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
            url: 'joinClass?classId=' + _this4.classId + '&name=' + _this4.name + '&key=' + _this4.joinKey
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbImxvZ2luIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ1bmlvbmlkIiwid3h0b2tlbiIsIm9wZW5pZCIsInNob3dfbGF5Iiwibmlja25hbWUiLCJzZXgiLCJoZWFkX2ltZyIsInBob25lIiwib3Blbl9pZCIsImpvaW5LZXkiLCJjbGFzc0lkIiwibmFtZSIsIm1ldGhvZHMiLCJnZXRVc2VySW5mbyIsImUiLCJkZXRhaWwiLCJlbmNyeXB0ZWREYXRhIiwiaXYiLCJ3eGFwcF90b2tlbiIsInRoZW4iLCJyZXMiLCJkZWNyeXB0ZWREYXRhIiwidW5pb25JZCIsIm5pY2tOYW1lIiwiZ2VuZGVyIiwiYXZhdGFyVXJsIiwib3BlbklkIiwiJGFwcGx5IiwiZ2V0UGhvbmVOdW1iZXIiLCJwaG9uZU51bWJlciIsImxvZ2luQnlXZWl4aW4iLCJhdXRoX2lkIiwibW9iaWxlIiwibWVtYmVySW5mbyIsIk9iamVjdCIsImNyZWF0ZSIsIm1lbWJlcl9pZCIsIm1lbWJlcl90b2tlbiIsImF2YXRhciIsInd4Iiwic2V0U3RvcmFnZVN5bmMiLCJyZUxhdW5jaCIsInVybCIsImtleSIsInN1Y2Nlc3MiLCJvbGRfd3hhcHBfdG9rZW4iLCJnZXRTdG9yYWdlU3luYyIsImNvZGUiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7Ozs7Ozs7O0FBSEE7QUFDQTs7O0lBR3FCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsZUFBUyxFQURKO0FBRUxDLGVBQVMsRUFGSjtBQUdMQyxjQUFRLEVBSEg7QUFJTEMsZ0JBQVUsS0FKTDtBQUtMQyxnQkFBVSxJQUxMO0FBTUxDLFdBQUssRUFOQTtBQU9MQyxnQkFBVSxFQVBMO0FBUUxDLGFBQU8sRUFSRjtBQVNMQyxlQUFTLEVBVEo7QUFVTEMsZUFBUyxFQVZK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QUhILENBR1EsZUFBTztBQUNiLGdCQUFJcEIsT0FBT3FCLElBQUlyQixJQUFmO0FBQ0EsbUJBQUtDLE9BQUwsR0FBZUQsS0FBS0MsT0FBTCxHQUFlRCxLQUFLQyxPQUFwQixHQUE4QixFQUE3QztBQUNBLG1CQUFLQyxPQUFMLEdBQWVGLEtBQUttQixXQUFwQjtBQUNBLG1CQUFLaEIsTUFBTCxHQUFjSCxLQUFLRyxNQUFuQjtBQUNBLG1CQUFLeUIsTUFBTDtBQUNBWSxlQUFHQyxjQUFILENBQWtCLFNBQWxCLEVBQTZCLE9BQUt2QyxPQUFsQztBQUNELFdBVkQ7QUFXRDtBQWRNLE9BQVQ7QUFnQkQ7Ozs7RUFwR2dDK0MsZUFBS0MsSTs7a0JBQW5CckQsSyIsImZpbGUiOiJsb2dpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLy8g5aaC5p6c55u05o6l5ou/5Yiw5LqGdW5pb25faWQs6YKjIG5pY2tuYW1lLOi/meS6m+aYr+S7gOS5iOaXtuWAmeaLv+WIsOeahO+8n1xuLy/miqXplJnkv6Hmga/lpb3lg4/msqHlpITnkIZcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgeyBnZXRTZXNzaW9uS2V5LCBkZWNyeXB0RGF0YSwgd3hMb2dpbiB9IGZyb20gJy4uL2FwaS9sb2dpbidcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGxvZ2luIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnmbvlvZUnXG4gIH07XG4gIGRhdGEgPSB7XG4gICAgdW5pb25pZDogJycsXG4gICAgd3h0b2tlbjogJycsXG4gICAgb3BlbmlkOiAnJyxcbiAgICBzaG93X2xheTogZmFsc2UsXG4gICAgbmlja25hbWU6ICfnlKjmiLcnLFxuICAgIHNleDogJycsXG4gICAgaGVhZF9pbWc6ICcnLFxuICAgIHBob25lOiAnJyxcbiAgICBvcGVuX2lkOiAnJyxcbiAgICBqb2luS2V5OiAnJyxcbiAgICBjbGFzc0lkOiAtMSxcbiAgICBuYW1lOiAnJ1xuICB9O1xuICBtZXRob2RzID0ge1xuICAgIGdldFVzZXJJbmZvKGUpIHtcbiAgICAgIGNvbnN0IGRldGFpbCA9IGUuZGV0YWlsXG4gICAgICBkZWNyeXB0RGF0YSh7XG4gICAgICAgIGVuY3J5cHRlZERhdGE6IGRldGFpbC5lbmNyeXB0ZWREYXRhLFxuICAgICAgICBpdjogZGV0YWlsLml2LFxuICAgICAgICB3eGFwcF90b2tlbjogdGhpcy53eHRva2VuXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGEuZGVjcnlwdGVkRGF0YVxuICAgICAgICB0aGlzLnVuaW9uaWQgPSBkYXRhLnVuaW9uSWRcbiAgICAgICAgdGhpcy5uaWNrbmFtZSA9IGRhdGEubmlja05hbWVcbiAgICAgICAgdGhpcy5zZXggPSBkYXRhLmdlbmRlclxuICAgICAgICB0aGlzLmhlYWRfaW1nID0gZGF0YS5hdmF0YXJVcmxcbiAgICAgICAgdGhpcy5zaG93X2xheSA9IHRydWVcbiAgICAgICAgdGhpcy5vcGVuX2lkID0gZGF0YS5vcGVuSWRcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9LFxuICAgIGdldFBob25lTnVtYmVyKGUpIHtcbiAgICAgIGNvbnN0IGRldGFpbCA9IGUuZGV0YWlsXG4gICAgICBkZWNyeXB0RGF0YSh7XG4gICAgICAgIGVuY3J5cHRlZERhdGE6IGRldGFpbC5lbmNyeXB0ZWREYXRhLFxuICAgICAgICBpdjogZGV0YWlsLml2LFxuICAgICAgICB3eGFwcF90b2tlbjogdGhpcy53eHRva2VuXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIHRoaXMucGhvbmUgPSByZXMuZGF0YS5kZWNyeXB0ZWREYXRhLnBob25lTnVtYmVyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgdGhpcy5sb2dpbkJ5V2VpeGluKClcbiAgICAgIH0pXG4gICAgfVxuICB9O1xuICBsb2dpbkJ5V2VpeGluKCkge1xuICAgIHd4TG9naW4oe1xuICAgICAgb3Blbl9pZDogdGhpcy5vcGVuX2lkLFxuICAgICAgbmlja25hbWU6IHRoaXMubmlja25hbWUsXG4gICAgICBoZWFkX2ltZzogdGhpcy5oZWFkX2ltZyxcbiAgICAgIHNleDogdGhpcy5zZXgsXG4gICAgICBhdXRoX2lkOiB0aGlzLnVuaW9uaWQsXG4gICAgICB3eGFwcF90b2tlbjogdGhpcy53eHRva2VuLFxuICAgICAgbW9iaWxlOiB0aGlzLnBob25lXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICBsZXQgbWVtYmVySW5mbyA9IE9iamVjdC5jcmVhdGUobnVsbClcbiAgICAgIG1lbWJlckluZm8gPSB7XG4gICAgICAgIG1lbWJlcl9pZDogZGF0YS5tZW1iZXJfaWQsXG4gICAgICAgIG1lbWJlcl90b2tlbjogZGF0YS5tZW1iZXJfdG9rZW4sXG4gICAgICAgIHBob25lOiB0aGlzLnBob25lLFxuICAgICAgICBuaWNrbmFtZTogdGhpcy5uaWNrbmFtZSxcbiAgICAgICAgYXZhdGFyOiB0aGlzLmhlYWRfaW1nXG4gICAgICB9XG4gICAgICB3eC5zZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycsIG1lbWJlckluZm8pXG4gICAgICBpZiAodGhpcy5qb2luS2V5KSB7XG4gICAgICAgIHd4LnJlTGF1bmNoKHtcbiAgICAgICAgICB1cmw6IGBqb2luQ2xhc3M/Y2xhc3NJZD0ke3RoaXMuY2xhc3NJZH0mbmFtZT0ke3RoaXMubmFtZX0ma2V5PSR7dGhpcy5qb2luS2V5fWBcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHd4LnJlTGF1bmNoKHtcbiAgICAgICAgICB1cmw6ICdjbGFzc0xpc3QnXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBvbkxvYWQoZSkge1xuICAgIHRoaXMuam9pbktleSA9IGUua2V5XG4gICAgdGhpcy5jbGFzc0lkID0gZS5jbGFzc0lkXG4gICAgdGhpcy5uYW1lID0gZS5uYW1lXG4gICAgd3gubG9naW4oe1xuICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgbGV0IG9sZF93eGFwcF90b2tlbiA9IHd4LmdldFN0b3JhZ2VTeW5jKCd3eHRva2VuJylcbiAgICAgICAgZ2V0U2Vzc2lvbktleSh7XG4gICAgICAgICAgY29kZTogcmVzLmNvZGUsXG4gICAgICAgICAgb2xkX3d4YXBwX3Rva2VuOiBvbGRfd3hhcHBfdG9rZW5cbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGFcbiAgICAgICAgICB0aGlzLnVuaW9uaWQgPSBkYXRhLnVuaW9uaWQgPyBkYXRhLnVuaW9uaWQgOiAnJ1xuICAgICAgICAgIHRoaXMud3h0b2tlbiA9IGRhdGEud3hhcHBfdG9rZW5cbiAgICAgICAgICB0aGlzLm9wZW5pZCA9IGRhdGEub3BlbmlkXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCd3eHRva2VuJywgdGhpcy53eHRva2VuKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cbiJdfQ==