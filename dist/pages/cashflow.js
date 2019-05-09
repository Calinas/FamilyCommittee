'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _finance = require('./../api/finance.js');

var _zone = require('./../api/zone.js');

var _normalize = require('./../utils/normalize.js');

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

        list = list.map(_normalize.cashflowObj);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhc2hmbG93LmpzIl0sIm5hbWVzIjpbImNhc2hmbG93IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJsb2FkaW5nIiwibG9hZEZpbmlzaGVkIiwicG4iLCJwcyIsImJhbGFuY2UiLCJtZW1iZXJJbmZvIiwiZmluYW5jaWFsRGF0YSIsIm1lbWJlckxpc3QiLCJsaXN0IiwidHlwZSIsImNpcmNsZXMiLCJjb2xsZWN0aW9uIiwibm90aWZ5IiwiYWN0aXZpdHkiLCJhY2NvdW50IiwibWV0aG9kcyIsInByZXZpZXciLCJ1cmxzIiwiY2xhc3NJbmZvIiwid3giLCJnZXRTdG9yYWdlU3luYyIsImdldExpc3QiLCJnZXRJbmZvIiwiJGFwcGx5Iiwic2VlX3R5cGUiLCJjbGFzc19pZCIsImlkIiwidGhlbiIsInJlcyIsIm1hcCIsImNhc2hmbG93T2JqIiwibGVuZ3RoIiwibWVtYmVyX2lkIiwiZmluYW5jaWFsX21lbWJlciIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzBMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxlQUFTLEtBREo7QUFFTEMsb0JBQWMsS0FGVDtBQUdMQyxVQUFJLENBSEM7QUFJTEMsVUFBSSxFQUpDO0FBS0xDLGVBQVMsQ0FMSjtBQU1MQyxrQkFBWSxJQU5QO0FBT0xDLHFCQUFlLEVBUFY7QUFRTEMsa0JBQVksRUFSUDtBQVNMQyxZQUFNLEVBVEQ7QUFVTEMsWUFBTTtBQUNKQyxpQkFBUyxLQURMO0FBRUpDLG9CQUFZLElBRlI7QUFHSkMsZ0JBQVEsSUFISjtBQUlKQyxrQkFBVSxJQUpOO0FBS0pDLGlCQUFTO0FBTEw7QUFWRCxLLFFBNkJQQyxPLEdBQVU7QUFDUkMsYUFEUSxtQkFDQUMsSUFEQSxFQUNNO0FBQ1osa0NBQWFBLEtBQUssQ0FBTCxDQUFiLEVBQXNCQSxJQUF0QjtBQUNEO0FBSE8sSzs7Ozs7NkJBWEQ7QUFDUCxXQUFLQyxTQUFMLEdBQWlCQyxHQUFHQyxjQUFILENBQWtCLFdBQWxCLENBQWpCO0FBQ0EsV0FBS2YsVUFBTCxHQUFrQmMsR0FBR0MsY0FBSCxDQUFrQixZQUFsQixDQUFsQjtBQUNBLFdBQUtDLE9BQUw7QUFDQSxXQUFLQyxPQUFMO0FBQ0EsV0FBS0MsTUFBTDtBQUNEOzs7b0NBQ2U7QUFDZCxVQUFJLEtBQUt2QixPQUFMLElBQWdCLEtBQUtDLFlBQXpCLEVBQXVDO0FBQ3ZDLFdBQUtvQixPQUFMO0FBQ0Q7Ozs4QkFNUztBQUFBOztBQUNSLFdBQUtyQixPQUFMLEdBQWUsSUFBZjtBQUNBLCtCQUFjO0FBQ1p3QixrQkFBVSxPQURFO0FBRVpDLGtCQUFVLEtBQUtQLFNBQUwsQ0FBZVEsRUFGYjtBQUdaakIsY0FBTSxTQUhNO0FBSVpOLFlBQUksS0FBS0EsRUFKRztBQUtaRCxZQUFJLEtBQUtBO0FBTEcsT0FBZCxFQU1HeUIsSUFOSCxDQU1RLGVBQU87QUFBQSxZQUNQbkIsSUFETyxHQUNFb0IsSUFBSTdCLElBRE4sQ0FDUFMsSUFETzs7QUFFYkEsZUFBT0EsS0FBS3FCLEdBQUwsQ0FBU0Msc0JBQVQsQ0FBUDtBQUNBLGVBQUs5QixPQUFMLEdBQWUsS0FBZjtBQUNBLGVBQUtFLEVBQUw7QUFDQSxZQUFJTSxLQUFLdUIsTUFBTCxHQUFjLE9BQUs1QixFQUF2QixFQUEyQjtBQUN6QixpQkFBS0YsWUFBTCxHQUFvQixJQUFwQjtBQUNEO0FBQ0QsZUFBS08sSUFBTCxnQ0FBZ0IsT0FBS0EsSUFBckIsc0JBQThCQSxJQUE5QjtBQUNBLGVBQUtlLE1BQUw7QUFDRCxPQWhCRDtBQWlCRDs7OzhCQUNTO0FBQUE7O0FBQ1IsbUNBQWU7QUFDYlMsbUJBQVcsS0FBSzNCLFVBQUwsQ0FBZ0IyQixTQURkO0FBRWJQLGtCQUFVLEtBQUtQLFNBQUwsQ0FBZVE7QUFGWixPQUFmLEVBR0dDLElBSEgsQ0FHUSxlQUFPO0FBQUEsWUFDUDVCLElBRE8sR0FDRTZCLElBQUk3QixJQUROLENBQ1BBLElBRE87O0FBRWIsZUFBS0ssT0FBTCxHQUFlTCxLQUFLSyxPQUFwQjtBQUNBLGVBQUtHLFVBQUwsR0FBa0JSLEtBQUtrQyxnQkFBdkI7QUFDQSxlQUFLVixNQUFMO0FBQ0QsT0FSRDtBQVNEOzs7O0VBcEVtQ1csZUFBS0MsSTs7a0JBQXRCdkMsUSIsImZpbGUiOiJjYXNoZmxvdy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7IGdldEZpbmFuY2VJbmZvIH0gZnJvbSAnLi4vYXBpL2ZpbmFuY2UnXG5pbXBvcnQgeyBnZXRDaXJjbGVMaXN0IH0gZnJvbSAnLi4vYXBpL3pvbmUnXG5pbXBvcnQgeyBjYXNoZmxvd09iaiB9IGZyb20gJy4uL3V0aWxzL25vcm1hbGl6ZSdcbmltcG9ydCB7IHByZXZpZXdJbWFnZSB9IGZyb20gJy4uL3V0aWxzL2NvbW1vbidcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGNhc2hmbG93IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfotKLliqHorrDotKYnXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICBsb2FkRmluaXNoZWQ6IGZhbHNlLFxuICAgIHBuOiAxLFxuICAgIHBzOiAxMCxcbiAgICBiYWxhbmNlOiAwLFxuICAgIG1lbWJlckluZm86IG51bGwsXG4gICAgZmluYW5jaWFsRGF0YToge30sXG4gICAgbWVtYmVyTGlzdDogW10sXG4gICAgbGlzdDogW10sXG4gICAgdHlwZToge1xuICAgICAgY2lyY2xlczogJ+WutumVv+WciCcsXG4gICAgICBjb2xsZWN0aW9uOiAn5pS25qy+JyxcbiAgICAgIG5vdGlmeTogJ+mAmuefpScsXG4gICAgICBhY3Rpdml0eTogJ+a0u+WKqCcsXG4gICAgICBhY2NvdW50OiAn6K6w6LSmJ1xuICAgIH1cbiAgfVxuICBvbkxvYWQoKSB7XG4gICAgdGhpcy5jbGFzc0luZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnY2xhc3NJbmZvJylcbiAgICB0aGlzLm1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXG4gICAgdGhpcy5nZXRMaXN0KClcbiAgICB0aGlzLmdldEluZm8oKVxuICAgIHRoaXMuJGFwcGx5KClcbiAgfVxuICBvblJlYWNoQm90dG9tKCkge1xuICAgIGlmICh0aGlzLmxvYWRpbmcgfHwgdGhpcy5sb2FkRmluaXNoZWQpIHJldHVyblxuICAgIHRoaXMuZ2V0TGlzdCgpXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBwcmV2aWV3KHVybHMpIHtcbiAgICAgIHByZXZpZXdJbWFnZSh1cmxzWzBdLCB1cmxzKVxuICAgIH1cbiAgfVxuICBnZXRMaXN0KCkge1xuICAgIHRoaXMubG9hZGluZyA9IHRydWVcbiAgICBnZXRDaXJjbGVMaXN0KHtcbiAgICAgIHNlZV90eXBlOiAnY2xhc3MnLFxuICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgdHlwZTogJ2FjY291bnQnLFxuICAgICAgcHM6IHRoaXMucHMsXG4gICAgICBwbjogdGhpcy5wblxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIGxldCB7IGxpc3QgfSA9IHJlcy5kYXRhXG4gICAgICBsaXN0ID0gbGlzdC5tYXAoY2FzaGZsb3dPYmopXG4gICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZVxuICAgICAgdGhpcy5wbisrXG4gICAgICBpZiAobGlzdC5sZW5ndGggPCB0aGlzLnBzKSB7XG4gICAgICAgIHRoaXMubG9hZEZpbmlzaGVkID0gdHJ1ZVxuICAgICAgfVxuICAgICAgdGhpcy5saXN0ID0gWy4uLnRoaXMubGlzdCwgLi4ubGlzdF1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9KVxuICB9XG4gIGdldEluZm8oKSB7XG4gICAgZ2V0RmluYW5jZUluZm8oe1xuICAgICAgbWVtYmVyX2lkOiB0aGlzLm1lbWJlckluZm8ubWVtYmVyX2lkLFxuICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IHsgZGF0YSB9ID0gcmVzLmRhdGFcbiAgICAgIHRoaXMuYmFsYW5jZSA9IGRhdGEuYmFsYW5jZVxuICAgICAgdGhpcy5tZW1iZXJMaXN0ID0gZGF0YS5maW5hbmNpYWxfbWVtYmVyXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSlcbiAgfVxufVxuIl19