'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _common = require('./../utils/common.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Modal = function (_wepy$component) {
  _inherits(Modal, _wepy$component);

  function Modal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Modal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Modal.__proto__ || Object.getPrototypeOf(Modal)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '财务记账'
    }, _this.props = {
      cancelBtnText: String,
      sureBtnText: String,
      placeholderText: String,
      flag: Boolean
    }, _this.data = {
      input: ''
    }, _this.methods = {
      bindInput: function bindInput(e) {
        this.input = e.detail.value;
        this.$apply();
      },
      cancelFn: function cancelFn() {
        this.$emit('cancel');
      },
      sureFn: function sureFn(type) {
        console.log(type);
        if ((0, _common.isEmptyString)(this.input)) {
          (0, _common.showMsg)('请输入活动项目名称');
          return;
        }
        this.$emit('sure', this.input, type);
        this.input = '';
        this.$apply();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Modal, [{
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return Modal;
}(_wepy2.default.component);

exports.default = Modal;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGFsLmpzIl0sIm5hbWVzIjpbIk1vZGFsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsInByb3BzIiwiY2FuY2VsQnRuVGV4dCIsIlN0cmluZyIsInN1cmVCdG5UZXh0IiwicGxhY2Vob2xkZXJUZXh0IiwiZmxhZyIsIkJvb2xlYW4iLCJkYXRhIiwiaW5wdXQiLCJtZXRob2RzIiwiYmluZElucHV0IiwiZSIsImRldGFpbCIsInZhbHVlIiwiJGFwcGx5IiwiY2FuY2VsRm4iLCIkZW1pdCIsInN1cmVGbiIsInR5cGUiLCJjb25zb2xlIiwibG9nIiwid2VweSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztJQUNxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSyxHQUFRO0FBQ05DLHFCQUFlQyxNQURUO0FBRU5DLG1CQUFhRCxNQUZQO0FBR05FLHVCQUFpQkYsTUFIWDtBQUlORyxZQUFNQztBQUpBLEssUUFTUkMsSSxHQUFPO0FBQ0xDLGFBQU87QUFERixLLFFBR1BDLE8sR0FBVTtBQUNSQyxlQURRLHFCQUNHQyxDQURILEVBQ007QUFDWixhQUFLSCxLQUFMLEdBQWFHLEVBQUVDLE1BQUYsQ0FBU0MsS0FBdEI7QUFDQSxhQUFLQyxNQUFMO0FBQ0QsT0FKTztBQUtSQyxjQUxRLHNCQUtJO0FBQ1YsYUFBS0MsS0FBTCxDQUFXLFFBQVg7QUFDRCxPQVBPO0FBUVJDLFlBUlEsa0JBUUFDLElBUkEsRUFRTTtBQUNaQyxnQkFBUUMsR0FBUixDQUFZRixJQUFaO0FBQ0EsWUFBSSwyQkFBYyxLQUFLVixLQUFuQixDQUFKLEVBQStCO0FBQzdCLCtCQUFRLFdBQVI7QUFDQTtBQUNEO0FBQ0QsYUFBS1EsS0FBTCxDQUFXLE1BQVgsRUFBbUIsS0FBS1IsS0FBeEIsRUFBK0JVLElBQS9CO0FBQ0EsYUFBS1YsS0FBTCxHQUFhLEVBQWI7QUFDQSxhQUFLTSxNQUFMO0FBQ0Q7QUFqQk8sSzs7Ozs7NkJBTkQsQ0FFUjs7OztFQVpnQ08sZUFBS0MsUzs7a0JBQW5CekIsSyIsImZpbGUiOiJtb2RhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgeyBzaG93TXNnLCBpc0VtcHR5U3RyaW5nIH0gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RhbCBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6LSi5Yqh6K6w6LSmJ1xyXG4gIH1cclxuICBwcm9wcyA9IHtcclxuICAgIGNhbmNlbEJ0blRleHQ6IFN0cmluZyxcclxuICAgIHN1cmVCdG5UZXh0OiBTdHJpbmcsXHJcbiAgICBwbGFjZWhvbGRlclRleHQ6IFN0cmluZyxcclxuICAgIGZsYWc6IEJvb2xlYW5cclxuICB9XHJcbiAgb25Mb2FkKCkge1xyXG5cclxuICB9XHJcbiAgZGF0YSA9IHtcclxuICAgIGlucHV0OiAnJ1xyXG4gIH1cclxuICBtZXRob2RzID0ge1xyXG4gICAgYmluZElucHV0IChlKSB7XHJcbiAgICAgIHRoaXMuaW5wdXQgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9LFxyXG4gICAgY2FuY2VsRm4gKCkge1xyXG4gICAgICB0aGlzLiRlbWl0KCdjYW5jZWwnKVxyXG4gICAgfSxcclxuICAgIHN1cmVGbiAodHlwZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyh0eXBlKVxyXG4gICAgICBpZiAoaXNFbXB0eVN0cmluZyh0aGlzLmlucHV0KSkge1xyXG4gICAgICAgIHNob3dNc2coJ+ivt+i+k+WFpea0u+WKqOmhueebruWQjeensCcpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy4kZW1pdCgnc3VyZScsIHRoaXMuaW5wdXQsIHR5cGUpXHJcbiAgICAgIHRoaXMuaW5wdXQgPSAnJ1xyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==