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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvaW5DbGFzcy5qcyJdLCJuYW1lcyI6WyJKb2luQ2xhc3MiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJjbGFzc0lkIiwia2V5IiwiY3JlYXRlQ2xhc3NJbmZvIiwibmFtZSIsImlzU2hhcmUiLCJtZXRob2RzIiwiYmluZElucHV0IiwiZSIsImN1cnJlbnRUYXJnZXQiLCJpZCIsImRldGFpbCIsInZhbHVlIiwiJGFwcGx5Iiwiam9pbk5vdyIsImNsYXNzX2lkIiwiam9pbl9rZXkiLCJ0aGVuIiwicmVzIiwic3VjY2VzcyIsInd4Iiwic2V0U3RvcmFnZSIsImNsYXNzIiwic2V0VGltZW91dCIsIndlcHkiLCJuYXZpZ2F0ZVRvIiwidXJsIiwib3B0aW9ucyIsImlzX3NoYXJlIiwiZ2V0U3RvcmFnZVN5bmMiLCJtZW1iZXJfaWQiLCJyZWRpcmVjdFRvIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQUNxQkEsUzs7Ozs7Ozs7Ozs7Ozs7NExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLGtCQUFZLEVBRFA7QUFFTEMsaUJBQVcsRUFGTjtBQUdMQyxlQUFTLENBQUMsQ0FITDtBQUlMQyxXQUFLLEVBSkE7QUFLTEMsdUJBQWlCLEVBTFo7QUFNTEMsWUFBTSxFQU5EO0FBT0xDLGVBQVM7QUFQSixLLFFBdUJQQyxPLEdBQVU7QUFDUkMsZUFEUSxxQkFDRUMsQ0FERixFQUNLO0FBQ1gsYUFBS0EsRUFBRUMsYUFBRixDQUFnQkMsRUFBckIsSUFBMkJGLEVBQUVHLE1BQUYsQ0FBU0MsS0FBcEM7QUFDQSxhQUFLQyxNQUFMO0FBQ0QsT0FKTztBQUtSQyxhQUxRLHFCQUtFO0FBQUE7O0FBQ1IscUNBQVU7QUFDUkMsb0JBQVUsS0FBS2QsT0FEUDtBQUVSZSxvQkFBVSxLQUFLZDtBQUZQLFNBQVYsRUFHR2UsSUFISCxDQUdRLGVBQU87QUFDYixjQUFHQyxJQUFJcEIsSUFBSixDQUFTcUIsT0FBWixFQUFxQjtBQUNuQixpQ0FBUSxRQUFSO0FBQ0FDLGVBQUdDLFVBQUgsQ0FBYztBQUNabkIsbUJBQUssV0FETztBQUVaSixvQkFBTW9CLElBQUlwQixJQUFKLENBQVN3QjtBQUZILGFBQWQ7QUFJQUMsdUJBQVcsWUFBTTtBQUNmQyw2QkFBS0MsVUFBTCxDQUFnQixFQUFDQyw4QkFBNEIsT0FBS3pCLE9BQWpDLHVCQUEwRCxPQUFLQyxHQUFoRSxFQUFoQjtBQUNELGFBRkQsRUFFRSxJQUZGO0FBR0Q7QUFDRixTQWREO0FBZUQ7QUFyQk8sSzs7Ozs7MkJBZEh5QixPLEVBQVM7QUFDZCxXQUFLMUIsT0FBTCxHQUFlMEIsUUFBUTFCLE9BQXZCO0FBQ0EsV0FBS0csSUFBTCxHQUFZdUIsUUFBUXZCLElBQXBCO0FBQ0EsV0FBS0YsR0FBTCxHQUFXeUIsUUFBUXpCLEdBQW5CO0FBQ0EsV0FBS0csT0FBTCxHQUFlc0IsUUFBUUMsUUFBdkI7QUFDQSxXQUFLN0IsVUFBTCxHQUFrQnFCLEdBQUdTLGNBQUgsQ0FBa0IsWUFBbEIsQ0FBbEI7QUFDQSxXQUFLaEIsTUFBTDtBQUNBLFVBQUksS0FBS1IsT0FBTCxJQUFnQixDQUFDLEtBQUtOLFVBQUwsQ0FBZ0IrQixTQUFyQyxFQUFnRDtBQUM5QztBQUNBVixXQUFHVyxVQUFILENBQWM7QUFDWkwsa0NBQXNCLEtBQUt6QixPQUEzQixjQUEyQyxLQUFLRyxJQUFoRCxhQUE0RCxLQUFLRjtBQURyRCxTQUFkO0FBR0Q7QUFDRjs7OztFQTFCb0NzQixlQUFLUSxJOztrQkFBdkJyQyxTIiwiZmlsZSI6ImpvaW5DbGFzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgeyBqb2luQ2xhc3MgfSBmcm9tICcuLi9hcGkvY3JlYXRlQ2xhc3MnXHJcbmltcG9ydCB7IHNob3dNc2cgfSBmcm9tICcuLi91dGlscy9jb21tb24nXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpvaW5DbGFzcyBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WIm+W7uuePree6pydcclxuICB9XHJcbiAgZGF0YSA9IHtcclxuICAgIG1lbWJlckluZm86IHt9LFxyXG4gICAgY2xhc3NJbmZvOiB7fSxcclxuICAgIGNsYXNzSWQ6IC0xLFxyXG4gICAga2V5OiAnJyxcclxuICAgIGNyZWF0ZUNsYXNzSW5mbzoge30sXHJcbiAgICBuYW1lOiAnJyxcclxuICAgIGlzU2hhcmU6ICcnXHJcbiAgfVxyXG4gIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICB0aGlzLmNsYXNzSWQgPSBvcHRpb25zLmNsYXNzSWRcclxuICAgIHRoaXMubmFtZSA9IG9wdGlvbnMubmFtZVxyXG4gICAgdGhpcy5rZXkgPSBvcHRpb25zLmtleVxyXG4gICAgdGhpcy5pc1NoYXJlID0gb3B0aW9ucy5pc19zaGFyZVxyXG4gICAgdGhpcy5tZW1iZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nKVxyXG4gICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgaWYgKHRoaXMuaXNTaGFyZSAmJiAhdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCkge1xyXG4gICAgICAvLyDlpoLmnpzmmK/ku47liIbkuqvpk77mjqXov5vlhaXkuJTmsqHmnInms6jlhozvvIzlhYjotbDms6jlhozmtYHnqItcclxuICAgICAgd3gucmVkaXJlY3RUbyh7XHJcbiAgICAgICAgdXJsOiBgbG9naW4/Y2xhc3NJZD0ke3RoaXMuY2xhc3NJZH0mbmFtZT0ke3RoaXMubmFtZX0ma2V5PSR7dGhpcy5rZXl9YFxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuICBtZXRob2RzID0ge1xyXG4gICAgYmluZElucHV0KGUpIHtcclxuICAgICAgdGhpc1tlLmN1cnJlbnRUYXJnZXQuaWRdID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSxcclxuICAgIGpvaW5Ob3coKSB7XHJcbiAgICAgIGpvaW5DbGFzcyh7XHJcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJZCxcclxuICAgICAgICBqb2luX2tleTogdGhpcy5rZXlcclxuICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgIGlmKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgIHNob3dNc2coJ+aIkOWKn+WKoOWFpeePree6pycpXHJcbiAgICAgICAgICB3eC5zZXRTdG9yYWdlKHtcclxuICAgICAgICAgICAga2V5OiAnY2xhc3NJbmZvJyxcclxuICAgICAgICAgICAgZGF0YTogcmVzLmRhdGEuY2xhc3NcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6IGBiaW5kUmVsYXRpb25zaGlwP2lkPSR7dGhpcy5jbGFzc0lkfSZ0eXBlPWpvaW4ma2V5PSR7dGhpcy5rZXl9YH0pXHJcbiAgICAgICAgICB9LDIwMDApXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=