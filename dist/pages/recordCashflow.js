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
        if (this.msg.length <= 0) {
          (0, _common.showMsg)('请输入描述');
          return;
        }
        if (this.img.length <= 0) {
          (0, _common.showMsg)('请上传凭证');
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY29yZENhc2hmbG93LmpzIl0sIm5hbWVzIjpbInJlY29yZENhc2hmbG93IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJtc2ciLCJpbWciLCJzZWVuSW5kZXgiLCJtb25leSIsImNhc2hUeXBlIiwiaWQiLCJ0aXRsZSIsImNoZWNrZWQiLCJ0eXBlIiwic2VlVHlwZXMiLCJtZW1iZXJJbmZvIiwiY2xhc3NJbmZvIiwibWV0aG9kcyIsImRlbGV0ZUZuIiwiYXJyIiwiaW5kZXgiLCJzcGxpY2UiLCIkYXBwbHkiLCJwaWNrZXJDaGFuZ2UiLCJlIiwiY3VycmVudFRhcmdldCIsImRldGFpbCIsInZhbHVlIiwiY2hvb3NlSW1hZ2UiLCJ0aGVuIiwicHVzaCIsInJlcyIsInN1Ym1pdCIsImxlbmd0aCIsImNsYXNzX2lkIiwiZGVzYyIsIk51bWJlciIsImltZ0xpc3QiLCJzdWNjZXNzIiwic2V0VGltZW91dCIsInd4IiwibmF2aWdhdGVCYWNrIiwiZ2V0U3RvcmFnZVN5bmMiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQUNxQkEsYzs7Ozs7Ozs7Ozs7Ozs7c01BQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLFdBQUssRUFEQTtBQUVMQyxXQUFLLEVBRkE7QUFHTEMsaUJBQVcsQ0FITjtBQUlMQyxhQUFPLENBSkY7QUFLTEMsZ0JBQVUsQ0FDUjtBQUNFQyxZQUFJLENBRE47QUFFRUMsZUFBTyxJQUZUO0FBR0VDLGlCQUFTLElBSFg7QUFJRUMsY0FBTTtBQUpSLE9BRFEsRUFPUjtBQUNFSCxZQUFJLENBRE47QUFFRUMsZUFBTyxJQUZUO0FBR0VDLGlCQUFTLEtBSFg7QUFJRUMsY0FBTTtBQUpSLE9BUFEsQ0FMTDtBQW1CTEEsWUFBTSxJQW5CRDtBQW9CTEMsZ0JBQVUsQ0FDUjtBQUNFSixZQUFJLENBRE47QUFFRUMsZUFBTztBQUZULE9BRFEsRUFLUjtBQUNFRCxZQUFJLENBRE47QUFFRUMsZUFBTztBQUZULE9BTFEsQ0FwQkw7QUE4QkxJLGtCQUFZLElBOUJQO0FBK0JMQyxpQkFBVztBQS9CTixLLFFBc0NQQyxPLEdBQVU7QUFDUkMsY0FEUSxvQkFDRUMsR0FERixFQUNPQyxLQURQLEVBQ2M7QUFDcEIsYUFBS0QsR0FBTCxFQUFVRSxNQUFWLENBQWlCRCxLQUFqQixFQUF3QixDQUF4QjtBQUNBLGFBQUtFLE1BQUw7QUFDRCxPQUpPO0FBS1JDLGtCQUxRLHdCQUtLQyxDQUxMLEVBS1E7QUFDZCxhQUFLQSxFQUFFQyxhQUFGLENBQWdCZixFQUFyQixJQUEyQmMsRUFBRUUsTUFBRixDQUFTQyxLQUFwQztBQUNBLGFBQUtMLE1BQUw7QUFDRCxPQVJPO0FBU1JNLGlCQVRRLHlCQVNNO0FBQUE7O0FBQ1osbUNBQWNDLElBQWQsQ0FBbUIsZUFBTztBQUN4QixpQkFBS3ZCLEdBQUwsQ0FBU3dCLElBQVQsQ0FBY0MsR0FBZDtBQUNBLGlCQUFLVCxNQUFMO0FBQ0QsU0FIRDtBQUlELE9BZE87QUFlUlUsWUFmUSxvQkFlQztBQUNQLFlBQUksS0FBS3hCLEtBQUwsSUFBYyxDQUFsQixFQUFxQjtBQUNuQiwrQkFBUSxTQUFSO0FBQ0E7QUFDRDtBQUNELFlBQUksS0FBS0gsR0FBTCxDQUFTNEIsTUFBVCxJQUFtQixDQUF2QixFQUEwQjtBQUN4QiwrQkFBUSxPQUFSO0FBQ0E7QUFDRDtBQUNELFlBQUksS0FBSzNCLEdBQUwsQ0FBUzJCLE1BQVQsSUFBbUIsQ0FBdkIsRUFBMEI7QUFDeEIsK0JBQVEsT0FBUjtBQUNBO0FBQ0Q7O0FBRUQsOEJBQVc7QUFDVEMsb0JBQVUsS0FBS2xCLFNBQUwsQ0FBZU4sRUFEaEI7QUFFVEcsZ0JBQU0sS0FBS0EsSUFGRjtBQUdUc0IsZ0JBQU0sS0FBSzlCLEdBSEY7QUFJVEcsaUJBQU80QixPQUFPLEtBQUs1QixLQUFaLENBSkU7QUFLVDZCLG1CQUFTLEtBQUsvQjtBQUxMLFNBQVgsRUFNR3VCLElBTkgsQ0FNUSxlQUFPO0FBQ2IsY0FBSUUsSUFBSTNCLElBQUosQ0FBU2tDLE9BQWIsRUFBc0I7QUFDcEIsaUNBQVEsTUFBUixFQUFnQixJQUFoQjtBQUNBQyx1QkFBVyxZQUFNO0FBQ2ZDLGlCQUFHQyxZQUFIO0FBQ0QsYUFGRCxFQUVHLElBRkg7QUFHRDtBQUNGLFNBYkQ7QUFjRDtBQTNDTyxLOzs7Ozs2QkFMRDtBQUNQLFdBQUt6QixTQUFMLEdBQWlCd0IsR0FBR0UsY0FBSCxDQUFrQixXQUFsQixDQUFqQjtBQUNBLFdBQUszQixVQUFMLEdBQWtCeUIsR0FBR0UsY0FBSCxDQUFrQixZQUFsQixDQUFsQjtBQUNBLFdBQUtwQixNQUFMO0FBQ0Q7Ozs7RUF6Q3lDcUIsZUFBS0MsSTs7a0JBQTVCM0MsYyIsImZpbGUiOiJyZWNvcmRDYXNoZmxvdy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgeyBhZGRBY2NvdW50IH0gZnJvbSAnLi4vYXBpL3pvbmUnXHJcbmltcG9ydCB7IHNob3dNc2csIHVwbG9hZEltYWdlIH0gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyByZWNvcmRDYXNoZmxvdyBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+iusOi0pidcclxuICB9XHJcbiAgZGF0YSA9IHtcclxuICAgIG1zZzogJycsXHJcbiAgICBpbWc6IFtdLFxyXG4gICAgc2VlbkluZGV4OiAwLFxyXG4gICAgbW9uZXk6IDAsXHJcbiAgICBjYXNoVHlwZTogW1xyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6IDAsXHJcbiAgICAgICAgdGl0bGU6ICfmlLblhaUnLFxyXG4gICAgICAgIGNoZWNrZWQ6IHRydWUsXHJcbiAgICAgICAgdHlwZTogJ2luJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6IDEsXHJcbiAgICAgICAgdGl0bGU6ICfmlK/lh7onLFxyXG4gICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxyXG4gICAgICAgIHR5cGU6ICdvdXQnXHJcbiAgICAgIH1cclxuICAgIF0sXHJcbiAgICB0eXBlOiAnaW4nLFxyXG4gICAgc2VlVHlwZXM6IFtcclxuICAgICAge1xyXG4gICAgICAgIGlkOiAwLFxyXG4gICAgICAgIHRpdGxlOiAn54+t57qn5Y+v6KeBJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6IDEsXHJcbiAgICAgICAgdGl0bGU6ICflhajpg6jlj6/op4EnXHJcbiAgICAgIH1cclxuICAgIF0sXHJcbiAgICBtZW1iZXJJbmZvOiBudWxsLFxyXG4gICAgY2xhc3NJbmZvOiBudWxsXHJcbiAgfVxyXG4gIG9uTG9hZCgpIHtcclxuICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXHJcbiAgICB0aGlzLm1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXHJcbiAgICB0aGlzLiRhcHBseSgpXHJcbiAgfVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBkZWxldGVGbiAoYXJyLCBpbmRleCkge1xyXG4gICAgICB0aGlzW2Fycl0uc3BsaWNlKGluZGV4LCAxKVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9LFxyXG4gICAgcGlja2VyQ2hhbmdlKGUpIHtcclxuICAgICAgdGhpc1tlLmN1cnJlbnRUYXJnZXQuaWRdID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSxcclxuICAgIGNob29zZUltYWdlKCkge1xyXG4gICAgICB1cGxvYWRJbWFnZSgpLnRoZW4ocmVzID0+IHtcclxuICAgICAgICB0aGlzLmltZy5wdXNoKHJlcylcclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgc3VibWl0KCkge1xyXG4gICAgICBpZiAodGhpcy5tb25leSA8PSAwKSB7XHJcbiAgICAgICAgc2hvd01zZygn6K+36L6T5YWl5pSv5Ye66YeR6aKdJylcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5tc2cubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICBzaG93TXNnKCfor7fovpPlhaXmj4/ov7AnKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLmltZy5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgIHNob3dNc2coJ+ivt+S4iuS8oOWHreivgScpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGFkZEFjY291bnQoe1xyXG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcclxuICAgICAgICB0eXBlOiB0aGlzLnR5cGUsXHJcbiAgICAgICAgZGVzYzogdGhpcy5tc2csXHJcbiAgICAgICAgbW9uZXk6IE51bWJlcih0aGlzLm1vbmV5KSxcclxuICAgICAgICBpbWdMaXN0OiB0aGlzLmltZ1xyXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgIHNob3dNc2coJ+iusOi0puaIkOWKnycsIDIwMDApXHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKClcclxuICAgICAgICAgIH0sIDIwMDApXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=