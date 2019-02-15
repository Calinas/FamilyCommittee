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
      key: ''
    }, _this.methods = {
      copyText: function copyText(e) {
        wx.setClipboardData({
          data: this.key,
          success: function success(res) {
            wx.getClipboardData({
              success: function success(res) {
                wx.showToast({
                  title: '复制成功',
                  success: function success(res) {
                    wx.navigateTo({
                      url: 'joinClass'
                    });
                  }
                });
              }
            });
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(bindRelationship, [{
    key: 'onLoad',
    value: function onLoad(params) {
      this.memberInfo = wx.getStorageSync('memberInfo');
      this.name = params.name;
      this.code = params.code;
      this.key = params.key;
      this.$apply();
    }
  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage(res) {
      return {
        title: this.memberInfo.nickname + '\u9080\u8BF7\u60A8\u4E00\u8D77\u52A0\u5165' + this.name
      };
    }
  }]);

  return bindRelationship;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(bindRelationship , 'pages/createClassSuccess'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZUNsYXNzU3VjY2Vzcy5qcyJdLCJuYW1lcyI6WyJiaW5kUmVsYXRpb25zaGlwIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJwYXJlbnRJbmRleCIsIm5hbWUiLCJtZW1iZXJJbmZvIiwiY29kZSIsImtleSIsIm1ldGhvZHMiLCJjb3B5VGV4dCIsImUiLCJ3eCIsInNldENsaXBib2FyZERhdGEiLCJzdWNjZXNzIiwicmVzIiwiZ2V0Q2xpcGJvYXJkRGF0YSIsInNob3dUb2FzdCIsInRpdGxlIiwibmF2aWdhdGVUbyIsInVybCIsInBhcmFtcyIsImdldFN0b3JhZ2VTeW5jIiwiJGFwcGx5Iiwibmlja25hbWUiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsZ0I7Ozs7Ozs7Ozs7Ozs7OzBNQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxtQkFBYSxDQUFDLENBRFQ7QUFFTEMsWUFBTSxTQUZEO0FBR0xDLGtCQUFZLElBSFA7QUFJTEMsWUFBTSxFQUpEO0FBS0xDLFdBQUs7QUFMQSxLLFFBT1BDLE8sR0FBVTtBQUNSQyxjQURRLG9CQUNDQyxDQURELEVBQ0k7QUFDVkMsV0FBR0MsZ0JBQUgsQ0FBb0I7QUFDbEJWLGdCQUFNLEtBQUtLLEdBRE87QUFFbEJNLG1CQUFTLGlCQUFVQyxHQUFWLEVBQWU7QUFDdEJILGVBQUdJLGdCQUFILENBQW9CO0FBQ2xCRix1QkFBUyxpQkFBVUMsR0FBVixFQUFlO0FBQ3RCSCxtQkFBR0ssU0FBSCxDQUFhO0FBQ1hDLHlCQUFPLE1BREk7QUFFWEosMkJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNyQkgsdUJBQUdPLFVBQUgsQ0FBYztBQUNaQywyQkFBSztBQURPLHFCQUFkO0FBR0Q7QUFOVSxpQkFBYjtBQVFEO0FBVmlCLGFBQXBCO0FBWUQ7QUFmaUIsU0FBcEI7QUFpQkQ7QUFuQk8sSzs7Ozs7MkJBcUJIQyxNLEVBQVE7QUFDYixXQUFLZixVQUFMLEdBQWtCTSxHQUFHVSxjQUFILENBQWtCLFlBQWxCLENBQWxCO0FBQ0EsV0FBS2pCLElBQUwsR0FBWWdCLE9BQU9oQixJQUFuQjtBQUNBLFdBQUtFLElBQUwsR0FBWWMsT0FBT2QsSUFBbkI7QUFDQSxXQUFLQyxHQUFMLEdBQVdhLE9BQU9iLEdBQWxCO0FBQ0EsV0FBS2UsTUFBTDtBQUNEOzs7c0NBQ2lCUixHLEVBQUs7QUFDckIsYUFBTztBQUNMRyxlQUFVLEtBQUtaLFVBQUwsQ0FBZ0JrQixRQUExQixrREFBNEMsS0FBS25CO0FBRDVDLE9BQVA7QUFHRDs7OztFQTNDMkNvQixlQUFLQyxJOztrQkFBOUIxQixnQiIsImZpbGUiOiJjcmVhdGVDbGFzc1N1Y2Nlc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgYmluZFJlbGF0aW9uc2hpcCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Yib5bu654+t57qn5oiQ5YqfJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgcGFyZW50SW5kZXg6IC0xLFxuICAgIG5hbWU6ICfph43luobluILnrKzkuInkuK3lraYnLFxuICAgIG1lbWJlckluZm86IG51bGwsXG4gICAgY29kZTogJycsXG4gICAga2V5OiAnJ1xuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgY29weVRleHQoZSkge1xuICAgICAgd3guc2V0Q2xpcGJvYXJkRGF0YSh7XG4gICAgICAgIGRhdGE6IHRoaXMua2V5LFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgd3guZ2V0Q2xpcGJvYXJkRGF0YSh7XG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICflpI3liLbmiJDlip8nLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogJ2pvaW5DbGFzcydcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIG9uTG9hZChwYXJhbXMpIHtcbiAgICB0aGlzLm1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXG4gICAgdGhpcy5uYW1lID0gcGFyYW1zLm5hbWVcbiAgICB0aGlzLmNvZGUgPSBwYXJhbXMuY29kZVxuICAgIHRoaXMua2V5ID0gcGFyYW1zLmtleVxuICAgIHRoaXMuJGFwcGx5KClcbiAgfVxuICBvblNoYXJlQXBwTWVzc2FnZShyZXMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6IGAke3RoaXMubWVtYmVySW5mby5uaWNrbmFtZX3pgoDor7fmgqjkuIDotbfliqDlhaUke3RoaXMubmFtZX1gXG4gICAgfVxuICB9XG59XG4iXX0=