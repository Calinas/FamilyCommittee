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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2guanMiXSwibmFtZXMiOlsic3RvcmUiLCJQdWJsaXNoIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIk1vZGFsIiwiTW9kYWwyIiwiZGF0YSIsInNob3dBZGRBY3Rpdml0eSIsInNob3dBZGRNb25leSIsIm1zZyIsImltZyIsInNlZVR5cGUiLCJhY3Rpdml0eVR5cGUiLCJhY3Rpdml0eUpvaW5UeXBlIiwiaWQiLCJ0aXRsZSIsInR5cGUiLCJyZW1pbmRUeXBlIiwidHlwZUxpc3QiLCJ6b25lIiwibm90aWNlIiwiYWN0aXZpdHkiLCJtb25leSIsInBsYWNlaG9sZGVyIiwiYWN0aXZlVHlwZSIsImFjdGl2aXR5TGlzdCIsImNhblN1Ym1pdCIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJpc1JlbWluZCIsIm1vbmV5TGlzdCIsIm1heFBob3RvQ291bnQiLCJ1cGxvYWRzIiwib25Mb2FkIiwiZSIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCIkYXBwbHkiLCJ3YXRjaCIsIm5ld1ZhbCIsIm9sZFZhbCIsIm1ldGhvZHMiLCJzZWxlY3RTZWVUeXBlIiwiY2hvb3NlSW1hZ2UiLCJsZW5ndGgiLCJfdGhpcyIsImNvdW50Iiwic2l6ZVR5cGUiLCJzb3VyY2VUeXBlIiwic3VjY2VzcyIsInJlcyIsInRlbXBGaWxlUGF0aHMiLCJ0ZW1wQXJyIiwic2hvd1RvYXN0IiwiaWNvbiIsInNob3dMb2FkaW5nIiwiZm9yRWFjaCIsInVwbG9hZCIsInBhdGgiLCJlcnJvciIsInVwbG9hZFByb2dyZXNzIiwidXBsb2FkRmlsZSIsInVybCIsIndlcHkiLCIkYXBwQ29uZmlnIiwiYmFzZVVybCIsImZpbGVQYXRoIiwiZm9ybURhdGEiLCJtZW1iZXJfaWQiLCJtZW1iZXJfdG9rZW4iLCJuYW1lIiwiSlNPTiIsInBhcnNlIiwiZmlsZV91cmwiLCJwdXNoIiwic2V0VGltZW91dCIsImhpZGVMb2FkaW5nIiwib25Qcm9ncmVzc1VwZGF0ZSIsInByb2dyZXNzIiwic3VibWl0IiwiY2hlY2tDYW5TdWJtaXQiLCJjb21tb25QYXJhbXMiLCJPYmplY3QiLCJhc3NpZ24iLCJjbGFzc19pZCIsInNlZW5JbmRleCIsImRlc2MiLCJzYXZlQ2lyY2xlcyIsInNhdmVBY3Rpdml0eSIsInNhdmVOb3RpY2UiLCJjYW5jZWwiLCJzdXJlIiwidmFsdWUiLCJjaGVja1JlcGVhdCIsIm9iaiIsIm1vbmV5U3VyZUZuIiwidmFsdWUxIiwidmFsdWUyIiwiTnVtYmVyIiwiYWRkTmV3IiwiZmxhZyIsImRlbGV0ZUZuIiwiYXJyIiwiaW5kZXgiLCJzcGxpY2UiLCJiaW5kQ2hhbmdlIiwiY3VycmVudFRhcmdldCIsImRldGFpbCIsIm5hdmlnYXRlQmFjayIsInBhcmFtcyIsImltZ191cmwiLCJjaXJjbGVQYXJhbXMiLCJzZWVfdHlwZSIsIm1vbmV5UGFyYW1zIiwiaXRlbSIsInRoZW4iLCJjb21tb25GbiIsInNlbGVjdFR5cGUiLCJzaWduX3R5cGUiLCJyZW1pbmQiLCJyZXRWYWx1ZSIsImkiLCJsZW4iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztBQUVBLElBQUlBLFFBQVEsMEJBQVo7O0lBRXFCQyxPOzs7Ozs7Ozs7Ozs7OzsyTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdWQyxPLEdBQVUsRSxTQUNYQyxNLEdBQVMsRUFBQyxTQUFRLEVBQUMsZUFBYyxNQUFmLEVBQXNCLGlCQUFnQixPQUF0QyxFQUE4QyxtQkFBa0IsZUFBaEUsRUFBZ0YsZ0JBQWUsRUFBL0YsRUFBa0csb0JBQW1CLGlCQUFySCxFQUF1SSxjQUFhLEVBQXBKLEVBQVQsRUFBaUssVUFBUyxFQUFDLGVBQWMsTUFBZixFQUFzQixpQkFBZ0IsT0FBdEMsRUFBOEMsbUJBQWtCLE9B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RDtBQUNEOzs7Z0NBQ1cwQyxLLEVBQU9VLEcsRUFBSztBQUN0QixVQUFJa0IsV0FBVyxLQUFmO0FBQ0EsV0FBSyxJQUFJQyxJQUFJLENBQVIsRUFBV0MsTUFBTXBCLElBQUkxRCxNQUExQixFQUFrQzZFLElBQUlDLEdBQXRDLEVBQTJDRCxHQUEzQyxFQUFnRDtBQUM5QyxZQUFJbkIsSUFBSW1CLENBQUosRUFBT25ELElBQVAsS0FBZ0JzQixLQUFwQixFQUEyQjtBQUN6QjRCLHFCQUFXLElBQVg7QUFDQTtBQUNEO0FBQ0RBLG1CQUFXLEtBQVg7QUFDRDtBQUNELGFBQU9BLFFBQVA7QUFDRDs7OztFQXZKa0N6RCxlQUFLNEQsSTs7a0JBQXJCL0gsTyIsImZpbGUiOiJwdWJsaXNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHsgY29ubmVjdCwgZ2V0U3RvcmUgfSBmcm9tICd3ZXB5LXJlZHV4J1xuaW1wb3J0IHsgc2V0RnJvbVB1Ymxpc2ggfSBmcm9tICdzdG9yZS9hY3Rpb25zJ1xuaW1wb3J0IE1vZGFsIGZyb20gJ2NvbXBvbmVudHMvbW9kYWwnXG5pbXBvcnQgTW9kYWwyIGZyb20gJ2NvbXBvbmVudHMvbW9kYWwyJ1xuaW1wb3J0IHsgc2hvd01zZywgaXNFbXB0eVN0cmluZywgdXBsb2FkSW1hZ2UsIGNoZWNrTnVtIH0gZnJvbSAndXRpbHMvY29tbW9uJ1xuaW1wb3J0IHsgYWRkQ2lyY2xlcywgYWRkQ29sbGVjdGlvbiwgYWRkQWN0aXZpdHksIGFkZE5vdGlmeSB9IGZyb20gJ2FwaS96b25lJ1xuXG5sZXQgc3RvcmUgPSBnZXRTdG9yZSgpXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB1Ymxpc2ggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WPkeW4gydcbiAgfVxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiTW9kYWxcIjp7XCJzdXJlQnRuVGV4dFwiOlwi5re75Yqg5a6M5oiQXCIsXCJjYW5jZWxCdG5UZXh0XCI6XCLlho3mt7vliqDkuIDpoblcIixcInBsYWNlaG9sZGVyVGV4dFwiOlwi6K+36L6T5YWl5oKo5oOz5paw5aKe55qE5rS75Yqo6aG555uu5ZCNXCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmZsYWcuc3luY1wiOlwic2hvd0FkZEFjdGl2aXR5XCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJNb2RhbDJcIjp7XCJzdXJlQnRuVGV4dFwiOlwi5re75Yqg5a6M5oiQXCIsXCJjYW5jZWxCdG5UZXh0XCI6XCLlho3mt7vliqDkuIDpoblcIixcInBsYWNlaG9sZGVyVGV4dFwiOlwi5pS25qy+6YCJ6aG55ZCNXCIsXCJwbGFjZWhvbGRlclRleHQyXCI6XCLph5Hpop1cIixcInYtYmluZDpmbGFnLnN5bmNcIjpcInNob3dBZGRNb25leVwifX07XHJcbiRldmVudHMgPSB7XCJNb2RhbFwiOntcInYtb246Y2FuY2VsXCI6XCJjYW5jZWxcIixcInYtb246c3VyZVwiOlwic3VyZVwifSxcIk1vZGFsMlwiOntcInYtb246Y2FuY2VsXCI6XCJjYW5jZWxcIixcInYtb246c3VyZVwiOlwibW9uZXlTdXJlRm5cIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICBNb2RhbCxcbiAgICBNb2RhbDJcbiAgfVxuICBkYXRhID0ge1xuICAgIHNob3dBZGRBY3Rpdml0eTogZmFsc2UsXG4gICAgc2hvd0FkZE1vbmV5OiBmYWxzZSxcbiAgICBtc2c6ICcnLFxuICAgIGltZzogW10sXG4gICAgc2VlVHlwZTogMCxcbiAgICBhY3Rpdml0eVR5cGU6IDAsXG4gICAgYWN0aXZpdHlKb2luVHlwZTogW1xuICAgICAge1xuICAgICAgICBpZDogMCxcbiAgICAgICAgdGl0bGU6ICfljZXpgIknLFxuICAgICAgICB0eXBlOiAncmFkaW8nXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogMSxcbiAgICAgICAgdGl0bGU6ICflpJrpgIknLFxuICAgICAgICB0eXBlOiAnc2VsZWN0J1xuICAgICAgfVxuICAgIF0sXG4gICAgcmVtaW5kVHlwZTogW1xuICAgICAge1xuICAgICAgICBpZDogMCxcbiAgICAgICAgdGl0bGU6ICflkKYnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogMSxcbiAgICAgICAgdGl0bGU6ICfmmK8nXG4gICAgICB9XG4gICAgXSxcbiAgICB0eXBlOiBbXG4gICAgICB7XG4gICAgICAgIGlkOiAwLFxuICAgICAgICB0aXRsZTogJ+ePree6p+WPr+ingScsXG4gICAgICAgIHR5cGU6ICdjbGFzcydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAxLFxuICAgICAgICB0aXRsZTogJ+WFqOmDqOWPr+ingScsXG4gICAgICAgIHR5cGU6ICdhbGwnXG4gICAgICB9XG4gICAgXSxcbiAgICB0eXBlTGlzdDoge1xuICAgICAgem9uZTogJ+WutumVv+WciCcsXG4gICAgICBub3RpY2U6ICfpgJrnn6UnLFxuICAgICAgYWN0aXZpdHk6ICfmtLvliqgnLFxuICAgICAgbW9uZXk6ICfmlLbmrL4nXG4gICAgfSxcbiAgICBwbGFjZWhvbGRlcjogJ+ivt+WcqOatpOWPkeihqOaCqOeahOaEn+aDsycsXG4gICAgYWN0aXZlVHlwZTogJ3pvbmUnLFxuICAgIGFjdGl2aXR5TGlzdDogW10sXG4gICAgY2FuU3VibWl0OiBmYWxzZSxcbiAgICBtZW1iZXJJbmZvOiBudWxsLFxuICAgIGNsYXNzSW5mbzogbnVsbCxcbiAgICBtb25leTogJycsXG4gICAgaXNSZW1pbmQ6IDEsXG4gICAgbW9uZXlMaXN0OiBbXSxcbiAgICBtYXhQaG90b0NvdW50OiA5LFxuICAgIHVwbG9hZHM6IFtdXG4gIH1cbiAgY29tbW9uRm4ocmVzKSB7XG4gICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgIHNldEZyb21QdWJsaXNoKHRydWUpXG4gICAgICBzaG93TXNnKCflj5HluIPmiJDlip8nLCAyMDAwKVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHd4Lm5hdmlnYXRlQmFjaygpXG4gICAgICB9LCAyMDAwKVxuICAgIH1cbiAgfVxuICBvbkxvYWQgPSAoZSkgPT4ge1xuICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXG4gICAgdGhpcy5tZW1iZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nKVxuICAgIGNvbnN0IHR5cGUgPSBlLnR5cGVcbiAgICB3eC5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe1xuICAgICAgdGl0bGU6IGDlj5HluIMke3RoaXMudHlwZUxpc3RbdHlwZV19YFxuICAgIH0pXG4gICAgaWYgKHR5cGUgIT09ICd6b25lJykge1xuICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IGDor7flnKjmraTlvZXlhaXmgqjnmoQke3RoaXMudHlwZUxpc3RbdHlwZV196K+m5oOFYFxuICAgIH1cbiAgICB0aGlzLmFjdGl2ZVR5cGUgPSB0eXBlXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIGNoZWNrQ2FuU3VibWl0KCkge1xuICAgIGNvbnN0IG1zZyA9IGDor7floavlhpnmgqjnmoQke3RoaXMudHlwZUxpc3RbdGhpcy5hY3RpdmVUeXBlXX3mj4/ov7Dor6bmg4VgXG4gICAgaWYgKGlzRW1wdHlTdHJpbmcodGhpcy5tc2cpKSB7XG4gICAgICBzaG93TXNnKG1zZylcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlXG4gIH1cbiAgc2F2ZUNpcmNsZXMoY29tbW9uUGFyYW1zLCB0eXBlKSB7XG4gICAgY29uc3QgcGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zLCB7XG4gICAgICBpbWdfdXJsOiB0aGlzLmltZ1xuICAgIH0pXG4gICAgY29uc3QgY2lyY2xlUGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgcGFyYW1zLCB7XG4gICAgICBzZWVfdHlwZTogdGhpcy50eXBlW3RoaXMuc2VlVHlwZV0udHlwZVxuICAgIH0pXG4gICAgaWYgKHR5cGUgPT09ICdtb25leScpIHtcbiAgICAgIGlmICghdGhpcy5tb25leUxpc3QubGVuZ3RoKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+iHs+Wwkea3u+WKoOS4gOS4quaUtuasvuadoeebricpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgY29uc3QgbW9uZXlQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBwYXJhbXMsIHtcbiAgICAgICAgaXRlbTogdGhpcy5tb25leUxpc3QsXG4gICAgICAgIHR5cGU6ICdzdHVkZW50J1xuICAgICAgfSlcbiAgICAgIGFkZENvbGxlY3Rpb24obW9uZXlQYXJhbXMpLnRoZW4ocmVzID0+IHsgdGhpcy5jb21tb25GbihyZXMpIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGFkZENpcmNsZXMoY2lyY2xlUGFyYW1zKS50aGVuKHJlcyA9PiB7IHRoaXMuY29tbW9uRm4ocmVzKSB9KVxuICAgIH1cbiAgfVxuICBzYXZlQWN0aXZpdHkoY29tbW9uUGFyYW1zKSB7XG4gICAgaWYgKCF0aGlzLmFjdGl2aXR5TGlzdC5sZW5ndGgpIHtcbiAgICAgIHNob3dNc2coJ+ivt+iHs+Wwkea3u+WKoOS4gOS4qua0u+WKqOmAiemhuScpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgcGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zLCB7XG4gICAgICBzZWxlY3RUeXBlOiB0aGlzLmFjdGl2aXR5Sm9pblR5cGVbdGhpcy5hY3Rpdml0eVR5cGVdLnR5cGUsXG4gICAgICBzaWduX3R5cGU6ICdhbGwnLFxuICAgICAgaXRlbTogdGhpcy5hY3Rpdml0eUxpc3QsXG4gICAgICBpbWdfdXJsOiB0aGlzLmltZ1xuICAgIH0pXG4gICAgYWRkQWN0aXZpdHkocGFyYW1zKS50aGVuKHJlcyA9PiB7IHRoaXMuY29tbW9uRm4ocmVzKX0pXG4gIH1cbiAgc2F2ZU5vdGljZShjb21tb25QYXJhbXMpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMsIHtcbiAgICAgIHJlbWluZDogTnVtYmVyKHRoaXMuaXNSZW1pbmQpXG4gICAgfSlcbiAgICBhZGROb3RpZnkocGFyYW1zKS50aGVuKHJlcyA9PiB7IHRoaXMuY29tbW9uRm4ocmVzKSB9KVxuICB9XG4gIGNoZWNrUmVwZWF0KHZhbHVlLCBhcnIpIHtcbiAgICBsZXQgcmV0VmFsdWUgPSBmYWxzZVxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhcnIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmIChhcnJbaV0ubmFtZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgcmV0VmFsdWUgPSB0cnVlXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICByZXRWYWx1ZSA9IGZhbHNlXG4gICAgfVxuICAgIHJldHVybiByZXRWYWx1ZVxuICB9XG4gIHdhdGNoID0ge1xuICAgIG1zZyAobmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgIGlmICghaXNFbXB0eVN0cmluZyhuZXdWYWwpKSB7XG4gICAgICAgIHRoaXMuY2FuU3VibWl0ID0gdHJ1ZVxuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuICBtZXRob2RzID0ge1xuICAgIHNlbGVjdFNlZVR5cGUoaWQpIHtcbiAgICAgIHRoaXMuc2VlVHlwZSA9IGlkXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBjaG9vc2VJbWFnZSgpIHtcbiAgICAgIGlmICh0aGlzLmltZy5sZW5ndGggPiB0aGlzLm1heFBob3RvQ291bnQpIHtcbiAgICAgICAgc2hvd01zZygn5pyA5aSa5LiK5LygOeW8oOWbvicpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgbGV0IF90aGlzID0gdGhpc1xuICAgICAgd3guY2hvb3NlSW1hZ2Uoe1xuICAgICAgICBjb3VudDogdGhpcy5tYXhQaG90b0NvdW50LFxuICAgICAgICBzaXplVHlwZTogWydvcmlnaW5hbCcsICdjb21wcmVzc2VkJ10sXG4gICAgICAgIHNvdXJjZVR5cGU6IFsnYWxidW0nLCAnY2FtZXJhJ10sXG4gICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgY29uc3QgbGVuZ3RoID0gcmVzLnRlbXBGaWxlUGF0aHMubGVuZ3RoXG4gICAgICAgICAgbGV0IHRlbXBBcnIgPSBbXVxuICAgICAgICAgIGlmICh0aGlzLmltZy5sZW5ndGggKyBsZW5ndGggPiB0aGlzLm1heFBob3RvQ291bnQpIHtcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn5pyA5aSa5Y+q6IO96YCJ5oupJyArIHRoaXMubWF4UGhvdG9Db3VudCArICflvKDlm77niYcnLFxuICAgICAgICAgICAgICBpY29uOiAnbm9uZSdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHt0aXRsZTogJ+WbvueJh+S4iuS8oOS4rSd9KVxuICAgICAgICAgIHJlcy50ZW1wRmlsZVBhdGhzLmZvckVhY2gocGF0aCA9PiB7XG4gICAgICAgICAgICBsZXQgdXBsb2FkID0ge31cbiAgICAgICAgICAgIHVwbG9hZC5wYXRoID0gcGF0aFxuICAgICAgICAgICAgdXBsb2FkLmVycm9yID0gZmFsc2VcbiAgICAgICAgICAgIHVwbG9hZC51cGxvYWRQcm9ncmVzcyA9IHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICAgICAgICB1cmw6IGAke3dlcHkuJGFwcENvbmZpZy5iYXNlVXJsfS9maWxlL3VwbG9hZFBpY2AsXG4gICAgICAgICAgICAgIGZpbGVQYXRoOiBwYXRoLFxuICAgICAgICAgICAgICBmb3JtRGF0YToge1xuICAgICAgICAgICAgICAgICdtZW1iZXJfaWQnOiB0aGlzLm1lbWJlckluZm8ubWVtYmVyX2lkLFxuICAgICAgICAgICAgICAgICdtZW1iZXJfdG9rZW4nOiB0aGlzLm1lbWJlckluZm8ubWVtYmVyX3Rva2VuLFxuICAgICAgICAgICAgICAgICdmb2xkZXInOiAnY29tbWl0dGVlJ1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBuYW1lOiAnZmlsZScsXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuZGF0YSAmJiBkYXRhLmRhdGEuZmlsZV91cmwpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IGRhdGEuZGF0YS5maWxlX3VybFxuICAgICAgICAgICAgICAgICAgdGVtcEFyci5wdXNoKHVybClcbiAgICAgICAgICAgICAgICAgIF90aGlzLmltZy5wdXNoKHVybClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRlbXBBcnIubGVuZ3RoID09PSBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICAgICAgICAgICAgICB9LCAxMDAwKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdXBsb2FkLnVwbG9hZFByb2dyZXNzLm9uUHJvZ3Jlc3NVcGRhdGUoZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgIHVwbG9hZC5wcm9ncmVzcyA9IHJlcy5wcm9ncmVzc1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF90aGlzLnVwbG9hZHMucHVzaCh1cGxvYWQpXG4gICAgICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBzdWJtaXQoKSB7XG4gICAgICAvLyBpZiAoIXRoaXMuY2FuU3VibWl0KSB7XG4gICAgICAvLyAgIHNob3dNc2coJ+ivt+ajgOafpeWPkeW4g+WGheWuuSEnKVxuICAgICAgLy8gICByZXR1cm5cbiAgICAgIC8vIH1cbiAgICAgIHRoaXMuY2hlY2tDYW5TdWJtaXQoKVxuICAgICAgY29uc3QgY29tbW9uUGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwge1xuICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXG4gICAgICAgIHR5cGU6IHRoaXMuc2VlbkluZGV4LFxuICAgICAgICBkZXNjOiB0aGlzLm1zZ1xuICAgICAgfSlcbiAgICAgIGlmICh0aGlzLmFjdGl2ZVR5cGUgPT09ICd6b25lJyB8fCB0aGlzLmFjdGl2ZVR5cGUgPT09ICdtb25leScpIHtcbiAgICAgICAgdGhpcy5zYXZlQ2lyY2xlcyhjb21tb25QYXJhbXMsIHRoaXMuYWN0aXZlVHlwZSlcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5hY3RpdmVUeXBlID09PSAnYWN0aXZpdHknKSB7XG4gICAgICAgIHRoaXMuc2F2ZUFjdGl2aXR5KGNvbW1vblBhcmFtcylcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5hY3RpdmVUeXBlID09PSAnbm90aWNlJykge1xuICAgICAgICB0aGlzLnNhdmVOb3RpY2UoY29tbW9uUGFyYW1zKVxuICAgICAgfVxuICAgIH0sXG4gICAgY2FuY2VsKCkge1xuICAgICAgdGhpcy5zaG93QWRkQWN0aXZpdHkgPSBmYWxzZVxuICAgICAgdGhpcy5zaG93QWRkTW9uZXkgPSBmYWxzZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgc3VyZSh2YWx1ZSwgdHlwZSkge1xuICAgICAgaWYgKHRoaXMuY2hlY2tSZXBlYXQodmFsdWUsIHRoaXMuYWN0aXZpdHlMaXN0KSkge1xuICAgICAgICBzaG93TXNnKCfor7fkuI3opoHovpPlhaXph43lpI3nmoTmtLvliqjpobnnm64nKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHNob3dNc2coJ+a3u+WKoOaIkOWKnycsIDEwMDApXG4gICAgICBjb25zdCBvYmogPSB7XG4gICAgICAgIG5hbWU6IHZhbHVlXG4gICAgICB9XG4gICAgICB0aGlzLmFjdGl2aXR5TGlzdC5wdXNoKG9iailcbiAgICAgIGlmICh0eXBlID09PSAnc2F2ZScpIHtcbiAgICAgICAgdGhpcy5zaG93QWRkQWN0aXZpdHkgPSBmYWxzZVxuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgbW9uZXlTdXJlRm4odmFsdWUxLCB2YWx1ZTIsIHR5cGUpIHtcbiAgICAgIGNvbnN0IG9iaiA9IHtcbiAgICAgICAgbmFtZTogdmFsdWUxLFxuICAgICAgICBtb25leTogTnVtYmVyKHZhbHVlMilcbiAgICAgIH1cbiAgICAgIHRoaXMubW9uZXlMaXN0LnB1c2gob2JqKVxuICAgICAgaWYgKHR5cGUgPT09ICdzYXZlJykge1xuICAgICAgICB0aGlzLnNob3dBZGRNb25leSA9IGZhbHNlXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBhZGROZXcoZmxhZykge1xuICAgICAgdGhpc1tmbGFnXSA9IHRydWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGRlbGV0ZUZuIChhcnIsIGluZGV4KSB7XG4gICAgICB0aGlzW2Fycl0uc3BsaWNlKGluZGV4LCAxKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgYmluZENoYW5nZShlKSB7XG4gICAgICB0aGlzW2UuY3VycmVudFRhcmdldC5pZF0gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxufVxuIl19