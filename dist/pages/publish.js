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
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];
        prevPage.setData({
          fromPublish: true
        });
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2guanMiXSwibmFtZXMiOlsiUHVibGlzaCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJNb2RhbCIsIk1vZGFsMiIsImRhdGEiLCJzaG93QWRkQWN0aXZpdHkiLCJzaG93QWRkTW9uZXkiLCJtc2ciLCJpbWciLCJzZWVUeXBlIiwiYWN0aXZpdHlUeXBlIiwiYWN0aXZpdHlKb2luVHlwZSIsImlkIiwidGl0bGUiLCJ0eXBlIiwicmVtaW5kVHlwZSIsInR5cGVMaXN0Iiwiem9uZSIsIm5vdGljZSIsImFjdGl2aXR5IiwibW9uZXkiLCJwbGFjZWhvbGRlciIsImFjdGl2ZVR5cGUiLCJhY3Rpdml0eUxpc3QiLCJjYW5TdWJtaXQiLCJtZW1iZXJJbmZvIiwiY2xhc3NJbmZvIiwiaXNSZW1pbmQiLCJtb25leUxpc3QiLCJtYXhQaG90b0NvdW50IiwidXBsb2FkcyIsIm9uTG9hZCIsImUiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwiJGFwcGx5Iiwid2F0Y2giLCJuZXdWYWwiLCJvbGRWYWwiLCJtZXRob2RzIiwiY2hvb3NlSW1hZ2UiLCJsZW5ndGgiLCJfdGhpcyIsImNvdW50Iiwic2l6ZVR5cGUiLCJzb3VyY2VUeXBlIiwic3VjY2VzcyIsInJlcyIsInRlbXBGaWxlUGF0aHMiLCJzaG93VG9hc3QiLCJpY29uIiwiZm9yRWFjaCIsInVwbG9hZCIsInBhdGgiLCJlcnJvciIsInVwbG9hZFByb2dyZXNzIiwidXBsb2FkRmlsZSIsInVybCIsImZpbGVQYXRoIiwiZm9ybURhdGEiLCJtZW1iZXJfaWQiLCJtZW1iZXJfdG9rZW4iLCJuYW1lIiwiSlNPTiIsInBhcnNlIiwiZmlsZV91cmwiLCJwdXNoIiwib25Qcm9ncmVzc1VwZGF0ZSIsInByb2dyZXNzIiwic3VibWl0IiwiY2hlY2tDYW5TdWJtaXQiLCJjb21tb25QYXJhbXMiLCJPYmplY3QiLCJhc3NpZ24iLCJjbGFzc19pZCIsInNlZW5JbmRleCIsImRlc2MiLCJzYXZlQ2lyY2xlcyIsInNhdmVBY3Rpdml0eSIsInNhdmVOb3RpY2UiLCJjYW5jZWwiLCJzdXJlIiwidmFsdWUiLCJjaGVja1JlcGVhdCIsIm9iaiIsIm1vbmV5U3VyZUZuIiwidmFsdWUxIiwidmFsdWUyIiwiYWRkTmV3IiwiZmxhZyIsImRlbGV0ZUZuIiwiYXJyIiwiaW5kZXgiLCJzcGxpY2UiLCJiaW5kQ2hhbmdlIiwiY3VycmVudFRhcmdldCIsImRldGFpbCIsInBhZ2VzIiwiZ2V0Q3VycmVudFBhZ2VzIiwicHJldlBhZ2UiLCJzZXREYXRhIiwiZnJvbVB1Ymxpc2giLCJzZXRUaW1lb3V0IiwibmF2aWdhdGVCYWNrIiwicGFyYW1zIiwiaW1nX3VybCIsImNpcmNsZVBhcmFtcyIsInNlZV90eXBlIiwibW9uZXlQYXJhbXMiLCJpdGVtIiwidGhlbiIsImNvbW1vbkZuIiwic2VsZWN0VHlwZSIsInNpZ25fdHlwZSIsInJlbWluZCIsIk51bWJlciIsInJldFZhbHVlIiwiaSIsImxlbiIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQUNxQkEsTzs7Ozs7Ozs7Ozs7Ozs7MkxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVkMsTyxHQUFVLEUsU0FDWEMsTSxHQUFTLEVBQUMsU0FBUSxFQUFDLGVBQWMsTUFBZixFQUFzQixpQkFBZ0IsSUFBdEMsRUFBMkMsbUJBQWtCLGVBQTdELEVBQTZFLGdCQUFlLEVBQTVGLEVBQStGLG9CQUFtQixpQkFBbEgsRUFBb0ksY0FBYSxFQUFqSixFQUFULEVBQThKLFVBQVMsRUFBQyxlQUFjLElBQWYsRUFBb0IsaUJBQWdCLElBQXBDLEVBQXlDLG1CQUFrQixPQUEzRCxFQUFtRSxvQkFBbUIsSUFBdEYsRUFBMkYsb0JBQW1CLGNBQTlHLEVBQXZLLEUsU0FDVEMsTyxH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QUFDN0N5QyxvQkFBWSxLQUFLdEcsZ0JBQUwsQ0FBc0IsS0FBS0QsWUFBM0IsRUFBeUNJLElBRFI7QUFFN0NvRyxtQkFBVyxLQUZrQztBQUc3Q0osY0FBTSxLQUFLdkYsWUFIa0M7QUFJN0NtRixpQkFBUyxLQUFLbEc7QUFKK0IsT0FBaEMsQ0FBZjtBQU1BLDZCQUFZaUcsTUFBWixFQUFvQk0sSUFBcEIsQ0FBeUIsZUFBTztBQUFFLGVBQUtDLFFBQUwsQ0FBY2hFLEdBQWQ7QUFBbUIsT0FBckQ7QUFDRDs7OytCQUNVd0IsWSxFQUFjO0FBQUE7O0FBQ3ZCLFVBQU1pQyxTQUFTaEMsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JGLFlBQWxCLEVBQWdDO0FBQzdDMkMsZ0JBQVFDLE9BQU8sS0FBS3pGLFFBQVo7QUFEcUMsT0FBaEMsQ0FBZjtBQUdBLDJCQUFVOEUsTUFBVixFQUFrQk0sSUFBbEIsQ0FBdUIsZUFBTztBQUFFLGVBQUtDLFFBQUwsQ0FBY2hFLEdBQWQ7QUFBb0IsT0FBcEQ7QUFDRDs7O2dDQUNXbUMsSyxFQUFPUyxHLEVBQUs7QUFDdEIsVUFBSXlCLFdBQVcsS0FBZjtBQUNBLFdBQUssSUFBSUMsSUFBSSxDQUFSLEVBQVdDLE1BQU0zQixJQUFJbEQsTUFBMUIsRUFBa0M0RSxJQUFJQyxHQUF0QyxFQUEyQ0QsR0FBM0MsRUFBZ0Q7QUFDOUMsWUFBSTFCLElBQUkwQixDQUFKLEVBQU92RCxJQUFQLEtBQWdCb0IsS0FBcEIsRUFBMkI7QUFDekJrQyxxQkFBVyxJQUFYO0FBQ0E7QUFDRDtBQUNEQSxtQkFBVyxLQUFYO0FBQ0Q7QUFDRCxhQUFPQSxRQUFQO0FBQ0Q7Ozs7RUEzSmtDRyxlQUFLQyxJOztrQkFBckI5SCxPIiwiZmlsZSI6InB1Ymxpc2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IE1vZGFsIGZyb20gJy4uL2NvbXBvbmVudHMvbW9kYWwnXHJcbmltcG9ydCBNb2RhbDIgZnJvbSAnLi4vY29tcG9uZW50cy9tb2RhbDInXHJcbmltcG9ydCB7IHNob3dNc2csIGlzRW1wdHlTdHJpbmcsIHVwbG9hZEltYWdlIH0gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xyXG5pbXBvcnQgeyBhZGRDaXJjbGVzLCBhZGRDb2xsZWN0aW9uLCBhZGRBY3Rpdml0eSwgYWRkTm90aWZ5IH0gZnJvbSAnLi4vYXBpL3pvbmUnXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB1Ymxpc2ggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflj5HluIMnXHJcbiAgfVxyXG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJNb2RhbFwiOntcInN1cmVCdG5UZXh0XCI6XCLnoa7orqTmt7vliqBcIixcImNhbmNlbEJ0blRleHRcIjpcIuWPlua2iFwiLFwicGxhY2Vob2xkZXJUZXh0XCI6XCLor7fovpPlhaXmgqjmg7PmlrDlop7nmoTmtLvliqjpobnnm67lkI1cIixcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6ZmxhZy5zeW5jXCI6XCJzaG93QWRkQWN0aXZpdHlcIixcInhtbG5zOnYtb25cIjpcIlwifSxcIk1vZGFsMlwiOntcInN1cmVCdG5UZXh0XCI6XCLnoa7orqRcIixcImNhbmNlbEJ0blRleHRcIjpcIuWPlua2iFwiLFwicGxhY2Vob2xkZXJUZXh0XCI6XCLmlLbmrL7pgInpobnlkI1cIixcInBsYWNlaG9sZGVyVGV4dDJcIjpcIumHkeminVwiLFwidi1iaW5kOmZsYWcuc3luY1wiOlwic2hvd0FkZE1vbmV5XCJ9fTtcclxuJGV2ZW50cyA9IHtcIk1vZGFsXCI6e1widi1vbjpjYW5jZWxcIjpcImNhbmNlbFwiLFwidi1vbjpzdXJlXCI6XCJzdXJlXCJ9LFwiTW9kYWwyXCI6e1widi1vbjpjYW5jZWxcIjpcImNhbmNlbFwiLFwidi1vbjpzdXJlXCI6XCJtb25leVN1cmVGblwifX07XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgTW9kYWwsXHJcbiAgICBNb2RhbDJcclxuICB9XHJcbiAgZGF0YSA9IHtcclxuICAgIHNob3dBZGRBY3Rpdml0eTogZmFsc2UsXHJcbiAgICBzaG93QWRkTW9uZXk6IGZhbHNlLFxyXG4gICAgbXNnOiAnJyxcclxuICAgIGltZzogW10sXHJcbiAgICBzZWVUeXBlOiAwLFxyXG4gICAgYWN0aXZpdHlUeXBlOiAwLFxyXG4gICAgYWN0aXZpdHlKb2luVHlwZTogW1xyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6IDAsXHJcbiAgICAgICAgdGl0bGU6ICfljZXpgIknLFxyXG4gICAgICAgIHR5cGU6ICdyYWRpbydcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGlkOiAxLFxyXG4gICAgICAgIHRpdGxlOiAn5aSa6YCJJyxcclxuICAgICAgICB0eXBlOiAnc2VsZWN0J1xyXG4gICAgICB9XHJcbiAgICBdLFxyXG4gICAgcmVtaW5kVHlwZTogW1xyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6IDAsXHJcbiAgICAgICAgdGl0bGU6ICflkKYnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogMSxcclxuICAgICAgICB0aXRsZTogJ+aYrydcclxuICAgICAgfVxyXG4gICAgXSxcclxuICAgIHR5cGU6IFtcclxuICAgICAge1xyXG4gICAgICAgIGlkOiAxLFxyXG4gICAgICAgIHRpdGxlOiAn54+t57qn5Y+v6KeBJyxcclxuICAgICAgICB0eXBlOiAnY2xhc3MnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogMCxcclxuICAgICAgICB0aXRsZTogJ+WFqOmDqOWPr+ingScsXHJcbiAgICAgICAgdHlwZTogJ2FsbCdcclxuICAgICAgfVxyXG4gICAgXSxcclxuICAgIHR5cGVMaXN0OiB7XHJcbiAgICAgIHpvbmU6ICflrrbplb/lnIgnLFxyXG4gICAgICBub3RpY2U6ICfpgJrnn6UnLFxyXG4gICAgICBhY3Rpdml0eTogJ+a0u+WKqCcsXHJcbiAgICAgIG1vbmV5OiAn5pS25qy+J1xyXG4gICAgfSxcclxuICAgIHBsYWNlaG9sZGVyOiAn6K+35Zyo5q2k5Y+R6KGo5oKo55qE5oSf5oOzJyxcclxuICAgIGFjdGl2ZVR5cGU6ICd6b25lJyxcclxuICAgIGFjdGl2aXR5TGlzdDogW10sXHJcbiAgICBjYW5TdWJtaXQ6IGZhbHNlLFxyXG4gICAgbWVtYmVySW5mbzogbnVsbCxcclxuICAgIGNsYXNzSW5mbzogbnVsbCxcclxuICAgIG1vbmV5OiAnJyxcclxuICAgIGlzUmVtaW5kOiAwLFxyXG4gICAgbW9uZXlMaXN0OiBbXSxcclxuICAgIG1heFBob3RvQ291bnQ6IDksXHJcbiAgICB1cGxvYWRzOiBbXVxyXG4gIH1cclxuICBjb21tb25GbihyZXMpIHtcclxuICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgIGxldCBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpO1xyXG4gICAgICBsZXQgcHJldlBhZ2UgPSBwYWdlc1twYWdlcy5sZW5ndGggLSAyXTtcclxuICAgICAgcHJldlBhZ2Uuc2V0RGF0YSh7XHJcbiAgICAgICAgZnJvbVB1Ymxpc2g6IHRydWVcclxuICAgICAgfSlcclxuICAgICAgc2hvd01zZygn5Y+R5biD5oiQ5YqfJywgMjAwMClcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgd3gubmF2aWdhdGVCYWNrKClcclxuICAgICAgfSwgMjAwMClcclxuICAgIH1cclxuICB9XHJcbiAgb25Mb2FkID0gKGUpID0+IHtcclxuICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXHJcbiAgICB0aGlzLm1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXHJcbiAgICBjb25zdCB0eXBlID0gZS50eXBlXHJcbiAgICB3eC5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe1xyXG4gICAgICB0aXRsZTogYOWPkeW4gyR7dGhpcy50eXBlTGlzdFt0eXBlXX1gXHJcbiAgICB9KVxyXG4gICAgaWYgKHR5cGUgIT09ICd6b25lJykge1xyXG4gICAgICB0aGlzLnBsYWNlaG9sZGVyID0gYOivt+WcqOatpOW9leWFpeaCqOeahCR7dGhpcy50eXBlTGlzdFt0eXBlXX3or6bmg4VgXHJcbiAgICB9XHJcbiAgICB0aGlzLmFjdGl2ZVR5cGUgPSB0eXBlXHJcbiAgICB0aGlzLiRhcHBseSgpXHJcbiAgfVxyXG4gIGNoZWNrQ2FuU3VibWl0KCkge1xyXG4gICAgY29uc3QgbXNnID0gYOivt+Whq+WGmeaCqOeahCR7dGhpcy50eXBlTGlzdFt0aGlzLmFjdGl2ZVR5cGVdfeaPj+i/sOivpuaDhWBcclxuICAgIGlmIChpc0VtcHR5U3RyaW5nKHRoaXMubXNnKSkge1xyXG4gICAgICBzaG93TXNnKG1zZylcclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWVcclxuICB9XHJcbiAgc2F2ZUNpcmNsZXMoY29tbW9uUGFyYW1zLCB0eXBlKSB7XHJcbiAgICBjb25zdCBwYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMsIHtcclxuICAgICAgaW1nX3VybDogdGhpcy5pbWdcclxuICAgIH0pXHJcbiAgICBjb25zdCBjaXJjbGVQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBwYXJhbXMsIHtcclxuICAgICAgc2VlX3R5cGU6IHRoaXMudHlwZVt0aGlzLnNlZVR5cGVdLnR5cGVcclxuICAgIH0pXHJcbiAgICBpZiAodHlwZSA9PT0gJ21vbmV5Jykge1xyXG4gICAgICBpZiAoIXRoaXMubW9uZXlMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgIHNob3dNc2coJ+ivt+iHs+Wwkea3u+WKoOS4gOS4quaUtuasvuadoeebricpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgbW9uZXlQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBwYXJhbXMsIHtcclxuICAgICAgICBpdGVtOiB0aGlzLm1vbmV5TGlzdCxcclxuICAgICAgICB0eXBlOiAnc3R1ZGVudCdcclxuICAgICAgfSlcclxuICAgICAgYWRkQ29sbGVjdGlvbihtb25leVBhcmFtcykudGhlbihyZXMgPT4geyB0aGlzLmNvbW1vbkZuKHJlcykgfSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFkZENpcmNsZXMoY2lyY2xlUGFyYW1zKS50aGVuKHJlcyA9PiB7IHRoaXMuY29tbW9uRm4ocmVzKSB9KVxyXG4gICAgfVxyXG4gIH1cclxuICBzYXZlQWN0aXZpdHkoY29tbW9uUGFyYW1zKSB7XHJcbiAgICBpZiAoIXRoaXMuYWN0aXZpdHlMaXN0Lmxlbmd0aCkge1xyXG4gICAgICBzaG93TXNnKCfor7foh7PlsJHmt7vliqDkuIDkuKrmtLvliqjpgInpobknKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGNvbnN0IHBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcywge1xyXG4gICAgICBzZWxlY3RUeXBlOiB0aGlzLmFjdGl2aXR5Sm9pblR5cGVbdGhpcy5hY3Rpdml0eVR5cGVdLnR5cGUsXHJcbiAgICAgIHNpZ25fdHlwZTogJ2FsbCcsXHJcbiAgICAgIGl0ZW06IHRoaXMuYWN0aXZpdHlMaXN0LFxyXG4gICAgICBpbWdfdXJsOiB0aGlzLmltZ1xyXG4gICAgfSlcclxuICAgIGFkZEFjdGl2aXR5KHBhcmFtcykudGhlbihyZXMgPT4geyB0aGlzLmNvbW1vbkZuKHJlcyl9KVxyXG4gIH1cclxuICBzYXZlTm90aWNlKGNvbW1vblBhcmFtcykge1xyXG4gICAgY29uc3QgcGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zLCB7XHJcbiAgICAgIHJlbWluZDogTnVtYmVyKHRoaXMuaXNSZW1pbmQpXHJcbiAgICB9KVxyXG4gICAgYWRkTm90aWZ5KHBhcmFtcykudGhlbihyZXMgPT4geyB0aGlzLmNvbW1vbkZuKHJlcykgfSlcclxuICB9XHJcbiAgY2hlY2tSZXBlYXQodmFsdWUsIGFycikge1xyXG4gICAgbGV0IHJldFZhbHVlID0gZmFsc2VcclxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhcnIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgaWYgKGFycltpXS5uYW1lID09PSB2YWx1ZSkge1xyXG4gICAgICAgIHJldFZhbHVlID0gdHJ1ZVxyXG4gICAgICAgIGJyZWFrXHJcbiAgICAgIH1cclxuICAgICAgcmV0VmFsdWUgPSBmYWxzZVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJldFZhbHVlXHJcbiAgfVxyXG4gIHdhdGNoID0ge1xyXG4gICAgbXNnIChuZXdWYWwsIG9sZFZhbCkge1xyXG4gICAgICBpZiAoIWlzRW1wdHlTdHJpbmcobmV3VmFsKSkge1xyXG4gICAgICAgIHRoaXMuY2FuU3VibWl0ID0gdHJ1ZVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH1cclxuICB9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGNob29zZUltYWdlKCkge1xyXG4gICAgICBpZiAodGhpcy5pbWcubGVuZ3RoID4gdGhpcy5tYXhQaG90b0NvdW50KSB7XHJcbiAgICAgICAgc2hvd01zZygn5pyA5aSa5LiK5LygOeW8oOWbvicpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgbGV0IF90aGlzID0gdGhpc1xyXG4gICAgICB3eC5jaG9vc2VJbWFnZSh7XHJcbiAgICAgICAgY291bnQ6IHRoaXMubWF4UGhvdG9Db3VudCxcclxuICAgICAgICBzaXplVHlwZTogWydvcmlnaW5hbCcsICdjb21wcmVzc2VkJ10sXHJcbiAgICAgICAgc291cmNlVHlwZTogWydhbGJ1bScsICdjYW1lcmEnXSxcclxuICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgaWYgKHRoaXMuaW1nLmxlbmd0aCArIHJlcy50ZW1wRmlsZVBhdGhzLmxlbmd0aCA+IHRoaXMubWF4UGhvdG9Db3VudCkge1xyXG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAn5pyA5aSa5Y+q6IO96YCJ5oupJyArIHRoaXMubWF4UGhvdG9Db3VudCArICflvKDlm77niYcnLFxyXG4gICAgICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmVzLnRlbXBGaWxlUGF0aHMuZm9yRWFjaChwYXRoID0+IHtcclxuICAgICAgICAgICAgbGV0IHVwbG9hZCA9IHt9XHJcbiAgICAgICAgICAgIHVwbG9hZC5wYXRoID0gcGF0aFxyXG4gICAgICAgICAgICB1cGxvYWQuZXJyb3IgPSBmYWxzZVxyXG4gICAgICAgICAgICB1cGxvYWQudXBsb2FkUHJvZ3Jlc3MgPSB3eC51cGxvYWRGaWxlKHtcclxuICAgICAgICAgICAgICB1cmw6ICdodHRwczovL3Rlc3QuY3Rqd2guY29tL2FwaS92MS9maWxlL3VwbG9hZFBpYycsXHJcbiAgICAgICAgICAgICAgZmlsZVBhdGg6IHBhdGgsXHJcbiAgICAgICAgICAgICAgZm9ybURhdGE6IHtcclxuICAgICAgICAgICAgICAgICdtZW1iZXJfaWQnOiB0aGlzLm1lbWJlckluZm8ubWVtYmVyX2lkLFxyXG4gICAgICAgICAgICAgICAgJ21lbWJlcl90b2tlbic6IHRoaXMubWVtYmVySW5mby5tZW1iZXJfdG9rZW4sXHJcbiAgICAgICAgICAgICAgICAnZm9sZGVyJzogJ2NvbW1pdHRlZSdcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIG5hbWU6ICdmaWxlJyxcclxuICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpXHJcbiAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBkYXRhLmRhdGEuZmlsZV91cmxcclxuICAgICAgICAgICAgICAgIF90aGlzLmltZy5wdXNoKHVybClcclxuICAgICAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB1cGxvYWQudXBsb2FkUHJvZ3Jlc3Mub25Qcm9ncmVzc1VwZGF0ZShmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICB1cGxvYWQucHJvZ3Jlc3MgPSByZXMucHJvZ3Jlc3NcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgX3RoaXMudXBsb2Fkcy5wdXNoKHVwbG9hZClcclxuICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIHN1Ym1pdCgpIHtcclxuICAgICAgaWYgKCF0aGlzLmNhblN1Ym1pdCkge1xyXG4gICAgICAgIHNob3dNc2coJ+ivt+ajgOafpeWPkeW4g+WGheWuuSEnKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY2hlY2tDYW5TdWJtaXQoKVxyXG4gICAgICBjb25zdCBjb21tb25QYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCB7XHJcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxyXG4gICAgICAgIHR5cGU6IHRoaXMuc2VlbkluZGV4LFxyXG4gICAgICAgIGRlc2M6IHRoaXMubXNnXHJcbiAgICAgIH0pXHJcbiAgICAgIGlmICh0aGlzLmFjdGl2ZVR5cGUgPT09ICd6b25lJyB8fCB0aGlzLmFjdGl2ZVR5cGUgPT09ICdtb25leScpIHtcclxuICAgICAgICB0aGlzLnNhdmVDaXJjbGVzKGNvbW1vblBhcmFtcywgdGhpcy5hY3RpdmVUeXBlKVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuYWN0aXZlVHlwZSA9PT0gJ2FjdGl2aXR5Jykge1xyXG4gICAgICAgIHRoaXMuc2F2ZUFjdGl2aXR5KGNvbW1vblBhcmFtcylcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmFjdGl2ZVR5cGUgPT09ICdub3RpY2UnKSB7XHJcbiAgICAgICAgdGhpcy5zYXZlTm90aWNlKGNvbW1vblBhcmFtcylcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNhbmNlbCgpIHtcclxuICAgICAgdGhpcy5zaG93QWRkQWN0aXZpdHkgPSBmYWxzZVxyXG4gICAgICB0aGlzLnNob3dBZGRNb25leSA9IGZhbHNlXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0sXHJcbiAgICBzdXJlKHZhbHVlKSB7XHJcbiAgICAgIGlmICh0aGlzLmNoZWNrUmVwZWF0KHZhbHVlLCB0aGlzLmFjdGl2aXR5TGlzdCkpIHtcclxuICAgICAgICBzaG93TXNnKCfor7fkuI3opoHovpPlhaXph43lpI3nmoTmtLvliqjpobnnm64nKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IG9iaiA9IHtcclxuICAgICAgICBuYW1lOiB2YWx1ZVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuYWN0aXZpdHlMaXN0LnB1c2gob2JqKVxyXG4gICAgICB0aGlzLnNob3dBZGRBY3Rpdml0eSA9IGZhbHNlXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0sXHJcbiAgICBtb25leVN1cmVGbih2YWx1ZTEsIHZhbHVlMikge1xyXG4gICAgICBjb25zdCBvYmogPSB7XHJcbiAgICAgICAgbmFtZTogdmFsdWUxLFxyXG4gICAgICAgIG1vbmV5OiB2YWx1ZTJcclxuICAgICAgfVxyXG4gICAgICB0aGlzLm1vbmV5TGlzdC5wdXNoKG9iailcclxuICAgICAgdGhpcy5zaG93QWRkTW9uZXkgPSBmYWxzZVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9LFxyXG4gICAgYWRkTmV3KGZsYWcpIHtcclxuICAgICAgdGhpc1tmbGFnXSA9IHRydWVcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSxcclxuICAgIGRlbGV0ZUZuIChhcnIsIGluZGV4KSB7XHJcbiAgICAgIHRoaXNbYXJyXS5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0sXHJcbiAgICBiaW5kQ2hhbmdlKGUpIHtcclxuICAgICAgdGhpc1tlLmN1cnJlbnRUYXJnZXQuaWRdID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=