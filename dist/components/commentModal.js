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
      cancelBtnText: String,
      sureBtnText: String,
      placeholderText: String,
      flag: Boolean,
      commentInput: String
    }, _this.methods = {
      bindInput: function bindInput(e) {
        this.$emit('input', e.detail.value);
      },
      cancelFn: function cancelFn() {
        this.$emit('cancel');
      },
      sureFn: function sureFn() {
        if ((0, _common.isEmptyString)(this.commentInput)) {
          (0, _common.showMsg)('请输入评论内容');
          return;
        }
        this.$emit('sure', this.commentInput);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1lbnRNb2RhbC5qcyJdLCJuYW1lcyI6WyJDdXJyZW50TW9kYWwiLCJwcm9wcyIsImNhbmNlbEJ0blRleHQiLCJTdHJpbmciLCJzdXJlQnRuVGV4dCIsInBsYWNlaG9sZGVyVGV4dCIsImZsYWciLCJCb29sZWFuIiwiY29tbWVudElucHV0IiwibWV0aG9kcyIsImJpbmRJbnB1dCIsImUiLCIkZW1pdCIsImRldGFpbCIsInZhbHVlIiwiY2FuY2VsRm4iLCJzdXJlRm4iLCIkYXBwbHkiLCJ3ZXB5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0lBQ3FCQSxZOzs7Ozs7Ozs7Ozs7OztrTUFDbkJDLEssR0FBUTtBQUNOQyxxQkFBZUMsTUFEVDtBQUVOQyxtQkFBYUQsTUFGUDtBQUdORSx1QkFBaUJGLE1BSFg7QUFJTkcsWUFBTUMsT0FKQTtBQUtOQyxvQkFBY0w7QUFMUixLLFFBVVJNLE8sR0FBVTtBQUNSQyxlQURRLHFCQUNHQyxDQURILEVBQ007QUFDWixhQUFLQyxLQUFMLENBQVcsT0FBWCxFQUFvQkQsRUFBRUUsTUFBRixDQUFTQyxLQUE3QjtBQUNELE9BSE87QUFJUkMsY0FKUSxzQkFJSTtBQUNWLGFBQUtILEtBQUwsQ0FBVyxRQUFYO0FBQ0QsT0FOTztBQU9SSSxZQVBRLG9CQU9FO0FBQ1IsWUFBSSwyQkFBYyxLQUFLUixZQUFuQixDQUFKLEVBQXNDO0FBQ3BDLCtCQUFRLFNBQVI7QUFDQTtBQUNEO0FBQ0QsYUFBS0ksS0FBTCxDQUFXLE1BQVgsRUFBbUIsS0FBS0osWUFBeEI7QUFDQSxhQUFLUyxNQUFMO0FBQ0Q7QUFkTyxLOzs7Ozs2QkFIRCxDQUVSOzs7O0VBVnVDQyxlQUFLQyxTOztrQkFBMUJuQixZIiwiZmlsZSI6ImNvbW1lbnRNb2RhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7IHNob3dNc2csIGlzRW1wdHlTdHJpbmcgfSBmcm9tICcuLi91dGlscy9jb21tb24nXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdXJyZW50TW9kYWwgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gIHByb3BzID0ge1xuICAgIGNhbmNlbEJ0blRleHQ6IFN0cmluZyxcbiAgICBzdXJlQnRuVGV4dDogU3RyaW5nLFxuICAgIHBsYWNlaG9sZGVyVGV4dDogU3RyaW5nLFxuICAgIGZsYWc6IEJvb2xlYW4sXG4gICAgY29tbWVudElucHV0OiBTdHJpbmdcbiAgfVxuICBvbkxvYWQoKSB7XG5cbiAgfVxuICBtZXRob2RzID0ge1xuICAgIGJpbmRJbnB1dCAoZSkge1xuICAgICAgdGhpcy4kZW1pdCgnaW5wdXQnLCBlLmRldGFpbC52YWx1ZSlcbiAgICB9LFxuICAgIGNhbmNlbEZuICgpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ2NhbmNlbCcpXG4gICAgfSxcbiAgICBzdXJlRm4gKCkge1xuICAgICAgaWYgKGlzRW1wdHlTdHJpbmcodGhpcy5jb21tZW50SW5wdXQpKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+i+k+WFpeivhOiuuuWGheWuuScpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdGhpcy4kZW1pdCgnc3VyZScsIHRoaXMuY29tbWVudElucHV0KVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxufVxuIl19