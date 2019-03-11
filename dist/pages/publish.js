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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2guanMiXSwibmFtZXMiOlsiUHVibGlzaCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJNb2RhbCIsIk1vZGFsMiIsImRhdGEiLCJzaG93QWRkQWN0aXZpdHkiLCJzaG93QWRkTW9uZXkiLCJtc2ciLCJpbWciLCJzZWVUeXBlIiwiYWN0aXZpdHlUeXBlIiwiYWN0aXZpdHlKb2luVHlwZSIsImlkIiwidGl0bGUiLCJ0eXBlIiwicmVtaW5kVHlwZSIsInR5cGVMaXN0Iiwiem9uZSIsIm5vdGljZSIsImFjdGl2aXR5IiwibW9uZXkiLCJwbGFjZWhvbGRlciIsImFjdGl2ZVR5cGUiLCJhY3Rpdml0eUxpc3QiLCJjYW5TdWJtaXQiLCJtZW1iZXJJbmZvIiwiY2xhc3NJbmZvIiwiaXNSZW1pbmQiLCJtb25leUxpc3QiLCJtYXhQaG90b0NvdW50IiwidXBsb2FkcyIsIm9uTG9hZCIsImUiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwiJGFwcGx5Iiwid2F0Y2giLCJuZXdWYWwiLCJvbGRWYWwiLCJtZXRob2RzIiwiY2hvb3NlSW1hZ2UiLCJsZW5ndGgiLCJfdGhpcyIsImNvdW50Iiwic2l6ZVR5cGUiLCJzb3VyY2VUeXBlIiwic3VjY2VzcyIsInJlcyIsInRlbXBGaWxlUGF0aHMiLCJzaG93VG9hc3QiLCJpY29uIiwiZm9yRWFjaCIsInVwbG9hZCIsInBhdGgiLCJlcnJvciIsInVwbG9hZFByb2dyZXNzIiwidXBsb2FkRmlsZSIsInVybCIsImZpbGVQYXRoIiwiZm9ybURhdGEiLCJtZW1iZXJfaWQiLCJtZW1iZXJfdG9rZW4iLCJuYW1lIiwiSlNPTiIsInBhcnNlIiwiZmlsZV91cmwiLCJwdXNoIiwib25Qcm9ncmVzc1VwZGF0ZSIsInByb2dyZXNzIiwic3VibWl0IiwiY2hlY2tDYW5TdWJtaXQiLCJjb21tb25QYXJhbXMiLCJPYmplY3QiLCJhc3NpZ24iLCJjbGFzc19pZCIsInNlZW5JbmRleCIsImRlc2MiLCJzYXZlQ2lyY2xlcyIsInNhdmVBY3Rpdml0eSIsInNhdmVOb3RpY2UiLCJjYW5jZWwiLCJzdXJlIiwidmFsdWUiLCJjaGVja1JlcGVhdCIsIm9iaiIsIm1vbmV5U3VyZUZuIiwidmFsdWUxIiwidmFsdWUyIiwiYWRkTmV3IiwiZmxhZyIsImRlbGV0ZUZuIiwiYXJyIiwiaW5kZXgiLCJzcGxpY2UiLCJiaW5kQ2hhbmdlIiwiY3VycmVudFRhcmdldCIsImRldGFpbCIsInBhZ2VzIiwiZ2V0Q3VycmVudFBhZ2VzIiwicHJldlBhZ2UiLCJzZXREYXRhIiwiZnJvbVB1Ymxpc2giLCJzZXRUaW1lb3V0IiwibmF2aWdhdGVCYWNrIiwicGFyYW1zIiwiaW1nX3VybCIsImNpcmNsZVBhcmFtcyIsInNlZV90eXBlIiwibW9uZXlQYXJhbXMiLCJpdGVtIiwidGhlbiIsImNvbW1vbkZuIiwic2VsZWN0VHlwZSIsInNpZ25fdHlwZSIsInJlbWluZCIsIk51bWJlciIsInJldFZhbHVlIiwiaSIsImxlbiIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQUNxQkEsTzs7Ozs7Ozs7Ozs7Ozs7MkxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVkMsTyxHQUFVLEUsU0FDWEMsTSxHQUFTLEVBQUMsU0FBUSxFQUFDLGVBQWMsTUFBZixFQUFzQixpQkFBZ0IsSUFBdEMsRUFBMkMsbUJBQWtCLGVBQTdELEVBQTZFLGdCQUFlLEVBQTVGLEVBQStGLG9CQUFtQixpQkFBbEgsRUFBb0ksY0FBYSxFQUFqSixFQUFULEVBQThKLFVBQVMsRUFBQyxlQUFjLElBQWYsRUFBb0IsaUJBQWdCLElBQXBDLEVBQXlDLG1CQUFrQixPQUEzRCxFQUFtRSxvQkFBbUIsSUFBdEYsRUFBMkYsb0JBQW1CLGNBQTlHLEVBQXZLLEUsU0FDVEMsTyxH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QUFDN0N5QyxvQkFBWSxLQUFLdEcsZ0JBQUwsQ0FBc0IsS0FBS0QsWUFBM0IsRUFBeUNJLElBRFI7QUFFN0NvRyxtQkFBVyxLQUZrQztBQUc3Q0osY0FBTSxLQUFLdkYsWUFIa0M7QUFJN0NtRixpQkFBUyxLQUFLbEc7QUFKK0IsT0FBaEMsQ0FBZjtBQU1BLDZCQUFZaUcsTUFBWixFQUFvQk0sSUFBcEIsQ0FBeUIsZUFBTztBQUFFLGVBQUtDLFFBQUwsQ0FBY2hFLEdBQWQ7QUFBbUIsT0FBckQ7QUFDRDs7OytCQUNVd0IsWSxFQUFjO0FBQUE7O0FBQ3ZCLFVBQU1pQyxTQUFTaEMsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JGLFlBQWxCLEVBQWdDO0FBQzdDMkMsZ0JBQVFDLE9BQU8sS0FBS3pGLFFBQVo7QUFEcUMsT0FBaEMsQ0FBZjtBQUdBLDJCQUFVOEUsTUFBVixFQUFrQk0sSUFBbEIsQ0FBdUIsZUFBTztBQUFFLGVBQUtDLFFBQUwsQ0FBY2hFLEdBQWQ7QUFBb0IsT0FBcEQ7QUFDRDs7O2dDQUNXbUMsSyxFQUFPUyxHLEVBQUs7QUFDdEIsVUFBSXlCLFdBQVcsS0FBZjtBQUNBLFdBQUssSUFBSUMsSUFBSSxDQUFSLEVBQVdDLE1BQU0zQixJQUFJbEQsTUFBMUIsRUFBa0M0RSxJQUFJQyxHQUF0QyxFQUEyQ0QsR0FBM0MsRUFBZ0Q7QUFDOUMsWUFBSTFCLElBQUkwQixDQUFKLEVBQU92RCxJQUFQLEtBQWdCb0IsS0FBcEIsRUFBMkI7QUFDekJrQyxxQkFBVyxJQUFYO0FBQ0E7QUFDRDtBQUNEQSxtQkFBVyxLQUFYO0FBQ0Q7QUFDRCxhQUFPQSxRQUFQO0FBQ0Q7Ozs7RUEzSmtDRyxlQUFLQyxJOztrQkFBckI5SCxPIiwiZmlsZSI6InB1Ymxpc2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgTW9kYWwgZnJvbSAnLi4vY29tcG9uZW50cy9tb2RhbCdcbmltcG9ydCBNb2RhbDIgZnJvbSAnLi4vY29tcG9uZW50cy9tb2RhbDInXG5pbXBvcnQgeyBzaG93TXNnLCBpc0VtcHR5U3RyaW5nLCB1cGxvYWRJbWFnZSB9IGZyb20gJy4uL3V0aWxzL2NvbW1vbidcbmltcG9ydCB7IGFkZENpcmNsZXMsIGFkZENvbGxlY3Rpb24sIGFkZEFjdGl2aXR5LCBhZGROb3RpZnkgfSBmcm9tICcuLi9hcGkvem9uZSdcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB1Ymxpc2ggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WPkeW4gydcbiAgfVxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiTW9kYWxcIjp7XCJzdXJlQnRuVGV4dFwiOlwi56Gu6K6k5re75YqgXCIsXCJjYW5jZWxCdG5UZXh0XCI6XCLlj5bmtohcIixcInBsYWNlaG9sZGVyVGV4dFwiOlwi6K+36L6T5YWl5oKo5oOz5paw5aKe55qE5rS75Yqo6aG555uu5ZCNXCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmZsYWcuc3luY1wiOlwic2hvd0FkZEFjdGl2aXR5XCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJNb2RhbDJcIjp7XCJzdXJlQnRuVGV4dFwiOlwi56Gu6K6kXCIsXCJjYW5jZWxCdG5UZXh0XCI6XCLlj5bmtohcIixcInBsYWNlaG9sZGVyVGV4dFwiOlwi5pS25qy+6YCJ6aG55ZCNXCIsXCJwbGFjZWhvbGRlclRleHQyXCI6XCLph5Hpop1cIixcInYtYmluZDpmbGFnLnN5bmNcIjpcInNob3dBZGRNb25leVwifX07XHJcbiRldmVudHMgPSB7XCJNb2RhbFwiOntcInYtb246Y2FuY2VsXCI6XCJjYW5jZWxcIixcInYtb246c3VyZVwiOlwic3VyZVwifSxcIk1vZGFsMlwiOntcInYtb246Y2FuY2VsXCI6XCJjYW5jZWxcIixcInYtb246c3VyZVwiOlwibW9uZXlTdXJlRm5cIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICBNb2RhbCxcbiAgICBNb2RhbDJcbiAgfVxuICBkYXRhID0ge1xuICAgIHNob3dBZGRBY3Rpdml0eTogZmFsc2UsXG4gICAgc2hvd0FkZE1vbmV5OiBmYWxzZSxcbiAgICBtc2c6ICcnLFxuICAgIGltZzogW10sXG4gICAgc2VlVHlwZTogMCxcbiAgICBhY3Rpdml0eVR5cGU6IDAsXG4gICAgYWN0aXZpdHlKb2luVHlwZTogW1xuICAgICAge1xuICAgICAgICBpZDogMCxcbiAgICAgICAgdGl0bGU6ICfljZXpgIknLFxuICAgICAgICB0eXBlOiAncmFkaW8nXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogMSxcbiAgICAgICAgdGl0bGU6ICflpJrpgIknLFxuICAgICAgICB0eXBlOiAnc2VsZWN0J1xuICAgICAgfVxuICAgIF0sXG4gICAgcmVtaW5kVHlwZTogW1xuICAgICAge1xuICAgICAgICBpZDogMCxcbiAgICAgICAgdGl0bGU6ICflkKYnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogMSxcbiAgICAgICAgdGl0bGU6ICfmmK8nXG4gICAgICB9XG4gICAgXSxcbiAgICB0eXBlOiBbXG4gICAgICB7XG4gICAgICAgIGlkOiAxLFxuICAgICAgICB0aXRsZTogJ+ePree6p+WPr+ingScsXG4gICAgICAgIHR5cGU6ICdjbGFzcydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAwLFxuICAgICAgICB0aXRsZTogJ+WFqOmDqOWPr+ingScsXG4gICAgICAgIHR5cGU6ICdhbGwnXG4gICAgICB9XG4gICAgXSxcbiAgICB0eXBlTGlzdDoge1xuICAgICAgem9uZTogJ+WutumVv+WciCcsXG4gICAgICBub3RpY2U6ICfpgJrnn6UnLFxuICAgICAgYWN0aXZpdHk6ICfmtLvliqgnLFxuICAgICAgbW9uZXk6ICfmlLbmrL4nXG4gICAgfSxcbiAgICBwbGFjZWhvbGRlcjogJ+ivt+WcqOatpOWPkeihqOaCqOeahOaEn+aDsycsXG4gICAgYWN0aXZlVHlwZTogJ3pvbmUnLFxuICAgIGFjdGl2aXR5TGlzdDogW10sXG4gICAgY2FuU3VibWl0OiBmYWxzZSxcbiAgICBtZW1iZXJJbmZvOiBudWxsLFxuICAgIGNsYXNzSW5mbzogbnVsbCxcbiAgICBtb25leTogJycsXG4gICAgaXNSZW1pbmQ6IDAsXG4gICAgbW9uZXlMaXN0OiBbXSxcbiAgICBtYXhQaG90b0NvdW50OiA5LFxuICAgIHVwbG9hZHM6IFtdXG4gIH1cbiAgY29tbW9uRm4ocmVzKSB7XG4gICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgIGxldCBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpO1xuICAgICAgbGV0IHByZXZQYWdlID0gcGFnZXNbcGFnZXMubGVuZ3RoIC0gMl07XG4gICAgICBwcmV2UGFnZS5zZXREYXRhKHtcbiAgICAgICAgZnJvbVB1Ymxpc2g6IHRydWVcbiAgICAgIH0pXG4gICAgICBzaG93TXNnKCflj5HluIPmiJDlip8nLCAyMDAwKVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHd4Lm5hdmlnYXRlQmFjaygpXG4gICAgICB9LCAyMDAwKVxuICAgIH1cbiAgfVxuICBvbkxvYWQgPSAoZSkgPT4ge1xuICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXG4gICAgdGhpcy5tZW1iZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nKVxuICAgIGNvbnN0IHR5cGUgPSBlLnR5cGVcbiAgICB3eC5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe1xuICAgICAgdGl0bGU6IGDlj5HluIMke3RoaXMudHlwZUxpc3RbdHlwZV19YFxuICAgIH0pXG4gICAgaWYgKHR5cGUgIT09ICd6b25lJykge1xuICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IGDor7flnKjmraTlvZXlhaXmgqjnmoQke3RoaXMudHlwZUxpc3RbdHlwZV196K+m5oOFYFxuICAgIH1cbiAgICB0aGlzLmFjdGl2ZVR5cGUgPSB0eXBlXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIGNoZWNrQ2FuU3VibWl0KCkge1xuICAgIGNvbnN0IG1zZyA9IGDor7floavlhpnmgqjnmoQke3RoaXMudHlwZUxpc3RbdGhpcy5hY3RpdmVUeXBlXX3mj4/ov7Dor6bmg4VgXG4gICAgaWYgKGlzRW1wdHlTdHJpbmcodGhpcy5tc2cpKSB7XG4gICAgICBzaG93TXNnKG1zZylcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlXG4gIH1cbiAgc2F2ZUNpcmNsZXMoY29tbW9uUGFyYW1zLCB0eXBlKSB7XG4gICAgY29uc3QgcGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zLCB7XG4gICAgICBpbWdfdXJsOiB0aGlzLmltZ1xuICAgIH0pXG4gICAgY29uc3QgY2lyY2xlUGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgcGFyYW1zLCB7XG4gICAgICBzZWVfdHlwZTogdGhpcy50eXBlW3RoaXMuc2VlVHlwZV0udHlwZVxuICAgIH0pXG4gICAgaWYgKHR5cGUgPT09ICdtb25leScpIHtcbiAgICAgIGlmICghdGhpcy5tb25leUxpc3QubGVuZ3RoKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+iHs+Wwkea3u+WKoOS4gOS4quaUtuasvuadoeebricpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgY29uc3QgbW9uZXlQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBwYXJhbXMsIHtcbiAgICAgICAgaXRlbTogdGhpcy5tb25leUxpc3QsXG4gICAgICAgIHR5cGU6ICdzdHVkZW50J1xuICAgICAgfSlcbiAgICAgIGFkZENvbGxlY3Rpb24obW9uZXlQYXJhbXMpLnRoZW4ocmVzID0+IHsgdGhpcy5jb21tb25GbihyZXMpIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGFkZENpcmNsZXMoY2lyY2xlUGFyYW1zKS50aGVuKHJlcyA9PiB7IHRoaXMuY29tbW9uRm4ocmVzKSB9KVxuICAgIH1cbiAgfVxuICBzYXZlQWN0aXZpdHkoY29tbW9uUGFyYW1zKSB7XG4gICAgaWYgKCF0aGlzLmFjdGl2aXR5TGlzdC5sZW5ndGgpIHtcbiAgICAgIHNob3dNc2coJ+ivt+iHs+Wwkea3u+WKoOS4gOS4qua0u+WKqOmAiemhuScpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgcGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zLCB7XG4gICAgICBzZWxlY3RUeXBlOiB0aGlzLmFjdGl2aXR5Sm9pblR5cGVbdGhpcy5hY3Rpdml0eVR5cGVdLnR5cGUsXG4gICAgICBzaWduX3R5cGU6ICdhbGwnLFxuICAgICAgaXRlbTogdGhpcy5hY3Rpdml0eUxpc3QsXG4gICAgICBpbWdfdXJsOiB0aGlzLmltZ1xuICAgIH0pXG4gICAgYWRkQWN0aXZpdHkocGFyYW1zKS50aGVuKHJlcyA9PiB7IHRoaXMuY29tbW9uRm4ocmVzKX0pXG4gIH1cbiAgc2F2ZU5vdGljZShjb21tb25QYXJhbXMpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMsIHtcbiAgICAgIHJlbWluZDogTnVtYmVyKHRoaXMuaXNSZW1pbmQpXG4gICAgfSlcbiAgICBhZGROb3RpZnkocGFyYW1zKS50aGVuKHJlcyA9PiB7IHRoaXMuY29tbW9uRm4ocmVzKSB9KVxuICB9XG4gIGNoZWNrUmVwZWF0KHZhbHVlLCBhcnIpIHtcbiAgICBsZXQgcmV0VmFsdWUgPSBmYWxzZVxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhcnIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmIChhcnJbaV0ubmFtZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgcmV0VmFsdWUgPSB0cnVlXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICByZXRWYWx1ZSA9IGZhbHNlXG4gICAgfVxuICAgIHJldHVybiByZXRWYWx1ZVxuICB9XG4gIHdhdGNoID0ge1xuICAgIG1zZyAobmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgIGlmICghaXNFbXB0eVN0cmluZyhuZXdWYWwpKSB7XG4gICAgICAgIHRoaXMuY2FuU3VibWl0ID0gdHJ1ZVxuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuICBtZXRob2RzID0ge1xuICAgIGNob29zZUltYWdlKCkge1xuICAgICAgaWYgKHRoaXMuaW1nLmxlbmd0aCA+IHRoaXMubWF4UGhvdG9Db3VudCkge1xuICAgICAgICBzaG93TXNnKCfmnIDlpJrkuIrkvKA55byg5Zu+JylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBsZXQgX3RoaXMgPSB0aGlzXG4gICAgICB3eC5jaG9vc2VJbWFnZSh7XG4gICAgICAgIGNvdW50OiB0aGlzLm1heFBob3RvQ291bnQsXG4gICAgICAgIHNpemVUeXBlOiBbJ29yaWdpbmFsJywgJ2NvbXByZXNzZWQnXSxcbiAgICAgICAgc291cmNlVHlwZTogWydhbGJ1bScsICdjYW1lcmEnXSxcbiAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5pbWcubGVuZ3RoICsgcmVzLnRlbXBGaWxlUGF0aHMubGVuZ3RoID4gdGhpcy5tYXhQaG90b0NvdW50KSB7XG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+acgOWkmuWPquiDvemAieaLqScgKyB0aGlzLm1heFBob3RvQ291bnQgKyAn5byg5Zu+54mHJyxcbiAgICAgICAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXMudGVtcEZpbGVQYXRocy5mb3JFYWNoKHBhdGggPT4ge1xuICAgICAgICAgICAgbGV0IHVwbG9hZCA9IHt9XG4gICAgICAgICAgICB1cGxvYWQucGF0aCA9IHBhdGhcbiAgICAgICAgICAgIHVwbG9hZC5lcnJvciA9IGZhbHNlXG4gICAgICAgICAgICB1cGxvYWQudXBsb2FkUHJvZ3Jlc3MgPSB3eC51cGxvYWRGaWxlKHtcbiAgICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly90ZXN0LmN0andoLmNvbS9hcGkvdjEvZmlsZS91cGxvYWRQaWMnLFxuICAgICAgICAgICAgICBmaWxlUGF0aDogcGF0aCxcbiAgICAgICAgICAgICAgZm9ybURhdGE6IHtcbiAgICAgICAgICAgICAgICAnbWVtYmVyX2lkJzogdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCxcbiAgICAgICAgICAgICAgICAnbWVtYmVyX3Rva2VuJzogdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl90b2tlbixcbiAgICAgICAgICAgICAgICAnZm9sZGVyJzogJ2NvbW1pdHRlZSdcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKVxuICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IGRhdGEuZGF0YS5maWxlX3VybFxuICAgICAgICAgICAgICAgIF90aGlzLmltZy5wdXNoKHVybClcbiAgICAgICAgICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdXBsb2FkLnVwbG9hZFByb2dyZXNzLm9uUHJvZ3Jlc3NVcGRhdGUoZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgIHVwbG9hZC5wcm9ncmVzcyA9IHJlcy5wcm9ncmVzc1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF90aGlzLnVwbG9hZHMucHVzaCh1cGxvYWQpXG4gICAgICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBzdWJtaXQoKSB7XG4gICAgICBpZiAoIXRoaXMuY2FuU3VibWl0KSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+ajgOafpeWPkeW4g+WGheWuuSEnKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHRoaXMuY2hlY2tDYW5TdWJtaXQoKVxuICAgICAgY29uc3QgY29tbW9uUGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwge1xuICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXG4gICAgICAgIHR5cGU6IHRoaXMuc2VlbkluZGV4LFxuICAgICAgICBkZXNjOiB0aGlzLm1zZ1xuICAgICAgfSlcbiAgICAgIGlmICh0aGlzLmFjdGl2ZVR5cGUgPT09ICd6b25lJyB8fCB0aGlzLmFjdGl2ZVR5cGUgPT09ICdtb25leScpIHtcbiAgICAgICAgdGhpcy5zYXZlQ2lyY2xlcyhjb21tb25QYXJhbXMsIHRoaXMuYWN0aXZlVHlwZSlcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5hY3RpdmVUeXBlID09PSAnYWN0aXZpdHknKSB7XG4gICAgICAgIHRoaXMuc2F2ZUFjdGl2aXR5KGNvbW1vblBhcmFtcylcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5hY3RpdmVUeXBlID09PSAnbm90aWNlJykge1xuICAgICAgICB0aGlzLnNhdmVOb3RpY2UoY29tbW9uUGFyYW1zKVxuICAgICAgfVxuICAgIH0sXG4gICAgY2FuY2VsKCkge1xuICAgICAgdGhpcy5zaG93QWRkQWN0aXZpdHkgPSBmYWxzZVxuICAgICAgdGhpcy5zaG93QWRkTW9uZXkgPSBmYWxzZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgc3VyZSh2YWx1ZSkge1xuICAgICAgaWYgKHRoaXMuY2hlY2tSZXBlYXQodmFsdWUsIHRoaXMuYWN0aXZpdHlMaXN0KSkge1xuICAgICAgICBzaG93TXNnKCfor7fkuI3opoHovpPlhaXph43lpI3nmoTmtLvliqjpobnnm64nKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGNvbnN0IG9iaiA9IHtcbiAgICAgICAgbmFtZTogdmFsdWVcbiAgICAgIH1cbiAgICAgIHRoaXMuYWN0aXZpdHlMaXN0LnB1c2gob2JqKVxuICAgICAgdGhpcy5zaG93QWRkQWN0aXZpdHkgPSBmYWxzZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgbW9uZXlTdXJlRm4odmFsdWUxLCB2YWx1ZTIpIHtcbiAgICAgIGNvbnN0IG9iaiA9IHtcbiAgICAgICAgbmFtZTogdmFsdWUxLFxuICAgICAgICBtb25leTogdmFsdWUyXG4gICAgICB9XG4gICAgICB0aGlzLm1vbmV5TGlzdC5wdXNoKG9iailcbiAgICAgIHRoaXMuc2hvd0FkZE1vbmV5ID0gZmFsc2VcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGFkZE5ldyhmbGFnKSB7XG4gICAgICB0aGlzW2ZsYWddID0gdHJ1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgZGVsZXRlRm4gKGFyciwgaW5kZXgpIHtcbiAgICAgIHRoaXNbYXJyXS5zcGxpY2UoaW5kZXgsIDEpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBiaW5kQ2hhbmdlKGUpIHtcbiAgICAgIHRoaXNbZS5jdXJyZW50VGFyZ2V0LmlkXSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG59XG4iXX0=