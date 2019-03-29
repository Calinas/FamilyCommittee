'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _common = require('./../utils/common.js');

var _login = require('./../api/login.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// 如果直接拿到了union_id,那 nickname,这些是什么时候拿到的？
//报错信息好像没处理


var login = function (_wepy$page) {
  _inherits(login, _wepy$page);

  function login() {
    var _ref, _this$data;

    var _temp, _this, _ret;

    _classCallCheck(this, login);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = login.__proto__ || Object.getPrototypeOf(login)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '登录'
    }, _this.data = (_this$data = {
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
    }, _defineProperty(_this$data, 'show_lay', false), _defineProperty(_this$data, 'forWeixinTest', false), _defineProperty(_this$data, 'testPhone', ''), _defineProperty(_this$data, 'testCode', ''), _this$data), _this.methods = {
      bindTest: function bindTest(e) {
        this[e.currentTarget.id] = Number(e.detail.value);
        this.$apply();
      },
      loginTest: function loginTest() {
        //给微信开发测试
        if (this.testPhone !== 13456780980 || this.testCode !== 123456) {
          (0, _common.showMsg)('请填写正确的账户信息');
          return;
        }
        var memberInfo = Object.create(null);
        memberInfo = {
          member_id: 19,
          member_token: '10751B5360622D6BEAC588ED2D94E379'
        };
        wx.setStorageSync('memberInfo', memberInfo);
        wx.switchTab({
          url: 'classList'
        });
      },
      getUserInfo: function getUserInfo(e) {
        var _this2 = this;

        var detail = e.detail;
        if (!detail.rawData) {
          (0, _common.showMsg)('授权失败');
          this.forWeixinTest = true;
          this.show_lay = false;
          this.$apply();
          return;
        }
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
        if (!detail.encryptedData) {
          (0, _common.showMsg)('授权失败');
          this.forWeixinTest = true;
          this.show_lay = false;
          this.$apply();
          return;
        }
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
      this.$apply();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbImxvZ2luIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ1bmlvbmlkIiwid3h0b2tlbiIsIm9wZW5pZCIsInNob3dfbGF5Iiwibmlja25hbWUiLCJzZXgiLCJoZWFkX2ltZyIsInBob25lIiwib3Blbl9pZCIsImpvaW5LZXkiLCJjbGFzc0lkIiwibmFtZSIsIm1ldGhvZHMiLCJiaW5kVGVzdCIsImUiLCJjdXJyZW50VGFyZ2V0IiwiaWQiLCJOdW1iZXIiLCJkZXRhaWwiLCJ2YWx1ZSIsIiRhcHBseSIsImxvZ2luVGVzdCIsInRlc3RQaG9uZSIsInRlc3RDb2RlIiwibWVtYmVySW5mbyIsIk9iamVjdCIsImNyZWF0ZSIsIm1lbWJlcl9pZCIsIm1lbWJlcl90b2tlbiIsInd4Iiwic2V0U3RvcmFnZVN5bmMiLCJzd2l0Y2hUYWIiLCJ1cmwiLCJnZXRVc2VySW5mbyIsInJhd0RhdGEiLCJmb3JXZWl4aW5UZXN0IiwiZW5jcnlwdGVkRGF0YSIsIml2Iiwid3hhcHBfdG9rZW4iLCJ0aGVuIiwicmVzIiwiZGVjcnlwdGVkRGF0YSIsInVuaW9uSWQiLCJuaWNrTmFtZSIsImdlbmRlciIsImF2YXRhclVybCIsIm9wZW5JZCIsImdldFBob25lTnVtYmVyIiwicGhvbmVOdW1iZXIiLCJsb2dpbkJ5V2VpeGluIiwiYXV0aF9pZCIsIm1vYmlsZSIsImF2YXRhciIsInJlTGF1bmNoIiwia2V5Iiwic3VjY2VzcyIsIm9sZF93eGFwcF90b2tlbiIsImdldFN0b3JhZ2VTeW5jIiwiY29kZSIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFHQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7OztBQUpBO0FBQ0E7OztJQUlxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSTtBQUNFQyxlQUFTLEU7QUFDVEMsZUFBUyxFO0FBQ1RDLGNBQVEs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QU95QyxJQUFJekMsSUFBZjtBQUNBLG1CQUFLQyxPQUFMLEdBQWVELEtBQUtDLE9BQUwsR0FBZUQsS0FBS0MsT0FBcEIsR0FBOEIsRUFBN0M7QUFDQSxtQkFBS0MsT0FBTCxHQUFlRixLQUFLdUMsV0FBcEI7QUFDQSxtQkFBS3BDLE1BQUwsR0FBY0gsS0FBS0csTUFBbkI7QUFDQSxtQkFBS2tCLE1BQUw7QUFDQVMsZUFBR0MsY0FBSCxDQUFrQixTQUFsQixFQUE2QixPQUFLN0IsT0FBbEM7QUFDRCxXQVZEO0FBV0Q7QUFkTSxPQUFUO0FBZ0JEOzs7O0VBM0lnQzBELGVBQUtDLEk7O2tCQUFuQmhFLEsiLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8vIOWmguaenOebtOaOpeaLv+WIsOS6hnVuaW9uX2lkLOmCoyBuaWNrbmFtZSzov5nkupvmmK/ku4DkuYjml7blgJnmi7/liLDnmoTvvJ9cbi8v5oql6ZSZ5L+h5oGv5aW95YOP5rKh5aSE55CGXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHsgc2hvd01zZyB9IGZyb20gJy4uL3V0aWxzL2NvbW1vbidcbmltcG9ydCB7IGdldFNlc3Npb25LZXksIGRlY3J5cHREYXRhLCB3eExvZ2luIH0gZnJvbSAnLi4vYXBpL2xvZ2luJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgbG9naW4gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+eZu+W9lSdcbiAgfTtcbiAgZGF0YSA9IHtcbiAgICB1bmlvbmlkOiAnJyxcbiAgICB3eHRva2VuOiAnJyxcbiAgICBvcGVuaWQ6ICcnLFxuICAgIHNob3dfbGF5OiBmYWxzZSxcbiAgICBuaWNrbmFtZTogJ+eUqOaItycsXG4gICAgc2V4OiAnJyxcbiAgICBoZWFkX2ltZzogJycsXG4gICAgcGhvbmU6ICcnLFxuICAgIG9wZW5faWQ6ICcnLFxuICAgIGpvaW5LZXk6ICcnLFxuICAgIGNsYXNzSWQ6IC0xLFxuICAgIG5hbWU6ICcnLFxuICAgIHNob3dfbGF5OiBmYWxzZSxcbiAgICBmb3JXZWl4aW5UZXN0OiBmYWxzZSxcbiAgICB0ZXN0UGhvbmU6ICcnLFxuICAgIHRlc3RDb2RlOiAnJ1xuICB9O1xuICBtZXRob2RzID0ge1xuICAgIGJpbmRUZXN0KGUpIHtcbiAgICAgIHRoaXNbZS5jdXJyZW50VGFyZ2V0LmlkXSA9IE51bWJlcihlLmRldGFpbC52YWx1ZSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGxvZ2luVGVzdCgpIHtcbiAgICAgIC8v57uZ5b6u5L+h5byA5Y+R5rWL6K+VXG4gICAgICBpZiAodGhpcy50ZXN0UGhvbmUgIT09IDEzNDU2NzgwOTgwIHx8IHRoaXMudGVzdENvZGUgIT09IDEyMzQ1Nikge1xuICAgICAgICBzaG93TXNnKCfor7floavlhpnmraPnoa7nmoTotKbmiLfkv6Hmga8nKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGxldCBtZW1iZXJJbmZvID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuICAgICAgbWVtYmVySW5mbyA9IHtcbiAgICAgICAgbWVtYmVyX2lkOiAxOSxcbiAgICAgICAgbWVtYmVyX3Rva2VuOiAnMTA3NTFCNTM2MDYyMkQ2QkVBQzU4OEVEMkQ5NEUzNzknXG4gICAgICB9XG4gICAgICB3eC5zZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycsIG1lbWJlckluZm8pXG4gICAgICB3eC5zd2l0Y2hUYWIoe1xuICAgICAgICB1cmw6ICdjbGFzc0xpc3QnXG4gICAgICB9KVxuICAgIH0sXG4gICAgZ2V0VXNlckluZm8oZSkge1xuICAgICAgY29uc3QgZGV0YWlsID0gZS5kZXRhaWxcbiAgICAgICBpZighZGV0YWlsLnJhd0RhdGEpIHtcbiAgICAgICAgICBzaG93TXNnKCfmjojmnYPlpLHotKUnKVxuICAgICAgICAgIHRoaXMuZm9yV2VpeGluVGVzdCA9IHRydWVcbiAgICAgICAgICB0aGlzLnNob3dfbGF5ID0gZmFsc2VcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBkZWNyeXB0RGF0YSh7XG4gICAgICAgIGVuY3J5cHRlZERhdGE6IGRldGFpbC5lbmNyeXB0ZWREYXRhLFxuICAgICAgICBpdjogZGV0YWlsLml2LFxuICAgICAgICB3eGFwcF90b2tlbjogdGhpcy53eHRva2VuXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGEuZGVjcnlwdGVkRGF0YVxuICAgICAgICB0aGlzLnVuaW9uaWQgPSBkYXRhLnVuaW9uSWRcbiAgICAgICAgdGhpcy5uaWNrbmFtZSA9IGRhdGEubmlja05hbWVcbiAgICAgICAgdGhpcy5zZXggPSBkYXRhLmdlbmRlclxuICAgICAgICB0aGlzLmhlYWRfaW1nID0gZGF0YS5hdmF0YXJVcmxcbiAgICAgICAgdGhpcy5zaG93X2xheSA9IHRydWVcbiAgICAgICAgdGhpcy5vcGVuX2lkID0gZGF0YS5vcGVuSWRcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9LFxuICAgIGdldFBob25lTnVtYmVyKGUpIHtcbiAgICAgIGNvbnN0IGRldGFpbCA9IGUuZGV0YWlsXG4gICAgICBpZighZGV0YWlsLmVuY3J5cHRlZERhdGEpIHtcbiAgICAgICAgc2hvd01zZygn5o6I5p2D5aSx6LSlJylcbiAgICAgICAgdGhpcy5mb3JXZWl4aW5UZXN0ID0gdHJ1ZVxuICAgICAgICB0aGlzLnNob3dfbGF5ID0gZmFsc2VcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGRlY3J5cHREYXRhKHtcbiAgICAgICAgZW5jcnlwdGVkRGF0YTogZGV0YWlsLmVuY3J5cHRlZERhdGEsXG4gICAgICAgIGl2OiBkZXRhaWwuaXYsXG4gICAgICAgIHd4YXBwX3Rva2VuOiB0aGlzLnd4dG9rZW5cbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgdGhpcy5waG9uZSA9IHJlcy5kYXRhLmRlY3J5cHRlZERhdGEucGhvbmVOdW1iZXJcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB0aGlzLmxvZ2luQnlXZWl4aW4oKVxuICAgICAgfSlcbiAgICB9XG4gIH07XG4gIGxvZ2luQnlXZWl4aW4oKSB7XG4gICAgd3hMb2dpbih7XG4gICAgICBvcGVuX2lkOiB0aGlzLm9wZW5faWQsXG4gICAgICBuaWNrbmFtZTogdGhpcy5uaWNrbmFtZSxcbiAgICAgIGhlYWRfaW1nOiB0aGlzLmhlYWRfaW1nLFxuICAgICAgc2V4OiB0aGlzLnNleCxcbiAgICAgIGF1dGhfaWQ6IHRoaXMudW5pb25pZCxcbiAgICAgIHd4YXBwX3Rva2VuOiB0aGlzLnd4dG9rZW4sXG4gICAgICBtb2JpbGU6IHRoaXMucGhvbmVcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgIGxldCBtZW1iZXJJbmZvID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuICAgICAgbWVtYmVySW5mbyA9IHtcbiAgICAgICAgbWVtYmVyX2lkOiBkYXRhLm1lbWJlcl9pZCxcbiAgICAgICAgbWVtYmVyX3Rva2VuOiBkYXRhLm1lbWJlcl90b2tlbixcbiAgICAgICAgcGhvbmU6IHRoaXMucGhvbmUsXG4gICAgICAgIG5pY2tuYW1lOiB0aGlzLm5pY2tuYW1lLFxuICAgICAgICBhdmF0YXI6IHRoaXMuaGVhZF9pbWdcbiAgICAgIH1cbiAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJywgbWVtYmVySW5mbylcbiAgICAgIGlmICh0aGlzLmpvaW5LZXkpIHtcbiAgICAgICAgd3gucmVMYXVuY2goe1xuICAgICAgICAgIHVybDogYGpvaW5DbGFzcz9jbGFzc0lkPSR7dGhpcy5jbGFzc0lkfSZuYW1lPSR7dGhpcy5uYW1lfSZrZXk9JHt0aGlzLmpvaW5LZXl9YFxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd3gucmVMYXVuY2goe1xuICAgICAgICAgIHVybDogJ2NsYXNzTGlzdCdcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIG9uTG9hZChlKSB7XG4gICAgdGhpcy5qb2luS2V5ID0gZS5rZXlcbiAgICB0aGlzLmNsYXNzSWQgPSBlLmNsYXNzSWRcbiAgICB0aGlzLm5hbWUgPSBlLm5hbWVcbiAgICB0aGlzLiRhcHBseSgpXG4gICAgd3gubG9naW4oe1xuICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgbGV0IG9sZF93eGFwcF90b2tlbiA9IHd4LmdldFN0b3JhZ2VTeW5jKCd3eHRva2VuJylcbiAgICAgICAgZ2V0U2Vzc2lvbktleSh7XG4gICAgICAgICAgY29kZTogcmVzLmNvZGUsXG4gICAgICAgICAgb2xkX3d4YXBwX3Rva2VuOiBvbGRfd3hhcHBfdG9rZW5cbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGFcbiAgICAgICAgICB0aGlzLnVuaW9uaWQgPSBkYXRhLnVuaW9uaWQgPyBkYXRhLnVuaW9uaWQgOiAnJ1xuICAgICAgICAgIHRoaXMud3h0b2tlbiA9IGRhdGEud3hhcHBfdG9rZW5cbiAgICAgICAgICB0aGlzLm9wZW5pZCA9IGRhdGEub3BlbmlkXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCd3eHRva2VuJywgdGhpcy53eHRva2VuKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cbiJdfQ==