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
      classId: -1,
      joinKey: '',
      createClassInfo: {}
    }, _this.methods = {
      bindInput: function bindInput(e) {
        this[e.currentTarget.id] = e.detail.value;
        this.$apply();
      },
      joinNow: function joinNow() {
        (0, _createClass2.joinClass)({
          class_id: this.classId,
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
      console.log(options);
      this.classId = options.id;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvaW5DbGFzcy5qcyJdLCJuYW1lcyI6WyJKb2luQ2xhc3MiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJjbGFzc0lkIiwiam9pbktleSIsImNyZWF0ZUNsYXNzSW5mbyIsIm1ldGhvZHMiLCJiaW5kSW5wdXQiLCJlIiwiY3VycmVudFRhcmdldCIsImlkIiwiZGV0YWlsIiwidmFsdWUiLCIkYXBwbHkiLCJqb2luTm93IiwiY2xhc3NfaWQiLCJqb2luX2tleSIsInRoZW4iLCJyZXMiLCJzZXRUaW1lb3V0Iiwid2VweSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjbGFzcyIsIm9wdGlvbnMiLCJjb25zb2xlIiwibG9nIiwid3giLCJnZXRTdG9yYWdlU3luYyIsImtleSIsIm1lbWJlcl9pZCIsInJlZGlyZWN0VG8iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBQ3FCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsa0JBQVksRUFEUDtBQUVMQyxpQkFBVyxFQUZOO0FBR0xDLGVBQVMsQ0FBQyxDQUhMO0FBSUxDLGVBQVMsRUFKSjtBQUtMQyx1QkFBaUI7QUFMWixLLFFBb0JQQyxPLEdBQVU7QUFDUkMsZUFEUSxxQkFDRUMsQ0FERixFQUNLO0FBQ1gsYUFBS0EsRUFBRUMsYUFBRixDQUFnQkMsRUFBckIsSUFBMkJGLEVBQUVHLE1BQUYsQ0FBU0MsS0FBcEM7QUFDQSxhQUFLQyxNQUFMO0FBQ0QsT0FKTztBQUtSQyxhQUxRLHFCQUtFO0FBQ1IscUNBQVU7QUFDUkMsb0JBQVUsS0FBS1osT0FEUDtBQUVSYSxvQkFBVSxLQUFLWjtBQUZQLFNBQVYsRUFHR2EsSUFISCxDQUdRLGVBQU87QUFDYixjQUFJakIsT0FBT2tCLElBQUlsQixJQUFmO0FBQ0FtQixxQkFBVyxZQUFNO0FBQ2ZDLDJCQUFLQyxVQUFMLENBQWdCO0FBQ2RDLDRDQUE0QnRCLEtBQUt1QixLQUFMLENBQVdiO0FBRHpCLGFBQWhCO0FBR0QsV0FKRCxFQUlHLElBSkg7QUFLRCxTQVZEO0FBV0Q7QUFqQk8sSzs7Ozs7MkJBYkhjLE8sRUFBUztBQUNkQyxjQUFRQyxHQUFSLENBQVlGLE9BQVo7QUFDQSxXQUFLckIsT0FBTCxHQUFlcUIsUUFBUWQsRUFBdkI7QUFDQSxXQUFLVCxVQUFMLEdBQWtCMEIsR0FBR0MsY0FBSCxDQUFrQixZQUFsQixDQUFsQjtBQUNBLFdBQUt4QixPQUFMLEdBQWVvQixRQUFRSyxHQUF2QjtBQUNBLFVBQUksS0FBS3pCLE9BQUwsSUFBZ0IsQ0FBQyxLQUFLSCxVQUFMLENBQWdCNkIsU0FBckMsRUFBZ0Q7QUFDOUM7QUFDQUgsV0FBR0ksVUFBSCxDQUFjO0FBQ1pULDhCQUFrQixLQUFLbEI7QUFEWCxTQUFkO0FBR0Q7QUFDRCxXQUFLUyxNQUFMO0FBQ0Q7Ozs7RUF2Qm9DTyxlQUFLWSxJOztrQkFBdkJuQyxTIiwiZmlsZSI6ImpvaW5DbGFzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7IGpvaW5DbGFzcyB9IGZyb20gJy4uL2FwaS9jcmVhdGVDbGFzcydcbmltcG9ydCB7IHNob3dNc2cgfSBmcm9tICcuLi91dGlscy9jb21tb24nXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKb2luQ2xhc3MgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WIm+W7uuePree6pydcbiAgfVxuICBkYXRhID0ge1xuICAgIG1lbWJlckluZm86IHt9LFxuICAgIGNsYXNzSW5mbzoge30sXG4gICAgY2xhc3NJZDogLTEsXG4gICAgam9pbktleTogJycsXG4gICAgY3JlYXRlQ2xhc3NJbmZvOiB7fVxuICB9XG4gIG9uTG9hZChvcHRpb25zKSB7XG4gICAgY29uc29sZS5sb2cob3B0aW9ucylcbiAgICB0aGlzLmNsYXNzSWQgPSBvcHRpb25zLmlkXG4gICAgdGhpcy5tZW1iZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nKVxuICAgIHRoaXMuam9pbktleSA9IG9wdGlvbnMua2V5XG4gICAgaWYgKHRoaXMuam9pbktleSAmJiAhdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCkge1xuICAgICAgLy8g5aaC5p6c5piv5LuO5YiG5Lqr6ZO+5o6l6L+b5YWl5LiU5rKh5pyJ5rOo5YaM77yM5YWI6LWw5rOo5YaM5rWB56iLXG4gICAgICB3eC5yZWRpcmVjdFRvKHtcbiAgICAgICAgdXJsOiBgbG9naW4/a2V5PSR7dGhpcy5qb2luS2V5fWBcbiAgICAgIH0pXG4gICAgfVxuICAgIHRoaXMuJGFwcGx5KClcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIGJpbmRJbnB1dChlKSB7XG4gICAgICB0aGlzW2UuY3VycmVudFRhcmdldC5pZF0gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgam9pbk5vdygpIHtcbiAgICAgIGpvaW5DbGFzcyh7XG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSWQsXG4gICAgICAgIGpvaW5fa2V5OiB0aGlzLmpvaW5LZXlcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgdXJsOiBgYmluZFJlbGF0aW9uc2hpcD9pZD0ke2RhdGEuY2xhc3MuaWR9YFxuICAgICAgICAgIH0pXG4gICAgICAgIH0sIDIwMDApXG4gICAgICB9KVxuICAgIH1cbiAgfVxufVxuIl19