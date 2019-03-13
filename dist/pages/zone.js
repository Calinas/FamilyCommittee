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
    }, _this2.$repeat = {}, _this2.$props = { "CurrentModal": { "sureBtnText": "确认", "cancelBtnText": "取消", "placeholderText": "请输入评论内容", "xmlns:v-bind": "", "v-bind:flag.sync": "commentFlag", "v-bind:commentInput.sync": "commentInput", "xmlns:v-on": "" }, "SelectModal": { "v-bind:flag.sync": "selectFlag", "v-bind:list.sync": "payMemberList" }, "shareModal": { "v-bind:flag.sync": "showShareFlag", "v-bind:title.sync": "shareTitle", "v-bind:imgSrc.sync": "shareImg" } }, _this2.$events = { "CurrentModal": { "v-on:cancel": "commentCancel", "v-on:sure": "commentSure", "v-on:input": "bindCommentInput" }, "SelectModal": { "v-on:cancel": "selectCancel", "v-on:sure": "selectSure" }, "shareModal": { "v-on:cancel": "cancelShareFn", "v-on:sure": "cancelShareFn" } }, _this2.components = {
      CurrentModal: _commentModal2.default,
      SelectModal: _selectModal2.default,
      shareModal: _shareModal2.default
    }, _this2.data = {
      menuList: [{
        text: '家长圈',
        type: 'zone',
        src: '/images/icon/2.jpg'
      }, {
        text: '收款',
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
      shareImg: ''
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
      shareCircle: function shareCircle(type) {
        var shareActionType = this.getShareActionType(type);
        var shareType = this.getShareType(type);
        this.shareTitle = this.memberInfo.nickname + '\u5206\u4EAB\u4E86\u4E00\u4E2A' + shareType + '\uFF0C\u70B9\u51FB' + shareActionType;
        this.shareImg = this.shareImgSrc[type];
        this.showShareFlag = true;
        this.$apply();
      },
      removeCircle: function removeCircle(id, idx) {
        var _this3 = this;

        (0, _zone.deleteCircle)({
          moment_id: id,
          class_id: this.classInfo.id
        }).then(function (res) {
          if (res.data.success) {
            (0, _common.showMsg)('成功删除');
            _this3.list.splice(idx, 1);
            _this3.$apply();
          }
        });
      },
      pay: function pay(momentId, collectionId) {
        var _this4 = this;

        if (this.paymentLocked) {
          return;
        }
        this.paymentLocked = true;
        (0, _user.checkStudent)({
          class_id: this.classInfo.id,
          moment_id: momentId,
          is_pay: 0
        }).then(function (res) {
          _this4.payMemberList = res.data.list;
          if (!_this4.payMemberList.length) {
            _this4.paymentLocked = false;
            _this4.$apply();
            (0, _common.showMsg)('请勿重复缴费');
            return;
          }
          if (_this4.payMemberList.length > 1) {
            _this4.selectFlag = true;
            _this4.currentCollectionId = collectionId;
            _this4.$apply();
          } else {
            _this4.studentIds = [];
            _this4.studentIds.push(_this4.payMemberList[0].id);
            _this4.addToOrder(collectionId);
          }
        });
      },
      submitJoinActivity: function submitJoinActivity() {
        var _this5 = this;

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
            _this5.currerntSubActivityId = [];
            _this5.$apply();
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
        var _this6 = this;

        var retObj = this.findLoadmoreCommentInfo(this.loadMoreCommentArray, momentId);
        (0, _zone.getCommentList)({
          moment_id: momentId,
          ps: this.commentPs,
          pn: retObj.commentPn ? retObj.commentPn : this.commentPn,
          offset: this.commentOffset
        }).then(function (res) {
          if (res.data.success) {
            var resultList = res.data.list;
            var list = _this6.list[idx].comment_list.list;

            list = [].concat(_toConsumableArray(list), _toConsumableArray(resultList));
            _this6.list[idx].comment_list.list = list;
            if (resultList.length < _this6.commentPs) {
              _this6.list[idx].commentLoadFinished = true;
            }
            if (!retObj.commentPn) {
              var obj = {
                commentPn: _this6.commentPn + 1,
                moment_id: momentId
              };
              _this6.loadMoreCommentArray.push(obj);
            } else {
              _this6.loadMoreCommentArray[retObj.index].commentPn = retObj.commentPn + 1;
            }
            _this6.$apply();
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
        var _this7 = this;

        this.commentFlag = false;
        (0, _zone.addComment)({
          class_id: this.classInfo.id,
          moment_id: this.currentReplyId,
          content: this.currentReplyId > 0 ? this.commentInput.replace(/^@.+:/, '') : this.commentInput,
          root_id: this.currentReplyRootId,
          to_comment_id: this.currentReplyRootId
        }).then(function (res) {
          if (res.data.success) {
            _this7.commentInput = '';
            _this7.resetData();
            _this7.getZoneList();
            _this7.$apply();
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
      selectCancel: function selectCancel() {
        this.selectFlag = false;
        this.$apply();
      },
      cancelShareFn: function cancelShareFn() {
        this.showShareFlag = false;
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
      this.loadMoreCommentArray = [];
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInpvbmUuanMiXSwibmFtZXMiOlsiWm9uZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJDdXJyZW50TW9kYWwiLCJTZWxlY3RNb2RhbCIsInNoYXJlTW9kYWwiLCJkYXRhIiwibWVudUxpc3QiLCJ0ZXh0IiwidHlwZSIsInNyYyIsImNvbW1lbnRGbGFnIiwic2VsZWN0RmxhZyIsImFjdGl2ZVR5cGUiLCJzZXRGbGFnIiwicHVibGlzaEZsYWciLCJjaXJjbGVzIiwiY29sbGVjdGlvbiIsIm5vdGlmeSIsImFjdGl2aXR5IiwiYWNjb3VudCIsImdyYWRlVHlwZSIsInByaW1hcnkiLCJtaWRkbGUiLCJoaWdoIiwidW5pdmVyc2l0eSIsInNoYXJlSW1nU3JjIiwicG4iLCJwcyIsImxpc3QiLCJwYXlNZW1iZXJMaXN0IiwiY2xhc3NJbmZvIiwibWVtYmVySW5mbyIsInNjaG9vbEluZm8iLCJsb2FkaW5nIiwibG9hZEZpbmlzaGVkIiwiY29tbWVudElucHV0IiwiY3VycmVudFJlcGx5SWQiLCJjdXJyZW50UmVwbHlSb290SWQiLCJjdXJyZW50UmVwbHlUb0NvbW1lbnRJZCIsImN1cnJlcm50Sm9pbkFjaXRpdnl0SWQiLCJjdXJyZXJudFN1YkFjdGl2aXR5SWQiLCJjdXJyZW50Q29sbGVjdGlvbklkIiwiYXV0aCIsInByZXNpZGVudCIsImZpbmFuY2UiLCJwaG90b3MiLCJjb21tZW50UG4iLCJjb21tZW50UHMiLCJjb21tZW50T2Zmc2V0IiwiY29tbWVudExvYWRGaW5pc2hlZCIsIm1lbWJlckxpc3QiLCJzdHVkZW50SWRzIiwiZmlyc3RJbml0IiwicGF5bWVudExvY2tlZCIsImxvYWRNb3JlQ29tbWVudEFycmF5Iiwic2hhcmVUaXRsZSIsInNob3dTaGFyZUZsYWciLCJzaGFyZUltZyIsIndhdGNoIiwibmV3VmFsIiwib2xkVmFsIiwicmVzZXREYXRhIiwiZ2V0QXV0aExpc3QiLCJnZXRab25lTGlzdCIsImN1cnJlbnRKb2luQWN0aXZpdHlJZCIsIiRhcHBseSIsIm1ldGhvZHMiLCJzaGFyZUNpcmNsZSIsInNoYXJlQWN0aW9uVHlwZSIsImdldFNoYXJlQWN0aW9uVHlwZSIsInNoYXJlVHlwZSIsImdldFNoYXJlVHlwZSIsIm5pY2tuYW1lIiwicmVtb3ZlQ2lyY2xlIiwiaWQiLCJpZHgiLCJtb21lbnRfaWQiLCJjbGFzc19pZCIsInRoZW4iLCJyZXMiLCJzdWNjZXNzIiwic3BsaWNlIiwicGF5IiwibW9tZW50SWQiLCJjb2xsZWN0aW9uSWQiLCJpc19wYXkiLCJsZW5ndGgiLCJwdXNoIiwiYWRkVG9PcmRlciIsInN1Ym1pdEpvaW5BY3Rpdml0eSIsImFjdGl2aXR5X2l0ZW1faWQiLCJhY3Rpdml0eV9pZCIsImpvaW5BY3Rpdml0eSIsInN1YklkIiwibGlzdEluZGV4IiwiYWN0aXZpdHlJbmRleCIsImluZGV4IiwiaW5kZXhPZiIsImluZm8iLCJpdGVtIiwiY2hlY2tlZCIsImxvYWRNb3JlQ29tbWVudCIsInJldE9iaiIsImZpbmRMb2FkbW9yZUNvbW1lbnRJbmZvIiwib2Zmc2V0IiwicmVzdWx0TGlzdCIsImNvbW1lbnRfbGlzdCIsIm9iaiIsImFkZENvbW1lbnQiLCJyb290SWQiLCJ0b0NvbW1lbnRJZCIsIm5hbWUiLCJtZW1iZXJfaWQiLCJ1bmRlZmluZWQiLCJiaW5kQ29tbWVudElucHV0IiwidmFsdWUiLCJjb21tZW50U3VyZSIsImNvbnRlbnQiLCJyZXBsYWNlIiwicm9vdF9pZCIsInRvX2NvbW1lbnRfaWQiLCJqdW1wUHVibGlzaCIsInVybCIsInd4IiwibmF2aWdhdGVUbyIsImNvbW1lbnRDYW5jZWwiLCJqdW1wUGFnZSIsInBhZ2VOYW1lIiwidG9nZ2xlTWVudSIsImNsb3NlVG9nZ2xlIiwicHJldmlldyIsImltZyIsImltZ0xpc3QiLCJzZWxlY3RDYW5jZWwiLCJjYW5jZWxTaGFyZUZuIiwic2VsZWN0U3VyZSIsInZhbCIsImdldFN0b3JhZ2VTeW5jIiwiJHd4cGFnZSIsImZyb21QdWJsaXNoIiwic2V0RGF0YSIsImNoZWNrRGF0YUV4aXN0IiwicmVMYXVuY2giLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInVzZXJEYXRhIiwiY2hlY2tBdXRoIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJpIiwibGVuIiwiY29kZSIsImlzQXV0aCIsImlzX2F1dGgiLCJmb3JtYXRBbGxBdXRoIiwiZm9ybWF0U2luZ2xlQXV0aCIsInNlZV90eXBlIiwiY29tbWVudF9jb3VudCIsIm9yZGVyX2lkIiwiX3RoaXMiLCJwYXltZW50X3BhcmFtcyIsInJlcXVlc3RQYXltZW50IiwidGltZVN0YW1wIiwiU3RyaW5nIiwibm9uY2VTdHIiLCJwYWNrYWdlIiwicGF5U2lnbiIsInNpZ25UeXBlIiwiZmFpbCIsInN0dWRlbnRfaWRzIiwiY29sbGVjdGlvbl9pdGVtX2lkIiwicGF5bWVudFBhcmFtcyIsImFyciIsImN1cnJlbnRJZCIsImFzc2lnbiIsImFjdGlvbiIsImNhdGVnb3J5IiwidGl0bGUiLCJpbWFnZVVybCIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLEk7Ozs7Ozs7Ozs7Ozs7O3FMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixNQURqQjtBQUVQQyw2QkFBdUI7QUFGaEIsSyxTQUlWQyxPLEdBQVUsRSxTQUNYQyxNLEdBQVMsRUFBQyxnQkFBZSxFQUFDLGVBQWMsSUFBZixFQUFvQixpQkFBZ0IsSUFBcEMsRUFBeUMsbUJBQWtCLFNBQTNELEVBQXFFLGdCQUFlLEVBQXBGLEVBQXVGLG9CQUFtQixhQUExRyxFQUF3SCw0QkFBMkIsY0FBbkosRUFBa0ssY0FBYSxFQUEvSyxFQUFoQixFQUFtTSxlQUFjLEVBQUMsb0JBQW1CLFlBQXBCLEVBQWlDLG9CQUFtQixlQUFw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QUFJekUsU0FBUyxFQUFiO0FBQ0EsV0FBSyxJQUFJaUQsSUFBSSxDQUFSLEVBQVdDLE1BQU1zQixJQUFJeEYsTUFBMUIsRUFBa0NpRSxJQUFJQyxHQUF0QyxFQUEyQ0QsR0FBM0MsRUFBZ0Q7QUFDOUMsWUFBSXVCLElBQUl2QixDQUFKLEVBQU8zRSxTQUFQLEtBQXFCbUcsU0FBekIsRUFBb0M7QUFDbEN6RSxtQkFBUzZDLE9BQU82QixNQUFQLENBQWMsRUFBZCxFQUFrQkYsSUFBSXZCLENBQUosQ0FBbEIsRUFBMEI7QUFDakN2RCxtQkFBT3VEO0FBRDBCLFdBQTFCLENBQVQ7QUFHRDtBQUNGO0FBQ0QsYUFBT2pELE1BQVA7QUFDRDs7O3VDQUNrQjlGLEksRUFBTTtBQUN2QixVQUFJeUssU0FBUyxJQUFiO0FBQ0EsY0FBUXpLLElBQVI7QUFDRSxhQUFLLFVBQUw7QUFDRXlLLG1CQUFTLElBQVQ7QUFDQSxpQkFBT0EsTUFBUDtBQUNGLGFBQUssWUFBTDtBQUNFQSxtQkFBUyxJQUFUO0FBQ0EsaUJBQU9BLE1BQVA7QUFDRjtBQUNFLGlCQUFPQSxNQUFQO0FBUko7QUFVRDs7O2lDQUNZekssSSxFQUFNO0FBQ2pCLFVBQUkwSyxXQUFXLEVBQWY7QUFDQSxVQUFJMUssU0FBUyxTQUFiLEVBQXdCO0FBQ3RCMEssbUJBQVcsT0FBWDtBQUNELE9BRkQsTUFFTztBQUNMQSwwQ0FBaUIsS0FBSzFLLElBQUwsQ0FBVUEsSUFBVixDQUFqQjtBQUNEO0FBQ0QsYUFBTzBLLFFBQVA7QUFDRDs7O3NDQWtOaUJuRyxHLEVBQUs7QUFDckIsYUFBTztBQUNMb0csZUFBTyxLQUFLNUgsVUFEUDtBQUVMNkgsa0JBQVUsS0FBSzNIO0FBRlYsT0FBUDtBQUlEOzs7O0VBdGYrQjRILGVBQUtDLEk7O2tCQUFsQjVMLEkiLCJmaWxlIjoiem9uZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCBTZWxlY3RNb2RhbCBmcm9tICcuLi9jb21wb25lbnRzL3NlbGVjdE1vZGFsJ1xuaW1wb3J0IEN1cnJlbnRNb2RhbCBmcm9tICcuLi9jb21wb25lbnRzL2NvbW1lbnRNb2RhbCdcbmltcG9ydCBzaGFyZU1vZGFsIGZyb20gJy4uL2NvbXBvbmVudHMvc2hhcmVNb2RhbCdcbmltcG9ydCB7IHNob3dNc2csIHByZXZpZXdJbWFnZSB9IGZyb20gJy4uL3V0aWxzL2NvbW1vbidcbmltcG9ydCB7IGdldENpcmNsZUxpc3QsIGFkZENvbW1lbnQsIGpvaW5BY3Rpdml0eSwgZ2V0Q29tbWVudExpc3QsIGRlbGV0ZUNpcmNsZSB9IGZyb20gJy4uL2FwaS96b25lJ1xuaW1wb3J0IHsgYWRkT3JkZXIsIGdldFBheW1lbnRQYXJhbXMgfSBmcm9tICcuLi9hcGkvZmluYW5jZSdcbmltcG9ydCB7IGdldEF1dGggfSBmcm9tICcuLi9hcGkvYXV0aG9yaXplJ1xuaW1wb3J0IHsgY2hlY2tTdHVkZW50IH0gZnJvbSAnLi4vYXBpL3VzZXInXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBab25lIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmnIDov5Hnj63nuqcnLFxuICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogdHJ1ZVxuICB9XG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJDdXJyZW50TW9kYWxcIjp7XCJzdXJlQnRuVGV4dFwiOlwi56Gu6K6kXCIsXCJjYW5jZWxCdG5UZXh0XCI6XCLlj5bmtohcIixcInBsYWNlaG9sZGVyVGV4dFwiOlwi6K+36L6T5YWl6K+E6K665YaF5a65XCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmZsYWcuc3luY1wiOlwiY29tbWVudEZsYWdcIixcInYtYmluZDpjb21tZW50SW5wdXQuc3luY1wiOlwiY29tbWVudElucHV0XCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJTZWxlY3RNb2RhbFwiOntcInYtYmluZDpmbGFnLnN5bmNcIjpcInNlbGVjdEZsYWdcIixcInYtYmluZDpsaXN0LnN5bmNcIjpcInBheU1lbWJlckxpc3RcIn0sXCJzaGFyZU1vZGFsXCI6e1widi1iaW5kOmZsYWcuc3luY1wiOlwic2hvd1NoYXJlRmxhZ1wiLFwidi1iaW5kOnRpdGxlLnN5bmNcIjpcInNoYXJlVGl0bGVcIixcInYtYmluZDppbWdTcmMuc3luY1wiOlwic2hhcmVJbWdcIn19O1xyXG4kZXZlbnRzID0ge1wiQ3VycmVudE1vZGFsXCI6e1widi1vbjpjYW5jZWxcIjpcImNvbW1lbnRDYW5jZWxcIixcInYtb246c3VyZVwiOlwiY29tbWVudFN1cmVcIixcInYtb246aW5wdXRcIjpcImJpbmRDb21tZW50SW5wdXRcIn0sXCJTZWxlY3RNb2RhbFwiOntcInYtb246Y2FuY2VsXCI6XCJzZWxlY3RDYW5jZWxcIixcInYtb246c3VyZVwiOlwic2VsZWN0U3VyZVwifSxcInNoYXJlTW9kYWxcIjp7XCJ2LW9uOmNhbmNlbFwiOlwiY2FuY2VsU2hhcmVGblwiLFwidi1vbjpzdXJlXCI6XCJjYW5jZWxTaGFyZUZuXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgQ3VycmVudE1vZGFsLFxuICAgIFNlbGVjdE1vZGFsLFxuICAgIHNoYXJlTW9kYWxcbiAgfVxuICBkYXRhID0ge1xuICAgIG1lbnVMaXN0OiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICflrrbplb/lnIgnLFxuICAgICAgICB0eXBlOiAnem9uZScsXG4gICAgICAgIHNyYzogJy9pbWFnZXMvaWNvbi8yLmpwZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICfmlLbmrL4nLFxuICAgICAgICB0eXBlOiAnbW9uZXknLFxuICAgICAgICBzcmM6ICcvaW1hZ2VzL2ljb24vbW9uZXkuanBnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ+mAmuefpScsXG4gICAgICAgIHR5cGU6ICdub3RpY2UnLFxuICAgICAgICBzcmM6ICcvaW1hZ2VzL2ljb24vNC5qcGcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAn5rS75YqoJyxcbiAgICAgICAgdHlwZTogJ2FjdGl2aXR5JyxcbiAgICAgICAgc3JjOiAnL2ltYWdlcy9pY29uLzUuanBnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ+iusOi0picsXG4gICAgICAgIHR5cGU6ICdhY2NvdW50JyxcbiAgICAgICAgc3JjOiAnL2ltYWdlcy9pY29uL3Bob3Rvcy5qcGcnXG4gICAgICB9XG4gICAgXSxcbiAgICBjb21tZW50RmxhZzogZmFsc2UsXG4gICAgc2VsZWN0RmxhZzogZmFsc2UsXG4gICAgYWN0aXZlVHlwZTogJ2FsbCcsXG4gICAgc2V0RmxhZzogZmFsc2UsXG4gICAgcHVibGlzaEZsYWc6IGZhbHNlLFxuICAgIHR5cGU6IHtcbiAgICAgIGNpcmNsZXM6ICflrrbplb/lnIgnLFxuICAgICAgY29sbGVjdGlvbjogJ+aUtuasvicsXG4gICAgICBub3RpZnk6ICfpgJrnn6UnLFxuICAgICAgYWN0aXZpdHk6ICfmtLvliqgnLFxuICAgICAgYWNjb3VudDogJ+iusOi0pidcbiAgICB9LFxuICAgIGdyYWRlVHlwZToge1xuICAgICAgcHJpbWFyeTogJ+Wwj+WtpicsXG4gICAgICBtaWRkbGU6ICfliJ3kuK0nLFxuICAgICAgaGlnaDogJ+mrmOS4rScsXG4gICAgICB1bml2ZXJzaXR5OiAn5aSn5a2mJ1xuICAgIH0sXG4gICAgc2hhcmVJbWdTcmM6IHtcbiAgICAgIGNpcmNsZXM6ICcuLi9pbWFnZXMvc2hhcmUvY2lyY2xlcy5qcGcnLFxuICAgICAgY29sbGVjdGlvbjogJy4uL2ltYWdlcy9zaGFyZS9jb2xsZWN0aW9uLmpwZycsXG4gICAgICBub3RpZnk6ICcuLi9pbWFnZXMvc2hhcmUvbm90aWZ5LmpwZycsXG4gICAgICBhY3Rpdml0eTogJy4uL2ltYWdlcy9zaGFyZS9hY3Rpdml0eS5qcGcnLFxuICAgICAgYWNjb3VudDogJy4uL2ltYWdlcy9zaGFyZS9hY2NvdW50LmpwZydcbiAgICB9LFxuICAgIHBuOiAxLFxuICAgIHBzOiAxMCxcbiAgICBsaXN0OiBbXSxcbiAgICBwYXlNZW1iZXJMaXN0OiBbXSxcbiAgICBjbGFzc0luZm86IG51bGwsXG4gICAgbWVtYmVySW5mbzogbnVsbCxcbiAgICBzY2hvb2xJbmZvOiBudWxsLFxuICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgIGxvYWRGaW5pc2hlZDogZmFsc2UsXG4gICAgY29tbWVudElucHV0OiAnJyxcbiAgICBjdXJyZW50UmVwbHlJZDogLTEsXG4gICAgY3VycmVudFJlcGx5Um9vdElkOiAtMSxcbiAgICBjdXJyZW50UmVwbHlUb0NvbW1lbnRJZDogLTEsXG4gICAgY3VycmVybnRKb2luQWNpdGl2eXRJZDogLTEsXG4gICAgY3VycmVybnRTdWJBY3Rpdml0eUlkOiBbXSxcbiAgICBjdXJyZW50Q29sbGVjdGlvbklkOiAtMSxcbiAgICBhdXRoOiB7XG4gICAgICBwcmVzaWRlbnQ6IGZhbHNlLFxuICAgICAgZmluYW5jZTogZmFsc2UsXG4gICAgICBhY3Rpdml0eTogZmFsc2UsXG4gICAgICBub3RpZnk6IGZhbHNlLFxuICAgICAgcGhvdG9zOiBmYWxzZSxcbiAgICAgIGNpcmNsZXM6IGZhbHNlXG4gICAgfSxcbiAgICBjb21tZW50UG46IDIsXG4gICAgY29tbWVudFBzOiA2LFxuICAgIGNvbW1lbnRPZmZzZXQ6IDYsXG4gICAgY29tbWVudExvYWRGaW5pc2hlZDogZmFsc2UsXG4gICAgbWVtYmVyTGlzdDogW10sXG4gICAgc3R1ZGVudElkczogW10sXG4gICAgZmlyc3RJbml0OiB0cnVlLFxuICAgIHBheW1lbnRMb2NrZWQ6IGZhbHNlLFxuICAgIGxvYWRNb3JlQ29tbWVudEFycmF5OiBbXSxcbiAgICBzaGFyZVRpdGxlOiAnJyxcbiAgICBzaG93U2hhcmVGbGFnOiBmYWxzZSxcbiAgICBzaGFyZUltZzogJydcbiAgfVxuICB3YXRjaCA9IHtcbiAgICBjbGFzc0luZm8obmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgIC8vIOWIh+aNouS6huePree6p+S5i+WQjuaVsOaNruimgeabtOaWsFxuICAgICAgaWYgKG9sZFZhbCAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLnJlc2V0RGF0YSgpXG4gICAgICAgIHRoaXMuZ2V0QXV0aExpc3QoKVxuICAgICAgICB0aGlzLmdldFpvbmVMaXN0KClcbiAgICAgIH1cbiAgICB9LFxuICAgIGN1cnJlbnRKb2luQWN0aXZpdHlJZChuZXdWYWwsIG9sZFZhbCkge1xuICAgICAgaWYgKG5ld1ZhbCA+IDApIHtcbiAgICAgICAgdGhpcy5jdXJyZXJudFN1YkFjdGl2aXR5SWQgPSBbXVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJlc2V0RGF0YSgpIHtcbiAgICB0aGlzLmxvYWRNb3JlQ29tbWVudEFycmF5ID0gW11cbiAgICB0aGlzLmNvbW1lbnRMb2FkRmluaXNoZWQgPSBmYWxzZVxuICAgIHRoaXMuY29tbWVudFBuID0gMlxuICAgIHRoaXMuY29tbWVudFBzID0gNlxuICAgIHRoaXMuc3R1ZGVudElkcyA9IFtdXG4gICAgdGhpcy5wYXltZW50TG9ja2VkID0gZmFsc2VcbiAgICB0aGlzLnBuID0gMVxuICAgIHRoaXMubGlzdCA9IFtdXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIG9uUHVsbERvd25SZWZyZXNoKCkge1xuICAgIHRoaXMucmVzZXREYXRhKClcbiAgICB0aGlzLmdldFpvbmVMaXN0KClcbiAgfVxuICBvblJlYWNoQm90dG9tKCkge1xuICAgIGlmICh0aGlzLmxvYWRpbmcgfHwgdGhpcy5sb2FkRmluaXNoZWQpIHJldHVyblxuICAgIHRoaXMuZ2V0Wm9uZUxpc3QoKVxuICB9XG4gIG9uU2hvdygpIHtcbiAgICB0aGlzLmN1cnJlcm50Sm9pbkFjaXRpdnl0SWQgPSAtMVxuICAgIHRoaXMuY3VycmVybnRTdWJBY3Rpdml0eUlkID0gW11cbiAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxuICAgIHRoaXMuJGFwcGx5KClcbiAgICAvLyDlpoLmnpzmmK/ku45wdWJsaXNo562J6aG16Z2i6L+U5Zue77yM5YiZ6ZyA6KaB5Yi35paw5pWw5o2uXG4gICAgbGV0IGRhdGEgPSB0aGlzLiR3eHBhZ2UuZGF0YTtcbiAgICBpZiAoZGF0YS5mcm9tUHVibGlzaCkge1xuICAgICAgdGhpcy5yZXNldERhdGEoKVxuICAgICAgdGhpcy5nZXRab25lTGlzdCgpXG4gICAgfVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBmcm9tUHVibGlzaDogZmFsc2VcbiAgICB9KVxuICB9XG4gIG9uTG9hZCgpIHtcbiAgICBpZiAoIXRoaXMuY2hlY2tEYXRhRXhpc3QoJ21lbWJlckluZm8nKSkge1xuICAgICAgd3gucmVMYXVuY2goe1xuICAgICAgICB1cmw6ICdsb2dpbidcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXG4gICAgICB0aGlzLmNsYXNzSW5mbyAmJiB0aGlzLmdldEF1dGhMaXN0KClcbiAgICAgIHRoaXMubWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcbiAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJEYXRhID0gdGhpcy5tZW1iZXJJbmZvXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB0aGlzLmdldFpvbmVMaXN0KClcbiAgICB9XG4gIH1cbiAgZ2V0QXV0aExpc3QoKSB7XG4gICAgZ2V0QXV0aCh7XG4gICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWRcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICB0aGlzLmNoZWNrQXV0aChyZXMuZGF0YS5kYXRhKVxuICAgIH0pXG4gIH1cbiAgZm9ybWF0QWxsQXV0aChvYmopIHtcbiAgICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIG9ialtrZXldID0gdHJ1ZVxuICAgIH0pXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIGZvcm1hdFNpbmdsZUF1dGgobmFtZSkge1xuICAgIHRoaXMuYXV0aFtuYW1lXSA9IHRydWVcbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgY2hlY2tBdXRoKGxpc3QpIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gbGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgbGV0IHtjb2RlLCBpc19hdXRoOiBpc0F1dGh9ID0gbGlzdFtpXVxuICAgICAgaWYgKGNvZGUgPT09ICdwcmVzaWRlbnQnICYmIGlzQXV0aCkge1xuICAgICAgICB0aGlzLmZvcm1hdEFsbEF1dGgodGhpcy5hdXRoKVxuICAgICAgICBicmVha1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXNBdXRoICYmIHRoaXMuZm9ybWF0U2luZ2xlQXV0aChjb2RlKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBjaGVja0RhdGFFeGlzdChrZXkpIHtcbiAgICBpZiAod3guZ2V0U3RvcmFnZVN5bmMoa2V5KSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgZ2V0Wm9uZUxpc3QoKSB7XG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZVxuICAgIHRoaXMuJGFwcGx5KClcbiAgICBjb25zdCBpZCA9IHRoaXMuY2xhc3NJbmZvLmlkXG4gICAgZ2V0Q2lyY2xlTGlzdCh7XG4gICAgICBjbGFzc19pZDogaWQsXG4gICAgICBzZWVfdHlwZTogaWQgPyAnJyA6ICdhbGwnLFxuICAgICAgdHlwZTogdGhpcy5hY3RpdmVUeXBlLFxuICAgICAgcG46IHRoaXMucG4sXG4gICAgICBwczogdGhpcy5wcyxcbiAgICAgIGNvbW1lbnRfY291bnQ6IDNcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgeyBsaXN0IH0gPSByZXMuZGF0YVxuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2VcbiAgICAgIHRoaXMucG4rK1xuICAgICAgaWYgKGxpc3QubGVuZ3RoIDwgdGhpcy5wcykge1xuICAgICAgICB0aGlzLmxvYWRGaW5pc2hlZCA9IHRydWVcbiAgICAgIH1cbiAgICAgIHRoaXMubGlzdCA9IFsuLi50aGlzLmxpc3QsIC4uLmxpc3RdXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSlcbiAgfVxuICBwYXltZW50UGFyYW1zKGlkKSB7XG4gICAgZ2V0UGF5bWVudFBhcmFtcyh7XG4gICAgICBvcmRlcl9pZDogaWRcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgX3RoaXMgPSB0aGlzXG4gICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhLnBheW1lbnRfcGFyYW1zXG4gICAgICB3eC5yZXF1ZXN0UGF5bWVudCh7XG4gICAgICAgIHRpbWVTdGFtcDogU3RyaW5nKGRhdGEudGltZVN0YW1wKSxcbiAgICAgICAgbm9uY2VTdHI6IGRhdGEubm9uY2VTdHIsXG4gICAgICAgIHBhY2thZ2U6IGRhdGEucGFja2FnZSxcbiAgICAgICAgcGF5U2lnbjogZGF0YS5wYXlTaWduLFxuICAgICAgICBzaWduVHlwZTogJ01ENScsXG4gICAgICAgIHN1Y2Nlc3MoKSB7XG4gICAgICAgICAgX3RoaXMucGF5bWVudExvY2tlZCA9IGZhbHNlXG4gICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbCgpIHtcbiAgICAgICAgICBfdGhpcy5wYXltZW50TG9ja2VkID0gZmFsc2VcbiAgICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH1cbiAgYWRkVG9PcmRlcihpZCkge1xuICAgIGFkZE9yZGVyKHtcbiAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgIHN0dWRlbnRfaWRzOiB0aGlzLnN0dWRlbnRJZHMsXG4gICAgICBjb2xsZWN0aW9uX2l0ZW1faWQ6IGlkXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgdGhpcy5wYXltZW50UGFyYW1zKHJlcy5kYXRhLmRhdGEuaWQpXG4gICAgfSlcbiAgfVxuICBmaW5kTG9hZG1vcmVDb21tZW50SW5mbyhhcnIsIGN1cnJlbnRJZCkge1xuICAgIGxldCByZXRPYmogPSB7fVxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhcnIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmIChhcnJbaV0ubW9tZW50X2lkID09PSBjdXJyZW50SWQpIHtcbiAgICAgICAgcmV0T2JqID0gT2JqZWN0LmFzc2lnbih7fSwgYXJyW2ldLCB7XG4gICAgICAgICAgaW5kZXg6IGlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJldE9ialxuICB9XG4gIGdldFNoYXJlQWN0aW9uVHlwZSh0eXBlKSB7XG4gICAgbGV0IGFjdGlvbiA9ICfmtY/op4gnXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdhY3Rpdml0eSc6XG4gICAgICAgIGFjdGlvbiA9ICflj4LliqAnXG4gICAgICAgIHJldHVybiBhY3Rpb25cbiAgICAgIGNhc2UgJ2NvbGxlY3Rpb24nOlxuICAgICAgICBhY3Rpb24gPSAn57y06LS5J1xuICAgICAgICByZXR1cm4gYWN0aW9uXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gYWN0aW9uXG4gICAgfVxuICB9XG4gIGdldFNoYXJlVHlwZSh0eXBlKSB7XG4gICAgbGV0IGNhdGVnb3J5ID0gJydcbiAgICBpZiAodHlwZSA9PT0gJ2NpcmNsZXMnKSB7XG4gICAgICBjYXRlZ29yeSA9ICflrrbplb/lnIjlm77mlocnXG4gICAgfSBlbHNlIHtcbiAgICAgIGNhdGVnb3J5ID0gYOWutuWnlOS8miR7dGhpcy50eXBlW3R5cGVdfWBcbiAgICB9XG4gICAgcmV0dXJuIGNhdGVnb3J5XG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBzaGFyZUNpcmNsZSh0eXBlKSB7XG4gICAgICBsZXQgc2hhcmVBY3Rpb25UeXBlID0gdGhpcy5nZXRTaGFyZUFjdGlvblR5cGUodHlwZSlcbiAgICAgIGxldCBzaGFyZVR5cGUgPSB0aGlzLmdldFNoYXJlVHlwZSh0eXBlKVxuICAgICAgdGhpcy5zaGFyZVRpdGxlID0gYCR7dGhpcy5tZW1iZXJJbmZvLm5pY2tuYW1lfeWIhuS6q+S6huS4gOS4qiR7c2hhcmVUeXBlfe+8jOeCueWHuyR7c2hhcmVBY3Rpb25UeXBlfWBcbiAgICAgIHRoaXMuc2hhcmVJbWcgPSB0aGlzLnNoYXJlSW1nU3JjW3R5cGVdXG4gICAgICB0aGlzLnNob3dTaGFyZUZsYWcgPSB0cnVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICByZW1vdmVDaXJjbGUoaWQsIGlkeCkge1xuICAgICAgZGVsZXRlQ2lyY2xlKHtcbiAgICAgICAgbW9tZW50X2lkOiBpZCxcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgc2hvd01zZygn5oiQ5Yqf5Yig6ZmkJylcbiAgICAgICAgICB0aGlzLmxpc3Quc3BsaWNlKGlkeCwgMSlcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBwYXkobW9tZW50SWQsIGNvbGxlY3Rpb25JZCkge1xuICAgICAgaWYgKHRoaXMucGF5bWVudExvY2tlZCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHRoaXMucGF5bWVudExvY2tlZCA9IHRydWVcbiAgICAgIGNoZWNrU3R1ZGVudCh7XG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgICAgbW9tZW50X2lkOiBtb21lbnRJZCxcbiAgICAgICAgaXNfcGF5OiAwXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIHRoaXMucGF5TWVtYmVyTGlzdCA9IHJlcy5kYXRhLmxpc3RcbiAgICAgICAgaWYgKCF0aGlzLnBheU1lbWJlckxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5wYXltZW50TG9ja2VkID0gZmFsc2VcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgc2hvd01zZygn6K+35Yu/6YeN5aSN57y06LS5JylcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wYXlNZW1iZXJMaXN0Lmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdEZsYWcgPSB0cnVlXG4gICAgICAgICAgdGhpcy5jdXJyZW50Q29sbGVjdGlvbklkID0gY29sbGVjdGlvbklkXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc3R1ZGVudElkcyA9IFtdXG4gICAgICAgICAgdGhpcy5zdHVkZW50SWRzLnB1c2godGhpcy5wYXlNZW1iZXJMaXN0WzBdLmlkKVxuICAgICAgICAgIHRoaXMuYWRkVG9PcmRlcihjb2xsZWN0aW9uSWQpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBzdWJtaXRKb2luQWN0aXZpdHkoKSB7XG4gICAgICBpZiAodGhpcy5jdXJyZXJudEpvaW5BY2l0aXZ5dElkIDw9IDApIHtcbiAgICAgICAgc2hvd01zZygn6K+35YWI6YCJ5oup5rS75Yqo6aG555uuJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGpvaW5BY3Rpdml0eSh7XG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgICAgYWN0aXZpdHlfaXRlbV9pZDogdGhpcy5jdXJyZXJudFN1YkFjdGl2aXR5SWQsXG4gICAgICAgIGFjdGl2aXR5X2lkOiB0aGlzLmN1cnJlcm50Sm9pbkFjaXRpdnl0SWRcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICBzaG93TXNnKCfmj5DkuqTmiJDlip8nKVxuICAgICAgICAgIHRoaXMuY3VycmVybnRTdWJBY3Rpdml0eUlkID0gW11cbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBqb2luQWN0aXZpdHkoaWQsIHN1YklkLCBsaXN0SW5kZXgsIGFjdGl2aXR5SW5kZXgpIHtcbiAgICAgIGlmICghdGhpcy5jbGFzc0luZm8pIHtcbiAgICAgICAgc2hvd01zZygn6K+35YWI6YCJ5oup54+t57qnJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB0aGlzLmN1cnJlcm50Sm9pbkFjaXRpdnl0SWQgPSBpZFxuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmN1cnJlcm50U3ViQWN0aXZpdHlJZC5pbmRleE9mKHN1YklkKVxuICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgdGhpcy5jdXJyZXJudFN1YkFjdGl2aXR5SWQuc3BsaWNlKGluZGV4LCAxKVxuICAgICAgICB0aGlzLmxpc3RbbGlzdEluZGV4XS5pbmZvLml0ZW1bYWN0aXZpdHlJbmRleF0uY2hlY2tlZCA9IGZhbHNlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmN1cnJlcm50U3ViQWN0aXZpdHlJZC5wdXNoKHN1YklkKVxuICAgICAgICB0aGlzLmxpc3RbbGlzdEluZGV4XS5pbmZvLml0ZW1bYWN0aXZpdHlJbmRleF0uY2hlY2tlZCA9IHRydWVcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGxvYWRNb3JlQ29tbWVudChtb21lbnRJZCwgaWR4KSB7XG4gICAgICBjb25zdCByZXRPYmogPSB0aGlzLmZpbmRMb2FkbW9yZUNvbW1lbnRJbmZvKHRoaXMubG9hZE1vcmVDb21tZW50QXJyYXksIG1vbWVudElkKTtcbiAgICAgIGdldENvbW1lbnRMaXN0KHtcbiAgICAgICAgbW9tZW50X2lkOiBtb21lbnRJZCxcbiAgICAgICAgcHM6IHRoaXMuY29tbWVudFBzLFxuICAgICAgICBwbjogcmV0T2JqLmNvbW1lbnRQbiA/IHJldE9iai5jb21tZW50UG4gOiB0aGlzLmNvbW1lbnRQbixcbiAgICAgICAgb2Zmc2V0OiB0aGlzLmNvbW1lbnRPZmZzZXRcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICBsZXQgcmVzdWx0TGlzdCA9IHJlcy5kYXRhLmxpc3RcbiAgICAgICAgICBsZXQge2xpc3R9ID0gdGhpcy5saXN0W2lkeF0uY29tbWVudF9saXN0XG4gICAgICAgICAgbGlzdCA9IFsuLi5saXN0LCAuLi5yZXN1bHRMaXN0XVxuICAgICAgICAgIHRoaXMubGlzdFtpZHhdLmNvbW1lbnRfbGlzdC5saXN0ID0gbGlzdFxuICAgICAgICAgIGlmIChyZXN1bHRMaXN0Lmxlbmd0aCA8IHRoaXMuY29tbWVudFBzKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RbaWR4XS5jb21tZW50TG9hZEZpbmlzaGVkID0gdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIXJldE9iai5jb21tZW50UG4pIHtcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IHtcbiAgICAgICAgICAgICAgY29tbWVudFBuOiB0aGlzLmNvbW1lbnRQbiArIDEsXG4gICAgICAgICAgICAgIG1vbWVudF9pZDogbW9tZW50SWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubG9hZE1vcmVDb21tZW50QXJyYXkucHVzaChvYmopXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9hZE1vcmVDb21tZW50QXJyYXlbcmV0T2JqLmluZGV4XS5jb21tZW50UG4gPSByZXRPYmouY29tbWVudFBuICsgMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgYWRkQ29tbWVudCh0eXBlLCBpZCwgcm9vdElkLCB0b0NvbW1lbnRJZCwgbmFtZSkge1xuICAgICAgaWYgKHRvQ29tbWVudElkID09PSB0aGlzLm1lbWJlckluZm8ubWVtYmVyX2lkKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+S4jeimgeWbnuWkjeiHquW3sScpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLmNsYXNzSW5mbykge1xuICAgICAgICBzaG93TXNnKCfor7flhYjpgInmi6nnj63nuqcnKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHRoaXMuY29tbWVudEZsYWcgPSB0cnVlXG4gICAgICB0aGlzLmN1cnJlbnRSZXBseUlkID0gaWRcbiAgICAgIHRoaXMuY3VycmVudFJlcGx5Um9vdElkID0gdHlwZSA9PT0gJ2FkZCcgPyAwIDogcm9vdElkXG4gICAgICBpZiAobmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuY29tbWVudElucHV0ID0gYEAke25hbWV9OmBcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29tbWVudElucHV0ID0gJydcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGJpbmRDb21tZW50SW5wdXQgKHZhbHVlKSB7XG4gICAgICB0aGlzLmNvbW1lbnRJbnB1dCA9IHZhbHVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBjb21tZW50U3VyZSAoKSB7XG4gICAgICB0aGlzLmNvbW1lbnRGbGFnID0gZmFsc2VcbiAgICAgIGFkZENvbW1lbnQoe1xuICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXG4gICAgICAgIG1vbWVudF9pZDogdGhpcy5jdXJyZW50UmVwbHlJZCxcbiAgICAgICAgY29udGVudDogdGhpcy5jdXJyZW50UmVwbHlJZCA+IDAgPyB0aGlzLmNvbW1lbnRJbnB1dC5yZXBsYWNlKC9eQC4rOi8sICcnKSA6IHRoaXMuY29tbWVudElucHV0LFxuICAgICAgICByb290X2lkOiB0aGlzLmN1cnJlbnRSZXBseVJvb3RJZCxcbiAgICAgICAgdG9fY29tbWVudF9pZDogdGhpcy5jdXJyZW50UmVwbHlSb290SWRcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICB0aGlzLmNvbW1lbnRJbnB1dCA9ICcnXG4gICAgICAgICAgdGhpcy5yZXNldERhdGEoKVxuICAgICAgICAgIHRoaXMuZ2V0Wm9uZUxpc3QoKVxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIGp1bXBQdWJsaXNoKHZhbHVlKSB7XG4gICAgICBpZiAoIXRoaXMuY2xhc3NJbmZvKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+mAiee7keWumuePree6pycsIDMwMDApXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgbGV0IHVybCA9IHZhbHVlID09PSAnYWNjb3VudCcgPyAncmVjb3JkQ2FzaGZsb3cnIDogYHB1Ymxpc2g/dHlwZT0ke3ZhbHVlfWBcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6IHVybFxuICAgICAgfSlcbiAgICB9LFxuICAgIGNvbW1lbnRDYW5jZWwgKCkge1xuICAgICAgdGhpcy5jb21tZW50RmxhZyA9IGZhbHNlXG4gICAgICB0aGlzLmNvbW1lbnRJbnB1dCA9ICcnXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBqdW1wUGFnZSAocGFnZU5hbWUsIHR5cGUpIHtcbiAgICAgIHRoaXMucHVibGlzaEZsYWcgPSBmYWxzZVxuICAgICAgdGhpcy5zZXRGbGFnID0gZmFsc2VcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6IGAke3BhZ2VOYW1lfT90eXBlPSR7dHlwZX1gXG4gICAgICB9KVxuICAgIH0sXG4gICAgdG9nZ2xlTWVudSAodHlwZSkge1xuICAgICAgaWYgKCF0aGlzLmNsYXNzSW5mbykge1xuICAgICAgICBzaG93TXNnKCfor7fpgInnu5Hlrprnj63nuqcnLCAzMDAwKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHRoaXNbdHlwZV0gPSAhdGhpc1t0eXBlXVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgY2xvc2VUb2dnbGUgKCkge1xuICAgICAgdGhpcy5zZXRGbGFnID0gZmFsc2VcbiAgICAgIHRoaXMucHVibGlzaEZsYWcgPSBmYWxzZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgcHJldmlldyhpbWcsIGltZ0xpc3QpIHtcbiAgICAgIHByZXZpZXdJbWFnZShpbWcsIGltZ0xpc3QpXG4gICAgfSxcbiAgICBzZWxlY3RDYW5jZWwoKSB7XG4gICAgICB0aGlzLnNlbGVjdEZsYWcgPSBmYWxzZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgY2FuY2VsU2hhcmVGbigpIHtcbiAgICAgIHRoaXMuc2hvd1NoYXJlRmxhZyA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBzZWxlY3RTdXJlKHZhbHVlKSB7XG4gICAgICBpZiAoIXZhbHVlLmxlbmd0aCkge1xuICAgICAgICBzaG93TXNnKCfor7fpgInmi6knKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGNvbnN0IHZhbCA9IHZhbHVlXG4gICAgICB0aGlzLnN0dWRlbnRJZHMgPSBbLi4udmFsXVxuICAgICAgdGhpcy5zZWxlY3RGbGFnID0gZmFsc2VcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIHRoaXMuYWRkVG9PcmRlcih0aGlzLmN1cnJlbnRDb2xsZWN0aW9uSWQpXG4gICAgfVxuICB9XG4gIG9uU2hhcmVBcHBNZXNzYWdlKHJlcykge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogdGhpcy5zaGFyZVRpdGxlLFxuICAgICAgaW1hZ2VVcmw6IHRoaXMuc2hhcmVJbWdcbiAgICB9XG4gIH1cbn1cbiJdfQ==