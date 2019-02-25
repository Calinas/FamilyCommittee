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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZUNsYXNzU3VjY2Vzcy5qcyJdLCJuYW1lcyI6WyJiaW5kUmVsYXRpb25zaGlwIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJwYXJlbnRJbmRleCIsIm5hbWUiLCJtZW1iZXJJbmZvIiwiY29kZSIsImtleSIsImNsYXNzSWQiLCJpc1NoYXJlIiwibWV0aG9kcyIsImNvcHlUZXh0IiwiZSIsInd4Iiwic2V0Q2xpcGJvYXJkRGF0YSIsInN1Y2Nlc3MiLCJyZXMiLCJnZXRDbGlwYm9hcmREYXRhIiwic2hvd1RvYXN0IiwidGl0bGUiLCJuaWNrbmFtZSIsInBhdGgiLCJwYXJhbXMiLCJnZXRTdG9yYWdlU3luYyIsImlzX3NoYXJlIiwibWVtYmVyX2lkIiwicmVkaXJlY3RUbyIsInVybCIsIiRhcHBseSIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxnQjs7Ozs7Ozs7Ozs7Ozs7ME1BQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLG1CQUFhLENBQUMsQ0FEVDtBQUVMQyxZQUFNLFNBRkQ7QUFHTEMsa0JBQVksSUFIUDtBQUlMQyxZQUFNLEVBSkQ7QUFLTEMsV0FBSyxFQUxBO0FBTUxDLGVBQVMsQ0FBQyxDQU5MO0FBT0xDLGVBQVM7QUFQSixLLFFBU1BDLE8sR0FBVTtBQUNSQyxjQURRLG9CQUNDQyxDQURELEVBQ0k7QUFDVkMsV0FBR0MsZ0JBQUgsQ0FBb0I7QUFDbEJaLGdCQUFNLEtBQUtLLEdBRE87QUFFbEJRLG1CQUFTLGlCQUFVQyxHQUFWLEVBQWU7QUFDdEJILGVBQUdJLGdCQUFILENBQW9CO0FBQ2xCRix1QkFBUyxpQkFBVUMsR0FBVixFQUFlO0FBQ3RCSCxtQkFBR0ssU0FBSCxDQUFhO0FBQ1hDLHlCQUFPO0FBREksaUJBQWI7QUFHRDtBQUxpQixhQUFwQjtBQU9EO0FBVmlCLFNBQXBCO0FBWUQ7QUFkTyxLOzs7OztzQ0FnQlFILEcsRUFBSztBQUNyQixhQUFPO0FBQ0xHLGVBQVUsS0FBS2QsVUFBTCxDQUFnQmUsUUFBMUIsa0RBQTRDLEtBQUtoQixJQUQ1QztBQUVMaUIsb0RBQTBDLEtBQUtiLE9BQS9DLGNBQStELEtBQUtKLElBQXBFLGFBQWdGLEtBQUtHLEdBQXJGO0FBRkssT0FBUDtBQUlEOzs7MkJBQ01lLE0sRUFBUTtBQUNiLFdBQUtqQixVQUFMLEdBQWtCUSxHQUFHVSxjQUFILENBQWtCLFlBQWxCLENBQWxCO0FBQ0EsV0FBS25CLElBQUwsR0FBWWtCLE9BQU9sQixJQUFuQjtBQUNBLFdBQUtFLElBQUwsR0FBWWdCLE9BQU9oQixJQUFuQjtBQUNBLFdBQUtDLEdBQUwsR0FBV2UsT0FBT2YsR0FBbEI7QUFDQSxXQUFLQyxPQUFMLEdBQWVjLE9BQU9kLE9BQXRCO0FBQ0EsV0FBS0MsT0FBTCxHQUFlYSxPQUFPRSxRQUF0QjtBQUNBLFVBQUksS0FBS2YsT0FBTCxJQUFnQixDQUFDLEtBQUtKLFVBQUwsQ0FBZ0JvQixTQUFyQyxFQUFnRDtBQUM5QztBQUNBWixXQUFHYSxVQUFILENBQWM7QUFDWkMsa0NBQXNCLEtBQUtuQixPQUEzQixjQUEyQyxLQUFLSixJQUFoRCxhQUE0RCxLQUFLRztBQURyRCxTQUFkO0FBR0QsT0FMRCxNQUtPLElBQUcsS0FBS0UsT0FBTCxJQUFnQixLQUFLSixVQUFMLENBQWdCb0IsU0FBbkMsRUFBNkM7QUFDbERaLFdBQUdhLFVBQUgsQ0FBYztBQUNaQyxzQ0FBMEIsS0FBS25CLE9BQS9CLGNBQStDLEtBQUtKLElBQXBELGFBQWdFLEtBQUtHO0FBRHpELFNBQWQ7QUFHRDtBQUNELFdBQUtxQixNQUFMO0FBQ0Q7Ozs7RUFyRDJDQyxlQUFLQyxJOztrQkFBOUIvQixnQiIsImZpbGUiOiJjcmVhdGVDbGFzc1N1Y2Nlc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBiaW5kUmVsYXRpb25zaGlwIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfliJvlu7rnj63nuqfmiJDlip8nXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBwYXJlbnRJbmRleDogLTEsXG4gICAgbmFtZTogJ+mHjeW6huW4guesrOS4ieS4reWtpicsXG4gICAgbWVtYmVySW5mbzogbnVsbCxcbiAgICBjb2RlOiAnJyxcbiAgICBrZXk6ICcnLFxuICAgIGNsYXNzSWQ6IC0xLFxuICAgIGlzU2hhcmU6ICcnXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBjb3B5VGV4dChlKSB7XG4gICAgICB3eC5zZXRDbGlwYm9hcmREYXRhKHtcbiAgICAgICAgZGF0YTogdGhpcy5rZXksXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICB3eC5nZXRDbGlwYm9hcmREYXRhKHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+WkjeWItuaIkOWKnydcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuICBvblNoYXJlQXBwTWVzc2FnZShyZXMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6IGAke3RoaXMubWVtYmVySW5mby5uaWNrbmFtZX3pgoDor7fmgqjkuIDotbfliqDlhaUke3RoaXMubmFtZX1gLFxuICAgICAgcGF0aDogYHBhZ2VzL2NyZWF0ZUNsYXNzU3VjY2Vzcz9jbGFzc0lkPSR7dGhpcy5jbGFzc0lkfSZuYW1lPSR7dGhpcy5uYW1lfSZrZXk9JHt0aGlzLmtleX0maXNfc2hhcmU9dHJ1ZWBcbiAgICB9XG4gIH1cbiAgb25Mb2FkKHBhcmFtcykge1xuICAgIHRoaXMubWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcbiAgICB0aGlzLm5hbWUgPSBwYXJhbXMubmFtZVxuICAgIHRoaXMuY29kZSA9IHBhcmFtcy5jb2RlXG4gICAgdGhpcy5rZXkgPSBwYXJhbXMua2V5XG4gICAgdGhpcy5jbGFzc0lkID0gcGFyYW1zLmNsYXNzSWRcbiAgICB0aGlzLmlzU2hhcmUgPSBwYXJhbXMuaXNfc2hhcmVcbiAgICBpZiAodGhpcy5pc1NoYXJlICYmICF0aGlzLm1lbWJlckluZm8ubWVtYmVyX2lkKSB7XG4gICAgICAvLyDlpoLmnpzmmK/ku47liIbkuqvpk77mjqXov5vlhaXkuJTmsqHmnInms6jlhozvvIzlhYjotbDms6jlhozmtYHnqItcbiAgICAgIHd4LnJlZGlyZWN0VG8oe1xuICAgICAgICB1cmw6IGBsb2dpbj9jbGFzc0lkPSR7dGhpcy5jbGFzc0lkfSZuYW1lPSR7dGhpcy5uYW1lfSZrZXk9JHt0aGlzLmtleX1gXG4gICAgICB9KVxuICAgIH0gZWxzZSBpZih0aGlzLmlzU2hhcmUgJiYgdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCl7XG4gICAgICB3eC5yZWRpcmVjdFRvKHtcbiAgICAgICAgdXJsOiBgam9pbkNsYXNzP2NsYXNzSWQ9JHt0aGlzLmNsYXNzSWR9Jm5hbWU9JHt0aGlzLm5hbWV9JmtleT0ke3RoaXMua2V5fWBcbiAgICAgIH0pXG4gICAgfVxuICAgIHRoaXMuJGFwcGx5KClcbiAgfVxufVxuIl19