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

var _sureModal = require('./../components/sureModal.js');

var _sureModal2 = _interopRequireDefault(_sureModal);

var _shareModal = require('./../components/shareModal.js');

var _shareModal2 = _interopRequireDefault(_shareModal);

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
      navigationBarTitleText: '最近班级',
      enablePullDownRefresh: true
    }, _this2.$repeat = {}, _this2.$props = { "CurrentModal": { "sureBtnText": "确认", "cancelBtnText": "取消", "placeholderText": "请输入评论内容", "xmlns:v-bind": "", "v-bind:flag.sync": "commentFlag", "v-bind:commentInput.sync": "commentInput", "xmlns:v-on": "" }, "SelectModal": { "v-bind:flag.sync": "selectFlag", "v-bind:list.sync": "payMemberList" }, "shareModal": { "v-bind:flag.sync": "showShareFlag", "v-bind:title.sync": "shareTitle", "v-bind:imgSrc.sync": "shareImg" }, "SureModal": { "v-bind:flag.sync": "showSureFlag", "v-bind:title.sync": "removeCircleTitle" } }, _this2.$events = { "CurrentModal": { "v-on:cancel": "commentCancel", "v-on:sure": "commentSure", "v-on:input": "bindCommentInput" }, "SelectModal": { "v-on:cancel": "toggleFlag", "v-on:sure": "selectSure" }, "shareModal": { "v-on:cancel": "toggleFlag", "v-on:sure": "toggleFlag" }, "SureModal": { "v-on:cancel": "toggleFlag", "v-on:sure": "toggleFlag" } }, _this2.components = {
      CurrentModal: _commentModal2.default,
      SelectModal: _selectModal2.default,
      shareModal: _shareModal2.default,
      SureModal: _sureModal2.default
    }, _this2.data = {
      menuList: [{
        text: '通知',
        type: 'notice',
        src: '/images/icon/4.jpg'
      }, {
        text: '活动',
        type: 'activity',
        src: '/images/icon/5.jpg'
      }, {
        text: '家长圈',
        type: 'zone',
        src: '/images/icon/2.jpg'
      }, {
        text: '收款',
        type: 'money',
        src: '/images/icon/money.jpg'
      }, {
        text: '记账',
        type: 'account',
        src: '/images/icon/photos.jpg'
      }],
      showSureFlag: false,
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
      gradeType: {
        primary: '小学',
        middle: '初中',
        high: '高中',
        university: '大学'
      },
      shareImgSrc: {
        circles: '../images/share/circles.jpg',
        collection: '../images/share/collection.jpg',
        notify: '../images/share/notify.jpg',
        activity: '../images/share/activity.jpg',
        account: '../images/share/account.jpg'
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
      paymentLocked: false,
      loadMoreCommentArray: [],
      shareTitle: '',
      showShareFlag: false,
      shareImg: '',
      removeCircleTitle: '您确认要删除吗？',
      currentRemoveMomentId: -1,
      currentRemoveMomentIdx: -1
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
      toggleFlag: function toggleFlag(flag, booleanValue) {
        this[flag] = booleanValue;
        if (flag === 'showSureFlag' && booleanValue) {
          this[flag] = false;
          this.removeCircleFn(this.currentRemoveMomentId, this.currentRemoveMomentIdx);
        }
        this.$apply();
      },
      shareCircle: function shareCircle(type) {
        var shareActionType = this.getShareActionType(type);
        var shareType = this.getShareType(type);
        this.shareTitle = this.memberInfo.nickname + '\u5206\u4EAB\u4E86\u4E00\u4E2A' + shareType + '\uFF0C\u70B9\u51FB' + shareActionType;
        this.shareImg = this.shareImgSrc[type];
        this.showShareFlag = true;
        this.$apply();
      },
      removeCircle: function removeCircle(id, idx) {
        this.showSureFlag = true;
        this.currentRemoveMomentId = id;
        this.currentRemoveMomentIdx = idx;
        this.$apply();
      },
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

        if (this.currerntJoinAcitivytId <= 0) {
          (0, _common.showMsg)('请先选择活动项目');
          return;
        }
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

        var retObj = this.findLoadmoreCommentInfo(this.loadMoreCommentArray, momentId);
        (0, _zone.getCommentList)({
          moment_id: momentId,
          ps: this.commentPs,
          pn: retObj.commentPn ? retObj.commentPn : this.commentPn,
          offset: this.commentOffset
        }).then(function (res) {
          if (res.data.success) {
            var resultList = res.data.list;
            var list = _this5.list[idx].comment_list.list;

            list = [].concat(_toConsumableArray(list), _toConsumableArray(resultList));
            _this5.list[idx].comment_list.list = list;
            if (resultList.length < _this5.commentPs) {
              _this5.list[idx].commentLoadFinished = true;
            }
            if (!retObj.commentPn) {
              var obj = {
                commentPn: _this5.commentPn + 1,
                moment_id: momentId
              };
              _this5.loadMoreCommentArray.push(obj);
            } else {
              _this5.loadMoreCommentArray[retObj.index].commentPn = retObj.commentPn + 1;
            }
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
        if (!this.classInfo) {
          (0, _common.showMsg)('请选绑定班级', 3000);
          return;
        }
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
      this.loadMoreCommentArray = [];
      this.commentLoadFinished = false;
      this.currentRemoveMomentId = -1;
      this.currentRemoveMomentIdx = -1;
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
      // 如果是从publish等页面返回，则需要刷新数据
      var data = this.$wxpage.data;
      if (data.fromPublish) {
        this.resetData();
        this.getZoneList();
      }
      this.setData({
        fromPublish: false
      });
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
    key: 'removeCircleFn',
    value: function removeCircleFn(id, idx) {
      var _this7 = this;

      (0, _zone.deleteCircle)({
        moment_id: id,
        class_id: this.classInfo.id
      }).then(function (res) {
        if (res.data.success) {
          (0, _common.showMsg)('成功删除');
          _this7.list.splice(idx, 1);
          _this7.$apply();
        }
      });
    }
  }, {
    key: 'getAuthList',
    value: function getAuthList() {
      var _this8 = this;

      (0, _authorize.getAuth)({
        class_id: this.classInfo.id
      }).then(function (res) {
        _this8.checkAuth(res.data.data);
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
    value: function formatSingleAuth(name, booleanValue) {
      this.auth[name] = booleanValue;
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
          isAuth && this.formatSingleAuth(code, true);
          !isAuth && this.formatSingleAuth(code, false);
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
      var _this9 = this;

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

        _this9.loading = false;
        _this9.pn++;
        if (list.length < _this9.ps) {
          _this9.loadFinished = true;
        }
        _this9.list = [].concat(_toConsumableArray(_this9.list), _toConsumableArray(list));
        _this9.$apply();
      });
    }
  }, {
    key: 'paymentParams',
    value: function paymentParams(id) {
      var _this10 = this;

      (0, _finance.getPaymentParams)({
        order_id: id
      }).then(function (res) {
        var _this = _this10;
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
      var _this11 = this;

      (0, _finance.addOrder)({
        class_id: this.classInfo.id,
        student_ids: this.studentIds,
        collection_item_id: id
      }).then(function (res) {
        _this11.paymentParams(res.data.data.id);
      });
    }
  }, {
    key: 'findLoadmoreCommentInfo',
    value: function findLoadmoreCommentInfo(arr, currentId) {
      var retObj = {};
      for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i].moment_id === currentId) {
          retObj = Object.assign({}, arr[i], {
            index: i
          });
        }
      }
      return retObj;
    }
  }, {
    key: 'getShareActionType',
    value: function getShareActionType(type) {
      var action = '浏览';
      switch (type) {
        case 'activity':
          action = '参加';
          return action;
        case 'collection':
          action = '缴费';
          return action;
        default:
          return action;
      }
    }
  }, {
    key: 'getShareType',
    value: function getShareType(type) {
      var category = '';
      if (type === 'circles') {
        category = '家长圈图文';
      } else {
        category = '\u5BB6\u59D4\u4F1A' + this.type[type];
      }
      return category;
    }
  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage(res) {
      return {
        title: this.shareTitle,
        imageUrl: this.shareImg
      };
    }
  }]);

  return Zone;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Zone , 'pages/zone'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInpvbmUuanMiXSwibmFtZXMiOlsiWm9uZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJDdXJyZW50TW9kYWwiLCJTZWxlY3RNb2RhbCIsInNoYXJlTW9kYWwiLCJTdXJlTW9kYWwiLCJkYXRhIiwibWVudUxpc3QiLCJ0ZXh0IiwidHlwZSIsInNyYyIsInNob3dTdXJlRmxhZyIsImNvbW1lbnRGbGFnIiwic2VsZWN0RmxhZyIsImFjdGl2ZVR5cGUiLCJzZXRGbGFnIiwicHVibGlzaEZsYWciLCJjaXJjbGVzIiwiY29sbGVjdGlvbiIsIm5vdGlmeSIsImFjdGl2aXR5IiwiYWNjb3VudCIsImdyYWRlVHlwZSIsInByaW1hcnkiLCJtaWRkbGUiLCJoaWdoIiwidW5pdmVyc2l0eSIsInNoYXJlSW1nU3JjIiwicG4iLCJwcyIsImxpc3QiLCJwYXlNZW1iZXJMaXN0IiwiY2xhc3NJbmZvIiwibWVtYmVySW5mbyIsInNjaG9vbEluZm8iLCJsb2FkaW5nIiwibG9hZEZpbmlzaGVkIiwiY29tbWVudElucHV0IiwiY3VycmVudFJlcGx5SWQiLCJjdXJyZW50UmVwbHlSb290SWQiLCJjdXJyZW50UmVwbHlUb0NvbW1lbnRJZCIsImN1cnJlcm50Sm9pbkFjaXRpdnl0SWQiLCJjdXJyZXJudFN1YkFjdGl2aXR5SWQiLCJjdXJyZW50Q29sbGVjdGlvbklkIiwiYXV0aCIsInByZXNpZGVudCIsImZpbmFuY2UiLCJwaG90b3MiLCJjb21tZW50UG4iLCJjb21tZW50UHMiLCJjb21tZW50T2Zmc2V0IiwiY29tbWVudExvYWRGaW5pc2hlZCIsIm1lbWJlckxpc3QiLCJzdHVkZW50SWRzIiwiZmlyc3RJbml0IiwicGF5bWVudExvY2tlZCIsImxvYWRNb3JlQ29tbWVudEFycmF5Iiwic2hhcmVUaXRsZSIsInNob3dTaGFyZUZsYWciLCJzaGFyZUltZyIsInJlbW92ZUNpcmNsZVRpdGxlIiwiY3VycmVudFJlbW92ZU1vbWVudElkIiwiY3VycmVudFJlbW92ZU1vbWVudElkeCIsIndhdGNoIiwibmV3VmFsIiwib2xkVmFsIiwicmVzZXREYXRhIiwiZ2V0QXV0aExpc3QiLCJnZXRab25lTGlzdCIsImN1cnJlbnRKb2luQWN0aXZpdHlJZCIsIiRhcHBseSIsIm1ldGhvZHMiLCJ0b2dnbGVGbGFnIiwiZmxhZyIsImJvb2xlYW5WYWx1ZSIsInJlbW92ZUNpcmNsZUZuIiwic2hhcmVDaXJjbGUiLCJzaGFyZUFjdGlvblR5cGUiLCJnZXRTaGFyZUFjdGlvblR5cGUiLCJzaGFyZVR5cGUiLCJnZXRTaGFyZVR5cGUiLCJuaWNrbmFtZSIsInJlbW92ZUNpcmNsZSIsImlkIiwiaWR4IiwicGF5IiwibW9tZW50SWQiLCJjb2xsZWN0aW9uSWQiLCJjbGFzc19pZCIsIm1vbWVudF9pZCIsImlzX3BheSIsInRoZW4iLCJyZXMiLCJsZW5ndGgiLCJwdXNoIiwiYWRkVG9PcmRlciIsInN1Ym1pdEpvaW5BY3Rpdml0eSIsImFjdGl2aXR5X2l0ZW1faWQiLCJhY3Rpdml0eV9pZCIsInN1Y2Nlc3MiLCJqb2luQWN0aXZpdHkiLCJzdWJJZCIsImxpc3RJbmRleCIsImFjdGl2aXR5SW5kZXgiLCJpbmRleCIsImluZGV4T2YiLCJzcGxpY2UiLCJpbmZvIiwiaXRlbSIsImNoZWNrZWQiLCJsb2FkTW9yZUNvbW1lbnQiLCJyZXRPYmoiLCJmaW5kTG9hZG1vcmVDb21tZW50SW5mbyIsIm9mZnNldCIsInJlc3VsdExpc3QiLCJjb21tZW50X2xpc3QiLCJvYmoiLCJhZGRDb21tZW50Iiwicm9vdElkIiwidG9Db21tZW50SWQiLCJuYW1lIiwibWVtYmVyX2lkIiwidW5kZWZpbmVkIiwiYmluZENvbW1lbnRJbnB1dCIsInZhbHVlIiwiY29tbWVudFN1cmUiLCJjb250ZW50IiwicmVwbGFjZSIsInJvb3RfaWQiLCJ0b19jb21tZW50X2lkIiwianVtcFB1Ymxpc2giLCJ1cmwiLCJ3eCIsIm5hdmlnYXRlVG8iLCJjb21tZW50Q2FuY2VsIiwianVtcFBhZ2UiLCJwYWdlTmFtZSIsInRvZ2dsZU1lbnUiLCJjbG9zZVRvZ2dsZSIsInByZXZpZXciLCJpbWciLCJpbWdMaXN0Iiwic2VsZWN0U3VyZSIsInZhbCIsImdldFN0b3JhZ2VTeW5jIiwiJHd4cGFnZSIsImZyb21QdWJsaXNoIiwic2V0RGF0YSIsImNoZWNrRGF0YUV4aXN0IiwicmVMYXVuY2giLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInVzZXJEYXRhIiwiY2hlY2tBdXRoIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJpIiwibGVuIiwiY29kZSIsImlzQXV0aCIsImlzX2F1dGgiLCJmb3JtYXRBbGxBdXRoIiwiZm9ybWF0U2luZ2xlQXV0aCIsInNlZV90eXBlIiwiY29tbWVudF9jb3VudCIsIm9yZGVyX2lkIiwiX3RoaXMiLCJwYXltZW50X3BhcmFtcyIsInJlcXVlc3RQYXltZW50IiwidGltZVN0YW1wIiwiU3RyaW5nIiwibm9uY2VTdHIiLCJwYWNrYWdlIiwicGF5U2lnbiIsInNpZ25UeXBlIiwiZmFpbCIsInN0dWRlbnRfaWRzIiwiY29sbGVjdGlvbl9pdGVtX2lkIiwicGF5bWVudFBhcmFtcyIsImFyciIsImN1cnJlbnRJZCIsImFzc2lnbiIsImFjdGlvbiIsImNhdGVnb3J5IiwidGl0bGUiLCJpbWFnZVVybCIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsSTs7Ozs7Ozs7Ozs7Ozs7cUxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCLE1BRGpCO0FBRVBDLDZCQUF1QjtBQUZoQixLLFNBSVZDLE8sR0FBVSxFLFNBQ1hDLE0sR0FBUyxFQUFDLGdCQUFlLEVBQUMsZUFBYyxJQUFmLEVBQW9CLGlCQUFnQixJQUFwQyxFQUF5QyxtQkFBa0IsU0FBM0Qs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RUFBa0JGLElBQUl2QixDQUFKLENBQWxCLEVBQTBCO0FBQ2pDdEQsbUJBQU9zRDtBQUQwQixXQUExQixDQUFUO0FBR0Q7QUFDRjtBQUNELGFBQU8vQyxNQUFQO0FBQ0Q7Ozt1Q0FDa0J0RyxJLEVBQU07QUFDdkIsVUFBSStLLFNBQVMsSUFBYjtBQUNBLGNBQVEvSyxJQUFSO0FBQ0UsYUFBSyxVQUFMO0FBQ0UrSyxtQkFBUyxJQUFUO0FBQ0EsaUJBQU9BLE1BQVA7QUFDRixhQUFLLFlBQUw7QUFDRUEsbUJBQVMsSUFBVDtBQUNBLGlCQUFPQSxNQUFQO0FBQ0Y7QUFDRSxpQkFBT0EsTUFBUDtBQVJKO0FBVUQ7OztpQ0FDWS9LLEksRUFBTTtBQUNqQixVQUFJZ0wsV0FBVyxFQUFmO0FBQ0EsVUFBSWhMLFNBQVMsU0FBYixFQUF3QjtBQUN0QmdMLG1CQUFXLE9BQVg7QUFDRCxPQUZELE1BRU87QUFDTEEsMENBQWlCLEtBQUtoTCxJQUFMLENBQVVBLElBQVYsQ0FBakI7QUFDRDtBQUNELGFBQU9nTCxRQUFQO0FBQ0Q7OztzQ0E0TWlCN0YsRyxFQUFLO0FBQ3JCLGFBQU87QUFDTDhGLGVBQU8sS0FBS2pJLFVBRFA7QUFFTGtJLGtCQUFVLEtBQUtoSTtBQUZWLE9BQVA7QUFJRDs7OztFQXBnQitCaUksZUFBS0MsSTs7a0JBQWxCbk0sSSIsImZpbGUiOiJ6b25lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IFNlbGVjdE1vZGFsIGZyb20gJy4uL2NvbXBvbmVudHMvc2VsZWN0TW9kYWwnXG5pbXBvcnQgQ3VycmVudE1vZGFsIGZyb20gJy4uL2NvbXBvbmVudHMvY29tbWVudE1vZGFsJ1xuaW1wb3J0IFN1cmVNb2RhbCBmcm9tICcuLi9jb21wb25lbnRzL3N1cmVNb2RhbCdcbmltcG9ydCBzaGFyZU1vZGFsIGZyb20gJy4uL2NvbXBvbmVudHMvc2hhcmVNb2RhbCdcbmltcG9ydCB7IHNob3dNc2csIHByZXZpZXdJbWFnZSB9IGZyb20gJy4uL3V0aWxzL2NvbW1vbidcbmltcG9ydCB7IGdldENpcmNsZUxpc3QsIGFkZENvbW1lbnQsIGpvaW5BY3Rpdml0eSwgZ2V0Q29tbWVudExpc3QsIGRlbGV0ZUNpcmNsZSB9IGZyb20gJy4uL2FwaS96b25lJ1xuaW1wb3J0IHsgYWRkT3JkZXIsIGdldFBheW1lbnRQYXJhbXMgfSBmcm9tICcuLi9hcGkvZmluYW5jZSdcbmltcG9ydCB7IGdldEF1dGggfSBmcm9tICcuLi9hcGkvYXV0aG9yaXplJ1xuaW1wb3J0IHsgY2hlY2tTdHVkZW50IH0gZnJvbSAnLi4vYXBpL3VzZXInXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBab25lIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmnIDov5Hnj63nuqcnLFxuICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogdHJ1ZVxuICB9XG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJDdXJyZW50TW9kYWxcIjp7XCJzdXJlQnRuVGV4dFwiOlwi56Gu6K6kXCIsXCJjYW5jZWxCdG5UZXh0XCI6XCLlj5bmtohcIixcInBsYWNlaG9sZGVyVGV4dFwiOlwi6K+36L6T5YWl6K+E6K665YaF5a65XCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmZsYWcuc3luY1wiOlwiY29tbWVudEZsYWdcIixcInYtYmluZDpjb21tZW50SW5wdXQuc3luY1wiOlwiY29tbWVudElucHV0XCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJTZWxlY3RNb2RhbFwiOntcInYtYmluZDpmbGFnLnN5bmNcIjpcInNlbGVjdEZsYWdcIixcInYtYmluZDpsaXN0LnN5bmNcIjpcInBheU1lbWJlckxpc3RcIn0sXCJzaGFyZU1vZGFsXCI6e1widi1iaW5kOmZsYWcuc3luY1wiOlwic2hvd1NoYXJlRmxhZ1wiLFwidi1iaW5kOnRpdGxlLnN5bmNcIjpcInNoYXJlVGl0bGVcIixcInYtYmluZDppbWdTcmMuc3luY1wiOlwic2hhcmVJbWdcIn0sXCJTdXJlTW9kYWxcIjp7XCJ2LWJpbmQ6ZmxhZy5zeW5jXCI6XCJzaG93U3VyZUZsYWdcIixcInYtYmluZDp0aXRsZS5zeW5jXCI6XCJyZW1vdmVDaXJjbGVUaXRsZVwifX07XHJcbiRldmVudHMgPSB7XCJDdXJyZW50TW9kYWxcIjp7XCJ2LW9uOmNhbmNlbFwiOlwiY29tbWVudENhbmNlbFwiLFwidi1vbjpzdXJlXCI6XCJjb21tZW50U3VyZVwiLFwidi1vbjppbnB1dFwiOlwiYmluZENvbW1lbnRJbnB1dFwifSxcIlNlbGVjdE1vZGFsXCI6e1widi1vbjpjYW5jZWxcIjpcInRvZ2dsZUZsYWdcIixcInYtb246c3VyZVwiOlwic2VsZWN0U3VyZVwifSxcInNoYXJlTW9kYWxcIjp7XCJ2LW9uOmNhbmNlbFwiOlwidG9nZ2xlRmxhZ1wiLFwidi1vbjpzdXJlXCI6XCJ0b2dnbGVGbGFnXCJ9LFwiU3VyZU1vZGFsXCI6e1widi1vbjpjYW5jZWxcIjpcInRvZ2dsZUZsYWdcIixcInYtb246c3VyZVwiOlwidG9nZ2xlRmxhZ1wifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgIEN1cnJlbnRNb2RhbCxcbiAgICBTZWxlY3RNb2RhbCxcbiAgICBzaGFyZU1vZGFsLFxuICAgIFN1cmVNb2RhbFxuICB9XG4gIGRhdGEgPSB7XG4gICAgbWVudUxpc3Q6IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ+mAmuefpScsXG4gICAgICAgIHR5cGU6ICdub3RpY2UnLFxuICAgICAgICBzcmM6ICcvaW1hZ2VzL2ljb24vNC5qcGcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAn5rS75YqoJyxcbiAgICAgICAgdHlwZTogJ2FjdGl2aXR5JyxcbiAgICAgICAgc3JjOiAnL2ltYWdlcy9pY29uLzUuanBnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ+WutumVv+WciCcsXG4gICAgICAgIHR5cGU6ICd6b25lJyxcbiAgICAgICAgc3JjOiAnL2ltYWdlcy9pY29uLzIuanBnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ+aUtuasvicsXG4gICAgICAgIHR5cGU6ICdtb25leScsXG4gICAgICAgIHNyYzogJy9pbWFnZXMvaWNvbi9tb25leS5qcGcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAn6K6w6LSmJyxcbiAgICAgICAgdHlwZTogJ2FjY291bnQnLFxuICAgICAgICBzcmM6ICcvaW1hZ2VzL2ljb24vcGhvdG9zLmpwZydcbiAgICAgIH1cbiAgICBdLFxuICAgIHNob3dTdXJlRmxhZzogZmFsc2UsXG4gICAgY29tbWVudEZsYWc6IGZhbHNlLFxuICAgIHNlbGVjdEZsYWc6IGZhbHNlLFxuICAgIGFjdGl2ZVR5cGU6ICdhbGwnLFxuICAgIHNldEZsYWc6IGZhbHNlLFxuICAgIHB1Ymxpc2hGbGFnOiBmYWxzZSxcbiAgICB0eXBlOiB7XG4gICAgICBjaXJjbGVzOiAn5a626ZW/5ZyIJyxcbiAgICAgIGNvbGxlY3Rpb246ICfmlLbmrL4nLFxuICAgICAgbm90aWZ5OiAn6YCa55+lJyxcbiAgICAgIGFjdGl2aXR5OiAn5rS75YqoJyxcbiAgICAgIGFjY291bnQ6ICforrDotKYnXG4gICAgfSxcbiAgICBncmFkZVR5cGU6IHtcbiAgICAgIHByaW1hcnk6ICflsI/lraYnLFxuICAgICAgbWlkZGxlOiAn5Yid5LitJyxcbiAgICAgIGhpZ2g6ICfpq5jkuK0nLFxuICAgICAgdW5pdmVyc2l0eTogJ+Wkp+WtpidcbiAgICB9LFxuICAgIHNoYXJlSW1nU3JjOiB7XG4gICAgICBjaXJjbGVzOiAnLi4vaW1hZ2VzL3NoYXJlL2NpcmNsZXMuanBnJyxcbiAgICAgIGNvbGxlY3Rpb246ICcuLi9pbWFnZXMvc2hhcmUvY29sbGVjdGlvbi5qcGcnLFxuICAgICAgbm90aWZ5OiAnLi4vaW1hZ2VzL3NoYXJlL25vdGlmeS5qcGcnLFxuICAgICAgYWN0aXZpdHk6ICcuLi9pbWFnZXMvc2hhcmUvYWN0aXZpdHkuanBnJyxcbiAgICAgIGFjY291bnQ6ICcuLi9pbWFnZXMvc2hhcmUvYWNjb3VudC5qcGcnXG4gICAgfSxcbiAgICBwbjogMSxcbiAgICBwczogMTAsXG4gICAgbGlzdDogW10sXG4gICAgcGF5TWVtYmVyTGlzdDogW10sXG4gICAgY2xhc3NJbmZvOiBudWxsLFxuICAgIG1lbWJlckluZm86IG51bGwsXG4gICAgc2Nob29sSW5mbzogbnVsbCxcbiAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICBsb2FkRmluaXNoZWQ6IGZhbHNlLFxuICAgIGNvbW1lbnRJbnB1dDogJycsXG4gICAgY3VycmVudFJlcGx5SWQ6IC0xLFxuICAgIGN1cnJlbnRSZXBseVJvb3RJZDogLTEsXG4gICAgY3VycmVudFJlcGx5VG9Db21tZW50SWQ6IC0xLFxuICAgIGN1cnJlcm50Sm9pbkFjaXRpdnl0SWQ6IC0xLFxuICAgIGN1cnJlcm50U3ViQWN0aXZpdHlJZDogW10sXG4gICAgY3VycmVudENvbGxlY3Rpb25JZDogLTEsXG4gICAgYXV0aDoge1xuICAgICAgcHJlc2lkZW50OiBmYWxzZSxcbiAgICAgIGZpbmFuY2U6IGZhbHNlLFxuICAgICAgYWN0aXZpdHk6IGZhbHNlLFxuICAgICAgbm90aWZ5OiBmYWxzZSxcbiAgICAgIHBob3RvczogZmFsc2UsXG4gICAgICBjaXJjbGVzOiBmYWxzZVxuICAgIH0sXG4gICAgY29tbWVudFBuOiAyLFxuICAgIGNvbW1lbnRQczogNixcbiAgICBjb21tZW50T2Zmc2V0OiA2LFxuICAgIGNvbW1lbnRMb2FkRmluaXNoZWQ6IGZhbHNlLFxuICAgIG1lbWJlckxpc3Q6IFtdLFxuICAgIHN0dWRlbnRJZHM6IFtdLFxuICAgIGZpcnN0SW5pdDogdHJ1ZSxcbiAgICBwYXltZW50TG9ja2VkOiBmYWxzZSxcbiAgICBsb2FkTW9yZUNvbW1lbnRBcnJheTogW10sXG4gICAgc2hhcmVUaXRsZTogJycsXG4gICAgc2hvd1NoYXJlRmxhZzogZmFsc2UsXG4gICAgc2hhcmVJbWc6ICcnLFxuICAgIHJlbW92ZUNpcmNsZVRpdGxlOiAn5oKo56Gu6K6k6KaB5Yig6Zmk5ZCX77yfJyxcbiAgICBjdXJyZW50UmVtb3ZlTW9tZW50SWQ6IC0xLFxuICAgIGN1cnJlbnRSZW1vdmVNb21lbnRJZHg6IC0xXG4gIH1cbiAgd2F0Y2ggPSB7XG4gICAgY2xhc3NJbmZvKG5ld1ZhbCwgb2xkVmFsKSB7XG4gICAgICAvLyDliIfmjaLkuobnj63nuqfkuYvlkI7mlbDmja7opoHmm7TmlrBcbiAgICAgIGlmIChvbGRWYWwgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5yZXNldERhdGEoKVxuICAgICAgICB0aGlzLmdldEF1dGhMaXN0KClcbiAgICAgICAgdGhpcy5nZXRab25lTGlzdCgpXG4gICAgICB9XG4gICAgfSxcbiAgICBjdXJyZW50Sm9pbkFjdGl2aXR5SWQobmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgIGlmIChuZXdWYWwgPiAwKSB7XG4gICAgICAgIHRoaXMuY3VycmVybnRTdWJBY3Rpdml0eUlkID0gW11cbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXNldERhdGEoKSB7XG4gICAgdGhpcy5sb2FkTW9yZUNvbW1lbnRBcnJheSA9IFtdXG4gICAgdGhpcy5jb21tZW50TG9hZEZpbmlzaGVkID0gZmFsc2VcbiAgICB0aGlzLmN1cnJlbnRSZW1vdmVNb21lbnRJZCA9IC0xXG4gICAgdGhpcy5jdXJyZW50UmVtb3ZlTW9tZW50SWR4ID0gLTFcbiAgICB0aGlzLmNvbW1lbnRQbiA9IDJcbiAgICB0aGlzLmNvbW1lbnRQcyA9IDZcbiAgICB0aGlzLnN0dWRlbnRJZHMgPSBbXVxuICAgIHRoaXMucGF5bWVudExvY2tlZCA9IGZhbHNlXG4gICAgdGhpcy5wbiA9IDFcbiAgICB0aGlzLmxpc3QgPSBbXVxuICAgIHRoaXMuJGFwcGx5KClcbiAgfVxuICBvblB1bGxEb3duUmVmcmVzaCgpIHtcbiAgICB0aGlzLnJlc2V0RGF0YSgpXG4gICAgdGhpcy5nZXRab25lTGlzdCgpXG4gIH1cbiAgb25SZWFjaEJvdHRvbSgpIHtcbiAgICBpZiAodGhpcy5sb2FkaW5nIHx8IHRoaXMubG9hZEZpbmlzaGVkKSByZXR1cm5cbiAgICB0aGlzLmdldFpvbmVMaXN0KClcbiAgfVxuICBvblNob3coKSB7XG4gICAgdGhpcy5jdXJyZXJudEpvaW5BY2l0aXZ5dElkID0gLTFcbiAgICB0aGlzLmN1cnJlcm50U3ViQWN0aXZpdHlJZCA9IFtdXG4gICAgdGhpcy5jbGFzc0luZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnY2xhc3NJbmZvJylcbiAgICB0aGlzLiRhcHBseSgpXG4gICAgLy8g5aaC5p6c5piv5LuOcHVibGlzaOetiemhtemdoui/lOWbnu+8jOWImemcgOimgeWIt+aWsOaVsOaNrlxuICAgIGxldCBkYXRhID0gdGhpcy4kd3hwYWdlLmRhdGE7XG4gICAgaWYgKGRhdGEuZnJvbVB1Ymxpc2gpIHtcbiAgICAgIHRoaXMucmVzZXREYXRhKClcbiAgICAgIHRoaXMuZ2V0Wm9uZUxpc3QoKVxuICAgIH1cbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgZnJvbVB1Ymxpc2g6IGZhbHNlXG4gICAgfSlcbiAgfVxuICBvbkxvYWQoKSB7XG4gICAgaWYgKCF0aGlzLmNoZWNrRGF0YUV4aXN0KCdtZW1iZXJJbmZvJykpIHtcbiAgICAgIHd4LnJlTGF1bmNoKHtcbiAgICAgICAgdXJsOiAnbG9naW4nXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxuICAgICAgdGhpcy5jbGFzc0luZm8gJiYgdGhpcy5nZXRBdXRoTGlzdCgpXG4gICAgICB0aGlzLm1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXG4gICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyRGF0YSA9IHRoaXMubWVtYmVySW5mb1xuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgdGhpcy5nZXRab25lTGlzdCgpXG4gICAgfVxuICB9XG4gIHJlbW92ZUNpcmNsZUZuKGlkLCBpZHgpIHtcbiAgICBkZWxldGVDaXJjbGUoe1xuICAgICAgbW9tZW50X2lkOiBpZCxcbiAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZFxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgIHNob3dNc2coJ+aIkOWKn+WIoOmZpCcpXG4gICAgICAgIHRoaXMubGlzdC5zcGxpY2UoaWR4LCAxKVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBnZXRBdXRoTGlzdCgpIHtcbiAgICBnZXRBdXRoKHtcbiAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZFxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHRoaXMuY2hlY2tBdXRoKHJlcy5kYXRhLmRhdGEpXG4gICAgfSlcbiAgfVxuICBmb3JtYXRBbGxBdXRoKG9iaikge1xuICAgIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgb2JqW2tleV0gPSB0cnVlXG4gICAgfSlcbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgZm9ybWF0U2luZ2xlQXV0aChuYW1lLCBib29sZWFuVmFsdWUpIHtcbiAgICB0aGlzLmF1dGhbbmFtZV0gPSBib29sZWFuVmFsdWVcbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgY2hlY2tBdXRoKGxpc3QpIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gbGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgbGV0IHtjb2RlLCBpc19hdXRoOiBpc0F1dGh9ID0gbGlzdFtpXVxuICAgICAgaWYgKGNvZGUgPT09ICdwcmVzaWRlbnQnICYmIGlzQXV0aCkge1xuICAgICAgICB0aGlzLmZvcm1hdEFsbEF1dGgodGhpcy5hdXRoKVxuICAgICAgICBicmVha1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXNBdXRoICYmIHRoaXMuZm9ybWF0U2luZ2xlQXV0aChjb2RlLCB0cnVlKVxuICAgICAgICAhaXNBdXRoICYmIHRoaXMuZm9ybWF0U2luZ2xlQXV0aChjb2RlLCBmYWxzZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgY2hlY2tEYXRhRXhpc3Qoa2V5KSB7XG4gICAgaWYgKHd4LmdldFN0b3JhZ2VTeW5jKGtleSkpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIGdldFpvbmVMaXN0KCkge1xuICAgIHRoaXMubG9hZGluZyA9IHRydWVcbiAgICB0aGlzLiRhcHBseSgpXG4gICAgY29uc3QgaWQgPSB0aGlzLmNsYXNzSW5mby5pZFxuICAgIGdldENpcmNsZUxpc3Qoe1xuICAgICAgY2xhc3NfaWQ6IGlkLFxuICAgICAgc2VlX3R5cGU6IGlkID8gJycgOiAnYWxsJyxcbiAgICAgIHR5cGU6IHRoaXMuYWN0aXZlVHlwZSxcbiAgICAgIHBuOiB0aGlzLnBuLFxuICAgICAgcHM6IHRoaXMucHMsXG4gICAgICBjb21tZW50X2NvdW50OiAzXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IHsgbGlzdCB9ID0gcmVzLmRhdGFcbiAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlXG4gICAgICB0aGlzLnBuKytcbiAgICAgIGlmIChsaXN0Lmxlbmd0aCA8IHRoaXMucHMpIHtcbiAgICAgICAgdGhpcy5sb2FkRmluaXNoZWQgPSB0cnVlXG4gICAgICB9XG4gICAgICB0aGlzLmxpc3QgPSBbLi4udGhpcy5saXN0LCAuLi5saXN0XVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0pXG4gIH1cbiAgcGF5bWVudFBhcmFtcyhpZCkge1xuICAgIGdldFBheW1lbnRQYXJhbXMoe1xuICAgICAgb3JkZXJfaWQ6IGlkXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IF90aGlzID0gdGhpc1xuICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YS5wYXltZW50X3BhcmFtc1xuICAgICAgd3gucmVxdWVzdFBheW1lbnQoe1xuICAgICAgICB0aW1lU3RhbXA6IFN0cmluZyhkYXRhLnRpbWVTdGFtcCksXG4gICAgICAgIG5vbmNlU3RyOiBkYXRhLm5vbmNlU3RyLFxuICAgICAgICBwYWNrYWdlOiBkYXRhLnBhY2thZ2UsXG4gICAgICAgIHBheVNpZ246IGRhdGEucGF5U2lnbixcbiAgICAgICAgc2lnblR5cGU6ICdNRDUnLFxuICAgICAgICBzdWNjZXNzKCkge1xuICAgICAgICAgIF90aGlzLnBheW1lbnRMb2NrZWQgPSBmYWxzZVxuICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWwoKSB7XG4gICAgICAgICAgX3RoaXMucGF5bWVudExvY2tlZCA9IGZhbHNlXG4gICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9XG4gIGFkZFRvT3JkZXIoaWQpIHtcbiAgICBhZGRPcmRlcih7XG4gICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXG4gICAgICBzdHVkZW50X2lkczogdGhpcy5zdHVkZW50SWRzLFxuICAgICAgY29sbGVjdGlvbl9pdGVtX2lkOiBpZFxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHRoaXMucGF5bWVudFBhcmFtcyhyZXMuZGF0YS5kYXRhLmlkKVxuICAgIH0pXG4gIH1cbiAgZmluZExvYWRtb3JlQ29tbWVudEluZm8oYXJyLCBjdXJyZW50SWQpIHtcbiAgICBsZXQgcmV0T2JqID0ge31cbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gYXJyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBpZiAoYXJyW2ldLm1vbWVudF9pZCA9PT0gY3VycmVudElkKSB7XG4gICAgICAgIHJldE9iaiA9IE9iamVjdC5hc3NpZ24oe30sIGFycltpXSwge1xuICAgICAgICAgIGluZGV4OiBpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXRPYmpcbiAgfVxuICBnZXRTaGFyZUFjdGlvblR5cGUodHlwZSkge1xuICAgIGxldCBhY3Rpb24gPSAn5rWP6KeIJ1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnYWN0aXZpdHknOlxuICAgICAgICBhY3Rpb24gPSAn5Y+C5YqgJ1xuICAgICAgICByZXR1cm4gYWN0aW9uXG4gICAgICBjYXNlICdjb2xsZWN0aW9uJzpcbiAgICAgICAgYWN0aW9uID0gJ+e8tOi0uSdcbiAgICAgICAgcmV0dXJuIGFjdGlvblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGFjdGlvblxuICAgIH1cbiAgfVxuICBnZXRTaGFyZVR5cGUodHlwZSkge1xuICAgIGxldCBjYXRlZ29yeSA9ICcnXG4gICAgaWYgKHR5cGUgPT09ICdjaXJjbGVzJykge1xuICAgICAgY2F0ZWdvcnkgPSAn5a626ZW/5ZyI5Zu+5paHJ1xuICAgIH0gZWxzZSB7XG4gICAgICBjYXRlZ29yeSA9IGDlrrblp5TkvJoke3RoaXMudHlwZVt0eXBlXX1gXG4gICAgfVxuICAgIHJldHVybiBjYXRlZ29yeVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgdG9nZ2xlRmxhZyhmbGFnLCBib29sZWFuVmFsdWUpIHtcbiAgICAgIHRoaXNbZmxhZ10gPSBib29sZWFuVmFsdWVcbiAgICAgIGlmIChmbGFnID09PSAnc2hvd1N1cmVGbGFnJyAmJiBib29sZWFuVmFsdWUpIHtcbiAgICAgICAgdGhpc1tmbGFnXSA9IGZhbHNlXG4gICAgICAgIHRoaXMucmVtb3ZlQ2lyY2xlRm4odGhpcy5jdXJyZW50UmVtb3ZlTW9tZW50SWQsIHRoaXMuY3VycmVudFJlbW92ZU1vbWVudElkeClcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIHNoYXJlQ2lyY2xlKHR5cGUpIHtcbiAgICAgIGxldCBzaGFyZUFjdGlvblR5cGUgPSB0aGlzLmdldFNoYXJlQWN0aW9uVHlwZSh0eXBlKVxuICAgICAgbGV0IHNoYXJlVHlwZSA9IHRoaXMuZ2V0U2hhcmVUeXBlKHR5cGUpXG4gICAgICB0aGlzLnNoYXJlVGl0bGUgPSBgJHt0aGlzLm1lbWJlckluZm8ubmlja25hbWV95YiG5Lqr5LqG5LiA5LiqJHtzaGFyZVR5cGV977yM54K55Ye7JHtzaGFyZUFjdGlvblR5cGV9YFxuICAgICAgdGhpcy5zaGFyZUltZyA9IHRoaXMuc2hhcmVJbWdTcmNbdHlwZV1cbiAgICAgIHRoaXMuc2hvd1NoYXJlRmxhZyA9IHRydWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIHJlbW92ZUNpcmNsZShpZCwgaWR4KSB7XG4gICAgICB0aGlzLnNob3dTdXJlRmxhZyA9IHRydWVcbiAgICAgIHRoaXMuY3VycmVudFJlbW92ZU1vbWVudElkID0gaWRcbiAgICAgIHRoaXMuY3VycmVudFJlbW92ZU1vbWVudElkeCA9IGlkeFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgcGF5KG1vbWVudElkLCBjb2xsZWN0aW9uSWQpIHtcbiAgICAgIGlmICh0aGlzLnBheW1lbnRMb2NrZWQpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB0aGlzLnBheW1lbnRMb2NrZWQgPSB0cnVlXG4gICAgICBjaGVja1N0dWRlbnQoe1xuICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXG4gICAgICAgIG1vbWVudF9pZDogbW9tZW50SWQsXG4gICAgICAgIGlzX3BheTogMFxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICB0aGlzLnBheU1lbWJlckxpc3QgPSByZXMuZGF0YS5saXN0XG4gICAgICAgIGlmICghdGhpcy5wYXlNZW1iZXJMaXN0Lmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMucGF5bWVudExvY2tlZCA9IGZhbHNlXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgIHNob3dNc2coJ+ivt+WLv+mHjeWkjee8tOi0uScpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucGF5TWVtYmVyTGlzdC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RGbGFnID0gdHJ1ZVxuICAgICAgICAgIHRoaXMuY3VycmVudENvbGxlY3Rpb25JZCA9IGNvbGxlY3Rpb25JZFxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnN0dWRlbnRJZHMgPSBbXVxuICAgICAgICAgIHRoaXMuc3R1ZGVudElkcy5wdXNoKHRoaXMucGF5TWVtYmVyTGlzdFswXS5pZClcbiAgICAgICAgICB0aGlzLmFkZFRvT3JkZXIoY29sbGVjdGlvbklkKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgc3VibWl0Sm9pbkFjdGl2aXR5KCkge1xuICAgICAgaWYgKHRoaXMuY3VycmVybnRKb2luQWNpdGl2eXRJZCA8PSAwKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+WFiOmAieaLqea0u+WKqOmhueebricpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgam9pbkFjdGl2aXR5KHtcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgICBhY3Rpdml0eV9pdGVtX2lkOiB0aGlzLmN1cnJlcm50U3ViQWN0aXZpdHlJZCxcbiAgICAgICAgYWN0aXZpdHlfaWQ6IHRoaXMuY3VycmVybnRKb2luQWNpdGl2eXRJZFxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgIHNob3dNc2coJ+aPkOS6pOaIkOWKnycpXG4gICAgICAgICAgdGhpcy5jdXJyZXJudFN1YkFjdGl2aXR5SWQgPSBbXVxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIGpvaW5BY3Rpdml0eShpZCwgc3ViSWQsIGxpc3RJbmRleCwgYWN0aXZpdHlJbmRleCkge1xuICAgICAgaWYgKCF0aGlzLmNsYXNzSW5mbykge1xuICAgICAgICBzaG93TXNnKCfor7flhYjpgInmi6nnj63nuqcnKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHRoaXMuY3VycmVybnRKb2luQWNpdGl2eXRJZCA9IGlkXG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuY3VycmVybnRTdWJBY3Rpdml0eUlkLmluZGV4T2Yoc3ViSWQpXG4gICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICB0aGlzLmN1cnJlcm50U3ViQWN0aXZpdHlJZC5zcGxpY2UoaW5kZXgsIDEpXG4gICAgICAgIHRoaXMubGlzdFtsaXN0SW5kZXhdLmluZm8uaXRlbVthY3Rpdml0eUluZGV4XS5jaGVja2VkID0gZmFsc2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY3VycmVybnRTdWJBY3Rpdml0eUlkLnB1c2goc3ViSWQpXG4gICAgICAgIHRoaXMubGlzdFtsaXN0SW5kZXhdLmluZm8uaXRlbVthY3Rpdml0eUluZGV4XS5jaGVja2VkID0gdHJ1ZVxuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgbG9hZE1vcmVDb21tZW50KG1vbWVudElkLCBpZHgpIHtcbiAgICAgIGNvbnN0IHJldE9iaiA9IHRoaXMuZmluZExvYWRtb3JlQ29tbWVudEluZm8odGhpcy5sb2FkTW9yZUNvbW1lbnRBcnJheSwgbW9tZW50SWQpO1xuICAgICAgZ2V0Q29tbWVudExpc3Qoe1xuICAgICAgICBtb21lbnRfaWQ6IG1vbWVudElkLFxuICAgICAgICBwczogdGhpcy5jb21tZW50UHMsXG4gICAgICAgIHBuOiByZXRPYmouY29tbWVudFBuID8gcmV0T2JqLmNvbW1lbnRQbiA6IHRoaXMuY29tbWVudFBuLFxuICAgICAgICBvZmZzZXQ6IHRoaXMuY29tbWVudE9mZnNldFxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgIGxldCByZXN1bHRMaXN0ID0gcmVzLmRhdGEubGlzdFxuICAgICAgICAgIGxldCB7bGlzdH0gPSB0aGlzLmxpc3RbaWR4XS5jb21tZW50X2xpc3RcbiAgICAgICAgICBsaXN0ID0gWy4uLmxpc3QsIC4uLnJlc3VsdExpc3RdXG4gICAgICAgICAgdGhpcy5saXN0W2lkeF0uY29tbWVudF9saXN0Lmxpc3QgPSBsaXN0XG4gICAgICAgICAgaWYgKHJlc3VsdExpc3QubGVuZ3RoIDwgdGhpcy5jb21tZW50UHMpIHtcbiAgICAgICAgICAgIHRoaXMubGlzdFtpZHhdLmNvbW1lbnRMb2FkRmluaXNoZWQgPSB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghcmV0T2JqLmNvbW1lbnRQbikge1xuICAgICAgICAgICAgY29uc3Qgb2JqID0ge1xuICAgICAgICAgICAgICBjb21tZW50UG46IHRoaXMuY29tbWVudFBuICsgMSxcbiAgICAgICAgICAgICAgbW9tZW50X2lkOiBtb21lbnRJZFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5sb2FkTW9yZUNvbW1lbnRBcnJheS5wdXNoKG9iailcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2FkTW9yZUNvbW1lbnRBcnJheVtyZXRPYmouaW5kZXhdLmNvbW1lbnRQbiA9IHJldE9iai5jb21tZW50UG4gKyAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBhZGRDb21tZW50KHR5cGUsIGlkLCByb290SWQsIHRvQ29tbWVudElkLCBuYW1lKSB7XG4gICAgICBpZiAodG9Db21tZW50SWQgPT09IHRoaXMubWVtYmVySW5mby5tZW1iZXJfaWQpIHtcbiAgICAgICAgc2hvd01zZygn6K+35LiN6KaB5Zue5aSN6Ieq5bexJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuY2xhc3NJbmZvKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+WFiOmAieaLqeePree6pycpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdGhpcy5jb21tZW50RmxhZyA9IHRydWVcbiAgICAgIHRoaXMuY3VycmVudFJlcGx5SWQgPSBpZFxuICAgICAgdGhpcy5jdXJyZW50UmVwbHlSb290SWQgPSB0eXBlID09PSAnYWRkJyA/IDAgOiByb290SWRcbiAgICAgIGlmIChuYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5jb21tZW50SW5wdXQgPSBgQCR7bmFtZX06YFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb21tZW50SW5wdXQgPSAnJ1xuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgYmluZENvbW1lbnRJbnB1dCAodmFsdWUpIHtcbiAgICAgIHRoaXMuY29tbWVudElucHV0ID0gdmFsdWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGNvbW1lbnRTdXJlICgpIHtcbiAgICAgIHRoaXMuY29tbWVudEZsYWcgPSBmYWxzZVxuICAgICAgYWRkQ29tbWVudCh7XG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgICAgbW9tZW50X2lkOiB0aGlzLmN1cnJlbnRSZXBseUlkLFxuICAgICAgICBjb250ZW50OiB0aGlzLmN1cnJlbnRSZXBseUlkID4gMCA/IHRoaXMuY29tbWVudElucHV0LnJlcGxhY2UoL15ALis6LywgJycpIDogdGhpcy5jb21tZW50SW5wdXQsXG4gICAgICAgIHJvb3RfaWQ6IHRoaXMuY3VycmVudFJlcGx5Um9vdElkLFxuICAgICAgICB0b19jb21tZW50X2lkOiB0aGlzLmN1cnJlbnRSZXBseVJvb3RJZFxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgIHRoaXMuY29tbWVudElucHV0ID0gJydcbiAgICAgICAgICB0aGlzLnJlc2V0RGF0YSgpXG4gICAgICAgICAgdGhpcy5nZXRab25lTGlzdCgpXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAganVtcFB1Ymxpc2godmFsdWUpIHtcbiAgICAgIGlmICghdGhpcy5jbGFzc0luZm8pIHtcbiAgICAgICAgc2hvd01zZygn6K+36YCJ57uR5a6a54+t57qnJywgMzAwMClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBsZXQgdXJsID0gdmFsdWUgPT09ICdhY2NvdW50JyA/ICdyZWNvcmRDYXNoZmxvdycgOiBgcHVibGlzaD90eXBlPSR7dmFsdWV9YFxuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogdXJsXG4gICAgICB9KVxuICAgIH0sXG4gICAgY29tbWVudENhbmNlbCAoKSB7XG4gICAgICB0aGlzLmNvbW1lbnRGbGFnID0gZmFsc2VcbiAgICAgIHRoaXMuY29tbWVudElucHV0ID0gJydcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGp1bXBQYWdlIChwYWdlTmFtZSwgdHlwZSkge1xuICAgICAgdGhpcy5wdWJsaXNoRmxhZyA9IGZhbHNlXG4gICAgICB0aGlzLnNldEZsYWcgPSBmYWxzZVxuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogYCR7cGFnZU5hbWV9P3R5cGU9JHt0eXBlfWBcbiAgICAgIH0pXG4gICAgfSxcbiAgICB0b2dnbGVNZW51ICh0eXBlKSB7XG4gICAgICBpZiAoIXRoaXMuY2xhc3NJbmZvKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+mAiee7keWumuePree6pycsIDMwMDApXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdGhpc1t0eXBlXSA9ICF0aGlzW3R5cGVdXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBjbG9zZVRvZ2dsZSAoKSB7XG4gICAgICB0aGlzLnNldEZsYWcgPSBmYWxzZVxuICAgICAgdGhpcy5wdWJsaXNoRmxhZyA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBwcmV2aWV3KGltZywgaW1nTGlzdCkge1xuICAgICAgcHJldmlld0ltYWdlKGltZywgaW1nTGlzdClcbiAgICB9LFxuICAgIHNlbGVjdFN1cmUodmFsdWUpIHtcbiAgICAgIGlmICghdmFsdWUubGVuZ3RoKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+mAieaLqScpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgY29uc3QgdmFsID0gdmFsdWVcbiAgICAgIHRoaXMuc3R1ZGVudElkcyA9IFsuLi52YWxdXG4gICAgICB0aGlzLnNlbGVjdEZsYWcgPSBmYWxzZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgdGhpcy5hZGRUb09yZGVyKHRoaXMuY3VycmVudENvbGxlY3Rpb25JZClcbiAgICB9XG4gIH1cbiAgb25TaGFyZUFwcE1lc3NhZ2UocmVzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiB0aGlzLnNoYXJlVGl0bGUsXG4gICAgICBpbWFnZVVybDogdGhpcy5zaGFyZUltZ1xuICAgIH1cbiAgfVxufVxuIl19