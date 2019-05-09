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
        (0, _common.showMsg)('添加成功', 1000);
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
        if (Number(value2) <= 0) {
          (0, _common.showMsg)('请输入合法金额');
          return;
        }
        (0, _common.showMsg)('添加成功', 1000);
        var obj = {
          name: value1,
          money: Number(value2)
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2guanMiXSwibmFtZXMiOlsic3RvcmUiLCJQdWJsaXNoIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIk1vZGFsIiwiTW9kYWwyIiwiZGF0YSIsInNob3dBZGRBY3Rpdml0eSIsInNob3dBZGRNb25leSIsIm1zZyIsImltZyIsInNlZVR5cGUiLCJhY3Rpdml0eVR5cGUiLCJhY3Rpdml0eUpvaW5UeXBlIiwiaWQiLCJ0aXRsZSIsInR5cGUiLCJyZW1pbmRUeXBlIiwidHlwZUxpc3QiLCJ6b25lIiwibm90aWNlIiwiYWN0aXZpdHkiLCJtb25leSIsInBsYWNlaG9sZGVyIiwiYWN0aXZlVHlwZSIsImFjdGl2aXR5TGlzdCIsImNhblN1Ym1pdCIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJpc1JlbWluZCIsIm1vbmV5TGlzdCIsIm1heFBob3RvQ291bnQiLCJ1cGxvYWRzIiwib25Mb2FkIiwiZSIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCIkYXBwbHkiLCJ3YXRjaCIsIm5ld1ZhbCIsIm9sZFZhbCIsIm1ldGhvZHMiLCJzZWxlY3RTZWVUeXBlIiwiY2hvb3NlSW1hZ2UiLCJsZW5ndGgiLCJfdGhpcyIsImNvdW50Iiwic2l6ZVR5cGUiLCJzb3VyY2VUeXBlIiwic3VjY2VzcyIsInJlcyIsInRlbXBGaWxlUGF0aHMiLCJ0ZW1wQXJyIiwic2hvd1RvYXN0IiwiaWNvbiIsInNob3dMb2FkaW5nIiwiZm9yRWFjaCIsInVwbG9hZCIsInBhdGgiLCJlcnJvciIsInVwbG9hZFByb2dyZXNzIiwidXBsb2FkRmlsZSIsInVybCIsIndlcHkiLCIkYXBwQ29uZmlnIiwiYmFzZVVybCIsImZpbGVQYXRoIiwiZm9ybURhdGEiLCJtZW1iZXJfaWQiLCJtZW1iZXJfdG9rZW4iLCJuYW1lIiwiSlNPTiIsInBhcnNlIiwiZmlsZV91cmwiLCJwdXNoIiwic2V0VGltZW91dCIsImhpZGVMb2FkaW5nIiwib25Qcm9ncmVzc1VwZGF0ZSIsInByb2dyZXNzIiwic3VibWl0IiwiY2hlY2tDYW5TdWJtaXQiLCJjb21tb25QYXJhbXMiLCJPYmplY3QiLCJhc3NpZ24iLCJjbGFzc19pZCIsInNlZW5JbmRleCIsImRlc2MiLCJzYXZlQ2lyY2xlcyIsInNhdmVBY3Rpdml0eSIsInNhdmVOb3RpY2UiLCJjYW5jZWwiLCJzdXJlIiwidmFsdWUiLCJjaGVja1JlcGVhdCIsIm9iaiIsIm1vbmV5U3VyZUZuIiwidmFsdWUxIiwidmFsdWUyIiwiTnVtYmVyIiwiYWRkTmV3IiwiZmxhZyIsImRlbGV0ZUZuIiwiYXJyIiwiaW5kZXgiLCJzcGxpY2UiLCJiaW5kQ2hhbmdlIiwiY3VycmVudFRhcmdldCIsImRldGFpbCIsIm5hdmlnYXRlQmFjayIsInBhcmFtcyIsImltZ191cmwiLCJjaXJjbGVQYXJhbXMiLCJzZWVfdHlwZSIsIm1vbmV5UGFyYW1zIiwiaXRlbSIsInRoZW4iLCJjb21tb25GbiIsInNlbGVjdFR5cGUiLCJzaWduX3R5cGUiLCJyZW1pbmQiLCJyZXRWYWx1ZSIsImkiLCJsZW4iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztBQUVBLElBQUlBLFFBQVEsMEJBQVo7O0lBRXFCQyxPOzs7Ozs7Ozs7Ozs7OzsyTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdWQyxPLEdBQVUsRSxTQUNYQyxNLEdBQVMsRUFBQyxTQUFRLEVBQUMsZUFBYyxNQUFmLEVBQXNCLGlCQUFnQixPQUF0QyxFQUE4QyxtQkFBa0IsZUFBaEUsRUFBZ0YsZ0JBQWUsRUFBL0YsRUFBa0csb0JBQW1CLGlCQUFySCxFQUF1SSxjQUFhLEVBQXBKLEVBQVQsRUFBaUssVUFBUyxFQUFDLGVBQWMsTUFBZixFQUFzQixpQkFBZ0IsT0FBdEMsRUFBOEMsbUJBQWtCLE9B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RHFDLE9BQWhDLENBQWY7QUFHQSwyQkFBVWlGLE1BQVYsRUFBa0JNLElBQWxCLENBQXVCLGVBQU87QUFBRSxlQUFLQyxRQUFMLENBQWNsRSxHQUFkO0FBQW9CLE9BQXBEO0FBQ0Q7OztnQ0FDVzBDLEssRUFBT1UsRyxFQUFLO0FBQ3RCLFVBQUlrQixXQUFXLEtBQWY7QUFDQSxXQUFLLElBQUlDLElBQUksQ0FBUixFQUFXQyxNQUFNcEIsSUFBSTFELE1BQTFCLEVBQWtDNkUsSUFBSUMsR0FBdEMsRUFBMkNELEdBQTNDLEVBQWdEO0FBQzlDLFlBQUluQixJQUFJbUIsQ0FBSixFQUFPbkQsSUFBUCxLQUFnQnNCLEtBQXBCLEVBQTJCO0FBQ3pCNEIscUJBQVcsSUFBWDtBQUNBO0FBQ0Q7QUFDREEsbUJBQVcsS0FBWDtBQUNEO0FBQ0QsYUFBT0EsUUFBUDtBQUNEOzs7O0VBdkprQ3pELGVBQUs0RCxJOztrQkFBckIvSCxPIiwiZmlsZSI6InB1Ymxpc2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgeyBjb25uZWN0LCBnZXRTdG9yZSB9IGZyb20gJ3dlcHktcmVkdXgnXG5pbXBvcnQgeyBzZXRGcm9tUHVibGlzaCB9IGZyb20gJ3N0b3JlL2FjdGlvbnMnXG5pbXBvcnQgTW9kYWwgZnJvbSAnY29tcG9uZW50cy9tb2RhbCdcbmltcG9ydCBNb2RhbDIgZnJvbSAnY29tcG9uZW50cy9tb2RhbDInXG5pbXBvcnQgeyBzaG93TXNnLCBpc0VtcHR5U3RyaW5nLCB1cGxvYWRJbWFnZSwgY2hlY2tOdW0gfSBmcm9tICd1dGlscy9jb21tb24nXG5pbXBvcnQgeyBhZGRDaXJjbGVzLCBhZGRDb2xsZWN0aW9uLCBhZGRBY3Rpdml0eSwgYWRkTm90aWZ5IH0gZnJvbSAnYXBpL3pvbmUnXG5cbmxldCBzdG9yZSA9IGdldFN0b3JlKClcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHVibGlzaCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Y+R5biDJ1xuICB9XG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJNb2RhbFwiOntcInN1cmVCdG5UZXh0XCI6XCLmt7vliqDlrozmiJBcIixcImNhbmNlbEJ0blRleHRcIjpcIuWGjea3u+WKoOS4gOmhuVwiLFwicGxhY2Vob2xkZXJUZXh0XCI6XCLor7fovpPlhaXmgqjmg7PmlrDlop7nmoTmtLvliqjpobnnm67lkI1cIixcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6ZmxhZy5zeW5jXCI6XCJzaG93QWRkQWN0aXZpdHlcIixcInhtbG5zOnYtb25cIjpcIlwifSxcIk1vZGFsMlwiOntcInN1cmVCdG5UZXh0XCI6XCLmt7vliqDlrozmiJBcIixcImNhbmNlbEJ0blRleHRcIjpcIuWGjea3u+WKoOS4gOmhuVwiLFwicGxhY2Vob2xkZXJUZXh0XCI6XCLmlLbmrL7pgInpobnlkI1cIixcInBsYWNlaG9sZGVyVGV4dDJcIjpcIumHkeminVwiLFwidi1iaW5kOmZsYWcuc3luY1wiOlwic2hvd0FkZE1vbmV5XCJ9fTtcclxuJGV2ZW50cyA9IHtcIk1vZGFsXCI6e1widi1vbjpjYW5jZWxcIjpcImNhbmNlbFwiLFwidi1vbjpzdXJlXCI6XCJzdXJlXCJ9LFwiTW9kYWwyXCI6e1widi1vbjpjYW5jZWxcIjpcImNhbmNlbFwiLFwidi1vbjpzdXJlXCI6XCJtb25leVN1cmVGblwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgIE1vZGFsLFxuICAgIE1vZGFsMlxuICB9XG4gIGRhdGEgPSB7XG4gICAgc2hvd0FkZEFjdGl2aXR5OiBmYWxzZSxcbiAgICBzaG93QWRkTW9uZXk6IGZhbHNlLFxuICAgIG1zZzogJycsXG4gICAgaW1nOiBbXSxcbiAgICBzZWVUeXBlOiAwLFxuICAgIGFjdGl2aXR5VHlwZTogMCxcbiAgICBhY3Rpdml0eUpvaW5UeXBlOiBbXG4gICAgICB7XG4gICAgICAgIGlkOiAwLFxuICAgICAgICB0aXRsZTogJ+WNlemAiScsXG4gICAgICAgIHR5cGU6ICdyYWRpbydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAxLFxuICAgICAgICB0aXRsZTogJ+WkmumAiScsXG4gICAgICAgIHR5cGU6ICdzZWxlY3QnXG4gICAgICB9XG4gICAgXSxcbiAgICByZW1pbmRUeXBlOiBbXG4gICAgICB7XG4gICAgICAgIGlkOiAwLFxuICAgICAgICB0aXRsZTogJ+WQpidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAxLFxuICAgICAgICB0aXRsZTogJ+aYrydcbiAgICAgIH1cbiAgICBdLFxuICAgIHR5cGU6IFtcbiAgICAgIHtcbiAgICAgICAgaWQ6IDAsXG4gICAgICAgIHRpdGxlOiAn54+t57qn5Y+v6KeBJyxcbiAgICAgICAgdHlwZTogJ2NsYXNzJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6IDEsXG4gICAgICAgIHRpdGxlOiAn5YWo6YOo5Y+v6KeBJyxcbiAgICAgICAgdHlwZTogJ2FsbCdcbiAgICAgIH1cbiAgICBdLFxuICAgIHR5cGVMaXN0OiB7XG4gICAgICB6b25lOiAn5a626ZW/5ZyIJyxcbiAgICAgIG5vdGljZTogJ+mAmuefpScsXG4gICAgICBhY3Rpdml0eTogJ+a0u+WKqCcsXG4gICAgICBtb25leTogJ+aUtuasvidcbiAgICB9LFxuICAgIHBsYWNlaG9sZGVyOiAn6K+35Zyo5q2k5Y+R6KGo5oKo55qE5oSf5oOzJyxcbiAgICBhY3RpdmVUeXBlOiAnem9uZScsXG4gICAgYWN0aXZpdHlMaXN0OiBbXSxcbiAgICBjYW5TdWJtaXQ6IGZhbHNlLFxuICAgIG1lbWJlckluZm86IG51bGwsXG4gICAgY2xhc3NJbmZvOiBudWxsLFxuICAgIG1vbmV5OiAnJyxcbiAgICBpc1JlbWluZDogMSxcbiAgICBtb25leUxpc3Q6IFtdLFxuICAgIG1heFBob3RvQ291bnQ6IDksXG4gICAgdXBsb2FkczogW11cbiAgfVxuICBjb21tb25GbihyZXMpIHtcbiAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgc2V0RnJvbVB1Ymxpc2godHJ1ZSlcbiAgICAgIHNob3dNc2coJ+WPkeW4g+aIkOWKnycsIDIwMDApXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgd3gubmF2aWdhdGVCYWNrKClcbiAgICAgIH0sIDIwMDApXG4gICAgfVxuICB9XG4gIG9uTG9hZCA9IChlKSA9PiB7XG4gICAgdGhpcy5jbGFzc0luZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnY2xhc3NJbmZvJylcbiAgICB0aGlzLm1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXG4gICAgY29uc3QgdHlwZSA9IGUudHlwZVxuICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XG4gICAgICB0aXRsZTogYOWPkeW4gyR7dGhpcy50eXBlTGlzdFt0eXBlXX1gXG4gICAgfSlcbiAgICBpZiAodHlwZSAhPT0gJ3pvbmUnKSB7XG4gICAgICB0aGlzLnBsYWNlaG9sZGVyID0gYOivt+WcqOatpOW9leWFpeaCqOeahCR7dGhpcy50eXBlTGlzdFt0eXBlXX3or6bmg4VgXG4gICAgfVxuICAgIHRoaXMuYWN0aXZlVHlwZSA9IHR5cGVcbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgY2hlY2tDYW5TdWJtaXQoKSB7XG4gICAgY29uc3QgbXNnID0gYOivt+Whq+WGmeaCqOeahCR7dGhpcy50eXBlTGlzdFt0aGlzLmFjdGl2ZVR5cGVdfeaPj+i/sOivpuaDhWBcbiAgICBpZiAoaXNFbXB0eVN0cmluZyh0aGlzLm1zZykpIHtcbiAgICAgIHNob3dNc2cobXNnKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuICBzYXZlQ2lyY2xlcyhjb21tb25QYXJhbXMsIHR5cGUpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMsIHtcbiAgICAgIGltZ191cmw6IHRoaXMuaW1nXG4gICAgfSlcbiAgICBjb25zdCBjaXJjbGVQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBwYXJhbXMsIHtcbiAgICAgIHNlZV90eXBlOiB0aGlzLnR5cGVbdGhpcy5zZWVUeXBlXS50eXBlXG4gICAgfSlcbiAgICBpZiAodHlwZSA9PT0gJ21vbmV5Jykge1xuICAgICAgaWYgKCF0aGlzLm1vbmV5TGlzdC5sZW5ndGgpIHtcbiAgICAgICAgc2hvd01zZygn6K+36Iez5bCR5re75Yqg5LiA5Liq5pS25qy+5p2h55uuJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBjb25zdCBtb25leVBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIHBhcmFtcywge1xuICAgICAgICBpdGVtOiB0aGlzLm1vbmV5TGlzdCxcbiAgICAgICAgdHlwZTogJ3N0dWRlbnQnXG4gICAgICB9KVxuICAgICAgYWRkQ29sbGVjdGlvbihtb25leVBhcmFtcykudGhlbihyZXMgPT4geyB0aGlzLmNvbW1vbkZuKHJlcykgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgYWRkQ2lyY2xlcyhjaXJjbGVQYXJhbXMpLnRoZW4ocmVzID0+IHsgdGhpcy5jb21tb25GbihyZXMpIH0pXG4gICAgfVxuICB9XG4gIHNhdmVBY3Rpdml0eShjb21tb25QYXJhbXMpIHtcbiAgICBpZiAoIXRoaXMuYWN0aXZpdHlMaXN0Lmxlbmd0aCkge1xuICAgICAgc2hvd01zZygn6K+36Iez5bCR5re75Yqg5LiA5Liq5rS75Yqo6YCJ6aG5JylcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCBwYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMsIHtcbiAgICAgIHNlbGVjdFR5cGU6IHRoaXMuYWN0aXZpdHlKb2luVHlwZVt0aGlzLmFjdGl2aXR5VHlwZV0udHlwZSxcbiAgICAgIHNpZ25fdHlwZTogJ2FsbCcsXG4gICAgICBpdGVtOiB0aGlzLmFjdGl2aXR5TGlzdCxcbiAgICAgIGltZ191cmw6IHRoaXMuaW1nXG4gICAgfSlcbiAgICBhZGRBY3Rpdml0eShwYXJhbXMpLnRoZW4ocmVzID0+IHsgdGhpcy5jb21tb25GbihyZXMpfSlcbiAgfVxuICBzYXZlTm90aWNlKGNvbW1vblBhcmFtcykge1xuICAgIGNvbnN0IHBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcywge1xuICAgICAgcmVtaW5kOiBOdW1iZXIodGhpcy5pc1JlbWluZClcbiAgICB9KVxuICAgIGFkZE5vdGlmeShwYXJhbXMpLnRoZW4ocmVzID0+IHsgdGhpcy5jb21tb25GbihyZXMpIH0pXG4gIH1cbiAgY2hlY2tSZXBlYXQodmFsdWUsIGFycikge1xuICAgIGxldCByZXRWYWx1ZSA9IGZhbHNlXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGFyci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgaWYgKGFycltpXS5uYW1lID09PSB2YWx1ZSkge1xuICAgICAgICByZXRWYWx1ZSA9IHRydWVcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIHJldFZhbHVlID0gZmFsc2VcbiAgICB9XG4gICAgcmV0dXJuIHJldFZhbHVlXG4gIH1cbiAgd2F0Y2ggPSB7XG4gICAgbXNnIChuZXdWYWwsIG9sZFZhbCkge1xuICAgICAgaWYgKCFpc0VtcHR5U3RyaW5nKG5ld1ZhbCkpIHtcbiAgICAgICAgdGhpcy5jYW5TdWJtaXQgPSB0cnVlXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgc2VsZWN0U2VlVHlwZShpZCkge1xuICAgICAgdGhpcy5zZWVUeXBlID0gaWRcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGNob29zZUltYWdlKCkge1xuICAgICAgaWYgKHRoaXMuaW1nLmxlbmd0aCA+IHRoaXMubWF4UGhvdG9Db3VudCkge1xuICAgICAgICBzaG93TXNnKCfmnIDlpJrkuIrkvKA55byg5Zu+JylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBsZXQgX3RoaXMgPSB0aGlzXG4gICAgICB3eC5jaG9vc2VJbWFnZSh7XG4gICAgICAgIGNvdW50OiB0aGlzLm1heFBob3RvQ291bnQsXG4gICAgICAgIHNpemVUeXBlOiBbJ29yaWdpbmFsJywgJ2NvbXByZXNzZWQnXSxcbiAgICAgICAgc291cmNlVHlwZTogWydhbGJ1bScsICdjYW1lcmEnXSxcbiAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICBjb25zdCBsZW5ndGggPSByZXMudGVtcEZpbGVQYXRocy5sZW5ndGhcbiAgICAgICAgICBsZXQgdGVtcEFyciA9IFtdXG4gICAgICAgICAgaWYgKHRoaXMuaW1nLmxlbmd0aCArIGxlbmd0aCA+IHRoaXMubWF4UGhvdG9Db3VudCkge1xuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfmnIDlpJrlj6rog73pgInmi6knICsgdGhpcy5tYXhQaG90b0NvdW50ICsgJ+W8oOWbvueJhycsXG4gICAgICAgICAgICAgIGljb246ICdub25lJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgICAgd3guc2hvd0xvYWRpbmcoe3RpdGxlOiAn5Zu+54mH5LiK5Lyg5LitJ30pXG4gICAgICAgICAgcmVzLnRlbXBGaWxlUGF0aHMuZm9yRWFjaChwYXRoID0+IHtcbiAgICAgICAgICAgIGxldCB1cGxvYWQgPSB7fVxuICAgICAgICAgICAgdXBsb2FkLnBhdGggPSBwYXRoXG4gICAgICAgICAgICB1cGxvYWQuZXJyb3IgPSBmYWxzZVxuICAgICAgICAgICAgdXBsb2FkLnVwbG9hZFByb2dyZXNzID0gd3gudXBsb2FkRmlsZSh7XG4gICAgICAgICAgICAgIHVybDogYCR7d2VweS4kYXBwQ29uZmlnLmJhc2VVcmx9L2ZpbGUvdXBsb2FkUGljYCxcbiAgICAgICAgICAgICAgZmlsZVBhdGg6IHBhdGgsXG4gICAgICAgICAgICAgIGZvcm1EYXRhOiB7XG4gICAgICAgICAgICAgICAgJ21lbWJlcl9pZCc6IHRoaXMubWVtYmVySW5mby5tZW1iZXJfaWQsXG4gICAgICAgICAgICAgICAgJ21lbWJlcl90b2tlbic6IHRoaXMubWVtYmVySW5mby5tZW1iZXJfdG9rZW4sXG4gICAgICAgICAgICAgICAgJ2ZvbGRlcic6ICdjb21taXR0ZWUnXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSlcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5kYXRhICYmIGRhdGEuZGF0YS5maWxlX3VybCkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgdXJsID0gZGF0YS5kYXRhLmZpbGVfdXJsXG4gICAgICAgICAgICAgICAgICB0ZW1wQXJyLnB1c2godXJsKVxuICAgICAgICAgICAgICAgICAgX3RoaXMuaW1nLnB1c2godXJsKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGVtcEFyci5sZW5ndGggPT09IGxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICAgICAgICAgIH0sIDEwMDApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB1cGxvYWQudXBsb2FkUHJvZ3Jlc3Mub25Qcm9ncmVzc1VwZGF0ZShmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgdXBsb2FkLnByb2dyZXNzID0gcmVzLnByb2dyZXNzXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgX3RoaXMudXBsb2Fkcy5wdXNoKHVwbG9hZClcbiAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIHN1Ym1pdCgpIHtcbiAgICAgIC8vIGlmICghdGhpcy5jYW5TdWJtaXQpIHtcbiAgICAgIC8vICAgc2hvd01zZygn6K+35qOA5p+l5Y+R5biD5YaF5a65IScpXG4gICAgICAvLyAgIHJldHVyblxuICAgICAgLy8gfVxuICAgICAgdGhpcy5jaGVja0NhblN1Ym1pdCgpXG4gICAgICBjb25zdCBjb21tb25QYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCB7XG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgICAgdHlwZTogdGhpcy5zZWVuSW5kZXgsXG4gICAgICAgIGRlc2M6IHRoaXMubXNnXG4gICAgICB9KVxuICAgICAgaWYgKHRoaXMuYWN0aXZlVHlwZSA9PT0gJ3pvbmUnIHx8IHRoaXMuYWN0aXZlVHlwZSA9PT0gJ21vbmV5Jykge1xuICAgICAgICB0aGlzLnNhdmVDaXJjbGVzKGNvbW1vblBhcmFtcywgdGhpcy5hY3RpdmVUeXBlKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLmFjdGl2ZVR5cGUgPT09ICdhY3Rpdml0eScpIHtcbiAgICAgICAgdGhpcy5zYXZlQWN0aXZpdHkoY29tbW9uUGFyYW1zKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLmFjdGl2ZVR5cGUgPT09ICdub3RpY2UnKSB7XG4gICAgICAgIHRoaXMuc2F2ZU5vdGljZShjb21tb25QYXJhbXMpXG4gICAgICB9XG4gICAgfSxcbiAgICBjYW5jZWwoKSB7XG4gICAgICB0aGlzLnNob3dBZGRBY3Rpdml0eSA9IGZhbHNlXG4gICAgICB0aGlzLnNob3dBZGRNb25leSA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBzdXJlKHZhbHVlLCB0eXBlKSB7XG4gICAgICBpZiAodGhpcy5jaGVja1JlcGVhdCh2YWx1ZSwgdGhpcy5hY3Rpdml0eUxpc3QpKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+S4jeimgei+k+WFpemHjeWkjeeahOa0u+WKqOmhueebricpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgc2hvd01zZygn5re75Yqg5oiQ5YqfJywgMTAwMClcbiAgICAgIGNvbnN0IG9iaiA9IHtcbiAgICAgICAgbmFtZTogdmFsdWVcbiAgICAgIH1cbiAgICAgIHRoaXMuYWN0aXZpdHlMaXN0LnB1c2gob2JqKVxuICAgICAgaWYgKHR5cGUgPT09ICdzYXZlJykge1xuICAgICAgICB0aGlzLnNob3dBZGRBY3Rpdml0eSA9IGZhbHNlXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBtb25leVN1cmVGbih2YWx1ZTEsIHZhbHVlMiwgdHlwZSkge1xuICAgICAgaWYgKE51bWJlcih2YWx1ZTIpIDw9IDApIHtcbiAgICAgICAgc2hvd01zZygn6K+36L6T5YWl5ZCI5rOV6YeR6aKdJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBzaG93TXNnKCfmt7vliqDmiJDlip8nLCAxMDAwKVxuICAgICAgY29uc3Qgb2JqID0ge1xuICAgICAgICBuYW1lOiB2YWx1ZTEsXG4gICAgICAgIG1vbmV5OiBOdW1iZXIodmFsdWUyKVxuICAgICAgfVxuICAgICAgdGhpcy5tb25leUxpc3QucHVzaChvYmopXG4gICAgICBpZiAodHlwZSA9PT0gJ3NhdmUnKSB7XG4gICAgICAgIHRoaXMuc2hvd0FkZE1vbmV5ID0gZmFsc2VcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGFkZE5ldyhmbGFnKSB7XG4gICAgICB0aGlzW2ZsYWddID0gdHJ1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgZGVsZXRlRm4gKGFyciwgaW5kZXgpIHtcbiAgICAgIHRoaXNbYXJyXS5zcGxpY2UoaW5kZXgsIDEpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBiaW5kQ2hhbmdlKGUpIHtcbiAgICAgIHRoaXNbZS5jdXJyZW50VGFyZ2V0LmlkXSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG59XG4iXX0=