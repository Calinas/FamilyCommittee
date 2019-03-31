'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

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

var bindRelationship = function (_wepy$page) {
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
          if (list.length) {
            _this6.studentList = list;
            _this6.$apply();
          }
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
        this.getAuthList();
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
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(bindRelationship , 'pages/authorize'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGhvcml6ZS5qcyJdLCJuYW1lcyI6WyJhdXRob3JpemVSZXEiLCJiaW5kUmVsYXRpb25zaGlwIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIk1vZGFsIiwiU2VhcmNoIiwiZGF0YSIsInNob3dBZGQiLCJsaXN0IiwiY3VycmVudFJvbGVJZCIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJzdHVkZW50TGlzdCIsImNvZGUiLCJyZW1vdmVGbGFnIiwicmVtb3ZlTmFtZSIsInJlbW92ZUlkIiwiY2xhc3NJZCIsIm5hbWUiLCJrZXkiLCJtZXRob2RzIiwicmVtb3ZlIiwicmVtb3ZlTWVtYmVyIiwiY2xhc3NfaWQiLCJpZCIsInJlbW92ZV9tZW1iZXJfaWQiLCJ0aGVuIiwicmVzIiwic3VjY2VzcyIsIiRhcHBseSIsImNoYW5nZUNvZGUiLCJqb2luX2tleSIsInd4Iiwic2V0U3RvcmFnZVN5bmMiLCJiaW5kRm9ybSIsImUiLCJjdXJyZW50VGFyZ2V0IiwiZGV0YWlsIiwidmFsdWUiLCJjbG9zZVNlYXJjaCIsImRlbCIsImF1dGhJZCIsImRlbGV0ZUF1dGgiLCJjbGFzc19hdXRoX2lkIiwiZ2V0QXV0aExpc3QiLCJzZWxlY3RTdHVkZW50IiwiY2xhc3Nfbmlja25hbWUiLCJhZGRBdXRoIiwicm9sZV9pZCIsImpvaW5fbWVtYmVyX2lkIiwiY2FuY2VsIiwiYWRkTmV3IiwiYm9vbGVhblZhbHVlIiwidHlwZSIsInN1cmUiLCJzZWFyY2hNZW1iZXIiLCJrZXl3b3JkcyIsImxlbmd0aCIsInRpdGxlIiwibmlja25hbWUiLCJwYXRoIiwicGFyYW1zIiwiZ2V0U3RvcmFnZVN5bmMiLCJtZW1iZXJfaWQiLCJyZWRpcmVjdFRvIiwidXJsIiwiZ2V0TWVtYmVyTGlzdCIsImFyciIsImZhbWlseV9saXN0IiwicmV0TGlzdCIsImkiLCJsZW4iLCJpbm5lckxpc3QiLCJqIiwibWVt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QixDQUFsQyxFQUFxQztBQUNuQzZDLHNCQUFRTyxJQUFSLENBQWFsRSxVQUFiO0FBQ0Q7QUFDRHlELGdCQUFJUyxJQUFKLENBQVNsRSxXQUFXYyxFQUFwQjtBQUNEO0FBQ0Y7QUFDRCxlQUFLWixXQUFMLEdBQW1CeUQsT0FBbkI7QUFDQSxlQUFLeEMsTUFBTDtBQUNELE9BbEJEO0FBbUJEOzs7a0NBQ2E7QUFBQTs7QUFDWmpDLG1CQUFhaUYsUUFBYixDQUFzQjtBQUNwQnRELGtCQUFVLEtBQUtaLFNBQUwsQ0FBZWE7QUFETCxPQUF0QixFQUVHRSxJQUZILENBRVEsZUFBTztBQUNiLGVBQUtsQixJQUFMLEdBQVltQixJQUFJckIsSUFBSixDQUFTRSxJQUFyQjtBQUNBLGVBQUtxQixNQUFMO0FBQ0QsT0FMRDtBQU1EOzs7O0VBbEYyQ2lELGVBQUtDLEk7O2tCQUE5QmxGLGdCIiwiZmlsZSI6ImF1dGhvcml6ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgeyBnZXRNZW1iZXJMaXN0IH0gZnJvbSAnLi4vYXBpL3VzZXInXHJcbmltcG9ydCB7IHNob3dNc2cgfSBmcm9tICcuLi91dGlscy9jb21tb24nXHJcbmltcG9ydCBNb2RhbCBmcm9tICcuLi9jb21wb25lbnRzL21vZGFsJ1xyXG5pbXBvcnQgU2VhcmNoIGZyb20gJy4uL2NvbXBvbmVudHMvc2VhcmNoUmVzdWx0J1xyXG5pbXBvcnQgKiBhcyBhdXRob3JpemVSZXEgZnJvbSAnLi4vYXBpL2F1dGhvcml6ZSdcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgYmluZFJlbGF0aW9uc2hpcCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WutuWnlOS8mueuoeeQhidcclxuICB9XHJcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIk1vZGFsXCI6e1wic3VyZUJ0blRleHRcIjpcIuehruiupOa3u+WKoFwiLFwiY2FuY2VsQnRuVGV4dFwiOlwi5Y+W5raIXCIsXCJwbGFjZWhvbGRlclRleHRcIjpcIuivt+i+k+WFpeWnk+WQjVwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpmbGFnLnN5bmNcIjpcInNob3dBZGRcIixcInhtbG5zOnYtb25cIjpcIlwifSxcIlNlYXJjaFwiOntcInhtbG5zOnYtb25cIjpcIlwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpmbGFnLnN5bmNcIjpcInNob3dBZGRcIixcInYtYmluZDpzdHVkZW50TGlzdC5zeW5jXCI6XCJzdHVkZW50TGlzdFwifX07XHJcbiRldmVudHMgPSB7XCJNb2RhbFwiOntcInYtb246Y2FuY2VsXCI6XCJjYW5jZWxcIixcInYtb246c3VyZVwiOlwic3VyZVwifSxcIlNlYXJjaFwiOntcInYtb246Y2xvc2VNb2RhbFwiOlwiY2xvc2VTZWFyY2hcIixcInYtb246c3VyZVwiOlwic3VyZVwiLFwidi1vbjpzZWxlY3RTdHVkZW50XCI6XCJzZWxlY3RTdHVkZW50XCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICBNb2RhbCxcclxuICAgIFNlYXJjaFxyXG4gIH1cclxuICBkYXRhID0ge1xyXG4gICAgc2hvd0FkZDogZmFsc2UsXHJcbiAgICBsaXN0OiBbXSxcclxuICAgIGN1cnJlbnRSb2xlSWQ6IC0xLFxyXG4gICAgbWVtYmVySW5mbzogbnVsbCxcclxuICAgIGNsYXNzSW5mbzoge30sXHJcbiAgICBzdHVkZW50TGlzdDogW10sXHJcbiAgICBjb2RlOiAnJyxcclxuICAgIHJlbW92ZUZsYWc6IGZhbHNlLFxyXG4gICAgcmVtb3ZlTmFtZTogJycsXHJcbiAgICByZW1vdmVJZDogLTEsXHJcbiAgICBjbGFzc0lkOiAtMSxcclxuICAgIG5hbWU6ICcnLFxyXG4gICAga2V5OiAnJ1xyXG4gIH1cclxuICBvblNoYXJlQXBwTWVzc2FnZShyZXMpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRpdGxlOiBgJHt0aGlzLm1lbWJlckluZm8ubmlja25hbWV96YKA6K+35oKo5Yqg5YWl5a625aeU5Lya54+t57qnLOmqjOivgeeggeaYryR7dGhpcy5jbGFzc0luZm8uam9pbl9rZXl9YCxcclxuICAgICAgcGF0aDogYHBhZ2VzL2F1dGhvcml6ZT9jbGFzc0lkPSR7dGhpcy5jbGFzc0luZm8uaWR9Jm5hbWU9JHt0aGlzLmNsYXNzSW5mby5uYW1lfSZrZXk9JHt0aGlzLmNsYXNzSW5mby5qb2luX2tleX0mY29kZT0ke3RoaXMuY29kZX1gXHJcbiAgICB9XHJcbiAgfVxyXG4gIG9uTG9hZChwYXJhbXMpIHtcclxuICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXHJcbiAgICB0aGlzLm1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXHJcbiAgICB0aGlzLm5hbWUgPSBwYXJhbXMubmFtZVxyXG4gICAgdGhpcy5jb2RlID0gcGFyYW1zLmNvZGVcclxuICAgIHRoaXMua2V5ID0gcGFyYW1zLmtleVxyXG4gICAgdGhpcy5jbGFzc0lkID0gcGFyYW1zLmNsYXNzSWRcclxuICAgIGlmICh0aGlzLmNvZGUgJiYgIXRoaXMubWVtYmVySW5mby5tZW1iZXJfaWQpIHtcclxuICAgICAgLy8g5aaC5p6c5piv5LuO5YiG5Lqr6ZO+5o6l6L+b5YWl5LiU5rKh5pyJ5rOo5YaM77yM5YWI6LWw5rOo5YaM5rWB56iLXHJcbiAgICAgIHd4LnJlZGlyZWN0VG8oe1xyXG4gICAgICAgIHVybDogYGxvZ2luP2NsYXNzSWQ9JHt0aGlzLmNsYXNzSWR9Jm5hbWU9JHt0aGlzLm5hbWV9JmtleT0ke3RoaXMua2V5fWBcclxuICAgICAgfSlcclxuICAgIH0gZWxzZSBpZiAodGhpcy5jb2RlICYmIHRoaXMubWVtYmVySW5mby5tZW1iZXJfaWQpIHtcclxuICAgICAgd3gucmVkaXJlY3RUbyh7XHJcbiAgICAgICAgdXJsOiBgam9pbkNsYXNzP2NsYXNzSWQ9JHt0aGlzLmNsYXNzSWR9Jm5hbWU9JHt0aGlzLm5hbWV9JmtleT0ke3RoaXMua2V5fWBcclxuICAgICAgfSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZ2V0QXV0aExpc3QoKVxyXG4gICAgICB0aGlzLmdldE1lbWJlckxpc3QoKVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldE1lbWJlckxpc3QoKSB7XHJcbiAgICBnZXRNZW1iZXJMaXN0KHtcclxuICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGxldCBhcnIgPSBbXVxyXG4gICAgICBsZXQgbGlzdCA9IHJlcy5kYXRhLmZhbWlseV9saXN0Lmxpc3RcclxuICAgICAgbGV0IHJldExpc3QgPSBbXVxyXG4gICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gbGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgIGxldCBpbm5lckxpc3QgPSBsaXN0W2ldLmxpc3RcclxuICAgICAgICBmb3IgKGxldCBqID0gMCwgbGVuZ3RoID0gaW5uZXJMaXN0Lmxlbmd0aDsgaiA8IGxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICBsZXQgbWVtYmVySW5mbyA9IGlubmVyTGlzdFtqXS5tZW1iZXJcclxuICAgICAgICAgIGlmIChhcnIuaW5kZXhPZihtZW1iZXJJbmZvLmlkKSA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldExpc3QucHVzaChtZW1iZXJJbmZvKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYXJyLnB1c2gobWVtYmVySW5mby5pZClcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zdHVkZW50TGlzdCA9IHJldExpc3RcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSlcclxuICB9XHJcbiAgZ2V0QXV0aExpc3QoKSB7XHJcbiAgICBhdXRob3JpemVSZXEuYXV0aExpc3Qoe1xyXG4gICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWRcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgdGhpcy5saXN0ID0gcmVzLmRhdGEubGlzdFxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9KVxyXG4gIH1cclxuICBtZXRob2RzID0ge1xyXG4gICAgcmVtb3ZlKCkge1xyXG4gICAgICBhdXRob3JpemVSZXEucmVtb3ZlTWVtYmVyKHtcclxuICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXHJcbiAgICAgICAgcmVtb3ZlX21lbWJlcl9pZDogdGhpcy5yZW1vdmVJZFxyXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgIHNob3dNc2coJ+aTjeS9nOaIkOWKnycpXHJcbiAgICAgICAgICB0aGlzLnJlbW92ZU5hbWUgPSAnJ1xyXG4gICAgICAgICAgdGhpcy5yZW1vdmVJZCA9IC0xXHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIGNoYW5nZUNvZGUoKSB7XHJcbiAgICAgIGF1dGhvcml6ZVJlcS5jaGFuZ2VDb2RlKHtcclxuICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXHJcbiAgICAgICAgam9pbl9rZXk6IHRoaXMuY29kZVxyXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgIHRoaXMuY2xhc3NJbmZvLmpvaW5fa2V5ID0gdGhpcy5jb2RlXHJcbiAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnY2xhc3NJbmZvJywgdGhpcy5jbGFzc0luZm8pXHJcbiAgICAgICAgICB0aGlzLmNvZGUgPSAnJ1xyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgc2hvd01zZygn5pu05paw5oiQ5YqfJylcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgYmluZEZvcm0oZSkge1xyXG4gICAgICB0aGlzW2UuY3VycmVudFRhcmdldC5pZF0gPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9LFxyXG4gICAgY2xvc2VTZWFyY2goKSB7XHJcbiAgICAgIHRoaXMuc2hvd0FkZCA9IGZhbHNlXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0sXHJcbiAgICBkZWwoYXV0aElkKSB7XHJcbiAgICAgIGF1dGhvcml6ZVJlcS5kZWxldGVBdXRoKHtcclxuICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXHJcbiAgICAgICAgY2xhc3NfYXV0aF9pZDogYXV0aElkXHJcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgc2hvd01zZygn5Yig6Zmk5oiQ5YqfJylcclxuICAgICAgICAgIHRoaXMuZ2V0QXV0aExpc3QoKVxyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBzZWxlY3RTdHVkZW50KHZhbHVlKSB7XHJcbiAgICAgIGlmICh0aGlzLnJlbW92ZUZsYWcpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZU5hbWUgPSB2YWx1ZS5jbGFzc19uaWNrbmFtZVxyXG4gICAgICAgIHRoaXMucmVtb3ZlSWQgPSB2YWx1ZS5pZFxyXG4gICAgICAgIHRoaXMucmVtb3ZlRmxhZyA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5zaG93QWRkID0gZmFsc2VcclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYXV0aG9yaXplUmVxLmFkZEF1dGgoe1xyXG4gICAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxyXG4gICAgICAgICAgcm9sZV9pZDogdGhpcy5jdXJyZW50Um9sZUlkLFxyXG4gICAgICAgICAgam9pbl9tZW1iZXJfaWQ6IHZhbHVlLmlkXHJcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgc2hvd01zZygn5re75Yqg5oiQ5YqfJylcclxuICAgICAgICAgICAgdGhpcy5nZXRBdXRoTGlzdCgpXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0FkZCA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgY2FuY2VsKCkge1xyXG4gICAgICB0aGlzLnNob3dBZGQgPSBmYWxzZVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9LFxyXG4gICAgYWRkTmV3KGJvb2xlYW5WYWx1ZSwgaWQsIHR5cGUpIHtcclxuICAgICAgdGhpcy5zaG93QWRkID0gYm9vbGVhblZhbHVlXHJcbiAgICAgIHRoaXMuY3VycmVudFJvbGVJZCA9IGlkXHJcbiAgICAgIGlmICh0eXBlID09PSAncmVtb3ZlJykge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlRmxhZyA9IHRydWVcclxuICAgICAgfVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9LFxyXG4gICAgc3VyZSh2YWx1ZSkge1xyXG4gICAgICBhdXRob3JpemVSZXEuc2VhcmNoTWVtYmVyKHtcclxuICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXHJcbiAgICAgICAga2V5d29yZHM6IHZhbHVlXHJcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICBsZXQgbGlzdCA9IHJlcy5kYXRhLmxpc3RcclxuICAgICAgICBpZiAobGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgIHRoaXMuc3R1ZGVudExpc3QgPSBsaXN0XHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=