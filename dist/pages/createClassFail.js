'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var createClassFail = function (_wepy$page) {
  _inherits(createClassFail, _wepy$page);

  function createClassFail() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, createClassFail);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = createClassFail.__proto__ || Object.getPrototypeOf(createClassFail)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '创建班级失败'
    }, _this.data = {
      parentIndex: -1,
      info: {
        schoolName: '重庆市第三中学',
        className: 3,
        unitName: 2019
      }
    }, _this.methods = {
      bindParentPicker: function bindParentPicker(e) {
        this.parentIndex = e.detail.value;
        this.$apply();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return createClassFail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(createClassFail , 'pages/createClassFail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZUNsYXNzRmFpbC5qcyJdLCJuYW1lcyI6WyJjcmVhdGVDbGFzc0ZhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInBhcmVudEluZGV4IiwiaW5mbyIsInNjaG9vbE5hbWUiLCJjbGFzc05hbWUiLCJ1bml0TmFtZSIsIm1ldGhvZHMiLCJiaW5kUGFyZW50UGlja2VyIiwiZSIsImRldGFpbCIsInZhbHVlIiwiJGFwcGx5Iiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxlOzs7Ozs7Ozs7Ozs7Ozt3TUFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsbUJBQWEsQ0FBQyxDQURUO0FBRUxDLFlBQU07QUFDSkMsb0JBQVksU0FEUjtBQUVKQyxtQkFBVyxDQUZQO0FBR0pDLGtCQUFVO0FBSE47QUFGRCxLLFFBUVBDLE8sR0FBVTtBQUNSQyxzQkFEUSw0QkFDU0MsQ0FEVCxFQUNXO0FBQ2pCLGFBQUtQLFdBQUwsR0FBbUJPLEVBQUVDLE1BQUYsQ0FBU0MsS0FBNUI7QUFDQSxhQUFLQyxNQUFMO0FBQ0Q7QUFKTyxLOzs7O0VBWmlDQyxlQUFLQyxJOztrQkFBN0JoQixlIiwiZmlsZSI6ImNyZWF0ZUNsYXNzRmFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBjcmVhdGVDbGFzc0ZhaWwgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WIm+W7uuePree6p+Wksei0pSdcbiAgfVxuICBkYXRhID0ge1xuICAgIHBhcmVudEluZGV4OiAtMSxcbiAgICBpbmZvOiB7XG4gICAgICBzY2hvb2xOYW1lOiAn6YeN5bqG5biC56ys5LiJ5Lit5a2mJyxcbiAgICAgIGNsYXNzTmFtZTogMyxcbiAgICAgIHVuaXROYW1lOiAyMDE5XG4gICAgfVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgYmluZFBhcmVudFBpY2tlcihlKXtcbiAgICAgIHRoaXMucGFyZW50SW5kZXggPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxuICB9XG59XG4iXX0=