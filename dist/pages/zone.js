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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInpvbmUuanMiXSwibmFtZXMiOlsiWm9uZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJDdXJyZW50TW9kYWwiLCJTZWxlY3RNb2RhbCIsImRhdGEiLCJtZW51TGlzdCIsInRleHQiLCJ0eXBlIiwic3JjIiwiY29tbWVudEZsYWciLCJzZWxlY3RGbGFnIiwiYWN0aXZlVHlwZSIsInNldEZsYWciLCJwdWJsaXNoRmxhZyIsImNpcmNsZXMiLCJjb2xsZWN0aW9uIiwibm90aWZ5IiwiYWN0aXZpdHkiLCJhY2NvdW50IiwicG4iLCJwcyIsImxpc3QiLCJwYXlNZW1iZXJMaXN0IiwiY2xhc3NJbmZvIiwibWVtYmVySW5mbyIsInNjaG9vbEluZm8iLCJsb2FkaW5nIiwibG9hZEZpbmlzaGVkIiwiY29tbWVudElucHV0IiwiY3VycmVudFJlcGx5SWQiLCJjdXJyZW50UmVwbHlSb290SWQiLCJjdXJyZW50UmVwbHlUb0NvbW1lbnRJZCIsImN1cnJlcm50Sm9pbkFjaXRpdnl0SWQiLCJjdXJyZXJudFN1YkFjdGl2aXR5SWQiLCJjdXJyZW50Q29sbGVjdGlvbklkIiwiYXV0aCIsInByZXNpZGVudCIsImZpbmFuY2UiLCJwaG90b3MiLCJjb21tZW50UG4iLCJjb21tZW50UHMiLCJjb21tZW50T2Zmc2V0IiwiY29tbWVudExvYWRGaW5pc2hlZCIsIm1lbWJlckxpc3QiLCJzdHVkZW50SWRzIiwiZmlyc3RJbml0IiwicGF5bWVudExvY2tlZCIsImxvYWRNb3JlQ29tbWVudEFycmF5Iiwid2F0Y2giLCJuZXdWYWwiLCJvbGRWYWwiLCJyZXNldERhdGEiLCJnZXRBdXRoTGlzdCIsImdldFpvbmVMaXN0IiwiY3VycmVudEpvaW5BY3Rpdml0eUlkIiwiJGFwcGx5IiwibWV0aG9kcyIsInBheSIsIm1vbWVudElkIiwiY29sbGVjdGlvbklkIiwiY2xhc3NfaWQiLCJpZCIsIm1vbWVudF9pZCIsImlzX3BheSIsInRoZW4iLCJyZXMiLCJsZW5ndGgiLCJwdXNoIiwiYWRkVG9PcmRlciIsInN1Ym1pdEpvaW5BY3Rpdml0eSIsImFjdGl2aXR5X2l0ZW1faWQiLCJhY3Rpdml0eV9pZCIsInN1Y2Nlc3MiLCJqb2luQWN0aXZpdHkiLCJzdWJJZCIsImxpc3RJbmRleCIsImFjdGl2aXR5SW5kZXgiLCJpbmRleCIsImluZGV4T2YiLCJzcGxpY2UiLCJpbmZvIiwiaXRlbSIsImNoZWNrZWQiLCJsb2FkTW9yZUNvbW1lbnQiLCJpZHgiLCJyZXRPYmoiLCJmaW5kTG9hZG1vcmVDb21tZW50SW5mbyIsIm9mZnNldCIsInJlc3VsdExpc3QiLCJjb21tZW50X2xpc3QiLCJvYmoiLCJhZGRDb21tZW50Iiwicm9vdElkIiwidG9Db21tZW50SWQiLCJuYW1lIiwibWVtYmVyX2lkIiwidW5kZWZpbmVkIiwiYmluZENvbW1lbnRJbnB1dCIsInZhbHVlIiwiY29tbWVudFN1cmUiLCJjb250ZW50IiwicmVwbGFjZSIsInJvb3RfaWQiLCJ0b19jb21tZW50X2lkIiwianVtcFB1Ymxpc2giLCJ1cmwiLCJ3eCIsIm5hdmlnYXRlVG8iLCJjb21tZW50Q2FuY2VsIiwianVtcFBhZ2UiLCJwYWdlTmFtZSIsInRvZ2dsZU1lbnUiLCJjbG9zZVRvZ2dsZSIsInByZXZpZXciLCJpbWciLCJpbWdMaXN0Iiwic2VsZWN0Q2FuY2VsIiwic2VsZWN0U3VyZSIsInZhbCIsImdldFN0b3JhZ2VTeW5jIiwiY2hlY2tEYXRhRXhpc3QiLCJyZUxhdW5jaCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwidXNlckRhdGEiLCJjaGVja0F1dGgiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsImkiLCJsZW4iLCJjb2RlIiwiaXNBdXRoIiwiaXNfYXV0aCIsImZvcm1hdEFsbEF1dGgiLCJmb3JtYXRTaW5nbGVBdXRoIiwic2VlX3R5cGUiLCJjb21tZW50X2NvdW50Iiwib3JkZXJfaWQiLCJfdGhpcyIsInBheW1lbnRfcGFyYW1zIiwicmVxdWVzdFBheW1lbnQiLCJ0aW1lU3RhbXAiLCJTdHJpbmciLCJub25jZVN0ciIsInBhY2thZ2UiLCJwYXlTaWduIiwic2lnblR5cGUiLCJmYWlsIiwic3R1ZGVudF9pZHMiLCJjb2xsZWN0aW9uX2l0ZW1faWQiLCJwYXltZW50UGFyYW1zIiwiYXJyIiwiY3VycmVudElkIiwiYXNzaWduIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLEk7Ozs7Ozs7Ozs7Ozs7O3FMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixJQURqQjtBQUVQQyw2QkFBdUI7QUFGaEIsSyxTQUlWQyxPLEdBQVUsRSxTQUNYQyxNLEdBQVMsRUFBQyxnQkFBZSxFQUFDLGVBQWMsSUFBZixFQUFvQixpQkFBZ0IsSUFBcEMsRUFBeUMsbUJBQWtCLFNBQTNELEVBQXFFLGdCQUFlLEVBQXBGLEVBQXVGLG9CQUFtQixhQUExRyxFQUF3SCw0QkFBMkIsY0FBbkosRUFBa0ssY0FBYSxFQUEvSyxFQUFoQixFQUFtTSxlQUFjLEVBQUMsb0JBQW1CLFlBQXBCLEVBQWlDLG9CQUFtQixlQUFwRCxFQUFqTixFLFNBQ1RDLE8sR0FBVSxFQUFDLGdCQUFlLEVBQUMsZUFBYyxlQUFmLEVBQStCLGFBQVksYUFBM0MsRUFBeUQsY0FBYSxrQkFBdEUsRUFBaEIsRUFBMEcsZUFBYyxFQUFDLGVBQWMsY0FBZixFQUE4QixhQUFZLFlBQTFDLEVBQXhILEUsU0FDVEMsVSxHQUFhO0FBQ1ZDLDBDQURVO0FBRVZDO0FBRlUsSyxTQUlaQyxJLEdBQU87QUFDTEMsZ0JBQVUsQ0FDUjtBQUNFQyxjQUFNLEtBRFI7QUFFRUMsY0FBTSxNQUZSO0FBR0VDLGFBQUs7QUFIUCxPQURRLEVBTVI7QUFDRUYsY0FBTSxJQURSO0FBRUVDLGNBQU0sT0FGUjtBQUdFQyxhQUFLO0FBSFAsT0FOUSxFQVdSO0FBQ0VGLGNBQU0sSUFEUjtBQUVFQyxjQUFNLFFBRlI7QUFHRUMsYUFBSztBQUhQLE9BWFEsRUFnQlI7QUFDRUYsY0FBTSxJQURSO0FBRUVDLGNBQU0sVUFGUjtBQUdFQyxhQUFLO0FBSFAsT0FoQlEsRUFxQlI7QUFDRUYsY0FBTSxJQURSO0FBRUVDLGNBQU0sU0FGUjtBQUdFQyxhQUFLO0FBSFAsT0FyQlEsQ0FETDtBQTRCTEMsbUJBQWEsS0E1QlI7QUE2QkxDLGtCQUFZLEtBN0JQO0FBOEJMQyxrQkFBWSxLQTlCUDtBQStCTEMsZUFBUyxLQS9CSjtBQWdDTEMsbUJBQWEsS0FoQ1I7QUFpQ0xOLFlBQU07QUFDSk8saUJBQVMsS0FETDtBQUVKQyxvQkFBWSxJQUZSO0FBR0pDLGdCQUFRLElBSEo7QUFJSkMsa0JBQVUsSUFKTjtBQUtKQyxpQkFBUztBQUxMLE9BakNEO0FBd0NMQyxVQUFJLENBeENDO0FBeUNMQyxVQUFJLEVBekNDO0FBMENMQyxZQUFNLEVBMUNEO0FBMkNMQyxxQkFBZSxFQTNDVjtBQTRDTEMsaUJBQVcsSUE1Q047QUE2Q0xDLGtCQUFZLElBN0NQO0FBOENMQyxrQkFBWSxJQTlDUDtBQStDTEMsZUFBUyxLQS9DSjtBQWdETEMsb0JBQWMsS0FoRFQ7QUFpRExDLG9CQUFjLEVBakRUO0FBa0RMQyxzQkFBZ0IsQ0FBQyxDQWxEWjtBQW1ETEMsMEJBQW9CLENBQUMsQ0FuRGhCO0FBb0RMQywrQkFBeUIsQ0FBQyxDQXBEckI7QUFxRExDLDhCQUF3QixDQUFDLENBckRwQjtBQXNETEMsNkJBQXVCLEVBdERsQjtBQXVETEMsMkJBQXFCLENBQUMsQ0F2RGpCO0FBd0RMQyxZQUFNO0FBQ0pDLG1CQUFXLEtBRFA7QUFFSkMsaUJBQVMsS0FGTDtBQUdKcEIsa0JBQVUsS0FITjtBQUlKRCxnQkFBUSxLQUpKO0FBS0pzQixnQkFBUSxLQUxKO0FBTUp4QixpQkFBUztBQU5MLE9BeEREO0FBZ0VMeUIsaUJBQVcsQ0FoRU47QUFpRUxDLGlCQUFXLENBakVOO0FBa0VMQyxxQkFBZSxDQWxFVjtBQW1FTEMsMkJBQXFCLEtBbkVoQjtBQW9FTEMsa0JBQVksRUFwRVA7QUFxRUxDLGtCQUFZLEVBckVQO0FBc0VMQyxpQkFBVyxJQXRFTjtBQXVFTEMscUJBQWUsS0F2RVY7QUF3RUxDLDRCQUFzQjtBQXhFakIsSyxTQTBFUEMsSyxHQUFRO0FBQ056QixlQURNLHFCQUNJMEIsTUFESixFQUNZQyxNQURaLEVBQ29CO0FBQ3hCO0FBQ0EsWUFBSUEsV0FBVyxJQUFmLEVBQXFCO0FBQ25CLGVBQUtDLFNBQUw7QUFDQSxlQUFLQyxXQUFMO0FBQ0EsZUFBS0MsV0FBTDtBQUNEO0FBQ0YsT0FSSztBQVNOQywyQkFUTSxpQ0FTZ0JMLE1BVGhCLEVBU3dCQyxNQVR4QixFQVNnQztBQUNwQyxZQUFJRCxTQUFTLENBQWIsRUFBZ0I7QUFDZCxlQUFLaEIscUJBQUwsR0FBNkIsRUFBN0I7QUFDQSxlQUFLc0IsTUFBTDtBQUNEO0FBQ0Y7QUFkSyxLLFNBMEpSQyxPLEdBQVU7QUFDUkMsU0FEUSxlQUNKQyxRQURJLEVBQ01DLFlBRE4sRUFDb0I7QUFBQTs7QUFDMUIsWUFBSSxLQUFLYixhQUFULEVBQXdCO0FBQ3RCO0FBQ0Q7QUFDRCxhQUFLQSxhQUFMLEdBQXFCLElBQXJCO0FBQ0EsZ0NBQWE7QUFDWGMsb0JBQVUsS0FBS3JDLFNBQUwsQ0FBZXNDLEVBRGQ7QUFFWEMscUJBQVdKLFFBRkE7QUFHWEssa0JBQVE7QUFIRyxTQUFiLEVBSUdDLElBSkgsQ0FJUSxlQUFPO0FBQ2IsaUJBQUsxQyxhQUFMLEdBQXFCMkMsSUFBSTdELElBQUosQ0FBU2lCLElBQTlCO0FBQ0EsY0FBSSxDQUFDLE9BQUtDLGFBQUwsQ0FBbUI0QyxNQUF4QixFQUFnQztBQUM5QixtQkFBS3BCLGFBQUwsR0FBcUIsS0FBckI7QUFDQSxtQkFBS1MsTUFBTDtBQUNBLGlDQUFRLFFBQVI7QUFDQTtBQUNEO0FBQ0QsY0FBSSxPQUFLakMsYUFBTCxDQUFtQjRDLE1BQW5CLEdBQTRCLENBQWhDLEVBQW1DO0FBQ2pDLG1CQUFLeEQsVUFBTCxHQUFrQixJQUFsQjtBQUNBLG1CQUFLd0IsbUJBQUwsR0FBMkJ5QixZQUEzQjtBQUNBLG1CQUFLSixNQUFMO0FBQ0QsV0FKRCxNQUlPO0FBQ0wsbUJBQUtYLFVBQUwsR0FBa0IsRUFBbEI7QUFDQSxtQkFBS0EsVUFBTCxDQUFnQnVCLElBQWhCLENBQXFCLE9BQUs3QyxhQUFMLENBQW1CLENBQW5CLEVBQXNCdUMsRUFBM0M7QUFDQSxtQkFBS08sVUFBTCxDQUFnQlQsWUFBaEI7QUFDRDtBQUNGLFNBckJEO0FBc0JELE9BNUJPO0FBNkJSVSx3QkE3QlEsZ0NBNkJhO0FBQUE7O0FBQ25CLGdDQUFhO0FBQ1hULG9CQUFVLEtBQUtyQyxTQUFMLENBQWVzQyxFQURkO0FBRVhTLDRCQUFrQixLQUFLckMscUJBRlo7QUFHWHNDLHVCQUFhLEtBQUt2QztBQUhQLFNBQWIsRUFJR2dDLElBSkgsQ0FJUSxlQUFPO0FBQ2IsY0FBSUMsSUFBSTdELElBQUosQ0FBU29FLE9BQWIsRUFBc0I7QUFDcEIsaUNBQVEsTUFBUjtBQUNBLG1CQUFLdkMscUJBQUwsR0FBNkIsRUFBN0I7QUFDQSxtQkFBS3NCLE1BQUw7QUFDRDtBQUNGLFNBVkQ7QUFXRCxPQXpDTztBQTBDUmtCLGtCQTFDUSx3QkEwQ0taLEVBMUNMLEVBMENTYSxLQTFDVCxFQTBDZ0JDLFNBMUNoQixFQTBDMkJDLGFBMUMzQixFQTBDMEM7QUFDaEQsWUFBSSxDQUFDLEtBQUtyRCxTQUFWLEVBQXFCO0FBQ25CLCtCQUFRLFFBQVI7QUFDQTtBQUNEO0FBQ0QsYUFBS1Msc0JBQUwsR0FBOEI2QixFQUE5QjtBQUNBLFlBQU1nQixRQUFRLEtBQUs1QyxxQkFBTCxDQUEyQjZDLE9BQTNCLENBQW1DSixLQUFuQyxDQUFkO0FBQ0EsWUFBSUcsUUFBUSxDQUFDLENBQWIsRUFBZ0I7QUFDZCxlQUFLNUMscUJBQUwsQ0FBMkI4QyxNQUEzQixDQUFrQ0YsS0FBbEMsRUFBeUMsQ0FBekM7QUFDQSxlQUFLeEQsSUFBTCxDQUFVc0QsU0FBVixFQUFxQkssSUFBckIsQ0FBMEJDLElBQTFCLENBQStCTCxhQUEvQixFQUE4Q00sT0FBOUMsR0FBd0QsS0FBeEQ7QUFDRCxTQUhELE1BR087QUFDTCxlQUFLakQscUJBQUwsQ0FBMkJrQyxJQUEzQixDQUFnQ08sS0FBaEM7QUFDQSxlQUFLckQsSUFBTCxDQUFVc0QsU0FBVixFQUFxQkssSUFBckIsQ0FBMEJDLElBQTFCLENBQStCTCxhQUEvQixFQUE4Q00sT0FBOUMsR0FBd0QsSUFBeEQ7QUFDRDtBQUNELGFBQUszQixNQUFMO0FBQ0QsT0F6RE87QUEwRFI0QixxQkExRFEsMkJBMERRekIsUUExRFIsRUEwRGtCMEIsR0ExRGxCLEVBMER1QjtBQUFBOztBQUM3QixZQUFNQyxTQUFTLEtBQUtDLHVCQUFMLENBQTZCLEtBQUt2QyxvQkFBbEMsRUFBd0RXLFFBQXhELENBQWY7QUFDQSxrQ0FBZTtBQUNiSSxxQkFBV0osUUFERTtBQUVidEMsY0FBSSxLQUFLb0IsU0FGSTtBQUdickIsY0FBSWtFLE9BQU85QyxTQUFQLEdBQW1COEMsT0FBTzlDLFNBQTFCLEdBQXNDLEtBQUtBLFNBSGxDO0FBSWJnRCxrQkFBUSxLQUFLOUM7QUFKQSxTQUFmLEVBS0d1QixJQUxILENBS1EsZUFBTztBQUNiLGNBQUlDLElBQUk3RCxJQUFKLENBQVNvRSxPQUFiLEVBQXNCO0FBQ3BCLGdCQUFJZ0IsYUFBYXZCLElBQUk3RCxJQUFKLENBQVNpQixJQUExQjtBQURvQixnQkFFZkEsSUFGZSxHQUVQLE9BQUtBLElBQUwsQ0FBVStELEdBQVYsRUFBZUssWUFGUixDQUVmcEUsSUFGZTs7QUFHcEJBLGdEQUFXQSxJQUFYLHNCQUFvQm1FLFVBQXBCO0FBQ0EsbUJBQUtuRSxJQUFMLENBQVUrRCxHQUFWLEVBQWVLLFlBQWYsQ0FBNEJwRSxJQUE1QixHQUFtQ0EsSUFBbkM7QUFDQSxnQkFBSW1FLFdBQVd0QixNQUFYLEdBQW9CLE9BQUsxQixTQUE3QixFQUF3QztBQUN0QyxxQkFBS25CLElBQUwsQ0FBVStELEdBQVYsRUFBZTFDLG1CQUFmLEdBQXFDLElBQXJDO0FBQ0Q7QUFDRCxnQkFBSSxDQUFDMkMsT0FBTzlDLFNBQVosRUFBdUI7QUFDckIsa0JBQU1tRCxNQUFNO0FBQ1ZuRCwyQkFBVyxPQUFLQSxTQUFMLEdBQWlCLENBRGxCO0FBRVZ1QiwyQkFBV0o7QUFGRCxlQUFaO0FBSUEscUJBQUtYLG9CQUFMLENBQTBCb0IsSUFBMUIsQ0FBK0J1QixHQUEvQjtBQUNELGFBTkQsTUFNTztBQUNMLHFCQUFLM0Msb0JBQUwsQ0FBMEJzQyxPQUFPUixLQUFqQyxFQUF3Q3RDLFNBQXhDLEdBQW9EOEMsT0FBTzlDLFNBQVAsR0FBbUIsQ0FBdkU7QUFDRDtBQUNELG1CQUFLZ0IsTUFBTDtBQUNEO0FBQ0YsU0F6QkQ7QUEwQkQsT0F0Rk87QUF1RlJvQyxnQkF2RlEsc0JBdUZHcEYsSUF2RkgsRUF1RlNzRCxFQXZGVCxFQXVGYStCLE1BdkZiLEVBdUZxQkMsV0F2RnJCLEVBdUZrQ0MsSUF2RmxDLEVBdUZ3QztBQUM5QyxZQUFJRCxnQkFBZ0IsS0FBS3JFLFVBQUwsQ0FBZ0J1RSxTQUFwQyxFQUErQztBQUM3QywrQkFBUSxTQUFSO0FBQ0E7QUFDRDtBQUNELFlBQUksQ0FBQyxLQUFLeEUsU0FBVixFQUFxQjtBQUNuQiwrQkFBUSxRQUFSO0FBQ0E7QUFDRDtBQUNELGFBQUtkLFdBQUwsR0FBbUIsSUFBbkI7QUFDQSxhQUFLb0IsY0FBTCxHQUFzQmdDLEVBQXRCO0FBQ0EsYUFBSy9CLGtCQUFMLEdBQTBCdkIsU0FBUyxLQUFULEdBQWlCLENBQWpCLEdBQXFCcUYsTUFBL0M7QUFDQSxZQUFJRSxTQUFTRSxTQUFiLEVBQXdCO0FBQ3RCLGVBQUtwRSxZQUFMLFNBQXdCa0UsSUFBeEI7QUFDRCxTQUZELE1BRU87QUFDTCxlQUFLbEUsWUFBTCxHQUFvQixFQUFwQjtBQUNEO0FBQ0QsYUFBSzJCLE1BQUw7QUFDRCxPQXpHTztBQTBHUjBDLHNCQTFHUSw0QkEwR1VDLEtBMUdWLEVBMEdpQjtBQUN2QixhQUFLdEUsWUFBTCxHQUFvQnNFLEtBQXBCO0FBQ0EsYUFBSzNDLE1BQUw7QUFDRCxPQTdHTztBQThHUjRDLGlCQTlHUSx5QkE4R087QUFBQTs7QUFDYixhQUFLMUYsV0FBTCxHQUFtQixLQUFuQjtBQUNBLDhCQUFXO0FBQ1RtRCxvQkFBVSxLQUFLckMsU0FBTCxDQUFlc0MsRUFEaEI7QUFFVEMscUJBQVcsS0FBS2pDLGNBRlA7QUFHVHVFLG1CQUFTLEtBQUt2RSxjQUFMLEdBQXNCLENBQXRCLEdBQTBCLEtBQUtELFlBQUwsQ0FBa0J5RSxPQUFsQixDQUEwQixPQUExQixFQUFtQyxFQUFuQyxDQUExQixHQUFtRSxLQUFLekUsWUFIeEU7QUFJVDBFLG1CQUFTLEtBQUt4RSxrQkFKTDtBQUtUeUUseUJBQWUsS0FBS3pFO0FBTFgsU0FBWCxFQU1Ha0MsSUFOSCxDQU1RLGVBQU87QUFDYixjQUFJQyxJQUFJN0QsSUFBSixDQUFTb0UsT0FBYixFQUFzQjtBQUNwQixtQkFBSzVDLFlBQUwsR0FBb0IsRUFBcEI7QUFDQSxtQkFBS3VCLFNBQUw7QUFDQSxtQkFBS0UsV0FBTDtBQUNBLG1CQUFLRSxNQUFMO0FBQ0Q7QUFDRixTQWJEO0FBY0QsT0E5SE87QUErSFJpRCxpQkEvSFEsdUJBK0hJTixLQS9ISixFQStIVztBQUNqQixZQUFJTyxNQUFNUCxVQUFVLFNBQVYsR0FBc0IsZ0JBQXRCLHFCQUF5REEsS0FBbkU7QUFDQVEsV0FBR0MsVUFBSCxDQUFjO0FBQ1pGLGVBQUtBO0FBRE8sU0FBZDtBQUdELE9BcElPO0FBcUlSRyxtQkFySVEsMkJBcUlTO0FBQ2YsYUFBS25HLFdBQUwsR0FBbUIsS0FBbkI7QUFDQSxhQUFLbUIsWUFBTCxHQUFvQixFQUFwQjtBQUNBLGFBQUsyQixNQUFMO0FBQ0QsT0F6SU87QUEwSVJzRCxjQTFJUSxvQkEwSUVDLFFBMUlGLEVBMElZdkcsSUExSVosRUEwSWtCO0FBQ3hCLGFBQUtNLFdBQUwsR0FBbUIsS0FBbkI7QUFDQSxhQUFLRCxPQUFMLEdBQWUsS0FBZjtBQUNBOEYsV0FBR0MsVUFBSCxDQUFjO0FBQ1pGLGVBQVFLLFFBQVIsY0FBeUJ2RztBQURiLFNBQWQ7QUFHRCxPQWhKTztBQWlKUndHLGdCQWpKUSxzQkFpSkl4RyxJQWpKSixFQWlKVTtBQUNoQixZQUFJLENBQUMsS0FBS2dCLFNBQVYsRUFBcUI7QUFDbkIsK0JBQVEsUUFBUixFQUFrQixJQUFsQjtBQUNBO0FBQ0Q7QUFDRCxhQUFLaEIsSUFBTCxJQUFhLENBQUMsS0FBS0EsSUFBTCxDQUFkO0FBQ0EsYUFBS2dELE1BQUw7QUFDRCxPQXhKTztBQXlKUnlELGlCQXpKUSx5QkF5Sk87QUFDYixhQUFLcEcsT0FBTCxHQUFlLEtBQWY7QUFDQSxhQUFLQyxXQUFMLEdBQW1CLEtBQW5CO0FBQ0EsYUFBSzBDLE1BQUw7QUFDRCxPQTdKTztBQThKUjBELGFBOUpRLG1CQThKQUMsR0E5SkEsRUE4SktDLE9BOUpMLEVBOEpjO0FBQ3BCLGtDQUFhRCxHQUFiLEVBQWtCQyxPQUFsQjtBQUNELE9BaEtPO0FBaUtSQyxrQkFqS1EsMEJBaUtPO0FBQ2IsYUFBSzFHLFVBQUwsR0FBa0IsS0FBbEI7QUFDQSxhQUFLNkMsTUFBTDtBQUNELE9BcEtPO0FBcUtSOEQsZ0JBcktRLHNCQXFLR25CLEtBcktILEVBcUtVO0FBQ2hCLFlBQUksQ0FBQ0EsTUFBTWhDLE1BQVgsRUFBbUI7QUFDakIsK0JBQVEsS0FBUjtBQUNBO0FBQ0Q7QUFDRCxZQUFNb0QsTUFBTXBCLEtBQVo7QUFDQSxhQUFLdEQsVUFBTCxnQ0FBc0IwRSxHQUF0QjtBQUNBLGFBQUs1RyxVQUFMLEdBQWtCLEtBQWxCO0FBQ0EsYUFBSzZDLE1BQUw7QUFDQSxhQUFLYSxVQUFMLENBQWdCLEtBQUtsQyxtQkFBckI7QUFDRDtBQS9LTyxLOzs7OztnQ0ExSUU7QUFDVixXQUFLYSxvQkFBTCxHQUE0QixFQUE1QjtBQUNBLFdBQUtMLG1CQUFMLEdBQTJCLEtBQTNCO0FBQ0EsV0FBS0gsU0FBTCxHQUFpQixDQUFqQjtBQUNBLFdBQUtDLFNBQUwsR0FBaUIsQ0FBakI7QUFDQSxXQUFLSSxVQUFMLEdBQWtCLEVBQWxCO0FBQ0EsV0FBS0UsYUFBTCxHQUFxQixLQUFyQjtBQUNBLFdBQUszQixFQUFMLEdBQVUsQ0FBVjtBQUNBLFdBQUtFLElBQUwsR0FBWSxFQUFaO0FBQ0EsV0FBS2tDLE1BQUw7QUFDRDs7O3dDQUNtQjtBQUNsQixXQUFLSixTQUFMO0FBQ0EsV0FBS0UsV0FBTDtBQUNEOzs7b0NBQ2U7QUFDZCxVQUFJLEtBQUszQixPQUFMLElBQWdCLEtBQUtDLFlBQXpCLEVBQXVDO0FBQ3ZDLFdBQUswQixXQUFMO0FBQ0Q7Ozs2QkFDUTtBQUNQLFdBQUtyQixzQkFBTCxHQUE4QixDQUFDLENBQS9CO0FBQ0EsV0FBS0MscUJBQUwsR0FBNkIsRUFBN0I7QUFDQSxXQUFLVixTQUFMLEdBQWlCbUYsR0FBR2EsY0FBSCxDQUFrQixXQUFsQixDQUFqQjtBQUNBLFdBQUtoRSxNQUFMO0FBQ0Q7Ozs2QkFDUTtBQUNQLFVBQUksQ0FBQyxLQUFLaUUsY0FBTCxDQUFvQixZQUFwQixDQUFMLEVBQXdDO0FBQ3RDZCxXQUFHZSxRQUFILENBQVk7QUFDVmhCLGVBQUs7QUFESyxTQUFaO0FBR0QsT0FKRCxNQUlPO0FBQ0wsYUFBS2xGLFNBQUwsR0FBaUJtRixHQUFHYSxjQUFILENBQWtCLFdBQWxCLENBQWpCO0FBQ0EsYUFBS2hHLFNBQUwsSUFBa0IsS0FBSzZCLFdBQUwsRUFBbEI7QUFDQSxhQUFLNUIsVUFBTCxHQUFrQmtGLEdBQUdhLGNBQUgsQ0FBa0IsWUFBbEIsQ0FBbEI7QUFDQSxhQUFLRyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JDLFFBQXhCLEdBQW1DLEtBQUtwRyxVQUF4QztBQUNBLGFBQUsrQixNQUFMO0FBQ0EsYUFBS0YsV0FBTDtBQUNEO0FBQ0Y7OztrQ0FDYTtBQUFBOztBQUNaLDhCQUFRO0FBQ05PLGtCQUFVLEtBQUtyQyxTQUFMLENBQWVzQztBQURuQixPQUFSLEVBRUdHLElBRkgsQ0FFUSxlQUFPO0FBQ2IsZUFBSzZELFNBQUwsQ0FBZTVELElBQUk3RCxJQUFKLENBQVNBLElBQXhCO0FBQ0QsT0FKRDtBQUtEOzs7a0NBQ2FzRixHLEVBQUs7QUFDakJvQyxhQUFPQyxJQUFQLENBQVlyQyxHQUFaLEVBQWlCc0MsT0FBakIsQ0FBeUIsZUFBTztBQUM5QnRDLFlBQUl1QyxHQUFKLElBQVcsSUFBWDtBQUNELE9BRkQ7QUFHQSxXQUFLMUUsTUFBTDtBQUNEOzs7cUNBQ2dCdUMsSSxFQUFNO0FBQ3JCLFdBQUszRCxJQUFMLENBQVUyRCxJQUFWLElBQWtCLElBQWxCO0FBQ0EsV0FBS3ZDLE1BQUw7QUFDRDs7OzhCQUNTbEMsSSxFQUFNO0FBQ2QsV0FBSyxJQUFJNkcsSUFBSSxDQUFSLEVBQVdDLE1BQU05RyxLQUFLNkMsTUFBM0IsRUFBbUNnRSxJQUFJQyxHQUF2QyxFQUE0Q0QsR0FBNUMsRUFBaUQ7QUFBQSxzQkFDakI3RyxLQUFLNkcsQ0FBTCxDQURpQjtBQUFBLFlBQzFDRSxJQUQwQyxXQUMxQ0EsSUFEMEM7QUFBQSxZQUMzQkMsTUFEMkIsV0FDcENDLE9BRG9DOztBQUUvQyxZQUFJRixTQUFTLFdBQVQsSUFBd0JDLE1BQTVCLEVBQW9DO0FBQ2xDLGVBQUtFLGFBQUwsQ0FBbUIsS0FBS3BHLElBQXhCO0FBQ0E7QUFDRCxTQUhELE1BR087QUFDTGtHLG9CQUFVLEtBQUtHLGdCQUFMLENBQXNCSixJQUF0QixDQUFWO0FBQ0Q7QUFDRjtBQUNGOzs7bUNBQ2NILEcsRUFBSztBQUNsQixVQUFJdkIsR0FBR2EsY0FBSCxDQUFrQlUsR0FBbEIsQ0FBSixFQUE0QjtBQUMxQixlQUFPLElBQVA7QUFDRDtBQUNELGFBQU8sS0FBUDtBQUNEOzs7a0NBQ2E7QUFBQTs7QUFDWixXQUFLdkcsT0FBTCxHQUFlLElBQWY7QUFDQSxXQUFLNkIsTUFBTDtBQUNBLFVBQU1NLEtBQUssS0FBS3RDLFNBQUwsQ0FBZXNDLEVBQTFCO0FBQ0EsK0JBQWM7QUFDWkQsa0JBQVVDLEVBREU7QUFFWjRFLGtCQUFVNUUsS0FBSyxFQUFMLEdBQVUsS0FGUjtBQUdadEQsY0FBTSxLQUFLSSxVQUhDO0FBSVpRLFlBQUksS0FBS0EsRUFKRztBQUtaQyxZQUFJLEtBQUtBLEVBTEc7QUFNWnNILHVCQUFlO0FBTkgsT0FBZCxFQU9HMUUsSUFQSCxDQU9RLGVBQU87QUFBQSxZQUNQM0MsSUFETyxHQUNFNEMsSUFBSTdELElBRE4sQ0FDUGlCLElBRE87O0FBRWIsZUFBS0ssT0FBTCxHQUFlLEtBQWY7QUFDQSxlQUFLUCxFQUFMO0FBQ0EsWUFBSUUsS0FBSzZDLE1BQUwsR0FBYyxPQUFLOUMsRUFBdkIsRUFBMkI7QUFDekIsaUJBQUtPLFlBQUwsR0FBb0IsSUFBcEI7QUFDRDtBQUNELGVBQUtOLElBQUwsZ0NBQWdCLE9BQUtBLElBQXJCLHNCQUE4QkEsSUFBOUI7QUFDQSxlQUFLa0MsTUFBTDtBQUNELE9BaEJEO0FBaUJEOzs7a0NBQ2FNLEUsRUFBSTtBQUFBOztBQUNoQixxQ0FBaUI7QUFDZjhFLGtCQUFVOUU7QUFESyxPQUFqQixFQUVHRyxJQUZILENBRVEsZUFBTztBQUNiLFlBQUk0RSxRQUFRLE1BQVo7QUFDQSxZQUFJeEksT0FBTzZELElBQUk3RCxJQUFKLENBQVN5SSxjQUFwQjtBQUNBbkMsV0FBR29DLGNBQUgsQ0FBa0I7QUFDaEJDLHFCQUFXQyxPQUFPNUksS0FBSzJJLFNBQVosQ0FESztBQUVoQkUsb0JBQVU3SSxLQUFLNkksUUFGQztBQUdoQkMsbUJBQVM5SSxLQUFLOEksT0FIRTtBQUloQkMsbUJBQVMvSSxLQUFLK0ksT0FKRTtBQUtoQkMsb0JBQVUsS0FMTTtBQU1oQjVFLGlCQU5nQixxQkFNTjtBQUNSb0Usa0JBQU05RixhQUFOLEdBQXNCLEtBQXRCO0FBQ0E4RixrQkFBTXJGLE1BQU47QUFDRCxXQVRlO0FBVWhCOEYsY0FWZ0Isa0JBVVQ7QUFDTFQsa0JBQU05RixhQUFOLEdBQXNCLEtBQXRCO0FBQ0E4RixrQkFBTXJGLE1BQU47QUFDRDtBQWJlLFNBQWxCO0FBZUQsT0FwQkQ7QUFxQkQ7OzsrQkFDVU0sRSxFQUFJO0FBQUE7O0FBQ2IsNkJBQVM7QUFDUEQsa0JBQVUsS0FBS3JDLFNBQUwsQ0FBZXNDLEVBRGxCO0FBRVB5RixxQkFBYSxLQUFLMUcsVUFGWDtBQUdQMkcsNEJBQW9CMUY7QUFIYixPQUFULEVBSUdHLElBSkgsQ0FJUSxlQUFPO0FBQ2IsZ0JBQUt3RixhQUFMLENBQW1CdkYsSUFBSTdELElBQUosQ0FBU0EsSUFBVCxDQUFjeUQsRUFBakM7QUFDRCxPQU5EO0FBT0Q7Ozs0Q0FDdUI0RixHLEVBQUtDLFMsRUFBVztBQUN0QyxVQUFJckUsU0FBUyxFQUFiO0FBQ0EsV0FBSSxJQUFJNkMsSUFBSSxDQUFSLEVBQVVDLE1BQU1zQixJQUFJdkYsTUFBeEIsRUFBZ0NnRSxJQUFJQyxHQUFwQyxFQUF5Q0QsR0FBekMsRUFBOEM7QUFDNUMsWUFBR3VCLElBQUl2QixDQUFKLEVBQU9wRSxTQUFQLEtBQXFCNEYsU0FBeEIsRUFBbUM7QUFDakNyRSxtQkFBU3lDLE9BQU82QixNQUFQLENBQWMsRUFBZCxFQUFpQkYsSUFBSXZCLENBQUosQ0FBakIsRUFBd0I7QUFDL0JyRCxtQkFBT3FEO0FBRHdCLFdBQXhCLENBQVQ7QUFHRDtBQUNGO0FBQ0QsYUFBTzdDLE1BQVA7QUFDRDs7OztFQS9PK0J1RSxlQUFLQyxJOztrQkFBbEJuSyxJIiwiZmlsZSI6InpvbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgU2VsZWN0TW9kYWwgZnJvbSAnLi4vY29tcG9uZW50cy9zZWxlY3RNb2RhbCdcbmltcG9ydCBDdXJyZW50TW9kYWwgZnJvbSAnLi4vY29tcG9uZW50cy9jb21tZW50TW9kYWwnXG5pbXBvcnQgeyBzaG93TXNnLCBwcmV2aWV3SW1hZ2UgfSBmcm9tICcuLi91dGlscy9jb21tb24nXG5pbXBvcnQgeyBnZXRDaXJjbGVMaXN0LCBhZGRDb21tZW50LCBqb2luQWN0aXZpdHksIGdldENvbW1lbnRMaXN0IH0gZnJvbSAnLi4vYXBpL3pvbmUnXG5pbXBvcnQgeyBhZGRPcmRlciwgZ2V0UGF5bWVudFBhcmFtcyB9IGZyb20gJy4uL2FwaS9maW5hbmNlJ1xuaW1wb3J0IHsgZ2V0QXV0aCB9IGZyb20gJy4uL2FwaS9hdXRob3JpemUnXG5pbXBvcnQgeyBjaGVja1N0dWRlbnQgfSBmcm9tICcuLi9hcGkvdXNlcidcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFpvbmUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WPkeeOsCcsXG4gICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiB0cnVlXG4gIH1cbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIkN1cnJlbnRNb2RhbFwiOntcInN1cmVCdG5UZXh0XCI6XCLnoa7orqRcIixcImNhbmNlbEJ0blRleHRcIjpcIuWPlua2iFwiLFwicGxhY2Vob2xkZXJUZXh0XCI6XCLor7fovpPlhaXor4TorrrlhoXlrrlcIixcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6ZmxhZy5zeW5jXCI6XCJjb21tZW50RmxhZ1wiLFwidi1iaW5kOmNvbW1lbnRJbnB1dC5zeW5jXCI6XCJjb21tZW50SW5wdXRcIixcInhtbG5zOnYtb25cIjpcIlwifSxcIlNlbGVjdE1vZGFsXCI6e1widi1iaW5kOmZsYWcuc3luY1wiOlwic2VsZWN0RmxhZ1wiLFwidi1iaW5kOmxpc3Quc3luY1wiOlwicGF5TWVtYmVyTGlzdFwifX07XHJcbiRldmVudHMgPSB7XCJDdXJyZW50TW9kYWxcIjp7XCJ2LW9uOmNhbmNlbFwiOlwiY29tbWVudENhbmNlbFwiLFwidi1vbjpzdXJlXCI6XCJjb21tZW50U3VyZVwiLFwidi1vbjppbnB1dFwiOlwiYmluZENvbW1lbnRJbnB1dFwifSxcIlNlbGVjdE1vZGFsXCI6e1widi1vbjpjYW5jZWxcIjpcInNlbGVjdENhbmNlbFwiLFwidi1vbjpzdXJlXCI6XCJzZWxlY3RTdXJlXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgQ3VycmVudE1vZGFsLFxuICAgIFNlbGVjdE1vZGFsXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBtZW51TGlzdDogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiAn5a626ZW/5ZyIJyxcbiAgICAgICAgdHlwZTogJ3pvbmUnLFxuICAgICAgICBzcmM6ICcvaW1hZ2VzL2ljb24vMi5qcGcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAn5pS26LS5JyxcbiAgICAgICAgdHlwZTogJ21vbmV5JyxcbiAgICAgICAgc3JjOiAnL2ltYWdlcy9pY29uL21vbmV5LmpwZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICfpgJrnn6UnLFxuICAgICAgICB0eXBlOiAnbm90aWNlJyxcbiAgICAgICAgc3JjOiAnL2ltYWdlcy9pY29uLzQuanBnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ+a0u+WKqCcsXG4gICAgICAgIHR5cGU6ICdhY3Rpdml0eScsXG4gICAgICAgIHNyYzogJy9pbWFnZXMvaWNvbi81LmpwZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICforrDotKYnLFxuICAgICAgICB0eXBlOiAnYWNjb3VudCcsXG4gICAgICAgIHNyYzogJy9pbWFnZXMvaWNvbi9waG90b3MuanBnJ1xuICAgICAgfVxuICAgIF0sXG4gICAgY29tbWVudEZsYWc6IGZhbHNlLFxuICAgIHNlbGVjdEZsYWc6IGZhbHNlLFxuICAgIGFjdGl2ZVR5cGU6ICdhbGwnLFxuICAgIHNldEZsYWc6IGZhbHNlLFxuICAgIHB1Ymxpc2hGbGFnOiBmYWxzZSxcbiAgICB0eXBlOiB7XG4gICAgICBjaXJjbGVzOiAn5a626ZW/5ZyIJyxcbiAgICAgIGNvbGxlY3Rpb246ICfmlLbmrL4nLFxuICAgICAgbm90aWZ5OiAn6YCa55+lJyxcbiAgICAgIGFjdGl2aXR5OiAn5rS75YqoJyxcbiAgICAgIGFjY291bnQ6ICforrDotKYnXG4gICAgfSxcbiAgICBwbjogMSxcbiAgICBwczogMTAsXG4gICAgbGlzdDogW10sXG4gICAgcGF5TWVtYmVyTGlzdDogW10sXG4gICAgY2xhc3NJbmZvOiBudWxsLFxuICAgIG1lbWJlckluZm86IG51bGwsXG4gICAgc2Nob29sSW5mbzogbnVsbCxcbiAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICBsb2FkRmluaXNoZWQ6IGZhbHNlLFxuICAgIGNvbW1lbnRJbnB1dDogJycsXG4gICAgY3VycmVudFJlcGx5SWQ6IC0xLFxuICAgIGN1cnJlbnRSZXBseVJvb3RJZDogLTEsXG4gICAgY3VycmVudFJlcGx5VG9Db21tZW50SWQ6IC0xLFxuICAgIGN1cnJlcm50Sm9pbkFjaXRpdnl0SWQ6IC0xLFxuICAgIGN1cnJlcm50U3ViQWN0aXZpdHlJZDogW10sXG4gICAgY3VycmVudENvbGxlY3Rpb25JZDogLTEsXG4gICAgYXV0aDoge1xuICAgICAgcHJlc2lkZW50OiBmYWxzZSxcbiAgICAgIGZpbmFuY2U6IGZhbHNlLFxuICAgICAgYWN0aXZpdHk6IGZhbHNlLFxuICAgICAgbm90aWZ5OiBmYWxzZSxcbiAgICAgIHBob3RvczogZmFsc2UsXG4gICAgICBjaXJjbGVzOiBmYWxzZVxuICAgIH0sXG4gICAgY29tbWVudFBuOiAyLFxuICAgIGNvbW1lbnRQczogNixcbiAgICBjb21tZW50T2Zmc2V0OiA2LFxuICAgIGNvbW1lbnRMb2FkRmluaXNoZWQ6IGZhbHNlLFxuICAgIG1lbWJlckxpc3Q6IFtdLFxuICAgIHN0dWRlbnRJZHM6IFtdLFxuICAgIGZpcnN0SW5pdDogdHJ1ZSxcbiAgICBwYXltZW50TG9ja2VkOiBmYWxzZSxcbiAgICBsb2FkTW9yZUNvbW1lbnRBcnJheTogW11cbiAgfVxuICB3YXRjaCA9IHtcbiAgICBjbGFzc0luZm8obmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgIC8vIOWIh+aNouS6huePree6p+S5i+WQjuaVsOaNruimgeabtOaWsFxuICAgICAgaWYgKG9sZFZhbCAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLnJlc2V0RGF0YSgpXG4gICAgICAgIHRoaXMuZ2V0QXV0aExpc3QoKVxuICAgICAgICB0aGlzLmdldFpvbmVMaXN0KClcbiAgICAgIH1cbiAgICB9LFxuICAgIGN1cnJlbnRKb2luQWN0aXZpdHlJZChuZXdWYWwsIG9sZFZhbCkge1xuICAgICAgaWYgKG5ld1ZhbCA+IDApIHtcbiAgICAgICAgdGhpcy5jdXJyZXJudFN1YkFjdGl2aXR5SWQgPSBbXVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJlc2V0RGF0YSgpIHtcbiAgICB0aGlzLmxvYWRNb3JlQ29tbWVudEFycmF5ID0gW11cbiAgICB0aGlzLmNvbW1lbnRMb2FkRmluaXNoZWQgPSBmYWxzZVxuICAgIHRoaXMuY29tbWVudFBuID0gMlxuICAgIHRoaXMuY29tbWVudFBzID0gNlxuICAgIHRoaXMuc3R1ZGVudElkcyA9IFtdXG4gICAgdGhpcy5wYXltZW50TG9ja2VkID0gZmFsc2VcbiAgICB0aGlzLnBuID0gMVxuICAgIHRoaXMubGlzdCA9IFtdXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIG9uUHVsbERvd25SZWZyZXNoKCkge1xuICAgIHRoaXMucmVzZXREYXRhKClcbiAgICB0aGlzLmdldFpvbmVMaXN0KClcbiAgfVxuICBvblJlYWNoQm90dG9tKCkge1xuICAgIGlmICh0aGlzLmxvYWRpbmcgfHwgdGhpcy5sb2FkRmluaXNoZWQpIHJldHVyblxuICAgIHRoaXMuZ2V0Wm9uZUxpc3QoKVxuICB9XG4gIG9uU2hvdygpIHtcbiAgICB0aGlzLmN1cnJlcm50Sm9pbkFjaXRpdnl0SWQgPSAtMVxuICAgIHRoaXMuY3VycmVybnRTdWJBY3Rpdml0eUlkID0gW11cbiAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxuICAgIHRoaXMuJGFwcGx5KClcbiAgfVxuICBvbkxvYWQoKSB7XG4gICAgaWYgKCF0aGlzLmNoZWNrRGF0YUV4aXN0KCdtZW1iZXJJbmZvJykpIHtcbiAgICAgIHd4LnJlTGF1bmNoKHtcbiAgICAgICAgdXJsOiAnbG9naW4nXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxuICAgICAgdGhpcy5jbGFzc0luZm8gJiYgdGhpcy5nZXRBdXRoTGlzdCgpXG4gICAgICB0aGlzLm1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXG4gICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyRGF0YSA9IHRoaXMubWVtYmVySW5mb1xuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgdGhpcy5nZXRab25lTGlzdCgpXG4gICAgfVxuICB9XG4gIGdldEF1dGhMaXN0KCkge1xuICAgIGdldEF1dGgoe1xuICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgdGhpcy5jaGVja0F1dGgocmVzLmRhdGEuZGF0YSlcbiAgICB9KVxuICB9XG4gIGZvcm1hdEFsbEF1dGgob2JqKSB7XG4gICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBvYmpba2V5XSA9IHRydWVcbiAgICB9KVxuICAgIHRoaXMuJGFwcGx5KClcbiAgfVxuICBmb3JtYXRTaW5nbGVBdXRoKG5hbWUpIHtcbiAgICB0aGlzLmF1dGhbbmFtZV0gPSB0cnVlXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIGNoZWNrQXV0aChsaXN0KSB7XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGxpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGxldCB7Y29kZSwgaXNfYXV0aDogaXNBdXRofSA9IGxpc3RbaV1cbiAgICAgIGlmIChjb2RlID09PSAncHJlc2lkZW50JyAmJiBpc0F1dGgpIHtcbiAgICAgICAgdGhpcy5mb3JtYXRBbGxBdXRoKHRoaXMuYXV0aClcbiAgICAgICAgYnJlYWtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlzQXV0aCAmJiB0aGlzLmZvcm1hdFNpbmdsZUF1dGgoY29kZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgY2hlY2tEYXRhRXhpc3Qoa2V5KSB7XG4gICAgaWYgKHd4LmdldFN0b3JhZ2VTeW5jKGtleSkpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIGdldFpvbmVMaXN0KCkge1xuICAgIHRoaXMubG9hZGluZyA9IHRydWVcbiAgICB0aGlzLiRhcHBseSgpXG4gICAgY29uc3QgaWQgPSB0aGlzLmNsYXNzSW5mby5pZFxuICAgIGdldENpcmNsZUxpc3Qoe1xuICAgICAgY2xhc3NfaWQ6IGlkLFxuICAgICAgc2VlX3R5cGU6IGlkID8gJycgOiAnYWxsJyxcbiAgICAgIHR5cGU6IHRoaXMuYWN0aXZlVHlwZSxcbiAgICAgIHBuOiB0aGlzLnBuLFxuICAgICAgcHM6IHRoaXMucHMsXG4gICAgICBjb21tZW50X2NvdW50OiAzXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IHsgbGlzdCB9ID0gcmVzLmRhdGFcbiAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlXG4gICAgICB0aGlzLnBuKytcbiAgICAgIGlmIChsaXN0Lmxlbmd0aCA8IHRoaXMucHMpIHtcbiAgICAgICAgdGhpcy5sb2FkRmluaXNoZWQgPSB0cnVlXG4gICAgICB9XG4gICAgICB0aGlzLmxpc3QgPSBbLi4udGhpcy5saXN0LCAuLi5saXN0XVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0pXG4gIH1cbiAgcGF5bWVudFBhcmFtcyhpZCkge1xuICAgIGdldFBheW1lbnRQYXJhbXMoe1xuICAgICAgb3JkZXJfaWQ6IGlkXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IF90aGlzID0gdGhpc1xuICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YS5wYXltZW50X3BhcmFtc1xuICAgICAgd3gucmVxdWVzdFBheW1lbnQoe1xuICAgICAgICB0aW1lU3RhbXA6IFN0cmluZyhkYXRhLnRpbWVTdGFtcCksXG4gICAgICAgIG5vbmNlU3RyOiBkYXRhLm5vbmNlU3RyLFxuICAgICAgICBwYWNrYWdlOiBkYXRhLnBhY2thZ2UsXG4gICAgICAgIHBheVNpZ246IGRhdGEucGF5U2lnbixcbiAgICAgICAgc2lnblR5cGU6ICdNRDUnLFxuICAgICAgICBzdWNjZXNzKCkge1xuICAgICAgICAgIF90aGlzLnBheW1lbnRMb2NrZWQgPSBmYWxzZVxuICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWwoKSB7XG4gICAgICAgICAgX3RoaXMucGF5bWVudExvY2tlZCA9IGZhbHNlXG4gICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9XG4gIGFkZFRvT3JkZXIoaWQpIHtcbiAgICBhZGRPcmRlcih7XG4gICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXG4gICAgICBzdHVkZW50X2lkczogdGhpcy5zdHVkZW50SWRzLFxuICAgICAgY29sbGVjdGlvbl9pdGVtX2lkOiBpZFxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHRoaXMucGF5bWVudFBhcmFtcyhyZXMuZGF0YS5kYXRhLmlkKVxuICAgIH0pXG4gIH1cbiAgZmluZExvYWRtb3JlQ29tbWVudEluZm8oYXJyLCBjdXJyZW50SWQpIHtcbiAgICBsZXQgcmV0T2JqID0ge31cbiAgICBmb3IobGV0IGkgPSAwLGxlbiA9IGFyci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgaWYoYXJyW2ldLm1vbWVudF9pZCA9PT0gY3VycmVudElkKSB7XG4gICAgICAgIHJldE9iaiA9IE9iamVjdC5hc3NpZ24oe30sYXJyW2ldLHtcbiAgICAgICAgICBpbmRleDogaVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmV0T2JqXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBwYXkobW9tZW50SWQsIGNvbGxlY3Rpb25JZCkge1xuICAgICAgaWYgKHRoaXMucGF5bWVudExvY2tlZCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHRoaXMucGF5bWVudExvY2tlZCA9IHRydWVcbiAgICAgIGNoZWNrU3R1ZGVudCh7XG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgICAgbW9tZW50X2lkOiBtb21lbnRJZCxcbiAgICAgICAgaXNfcGF5OiAwXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIHRoaXMucGF5TWVtYmVyTGlzdCA9IHJlcy5kYXRhLmxpc3RcbiAgICAgICAgaWYgKCF0aGlzLnBheU1lbWJlckxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5wYXltZW50TG9ja2VkID0gZmFsc2VcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgc2hvd01zZygn6K+35Yu/6YeN5aSN57y06LS5JylcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wYXlNZW1iZXJMaXN0Lmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdEZsYWcgPSB0cnVlXG4gICAgICAgICAgdGhpcy5jdXJyZW50Q29sbGVjdGlvbklkID0gY29sbGVjdGlvbklkXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc3R1ZGVudElkcyA9IFtdXG4gICAgICAgICAgdGhpcy5zdHVkZW50SWRzLnB1c2godGhpcy5wYXlNZW1iZXJMaXN0WzBdLmlkKVxuICAgICAgICAgIHRoaXMuYWRkVG9PcmRlcihjb2xsZWN0aW9uSWQpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBzdWJtaXRKb2luQWN0aXZpdHkoKSB7XG4gICAgICBqb2luQWN0aXZpdHkoe1xuICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXG4gICAgICAgIGFjdGl2aXR5X2l0ZW1faWQ6IHRoaXMuY3VycmVybnRTdWJBY3Rpdml0eUlkLFxuICAgICAgICBhY3Rpdml0eV9pZDogdGhpcy5jdXJyZXJudEpvaW5BY2l0aXZ5dElkXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgc2hvd01zZygn5o+Q5Lqk5oiQ5YqfJylcbiAgICAgICAgICB0aGlzLmN1cnJlcm50U3ViQWN0aXZpdHlJZCA9IFtdXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgam9pbkFjdGl2aXR5KGlkLCBzdWJJZCwgbGlzdEluZGV4LCBhY3Rpdml0eUluZGV4KSB7XG4gICAgICBpZiAoIXRoaXMuY2xhc3NJbmZvKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+WFiOmAieaLqeePree6pycpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdGhpcy5jdXJyZXJudEpvaW5BY2l0aXZ5dElkID0gaWRcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jdXJyZXJudFN1YkFjdGl2aXR5SWQuaW5kZXhPZihzdWJJZClcbiAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgIHRoaXMuY3VycmVybnRTdWJBY3Rpdml0eUlkLnNwbGljZShpbmRleCwgMSlcbiAgICAgICAgdGhpcy5saXN0W2xpc3RJbmRleF0uaW5mby5pdGVtW2FjdGl2aXR5SW5kZXhdLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jdXJyZXJudFN1YkFjdGl2aXR5SWQucHVzaChzdWJJZClcbiAgICAgICAgdGhpcy5saXN0W2xpc3RJbmRleF0uaW5mby5pdGVtW2FjdGl2aXR5SW5kZXhdLmNoZWNrZWQgPSB0cnVlXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBsb2FkTW9yZUNvbW1lbnQobW9tZW50SWQsIGlkeCkge1xuICAgICAgY29uc3QgcmV0T2JqID0gdGhpcy5maW5kTG9hZG1vcmVDb21tZW50SW5mbyh0aGlzLmxvYWRNb3JlQ29tbWVudEFycmF5LCBtb21lbnRJZCk7XG4gICAgICBnZXRDb21tZW50TGlzdCh7XG4gICAgICAgIG1vbWVudF9pZDogbW9tZW50SWQsXG4gICAgICAgIHBzOiB0aGlzLmNvbW1lbnRQcyxcbiAgICAgICAgcG46IHJldE9iai5jb21tZW50UG4gPyByZXRPYmouY29tbWVudFBuIDogdGhpcy5jb21tZW50UG4sXG4gICAgICAgIG9mZnNldDogdGhpcy5jb21tZW50T2Zmc2V0XG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgbGV0IHJlc3VsdExpc3QgPSByZXMuZGF0YS5saXN0XG4gICAgICAgICAgbGV0IHtsaXN0fSA9IHRoaXMubGlzdFtpZHhdLmNvbW1lbnRfbGlzdFxuICAgICAgICAgIGxpc3QgPSBbLi4ubGlzdCwgLi4ucmVzdWx0TGlzdF1cbiAgICAgICAgICB0aGlzLmxpc3RbaWR4XS5jb21tZW50X2xpc3QubGlzdCA9IGxpc3RcbiAgICAgICAgICBpZiAocmVzdWx0TGlzdC5sZW5ndGggPCB0aGlzLmNvbW1lbnRQcykge1xuICAgICAgICAgICAgdGhpcy5saXN0W2lkeF0uY29tbWVudExvYWRGaW5pc2hlZCA9IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFyZXRPYmouY29tbWVudFBuKSB7XG4gICAgICAgICAgICBjb25zdCBvYmogPSB7XG4gICAgICAgICAgICAgIGNvbW1lbnRQbjogdGhpcy5jb21tZW50UG4gKyAxLFxuICAgICAgICAgICAgICBtb21lbnRfaWQ6IG1vbWVudElkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmxvYWRNb3JlQ29tbWVudEFycmF5LnB1c2gob2JqKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRNb3JlQ29tbWVudEFycmF5W3JldE9iai5pbmRleF0uY29tbWVudFBuID0gcmV0T2JqLmNvbW1lbnRQbiArIDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIGFkZENvbW1lbnQodHlwZSwgaWQsIHJvb3RJZCwgdG9Db21tZW50SWQsIG5hbWUpIHtcbiAgICAgIGlmICh0b0NvbW1lbnRJZCA9PT0gdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCkge1xuICAgICAgICBzaG93TXNnKCfor7fkuI3opoHlm57lpI3oh6rlt7EnKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5jbGFzc0luZm8pIHtcbiAgICAgICAgc2hvd01zZygn6K+35YWI6YCJ5oup54+t57qnJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB0aGlzLmNvbW1lbnRGbGFnID0gdHJ1ZVxuICAgICAgdGhpcy5jdXJyZW50UmVwbHlJZCA9IGlkXG4gICAgICB0aGlzLmN1cnJlbnRSZXBseVJvb3RJZCA9IHR5cGUgPT09ICdhZGQnID8gMCA6IHJvb3RJZFxuICAgICAgaWYgKG5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmNvbW1lbnRJbnB1dCA9IGBAJHtuYW1lfTpgXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbW1lbnRJbnB1dCA9ICcnXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBiaW5kQ29tbWVudElucHV0ICh2YWx1ZSkge1xuICAgICAgdGhpcy5jb21tZW50SW5wdXQgPSB2YWx1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgY29tbWVudFN1cmUgKCkge1xuICAgICAgdGhpcy5jb21tZW50RmxhZyA9IGZhbHNlXG4gICAgICBhZGRDb21tZW50KHtcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgICBtb21lbnRfaWQ6IHRoaXMuY3VycmVudFJlcGx5SWQsXG4gICAgICAgIGNvbnRlbnQ6IHRoaXMuY3VycmVudFJlcGx5SWQgPiAwID8gdGhpcy5jb21tZW50SW5wdXQucmVwbGFjZSgvXkAuKzovLCAnJykgOiB0aGlzLmNvbW1lbnRJbnB1dCxcbiAgICAgICAgcm9vdF9pZDogdGhpcy5jdXJyZW50UmVwbHlSb290SWQsXG4gICAgICAgIHRvX2NvbW1lbnRfaWQ6IHRoaXMuY3VycmVudFJlcGx5Um9vdElkXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgdGhpcy5jb21tZW50SW5wdXQgPSAnJ1xuICAgICAgICAgIHRoaXMucmVzZXREYXRhKClcbiAgICAgICAgICB0aGlzLmdldFpvbmVMaXN0KClcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBqdW1wUHVibGlzaCh2YWx1ZSkge1xuICAgICAgbGV0IHVybCA9IHZhbHVlID09PSAnYWNjb3VudCcgPyAncmVjb3JkQ2FzaGZsb3cnIDogYHB1Ymxpc2g/dHlwZT0ke3ZhbHVlfWBcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6IHVybFxuICAgICAgfSlcbiAgICB9LFxuICAgIGNvbW1lbnRDYW5jZWwgKCkge1xuICAgICAgdGhpcy5jb21tZW50RmxhZyA9IGZhbHNlXG4gICAgICB0aGlzLmNvbW1lbnRJbnB1dCA9ICcnXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBqdW1wUGFnZSAocGFnZU5hbWUsIHR5cGUpIHtcbiAgICAgIHRoaXMucHVibGlzaEZsYWcgPSBmYWxzZVxuICAgICAgdGhpcy5zZXRGbGFnID0gZmFsc2VcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6IGAke3BhZ2VOYW1lfT90eXBlPSR7dHlwZX1gXG4gICAgICB9KVxuICAgIH0sXG4gICAgdG9nZ2xlTWVudSAodHlwZSkge1xuICAgICAgaWYgKCF0aGlzLmNsYXNzSW5mbykge1xuICAgICAgICBzaG93TXNnKCfor7fpgInnu5Hlrprnj63nuqcnLCAzMDAwKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHRoaXNbdHlwZV0gPSAhdGhpc1t0eXBlXVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgY2xvc2VUb2dnbGUgKCkge1xuICAgICAgdGhpcy5zZXRGbGFnID0gZmFsc2VcbiAgICAgIHRoaXMucHVibGlzaEZsYWcgPSBmYWxzZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgcHJldmlldyhpbWcsIGltZ0xpc3QpIHtcbiAgICAgIHByZXZpZXdJbWFnZShpbWcsIGltZ0xpc3QpXG4gICAgfSxcbiAgICBzZWxlY3RDYW5jZWwoKSB7XG4gICAgICB0aGlzLnNlbGVjdEZsYWcgPSBmYWxzZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgc2VsZWN0U3VyZSh2YWx1ZSkge1xuICAgICAgaWYgKCF2YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgc2hvd01zZygn6K+36YCJ5oupJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBjb25zdCB2YWwgPSB2YWx1ZVxuICAgICAgdGhpcy5zdHVkZW50SWRzID0gWy4uLnZhbF1cbiAgICAgIHRoaXMuc2VsZWN0RmxhZyA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB0aGlzLmFkZFRvT3JkZXIodGhpcy5jdXJyZW50Q29sbGVjdGlvbklkKVxuICAgIH1cbiAgfVxufVxuIl19