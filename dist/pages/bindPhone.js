'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var bindRelationship = function (_wepy$page) {
  _inherits(bindRelationship, _wepy$page);

  function bindRelationship() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, bindRelationship);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = bindRelationship.__proto__ || Object.getPrototypeOf(bindRelationship)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '绑定手机'
    }, _this.data = {
      relationship: [{
        id: 0,
        title: '妈妈'
      }, {
        id: 1,
        title: '爸爸'
      }, {
        id: 2,
        title: '爷爷'
      }, {
        id: 3,
        title: '奶奶'
      }, {
        id: 4,
        title: '亲戚'
      }],
      parentIndex: -1,
      memberInfo: null
    }, _this.methods = {
      bindParentPicker: function bindParentPicker(e) {
        this.parentIndex = e.detail.value;
        this.$apply();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(bindRelationship, [{
    key: 'onLoad',
    value: function onLoad() {
      var globalData = this.$parent.globalData;
      this.memberInfo = globalData.memberInfo;
      this.classInfo = globalData.classInfo;
      this.$apply();
    }
  }]);

  return bindRelationship;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(bindRelationship , 'pages/bindPhone'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJpbmRQaG9uZS5qcyJdLCJuYW1lcyI6WyJiaW5kUmVsYXRpb25zaGlwIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJyZWxhdGlvbnNoaXAiLCJpZCIsInRpdGxlIiwicGFyZW50SW5kZXgiLCJtZW1iZXJJbmZvIiwibWV0aG9kcyIsImJpbmRQYXJlbnRQaWNrZXIiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCIkYXBwbHkiLCJnbG9iYWxEYXRhIiwiJHBhcmVudCIsImNsYXNzSW5mbyIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxnQjs7Ozs7Ozs7Ozs7Ozs7ME1BQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLG9CQUFjLENBQ1o7QUFDRUMsWUFBSSxDQUROO0FBRUVDLGVBQU87QUFGVCxPQURZLEVBS1o7QUFDRUQsWUFBSSxDQUROO0FBRUVDLGVBQU87QUFGVCxPQUxZLEVBU1o7QUFDRUQsWUFBSSxDQUROO0FBRUVDLGVBQU87QUFGVCxPQVRZLEVBYVo7QUFDRUQsWUFBSSxDQUROO0FBRUVDLGVBQU87QUFGVCxPQWJZLEVBaUJaO0FBQ0VELFlBQUksQ0FETjtBQUVFQyxlQUFPO0FBRlQsT0FqQlksQ0FEVDtBQXVCTEMsbUJBQWEsQ0FBQyxDQXZCVDtBQXdCTEMsa0JBQVk7QUF4QlAsSyxRQWdDUEMsTyxHQUFVO0FBQ1JDLHNCQURRLDRCQUNTQyxDQURULEVBQ1k7QUFDbEIsYUFBS0osV0FBTCxHQUFtQkksRUFBRUMsTUFBRixDQUFTQyxLQUE1QjtBQUNBLGFBQUtDLE1BQUw7QUFDRDtBQUpPLEs7Ozs7OzZCQU5EO0FBQ1AsVUFBTUMsYUFBYSxLQUFLQyxPQUFMLENBQWFELFVBQWhDO0FBQ0EsV0FBS1AsVUFBTCxHQUFrQk8sV0FBV1AsVUFBN0I7QUFDQSxXQUFLUyxTQUFMLEdBQWlCRixXQUFXRSxTQUE1QjtBQUNBLFdBQUtILE1BQUw7QUFDRDs7OztFQW5DMkNJLGVBQUtDLEk7O2tCQUE5Qm5CLGdCIiwiZmlsZSI6ImJpbmRQaG9uZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBiaW5kUmVsYXRpb25zaGlwIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn57uR5a6a5omL5py6J1xyXG4gIH1cclxuICBkYXRhID0ge1xyXG4gICAgcmVsYXRpb25zaGlwOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogMCxcclxuICAgICAgICB0aXRsZTogJ+WmiOWmiCdcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGlkOiAxLFxyXG4gICAgICAgIHRpdGxlOiAn54i454i4J1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6IDIsXHJcbiAgICAgICAgdGl0bGU6ICfniLfniLcnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogMyxcclxuICAgICAgICB0aXRsZTogJ+WltuWltidcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGlkOiA0LFxyXG4gICAgICAgIHRpdGxlOiAn5Lqy5oiaJ1xyXG4gICAgICB9XHJcbiAgICBdLFxyXG4gICAgcGFyZW50SW5kZXg6IC0xLFxyXG4gICAgbWVtYmVySW5mbzogbnVsbFxyXG4gIH1cclxuICBvbkxvYWQoKSB7XHJcbiAgICBjb25zdCBnbG9iYWxEYXRhID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGFcclxuICAgIHRoaXMubWVtYmVySW5mbyA9IGdsb2JhbERhdGEubWVtYmVySW5mb1xyXG4gICAgdGhpcy5jbGFzc0luZm8gPSBnbG9iYWxEYXRhLmNsYXNzSW5mb1xyXG4gICAgdGhpcy4kYXBwbHkoKVxyXG4gIH1cclxuICBtZXRob2RzID0ge1xyXG4gICAgYmluZFBhcmVudFBpY2tlcihlKSB7XHJcbiAgICAgIHRoaXMucGFyZW50SW5kZXggPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==