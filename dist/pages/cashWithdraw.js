'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _cashModal = require('./../components/cashModal.js');

var _cashModal2 = _interopRequireDefault(_cashModal);

var _zone = require('./../api/zone.js');

var _finance = require('./../api/finance.js');

var _common = require('./../utils/common.js');

var _normalize = require('./../utils/normalize.js');

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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CashWithdrawal.__proto__ || Object.getPrototypeOf(CashWithdrawal)).call.apply(_ref, [this].concat(args))), _this), _this.$repeat = {}, _this.$props = { "CashModal": { "xmlns:v-bind": "", "v-bind:flag.sync": "showSureFlag", "v-bind:moneyInput.sync": "money", "xmlns:v-on": "" } }, _this.$events = { "CashModal": { "v-on:input": "bindInput", "v-on:cancel": "cancel", "v-on:sure": "sure" } }, _this.components = {
      CashModal: _cashModal2.default
    }, _this.config = {
      navigationBarTitleText: '收款提现'
    }, _this.data = {
      isCash: true,
      showSureFlag: false,
      memberInfo: null,
      classInfo: null,
      pn: 1,
      ps: 10,
      list: [],
      loading: false,
      loadFinished: false,
      title: '确认提现',
      money: 0,
      collection_id: 0
    }, _this.methods = {
      bindInput: function bindInput(value) {
        this.money = value;
        this.$apply();
      },
      sure: function sure(money) {
        this.showSureFlag = false;
        this.withdraw();
        this.$apply();
      },
      cancel: function cancel() {
        this.showSureFlag = false;
        this.$apply();
      },
      submit: function submit(id, money) {
        this.collection_id = id;
        this.money = money;
        this.showSureFlag = true;
        this.$apply();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CashWithdrawal, [{
    key: 'onPullDownRefresh',
    value: function onPullDownRefresh() {
      this.resetData();
      this.getZoneList();
    }
  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      if (this.loading || this.loadFinished) return;
      this.getList();
    }
  }, {
    key: 'resetData',
    value: function resetData() {
      this.pn = 1;
      this.ps = 10;
      this.loading = false;
      this.loadFinished = false;
      this.list = [];
      this.$apply();
    }
  }, {
    key: 'withdraw',
    value: function withdraw() {
      var _this2 = this;

      (0, _finance.withdrawCash)({
        class_id: this.classInfo.id,
        collection_id: Number(this.collection_id),
        amount: Number(this.money)
      }).then(function (res) {
        if (res.data.success) {
          (0, _common.showMsg)('操作成功', 1000);
          setTimeout(function () {
            _this2.resetData();
            _this2.getList();
          }, 2000);
        }
        _this2.$apply();
      });
    }
  }, {
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

        list = list.map(_normalize.cashWithdrawObj);
        _this3.loading = false;
        _this3.pn++;
        _this3.list = [].concat(_toConsumableArray(_this3.list), _toConsumableArray(list));
        if (list.length < _this3.ps) {
          _this3.loadFinished = true;
        }
        _this3.$apply();
      });
    }
  }]);

  return CashWithdrawal;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(CashWithdrawal , 'pages/cashWithdraw'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhc2hXaXRoZHJhdy5qcyJdLCJuYW1lcyI6WyJDYXNoV2l0aGRyYXdhbCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIkNhc2hNb2RhbCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiaXNDYXNoIiwic2hvd1N1cmVGbGFnIiwibWVtYmVySW5mbyIsImNsYXNzSW5mbyIsInBuIiwicHMiLCJsaXN0IiwibG9hZGluZyIsImxvYWRGaW5pc2hlZCIsInRpdGxlIiwibW9uZXkiLCJjb2xsZWN0aW9uX2lkIiwibWV0aG9kcyIsImJpbmRJbnB1dCIsInZhbHVlIiwiJGFwcGx5Iiwic3VyZSIsIndpdGhkcmF3IiwiY2FuY2VsIiwic3VibWl0IiwiaWQiLCJyZXNldERhdGEiLCJnZXRab25lTGlzdCIsImdldExpc3QiLCJjbGFzc19pZCIsIk51bWJlciIsImFtb3VudCIsInRoZW4iLCJyZXMiLCJzdWNjZXNzIiwic2V0VGltZW91dCIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJzZWVfdHlwZSIsInR5cGUiLCJtYXAiLCJjYXNoV2l0aGRyYXdPYmoiLCJsZW5ndGgiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLGM7Ozs7Ozs7Ozs7Ozs7O3NNQUNwQkMsTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLG9CQUFtQixjQUF0QyxFQUFxRCwwQkFBeUIsT0FBOUUsRUFBc0YsY0FBYSxFQUFuRyxFQUFiLEUsUUFDVEMsTyxHQUFVLEVBQUMsYUFBWSxFQUFDLGNBQWEsV0FBZCxFQUEwQixlQUFjLFFBQXhDLEVBQWlELGFBQVksTUFBN0QsRUFBYixFLFFBQ1RDLFUsR0FBYTtBQUNWQztBQURVLEssUUFHWkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtB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LFlBQUlBLEtBQUsrQixNQUFMLEdBQWMsT0FBS2hDLEVBQXZCLEVBQTJCO0FBQ3pCLGlCQUFLRyxZQUFMLEdBQW9CLElBQXBCO0FBQ0Q7QUFDRCxlQUFLTyxNQUFMO0FBQ0QsT0FoQkQ7QUFpQkQ7Ozs7RUF0R3lDdUIsZUFBS0MsSTs7a0JBQTVCaEQsYyIsImZpbGUiOiJjYXNoV2l0aGRyYXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgQ2FzaE1vZGFsIGZyb20gJ2NvbXBvbmVudHMvY2FzaE1vZGFsJ1xuaW1wb3J0IHsgZ2V0Q2lyY2xlTGlzdCB9IGZyb20gJy4uL2FwaS96b25lJ1xuaW1wb3J0IHsgd2l0aGRyYXdDYXNoIH0gZnJvbSAnLi4vYXBpL2ZpbmFuY2UnXG5pbXBvcnQgeyBzaG93TXNnIH0gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xuaW1wb3J0IHsgY2FzaFdpdGhkcmF3T2JqIH0gZnJvbSAnLi4vdXRpbHMvbm9ybWFsaXplJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FzaFdpdGhkcmF3YWwgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiQ2FzaE1vZGFsXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpmbGFnLnN5bmNcIjpcInNob3dTdXJlRmxhZ1wiLFwidi1iaW5kOm1vbmV5SW5wdXQuc3luY1wiOlwibW9uZXlcIixcInhtbG5zOnYtb25cIjpcIlwifX07XHJcbiRldmVudHMgPSB7XCJDYXNoTW9kYWxcIjp7XCJ2LW9uOmlucHV0XCI6XCJiaW5kSW5wdXRcIixcInYtb246Y2FuY2VsXCI6XCJjYW5jZWxcIixcInYtb246c3VyZVwiOlwic3VyZVwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgIENhc2hNb2RhbFxuICB9XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5pS25qy+5o+Q546wJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgaXNDYXNoOiB0cnVlLFxuICAgIHNob3dTdXJlRmxhZzogZmFsc2UsXG4gICAgbWVtYmVySW5mbzogbnVsbCxcbiAgICBjbGFzc0luZm86IG51bGwsXG4gICAgcG46IDEsXG4gICAgcHM6IDEwLFxuICAgIGxpc3Q6IFtdLFxuICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgIGxvYWRGaW5pc2hlZDogZmFsc2UsXG4gICAgdGl0bGU6ICfnoa7orqTmj5DnjrAnLFxuICAgIG1vbmV5OiAwLFxuICAgIGNvbGxlY3Rpb25faWQ6IDBcbiAgfVxuICBvblB1bGxEb3duUmVmcmVzaCgpIHtcbiAgICB0aGlzLnJlc2V0RGF0YSgpXG4gICAgdGhpcy5nZXRab25lTGlzdCgpXG4gIH1cbiAgb25SZWFjaEJvdHRvbSgpIHtcbiAgICBpZiAodGhpcy5sb2FkaW5nIHx8IHRoaXMubG9hZEZpbmlzaGVkKSByZXR1cm5cbiAgICB0aGlzLmdldExpc3QoKVxuICB9XG4gIHJlc2V0RGF0YSgpIHtcbiAgICB0aGlzLnBuID0gMVxuICAgIHRoaXMucHMgPSAxMFxuICAgIHRoaXMubG9hZGluZyA9IGZhbHNlXG4gICAgdGhpcy5sb2FkRmluaXNoZWQgPSBmYWxzZVxuICAgIHRoaXMubGlzdCA9IFtdXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIHdpdGhkcmF3KCkge1xuICAgIHdpdGhkcmF3Q2FzaCh7XG4gICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXG4gICAgICBjb2xsZWN0aW9uX2lkOiBOdW1iZXIodGhpcy5jb2xsZWN0aW9uX2lkKSxcbiAgICAgIGFtb3VudDogTnVtYmVyKHRoaXMubW9uZXkpXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgc2hvd01zZygn5pON5L2c5oiQ5YqfJywgMTAwMClcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5yZXNldERhdGEoKVxuICAgICAgICAgIHRoaXMuZ2V0TGlzdCgpXG4gICAgICAgIH0sIDIwMDApXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSlcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIGJpbmRJbnB1dCh2YWx1ZSkge1xuICAgICAgdGhpcy5tb25leSA9IHZhbHVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBzdXJlKG1vbmV5KSB7XG4gICAgICB0aGlzLnNob3dTdXJlRmxhZyA9IGZhbHNlXG4gICAgICB0aGlzLndpdGhkcmF3KClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGNhbmNlbCgpIHtcbiAgICAgIHRoaXMuc2hvd1N1cmVGbGFnID0gZmFsc2VcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIHN1Ym1pdChpZCwgbW9uZXkpIHtcbiAgICAgIHRoaXMuY29sbGVjdGlvbl9pZCA9IGlkXG4gICAgICB0aGlzLm1vbmV5ID0gbW9uZXlcbiAgICAgIHRoaXMuc2hvd1N1cmVGbGFnID0gdHJ1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuICBvbkxvYWQoKSB7XG4gICAgdGhpcy5tZW1iZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nKVxuICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXG4gICAgdGhpcy5nZXRMaXN0KClcbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgZ2V0TGlzdCgpIHtcbiAgICBjb25zdCBpZCA9IHRoaXMuY2xhc3NJbmZvLmlkXG4gICAgZ2V0Q2lyY2xlTGlzdCh7XG4gICAgICBjbGFzc19pZDogaWQsXG4gICAgICBzZWVfdHlwZTogaWQgPyAnJyA6ICdhbGwnLFxuICAgICAgdHlwZTogJ2NvbGxlY3Rpb24nLFxuICAgICAgcG46IHRoaXMucG4sXG4gICAgICBwczogdGhpcy5wc1xuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIGxldCB7IGxpc3QgfSA9IHJlcy5kYXRhXG4gICAgICBsaXN0ID0gbGlzdC5tYXAoY2FzaFdpdGhkcmF3T2JqKVxuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2VcbiAgICAgIHRoaXMucG4rK1xuICAgICAgdGhpcy5saXN0ID0gWy4uLnRoaXMubGlzdCwgLi4ubGlzdF1cbiAgICAgIGlmIChsaXN0Lmxlbmd0aCA8IHRoaXMucHMpIHtcbiAgICAgICAgdGhpcy5sb2FkRmluaXNoZWQgPSB0cnVlXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSlcbiAgfVxufVxuIl19