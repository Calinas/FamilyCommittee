'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _createClass2 = require('./../api/createClass.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ClassList = function (_wepy$page) {
  _inherits(ClassList, _wepy$page);

  function ClassList() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ClassList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ClassList.__proto__ || Object.getPrototypeOf(ClassList)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '我的班级'
    }, _this.data = {
      classList: [],
      memberInfo: {},
      list: []
    }, _this.methods = {
      setClass: function setClass(index) {
        wx.setStorage({
          key: 'classInfo',
          data: this.list[index].class,
          success: function success(res) {
            wx.switchTab({
              url: 'zone'
            });
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ClassList, [{
    key: 'getClassList',
    value: function getClassList() {
      var _this2 = this;

      (0, _createClass2.getClassList)().then(function (res) {
        _this2.list = res.data.list;
        _this2.$apply();
      });
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      if (this.$parent.globalData.classHasChange) {
        this.getClassList();
        this.$parent.globalData.classHasChange = false;
      }
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.memberInfo = wx.getStorageSync('memberInfo');
      this.$parent.globalData.userData = this.memberInfo;
      this.getClassList();
      this.$apply();
    }
  }]);

  return ClassList;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ClassList , 'pages/classList'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzTGlzdC5qcyJdLCJuYW1lcyI6WyJDbGFzc0xpc3QiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImNsYXNzTGlzdCIsIm1lbWJlckluZm8iLCJsaXN0IiwibWV0aG9kcyIsInNldENsYXNzIiwiaW5kZXgiLCJ3eCIsInNldFN0b3JhZ2UiLCJrZXkiLCJjbGFzcyIsInN1Y2Nlc3MiLCJzd2l0Y2hUYWIiLCJ1cmwiLCJ0aGVuIiwicmVzIiwiJGFwcGx5IiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJjbGFzc0hhc0NoYW5nZSIsImdldENsYXNzTGlzdCIsImdldFN0b3JhZ2VTeW5jIiwidXNlckRhdGEiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztJQUNxQkEsUzs7Ozs7Ozs7Ozs7Ozs7NExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLGlCQUFXLEVBRE47QUFFTEMsa0JBQVksRUFGUDtBQUdMQyxZQUFNO0FBSEQsSyxRQVdQQyxPLEdBQVU7QUFDUkMsY0FEUSxvQkFDQ0MsS0FERCxFQUNRO0FBQ2RDLFdBQUdDLFVBQUgsQ0FBYztBQUNaQyxlQUFLLFdBRE87QUFFWlQsZ0JBQU0sS0FBS0csSUFBTCxDQUFVRyxLQUFWLEVBQWlCSSxLQUZYO0FBR1pDLG1CQUFTLHNCQUFPO0FBQ2RKLGVBQUdLLFNBQUgsQ0FBYTtBQUNYQyxtQkFBSztBQURNLGFBQWI7QUFHRDtBQVBXLFNBQWQ7QUFTRDtBQVhPLEs7Ozs7O21DQU5LO0FBQUE7O0FBQ2Isd0NBQWVDLElBQWYsQ0FBb0IsZUFBTztBQUN6QixlQUFLWCxJQUFMLEdBQVlZLElBQUlmLElBQUosQ0FBU0csSUFBckI7QUFDQSxlQUFLYSxNQUFMO0FBQ0QsT0FIRDtBQUlEOzs7NkJBY1E7QUFDUCxVQUFJLEtBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkMsY0FBNUIsRUFBNEM7QUFDMUMsYUFBS0MsWUFBTDtBQUNBLGFBQUtILE9BQUwsQ0FBYUMsVUFBYixDQUF3QkMsY0FBeEIsR0FBeUMsS0FBekM7QUFDRDtBQUNGOzs7NkJBQ1E7QUFDUCxXQUFLakIsVUFBTCxHQUFrQkssR0FBR2MsY0FBSCxDQUFrQixZQUFsQixDQUFsQjtBQUNBLFdBQUtKLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkksUUFBeEIsR0FBbUMsS0FBS3BCLFVBQXhDO0FBQ0EsV0FBS2tCLFlBQUw7QUFDQSxXQUFLSixNQUFMO0FBQ0Q7Ozs7RUF2Q29DTyxlQUFLQyxJOztrQkFBdkIzQixTIiwiZmlsZSI6ImNsYXNzTGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7IGdldENsYXNzTGlzdCB9IGZyb20gJy4uL2FwaS9jcmVhdGVDbGFzcydcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsYXNzTGlzdCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5oiR55qE54+t57qnJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgY2xhc3NMaXN0OiBbXSxcbiAgICBtZW1iZXJJbmZvOiB7fSxcbiAgICBsaXN0OiBbXVxuICB9XG4gIGdldENsYXNzTGlzdCgpIHtcbiAgICBnZXRDbGFzc0xpc3QoKS50aGVuKHJlcyA9PiB7XG4gICAgICB0aGlzLmxpc3QgPSByZXMuZGF0YS5saXN0XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSlcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIHNldENsYXNzKGluZGV4KSB7XG4gICAgICB3eC5zZXRTdG9yYWdlKHtcbiAgICAgICAga2V5OiAnY2xhc3NJbmZvJyxcbiAgICAgICAgZGF0YTogdGhpcy5saXN0W2luZGV4XS5jbGFzcyxcbiAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICB3eC5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgdXJsOiAnem9uZSdcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuICBvblNob3coKSB7XG4gICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmNsYXNzSGFzQ2hhbmdlKSB7XG4gICAgICB0aGlzLmdldENsYXNzTGlzdCgpXG4gICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5jbGFzc0hhc0NoYW5nZSA9IGZhbHNlXG4gICAgfVxuICB9XG4gIG9uTG9hZCgpIHtcbiAgICB0aGlzLm1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXG4gICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckRhdGEgPSB0aGlzLm1lbWJlckluZm9cbiAgICB0aGlzLmdldENsYXNzTGlzdCgpXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG59XG4iXX0=