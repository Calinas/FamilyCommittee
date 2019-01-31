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

var nextStep = function (_wepy$component) {
  _inherits(nextStep, _wepy$component);

  function nextStep() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, nextStep);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = nextStep.__proto__ || Object.getPrototypeOf(nextStep)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      title: {
        type: String,
        default: Boolean
      }
    }, _this.methods = {
      tap: function tap() {
        console.log('click');
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return nextStep;
}(_wepy2.default.component);

exports.default = nextStep;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5leHRTdGVwLmpzIl0sIm5hbWVzIjpbIm5leHRTdGVwIiwicHJvcHMiLCJ0aXRsZSIsInR5cGUiLCJTdHJpbmciLCJkZWZhdWx0IiwiQm9vbGVhbiIsIm1ldGhvZHMiLCJ0YXAiLCJjb25zb2xlIiwibG9nIiwid2VweSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzBMQUNuQkMsSyxHQUFRO0FBQ05DLGFBQU87QUFDTEMsY0FBTUMsTUFERDtBQUVMQyxpQkFBU0M7QUFGSjtBQURELEssUUFNUkMsTyxHQUFVO0FBQ1JDLFNBRFEsaUJBQ0g7QUFDSEMsZ0JBQVFDLEdBQVIsQ0FBWSxPQUFaO0FBQ0Q7QUFITyxLOzs7O0VBUDBCQyxlQUFLQyxTOztrQkFBdEJaLFEiLCJmaWxlIjoibmV4dFN0ZXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgbmV4dFN0ZXAgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudHtcbiAgcHJvcHMgPSB7XG4gICAgdGl0bGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6IEJvb2xlYW5cbiAgICB9XG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICB0YXAoKXtcbiAgICAgIGNvbnNvbGUubG9nKCdjbGljaycpXG4gICAgfVxuICB9XG59XG4iXX0=