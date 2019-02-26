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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZUNsYXNzU3VjY2Vzcy5qcyJdLCJuYW1lcyI6WyJiaW5kUmVsYXRpb25zaGlwIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJwYXJlbnRJbmRleCIsIm5hbWUiLCJtZW1iZXJJbmZvIiwiY29kZSIsImtleSIsImNsYXNzSWQiLCJpc1NoYXJlIiwibWV0aG9kcyIsImNvcHlUZXh0IiwiZSIsInd4Iiwic2V0Q2xpcGJvYXJkRGF0YSIsInN1Y2Nlc3MiLCJyZXMiLCJnZXRDbGlwYm9hcmREYXRhIiwic2hvd1RvYXN0IiwidGl0bGUiLCJuaWNrbmFtZSIsInBhdGgiLCJwYXJhbXMiLCJnZXRTdG9yYWdlU3luYyIsImlzX3NoYXJlIiwibWVtYmVyX2lkIiwicmVkaXJlY3RUbyIsInVybCIsIiRhcHBseSIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxnQjs7Ozs7Ozs7Ozs7Ozs7ME1BQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLG1CQUFhLENBQUMsQ0FEVDtBQUVMQyxZQUFNLFNBRkQ7QUFHTEMsa0JBQVksSUFIUDtBQUlMQyxZQUFNLEVBSkQ7QUFLTEMsV0FBSyxFQUxBO0FBTUxDLGVBQVMsQ0FBQyxDQU5MO0FBT0xDLGVBQVM7QUFQSixLLFFBU1BDLE8sR0FBVTtBQUNSQyxjQURRLG9CQUNDQyxDQURELEVBQ0k7QUFDVkMsV0FBR0MsZ0JBQUgsQ0FBb0I7QUFDbEJaLGdCQUFNLEtBQUtLLEdBRE87QUFFbEJRLG1CQUFTLGlCQUFVQyxHQUFWLEVBQWU7QUFDdEJILGVBQUdJLGdCQUFILENBQW9CO0FBQ2xCRix1QkFBUyxpQkFBVUMsR0FBVixFQUFlO0FBQ3RCSCxtQkFBR0ssU0FBSCxDQUFhO0FBQ1hDLHlCQUFPO0FBREksaUJBQWI7QUFHRDtBQUxpQixhQUFwQjtBQU9EO0FBVmlCLFNBQXBCO0FBWUQ7QUFkTyxLOzs7OztzQ0FnQlFILEcsRUFBSztBQUNyQixhQUFPO0FBQ0xHLGVBQVUsS0FBS2QsVUFBTCxDQUFnQmUsUUFBMUIsa0RBQTRDLEtBQUtoQixJQUQ1QztBQUVMaUIsb0RBQTBDLEtBQUtiLE9BQS9DLGNBQStELEtBQUtKLElBQXBFLGFBQWdGLEtBQUtHLEdBQXJGO0FBRkssT0FBUDtBQUlEOzs7MkJBQ01lLE0sRUFBUTtBQUNiLFdBQUtqQixVQUFMLEdBQWtCUSxHQUFHVSxjQUFILENBQWtCLFlBQWxCLENBQWxCO0FBQ0EsV0FBS25CLElBQUwsR0FBWWtCLE9BQU9sQixJQUFuQjtBQUNBLFdBQUtFLElBQUwsR0FBWWdCLE9BQU9oQixJQUFuQjtBQUNBLFdBQUtDLEdBQUwsR0FBV2UsT0FBT2YsR0FBbEI7QUFDQSxXQUFLQyxPQUFMLEdBQWVjLE9BQU9kLE9BQXRCO0FBQ0EsV0FBS0MsT0FBTCxHQUFlYSxPQUFPRSxRQUF0QjtBQUNBLFVBQUksS0FBS2YsT0FBTCxJQUFnQixDQUFDLEtBQUtKLFVBQUwsQ0FBZ0JvQixTQUFyQyxFQUFnRDtBQUM5QztBQUNBWixXQUFHYSxVQUFILENBQWM7QUFDWkMsa0NBQXNCLEtBQUtuQixPQUEzQixjQUEyQyxLQUFLSixJQUFoRCxhQUE0RCxLQUFLRztBQURyRCxTQUFkO0FBR0QsT0FMRCxNQUtPLElBQUcsS0FBS0UsT0FBTCxJQUFnQixLQUFLSixVQUFMLENBQWdCb0IsU0FBbkMsRUFBNkM7QUFDbERaLFdBQUdhLFVBQUgsQ0FBYztBQUNaQyxzQ0FBMEIsS0FBS25CLE9BQS9CLGNBQStDLEtBQUtKLElBQXBELGFBQWdFLEtBQUtHO0FBRHpELFNBQWQ7QUFHRDtBQUNELFdBQUtxQixNQUFMO0FBQ0Q7Ozs7RUFyRDJDQyxlQUFLQyxJOztrQkFBOUIvQixnQiIsImZpbGUiOiJjcmVhdGVDbGFzc1N1Y2Nlc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgYmluZFJlbGF0aW9uc2hpcCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WIm+W7uuePree6p+aIkOWKnydcclxuICB9XHJcbiAgZGF0YSA9IHtcclxuICAgIHBhcmVudEluZGV4OiAtMSxcclxuICAgIG5hbWU6ICfph43luobluILnrKzkuInkuK3lraYnLFxyXG4gICAgbWVtYmVySW5mbzogbnVsbCxcclxuICAgIGNvZGU6ICcnLFxyXG4gICAga2V5OiAnJyxcclxuICAgIGNsYXNzSWQ6IC0xLFxyXG4gICAgaXNTaGFyZTogJydcclxuICB9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGNvcHlUZXh0KGUpIHtcclxuICAgICAgd3guc2V0Q2xpcGJvYXJkRGF0YSh7XHJcbiAgICAgICAgZGF0YTogdGhpcy5rZXksXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgd3guZ2V0Q2xpcGJvYXJkRGF0YSh7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICflpI3liLbmiJDlip8nXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG4gIG9uU2hhcmVBcHBNZXNzYWdlKHJlcykge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGl0bGU6IGAke3RoaXMubWVtYmVySW5mby5uaWNrbmFtZX3pgoDor7fmgqjkuIDotbfliqDlhaUke3RoaXMubmFtZX1gLFxyXG4gICAgICBwYXRoOiBgcGFnZXMvY3JlYXRlQ2xhc3NTdWNjZXNzP2NsYXNzSWQ9JHt0aGlzLmNsYXNzSWR9Jm5hbWU9JHt0aGlzLm5hbWV9JmtleT0ke3RoaXMua2V5fSZpc19zaGFyZT10cnVlYFxyXG4gICAgfVxyXG4gIH1cclxuICBvbkxvYWQocGFyYW1zKSB7XHJcbiAgICB0aGlzLm1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXHJcbiAgICB0aGlzLm5hbWUgPSBwYXJhbXMubmFtZVxyXG4gICAgdGhpcy5jb2RlID0gcGFyYW1zLmNvZGVcclxuICAgIHRoaXMua2V5ID0gcGFyYW1zLmtleVxyXG4gICAgdGhpcy5jbGFzc0lkID0gcGFyYW1zLmNsYXNzSWRcclxuICAgIHRoaXMuaXNTaGFyZSA9IHBhcmFtcy5pc19zaGFyZVxyXG4gICAgaWYgKHRoaXMuaXNTaGFyZSAmJiAhdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCkge1xyXG4gICAgICAvLyDlpoLmnpzmmK/ku47liIbkuqvpk77mjqXov5vlhaXkuJTmsqHmnInms6jlhozvvIzlhYjotbDms6jlhozmtYHnqItcclxuICAgICAgd3gucmVkaXJlY3RUbyh7XHJcbiAgICAgICAgdXJsOiBgbG9naW4/Y2xhc3NJZD0ke3RoaXMuY2xhc3NJZH0mbmFtZT0ke3RoaXMubmFtZX0ma2V5PSR7dGhpcy5rZXl9YFxyXG4gICAgICB9KVxyXG4gICAgfSBlbHNlIGlmKHRoaXMuaXNTaGFyZSAmJiB0aGlzLm1lbWJlckluZm8ubWVtYmVyX2lkKXtcclxuICAgICAgd3gucmVkaXJlY3RUbyh7XHJcbiAgICAgICAgdXJsOiBgam9pbkNsYXNzP2NsYXNzSWQ9JHt0aGlzLmNsYXNzSWR9Jm5hbWU9JHt0aGlzLm5hbWV9JmtleT0ke3RoaXMua2V5fWBcclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIHRoaXMuJGFwcGx5KClcclxuICB9XHJcbn1cclxuIl19