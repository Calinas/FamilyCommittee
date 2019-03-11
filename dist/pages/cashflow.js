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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhc2hmbG93LmpzIl0sIm5hbWVzIjpbImNhc2hmbG93IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJsb2FkaW5nIiwibG9hZEZpbmlzaGVkIiwicG4iLCJwcyIsImJhbGFuY2UiLCJtZW1iZXJJbmZvIiwiZmluYW5jaWFsRGF0YSIsIm1lbWJlckxpc3QiLCJsaXN0IiwidHlwZSIsImNpcmNsZXMiLCJjb2xsZWN0aW9uIiwibm90aWZ5IiwiYWN0aXZpdHkiLCJhY2NvdW50IiwibWV0aG9kcyIsInByZXZpZXciLCJ1cmxzIiwianVtcFBhZ2UiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjbGFzc0luZm8iLCJnZXRTdG9yYWdlU3luYyIsImdldExpc3QiLCJnZXRJbmZvIiwiJGFwcGx5Iiwic2VlX3R5cGUiLCJjbGFzc19pZCIsImlkIiwidGhlbiIsInJlcyIsImxlbmd0aCIsIm1lbWJlcl9pZCIsImZpbmFuY2lhbF9tZW1iZXIiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxROzs7Ozs7Ozs7Ozs7OzswTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsZUFBUyxLQURKO0FBRUxDLG9CQUFjLEtBRlQ7QUFHTEMsVUFBSSxDQUhDO0FBSUxDLFVBQUksRUFKQztBQUtMQyxlQUFTLENBTEo7QUFNTEMsa0JBQVksSUFOUDtBQU9MQyxxQkFBZSxFQVBWO0FBUUxDLGtCQUFZLEVBUlA7QUFTTEMsWUFBTSxFQVREO0FBVUxDLFlBQU07QUFDSkMsaUJBQVMsS0FETDtBQUVKQyxvQkFBWSxJQUZSO0FBR0pDLGdCQUFRLElBSEo7QUFJSkMsa0JBQVUsSUFKTjtBQUtKQyxpQkFBUztBQUxMO0FBVkQsSyxRQTZCUEMsTyxHQUFVO0FBQ1JDLGFBRFEsbUJBQ0FDLElBREEsRUFDTTtBQUNaLGtDQUFhQSxLQUFLLENBQUwsQ0FBYixFQUFzQkEsSUFBdEI7QUFDRCxPQUhPO0FBSVJDLGNBSlEsc0JBSUc7QUFDVEMsV0FBR0MsVUFBSCxDQUFjO0FBQ1pDLGVBQUs7QUFETyxTQUFkO0FBR0Q7QUFSTyxLOzs7Ozs2QkFYRDtBQUNQLFdBQUtDLFNBQUwsR0FBaUJILEdBQUdJLGNBQUgsQ0FBa0IsV0FBbEIsQ0FBakI7QUFDQSxXQUFLbEIsVUFBTCxHQUFrQmMsR0FBR0ksY0FBSCxDQUFrQixZQUFsQixDQUFsQjtBQUNBLFdBQUtDLE9BQUw7QUFDQSxXQUFLQyxPQUFMO0FBQ0EsV0FBS0MsTUFBTDtBQUNEOzs7b0NBQ2U7QUFDZCxVQUFJLEtBQUsxQixPQUFMLElBQWdCLEtBQUtDLFlBQXpCLEVBQXVDO0FBQ3ZDLFdBQUt1QixPQUFMO0FBQ0Q7Ozs4QkFXUztBQUFBOztBQUNSLFdBQUt4QixPQUFMLEdBQWUsSUFBZjtBQUNBLCtCQUFjO0FBQ1oyQixrQkFBVSxPQURFO0FBRVpDLGtCQUFVLEtBQUtOLFNBQUwsQ0FBZU8sRUFGYjtBQUdacEIsY0FBTSxTQUhNO0FBSVpOLFlBQUksS0FBS0EsRUFKRztBQUtaRCxZQUFJLEtBQUtBO0FBTEcsT0FBZCxFQU1HNEIsSUFOSCxDQU1RLGVBQU87QUFBQSxZQUNQdEIsSUFETyxHQUNFdUIsSUFBSWhDLElBRE4sQ0FDUFMsSUFETzs7QUFFYixlQUFLUixPQUFMLEdBQWUsS0FBZjtBQUNBLGVBQUtFLEVBQUw7QUFDQSxZQUFJTSxLQUFLd0IsTUFBTCxHQUFjLE9BQUs3QixFQUF2QixFQUEyQjtBQUN6QixpQkFBS0YsWUFBTCxHQUFvQixJQUFwQjtBQUNEO0FBQ0QsZUFBS08sSUFBTCxnQ0FBZ0IsT0FBS0EsSUFBckIsc0JBQThCQSxJQUE5QjtBQUNBLGVBQUtrQixNQUFMO0FBQ0QsT0FmRDtBQWdCRDs7OzhCQUNTO0FBQUE7O0FBQ1IsbUNBQWU7QUFDYk8sbUJBQVcsS0FBSzVCLFVBQUwsQ0FBZ0I0QixTQURkO0FBRWJMLGtCQUFVLEtBQUtOLFNBQUwsQ0FBZU87QUFGWixPQUFmLEVBR0dDLElBSEgsQ0FHUSxlQUFPO0FBQUEsWUFDUC9CLElBRE8sR0FDRWdDLElBQUloQyxJQUROLENBQ1BBLElBRE87O0FBRWIsZUFBS0ssT0FBTCxHQUFlTCxLQUFLSyxPQUFwQjtBQUNBLGVBQUtHLFVBQUwsR0FBa0JSLEtBQUttQyxnQkFBdkI7QUFDQSxlQUFLUixNQUFMO0FBQ0QsT0FSRDtBQVNEOzs7O0VBeEVtQ1MsZUFBS0MsSTs7a0JBQXRCeEMsUSIsImZpbGUiOiJjYXNoZmxvdy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7IGdldEZpbmFuY2VJbmZvIH0gZnJvbSAnLi4vYXBpL2ZpbmFuY2UnXG5pbXBvcnQgeyBnZXRDaXJjbGVMaXN0IH0gZnJvbSAnLi4vYXBpL3pvbmUnXG5pbXBvcnQgeyBwcmV2aWV3SW1hZ2UgfSBmcm9tICcuLi91dGlscy9jb21tb24nXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBjYXNoZmxvdyBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6LSi5Yqh6K6w6LSmJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgbG9hZGluZzogZmFsc2UsXG4gICAgbG9hZEZpbmlzaGVkOiBmYWxzZSxcbiAgICBwbjogMSxcbiAgICBwczogMTAsXG4gICAgYmFsYW5jZTogMCxcbiAgICBtZW1iZXJJbmZvOiBudWxsLFxuICAgIGZpbmFuY2lhbERhdGE6IHt9LFxuICAgIG1lbWJlckxpc3Q6IFtdLFxuICAgIGxpc3Q6IFtdLFxuICAgIHR5cGU6IHtcbiAgICAgIGNpcmNsZXM6ICflrrbplb/lnIgnLFxuICAgICAgY29sbGVjdGlvbjogJ+aUtuasvicsXG4gICAgICBub3RpZnk6ICfpgJrnn6UnLFxuICAgICAgYWN0aXZpdHk6ICfmtLvliqgnLFxuICAgICAgYWNjb3VudDogJ+iusOi0pidcbiAgICB9XG4gIH1cbiAgb25Mb2FkKCkge1xuICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXG4gICAgdGhpcy5tZW1iZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nKVxuICAgIHRoaXMuZ2V0TGlzdCgpXG4gICAgdGhpcy5nZXRJbmZvKClcbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgb25SZWFjaEJvdHRvbSgpIHtcbiAgICBpZiAodGhpcy5sb2FkaW5nIHx8IHRoaXMubG9hZEZpbmlzaGVkKSByZXR1cm5cbiAgICB0aGlzLmdldExpc3QoKVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgcHJldmlldyh1cmxzKSB7XG4gICAgICBwcmV2aWV3SW1hZ2UodXJsc1swXSwgdXJscylcbiAgICB9LFxuICAgIGp1bXBQYWdlKCkge1xuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogJ3pvbmUnXG4gICAgICB9KVxuICAgIH1cbiAgfVxuICBnZXRMaXN0KCkge1xuICAgIHRoaXMubG9hZGluZyA9IHRydWVcbiAgICBnZXRDaXJjbGVMaXN0KHtcbiAgICAgIHNlZV90eXBlOiAnY2xhc3MnLFxuICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgdHlwZTogJ2FjY291bnQnLFxuICAgICAgcHM6IHRoaXMucHMsXG4gICAgICBwbjogdGhpcy5wblxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIGxldCB7IGxpc3QgfSA9IHJlcy5kYXRhXG4gICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZVxuICAgICAgdGhpcy5wbisrXG4gICAgICBpZiAobGlzdC5sZW5ndGggPCB0aGlzLnBzKSB7XG4gICAgICAgIHRoaXMubG9hZEZpbmlzaGVkID0gdHJ1ZVxuICAgICAgfVxuICAgICAgdGhpcy5saXN0ID0gWy4uLnRoaXMubGlzdCwgLi4ubGlzdF1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9KVxuICB9XG4gIGdldEluZm8oKSB7XG4gICAgZ2V0RmluYW5jZUluZm8oe1xuICAgICAgbWVtYmVyX2lkOiB0aGlzLm1lbWJlckluZm8ubWVtYmVyX2lkLFxuICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IHsgZGF0YSB9ID0gcmVzLmRhdGFcbiAgICAgIHRoaXMuYmFsYW5jZSA9IGRhdGEuYmFsYW5jZVxuICAgICAgdGhpcy5tZW1iZXJMaXN0ID0gZGF0YS5maW5hbmNpYWxfbWVtYmVyXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSlcbiAgfVxufVxuIl19