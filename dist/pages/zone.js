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
        var _this4 = this;

        this.commentFlag = false;
        (0, _zone.addComment)({
          class_id: this.classInfo.id,
          moment_id: this.currentReplyId,
          content: this.currentReplyId > 0 ? this.commentInput.replace(/^@.+:/, '') : this.commentInput,
          root_id: this.currentReplyRootId,
          to_comment_id: this.currentReplyRootId
        }).then(function (res) {
          if (res.data.success) {
            _this4.commentInput = '';
            _this4.resetData();
            _this4.getZoneList();
            _this4.$apply();
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
      var _this5 = this;

      (0, _authorize.getAuth)({
        class_id: this.classInfo.id
      }).then(function (res) {
        _this5.checkAuth(res.data.data);
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
      var _this6 = this;

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

        _this6.loading = false;
        _this6.pn++;
        if (list.length < _this6.ps) {
          _this6.loadFinished = true;
        }
        _this6.list = [].concat(_toConsumableArray(_this6.list), _toConsumableArray(list));
        _this6.$apply();
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
      var _this7 = this;

      (0, _finance.addOrder)({
        class_id: this.classInfo.id,
        student_ids: this.studentIds,
        collection_item_id: id
      }).then(function (res) {
        _this7.paymentParams(res.data.data.id);
      });
    }
  }]);

  return Zone;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Zone , 'pages/zone'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInpvbmUuanMiXSwibmFtZXMiOlsiWm9uZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJDdXJyZW50TW9kYWwiLCJTZWxlY3RNb2RhbCIsImRhdGEiLCJtZW51TGlzdCIsInRleHQiLCJ0eXBlIiwic3JjIiwiY29tbWVudEZsYWciLCJzZWxlY3RGbGFnIiwiYWN0aXZlVHlwZSIsInNldEZsYWciLCJwdWJsaXNoRmxhZyIsImNpcmNsZXMiLCJjb2xsZWN0aW9uIiwibm90aWZ5IiwiYWN0aXZpdHkiLCJhY2NvdW50IiwicG4iLCJwcyIsImxpc3QiLCJwYXlNZW1iZXJMaXN0IiwiY2xhc3NJbmZvIiwibWVtYmVySW5mbyIsInNjaG9vbEluZm8iLCJsb2FkaW5nIiwibG9hZEZpbmlzaGVkIiwiY29tbWVudElucHV0IiwiY3VycmVudFJlcGx5SWQiLCJjdXJyZW50UmVwbHlSb290SWQiLCJjdXJyZW50UmVwbHlUb0NvbW1lbnRJZCIsImN1cnJlcm50Sm9pbkFjaXRpdnl0SWQiLCJjdXJyZXJudFN1YkFjdGl2aXR5SWQiLCJjdXJyZW50Q29sbGVjdGlvbklkIiwiYXV0aCIsInByZXNpZGVudCIsImZpbmFuY2UiLCJwaG90b3MiLCJtZW1iZXJMaXN0Iiwic3R1ZGVudElkcyIsImZpcnN0SW5pdCIsIndhdGNoIiwibmV3VmFsIiwib2xkVmFsIiwicmVzZXREYXRhIiwiZ2V0QXV0aExpc3QiLCJnZXRab25lTGlzdCIsImN1cnJlbnRKb2luQWN0aXZpdHlJZCIsIiRhcHBseSIsIm1ldGhvZHMiLCJwYXkiLCJtb21lbnRJZCIsImNvbGxlY3Rpb25JZCIsImNsYXNzX2lkIiwiaWQiLCJtb21lbnRfaWQiLCJpc19wYXkiLCJ0aGVuIiwicmVzIiwibGVuZ3RoIiwicHVzaCIsImFkZFRvT3JkZXIiLCJzdWJtaXRKb2luQWN0aXZpdHkiLCJhY3Rpdml0eV9pdGVtX2lkIiwiYWN0aXZpdHlfaWQiLCJzdWNjZXNzIiwiam9pbkFjdGl2aXR5Iiwic3ViSWQiLCJsaXN0SW5kZXgiLCJhY3Rpdml0eUluZGV4IiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIiwiaW5mbyIsIml0ZW0iLCJjaGVja2VkIiwiYWRkQ29tbWVudCIsInJvb3RJZCIsInRvQ29tbWVudElkIiwibmFtZSIsInVuZGVmaW5lZCIsImJpbmRDb21tZW50SW5wdXQiLCJ2YWx1ZSIsImNvbW1lbnRTdXJlIiwiY29udGVudCIsInJlcGxhY2UiLCJyb290X2lkIiwidG9fY29tbWVudF9pZCIsImNvbW1lbnRDYW5jZWwiLCJmaWx0ZXIiLCJqdW1wUGFnZSIsInBhZ2VOYW1lIiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwidG9nZ2xlTWVudSIsImNsb3NlVG9nZ2xlIiwicHJldmlldyIsImltZyIsImltZ0xpc3QiLCJzZWxlY3RDYW5jZWwiLCJzZWxlY3RTdXJlIiwidmFsIiwiZ2V0U3RvcmFnZVN5bmMiLCJjaGVja0RhdGFFeGlzdCIsInJlTGF1bmNoIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJ1c2VyRGF0YSIsImNoZWNrQXV0aCIsIm9iaiIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiaSIsImxlbiIsImNvZGUiLCJpc0F1dGgiLCJpc19hdXRoIiwiZm9ybWF0QWxsQXV0aCIsImZvcm1hdFNpbmdsZUF1dGgiLCJzZWVfdHlwZSIsImNvbW1lbnRfY291bnQiLCJvcmRlcl9pZCIsInBheW1lbnRfcGFyYW1zIiwicmVxdWVzdFBheW1lbnQiLCJ0aW1lU3RhbXAiLCJTdHJpbmciLCJub25jZVN0ciIsInBhY2thZ2UiLCJwYXlTaWduIiwic2lnblR5cGUiLCJjb25zb2xlIiwibG9nIiwic3R1ZGVudF9pZHMiLCJjb2xsZWN0aW9uX2l0ZW1faWQiLCJwYXltZW50UGFyYW1zIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFD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RCxFQUFqQztBQUNELE9BTkQ7QUFPRDs7OztFQW5OK0JvRixlQUFLQyxJOztrQkFBbEJsSixJIiwiZmlsZSI6InpvbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgU2VsZWN0TW9kYWwgZnJvbSAnLi4vY29tcG9uZW50cy9zZWxlY3RNb2RhbCdcbmltcG9ydCBDdXJyZW50TW9kYWwgZnJvbSAnLi4vY29tcG9uZW50cy9jb21tZW50TW9kYWwnXG5pbXBvcnQgeyBzaG93TXNnLCBwcmV2aWV3SW1hZ2UgfSBmcm9tICcuLi91dGlscy9jb21tb24nXG5pbXBvcnQgeyBnZXRDaXJjbGVMaXN0LCBhZGRDb21tZW50LCBqb2luQWN0aXZpdHkgfSBmcm9tICcuLi9hcGkvem9uZSdcbmltcG9ydCB7IGFkZE9yZGVyLCBnZXRQYXltZW50UGFyYW1zIH0gZnJvbSAnLi4vYXBpL2ZpbmFuY2UnXG5pbXBvcnQgeyBnZXRBdXRoIH0gZnJvbSAnLi4vYXBpL2F1dGhvcml6ZSdcbmltcG9ydCB7IGNoZWNrU3R1ZGVudCB9IGZyb20gJy4uL2FwaS91c2VyJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWm9uZSBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Y+R546wJyxcbiAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IHRydWVcbiAgfVxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiQ3VycmVudE1vZGFsXCI6e1wic3VyZUJ0blRleHRcIjpcIuehruiupFwiLFwiY2FuY2VsQnRuVGV4dFwiOlwi5Y+W5raIXCIsXCJwbGFjZWhvbGRlclRleHRcIjpcIuivt+i+k+WFpeivhOiuuuWGheWuuVwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpmbGFnLnN5bmNcIjpcImNvbW1lbnRGbGFnXCIsXCJ2LWJpbmQ6Y29tbWVudElucHV0LnN5bmNcIjpcImNvbW1lbnRJbnB1dFwiLFwieG1sbnM6di1vblwiOlwiXCJ9LFwiU2VsZWN0TW9kYWxcIjp7XCJ2LWJpbmQ6ZmxhZy5zeW5jXCI6XCJzZWxlY3RGbGFnXCIsXCJ2LWJpbmQ6bGlzdC5zeW5jXCI6XCJwYXlNZW1iZXJMaXN0XCJ9fTtcclxuJGV2ZW50cyA9IHtcIkN1cnJlbnRNb2RhbFwiOntcInYtb246Y2FuY2VsXCI6XCJjb21tZW50Q2FuY2VsXCIsXCJ2LW9uOnN1cmVcIjpcImNvbW1lbnRTdXJlXCIsXCJ2LW9uOmlucHV0XCI6XCJiaW5kQ29tbWVudElucHV0XCJ9LFwiU2VsZWN0TW9kYWxcIjp7XCJ2LW9uOmNhbmNlbFwiOlwic2VsZWN0Q2FuY2VsXCIsXCJ2LW9uOnN1cmVcIjpcInNlbGVjdFN1cmVcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICBDdXJyZW50TW9kYWwsXG4gICAgU2VsZWN0TW9kYWxcbiAgfVxuICBkYXRhID0ge1xuICAgIG1lbnVMaXN0OiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICflrrbplb/lnIgnLFxuICAgICAgICB0eXBlOiAnY2lyY2xlcycsXG4gICAgICAgIHNyYzogJy9pbWFnZXMvaWNvbi8yLmpwZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICfmlLbotLknLFxuICAgICAgICB0eXBlOiAnY29sbGVjdGlvbicsXG4gICAgICAgIHNyYzogJy9pbWFnZXMvaWNvbi9tb25leS5qcGcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAn6YCa55+lJyxcbiAgICAgICAgdHlwZTogJ25vdGlmeScsXG4gICAgICAgIHNyYzogJy9pbWFnZXMvaWNvbi80LmpwZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICfmtLvliqgnLFxuICAgICAgICB0eXBlOiAnYWN0aXZpdHknLFxuICAgICAgICBzcmM6ICcvaW1hZ2VzL2ljb24vNS5qcGcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAn6K6w6LSmJyxcbiAgICAgICAgdHlwZTogJ2FjY291bnQnLFxuICAgICAgICBzcmM6ICcvaW1hZ2VzL2ljb24vcGhvdG9zLmpwZydcbiAgICAgIH1cbiAgICBdLFxuICAgIGNvbW1lbnRGbGFnOiBmYWxzZSxcbiAgICBzZWxlY3RGbGFnOiBmYWxzZSxcbiAgICBhY3RpdmVUeXBlOiAnY2lyY2xlcycsXG4gICAgc2V0RmxhZzogZmFsc2UsXG4gICAgcHVibGlzaEZsYWc6IGZhbHNlLFxuICAgIHR5cGU6IHtcbiAgICAgIGNpcmNsZXM6ICflrrbplb/lnIgnLFxuICAgICAgY29sbGVjdGlvbjogJ+aUtuasvicsXG4gICAgICBub3RpZnk6ICfpgJrnn6UnLFxuICAgICAgYWN0aXZpdHk6ICfmtLvliqgnLFxuICAgICAgYWNjb3VudDogJ+iusOi0pidcbiAgICB9LFxuICAgIHBuOiAxLFxuICAgIHBzOiAxMCxcbiAgICBsaXN0OiBbXSxcbiAgICBwYXlNZW1iZXJMaXN0OiBbXSxcbiAgICBjbGFzc0luZm86IG51bGwsXG4gICAgbWVtYmVySW5mbzogbnVsbCxcbiAgICBzY2hvb2xJbmZvOiBudWxsLFxuICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgIGxvYWRGaW5pc2hlZDogZmFsc2UsXG4gICAgY29tbWVudElucHV0OiAnJyxcbiAgICBjdXJyZW50UmVwbHlJZDogLTEsXG4gICAgY3VycmVudFJlcGx5Um9vdElkOiAtMSxcbiAgICBjdXJyZW50UmVwbHlUb0NvbW1lbnRJZDogLTEsXG4gICAgY3VycmVybnRKb2luQWNpdGl2eXRJZDogLTEsXG4gICAgY3VycmVybnRTdWJBY3Rpdml0eUlkOiBbXSxcbiAgICBjdXJyZW50Q29sbGVjdGlvbklkOiAtMSxcbiAgICBhdXRoOiB7XG4gICAgICBwcmVzaWRlbnQ6IGZhbHNlLFxuICAgICAgZmluYW5jZTogZmFsc2UsXG4gICAgICBhY3Rpdml0eTogZmFsc2UsXG4gICAgICBub3RpZnk6IGZhbHNlLFxuICAgICAgcGhvdG9zOiBmYWxzZSxcbiAgICAgIGNpcmNsZXM6IGZhbHNlXG4gICAgfSxcbiAgICBtZW1iZXJMaXN0OiBbXSxcbiAgICBzdHVkZW50SWRzOiBbXSxcbiAgICBmaXJzdEluaXQ6IHRydWVcbiAgfVxuICB3YXRjaCA9IHtcbiAgICBjbGFzc0luZm8obmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgIC8vIOWIh+aNouS6huePree6p+S5i+WQjuaVsOaNruimgeabtOaWsFxuICAgICAgaWYgKG9sZFZhbCAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLnJlc2V0RGF0YSgpXG4gICAgICAgIHRoaXMuZ2V0QXV0aExpc3QoKVxuICAgICAgICB0aGlzLmdldFpvbmVMaXN0KClcbiAgICAgIH1cbiAgICB9LFxuICAgIGN1cnJlbnRKb2luQWN0aXZpdHlJZChuZXdWYWwsIG9sZFZhbCkge1xuICAgICAgaWYgKG5ld1ZhbCA+IDApIHtcbiAgICAgICAgdGhpcy5jdXJyZXJudFN1YkFjdGl2aXR5SWQgPSBbXVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJlc2V0RGF0YSgpIHtcbiAgICB0aGlzLnN0dWRlbnRJZHMgPSBbXVxuICAgIHRoaXMucG4gPSAxXG4gICAgdGhpcy5saXN0ID0gW11cbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgb25QdWxsRG93blJlZnJlc2goKSB7XG4gICAgdGhpcy5yZXNldERhdGEoKVxuICAgIHRoaXMuZ2V0Wm9uZUxpc3QoKVxuICB9XG4gIG9uUmVhY2hCb3R0b20oKSB7XG4gICAgaWYgKHRoaXMubG9hZGluZyB8fCB0aGlzLmxvYWRGaW5pc2hlZCkgcmV0dXJuXG4gICAgdGhpcy5nZXRab25lTGlzdCgpXG4gIH1cbiAgb25TaG93KCkge1xuICAgIHRoaXMuY3VycmVybnRKb2luQWNpdGl2eXRJZCA9IC0xXG4gICAgdGhpcy5jdXJyZXJudFN1YkFjdGl2aXR5SWQgPSBbXVxuICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIG9uTG9hZCgpIHtcbiAgICBpZiAoIXRoaXMuY2hlY2tEYXRhRXhpc3QoJ21lbWJlckluZm8nKSkge1xuICAgICAgd3gucmVMYXVuY2goe1xuICAgICAgICB1cmw6ICdsb2dpbidcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXG4gICAgICB0aGlzLmNsYXNzSW5mbyAmJiB0aGlzLmdldEF1dGhMaXN0KClcbiAgICAgIHRoaXMubWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcbiAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJEYXRhID0gdGhpcy5tZW1iZXJJbmZvXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB0aGlzLmdldFpvbmVMaXN0KClcbiAgICB9XG4gIH1cbiAgZ2V0QXV0aExpc3QoKSB7XG4gICAgZ2V0QXV0aCh7XG4gICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWRcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICB0aGlzLmNoZWNrQXV0aChyZXMuZGF0YS5kYXRhKVxuICAgIH0pXG4gIH1cbiAgZm9ybWF0QWxsQXV0aChvYmopIHtcbiAgICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIG9ialtrZXldID0gdHJ1ZVxuICAgIH0pXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIGZvcm1hdFNpbmdsZUF1dGgobmFtZSkge1xuICAgIHRoaXMuYXV0aFtuYW1lXSA9IHRydWVcbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgY2hlY2tBdXRoKGxpc3QpIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gbGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgbGV0IHtjb2RlLCBpc19hdXRoOiBpc0F1dGh9ID0gbGlzdFtpXVxuICAgICAgaWYgKGNvZGUgPT09ICdwcmVzaWRlbnQnICYmIGlzQXV0aCkge1xuICAgICAgICB0aGlzLmZvcm1hdEFsbEF1dGgodGhpcy5hdXRoKVxuICAgICAgICBicmVha1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXNBdXRoICYmIHRoaXMuZm9ybWF0U2luZ2xlQXV0aChjb2RlKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBjaGVja0RhdGFFeGlzdChrZXkpIHtcbiAgICBpZiAod3guZ2V0U3RvcmFnZVN5bmMoa2V5KSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgZ2V0Wm9uZUxpc3QoKSB7XG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZVxuICAgIHRoaXMuJGFwcGx5KClcbiAgICBjb25zdCBpZCA9IHRoaXMuY2xhc3NJbmZvLmlkXG4gICAgZ2V0Q2lyY2xlTGlzdCh7XG4gICAgICBjbGFzc19pZDogaWQsXG4gICAgICBzZWVfdHlwZTogaWQgPyAnJyA6ICdhbGwnLFxuICAgICAgdHlwZTogdGhpcy5hY3RpdmVUeXBlLFxuICAgICAgcG46IHRoaXMucG4sXG4gICAgICBwczogdGhpcy5wcyxcbiAgICAgIGNvbW1lbnRfY291bnQ6IDNcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgeyBsaXN0IH0gPSByZXMuZGF0YVxuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2VcbiAgICAgIHRoaXMucG4rK1xuICAgICAgaWYgKGxpc3QubGVuZ3RoIDwgdGhpcy5wcykge1xuICAgICAgICB0aGlzLmxvYWRGaW5pc2hlZCA9IHRydWVcbiAgICAgIH1cbiAgICAgIHRoaXMubGlzdCA9IFsuLi50aGlzLmxpc3QsIC4uLmxpc3RdXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSlcbiAgfVxuICBwYXltZW50UGFyYW1zKGlkKSB7XG4gICAgZ2V0UGF5bWVudFBhcmFtcyh7XG4gICAgICBvcmRlcl9pZDogaWRcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhLnBheW1lbnRfcGFyYW1zXG4gICAgICB3eC5yZXF1ZXN0UGF5bWVudCh7XG4gICAgICAgIHRpbWVTdGFtcDogU3RyaW5nKGRhdGEudGltZVN0YW1wKSxcbiAgICAgICAgbm9uY2VTdHI6IGRhdGEubm9uY2VTdHIsXG4gICAgICAgIHBhY2thZ2U6IGRhdGEucGFja2FnZSxcbiAgICAgICAgcGF5U2lnbjogZGF0YS5wYXlTaWduLFxuICAgICAgICBzaWduVHlwZTogJ01ENScsXG4gICAgICAgIHN1Y2Nlc3MoKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ+aIkOWKn+S6hicpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuICBhZGRUb09yZGVyKGlkKSB7XG4gICAgYWRkT3JkZXIoe1xuICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgc3R1ZGVudF9pZHM6IHRoaXMuc3R1ZGVudElkcyxcbiAgICAgIGNvbGxlY3Rpb25faXRlbV9pZDogaWRcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICB0aGlzLnBheW1lbnRQYXJhbXMocmVzLmRhdGEuZGF0YS5pZClcbiAgICB9KVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgcGF5KG1vbWVudElkLCBjb2xsZWN0aW9uSWQpIHtcbiAgICAgIGNoZWNrU3R1ZGVudCh7XG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgICAgbW9tZW50X2lkOiBtb21lbnRJZCxcbiAgICAgICAgaXNfcGF5OiAwXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIHRoaXMucGF5TWVtYmVyTGlzdCA9IHJlcy5kYXRhLmxpc3RcbiAgICAgICAgaWYgKCF0aGlzLnBheU1lbWJlckxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgc2hvd01zZygn6K+35Yu/6YeN5aSN57y06LS5JylcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wYXlNZW1iZXJMaXN0Lmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdEZsYWcgPSB0cnVlXG4gICAgICAgICAgdGhpcy5jdXJyZW50Q29sbGVjdGlvbklkID0gY29sbGVjdGlvbklkXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc3R1ZGVudElkcyA9IFtdXG4gICAgICAgICAgdGhpcy5zdHVkZW50SWRzLnB1c2godGhpcy5wYXlNZW1iZXJMaXN0WzBdLmlkKVxuICAgICAgICAgIHRoaXMuYWRkVG9PcmRlcihjb2xsZWN0aW9uSWQpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBzdWJtaXRKb2luQWN0aXZpdHkoKSB7XG4gICAgICBqb2luQWN0aXZpdHkoe1xuICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXG4gICAgICAgIGFjdGl2aXR5X2l0ZW1faWQ6IHRoaXMuY3VycmVybnRTdWJBY3Rpdml0eUlkLFxuICAgICAgICBhY3Rpdml0eV9pZDogdGhpcy5jdXJyZXJudEpvaW5BY2l0aXZ5dElkXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgc2hvd01zZygn5o+Q5Lqk5oiQ5YqfJylcbiAgICAgICAgICB0aGlzLmN1cnJlcm50U3ViQWN0aXZpdHlJZCA9IFtdXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgam9pbkFjdGl2aXR5KGlkLCBzdWJJZCwgbGlzdEluZGV4LCBhY3Rpdml0eUluZGV4KSB7XG4gICAgICBpZiAoIXRoaXMuY2xhc3NJbmZvKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+WFiOmAieaLqeePree6pycpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdGhpcy5jdXJyZXJudEpvaW5BY2l0aXZ5dElkID0gaWRcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jdXJyZXJudFN1YkFjdGl2aXR5SWQuaW5kZXhPZihzdWJJZClcbiAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgIHRoaXMuY3VycmVybnRTdWJBY3Rpdml0eUlkLnNwbGljZShpbmRleCwgMSlcbiAgICAgICAgdGhpcy5saXN0W2xpc3RJbmRleF0uaW5mby5pdGVtW2FjdGl2aXR5SW5kZXhdLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jdXJyZXJudFN1YkFjdGl2aXR5SWQucHVzaChzdWJJZClcbiAgICAgICAgdGhpcy5saXN0W2xpc3RJbmRleF0uaW5mby5pdGVtW2FjdGl2aXR5SW5kZXhdLmNoZWNrZWQgPSB0cnVlXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBhZGRDb21tZW50KHR5cGUsIGlkLCByb290SWQsIHRvQ29tbWVudElkLCBuYW1lKSB7XG4gICAgICBpZiAoIXRoaXMuY2xhc3NJbmZvKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+WFiOmAieaLqeePree6pycpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdGhpcy5jb21tZW50RmxhZyA9IHRydWVcbiAgICAgIHRoaXMuY3VycmVudFJlcGx5SWQgPSBpZFxuICAgICAgdGhpcy5jdXJyZW50UmVwbHlSb290SWQgPSB0eXBlID09PSAnYWRkJyA/IDAgOiByb290SWRcbiAgICAgIGlmIChuYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5jb21tZW50SW5wdXQgPSBgQCR7bmFtZX06YFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb21tZW50SW5wdXQgPSAnJ1xuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgYmluZENvbW1lbnRJbnB1dCAodmFsdWUpIHtcbiAgICAgIHRoaXMuY29tbWVudElucHV0ID0gdmFsdWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGNvbW1lbnRTdXJlICgpIHtcbiAgICAgIHRoaXMuY29tbWVudEZsYWcgPSBmYWxzZVxuICAgICAgYWRkQ29tbWVudCh7XG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgICAgbW9tZW50X2lkOiB0aGlzLmN1cnJlbnRSZXBseUlkLFxuICAgICAgICBjb250ZW50OiB0aGlzLmN1cnJlbnRSZXBseUlkID4gMCA/IHRoaXMuY29tbWVudElucHV0LnJlcGxhY2UoL15ALis6LywgJycpIDogdGhpcy5jb21tZW50SW5wdXQsXG4gICAgICAgIHJvb3RfaWQ6IHRoaXMuY3VycmVudFJlcGx5Um9vdElkLFxuICAgICAgICB0b19jb21tZW50X2lkOiB0aGlzLmN1cnJlbnRSZXBseVJvb3RJZFxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgIHRoaXMuY29tbWVudElucHV0ID0gJydcbiAgICAgICAgICB0aGlzLnJlc2V0RGF0YSgpXG4gICAgICAgICAgdGhpcy5nZXRab25lTGlzdCgpXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgY29tbWVudENhbmNlbCAoKSB7XG4gICAgICB0aGlzLmNvbW1lbnRGbGFnID0gZmFsc2VcbiAgICAgIHRoaXMuY29tbWVudElucHV0ID0gJydcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGZpbHRlciAodHlwZSkge1xuICAgICAgdGhpcy5yZXNldERhdGEoKVxuICAgICAgdGhpcy5hY3RpdmVUeXBlID0gdHlwZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgdGhpcy5nZXRab25lTGlzdCgpXG4gICAgfSxcbiAgICBqdW1wUGFnZSAocGFnZU5hbWUsIHR5cGUpIHtcbiAgICAgIHRoaXMucHVibGlzaEZsYWcgPSBmYWxzZVxuICAgICAgdGhpcy5zZXRGbGFnID0gZmFsc2VcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6IGAke3BhZ2VOYW1lfT90eXBlPSR7dHlwZX1gXG4gICAgICB9KVxuICAgIH0sXG4gICAgdG9nZ2xlTWVudSAodHlwZSkge1xuICAgICAgaWYgKCF0aGlzLmNsYXNzSW5mbykge1xuICAgICAgICBzaG93TXNnKCfor7fpgInnu5Hlrprnj63nuqcnLCAzMDAwKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHRoaXNbdHlwZV0gPSAhdGhpc1t0eXBlXVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgY2xvc2VUb2dnbGUgKCkge1xuICAgICAgdGhpcy5zZXRGbGFnID0gZmFsc2VcbiAgICAgIHRoaXMucHVibGlzaEZsYWcgPSBmYWxzZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgcHJldmlldyhpbWcsIGltZ0xpc3QpIHtcbiAgICAgIHByZXZpZXdJbWFnZShpbWcsIGltZ0xpc3QpXG4gICAgfSxcbiAgICBzZWxlY3RDYW5jZWwoKSB7XG4gICAgICB0aGlzLnNlbGVjdEZsYWcgPSBmYWxzZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgc2VsZWN0U3VyZSh2YWx1ZSkge1xuICAgICAgaWYgKCF2YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgc2hvd01zZygn6K+36YCJ5oupJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBjb25zdCB2YWwgPSB2YWx1ZVxuICAgICAgdGhpcy5zdHVkZW50SWRzID0gWy4uLnZhbF1cbiAgICAgIHRoaXMuc2VsZWN0RmxhZyA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB0aGlzLmFkZFRvT3JkZXIodGhpcy5jdXJyZW50Q29sbGVjdGlvbklkKVxuICAgIH1cbiAgfVxufVxuIl19