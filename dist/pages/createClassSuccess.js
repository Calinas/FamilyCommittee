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
      info: {
        schoolName: '重庆市第三中学',
        className: 3,
        unitName: 2019
      },
      memberInfo: null
    }, _this.methods = {
      bindParentPicker: function bindParentPicker(e) {
        this.parentIndex = e.detail.value;
        this.$apply();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(bindRelationship, [{
    key: 'onLoad',
    value: function onLoad() {
      var globalData = this.$parent.globalData;
      this.memberInfo = globalData.memberInfo;
      this.$apply();
    }
  }]);

  return bindRelationship;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(bindRelationship , 'pages/createClassSuccess'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZUNsYXNzU3VjY2Vzcy5qcyJdLCJuYW1lcyI6WyJiaW5kUmVsYXRpb25zaGlwIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJwYXJlbnRJbmRleCIsImluZm8iLCJzY2hvb2xOYW1lIiwiY2xhc3NOYW1lIiwidW5pdE5hbWUiLCJtZW1iZXJJbmZvIiwibWV0aG9kcyIsImJpbmRQYXJlbnRQaWNrZXIiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCIkYXBwbHkiLCJnbG9iYWxEYXRhIiwiJHBhcmVudCIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxnQjs7Ozs7Ozs7Ozs7Ozs7ME1BQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLG1CQUFhLENBQUMsQ0FEVDtBQUVMQyxZQUFNO0FBQ0pDLG9CQUFZLFNBRFI7QUFFSkMsbUJBQVcsQ0FGUDtBQUdKQyxrQkFBVTtBQUhOLE9BRkQ7QUFPTEMsa0JBQVk7QUFQUCxLLFFBY1BDLE8sR0FBVTtBQUNSQyxzQkFEUSw0QkFDU0MsQ0FEVCxFQUNXO0FBQ2pCLGFBQUtSLFdBQUwsR0FBbUJRLEVBQUVDLE1BQUYsQ0FBU0MsS0FBNUI7QUFDQSxhQUFLQyxNQUFMO0FBQ0Q7QUFKTyxLOzs7Ozs2QkFMRDtBQUNQLFVBQU1DLGFBQWEsS0FBS0MsT0FBTCxDQUFhRCxVQUFoQztBQUNBLFdBQUtQLFVBQUwsR0FBa0JPLFdBQVdQLFVBQTdCO0FBQ0EsV0FBS00sTUFBTDtBQUNEOzs7O0VBakIyQ0csZUFBS0MsSTs7a0JBQTlCbkIsZ0IiLCJmaWxlIjoiY3JlYXRlQ2xhc3NTdWNjZXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBiaW5kUmVsYXRpb25zaGlwIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Yib5bu654+t57qn5oiQ5YqfJ1xyXG4gIH1cclxuICBkYXRhID0ge1xyXG4gICAgcGFyZW50SW5kZXg6IC0xLFxyXG4gICAgaW5mbzoge1xyXG4gICAgICBzY2hvb2xOYW1lOiAn6YeN5bqG5biC56ys5LiJ5Lit5a2mJyxcclxuICAgICAgY2xhc3NOYW1lOiAzLFxyXG4gICAgICB1bml0TmFtZTogMjAxOVxyXG4gICAgfSxcclxuICAgIG1lbWJlckluZm86IG51bGxcclxuICB9XHJcbiAgb25Mb2FkKCkge1xyXG4gICAgY29uc3QgZ2xvYmFsRGF0YSA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhXHJcbiAgICB0aGlzLm1lbWJlckluZm8gPSBnbG9iYWxEYXRhLm1lbWJlckluZm9cclxuICAgIHRoaXMuJGFwcGx5KClcclxuICB9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGJpbmRQYXJlbnRQaWNrZXIoZSl7XHJcbiAgICAgIHRoaXMucGFyZW50SW5kZXggPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19