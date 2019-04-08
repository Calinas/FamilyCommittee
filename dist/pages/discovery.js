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
          (0, _common.showMsg)('请先加入班级');
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc2NvdmVyeS5qcyJdLCJuYW1lcyI6WyJEaXNjb3ZlcnkiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiQ3VycmVudE1vZGFsIiwiU2VsZWN0TW9kYWwiLCJzaGFyZU1vZGFsIiwiZGF0YSIsImNvbW1lbnRGbGFnIiwicG4iLCJwcyIsImxpc3QiLCJjbGFzc0luZm8iLCJtZW1iZXJJbmZvIiwic2Nob29sSW5mbyIsImxvYWRpbmciLCJsb2FkRmluaXNoZWQiLCJjb21tZW50SW5wdXQiLCJjdXJyZW50UmVwbHlJZCIsImN1cnJlbnRSZXBseVJvb3RJZCIsImN1cnJlbnRSZXBseVRvQ29tbWVudElkIiwiY29tbWVudFBuIiwiY29tbWVudFBzIiwiY29tbWVudE9mZnNldCIsImNvbW1lbnRMb2FkRmluaXNoZWQiLCJtZW1iZXJMaXN0IiwibG9hZE1vcmVDb21tZW50QXJyYXkiLCJzaGFyZVRpdGxlIiwic2hvd1NoYXJlRmxhZyIsInNoYXJlSW1nIiwid2F0Y2giLCJuZXdWYWwiLCJvbGRWYWwiLCJyZXNldERhdGEiLCJnZXRab25lTGlzdCIsIm1ldGhvZHMiLCJhZGRMaWtlIiwibW9tZW50SWQiLCJpZHgiLCJpc0xpa2VkIiwiaWQiLCJjbGFzc19pZCIsIm1vbWVudF9pZCIsInRoZW4iLCJyZXMiLCJzdWNjZXNzIiwibGlrZV9saXN0IiwiY291bnQiLCJpc19saWtlIiwibmV3T2JqIiwibWVtYmVyX2lkIiwibWVtYmVyIiwiJGFwcGx5IiwiY2FuY2VsU2hhcmVGbiIsInNoYXJlQ2lyY2xlIiwibmlja25hbWUiLCJyZW1vdmVDaXJjbGUiLCJzcGxpY2UiLCJsb2FkTW9yZUNvbW1lbnQiLCJyZXRPYmoiLCJmaW5kTG9hZG1vcmVDb21tZW50SW5mbyIsIm9mZnNldCIsInJlc3VsdExpc3QiLCJjb21tZW50X2xpc3QiLCJsZW5ndGgiLCJvYmoiLCJwdXNoIiwiaW5kZXgiLCJhZGRDb21tZW50IiwidHlwZSIsInJvb3RJZCIsInRvQ29tbWVudElkIiwibmFtZSIsInVuZGVmaW5lZCIsImJpbmRDb21tZW50SW5wdXQiLCJ2YWx1ZSIsImNvbW1lbnRTdXJlIiwiY29udGVudCIsInJlcGxhY2UiLCJyb290X2lkIiwidG9fY29tbWVudF9pZCIsImNvbW1lbnRDYW5jZWwiLCJwcmV2aWV3IiwiaW1nIiwiaW1nTGlzdCIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInVzZXJEYXRhIiwic2VlX3R5cGUiLCJjb21tZW50X2NvdW50IiwiYXJyIiwiY3VycmVudElkIiwiaSIsImxlbiIsIk9iamVjdCIsImFzc2lnbiIsInRpdGxlIiwiaW1hZ2VVcmwiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsTUFEakI7QUFFUEMsNkJBQXVCO0FBRmhCLEssUUFJVkMsTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsZ0JBQWUsRUFBQyxlQUFjLElBQWYsRUFBb0IsaUJBQWdCLElBQXBDLEVBQXlDLG1CQUFrQixTQUEzRCxFQUFxRSxnQkFBZSxFQUFwRixFQUF1RixvQkFBbUIsYUFBMUcsRUFBd0gsNEJBQTJCLGNBQW5KLEVBQWtLLGNBQWEsRUFBL0ssRUFBaEIsRUFBbU0sZUFBYyxFQUFDLG9CQUFtQixZQUFwQixFQUFpQyxvQkFBbUIsZUFBcEQsRUFBak4sRUFBc1IsY0FBYSxFQUFDLG9CQUFtQixlQUFwQixFQUFvQyxxQkFBb0IsWUFBeEQsRUFBcUUsc0JBQXFCLFVBQTFGLEVBQW5TLEUsUUFDVEMsTyxHQUFVLEVBQUMsZ0JBQWUsRUFBQyxlQUFjLGVBQWYsRUFBK0IsYUFBWSxhQUEzQyxFQUF5RCxjQUFhLGtC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QyxNQUFMO0FBQ0QsT0FmRDtBQWdCRDs7OzRDQUN1QndDLEcsRUFBS0MsUyxFQUFXO0FBQ3RDLFVBQUlsQyxTQUFTLEVBQWI7QUFDQSxXQUFLLElBQUltQyxJQUFJLENBQVIsRUFBV0MsTUFBTUgsSUFBSTVCLE1BQTFCLEVBQWtDOEIsSUFBSUMsR0FBdEMsRUFBMkNELEdBQTNDLEVBQWdEO0FBQzlDLFlBQUlGLElBQUlFLENBQUosRUFBT3BELFNBQVAsS0FBcUJtRCxTQUF6QixFQUFvQztBQUNsQ2xDLG1CQUFTcUMsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JMLElBQUlFLENBQUosQ0FBbEIsRUFBMEI7QUFDakMzQixtQkFBTzJCO0FBRDBCLFdBQTFCLENBQVQ7QUFHRDtBQUNGO0FBQ0QsYUFBT25DLE1BQVA7QUFDRDs7O3NDQUNpQmYsRyxFQUFLO0FBQ3JCLGFBQU87QUFDTHNELGVBQU8sS0FBS3ZFLFVBRFA7QUFFTHdFLGtCQUFVLEtBQUt0RTtBQUZWLE9BQVA7QUFJRDs7OztFQTlHb0N1RSxlQUFLQyxJOztrQkFBdkJ6RyxTIiwiZmlsZSI6ImRpc2NvdmVyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7IHNob3dNc2csIHByZXZpZXdJbWFnZSwgZmlsdGVyQXJyYXlCeVZhbHVlIH0gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xuaW1wb3J0IFNlbGVjdE1vZGFsIGZyb20gJy4uL2NvbXBvbmVudHMvc2VsZWN0TW9kYWwnXG5pbXBvcnQgQ3VycmVudE1vZGFsIGZyb20gJy4uL2NvbXBvbmVudHMvY29tbWVudE1vZGFsJ1xuaW1wb3J0IHNoYXJlTW9kYWwgZnJvbSAnLi4vY29tcG9uZW50cy9zaGFyZU1vZGFsJ1xuaW1wb3J0IHsgZ2V0Q2lyY2xlTGlzdCwgYWRkQ29tbWVudCwgZ2V0Q29tbWVudExpc3QsIGRlbGV0ZUNpcmNsZSwgYWRkTGlrZSB9IGZyb20gJy4uL2FwaS96b25lJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlzY292ZXJ5IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflrrbplb/lnIjlrZAnLFxuICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogdHJ1ZVxuICB9XG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJDdXJyZW50TW9kYWxcIjp7XCJzdXJlQnRuVGV4dFwiOlwi56Gu6K6kXCIsXCJjYW5jZWxCdG5UZXh0XCI6XCLlj5bmtohcIixcInBsYWNlaG9sZGVyVGV4dFwiOlwi6K+36L6T5YWl6K+E6K665YaF5a65XCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmZsYWcuc3luY1wiOlwiY29tbWVudEZsYWdcIixcInYtYmluZDpjb21tZW50SW5wdXQuc3luY1wiOlwiY29tbWVudElucHV0XCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJTZWxlY3RNb2RhbFwiOntcInYtYmluZDpmbGFnLnN5bmNcIjpcInNlbGVjdEZsYWdcIixcInYtYmluZDpsaXN0LnN5bmNcIjpcInBheU1lbWJlckxpc3RcIn0sXCJzaGFyZU1vZGFsXCI6e1widi1iaW5kOmZsYWcuc3luY1wiOlwic2hvd1NoYXJlRmxhZ1wiLFwidi1iaW5kOnRpdGxlLnN5bmNcIjpcInNoYXJlVGl0bGVcIixcInYtYmluZDppbWdTcmMuc3luY1wiOlwic2hhcmVJbWdcIn19O1xyXG4kZXZlbnRzID0ge1wiQ3VycmVudE1vZGFsXCI6e1widi1vbjpjYW5jZWxcIjpcImNvbW1lbnRDYW5jZWxcIixcInYtb246c3VyZVwiOlwiY29tbWVudFN1cmVcIixcInYtb246aW5wdXRcIjpcImJpbmRDb21tZW50SW5wdXRcIn0sXCJTZWxlY3RNb2RhbFwiOntcInYtb246Y2FuY2VsXCI6XCJzZWxlY3RDYW5jZWxcIixcInYtb246c3VyZVwiOlwic2VsZWN0U3VyZVwifSxcInNoYXJlTW9kYWxcIjp7XCJ2LW9uOmNhbmNlbFwiOlwiY2FuY2VsU2hhcmVGblwiLFwidi1vbjpzdXJlXCI6XCJjYW5jZWxTaGFyZUZuXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgQ3VycmVudE1vZGFsLFxuICAgIFNlbGVjdE1vZGFsLFxuICAgIHNoYXJlTW9kYWxcbiAgfVxuICBkYXRhID0ge1xuICAgIGNvbW1lbnRGbGFnOiBmYWxzZSxcbiAgICBwbjogMSxcbiAgICBwczogMTAsXG4gICAgbGlzdDogW10sXG4gICAgY2xhc3NJbmZvOiBudWxsLFxuICAgIG1lbWJlckluZm86IG51bGwsXG4gICAgc2Nob29sSW5mbzogbnVsbCxcbiAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICBsb2FkRmluaXNoZWQ6IGZhbHNlLFxuICAgIGNvbW1lbnRJbnB1dDogJycsXG4gICAgY3VycmVudFJlcGx5SWQ6IC0xLFxuICAgIGN1cnJlbnRSZXBseVJvb3RJZDogLTEsXG4gICAgY3VycmVudFJlcGx5VG9Db21tZW50SWQ6IC0xLFxuICAgIGNvbW1lbnRQbjogMixcbiAgICBjb21tZW50UHM6IDYsXG4gICAgY29tbWVudE9mZnNldDogNixcbiAgICBjb21tZW50TG9hZEZpbmlzaGVkOiBmYWxzZSxcbiAgICBtZW1iZXJMaXN0OiBbXSxcbiAgICBsb2FkTW9yZUNvbW1lbnRBcnJheTogW10sXG4gICAgc2hhcmVUaXRsZTogJycsXG4gICAgc2hvd1NoYXJlRmxhZzogZmFsc2UsXG4gICAgc2hhcmVJbWc6ICcuLi9pbWFnZXMvc2hhcmUvY2lyY2xlcy5qcGcnXG4gIH1cbiAgd2F0Y2ggPSB7XG4gICAgY2xhc3NJbmZvKG5ld1ZhbCwgb2xkVmFsKSB7XG4gICAgICAvLyDliIfmjaLkuobnj63nuqfkuYvlkI7mlbDmja7opoHmm7TmlrBcbiAgICAgIGlmIChvbGRWYWwgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5yZXNldERhdGEoKVxuICAgICAgICB0aGlzLmdldFpvbmVMaXN0KClcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmVzZXREYXRhKCkge1xuICAgIHRoaXMubG9hZE1vcmVDb21tZW50QXJyYXkgPSBbXVxuICAgIHRoaXMuY29tbWVudExvYWRGaW5pc2hlZCA9IGZhbHNlXG4gICAgdGhpcy5jb21tZW50UG4gPSAyXG4gICAgdGhpcy5jb21tZW50UHMgPSA2XG4gICAgdGhpcy5wbiA9IDFcbiAgICB0aGlzLmxpc3QgPSBbXVxuICAgIHRoaXMuJGFwcGx5KClcbiAgfVxuICBvblB1bGxEb3duUmVmcmVzaCgpIHtcbiAgICB0aGlzLnJlc2V0RGF0YSgpXG4gICAgdGhpcy5nZXRab25lTGlzdCgpXG4gIH1cbiAgb25SZWFjaEJvdHRvbSgpIHtcbiAgICBpZiAodGhpcy5sb2FkaW5nIHx8IHRoaXMubG9hZEZpbmlzaGVkKSByZXR1cm5cbiAgICB0aGlzLmdldFpvbmVMaXN0KClcbiAgfVxuICBvbkxvYWQoKSB7XG4gICAgdGhpcy5jbGFzc0luZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnY2xhc3NJbmZvJylcbiAgICB0aGlzLm1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXG4gICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckRhdGEgPSB0aGlzLm1lbWJlckluZm9cbiAgICB0aGlzLiRhcHBseSgpXG4gICAgdGhpcy5nZXRab25lTGlzdCgpXG4gIH1cbiAgb25TaG93KCkge1xuICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXG4gIH1cbiAgZ2V0Wm9uZUxpc3QoKSB7XG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZVxuICAgIHRoaXMuJGFwcGx5KClcbiAgICBjb25zdCBpZCA9IHRoaXMuY2xhc3NJbmZvLmlkXG4gICAgZ2V0Q2lyY2xlTGlzdCh7XG4gICAgICBzZWVfdHlwZTogJ2FsbCcsXG4gICAgICB0eXBlOiAnY2lyY2xlcycsXG4gICAgICBwbjogdGhpcy5wbixcbiAgICAgIHBzOiB0aGlzLnBzLFxuICAgICAgY29tbWVudF9jb3VudDogM1xuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIGxldCB7IGxpc3QgfSA9IHJlcy5kYXRhXG4gICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZVxuICAgICAgdGhpcy5wbisrXG4gICAgICBpZiAobGlzdC5sZW5ndGggPCB0aGlzLnBzKSB7XG4gICAgICAgIHRoaXMubG9hZEZpbmlzaGVkID0gdHJ1ZVxuICAgICAgfVxuICAgICAgdGhpcy5saXN0ID0gWy4uLnRoaXMubGlzdCwgLi4ubGlzdF1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9KVxuICB9XG4gIGZpbmRMb2FkbW9yZUNvbW1lbnRJbmZvKGFyciwgY3VycmVudElkKSB7XG4gICAgbGV0IHJldE9iaiA9IHt9XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGFyci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgaWYgKGFycltpXS5tb21lbnRfaWQgPT09IGN1cnJlbnRJZCkge1xuICAgICAgICByZXRPYmogPSBPYmplY3QuYXNzaWduKHt9LCBhcnJbaV0sIHtcbiAgICAgICAgICBpbmRleDogaVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmV0T2JqXG4gIH1cbiAgb25TaGFyZUFwcE1lc3NhZ2UocmVzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiB0aGlzLnNoYXJlVGl0bGUsXG4gICAgICBpbWFnZVVybDogdGhpcy5zaGFyZUltZ1xuICAgIH1cbiAgfVxuICBtZXRob2RzID0ge1xuICAgIGFkZExpa2UobW9tZW50SWQsIGlkeCwgaXNMaWtlZCkge1xuICAgICAgaWYgKCF0aGlzLmNsYXNzSW5mbyAmJiAhdGhpcy5jbGFzc0luZm8uaWQpIHtcbiAgICAgICAgc2hvd01zZygn6K+35YWI5Yqg5YWl54+t57qnJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBhZGRMaWtlKHtcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgICBtb21lbnRfaWQ6IG1vbWVudElkXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgaWYgKGlzTGlrZWQpIHtcbiAgICAgICAgICAgIHNob3dNc2coJ+WPlua2iOeCuei1nuaIkOWKnycpXG4gICAgICAgICAgICB0aGlzLmxpc3RbaWR4XS5saWtlX2xpc3QuY291bnQtLVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzaG93TXNnKCfngrnotZ7miJDlip8nKVxuICAgICAgICAgICAgdGhpcy5saXN0W2lkeF0ubGlrZV9saXN0LmNvdW50KytcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5saXN0W2lkeF0uaXNfbGlrZSA9ICFpc0xpa2VkXG4gICAgICAgICAgY29uc3QgbmV3T2JqID0ge1xuICAgICAgICAgICAgbW9tZW50X2lkOiBtb21lbnRJZCxcbiAgICAgICAgICAgIG1lbWJlcl9pZDogdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCxcbiAgICAgICAgICAgIG1lbWJlcjogdGhpcy5tZW1iZXJJbmZvXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubGlzdFtpZHhdLmxpa2VfbGlzdC5saXN0ID0gZmlsdGVyQXJyYXlCeVZhbHVlKHRoaXMubWVtYmVySW5mby5tZW1iZXJfaWQsIHRoaXMubGlzdFtpZHhdLmxpa2VfbGlzdC5saXN0LCBpc0xpa2VkLCBuZXdPYmopXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgY2FuY2VsU2hhcmVGbigpIHtcbiAgICAgIHRoaXMuc2hvd1NoYXJlRmxhZyA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBzaGFyZUNpcmNsZSgpIHtcbiAgICAgIHRoaXMuc2hhcmVUaXRsZSA9IGAke3RoaXMubWVtYmVySW5mby5uaWNrbmFtZX3liIbkuqvkuobkuIDkuKrlj5HnjrDvvIzngrnlh7vmtY/op4hgXG4gICAgICB0aGlzLnNob3dTaGFyZUZsYWcgPSB0cnVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICByZW1vdmVDaXJjbGUoaWQsIGlkeCkge1xuICAgICAgZGVsZXRlQ2lyY2xlKHtcbiAgICAgICAgbW9tZW50X2lkOiBpZCxcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgc2hvd01zZygn5oiQ5Yqf5Yig6ZmkJylcbiAgICAgICAgICB0aGlzLmxpc3Quc3BsaWNlKGlkeCwgMSlcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBsb2FkTW9yZUNvbW1lbnQobW9tZW50SWQsIGlkeCkge1xuICAgICAgY29uc3QgcmV0T2JqID0gdGhpcy5maW5kTG9hZG1vcmVDb21tZW50SW5mbyh0aGlzLmxvYWRNb3JlQ29tbWVudEFycmF5LCBtb21lbnRJZCk7XG4gICAgICBnZXRDb21tZW50TGlzdCh7XG4gICAgICAgIG1vbWVudF9pZDogbW9tZW50SWQsXG4gICAgICAgIHBzOiB0aGlzLmNvbW1lbnRQcyxcbiAgICAgICAgcG46IHJldE9iai5jb21tZW50UG4gPyByZXRPYmouY29tbWVudFBuIDogdGhpcy5jb21tZW50UG4sXG4gICAgICAgIG9mZnNldDogdGhpcy5jb21tZW50T2Zmc2V0XG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgbGV0IHJlc3VsdExpc3QgPSByZXMuZGF0YS5saXN0XG4gICAgICAgICAgbGV0IHtsaXN0fSA9IHRoaXMubGlzdFtpZHhdLmNvbW1lbnRfbGlzdFxuICAgICAgICAgIGxpc3QgPSBbLi4ubGlzdCwgLi4ucmVzdWx0TGlzdF1cbiAgICAgICAgICB0aGlzLmxpc3RbaWR4XS5jb21tZW50X2xpc3QubGlzdCA9IGxpc3RcbiAgICAgICAgICBpZiAocmVzdWx0TGlzdC5sZW5ndGggPCB0aGlzLmNvbW1lbnRQcykge1xuICAgICAgICAgICAgdGhpcy5saXN0W2lkeF0uY29tbWVudExvYWRGaW5pc2hlZCA9IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFyZXRPYmouY29tbWVudFBuKSB7XG4gICAgICAgICAgICBjb25zdCBvYmogPSB7XG4gICAgICAgICAgICAgIGNvbW1lbnRQbjogdGhpcy5jb21tZW50UG4gKyAxLFxuICAgICAgICAgICAgICBtb21lbnRfaWQ6IG1vbWVudElkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmxvYWRNb3JlQ29tbWVudEFycmF5LnB1c2gob2JqKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRNb3JlQ29tbWVudEFycmF5W3JldE9iai5pbmRleF0uY29tbWVudFBuID0gcmV0T2JqLmNvbW1lbnRQbiArIDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIGFkZENvbW1lbnQodHlwZSwgaWQsIHJvb3RJZCwgdG9Db21tZW50SWQsIG5hbWUpIHtcbiAgICAgIGlmICh0b0NvbW1lbnRJZCA9PT0gdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCkge1xuICAgICAgICBzaG93TXNnKCfor7fkuI3opoHlm57lpI3oh6rlt7EnKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5jbGFzc0luZm8pIHtcbiAgICAgICAgc2hvd01zZygn6K+35YWI5Yqg5YWl54+t57qnJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB0aGlzLmNvbW1lbnRGbGFnID0gdHJ1ZVxuICAgICAgdGhpcy5jdXJyZW50UmVwbHlJZCA9IGlkXG4gICAgICB0aGlzLmN1cnJlbnRSZXBseVJvb3RJZCA9IHR5cGUgPT09ICdhZGQnID8gMCA6IHJvb3RJZFxuICAgICAgaWYgKG5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmNvbW1lbnRJbnB1dCA9IGBAJHtuYW1lfTpgXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbW1lbnRJbnB1dCA9ICcnXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBiaW5kQ29tbWVudElucHV0ICh2YWx1ZSkge1xuICAgICAgdGhpcy5jb21tZW50SW5wdXQgPSB2YWx1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgY29tbWVudFN1cmUgKCkge1xuICAgICAgdGhpcy5jb21tZW50RmxhZyA9IGZhbHNlXG4gICAgICBhZGRDb21tZW50KHtcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgICBtb21lbnRfaWQ6IHRoaXMuY3VycmVudFJlcGx5SWQsXG4gICAgICAgIGNvbnRlbnQ6IHRoaXMuY3VycmVudFJlcGx5SWQgPiAwID8gdGhpcy5jb21tZW50SW5wdXQucmVwbGFjZSgvXkAuKzovLCAnJykgOiB0aGlzLmNvbW1lbnRJbnB1dCxcbiAgICAgICAgcm9vdF9pZDogdGhpcy5jdXJyZW50UmVwbHlSb290SWQsXG4gICAgICAgIHRvX2NvbW1lbnRfaWQ6IHRoaXMuY3VycmVudFJlcGx5Um9vdElkXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgdGhpcy5jb21tZW50SW5wdXQgPSAnJ1xuICAgICAgICAgIHRoaXMucmVzZXREYXRhKClcbiAgICAgICAgICB0aGlzLmdldFpvbmVMaXN0KClcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBjb21tZW50Q2FuY2VsICgpIHtcbiAgICAgIHRoaXMuY29tbWVudEZsYWcgPSBmYWxzZVxuICAgICAgdGhpcy5jb21tZW50SW5wdXQgPSAnJ1xuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgcHJldmlldyhpbWcsIGltZ0xpc3QpIHtcbiAgICAgIHByZXZpZXdJbWFnZShpbWcsIGltZ0xpc3QpXG4gICAgfVxuICB9XG59XG4iXX0=