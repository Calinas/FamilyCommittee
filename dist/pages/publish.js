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

    var _temp, _this2, _ret;

    _classCallCheck(this, Publish);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Publish.__proto__ || Object.getPrototypeOf(Publish)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      navigationBarTitleText: '发布'
    }, _this2.$repeat = {}, _this2.$props = { "Modal": { "sureBtnText": "确认添加", "cancelBtnText": "取消", "placeholderText": "请输入您想新增的活动项目名", "xmlns:v-bind": "", "v-bind:flag.sync": "showAddActivity", "xmlns:v-on": "" }, "Modal2": { "sureBtnText": "确认", "cancelBtnText": "取消", "placeholderText": "收款选项名", "placeholderText2": "金额", "v-bind:flag.sync": "showAddMoney" } }, _this2.$events = { "Modal": { "v-on:cancel": "cancel", "v-on:sure": "sure" }, "Modal2": { "v-on:cancel": "cancel", "v-on:sure": "moneySureFn" } }, _this2.components = {
      Modal: _modal2.default,
      Modal2: _modal4.default
    }, _this2.data = {
      showAddActivity: false,
      showAddMoney: false,
      msg: '',
      img: [],
      seeType: 0,
      activityType: 0,
      activityJoinType: [{
        id: 0,
        title: '单选',
        type: 'radio'
      }, {
        id: 1,
        title: '多选',
        type: 'select'
      }],
      remindType: [{
        id: 0,
        title: '否'
      }, {
        id: 1,
        title: '是'
      }],
      type: [{
        id: 1,
        title: '班级可见',
        type: 'class'
      }, {
        id: 0,
        title: '全部可见',
        type: 'all'
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
      moneyList: [],
      maxPhotoCount: 9,
      uploads: []
    }, _this2.onLoad = function (e) {
      _this2.classInfo = wx.getStorageSync('classInfo');
      _this2.memberInfo = wx.getStorageSync('memberInfo');
      var type = e.type;
      wx.setNavigationBarTitle({
        title: '\u53D1\u5E03' + _this2.typeList[type]
      });
      if (type !== 'zone') {
        _this2.placeholder = '\u8BF7\u5728\u6B64\u5F55\u5165\u60A8\u7684' + _this2.typeList[type] + '\u8BE6\u60C5';
      }
      _this2.activeType = type;
      _this2.$apply();
    }, _this2.watch = {
      msg: function msg(newVal, oldVal) {
        if (!(0, _common.isEmptyString)(newVal)) {
          this.canSubmit = true;
        }
        this.$apply();
      }
    }, _this2.methods = {
      chooseImage: function chooseImage() {
        var _this3 = this;

        if (this.img.length > this.maxPhotoCount) {
          (0, _common.showMsg)('最多上传9张图');
          return;
        }
        var _this = this;
        wx.chooseImage({
          count: this.maxPhotoCount,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success: function success(res) {
            if (_this3.img.length + res.tempFilePaths.length > _this3.maxPhotoCount) {
              wx.showToast({
                title: '最多只能选择' + _this3.maxPhotoCount + '张图片',
                icon: 'none'
              });
            }
            res.tempFilePaths.forEach(function (path) {
              var upload = {};
              upload.path = path;
              upload.error = false;
              upload.uploadProgress = wx.uploadFile({
                url: 'https://test.ctjwh.com/api/v1/file/uploadPic',
                filePath: path,
                formData: {
                  'member_id': _this3.memberInfo.member_id,
                  'member_token': _this3.memberInfo.member_token,
                  'folder': 'committee'
                },
                name: 'file',
                success: function success(res) {
                  var data = JSON.parse(res.data);
                  var url = data.data.file_url;
                  _this.img.push(url);
                  _this.$apply();
                }
              });
              upload.uploadProgress.onProgressUpdate(function (res) {
                upload.progress = res.progress;
              });
              _this.uploads.push(upload);
              _this.$apply();
            });
          }
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
        if (this.checkRepeat(value, this.activityList)) {
          (0, _common.showMsg)('请不要输入重复的活动项目');
          return;
        }
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
    }, _temp), _possibleConstructorReturn(_this2, _ret);
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
      var _this4 = this;

      var params = Object.assign({}, commonParams, {
        img_url: this.img
      });
      var circleParams = Object.assign({}, params, {
        see_type: this.type[this.seeType].type
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
          _this4.commonFn(res);
        });
      } else {
        (0, _zone.addCircles)(circleParams).then(function (res) {
          _this4.commonFn(res);
        });
      }
    }
  }, {
    key: 'saveActivity',
    value: function saveActivity(commonParams) {
      var _this5 = this;

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
        _this5.commonFn(res);
      });
    }
  }, {
    key: 'saveNotice',
    value: function saveNotice(commonParams) {
      var _this6 = this;

      var params = Object.assign({}, commonParams, {
        remind: Number(this.isRemind)
      });
      (0, _zone.addNotify)(params).then(function (res) {
        _this6.commonFn(res);
      });
    }
  }, {
    key: 'checkRepeat',
    value: function checkRepeat(value, arr) {
      var retValue = false;
      for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i].name === value) {
          retValue = true;
          break;
        }
        retValue = false;
      }
      return retValue;
    }
  }]);

  return Publish;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Publish , 'pages/publish'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2guanMiXSwibmFtZXMiOlsiUHVibGlzaCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJNb2RhbCIsIk1vZGFsMiIsImRhdGEiLCJzaG93QWRkQWN0aXZpdHkiLCJzaG93QWRkTW9uZXkiLCJtc2ciLCJpbWciLCJzZWVUeXBlIiwiYWN0aXZpdHlUeXBlIiwiYWN0aXZpdHlKb2luVHlwZSIsImlkIiwidGl0bGUiLCJ0eXBlIiwicmVtaW5kVHlwZSIsInR5cGVMaXN0Iiwiem9uZSIsIm5vdGljZSIsImFjdGl2aXR5IiwibW9uZXkiLCJwbGFjZWhvbGRlciIsImFjdGl2ZVR5cGUiLCJhY3Rpdml0eUxpc3QiLCJjYW5TdWJtaXQiLCJtZW1iZXJJbmZvIiwiY2xhc3NJbmZvIiwiaXNSZW1pbmQiLCJtb25leUxpc3QiLCJtYXhQaG90b0NvdW50IiwidXBsb2FkcyIsIm9uTG9hZCIsImUiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwiJGFwcGx5Iiwid2F0Y2giLCJuZXdWYWwiLCJvbGRWYWwiLCJtZXRob2RzIiwiY2hvb3NlSW1hZ2UiLCJsZW5ndGgiLCJfdGhpcyIsImNvdW50Iiwic2l6ZVR5cGUiLCJzb3VyY2VUeXBlIiwic3VjY2VzcyIsInJlcyIsInRlbXBGaWxlUGF0aHMiLCJzaG93VG9hc3QiLCJpY29uIiwiZm9yRWFjaCIsInVwbG9hZCIsInBhdGgiLCJlcnJvciIsInVwbG9hZFByb2dyZXNzIiwidXBsb2FkRmlsZSIsInVybCIsImZpbGVQYXRoIiwiZm9ybURhdGEiLCJtZW1iZXJfaWQiLCJtZW1iZXJfdG9rZW4iLCJuYW1lIiwiSlNPTiIsInBhcnNlIiwiZmlsZV91cmwiLCJwdXNoIiwib25Qcm9ncmVzc1VwZGF0ZSIsInByb2dyZXNzIiwic3VibWl0IiwiY2hlY2tDYW5TdWJtaXQiLCJjb21tb25QYXJhbXMiLCJPYmplY3QiLCJhc3NpZ24iLCJjbGFzc19pZCIsInNlZW5JbmRleCIsImRlc2MiLCJzYXZlQ2lyY2xlcyIsInNhdmVBY3Rpdml0eSIsInNhdmVOb3RpY2UiLCJjYW5jZWwiLCJzdXJlIiwidmFsdWUiLCJjaGVja1JlcGVhdCIsIm9iaiIsIm1vbmV5U3VyZUZuIiwidmFsdWUxIiwidmFsdWUyIiwiYWRkTmV3IiwiZmxhZyIsImRlbGV0ZUZuIiwiYXJyIiwiaW5kZXgiLCJzcGxpY2UiLCJiaW5kQ2hhbmdlIiwiY3VycmVudFRhcmdldCIsImRldGFpbCIsInNldFRpbWVvdXQiLCJuYXZpZ2F0ZUJhY2siLCJwYXJhbXMiLCJpbWdfdXJsIiwiY2lyY2xlUGFyYW1zIiwic2VlX3R5cGUiLCJtb25leVBhcmFtcyIsIml0ZW0iLCJ0aGVuIiwiY29tbW9uRm4iLCJzZWxlY3RUeXBlIiwic2lnbl90eXBlIiwicmVtaW5kIiwiTnVtYmVyIiwicmV0VmFsdWUiLCJpIiwibGVuIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBQ3FCQSxPOzs7Ozs7Ozs7Ozs7OzsyTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdWQyxPLEdBQVUsRSxTQUNYQyxNLEdBQVMsRUFBQyxTQUFRLEVBQUMsZUFBYyxNQUFmLEVBQXNCLGlCQUFnQixJQUF0QyxFQUEyQyxtQkFBa0IsZUFBN0QsRUFBNkUsZ0JBQWUsRUFBNUYsRUFBK0Ysb0JBQW1CLGlCQUFsSCxFQUFvSSxjQUFhLEVBQWpKLEVBQVQsRUFBOEosVUFBUyxFQUFDLGVBQWMsSUFBZixFQUFvQixpQkFBZ0IsSUFBcEMsRUFBeUMsbUJBQWtCLE9BQTNELEVBQW1FLG9CQUFtQixJQUF0RixFQUEyRixvQkFBbUIsY0FBOUcsRUFBdkssRSxTQUNUQyxPLEdBQVUsRUFBQyxTQUFRLEVBQUMsZUFBYyxRQUFmLEVBQXdCLGFBQVksTUFBcEMsRUFBVCxFQUFxRCxVQUFT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QUFFLGVBQUtDLFFBQUwsQ0FBYzNELEdBQWQ7QUFBbUIsT0FBckQ7QUFDRDs7OytCQUNVd0IsWSxFQUFjO0FBQUE7O0FBQ3ZCLFVBQU00QixTQUFTM0IsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JGLFlBQWxCLEVBQWdDO0FBQzdDc0MsZ0JBQVFDLE9BQU8sS0FBS3BGLFFBQVo7QUFEcUMsT0FBaEMsQ0FBZjtBQUdBLDJCQUFVeUUsTUFBVixFQUFrQk0sSUFBbEIsQ0FBdUIsZUFBTztBQUFFLGVBQUtDLFFBQUwsQ0FBYzNELEdBQWQ7QUFBb0IsT0FBcEQ7QUFDRDs7O2dDQUNXbUMsSyxFQUFPUyxHLEVBQUs7QUFDdEIsVUFBSW9CLFdBQVcsS0FBZjtBQUNBLFdBQUssSUFBSUMsSUFBSSxDQUFSLEVBQVdDLE1BQU10QixJQUFJbEQsTUFBMUIsRUFBa0N1RSxJQUFJQyxHQUF0QyxFQUEyQ0QsR0FBM0MsRUFBZ0Q7QUFDOUMsWUFBSXJCLElBQUlxQixDQUFKLEVBQU9sRCxJQUFQLEtBQWdCb0IsS0FBcEIsRUFBMkI7QUFDekI2QixxQkFBVyxJQUFYO0FBQ0E7QUFDRDtBQUNEQSxtQkFBVyxLQUFYO0FBQ0Q7QUFDRCxhQUFPQSxRQUFQO0FBQ0Q7Ozs7RUF0SmtDRyxlQUFLQyxJOztrQkFBckJ6SCxPIiwiZmlsZSI6InB1Ymxpc2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IE1vZGFsIGZyb20gJy4uL2NvbXBvbmVudHMvbW9kYWwnXHJcbmltcG9ydCBNb2RhbDIgZnJvbSAnLi4vY29tcG9uZW50cy9tb2RhbDInXHJcbmltcG9ydCB7IHNob3dNc2csIGlzRW1wdHlTdHJpbmcsIHVwbG9hZEltYWdlIH0gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xyXG5pbXBvcnQgeyBhZGRDaXJjbGVzLCBhZGRDb2xsZWN0aW9uLCBhZGRBY3Rpdml0eSwgYWRkTm90aWZ5IH0gZnJvbSAnLi4vYXBpL3pvbmUnXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB1Ymxpc2ggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflj5HluIMnXHJcbiAgfVxyXG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJNb2RhbFwiOntcInN1cmVCdG5UZXh0XCI6XCLnoa7orqTmt7vliqBcIixcImNhbmNlbEJ0blRleHRcIjpcIuWPlua2iFwiLFwicGxhY2Vob2xkZXJUZXh0XCI6XCLor7fovpPlhaXmgqjmg7PmlrDlop7nmoTmtLvliqjpobnnm67lkI1cIixcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6ZmxhZy5zeW5jXCI6XCJzaG93QWRkQWN0aXZpdHlcIixcInhtbG5zOnYtb25cIjpcIlwifSxcIk1vZGFsMlwiOntcInN1cmVCdG5UZXh0XCI6XCLnoa7orqRcIixcImNhbmNlbEJ0blRleHRcIjpcIuWPlua2iFwiLFwicGxhY2Vob2xkZXJUZXh0XCI6XCLmlLbmrL7pgInpobnlkI1cIixcInBsYWNlaG9sZGVyVGV4dDJcIjpcIumHkeminVwiLFwidi1iaW5kOmZsYWcuc3luY1wiOlwic2hvd0FkZE1vbmV5XCJ9fTtcclxuJGV2ZW50cyA9IHtcIk1vZGFsXCI6e1widi1vbjpjYW5jZWxcIjpcImNhbmNlbFwiLFwidi1vbjpzdXJlXCI6XCJzdXJlXCJ9LFwiTW9kYWwyXCI6e1widi1vbjpjYW5jZWxcIjpcImNhbmNlbFwiLFwidi1vbjpzdXJlXCI6XCJtb25leVN1cmVGblwifX07XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgTW9kYWwsXHJcbiAgICBNb2RhbDJcclxuICB9XHJcbiAgZGF0YSA9IHtcclxuICAgIHNob3dBZGRBY3Rpdml0eTogZmFsc2UsXHJcbiAgICBzaG93QWRkTW9uZXk6IGZhbHNlLFxyXG4gICAgbXNnOiAnJyxcclxuICAgIGltZzogW10sXHJcbiAgICBzZWVUeXBlOiAwLFxyXG4gICAgYWN0aXZpdHlUeXBlOiAwLFxyXG4gICAgYWN0aXZpdHlKb2luVHlwZTogW1xyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6IDAsXHJcbiAgICAgICAgdGl0bGU6ICfljZXpgIknLFxyXG4gICAgICAgIHR5cGU6ICdyYWRpbydcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGlkOiAxLFxyXG4gICAgICAgIHRpdGxlOiAn5aSa6YCJJyxcclxuICAgICAgICB0eXBlOiAnc2VsZWN0J1xyXG4gICAgICB9XHJcbiAgICBdLFxyXG4gICAgcmVtaW5kVHlwZTogW1xyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6IDAsXHJcbiAgICAgICAgdGl0bGU6ICflkKYnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogMSxcclxuICAgICAgICB0aXRsZTogJ+aYrydcclxuICAgICAgfVxyXG4gICAgXSxcclxuICAgIHR5cGU6IFtcclxuICAgICAge1xyXG4gICAgICAgIGlkOiAxLFxyXG4gICAgICAgIHRpdGxlOiAn54+t57qn5Y+v6KeBJyxcclxuICAgICAgICB0eXBlOiAnY2xhc3MnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogMCxcclxuICAgICAgICB0aXRsZTogJ+WFqOmDqOWPr+ingScsXHJcbiAgICAgICAgdHlwZTogJ2FsbCdcclxuICAgICAgfVxyXG4gICAgXSxcclxuICAgIHR5cGVMaXN0OiB7XHJcbiAgICAgIHpvbmU6ICflrrbplb/lnIgnLFxyXG4gICAgICBub3RpY2U6ICfpgJrnn6UnLFxyXG4gICAgICBhY3Rpdml0eTogJ+a0u+WKqCcsXHJcbiAgICAgIG1vbmV5OiAn5pS25qy+J1xyXG4gICAgfSxcclxuICAgIHBsYWNlaG9sZGVyOiAn6K+35Zyo5q2k5Y+R6KGo5oKo55qE5oSf5oOzJyxcclxuICAgIGFjdGl2ZVR5cGU6ICd6b25lJyxcclxuICAgIGFjdGl2aXR5TGlzdDogW10sXHJcbiAgICBjYW5TdWJtaXQ6IGZhbHNlLFxyXG4gICAgbWVtYmVySW5mbzogbnVsbCxcclxuICAgIGNsYXNzSW5mbzogbnVsbCxcclxuICAgIG1vbmV5OiAnJyxcclxuICAgIGlzUmVtaW5kOiAwLFxyXG4gICAgbW9uZXlMaXN0OiBbXSxcclxuICAgIG1heFBob3RvQ291bnQ6IDksXHJcbiAgICB1cGxvYWRzOiBbXVxyXG4gIH1cclxuICBjb21tb25GbihyZXMpIHtcclxuICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgIHNob3dNc2coJ+WPkeW4g+aIkOWKnycsIDIwMDApXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHd4Lm5hdmlnYXRlQmFjaygpXHJcbiAgICAgIH0sIDIwMDApXHJcbiAgICB9XHJcbiAgfVxyXG4gIG9uTG9hZCA9IChlKSA9PiB7XHJcbiAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxyXG4gICAgdGhpcy5tZW1iZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nKVxyXG4gICAgY29uc3QgdHlwZSA9IGUudHlwZVxyXG4gICAgd3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcclxuICAgICAgdGl0bGU6IGDlj5HluIMke3RoaXMudHlwZUxpc3RbdHlwZV19YFxyXG4gICAgfSlcclxuICAgIGlmICh0eXBlICE9PSAnem9uZScpIHtcclxuICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IGDor7flnKjmraTlvZXlhaXmgqjnmoQke3RoaXMudHlwZUxpc3RbdHlwZV196K+m5oOFYFxyXG4gICAgfVxyXG4gICAgdGhpcy5hY3RpdmVUeXBlID0gdHlwZVxyXG4gICAgdGhpcy4kYXBwbHkoKVxyXG4gIH1cclxuICBjaGVja0NhblN1Ym1pdCgpIHtcclxuICAgIGNvbnN0IG1zZyA9IGDor7floavlhpnmgqjnmoQke3RoaXMudHlwZUxpc3RbdGhpcy5hY3RpdmVUeXBlXX3mj4/ov7Dor6bmg4VgXHJcbiAgICBpZiAoaXNFbXB0eVN0cmluZyh0aGlzLm1zZykpIHtcclxuICAgICAgc2hvd01zZyhtc2cpXHJcbiAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG4gIHNhdmVDaXJjbGVzKGNvbW1vblBhcmFtcywgdHlwZSkge1xyXG4gICAgY29uc3QgcGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zLCB7XHJcbiAgICAgIGltZ191cmw6IHRoaXMuaW1nXHJcbiAgICB9KVxyXG4gICAgY29uc3QgY2lyY2xlUGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgcGFyYW1zLCB7XHJcbiAgICAgIHNlZV90eXBlOiB0aGlzLnR5cGVbdGhpcy5zZWVUeXBlXS50eXBlXHJcbiAgICB9KVxyXG4gICAgaWYgKHR5cGUgPT09ICdtb25leScpIHtcclxuICAgICAgaWYgKCF0aGlzLm1vbmV5TGlzdC5sZW5ndGgpIHtcclxuICAgICAgICBzaG93TXNnKCfor7foh7PlsJHmt7vliqDkuIDkuKrmlLbmrL7mnaHnm64nKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IG1vbmV5UGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgcGFyYW1zLCB7XHJcbiAgICAgICAgaXRlbTogdGhpcy5tb25leUxpc3QsXHJcbiAgICAgICAgdHlwZTogJ3N0dWRlbnQnXHJcbiAgICAgIH0pXHJcbiAgICAgIGFkZENvbGxlY3Rpb24obW9uZXlQYXJhbXMpLnRoZW4ocmVzID0+IHsgdGhpcy5jb21tb25GbihyZXMpIH0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhZGRDaXJjbGVzKGNpcmNsZVBhcmFtcykudGhlbihyZXMgPT4geyB0aGlzLmNvbW1vbkZuKHJlcykgfSlcclxuICAgIH1cclxuICB9XHJcbiAgc2F2ZUFjdGl2aXR5KGNvbW1vblBhcmFtcykge1xyXG4gICAgaWYgKCF0aGlzLmFjdGl2aXR5TGlzdC5sZW5ndGgpIHtcclxuICAgICAgc2hvd01zZygn6K+36Iez5bCR5re75Yqg5LiA5Liq5rS75Yqo6YCJ6aG5JylcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBjb25zdCBwYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMsIHtcclxuICAgICAgc2VsZWN0VHlwZTogdGhpcy5hY3Rpdml0eUpvaW5UeXBlW3RoaXMuYWN0aXZpdHlUeXBlXS50eXBlLFxyXG4gICAgICBzaWduX3R5cGU6ICdhbGwnLFxyXG4gICAgICBpdGVtOiB0aGlzLmFjdGl2aXR5TGlzdCxcclxuICAgICAgaW1nX3VybDogdGhpcy5pbWdcclxuICAgIH0pXHJcbiAgICBhZGRBY3Rpdml0eShwYXJhbXMpLnRoZW4ocmVzID0+IHsgdGhpcy5jb21tb25GbihyZXMpfSlcclxuICB9XHJcbiAgc2F2ZU5vdGljZShjb21tb25QYXJhbXMpIHtcclxuICAgIGNvbnN0IHBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcywge1xyXG4gICAgICByZW1pbmQ6IE51bWJlcih0aGlzLmlzUmVtaW5kKVxyXG4gICAgfSlcclxuICAgIGFkZE5vdGlmeShwYXJhbXMpLnRoZW4ocmVzID0+IHsgdGhpcy5jb21tb25GbihyZXMpIH0pXHJcbiAgfVxyXG4gIGNoZWNrUmVwZWF0KHZhbHVlLCBhcnIpIHtcclxuICAgIGxldCByZXRWYWx1ZSA9IGZhbHNlXHJcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gYXJyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgIGlmIChhcnJbaV0ubmFtZSA9PT0gdmFsdWUpIHtcclxuICAgICAgICByZXRWYWx1ZSA9IHRydWVcclxuICAgICAgICBicmVha1xyXG4gICAgICB9XHJcbiAgICAgIHJldFZhbHVlID0gZmFsc2VcclxuICAgIH1cclxuICAgIHJldHVybiByZXRWYWx1ZVxyXG4gIH1cclxuICB3YXRjaCA9IHtcclxuICAgIG1zZyAobmV3VmFsLCBvbGRWYWwpIHtcclxuICAgICAgaWYgKCFpc0VtcHR5U3RyaW5nKG5ld1ZhbCkpIHtcclxuICAgICAgICB0aGlzLmNhblN1Ym1pdCA9IHRydWVcclxuICAgICAgfVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9XHJcbiAgfVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBjaG9vc2VJbWFnZSgpIHtcclxuICAgICAgaWYgKHRoaXMuaW1nLmxlbmd0aCA+IHRoaXMubWF4UGhvdG9Db3VudCkge1xyXG4gICAgICAgIHNob3dNc2coJ+acgOWkmuS4iuS8oDnlvKDlm74nKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICAgIGxldCBfdGhpcyA9IHRoaXNcclxuICAgICAgd3guY2hvb3NlSW1hZ2Uoe1xyXG4gICAgICAgIGNvdW50OiB0aGlzLm1heFBob3RvQ291bnQsXHJcbiAgICAgICAgc2l6ZVR5cGU6IFsnb3JpZ2luYWwnLCAnY29tcHJlc3NlZCddLFxyXG4gICAgICAgIHNvdXJjZVR5cGU6IFsnYWxidW0nLCAnY2FtZXJhJ10sXHJcbiAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgIGlmICh0aGlzLmltZy5sZW5ndGggKyByZXMudGVtcEZpbGVQYXRocy5sZW5ndGggPiB0aGlzLm1heFBob3RvQ291bnQpIHtcclxuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ+acgOWkmuWPquiDvemAieaLqScgKyB0aGlzLm1heFBob3RvQ291bnQgKyAn5byg5Zu+54mHJyxcclxuICAgICAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJlcy50ZW1wRmlsZVBhdGhzLmZvckVhY2gocGF0aCA9PiB7XHJcbiAgICAgICAgICAgIGxldCB1cGxvYWQgPSB7fVxyXG4gICAgICAgICAgICB1cGxvYWQucGF0aCA9IHBhdGhcclxuICAgICAgICAgICAgdXBsb2FkLmVycm9yID0gZmFsc2VcclxuICAgICAgICAgICAgdXBsb2FkLnVwbG9hZFByb2dyZXNzID0gd3gudXBsb2FkRmlsZSh7XHJcbiAgICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly90ZXN0LmN0andoLmNvbS9hcGkvdjEvZmlsZS91cGxvYWRQaWMnLFxyXG4gICAgICAgICAgICAgIGZpbGVQYXRoOiBwYXRoLFxyXG4gICAgICAgICAgICAgIGZvcm1EYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAnbWVtYmVyX2lkJzogdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCxcclxuICAgICAgICAgICAgICAgICdtZW1iZXJfdG9rZW4nOiB0aGlzLm1lbWJlckluZm8ubWVtYmVyX3Rva2VuLFxyXG4gICAgICAgICAgICAgICAgJ2ZvbGRlcic6ICdjb21taXR0ZWUnXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBuYW1lOiAnZmlsZScsXHJcbiAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgdXJsID0gZGF0YS5kYXRhLmZpbGVfdXJsXHJcbiAgICAgICAgICAgICAgICBfdGhpcy5pbWcucHVzaCh1cmwpXHJcbiAgICAgICAgICAgICAgICBfdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdXBsb2FkLnVwbG9hZFByb2dyZXNzLm9uUHJvZ3Jlc3NVcGRhdGUoZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgdXBsb2FkLnByb2dyZXNzID0gcmVzLnByb2dyZXNzXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIF90aGlzLnVwbG9hZHMucHVzaCh1cGxvYWQpXHJcbiAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBzdWJtaXQoKSB7XHJcbiAgICAgIGlmICghdGhpcy5jYW5TdWJtaXQpIHtcclxuICAgICAgICBzaG93TXNnKCfor7fmo4Dmn6Xlj5HluIPlhoXlrrkhJylcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICB0aGlzLmNoZWNrQ2FuU3VibWl0KClcclxuICAgICAgY29uc3QgY29tbW9uUGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwge1xyXG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcclxuICAgICAgICB0eXBlOiB0aGlzLnNlZW5JbmRleCxcclxuICAgICAgICBkZXNjOiB0aGlzLm1zZ1xyXG4gICAgICB9KVxyXG4gICAgICBpZiAodGhpcy5hY3RpdmVUeXBlID09PSAnem9uZScgfHwgdGhpcy5hY3RpdmVUeXBlID09PSAnbW9uZXknKSB7XHJcbiAgICAgICAgdGhpcy5zYXZlQ2lyY2xlcyhjb21tb25QYXJhbXMsIHRoaXMuYWN0aXZlVHlwZSlcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmFjdGl2ZVR5cGUgPT09ICdhY3Rpdml0eScpIHtcclxuICAgICAgICB0aGlzLnNhdmVBY3Rpdml0eShjb21tb25QYXJhbXMpXHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5hY3RpdmVUeXBlID09PSAnbm90aWNlJykge1xyXG4gICAgICAgIHRoaXMuc2F2ZU5vdGljZShjb21tb25QYXJhbXMpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjYW5jZWwoKSB7XHJcbiAgICAgIHRoaXMuc2hvd0FkZEFjdGl2aXR5ID0gZmFsc2VcclxuICAgICAgdGhpcy5zaG93QWRkTW9uZXkgPSBmYWxzZVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9LFxyXG4gICAgc3VyZSh2YWx1ZSkge1xyXG4gICAgICBpZiAodGhpcy5jaGVja1JlcGVhdCh2YWx1ZSwgdGhpcy5hY3Rpdml0eUxpc3QpKSB7XHJcbiAgICAgICAgc2hvd01zZygn6K+35LiN6KaB6L6T5YWl6YeN5aSN55qE5rS75Yqo6aG555uuJylcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICBjb25zdCBvYmogPSB7XHJcbiAgICAgICAgbmFtZTogdmFsdWVcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmFjdGl2aXR5TGlzdC5wdXNoKG9iailcclxuICAgICAgdGhpcy5zaG93QWRkQWN0aXZpdHkgPSBmYWxzZVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9LFxyXG4gICAgbW9uZXlTdXJlRm4odmFsdWUxLCB2YWx1ZTIpIHtcclxuICAgICAgY29uc3Qgb2JqID0ge1xyXG4gICAgICAgIG5hbWU6IHZhbHVlMSxcclxuICAgICAgICBtb25leTogdmFsdWUyXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5tb25leUxpc3QucHVzaChvYmopXHJcbiAgICAgIHRoaXMuc2hvd0FkZE1vbmV5ID0gZmFsc2VcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSxcclxuICAgIGFkZE5ldyhmbGFnKSB7XHJcbiAgICAgIHRoaXNbZmxhZ10gPSB0cnVlXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0sXHJcbiAgICBkZWxldGVGbiAoYXJyLCBpbmRleCkge1xyXG4gICAgICB0aGlzW2Fycl0uc3BsaWNlKGluZGV4LCAxKVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9LFxyXG4gICAgYmluZENoYW5nZShlKSB7XHJcbiAgICAgIHRoaXNbZS5jdXJyZW50VGFyZ2V0LmlkXSA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19