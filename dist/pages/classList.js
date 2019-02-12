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
      classInfo: null,
      list: []
    }, _this.methods = {
      setClass: function setClass(index) {
        var _this2 = this;

        wx.setStorage({
          key: 'classInfo',
          data: this.list[index].class,
          success: function success(res) {
            _this2.classInfo = _this2.list[index].class;
            _this2.$apply();
            setTimeout(function () {
              wx.switchTab({
                url: 'zone'
              });
            }, 1000);
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ClassList, [{
    key: 'getClassList',
    value: function getClassList() {
      var _this3 = this;

      (0, _createClass2.getClassList)().then(function (res) {
        _this3.list = res.data.list;
        _this3.$apply();
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
      this.classInfo = wx.getStorageSync('classInfo');
      this.$parent.globalData.userData = this.memberInfo;
      this.getClassList();
      this.$apply();
    }
  }]);

  return ClassList;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ClassList , 'pages/classList'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzTGlzdC5qcyJdLCJuYW1lcyI6WyJDbGFzc0xpc3QiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImNsYXNzTGlzdCIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJsaXN0IiwibWV0aG9kcyIsInNldENsYXNzIiwiaW5kZXgiLCJ3eCIsInNldFN0b3JhZ2UiLCJrZXkiLCJjbGFzcyIsInN1Y2Nlc3MiLCIkYXBwbHkiLCJzZXRUaW1lb3V0Iiwic3dpdGNoVGFiIiwidXJsIiwidGhlbiIsInJlcyIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiY2xhc3NIYXNDaGFuZ2UiLCJnZXRDbGFzc0xpc3QiLCJnZXRTdG9yYWdlU3luYyIsInVzZXJEYXRhIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFDcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxpQkFBVyxFQUROO0FBRUxDLGtCQUFZLEVBRlA7QUFHTEMsaUJBQVcsSUFITjtBQUlMQyxZQUFNO0FBSkQsSyxRQVlQQyxPLEdBQVU7QUFDUkMsY0FEUSxvQkFDQ0MsS0FERCxFQUNRO0FBQUE7O0FBQ2RDLFdBQUdDLFVBQUgsQ0FBYztBQUNaQyxlQUFLLFdBRE87QUFFWlYsZ0JBQU0sS0FBS0ksSUFBTCxDQUFVRyxLQUFWLEVBQWlCSSxLQUZYO0FBR1pDLG1CQUFTLHNCQUFPO0FBQ2QsbUJBQUtULFNBQUwsR0FBaUIsT0FBS0MsSUFBTCxDQUFVRyxLQUFWLEVBQWlCSSxLQUFsQztBQUNBLG1CQUFLRSxNQUFMO0FBQ0FDLHVCQUFXLFlBQU07QUFDZk4saUJBQUdPLFNBQUgsQ0FBYTtBQUNYQyxxQkFBSztBQURNLGVBQWI7QUFHRCxhQUpELEVBSUcsSUFKSDtBQUtEO0FBWFcsU0FBZDtBQWFEO0FBZk8sSzs7Ozs7bUNBTks7QUFBQTs7QUFDYix3Q0FBZUMsSUFBZixDQUFvQixlQUFPO0FBQ3pCLGVBQUtiLElBQUwsR0FBWWMsSUFBSWxCLElBQUosQ0FBU0ksSUFBckI7QUFDQSxlQUFLUyxNQUFMO0FBQ0QsT0FIRDtBQUlEOzs7NkJBa0JRO0FBQ1AsVUFBSSxLQUFLTSxPQUFMLENBQWFDLFVBQWIsQ0FBd0JDLGNBQTVCLEVBQTRDO0FBQzFDLGFBQUtDLFlBQUw7QUFDQSxhQUFLSCxPQUFMLENBQWFDLFVBQWIsQ0FBd0JDLGNBQXhCLEdBQXlDLEtBQXpDO0FBQ0Q7QUFDRjs7OzZCQUNRO0FBQ1AsV0FBS25CLFVBQUwsR0FBa0JNLEdBQUdlLGNBQUgsQ0FBa0IsWUFBbEIsQ0FBbEI7QUFDQSxXQUFLcEIsU0FBTCxHQUFpQkssR0FBR2UsY0FBSCxDQUFrQixXQUFsQixDQUFqQjtBQUNBLFdBQUtKLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkksUUFBeEIsR0FBbUMsS0FBS3RCLFVBQXhDO0FBQ0EsV0FBS29CLFlBQUw7QUFDQSxXQUFLVCxNQUFMO0FBQ0Q7Ozs7RUE3Q29DWSxlQUFLQyxJOztrQkFBdkI3QixTIiwiZmlsZSI6ImNsYXNzTGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7IGdldENsYXNzTGlzdCB9IGZyb20gJy4uL2FwaS9jcmVhdGVDbGFzcydcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsYXNzTGlzdCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5oiR55qE54+t57qnJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgY2xhc3NMaXN0OiBbXSxcbiAgICBtZW1iZXJJbmZvOiB7fSxcbiAgICBjbGFzc0luZm86IG51bGwsXG4gICAgbGlzdDogW11cbiAgfVxuICBnZXRDbGFzc0xpc3QoKSB7XG4gICAgZ2V0Q2xhc3NMaXN0KCkudGhlbihyZXMgPT4ge1xuICAgICAgdGhpcy5saXN0ID0gcmVzLmRhdGEubGlzdFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0pXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBzZXRDbGFzcyhpbmRleCkge1xuICAgICAgd3guc2V0U3RvcmFnZSh7XG4gICAgICAgIGtleTogJ2NsYXNzSW5mbycsXG4gICAgICAgIGRhdGE6IHRoaXMubGlzdFtpbmRleF0uY2xhc3MsXG4gICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgdGhpcy5jbGFzc0luZm8gPSB0aGlzLmxpc3RbaW5kZXhdLmNsYXNzXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgd3guc3dpdGNoVGFiKHtcbiAgICAgICAgICAgICAgdXJsOiAnem9uZSdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSwgMTAwMClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgb25TaG93KCkge1xuICAgIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5jbGFzc0hhc0NoYW5nZSkge1xuICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKVxuICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuY2xhc3NIYXNDaGFuZ2UgPSBmYWxzZVxuICAgIH1cbiAgfVxuICBvbkxvYWQoKSB7XG4gICAgdGhpcy5tZW1iZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nKVxuICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXG4gICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckRhdGEgPSB0aGlzLm1lbWJlckluZm9cbiAgICB0aGlzLmdldENsYXNzTGlzdCgpXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG59XG4iXX0=