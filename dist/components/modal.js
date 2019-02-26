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
      sureFn: function sureFn() {
        if ((0, _common.isEmptyString)(this.input)) {
          (0, _common.showMsg)('请输入活动项目名称');
          return;
        }
        this.$emit('sure', this.input);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGFsLmpzIl0sIm5hbWVzIjpbIk1vZGFsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsInByb3BzIiwiY2FuY2VsQnRuVGV4dCIsIlN0cmluZyIsInN1cmVCdG5UZXh0IiwicGxhY2Vob2xkZXJUZXh0IiwiZmxhZyIsIkJvb2xlYW4iLCJkYXRhIiwiaW5wdXQiLCJtZXRob2RzIiwiYmluZElucHV0IiwiZSIsImRldGFpbCIsInZhbHVlIiwiJGFwcGx5IiwiY2FuY2VsRm4iLCIkZW1pdCIsInN1cmVGbiIsIndlcHkiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFDcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEssR0FBUTtBQUNOQyxxQkFBZUMsTUFEVDtBQUVOQyxtQkFBYUQsTUFGUDtBQUdORSx1QkFBaUJGLE1BSFg7QUFJTkcsWUFBTUM7QUFKQSxLLFFBU1JDLEksR0FBTztBQUNMQyxhQUFPO0FBREYsSyxRQUdQQyxPLEdBQVU7QUFDUkMsZUFEUSxxQkFDR0MsQ0FESCxFQUNNO0FBQ1osYUFBS0gsS0FBTCxHQUFhRyxFQUFFQyxNQUFGLENBQVNDLEtBQXRCO0FBQ0EsYUFBS0MsTUFBTDtBQUNELE9BSk87QUFLUkMsY0FMUSxzQkFLSTtBQUNWLGFBQUtDLEtBQUwsQ0FBVyxRQUFYO0FBQ0QsT0FQTztBQVFSQyxZQVJRLG9CQVFFO0FBQ1IsWUFBSSwyQkFBYyxLQUFLVCxLQUFuQixDQUFKLEVBQStCO0FBQzdCLCtCQUFRLFdBQVI7QUFDQTtBQUNEO0FBQ0QsYUFBS1EsS0FBTCxDQUFXLE1BQVgsRUFBbUIsS0FBS1IsS0FBeEI7QUFDQSxhQUFLQSxLQUFMLEdBQWEsRUFBYjtBQUNBLGFBQUtNLE1BQUw7QUFDRDtBQWhCTyxLOzs7Ozs2QkFORCxDQUVSOzs7O0VBWmdDSSxlQUFLQyxTOztrQkFBbkJ0QixLIiwiZmlsZSI6Im1vZGFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHsgc2hvd01zZywgaXNFbXB0eVN0cmluZyB9IGZyb20gJy4uL3V0aWxzL2NvbW1vbidcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZGFsIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+i0ouWKoeiusOi0pidcbiAgfVxuICBwcm9wcyA9IHtcbiAgICBjYW5jZWxCdG5UZXh0OiBTdHJpbmcsXG4gICAgc3VyZUJ0blRleHQ6IFN0cmluZyxcbiAgICBwbGFjZWhvbGRlclRleHQ6IFN0cmluZyxcbiAgICBmbGFnOiBCb29sZWFuXG4gIH1cbiAgb25Mb2FkKCkge1xuXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBpbnB1dDogJydcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIGJpbmRJbnB1dCAoZSkge1xuICAgICAgdGhpcy5pbnB1dCA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBjYW5jZWxGbiAoKSB7XG4gICAgICB0aGlzLiRlbWl0KCdjYW5jZWwnKVxuICAgIH0sXG4gICAgc3VyZUZuICgpIHtcbiAgICAgIGlmIChpc0VtcHR5U3RyaW5nKHRoaXMuaW5wdXQpKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+i+k+WFpea0u+WKqOmhueebruWQjeensCcpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdGhpcy4kZW1pdCgnc3VyZScsIHRoaXMuaW5wdXQpXG4gICAgICB0aGlzLmlucHV0ID0gJydcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbn1cbiJdfQ==