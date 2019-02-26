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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
      loading: false,
      loadFinished: false,
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
    key: 'onReachBottom',
    value: function onReachBottom() {
      if (this.loading || this.loadFinished) return;
      this.getList();
    }
  }, {
    key: 'getList',
    value: function getList() {
      var _this2 = this;

      this.loading = true;
      (0, _zone.getCircleList)({
        see_type: 'class',
        class_id: this.classInfo.id,
        type: 'account',
        ps: this.ps,
        pn: this.pn
      }).then(function (res) {
        var list = res.data.list;

        _this2.loading = false;
        _this2.pn++;
        if (list.length < _this2.ps) {
          _this2.loadFinished = true;
        }
        _this2.list = [].concat(_toConsumableArray(_this2.list), _toConsumableArray(list));
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhc2hmbG93LmpzIl0sIm5hbWVzIjpbImNhc2hmbG93IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJsb2FkaW5nIiwibG9hZEZpbmlzaGVkIiwicG4iLCJwcyIsImJhbGFuY2UiLCJtZW1iZXJJbmZvIiwiZmluYW5jaWFsRGF0YSIsIm1lbWJlckxpc3QiLCJsaXN0IiwidHlwZSIsImNpcmNsZXMiLCJjb2xsZWN0aW9uIiwibm90aWZ5IiwiYWN0aXZpdHkiLCJhY2NvdW50IiwibWV0aG9kcyIsInByZXZpZXciLCJ1cmxzIiwianVtcFBhZ2UiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjbGFzc0luZm8iLCJnZXRTdG9yYWdlU3luYyIsImdldExpc3QiLCJnZXRJbmZvIiwiJGFwcGx5Iiwic2VlX3R5cGUiLCJjbGFzc19pZCIsImlkIiwidGhlbiIsInJlcyIsImxlbmd0aCIsIm1lbWJlcl9pZCIsImZpbmFuY2lhbF9tZW1iZXIiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxROzs7Ozs7Ozs7Ozs7OzswTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsZUFBUyxLQURKO0FBRUxDLG9CQUFjLEtBRlQ7QUFHTEMsVUFBSSxDQUhDO0FBSUxDLFVBQUksRUFKQztBQUtMQyxlQUFTLENBTEo7QUFNTEMsa0JBQVksSUFOUDtBQU9MQyxxQkFBZSxFQVBWO0FBUUxDLGtCQUFZLEVBUlA7QUFTTEMsWUFBTSxFQVREO0FBVUxDLFlBQU07QUFDSkMsaUJBQVMsS0FETDtBQUVKQyxvQkFBWSxJQUZSO0FBR0pDLGdCQUFRLElBSEo7QUFJSkMsa0JBQVUsSUFKTjtBQUtKQyxpQkFBUztBQUxMO0FBVkQsSyxRQTZCUEMsTyxHQUFVO0FBQ1JDLGFBRFEsbUJBQ0FDLElBREEsRUFDTTtBQUNaLGtDQUFhQSxLQUFLLENBQUwsQ0FBYixFQUFzQkEsSUFBdEI7QUFDRCxPQUhPO0FBSVJDLGNBSlEsc0JBSUc7QUFDVEMsV0FBR0MsVUFBSCxDQUFjO0FBQ1pDLGVBQUs7QUFETyxTQUFkO0FBR0Q7QUFSTyxLOzs7Ozs2QkFYRDtBQUNQLFdBQUtDLFNBQUwsR0FBaUJILEdBQUdJLGNBQUgsQ0FBa0IsV0FBbEIsQ0FBakI7QUFDQSxXQUFLbEIsVUFBTCxHQUFrQmMsR0FBR0ksY0FBSCxDQUFrQixZQUFsQixDQUFsQjtBQUNBLFdBQUtDLE9BQUw7QUFDQSxXQUFLQyxPQUFMO0FBQ0EsV0FBS0MsTUFBTDtBQUNEOzs7b0NBQ2U7QUFDZCxVQUFJLEtBQUsxQixPQUFMLElBQWdCLEtBQUtDLFlBQXpCLEVBQXVDO0FBQ3ZDLFdBQUt1QixPQUFMO0FBQ0Q7Ozs4QkFXUztBQUFBOztBQUNSLFdBQUt4QixPQUFMLEdBQWUsSUFBZjtBQUNBLCtCQUFjO0FBQ1oyQixrQkFBVSxPQURFO0FBRVpDLGtCQUFVLEtBQUtOLFNBQUwsQ0FBZU8sRUFGYjtBQUdacEIsY0FBTSxTQUhNO0FBSVpOLFlBQUksS0FBS0EsRUFKRztBQUtaRCxZQUFJLEtBQUtBO0FBTEcsT0FBZCxFQU1HNEIsSUFOSCxDQU1RLGVBQU87QUFBQSxZQUNQdEIsSUFETyxHQUNFdUIsSUFBSWhDLElBRE4sQ0FDUFMsSUFETzs7QUFFYixlQUFLUixPQUFMLEdBQWUsS0FBZjtBQUNBLGVBQUtFLEVBQUw7QUFDQSxZQUFJTSxLQUFLd0IsTUFBTCxHQUFjLE9BQUs3QixFQUF2QixFQUEyQjtBQUN6QixpQkFBS0YsWUFBTCxHQUFvQixJQUFwQjtBQUNEO0FBQ0QsZUFBS08sSUFBTCxnQ0FBZ0IsT0FBS0EsSUFBckIsc0JBQThCQSxJQUE5QjtBQUNBLGVBQUtrQixNQUFMO0FBQ0QsT0FmRDtBQWdCRDs7OzhCQUNTO0FBQUE7O0FBQ1IsbUNBQWU7QUFDYk8sbUJBQVcsS0FBSzVCLFVBQUwsQ0FBZ0I0QixTQURkO0FBRWJMLGtCQUFVLEtBQUtOLFNBQUwsQ0FBZU87QUFGWixPQUFmLEVBR0dDLElBSEgsQ0FHUSxlQUFPO0FBQUEsWUFDUC9CLElBRE8sR0FDRWdDLElBQUloQyxJQUROLENBQ1BBLElBRE87O0FBRWIsZUFBS0ssT0FBTCxHQUFlTCxLQUFLSyxPQUFwQjtBQUNBLGVBQUtHLFVBQUwsR0FBa0JSLEtBQUttQyxnQkFBdkI7QUFDQSxlQUFLUixNQUFMO0FBQ0QsT0FSRDtBQVNEOzs7O0VBeEVtQ1MsZUFBS0MsSTs7a0JBQXRCeEMsUSIsImZpbGUiOiJjYXNoZmxvdy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgeyBnZXRGaW5hbmNlSW5mbyB9IGZyb20gJy4uL2FwaS9maW5hbmNlJ1xyXG5pbXBvcnQgeyBnZXRDaXJjbGVMaXN0IH0gZnJvbSAnLi4vYXBpL3pvbmUnXHJcbmltcG9ydCB7IHByZXZpZXdJbWFnZSB9IGZyb20gJy4uL3V0aWxzL2NvbW1vbidcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgY2FzaGZsb3cgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfotKLliqHorrDotKYnXHJcbiAgfVxyXG4gIGRhdGEgPSB7XHJcbiAgICBsb2FkaW5nOiBmYWxzZSxcclxuICAgIGxvYWRGaW5pc2hlZDogZmFsc2UsXHJcbiAgICBwbjogMSxcclxuICAgIHBzOiAxMCxcclxuICAgIGJhbGFuY2U6IDAsXHJcbiAgICBtZW1iZXJJbmZvOiBudWxsLFxyXG4gICAgZmluYW5jaWFsRGF0YToge30sXHJcbiAgICBtZW1iZXJMaXN0OiBbXSxcclxuICAgIGxpc3Q6IFtdLFxyXG4gICAgdHlwZToge1xyXG4gICAgICBjaXJjbGVzOiAn5a626ZW/5ZyIJyxcclxuICAgICAgY29sbGVjdGlvbjogJ+aUtuasvicsXHJcbiAgICAgIG5vdGlmeTogJ+mAmuefpScsXHJcbiAgICAgIGFjdGl2aXR5OiAn5rS75YqoJyxcclxuICAgICAgYWNjb3VudDogJ+iusOi0pidcclxuICAgIH1cclxuICB9XHJcbiAgb25Mb2FkKCkge1xyXG4gICAgdGhpcy5jbGFzc0luZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnY2xhc3NJbmZvJylcclxuICAgIHRoaXMubWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcclxuICAgIHRoaXMuZ2V0TGlzdCgpXHJcbiAgICB0aGlzLmdldEluZm8oKVxyXG4gICAgdGhpcy4kYXBwbHkoKVxyXG4gIH1cclxuICBvblJlYWNoQm90dG9tKCkge1xyXG4gICAgaWYgKHRoaXMubG9hZGluZyB8fCB0aGlzLmxvYWRGaW5pc2hlZCkgcmV0dXJuXHJcbiAgICB0aGlzLmdldExpc3QoKVxyXG4gIH1cclxuICBtZXRob2RzID0ge1xyXG4gICAgcHJldmlldyh1cmxzKSB7XHJcbiAgICAgIHByZXZpZXdJbWFnZSh1cmxzWzBdLCB1cmxzKVxyXG4gICAgfSxcclxuICAgIGp1bXBQYWdlKCkge1xyXG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICB1cmw6ICd6b25lJ1xyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuICBnZXRMaXN0KCkge1xyXG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZVxyXG4gICAgZ2V0Q2lyY2xlTGlzdCh7XHJcbiAgICAgIHNlZV90eXBlOiAnY2xhc3MnLFxyXG4gICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXHJcbiAgICAgIHR5cGU6ICdhY2NvdW50JyxcclxuICAgICAgcHM6IHRoaXMucHMsXHJcbiAgICAgIHBuOiB0aGlzLnBuXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGxldCB7IGxpc3QgfSA9IHJlcy5kYXRhXHJcbiAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlXHJcbiAgICAgIHRoaXMucG4rK1xyXG4gICAgICBpZiAobGlzdC5sZW5ndGggPCB0aGlzLnBzKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkRmluaXNoZWQgPSB0cnVlXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5saXN0ID0gWy4uLnRoaXMubGlzdCwgLi4ubGlzdF1cclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSlcclxuICB9XHJcbiAgZ2V0SW5mbygpIHtcclxuICAgIGdldEZpbmFuY2VJbmZvKHtcclxuICAgICAgbWVtYmVyX2lkOiB0aGlzLm1lbWJlckluZm8ubWVtYmVyX2lkLFxyXG4gICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWRcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgbGV0IHsgZGF0YSB9ID0gcmVzLmRhdGFcclxuICAgICAgdGhpcy5iYWxhbmNlID0gZGF0YS5iYWxhbmNlXHJcbiAgICAgIHRoaXMubWVtYmVyTGlzdCA9IGRhdGEuZmluYW5jaWFsX21lbWJlclxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG4iXX0=