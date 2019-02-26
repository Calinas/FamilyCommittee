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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2guanMiXSwibmFtZXMiOlsiUHVibGlzaCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJNb2RhbCIsIk1vZGFsMiIsImRhdGEiLCJzaG93QWRkQWN0aXZpdHkiLCJzaG93QWRkTW9uZXkiLCJtc2ciLCJpbWciLCJzZWVUeXBlIiwiYWN0aXZpdHlUeXBlIiwiYWN0aXZpdHlKb2luVHlwZSIsImlkIiwidGl0bGUiLCJ0eXBlIiwicmVtaW5kVHlwZSIsInR5cGVMaXN0Iiwiem9uZSIsIm5vdGljZSIsImFjdGl2aXR5IiwibW9uZXkiLCJwbGFjZWhvbGRlciIsImFjdGl2ZVR5cGUiLCJhY3Rpdml0eUxpc3QiLCJjYW5TdWJtaXQiLCJtZW1iZXJJbmZvIiwiY2xhc3NJbmZvIiwiaXNSZW1pbmQiLCJtb25leUxpc3QiLCJtYXhQaG90b0NvdW50IiwidXBsb2FkcyIsIm9uTG9hZCIsImUiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwiJGFwcGx5Iiwid2F0Y2giLCJuZXdWYWwiLCJvbGRWYWwiLCJtZXRob2RzIiwiY2hvb3NlSW1hZ2UiLCJsZW5ndGgiLCJfdGhpcyIsImNvdW50Iiwic2l6ZVR5cGUiLCJzb3VyY2VUeXBlIiwic3VjY2VzcyIsInJlcyIsInRlbXBGaWxlUGF0aHMiLCJzaG93VG9hc3QiLCJpY29uIiwiZm9yRWFjaCIsInVwbG9hZCIsInBhdGgiLCJlcnJvciIsInVwbG9hZFByb2dyZXNzIiwidXBsb2FkRmlsZSIsInVybCIsImZpbGVQYXRoIiwiZm9ybURhdGEiLCJtZW1iZXJfaWQiLCJtZW1iZXJfdG9rZW4iLCJuYW1lIiwiSlNPTiIsInBhcnNlIiwiZmlsZV91cmwiLCJwdXNoIiwib25Qcm9ncmVzc1VwZGF0ZSIsInByb2dyZXNzIiwic3VibWl0IiwiY2hlY2tDYW5TdWJtaXQiLCJjb21tb25QYXJhbXMiLCJPYmplY3QiLCJhc3NpZ24iLCJjbGFzc19pZCIsInNlZW5JbmRleCIsImRlc2MiLCJzYXZlQ2lyY2xlcyIsInNhdmVBY3Rpdml0eSIsInNhdmVOb3RpY2UiLCJjYW5jZWwiLCJzdXJlIiwidmFsdWUiLCJjaGVja1JlcGVhdCIsIm9iaiIsIm1vbmV5U3VyZUZuIiwidmFsdWUxIiwidmFsdWUyIiwiYWRkTmV3IiwiZmxhZyIsImRlbGV0ZUZuIiwiYXJyIiwiaW5kZXgiLCJzcGxpY2UiLCJiaW5kQ2hhbmdlIiwiY3VycmVudFRhcmdldCIsImRldGFpbCIsInNldFRpbWVvdXQiLCJuYXZpZ2F0ZUJhY2siLCJwYXJhbXMiLCJpbWdfdXJsIiwiY2lyY2xlUGFyYW1zIiwic2VlX3R5cGUiLCJtb25leVBhcmFtcyIsIml0ZW0iLCJ0aGVuIiwiY29tbW9uRm4iLCJzZWxlY3RUeXBlIiwic2lnbl90eXBlIiwicmVtaW5kIiwiTnVtYmVyIiwicmV0VmFsdWUiLCJpIiwibGVuIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBQ3FCQSxPOzs7Ozs7Ozs7Ozs7OzsyTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdWQyxPLEdBQVUsRSxTQUNYQyxNLEdBQVMsRUFBQyxTQUFRLEVBQUMsZUFBYyxNQUFmLEVBQXNCLGlCQUFnQixJQUF0QyxFQUEyQyxtQkFBa0IsZUFBN0QsRUFBNkUsZ0JBQWUsRUFBNUYsRUFBK0Ysb0JBQW1CLGlCQUFsSCxFQUFvSSxjQUFhLEVBQWpKLEVBQVQsRUFBOEosVUFBUyxFQUFDLGVBQWMsSUFBZixFQUFvQixpQkFBZ0IsSUFBcEMsRUFBeUMsbUJBQWtCLE9BQTNELEVBQW1FLG9CQUFtQixJQUF0RixFQUEyRixvQkFBbUIsY0FBOUcsRUFBdkssRSxTQUNUQyxPLEdBQVUsRUFBQyxTQUFRLEVBQUMsZUFBYyxRQUFmLEVBQXdCLGFBQVksTUFBcEMsRUFBVCxFQUFxRCxVQUFTLEVBQUMsZUFBYyxRQUFmLEVBQXdCLGFBQVksYUFBcEMsRUFBOUQsRSxTQUNUQyxVLEdBQWE7QUFDVkMsNEJBRFU7QUFFVkM7QUFGVSxLLFNBSVpDLEksR0FBTztBQUNMQyx1QkFBaUIsS0FEWjtBQUVMQyxvQkFBYyxLQUZUO0FBR0xDLFdBQUssRUFIQTtBQUlMQyxXQUFLLEVBSkE7QUFLTEMsZUFBUyxDQUxKO0FBTUxDLG9CQUFjLENBTlQ7QUFPTEMsd0JBQWtCLENBQ2hCO0FBQ0VDLFlBQUksQ0FETjtBQUVFQyxlQUFPLElBRlQ7QUFHRUMsY0FBTTtBQUhSLE9BRGdCLEVBTWhCO0FBQ0VGLFlBQUksQ0FETjtBQUVFQyxlQUFPLElBRlQ7QUFHRUMsY0FBTTtBQUhSLE9BTmdCLENBUGI7QUFtQkxDLGtCQUFZLENBQ1Y7QUFDRUgsWUFBSSxDQUROO0FBRUVDLGVBQU87QUFGVCxPQURVLEVBS1Y7QUFDRUQsWUFBSSxDQUROO0FBRUVDLGVBQU87QUFGVCxPQUxVLENBbkJQO0FBNkJMQyxZQUFNLENBQ0o7QUFDRUYsWUFBSSxDQUROO0FBRUVDLGVBQU8sTUFGVDtBQUdFQyxjQUFNO0FBSFIsT0FESSxFQU1KO0FBQ0VGLFlBQUksQ0FETjtBQUVFQyxlQUFPLE1BRlQ7QUFHRUMsY0FBTTtBQUhSLE9BTkksQ0E3QkQ7QUF5Q0xFLGdCQUFVO0FBQ1JDLGNBQU0sS0FERTtBQUVSQyxnQkFBUSxJQUZBO0FBR1JDLGtCQUFVLElBSEY7QUFJUkMsZUFBTztBQUpDLE9BekNMO0FBK0NMQyxtQkFBYSxXQS9DUjtBQWdETEMsa0JBQVksTUFoRFA7QUFpRExDLG9CQUFjLEVBakRUO0FBa0RMQyxpQkFBVyxLQWxETjtBQW1ETEMsa0JBQVksSUFuRFA7QUFvRExDLGlCQUFXLElBcEROO0FBcURMTixhQUFPLEVBckRGO0FBc0RMTyxnQkFBVSxDQXRETDtBQXVETEMsaUJBQVcsRUF2RE47QUF3RExDLHFCQUFlLENBeERWO0FBeURMQyxlQUFTO0FBekRKLEssU0FtRVBDLE0sR0FBUyxVQUFDQyxDQUFELEVBQU87QUFDZCxhQUFLTixTQUFMLEdBQWlCTyxHQUFHQyxjQUFILENBQWtCLFdBQWxCLENBQWpCO0FBQ0EsYUFBS1QsVUFBTCxHQUFrQlEsR0FBR0MsY0FBSCxDQUFrQixZQUFsQixDQUFsQjtBQUNBLFVBQU1wQixPQUFPa0IsRUFBRWxCLElBQWY7QUFDQW1CLFNBQUdFLHFCQUFILENBQXlCO0FBQ3ZCdEIsZ0NBQVksT0FBS0csUUFBTCxDQUFjRixJQUFkO0FBRFcsT0FBekI7QUFHQSxVQUFJQSxTQUFTLE1BQWIsRUFBcUI7QUFDbkIsZUFBS08sV0FBTCxrREFBNkIsT0FBS0wsUUFBTCxDQUFjRixJQUFkLENBQTdCO0FBQ0Q7QUFDRCxhQUFLUSxVQUFMLEdBQWtCUixJQUFsQjtBQUNBLGFBQUtzQixNQUFMO0FBQ0QsSyxTQTZEREMsSyxHQUFRO0FBQ045QixTQURNLGVBQ0QrQixNQURDLEVBQ09DLE1BRFAsRUFDZTtBQUNuQixZQUFJLENBQUMsMkJBQWNELE1BQWQsQ0FBTCxFQUE0QjtBQUMxQixlQUFLZCxTQUFMLEdBQWlCLElBQWpCO0FBQ0Q7QUFDRCxhQUFLWSxNQUFMO0FBQ0Q7QUFOSyxLLFNBUVJJLE8sR0FBVTtBQUNSQyxpQkFEUSx5QkFDTTtBQUFBOztBQUNaLFlBQUksS0FBS2pDLEdBQUwsQ0FBU2tDLE1BQVQsR0FBa0IsS0FBS2IsYUFBM0IsRUFBMEM7QUFDeEMsK0JBQVEsU0FBUjtBQUNBO0FBQ0Q7QUFDRCxZQUFJYyxRQUFRLElBQVo7QUFDQVYsV0FBR1EsV0FBSCxDQUFlO0FBQ2JHLGlCQUFPLEtBQUtmLGFBREM7QUFFYmdCLG9CQUFVLENBQUMsVUFBRCxFQUFhLFlBQWIsQ0FGRztBQUdiQyxzQkFBWSxDQUFDLE9BQUQsRUFBVSxRQUFWLENBSEM7QUFJYkMsbUJBQVMsc0JBQU87QUFDZCxnQkFBSSxPQUFLdkMsR0FBTCxDQUFTa0MsTUFBVCxHQUFrQk0sSUFBSUMsYUFBSixDQUFrQlAsTUFBcEMsR0FBNkMsT0FBS2IsYUFBdEQsRUFBcUU7QUFDbkVJLGlCQUFHaUIsU0FBSCxDQUFhO0FBQ1hyQyx1QkFBTyxXQUFXLE9BQUtnQixhQUFoQixHQUFnQyxLQUQ1QjtBQUVYc0Isc0JBQU07QUFGSyxlQUFiO0FBSUQ7QUFDREgsZ0JBQUlDLGFBQUosQ0FBa0JHLE9BQWxCLENBQTBCLGdCQUFRO0FBQ2hDLGtCQUFJQyxTQUFTLEVBQWI7QUFDQUEscUJBQU9DLElBQVAsR0FBY0EsSUFBZDtBQUNBRCxxQkFBT0UsS0FBUCxHQUFlLEtBQWY7QUFDQUYscUJBQU9HLGNBQVAsR0FBd0J2QixHQUFHd0IsVUFBSCxDQUFjO0FBQ3BDQyxxQkFBSyw4Q0FEK0I7QUFFcENDLDBCQUFVTCxJQUYwQjtBQUdwQ00sMEJBQVU7QUFDUiwrQkFBYSxPQUFLbkMsVUFBTCxDQUFnQm9DLFNBRHJCO0FBRVIsa0NBQWdCLE9BQUtwQyxVQUFMLENBQWdCcUMsWUFGeEI7QUFHUiw0QkFBVTtBQUhGLGlCQUgwQjtBQVFwQ0Msc0JBQU0sTUFSOEI7QUFTcENoQix5QkFBUyxzQkFBTztBQUNkLHNCQUFNM0MsT0FBTzRELEtBQUtDLEtBQUwsQ0FBV2pCLElBQUk1QyxJQUFmLENBQWI7QUFDQSxzQkFBTXNELE1BQU10RCxLQUFLQSxJQUFMLENBQVU4RCxRQUF0QjtBQUNBdkIsd0JBQU1uQyxHQUFOLENBQVUyRCxJQUFWLENBQWVULEdBQWY7QUFDQWYsd0JBQU1QLE1BQU47QUFDRDtBQWRtQyxlQUFkLENBQXhCO0FBZ0JBaUIscUJBQU9HLGNBQVAsQ0FBc0JZLGdCQUF0QixDQUF1QyxVQUFTcEIsR0FBVCxFQUFjO0FBQ25ESyx1QkFBT2dCLFFBQVAsR0FBa0JyQixJQUFJcUIsUUFBdEI7QUFDRCxlQUZEO0FBR0ExQixvQkFBTWIsT0FBTixDQUFjcUMsSUFBZCxDQUFtQmQsTUFBbkI7QUFDQVYsb0JBQU1QLE1BQU47QUFDRCxhQXpCRDtBQTBCRDtBQXJDWSxTQUFmO0FBdUNELE9BOUNPO0FBK0NSa0MsWUEvQ1Esb0JBK0NDO0FBQ1AsWUFBSSxDQUFDLEtBQUs5QyxTQUFWLEVBQXFCO0FBQ25CLCtCQUFRLFVBQVI7QUFDQTtBQUNEO0FBQ0QsYUFBSytDLGNBQUw7QUFDQSxZQUFNQyxlQUFlQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQjtBQUNyQ0Msb0JBQVUsS0FBS2pELFNBQUwsQ0FBZWQsRUFEWTtBQUVyQ0UsZ0JBQU0sS0FBSzhELFNBRjBCO0FBR3JDQyxnQkFBTSxLQUFLdEU7QUFIMEIsU0FBbEIsQ0FBckI7QUFLQSxZQUFJLEtBQUtlLFVBQUwsS0FBb0IsTUFBcEIsSUFBOEIsS0FBS0EsVUFBTCxLQUFvQixPQUF0RCxFQUErRDtBQUM3RCxlQUFLd0QsV0FBTCxDQUFpQk4sWUFBakIsRUFBK0IsS0FBS2xELFVBQXBDO0FBQ0QsU0FGRCxNQUVPLElBQUksS0FBS0EsVUFBTCxLQUFvQixVQUF4QixFQUFvQztBQUN6QyxlQUFLeUQsWUFBTCxDQUFrQlAsWUFBbEI7QUFDRCxTQUZNLE1BRUEsSUFBSSxLQUFLbEQsVUFBTCxLQUFvQixRQUF4QixFQUFrQztBQUN2QyxlQUFLMEQsVUFBTCxDQUFnQlIsWUFBaEI7QUFDRDtBQUNGLE9BakVPO0FBa0VSUyxZQWxFUSxvQkFrRUM7QUFDUCxhQUFLNUUsZUFBTCxHQUF1QixLQUF2QjtBQUNBLGFBQUtDLFlBQUwsR0FBb0IsS0FBcEI7QUFDQSxhQUFLOEIsTUFBTDtBQUNELE9BdEVPO0FBdUVSOEMsVUF2RVEsZ0JBdUVIQyxLQXZFRyxFQXVFSTtBQUNWLFlBQUksS0FBS0MsV0FBTCxDQUFpQkQsS0FBakIsRUFBd0IsS0FBSzVELFlBQTdCLENBQUosRUFBZ0Q7QUFDOUMsK0JBQVEsY0FBUjtBQUNBO0FBQ0Q7QUFDRCxZQUFNOEQsTUFBTTtBQUNWdEIsZ0JBQU1vQjtBQURJLFNBQVo7QUFHQSxhQUFLNUQsWUFBTCxDQUFrQjRDLElBQWxCLENBQXVCa0IsR0FBdkI7QUFDQSxhQUFLaEYsZUFBTCxHQUF1QixLQUF2QjtBQUNBLGFBQUsrQixNQUFMO0FBQ0QsT0FsRk87QUFtRlJrRCxpQkFuRlEsdUJBbUZJQyxNQW5GSixFQW1GWUMsTUFuRlosRUFtRm9CO0FBQzFCLFlBQU1ILE1BQU07QUFDVnRCLGdCQUFNd0IsTUFESTtBQUVWbkUsaUJBQU9vRTtBQUZHLFNBQVo7QUFJQSxhQUFLNUQsU0FBTCxDQUFldUMsSUFBZixDQUFvQmtCLEdBQXBCO0FBQ0EsYUFBSy9FLFlBQUwsR0FBb0IsS0FBcEI7QUFDQSxhQUFLOEIsTUFBTDtBQUNELE9BM0ZPO0FBNEZScUQsWUE1RlEsa0JBNEZEQyxJQTVGQyxFQTRGSztBQUNYLGFBQUtBLElBQUwsSUFBYSxJQUFiO0FBQ0EsYUFBS3RELE1BQUw7QUFDRCxPQS9GTztBQWdHUnVELGNBaEdRLG9CQWdHRUMsR0FoR0YsRUFnR09DLEtBaEdQLEVBZ0djO0FBQ3BCLGFBQUtELEdBQUwsRUFBVUUsTUFBVixDQUFpQkQsS0FBakIsRUFBd0IsQ0FBeEI7QUFDQSxhQUFLekQsTUFBTDtBQUNELE9BbkdPO0FBb0dSMkQsZ0JBcEdRLHNCQW9HRy9ELENBcEdILEVBb0dNO0FBQ1osYUFBS0EsRUFBRWdFLGFBQUYsQ0FBZ0JwRixFQUFyQixJQUEyQm9CLEVBQUVpRSxNQUFGLENBQVNkLEtBQXBDO0FBQ0EsYUFBSy9DLE1BQUw7QUFDRDtBQXZHTyxLOzs7Ozs2QkF6RkRZLEcsRUFBSztBQUNaLFVBQUlBLElBQUk1QyxJQUFKLENBQVMyQyxPQUFiLEVBQXNCO0FBQ3BCLDZCQUFRLE1BQVIsRUFBZ0IsSUFBaEI7QUFDQW1ELG1CQUFXLFlBQU07QUFDZmpFLGFBQUdrRSxZQUFIO0FBQ0QsU0FGRCxFQUVHLElBRkg7QUFHRDtBQUNGOzs7cUNBY2dCO0FBQ2YsVUFBTTVGLHlDQUFjLEtBQUtTLFFBQUwsQ0FBYyxLQUFLTSxVQUFuQixDQUFkLDZCQUFOO0FBQ0EsVUFBSSwyQkFBYyxLQUFLZixHQUFuQixDQUFKLEVBQTZCO0FBQzNCLDZCQUFRQSxHQUFSO0FBQ0EsZUFBTyxLQUFQO0FBQ0Q7O0FBRUQsYUFBTyxJQUFQO0FBQ0Q7OztnQ0FDV2lFLFksRUFBYzFELEksRUFBTTtBQUFBOztBQUM5QixVQUFNc0YsU0FBUzNCLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCRixZQUFsQixFQUFnQztBQUM3QzZCLGlCQUFTLEtBQUs3RjtBQUQrQixPQUFoQyxDQUFmO0FBR0EsVUFBTThGLGVBQWU3QixPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQjBCLE1BQWxCLEVBQTBCO0FBQzdDRyxrQkFBVSxLQUFLekYsSUFBTCxDQUFVLEtBQUtMLE9BQWYsRUFBd0JLO0FBRFcsT0FBMUIsQ0FBckI7QUFHQSxVQUFJQSxTQUFTLE9BQWIsRUFBc0I7QUFDcEIsWUFBSSxDQUFDLEtBQUtjLFNBQUwsQ0FBZWMsTUFBcEIsRUFBNEI7QUFDMUIsK0JBQVEsYUFBUjtBQUNBO0FBQ0Q7QUFDRCxZQUFNOEQsY0FBYy9CLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCMEIsTUFBbEIsRUFBMEI7QUFDNUNLLGdCQUFNLEtBQUs3RSxTQURpQztBQUU1Q2QsZ0JBQU07QUFGc0MsU0FBMUIsQ0FBcEI7QUFJQSxpQ0FBYzBGLFdBQWQsRUFBMkJFLElBQTNCLENBQWdDLGVBQU87QUFBRSxpQkFBS0MsUUFBTCxDQUFjM0QsR0FBZDtBQUFvQixTQUE3RDtBQUNELE9BVkQsTUFVTztBQUNMLDhCQUFXc0QsWUFBWCxFQUF5QkksSUFBekIsQ0FBOEIsZUFBTztBQUFFLGlCQUFLQyxRQUFMLENBQWMzRCxHQUFkO0FBQW9CLFNBQTNEO0FBQ0Q7QUFDRjs7O2lDQUNZd0IsWSxFQUFjO0FBQUE7O0FBQ3pCLFVBQUksQ0FBQyxLQUFLakQsWUFBTCxDQUFrQm1CLE1BQXZCLEVBQStCO0FBQzdCLDZCQUFRLGFBQVI7QUFDQTtBQUNEO0FBQ0QsVUFBTTBELFNBQVMzQixPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQkYsWUFBbEIsRUFBZ0M7QUFDN0NvQyxvQkFBWSxLQUFLakcsZ0JBQUwsQ0FBc0IsS0FBS0QsWUFBM0IsRUFBeUNJLElBRFI7QUFFN0MrRixtQkFBVyxLQUZrQztBQUc3Q0osY0FBTSxLQUFLbEYsWUFIa0M7QUFJN0M4RSxpQkFBUyxLQUFLN0Y7QUFKK0IsT0FBaEMsQ0FBZjtBQU1BLDZCQUFZNEYsTUFBWixFQUFvQk0sSUFBcEIsQ0FBeUIsZUFBTztBQUFFLGVBQUtDLFFBQUwsQ0FBYzNELEdBQWQ7QUFBbUIsT0FBckQ7QUFDRDs7OytCQUNVd0IsWSxFQUFjO0FBQUE7O0FBQ3ZCLFVBQU00QixTQUFTM0IsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JGLFlBQWxCLEVBQWdDO0FBQzdDc0MsZ0JBQVFDLE9BQU8sS0FBS3BGLFFBQVo7QUFEcUMsT0FBaEMsQ0FBZjtBQUdBLDJCQUFVeUUsTUFBVixFQUFrQk0sSUFBbEIsQ0FBdUIsZUFBTztBQUFFLGVBQUtDLFFBQUwsQ0FBYzNELEdBQWQ7QUFBb0IsT0FBcEQ7QUFDRDs7O2dDQUNXbUMsSyxFQUFPUyxHLEVBQUs7QUFDdEIsVUFBSW9CLFdBQVcsS0FBZjtBQUNBLFdBQUssSUFBSUMsSUFBSSxDQUFSLEVBQVdDLE1BQU10QixJQUFJbEQsTUFBMUIsRUFBa0N1RSxJQUFJQyxHQUF0QyxFQUEyQ0QsR0FBM0MsRUFBZ0Q7QUFDOUMsWUFBSXJCLElBQUlxQixDQUFKLEVBQU9sRCxJQUFQLEtBQWdCb0IsS0FBcEIsRUFBMkI7QUFDekI2QixxQkFBVyxJQUFYO0FBQ0E7QUFDRDtBQUNEQSxtQkFBVyxLQUFYO0FBQ0Q7QUFDRCxhQUFPQSxRQUFQO0FBQ0Q7Ozs7RUF0SmtDRyxlQUFLQyxJOztrQkFBckJ6SCxPIiwiZmlsZSI6InB1Ymxpc2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgTW9kYWwgZnJvbSAnLi4vY29tcG9uZW50cy9tb2RhbCdcbmltcG9ydCBNb2RhbDIgZnJvbSAnLi4vY29tcG9uZW50cy9tb2RhbDInXG5pbXBvcnQgeyBzaG93TXNnLCBpc0VtcHR5U3RyaW5nLCB1cGxvYWRJbWFnZSB9IGZyb20gJy4uL3V0aWxzL2NvbW1vbidcbmltcG9ydCB7IGFkZENpcmNsZXMsIGFkZENvbGxlY3Rpb24sIGFkZEFjdGl2aXR5LCBhZGROb3RpZnkgfSBmcm9tICcuLi9hcGkvem9uZSdcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB1Ymxpc2ggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WPkeW4gydcbiAgfVxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiTW9kYWxcIjp7XCJzdXJlQnRuVGV4dFwiOlwi56Gu6K6k5re75YqgXCIsXCJjYW5jZWxCdG5UZXh0XCI6XCLlj5bmtohcIixcInBsYWNlaG9sZGVyVGV4dFwiOlwi6K+36L6T5YWl5oKo5oOz5paw5aKe55qE5rS75Yqo6aG555uu5ZCNXCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmZsYWcuc3luY1wiOlwic2hvd0FkZEFjdGl2aXR5XCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJNb2RhbDJcIjp7XCJzdXJlQnRuVGV4dFwiOlwi56Gu6K6kXCIsXCJjYW5jZWxCdG5UZXh0XCI6XCLlj5bmtohcIixcInBsYWNlaG9sZGVyVGV4dFwiOlwi5pS25qy+6YCJ6aG55ZCNXCIsXCJwbGFjZWhvbGRlclRleHQyXCI6XCLph5Hpop1cIixcInYtYmluZDpmbGFnLnN5bmNcIjpcInNob3dBZGRNb25leVwifX07XHJcbiRldmVudHMgPSB7XCJNb2RhbFwiOntcInYtb246Y2FuY2VsXCI6XCJjYW5jZWxcIixcInYtb246c3VyZVwiOlwic3VyZVwifSxcIk1vZGFsMlwiOntcInYtb246Y2FuY2VsXCI6XCJjYW5jZWxcIixcInYtb246c3VyZVwiOlwibW9uZXlTdXJlRm5cIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICBNb2RhbCxcbiAgICBNb2RhbDJcbiAgfVxuICBkYXRhID0ge1xuICAgIHNob3dBZGRBY3Rpdml0eTogZmFsc2UsXG4gICAgc2hvd0FkZE1vbmV5OiBmYWxzZSxcbiAgICBtc2c6ICcnLFxuICAgIGltZzogW10sXG4gICAgc2VlVHlwZTogMCxcbiAgICBhY3Rpdml0eVR5cGU6IDAsXG4gICAgYWN0aXZpdHlKb2luVHlwZTogW1xuICAgICAge1xuICAgICAgICBpZDogMCxcbiAgICAgICAgdGl0bGU6ICfljZXpgIknLFxuICAgICAgICB0eXBlOiAncmFkaW8nXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogMSxcbiAgICAgICAgdGl0bGU6ICflpJrpgIknLFxuICAgICAgICB0eXBlOiAnc2VsZWN0J1xuICAgICAgfVxuICAgIF0sXG4gICAgcmVtaW5kVHlwZTogW1xuICAgICAge1xuICAgICAgICBpZDogMCxcbiAgICAgICAgdGl0bGU6ICflkKYnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogMSxcbiAgICAgICAgdGl0bGU6ICfmmK8nXG4gICAgICB9XG4gICAgXSxcbiAgICB0eXBlOiBbXG4gICAgICB7XG4gICAgICAgIGlkOiAxLFxuICAgICAgICB0aXRsZTogJ+ePree6p+WPr+ingScsXG4gICAgICAgIHR5cGU6ICdjbGFzcydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAwLFxuICAgICAgICB0aXRsZTogJ+WFqOmDqOWPr+ingScsXG4gICAgICAgIHR5cGU6ICdhbGwnXG4gICAgICB9XG4gICAgXSxcbiAgICB0eXBlTGlzdDoge1xuICAgICAgem9uZTogJ+WutumVv+WciCcsXG4gICAgICBub3RpY2U6ICfpgJrnn6UnLFxuICAgICAgYWN0aXZpdHk6ICfmtLvliqgnLFxuICAgICAgbW9uZXk6ICfmlLbmrL4nXG4gICAgfSxcbiAgICBwbGFjZWhvbGRlcjogJ+ivt+WcqOatpOWPkeihqOaCqOeahOaEn+aDsycsXG4gICAgYWN0aXZlVHlwZTogJ3pvbmUnLFxuICAgIGFjdGl2aXR5TGlzdDogW10sXG4gICAgY2FuU3VibWl0OiBmYWxzZSxcbiAgICBtZW1iZXJJbmZvOiBudWxsLFxuICAgIGNsYXNzSW5mbzogbnVsbCxcbiAgICBtb25leTogJycsXG4gICAgaXNSZW1pbmQ6IDAsXG4gICAgbW9uZXlMaXN0OiBbXSxcbiAgICBtYXhQaG90b0NvdW50OiA5LFxuICAgIHVwbG9hZHM6IFtdXG4gIH1cbiAgY29tbW9uRm4ocmVzKSB7XG4gICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgIHNob3dNc2coJ+WPkeW4g+aIkOWKnycsIDIwMDApXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgd3gubmF2aWdhdGVCYWNrKClcbiAgICAgIH0sIDIwMDApXG4gICAgfVxuICB9XG4gIG9uTG9hZCA9IChlKSA9PiB7XG4gICAgdGhpcy5jbGFzc0luZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnY2xhc3NJbmZvJylcbiAgICB0aGlzLm1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXG4gICAgY29uc3QgdHlwZSA9IGUudHlwZVxuICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XG4gICAgICB0aXRsZTogYOWPkeW4gyR7dGhpcy50eXBlTGlzdFt0eXBlXX1gXG4gICAgfSlcbiAgICBpZiAodHlwZSAhPT0gJ3pvbmUnKSB7XG4gICAgICB0aGlzLnBsYWNlaG9sZGVyID0gYOivt+WcqOatpOW9leWFpeaCqOeahCR7dGhpcy50eXBlTGlzdFt0eXBlXX3or6bmg4VgXG4gICAgfVxuICAgIHRoaXMuYWN0aXZlVHlwZSA9IHR5cGVcbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgY2hlY2tDYW5TdWJtaXQoKSB7XG4gICAgY29uc3QgbXNnID0gYOivt+Whq+WGmeaCqOeahCR7dGhpcy50eXBlTGlzdFt0aGlzLmFjdGl2ZVR5cGVdfeaPj+i/sOivpuaDhWBcbiAgICBpZiAoaXNFbXB0eVN0cmluZyh0aGlzLm1zZykpIHtcbiAgICAgIHNob3dNc2cobXNnKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuICBzYXZlQ2lyY2xlcyhjb21tb25QYXJhbXMsIHR5cGUpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMsIHtcbiAgICAgIGltZ191cmw6IHRoaXMuaW1nXG4gICAgfSlcbiAgICBjb25zdCBjaXJjbGVQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBwYXJhbXMsIHtcbiAgICAgIHNlZV90eXBlOiB0aGlzLnR5cGVbdGhpcy5zZWVUeXBlXS50eXBlXG4gICAgfSlcbiAgICBpZiAodHlwZSA9PT0gJ21vbmV5Jykge1xuICAgICAgaWYgKCF0aGlzLm1vbmV5TGlzdC5sZW5ndGgpIHtcbiAgICAgICAgc2hvd01zZygn6K+36Iez5bCR5re75Yqg5LiA5Liq5pS25qy+5p2h55uuJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBjb25zdCBtb25leVBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIHBhcmFtcywge1xuICAgICAgICBpdGVtOiB0aGlzLm1vbmV5TGlzdCxcbiAgICAgICAgdHlwZTogJ3N0dWRlbnQnXG4gICAgICB9KVxuICAgICAgYWRkQ29sbGVjdGlvbihtb25leVBhcmFtcykudGhlbihyZXMgPT4geyB0aGlzLmNvbW1vbkZuKHJlcykgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgYWRkQ2lyY2xlcyhjaXJjbGVQYXJhbXMpLnRoZW4ocmVzID0+IHsgdGhpcy5jb21tb25GbihyZXMpIH0pXG4gICAgfVxuICB9XG4gIHNhdmVBY3Rpdml0eShjb21tb25QYXJhbXMpIHtcbiAgICBpZiAoIXRoaXMuYWN0aXZpdHlMaXN0Lmxlbmd0aCkge1xuICAgICAgc2hvd01zZygn6K+36Iez5bCR5re75Yqg5LiA5Liq5rS75Yqo6YCJ6aG5JylcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCBwYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMsIHtcbiAgICAgIHNlbGVjdFR5cGU6IHRoaXMuYWN0aXZpdHlKb2luVHlwZVt0aGlzLmFjdGl2aXR5VHlwZV0udHlwZSxcbiAgICAgIHNpZ25fdHlwZTogJ2FsbCcsXG4gICAgICBpdGVtOiB0aGlzLmFjdGl2aXR5TGlzdCxcbiAgICAgIGltZ191cmw6IHRoaXMuaW1nXG4gICAgfSlcbiAgICBhZGRBY3Rpdml0eShwYXJhbXMpLnRoZW4ocmVzID0+IHsgdGhpcy5jb21tb25GbihyZXMpfSlcbiAgfVxuICBzYXZlTm90aWNlKGNvbW1vblBhcmFtcykge1xuICAgIGNvbnN0IHBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcywge1xuICAgICAgcmVtaW5kOiBOdW1iZXIodGhpcy5pc1JlbWluZClcbiAgICB9KVxuICAgIGFkZE5vdGlmeShwYXJhbXMpLnRoZW4ocmVzID0+IHsgdGhpcy5jb21tb25GbihyZXMpIH0pXG4gIH1cbiAgY2hlY2tSZXBlYXQodmFsdWUsIGFycikge1xuICAgIGxldCByZXRWYWx1ZSA9IGZhbHNlXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGFyci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgaWYgKGFycltpXS5uYW1lID09PSB2YWx1ZSkge1xuICAgICAgICByZXRWYWx1ZSA9IHRydWVcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIHJldFZhbHVlID0gZmFsc2VcbiAgICB9XG4gICAgcmV0dXJuIHJldFZhbHVlXG4gIH1cbiAgd2F0Y2ggPSB7XG4gICAgbXNnIChuZXdWYWwsIG9sZFZhbCkge1xuICAgICAgaWYgKCFpc0VtcHR5U3RyaW5nKG5ld1ZhbCkpIHtcbiAgICAgICAgdGhpcy5jYW5TdWJtaXQgPSB0cnVlXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgY2hvb3NlSW1hZ2UoKSB7XG4gICAgICBpZiAodGhpcy5pbWcubGVuZ3RoID4gdGhpcy5tYXhQaG90b0NvdW50KSB7XG4gICAgICAgIHNob3dNc2coJ+acgOWkmuS4iuS8oDnlvKDlm74nKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGxldCBfdGhpcyA9IHRoaXNcbiAgICAgIHd4LmNob29zZUltYWdlKHtcbiAgICAgICAgY291bnQ6IHRoaXMubWF4UGhvdG9Db3VudCxcbiAgICAgICAgc2l6ZVR5cGU6IFsnb3JpZ2luYWwnLCAnY29tcHJlc3NlZCddLFxuICAgICAgICBzb3VyY2VUeXBlOiBbJ2FsYnVtJywgJ2NhbWVyYSddLFxuICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmltZy5sZW5ndGggKyByZXMudGVtcEZpbGVQYXRocy5sZW5ndGggPiB0aGlzLm1heFBob3RvQ291bnQpIHtcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn5pyA5aSa5Y+q6IO96YCJ5oupJyArIHRoaXMubWF4UGhvdG9Db3VudCArICflvKDlm77niYcnLFxuICAgICAgICAgICAgICBpY29uOiAnbm9uZSdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICAgIHJlcy50ZW1wRmlsZVBhdGhzLmZvckVhY2gocGF0aCA9PiB7XG4gICAgICAgICAgICBsZXQgdXBsb2FkID0ge31cbiAgICAgICAgICAgIHVwbG9hZC5wYXRoID0gcGF0aFxuICAgICAgICAgICAgdXBsb2FkLmVycm9yID0gZmFsc2VcbiAgICAgICAgICAgIHVwbG9hZC51cGxvYWRQcm9ncmVzcyA9IHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICAgICAgICB1cmw6ICdodHRwczovL3Rlc3QuY3Rqd2guY29tL2FwaS92MS9maWxlL3VwbG9hZFBpYycsXG4gICAgICAgICAgICAgIGZpbGVQYXRoOiBwYXRoLFxuICAgICAgICAgICAgICBmb3JtRGF0YToge1xuICAgICAgICAgICAgICAgICdtZW1iZXJfaWQnOiB0aGlzLm1lbWJlckluZm8ubWVtYmVyX2lkLFxuICAgICAgICAgICAgICAgICdtZW1iZXJfdG9rZW4nOiB0aGlzLm1lbWJlckluZm8ubWVtYmVyX3Rva2VuLFxuICAgICAgICAgICAgICAgICdmb2xkZXInOiAnY29tbWl0dGVlJ1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBuYW1lOiAnZmlsZScsXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpXG4gICAgICAgICAgICAgICAgY29uc3QgdXJsID0gZGF0YS5kYXRhLmZpbGVfdXJsXG4gICAgICAgICAgICAgICAgX3RoaXMuaW1nLnB1c2godXJsKVxuICAgICAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB1cGxvYWQudXBsb2FkUHJvZ3Jlc3Mub25Qcm9ncmVzc1VwZGF0ZShmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgdXBsb2FkLnByb2dyZXNzID0gcmVzLnByb2dyZXNzXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgX3RoaXMudXBsb2Fkcy5wdXNoKHVwbG9hZClcbiAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIHN1Ym1pdCgpIHtcbiAgICAgIGlmICghdGhpcy5jYW5TdWJtaXQpIHtcbiAgICAgICAgc2hvd01zZygn6K+35qOA5p+l5Y+R5biD5YaF5a65IScpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdGhpcy5jaGVja0NhblN1Ym1pdCgpXG4gICAgICBjb25zdCBjb21tb25QYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCB7XG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgICAgdHlwZTogdGhpcy5zZWVuSW5kZXgsXG4gICAgICAgIGRlc2M6IHRoaXMubXNnXG4gICAgICB9KVxuICAgICAgaWYgKHRoaXMuYWN0aXZlVHlwZSA9PT0gJ3pvbmUnIHx8IHRoaXMuYWN0aXZlVHlwZSA9PT0gJ21vbmV5Jykge1xuICAgICAgICB0aGlzLnNhdmVDaXJjbGVzKGNvbW1vblBhcmFtcywgdGhpcy5hY3RpdmVUeXBlKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLmFjdGl2ZVR5cGUgPT09ICdhY3Rpdml0eScpIHtcbiAgICAgICAgdGhpcy5zYXZlQWN0aXZpdHkoY29tbW9uUGFyYW1zKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLmFjdGl2ZVR5cGUgPT09ICdub3RpY2UnKSB7XG4gICAgICAgIHRoaXMuc2F2ZU5vdGljZShjb21tb25QYXJhbXMpXG4gICAgICB9XG4gICAgfSxcbiAgICBjYW5jZWwoKSB7XG4gICAgICB0aGlzLnNob3dBZGRBY3Rpdml0eSA9IGZhbHNlXG4gICAgICB0aGlzLnNob3dBZGRNb25leSA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBzdXJlKHZhbHVlKSB7XG4gICAgICBpZiAodGhpcy5jaGVja1JlcGVhdCh2YWx1ZSwgdGhpcy5hY3Rpdml0eUxpc3QpKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+S4jeimgei+k+WFpemHjeWkjeeahOa0u+WKqOmhueebricpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgY29uc3Qgb2JqID0ge1xuICAgICAgICBuYW1lOiB2YWx1ZVxuICAgICAgfVxuICAgICAgdGhpcy5hY3Rpdml0eUxpc3QucHVzaChvYmopXG4gICAgICB0aGlzLnNob3dBZGRBY3Rpdml0eSA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBtb25leVN1cmVGbih2YWx1ZTEsIHZhbHVlMikge1xuICAgICAgY29uc3Qgb2JqID0ge1xuICAgICAgICBuYW1lOiB2YWx1ZTEsXG4gICAgICAgIG1vbmV5OiB2YWx1ZTJcbiAgICAgIH1cbiAgICAgIHRoaXMubW9uZXlMaXN0LnB1c2gob2JqKVxuICAgICAgdGhpcy5zaG93QWRkTW9uZXkgPSBmYWxzZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgYWRkTmV3KGZsYWcpIHtcbiAgICAgIHRoaXNbZmxhZ10gPSB0cnVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBkZWxldGVGbiAoYXJyLCBpbmRleCkge1xuICAgICAgdGhpc1thcnJdLnNwbGljZShpbmRleCwgMSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGJpbmRDaGFuZ2UoZSkge1xuICAgICAgdGhpc1tlLmN1cnJlbnRUYXJnZXQuaWRdID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbn1cbiJdfQ==