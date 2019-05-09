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
      moneyInput: String
    }, _this.methods = {
      bindInput: function bindInput(e) {
        this.$emit('input', e.detail.value);
      },
      cancelFn: function cancelFn() {
        this.$emit('cancel');
      },
      sureFn: function sureFn() {
        if (this.moneyInput <= 0) {
          (0, _common.showMsg)('请输入金额');
          return;
        }
        this.$emit('sure', this.moneyInput);
        this.$apply();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhc2hNb2RhbC5qcyJdLCJuYW1lcyI6WyJDdXJyZW50TW9kYWwiLCJwcm9wcyIsImZsYWciLCJCb29sZWFuIiwibW9uZXlJbnB1dCIsIlN0cmluZyIsIm1ldGhvZHMiLCJiaW5kSW5wdXQiLCJlIiwiJGVtaXQiLCJkZXRhaWwiLCJ2YWx1ZSIsImNhbmNlbEZuIiwic3VyZUZuIiwiJGFwcGx5Iiwid2VweSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztJQUNxQkEsWTs7Ozs7Ozs7Ozs7Ozs7a01BQ25CQyxLLEdBQVE7QUFDTkMsWUFBTUMsT0FEQTtBQUVOQyxrQkFBWUM7QUFGTixLLFFBT1JDLE8sR0FBVTtBQUNSQyxlQURRLHFCQUNHQyxDQURILEVBQ007QUFDWixhQUFLQyxLQUFMLENBQVcsT0FBWCxFQUFvQkQsRUFBRUUsTUFBRixDQUFTQyxLQUE3QjtBQUNELE9BSE87QUFJUkMsY0FKUSxzQkFJSTtBQUNWLGFBQUtILEtBQUwsQ0FBVyxRQUFYO0FBQ0QsT0FOTztBQU9SSSxZQVBRLG9CQU9FO0FBQ1IsWUFBSSxLQUFLVCxVQUFMLElBQW1CLENBQXZCLEVBQTBCO0FBQ3hCLCtCQUFRLE9BQVI7QUFDQTtBQUNEO0FBQ0QsYUFBS0ssS0FBTCxDQUFXLE1BQVgsRUFBbUIsS0FBS0wsVUFBeEI7QUFDQSxhQUFLVSxNQUFMO0FBQ0Q7QUFkTyxLOzs7Ozs2QkFIRCxDQUVSOzs7O0VBUHVDQyxlQUFLQyxTOztrQkFBMUJoQixZIiwiZmlsZSI6ImNhc2hNb2RhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7IHNob3dNc2csIGlzRW1wdHlTdHJpbmcgfSBmcm9tICcuLi91dGlscy9jb21tb24nXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdXJyZW50TW9kYWwgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gIHByb3BzID0ge1xuICAgIGZsYWc6IEJvb2xlYW4sXG4gICAgbW9uZXlJbnB1dDogU3RyaW5nXG4gIH1cbiAgb25Mb2FkKCkge1xuXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBiaW5kSW5wdXQgKGUpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ2lucHV0JywgZS5kZXRhaWwudmFsdWUpXG4gICAgfSxcbiAgICBjYW5jZWxGbiAoKSB7XG4gICAgICB0aGlzLiRlbWl0KCdjYW5jZWwnKVxuICAgIH0sXG4gICAgc3VyZUZuICgpIHtcbiAgICAgIGlmICh0aGlzLm1vbmV5SW5wdXQgPD0gMCkge1xuICAgICAgICBzaG93TXNnKCfor7fovpPlhaXph5Hpop0nKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHRoaXMuJGVtaXQoJ3N1cmUnLCB0aGlzLm1vbmV5SW5wdXQpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG59XG4iXX0=