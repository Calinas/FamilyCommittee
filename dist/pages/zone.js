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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInpvbmUuanMiXSwibmFtZXMiOlsiWm9uZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJDdXJyZW50TW9kYWwiLCJTZWxlY3RNb2RhbCIsImRhdGEiLCJtZW51TGlzdCIsInRleHQiLCJ0eXBlIiwic3JjIiwiY29tbWVudEZsYWciLCJzZWxlY3RGbGFnIiwiYWN0aXZlVHlwZSIsInNldEZsYWciLCJwdWJsaXNoRmxhZyIsImNpcmNsZXMiLCJjb2xsZWN0aW9uIiwibm90aWZ5IiwiYWN0aXZpdHkiLCJhY2NvdW50IiwicG4iLCJwcyIsImxpc3QiLCJwYXlNZW1iZXJMaXN0IiwiY2xhc3NJbmZvIiwibWVtYmVySW5mbyIsInNjaG9vbEluZm8iLCJsb2FkaW5nIiwibG9hZEZpbmlzaGVkIiwiY29tbWVudElucHV0IiwiY3VycmVudFJlcGx5SWQiLCJjdXJyZW50UmVwbHlSb290SWQiLCJjdXJyZW50UmVwbHlUb0NvbW1lbnRJZCIsImN1cnJlcm50Sm9pbkFjaXRpdnl0SWQiLCJjdXJyZXJudFN1YkFjdGl2aXR5SWQiLCJjdXJyZW50Q29sbGVjdGlvbklkIiwiYXV0aCIsInByZXNpZGVudCIsImZpbmFuY2UiLCJwaG90b3MiLCJjb21tZW50UG4iLCJjb21tZW50UHMiLCJjb21tZW50T2Zmc2V0IiwiY29tbWVudExvYWRGaW5pc2hlZCIsIm1lbWJlckxpc3QiLCJzdHVkZW50SWRzIiwiZmlyc3RJbml0IiwicGF5bWVudExvY2tlZCIsImxvYWRNb3JlQ29tbWVudEFycmF5Iiwid2F0Y2giLCJuZXdWYWwiLCJvbGRWYWwiLCJyZXNldERhdGEiLCJnZXRBdXRoTGlzdCIsImdldFpvbmVMaXN0IiwiY3VycmVudEpvaW5BY3Rpdml0eUlkIiwiJGFwcGx5IiwibWV0aG9kcyIsInBheSIsIm1vbWVudElkIiwiY29sbGVjdGlvbklkIiwiY2xhc3NfaWQiLCJpZCIsIm1vbWVudF9pZCIsImlzX3BheSIsInRoZW4iLCJyZXMiLCJsZW5ndGgiLCJwdXNoIiwiYWRkVG9PcmRlciIsInN1Ym1pdEpvaW5BY3Rpdml0eSIsImFjdGl2aXR5X2l0ZW1faWQiLCJhY3Rpdml0eV9pZCIsInN1Y2Nlc3MiLCJqb2luQWN0aXZpdHkiLCJzdWJJZCIsImxpc3RJbmRleCIsImFjdGl2aXR5SW5kZXgiLCJpbmRleCIsImluZGV4T2YiLCJzcGxpY2UiLCJpbmZvIiwiaXRlbSIsImNoZWNrZWQiLCJsb2FkTW9yZUNvbW1lbnQiLCJpZHgiLCJyZXRPYmoiLCJmaW5kTG9hZG1vcmVDb21tZW50SW5mbyIsIm9mZnNldCIsInJlc3VsdExpc3QiLCJjb21tZW50X2xpc3QiLCJvYmoiLCJhZGRDb21tZW50Iiwicm9vdElkIiwidG9Db21tZW50SWQiLCJuYW1lIiwibWVtYmVyX2lkIiwidW5kZWZpbmVkIiwiYmluZENvbW1lbnRJbnB1dCIsInZhbHVlIiwiY29tbWVudFN1cmUiLCJjb250ZW50IiwicmVwbGFjZSIsInJvb3RfaWQiLCJ0b19jb21tZW50X2lkIiwianVtcFB1Ymxpc2giLCJ1cmwiLCJ3eCIsIm5hdmlnYXRlVG8iLCJjb21tZW50Q2FuY2VsIiwianVtcFBhZ2UiLCJwYWdlTmFtZSIsInRvZ2dsZU1lbnUiLCJjbG9zZVRvZ2dsZSIsInByZXZpZXciLCJpbWciLCJpbWdMaXN0Iiwic2VsZWN0Q2FuY2VsIiwic2VsZWN0U3VyZSIsInZhbCIsImdldFN0b3JhZ2VTeW5jIiwiY2hlY2tEYXRhRXhpc3QiLCJyZUxhdW5jaCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwidXNlckRhdGEiLCJjaGVja0F1dGgiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsImkiLCJsZW4iLCJjb2RlIiwiaXNBdXRoIiwiaXNfYXV0aCIsImZvcm1hdEFsbEF1dGgiLCJmb3JtYXRTaW5nbGVBdXRoIiwic2VlX3R5cGUiLCJjb21tZW50X2NvdW50Iiwib3JkZXJfaWQiLCJfdGhpcyIsInBheW1lbnRfcGFyYW1zIiwicmVxdWVzdFBheW1lbnQiLCJ0aW1lU3RhbXAiLCJTdHJpbmciLCJub25jZVN0ciIsInBhY2thZ2UiLCJwYXlTaWduIiwic2lnblR5cGUiLCJmYWlsIiwic3R1ZGVudF9pZHMiLCJjb2xsZWN0aW9uX2l0ZW1faWQiLCJwYXltZW50UGFyYW1zIiwiYXJyIiwiY3VycmVudElkIiwiYXNzaWduIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLEk7Ozs7Ozs7Ozs7Ozs7O3FMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixJQURqQjtBQUVQQyw2QkFBdUI7QUFGaEIsSyxTQUlWQyxPLEdBQVUsRSxTQUNYQyxNLEdBQVMsRUFBQyxnQkFBZSxFQUFDLGVBQWMsSUFBZixFQUFvQixpQkFBZ0IsSUFBcEMsRUFBeUMsbUJBQWtCLFNBQTNELEVBQXFFLGdCQUFlLEVBQXBGLEVBQXVGLG9CQUFtQixhQUExRyxFQUF3SCw0QkFBMkIsY0FBbkosRUFBa0ssY0FBYSxFQUEvSyxFQUFoQixFQUFtTSxlQUFjLEVBQUMsb0JBQW1CLFlBQXBCLEVBQWlDLG9CQUFtQixlQUFwRCxFQUFqTixFLFNBQ1RDLE8sR0FBVSxFQUFDLGdCQUFlLEVBQUMsZUFBYyxlQUFmLEVBQStCLGFBQVksYUFBM0MsRUFBeUQsY0FBYSxrQkFBdEUsRUFBaEIsRUFBMEcsZUFBYyxFQUFDLGVBQWMsY0FBZixFQUE4QixhQUFZLFlBQTFDLEVBQXhILEUsU0FDVEMsVSxHQUFhO0FBQ1ZDLDBDQURVO0FBRVZDO0FBRlUsSyxTQUlaQyxJLEdBQU87QUFDTEMsZ0JBQVUsQ0FDUjtBQUNFQyxjQUFNLEtBRFI7QUFFRUMsY0FBTSxNQUZSO0FBR0VDLGFBQUs7QUFIUCxPQURRLEVBTVI7QUFDRUYsY0FBTSxJQURSO0FBRUVDLGNBQU0sT0FGUjtBQUdFQyxhQUFLO0FBSFAsT0FOUSxF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LEVBQWpDO0FBQ0QsT0FORDtBQU9EOzs7NENBQ3VCNEYsRyxFQUFLQyxTLEVBQVc7QUFDdEMsVUFBSXJFLFNBQVMsRUFBYjtBQUNBLFdBQUksSUFBSTZDLElBQUksQ0FBUixFQUFVQyxNQUFNc0IsSUFBSXZGLE1BQXhCLEVBQWdDZ0UsSUFBSUMsR0FBcEMsRUFBeUNELEdBQXpDLEVBQThDO0FBQzVDLFlBQUd1QixJQUFJdkIsQ0FBSixFQUFPcEUsU0FBUCxLQUFxQjRGLFNBQXhCLEVBQW1DO0FBQ2pDckUsbUJBQVN5QyxPQUFPNkIsTUFBUCxDQUFjLEVBQWQsRUFBaUJGLElBQUl2QixDQUFKLENBQWpCLEVBQXdCO0FBQy9CckQsbUJBQU9xRDtBQUR3QixXQUF4QixDQUFUO0FBR0Q7QUFDRjtBQUNELGFBQU83QyxNQUFQO0FBQ0Q7Ozs7RUE5TytCdUUsZUFBS0MsSTs7a0JBQWxCbkssSSIsImZpbGUiOiJ6b25lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IFNlbGVjdE1vZGFsIGZyb20gJy4uL2NvbXBvbmVudHMvc2VsZWN0TW9kYWwnXG5pbXBvcnQgQ3VycmVudE1vZGFsIGZyb20gJy4uL2NvbXBvbmVudHMvY29tbWVudE1vZGFsJ1xuaW1wb3J0IHsgc2hvd01zZywgcHJldmlld0ltYWdlIH0gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xuaW1wb3J0IHsgZ2V0Q2lyY2xlTGlzdCwgYWRkQ29tbWVudCwgam9pbkFjdGl2aXR5LCBnZXRDb21tZW50TGlzdCB9IGZyb20gJy4uL2FwaS96b25lJ1xuaW1wb3J0IHsgYWRkT3JkZXIsIGdldFBheW1lbnRQYXJhbXMgfSBmcm9tICcuLi9hcGkvZmluYW5jZSdcbmltcG9ydCB7IGdldEF1dGggfSBmcm9tICcuLi9hcGkvYXV0aG9yaXplJ1xuaW1wb3J0IHsgY2hlY2tTdHVkZW50IH0gZnJvbSAnLi4vYXBpL3VzZXInXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBab25lIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflj5HnjrAnLFxuICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogdHJ1ZVxuICB9XG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJDdXJyZW50TW9kYWxcIjp7XCJzdXJlQnRuVGV4dFwiOlwi56Gu6K6kXCIsXCJjYW5jZWxCdG5UZXh0XCI6XCLlj5bmtohcIixcInBsYWNlaG9sZGVyVGV4dFwiOlwi6K+36L6T5YWl6K+E6K665YaF5a65XCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmZsYWcuc3luY1wiOlwiY29tbWVudEZsYWdcIixcInYtYmluZDpjb21tZW50SW5wdXQuc3luY1wiOlwiY29tbWVudElucHV0XCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJTZWxlY3RNb2RhbFwiOntcInYtYmluZDpmbGFnLnN5bmNcIjpcInNlbGVjdEZsYWdcIixcInYtYmluZDpsaXN0LnN5bmNcIjpcInBheU1lbWJlckxpc3RcIn19O1xyXG4kZXZlbnRzID0ge1wiQ3VycmVudE1vZGFsXCI6e1widi1vbjpjYW5jZWxcIjpcImNvbW1lbnRDYW5jZWxcIixcInYtb246c3VyZVwiOlwiY29tbWVudFN1cmVcIixcInYtb246aW5wdXRcIjpcImJpbmRDb21tZW50SW5wdXRcIn0sXCJTZWxlY3RNb2RhbFwiOntcInYtb246Y2FuY2VsXCI6XCJzZWxlY3RDYW5jZWxcIixcInYtb246c3VyZVwiOlwic2VsZWN0U3VyZVwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgIEN1cnJlbnRNb2RhbCxcbiAgICBTZWxlY3RNb2RhbFxuICB9XG4gIGRhdGEgPSB7XG4gICAgbWVudUxpc3Q6IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ+WutumVv+WciCcsXG4gICAgICAgIHR5cGU6ICd6b25lJyxcbiAgICAgICAgc3JjOiAnL2ltYWdlcy9pY29uLzIuanBnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ+aUtui0uScsXG4gICAgICAgIHR5cGU6ICdtb25leScsXG4gICAgICAgIHNyYzogJy9pbWFnZXMvaWNvbi9tb25leS5qcGcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAn6YCa55+lJyxcbiAgICAgICAgdHlwZTogJ25vdGljZScsXG4gICAgICAgIHNyYzogJy9pbWFnZXMvaWNvbi80LmpwZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICfmtLvliqgnLFxuICAgICAgICB0eXBlOiAnYWN0aXZpdHknLFxuICAgICAgICBzcmM6ICcvaW1hZ2VzL2ljb24vNS5qcGcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAn6K6w6LSmJyxcbiAgICAgICAgdHlwZTogJ2FjY291bnQnLFxuICAgICAgICBzcmM6ICcvaW1hZ2VzL2ljb24vcGhvdG9zLmpwZydcbiAgICAgIH1cbiAgICBdLFxuICAgIGNvbW1lbnRGbGFnOiBmYWxzZSxcbiAgICBzZWxlY3RGbGFnOiBmYWxzZSxcbiAgICBhY3RpdmVUeXBlOiAnYWxsJyxcbiAgICBzZXRGbGFnOiBmYWxzZSxcbiAgICBwdWJsaXNoRmxhZzogZmFsc2UsXG4gICAgdHlwZToge1xuICAgICAgY2lyY2xlczogJ+WutumVv+WciCcsXG4gICAgICBjb2xsZWN0aW9uOiAn5pS25qy+JyxcbiAgICAgIG5vdGlmeTogJ+mAmuefpScsXG4gICAgICBhY3Rpdml0eTogJ+a0u+WKqCcsXG4gICAgICBhY2NvdW50OiAn6K6w6LSmJ1xuICAgIH0sXG4gICAgcG46IDEsXG4gICAgcHM6IDEwLFxuICAgIGxpc3Q6IFtdLFxuICAgIHBheU1lbWJlckxpc3Q6IFtdLFxuICAgIGNsYXNzSW5mbzogbnVsbCxcbiAgICBtZW1iZXJJbmZvOiBudWxsLFxuICAgIHNjaG9vbEluZm86IG51bGwsXG4gICAgbG9hZGluZzogZmFsc2UsXG4gICAgbG9hZEZpbmlzaGVkOiBmYWxzZSxcbiAgICBjb21tZW50SW5wdXQ6ICcnLFxuICAgIGN1cnJlbnRSZXBseUlkOiAtMSxcbiAgICBjdXJyZW50UmVwbHlSb290SWQ6IC0xLFxuICAgIGN1cnJlbnRSZXBseVRvQ29tbWVudElkOiAtMSxcbiAgICBjdXJyZXJudEpvaW5BY2l0aXZ5dElkOiAtMSxcbiAgICBjdXJyZXJudFN1YkFjdGl2aXR5SWQ6IFtdLFxuICAgIGN1cnJlbnRDb2xsZWN0aW9uSWQ6IC0xLFxuICAgIGF1dGg6IHtcbiAgICAgIHByZXNpZGVudDogZmFsc2UsXG4gICAgICBmaW5hbmNlOiBmYWxzZSxcbiAgICAgIGFjdGl2aXR5OiBmYWxzZSxcbiAgICAgIG5vdGlmeTogZmFsc2UsXG4gICAgICBwaG90b3M6IGZhbHNlLFxuICAgICAgY2lyY2xlczogZmFsc2VcbiAgICB9LFxuICAgIGNvbW1lbnRQbjogMixcbiAgICBjb21tZW50UHM6IDYsXG4gICAgY29tbWVudE9mZnNldDogNixcbiAgICBjb21tZW50TG9hZEZpbmlzaGVkOiBmYWxzZSxcbiAgICBtZW1iZXJMaXN0OiBbXSxcbiAgICBzdHVkZW50SWRzOiBbXSxcbiAgICBmaXJzdEluaXQ6IHRydWUsXG4gICAgcGF5bWVudExvY2tlZDogZmFsc2UsXG4gICAgbG9hZE1vcmVDb21tZW50QXJyYXk6IFtdXG4gIH1cbiAgd2F0Y2ggPSB7XG4gICAgY2xhc3NJbmZvKG5ld1ZhbCwgb2xkVmFsKSB7XG4gICAgICAvLyDliIfmjaLkuobnj63nuqfkuYvlkI7mlbDmja7opoHmm7TmlrBcbiAgICAgIGlmIChvbGRWYWwgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5yZXNldERhdGEoKVxuICAgICAgICB0aGlzLmdldEF1dGhMaXN0KClcbiAgICAgICAgdGhpcy5nZXRab25lTGlzdCgpXG4gICAgICB9XG4gICAgfSxcbiAgICBjdXJyZW50Sm9pbkFjdGl2aXR5SWQobmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgIGlmIChuZXdWYWwgPiAwKSB7XG4gICAgICAgIHRoaXMuY3VycmVybnRTdWJBY3Rpdml0eUlkID0gW11cbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXNldERhdGEoKSB7XG4gICAgdGhpcy5jb21tZW50TG9hZEZpbmlzaGVkID0gZmFsc2VcbiAgICB0aGlzLmNvbW1lbnRQbiA9IDJcbiAgICB0aGlzLmNvbW1lbnRQcyA9IDZcbiAgICB0aGlzLnN0dWRlbnRJZHMgPSBbXVxuICAgIHRoaXMucGF5bWVudExvY2tlZCA9IGZhbHNlXG4gICAgdGhpcy5wbiA9IDFcbiAgICB0aGlzLmxpc3QgPSBbXVxuICAgIHRoaXMuJGFwcGx5KClcbiAgfVxuICBvblB1bGxEb3duUmVmcmVzaCgpIHtcbiAgICB0aGlzLnJlc2V0RGF0YSgpXG4gICAgdGhpcy5nZXRab25lTGlzdCgpXG4gIH1cbiAgb25SZWFjaEJvdHRvbSgpIHtcbiAgICBpZiAodGhpcy5sb2FkaW5nIHx8IHRoaXMubG9hZEZpbmlzaGVkKSByZXR1cm5cbiAgICB0aGlzLmdldFpvbmVMaXN0KClcbiAgfVxuICBvblNob3coKSB7XG4gICAgdGhpcy5jdXJyZXJudEpvaW5BY2l0aXZ5dElkID0gLTFcbiAgICB0aGlzLmN1cnJlcm50U3ViQWN0aXZpdHlJZCA9IFtdXG4gICAgdGhpcy5jbGFzc0luZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnY2xhc3NJbmZvJylcbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgb25Mb2FkKCkge1xuICAgIGlmICghdGhpcy5jaGVja0RhdGFFeGlzdCgnbWVtYmVySW5mbycpKSB7XG4gICAgICB3eC5yZUxhdW5jaCh7XG4gICAgICAgIHVybDogJ2xvZ2luJ1xuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jbGFzc0luZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnY2xhc3NJbmZvJylcbiAgICAgIHRoaXMuY2xhc3NJbmZvICYmIHRoaXMuZ2V0QXV0aExpc3QoKVxuICAgICAgdGhpcy5tZW1iZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nKVxuICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckRhdGEgPSB0aGlzLm1lbWJlckluZm9cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIHRoaXMuZ2V0Wm9uZUxpc3QoKVxuICAgIH1cbiAgfVxuICBnZXRBdXRoTGlzdCgpIHtcbiAgICBnZXRBdXRoKHtcbiAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZFxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHRoaXMuY2hlY2tBdXRoKHJlcy5kYXRhLmRhdGEpXG4gICAgfSlcbiAgfVxuICBmb3JtYXRBbGxBdXRoKG9iaikge1xuICAgIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgb2JqW2tleV0gPSB0cnVlXG4gICAgfSlcbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgZm9ybWF0U2luZ2xlQXV0aChuYW1lKSB7XG4gICAgdGhpcy5hdXRoW25hbWVdID0gdHJ1ZVxuICAgIHRoaXMuJGFwcGx5KClcbiAgfVxuICBjaGVja0F1dGgobGlzdCkge1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBsaXN0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBsZXQge2NvZGUsIGlzX2F1dGg6IGlzQXV0aH0gPSBsaXN0W2ldXG4gICAgICBpZiAoY29kZSA9PT0gJ3ByZXNpZGVudCcgJiYgaXNBdXRoKSB7XG4gICAgICAgIHRoaXMuZm9ybWF0QWxsQXV0aCh0aGlzLmF1dGgpXG4gICAgICAgIGJyZWFrXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpc0F1dGggJiYgdGhpcy5mb3JtYXRTaW5nbGVBdXRoKGNvZGUpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIGNoZWNrRGF0YUV4aXN0KGtleSkge1xuICAgIGlmICh3eC5nZXRTdG9yYWdlU3luYyhrZXkpKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICBnZXRab25lTGlzdCgpIHtcbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlXG4gICAgdGhpcy4kYXBwbHkoKVxuICAgIGNvbnN0IGlkID0gdGhpcy5jbGFzc0luZm8uaWRcbiAgICBnZXRDaXJjbGVMaXN0KHtcbiAgICAgIGNsYXNzX2lkOiBpZCxcbiAgICAgIHNlZV90eXBlOiBpZCA/ICcnIDogJ2FsbCcsXG4gICAgICB0eXBlOiB0aGlzLmFjdGl2ZVR5cGUsXG4gICAgICBwbjogdGhpcy5wbixcbiAgICAgIHBzOiB0aGlzLnBzLFxuICAgICAgY29tbWVudF9jb3VudDogM1xuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIGxldCB7IGxpc3QgfSA9IHJlcy5kYXRhXG4gICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZVxuICAgICAgdGhpcy5wbisrXG4gICAgICBpZiAobGlzdC5sZW5ndGggPCB0aGlzLnBzKSB7XG4gICAgICAgIHRoaXMubG9hZEZpbmlzaGVkID0gdHJ1ZVxuICAgICAgfVxuICAgICAgdGhpcy5saXN0ID0gWy4uLnRoaXMubGlzdCwgLi4ubGlzdF1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9KVxuICB9XG4gIHBheW1lbnRQYXJhbXMoaWQpIHtcbiAgICBnZXRQYXltZW50UGFyYW1zKHtcbiAgICAgIG9yZGVyX2lkOiBpZFxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIGxldCBfdGhpcyA9IHRoaXNcbiAgICAgIGxldCBkYXRhID0gcmVzLmRhdGEucGF5bWVudF9wYXJhbXNcbiAgICAgIHd4LnJlcXVlc3RQYXltZW50KHtcbiAgICAgICAgdGltZVN0YW1wOiBTdHJpbmcoZGF0YS50aW1lU3RhbXApLFxuICAgICAgICBub25jZVN0cjogZGF0YS5ub25jZVN0cixcbiAgICAgICAgcGFja2FnZTogZGF0YS5wYWNrYWdlLFxuICAgICAgICBwYXlTaWduOiBkYXRhLnBheVNpZ24sXG4gICAgICAgIHNpZ25UeXBlOiAnTUQ1JyxcbiAgICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgICBfdGhpcy5wYXltZW50TG9ja2VkID0gZmFsc2VcbiAgICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgICB9LFxuICAgICAgICBmYWlsKCkge1xuICAgICAgICAgIF90aGlzLnBheW1lbnRMb2NrZWQgPSBmYWxzZVxuICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuICBhZGRUb09yZGVyKGlkKSB7XG4gICAgYWRkT3JkZXIoe1xuICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgc3R1ZGVudF9pZHM6IHRoaXMuc3R1ZGVudElkcyxcbiAgICAgIGNvbGxlY3Rpb25faXRlbV9pZDogaWRcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICB0aGlzLnBheW1lbnRQYXJhbXMocmVzLmRhdGEuZGF0YS5pZClcbiAgICB9KVxuICB9XG4gIGZpbmRMb2FkbW9yZUNvbW1lbnRJbmZvKGFyciwgY3VycmVudElkKSB7XG4gICAgbGV0IHJldE9iaiA9IHt9XG4gICAgZm9yKGxldCBpID0gMCxsZW4gPSBhcnIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmKGFycltpXS5tb21lbnRfaWQgPT09IGN1cnJlbnRJZCkge1xuICAgICAgICByZXRPYmogPSBPYmplY3QuYXNzaWduKHt9LGFycltpXSx7XG4gICAgICAgICAgaW5kZXg6IGlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJldE9ialxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgcGF5KG1vbWVudElkLCBjb2xsZWN0aW9uSWQpIHtcbiAgICAgIGlmICh0aGlzLnBheW1lbnRMb2NrZWQpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB0aGlzLnBheW1lbnRMb2NrZWQgPSB0cnVlXG4gICAgICBjaGVja1N0dWRlbnQoe1xuICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXG4gICAgICAgIG1vbWVudF9pZDogbW9tZW50SWQsXG4gICAgICAgIGlzX3BheTogMFxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICB0aGlzLnBheU1lbWJlckxpc3QgPSByZXMuZGF0YS5saXN0XG4gICAgICAgIGlmICghdGhpcy5wYXlNZW1iZXJMaXN0Lmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMucGF5bWVudExvY2tlZCA9IGZhbHNlXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgIHNob3dNc2coJ+ivt+WLv+mHjeWkjee8tOi0uScpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucGF5TWVtYmVyTGlzdC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RGbGFnID0gdHJ1ZVxuICAgICAgICAgIHRoaXMuY3VycmVudENvbGxlY3Rpb25JZCA9IGNvbGxlY3Rpb25JZFxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnN0dWRlbnRJZHMgPSBbXVxuICAgICAgICAgIHRoaXMuc3R1ZGVudElkcy5wdXNoKHRoaXMucGF5TWVtYmVyTGlzdFswXS5pZClcbiAgICAgICAgICB0aGlzLmFkZFRvT3JkZXIoY29sbGVjdGlvbklkKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgc3VibWl0Sm9pbkFjdGl2aXR5KCkge1xuICAgICAgam9pbkFjdGl2aXR5KHtcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgICBhY3Rpdml0eV9pdGVtX2lkOiB0aGlzLmN1cnJlcm50U3ViQWN0aXZpdHlJZCxcbiAgICAgICAgYWN0aXZpdHlfaWQ6IHRoaXMuY3VycmVybnRKb2luQWNpdGl2eXRJZFxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgIHNob3dNc2coJ+aPkOS6pOaIkOWKnycpXG4gICAgICAgICAgdGhpcy5jdXJyZXJudFN1YkFjdGl2aXR5SWQgPSBbXVxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIGpvaW5BY3Rpdml0eShpZCwgc3ViSWQsIGxpc3RJbmRleCwgYWN0aXZpdHlJbmRleCkge1xuICAgICAgaWYgKCF0aGlzLmNsYXNzSW5mbykge1xuICAgICAgICBzaG93TXNnKCfor7flhYjpgInmi6nnj63nuqcnKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHRoaXMuY3VycmVybnRKb2luQWNpdGl2eXRJZCA9IGlkXG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuY3VycmVybnRTdWJBY3Rpdml0eUlkLmluZGV4T2Yoc3ViSWQpXG4gICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICB0aGlzLmN1cnJlcm50U3ViQWN0aXZpdHlJZC5zcGxpY2UoaW5kZXgsIDEpXG4gICAgICAgIHRoaXMubGlzdFtsaXN0SW5kZXhdLmluZm8uaXRlbVthY3Rpdml0eUluZGV4XS5jaGVja2VkID0gZmFsc2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY3VycmVybnRTdWJBY3Rpdml0eUlkLnB1c2goc3ViSWQpXG4gICAgICAgIHRoaXMubGlzdFtsaXN0SW5kZXhdLmluZm8uaXRlbVthY3Rpdml0eUluZGV4XS5jaGVja2VkID0gdHJ1ZVxuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgbG9hZE1vcmVDb21tZW50KG1vbWVudElkLCBpZHgpIHtcbiAgICAgIGNvbnN0IHJldE9iaiA9IHRoaXMuZmluZExvYWRtb3JlQ29tbWVudEluZm8odGhpcy5sb2FkTW9yZUNvbW1lbnRBcnJheSwgbW9tZW50SWQpO1xuICAgICAgZ2V0Q29tbWVudExpc3Qoe1xuICAgICAgICBtb21lbnRfaWQ6IG1vbWVudElkLFxuICAgICAgICBwczogdGhpcy5jb21tZW50UHMsXG4gICAgICAgIHBuOiByZXRPYmouY29tbWVudFBuID8gcmV0T2JqLmNvbW1lbnRQbiA6IHRoaXMuY29tbWVudFBuLFxuICAgICAgICBvZmZzZXQ6IHRoaXMuY29tbWVudE9mZnNldFxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgIGxldCByZXN1bHRMaXN0ID0gcmVzLmRhdGEubGlzdFxuICAgICAgICAgIGxldCB7bGlzdH0gPSB0aGlzLmxpc3RbaWR4XS5jb21tZW50X2xpc3RcbiAgICAgICAgICBsaXN0ID0gWy4uLmxpc3QsIC4uLnJlc3VsdExpc3RdXG4gICAgICAgICAgdGhpcy5saXN0W2lkeF0uY29tbWVudF9saXN0Lmxpc3QgPSBsaXN0XG4gICAgICAgICAgaWYgKHJlc3VsdExpc3QubGVuZ3RoIDwgdGhpcy5jb21tZW50UHMpIHtcbiAgICAgICAgICAgIHRoaXMubGlzdFtpZHhdLmNvbW1lbnRMb2FkRmluaXNoZWQgPSB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghcmV0T2JqLmNvbW1lbnRQbikge1xuICAgICAgICAgICAgY29uc3Qgb2JqID0ge1xuICAgICAgICAgICAgICBjb21tZW50UG46IHRoaXMuY29tbWVudFBuICsgMSxcbiAgICAgICAgICAgICAgbW9tZW50X2lkOiBtb21lbnRJZFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5sb2FkTW9yZUNvbW1lbnRBcnJheS5wdXNoKG9iailcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2FkTW9yZUNvbW1lbnRBcnJheVtyZXRPYmouaW5kZXhdLmNvbW1lbnRQbiA9IHJldE9iai5jb21tZW50UG4gKyAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBhZGRDb21tZW50KHR5cGUsIGlkLCByb290SWQsIHRvQ29tbWVudElkLCBuYW1lKSB7XG4gICAgICBpZiAodG9Db21tZW50SWQgPT09IHRoaXMubWVtYmVySW5mby5tZW1iZXJfaWQpIHtcbiAgICAgICAgc2hvd01zZygn6K+35LiN6KaB5Zue5aSN6Ieq5bexJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuY2xhc3NJbmZvKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+WFiOmAieaLqeePree6pycpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdGhpcy5jb21tZW50RmxhZyA9IHRydWVcbiAgICAgIHRoaXMuY3VycmVudFJlcGx5SWQgPSBpZFxuICAgICAgdGhpcy5jdXJyZW50UmVwbHlSb290SWQgPSB0eXBlID09PSAnYWRkJyA/IDAgOiByb290SWRcbiAgICAgIGlmIChuYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5jb21tZW50SW5wdXQgPSBgQCR7bmFtZX06YFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb21tZW50SW5wdXQgPSAnJ1xuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgYmluZENvbW1lbnRJbnB1dCAodmFsdWUpIHtcbiAgICAgIHRoaXMuY29tbWVudElucHV0ID0gdmFsdWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGNvbW1lbnRTdXJlICgpIHtcbiAgICAgIHRoaXMuY29tbWVudEZsYWcgPSBmYWxzZVxuICAgICAgYWRkQ29tbWVudCh7XG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgICAgbW9tZW50X2lkOiB0aGlzLmN1cnJlbnRSZXBseUlkLFxuICAgICAgICBjb250ZW50OiB0aGlzLmN1cnJlbnRSZXBseUlkID4gMCA/IHRoaXMuY29tbWVudElucHV0LnJlcGxhY2UoL15ALis6LywgJycpIDogdGhpcy5jb21tZW50SW5wdXQsXG4gICAgICAgIHJvb3RfaWQ6IHRoaXMuY3VycmVudFJlcGx5Um9vdElkLFxuICAgICAgICB0b19jb21tZW50X2lkOiB0aGlzLmN1cnJlbnRSZXBseVJvb3RJZFxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgIHRoaXMuY29tbWVudElucHV0ID0gJydcbiAgICAgICAgICB0aGlzLnJlc2V0RGF0YSgpXG4gICAgICAgICAgdGhpcy5nZXRab25lTGlzdCgpXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAganVtcFB1Ymxpc2godmFsdWUpIHtcbiAgICAgIGxldCB1cmwgPSB2YWx1ZSA9PT0gJ2FjY291bnQnID8gJ3JlY29yZENhc2hmbG93JyA6IGBwdWJsaXNoP3R5cGU9JHt2YWx1ZX1gXG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiB1cmxcbiAgICAgIH0pXG4gICAgfSxcbiAgICBjb21tZW50Q2FuY2VsICgpIHtcbiAgICAgIHRoaXMuY29tbWVudEZsYWcgPSBmYWxzZVxuICAgICAgdGhpcy5jb21tZW50SW5wdXQgPSAnJ1xuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAganVtcFBhZ2UgKHBhZ2VOYW1lLCB0eXBlKSB7XG4gICAgICB0aGlzLnB1Ymxpc2hGbGFnID0gZmFsc2VcbiAgICAgIHRoaXMuc2V0RmxhZyA9IGZhbHNlXG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiBgJHtwYWdlTmFtZX0/dHlwZT0ke3R5cGV9YFxuICAgICAgfSlcbiAgICB9LFxuICAgIHRvZ2dsZU1lbnUgKHR5cGUpIHtcbiAgICAgIGlmICghdGhpcy5jbGFzc0luZm8pIHtcbiAgICAgICAgc2hvd01zZygn6K+36YCJ57uR5a6a54+t57qnJywgMzAwMClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB0aGlzW3R5cGVdID0gIXRoaXNbdHlwZV1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGNsb3NlVG9nZ2xlICgpIHtcbiAgICAgIHRoaXMuc2V0RmxhZyA9IGZhbHNlXG4gICAgICB0aGlzLnB1Ymxpc2hGbGFnID0gZmFsc2VcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIHByZXZpZXcoaW1nLCBpbWdMaXN0KSB7XG4gICAgICBwcmV2aWV3SW1hZ2UoaW1nLCBpbWdMaXN0KVxuICAgIH0sXG4gICAgc2VsZWN0Q2FuY2VsKCkge1xuICAgICAgdGhpcy5zZWxlY3RGbGFnID0gZmFsc2VcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIHNlbGVjdFN1cmUodmFsdWUpIHtcbiAgICAgIGlmICghdmFsdWUubGVuZ3RoKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+mAieaLqScpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgY29uc3QgdmFsID0gdmFsdWVcbiAgICAgIHRoaXMuc3R1ZGVudElkcyA9IFsuLi52YWxdXG4gICAgICB0aGlzLnNlbGVjdEZsYWcgPSBmYWxzZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgdGhpcy5hZGRUb09yZGVyKHRoaXMuY3VycmVudENvbGxlY3Rpb25JZClcbiAgICB9XG4gIH1cbn1cbiJdfQ==