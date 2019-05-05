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

var SelectModal = function (_wepy$component) {
  _inherits(SelectModal, _wepy$component);

  function SelectModal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SelectModal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SelectModal.__proto__ || Object.getPrototypeOf(SelectModal)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      flag: Boolean,
      list: Array
    }, _this.data = {
      ids: []
    }, _this.methods = {
      pickerChange: function pickerChange(e) {
        this.ids = e.detail.value;
        this.$apply();
      },
      cancelFn: function cancelFn() {
        this.$emit('cancel', 'selectFlag', false);
      },
      sureFn: function sureFn() {
        this.$emit('sure', this.ids);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SelectModal, [{
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return SelectModal;
}(_wepy2.default.component);

exports.default = SelectModal;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbGVjdE1vZGFsLmpzIl0sIm5hbWVzIjpbIlNlbGVjdE1vZGFsIiwicHJvcHMiLCJmbGFnIiwiQm9vbGVhbiIsImxpc3QiLCJBcnJheSIsImRhdGEiLCJpZHMiLCJtZXRob2RzIiwicGlja2VyQ2hhbmdlIiwiZSIsImRldGFpbCIsInZhbHVlIiwiJGFwcGx5IiwiY2FuY2VsRm4iLCIkZW1pdCIsInN1cmVGbiIsIndlcHkiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFc7Ozs7Ozs7Ozs7Ozs7O2dNQUNuQkMsSyxHQUFRO0FBQ05DLFlBQU1DLE9BREE7QUFFTkMsWUFBTUM7QUFGQSxLLFFBT1JDLEksR0FBTztBQUNMQyxXQUFLO0FBREEsSyxRQUdQQyxPLEdBQVU7QUFDUkMsa0JBRFEsd0JBQ01DLENBRE4sRUFDUztBQUNmLGFBQUtILEdBQUwsR0FBV0csRUFBRUMsTUFBRixDQUFTQyxLQUFwQjtBQUNBLGFBQUtDLE1BQUw7QUFDRCxPQUpPO0FBS1JDLGNBTFEsc0JBS0k7QUFDVixhQUFLQyxLQUFMLENBQVcsUUFBWCxFQUFxQixZQUFyQixFQUFtQyxLQUFuQztBQUNELE9BUE87QUFRUkMsWUFSUSxvQkFRRTtBQUNSLGFBQUtELEtBQUwsQ0FBVyxNQUFYLEVBQW1CLEtBQUtSLEdBQXhCO0FBQ0Q7QUFWTyxLOzs7Ozs2QkFORCxDQUVSOzs7O0VBUHNDVSxlQUFLQyxTOztrQkFBekJsQixXIiwiZmlsZSI6InNlbGVjdE1vZGFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VsZWN0TW9kYWwgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gIHByb3BzID0ge1xuICAgIGZsYWc6IEJvb2xlYW4sXG4gICAgbGlzdDogQXJyYXlcbiAgfVxuICBvbkxvYWQoKSB7XG5cbiAgfVxuICBkYXRhID0ge1xuICAgIGlkczogW11cbiAgfVxuICBtZXRob2RzID0ge1xuICAgIHBpY2tlckNoYW5nZSAoZSkge1xuICAgICAgdGhpcy5pZHMgPSBlLmRldGFpbC52YWx1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgY2FuY2VsRm4gKCkge1xuICAgICAgdGhpcy4kZW1pdCgnY2FuY2VsJywgJ3NlbGVjdEZsYWcnLCBmYWxzZSlcbiAgICB9LFxuICAgIHN1cmVGbiAoKSB7XG4gICAgICB0aGlzLiRlbWl0KCdzdXJlJywgdGhpcy5pZHMpXG4gICAgfVxuICB9XG59XG4iXX0=