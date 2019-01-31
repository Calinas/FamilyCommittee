'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _modal = require('./../components/modal.js');

var _modal2 = _interopRequireDefault(_modal);

var _modal3 = require('./../components/modal2.js');

var _modal4 = _interopRequireDefault(_modal3);

var _common = require('./../utils/common.js');

var _zone = require('./../api/zone.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Publish = function (_wepy$page) {
  _inherits(Publish, _wepy$page);

  function Publish() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Publish);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Publish.__proto__ || Object.getPrototypeOf(Publish)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '发布'
    }, _this.$repeat = {}, _this.$props = { "Modal": { "sureBtnText": "确认添加", "cancelBtnText": "取消", "placeholderText": "请输入您想新增的活动项目名", "xmlns:v-bind": "", "v-bind:flag.sync": "showAddActivity", "xmlns:v-on": "" }, "Modal2": { "sureBtnText": "确认", "cancelBtnText": "取消", "placeholderText": "请输入您新增收款的名目", "placeholderText2": "请输入您新增收款的金额", "v-bind:flag.sync": "showAddMoney" } }, _this.$events = { "Modal": { "v-on:cancel": "cancel", "v-on:sure": "sure" }, "Modal2": { "v-on:cancel": "cancel", "v-on:sure": "moneySureFn" } }, _this.components = {
      Modal: _modal2.default,
      Modal2: _modal4.default
    }, _this.data = {
      showAddActivity: false,
      showAddMoney: false,
      msg: '',
      img: [],
      seeType: 0,
      activityType: 0,
      activityJoinType: [{
        id: 0,
        title: '单项',
        type: 'radio'
      }, {
        id: 1,
        title: '多项',
        type: 'select'
      }],
      remindType: [{
        id: 0,
        title: '否'
      }, {
        id: 1,
        title: '是'
      }],
      type: [
      // {
      //   id: 0,
      //   title: '全部可见',
      //   type: 'all'
      // },
      {
        id: 1,
        title: '班级可见',
        type: 'class'
      }],
      typeList: {
        zone: '家长圈',
        notice: '通知',
        activity: '活动',
        money: '收款'
      },
      placeholder: '请在此发表您的感想',
      activeType: 'zone',
      activityList: [],
      canSubmit: false,
      memberInfo: null,
      classInfo: null,
      money: '',
      isRemind: 0,
      moneyList: []
    }, _this.onLoad = function (e) {
      _this.classInfo = wx.getStorageSync('classInfo');
      _this.memberInfo = wx.getStorageSync('memberInfo');
      var type = e.type;
      wx.setNavigationBarTitle({
        title: '\u53D1\u5E03' + _this.typeList[type]
      });
      if (type !== 'zone') {
        _this.placeholder = '\u8BF7\u5728\u6B64\u5F55\u5165\u60A8\u7684' + _this.typeList[type] + '\u8BE6\u60C5';
      }
      _this.activeType = type;
      _this.$apply();
    }, _this.watch = {
      msg: function msg(newVal, oldVal) {
        if (!(0, _common.isEmptyString)(newVal)) {
          this.canSubmit = true;
        }
        this.$apply();
      }
    }, _this.methods = {
      chooseImage: function chooseImage() {
        var _this2 = this;

        if (this.img.length > 9) {
          (0, _common.showMsg)('最多上传9张图');
          return;
        }
        (0, _common.uploadImage)().then(function (res) {
          _this2.img.push(res);
          _this2.$apply();
        });
      },
      submit: function submit() {
        if (!this.canSubmit) {
          (0, _common.showMsg)('请检查发布内容!');
          return;
        }
        this.checkCanSubmit();
        var commonParams = Object.assign({}, {
          class_id: this.classInfo.id,
          type: this.seenIndex,
          desc: this.msg
        });
        if (this.activeType === 'zone' || this.activeType === 'money') {
          this.saveCircles(commonParams, this.activeType);
        } else if (this.activeType === 'activity') {
          this.saveActivity(commonParams);
        } else if (this.activeType === 'notice') {
          this.saveNotice(commonParams);
        }
      },
      cancel: function cancel() {
        this.showAddActivity = false;
        this.showAddMoney = false;
        this.$apply();
      },
      sure: function sure(value) {
        var obj = {
          name: value
        };
        this.activityList.push(obj);
        this.showAddActivity = false;
        this.$apply();
      },
      moneySureFn: function moneySureFn(value1, value2) {
        var obj = {
          name: value1,
          money: value2
        };
        this.moneyList.push(obj);
        this.showAddMoney = false;
        this.$apply();
      },
      addNew: function addNew(flag) {
        this[flag] = true;
        this.$apply();
      },
      deleteFn: function deleteFn(arr, index) {
        this[arr].splice(index, 1);
        this.$apply();
      },
      bindChange: function bindChange(e) {
        this[e.currentTarget.id] = e.detail.value;
        this.$apply();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Publish, [{
    key: 'commonFn',
    value: function commonFn(res) {
      if (res.data.success) {
        (0, _common.showMsg)('发布成功', 2000);
        setTimeout(function () {
          wx.navigateBack();
        }, 2000);
      }
    }
  }, {
    key: 'checkCanSubmit',
    value: function checkCanSubmit() {
      var msg = '\u8BF7\u586B\u5199\u60A8\u7684' + this.typeList[this.activeType] + '\u63CF\u8FF0\u8BE6\u60C5';
      if ((0, _common.isEmptyString)(this.msg)) {
        (0, _common.showMsg)(msg);
        return false;
      }

      return true;
    }
  }, {
    key: 'saveCircles',
    value: function saveCircles(commonParams, type) {
      var _this3 = this;

      var params = Object.assign({}, commonParams, {
        img_url: this.img
      });
      if (type === 'money') {
        if (!this.moneyList.length) {
          (0, _common.showMsg)('请至少添加一个收款条目');
          return;
        }
        var moneyParams = Object.assign({}, params, {
          item: this.moneyList,
          type: 'student'
        });
        (0, _zone.addCollection)(moneyParams).then(function (res) {
          _this3.commonFn(res);
        });
      } else {
        (0, _zone.addCircles)(params).then(function (res) {
          _this3.commonFn(res);
        });
      }
    }
  }, {
    key: 'saveActivity',
    value: function saveActivity(commonParams) {
      var _this4 = this;

      if (!this.activityList.length) {
        (0, _common.showMsg)('请至少添加一个活动选项');
        return;
      }
      var params = Object.assign({}, commonParams, {
        selectType: this.activityJoinType[this.activityType].type,
        sign_type: 'all',
        item: this.activityList,
        img_url: this.img
      });
      (0, _zone.addActivity)(params).then(function (res) {
        _this4.commonFn(res);
      });
    }
  }, {
    key: 'saveNotice',
    value: function saveNotice(commonParams) {
      var _this5 = this;

      var params = Object.assign({}, commonParams, {
        remind: Number(this.isRemind)
      });
      (0, _zone.addNotify)(params).then(function (res) {
        _this5.commonFn(res);
      });
    }
  }]);

  return Publish;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Publish , 'pages/publish'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2guanMiXSwibmFtZXMiOlsiUHVibGlzaCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJNb2RhbCIsIk1vZGFsMiIsImRhdGEiLCJzaG93QWRkQWN0aXZpdHkiLCJzaG93QWRkTW9uZXkiLCJtc2ciLCJpbWciLCJzZWVUeXBlIiwiYWN0aXZpdHlUeXBlIiwiYWN0aXZpdHlKb2luVHlwZSIsImlkIiwidGl0bGUiLCJ0eXBlIiwicmVtaW5kVHlwZSIsInR5cGVMaXN0Iiwiem9uZSIsIm5vdGljZSIsImFjdGl2aXR5IiwibW9uZXkiLCJwbGFjZWhvbGRlciIsImFjdGl2ZVR5cGUiLCJhY3Rpdml0eUxpc3QiLCJjYW5TdWJtaXQiLCJtZW1iZXJJbmZvIiwiY2xhc3NJbmZvIiwiaXNSZW1pbmQiLCJtb25leUxpc3QiLCJvbkxvYWQiLCJlIiwid3giLCJnZXRTdG9yYWdlU3luYyIsInNldE5hdmlnYXRpb25CYXJUaXRsZSIsIiRhcHBseSIsIndhdGNoIiwibmV3VmFsIiwib2xkVmFsIiwibWV0aG9kcyIsImNob29zZUltYWdlIiwibGVuZ3RoIiwidGhlbiIsInB1c2giLCJyZXMiLCJzdWJtaXQiLCJjaGVja0NhblN1Ym1pdCIsImNvbW1vblBhcmFtcyIsIk9iamVjdCIsImFzc2lnbiIsImNsYXNzX2lkIiwic2VlbkluZGV4IiwiZGVzYyIsInNhdmVDaXJjbGVzIiwic2F2ZUFjdGl2aXR5Iiwic2F2ZU5vdGljZSIsImNhbmNlbCIsInN1cmUiLCJ2YWx1ZSIsIm9iaiIsIm5hbWUiLCJtb25leVN1cmVGbiIsInZhbHVlMSIsInZhbHVlMiIsImFkZE5ldyIsImZsYWciLCJkZWxldGVGbiIsImFyciIsImluZGV4Iiwic3BsaWNlIiwiYmluZENoYW5nZSIsImN1cnJlbnRUYXJnZXQiLCJkZXRhaWwiLCJzdWNjZXNzIiwic2V0VGltZW91dCIsIm5hdmlnYXRlQmFjayIsInBhcmFtcyIsImltZ191cmwiLCJtb25leVBhcmFtcyIsIml0ZW0iLCJjb21tb25GbiIsInNlbGVjdFR5cGUiLCJzaWduX3R5cGUiLCJyZW1pbmQiLCJOdW1iZXIiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7SUFDcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1ZDLE8sR0FBVSxFLFFBQ1hDLE0sR0FBUyxFQUFDLFNBQVEsRUFBQyxlQUFjLE1BQWYsRUFBc0IsaUJBQWdCLElBQXRDLEVBQTJDLG1CQUFrQixlQUE3RCxFQUE2RSxnQkFBZSxFQUE1RixFQUErRixvQkFBbUIsaUJBQWxILEVBQW9JLGNBQWEsRUFBakosRUFBVCxFQUE4SixVQUFTLEVBQUMsZUFBYyxJQUFmLEVBQW9CLGlCQUFnQixJQUFwQyxFQUF5QyxtQkFBa0IsYUFBM0QsRUFBeUUsb0JBQW1CLGFBQTVGLEVBQTBHLG9CQUFtQixjQUE3SCxFQUF2SyxFLFFBQ1RDLE8sR0FBVSxFQUFDLFNBQVEsRUFBQyxlQUFjLFFBQWYsRUFBd0IsYUFBWSxNQUFwQyxFQUFULEVBQXFELFVBQVMsRUFBQyxlQUFjLFFBQWYsRUFBd0IsYUFBWSxhQUFwQyxFQUE5RCxFLFFBQ1RDLFUsR0FBYTtBQUNWQyw0QkFEVTtBQUVWQztBQUZVLEssUUFJWkMsSSxHQUFPO0FBQ0xDLHVCQUFpQixLQURaO0FBRUxDLG9CQUFjLEtBRlQ7QUFHTEMsV0FBSyxFQUhBO0FBSUxDLFdBQUssRUFKQTtBQUtMQyxlQUFTLENBTEo7QUFNTEMsb0JBQWMsQ0FOVDtBQU9MQyx3QkFBa0IsQ0FDaEI7QUFDRUMsWUFBSSxDQUROO0FBRUVDLGVBQU8sSUFGVDtBQUdFQyxjQUFNO0FBSFIsT0FEZ0IsRUFNaEI7QUFDRUYsWUFBSSxDQUROO0FBRUVDLGVBQU8sSUFGVDtBQUdFQyxjQUFNO0FBSFIsT0FOZ0IsQ0FQYjtBQW1CTEMs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QyxvQkFBWSxLQUFLckUsZ0JBQUwsQ0FBc0IsS0FBS0QsWUFBM0IsRUFBeUNJLElBRFI7QUFFN0NtRSxtQkFBVyxLQUZrQztBQUc3Q0gsY0FBTSxLQUFLdkQsWUFIa0M7QUFJN0NxRCxpQkFBUyxLQUFLcEU7QUFKK0IsT0FBaEMsQ0FBZjtBQU1BLDZCQUFZbUUsTUFBWixFQUFvQmxDLElBQXBCLENBQXlCLGVBQU87QUFBRSxlQUFLc0MsUUFBTCxDQUFjcEMsR0FBZDtBQUFtQixPQUFyRDtBQUNEOzs7K0JBQ1VHLFksRUFBYztBQUFBOztBQUN2QixVQUFNNkIsU0FBUzVCLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCRixZQUFsQixFQUFnQztBQUM3Q29DLGdCQUFRQyxPQUFPLEtBQUt4RCxRQUFaO0FBRHFDLE9BQWhDLENBQWY7QUFHQSwyQkFBVWdELE1BQVYsRUFBa0JsQyxJQUFsQixDQUF1QixlQUFPO0FBQUUsZUFBS3NDLFFBQUwsQ0FBY3BDLEdBQWQ7QUFBb0IsT0FBcEQ7QUFDRDs7OztFQXRJa0N5QyxlQUFLQyxJOztrQkFBckIxRixPIiwiZmlsZSI6InB1Ymxpc2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgTW9kYWwgZnJvbSAnLi4vY29tcG9uZW50cy9tb2RhbCdcbmltcG9ydCBNb2RhbDIgZnJvbSAnLi4vY29tcG9uZW50cy9tb2RhbDInXG5pbXBvcnQgeyBzaG93TXNnLCBpc0VtcHR5U3RyaW5nLCB1cGxvYWRJbWFnZSB9IGZyb20gJy4uL3V0aWxzL2NvbW1vbidcbmltcG9ydCB7IGFkZENpcmNsZXMsIGFkZENvbGxlY3Rpb24sIGFkZEFjdGl2aXR5LCBhZGROb3RpZnkgfSBmcm9tICcuLi9hcGkvem9uZSdcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB1Ymxpc2ggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WPkeW4gydcbiAgfVxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiTW9kYWxcIjp7XCJzdXJlQnRuVGV4dFwiOlwi56Gu6K6k5re75YqgXCIsXCJjYW5jZWxCdG5UZXh0XCI6XCLlj5bmtohcIixcInBsYWNlaG9sZGVyVGV4dFwiOlwi6K+36L6T5YWl5oKo5oOz5paw5aKe55qE5rS75Yqo6aG555uu5ZCNXCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmZsYWcuc3luY1wiOlwic2hvd0FkZEFjdGl2aXR5XCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJNb2RhbDJcIjp7XCJzdXJlQnRuVGV4dFwiOlwi56Gu6K6kXCIsXCJjYW5jZWxCdG5UZXh0XCI6XCLlj5bmtohcIixcInBsYWNlaG9sZGVyVGV4dFwiOlwi6K+36L6T5YWl5oKo5paw5aKe5pS25qy+55qE5ZCN55uuXCIsXCJwbGFjZWhvbGRlclRleHQyXCI6XCLor7fovpPlhaXmgqjmlrDlop7mlLbmrL7nmoTph5Hpop1cIixcInYtYmluZDpmbGFnLnN5bmNcIjpcInNob3dBZGRNb25leVwifX07XHJcbiRldmVudHMgPSB7XCJNb2RhbFwiOntcInYtb246Y2FuY2VsXCI6XCJjYW5jZWxcIixcInYtb246c3VyZVwiOlwic3VyZVwifSxcIk1vZGFsMlwiOntcInYtb246Y2FuY2VsXCI6XCJjYW5jZWxcIixcInYtb246c3VyZVwiOlwibW9uZXlTdXJlRm5cIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICBNb2RhbCxcbiAgICBNb2RhbDJcbiAgfVxuICBkYXRhID0ge1xuICAgIHNob3dBZGRBY3Rpdml0eTogZmFsc2UsXG4gICAgc2hvd0FkZE1vbmV5OiBmYWxzZSxcbiAgICBtc2c6ICcnLFxuICAgIGltZzogW10sXG4gICAgc2VlVHlwZTogMCxcbiAgICBhY3Rpdml0eVR5cGU6IDAsXG4gICAgYWN0aXZpdHlKb2luVHlwZTogW1xuICAgICAge1xuICAgICAgICBpZDogMCxcbiAgICAgICAgdGl0bGU6ICfljZXpobknLFxuICAgICAgICB0eXBlOiAncmFkaW8nXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogMSxcbiAgICAgICAgdGl0bGU6ICflpJrpobknLFxuICAgICAgICB0eXBlOiAnc2VsZWN0J1xuICAgICAgfVxuICAgIF0sXG4gICAgcmVtaW5kVHlwZTogW1xuICAgICAge1xuICAgICAgICBpZDogMCxcbiAgICAgICAgdGl0bGU6ICflkKYnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogMSxcbiAgICAgICAgdGl0bGU6ICfmmK8nXG4gICAgICB9XG4gICAgXSxcbiAgICB0eXBlOiBbXG4gICAgICAvLyB7XG4gICAgICAvLyAgIGlkOiAwLFxuICAgICAgLy8gICB0aXRsZTogJ+WFqOmDqOWPr+ingScsXG4gICAgICAvLyAgIHR5cGU6ICdhbGwnXG4gICAgICAvLyB9LFxuICAgICAge1xuICAgICAgICBpZDogMSxcbiAgICAgICAgdGl0bGU6ICfnj63nuqflj6/op4EnLFxuICAgICAgICB0eXBlOiAnY2xhc3MnXG4gICAgICB9XG4gICAgXSxcbiAgICB0eXBlTGlzdDoge1xuICAgICAgem9uZTogJ+WutumVv+WciCcsXG4gICAgICBub3RpY2U6ICfpgJrnn6UnLFxuICAgICAgYWN0aXZpdHk6ICfmtLvliqgnLFxuICAgICAgbW9uZXk6ICfmlLbmrL4nXG4gICAgfSxcbiAgICBwbGFjZWhvbGRlcjogJ+ivt+WcqOatpOWPkeihqOaCqOeahOaEn+aDsycsXG4gICAgYWN0aXZlVHlwZTogJ3pvbmUnLFxuICAgIGFjdGl2aXR5TGlzdDogW10sXG4gICAgY2FuU3VibWl0OiBmYWxzZSxcbiAgICBtZW1iZXJJbmZvOiBudWxsLFxuICAgIGNsYXNzSW5mbzogbnVsbCxcbiAgICBtb25leTogJycsXG4gICAgaXNSZW1pbmQ6IDAsXG4gICAgbW9uZXlMaXN0OiBbXVxuICB9XG4gIGNvbW1vbkZuKHJlcykge1xuICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICBzaG93TXNnKCflj5HluIPmiJDlip8nLCAyMDAwKVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHd4Lm5hdmlnYXRlQmFjaygpXG4gICAgICB9LCAyMDAwKVxuICAgIH1cbiAgfVxuICBvbkxvYWQgPSAoZSkgPT4ge1xuICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXG4gICAgdGhpcy5tZW1iZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nKVxuICAgIGNvbnN0IHR5cGUgPSBlLnR5cGVcbiAgICB3eC5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe1xuICAgICAgdGl0bGU6IGDlj5HluIMke3RoaXMudHlwZUxpc3RbdHlwZV19YFxuICAgIH0pXG4gICAgaWYgKHR5cGUgIT09ICd6b25lJykge1xuICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IGDor7flnKjmraTlvZXlhaXmgqjnmoQke3RoaXMudHlwZUxpc3RbdHlwZV196K+m5oOFYFxuICAgIH1cbiAgICB0aGlzLmFjdGl2ZVR5cGUgPSB0eXBlXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIGNoZWNrQ2FuU3VibWl0KCkge1xuICAgIGNvbnN0IG1zZyA9IGDor7floavlhpnmgqjnmoQke3RoaXMudHlwZUxpc3RbdGhpcy5hY3RpdmVUeXBlXX3mj4/ov7Dor6bmg4VgXG4gICAgaWYgKGlzRW1wdHlTdHJpbmcodGhpcy5tc2cpKSB7XG4gICAgICBzaG93TXNnKG1zZylcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlXG4gIH1cbiAgc2F2ZUNpcmNsZXMoY29tbW9uUGFyYW1zLCB0eXBlKSB7XG4gICAgY29uc3QgcGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zLCB7XG4gICAgICBpbWdfdXJsOiB0aGlzLmltZ1xuICAgIH0pXG4gICAgaWYgKHR5cGUgPT09ICdtb25leScpIHtcbiAgICAgIGlmICghdGhpcy5tb25leUxpc3QubGVuZ3RoKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+iHs+Wwkea3u+WKoOS4gOS4quaUtuasvuadoeebricpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgY29uc3QgbW9uZXlQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBwYXJhbXMsIHtcbiAgICAgICAgaXRlbTogdGhpcy5tb25leUxpc3QsXG4gICAgICAgIHR5cGU6ICdzdHVkZW50J1xuICAgICAgfSlcbiAgICAgIGFkZENvbGxlY3Rpb24obW9uZXlQYXJhbXMpLnRoZW4ocmVzID0+IHsgdGhpcy5jb21tb25GbihyZXMpIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGFkZENpcmNsZXMocGFyYW1zKS50aGVuKHJlcyA9PiB7IHRoaXMuY29tbW9uRm4ocmVzKSB9KVxuICAgIH1cbiAgfVxuICBzYXZlQWN0aXZpdHkoY29tbW9uUGFyYW1zKSB7XG4gICAgaWYgKCF0aGlzLmFjdGl2aXR5TGlzdC5sZW5ndGgpIHtcbiAgICAgIHNob3dNc2coJ+ivt+iHs+Wwkea3u+WKoOS4gOS4qua0u+WKqOmAiemhuScpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgcGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zLCB7XG4gICAgICBzZWxlY3RUeXBlOiB0aGlzLmFjdGl2aXR5Sm9pblR5cGVbdGhpcy5hY3Rpdml0eVR5cGVdLnR5cGUsXG4gICAgICBzaWduX3R5cGU6ICdhbGwnLFxuICAgICAgaXRlbTogdGhpcy5hY3Rpdml0eUxpc3QsXG4gICAgICBpbWdfdXJsOiB0aGlzLmltZ1xuICAgIH0pXG4gICAgYWRkQWN0aXZpdHkocGFyYW1zKS50aGVuKHJlcyA9PiB7IHRoaXMuY29tbW9uRm4ocmVzKX0pXG4gIH1cbiAgc2F2ZU5vdGljZShjb21tb25QYXJhbXMpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMsIHtcbiAgICAgIHJlbWluZDogTnVtYmVyKHRoaXMuaXNSZW1pbmQpXG4gICAgfSlcbiAgICBhZGROb3RpZnkocGFyYW1zKS50aGVuKHJlcyA9PiB7IHRoaXMuY29tbW9uRm4ocmVzKSB9KVxuICB9XG4gIHdhdGNoID0ge1xuICAgIG1zZyAobmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgIGlmICghaXNFbXB0eVN0cmluZyhuZXdWYWwpKSB7XG4gICAgICAgIHRoaXMuY2FuU3VibWl0ID0gdHJ1ZVxuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuICBtZXRob2RzID0ge1xuICAgIGNob29zZUltYWdlKCkge1xuICAgICAgaWYgKHRoaXMuaW1nLmxlbmd0aCA+IDkpIHtcbiAgICAgICAgc2hvd01zZygn5pyA5aSa5LiK5LygOeW8oOWbvicpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdXBsb2FkSW1hZ2UoKS50aGVuKHJlcyA9PiB7XG4gICAgICAgIHRoaXMuaW1nLnB1c2gocmVzKVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH0sXG4gICAgc3VibWl0KCkge1xuICAgICAgaWYgKCF0aGlzLmNhblN1Ym1pdCkge1xuICAgICAgICBzaG93TXNnKCfor7fmo4Dmn6Xlj5HluIPlhoXlrrkhJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB0aGlzLmNoZWNrQ2FuU3VibWl0KClcbiAgICAgIGNvbnN0IGNvbW1vblBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIHtcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgICB0eXBlOiB0aGlzLnNlZW5JbmRleCxcbiAgICAgICAgZGVzYzogdGhpcy5tc2dcbiAgICAgIH0pXG4gICAgICBpZiAodGhpcy5hY3RpdmVUeXBlID09PSAnem9uZScgfHwgdGhpcy5hY3RpdmVUeXBlID09PSAnbW9uZXknKSB7XG4gICAgICAgIHRoaXMuc2F2ZUNpcmNsZXMoY29tbW9uUGFyYW1zLCB0aGlzLmFjdGl2ZVR5cGUpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuYWN0aXZlVHlwZSA9PT0gJ2FjdGl2aXR5Jykge1xuICAgICAgICB0aGlzLnNhdmVBY3Rpdml0eShjb21tb25QYXJhbXMpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuYWN0aXZlVHlwZSA9PT0gJ25vdGljZScpIHtcbiAgICAgICAgdGhpcy5zYXZlTm90aWNlKGNvbW1vblBhcmFtcylcbiAgICAgIH1cbiAgICB9LFxuICAgIGNhbmNlbCgpIHtcbiAgICAgIHRoaXMuc2hvd0FkZEFjdGl2aXR5ID0gZmFsc2VcbiAgICAgIHRoaXMuc2hvd0FkZE1vbmV5ID0gZmFsc2VcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIHN1cmUodmFsdWUpIHtcbiAgICAgIGNvbnN0IG9iaiA9IHtcbiAgICAgICAgbmFtZTogdmFsdWVcbiAgICAgIH1cbiAgICAgIHRoaXMuYWN0aXZpdHlMaXN0LnB1c2gob2JqKVxuICAgICAgdGhpcy5zaG93QWRkQWN0aXZpdHkgPSBmYWxzZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgbW9uZXlTdXJlRm4odmFsdWUxLCB2YWx1ZTIpIHtcbiAgICAgIGNvbnN0IG9iaiA9IHtcbiAgICAgICAgbmFtZTogdmFsdWUxLFxuICAgICAgICBtb25leTogdmFsdWUyXG4gICAgICB9XG4gICAgICB0aGlzLm1vbmV5TGlzdC5wdXNoKG9iailcbiAgICAgIHRoaXMuc2hvd0FkZE1vbmV5ID0gZmFsc2VcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGFkZE5ldyhmbGFnKSB7XG4gICAgICB0aGlzW2ZsYWddID0gdHJ1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgZGVsZXRlRm4gKGFyciwgaW5kZXgpIHtcbiAgICAgIHRoaXNbYXJyXS5zcGxpY2UoaW5kZXgsIDEpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBiaW5kQ2hhbmdlKGUpIHtcbiAgICAgIHRoaXNbZS5jdXJyZW50VGFyZ2V0LmlkXSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG59XG4iXX0=