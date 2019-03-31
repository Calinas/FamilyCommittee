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
        // if (this.img.length <= 0) {
        //   showMsg('请上传凭证')
        //   return
        // }

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY29yZENhc2hmbG93LmpzIl0sIm5hbWVzIjpbInJlY29yZENhc2hmbG93IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJtc2ciLCJpbWciLCJzZWVuSW5kZXgiLCJtb25leSIsImNhc2hUeXBlIiwiaWQiLCJ0aXRsZSIsImNoZWNrZWQiLCJ0eXBlIiwic2VlVHlwZXMiLCJtZW1iZXJJbmZvIiwiY2xhc3NJbmZvIiwibWV0aG9kcyIsImRlbGV0ZUZuIiwiYXJyIiwiaW5kZXgiLCJzcGxpY2UiLCIkYXBwbHkiLCJwaWNrZXJDaGFuZ2UiLCJlIiwiY3VycmVudFRhcmdldCIsImRldGFpbCIsInZhbHVlIiwiY2hvb3NlSW1hZ2UiLCJ0aGVuIiwicHVzaCIsInJlcyIsInN1Ym1pdCIsImxlbmd0aCIsImNsYXNzX2lkIiwiZGVzYyIsIk51bWJlciIsImltZ0xpc3QiLCJzdWNjZXNzIiwic2V0VGltZW91dCIsInd4IiwibmF2aWdhdGVCYWNrIiwiZ2V0U3RvcmFnZVN5bmMiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQUNxQkEsYzs7Ozs7Ozs7Ozs7Ozs7c01BQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLFdBQUssRUFEQTtBQUVMQyxXQUFLLEVBRkE7QUFHTEMsaUJBQVcsQ0FITjtBQUlMQyxhQUFPLENBSkY7QUFLTEMsZ0JBQVUsQ0FDUjtBQUNFQyxZQUFJLENBRE47QUFFRUMsZUFBTyxJQUZUO0FBR0VDLGlCQUFTLElBSFg7QUFJRUMsY0FBTTtBQUpSLE9BRFEsRUFPUjtBQUNFSCxZQUFJLENBRE47QUFFRUMsZUFBTyxJQUZUO0FBR0VDLGlCQUFTLEtBSFg7QUFJRUMsY0FBTTtBQUpSLE9BUFEsQ0FMTDtBQW1CTEEsWUFBTSxJQW5CRDtBQW9CTEMsZ0JBQVUsQ0FDUjtBQUNFSixZQUFJLENBRE47QUFFRUMsZUFBTztBQUZULE9BRFEsRUFLUjtBQUNFRCxZQUFJLENBRE47QUFFRUMsZUFBTztBQUZULE9BTFEsQ0FwQkw7QUE4QkxJLGtCQUFZLElBOUJQO0FBK0JMQyxpQkFBVztBQS9CTixLLFFBc0NQQyxPLEdBQVU7QUFDUkMsY0FEUSxvQkFDRUMsR0FERixFQUNPQyxLQURQLEVBQ2M7QUFDcEIsYUFBS0QsR0FBTCxFQUFVRSxNQUFWLENBQWlCRCxLQUFqQixFQUF3QixDQUF4QjtBQUNBLGFBQUtFLE1BQUw7QUFDRCxPQUpPO0FBS1JDLGtCQUxRLHdCQUtLQyxDQUxMLEVBS1E7QUFDZCxhQUFLQSxFQUFFQyxhQUFGLENBQWdCZixFQUFyQixJQUEyQmMsRUFBRUUsTUFBRixDQUFTQyxLQUFwQztBQUNBLGFBQUtMLE1BQUw7QUFDRCxPQVJPO0FBU1JNLGlCQVRRLHlCQVNNO0FBQUE7O0FBQ1osbUNBQWNDLElBQWQsQ0FBbUIsZUFBTztBQUN4QixpQkFBS3ZCLEdBQUwsQ0FBU3dCLElBQVQsQ0FBY0MsR0FBZDtBQUNBLGlCQUFLVCxNQUFMO0FBQ0QsU0FIRDtBQUlELE9BZE87QUFlUlUsWUFmUSxvQkFlQztBQUNQLFlBQUksS0FBS3hCLEtBQUwsSUFBYyxDQUFsQixFQUFxQjtBQUNuQiwrQkFBUSxTQUFSO0FBQ0E7QUFDRDtBQUNELFlBQUksS0FBS0gsR0FBTCxDQUFTNEIsTUFBVCxJQUFtQixDQUF2QixFQUEwQjtBQUN4QiwrQkFBUSxPQUFSO0FBQ0E7QUFDRDtBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhCQUFXO0FBQ1RDLG9CQUFVLEtBQUtsQixTQUFMLENBQWVOLEVBRGhCO0FBRVRHLGdCQUFNLEtBQUtBLElBRkY7QUFHVHNCLGdCQUFNLEtBQUs5QixHQUhGO0FBSVRHLGlCQUFPNEIsT0FBTyxLQUFLNUIsS0FBWixDQUpFO0FBS1Q2QixtQkFBUyxLQUFLL0I7QUFMTCxTQUFYLEVBTUd1QixJQU5ILENBTVEsZUFBTztBQUNiLGNBQUlFLElBQUkzQixJQUFKLENBQVNrQyxPQUFiLEVBQXNCO0FBQ3BCLGlDQUFRLE1BQVIsRUFBZ0IsSUFBaEI7QUFDQUMsdUJBQVcsWUFBTTtBQUNmQyxpQkFBR0MsWUFBSDtBQUNELGFBRkQsRUFFRyxJQUZIO0FBR0Q7QUFDRixTQWJEO0FBY0Q7QUEzQ08sSzs7Ozs7NkJBTEQ7QUFDUCxXQUFLekIsU0FBTCxHQUFpQndCLEdBQUdFLGNBQUgsQ0FBa0IsV0FBbEIsQ0FBakI7QUFDQSxXQUFLM0IsVUFBTCxHQUFrQnlCLEdBQUdFLGNBQUgsQ0FBa0IsWUFBbEIsQ0FBbEI7QUFDQSxXQUFLcEIsTUFBTDtBQUNEOzs7O0VBekN5Q3FCLGVBQUtDLEk7O2tCQUE1QjNDLGMiLCJmaWxlIjoicmVjb3JkQ2FzaGZsb3cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IHsgYWRkQWNjb3VudCB9IGZyb20gJy4uL2FwaS96b25lJ1xyXG5pbXBvcnQgeyBzaG93TXNnLCB1cGxvYWRJbWFnZSB9IGZyb20gJy4uL3V0aWxzL2NvbW1vbidcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgcmVjb3JkQ2FzaGZsb3cgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICforrDotKYnXHJcbiAgfVxyXG4gIGRhdGEgPSB7XHJcbiAgICBtc2c6ICcnLFxyXG4gICAgaW1nOiBbXSxcclxuICAgIHNlZW5JbmRleDogMCxcclxuICAgIG1vbmV5OiAwLFxyXG4gICAgY2FzaFR5cGU6IFtcclxuICAgICAge1xyXG4gICAgICAgIGlkOiAwLFxyXG4gICAgICAgIHRpdGxlOiAn5pS25YWlJyxcclxuICAgICAgICBjaGVja2VkOiB0cnVlLFxyXG4gICAgICAgIHR5cGU6ICdpbidcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGlkOiAxLFxyXG4gICAgICAgIHRpdGxlOiAn5pSv5Ye6JyxcclxuICAgICAgICBjaGVja2VkOiBmYWxzZSxcclxuICAgICAgICB0eXBlOiAnb3V0J1xyXG4gICAgICB9XHJcbiAgICBdLFxyXG4gICAgdHlwZTogJ2luJyxcclxuICAgIHNlZVR5cGVzOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogMCxcclxuICAgICAgICB0aXRsZTogJ+ePree6p+WPr+ingSdcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGlkOiAxLFxyXG4gICAgICAgIHRpdGxlOiAn5YWo6YOo5Y+v6KeBJ1xyXG4gICAgICB9XHJcbiAgICBdLFxyXG4gICAgbWVtYmVySW5mbzogbnVsbCxcclxuICAgIGNsYXNzSW5mbzogbnVsbFxyXG4gIH1cclxuICBvbkxvYWQoKSB7XHJcbiAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxyXG4gICAgdGhpcy5tZW1iZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nKVxyXG4gICAgdGhpcy4kYXBwbHkoKVxyXG4gIH1cclxuICBtZXRob2RzID0ge1xyXG4gICAgZGVsZXRlRm4gKGFyciwgaW5kZXgpIHtcclxuICAgICAgdGhpc1thcnJdLnNwbGljZShpbmRleCwgMSlcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSxcclxuICAgIHBpY2tlckNoYW5nZShlKSB7XHJcbiAgICAgIHRoaXNbZS5jdXJyZW50VGFyZ2V0LmlkXSA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0sXHJcbiAgICBjaG9vc2VJbWFnZSgpIHtcclxuICAgICAgdXBsb2FkSW1hZ2UoKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgdGhpcy5pbWcucHVzaChyZXMpXHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIHN1Ym1pdCgpIHtcclxuICAgICAgaWYgKHRoaXMubW9uZXkgPD0gMCkge1xyXG4gICAgICAgIHNob3dNc2coJ+ivt+i+k+WFpeaUr+WHuumHkeminScpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMubXNnLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgc2hvd01zZygn6K+36L6T5YWl5o+P6L+wJylcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICAvLyBpZiAodGhpcy5pbWcubGVuZ3RoIDw9IDApIHtcclxuICAgICAgLy8gICBzaG93TXNnKCfor7fkuIrkvKDlh63or4EnKVxyXG4gICAgICAvLyAgIHJldHVyblxyXG4gICAgICAvLyB9XHJcblxyXG4gICAgICBhZGRBY2NvdW50KHtcclxuICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXHJcbiAgICAgICAgdHlwZTogdGhpcy50eXBlLFxyXG4gICAgICAgIGRlc2M6IHRoaXMubXNnLFxyXG4gICAgICAgIG1vbmV5OiBOdW1iZXIodGhpcy5tb25leSksXHJcbiAgICAgICAgaW1nTGlzdDogdGhpcy5pbWdcclxuICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICBzaG93TXNnKCforrDotKbmiJDlip8nLCAyMDAwKVxyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjaygpXHJcbiAgICAgICAgICB9LCAyMDAwKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19