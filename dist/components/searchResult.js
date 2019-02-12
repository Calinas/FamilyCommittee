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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaFJlc3VsdC5qcyJdLCJuYW1lcyI6WyJTZWFyY2giLCJwcm9wcyIsInN0dWRlbnRMaXN0IiwiZmxhZyIsImRhdGEiLCJpbnB1dCIsIm1vbmV5IiwibWV0aG9kcyIsImNsb3NlTW9kYWwiLCIkZW1pdCIsImJpbmRJbnB1dCIsImUiLCJjdXJyZW50VGFyZ2V0IiwiaWQiLCJkZXRhaWwiLCJ2YWx1ZSIsIiRhcHBseSIsInN1cmVGbiIsInNlbGVjdCIsIndlcHkiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFDcUJBLE07Ozs7Ozs7Ozs7Ozs7O3NMQUNuQkMsSyxHQUFRO0FBQ05DLG1CQUFhLEVBRFA7QUFFTkMsWUFBTTtBQUZBLEssUUFPUkMsSSxHQUFPO0FBQ0xDLGFBQU8sRUFERjtBQUVMQyxhQUFPO0FBRkYsSyxRQUlQQyxPLEdBQVU7QUFDUkMsZ0JBRFEsd0JBQ0s7QUFDWCxhQUFLQyxLQUFMLENBQVcsWUFBWDtBQUNELE9BSE87QUFJUkMsZUFKUSxxQkFJR0MsQ0FKSCxFQUlNO0FBQ1osYUFBS0EsRUFBRUMsYUFBRixDQUFnQkMsRUFBckIsSUFBMkJGLEVBQUVHLE1BQUYsQ0FBU0MsS0FBcEM7QUFDQSxhQUFLQyxNQUFMO0FBQ0QsT0FQTztBQVFSQyxZQVJRLG9CQVFFO0FBQ1IsWUFBSSwyQkFBYyxLQUFLWixLQUFuQixDQUFKLEVBQStCO0FBQzdCLCtCQUFRLFNBQVI7QUFDQTtBQUNEO0FBQ0QsYUFBS0ksS0FBTCxDQUFXLE1BQVgsRUFBbUIsS0FBS0osS0FBeEI7QUFDRCxPQWRPO0FBZVJhLFlBZlEsa0JBZUFILEtBZkEsRUFlTztBQUNiLGFBQUtOLEtBQUwsQ0FBVyxlQUFYLEVBQTRCTSxLQUE1QjtBQUNBLGFBQUtWLEtBQUwsR0FBYSxFQUFiO0FBQ0EsYUFBS1csTUFBTDtBQUNEO0FBbkJPLEs7Ozs7OzZCQVBELENBRVI7Ozs7RUFQaUNHLGVBQUtDLFM7O2tCQUFwQnBCLE0iLCJmaWxlIjoic2VhcmNoUmVzdWx0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHsgc2hvd01zZywgaXNFbXB0eVN0cmluZyB9IGZyb20gJy4uL3V0aWxzL2NvbW1vbidcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaCBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgcHJvcHMgPSB7XG4gICAgc3R1ZGVudExpc3Q6IFtdLFxuICAgIGZsYWc6IGZhbHNlXG4gIH1cbiAgb25Mb2FkKCkge1xuXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBpbnB1dDogJycsXG4gICAgbW9uZXk6ICcnXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBjbG9zZU1vZGFsKCkge1xuICAgICAgdGhpcy4kZW1pdCgnY2xvc2VNb2RhbCcpXG4gICAgfSxcbiAgICBiaW5kSW5wdXQgKGUpIHtcbiAgICAgIHRoaXNbZS5jdXJyZW50VGFyZ2V0LmlkXSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBzdXJlRm4gKCkge1xuICAgICAgaWYgKGlzRW1wdHlTdHJpbmcodGhpcy5pbnB1dCkpIHtcbiAgICAgICAgc2hvd01zZygn6K+36L6T5YWl5pCc57Si5YaF5a65JylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB0aGlzLiRlbWl0KCdzdXJlJywgdGhpcy5pbnB1dClcbiAgICB9LFxuICAgIHNlbGVjdCAodmFsdWUpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ3NlbGVjdFN0dWRlbnQnLCB2YWx1ZSlcbiAgICAgIHRoaXMuaW5wdXQgPSAnJ1xuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxufVxuIl19