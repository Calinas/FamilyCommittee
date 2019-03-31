'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CurrentModal = function (_wepy$component) {
  _inherits(CurrentModal, _wepy$component);

  function CurrentModal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CurrentModal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CurrentModal.__proto__ || Object.getPrototypeOf(CurrentModal)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      flag: Boolean,
      title: String,
      imgSrc: String
    }, _this.methods = {
      cancelFn: function cancelFn() {
        this.$emit('cancel', 'showShareFlag', false);
      },
      sureFn: function sureFn() {
        this.$emit('sure', 'showShareFlag', false);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CurrentModal, [{
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return CurrentModal;
}(_wepy2.default.component);

exports.default = CurrentModal;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlTW9kYWwuanMiXSwibmFtZXMiOlsiQ3VycmVudE1vZGFsIiwicHJvcHMiLCJmbGFnIiwiQm9vbGVhbiIsInRpdGxlIiwiU3RyaW5nIiwiaW1nU3JjIiwibWV0aG9kcyIsImNhbmNlbEZuIiwiJGVtaXQiLCJzdXJlRm4iLCJ3ZXB5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxZOzs7Ozs7Ozs7Ozs7OztrTUFDbkJDLEssR0FBUTtBQUNOQyxZQUFNQyxPQURBO0FBRU5DLGFBQU9DLE1BRkQ7QUFHTkMsY0FBUUQ7QUFIRixLLFFBUVJFLE8sR0FBVTtBQUNSQyxjQURRLHNCQUNJO0FBQ1YsYUFBS0MsS0FBTCxDQUFXLFFBQVgsRUFBcUIsZUFBckIsRUFBc0MsS0FBdEM7QUFDRCxPQUhPO0FBSVJDLFlBSlEsb0JBSUU7QUFDUixhQUFLRCxLQUFMLENBQVcsTUFBWCxFQUFtQixlQUFuQixFQUFvQyxLQUFwQztBQUNEO0FBTk8sSzs7Ozs7NkJBSEQsQ0FFUjs7OztFQVJ1Q0UsZUFBS0MsUzs7a0JBQTFCWixZIiwiZmlsZSI6InNoYXJlTW9kYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3VycmVudE1vZGFsIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gIHByb3BzID0ge1xyXG4gICAgZmxhZzogQm9vbGVhbixcclxuICAgIHRpdGxlOiBTdHJpbmcsXHJcbiAgICBpbWdTcmM6IFN0cmluZ1xyXG4gIH1cclxuICBvbkxvYWQoKSB7XHJcblxyXG4gIH1cclxuICBtZXRob2RzID0ge1xyXG4gICAgY2FuY2VsRm4gKCkge1xyXG4gICAgICB0aGlzLiRlbWl0KCdjYW5jZWwnLCAnc2hvd1NoYXJlRmxhZycsIGZhbHNlKVxyXG4gICAgfSxcclxuICAgIHN1cmVGbiAoKSB7XHJcbiAgICAgIHRoaXMuJGVtaXQoJ3N1cmUnLCAnc2hvd1NoYXJlRmxhZycsIGZhbHNlKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=