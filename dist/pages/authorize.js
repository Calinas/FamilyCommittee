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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGhvcml6ZS5qcyJdLCJuYW1lcyI6WyJhdXRob3JpemVSZXEiLCJiaW5kUmVsYXRpb25zaGlwIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIk1vZGFsIiwiU2VhcmNoIiwiZGF0YSIsInNob3dBZGQiLCJsaXN0IiwiY3VycmVudFJvbGVJZCIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJzdHVkZW50TGlzdCIsImNvZGUiLCJyZW1vdmVGbGFnIiwicmVtb3ZlTmFtZSIsInJlbW92ZUlkIiwiY2xhc3NJZCIsIm5hbWUiLCJrZXkiLCJtZXRob2RzIiwicmVtb3ZlIiwicmVtb3ZlTWVtYmVyIiwiY2xhc3NfaWQiLCJpZCIsInJlbW92ZV9tZW1iZXJfaWQiLCJ0aGVuIiwicmVzIiwic3VjY2VzcyIsIiRhcHBseSIsImNoYW5nZUNvZGUiLCJqb2luX2tleSIsInd4Iiwic2V0U3RvcmFnZVN5bmMiLCJiaW5kRm9ybSIsImUiLCJjdXJyZW50VGFyZ2V0IiwiZGV0YWlsIiwidmFsdWUiLCJjbG9zZVNlYXJjaCIsImRlbCIsImF1dGhJZCIsImRlbGV0ZUF1dGgiLCJjbGFzc19hdXRoX2lkIiwiZ2V0QXV0aExpc3QiLCJzZWxlY3RTdHVkZW50IiwiY2xhc3Nfbmlja25hbWUiLCJhZGRBdXRoIiwicm9sZV9pZCIsImpvaW5fbWVtYmVyX2lkIiwiY2FuY2VsIiwiYWRkTmV3IiwiYm9vbGVhblZhbHVlIiwidHlwZSIsInN1cmUiLCJzZWFyY2hNZW1iZXIiLCJrZXl3b3JkcyIsImxlbmd0aCIsInRpdGxlIiwibmlja25hbWUiLCJwYXRoIiwicGFyYW1zIiwiZ2V0U3RvcmFnZVN5bmMiLCJtZW1iZXJfaWQiLCJyZWRpcmVjdFRvIiwidXJsIiwiZ2V0TWVtYmVyTGlzdCIsImFyciIsImZhbWlseV9saXN0IiwicmV0TGlzdCIsImkiLCJsZW4iLCJpbm5lckxpc3QiLCJqIiwibWVt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QixDQUFsQyxFQUFxQztBQUNuQzZDLHNCQUFRTyxJQUFSLENBQWFsRSxVQUFiO0FBQ0Q7QUFDRHlELGdCQUFJUyxJQUFKLENBQVNsRSxXQUFXYyxFQUFwQjtBQUNEO0FBQ0Y7QUFDRCxlQUFLWixXQUFMLEdBQW1CeUQsT0FBbkI7QUFDQSxlQUFLeEMsTUFBTDtBQUNELE9BbEJEO0FBbUJEOzs7a0NBQ2E7QUFBQTs7QUFDWmpDLG1CQUFhaUYsUUFBYixDQUFzQjtBQUNwQnRELGtCQUFVLEtBQUtaLFNBQUwsQ0FBZWE7QUFETCxPQUF0QixFQUVHRSxJQUZILENBRVEsZUFBTztBQUNiLGVBQUtsQixJQUFMLEdBQVltQixJQUFJckIsSUFBSixDQUFTRSxJQUFyQjtBQUNBLGVBQUtxQixNQUFMO0FBQ0QsT0FMRDtBQU1EOzs7O0VBbEYyQ2lELGVBQUtDLEk7O2tCQUE5QmxGLGdCIiwiZmlsZSI6ImF1dGhvcml6ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7IGdldE1lbWJlckxpc3QgfSBmcm9tICcuLi9hcGkvdXNlcidcbmltcG9ydCB7IHNob3dNc2cgfSBmcm9tICcuLi91dGlscy9jb21tb24nXG5pbXBvcnQgTW9kYWwgZnJvbSAnLi4vY29tcG9uZW50cy9tb2RhbCdcbmltcG9ydCBTZWFyY2ggZnJvbSAnLi4vY29tcG9uZW50cy9zZWFyY2hSZXN1bHQnXG5pbXBvcnQgKiBhcyBhdXRob3JpemVSZXEgZnJvbSAnLi4vYXBpL2F1dGhvcml6ZSdcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGJpbmRSZWxhdGlvbnNoaXAgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WutuWnlOS8mueuoeeQhidcbiAgfVxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiTW9kYWxcIjp7XCJzdXJlQnRuVGV4dFwiOlwi56Gu6K6k5re75YqgXCIsXCJjYW5jZWxCdG5UZXh0XCI6XCLlj5bmtohcIixcInBsYWNlaG9sZGVyVGV4dFwiOlwi6K+36L6T5YWl5aeT5ZCNXCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmZsYWcuc3luY1wiOlwic2hvd0FkZFwiLFwieG1sbnM6di1vblwiOlwiXCJ9LFwiU2VhcmNoXCI6e1wieG1sbnM6di1vblwiOlwiXCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmZsYWcuc3luY1wiOlwic2hvd0FkZFwiLFwidi1iaW5kOnN0dWRlbnRMaXN0LnN5bmNcIjpcInN0dWRlbnRMaXN0XCJ9fTtcclxuJGV2ZW50cyA9IHtcIk1vZGFsXCI6e1widi1vbjpjYW5jZWxcIjpcImNhbmNlbFwiLFwidi1vbjpzdXJlXCI6XCJzdXJlXCJ9LFwiU2VhcmNoXCI6e1widi1vbjpjbG9zZU1vZGFsXCI6XCJjbG9zZVNlYXJjaFwiLFwidi1vbjpzdXJlXCI6XCJzdXJlXCIsXCJ2LW9uOnNlbGVjdFN0dWRlbnRcIjpcInNlbGVjdFN0dWRlbnRcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICBNb2RhbCxcbiAgICBTZWFyY2hcbiAgfVxuICBkYXRhID0ge1xuICAgIHNob3dBZGQ6IGZhbHNlLFxuICAgIGxpc3Q6IFtdLFxuICAgIGN1cnJlbnRSb2xlSWQ6IC0xLFxuICAgIG1lbWJlckluZm86IG51bGwsXG4gICAgY2xhc3NJbmZvOiB7fSxcbiAgICBzdHVkZW50TGlzdDogW10sXG4gICAgY29kZTogJycsXG4gICAgcmVtb3ZlRmxhZzogZmFsc2UsXG4gICAgcmVtb3ZlTmFtZTogJycsXG4gICAgcmVtb3ZlSWQ6IC0xLFxuICAgIGNsYXNzSWQ6IC0xLFxuICAgIG5hbWU6ICcnLFxuICAgIGtleTogJydcbiAgfVxuICBvblNoYXJlQXBwTWVzc2FnZShyZXMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6IGAke3RoaXMubWVtYmVySW5mby5uaWNrbmFtZX3pgoDor7fmgqjliqDlhaXlrrblp5TkvJrnj63nuqcs6aqM6K+B56CB5pivJHt0aGlzLmNsYXNzSW5mby5qb2luX2tleX1gLFxuICAgICAgcGF0aDogYHBhZ2VzL2F1dGhvcml6ZT9jbGFzc0lkPSR7dGhpcy5jbGFzc0luZm8uaWR9Jm5hbWU9JHt0aGlzLmNsYXNzSW5mby5uYW1lfSZrZXk9JHt0aGlzLmNsYXNzSW5mby5qb2luX2tleX0mY29kZT0ke3RoaXMuY29kZX1gXG4gICAgfVxuICB9XG4gIG9uTG9hZChwYXJhbXMpIHtcbiAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxuICAgIHRoaXMubWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcbiAgICB0aGlzLm5hbWUgPSBwYXJhbXMubmFtZVxuICAgIHRoaXMuY29kZSA9IHBhcmFtcy5jb2RlXG4gICAgdGhpcy5rZXkgPSBwYXJhbXMua2V5XG4gICAgdGhpcy5jbGFzc0lkID0gcGFyYW1zLmNsYXNzSWRcbiAgICBpZiAodGhpcy5jb2RlICYmICF0aGlzLm1lbWJlckluZm8ubWVtYmVyX2lkKSB7XG4gICAgICAvLyDlpoLmnpzmmK/ku47liIbkuqvpk77mjqXov5vlhaXkuJTmsqHmnInms6jlhozvvIzlhYjotbDms6jlhozmtYHnqItcbiAgICAgIHd4LnJlZGlyZWN0VG8oe1xuICAgICAgICB1cmw6IGBsb2dpbj9jbGFzc0lkPSR7dGhpcy5jbGFzc0lkfSZuYW1lPSR7dGhpcy5uYW1lfSZrZXk9JHt0aGlzLmtleX1gXG4gICAgICB9KVxuICAgIH0gZWxzZSBpZiAodGhpcy5jb2RlICYmIHRoaXMubWVtYmVySW5mby5tZW1iZXJfaWQpIHtcbiAgICAgIHd4LnJlZGlyZWN0VG8oe1xuICAgICAgICB1cmw6IGBqb2luQ2xhc3M/Y2xhc3NJZD0ke3RoaXMuY2xhc3NJZH0mbmFtZT0ke3RoaXMubmFtZX0ma2V5PSR7dGhpcy5rZXl9YFxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nZXRBdXRoTGlzdCgpXG4gICAgICB0aGlzLmdldE1lbWJlckxpc3QoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuICBnZXRNZW1iZXJMaXN0KCkge1xuICAgIGdldE1lbWJlckxpc3Qoe1xuICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IGFyciA9IFtdXG4gICAgICBsZXQgbGlzdCA9IHJlcy5kYXRhLmZhbWlseV9saXN0Lmxpc3RcbiAgICAgIGxldCByZXRMaXN0ID0gW11cbiAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBsaXN0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGxldCBpbm5lckxpc3QgPSBsaXN0W2ldLmxpc3RcbiAgICAgICAgZm9yIChsZXQgaiA9IDAsIGxlbmd0aCA9IGlubmVyTGlzdC5sZW5ndGg7IGogPCBsZW5ndGg7IGorKykge1xuICAgICAgICAgIGxldCBtZW1iZXJJbmZvID0gaW5uZXJMaXN0W2pdLm1lbWJlclxuICAgICAgICAgIGlmIChhcnIuaW5kZXhPZihtZW1iZXJJbmZvLmlkKSA8PSAwKSB7XG4gICAgICAgICAgICByZXRMaXN0LnB1c2gobWVtYmVySW5mbylcbiAgICAgICAgICB9XG4gICAgICAgICAgYXJyLnB1c2gobWVtYmVySW5mby5pZClcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5zdHVkZW50TGlzdCA9IHJldExpc3RcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9KVxuICB9XG4gIGdldEF1dGhMaXN0KCkge1xuICAgIGF1dGhvcml6ZVJlcS5hdXRoTGlzdCh7XG4gICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWRcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICB0aGlzLmxpc3QgPSByZXMuZGF0YS5saXN0XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSlcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIHJlbW92ZSgpIHtcbiAgICAgIGF1dGhvcml6ZVJlcS5yZW1vdmVNZW1iZXIoe1xuICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXG4gICAgICAgIHJlbW92ZV9tZW1iZXJfaWQ6IHRoaXMucmVtb3ZlSWRcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICBzaG93TXNnKCfmk43kvZzmiJDlip8nKVxuICAgICAgICAgIHRoaXMucmVtb3ZlTmFtZSA9ICcnXG4gICAgICAgICAgdGhpcy5yZW1vdmVJZCA9IC0xXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgY2hhbmdlQ29kZSgpIHtcbiAgICAgIGF1dGhvcml6ZVJlcS5jaGFuZ2VDb2RlKHtcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgICBqb2luX2tleTogdGhpcy5jb2RlXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgdGhpcy5jbGFzc0luZm8uam9pbl9rZXkgPSB0aGlzLmNvZGVcbiAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnY2xhc3NJbmZvJywgdGhpcy5jbGFzc0luZm8pXG4gICAgICAgICAgdGhpcy5jb2RlID0gJydcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgc2hvd01zZygn5pu05paw5oiQ5YqfJylcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIGJpbmRGb3JtKGUpIHtcbiAgICAgIHRoaXNbZS5jdXJyZW50VGFyZ2V0LmlkXSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBjbG9zZVNlYXJjaCgpIHtcbiAgICAgIHRoaXMuc2hvd0FkZCA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBkZWwoYXV0aElkKSB7XG4gICAgICBhdXRob3JpemVSZXEuZGVsZXRlQXV0aCh7XG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgICAgY2xhc3NfYXV0aF9pZDogYXV0aElkXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgc2hvd01zZygn5Yig6Zmk5oiQ5YqfJylcbiAgICAgICAgICB0aGlzLmdldEF1dGhMaXN0KClcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBzZWxlY3RTdHVkZW50KHZhbHVlKSB7XG4gICAgICBpZiAodGhpcy5yZW1vdmVGbGFnKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTmFtZSA9IHZhbHVlLmNsYXNzX25pY2tuYW1lXG4gICAgICAgIHRoaXMucmVtb3ZlSWQgPSB2YWx1ZS5pZFxuICAgICAgICB0aGlzLnJlbW92ZUZsYWcgPSBmYWxzZVxuICAgICAgICB0aGlzLnNob3dBZGQgPSBmYWxzZVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhdXRob3JpemVSZXEuYWRkQXV0aCh7XG4gICAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgICAgIHJvbGVfaWQ6IHRoaXMuY3VycmVudFJvbGVJZCxcbiAgICAgICAgICBqb2luX21lbWJlcl9pZDogdmFsdWUuaWRcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgICBzaG93TXNnKCfmt7vliqDmiJDlip8nKVxuICAgICAgICAgICAgdGhpcy5nZXRBdXRoTGlzdCgpXG4gICAgICAgICAgICB0aGlzLnNob3dBZGQgPSBmYWxzZVxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9LFxuICAgIGNhbmNlbCgpIHtcbiAgICAgIHRoaXMuc2hvd0FkZCA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBhZGROZXcoYm9vbGVhblZhbHVlLCBpZCwgdHlwZSkge1xuICAgICAgdGhpcy5zaG93QWRkID0gYm9vbGVhblZhbHVlXG4gICAgICB0aGlzLmN1cnJlbnRSb2xlSWQgPSBpZFxuICAgICAgaWYgKHR5cGUgPT09ICdyZW1vdmUnKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlRmxhZyA9IHRydWVcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIHN1cmUodmFsdWUpIHtcbiAgICAgIGF1dGhvcml6ZVJlcS5zZWFyY2hNZW1iZXIoe1xuICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXG4gICAgICAgIGtleXdvcmRzOiB2YWx1ZVxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBsZXQgbGlzdCA9IHJlcy5kYXRhLmxpc3RcbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5zdHVkZW50TGlzdCA9IGxpc3RcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG4iXX0=