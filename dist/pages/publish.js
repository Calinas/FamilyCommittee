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
    }, _this2.$repeat = {}, _this2.$props = { "Modal": { "sureBtnText": "添加完成", "cancelBtnText": "再添加一项", "placeholderText": "请输入您想新增的活动项目名", "xmlns:v-bind": "", "v-bind:flag.sync": "showAddActivity", "xmlns:v-on": "" }, "Modal2": { "sureBtnText": "确认", "cancelBtnText": "取消", "placeholderText": "收款选项名", "placeholderText2": "金额", "v-bind:flag.sync": "showAddMoney" } }, _this2.$events = { "Modal": { "v-on:cancel": "cancel", "v-on:sure": "sure" }, "Modal2": { "v-on:cancel": "cancel", "v-on:sure": "moneySureFn" } }, _this2.components = {
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
        console.log(type);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2guanMiXSwibmFtZXMiOlsiUHVibGlzaCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJNb2RhbCIsIk1vZGFsMiIsImRhdGEiLCJzaG93QWRkQWN0aXZpdHkiLCJzaG93QWRkTW9uZXkiLCJtc2ciLCJpbWciLCJzZWVUeXBlIiwiYWN0aXZpdHlUeXBlIiwiYWN0aXZpdHlKb2luVHlwZSIsImlkIiwidGl0bGUiLCJ0eXBlIiwicmVtaW5kVHlwZSIsInR5cGVMaXN0Iiwiem9uZSIsIm5vdGljZSIsImFjdGl2aXR5IiwibW9uZXkiLCJwbGFjZWhvbGRlciIsImFjdGl2ZVR5cGUiLCJhY3Rpdml0eUxpc3QiLCJjYW5TdWJtaXQiLCJtZW1iZXJJbmZvIiwiY2xhc3NJbmZvIiwiaXNSZW1pbmQiLCJtb25leUxpc3QiLCJtYXhQaG90b0NvdW50IiwidXBsb2FkcyIsIm9uTG9hZCIsImUiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwiJGFwcGx5Iiwid2F0Y2giLCJuZXdWYWwiLCJvbGRWYWwiLCJtZXRob2RzIiwic2VsZWN0U2VlVHlwZSIsImNob29zZUltYWdlIiwibGVuZ3RoIiwiX3RoaXMiLCJjb3VudCIsInNpemVUeXBlIiwic291cmNlVHlwZSIsInN1Y2Nlc3MiLCJyZXMiLCJ0ZW1wRmlsZVBhdGhzIiwidGVtcEFyciIsInNob3dUb2FzdCIsImljb24iLCJzaG93TG9hZGluZyIsImZvckVhY2giLCJ1cGxvYWQiLCJwYXRoIiwiZXJyb3IiLCJ1cGxvYWRQcm9ncmVzcyIsInVwbG9hZEZpbGUiLCJ1cmwiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImFwaVVybCIsImZpbGVQYXRoIiwiZm9ybURhdGEiLCJtZW1iZXJfaWQiLCJtZW1iZXJfdG9rZW4iLCJuYW1lIiwiSlNPTiIsInBhcnNlIiwiZmlsZV91cmwiLCJwdXNoIiwic2V0VGltZW91dCIsImhpZGVMb2FkaW5nIiwib25Qcm9ncmVzc1VwZGF0ZSIsInByb2dyZXNzIiwic3VibWl0IiwiY2hlY2tDYW5TdWJtaXQiLCJjb21tb25QYXJhbXMiLCJPYmplY3QiLCJhc3NpZ24iLCJjbGFzc19pZCIsInNlZW5JbmRleCIsImRlc2MiLCJzYXZlQ2lyY2xlcyIsInNhdmVBY3Rpdml0eSIsInNhdmVOb3RpY2UiLCJjYW5jZWwiLCJzdXJlIiwidmFsdWUiLCJjb25zb2xlIiwibG9nIiwiY2hlY2tSZXBlYXQiLCJvYmoiLCJtb25leVN1cmVGbiIsInZhbHVlMSIsInZhbHVlMiIsImFkZE5ldyIsImZsYWciLCJkZWxldGVGbiIsImFyciIsImluZGV4Iiwic3BsaWNlIiwiYmluZENoYW5nZSIsImN1cnJlbnRUYXJnZXQiLCJkZXRhaWwiLCJwYWdlcyIsImdldEN1cnJlbnRQYWdlcyIsInByZXZQYWdlIiwic2V0RGF0YSIsImZyb21QdWJsaXNoIiwibmF2aWdhdGVCYWNrIiwicGFyYW1zIiwiaW1nX3VybCIsImNpcmNsZVBhcmFtcyIsInNlZV90eXBlIiwibW9uZXlQYXJhbXMiLCJpdGVtIiwidGhlbiIsImNvbW1vbkZuIiwic2VsZWN0VHlwZSIsInNpZ25fdHlwZSIsInJlbWluZCIsIk51bWJlciIsInJldFZhbHVlIiwiaSIsImxlbiIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQUNxQkEsTzs7Ozs7Ozs7Ozs7Ozs7MkxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVkMsTyxHQUFVLEUsU0FDWEMsTSxHQUFTLEVBQUMsU0FBUSxFQUFDLGVBQWMsTUFBZixFQUFzQixpQkFBZ0IsT0FBdEMsRUFBOEMsbUJBQWtCLGVBQWhFLEVBQWdGLGdCQUFlLEVBQS9GLEVBQWtHLG9CQUFtQixpQkFBckgsRUFBdUksY0FBYSxFQUFwSixFQUFULEVBQWlLLFVBQVMsRUFBQyxl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bEcsUUFBWjtBQURxQyxPQUFoQyxDQUFmO0FBR0EsMkJBQVV1RixNQUFWLEVBQWtCTSxJQUFsQixDQUF1QixlQUFPO0FBQUUsZUFBS0MsUUFBTCxDQUFjeEUsR0FBZDtBQUFvQixPQUFwRDtBQUNEOzs7Z0NBQ1cwQyxLLEVBQU9XLEcsRUFBSztBQUN0QixVQUFJd0IsV0FBVyxLQUFmO0FBQ0EsV0FBSyxJQUFJQyxJQUFJLENBQVIsRUFBV0MsTUFBTTFCLElBQUkzRCxNQUExQixFQUFrQ29GLElBQUlDLEdBQXRDLEVBQTJDRCxHQUEzQyxFQUFnRDtBQUM5QyxZQUFJekIsSUFBSXlCLENBQUosRUFBTzFELElBQVAsS0FBZ0JzQixLQUFwQixFQUEyQjtBQUN6Qm1DLHFCQUFXLElBQVg7QUFDQTtBQUNEO0FBQ0RBLG1CQUFXLEtBQVg7QUFDRDtBQUNELGFBQU9BLFFBQVA7QUFDRDs7OztFQTNKa0NHLGVBQUtDLEk7O2tCQUFyQnZJLE8iLCJmaWxlIjoicHVibGlzaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCBNb2RhbCBmcm9tICcuLi9jb21wb25lbnRzL21vZGFsJ1xuaW1wb3J0IE1vZGFsMiBmcm9tICcuLi9jb21wb25lbnRzL21vZGFsMidcbmltcG9ydCB7IHNob3dNc2csIGlzRW1wdHlTdHJpbmcsIHVwbG9hZEltYWdlIH0gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xuaW1wb3J0IHsgYWRkQ2lyY2xlcywgYWRkQ29sbGVjdGlvbiwgYWRkQWN0aXZpdHksIGFkZE5vdGlmeSB9IGZyb20gJy4uL2FwaS96b25lJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHVibGlzaCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Y+R5biDJ1xuICB9XG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJNb2RhbFwiOntcInN1cmVCdG5UZXh0XCI6XCLmt7vliqDlrozmiJBcIixcImNhbmNlbEJ0blRleHRcIjpcIuWGjea3u+WKoOS4gOmhuVwiLFwicGxhY2Vob2xkZXJUZXh0XCI6XCLor7fovpPlhaXmgqjmg7PmlrDlop7nmoTmtLvliqjpobnnm67lkI1cIixcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6ZmxhZy5zeW5jXCI6XCJzaG93QWRkQWN0aXZpdHlcIixcInhtbG5zOnYtb25cIjpcIlwifSxcIk1vZGFsMlwiOntcInN1cmVCdG5UZXh0XCI6XCLnoa7orqRcIixcImNhbmNlbEJ0blRleHRcIjpcIuWPlua2iFwiLFwicGxhY2Vob2xkZXJUZXh0XCI6XCLmlLbmrL7pgInpobnlkI1cIixcInBsYWNlaG9sZGVyVGV4dDJcIjpcIumHkeminVwiLFwidi1iaW5kOmZsYWcuc3luY1wiOlwic2hvd0FkZE1vbmV5XCJ9fTtcclxuJGV2ZW50cyA9IHtcIk1vZGFsXCI6e1widi1vbjpjYW5jZWxcIjpcImNhbmNlbFwiLFwidi1vbjpzdXJlXCI6XCJzdXJlXCJ9LFwiTW9kYWwyXCI6e1widi1vbjpjYW5jZWxcIjpcImNhbmNlbFwiLFwidi1vbjpzdXJlXCI6XCJtb25leVN1cmVGblwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgIE1vZGFsLFxuICAgIE1vZGFsMlxuICB9XG4gIGRhdGEgPSB7XG4gICAgc2hvd0FkZEFjdGl2aXR5OiBmYWxzZSxcbiAgICBzaG93QWRkTW9uZXk6IGZhbHNlLFxuICAgIG1zZzogJycsXG4gICAgaW1nOiBbXSxcbiAgICBzZWVUeXBlOiAwLFxuICAgIGFjdGl2aXR5VHlwZTogMCxcbiAgICBhY3Rpdml0eUpvaW5UeXBlOiBbXG4gICAgICB7XG4gICAgICAgIGlkOiAwLFxuICAgICAgICB0aXRsZTogJ+WNlemAiScsXG4gICAgICAgIHR5cGU6ICdyYWRpbydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAxLFxuICAgICAgICB0aXRsZTogJ+WkmumAiScsXG4gICAgICAgIHR5cGU6ICdzZWxlY3QnXG4gICAgICB9XG4gICAgXSxcbiAgICByZW1pbmRUeXBlOiBbXG4gICAgICB7XG4gICAgICAgIGlkOiAwLFxuICAgICAgICB0aXRsZTogJ+WQpidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAxLFxuICAgICAgICB0aXRsZTogJ+aYrydcbiAgICAgIH1cbiAgICBdLFxuICAgIHR5cGU6IFtcbiAgICAgIHtcbiAgICAgICAgaWQ6IDAsXG4gICAgICAgIHRpdGxlOiAn54+t57qn5Y+v6KeBJyxcbiAgICAgICAgdHlwZTogJ2NsYXNzJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6IDEsXG4gICAgICAgIHRpdGxlOiAn5YWo6YOo5Y+v6KeBJyxcbiAgICAgICAgdHlwZTogJ2FsbCdcbiAgICAgIH1cbiAgICBdLFxuICAgIHR5cGVMaXN0OiB7XG4gICAgICB6b25lOiAn5a626ZW/5ZyIJyxcbiAgICAgIG5vdGljZTogJ+mAmuefpScsXG4gICAgICBhY3Rpdml0eTogJ+a0u+WKqCcsXG4gICAgICBtb25leTogJ+aUtuasvidcbiAgICB9LFxuICAgIHBsYWNlaG9sZGVyOiAn6K+35Zyo5q2k5Y+R6KGo5oKo55qE5oSf5oOzJyxcbiAgICBhY3RpdmVUeXBlOiAnem9uZScsXG4gICAgYWN0aXZpdHlMaXN0OiBbXSxcbiAgICBjYW5TdWJtaXQ6IGZhbHNlLFxuICAgIG1lbWJlckluZm86IG51bGwsXG4gICAgY2xhc3NJbmZvOiBudWxsLFxuICAgIG1vbmV5OiAnJyxcbiAgICBpc1JlbWluZDogMCxcbiAgICBtb25leUxpc3Q6IFtdLFxuICAgIG1heFBob3RvQ291bnQ6IDksXG4gICAgdXBsb2FkczogW11cbiAgfVxuICBjb21tb25GbihyZXMpIHtcbiAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgbGV0IHBhZ2VzID0gZ2V0Q3VycmVudFBhZ2VzKCk7XG4gICAgICBsZXQgcHJldlBhZ2UgPSBwYWdlc1twYWdlcy5sZW5ndGggLSAyXTtcbiAgICAgIHByZXZQYWdlLnNldERhdGEoe1xuICAgICAgICBmcm9tUHVibGlzaDogdHJ1ZVxuICAgICAgfSlcbiAgICAgIHNob3dNc2coJ+WPkeW4g+aIkOWKnycsIDIwMDApXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgd3gubmF2aWdhdGVCYWNrKClcbiAgICAgIH0sIDIwMDApXG4gICAgfVxuICB9XG4gIG9uTG9hZCA9IChlKSA9PiB7XG4gICAgdGhpcy5jbGFzc0luZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnY2xhc3NJbmZvJylcbiAgICB0aGlzLm1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXG4gICAgY29uc3QgdHlwZSA9IGUudHlwZVxuICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XG4gICAgICB0aXRsZTogYOWPkeW4gyR7dGhpcy50eXBlTGlzdFt0eXBlXX1gXG4gICAgfSlcbiAgICBpZiAodHlwZSAhPT0gJ3pvbmUnKSB7XG4gICAgICB0aGlzLnBsYWNlaG9sZGVyID0gYOivt+WcqOatpOW9leWFpeaCqOeahCR7dGhpcy50eXBlTGlzdFt0eXBlXX3or6bmg4VgXG4gICAgfVxuICAgIHRoaXMuYWN0aXZlVHlwZSA9IHR5cGVcbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgY2hlY2tDYW5TdWJtaXQoKSB7XG4gICAgY29uc3QgbXNnID0gYOivt+Whq+WGmeaCqOeahCR7dGhpcy50eXBlTGlzdFt0aGlzLmFjdGl2ZVR5cGVdfeaPj+i/sOivpuaDhWBcbiAgICBpZiAoaXNFbXB0eVN0cmluZyh0aGlzLm1zZykpIHtcbiAgICAgIHNob3dNc2cobXNnKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuICBzYXZlQ2lyY2xlcyhjb21tb25QYXJhbXMsIHR5cGUpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMsIHtcbiAgICAgIGltZ191cmw6IHRoaXMuaW1nXG4gICAgfSlcbiAgICBjb25zdCBjaXJjbGVQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBwYXJhbXMsIHtcbiAgICAgIHNlZV90eXBlOiB0aGlzLnR5cGVbdGhpcy5zZWVUeXBlXS50eXBlXG4gICAgfSlcbiAgICBpZiAodHlwZSA9PT0gJ21vbmV5Jykge1xuICAgICAgaWYgKCF0aGlzLm1vbmV5TGlzdC5sZW5ndGgpIHtcbiAgICAgICAgc2hvd01zZygn6K+36Iez5bCR5re75Yqg5LiA5Liq5pS25qy+5p2h55uuJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBjb25zdCBtb25leVBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIHBhcmFtcywge1xuICAgICAgICBpdGVtOiB0aGlzLm1vbmV5TGlzdCxcbiAgICAgICAgdHlwZTogJ3N0dWRlbnQnXG4gICAgICB9KVxuICAgICAgYWRkQ29sbGVjdGlvbihtb25leVBhcmFtcykudGhlbihyZXMgPT4geyB0aGlzLmNvbW1vbkZuKHJlcykgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgYWRkQ2lyY2xlcyhjaXJjbGVQYXJhbXMpLnRoZW4ocmVzID0+IHsgdGhpcy5jb21tb25GbihyZXMpIH0pXG4gICAgfVxuICB9XG4gIHNhdmVBY3Rpdml0eShjb21tb25QYXJhbXMpIHtcbiAgICBpZiAoIXRoaXMuYWN0aXZpdHlMaXN0Lmxlbmd0aCkge1xuICAgICAgc2hvd01zZygn6K+36Iez5bCR5re75Yqg5LiA5Liq5rS75Yqo6YCJ6aG5JylcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCBwYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMsIHtcbiAgICAgIHNlbGVjdFR5cGU6IHRoaXMuYWN0aXZpdHlKb2luVHlwZVt0aGlzLmFjdGl2aXR5VHlwZV0udHlwZSxcbiAgICAgIHNpZ25fdHlwZTogJ2FsbCcsXG4gICAgICBpdGVtOiB0aGlzLmFjdGl2aXR5TGlzdCxcbiAgICAgIGltZ191cmw6IHRoaXMuaW1nXG4gICAgfSlcbiAgICBhZGRBY3Rpdml0eShwYXJhbXMpLnRoZW4ocmVzID0+IHsgdGhpcy5jb21tb25GbihyZXMpfSlcbiAgfVxuICBzYXZlTm90aWNlKGNvbW1vblBhcmFtcykge1xuICAgIGNvbnN0IHBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcywge1xuICAgICAgcmVtaW5kOiBOdW1iZXIodGhpcy5pc1JlbWluZClcbiAgICB9KVxuICAgIGFkZE5vdGlmeShwYXJhbXMpLnRoZW4ocmVzID0+IHsgdGhpcy5jb21tb25GbihyZXMpIH0pXG4gIH1cbiAgY2hlY2tSZXBlYXQodmFsdWUsIGFycikge1xuICAgIGxldCByZXRWYWx1ZSA9IGZhbHNlXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGFyci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgaWYgKGFycltpXS5uYW1lID09PSB2YWx1ZSkge1xuICAgICAgICByZXRWYWx1ZSA9IHRydWVcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIHJldFZhbHVlID0gZmFsc2VcbiAgICB9XG4gICAgcmV0dXJuIHJldFZhbHVlXG4gIH1cbiAgd2F0Y2ggPSB7XG4gICAgbXNnIChuZXdWYWwsIG9sZFZhbCkge1xuICAgICAgaWYgKCFpc0VtcHR5U3RyaW5nKG5ld1ZhbCkpIHtcbiAgICAgICAgdGhpcy5jYW5TdWJtaXQgPSB0cnVlXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgc2VsZWN0U2VlVHlwZShpZCkge1xuICAgICAgdGhpcy5zZWVUeXBlID0gaWRcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGNob29zZUltYWdlKCkge1xuICAgICAgaWYgKHRoaXMuaW1nLmxlbmd0aCA+IHRoaXMubWF4UGhvdG9Db3VudCkge1xuICAgICAgICBzaG93TXNnKCfmnIDlpJrkuIrkvKA55byg5Zu+JylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBsZXQgX3RoaXMgPSB0aGlzXG4gICAgICB3eC5jaG9vc2VJbWFnZSh7XG4gICAgICAgIGNvdW50OiB0aGlzLm1heFBob3RvQ291bnQsXG4gICAgICAgIHNpemVUeXBlOiBbJ29yaWdpbmFsJywgJ2NvbXByZXNzZWQnXSxcbiAgICAgICAgc291cmNlVHlwZTogWydhbGJ1bScsICdjYW1lcmEnXSxcbiAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICBjb25zdCBsZW5ndGggPSByZXMudGVtcEZpbGVQYXRocy5sZW5ndGhcbiAgICAgICAgICBsZXQgdGVtcEFyciA9IFtdXG4gICAgICAgICAgaWYgKHRoaXMuaW1nLmxlbmd0aCArIGxlbmd0aCA+IHRoaXMubWF4UGhvdG9Db3VudCkge1xuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfmnIDlpJrlj6rog73pgInmi6knICsgdGhpcy5tYXhQaG90b0NvdW50ICsgJ+W8oOWbvueJhycsXG4gICAgICAgICAgICAgIGljb246ICdub25lJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgICAgd3guc2hvd0xvYWRpbmcoe3RpdGxlOiAn5Zu+54mH5LiK5Lyg5LitJ30pXG4gICAgICAgICAgcmVzLnRlbXBGaWxlUGF0aHMuZm9yRWFjaChwYXRoID0+IHtcbiAgICAgICAgICAgIGxldCB1cGxvYWQgPSB7fVxuICAgICAgICAgICAgdXBsb2FkLnBhdGggPSBwYXRoXG4gICAgICAgICAgICB1cGxvYWQuZXJyb3IgPSBmYWxzZVxuICAgICAgICAgICAgdXBsb2FkLnVwbG9hZFByb2dyZXNzID0gd3gudXBsb2FkRmlsZSh7XG4gICAgICAgICAgICAgIHVybDogYCR7X3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmFwaVVybH0vZmlsZS91cGxvYWRQaWNgLFxuICAgICAgICAgICAgICBmaWxlUGF0aDogcGF0aCxcbiAgICAgICAgICAgICAgZm9ybURhdGE6IHtcbiAgICAgICAgICAgICAgICAnbWVtYmVyX2lkJzogdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCxcbiAgICAgICAgICAgICAgICAnbWVtYmVyX3Rva2VuJzogdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl90b2tlbixcbiAgICAgICAgICAgICAgICAnZm9sZGVyJzogJ2NvbW1pdHRlZSdcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKVxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmRhdGEgJiYgZGF0YS5kYXRhLmZpbGVfdXJsKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBkYXRhLmRhdGEuZmlsZV91cmxcbiAgICAgICAgICAgICAgICAgIHRlbXBBcnIucHVzaCh1cmwpXG4gICAgICAgICAgICAgICAgICBfdGhpcy5pbWcucHVzaCh1cmwpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0ZW1wQXJyLmxlbmd0aCA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgICAgICAgICAgICAgfSwgMTAwMClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHVwbG9hZC51cGxvYWRQcm9ncmVzcy5vblByb2dyZXNzVXBkYXRlKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICB1cGxvYWQucHJvZ3Jlc3MgPSByZXMucHJvZ3Jlc3NcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBfdGhpcy51cGxvYWRzLnB1c2godXBsb2FkKVxuICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgc3VibWl0KCkge1xuICAgICAgLy8gaWYgKCF0aGlzLmNhblN1Ym1pdCkge1xuICAgICAgLy8gICBzaG93TXNnKCfor7fmo4Dmn6Xlj5HluIPlhoXlrrkhJylcbiAgICAgIC8vICAgcmV0dXJuXG4gICAgICAvLyB9XG4gICAgICB0aGlzLmNoZWNrQ2FuU3VibWl0KClcbiAgICAgIGNvbnN0IGNvbW1vblBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIHtcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgICB0eXBlOiB0aGlzLnNlZW5JbmRleCxcbiAgICAgICAgZGVzYzogdGhpcy5tc2dcbiAgICAgIH0pXG4gICAgICBpZiAodGhpcy5hY3RpdmVUeXBlID09PSAnem9uZScgfHwgdGhpcy5hY3RpdmVUeXBlID09PSAnbW9uZXknKSB7XG4gICAgICAgIHRoaXMuc2F2ZUNpcmNsZXMoY29tbW9uUGFyYW1zLCB0aGlzLmFjdGl2ZVR5cGUpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuYWN0aXZlVHlwZSA9PT0gJ2FjdGl2aXR5Jykge1xuICAgICAgICB0aGlzLnNhdmVBY3Rpdml0eShjb21tb25QYXJhbXMpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuYWN0aXZlVHlwZSA9PT0gJ25vdGljZScpIHtcbiAgICAgICAgdGhpcy5zYXZlTm90aWNlKGNvbW1vblBhcmFtcylcbiAgICAgIH1cbiAgICB9LFxuICAgIGNhbmNlbCgpIHtcbiAgICAgIHRoaXMuc2hvd0FkZEFjdGl2aXR5ID0gZmFsc2VcbiAgICAgIHRoaXMuc2hvd0FkZE1vbmV5ID0gZmFsc2VcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIHN1cmUodmFsdWUsIHR5cGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKHR5cGUpXG4gICAgICBpZiAodGhpcy5jaGVja1JlcGVhdCh2YWx1ZSwgdGhpcy5hY3Rpdml0eUxpc3QpKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+S4jeimgei+k+WFpemHjeWkjeeahOa0u+WKqOmhueebricpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgY29uc3Qgb2JqID0ge1xuICAgICAgICBuYW1lOiB2YWx1ZVxuICAgICAgfVxuICAgICAgdGhpcy5hY3Rpdml0eUxpc3QucHVzaChvYmopXG4gICAgICBpZiAodHlwZSA9PT0gJ3NhdmUnKSB7XG4gICAgICAgIHRoaXMuc2hvd0FkZEFjdGl2aXR5ID0gZmFsc2VcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIG1vbmV5U3VyZUZuKHZhbHVlMSwgdmFsdWUyKSB7XG4gICAgICBjb25zdCBvYmogPSB7XG4gICAgICAgIG5hbWU6IHZhbHVlMSxcbiAgICAgICAgbW9uZXk6IHZhbHVlMlxuICAgICAgfVxuICAgICAgdGhpcy5tb25leUxpc3QucHVzaChvYmopXG4gICAgICB0aGlzLnNob3dBZGRNb25leSA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBhZGROZXcoZmxhZykge1xuICAgICAgdGhpc1tmbGFnXSA9IHRydWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGRlbGV0ZUZuIChhcnIsIGluZGV4KSB7XG4gICAgICB0aGlzW2Fycl0uc3BsaWNlKGluZGV4LCAxKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgYmluZENoYW5nZShlKSB7XG4gICAgICB0aGlzW2UuY3VycmVudFRhcmdldC5pZF0gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxufVxuIl19