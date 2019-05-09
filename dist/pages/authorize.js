'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _wepyRedux = require('./../npm/wepy-redux/lib/index.js');

var _user = require('./../api/user.js');

var _common = require('./../utils/common.js');

var _modal = require('./../components/modal.js');

var _modal2 = _interopRequireDefault(_modal);

var _searchResult = require('./../components/searchResult.js');

var _searchResult2 = _interopRequireDefault(_searchResult);

var _authorize = require('./../api/authorize.js');

var authorizeReq = _interopRequireWildcard(_authorize);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var bindRelationship = (_dec = (0, _wepyRedux.connect)({
  isPresident: function isPresident(state) {
    return state.zone.isPresident;
  }
}), _dec(_class = function (_wepy$page) {
  _inherits(bindRelationship, _wepy$page);

  function bindRelationship() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, bindRelationship);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = bindRelationship.__proto__ || Object.getPrototypeOf(bindRelationship)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '家委会管理'
    }, _this.$repeat = {}, _this.$props = { "Modal": { "sureBtnText": "确认添加", "cancelBtnText": "取消", "placeholderText": "请输入姓名", "xmlns:v-bind": "", "v-bind:flag.sync": "showAdd", "xmlns:v-on": "" }, "Search": { "xmlns:v-on": "", "xmlns:v-bind": "", "v-bind:flag.sync": "showAdd", "v-bind:studentList.sync": "studentList" } }, _this.$events = { "Modal": { "v-on:cancel": "cancel", "v-on:sure": "sure" }, "Search": { "v-on:closeModal": "closeSearch", "v-on:sure": "sure", "v-on:selectStudent": "selectStudent" } }, _this.components = {
      Modal: _modal2.default,
      Search: _searchResult2.default
    }, _this.data = {
      showAdd: false,
      list: [],
      currentRoleId: -1,
      memberInfo: null,
      classInfo: {},
      studentList: [],
      code: '',
      removeFlag: false,
      removeName: '',
      removeId: -1,
      classId: -1,
      name: '',
      key: ''
    }, _this.methods = {
      departName: function departName() {
        this.removeName = '';
        this.removeId = -1;
        this.$apply();
      },
      remove: function remove() {
        var _this2 = this;

        authorizeReq.removeMember({
          class_id: this.classInfo.id,
          remove_member_id: this.removeId
        }).then(function (res) {
          if (res.data.success) {
            (0, _common.showMsg)('操作成功');
            _this2.removeName = '';
            _this2.removeId = -1;
            _this2.$apply();
          }
        });
      },
      changeCode: function changeCode() {
        var _this3 = this;

        authorizeReq.changeCode({
          class_id: this.classInfo.id,
          join_key: this.code
        }).then(function (res) {
          if (res.data.success) {
            _this3.classInfo.join_key = _this3.code;
            wx.setStorageSync('classInfo', _this3.classInfo);
            _this3.code = '';
            _this3.$apply();
            (0, _common.showMsg)('更新成功');
          }
        });
      },
      bindForm: function bindForm(e) {
        this[e.currentTarget.id] = e.detail.value;
        this.$apply();
      },
      closeSearch: function closeSearch() {
        this.showAdd = false;
        this.$apply();
      },
      del: function del(authId) {
        var _this4 = this;

        authorizeReq.deleteAuth({
          class_id: this.classInfo.id,
          class_auth_id: authId
        }).then(function (res) {
          if (res.data.success) {
            (0, _common.showMsg)('删除成功');
            _this4.getAuthList();
            _this4.$apply();
          }
        });
      },
      selectStudent: function selectStudent(value) {
        var _this5 = this;

        if (this.removeFlag) {
          this.removeName = value.class_nickname;
          this.removeId = value.id;
          this.removeFlag = false;
          this.showAdd = false;
          this.$apply();
        } else {
          authorizeReq.addAuth({
            class_id: this.classInfo.id,
            role_id: this.currentRoleId,
            join_member_id: value.id
          }).then(function (res) {
            if (res.data.success) {
              (0, _common.showMsg)('添加成功');
              _this5.getAuthList();
              _this5.showAdd = false;
              _this5.$apply();
            }
          });
        }
      },
      cancel: function cancel() {
        this.showAdd = false;
        this.$apply();
      },
      addNew: function addNew(booleanValue, id, type) {
        this.showAdd = booleanValue;
        this.currentRoleId = id;
        if (type === 'remove') {
          this.removeFlag = true;
        }
        this.$apply();
      },
      sure: function sure(value) {
        var _this6 = this;

        authorizeReq.searchMember({
          class_id: this.classInfo.id,
          keywords: value
        }).then(function (res) {
          var list = res.data.list;
          _this6.studentList = list;
          _this6.$apply();
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(bindRelationship, [{
    key: 'onShareAppMessage',
    value: function onShareAppMessage(res) {
      return {
        title: this.memberInfo.nickname + '\u9080\u8BF7\u60A8\u52A0\u5165\u5BB6\u59D4\u4F1A\u73ED\u7EA7,\u9A8C\u8BC1\u7801\u662F' + this.classInfo.join_key,
        path: 'pages/authorize?classId=' + this.classInfo.id + '&name=' + this.classInfo.name + '&key=' + this.classInfo.join_key + '&code=' + this.code
      };
    }
  }, {
    key: 'onLoad',
    value: function onLoad(params) {
      this.classInfo = wx.getStorageSync('classInfo');
      this.memberInfo = wx.getStorageSync('memberInfo');
      this.name = params.name;
      this.code = params.code;
      this.key = params.key;
      this.classId = params.classId;
      if (this.code && !this.memberInfo.member_id) {
        // 如果是从分享链接进入且没有注册，先走注册流程
        wx.redirectTo({
          url: 'login?classId=' + this.classId + '&name=' + this.name + '&key=' + this.key
        });
      } else if (this.code && this.memberInfo.member_id) {
        wx.redirectTo({
          url: 'joinClass?classId=' + this.classId + '&name=' + this.name + '&key=' + this.key
        });
      } else {
        this.isPresident && this.getAuthList();
        this.getMemberList();
        this.$apply();
      }
    }
  }, {
    key: 'getMemberList',
    value: function getMemberList() {
      var _this7 = this;

      (0, _user.getMemberList)({
        class_id: this.classInfo.id
      }).then(function (res) {
        var arr = [];
        var list = res.data.family_list.list;
        var retList = [];
        for (var i = 0, len = list.length; i < len; i++) {
          var innerList = list[i].list;
          for (var j = 0, length = innerList.length; j < length; j++) {
            var memberInfo = innerList[j].member;
            if (arr.indexOf(memberInfo.id) <= 0) {
              retList.push(memberInfo);
            }
            arr.push(memberInfo.id);
          }
        }
        _this7.studentList = retList;
        _this7.$apply();
      });
    }
  }, {
    key: 'getAuthList',
    value: function getAuthList() {
      var _this8 = this;

      authorizeReq.authList({
        class_id: this.classInfo.id
      }).then(function (res) {
        _this8.list = res.data.list;
        _this8.$apply();
      });
    }
  }]);

  return bindRelationship;
}(_wepy2.default.page)) || _class);

Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(bindRelationship , 'pages/authorize'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGhvcml6ZS5qcyJdLCJuYW1lcyI6WyJhdXRob3JpemVSZXEiLCJiaW5kUmVsYXRpb25zaGlwIiwiaXNQcmVzaWRlbnQiLCJzdGF0ZSIsInpvbmUiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiTW9kYWwiLCJTZWFyY2giLCJkYXRhIiwic2hvd0FkZCIsImxpc3QiLCJjdXJyZW50Um9sZUlkIiwibWVtYmVySW5mbyIsImNsYXNzSW5mbyIsInN0dWRlbnRMaXN0IiwiY29kZSIsInJlbW92ZUZsYWciLCJyZW1vdmVOYW1lIiwicmVtb3ZlSWQiLCJjbGFzc0lkIiwibmFtZSIsImtleSIsIm1ldGhvZHMiLCJkZXBhcnROYW1lIiwiJGFwcGx5IiwicmVtb3ZlIiwicmVtb3ZlTWVtYmVyIiwiY2xhc3NfaWQiLCJpZCIsInJlbW92ZV9tZW1iZXJfaWQiLCJ0aGVuIiwicmVzIiwic3VjY2VzcyIsImNoYW5nZUNvZGUiLCJqb2luX2tleSIsInd4Iiwic2V0U3RvcmFnZVN5bmMiLCJiaW5kRm9ybSIsImUiLCJjdXJyZW50VGFyZ2V0IiwiZGV0YWlsIiwidmFsdWUiLCJjbG9zZVNlYXJjaCIsImRlbCIsImF1dGhJZCIsImRlbGV0ZUF1dGgiLCJjbGFzc19hdXRoX2lkIiwiZ2V0QXV0aExpc3QiLCJzZWxlY3RTdHVkZW50IiwiY2xhc3Nfbmlja25hbWUiLCJhZGRBdXRoIiwicm9sZV9pZCIsImpvaW5fbWVtYmVyX2lkIiwiY2FuY2VsIiwiYWRkTmV3IiwiYm9vbGVhblZhbHVlIiwidHlwZSIsInN1cmUiLCJzZWFyY2hNZW1iZXIiLCJrZXl3b3JkcyIsInRpdGxlIiwibmlja25hbWUiLCJwYXRoIiwicGFyYW1zIiwiZ2V0U3RvcmFnZVN5bmMiLCJtZW1iZXJfaWQiLCJyZWRpcmVjdFRvIiwidXJsIiwiZ2V0TWVtYmVyTGlzdCIsImFyciIsImZhbWlseV9saXN0IiwicmV0TGlzdCIsImkiLCJsZW4iLCJsZW5ndGgiLCJpbm5lckxpc3QiLCJqIiwibWVtYmVyIiwiaW5kZXhPZiIsInB1c2giLCJhdXRoTGlzdCIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztJQUFZQSxZOzs7Ozs7Ozs7Ozs7SUFRU0MsZ0IsV0FOcEIsd0JBQVE7QUFDUEMsYUFETyx1QkFDS0MsS0FETCxFQUNZO0FBQ2pCLFdBQU9BLE1BQU1DLElBQU4sQ0FBV0YsV0FBbEI7QUFDRDtBQUhNLENBQVIsQzs7Ozs7Ozs7Ozs7Ozs7ME1BT0NHLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdWQyxPLEdBQVUsRSxRQUNYQyxNLEdBQVMsRUFBQyxTQUFRLEVBQUMsZUFBYyxNQUFmLEVBQXNCLGlCQUFnQixJQUF0QyxFQUEyQyxtQkFBa0IsT0FBN0QsRUFBcUUsZ0JBQWUsRUFBcEYsRUFBdUYsb0JBQW1CLFNBQTFHLEVBQW9ILGNBQWEsRUFBakksRUFBVCxFQUE4SSxVQUFTLEVBQUMsY0FBYSxFQUFkLEVBQWlCLGdCQUFlLEVBQWhDLEVBQW1DLG9CQUFtQixTQUF0RCxFQUFnRSwyQkFBMEIsYUFBMUYsRUFBdkosRSxRQUNUQyxPLEdBQVUsRUFBQyxTQUFRLEVBQUMsZUFBYyxRQUFmLEVBQXdCLGFBQVksTUFBcEMsRUFBVCxFQUFxRCxVQUFTLEVBQUMsbUJBQWtCLGFBQW5CLEVBQWlDLGFBQVksTUFBN0MsRUFBb0Qsc0JBQXFCLGVBQXpFLEVBQTlELEUsUUFDVEMsVSxHQUFhO0FBQ1ZDLDRCQURVO0FBRVZDO0FBRlUsSyxRQUlaQyxJLEdBQU87QUFDTEMsZUFBUyxLQURKO0FBRUxDLFlBQU0sRUFGRDtBQUdMQyxxQkFBZSxDQUFDLENBSFg7QUFJTEMsa0JBQVksSUFKUDtBQUtMQyxpQkFBVyxFQUxOO0FBTUxDLG1CQUFhLEVBTlI7QUFPTEMsWUFBTSxFQVBEO0FBUUxDLGtCQUFZLEtBUlA7QUFTTEMsa0JB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NUMsRUFBaUQ7QUFDL0MsY0FBSUcsWUFBWWpFLEtBQUs4RCxDQUFMLEVBQVE5RCxJQUF4QjtBQUNBLGVBQUssSUFBSWtFLElBQUksQ0FBUixFQUFXRixTQUFTQyxVQUFVRCxNQUFuQyxFQUEyQ0UsSUFBSUYsTUFBL0MsRUFBdURFLEdBQXZELEVBQTREO0FBQzFELGdCQUFJaEUsYUFBYStELFVBQVVDLENBQVYsRUFBYUMsTUFBOUI7QUFDQSxnQkFBSVIsSUFBSVMsT0FBSixDQUFZbEUsV0FBV2dCLEVBQXZCLEtBQThCLENBQWxDLEVBQXFDO0FBQ25DMkMsc0JBQVFRLElBQVIsQ0FBYW5FLFVBQWI7QUFDRDtBQUNEeUQsZ0JBQUlVLElBQUosQ0FBU25FLFdBQVdnQixFQUFwQjtBQUNEO0FBQ0Y7QUFDRCxlQUFLZCxXQUFMLEdBQW1CeUQsT0FBbkI7QUFDQSxlQUFLL0MsTUFBTDtBQUNELE9BbEJEO0FBbUJEOzs7a0NBQ2E7QUFBQTs7QUFDWjdCLG1CQUFhcUYsUUFBYixDQUFzQjtBQUNwQnJELGtCQUFVLEtBQUtkLFNBQUwsQ0FBZWU7QUFETCxPQUF0QixFQUVHRSxJQUZILENBRVEsZUFBTztBQUNiLGVBQUtwQixJQUFMLEdBQVlxQixJQUFJdkIsSUFBSixDQUFTRSxJQUFyQjtBQUNBLGVBQUtjLE1BQUw7QUFDRCxPQUxEO0FBTUQ7Ozs7RUFsRjJDeUQsZUFBS0MsSTtrQkFBOUJ0RixnQiIsImZpbGUiOiJhdXRob3JpemUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgeyBjb25uZWN0LCBnZXRTdG9yZSB9IGZyb20gJ3dlcHktcmVkdXgnXG5pbXBvcnQgeyBnZXRNZW1iZXJMaXN0IH0gZnJvbSAnLi4vYXBpL3VzZXInXG5pbXBvcnQgeyBzaG93TXNnIH0gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xuaW1wb3J0IE1vZGFsIGZyb20gJy4uL2NvbXBvbmVudHMvbW9kYWwnXG5pbXBvcnQgU2VhcmNoIGZyb20gJy4uL2NvbXBvbmVudHMvc2VhcmNoUmVzdWx0J1xuaW1wb3J0ICogYXMgYXV0aG9yaXplUmVxIGZyb20gJy4uL2FwaS9hdXRob3JpemUnXG5cbkBjb25uZWN0KHtcbiAgaXNQcmVzaWRlbnQoc3RhdGUpIHtcbiAgICByZXR1cm4gc3RhdGUuem9uZS5pc1ByZXNpZGVudFxuICB9XG59KVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBiaW5kUmVsYXRpb25zaGlwIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflrrblp5TkvJrnrqHnkIYnXG4gIH1cbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIk1vZGFsXCI6e1wic3VyZUJ0blRleHRcIjpcIuehruiupOa3u+WKoFwiLFwiY2FuY2VsQnRuVGV4dFwiOlwi5Y+W5raIXCIsXCJwbGFjZWhvbGRlclRleHRcIjpcIuivt+i+k+WFpeWnk+WQjVwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpmbGFnLnN5bmNcIjpcInNob3dBZGRcIixcInhtbG5zOnYtb25cIjpcIlwifSxcIlNlYXJjaFwiOntcInhtbG5zOnYtb25cIjpcIlwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpmbGFnLnN5bmNcIjpcInNob3dBZGRcIixcInYtYmluZDpzdHVkZW50TGlzdC5zeW5jXCI6XCJzdHVkZW50TGlzdFwifX07XHJcbiRldmVudHMgPSB7XCJNb2RhbFwiOntcInYtb246Y2FuY2VsXCI6XCJjYW5jZWxcIixcInYtb246c3VyZVwiOlwic3VyZVwifSxcIlNlYXJjaFwiOntcInYtb246Y2xvc2VNb2RhbFwiOlwiY2xvc2VTZWFyY2hcIixcInYtb246c3VyZVwiOlwic3VyZVwiLFwidi1vbjpzZWxlY3RTdHVkZW50XCI6XCJzZWxlY3RTdHVkZW50XCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgTW9kYWwsXG4gICAgU2VhcmNoXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBzaG93QWRkOiBmYWxzZSxcbiAgICBsaXN0OiBbXSxcbiAgICBjdXJyZW50Um9sZUlkOiAtMSxcbiAgICBtZW1iZXJJbmZvOiBudWxsLFxuICAgIGNsYXNzSW5mbzoge30sXG4gICAgc3R1ZGVudExpc3Q6IFtdLFxuICAgIGNvZGU6ICcnLFxuICAgIHJlbW92ZUZsYWc6IGZhbHNlLFxuICAgIHJlbW92ZU5hbWU6ICcnLFxuICAgIHJlbW92ZUlkOiAtMSxcbiAgICBjbGFzc0lkOiAtMSxcbiAgICBuYW1lOiAnJyxcbiAgICBrZXk6ICcnXG4gIH1cbiAgb25TaGFyZUFwcE1lc3NhZ2UocmVzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiBgJHt0aGlzLm1lbWJlckluZm8ubmlja25hbWV96YKA6K+35oKo5Yqg5YWl5a625aeU5Lya54+t57qnLOmqjOivgeeggeaYryR7dGhpcy5jbGFzc0luZm8uam9pbl9rZXl9YCxcbiAgICAgIHBhdGg6IGBwYWdlcy9hdXRob3JpemU/Y2xhc3NJZD0ke3RoaXMuY2xhc3NJbmZvLmlkfSZuYW1lPSR7dGhpcy5jbGFzc0luZm8ubmFtZX0ma2V5PSR7dGhpcy5jbGFzc0luZm8uam9pbl9rZXl9JmNvZGU9JHt0aGlzLmNvZGV9YFxuICAgIH1cbiAgfVxuICBvbkxvYWQocGFyYW1zKSB7XG4gICAgdGhpcy5jbGFzc0luZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnY2xhc3NJbmZvJylcbiAgICB0aGlzLm1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXG4gICAgdGhpcy5uYW1lID0gcGFyYW1zLm5hbWVcbiAgICB0aGlzLmNvZGUgPSBwYXJhbXMuY29kZVxuICAgIHRoaXMua2V5ID0gcGFyYW1zLmtleVxuICAgIHRoaXMuY2xhc3NJZCA9IHBhcmFtcy5jbGFzc0lkXG4gICAgaWYgKHRoaXMuY29kZSAmJiAhdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCkge1xuICAgICAgLy8g5aaC5p6c5piv5LuO5YiG5Lqr6ZO+5o6l6L+b5YWl5LiU5rKh5pyJ5rOo5YaM77yM5YWI6LWw5rOo5YaM5rWB56iLXG4gICAgICB3eC5yZWRpcmVjdFRvKHtcbiAgICAgICAgdXJsOiBgbG9naW4/Y2xhc3NJZD0ke3RoaXMuY2xhc3NJZH0mbmFtZT0ke3RoaXMubmFtZX0ma2V5PSR7dGhpcy5rZXl9YFxuICAgICAgfSlcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29kZSAmJiB0aGlzLm1lbWJlckluZm8ubWVtYmVyX2lkKSB7XG4gICAgICB3eC5yZWRpcmVjdFRvKHtcbiAgICAgICAgdXJsOiBgam9pbkNsYXNzP2NsYXNzSWQ9JHt0aGlzLmNsYXNzSWR9Jm5hbWU9JHt0aGlzLm5hbWV9JmtleT0ke3RoaXMua2V5fWBcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNQcmVzaWRlbnQgJiYgdGhpcy5nZXRBdXRoTGlzdCgpXG4gICAgICB0aGlzLmdldE1lbWJlckxpc3QoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuICBnZXRNZW1iZXJMaXN0KCkge1xuICAgIGdldE1lbWJlckxpc3Qoe1xuICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IGFyciA9IFtdXG4gICAgICBsZXQgbGlzdCA9IHJlcy5kYXRhLmZhbWlseV9saXN0Lmxpc3RcbiAgICAgIGxldCByZXRMaXN0ID0gW11cbiAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBsaXN0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGxldCBpbm5lckxpc3QgPSBsaXN0W2ldLmxpc3RcbiAgICAgICAgZm9yIChsZXQgaiA9IDAsIGxlbmd0aCA9IGlubmVyTGlzdC5sZW5ndGg7IGogPCBsZW5ndGg7IGorKykge1xuICAgICAgICAgIGxldCBtZW1iZXJJbmZvID0gaW5uZXJMaXN0W2pdLm1lbWJlclxuICAgICAgICAgIGlmIChhcnIuaW5kZXhPZihtZW1iZXJJbmZvLmlkKSA8PSAwKSB7XG4gICAgICAgICAgICByZXRMaXN0LnB1c2gobWVtYmVySW5mbylcbiAgICAgICAgICB9XG4gICAgICAgICAgYXJyLnB1c2gobWVtYmVySW5mby5pZClcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5zdHVkZW50TGlzdCA9IHJldExpc3RcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9KVxuICB9XG4gIGdldEF1dGhMaXN0KCkge1xuICAgIGF1dGhvcml6ZVJlcS5hdXRoTGlzdCh7XG4gICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWRcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICB0aGlzLmxpc3QgPSByZXMuZGF0YS5saXN0XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSlcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIGRlcGFydE5hbWUoKSB7XG4gICAgICB0aGlzLnJlbW92ZU5hbWUgPSAnJ1xuICAgICAgdGhpcy5yZW1vdmVJZCA9IC0xXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICByZW1vdmUoKSB7XG4gICAgICBhdXRob3JpemVSZXEucmVtb3ZlTWVtYmVyKHtcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgICByZW1vdmVfbWVtYmVyX2lkOiB0aGlzLnJlbW92ZUlkXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgc2hvd01zZygn5pON5L2c5oiQ5YqfJylcbiAgICAgICAgICB0aGlzLnJlbW92ZU5hbWUgPSAnJ1xuICAgICAgICAgIHRoaXMucmVtb3ZlSWQgPSAtMVxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIGNoYW5nZUNvZGUoKSB7XG4gICAgICBhdXRob3JpemVSZXEuY2hhbmdlQ29kZSh7XG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgICAgam9pbl9rZXk6IHRoaXMuY29kZVxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgIHRoaXMuY2xhc3NJbmZvLmpvaW5fa2V5ID0gdGhpcy5jb2RlXG4gICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycsIHRoaXMuY2xhc3NJbmZvKVxuICAgICAgICAgIHRoaXMuY29kZSA9ICcnXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgIHNob3dNc2coJ+abtOaWsOaIkOWKnycpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBiaW5kRm9ybShlKSB7XG4gICAgICB0aGlzW2UuY3VycmVudFRhcmdldC5pZF0gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgY2xvc2VTZWFyY2goKSB7XG4gICAgICB0aGlzLnNob3dBZGQgPSBmYWxzZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgZGVsKGF1dGhJZCkge1xuICAgICAgYXV0aG9yaXplUmVxLmRlbGV0ZUF1dGgoe1xuICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXG4gICAgICAgIGNsYXNzX2F1dGhfaWQ6IGF1dGhJZFxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgIHNob3dNc2coJ+WIoOmZpOaIkOWKnycpXG4gICAgICAgICAgdGhpcy5nZXRBdXRoTGlzdCgpXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgc2VsZWN0U3R1ZGVudCh2YWx1ZSkge1xuICAgICAgaWYgKHRoaXMucmVtb3ZlRmxhZykge1xuICAgICAgICB0aGlzLnJlbW92ZU5hbWUgPSB2YWx1ZS5jbGFzc19uaWNrbmFtZVxuICAgICAgICB0aGlzLnJlbW92ZUlkID0gdmFsdWUuaWRcbiAgICAgICAgdGhpcy5yZW1vdmVGbGFnID0gZmFsc2VcbiAgICAgICAgdGhpcy5zaG93QWRkID0gZmFsc2VcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXV0aG9yaXplUmVxLmFkZEF1dGgoe1xuICAgICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgICAgICByb2xlX2lkOiB0aGlzLmN1cnJlbnRSb2xlSWQsXG4gICAgICAgICAgam9pbl9tZW1iZXJfaWQ6IHZhbHVlLmlkXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgICAgc2hvd01zZygn5re75Yqg5oiQ5YqfJylcbiAgICAgICAgICAgIHRoaXMuZ2V0QXV0aExpc3QoKVxuICAgICAgICAgICAgdGhpcy5zaG93QWRkID0gZmFsc2VcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSxcbiAgICBjYW5jZWwoKSB7XG4gICAgICB0aGlzLnNob3dBZGQgPSBmYWxzZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgYWRkTmV3KGJvb2xlYW5WYWx1ZSwgaWQsIHR5cGUpIHtcbiAgICAgIHRoaXMuc2hvd0FkZCA9IGJvb2xlYW5WYWx1ZVxuICAgICAgdGhpcy5jdXJyZW50Um9sZUlkID0gaWRcbiAgICAgIGlmICh0eXBlID09PSAncmVtb3ZlJykge1xuICAgICAgICB0aGlzLnJlbW92ZUZsYWcgPSB0cnVlXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBzdXJlKHZhbHVlKSB7XG4gICAgICBhdXRob3JpemVSZXEuc2VhcmNoTWVtYmVyKHtcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgICBrZXl3b3JkczogdmFsdWVcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgbGV0IGxpc3QgPSByZXMuZGF0YS5saXN0XG4gICAgICAgIHRoaXMuc3R1ZGVudExpc3QgPSBsaXN0XG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG4iXX0=