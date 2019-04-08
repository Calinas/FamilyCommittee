'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _wepyRedux = require('./../npm/wepy-redux/lib/index.js');

var _actions = require('./../store/actions/index.js');

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

var store = (0, _wepyRedux.getStore)();

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
    }, _this2.$repeat = {}, _this2.$props = { "Modal": { "sureBtnText": "添加完成", "cancelBtnText": "再添加一项", "placeholderText": "请输入您想新增的活动项目名", "xmlns:v-bind": "", "v-bind:flag.sync": "showAddActivity", "xmlns:v-on": "" }, "Modal2": { "sureBtnText": "添加完成", "cancelBtnText": "再添加一项", "placeholderText": "收款选项名", "placeholderText2": "金额", "v-bind:flag.sync": "showAddMoney" } }, _this2.$events = { "Modal": { "v-on:cancel": "cancel", "v-on:sure": "sure" }, "Modal2": { "v-on:cancel": "cancel", "v-on:sure": "moneySureFn" } }, _this2.components = {
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
      isRemind: 1,
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
            var length = res.tempFilePaths.length;
            var tempArr = [];
            if (_this3.img.length + length > _this3.maxPhotoCount) {
              wx.showToast({
                title: '最多只能选择' + _this3.maxPhotoCount + '张图片',
                icon: 'none'
              });
            }
            wx.showLoading({ title: '图片上传中' });
            res.tempFilePaths.forEach(function (path) {
              var upload = {};
              upload.path = path;
              upload.error = false;
              upload.uploadProgress = wx.uploadFile({
                url: _this.$parent.globalData.apiUrl + '/file/uploadPic',
                filePath: path,
                formData: {
                  'member_id': _this3.memberInfo.member_id,
                  'member_token': _this3.memberInfo.member_token,
                  'folder': 'committee'
                },
                name: 'file',
                success: function success(res) {
                  var data = JSON.parse(res.data);
                  if (data.data && data.data.file_url) {
                    var url = data.data.file_url;
                    tempArr.push(url);
                    _this.img.push(url);
                  }
                  if (tempArr.length === length) {
                    setTimeout(function () {
                      wx.hideLoading();
                    }, 1000);
                  }
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
        // if (!this.canSubmit) {
        //   showMsg('请检查发布内容!')
        //   return
        // }
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
      sure: function sure(value, type) {
        if (this.checkRepeat(value, this.activityList)) {
          (0, _common.showMsg)('请不要输入重复的活动项目');
          return;
        }
        var obj = {
          name: value
        };
        this.activityList.push(obj);
        if (type === 'save') {
          this.showAddActivity = false;
        }
        this.$apply();
      },
      moneySureFn: function moneySureFn(value1, value2, type) {
        var obj = {
          name: value1,
          money: value2
        };
        this.moneyList.push(obj);
        if (type === 'save') {
          this.showAddMoney = false;
        }
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
        (0, _actions.setFromPublish)(true);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2guanMiXSwibmFtZXMiOlsic3RvcmUiLCJQdWJsaXNoIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIk1vZGFsIiwiTW9kYWwyIiwiZGF0YSIsInNob3dBZGRBY3Rpdml0eSIsInNob3dBZGRNb25leSIsIm1zZyIsImltZyIsInNlZVR5cGUiLCJhY3Rpdml0eVR5cGUiLCJhY3Rpdml0eUpvaW5UeXBlIiwiaWQiLCJ0aXRsZSIsInR5cGUiLCJyZW1pbmRUeXBlIiwidHlwZUxpc3QiLCJ6b25lIiwibm90aWNlIiwiYWN0aXZpdHkiLCJtb25leSIsInBsYWNlaG9sZGVyIiwiYWN0aXZlVHlwZSIsImFjdGl2aXR5TGlzdCIsImNhblN1Ym1pdCIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJpc1JlbWluZCIsIm1vbmV5TGlzdCIsIm1heFBob3RvQ291bnQiLCJ1cGxvYWRzIiwib25Mb2FkIiwiZSIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCIkYXBwbHkiLCJ3YXRjaCIsIm5ld1ZhbCIsIm9sZFZhbCIsIm1ldGhvZHMiLCJzZWxlY3RTZWVUeXBlIiwiY2hvb3NlSW1hZ2UiLCJsZW5ndGgiLCJfdGhpcyIsImNvdW50Iiwic2l6ZVR5cGUiLCJzb3VyY2VUeXBlIiwic3VjY2VzcyIsInJlcyIsInRlbXBGaWxlUGF0aHMiLCJ0ZW1wQXJyIiwic2hvd1RvYXN0IiwiaWNvbiIsInNob3dMb2FkaW5nIiwiZm9yRWFjaCIsInVwbG9hZCIsInBhdGgiLCJlcnJvciIsInVwbG9hZFByb2dyZXNzIiwidXBsb2FkRmlsZSIsInVybCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiYXBpVXJsIiwiZmlsZVBhdGgiLCJmb3JtRGF0YSIsIm1lbWJlcl9pZCIsIm1lbWJlcl90b2tlbiIsIm5hbWUiLCJKU09OIiwicGFyc2UiLCJmaWxlX3VybCIsInB1c2giLCJzZXRUaW1lb3V0IiwiaGlkZUxvYWRpbmciLCJvblByb2dyZXNzVXBkYXRlIiwicHJvZ3Jlc3MiLCJzdWJtaXQiLCJjaGVja0NhblN1Ym1pdCIsImNvbW1vblBhcmFtcyIsIk9iamVjdCIsImFzc2lnbiIsImNsYXNzX2lkIiwic2VlbkluZGV4IiwiZGVzYyIsInNhdmVDaXJjbGVzIiwic2F2ZUFjdGl2aXR5Iiwic2F2ZU5vdGljZSIsImNhbmNlbCIsInN1cmUiLCJ2YWx1ZSIsImNoZWNrUmVwZWF0Iiwib2JqIiwibW9uZXlTdXJlRm4iLCJ2YWx1ZTEiLCJ2YWx1ZTIiLCJhZGROZXciLCJmbGFnIiwiZGVsZXRlRm4iLCJhcnIiLCJpbmRleCIsInNwbGljZSIsImJpbmRDaGFuZ2UiLCJjdXJyZW50VGFyZ2V0IiwiZGV0YWlsIiwibmF2aWdhdGVCYWNrIiwicGFyYW1zIiwiaW1nX3VybCIsImNpcmNsZVBhcmFtcyIsInNlZV90eXBlIiwibW9uZXlQYXJhbXMiLCJpdGVtIiwidGhlbiIsImNvbW1vbkZuIiwic2VsZWN0VHlwZSIsInNpZ25fdHlwZSIsInJlbWluZCIsIk51bWJlciIsInJldFZhbHVlIiwiaSIsImxlbiIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztBQUVBLElBQUlBLFFBQVEsMEJBQVo7O0lBRXFCQyxPOzs7Ozs7Ozs7Ozs7OzsyTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdWQyxPLEdBQVUsRSxTQUNYQyxNLEdBQVMsRUFBQyxTQUFRLEVBQUMsZUFBYyxNQUFmLEVBQXNCLGlCQUFnQixPQUF0QyxFQUE4QyxtQkFBa0IsZUFBaEUsRUFBZ0YsZ0JBQWUsRUFBL0YsRUFBa0csb0JBQW1CLGlCQUFySCxFQUF1SSxjQUFhLEVBQXBKLEVBQVQsRUFBaUssVUFBUyxFQUFDLGVBQWMsTUFBZixFQUFzQixpQkFBZ0IsT0FBdEMsRUFBOEMs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LEVBQU9TLEcsRUFBSztBQUN0QixVQUFJbUIsV0FBVyxLQUFmO0FBQ0EsV0FBSyxJQUFJQyxJQUFJLENBQVIsRUFBV0MsTUFBTXJCLElBQUl6RCxNQUExQixFQUFrQzZFLElBQUlDLEdBQXRDLEVBQTJDRCxHQUEzQyxFQUFnRDtBQUM5QyxZQUFJcEIsSUFBSW9CLENBQUosRUFBT25ELElBQVAsS0FBZ0JzQixLQUFwQixFQUEyQjtBQUN6QjRCLHFCQUFXLElBQVg7QUFDQTtBQUNEO0FBQ0RBLG1CQUFXLEtBQVg7QUFDRDtBQUNELGFBQU9BLFFBQVA7QUFDRDs7OztFQXZKa0NHLGVBQUtDLEk7O2tCQUFyQmhJLE8iLCJmaWxlIjoicHVibGlzaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7IGNvbm5lY3QsIGdldFN0b3JlIH0gZnJvbSAnd2VweS1yZWR1eCdcbmltcG9ydCB7IHNldEZyb21QdWJsaXNoIH0gZnJvbSAnLi4vc3RvcmUvYWN0aW9ucydcbmltcG9ydCBNb2RhbCBmcm9tICcuLi9jb21wb25lbnRzL21vZGFsJ1xuaW1wb3J0IE1vZGFsMiBmcm9tICcuLi9jb21wb25lbnRzL21vZGFsMidcbmltcG9ydCB7IHNob3dNc2csIGlzRW1wdHlTdHJpbmcsIHVwbG9hZEltYWdlIH0gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xuaW1wb3J0IHsgYWRkQ2lyY2xlcywgYWRkQ29sbGVjdGlvbiwgYWRkQWN0aXZpdHksIGFkZE5vdGlmeSB9IGZyb20gJy4uL2FwaS96b25lJ1xuXG5sZXQgc3RvcmUgPSBnZXRTdG9yZSgpXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB1Ymxpc2ggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WPkeW4gydcbiAgfVxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiTW9kYWxcIjp7XCJzdXJlQnRuVGV4dFwiOlwi5re75Yqg5a6M5oiQXCIsXCJjYW5jZWxCdG5UZXh0XCI6XCLlho3mt7vliqDkuIDpoblcIixcInBsYWNlaG9sZGVyVGV4dFwiOlwi6K+36L6T5YWl5oKo5oOz5paw5aKe55qE5rS75Yqo6aG555uu5ZCNXCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmZsYWcuc3luY1wiOlwic2hvd0FkZEFjdGl2aXR5XCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJNb2RhbDJcIjp7XCJzdXJlQnRuVGV4dFwiOlwi5re75Yqg5a6M5oiQXCIsXCJjYW5jZWxCdG5UZXh0XCI6XCLlho3mt7vliqDkuIDpoblcIixcInBsYWNlaG9sZGVyVGV4dFwiOlwi5pS25qy+6YCJ6aG55ZCNXCIsXCJwbGFjZWhvbGRlclRleHQyXCI6XCLph5Hpop1cIixcInYtYmluZDpmbGFnLnN5bmNcIjpcInNob3dBZGRNb25leVwifX07XHJcbiRldmVudHMgPSB7XCJNb2RhbFwiOntcInYtb246Y2FuY2VsXCI6XCJjYW5jZWxcIixcInYtb246c3VyZVwiOlwic3VyZVwifSxcIk1vZGFsMlwiOntcInYtb246Y2FuY2VsXCI6XCJjYW5jZWxcIixcInYtb246c3VyZVwiOlwibW9uZXlTdXJlRm5cIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICBNb2RhbCxcbiAgICBNb2RhbDJcbiAgfVxuICBkYXRhID0ge1xuICAgIHNob3dBZGRBY3Rpdml0eTogZmFsc2UsXG4gICAgc2hvd0FkZE1vbmV5OiBmYWxzZSxcbiAgICBtc2c6ICcnLFxuICAgIGltZzogW10sXG4gICAgc2VlVHlwZTogMCxcbiAgICBhY3Rpdml0eVR5cGU6IDAsXG4gICAgYWN0aXZpdHlKb2luVHlwZTogW1xuICAgICAge1xuICAgICAgICBpZDogMCxcbiAgICAgICAgdGl0bGU6ICfljZXpgIknLFxuICAgICAgICB0eXBlOiAncmFkaW8nXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogMSxcbiAgICAgICAgdGl0bGU6ICflpJrpgIknLFxuICAgICAgICB0eXBlOiAnc2VsZWN0J1xuICAgICAgfVxuICAgIF0sXG4gICAgcmVtaW5kVHlwZTogW1xuICAgICAge1xuICAgICAgICBpZDogMCxcbiAgICAgICAgdGl0bGU6ICflkKYnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogMSxcbiAgICAgICAgdGl0bGU6ICfmmK8nXG4gICAgICB9XG4gICAgXSxcbiAgICB0eXBlOiBbXG4gICAgICB7XG4gICAgICAgIGlkOiAwLFxuICAgICAgICB0aXRsZTogJ+ePree6p+WPr+ingScsXG4gICAgICAgIHR5cGU6ICdjbGFzcydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAxLFxuICAgICAgICB0aXRsZTogJ+WFqOmDqOWPr+ingScsXG4gICAgICAgIHR5cGU6ICdhbGwnXG4gICAgICB9XG4gICAgXSxcbiAgICB0eXBlTGlzdDoge1xuICAgICAgem9uZTogJ+WutumVv+WciCcsXG4gICAgICBub3RpY2U6ICfpgJrnn6UnLFxuICAgICAgYWN0aXZpdHk6ICfmtLvliqgnLFxuICAgICAgbW9uZXk6ICfmlLbmrL4nXG4gICAgfSxcbiAgICBwbGFjZWhvbGRlcjogJ+ivt+WcqOatpOWPkeihqOaCqOeahOaEn+aDsycsXG4gICAgYWN0aXZlVHlwZTogJ3pvbmUnLFxuICAgIGFjdGl2aXR5TGlzdDogW10sXG4gICAgY2FuU3VibWl0OiBmYWxzZSxcbiAgICBtZW1iZXJJbmZvOiBudWxsLFxuICAgIGNsYXNzSW5mbzogbnVsbCxcbiAgICBtb25leTogJycsXG4gICAgaXNSZW1pbmQ6IDEsXG4gICAgbW9uZXlMaXN0OiBbXSxcbiAgICBtYXhQaG90b0NvdW50OiA5LFxuICAgIHVwbG9hZHM6IFtdXG4gIH1cbiAgY29tbW9uRm4ocmVzKSB7XG4gICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgIHNldEZyb21QdWJsaXNoKHRydWUpXG4gICAgICBzaG93TXNnKCflj5HluIPmiJDlip8nLCAyMDAwKVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHd4Lm5hdmlnYXRlQmFjaygpXG4gICAgICB9LCAyMDAwKVxuICAgIH1cbiAgfVxuICBvbkxvYWQgPSAoZSkgPT4ge1xuICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXG4gICAgdGhpcy5tZW1iZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nKVxuICAgIGNvbnN0IHR5cGUgPSBlLnR5cGVcbiAgICB3eC5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe1xuICAgICAgdGl0bGU6IGDlj5HluIMke3RoaXMudHlwZUxpc3RbdHlwZV19YFxuICAgIH0pXG4gICAgaWYgKHR5cGUgIT09ICd6b25lJykge1xuICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IGDor7flnKjmraTlvZXlhaXmgqjnmoQke3RoaXMudHlwZUxpc3RbdHlwZV196K+m5oOFYFxuICAgIH1cbiAgICB0aGlzLmFjdGl2ZVR5cGUgPSB0eXBlXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIGNoZWNrQ2FuU3VibWl0KCkge1xuICAgIGNvbnN0IG1zZyA9IGDor7floavlhpnmgqjnmoQke3RoaXMudHlwZUxpc3RbdGhpcy5hY3RpdmVUeXBlXX3mj4/ov7Dor6bmg4VgXG4gICAgaWYgKGlzRW1wdHlTdHJpbmcodGhpcy5tc2cpKSB7XG4gICAgICBzaG93TXNnKG1zZylcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlXG4gIH1cbiAgc2F2ZUNpcmNsZXMoY29tbW9uUGFyYW1zLCB0eXBlKSB7XG4gICAgY29uc3QgcGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zLCB7XG4gICAgICBpbWdfdXJsOiB0aGlzLmltZ1xuICAgIH0pXG4gICAgY29uc3QgY2lyY2xlUGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgcGFyYW1zLCB7XG4gICAgICBzZWVfdHlwZTogdGhpcy50eXBlW3RoaXMuc2VlVHlwZV0udHlwZVxuICAgIH0pXG4gICAgaWYgKHR5cGUgPT09ICdtb25leScpIHtcbiAgICAgIGlmICghdGhpcy5tb25leUxpc3QubGVuZ3RoKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+iHs+Wwkea3u+WKoOS4gOS4quaUtuasvuadoeebricpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgY29uc3QgbW9uZXlQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBwYXJhbXMsIHtcbiAgICAgICAgaXRlbTogdGhpcy5tb25leUxpc3QsXG4gICAgICAgIHR5cGU6ICdzdHVkZW50J1xuICAgICAgfSlcbiAgICAgIGFkZENvbGxlY3Rpb24obW9uZXlQYXJhbXMpLnRoZW4ocmVzID0+IHsgdGhpcy5jb21tb25GbihyZXMpIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGFkZENpcmNsZXMoY2lyY2xlUGFyYW1zKS50aGVuKHJlcyA9PiB7IHRoaXMuY29tbW9uRm4ocmVzKSB9KVxuICAgIH1cbiAgfVxuICBzYXZlQWN0aXZpdHkoY29tbW9uUGFyYW1zKSB7XG4gICAgaWYgKCF0aGlzLmFjdGl2aXR5TGlzdC5sZW5ndGgpIHtcbiAgICAgIHNob3dNc2coJ+ivt+iHs+Wwkea3u+WKoOS4gOS4qua0u+WKqOmAiemhuScpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgcGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zLCB7XG4gICAgICBzZWxlY3RUeXBlOiB0aGlzLmFjdGl2aXR5Sm9pblR5cGVbdGhpcy5hY3Rpdml0eVR5cGVdLnR5cGUsXG4gICAgICBzaWduX3R5cGU6ICdhbGwnLFxuICAgICAgaXRlbTogdGhpcy5hY3Rpdml0eUxpc3QsXG4gICAgICBpbWdfdXJsOiB0aGlzLmltZ1xuICAgIH0pXG4gICAgYWRkQWN0aXZpdHkocGFyYW1zKS50aGVuKHJlcyA9PiB7IHRoaXMuY29tbW9uRm4ocmVzKX0pXG4gIH1cbiAgc2F2ZU5vdGljZShjb21tb25QYXJhbXMpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMsIHtcbiAgICAgIHJlbWluZDogTnVtYmVyKHRoaXMuaXNSZW1pbmQpXG4gICAgfSlcbiAgICBhZGROb3RpZnkocGFyYW1zKS50aGVuKHJlcyA9PiB7IHRoaXMuY29tbW9uRm4ocmVzKSB9KVxuICB9XG4gIGNoZWNrUmVwZWF0KHZhbHVlLCBhcnIpIHtcbiAgICBsZXQgcmV0VmFsdWUgPSBmYWxzZVxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhcnIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmIChhcnJbaV0ubmFtZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgcmV0VmFsdWUgPSB0cnVlXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICByZXRWYWx1ZSA9IGZhbHNlXG4gICAgfVxuICAgIHJldHVybiByZXRWYWx1ZVxuICB9XG4gIHdhdGNoID0ge1xuICAgIG1zZyAobmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgIGlmICghaXNFbXB0eVN0cmluZyhuZXdWYWwpKSB7XG4gICAgICAgIHRoaXMuY2FuU3VibWl0ID0gdHJ1ZVxuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuICBtZXRob2RzID0ge1xuICAgIHNlbGVjdFNlZVR5cGUoaWQpIHtcbiAgICAgIHRoaXMuc2VlVHlwZSA9IGlkXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBjaG9vc2VJbWFnZSgpIHtcbiAgICAgIGlmICh0aGlzLmltZy5sZW5ndGggPiB0aGlzLm1heFBob3RvQ291bnQpIHtcbiAgICAgICAgc2hvd01zZygn5pyA5aSa5LiK5LygOeW8oOWbvicpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgbGV0IF90aGlzID0gdGhpc1xuICAgICAgd3guY2hvb3NlSW1hZ2Uoe1xuICAgICAgICBjb3VudDogdGhpcy5tYXhQaG90b0NvdW50LFxuICAgICAgICBzaXplVHlwZTogWydvcmlnaW5hbCcsICdjb21wcmVzc2VkJ10sXG4gICAgICAgIHNvdXJjZVR5cGU6IFsnYWxidW0nLCAnY2FtZXJhJ10sXG4gICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgY29uc3QgbGVuZ3RoID0gcmVzLnRlbXBGaWxlUGF0aHMubGVuZ3RoXG4gICAgICAgICAgbGV0IHRlbXBBcnIgPSBbXVxuICAgICAgICAgIGlmICh0aGlzLmltZy5sZW5ndGggKyBsZW5ndGggPiB0aGlzLm1heFBob3RvQ291bnQpIHtcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn5pyA5aSa5Y+q6IO96YCJ5oupJyArIHRoaXMubWF4UGhvdG9Db3VudCArICflvKDlm77niYcnLFxuICAgICAgICAgICAgICBpY29uOiAnbm9uZSdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHt0aXRsZTogJ+WbvueJh+S4iuS8oOS4rSd9KVxuICAgICAgICAgIHJlcy50ZW1wRmlsZVBhdGhzLmZvckVhY2gocGF0aCA9PiB7XG4gICAgICAgICAgICBsZXQgdXBsb2FkID0ge31cbiAgICAgICAgICAgIHVwbG9hZC5wYXRoID0gcGF0aFxuICAgICAgICAgICAgdXBsb2FkLmVycm9yID0gZmFsc2VcbiAgICAgICAgICAgIHVwbG9hZC51cGxvYWRQcm9ncmVzcyA9IHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICAgICAgICB1cmw6IGAke190aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5hcGlVcmx9L2ZpbGUvdXBsb2FkUGljYCxcbiAgICAgICAgICAgICAgZmlsZVBhdGg6IHBhdGgsXG4gICAgICAgICAgICAgIGZvcm1EYXRhOiB7XG4gICAgICAgICAgICAgICAgJ21lbWJlcl9pZCc6IHRoaXMubWVtYmVySW5mby5tZW1iZXJfaWQsXG4gICAgICAgICAgICAgICAgJ21lbWJlcl90b2tlbic6IHRoaXMubWVtYmVySW5mby5tZW1iZXJfdG9rZW4sXG4gICAgICAgICAgICAgICAgJ2ZvbGRlcic6ICdjb21taXR0ZWUnXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSlcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5kYXRhICYmIGRhdGEuZGF0YS5maWxlX3VybCkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgdXJsID0gZGF0YS5kYXRhLmZpbGVfdXJsXG4gICAgICAgICAgICAgICAgICB0ZW1wQXJyLnB1c2godXJsKVxuICAgICAgICAgICAgICAgICAgX3RoaXMuaW1nLnB1c2godXJsKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGVtcEFyci5sZW5ndGggPT09IGxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICAgICAgICAgIH0sIDEwMDApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB1cGxvYWQudXBsb2FkUHJvZ3Jlc3Mub25Qcm9ncmVzc1VwZGF0ZShmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgdXBsb2FkLnByb2dyZXNzID0gcmVzLnByb2dyZXNzXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgX3RoaXMudXBsb2Fkcy5wdXNoKHVwbG9hZClcbiAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIHN1Ym1pdCgpIHtcbiAgICAgIC8vIGlmICghdGhpcy5jYW5TdWJtaXQpIHtcbiAgICAgIC8vICAgc2hvd01zZygn6K+35qOA5p+l5Y+R5biD5YaF5a65IScpXG4gICAgICAvLyAgIHJldHVyblxuICAgICAgLy8gfVxuICAgICAgdGhpcy5jaGVja0NhblN1Ym1pdCgpXG4gICAgICBjb25zdCBjb21tb25QYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCB7XG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgICAgdHlwZTogdGhpcy5zZWVuSW5kZXgsXG4gICAgICAgIGRlc2M6IHRoaXMubXNnXG4gICAgICB9KVxuICAgICAgaWYgKHRoaXMuYWN0aXZlVHlwZSA9PT0gJ3pvbmUnIHx8IHRoaXMuYWN0aXZlVHlwZSA9PT0gJ21vbmV5Jykge1xuICAgICAgICB0aGlzLnNhdmVDaXJjbGVzKGNvbW1vblBhcmFtcywgdGhpcy5hY3RpdmVUeXBlKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLmFjdGl2ZVR5cGUgPT09ICdhY3Rpdml0eScpIHtcbiAgICAgICAgdGhpcy5zYXZlQWN0aXZpdHkoY29tbW9uUGFyYW1zKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLmFjdGl2ZVR5cGUgPT09ICdub3RpY2UnKSB7XG4gICAgICAgIHRoaXMuc2F2ZU5vdGljZShjb21tb25QYXJhbXMpXG4gICAgICB9XG4gICAgfSxcbiAgICBjYW5jZWwoKSB7XG4gICAgICB0aGlzLnNob3dBZGRBY3Rpdml0eSA9IGZhbHNlXG4gICAgICB0aGlzLnNob3dBZGRNb25leSA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBzdXJlKHZhbHVlLCB0eXBlKSB7XG4gICAgICBpZiAodGhpcy5jaGVja1JlcGVhdCh2YWx1ZSwgdGhpcy5hY3Rpdml0eUxpc3QpKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+S4jeimgei+k+WFpemHjeWkjeeahOa0u+WKqOmhueebricpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgY29uc3Qgb2JqID0ge1xuICAgICAgICBuYW1lOiB2YWx1ZVxuICAgICAgfVxuICAgICAgdGhpcy5hY3Rpdml0eUxpc3QucHVzaChvYmopXG4gICAgICBpZiAodHlwZSA9PT0gJ3NhdmUnKSB7XG4gICAgICAgIHRoaXMuc2hvd0FkZEFjdGl2aXR5ID0gZmFsc2VcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIG1vbmV5U3VyZUZuKHZhbHVlMSwgdmFsdWUyLCB0eXBlKSB7XG4gICAgICBjb25zdCBvYmogPSB7XG4gICAgICAgIG5hbWU6IHZhbHVlMSxcbiAgICAgICAgbW9uZXk6IHZhbHVlMlxuICAgICAgfVxuICAgICAgdGhpcy5tb25leUxpc3QucHVzaChvYmopXG4gICAgICBpZiAodHlwZSA9PT0gJ3NhdmUnKSB7XG4gICAgICAgIHRoaXMuc2hvd0FkZE1vbmV5ID0gZmFsc2VcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGFkZE5ldyhmbGFnKSB7XG4gICAgICB0aGlzW2ZsYWddID0gdHJ1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgZGVsZXRlRm4gKGFyciwgaW5kZXgpIHtcbiAgICAgIHRoaXNbYXJyXS5zcGxpY2UoaW5kZXgsIDEpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBiaW5kQ2hhbmdlKGUpIHtcbiAgICAgIHRoaXNbZS5jdXJyZW50VGFyZ2V0LmlkXSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG59XG4iXX0=