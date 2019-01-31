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
        console.log(res);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInpvbmUuanMiXSwibmFtZXMiOlsiWm9uZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJDdXJyZW50TW9kYWwiLCJTZWxlY3RNb2RhbCIsImRhdGEiLCJjb21tZW50RmxhZyIsInNlbGVjdEZsYWciLCJhY3RpdmVUeXBlIiwic2V0RmxhZyIsInB1Ymxpc2hGbGFnIiwidHlwZSIsImNpcmNsZXMiLCJjb2xsZWN0aW9uIiwibm90aWZ5IiwiYWN0aXZpdHkiLCJhY2NvdW50IiwicG4iLCJwcyIsImxpc3QiLCJwYXlNZW1iZXJMaXN0IiwiY2xhc3NJbmZvIiwibWVtYmVySW5mbyIsInNjaG9vbEluZm8iLCJsb2FkaW5nIiwibG9hZEZpbmlzaGVkIiwiY29tbWVudElucHV0IiwiY3VycmVudFJlcGx5SWQiLCJjdXJyZW50UmVwbHlSb290SWQiLCJjdXJyZW50UmVwbHlUb0NvbW1lbnRJZCIsImN1cnJlcm50Sm9pbkFjaXRpdnl0SWQiLCJjdXJyZXJudFN1YkFjdGl2aXR5SWQiLCJjdXJyZW50Q29sbGVjdGlvbklkIiwiYXV0aCIsInByZXNpZGVudCIsImZpbmFuY2UiLCJwaG90b3MiLCJtZW1iZXJMaXN0Iiwic3R1ZGVudElkcyIsImZpcnN0SW5pdCIsIndhdGNoIiwibmV3VmFsIiwib2xkVmFsIiwicmVzZXREYXRhIiwiZ2V0QXV0aExpc3QiLCJnZXRab25lTGlzdCIsImN1cnJlbnRKb2luQWN0aXZpdHlJZCIsIiRhcHBseSIsIm1ldGhvZHMiLCJwYXkiLCJtb21lbnRJZCIsImNvbGxlY3Rpb25JZCIsImNsYXNzX2lkIiwiaWQiLCJtb21lbnRfaWQiLCJpc19wYXkiLCJ0aGVuIiwicmVzIiwibGVuZ3RoIiwicHVzaCIsImFkZFRvT3JkZXIiLCJzdWJtaXRKb2luQWN0aXZpdHkiLCJhY3Rpdml0eV9pdGVtX2lkIiwiYWN0aXZpdHlfaWQiLCJzdWNjZXNzIiwiam9pbkFjdGl2aXR5Iiwic3ViSWQiLCJsaXN0SW5kZXgiLCJhY3Rpdml0eUluZGV4IiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIiwiaW5mbyIsIml0ZW0iLCJjaGVja2VkIiwiYWRkQ29tbWVudCIsInJvb3RJZCIsInRvQ29tbWVudElkIiwibmFtZSIsInVuZGVmaW5lZCIsImJpbmRDb21tZW50SW5wdXQiLCJ2YWx1ZSIsImNvbW1lbnRTdXJlIiwiY29udGVudCIsInJlcGxhY2UiLCJyb290X2lkIiwidG9fY29tbWVudF9pZCIsImNvbW1lbnRDYW5jZWwiLCJmaWx0ZXIiLCJqdW1wUGFnZSIsInBhZ2VOYW1lIiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwidG9nZ2xlTWVudSIsImNsb3NlVG9nZ2xlIiwicHJldmlldyIsImltZyIsImltZ0xpc3QiLCJzZWxlY3RDYW5jZWwiLCJzZWxlY3RTdXJlIiwidmFsIiwiZ2V0U3RvcmFnZVN5bmMiLCJjaGVja0RhdGFFeGlzdCIsInJlTGF1bmNoIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJ1c2VyRGF0YSIsImNoZWNrQXV0aCIsIm9iaiIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiaSIsImxlbiIsImNvZGUiLCJpc0F1dGgiLCJpc19hdXRoIiwiZm9ybWF0QWxsQXV0aCIsImZvcm1hdFNpbmdsZUF1dGgiLCJzZWVfdHlwZSIsImNvbW1lbnRfY291bnQiLCJvcmRlcl9pZCIsImNvbnNvbGUiLCJsb2ciLCJzdHVkZW50X2lkcyIsImNvbGxlY3Rpb25faXRlbV9pZCIsInBheW1lbnRQYXJhbXMiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsSTs7Ozs7Ozs7Ozs7Ozs7a0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCLElBRGpCO0FBRVBDLDZCQUF1QjtBQUZoQixL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QUdQeUYsNEJBQW9CMUU7QUFIYixPQUFULEVBSUdHLElBSkgsQ0FJUSxlQUFPO0FBQ2IsZUFBS3dFLGFBQUwsQ0FBbUJ2RSxJQUFJcEQsSUFBSixDQUFTQSxJQUFULENBQWNnRCxFQUFqQztBQUNELE9BTkQ7QUFPRDs7OztFQTlLK0I0RSxlQUFLQyxJOztrQkFBbEJ2SSxJIiwiZmlsZSI6InpvbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgU2VsZWN0TW9kYWwgZnJvbSAnLi4vY29tcG9uZW50cy9zZWxlY3RNb2RhbCdcbmltcG9ydCBDdXJyZW50TW9kYWwgZnJvbSAnLi4vY29tcG9uZW50cy9jb21tZW50TW9kYWwnXG5pbXBvcnQgeyBzaG93TXNnLCBwcmV2aWV3SW1hZ2UgfSBmcm9tICcuLi91dGlscy9jb21tb24nXG5pbXBvcnQgeyBnZXRDaXJjbGVMaXN0LCBhZGRDb21tZW50LCBqb2luQWN0aXZpdHkgfSBmcm9tICcuLi9hcGkvem9uZSdcbmltcG9ydCB7IGFkZE9yZGVyLCBnZXRQYXltZW50UGFyYW1zIH0gZnJvbSAnLi4vYXBpL2ZpbmFuY2UnXG5pbXBvcnQgeyBnZXRBdXRoIH0gZnJvbSAnLi4vYXBpL2F1dGhvcml6ZSdcbmltcG9ydCB7IGNoZWNrU3R1ZGVudCB9IGZyb20gJy4uL2FwaS91c2VyJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWm9uZSBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Y+R546wJyxcbiAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IHRydWVcbiAgfVxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiQ3VycmVudE1vZGFsXCI6e1wic3VyZUJ0blRleHRcIjpcIuehruiupFwiLFwiY2FuY2VsQnRuVGV4dFwiOlwi5Y+W5raIXCIsXCJwbGFjZWhvbGRlclRleHRcIjpcIuivt+i+k+WFpeivhOiuuuWGheWuuVwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpmbGFnLnN5bmNcIjpcImNvbW1lbnRGbGFnXCIsXCJ2LWJpbmQ6Y29tbWVudElucHV0LnN5bmNcIjpcImNvbW1lbnRJbnB1dFwiLFwieG1sbnM6di1vblwiOlwiXCJ9LFwiU2VsZWN0TW9kYWxcIjp7XCJ2LWJpbmQ6ZmxhZy5zeW5jXCI6XCJzZWxlY3RGbGFnXCIsXCJ2LWJpbmQ6bGlzdC5zeW5jXCI6XCJwYXlNZW1iZXJMaXN0XCJ9fTtcclxuJGV2ZW50cyA9IHtcIkN1cnJlbnRNb2RhbFwiOntcInYtb246Y2FuY2VsXCI6XCJjb21tZW50Q2FuY2VsXCIsXCJ2LW9uOnN1cmVcIjpcImNvbW1lbnRTdXJlXCIsXCJ2LW9uOmlucHV0XCI6XCJiaW5kQ29tbWVudElucHV0XCJ9LFwiU2VsZWN0TW9kYWxcIjp7XCJ2LW9uOmNhbmNlbFwiOlwic2VsZWN0Q2FuY2VsXCIsXCJ2LW9uOnN1cmVcIjpcInNlbGVjdFN1cmVcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICBDdXJyZW50TW9kYWwsXG4gICAgU2VsZWN0TW9kYWxcbiAgfVxuICBkYXRhID0ge1xuICAgIGNvbW1lbnRGbGFnOiBmYWxzZSxcbiAgICBzZWxlY3RGbGFnOiBmYWxzZSxcbiAgICBhY3RpdmVUeXBlOiAnY2lyY2xlcycsXG4gICAgc2V0RmxhZzogZmFsc2UsXG4gICAgcHVibGlzaEZsYWc6IGZhbHNlLFxuICAgIHR5cGU6IHtcbiAgICAgIGNpcmNsZXM6ICflrrbplb/lnIgnLFxuICAgICAgY29sbGVjdGlvbjogJ+aUtuasvicsXG4gICAgICBub3RpZnk6ICfpgJrnn6UnLFxuICAgICAgYWN0aXZpdHk6ICfmtLvliqgnLFxuICAgICAgYWNjb3VudDogJ+iusOi0pidcbiAgICB9LFxuICAgIHBuOiAxLFxuICAgIHBzOiAxMCxcbiAgICBsaXN0OiBbXSxcbiAgICBwYXlNZW1iZXJMaXN0OiBbXSxcbiAgICBjbGFzc0luZm86IG51bGwsXG4gICAgbWVtYmVySW5mbzogbnVsbCxcbiAgICBzY2hvb2xJbmZvOiBudWxsLFxuICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgIGxvYWRGaW5pc2hlZDogZmFsc2UsXG4gICAgY29tbWVudElucHV0OiAnJyxcbiAgICBjdXJyZW50UmVwbHlJZDogLTEsXG4gICAgY3VycmVudFJlcGx5Um9vdElkOiAtMSxcbiAgICBjdXJyZW50UmVwbHlUb0NvbW1lbnRJZDogLTEsXG4gICAgY3VycmVybnRKb2luQWNpdGl2eXRJZDogLTEsXG4gICAgY3VycmVybnRTdWJBY3Rpdml0eUlkOiBbXSxcbiAgICBjdXJyZW50Q29sbGVjdGlvbklkOiAtMSxcbiAgICBhdXRoOiB7XG4gICAgICBwcmVzaWRlbnQ6IGZhbHNlLFxuICAgICAgZmluYW5jZTogZmFsc2UsXG4gICAgICBhY3Rpdml0eTogZmFsc2UsXG4gICAgICBub3RpZnk6IGZhbHNlLFxuICAgICAgcGhvdG9zOiBmYWxzZSxcbiAgICAgIGNpcmNsZXM6IGZhbHNlXG4gICAgfSxcbiAgICBtZW1iZXJMaXN0OiBbXSxcbiAgICBzdHVkZW50SWRzOiBbXSxcbiAgICBmaXJzdEluaXQ6IHRydWVcbiAgfVxuICB3YXRjaCA9IHtcbiAgICBjbGFzc0luZm8obmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgIC8vIOWIh+aNouS6huePree6p+S5i+WQjuaVsOaNruimgeabtOaWsFxuICAgICAgaWYgKG9sZFZhbCAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLnJlc2V0RGF0YSgpXG4gICAgICAgIHRoaXMuZ2V0QXV0aExpc3QoKVxuICAgICAgICB0aGlzLmdldFpvbmVMaXN0KClcbiAgICAgIH1cbiAgICB9LFxuICAgIGN1cnJlbnRKb2luQWN0aXZpdHlJZChuZXdWYWwsIG9sZFZhbCkge1xuICAgICAgaWYgKG5ld1ZhbCA+IDApIHtcbiAgICAgICAgdGhpcy5jdXJyZXJudFN1YkFjdGl2aXR5SWQgPSBbXVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJlc2V0RGF0YSgpIHtcbiAgICB0aGlzLnN0dWRlbnRJZHMgPSBbXVxuICAgIHRoaXMucG4gPSAxXG4gICAgdGhpcy5saXN0ID0gW11cbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgb25QdWxsRG93blJlZnJlc2goKSB7XG4gICAgdGhpcy5yZXNldERhdGEoKVxuICAgIHRoaXMuZ2V0Wm9uZUxpc3QoKVxuICB9XG4gIG9uUmVhY2hCb3R0b20oKSB7XG4gICAgaWYgKHRoaXMubG9hZGluZyB8fCB0aGlzLmxvYWRGaW5pc2hlZCkgcmV0dXJuXG4gICAgdGhpcy5nZXRab25lTGlzdCgpXG4gIH1cbiAgb25TaG93KCkge1xuICAgIHRoaXMuY3VycmVybnRKb2luQWNpdGl2eXRJZCA9IC0xXG4gICAgdGhpcy5jdXJyZXJudFN1YkFjdGl2aXR5SWQgPSBbXVxuICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIG9uTG9hZCgpIHtcbiAgICBpZiAoIXRoaXMuY2hlY2tEYXRhRXhpc3QoJ21lbWJlckluZm8nKSkge1xuICAgICAgd3gucmVMYXVuY2goe1xuICAgICAgICB1cmw6ICdsb2dpbidcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXG4gICAgICB0aGlzLmNsYXNzSW5mbyAmJiB0aGlzLmdldEF1dGhMaXN0KClcbiAgICAgIHRoaXMubWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcbiAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJEYXRhID0gdGhpcy5tZW1iZXJJbmZvXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB0aGlzLmdldFpvbmVMaXN0KClcbiAgICB9XG4gIH1cbiAgZ2V0QXV0aExpc3QoKSB7XG4gICAgZ2V0QXV0aCh7XG4gICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWRcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICB0aGlzLmNoZWNrQXV0aChyZXMuZGF0YS5kYXRhKVxuICAgIH0pXG4gIH1cbiAgZm9ybWF0QWxsQXV0aChvYmopIHtcbiAgICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIG9ialtrZXldID0gdHJ1ZVxuICAgIH0pXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIGZvcm1hdFNpbmdsZUF1dGgobmFtZSkge1xuICAgIHRoaXMuYXV0aFtuYW1lXSA9IHRydWVcbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgY2hlY2tBdXRoKGxpc3QpIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gbGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgbGV0IHtjb2RlLCBpc19hdXRoOiBpc0F1dGh9ID0gbGlzdFtpXVxuICAgICAgaWYgKGNvZGUgPT09ICdwcmVzaWRlbnQnICYmIGlzQXV0aCkge1xuICAgICAgICB0aGlzLmZvcm1hdEFsbEF1dGgodGhpcy5hdXRoKVxuICAgICAgICBicmVha1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXNBdXRoICYmIHRoaXMuZm9ybWF0U2luZ2xlQXV0aChjb2RlKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBjaGVja0RhdGFFeGlzdChrZXkpIHtcbiAgICBpZiAod3guZ2V0U3RvcmFnZVN5bmMoa2V5KSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgZ2V0Wm9uZUxpc3QoKSB7XG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZVxuICAgIHRoaXMuJGFwcGx5KClcbiAgICBjb25zdCBpZCA9IHRoaXMuY2xhc3NJbmZvLmlkXG4gICAgZ2V0Q2lyY2xlTGlzdCh7XG4gICAgICBjbGFzc19pZDogaWQsXG4gICAgICBzZWVfdHlwZTogaWQgPyAnJyA6ICdhbGwnLFxuICAgICAgdHlwZTogdGhpcy5hY3RpdmVUeXBlLFxuICAgICAgcG46IHRoaXMucG4sXG4gICAgICBwczogdGhpcy5wcyxcbiAgICAgIGNvbW1lbnRfY291bnQ6IDNcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgeyBsaXN0IH0gPSByZXMuZGF0YVxuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2VcbiAgICAgIHRoaXMucG4rK1xuICAgICAgdGhpcy5saXN0ID0gWy4uLnRoaXMubGlzdCwgLi4ubGlzdF1cbiAgICAgIGlmIChsaXN0Lmxlbmd0aCA8IHRoaXMucHMpIHtcbiAgICAgICAgdGhpcy5sb2FkRmluaXNoZWQgPSB0cnVlXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSlcbiAgfVxuICBwYXltZW50UGFyYW1zKGlkKSB7XG4gICAgZ2V0UGF5bWVudFBhcmFtcyh7XG4gICAgICBvcmRlcl9pZDogaWRcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgfSlcbiAgfVxuICBhZGRUb09yZGVyKGlkKSB7XG4gICAgYWRkT3JkZXIoe1xuICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgc3R1ZGVudF9pZHM6IHRoaXMuc3R1ZGVudElkcyxcbiAgICAgIGNvbGxlY3Rpb25faXRlbV9pZDogaWRcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICB0aGlzLnBheW1lbnRQYXJhbXMocmVzLmRhdGEuZGF0YS5pZClcbiAgICB9KVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgcGF5KG1vbWVudElkLCBjb2xsZWN0aW9uSWQpIHtcbiAgICAgIGNoZWNrU3R1ZGVudCh7XG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgICAgbW9tZW50X2lkOiBtb21lbnRJZCxcbiAgICAgICAgaXNfcGF5OiAxXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIHRoaXMucGF5TWVtYmVyTGlzdCA9IHJlcy5kYXRhLmxpc3RcbiAgICAgICAgaWYgKHRoaXMucGF5TWVtYmVyTGlzdC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RGbGFnID0gdHJ1ZVxuICAgICAgICAgIHRoaXMuY3VycmVudENvbGxlY3Rpb25JZCA9IGNvbGxlY3Rpb25JZFxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnN0dWRlbnRJZHMucHVzaCh0aGlzLnBheU1lbWJlckxpc3RbMF0uaWQpXG4gICAgICAgICAgdGhpcy5hZGRUb09yZGVyKGNvbGxlY3Rpb25JZClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIHN1Ym1pdEpvaW5BY3Rpdml0eSgpIHtcbiAgICAgIGpvaW5BY3Rpdml0eSh7XG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgICAgYWN0aXZpdHlfaXRlbV9pZDogdGhpcy5jdXJyZXJudFN1YkFjdGl2aXR5SWQsXG4gICAgICAgIGFjdGl2aXR5X2lkOiB0aGlzLmN1cnJlcm50Sm9pbkFjaXRpdnl0SWRcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICBzaG93TXNnKCfmj5DkuqTmiJDlip8nKVxuICAgICAgICAgIHRoaXMuY3VycmVybnRTdWJBY3Rpdml0eUlkID0gW11cbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBqb2luQWN0aXZpdHkoaWQsIHN1YklkLCBsaXN0SW5kZXgsIGFjdGl2aXR5SW5kZXgpIHtcbiAgICAgIGlmICghdGhpcy5jbGFzc0luZm8pIHtcbiAgICAgICAgc2hvd01zZygn6K+35YWI6YCJ5oup54+t57qnJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB0aGlzLmN1cnJlcm50Sm9pbkFjaXRpdnl0SWQgPSBpZFxuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmN1cnJlcm50U3ViQWN0aXZpdHlJZC5pbmRleE9mKHN1YklkKVxuICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgdGhpcy5jdXJyZXJudFN1YkFjdGl2aXR5SWQuc3BsaWNlKGluZGV4LCAxKVxuICAgICAgICB0aGlzLmxpc3RbbGlzdEluZGV4XS5pbmZvLml0ZW1bYWN0aXZpdHlJbmRleF0uY2hlY2tlZCA9IGZhbHNlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmN1cnJlcm50U3ViQWN0aXZpdHlJZC5wdXNoKHN1YklkKVxuICAgICAgICB0aGlzLmxpc3RbbGlzdEluZGV4XS5pbmZvLml0ZW1bYWN0aXZpdHlJbmRleF0uY2hlY2tlZCA9IHRydWVcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGFkZENvbW1lbnQodHlwZSwgaWQsIHJvb3RJZCwgdG9Db21tZW50SWQsIG5hbWUpIHtcbiAgICAgIGlmICghdGhpcy5jbGFzc0luZm8pIHtcbiAgICAgICAgc2hvd01zZygn6K+35YWI6YCJ5oup54+t57qnJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB0aGlzLmNvbW1lbnRGbGFnID0gdHJ1ZVxuICAgICAgdGhpcy5jdXJyZW50UmVwbHlJZCA9IGlkXG4gICAgICB0aGlzLmN1cnJlbnRSZXBseVJvb3RJZCA9IHR5cGUgPT09ICdhZGQnID8gMCA6IHJvb3RJZFxuICAgICAgaWYgKG5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmNvbW1lbnRJbnB1dCA9IGBAJHtuYW1lfTpgXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbW1lbnRJbnB1dCA9ICcnXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBiaW5kQ29tbWVudElucHV0ICh2YWx1ZSkge1xuICAgICAgdGhpcy5jb21tZW50SW5wdXQgPSB2YWx1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgY29tbWVudFN1cmUgKCkge1xuICAgICAgdGhpcy5jb21tZW50RmxhZyA9IGZhbHNlXG4gICAgICBhZGRDb21tZW50KHtcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgICBtb21lbnRfaWQ6IHRoaXMuY3VycmVudFJlcGx5SWQsXG4gICAgICAgIGNvbnRlbnQ6IHRoaXMuY3VycmVudFJlcGx5SWQgPiAwID8gdGhpcy5jb21tZW50SW5wdXQucmVwbGFjZSgvXkAuKzovLCAnJykgOiB0aGlzLmNvbW1lbnRJbnB1dCxcbiAgICAgICAgcm9vdF9pZDogdGhpcy5jdXJyZW50UmVwbHlSb290SWQsXG4gICAgICAgIHRvX2NvbW1lbnRfaWQ6IHRoaXMuY3VycmVudFJlcGx5Um9vdElkXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgdGhpcy5jb21tZW50SW5wdXQgPSAnJ1xuICAgICAgICAgIHRoaXMucmVzZXREYXRhKClcbiAgICAgICAgICB0aGlzLmdldFpvbmVMaXN0KClcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBjb21tZW50Q2FuY2VsICgpIHtcbiAgICAgIHRoaXMuY29tbWVudEZsYWcgPSBmYWxzZVxuICAgICAgdGhpcy5jb21tZW50SW5wdXQgPSAnJ1xuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgZmlsdGVyICh0eXBlKSB7XG4gICAgICB0aGlzLnJlc2V0RGF0YSgpXG4gICAgICB0aGlzLmFjdGl2ZVR5cGUgPSB0eXBlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB0aGlzLmdldFpvbmVMaXN0KClcbiAgICB9LFxuICAgIGp1bXBQYWdlIChwYWdlTmFtZSwgdHlwZSkge1xuICAgICAgdGhpcy5wdWJsaXNoRmxhZyA9IGZhbHNlXG4gICAgICB0aGlzLnNldEZsYWcgPSBmYWxzZVxuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogYCR7cGFnZU5hbWV9P3R5cGU9JHt0eXBlfWBcbiAgICAgIH0pXG4gICAgfSxcbiAgICB0b2dnbGVNZW51ICh0eXBlKSB7XG4gICAgICBpZiAoIXRoaXMuY2xhc3NJbmZvKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+mAiee7keWumuePree6pycsIDMwMDApXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdGhpc1t0eXBlXSA9ICF0aGlzW3R5cGVdXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBjbG9zZVRvZ2dsZSAoKSB7XG4gICAgICB0aGlzLnNldEZsYWcgPSBmYWxzZVxuICAgICAgdGhpcy5wdWJsaXNoRmxhZyA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBwcmV2aWV3KGltZywgaW1nTGlzdCkge1xuICAgICAgcHJldmlld0ltYWdlKGltZywgaW1nTGlzdClcbiAgICB9LFxuICAgIHNlbGVjdENhbmNlbCgpIHtcbiAgICAgIHRoaXMuc2VsZWN0RmxhZyA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBzZWxlY3RTdXJlKHZhbHVlKSB7XG4gICAgICBpZiAoIXZhbHVlLmxlbmd0aCkge1xuICAgICAgICBzaG93TXNnKCfor7fpgInmi6knKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGNvbnN0IHZhbCA9IHZhbHVlXG4gICAgICB0aGlzLnN0dWRlbnRJZHMgPSBbLi4udmFsXVxuICAgICAgdGhpcy5zZWxlY3RGbGFnID0gZmFsc2VcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIHRoaXMuYWRkVG9PcmRlcih0aGlzLmN1cnJlbnRDb2xsZWN0aW9uSWQpXG4gICAgfVxuICB9XG59XG4iXX0=