'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _finance = require('./../api/finance.js');

var _zone = require('./../api/zone.js');

var _common = require('./../utils/common.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cashflow = function (_wepy$page) {
  _inherits(cashflow, _wepy$page);

  function cashflow() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, cashflow);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = cashflow.__proto__ || Object.getPrototypeOf(cashflow)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '财务记账'
    }, _this.data = {
      pn: 1,
      ps: 10,
      balance: 0,
      memberInfo: null,
      financialData: {},
      memberList: [],
      list: [],
      type: {
        circles: '家长圈',
        collection: '收款',
        notify: '通知',
        activity: '活动',
        account: '记账'
      }
    }, _this.methods = {
      preview: function preview(urls) {
        (0, _common.previewImage)(urls[0], urls);
      },
      jumpPage: function jumpPage() {
        wx.navigateTo({
          url: 'zone'
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(cashflow, [{
    key: 'onLoad',
    value: function onLoad() {
      this.classInfo = wx.getStorageSync('classInfo');
      this.memberInfo = wx.getStorageSync('memberInfo');
      this.getList();
      this.getInfo();
      this.$apply();
    }
  }, {
    key: 'getList',
    value: function getList() {
      var _this2 = this;

      (0, _zone.getCircleList)({
        see_type: 'class',
        class_id: this.classInfo.id,
        type: 'account',
        ps: this.ps,
        pn: this.pn
      }).then(function (res) {
        _this2.list = res.data.list;
        _this2.$apply();
      });
    }
  }, {
    key: 'getInfo',
    value: function getInfo() {
      var _this3 = this;

      (0, _finance.getFinanceInfo)({
        member_id: this.memberInfo.member_id,
        class_id: this.classInfo.id
      }).then(function (res) {
        var data = res.data.data;

        _this3.balance = data.balance;
        _this3.memberList = data.financial_member;
        _this3.$apply();
      });
    }
  }]);

  return cashflow;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(cashflow , 'pages/cashflow'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhc2hmbG93LmpzIl0sIm5hbWVzIjpbImNhc2hmbG93IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJwbiIsInBzIiwiYmFsYW5jZSIsIm1lbWJlckluZm8iLCJmaW5hbmNpYWxEYXRhIiwibWVtYmVyTGlzdCIsImxpc3QiLCJ0eXBlIiwiY2lyY2xlcyIsImNvbGxlY3Rpb24iLCJub3RpZnkiLCJhY3Rpdml0eSIsImFjY291bnQiLCJtZXRob2RzIiwicHJldmlldyIsInVybHMiLCJqdW1wUGFnZSIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsImNsYXNzSW5mbyIsImdldFN0b3JhZ2VTeW5jIiwiZ2V0TGlzdCIsImdldEluZm8iLCIkYXBwbHkiLCJzZWVfdHlwZSIsImNsYXNzX2lkIiwiaWQiLCJ0aGVuIiwicmVzIiwibWVtYmVyX2lkIiwiZmluYW5jaWFsX21lbWJlciIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBQ3FCQSxROzs7Ozs7Ozs7Ozs7OzswTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsVUFBSSxDQURDO0FBRUxDLFVBQUksRUFGQztBQUdMQyxlQUFTLENBSEo7QUFJTEMsa0JBQVksSUFKUDtBQUtMQyxxQkFBZSxFQUxWO0FBTUxDLGtCQUFZLEVBTlA7QUFPTEMsWUFBTSxFQVBEO0FBUUxDLFlBQU07QUFDSkMsaUJBQVMsS0FETDtBQUVKQyxvQkFBWSxJQUZSO0FBR0pDLGdCQUFRLElBSEo7QUFJSkMsa0JBQVUsSUFKTjtBQUtKQyxpQkFBUztBQUxMO0FBUkQsSyxRQXVCUEMsTyxHQUFVO0FBQ1JDLGFBRFEsbUJBQ0FDLElBREEsRUFDTTtBQUNaLGtDQUFhQSxLQUFLLENBQUwsQ0FBYixFQUFzQkEsSUFBdEI7QUFDRCxPQUhPO0FBSVJDLGNBSlEsc0JBSUc7QUFDVEMsV0FBR0MsVUFBSCxDQUFjO0FBQ1pDLGVBQUs7QUFETyxTQUFkO0FBR0Q7QUFSTyxLOzs7Ozs2QkFQRDtBQUNQLFdBQUtDLFNBQUwsR0FBaUJILEdBQUdJLGNBQUgsQ0FBa0IsV0FBbEIsQ0FBakI7QUFDQSxXQUFLbEIsVUFBTCxHQUFrQmMsR0FBR0ksY0FBSCxDQUFrQixZQUFsQixDQUFsQjtBQUNBLFdBQUtDLE9BQUw7QUFDQSxXQUFLQyxPQUFMO0FBQ0EsV0FBS0MsTUFBTDtBQUNEOzs7OEJBV1M7QUFBQTs7QUFDUiwrQkFBYztBQUNaQyxrQkFBVSxPQURFO0FBRVpDLGtCQUFVLEtBQUtOLFNBQUwsQ0FBZU8sRUFGYjtBQUdacEIsY0FBTSxTQUhNO0FBSVpOLFlBQUksS0FBS0EsRUFKRztBQUtaRCxZQUFJLEtBQUtBO0FBTEcsT0FBZCxFQU1HNEIsSUFOSCxDQU1RLGVBQU87QUFDYixlQUFLdEIsSUFBTCxHQUFZdUIsSUFBSTlCLElBQUosQ0FBU08sSUFBckI7QUFDQSxlQUFLa0IsTUFBTDtBQUNELE9BVEQ7QUFVRDs7OzhCQUNTO0FBQUE7O0FBQ1IsbUNBQWU7QUFDYk0sbUJBQVcsS0FBSzNCLFVBQUwsQ0FBZ0IyQixTQURkO0FBRWJKLGtCQUFVLEtBQUtOLFNBQUwsQ0FBZU87QUFGWixPQUFmLEVBR0dDLElBSEgsQ0FHUSxlQUFPO0FBQUEsWUFDUDdCLElBRE8sR0FDRThCLElBQUk5QixJQUROLENBQ1BBLElBRE87O0FBRWIsZUFBS0csT0FBTCxHQUFlSCxLQUFLRyxPQUFwQjtBQUNBLGVBQUtHLFVBQUwsR0FBa0JOLEtBQUtnQyxnQkFBdkI7QUFDQSxlQUFLUCxNQUFMO0FBQ0QsT0FSRDtBQVNEOzs7O0VBM0RtQ1EsZUFBS0MsSTs7a0JBQXRCckMsUSIsImZpbGUiOiJjYXNoZmxvdy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7IGdldEZpbmFuY2VJbmZvIH0gZnJvbSAnLi4vYXBpL2ZpbmFuY2UnXG5pbXBvcnQgeyBnZXRDaXJjbGVMaXN0IH0gZnJvbSAnLi4vYXBpL3pvbmUnXG5pbXBvcnQgeyBwcmV2aWV3SW1hZ2UgfSBmcm9tICcuLi91dGlscy9jb21tb24nXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBjYXNoZmxvdyBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6LSi5Yqh6K6w6LSmJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgcG46IDEsXG4gICAgcHM6IDEwLFxuICAgIGJhbGFuY2U6IDAsXG4gICAgbWVtYmVySW5mbzogbnVsbCxcbiAgICBmaW5hbmNpYWxEYXRhOiB7fSxcbiAgICBtZW1iZXJMaXN0OiBbXSxcbiAgICBsaXN0OiBbXSxcbiAgICB0eXBlOiB7XG4gICAgICBjaXJjbGVzOiAn5a626ZW/5ZyIJyxcbiAgICAgIGNvbGxlY3Rpb246ICfmlLbmrL4nLFxuICAgICAgbm90aWZ5OiAn6YCa55+lJyxcbiAgICAgIGFjdGl2aXR5OiAn5rS75YqoJyxcbiAgICAgIGFjY291bnQ6ICforrDotKYnXG4gICAgfVxuICB9XG4gIG9uTG9hZCgpIHtcbiAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxuICAgIHRoaXMubWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcbiAgICB0aGlzLmdldExpc3QoKVxuICAgIHRoaXMuZ2V0SW5mbygpXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgcHJldmlldyh1cmxzKSB7XG4gICAgICBwcmV2aWV3SW1hZ2UodXJsc1swXSwgdXJscylcbiAgICB9LFxuICAgIGp1bXBQYWdlKCkge1xuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogJ3pvbmUnXG4gICAgICB9KVxuICAgIH1cbiAgfVxuICBnZXRMaXN0KCkge1xuICAgIGdldENpcmNsZUxpc3Qoe1xuICAgICAgc2VlX3R5cGU6ICdjbGFzcycsXG4gICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXG4gICAgICB0eXBlOiAnYWNjb3VudCcsXG4gICAgICBwczogdGhpcy5wcyxcbiAgICAgIHBuOiB0aGlzLnBuXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgdGhpcy5saXN0ID0gcmVzLmRhdGEubGlzdFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0pXG4gIH1cbiAgZ2V0SW5mbygpIHtcbiAgICBnZXRGaW5hbmNlSW5mbyh7XG4gICAgICBtZW1iZXJfaWQ6IHRoaXMubWVtYmVySW5mby5tZW1iZXJfaWQsXG4gICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWRcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgeyBkYXRhIH0gPSByZXMuZGF0YVxuICAgICAgdGhpcy5iYWxhbmNlID0gZGF0YS5iYWxhbmNlXG4gICAgICB0aGlzLm1lbWJlckxpc3QgPSBkYXRhLmZpbmFuY2lhbF9tZW1iZXJcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9KVxuICB9XG59XG4iXX0=