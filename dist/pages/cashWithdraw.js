'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _zone = require('./../api/zone.js');

var _finance = require('./../api/finance.js');

var _common = require('./../utils/common.js');

var _normalize = require('./../utils/normalize.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CashWithdrawal = function (_wepy$page) {
  _inherits(CashWithdrawal, _wepy$page);

  function CashWithdrawal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CashWithdrawal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CashWithdrawal.__proto__ || Object.getPrototypeOf(CashWithdrawal)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '收款提现'
    }, _this.data = {
      memberInfo: null,
      classInfo: null,
      pn: 1,
      ps: 10,
      list: []
    }, _this.methods = {
      submit: function submit(id) {
        var _this2 = this;

        (0, _finance.withdrawCash)({
          class_id: this.classInfo.id,
          collection_id: Number(id),
          amount: this.money
        }).then(function (res) {
          if (res.data.success) {
            (0, _common.showMsg)('操作成功');
            _this2.$apply();
          }
        });
      },
      tempSubmit: function tempSubmit(id, money) {
        wx.navigateTo({
          url: 'withdraw?id=' + id + '&money=' + money
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CashWithdrawal, [{
    key: 'onLoad',
    value: function onLoad() {
      this.memberInfo = wx.getStorageSync('memberInfo');
      this.classInfo = wx.getStorageSync('classInfo');
      this.getList();
      this.$apply();
    }
  }, {
    key: 'getList',
    value: function getList() {
      var _this3 = this;

      var id = this.classInfo.id;
      (0, _zone.getCircleList)({
        class_id: id,
        see_type: id ? '' : 'all',
        type: 'collection',
        pn: this.pn,
        ps: this.ps
      }).then(function (res) {
        var list = res.data.list;

        list = list.map(_normalize.cashWithdrawObj);
        _this3.loading = false;
        _this3.pn++;
        _this3.list = [].concat(_toConsumableArray(_this3.list), _toConsumableArray(list));
        if (list.length < _this3.ps) {
          _this3.loadFinished = true;
        }
        _this3.$apply();
      });
    }
  }]);

  return CashWithdrawal;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(CashWithdrawal , 'pages/cashWithdraw'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhc2hXaXRoZHJhdy5qcyJdLCJuYW1lcyI6WyJDYXNoV2l0aGRyYXdhbCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwibWVtYmVySW5mbyIsImNsYXNzSW5mbyIsInBuIiwicHMiLCJsaXN0IiwibWV0aG9kcyIsInN1Ym1pdCIsImlkIiwiY2xhc3NfaWQiLCJjb2xsZWN0aW9uX2lkIiwiTnVtYmVyIiwiYW1vdW50IiwibW9uZXkiLCJ0aGVuIiwicmVzIiwic3VjY2VzcyIsIiRhcHBseSIsInRlbXBTdWJtaXQiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnZXRTdG9yYWdlU3luYyIsImdldExpc3QiLCJzZWVfdHlwZSIsInR5cGUiLCJtYXAiLCJjYXNoV2l0aGRyYXdPYmoiLCJsb2FkaW5nIiwibGVuZ3RoIiwibG9hZEZpbmlzaGVkIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsYzs7Ozs7Ozs7Ozs7Ozs7c01BQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLGtCQUFZLElBRFA7QUFFTEMsaUJBQVcsSUFGTjtBQUdMQyxVQUFJLENBSEM7QUFJTEMsVUFBSSxFQUpDO0FBS0xDLFlBQU07QUFMRCxLLFFBT1BDLE8sR0FBVTtBQUNSQyxZQURRLGtCQUNEQyxFQURDLEVBQ0c7QUFBQTs7QUFDVCxtQ0FBYTtBQUNYQyxvQkFBVSxLQUFLUCxTQUFMLENBQWVNLEVBRGQ7QUFFWEUseUJBQWVDLE9BQU9ILEVBQVAsQ0FGSjtBQUdYSSxrQkFBUSxLQUFLQztBQUhGLFNBQWIsRUFJR0MsSUFKSCxDQUlRLGVBQU87QUFDYixjQUFJQyxJQUFJZixJQUFKLENBQVNnQixPQUFiLEVBQXNCO0FBQ3BCLGlDQUFRLE1BQVI7QUFDQSxtQkFBS0MsTUFBTDtBQUNEO0FBQ0YsU0FURDtBQVVELE9BWk87QUFhUkMsZ0JBYlEsc0JBYUdWLEVBYkgsRUFhT0ssS0FiUCxFQWFjO0FBQ3BCTSxXQUFHQyxVQUFILENBQWM7QUFDWkMsZ0NBQW9CYixFQUFwQixlQUFnQ0s7QUFEcEIsU0FBZDtBQUdEO0FBakJPLEs7Ozs7OzZCQW1CRDtBQUNQLFdBQUtaLFVBQUwsR0FBa0JrQixHQUFHRyxjQUFILENBQWtCLFlBQWxCLENBQWxCO0FBQ0EsV0FBS3BCLFNBQUwsR0FBaUJpQixHQUFHRyxjQUFILENBQWtCLFdBQWxCLENBQWpCO0FBQ0EsV0FBS0MsT0FBTDtBQUNBLFdBQUtOLE1BQUw7QUFDRDs7OzhCQUNTO0FBQUE7O0FBQ1IsVUFBTVQsS0FBSyxLQUFLTixTQUFMLENBQWVNLEVBQTFCO0FBQ0EsK0JBQWM7QUFDWkMsa0JBQVVELEVBREU7QUFFWmdCLGtCQUFVaEIsS0FBSyxFQUFMLEdBQVUsS0FGUjtBQUdaaUIsY0FBTSxZQUhNO0FBSVp0QixZQUFJLEtBQUtBLEVBSkc7QUFLWkMsWUFBSSxLQUFLQTtBQUxHLE9BQWQsRUFNR1UsSUFOSCxDQU1RLGVBQU87QUFBQSxZQUNQVCxJQURPLEdBQ0VVLElBQUlmLElBRE4sQ0FDUEssSUFETzs7QUFFYkEsZUFBT0EsS0FBS3FCLEdBQUwsQ0FBU0MsMEJBQVQsQ0FBUDtBQUNBLGVBQUtDLE9BQUwsR0FBZSxLQUFmO0FBQ0EsZUFBS3pCLEVBQUw7QUFDQSxlQUFLRSxJQUFMLGdDQUFnQixPQUFLQSxJQUFyQixzQkFBOEJBLElBQTlCO0FBQ0EsWUFBSUEsS0FBS3dCLE1BQUwsR0FBYyxPQUFLekIsRUFBdkIsRUFBMkI7QUFDekIsaUJBQUswQixZQUFMLEdBQW9CLElBQXBCO0FBQ0Q7QUFDRCxlQUFLYixNQUFMO0FBQ0QsT0FoQkQ7QUFpQkQ7Ozs7RUF2RHlDYyxlQUFLQyxJOztrQkFBNUJuQyxjIiwiZmlsZSI6ImNhc2hXaXRoZHJhdy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7IGdldENpcmNsZUxpc3QgfSBmcm9tICcuLi9hcGkvem9uZSdcbmltcG9ydCB7IHdpdGhkcmF3Q2FzaCB9IGZyb20gJy4uL2FwaS9maW5hbmNlJ1xuaW1wb3J0IHsgZ2V0T25seURhdGUsIHNob3dNc2cgfSBmcm9tICcuLi91dGlscy9jb21tb24nXG5pbXBvcnQgeyBjYXNoV2l0aGRyYXdPYmogfSBmcm9tICcuLi91dGlscy9ub3JtYWxpemUnXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXNoV2l0aGRyYXdhbCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5pS25qy+5o+Q546wJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgbWVtYmVySW5mbzogbnVsbCxcbiAgICBjbGFzc0luZm86IG51bGwsXG4gICAgcG46IDEsXG4gICAgcHM6IDEwLFxuICAgIGxpc3Q6IFtdXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBzdWJtaXQoaWQpIHtcbiAgICAgIHdpdGhkcmF3Q2FzaCh7XG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgICAgY29sbGVjdGlvbl9pZDogTnVtYmVyKGlkKSxcbiAgICAgICAgYW1vdW50OiB0aGlzLm1vbmV5XG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgc2hvd01zZygn5pON5L2c5oiQ5YqfJylcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICB0ZW1wU3VibWl0KGlkLCBtb25leSkge1xuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogYHdpdGhkcmF3P2lkPSR7aWR9Jm1vbmV5PSR7bW9uZXl9YFxuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgb25Mb2FkKCkge1xuICAgIHRoaXMubWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcbiAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxuICAgIHRoaXMuZ2V0TGlzdCgpXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIGdldExpc3QoKSB7XG4gICAgY29uc3QgaWQgPSB0aGlzLmNsYXNzSW5mby5pZFxuICAgIGdldENpcmNsZUxpc3Qoe1xuICAgICAgY2xhc3NfaWQ6IGlkLFxuICAgICAgc2VlX3R5cGU6IGlkID8gJycgOiAnYWxsJyxcbiAgICAgIHR5cGU6ICdjb2xsZWN0aW9uJyxcbiAgICAgIHBuOiB0aGlzLnBuLFxuICAgICAgcHM6IHRoaXMucHNcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgeyBsaXN0IH0gPSByZXMuZGF0YVxuICAgICAgbGlzdCA9IGxpc3QubWFwKGNhc2hXaXRoZHJhd09iailcbiAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlXG4gICAgICB0aGlzLnBuKytcbiAgICAgIHRoaXMubGlzdCA9IFsuLi50aGlzLmxpc3QsIC4uLmxpc3RdXG4gICAgICBpZiAobGlzdC5sZW5ndGggPCB0aGlzLnBzKSB7XG4gICAgICAgIHRoaXMubG9hZEZpbmlzaGVkID0gdHJ1ZVxuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0pXG4gIH1cbn1cbiJdfQ==