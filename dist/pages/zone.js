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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInpvbmUuanMiXSwibmFtZXMiOlsiWm9uZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJDdXJyZW50TW9kYWwiLCJTZWxlY3RNb2RhbCIsInNoYXJlTW9kYWwiLCJkYXRhIiwibWVudUxpc3QiLCJ0ZXh0IiwidHlwZSIsInNyYyIsImNvbW1lbnRGbGFnIiwic2VsZWN0RmxhZyIsImFjdGl2ZVR5cGUiLCJzZXRGbGFnIiwicHVibGlzaEZsYWciLCJjaXJjbGVzIiwiY29sbGVjdGlvbiIsIm5vdGlmeSIsImFjdGl2aXR5IiwiYWNjb3VudCIsInNoYXJlSW1nU3JjIiwicG4iLCJwcyIsImxpc3QiLCJwYXlNZW1iZXJMaXN0IiwiY2xhc3NJbmZvIiwibWVtYmVySW5mbyIsInNjaG9vbEluZm8iLCJsb2FkaW5nIiwibG9hZEZpbmlzaGVkIiwiY29tbWVudElucHV0IiwiY3VycmVudFJlcGx5SWQiLCJjdXJyZW50UmVwbHlSb290SWQiLCJjdXJyZW50UmVwbHlUb0NvbW1lbnRJZCIsImN1cnJlcm50Sm9pbkFjaXRpdnl0SWQiLCJjdXJyZXJudFN1YkFjdGl2aXR5SWQiLCJjdXJyZW50Q29sbGVjdGlvbklkIiwiYXV0aCIsInByZXNpZGVudCIsImZpbmFuY2UiLCJwaG90b3MiLCJjb21tZW50UG4iLCJjb21tZW50UHMiLCJjb21tZW50T2Zmc2V0IiwiY29tbWVudExvYWRGaW5pc2hlZCIsIm1lbWJlckxpc3QiLCJzdHVkZW50SWRzIiwiZmlyc3RJbml0IiwicGF5bWVudExvY2tlZCIsImxvYWRNb3JlQ29tbWVudEFycmF5Iiwic2hhcmVUaXRsZSIsInNob3dTaGFyZUZsYWciLCJzaGFyZUltZyIsIndhdGNoIiwibmV3VmFsIiwib2xkVmFsIiwicmVzZXREYXRhIiwiZ2V0QXV0aExpc3QiLCJnZXRab25lTGlzdCIsImN1cnJlbnRKb2luQWN0aXZpdHlJZCIsIiRhcHBseSIsIm1ldGhvZHMiLCJzaGFyZUNpcmNsZSIsInNoYXJlQWN0aW9uVHlwZSIsImdldFNoYXJlQWN0aW9uVHlwZSIsInNoYXJlVHlwZSIsImdldFNoYXJlVHlwZSIsIm5pY2tuYW1lIiwicmVtb3ZlQ2lyY2xlIiwiaWQiLCJpZHgiLCJtb21lbnRfaWQiLCJjbGFzc19pZCIsInRoZW4iLCJyZXMiLCJzdWNjZXNzIiwic3BsaWNlIiwicGF5IiwibW9tZW50SWQiLCJjb2xsZWN0aW9uSWQiLCJpc19wYXkiLCJsZW5ndGgiLCJwdXNoIiwiYWRkVG9PcmRlciIsInN1Ym1pdEpvaW5BY3Rpdml0eSIsImFjdGl2aXR5X2l0ZW1faWQiLCJhY3Rpdml0eV9pZCIsImpvaW5BY3Rpdml0eSIsInN1YklkIiwibGlzdEluZGV4IiwiYWN0aXZpdHlJbmRleCIsImluZGV4IiwiaW5kZXhPZiIsImluZm8iLCJpdGVtIiwiY2hlY2tlZCIsImxvYWRNb3JlQ29tbWVudCIsInJldE9iaiIsImZpbmRMb2FkbW9yZUNvbW1lbnRJbmZvIiwib2Zmc2V0IiwicmVzdWx0TGlzdCIsImNvbW1lbnRfbGlzdCIsIm9iaiIsImFkZENvbW1lbnQiLCJyb290SWQiLCJ0b0NvbW1lbnRJZCIsIm5hbWUiLCJtZW1iZXJfaWQiLCJ1bmRlZmluZWQiLCJiaW5kQ29tbWVudElucHV0IiwidmFsdWUiLCJjb21tZW50U3VyZSIsImNvbnRlbnQiLCJyZXBsYWNlIiwicm9vdF9pZCIsInRvX2NvbW1lbnRfaWQiLCJqdW1wUHVibGlzaCIsInVybCIsInd4IiwibmF2aWdhdGVUbyIsImNvbW1lbnRDYW5jZWwiLCJqdW1wUGFnZSIsInBhZ2VOYW1lIiwidG9nZ2xlTWVudSIsImNsb3NlVG9nZ2xlIiwicHJldmlldyIsImltZyIsImltZ0xpc3QiLCJzZWxlY3RDYW5jZWwiLCJjYW5jZWxTaGFyZUZuIiwic2VsZWN0U3VyZSIsInZhbCIsImdldFN0b3JhZ2VTeW5jIiwiJHd4cGFnZSIsImZyb21QdWJsaXNoIiwic2V0RGF0YSIsImNoZWNrRGF0YUV4aXN0IiwicmVMYXVuY2giLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInVzZXJEYXRhIiwiY2hlY2tBdXRoIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJpIiwibGVuIiwiY29kZSIsImlzQXV0aCIsImlzX2F1dGgiLCJmb3JtYXRBbGxBdXRoIiwiZm9ybWF0U2luZ2xlQXV0aCIsInNlZV90eXBlIiwiY29tbWVudF9jb3VudCIsIm9yZGVyX2lkIiwiX3RoaXMiLCJwYXltZW50X3BhcmFtcyIsInJlcXVlc3RQYXltZW50IiwidGltZVN0YW1wIiwiU3RyaW5nIiwibm9uY2VTdHIiLCJwYWNrYWdlIiwicGF5U2lnbiIsInNpZ25UeXBlIiwiZmFpbCIsInN0dWRlbnRfaWRzIiwiY29sbGVjdGlvbl9pdGVtX2lkIiwicGF5bWVudFBhcmFtcyIsImFyciIsImN1cnJlbnRJZCIsImFzc2lnbiIsImFjdGlvbiIsImNhdGVnb3J5IiwidGl0bGUiLCJpbWFnZVVybCIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLEk7Ozs7Ozs7Ozs7Ozs7O3FMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixNQURqQjtBQUVQQyw2QkFBdUI7QUFGaEIsSyxTQUlWQyxPLEdBQVUsRSxTQUNYQyxNLEdBQVMsRUFBQyxnQkFBZSxFQUFDLGVBQWMsSUFBZixFQUFvQixpQkFBZ0IsSUFBcEMsRUFBeUMsbUJBQWtCLFNBQTNELEVBQXFFLGdCQUFlLEVBQXBGLEVBQXVGLG9CQUFtQixhQUExRyxFQUF3SCw0QkFBMkIsY0FBbkosRUFBa0ssY0FBYSxFQUEvSyxFQUFoQixFQUFtTSxlQUFjLEVBQUMsb0JBQW1CLFlBQXBCLEVBQWlDLG9CQUFtQixlQUFwRCxFQUFqTixFQUFzUixjQUFhLEVBQUMsb0JBQW1CLGVBQXBCLEVBQW9DLHFCQUFvQixZ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RixJQUFJdkIsQ0FBSixDQUFsQixFQUEwQjtBQUNqQ3ZELG1CQUFPdUQ7QUFEMEIsV0FBMUIsQ0FBVDtBQUdEO0FBQ0Y7QUFDRCxhQUFPakQsTUFBUDtBQUNEOzs7dUNBQ2tCekYsSSxFQUFNO0FBQ3ZCLFVBQUlvSyxTQUFTLElBQWI7QUFDQSxjQUFRcEssSUFBUjtBQUNFLGFBQUssVUFBTDtBQUNFb0ssbUJBQVMsSUFBVDtBQUNBLGlCQUFPQSxNQUFQO0FBQ0YsYUFBSyxZQUFMO0FBQ0VBLG1CQUFTLElBQVQ7QUFDQSxpQkFBT0EsTUFBUDtBQUNGO0FBQ0UsaUJBQU9BLE1BQVA7QUFSSjtBQVVEOzs7aUNBQ1lwSyxJLEVBQU07QUFDakIsVUFBSXFLLFdBQVcsRUFBZjtBQUNBLFVBQUlySyxTQUFTLFNBQWIsRUFBd0I7QUFDdEJxSyxtQkFBVyxPQUFYO0FBQ0QsT0FGRCxNQUVPO0FBQ0xBLDBDQUFpQixLQUFLckssSUFBTCxDQUFVQSxJQUFWLENBQWpCO0FBQ0Q7QUFDRCxhQUFPcUssUUFBUDtBQUNEOzs7c0NBOE1pQm5HLEcsRUFBSztBQUNyQixhQUFPO0FBQ0xvRyxlQUFPLEtBQUs1SCxVQURQO0FBRUw2SCxrQkFBVSxLQUFLM0g7QUFGVixPQUFQO0FBSUQ7Ozs7RUE1ZStCNEgsZUFBS0MsSTs7a0JBQWxCdkwsSSIsImZpbGUiOiJ6b25lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IFNlbGVjdE1vZGFsIGZyb20gJy4uL2NvbXBvbmVudHMvc2VsZWN0TW9kYWwnXG5pbXBvcnQgQ3VycmVudE1vZGFsIGZyb20gJy4uL2NvbXBvbmVudHMvY29tbWVudE1vZGFsJ1xuaW1wb3J0IHNoYXJlTW9kYWwgZnJvbSAnLi4vY29tcG9uZW50cy9zaGFyZU1vZGFsJ1xuaW1wb3J0IHsgc2hvd01zZywgcHJldmlld0ltYWdlIH0gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xuaW1wb3J0IHsgZ2V0Q2lyY2xlTGlzdCwgYWRkQ29tbWVudCwgam9pbkFjdGl2aXR5LCBnZXRDb21tZW50TGlzdCwgZGVsZXRlQ2lyY2xlIH0gZnJvbSAnLi4vYXBpL3pvbmUnXG5pbXBvcnQgeyBhZGRPcmRlciwgZ2V0UGF5bWVudFBhcmFtcyB9IGZyb20gJy4uL2FwaS9maW5hbmNlJ1xuaW1wb3J0IHsgZ2V0QXV0aCB9IGZyb20gJy4uL2FwaS9hdXRob3JpemUnXG5pbXBvcnQgeyBjaGVja1N0dWRlbnQgfSBmcm9tICcuLi9hcGkvdXNlcidcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFpvbmUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+acgOi/keePree6pycsXG4gICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiB0cnVlXG4gIH1cbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIkN1cnJlbnRNb2RhbFwiOntcInN1cmVCdG5UZXh0XCI6XCLnoa7orqRcIixcImNhbmNlbEJ0blRleHRcIjpcIuWPlua2iFwiLFwicGxhY2Vob2xkZXJUZXh0XCI6XCLor7fovpPlhaXor4TorrrlhoXlrrlcIixcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6ZmxhZy5zeW5jXCI6XCJjb21tZW50RmxhZ1wiLFwidi1iaW5kOmNvbW1lbnRJbnB1dC5zeW5jXCI6XCJjb21tZW50SW5wdXRcIixcInhtbG5zOnYtb25cIjpcIlwifSxcIlNlbGVjdE1vZGFsXCI6e1widi1iaW5kOmZsYWcuc3luY1wiOlwic2VsZWN0RmxhZ1wiLFwidi1iaW5kOmxpc3Quc3luY1wiOlwicGF5TWVtYmVyTGlzdFwifSxcInNoYXJlTW9kYWxcIjp7XCJ2LWJpbmQ6ZmxhZy5zeW5jXCI6XCJzaG93U2hhcmVGbGFnXCIsXCJ2LWJpbmQ6dGl0bGUuc3luY1wiOlwic2hhcmVUaXRsZVwiLFwidi1iaW5kOmltZ1NyYy5zeW5jXCI6XCJzaGFyZUltZ1wifX07XHJcbiRldmVudHMgPSB7XCJDdXJyZW50TW9kYWxcIjp7XCJ2LW9uOmNhbmNlbFwiOlwiY29tbWVudENhbmNlbFwiLFwidi1vbjpzdXJlXCI6XCJjb21tZW50U3VyZVwiLFwidi1vbjppbnB1dFwiOlwiYmluZENvbW1lbnRJbnB1dFwifSxcIlNlbGVjdE1vZGFsXCI6e1widi1vbjpjYW5jZWxcIjpcInNlbGVjdENhbmNlbFwiLFwidi1vbjpzdXJlXCI6XCJzZWxlY3RTdXJlXCJ9LFwic2hhcmVNb2RhbFwiOntcInYtb246Y2FuY2VsXCI6XCJjYW5jZWxTaGFyZUZuXCIsXCJ2LW9uOnN1cmVcIjpcImNhbmNlbFNoYXJlRm5cIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICBDdXJyZW50TW9kYWwsXG4gICAgU2VsZWN0TW9kYWwsXG4gICAgc2hhcmVNb2RhbFxuICB9XG4gIGRhdGEgPSB7XG4gICAgbWVudUxpc3Q6IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ+WutumVv+WciCcsXG4gICAgICAgIHR5cGU6ICd6b25lJyxcbiAgICAgICAgc3JjOiAnL2ltYWdlcy9pY29uLzIuanBnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ+aUtuasvicsXG4gICAgICAgIHR5cGU6ICdtb25leScsXG4gICAgICAgIHNyYzogJy9pbWFnZXMvaWNvbi9tb25leS5qcGcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAn6YCa55+lJyxcbiAgICAgICAgdHlwZTogJ25vdGljZScsXG4gICAgICAgIHNyYzogJy9pbWFnZXMvaWNvbi80LmpwZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICfmtLvliqgnLFxuICAgICAgICB0eXBlOiAnYWN0aXZpdHknLFxuICAgICAgICBzcmM6ICcvaW1hZ2VzL2ljb24vNS5qcGcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAn6K6w6LSmJyxcbiAgICAgICAgdHlwZTogJ2FjY291bnQnLFxuICAgICAgICBzcmM6ICcvaW1hZ2VzL2ljb24vcGhvdG9zLmpwZydcbiAgICAgIH1cbiAgICBdLFxuICAgIGNvbW1lbnRGbGFnOiBmYWxzZSxcbiAgICBzZWxlY3RGbGFnOiBmYWxzZSxcbiAgICBhY3RpdmVUeXBlOiAnYWxsJyxcbiAgICBzZXRGbGFnOiBmYWxzZSxcbiAgICBwdWJsaXNoRmxhZzogZmFsc2UsXG4gICAgdHlwZToge1xuICAgICAgY2lyY2xlczogJ+WutumVv+WciCcsXG4gICAgICBjb2xsZWN0aW9uOiAn5pS25qy+JyxcbiAgICAgIG5vdGlmeTogJ+mAmuefpScsXG4gICAgICBhY3Rpdml0eTogJ+a0u+WKqCcsXG4gICAgICBhY2NvdW50OiAn6K6w6LSmJ1xuICAgIH0sXG4gICAgc2hhcmVJbWdTcmM6IHtcbiAgICAgIGNpcmNsZXM6ICcuLi9pbWFnZXMvc2hhcmUvY2lyY2xlcy5qcGcnLFxuICAgICAgY29sbGVjdGlvbjogJy4uL2ltYWdlcy9zaGFyZS9jb2xsZWN0aW9uLmpwZycsXG4gICAgICBub3RpZnk6ICcuLi9pbWFnZXMvc2hhcmUvbm90aWZ5LmpwZycsXG4gICAgICBhY3Rpdml0eTogJy4uL2ltYWdlcy9zaGFyZS9hY3Rpdml0eS5qcGcnLFxuICAgICAgYWNjb3VudDogJy4uL2ltYWdlcy9zaGFyZS9hY2NvdW50LmpwZydcbiAgICB9LFxuICAgIHBuOiAxLFxuICAgIHBzOiAxMCxcbiAgICBsaXN0OiBbXSxcbiAgICBwYXlNZW1iZXJMaXN0OiBbXSxcbiAgICBjbGFzc0luZm86IG51bGwsXG4gICAgbWVtYmVySW5mbzogbnVsbCxcbiAgICBzY2hvb2xJbmZvOiBudWxsLFxuICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgIGxvYWRGaW5pc2hlZDogZmFsc2UsXG4gICAgY29tbWVudElucHV0OiAnJyxcbiAgICBjdXJyZW50UmVwbHlJZDogLTEsXG4gICAgY3VycmVudFJlcGx5Um9vdElkOiAtMSxcbiAgICBjdXJyZW50UmVwbHlUb0NvbW1lbnRJZDogLTEsXG4gICAgY3VycmVybnRKb2luQWNpdGl2eXRJZDogLTEsXG4gICAgY3VycmVybnRTdWJBY3Rpdml0eUlkOiBbXSxcbiAgICBjdXJyZW50Q29sbGVjdGlvbklkOiAtMSxcbiAgICBhdXRoOiB7XG4gICAgICBwcmVzaWRlbnQ6IGZhbHNlLFxuICAgICAgZmluYW5jZTogZmFsc2UsXG4gICAgICBhY3Rpdml0eTogZmFsc2UsXG4gICAgICBub3RpZnk6IGZhbHNlLFxuICAgICAgcGhvdG9zOiBmYWxzZSxcbiAgICAgIGNpcmNsZXM6IGZhbHNlXG4gICAgfSxcbiAgICBjb21tZW50UG46IDIsXG4gICAgY29tbWVudFBzOiA2LFxuICAgIGNvbW1lbnRPZmZzZXQ6IDYsXG4gICAgY29tbWVudExvYWRGaW5pc2hlZDogZmFsc2UsXG4gICAgbWVtYmVyTGlzdDogW10sXG4gICAgc3R1ZGVudElkczogW10sXG4gICAgZmlyc3RJbml0OiB0cnVlLFxuICAgIHBheW1lbnRMb2NrZWQ6IGZhbHNlLFxuICAgIGxvYWRNb3JlQ29tbWVudEFycmF5OiBbXSxcbiAgICBzaGFyZVRpdGxlOiAnJyxcbiAgICBzaG93U2hhcmVGbGFnOiBmYWxzZSxcbiAgICBzaGFyZUltZzogJydcbiAgfVxuICB3YXRjaCA9IHtcbiAgICBjbGFzc0luZm8obmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgIC8vIOWIh+aNouS6huePree6p+S5i+WQjuaVsOaNruimgeabtOaWsFxuICAgICAgaWYgKG9sZFZhbCAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLnJlc2V0RGF0YSgpXG4gICAgICAgIHRoaXMuZ2V0QXV0aExpc3QoKVxuICAgICAgICB0aGlzLmdldFpvbmVMaXN0KClcbiAgICAgIH1cbiAgICB9LFxuICAgIGN1cnJlbnRKb2luQWN0aXZpdHlJZChuZXdWYWwsIG9sZFZhbCkge1xuICAgICAgaWYgKG5ld1ZhbCA+IDApIHtcbiAgICAgICAgdGhpcy5jdXJyZXJudFN1YkFjdGl2aXR5SWQgPSBbXVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJlc2V0RGF0YSgpIHtcbiAgICB0aGlzLmxvYWRNb3JlQ29tbWVudEFycmF5ID0gW11cbiAgICB0aGlzLmNvbW1lbnRMb2FkRmluaXNoZWQgPSBmYWxzZVxuICAgIHRoaXMuY29tbWVudFBuID0gMlxuICAgIHRoaXMuY29tbWVudFBzID0gNlxuICAgIHRoaXMuc3R1ZGVudElkcyA9IFtdXG4gICAgdGhpcy5wYXltZW50TG9ja2VkID0gZmFsc2VcbiAgICB0aGlzLnBuID0gMVxuICAgIHRoaXMubGlzdCA9IFtdXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIG9uUHVsbERvd25SZWZyZXNoKCkge1xuICAgIHRoaXMucmVzZXREYXRhKClcbiAgICB0aGlzLmdldFpvbmVMaXN0KClcbiAgfVxuICBvblJlYWNoQm90dG9tKCkge1xuICAgIGlmICh0aGlzLmxvYWRpbmcgfHwgdGhpcy5sb2FkRmluaXNoZWQpIHJldHVyblxuICAgIHRoaXMuZ2V0Wm9uZUxpc3QoKVxuICB9XG4gIG9uU2hvdygpIHtcbiAgICB0aGlzLmN1cnJlcm50Sm9pbkFjaXRpdnl0SWQgPSAtMVxuICAgIHRoaXMuY3VycmVybnRTdWJBY3Rpdml0eUlkID0gW11cbiAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxuICAgIHRoaXMuJGFwcGx5KClcbiAgICAvLyDlpoLmnpzmmK/ku45wdWJsaXNo562J6aG16Z2i6L+U5Zue77yM5YiZ6ZyA6KaB5Yi35paw5pWw5o2uXG4gICAgbGV0IGRhdGEgPSB0aGlzLiR3eHBhZ2UuZGF0YTtcbiAgICBpZiAoZGF0YS5mcm9tUHVibGlzaCkge1xuICAgICAgdGhpcy5yZXNldERhdGEoKVxuICAgICAgdGhpcy5nZXRab25lTGlzdCgpXG4gICAgfVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBmcm9tUHVibGlzaDogZmFsc2VcbiAgICB9KVxuICB9XG4gIG9uTG9hZCgpIHtcbiAgICBpZiAoIXRoaXMuY2hlY2tEYXRhRXhpc3QoJ21lbWJlckluZm8nKSkge1xuICAgICAgd3gucmVMYXVuY2goe1xuICAgICAgICB1cmw6ICdsb2dpbidcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXG4gICAgICB0aGlzLmNsYXNzSW5mbyAmJiB0aGlzLmdldEF1dGhMaXN0KClcbiAgICAgIHRoaXMubWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcbiAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJEYXRhID0gdGhpcy5tZW1iZXJJbmZvXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB0aGlzLmdldFpvbmVMaXN0KClcbiAgICB9XG4gIH1cbiAgZ2V0QXV0aExpc3QoKSB7XG4gICAgZ2V0QXV0aCh7XG4gICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWRcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICB0aGlzLmNoZWNrQXV0aChyZXMuZGF0YS5kYXRhKVxuICAgIH0pXG4gIH1cbiAgZm9ybWF0QWxsQXV0aChvYmopIHtcbiAgICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIG9ialtrZXldID0gdHJ1ZVxuICAgIH0pXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIGZvcm1hdFNpbmdsZUF1dGgobmFtZSkge1xuICAgIHRoaXMuYXV0aFtuYW1lXSA9IHRydWVcbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgY2hlY2tBdXRoKGxpc3QpIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gbGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgbGV0IHtjb2RlLCBpc19hdXRoOiBpc0F1dGh9ID0gbGlzdFtpXVxuICAgICAgaWYgKGNvZGUgPT09ICdwcmVzaWRlbnQnICYmIGlzQXV0aCkge1xuICAgICAgICB0aGlzLmZvcm1hdEFsbEF1dGgodGhpcy5hdXRoKVxuICAgICAgICBicmVha1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXNBdXRoICYmIHRoaXMuZm9ybWF0U2luZ2xlQXV0aChjb2RlKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBjaGVja0RhdGFFeGlzdChrZXkpIHtcbiAgICBpZiAod3guZ2V0U3RvcmFnZVN5bmMoa2V5KSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgZ2V0Wm9uZUxpc3QoKSB7XG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZVxuICAgIHRoaXMuJGFwcGx5KClcbiAgICBjb25zdCBpZCA9IHRoaXMuY2xhc3NJbmZvLmlkXG4gICAgZ2V0Q2lyY2xlTGlzdCh7XG4gICAgICBjbGFzc19pZDogaWQsXG4gICAgICBzZWVfdHlwZTogaWQgPyAnJyA6ICdhbGwnLFxuICAgICAgdHlwZTogdGhpcy5hY3RpdmVUeXBlLFxuICAgICAgcG46IHRoaXMucG4sXG4gICAgICBwczogdGhpcy5wcyxcbiAgICAgIGNvbW1lbnRfY291bnQ6IDNcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgeyBsaXN0IH0gPSByZXMuZGF0YVxuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2VcbiAgICAgIHRoaXMucG4rK1xuICAgICAgaWYgKGxpc3QubGVuZ3RoIDwgdGhpcy5wcykge1xuICAgICAgICB0aGlzLmxvYWRGaW5pc2hlZCA9IHRydWVcbiAgICAgIH1cbiAgICAgIHRoaXMubGlzdCA9IFsuLi50aGlzLmxpc3QsIC4uLmxpc3RdXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSlcbiAgfVxuICBwYXltZW50UGFyYW1zKGlkKSB7XG4gICAgZ2V0UGF5bWVudFBhcmFtcyh7XG4gICAgICBvcmRlcl9pZDogaWRcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgX3RoaXMgPSB0aGlzXG4gICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhLnBheW1lbnRfcGFyYW1zXG4gICAgICB3eC5yZXF1ZXN0UGF5bWVudCh7XG4gICAgICAgIHRpbWVTdGFtcDogU3RyaW5nKGRhdGEudGltZVN0YW1wKSxcbiAgICAgICAgbm9uY2VTdHI6IGRhdGEubm9uY2VTdHIsXG4gICAgICAgIHBhY2thZ2U6IGRhdGEucGFja2FnZSxcbiAgICAgICAgcGF5U2lnbjogZGF0YS5wYXlTaWduLFxuICAgICAgICBzaWduVHlwZTogJ01ENScsXG4gICAgICAgIHN1Y2Nlc3MoKSB7XG4gICAgICAgICAgX3RoaXMucGF5bWVudExvY2tlZCA9IGZhbHNlXG4gICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbCgpIHtcbiAgICAgICAgICBfdGhpcy5wYXltZW50TG9ja2VkID0gZmFsc2VcbiAgICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH1cbiAgYWRkVG9PcmRlcihpZCkge1xuICAgIGFkZE9yZGVyKHtcbiAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgIHN0dWRlbnRfaWRzOiB0aGlzLnN0dWRlbnRJZHMsXG4gICAgICBjb2xsZWN0aW9uX2l0ZW1faWQ6IGlkXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgdGhpcy5wYXltZW50UGFyYW1zKHJlcy5kYXRhLmRhdGEuaWQpXG4gICAgfSlcbiAgfVxuICBmaW5kTG9hZG1vcmVDb21tZW50SW5mbyhhcnIsIGN1cnJlbnRJZCkge1xuICAgIGxldCByZXRPYmogPSB7fVxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhcnIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmIChhcnJbaV0ubW9tZW50X2lkID09PSBjdXJyZW50SWQpIHtcbiAgICAgICAgcmV0T2JqID0gT2JqZWN0LmFzc2lnbih7fSwgYXJyW2ldLCB7XG4gICAgICAgICAgaW5kZXg6IGlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJldE9ialxuICB9XG4gIGdldFNoYXJlQWN0aW9uVHlwZSh0eXBlKSB7XG4gICAgbGV0IGFjdGlvbiA9ICfmtY/op4gnXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdhY3Rpdml0eSc6XG4gICAgICAgIGFjdGlvbiA9ICflj4LliqAnXG4gICAgICAgIHJldHVybiBhY3Rpb25cbiAgICAgIGNhc2UgJ2NvbGxlY3Rpb24nOlxuICAgICAgICBhY3Rpb24gPSAn57y06LS5J1xuICAgICAgICByZXR1cm4gYWN0aW9uXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gYWN0aW9uXG4gICAgfVxuICB9XG4gIGdldFNoYXJlVHlwZSh0eXBlKSB7XG4gICAgbGV0IGNhdGVnb3J5ID0gJydcbiAgICBpZiAodHlwZSA9PT0gJ2NpcmNsZXMnKSB7XG4gICAgICBjYXRlZ29yeSA9ICflrrbplb/lnIjlm77mlocnXG4gICAgfSBlbHNlIHtcbiAgICAgIGNhdGVnb3J5ID0gYOWutuWnlOS8miR7dGhpcy50eXBlW3R5cGVdfWBcbiAgICB9XG4gICAgcmV0dXJuIGNhdGVnb3J5XG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBzaGFyZUNpcmNsZSh0eXBlKSB7XG4gICAgICBsZXQgc2hhcmVBY3Rpb25UeXBlID0gdGhpcy5nZXRTaGFyZUFjdGlvblR5cGUodHlwZSlcbiAgICAgIGxldCBzaGFyZVR5cGUgPSB0aGlzLmdldFNoYXJlVHlwZSh0eXBlKVxuICAgICAgdGhpcy5zaGFyZVRpdGxlID0gYCR7dGhpcy5tZW1iZXJJbmZvLm5pY2tuYW1lfeWIhuS6q+S6huS4gOS4qiR7c2hhcmVUeXBlfe+8jOeCueWHuyR7c2hhcmVBY3Rpb25UeXBlfWBcbiAgICAgIHRoaXMuc2hhcmVJbWcgPSB0aGlzLnNoYXJlSW1nU3JjW3R5cGVdXG4gICAgICB0aGlzLnNob3dTaGFyZUZsYWcgPSB0cnVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICByZW1vdmVDaXJjbGUoaWQsIGlkeCkge1xuICAgICAgZGVsZXRlQ2lyY2xlKHtcbiAgICAgICAgbW9tZW50X2lkOiBpZCxcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgc2hvd01zZygn5oiQ5Yqf5Yig6ZmkJylcbiAgICAgICAgICB0aGlzLmxpc3Quc3BsaWNlKGlkeCwgMSlcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBwYXkobW9tZW50SWQsIGNvbGxlY3Rpb25JZCkge1xuICAgICAgaWYgKHRoaXMucGF5bWVudExvY2tlZCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHRoaXMucGF5bWVudExvY2tlZCA9IHRydWVcbiAgICAgIGNoZWNrU3R1ZGVudCh7XG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgICAgbW9tZW50X2lkOiBtb21lbnRJZCxcbiAgICAgICAgaXNfcGF5OiAwXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIHRoaXMucGF5TWVtYmVyTGlzdCA9IHJlcy5kYXRhLmxpc3RcbiAgICAgICAgaWYgKCF0aGlzLnBheU1lbWJlckxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5wYXltZW50TG9ja2VkID0gZmFsc2VcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgc2hvd01zZygn6K+35Yu/6YeN5aSN57y06LS5JylcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wYXlNZW1iZXJMaXN0Lmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdEZsYWcgPSB0cnVlXG4gICAgICAgICAgdGhpcy5jdXJyZW50Q29sbGVjdGlvbklkID0gY29sbGVjdGlvbklkXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc3R1ZGVudElkcyA9IFtdXG4gICAgICAgICAgdGhpcy5zdHVkZW50SWRzLnB1c2godGhpcy5wYXlNZW1iZXJMaXN0WzBdLmlkKVxuICAgICAgICAgIHRoaXMuYWRkVG9PcmRlcihjb2xsZWN0aW9uSWQpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBzdWJtaXRKb2luQWN0aXZpdHkoKSB7XG4gICAgICBqb2luQWN0aXZpdHkoe1xuICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXG4gICAgICAgIGFjdGl2aXR5X2l0ZW1faWQ6IHRoaXMuY3VycmVybnRTdWJBY3Rpdml0eUlkLFxuICAgICAgICBhY3Rpdml0eV9pZDogdGhpcy5jdXJyZXJudEpvaW5BY2l0aXZ5dElkXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgc2hvd01zZygn5o+Q5Lqk5oiQ5YqfJylcbiAgICAgICAgICB0aGlzLmN1cnJlcm50U3ViQWN0aXZpdHlJZCA9IFtdXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgam9pbkFjdGl2aXR5KGlkLCBzdWJJZCwgbGlzdEluZGV4LCBhY3Rpdml0eUluZGV4KSB7XG4gICAgICBpZiAoIXRoaXMuY2xhc3NJbmZvKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+WFiOmAieaLqeePree6pycpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdGhpcy5jdXJyZXJudEpvaW5BY2l0aXZ5dElkID0gaWRcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jdXJyZXJudFN1YkFjdGl2aXR5SWQuaW5kZXhPZihzdWJJZClcbiAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgIHRoaXMuY3VycmVybnRTdWJBY3Rpdml0eUlkLnNwbGljZShpbmRleCwgMSlcbiAgICAgICAgdGhpcy5saXN0W2xpc3RJbmRleF0uaW5mby5pdGVtW2FjdGl2aXR5SW5kZXhdLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jdXJyZXJudFN1YkFjdGl2aXR5SWQucHVzaChzdWJJZClcbiAgICAgICAgdGhpcy5saXN0W2xpc3RJbmRleF0uaW5mby5pdGVtW2FjdGl2aXR5SW5kZXhdLmNoZWNrZWQgPSB0cnVlXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBsb2FkTW9yZUNvbW1lbnQobW9tZW50SWQsIGlkeCkge1xuICAgICAgY29uc3QgcmV0T2JqID0gdGhpcy5maW5kTG9hZG1vcmVDb21tZW50SW5mbyh0aGlzLmxvYWRNb3JlQ29tbWVudEFycmF5LCBtb21lbnRJZCk7XG4gICAgICBnZXRDb21tZW50TGlzdCh7XG4gICAgICAgIG1vbWVudF9pZDogbW9tZW50SWQsXG4gICAgICAgIHBzOiB0aGlzLmNvbW1lbnRQcyxcbiAgICAgICAgcG46IHJldE9iai5jb21tZW50UG4gPyByZXRPYmouY29tbWVudFBuIDogdGhpcy5jb21tZW50UG4sXG4gICAgICAgIG9mZnNldDogdGhpcy5jb21tZW50T2Zmc2V0XG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgbGV0IHJlc3VsdExpc3QgPSByZXMuZGF0YS5saXN0XG4gICAgICAgICAgbGV0IHtsaXN0fSA9IHRoaXMubGlzdFtpZHhdLmNvbW1lbnRfbGlzdFxuICAgICAgICAgIGxpc3QgPSBbLi4ubGlzdCwgLi4ucmVzdWx0TGlzdF1cbiAgICAgICAgICB0aGlzLmxpc3RbaWR4XS5jb21tZW50X2xpc3QubGlzdCA9IGxpc3RcbiAgICAgICAgICBpZiAocmVzdWx0TGlzdC5sZW5ndGggPCB0aGlzLmNvbW1lbnRQcykge1xuICAgICAgICAgICAgdGhpcy5saXN0W2lkeF0uY29tbWVudExvYWRGaW5pc2hlZCA9IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFyZXRPYmouY29tbWVudFBuKSB7XG4gICAgICAgICAgICBjb25zdCBvYmogPSB7XG4gICAgICAgICAgICAgIGNvbW1lbnRQbjogdGhpcy5jb21tZW50UG4gKyAxLFxuICAgICAgICAgICAgICBtb21lbnRfaWQ6IG1vbWVudElkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmxvYWRNb3JlQ29tbWVudEFycmF5LnB1c2gob2JqKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRNb3JlQ29tbWVudEFycmF5W3JldE9iai5pbmRleF0uY29tbWVudFBuID0gcmV0T2JqLmNvbW1lbnRQbiArIDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIGFkZENvbW1lbnQodHlwZSwgaWQsIHJvb3RJZCwgdG9Db21tZW50SWQsIG5hbWUpIHtcbiAgICAgIGlmICh0b0NvbW1lbnRJZCA9PT0gdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCkge1xuICAgICAgICBzaG93TXNnKCfor7fkuI3opoHlm57lpI3oh6rlt7EnKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5jbGFzc0luZm8pIHtcbiAgICAgICAgc2hvd01zZygn6K+35YWI6YCJ5oup54+t57qnJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB0aGlzLmNvbW1lbnRGbGFnID0gdHJ1ZVxuICAgICAgdGhpcy5jdXJyZW50UmVwbHlJZCA9IGlkXG4gICAgICB0aGlzLmN1cnJlbnRSZXBseVJvb3RJZCA9IHR5cGUgPT09ICdhZGQnID8gMCA6IHJvb3RJZFxuICAgICAgaWYgKG5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmNvbW1lbnRJbnB1dCA9IGBAJHtuYW1lfTpgXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbW1lbnRJbnB1dCA9ICcnXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBiaW5kQ29tbWVudElucHV0ICh2YWx1ZSkge1xuICAgICAgdGhpcy5jb21tZW50SW5wdXQgPSB2YWx1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgY29tbWVudFN1cmUgKCkge1xuICAgICAgdGhpcy5jb21tZW50RmxhZyA9IGZhbHNlXG4gICAgICBhZGRDb21tZW50KHtcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgICBtb21lbnRfaWQ6IHRoaXMuY3VycmVudFJlcGx5SWQsXG4gICAgICAgIGNvbnRlbnQ6IHRoaXMuY3VycmVudFJlcGx5SWQgPiAwID8gdGhpcy5jb21tZW50SW5wdXQucmVwbGFjZSgvXkAuKzovLCAnJykgOiB0aGlzLmNvbW1lbnRJbnB1dCxcbiAgICAgICAgcm9vdF9pZDogdGhpcy5jdXJyZW50UmVwbHlSb290SWQsXG4gICAgICAgIHRvX2NvbW1lbnRfaWQ6IHRoaXMuY3VycmVudFJlcGx5Um9vdElkXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgdGhpcy5jb21tZW50SW5wdXQgPSAnJ1xuICAgICAgICAgIHRoaXMucmVzZXREYXRhKClcbiAgICAgICAgICB0aGlzLmdldFpvbmVMaXN0KClcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBqdW1wUHVibGlzaCh2YWx1ZSkge1xuICAgICAgaWYgKCF0aGlzLmNsYXNzSW5mbykge1xuICAgICAgICBzaG93TXNnKCfor7fpgInnu5Hlrprnj63nuqcnLCAzMDAwKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGxldCB1cmwgPSB2YWx1ZSA9PT0gJ2FjY291bnQnID8gJ3JlY29yZENhc2hmbG93JyA6IGBwdWJsaXNoP3R5cGU9JHt2YWx1ZX1gXG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiB1cmxcbiAgICAgIH0pXG4gICAgfSxcbiAgICBjb21tZW50Q2FuY2VsICgpIHtcbiAgICAgIHRoaXMuY29tbWVudEZsYWcgPSBmYWxzZVxuICAgICAgdGhpcy5jb21tZW50SW5wdXQgPSAnJ1xuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAganVtcFBhZ2UgKHBhZ2VOYW1lLCB0eXBlKSB7XG4gICAgICB0aGlzLnB1Ymxpc2hGbGFnID0gZmFsc2VcbiAgICAgIHRoaXMuc2V0RmxhZyA9IGZhbHNlXG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiBgJHtwYWdlTmFtZX0/dHlwZT0ke3R5cGV9YFxuICAgICAgfSlcbiAgICB9LFxuICAgIHRvZ2dsZU1lbnUgKHR5cGUpIHtcbiAgICAgIGlmICghdGhpcy5jbGFzc0luZm8pIHtcbiAgICAgICAgc2hvd01zZygn6K+36YCJ57uR5a6a54+t57qnJywgMzAwMClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB0aGlzW3R5cGVdID0gIXRoaXNbdHlwZV1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGNsb3NlVG9nZ2xlICgpIHtcbiAgICAgIHRoaXMuc2V0RmxhZyA9IGZhbHNlXG4gICAgICB0aGlzLnB1Ymxpc2hGbGFnID0gZmFsc2VcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIHByZXZpZXcoaW1nLCBpbWdMaXN0KSB7XG4gICAgICBwcmV2aWV3SW1hZ2UoaW1nLCBpbWdMaXN0KVxuICAgIH0sXG4gICAgc2VsZWN0Q2FuY2VsKCkge1xuICAgICAgdGhpcy5zZWxlY3RGbGFnID0gZmFsc2VcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGNhbmNlbFNoYXJlRm4oKSB7XG4gICAgICB0aGlzLnNob3dTaGFyZUZsYWcgPSBmYWxzZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgc2VsZWN0U3VyZSh2YWx1ZSkge1xuICAgICAgaWYgKCF2YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgc2hvd01zZygn6K+36YCJ5oupJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBjb25zdCB2YWwgPSB2YWx1ZVxuICAgICAgdGhpcy5zdHVkZW50SWRzID0gWy4uLnZhbF1cbiAgICAgIHRoaXMuc2VsZWN0RmxhZyA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB0aGlzLmFkZFRvT3JkZXIodGhpcy5jdXJyZW50Q29sbGVjdGlvbklkKVxuICAgIH1cbiAgfVxuICBvblNoYXJlQXBwTWVzc2FnZShyZXMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6IHRoaXMuc2hhcmVUaXRsZSxcbiAgICAgIGltYWdlVXJsOiB0aGlzLnNoYXJlSW1nXG4gICAgfVxuICB9XG59XG4iXX0=