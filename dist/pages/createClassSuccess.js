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
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(bindRelationship, [{
    key: 'onShareAppMessage',
    value: function onShareAppMessage(res) {
      return {
        title: this.memberInfo.nickname + '\u9080\u8BF7\u60A8\u4E00\u8D77\u52A0\u5165' + this.name,
        path: 'pages/createClassSuccess?classId=' + this.classId + '&name=' + this.name + '&key=' + this.key + '&is_share=true'
      };
    }
  }, {
    key: 'onLoad',
    value: function onLoad(params) {
      console.log(params);
      this.memberInfo = wx.getStorageSync('memberInfo');
      this.name = params.name;
      this.code = params.code;
      this.key = params.key;
      this.classId = params.classId;
      this.isShare = params.is_share;
      if (this.isShare && !this.memberInfo.member_id) {
        // 如果是从分享链接进入且没有注册，先走注册流程
        wx.redirectTo({
          url: 'login?key=' + this.key
        });
      } else if (this.isShare && this.memberInfo.member_id) {
        wx.navigateTo({
          url: 'joinClass?classId=' + this.classId + '&name=' + this.name + '&key=' + this.key
        });
      }
      this.$apply();
    }
  }]);

  return bindRelationship;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(bindRelationship , 'pages/createClassSuccess'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZUNsYXNzU3VjY2Vzcy5qcyJdLCJuYW1lcyI6WyJiaW5kUmVsYXRpb25zaGlwIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJwYXJlbnRJbmRleCIsIm5hbWUiLCJtZW1iZXJJbmZvIiwiY29kZSIsImtleSIsImNsYXNzSWQiLCJpc1NoYXJlIiwibWV0aG9kcyIsImNvcHlUZXh0IiwiZSIsInd4Iiwic2V0Q2xpcGJvYXJkRGF0YSIsInN1Y2Nlc3MiLCJyZXMiLCJnZXRDbGlwYm9hcmREYXRhIiwic2hvd1RvYXN0IiwidGl0bGUiLCJuaWNrbmFtZSIsInBhdGgiLCJwYXJhbXMiLCJjb25zb2xlIiwibG9nIiwiZ2V0U3RvcmFnZVN5bmMiLCJpc19zaGFyZSIsIm1lbWJlcl9pZCIsInJlZGlyZWN0VG8iLCJ1cmwiLCJuYXZpZ2F0ZVRvIiwiJGFwcGx5Iiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLGdCOzs7Ozs7Ozs7Ozs7OzswTUFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsbUJBQWEsQ0FBQyxDQURUO0FBRUxDLFlBQU0sU0FGRDtBQUdMQyxrQkFBWSxJQUhQO0FBSUxDLFlBQU0sRUFKRDtBQUtMQyxXQUFLLEVBTEE7QUFNTEMsZUFBUyxDQUFDLENBTkw7QUFPTEMsZUFBUztBQVBKLEssUUFTUEMsTyxHQUFVO0FBQ1JDLGNBRFEsb0JBQ0NDLENBREQsRUFDSTtBQUNWQyxXQUFHQyxnQkFBSCxDQUFvQjtBQUNsQlosZ0JBQU0sS0FBS0ssR0FETztBQUVsQlEsbUJBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUN0QkgsZUFBR0ksZ0JBQUgsQ0FBb0I7QUFDbEJGLHVCQUFTLGlCQUFVQyxHQUFWLEVBQWU7QUFDdEJILG1CQUFHSyxTQUFILENBQWE7QUFDWEMseUJBQU87QUFESSxpQkFBYjtBQUdEO0FBTGlCLGFBQXBCO0FBT0Q7QUFWaUIsU0FBcEI7QUFZRDtBQWRPLEs7Ozs7O3NDQWdCUUgsRyxFQUFLO0FBQ3JCLGFBQU87QUFDTEcsZUFBVSxLQUFLZCxVQUFMLENBQWdCZSxRQUExQixrREFBNEMsS0FBS2hCLElBRDVDO0FBRUxpQixvREFBMEMsS0FBS2IsT0FBL0MsY0FBK0QsS0FBS0osSUFBcEUsYUFBZ0YsS0FBS0csR0FBckY7QUFGSyxPQUFQO0FBSUQ7OzsyQkFDTWUsTSxFQUFRO0FBQ2JDLGNBQVFDLEdBQVIsQ0FBWUYsTUFBWjtBQUNBLFdBQUtqQixVQUFMLEdBQWtCUSxHQUFHWSxjQUFILENBQWtCLFlBQWxCLENBQWxCO0FBQ0EsV0FBS3JCLElBQUwsR0FBWWtCLE9BQU9sQixJQUFuQjtBQUNBLFdBQUtFLElBQUwsR0FBWWdCLE9BQU9oQixJQUFuQjtBQUNBLFdBQUtDLEdBQUwsR0FBV2UsT0FBT2YsR0FBbEI7QUFDQSxXQUFLQyxPQUFMLEdBQWVjLE9BQU9kLE9BQXRCO0FBQ0EsV0FBS0MsT0FBTCxHQUFlYSxPQUFPSSxRQUF0QjtBQUNBLFVBQUksS0FBS2pCLE9BQUwsSUFBZ0IsQ0FBQyxLQUFLSixVQUFMLENBQWdCc0IsU0FBckMsRUFBZ0Q7QUFDOUM7QUFDQWQsV0FBR2UsVUFBSCxDQUFjO0FBQ1pDLDhCQUFrQixLQUFLdEI7QUFEWCxTQUFkO0FBR0QsT0FMRCxNQUtPLElBQUcsS0FBS0UsT0FBTCxJQUFnQixLQUFLSixVQUFMLENBQWdCc0IsU0FBbkMsRUFBNkM7QUFDbERkLFdBQUdpQixVQUFILENBQWM7QUFDWkQsc0NBQTBCLEtBQUtyQixPQUEvQixjQUErQyxLQUFLSixJQUFwRCxhQUFnRSxLQUFLRztBQUR6RCxTQUFkO0FBR0Q7QUFDRCxXQUFLd0IsTUFBTDtBQUNEOzs7O0VBdEQyQ0MsZUFBS0MsSTs7a0JBQTlCbEMsZ0IiLCJmaWxlIjoiY3JlYXRlQ2xhc3NTdWNjZXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGJpbmRSZWxhdGlvbnNoaXAgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfliJvlu7rnj63nuqfmiJDlip8nXHJcbiAgfVxyXG4gIGRhdGEgPSB7XHJcbiAgICBwYXJlbnRJbmRleDogLTEsXHJcbiAgICBuYW1lOiAn6YeN5bqG5biC56ys5LiJ5Lit5a2mJyxcclxuICAgIG1lbWJlckluZm86IG51bGwsXHJcbiAgICBjb2RlOiAnJyxcclxuICAgIGtleTogJycsXHJcbiAgICBjbGFzc0lkOiAtMSxcclxuICAgIGlzU2hhcmU6ICcnXHJcbiAgfVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBjb3B5VGV4dChlKSB7XHJcbiAgICAgIHd4LnNldENsaXBib2FyZERhdGEoe1xyXG4gICAgICAgIGRhdGE6IHRoaXMua2V5LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgIHd4LmdldENsaXBib2FyZERhdGEoe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn5aSN5Yi25oiQ5YqfJ1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuICBvblNoYXJlQXBwTWVzc2FnZShyZXMpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRpdGxlOiBgJHt0aGlzLm1lbWJlckluZm8ubmlja25hbWV96YKA6K+35oKo5LiA6LW35Yqg5YWlJHt0aGlzLm5hbWV9YCxcclxuICAgICAgcGF0aDogYHBhZ2VzL2NyZWF0ZUNsYXNzU3VjY2Vzcz9jbGFzc0lkPSR7dGhpcy5jbGFzc0lkfSZuYW1lPSR7dGhpcy5uYW1lfSZrZXk9JHt0aGlzLmtleX0maXNfc2hhcmU9dHJ1ZWBcclxuICAgIH1cclxuICB9XHJcbiAgb25Mb2FkKHBhcmFtcykge1xyXG4gICAgY29uc29sZS5sb2cocGFyYW1zKVxyXG4gICAgdGhpcy5tZW1iZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nKVxyXG4gICAgdGhpcy5uYW1lID0gcGFyYW1zLm5hbWVcclxuICAgIHRoaXMuY29kZSA9IHBhcmFtcy5jb2RlXHJcbiAgICB0aGlzLmtleSA9IHBhcmFtcy5rZXlcclxuICAgIHRoaXMuY2xhc3NJZCA9IHBhcmFtcy5jbGFzc0lkXHJcbiAgICB0aGlzLmlzU2hhcmUgPSBwYXJhbXMuaXNfc2hhcmVcclxuICAgIGlmICh0aGlzLmlzU2hhcmUgJiYgIXRoaXMubWVtYmVySW5mby5tZW1iZXJfaWQpIHtcclxuICAgICAgLy8g5aaC5p6c5piv5LuO5YiG5Lqr6ZO+5o6l6L+b5YWl5LiU5rKh5pyJ5rOo5YaM77yM5YWI6LWw5rOo5YaM5rWB56iLXHJcbiAgICAgIHd4LnJlZGlyZWN0VG8oe1xyXG4gICAgICAgIHVybDogYGxvZ2luP2tleT0ke3RoaXMua2V5fWBcclxuICAgICAgfSlcclxuICAgIH0gZWxzZSBpZih0aGlzLmlzU2hhcmUgJiYgdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCl7XHJcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgIHVybDogYGpvaW5DbGFzcz9jbGFzc0lkPSR7dGhpcy5jbGFzc0lkfSZuYW1lPSR7dGhpcy5uYW1lfSZrZXk9JHt0aGlzLmtleX1gXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICB0aGlzLiRhcHBseSgpXHJcbiAgfVxyXG59XHJcbiJdfQ==