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
    value: function onLoad() {
      var globalData = this.$parent.globalData;
      this.memberInfo = globalData.memberInfo;
      this.$apply();
    }
  }]);

  return JoinClass;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(JoinClass , 'pages/joinClass'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvaW5DbGFzcy5qcyJdLCJuYW1lcyI6WyJKb2luQ2xhc3MiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJqb2luS2V5IiwibWV0aG9kcyIsImJpbmRJbnB1dCIsImUiLCJjdXJyZW50VGFyZ2V0IiwiaWQiLCJkZXRhaWwiLCJ2YWx1ZSIsIiRhcHBseSIsImpvaW5Ob3ciLCJqb2luX2tleSIsInRoZW4iLCJyZXMiLCJzZXRUaW1lb3V0Iiwid2VweSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjbGFzcyIsImdsb2JhbERhdGEiLCIkcGFyZW50IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQUNxQkEsUzs7Ozs7Ozs7Ozs7Ozs7NExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLGtCQUFZLEVBRFA7QUFFTEMsaUJBQVcsRUFGTjtBQUdMQyxlQUFTO0FBSEosSyxRQVVQQyxPLEdBQVU7QUFDUkMsZUFEUSxxQkFDRUMsQ0FERixFQUNLO0FBQ1gsYUFBS0EsRUFBRUMsYUFBRixDQUFnQkMsRUFBckIsSUFBMkJGLEVBQUVHLE1BQUYsQ0FBU0MsS0FBcEM7QUFDQSxhQUFLQyxNQUFMO0FBQ0QsT0FKTztBQUtSQyxhQUxRLHFCQUtFO0FBQ1IscUNBQVU7QUFDUkMsb0JBQVUsS0FBS1Y7QUFEUCxTQUFWLEVBRUdXLElBRkgsQ0FFUSxlQUFPO0FBQ2IsY0FBSWQsT0FBT2UsSUFBSWYsSUFBZjtBQUNBZ0IscUJBQVcsWUFBTTtBQUNmQywyQkFBS0MsVUFBTCxDQUFnQjtBQUNkQyw0Q0FBNEJuQixLQUFLb0IsS0FBTCxDQUFXWjtBQUR6QixhQUFoQjtBQUdELFdBSkQsRUFJRyxJQUpIO0FBS0QsU0FURDtBQVVEO0FBaEJPLEs7Ozs7OzZCQUxEO0FBQ1AsVUFBTWEsYUFBYSxLQUFLQyxPQUFMLENBQWFELFVBQWhDO0FBQ0EsV0FBS3BCLFVBQUwsR0FBa0JvQixXQUFXcEIsVUFBN0I7QUFDQSxXQUFLVSxNQUFMO0FBQ0Q7Ozs7RUFib0NNLGVBQUtNLEk7O2tCQUF2QjFCLFMiLCJmaWxlIjoiam9pbkNsYXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHsgam9pbkNsYXNzIH0gZnJvbSAnLi4vYXBpL2NyZWF0ZUNsYXNzJ1xuaW1wb3J0IHsgc2hvd01zZyB9IGZyb20gJy4uL3V0aWxzL2NvbW1vbidcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpvaW5DbGFzcyBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Yib5bu654+t57qnJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgbWVtYmVySW5mbzoge30sXG4gICAgY2xhc3NJbmZvOiB7fSxcbiAgICBqb2luS2V5OiAnJ1xuICB9XG4gIG9uTG9hZCgpIHtcbiAgICBjb25zdCBnbG9iYWxEYXRhID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGFcbiAgICB0aGlzLm1lbWJlckluZm8gPSBnbG9iYWxEYXRhLm1lbWJlckluZm9cbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBiaW5kSW5wdXQoZSkge1xuICAgICAgdGhpc1tlLmN1cnJlbnRUYXJnZXQuaWRdID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGpvaW5Ob3coKSB7XG4gICAgICBqb2luQ2xhc3Moe1xuICAgICAgICBqb2luX2tleTogdGhpcy5qb2luS2V5XG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGFcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIHVybDogYGJpbmRSZWxhdGlvbnNoaXA/aWQ9JHtkYXRhLmNsYXNzLmlkfWBcbiAgICAgICAgICB9KVxuICAgICAgICB9LCAyMDAwKVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cbiJdfQ==