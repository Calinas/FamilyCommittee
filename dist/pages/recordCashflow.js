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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY29yZENhc2hmbG93LmpzIl0sIm5hbWVzIjpbInJlY29yZENhc2hmbG93IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJtc2ciLCJpbWciLCJzZWVuSW5kZXgiLCJtb25leSIsImNhc2hUeXBlIiwiaWQiLCJ0aXRsZSIsImNoZWNrZWQiLCJ0eXBlIiwic2VlVHlwZXMiLCJtZW1iZXJJbmZvIiwiY2xhc3NJbmZvIiwibWV0aG9kcyIsImRlbGV0ZUZuIiwiYXJyIiwiaW5kZXgiLCJzcGxpY2UiLCIkYXBwbHkiLCJwaWNrZXJDaGFuZ2UiLCJlIiwiY3VycmVudFRhcmdldCIsImRldGFpbCIsInZhbHVlIiwiY2hvb3NlSW1hZ2UiLCJ0aGVuIiwicHVzaCIsInJlcyIsInN1Ym1pdCIsImxlbmd0aCIsImNsYXNzX2lkIiwiZGVzYyIsIk51bWJlciIsImltZ0xpc3QiLCJzdWNjZXNzIiwic2V0VGltZW91dCIsInd4IiwibmF2aWdhdGVCYWNrIiwiZ2V0U3RvcmFnZVN5bmMiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQUNxQkEsYzs7Ozs7Ozs7Ozs7Ozs7c01BQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLFdBQUssRUFEQTtBQUVMQyxXQUFLLEVBRkE7QUFHTEMsaUJBQVcsQ0FITjtBQUlMQyxhQUFPLENBSkY7QUFLTEMsZ0JBQVUsQ0FDUjtBQUNFQyxZQUFJLENBRE47QUFFRUMsZUFBTyxJQUZUO0FBR0VDLGlCQUFTLElBSFg7QUFJRUMsY0FBTTtBQUpSLE9BRFEsRUFPUjtBQUNFSCxZQUFJLENBRE47QUFFRUMsZUFBTyxJQUZUO0FBR0VDLGlCQUFTLEtBSFg7QUFJRUMsY0FBTTtBQUpSLE9BUFEsQ0FMTDtBQW1CTEEsWUFBTSxJQW5CRDtBQW9CTEMsZ0JBQVUsQ0FDUjtBQUNFSixZQUFJLENBRE47QUFFRUMsZUFBTztBQUZULE9BRFEsRUFLUjtBQUNFRCxZQUFJLENBRE47QUFFRUMsZUFBTztBQUZULE9BTFEsQ0FwQkw7QUE4QkxJLGtCQUFZLElBOUJQO0FBK0JMQyxpQkFBVztBQS9CTixLLFFBc0NQQyxPLEdBQVU7QUFDUkMsY0FEUSxvQkFDRUMsR0FERixFQUNPQyxLQURQLEVBQ2M7QUFDcEIsYUFBS0QsR0FBTCxFQUFVRSxNQUFWLENBQWlCRCxLQUFqQixFQUF3QixDQUF4QjtBQUNBLGFBQUtFLE1BQUw7QUFDRCxPQUpPO0FBS1JDLGtCQUxRLHdCQUtLQyxDQUxMLEVBS1E7QUFDZCxhQUFLQSxFQUFFQyxhQUFGLENBQWdCZixFQUFyQixJQUEyQmMsRUFBRUUsTUFBRixDQUFTQyxLQUFwQztBQUNBLGFBQUtMLE1BQUw7QUFDRCxPQVJPO0FBU1JNLGlCQVRRLHlCQVNNO0FBQUE7O0FBQ1osbUNBQWNDLElBQWQsQ0FBbUIsZUFBTztBQUN4QixpQkFBS3ZCLEdBQUwsQ0FBU3dCLElBQVQsQ0FBY0MsR0FBZDtBQUNBLGlCQUFLVCxNQUFMO0FBQ0QsU0FIRDtBQUlELE9BZE87QUFlUlUsWUFmUSxvQkFlQztBQUNQLFlBQUksS0FBS3hCLEtBQUwsSUFBYyxDQUFsQixFQUFxQjtBQUNuQiwrQkFBUSxTQUFSO0FBQ0E7QUFDRDtBQUNELFlBQUksS0FBS0gsR0FBTCxDQUFTNEIsTUFBVCxJQUFtQixDQUF2QixFQUEwQjtBQUN4QiwrQkFBUSxPQUFSO0FBQ0E7QUFDRDtBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhCQUFXO0FBQ1RDLG9CQUFVLEtBQUtsQixTQUFMLENBQWVOLEVBRGhCO0FBRVRHLGdCQUFNLEtBQUtBLElBRkY7QUFHVHNCLGdCQUFNLEtBQUs5QixHQUhGO0FBSVRHLGlCQUFPNEIsT0FBTyxLQUFLNUIsS0FBWixDQUpFO0FBS1Q2QixtQkFBUyxLQUFLL0I7QUFMTCxTQUFYLEVBTUd1QixJQU5ILENBTVEsZUFBTztBQUNiLGNBQUlFLElBQUkzQixJQUFKLENBQVNrQyxPQUFiLEVBQXNCO0FBQ3BCLGlDQUFRLE1BQVIsRUFBZ0IsSUFBaEI7QUFDQUMsdUJBQVcsWUFBTTtBQUNmQyxpQkFBR0MsWUFBSDtBQUNELGFBRkQsRUFFRyxJQUZIO0FBR0Q7QUFDRixTQWJEO0FBY0Q7QUEzQ08sSzs7Ozs7NkJBTEQ7QUFDUCxXQUFLekIsU0FBTCxHQUFpQndCLEdBQUdFLGNBQUgsQ0FBa0IsV0FBbEIsQ0FBakI7QUFDQSxXQUFLM0IsVUFBTCxHQUFrQnlCLEdBQUdFLGNBQUgsQ0FBa0IsWUFBbEIsQ0FBbEI7QUFDQSxXQUFLcEIsTUFBTDtBQUNEOzs7O0VBekN5Q3FCLGVBQUtDLEk7O2tCQUE1QjNDLGMiLCJmaWxlIjoicmVjb3JkQ2FzaGZsb3cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgeyBhZGRBY2NvdW50IH0gZnJvbSAnLi4vYXBpL3pvbmUnXG5pbXBvcnQgeyBzaG93TXNnLCB1cGxvYWRJbWFnZSB9IGZyb20gJy4uL3V0aWxzL2NvbW1vbidcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHJlY29yZENhc2hmbG93IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICforrDotKYnXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBtc2c6ICcnLFxuICAgIGltZzogW10sXG4gICAgc2VlbkluZGV4OiAwLFxuICAgIG1vbmV5OiAwLFxuICAgIGNhc2hUeXBlOiBbXG4gICAgICB7XG4gICAgICAgIGlkOiAwLFxuICAgICAgICB0aXRsZTogJ+aUtuWFpScsXG4gICAgICAgIGNoZWNrZWQ6IHRydWUsXG4gICAgICAgIHR5cGU6ICdpbidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAxLFxuICAgICAgICB0aXRsZTogJ+aUr+WHuicsXG4gICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxuICAgICAgICB0eXBlOiAnb3V0J1xuICAgICAgfVxuICAgIF0sXG4gICAgdHlwZTogJ2luJyxcbiAgICBzZWVUeXBlczogW1xuICAgICAge1xuICAgICAgICBpZDogMCxcbiAgICAgICAgdGl0bGU6ICfnj63nuqflj6/op4EnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogMSxcbiAgICAgICAgdGl0bGU6ICflhajpg6jlj6/op4EnXG4gICAgICB9XG4gICAgXSxcbiAgICBtZW1iZXJJbmZvOiBudWxsLFxuICAgIGNsYXNzSW5mbzogbnVsbFxuICB9XG4gIG9uTG9hZCgpIHtcbiAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxuICAgIHRoaXMubWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBkZWxldGVGbiAoYXJyLCBpbmRleCkge1xuICAgICAgdGhpc1thcnJdLnNwbGljZShpbmRleCwgMSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIHBpY2tlckNoYW5nZShlKSB7XG4gICAgICB0aGlzW2UuY3VycmVudFRhcmdldC5pZF0gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgY2hvb3NlSW1hZ2UoKSB7XG4gICAgICB1cGxvYWRJbWFnZSgpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgdGhpcy5pbWcucHVzaChyZXMpXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfSxcbiAgICBzdWJtaXQoKSB7XG4gICAgICBpZiAodGhpcy5tb25leSA8PSAwKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+i+k+WFpeaUr+WHuumHkeminScpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgaWYgKHRoaXMubXNnLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+i+k+WFpeaPj+i/sCcpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgLy8gaWYgKHRoaXMuaW1nLmxlbmd0aCA8PSAwKSB7XG4gICAgICAvLyAgIHNob3dNc2coJ+ivt+S4iuS8oOWHreivgScpXG4gICAgICAvLyAgIHJldHVyblxuICAgICAgLy8gfVxuXG4gICAgICBhZGRBY2NvdW50KHtcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgICAgIGRlc2M6IHRoaXMubXNnLFxuICAgICAgICBtb25leTogTnVtYmVyKHRoaXMubW9uZXkpLFxuICAgICAgICBpbWdMaXN0OiB0aGlzLmltZ1xuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgIHNob3dNc2coJ+iusOi0puaIkOWKnycsIDIwMDApXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soKVxuICAgICAgICAgIH0sIDIwMDApXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG4iXX0=