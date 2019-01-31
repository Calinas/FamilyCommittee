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
      sureFn: function sureFn() {
        if ((0, _common.isEmptyString)(this.input)) {
          (0, _common.showMsg)('请输入项目名称');
          return;
        }
        this.$emit('sure', this.input, this.money);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGFsMi5qcyJdLCJuYW1lcyI6WyJNb2RhbDIiLCJwcm9wcyIsImNhbmNlbEJ0blRleHQiLCJTdHJpbmciLCJzdXJlQnRuVGV4dCIsInBsYWNlaG9sZGVyVGV4dCIsInBsYWNlaG9sZGVyVGV4dDIiLCJmbGFnIiwiQm9vbGVhbiIsImRhdGEiLCJpbnB1dCIsIm1vbmV5IiwibWV0aG9kcyIsImJpbmRJbnB1dCIsImUiLCJjdXJyZW50VGFyZ2V0IiwiaWQiLCJkZXRhaWwiLCJ2YWx1ZSIsIiRhcHBseSIsImNhbmNlbEZuIiwiJGVtaXQiLCJzdXJlRm4iLCJ3ZXB5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0lBQ3FCQSxNOzs7Ozs7Ozs7Ozs7OztzTEFDbkJDLEssR0FBUTtBQUNOQyxxQkFBZUMsTUFEVDtBQUVOQyxtQkFBYUQsTUFGUDtBQUdORSx1QkFBaUJGLE1BSFg7QUFJTkcsd0JBQWtCSCxNQUpaO0FBS05JLFlBQU1DO0FBTEEsSyxRQVVSQyxJLEdBQU87QUFDTEMsYUFBTyxFQURGO0FBRUxDLGFBQU87QUFGRixLLFFBSVBDLE8sR0FBVTtBQUNSQyxlQURRLHFCQUNHQyxDQURILEVBQ007QUFDWixhQUFLQSxFQUFFQyxhQUFGLENBQWdCQyxFQUFyQixJQUEyQkYsRUFBRUcsTUFBRixDQUFTQyxLQUFwQztBQUNBLGFBQUtDLE1BQUw7QUFDRCxPQUpPO0FBS1JDLGNBTFEsc0JBS0k7QUFDVixhQUFLQyxLQUFMLENBQVcsUUFBWDtBQUNELE9BUE87QUFRUkMsWUFSUSxvQkFRRTtBQUNSLFlBQUksMkJBQWMsS0FBS1osS0FBbkIsQ0FBSixFQUErQjtBQUM3QiwrQkFBUSxTQUFSO0FBQ0E7QUFDRDtBQUNELGFBQUtXLEtBQUwsQ0FBVyxNQUFYLEVBQW1CLEtBQUtYLEtBQXhCLEVBQStCLEtBQUtDLEtBQXBDO0FBQ0EsYUFBS0QsS0FBTCxHQUFhLEVBQWI7QUFDQSxhQUFLQyxLQUFMLEdBQWEsRUFBYjtBQUNBLGFBQUtRLE1BQUw7QUFDRDtBQWpCTyxLOzs7Ozs2QkFQRCxDQUVSOzs7O0VBVmlDSSxlQUFLQyxTOztrQkFBcEJ4QixNIiwiZmlsZSI6Im1vZGFsMi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7IHNob3dNc2csIGlzRW1wdHlTdHJpbmcgfSBmcm9tICcuLi91dGlscy9jb21tb24nXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RhbDIgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gIHByb3BzID0ge1xuICAgIGNhbmNlbEJ0blRleHQ6IFN0cmluZyxcbiAgICBzdXJlQnRuVGV4dDogU3RyaW5nLFxuICAgIHBsYWNlaG9sZGVyVGV4dDogU3RyaW5nLFxuICAgIHBsYWNlaG9sZGVyVGV4dDI6IFN0cmluZyxcbiAgICBmbGFnOiBCb29sZWFuXG4gIH1cbiAgb25Mb2FkKCkge1xuXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBpbnB1dDogJycsXG4gICAgbW9uZXk6ICcnXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBiaW5kSW5wdXQgKGUpIHtcbiAgICAgIHRoaXNbZS5jdXJyZW50VGFyZ2V0LmlkXSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBjYW5jZWxGbiAoKSB7XG4gICAgICB0aGlzLiRlbWl0KCdjYW5jZWwnKVxuICAgIH0sXG4gICAgc3VyZUZuICgpIHtcbiAgICAgIGlmIChpc0VtcHR5U3RyaW5nKHRoaXMuaW5wdXQpKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+i+k+WFpemhueebruWQjeensCcpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdGhpcy4kZW1pdCgnc3VyZScsIHRoaXMuaW5wdXQsIHRoaXMubW9uZXkpXG4gICAgICB0aGlzLmlucHV0ID0gJydcbiAgICAgIHRoaXMubW9uZXkgPSAnJ1xuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxufVxuIl19