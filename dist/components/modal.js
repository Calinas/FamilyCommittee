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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGFsLmpzIl0sIm5hbWVzIjpbIk1vZGFsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsInByb3BzIiwiY2FuY2VsQnRuVGV4dCIsIlN0cmluZyIsInN1cmVCdG5UZXh0IiwicGxhY2Vob2xkZXJUZXh0IiwiZmxhZyIsIkJvb2xlYW4iLCJkYXRhIiwiaW5wdXQiLCJtZXRob2RzIiwiYmluZElucHV0IiwiZSIsImRldGFpbCIsInZhbHVlIiwiJGFwcGx5IiwiY2FuY2VsRm4iLCIkZW1pdCIsInN1cmVGbiIsInR5cGUiLCJ3ZXB5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0lBQ3FCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxLLEdBQVE7QUFDTkMscUJBQWVDLE1BRFQ7QUFFTkMsbUJBQWFELE1BRlA7QUFHTkUsdUJBQWlCRixNQUhYO0FBSU5HLFlBQU1DO0FBSkEsSyxRQVNSQyxJLEdBQU87QUFDTEMsYUFBTztBQURGLEssUUFHUEMsTyxHQUFVO0FBQ1JDLGVBRFEscUJBQ0dDLENBREgsRUFDTTtBQUNaLGFBQUtILEtBQUwsR0FBYUcsRUFBRUMsTUFBRixDQUFTQyxLQUF0QjtBQUNBLGFBQUtDLE1BQUw7QUFDRCxPQUpPO0FBS1JDLGNBTFEsc0JBS0k7QUFDVixhQUFLQyxLQUFMLENBQVcsUUFBWDtBQUNELE9BUE87QUFRUkMsWUFSUSxrQkFRQUMsSUFSQSxFQVFNO0FBQ1osWUFBSSwyQkFBYyxLQUFLVixLQUFuQixDQUFKLEVBQStCO0FBQzdCLCtCQUFRLFdBQVI7QUFDQTtBQUNEO0FBQ0QsYUFBS1EsS0FBTCxDQUFXLE1BQVgsRUFBbUIsS0FBS1IsS0FBeEIsRUFBK0JVLElBQS9CO0FBQ0EsYUFBS1YsS0FBTCxHQUFhLEVBQWI7QUFDQSxhQUFLTSxNQUFMO0FBQ0Q7QUFoQk8sSzs7Ozs7NkJBTkQsQ0FFUjs7OztFQVpnQ0ssZUFBS0MsUzs7a0JBQW5CdkIsSyIsImZpbGUiOiJtb2RhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7IHNob3dNc2csIGlzRW1wdHlTdHJpbmcgfSBmcm9tICcuLi91dGlscy9jb21tb24nXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RhbCBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfotKLliqHorrDotKYnXG4gIH1cbiAgcHJvcHMgPSB7XG4gICAgY2FuY2VsQnRuVGV4dDogU3RyaW5nLFxuICAgIHN1cmVCdG5UZXh0OiBTdHJpbmcsXG4gICAgcGxhY2Vob2xkZXJUZXh0OiBTdHJpbmcsXG4gICAgZmxhZzogQm9vbGVhblxuICB9XG4gIG9uTG9hZCgpIHtcblxuICB9XG4gIGRhdGEgPSB7XG4gICAgaW5wdXQ6ICcnXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBiaW5kSW5wdXQgKGUpIHtcbiAgICAgIHRoaXMuaW5wdXQgPSBlLmRldGFpbC52YWx1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgY2FuY2VsRm4gKCkge1xuICAgICAgdGhpcy4kZW1pdCgnY2FuY2VsJylcbiAgICB9LFxuICAgIHN1cmVGbiAodHlwZSkge1xuICAgICAgaWYgKGlzRW1wdHlTdHJpbmcodGhpcy5pbnB1dCkpIHtcbiAgICAgICAgc2hvd01zZygn6K+36L6T5YWl5rS75Yqo6aG555uu5ZCN56ewJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB0aGlzLiRlbWl0KCdzdXJlJywgdGhpcy5pbnB1dCwgdHlwZSlcbiAgICAgIHRoaXMuaW5wdXQgPSAnJ1xuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxufVxuIl19