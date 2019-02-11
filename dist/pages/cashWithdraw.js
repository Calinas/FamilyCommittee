'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _zone = require('./../api/zone.js');

var _common = require('./../utils/common.js');

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
      money: '',
      memberInfo: null,
      classInfo: null,
      pn: 1,
      ps: 10,
      list: []
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
      var _this2 = this;

      var id = this.classInfo.id;
      (0, _zone.getCircleList)({
        class_id: id,
        see_type: id ? '' : 'all',
        type: 'collection',
        pn: this.pn,
        ps: this.ps
      }).then(function (res) {
        var list = res.data.list;

        list = _this2.normalizeList(list);
        _this2.loading = false;
        _this2.pn++;
        _this2.list = [].concat(_toConsumableArray(_this2.list), _toConsumableArray(list));
        if (list.length < _this2.ps) {
          _this2.loadFinished = true;
        }
        _this2.$apply();
      });
    }
  }, {
    key: 'normalizeList',
    value: function normalizeList(list) {
      var ret = list.map(function (item) {
        return {
          desc: (0, _common.getOnlyDate)(item.created_at) + ',\u60A8\u53D1\u8D77\u4E86\u4E00\u4E2A\u6536\u6B3E\uFF0C\u5171\u6536\u5230' + item.info.total_money
        };
      });
      return ret;
    }
  }]);

  return CashWithdrawal;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(CashWithdrawal , 'pages/cashWithdraw'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhc2hXaXRoZHJhdy5qcyJdLCJuYW1lcyI6WyJDYXNoV2l0aGRyYXdhbCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwibW9uZXkiLCJtZW1iZXJJbmZvIiwiY2xhc3NJbmZvIiwicG4iLCJwcyIsImxpc3QiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwiZ2V0TGlzdCIsIiRhcHBseSIsImlkIiwiY2xhc3NfaWQiLCJzZWVfdHlwZSIsInR5cGUiLCJ0aGVuIiwicmVzIiwibm9ybWFsaXplTGlzdCIsImxvYWRpbmciLCJsZW5ndGgiLCJsb2FkRmluaXNoZWQiLCJyZXQiLCJtYXAiLCJkZXNjIiwiaXRlbSIsImNyZWF0ZWRfYXQiLCJpbmZvIiwidG90YWxfbW9uZXkiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxjOzs7Ozs7Ozs7Ozs7OztzTUFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsYUFBTyxFQURGO0FBRUxDLGtCQUFZLElBRlA7QUFHTEMsaUJBQVcsSUFITjtBQUlMQyxVQUFJLENBSkM7QUFLTEMsVUFBSSxFQUxDO0FBTUxDLFlBQU07QUFORCxLOzs7Ozs2QkFRRTtBQUNQLFdBQUtKLFVBQUwsR0FBa0JLLEdBQUdDLGNBQUgsQ0FBa0IsWUFBbEIsQ0FBbEI7QUFDQSxXQUFLTCxTQUFMLEdBQWlCSSxHQUFHQyxjQUFILENBQWtCLFdBQWxCLENBQWpCO0FBQ0EsV0FBS0MsT0FBTDtBQUNBLFdBQUtDLE1BQUw7QUFDRDs7OzhCQUNTO0FBQUE7O0FBQ1IsVUFBTUMsS0FBSyxLQUFLUixTQUFMLENBQWVRLEVBQTFCO0FBQ0EsK0JBQWM7QUFDWkMsa0JBQVVELEVBREU7QUFFWkUsa0JBQVVGLEtBQUssRUFBTCxHQUFVLEtBRlI7QUFHWkcsY0FBTSxZQUhNO0FBSVpWLFlBQUksS0FBS0EsRUFKRztBQUtaQyxZQUFJLEtBQUtBO0FBTEcsT0FBZCxFQU1HVSxJQU5ILENBTVEsZUFBTztBQUFBLFlBQ1BULElBRE8sR0FDRVUsSUFBSWhCLElBRE4sQ0FDUE0sSUFETzs7QUFFYkEsZUFBTyxPQUFLVyxhQUFMLENBQW1CWCxJQUFuQixDQUFQO0FBQ0EsZUFBS1ksT0FBTCxHQUFlLEtBQWY7QUFDQSxlQUFLZCxFQUFMO0FBQ0EsZUFBS0UsSUFBTCxnQ0FBZ0IsT0FBS0EsSUFBckIsc0JBQThCQSxJQUE5QjtBQUNBLFlBQUlBLEtBQUthLE1BQUwsR0FBYyxPQUFLZCxFQUF2QixFQUEyQjtBQUN6QixpQkFBS2UsWUFBTCxHQUFvQixJQUFwQjtBQUNEO0FBQ0QsZUFBS1YsTUFBTDtBQUNELE9BaEJEO0FBaUJEOzs7a0NBQ2FKLEksRUFBTTtBQUNsQixVQUFJZSxNQUFNZixLQUFLZ0IsR0FBTCxDQUFTLGdCQUFRO0FBQ3pCLGVBQU87QUFDTEMsZ0JBQVMseUJBQVlDLEtBQUtDLFVBQWpCLENBQVQsaUZBQXFERCxLQUFLRSxJQUFMLENBQVVDO0FBRDFELFNBQVA7QUFHRCxPQUpTLENBQVY7QUFLQSxhQUFPTixHQUFQO0FBQ0Q7Ozs7RUE3Q3lDTyxlQUFLQyxJOztrQkFBNUJoQyxjIiwiZmlsZSI6ImNhc2hXaXRoZHJhdy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7IGdldENpcmNsZUxpc3QgfSBmcm9tICcuLi9hcGkvem9uZSdcbmltcG9ydCB7IGdldE9ubHlEYXRlIH0gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FzaFdpdGhkcmF3YWwgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aUtuasvuaPkOeOsCdcbiAgfVxuICBkYXRhID0ge1xuICAgIG1vbmV5OiAnJyxcbiAgICBtZW1iZXJJbmZvOiBudWxsLFxuICAgIGNsYXNzSW5mbzogbnVsbCxcbiAgICBwbjogMSxcbiAgICBwczogMTAsXG4gICAgbGlzdDogW11cbiAgfVxuICBvbkxvYWQoKSB7XG4gICAgdGhpcy5tZW1iZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nKVxuICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXG4gICAgdGhpcy5nZXRMaXN0KClcbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgZ2V0TGlzdCgpIHtcbiAgICBjb25zdCBpZCA9IHRoaXMuY2xhc3NJbmZvLmlkXG4gICAgZ2V0Q2lyY2xlTGlzdCh7XG4gICAgICBjbGFzc19pZDogaWQsXG4gICAgICBzZWVfdHlwZTogaWQgPyAnJyA6ICdhbGwnLFxuICAgICAgdHlwZTogJ2NvbGxlY3Rpb24nLFxuICAgICAgcG46IHRoaXMucG4sXG4gICAgICBwczogdGhpcy5wcyxcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgeyBsaXN0IH0gPSByZXMuZGF0YVxuICAgICAgbGlzdCA9IHRoaXMubm9ybWFsaXplTGlzdChsaXN0KVxuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2VcbiAgICAgIHRoaXMucG4rK1xuICAgICAgdGhpcy5saXN0ID0gWy4uLnRoaXMubGlzdCwgLi4ubGlzdF1cbiAgICAgIGlmIChsaXN0Lmxlbmd0aCA8IHRoaXMucHMpIHtcbiAgICAgICAgdGhpcy5sb2FkRmluaXNoZWQgPSB0cnVlXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSlcbiAgfVxuICBub3JtYWxpemVMaXN0KGxpc3QpIHtcbiAgICBsZXQgcmV0ID0gbGlzdC5tYXAoaXRlbSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBkZXNjOiBgJHtnZXRPbmx5RGF0ZShpdGVtLmNyZWF0ZWRfYXQpfSzmgqjlj5HotbfkuobkuIDkuKrmlLbmrL7vvIzlhbHmlLbliLAke2l0ZW0uaW5mby50b3RhbF9tb25leX1gXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gcmV0XG4gIH1cbn1cbiJdfQ==