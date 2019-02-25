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
      paymentLocked: false,
      loadMoreCommentArray: [],
      shareTitle: ''
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
      // shareMsg(title) {
      //   this.shareTitle = title
      //   this.$apply()
      // },
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
    key: 'onShareAppMessage',
    value: function onShareAppMessage(res) {
      return {
        title: this.shareTitle
      };
    }
  }]);

  return Zone;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Zone , 'pages/zone'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInpvbmUuanMiXSwibmFtZXMiOlsiWm9uZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJDdXJyZW50TW9kYWwiLCJTZWxlY3RNb2RhbCIsImRhdGEiLCJtZW51TGlzdCIsInRleHQiLCJ0eXBlIiwic3JjIiwiY29tbWVudEZsYWciLCJzZWxlY3RGbGFnIiwiYWN0aXZlVHlwZSIsInNldEZsYWciLCJwdWJsaXNoRmxhZyIsImNpcmNsZXMiLCJjb2xsZWN0aW9uIiwibm90aWZ5IiwiYWN0aXZpdHkiLCJhY2NvdW50IiwicG4iLCJwcyIsImxpc3QiLCJwYXlNZW1iZXJMaXN0IiwiY2xhc3NJbmZvIiwibWVtYmVySW5mbyIsInNjaG9vbEluZm8iLCJsb2FkaW5nIiwibG9hZEZpbmlzaGVkIiwiY29tbWVudElucHV0IiwiY3VycmVudFJlcGx5SWQiLCJjdXJyZW50UmVwbHlSb290SWQiLCJjdXJyZW50UmVwbHlUb0NvbW1lbnRJZCIsImN1cnJlcm50Sm9pbkFjaXRpdnl0SWQiLCJjdXJyZXJudFN1YkFjdGl2aXR5SWQiLCJjdXJyZW50Q29sbGVjdGlvbklkIiwiYXV0aCIsInByZXNpZGVudCIsImZpbmFuY2UiLCJwaG90b3MiLCJjb21tZW50UG4iLCJjb21tZW50UHMiLCJjb21tZW50T2Zmc2V0IiwiY29tbWVudExvYWRGaW5pc2hlZCIsIm1lbWJlckxpc3QiLCJzdHVkZW50SWRzIiwiZmlyc3RJbml0IiwicGF5bWVudExvY2tlZCIsImxvYWRNb3JlQ29tbWVudEFycmF5Iiwic2hhcmVUaXRsZSIsIndhdGNoIiwibmV3VmFsIiwib2xkVmFsIiwicmVzZXREYXRhIiwiZ2V0QXV0aExpc3QiLCJnZXRab25lTGlzdCIsImN1cnJlbnRKb2luQWN0aXZpdHlJZCIsIiRhcHBseSIsIm1ldGhvZHMiLCJwYXkiLCJtb21lbnRJZCIsImNvbGxlY3Rpb25JZCIsImNsYXNzX2lkIiwiaWQiLCJtb21lbnRfaWQiLCJpc19wYXkiLCJ0aGVuIiwicmVzIiwibGVuZ3RoIiwicHVzaCIsImFkZFRvT3JkZXIiLCJzdWJtaXRKb2luQWN0aXZpdHkiLCJhY3Rpdml0eV9pdGVtX2lkIiwiYWN0aXZpdHlfaWQiLCJzdWNjZXNzIiwiam9pbkFjdGl2aXR5Iiwic3ViSWQiLCJsaXN0SW5kZXgiLCJhY3Rpdml0eUluZGV4IiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIiwiaW5mbyIsIml0ZW0iLCJjaGVja2VkIiwibG9hZE1vcmVDb21tZW50IiwiaWR4IiwicmV0T2JqIiwiZmluZExvYWRtb3JlQ29tbWVudEluZm8iLCJvZmZzZXQiLCJyZXN1bHRMaXN0IiwiY29tbWVudF9saXN0Iiwib2JqIiwiYWRkQ29tbWVudCIsInJvb3RJZCIsInRvQ29tbWVudElkIiwibmFtZSIsIm1lbWJlcl9pZCIsInVuZGVmaW5lZCIsImJpbmRDb21tZW50SW5wdXQiLCJ2YWx1ZSIsImNvbW1lbnRTdXJlIiwiY29udGVudCIsInJlcGxhY2UiLCJyb290X2lkIiwidG9fY29tbWVudF9pZCIsImp1bXBQdWJsaXNoIiwidXJsIiwid3giLCJuYXZpZ2F0ZVRvIiwiY29tbWVudENhbmNlbCIsImp1bXBQYWdlIiwicGFnZU5hbWUiLCJ0b2dnbGVNZW51IiwiY2xvc2VUb2dnbGUiLCJwcmV2aWV3IiwiaW1nIiwiaW1nTGlzdCIsInNlbGVjdENhbmNlbCIsInNlbGVjdFN1cmUiLCJ2YWwiLCJnZXRTdG9yYWdlU3luYyIsImNoZWNrRGF0YUV4aXN0IiwicmVMYXVuY2giLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInVzZXJEYXRhIiwiY2hlY2tBdXRoIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJpIiwibGVuIiwiY29kZSIsImlzQXV0aCIsImlzX2F1dGgiLCJmb3JtYXRBbGxBdXRoIiwiZm9ybWF0U2luZ2xlQXV0aCIsInNlZV90eXBlIiwiY29tbWVudF9jb3VudCIsIm9yZGVyX2lkIiwiX3RoaXMiLCJwYXltZW50X3BhcmFtcyIsInJlcXVlc3RQYXltZW50IiwidGltZVN0YW1wIiwiU3RyaW5nIiwibm9uY2VTdHIiLCJwYWNrYWdlIiwicGF5U2lnbiIsInNpZ25UeXBlIiwiZmFpbCIsInN0dWRlbnRfaWRzIiwiY29sbGVjdGlvbl9pdGVtX2lkIiwicGF5bWVudFBhcmFtcyIsImFyciIsImN1cnJlbnRJZCIsImFzc2lnbiIsInRpdGxlIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLEk7Ozs7Ozs7Ozs7Ozs7O3FMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixJQURqQjtBQUVQQyw2QkFBdUI7QUFGaEIsSyxTQUlWQyxPLEdBQVUsRSxTQUNYQyxNLEdBQVMsRUFBQyxnQkFBZSxFQUFDLGVBQWMsSUFBZixFQUFvQixpQkFBZ0IsSUFBcEMsRUFBeUMsbUJBQWtCLFNBQTNELEVBQXFFLGdCQUFlLEVBQXBGLEVBQXVGLG9CQUFtQixhQUExRyxFQUF3SCw0QkFBMkIsY0FBbkosRUFBa0ssY0FBYSxFQUEvSyxFQUFoQixFQUFtTSxlQUFjLEVBQUMsb0JBQW1CLFlBQXBCLEVBQWlDLG9CQUFtQixlQUFwRCxFQUFqTixFLFNBQ1RDLE8sR0FBVSxFQUFDLGdCQUFlLEVBQUMsZUFBYyxlQUFmLEVBQStCLGFBQVksYUFBM0MsRUFBeUQsY0FBYSxrQkFBdEUsRUFBaEIsRUFBMEcsZUFBYyxFQUFDLGVBQWMsY0FBZixFQUE4QixhQUFZLFlBQTFDLEVBQXhILEUsU0FDVEMsVSxHQUFhO0FBQ1ZDLDBDQURVO0FBRVZDO0FBRlUsSyxTQUlaQyxJLEdBQU87QUFDTEMsZ0JBQVUsQ0FDUjtBQUNFQyxjQUFNLEtBRFI7QUFFRUMsY0FBTSxNQUZSO0FBR0VDLGFBQUs7QUFIUCxPQURRLEVBTVI7QUFDRUYsY0FBTSxJQURSO0FBRUVDLGNBQU0sT0FGUjtB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QkFDVU0sRSxFQUFJO0FBQUE7O0FBQ2IsNkJBQVM7QUFDUEQsa0JBQVUsS0FBS3RDLFNBQUwsQ0FBZXVDLEVBRGxCO0FBRVB5RixxQkFBYSxLQUFLM0csVUFGWDtBQUdQNEcsNEJBQW9CMUY7QUFIYixPQUFULEVBSUdHLElBSkgsQ0FJUSxlQUFPO0FBQ2IsZ0JBQUt3RixhQUFMLENBQW1CdkYsSUFBSTlELElBQUosQ0FBU0EsSUFBVCxDQUFjMEQsRUFBakM7QUFDRCxPQU5EO0FBT0Q7Ozs0Q0FDdUI0RixHLEVBQUtDLFMsRUFBVztBQUN0QyxVQUFJckUsU0FBUyxFQUFiO0FBQ0EsV0FBSSxJQUFJNkMsSUFBSSxDQUFSLEVBQVVDLE1BQU1zQixJQUFJdkYsTUFBeEIsRUFBZ0NnRSxJQUFJQyxHQUFwQyxFQUF5Q0QsR0FBekMsRUFBOEM7QUFDNUMsWUFBR3VCLElBQUl2QixDQUFKLEVBQU9wRSxTQUFQLEtBQXFCNEYsU0FBeEIsRUFBbUM7QUFDakNyRSxtQkFBU3lDLE9BQU82QixNQUFQLENBQWMsRUFBZCxFQUFpQkYsSUFBSXZCLENBQUosQ0FBakIsRUFBd0I7QUFDL0JyRCxtQkFBT3FEO0FBRHdCLFdBQXhCLENBQVQ7QUFHRDtBQUNGO0FBQ0QsYUFBTzdDLE1BQVA7QUFDRDs7O3NDQTBMaUJwQixHLEVBQUs7QUFDckIsYUFBTztBQUNMMkYsZUFBTyxLQUFLN0c7QUFEUCxPQUFQO0FBR0Q7Ozs7RUFoYitCOEcsZUFBS0MsSTs7a0JBQWxCckssSSIsImZpbGUiOiJ6b25lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IFNlbGVjdE1vZGFsIGZyb20gJy4uL2NvbXBvbmVudHMvc2VsZWN0TW9kYWwnXG5pbXBvcnQgQ3VycmVudE1vZGFsIGZyb20gJy4uL2NvbXBvbmVudHMvY29tbWVudE1vZGFsJ1xuaW1wb3J0IHsgc2hvd01zZywgcHJldmlld0ltYWdlIH0gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xuaW1wb3J0IHsgZ2V0Q2lyY2xlTGlzdCwgYWRkQ29tbWVudCwgam9pbkFjdGl2aXR5LCBnZXRDb21tZW50TGlzdCB9IGZyb20gJy4uL2FwaS96b25lJ1xuaW1wb3J0IHsgYWRkT3JkZXIsIGdldFBheW1lbnRQYXJhbXMgfSBmcm9tICcuLi9hcGkvZmluYW5jZSdcbmltcG9ydCB7IGdldEF1dGggfSBmcm9tICcuLi9hcGkvYXV0aG9yaXplJ1xuaW1wb3J0IHsgY2hlY2tTdHVkZW50IH0gZnJvbSAnLi4vYXBpL3VzZXInXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBab25lIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflj5HnjrAnLFxuICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogdHJ1ZVxuICB9XG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJDdXJyZW50TW9kYWxcIjp7XCJzdXJlQnRuVGV4dFwiOlwi56Gu6K6kXCIsXCJjYW5jZWxCdG5UZXh0XCI6XCLlj5bmtohcIixcInBsYWNlaG9sZGVyVGV4dFwiOlwi6K+36L6T5YWl6K+E6K665YaF5a65XCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmZsYWcuc3luY1wiOlwiY29tbWVudEZsYWdcIixcInYtYmluZDpjb21tZW50SW5wdXQuc3luY1wiOlwiY29tbWVudElucHV0XCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJTZWxlY3RNb2RhbFwiOntcInYtYmluZDpmbGFnLnN5bmNcIjpcInNlbGVjdEZsYWdcIixcInYtYmluZDpsaXN0LnN5bmNcIjpcInBheU1lbWJlckxpc3RcIn19O1xyXG4kZXZlbnRzID0ge1wiQ3VycmVudE1vZGFsXCI6e1widi1vbjpjYW5jZWxcIjpcImNvbW1lbnRDYW5jZWxcIixcInYtb246c3VyZVwiOlwiY29tbWVudFN1cmVcIixcInYtb246aW5wdXRcIjpcImJpbmRDb21tZW50SW5wdXRcIn0sXCJTZWxlY3RNb2RhbFwiOntcInYtb246Y2FuY2VsXCI6XCJzZWxlY3RDYW5jZWxcIixcInYtb246c3VyZVwiOlwic2VsZWN0U3VyZVwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgIEN1cnJlbnRNb2RhbCxcbiAgICBTZWxlY3RNb2RhbFxuICB9XG4gIGRhdGEgPSB7XG4gICAgbWVudUxpc3Q6IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ+WutumVv+WciCcsXG4gICAgICAgIHR5cGU6ICd6b25lJyxcbiAgICAgICAgc3JjOiAnL2ltYWdlcy9pY29uLzIuanBnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ+aUtui0uScsXG4gICAgICAgIHR5cGU6ICdtb25leScsXG4gICAgICAgIHNyYzogJy9pbWFnZXMvaWNvbi9tb25leS5qcGcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAn6YCa55+lJyxcbiAgICAgICAgdHlwZTogJ25vdGljZScsXG4gICAgICAgIHNyYzogJy9pbWFnZXMvaWNvbi80LmpwZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICfmtLvliqgnLFxuICAgICAgICB0eXBlOiAnYWN0aXZpdHknLFxuICAgICAgICBzcmM6ICcvaW1hZ2VzL2ljb24vNS5qcGcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAn6K6w6LSmJyxcbiAgICAgICAgdHlwZTogJ2FjY291bnQnLFxuICAgICAgICBzcmM6ICcvaW1hZ2VzL2ljb24vcGhvdG9zLmpwZydcbiAgICAgIH1cbiAgICBdLFxuICAgIGNvbW1lbnRGbGFnOiBmYWxzZSxcbiAgICBzZWxlY3RGbGFnOiBmYWxzZSxcbiAgICBhY3RpdmVUeXBlOiAnYWxsJyxcbiAgICBzZXRGbGFnOiBmYWxzZSxcbiAgICBwdWJsaXNoRmxhZzogZmFsc2UsXG4gICAgdHlwZToge1xuICAgICAgY2lyY2xlczogJ+WutumVv+WciCcsXG4gICAgICBjb2xsZWN0aW9uOiAn5pS25qy+JyxcbiAgICAgIG5vdGlmeTogJ+mAmuefpScsXG4gICAgICBhY3Rpdml0eTogJ+a0u+WKqCcsXG4gICAgICBhY2NvdW50OiAn6K6w6LSmJ1xuICAgIH0sXG4gICAgcG46IDEsXG4gICAgcHM6IDEwLFxuICAgIGxpc3Q6IFtdLFxuICAgIHBheU1lbWJlckxpc3Q6IFtdLFxuICAgIGNsYXNzSW5mbzogbnVsbCxcbiAgICBtZW1iZXJJbmZvOiBudWxsLFxuICAgIHNjaG9vbEluZm86IG51bGwsXG4gICAgbG9hZGluZzogZmFsc2UsXG4gICAgbG9hZEZpbmlzaGVkOiBmYWxzZSxcbiAgICBjb21tZW50SW5wdXQ6ICcnLFxuICAgIGN1cnJlbnRSZXBseUlkOiAtMSxcbiAgICBjdXJyZW50UmVwbHlSb290SWQ6IC0xLFxuICAgIGN1cnJlbnRSZXBseVRvQ29tbWVudElkOiAtMSxcbiAgICBjdXJyZXJudEpvaW5BY2l0aXZ5dElkOiAtMSxcbiAgICBjdXJyZXJudFN1YkFjdGl2aXR5SWQ6IFtdLFxuICAgIGN1cnJlbnRDb2xsZWN0aW9uSWQ6IC0xLFxuICAgIGF1dGg6IHtcbiAgICAgIHByZXNpZGVudDogZmFsc2UsXG4gICAgICBmaW5hbmNlOiBmYWxzZSxcbiAgICAgIGFjdGl2aXR5OiBmYWxzZSxcbiAgICAgIG5vdGlmeTogZmFsc2UsXG4gICAgICBwaG90b3M6IGZhbHNlLFxuICAgICAgY2lyY2xlczogZmFsc2VcbiAgICB9LFxuICAgIGNvbW1lbnRQbjogMixcbiAgICBjb21tZW50UHM6IDYsXG4gICAgY29tbWVudE9mZnNldDogNixcbiAgICBjb21tZW50TG9hZEZpbmlzaGVkOiBmYWxzZSxcbiAgICBtZW1iZXJMaXN0OiBbXSxcbiAgICBzdHVkZW50SWRzOiBbXSxcbiAgICBmaXJzdEluaXQ6IHRydWUsXG4gICAgcGF5bWVudExvY2tlZDogZmFsc2UsXG4gICAgbG9hZE1vcmVDb21tZW50QXJyYXk6IFtdLFxuICAgIHNoYXJlVGl0bGU6ICcnXG4gIH1cbiAgd2F0Y2ggPSB7XG4gICAgY2xhc3NJbmZvKG5ld1ZhbCwgb2xkVmFsKSB7XG4gICAgICAvLyDliIfmjaLkuobnj63nuqfkuYvlkI7mlbDmja7opoHmm7TmlrBcbiAgICAgIGlmIChvbGRWYWwgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5yZXNldERhdGEoKVxuICAgICAgICB0aGlzLmdldEF1dGhMaXN0KClcbiAgICAgICAgdGhpcy5nZXRab25lTGlzdCgpXG4gICAgICB9XG4gICAgfSxcbiAgICBjdXJyZW50Sm9pbkFjdGl2aXR5SWQobmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgIGlmIChuZXdWYWwgPiAwKSB7XG4gICAgICAgIHRoaXMuY3VycmVybnRTdWJBY3Rpdml0eUlkID0gW11cbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXNldERhdGEoKSB7XG4gICAgdGhpcy5sb2FkTW9yZUNvbW1lbnRBcnJheSA9IFtdXG4gICAgdGhpcy5jb21tZW50TG9hZEZpbmlzaGVkID0gZmFsc2VcbiAgICB0aGlzLmNvbW1lbnRQbiA9IDJcbiAgICB0aGlzLmNvbW1lbnRQcyA9IDZcbiAgICB0aGlzLnN0dWRlbnRJZHMgPSBbXVxuICAgIHRoaXMucGF5bWVudExvY2tlZCA9IGZhbHNlXG4gICAgdGhpcy5wbiA9IDFcbiAgICB0aGlzLmxpc3QgPSBbXVxuICAgIHRoaXMuJGFwcGx5KClcbiAgfVxuICBvblB1bGxEb3duUmVmcmVzaCgpIHtcbiAgICB0aGlzLnJlc2V0RGF0YSgpXG4gICAgdGhpcy5nZXRab25lTGlzdCgpXG4gIH1cbiAgb25SZWFjaEJvdHRvbSgpIHtcbiAgICBpZiAodGhpcy5sb2FkaW5nIHx8IHRoaXMubG9hZEZpbmlzaGVkKSByZXR1cm5cbiAgICB0aGlzLmdldFpvbmVMaXN0KClcbiAgfVxuICBvblNob3coKSB7XG4gICAgdGhpcy5jdXJyZXJudEpvaW5BY2l0aXZ5dElkID0gLTFcbiAgICB0aGlzLmN1cnJlcm50U3ViQWN0aXZpdHlJZCA9IFtdXG4gICAgdGhpcy5jbGFzc0luZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnY2xhc3NJbmZvJylcbiAgICB0aGlzLiRhcHBseSgpXG4gICAgdGhpcy5yZXNldERhdGEoKVxuICAgIHRoaXMuZ2V0Wm9uZUxpc3QoKVxuICB9XG4gIG9uTG9hZCgpIHtcbiAgICBpZiAoIXRoaXMuY2hlY2tEYXRhRXhpc3QoJ21lbWJlckluZm8nKSkge1xuICAgICAgd3gucmVMYXVuY2goe1xuICAgICAgICB1cmw6ICdsb2dpbidcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXG4gICAgICB0aGlzLmNsYXNzSW5mbyAmJiB0aGlzLmdldEF1dGhMaXN0KClcbiAgICAgIHRoaXMubWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcbiAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJEYXRhID0gdGhpcy5tZW1iZXJJbmZvXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB0aGlzLmdldFpvbmVMaXN0KClcbiAgICB9XG4gIH1cbiAgZ2V0QXV0aExpc3QoKSB7XG4gICAgZ2V0QXV0aCh7XG4gICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWRcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICB0aGlzLmNoZWNrQXV0aChyZXMuZGF0YS5kYXRhKVxuICAgIH0pXG4gIH1cbiAgZm9ybWF0QWxsQXV0aChvYmopIHtcbiAgICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIG9ialtrZXldID0gdHJ1ZVxuICAgIH0pXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIGZvcm1hdFNpbmdsZUF1dGgobmFtZSkge1xuICAgIHRoaXMuYXV0aFtuYW1lXSA9IHRydWVcbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgY2hlY2tBdXRoKGxpc3QpIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gbGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgbGV0IHtjb2RlLCBpc19hdXRoOiBpc0F1dGh9ID0gbGlzdFtpXVxuICAgICAgaWYgKGNvZGUgPT09ICdwcmVzaWRlbnQnICYmIGlzQXV0aCkge1xuICAgICAgICB0aGlzLmZvcm1hdEFsbEF1dGgodGhpcy5hdXRoKVxuICAgICAgICBicmVha1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXNBdXRoICYmIHRoaXMuZm9ybWF0U2luZ2xlQXV0aChjb2RlKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBjaGVja0RhdGFFeGlzdChrZXkpIHtcbiAgICBpZiAod3guZ2V0U3RvcmFnZVN5bmMoa2V5KSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgZ2V0Wm9uZUxpc3QoKSB7XG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZVxuICAgIHRoaXMuJGFwcGx5KClcbiAgICBjb25zdCBpZCA9IHRoaXMuY2xhc3NJbmZvLmlkXG4gICAgZ2V0Q2lyY2xlTGlzdCh7XG4gICAgICBjbGFzc19pZDogaWQsXG4gICAgICBzZWVfdHlwZTogaWQgPyAnJyA6ICdhbGwnLFxuICAgICAgdHlwZTogdGhpcy5hY3RpdmVUeXBlLFxuICAgICAgcG46IHRoaXMucG4sXG4gICAgICBwczogdGhpcy5wcyxcbiAgICAgIGNvbW1lbnRfY291bnQ6IDNcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgeyBsaXN0IH0gPSByZXMuZGF0YVxuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2VcbiAgICAgIHRoaXMucG4rK1xuICAgICAgaWYgKGxpc3QubGVuZ3RoIDwgdGhpcy5wcykge1xuICAgICAgICB0aGlzLmxvYWRGaW5pc2hlZCA9IHRydWVcbiAgICAgIH1cbiAgICAgIHRoaXMubGlzdCA9IFsuLi50aGlzLmxpc3QsIC4uLmxpc3RdXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSlcbiAgfVxuICBwYXltZW50UGFyYW1zKGlkKSB7XG4gICAgZ2V0UGF5bWVudFBhcmFtcyh7XG4gICAgICBvcmRlcl9pZDogaWRcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgX3RoaXMgPSB0aGlzXG4gICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhLnBheW1lbnRfcGFyYW1zXG4gICAgICB3eC5yZXF1ZXN0UGF5bWVudCh7XG4gICAgICAgIHRpbWVTdGFtcDogU3RyaW5nKGRhdGEudGltZVN0YW1wKSxcbiAgICAgICAgbm9uY2VTdHI6IGRhdGEubm9uY2VTdHIsXG4gICAgICAgIHBhY2thZ2U6IGRhdGEucGFja2FnZSxcbiAgICAgICAgcGF5U2lnbjogZGF0YS5wYXlTaWduLFxuICAgICAgICBzaWduVHlwZTogJ01ENScsXG4gICAgICAgIHN1Y2Nlc3MoKSB7XG4gICAgICAgICAgX3RoaXMucGF5bWVudExvY2tlZCA9IGZhbHNlXG4gICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbCgpIHtcbiAgICAgICAgICBfdGhpcy5wYXltZW50TG9ja2VkID0gZmFsc2VcbiAgICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH1cbiAgYWRkVG9PcmRlcihpZCkge1xuICAgIGFkZE9yZGVyKHtcbiAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgIHN0dWRlbnRfaWRzOiB0aGlzLnN0dWRlbnRJZHMsXG4gICAgICBjb2xsZWN0aW9uX2l0ZW1faWQ6IGlkXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgdGhpcy5wYXltZW50UGFyYW1zKHJlcy5kYXRhLmRhdGEuaWQpXG4gICAgfSlcbiAgfVxuICBmaW5kTG9hZG1vcmVDb21tZW50SW5mbyhhcnIsIGN1cnJlbnRJZCkge1xuICAgIGxldCByZXRPYmogPSB7fVxuICAgIGZvcihsZXQgaSA9IDAsbGVuID0gYXJyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBpZihhcnJbaV0ubW9tZW50X2lkID09PSBjdXJyZW50SWQpIHtcbiAgICAgICAgcmV0T2JqID0gT2JqZWN0LmFzc2lnbih7fSxhcnJbaV0se1xuICAgICAgICAgIGluZGV4OiBpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXRPYmpcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIC8vIHNoYXJlTXNnKHRpdGxlKSB7XG4gICAgLy8gICB0aGlzLnNoYXJlVGl0bGUgPSB0aXRsZVxuICAgIC8vICAgdGhpcy4kYXBwbHkoKVxuICAgIC8vIH0sXG4gICAgcGF5KG1vbWVudElkLCBjb2xsZWN0aW9uSWQpIHtcbiAgICAgIGlmICh0aGlzLnBheW1lbnRMb2NrZWQpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB0aGlzLnBheW1lbnRMb2NrZWQgPSB0cnVlXG4gICAgICBjaGVja1N0dWRlbnQoe1xuICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXG4gICAgICAgIG1vbWVudF9pZDogbW9tZW50SWQsXG4gICAgICAgIGlzX3BheTogMFxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICB0aGlzLnBheU1lbWJlckxpc3QgPSByZXMuZGF0YS5saXN0XG4gICAgICAgIGlmICghdGhpcy5wYXlNZW1iZXJMaXN0Lmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMucGF5bWVudExvY2tlZCA9IGZhbHNlXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgIHNob3dNc2coJ+ivt+WLv+mHjeWkjee8tOi0uScpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucGF5TWVtYmVyTGlzdC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RGbGFnID0gdHJ1ZVxuICAgICAgICAgIHRoaXMuY3VycmVudENvbGxlY3Rpb25JZCA9IGNvbGxlY3Rpb25JZFxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnN0dWRlbnRJZHMgPSBbXVxuICAgICAgICAgIHRoaXMuc3R1ZGVudElkcy5wdXNoKHRoaXMucGF5TWVtYmVyTGlzdFswXS5pZClcbiAgICAgICAgICB0aGlzLmFkZFRvT3JkZXIoY29sbGVjdGlvbklkKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgc3VibWl0Sm9pbkFjdGl2aXR5KCkge1xuICAgICAgam9pbkFjdGl2aXR5KHtcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgICBhY3Rpdml0eV9pdGVtX2lkOiB0aGlzLmN1cnJlcm50U3ViQWN0aXZpdHlJZCxcbiAgICAgICAgYWN0aXZpdHlfaWQ6IHRoaXMuY3VycmVybnRKb2luQWNpdGl2eXRJZFxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgIHNob3dNc2coJ+aPkOS6pOaIkOWKnycpXG4gICAgICAgICAgdGhpcy5jdXJyZXJudFN1YkFjdGl2aXR5SWQgPSBbXVxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIGpvaW5BY3Rpdml0eShpZCwgc3ViSWQsIGxpc3RJbmRleCwgYWN0aXZpdHlJbmRleCkge1xuICAgICAgaWYgKCF0aGlzLmNsYXNzSW5mbykge1xuICAgICAgICBzaG93TXNnKCfor7flhYjpgInmi6nnj63nuqcnKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHRoaXMuY3VycmVybnRKb2luQWNpdGl2eXRJZCA9IGlkXG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuY3VycmVybnRTdWJBY3Rpdml0eUlkLmluZGV4T2Yoc3ViSWQpXG4gICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICB0aGlzLmN1cnJlcm50U3ViQWN0aXZpdHlJZC5zcGxpY2UoaW5kZXgsIDEpXG4gICAgICAgIHRoaXMubGlzdFtsaXN0SW5kZXhdLmluZm8uaXRlbVthY3Rpdml0eUluZGV4XS5jaGVja2VkID0gZmFsc2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY3VycmVybnRTdWJBY3Rpdml0eUlkLnB1c2goc3ViSWQpXG4gICAgICAgIHRoaXMubGlzdFtsaXN0SW5kZXhdLmluZm8uaXRlbVthY3Rpdml0eUluZGV4XS5jaGVja2VkID0gdHJ1ZVxuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgbG9hZE1vcmVDb21tZW50KG1vbWVudElkLCBpZHgpIHtcbiAgICAgIGNvbnN0IHJldE9iaiA9IHRoaXMuZmluZExvYWRtb3JlQ29tbWVudEluZm8odGhpcy5sb2FkTW9yZUNvbW1lbnRBcnJheSwgbW9tZW50SWQpO1xuICAgICAgZ2V0Q29tbWVudExpc3Qoe1xuICAgICAgICBtb21lbnRfaWQ6IG1vbWVudElkLFxuICAgICAgICBwczogdGhpcy5jb21tZW50UHMsXG4gICAgICAgIHBuOiByZXRPYmouY29tbWVudFBuID8gcmV0T2JqLmNvbW1lbnRQbiA6IHRoaXMuY29tbWVudFBuLFxuICAgICAgICBvZmZzZXQ6IHRoaXMuY29tbWVudE9mZnNldFxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgIGxldCByZXN1bHRMaXN0ID0gcmVzLmRhdGEubGlzdFxuICAgICAgICAgIGxldCB7bGlzdH0gPSB0aGlzLmxpc3RbaWR4XS5jb21tZW50X2xpc3RcbiAgICAgICAgICBsaXN0ID0gWy4uLmxpc3QsIC4uLnJlc3VsdExpc3RdXG4gICAgICAgICAgdGhpcy5saXN0W2lkeF0uY29tbWVudF9saXN0Lmxpc3QgPSBsaXN0XG4gICAgICAgICAgaWYgKHJlc3VsdExpc3QubGVuZ3RoIDwgdGhpcy5jb21tZW50UHMpIHtcbiAgICAgICAgICAgIHRoaXMubGlzdFtpZHhdLmNvbW1lbnRMb2FkRmluaXNoZWQgPSB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghcmV0T2JqLmNvbW1lbnRQbikge1xuICAgICAgICAgICAgY29uc3Qgb2JqID0ge1xuICAgICAgICAgICAgICBjb21tZW50UG46IHRoaXMuY29tbWVudFBuICsgMSxcbiAgICAgICAgICAgICAgbW9tZW50X2lkOiBtb21lbnRJZFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5sb2FkTW9yZUNvbW1lbnRBcnJheS5wdXNoKG9iailcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2FkTW9yZUNvbW1lbnRBcnJheVtyZXRPYmouaW5kZXhdLmNvbW1lbnRQbiA9IHJldE9iai5jb21tZW50UG4gKyAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBhZGRDb21tZW50KHR5cGUsIGlkLCByb290SWQsIHRvQ29tbWVudElkLCBuYW1lKSB7XG4gICAgICBpZiAodG9Db21tZW50SWQgPT09IHRoaXMubWVtYmVySW5mby5tZW1iZXJfaWQpIHtcbiAgICAgICAgc2hvd01zZygn6K+35LiN6KaB5Zue5aSN6Ieq5bexJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuY2xhc3NJbmZvKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+WFiOmAieaLqeePree6pycpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdGhpcy5jb21tZW50RmxhZyA9IHRydWVcbiAgICAgIHRoaXMuY3VycmVudFJlcGx5SWQgPSBpZFxuICAgICAgdGhpcy5jdXJyZW50UmVwbHlSb290SWQgPSB0eXBlID09PSAnYWRkJyA/IDAgOiByb290SWRcbiAgICAgIGlmIChuYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5jb21tZW50SW5wdXQgPSBgQCR7bmFtZX06YFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb21tZW50SW5wdXQgPSAnJ1xuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgYmluZENvbW1lbnRJbnB1dCAodmFsdWUpIHtcbiAgICAgIHRoaXMuY29tbWVudElucHV0ID0gdmFsdWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGNvbW1lbnRTdXJlICgpIHtcbiAgICAgIHRoaXMuY29tbWVudEZsYWcgPSBmYWxzZVxuICAgICAgYWRkQ29tbWVudCh7XG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgICAgbW9tZW50X2lkOiB0aGlzLmN1cnJlbnRSZXBseUlkLFxuICAgICAgICBjb250ZW50OiB0aGlzLmN1cnJlbnRSZXBseUlkID4gMCA/IHRoaXMuY29tbWVudElucHV0LnJlcGxhY2UoL15ALis6LywgJycpIDogdGhpcy5jb21tZW50SW5wdXQsXG4gICAgICAgIHJvb3RfaWQ6IHRoaXMuY3VycmVudFJlcGx5Um9vdElkLFxuICAgICAgICB0b19jb21tZW50X2lkOiB0aGlzLmN1cnJlbnRSZXBseVJvb3RJZFxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgIHRoaXMuY29tbWVudElucHV0ID0gJydcbiAgICAgICAgICB0aGlzLnJlc2V0RGF0YSgpXG4gICAgICAgICAgdGhpcy5nZXRab25lTGlzdCgpXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAganVtcFB1Ymxpc2godmFsdWUpIHtcbiAgICAgIGlmICghdGhpcy5jbGFzc0luZm8pIHtcbiAgICAgICAgc2hvd01zZygn6K+36YCJ57uR5a6a54+t57qnJywgMzAwMClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBsZXQgdXJsID0gdmFsdWUgPT09ICdhY2NvdW50JyA/ICdyZWNvcmRDYXNoZmxvdycgOiBgcHVibGlzaD90eXBlPSR7dmFsdWV9YFxuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogdXJsXG4gICAgICB9KVxuICAgIH0sXG4gICAgY29tbWVudENhbmNlbCAoKSB7XG4gICAgICB0aGlzLmNvbW1lbnRGbGFnID0gZmFsc2VcbiAgICAgIHRoaXMuY29tbWVudElucHV0ID0gJydcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGp1bXBQYWdlIChwYWdlTmFtZSwgdHlwZSkge1xuICAgICAgdGhpcy5wdWJsaXNoRmxhZyA9IGZhbHNlXG4gICAgICB0aGlzLnNldEZsYWcgPSBmYWxzZVxuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogYCR7cGFnZU5hbWV9P3R5cGU9JHt0eXBlfWBcbiAgICAgIH0pXG4gICAgfSxcbiAgICB0b2dnbGVNZW51ICh0eXBlKSB7XG4gICAgICBpZiAoIXRoaXMuY2xhc3NJbmZvKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+mAiee7keWumuePree6pycsIDMwMDApXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdGhpc1t0eXBlXSA9ICF0aGlzW3R5cGVdXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBjbG9zZVRvZ2dsZSAoKSB7XG4gICAgICB0aGlzLnNldEZsYWcgPSBmYWxzZVxuICAgICAgdGhpcy5wdWJsaXNoRmxhZyA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBwcmV2aWV3KGltZywgaW1nTGlzdCkge1xuICAgICAgcHJldmlld0ltYWdlKGltZywgaW1nTGlzdClcbiAgICB9LFxuICAgIHNlbGVjdENhbmNlbCgpIHtcbiAgICAgIHRoaXMuc2VsZWN0RmxhZyA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBzZWxlY3RTdXJlKHZhbHVlKSB7XG4gICAgICBpZiAoIXZhbHVlLmxlbmd0aCkge1xuICAgICAgICBzaG93TXNnKCfor7fpgInmi6knKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGNvbnN0IHZhbCA9IHZhbHVlXG4gICAgICB0aGlzLnN0dWRlbnRJZHMgPSBbLi4udmFsXVxuICAgICAgdGhpcy5zZWxlY3RGbGFnID0gZmFsc2VcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIHRoaXMuYWRkVG9PcmRlcih0aGlzLmN1cnJlbnRDb2xsZWN0aW9uSWQpXG4gICAgfVxuICB9XG4gIG9uU2hhcmVBcHBNZXNzYWdlKHJlcykge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogdGhpcy5zaGFyZVRpdGxlXG4gICAgfVxuICB9XG59XG4iXX0=