'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _finance = require('./../api/finance.js');

var _common = require('./../utils/common.js');

var _user = require('./../api/user.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Withdraw = function (_wepy$page) {
  _inherits(Withdraw, _wepy$page);

  function Withdraw() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Withdraw);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Withdraw.__proto__ || Object.getPrototypeOf(Withdraw)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '申请提现'
    }, _this.data = {
      classInfo: {},
      memberInfo: {},
      bankName: '',
      bankReservedName: '',
      bankCard: '',
      bankMobile: '',
      card: {},
      money: 0,
      id: 0
    }, _this.methods = {
      pickerChange: function pickerChange(e) {
        this[e.currentTarget.id] = e.detail.value;
        this.$apply();
      },
      saveBankInfo: function saveBankInfo() {
        var _this2 = this;

        (0, _finance.saveBankInfo)({
          bankName: this.bankName ? this.bankName : this.card.bank_name,
          bankReservedName: this.bankReservedName ? this.bankReservedName : this.card.bank_reserved_name,
          bankCard: this.bankCard ? this.bankCard : this.card.bank_card,
          bankMobile: this.bankMobile ? this.bankMobile : this.card.bank_mobile
        }).then(function (res) {
          if (res.data.success) {
            _this2.getMemberInfo();
            (0, _common.showMsg)('操作成功');
          }
        });
      },
      submit: function submit() {
        var _this3 = this;

        (0, _finance.withdrawCash)({
          class_id: this.classInfo.id,
          collection_id: this.id,
          amount: this.money
        }).then(function (res) {
          if (res.data.success) {
            (0, _common.showMsg)('24小时之内提现将会到账，5月1日之后即将开通微信提现即时到账，敬请期待。');
            _this3.$apply();
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Withdraw, [{
    key: 'onLoad',
    value: function onLoad(options) {
      this.classInfo = wx.getStorageSync('classInfo');
      this.memberInfo = wx.getStorageSync('memberInfo');
      this.id = options.id;
      this.money = options.money;
      this.card = this.memberInfo.card_info;
      this.$apply();
    }
  }, {
    key: 'getMemberInfo',
    value: function getMemberInfo() {
      (0, _user.memberInfo)({
        class_id: this.classInfo.id
      }).then(function (res) {
        var data = res.data.data;
        var cardInfo = data.member_extend;
        var memberInfo = wx.getStorageSync('memberInfo');
        var info = Object.assign({}, {
          card_info: cardInfo
        }, memberInfo);
        wx.setStorageSync('memberInfo', info);
      });
    }
  }]);

  return Withdraw;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Withdraw , 'pages/withdraw'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpdGhkcmF3LmpzIl0sIm5hbWVzIjpbIldpdGhkcmF3IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJjbGFzc0luZm8iLCJtZW1iZXJJbmZvIiwiYmFua05hbWUiLCJiYW5rUmVzZXJ2ZWROYW1lIiwiYmFua0NhcmQiLCJiYW5rTW9iaWxlIiwiY2FyZCIsIm1vbmV5IiwiaWQiLCJtZXRob2RzIiwicGlja2VyQ2hhbmdlIiwiZSIsImN1cnJlbnRUYXJnZXQiLCJkZXRhaWwiLCJ2YWx1ZSIsIiRhcHBseSIsInNhdmVCYW5rSW5mbyIsImJhbmtfbmFtZSIsImJhbmtfcmVzZXJ2ZWRfbmFtZSIsImJhbmtfY2FyZCIsImJhbmtfbW9iaWxlIiwidGhlbiIsInJlcyIsInN1Y2Nlc3MiLCJnZXRNZW1iZXJJbmZvIiwic3VibWl0IiwiY2xhc3NfaWQiLCJjb2xsZWN0aW9uX2lkIiwiYW1vdW50Iiwib3B0aW9ucyIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJjYXJkX2luZm8iLCJjYXJkSW5mbyIsIm1lbWJlcl9leHRlbmQiLCJpbmZvIiwiT2JqZWN0IiwiYXNzaWduIiwic2V0U3RvcmFnZVN5bmMiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQUNxQkEsUTs7Ozs7Ozs7Ozs7Ozs7MExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLGlCQUFXLEVBRE47QUFFTEMsa0JBQVksRUFGUDtBQUdMQyxnQkFBVSxFQUhMO0FBSUxDLHdCQUFrQixFQUpiO0FBS0xDLGdCQUFVLEVBTEw7QUFNTEMsa0JBQVksRUFOUDtBQU9MQyxZQUFNLEVBUEQ7QUFRTEMsYUFBTyxDQVJGO0FBU0xDLFVBQUk7QUFUQyxLLFFBZ0NQQyxPLEdBQVU7QUFDUkMsa0JBRFEsd0JBQ0tDLENBREwsRUFDUTtBQUNkLGFBQUtBLEVBQUVDLGFBQUYsQ0FBZ0JKLEVBQXJCLElBQTJCRyxFQUFFRSxNQUFGLENBQVNDLEtBQXBDO0FBQ0EsYUFBS0MsTUFBTDtBQUNELE9BSk87QUFLUkMsa0JBTFEsMEJBS087QUFBQTs7QUFDYixtQ0FBYTtBQUNYZCxvQkFBVSxLQUFLQSxRQUFMLEdBQWdCLEtBQUtBLFFBQXJCLEdBQWdDLEtBQUtJLElBQUwsQ0FBVVcsU0FEekM7QUFFWGQsNEJBQWtCLEtBQUtBLGdCQUFMLEdBQXdCLEtBQUtBLGdCQUE3QixHQUFnRCxLQUFLRyxJQUFMLENBQVVZLGtCQUZqRTtBQUdYZCxvQkFBVSxLQUFLQSxRQUFMLEdBQWdCLEtBQUtBLFFBQXJCLEdBQWdDLEtBQUtFLElBQUwsQ0FBVWEsU0FIekM7QUFJWGQsc0JBQVksS0FBS0EsVUFBTCxHQUFrQixLQUFLQSxVQUF2QixHQUFvQyxLQUFLQyxJQUFMLENBQVVjO0FBSi9DLFNBQWIsRUFLR0MsSUFMSCxDQUtRLGVBQU87QUFDYixjQUFJQyxJQUFJdkIsSUFBSixDQUFTd0IsT0FBYixFQUFzQjtBQUNwQixtQkFBS0MsYUFBTDtBQUNBLGlDQUFRLE1BQVI7QUFDRDtBQUNGLFNBVkQ7QUFXRCxPQWpCTztBQWtCUkMsWUFsQlEsb0JBa0JDO0FBQUE7O0FBQ1AsbUNBQWE7QUFDWEMsb0JBQVUsS0FBSzFCLFNBQUwsQ0FBZVEsRUFEZDtBQUVYbUIseUJBQWUsS0FBS25CLEVBRlQ7QUFHWG9CLGtCQUFRLEtBQUtyQjtBQUhGLFNBQWIsRUFJR2MsSUFKSCxDQUlRLGVBQU87QUFDYixjQUFJQyxJQUFJdkIsSUFBSixDQUFTd0IsT0FBYixFQUFzQjtBQUNwQixpQ0FBUSx1Q0FBUjtBQUNBLG1CQUFLUixNQUFMO0FBQ0Q7QUFDRixTQVREO0FBVUQ7QUE3Qk8sSzs7Ozs7MkJBckJIYyxPLEVBQVM7QUFDZCxXQUFLN0IsU0FBTCxHQUFpQjhCLEdBQUdDLGNBQUgsQ0FBa0IsV0FBbEIsQ0FBakI7QUFDQSxXQUFLOUIsVUFBTCxHQUFrQjZCLEdBQUdDLGNBQUgsQ0FBa0IsWUFBbEIsQ0FBbEI7QUFDQSxXQUFLdkIsRUFBTCxHQUFVcUIsUUFBUXJCLEVBQWxCO0FBQ0EsV0FBS0QsS0FBTCxHQUFhc0IsUUFBUXRCLEtBQXJCO0FBQ0EsV0FBS0QsSUFBTCxHQUFZLEtBQUtMLFVBQUwsQ0FBZ0IrQixTQUE1QjtBQUNBLFdBQUtqQixNQUFMO0FBQ0Q7OztvQ0FDZTtBQUNkLDRCQUFXO0FBQ1RXLGtCQUFVLEtBQUsxQixTQUFMLENBQWVRO0FBRGhCLE9BQVgsRUFFR2EsSUFGSCxDQUVRLGVBQU87QUFDYixZQUFJdEIsT0FBT3VCLElBQUl2QixJQUFKLENBQVNBLElBQXBCO0FBQ0EsWUFBSWtDLFdBQVdsQyxLQUFLbUMsYUFBcEI7QUFDQSxZQUFJakMsYUFBYTZCLEdBQUdDLGNBQUgsQ0FBa0IsWUFBbEIsQ0FBakI7QUFDQSxZQUFJSSxPQUFPQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQjtBQUMzQkwscUJBQVdDO0FBRGdCLFNBQWxCLEVBRVJoQyxVQUZRLENBQVg7QUFHQTZCLFdBQUdRLGNBQUgsQ0FBa0IsWUFBbEIsRUFBZ0NILElBQWhDO0FBQ0QsT0FWRDtBQVdEOzs7O0VBbkNtQ0ksZUFBS0MsSTs7a0JBQXRCNUMsUSIsImZpbGUiOiJ3aXRoZHJhdy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7IHdpdGhkcmF3Q2FzaCwgc2F2ZUJhbmtJbmZvIH0gZnJvbSAnLi4vYXBpL2ZpbmFuY2UnXG5pbXBvcnQgeyBzaG93TXNnIH0gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xuaW1wb3J0IHsgbWVtYmVySW5mbyB9IGZyb20gJy4uL2FwaS91c2VyJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2l0aGRyYXcgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+eUs+ivt+aPkOeOsCdcbiAgfVxuICBkYXRhID0ge1xuICAgIGNsYXNzSW5mbzoge30sXG4gICAgbWVtYmVySW5mbzoge30sXG4gICAgYmFua05hbWU6ICcnLFxuICAgIGJhbmtSZXNlcnZlZE5hbWU6ICcnLFxuICAgIGJhbmtDYXJkOiAnJyxcbiAgICBiYW5rTW9iaWxlOiAnJyxcbiAgICBjYXJkOiB7fSxcbiAgICBtb25leTogMCxcbiAgICBpZDogMFxuICB9XG4gIG9uTG9hZChvcHRpb25zKSB7XG4gICAgdGhpcy5jbGFzc0luZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnY2xhc3NJbmZvJylcbiAgICB0aGlzLm1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXG4gICAgdGhpcy5pZCA9IG9wdGlvbnMuaWRcbiAgICB0aGlzLm1vbmV5ID0gb3B0aW9ucy5tb25leVxuICAgIHRoaXMuY2FyZCA9IHRoaXMubWVtYmVySW5mby5jYXJkX2luZm9cbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgZ2V0TWVtYmVySW5mbygpIHtcbiAgICBtZW1iZXJJbmZvKHtcbiAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZFxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIGxldCBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgbGV0IGNhcmRJbmZvID0gZGF0YS5tZW1iZXJfZXh0ZW5kXG4gICAgICBsZXQgbWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcbiAgICAgIGxldCBpbmZvID0gT2JqZWN0LmFzc2lnbih7fSwge1xuICAgICAgICBjYXJkX2luZm86IGNhcmRJbmZvXG4gICAgICB9LCBtZW1iZXJJbmZvKVxuICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nLCBpbmZvKVxuICAgIH0pXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBwaWNrZXJDaGFuZ2UoZSkge1xuICAgICAgdGhpc1tlLmN1cnJlbnRUYXJnZXQuaWRdID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIHNhdmVCYW5rSW5mbygpIHtcbiAgICAgIHNhdmVCYW5rSW5mbyh7XG4gICAgICAgIGJhbmtOYW1lOiB0aGlzLmJhbmtOYW1lID8gdGhpcy5iYW5rTmFtZSA6IHRoaXMuY2FyZC5iYW5rX25hbWUsXG4gICAgICAgIGJhbmtSZXNlcnZlZE5hbWU6IHRoaXMuYmFua1Jlc2VydmVkTmFtZSA/IHRoaXMuYmFua1Jlc2VydmVkTmFtZSA6IHRoaXMuY2FyZC5iYW5rX3Jlc2VydmVkX25hbWUsXG4gICAgICAgIGJhbmtDYXJkOiB0aGlzLmJhbmtDYXJkID8gdGhpcy5iYW5rQ2FyZCA6IHRoaXMuY2FyZC5iYW5rX2NhcmQsXG4gICAgICAgIGJhbmtNb2JpbGU6IHRoaXMuYmFua01vYmlsZSA/IHRoaXMuYmFua01vYmlsZSA6IHRoaXMuY2FyZC5iYW5rX21vYmlsZVxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgIHRoaXMuZ2V0TWVtYmVySW5mbygpXG4gICAgICAgICAgc2hvd01zZygn5pON5L2c5oiQ5YqfJylcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIHN1Ym1pdCgpIHtcbiAgICAgIHdpdGhkcmF3Q2FzaCh7XG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgICAgY29sbGVjdGlvbl9pZDogdGhpcy5pZCxcbiAgICAgICAgYW1vdW50OiB0aGlzLm1vbmV5XG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgc2hvd01zZygnMjTlsI/ml7bkuYvlhoXmj5DnjrDlsIbkvJrliLDotKbvvIw15pyIMeaXpeS5i+WQjuWNs+WwhuW8gOmAmuW+ruS/oeaPkOeOsOWNs+aXtuWIsOi0pu+8jOaVrOivt+acn+W+heOAgicpXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxufVxuIl19