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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpdGhkcmF3LmpzIl0sIm5hbWVzIjpbIldpdGhkcmF3IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJjbGFzc0luZm8iLCJtZW1iZXJJbmZvIiwiYmFua05hbWUiLCJiYW5rUmVzZXJ2ZWROYW1lIiwiYmFua0NhcmQiLCJiYW5rTW9iaWxlIiwiY2FyZCIsIm1vbmV5IiwiaWQiLCJtZXRob2RzIiwicGlja2VyQ2hhbmdlIiwiZSIsImN1cnJlbnRUYXJnZXQiLCJkZXRhaWwiLCJ2YWx1ZSIsIiRhcHBseSIsInNhdmVCYW5rSW5mbyIsImJhbmtfbmFtZSIsImJhbmtfcmVzZXJ2ZWRfbmFtZSIsImJhbmRDYXJkIiwiYmFua19jYXJkIiwiYmFua19tb2JpbGUiLCJ0aGVuIiwicmVzIiwic3VjY2VzcyIsImdldE1lbWJlckluZm8iLCJzdWJtaXQiLCJjbGFzc19pZCIsImNvbGxlY3Rpb25faWQiLCJhbW91bnQiLCJvcHRpb25zIiwid3giLCJnZXRTdG9yYWdlU3luYyIsImNhcmRfaW5mbyIsImNhcmRJbmZvIiwibWVtYmVyX2V4dGVuZCIsImluZm8iLCJPYmplY3QiLCJhc3NpZ24iLCJzZXRTdG9yYWdlU3luYyIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBQ3FCQSxROzs7Ozs7Ozs7Ozs7OzswTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsaUJBQVcsRUFETjtBQUVMQyxrQkFBWSxFQUZQO0FBR0xDLGdCQUFVLEVBSEw7QUFJTEMsd0JBQWtCLEVBSmI7QUFLTEMsZ0JBQVUsRUFMTDtBQU1MQyxrQkFBWSxFQU5QO0FBT0xDLFlBQU0sRUFQRDtBQVFMQyxhQUFPLENBUkY7QUFTTEMsVUFBSTtBQVRDLEssUUFnQ1BDLE8sR0FBVTtBQUNSQyxrQkFEUSx3QkFDS0MsQ0FETCxFQUNRO0FBQ2QsYUFBS0EsRUFBRUMsYUFBRixDQUFnQkosRUFBckIsSUFBMkJHLEVBQUVFLE1BQUYsQ0FBU0MsS0FBcEM7QUFDQSxhQUFLQyxNQUFMO0FBQ0QsT0FKTztBQUtSQyxrQkFMUSwwQkFLTztBQUFBOztBQUNiLG1DQUFhO0FBQ1hkLG9CQUFVLEtBQUtBLFFBQUwsR0FBZ0IsS0FBS0EsUUFBckIsR0FBZ0MsS0FBS0ksSUFBTCxDQUFVVyxTQUR6QztBQUVYZCw0QkFBa0IsS0FBS0EsZ0JBQUwsR0FBd0IsS0FBS0EsZ0JBQTdCLEdBQWdELEtBQUtHLElBQUwsQ0FBVVksa0JBRmpFO0FBR1hkLG9CQUFVLEtBQUtBLFFBQUwsR0FBZ0IsS0FBS2UsUUFBckIsR0FBZ0MsS0FBS2IsSUFBTCxDQUFVYyxTQUh6QztBQUlYZixzQkFBWSxLQUFLQSxVQUFMLEdBQWtCLEtBQUtBLFVBQXZCLEdBQW9DLEtBQUtDLElBQUwsQ0FBVWU7QUFKL0MsU0FBYixFQUtHQyxJQUxILENBS1EsZUFBTztBQUNiLGNBQUlDLElBQUl4QixJQUFKLENBQVN5QixPQUFiLEVBQXNCO0FBQ3BCLG1CQUFLQyxhQUFMO0FBQ0EsaUNBQVEsTUFBUjtBQUNEO0FBQ0YsU0FWRDtBQVdELE9BakJPO0FBa0JSQyxZQWxCUSxvQkFrQkM7QUFBQTs7QUFDUCxtQ0FBYTtBQUNYQyxvQkFBVSxLQUFLM0IsU0FBTCxDQUFlUSxFQURkO0FBRVhvQix5QkFBZSxLQUFLcEIsRUFGVDtBQUdYcUIsa0JBQVEsS0FBS3RCO0FBSEYsU0FBYixFQUlHZSxJQUpILENBSVEsZUFBTztBQUNiLGNBQUlDLElBQUl4QixJQUFKLENBQVN5QixPQUFiLEVBQXNCO0FBQ3BCLGlDQUFRLE1BQVI7QUFDQSxtQkFBS1QsTUFBTDtBQUNEO0FBQ0YsU0FURDtBQVVEO0FBN0JPLEs7Ozs7OzJCQXJCSGUsTyxFQUFTO0FBQ2QsV0FBSzlCLFNBQUwsR0FBaUIrQixHQUFHQyxjQUFILENBQWtCLFdBQWxCLENBQWpCO0FBQ0EsV0FBSy9CLFVBQUwsR0FBa0I4QixHQUFHQyxjQUFILENBQWtCLFlBQWxCLENBQWxCO0FBQ0EsV0FBS3hCLEVBQUwsR0FBVXNCLFFBQVF0QixFQUFsQjtBQUNBLFdBQUtELEtBQUwsR0FBYXVCLFFBQVF2QixLQUFyQjtBQUNBLFdBQUtELElBQUwsR0FBWSxLQUFLTCxVQUFMLENBQWdCZ0MsU0FBNUI7QUFDQSxXQUFLbEIsTUFBTDtBQUNEOzs7b0NBQ2U7QUFDZCw0QkFBVztBQUNUWSxrQkFBVSxLQUFLM0IsU0FBTCxDQUFlUTtBQURoQixPQUFYLEVBRUdjLElBRkgsQ0FFUSxlQUFPO0FBQ2IsWUFBSXZCLE9BQU93QixJQUFJeEIsSUFBSixDQUFTQSxJQUFwQjtBQUNBLFlBQUltQyxXQUFXbkMsS0FBS29DLGFBQXBCO0FBQ0EsWUFBSWxDLGFBQWE4QixHQUFHQyxjQUFILENBQWtCLFlBQWxCLENBQWpCO0FBQ0EsWUFBSUksT0FBT0MsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0I7QUFDM0JMLHFCQUFXQztBQURnQixTQUFsQixFQUVSakMsVUFGUSxDQUFYO0FBR0E4QixXQUFHUSxjQUFILENBQWtCLFlBQWxCLEVBQWdDSCxJQUFoQztBQUNELE9BVkQ7QUFXRDs7OztFQW5DbUNJLGVBQUtDLEk7O2tCQUF0QjdDLFEiLCJmaWxlIjoid2l0aGRyYXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgeyB3aXRoZHJhd0Nhc2gsIHNhdmVCYW5rSW5mbyB9IGZyb20gJy4uL2FwaS9maW5hbmNlJ1xuaW1wb3J0IHsgc2hvd01zZyB9IGZyb20gJy4uL3V0aWxzL2NvbW1vbidcbmltcG9ydCB7IG1lbWJlckluZm8gfSBmcm9tICcuLi9hcGkvdXNlcidcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdpdGhkcmF3IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnlLPor7fmj5DnjrAnXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBjbGFzc0luZm86IHt9LFxuICAgIG1lbWJlckluZm86IHt9LFxuICAgIGJhbmtOYW1lOiAnJyxcbiAgICBiYW5rUmVzZXJ2ZWROYW1lOiAnJyxcbiAgICBiYW5rQ2FyZDogJycsXG4gICAgYmFua01vYmlsZTogJycsXG4gICAgY2FyZDoge30sXG4gICAgbW9uZXk6IDAsXG4gICAgaWQ6IDBcbiAgfVxuICBvbkxvYWQob3B0aW9ucykge1xuICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXG4gICAgdGhpcy5tZW1iZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nKVxuICAgIHRoaXMuaWQgPSBvcHRpb25zLmlkXG4gICAgdGhpcy5tb25leSA9IG9wdGlvbnMubW9uZXlcbiAgICB0aGlzLmNhcmQgPSB0aGlzLm1lbWJlckluZm8uY2FyZF9pbmZvXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIGdldE1lbWJlckluZm8oKSB7XG4gICAgbWVtYmVySW5mbyh7XG4gICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWRcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgIGxldCBjYXJkSW5mbyA9IGRhdGEubWVtYmVyX2V4dGVuZFxuICAgICAgbGV0IG1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXG4gICAgICBsZXQgaW5mbyA9IE9iamVjdC5hc3NpZ24oe30sIHtcbiAgICAgICAgY2FyZF9pbmZvOiBjYXJkSW5mb1xuICAgICAgfSwgbWVtYmVySW5mbylcbiAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJywgaW5mbylcbiAgICB9KVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgcGlja2VyQ2hhbmdlKGUpIHtcbiAgICAgIHRoaXNbZS5jdXJyZW50VGFyZ2V0LmlkXSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBzYXZlQmFua0luZm8oKSB7XG4gICAgICBzYXZlQmFua0luZm8oe1xuICAgICAgICBiYW5rTmFtZTogdGhpcy5iYW5rTmFtZSA/IHRoaXMuYmFua05hbWUgOiB0aGlzLmNhcmQuYmFua19uYW1lLFxuICAgICAgICBiYW5rUmVzZXJ2ZWROYW1lOiB0aGlzLmJhbmtSZXNlcnZlZE5hbWUgPyB0aGlzLmJhbmtSZXNlcnZlZE5hbWUgOiB0aGlzLmNhcmQuYmFua19yZXNlcnZlZF9uYW1lLFxuICAgICAgICBiYW5rQ2FyZDogdGhpcy5iYW5rQ2FyZCA/IHRoaXMuYmFuZENhcmQgOiB0aGlzLmNhcmQuYmFua19jYXJkLFxuICAgICAgICBiYW5rTW9iaWxlOiB0aGlzLmJhbmtNb2JpbGUgPyB0aGlzLmJhbmtNb2JpbGUgOiB0aGlzLmNhcmQuYmFua19tb2JpbGVcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICB0aGlzLmdldE1lbWJlckluZm8oKVxuICAgICAgICAgIHNob3dNc2coJ+aTjeS9nOaIkOWKnycpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBzdWJtaXQoKSB7XG4gICAgICB3aXRoZHJhd0Nhc2goe1xuICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXG4gICAgICAgIGNvbGxlY3Rpb25faWQ6IHRoaXMuaWQsXG4gICAgICAgIGFtb3VudDogdGhpcy5tb25leVxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgIHNob3dNc2coJ+aTjeS9nOaIkOWKnycpXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxufVxuIl19