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

var Search = function (_wepy$component) {
  _inherits(Search, _wepy$component);

  function Search() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Search);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Search.__proto__ || Object.getPrototypeOf(Search)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      studentList: [],
      flag: false
    }, _this.data = {
      input: '',
      money: ''
    }, _this.methods = {
      closeModal: function closeModal() {
        this.$emit('closeModal');
      },
      bindInput: function bindInput(e) {
        this[e.currentTarget.id] = e.detail.value;
        this.$apply();
      },
      sureFn: function sureFn() {
        if ((0, _common.isEmptyString)(this.input)) {
          (0, _common.showMsg)('请输入搜索内容');
          return;
        }
        this.$emit('sure', this.input);
      },
      select: function select(value) {
        this.$emit('selectStudent', value);
        this.input = '';
        this.$apply();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Search, [{
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return Search;
}(_wepy2.default.component);

exports.default = Search;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaFJlc3VsdC5qcyJdLCJuYW1lcyI6WyJTZWFyY2giLCJwcm9wcyIsInN0dWRlbnRMaXN0IiwiZmxhZyIsImRhdGEiLCJpbnB1dCIsIm1vbmV5IiwibWV0aG9kcyIsImNsb3NlTW9kYWwiLCIkZW1pdCIsImJpbmRJbnB1dCIsImUiLCJjdXJyZW50VGFyZ2V0IiwiaWQiLCJkZXRhaWwiLCJ2YWx1ZSIsIiRhcHBseSIsInN1cmVGbiIsInNlbGVjdCIsIndlcHkiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFDcUJBLE07Ozs7Ozs7Ozs7Ozs7O3NMQUNuQkMsSyxHQUFRO0FBQ05DLG1CQUFhLEVBRFA7QUFFTkMsWUFBTTtBQUZBLEssUUFPUkMsSSxHQUFPO0FBQ0xDLGFBQU8sRUFERjtBQUVMQyxhQUFPO0FBRkYsSyxRQUlQQyxPLEdBQVU7QUFDUkMsZ0JBRFEsd0JBQ0s7QUFDWCxhQUFLQyxLQUFMLENBQVcsWUFBWDtBQUNELE9BSE87QUFJUkMsZUFKUSxxQkFJR0MsQ0FKSCxFQUlNO0FBQ1osYUFBS0EsRUFBRUMsYUFBRixDQUFnQkMsRUFBckIsSUFBMkJGLEVBQUVHLE1BQUYsQ0FBU0MsS0FBcEM7QUFDQSxhQUFLQyxNQUFMO0FBQ0QsT0FQTztBQVFSQyxZQVJRLG9CQVFFO0FBQ1IsWUFBSSwyQkFBYyxLQUFLWixLQUFuQixDQUFKLEVBQStCO0FBQzdCLCtCQUFRLFNBQVI7QUFDQTtBQUNEO0FBQ0QsYUFBS0ksS0FBTCxDQUFXLE1BQVgsRUFBbUIsS0FBS0osS0FBeEI7QUFDRCxPQWRPO0FBZVJhLFlBZlEsa0JBZUFILEtBZkEsRUFlTztBQUNiLGFBQUtOLEtBQUwsQ0FBVyxlQUFYLEVBQTRCTSxLQUE1QjtBQUNBLGFBQUtWLEtBQUwsR0FBYSxFQUFiO0FBQ0EsYUFBS1csTUFBTDtBQUNEO0FBbkJPLEs7Ozs7OzZCQVBELENBRVI7Ozs7RUFQaUNHLGVBQUtDLFM7O2tCQUFwQnBCLE0iLCJmaWxlIjoic2VhcmNoUmVzdWx0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCB7IHNob3dNc2csIGlzRW1wdHlTdHJpbmcgfSBmcm9tICcuLi91dGlscy9jb21tb24nXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaCBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICBwcm9wcyA9IHtcclxuICAgIHN0dWRlbnRMaXN0OiBbXSxcclxuICAgIGZsYWc6IGZhbHNlXHJcbiAgfVxyXG4gIG9uTG9hZCgpIHtcclxuXHJcbiAgfVxyXG4gIGRhdGEgPSB7XHJcbiAgICBpbnB1dDogJycsXHJcbiAgICBtb25leTogJydcclxuICB9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGNsb3NlTW9kYWwoKSB7XHJcbiAgICAgIHRoaXMuJGVtaXQoJ2Nsb3NlTW9kYWwnKVxyXG4gICAgfSxcclxuICAgIGJpbmRJbnB1dCAoZSkge1xyXG4gICAgICB0aGlzW2UuY3VycmVudFRhcmdldC5pZF0gPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9LFxyXG4gICAgc3VyZUZuICgpIHtcclxuICAgICAgaWYgKGlzRW1wdHlTdHJpbmcodGhpcy5pbnB1dCkpIHtcclxuICAgICAgICBzaG93TXNnKCfor7fovpPlhaXmkJzntKLlhoXlrrknKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuJGVtaXQoJ3N1cmUnLCB0aGlzLmlucHV0KVxyXG4gICAgfSxcclxuICAgIHNlbGVjdCAodmFsdWUpIHtcclxuICAgICAgdGhpcy4kZW1pdCgnc2VsZWN0U3R1ZGVudCcsIHZhbHVlKVxyXG4gICAgICB0aGlzLmlucHV0ID0gJydcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=