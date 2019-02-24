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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhc2hmbG93LmpzIl0sIm5hbWVzIjpbImNhc2hmbG93IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJwbiIsInBzIiwiYmFsYW5jZSIsIm1lbWJlckluZm8iLCJmaW5hbmNpYWxEYXRhIiwibWVtYmVyTGlzdCIsImxpc3QiLCJ0eXBlIiwiY2lyY2xlcyIsImNvbGxlY3Rpb24iLCJub3RpZnkiLCJhY3Rpdml0eSIsImFjY291bnQiLCJtZXRob2RzIiwicHJldmlldyIsInVybHMiLCJqdW1wUGFnZSIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsImNsYXNzSW5mbyIsImdldFN0b3JhZ2VTeW5jIiwiZ2V0TGlzdCIsImdldEluZm8iLCIkYXBwbHkiLCJzZWVfdHlwZSIsImNsYXNzX2lkIiwiaWQiLCJ0aGVuIiwicmVzIiwibWVtYmVyX2lkIiwiZmluYW5jaWFsX21lbWJlciIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBQ3FCQSxROzs7Ozs7Ozs7Ozs7OzswTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsVUFBSSxDQURDO0FBRUxDLFVBQUksRUFGQztBQUdMQyxlQUFTLENBSEo7QUFJTEMsa0JBQVksSUFKUDtBQUtMQyxxQkFBZSxFQUxWO0FBTUxDLGtCQUFZLEVBTlA7QUFPTEMsWUFBTSxFQVBEO0FBUUxDLFlBQU07QUFDSkMsaUJBQVMsS0FETDtBQUVKQyxvQkFBWSxJQUZSO0FBR0pDLGdCQUFRLElBSEo7QUFJSkMsa0JBQVUsSUFKTjtBQUtKQyxpQkFBUztBQUxMO0FBUkQsSyxRQXVCUEMsTyxHQUFVO0FBQ1JDLGFBRFEsbUJBQ0FDLElBREEsRUFDTTtBQUNaLGtDQUFhQSxLQUFLLENBQUwsQ0FBYixFQUFzQkEsSUFBdEI7QUFDRCxPQUhPO0FBSVJDLGNBSlEsc0JBSUc7QUFDVEMsV0FBR0MsVUFBSCxDQUFjO0FBQ1pDLGVBQUs7QUFETyxTQUFkO0FBR0Q7QUFSTyxLOzs7Ozs2QkFQRDtBQUNQLFdBQUtDLFNBQUwsR0FBaUJILEdBQUdJLGNBQUgsQ0FBa0IsV0FBbEIsQ0FBakI7QUFDQSxXQUFLbEIsVUFBTCxHQUFrQmMsR0FBR0ksY0FBSCxDQUFrQixZQUFsQixDQUFsQjtBQUNBLFdBQUtDLE9BQUw7QUFDQSxXQUFLQyxPQUFMO0FBQ0EsV0FBS0MsTUFBTDtBQUNEOzs7OEJBV1M7QUFBQTs7QUFDUiwrQkFBYztBQUNaQyxrQkFBVSxPQURFO0FBRVpDLGtCQUFVLEtBQUtOLFNBQUwsQ0FBZU8sRUFGYjtBQUdacEIsY0FBTSxTQUhNO0FBSVpOLFlBQUksS0FBS0EsRUFKRztBQUtaRCxZQUFJLEtBQUtBO0FBTEcsT0FBZCxFQU1HNEIsSUFOSCxDQU1RLGVBQU87QUFDYixlQUFLdEIsSUFBTCxHQUFZdUIsSUFBSTlCLElBQUosQ0FBU08sSUFBckI7QUFDQSxlQUFLa0IsTUFBTDtBQUNELE9BVEQ7QUFVRDs7OzhCQUNTO0FBQUE7O0FBQ1IsbUNBQWU7QUFDYk0sbUJBQVcsS0FBSzNCLFVBQUwsQ0FBZ0IyQixTQURkO0FBRWJKLGtCQUFVLEtBQUtOLFNBQUwsQ0FBZU87QUFGWixPQUFmLEVBR0dDLElBSEgsQ0FHUSxlQUFPO0FBQUEsWUFDUDdCLElBRE8sR0FDRThCLElBQUk5QixJQUROLENBQ1BBLElBRE87O0FBRWIsZUFBS0csT0FBTCxHQUFlSCxLQUFLRyxPQUFwQjtBQUNBLGVBQUtHLFVBQUwsR0FBa0JOLEtBQUtnQyxnQkFBdkI7QUFDQSxlQUFLUCxNQUFMO0FBQ0QsT0FSRDtBQVNEOzs7O0VBM0RtQ1EsZUFBS0MsSTs7a0JBQXRCckMsUSIsImZpbGUiOiJjYXNoZmxvdy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgeyBnZXRGaW5hbmNlSW5mbyB9IGZyb20gJy4uL2FwaS9maW5hbmNlJ1xyXG5pbXBvcnQgeyBnZXRDaXJjbGVMaXN0IH0gZnJvbSAnLi4vYXBpL3pvbmUnXHJcbmltcG9ydCB7IHByZXZpZXdJbWFnZSB9IGZyb20gJy4uL3V0aWxzL2NvbW1vbidcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgY2FzaGZsb3cgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfotKLliqHorrDotKYnXHJcbiAgfVxyXG4gIGRhdGEgPSB7XHJcbiAgICBwbjogMSxcclxuICAgIHBzOiAxMCxcclxuICAgIGJhbGFuY2U6IDAsXHJcbiAgICBtZW1iZXJJbmZvOiBudWxsLFxyXG4gICAgZmluYW5jaWFsRGF0YToge30sXHJcbiAgICBtZW1iZXJMaXN0OiBbXSxcclxuICAgIGxpc3Q6IFtdLFxyXG4gICAgdHlwZToge1xyXG4gICAgICBjaXJjbGVzOiAn5a626ZW/5ZyIJyxcclxuICAgICAgY29sbGVjdGlvbjogJ+aUtuasvicsXHJcbiAgICAgIG5vdGlmeTogJ+mAmuefpScsXHJcbiAgICAgIGFjdGl2aXR5OiAn5rS75YqoJyxcclxuICAgICAgYWNjb3VudDogJ+iusOi0pidcclxuICAgIH1cclxuICB9XHJcbiAgb25Mb2FkKCkge1xyXG4gICAgdGhpcy5jbGFzc0luZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnY2xhc3NJbmZvJylcclxuICAgIHRoaXMubWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcclxuICAgIHRoaXMuZ2V0TGlzdCgpXHJcbiAgICB0aGlzLmdldEluZm8oKVxyXG4gICAgdGhpcy4kYXBwbHkoKVxyXG4gIH1cclxuICBtZXRob2RzID0ge1xyXG4gICAgcHJldmlldyh1cmxzKSB7XHJcbiAgICAgIHByZXZpZXdJbWFnZSh1cmxzWzBdLCB1cmxzKVxyXG4gICAgfSxcclxuICAgIGp1bXBQYWdlKCkge1xyXG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICB1cmw6ICd6b25lJ1xyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuICBnZXRMaXN0KCkge1xyXG4gICAgZ2V0Q2lyY2xlTGlzdCh7XHJcbiAgICAgIHNlZV90eXBlOiAnY2xhc3MnLFxyXG4gICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXHJcbiAgICAgIHR5cGU6ICdhY2NvdW50JyxcclxuICAgICAgcHM6IHRoaXMucHMsXHJcbiAgICAgIHBuOiB0aGlzLnBuXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHRoaXMubGlzdCA9IHJlcy5kYXRhLmxpc3RcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSlcclxuICB9XHJcbiAgZ2V0SW5mbygpIHtcclxuICAgIGdldEZpbmFuY2VJbmZvKHtcclxuICAgICAgbWVtYmVyX2lkOiB0aGlzLm1lbWJlckluZm8ubWVtYmVyX2lkLFxyXG4gICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWRcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgbGV0IHsgZGF0YSB9ID0gcmVzLmRhdGFcclxuICAgICAgdGhpcy5iYWxhbmNlID0gZGF0YS5iYWxhbmNlXHJcbiAgICAgIHRoaXMubWVtYmVyTGlzdCA9IGRhdGEuZmluYW5jaWFsX21lbWJlclxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG4iXX0=