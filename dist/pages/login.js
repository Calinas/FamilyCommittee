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
        wxapp_token: this.wxtoken
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbImxvZ2luIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ1bmlvbmlkIiwid3h0b2tlbiIsIm9wZW5pZCIsInNob3dfbGF5Iiwibmlja25hbWUiLCJzZXgiLCJoZWFkX2ltZyIsInBob25lIiwib3Blbl9pZCIsImpvaW5LZXkiLCJtZXRob2RzIiwiZ2V0VXNlckluZm8iLCJlIiwiZGV0YWlsIiwiZW5jcnlwdGVkRGF0YSIsIml2Iiwid3hhcHBfdG9rZW4iLCJ0aGVuIiwicmVzIiwiZGVjcnlwdGVkRGF0YSIsInVuaW9uSWQiLCJuaWNrTmFtZSIsImdlbmRlciIsImF2YXRhclVybCIsIm9wZW5JZCIsIiRhcHBseSIsImdldFBob25lTnVtYmVyIiwicGhvbmVOdW1iZXIiLCJsb2dpbkJ5V2VpeGluIiwiYXV0aF9pZCIsIm1lbWJlckluZm8iLCJPYmplY3QiLCJjcmVhdGUiLCJtZW1iZXJfaWQiLCJtZW1iZXJfdG9rZW4iLCJhdmF0YXIiLCJ3eCIsInNldFN0b3JhZ2VTeW5jIiwidXJsIiwicmVMYXVuY2giLCJrZXkiLCJzdWNjZXNzIiwib2xkX3d4YXBwX3Rva2VuIiwiZ2V0U3RvcmFnZVN5bmMiLCJjb2RlIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUdBOzs7O0FBQ0E7Ozs7Ozs7OztBQUhBO0FBQ0E7OztJQUdxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLGVBQVMsRUFESjtBQUVMQyxlQUFTLEVBRko7QUFHTEMsY0FBUSxFQUhIO0FBSUxDLGdCQUFVLEtBSkw7QUFLTEMsZ0JBQVUsSUFMTDtBQU1MQyxXQUFLLEVBTkE7QUFPTEMsZ0JBQVUsRUFQTDtBQVFMQyxhQUFPLEVBUkY7QUFTTEMsZUFBUyxFQVRKO0FBVUxDLGVBQVM7QUFWSixLLFFBWVBDLE8sR0FBVTtBQUNSQyxpQkFEUSx1QkFDSUMsQ0FESixFQUNPO0FBQUE7O0FBQ2IsWUFBTUMsU0FBU0QsRUFBRUMsTUFBakI7QUFDQSxnQ0FBWTtBQUNWQyx5QkFBZUQsT0FBT0MsYUFEWjtBQUVWQyxjQUFJRixPQUFPRSxFQUZEO0FBR1ZDLHVCQUFhLEtBQUtmO0FBSFIsU0FBWixFQUlHZ0IsSUFKSCxDQUlRLGVBQU87QUFDYixjQUFJbEIsT0FBT21CLElBQUluQixJQUFKLENBQVNvQixhQUFwQjtBQUNBLGlCQUFLbkIsT0FBTCxHQUFlRCxLQUFLcUIsT0FBcEI7QUFDQSxpQkFBS2hCLFFBQUwsR0FBZ0JMLEtBQUtzQixRQUFyQjtBQUNBLGlCQUFLaEIsR0FBTCxHQUFXTixLQUFLdUIsTUFBaEI7QUFDQSxpQkFBS2hCLFFBQUwsR0FBZ0JQLEtBQUt3QixTQUFyQjtBQUNBLGlCQUFLcEIsUUFBTCxHQUFnQixJQUFoQjtBQUNBLGlCQUFLSyxPQUFMLEdBQWVULEtBQUt5QixNQUFwQjtBQUNBLGlCQUFLQyxNQUFMO0FBQ0QsU0FiRDtBQWNELE9BakJPO0FBa0JSQyxvQkFsQlEsMEJBa0JPZCxDQWxCUCxFQWtCVTtBQUFBOztBQUNoQixZQUFNQyxTQUFTRCxFQUFFQyxNQUFqQjtBQUNBLGdDQUFZO0FBQ1ZDLHlCQUFlRCxPQUFPQyxhQURaO0FBRVZDLGNBQUlGLE9BQU9FLEVBRkQ7QUFHVkMsdUJBQWEsS0FBS2Y7QUFIUixTQUFaLEVBSUdnQixJQUpILENBSVEsZUFBTztBQUNiLGlCQUFLVixLQUFMLEdBQWFXLElBQUluQixJQUFKLENBQVNvQixhQUFULENBQXVCUSxXQUFwQztBQUNBLGlCQUFLRixNQUFMO0FBQ0EsaUJBQUtHLGFBQUw7QUFDRCxTQVJEO0FBU0Q7QUE3Qk8sSzs7Ozs7b0NBK0JNO0FBQUE7O0FBQ2QsMEJBQVE7QUFDTnBCLGlCQUFTLEtBQUtBLE9BRFI7QUFFTkosa0JBQVUsS0FBS0EsUUFGVDtBQUdORSxrQkFBVSxLQUFLQSxRQUhUO0FBSU5ELGFBQUssS0FBS0EsR0FKSjtBQUtOd0IsaUJBQVMsS0FBSzdCLE9BTFI7QUFNTmdCLHFCQUFhLEtBQUtmO0FBTlosT0FBUixFQU9HZ0IsSUFQSCxDQU9RLGVBQU87QUFDYixZQUFJbEIsT0FBT21CLElBQUluQixJQUFKLENBQVNBLElBQXBCO0FBQ0EsWUFBSStCLGFBQWFDLE9BQU9DLE1BQVAsQ0FBYyxJQUFkLENBQWpCO0FBQ0FGLHFCQUFhO0FBQ1hHLHFCQUFXbEMsS0FBS2tDLFNBREw7QUFFWEMsd0JBQWNuQyxLQUFLbUMsWUFGUjtBQUdYM0IsaUJBQU8sT0FBS0EsS0FIRDtBQUlYSCxvQkFBVSxPQUFLQSxRQUpKO0FBS1grQixrQkFBUSxPQUFLN0I7QUFMRixTQUFiO0FBT0E4QixXQUFHQyxjQUFILENBQWtCLFlBQWxCLEVBQWdDUCxVQUFoQztBQUNBLFlBQUlRLE1BQU0sT0FBSzdCLE9BQUwsa0JBQTRCLE9BQUtBLE9BQWpDLEdBQTZDLFdBQXZEO0FBQ0EyQixXQUFHRyxRQUFILENBQVk7QUFDVkQsZUFBS0E7QUFESyxTQUFaO0FBR0QsT0F0QkQ7QUF1QkQ7OzsyQkFDTTFCLEMsRUFBRztBQUFBOztBQUNSLFdBQUtILE9BQUwsR0FBZUcsRUFBRTRCLEdBQWpCO0FBQ0FKLFNBQUd4QyxLQUFILENBQVM7QUFDUDZDLGlCQUFTLHNCQUFPO0FBQ2QsY0FBSUMsa0JBQWtCTixHQUFHTyxjQUFILENBQWtCLFNBQWxCLENBQXRCO0FBQ0Esb0NBQWM7QUFDWkMsa0JBQU0xQixJQUFJMEIsSUFERTtBQUVaRiw2QkFBaUJBO0FBRkwsV0FBZCxFQUdHekIsSUFISCxDQUdRLGVBQU87QUFDYixnQkFBSWxCLE9BQU9tQixJQUFJbkIsSUFBZjtBQUNBLG1CQUFLQyxPQUFMLEdBQWVELEtBQUtDLE9BQUwsR0FBZUQsS0FBS0MsT0FBcEIsR0FBOEIsRUFBN0M7QUFDQSxtQkFBS0MsT0FBTCxHQUFlRixLQUFLaUIsV0FBcEI7QUFDQSxtQkFBS2QsTUFBTCxHQUFjSCxLQUFLRyxNQUFuQjtBQUNBLG1CQUFLdUIsTUFBTDtBQUNBVyxlQUFHQyxjQUFILENBQWtCLFNBQWxCLEVBQTZCLE9BQUtwQyxPQUFsQztBQUNELFdBVkQ7QUFXRDtBQWRNLE9BQVQ7QUFnQkQ7Ozs7RUExRmdDNEMsZUFBS0MsSTs7a0JBQW5CbEQsSyIsImZpbGUiOiJsb2dpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLy8g5aaC5p6c55u05o6l5ou/5Yiw5LqGdW5pb25faWQs6YKjIG5pY2tuYW1lLOi/meS6m+aYr+S7gOS5iOaXtuWAmeaLv+WIsOeahO+8n1xuLy/miqXplJnkv6Hmga/lpb3lg4/msqHlpITnkIZcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgeyBnZXRTZXNzaW9uS2V5LCBkZWNyeXB0RGF0YSwgd3hMb2dpbiB9IGZyb20gJy4uL2FwaS9sb2dpbidcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGxvZ2luIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnmbvlvZUnXG4gIH07XG4gIGRhdGEgPSB7XG4gICAgdW5pb25pZDogJycsXG4gICAgd3h0b2tlbjogJycsXG4gICAgb3BlbmlkOiAnJyxcbiAgICBzaG93X2xheTogZmFsc2UsXG4gICAgbmlja25hbWU6ICfnlKjmiLcnLFxuICAgIHNleDogJycsXG4gICAgaGVhZF9pbWc6ICcnLFxuICAgIHBob25lOiAnJyxcbiAgICBvcGVuX2lkOiAnJyxcbiAgICBqb2luS2V5OiAnJ1xuICB9O1xuICBtZXRob2RzID0ge1xuICAgIGdldFVzZXJJbmZvKGUpIHtcbiAgICAgIGNvbnN0IGRldGFpbCA9IGUuZGV0YWlsXG4gICAgICBkZWNyeXB0RGF0YSh7XG4gICAgICAgIGVuY3J5cHRlZERhdGE6IGRldGFpbC5lbmNyeXB0ZWREYXRhLFxuICAgICAgICBpdjogZGV0YWlsLml2LFxuICAgICAgICB3eGFwcF90b2tlbjogdGhpcy53eHRva2VuXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGEuZGVjcnlwdGVkRGF0YVxuICAgICAgICB0aGlzLnVuaW9uaWQgPSBkYXRhLnVuaW9uSWRcbiAgICAgICAgdGhpcy5uaWNrbmFtZSA9IGRhdGEubmlja05hbWVcbiAgICAgICAgdGhpcy5zZXggPSBkYXRhLmdlbmRlclxuICAgICAgICB0aGlzLmhlYWRfaW1nID0gZGF0YS5hdmF0YXJVcmxcbiAgICAgICAgdGhpcy5zaG93X2xheSA9IHRydWVcbiAgICAgICAgdGhpcy5vcGVuX2lkID0gZGF0YS5vcGVuSWRcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9LFxuICAgIGdldFBob25lTnVtYmVyKGUpIHtcbiAgICAgIGNvbnN0IGRldGFpbCA9IGUuZGV0YWlsXG4gICAgICBkZWNyeXB0RGF0YSh7XG4gICAgICAgIGVuY3J5cHRlZERhdGE6IGRldGFpbC5lbmNyeXB0ZWREYXRhLFxuICAgICAgICBpdjogZGV0YWlsLml2LFxuICAgICAgICB3eGFwcF90b2tlbjogdGhpcy53eHRva2VuXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIHRoaXMucGhvbmUgPSByZXMuZGF0YS5kZWNyeXB0ZWREYXRhLnBob25lTnVtYmVyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgdGhpcy5sb2dpbkJ5V2VpeGluKClcbiAgICAgIH0pXG4gICAgfVxuICB9O1xuICBsb2dpbkJ5V2VpeGluKCkge1xuICAgIHd4TG9naW4oe1xuICAgICAgb3Blbl9pZDogdGhpcy5vcGVuX2lkLFxuICAgICAgbmlja25hbWU6IHRoaXMubmlja25hbWUsXG4gICAgICBoZWFkX2ltZzogdGhpcy5oZWFkX2ltZyxcbiAgICAgIHNleDogdGhpcy5zZXgsXG4gICAgICBhdXRoX2lkOiB0aGlzLnVuaW9uaWQsXG4gICAgICB3eGFwcF90b2tlbjogdGhpcy53eHRva2VuXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICBsZXQgbWVtYmVySW5mbyA9IE9iamVjdC5jcmVhdGUobnVsbClcbiAgICAgIG1lbWJlckluZm8gPSB7XG4gICAgICAgIG1lbWJlcl9pZDogZGF0YS5tZW1iZXJfaWQsXG4gICAgICAgIG1lbWJlcl90b2tlbjogZGF0YS5tZW1iZXJfdG9rZW4sXG4gICAgICAgIHBob25lOiB0aGlzLnBob25lLFxuICAgICAgICBuaWNrbmFtZTogdGhpcy5uaWNrbmFtZSxcbiAgICAgICAgYXZhdGFyOiB0aGlzLmhlYWRfaW1nXG4gICAgICB9XG4gICAgICB3eC5zZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycsIG1lbWJlckluZm8pXG4gICAgICBsZXQgdXJsID0gdGhpcy5qb2luS2V5ID8gYGxvZ2luP2tleT0ke3RoaXMuam9pbktleX1gIDogJ2NsYXNzTGlzdCdcbiAgICAgIHd4LnJlTGF1bmNoKHtcbiAgICAgICAgdXJsOiB1cmxcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuICBvbkxvYWQoZSkge1xuICAgIHRoaXMuam9pbktleSA9IGUua2V5XG4gICAgd3gubG9naW4oe1xuICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgbGV0IG9sZF93eGFwcF90b2tlbiA9IHd4LmdldFN0b3JhZ2VTeW5jKCd3eHRva2VuJylcbiAgICAgICAgZ2V0U2Vzc2lvbktleSh7XG4gICAgICAgICAgY29kZTogcmVzLmNvZGUsXG4gICAgICAgICAgb2xkX3d4YXBwX3Rva2VuOiBvbGRfd3hhcHBfdG9rZW5cbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGFcbiAgICAgICAgICB0aGlzLnVuaW9uaWQgPSBkYXRhLnVuaW9uaWQgPyBkYXRhLnVuaW9uaWQgOiAnJ1xuICAgICAgICAgIHRoaXMud3h0b2tlbiA9IGRhdGEud3hhcHBfdG9rZW5cbiAgICAgICAgICB0aGlzLm9wZW5pZCA9IGRhdGEub3BlbmlkXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCd3eHRva2VuJywgdGhpcy53eHRva2VuKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cbiJdfQ==