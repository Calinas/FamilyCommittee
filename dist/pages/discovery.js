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

        if (!this.classInfo && !this.classInfo.id) {
          (0, _common.showMsg)('请先加入班级');
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc2NvdmVyeS5qcyJdLCJuYW1lcyI6WyJEaXNjb3ZlcnkiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiQ3VycmVudE1vZGFsIiwiU2VsZWN0TW9kYWwiLCJzaGFyZU1vZGFsIiwiZGF0YSIsImNvbW1lbnRGbGFnIiwicG4iLCJwcyIsImxpc3QiLCJjbGFzc0luZm8iLCJtZW1iZXJJbmZvIiwic2Nob29sSW5mbyIsImxvYWRpbmciLCJsb2FkRmluaXNoZWQiLCJjb21tZW50SW5wdXQiLCJjdXJyZW50UmVwbHlJZCIsImN1cnJlbnRSZXBseVJvb3RJZCIsImN1cnJlbnRSZXBseVRvQ29tbWVudElkIiwiY29tbWVudFBuIiwiY29tbWVudFBzIiwiY29tbWVudE9mZnNldCIsImNvbW1lbnRMb2FkRmluaXNoZWQiLCJtZW1iZXJMaXN0IiwibG9hZE1vcmVDb21tZW50QXJyYXkiLCJzaGFyZVRpdGxlIiwic2hvd1NoYXJlRmxhZyIsInNoYXJlSW1nIiwid2F0Y2giLCJuZXdWYWwiLCJvbGRWYWwiLCJyZXNldERhdGEiLCJnZXRab25lTGlzdCIsIm1ldGhvZHMiLCJhZGRMaWtlIiwibW9tZW50SWQiLCJpZHgiLCJpc0xpa2VkIiwiaWQiLCJjbGFzc19pZCIsIm1vbWVudF9pZCIsInRoZW4iLCJyZXMiLCJzdWNjZXNzIiwibGlrZV9saXN0IiwiY291bnQiLCJpc19saWtlIiwibmV3T2JqIiwibWVtYmVyX2lkIiwibWVtYmVyIiwiJGFwcGx5IiwiY2FuY2VsU2hhcmVGbiIsInNoYXJlQ2lyY2xlIiwibmlja25hbWUiLCJyZW1vdmVDaXJjbGUiLCJzcGxpY2UiLCJsb2FkTW9yZUNvbW1lbnQiLCJyZXRPYmoiLCJmaW5kTG9hZG1vcmVDb21tZW50SW5mbyIsIm9mZnNldCIsInJlc3VsdExpc3QiLCJjb21tZW50X2xpc3QiLCJsZW5ndGgiLCJvYmoiLCJwdXNoIiwiaW5kZXgiLCJhZGRDb21tZW50IiwidHlwZSIsInJvb3RJZCIsInRvQ29tbWVudElkIiwibmFtZSIsInVuZGVmaW5lZCIsImJpbmRDb21tZW50SW5wdXQiLCJ2YWx1ZSIsImNvbW1lbnRTdXJlIiwiY29udGVudCIsInJlcGxhY2UiLCJyb290X2lkIiwidG9fY29tbWVudF9pZCIsImNvbW1lbnRDYW5jZWwiLCJwcmV2aWV3IiwiaW1nIiwiaW1nTGlzdCIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInVzZXJEYXRhIiwic2VlX3R5cGUiLCJjb21tZW50X2NvdW50IiwiYXJyIiwiY3VycmVudElkIiwiaSIsImxlbiIsIk9iamVjdCIsImFzc2lnbiIsInRpdGxlIiwiaW1hZ2VVcmwiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsTUFEakI7QUFFUEMsNkJBQXVCO0FBRmhCLEssUUFJVkMsTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsZ0JBQWUsRUFBQyxlQUFjLElBQWYsRUFBb0IsaUJBQWdCLElBQXBDLEVBQXlDLG1CQUFrQixTQUEzRCxFQUFxRSxnQkFBZSxFQUFwRixFQUF1RixvQkFBbUIsYUFBMUcsRUFBd0gsNEJBQTJCLGNBQW5KLEVBQWtLLGNBQWEsRUFBL0ssRUFBaEIsRUFBbU0sZUFBYyxFQUFDLG9CQUFtQixZQUFwQixFQUFpQyxvQkFBbUIsZUFBcEQsRUFBak4sRUFBc1IsY0FBYSxFQUFDLG9CQUFtQixlQUFwQixFQUFvQyxxQkFBb0IsWUFBeEQsRUFBcUUsc0JBQXFCLFVBQTFGLEVBQW5TLEUsUUFDVEMsTyxHQUFVLEVBQUMsZ0JBQWUsRUFBQyxlQUFjLGVBQWYsRUFBK0IsYUFBWSxhQUEzQyxFQUF5RCxjQUFhLGtC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QyxNQUFMO0FBQ0QsT0FmRDtBQWdCRDs7OzRDQUN1QndDLEcsRUFBS0MsUyxFQUFXO0FBQ3RDLFVBQUlsQyxTQUFTLEVBQWI7QUFDQSxXQUFLLElBQUltQyxJQUFJLENBQVIsRUFBV0MsTUFBTUgsSUFBSTVCLE1BQTFCLEVBQWtDOEIsSUFBSUMsR0FBdEMsRUFBMkNELEdBQTNDLEVBQWdEO0FBQzlDLFlBQUlGLElBQUlFLENBQUosRUFBT3BELFNBQVAsS0FBcUJtRCxTQUF6QixFQUFvQztBQUNsQ2xDLG1CQUFTcUMsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JMLElBQUlFLENBQUosQ0FBbEIsRUFBMEI7QUFDakMzQixtQkFBTzJCO0FBRDBCLFdBQTFCLENBQVQ7QUFHRDtBQUNGO0FBQ0QsYUFBT25DLE1BQVA7QUFDRDs7O3NDQUNpQmYsRyxFQUFLO0FBQ3JCLGFBQU87QUFDTHNELGVBQU8sS0FBS3ZFLFVBRFA7QUFFTHdFLGtCQUFVLEtBQUt0RTtBQUZWLE9BQVA7QUFJRDs7OztFQTlHb0N1RSxlQUFLQyxJOztrQkFBdkJ6RyxTIiwiZmlsZSI6ImRpc2NvdmVyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgeyBzaG93TXNnLCBwcmV2aWV3SW1hZ2UsIGZpbHRlckFycmF5QnlWYWx1ZSB9IGZyb20gJy4uL3V0aWxzL2NvbW1vbidcclxuaW1wb3J0IFNlbGVjdE1vZGFsIGZyb20gJy4uL2NvbXBvbmVudHMvc2VsZWN0TW9kYWwnXHJcbmltcG9ydCBDdXJyZW50TW9kYWwgZnJvbSAnLi4vY29tcG9uZW50cy9jb21tZW50TW9kYWwnXHJcbmltcG9ydCBzaGFyZU1vZGFsIGZyb20gJy4uL2NvbXBvbmVudHMvc2hhcmVNb2RhbCdcclxuaW1wb3J0IHsgZ2V0Q2lyY2xlTGlzdCwgYWRkQ29tbWVudCwgZ2V0Q29tbWVudExpc3QsIGRlbGV0ZUNpcmNsZSwgYWRkTGlrZSB9IGZyb20gJy4uL2FwaS96b25lJ1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaXNjb3ZlcnkgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflrrbplb/lnIjlrZAnLFxyXG4gICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiB0cnVlXHJcbiAgfVxyXG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJDdXJyZW50TW9kYWxcIjp7XCJzdXJlQnRuVGV4dFwiOlwi56Gu6K6kXCIsXCJjYW5jZWxCdG5UZXh0XCI6XCLlj5bmtohcIixcInBsYWNlaG9sZGVyVGV4dFwiOlwi6K+36L6T5YWl6K+E6K665YaF5a65XCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmZsYWcuc3luY1wiOlwiY29tbWVudEZsYWdcIixcInYtYmluZDpjb21tZW50SW5wdXQuc3luY1wiOlwiY29tbWVudElucHV0XCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJTZWxlY3RNb2RhbFwiOntcInYtYmluZDpmbGFnLnN5bmNcIjpcInNlbGVjdEZsYWdcIixcInYtYmluZDpsaXN0LnN5bmNcIjpcInBheU1lbWJlckxpc3RcIn0sXCJzaGFyZU1vZGFsXCI6e1widi1iaW5kOmZsYWcuc3luY1wiOlwic2hvd1NoYXJlRmxhZ1wiLFwidi1iaW5kOnRpdGxlLnN5bmNcIjpcInNoYXJlVGl0bGVcIixcInYtYmluZDppbWdTcmMuc3luY1wiOlwic2hhcmVJbWdcIn19O1xyXG4kZXZlbnRzID0ge1wiQ3VycmVudE1vZGFsXCI6e1widi1vbjpjYW5jZWxcIjpcImNvbW1lbnRDYW5jZWxcIixcInYtb246c3VyZVwiOlwiY29tbWVudFN1cmVcIixcInYtb246aW5wdXRcIjpcImJpbmRDb21tZW50SW5wdXRcIn0sXCJTZWxlY3RNb2RhbFwiOntcInYtb246Y2FuY2VsXCI6XCJzZWxlY3RDYW5jZWxcIixcInYtb246c3VyZVwiOlwic2VsZWN0U3VyZVwifSxcInNoYXJlTW9kYWxcIjp7XCJ2LW9uOmNhbmNlbFwiOlwiY2FuY2VsU2hhcmVGblwiLFwidi1vbjpzdXJlXCI6XCJjYW5jZWxTaGFyZUZuXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICBDdXJyZW50TW9kYWwsXHJcbiAgICBTZWxlY3RNb2RhbCxcclxuICAgIHNoYXJlTW9kYWxcclxuICB9XHJcbiAgZGF0YSA9IHtcclxuICAgIGNvbW1lbnRGbGFnOiBmYWxzZSxcclxuICAgIHBuOiAxLFxyXG4gICAgcHM6IDEwLFxyXG4gICAgbGlzdDogW10sXHJcbiAgICBjbGFzc0luZm86IG51bGwsXHJcbiAgICBtZW1iZXJJbmZvOiBudWxsLFxyXG4gICAgc2Nob29sSW5mbzogbnVsbCxcclxuICAgIGxvYWRpbmc6IGZhbHNlLFxyXG4gICAgbG9hZEZpbmlzaGVkOiBmYWxzZSxcclxuICAgIGNvbW1lbnRJbnB1dDogJycsXHJcbiAgICBjdXJyZW50UmVwbHlJZDogLTEsXHJcbiAgICBjdXJyZW50UmVwbHlSb290SWQ6IC0xLFxyXG4gICAgY3VycmVudFJlcGx5VG9Db21tZW50SWQ6IC0xLFxyXG4gICAgY29tbWVudFBuOiAyLFxyXG4gICAgY29tbWVudFBzOiA2LFxyXG4gICAgY29tbWVudE9mZnNldDogNixcclxuICAgIGNvbW1lbnRMb2FkRmluaXNoZWQ6IGZhbHNlLFxyXG4gICAgbWVtYmVyTGlzdDogW10sXHJcbiAgICBsb2FkTW9yZUNvbW1lbnRBcnJheTogW10sXHJcbiAgICBzaGFyZVRpdGxlOiAnJyxcclxuICAgIHNob3dTaGFyZUZsYWc6IGZhbHNlLFxyXG4gICAgc2hhcmVJbWc6ICcuLi9pbWFnZXMvc2hhcmUvY2lyY2xlcy5qcGcnXHJcbiAgfVxyXG4gIHdhdGNoID0ge1xyXG4gICAgY2xhc3NJbmZvKG5ld1ZhbCwgb2xkVmFsKSB7XHJcbiAgICAgIC8vIOWIh+aNouS6huePree6p+S5i+WQjuaVsOaNruimgeabtOaWsFxyXG4gICAgICBpZiAob2xkVmFsICE9PSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5yZXNldERhdGEoKVxyXG4gICAgICAgIHRoaXMuZ2V0Wm9uZUxpc3QoKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJlc2V0RGF0YSgpIHtcclxuICAgIHRoaXMubG9hZE1vcmVDb21tZW50QXJyYXkgPSBbXVxyXG4gICAgdGhpcy5jb21tZW50TG9hZEZpbmlzaGVkID0gZmFsc2VcclxuICAgIHRoaXMuY29tbWVudFBuID0gMlxyXG4gICAgdGhpcy5jb21tZW50UHMgPSA2XHJcbiAgICB0aGlzLnBuID0gMVxyXG4gICAgdGhpcy5saXN0ID0gW11cclxuICAgIHRoaXMuJGFwcGx5KClcclxuICB9XHJcbiAgb25QdWxsRG93blJlZnJlc2goKSB7XHJcbiAgICB0aGlzLnJlc2V0RGF0YSgpXHJcbiAgICB0aGlzLmdldFpvbmVMaXN0KClcclxuICB9XHJcbiAgb25SZWFjaEJvdHRvbSgpIHtcclxuICAgIGlmICh0aGlzLmxvYWRpbmcgfHwgdGhpcy5sb2FkRmluaXNoZWQpIHJldHVyblxyXG4gICAgdGhpcy5nZXRab25lTGlzdCgpXHJcbiAgfVxyXG4gIG9uTG9hZCgpIHtcclxuICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXHJcbiAgICB0aGlzLm1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXHJcbiAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyRGF0YSA9IHRoaXMubWVtYmVySW5mb1xyXG4gICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgdGhpcy5nZXRab25lTGlzdCgpXHJcbiAgfVxyXG4gIG9uU2hvdygpIHtcclxuICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXHJcbiAgfVxyXG4gIGdldFpvbmVMaXN0KCkge1xyXG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZVxyXG4gICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgY29uc3QgaWQgPSB0aGlzLmNsYXNzSW5mby5pZFxyXG4gICAgZ2V0Q2lyY2xlTGlzdCh7XHJcbiAgICAgIHNlZV90eXBlOiAnYWxsJyxcclxuICAgICAgdHlwZTogJ2NpcmNsZXMnLFxyXG4gICAgICBwbjogdGhpcy5wbixcclxuICAgICAgcHM6IHRoaXMucHMsXHJcbiAgICAgIGNvbW1lbnRfY291bnQ6IDNcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgbGV0IHsgbGlzdCB9ID0gcmVzLmRhdGFcclxuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2VcclxuICAgICAgdGhpcy5wbisrXHJcbiAgICAgIGlmIChsaXN0Lmxlbmd0aCA8IHRoaXMucHMpIHtcclxuICAgICAgICB0aGlzLmxvYWRGaW5pc2hlZCA9IHRydWVcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmxpc3QgPSBbLi4udGhpcy5saXN0LCAuLi5saXN0XVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9KVxyXG4gIH1cclxuICBmaW5kTG9hZG1vcmVDb21tZW50SW5mbyhhcnIsIGN1cnJlbnRJZCkge1xyXG4gICAgbGV0IHJldE9iaiA9IHt9XHJcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gYXJyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgIGlmIChhcnJbaV0ubW9tZW50X2lkID09PSBjdXJyZW50SWQpIHtcclxuICAgICAgICByZXRPYmogPSBPYmplY3QuYXNzaWduKHt9LCBhcnJbaV0sIHtcclxuICAgICAgICAgIGluZGV4OiBpXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJldE9ialxyXG4gIH1cclxuICBvblNoYXJlQXBwTWVzc2FnZShyZXMpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRpdGxlOiB0aGlzLnNoYXJlVGl0bGUsXHJcbiAgICAgIGltYWdlVXJsOiB0aGlzLnNoYXJlSW1nXHJcbiAgICB9XHJcbiAgfVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBhZGRMaWtlKG1vbWVudElkLCBpZHgsIGlzTGlrZWQpIHtcclxuICAgICAgaWYgKCF0aGlzLmNsYXNzSW5mbyAmJiAhdGhpcy5jbGFzc0luZm8uaWQpIHtcclxuICAgICAgICBzaG93TXNnKCfor7flhYjliqDlhaXnj63nuqcnKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICAgIGFkZExpa2Uoe1xyXG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcclxuICAgICAgICBtb21lbnRfaWQ6IG1vbWVudElkXHJcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgaWYgKGlzTGlrZWQpIHtcclxuICAgICAgICAgICAgc2hvd01zZygn5Y+W5raI54K56LWe5oiQ5YqfJylcclxuICAgICAgICAgICAgdGhpcy5saXN0W2lkeF0ubGlrZV9saXN0LmNvdW50LS1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNob3dNc2coJ+eCuei1nuaIkOWKnycpXHJcbiAgICAgICAgICAgIHRoaXMubGlzdFtpZHhdLmxpa2VfbGlzdC5jb3VudCsrXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLmxpc3RbaWR4XS5pc19saWtlID0gIWlzTGlrZWRcclxuICAgICAgICAgIGNvbnN0IG5ld09iaiA9IHtcclxuICAgICAgICAgICAgbW9tZW50X2lkOiBtb21lbnRJZCxcclxuICAgICAgICAgICAgbWVtYmVyX2lkOiB0aGlzLm1lbWJlckluZm8ubWVtYmVyX2lkLFxyXG4gICAgICAgICAgICBtZW1iZXI6IHRoaXMubWVtYmVySW5mb1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5saXN0W2lkeF0ubGlrZV9saXN0Lmxpc3QgPSBmaWx0ZXJBcnJheUJ5VmFsdWUodGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCwgdGhpcy5saXN0W2lkeF0ubGlrZV9saXN0Lmxpc3QsIGlzTGlrZWQsIG5ld09iailcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgY2FuY2VsU2hhcmVGbigpIHtcclxuICAgICAgdGhpcy5zaG93U2hhcmVGbGFnID0gZmFsc2VcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSxcclxuICAgIHNoYXJlQ2lyY2xlKCkge1xyXG4gICAgICB0aGlzLnNoYXJlVGl0bGUgPSBgJHt0aGlzLm1lbWJlckluZm8ubmlja25hbWV95YiG5Lqr5LqG5LiA5Liq5Y+R546w77yM54K55Ye75rWP6KeIYFxyXG4gICAgICB0aGlzLnNob3dTaGFyZUZsYWcgPSB0cnVlXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0sXHJcbiAgICByZW1vdmVDaXJjbGUoaWQsIGlkeCkge1xyXG4gICAgICBkZWxldGVDaXJjbGUoe1xyXG4gICAgICAgIG1vbWVudF9pZDogaWQsXHJcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkXHJcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgc2hvd01zZygn5oiQ5Yqf5Yig6ZmkJylcclxuICAgICAgICAgIHRoaXMubGlzdC5zcGxpY2UoaWR4LCAxKVxyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBsb2FkTW9yZUNvbW1lbnQobW9tZW50SWQsIGlkeCkge1xyXG4gICAgICBjb25zdCByZXRPYmogPSB0aGlzLmZpbmRMb2FkbW9yZUNvbW1lbnRJbmZvKHRoaXMubG9hZE1vcmVDb21tZW50QXJyYXksIG1vbWVudElkKTtcclxuICAgICAgZ2V0Q29tbWVudExpc3Qoe1xyXG4gICAgICAgIG1vbWVudF9pZDogbW9tZW50SWQsXHJcbiAgICAgICAgcHM6IHRoaXMuY29tbWVudFBzLFxyXG4gICAgICAgIHBuOiByZXRPYmouY29tbWVudFBuID8gcmV0T2JqLmNvbW1lbnRQbiA6IHRoaXMuY29tbWVudFBuLFxyXG4gICAgICAgIG9mZnNldDogdGhpcy5jb21tZW50T2Zmc2V0XHJcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgbGV0IHJlc3VsdExpc3QgPSByZXMuZGF0YS5saXN0XHJcbiAgICAgICAgICBsZXQge2xpc3R9ID0gdGhpcy5saXN0W2lkeF0uY29tbWVudF9saXN0XHJcbiAgICAgICAgICBsaXN0ID0gWy4uLmxpc3QsIC4uLnJlc3VsdExpc3RdXHJcbiAgICAgICAgICB0aGlzLmxpc3RbaWR4XS5jb21tZW50X2xpc3QubGlzdCA9IGxpc3RcclxuICAgICAgICAgIGlmIChyZXN1bHRMaXN0Lmxlbmd0aCA8IHRoaXMuY29tbWVudFBzKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdFtpZHhdLmNvbW1lbnRMb2FkRmluaXNoZWQgPSB0cnVlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoIXJldE9iai5jb21tZW50UG4pIHtcclxuICAgICAgICAgICAgY29uc3Qgb2JqID0ge1xyXG4gICAgICAgICAgICAgIGNvbW1lbnRQbjogdGhpcy5jb21tZW50UG4gKyAxLFxyXG4gICAgICAgICAgICAgIG1vbWVudF9pZDogbW9tZW50SWRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmxvYWRNb3JlQ29tbWVudEFycmF5LnB1c2gob2JqKVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkTW9yZUNvbW1lbnRBcnJheVtyZXRPYmouaW5kZXhdLmNvbW1lbnRQbiA9IHJldE9iai5jb21tZW50UG4gKyAxO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBhZGRDb21tZW50KHR5cGUsIGlkLCByb290SWQsIHRvQ29tbWVudElkLCBuYW1lKSB7XHJcbiAgICAgIGlmICh0b0NvbW1lbnRJZCA9PT0gdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCkge1xyXG4gICAgICAgIHNob3dNc2coJ+ivt+S4jeimgeWbnuWkjeiHquW3sScpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgaWYgKCF0aGlzLmNsYXNzSW5mbykge1xyXG4gICAgICAgIHNob3dNc2coJ+ivt+WFiOmAieaLqeePree6pycpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5jb21tZW50RmxhZyA9IHRydWVcclxuICAgICAgdGhpcy5jdXJyZW50UmVwbHlJZCA9IGlkXHJcbiAgICAgIHRoaXMuY3VycmVudFJlcGx5Um9vdElkID0gdHlwZSA9PT0gJ2FkZCcgPyAwIDogcm9vdElkXHJcbiAgICAgIGlmIChuYW1lICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLmNvbW1lbnRJbnB1dCA9IGBAJHtuYW1lfTpgXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5jb21tZW50SW5wdXQgPSAnJ1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0sXHJcbiAgICBiaW5kQ29tbWVudElucHV0ICh2YWx1ZSkge1xyXG4gICAgICB0aGlzLmNvbW1lbnRJbnB1dCA9IHZhbHVlXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0sXHJcbiAgICBjb21tZW50U3VyZSAoKSB7XHJcbiAgICAgIHRoaXMuY29tbWVudEZsYWcgPSBmYWxzZVxyXG4gICAgICBhZGRDb21tZW50KHtcclxuICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXHJcbiAgICAgICAgbW9tZW50X2lkOiB0aGlzLmN1cnJlbnRSZXBseUlkLFxyXG4gICAgICAgIGNvbnRlbnQ6IHRoaXMuY3VycmVudFJlcGx5SWQgPiAwID8gdGhpcy5jb21tZW50SW5wdXQucmVwbGFjZSgvXkAuKzovLCAnJykgOiB0aGlzLmNvbW1lbnRJbnB1dCxcclxuICAgICAgICByb290X2lkOiB0aGlzLmN1cnJlbnRSZXBseVJvb3RJZCxcclxuICAgICAgICB0b19jb21tZW50X2lkOiB0aGlzLmN1cnJlbnRSZXBseVJvb3RJZFxyXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgIHRoaXMuY29tbWVudElucHV0ID0gJydcclxuICAgICAgICAgIHRoaXMucmVzZXREYXRhKClcclxuICAgICAgICAgIHRoaXMuZ2V0Wm9uZUxpc3QoKVxyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBjb21tZW50Q2FuY2VsICgpIHtcclxuICAgICAgdGhpcy5jb21tZW50RmxhZyA9IGZhbHNlXHJcbiAgICAgIHRoaXMuY29tbWVudElucHV0ID0gJydcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSxcclxuICAgIHByZXZpZXcoaW1nLCBpbWdMaXN0KSB7XHJcbiAgICAgIHByZXZpZXdJbWFnZShpbWcsIGltZ0xpc3QpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==