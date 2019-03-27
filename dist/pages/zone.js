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
      currentRemoveMomentIdx: -1,
      currentToCommentId: -1
    }, _this2.watch = {
      classInfo: function classInfo(newVal, oldVal) {
        // 切换了班级之后数据要更新
        if (oldVal !== null) {
          this.resetData();
          this.getAuthList();
          this.getZoneList();
          this.memberInfo = wx.getStorageSync('memberInfo');
          this.$parent.globalData.userData = this.memberInfo;
        }
      },
      currentJoinActivityId: function currentJoinActivityId(newVal, oldVal) {
        if (newVal > 0) {
          this.currerntSubActivityId = [];
          this.$apply();
        }
      }
    }, _this2.methods = {
      addLike: function addLike(momentId, idx, isLiked) {
        var _this3 = this;

        (0, _zone.addLike)({
          class_id: this.classInfo.id,
          moment_id: momentId
        }).then(function (res) {
          if (res.data.success) {
            if (isLiked) {
              (0, _common.showMsg)('取消点赞成功');
              _this3.list[idx].like_list.count--;
            } else {
              (0, _common.showMsg)('点赞成功');
              _this3.list[idx].like_list.count++;
            }
            _this3.list[idx].is_like = !isLiked;
            var newObj = {
              moment_id: momentId,
              member_id: _this3.memberInfo.member_id,
              member: _this3.memberInfo
            };
            _this3.list[idx].like_list.list = (0, _common.filterArrayByValue)(_this3.memberInfo.member_id, _this3.list[idx].like_list.list, isLiked, newObj);
            _this3.$apply();
          }
        });
      },
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
        this.currentToCommentId = toCommentId;
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
          to_comment_id: this.currentToCommentId
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
      this.loading = false;
      this.loadFinished = false;
      this.loadMoreCommentArray = [];
      this.commentLoadFinished = false;
      this.currentRemoveMomentId = -1;
      this.currentRemoveMomentIdx = -1;
      this.currentToCommentId = -1;
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
      // wx.pageScrollTo({
      //   scrollTop: 0
      // })
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
      var _this8 = this;

      (0, _zone.deleteCircle)({
        moment_id: id,
        class_id: this.classInfo.id
      }).then(function (res) {
        if (res.data.success) {
          (0, _common.showMsg)('成功删除');
          _this8.list.splice(idx, 1);
          _this8.$apply();
        }
      });
    }
  }, {
    key: 'getAuthList',
    value: function getAuthList() {
      var _this9 = this;

      (0, _authorize.getAuth)({
        class_id: this.classInfo.id
      }).then(function (res) {
        _this9.checkAuth(res.data.data);
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
      var _this10 = this;

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

        _this10.loading = false;
        _this10.pn++;
        if (list.length < _this10.ps) {
          _this10.loadFinished = true;
        }
        _this10.list = [].concat(_toConsumableArray(_this10.list), _toConsumableArray(list));
        _this10.$apply();
      });
    }
  }, {
    key: 'paymentParams',
    value: function paymentParams(id) {
      var _this11 = this;

      (0, _finance.getPaymentParams)({
        order_id: id
      }).then(function (res) {
        var _this = _this11;
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
      var _this12 = this;

      (0, _finance.addOrder)({
        class_id: this.classInfo.id,
        student_ids: this.studentIds,
        collection_item_id: id
      }).then(function (res) {
        _this12.paymentParams(res.data.data.id);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInpvbmUuanMiXSwibmFtZXMiOlsiWm9uZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJDdXJyZW50TW9kYWwiLCJTZWxlY3RNb2RhbCIsInNoYXJlTW9kYWwiLCJTdXJlTW9kYWwiLCJkYXRhIiwibWVudUxpc3QiLCJ0ZXh0IiwidHlwZSIsInNyYyIsInNob3dTdXJlRmxhZyIsImNvbW1lbnRGbGFnIiwic2VsZWN0RmxhZyIsImFjdGl2ZVR5cGUiLCJzZXRGbGFnIiwicHVibGlzaEZsYWciLCJjaXJjbGVzIiwiY29sbGVjdGlvbiIsIm5vdGlmeSIsImFjdGl2aXR5IiwiYWNjb3VudCIsImdyYWRlVHlwZSIsInByaW1hcnkiLCJtaWRkbGUiLCJoaWdoIiwidW5pdmVyc2l0eSIsInNoYXJlSW1nU3JjIiwicG4iLCJwcyIsImxpc3QiLCJwYXlNZW1iZXJMaXN0IiwiY2xhc3NJbmZvIiwibWVtYmVySW5mbyIsInNjaG9vbEluZm8iLCJsb2FkaW5nIiwibG9hZEZpbmlzaGVkIiwiY29tbWVudElucHV0IiwiY3VycmVudFJlcGx5SWQiLCJjdXJyZW50UmVwbHlSb290SWQiLCJjdXJyZW50UmVwbHlUb0NvbW1lbnRJZCIsImN1cnJlcm50Sm9pbkFjaXRpdnl0SWQiLCJjdXJyZXJudFN1YkFjdGl2aXR5SWQiLCJjdXJyZW50Q29sbGVjdGlvbklkIiwiYXV0aCIsInByZXNpZGVudCIsImZpbmFuY2UiLCJwaG90b3MiLCJjb21tZW50UG4iLCJjb21tZW50UHMiLCJjb21tZW50T2Zmc2V0IiwiY29tbWVudExvYWRGaW5pc2hlZCIsIm1lbWJlckxpc3QiLCJzdHVkZW50SWRzIiwiZmlyc3RJbml0IiwicGF5bWVudExvY2tlZCIsImxvYWRNb3JlQ29tbWVudEFycmF5Iiwic2hhcmVUaXRsZSIsInNob3dTaGFyZUZsYWciLCJzaGFyZUltZyIsInJlbW92ZUNpcmNsZVRpdGxlIiwiY3VycmVudFJlbW92ZU1vbWVudElkIiwiY3VycmVudFJlbW92ZU1vbWVudElkeCIsImN1cnJlbnRUb0NvbW1lbnRJZCIsIndhdGNoIiwibmV3VmFsIiwib2xkVmFsIiwicmVzZXREYXRhIiwiZ2V0QXV0aExpc3QiLCJnZXRab25lTGlzdCIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInVzZXJEYXRhIiwiY3VycmVudEpvaW5BY3Rpdml0eUlkIiwiJGFwcGx5IiwibWV0aG9kcyIsImFkZExpa2UiLCJtb21lbnRJZCIsImlkeCIsImlzTGlrZWQiLCJjbGFzc19pZCIsImlkIiwibW9tZW50X2lkIiwidGhlbiIsInJlcyIsInN1Y2Nlc3MiLCJsaWtlX2xpc3QiLCJjb3VudCIsImlzX2xpa2UiLCJuZXdPYmoiLCJtZW1iZXJfaWQiLCJtZW1iZXIiLCJ0b2dnbGVGbGFnIiwiZmxhZyIsImJvb2xlYW5WYWx1ZSIsInJlbW92ZUNpcmNsZUZuIiwic2hhcmVDaXJjbGUiLCJzaGFyZUFjdGlvblR5cGUiLCJnZXRTaGFyZUFjdGlvblR5cGUiLCJzaGFyZVR5cGUiLCJnZXRTaGFyZVR5cGUiLCJuaWNrbmFtZSIsInJlbW92ZUNpcmNsZSIsInBheSIsImNvbGxlY3Rpb25JZCIsImlzX3BheSIsImxlbmd0aCIsInB1c2giLCJhZGRUb09yZGVyIiwic3VibWl0Sm9pbkFjdGl2aXR5IiwiYWN0aXZpdHlfaXRlbV9pZCIsImFjdGl2aXR5X2lkIiwiam9pbkFjdGl2aXR5Iiwic3ViSWQiLCJsaXN0SW5kZXgiLCJhY3Rpdml0eUluZGV4IiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIiwiaW5mbyIsIml0ZW0iLCJjaGVja2VkIiwibG9hZE1vcmVDb21tZW50IiwicmV0T2JqIiwiZmluZExvYWRtb3JlQ29tbWVudEluZm8iLCJvZmZzZXQiLCJyZXN1bHRMaXN0IiwiY29tbWVudF9saXN0Iiwib2JqIiwiYWRkQ29tbWVudCIsInJvb3RJZCIsInRvQ29tbWVudElkIiwibmFtZSIsInVuZGVmaW5lZCIsImJpbmRDb21tZW50SW5wdXQiLCJ2YWx1ZSIsImNvbW1lbnRTdXJlIiwiY29udGVudCIsInJlcGxhY2UiLCJyb290X2lkIiwidG9fY29tbWVudF9pZCIsImp1bXBQdWJsaXNoIiwidXJsIiwibmF2aWdhdGVUbyIsImNvbW1lbnRDYW5jZWwiLCJqdW1wUGFnZSIsInBhZ2VOYW1lIiwidG9nZ2xlTWVudSIsImNsb3NlVG9nZ2xlIiwicHJldmlldyIsImltZyIsImltZ0xpc3QiLCJzZWxlY3RTdXJlIiwidmFsIiwiJHd4cGFnZSIsImZyb21QdWJsaXNoIiwic2V0RGF0YSIsImNoZWNrRGF0YUV4aXN0IiwicmVMYXVuY2giLCJjaGVja0F1dGgiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsImkiLCJsZW4iLCJjb2RlIiwiaXNBdXRoIiwiaXNfYXV0aCIsImZvcm1hdEFsbEF1dGgiLCJmb3JtYXRTaW5nbGVBdXRoIiwic2VlX3R5cGUiLCJjb21tZW50X2NvdW50Iiwib3JkZXJfaWQiLCJfdGhpcyIsInBheW1lbnRfcGFyYW1zIiwicmVxdWVzdFBheW1lbnQiLCJ0aW1lU3RhbXAiLCJTdHJpbmciLCJub25jZVN0ciIsInBhY2thZ2UiLCJwYXlTaWduIiwic2lnblR5cGUiLCJmYWlsIiwic3R1ZGVudF9pZHMiLCJjb2xsZWN0aW9uX2l0ZW1faWQiLCJwYXltZW50UGFyYW1zIiwiYXJyIiwiY3VycmVudElkIiwiYXNzaWduIiwiYWN0aW9uIiwiY2F0ZWdvcnkiLCJ0aXRsZSIsImltYWdlVXJsIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxJOzs7Ozs7Ozs7Ozs7OztxTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsTUFEakI7QUFFUEMsNkJBQXVCO0FBRmhCLEssU0FJ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XG5pbXBvcnQgU2VsZWN0TW9kYWwgZnJvbSAnLi4vY29tcG9uZW50cy9zZWxlY3RNb2RhbCdcbmltcG9ydCBDdXJyZW50TW9kYWwgZnJvbSAnLi4vY29tcG9uZW50cy9jb21tZW50TW9kYWwnXG5pbXBvcnQgU3VyZU1vZGFsIGZyb20gJy4uL2NvbXBvbmVudHMvc3VyZU1vZGFsJ1xuaW1wb3J0IHNoYXJlTW9kYWwgZnJvbSAnLi4vY29tcG9uZW50cy9zaGFyZU1vZGFsJ1xuaW1wb3J0IHsgc2hvd01zZywgcHJldmlld0ltYWdlLCBmaWx0ZXJBcnJheUJ5VmFsdWUgfSBmcm9tICcuLi91dGlscy9jb21tb24nXG5pbXBvcnQgeyBnZXRDaXJjbGVMaXN0LCBhZGRDb21tZW50LCBqb2luQWN0aXZpdHksIGdldENvbW1lbnRMaXN0LCBkZWxldGVDaXJjbGUsIGFkZExpa2UgfSBmcm9tICcuLi9hcGkvem9uZSdcbmltcG9ydCB7IGFkZE9yZGVyLCBnZXRQYXltZW50UGFyYW1zIH0gZnJvbSAnLi4vYXBpL2ZpbmFuY2UnXG5pbXBvcnQgeyBnZXRBdXRoIH0gZnJvbSAnLi4vYXBpL2F1dGhvcml6ZSdcbmltcG9ydCB7IGNoZWNrU3R1ZGVudCB9IGZyb20gJy4uL2FwaS91c2VyJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWm9uZSBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5pyA6L+R54+t57qnJyxcbiAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IHRydWVcbiAgfVxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiQ3VycmVudE1vZGFsXCI6e1wic3VyZUJ0blRleHRcIjpcIuehruiupFwiLFwiY2FuY2VsQnRuVGV4dFwiOlwi5Y+W5raIXCIsXCJwbGFjZWhvbGRlclRleHRcIjpcIuivt+i+k+WFpeivhOiuuuWGheWuuVwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpmbGFnLnN5bmNcIjpcImNvbW1lbnRGbGFnXCIsXCJ2LWJpbmQ6Y29tbWVudElucHV0LnN5bmNcIjpcImNvbW1lbnRJbnB1dFwiLFwieG1sbnM6di1vblwiOlwiXCJ9LFwiU2VsZWN0TW9kYWxcIjp7XCJ2LWJpbmQ6ZmxhZy5zeW5jXCI6XCJzZWxlY3RGbGFnXCIsXCJ2LWJpbmQ6bGlzdC5zeW5jXCI6XCJwYXlNZW1iZXJMaXN0XCJ9LFwic2hhcmVNb2RhbFwiOntcInYtYmluZDpmbGFnLnN5bmNcIjpcInNob3dTaGFyZUZsYWdcIixcInYtYmluZDp0aXRsZS5zeW5jXCI6XCJzaGFyZVRpdGxlXCIsXCJ2LWJpbmQ6aW1nU3JjLnN5bmNcIjpcInNoYXJlSW1nXCJ9LFwiU3VyZU1vZGFsXCI6e1widi1iaW5kOmZsYWcuc3luY1wiOlwic2hvd1N1cmVGbGFnXCIsXCJ2LWJpbmQ6dGl0bGUuc3luY1wiOlwicmVtb3ZlQ2lyY2xlVGl0bGVcIn19O1xyXG4kZXZlbnRzID0ge1wiQ3VycmVudE1vZGFsXCI6e1widi1vbjpjYW5jZWxcIjpcImNvbW1lbnRDYW5jZWxcIixcInYtb246c3VyZVwiOlwiY29tbWVudFN1cmVcIixcInYtb246aW5wdXRcIjpcImJpbmRDb21tZW50SW5wdXRcIn0sXCJTZWxlY3RNb2RhbFwiOntcInYtb246Y2FuY2VsXCI6XCJ0b2dnbGVGbGFnXCIsXCJ2LW9uOnN1cmVcIjpcInNlbGVjdFN1cmVcIn0sXCJzaGFyZU1vZGFsXCI6e1widi1vbjpjYW5jZWxcIjpcInRvZ2dsZUZsYWdcIixcInYtb246c3VyZVwiOlwidG9nZ2xlRmxhZ1wifSxcIlN1cmVNb2RhbFwiOntcInYtb246Y2FuY2VsXCI6XCJ0b2dnbGVGbGFnXCIsXCJ2LW9uOnN1cmVcIjpcInRvZ2dsZUZsYWdcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICBDdXJyZW50TW9kYWwsXG4gICAgU2VsZWN0TW9kYWwsXG4gICAgc2hhcmVNb2RhbCxcbiAgICBTdXJlTW9kYWxcbiAgfVxuICBkYXRhID0ge1xuICAgIG1lbnVMaXN0OiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICfpgJrnn6UnLFxuICAgICAgICB0eXBlOiAnbm90aWNlJyxcbiAgICAgICAgc3JjOiAnL2ltYWdlcy9pY29uLzQuanBnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ+a0u+WKqCcsXG4gICAgICAgIHR5cGU6ICdhY3Rpdml0eScsXG4gICAgICAgIHNyYzogJy9pbWFnZXMvaWNvbi81LmpwZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICflrrbplb/lnIgnLFxuICAgICAgICB0eXBlOiAnem9uZScsXG4gICAgICAgIHNyYzogJy9pbWFnZXMvaWNvbi8yLmpwZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICfmlLbmrL4nLFxuICAgICAgICB0eXBlOiAnbW9uZXknLFxuICAgICAgICBzcmM6ICcvaW1hZ2VzL2ljb24vbW9uZXkuanBnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ+iusOi0picsXG4gICAgICAgIHR5cGU6ICdhY2NvdW50JyxcbiAgICAgICAgc3JjOiAnL2ltYWdlcy9pY29uL3Bob3Rvcy5qcGcnXG4gICAgICB9XG4gICAgXSxcbiAgICBzaG93U3VyZUZsYWc6IGZhbHNlLFxuICAgIGNvbW1lbnRGbGFnOiBmYWxzZSxcbiAgICBzZWxlY3RGbGFnOiBmYWxzZSxcbiAgICBhY3RpdmVUeXBlOiAnYWxsJyxcbiAgICBzZXRGbGFnOiBmYWxzZSxcbiAgICBwdWJsaXNoRmxhZzogZmFsc2UsXG4gICAgdHlwZToge1xuICAgICAgY2lyY2xlczogJ+WutumVv+WciCcsXG4gICAgICBjb2xsZWN0aW9uOiAn5pS25qy+JyxcbiAgICAgIG5vdGlmeTogJ+mAmuefpScsXG4gICAgICBhY3Rpdml0eTogJ+a0u+WKqCcsXG4gICAgICBhY2NvdW50OiAn6K6w6LSmJ1xuICAgIH0sXG4gICAgZ3JhZGVUeXBlOiB7XG4gICAgICBwcmltYXJ5OiAn5bCP5a2mJyxcbiAgICAgIG1pZGRsZTogJ+WIneS4rScsXG4gICAgICBoaWdoOiAn6auY5LitJyxcbiAgICAgIHVuaXZlcnNpdHk6ICflpKflraYnXG4gICAgfSxcbiAgICBzaGFyZUltZ1NyYzoge1xuICAgICAgY2lyY2xlczogJy4uL2ltYWdlcy9zaGFyZS9jaXJjbGVzLmpwZycsXG4gICAgICBjb2xsZWN0aW9uOiAnLi4vaW1hZ2VzL3NoYXJlL2NvbGxlY3Rpb24uanBnJyxcbiAgICAgIG5vdGlmeTogJy4uL2ltYWdlcy9zaGFyZS9ub3RpZnkuanBnJyxcbiAgICAgIGFjdGl2aXR5OiAnLi4vaW1hZ2VzL3NoYXJlL2FjdGl2aXR5LmpwZycsXG4gICAgICBhY2NvdW50OiAnLi4vaW1hZ2VzL3NoYXJlL2FjY291bnQuanBnJ1xuICAgIH0sXG4gICAgcG46IDEsXG4gICAgcHM6IDEwLFxuICAgIGxpc3Q6IFtdLFxuICAgIHBheU1lbWJlckxpc3Q6IFtdLFxuICAgIGNsYXNzSW5mbzogbnVsbCxcbiAgICBtZW1iZXJJbmZvOiBudWxsLFxuICAgIHNjaG9vbEluZm86IG51bGwsXG4gICAgbG9hZGluZzogZmFsc2UsXG4gICAgbG9hZEZpbmlzaGVkOiBmYWxzZSxcbiAgICBjb21tZW50SW5wdXQ6ICcnLFxuICAgIGN1cnJlbnRSZXBseUlkOiAtMSxcbiAgICBjdXJyZW50UmVwbHlSb290SWQ6IC0xLFxuICAgIGN1cnJlbnRSZXBseVRvQ29tbWVudElkOiAtMSxcbiAgICBjdXJyZXJudEpvaW5BY2l0aXZ5dElkOiAtMSxcbiAgICBjdXJyZXJudFN1YkFjdGl2aXR5SWQ6IFtdLFxuICAgIGN1cnJlbnRDb2xsZWN0aW9uSWQ6IC0xLFxuICAgIGF1dGg6IHtcbiAgICAgIHByZXNpZGVudDogZmFsc2UsXG4gICAgICBmaW5hbmNlOiBmYWxzZSxcbiAgICAgIGFjdGl2aXR5OiBmYWxzZSxcbiAgICAgIG5vdGlmeTogZmFsc2UsXG4gICAgICBwaG90b3M6IGZhbHNlLFxuICAgICAgY2lyY2xlczogZmFsc2VcbiAgICB9LFxuICAgIGNvbW1lbnRQbjogMixcbiAgICBjb21tZW50UHM6IDYsXG4gICAgY29tbWVudE9mZnNldDogNixcbiAgICBjb21tZW50TG9hZEZpbmlzaGVkOiBmYWxzZSxcbiAgICBtZW1iZXJMaXN0OiBbXSxcbiAgICBzdHVkZW50SWRzOiBbXSxcbiAgICBmaXJzdEluaXQ6IHRydWUsXG4gICAgcGF5bWVudExvY2tlZDogZmFsc2UsXG4gICAgbG9hZE1vcmVDb21tZW50QXJyYXk6IFtdLFxuICAgIHNoYXJlVGl0bGU6ICcnLFxuICAgIHNob3dTaGFyZUZsYWc6IGZhbHNlLFxuICAgIHNoYXJlSW1nOiAnJyxcbiAgICByZW1vdmVDaXJjbGVUaXRsZTogJ+aCqOehruiupOimgeWIoOmZpOWQl++8nycsXG4gICAgY3VycmVudFJlbW92ZU1vbWVudElkOiAtMSxcbiAgICBjdXJyZW50UmVtb3ZlTW9tZW50SWR4OiAtMSxcbiAgICBjdXJyZW50VG9Db21tZW50SWQ6IC0xXG4gIH1cbiAgd2F0Y2ggPSB7XG4gICAgY2xhc3NJbmZvKG5ld1ZhbCwgb2xkVmFsKSB7XG4gICAgICAvLyDliIfmjaLkuobnj63nuqfkuYvlkI7mlbDmja7opoHmm7TmlrBcbiAgICAgIGlmIChvbGRWYWwgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5yZXNldERhdGEoKVxuICAgICAgICB0aGlzLmdldEF1dGhMaXN0KClcbiAgICAgICAgdGhpcy5nZXRab25lTGlzdCgpXG4gICAgICAgIHRoaXMubWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcbiAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckRhdGEgPSB0aGlzLm1lbWJlckluZm9cbiAgICAgIH1cbiAgICB9LFxuICAgIGN1cnJlbnRKb2luQWN0aXZpdHlJZChuZXdWYWwsIG9sZFZhbCkge1xuICAgICAgaWYgKG5ld1ZhbCA+IDApIHtcbiAgICAgICAgdGhpcy5jdXJyZXJudFN1YkFjdGl2aXR5SWQgPSBbXVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJlc2V0RGF0YSgpIHtcbiAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZVxuICAgIHRoaXMubG9hZEZpbmlzaGVkID0gZmFsc2VcbiAgICB0aGlzLmxvYWRNb3JlQ29tbWVudEFycmF5ID0gW11cbiAgICB0aGlzLmNvbW1lbnRMb2FkRmluaXNoZWQgPSBmYWxzZVxuICAgIHRoaXMuY3VycmVudFJlbW92ZU1vbWVudElkID0gLTFcbiAgICB0aGlzLmN1cnJlbnRSZW1vdmVNb21lbnRJZHggPSAtMVxuICAgIHRoaXMuY3VycmVudFRvQ29tbWVudElkID0gLTFcbiAgICB0aGlzLmNvbW1lbnRQbiA9IDJcbiAgICB0aGlzLmNvbW1lbnRQcyA9IDZcbiAgICB0aGlzLnN0dWRlbnRJZHMgPSBbXVxuICAgIHRoaXMucGF5bWVudExvY2tlZCA9IGZhbHNlXG4gICAgdGhpcy5wbiA9IDFcbiAgICB0aGlzLmxpc3QgPSBbXVxuICAgIHRoaXMuJGFwcGx5KClcbiAgfVxuICBvblB1bGxEb3duUmVmcmVzaCgpIHtcbiAgICB0aGlzLnJlc2V0RGF0YSgpXG4gICAgdGhpcy5nZXRab25lTGlzdCgpXG4gIH1cbiAgb25SZWFjaEJvdHRvbSgpIHtcbiAgICBpZiAodGhpcy5sb2FkaW5nIHx8IHRoaXMubG9hZEZpbmlzaGVkKSByZXR1cm5cbiAgICB0aGlzLmdldFpvbmVMaXN0KClcbiAgfVxuICBvblNob3coKSB7XG4gICAgdGhpcy5jdXJyZXJudEpvaW5BY2l0aXZ5dElkID0gLTFcbiAgICB0aGlzLmN1cnJlcm50U3ViQWN0aXZpdHlJZCA9IFtdXG4gICAgdGhpcy5jbGFzc0luZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnY2xhc3NJbmZvJylcbiAgICB0aGlzLiRhcHBseSgpXG4gICAgLy8g5aaC5p6c5piv5LuOcHVibGlzaOetiemhtemdoui/lOWbnu+8jOWImemcgOimgeWIt+aWsOaVsOaNrlxuICAgIGxldCBkYXRhID0gdGhpcy4kd3hwYWdlLmRhdGE7XG4gICAgaWYgKGRhdGEuZnJvbVB1Ymxpc2gpIHtcbiAgICAgIHRoaXMucmVzZXREYXRhKClcbiAgICAgIHRoaXMuZ2V0Wm9uZUxpc3QoKVxuICAgIH1cbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgZnJvbVB1Ymxpc2g6IGZhbHNlXG4gICAgfSlcbiAgICAvLyB3eC5wYWdlU2Nyb2xsVG8oe1xuICAgIC8vICAgc2Nyb2xsVG9wOiAwXG4gICAgLy8gfSlcbiAgfVxuICBvbkxvYWQoKSB7XG4gICAgaWYgKCF0aGlzLmNoZWNrRGF0YUV4aXN0KCdtZW1iZXJJbmZvJykpIHtcbiAgICAgIHd4LnJlTGF1bmNoKHtcbiAgICAgICAgdXJsOiAnbG9naW4nXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxuICAgICAgdGhpcy5jbGFzc0luZm8gJiYgdGhpcy5nZXRBdXRoTGlzdCgpXG4gICAgICB0aGlzLm1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXG4gICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyRGF0YSA9IHRoaXMubWVtYmVySW5mb1xuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgdGhpcy5nZXRab25lTGlzdCgpXG4gICAgfVxuICB9XG4gIHJlbW92ZUNpcmNsZUZuKGlkLCBpZHgpIHtcbiAgICBkZWxldGVDaXJjbGUoe1xuICAgICAgbW9tZW50X2lkOiBpZCxcbiAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZFxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgIHNob3dNc2coJ+aIkOWKn+WIoOmZpCcpXG4gICAgICAgIHRoaXMubGlzdC5zcGxpY2UoaWR4LCAxKVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBnZXRBdXRoTGlzdCgpIHtcbiAgICBnZXRBdXRoKHtcbiAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZFxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHRoaXMuY2hlY2tBdXRoKHJlcy5kYXRhLmRhdGEpXG4gICAgfSlcbiAgfVxuICBmb3JtYXRBbGxBdXRoKG9iaikge1xuICAgIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgb2JqW2tleV0gPSB0cnVlXG4gICAgfSlcbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgZm9ybWF0U2luZ2xlQXV0aChuYW1lLCBib29sZWFuVmFsdWUpIHtcbiAgICB0aGlzLmF1dGhbbmFtZV0gPSBib29sZWFuVmFsdWVcbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgY2hlY2tBdXRoKGxpc3QpIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gbGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgbGV0IHtjb2RlLCBpc19hdXRoOiBpc0F1dGh9ID0gbGlzdFtpXVxuICAgICAgaWYgKGNvZGUgPT09ICdwcmVzaWRlbnQnICYmIGlzQXV0aCkge1xuICAgICAgICB0aGlzLmZvcm1hdEFsbEF1dGgodGhpcy5hdXRoKVxuICAgICAgICBicmVha1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXNBdXRoICYmIHRoaXMuZm9ybWF0U2luZ2xlQXV0aChjb2RlLCB0cnVlKVxuICAgICAgICAhaXNBdXRoICYmIHRoaXMuZm9ybWF0U2luZ2xlQXV0aChjb2RlLCBmYWxzZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgY2hlY2tEYXRhRXhpc3Qoa2V5KSB7XG4gICAgaWYgKHd4LmdldFN0b3JhZ2VTeW5jKGtleSkpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIGdldFpvbmVMaXN0KCkge1xuICAgIHRoaXMubG9hZGluZyA9IHRydWVcbiAgICB0aGlzLiRhcHBseSgpXG4gICAgY29uc3QgaWQgPSB0aGlzLmNsYXNzSW5mby5pZFxuICAgIGdldENpcmNsZUxpc3Qoe1xuICAgICAgY2xhc3NfaWQ6IGlkLFxuICAgICAgc2VlX3R5cGU6IGlkID8gJycgOiAnYWxsJyxcbiAgICAgIHR5cGU6IHRoaXMuYWN0aXZlVHlwZSxcbiAgICAgIHBuOiB0aGlzLnBuLFxuICAgICAgcHM6IHRoaXMucHMsXG4gICAgICBjb21tZW50X2NvdW50OiAzXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IHsgbGlzdCB9ID0gcmVzLmRhdGFcbiAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlXG4gICAgICB0aGlzLnBuKytcbiAgICAgIGlmIChsaXN0Lmxlbmd0aCA8IHRoaXMucHMpIHtcbiAgICAgICAgdGhpcy5sb2FkRmluaXNoZWQgPSB0cnVlXG4gICAgICB9XG4gICAgICB0aGlzLmxpc3QgPSBbLi4udGhpcy5saXN0LCAuLi5saXN0XVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0pXG4gIH1cbiAgcGF5bWVudFBhcmFtcyhpZCkge1xuICAgIGdldFBheW1lbnRQYXJhbXMoe1xuICAgICAgb3JkZXJfaWQ6IGlkXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IF90aGlzID0gdGhpc1xuICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YS5wYXltZW50X3BhcmFtc1xuICAgICAgd3gucmVxdWVzdFBheW1lbnQoe1xuICAgICAgICB0aW1lU3RhbXA6IFN0cmluZyhkYXRhLnRpbWVTdGFtcCksXG4gICAgICAgIG5vbmNlU3RyOiBkYXRhLm5vbmNlU3RyLFxuICAgICAgICBwYWNrYWdlOiBkYXRhLnBhY2thZ2UsXG4gICAgICAgIHBheVNpZ246IGRhdGEucGF5U2lnbixcbiAgICAgICAgc2lnblR5cGU6ICdNRDUnLFxuICAgICAgICBzdWNjZXNzKCkge1xuICAgICAgICAgIF90aGlzLnBheW1lbnRMb2NrZWQgPSBmYWxzZVxuICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWwoKSB7XG4gICAgICAgICAgX3RoaXMucGF5bWVudExvY2tlZCA9IGZhbHNlXG4gICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9XG4gIGFkZFRvT3JkZXIoaWQpIHtcbiAgICBhZGRPcmRlcih7XG4gICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXG4gICAgICBzdHVkZW50X2lkczogdGhpcy5zdHVkZW50SWRzLFxuICAgICAgY29sbGVjdGlvbl9pdGVtX2lkOiBpZFxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHRoaXMucGF5bWVudFBhcmFtcyhyZXMuZGF0YS5kYXRhLmlkKVxuICAgIH0pXG4gIH1cbiAgZmluZExvYWRtb3JlQ29tbWVudEluZm8oYXJyLCBjdXJyZW50SWQpIHtcbiAgICBsZXQgcmV0T2JqID0ge31cbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gYXJyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBpZiAoYXJyW2ldLm1vbWVudF9pZCA9PT0gY3VycmVudElkKSB7XG4gICAgICAgIHJldE9iaiA9IE9iamVjdC5hc3NpZ24oe30sIGFycltpXSwge1xuICAgICAgICAgIGluZGV4OiBpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXRPYmpcbiAgfVxuICBnZXRTaGFyZUFjdGlvblR5cGUodHlwZSkge1xuICAgIGxldCBhY3Rpb24gPSAn5rWP6KeIJ1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnYWN0aXZpdHknOlxuICAgICAgICBhY3Rpb24gPSAn5Y+C5YqgJ1xuICAgICAgICByZXR1cm4gYWN0aW9uXG4gICAgICBjYXNlICdjb2xsZWN0aW9uJzpcbiAgICAgICAgYWN0aW9uID0gJ+e8tOi0uSdcbiAgICAgICAgcmV0dXJuIGFjdGlvblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGFjdGlvblxuICAgIH1cbiAgfVxuICBnZXRTaGFyZVR5cGUodHlwZSkge1xuICAgIGxldCBjYXRlZ29yeSA9ICcnXG4gICAgaWYgKHR5cGUgPT09ICdjaXJjbGVzJykge1xuICAgICAgY2F0ZWdvcnkgPSAn5a626ZW/5ZyI5Zu+5paHJ1xuICAgIH0gZWxzZSB7XG4gICAgICBjYXRlZ29yeSA9IGDlrrblp5TkvJoke3RoaXMudHlwZVt0eXBlXX1gXG4gICAgfVxuICAgIHJldHVybiBjYXRlZ29yeVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgYWRkTGlrZShtb21lbnRJZCwgaWR4LCBpc0xpa2VkKSB7XG4gICAgICBhZGRMaWtlKHtcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgICBtb21lbnRfaWQ6IG1vbWVudElkXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgaWYgKGlzTGlrZWQpIHtcbiAgICAgICAgICAgIHNob3dNc2coJ+WPlua2iOeCuei1nuaIkOWKnycpXG4gICAgICAgICAgICB0aGlzLmxpc3RbaWR4XS5saWtlX2xpc3QuY291bnQtLVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzaG93TXNnKCfngrnotZ7miJDlip8nKVxuICAgICAgICAgICAgdGhpcy5saXN0W2lkeF0ubGlrZV9saXN0LmNvdW50KytcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5saXN0W2lkeF0uaXNfbGlrZSA9ICFpc0xpa2VkXG4gICAgICAgICAgY29uc3QgbmV3T2JqID0ge1xuICAgICAgICAgICAgbW9tZW50X2lkOiBtb21lbnRJZCxcbiAgICAgICAgICAgIG1lbWJlcl9pZDogdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCxcbiAgICAgICAgICAgIG1lbWJlcjogdGhpcy5tZW1iZXJJbmZvXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubGlzdFtpZHhdLmxpa2VfbGlzdC5saXN0ID0gZmlsdGVyQXJyYXlCeVZhbHVlKHRoaXMubWVtYmVySW5mby5tZW1iZXJfaWQsIHRoaXMubGlzdFtpZHhdLmxpa2VfbGlzdC5saXN0LCBpc0xpa2VkLCBuZXdPYmopXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgdG9nZ2xlRmxhZyhmbGFnLCBib29sZWFuVmFsdWUpIHtcbiAgICAgIHRoaXNbZmxhZ10gPSBib29sZWFuVmFsdWVcbiAgICAgIGlmIChmbGFnID09PSAnc2hvd1N1cmVGbGFnJyAmJiBib29sZWFuVmFsdWUpIHtcbiAgICAgICAgdGhpc1tmbGFnXSA9IGZhbHNlXG4gICAgICAgIHRoaXMucmVtb3ZlQ2lyY2xlRm4odGhpcy5jdXJyZW50UmVtb3ZlTW9tZW50SWQsIHRoaXMuY3VycmVudFJlbW92ZU1vbWVudElkeClcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIHNoYXJlQ2lyY2xlKHR5cGUpIHtcbiAgICAgIGxldCBzaGFyZUFjdGlvblR5cGUgPSB0aGlzLmdldFNoYXJlQWN0aW9uVHlwZSh0eXBlKVxuICAgICAgbGV0IHNoYXJlVHlwZSA9IHRoaXMuZ2V0U2hhcmVUeXBlKHR5cGUpXG4gICAgICB0aGlzLnNoYXJlVGl0bGUgPSBgJHt0aGlzLm1lbWJlckluZm8ubmlja25hbWV95YiG5Lqr5LqG5LiA5LiqJHtzaGFyZVR5cGV977yM54K55Ye7JHtzaGFyZUFjdGlvblR5cGV9YFxuICAgICAgdGhpcy5zaGFyZUltZyA9IHRoaXMuc2hhcmVJbWdTcmNbdHlwZV1cbiAgICAgIHRoaXMuc2hvd1NoYXJlRmxhZyA9IHRydWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIHJlbW92ZUNpcmNsZShpZCwgaWR4KSB7XG4gICAgICB0aGlzLnNob3dTdXJlRmxhZyA9IHRydWVcbiAgICAgIHRoaXMuY3VycmVudFJlbW92ZU1vbWVudElkID0gaWRcbiAgICAgIHRoaXMuY3VycmVudFJlbW92ZU1vbWVudElkeCA9IGlkeFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgcGF5KG1vbWVudElkLCBjb2xsZWN0aW9uSWQpIHtcbiAgICAgIGlmICh0aGlzLnBheW1lbnRMb2NrZWQpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB0aGlzLnBheW1lbnRMb2NrZWQgPSB0cnVlXG4gICAgICBjaGVja1N0dWRlbnQoe1xuICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXG4gICAgICAgIG1vbWVudF9pZDogbW9tZW50SWQsXG4gICAgICAgIGlzX3BheTogMFxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICB0aGlzLnBheU1lbWJlckxpc3QgPSByZXMuZGF0YS5saXN0XG4gICAgICAgIGlmICghdGhpcy5wYXlNZW1iZXJMaXN0Lmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMucGF5bWVudExvY2tlZCA9IGZhbHNlXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgIHNob3dNc2coJ+ivt+WLv+mHjeWkjee8tOi0uScpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucGF5TWVtYmVyTGlzdC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RGbGFnID0gdHJ1ZVxuICAgICAgICAgIHRoaXMuY3VycmVudENvbGxlY3Rpb25JZCA9IGNvbGxlY3Rpb25JZFxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnN0dWRlbnRJZHMgPSBbXVxuICAgICAgICAgIHRoaXMuc3R1ZGVudElkcy5wdXNoKHRoaXMucGF5TWVtYmVyTGlzdFswXS5pZClcbiAgICAgICAgICB0aGlzLmFkZFRvT3JkZXIoY29sbGVjdGlvbklkKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgc3VibWl0Sm9pbkFjdGl2aXR5KCkge1xuICAgICAgaWYgKHRoaXMuY3VycmVybnRKb2luQWNpdGl2eXRJZCA8PSAwKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+WFiOmAieaLqea0u+WKqOmhueebricpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgam9pbkFjdGl2aXR5KHtcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgICBhY3Rpdml0eV9pdGVtX2lkOiB0aGlzLmN1cnJlcm50U3ViQWN0aXZpdHlJZCxcbiAgICAgICAgYWN0aXZpdHlfaWQ6IHRoaXMuY3VycmVybnRKb2luQWNpdGl2eXRJZFxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgIHNob3dNc2coJ+aPkOS6pOaIkOWKnycpXG4gICAgICAgICAgdGhpcy5jdXJyZXJudFN1YkFjdGl2aXR5SWQgPSBbXVxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIGpvaW5BY3Rpdml0eShpZCwgc3ViSWQsIGxpc3RJbmRleCwgYWN0aXZpdHlJbmRleCkge1xuICAgICAgaWYgKCF0aGlzLmNsYXNzSW5mbykge1xuICAgICAgICBzaG93TXNnKCfor7flhYjpgInmi6nnj63nuqcnKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHRoaXMuY3VycmVybnRKb2luQWNpdGl2eXRJZCA9IGlkXG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuY3VycmVybnRTdWJBY3Rpdml0eUlkLmluZGV4T2Yoc3ViSWQpXG4gICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICB0aGlzLmN1cnJlcm50U3ViQWN0aXZpdHlJZC5zcGxpY2UoaW5kZXgsIDEpXG4gICAgICAgIHRoaXMubGlzdFtsaXN0SW5kZXhdLmluZm8uaXRlbVthY3Rpdml0eUluZGV4XS5jaGVja2VkID0gZmFsc2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY3VycmVybnRTdWJBY3Rpdml0eUlkLnB1c2goc3ViSWQpXG4gICAgICAgIHRoaXMubGlzdFtsaXN0SW5kZXhdLmluZm8uaXRlbVthY3Rpdml0eUluZGV4XS5jaGVja2VkID0gdHJ1ZVxuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgbG9hZE1vcmVDb21tZW50KG1vbWVudElkLCBpZHgpIHtcbiAgICAgIGNvbnN0IHJldE9iaiA9IHRoaXMuZmluZExvYWRtb3JlQ29tbWVudEluZm8odGhpcy5sb2FkTW9yZUNvbW1lbnRBcnJheSwgbW9tZW50SWQpO1xuICAgICAgZ2V0Q29tbWVudExpc3Qoe1xuICAgICAgICBtb21lbnRfaWQ6IG1vbWVudElkLFxuICAgICAgICBwczogdGhpcy5jb21tZW50UHMsXG4gICAgICAgIHBuOiByZXRPYmouY29tbWVudFBuID8gcmV0T2JqLmNvbW1lbnRQbiA6IHRoaXMuY29tbWVudFBuLFxuICAgICAgICBvZmZzZXQ6IHRoaXMuY29tbWVudE9mZnNldFxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgIGxldCByZXN1bHRMaXN0ID0gcmVzLmRhdGEubGlzdFxuICAgICAgICAgIGxldCB7bGlzdH0gPSB0aGlzLmxpc3RbaWR4XS5jb21tZW50X2xpc3RcbiAgICAgICAgICBsaXN0ID0gWy4uLmxpc3QsIC4uLnJlc3VsdExpc3RdXG4gICAgICAgICAgdGhpcy5saXN0W2lkeF0uY29tbWVudF9saXN0Lmxpc3QgPSBsaXN0XG4gICAgICAgICAgaWYgKHJlc3VsdExpc3QubGVuZ3RoIDwgdGhpcy5jb21tZW50UHMpIHtcbiAgICAgICAgICAgIHRoaXMubGlzdFtpZHhdLmNvbW1lbnRMb2FkRmluaXNoZWQgPSB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghcmV0T2JqLmNvbW1lbnRQbikge1xuICAgICAgICAgICAgY29uc3Qgb2JqID0ge1xuICAgICAgICAgICAgICBjb21tZW50UG46IHRoaXMuY29tbWVudFBuICsgMSxcbiAgICAgICAgICAgICAgbW9tZW50X2lkOiBtb21lbnRJZFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5sb2FkTW9yZUNvbW1lbnRBcnJheS5wdXNoKG9iailcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2FkTW9yZUNvbW1lbnRBcnJheVtyZXRPYmouaW5kZXhdLmNvbW1lbnRQbiA9IHJldE9iai5jb21tZW50UG4gKyAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBhZGRDb21tZW50KHR5cGUsIGlkLCByb290SWQsIHRvQ29tbWVudElkLCBuYW1lKSB7XG4gICAgICBpZiAodG9Db21tZW50SWQgPT09IHRoaXMubWVtYmVySW5mby5tZW1iZXJfaWQpIHtcbiAgICAgICAgc2hvd01zZygn6K+35LiN6KaB5Zue5aSN6Ieq5bexJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuY2xhc3NJbmZvKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+WFiOmAieaLqeePree6pycpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdGhpcy5jb21tZW50RmxhZyA9IHRydWVcbiAgICAgIHRoaXMuY3VycmVudFJlcGx5SWQgPSBpZFxuICAgICAgdGhpcy5jdXJyZW50UmVwbHlSb290SWQgPSB0eXBlID09PSAnYWRkJyA/IDAgOiByb290SWRcbiAgICAgIHRoaXMuY3VycmVudFRvQ29tbWVudElkID0gdG9Db21tZW50SWRcbiAgICAgIGlmIChuYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5jb21tZW50SW5wdXQgPSBgQCR7bmFtZX06YFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb21tZW50SW5wdXQgPSAnJ1xuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgYmluZENvbW1lbnRJbnB1dCAodmFsdWUpIHtcbiAgICAgIHRoaXMuY29tbWVudElucHV0ID0gdmFsdWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGNvbW1lbnRTdXJlICgpIHtcbiAgICAgIHRoaXMuY29tbWVudEZsYWcgPSBmYWxzZVxuICAgICAgYWRkQ29tbWVudCh7XG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgICAgbW9tZW50X2lkOiB0aGlzLmN1cnJlbnRSZXBseUlkLFxuICAgICAgICBjb250ZW50OiB0aGlzLmN1cnJlbnRSZXBseUlkID4gMCA/IHRoaXMuY29tbWVudElucHV0LnJlcGxhY2UoL15ALis6LywgJycpIDogdGhpcy5jb21tZW50SW5wdXQsXG4gICAgICAgIHJvb3RfaWQ6IHRoaXMuY3VycmVudFJlcGx5Um9vdElkLFxuICAgICAgICB0b19jb21tZW50X2lkOiB0aGlzLmN1cnJlbnRUb0NvbW1lbnRJZFxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgIHRoaXMuY29tbWVudElucHV0ID0gJydcbiAgICAgICAgICB0aGlzLnJlc2V0RGF0YSgpXG4gICAgICAgICAgdGhpcy5nZXRab25lTGlzdCgpXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAganVtcFB1Ymxpc2godmFsdWUpIHtcbiAgICAgIGlmICghdGhpcy5jbGFzc0luZm8pIHtcbiAgICAgICAgc2hvd01zZygn6K+36YCJ57uR5a6a54+t57qnJywgMzAwMClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBsZXQgdXJsID0gdmFsdWUgPT09ICdhY2NvdW50JyA/ICdyZWNvcmRDYXNoZmxvdycgOiBgcHVibGlzaD90eXBlPSR7dmFsdWV9YFxuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogdXJsXG4gICAgICB9KVxuICAgIH0sXG4gICAgY29tbWVudENhbmNlbCAoKSB7XG4gICAgICB0aGlzLmNvbW1lbnRGbGFnID0gZmFsc2VcbiAgICAgIHRoaXMuY29tbWVudElucHV0ID0gJydcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGp1bXBQYWdlIChwYWdlTmFtZSwgdHlwZSkge1xuICAgICAgdGhpcy5wdWJsaXNoRmxhZyA9IGZhbHNlXG4gICAgICB0aGlzLnNldEZsYWcgPSBmYWxzZVxuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogYCR7cGFnZU5hbWV9P3R5cGU9JHt0eXBlfWBcbiAgICAgIH0pXG4gICAgfSxcbiAgICB0b2dnbGVNZW51ICh0eXBlKSB7XG4gICAgICBpZiAoIXRoaXMuY2xhc3NJbmZvKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+mAiee7keWumuePree6pycsIDMwMDApXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdGhpc1t0eXBlXSA9ICF0aGlzW3R5cGVdXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBjbG9zZVRvZ2dsZSAoKSB7XG4gICAgICB0aGlzLnNldEZsYWcgPSBmYWxzZVxuICAgICAgdGhpcy5wdWJsaXNoRmxhZyA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBwcmV2aWV3KGltZywgaW1nTGlzdCkge1xuICAgICAgcHJldmlld0ltYWdlKGltZywgaW1nTGlzdClcbiAgICB9LFxuICAgIHNlbGVjdFN1cmUodmFsdWUpIHtcbiAgICAgIGlmICghdmFsdWUubGVuZ3RoKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+mAieaLqScpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgY29uc3QgdmFsID0gdmFsdWVcbiAgICAgIHRoaXMuc3R1ZGVudElkcyA9IFsuLi52YWxdXG4gICAgICB0aGlzLnNlbGVjdEZsYWcgPSBmYWxzZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgdGhpcy5hZGRUb09yZGVyKHRoaXMuY3VycmVudENvbGxlY3Rpb25JZClcbiAgICB9XG4gIH1cbiAgb25TaGFyZUFwcE1lc3NhZ2UocmVzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiB0aGlzLnNoYXJlVGl0bGUsXG4gICAgICBpbWFnZVVybDogdGhpcy5zaGFyZUltZ1xuICAgIH1cbiAgfVxufVxuIl19