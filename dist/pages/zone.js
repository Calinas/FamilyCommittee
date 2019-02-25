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
      loadMoreCommentArray: []
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
  }]);

  return Zone;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Zone , 'pages/zone'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInpvbmUuanMiXSwibmFtZXMiOlsiWm9uZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJDdXJyZW50TW9kYWwiLCJTZWxlY3RNb2RhbCIsImRhdGEiLCJtZW51TGlzdCIsInRleHQiLCJ0eXBlIiwic3JjIiwiY29tbWVudEZsYWciLCJzZWxlY3RGbGFnIiwiYWN0aXZlVHlwZSIsInNldEZsYWciLCJwdWJsaXNoRmxhZyIsImNpcmNsZXMiLCJjb2xsZWN0aW9uIiwibm90aWZ5IiwiYWN0aXZpdHkiLCJhY2NvdW50IiwicG4iLCJwcyIsImxpc3QiLCJwYXlNZW1iZXJMaXN0IiwiY2xhc3NJbmZvIiwibWVtYmVySW5mbyIsInNjaG9vbEluZm8iLCJsb2FkaW5nIiwibG9hZEZpbmlzaGVkIiwiY29tbWVudElucHV0IiwiY3VycmVudFJlcGx5SWQiLCJjdXJyZW50UmVwbHlSb290SWQiLCJjdXJyZW50UmVwbHlUb0NvbW1lbnRJZCIsImN1cnJlcm50Sm9pbkFjaXRpdnl0SWQiLCJjdXJyZXJudFN1YkFjdGl2aXR5SWQiLCJjdXJyZW50Q29sbGVjdGlvbklkIiwiYXV0aCIsInByZXNpZGVudCIsImZpbmFuY2UiLCJwaG90b3MiLCJjb21tZW50UG4iLCJjb21tZW50UHMiLCJjb21tZW50T2Zmc2V0IiwiY29tbWVudExvYWRGaW5pc2hlZCIsIm1lbWJlckxpc3QiLCJzdHVkZW50SWRzIiwiZmlyc3RJbml0IiwicGF5bWVudExvY2tlZCIsImxvYWRNb3JlQ29tbWVudEFycmF5Iiwid2F0Y2giLCJuZXdWYWwiLCJvbGRWYWwiLCJyZXNldERhdGEiLCJnZXRBdXRoTGlzdCIsImdldFpvbmVMaXN0IiwiY3VycmVudEpvaW5BY3Rpdml0eUlkIiwiJGFwcGx5IiwibWV0aG9kcyIsInBheSIsIm1vbWVudElkIiwiY29sbGVjdGlvbklkIiwiY2xhc3NfaWQiLCJpZCIsIm1vbWVudF9pZCIsImlzX3BheSIsInRoZW4iLCJyZXMiLCJsZW5ndGgiLCJwdXNoIiwiYWRkVG9PcmRlciIsInN1Ym1pdEpvaW5BY3Rpdml0eSIsImFjdGl2aXR5X2l0ZW1faWQiLCJhY3Rpdml0eV9pZCIsInN1Y2Nlc3MiLCJqb2luQWN0aXZpdHkiLCJzdWJJZCIsImxpc3RJbmRleCIsImFjdGl2aXR5SW5kZXgiLCJpbmRleCIsImluZGV4T2YiLCJzcGxpY2UiLCJpbmZvIiwiaXRlbSIsImNoZWNrZWQiLCJsb2FkTW9yZUNvbW1lbnQiLCJpZHgiLCJyZXRPYmoiLCJmaW5kTG9hZG1vcmVDb21tZW50SW5mbyIsIm9mZnNldCIsInJlc3VsdExpc3QiLCJjb21tZW50X2xpc3QiLCJvYmoiLCJhZGRDb21tZW50Iiwicm9vdElkIiwidG9Db21tZW50SWQiLCJuYW1lIiwibWVtYmVyX2lkIiwidW5kZWZpbmVkIiwiYmluZENvbW1lbnRJbnB1dCIsInZhbHVlIiwiY29tbWVudFN1cmUiLCJjb250ZW50IiwicmVwbGFjZSIsInJvb3RfaWQiLCJ0b19jb21tZW50X2lkIiwianVtcFB1Ymxpc2giLCJ1cmwiLCJ3eCIsIm5hdmlnYXRlVG8iLCJjb21tZW50Q2FuY2VsIiwianVtcFBhZ2UiLCJwYWdlTmFtZSIsInRvZ2dsZU1lbnUiLCJjbG9zZVRvZ2dsZSIsInByZXZpZXciLCJpbWciLCJpbWdMaXN0Iiwic2VsZWN0Q2FuY2VsIiwic2VsZWN0U3VyZSIsInZhbCIsImdldFN0b3JhZ2VTeW5jIiwiY2hlY2tEYXRhRXhpc3QiLCJyZUxhdW5jaCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwidXNlckRhdGEiLCJjaGVja0F1dGgiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsImkiLCJsZW4iLCJjb2RlIiwiaXNBdXRoIiwiaXNfYXV0aCIsImZvcm1hdEFsbEF1dGgiLCJmb3JtYXRTaW5nbGVBdXRoIiwic2VlX3R5cGUiLCJjb21tZW50X2NvdW50Iiwib3JkZXJfaWQiLCJfdGhpcyIsInBheW1lbnRfcGFyYW1zIiwicmVxdWVzdFBheW1lbnQiLCJ0aW1lU3RhbXAiLCJTdHJpbmciLCJub25jZVN0ciIsInBhY2thZ2UiLCJwYXlTaWduIiwic2lnblR5cGUiLCJmYWlsIiwic3R1ZGVudF9pZHMiLCJjb2xsZWN0aW9uX2l0ZW1faWQiLCJwYXltZW50UGFyYW1zIiwiYXJyIiwiY3VycmVudElkIiwiYXNzaWduIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLEk7Ozs7Ozs7Ozs7Ozs7O3FMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixJQURqQjtBQUVQQyw2QkFBdUI7QUFGaEIsSyxTQUlWQyxPLEdBQVUsRSxTQUNYQyxNLEdBQVMsRUFBQyxnQkFBZSxFQUFDLGVBQWMsSUFBZixFQUFvQixpQkFBZ0IsSUFBcEMsRUFBeUMsbUJBQWtCLFNBQTNELEVBQXFFLGdCQUFlLEVBQXBGLEVBQXVGLG9CQUFtQixhQUExRyxFQUF3SCw0QkFBMkIsY0FBbkosRUFBa0ssY0FBYSxFQUEvSyxFQUFoQixFQUFtTSxlQUFjLEVBQUMsb0JBQW1CLFlBQXBCLEVBQWlDLG9CQUFtQixlQUFwRCxFQUFqTixFLFNBQ1RDLE8sR0FBVSxFQUFDLGdCQUFlLEVBQUMsZUFBYyxlQUFmLEVBQStCLGFBQVksYUFBM0MsRUFBeUQsY0FBYSxrQkFBdEUsRUFBaEIsRUFBMEcsZUFBYyxFQUFDLGVBQWMsY0FBZixFQUE4QixhQUFZLFlBQTFDLEVBQXhILEUsU0FDVEMsVSxHQUFhO0FBQ1ZDLDBDQURVO0FBRVZDO0FBRlUsSyxTQUlaQyxJLEdBQU87QUFDTEMsZ0JBQVUsQ0FDUjtBQUNFQyxjQUFNLEtBRFI7QUFFRUMsY0FBTSxNQUZSO0FBR0VDLGFBQUs7QUFIUCxPQURRLEVBTVI7QUFDRUYsY0FBTSxJQURSO0FBRUVDLGNBQU0sT0FGUjtBQUdFQyxhQUFLO0FBSFAsT0FOUSxF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SUFBSTdELElBQUosQ0FBU0EsSUFBVCxDQUFjeUQsRUFBakM7QUFDRCxPQU5EO0FBT0Q7Ozs0Q0FDdUI0RixHLEVBQUtDLFMsRUFBVztBQUN0QyxVQUFJckUsU0FBUyxFQUFiO0FBQ0EsV0FBSSxJQUFJNkMsSUFBSSxDQUFSLEVBQVVDLE1BQU1zQixJQUFJdkYsTUFBeEIsRUFBZ0NnRSxJQUFJQyxHQUFwQyxFQUF5Q0QsR0FBekMsRUFBOEM7QUFDNUMsWUFBR3VCLElBQUl2QixDQUFKLEVBQU9wRSxTQUFQLEtBQXFCNEYsU0FBeEIsRUFBbUM7QUFDakNyRSxtQkFBU3lDLE9BQU82QixNQUFQLENBQWMsRUFBZCxFQUFpQkYsSUFBSXZCLENBQUosQ0FBakIsRUFBd0I7QUFDL0JyRCxtQkFBT3FEO0FBRHdCLFdBQXhCLENBQVQ7QUFHRDtBQUNGO0FBQ0QsYUFBTzdDLE1BQVA7QUFDRDs7OztFQS9PK0J1RSxlQUFLQyxJOztrQkFBbEJuSyxJIiwiZmlsZSI6InpvbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IFNlbGVjdE1vZGFsIGZyb20gJy4uL2NvbXBvbmVudHMvc2VsZWN0TW9kYWwnXHJcbmltcG9ydCBDdXJyZW50TW9kYWwgZnJvbSAnLi4vY29tcG9uZW50cy9jb21tZW50TW9kYWwnXHJcbmltcG9ydCB7IHNob3dNc2csIHByZXZpZXdJbWFnZSB9IGZyb20gJy4uL3V0aWxzL2NvbW1vbidcclxuaW1wb3J0IHsgZ2V0Q2lyY2xlTGlzdCwgYWRkQ29tbWVudCwgam9pbkFjdGl2aXR5LCBnZXRDb21tZW50TGlzdCB9IGZyb20gJy4uL2FwaS96b25lJ1xyXG5pbXBvcnQgeyBhZGRPcmRlciwgZ2V0UGF5bWVudFBhcmFtcyB9IGZyb20gJy4uL2FwaS9maW5hbmNlJ1xyXG5pbXBvcnQgeyBnZXRBdXRoIH0gZnJvbSAnLi4vYXBpL2F1dGhvcml6ZSdcclxuaW1wb3J0IHsgY2hlY2tTdHVkZW50IH0gZnJvbSAnLi4vYXBpL3VzZXInXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFpvbmUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflj5HnjrAnLFxyXG4gICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiB0cnVlXHJcbiAgfVxyXG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJDdXJyZW50TW9kYWxcIjp7XCJzdXJlQnRuVGV4dFwiOlwi56Gu6K6kXCIsXCJjYW5jZWxCdG5UZXh0XCI6XCLlj5bmtohcIixcInBsYWNlaG9sZGVyVGV4dFwiOlwi6K+36L6T5YWl6K+E6K665YaF5a65XCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmZsYWcuc3luY1wiOlwiY29tbWVudEZsYWdcIixcInYtYmluZDpjb21tZW50SW5wdXQuc3luY1wiOlwiY29tbWVudElucHV0XCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJTZWxlY3RNb2RhbFwiOntcInYtYmluZDpmbGFnLnN5bmNcIjpcInNlbGVjdEZsYWdcIixcInYtYmluZDpsaXN0LnN5bmNcIjpcInBheU1lbWJlckxpc3RcIn19O1xyXG4kZXZlbnRzID0ge1wiQ3VycmVudE1vZGFsXCI6e1widi1vbjpjYW5jZWxcIjpcImNvbW1lbnRDYW5jZWxcIixcInYtb246c3VyZVwiOlwiY29tbWVudFN1cmVcIixcInYtb246aW5wdXRcIjpcImJpbmRDb21tZW50SW5wdXRcIn0sXCJTZWxlY3RNb2RhbFwiOntcInYtb246Y2FuY2VsXCI6XCJzZWxlY3RDYW5jZWxcIixcInYtb246c3VyZVwiOlwic2VsZWN0U3VyZVwifX07XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgQ3VycmVudE1vZGFsLFxyXG4gICAgU2VsZWN0TW9kYWxcclxuICB9XHJcbiAgZGF0YSA9IHtcclxuICAgIG1lbnVMaXN0OiBbXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiAn5a626ZW/5ZyIJyxcclxuICAgICAgICB0eXBlOiAnem9uZScsXHJcbiAgICAgICAgc3JjOiAnL2ltYWdlcy9pY29uLzIuanBnJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogJ+aUtui0uScsXHJcbiAgICAgICAgdHlwZTogJ21vbmV5JyxcclxuICAgICAgICBzcmM6ICcvaW1hZ2VzL2ljb24vbW9uZXkuanBnJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogJ+mAmuefpScsXHJcbiAgICAgICAgdHlwZTogJ25vdGljZScsXHJcbiAgICAgICAgc3JjOiAnL2ltYWdlcy9pY29uLzQuanBnJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogJ+a0u+WKqCcsXHJcbiAgICAgICAgdHlwZTogJ2FjdGl2aXR5JyxcclxuICAgICAgICBzcmM6ICcvaW1hZ2VzL2ljb24vNS5qcGcnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiAn6K6w6LSmJyxcclxuICAgICAgICB0eXBlOiAnYWNjb3VudCcsXHJcbiAgICAgICAgc3JjOiAnL2ltYWdlcy9pY29uL3Bob3Rvcy5qcGcnXHJcbiAgICAgIH1cclxuICAgIF0sXHJcbiAgICBjb21tZW50RmxhZzogZmFsc2UsXHJcbiAgICBzZWxlY3RGbGFnOiBmYWxzZSxcclxuICAgIGFjdGl2ZVR5cGU6ICdhbGwnLFxyXG4gICAgc2V0RmxhZzogZmFsc2UsXHJcbiAgICBwdWJsaXNoRmxhZzogZmFsc2UsXHJcbiAgICB0eXBlOiB7XHJcbiAgICAgIGNpcmNsZXM6ICflrrbplb/lnIgnLFxyXG4gICAgICBjb2xsZWN0aW9uOiAn5pS25qy+JyxcclxuICAgICAgbm90aWZ5OiAn6YCa55+lJyxcclxuICAgICAgYWN0aXZpdHk6ICfmtLvliqgnLFxyXG4gICAgICBhY2NvdW50OiAn6K6w6LSmJ1xyXG4gICAgfSxcclxuICAgIHBuOiAxLFxyXG4gICAgcHM6IDEwLFxyXG4gICAgbGlzdDogW10sXHJcbiAgICBwYXlNZW1iZXJMaXN0OiBbXSxcclxuICAgIGNsYXNzSW5mbzogbnVsbCxcclxuICAgIG1lbWJlckluZm86IG51bGwsXHJcbiAgICBzY2hvb2xJbmZvOiBudWxsLFxyXG4gICAgbG9hZGluZzogZmFsc2UsXHJcbiAgICBsb2FkRmluaXNoZWQ6IGZhbHNlLFxyXG4gICAgY29tbWVudElucHV0OiAnJyxcclxuICAgIGN1cnJlbnRSZXBseUlkOiAtMSxcclxuICAgIGN1cnJlbnRSZXBseVJvb3RJZDogLTEsXHJcbiAgICBjdXJyZW50UmVwbHlUb0NvbW1lbnRJZDogLTEsXHJcbiAgICBjdXJyZXJudEpvaW5BY2l0aXZ5dElkOiAtMSxcclxuICAgIGN1cnJlcm50U3ViQWN0aXZpdHlJZDogW10sXHJcbiAgICBjdXJyZW50Q29sbGVjdGlvbklkOiAtMSxcclxuICAgIGF1dGg6IHtcclxuICAgICAgcHJlc2lkZW50OiBmYWxzZSxcclxuICAgICAgZmluYW5jZTogZmFsc2UsXHJcbiAgICAgIGFjdGl2aXR5OiBmYWxzZSxcclxuICAgICAgbm90aWZ5OiBmYWxzZSxcclxuICAgICAgcGhvdG9zOiBmYWxzZSxcclxuICAgICAgY2lyY2xlczogZmFsc2VcclxuICAgIH0sXHJcbiAgICBjb21tZW50UG46IDIsXHJcbiAgICBjb21tZW50UHM6IDYsXHJcbiAgICBjb21tZW50T2Zmc2V0OiA2LFxyXG4gICAgY29tbWVudExvYWRGaW5pc2hlZDogZmFsc2UsXHJcbiAgICBtZW1iZXJMaXN0OiBbXSxcclxuICAgIHN0dWRlbnRJZHM6IFtdLFxyXG4gICAgZmlyc3RJbml0OiB0cnVlLFxyXG4gICAgcGF5bWVudExvY2tlZDogZmFsc2UsXHJcbiAgICBsb2FkTW9yZUNvbW1lbnRBcnJheTogW11cclxuICB9XHJcbiAgd2F0Y2ggPSB7XHJcbiAgICBjbGFzc0luZm8obmV3VmFsLCBvbGRWYWwpIHtcclxuICAgICAgLy8g5YiH5o2i5LqG54+t57qn5LmL5ZCO5pWw5o2u6KaB5pu05pawXHJcbiAgICAgIGlmIChvbGRWYWwgIT09IG51bGwpIHtcclxuICAgICAgICB0aGlzLnJlc2V0RGF0YSgpXHJcbiAgICAgICAgdGhpcy5nZXRBdXRoTGlzdCgpXHJcbiAgICAgICAgdGhpcy5nZXRab25lTGlzdCgpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjdXJyZW50Sm9pbkFjdGl2aXR5SWQobmV3VmFsLCBvbGRWYWwpIHtcclxuICAgICAgaWYgKG5ld1ZhbCA+IDApIHtcclxuICAgICAgICB0aGlzLmN1cnJlcm50U3ViQWN0aXZpdHlJZCA9IFtdXHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJlc2V0RGF0YSgpIHtcclxuICAgIHRoaXMubG9hZE1vcmVDb21tZW50QXJyYXkgPSBbXVxyXG4gICAgdGhpcy5jb21tZW50TG9hZEZpbmlzaGVkID0gZmFsc2VcclxuICAgIHRoaXMuY29tbWVudFBuID0gMlxyXG4gICAgdGhpcy5jb21tZW50UHMgPSA2XHJcbiAgICB0aGlzLnN0dWRlbnRJZHMgPSBbXVxyXG4gICAgdGhpcy5wYXltZW50TG9ja2VkID0gZmFsc2VcclxuICAgIHRoaXMucG4gPSAxXHJcbiAgICB0aGlzLmxpc3QgPSBbXVxyXG4gICAgdGhpcy4kYXBwbHkoKVxyXG4gIH1cclxuICBvblB1bGxEb3duUmVmcmVzaCgpIHtcclxuICAgIHRoaXMucmVzZXREYXRhKClcclxuICAgIHRoaXMuZ2V0Wm9uZUxpc3QoKVxyXG4gIH1cclxuICBvblJlYWNoQm90dG9tKCkge1xyXG4gICAgaWYgKHRoaXMubG9hZGluZyB8fCB0aGlzLmxvYWRGaW5pc2hlZCkgcmV0dXJuXHJcbiAgICB0aGlzLmdldFpvbmVMaXN0KClcclxuICB9XHJcbiAgb25TaG93KCkge1xyXG4gICAgdGhpcy5jdXJyZXJudEpvaW5BY2l0aXZ5dElkID0gLTFcclxuICAgIHRoaXMuY3VycmVybnRTdWJBY3Rpdml0eUlkID0gW11cclxuICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXHJcbiAgICB0aGlzLiRhcHBseSgpXHJcbiAgfVxyXG4gIG9uTG9hZCgpIHtcclxuICAgIGlmICghdGhpcy5jaGVja0RhdGFFeGlzdCgnbWVtYmVySW5mbycpKSB7XHJcbiAgICAgIHd4LnJlTGF1bmNoKHtcclxuICAgICAgICB1cmw6ICdsb2dpbidcclxuICAgICAgfSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXHJcbiAgICAgIHRoaXMuY2xhc3NJbmZvICYmIHRoaXMuZ2V0QXV0aExpc3QoKVxyXG4gICAgICB0aGlzLm1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXHJcbiAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJEYXRhID0gdGhpcy5tZW1iZXJJbmZvXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgdGhpcy5nZXRab25lTGlzdCgpXHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldEF1dGhMaXN0KCkge1xyXG4gICAgZ2V0QXV0aCh7XHJcbiAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZFxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICB0aGlzLmNoZWNrQXV0aChyZXMuZGF0YS5kYXRhKVxyXG4gICAgfSlcclxuICB9XHJcbiAgZm9ybWF0QWxsQXV0aChvYmopIHtcclxuICAgIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICBvYmpba2V5XSA9IHRydWVcclxuICAgIH0pXHJcbiAgICB0aGlzLiRhcHBseSgpXHJcbiAgfVxyXG4gIGZvcm1hdFNpbmdsZUF1dGgobmFtZSkge1xyXG4gICAgdGhpcy5hdXRoW25hbWVdID0gdHJ1ZVxyXG4gICAgdGhpcy4kYXBwbHkoKVxyXG4gIH1cclxuICBjaGVja0F1dGgobGlzdCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGxpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgbGV0IHtjb2RlLCBpc19hdXRoOiBpc0F1dGh9ID0gbGlzdFtpXVxyXG4gICAgICBpZiAoY29kZSA9PT0gJ3ByZXNpZGVudCcgJiYgaXNBdXRoKSB7XHJcbiAgICAgICAgdGhpcy5mb3JtYXRBbGxBdXRoKHRoaXMuYXV0aClcclxuICAgICAgICBicmVha1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlzQXV0aCAmJiB0aGlzLmZvcm1hdFNpbmdsZUF1dGgoY29kZSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBjaGVja0RhdGFFeGlzdChrZXkpIHtcclxuICAgIGlmICh3eC5nZXRTdG9yYWdlU3luYyhrZXkpKSB7XHJcbiAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2VcclxuICB9XHJcbiAgZ2V0Wm9uZUxpc3QoKSB7XHJcbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlXHJcbiAgICB0aGlzLiRhcHBseSgpXHJcbiAgICBjb25zdCBpZCA9IHRoaXMuY2xhc3NJbmZvLmlkXHJcbiAgICBnZXRDaXJjbGVMaXN0KHtcclxuICAgICAgY2xhc3NfaWQ6IGlkLFxyXG4gICAgICBzZWVfdHlwZTogaWQgPyAnJyA6ICdhbGwnLFxyXG4gICAgICB0eXBlOiB0aGlzLmFjdGl2ZVR5cGUsXHJcbiAgICAgIHBuOiB0aGlzLnBuLFxyXG4gICAgICBwczogdGhpcy5wcyxcclxuICAgICAgY29tbWVudF9jb3VudDogM1xyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICBsZXQgeyBsaXN0IH0gPSByZXMuZGF0YVxyXG4gICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZVxyXG4gICAgICB0aGlzLnBuKytcclxuICAgICAgaWYgKGxpc3QubGVuZ3RoIDwgdGhpcy5wcykge1xyXG4gICAgICAgIHRoaXMubG9hZEZpbmlzaGVkID0gdHJ1ZVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubGlzdCA9IFsuLi50aGlzLmxpc3QsIC4uLmxpc3RdXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0pXHJcbiAgfVxyXG4gIHBheW1lbnRQYXJhbXMoaWQpIHtcclxuICAgIGdldFBheW1lbnRQYXJhbXMoe1xyXG4gICAgICBvcmRlcl9pZDogaWRcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgbGV0IF90aGlzID0gdGhpc1xyXG4gICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhLnBheW1lbnRfcGFyYW1zXHJcbiAgICAgIHd4LnJlcXVlc3RQYXltZW50KHtcclxuICAgICAgICB0aW1lU3RhbXA6IFN0cmluZyhkYXRhLnRpbWVTdGFtcCksXHJcbiAgICAgICAgbm9uY2VTdHI6IGRhdGEubm9uY2VTdHIsXHJcbiAgICAgICAgcGFja2FnZTogZGF0YS5wYWNrYWdlLFxyXG4gICAgICAgIHBheVNpZ246IGRhdGEucGF5U2lnbixcclxuICAgICAgICBzaWduVHlwZTogJ01ENScsXHJcbiAgICAgICAgc3VjY2VzcygpIHtcclxuICAgICAgICAgIF90aGlzLnBheW1lbnRMb2NrZWQgPSBmYWxzZVxyXG4gICAgICAgICAgX3RoaXMuJGFwcGx5KClcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZhaWwoKSB7XHJcbiAgICAgICAgICBfdGhpcy5wYXltZW50TG9ja2VkID0gZmFsc2VcclxuICAgICAgICAgIF90aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9XHJcbiAgYWRkVG9PcmRlcihpZCkge1xyXG4gICAgYWRkT3JkZXIoe1xyXG4gICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXHJcbiAgICAgIHN0dWRlbnRfaWRzOiB0aGlzLnN0dWRlbnRJZHMsXHJcbiAgICAgIGNvbGxlY3Rpb25faXRlbV9pZDogaWRcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgdGhpcy5wYXltZW50UGFyYW1zKHJlcy5kYXRhLmRhdGEuaWQpXHJcbiAgICB9KVxyXG4gIH1cclxuICBmaW5kTG9hZG1vcmVDb21tZW50SW5mbyhhcnIsIGN1cnJlbnRJZCkge1xyXG4gICAgbGV0IHJldE9iaiA9IHt9XHJcbiAgICBmb3IobGV0IGkgPSAwLGxlbiA9IGFyci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICBpZihhcnJbaV0ubW9tZW50X2lkID09PSBjdXJyZW50SWQpIHtcclxuICAgICAgICByZXRPYmogPSBPYmplY3QuYXNzaWduKHt9LGFycltpXSx7XHJcbiAgICAgICAgICBpbmRleDogaVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXRPYmpcclxuICB9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIHBheShtb21lbnRJZCwgY29sbGVjdGlvbklkKSB7XHJcbiAgICAgIGlmICh0aGlzLnBheW1lbnRMb2NrZWQpIHtcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICB0aGlzLnBheW1lbnRMb2NrZWQgPSB0cnVlXHJcbiAgICAgIGNoZWNrU3R1ZGVudCh7XHJcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxyXG4gICAgICAgIG1vbWVudF9pZDogbW9tZW50SWQsXHJcbiAgICAgICAgaXNfcGF5OiAwXHJcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICB0aGlzLnBheU1lbWJlckxpc3QgPSByZXMuZGF0YS5saXN0XHJcbiAgICAgICAgaWYgKCF0aGlzLnBheU1lbWJlckxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICB0aGlzLnBheW1lbnRMb2NrZWQgPSBmYWxzZVxyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgc2hvd01zZygn6K+35Yu/6YeN5aSN57y06LS5JylcclxuICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5wYXlNZW1iZXJMaXN0Lmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgIHRoaXMuc2VsZWN0RmxhZyA9IHRydWVcclxuICAgICAgICAgIHRoaXMuY3VycmVudENvbGxlY3Rpb25JZCA9IGNvbGxlY3Rpb25JZFxyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnN0dWRlbnRJZHMgPSBbXVxyXG4gICAgICAgICAgdGhpcy5zdHVkZW50SWRzLnB1c2godGhpcy5wYXlNZW1iZXJMaXN0WzBdLmlkKVxyXG4gICAgICAgICAgdGhpcy5hZGRUb09yZGVyKGNvbGxlY3Rpb25JZClcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgc3VibWl0Sm9pbkFjdGl2aXR5KCkge1xyXG4gICAgICBqb2luQWN0aXZpdHkoe1xyXG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcclxuICAgICAgICBhY3Rpdml0eV9pdGVtX2lkOiB0aGlzLmN1cnJlcm50U3ViQWN0aXZpdHlJZCxcclxuICAgICAgICBhY3Rpdml0eV9pZDogdGhpcy5jdXJyZXJudEpvaW5BY2l0aXZ5dElkXHJcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgc2hvd01zZygn5o+Q5Lqk5oiQ5YqfJylcclxuICAgICAgICAgIHRoaXMuY3VycmVybnRTdWJBY3Rpdml0eUlkID0gW11cclxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgam9pbkFjdGl2aXR5KGlkLCBzdWJJZCwgbGlzdEluZGV4LCBhY3Rpdml0eUluZGV4KSB7XHJcbiAgICAgIGlmICghdGhpcy5jbGFzc0luZm8pIHtcclxuICAgICAgICBzaG93TXNnKCfor7flhYjpgInmi6nnj63nuqcnKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY3VycmVybnRKb2luQWNpdGl2eXRJZCA9IGlkXHJcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jdXJyZXJudFN1YkFjdGl2aXR5SWQuaW5kZXhPZihzdWJJZClcclxuICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICB0aGlzLmN1cnJlcm50U3ViQWN0aXZpdHlJZC5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICAgICAgdGhpcy5saXN0W2xpc3RJbmRleF0uaW5mby5pdGVtW2FjdGl2aXR5SW5kZXhdLmNoZWNrZWQgPSBmYWxzZVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuY3VycmVybnRTdWJBY3Rpdml0eUlkLnB1c2goc3ViSWQpXHJcbiAgICAgICAgdGhpcy5saXN0W2xpc3RJbmRleF0uaW5mby5pdGVtW2FjdGl2aXR5SW5kZXhdLmNoZWNrZWQgPSB0cnVlXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSxcclxuICAgIGxvYWRNb3JlQ29tbWVudChtb21lbnRJZCwgaWR4KSB7XHJcbiAgICAgIGNvbnN0IHJldE9iaiA9IHRoaXMuZmluZExvYWRtb3JlQ29tbWVudEluZm8odGhpcy5sb2FkTW9yZUNvbW1lbnRBcnJheSwgbW9tZW50SWQpO1xyXG4gICAgICBnZXRDb21tZW50TGlzdCh7XHJcbiAgICAgICAgbW9tZW50X2lkOiBtb21lbnRJZCxcclxuICAgICAgICBwczogdGhpcy5jb21tZW50UHMsXHJcbiAgICAgICAgcG46IHJldE9iai5jb21tZW50UG4gPyByZXRPYmouY29tbWVudFBuIDogdGhpcy5jb21tZW50UG4sXHJcbiAgICAgICAgb2Zmc2V0OiB0aGlzLmNvbW1lbnRPZmZzZXRcclxuICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICBsZXQgcmVzdWx0TGlzdCA9IHJlcy5kYXRhLmxpc3RcclxuICAgICAgICAgIGxldCB7bGlzdH0gPSB0aGlzLmxpc3RbaWR4XS5jb21tZW50X2xpc3RcclxuICAgICAgICAgIGxpc3QgPSBbLi4ubGlzdCwgLi4ucmVzdWx0TGlzdF1cclxuICAgICAgICAgIHRoaXMubGlzdFtpZHhdLmNvbW1lbnRfbGlzdC5saXN0ID0gbGlzdFxyXG4gICAgICAgICAgaWYgKHJlc3VsdExpc3QubGVuZ3RoIDwgdGhpcy5jb21tZW50UHMpIHtcclxuICAgICAgICAgICAgdGhpcy5saXN0W2lkeF0uY29tbWVudExvYWRGaW5pc2hlZCA9IHRydWVcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICghcmV0T2JqLmNvbW1lbnRQbikge1xyXG4gICAgICAgICAgICBjb25zdCBvYmogPSB7XHJcbiAgICAgICAgICAgICAgY29tbWVudFBuOiB0aGlzLmNvbW1lbnRQbiArIDEsXHJcbiAgICAgICAgICAgICAgbW9tZW50X2lkOiBtb21lbnRJZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubG9hZE1vcmVDb21tZW50QXJyYXkucHVzaChvYmopXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRNb3JlQ29tbWVudEFycmF5W3JldE9iai5pbmRleF0uY29tbWVudFBuID0gcmV0T2JqLmNvbW1lbnRQbiArIDE7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIGFkZENvbW1lbnQodHlwZSwgaWQsIHJvb3RJZCwgdG9Db21tZW50SWQsIG5hbWUpIHtcclxuICAgICAgaWYgKHRvQ29tbWVudElkID09PSB0aGlzLm1lbWJlckluZm8ubWVtYmVyX2lkKSB7XHJcbiAgICAgICAgc2hvd01zZygn6K+35LiN6KaB5Zue5aSN6Ieq5bexJylcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICBpZiAoIXRoaXMuY2xhc3NJbmZvKSB7XHJcbiAgICAgICAgc2hvd01zZygn6K+35YWI6YCJ5oup54+t57qnJylcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICB0aGlzLmNvbW1lbnRGbGFnID0gdHJ1ZVxyXG4gICAgICB0aGlzLmN1cnJlbnRSZXBseUlkID0gaWRcclxuICAgICAgdGhpcy5jdXJyZW50UmVwbHlSb290SWQgPSB0eXBlID09PSAnYWRkJyA/IDAgOiByb290SWRcclxuICAgICAgaWYgKG5hbWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuY29tbWVudElucHV0ID0gYEAke25hbWV9OmBcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmNvbW1lbnRJbnB1dCA9ICcnXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSxcclxuICAgIGJpbmRDb21tZW50SW5wdXQgKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuY29tbWVudElucHV0ID0gdmFsdWVcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSxcclxuICAgIGNvbW1lbnRTdXJlICgpIHtcclxuICAgICAgdGhpcy5jb21tZW50RmxhZyA9IGZhbHNlXHJcbiAgICAgIGFkZENvbW1lbnQoe1xyXG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcclxuICAgICAgICBtb21lbnRfaWQ6IHRoaXMuY3VycmVudFJlcGx5SWQsXHJcbiAgICAgICAgY29udGVudDogdGhpcy5jdXJyZW50UmVwbHlJZCA+IDAgPyB0aGlzLmNvbW1lbnRJbnB1dC5yZXBsYWNlKC9eQC4rOi8sICcnKSA6IHRoaXMuY29tbWVudElucHV0LFxyXG4gICAgICAgIHJvb3RfaWQ6IHRoaXMuY3VycmVudFJlcGx5Um9vdElkLFxyXG4gICAgICAgIHRvX2NvbW1lbnRfaWQ6IHRoaXMuY3VycmVudFJlcGx5Um9vdElkXHJcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgdGhpcy5jb21tZW50SW5wdXQgPSAnJ1xyXG4gICAgICAgICAgdGhpcy5yZXNldERhdGEoKVxyXG4gICAgICAgICAgdGhpcy5nZXRab25lTGlzdCgpXHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIGp1bXBQdWJsaXNoKHZhbHVlKSB7XHJcbiAgICAgIGxldCB1cmwgPSB2YWx1ZSA9PT0gJ2FjY291bnQnID8gJ3JlY29yZENhc2hmbG93JyA6IGBwdWJsaXNoP3R5cGU9JHt2YWx1ZX1gXHJcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgIHVybDogdXJsXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgY29tbWVudENhbmNlbCAoKSB7XHJcbiAgICAgIHRoaXMuY29tbWVudEZsYWcgPSBmYWxzZVxyXG4gICAgICB0aGlzLmNvbW1lbnRJbnB1dCA9ICcnXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0sXHJcbiAgICBqdW1wUGFnZSAocGFnZU5hbWUsIHR5cGUpIHtcclxuICAgICAgdGhpcy5wdWJsaXNoRmxhZyA9IGZhbHNlXHJcbiAgICAgIHRoaXMuc2V0RmxhZyA9IGZhbHNlXHJcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgIHVybDogYCR7cGFnZU5hbWV9P3R5cGU9JHt0eXBlfWBcclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICB0b2dnbGVNZW51ICh0eXBlKSB7XHJcbiAgICAgIGlmICghdGhpcy5jbGFzc0luZm8pIHtcclxuICAgICAgICBzaG93TXNnKCfor7fpgInnu5Hlrprnj63nuqcnLCAzMDAwKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICAgIHRoaXNbdHlwZV0gPSAhdGhpc1t0eXBlXVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9LFxyXG4gICAgY2xvc2VUb2dnbGUgKCkge1xyXG4gICAgICB0aGlzLnNldEZsYWcgPSBmYWxzZVxyXG4gICAgICB0aGlzLnB1Ymxpc2hGbGFnID0gZmFsc2VcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSxcclxuICAgIHByZXZpZXcoaW1nLCBpbWdMaXN0KSB7XHJcbiAgICAgIHByZXZpZXdJbWFnZShpbWcsIGltZ0xpc3QpXHJcbiAgICB9LFxyXG4gICAgc2VsZWN0Q2FuY2VsKCkge1xyXG4gICAgICB0aGlzLnNlbGVjdEZsYWcgPSBmYWxzZVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9LFxyXG4gICAgc2VsZWN0U3VyZSh2YWx1ZSkge1xyXG4gICAgICBpZiAoIXZhbHVlLmxlbmd0aCkge1xyXG4gICAgICAgIHNob3dNc2coJ+ivt+mAieaLqScpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgdmFsID0gdmFsdWVcclxuICAgICAgdGhpcy5zdHVkZW50SWRzID0gWy4uLnZhbF1cclxuICAgICAgdGhpcy5zZWxlY3RGbGFnID0gZmFsc2VcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICB0aGlzLmFkZFRvT3JkZXIodGhpcy5jdXJyZW50Q29sbGVjdGlvbklkKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=