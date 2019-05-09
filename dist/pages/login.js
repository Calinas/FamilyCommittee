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
        if (this.testPhone !== 1234567890 || this.testCode !== 123456) {
          (0, _common.showMsg)('请填写正确的账户信息');
          return;
        }
        var memberInfo = Object.create(null);
        memberInfo = {
          member_id: -1
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbImxvZ2luIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ1bmlvbmlkIiwid3h0b2tlbiIsIm9wZW5pZCIsInNob3dfbGF5Iiwibmlja25hbWUiLCJzZXgiLCJoZWFkX2ltZyIsInBob25lIiwib3Blbl9pZCIsImpvaW5LZXkiLCJjbGFzc0lkIiwibmFtZSIsIm1ldGhvZHMiLCJiaW5kVGVzdCIsImUiLCJjdXJyZW50VGFyZ2V0IiwiaWQiLCJOdW1iZXIiLCJkZXRhaWwiLCJ2YWx1ZSIsIiRhcHBseSIsImxvZ2luVGVzdCIsInRlc3RQaG9uZSIsInRlc3RDb2RlIiwibWVtYmVySW5mbyIsIk9iamVjdCIsImNyZWF0ZSIsIm1lbWJlcl9pZCIsInd4Iiwic2V0U3RvcmFnZVN5bmMiLCJzd2l0Y2hUYWIiLCJ1cmwiLCJnZXRVc2VySW5mbyIsInJhd0RhdGEiLCJmb3JXZWl4aW5UZXN0IiwiZW5jcnlwdGVkRGF0YSIsIml2Iiwid3hhcHBfdG9rZW4iLCJ0aGVuIiwicmVzIiwiZGVjcnlwdGVkRGF0YSIsInVuaW9uSWQiLCJuaWNrTmFtZSIsImdlbmRlciIsImF2YXRhclVybCIsIm9wZW5JZCIsImdldFBob25lTnVtYmVyIiwicGhvbmVOdW1iZXIiLCJsb2dpbkJ5V2VpeGluIiwiYXV0aF9pZCIsIm1vYmlsZSIsIm1lbWJlcl90b2tlbiIsImF2YXRhciIsInJlTGF1bmNoIiwia2V5Iiwic3VjY2VzcyIsIm9sZF93eGFwcF90b2tlbiIsImdldFN0b3JhZ2VTeW5jIiwiY29kZSIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFHQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7OztBQUpBO0FBQ0E7OztJQUlxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSTtBQUNFQyxlQUFTLEU7QUFDVEMsZUFBUyxFO0FBQ1RDLGNBQVEs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QWY7QUFDQSxtQkFBS0MsT0FBTCxHQUFlRCxLQUFLQyxPQUFMLEdBQWVELEtBQUtDLE9BQXBCLEdBQThCLEVBQTdDO0FBQ0EsbUJBQUtDLE9BQUwsR0FBZUYsS0FBS3NDLFdBQXBCO0FBQ0EsbUJBQUtuQyxNQUFMLEdBQWNILEtBQUtHLE1BQW5CO0FBQ0EsbUJBQUtrQixNQUFMO0FBQ0FRLGVBQUdDLGNBQUgsQ0FBa0IsU0FBbEIsRUFBNkIsT0FBSzVCLE9BQWxDO0FBQ0QsV0FWRDtBQVdEO0FBZE0sT0FBVDtBQWdCRDs7OztFQTFJZ0MwRCxlQUFLQyxJOztrQkFBbkJoRSxLIiwiZmlsZSI6ImxvZ2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vLyDlpoLmnpznm7TmjqXmi7/liLDkuoZ1bmlvbl9pZCzpgqMgbmlja25hbWUs6L+Z5Lqb5piv5LuA5LmI5pe25YCZ5ou/5Yiw55qE77yfXG4vL+aKpemUmeS/oeaBr+WlveWDj+ayoeWkhOeQhlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7IHNob3dNc2cgfSBmcm9tICcuLi91dGlscy9jb21tb24nXG5pbXBvcnQgeyBnZXRTZXNzaW9uS2V5LCBkZWNyeXB0RGF0YSwgd3hMb2dpbiB9IGZyb20gJy4uL2FwaS9sb2dpbidcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGxvZ2luIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnmbvlvZUnXG4gIH07XG4gIGRhdGEgPSB7XG4gICAgdW5pb25pZDogJycsXG4gICAgd3h0b2tlbjogJycsXG4gICAgb3BlbmlkOiAnJyxcbiAgICBzaG93X2xheTogZmFsc2UsXG4gICAgbmlja25hbWU6ICfnlKjmiLcnLFxuICAgIHNleDogJycsXG4gICAgaGVhZF9pbWc6ICcnLFxuICAgIHBob25lOiAnJyxcbiAgICBvcGVuX2lkOiAnJyxcbiAgICBqb2luS2V5OiAnJyxcbiAgICBjbGFzc0lkOiAtMSxcbiAgICBuYW1lOiAnJyxcbiAgICBzaG93X2xheTogZmFsc2UsXG4gICAgZm9yV2VpeGluVGVzdDogZmFsc2UsXG4gICAgdGVzdFBob25lOiAnJyxcbiAgICB0ZXN0Q29kZTogJydcbiAgfTtcbiAgbWV0aG9kcyA9IHtcbiAgICBiaW5kVGVzdChlKSB7XG4gICAgICB0aGlzW2UuY3VycmVudFRhcmdldC5pZF0gPSBOdW1iZXIoZS5kZXRhaWwudmFsdWUpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBsb2dpblRlc3QoKSB7XG4gICAgICAvL+e7meW+ruS/oeW8gOWPkea1i+ivlVxuICAgICAgaWYgKHRoaXMudGVzdFBob25lICE9PSAxMjM0NTY3ODkwIHx8IHRoaXMudGVzdENvZGUgIT09IDEyMzQ1Nikge1xuICAgICAgICBzaG93TXNnKCfor7floavlhpnmraPnoa7nmoTotKbmiLfkv6Hmga8nKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGxldCBtZW1iZXJJbmZvID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuICAgICAgbWVtYmVySW5mbyA9IHtcbiAgICAgICAgbWVtYmVyX2lkOiAtMVxuICAgICAgfVxuICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nLCBtZW1iZXJJbmZvKVxuICAgICAgd3guc3dpdGNoVGFiKHtcbiAgICAgICAgdXJsOiAnY2xhc3NMaXN0J1xuICAgICAgfSlcbiAgICB9LFxuICAgIGdldFVzZXJJbmZvKGUpIHtcbiAgICAgIGNvbnN0IGRldGFpbCA9IGUuZGV0YWlsXG4gICAgICAgIGlmKCFkZXRhaWwucmF3RGF0YSkge1xuICAgICAgICAgIHNob3dNc2coJ+aOiOadg+Wksei0pScpXG4gICAgICAgICAgdGhpcy5mb3JXZWl4aW5UZXN0ID0gdHJ1ZVxuICAgICAgICAgIHRoaXMuc2hvd19sYXkgPSBmYWxzZVxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGRlY3J5cHREYXRhKHtcbiAgICAgICAgZW5jcnlwdGVkRGF0YTogZGV0YWlsLmVuY3J5cHRlZERhdGEsXG4gICAgICAgIGl2OiBkZXRhaWwuaXYsXG4gICAgICAgIHd4YXBwX3Rva2VuOiB0aGlzLnd4dG9rZW5cbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YS5kZWNyeXB0ZWREYXRhXG4gICAgICAgIHRoaXMudW5pb25pZCA9IGRhdGEudW5pb25JZFxuICAgICAgICB0aGlzLm5pY2tuYW1lID0gZGF0YS5uaWNrTmFtZVxuICAgICAgICB0aGlzLnNleCA9IGRhdGEuZ2VuZGVyXG4gICAgICAgIHRoaXMuaGVhZF9pbWcgPSBkYXRhLmF2YXRhclVybFxuICAgICAgICB0aGlzLnNob3dfbGF5ID0gdHJ1ZVxuICAgICAgICB0aGlzLm9wZW5faWQgPSBkYXRhLm9wZW5JZFxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH0sXG4gICAgZ2V0UGhvbmVOdW1iZXIoZSkge1xuICAgICAgY29uc3QgZGV0YWlsID0gZS5kZXRhaWxcbiAgICAgIGlmKCFkZXRhaWwuZW5jcnlwdGVkRGF0YSkge1xuICAgICAgICBzaG93TXNnKCfmjojmnYPlpLHotKUnKVxuICAgICAgICB0aGlzLmZvcldlaXhpblRlc3QgPSB0cnVlXG4gICAgICAgIHRoaXMuc2hvd19sYXkgPSBmYWxzZVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgZGVjcnlwdERhdGEoe1xuICAgICAgICBlbmNyeXB0ZWREYXRhOiBkZXRhaWwuZW5jcnlwdGVkRGF0YSxcbiAgICAgICAgaXY6IGRldGFpbC5pdixcbiAgICAgICAgd3hhcHBfdG9rZW46IHRoaXMud3h0b2tlblxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICB0aGlzLnBob25lID0gcmVzLmRhdGEuZGVjcnlwdGVkRGF0YS5waG9uZU51bWJlclxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIHRoaXMubG9naW5CeVdlaXhpbigpXG4gICAgICB9KVxuICAgIH1cbiAgfTtcbiAgbG9naW5CeVdlaXhpbigpIHtcbiAgICB3eExvZ2luKHtcbiAgICAgIG9wZW5faWQ6IHRoaXMub3Blbl9pZCxcbiAgICAgIG5pY2tuYW1lOiB0aGlzLm5pY2tuYW1lLFxuICAgICAgaGVhZF9pbWc6IHRoaXMuaGVhZF9pbWcsXG4gICAgICBzZXg6IHRoaXMuc2V4LFxuICAgICAgYXV0aF9pZDogdGhpcy51bmlvbmlkLFxuICAgICAgd3hhcHBfdG9rZW46IHRoaXMud3h0b2tlbixcbiAgICAgIG1vYmlsZTogdGhpcy5waG9uZVxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIGxldCBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgbGV0IG1lbWJlckluZm8gPSBPYmplY3QuY3JlYXRlKG51bGwpXG4gICAgICBtZW1iZXJJbmZvID0ge1xuICAgICAgICBtZW1iZXJfaWQ6IGRhdGEubWVtYmVyX2lkLFxuICAgICAgICBtZW1iZXJfdG9rZW46IGRhdGEubWVtYmVyX3Rva2VuLFxuICAgICAgICBwaG9uZTogdGhpcy5waG9uZSxcbiAgICAgICAgbmlja25hbWU6IHRoaXMubmlja25hbWUsXG4gICAgICAgIGF2YXRhcjogdGhpcy5oZWFkX2ltZ1xuICAgICAgfVxuICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nLCBtZW1iZXJJbmZvKVxuICAgICAgaWYgKHRoaXMuam9pbktleSkge1xuICAgICAgICB3eC5yZUxhdW5jaCh7XG4gICAgICAgICAgdXJsOiBgam9pbkNsYXNzP2NsYXNzSWQ9JHt0aGlzLmNsYXNzSWR9Jm5hbWU9JHt0aGlzLm5hbWV9JmtleT0ke3RoaXMuam9pbktleX1gXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3eC5yZUxhdW5jaCh7XG4gICAgICAgICAgdXJsOiAnY2xhc3NMaXN0J1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgb25Mb2FkKGUpIHtcbiAgICB0aGlzLmpvaW5LZXkgPSBlLmtleVxuICAgIHRoaXMuY2xhc3NJZCA9IGUuY2xhc3NJZFxuICAgIHRoaXMubmFtZSA9IGUubmFtZVxuICAgIHRoaXMuJGFwcGx5KClcbiAgICB3eC5sb2dpbih7XG4gICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICBsZXQgb2xkX3d4YXBwX3Rva2VuID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3d4dG9rZW4nKVxuICAgICAgICBnZXRTZXNzaW9uS2V5KHtcbiAgICAgICAgICBjb2RlOiByZXMuY29kZSxcbiAgICAgICAgICBvbGRfd3hhcHBfdG9rZW46IG9sZF93eGFwcF90b2tlblxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YVxuICAgICAgICAgIHRoaXMudW5pb25pZCA9IGRhdGEudW5pb25pZCA/IGRhdGEudW5pb25pZCA6ICcnXG4gICAgICAgICAgdGhpcy53eHRva2VuID0gZGF0YS53eGFwcF90b2tlblxuICAgICAgICAgIHRoaXMub3BlbmlkID0gZGF0YS5vcGVuaWRcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3d4dG9rZW4nLCB0aGlzLnd4dG9rZW4pXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuIl19