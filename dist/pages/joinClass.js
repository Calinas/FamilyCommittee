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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvaW5DbGFzcy5qcyJdLCJuYW1lcyI6WyJKb2luQ2xhc3MiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJqb2luS2V5IiwibWV0aG9kcyIsImJpbmRJbnB1dCIsImUiLCJjdXJyZW50VGFyZ2V0IiwiaWQiLCJkZXRhaWwiLCJ2YWx1ZSIsIiRhcHBseSIsImpvaW5Ob3ciLCJqb2luX2tleSIsInRoZW4iLCJyZXMiLCJzZXRUaW1lb3V0Iiwid2VweSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjbGFzcyIsIm9wdGlvbnMiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwia2V5IiwibWVtYmVyX2lkIiwicmVkaXJlY3RUbyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7SUFDcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxrQkFBWSxFQURQO0FBRUxDLGlCQUFXLEVBRk47QUFHTEMsZUFBUztBQUhKLEssUUFnQlBDLE8sR0FBVTtBQUNSQyxlQURRLHFCQUNFQyxDQURGLEVBQ0s7QUFDWCxhQUFLQSxFQUFFQyxhQUFGLENBQWdCQyxFQUFyQixJQUEyQkYsRUFBRUcsTUFBRixDQUFTQyxLQUFwQztBQUNBLGFBQUtDLE1BQUw7QUFDRCxPQUpPO0FBS1JDLGFBTFEscUJBS0U7QUFDUixxQ0FBVTtBQUNSQyxvQkFBVSxLQUFLVjtBQURQLFNBQVYsRUFFR1csSUFGSCxDQUVRLGVBQU87QUFDYixjQUFJZCxPQUFPZSxJQUFJZixJQUFmO0FBQ0FnQixxQkFBVyxZQUFNO0FBQ2ZDLDJCQUFLQyxVQUFMLENBQWdCO0FBQ2RDLDRDQUE0Qm5CLEtBQUtvQixLQUFMLENBQVdaO0FBRHpCLGFBQWhCO0FBR0QsV0FKRCxFQUlHLElBSkg7QUFLRCxTQVREO0FBVUQ7QUFoQk8sSzs7Ozs7MkJBWEhhLE8sRUFBUztBQUNkLFdBQUtwQixVQUFMLEdBQWtCcUIsR0FBR0MsY0FBSCxDQUFrQixZQUFsQixDQUFsQjtBQUNBLFdBQUtwQixPQUFMLEdBQWVrQixRQUFRRyxHQUF2QjtBQUNBLFVBQUksS0FBS3JCLE9BQUwsSUFBZ0IsQ0FBQyxLQUFLRixVQUFMLENBQWdCd0IsU0FBckMsRUFBZ0Q7QUFDOUM7QUFDQUgsV0FBR0ksVUFBSCxDQUFjO0FBQ1pQLDhCQUFrQixLQUFLaEI7QUFEWCxTQUFkO0FBR0Q7QUFDRCxXQUFLUSxNQUFMO0FBQ0Q7Ozs7RUFuQm9DTSxlQUFLVSxJOztrQkFBdkI5QixTIiwiZmlsZSI6ImpvaW5DbGFzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7IGpvaW5DbGFzcyB9IGZyb20gJy4uL2FwaS9jcmVhdGVDbGFzcydcbmltcG9ydCB7IHNob3dNc2cgfSBmcm9tICcuLi91dGlscy9jb21tb24nXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKb2luQ2xhc3MgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WIm+W7uuePree6pydcbiAgfVxuICBkYXRhID0ge1xuICAgIG1lbWJlckluZm86IHt9LFxuICAgIGNsYXNzSW5mbzoge30sXG4gICAgam9pbktleTogJydcbiAgfVxuICBvbkxvYWQob3B0aW9ucykge1xuICAgIHRoaXMubWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcbiAgICB0aGlzLmpvaW5LZXkgPSBvcHRpb25zLmtleVxuICAgIGlmICh0aGlzLmpvaW5LZXkgJiYgIXRoaXMubWVtYmVySW5mby5tZW1iZXJfaWQpIHtcbiAgICAgIC8vIOWmguaenOaYr+S7juWIhuS6q+mTvuaOpei/m+WFpeS4lOayoeacieazqOWGjO+8jOWFiOi1sOazqOWGjOa1geeoi1xuICAgICAgd3gucmVkaXJlY3RUbyh7XG4gICAgICAgIHVybDogYGxvZ2luP2tleT0ke3RoaXMuam9pbktleX1gXG4gICAgICB9KVxuICAgIH1cbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBiaW5kSW5wdXQoZSkge1xuICAgICAgdGhpc1tlLmN1cnJlbnRUYXJnZXQuaWRdID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGpvaW5Ob3coKSB7XG4gICAgICBqb2luQ2xhc3Moe1xuICAgICAgICBqb2luX2tleTogdGhpcy5qb2luS2V5XG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGFcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIHVybDogYGJpbmRSZWxhdGlvbnNoaXA/aWQ9JHtkYXRhLmNsYXNzLmlkfWBcbiAgICAgICAgICB9KVxuICAgICAgICB9LCAyMDAwKVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cbiJdfQ==