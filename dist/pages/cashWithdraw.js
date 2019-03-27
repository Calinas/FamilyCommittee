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
      list: [],
      loading: false,
      loadFinished: false
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
    key: 'onPullDownRefresh',
    value: function onPullDownRefresh() {
      this.resetData();
      this.getZoneList();
    }
  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      if (this.loading || this.loadFinished) return;
      this.getList();
    }
  }, {
    key: 'resetData',
    value: function resetData() {
      this.pn = 1;
      this.ps = 10;
      this.loading = false;
      this.loadFinished = false;
      this.list = [];
      this.$apply();
    }
  }, {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhc2hXaXRoZHJhdy5qcyJdLCJuYW1lcyI6WyJDYXNoV2l0aGRyYXdhbCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwibWVtYmVySW5mbyIsImNsYXNzSW5mbyIsInBuIiwicHMiLCJsaXN0IiwibG9hZGluZyIsImxvYWRGaW5pc2hlZCIsIm1ldGhvZHMiLCJzdWJtaXQiLCJpZCIsImNsYXNzX2lkIiwiY29sbGVjdGlvbl9pZCIsIk51bWJlciIsImFtb3VudCIsIm1vbmV5IiwidGhlbiIsInJlcyIsInN1Y2Nlc3MiLCIkYXBwbHkiLCJ0ZW1wU3VibWl0Iiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwicmVzZXREYXRhIiwiZ2V0Wm9uZUxpc3QiLCJnZXRMaXN0IiwiZ2V0U3RvcmFnZVN5bmMiLCJzZWVfdHlwZSIsInR5cGUiLCJtYXAiLCJjYXNoV2l0aGRyYXdPYmoiLCJsZW5ndGgiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxjOzs7Ozs7Ozs7Ozs7OztzTUFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsa0JBQVksSUFEUDtBQUVMQyxpQkFBVyxJQUZOO0FBR0xDLFVBQUksQ0FIQztBQUlMQyxVQUFJLEVBSkM7QUFLTEMsWUFBTSxFQUxEO0FBTUxDLGVBQVMsS0FOSjtBQU9MQyxvQkFBYztBQVBULEssUUF5QlBDLE8sR0FBVTtBQUNSQyxZQURRLGtCQUNEQyxFQURDLEVBQ0c7QUFBQTs7QUFDVCxtQ0FBYTtBQUNYQyxvQkFBVSxLQUFLVCxTQUFMLENBQWVRLEVBRGQ7QUFFWEUseUJBQWVDLE9BQU9ILEVBQVAsQ0FGSjtBQUdYSSxrQkFBUSxLQUFLQztBQUhGLFNBQWIsRUFJR0MsSUFKSCxDQUlRLGVBQU87QUFDYixjQUFJQyxJQUFJakIsSUFBSixDQUFTa0IsT0FBYixFQUFzQjtBQUNwQixpQ0FBUSxNQUFSO0FBQ0EsbUJBQUtDLE1BQUw7QUFDRDtBQUNGLFNBVEQ7QUFVRCxPQVpPO0FBYVJDLGdCQWJRLHNCQWFHVixFQWJILEVBYU9LLEtBYlAsRUFhYztBQUNwQk0sV0FBR0MsVUFBSCxDQUFjO0FBQ1pDLGdDQUFvQmIsRUFBcEIsZUFBZ0NLO0FBRHBCLFNBQWQ7QUFHRDtBQWpCTyxLOzs7Ozt3Q0FoQlU7QUFDbEIsV0FBS1MsU0FBTDtBQUNBLFdBQUtDLFdBQUw7QUFDRDs7O29DQUNlO0FBQ2QsVUFBSSxLQUFLbkIsT0FBTCxJQUFnQixLQUFLQyxZQUF6QixFQUF1QztBQUN2QyxXQUFLbUIsT0FBTDtBQUNEOzs7Z0NBQ1c7QUFDVixXQUFLdkIsRUFBTCxHQUFVLENBQVY7QUFDQSxXQUFLQyxFQUFMLEdBQVUsRUFBVjtBQUNBLFdBQUtFLE9BQUwsR0FBZSxLQUFmO0FBQ0EsV0FBS0MsWUFBTCxHQUFvQixLQUFwQjtBQUNBLFdBQUtGLElBQUwsR0FBWSxFQUFaO0FBQ0EsV0FBS2MsTUFBTDtBQUNEOzs7NkJBb0JRO0FBQ1AsV0FBS2xCLFVBQUwsR0FBa0JvQixHQUFHTSxjQUFILENBQWtCLFlBQWxCLENBQWxCO0FBQ0EsV0FBS3pCLFNBQUwsR0FBaUJtQixHQUFHTSxjQUFILENBQWtCLFdBQWxCLENBQWpCO0FBQ0EsV0FBS0QsT0FBTDtBQUNBLFdBQUtQLE1BQUw7QUFDRDs7OzhCQUNTO0FBQUE7O0FBQ1IsVUFBTVQsS0FBSyxLQUFLUixTQUFMLENBQWVRLEVBQTFCO0FBQ0EsK0JBQWM7QUFDWkMsa0JBQVVELEVBREU7QUFFWmtCLGtCQUFVbEIsS0FBSyxFQUFMLEdBQVUsS0FGUjtBQUdabUIsY0FBTSxZQUhNO0FBSVoxQixZQUFJLEtBQUtBLEVBSkc7QUFLWkMsWUFBSSxLQUFLQTtBQUxHLE9BQWQsRUFNR1ksSUFOSCxDQU1RLGVBQU87QUFBQSxZQUNQWCxJQURPLEdBQ0VZLElBQUlqQixJQUROLENBQ1BLLElBRE87O0FBRWJBLGVBQU9BLEtBQUt5QixHQUFMLENBQVNDLDBCQUFULENBQVA7QUFDQSxlQUFLekIsT0FBTCxHQUFlLEtBQWY7QUFDQSxlQUFLSCxFQUFMO0FBQ0EsZUFBS0UsSUFBTCxnQ0FBZ0IsT0FBS0EsSUFBckIsc0JBQThCQSxJQUE5QjtBQUNBLFlBQUlBLEtBQUsyQixNQUFMLEdBQWMsT0FBSzVCLEVBQXZCLEVBQTJCO0FBQ3pCLGlCQUFLRyxZQUFMLEdBQW9CLElBQXBCO0FBQ0Q7QUFDRCxlQUFLWSxNQUFMO0FBQ0QsT0FoQkQ7QUFpQkQ7Ozs7RUF6RXlDYyxlQUFLQyxJOztrQkFBNUJyQyxjIiwiZmlsZSI6ImNhc2hXaXRoZHJhdy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7IGdldENpcmNsZUxpc3QgfSBmcm9tICcuLi9hcGkvem9uZSdcbmltcG9ydCB7IHdpdGhkcmF3Q2FzaCB9IGZyb20gJy4uL2FwaS9maW5hbmNlJ1xuaW1wb3J0IHsgZ2V0T25seURhdGUsIHNob3dNc2cgfSBmcm9tICcuLi91dGlscy9jb21tb24nXG5pbXBvcnQgeyBjYXNoV2l0aGRyYXdPYmogfSBmcm9tICcuLi91dGlscy9ub3JtYWxpemUnXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXNoV2l0aGRyYXdhbCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5pS25qy+5o+Q546wJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgbWVtYmVySW5mbzogbnVsbCxcbiAgICBjbGFzc0luZm86IG51bGwsXG4gICAgcG46IDEsXG4gICAgcHM6IDEwLFxuICAgIGxpc3Q6IFtdLFxuICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgIGxvYWRGaW5pc2hlZDogZmFsc2VcbiAgfVxuICBvblB1bGxEb3duUmVmcmVzaCgpIHtcbiAgICB0aGlzLnJlc2V0RGF0YSgpXG4gICAgdGhpcy5nZXRab25lTGlzdCgpXG4gIH1cbiAgb25SZWFjaEJvdHRvbSgpIHtcbiAgICBpZiAodGhpcy5sb2FkaW5nIHx8IHRoaXMubG9hZEZpbmlzaGVkKSByZXR1cm5cbiAgICB0aGlzLmdldExpc3QoKVxuICB9XG4gIHJlc2V0RGF0YSgpIHtcbiAgICB0aGlzLnBuID0gMVxuICAgIHRoaXMucHMgPSAxMFxuICAgIHRoaXMubG9hZGluZyA9IGZhbHNlXG4gICAgdGhpcy5sb2FkRmluaXNoZWQgPSBmYWxzZVxuICAgIHRoaXMubGlzdCA9IFtdXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgc3VibWl0KGlkKSB7XG4gICAgICB3aXRoZHJhd0Nhc2goe1xuICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXG4gICAgICAgIGNvbGxlY3Rpb25faWQ6IE51bWJlcihpZCksXG4gICAgICAgIGFtb3VudDogdGhpcy5tb25leVxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgIHNob3dNc2coJ+aTjeS9nOaIkOWKnycpXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgdGVtcFN1Ym1pdChpZCwgbW9uZXkpIHtcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6IGB3aXRoZHJhdz9pZD0ke2lkfSZtb25leT0ke21vbmV5fWBcbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIG9uTG9hZCgpIHtcbiAgICB0aGlzLm1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXG4gICAgdGhpcy5jbGFzc0luZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnY2xhc3NJbmZvJylcbiAgICB0aGlzLmdldExpc3QoKVxuICAgIHRoaXMuJGFwcGx5KClcbiAgfVxuICBnZXRMaXN0KCkge1xuICAgIGNvbnN0IGlkID0gdGhpcy5jbGFzc0luZm8uaWRcbiAgICBnZXRDaXJjbGVMaXN0KHtcbiAgICAgIGNsYXNzX2lkOiBpZCxcbiAgICAgIHNlZV90eXBlOiBpZCA/ICcnIDogJ2FsbCcsXG4gICAgICB0eXBlOiAnY29sbGVjdGlvbicsXG4gICAgICBwbjogdGhpcy5wbixcbiAgICAgIHBzOiB0aGlzLnBzXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IHsgbGlzdCB9ID0gcmVzLmRhdGFcbiAgICAgIGxpc3QgPSBsaXN0Lm1hcChjYXNoV2l0aGRyYXdPYmopXG4gICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZVxuICAgICAgdGhpcy5wbisrXG4gICAgICB0aGlzLmxpc3QgPSBbLi4udGhpcy5saXN0LCAuLi5saXN0XVxuICAgICAgaWYgKGxpc3QubGVuZ3RoIDwgdGhpcy5wcykge1xuICAgICAgICB0aGlzLmxvYWRGaW5pc2hlZCA9IHRydWVcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9KVxuICB9XG59XG4iXX0=