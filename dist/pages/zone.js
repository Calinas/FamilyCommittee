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
          is_pay: 1
        }).then(function (res) {
          _this2.payMemberList = res.data.list;
          if (_this2.payMemberList.length > 1) {
            _this2.selectFlag = true;
            _this2.currentCollectionId = collectionId;
            _this2.$apply();
          } else {
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
        _this6.list = [].concat(_toConsumableArray(_this6.list), _toConsumableArray(list));
        if (list.length < _this6.ps) {
          _this6.loadFinished = true;
        }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInpvbmUuanMiXSwibmFtZXMiOlsiWm9uZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJDdXJyZW50TW9kYWwiLCJTZWxlY3RNb2RhbCIsImRhdGEiLCJjb21tZW50RmxhZyIsInNlbGVjdEZsYWciLCJhY3RpdmVUeXBlIiwic2V0RmxhZyIsInB1Ymxpc2hGbGFnIiwidHlwZSIsImNpcmNsZXMiLCJjb2xsZWN0aW9uIiwibm90aWZ5IiwiYWN0aXZpdHkiLCJhY2NvdW50IiwicG4iLCJwcyIsImxpc3QiLCJwYXlNZW1iZXJMaXN0IiwiY2xhc3NJbmZvIiwibWVtYmVySW5mbyIsInNjaG9vbEluZm8iLCJsb2FkaW5nIiwibG9hZEZpbmlzaGVkIiwiY29tbWVudElucHV0IiwiY3VycmVudFJlcGx5SWQiLCJjdXJyZW50UmVwbHlSb290SWQiLCJjdXJyZW50UmVwbHlUb0NvbW1lbnRJZCIsImN1cnJlcm50Sm9pbkFjaXRpdnl0SWQiLCJjdXJyZXJudFN1YkFjdGl2aXR5SWQiLCJjdXJyZW50Q29sbGVjdGlvbklkIiwiYXV0aCIsInByZXNpZGVudCIsImZpbmFuY2UiLCJwaG90b3MiLCJtZW1iZXJMaXN0Iiwic3R1ZGVudElkcyIsImZpcnN0SW5pdCIsIndhdGNoIiwibmV3VmFsIiwib2xkVmFsIiwicmVzZXREYXRhIiwiZ2V0QXV0aExpc3QiLCJnZXRab25lTGlzdCIsImN1cnJlbnRKb2luQWN0aXZpdHlJZCIsIiRhcHBseSIsIm1ldGhvZHMiLCJwYXkiLCJtb21lbnRJZCIsImNvbGxlY3Rpb25JZCIsImNsYXNzX2lkIiwiaWQiLCJtb21lbnRfaWQiLCJpc19wYXkiLCJ0aGVuIiwicmVzIiwibGVuZ3RoIiwicHVzaCIsImFkZFRvT3JkZXIiLCJzdWJtaXRKb2luQWN0aXZpdHkiLCJhY3Rpdml0eV9pdGVtX2lkIiwiYWN0aXZpdHlfaWQiLCJzdWNjZXNzIiwiam9pbkFjdGl2aXR5Iiwic3ViSWQiLCJsaXN0SW5kZXgiLCJhY3Rpdml0eUluZGV4IiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIiwiaW5mbyIsIml0ZW0iLCJjaGVja2VkIiwiYWRkQ29tbWVudCIsInJvb3RJZCIsInRvQ29tbWVudElkIiwibmFtZSIsInVuZGVmaW5lZCIsImJpbmRDb21tZW50SW5wdXQiLCJ2YWx1ZSIsImNvbW1lbnRTdXJlIiwiY29udGVudCIsInJlcGxhY2UiLCJyb290X2lkIiwidG9fY29tbWVudF9pZCIsImNvbW1lbnRDYW5jZWwiLCJmaWx0ZXIiLCJqdW1wUGFnZSIsInBhZ2VOYW1lIiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwidG9nZ2xlTWVudSIsImNsb3NlVG9nZ2xlIiwicHJldmlldyIsImltZyIsImltZ0xpc3QiLCJzZWxlY3RDYW5jZWwiLCJzZWxlY3RTdXJlIiwidmFsIiwiZ2V0U3RvcmFnZVN5bmMiLCJjaGVja0RhdGFFeGlzdCIsInJlTGF1bmNoIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJ1c2VyRGF0YSIsImNoZWNrQXV0aCIsIm9iaiIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiaSIsImxlbiIsImNvZGUiLCJpc0F1dGgiLCJpc19hdXRoIiwiZm9ybWF0QWxsQXV0aCIsImZvcm1hdFNpbmdsZUF1dGgiLCJzZWVfdHlwZSIsImNvbW1lbnRfY291bnQiLCJvcmRlcl9pZCIsInBheW1lbnRfcGFyYW1zIiwicmVxdWVzdFBheW1lbnQiLCJ0aW1lU3RhbXAiLCJTdHJpbmciLCJub25jZVN0ciIsInBhY2thZ2UiLCJwYXlTaWduIiwic2lnblR5cGUiLCJjb25zb2xlIiwibG9nIiwic3R1ZGVudF9pZHMiLCJjb2xsZWN0aW9uX2l0ZW1faWQiLCJwYXltZW50UGFyYW1zIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztB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QUNBakMsV0FBR2tDLGNBQUgsQ0FBa0I7QUFDaEJDLHFCQUFXQyxPQUFPMUgsS0FBS3lILFNBQVosQ0FESztBQUVoQkUsb0JBQVUzSCxLQUFLMkgsUUFGQztBQUdoQkMsbUJBQVM1SCxLQUFLNEgsT0FIRTtBQUloQkMsbUJBQVM3SCxLQUFLNkgsT0FKRTtBQUtoQkMsb0JBQVUsS0FMTTtBQU1oQm5FLGlCQU5nQixxQkFNTjtBQUNSb0Usb0JBQVFDLEdBQVIsQ0FBWSxLQUFaO0FBQ0Q7QUFSZSxTQUFsQjtBQVVELE9BZEQ7QUFlRDs7OytCQUNVaEYsRSxFQUFJO0FBQUE7O0FBQ2IsNkJBQVM7QUFDUEQsa0JBQVUsS0FBSy9CLFNBQUwsQ0FBZWdDLEVBRGxCO0FBRVBpRixxQkFBYSxLQUFLaEcsVUFGWDtBQUdQaUcsNEJBQW9CbEY7QUFIYixPQUFULEVBSUdHLElBSkgsQ0FJUSxlQUFPO0FBQ2IsZUFBS2dGLGFBQUwsQ0FBbUIvRSxJQUFJcEQsSUFBSixDQUFTQSxJQUFULENBQWNnRCxFQUFqQztBQUNELE9BTkQ7QUFPRDs7OztFQXhMK0JvRixlQUFLQyxJOztrQkFBbEIvSSxJIiwiZmlsZSI6InpvbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgU2VsZWN0TW9kYWwgZnJvbSAnLi4vY29tcG9uZW50cy9zZWxlY3RNb2RhbCdcbmltcG9ydCBDdXJyZW50TW9kYWwgZnJvbSAnLi4vY29tcG9uZW50cy9jb21tZW50TW9kYWwnXG5pbXBvcnQgeyBzaG93TXNnLCBwcmV2aWV3SW1hZ2UgfSBmcm9tICcuLi91dGlscy9jb21tb24nXG5pbXBvcnQgeyBnZXRDaXJjbGVMaXN0LCBhZGRDb21tZW50LCBqb2luQWN0aXZpdHkgfSBmcm9tICcuLi9hcGkvem9uZSdcbmltcG9ydCB7IGFkZE9yZGVyLCBnZXRQYXltZW50UGFyYW1zIH0gZnJvbSAnLi4vYXBpL2ZpbmFuY2UnXG5pbXBvcnQgeyBnZXRBdXRoIH0gZnJvbSAnLi4vYXBpL2F1dGhvcml6ZSdcbmltcG9ydCB7IGNoZWNrU3R1ZGVudCB9IGZyb20gJy4uL2FwaS91c2VyJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWm9uZSBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Y+R546wJyxcbiAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IHRydWVcbiAgfVxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiQ3VycmVudE1vZGFsXCI6e1wic3VyZUJ0blRleHRcIjpcIuehruiupFwiLFwiY2FuY2VsQnRuVGV4dFwiOlwi5Y+W5raIXCIsXCJwbGFjZWhvbGRlclRleHRcIjpcIuivt+i+k+WFpeivhOiuuuWGheWuuVwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpmbGFnLnN5bmNcIjpcImNvbW1lbnRGbGFnXCIsXCJ2LWJpbmQ6Y29tbWVudElucHV0LnN5bmNcIjpcImNvbW1lbnRJbnB1dFwiLFwieG1sbnM6di1vblwiOlwiXCJ9LFwiU2VsZWN0TW9kYWxcIjp7XCJ2LWJpbmQ6ZmxhZy5zeW5jXCI6XCJzZWxlY3RGbGFnXCIsXCJ2LWJpbmQ6bGlzdC5zeW5jXCI6XCJwYXlNZW1iZXJMaXN0XCJ9fTtcclxuJGV2ZW50cyA9IHtcIkN1cnJlbnRNb2RhbFwiOntcInYtb246Y2FuY2VsXCI6XCJjb21tZW50Q2FuY2VsXCIsXCJ2LW9uOnN1cmVcIjpcImNvbW1lbnRTdXJlXCIsXCJ2LW9uOmlucHV0XCI6XCJiaW5kQ29tbWVudElucHV0XCJ9LFwiU2VsZWN0TW9kYWxcIjp7XCJ2LW9uOmNhbmNlbFwiOlwic2VsZWN0Q2FuY2VsXCIsXCJ2LW9uOnN1cmVcIjpcInNlbGVjdFN1cmVcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICBDdXJyZW50TW9kYWwsXG4gICAgU2VsZWN0TW9kYWxcbiAgfVxuICBkYXRhID0ge1xuICAgIGNvbW1lbnRGbGFnOiBmYWxzZSxcbiAgICBzZWxlY3RGbGFnOiBmYWxzZSxcbiAgICBhY3RpdmVUeXBlOiAnY2lyY2xlcycsXG4gICAgc2V0RmxhZzogZmFsc2UsXG4gICAgcHVibGlzaEZsYWc6IGZhbHNlLFxuICAgIHR5cGU6IHtcbiAgICAgIGNpcmNsZXM6ICflrrbplb/lnIgnLFxuICAgICAgY29sbGVjdGlvbjogJ+aUtuasvicsXG4gICAgICBub3RpZnk6ICfpgJrnn6UnLFxuICAgICAgYWN0aXZpdHk6ICfmtLvliqgnLFxuICAgICAgYWNjb3VudDogJ+iusOi0pidcbiAgICB9LFxuICAgIHBuOiAxLFxuICAgIHBzOiAxMCxcbiAgICBsaXN0OiBbXSxcbiAgICBwYXlNZW1iZXJMaXN0OiBbXSxcbiAgICBjbGFzc0luZm86IG51bGwsXG4gICAgbWVtYmVySW5mbzogbnVsbCxcbiAgICBzY2hvb2xJbmZvOiBudWxsLFxuICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgIGxvYWRGaW5pc2hlZDogZmFsc2UsXG4gICAgY29tbWVudElucHV0OiAnJyxcbiAgICBjdXJyZW50UmVwbHlJZDogLTEsXG4gICAgY3VycmVudFJlcGx5Um9vdElkOiAtMSxcbiAgICBjdXJyZW50UmVwbHlUb0NvbW1lbnRJZDogLTEsXG4gICAgY3VycmVybnRKb2luQWNpdGl2eXRJZDogLTEsXG4gICAgY3VycmVybnRTdWJBY3Rpdml0eUlkOiBbXSxcbiAgICBjdXJyZW50Q29sbGVjdGlvbklkOiAtMSxcbiAgICBhdXRoOiB7XG4gICAgICBwcmVzaWRlbnQ6IGZhbHNlLFxuICAgICAgZmluYW5jZTogZmFsc2UsXG4gICAgICBhY3Rpdml0eTogZmFsc2UsXG4gICAgICBub3RpZnk6IGZhbHNlLFxuICAgICAgcGhvdG9zOiBmYWxzZSxcbiAgICAgIGNpcmNsZXM6IGZhbHNlXG4gICAgfSxcbiAgICBtZW1iZXJMaXN0OiBbXSxcbiAgICBzdHVkZW50SWRzOiBbXSxcbiAgICBmaXJzdEluaXQ6IHRydWVcbiAgfVxuICB3YXRjaCA9IHtcbiAgICBjbGFzc0luZm8obmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgIC8vIOWIh+aNouS6huePree6p+S5i+WQjuaVsOaNruimgeabtOaWsFxuICAgICAgaWYgKG9sZFZhbCAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLnJlc2V0RGF0YSgpXG4gICAgICAgIHRoaXMuZ2V0QXV0aExpc3QoKVxuICAgICAgICB0aGlzLmdldFpvbmVMaXN0KClcbiAgICAgIH1cbiAgICB9LFxuICAgIGN1cnJlbnRKb2luQWN0aXZpdHlJZChuZXdWYWwsIG9sZFZhbCkge1xuICAgICAgaWYgKG5ld1ZhbCA+IDApIHtcbiAgICAgICAgdGhpcy5jdXJyZXJudFN1YkFjdGl2aXR5SWQgPSBbXVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJlc2V0RGF0YSgpIHtcbiAgICB0aGlzLnN0dWRlbnRJZHMgPSBbXVxuICAgIHRoaXMucG4gPSAxXG4gICAgdGhpcy5saXN0ID0gW11cbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgb25QdWxsRG93blJlZnJlc2goKSB7XG4gICAgdGhpcy5yZXNldERhdGEoKVxuICAgIHRoaXMuZ2V0Wm9uZUxpc3QoKVxuICB9XG4gIG9uUmVhY2hCb3R0b20oKSB7XG4gICAgaWYgKHRoaXMubG9hZGluZyB8fCB0aGlzLmxvYWRGaW5pc2hlZCkgcmV0dXJuXG4gICAgdGhpcy5nZXRab25lTGlzdCgpXG4gIH1cbiAgb25TaG93KCkge1xuICAgIHRoaXMuY3VycmVybnRKb2luQWNpdGl2eXRJZCA9IC0xXG4gICAgdGhpcy5jdXJyZXJudFN1YkFjdGl2aXR5SWQgPSBbXVxuICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIG9uTG9hZCgpIHtcbiAgICBpZiAoIXRoaXMuY2hlY2tEYXRhRXhpc3QoJ21lbWJlckluZm8nKSkge1xuICAgICAgd3gucmVMYXVuY2goe1xuICAgICAgICB1cmw6ICdsb2dpbidcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXG4gICAgICB0aGlzLmNsYXNzSW5mbyAmJiB0aGlzLmdldEF1dGhMaXN0KClcbiAgICAgIHRoaXMubWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcbiAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJEYXRhID0gdGhpcy5tZW1iZXJJbmZvXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB0aGlzLmdldFpvbmVMaXN0KClcbiAgICB9XG4gIH1cbiAgZ2V0QXV0aExpc3QoKSB7XG4gICAgZ2V0QXV0aCh7XG4gICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWRcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICB0aGlzLmNoZWNrQXV0aChyZXMuZGF0YS5kYXRhKVxuICAgIH0pXG4gIH1cbiAgZm9ybWF0QWxsQXV0aChvYmopIHtcbiAgICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIG9ialtrZXldID0gdHJ1ZVxuICAgIH0pXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIGZvcm1hdFNpbmdsZUF1dGgobmFtZSkge1xuICAgIHRoaXMuYXV0aFtuYW1lXSA9IHRydWVcbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgY2hlY2tBdXRoKGxpc3QpIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gbGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgbGV0IHtjb2RlLCBpc19hdXRoOiBpc0F1dGh9ID0gbGlzdFtpXVxuICAgICAgaWYgKGNvZGUgPT09ICdwcmVzaWRlbnQnICYmIGlzQXV0aCkge1xuICAgICAgICB0aGlzLmZvcm1hdEFsbEF1dGgodGhpcy5hdXRoKVxuICAgICAgICBicmVha1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXNBdXRoICYmIHRoaXMuZm9ybWF0U2luZ2xlQXV0aChjb2RlKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBjaGVja0RhdGFFeGlzdChrZXkpIHtcbiAgICBpZiAod3guZ2V0U3RvcmFnZVN5bmMoa2V5KSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgZ2V0Wm9uZUxpc3QoKSB7XG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZVxuICAgIHRoaXMuJGFwcGx5KClcbiAgICBjb25zdCBpZCA9IHRoaXMuY2xhc3NJbmZvLmlkXG4gICAgZ2V0Q2lyY2xlTGlzdCh7XG4gICAgICBjbGFzc19pZDogaWQsXG4gICAgICBzZWVfdHlwZTogaWQgPyAnJyA6ICdhbGwnLFxuICAgICAgdHlwZTogdGhpcy5hY3RpdmVUeXBlLFxuICAgICAgcG46IHRoaXMucG4sXG4gICAgICBwczogdGhpcy5wcyxcbiAgICAgIGNvbW1lbnRfY291bnQ6IDNcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgeyBsaXN0IH0gPSByZXMuZGF0YVxuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2VcbiAgICAgIHRoaXMucG4rK1xuICAgICAgdGhpcy5saXN0ID0gWy4uLnRoaXMubGlzdCwgLi4ubGlzdF1cbiAgICAgIGlmIChsaXN0Lmxlbmd0aCA8IHRoaXMucHMpIHtcbiAgICAgICAgdGhpcy5sb2FkRmluaXNoZWQgPSB0cnVlXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSlcbiAgfVxuICBwYXltZW50UGFyYW1zKGlkKSB7XG4gICAgZ2V0UGF5bWVudFBhcmFtcyh7XG4gICAgICBvcmRlcl9pZDogaWRcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhLnBheW1lbnRfcGFyYW1zXG4gICAgICB3eC5yZXF1ZXN0UGF5bWVudCh7XG4gICAgICAgIHRpbWVTdGFtcDogU3RyaW5nKGRhdGEudGltZVN0YW1wKSxcbiAgICAgICAgbm9uY2VTdHI6IGRhdGEubm9uY2VTdHIsXG4gICAgICAgIHBhY2thZ2U6IGRhdGEucGFja2FnZSxcbiAgICAgICAgcGF5U2lnbjogZGF0YS5wYXlTaWduLFxuICAgICAgICBzaWduVHlwZTogJ01ENScsXG4gICAgICAgIHN1Y2Nlc3MoKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ+aIkOWKn+S6hicpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuICBhZGRUb09yZGVyKGlkKSB7XG4gICAgYWRkT3JkZXIoe1xuICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgc3R1ZGVudF9pZHM6IHRoaXMuc3R1ZGVudElkcyxcbiAgICAgIGNvbGxlY3Rpb25faXRlbV9pZDogaWRcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICB0aGlzLnBheW1lbnRQYXJhbXMocmVzLmRhdGEuZGF0YS5pZClcbiAgICB9KVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgcGF5KG1vbWVudElkLCBjb2xsZWN0aW9uSWQpIHtcbiAgICAgIGNoZWNrU3R1ZGVudCh7XG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgICAgbW9tZW50X2lkOiBtb21lbnRJZCxcbiAgICAgICAgaXNfcGF5OiAxXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIHRoaXMucGF5TWVtYmVyTGlzdCA9IHJlcy5kYXRhLmxpc3RcbiAgICAgICAgaWYgKHRoaXMucGF5TWVtYmVyTGlzdC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RGbGFnID0gdHJ1ZVxuICAgICAgICAgIHRoaXMuY3VycmVudENvbGxlY3Rpb25JZCA9IGNvbGxlY3Rpb25JZFxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnN0dWRlbnRJZHMucHVzaCh0aGlzLnBheU1lbWJlckxpc3RbMF0uaWQpXG4gICAgICAgICAgdGhpcy5hZGRUb09yZGVyKGNvbGxlY3Rpb25JZClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIHN1Ym1pdEpvaW5BY3Rpdml0eSgpIHtcbiAgICAgIGpvaW5BY3Rpdml0eSh7XG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgICAgYWN0aXZpdHlfaXRlbV9pZDogdGhpcy5jdXJyZXJudFN1YkFjdGl2aXR5SWQsXG4gICAgICAgIGFjdGl2aXR5X2lkOiB0aGlzLmN1cnJlcm50Sm9pbkFjaXRpdnl0SWRcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICBzaG93TXNnKCfmj5DkuqTmiJDlip8nKVxuICAgICAgICAgIHRoaXMuY3VycmVybnRTdWJBY3Rpdml0eUlkID0gW11cbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBqb2luQWN0aXZpdHkoaWQsIHN1YklkLCBsaXN0SW5kZXgsIGFjdGl2aXR5SW5kZXgpIHtcbiAgICAgIGlmICghdGhpcy5jbGFzc0luZm8pIHtcbiAgICAgICAgc2hvd01zZygn6K+35YWI6YCJ5oup54+t57qnJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB0aGlzLmN1cnJlcm50Sm9pbkFjaXRpdnl0SWQgPSBpZFxuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmN1cnJlcm50U3ViQWN0aXZpdHlJZC5pbmRleE9mKHN1YklkKVxuICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgdGhpcy5jdXJyZXJudFN1YkFjdGl2aXR5SWQuc3BsaWNlKGluZGV4LCAxKVxuICAgICAgICB0aGlzLmxpc3RbbGlzdEluZGV4XS5pbmZvLml0ZW1bYWN0aXZpdHlJbmRleF0uY2hlY2tlZCA9IGZhbHNlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmN1cnJlcm50U3ViQWN0aXZpdHlJZC5wdXNoKHN1YklkKVxuICAgICAgICB0aGlzLmxpc3RbbGlzdEluZGV4XS5pbmZvLml0ZW1bYWN0aXZpdHlJbmRleF0uY2hlY2tlZCA9IHRydWVcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGFkZENvbW1lbnQodHlwZSwgaWQsIHJvb3RJZCwgdG9Db21tZW50SWQsIG5hbWUpIHtcbiAgICAgIGlmICghdGhpcy5jbGFzc0luZm8pIHtcbiAgICAgICAgc2hvd01zZygn6K+35YWI6YCJ5oup54+t57qnJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB0aGlzLmNvbW1lbnRGbGFnID0gdHJ1ZVxuICAgICAgdGhpcy5jdXJyZW50UmVwbHlJZCA9IGlkXG4gICAgICB0aGlzLmN1cnJlbnRSZXBseVJvb3RJZCA9IHR5cGUgPT09ICdhZGQnID8gMCA6IHJvb3RJZFxuICAgICAgaWYgKG5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmNvbW1lbnRJbnB1dCA9IGBAJHtuYW1lfTpgXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbW1lbnRJbnB1dCA9ICcnXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBiaW5kQ29tbWVudElucHV0ICh2YWx1ZSkge1xuICAgICAgdGhpcy5jb21tZW50SW5wdXQgPSB2YWx1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgY29tbWVudFN1cmUgKCkge1xuICAgICAgdGhpcy5jb21tZW50RmxhZyA9IGZhbHNlXG4gICAgICBhZGRDb21tZW50KHtcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgICBtb21lbnRfaWQ6IHRoaXMuY3VycmVudFJlcGx5SWQsXG4gICAgICAgIGNvbnRlbnQ6IHRoaXMuY3VycmVudFJlcGx5SWQgPiAwID8gdGhpcy5jb21tZW50SW5wdXQucmVwbGFjZSgvXkAuKzovLCAnJykgOiB0aGlzLmNvbW1lbnRJbnB1dCxcbiAgICAgICAgcm9vdF9pZDogdGhpcy5jdXJyZW50UmVwbHlSb290SWQsXG4gICAgICAgIHRvX2NvbW1lbnRfaWQ6IHRoaXMuY3VycmVudFJlcGx5Um9vdElkXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgdGhpcy5jb21tZW50SW5wdXQgPSAnJ1xuICAgICAgICAgIHRoaXMucmVzZXREYXRhKClcbiAgICAgICAgICB0aGlzLmdldFpvbmVMaXN0KClcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBjb21tZW50Q2FuY2VsICgpIHtcbiAgICAgIHRoaXMuY29tbWVudEZsYWcgPSBmYWxzZVxuICAgICAgdGhpcy5jb21tZW50SW5wdXQgPSAnJ1xuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgZmlsdGVyICh0eXBlKSB7XG4gICAgICB0aGlzLnJlc2V0RGF0YSgpXG4gICAgICB0aGlzLmFjdGl2ZVR5cGUgPSB0eXBlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB0aGlzLmdldFpvbmVMaXN0KClcbiAgICB9LFxuICAgIGp1bXBQYWdlIChwYWdlTmFtZSwgdHlwZSkge1xuICAgICAgdGhpcy5wdWJsaXNoRmxhZyA9IGZhbHNlXG4gICAgICB0aGlzLnNldEZsYWcgPSBmYWxzZVxuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogYCR7cGFnZU5hbWV9P3R5cGU9JHt0eXBlfWBcbiAgICAgIH0pXG4gICAgfSxcbiAgICB0b2dnbGVNZW51ICh0eXBlKSB7XG4gICAgICBpZiAoIXRoaXMuY2xhc3NJbmZvKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+mAiee7keWumuePree6pycsIDMwMDApXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdGhpc1t0eXBlXSA9ICF0aGlzW3R5cGVdXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBjbG9zZVRvZ2dsZSAoKSB7XG4gICAgICB0aGlzLnNldEZsYWcgPSBmYWxzZVxuICAgICAgdGhpcy5wdWJsaXNoRmxhZyA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBwcmV2aWV3KGltZywgaW1nTGlzdCkge1xuICAgICAgcHJldmlld0ltYWdlKGltZywgaW1nTGlzdClcbiAgICB9LFxuICAgIHNlbGVjdENhbmNlbCgpIHtcbiAgICAgIHRoaXMuc2VsZWN0RmxhZyA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBzZWxlY3RTdXJlKHZhbHVlKSB7XG4gICAgICBpZiAoIXZhbHVlLmxlbmd0aCkge1xuICAgICAgICBzaG93TXNnKCfor7fpgInmi6knKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGNvbnN0IHZhbCA9IHZhbHVlXG4gICAgICB0aGlzLnN0dWRlbnRJZHMgPSBbLi4udmFsXVxuICAgICAgdGhpcy5zZWxlY3RGbGFnID0gZmFsc2VcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIHRoaXMuYWRkVG9PcmRlcih0aGlzLmN1cnJlbnRDb2xsZWN0aW9uSWQpXG4gICAgfVxuICB9XG59XG4iXX0=