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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaFJlc3VsdC5qcyJdLCJuYW1lcyI6WyJTZWFyY2giLCJwcm9wcyIsInN0dWRlbnRMaXN0IiwiZmxhZyIsImRhdGEiLCJpbnB1dCIsIm1vbmV5IiwibWV0aG9kcyIsImJpbmRJbnB1dCIsImUiLCJjdXJyZW50VGFyZ2V0IiwiaWQiLCJkZXRhaWwiLCJ2YWx1ZSIsIiRhcHBseSIsInN1cmVGbiIsIiRlbWl0Iiwic2VsZWN0Iiwid2VweSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztJQUNxQkEsTTs7Ozs7Ozs7Ozs7Ozs7c0xBQ25CQyxLLEdBQVE7QUFDTkMsbUJBQWEsRUFEUDtBQUVOQyxZQUFNO0FBRkEsSyxRQU9SQyxJLEdBQU87QUFDTEMsYUFBTyxFQURGO0FBRUxDLGFBQU87QUFGRixLLFFBSVBDLE8sR0FBVTtBQUNSQyxlQURRLHFCQUNHQyxDQURILEVBQ007QUFDWixhQUFLQSxFQUFFQyxhQUFGLENBQWdCQyxFQUFyQixJQUEyQkYsRUFBRUcsTUFBRixDQUFTQyxLQUFwQztBQUNBLGFBQUtDLE1BQUw7QUFDRCxPQUpPO0FBS1JDLFlBTFEsb0JBS0U7QUFDUixZQUFJLDJCQUFjLEtBQUtWLEtBQW5CLENBQUosRUFBK0I7QUFDN0IsK0JBQVEsU0FBUjtBQUNBO0FBQ0Q7QUFDRCxhQUFLVyxLQUFMLENBQVcsTUFBWCxFQUFtQixLQUFLWCxLQUF4QjtBQUNELE9BWE87QUFZUlksWUFaUSxrQkFZQUosS0FaQSxFQVlPO0FBQ2IsYUFBS0csS0FBTCxDQUFXLGVBQVgsRUFBNEJILEtBQTVCO0FBQ0EsYUFBS1IsS0FBTCxHQUFhLEVBQWI7QUFDQSxhQUFLUyxNQUFMO0FBQ0Q7QUFoQk8sSzs7Ozs7NkJBUEQsQ0FFUjs7OztFQVBpQ0ksZUFBS0MsUzs7a0JBQXBCbkIsTSIsImZpbGUiOiJzZWFyY2hSZXN1bHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgeyBzaG93TXNnLCBpc0VtcHR5U3RyaW5nIH0gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VhcmNoIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICBwcm9wcyA9IHtcbiAgICBzdHVkZW50TGlzdDogW10sXG4gICAgZmxhZzogZmFsc2VcbiAgfVxuICBvbkxvYWQoKSB7XG5cbiAgfVxuICBkYXRhID0ge1xuICAgIGlucHV0OiAnJyxcbiAgICBtb25leTogJydcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIGJpbmRJbnB1dCAoZSkge1xuICAgICAgdGhpc1tlLmN1cnJlbnRUYXJnZXQuaWRdID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIHN1cmVGbiAoKSB7XG4gICAgICBpZiAoaXNFbXB0eVN0cmluZyh0aGlzLmlucHV0KSkge1xuICAgICAgICBzaG93TXNnKCfor7fovpPlhaXmkJzntKLlhoXlrrknKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHRoaXMuJGVtaXQoJ3N1cmUnLCB0aGlzLmlucHV0KVxuICAgIH0sXG4gICAgc2VsZWN0ICh2YWx1ZSkge1xuICAgICAgdGhpcy4kZW1pdCgnc2VsZWN0U3R1ZGVudCcsIHZhbHVlKVxuICAgICAgdGhpcy5pbnB1dCA9ICcnXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG59XG4iXX0=