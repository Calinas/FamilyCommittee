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
        id: 0,
        title: '班级可见',
        type: 'class'
      }, {
        id: 1,
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
      selectSeeType: function selectSeeType(id) {
        this.seeType = id;
        this.$apply();
      },
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2guanMiXSwibmFtZXMiOlsiUHVibGlzaCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJNb2RhbCIsIk1vZGFsMiIsImRhdGEiLCJzaG93QWRkQWN0aXZpdHkiLCJzaG93QWRkTW9uZXkiLCJtc2ciLCJpbWciLCJzZWVUeXBlIiwiYWN0aXZpdHlUeXBlIiwiYWN0aXZpdHlKb2luVHlwZSIsImlkIiwidGl0bGUiLCJ0eXBlIiwicmVtaW5kVHlwZSIsInR5cGVMaXN0Iiwiem9uZSIsIm5vdGljZSIsImFjdGl2aXR5IiwibW9uZXkiLCJwbGFjZWhvbGRlciIsImFjdGl2ZVR5cGUiLCJhY3Rpdml0eUxpc3QiLCJjYW5TdWJtaXQiLCJtZW1iZXJJbmZvIiwiY2xhc3NJbmZvIiwiaXNSZW1pbmQiLCJtb25leUxpc3QiLCJtYXhQaG90b0NvdW50IiwidXBsb2FkcyIsIm9uTG9hZCIsImUiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwiJGFwcGx5Iiwid2F0Y2giLCJuZXdWYWwiLCJvbGRWYWwiLCJtZXRob2RzIiwic2VsZWN0U2VlVHlwZSIsImNob29zZUltYWdlIiwibGVuZ3RoIiwiX3RoaXMiLCJjb3VudCIsInNpemVUeXBlIiwic291cmNlVHlwZSIsInN1Y2Nlc3MiLCJyZXMiLCJ0ZW1wRmlsZVBhdGhzIiwic2hvd1RvYXN0IiwiaWNvbiIsImZvckVhY2giLCJ1cGxvYWQiLCJwYXRoIiwiZXJyb3IiLCJ1cGxvYWRQcm9ncmVzcyIsInVwbG9hZEZpbGUiLCJ1cmwiLCJmaWxlUGF0aCIsImZvcm1EYXRhIiwibWVtYmVyX2lkIiwibWVtYmVyX3Rva2VuIiwibmFtZSIsIkpTT04iLCJwYXJzZSIsImZpbGVfdXJsIiwicHVzaCIsIm9uUHJvZ3Jlc3NVcGRhdGUiLCJwcm9ncmVzcyIsInN1Ym1pdCIsImNoZWNrQ2FuU3VibWl0IiwiY29tbW9uUGFyYW1zIiwiT2JqZWN0IiwiYXNzaWduIiwiY2xhc3NfaWQiLCJzZWVuSW5kZXgiLCJkZXNjIiwic2F2ZUNpcmNsZXMiLCJzYXZlQWN0aXZpdHkiLCJzYXZlTm90aWNlIiwiY2FuY2VsIiwic3VyZSIsInZhbHVlIiwiY2hlY2tSZXBlYXQiLCJvYmoiLCJtb25leVN1cmVGbiIsInZhbHVlMSIsInZhbHVlMiIsImFkZE5ldyIsImZsYWciLCJkZWxldGVGbiIsImFyciIsImluZGV4Iiwic3BsaWNlIiwiYmluZENoYW5nZSIsImN1cnJlbnRUYXJnZXQiLCJkZXRhaWwiLCJwYWdlcyIsImdldEN1cnJlbnRQYWdlcyIsInByZXZQYWdlIiwic2V0RGF0YSIsImZyb21QdWJsaXNoIiwic2V0VGltZW91dCIsIm5hdmlnYXRlQmFjayIsInBhcmFtcyIsImltZ191cmwiLCJjaXJjbGVQYXJhbXMiLCJzZWVfdHlwZSIsIm1vbmV5UGFyYW1zIiwiaXRlbSIsInRoZW4iLCJjb21tb25GbiIsInNlbGVjdFR5cGUiLCJzaWduX3R5cGUiLCJyZW1pbmQiLCJOdW1iZXIiLCJyZXRWYWx1ZSIsImkiLCJsZW4iLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7SUFDcUJBLE87Ozs7Ozs7Ozs7Ozs7OzJMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1ZDLE8sR0FBVSxFLFNBQ1hDLE0sR0FBUyxFQUFDLFNBQVEsRUFBQyxlQUFjLE1BQWYsRUFBc0IsaUJBQWdCLElBQXRDLEVBQTJDLG1CQUFrQixlQUE3RCxFQUE2RSxnQkFBZSxFQUE1RixFQUErRixvQkFBbUIsaUJBQWxILEVBQW9JLGNBQWEsRUFBakosRUFBVCxFQUE4SixVQUFTLEVBQUMsZUFBYyxJQUFmLEVBQW9CLGlCQUFnQixJQUFwQyxFQUF5QyxtQkFBa0IsT0FBM0QsRUFBbUUsb0JBQW1CLElBQXRGLEVBQTJGLG9CQUFtQixjQUE5RyxF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IGZyb20gJ3dlcHknXG5pbXBvcnQgTW9kYWwgZnJvbSAnLi4vY29tcG9uZW50cy9tb2RhbCdcbmltcG9ydCBNb2RhbDIgZnJvbSAnLi4vY29tcG9uZW50cy9tb2RhbDInXG5pbXBvcnQgeyBzaG93TXNnLCBpc0VtcHR5U3RyaW5nLCB1cGxvYWRJbWFnZSB9IGZyb20gJy4uL3V0aWxzL2NvbW1vbidcbmltcG9ydCB7IGFkZENpcmNsZXMsIGFkZENvbGxlY3Rpb24sIGFkZEFjdGl2aXR5LCBhZGROb3RpZnkgfSBmcm9tICcuLi9hcGkvem9uZSdcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB1Ymxpc2ggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WPkeW4gydcbiAgfVxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiTW9kYWxcIjp7XCJzdXJlQnRuVGV4dFwiOlwi56Gu6K6k5re75YqgXCIsXCJjYW5jZWxCdG5UZXh0XCI6XCLlj5bmtohcIixcInBsYWNlaG9sZGVyVGV4dFwiOlwi6K+36L6T5YWl5oKo5oOz5paw5aKe55qE5rS75Yqo6aG555uu5ZCNXCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmZsYWcuc3luY1wiOlwic2hvd0FkZEFjdGl2aXR5XCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJNb2RhbDJcIjp7XCJzdXJlQnRuVGV4dFwiOlwi56Gu6K6kXCIsXCJjYW5jZWxCdG5UZXh0XCI6XCLlj5bmtohcIixcInBsYWNlaG9sZGVyVGV4dFwiOlwi5pS25qy+6YCJ6aG55ZCNXCIsXCJwbGFjZWhvbGRlclRleHQyXCI6XCLph5Hpop1cIixcInYtYmluZDpmbGFnLnN5bmNcIjpcInNob3dBZGRNb25leVwifX07XHJcbiRldmVudHMgPSB7XCJNb2RhbFwiOntcInYtb246Y2FuY2VsXCI6XCJjYW5jZWxcIixcInYtb246c3VyZVwiOlwic3VyZVwifSxcIk1vZGFsMlwiOntcInYtb246Y2FuY2VsXCI6XCJjYW5jZWxcIixcInYtb246c3VyZVwiOlwibW9uZXlTdXJlRm5cIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICBNb2RhbCxcbiAgICBNb2RhbDJcbiAgfVxuICBkYXRhID0ge1xuICAgIHNob3dBZGRBY3Rpdml0eTogZmFsc2UsXG4gICAgc2hvd0FkZE1vbmV5OiBmYWxzZSxcbiAgICBtc2c6ICcnLFxuICAgIGltZzogW10sXG4gICAgc2VlVHlwZTogMCxcbiAgICBhY3Rpdml0eVR5cGU6IDAsXG4gICAgYWN0aXZpdHlKb2luVHlwZTogW1xuICAgICAge1xuICAgICAgICBpZDogMCxcbiAgICAgICAgdGl0bGU6ICfljZXpgIknLFxuICAgICAgICB0eXBlOiAncmFkaW8nXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogMSxcbiAgICAgICAgdGl0bGU6ICflpJrpgIknLFxuICAgICAgICB0eXBlOiAnc2VsZWN0J1xuICAgICAgfVxuICAgIF0sXG4gICAgcmVtaW5kVHlwZTogW1xuICAgICAge1xuICAgICAgICBpZDogMCxcbiAgICAgICAgdGl0bGU6ICflkKYnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogMSxcbiAgICAgICAgdGl0bGU6ICfmmK8nXG4gICAgICB9XG4gICAgXSxcbiAgICB0eXBlOiBbXG4gICAgICB7XG4gICAgICAgIGlkOiAwLFxuICAgICAgICB0aXRsZTogJ+ePree6p+WPr+ingScsXG4gICAgICAgIHR5cGU6ICdjbGFzcydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAxLFxuICAgICAgICB0aXRsZTogJ+WFqOmDqOWPr+ingScsXG4gICAgICAgIHR5cGU6ICdhbGwnXG4gICAgICB9XG4gICAgXSxcbiAgICB0eXBlTGlzdDoge1xuICAgICAgem9uZTogJ+WutumVv+WciCcsXG4gICAgICBub3RpY2U6ICfpgJrnn6UnLFxuICAgICAgYWN0aXZpdHk6ICfmtLvliqgnLFxuICAgICAgbW9uZXk6ICfmlLbmrL4nXG4gICAgfSxcbiAgICBwbGFjZWhvbGRlcjogJ+ivt+WcqOatpOWPkeihqOaCqOeahOaEn+aDsycsXG4gICAgYWN0aXZlVHlwZTogJ3pvbmUnLFxuICAgIGFjdGl2aXR5TGlzdDogW10sXG4gICAgY2FuU3VibWl0OiBmYWxzZSxcbiAgICBtZW1iZXJJbmZvOiBudWxsLFxuICAgIGNsYXNzSW5mbzogbnVsbCxcbiAgICBtb25leTogJycsXG4gICAgaXNSZW1pbmQ6IDAsXG4gICAgbW9uZXlMaXN0OiBbXSxcbiAgICBtYXhQaG90b0NvdW50OiA5LFxuICAgIHVwbG9hZHM6IFtdXG4gIH1cbiAgY29tbW9uRm4ocmVzKSB7XG4gICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgIGxldCBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpO1xuICAgICAgbGV0IHByZXZQYWdlID0gcGFnZXNbcGFnZXMubGVuZ3RoIC0gMl07XG4gICAgICBwcmV2UGFnZS5zZXREYXRhKHtcbiAgICAgICAgZnJvbVB1Ymxpc2g6IHRydWVcbiAgICAgIH0pXG4gICAgICBzaG93TXNnKCflj5HluIPmiJDlip8nLCAyMDAwKVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHd4Lm5hdmlnYXRlQmFjaygpXG4gICAgICB9LCAyMDAwKVxuICAgIH1cbiAgfVxuICBvbkxvYWQgPSAoZSkgPT4ge1xuICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXG4gICAgdGhpcy5tZW1iZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nKVxuICAgIGNvbnN0IHR5cGUgPSBlLnR5cGVcbiAgICB3eC5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe1xuICAgICAgdGl0bGU6IGDlj5HluIMke3RoaXMudHlwZUxpc3RbdHlwZV19YFxuICAgIH0pXG4gICAgaWYgKHR5cGUgIT09ICd6b25lJykge1xuICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IGDor7flnKjmraTlvZXlhaXmgqjnmoQke3RoaXMudHlwZUxpc3RbdHlwZV196K+m5oOFYFxuICAgIH1cbiAgICB0aGlzLmFjdGl2ZVR5cGUgPSB0eXBlXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIGNoZWNrQ2FuU3VibWl0KCkge1xuICAgIGNvbnN0IG1zZyA9IGDor7floavlhpnmgqjnmoQke3RoaXMudHlwZUxpc3RbdGhpcy5hY3RpdmVUeXBlXX3mj4/ov7Dor6bmg4VgXG4gICAgaWYgKGlzRW1wdHlTdHJpbmcodGhpcy5tc2cpKSB7XG4gICAgICBzaG93TXNnKG1zZylcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlXG4gIH1cbiAgc2F2ZUNpcmNsZXMoY29tbW9uUGFyYW1zLCB0eXBlKSB7XG4gICAgY29uc3QgcGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zLCB7XG4gICAgICBpbWdfdXJsOiB0aGlzLmltZ1xuICAgIH0pXG4gICAgY29uc3QgY2lyY2xlUGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgcGFyYW1zLCB7XG4gICAgICBzZWVfdHlwZTogdGhpcy50eXBlW3RoaXMuc2VlVHlwZV0udHlwZVxuICAgIH0pXG4gICAgaWYgKHR5cGUgPT09ICdtb25leScpIHtcbiAgICAgIGlmICghdGhpcy5tb25leUxpc3QubGVuZ3RoKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+iHs+Wwkea3u+WKoOS4gOS4quaUtuasvuadoeebricpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgY29uc3QgbW9uZXlQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBwYXJhbXMsIHtcbiAgICAgICAgaXRlbTogdGhpcy5tb25leUxpc3QsXG4gICAgICAgIHR5cGU6ICdzdHVkZW50J1xuICAgICAgfSlcbiAgICAgIGFkZENvbGxlY3Rpb24obW9uZXlQYXJhbXMpLnRoZW4ocmVzID0+IHsgdGhpcy5jb21tb25GbihyZXMpIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGFkZENpcmNsZXMoY2lyY2xlUGFyYW1zKS50aGVuKHJlcyA9PiB7IHRoaXMuY29tbW9uRm4ocmVzKSB9KVxuICAgIH1cbiAgfVxuICBzYXZlQWN0aXZpdHkoY29tbW9uUGFyYW1zKSB7XG4gICAgaWYgKCF0aGlzLmFjdGl2aXR5TGlzdC5sZW5ndGgpIHtcbiAgICAgIHNob3dNc2coJ+ivt+iHs+Wwkea3u+WKoOS4gOS4qua0u+WKqOmAiemhuScpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgcGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zLCB7XG4gICAgICBzZWxlY3RUeXBlOiB0aGlzLmFjdGl2aXR5Sm9pblR5cGVbdGhpcy5hY3Rpdml0eVR5cGVdLnR5cGUsXG4gICAgICBzaWduX3R5cGU6ICdhbGwnLFxuICAgICAgaXRlbTogdGhpcy5hY3Rpdml0eUxpc3QsXG4gICAgICBpbWdfdXJsOiB0aGlzLmltZ1xuICAgIH0pXG4gICAgYWRkQWN0aXZpdHkocGFyYW1zKS50aGVuKHJlcyA9PiB7IHRoaXMuY29tbW9uRm4ocmVzKX0pXG4gIH1cbiAgc2F2ZU5vdGljZShjb21tb25QYXJhbXMpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMsIHtcbiAgICAgIHJlbWluZDogTnVtYmVyKHRoaXMuaXNSZW1pbmQpXG4gICAgfSlcbiAgICBhZGROb3RpZnkocGFyYW1zKS50aGVuKHJlcyA9PiB7IHRoaXMuY29tbW9uRm4ocmVzKSB9KVxuICB9XG4gIGNoZWNrUmVwZWF0KHZhbHVlLCBhcnIpIHtcbiAgICBsZXQgcmV0VmFsdWUgPSBmYWxzZVxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhcnIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmIChhcnJbaV0ubmFtZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgcmV0VmFsdWUgPSB0cnVlXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICByZXRWYWx1ZSA9IGZhbHNlXG4gICAgfVxuICAgIHJldHVybiByZXRWYWx1ZVxuICB9XG4gIHdhdGNoID0ge1xuICAgIG1zZyAobmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgIGlmICghaXNFbXB0eVN0cmluZyhuZXdWYWwpKSB7XG4gICAgICAgIHRoaXMuY2FuU3VibWl0ID0gdHJ1ZVxuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuICBtZXRob2RzID0ge1xuICAgIHNlbGVjdFNlZVR5cGUoaWQpIHtcbiAgICAgIHRoaXMuc2VlVHlwZSA9IGlkXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBjaG9vc2VJbWFnZSgpIHtcbiAgICAgIGlmICh0aGlzLmltZy5sZW5ndGggPiB0aGlzLm1heFBob3RvQ291bnQpIHtcbiAgICAgICAgc2hvd01zZygn5pyA5aSa5LiK5LygOeW8oOWbvicpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgbGV0IF90aGlzID0gdGhpc1xuICAgICAgd3guY2hvb3NlSW1hZ2Uoe1xuICAgICAgICBjb3VudDogdGhpcy5tYXhQaG90b0NvdW50LFxuICAgICAgICBzaXplVHlwZTogWydvcmlnaW5hbCcsICdjb21wcmVzc2VkJ10sXG4gICAgICAgIHNvdXJjZVR5cGU6IFsnYWxidW0nLCAnY2FtZXJhJ10sXG4gICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuaW1nLmxlbmd0aCArIHJlcy50ZW1wRmlsZVBhdGhzLmxlbmd0aCA+IHRoaXMubWF4UGhvdG9Db3VudCkge1xuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfmnIDlpJrlj6rog73pgInmi6knICsgdGhpcy5tYXhQaG90b0NvdW50ICsgJ+W8oOWbvueJhycsXG4gICAgICAgICAgICAgIGljb246ICdub25lJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzLnRlbXBGaWxlUGF0aHMuZm9yRWFjaChwYXRoID0+IHtcbiAgICAgICAgICAgIGxldCB1cGxvYWQgPSB7fVxuICAgICAgICAgICAgdXBsb2FkLnBhdGggPSBwYXRoXG4gICAgICAgICAgICB1cGxvYWQuZXJyb3IgPSBmYWxzZVxuICAgICAgICAgICAgdXBsb2FkLnVwbG9hZFByb2dyZXNzID0gd3gudXBsb2FkRmlsZSh7XG4gICAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vdGVzdC5jdGp3aC5jb20vYXBpL3YxL2ZpbGUvdXBsb2FkUGljJyxcbiAgICAgICAgICAgICAgZmlsZVBhdGg6IHBhdGgsXG4gICAgICAgICAgICAgIGZvcm1EYXRhOiB7XG4gICAgICAgICAgICAgICAgJ21lbWJlcl9pZCc6IHRoaXMubWVtYmVySW5mby5tZW1iZXJfaWQsXG4gICAgICAgICAgICAgICAgJ21lbWJlcl90b2tlbic6IHRoaXMubWVtYmVySW5mby5tZW1iZXJfdG9rZW4sXG4gICAgICAgICAgICAgICAgJ2ZvbGRlcic6ICdjb21taXR0ZWUnXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSlcbiAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBkYXRhLmRhdGEuZmlsZV91cmxcbiAgICAgICAgICAgICAgICBfdGhpcy5pbWcucHVzaCh1cmwpXG4gICAgICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHVwbG9hZC51cGxvYWRQcm9ncmVzcy5vblByb2dyZXNzVXBkYXRlKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICB1cGxvYWQucHJvZ3Jlc3MgPSByZXMucHJvZ3Jlc3NcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBfdGhpcy51cGxvYWRzLnB1c2godXBsb2FkKVxuICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgc3VibWl0KCkge1xuICAgICAgaWYgKCF0aGlzLmNhblN1Ym1pdCkge1xuICAgICAgICBzaG93TXNnKCfor7fmo4Dmn6Xlj5HluIPlhoXlrrkhJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB0aGlzLmNoZWNrQ2FuU3VibWl0KClcbiAgICAgIGNvbnN0IGNvbW1vblBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIHtcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgICB0eXBlOiB0aGlzLnNlZW5JbmRleCxcbiAgICAgICAgZGVzYzogdGhpcy5tc2dcbiAgICAgIH0pXG4gICAgICBpZiAodGhpcy5hY3RpdmVUeXBlID09PSAnem9uZScgfHwgdGhpcy5hY3RpdmVUeXBlID09PSAnbW9uZXknKSB7XG4gICAgICAgIHRoaXMuc2F2ZUNpcmNsZXMoY29tbW9uUGFyYW1zLCB0aGlzLmFjdGl2ZVR5cGUpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuYWN0aXZlVHlwZSA9PT0gJ2FjdGl2aXR5Jykge1xuICAgICAgICB0aGlzLnNhdmVBY3Rpdml0eShjb21tb25QYXJhbXMpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuYWN0aXZlVHlwZSA9PT0gJ25vdGljZScpIHtcbiAgICAgICAgdGhpcy5zYXZlTm90aWNlKGNvbW1vblBhcmFtcylcbiAgICAgIH1cbiAgICB9LFxuICAgIGNhbmNlbCgpIHtcbiAgICAgIHRoaXMuc2hvd0FkZEFjdGl2aXR5ID0gZmFsc2VcbiAgICAgIHRoaXMuc2hvd0FkZE1vbmV5ID0gZmFsc2VcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIHN1cmUodmFsdWUpIHtcbiAgICAgIGlmICh0aGlzLmNoZWNrUmVwZWF0KHZhbHVlLCB0aGlzLmFjdGl2aXR5TGlzdCkpIHtcbiAgICAgICAgc2hvd01zZygn6K+35LiN6KaB6L6T5YWl6YeN5aSN55qE5rS75Yqo6aG555uuJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBjb25zdCBvYmogPSB7XG4gICAgICAgIG5hbWU6IHZhbHVlXG4gICAgICB9XG4gICAgICB0aGlzLmFjdGl2aXR5TGlzdC5wdXNoKG9iailcbiAgICAgIHRoaXMuc2hvd0FkZEFjdGl2aXR5ID0gZmFsc2VcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIG1vbmV5U3VyZUZuKHZhbHVlMSwgdmFsdWUyKSB7XG4gICAgICBjb25zdCBvYmogPSB7XG4gICAgICAgIG5hbWU6IHZhbHVlMSxcbiAgICAgICAgbW9uZXk6IHZhbHVlMlxuICAgICAgfVxuICAgICAgdGhpcy5tb25leUxpc3QucHVzaChvYmopXG4gICAgICB0aGlzLnNob3dBZGRNb25leSA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBhZGROZXcoZmxhZykge1xuICAgICAgdGhpc1tmbGFnXSA9IHRydWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGRlbGV0ZUZuIChhcnIsIGluZGV4KSB7XG4gICAgICB0aGlzW2Fycl0uc3BsaWNlKGluZGV4LCAxKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgYmluZENoYW5nZShlKSB7XG4gICAgICB0aGlzW2UuY3VycmVudFRhcmdldC5pZF0gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxufVxuIl19