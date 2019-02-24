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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZUNsYXNzU3VjY2Vzcy5qcyJdLCJuYW1lcyI6WyJiaW5kUmVsYXRpb25zaGlwIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJwYXJlbnRJbmRleCIsIm5hbWUiLCJtZW1iZXJJbmZvIiwiY29kZSIsImtleSIsIm1ldGhvZHMiLCJjb3B5VGV4dCIsImUiLCJ3eCIsInNldENsaXBib2FyZERhdGEiLCJzdWNjZXNzIiwicmVzIiwiZ2V0Q2xpcGJvYXJkRGF0YSIsInNob3dUb2FzdCIsInRpdGxlIiwibmF2aWdhdGVUbyIsInVybCIsInBhcmFtcyIsImdldFN0b3JhZ2VTeW5jIiwiJGFwcGx5Iiwibmlja25hbWUiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsZ0I7Ozs7Ozs7Ozs7Ozs7OzBNQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxtQkFBYSxDQUFDLENBRFQ7QUFFTEMsWUFBTSxTQUZEO0FBR0xDLGtCQUFZLElBSFA7QUFJTEMsWUFBTSxFQUpEO0FBS0xDLFdBQUs7QUFMQSxLLFFBT1BDLE8sR0FBVTtBQUNSQyxjQURRLG9CQUNDQyxDQURELEVBQ0k7QUFDVkMsV0FBR0MsZ0JBQUgsQ0FBb0I7QUFDbEJWLGdCQUFNLEtBQUtLLEdBRE87QUFFbEJNLG1CQUFTLGlCQUFVQyxHQUFWLEVBQWU7QUFDdEJILGVBQUdJLGdCQUFILENBQW9CO0FBQ2xCRix1QkFBUyxpQkFBVUMsR0FBVixFQUFlO0FBQ3RCSCxtQkFBR0ssU0FBSCxDQUFhO0FBQ1hDLHlCQUFPLE1BREk7QUFFWEosMkJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNyQkgsdUJBQUdPLFVBQUgsQ0FBYztBQUNaQywyQkFBSztBQURPLHFCQUFkO0FBR0Q7QUFOVSxpQkFBYjtBQVFEO0FBVmlCLGFBQXBCO0FBWUQ7QUFmaUIsU0FBcEI7QUFpQkQ7QUFuQk8sSzs7Ozs7MkJBcUJIQyxNLEVBQVE7QUFDYixXQUFLZixVQUFMLEdBQWtCTSxHQUFHVSxjQUFILENBQWtCLFlBQWxCLENBQWxCO0FBQ0EsV0FBS2pCLElBQUwsR0FBWWdCLE9BQU9oQixJQUFuQjtBQUNBLFdBQUtFLElBQUwsR0FBWWMsT0FBT2QsSUFBbkI7QUFDQSxXQUFLQyxHQUFMLEdBQVdhLE9BQU9iLEdBQWxCO0FBQ0EsV0FBS2UsTUFBTDtBQUNEOzs7c0NBQ2lCUixHLEVBQUs7QUFDckIsYUFBTztBQUNMRyxlQUFVLEtBQUtaLFVBQUwsQ0FBZ0JrQixRQUExQixrREFBNEMsS0FBS25CO0FBRDVDLE9BQVA7QUFHRDs7OztFQTNDMkNvQixlQUFLQyxJOztrQkFBOUIxQixnQiIsImZpbGUiOiJjcmVhdGVDbGFzc1N1Y2Nlc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGJpbmRSZWxhdGlvbnNoaXAgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfliJvlu7rnj63nuqfmiJDlip8nXHJcbiAgfVxyXG4gIGRhdGEgPSB7XHJcbiAgICBwYXJlbnRJbmRleDogLTEsXHJcbiAgICBuYW1lOiAn6YeN5bqG5biC56ys5LiJ5Lit5a2mJyxcclxuICAgIG1lbWJlckluZm86IG51bGwsXHJcbiAgICBjb2RlOiAnJyxcclxuICAgIGtleTogJydcclxuICB9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGNvcHlUZXh0KGUpIHtcclxuICAgICAgd3guc2V0Q2xpcGJvYXJkRGF0YSh7XHJcbiAgICAgICAgZGF0YTogdGhpcy5rZXksXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgd3guZ2V0Q2xpcGJvYXJkRGF0YSh7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICflpI3liLbmiJDlip8nLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJ2pvaW5DbGFzcydcclxuICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbiAgb25Mb2FkKHBhcmFtcykge1xyXG4gICAgdGhpcy5tZW1iZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nKVxyXG4gICAgdGhpcy5uYW1lID0gcGFyYW1zLm5hbWVcclxuICAgIHRoaXMuY29kZSA9IHBhcmFtcy5jb2RlXHJcbiAgICB0aGlzLmtleSA9IHBhcmFtcy5rZXlcclxuICAgIHRoaXMuJGFwcGx5KClcclxuICB9XHJcbiAgb25TaGFyZUFwcE1lc3NhZ2UocmVzKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0aXRsZTogYCR7dGhpcy5tZW1iZXJJbmZvLm5pY2tuYW1lfemCgOivt+aCqOS4gOi1t+WKoOWFpSR7dGhpcy5uYW1lfWBcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19