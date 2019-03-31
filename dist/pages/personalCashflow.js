'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _finance = require('./../api/finance.js');

var _normalize = require('./../utils/normalize.js');

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
      classId: 0
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(personCashflow, [{
    key: 'onLoad',
    value: function onLoad(e) {
      this.classId = wx.getStorageSync('classInfo').id;
      this.getList();
    }
  }, {
    key: 'getList',
    value: function getList() {
      var _this2 = this;

      (0, _finance.getPersonFinanceList)({
        class_id: this.classId
      }).then(function (res) {
        _this2.list = res.data.list.map(_normalize.personalCashflowObj);
        _this2.$apply();
      });
    }
  }]);

  return personCashflow;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(personCashflow , 'pages/personalCashflow'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBlcnNvbmFsQ2FzaGZsb3cuanMiXSwibmFtZXMiOlsicGVyc29uQ2FzaGZsb3ciLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImxpc3QiLCJjbGFzc0lkIiwiZSIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJpZCIsImdldExpc3QiLCJjbGFzc19pZCIsInRoZW4iLCJyZXMiLCJtYXAiLCJwZXJzb25hbENhc2hmbG93T2JqIiwiJGFwcGx5Iiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7SUFDcUJBLGM7Ozs7Ozs7Ozs7Ozs7O3NNQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxZQUFNLEVBREQ7QUFFTEMsZUFBUztBQUZKLEs7Ozs7OzJCQUlBQyxDLEVBQUc7QUFDUixXQUFLRCxPQUFMLEdBQWVFLEdBQUdDLGNBQUgsQ0FBa0IsV0FBbEIsRUFBK0JDLEVBQTlDO0FBQ0EsV0FBS0MsT0FBTDtBQUNEOzs7OEJBQ1M7QUFBQTs7QUFDUix5Q0FBcUI7QUFDbkJDLGtCQUFVLEtBQUtOO0FBREksT0FBckIsRUFFR08sSUFGSCxDQUVRLGVBQU87QUFDYixlQUFLUixJQUFMLEdBQVlTLElBQUlWLElBQUosQ0FBU0MsSUFBVCxDQUFjVSxHQUFkLENBQWtCQyw4QkFBbEIsQ0FBWjtBQUNBLGVBQUtDLE1BQUw7QUFDRCxPQUxEO0FBTUQ7Ozs7RUFuQnlDQyxlQUFLQyxJOztrQkFBNUJsQixjIiwiZmlsZSI6InBlcnNvbmFsQ2FzaGZsb3cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IHsgZ2V0UGVyc29uRmluYW5jZUxpc3QgfSBmcm9tICcuLi9hcGkvZmluYW5jZSdcclxuaW1wb3J0IHsgcGVyc29uYWxDYXNoZmxvd09iaiB9IGZyb20gJy4uL3V0aWxzL25vcm1hbGl6ZSdcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgcGVyc29uQ2FzaGZsb3cgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkuKrkurrotKLliqHmtYHmsLQnXHJcbiAgfTtcclxuICBkYXRhID0ge1xyXG4gICAgbGlzdDogW10sXHJcbiAgICBjbGFzc0lkOiAwXHJcbiAgfVxyXG4gIG9uTG9hZChlKSB7XHJcbiAgICB0aGlzLmNsYXNzSWQgPSB3eC5nZXRTdG9yYWdlU3luYygnY2xhc3NJbmZvJykuaWRcclxuICAgIHRoaXMuZ2V0TGlzdCgpXHJcbiAgfVxyXG4gIGdldExpc3QoKSB7XHJcbiAgICBnZXRQZXJzb25GaW5hbmNlTGlzdCh7XHJcbiAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSWRcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgdGhpcy5saXN0ID0gcmVzLmRhdGEubGlzdC5tYXAocGVyc29uYWxDYXNoZmxvd09iailcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuXHJcbiJdfQ==