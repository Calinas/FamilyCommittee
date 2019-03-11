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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc2NvdmVyeS5qcyJdLCJuYW1lcyI6WyJEaXNjb3ZlcnkiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiQ3VycmVudE1vZGFsIiwiU2VsZWN0TW9kYWwiLCJzaGFyZU1vZGFsIiwiZGF0YSIsImNvbW1lbnRGbGFnIiwicG4iLCJwcyIsImxpc3QiLCJjbGFzc0luZm8iLCJtZW1iZXJJbmZvIiwic2Nob29sSW5mbyIsImxvYWRpbmciLCJsb2FkRmluaXNoZWQiLCJjb21tZW50SW5wdXQiLCJjdXJyZW50UmVwbHlJZCIsImN1cnJlbnRSZXBseVJvb3RJZCIsImN1cnJlbnRSZXBseVRvQ29tbWVudElkIiwiY29tbWVudFBuIiwiY29tbWVudFBzIiwiY29tbWVudE9mZnNldCIsImNvbW1lbnRMb2FkRmluaXNoZWQiLCJtZW1iZXJMaXN0IiwibG9hZE1vcmVDb21tZW50QXJyYXkiLCJzaGFyZVRpdGxlIiwic2hvd1NoYXJlRmxhZyIsInNoYXJlSW1nIiwid2F0Y2giLCJuZXdWYWwiLCJvbGRWYWwiLCJyZXNldERhdGEiLCJnZXRab25lTGlzdCIsIm1ldGhvZHMiLCJjYW5jZWxTaGFyZUZuIiwiJGFwcGx5Iiwic2hhcmVDaXJjbGUiLCJuaWNrbmFtZSIsInJlbW92ZUNpcmNsZSIsImlkIiwiaWR4IiwibW9tZW50X2lkIiwiY2xhc3NfaWQiLCJ0aGVuIiwicmVzIiwic3VjY2VzcyIsInNwbGljZSIsImxvYWRNb3JlQ29tbWVudCIsIm1vbWVudElkIiwicmV0T2JqIiwiZmluZExvYWRtb3JlQ29tbWVudEluZm8iLCJvZmZzZXQiLCJyZXN1bHRMaXN0IiwiY29tbWVudF9saXN0IiwibGVuZ3RoIiwib2JqIiwicHVzaCIsImluZGV4IiwiYWRkQ29tbWVudCIsInR5cGUiLCJyb290SWQiLCJ0b0NvbW1lbnRJZCIsIm5hbWUiLCJtZW1iZXJfaWQiLCJ1bmRlZmluZWQiLCJiaW5kQ29tbWVudElucHV0IiwidmFsdWUiLCJjb21tZW50U3VyZSIsImNvbnRlbnQiLCJyZXBsYWNlIiwicm9vdF9pZCIsInRvX2NvbW1lbnRfaWQiLCJjb21tZW50Q2FuY2VsIiwicHJldmlldyIsImltZyIsImltZ0xpc3QiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJ1c2VyRGF0YSIsInNlZV90eXBlIiwiY29tbWVudF9jb3VudCIsImFyciIsImN1cnJlbnRJZCIsImkiLCJsZW4iLCJPYmplY3QiLCJhc3NpZ24iLCJ0aXRsZSIsImltYWdlVXJsIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsUzs7Ozs7Ozs7Ozs7Ozs7NExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCLE1BRGpCO0FBRVBDLDZCQUF1QjtBQUZoQixLLFFBSVZDLE8sR0FBVSxFLFFBQ1hDLE0sR0FBUyxFQUFDLGdCQUFlLEVBQUMsZUFBYyxJQUFmLEVBQW9CLGlCQUFnQixJQUFwQyxFQUF5QyxtQkFBa0IsU0FBM0QsRUFBcUUsZ0JBQWUsRUFBcEYsRUFBdUYsb0JBQW1CLGFBQTFHLEVBQXdILDRCQUEyQixjQUFuSixFQUFrSyxjQUFhLEVBQS9LLEVBQWhCLEVBQW1NLGVBQWMsRUFBQyxvQkFBbUIsWUFBcEIsRUFBaUMsb0JBQW1CLGVBQXBELEVBQWpOLEVBQXNSLGNBQWEsRUFBQyxvQkFBbUIsZUFBcEIsRUFBb0MscUJBQW9CLFlBQXhELEVBQXFFLHNCQUFxQixVQUExRixFQUFuUyxFLFFBQ1RDLE8sR0FBVSxFQUFDLGdCQUFlLEVBQUMsZUFBYyxlQUFmLEVBQStCLGFBQVksYUFBM0MsRUFBeUQsY0FBYSxrQkFBdEUsRUFBaEIsRUFBMEcsZUFBYyxFQUFDLGVBQWMsY0FBZixFQUE4QixhQUFZLFlBQTFDLEVBQXhILEVBQWdMLGNB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LE1BQTFCLEVBQWtDK0IsSUFBSUMsR0FBdEMsRUFBMkNELEdBQTNDLEVBQWdEO0FBQzlDLFlBQUlGLElBQUlFLENBQUosRUFBTzVDLFNBQVAsS0FBcUIyQyxTQUF6QixFQUFvQztBQUNsQ25DLG1CQUFTc0MsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JMLElBQUlFLENBQUosQ0FBbEIsRUFBMEI7QUFDakM1QixtQkFBTzRCO0FBRDBCLFdBQTFCLENBQVQ7QUFHRDtBQUNGO0FBQ0QsYUFBT3BDLE1BQVA7QUFDRDs7O3NDQUNpQkwsRyxFQUFLO0FBQ3JCLGFBQU87QUFDTDZDLGVBQU8sS0FBS2hFLFVBRFA7QUFFTGlFLGtCQUFVLEtBQUsvRDtBQUZWLE9BQVA7QUFJRDs7OztFQTNHb0NnRSxlQUFLQyxJOztrQkFBdkJsRyxTIiwiZmlsZSI6ImRpc2NvdmVyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCBTZWxlY3RNb2RhbCBmcm9tICcuLi9jb21wb25lbnRzL3NlbGVjdE1vZGFsJ1xuaW1wb3J0IEN1cnJlbnRNb2RhbCBmcm9tICcuLi9jb21wb25lbnRzL2NvbW1lbnRNb2RhbCdcbmltcG9ydCBzaGFyZU1vZGFsIGZyb20gJy4uL2NvbXBvbmVudHMvc2hhcmVNb2RhbCdcbmltcG9ydCB7IHNob3dNc2csIHByZXZpZXdJbWFnZSB9IGZyb20gJy4uL3V0aWxzL2NvbW1vbidcbmltcG9ydCB7IGdldENpcmNsZUxpc3QsIGFkZENvbW1lbnQsIGdldENvbW1lbnRMaXN0LCBkZWxldGVDaXJjbGUgfSBmcm9tICcuLi9hcGkvem9uZSdcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpc2NvdmVyeSBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5a626ZW/5ZyI5a2QJyxcbiAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IHRydWVcbiAgfVxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiQ3VycmVudE1vZGFsXCI6e1wic3VyZUJ0blRleHRcIjpcIuehruiupFwiLFwiY2FuY2VsQnRuVGV4dFwiOlwi5Y+W5raIXCIsXCJwbGFjZWhvbGRlclRleHRcIjpcIuivt+i+k+WFpeivhOiuuuWGheWuuVwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpmbGFnLnN5bmNcIjpcImNvbW1lbnRGbGFnXCIsXCJ2LWJpbmQ6Y29tbWVudElucHV0LnN5bmNcIjpcImNvbW1lbnRJbnB1dFwiLFwieG1sbnM6di1vblwiOlwiXCJ9LFwiU2VsZWN0TW9kYWxcIjp7XCJ2LWJpbmQ6ZmxhZy5zeW5jXCI6XCJzZWxlY3RGbGFnXCIsXCJ2LWJpbmQ6bGlzdC5zeW5jXCI6XCJwYXlNZW1iZXJMaXN0XCJ9LFwic2hhcmVNb2RhbFwiOntcInYtYmluZDpmbGFnLnN5bmNcIjpcInNob3dTaGFyZUZsYWdcIixcInYtYmluZDp0aXRsZS5zeW5jXCI6XCJzaGFyZVRpdGxlXCIsXCJ2LWJpbmQ6aW1nU3JjLnN5bmNcIjpcInNoYXJlSW1nXCJ9fTtcclxuJGV2ZW50cyA9IHtcIkN1cnJlbnRNb2RhbFwiOntcInYtb246Y2FuY2VsXCI6XCJjb21tZW50Q2FuY2VsXCIsXCJ2LW9uOnN1cmVcIjpcImNvbW1lbnRTdXJlXCIsXCJ2LW9uOmlucHV0XCI6XCJiaW5kQ29tbWVudElucHV0XCJ9LFwiU2VsZWN0TW9kYWxcIjp7XCJ2LW9uOmNhbmNlbFwiOlwic2VsZWN0Q2FuY2VsXCIsXCJ2LW9uOnN1cmVcIjpcInNlbGVjdFN1cmVcIn0sXCJzaGFyZU1vZGFsXCI6e1widi1vbjpjYW5jZWxcIjpcImNhbmNlbFNoYXJlRm5cIixcInYtb246c3VyZVwiOlwiY2FuY2VsU2hhcmVGblwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgIEN1cnJlbnRNb2RhbCxcbiAgICBTZWxlY3RNb2RhbCxcbiAgICBzaGFyZU1vZGFsXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBjb21tZW50RmxhZzogZmFsc2UsXG4gICAgcG46IDEsXG4gICAgcHM6IDEwLFxuICAgIGxpc3Q6IFtdLFxuICAgIGNsYXNzSW5mbzogbnVsbCxcbiAgICBtZW1iZXJJbmZvOiBudWxsLFxuICAgIHNjaG9vbEluZm86IG51bGwsXG4gICAgbG9hZGluZzogZmFsc2UsXG4gICAgbG9hZEZpbmlzaGVkOiBmYWxzZSxcbiAgICBjb21tZW50SW5wdXQ6ICcnLFxuICAgIGN1cnJlbnRSZXBseUlkOiAtMSxcbiAgICBjdXJyZW50UmVwbHlSb290SWQ6IC0xLFxuICAgIGN1cnJlbnRSZXBseVRvQ29tbWVudElkOiAtMSxcbiAgICBjb21tZW50UG46IDIsXG4gICAgY29tbWVudFBzOiA2LFxuICAgIGNvbW1lbnRPZmZzZXQ6IDYsXG4gICAgY29tbWVudExvYWRGaW5pc2hlZDogZmFsc2UsXG4gICAgbWVtYmVyTGlzdDogW10sXG4gICAgbG9hZE1vcmVDb21tZW50QXJyYXk6IFtdLFxuICAgIHNoYXJlVGl0bGU6ICcnLFxuICAgIHNob3dTaGFyZUZsYWc6IGZhbHNlLFxuICAgIHNoYXJlSW1nOiAnLi4vaW1hZ2VzL3NoYXJlL2NpcmNsZXMuanBnJ1xuICB9XG4gIHdhdGNoID0ge1xuICAgIGNsYXNzSW5mbyhuZXdWYWwsIG9sZFZhbCkge1xuICAgICAgLy8g5YiH5o2i5LqG54+t57qn5LmL5ZCO5pWw5o2u6KaB5pu05pawXG4gICAgICBpZiAob2xkVmFsICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMucmVzZXREYXRhKClcbiAgICAgICAgdGhpcy5nZXRab25lTGlzdCgpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJlc2V0RGF0YSgpIHtcbiAgICB0aGlzLmxvYWRNb3JlQ29tbWVudEFycmF5ID0gW11cbiAgICB0aGlzLmNvbW1lbnRMb2FkRmluaXNoZWQgPSBmYWxzZVxuICAgIHRoaXMuY29tbWVudFBuID0gMlxuICAgIHRoaXMuY29tbWVudFBzID0gNlxuICAgIHRoaXMucG4gPSAxXG4gICAgdGhpcy5saXN0ID0gW11cbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgb25QdWxsRG93blJlZnJlc2goKSB7XG4gICAgdGhpcy5yZXNldERhdGEoKVxuICAgIHRoaXMuZ2V0Wm9uZUxpc3QoKVxuICB9XG4gIG9uUmVhY2hCb3R0b20oKSB7XG4gICAgaWYgKHRoaXMubG9hZGluZyB8fCB0aGlzLmxvYWRGaW5pc2hlZCkgcmV0dXJuXG4gICAgdGhpcy5nZXRab25lTGlzdCgpXG4gIH1cbiAgb25Mb2FkKCkge1xuICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXG4gICAgdGhpcy5tZW1iZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nKVxuICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJEYXRhID0gdGhpcy5tZW1iZXJJbmZvXG4gICAgdGhpcy4kYXBwbHkoKVxuICAgIHRoaXMuZ2V0Wm9uZUxpc3QoKVxuICB9XG4gIGdldFpvbmVMaXN0KCkge1xuICAgIHRoaXMubG9hZGluZyA9IHRydWVcbiAgICB0aGlzLiRhcHBseSgpXG4gICAgY29uc3QgaWQgPSB0aGlzLmNsYXNzSW5mby5pZFxuICAgIGdldENpcmNsZUxpc3Qoe1xuICAgICAgc2VlX3R5cGU6ICdhbGwnLFxuICAgICAgdHlwZTogJ2NpcmNsZXMnLFxuICAgICAgcG46IHRoaXMucG4sXG4gICAgICBwczogdGhpcy5wcyxcbiAgICAgIGNvbW1lbnRfY291bnQ6IDNcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgeyBsaXN0IH0gPSByZXMuZGF0YVxuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2VcbiAgICAgIHRoaXMucG4rK1xuICAgICAgaWYgKGxpc3QubGVuZ3RoIDwgdGhpcy5wcykge1xuICAgICAgICB0aGlzLmxvYWRGaW5pc2hlZCA9IHRydWVcbiAgICAgIH1cbiAgICAgIHRoaXMubGlzdCA9IFsuLi50aGlzLmxpc3QsIC4uLmxpc3RdXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSlcbiAgfVxuICBmaW5kTG9hZG1vcmVDb21tZW50SW5mbyhhcnIsIGN1cnJlbnRJZCkge1xuICAgIGxldCByZXRPYmogPSB7fVxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhcnIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmIChhcnJbaV0ubW9tZW50X2lkID09PSBjdXJyZW50SWQpIHtcbiAgICAgICAgcmV0T2JqID0gT2JqZWN0LmFzc2lnbih7fSwgYXJyW2ldLCB7XG4gICAgICAgICAgaW5kZXg6IGlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJldE9ialxuICB9XG4gIG9uU2hhcmVBcHBNZXNzYWdlKHJlcykge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogdGhpcy5zaGFyZVRpdGxlLFxuICAgICAgaW1hZ2VVcmw6IHRoaXMuc2hhcmVJbWdcbiAgICB9XG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBjYW5jZWxTaGFyZUZuKCkge1xuICAgICAgdGhpcy5zaG93U2hhcmVGbGFnID0gZmFsc2VcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIHNoYXJlQ2lyY2xlKCkge1xuICAgICAgdGhpcy5zaGFyZVRpdGxlID0gYCR7dGhpcy5tZW1iZXJJbmZvLm5pY2tuYW1lfeWIhuS6q+S6huS4gOS4quWPkeeOsO+8jOeCueWHu+a1j+iniGBcbiAgICAgIHRoaXMuc2hvd1NoYXJlRmxhZyA9IHRydWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIHJlbW92ZUNpcmNsZShpZCwgaWR4KSB7XG4gICAgICBkZWxldGVDaXJjbGUoe1xuICAgICAgICBtb21lbnRfaWQ6IGlkLFxuICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWRcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICBzaG93TXNnKCfmiJDlip/liKDpmaQnKVxuICAgICAgICAgIHRoaXMubGlzdC5zcGxpY2UoaWR4LCAxKVxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIGxvYWRNb3JlQ29tbWVudChtb21lbnRJZCwgaWR4KSB7XG4gICAgICBjb25zdCByZXRPYmogPSB0aGlzLmZpbmRMb2FkbW9yZUNvbW1lbnRJbmZvKHRoaXMubG9hZE1vcmVDb21tZW50QXJyYXksIG1vbWVudElkKTtcbiAgICAgIGdldENvbW1lbnRMaXN0KHtcbiAgICAgICAgbW9tZW50X2lkOiBtb21lbnRJZCxcbiAgICAgICAgcHM6IHRoaXMuY29tbWVudFBzLFxuICAgICAgICBwbjogcmV0T2JqLmNvbW1lbnRQbiA/IHJldE9iai5jb21tZW50UG4gOiB0aGlzLmNvbW1lbnRQbixcbiAgICAgICAgb2Zmc2V0OiB0aGlzLmNvbW1lbnRPZmZzZXRcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICBsZXQgcmVzdWx0TGlzdCA9IHJlcy5kYXRhLmxpc3RcbiAgICAgICAgICBsZXQge2xpc3R9ID0gdGhpcy5saXN0W2lkeF0uY29tbWVudF9saXN0XG4gICAgICAgICAgbGlzdCA9IFsuLi5saXN0LCAuLi5yZXN1bHRMaXN0XVxuICAgICAgICAgIHRoaXMubGlzdFtpZHhdLmNvbW1lbnRfbGlzdC5saXN0ID0gbGlzdFxuICAgICAgICAgIGlmIChyZXN1bHRMaXN0Lmxlbmd0aCA8IHRoaXMuY29tbWVudFBzKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RbaWR4XS5jb21tZW50TG9hZEZpbmlzaGVkID0gdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIXJldE9iai5jb21tZW50UG4pIHtcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IHtcbiAgICAgICAgICAgICAgY29tbWVudFBuOiB0aGlzLmNvbW1lbnRQbiArIDEsXG4gICAgICAgICAgICAgIG1vbWVudF9pZDogbW9tZW50SWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubG9hZE1vcmVDb21tZW50QXJyYXkucHVzaChvYmopXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9hZE1vcmVDb21tZW50QXJyYXlbcmV0T2JqLmluZGV4XS5jb21tZW50UG4gPSByZXRPYmouY29tbWVudFBuICsgMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgYWRkQ29tbWVudCh0eXBlLCBpZCwgcm9vdElkLCB0b0NvbW1lbnRJZCwgbmFtZSkge1xuICAgICAgaWYgKHRvQ29tbWVudElkID09PSB0aGlzLm1lbWJlckluZm8ubWVtYmVyX2lkKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+S4jeimgeWbnuWkjeiHquW3sScpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLmNsYXNzSW5mbykge1xuICAgICAgICBzaG93TXNnKCfor7flhYjpgInmi6nnj63nuqcnKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHRoaXMuY29tbWVudEZsYWcgPSB0cnVlXG4gICAgICB0aGlzLmN1cnJlbnRSZXBseUlkID0gaWRcbiAgICAgIHRoaXMuY3VycmVudFJlcGx5Um9vdElkID0gdHlwZSA9PT0gJ2FkZCcgPyAwIDogcm9vdElkXG4gICAgICBpZiAobmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuY29tbWVudElucHV0ID0gYEAke25hbWV9OmBcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29tbWVudElucHV0ID0gJydcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGJpbmRDb21tZW50SW5wdXQgKHZhbHVlKSB7XG4gICAgICB0aGlzLmNvbW1lbnRJbnB1dCA9IHZhbHVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBjb21tZW50U3VyZSAoKSB7XG4gICAgICB0aGlzLmNvbW1lbnRGbGFnID0gZmFsc2VcbiAgICAgIGFkZENvbW1lbnQoe1xuICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXG4gICAgICAgIG1vbWVudF9pZDogdGhpcy5jdXJyZW50UmVwbHlJZCxcbiAgICAgICAgY29udGVudDogdGhpcy5jdXJyZW50UmVwbHlJZCA+IDAgPyB0aGlzLmNvbW1lbnRJbnB1dC5yZXBsYWNlKC9eQC4rOi8sICcnKSA6IHRoaXMuY29tbWVudElucHV0LFxuICAgICAgICByb290X2lkOiB0aGlzLmN1cnJlbnRSZXBseVJvb3RJZCxcbiAgICAgICAgdG9fY29tbWVudF9pZDogdGhpcy5jdXJyZW50UmVwbHlSb290SWRcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICB0aGlzLmNvbW1lbnRJbnB1dCA9ICcnXG4gICAgICAgICAgdGhpcy5yZXNldERhdGEoKVxuICAgICAgICAgIHRoaXMuZ2V0Wm9uZUxpc3QoKVxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIGNvbW1lbnRDYW5jZWwgKCkge1xuICAgICAgdGhpcy5jb21tZW50RmxhZyA9IGZhbHNlXG4gICAgICB0aGlzLmNvbW1lbnRJbnB1dCA9ICcnXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBwcmV2aWV3KGltZywgaW1nTGlzdCkge1xuICAgICAgcHJldmlld0ltYWdlKGltZywgaW1nTGlzdClcbiAgICB9XG4gIH1cbn1cbiJdfQ==