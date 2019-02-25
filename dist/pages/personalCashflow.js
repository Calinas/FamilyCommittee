'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _finance = require('./../api/finance.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var personCashflow = function (_wepy$page) {
  _inherits(personCashflow, _wepy$page);

  function personCashflow() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, personCashflow);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = personCashflow.__proto__ || Object.getPrototypeOf(personCashflow)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '个人财务流水'
    }, _this.data = {
      list: [],
      classInfo: {}
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(personCashflow, [{
    key: 'onLoad',
    value: function onLoad(e) {
      this.classInfo = wx.getStorageSync('classInfo');
      this.getList();
    }
  }, {
    key: 'getList',
    value: function getList() {
      var _this2 = this;

      (0, _finance.getPersonFinanceList)({
        class_id: this.classInfo.id
      }).then(function (res) {
        _this2.list = res.data.list;
        _this2.$apply();
      });
    }
  }]);

  return personCashflow;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(personCashflow , 'pages/personalCashflow'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBlcnNvbmFsQ2FzaGZsb3cuanMiXSwibmFtZXMiOlsicGVyc29uQ2FzaGZsb3ciLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImxpc3QiLCJjbGFzc0luZm8iLCJlIiwid3giLCJnZXRTdG9yYWdlU3luYyIsImdldExpc3QiLCJjbGFzc19pZCIsImlkIiwidGhlbiIsInJlcyIsIiRhcHBseSIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0lBQ3FCQSxjOzs7Ozs7Ozs7Ozs7OztzTUFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsWUFBTSxFQUREO0FBRUxDLGlCQUFXO0FBRk4sSzs7Ozs7MkJBSUFDLEMsRUFBRTtBQUNQLFdBQUtELFNBQUwsR0FBaUJFLEdBQUdDLGNBQUgsQ0FBa0IsV0FBbEIsQ0FBakI7QUFDQSxXQUFLQyxPQUFMO0FBQ0Q7Ozs4QkFDUTtBQUFBOztBQUNQLHlDQUFxQjtBQUNuQkMsa0JBQVUsS0FBS0wsU0FBTCxDQUFlTTtBQUROLE9BQXJCLEVBRUdDLElBRkgsQ0FFUSxlQUFPO0FBQ2IsZUFBS1IsSUFBTCxHQUFZUyxJQUFJVixJQUFKLENBQVNDLElBQXJCO0FBQ0EsZUFBS1UsTUFBTDtBQUNELE9BTEQ7QUFNRDs7OztFQW5CeUNDLGVBQUtDLEk7O2tCQUE1QmhCLGMiLCJmaWxlIjoicGVyc29uYWxDYXNoZmxvdy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgeyBnZXRQZXJzb25GaW5hbmNlTGlzdCB9IGZyb20gJy4uL2FwaS9maW5hbmNlJ1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBwZXJzb25DYXNoZmxvdyBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+S4quS6uui0ouWKoea1geawtCdcclxuICB9O1xyXG4gIGRhdGEgPSB7XHJcbiAgICBsaXN0OiBbXSxcclxuICAgIGNsYXNzSW5mbzoge31cclxuICB9XHJcbiAgb25Mb2FkKGUpe1xyXG4gICAgdGhpcy5jbGFzc0luZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnY2xhc3NJbmZvJylcclxuICAgIHRoaXMuZ2V0TGlzdCgpXHJcbiAgfVxyXG4gIGdldExpc3QoKXtcclxuICAgIGdldFBlcnNvbkZpbmFuY2VMaXN0KHtcclxuICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHRoaXMubGlzdCA9IHJlcy5kYXRhLmxpc3RcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuXHJcbiJdfQ==