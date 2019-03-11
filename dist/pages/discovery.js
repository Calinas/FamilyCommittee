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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Discovery = function (_wepy$page) {
  _inherits(Discovery, _wepy$page);

  function Discovery() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Discovery);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Discovery.__proto__ || Object.getPrototypeOf(Discovery)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '家长圈子',
      enablePullDownRefresh: true
    }, _this.$repeat = {}, _this.$props = { "CurrentModal": { "sureBtnText": "确认", "cancelBtnText": "取消", "placeholderText": "请输入评论内容", "xmlns:v-bind": "", "v-bind:flag.sync": "commentFlag", "v-bind:commentInput.sync": "commentInput", "xmlns:v-on": "" }, "SelectModal": { "v-bind:flag.sync": "selectFlag", "v-bind:list.sync": "payMemberList" }, "shareModal": { "v-bind:flag.sync": "showShareFlag", "v-bind:title.sync": "shareTitle", "v-bind:imgSrc.sync": "shareImg" } }, _this.$events = { "CurrentModal": { "v-on:cancel": "commentCancel", "v-on:sure": "commentSure", "v-on:input": "bindCommentInput" }, "SelectModal": { "v-on:cancel": "selectCancel", "v-on:sure": "selectSure" }, "shareModal": { "v-on:cancel": "cancelShareFn", "v-on:sure": "cancelShareFn" } }, _this.components = {
      CurrentModal: _commentModal2.default,
      SelectModal: _selectModal2.default,
      shareModal: _shareModal2.default
    }, _this.data = {
      commentFlag: false,
      pn: 1,
      ps: 10,
      list: [],
      classInfo: null,
      memberInfo: null,
      schoolInfo: null,
      loading: false,
      loadFinished: false,
      commentInput: '',
      currentReplyId: -1,
      currentReplyRootId: -1,
      currentReplyToCommentId: -1,
      commentPn: 2,
      commentPs: 6,
      commentOffset: 6,
      commentLoadFinished: false,
      memberList: [],
      loadMoreCommentArray: [],
      shareTitle: '',
      showShareFlag: false,
      shareImg: '../images/share/circles.jpg'
    }, _this.watch = {
      classInfo: function classInfo(newVal, oldVal) {
        // 切换了班级之后数据要更新
        if (oldVal !== null) {
          this.resetData();
          this.getZoneList();
        }
      }
    }, _this.methods = {
      cancelShareFn: function cancelShareFn() {
        this.showShareFlag = false;
        this.$apply();
      },
      shareCircle: function shareCircle() {
        this.shareTitle = this.memberInfo.nickname + '\u5206\u4EAB\u4E86\u4E00\u4E2A\u53D1\u73B0\uFF0C\u70B9\u51FB\u6D4F\u89C8';
        this.showShareFlag = true;
        this.$apply();
      },
      removeCircle: function removeCircle(id, idx) {
        var _this2 = this;

        (0, _zone.deleteCircle)({
          moment_id: id,
          class_id: this.classInfo.id
        }).then(function (res) {
          if (res.data.success) {
            (0, _common.showMsg)('成功删除');
            _this2.list.splice(idx, 1);
            _this2.$apply();
          }
        });
      },
      loadMoreComment: function loadMoreComment(momentId, idx) {
        var _this3 = this;

        var retObj = this.findLoadmoreCommentInfo(this.loadMoreCommentArray, momentId);
        (0, _zone.getCommentList)({
          moment_id: momentId,
          ps: this.commentPs,
          pn: retObj.commentPn ? retObj.commentPn : this.commentPn,
          offset: this.commentOffset
        }).then(function (res) {
          if (res.data.success) {
            var resultList = res.data.list;
            var list = _this3.list[idx].comment_list.list;

            list = [].concat(_toConsumableArray(list), _toConsumableArray(resultList));
            _this3.list[idx].comment_list.list = list;
            if (resultList.length < _this3.commentPs) {
              _this3.list[idx].commentLoadFinished = true;
            }
            if (!retObj.commentPn) {
              var obj = {
                commentPn: _this3.commentPn + 1,
                moment_id: momentId
              };
              _this3.loadMoreCommentArray.push(obj);
            } else {
              _this3.loadMoreCommentArray[retObj.index].commentPn = retObj.commentPn + 1;
            }
            _this3.$apply();
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
      preview: function preview(img, imgList) {
        (0, _common.previewImage)(img, imgList);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Discovery, [{
    key: 'resetData',
    value: function resetData() {
      this.loadMoreCommentArray = [];
      this.commentLoadFinished = false;
      this.commentPn = 2;
      this.commentPs = 6;
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
    key: 'onLoad',
    value: function onLoad() {
      this.classInfo = wx.getStorageSync('classInfo');
      this.memberInfo = wx.getStorageSync('memberInfo');
      this.$parent.globalData.userData = this.memberInfo;
      this.$apply();
      this.getZoneList();
    }
  }, {
    key: 'getZoneList',
    value: function getZoneList() {
      var _this5 = this;

      this.loading = true;
      this.$apply();
      var id = this.classInfo.id;
      (0, _zone.getCircleList)({
        class_id: id,
        see_type: 'all',
        type: 'circles',
        pn: this.pn,
        ps: this.ps,
        comment_count: 3
      }).then(function (res) {
        var list = res.data.list;

        _this5.loading = false;
        _this5.pn++;
        if (list.length < _this5.ps) {
          _this5.loadFinished = true;
        }
        _this5.list = [].concat(_toConsumableArray(_this5.list), _toConsumableArray(list));
        _this5.$apply();
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
        title: this.shareTitle,
        imageUrl: this.shareImg
      };
    }
  }]);

  return Discovery;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Discovery , 'pages/discovery'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc2NvdmVyeS5qcyJdLCJuYW1lcyI6WyJEaXNjb3ZlcnkiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiQ3VycmVudE1vZGFsIiwiU2VsZWN0TW9kYWwiLCJzaGFyZU1vZGFsIiwiZGF0YSIsImNvbW1lbnRGbGFnIiwicG4iLCJwcyIsImxpc3QiLCJjbGFzc0luZm8iLCJtZW1iZXJJbmZvIiwic2Nob29sSW5mbyIsImxvYWRpbmciLCJsb2FkRmluaXNoZWQiLCJjb21tZW50SW5wdXQiLCJjdXJyZW50UmVwbHlJZCIsImN1cnJlbnRSZXBseVJvb3RJZCIsImN1cnJlbnRSZXBseVRvQ29tbWVudElkIiwiY29tbWVudFBuIiwiY29tbWVudFBzIiwiY29tbWVudE9mZnNldCIsImNvbW1lbnRMb2FkRmluaXNoZWQiLCJtZW1iZXJMaXN0IiwibG9hZE1vcmVDb21tZW50QXJyYXkiLCJzaGFyZVRpdGxlIiwic2hvd1NoYXJlRmxhZyIsInNoYXJlSW1nIiwid2F0Y2giLCJuZXdWYWwiLCJvbGRWYWwiLCJyZXNldERhdGEiLCJnZXRab25lTGlzdCIsIm1ldGhvZHMiLCJjYW5jZWxTaGFyZUZuIiwiJGFwcGx5Iiwic2hhcmVDaXJjbGUiLCJuaWNrbmFtZSIsInJlbW92ZUNpcmNsZSIsImlkIiwiaWR4IiwibW9tZW50X2lkIiwiY2xhc3NfaWQiLCJ0aGVuIiwicmVzIiwic3VjY2VzcyIsInNwbGljZSIsImxvYWRNb3JlQ29tbWVudCIsIm1vbWVudElkIiwicmV0T2JqIiwiZmluZExvYWRtb3JlQ29tbWVudEluZm8iLCJvZmZzZXQiLCJyZXN1bHRMaXN0IiwiY29tbWVudF9saXN0IiwibGVuZ3RoIiwib2JqIiwicHVzaCIsImluZGV4IiwiYWRkQ29tbWVudCIsInR5cGUiLCJyb290SWQiLCJ0b0NvbW1lbnRJZCIsIm5hbWUiLCJtZW1iZXJfaWQiLCJ1bmRlZmluZWQiLCJiaW5kQ29tbWVudElucHV0IiwidmFsdWUiLCJjb21tZW50U3VyZSIsImNvbnRlbnQiLCJyZXBsYWNlIiwicm9vdF9pZCIsInRvX2NvbW1lbnRfaWQiLCJjb21tZW50Q2FuY2VsIiwicHJldmlldyIsImltZyIsImltZ0xpc3QiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJ1c2VyRGF0YSIsInNlZV90eXBlIiwiY29tbWVudF9jb3VudCIsImFyciIsImN1cnJlbnRJZCIsImkiLCJsZW4iLCJPYmplY3QiLCJhc3NpZ24iLCJ0aXRsZSIsImltYWdlVXJsIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsUzs7Ozs7Ozs7Ozs7Ozs7NExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCLE1BRGpCO0FBRVBDLDZCQUF1QjtBQUZoQixLLFFBSVZDLE8sR0FBVSxFLFFBQ1hDLE0sR0FBUyxFQUFDLGdCQUFlLEVBQUMsZUFBYyxJQUFmLEVBQW9CLGlCQUFnQixJQUFwQyxFQUF5QyxtQkFBa0IsU0FBM0QsRUFBcUUsZ0JBQWUsRUFBcEYsRUFBdUYsb0JBQW1CLGFBQTFHLEVBQXdILDRCQUEyQixjQUFuSixFQUFrSyxjQUFhLEVBQS9LLEVBQWhCLEVBQW1NLGVBQWMsRUFBQyxvQkFBbUIsWUFBcEIsRUFBaUMsb0JBQW1CLGVBQXBELEVBQWpOLEVBQXNSLGNBQWEsRUFBQyxvQkFBbUIsZUFBcEIsRUFBb0MscUJBQW9CLFlBQXhELEVBQXFFLHNCQUFxQixVQUExRixFQUFuUyxFLFFBQ1RDLE8sR0FBVSxFQUFDLGdCQUFlLEVBQUMsZUFBYyxlQUFmLEVBQStCLGFBQVksYUFBM0MsRUFBeUQsY0FBYSxrQkFBdEUsRUFBaEIsRUFBMEcsZUFBYyxFQUFDLGVBQWMsY0FBZixFQUE4QixhQUFZLFlBQTFDLEVBQXhILEVBQWdMLGNB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LEVBQVdDLE1BQU1ILElBQUk3QixNQUExQixFQUFrQytCLElBQUlDLEdBQXRDLEVBQTJDRCxHQUEzQyxFQUFnRDtBQUM5QyxZQUFJRixJQUFJRSxDQUFKLEVBQU81QyxTQUFQLEtBQXFCMkMsU0FBekIsRUFBb0M7QUFDbENuQyxtQkFBU3NDLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCTCxJQUFJRSxDQUFKLENBQWxCLEVBQTBCO0FBQ2pDNUIsbUJBQU80QjtBQUQwQixXQUExQixDQUFUO0FBR0Q7QUFDRjtBQUNELGFBQU9wQyxNQUFQO0FBQ0Q7OztzQ0FDaUJMLEcsRUFBSztBQUNyQixhQUFPO0FBQ0w2QyxlQUFPLEtBQUtoRSxVQURQO0FBRUxpRSxrQkFBVSxLQUFLL0Q7QUFGVixPQUFQO0FBSUQ7Ozs7RUE1R29DZ0UsZUFBS0MsSTs7a0JBQXZCbEcsUyIsImZpbGUiOiJkaXNjb3ZlcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgU2VsZWN0TW9kYWwgZnJvbSAnLi4vY29tcG9uZW50cy9zZWxlY3RNb2RhbCdcbmltcG9ydCBDdXJyZW50TW9kYWwgZnJvbSAnLi4vY29tcG9uZW50cy9jb21tZW50TW9kYWwnXG5pbXBvcnQgc2hhcmVNb2RhbCBmcm9tICcuLi9jb21wb25lbnRzL3NoYXJlTW9kYWwnXG5pbXBvcnQgeyBzaG93TXNnLCBwcmV2aWV3SW1hZ2UgfSBmcm9tICcuLi91dGlscy9jb21tb24nXG5pbXBvcnQgeyBnZXRDaXJjbGVMaXN0LCBhZGRDb21tZW50LCBnZXRDb21tZW50TGlzdCwgZGVsZXRlQ2lyY2xlIH0gZnJvbSAnLi4vYXBpL3pvbmUnXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaXNjb3ZlcnkgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WutumVv+WciOWtkCcsXG4gICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiB0cnVlXG4gIH1cbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIkN1cnJlbnRNb2RhbFwiOntcInN1cmVCdG5UZXh0XCI6XCLnoa7orqRcIixcImNhbmNlbEJ0blRleHRcIjpcIuWPlua2iFwiLFwicGxhY2Vob2xkZXJUZXh0XCI6XCLor7fovpPlhaXor4TorrrlhoXlrrlcIixcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6ZmxhZy5zeW5jXCI6XCJjb21tZW50RmxhZ1wiLFwidi1iaW5kOmNvbW1lbnRJbnB1dC5zeW5jXCI6XCJjb21tZW50SW5wdXRcIixcInhtbG5zOnYtb25cIjpcIlwifSxcIlNlbGVjdE1vZGFsXCI6e1widi1iaW5kOmZsYWcuc3luY1wiOlwic2VsZWN0RmxhZ1wiLFwidi1iaW5kOmxpc3Quc3luY1wiOlwicGF5TWVtYmVyTGlzdFwifSxcInNoYXJlTW9kYWxcIjp7XCJ2LWJpbmQ6ZmxhZy5zeW5jXCI6XCJzaG93U2hhcmVGbGFnXCIsXCJ2LWJpbmQ6dGl0bGUuc3luY1wiOlwic2hhcmVUaXRsZVwiLFwidi1iaW5kOmltZ1NyYy5zeW5jXCI6XCJzaGFyZUltZ1wifX07XHJcbiRldmVudHMgPSB7XCJDdXJyZW50TW9kYWxcIjp7XCJ2LW9uOmNhbmNlbFwiOlwiY29tbWVudENhbmNlbFwiLFwidi1vbjpzdXJlXCI6XCJjb21tZW50U3VyZVwiLFwidi1vbjppbnB1dFwiOlwiYmluZENvbW1lbnRJbnB1dFwifSxcIlNlbGVjdE1vZGFsXCI6e1widi1vbjpjYW5jZWxcIjpcInNlbGVjdENhbmNlbFwiLFwidi1vbjpzdXJlXCI6XCJzZWxlY3RTdXJlXCJ9LFwic2hhcmVNb2RhbFwiOntcInYtb246Y2FuY2VsXCI6XCJjYW5jZWxTaGFyZUZuXCIsXCJ2LW9uOnN1cmVcIjpcImNhbmNlbFNoYXJlRm5cIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICBDdXJyZW50TW9kYWwsXG4gICAgU2VsZWN0TW9kYWwsXG4gICAgc2hhcmVNb2RhbFxuICB9XG4gIGRhdGEgPSB7XG4gICAgY29tbWVudEZsYWc6IGZhbHNlLFxuICAgIHBuOiAxLFxuICAgIHBzOiAxMCxcbiAgICBsaXN0OiBbXSxcbiAgICBjbGFzc0luZm86IG51bGwsXG4gICAgbWVtYmVySW5mbzogbnVsbCxcbiAgICBzY2hvb2xJbmZvOiBudWxsLFxuICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgIGxvYWRGaW5pc2hlZDogZmFsc2UsXG4gICAgY29tbWVudElucHV0OiAnJyxcbiAgICBjdXJyZW50UmVwbHlJZDogLTEsXG4gICAgY3VycmVudFJlcGx5Um9vdElkOiAtMSxcbiAgICBjdXJyZW50UmVwbHlUb0NvbW1lbnRJZDogLTEsXG4gICAgY29tbWVudFBuOiAyLFxuICAgIGNvbW1lbnRQczogNixcbiAgICBjb21tZW50T2Zmc2V0OiA2LFxuICAgIGNvbW1lbnRMb2FkRmluaXNoZWQ6IGZhbHNlLFxuICAgIG1lbWJlckxpc3Q6IFtdLFxuICAgIGxvYWRNb3JlQ29tbWVudEFycmF5OiBbXSxcbiAgICBzaGFyZVRpdGxlOiAnJyxcbiAgICBzaG93U2hhcmVGbGFnOiBmYWxzZSxcbiAgICBzaGFyZUltZzogJy4uL2ltYWdlcy9zaGFyZS9jaXJjbGVzLmpwZydcbiAgfVxuICB3YXRjaCA9IHtcbiAgICBjbGFzc0luZm8obmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgIC8vIOWIh+aNouS6huePree6p+S5i+WQjuaVsOaNruimgeabtOaWsFxuICAgICAgaWYgKG9sZFZhbCAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLnJlc2V0RGF0YSgpXG4gICAgICAgIHRoaXMuZ2V0Wm9uZUxpc3QoKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXNldERhdGEoKSB7XG4gICAgdGhpcy5sb2FkTW9yZUNvbW1lbnRBcnJheSA9IFtdXG4gICAgdGhpcy5jb21tZW50TG9hZEZpbmlzaGVkID0gZmFsc2VcbiAgICB0aGlzLmNvbW1lbnRQbiA9IDJcbiAgICB0aGlzLmNvbW1lbnRQcyA9IDZcbiAgICB0aGlzLnBuID0gMVxuICAgIHRoaXMubGlzdCA9IFtdXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIG9uUHVsbERvd25SZWZyZXNoKCkge1xuICAgIHRoaXMucmVzZXREYXRhKClcbiAgICB0aGlzLmdldFpvbmVMaXN0KClcbiAgfVxuICBvblJlYWNoQm90dG9tKCkge1xuICAgIGlmICh0aGlzLmxvYWRpbmcgfHwgdGhpcy5sb2FkRmluaXNoZWQpIHJldHVyblxuICAgIHRoaXMuZ2V0Wm9uZUxpc3QoKVxuICB9XG4gIG9uTG9hZCgpIHtcbiAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxuICAgIHRoaXMubWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcbiAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyRGF0YSA9IHRoaXMubWVtYmVySW5mb1xuICAgIHRoaXMuJGFwcGx5KClcbiAgICB0aGlzLmdldFpvbmVMaXN0KClcbiAgfVxuICBnZXRab25lTGlzdCgpIHtcbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlXG4gICAgdGhpcy4kYXBwbHkoKVxuICAgIGNvbnN0IGlkID0gdGhpcy5jbGFzc0luZm8uaWRcbiAgICBnZXRDaXJjbGVMaXN0KHtcbiAgICAgIGNsYXNzX2lkOiBpZCxcbiAgICAgIHNlZV90eXBlOiAnYWxsJyxcbiAgICAgIHR5cGU6ICdjaXJjbGVzJyxcbiAgICAgIHBuOiB0aGlzLnBuLFxuICAgICAgcHM6IHRoaXMucHMsXG4gICAgICBjb21tZW50X2NvdW50OiAzXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IHsgbGlzdCB9ID0gcmVzLmRhdGFcbiAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlXG4gICAgICB0aGlzLnBuKytcbiAgICAgIGlmIChsaXN0Lmxlbmd0aCA8IHRoaXMucHMpIHtcbiAgICAgICAgdGhpcy5sb2FkRmluaXNoZWQgPSB0cnVlXG4gICAgICB9XG4gICAgICB0aGlzLmxpc3QgPSBbLi4udGhpcy5saXN0LCAuLi5saXN0XVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0pXG4gIH1cbiAgZmluZExvYWRtb3JlQ29tbWVudEluZm8oYXJyLCBjdXJyZW50SWQpIHtcbiAgICBsZXQgcmV0T2JqID0ge31cbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gYXJyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBpZiAoYXJyW2ldLm1vbWVudF9pZCA9PT0gY3VycmVudElkKSB7XG4gICAgICAgIHJldE9iaiA9IE9iamVjdC5hc3NpZ24oe30sIGFycltpXSwge1xuICAgICAgICAgIGluZGV4OiBpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXRPYmpcbiAgfVxuICBvblNoYXJlQXBwTWVzc2FnZShyZXMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6IHRoaXMuc2hhcmVUaXRsZSxcbiAgICAgIGltYWdlVXJsOiB0aGlzLnNoYXJlSW1nXG4gICAgfVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgY2FuY2VsU2hhcmVGbigpIHtcbiAgICAgIHRoaXMuc2hvd1NoYXJlRmxhZyA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBzaGFyZUNpcmNsZSgpIHtcbiAgICAgIHRoaXMuc2hhcmVUaXRsZSA9IGAke3RoaXMubWVtYmVySW5mby5uaWNrbmFtZX3liIbkuqvkuobkuIDkuKrlj5HnjrDvvIzngrnlh7vmtY/op4hgXG4gICAgICB0aGlzLnNob3dTaGFyZUZsYWcgPSB0cnVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICByZW1vdmVDaXJjbGUoaWQsIGlkeCkge1xuICAgICAgZGVsZXRlQ2lyY2xlKHtcbiAgICAgICAgbW9tZW50X2lkOiBpZCxcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgc2hvd01zZygn5oiQ5Yqf5Yig6ZmkJylcbiAgICAgICAgICB0aGlzLmxpc3Quc3BsaWNlKGlkeCwgMSlcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBsb2FkTW9yZUNvbW1lbnQobW9tZW50SWQsIGlkeCkge1xuICAgICAgY29uc3QgcmV0T2JqID0gdGhpcy5maW5kTG9hZG1vcmVDb21tZW50SW5mbyh0aGlzLmxvYWRNb3JlQ29tbWVudEFycmF5LCBtb21lbnRJZCk7XG4gICAgICBnZXRDb21tZW50TGlzdCh7XG4gICAgICAgIG1vbWVudF9pZDogbW9tZW50SWQsXG4gICAgICAgIHBzOiB0aGlzLmNvbW1lbnRQcyxcbiAgICAgICAgcG46IHJldE9iai5jb21tZW50UG4gPyByZXRPYmouY29tbWVudFBuIDogdGhpcy5jb21tZW50UG4sXG4gICAgICAgIG9mZnNldDogdGhpcy5jb21tZW50T2Zmc2V0XG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgbGV0IHJlc3VsdExpc3QgPSByZXMuZGF0YS5saXN0XG4gICAgICAgICAgbGV0IHtsaXN0fSA9IHRoaXMubGlzdFtpZHhdLmNvbW1lbnRfbGlzdFxuICAgICAgICAgIGxpc3QgPSBbLi4ubGlzdCwgLi4ucmVzdWx0TGlzdF1cbiAgICAgICAgICB0aGlzLmxpc3RbaWR4XS5jb21tZW50X2xpc3QubGlzdCA9IGxpc3RcbiAgICAgICAgICBpZiAocmVzdWx0TGlzdC5sZW5ndGggPCB0aGlzLmNvbW1lbnRQcykge1xuICAgICAgICAgICAgdGhpcy5saXN0W2lkeF0uY29tbWVudExvYWRGaW5pc2hlZCA9IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFyZXRPYmouY29tbWVudFBuKSB7XG4gICAgICAgICAgICBjb25zdCBvYmogPSB7XG4gICAgICAgICAgICAgIGNvbW1lbnRQbjogdGhpcy5jb21tZW50UG4gKyAxLFxuICAgICAgICAgICAgICBtb21lbnRfaWQ6IG1vbWVudElkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmxvYWRNb3JlQ29tbWVudEFycmF5LnB1c2gob2JqKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRNb3JlQ29tbWVudEFycmF5W3JldE9iai5pbmRleF0uY29tbWVudFBuID0gcmV0T2JqLmNvbW1lbnRQbiArIDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIGFkZENvbW1lbnQodHlwZSwgaWQsIHJvb3RJZCwgdG9Db21tZW50SWQsIG5hbWUpIHtcbiAgICAgIGlmICh0b0NvbW1lbnRJZCA9PT0gdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCkge1xuICAgICAgICBzaG93TXNnKCfor7fkuI3opoHlm57lpI3oh6rlt7EnKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5jbGFzc0luZm8pIHtcbiAgICAgICAgc2hvd01zZygn6K+35YWI6YCJ5oup54+t57qnJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB0aGlzLmNvbW1lbnRGbGFnID0gdHJ1ZVxuICAgICAgdGhpcy5jdXJyZW50UmVwbHlJZCA9IGlkXG4gICAgICB0aGlzLmN1cnJlbnRSZXBseVJvb3RJZCA9IHR5cGUgPT09ICdhZGQnID8gMCA6IHJvb3RJZFxuICAgICAgaWYgKG5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmNvbW1lbnRJbnB1dCA9IGBAJHtuYW1lfTpgXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbW1lbnRJbnB1dCA9ICcnXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBiaW5kQ29tbWVudElucHV0ICh2YWx1ZSkge1xuICAgICAgdGhpcy5jb21tZW50SW5wdXQgPSB2YWx1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgY29tbWVudFN1cmUgKCkge1xuICAgICAgdGhpcy5jb21tZW50RmxhZyA9IGZhbHNlXG4gICAgICBhZGRDb21tZW50KHtcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgICBtb21lbnRfaWQ6IHRoaXMuY3VycmVudFJlcGx5SWQsXG4gICAgICAgIGNvbnRlbnQ6IHRoaXMuY3VycmVudFJlcGx5SWQgPiAwID8gdGhpcy5jb21tZW50SW5wdXQucmVwbGFjZSgvXkAuKzovLCAnJykgOiB0aGlzLmNvbW1lbnRJbnB1dCxcbiAgICAgICAgcm9vdF9pZDogdGhpcy5jdXJyZW50UmVwbHlSb290SWQsXG4gICAgICAgIHRvX2NvbW1lbnRfaWQ6IHRoaXMuY3VycmVudFJlcGx5Um9vdElkXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgdGhpcy5jb21tZW50SW5wdXQgPSAnJ1xuICAgICAgICAgIHRoaXMucmVzZXREYXRhKClcbiAgICAgICAgICB0aGlzLmdldFpvbmVMaXN0KClcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBjb21tZW50Q2FuY2VsICgpIHtcbiAgICAgIHRoaXMuY29tbWVudEZsYWcgPSBmYWxzZVxuICAgICAgdGhpcy5jb21tZW50SW5wdXQgPSAnJ1xuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgcHJldmlldyhpbWcsIGltZ0xpc3QpIHtcbiAgICAgIHByZXZpZXdJbWFnZShpbWcsIGltZ0xpc3QpXG4gICAgfVxuICB9XG59XG4iXX0=