'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _selectModal = require('./../components/selectModal.js');

var _selectModal2 = _interopRequireDefault(_selectModal);

var _commentModal = require('./../components/commentModal.js');

var _commentModal2 = _interopRequireDefault(_commentModal);

var _common = require('./../utils/common.js');

var _zone = require('./../api/zone.js');

var _finance = require('./../api/finance.js');

var _authorize = require('./../api/authorize.js');

var _user = require('./../api/user.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Zone = function (_wepy$page) {
  _inherits(Zone, _wepy$page);

  function Zone() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Zone);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Zone.__proto__ || Object.getPrototypeOf(Zone)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '发现',
      enablePullDownRefresh: true
    }, _this.$repeat = {}, _this.$props = { "CurrentModal": { "sureBtnText": "确认", "cancelBtnText": "取消", "placeholderText": "请输入评论内容", "xmlns:v-bind": "", "v-bind:flag.sync": "commentFlag", "v-bind:commentInput.sync": "commentInput", "xmlns:v-on": "" }, "SelectModal": { "v-bind:flag.sync": "selectFlag", "v-bind:list.sync": "payMemberList" } }, _this.$events = { "CurrentModal": { "v-on:cancel": "commentCancel", "v-on:sure": "commentSure", "v-on:input": "bindCommentInput" }, "SelectModal": { "v-on:cancel": "selectCancel", "v-on:sure": "selectSure" } }, _this.components = {
      CurrentModal: _commentModal2.default,
      SelectModal: _selectModal2.default
    }, _this.data = {
      menuList: [{
        text: '家长圈',
        type: 'circles',
        src: '/images/icon/2.jpg'
      }, {
        text: '收费',
        type: 'collection',
        src: '/images/icon/money.jpg'
      }, {
        text: '通知',
        type: 'notify',
        src: '/images/icon/4.jpg'
      }, {
        text: '活动',
        type: 'activity',
        src: '/images/icon/5.jpg'
      }, {
        text: '记账',
        type: 'account',
        src: '/images/icon/photos.jpg'
      }],
      commentFlag: false,
      selectFlag: false,
      activeType: 'circles',
      setFlag: false,
      publishFlag: false,
      type: {
        circles: '家长圈',
        collection: '收款',
        notify: '通知',
        activity: '活动',
        account: '记账'
      },
      pn: 1,
      ps: 10,
      list: [],
      payMemberList: [],
      classInfo: null,
      memberInfo: null,
      schoolInfo: null,
      loading: false,
      loadFinished: false,
      commentInput: '',
      currentReplyId: -1,
      currentReplyRootId: -1,
      currentReplyToCommentId: -1,
      currerntJoinAcitivytId: -1,
      currerntSubActivityId: [],
      currentCollectionId: -1,
      auth: {
        president: false,
        finance: false,
        activity: false,
        notify: false,
        photos: false,
        circles: false
      },
      commentPn: 2,
      commentPs: 6,
      commentOffset: 6,
      commentLoadFinished: false,
      memberList: [],
      studentIds: [],
      firstInit: true
    }, _this.watch = {
      classInfo: function classInfo(newVal, oldVal) {
        // 切换了班级之后数据要更新
        if (oldVal !== null) {
          this.resetData();
          this.getAuthList();
          this.getZoneList();
        }
      },
      currentJoinActivityId: function currentJoinActivityId(newVal, oldVal) {
        if (newVal > 0) {
          this.currerntSubActivityId = [];
          this.$apply();
        }
      }
    }, _this.methods = {
      pay: function pay(momentId, collectionId) {
        var _this2 = this;

        (0, _user.checkStudent)({
          class_id: this.classInfo.id,
          moment_id: momentId,
          is_pay: 0
        }).then(function (res) {
          _this2.payMemberList = res.data.list;
          if (!_this2.payMemberList.length) {
            (0, _common.showMsg)('请勿重复缴费');
            return;
          }
          if (_this2.payMemberList.length > 1) {
            _this2.selectFlag = true;
            _this2.currentCollectionId = collectionId;
            _this2.$apply();
          } else {
            _this2.studentIds = [];
            _this2.studentIds.push(_this2.payMemberList[0].id);
            _this2.addToOrder(collectionId);
          }
        });
      },
      submitJoinActivity: function submitJoinActivity() {
        var _this3 = this;

        (0, _zone.joinActivity)({
          class_id: this.classInfo.id,
          activity_item_id: this.currerntSubActivityId,
          activity_id: this.currerntJoinAcitivytId
        }).then(function (res) {
          if (res.data.success) {
            (0, _common.showMsg)('提交成功');
            _this3.currerntSubActivityId = [];
            _this3.$apply();
          }
        });
      },
      joinActivity: function joinActivity(id, subId, listIndex, activityIndex) {
        if (!this.classInfo) {
          (0, _common.showMsg)('请先选择班级');
          return;
        }
        this.currerntJoinAcitivytId = id;
        var index = this.currerntSubActivityId.indexOf(subId);
        if (index > -1) {
          this.currerntSubActivityId.splice(index, 1);
          this.list[listIndex].info.item[activityIndex].checked = false;
        } else {
          this.currerntSubActivityId.push(subId);
          this.list[listIndex].info.item[activityIndex].checked = true;
        }
        this.$apply();
      },
      loadMoreComment: function loadMoreComment(momentId, idx) {
        var _this4 = this;

        (0, _zone.getCommentList)({
          moment_id: momentId,
          ps: this.commentPs,
          pn: this.commentPn,
          offset: this.commentOffset
        }).then(function (res) {
          if (res.data.success) {
            var resultList = res.data.list;
            if (resultList.length < 6) {
              _this4.commentLoadFinished = true;
            }
            var list = _this4.list[idx].comment_list.list;

            list = [].concat(_toConsumableArray(list), _toConsumableArray(resultList));
            _this4.list[idx].comment_list.list = list;
            _this4.commentPn++;
            _this4.$apply();
          }
        });
      },
      addComment: function addComment(type, id, rootId, toCommentId, name) {
        if (!this.classInfo) {
          (0, _common.showMsg)('请先选择班级');
          return;
        }
        this.commentFlag = true;
        this.currentReplyId = id;
        this.currentReplyRootId = type === 'add' ? 0 : rootId;
        if (name !== undefined) {
          this.commentInput = '@' + name + ':';
        } else {
          this.commentInput = '';
        }
        this.$apply();
      },
      bindCommentInput: function bindCommentInput(value) {
        this.commentInput = value;
        this.$apply();
      },
      commentSure: function commentSure() {
        var _this5 = this;

        this.commentFlag = false;
        (0, _zone.addComment)({
          class_id: this.classInfo.id,
          moment_id: this.currentReplyId,
          content: this.currentReplyId > 0 ? this.commentInput.replace(/^@.+:/, '') : this.commentInput,
          root_id: this.currentReplyRootId,
          to_comment_id: this.currentReplyRootId
        }).then(function (res) {
          if (res.data.success) {
            _this5.commentInput = '';
            _this5.resetData();
            _this5.getZoneList();
            _this5.$apply();
          }
        });
      },
      commentCancel: function commentCancel() {
        this.commentFlag = false;
        this.commentInput = '';
        this.$apply();
      },
      filter: function filter(type) {
        this.resetData();
        this.activeType = type;
        this.$apply();
        this.getZoneList();
      },
      jumpPage: function jumpPage(pageName, type) {
        this.publishFlag = false;
        this.setFlag = false;
        wx.navigateTo({
          url: pageName + '?type=' + type
        });
      },
      toggleMenu: function toggleMenu(type) {
        if (!this.classInfo) {
          (0, _common.showMsg)('请选绑定班级', 3000);
          return;
        }
        this[type] = !this[type];
        this.$apply();
      },
      closeToggle: function closeToggle() {
        this.setFlag = false;
        this.publishFlag = false;
        this.$apply();
      },
      preview: function preview(img, imgList) {
        (0, _common.previewImage)(img, imgList);
      },
      selectCancel: function selectCancel() {
        this.selectFlag = false;
        this.$apply();
      },
      selectSure: function selectSure(value) {
        if (!value.length) {
          (0, _common.showMsg)('请选择');
          return;
        }
        var val = value;
        this.studentIds = [].concat(_toConsumableArray(val));
        this.selectFlag = false;
        this.$apply();
        this.addToOrder(this.currentCollectionId);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Zone, [{
    key: 'resetData',
    value: function resetData() {
      this.commentLoadFinished = false;
      this.commentPn = 1;
      this.commentPs = 6;
      this.studentIds = [];
      this.pn = 1;
      this.list = [];
      this.$apply();
    }
  }, {
    key: 'onPullDownRefresh',
    value: function onPullDownRefresh() {
      this.resetData();
      this.getZoneList();
    }
  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      if (this.loading || this.loadFinished) return;
      this.getZoneList();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.currerntJoinAcitivytId = -1;
      this.currerntSubActivityId = [];
      this.classInfo = wx.getStorageSync('classInfo');
      this.$apply();
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      if (!this.checkDataExist('memberInfo')) {
        wx.reLaunch({
          url: 'login'
        });
      } else {
        this.classInfo = wx.getStorageSync('classInfo');
        this.classInfo && this.getAuthList();
        this.memberInfo = wx.getStorageSync('memberInfo');
        this.$parent.globalData.userData = this.memberInfo;
        this.$apply();
        this.getZoneList();
      }
    }
  }, {
    key: 'getAuthList',
    value: function getAuthList() {
      var _this6 = this;

      (0, _authorize.getAuth)({
        class_id: this.classInfo.id
      }).then(function (res) {
        _this6.checkAuth(res.data.data);
      });
    }
  }, {
    key: 'formatAllAuth',
    value: function formatAllAuth(obj) {
      Object.keys(obj).forEach(function (key) {
        obj[key] = true;
      });
      this.$apply();
    }
  }, {
    key: 'formatSingleAuth',
    value: function formatSingleAuth(name) {
      this.auth[name] = true;
      this.$apply();
    }
  }, {
    key: 'checkAuth',
    value: function checkAuth(list) {
      for (var i = 0, len = list.length; i < len; i++) {
        var _list$i = list[i],
            code = _list$i.code,
            isAuth = _list$i.is_auth;

        if (code === 'president' && isAuth) {
          this.formatAllAuth(this.auth);
          break;
        } else {
          isAuth && this.formatSingleAuth(code);
        }
      }
    }
  }, {
    key: 'checkDataExist',
    value: function checkDataExist(key) {
      if (wx.getStorageSync(key)) {
        return true;
      }
      return false;
    }
  }, {
    key: 'getZoneList',
    value: function getZoneList() {
      var _this7 = this;

      this.loading = true;
      this.$apply();
      var id = this.classInfo.id;
      (0, _zone.getCircleList)({
        class_id: id,
        see_type: id ? '' : 'all',
        type: this.activeType,
        pn: this.pn,
        ps: this.ps,
        comment_count: 3
      }).then(function (res) {
        var list = res.data.list;

        _this7.loading = false;
        _this7.pn++;
        if (list.length < _this7.ps) {
          _this7.loadFinished = true;
        }
        _this7.list = [].concat(_toConsumableArray(_this7.list), _toConsumableArray(list));
        _this7.$apply();
      });
    }
  }, {
    key: 'paymentParams',
    value: function paymentParams(id) {
      (0, _finance.getPaymentParams)({
        order_id: id
      }).then(function (res) {
        var data = res.data.payment_params;
        wx.requestPayment({
          timeStamp: String(data.timeStamp),
          nonceStr: data.nonceStr,
          package: data.package,
          paySign: data.paySign,
          signType: 'MD5',
          success: function success() {
            console.log('成功了');
          }
        });
      });
    }
  }, {
    key: 'addToOrder',
    value: function addToOrder(id) {
      var _this8 = this;

      (0, _finance.addOrder)({
        class_id: this.classInfo.id,
        student_ids: this.studentIds,
        collection_item_id: id
      }).then(function (res) {
        _this8.paymentParams(res.data.data.id);
      });
    }
  }]);

  return Zone;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Zone , 'pages/zone'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInpvbmUuanMiXSwibmFtZXMiOlsiWm9uZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJDdXJyZW50TW9kYWwiLCJTZWxlY3RNb2RhbCIsImRhdGEiLCJtZW51TGlzdCIsInRleHQiLCJ0eXBlIiwic3JjIiwiY29tbWVudEZsYWciLCJzZWxlY3RGbGFnIiwiYWN0aXZlVHlwZSIsInNldEZsYWciLCJwdWJsaXNoRmxhZyIsImNpcmNsZXMiLCJjb2xsZWN0aW9uIiwibm90aWZ5IiwiYWN0aXZpdHkiLCJhY2NvdW50IiwicG4iLCJwcyIsImxpc3QiLCJwYXlNZW1iZXJMaXN0IiwiY2xhc3NJbmZvIiwibWVtYmVySW5mbyIsInNjaG9vbEluZm8iLCJsb2FkaW5nIiwibG9hZEZpbmlzaGVkIiwiY29tbWVudElucHV0IiwiY3VycmVudFJlcGx5SWQiLCJjdXJyZW50UmVwbHlSb290SWQiLCJjdXJyZW50UmVwbHlUb0NvbW1lbnRJZCIsImN1cnJlcm50Sm9pbkFjaXRpdnl0SWQiLCJjdXJyZXJudFN1YkFjdGl2aXR5SWQiLCJjdXJyZW50Q29sbGVjdGlvbklkIiwiYXV0aCIsInByZXNpZGVudCIsImZpbmFuY2UiLCJwaG90b3MiLCJjb21tZW50UG4iLCJjb21tZW50UHMiLCJjb21tZW50T2Zmc2V0IiwiY29tbWVudExvYWRGaW5pc2hlZCIsIm1lbWJlckxpc3QiLCJzdHVkZW50SWRzIiwiZmlyc3RJbml0Iiwid2F0Y2giLCJuZXdWYWwiLCJvbGRWYWwiLCJyZXNldERhdGEiLCJnZXRBdXRoTGlzdCIsImdldFpvbmVMaXN0IiwiY3VycmVudEpvaW5BY3Rpdml0eUlkIiwiJGFwcGx5IiwibWV0aG9kcyIsInBheSIsIm1vbWVudElkIiwiY29sbGVjdGlvbklkIiwiY2xhc3NfaWQiLCJpZCIsIm1vbWVudF9pZCIsImlzX3BheSIsInRoZW4iLCJyZXMiLCJsZW5ndGgiLCJwdXNoIiwiYWRkVG9PcmRlciIsInN1Ym1pdEpvaW5BY3Rpdml0eSIsImFjdGl2aXR5X2l0ZW1faWQiLCJhY3Rpdml0eV9pZCIsInN1Y2Nlc3MiLCJqb2luQWN0aXZpdHkiLCJzdWJJZCIsImxpc3RJbmRleCIsImFjdGl2aXR5SW5kZXgiLCJpbmRleCIsImluZGV4T2YiLCJzcGxpY2UiLCJpbmZvIiwiaXRlbSIsImNoZWNrZWQiLCJsb2FkTW9yZUNvbW1lbnQiLCJpZHgiLCJvZmZzZXQiLCJyZXN1bHRMaXN0IiwiY29tbWVudF9saXN0IiwiYWRkQ29tbWVudCIsInJvb3RJZCIsInRvQ29tbWVudElkIiwibmFtZSIsInVuZGVmaW5lZCIsImJpbmRDb21tZW50SW5wdXQiLCJ2YWx1ZSIsImNvbW1lbnRTdXJlIiwiY29udGVudCIsInJlcGxhY2UiLCJyb290X2lkIiwidG9fY29tbWVudF9pZCIsImNvbW1lbnRDYW5jZWwiLCJmaWx0ZXIiLCJqdW1wUGFnZSIsInBhZ2VOYW1lIiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwidG9nZ2xlTWVudSIsImNsb3NlVG9nZ2xlIiwicHJldmlldyIsImltZyIsImltZ0xpc3QiLCJzZWxlY3RDYW5jZWwiLCJzZWxlY3RTdXJlIiwidmFsIiwiZ2V0U3RvcmFnZVN5bmMiLCJjaGVja0RhdGFFeGlzdCIsInJlTGF1bmNoIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJ1c2VyRGF0YSIsImNoZWNrQXV0aCIsIm9iaiIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiaSIsImxlbiIsImNvZGUiLCJpc0F1dGgiLCJpc19hdXRoIiwiZm9ybWF0QWxsQXV0aCIsImZvcm1hdFNpbmdsZUF1dGgiLCJzZWVfdHlwZSIsImNvbW1lbnRfY291bnQiLCJvcmRlcl9pZCIsInBheW1lbnRfcGFyYW1zIiwicmVxdWVzdFBheW1lbnQiLCJ0aW1lU3RhbXAiLCJTdHJpbmciLCJub25jZVN0ciIsInBhY2thZ2UiLCJwYXlTaWduIiwic2lnblR5cGUiLCJjb25zb2xlIiwibG9nIiwic3R1ZGVudF9pZHMiLCJjb2xsZWN0aW9uX2l0ZW1faWQiLCJwYXltZW50UGFyYW1zIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLEk7Ozs7Ozs7Ozs7Ozs7O2tMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixJQURqQjtBQUVQQyw2QkFBdUI7QUFGaEIsSyxRQUlWQyxPLEdBQVUsRSxRQUNYQyxNLEdBQVMsRUFBQyxnQkFBZSxFQUFDLGVBQWMsSUFBZixFQUFvQixpQkFBZ0IsSUFBcEMsRUFBeUMsbUJBQWtCLFNBQTNELEVBQXFFLGdCQUFlLEVBQXBGLEVBQXVGLG9CQUFtQixhQUExRyxFQUF3SCw0QkFBMkIsY0FBbkosRUFBa0ssY0FBYSxFQUEvSyxFQUFoQixFQUFtTSxlQUFjLEVBQUMsb0JBQW1CLFlBQXBCLEVBQWlDLG9CQUFtQixlQUFwRCxFQUFqTixFLFFBQ1RDLE8sR0FBVSxFQUFDLGdCQUFlLEVBQUMsZUFBYyxlQUFmLEVBQStCLGFBQVksYUFBM0MsRUFBeUQsY0FBYSxrQkFBdEUsRUFBaEIsRUFBMEcsZUFBYyxFQUFDLGVBQWMsY0FBZixFQUE4QixhQUFZLFlBQTFDLEVBQXhILEUsUUFDVEMsVSxHQUFhO0FBQ1ZDLDBDQURVO0FBRVZDO0FBRlUsSyxRQUlaQyxJLEdBQU87QUFDTEMsZ0JBQVUsQ0FDUjtBQUNFQyxjQUFNLEtBRFI7QUFFRUMsY0FBTSxTQUZSO0FBR0VDLGFBQUs7QUFIUCxPQURRLEVBTVI7QUFDRUYsY0FBTSxJQURSO0FBRUVDLGNBQU0sWUFGUjtBQUdFQyxhQUFLO0FBSFAsT0FOUSxFQVdSO0FBQ0VGLGNBQU0sSUFEUjtBQUVFQyxjQUFNLFFBRlI7QUFHRUMsYUFBSztBQUhQLE9BWFEsRUFnQlI7QUFDRUYsY0FBTSxJQURSO0FBRUVDLGNBQU0sVUFGUjtBQUdFQyxhQUFLO0FBSFAsT0FoQlEs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RDs7OztFQTFOK0J5RixlQUFLQyxJOztrQkFBbEIzSixJIiwiZmlsZSI6InpvbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgU2VsZWN0TW9kYWwgZnJvbSAnLi4vY29tcG9uZW50cy9zZWxlY3RNb2RhbCdcbmltcG9ydCBDdXJyZW50TW9kYWwgZnJvbSAnLi4vY29tcG9uZW50cy9jb21tZW50TW9kYWwnXG5pbXBvcnQgeyBzaG93TXNnLCBwcmV2aWV3SW1hZ2UgfSBmcm9tICcuLi91dGlscy9jb21tb24nXG5pbXBvcnQgeyBnZXRDaXJjbGVMaXN0LCBhZGRDb21tZW50LCBqb2luQWN0aXZpdHksIGdldENvbW1lbnRMaXN0IH0gZnJvbSAnLi4vYXBpL3pvbmUnXG5pbXBvcnQgeyBhZGRPcmRlciwgZ2V0UGF5bWVudFBhcmFtcyB9IGZyb20gJy4uL2FwaS9maW5hbmNlJ1xuaW1wb3J0IHsgZ2V0QXV0aCB9IGZyb20gJy4uL2FwaS9hdXRob3JpemUnXG5pbXBvcnQgeyBjaGVja1N0dWRlbnQgfSBmcm9tICcuLi9hcGkvdXNlcidcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFpvbmUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WPkeeOsCcsXG4gICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiB0cnVlXG4gIH1cbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIkN1cnJlbnRNb2RhbFwiOntcInN1cmVCdG5UZXh0XCI6XCLnoa7orqRcIixcImNhbmNlbEJ0blRleHRcIjpcIuWPlua2iFwiLFwicGxhY2Vob2xkZXJUZXh0XCI6XCLor7fovpPlhaXor4TorrrlhoXlrrlcIixcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6ZmxhZy5zeW5jXCI6XCJjb21tZW50RmxhZ1wiLFwidi1iaW5kOmNvbW1lbnRJbnB1dC5zeW5jXCI6XCJjb21tZW50SW5wdXRcIixcInhtbG5zOnYtb25cIjpcIlwifSxcIlNlbGVjdE1vZGFsXCI6e1widi1iaW5kOmZsYWcuc3luY1wiOlwic2VsZWN0RmxhZ1wiLFwidi1iaW5kOmxpc3Quc3luY1wiOlwicGF5TWVtYmVyTGlzdFwifX07XHJcbiRldmVudHMgPSB7XCJDdXJyZW50TW9kYWxcIjp7XCJ2LW9uOmNhbmNlbFwiOlwiY29tbWVudENhbmNlbFwiLFwidi1vbjpzdXJlXCI6XCJjb21tZW50U3VyZVwiLFwidi1vbjppbnB1dFwiOlwiYmluZENvbW1lbnRJbnB1dFwifSxcIlNlbGVjdE1vZGFsXCI6e1widi1vbjpjYW5jZWxcIjpcInNlbGVjdENhbmNlbFwiLFwidi1vbjpzdXJlXCI6XCJzZWxlY3RTdXJlXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgQ3VycmVudE1vZGFsLFxuICAgIFNlbGVjdE1vZGFsXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBtZW51TGlzdDogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiAn5a626ZW/5ZyIJyxcbiAgICAgICAgdHlwZTogJ2NpcmNsZXMnLFxuICAgICAgICBzcmM6ICcvaW1hZ2VzL2ljb24vMi5qcGcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAn5pS26LS5JyxcbiAgICAgICAgdHlwZTogJ2NvbGxlY3Rpb24nLFxuICAgICAgICBzcmM6ICcvaW1hZ2VzL2ljb24vbW9uZXkuanBnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ+mAmuefpScsXG4gICAgICAgIHR5cGU6ICdub3RpZnknLFxuICAgICAgICBzcmM6ICcvaW1hZ2VzL2ljb24vNC5qcGcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAn5rS75YqoJyxcbiAgICAgICAgdHlwZTogJ2FjdGl2aXR5JyxcbiAgICAgICAgc3JjOiAnL2ltYWdlcy9pY29uLzUuanBnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ+iusOi0picsXG4gICAgICAgIHR5cGU6ICdhY2NvdW50JyxcbiAgICAgICAgc3JjOiAnL2ltYWdlcy9pY29uL3Bob3Rvcy5qcGcnXG4gICAgICB9XG4gICAgXSxcbiAgICBjb21tZW50RmxhZzogZmFsc2UsXG4gICAgc2VsZWN0RmxhZzogZmFsc2UsXG4gICAgYWN0aXZlVHlwZTogJ2NpcmNsZXMnLFxuICAgIHNldEZsYWc6IGZhbHNlLFxuICAgIHB1Ymxpc2hGbGFnOiBmYWxzZSxcbiAgICB0eXBlOiB7XG4gICAgICBjaXJjbGVzOiAn5a626ZW/5ZyIJyxcbiAgICAgIGNvbGxlY3Rpb246ICfmlLbmrL4nLFxuICAgICAgbm90aWZ5OiAn6YCa55+lJyxcbiAgICAgIGFjdGl2aXR5OiAn5rS75YqoJyxcbiAgICAgIGFjY291bnQ6ICforrDotKYnXG4gICAgfSxcbiAgICBwbjogMSxcbiAgICBwczogMTAsXG4gICAgbGlzdDogW10sXG4gICAgcGF5TWVtYmVyTGlzdDogW10sXG4gICAgY2xhc3NJbmZvOiBudWxsLFxuICAgIG1lbWJlckluZm86IG51bGwsXG4gICAgc2Nob29sSW5mbzogbnVsbCxcbiAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICBsb2FkRmluaXNoZWQ6IGZhbHNlLFxuICAgIGNvbW1lbnRJbnB1dDogJycsXG4gICAgY3VycmVudFJlcGx5SWQ6IC0xLFxuICAgIGN1cnJlbnRSZXBseVJvb3RJZDogLTEsXG4gICAgY3VycmVudFJlcGx5VG9Db21tZW50SWQ6IC0xLFxuICAgIGN1cnJlcm50Sm9pbkFjaXRpdnl0SWQ6IC0xLFxuICAgIGN1cnJlcm50U3ViQWN0aXZpdHlJZDogW10sXG4gICAgY3VycmVudENvbGxlY3Rpb25JZDogLTEsXG4gICAgYXV0aDoge1xuICAgICAgcHJlc2lkZW50OiBmYWxzZSxcbiAgICAgIGZpbmFuY2U6IGZhbHNlLFxuICAgICAgYWN0aXZpdHk6IGZhbHNlLFxuICAgICAgbm90aWZ5OiBmYWxzZSxcbiAgICAgIHBob3RvczogZmFsc2UsXG4gICAgICBjaXJjbGVzOiBmYWxzZVxuICAgIH0sXG4gICAgY29tbWVudFBuOiAyLFxuICAgIGNvbW1lbnRQczogNixcbiAgICBjb21tZW50T2Zmc2V0OiA2LFxuICAgIGNvbW1lbnRMb2FkRmluaXNoZWQ6IGZhbHNlLFxuICAgIG1lbWJlckxpc3Q6IFtdLFxuICAgIHN0dWRlbnRJZHM6IFtdLFxuICAgIGZpcnN0SW5pdDogdHJ1ZVxuICB9XG4gIHdhdGNoID0ge1xuICAgIGNsYXNzSW5mbyhuZXdWYWwsIG9sZFZhbCkge1xuICAgICAgLy8g5YiH5o2i5LqG54+t57qn5LmL5ZCO5pWw5o2u6KaB5pu05pawXG4gICAgICBpZiAob2xkVmFsICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMucmVzZXREYXRhKClcbiAgICAgICAgdGhpcy5nZXRBdXRoTGlzdCgpXG4gICAgICAgIHRoaXMuZ2V0Wm9uZUxpc3QoKVxuICAgICAgfVxuICAgIH0sXG4gICAgY3VycmVudEpvaW5BY3Rpdml0eUlkKG5ld1ZhbCwgb2xkVmFsKSB7XG4gICAgICBpZiAobmV3VmFsID4gMCkge1xuICAgICAgICB0aGlzLmN1cnJlcm50U3ViQWN0aXZpdHlJZCA9IFtdXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmVzZXREYXRhKCkge1xuICAgIHRoaXMuY29tbWVudExvYWRGaW5pc2hlZCA9IGZhbHNlXG4gICAgdGhpcy5jb21tZW50UG4gPSAxXG4gICAgdGhpcy5jb21tZW50UHMgPSA2XG4gICAgdGhpcy5zdHVkZW50SWRzID0gW11cbiAgICB0aGlzLnBuID0gMVxuICAgIHRoaXMubGlzdCA9IFtdXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIG9uUHVsbERvd25SZWZyZXNoKCkge1xuICAgIHRoaXMucmVzZXREYXRhKClcbiAgICB0aGlzLmdldFpvbmVMaXN0KClcbiAgfVxuICBvblJlYWNoQm90dG9tKCkge1xuICAgIGlmICh0aGlzLmxvYWRpbmcgfHwgdGhpcy5sb2FkRmluaXNoZWQpIHJldHVyblxuICAgIHRoaXMuZ2V0Wm9uZUxpc3QoKVxuICB9XG4gIG9uU2hvdygpIHtcbiAgICB0aGlzLmN1cnJlcm50Sm9pbkFjaXRpdnl0SWQgPSAtMVxuICAgIHRoaXMuY3VycmVybnRTdWJBY3Rpdml0eUlkID0gW11cbiAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxuICAgIHRoaXMuJGFwcGx5KClcbiAgfVxuICBvbkxvYWQoKSB7XG4gICAgaWYgKCF0aGlzLmNoZWNrRGF0YUV4aXN0KCdtZW1iZXJJbmZvJykpIHtcbiAgICAgIHd4LnJlTGF1bmNoKHtcbiAgICAgICAgdXJsOiAnbG9naW4nXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxuICAgICAgdGhpcy5jbGFzc0luZm8gJiYgdGhpcy5nZXRBdXRoTGlzdCgpXG4gICAgICB0aGlzLm1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXG4gICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyRGF0YSA9IHRoaXMubWVtYmVySW5mb1xuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgdGhpcy5nZXRab25lTGlzdCgpXG4gICAgfVxuICB9XG4gIGdldEF1dGhMaXN0KCkge1xuICAgIGdldEF1dGgoe1xuICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgdGhpcy5jaGVja0F1dGgocmVzLmRhdGEuZGF0YSlcbiAgICB9KVxuICB9XG4gIGZvcm1hdEFsbEF1dGgob2JqKSB7XG4gICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBvYmpba2V5XSA9IHRydWVcbiAgICB9KVxuICAgIHRoaXMuJGFwcGx5KClcbiAgfVxuICBmb3JtYXRTaW5nbGVBdXRoKG5hbWUpIHtcbiAgICB0aGlzLmF1dGhbbmFtZV0gPSB0cnVlXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIGNoZWNrQXV0aChsaXN0KSB7XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGxpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGxldCB7Y29kZSwgaXNfYXV0aDogaXNBdXRofSA9IGxpc3RbaV1cbiAgICAgIGlmIChjb2RlID09PSAncHJlc2lkZW50JyAmJiBpc0F1dGgpIHtcbiAgICAgICAgdGhpcy5mb3JtYXRBbGxBdXRoKHRoaXMuYXV0aClcbiAgICAgICAgYnJlYWtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlzQXV0aCAmJiB0aGlzLmZvcm1hdFNpbmdsZUF1dGgoY29kZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgY2hlY2tEYXRhRXhpc3Qoa2V5KSB7XG4gICAgaWYgKHd4LmdldFN0b3JhZ2VTeW5jKGtleSkpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIGdldFpvbmVMaXN0KCkge1xuICAgIHRoaXMubG9hZGluZyA9IHRydWVcbiAgICB0aGlzLiRhcHBseSgpXG4gICAgY29uc3QgaWQgPSB0aGlzLmNsYXNzSW5mby5pZFxuICAgIGdldENpcmNsZUxpc3Qoe1xuICAgICAgY2xhc3NfaWQ6IGlkLFxuICAgICAgc2VlX3R5cGU6IGlkID8gJycgOiAnYWxsJyxcbiAgICAgIHR5cGU6IHRoaXMuYWN0aXZlVHlwZSxcbiAgICAgIHBuOiB0aGlzLnBuLFxuICAgICAgcHM6IHRoaXMucHMsXG4gICAgICBjb21tZW50X2NvdW50OiAzXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IHsgbGlzdCB9ID0gcmVzLmRhdGFcbiAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlXG4gICAgICB0aGlzLnBuKytcbiAgICAgIGlmIChsaXN0Lmxlbmd0aCA8IHRoaXMucHMpIHtcbiAgICAgICAgdGhpcy5sb2FkRmluaXNoZWQgPSB0cnVlXG4gICAgICB9XG4gICAgICB0aGlzLmxpc3QgPSBbLi4udGhpcy5saXN0LCAuLi5saXN0XVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0pXG4gIH1cbiAgcGF5bWVudFBhcmFtcyhpZCkge1xuICAgIGdldFBheW1lbnRQYXJhbXMoe1xuICAgICAgb3JkZXJfaWQ6IGlkXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YS5wYXltZW50X3BhcmFtc1xuICAgICAgd3gucmVxdWVzdFBheW1lbnQoe1xuICAgICAgICB0aW1lU3RhbXA6IFN0cmluZyhkYXRhLnRpbWVTdGFtcCksXG4gICAgICAgIG5vbmNlU3RyOiBkYXRhLm5vbmNlU3RyLFxuICAgICAgICBwYWNrYWdlOiBkYXRhLnBhY2thZ2UsXG4gICAgICAgIHBheVNpZ246IGRhdGEucGF5U2lnbixcbiAgICAgICAgc2lnblR5cGU6ICdNRDUnLFxuICAgICAgICBzdWNjZXNzKCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCfmiJDlip/kuoYnKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH1cbiAgYWRkVG9PcmRlcihpZCkge1xuICAgIGFkZE9yZGVyKHtcbiAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgIHN0dWRlbnRfaWRzOiB0aGlzLnN0dWRlbnRJZHMsXG4gICAgICBjb2xsZWN0aW9uX2l0ZW1faWQ6IGlkXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgdGhpcy5wYXltZW50UGFyYW1zKHJlcy5kYXRhLmRhdGEuaWQpXG4gICAgfSlcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIHBheShtb21lbnRJZCwgY29sbGVjdGlvbklkKSB7XG4gICAgICBjaGVja1N0dWRlbnQoe1xuICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXG4gICAgICAgIG1vbWVudF9pZDogbW9tZW50SWQsXG4gICAgICAgIGlzX3BheTogMFxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICB0aGlzLnBheU1lbWJlckxpc3QgPSByZXMuZGF0YS5saXN0XG4gICAgICAgIGlmICghdGhpcy5wYXlNZW1iZXJMaXN0Lmxlbmd0aCkge1xuICAgICAgICAgIHNob3dNc2coJ+ivt+WLv+mHjeWkjee8tOi0uScpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucGF5TWVtYmVyTGlzdC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RGbGFnID0gdHJ1ZVxuICAgICAgICAgIHRoaXMuY3VycmVudENvbGxlY3Rpb25JZCA9IGNvbGxlY3Rpb25JZFxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnN0dWRlbnRJZHMgPSBbXVxuICAgICAgICAgIHRoaXMuc3R1ZGVudElkcy5wdXNoKHRoaXMucGF5TWVtYmVyTGlzdFswXS5pZClcbiAgICAgICAgICB0aGlzLmFkZFRvT3JkZXIoY29sbGVjdGlvbklkKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgc3VibWl0Sm9pbkFjdGl2aXR5KCkge1xuICAgICAgam9pbkFjdGl2aXR5KHtcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgICBhY3Rpdml0eV9pdGVtX2lkOiB0aGlzLmN1cnJlcm50U3ViQWN0aXZpdHlJZCxcbiAgICAgICAgYWN0aXZpdHlfaWQ6IHRoaXMuY3VycmVybnRKb2luQWNpdGl2eXRJZFxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgIHNob3dNc2coJ+aPkOS6pOaIkOWKnycpXG4gICAgICAgICAgdGhpcy5jdXJyZXJudFN1YkFjdGl2aXR5SWQgPSBbXVxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIGpvaW5BY3Rpdml0eShpZCwgc3ViSWQsIGxpc3RJbmRleCwgYWN0aXZpdHlJbmRleCkge1xuICAgICAgaWYgKCF0aGlzLmNsYXNzSW5mbykge1xuICAgICAgICBzaG93TXNnKCfor7flhYjpgInmi6nnj63nuqcnKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHRoaXMuY3VycmVybnRKb2luQWNpdGl2eXRJZCA9IGlkXG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuY3VycmVybnRTdWJBY3Rpdml0eUlkLmluZGV4T2Yoc3ViSWQpXG4gICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICB0aGlzLmN1cnJlcm50U3ViQWN0aXZpdHlJZC5zcGxpY2UoaW5kZXgsIDEpXG4gICAgICAgIHRoaXMubGlzdFtsaXN0SW5kZXhdLmluZm8uaXRlbVthY3Rpdml0eUluZGV4XS5jaGVja2VkID0gZmFsc2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY3VycmVybnRTdWJBY3Rpdml0eUlkLnB1c2goc3ViSWQpXG4gICAgICAgIHRoaXMubGlzdFtsaXN0SW5kZXhdLmluZm8uaXRlbVthY3Rpdml0eUluZGV4XS5jaGVja2VkID0gdHJ1ZVxuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgbG9hZE1vcmVDb21tZW50KG1vbWVudElkLCBpZHgpIHtcbiAgICAgIGdldENvbW1lbnRMaXN0KHtcbiAgICAgICAgbW9tZW50X2lkOiBtb21lbnRJZCxcbiAgICAgICAgcHM6IHRoaXMuY29tbWVudFBzLFxuICAgICAgICBwbjogdGhpcy5jb21tZW50UG4sXG4gICAgICAgIG9mZnNldDogdGhpcy5jb21tZW50T2Zmc2V0XG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgbGV0IHJlc3VsdExpc3QgPSByZXMuZGF0YS5saXN0XG4gICAgICAgICAgaWYgKHJlc3VsdExpc3QubGVuZ3RoIDwgNikge1xuICAgICAgICAgICAgdGhpcy5jb21tZW50TG9hZEZpbmlzaGVkID0gdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBsZXQge2xpc3R9ID0gdGhpcy5saXN0W2lkeF0uY29tbWVudF9saXN0XG4gICAgICAgICAgbGlzdCA9IFsuLi5saXN0LCAuLi5yZXN1bHRMaXN0XVxuICAgICAgICAgIHRoaXMubGlzdFtpZHhdLmNvbW1lbnRfbGlzdC5saXN0ID0gbGlzdFxuICAgICAgICAgIHRoaXMuY29tbWVudFBuKytcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBhZGRDb21tZW50KHR5cGUsIGlkLCByb290SWQsIHRvQ29tbWVudElkLCBuYW1lKSB7XG4gICAgICBpZiAoIXRoaXMuY2xhc3NJbmZvKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+WFiOmAieaLqeePree6pycpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdGhpcy5jb21tZW50RmxhZyA9IHRydWVcbiAgICAgIHRoaXMuY3VycmVudFJlcGx5SWQgPSBpZFxuICAgICAgdGhpcy5jdXJyZW50UmVwbHlSb290SWQgPSB0eXBlID09PSAnYWRkJyA/IDAgOiByb290SWRcbiAgICAgIGlmIChuYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5jb21tZW50SW5wdXQgPSBgQCR7bmFtZX06YFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb21tZW50SW5wdXQgPSAnJ1xuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgYmluZENvbW1lbnRJbnB1dCAodmFsdWUpIHtcbiAgICAgIHRoaXMuY29tbWVudElucHV0ID0gdmFsdWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGNvbW1lbnRTdXJlICgpIHtcbiAgICAgIHRoaXMuY29tbWVudEZsYWcgPSBmYWxzZVxuICAgICAgYWRkQ29tbWVudCh7XG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgICAgbW9tZW50X2lkOiB0aGlzLmN1cnJlbnRSZXBseUlkLFxuICAgICAgICBjb250ZW50OiB0aGlzLmN1cnJlbnRSZXBseUlkID4gMCA/IHRoaXMuY29tbWVudElucHV0LnJlcGxhY2UoL15ALis6LywgJycpIDogdGhpcy5jb21tZW50SW5wdXQsXG4gICAgICAgIHJvb3RfaWQ6IHRoaXMuY3VycmVudFJlcGx5Um9vdElkLFxuICAgICAgICB0b19jb21tZW50X2lkOiB0aGlzLmN1cnJlbnRSZXBseVJvb3RJZFxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgIHRoaXMuY29tbWVudElucHV0ID0gJydcbiAgICAgICAgICB0aGlzLnJlc2V0RGF0YSgpXG4gICAgICAgICAgdGhpcy5nZXRab25lTGlzdCgpXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgY29tbWVudENhbmNlbCAoKSB7XG4gICAgICB0aGlzLmNvbW1lbnRGbGFnID0gZmFsc2VcbiAgICAgIHRoaXMuY29tbWVudElucHV0ID0gJydcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGZpbHRlciAodHlwZSkge1xuICAgICAgdGhpcy5yZXNldERhdGEoKVxuICAgICAgdGhpcy5hY3RpdmVUeXBlID0gdHlwZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgdGhpcy5nZXRab25lTGlzdCgpXG4gICAgfSxcbiAgICBqdW1wUGFnZSAocGFnZU5hbWUsIHR5cGUpIHtcbiAgICAgIHRoaXMucHVibGlzaEZsYWcgPSBmYWxzZVxuICAgICAgdGhpcy5zZXRGbGFnID0gZmFsc2VcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6IGAke3BhZ2VOYW1lfT90eXBlPSR7dHlwZX1gXG4gICAgICB9KVxuICAgIH0sXG4gICAgdG9nZ2xlTWVudSAodHlwZSkge1xuICAgICAgaWYgKCF0aGlzLmNsYXNzSW5mbykge1xuICAgICAgICBzaG93TXNnKCfor7fpgInnu5Hlrprnj63nuqcnLCAzMDAwKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHRoaXNbdHlwZV0gPSAhdGhpc1t0eXBlXVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgY2xvc2VUb2dnbGUgKCkge1xuICAgICAgdGhpcy5zZXRGbGFnID0gZmFsc2VcbiAgICAgIHRoaXMucHVibGlzaEZsYWcgPSBmYWxzZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgcHJldmlldyhpbWcsIGltZ0xpc3QpIHtcbiAgICAgIHByZXZpZXdJbWFnZShpbWcsIGltZ0xpc3QpXG4gICAgfSxcbiAgICBzZWxlY3RDYW5jZWwoKSB7XG4gICAgICB0aGlzLnNlbGVjdEZsYWcgPSBmYWxzZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgc2VsZWN0U3VyZSh2YWx1ZSkge1xuICAgICAgaWYgKCF2YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgc2hvd01zZygn6K+36YCJ5oupJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBjb25zdCB2YWwgPSB2YWx1ZVxuICAgICAgdGhpcy5zdHVkZW50SWRzID0gWy4uLnZhbF1cbiAgICAgIHRoaXMuc2VsZWN0RmxhZyA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB0aGlzLmFkZFRvT3JkZXIodGhpcy5jdXJyZW50Q29sbGVjdGlvbklkKVxuICAgIH1cbiAgfVxufVxuIl19