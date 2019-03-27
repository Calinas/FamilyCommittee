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
        path: 'pages/createClassSuccess?classId=' + this.classId + '&name=' + this.name + '&key=' + this.key
      };
    }
  }, {
    key: 'onLoad',
    value: function onLoad(params) {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZUNsYXNzU3VjY2Vzcy5qcyJdLCJuYW1lcyI6WyJiaW5kUmVsYXRpb25zaGlwIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJwYXJlbnRJbmRleCIsIm5hbWUiLCJtZW1iZXJJbmZvIiwiY29kZSIsImtleSIsImNsYXNzSWQiLCJpc1NoYXJlIiwibWV0aG9kcyIsImNvcHlUZXh0IiwiZSIsInd4Iiwic2V0Q2xpcGJvYXJkRGF0YSIsInN1Y2Nlc3MiLCJyZXMiLCJnZXRDbGlwYm9hcmREYXRhIiwic2hvd1RvYXN0IiwidGl0bGUiLCJiYWNrIiwic3dpdGNoVGFiIiwidXJsIiwibmlja25hbWUiLCJwYXRoIiwicGFyYW1zIiwiZ2V0U3RvcmFnZVN5bmMiLCJpc19zaGFyZSIsIm1lbWJlcl9pZCIsInJlZGlyZWN0VG8iLCIkYXBwbHkiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsZ0I7Ozs7Ozs7Ozs7Ozs7OzBNQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxtQkFBYSxDQUFDLENBRFQ7QUFFTEMsWUFBTSxTQUZEO0FBR0xDLGtCQUFZLElBSFA7QUFJTEMsWUFBTSxFQUpEO0FBS0xDLFdBQUssRUFMQTtBQU1MQyxlQUFTLENBQUMsQ0FOTDtBQU9MQyxlQUFTO0FBUEosSyxRQVNQQyxPLEdBQVU7QUFDUkMsY0FEUSxvQkFDQ0MsQ0FERCxFQUNJO0FBQ1ZDLFdBQUdDLGdCQUFILENBQW9CO0FBQ2xCWixnQkFBTSxLQUFLSyxHQURPO0FBRWxCUSxtQkFBUyxpQkFBVUMsR0FBVixFQUFlO0FBQ3RCSCxlQUFHSSxnQkFBSCxDQUFvQjtBQUNsQkYsdUJBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUN0QkgsbUJBQUdLLFNBQUgsQ0FBYTtBQUNYQyx5QkFBTztBQURJLGlCQUFiO0FBR0Q7QUFMaUIsYUFBcEI7QUFPRDtBQVZpQixTQUFwQjtBQVlELE9BZE87QUFlUkMsVUFmUSxrQkFlRDtBQUNMUCxXQUFHUSxTQUFILENBQWEsRUFBRUMsS0FBSyxNQUFQLEVBQWI7QUFDRDtBQWpCTyxLOzs7OztzQ0FtQlFOLEcsRUFBSztBQUNyQixhQUFPO0FBQ0xHLGVBQVUsS0FBS2QsVUFBTCxDQUFnQmtCLFFBQTFCLDZGQUFvRCxLQUFLaEIsR0FEcEQ7QUFFTGlCLG9EQUEwQyxLQUFLaEIsT0FBL0MsY0FBK0QsS0FBS0osSUFBcEUsYUFBZ0YsS0FBS0c7QUFGaEYsT0FBUDtBQUlEOzs7MkJBQ01rQixNLEVBQVE7QUFDYixXQUFLcEIsVUFBTCxHQUFrQlEsR0FBR2EsY0FBSCxDQUFrQixZQUFsQixDQUFsQjtBQUNBLFdBQUt0QixJQUFMLEdBQVlxQixPQUFPckIsSUFBbkI7QUFDQSxXQUFLRSxJQUFMLEdBQVltQixPQUFPbkIsSUFBbkI7QUFDQSxXQUFLQyxHQUFMLEdBQVdrQixPQUFPbEIsR0FBbEI7QUFDQSxXQUFLQyxPQUFMLEdBQWVpQixPQUFPakIsT0FBdEI7QUFDQSxXQUFLQyxPQUFMLEdBQWVnQixPQUFPRSxRQUF0QjtBQUNBLFVBQUksS0FBS2xCLE9BQUwsSUFBZ0IsQ0FBQyxLQUFLSixVQUFMLENBQWdCdUIsU0FBckMsRUFBZ0Q7QUFDOUM7QUFDQWYsV0FBR2dCLFVBQUgsQ0FBYztBQUNaUCxrQ0FBc0IsS0FBS2QsT0FBM0IsY0FBMkMsS0FBS0osSUFBaEQsYUFBNEQsS0FBS0c7QUFEckQsU0FBZDtBQUdELE9BTEQsTUFLTyxJQUFJLEtBQUtFLE9BQUwsSUFBZ0IsS0FBS0osVUFBTCxDQUFnQnVCLFNBQXBDLEVBQStDO0FBQ3BEZixXQUFHZ0IsVUFBSCxDQUFjO0FBQ1pQLHNDQUEwQixLQUFLZCxPQUEvQixjQUErQyxLQUFLSixJQUFwRCxhQUFnRSxLQUFLRztBQUR6RCxTQUFkO0FBR0Q7QUFDRCxXQUFLdUIsTUFBTDtBQUNEOzs7O0VBeEQyQ0MsZUFBS0MsSTs7a0JBQTlCakMsZ0IiLCJmaWxlIjoiY3JlYXRlQ2xhc3NTdWNjZXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgYmluZFJlbGF0aW9uc2hpcCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Yib5bu654+t57qn5oiQ5YqfJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgcGFyZW50SW5kZXg6IC0xLFxuICAgIG5hbWU6ICfph43luobluILnrKzkuInkuK3lraYnLFxuICAgIG1lbWJlckluZm86IG51bGwsXG4gICAgY29kZTogJycsXG4gICAga2V5OiAnJyxcbiAgICBjbGFzc0lkOiAtMSxcbiAgICBpc1NoYXJlOiAnJ1xuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgY29weVRleHQoZSkge1xuICAgICAgd3guc2V0Q2xpcGJvYXJkRGF0YSh7XG4gICAgICAgIGRhdGE6IHRoaXMua2V5LFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgd3guZ2V0Q2xpcGJvYXJkRGF0YSh7XG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICflpI3liLbmiJDlip8nXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIGJhY2soKSB7XG4gICAgICB3eC5zd2l0Y2hUYWIoeyB1cmw6ICd6b25lJyB9KVxuICAgIH1cbiAgfVxuICBvblNoYXJlQXBwTWVzc2FnZShyZXMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6IGAke3RoaXMubWVtYmVySW5mby5uaWNrbmFtZX3pgoDor7fmgqjliqDlhaXlrrblp5TkvJrnj63nuqcs6aqM6K+B56CB5pivJHt0aGlzLmtleX1gLFxuICAgICAgcGF0aDogYHBhZ2VzL2NyZWF0ZUNsYXNzU3VjY2Vzcz9jbGFzc0lkPSR7dGhpcy5jbGFzc0lkfSZuYW1lPSR7dGhpcy5uYW1lfSZrZXk9JHt0aGlzLmtleX1gXG4gICAgfVxuICB9XG4gIG9uTG9hZChwYXJhbXMpIHtcbiAgICB0aGlzLm1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXG4gICAgdGhpcy5uYW1lID0gcGFyYW1zLm5hbWVcbiAgICB0aGlzLmNvZGUgPSBwYXJhbXMuY29kZVxuICAgIHRoaXMua2V5ID0gcGFyYW1zLmtleVxuICAgIHRoaXMuY2xhc3NJZCA9IHBhcmFtcy5jbGFzc0lkXG4gICAgdGhpcy5pc1NoYXJlID0gcGFyYW1zLmlzX3NoYXJlXG4gICAgaWYgKHRoaXMuaXNTaGFyZSAmJiAhdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCkge1xuICAgICAgLy8g5aaC5p6c5piv5LuO5YiG5Lqr6ZO+5o6l6L+b5YWl5LiU5rKh5pyJ5rOo5YaM77yM5YWI6LWw5rOo5YaM5rWB56iLXG4gICAgICB3eC5yZWRpcmVjdFRvKHtcbiAgICAgICAgdXJsOiBgbG9naW4/Y2xhc3NJZD0ke3RoaXMuY2xhc3NJZH0mbmFtZT0ke3RoaXMubmFtZX0ma2V5PSR7dGhpcy5rZXl9YFxuICAgICAgfSlcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNTaGFyZSAmJiB0aGlzLm1lbWJlckluZm8ubWVtYmVyX2lkKSB7XG4gICAgICB3eC5yZWRpcmVjdFRvKHtcbiAgICAgICAgdXJsOiBgam9pbkNsYXNzP2NsYXNzSWQ9JHt0aGlzLmNsYXNzSWR9Jm5hbWU9JHt0aGlzLm5hbWV9JmtleT0ke3RoaXMua2V5fWBcbiAgICAgIH0pXG4gICAgfVxuICAgIHRoaXMuJGFwcGx5KClcbiAgfVxufVxuIl19