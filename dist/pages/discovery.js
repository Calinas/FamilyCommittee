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
      if (this.memberInfo && this.memberInfo.member_id === -1) return; //微信测试用户
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc2NvdmVyeS5qcyJdLCJuYW1lcyI6WyJEaXNjb3ZlcnkiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiQ3VycmVudE1vZGFsIiwiU2VsZWN0TW9kYWwiLCJzaGFyZU1vZGFsIiwiZGF0YSIsImNvbW1lbnRGbGFnIiwicG4iLCJwcyIsImxpc3QiLCJjbGFzc0luZm8iLCJtZW1iZXJJbmZvIiwic2Nob29sSW5mbyIsImxvYWRpbmciLCJsb2FkRmluaXNoZWQiLCJjb21tZW50SW5wdXQiLCJjdXJyZW50UmVwbHlJZCIsImN1cnJlbnRSZXBseVJvb3RJZCIsImN1cnJlbnRSZXBseVRvQ29tbWVudElkIiwiY29tbWVudFBuIiwiY29tbWVudFBzIiwiY29tbWVudE9mZnNldCIsImNvbW1lbnRMb2FkRmluaXNoZWQiLCJtZW1iZXJMaXN0IiwibG9hZE1vcmVDb21tZW50QXJyYXkiLCJzaGFyZVRpdGxlIiwic2hvd1NoYXJlRmxhZyIsInNoYXJlSW1nIiwid2F0Y2giLCJuZXdWYWwiLCJvbGRWYWwiLCJyZXNldERhdGEiLCJnZXRab25lTGlzdCIsIm1ldGhvZHMiLCJhZGRMaWtlIiwibW9tZW50SWQiLCJpZHgiLCJpc0xpa2VkIiwiaWQiLCJjbGFzc19pZCIsIm1vbWVudF9pZCIsInRoZW4iLCJyZXMiLCJzdWNjZXNzIiwibGlrZV9saXN0IiwiY291bnQiLCJpc19saWtlIiwibmV3T2JqIiwibWVtYmVyX2lkIiwibWVtYmVyIiwiJGFwcGx5IiwiY2FuY2VsU2hhcmVGbiIsInNoYXJlQ2lyY2xlIiwibmlja25hbWUiLCJyZW1vdmVDaXJjbGUiLCJzcGxpY2UiLCJsb2FkTW9yZUNvbW1lbnQiLCJyZXRPYmoiLCJmaW5kTG9hZG1vcmVDb21tZW50SW5mbyIsIm9mZnNldCIsInJlc3VsdExpc3QiLCJjb21tZW50X2xpc3QiLCJsZW5ndGgiLCJvYmoiLCJwdXNoIiwiaW5kZXgiLCJhZGRDb21tZW50IiwidHlwZSIsInJvb3RJZCIsInRvQ29tbWVudElkIiwibmFtZSIsInVuZGVmaW5lZCIsImJpbmRDb21tZW50SW5wdXQiLCJ2YWx1ZSIsImNvbW1lbnRTdXJlIiwiY29udGVudCIsInJlcGxhY2UiLCJyb290X2lkIiwidG9fY29tbWVudF9pZCIsImNvbW1lbnRDYW5jZWwiLCJwcmV2aWV3IiwiaW1nIiwiaW1nTGlzdCIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsInVzZXJEYXRhIiwic2VlX3R5cGUiLCJjb21tZW50X2NvdW50IiwiYXJyIiwiY3VycmVudElkIiwiaSIsImxlbiIsIk9iamVjdCIsImFzc2lnbiIsInRpdGxlIiwiaW1hZ2VVcmwiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsTUFEakI7QUFFUEMsNkJBQXVCO0FBRmhCLEssUUFJVkMsTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsZ0JBQWUsRUFBQyxlQUFjLElBQWYsRUFBb0IsaUJBQWdCLElBQXBDLEVBQXlDLG1CQUFrQixTQUEzRCxFQUFxRSxnQkFBZSxFQUFwRixFQUF1RixvQkFBbUIsYUFBMUcsRUFBd0gsNEJBQTJCLGNBQW5KLEVBQWtLLGNBQWEsRUFBL0ssRUFBaEIsRUFBbU0sZUFBYyxFQUFDLG9CQUFtQixZQUFwQixFQUFpQyxvQkFBbUIsZUFBcEQsRUFBak4sRUFBc1IsY0FBYSxFQUFDLG9CQUFtQixlQUFwQixFQUFvQyxxQkFBb0IsWUFBeEQsRUFBcUUsc0JBQXFCLFVBQTFGLEVBQW5TLEUsUUFDVEMsTyxHQUFVLEVBQUMsZ0JBQWUsRUFBQyxlQUFjLGVBQWYsRUFBK0IsYUFBWSxhQUEzQyxFQUF5RCxjQUFhLGtC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LGlCQUFLTSxZQUFMLEdBQW9CLElBQXBCO0FBQ0Q7QUFDRCxlQUFLTCxJQUFMLGdDQUFnQixPQUFLQSxJQUFyQixzQkFBOEJBLElBQTlCO0FBQ0EsZUFBS3lDLE1BQUw7QUFDRCxPQWZEO0FBZ0JEOzs7NENBQ3VCd0MsRyxFQUFLQyxTLEVBQVc7QUFDdEMsVUFBSWxDLFNBQVMsRUFBYjtBQUNBLFdBQUssSUFBSW1DLElBQUksQ0FBUixFQUFXQyxNQUFNSCxJQUFJNUIsTUFBMUIsRUFBa0M4QixJQUFJQyxHQUF0QyxFQUEyQ0QsR0FBM0MsRUFBZ0Q7QUFDOUMsWUFBSUYsSUFBSUUsQ0FBSixFQUFPcEQsU0FBUCxLQUFxQm1ELFNBQXpCLEVBQW9DO0FBQ2xDbEMsbUJBQVNxQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQkwsSUFBSUUsQ0FBSixDQUFsQixFQUEwQjtBQUNqQzNCLG1CQUFPMkI7QUFEMEIsV0FBMUIsQ0FBVDtBQUdEO0FBQ0Y7QUFDRCxhQUFPbkMsTUFBUDtBQUNEOzs7c0NBQ2lCZixHLEVBQUs7QUFDckIsYUFBTztBQUNMc0QsZUFBTyxLQUFLdkUsVUFEUDtBQUVMd0Usa0JBQVUsS0FBS3RFO0FBRlYsT0FBUDtBQUlEOzs7O0VBL0dvQ3VFLGVBQUtDLEk7O2tCQUF2QnpHLFMiLCJmaWxlIjoiZGlzY292ZXJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHsgc2hvd01zZywgcHJldmlld0ltYWdlLCBmaWx0ZXJBcnJheUJ5VmFsdWUgfSBmcm9tICcuLi91dGlscy9jb21tb24nXG5pbXBvcnQgU2VsZWN0TW9kYWwgZnJvbSAnLi4vY29tcG9uZW50cy9zZWxlY3RNb2RhbCdcbmltcG9ydCBDdXJyZW50TW9kYWwgZnJvbSAnLi4vY29tcG9uZW50cy9jb21tZW50TW9kYWwnXG5pbXBvcnQgc2hhcmVNb2RhbCBmcm9tICcuLi9jb21wb25lbnRzL3NoYXJlTW9kYWwnXG5pbXBvcnQgeyBnZXRDaXJjbGVMaXN0LCBhZGRDb21tZW50LCBnZXRDb21tZW50TGlzdCwgZGVsZXRlQ2lyY2xlLCBhZGRMaWtlIH0gZnJvbSAnLi4vYXBpL3pvbmUnXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaXNjb3ZlcnkgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WutumVv+WciOWtkCcsXG4gICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiB0cnVlXG4gIH1cbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIkN1cnJlbnRNb2RhbFwiOntcInN1cmVCdG5UZXh0XCI6XCLnoa7orqRcIixcImNhbmNlbEJ0blRleHRcIjpcIuWPlua2iFwiLFwicGxhY2Vob2xkZXJUZXh0XCI6XCLor7fovpPlhaXor4TorrrlhoXlrrlcIixcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6ZmxhZy5zeW5jXCI6XCJjb21tZW50RmxhZ1wiLFwidi1iaW5kOmNvbW1lbnRJbnB1dC5zeW5jXCI6XCJjb21tZW50SW5wdXRcIixcInhtbG5zOnYtb25cIjpcIlwifSxcIlNlbGVjdE1vZGFsXCI6e1widi1iaW5kOmZsYWcuc3luY1wiOlwic2VsZWN0RmxhZ1wiLFwidi1iaW5kOmxpc3Quc3luY1wiOlwicGF5TWVtYmVyTGlzdFwifSxcInNoYXJlTW9kYWxcIjp7XCJ2LWJpbmQ6ZmxhZy5zeW5jXCI6XCJzaG93U2hhcmVGbGFnXCIsXCJ2LWJpbmQ6dGl0bGUuc3luY1wiOlwic2hhcmVUaXRsZVwiLFwidi1iaW5kOmltZ1NyYy5zeW5jXCI6XCJzaGFyZUltZ1wifX07XHJcbiRldmVudHMgPSB7XCJDdXJyZW50TW9kYWxcIjp7XCJ2LW9uOmNhbmNlbFwiOlwiY29tbWVudENhbmNlbFwiLFwidi1vbjpzdXJlXCI6XCJjb21tZW50U3VyZVwiLFwidi1vbjppbnB1dFwiOlwiYmluZENvbW1lbnRJbnB1dFwifSxcIlNlbGVjdE1vZGFsXCI6e1widi1vbjpjYW5jZWxcIjpcInNlbGVjdENhbmNlbFwiLFwidi1vbjpzdXJlXCI6XCJzZWxlY3RTdXJlXCJ9LFwic2hhcmVNb2RhbFwiOntcInYtb246Y2FuY2VsXCI6XCJjYW5jZWxTaGFyZUZuXCIsXCJ2LW9uOnN1cmVcIjpcImNhbmNlbFNoYXJlRm5cIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICBDdXJyZW50TW9kYWwsXG4gICAgU2VsZWN0TW9kYWwsXG4gICAgc2hhcmVNb2RhbFxuICB9XG4gIGRhdGEgPSB7XG4gICAgY29tbWVudEZsYWc6IGZhbHNlLFxuICAgIHBuOiAxLFxuICAgIHBzOiAxMCxcbiAgICBsaXN0OiBbXSxcbiAgICBjbGFzc0luZm86IG51bGwsXG4gICAgbWVtYmVySW5mbzogbnVsbCxcbiAgICBzY2hvb2xJbmZvOiBudWxsLFxuICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgIGxvYWRGaW5pc2hlZDogZmFsc2UsXG4gICAgY29tbWVudElucHV0OiAnJyxcbiAgICBjdXJyZW50UmVwbHlJZDogLTEsXG4gICAgY3VycmVudFJlcGx5Um9vdElkOiAtMSxcbiAgICBjdXJyZW50UmVwbHlUb0NvbW1lbnRJZDogLTEsXG4gICAgY29tbWVudFBuOiAyLFxuICAgIGNvbW1lbnRQczogNixcbiAgICBjb21tZW50T2Zmc2V0OiA2LFxuICAgIGNvbW1lbnRMb2FkRmluaXNoZWQ6IGZhbHNlLFxuICAgIG1lbWJlckxpc3Q6IFtdLFxuICAgIGxvYWRNb3JlQ29tbWVudEFycmF5OiBbXSxcbiAgICBzaGFyZVRpdGxlOiAnJyxcbiAgICBzaG93U2hhcmVGbGFnOiBmYWxzZSxcbiAgICBzaGFyZUltZzogJy4uL2ltYWdlcy9zaGFyZS9jaXJjbGVzLmpwZydcbiAgfVxuICB3YXRjaCA9IHtcbiAgICBjbGFzc0luZm8obmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgIC8vIOWIh+aNouS6huePree6p+S5i+WQjuaVsOaNruimgeabtOaWsFxuICAgICAgaWYgKG9sZFZhbCAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLnJlc2V0RGF0YSgpXG4gICAgICAgIHRoaXMuZ2V0Wm9uZUxpc3QoKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXNldERhdGEoKSB7XG4gICAgdGhpcy5sb2FkTW9yZUNvbW1lbnRBcnJheSA9IFtdXG4gICAgdGhpcy5jb21tZW50TG9hZEZpbmlzaGVkID0gZmFsc2VcbiAgICB0aGlzLmNvbW1lbnRQbiA9IDJcbiAgICB0aGlzLmNvbW1lbnRQcyA9IDZcbiAgICB0aGlzLnBuID0gMVxuICAgIHRoaXMubGlzdCA9IFtdXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIG9uUHVsbERvd25SZWZyZXNoKCkge1xuICAgIHRoaXMucmVzZXREYXRhKClcbiAgICB0aGlzLmdldFpvbmVMaXN0KClcbiAgfVxuICBvblJlYWNoQm90dG9tKCkge1xuICAgIGlmICh0aGlzLmxvYWRpbmcgfHwgdGhpcy5sb2FkRmluaXNoZWQpIHJldHVyblxuICAgIHRoaXMuZ2V0Wm9uZUxpc3QoKVxuICB9XG4gIG9uTG9hZCgpIHtcbiAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxuICAgIHRoaXMubWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcbiAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VyRGF0YSA9IHRoaXMubWVtYmVySW5mb1xuICAgIHRoaXMuJGFwcGx5KClcbiAgICBpZiAodGhpcy5tZW1iZXJJbmZvICYmIHRoaXMubWVtYmVySW5mby5tZW1iZXJfaWQgPT09IC0xKSByZXR1cm4gICAvL+W+ruS/oea1i+ivleeUqOaIt1xuICAgIHRoaXMuZ2V0Wm9uZUxpc3QoKVxuICB9XG4gIG9uU2hvdygpIHtcbiAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxuICB9XG4gIGdldFpvbmVMaXN0KCkge1xuICAgIHRoaXMubG9hZGluZyA9IHRydWVcbiAgICB0aGlzLiRhcHBseSgpXG4gICAgY29uc3QgaWQgPSB0aGlzLmNsYXNzSW5mby5pZFxuICAgIGdldENpcmNsZUxpc3Qoe1xuICAgICAgc2VlX3R5cGU6ICdhbGwnLFxuICAgICAgdHlwZTogJ2NpcmNsZXMnLFxuICAgICAgcG46IHRoaXMucG4sXG4gICAgICBwczogdGhpcy5wcyxcbiAgICAgIGNvbW1lbnRfY291bnQ6IDNcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgeyBsaXN0IH0gPSByZXMuZGF0YVxuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2VcbiAgICAgIHRoaXMucG4rK1xuICAgICAgaWYgKGxpc3QubGVuZ3RoIDwgdGhpcy5wcykge1xuICAgICAgICB0aGlzLmxvYWRGaW5pc2hlZCA9IHRydWVcbiAgICAgIH1cbiAgICAgIHRoaXMubGlzdCA9IFsuLi50aGlzLmxpc3QsIC4uLmxpc3RdXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSlcbiAgfVxuICBmaW5kTG9hZG1vcmVDb21tZW50SW5mbyhhcnIsIGN1cnJlbnRJZCkge1xuICAgIGxldCByZXRPYmogPSB7fVxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhcnIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmIChhcnJbaV0ubW9tZW50X2lkID09PSBjdXJyZW50SWQpIHtcbiAgICAgICAgcmV0T2JqID0gT2JqZWN0LmFzc2lnbih7fSwgYXJyW2ldLCB7XG4gICAgICAgICAgaW5kZXg6IGlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJldE9ialxuICB9XG4gIG9uU2hhcmVBcHBNZXNzYWdlKHJlcykge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogdGhpcy5zaGFyZVRpdGxlLFxuICAgICAgaW1hZ2VVcmw6IHRoaXMuc2hhcmVJbWdcbiAgICB9XG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBhZGRMaWtlKG1vbWVudElkLCBpZHgsIGlzTGlrZWQpIHtcbiAgICAgIGlmICghdGhpcy5jbGFzc0luZm8gJiYgIXRoaXMuY2xhc3NJbmZvLmlkKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+WFiOWKoOWFpeePree6pycpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgYWRkTGlrZSh7XG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgICAgbW9tZW50X2lkOiBtb21lbnRJZFxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgIGlmIChpc0xpa2VkKSB7XG4gICAgICAgICAgICBzaG93TXNnKCflj5bmtojngrnotZ7miJDlip8nKVxuICAgICAgICAgICAgdGhpcy5saXN0W2lkeF0ubGlrZV9saXN0LmNvdW50LS1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2hvd01zZygn54K56LWe5oiQ5YqfJylcbiAgICAgICAgICAgIHRoaXMubGlzdFtpZHhdLmxpa2VfbGlzdC5jb3VudCsrXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubGlzdFtpZHhdLmlzX2xpa2UgPSAhaXNMaWtlZFxuICAgICAgICAgIGNvbnN0IG5ld09iaiA9IHtcbiAgICAgICAgICAgIG1vbWVudF9pZDogbW9tZW50SWQsXG4gICAgICAgICAgICBtZW1iZXJfaWQ6IHRoaXMubWVtYmVySW5mby5tZW1iZXJfaWQsXG4gICAgICAgICAgICBtZW1iZXI6IHRoaXMubWVtYmVySW5mb1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmxpc3RbaWR4XS5saWtlX2xpc3QubGlzdCA9IGZpbHRlckFycmF5QnlWYWx1ZSh0aGlzLm1lbWJlckluZm8ubWVtYmVyX2lkLCB0aGlzLmxpc3RbaWR4XS5saWtlX2xpc3QubGlzdCwgaXNMaWtlZCwgbmV3T2JqKVxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIGNhbmNlbFNoYXJlRm4oKSB7XG4gICAgICB0aGlzLnNob3dTaGFyZUZsYWcgPSBmYWxzZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgc2hhcmVDaXJjbGUoKSB7XG4gICAgICB0aGlzLnNoYXJlVGl0bGUgPSBgJHt0aGlzLm1lbWJlckluZm8ubmlja25hbWV95YiG5Lqr5LqG5LiA5Liq5Y+R546w77yM54K55Ye75rWP6KeIYFxuICAgICAgdGhpcy5zaG93U2hhcmVGbGFnID0gdHJ1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgcmVtb3ZlQ2lyY2xlKGlkLCBpZHgpIHtcbiAgICAgIGRlbGV0ZUNpcmNsZSh7XG4gICAgICAgIG1vbWVudF9pZDogaWQsXG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZFxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgIHNob3dNc2coJ+aIkOWKn+WIoOmZpCcpXG4gICAgICAgICAgdGhpcy5saXN0LnNwbGljZShpZHgsIDEpXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgbG9hZE1vcmVDb21tZW50KG1vbWVudElkLCBpZHgpIHtcbiAgICAgIGNvbnN0IHJldE9iaiA9IHRoaXMuZmluZExvYWRtb3JlQ29tbWVudEluZm8odGhpcy5sb2FkTW9yZUNvbW1lbnRBcnJheSwgbW9tZW50SWQpO1xuICAgICAgZ2V0Q29tbWVudExpc3Qoe1xuICAgICAgICBtb21lbnRfaWQ6IG1vbWVudElkLFxuICAgICAgICBwczogdGhpcy5jb21tZW50UHMsXG4gICAgICAgIHBuOiByZXRPYmouY29tbWVudFBuID8gcmV0T2JqLmNvbW1lbnRQbiA6IHRoaXMuY29tbWVudFBuLFxuICAgICAgICBvZmZzZXQ6IHRoaXMuY29tbWVudE9mZnNldFxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgIGxldCByZXN1bHRMaXN0ID0gcmVzLmRhdGEubGlzdFxuICAgICAgICAgIGxldCB7bGlzdH0gPSB0aGlzLmxpc3RbaWR4XS5jb21tZW50X2xpc3RcbiAgICAgICAgICBsaXN0ID0gWy4uLmxpc3QsIC4uLnJlc3VsdExpc3RdXG4gICAgICAgICAgdGhpcy5saXN0W2lkeF0uY29tbWVudF9saXN0Lmxpc3QgPSBsaXN0XG4gICAgICAgICAgaWYgKHJlc3VsdExpc3QubGVuZ3RoIDwgdGhpcy5jb21tZW50UHMpIHtcbiAgICAgICAgICAgIHRoaXMubGlzdFtpZHhdLmNvbW1lbnRMb2FkRmluaXNoZWQgPSB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghcmV0T2JqLmNvbW1lbnRQbikge1xuICAgICAgICAgICAgY29uc3Qgb2JqID0ge1xuICAgICAgICAgICAgICBjb21tZW50UG46IHRoaXMuY29tbWVudFBuICsgMSxcbiAgICAgICAgICAgICAgbW9tZW50X2lkOiBtb21lbnRJZFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5sb2FkTW9yZUNvbW1lbnRBcnJheS5wdXNoKG9iailcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2FkTW9yZUNvbW1lbnRBcnJheVtyZXRPYmouaW5kZXhdLmNvbW1lbnRQbiA9IHJldE9iai5jb21tZW50UG4gKyAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBhZGRDb21tZW50KHR5cGUsIGlkLCByb290SWQsIHRvQ29tbWVudElkLCBuYW1lKSB7XG4gICAgICBpZiAodG9Db21tZW50SWQgPT09IHRoaXMubWVtYmVySW5mby5tZW1iZXJfaWQpIHtcbiAgICAgICAgc2hvd01zZygn6K+35LiN6KaB5Zue5aSN6Ieq5bexJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuY2xhc3NJbmZvKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+WFiOWKoOWFpeePree6pycpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdGhpcy5jb21tZW50RmxhZyA9IHRydWVcbiAgICAgIHRoaXMuY3VycmVudFJlcGx5SWQgPSBpZFxuICAgICAgdGhpcy5jdXJyZW50UmVwbHlSb290SWQgPSB0eXBlID09PSAnYWRkJyA/IDAgOiByb290SWRcbiAgICAgIGlmIChuYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5jb21tZW50SW5wdXQgPSBgQCR7bmFtZX06YFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb21tZW50SW5wdXQgPSAnJ1xuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgYmluZENvbW1lbnRJbnB1dCAodmFsdWUpIHtcbiAgICAgIHRoaXMuY29tbWVudElucHV0ID0gdmFsdWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGNvbW1lbnRTdXJlICgpIHtcbiAgICAgIHRoaXMuY29tbWVudEZsYWcgPSBmYWxzZVxuICAgICAgYWRkQ29tbWVudCh7XG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgICAgbW9tZW50X2lkOiB0aGlzLmN1cnJlbnRSZXBseUlkLFxuICAgICAgICBjb250ZW50OiB0aGlzLmN1cnJlbnRSZXBseUlkID4gMCA/IHRoaXMuY29tbWVudElucHV0LnJlcGxhY2UoL15ALis6LywgJycpIDogdGhpcy5jb21tZW50SW5wdXQsXG4gICAgICAgIHJvb3RfaWQ6IHRoaXMuY3VycmVudFJlcGx5Um9vdElkLFxuICAgICAgICB0b19jb21tZW50X2lkOiB0aGlzLmN1cnJlbnRSZXBseVJvb3RJZFxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgIHRoaXMuY29tbWVudElucHV0ID0gJydcbiAgICAgICAgICB0aGlzLnJlc2V0RGF0YSgpXG4gICAgICAgICAgdGhpcy5nZXRab25lTGlzdCgpXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgY29tbWVudENhbmNlbCAoKSB7XG4gICAgICB0aGlzLmNvbW1lbnRGbGFnID0gZmFsc2VcbiAgICAgIHRoaXMuY29tbWVudElucHV0ID0gJydcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIHByZXZpZXcoaW1nLCBpbWdMaXN0KSB7XG4gICAgICBwcmV2aWV3SW1hZ2UoaW1nLCBpbWdMaXN0KVxuICAgIH1cbiAgfVxufVxuIl19