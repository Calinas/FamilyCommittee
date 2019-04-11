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
                url: _wepy2.default.$appConfig.baseUrl + '/file/uploadPic',
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2guanMiXSwibmFtZXMiOlsic3RvcmUiLCJQdWJsaXNoIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIk1vZGFsIiwiTW9kYWwyIiwiZGF0YSIsInNob3dBZGRBY3Rpdml0eSIsInNob3dBZGRNb25leSIsIm1zZyIsImltZyIsInNlZVR5cGUiLCJhY3Rpdml0eVR5cGUiLCJhY3Rpdml0eUpvaW5UeXBlIiwiaWQiLCJ0aXRsZSIsInR5cGUiLCJyZW1pbmRUeXBlIiwidHlwZUxpc3QiLCJ6b25lIiwibm90aWNlIiwiYWN0aXZpdHkiLCJtb25leSIsInBsYWNlaG9sZGVyIiwiYWN0aXZlVHlwZSIsImFjdGl2aXR5TGlzdCIsImNhblN1Ym1pdCIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJpc1JlbWluZCIsIm1vbmV5TGlzdCIsIm1heFBob3RvQ291bnQiLCJ1cGxvYWRzIiwib25Mb2FkIiwiZSIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCIkYXBwbHkiLCJ3YXRjaCIsIm5ld1ZhbCIsIm9sZFZhbCIsIm1ldGhvZHMiLCJzZWxlY3RTZWVUeXBlIiwiY2hvb3NlSW1hZ2UiLCJsZW5ndGgiLCJfdGhpcyIsImNvdW50Iiwic2l6ZVR5cGUiLCJzb3VyY2VUeXBlIiwic3VjY2VzcyIsInJlcyIsInRlbXBGaWxlUGF0aHMiLCJ0ZW1wQXJyIiwic2hvd1RvYXN0IiwiaWNvbiIsInNob3dMb2FkaW5nIiwiZm9yRWFjaCIsInVwbG9hZCIsInBhdGgiLCJlcnJvciIsInVwbG9hZFByb2dyZXNzIiwidXBsb2FkRmlsZSIsInVybCIsIndlcHkiLCIkYXBwQ29uZmlnIiwiYmFzZVVybCIsImZpbGVQYXRoIiwiZm9ybURhdGEiLCJtZW1iZXJfaWQiLCJtZW1iZXJfdG9rZW4iLCJuYW1lIiwiSlNPTiIsInBhcnNlIiwiZmlsZV91cmwiLCJwdXNoIiwic2V0VGltZW91dCIsImhpZGVMb2FkaW5nIiwib25Qcm9ncmVzc1VwZGF0ZSIsInByb2dyZXNzIiwic3VibWl0IiwiY2hlY2tDYW5TdWJtaXQiLCJjb21tb25QYXJhbXMiLCJPYmplY3QiLCJhc3NpZ24iLCJjbGFzc19pZCIsInNlZW5JbmRleCIsImRlc2MiLCJzYXZlQ2lyY2xlcyIsInNhdmVBY3Rpdml0eSIsInNhdmVOb3RpY2UiLCJjYW5jZWwiLCJzdXJlIiwidmFsdWUiLCJjaGVja1JlcGVhdCIsIm9iaiIsIm1vbmV5U3VyZUZuIiwidmFsdWUxIiwidmFsdWUyIiwiYWRkTmV3IiwiZmxhZyIsImRlbGV0ZUZuIiwiYXJyIiwiaW5kZXgiLCJzcGxpY2UiLCJiaW5kQ2hhbmdlIiwiY3VycmVudFRhcmdldCIsImRldGFpbCIsIm5hdmlnYXRlQmFjayIsInBhcmFtcyIsImltZ191cmwiLCJjaXJjbGVQYXJhbXMiLCJzZWVfdHlwZSIsIm1vbmV5UGFyYW1zIiwiaXRlbSIsInRoZW4iLCJjb21tb25GbiIsInNlbGVjdFR5cGUiLCJzaWduX3R5cGUiLCJyZW1pbmQiLCJOdW1iZXIiLCJyZXRWYWx1ZSIsImkiLCJsZW4iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztBQUVBLElBQUlBLFFBQVEsMEJBQVo7O0lBRXFCQyxPOzs7Ozs7Ozs7Ozs7OzsyTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdWQyxPLEdBQVUsRSxTQUNYQyxNLEdBQVMsRUFBQyxTQUFRLEVBQUMsZUFBYyxNQUFmLEVBQXNCLGlCQUFnQixPQUF0QyxFQUE4QyxtQkFBa0IsZUFBaEUsRUFBZ0YsZ0JBQWUsRUFBL0YsRUFBa0csb0JBQW1CLGlCQUFySCxFQUF1SSxjQUFhLEVBQXBKLEVBQVQsRUFBaUssVUFBUyxFQUFDLGVBQWMsTUFBZixFQUFzQixpQkFBZ0IsT0FBdEMsRUFBOEMsbUJBQWtCLE9B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QUltQixXQUFXLEtBQWY7QUFDQSxXQUFLLElBQUlDLElBQUksQ0FBUixFQUFXQyxNQUFNckIsSUFBSXpELE1BQTFCLEVBQWtDNkUsSUFBSUMsR0FBdEMsRUFBMkNELEdBQTNDLEVBQWdEO0FBQzlDLFlBQUlwQixJQUFJb0IsQ0FBSixFQUFPbkQsSUFBUCxLQUFnQnNCLEtBQXBCLEVBQTJCO0FBQ3pCNEIscUJBQVcsSUFBWDtBQUNBO0FBQ0Q7QUFDREEsbUJBQVcsS0FBWDtBQUNEO0FBQ0QsYUFBT0EsUUFBUDtBQUNEOzs7O0VBdkprQ3pELGVBQUs0RCxJOztrQkFBckIvSCxPIiwiZmlsZSI6InB1Ymxpc2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgeyBjb25uZWN0LCBnZXRTdG9yZSB9IGZyb20gJ3dlcHktcmVkdXgnXG5pbXBvcnQgeyBzZXRGcm9tUHVibGlzaCB9IGZyb20gJ3N0b3JlL2FjdGlvbnMnXG5pbXBvcnQgTW9kYWwgZnJvbSAnY29tcG9uZW50cy9tb2RhbCdcbmltcG9ydCBNb2RhbDIgZnJvbSAnY29tcG9uZW50cy9tb2RhbDInXG5pbXBvcnQgeyBzaG93TXNnLCBpc0VtcHR5U3RyaW5nLCB1cGxvYWRJbWFnZSB9IGZyb20gJ3V0aWxzL2NvbW1vbidcbmltcG9ydCB7IGFkZENpcmNsZXMsIGFkZENvbGxlY3Rpb24sIGFkZEFjdGl2aXR5LCBhZGROb3RpZnkgfSBmcm9tICdhcGkvem9uZSdcblxubGV0IHN0b3JlID0gZ2V0U3RvcmUoKVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQdWJsaXNoIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflj5HluIMnXG4gIH1cbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIk1vZGFsXCI6e1wic3VyZUJ0blRleHRcIjpcIua3u+WKoOWujOaIkFwiLFwiY2FuY2VsQnRuVGV4dFwiOlwi5YaN5re75Yqg5LiA6aG5XCIsXCJwbGFjZWhvbGRlclRleHRcIjpcIuivt+i+k+WFpeaCqOaDs+aWsOWinueahOa0u+WKqOmhueebruWQjVwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpmbGFnLnN5bmNcIjpcInNob3dBZGRBY3Rpdml0eVwiLFwieG1sbnM6di1vblwiOlwiXCJ9LFwiTW9kYWwyXCI6e1wic3VyZUJ0blRleHRcIjpcIua3u+WKoOWujOaIkFwiLFwiY2FuY2VsQnRuVGV4dFwiOlwi5YaN5re75Yqg5LiA6aG5XCIsXCJwbGFjZWhvbGRlclRleHRcIjpcIuaUtuasvumAiemhueWQjVwiLFwicGxhY2Vob2xkZXJUZXh0MlwiOlwi6YeR6aKdXCIsXCJ2LWJpbmQ6ZmxhZy5zeW5jXCI6XCJzaG93QWRkTW9uZXlcIn19O1xyXG4kZXZlbnRzID0ge1wiTW9kYWxcIjp7XCJ2LW9uOmNhbmNlbFwiOlwiY2FuY2VsXCIsXCJ2LW9uOnN1cmVcIjpcInN1cmVcIn0sXCJNb2RhbDJcIjp7XCJ2LW9uOmNhbmNlbFwiOlwiY2FuY2VsXCIsXCJ2LW9uOnN1cmVcIjpcIm1vbmV5U3VyZUZuXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgTW9kYWwsXG4gICAgTW9kYWwyXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBzaG93QWRkQWN0aXZpdHk6IGZhbHNlLFxuICAgIHNob3dBZGRNb25leTogZmFsc2UsXG4gICAgbXNnOiAnJyxcbiAgICBpbWc6IFtdLFxuICAgIHNlZVR5cGU6IDAsXG4gICAgYWN0aXZpdHlUeXBlOiAwLFxuICAgIGFjdGl2aXR5Sm9pblR5cGU6IFtcbiAgICAgIHtcbiAgICAgICAgaWQ6IDAsXG4gICAgICAgIHRpdGxlOiAn5Y2V6YCJJyxcbiAgICAgICAgdHlwZTogJ3JhZGlvJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6IDEsXG4gICAgICAgIHRpdGxlOiAn5aSa6YCJJyxcbiAgICAgICAgdHlwZTogJ3NlbGVjdCdcbiAgICAgIH1cbiAgICBdLFxuICAgIHJlbWluZFR5cGU6IFtcbiAgICAgIHtcbiAgICAgICAgaWQ6IDAsXG4gICAgICAgIHRpdGxlOiAn5ZCmJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6IDEsXG4gICAgICAgIHRpdGxlOiAn5pivJ1xuICAgICAgfVxuICAgIF0sXG4gICAgdHlwZTogW1xuICAgICAge1xuICAgICAgICBpZDogMCxcbiAgICAgICAgdGl0bGU6ICfnj63nuqflj6/op4EnLFxuICAgICAgICB0eXBlOiAnY2xhc3MnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogMSxcbiAgICAgICAgdGl0bGU6ICflhajpg6jlj6/op4EnLFxuICAgICAgICB0eXBlOiAnYWxsJ1xuICAgICAgfVxuICAgIF0sXG4gICAgdHlwZUxpc3Q6IHtcbiAgICAgIHpvbmU6ICflrrbplb/lnIgnLFxuICAgICAgbm90aWNlOiAn6YCa55+lJyxcbiAgICAgIGFjdGl2aXR5OiAn5rS75YqoJyxcbiAgICAgIG1vbmV5OiAn5pS25qy+J1xuICAgIH0sXG4gICAgcGxhY2Vob2xkZXI6ICfor7flnKjmraTlj5HooajmgqjnmoTmhJ/mg7MnLFxuICAgIGFjdGl2ZVR5cGU6ICd6b25lJyxcbiAgICBhY3Rpdml0eUxpc3Q6IFtdLFxuICAgIGNhblN1Ym1pdDogZmFsc2UsXG4gICAgbWVtYmVySW5mbzogbnVsbCxcbiAgICBjbGFzc0luZm86IG51bGwsXG4gICAgbW9uZXk6ICcnLFxuICAgIGlzUmVtaW5kOiAxLFxuICAgIG1vbmV5TGlzdDogW10sXG4gICAgbWF4UGhvdG9Db3VudDogOSxcbiAgICB1cGxvYWRzOiBbXVxuICB9XG4gIGNvbW1vbkZuKHJlcykge1xuICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICBzZXRGcm9tUHVibGlzaCh0cnVlKVxuICAgICAgc2hvd01zZygn5Y+R5biD5oiQ5YqfJywgMjAwMClcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soKVxuICAgICAgfSwgMjAwMClcbiAgICB9XG4gIH1cbiAgb25Mb2FkID0gKGUpID0+IHtcbiAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxuICAgIHRoaXMubWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcbiAgICBjb25zdCB0eXBlID0gZS50eXBlXG4gICAgd3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcbiAgICAgIHRpdGxlOiBg5Y+R5biDJHt0aGlzLnR5cGVMaXN0W3R5cGVdfWBcbiAgICB9KVxuICAgIGlmICh0eXBlICE9PSAnem9uZScpIHtcbiAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBg6K+35Zyo5q2k5b2V5YWl5oKo55qEJHt0aGlzLnR5cGVMaXN0W3R5cGVdfeivpuaDhWBcbiAgICB9XG4gICAgdGhpcy5hY3RpdmVUeXBlID0gdHlwZVxuICAgIHRoaXMuJGFwcGx5KClcbiAgfVxuICBjaGVja0NhblN1Ym1pdCgpIHtcbiAgICBjb25zdCBtc2cgPSBg6K+35aGr5YaZ5oKo55qEJHt0aGlzLnR5cGVMaXN0W3RoaXMuYWN0aXZlVHlwZV195o+P6L+w6K+m5oOFYFxuICAgIGlmIChpc0VtcHR5U3RyaW5nKHRoaXMubXNnKSkge1xuICAgICAgc2hvd01zZyhtc2cpXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG4gIHNhdmVDaXJjbGVzKGNvbW1vblBhcmFtcywgdHlwZSkge1xuICAgIGNvbnN0IHBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcywge1xuICAgICAgaW1nX3VybDogdGhpcy5pbWdcbiAgICB9KVxuICAgIGNvbnN0IGNpcmNsZVBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIHBhcmFtcywge1xuICAgICAgc2VlX3R5cGU6IHRoaXMudHlwZVt0aGlzLnNlZVR5cGVdLnR5cGVcbiAgICB9KVxuICAgIGlmICh0eXBlID09PSAnbW9uZXknKSB7XG4gICAgICBpZiAoIXRoaXMubW9uZXlMaXN0Lmxlbmd0aCkge1xuICAgICAgICBzaG93TXNnKCfor7foh7PlsJHmt7vliqDkuIDkuKrmlLbmrL7mnaHnm64nKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGNvbnN0IG1vbmV5UGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgcGFyYW1zLCB7XG4gICAgICAgIGl0ZW06IHRoaXMubW9uZXlMaXN0LFxuICAgICAgICB0eXBlOiAnc3R1ZGVudCdcbiAgICAgIH0pXG4gICAgICBhZGRDb2xsZWN0aW9uKG1vbmV5UGFyYW1zKS50aGVuKHJlcyA9PiB7IHRoaXMuY29tbW9uRm4ocmVzKSB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBhZGRDaXJjbGVzKGNpcmNsZVBhcmFtcykudGhlbihyZXMgPT4geyB0aGlzLmNvbW1vbkZuKHJlcykgfSlcbiAgICB9XG4gIH1cbiAgc2F2ZUFjdGl2aXR5KGNvbW1vblBhcmFtcykge1xuICAgIGlmICghdGhpcy5hY3Rpdml0eUxpc3QubGVuZ3RoKSB7XG4gICAgICBzaG93TXNnKCfor7foh7PlsJHmt7vliqDkuIDkuKrmtLvliqjpgInpobknKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNvbnN0IHBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcywge1xuICAgICAgc2VsZWN0VHlwZTogdGhpcy5hY3Rpdml0eUpvaW5UeXBlW3RoaXMuYWN0aXZpdHlUeXBlXS50eXBlLFxuICAgICAgc2lnbl90eXBlOiAnYWxsJyxcbiAgICAgIGl0ZW06IHRoaXMuYWN0aXZpdHlMaXN0LFxuICAgICAgaW1nX3VybDogdGhpcy5pbWdcbiAgICB9KVxuICAgIGFkZEFjdGl2aXR5KHBhcmFtcykudGhlbihyZXMgPT4geyB0aGlzLmNvbW1vbkZuKHJlcyl9KVxuICB9XG4gIHNhdmVOb3RpY2UoY29tbW9uUGFyYW1zKSB7XG4gICAgY29uc3QgcGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zLCB7XG4gICAgICByZW1pbmQ6IE51bWJlcih0aGlzLmlzUmVtaW5kKVxuICAgIH0pXG4gICAgYWRkTm90aWZ5KHBhcmFtcykudGhlbihyZXMgPT4geyB0aGlzLmNvbW1vbkZuKHJlcykgfSlcbiAgfVxuICBjaGVja1JlcGVhdCh2YWx1ZSwgYXJyKSB7XG4gICAgbGV0IHJldFZhbHVlID0gZmFsc2VcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gYXJyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBpZiAoYXJyW2ldLm5hbWUgPT09IHZhbHVlKSB7XG4gICAgICAgIHJldFZhbHVlID0gdHJ1ZVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgcmV0VmFsdWUgPSBmYWxzZVxuICAgIH1cbiAgICByZXR1cm4gcmV0VmFsdWVcbiAgfVxuICB3YXRjaCA9IHtcbiAgICBtc2cgKG5ld1ZhbCwgb2xkVmFsKSB7XG4gICAgICBpZiAoIWlzRW1wdHlTdHJpbmcobmV3VmFsKSkge1xuICAgICAgICB0aGlzLmNhblN1Ym1pdCA9IHRydWVcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBzZWxlY3RTZWVUeXBlKGlkKSB7XG4gICAgICB0aGlzLnNlZVR5cGUgPSBpZFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgY2hvb3NlSW1hZ2UoKSB7XG4gICAgICBpZiAodGhpcy5pbWcubGVuZ3RoID4gdGhpcy5tYXhQaG90b0NvdW50KSB7XG4gICAgICAgIHNob3dNc2coJ+acgOWkmuS4iuS8oDnlvKDlm74nKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGxldCBfdGhpcyA9IHRoaXNcbiAgICAgIHd4LmNob29zZUltYWdlKHtcbiAgICAgICAgY291bnQ6IHRoaXMubWF4UGhvdG9Db3VudCxcbiAgICAgICAgc2l6ZVR5cGU6IFsnb3JpZ2luYWwnLCAnY29tcHJlc3NlZCddLFxuICAgICAgICBzb3VyY2VUeXBlOiBbJ2FsYnVtJywgJ2NhbWVyYSddLFxuICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgIGNvbnN0IGxlbmd0aCA9IHJlcy50ZW1wRmlsZVBhdGhzLmxlbmd0aFxuICAgICAgICAgIGxldCB0ZW1wQXJyID0gW11cbiAgICAgICAgICBpZiAodGhpcy5pbWcubGVuZ3RoICsgbGVuZ3RoID4gdGhpcy5tYXhQaG90b0NvdW50KSB7XG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+acgOWkmuWPquiDvemAieaLqScgKyB0aGlzLm1heFBob3RvQ291bnQgKyAn5byg5Zu+54mHJyxcbiAgICAgICAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgICB3eC5zaG93TG9hZGluZyh7dGl0bGU6ICflm77niYfkuIrkvKDkuK0nfSlcbiAgICAgICAgICByZXMudGVtcEZpbGVQYXRocy5mb3JFYWNoKHBhdGggPT4ge1xuICAgICAgICAgICAgbGV0IHVwbG9hZCA9IHt9XG4gICAgICAgICAgICB1cGxvYWQucGF0aCA9IHBhdGhcbiAgICAgICAgICAgIHVwbG9hZC5lcnJvciA9IGZhbHNlXG4gICAgICAgICAgICB1cGxvYWQudXBsb2FkUHJvZ3Jlc3MgPSB3eC51cGxvYWRGaWxlKHtcbiAgICAgICAgICAgICAgdXJsOiBgJHt3ZXB5LiRhcHBDb25maWcuYmFzZVVybH0vZmlsZS91cGxvYWRQaWNgLFxuICAgICAgICAgICAgICBmaWxlUGF0aDogcGF0aCxcbiAgICAgICAgICAgICAgZm9ybURhdGE6IHtcbiAgICAgICAgICAgICAgICAnbWVtYmVyX2lkJzogdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCxcbiAgICAgICAgICAgICAgICAnbWVtYmVyX3Rva2VuJzogdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl90b2tlbixcbiAgICAgICAgICAgICAgICAnZm9sZGVyJzogJ2NvbW1pdHRlZSdcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKVxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmRhdGEgJiYgZGF0YS5kYXRhLmZpbGVfdXJsKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBkYXRhLmRhdGEuZmlsZV91cmxcbiAgICAgICAgICAgICAgICAgIHRlbXBBcnIucHVzaCh1cmwpXG4gICAgICAgICAgICAgICAgICBfdGhpcy5pbWcucHVzaCh1cmwpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0ZW1wQXJyLmxlbmd0aCA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgICAgICAgICAgICAgfSwgMTAwMClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHVwbG9hZC51cGxvYWRQcm9ncmVzcy5vblByb2dyZXNzVXBkYXRlKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICB1cGxvYWQucHJvZ3Jlc3MgPSByZXMucHJvZ3Jlc3NcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBfdGhpcy51cGxvYWRzLnB1c2godXBsb2FkKVxuICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgc3VibWl0KCkge1xuICAgICAgLy8gaWYgKCF0aGlzLmNhblN1Ym1pdCkge1xuICAgICAgLy8gICBzaG93TXNnKCfor7fmo4Dmn6Xlj5HluIPlhoXlrrkhJylcbiAgICAgIC8vICAgcmV0dXJuXG4gICAgICAvLyB9XG4gICAgICB0aGlzLmNoZWNrQ2FuU3VibWl0KClcbiAgICAgIGNvbnN0IGNvbW1vblBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIHtcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgICB0eXBlOiB0aGlzLnNlZW5JbmRleCxcbiAgICAgICAgZGVzYzogdGhpcy5tc2dcbiAgICAgIH0pXG4gICAgICBpZiAodGhpcy5hY3RpdmVUeXBlID09PSAnem9uZScgfHwgdGhpcy5hY3RpdmVUeXBlID09PSAnbW9uZXknKSB7XG4gICAgICAgIHRoaXMuc2F2ZUNpcmNsZXMoY29tbW9uUGFyYW1zLCB0aGlzLmFjdGl2ZVR5cGUpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuYWN0aXZlVHlwZSA9PT0gJ2FjdGl2aXR5Jykge1xuICAgICAgICB0aGlzLnNhdmVBY3Rpdml0eShjb21tb25QYXJhbXMpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuYWN0aXZlVHlwZSA9PT0gJ25vdGljZScpIHtcbiAgICAgICAgdGhpcy5zYXZlTm90aWNlKGNvbW1vblBhcmFtcylcbiAgICAgIH1cbiAgICB9LFxuICAgIGNhbmNlbCgpIHtcbiAgICAgIHRoaXMuc2hvd0FkZEFjdGl2aXR5ID0gZmFsc2VcbiAgICAgIHRoaXMuc2hvd0FkZE1vbmV5ID0gZmFsc2VcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIHN1cmUodmFsdWUsIHR5cGUpIHtcbiAgICAgIGlmICh0aGlzLmNoZWNrUmVwZWF0KHZhbHVlLCB0aGlzLmFjdGl2aXR5TGlzdCkpIHtcbiAgICAgICAgc2hvd01zZygn6K+35LiN6KaB6L6T5YWl6YeN5aSN55qE5rS75Yqo6aG555uuJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBjb25zdCBvYmogPSB7XG4gICAgICAgIG5hbWU6IHZhbHVlXG4gICAgICB9XG4gICAgICB0aGlzLmFjdGl2aXR5TGlzdC5wdXNoKG9iailcbiAgICAgIGlmICh0eXBlID09PSAnc2F2ZScpIHtcbiAgICAgICAgdGhpcy5zaG93QWRkQWN0aXZpdHkgPSBmYWxzZVxuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgbW9uZXlTdXJlRm4odmFsdWUxLCB2YWx1ZTIsIHR5cGUpIHtcbiAgICAgIGNvbnN0IG9iaiA9IHtcbiAgICAgICAgbmFtZTogdmFsdWUxLFxuICAgICAgICBtb25leTogdmFsdWUyXG4gICAgICB9XG4gICAgICB0aGlzLm1vbmV5TGlzdC5wdXNoKG9iailcbiAgICAgIGlmICh0eXBlID09PSAnc2F2ZScpIHtcbiAgICAgICAgdGhpcy5zaG93QWRkTW9uZXkgPSBmYWxzZVxuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgYWRkTmV3KGZsYWcpIHtcbiAgICAgIHRoaXNbZmxhZ10gPSB0cnVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBkZWxldGVGbiAoYXJyLCBpbmRleCkge1xuICAgICAgdGhpc1thcnJdLnNwbGljZShpbmRleCwgMSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGJpbmRDaGFuZ2UoZSkge1xuICAgICAgdGhpc1tlLmN1cnJlbnRUYXJnZXQuaWRdID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbn1cbiJdfQ==