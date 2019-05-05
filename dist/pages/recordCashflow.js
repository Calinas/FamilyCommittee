'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _zone = require('./../api/zone.js');

var _actions = require('./../store/actions/index.js');

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
      preview: function preview(img, imgList) {
        (0, _common.previewImage)(img, imgList);
      },
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
            (0, _actions.setFromPublish)(true);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY29yZENhc2hmbG93LmpzIl0sIm5hbWVzIjpbInJlY29yZENhc2hmbG93IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJtc2ciLCJpbWciLCJzZWVuSW5kZXgiLCJtb25leSIsImNhc2hUeXBlIiwiaWQiLCJ0aXRsZSIsImNoZWNrZWQiLCJ0eXBlIiwic2VlVHlwZXMiLCJtZW1iZXJJbmZvIiwiY2xhc3NJbmZvIiwibWV0aG9kcyIsInByZXZpZXciLCJpbWdMaXN0IiwiZGVsZXRlRm4iLCJhcnIiLCJpbmRleCIsInNwbGljZSIsIiRhcHBseSIsInBpY2tlckNoYW5nZSIsImUiLCJjdXJyZW50VGFyZ2V0IiwiZGV0YWlsIiwidmFsdWUiLCJjaG9vc2VJbWFnZSIsInRoZW4iLCJwdXNoIiwicmVzIiwic3VibWl0IiwibGVuZ3RoIiwiY2xhc3NfaWQiLCJkZXNjIiwiTnVtYmVyIiwic3VjY2VzcyIsInNldFRpbWVvdXQiLCJ3eCIsIm5hdmlnYXRlQmFjayIsImdldFN0b3JhZ2VTeW5jIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7SUFDcUJBLGM7Ozs7Ozs7Ozs7Ozs7O3NNQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxXQUFLLEVBREE7QUFFTEMsV0FBSyxFQUZBO0FBR0xDLGlCQUFXLENBSE47QUFJTEMsYUFBTyxDQUpGO0FBS0xDLGdCQUFVLENBQ1I7QUFDRUMsWUFBSSxDQUROO0FBRUVDLGVBQU8sSUFGVDtBQUdFQyxpQkFBUyxJQUhYO0FBSUVDLGNBQU07QUFKUixPQURRLEVBT1I7QUFDRUgsWUFBSSxDQUROO0FBRUVDLGVBQU8sSUFGVDtBQUdFQyxpQkFBUyxLQUhYO0FBSUVDLGNBQU07QUFKUixPQVBRLENBTEw7QUFtQkxBLFlBQU0sSUFuQkQ7QUFvQkxDLGdCQUFVLENBQ1I7QUFDRUosWUFBSSxDQUROO0FBRUVDLGVBQU87QUFGVCxPQURRLEVBS1I7QUFDRUQsWUFBSSxDQUROO0FBRUVDLGVBQU87QUFGVCxPQUxRLENBcEJMO0FBOEJMSSxrQkFBWSxJQTlCUDtBQStCTEMsaUJBQVc7QUEvQk4sSyxRQXNDUEMsTyxHQUFVO0FBQ1JDLGFBRFEsbUJBQ0FaLEdBREEsRUFDS2EsT0FETCxFQUNjO0FBQ3BCLGtDQUFhYixHQUFiLEVBQWtCYSxPQUFsQjtBQUNELE9BSE87QUFJUkMsY0FKUSxvQkFJRUMsR0FKRixFQUlPQyxLQUpQLEVBSWM7QUFDcEIsYUFBS0QsR0FBTCxFQUFVRSxNQUFWLENBQWlCRCxLQUFqQixFQUF3QixDQUF4QjtBQUNBLGFBQUtFLE1BQUw7QUFDRCxPQVBPO0FBUVJDLGtCQVJRLHdCQVFLQyxDQVJMLEVBUVE7QUFDZCxhQUFLQSxFQUFFQyxhQUFGLENBQWdCakIsRUFBckIsSUFBMkJnQixFQUFFRSxNQUFGLENBQVNDLEtBQXBDO0FBQ0EsYUFBS0wsTUFBTDtBQUNELE9BWE87QUFZUk0saUJBWlEseUJBWU07QUFBQTs7QUFDWixtQ0FBY0MsSUFBZCxDQUFtQixlQUFPO0FBQ3hCLGlCQUFLekIsR0FBTCxDQUFTMEIsSUFBVCxDQUFjQyxHQUFkO0FBQ0EsaUJBQUtULE1BQUw7QUFDRCxTQUhEO0FBSUQsT0FqQk87QUFrQlJVLFlBbEJRLG9CQWtCQztBQUNQLFlBQUksS0FBSzFCLEtBQUwsSUFBYyxDQUFsQixFQUFxQjtBQUNuQiwrQkFBUSxTQUFSO0FBQ0E7QUFDRDtBQUNELFlBQUksS0FBS0gsR0FBTCxDQUFTOEIsTUFBVCxJQUFtQixDQUF2QixFQUEwQjtBQUN4QiwrQkFBUSxPQUFSO0FBQ0E7QUFDRDtBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQVc7QUFDVEMsb0JBQVUsS0FBS3BCLFNBQUwsQ0FBZU4sRUFEaEI7QUFFVEcsZ0JBQU0sS0FBS0EsSUFGRjtBQUdUd0IsZ0JBQU0sS0FBS2hDLEdBSEY7QUFJVEcsaUJBQU84QixPQUFPLEtBQUs5QixLQUFaLENBSkU7QUFLVFcsbUJBQVMsS0FBS2I7QUFMTCxTQUFYLEVBTUd5QixJQU5ILENBTVEsZUFBTztBQUNiLGNBQUlFLElBQUk3QixJQUFKLENBQVNtQyxPQUFiLEVBQXNCO0FBQ3BCLHlDQUFlLElBQWY7QUFDQSxpQ0FBUSxNQUFSLEVBQWdCLElBQWhCO0FBQ0FDLHVCQUFXLFlBQU07QUFDZkMsaUJBQUdDLFlBQUg7QUFDRCxhQUZELEVBRUcsSUFGSDtBQUdEO0FBQ0YsU0FkRDtBQWVEO0FBOUNPLEs7Ozs7OzZCQUxEO0FBQ1AsV0FBSzFCLFNBQUwsR0FBaUJ5QixHQUFHRSxjQUFILENBQWtCLFdBQWxCLENBQWpCO0FBQ0EsV0FBSzVCLFVBQUwsR0FBa0IwQixHQUFHRSxjQUFILENBQWtCLFlBQWxCLENBQWxCO0FBQ0EsV0FBS25CLE1BQUw7QUFDRDs7OztFQXpDeUNvQixlQUFLQyxJOztrQkFBNUI1QyxjIiwiZmlsZSI6InJlY29yZENhc2hmbG93LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHsgYWRkQWNjb3VudCB9IGZyb20gJy4uL2FwaS96b25lJ1xuaW1wb3J0IHsgc2V0RnJvbVB1Ymxpc2ggfSBmcm9tICdzdG9yZS9hY3Rpb25zJ1xuaW1wb3J0IHsgc2hvd01zZywgdXBsb2FkSW1hZ2UsIHByZXZpZXdJbWFnZSB9IGZyb20gJy4uL3V0aWxzL2NvbW1vbidcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHJlY29yZENhc2hmbG93IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICforrDotKYnXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBtc2c6ICcnLFxuICAgIGltZzogW10sXG4gICAgc2VlbkluZGV4OiAwLFxuICAgIG1vbmV5OiAwLFxuICAgIGNhc2hUeXBlOiBbXG4gICAgICB7XG4gICAgICAgIGlkOiAwLFxuICAgICAgICB0aXRsZTogJ+aUtuWFpScsXG4gICAgICAgIGNoZWNrZWQ6IHRydWUsXG4gICAgICAgIHR5cGU6ICdpbidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAxLFxuICAgICAgICB0aXRsZTogJ+aUr+WHuicsXG4gICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxuICAgICAgICB0eXBlOiAnb3V0J1xuICAgICAgfVxuICAgIF0sXG4gICAgdHlwZTogJ2luJyxcbiAgICBzZWVUeXBlczogW1xuICAgICAge1xuICAgICAgICBpZDogMCxcbiAgICAgICAgdGl0bGU6ICfnj63nuqflj6/op4EnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogMSxcbiAgICAgICAgdGl0bGU6ICflhajpg6jlj6/op4EnXG4gICAgICB9XG4gICAgXSxcbiAgICBtZW1iZXJJbmZvOiBudWxsLFxuICAgIGNsYXNzSW5mbzogbnVsbFxuICB9XG4gIG9uTG9hZCgpIHtcbiAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxuICAgIHRoaXMubWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBwcmV2aWV3KGltZywgaW1nTGlzdCkge1xuICAgICAgcHJldmlld0ltYWdlKGltZywgaW1nTGlzdClcbiAgICB9LFxuICAgIGRlbGV0ZUZuIChhcnIsIGluZGV4KSB7XG4gICAgICB0aGlzW2Fycl0uc3BsaWNlKGluZGV4LCAxKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgcGlja2VyQ2hhbmdlKGUpIHtcbiAgICAgIHRoaXNbZS5jdXJyZW50VGFyZ2V0LmlkXSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBjaG9vc2VJbWFnZSgpIHtcbiAgICAgIHVwbG9hZEltYWdlKCkudGhlbihyZXMgPT4ge1xuICAgICAgICB0aGlzLmltZy5wdXNoKHJlcylcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9LFxuICAgIHN1Ym1pdCgpIHtcbiAgICAgIGlmICh0aGlzLm1vbmV5IDw9IDApIHtcbiAgICAgICAgc2hvd01zZygn6K+36L6T5YWl5pSv5Ye66YeR6aKdJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBpZiAodGhpcy5tc2cubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgc2hvd01zZygn6K+36L6T5YWl5o+P6L+wJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICAvLyBpZiAodGhpcy5pbWcubGVuZ3RoIDw9IDApIHtcbiAgICAgIC8vICAgc2hvd01zZygn6K+35LiK5Lyg5Yet6K+BJylcbiAgICAgIC8vICAgcmV0dXJuXG4gICAgICAvLyB9XG4gICAgICBhZGRBY2NvdW50KHtcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgICAgIGRlc2M6IHRoaXMubXNnLFxuICAgICAgICBtb25leTogTnVtYmVyKHRoaXMubW9uZXkpLFxuICAgICAgICBpbWdMaXN0OiB0aGlzLmltZ1xuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgIHNldEZyb21QdWJsaXNoKHRydWUpXG4gICAgICAgICAgc2hvd01zZygn6K6w6LSm5oiQ5YqfJywgMjAwMClcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjaygpXG4gICAgICAgICAgfSwgMjAwMClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cbiJdfQ==