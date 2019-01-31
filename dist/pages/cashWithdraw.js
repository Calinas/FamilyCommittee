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

var CashWithdrawal = function (_wepy$page) {
  _inherits(CashWithdrawal, _wepy$page);

  function CashWithdrawal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CashWithdrawal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CashWithdrawal.__proto__ || Object.getPrototypeOf(CashWithdrawal)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '收款提现'
    }, _this.data = {
      money: '',
      memberInfo: null
    }, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CashWithdrawal, [{
    key: 'onLoad',
    value: function onLoad() {
      var globalData = this.$parent.globalData;
      this.memberInfo = globalData.memberInfo;
      this.classInfo = globalData.classInfo;
      this.$apply();
    }
  }]);

  return CashWithdrawal;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(CashWithdrawal , 'pages/cashWithdraw'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhc2hXaXRoZHJhdy5qcyJdLCJuYW1lcyI6WyJDYXNoV2l0aGRyYXdhbCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwibW9uZXkiLCJtZW1iZXJJbmZvIiwibWV0aG9kcyIsImdsb2JhbERhdGEiLCIkcGFyZW50IiwiY2xhc3NJbmZvIiwiJGFwcGx5Iiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLGM7Ozs7Ozs7Ozs7Ozs7O3NNQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsa0JBQVk7QUFGUCxLLFFBVVBDLE8sR0FBVSxFOzs7Ozs2QkFORDtBQUNQLFVBQU1DLGFBQWEsS0FBS0MsT0FBTCxDQUFhRCxVQUFoQztBQUNBLFdBQUtGLFVBQUwsR0FBa0JFLFdBQVdGLFVBQTdCO0FBQ0EsV0FBS0ksU0FBTCxHQUFpQkYsV0FBV0UsU0FBNUI7QUFDQSxXQUFLQyxNQUFMO0FBQ0Q7Ozs7RUFieUNDLGVBQUtDLEk7O2tCQUE1QlosYyIsImZpbGUiOiJjYXNoV2l0aGRyYXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FzaFdpdGhkcmF3YWwgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmlLbmrL7mj5DnjrAnXHJcbiAgfVxyXG4gIGRhdGEgPSB7XHJcbiAgICBtb25leTogJycsXHJcbiAgICBtZW1iZXJJbmZvOiBudWxsXHJcbiAgfVxyXG4gIG9uTG9hZCgpIHtcclxuICAgIGNvbnN0IGdsb2JhbERhdGEgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YVxyXG4gICAgdGhpcy5tZW1iZXJJbmZvID0gZ2xvYmFsRGF0YS5tZW1iZXJJbmZvXHJcbiAgICB0aGlzLmNsYXNzSW5mbyA9IGdsb2JhbERhdGEuY2xhc3NJbmZvXHJcbiAgICB0aGlzLiRhcHBseSgpXHJcbiAgfVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgfVxyXG59XHJcbiJdfQ==