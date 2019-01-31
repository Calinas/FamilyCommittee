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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var recordCashflow = function (_wepy$page) {
  _inherits(recordCashflow, _wepy$page);

  function recordCashflow() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, recordCashflow);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = recordCashflow.__proto__ || Object.getPrototypeOf(recordCashflow)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '记账'
    }, _this.data = {
      msg: '',
      img: [],
      seenIndex: 0,
      money: 0,
      cashType: [{
        id: 0,
        title: '收入',
        checked: true,
        type: 'in'
      }, {
        id: 1,
        title: '支出',
        checked: false,
        type: 'out'
      }],
      type: 'in',
      seeTypes: [{
        id: 0,
        title: '班级可见'
      }, {
        id: 1,
        title: '全部可见'
      }],
      memberInfo: null,
      classInfo: null
    }, _this.methods = {
      deleteFn: function deleteFn(arr, index) {
        this[arr].splice(index, 1);
        this.$apply();
      },
      pickerChange: function pickerChange(e) {
        this[e.currentTarget.id] = e.detail.value;
        this.$apply();
      },
      chooseImage: function chooseImage() {
        var _this2 = this;

        (0, _common.uploadImage)().then(function (res) {
          _this2.img.push(res);
          _this2.$apply();
        });
      },
      submit: function submit() {
        if (this.money <= 0) {
          (0, _common.showMsg)('请输入支出金额');
          return;
        }
        (0, _zone.addAccount)({
          class_id: this.classInfo.id,
          type: this.type,
          desc: this.msg,
          money: Number(this.money),
          imgList: this.img
        }).then(function (res) {
          if (res.data.success) {
            (0, _common.showMsg)('记账成功', 2000);
            setTimeout(function () {
              wx.navigateBack();
            }, 2000);
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(recordCashflow, [{
    key: 'onLoad',
    value: function onLoad() {
      this.classInfo = wx.getStorageSync('classInfo');
      this.memberInfo = wx.getStorageSync('memberInfo');
      this.$apply();
    }
  }]);

  return recordCashflow;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(recordCashflow , 'pages/recordCashflow'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY29yZENhc2hmbG93LmpzIl0sIm5hbWVzIjpbInJlY29yZENhc2hmbG93IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJtc2ciLCJpbWciLCJzZWVuSW5kZXgiLCJtb25leSIsImNhc2hUeXBlIiwiaWQiLCJ0aXRsZSIsImNoZWNrZWQiLCJ0eXBlIiwic2VlVHlwZXMiLCJtZW1iZXJJbmZvIiwiY2xhc3NJbmZvIiwibWV0aG9kcyIsImRlbGV0ZUZuIiwiYXJyIiwiaW5kZXgiLCJzcGxpY2UiLCIkYXBwbHkiLCJwaWNrZXJDaGFuZ2UiLCJlIiwiY3VycmVudFRhcmdldCIsImRldGFpbCIsInZhbHVlIiwiY2hvb3NlSW1hZ2UiLCJ0aGVuIiwicHVzaCIsInJlcyIsInN1Ym1pdCIsImNsYXNzX2lkIiwiZGVzYyIsIk51bWJlciIsImltZ0xpc3QiLCJzdWNjZXNzIiwic2V0VGltZW91dCIsInd4IiwibmF2aWdhdGVCYWNrIiwiZ2V0U3RvcmFnZVN5bmMiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQUNxQkEsYzs7Ozs7Ozs7Ozs7Ozs7c01BQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLFdBQUssRUFEQTtBQUVMQyxXQUFLLEVBRkE7QUFHTEMsaUJBQVcsQ0FITjtBQUlMQyxhQUFPLENBSkY7QUFLTEMsZ0JBQVUsQ0FDUjtBQUNFQyxZQUFJLENBRE47QUFFRUMsZUFBTyxJQUZUO0FBR0VDLGlCQUFTLElBSFg7QUFJRUMsY0FBTTtBQUpSLE9BRFEsRUFPUjtBQUNFSCxZQUFJLENBRE47QUFFRUMsZUFBTyxJQUZUO0FBR0VDLGlCQUFTLEtBSFg7QUFJRUMsY0FBTTtBQUpSLE9BUFEsQ0FMTDtBQW1CTEEsWUFBTSxJQW5CRDtBQW9CTEMsZ0JBQVUsQ0FDUjtBQUNFSixZQUFJLENBRE47QUFFRUMsZUFBTztBQUZULE9BRFEsRUFLUjtBQUNFRCxZQUFJLENBRE47QUFFRUMsZUFBTztBQUZULE9BTFEsQ0FwQkw7QUE4QkxJLGtCQUFZLElBOUJQO0FBK0JMQyxpQkFBVztBQS9CTixLLFFBc0NQQyxPLEdBQVU7QUFDUkMsY0FEUSxvQkFDRUMsR0FERixFQUNPQyxLQURQLEVBQ2M7QUFDcEIsYUFBS0QsR0FBTCxFQUFVRSxNQUFWLENBQWlCRCxLQUFqQixFQUF3QixDQUF4QjtBQUNBLGFBQUtFLE1BQUw7QUFDRCxPQUpPO0FBS1JDLGtCQUxRLHdCQUtLQyxDQUxMLEVBS1E7QUFDZCxhQUFLQSxFQUFFQyxhQUFGLENBQWdCZixFQUFyQixJQUEyQmMsRUFBRUUsTUFBRixDQUFTQyxLQUFwQztBQUNBLGFBQUtMLE1BQUw7QUFDRCxPQVJPO0FBU1JNLGlCQVRRLHlCQVNNO0FBQUE7O0FBQ1osbUNBQWNDLElBQWQsQ0FBbUIsZUFBTztBQUN4QixpQkFBS3ZCLEdBQUwsQ0FBU3dCLElBQVQsQ0FBY0MsR0FBZDtBQUNBLGlCQUFLVCxNQUFMO0FBQ0QsU0FIRDtBQUlELE9BZE87QUFlUlUsWUFmUSxvQkFlQztBQUNQLFlBQUksS0FBS3hCLEtBQUwsSUFBYyxDQUFsQixFQUFxQjtBQUNuQiwrQkFBUSxTQUFSO0FBQ0E7QUFDRDtBQUNELDhCQUFXO0FBQ1R5QixvQkFBVSxLQUFLakIsU0FBTCxDQUFlTixFQURoQjtBQUVURyxnQkFBTSxLQUFLQSxJQUZGO0FBR1RxQixnQkFBTSxLQUFLN0IsR0FIRjtBQUlURyxpQkFBTzJCLE9BQU8sS0FBSzNCLEtBQVosQ0FKRTtBQUtUNEIsbUJBQVMsS0FBSzlCO0FBTEwsU0FBWCxFQU1HdUIsSUFOSCxDQU1RLGVBQU87QUFDYixjQUFJRSxJQUFJM0IsSUFBSixDQUFTaUMsT0FBYixFQUFzQjtBQUNwQixpQ0FBUSxNQUFSLEVBQWdCLElBQWhCO0FBQ0FDLHVCQUFXLFlBQU07QUFDZkMsaUJBQUdDLFlBQUg7QUFDRCxhQUZELEVBRUcsSUFGSDtBQUdEO0FBQ0YsU0FiRDtBQWNEO0FBbENPLEs7Ozs7OzZCQUxEO0FBQ1AsV0FBS3hCLFNBQUwsR0FBaUJ1QixHQUFHRSxjQUFILENBQWtCLFdBQWxCLENBQWpCO0FBQ0EsV0FBSzFCLFVBQUwsR0FBa0J3QixHQUFHRSxjQUFILENBQWtCLFlBQWxCLENBQWxCO0FBQ0EsV0FBS25CLE1BQUw7QUFDRDs7OztFQXpDeUNvQixlQUFLQyxJOztrQkFBNUIxQyxjIiwiZmlsZSI6InJlY29yZENhc2hmbG93LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHsgYWRkQWNjb3VudCB9IGZyb20gJy4uL2FwaS96b25lJ1xuaW1wb3J0IHsgc2hvd01zZywgdXBsb2FkSW1hZ2UgfSBmcm9tICcuLi91dGlscy9jb21tb24nXG5leHBvcnQgZGVmYXVsdCBjbGFzcyByZWNvcmRDYXNoZmxvdyBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6K6w6LSmJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgbXNnOiAnJyxcbiAgICBpbWc6IFtdLFxuICAgIHNlZW5JbmRleDogMCxcbiAgICBtb25leTogMCxcbiAgICBjYXNoVHlwZTogW1xuICAgICAge1xuICAgICAgICBpZDogMCxcbiAgICAgICAgdGl0bGU6ICfmlLblhaUnLFxuICAgICAgICBjaGVja2VkOiB0cnVlLFxuICAgICAgICB0eXBlOiAnaW4nXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogMSxcbiAgICAgICAgdGl0bGU6ICfmlK/lh7onLFxuICAgICAgICBjaGVja2VkOiBmYWxzZSxcbiAgICAgICAgdHlwZTogJ291dCdcbiAgICAgIH1cbiAgICBdLFxuICAgIHR5cGU6ICdpbicsXG4gICAgc2VlVHlwZXM6IFtcbiAgICAgIHtcbiAgICAgICAgaWQ6IDAsXG4gICAgICAgIHRpdGxlOiAn54+t57qn5Y+v6KeBJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6IDEsXG4gICAgICAgIHRpdGxlOiAn5YWo6YOo5Y+v6KeBJ1xuICAgICAgfVxuICAgIF0sXG4gICAgbWVtYmVySW5mbzogbnVsbCxcbiAgICBjbGFzc0luZm86IG51bGxcbiAgfVxuICBvbkxvYWQoKSB7XG4gICAgdGhpcy5jbGFzc0luZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnY2xhc3NJbmZvJylcbiAgICB0aGlzLm1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgZGVsZXRlRm4gKGFyciwgaW5kZXgpIHtcbiAgICAgIHRoaXNbYXJyXS5zcGxpY2UoaW5kZXgsIDEpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBwaWNrZXJDaGFuZ2UoZSkge1xuICAgICAgdGhpc1tlLmN1cnJlbnRUYXJnZXQuaWRdID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGNob29zZUltYWdlKCkge1xuICAgICAgdXBsb2FkSW1hZ2UoKS50aGVuKHJlcyA9PiB7XG4gICAgICAgIHRoaXMuaW1nLnB1c2gocmVzKVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH0sXG4gICAgc3VibWl0KCkge1xuICAgICAgaWYgKHRoaXMubW9uZXkgPD0gMCkge1xuICAgICAgICBzaG93TXNnKCfor7fovpPlhaXmlK/lh7rph5Hpop0nKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGFkZEFjY291bnQoe1xuICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXG4gICAgICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICAgICAgZGVzYzogdGhpcy5tc2csXG4gICAgICAgIG1vbmV5OiBOdW1iZXIodGhpcy5tb25leSksXG4gICAgICAgIGltZ0xpc3Q6IHRoaXMuaW1nXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgc2hvd01zZygn6K6w6LSm5oiQ5YqfJywgMjAwMClcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjaygpXG4gICAgICAgICAgfSwgMjAwMClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cbiJdfQ==