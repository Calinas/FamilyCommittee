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
      key: '',
      createClassInfo: {},
      name: '',
      isShare: ''
    }, _this.methods = {
      bindInput: function bindInput(e) {
        this[e.currentTarget.id] = e.detail.value;
        this.$apply();
      },
      joinNow: function joinNow() {
        var _this2 = this;

        (0, _createClass2.joinClass)({
          class_id: this.classId,
          join_key: this.key
        }).then(function (res) {
          if (res.data.success) {
            (0, _common.showMsg)('成功加入班级');
            wx.setStorage({
              key: 'classInfo',
              data: res.data.class
            });
            setTimeout(function () {
              _wepy2.default.navigateTo({ url: 'bindRelationship?id=' + _this2.classId + '&type=join&key=' + _this2.key });
            }, 2000);
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(JoinClass, [{
    key: 'onLoad',
    value: function onLoad(options) {
      this.classId = options.classId;
      this.name = options.name;
      this.key = options.key;
      this.isShare = options.is_share;
      this.memberInfo = wx.getStorageSync('memberInfo');
      this.$apply();
      if (this.isShare && !this.memberInfo.member_id) {
        // 如果是从分享链接进入且没有注册，先走注册流程
        wx.redirectTo({
          url: 'login?classId=' + this.classId + '&name=' + this.name + '&key=' + this.key
        });
      }
    }
  }]);

  return JoinClass;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(JoinClass , 'pages/joinClass'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvaW5DbGFzcy5qcyJdLCJuYW1lcyI6WyJKb2luQ2xhc3MiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJjbGFzc0lkIiwia2V5IiwiY3JlYXRlQ2xhc3NJbmZvIiwibmFtZSIsImlzU2hhcmUiLCJtZXRob2RzIiwiYmluZElucHV0IiwiZSIsImN1cnJlbnRUYXJnZXQiLCJpZCIsImRldGFpbCIsInZhbHVlIiwiJGFwcGx5Iiwiam9pbk5vdyIsImNsYXNzX2lkIiwiam9pbl9rZXkiLCJ0aGVuIiwicmVzIiwic3VjY2VzcyIsInd4Iiwic2V0U3RvcmFnZSIsImNsYXNzIiwic2V0VGltZW91dCIsIndlcHkiLCJuYXZpZ2F0ZVRvIiwidXJsIiwib3B0aW9ucyIsImlzX3NoYXJlIiwiZ2V0U3RvcmFnZVN5bmMiLCJtZW1iZXJfaWQiLCJyZWRpcmVjdFRvIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQUNxQkEsUzs7Ozs7Ozs7Ozs7Ozs7NExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLGtCQUFZLEVBRFA7QUFFTEMsaUJBQVcsRUFGTjtBQUdMQyxlQUFTLENBQUMsQ0FITDtBQUlMQyxXQUFLLEVBSkE7QUFLTEMsdUJBQWlCLEVBTFo7QUFNTEMsWUFBTSxFQU5EO0FBT0xDLGVBQVM7QUFQSixLLFFBdUJQQyxPLEdBQVU7QUFDUkMsZUFEUSxxQkFDRUMsQ0FERixFQUNLO0FBQ1gsYUFBS0EsRUFBRUMsYUFBRixDQUFnQkMsRUFBckIsSUFBMkJGLEVBQUVHLE1BQUYsQ0FBU0MsS0FBcEM7QUFDQSxhQUFLQyxNQUFMO0FBQ0QsT0FKTztBQUtSQyxhQUxRLHFCQUtFO0FBQUE7O0FBQ1IscUNBQVU7QUFDUkMsb0JBQVUsS0FBS2QsT0FEUDtBQUVSZSxvQkFBVSxLQUFLZDtBQUZQLFNBQVYsRUFHR2UsSUFISCxDQUdRLGVBQU87QUFDYixjQUFHQyxJQUFJcEIsSUFBSixDQUFTcUIsT0FBWixFQUFxQjtBQUNuQixpQ0FBUSxRQUFSO0FBQ0FDLGVBQUdDLFVBQUgsQ0FBYztBQUNabkIsbUJBQUssV0FETztBQUVaSixvQkFBTW9CLElBQUlwQixJQUFKLENBQVN3QjtBQUZILGFBQWQ7QUFJQUMsdUJBQVcsWUFBTTtBQUNmQyw2QkFBS0MsVUFBTCxDQUFnQixFQUFDQyw4QkFBNEIsT0FBS3pCLE9BQWpDLHVCQUEwRCxPQUFLQyxHQUFoRSxFQUFoQjtBQUNELGFBRkQsRUFFRSxJQUZGO0FBR0Q7QUFDRixTQWREO0FBZUQ7QUFyQk8sSzs7Ozs7MkJBZEh5QixPLEVBQVM7QUFDZCxXQUFLMUIsT0FBTCxHQUFlMEIsUUFBUTFCLE9BQXZCO0FBQ0EsV0FBS0csSUFBTCxHQUFZdUIsUUFBUXZCLElBQXBCO0FBQ0EsV0FBS0YsR0FBTCxHQUFXeUIsUUFBUXpCLEdBQW5CO0FBQ0EsV0FBS0csT0FBTCxHQUFlc0IsUUFBUUMsUUFBdkI7QUFDQSxXQUFLN0IsVUFBTCxHQUFrQnFCLEdBQUdTLGNBQUgsQ0FBa0IsWUFBbEIsQ0FBbEI7QUFDQSxXQUFLaEIsTUFBTDtBQUNBLFVBQUksS0FBS1IsT0FBTCxJQUFnQixDQUFDLEtBQUtOLFVBQUwsQ0FBZ0IrQixTQUFyQyxFQUFnRDtBQUM5QztBQUNBVixXQUFHVyxVQUFILENBQWM7QUFDWkwsa0NBQXNCLEtBQUt6QixPQUEzQixjQUEyQyxLQUFLRyxJQUFoRCxhQUE0RCxLQUFLRjtBQURyRCxTQUFkO0FBR0Q7QUFDRjs7OztFQTFCb0NzQixlQUFLUSxJOztrQkFBdkJyQyxTIiwiZmlsZSI6ImpvaW5DbGFzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7IGpvaW5DbGFzcyB9IGZyb20gJy4uL2FwaS9jcmVhdGVDbGFzcydcbmltcG9ydCB7IHNob3dNc2cgfSBmcm9tICcuLi91dGlscy9jb21tb24nXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKb2luQ2xhc3MgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WIm+W7uuePree6pydcbiAgfVxuICBkYXRhID0ge1xuICAgIG1lbWJlckluZm86IHt9LFxuICAgIGNsYXNzSW5mbzoge30sXG4gICAgY2xhc3NJZDogLTEsXG4gICAga2V5OiAnJyxcbiAgICBjcmVhdGVDbGFzc0luZm86IHt9LFxuICAgIG5hbWU6ICcnLFxuICAgIGlzU2hhcmU6ICcnXG4gIH1cbiAgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICB0aGlzLmNsYXNzSWQgPSBvcHRpb25zLmNsYXNzSWRcbiAgICB0aGlzLm5hbWUgPSBvcHRpb25zLm5hbWVcbiAgICB0aGlzLmtleSA9IG9wdGlvbnMua2V5XG4gICAgdGhpcy5pc1NoYXJlID0gb3B0aW9ucy5pc19zaGFyZVxuICAgIHRoaXMubWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcbiAgICB0aGlzLiRhcHBseSgpXG4gICAgaWYgKHRoaXMuaXNTaGFyZSAmJiAhdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCkge1xuICAgICAgLy8g5aaC5p6c5piv5LuO5YiG5Lqr6ZO+5o6l6L+b5YWl5LiU5rKh5pyJ5rOo5YaM77yM5YWI6LWw5rOo5YaM5rWB56iLXG4gICAgICB3eC5yZWRpcmVjdFRvKHtcbiAgICAgICAgdXJsOiBgbG9naW4/Y2xhc3NJZD0ke3RoaXMuY2xhc3NJZH0mbmFtZT0ke3RoaXMubmFtZX0ma2V5PSR7dGhpcy5rZXl9YFxuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBiaW5kSW5wdXQoZSkge1xuICAgICAgdGhpc1tlLmN1cnJlbnRUYXJnZXQuaWRdID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGpvaW5Ob3coKSB7XG4gICAgICBqb2luQ2xhc3Moe1xuICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0lkLFxuICAgICAgICBqb2luX2tleTogdGhpcy5rZXlcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgIHNob3dNc2coJ+aIkOWKn+WKoOWFpeePree6pycpXG4gICAgICAgICAgd3guc2V0U3RvcmFnZSh7XG4gICAgICAgICAgICBrZXk6ICdjbGFzc0luZm8nLFxuICAgICAgICAgICAgZGF0YTogcmVzLmRhdGEuY2xhc3NcbiAgICAgICAgICB9KVxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6IGBiaW5kUmVsYXRpb25zaGlwP2lkPSR7dGhpcy5jbGFzc0lkfSZ0eXBlPWpvaW4ma2V5PSR7dGhpcy5rZXl9YH0pXG4gICAgICAgICAgfSwyMDAwKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxufVxuIl19