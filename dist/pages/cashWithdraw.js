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
    }, _this.methods = {
      bindInput: function bindInput(e) {
        this.money = e.detail.value;
        this.$apply();
      },
      submit: function submit(id) {
        var _this2 = this;

        (0, _finance.withdrawCash)({
          class_id: this.classInfo.id,
          collection_id: id,
          amount: this.money
        }).then(function (res) {
          if (res.data.success) {
            (0, _common.showMsg)('操作成功');
            _this2.money = '';
            _this2.$apply();
          }
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

        list = _this3.normalizeList(list);
        _this3.loading = false;
        _this3.pn++;
        _this3.list = [].concat(_toConsumableArray(_this3.list), _toConsumableArray(list));
        if (list.length < _this3.ps) {
          _this3.loadFinished = true;
        }
        _this3.$apply();
      });
    }
  }, {
    key: 'normalizeList',
    value: function normalizeList(list) {
      var ret = list.map(function (item) {
        return {
          desc: (0, _common.getOnlyDate)(item.created_at) + ',\u60A8\u53D1\u8D77\u4E86\u4E00\u4E2A\u6536\u6B3E\uFF0C\u5171\u6536\u5230' + item.info.total_money,
          id: item.info.id
        };
      });
      return ret;
    }
  }]);

  return CashWithdrawal;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(CashWithdrawal , 'pages/cashWithdraw'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhc2hXaXRoZHJhdy5qcyJdLCJuYW1lcyI6WyJDYXNoV2l0aGRyYXdhbCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwibW9uZXkiLCJtZW1iZXJJbmZvIiwiY2xhc3NJbmZvIiwicG4iLCJwcyIsImxpc3QiLCJtZXRob2RzIiwiYmluZElucHV0IiwiZSIsImRldGFpbCIsInZhbHVlIiwiJGFwcGx5Iiwic3VibWl0IiwiaWQiLCJjbGFzc19pZCIsImNvbGxlY3Rpb25faWQiLCJhbW91bnQiLCJ0aGVuIiwicmVzIiwic3VjY2VzcyIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJnZXRMaXN0Iiwic2VlX3R5cGUiLCJ0eXBlIiwibm9ybWFsaXplTGlzdCIsImxvYWRpbmciLCJsZW5ndGgiLCJsb2FkRmluaXNoZWQiLCJyZXQiLCJtYXAiLCJkZXNjIiwiaXRlbSIsImNyZWF0ZWRfYXQiLCJpbmZvIiwidG90YWxfbW9uZXkiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxjOzs7Ozs7Ozs7Ozs7OztzTUFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsYUFBTyxFQURGO0FBRUxDLGtCQUFZLElBRlA7QUFHTEMsaUJBQVcsSUFITjtBQUlMQyxVQUFJLENBSkM7QUFLTEMsVUFBSSxFQUxDO0FBTUxDLFlBQU07QUFORCxLLFFBUVBDLE8sR0FBVTtBQUNSQyxlQURRLHFCQUNFQyxDQURGLEVBQ0s7QUFDWCxhQUFLUixLQUFMLEdBQWFRLEVBQUVDLE1BQUYsQ0FBU0MsS0FBdEI7QUFDQSxhQUFLQyxNQUFMO0FBQ0QsT0FKTztBQUtSQyxZQUxRLGtCQUtEQyxFQUxDLEVBS0c7QUFBQTs7QUFDVCxtQ0FBYTtBQUNYQyxvQkFBVSxLQUFLWixTQUFMLENBQWVXLEVBRGQ7QUFFWEUseUJBQWVGLEVBRko7QUFHWEcsa0JBQVEsS0FBS2hCO0FBSEYsU0FBYixFQUlHaUIsSUFKSCxDQUlRLGVBQU87QUFDYixjQUFJQyxJQUFJbkIsSUFBSixDQUFTb0IsT0FBYixFQUFzQjtBQUNwQixpQ0FBUSxNQUFSO0FBQ0EsbUJBQUtuQixLQUFMLEdBQWEsRUFBYjtBQUNBLG1CQUFLVyxNQUFMO0FBQ0Q7QUFDRixTQVZEO0FBV0Q7QUFqQk8sSzs7Ozs7NkJBbUJEO0FBQ1AsV0FBS1YsVUFBTCxHQUFrQm1CLEdBQUdDLGNBQUgsQ0FBa0IsWUFBbEIsQ0FBbEI7QUFDQSxXQUFLbkIsU0FBTCxHQUFpQmtCLEdBQUdDLGNBQUgsQ0FBa0IsV0FBbEIsQ0FBakI7QUFDQSxXQUFLQyxPQUFMO0FBQ0EsV0FBS1gsTUFBTDtBQUNEOzs7OEJBQ1M7QUFBQTs7QUFDUixVQUFNRSxLQUFLLEtBQUtYLFNBQUwsQ0FBZVcsRUFBMUI7QUFDQSwrQkFBYztBQUNaQyxrQkFBVUQsRUFERTtBQUVaVSxrQkFBVVYsS0FBSyxFQUFMLEdBQVUsS0FGUjtBQUdaVyxjQUFNLFlBSE07QUFJWnJCLFlBQUksS0FBS0EsRUFKRztBQUtaQyxZQUFJLEtBQUtBO0FBTEcsT0FBZCxFQU1HYSxJQU5ILENBTVEsZUFBTztBQUFBLFlBQ1BaLElBRE8sR0FDRWEsSUFBSW5CLElBRE4sQ0FDUE0sSUFETzs7QUFFYkEsZUFBTyxPQUFLb0IsYUFBTCxDQUFtQnBCLElBQW5CLENBQVA7QUFDQSxlQUFLcUIsT0FBTCxHQUFlLEtBQWY7QUFDQSxlQUFLdkIsRUFBTDtBQUNBLGVBQUtFLElBQUwsZ0NBQWdCLE9BQUtBLElBQXJCLHNCQUE4QkEsSUFBOUI7QUFDQSxZQUFJQSxLQUFLc0IsTUFBTCxHQUFjLE9BQUt2QixFQUF2QixFQUEyQjtBQUN6QixpQkFBS3dCLFlBQUwsR0FBb0IsSUFBcEI7QUFDRDtBQUNELGVBQUtqQixNQUFMO0FBQ0QsT0FoQkQ7QUFpQkQ7OztrQ0FDYU4sSSxFQUFNO0FBQ2xCLFVBQUl3QixNQUFNeEIsS0FBS3lCLEdBQUwsQ0FBUyxnQkFBUTtBQUN6QixlQUFPO0FBQ0xDLGdCQUFTLHlCQUFZQyxLQUFLQyxVQUFqQixDQUFULGlGQUFxREQsS0FBS0UsSUFBTCxDQUFVQyxXQUQxRDtBQUVMdEIsY0FBSW1CLEtBQUtFLElBQUwsQ0FBVXJCO0FBRlQsU0FBUDtBQUlELE9BTFMsQ0FBVjtBQU1BLGFBQU9nQixHQUFQO0FBQ0Q7Ozs7RUFqRXlDTyxlQUFLQyxJOztrQkFBNUJ6QyxjIiwiZmlsZSI6ImNhc2hXaXRoZHJhdy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7IGdldENpcmNsZUxpc3QgfSBmcm9tICcuLi9hcGkvem9uZSdcbmltcG9ydCB7IHdpdGhkcmF3Q2FzaCB9IGZyb20gJy4uL2FwaS9maW5hbmNlJ1xuaW1wb3J0IHsgZ2V0T25seURhdGUsIHNob3dNc2cgfSBmcm9tICcuLi91dGlscy9jb21tb24nXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXNoV2l0aGRyYXdhbCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5pS25qy+5o+Q546wJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgbW9uZXk6ICcnLFxuICAgIG1lbWJlckluZm86IG51bGwsXG4gICAgY2xhc3NJbmZvOiBudWxsLFxuICAgIHBuOiAxLFxuICAgIHBzOiAxMCxcbiAgICBsaXN0OiBbXVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgYmluZElucHV0KGUpIHtcbiAgICAgIHRoaXMubW9uZXkgPSBlLmRldGFpbC52YWx1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgc3VibWl0KGlkKSB7XG4gICAgICB3aXRoZHJhd0Nhc2goe1xuICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXG4gICAgICAgIGNvbGxlY3Rpb25faWQ6IGlkLFxuICAgICAgICBhbW91bnQ6IHRoaXMubW9uZXlcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICBzaG93TXNnKCfmk43kvZzmiJDlip8nKVxuICAgICAgICAgIHRoaXMubW9uZXkgPSAnJ1xuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgb25Mb2FkKCkge1xuICAgIHRoaXMubWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcbiAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxuICAgIHRoaXMuZ2V0TGlzdCgpXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIGdldExpc3QoKSB7XG4gICAgY29uc3QgaWQgPSB0aGlzLmNsYXNzSW5mby5pZFxuICAgIGdldENpcmNsZUxpc3Qoe1xuICAgICAgY2xhc3NfaWQ6IGlkLFxuICAgICAgc2VlX3R5cGU6IGlkID8gJycgOiAnYWxsJyxcbiAgICAgIHR5cGU6ICdjb2xsZWN0aW9uJyxcbiAgICAgIHBuOiB0aGlzLnBuLFxuICAgICAgcHM6IHRoaXMucHMsXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IHsgbGlzdCB9ID0gcmVzLmRhdGFcbiAgICAgIGxpc3QgPSB0aGlzLm5vcm1hbGl6ZUxpc3QobGlzdClcbiAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlXG4gICAgICB0aGlzLnBuKytcbiAgICAgIHRoaXMubGlzdCA9IFsuLi50aGlzLmxpc3QsIC4uLmxpc3RdXG4gICAgICBpZiAobGlzdC5sZW5ndGggPCB0aGlzLnBzKSB7XG4gICAgICAgIHRoaXMubG9hZEZpbmlzaGVkID0gdHJ1ZVxuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0pXG4gIH1cbiAgbm9ybWFsaXplTGlzdChsaXN0KSB7XG4gICAgbGV0IHJldCA9IGxpc3QubWFwKGl0ZW0gPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGVzYzogYCR7Z2V0T25seURhdGUoaXRlbS5jcmVhdGVkX2F0KX0s5oKo5Y+R6LW35LqG5LiA5Liq5pS25qy+77yM5YWx5pS25YiwJHtpdGVtLmluZm8udG90YWxfbW9uZXl9YCxcbiAgICAgICAgaWQ6IGl0ZW0uaW5mby5pZFxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHJldFxuICB9XG59XG4iXX0=