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
        // let pages = getCurrentPages();
        // let prevPage = pages[pages.length - 2];
        // prevPage.setData({
        //   fromPublish: true
        // })
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1Ymxpc2guanMiXSwibmFtZXMiOlsic3RvcmUiLCJQdWJsaXNoIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIk1vZGFsIiwiTW9kYWwyIiwiZGF0YSIsInNob3dBZGRBY3Rpdml0eSIsInNob3dBZGRNb25leSIsIm1zZyIsImltZyIsInNlZVR5cGUiLCJhY3Rpdml0eVR5cGUiLCJhY3Rpdml0eUpvaW5UeXBlIiwiaWQiLCJ0aXRsZSIsInR5cGUiLCJyZW1pbmRUeXBlIiwidHlwZUxpc3QiLCJ6b25lIiwibm90aWNlIiwiYWN0aXZpdHkiLCJtb25leSIsInBsYWNlaG9sZGVyIiwiYWN0aXZlVHlwZSIsImFjdGl2aXR5TGlzdCIsImNhblN1Ym1pdCIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJpc1JlbWluZCIsIm1vbmV5TGlzdCIsIm1heFBob3RvQ291bnQiLCJ1cGxvYWRzIiwib25Mb2FkIiwiZSIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCIkYXBwbHkiLCJ3YXRjaCIsIm5ld1ZhbCIsIm9sZFZhbCIsIm1ldGhvZHMiLCJzZWxlY3RTZWVUeXBlIiwiY2hvb3NlSW1hZ2UiLCJsZW5ndGgiLCJfdGhpcyIsImNvdW50Iiwic2l6ZVR5cGUiLCJzb3VyY2VUeXBlIiwic3VjY2VzcyIsInJlcyIsInRlbXBGaWxlUGF0aHMiLCJ0ZW1wQXJyIiwic2hvd1RvYXN0IiwiaWNvbiIsInNob3dMb2FkaW5nIiwiZm9yRWFjaCIsInVwbG9hZCIsInBhdGgiLCJlcnJvciIsInVwbG9hZFByb2dyZXNzIiwidXBsb2FkRmlsZSIsInVybCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiYXBpVXJsIiwiZmlsZVBhdGgiLCJmb3JtRGF0YSIsIm1lbWJlcl9pZCIsIm1lbWJlcl90b2tlbiIsIm5hbWUiLCJKU09OIiwicGFyc2UiLCJmaWxlX3VybCIsInB1c2giLCJzZXRUaW1lb3V0IiwiaGlkZUxvYWRpbmciLCJvblByb2dyZXNzVXBkYXRlIiwicHJvZ3Jlc3MiLCJzdWJtaXQiLCJjaGVja0NhblN1Ym1pdCIsImNvbW1vblBhcmFtcyIsIk9iamVjdCIsImFzc2lnbiIsImNsYXNzX2lkIiwic2VlbkluZGV4IiwiZGVzYyIsInNhdmVDaXJjbGVzIiwic2F2ZUFjdGl2aXR5Iiwic2F2ZU5vdGljZSIsImNhbmNlbCIsInN1cmUiLCJ2YWx1ZSIsImNvbnNvbGUiLCJsb2ciLCJjaGVja1JlcGVhdCIsIm9iaiIsIm1vbmV5U3VyZUZuIiwidmFsdWUxIiwidmFsdWUyIiwiYWRkTmV3IiwiZmxhZyIsImRlbGV0ZUZuIiwiYXJyIiwiaW5kZXgiLCJzcGxpY2UiLCJiaW5kQ2hhbmdlIiwiY3VycmVudFRhcmdldCIsImRldGFpbCIsIm5hdmlnYXRlQmFjayIsInBhcmFtcyIsImltZ191cmwiLCJjaXJjbGVQYXJhbXMiLCJzZWVfdHlwZSIsIm1vbmV5UGFyYW1zIiwiaXRlbSIsInRoZW4iLCJjb21tb25GbiIsInNlbGVjdFR5cGUiLCJzaWduX3R5cGUiLCJyZW1pbmQiLCJOdW1iZXIiLCJyZXRWYWx1ZSIsImkiLCJsZW4iLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxRQUFRLDBCQUFaOztJQUVxQkMsTzs7Ozs7Ozs7Ozs7Ozs7MkxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVkMsTyxHQUFVLEUsU0FDWEMsTSxHQUFTLEVBQUMsU0FBUSxFQUFDLGVBQWMsTUFBZixFQUFzQixpQkFBZ0IsT0FBdEMsRUFBOEMsbUJBQWtCLGVBQWhFLEVBQWdGLGdCQUFlLEVBQS9GLEVBQWtHLG9CQUFtQixpQkFBckgsRUFBdUksY0FBYSxFQUFwSixFQUFULEVBQWlLLFVBQVMsRUFBQyxlQUFjLElBQWYsRUFBb0IsaUJB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LE9BQXBEO0FBQ0Q7OztnQ0FDVzBDLEssRUFBT1csRyxFQUFLO0FBQ3RCLFVBQUltQixXQUFXLEtBQWY7QUFDQSxXQUFLLElBQUlDLElBQUksQ0FBUixFQUFXQyxNQUFNckIsSUFBSTNELE1BQTFCLEVBQWtDK0UsSUFBSUMsR0FBdEMsRUFBMkNELEdBQTNDLEVBQWdEO0FBQzlDLFlBQUlwQixJQUFJb0IsQ0FBSixFQUFPckQsSUFBUCxLQUFnQnNCLEtBQXBCLEVBQTJCO0FBQ3pCOEIscUJBQVcsSUFBWDtBQUNBO0FBQ0Q7QUFDREEsbUJBQVcsS0FBWDtBQUNEO0FBQ0QsYUFBT0EsUUFBUDtBQUNEOzs7O0VBNUprQ0csZUFBS0MsSTs7a0JBQXJCbEksTyIsImZpbGUiOiJwdWJsaXNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHsgY29ubmVjdCwgZ2V0U3RvcmUgfSBmcm9tICd3ZXB5LXJlZHV4J1xuaW1wb3J0IHsgc2V0RnJvbVB1Ymxpc2ggfSBmcm9tICcuLi9zdG9yZS9hY3Rpb25zJ1xuaW1wb3J0IE1vZGFsIGZyb20gJy4uL2NvbXBvbmVudHMvbW9kYWwnXG5pbXBvcnQgTW9kYWwyIGZyb20gJy4uL2NvbXBvbmVudHMvbW9kYWwyJ1xuaW1wb3J0IHsgc2hvd01zZywgaXNFbXB0eVN0cmluZywgdXBsb2FkSW1hZ2UgfSBmcm9tICcuLi91dGlscy9jb21tb24nXG5pbXBvcnQgeyBhZGRDaXJjbGVzLCBhZGRDb2xsZWN0aW9uLCBhZGRBY3Rpdml0eSwgYWRkTm90aWZ5IH0gZnJvbSAnLi4vYXBpL3pvbmUnXG5cbmxldCBzdG9yZSA9IGdldFN0b3JlKClcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHVibGlzaCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Y+R5biDJ1xuICB9XG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJNb2RhbFwiOntcInN1cmVCdG5UZXh0XCI6XCLmt7vliqDlrozmiJBcIixcImNhbmNlbEJ0blRleHRcIjpcIuWGjea3u+WKoOS4gOmhuVwiLFwicGxhY2Vob2xkZXJUZXh0XCI6XCLor7fovpPlhaXmgqjmg7PmlrDlop7nmoTmtLvliqjpobnnm67lkI1cIixcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6ZmxhZy5zeW5jXCI6XCJzaG93QWRkQWN0aXZpdHlcIixcInhtbG5zOnYtb25cIjpcIlwifSxcIk1vZGFsMlwiOntcInN1cmVCdG5UZXh0XCI6XCLnoa7orqRcIixcImNhbmNlbEJ0blRleHRcIjpcIuWPlua2iFwiLFwicGxhY2Vob2xkZXJUZXh0XCI6XCLmlLbmrL7pgInpobnlkI1cIixcInBsYWNlaG9sZGVyVGV4dDJcIjpcIumHkeminVwiLFwidi1iaW5kOmZsYWcuc3luY1wiOlwic2hvd0FkZE1vbmV5XCJ9fTtcclxuJGV2ZW50cyA9IHtcIk1vZGFsXCI6e1widi1vbjpjYW5jZWxcIjpcImNhbmNlbFwiLFwidi1vbjpzdXJlXCI6XCJzdXJlXCJ9LFwiTW9kYWwyXCI6e1widi1vbjpjYW5jZWxcIjpcImNhbmNlbFwiLFwidi1vbjpzdXJlXCI6XCJtb25leVN1cmVGblwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgIE1vZGFsLFxuICAgIE1vZGFsMlxuICB9XG4gIGRhdGEgPSB7XG4gICAgc2hvd0FkZEFjdGl2aXR5OiBmYWxzZSxcbiAgICBzaG93QWRkTW9uZXk6IGZhbHNlLFxuICAgIG1zZzogJycsXG4gICAgaW1nOiBbXSxcbiAgICBzZWVUeXBlOiAwLFxuICAgIGFjdGl2aXR5VHlwZTogMCxcbiAgICBhY3Rpdml0eUpvaW5UeXBlOiBbXG4gICAgICB7XG4gICAgICAgIGlkOiAwLFxuICAgICAgICB0aXRsZTogJ+WNlemAiScsXG4gICAgICAgIHR5cGU6ICdyYWRpbydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAxLFxuICAgICAgICB0aXRsZTogJ+WkmumAiScsXG4gICAgICAgIHR5cGU6ICdzZWxlY3QnXG4gICAgICB9XG4gICAgXSxcbiAgICByZW1pbmRUeXBlOiBbXG4gICAgICB7XG4gICAgICAgIGlkOiAwLFxuICAgICAgICB0aXRsZTogJ+WQpidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAxLFxuICAgICAgICB0aXRsZTogJ+aYrydcbiAgICAgIH1cbiAgICBdLFxuICAgIHR5cGU6IFtcbiAgICAgIHtcbiAgICAgICAgaWQ6IDAsXG4gICAgICAgIHRpdGxlOiAn54+t57qn5Y+v6KeBJyxcbiAgICAgICAgdHlwZTogJ2NsYXNzJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6IDEsXG4gICAgICAgIHRpdGxlOiAn5YWo6YOo5Y+v6KeBJyxcbiAgICAgICAgdHlwZTogJ2FsbCdcbiAgICAgIH1cbiAgICBdLFxuICAgIHR5cGVMaXN0OiB7XG4gICAgICB6b25lOiAn5a626ZW/5ZyIJyxcbiAgICAgIG5vdGljZTogJ+mAmuefpScsXG4gICAgICBhY3Rpdml0eTogJ+a0u+WKqCcsXG4gICAgICBtb25leTogJ+aUtuasvidcbiAgICB9LFxuICAgIHBsYWNlaG9sZGVyOiAn6K+35Zyo5q2k5Y+R6KGo5oKo55qE5oSf5oOzJyxcbiAgICBhY3RpdmVUeXBlOiAnem9uZScsXG4gICAgYWN0aXZpdHlMaXN0OiBbXSxcbiAgICBjYW5TdWJtaXQ6IGZhbHNlLFxuICAgIG1lbWJlckluZm86IG51bGwsXG4gICAgY2xhc3NJbmZvOiBudWxsLFxuICAgIG1vbmV5OiAnJyxcbiAgICBpc1JlbWluZDogMCxcbiAgICBtb25leUxpc3Q6IFtdLFxuICAgIG1heFBob3RvQ291bnQ6IDksXG4gICAgdXBsb2FkczogW11cbiAgfVxuICBjb21tb25GbihyZXMpIHtcbiAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgLy8gbGV0IHBhZ2VzID0gZ2V0Q3VycmVudFBhZ2VzKCk7XG4gICAgICAvLyBsZXQgcHJldlBhZ2UgPSBwYWdlc1twYWdlcy5sZW5ndGggLSAyXTtcbiAgICAgIC8vIHByZXZQYWdlLnNldERhdGEoe1xuICAgICAgLy8gICBmcm9tUHVibGlzaDogdHJ1ZVxuICAgICAgLy8gfSlcbiAgICAgIHNldEZyb21QdWJsaXNoKHRydWUpXG4gICAgICBzaG93TXNnKCflj5HluIPmiJDlip8nLCAyMDAwKVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHd4Lm5hdmlnYXRlQmFjaygpXG4gICAgICB9LCAyMDAwKVxuICAgIH1cbiAgfVxuICBvbkxvYWQgPSAoZSkgPT4ge1xuICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXG4gICAgdGhpcy5tZW1iZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nKVxuICAgIGNvbnN0IHR5cGUgPSBlLnR5cGVcbiAgICB3eC5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe1xuICAgICAgdGl0bGU6IGDlj5HluIMke3RoaXMudHlwZUxpc3RbdHlwZV19YFxuICAgIH0pXG4gICAgaWYgKHR5cGUgIT09ICd6b25lJykge1xuICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IGDor7flnKjmraTlvZXlhaXmgqjnmoQke3RoaXMudHlwZUxpc3RbdHlwZV196K+m5oOFYFxuICAgIH1cbiAgICB0aGlzLmFjdGl2ZVR5cGUgPSB0eXBlXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIGNoZWNrQ2FuU3VibWl0KCkge1xuICAgIGNvbnN0IG1zZyA9IGDor7floavlhpnmgqjnmoQke3RoaXMudHlwZUxpc3RbdGhpcy5hY3RpdmVUeXBlXX3mj4/ov7Dor6bmg4VgXG4gICAgaWYgKGlzRW1wdHlTdHJpbmcodGhpcy5tc2cpKSB7XG4gICAgICBzaG93TXNnKG1zZylcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlXG4gIH1cbiAgc2F2ZUNpcmNsZXMoY29tbW9uUGFyYW1zLCB0eXBlKSB7XG4gICAgY29uc3QgcGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zLCB7XG4gICAgICBpbWdfdXJsOiB0aGlzLmltZ1xuICAgIH0pXG4gICAgY29uc3QgY2lyY2xlUGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgcGFyYW1zLCB7XG4gICAgICBzZWVfdHlwZTogdGhpcy50eXBlW3RoaXMuc2VlVHlwZV0udHlwZVxuICAgIH0pXG4gICAgaWYgKHR5cGUgPT09ICdtb25leScpIHtcbiAgICAgIGlmICghdGhpcy5tb25leUxpc3QubGVuZ3RoKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+iHs+Wwkea3u+WKoOS4gOS4quaUtuasvuadoeebricpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgY29uc3QgbW9uZXlQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBwYXJhbXMsIHtcbiAgICAgICAgaXRlbTogdGhpcy5tb25leUxpc3QsXG4gICAgICAgIHR5cGU6ICdzdHVkZW50J1xuICAgICAgfSlcbiAgICAgIGFkZENvbGxlY3Rpb24obW9uZXlQYXJhbXMpLnRoZW4ocmVzID0+IHsgdGhpcy5jb21tb25GbihyZXMpIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGFkZENpcmNsZXMoY2lyY2xlUGFyYW1zKS50aGVuKHJlcyA9PiB7IHRoaXMuY29tbW9uRm4ocmVzKSB9KVxuICAgIH1cbiAgfVxuICBzYXZlQWN0aXZpdHkoY29tbW9uUGFyYW1zKSB7XG4gICAgaWYgKCF0aGlzLmFjdGl2aXR5TGlzdC5sZW5ndGgpIHtcbiAgICAgIHNob3dNc2coJ+ivt+iHs+Wwkea3u+WKoOS4gOS4qua0u+WKqOmAiemhuScpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgcGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zLCB7XG4gICAgICBzZWxlY3RUeXBlOiB0aGlzLmFjdGl2aXR5Sm9pblR5cGVbdGhpcy5hY3Rpdml0eVR5cGVdLnR5cGUsXG4gICAgICBzaWduX3R5cGU6ICdhbGwnLFxuICAgICAgaXRlbTogdGhpcy5hY3Rpdml0eUxpc3QsXG4gICAgICBpbWdfdXJsOiB0aGlzLmltZ1xuICAgIH0pXG4gICAgYWRkQWN0aXZpdHkocGFyYW1zKS50aGVuKHJlcyA9PiB7IHRoaXMuY29tbW9uRm4ocmVzKX0pXG4gIH1cbiAgc2F2ZU5vdGljZShjb21tb25QYXJhbXMpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMsIHtcbiAgICAgIHJlbWluZDogTnVtYmVyKHRoaXMuaXNSZW1pbmQpXG4gICAgfSlcbiAgICBhZGROb3RpZnkocGFyYW1zKS50aGVuKHJlcyA9PiB7IHRoaXMuY29tbW9uRm4ocmVzKSB9KVxuICB9XG4gIGNoZWNrUmVwZWF0KHZhbHVlLCBhcnIpIHtcbiAgICBsZXQgcmV0VmFsdWUgPSBmYWxzZVxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhcnIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmIChhcnJbaV0ubmFtZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgcmV0VmFsdWUgPSB0cnVlXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICByZXRWYWx1ZSA9IGZhbHNlXG4gICAgfVxuICAgIHJldHVybiByZXRWYWx1ZVxuICB9XG4gIHdhdGNoID0ge1xuICAgIG1zZyAobmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgIGlmICghaXNFbXB0eVN0cmluZyhuZXdWYWwpKSB7XG4gICAgICAgIHRoaXMuY2FuU3VibWl0ID0gdHJ1ZVxuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuICBtZXRob2RzID0ge1xuICAgIHNlbGVjdFNlZVR5cGUoaWQpIHtcbiAgICAgIHRoaXMuc2VlVHlwZSA9IGlkXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBjaG9vc2VJbWFnZSgpIHtcbiAgICAgIGlmICh0aGlzLmltZy5sZW5ndGggPiB0aGlzLm1heFBob3RvQ291bnQpIHtcbiAgICAgICAgc2hvd01zZygn5pyA5aSa5LiK5LygOeW8oOWbvicpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgbGV0IF90aGlzID0gdGhpc1xuICAgICAgd3guY2hvb3NlSW1hZ2Uoe1xuICAgICAgICBjb3VudDogdGhpcy5tYXhQaG90b0NvdW50LFxuICAgICAgICBzaXplVHlwZTogWydvcmlnaW5hbCcsICdjb21wcmVzc2VkJ10sXG4gICAgICAgIHNvdXJjZVR5cGU6IFsnYWxidW0nLCAnY2FtZXJhJ10sXG4gICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgY29uc3QgbGVuZ3RoID0gcmVzLnRlbXBGaWxlUGF0aHMubGVuZ3RoXG4gICAgICAgICAgbGV0IHRlbXBBcnIgPSBbXVxuICAgICAgICAgIGlmICh0aGlzLmltZy5sZW5ndGggKyBsZW5ndGggPiB0aGlzLm1heFBob3RvQ291bnQpIHtcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn5pyA5aSa5Y+q6IO96YCJ5oupJyArIHRoaXMubWF4UGhvdG9Db3VudCArICflvKDlm77niYcnLFxuICAgICAgICAgICAgICBpY29uOiAnbm9uZSdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHt0aXRsZTogJ+WbvueJh+S4iuS8oOS4rSd9KVxuICAgICAgICAgIHJlcy50ZW1wRmlsZVBhdGhzLmZvckVhY2gocGF0aCA9PiB7XG4gICAgICAgICAgICBsZXQgdXBsb2FkID0ge31cbiAgICAgICAgICAgIHVwbG9hZC5wYXRoID0gcGF0aFxuICAgICAgICAgICAgdXBsb2FkLmVycm9yID0gZmFsc2VcbiAgICAgICAgICAgIHVwbG9hZC51cGxvYWRQcm9ncmVzcyA9IHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICAgICAgICB1cmw6IGAke190aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5hcGlVcmx9L2ZpbGUvdXBsb2FkUGljYCxcbiAgICAgICAgICAgICAgZmlsZVBhdGg6IHBhdGgsXG4gICAgICAgICAgICAgIGZvcm1EYXRhOiB7XG4gICAgICAgICAgICAgICAgJ21lbWJlcl9pZCc6IHRoaXMubWVtYmVySW5mby5tZW1iZXJfaWQsXG4gICAgICAgICAgICAgICAgJ21lbWJlcl90b2tlbic6IHRoaXMubWVtYmVySW5mby5tZW1iZXJfdG9rZW4sXG4gICAgICAgICAgICAgICAgJ2ZvbGRlcic6ICdjb21taXR0ZWUnXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSlcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5kYXRhICYmIGRhdGEuZGF0YS5maWxlX3VybCkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgdXJsID0gZGF0YS5kYXRhLmZpbGVfdXJsXG4gICAgICAgICAgICAgICAgICB0ZW1wQXJyLnB1c2godXJsKVxuICAgICAgICAgICAgICAgICAgX3RoaXMuaW1nLnB1c2godXJsKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGVtcEFyci5sZW5ndGggPT09IGxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICAgICAgICAgIH0sIDEwMDApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB1cGxvYWQudXBsb2FkUHJvZ3Jlc3Mub25Qcm9ncmVzc1VwZGF0ZShmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgdXBsb2FkLnByb2dyZXNzID0gcmVzLnByb2dyZXNzXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgX3RoaXMudXBsb2Fkcy5wdXNoKHVwbG9hZClcbiAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIHN1Ym1pdCgpIHtcbiAgICAgIC8vIGlmICghdGhpcy5jYW5TdWJtaXQpIHtcbiAgICAgIC8vICAgc2hvd01zZygn6K+35qOA5p+l5Y+R5biD5YaF5a65IScpXG4gICAgICAvLyAgIHJldHVyblxuICAgICAgLy8gfVxuICAgICAgdGhpcy5jaGVja0NhblN1Ym1pdCgpXG4gICAgICBjb25zdCBjb21tb25QYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCB7XG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgICAgdHlwZTogdGhpcy5zZWVuSW5kZXgsXG4gICAgICAgIGRlc2M6IHRoaXMubXNnXG4gICAgICB9KVxuICAgICAgaWYgKHRoaXMuYWN0aXZlVHlwZSA9PT0gJ3pvbmUnIHx8IHRoaXMuYWN0aXZlVHlwZSA9PT0gJ21vbmV5Jykge1xuICAgICAgICB0aGlzLnNhdmVDaXJjbGVzKGNvbW1vblBhcmFtcywgdGhpcy5hY3RpdmVUeXBlKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLmFjdGl2ZVR5cGUgPT09ICdhY3Rpdml0eScpIHtcbiAgICAgICAgdGhpcy5zYXZlQWN0aXZpdHkoY29tbW9uUGFyYW1zKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLmFjdGl2ZVR5cGUgPT09ICdub3RpY2UnKSB7XG4gICAgICAgIHRoaXMuc2F2ZU5vdGljZShjb21tb25QYXJhbXMpXG4gICAgICB9XG4gICAgfSxcbiAgICBjYW5jZWwoKSB7XG4gICAgICB0aGlzLnNob3dBZGRBY3Rpdml0eSA9IGZhbHNlXG4gICAgICB0aGlzLnNob3dBZGRNb25leSA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBzdXJlKHZhbHVlLCB0eXBlKSB7XG4gICAgICBjb25zb2xlLmxvZyh0eXBlKVxuICAgICAgaWYgKHRoaXMuY2hlY2tSZXBlYXQodmFsdWUsIHRoaXMuYWN0aXZpdHlMaXN0KSkge1xuICAgICAgICBzaG93TXNnKCfor7fkuI3opoHovpPlhaXph43lpI3nmoTmtLvliqjpobnnm64nKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGNvbnN0IG9iaiA9IHtcbiAgICAgICAgbmFtZTogdmFsdWVcbiAgICAgIH1cbiAgICAgIHRoaXMuYWN0aXZpdHlMaXN0LnB1c2gob2JqKVxuICAgICAgaWYgKHR5cGUgPT09ICdzYXZlJykge1xuICAgICAgICB0aGlzLnNob3dBZGRBY3Rpdml0eSA9IGZhbHNlXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBtb25leVN1cmVGbih2YWx1ZTEsIHZhbHVlMikge1xuICAgICAgY29uc3Qgb2JqID0ge1xuICAgICAgICBuYW1lOiB2YWx1ZTEsXG4gICAgICAgIG1vbmV5OiB2YWx1ZTJcbiAgICAgIH1cbiAgICAgIHRoaXMubW9uZXlMaXN0LnB1c2gob2JqKVxuICAgICAgdGhpcy5zaG93QWRkTW9uZXkgPSBmYWxzZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgYWRkTmV3KGZsYWcpIHtcbiAgICAgIHRoaXNbZmxhZ10gPSB0cnVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBkZWxldGVGbiAoYXJyLCBpbmRleCkge1xuICAgICAgdGhpc1thcnJdLnNwbGljZShpbmRleCwgMSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGJpbmRDaGFuZ2UoZSkge1xuICAgICAgdGhpc1tlLmN1cnJlbnRUYXJnZXQuaWRdID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbn1cbiJdfQ==