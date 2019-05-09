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

var Modal2 = function (_wepy$component) {
  _inherits(Modal2, _wepy$component);

  function Modal2() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Modal2);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Modal2.__proto__ || Object.getPrototypeOf(Modal2)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      cancelBtnText: String,
      sureBtnText: String,
      placeholderText: String,
      placeholderText2: String,
      flag: Boolean
    }, _this.data = {
      input: '',
      money: ''
    }, _this.methods = {
      bindInput: function bindInput(e) {
        this[e.currentTarget.id] = e.detail.value;
        this.$apply();
      },
      cancelFn: function cancelFn() {
        this.$emit('cancel');
      },
      sureFn: function sureFn(type) {
        if ((0, _common.isEmptyString)(this.input)) {
          (0, _common.showMsg)('请输入项目名称');
          return;
        }
        this.$emit('sure', this.input, this.money, type);
        this.input = '';
        this.money = '';
        this.$apply();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Modal2, [{
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return Modal2;
}(_wepy2.default.component);

exports.default = Modal2;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGFsMi5qcyJdLCJuYW1lcyI6WyJNb2RhbDIiLCJwcm9wcyIsImNhbmNlbEJ0blRleHQiLCJTdHJpbmciLCJzdXJlQnRuVGV4dCIsInBsYWNlaG9sZGVyVGV4dCIsInBsYWNlaG9sZGVyVGV4dDIiLCJmbGFnIiwiQm9vbGVhbiIsImRhdGEiLCJpbnB1dCIsIm1vbmV5IiwibWV0aG9kcyIsImJpbmRJbnB1dCIsImUiLCJjdXJyZW50VGFyZ2V0IiwiaWQiLCJkZXRhaWwiLCJ2YWx1ZSIsIiRhcHBseSIsImNhbmNlbEZuIiwiJGVtaXQiLCJzdXJlRm4iLCJ0eXBlIiwid2VweSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztJQUNxQkEsTTs7Ozs7Ozs7Ozs7Ozs7c0xBQ25CQyxLLEdBQVE7QUFDTkMscUJBQWVDLE1BRFQ7QUFFTkMsbUJBQWFELE1BRlA7QUFHTkUsdUJBQWlCRixNQUhYO0FBSU5HLHdCQUFrQkgsTUFKWjtBQUtOSSxZQUFNQztBQUxBLEssUUFVUkMsSSxHQUFPO0FBQ0xDLGFBQU8sRUFERjtBQUVMQyxhQUFPO0FBRkYsSyxRQUlQQyxPLEdBQVU7QUFDUkMsZUFEUSxxQkFDR0MsQ0FESCxFQUNNO0FBQ1osYUFBS0EsRUFBRUMsYUFBRixDQUFnQkMsRUFBckIsSUFBMkJGLEVBQUVHLE1BQUYsQ0FBU0MsS0FBcEM7QUFDQSxhQUFLQyxNQUFMO0FBQ0QsT0FKTztBQUtSQyxjQUxRLHNCQUtJO0FBQ1YsYUFBS0MsS0FBTCxDQUFXLFFBQVg7QUFDRCxPQVBPO0FBUVJDLFlBUlEsa0JBUUFDLElBUkEsRUFRTTtBQUNaLFlBQUksMkJBQWMsS0FBS2IsS0FBbkIsQ0FBSixFQUErQjtBQUM3QiwrQkFBUSxTQUFSO0FBQ0E7QUFDRDtBQUNELGFBQUtXLEtBQUwsQ0FBVyxNQUFYLEVBQW1CLEtBQUtYLEtBQXhCLEVBQStCLEtBQUtDLEtBQXBDLEVBQTJDWSxJQUEzQztBQUNBLGFBQUtiLEtBQUwsR0FBYSxFQUFiO0FBQ0EsYUFBS0MsS0FBTCxHQUFhLEVBQWI7QUFDQSxhQUFLUSxNQUFMO0FBQ0Q7QUFqQk8sSzs7Ozs7NkJBUEQsQ0FFUjs7OztFQVZpQ0ssZUFBS0MsUzs7a0JBQXBCekIsTSIsImZpbGUiOiJtb2RhbDIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgeyBzaG93TXNnLCBpc0VtcHR5U3RyaW5nIH0gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kYWwyIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICBwcm9wcyA9IHtcbiAgICBjYW5jZWxCdG5UZXh0OiBTdHJpbmcsXG4gICAgc3VyZUJ0blRleHQ6IFN0cmluZyxcbiAgICBwbGFjZWhvbGRlclRleHQ6IFN0cmluZyxcbiAgICBwbGFjZWhvbGRlclRleHQyOiBTdHJpbmcsXG4gICAgZmxhZzogQm9vbGVhblxuICB9XG4gIG9uTG9hZCgpIHtcblxuICB9XG4gIGRhdGEgPSB7XG4gICAgaW5wdXQ6ICcnLFxuICAgIG1vbmV5OiAnJ1xuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgYmluZElucHV0IChlKSB7XG4gICAgICB0aGlzW2UuY3VycmVudFRhcmdldC5pZF0gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgY2FuY2VsRm4gKCkge1xuICAgICAgdGhpcy4kZW1pdCgnY2FuY2VsJylcbiAgICB9LFxuICAgIHN1cmVGbiAodHlwZSkge1xuICAgICAgaWYgKGlzRW1wdHlTdHJpbmcodGhpcy5pbnB1dCkpIHtcbiAgICAgICAgc2hvd01zZygn6K+36L6T5YWl6aG555uu5ZCN56ewJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB0aGlzLiRlbWl0KCdzdXJlJywgdGhpcy5pbnB1dCwgdGhpcy5tb25leSwgdHlwZSlcbiAgICAgIHRoaXMuaW5wdXQgPSAnJ1xuICAgICAgdGhpcy5tb25leSA9ICcnXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG59XG4iXX0=