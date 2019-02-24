'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _createClass2 = require('./../api/createClass.js');

var _common = require('./../utils/common.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JoinClass = function (_wepy$page) {
  _inherits(JoinClass, _wepy$page);

  function JoinClass() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, JoinClass);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = JoinClass.__proto__ || Object.getPrototypeOf(JoinClass)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '创建班级'
    }, _this.data = {
      memberInfo: {},
      classInfo: {},
      joinKey: ''
    }, _this.methods = {
      bindInput: function bindInput(e) {
        this[e.currentTarget.id] = e.detail.value;
        this.$apply();
      },
      joinNow: function joinNow() {
        (0, _createClass2.joinClass)({
          join_key: this.joinKey
        }).then(function (res) {
          var data = res.data;
          setTimeout(function () {
            _wepy2.default.navigateTo({
              url: 'bindRelationship?id=' + data.class.id
            });
          }, 2000);
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(JoinClass, [{
    key: 'onLoad',
    value: function onLoad(options) {
      this.memberInfo = wx.getStorageSync('memberInfo');
      this.joinKey = options.key;
      if (this.joinKey && !this.memberInfo.member_id) {
        // 如果是从分享链接进入且没有注册，先走注册流程
        wx.redirectTo({
          url: 'login?key=' + this.joinKey
        });
      }
      this.$apply();
    }
  }]);

  return JoinClass;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(JoinClass , 'pages/joinClass'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvaW5DbGFzcy5qcyJdLCJuYW1lcyI6WyJKb2luQ2xhc3MiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJqb2luS2V5IiwibWV0aG9kcyIsImJpbmRJbnB1dCIsImUiLCJjdXJyZW50VGFyZ2V0IiwiaWQiLCJkZXRhaWwiLCJ2YWx1ZSIsIiRhcHBseSIsImpvaW5Ob3ciLCJqb2luX2tleSIsInRoZW4iLCJyZXMiLCJzZXRUaW1lb3V0Iiwid2VweSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjbGFzcyIsIm9wdGlvbnMiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwia2V5IiwibWVtYmVyX2lkIiwicmVkaXJlY3RUbyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7SUFDcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxrQkFBWSxFQURQO0FBRUxDLGlCQUFXLEVBRk47QUFHTEMsZUFBUztBQUhKLEssUUFnQlBDLE8sR0FBVTtBQUNSQyxlQURRLHFCQUNFQyxDQURGLEVBQ0s7QUFDWCxhQUFLQSxFQUFFQyxhQUFGLENBQWdCQyxFQUFyQixJQUEyQkYsRUFBRUcsTUFBRixDQUFTQyxLQUFwQztBQUNBLGFBQUtDLE1BQUw7QUFDRCxPQUpPO0FBS1JDLGFBTFEscUJBS0U7QUFDUixxQ0FBVTtBQUNSQyxvQkFBVSxLQUFLVjtBQURQLFNBQVYsRUFFR1csSUFGSCxDQUVRLGVBQU87QUFDYixjQUFJZCxPQUFPZSxJQUFJZixJQUFmO0FBQ0FnQixxQkFBVyxZQUFNO0FBQ2ZDLDJCQUFLQyxVQUFMLENBQWdCO0FBQ2RDLDRDQUE0Qm5CLEtBQUtvQixLQUFMLENBQVdaO0FBRHpCLGFBQWhCO0FBR0QsV0FKRCxFQUlHLElBSkg7QUFLRCxTQVREO0FBVUQ7QUFoQk8sSzs7Ozs7MkJBWEhhLE8sRUFBUztBQUNkLFdBQUtwQixVQUFMLEdBQWtCcUIsR0FBR0MsY0FBSCxDQUFrQixZQUFsQixDQUFsQjtBQUNBLFdBQUtwQixPQUFMLEdBQWVrQixRQUFRRyxHQUF2QjtBQUNBLFVBQUksS0FBS3JCLE9BQUwsSUFBZ0IsQ0FBQyxLQUFLRixVQUFMLENBQWdCd0IsU0FBckMsRUFBZ0Q7QUFDOUM7QUFDQUgsV0FBR0ksVUFBSCxDQUFjO0FBQ1pQLDhCQUFrQixLQUFLaEI7QUFEWCxTQUFkO0FBR0Q7QUFDRCxXQUFLUSxNQUFMO0FBQ0Q7Ozs7RUFuQm9DTSxlQUFLVSxJOztrQkFBdkI5QixTIiwiZmlsZSI6ImpvaW5DbGFzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgeyBqb2luQ2xhc3MgfSBmcm9tICcuLi9hcGkvY3JlYXRlQ2xhc3MnXHJcbmltcG9ydCB7IHNob3dNc2cgfSBmcm9tICcuLi91dGlscy9jb21tb24nXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpvaW5DbGFzcyBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WIm+W7uuePree6pydcclxuICB9XHJcbiAgZGF0YSA9IHtcclxuICAgIG1lbWJlckluZm86IHt9LFxyXG4gICAgY2xhc3NJbmZvOiB7fSxcclxuICAgIGpvaW5LZXk6ICcnXHJcbiAgfVxyXG4gIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICB0aGlzLm1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXHJcbiAgICB0aGlzLmpvaW5LZXkgPSBvcHRpb25zLmtleVxyXG4gICAgaWYgKHRoaXMuam9pbktleSAmJiAhdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCkge1xyXG4gICAgICAvLyDlpoLmnpzmmK/ku47liIbkuqvpk77mjqXov5vlhaXkuJTmsqHmnInms6jlhozvvIzlhYjotbDms6jlhozmtYHnqItcclxuICAgICAgd3gucmVkaXJlY3RUbyh7XHJcbiAgICAgICAgdXJsOiBgbG9naW4/a2V5PSR7dGhpcy5qb2luS2V5fWBcclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIHRoaXMuJGFwcGx5KClcclxuICB9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGJpbmRJbnB1dChlKSB7XHJcbiAgICAgIHRoaXNbZS5jdXJyZW50VGFyZ2V0LmlkXSA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0sXHJcbiAgICBqb2luTm93KCkge1xyXG4gICAgICBqb2luQ2xhc3Moe1xyXG4gICAgICAgIGpvaW5fa2V5OiB0aGlzLmpvaW5LZXlcclxuICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGFcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYGJpbmRSZWxhdGlvbnNoaXA/aWQ9JHtkYXRhLmNsYXNzLmlkfWBcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSwgMjAwMClcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19