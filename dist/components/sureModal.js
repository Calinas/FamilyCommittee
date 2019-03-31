'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SureModal = function (_wepy$component) {
  _inherits(SureModal, _wepy$component);

  function SureModal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SureModal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SureModal.__proto__ || Object.getPrototypeOf(SureModal)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      flag: Boolean,
      title: String
    }, _this.methods = {
      cancelFn: function cancelFn() {
        this.$emit('cancel', 'showSureFlag', false);
      },
      sureFn: function sureFn() {
        this.$emit('sure', 'showSureFlag', true);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return SureModal;
}(_wepy2.default.component);

exports.default = SureModal;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN1cmVNb2RhbC5qcyJdLCJuYW1lcyI6WyJTdXJlTW9kYWwiLCJwcm9wcyIsImZsYWciLCJCb29sZWFuIiwidGl0bGUiLCJTdHJpbmciLCJtZXRob2RzIiwiY2FuY2VsRm4iLCIkZW1pdCIsInN1cmVGbiIsIndlcHkiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLEssR0FBUTtBQUNOQyxZQUFNQyxPQURBO0FBRU5DLGFBQU9DO0FBRkQsSyxRQUlSQyxPLEdBQVU7QUFDUkMsY0FEUSxzQkFDSTtBQUNWLGFBQUtDLEtBQUwsQ0FBVyxRQUFYLEVBQXFCLGNBQXJCLEVBQXFDLEtBQXJDO0FBQ0QsT0FITztBQUlSQyxZQUpRLG9CQUlFO0FBQ1IsYUFBS0QsS0FBTCxDQUFXLE1BQVgsRUFBbUIsY0FBbkIsRUFBbUMsSUFBbkM7QUFDRDtBQU5PLEs7Ozs7RUFMMkJFLGVBQUtDLFM7O2tCQUF2QlgsUyIsImZpbGUiOiJzdXJlTW9kYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3VyZU1vZGFsIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gIHByb3BzID0ge1xyXG4gICAgZmxhZzogQm9vbGVhbixcclxuICAgIHRpdGxlOiBTdHJpbmdcclxuICB9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGNhbmNlbEZuICgpIHtcclxuICAgICAgdGhpcy4kZW1pdCgnY2FuY2VsJywgJ3Nob3dTdXJlRmxhZycsIGZhbHNlKVxyXG4gICAgfSxcclxuICAgIHN1cmVGbiAoKSB7XHJcbiAgICAgIHRoaXMuJGVtaXQoJ3N1cmUnLCAnc2hvd1N1cmVGbGFnJywgdHJ1ZSlcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19