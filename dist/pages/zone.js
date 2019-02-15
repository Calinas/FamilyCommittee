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

    var _temp, _this2, _ret;

    _classCallCheck(this, Zone);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Zone.__proto__ || Object.getPrototypeOf(Zone)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      navigationBarTitleText: '发现',
      enablePullDownRefresh: true
    }, _this2.$repeat = {}, _this2.$props = { "CurrentModal": { "sureBtnText": "确认", "cancelBtnText": "取消", "placeholderText": "请输入评论内容", "xmlns:v-bind": "", "v-bind:flag.sync": "commentFlag", "v-bind:commentInput.sync": "commentInput", "xmlns:v-on": "" }, "SelectModal": { "v-bind:flag.sync": "selectFlag", "v-bind:list.sync": "payMemberList" } }, _this2.$events = { "CurrentModal": { "v-on:cancel": "commentCancel", "v-on:sure": "commentSure", "v-on:input": "bindCommentInput" }, "SelectModal": { "v-on:cancel": "selectCancel", "v-on:sure": "selectSure" } }, _this2.components = {
      CurrentModal: _commentModal2.default,
      SelectModal: _selectModal2.default
    }, _this2.data = {
      menuList: [{
        text: '家长圈',
        type: 'zone',
        src: '/images/icon/2.jpg'
      }, {
        text: '收费',
        type: 'money',
        src: '/images/icon/money.jpg'
      }, {
        text: '通知',
        type: 'notice',
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
      activeType: 'all',
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
      firstInit: true,
      paymentLocked: false
    }, _this2.watch = {
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
    }, _this2.methods = {
      pay: function pay(momentId, collectionId) {
        var _this3 = this;

        if (this.paymentLocked) {
          return;
        }
        this.paymentLocked = true;
        (0, _user.checkStudent)({
          class_id: this.classInfo.id,
          moment_id: momentId,
          is_pay: 0
        }).then(function (res) {
          _this3.payMemberList = res.data.list;
          if (!_this3.payMemberList.length) {
            _this3.paymentLocked = false;
            _this3.$apply();
            (0, _common.showMsg)('请勿重复缴费');
            return;
          }
          if (_this3.payMemberList.length > 1) {
            _this3.selectFlag = true;
            _this3.currentCollectionId = collectionId;
            _this3.$apply();
          } else {
            _this3.studentIds = [];
            _this3.studentIds.push(_this3.payMemberList[0].id);
            _this3.addToOrder(collectionId);
          }
        });
      },
      submitJoinActivity: function submitJoinActivity() {
        var _this4 = this;

        (0, _zone.joinActivity)({
          class_id: this.classInfo.id,
          activity_item_id: this.currerntSubActivityId,
          activity_id: this.currerntJoinAcitivytId
        }).then(function (res) {
          if (res.data.success) {
            (0, _common.showMsg)('提交成功');
            _this4.currerntSubActivityId = [];
            _this4.$apply();
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
        var _this5 = this;

        (0, _zone.getCommentList)({
          moment_id: momentId,
          ps: this.commentPs,
          pn: this.commentPn,
          offset: this.commentOffset
        }).then(function (res) {
          if (res.data.success) {
            var resultList = res.data.list;
            if (resultList.length < _this5.commentPs) {
              _this5.commentLoadFinished = true;
            }
            var list = _this5.list[idx].comment_list.list;

            list = [].concat(_toConsumableArray(list), _toConsumableArray(resultList));
            _this5.list[idx].comment_list.list = list;
            _this5.commentPn++;
            _this5.$apply();
          }
        });
      },
      addComment: function addComment(type, id, rootId, toCommentId, name) {
        if (toCommentId === this.memberInfo.member_id) {
          (0, _common.showMsg)('请不要回复自己');
          return;
        }
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
        var _this6 = this;

        this.commentFlag = false;
        (0, _zone.addComment)({
          class_id: this.classInfo.id,
          moment_id: this.currentReplyId,
          content: this.currentReplyId > 0 ? this.commentInput.replace(/^@.+:/, '') : this.commentInput,
          root_id: this.currentReplyRootId,
          to_comment_id: this.currentReplyRootId
        }).then(function (res) {
          if (res.data.success) {
            _this6.commentInput = '';
            _this6.resetData();
            _this6.getZoneList();
            _this6.$apply();
          }
        });
      },
      jumpPublish: function jumpPublish(value) {
        var url = value === 'account' ? 'recordCashflow' : 'publish?type=' + value;
        wx.navigateTo({
          url: url
        });
      },
      commentCancel: function commentCancel() {
        this.commentFlag = false;
        this.commentInput = '';
        this.$apply();
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
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Zone, [{
    key: 'resetData',
    value: function resetData() {
      this.commentLoadFinished = false;
      this.commentPn = 2;
      this.commentPs = 6;
      this.studentIds = [];
      this.paymentLocked = false;
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
      var _this7 = this;

      (0, _authorize.getAuth)({
        class_id: this.classInfo.id
      }).then(function (res) {
        _this7.checkAuth(res.data.data);
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
      var _this8 = this;

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

        _this8.loading = false;
        _this8.pn++;
        if (list.length < _this8.ps) {
          _this8.loadFinished = true;
        }
        _this8.list = [].concat(_toConsumableArray(_this8.list), _toConsumableArray(list));
        _this8.$apply();
      });
    }
  }, {
    key: 'paymentParams',
    value: function paymentParams(id) {
      var _this9 = this;

      (0, _finance.getPaymentParams)({
        order_id: id
      }).then(function (res) {
        var _this = _this9;
        var data = res.data.payment_params;
        wx.requestPayment({
          timeStamp: String(data.timeStamp),
          nonceStr: data.nonceStr,
          package: data.package,
          paySign: data.paySign,
          signType: 'MD5',
          success: function success() {
            _this.paymentLocked = false;
            _this.$apply();
          },
          fail: function fail() {
            _this.paymentLocked = false;
            _this.$apply();
          }
        });
      });
    }
  }, {
    key: 'addToOrder',
    value: function addToOrder(id) {
      var _this10 = this;

      (0, _finance.addOrder)({
        class_id: this.classInfo.id,
        student_ids: this.studentIds,
        collection_item_id: id
      }).then(function (res) {
        _this10.paymentParams(res.data.data.id);
      });
    }
  }]);

  return Zone;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Zone , 'pages/zone'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInpvbmUuanMiXSwibmFtZXMiOlsiWm9uZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJDdXJyZW50TW9kYWwiLCJTZWxlY3RNb2RhbCIsImRhdGEiLCJtZW51TGlzdCIsInRleHQiLCJ0eXBlIiwic3JjIiwiY29tbWVudEZsYWciLCJzZWxlY3RGbGFnIiwiYWN0aXZlVHlwZSIsInNldEZsYWciLCJwdWJsaXNoRmxhZyIsImNpcmNsZXMiLCJjb2xsZWN0aW9uIiwibm90aWZ5IiwiYWN0aXZpdHkiLCJhY2NvdW50IiwicG4iLCJwcyIsImxpc3QiLCJwYXlNZW1iZXJMaXN0IiwiY2xhc3NJbmZvIiwibWVtYmVySW5mbyIsInNjaG9vbEluZm8iLCJsb2FkaW5nIiwibG9hZEZpbmlzaGVkIiwiY29tbWVudElucHV0IiwiY3VycmVudFJlcGx5SWQiLCJjdXJyZW50UmVwbHlSb290SWQiLCJjdXJyZW50UmVwbHlUb0NvbW1lbnRJZCIsImN1cnJlcm50Sm9pbkFjaXRpdnl0SWQiLCJjdXJyZXJudFN1YkFjdGl2aXR5SWQiLCJjdXJyZW50Q29sbGVjdGlvbklkIiwiYXV0aCIsInByZXNpZGVudCIsImZpbmFuY2UiLCJwaG90b3MiLCJjb21tZW50UG4iLCJjb21tZW50UHMiLCJjb21tZW50T2Zmc2V0IiwiY29tbWVudExvYWRGaW5pc2hlZCIsIm1lbWJlckxpc3QiLCJzdHVkZW50SWRzIiwiZmlyc3RJbml0IiwicGF5bWVudExvY2tlZCIsIndhdGNoIiwibmV3VmFsIiwib2xkVmFsIiwicmVzZXREYXRhIiwiZ2V0QXV0aExpc3QiLCJnZXRab25lTGlzdCIsImN1cnJlbnRKb2luQWN0aXZpdHlJZCIsIiRhcHBseSIsIm1ldGhvZHMiLCJwYXkiLCJtb21lbnRJZCIsImNvbGxlY3Rpb25JZCIsImNsYXNzX2lkIiwiaWQiLCJtb21lbnRfaWQiLCJpc19wYXkiLCJ0aGVuIiwicmVzIiwibGVuZ3RoIiwicHVzaCIsImFkZFRvT3JkZXIiLCJzdWJtaXRKb2luQWN0aXZpdHkiLCJhY3Rpdml0eV9pdGVtX2lkIiwiYWN0aXZpdHlfaWQiLCJzdWNjZXNzIiwiam9pbkFjdGl2aXR5Iiwic3ViSWQiLCJsaXN0SW5kZXgiLCJhY3Rpdml0eUluZGV4IiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIiwiaW5mbyIsIml0ZW0iLCJjaGVja2VkIiwibG9hZE1vcmVDb21tZW50IiwiaWR4Iiwib2Zmc2V0IiwicmVzdWx0TGlzdCIsImNvbW1lbnRfbGlzdCIsImFkZENvbW1lbnQiLCJyb290SWQiLCJ0b0NvbW1lbnRJZCIsIm5hbWUiLCJtZW1iZXJfaWQiLCJ1bmRlZmluZWQiLCJiaW5kQ29tbWVudElucHV0IiwidmFsdWUiLCJjb21tZW50U3VyZSIsImNvbnRlbnQiLCJyZXBsYWNlIiwicm9vdF9pZCIsInRvX2NvbW1lbnRfaWQiLCJqdW1wUHVibGlzaCIsInVybCIsInd4IiwibmF2aWdhdGVUbyIsImNvbW1lbnRDYW5jZWwiLCJqdW1wUGFnZSIsInBhZ2VOYW1lIiwidG9nZ2xlTWVudSIsImNsb3NlVG9nZ2xlIiwicHJldmlldyIsImltZyIsImltZ0xpc3QiLCJzZWxlY3RDYW5jZWwiLCJzZWxlY3RTdXJlIiwidmFsIiwiZ2V0U3RvcmFnZVN5bmMiLCJjaGVja0RhdGFFeGlzdCIsInJlTGF1bmNoIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJ1c2VyRGF0YSIsImNoZWNrQXV0aCIsIm9iaiIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiaSIsImxlbiIsImNvZGUiLCJpc0F1dGgiLCJpc19hdXRoIiwiZm9ybWF0QWxsQXV0aCIsImZvcm1hdFNpbmdsZUF1dGgiLCJzZWVfdHlwZSIsImNvbW1lbnRfY291bnQiLCJvcmRlcl9pZCIsIl90aGlzIiwicGF5bWVudF9wYXJhbXMiLCJyZXF1ZXN0UGF5bWVudCIsInRpbWVTdGFtcCIsIlN0cmluZyIsIm5vbmNlU3RyIiwicGFja2FnZSIsInBheVNpZ24iLCJzaWduVHlwZSIsImZhaWwiLCJzdHVkZW50X2lkcyIsImNvbGxlY3Rpb25faXRlbV9pZCIsInBheW1lbnRQYXJhbXMiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsSTs7Ozs7Ozs7Ozs7Ozs7cUxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCLElBRGpCO0FBRVBDLDZCQUF1QjtBQUZoQixLLFNBSVZDLE8sR0FBVSxFLFNBQ1hDLE0sR0FBUyxFQUFDLGdCQUFlLEVBQUMsZUFBYyxJQUFmLEVBQW9CLGlCQUFnQixJQUFwQyxFQUF5QyxtQkFBa0IsU0FBM0QsRUFBcUUsZ0JBQWUsRUFBcEYsRUFBdUYsb0JBQW1CLGFBQTFHLEVBQXdILDRCQUEyQixjQUFuSixFQUFrSyxjQUFhLEVBQS9LLEVBQWhCLEVBQW1NLGVBQWMsRUFBQyxvQkFBbUIsWUFBcEIsRUFBaUMsb0JBQW1CLGVBQXBELEVBQWpOLEUsU0FDVEMsTyxHQUFVLEVBQUMsZ0JBQWUsRUFBQyxlQUFjLGVBQWYsRUFBK0IsYUFBWSxhQUEzQyxFQUF5RCxjQUFhLGtCQUF0RSxFQUFoQixFQUEwRyxlQUFjLEVBQUMsZUFBYyxjQUFmLEVBQThCLGFBQVksWUFBMUMsRUFBeEgsRSxTQUNUQyxVLEdBQWE7QUFDVkMsMENBRFU7QUFFVkM7QUFGVSxLLFNBSVpDLEksR0FBTztBQUNMQyxnQkFBVSxDQUNSO0FBQ0VDLGNBQU0sS0FEUjtBQUVFQyxjQUFNLE1BRlI7QUFHRUMsYUFBSztBQUhQLE9BRFEsRUFNUjtBQUNFRixjQUFNLElBRFI7QUFFRUMsY0FBTSxPQUZSO0FBR0VDLGFBQUs7QUFIUCxPQU5RLEVBV1I7QUFDRUYsY0FBTSxJQURSO0FBRUVDLGNBQU0sUUFGUjtBQUdFQyxhQUFLO0FBSFAsT0FYUSxFQWdCUjtBQUNFRixjQUFNLElBRFI7QUFFRUMs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LE9BSkU7QUFLaEJDLG9CQUFVLEtBTE07QUFNaEIxRSxpQkFOZ0IscUJBTU47QUFDUmtFLGtCQUFNM0YsYUFBTixHQUFzQixLQUF0QjtBQUNBMkYsa0JBQU1uRixNQUFOO0FBQ0QsV0FUZTtBQVVoQjRGLGNBVmdCLGtCQVVUO0FBQ0xULGtCQUFNM0YsYUFBTixHQUFzQixLQUF0QjtBQUNBMkYsa0JBQU1uRixNQUFOO0FBQ0Q7QUFiZSxTQUFsQjtBQWVELE9BcEJEO0FBcUJEOzs7K0JBQ1VNLEUsRUFBSTtBQUFBOztBQUNiLDZCQUFTO0FBQ1BELGtCQUFVLEtBQUtwQyxTQUFMLENBQWVxQyxFQURsQjtBQUVQdUYscUJBQWEsS0FBS3ZHLFVBRlg7QUFHUHdHLDRCQUFvQnhGO0FBSGIsT0FBVCxFQUlHRyxJQUpILENBSVEsZUFBTztBQUNiLGdCQUFLc0YsYUFBTCxDQUFtQnJGLElBQUk1RCxJQUFKLENBQVNBLElBQVQsQ0FBY3dELEVBQWpDO0FBQ0QsT0FORDtBQU9EOzs7O0VBbE8rQjBGLGVBQUtDLEk7O2tCQUFsQjdKLEkiLCJmaWxlIjoiem9uZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCBTZWxlY3RNb2RhbCBmcm9tICcuLi9jb21wb25lbnRzL3NlbGVjdE1vZGFsJ1xuaW1wb3J0IEN1cnJlbnRNb2RhbCBmcm9tICcuLi9jb21wb25lbnRzL2NvbW1lbnRNb2RhbCdcbmltcG9ydCB7IHNob3dNc2csIHByZXZpZXdJbWFnZSB9IGZyb20gJy4uL3V0aWxzL2NvbW1vbidcbmltcG9ydCB7IGdldENpcmNsZUxpc3QsIGFkZENvbW1lbnQsIGpvaW5BY3Rpdml0eSwgZ2V0Q29tbWVudExpc3QgfSBmcm9tICcuLi9hcGkvem9uZSdcbmltcG9ydCB7IGFkZE9yZGVyLCBnZXRQYXltZW50UGFyYW1zIH0gZnJvbSAnLi4vYXBpL2ZpbmFuY2UnXG5pbXBvcnQgeyBnZXRBdXRoIH0gZnJvbSAnLi4vYXBpL2F1dGhvcml6ZSdcbmltcG9ydCB7IGNoZWNrU3R1ZGVudCB9IGZyb20gJy4uL2FwaS91c2VyJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWm9uZSBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Y+R546wJyxcbiAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IHRydWVcbiAgfVxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiQ3VycmVudE1vZGFsXCI6e1wic3VyZUJ0blRleHRcIjpcIuehruiupFwiLFwiY2FuY2VsQnRuVGV4dFwiOlwi5Y+W5raIXCIsXCJwbGFjZWhvbGRlclRleHRcIjpcIuivt+i+k+WFpeivhOiuuuWGheWuuVwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpmbGFnLnN5bmNcIjpcImNvbW1lbnRGbGFnXCIsXCJ2LWJpbmQ6Y29tbWVudElucHV0LnN5bmNcIjpcImNvbW1lbnRJbnB1dFwiLFwieG1sbnM6di1vblwiOlwiXCJ9LFwiU2VsZWN0TW9kYWxcIjp7XCJ2LWJpbmQ6ZmxhZy5zeW5jXCI6XCJzZWxlY3RGbGFnXCIsXCJ2LWJpbmQ6bGlzdC5zeW5jXCI6XCJwYXlNZW1iZXJMaXN0XCJ9fTtcclxuJGV2ZW50cyA9IHtcIkN1cnJlbnRNb2RhbFwiOntcInYtb246Y2FuY2VsXCI6XCJjb21tZW50Q2FuY2VsXCIsXCJ2LW9uOnN1cmVcIjpcImNvbW1lbnRTdXJlXCIsXCJ2LW9uOmlucHV0XCI6XCJiaW5kQ29tbWVudElucHV0XCJ9LFwiU2VsZWN0TW9kYWxcIjp7XCJ2LW9uOmNhbmNlbFwiOlwic2VsZWN0Q2FuY2VsXCIsXCJ2LW9uOnN1cmVcIjpcInNlbGVjdFN1cmVcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICBDdXJyZW50TW9kYWwsXG4gICAgU2VsZWN0TW9kYWxcbiAgfVxuICBkYXRhID0ge1xuICAgIG1lbnVMaXN0OiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICflrrbplb/lnIgnLFxuICAgICAgICB0eXBlOiAnem9uZScsXG4gICAgICAgIHNyYzogJy9pbWFnZXMvaWNvbi8yLmpwZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICfmlLbotLknLFxuICAgICAgICB0eXBlOiAnbW9uZXknLFxuICAgICAgICBzcmM6ICcvaW1hZ2VzL2ljb24vbW9uZXkuanBnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ+mAmuefpScsXG4gICAgICAgIHR5cGU6ICdub3RpY2UnLFxuICAgICAgICBzcmM6ICcvaW1hZ2VzL2ljb24vNC5qcGcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAn5rS75YqoJyxcbiAgICAgICAgdHlwZTogJ2FjdGl2aXR5JyxcbiAgICAgICAgc3JjOiAnL2ltYWdlcy9pY29uLzUuanBnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ+iusOi0picsXG4gICAgICAgIHR5cGU6ICdhY2NvdW50JyxcbiAgICAgICAgc3JjOiAnL2ltYWdlcy9pY29uL3Bob3Rvcy5qcGcnXG4gICAgICB9XG4gICAgXSxcbiAgICBjb21tZW50RmxhZzogZmFsc2UsXG4gICAgc2VsZWN0RmxhZzogZmFsc2UsXG4gICAgYWN0aXZlVHlwZTogJ2FsbCcsXG4gICAgc2V0RmxhZzogZmFsc2UsXG4gICAgcHVibGlzaEZsYWc6IGZhbHNlLFxuICAgIHR5cGU6IHtcbiAgICAgIGNpcmNsZXM6ICflrrbplb/lnIgnLFxuICAgICAgY29sbGVjdGlvbjogJ+aUtuasvicsXG4gICAgICBub3RpZnk6ICfpgJrnn6UnLFxuICAgICAgYWN0aXZpdHk6ICfmtLvliqgnLFxuICAgICAgYWNjb3VudDogJ+iusOi0pidcbiAgICB9LFxuICAgIHBuOiAxLFxuICAgIHBzOiAxMCxcbiAgICBsaXN0OiBbXSxcbiAgICBwYXlNZW1iZXJMaXN0OiBbXSxcbiAgICBjbGFzc0luZm86IG51bGwsXG4gICAgbWVtYmVySW5mbzogbnVsbCxcbiAgICBzY2hvb2xJbmZvOiBudWxsLFxuICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgIGxvYWRGaW5pc2hlZDogZmFsc2UsXG4gICAgY29tbWVudElucHV0OiAnJyxcbiAgICBjdXJyZW50UmVwbHlJZDogLTEsXG4gICAgY3VycmVudFJlcGx5Um9vdElkOiAtMSxcbiAgICBjdXJyZW50UmVwbHlUb0NvbW1lbnRJZDogLTEsXG4gICAgY3VycmVybnRKb2luQWNpdGl2eXRJZDogLTEsXG4gICAgY3VycmVybnRTdWJBY3Rpdml0eUlkOiBbXSxcbiAgICBjdXJyZW50Q29sbGVjdGlvbklkOiAtMSxcbiAgICBhdXRoOiB7XG4gICAgICBwcmVzaWRlbnQ6IGZhbHNlLFxuICAgICAgZmluYW5jZTogZmFsc2UsXG4gICAgICBhY3Rpdml0eTogZmFsc2UsXG4gICAgICBub3RpZnk6IGZhbHNlLFxuICAgICAgcGhvdG9zOiBmYWxzZSxcbiAgICAgIGNpcmNsZXM6IGZhbHNlXG4gICAgfSxcbiAgICBjb21tZW50UG46IDIsXG4gICAgY29tbWVudFBzOiA2LFxuICAgIGNvbW1lbnRPZmZzZXQ6IDYsXG4gICAgY29tbWVudExvYWRGaW5pc2hlZDogZmFsc2UsXG4gICAgbWVtYmVyTGlzdDogW10sXG4gICAgc3R1ZGVudElkczogW10sXG4gICAgZmlyc3RJbml0OiB0cnVlLFxuICAgIHBheW1lbnRMb2NrZWQ6IGZhbHNlXG4gIH1cbiAgd2F0Y2ggPSB7XG4gICAgY2xhc3NJbmZvKG5ld1ZhbCwgb2xkVmFsKSB7XG4gICAgICAvLyDliIfmjaLkuobnj63nuqfkuYvlkI7mlbDmja7opoHmm7TmlrBcbiAgICAgIGlmIChvbGRWYWwgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5yZXNldERhdGEoKVxuICAgICAgICB0aGlzLmdldEF1dGhMaXN0KClcbiAgICAgICAgdGhpcy5nZXRab25lTGlzdCgpXG4gICAgICB9XG4gICAgfSxcbiAgICBjdXJyZW50Sm9pbkFjdGl2aXR5SWQobmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgIGlmIChuZXdWYWwgPiAwKSB7XG4gICAgICAgIHRoaXMuY3VycmVybnRTdWJBY3Rpdml0eUlkID0gW11cbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXNldERhdGEoKSB7XG4gICAgdGhpcy5jb21tZW50TG9hZEZpbmlzaGVkID0gZmFsc2VcbiAgICB0aGlzLmNvbW1lbnRQbiA9IDJcbiAgICB0aGlzLmNvbW1lbnRQcyA9IDZcbiAgICB0aGlzLnN0dWRlbnRJZHMgPSBbXVxuICAgIHRoaXMucGF5bWVudExvY2tlZCA9IGZhbHNlXG4gICAgdGhpcy5wbiA9IDFcbiAgICB0aGlzLmxpc3QgPSBbXVxuICAgIHRoaXMuJGFwcGx5KClcbiAgfVxuICBvblB1bGxEb3duUmVmcmVzaCgpIHtcbiAgICB0aGlzLnJlc2V0RGF0YSgpXG4gICAgdGhpcy5nZXRab25lTGlzdCgpXG4gIH1cbiAgb25SZWFjaEJvdHRvbSgpIHtcbiAgICBpZiAodGhpcy5sb2FkaW5nIHx8IHRoaXMubG9hZEZpbmlzaGVkKSByZXR1cm5cbiAgICB0aGlzLmdldFpvbmVMaXN0KClcbiAgfVxuICBvblNob3coKSB7XG4gICAgdGhpcy5jdXJyZXJudEpvaW5BY2l0aXZ5dElkID0gLTFcbiAgICB0aGlzLmN1cnJlcm50U3ViQWN0aXZpdHlJZCA9IFtdXG4gICAgdGhpcy5jbGFzc0luZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnY2xhc3NJbmZvJylcbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgb25Mb2FkKCkge1xuICAgIGlmICghdGhpcy5jaGVja0RhdGFFeGlzdCgnbWVtYmVySW5mbycpKSB7XG4gICAgICB3eC5yZUxhdW5jaCh7XG4gICAgICAgIHVybDogJ2xvZ2luJ1xuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jbGFzc0luZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnY2xhc3NJbmZvJylcbiAgICAgIHRoaXMuY2xhc3NJbmZvICYmIHRoaXMuZ2V0QXV0aExpc3QoKVxuICAgICAgdGhpcy5tZW1iZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nKVxuICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckRhdGEgPSB0aGlzLm1lbWJlckluZm9cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIHRoaXMuZ2V0Wm9uZUxpc3QoKVxuICAgIH1cbiAgfVxuICBnZXRBdXRoTGlzdCgpIHtcbiAgICBnZXRBdXRoKHtcbiAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZFxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHRoaXMuY2hlY2tBdXRoKHJlcy5kYXRhLmRhdGEpXG4gICAgfSlcbiAgfVxuICBmb3JtYXRBbGxBdXRoKG9iaikge1xuICAgIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgb2JqW2tleV0gPSB0cnVlXG4gICAgfSlcbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgZm9ybWF0U2luZ2xlQXV0aChuYW1lKSB7XG4gICAgdGhpcy5hdXRoW25hbWVdID0gdHJ1ZVxuICAgIHRoaXMuJGFwcGx5KClcbiAgfVxuICBjaGVja0F1dGgobGlzdCkge1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBsaXN0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBsZXQge2NvZGUsIGlzX2F1dGg6IGlzQXV0aH0gPSBsaXN0W2ldXG4gICAgICBpZiAoY29kZSA9PT0gJ3ByZXNpZGVudCcgJiYgaXNBdXRoKSB7XG4gICAgICAgIHRoaXMuZm9ybWF0QWxsQXV0aCh0aGlzLmF1dGgpXG4gICAgICAgIGJyZWFrXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpc0F1dGggJiYgdGhpcy5mb3JtYXRTaW5nbGVBdXRoKGNvZGUpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIGNoZWNrRGF0YUV4aXN0KGtleSkge1xuICAgIGlmICh3eC5nZXRTdG9yYWdlU3luYyhrZXkpKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICBnZXRab25lTGlzdCgpIHtcbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlXG4gICAgdGhpcy4kYXBwbHkoKVxuICAgIGNvbnN0IGlkID0gdGhpcy5jbGFzc0luZm8uaWRcbiAgICBnZXRDaXJjbGVMaXN0KHtcbiAgICAgIGNsYXNzX2lkOiBpZCxcbiAgICAgIHNlZV90eXBlOiBpZCA/ICcnIDogJ2FsbCcsXG4gICAgICB0eXBlOiB0aGlzLmFjdGl2ZVR5cGUsXG4gICAgICBwbjogdGhpcy5wbixcbiAgICAgIHBzOiB0aGlzLnBzLFxuICAgICAgY29tbWVudF9jb3VudDogM1xuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIGxldCB7IGxpc3QgfSA9IHJlcy5kYXRhXG4gICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZVxuICAgICAgdGhpcy5wbisrXG4gICAgICBpZiAobGlzdC5sZW5ndGggPCB0aGlzLnBzKSB7XG4gICAgICAgIHRoaXMubG9hZEZpbmlzaGVkID0gdHJ1ZVxuICAgICAgfVxuICAgICAgdGhpcy5saXN0ID0gWy4uLnRoaXMubGlzdCwgLi4ubGlzdF1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9KVxuICB9XG4gIHBheW1lbnRQYXJhbXMoaWQpIHtcbiAgICBnZXRQYXltZW50UGFyYW1zKHtcbiAgICAgIG9yZGVyX2lkOiBpZFxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIGxldCBfdGhpcyA9IHRoaXNcbiAgICAgIGxldCBkYXRhID0gcmVzLmRhdGEucGF5bWVudF9wYXJhbXNcbiAgICAgIHd4LnJlcXVlc3RQYXltZW50KHtcbiAgICAgICAgdGltZVN0YW1wOiBTdHJpbmcoZGF0YS50aW1lU3RhbXApLFxuICAgICAgICBub25jZVN0cjogZGF0YS5ub25jZVN0cixcbiAgICAgICAgcGFja2FnZTogZGF0YS5wYWNrYWdlLFxuICAgICAgICBwYXlTaWduOiBkYXRhLnBheVNpZ24sXG4gICAgICAgIHNpZ25UeXBlOiAnTUQ1JyxcbiAgICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgICBfdGhpcy5wYXltZW50TG9ja2VkID0gZmFsc2VcbiAgICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgICB9LFxuICAgICAgICBmYWlsKCkge1xuICAgICAgICAgIF90aGlzLnBheW1lbnRMb2NrZWQgPSBmYWxzZVxuICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuICBhZGRUb09yZGVyKGlkKSB7XG4gICAgYWRkT3JkZXIoe1xuICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgc3R1ZGVudF9pZHM6IHRoaXMuc3R1ZGVudElkcyxcbiAgICAgIGNvbGxlY3Rpb25faXRlbV9pZDogaWRcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICB0aGlzLnBheW1lbnRQYXJhbXMocmVzLmRhdGEuZGF0YS5pZClcbiAgICB9KVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgcGF5KG1vbWVudElkLCBjb2xsZWN0aW9uSWQpIHtcbiAgICAgIGlmICh0aGlzLnBheW1lbnRMb2NrZWQpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB0aGlzLnBheW1lbnRMb2NrZWQgPSB0cnVlXG4gICAgICBjaGVja1N0dWRlbnQoe1xuICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXG4gICAgICAgIG1vbWVudF9pZDogbW9tZW50SWQsXG4gICAgICAgIGlzX3BheTogMFxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICB0aGlzLnBheU1lbWJlckxpc3QgPSByZXMuZGF0YS5saXN0XG4gICAgICAgIGlmICghdGhpcy5wYXlNZW1iZXJMaXN0Lmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMucGF5bWVudExvY2tlZCA9IGZhbHNlXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgIHNob3dNc2coJ+ivt+WLv+mHjeWkjee8tOi0uScpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucGF5TWVtYmVyTGlzdC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RGbGFnID0gdHJ1ZVxuICAgICAgICAgIHRoaXMuY3VycmVudENvbGxlY3Rpb25JZCA9IGNvbGxlY3Rpb25JZFxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnN0dWRlbnRJZHMgPSBbXVxuICAgICAgICAgIHRoaXMuc3R1ZGVudElkcy5wdXNoKHRoaXMucGF5TWVtYmVyTGlzdFswXS5pZClcbiAgICAgICAgICB0aGlzLmFkZFRvT3JkZXIoY29sbGVjdGlvbklkKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgc3VibWl0Sm9pbkFjdGl2aXR5KCkge1xuICAgICAgam9pbkFjdGl2aXR5KHtcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgICBhY3Rpdml0eV9pdGVtX2lkOiB0aGlzLmN1cnJlcm50U3ViQWN0aXZpdHlJZCxcbiAgICAgICAgYWN0aXZpdHlfaWQ6IHRoaXMuY3VycmVybnRKb2luQWNpdGl2eXRJZFxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgIHNob3dNc2coJ+aPkOS6pOaIkOWKnycpXG4gICAgICAgICAgdGhpcy5jdXJyZXJudFN1YkFjdGl2aXR5SWQgPSBbXVxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIGpvaW5BY3Rpdml0eShpZCwgc3ViSWQsIGxpc3RJbmRleCwgYWN0aXZpdHlJbmRleCkge1xuICAgICAgaWYgKCF0aGlzLmNsYXNzSW5mbykge1xuICAgICAgICBzaG93TXNnKCfor7flhYjpgInmi6nnj63nuqcnKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHRoaXMuY3VycmVybnRKb2luQWNpdGl2eXRJZCA9IGlkXG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuY3VycmVybnRTdWJBY3Rpdml0eUlkLmluZGV4T2Yoc3ViSWQpXG4gICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICB0aGlzLmN1cnJlcm50U3ViQWN0aXZpdHlJZC5zcGxpY2UoaW5kZXgsIDEpXG4gICAgICAgIHRoaXMubGlzdFtsaXN0SW5kZXhdLmluZm8uaXRlbVthY3Rpdml0eUluZGV4XS5jaGVja2VkID0gZmFsc2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY3VycmVybnRTdWJBY3Rpdml0eUlkLnB1c2goc3ViSWQpXG4gICAgICAgIHRoaXMubGlzdFtsaXN0SW5kZXhdLmluZm8uaXRlbVthY3Rpdml0eUluZGV4XS5jaGVja2VkID0gdHJ1ZVxuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgbG9hZE1vcmVDb21tZW50KG1vbWVudElkLCBpZHgpIHtcbiAgICAgIGdldENvbW1lbnRMaXN0KHtcbiAgICAgICAgbW9tZW50X2lkOiBtb21lbnRJZCxcbiAgICAgICAgcHM6IHRoaXMuY29tbWVudFBzLFxuICAgICAgICBwbjogdGhpcy5jb21tZW50UG4sXG4gICAgICAgIG9mZnNldDogdGhpcy5jb21tZW50T2Zmc2V0XG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgbGV0IHJlc3VsdExpc3QgPSByZXMuZGF0YS5saXN0XG4gICAgICAgICAgaWYgKHJlc3VsdExpc3QubGVuZ3RoIDwgdGhpcy5jb21tZW50UHMpIHtcbiAgICAgICAgICAgIHRoaXMuY29tbWVudExvYWRGaW5pc2hlZCA9IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgICAgbGV0IHtsaXN0fSA9IHRoaXMubGlzdFtpZHhdLmNvbW1lbnRfbGlzdFxuICAgICAgICAgIGxpc3QgPSBbLi4ubGlzdCwgLi4ucmVzdWx0TGlzdF1cbiAgICAgICAgICB0aGlzLmxpc3RbaWR4XS5jb21tZW50X2xpc3QubGlzdCA9IGxpc3RcbiAgICAgICAgICB0aGlzLmNvbW1lbnRQbisrXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgYWRkQ29tbWVudCh0eXBlLCBpZCwgcm9vdElkLCB0b0NvbW1lbnRJZCwgbmFtZSkge1xuICAgICAgaWYgKHRvQ29tbWVudElkID09PSB0aGlzLm1lbWJlckluZm8ubWVtYmVyX2lkKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+S4jeimgeWbnuWkjeiHquW3sScpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLmNsYXNzSW5mbykge1xuICAgICAgICBzaG93TXNnKCfor7flhYjpgInmi6nnj63nuqcnKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHRoaXMuY29tbWVudEZsYWcgPSB0cnVlXG4gICAgICB0aGlzLmN1cnJlbnRSZXBseUlkID0gaWRcbiAgICAgIHRoaXMuY3VycmVudFJlcGx5Um9vdElkID0gdHlwZSA9PT0gJ2FkZCcgPyAwIDogcm9vdElkXG4gICAgICBpZiAobmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuY29tbWVudElucHV0ID0gYEAke25hbWV9OmBcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29tbWVudElucHV0ID0gJydcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGJpbmRDb21tZW50SW5wdXQgKHZhbHVlKSB7XG4gICAgICB0aGlzLmNvbW1lbnRJbnB1dCA9IHZhbHVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBjb21tZW50U3VyZSAoKSB7XG4gICAgICB0aGlzLmNvbW1lbnRGbGFnID0gZmFsc2VcbiAgICAgIGFkZENvbW1lbnQoe1xuICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXG4gICAgICAgIG1vbWVudF9pZDogdGhpcy5jdXJyZW50UmVwbHlJZCxcbiAgICAgICAgY29udGVudDogdGhpcy5jdXJyZW50UmVwbHlJZCA+IDAgPyB0aGlzLmNvbW1lbnRJbnB1dC5yZXBsYWNlKC9eQC4rOi8sICcnKSA6IHRoaXMuY29tbWVudElucHV0LFxuICAgICAgICByb290X2lkOiB0aGlzLmN1cnJlbnRSZXBseVJvb3RJZCxcbiAgICAgICAgdG9fY29tbWVudF9pZDogdGhpcy5jdXJyZW50UmVwbHlSb290SWRcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICB0aGlzLmNvbW1lbnRJbnB1dCA9ICcnXG4gICAgICAgICAgdGhpcy5yZXNldERhdGEoKVxuICAgICAgICAgIHRoaXMuZ2V0Wm9uZUxpc3QoKVxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIGp1bXBQdWJsaXNoKHZhbHVlKSB7XG4gICAgICBsZXQgdXJsID0gdmFsdWUgPT09ICdhY2NvdW50JyA/ICdyZWNvcmRDYXNoZmxvdycgOiBgcHVibGlzaD90eXBlPSR7dmFsdWV9YFxuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogdXJsXG4gICAgICB9KVxuICAgIH0sXG4gICAgY29tbWVudENhbmNlbCAoKSB7XG4gICAgICB0aGlzLmNvbW1lbnRGbGFnID0gZmFsc2VcbiAgICAgIHRoaXMuY29tbWVudElucHV0ID0gJydcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGp1bXBQYWdlIChwYWdlTmFtZSwgdHlwZSkge1xuICAgICAgdGhpcy5wdWJsaXNoRmxhZyA9IGZhbHNlXG4gICAgICB0aGlzLnNldEZsYWcgPSBmYWxzZVxuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogYCR7cGFnZU5hbWV9P3R5cGU9JHt0eXBlfWBcbiAgICAgIH0pXG4gICAgfSxcbiAgICB0b2dnbGVNZW51ICh0eXBlKSB7XG4gICAgICBpZiAoIXRoaXMuY2xhc3NJbmZvKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+mAiee7keWumuePree6pycsIDMwMDApXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdGhpc1t0eXBlXSA9ICF0aGlzW3R5cGVdXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBjbG9zZVRvZ2dsZSAoKSB7XG4gICAgICB0aGlzLnNldEZsYWcgPSBmYWxzZVxuICAgICAgdGhpcy5wdWJsaXNoRmxhZyA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBwcmV2aWV3KGltZywgaW1nTGlzdCkge1xuICAgICAgcHJldmlld0ltYWdlKGltZywgaW1nTGlzdClcbiAgICB9LFxuICAgIHNlbGVjdENhbmNlbCgpIHtcbiAgICAgIHRoaXMuc2VsZWN0RmxhZyA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBzZWxlY3RTdXJlKHZhbHVlKSB7XG4gICAgICBpZiAoIXZhbHVlLmxlbmd0aCkge1xuICAgICAgICBzaG93TXNnKCfor7fpgInmi6knKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGNvbnN0IHZhbCA9IHZhbHVlXG4gICAgICB0aGlzLnN0dWRlbnRJZHMgPSBbLi4udmFsXVxuICAgICAgdGhpcy5zZWxlY3RGbGFnID0gZmFsc2VcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIHRoaXMuYWRkVG9PcmRlcih0aGlzLmN1cnJlbnRDb2xsZWN0aW9uSWQpXG4gICAgfVxuICB9XG59XG4iXX0=