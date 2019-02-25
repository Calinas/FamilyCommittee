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
          wx.navigateTo({
            url: 'joinClass?classId=' + _this4.classId + '&name=' + _this4.name + '&key=' + _this4.key
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbImxvZ2luIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ1bmlvbmlkIiwid3h0b2tlbiIsIm9wZW5pZCIsInNob3dfbGF5Iiwibmlja25hbWUiLCJzZXgiLCJoZWFkX2ltZyIsInBob25lIiwib3Blbl9pZCIsImpvaW5LZXkiLCJjbGFzc0lkIiwibmFtZSIsIm1ldGhvZHMiLCJnZXRVc2VySW5mbyIsImUiLCJkZXRhaWwiLCJlbmNyeXB0ZWREYXRhIiwiaXYiLCJ3eGFwcF90b2tlbiIsInRoZW4iLCJyZXMiLCJkZWNyeXB0ZWREYXRhIiwidW5pb25JZCIsIm5pY2tOYW1lIiwiZ2VuZGVyIiwiYXZhdGFyVXJsIiwib3BlbklkIiwiJGFwcGx5IiwiZ2V0UGhvbmVOdW1iZXIiLCJwaG9uZU51bWJlciIsImxvZ2luQnlXZWl4aW4iLCJhdXRoX2lkIiwibW9iaWxlIiwibWVtYmVySW5mbyIsIk9iamVjdCIsImNyZWF0ZSIsIm1lbWJlcl9pZCIsIm1lbWJlcl90b2tlbiIsImF2YXRhciIsInd4Iiwic2V0U3RvcmFnZVN5bmMiLCJuYXZpZ2F0ZVRvIiwidXJsIiwia2V5IiwicmVMYXVuY2giLCJzdWNjZXNzIiwib2xkX3d4YXBwX3Rva2VuIiwiZ2V0U3RvcmFnZVN5bmMiLCJjb2RlIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUdBOzs7O0FBQ0E7Ozs7Ozs7OztBQUhBO0FBQ0E7OztJQUdxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLGVBQVMsRUFESjtBQUVMQyxlQUFTLEVBRko7QUFHTEMsY0FBUSxFQUhIO0FBSUxDLGdCQUFVLEtBSkw7QUFLTEMsZ0JBQVUsSUFMTDtBQU1MQyxXQUFLLEVBTkE7QUFPTEMsZ0JBQVUsRUFQTDtBQVFMQyxhQUFPLEVBUkY7QUFTTEMsZUFBUyxFQVRKO0FB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V0FBZCxFQUdHM0IsSUFISCxDQUdRLGVBQU87QUFDYixnQkFBSXBCLE9BQU9xQixJQUFJckIsSUFBZjtBQUNBLG1CQUFLQyxPQUFMLEdBQWVELEtBQUtDLE9BQUwsR0FBZUQsS0FBS0MsT0FBcEIsR0FBOEIsRUFBN0M7QUFDQSxtQkFBS0MsT0FBTCxHQUFlRixLQUFLbUIsV0FBcEI7QUFDQSxtQkFBS2hCLE1BQUwsR0FBY0gsS0FBS0csTUFBbkI7QUFDQSxtQkFBS3lCLE1BQUw7QUFDQVksZUFBR0MsY0FBSCxDQUFrQixTQUFsQixFQUE2QixPQUFLdkMsT0FBbEM7QUFDRCxXQVZEO0FBV0Q7QUFkTSxPQUFUO0FBZ0JEOzs7O0VBcEdnQ2dELGVBQUtDLEk7O2tCQUFuQnRELEsiLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLy8g5aaC5p6c55u05o6l5ou/5Yiw5LqGdW5pb25faWQs6YKjIG5pY2tuYW1lLOi/meS6m+aYr+S7gOS5iOaXtuWAmeaLv+WIsOeahO+8n1xyXG4vL+aKpemUmeS/oeaBr+WlveWDj+ayoeWkhOeQhlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgeyBnZXRTZXNzaW9uS2V5LCBkZWNyeXB0RGF0YSwgd3hMb2dpbiB9IGZyb20gJy4uL2FwaS9sb2dpbidcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgbG9naW4gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnmbvlvZUnXHJcbiAgfTtcclxuICBkYXRhID0ge1xyXG4gICAgdW5pb25pZDogJycsXHJcbiAgICB3eHRva2VuOiAnJyxcclxuICAgIG9wZW5pZDogJycsXHJcbiAgICBzaG93X2xheTogZmFsc2UsXHJcbiAgICBuaWNrbmFtZTogJ+eUqOaItycsXHJcbiAgICBzZXg6ICcnLFxyXG4gICAgaGVhZF9pbWc6ICcnLFxyXG4gICAgcGhvbmU6ICcnLFxyXG4gICAgb3Blbl9pZDogJycsXHJcbiAgICBqb2luS2V5OiAnJyxcclxuICAgIGNsYXNzSWQ6IC0xLFxyXG4gICAgbmFtZTogJydcclxuICB9O1xyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBnZXRVc2VySW5mbyhlKSB7XHJcbiAgICAgIGNvbnN0IGRldGFpbCA9IGUuZGV0YWlsXHJcbiAgICAgIGRlY3J5cHREYXRhKHtcclxuICAgICAgICBlbmNyeXB0ZWREYXRhOiBkZXRhaWwuZW5jcnlwdGVkRGF0YSxcclxuICAgICAgICBpdjogZGV0YWlsLml2LFxyXG4gICAgICAgIHd4YXBwX3Rva2VuOiB0aGlzLnd4dG9rZW5cclxuICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGEuZGVjcnlwdGVkRGF0YVxyXG4gICAgICAgIHRoaXMudW5pb25pZCA9IGRhdGEudW5pb25JZFxyXG4gICAgICAgIHRoaXMubmlja25hbWUgPSBkYXRhLm5pY2tOYW1lXHJcbiAgICAgICAgdGhpcy5zZXggPSBkYXRhLmdlbmRlclxyXG4gICAgICAgIHRoaXMuaGVhZF9pbWcgPSBkYXRhLmF2YXRhclVybFxyXG4gICAgICAgIHRoaXMuc2hvd19sYXkgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5vcGVuX2lkID0gZGF0YS5vcGVuSWRcclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZ2V0UGhvbmVOdW1iZXIoZSkge1xyXG4gICAgICBjb25zdCBkZXRhaWwgPSBlLmRldGFpbFxyXG4gICAgICBkZWNyeXB0RGF0YSh7XHJcbiAgICAgICAgZW5jcnlwdGVkRGF0YTogZGV0YWlsLmVuY3J5cHRlZERhdGEsXHJcbiAgICAgICAgaXY6IGRldGFpbC5pdixcclxuICAgICAgICB3eGFwcF90b2tlbjogdGhpcy53eHRva2VuXHJcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICB0aGlzLnBob25lID0gcmVzLmRhdGEuZGVjcnlwdGVkRGF0YS5waG9uZU51bWJlclxyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB0aGlzLmxvZ2luQnlXZWl4aW4oKVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH07XHJcbiAgbG9naW5CeVdlaXhpbigpIHtcclxuICAgIHd4TG9naW4oe1xyXG4gICAgICBvcGVuX2lkOiB0aGlzLm9wZW5faWQsXHJcbiAgICAgIG5pY2tuYW1lOiB0aGlzLm5pY2tuYW1lLFxyXG4gICAgICBoZWFkX2ltZzogdGhpcy5oZWFkX2ltZyxcclxuICAgICAgc2V4OiB0aGlzLnNleCxcclxuICAgICAgYXV0aF9pZDogdGhpcy51bmlvbmlkLFxyXG4gICAgICB3eGFwcF90b2tlbjogdGhpcy53eHRva2VuLFxyXG4gICAgICBtb2JpbGU6IHRoaXMucGhvbmVcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YS5kYXRhXHJcbiAgICAgIGxldCBtZW1iZXJJbmZvID0gT2JqZWN0LmNyZWF0ZShudWxsKVxyXG4gICAgICBtZW1iZXJJbmZvID0ge1xyXG4gICAgICAgIG1lbWJlcl9pZDogZGF0YS5tZW1iZXJfaWQsXHJcbiAgICAgICAgbWVtYmVyX3Rva2VuOiBkYXRhLm1lbWJlcl90b2tlbixcclxuICAgICAgICBwaG9uZTogdGhpcy5waG9uZSxcclxuICAgICAgICBuaWNrbmFtZTogdGhpcy5uaWNrbmFtZSxcclxuICAgICAgICBhdmF0YXI6IHRoaXMuaGVhZF9pbWdcclxuICAgICAgfVxyXG4gICAgICB3eC5zZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycsIG1lbWJlckluZm8pXHJcbiAgICAgIGlmICh0aGlzLmpvaW5LZXkpIHtcclxuICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgIHVybDogYGpvaW5DbGFzcz9jbGFzc0lkPSR7dGhpcy5jbGFzc0lkfSZuYW1lPSR7dGhpcy5uYW1lfSZrZXk9JHt0aGlzLmtleX1gXHJcbiAgICAgICAgfSlcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB3eC5yZUxhdW5jaCh7XHJcbiAgICAgICAgICB1cmw6ICdjbGFzc0xpc3QnXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbiAgb25Mb2FkKGUpIHtcclxuICAgIHRoaXMuam9pbktleSA9IGUua2V5XHJcbiAgICB0aGlzLmNsYXNzSWQgPSBlLmNsYXNzSWRcclxuICAgIHRoaXMubmFtZSA9IGUubmFtZVxyXG4gICAgd3gubG9naW4oe1xyXG4gICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgIGxldCBvbGRfd3hhcHBfdG9rZW4gPSB3eC5nZXRTdG9yYWdlU3luYygnd3h0b2tlbicpXHJcbiAgICAgICAgZ2V0U2Vzc2lvbktleSh7XHJcbiAgICAgICAgICBjb2RlOiByZXMuY29kZSxcclxuICAgICAgICAgIG9sZF93eGFwcF90b2tlbjogb2xkX3d4YXBwX3Rva2VuXHJcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YVxyXG4gICAgICAgICAgdGhpcy51bmlvbmlkID0gZGF0YS51bmlvbmlkID8gZGF0YS51bmlvbmlkIDogJydcclxuICAgICAgICAgIHRoaXMud3h0b2tlbiA9IGRhdGEud3hhcHBfdG9rZW5cclxuICAgICAgICAgIHRoaXMub3BlbmlkID0gZGF0YS5vcGVuaWRcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCd3eHRva2VuJywgdGhpcy53eHRva2VuKVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG59XHJcbiJdfQ==