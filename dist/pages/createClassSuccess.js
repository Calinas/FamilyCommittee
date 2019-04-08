'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var bindRelationship = function (_wepy$page) {
  _inherits(bindRelationship, _wepy$page);

  function bindRelationship() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, bindRelationship);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = bindRelationship.__proto__ || Object.getPrototypeOf(bindRelationship)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '创建班级成功'
    }, _this.data = {
      parentIndex: -1,
      name: '重庆市第三中学',
      memberInfo: null,
      code: '',
      key: '',
      classId: -1,
      isShare: ''
    }, _this.methods = {
      copyText: function copyText(e) {
        wx.setClipboardData({
          data: this.key,
          success: function success(res) {
            wx.getClipboardData({
              success: function success(res) {
                wx.showToast({
                  title: '复制成功'
                });
              }
            });
          }
        });
      },
      back: function back() {
        wx.switchTab({ url: 'zone' });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(bindRelationship, [{
    key: 'onShareAppMessage',
    value: function onShareAppMessage(res) {
      return {
        title: this.memberInfo.nickname + '\u9080\u8BF7\u60A8\u52A0\u5165\u5BB6\u59D4\u4F1A\u73ED\u7EA7,\u9A8C\u8BC1\u7801\u662F' + this.key,
        path: 'pages/createClassSuccess?classId=' + this.classId + '&name=' + this.name + '&key=' + this.key + '&is_share=true'
      };
    }
  }, {
    key: 'onLoad',
    value: function onLoad(params) {
      // 因为从绑定身份页面进入也有 key,name, classId,所有需要一个is_share
      this.memberInfo = wx.getStorageSync('memberInfo');
      this.name = params.name;
      this.code = params.code;
      this.key = params.key;
      this.classId = params.classId;
      this.isShare = params.is_share;
      if (this.isShare && !this.memberInfo.member_id) {
        // 如果是从分享链接进入且没有注册，先走注册流程
        wx.redirectTo({
          url: 'login?classId=' + this.classId + '&name=' + this.name + '&key=' + this.key
        });
      } else if (this.isShare && this.memberInfo.member_id) {
        wx.redirectTo({
          url: 'joinClass?classId=' + this.classId + '&name=' + this.name + '&key=' + this.key
        });
      }
      this.$apply();
    }
  }]);

  return bindRelationship;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(bindRelationship , 'pages/createClassSuccess'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZUNsYXNzU3VjY2Vzcy5qcyJdLCJuYW1lcyI6WyJiaW5kUmVsYXRpb25zaGlwIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJwYXJlbnRJbmRleCIsIm5hbWUiLCJtZW1iZXJJbmZvIiwiY29kZSIsImtleSIsImNsYXNzSWQiLCJpc1NoYXJlIiwibWV0aG9kcyIsImNvcHlUZXh0IiwiZSIsInd4Iiwic2V0Q2xpcGJvYXJkRGF0YSIsInN1Y2Nlc3MiLCJyZXMiLCJnZXRDbGlwYm9hcmREYXRhIiwic2hvd1RvYXN0IiwidGl0bGUiLCJiYWNrIiwic3dpdGNoVGFiIiwidXJsIiwibmlja25hbWUiLCJwYXRoIiwicGFyYW1zIiwiZ2V0U3RvcmFnZVN5bmMiLCJpc19zaGFyZSIsIm1lbWJlcl9pZCIsInJlZGlyZWN0VG8iLCIkYXBwbHkiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsZ0I7Ozs7Ozs7Ozs7Ozs7OzBNQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxtQkFBYSxDQUFDLENBRFQ7QUFFTEMsWUFBTSxTQUZEO0FBR0xDLGtCQUFZLElBSFA7QUFJTEMsWUFBTSxFQUpEO0FBS0xDLFdBQUssRUFMQTtBQU1MQyxlQUFTLENBQUMsQ0FOTDtBQU9MQyxlQUFTO0FBUEosSyxRQVNQQyxPLEdBQVU7QUFDUkMsY0FEUSxvQkFDQ0MsQ0FERCxFQUNJO0FBQ1ZDLFdBQUdDLGdCQUFILENBQW9CO0FBQ2xCWixnQkFBTSxLQUFLSyxHQURPO0FBRWxCUSxtQkFBUyxpQkFBVUMsR0FBVixFQUFlO0FBQ3RCSCxlQUFHSSxnQkFBSCxDQUFvQjtBQUNsQkYsdUJBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUN0QkgsbUJBQUdLLFNBQUgsQ0FBYTtBQUNYQyx5QkFBTztBQURJLGlCQUFiO0FBR0Q7QUFMaUIsYUFBcEI7QUFPRDtBQVZpQixTQUFwQjtBQVlELE9BZE87QUFlUkMsVUFmUSxrQkFlRDtBQUNMUCxXQUFHUSxTQUFILENBQWEsRUFBRUMsS0FBSyxNQUFQLEVBQWI7QUFDRDtBQWpCTyxLOzs7OztzQ0FtQlFOLEcsRUFBSztBQUNyQixhQUFPO0FBQ0xHLGVBQVUsS0FBS2QsVUFBTCxDQUFnQmtCLFFBQTFCLDZGQUFvRCxLQUFLaEIsR0FEcEQ7QUFFTGlCLG9EQUEwQyxLQUFLaEIsT0FBL0MsY0FBK0QsS0FBS0osSUFBcEUsYUFBZ0YsS0FBS0csR0FBckY7QUFGSyxPQUFQO0FBSUQ7OzsyQkFDTWtCLE0sRUFBUTtBQUNiO0FBQ0EsV0FBS3BCLFVBQUwsR0FBa0JRLEdBQUdhLGNBQUgsQ0FBa0IsWUFBbEIsQ0FBbEI7QUFDQSxXQUFLdEIsSUFBTCxHQUFZcUIsT0FBT3JCLElBQW5CO0FBQ0EsV0FBS0UsSUFBTCxHQUFZbUIsT0FBT25CLElBQW5CO0FBQ0EsV0FBS0MsR0FBTCxHQUFXa0IsT0FBT2xCLEdBQWxCO0FBQ0EsV0FBS0MsT0FBTCxHQUFlaUIsT0FBT2pCLE9BQXRCO0FBQ0EsV0FBS0MsT0FBTCxHQUFlZ0IsT0FBT0UsUUFBdEI7QUFDQSxVQUFJLEtBQUtsQixPQUFMLElBQWdCLENBQUMsS0FBS0osVUFBTCxDQUFnQnVCLFNBQXJDLEVBQWdEO0FBQzlDO0FBQ0FmLFdBQUdnQixVQUFILENBQWM7QUFDWlAsa0NBQXNCLEtBQUtkLE9BQTNCLGNBQTJDLEtBQUtKLElBQWhELGFBQTRELEtBQUtHO0FBRHJELFNBQWQ7QUFHRCxPQUxELE1BS08sSUFBSSxLQUFLRSxPQUFMLElBQWdCLEtBQUtKLFVBQUwsQ0FBZ0J1QixTQUFwQyxFQUErQztBQUNwRGYsV0FBR2dCLFVBQUgsQ0FBYztBQUNaUCxzQ0FBMEIsS0FBS2QsT0FBL0IsY0FBK0MsS0FBS0osSUFBcEQsYUFBZ0UsS0FBS0c7QUFEekQsU0FBZDtBQUdEO0FBQ0QsV0FBS3VCLE1BQUw7QUFDRDs7OztFQXpEMkNDLGVBQUtDLEk7O2tCQUE5QmpDLGdCIiwiZmlsZSI6ImNyZWF0ZUNsYXNzU3VjY2Vzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBiaW5kUmVsYXRpb25zaGlwIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Yib5bu654+t57qn5oiQ5YqfJ1xyXG4gIH1cclxuICBkYXRhID0ge1xyXG4gICAgcGFyZW50SW5kZXg6IC0xLFxyXG4gICAgbmFtZTogJ+mHjeW6huW4guesrOS4ieS4reWtpicsXHJcbiAgICBtZW1iZXJJbmZvOiBudWxsLFxyXG4gICAgY29kZTogJycsXHJcbiAgICBrZXk6ICcnLFxyXG4gICAgY2xhc3NJZDogLTEsXHJcbiAgICBpc1NoYXJlOiAnJ1xyXG4gIH1cclxuICBtZXRob2RzID0ge1xyXG4gICAgY29weVRleHQoZSkge1xyXG4gICAgICB3eC5zZXRDbGlwYm9hcmREYXRhKHtcclxuICAgICAgICBkYXRhOiB0aGlzLmtleSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICB3eC5nZXRDbGlwYm9hcmREYXRhKHtcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+WkjeWItuaIkOWKnydcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBiYWNrKCkge1xyXG4gICAgICB3eC5zd2l0Y2hUYWIoeyB1cmw6ICd6b25lJyB9KVxyXG4gICAgfVxyXG4gIH1cclxuICBvblNoYXJlQXBwTWVzc2FnZShyZXMpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRpdGxlOiBgJHt0aGlzLm1lbWJlckluZm8ubmlja25hbWV96YKA6K+35oKo5Yqg5YWl5a625aeU5Lya54+t57qnLOmqjOivgeeggeaYryR7dGhpcy5rZXl9YCxcclxuICAgICAgcGF0aDogYHBhZ2VzL2NyZWF0ZUNsYXNzU3VjY2Vzcz9jbGFzc0lkPSR7dGhpcy5jbGFzc0lkfSZuYW1lPSR7dGhpcy5uYW1lfSZrZXk9JHt0aGlzLmtleX0maXNfc2hhcmU9dHJ1ZWBcclxuICAgIH1cclxuICB9XHJcbiAgb25Mb2FkKHBhcmFtcykge1xyXG4gICAgLy8g5Zug5Li65LuO57uR5a6a6Lqr5Lu96aG16Z2i6L+b5YWl5Lmf5pyJIGtleSxuYW1lLCBjbGFzc0lkLOaJgOaciemcgOimgeS4gOS4qmlzX3NoYXJlXHJcbiAgICB0aGlzLm1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXHJcbiAgICB0aGlzLm5hbWUgPSBwYXJhbXMubmFtZVxyXG4gICAgdGhpcy5jb2RlID0gcGFyYW1zLmNvZGVcclxuICAgIHRoaXMua2V5ID0gcGFyYW1zLmtleVxyXG4gICAgdGhpcy5jbGFzc0lkID0gcGFyYW1zLmNsYXNzSWRcclxuICAgIHRoaXMuaXNTaGFyZSA9IHBhcmFtcy5pc19zaGFyZVxyXG4gICAgaWYgKHRoaXMuaXNTaGFyZSAmJiAhdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCkge1xyXG4gICAgICAvLyDlpoLmnpzmmK/ku47liIbkuqvpk77mjqXov5vlhaXkuJTmsqHmnInms6jlhozvvIzlhYjotbDms6jlhozmtYHnqItcclxuICAgICAgd3gucmVkaXJlY3RUbyh7XHJcbiAgICAgICAgdXJsOiBgbG9naW4/Y2xhc3NJZD0ke3RoaXMuY2xhc3NJZH0mbmFtZT0ke3RoaXMubmFtZX0ma2V5PSR7dGhpcy5rZXl9YFxyXG4gICAgICB9KVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLmlzU2hhcmUgJiYgdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCkge1xyXG4gICAgICB3eC5yZWRpcmVjdFRvKHtcclxuICAgICAgICB1cmw6IGBqb2luQ2xhc3M/Y2xhc3NJZD0ke3RoaXMuY2xhc3NJZH0mbmFtZT0ke3RoaXMubmFtZX0ma2V5PSR7dGhpcy5rZXl9YFxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgdGhpcy4kYXBwbHkoKVxyXG4gIH1cclxufVxyXG4iXX0=