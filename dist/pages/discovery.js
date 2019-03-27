'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _common = require('./../utils/common.js');

var _selectModal = require('./../components/selectModal.js');

var _selectModal2 = _interopRequireDefault(_selectModal);

var _commentModal = require('./../components/commentModal.js');

var _commentModal2 = _interopRequireDefault(_commentModal);

var _shareModal = require('./../components/shareModal.js');

var _shareModal2 = _interopRequireDefault(_shareModal);

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
      addLike: function addLike(momentId, idx, isLiked) {
        var _this2 = this;

        if (!this.classInfo) {
          (0, _common.showMsg)('请先选择班级');
          return;
        }
        (0, _zone.addLike)({
          class_id: this.classInfo.id,
          moment_id: momentId
        }).then(function (res) {
          if (res.data.success) {
            if (isLiked) {
              (0, _common.showMsg)('取消点赞成功');
              _this2.list[idx].like_list.count--;
            } else {
              (0, _common.showMsg)('点赞成功');
              _this2.list[idx].like_list.count++;
            }
            _this2.list[idx].is_like = !isLiked;
            var newObj = {
              moment_id: momentId,
              member_id: _this2.memberInfo.member_id,
              member: _this2.memberInfo
            };
            _this2.list[idx].like_list.list = (0, _common.filterArrayByValue)(_this2.memberInfo.member_id, _this2.list[idx].like_list.list, isLiked, newObj);
            _this2.$apply();
          }
        });
      },
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
      loadMoreComment: function loadMoreComment(momentId, idx) {
        var _this4 = this;

        var retObj = this.findLoadmoreCommentInfo(this.loadMoreCommentArray, momentId);
        (0, _zone.getCommentList)({
          moment_id: momentId,
          ps: this.commentPs,
          pn: retObj.commentPn ? retObj.commentPn : this.commentPn,
          offset: this.commentOffset
        }).then(function (res) {
          if (res.data.success) {
            var resultList = res.data.list;
            var list = _this4.list[idx].comment_list.list;

            list = [].concat(_toConsumableArray(list), _toConsumableArray(resultList));
            _this4.list[idx].comment_list.list = list;
            if (resultList.length < _this4.commentPs) {
              _this4.list[idx].commentLoadFinished = true;
            }
            if (!retObj.commentPn) {
              var obj = {
                commentPn: _this4.commentPn + 1,
                moment_id: momentId
              };
              _this4.loadMoreCommentArray.push(obj);
            } else {
              _this4.loadMoreCommentArray[retObj.index].commentPn = retObj.commentPn + 1;
            }
            _this4.$apply();
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
        var _this5 = this;

        this.commentFlag = false;
        (0, _zone.addComment)({
          class_id: this.classInfo.id,
          moment_id: this.currentReplyId,
          content: this.currentReplyId > 0 ? this.commentInput.replace(/^@.+:/, '') : this.commentInput,
          root_id: this.currentReplyRootId,
          to_comment_id: this.currentReplyRootId
        }).then(function (res) {
          if (res.data.success) {
            _this5.commentInput = '';
            _this5.resetData();
            _this5.getZoneList();
            _this5.$apply();
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
    key: 'onShow',
    value: function onShow() {
      this.classInfo = wx.getStorageSync('classInfo');
    }
  }, {
    key: 'getZoneList',
    value: function getZoneList() {
      var _this6 = this;

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

        _this6.loading = false;
        _this6.pn++;
        if (list.length < _this6.ps) {
          _this6.loadFinished = true;
        }
        _this6.list = [].concat(_toConsumableArray(_this6.list), _toConsumableArray(list));
        _this6.$apply();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc2NvdmVyeS5qcyJdLCJuYW1lcyI6WyJEaXNjb3ZlcnkiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiQ3VycmVudE1vZGFsIiwiU2VsZWN0TW9kYWwiLCJzaGFyZU1vZGFsIiwiZGF0YSIsImNvbW1lbnRGbGFnIiwicG4iLCJwcyIsImxpc3QiLCJjbGFzc0luZm8iLCJtZW1iZXJJbmZvIiwic2Nob29sSW5mbyIsImxvYWRpbmciLCJsb2FkRmluaXNoZWQiLCJjb21tZW50SW5wdXQiLCJjdXJyZW50UmVwbHlJZCIsImN1cnJlbnRSZXBseVJvb3RJZCIsImN1cnJlbnRSZXBseVRvQ29tbWVudElkIiwiY29tbWVudFBuIiwiY29tbWVudFBzIiwiY29tbWVudE9mZnNldCIsImNvbW1lbnRMb2FkRmluaXNoZWQiLCJtZW1iZXJMaXN0IiwibG9hZE1vcmVDb21tZW50QXJyYXkiLCJzaGFyZVRpdGxlIiwic2hvd1NoYXJlRmxhZyIsInNoYXJlSW1nIiwid2F0Y2giLCJuZXdWYWwiLCJvbGRWYWwiLCJyZXNldERhdGEiLCJnZXRab25lTGlzdCIsIm1ldGhvZHMiLCJhZGRMaWtlIiwibW9tZW50SWQiLCJpZHgiLCJpc0xpa2VkIiwiY2xhc3NfaWQiLCJpZCIsIm1vbWVudF9pZCIsInRoZW4iLCJyZXMiLCJzdWNjZXNzIiwibGlrZV9saXN0IiwiY291bnQiLCJpc19saWtlIiwibmV3T2JqIiwibWVtYmVyX2lkIiwibWVtYmVyIiwiJGFwcGx5IiwiY2FuY2VsU2hhcmVGbiIsInNoYXJlQ2lyY2xlIiwibmlja25hbWUiLCJyZW1vdmVDaXJjbGUiLCJzcGxpY2UiLCJsb2FkTW9yZUNvbW1lbnQiLCJyZXRPYmoiLCJmaW5kTG9hZG1vcmVDb21tZW50SW5mbyIsIm9mZnNldCIsInJlc3VsdExpc3QiLCJjb21tZW50X2xpc3QiLCJsZW5ndGgiLCJvYmoiLCJwdXNoIiwiaW5kZXgiLCJhZGRDb21tZW50IiwidHlwZSIsInJvb3RJZCIsInRvQ29tbWVudElkIiwibmFtZSIsInVuZGVmaW5lZCIsImJpbmRDb21tZW50SW5wdXQiLCJ2YWx1ZSIsImNvbW1lbnRTdXJlIiwiY29udGVudCIsInJlcGxhY2UiLCJyb290X2lkIiwidG9fY29tbWVudF9pZCIsImNvbW1lbnRDYW5jZWwiLCJwcmV2aWV3IiwiaW1nIiwiaW1nTGlzdCIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInVzZXJEYXRhIiwic2VlX3R5cGUiLCJjb21tZW50X2NvdW50IiwiYXJyIiwiY3VycmVudElkIiwiaSIsImxlbiIsIk9iamVjdCIsImFzc2lnbiIsInRpdGxlIiwiaW1hZ2VVcmwiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsTUFEakI7QUFFUEMsNkJBQXVCO0FBRmhCLEssUUFJVkMsTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsZ0JBQWUsRUFBQyxlQUFjLElBQWYsRUFBb0IsaUJBQWdCLElBQXBDLEVBQXlDLG1CQUFrQixTQUEzRCxFQUFxRSxnQkFBZSxFQUFwRixFQUF1RixvQkFBbUIsYUFBMUcsRUFBd0gsNEJBQTJCLGNBQW5KLEVBQWtLLGNBQWEsRUFBL0ssRUFBaEIsRUFBbU0sZUFBYyxFQUFDLG9CQUFtQixZQUFwQixFQUFpQyxvQkFBbUIsZUFBcEQsRUFBak4sRUFBc1IsY0FBYSxFQUFDLG9CQUFtQixlQUFwQixFQUFvQyxxQkFBb0IsWUFBeEQsRUFBcUUsc0JBQXFCLFVBQTFGLEVBQW5TLEUsUUFDVEMsTyxHQUFVLEVBQUMsZ0JBQWUsRUFBQyxlQUFjLGVBQWYsRUFBK0IsYUFBWSxhQUEzQyxFQUF5RCxjQUFhLGtC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LEVBQUtDLFMsRUFBVztBQUN0QyxVQUFJbEMsU0FBUyxFQUFiO0FBQ0EsV0FBSyxJQUFJbUMsSUFBSSxDQUFSLEVBQVdDLE1BQU1ILElBQUk1QixNQUExQixFQUFrQzhCLElBQUlDLEdBQXRDLEVBQTJDRCxHQUEzQyxFQUFnRDtBQUM5QyxZQUFJRixJQUFJRSxDQUFKLEVBQU9wRCxTQUFQLEtBQXFCbUQsU0FBekIsRUFBb0M7QUFDbENsQyxtQkFBU3FDLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCTCxJQUFJRSxDQUFKLENBQWxCLEVBQTBCO0FBQ2pDM0IsbUJBQU8yQjtBQUQwQixXQUExQixDQUFUO0FBR0Q7QUFDRjtBQUNELGFBQU9uQyxNQUFQO0FBQ0Q7OztzQ0FDaUJmLEcsRUFBSztBQUNyQixhQUFPO0FBQ0xzRCxlQUFPLEtBQUt2RSxVQURQO0FBRUx3RSxrQkFBVSxLQUFLdEU7QUFGVixPQUFQO0FBSUQ7Ozs7RUE5R29DdUUsZUFBS0MsSTs7a0JBQXZCekcsUyIsImZpbGUiOiJkaXNjb3ZlcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgeyBzaG93TXNnLCBwcmV2aWV3SW1hZ2UsIGZpbHRlckFycmF5QnlWYWx1ZSB9IGZyb20gJy4uL3V0aWxzL2NvbW1vbidcbmltcG9ydCBTZWxlY3RNb2RhbCBmcm9tICcuLi9jb21wb25lbnRzL3NlbGVjdE1vZGFsJ1xuaW1wb3J0IEN1cnJlbnRNb2RhbCBmcm9tICcuLi9jb21wb25lbnRzL2NvbW1lbnRNb2RhbCdcbmltcG9ydCBzaGFyZU1vZGFsIGZyb20gJy4uL2NvbXBvbmVudHMvc2hhcmVNb2RhbCdcbmltcG9ydCB7IGdldENpcmNsZUxpc3QsIGFkZENvbW1lbnQsIGdldENvbW1lbnRMaXN0LCBkZWxldGVDaXJjbGUsIGFkZExpa2UgfSBmcm9tICcuLi9hcGkvem9uZSdcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpc2NvdmVyeSBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5a626ZW/5ZyI5a2QJyxcbiAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IHRydWVcbiAgfVxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiQ3VycmVudE1vZGFsXCI6e1wic3VyZUJ0blRleHRcIjpcIuehruiupFwiLFwiY2FuY2VsQnRuVGV4dFwiOlwi5Y+W5raIXCIsXCJwbGFjZWhvbGRlclRleHRcIjpcIuivt+i+k+WFpeivhOiuuuWGheWuuVwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpmbGFnLnN5bmNcIjpcImNvbW1lbnRGbGFnXCIsXCJ2LWJpbmQ6Y29tbWVudElucHV0LnN5bmNcIjpcImNvbW1lbnRJbnB1dFwiLFwieG1sbnM6di1vblwiOlwiXCJ9LFwiU2VsZWN0TW9kYWxcIjp7XCJ2LWJpbmQ6ZmxhZy5zeW5jXCI6XCJzZWxlY3RGbGFnXCIsXCJ2LWJpbmQ6bGlzdC5zeW5jXCI6XCJwYXlNZW1iZXJMaXN0XCJ9LFwic2hhcmVNb2RhbFwiOntcInYtYmluZDpmbGFnLnN5bmNcIjpcInNob3dTaGFyZUZsYWdcIixcInYtYmluZDp0aXRsZS5zeW5jXCI6XCJzaGFyZVRpdGxlXCIsXCJ2LWJpbmQ6aW1nU3JjLnN5bmNcIjpcInNoYXJlSW1nXCJ9fTtcclxuJGV2ZW50cyA9IHtcIkN1cnJlbnRNb2RhbFwiOntcInYtb246Y2FuY2VsXCI6XCJjb21tZW50Q2FuY2VsXCIsXCJ2LW9uOnN1cmVcIjpcImNvbW1lbnRTdXJlXCIsXCJ2LW9uOmlucHV0XCI6XCJiaW5kQ29tbWVudElucHV0XCJ9LFwiU2VsZWN0TW9kYWxcIjp7XCJ2LW9uOmNhbmNlbFwiOlwic2VsZWN0Q2FuY2VsXCIsXCJ2LW9uOnN1cmVcIjpcInNlbGVjdFN1cmVcIn0sXCJzaGFyZU1vZGFsXCI6e1widi1vbjpjYW5jZWxcIjpcImNhbmNlbFNoYXJlRm5cIixcInYtb246c3VyZVwiOlwiY2FuY2VsU2hhcmVGblwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgIEN1cnJlbnRNb2RhbCxcbiAgICBTZWxlY3RNb2RhbCxcbiAgICBzaGFyZU1vZGFsXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBjb21tZW50RmxhZzogZmFsc2UsXG4gICAgcG46IDEsXG4gICAgcHM6IDEwLFxuICAgIGxpc3Q6IFtdLFxuICAgIGNsYXNzSW5mbzogbnVsbCxcbiAgICBtZW1iZXJJbmZvOiBudWxsLFxuICAgIHNjaG9vbEluZm86IG51bGwsXG4gICAgbG9hZGluZzogZmFsc2UsXG4gICAgbG9hZEZpbmlzaGVkOiBmYWxzZSxcbiAgICBjb21tZW50SW5wdXQ6ICcnLFxuICAgIGN1cnJlbnRSZXBseUlkOiAtMSxcbiAgICBjdXJyZW50UmVwbHlSb290SWQ6IC0xLFxuICAgIGN1cnJlbnRSZXBseVRvQ29tbWVudElkOiAtMSxcbiAgICBjb21tZW50UG46IDIsXG4gICAgY29tbWVudFBzOiA2LFxuICAgIGNvbW1lbnRPZmZzZXQ6IDYsXG4gICAgY29tbWVudExvYWRGaW5pc2hlZDogZmFsc2UsXG4gICAgbWVtYmVyTGlzdDogW10sXG4gICAgbG9hZE1vcmVDb21tZW50QXJyYXk6IFtdLFxuICAgIHNoYXJlVGl0bGU6ICcnLFxuICAgIHNob3dTaGFyZUZsYWc6IGZhbHNlLFxuICAgIHNoYXJlSW1nOiAnLi4vaW1hZ2VzL3NoYXJlL2NpcmNsZXMuanBnJ1xuICB9XG4gIHdhdGNoID0ge1xuICAgIGNsYXNzSW5mbyhuZXdWYWwsIG9sZFZhbCkge1xuICAgICAgLy8g5YiH5o2i5LqG54+t57qn5LmL5ZCO5pWw5o2u6KaB5pu05pawXG4gICAgICBpZiAob2xkVmFsICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMucmVzZXREYXRhKClcbiAgICAgICAgdGhpcy5nZXRab25lTGlzdCgpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJlc2V0RGF0YSgpIHtcbiAgICB0aGlzLmxvYWRNb3JlQ29tbWVudEFycmF5ID0gW11cbiAgICB0aGlzLmNvbW1lbnRMb2FkRmluaXNoZWQgPSBmYWxzZVxuICAgIHRoaXMuY29tbWVudFBuID0gMlxuICAgIHRoaXMuY29tbWVudFBzID0gNlxuICAgIHRoaXMucG4gPSAxXG4gICAgdGhpcy5saXN0ID0gW11cbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgb25QdWxsRG93blJlZnJlc2goKSB7XG4gICAgdGhpcy5yZXNldERhdGEoKVxuICAgIHRoaXMuZ2V0Wm9uZUxpc3QoKVxuICB9XG4gIG9uUmVhY2hCb3R0b20oKSB7XG4gICAgaWYgKHRoaXMubG9hZGluZyB8fCB0aGlzLmxvYWRGaW5pc2hlZCkgcmV0dXJuXG4gICAgdGhpcy5nZXRab25lTGlzdCgpXG4gIH1cbiAgb25Mb2FkKCkge1xuICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXG4gICAgdGhpcy5tZW1iZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nKVxuICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJEYXRhID0gdGhpcy5tZW1iZXJJbmZvXG4gICAgdGhpcy4kYXBwbHkoKVxuICAgIHRoaXMuZ2V0Wm9uZUxpc3QoKVxuICB9XG4gIG9uU2hvdygpIHtcbiAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxuICB9XG4gIGdldFpvbmVMaXN0KCkge1xuICAgIHRoaXMubG9hZGluZyA9IHRydWVcbiAgICB0aGlzLiRhcHBseSgpXG4gICAgY29uc3QgaWQgPSB0aGlzLmNsYXNzSW5mby5pZFxuICAgIGdldENpcmNsZUxpc3Qoe1xuICAgICAgc2VlX3R5cGU6ICdhbGwnLFxuICAgICAgdHlwZTogJ2NpcmNsZXMnLFxuICAgICAgcG46IHRoaXMucG4sXG4gICAgICBwczogdGhpcy5wcyxcbiAgICAgIGNvbW1lbnRfY291bnQ6IDNcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgeyBsaXN0IH0gPSByZXMuZGF0YVxuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2VcbiAgICAgIHRoaXMucG4rK1xuICAgICAgaWYgKGxpc3QubGVuZ3RoIDwgdGhpcy5wcykge1xuICAgICAgICB0aGlzLmxvYWRGaW5pc2hlZCA9IHRydWVcbiAgICAgIH1cbiAgICAgIHRoaXMubGlzdCA9IFsuLi50aGlzLmxpc3QsIC4uLmxpc3RdXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSlcbiAgfVxuICBmaW5kTG9hZG1vcmVDb21tZW50SW5mbyhhcnIsIGN1cnJlbnRJZCkge1xuICAgIGxldCByZXRPYmogPSB7fVxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhcnIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmIChhcnJbaV0ubW9tZW50X2lkID09PSBjdXJyZW50SWQpIHtcbiAgICAgICAgcmV0T2JqID0gT2JqZWN0LmFzc2lnbih7fSwgYXJyW2ldLCB7XG4gICAgICAgICAgaW5kZXg6IGlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJldE9ialxuICB9XG4gIG9uU2hhcmVBcHBNZXNzYWdlKHJlcykge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogdGhpcy5zaGFyZVRpdGxlLFxuICAgICAgaW1hZ2VVcmw6IHRoaXMuc2hhcmVJbWdcbiAgICB9XG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBhZGRMaWtlKG1vbWVudElkLCBpZHgsIGlzTGlrZWQpIHtcbiAgICAgIGlmICghdGhpcy5jbGFzc0luZm8pIHtcbiAgICAgICAgc2hvd01zZygn6K+35YWI6YCJ5oup54+t57qnJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBhZGRMaWtlKHtcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgICBtb21lbnRfaWQ6IG1vbWVudElkXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgaWYgKGlzTGlrZWQpIHtcbiAgICAgICAgICAgIHNob3dNc2coJ+WPlua2iOeCuei1nuaIkOWKnycpXG4gICAgICAgICAgICB0aGlzLmxpc3RbaWR4XS5saWtlX2xpc3QuY291bnQtLVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzaG93TXNnKCfngrnotZ7miJDlip8nKVxuICAgICAgICAgICAgdGhpcy5saXN0W2lkeF0ubGlrZV9saXN0LmNvdW50KytcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5saXN0W2lkeF0uaXNfbGlrZSA9ICFpc0xpa2VkXG4gICAgICAgICAgY29uc3QgbmV3T2JqID0ge1xuICAgICAgICAgICAgbW9tZW50X2lkOiBtb21lbnRJZCxcbiAgICAgICAgICAgIG1lbWJlcl9pZDogdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCxcbiAgICAgICAgICAgIG1lbWJlcjogdGhpcy5tZW1iZXJJbmZvXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubGlzdFtpZHhdLmxpa2VfbGlzdC5saXN0ID0gZmlsdGVyQXJyYXlCeVZhbHVlKHRoaXMubWVtYmVySW5mby5tZW1iZXJfaWQsIHRoaXMubGlzdFtpZHhdLmxpa2VfbGlzdC5saXN0LCBpc0xpa2VkLCBuZXdPYmopXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgY2FuY2VsU2hhcmVGbigpIHtcbiAgICAgIHRoaXMuc2hvd1NoYXJlRmxhZyA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBzaGFyZUNpcmNsZSgpIHtcbiAgICAgIHRoaXMuc2hhcmVUaXRsZSA9IGAke3RoaXMubWVtYmVySW5mby5uaWNrbmFtZX3liIbkuqvkuobkuIDkuKrlj5HnjrDvvIzngrnlh7vmtY/op4hgXG4gICAgICB0aGlzLnNob3dTaGFyZUZsYWcgPSB0cnVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICByZW1vdmVDaXJjbGUoaWQsIGlkeCkge1xuICAgICAgZGVsZXRlQ2lyY2xlKHtcbiAgICAgICAgbW9tZW50X2lkOiBpZCxcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgc2hvd01zZygn5oiQ5Yqf5Yig6ZmkJylcbiAgICAgICAgICB0aGlzLmxpc3Quc3BsaWNlKGlkeCwgMSlcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBsb2FkTW9yZUNvbW1lbnQobW9tZW50SWQsIGlkeCkge1xuICAgICAgY29uc3QgcmV0T2JqID0gdGhpcy5maW5kTG9hZG1vcmVDb21tZW50SW5mbyh0aGlzLmxvYWRNb3JlQ29tbWVudEFycmF5LCBtb21lbnRJZCk7XG4gICAgICBnZXRDb21tZW50TGlzdCh7XG4gICAgICAgIG1vbWVudF9pZDogbW9tZW50SWQsXG4gICAgICAgIHBzOiB0aGlzLmNvbW1lbnRQcyxcbiAgICAgICAgcG46IHJldE9iai5jb21tZW50UG4gPyByZXRPYmouY29tbWVudFBuIDogdGhpcy5jb21tZW50UG4sXG4gICAgICAgIG9mZnNldDogdGhpcy5jb21tZW50T2Zmc2V0XG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgbGV0IHJlc3VsdExpc3QgPSByZXMuZGF0YS5saXN0XG4gICAgICAgICAgbGV0IHtsaXN0fSA9IHRoaXMubGlzdFtpZHhdLmNvbW1lbnRfbGlzdFxuICAgICAgICAgIGxpc3QgPSBbLi4ubGlzdCwgLi4ucmVzdWx0TGlzdF1cbiAgICAgICAgICB0aGlzLmxpc3RbaWR4XS5jb21tZW50X2xpc3QubGlzdCA9IGxpc3RcbiAgICAgICAgICBpZiAocmVzdWx0TGlzdC5sZW5ndGggPCB0aGlzLmNvbW1lbnRQcykge1xuICAgICAgICAgICAgdGhpcy5saXN0W2lkeF0uY29tbWVudExvYWRGaW5pc2hlZCA9IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFyZXRPYmouY29tbWVudFBuKSB7XG4gICAgICAgICAgICBjb25zdCBvYmogPSB7XG4gICAgICAgICAgICAgIGNvbW1lbnRQbjogdGhpcy5jb21tZW50UG4gKyAxLFxuICAgICAgICAgICAgICBtb21lbnRfaWQ6IG1vbWVudElkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmxvYWRNb3JlQ29tbWVudEFycmF5LnB1c2gob2JqKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRNb3JlQ29tbWVudEFycmF5W3JldE9iai5pbmRleF0uY29tbWVudFBuID0gcmV0T2JqLmNvbW1lbnRQbiArIDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIGFkZENvbW1lbnQodHlwZSwgaWQsIHJvb3RJZCwgdG9Db21tZW50SWQsIG5hbWUpIHtcbiAgICAgIGlmICh0b0NvbW1lbnRJZCA9PT0gdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCkge1xuICAgICAgICBzaG93TXNnKCfor7fkuI3opoHlm57lpI3oh6rlt7EnKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5jbGFzc0luZm8pIHtcbiAgICAgICAgc2hvd01zZygn6K+35YWI6YCJ5oup54+t57qnJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB0aGlzLmNvbW1lbnRGbGFnID0gdHJ1ZVxuICAgICAgdGhpcy5jdXJyZW50UmVwbHlJZCA9IGlkXG4gICAgICB0aGlzLmN1cnJlbnRSZXBseVJvb3RJZCA9IHR5cGUgPT09ICdhZGQnID8gMCA6IHJvb3RJZFxuICAgICAgaWYgKG5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmNvbW1lbnRJbnB1dCA9IGBAJHtuYW1lfTpgXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbW1lbnRJbnB1dCA9ICcnXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBiaW5kQ29tbWVudElucHV0ICh2YWx1ZSkge1xuICAgICAgdGhpcy5jb21tZW50SW5wdXQgPSB2YWx1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgY29tbWVudFN1cmUgKCkge1xuICAgICAgdGhpcy5jb21tZW50RmxhZyA9IGZhbHNlXG4gICAgICBhZGRDb21tZW50KHtcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgICBtb21lbnRfaWQ6IHRoaXMuY3VycmVudFJlcGx5SWQsXG4gICAgICAgIGNvbnRlbnQ6IHRoaXMuY3VycmVudFJlcGx5SWQgPiAwID8gdGhpcy5jb21tZW50SW5wdXQucmVwbGFjZSgvXkAuKzovLCAnJykgOiB0aGlzLmNvbW1lbnRJbnB1dCxcbiAgICAgICAgcm9vdF9pZDogdGhpcy5jdXJyZW50UmVwbHlSb290SWQsXG4gICAgICAgIHRvX2NvbW1lbnRfaWQ6IHRoaXMuY3VycmVudFJlcGx5Um9vdElkXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgdGhpcy5jb21tZW50SW5wdXQgPSAnJ1xuICAgICAgICAgIHRoaXMucmVzZXREYXRhKClcbiAgICAgICAgICB0aGlzLmdldFpvbmVMaXN0KClcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBjb21tZW50Q2FuY2VsICgpIHtcbiAgICAgIHRoaXMuY29tbWVudEZsYWcgPSBmYWxzZVxuICAgICAgdGhpcy5jb21tZW50SW5wdXQgPSAnJ1xuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgcHJldmlldyhpbWcsIGltZ0xpc3QpIHtcbiAgICAgIHByZXZpZXdJbWFnZShpbWcsIGltZ0xpc3QpXG4gICAgfVxuICB9XG59XG4iXX0=