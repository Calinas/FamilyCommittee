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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY29yZENhc2hmbG93LmpzIl0sIm5hbWVzIjpbInJlY29yZENhc2hmbG93IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJtc2ciLCJpbWciLCJzZWVuSW5kZXgiLCJtb25leSIsImNhc2hUeXBlIiwiaWQiLCJ0aXRsZSIsImNoZWNrZWQiLCJ0eXBlIiwic2VlVHlwZXMiLCJtZW1iZXJJbmZvIiwiY2xhc3NJbmZvIiwibWV0aG9kcyIsImRlbGV0ZUZuIiwiYXJyIiwiaW5kZXgiLCJzcGxpY2UiLCIkYXBwbHkiLCJwaWNrZXJDaGFuZ2UiLCJlIiwiY3VycmVudFRhcmdldCIsImRldGFpbCIsInZhbHVlIiwiY2hvb3NlSW1hZ2UiLCJ0aGVuIiwicHVzaCIsInJlcyIsInN1Ym1pdCIsImxlbmd0aCIsImNsYXNzX2lkIiwiZGVzYyIsIk51bWJlciIsImltZ0xpc3QiLCJzdWNjZXNzIiwic2V0VGltZW91dCIsInd4IiwibmF2aWdhdGVCYWNrIiwiZ2V0U3RvcmFnZVN5bmMiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQUNxQkEsYzs7Ozs7Ozs7Ozs7Ozs7c01BQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLFdBQUssRUFEQTtBQUVMQyxXQUFLLEVBRkE7QUFHTEMsaUJBQVcsQ0FITjtBQUlMQyxhQUFPLENBSkY7QUFLTEMsZ0JBQVUsQ0FDUjtBQUNFQyxZQUFJLENBRE47QUFFRUMsZUFBTyxJQUZUO0FBR0VDLGlCQUFTLElBSFg7QUFJRUMsY0FBTTtBQUpSLE9BRFEsRUFPUjtBQUNFSCxZQUFJLENBRE47QUFFRUMsZUFBTyxJQUZUO0FBR0VDLGlCQUFTLEtBSFg7QUFJRUMsY0FBTTtBQUpSLE9BUFEsQ0FMTDtBQW1CTEEsWUFBTSxJQW5CRDtBQW9CTEMsZ0JBQVUsQ0FDUjtBQUNFSixZQUFJLENBRE47QUFFRUMsZUFBTztBQUZULE9BRFEsRUFLUjtBQUNFRCxZQUFJLENBRE47QUFFRUMsZUFBTztBQUZULE9BTFEsQ0FwQkw7QUE4QkxJLGtCQUFZLElBOUJQO0FBK0JMQyxpQkFBVztBQS9CTixLLFFBc0NQQyxPLEdBQVU7QUFDUkMsY0FEUSxvQkFDRUMsR0FERixFQUNPQyxLQURQLEVBQ2M7QUFDcEIsYUFBS0QsR0FBTCxFQUFVRSxNQUFWLENBQWlCRCxLQUFqQixFQUF3QixDQUF4QjtBQUNBLGFBQUtFLE1BQUw7QUFDRCxPQUpPO0FBS1JDLGtCQUxRLHdCQUtLQyxDQUxMLEVBS1E7QUFDZCxhQUFLQSxFQUFFQyxhQUFGLENBQWdCZixFQUFyQixJQUEyQmMsRUFBRUUsTUFBRixDQUFTQyxLQUFwQztBQUNBLGFBQUtMLE1BQUw7QUFDRCxPQVJPO0FBU1JNLGlCQVRRLHlCQVNNO0FBQUE7O0FBQ1osbUNBQWNDLElBQWQsQ0FBbUIsZUFBTztBQUN4QixpQkFBS3ZCLEdBQUwsQ0FBU3dCLElBQVQsQ0FBY0MsR0FBZDtBQUNBLGlCQUFLVCxNQUFMO0FBQ0QsU0FIRDtBQUlELE9BZE87QUFlUlUsWUFmUSxvQkFlQztBQUNQLFlBQUksS0FBS3hCLEtBQUwsSUFBYyxDQUFsQixFQUFxQjtBQUNuQiwrQkFBUSxTQUFSO0FBQ0E7QUFDRDtBQUNELFlBQUksS0FBS0gsR0FBTCxDQUFTNEIsTUFBVCxJQUFtQixDQUF2QixFQUEwQjtBQUN4QiwrQkFBUSxPQUFSO0FBQ0E7QUFDRDtBQUNELFlBQUksS0FBSzNCLEdBQUwsQ0FBUzJCLE1BQVQsSUFBbUIsQ0FBdkIsRUFBMEI7QUFDeEIsK0JBQVEsT0FBUjtBQUNBO0FBQ0Q7O0FBRUQsOEJBQVc7QUFDVEMsb0JBQVUsS0FBS2xCLFNBQUwsQ0FBZU4sRUFEaEI7QUFFVEcsZ0JBQU0sS0FBS0EsSUFGRjtBQUdUc0IsZ0JBQU0sS0FBSzlCLEdBSEY7QUFJVEcsaUJBQU80QixPQUFPLEtBQUs1QixLQUFaLENBSkU7QUFLVDZCLG1CQUFTLEtBQUsvQjtBQUxMLFNBQVgsRUFNR3VCLElBTkgsQ0FNUSxlQUFPO0FBQ2IsY0FBSUUsSUFBSTNCLElBQUosQ0FBU2tDLE9BQWIsRUFBc0I7QUFDcEIsaUNBQVEsTUFBUixFQUFnQixJQUFoQjtBQUNBQyx1QkFBVyxZQUFNO0FBQ2ZDLGlCQUFHQyxZQUFIO0FBQ0QsYUFGRCxFQUVHLElBRkg7QUFHRDtBQUNGLFNBYkQ7QUFjRDtBQTNDTyxLOzs7Ozs2QkFMRDtBQUNQLFdBQUt6QixTQUFMLEdBQWlCd0IsR0FBR0UsY0FBSCxDQUFrQixXQUFsQixDQUFqQjtBQUNBLFdBQUszQixVQUFMLEdBQWtCeUIsR0FBR0UsY0FBSCxDQUFrQixZQUFsQixDQUFsQjtBQUNBLFdBQUtwQixNQUFMO0FBQ0Q7Ozs7RUF6Q3lDcUIsZUFBS0MsSTs7a0JBQTVCM0MsYyIsImZpbGUiOiJyZWNvcmRDYXNoZmxvdy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7IGFkZEFjY291bnQgfSBmcm9tICcuLi9hcGkvem9uZSdcbmltcG9ydCB7IHNob3dNc2csIHVwbG9hZEltYWdlIH0gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgcmVjb3JkQ2FzaGZsb3cgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+iusOi0pidcbiAgfVxuICBkYXRhID0ge1xuICAgIG1zZzogJycsXG4gICAgaW1nOiBbXSxcbiAgICBzZWVuSW5kZXg6IDAsXG4gICAgbW9uZXk6IDAsXG4gICAgY2FzaFR5cGU6IFtcbiAgICAgIHtcbiAgICAgICAgaWQ6IDAsXG4gICAgICAgIHRpdGxlOiAn5pS25YWlJyxcbiAgICAgICAgY2hlY2tlZDogdHJ1ZSxcbiAgICAgICAgdHlwZTogJ2luJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6IDEsXG4gICAgICAgIHRpdGxlOiAn5pSv5Ye6JyxcbiAgICAgICAgY2hlY2tlZDogZmFsc2UsXG4gICAgICAgIHR5cGU6ICdvdXQnXG4gICAgICB9XG4gICAgXSxcbiAgICB0eXBlOiAnaW4nLFxuICAgIHNlZVR5cGVzOiBbXG4gICAgICB7XG4gICAgICAgIGlkOiAwLFxuICAgICAgICB0aXRsZTogJ+ePree6p+WPr+ingSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAxLFxuICAgICAgICB0aXRsZTogJ+WFqOmDqOWPr+ingSdcbiAgICAgIH1cbiAgICBdLFxuICAgIG1lbWJlckluZm86IG51bGwsXG4gICAgY2xhc3NJbmZvOiBudWxsXG4gIH1cbiAgb25Mb2FkKCkge1xuICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXG4gICAgdGhpcy5tZW1iZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nKVxuICAgIHRoaXMuJGFwcGx5KClcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIGRlbGV0ZUZuIChhcnIsIGluZGV4KSB7XG4gICAgICB0aGlzW2Fycl0uc3BsaWNlKGluZGV4LCAxKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgcGlja2VyQ2hhbmdlKGUpIHtcbiAgICAgIHRoaXNbZS5jdXJyZW50VGFyZ2V0LmlkXSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBjaG9vc2VJbWFnZSgpIHtcbiAgICAgIHVwbG9hZEltYWdlKCkudGhlbihyZXMgPT4ge1xuICAgICAgICB0aGlzLmltZy5wdXNoKHJlcylcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9LFxuICAgIHN1Ym1pdCgpIHtcbiAgICAgIGlmICh0aGlzLm1vbmV5IDw9IDApIHtcbiAgICAgICAgc2hvd01zZygn6K+36L6T5YWl5pSv5Ye66YeR6aKdJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBpZiAodGhpcy5tc2cubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgc2hvd01zZygn6K+36L6T5YWl5o+P6L+wJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBpZiAodGhpcy5pbWcubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgc2hvd01zZygn6K+35LiK5Lyg5Yet6K+BJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGFkZEFjY291bnQoe1xuICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXG4gICAgICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICAgICAgZGVzYzogdGhpcy5tc2csXG4gICAgICAgIG1vbmV5OiBOdW1iZXIodGhpcy5tb25leSksXG4gICAgICAgIGltZ0xpc3Q6IHRoaXMuaW1nXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgc2hvd01zZygn6K6w6LSm5oiQ5YqfJywgMjAwMClcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjaygpXG4gICAgICAgICAgfSwgMjAwMClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cbiJdfQ==