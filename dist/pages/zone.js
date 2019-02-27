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
      navigationBarTitleText: '发现',
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
      this.resetData();
      this.getZoneList();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInpvbmUuanMiXSwibmFtZXMiOlsiWm9uZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJDdXJyZW50TW9kYWwiLCJTZWxlY3RNb2RhbCIsInNoYXJlTW9kYWwiLCJkYXRhIiwibWVudUxpc3QiLCJ0ZXh0IiwidHlwZSIsInNyYyIsImNvbW1lbnRGbGFnIiwic2VsZWN0RmxhZyIsImFjdGl2ZVR5cGUiLCJzZXRGbGFnIiwicHVibGlzaEZsYWciLCJjaXJjbGVzIiwiY29sbGVjdGlvbiIsIm5vdGlmeSIsImFjdGl2aXR5IiwiYWNjb3VudCIsInNoYXJlSW1nU3JjIiwicG4iLCJwcyIsImxpc3QiLCJwYXlNZW1iZXJMaXN0IiwiY2xhc3NJbmZvIiwibWVtYmVySW5mbyIsInNjaG9vbEluZm8iLCJsb2FkaW5nIiwibG9hZEZpbmlzaGVkIiwiY29tbWVudElucHV0IiwiY3VycmVudFJlcGx5SWQiLCJjdXJyZW50UmVwbHlSb290SWQiLCJjdXJyZW50UmVwbHlUb0NvbW1lbnRJZCIsImN1cnJlcm50Sm9pbkFjaXRpdnl0SWQiLCJjdXJyZXJudFN1YkFjdGl2aXR5SWQiLCJjdXJyZW50Q29sbGVjdGlvbklkIiwiYXV0aCIsInByZXNpZGVudCIsImZpbmFuY2UiLCJwaG90b3MiLCJjb21tZW50UG4iLCJjb21tZW50UHMiLCJjb21tZW50T2Zmc2V0IiwiY29tbWVudExvYWRGaW5pc2hlZCIsIm1lbWJlckxpc3QiLCJzdHVkZW50SWRzIiwiZmlyc3RJbml0IiwicGF5bWVudExvY2tlZCIsImxvYWRNb3JlQ29tbWVudEFycmF5Iiwic2hhcmVUaXRsZSIsInNob3dTaGFyZUZsYWciLCJzaGFyZUltZyIsIndhdGNoIiwibmV3VmFsIiwib2xkVmFsIiwicmVzZXREYXRhIiwiZ2V0QXV0aExpc3QiLCJnZXRab25lTGlzdCIsImN1cnJlbnRKb2luQWN0aXZpdHlJZCIsIiRhcHBseSIsIm1ldGhvZHMiLCJzaGFyZUNpcmNsZSIsInNoYXJlQWN0aW9uVHlwZSIsImdldFNoYXJlQWN0aW9uVHlwZSIsInNoYXJlVHlwZSIsImdldFNoYXJlVHlwZSIsIm5pY2tuYW1lIiwicmVtb3ZlQ2lyY2xlIiwiaWQiLCJpZHgiLCJtb21lbnRfaWQiLCJjbGFzc19pZCIsInRoZW4iLCJyZXMiLCJzdWNjZXNzIiwic3BsaWNlIiwicGF5IiwibW9tZW50SWQiLCJjb2xsZWN0aW9uSWQiLCJpc19wYXkiLCJsZW5ndGgiLCJwdXNoIiwiYWRkVG9PcmRlciIsInN1Ym1pdEpvaW5BY3Rpdml0eSIsImFjdGl2aXR5X2l0ZW1faWQiLCJhY3Rpdml0eV9pZCIsImpvaW5BY3Rpdml0eSIsInN1YklkIiwibGlzdEluZGV4IiwiYWN0aXZpdHlJbmRleCIsImluZGV4IiwiaW5kZXhPZiIsImluZm8iLCJpdGVtIiwiY2hlY2tlZCIsImxvYWRNb3JlQ29tbWVudCIsInJldE9iaiIsImZpbmRMb2FkbW9yZUNvbW1lbnRJbmZvIiwib2Zmc2V0IiwicmVzdWx0TGlzdCIsImNvbW1lbnRfbGlzdCIsIm9iaiIsImFkZENvbW1lbnQiLCJyb290SWQiLCJ0b0NvbW1lbnRJZCIsIm5hbWUiLCJtZW1iZXJfaWQiLCJ1bmRlZmluZWQiLCJiaW5kQ29tbWVudElucHV0IiwidmFsdWUiLCJjb21tZW50U3VyZSIsImNvbnRlbnQiLCJyZXBsYWNlIiwicm9vdF9pZCIsInRvX2NvbW1lbnRfaWQiLCJqdW1wUHVibGlzaCIsInVybCIsInd4IiwibmF2aWdhdGVUbyIsImNvbW1lbnRDYW5jZWwiLCJqdW1wUGFnZSIsInBhZ2VOYW1lIiwidG9nZ2xlTWVudSIsImNsb3NlVG9nZ2xlIiwicHJldmlldyIsImltZyIsImltZ0xpc3QiLCJzZWxlY3RDYW5jZWwiLCJjYW5jZWxTaGFyZUZuIiwic2VsZWN0U3VyZSIsInZhbCIsImdldFN0b3JhZ2VTeW5jIiwiY2hlY2tEYXRhRXhpc3QiLCJyZUxhdW5jaCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwidXNlckRhdGEiLCJjaGVja0F1dGgiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsImkiLCJsZW4iLCJjb2RlIiwiaXNBdXRoIiwiaXNfYXV0aCIsImZvcm1hdEFsbEF1dGgiLCJmb3JtYXRTaW5nbGVBdXRoIiwic2VlX3R5cGUiLCJjb21tZW50X2NvdW50Iiwib3JkZXJfaWQiLCJfdGhpcyIsInBheW1lbnRfcGFyYW1zIiwicmVxdWVzdFBheW1lbnQiLCJ0aW1lU3RhbXAiLCJTdHJpbmciLCJub25jZVN0ciIsInBhY2thZ2UiLCJwYXlTaWduIiwic2lnblR5cGUiLCJmYWlsIiwic3R1ZGVudF9pZHMiLCJjb2xsZWN0aW9uX2l0ZW1faWQiLCJwYXltZW50UGFyYW1zIiwiYXJyIiwiY3VycmVudElkIiwiYXNzaWduIiwiYWN0aW9uIiwiY2F0ZWdvcnkiLCJ0aXRsZSIsImltYWdlVXJsIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsSTs7Ozs7Ozs7Ozs7Ozs7cUxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCLElBRGpCO0FBRVBDLDZCQUF1QjtBQUZoQixLLFNBSVZDLE8sR0FBVSxFLFNBQ1hDLE0sR0FBUyxFQUFDLGdCQUFlLEVBQUMsZUFBYyxJQUFmLEVBQW9CLGlCQUFnQixJQUFwQyxFQUF5QyxtQkFBa0IsU0FBM0QsRUFBcUUsZ0JBQWUsRUFBcEYsRUFBdUYsb0JBQW1CLGFBQTFHLEVBQXdILDRCQUEyQixjQUFuSixFQUFrSyxjQUFhLEVBQS9LLEVBQWhCLEVBQW1NLGVBQWMsRUFBQyxvQkFBbUIsWUFBcEIsRUFBaUMsb0JBQW1CLGVBQXBELEVBQWpOLEVBQXNSLGNBQWEsRUFBQyxvQkFBbUIsZUFBcEIsRUFBb0MscUJBQW9CLFlBQXhELEVBQXFFLHNCQUFxQixVQUExRixFQUFuUyxFLFNB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QUw7QUFDRWlLLG1CQUFTLElBQVQ7QUFDQSxpQkFBT0EsTUFBUDtBQUNGLGFBQUssWUFBTDtBQUNFQSxtQkFBUyxJQUFUO0FBQ0EsaUJBQU9BLE1BQVA7QUFDRjtBQUNFLGlCQUFPQSxNQUFQO0FBUko7QUFVRDs7O2lDQUNZakssSSxFQUFNO0FBQ2pCLFVBQUlrSyxXQUFXLEVBQWY7QUFDQSxVQUFJbEssU0FBUyxTQUFiLEVBQXdCO0FBQ3RCa0ssbUJBQVcsT0FBWDtBQUNELE9BRkQsTUFFTztBQUNMQSwwQ0FBaUIsS0FBS2xLLElBQUwsQ0FBVUEsSUFBVixDQUFqQjtBQUNEO0FBQ0QsYUFBT2tLLFFBQVA7QUFDRDs7O3NDQThNaUJoRyxHLEVBQUs7QUFDckIsYUFBTztBQUNMaUcsZUFBTyxLQUFLekgsVUFEUDtBQUVMMEgsa0JBQVUsS0FBS3hIO0FBRlYsT0FBUDtBQUlEOzs7O0VBcmUrQnlILGVBQUtDLEk7O2tCQUFsQnBMLEkiLCJmaWxlIjoiem9uZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgU2VsZWN0TW9kYWwgZnJvbSAnLi4vY29tcG9uZW50cy9zZWxlY3RNb2RhbCdcclxuaW1wb3J0IEN1cnJlbnRNb2RhbCBmcm9tICcuLi9jb21wb25lbnRzL2NvbW1lbnRNb2RhbCdcclxuaW1wb3J0IHNoYXJlTW9kYWwgZnJvbSAnLi4vY29tcG9uZW50cy9zaGFyZU1vZGFsJ1xyXG5pbXBvcnQgeyBzaG93TXNnLCBwcmV2aWV3SW1hZ2UgfSBmcm9tICcuLi91dGlscy9jb21tb24nXHJcbmltcG9ydCB7IGdldENpcmNsZUxpc3QsIGFkZENvbW1lbnQsIGpvaW5BY3Rpdml0eSwgZ2V0Q29tbWVudExpc3QsIGRlbGV0ZUNpcmNsZSB9IGZyb20gJy4uL2FwaS96b25lJ1xyXG5pbXBvcnQgeyBhZGRPcmRlciwgZ2V0UGF5bWVudFBhcmFtcyB9IGZyb20gJy4uL2FwaS9maW5hbmNlJ1xyXG5pbXBvcnQgeyBnZXRBdXRoIH0gZnJvbSAnLi4vYXBpL2F1dGhvcml6ZSdcclxuaW1wb3J0IHsgY2hlY2tTdHVkZW50IH0gZnJvbSAnLi4vYXBpL3VzZXInXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFpvbmUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflj5HnjrAnLFxyXG4gICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiB0cnVlXHJcbiAgfVxyXG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJDdXJyZW50TW9kYWxcIjp7XCJzdXJlQnRuVGV4dFwiOlwi56Gu6K6kXCIsXCJjYW5jZWxCdG5UZXh0XCI6XCLlj5bmtohcIixcInBsYWNlaG9sZGVyVGV4dFwiOlwi6K+36L6T5YWl6K+E6K665YaF5a65XCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmZsYWcuc3luY1wiOlwiY29tbWVudEZsYWdcIixcInYtYmluZDpjb21tZW50SW5wdXQuc3luY1wiOlwiY29tbWVudElucHV0XCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJTZWxlY3RNb2RhbFwiOntcInYtYmluZDpmbGFnLnN5bmNcIjpcInNlbGVjdEZsYWdcIixcInYtYmluZDpsaXN0LnN5bmNcIjpcInBheU1lbWJlckxpc3RcIn0sXCJzaGFyZU1vZGFsXCI6e1widi1iaW5kOmZsYWcuc3luY1wiOlwic2hvd1NoYXJlRmxhZ1wiLFwidi1iaW5kOnRpdGxlLnN5bmNcIjpcInNoYXJlVGl0bGVcIixcInYtYmluZDppbWdTcmMuc3luY1wiOlwic2hhcmVJbWdcIn19O1xyXG4kZXZlbnRzID0ge1wiQ3VycmVudE1vZGFsXCI6e1widi1vbjpjYW5jZWxcIjpcImNvbW1lbnRDYW5jZWxcIixcInYtb246c3VyZVwiOlwiY29tbWVudFN1cmVcIixcInYtb246aW5wdXRcIjpcImJpbmRDb21tZW50SW5wdXRcIn0sXCJTZWxlY3RNb2RhbFwiOntcInYtb246Y2FuY2VsXCI6XCJzZWxlY3RDYW5jZWxcIixcInYtb246c3VyZVwiOlwic2VsZWN0U3VyZVwifSxcInNoYXJlTW9kYWxcIjp7XCJ2LW9uOmNhbmNlbFwiOlwiY2FuY2VsU2hhcmVGblwiLFwidi1vbjpzdXJlXCI6XCJjYW5jZWxTaGFyZUZuXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICBDdXJyZW50TW9kYWwsXHJcbiAgICBTZWxlY3RNb2RhbCxcclxuICAgIHNoYXJlTW9kYWxcclxuICB9XHJcbiAgZGF0YSA9IHtcclxuICAgIG1lbnVMaXN0OiBbXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiAn5a626ZW/5ZyIJyxcclxuICAgICAgICB0eXBlOiAnem9uZScsXHJcbiAgICAgICAgc3JjOiAnL2ltYWdlcy9pY29uLzIuanBnJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogJ+aUtuasvicsXHJcbiAgICAgICAgdHlwZTogJ21vbmV5JyxcclxuICAgICAgICBzcmM6ICcvaW1hZ2VzL2ljb24vbW9uZXkuanBnJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogJ+mAmuefpScsXHJcbiAgICAgICAgdHlwZTogJ25vdGljZScsXHJcbiAgICAgICAgc3JjOiAnL2ltYWdlcy9pY29uLzQuanBnJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogJ+a0u+WKqCcsXHJcbiAgICAgICAgdHlwZTogJ2FjdGl2aXR5JyxcclxuICAgICAgICBzcmM6ICcvaW1hZ2VzL2ljb24vNS5qcGcnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiAn6K6w6LSmJyxcclxuICAgICAgICB0eXBlOiAnYWNjb3VudCcsXHJcbiAgICAgICAgc3JjOiAnL2ltYWdlcy9pY29uL3Bob3Rvcy5qcGcnXHJcbiAgICAgIH1cclxuICAgIF0sXHJcbiAgICBjb21tZW50RmxhZzogZmFsc2UsXHJcbiAgICBzZWxlY3RGbGFnOiBmYWxzZSxcclxuICAgIGFjdGl2ZVR5cGU6ICdhbGwnLFxyXG4gICAgc2V0RmxhZzogZmFsc2UsXHJcbiAgICBwdWJsaXNoRmxhZzogZmFsc2UsXHJcbiAgICB0eXBlOiB7XHJcbiAgICAgIGNpcmNsZXM6ICflrrbplb/lnIgnLFxyXG4gICAgICBjb2xsZWN0aW9uOiAn5pS25qy+JyxcclxuICAgICAgbm90aWZ5OiAn6YCa55+lJyxcclxuICAgICAgYWN0aXZpdHk6ICfmtLvliqgnLFxyXG4gICAgICBhY2NvdW50OiAn6K6w6LSmJ1xyXG4gICAgfSxcclxuICAgIHNoYXJlSW1nU3JjOiB7XHJcbiAgICAgIGNpcmNsZXM6ICcuLi9pbWFnZXMvc2hhcmUvY2lyY2xlcy5qcGcnLFxyXG4gICAgICBjb2xsZWN0aW9uOiAnLi4vaW1hZ2VzL3NoYXJlL2NvbGxlY3Rpb24uanBnJyxcclxuICAgICAgbm90aWZ5OiAnLi4vaW1hZ2VzL3NoYXJlL25vdGlmeS5qcGcnLFxyXG4gICAgICBhY3Rpdml0eTogJy4uL2ltYWdlcy9zaGFyZS9hY3Rpdml0eS5qcGcnLFxyXG4gICAgICBhY2NvdW50OiAnLi4vaW1hZ2VzL3NoYXJlL2FjY291bnQuanBnJ1xyXG4gICAgfSxcclxuICAgIHBuOiAxLFxyXG4gICAgcHM6IDEwLFxyXG4gICAgbGlzdDogW10sXHJcbiAgICBwYXlNZW1iZXJMaXN0OiBbXSxcclxuICAgIGNsYXNzSW5mbzogbnVsbCxcclxuICAgIG1lbWJlckluZm86IG51bGwsXHJcbiAgICBzY2hvb2xJbmZvOiBudWxsLFxyXG4gICAgbG9hZGluZzogZmFsc2UsXHJcbiAgICBsb2FkRmluaXNoZWQ6IGZhbHNlLFxyXG4gICAgY29tbWVudElucHV0OiAnJyxcclxuICAgIGN1cnJlbnRSZXBseUlkOiAtMSxcclxuICAgIGN1cnJlbnRSZXBseVJvb3RJZDogLTEsXHJcbiAgICBjdXJyZW50UmVwbHlUb0NvbW1lbnRJZDogLTEsXHJcbiAgICBjdXJyZXJudEpvaW5BY2l0aXZ5dElkOiAtMSxcclxuICAgIGN1cnJlcm50U3ViQWN0aXZpdHlJZDogW10sXHJcbiAgICBjdXJyZW50Q29sbGVjdGlvbklkOiAtMSxcclxuICAgIGF1dGg6IHtcclxuICAgICAgcHJlc2lkZW50OiBmYWxzZSxcclxuICAgICAgZmluYW5jZTogZmFsc2UsXHJcbiAgICAgIGFjdGl2aXR5OiBmYWxzZSxcclxuICAgICAgbm90aWZ5OiBmYWxzZSxcclxuICAgICAgcGhvdG9zOiBmYWxzZSxcclxuICAgICAgY2lyY2xlczogZmFsc2VcclxuICAgIH0sXHJcbiAgICBjb21tZW50UG46IDIsXHJcbiAgICBjb21tZW50UHM6IDYsXHJcbiAgICBjb21tZW50T2Zmc2V0OiA2LFxyXG4gICAgY29tbWVudExvYWRGaW5pc2hlZDogZmFsc2UsXHJcbiAgICBtZW1iZXJMaXN0OiBbXSxcclxuICAgIHN0dWRlbnRJZHM6IFtdLFxyXG4gICAgZmlyc3RJbml0OiB0cnVlLFxyXG4gICAgcGF5bWVudExvY2tlZDogZmFsc2UsXHJcbiAgICBsb2FkTW9yZUNvbW1lbnRBcnJheTogW10sXHJcbiAgICBzaGFyZVRpdGxlOiAnJyxcclxuICAgIHNob3dTaGFyZUZsYWc6IGZhbHNlLFxyXG4gICAgc2hhcmVJbWc6ICcnXHJcbiAgfVxyXG4gIHdhdGNoID0ge1xyXG4gICAgY2xhc3NJbmZvKG5ld1ZhbCwgb2xkVmFsKSB7XHJcbiAgICAgIC8vIOWIh+aNouS6huePree6p+S5i+WQjuaVsOaNruimgeabtOaWsFxyXG4gICAgICBpZiAob2xkVmFsICE9PSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5yZXNldERhdGEoKVxyXG4gICAgICAgIHRoaXMuZ2V0QXV0aExpc3QoKVxyXG4gICAgICAgIHRoaXMuZ2V0Wm9uZUxpc3QoKVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgY3VycmVudEpvaW5BY3Rpdml0eUlkKG5ld1ZhbCwgb2xkVmFsKSB7XHJcbiAgICAgIGlmIChuZXdWYWwgPiAwKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZXJudFN1YkFjdGl2aXR5SWQgPSBbXVxyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICByZXNldERhdGEoKSB7XHJcbiAgICB0aGlzLmxvYWRNb3JlQ29tbWVudEFycmF5ID0gW11cclxuICAgIHRoaXMuY29tbWVudExvYWRGaW5pc2hlZCA9IGZhbHNlXHJcbiAgICB0aGlzLmNvbW1lbnRQbiA9IDJcclxuICAgIHRoaXMuY29tbWVudFBzID0gNlxyXG4gICAgdGhpcy5zdHVkZW50SWRzID0gW11cclxuICAgIHRoaXMucGF5bWVudExvY2tlZCA9IGZhbHNlXHJcbiAgICB0aGlzLnBuID0gMVxyXG4gICAgdGhpcy5saXN0ID0gW11cclxuICAgIHRoaXMuJGFwcGx5KClcclxuICB9XHJcbiAgb25QdWxsRG93blJlZnJlc2goKSB7XHJcbiAgICB0aGlzLnJlc2V0RGF0YSgpXHJcbiAgICB0aGlzLmdldFpvbmVMaXN0KClcclxuICB9XHJcbiAgb25SZWFjaEJvdHRvbSgpIHtcclxuICAgIGlmICh0aGlzLmxvYWRpbmcgfHwgdGhpcy5sb2FkRmluaXNoZWQpIHJldHVyblxyXG4gICAgdGhpcy5nZXRab25lTGlzdCgpXHJcbiAgfVxyXG4gIG9uU2hvdygpIHtcclxuICAgIHRoaXMuY3VycmVybnRKb2luQWNpdGl2eXRJZCA9IC0xXHJcbiAgICB0aGlzLmN1cnJlcm50U3ViQWN0aXZpdHlJZCA9IFtdXHJcbiAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxyXG4gICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgdGhpcy5yZXNldERhdGEoKVxyXG4gICAgdGhpcy5nZXRab25lTGlzdCgpXHJcbiAgfVxyXG4gIG9uTG9hZCgpIHtcclxuICAgIGlmICghdGhpcy5jaGVja0RhdGFFeGlzdCgnbWVtYmVySW5mbycpKSB7XHJcbiAgICAgIHd4LnJlTGF1bmNoKHtcclxuICAgICAgICB1cmw6ICdsb2dpbidcclxuICAgICAgfSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXHJcbiAgICAgIHRoaXMuY2xhc3NJbmZvICYmIHRoaXMuZ2V0QXV0aExpc3QoKVxyXG4gICAgICB0aGlzLm1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXHJcbiAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJEYXRhID0gdGhpcy5tZW1iZXJJbmZvXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgdGhpcy5nZXRab25lTGlzdCgpXHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldEF1dGhMaXN0KCkge1xyXG4gICAgZ2V0QXV0aCh7XHJcbiAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZFxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICB0aGlzLmNoZWNrQXV0aChyZXMuZGF0YS5kYXRhKVxyXG4gICAgfSlcclxuICB9XHJcbiAgZm9ybWF0QWxsQXV0aChvYmopIHtcclxuICAgIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICBvYmpba2V5XSA9IHRydWVcclxuICAgIH0pXHJcbiAgICB0aGlzLiRhcHBseSgpXHJcbiAgfVxyXG4gIGZvcm1hdFNpbmdsZUF1dGgobmFtZSkge1xyXG4gICAgdGhpcy5hdXRoW25hbWVdID0gdHJ1ZVxyXG4gICAgdGhpcy4kYXBwbHkoKVxyXG4gIH1cclxuICBjaGVja0F1dGgobGlzdCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGxpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgbGV0IHtjb2RlLCBpc19hdXRoOiBpc0F1dGh9ID0gbGlzdFtpXVxyXG4gICAgICBpZiAoY29kZSA9PT0gJ3ByZXNpZGVudCcgJiYgaXNBdXRoKSB7XHJcbiAgICAgICAgdGhpcy5mb3JtYXRBbGxBdXRoKHRoaXMuYXV0aClcclxuICAgICAgICBicmVha1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlzQXV0aCAmJiB0aGlzLmZvcm1hdFNpbmdsZUF1dGgoY29kZSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBjaGVja0RhdGFFeGlzdChrZXkpIHtcclxuICAgIGlmICh3eC5nZXRTdG9yYWdlU3luYyhrZXkpKSB7XHJcbiAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2VcclxuICB9XHJcbiAgZ2V0Wm9uZUxpc3QoKSB7XHJcbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlXHJcbiAgICB0aGlzLiRhcHBseSgpXHJcbiAgICBjb25zdCBpZCA9IHRoaXMuY2xhc3NJbmZvLmlkXHJcbiAgICBnZXRDaXJjbGVMaXN0KHtcclxuICAgICAgY2xhc3NfaWQ6IGlkLFxyXG4gICAgICBzZWVfdHlwZTogaWQgPyAnJyA6ICdhbGwnLFxyXG4gICAgICB0eXBlOiB0aGlzLmFjdGl2ZVR5cGUsXHJcbiAgICAgIHBuOiB0aGlzLnBuLFxyXG4gICAgICBwczogdGhpcy5wcyxcclxuICAgICAgY29tbWVudF9jb3VudDogM1xyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICBsZXQgeyBsaXN0IH0gPSByZXMuZGF0YVxyXG4gICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZVxyXG4gICAgICB0aGlzLnBuKytcclxuICAgICAgaWYgKGxpc3QubGVuZ3RoIDwgdGhpcy5wcykge1xyXG4gICAgICAgIHRoaXMubG9hZEZpbmlzaGVkID0gdHJ1ZVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubGlzdCA9IFsuLi50aGlzLmxpc3QsIC4uLmxpc3RdXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0pXHJcbiAgfVxyXG4gIHBheW1lbnRQYXJhbXMoaWQpIHtcclxuICAgIGdldFBheW1lbnRQYXJhbXMoe1xyXG4gICAgICBvcmRlcl9pZDogaWRcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgbGV0IF90aGlzID0gdGhpc1xyXG4gICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhLnBheW1lbnRfcGFyYW1zXHJcbiAgICAgIHd4LnJlcXVlc3RQYXltZW50KHtcclxuICAgICAgICB0aW1lU3RhbXA6IFN0cmluZyhkYXRhLnRpbWVTdGFtcCksXHJcbiAgICAgICAgbm9uY2VTdHI6IGRhdGEubm9uY2VTdHIsXHJcbiAgICAgICAgcGFja2FnZTogZGF0YS5wYWNrYWdlLFxyXG4gICAgICAgIHBheVNpZ246IGRhdGEucGF5U2lnbixcclxuICAgICAgICBzaWduVHlwZTogJ01ENScsXHJcbiAgICAgICAgc3VjY2VzcygpIHtcclxuICAgICAgICAgIF90aGlzLnBheW1lbnRMb2NrZWQgPSBmYWxzZVxyXG4gICAgICAgICAgX3RoaXMuJGFwcGx5KClcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZhaWwoKSB7XHJcbiAgICAgICAgICBfdGhpcy5wYXltZW50TG9ja2VkID0gZmFsc2VcclxuICAgICAgICAgIF90aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9XHJcbiAgYWRkVG9PcmRlcihpZCkge1xyXG4gICAgYWRkT3JkZXIoe1xyXG4gICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXHJcbiAgICAgIHN0dWRlbnRfaWRzOiB0aGlzLnN0dWRlbnRJZHMsXHJcbiAgICAgIGNvbGxlY3Rpb25faXRlbV9pZDogaWRcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgdGhpcy5wYXltZW50UGFyYW1zKHJlcy5kYXRhLmRhdGEuaWQpXHJcbiAgICB9KVxyXG4gIH1cclxuICBmaW5kTG9hZG1vcmVDb21tZW50SW5mbyhhcnIsIGN1cnJlbnRJZCkge1xyXG4gICAgbGV0IHJldE9iaiA9IHt9XHJcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gYXJyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgIGlmIChhcnJbaV0ubW9tZW50X2lkID09PSBjdXJyZW50SWQpIHtcclxuICAgICAgICByZXRPYmogPSBPYmplY3QuYXNzaWduKHt9LCBhcnJbaV0sIHtcclxuICAgICAgICAgIGluZGV4OiBpXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJldE9ialxyXG4gIH1cclxuICBnZXRTaGFyZUFjdGlvblR5cGUodHlwZSkge1xyXG4gICAgbGV0IGFjdGlvbiA9ICfmtY/op4gnXHJcbiAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgY2FzZSAnYWN0aXZpdHknOlxyXG4gICAgICAgIGFjdGlvbiA9ICflj4LliqAnXHJcbiAgICAgICAgcmV0dXJuIGFjdGlvblxyXG4gICAgICBjYXNlICdjb2xsZWN0aW9uJzpcclxuICAgICAgICBhY3Rpb24gPSAn57y06LS5J1xyXG4gICAgICAgIHJldHVybiBhY3Rpb25cclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gYWN0aW9uXHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldFNoYXJlVHlwZSh0eXBlKSB7XHJcbiAgICBsZXQgY2F0ZWdvcnkgPSAnJ1xyXG4gICAgaWYgKHR5cGUgPT09ICdjaXJjbGVzJykge1xyXG4gICAgICBjYXRlZ29yeSA9ICflrrbplb/lnIjlm77mlocnXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjYXRlZ29yeSA9IGDlrrblp5TkvJoke3RoaXMudHlwZVt0eXBlXX1gXHJcbiAgICB9XHJcbiAgICByZXR1cm4gY2F0ZWdvcnlcclxuICB9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIHNoYXJlQ2lyY2xlKHR5cGUpIHtcclxuICAgICAgbGV0IHNoYXJlQWN0aW9uVHlwZSA9IHRoaXMuZ2V0U2hhcmVBY3Rpb25UeXBlKHR5cGUpXHJcbiAgICAgIGxldCBzaGFyZVR5cGUgPSB0aGlzLmdldFNoYXJlVHlwZSh0eXBlKVxyXG4gICAgICB0aGlzLnNoYXJlVGl0bGUgPSBgJHt0aGlzLm1lbWJlckluZm8ubmlja25hbWV95YiG5Lqr5LqG5LiA5LiqJHtzaGFyZVR5cGV977yM54K55Ye7JHtzaGFyZUFjdGlvblR5cGV9YFxyXG4gICAgICB0aGlzLnNoYXJlSW1nID0gdGhpcy5zaGFyZUltZ1NyY1t0eXBlXVxyXG4gICAgICB0aGlzLnNob3dTaGFyZUZsYWcgPSB0cnVlXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0sXHJcbiAgICByZW1vdmVDaXJjbGUoaWQsIGlkeCkge1xyXG4gICAgICBkZWxldGVDaXJjbGUoe1xyXG4gICAgICAgIG1vbWVudF9pZDogaWQsXHJcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkXHJcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgc2hvd01zZygn5oiQ5Yqf5Yig6ZmkJylcclxuICAgICAgICAgIHRoaXMubGlzdC5zcGxpY2UoaWR4LCAxKVxyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBwYXkobW9tZW50SWQsIGNvbGxlY3Rpb25JZCkge1xyXG4gICAgICBpZiAodGhpcy5wYXltZW50TG9ja2VkKSB7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5wYXltZW50TG9ja2VkID0gdHJ1ZVxyXG4gICAgICBjaGVja1N0dWRlbnQoe1xyXG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcclxuICAgICAgICBtb21lbnRfaWQ6IG1vbWVudElkLFxyXG4gICAgICAgIGlzX3BheTogMFxyXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgdGhpcy5wYXlNZW1iZXJMaXN0ID0gcmVzLmRhdGEubGlzdFxyXG4gICAgICAgIGlmICghdGhpcy5wYXlNZW1iZXJMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgdGhpcy5wYXltZW50TG9ja2VkID0gZmFsc2VcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgIHNob3dNc2coJ+ivt+WLv+mHjeWkjee8tOi0uScpXHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucGF5TWVtYmVyTGlzdC5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICB0aGlzLnNlbGVjdEZsYWcgPSB0cnVlXHJcbiAgICAgICAgICB0aGlzLmN1cnJlbnRDb2xsZWN0aW9uSWQgPSBjb2xsZWN0aW9uSWRcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5zdHVkZW50SWRzID0gW11cclxuICAgICAgICAgIHRoaXMuc3R1ZGVudElkcy5wdXNoKHRoaXMucGF5TWVtYmVyTGlzdFswXS5pZClcclxuICAgICAgICAgIHRoaXMuYWRkVG9PcmRlcihjb2xsZWN0aW9uSWQpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIHN1Ym1pdEpvaW5BY3Rpdml0eSgpIHtcclxuICAgICAgam9pbkFjdGl2aXR5KHtcclxuICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXHJcbiAgICAgICAgYWN0aXZpdHlfaXRlbV9pZDogdGhpcy5jdXJyZXJudFN1YkFjdGl2aXR5SWQsXHJcbiAgICAgICAgYWN0aXZpdHlfaWQ6IHRoaXMuY3VycmVybnRKb2luQWNpdGl2eXRJZFxyXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgIHNob3dNc2coJ+aPkOS6pOaIkOWKnycpXHJcbiAgICAgICAgICB0aGlzLmN1cnJlcm50U3ViQWN0aXZpdHlJZCA9IFtdXHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIGpvaW5BY3Rpdml0eShpZCwgc3ViSWQsIGxpc3RJbmRleCwgYWN0aXZpdHlJbmRleCkge1xyXG4gICAgICBpZiAoIXRoaXMuY2xhc3NJbmZvKSB7XHJcbiAgICAgICAgc2hvd01zZygn6K+35YWI6YCJ5oup54+t57qnJylcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICB0aGlzLmN1cnJlcm50Sm9pbkFjaXRpdnl0SWQgPSBpZFxyXG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuY3VycmVybnRTdWJBY3Rpdml0eUlkLmluZGV4T2Yoc3ViSWQpXHJcbiAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZXJudFN1YkFjdGl2aXR5SWQuc3BsaWNlKGluZGV4LCAxKVxyXG4gICAgICAgIHRoaXMubGlzdFtsaXN0SW5kZXhdLmluZm8uaXRlbVthY3Rpdml0eUluZGV4XS5jaGVja2VkID0gZmFsc2VcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmN1cnJlcm50U3ViQWN0aXZpdHlJZC5wdXNoKHN1YklkKVxyXG4gICAgICAgIHRoaXMubGlzdFtsaXN0SW5kZXhdLmluZm8uaXRlbVthY3Rpdml0eUluZGV4XS5jaGVja2VkID0gdHJ1ZVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0sXHJcbiAgICBsb2FkTW9yZUNvbW1lbnQobW9tZW50SWQsIGlkeCkge1xyXG4gICAgICBjb25zdCByZXRPYmogPSB0aGlzLmZpbmRMb2FkbW9yZUNvbW1lbnRJbmZvKHRoaXMubG9hZE1vcmVDb21tZW50QXJyYXksIG1vbWVudElkKTtcclxuICAgICAgZ2V0Q29tbWVudExpc3Qoe1xyXG4gICAgICAgIG1vbWVudF9pZDogbW9tZW50SWQsXHJcbiAgICAgICAgcHM6IHRoaXMuY29tbWVudFBzLFxyXG4gICAgICAgIHBuOiByZXRPYmouY29tbWVudFBuID8gcmV0T2JqLmNvbW1lbnRQbiA6IHRoaXMuY29tbWVudFBuLFxyXG4gICAgICAgIG9mZnNldDogdGhpcy5jb21tZW50T2Zmc2V0XHJcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgbGV0IHJlc3VsdExpc3QgPSByZXMuZGF0YS5saXN0XHJcbiAgICAgICAgICBsZXQge2xpc3R9ID0gdGhpcy5saXN0W2lkeF0uY29tbWVudF9saXN0XHJcbiAgICAgICAgICBsaXN0ID0gWy4uLmxpc3QsIC4uLnJlc3VsdExpc3RdXHJcbiAgICAgICAgICB0aGlzLmxpc3RbaWR4XS5jb21tZW50X2xpc3QubGlzdCA9IGxpc3RcclxuICAgICAgICAgIGlmIChyZXN1bHRMaXN0Lmxlbmd0aCA8IHRoaXMuY29tbWVudFBzKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdFtpZHhdLmNvbW1lbnRMb2FkRmluaXNoZWQgPSB0cnVlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoIXJldE9iai5jb21tZW50UG4pIHtcclxuICAgICAgICAgICAgY29uc3Qgb2JqID0ge1xyXG4gICAgICAgICAgICAgIGNvbW1lbnRQbjogdGhpcy5jb21tZW50UG4gKyAxLFxyXG4gICAgICAgICAgICAgIG1vbWVudF9pZDogbW9tZW50SWRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmxvYWRNb3JlQ29tbWVudEFycmF5LnB1c2gob2JqKVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkTW9yZUNvbW1lbnRBcnJheVtyZXRPYmouaW5kZXhdLmNvbW1lbnRQbiA9IHJldE9iai5jb21tZW50UG4gKyAxO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBhZGRDb21tZW50KHR5cGUsIGlkLCByb290SWQsIHRvQ29tbWVudElkLCBuYW1lKSB7XHJcbiAgICAgIGlmICh0b0NvbW1lbnRJZCA9PT0gdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCkge1xyXG4gICAgICAgIHNob3dNc2coJ+ivt+S4jeimgeWbnuWkjeiHquW3sScpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgaWYgKCF0aGlzLmNsYXNzSW5mbykge1xyXG4gICAgICAgIHNob3dNc2coJ+ivt+WFiOmAieaLqeePree6pycpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5jb21tZW50RmxhZyA9IHRydWVcclxuICAgICAgdGhpcy5jdXJyZW50UmVwbHlJZCA9IGlkXHJcbiAgICAgIHRoaXMuY3VycmVudFJlcGx5Um9vdElkID0gdHlwZSA9PT0gJ2FkZCcgPyAwIDogcm9vdElkXHJcbiAgICAgIGlmIChuYW1lICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLmNvbW1lbnRJbnB1dCA9IGBAJHtuYW1lfTpgXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5jb21tZW50SW5wdXQgPSAnJ1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0sXHJcbiAgICBiaW5kQ29tbWVudElucHV0ICh2YWx1ZSkge1xyXG4gICAgICB0aGlzLmNvbW1lbnRJbnB1dCA9IHZhbHVlXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0sXHJcbiAgICBjb21tZW50U3VyZSAoKSB7XHJcbiAgICAgIHRoaXMuY29tbWVudEZsYWcgPSBmYWxzZVxyXG4gICAgICBhZGRDb21tZW50KHtcclxuICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXHJcbiAgICAgICAgbW9tZW50X2lkOiB0aGlzLmN1cnJlbnRSZXBseUlkLFxyXG4gICAgICAgIGNvbnRlbnQ6IHRoaXMuY3VycmVudFJlcGx5SWQgPiAwID8gdGhpcy5jb21tZW50SW5wdXQucmVwbGFjZSgvXkAuKzovLCAnJykgOiB0aGlzLmNvbW1lbnRJbnB1dCxcclxuICAgICAgICByb290X2lkOiB0aGlzLmN1cnJlbnRSZXBseVJvb3RJZCxcclxuICAgICAgICB0b19jb21tZW50X2lkOiB0aGlzLmN1cnJlbnRSZXBseVJvb3RJZFxyXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgIHRoaXMuY29tbWVudElucHV0ID0gJydcclxuICAgICAgICAgIHRoaXMucmVzZXREYXRhKClcclxuICAgICAgICAgIHRoaXMuZ2V0Wm9uZUxpc3QoKVxyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBqdW1wUHVibGlzaCh2YWx1ZSkge1xyXG4gICAgICBpZiAoIXRoaXMuY2xhc3NJbmZvKSB7XHJcbiAgICAgICAgc2hvd01zZygn6K+36YCJ57uR5a6a54+t57qnJywgMzAwMClcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICBsZXQgdXJsID0gdmFsdWUgPT09ICdhY2NvdW50JyA/ICdyZWNvcmRDYXNoZmxvdycgOiBgcHVibGlzaD90eXBlPSR7dmFsdWV9YFxyXG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICB1cmw6IHVybFxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIGNvbW1lbnRDYW5jZWwgKCkge1xyXG4gICAgICB0aGlzLmNvbW1lbnRGbGFnID0gZmFsc2VcclxuICAgICAgdGhpcy5jb21tZW50SW5wdXQgPSAnJ1xyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9LFxyXG4gICAganVtcFBhZ2UgKHBhZ2VOYW1lLCB0eXBlKSB7XHJcbiAgICAgIHRoaXMucHVibGlzaEZsYWcgPSBmYWxzZVxyXG4gICAgICB0aGlzLnNldEZsYWcgPSBmYWxzZVxyXG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICB1cmw6IGAke3BhZ2VOYW1lfT90eXBlPSR7dHlwZX1gXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgdG9nZ2xlTWVudSAodHlwZSkge1xyXG4gICAgICBpZiAoIXRoaXMuY2xhc3NJbmZvKSB7XHJcbiAgICAgICAgc2hvd01zZygn6K+36YCJ57uR5a6a54+t57qnJywgMzAwMClcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICB0aGlzW3R5cGVdID0gIXRoaXNbdHlwZV1cclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSxcclxuICAgIGNsb3NlVG9nZ2xlICgpIHtcclxuICAgICAgdGhpcy5zZXRGbGFnID0gZmFsc2VcclxuICAgICAgdGhpcy5wdWJsaXNoRmxhZyA9IGZhbHNlXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0sXHJcbiAgICBwcmV2aWV3KGltZywgaW1nTGlzdCkge1xyXG4gICAgICBwcmV2aWV3SW1hZ2UoaW1nLCBpbWdMaXN0KVxyXG4gICAgfSxcclxuICAgIHNlbGVjdENhbmNlbCgpIHtcclxuICAgICAgdGhpcy5zZWxlY3RGbGFnID0gZmFsc2VcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSxcclxuICAgIGNhbmNlbFNoYXJlRm4oKSB7XHJcbiAgICAgIHRoaXMuc2hvd1NoYXJlRmxhZyA9IGZhbHNlXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0sXHJcbiAgICBzZWxlY3RTdXJlKHZhbHVlKSB7XHJcbiAgICAgIGlmICghdmFsdWUubGVuZ3RoKSB7XHJcbiAgICAgICAgc2hvd01zZygn6K+36YCJ5oupJylcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICBjb25zdCB2YWwgPSB2YWx1ZVxyXG4gICAgICB0aGlzLnN0dWRlbnRJZHMgPSBbLi4udmFsXVxyXG4gICAgICB0aGlzLnNlbGVjdEZsYWcgPSBmYWxzZVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIHRoaXMuYWRkVG9PcmRlcih0aGlzLmN1cnJlbnRDb2xsZWN0aW9uSWQpXHJcbiAgICB9XHJcbiAgfVxyXG4gIG9uU2hhcmVBcHBNZXNzYWdlKHJlcykge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGl0bGU6IHRoaXMuc2hhcmVUaXRsZSxcclxuICAgICAgaW1hZ2VVcmw6IHRoaXMuc2hhcmVJbWdcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19