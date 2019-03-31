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
          bankCard: this.bankCard ? this.bandCard : this.card.bank_card,
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
            (0, _common.showMsg)('操作成功');
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpdGhkcmF3LmpzIl0sIm5hbWVzIjpbIldpdGhkcmF3IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJjbGFzc0luZm8iLCJtZW1iZXJJbmZvIiwiYmFua05hbWUiLCJiYW5rUmVzZXJ2ZWROYW1lIiwiYmFua0NhcmQiLCJiYW5rTW9iaWxlIiwiY2FyZCIsIm1vbmV5IiwiaWQiLCJtZXRob2RzIiwicGlja2VyQ2hhbmdlIiwiZSIsImN1cnJlbnRUYXJnZXQiLCJkZXRhaWwiLCJ2YWx1ZSIsIiRhcHBseSIsInNhdmVCYW5rSW5mbyIsImJhbmtfbmFtZSIsImJhbmtfcmVzZXJ2ZWRfbmFtZSIsImJhbmRDYXJkIiwiYmFua19jYXJkIiwiYmFua19tb2JpbGUiLCJ0aGVuIiwicmVzIiwic3VjY2VzcyIsImdldE1lbWJlckluZm8iLCJzdWJtaXQiLCJjbGFzc19pZCIsImNvbGxlY3Rpb25faWQiLCJhbW91bnQiLCJvcHRpb25zIiwid3giLCJnZXRTdG9yYWdlU3luYyIsImNhcmRfaW5mbyIsImNhcmRJbmZvIiwibWVtYmVyX2V4dGVuZCIsImluZm8iLCJPYmplY3QiLCJhc3NpZ24iLCJzZXRTdG9yYWdlU3luYyIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBQ3FCQSxROzs7Ozs7Ozs7Ozs7OzswTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsaUJBQVcsRUFETjtBQUVMQyxrQkFBWSxFQUZQO0FBR0xDLGdCQUFVLEVBSEw7QUFJTEMsd0JBQWtCLEVBSmI7QUFLTEMsZ0JBQVUsRUFMTDtBQU1MQyxrQkFBWSxFQU5QO0FBT0xDLFlBQU0sRUFQRDtBQVFMQyxhQUFPLENBUkY7QUFTTEMsVUFBSTtBQVRDLEssUUFnQ1BDLE8sR0FBVTtBQUNSQyxrQkFEUSx3QkFDS0MsQ0FETCxFQUNRO0FBQ2QsYUFBS0EsRUFBRUMsYUFBRixDQUFnQkosRUFBckIsSUFBMkJHLEVBQUVFLE1BQUYsQ0FBU0MsS0FBcEM7QUFDQSxhQUFLQyxNQUFMO0FBQ0QsT0FKTztBQUtSQyxrQkFMUSwwQkFLTztBQUFBOztBQUNiLG1DQUFhO0FBQ1hkLG9CQUFVLEtBQUtBLFFBQUwsR0FBZ0IsS0FBS0EsUUFBckIsR0FBZ0MsS0FBS0ksSUFBTCxDQUFVVyxTQUR6QztBQUVYZCw0QkFBa0IsS0FBS0EsZ0JBQUwsR0FBd0IsS0FBS0EsZ0JBQTdCLEdBQWdELEtBQUtHLElBQUwsQ0FBVVksa0JBRmpFO0FBR1hkLG9CQUFVLEtBQUtBLFFBQUwsR0FBZ0IsS0FBS2UsUUFBckIsR0FBZ0MsS0FBS2IsSUFBTCxDQUFVYyxTQUh6QztBQUlYZixzQkFBWSxLQUFLQSxVQUFMLEdBQWtCLEtBQUtBLFVBQXZCLEdBQW9DLEtBQUtDLElBQUwsQ0FBVWU7QUFKL0MsU0FBYixFQUtHQyxJQUxILENBS1EsZUFBTztBQUNiLGNBQUlDLElBQUl4QixJQUFKLENBQVN5QixPQUFiLEVBQXNCO0FBQ3BCLG1CQUFLQyxhQUFMO0FBQ0EsaUNBQVEsTUFBUjtBQUNEO0FBQ0YsU0FWRDtBQVdELE9BakJPO0FBa0JSQyxZQWxCUSxvQkFrQkM7QUFBQTs7QUFDUCxtQ0FBYTtBQUNYQyxvQkFBVSxLQUFLM0IsU0FBTCxDQUFlUSxFQURkO0FBRVhvQix5QkFBZSxLQUFLcEIsRUFGVDtBQUdYcUIsa0JBQVEsS0FBS3RCO0FBSEYsU0FBYixFQUlHZSxJQUpILENBSVEsZUFBTztBQUNiLGNBQUlDLElBQUl4QixJQUFKLENBQVN5QixPQUFiLEVBQXNCO0FBQ3BCLGlDQUFRLE1BQVI7QUFDQSxtQkFBS1QsTUFBTDtBQUNEO0FBQ0YsU0FURDtBQVVEO0FBN0JPLEs7Ozs7OzJCQXJCSGUsTyxFQUFTO0FBQ2QsV0FBSzlCLFNBQUwsR0FBaUIrQixHQUFHQyxjQUFILENBQWtCLFdBQWxCLENBQWpCO0FBQ0EsV0FBSy9CLFVBQUwsR0FBa0I4QixHQUFHQyxjQUFILENBQWtCLFlBQWxCLENBQWxCO0FBQ0EsV0FBS3hCLEVBQUwsR0FBVXNCLFFBQVF0QixFQUFsQjtBQUNBLFdBQUtELEtBQUwsR0FBYXVCLFFBQVF2QixLQUFyQjtBQUNBLFdBQUtELElBQUwsR0FBWSxLQUFLTCxVQUFMLENBQWdCZ0MsU0FBNUI7QUFDQSxXQUFLbEIsTUFBTDtBQUNEOzs7b0NBQ2U7QUFDZCw0QkFBVztBQUNUWSxrQkFBVSxLQUFLM0IsU0FBTCxDQUFlUTtBQURoQixPQUFYLEVBRUdjLElBRkgsQ0FFUSxlQUFPO0FBQ2IsWUFBSXZCLE9BQU93QixJQUFJeEIsSUFBSixDQUFTQSxJQUFwQjtBQUNBLFlBQUltQyxXQUFXbkMsS0FBS29DLGFBQXBCO0FBQ0EsWUFBSWxDLGFBQWE4QixHQUFHQyxjQUFILENBQWtCLFlBQWxCLENBQWpCO0FBQ0EsWUFBSUksT0FBT0MsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0I7QUFDM0JMLHFCQUFXQztBQURnQixTQUFsQixFQUVSakMsVUFGUSxDQUFYO0FBR0E4QixXQUFHUSxjQUFILENBQWtCLFlBQWxCLEVBQWdDSCxJQUFoQztBQUNELE9BVkQ7QUFXRDs7OztFQW5DbUNJLGVBQUtDLEk7O2tCQUF0QjdDLFEiLCJmaWxlIjoid2l0aGRyYXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IHsgd2l0aGRyYXdDYXNoLCBzYXZlQmFua0luZm8gfSBmcm9tICcuLi9hcGkvZmluYW5jZSdcclxuaW1wb3J0IHsgc2hvd01zZyB9IGZyb20gJy4uL3V0aWxzL2NvbW1vbidcclxuaW1wb3J0IHsgbWVtYmVySW5mbyB9IGZyb20gJy4uL2FwaS91c2VyJ1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaXRoZHJhdyBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+eUs+ivt+aPkOeOsCdcclxuICB9XHJcbiAgZGF0YSA9IHtcclxuICAgIGNsYXNzSW5mbzoge30sXHJcbiAgICBtZW1iZXJJbmZvOiB7fSxcclxuICAgIGJhbmtOYW1lOiAnJyxcclxuICAgIGJhbmtSZXNlcnZlZE5hbWU6ICcnLFxyXG4gICAgYmFua0NhcmQ6ICcnLFxyXG4gICAgYmFua01vYmlsZTogJycsXHJcbiAgICBjYXJkOiB7fSxcclxuICAgIG1vbmV5OiAwLFxyXG4gICAgaWQ6IDBcclxuICB9XHJcbiAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXHJcbiAgICB0aGlzLm1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXHJcbiAgICB0aGlzLmlkID0gb3B0aW9ucy5pZFxyXG4gICAgdGhpcy5tb25leSA9IG9wdGlvbnMubW9uZXlcclxuICAgIHRoaXMuY2FyZCA9IHRoaXMubWVtYmVySW5mby5jYXJkX2luZm9cclxuICAgIHRoaXMuJGFwcGx5KClcclxuICB9XHJcbiAgZ2V0TWVtYmVySW5mbygpIHtcclxuICAgIG1lbWJlckluZm8oe1xyXG4gICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWRcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YS5kYXRhXHJcbiAgICAgIGxldCBjYXJkSW5mbyA9IGRhdGEubWVtYmVyX2V4dGVuZFxyXG4gICAgICBsZXQgbWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcclxuICAgICAgbGV0IGluZm8gPSBPYmplY3QuYXNzaWduKHt9LCB7XHJcbiAgICAgICAgY2FyZF9pbmZvOiBjYXJkSW5mb1xyXG4gICAgICB9LCBtZW1iZXJJbmZvKVxyXG4gICAgICB3eC5zZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycsIGluZm8pXHJcbiAgICB9KVxyXG4gIH1cclxuICBtZXRob2RzID0ge1xyXG4gICAgcGlja2VyQ2hhbmdlKGUpIHtcclxuICAgICAgdGhpc1tlLmN1cnJlbnRUYXJnZXQuaWRdID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSxcclxuICAgIHNhdmVCYW5rSW5mbygpIHtcclxuICAgICAgc2F2ZUJhbmtJbmZvKHtcclxuICAgICAgICBiYW5rTmFtZTogdGhpcy5iYW5rTmFtZSA/IHRoaXMuYmFua05hbWUgOiB0aGlzLmNhcmQuYmFua19uYW1lLFxyXG4gICAgICAgIGJhbmtSZXNlcnZlZE5hbWU6IHRoaXMuYmFua1Jlc2VydmVkTmFtZSA/IHRoaXMuYmFua1Jlc2VydmVkTmFtZSA6IHRoaXMuY2FyZC5iYW5rX3Jlc2VydmVkX25hbWUsXHJcbiAgICAgICAgYmFua0NhcmQ6IHRoaXMuYmFua0NhcmQgPyB0aGlzLmJhbmRDYXJkIDogdGhpcy5jYXJkLmJhbmtfY2FyZCxcclxuICAgICAgICBiYW5rTW9iaWxlOiB0aGlzLmJhbmtNb2JpbGUgPyB0aGlzLmJhbmtNb2JpbGUgOiB0aGlzLmNhcmQuYmFua19tb2JpbGVcclxuICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICB0aGlzLmdldE1lbWJlckluZm8oKVxyXG4gICAgICAgICAgc2hvd01zZygn5pON5L2c5oiQ5YqfJylcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgc3VibWl0KCkge1xyXG4gICAgICB3aXRoZHJhd0Nhc2goe1xyXG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcclxuICAgICAgICBjb2xsZWN0aW9uX2lkOiB0aGlzLmlkLFxyXG4gICAgICAgIGFtb3VudDogdGhpcy5tb25leVxyXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgIHNob3dNc2coJ+aTjeS9nOaIkOWKnycpXHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=