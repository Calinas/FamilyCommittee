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
      removeId: -1
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
        title: this.memberInfo.nickname + '\u9080\u8BF7\u60A8\u4E00\u8D77\u52A0\u5165' + this.classInfo.name + ',\u9A8C\u8BC1\u7801\u662F' + this.classInfo.join_key,
        path: 'pages/authorize?classId=' + this.classInfo.id + '&name=' + this.classInfo.name + '&key=' + this.classInfo.join_key
      };
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.classInfo = wx.getStorageSync('classInfo');
      this.memberInfo = wx.getStorageSync('memberInfo');
      this.getAuthList();
      this.getMemberList();
      this.$apply();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGhvcml6ZS5qcyJdLCJuYW1lcyI6WyJhdXRob3JpemVSZXEiLCJiaW5kUmVsYXRpb25zaGlwIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIk1vZGFsIiwiU2VhcmNoIiwiZGF0YSIsInNob3dBZGQiLCJsaXN0IiwiY3VycmVudFJvbGVJZCIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJzdHVkZW50TGlzdCIsImNvZGUiLCJyZW1vdmVGbGFnIiwicmVtb3ZlTmFtZSIsInJlbW92ZUlkIiwibWV0aG9kcyIsInJlbW92ZSIsInJlbW92ZU1lbWJlciIsImNsYXNzX2lkIiwiaWQiLCJyZW1vdmVfbWVtYmVyX2lkIiwidGhlbiIsInJlcyIsInN1Y2Nlc3MiLCIkYXBwbHkiLCJjaGFuZ2VDb2RlIiwiam9pbl9rZXkiLCJ3eCIsInNldFN0b3JhZ2VTeW5jIiwiYmluZEZvcm0iLCJlIiwiY3VycmVudFRhcmdldCIsImRldGFpbCIsInZhbHVlIiwiY2xvc2VTZWFyY2giLCJkZWwiLCJhdXRoSWQiLCJkZWxldGVBdXRoIiwiY2xhc3NfYXV0aF9pZCIsImdldEF1dGhMaXN0Iiwic2VsZWN0U3R1ZGVudCIsImNsYXNzX25pY2tuYW1lIiwiYWRkQXV0aCIsInJvbGVfaWQiLCJqb2luX21lbWJlcl9pZCIsImNhbmNlbCIsImFkZE5ldyIsImJvb2xlYW5WYWx1ZSIsInR5cGUiLCJzdXJlIiwic2VhcmNoTWVtYmVyIiwia2V5d29yZHMiLCJsZW5ndGgiLCJ0aXRsZSIsIm5pY2tuYW1lIiwibmFtZSIsInBhdGgiLCJnZXRTdG9yYWdlU3luYyIsImdldE1lbWJlckxpc3QiLCJhcnIiLCJmYW1pbHlfbGlzdCIsInJldExpc3QiLCJpIiwibGVuIiwiaW5uZXJMaXN0IiwiaiIsIm1lbWJlciIsImluZGV4T2YiLCJwdXNoIiwiYXV0aExpc3QiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5n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SyxJQUFJQyxJQUFJLENBQVIsRUFBV0MsTUFBTXpELEtBQUs4QyxNQUEzQixFQUFtQ1UsSUFBSUMsR0FBdkMsRUFBNENELEdBQTVDLEVBQWlEO0FBQy9DLGNBQUlFLFlBQVkxRCxLQUFLd0QsQ0FBTCxFQUFReEQsSUFBeEI7QUFDQSxlQUFLLElBQUkyRCxJQUFJLENBQVIsRUFBV2IsU0FBU1ksVUFBVVosTUFBbkMsRUFBMkNhLElBQUliLE1BQS9DLEVBQXVEYSxHQUF2RCxFQUE0RDtBQUMxRCxnQkFBSXpELGFBQWF3RCxVQUFVQyxDQUFWLEVBQWFDLE1BQTlCO0FBQ0EsZ0JBQUlQLElBQUlRLE9BQUosQ0FBWTNELFdBQVdXLEVBQXZCLEtBQThCLENBQWxDLEVBQXFDO0FBQ25DMEMsc0JBQVFPLElBQVIsQ0FBYTVELFVBQWI7QUFDRDtBQUNEbUQsZ0JBQUlTLElBQUosQ0FBUzVELFdBQVdXLEVBQXBCO0FBQ0Q7QUFDRjtBQUNELGVBQUtULFdBQUwsR0FBbUJtRCxPQUFuQjtBQUNBLGVBQUtyQyxNQUFMO0FBQ0QsT0FsQkQ7QUFtQkQ7OztrQ0FDYTtBQUFBOztBQUNaOUIsbUJBQWEyRSxRQUFiLENBQXNCO0FBQ3BCbkQsa0JBQVUsS0FBS1QsU0FBTCxDQUFlVTtBQURMLE9BQXRCLEVBRUdFLElBRkgsQ0FFUSxlQUFPO0FBQ2IsZUFBS2YsSUFBTCxHQUFZZ0IsSUFBSWxCLElBQUosQ0FBU0UsSUFBckI7QUFDQSxlQUFLa0IsTUFBTDtBQUNELE9BTEQ7QUFNRDs7OztFQWhFMkM4QyxlQUFLQyxJOztrQkFBOUI1RSxnQiIsImZpbGUiOiJhdXRob3JpemUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgeyBnZXRNZW1iZXJMaXN0IH0gZnJvbSAnLi4vYXBpL3VzZXInXG5pbXBvcnQgeyBzaG93TXNnIH0gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xuaW1wb3J0IE1vZGFsIGZyb20gJy4uL2NvbXBvbmVudHMvbW9kYWwnXG5pbXBvcnQgU2VhcmNoIGZyb20gJy4uL2NvbXBvbmVudHMvc2VhcmNoUmVzdWx0J1xuaW1wb3J0ICogYXMgYXV0aG9yaXplUmVxIGZyb20gJy4uL2FwaS9hdXRob3JpemUnXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBiaW5kUmVsYXRpb25zaGlwIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflrrblp5TkvJrnrqHnkIYnXG4gIH1cbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIk1vZGFsXCI6e1wic3VyZUJ0blRleHRcIjpcIuehruiupOa3u+WKoFwiLFwiY2FuY2VsQnRuVGV4dFwiOlwi5Y+W5raIXCIsXCJwbGFjZWhvbGRlclRleHRcIjpcIuivt+i+k+WFpeWnk+WQjVwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpmbGFnLnN5bmNcIjpcInNob3dBZGRcIixcInhtbG5zOnYtb25cIjpcIlwifSxcIlNlYXJjaFwiOntcInhtbG5zOnYtb25cIjpcIlwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpmbGFnLnN5bmNcIjpcInNob3dBZGRcIixcInYtYmluZDpzdHVkZW50TGlzdC5zeW5jXCI6XCJzdHVkZW50TGlzdFwifX07XHJcbiRldmVudHMgPSB7XCJNb2RhbFwiOntcInYtb246Y2FuY2VsXCI6XCJjYW5jZWxcIixcInYtb246c3VyZVwiOlwic3VyZVwifSxcIlNlYXJjaFwiOntcInYtb246Y2xvc2VNb2RhbFwiOlwiY2xvc2VTZWFyY2hcIixcInYtb246c3VyZVwiOlwic3VyZVwiLFwidi1vbjpzZWxlY3RTdHVkZW50XCI6XCJzZWxlY3RTdHVkZW50XCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgTW9kYWwsXG4gICAgU2VhcmNoXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBzaG93QWRkOiBmYWxzZSxcbiAgICBsaXN0OiBbXSxcbiAgICBjdXJyZW50Um9sZUlkOiAtMSxcbiAgICBtZW1iZXJJbmZvOiBudWxsLFxuICAgIGNsYXNzSW5mbzoge30sXG4gICAgc3R1ZGVudExpc3Q6IFtdLFxuICAgIGNvZGU6ICcnLFxuICAgIHJlbW92ZUZsYWc6IGZhbHNlLFxuICAgIHJlbW92ZU5hbWU6ICcnLFxuICAgIHJlbW92ZUlkOiAtMVxuICB9XG4gIG9uU2hhcmVBcHBNZXNzYWdlKHJlcykge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogYCR7dGhpcy5tZW1iZXJJbmZvLm5pY2tuYW1lfemCgOivt+aCqOS4gOi1t+WKoOWFpSR7dGhpcy5jbGFzc0luZm8ubmFtZX0s6aqM6K+B56CB5pivJHt0aGlzLmNsYXNzSW5mby5qb2luX2tleX1gLFxuICAgICAgcGF0aDogYHBhZ2VzL2F1dGhvcml6ZT9jbGFzc0lkPSR7dGhpcy5jbGFzc0luZm8uaWR9Jm5hbWU9JHt0aGlzLmNsYXNzSW5mby5uYW1lfSZrZXk9JHt0aGlzLmNsYXNzSW5mby5qb2luX2tleX1gXG4gICAgfVxuICB9XG4gIG9uTG9hZCgpIHtcbiAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxuICAgIHRoaXMubWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcbiAgICB0aGlzLmdldEF1dGhMaXN0KClcbiAgICB0aGlzLmdldE1lbWJlckxpc3QoKVxuICAgIHRoaXMuJGFwcGx5KClcbiAgfVxuICBnZXRNZW1iZXJMaXN0KCkge1xuICAgIGdldE1lbWJlckxpc3Qoe1xuICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IGFyciA9IFtdXG4gICAgICBsZXQgbGlzdCA9IHJlcy5kYXRhLmZhbWlseV9saXN0Lmxpc3RcbiAgICAgIGxldCByZXRMaXN0ID0gW11cbiAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBsaXN0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGxldCBpbm5lckxpc3QgPSBsaXN0W2ldLmxpc3RcbiAgICAgICAgZm9yIChsZXQgaiA9IDAsIGxlbmd0aCA9IGlubmVyTGlzdC5sZW5ndGg7IGogPCBsZW5ndGg7IGorKykge1xuICAgICAgICAgIGxldCBtZW1iZXJJbmZvID0gaW5uZXJMaXN0W2pdLm1lbWJlclxuICAgICAgICAgIGlmIChhcnIuaW5kZXhPZihtZW1iZXJJbmZvLmlkKSA8PSAwKSB7XG4gICAgICAgICAgICByZXRMaXN0LnB1c2gobWVtYmVySW5mbylcbiAgICAgICAgICB9XG4gICAgICAgICAgYXJyLnB1c2gobWVtYmVySW5mby5pZClcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5zdHVkZW50TGlzdCA9IHJldExpc3RcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9KVxuICB9XG4gIGdldEF1dGhMaXN0KCkge1xuICAgIGF1dGhvcml6ZVJlcS5hdXRoTGlzdCh7XG4gICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWRcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICB0aGlzLmxpc3QgPSByZXMuZGF0YS5saXN0XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSlcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIHJlbW92ZSgpIHtcbiAgICAgIGF1dGhvcml6ZVJlcS5yZW1vdmVNZW1iZXIoe1xuICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXG4gICAgICAgIHJlbW92ZV9tZW1iZXJfaWQ6IHRoaXMucmVtb3ZlSWRcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICBzaG93TXNnKCfmk43kvZzmiJDlip8nKVxuICAgICAgICAgIHRoaXMucmVtb3ZlTmFtZSA9ICcnXG4gICAgICAgICAgdGhpcy5yZW1vdmVJZCA9IC0xXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgY2hhbmdlQ29kZSgpIHtcbiAgICAgIGF1dGhvcml6ZVJlcS5jaGFuZ2VDb2RlKHtcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgICBqb2luX2tleTogdGhpcy5jb2RlXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgdGhpcy5jbGFzc0luZm8uam9pbl9rZXkgPSB0aGlzLmNvZGVcbiAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnY2xhc3NJbmZvJywgdGhpcy5jbGFzc0luZm8pXG4gICAgICAgICAgdGhpcy5jb2RlID0gJydcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgc2hvd01zZygn5pu05paw5oiQ5YqfJylcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIGJpbmRGb3JtKGUpIHtcbiAgICAgIHRoaXNbZS5jdXJyZW50VGFyZ2V0LmlkXSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBjbG9zZVNlYXJjaCgpIHtcbiAgICAgIHRoaXMuc2hvd0FkZCA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBkZWwoYXV0aElkKSB7XG4gICAgICBhdXRob3JpemVSZXEuZGVsZXRlQXV0aCh7XG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgICAgY2xhc3NfYXV0aF9pZDogYXV0aElkXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgc2hvd01zZygn5Yig6Zmk5oiQ5YqfJylcbiAgICAgICAgICB0aGlzLmdldEF1dGhMaXN0KClcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBzZWxlY3RTdHVkZW50KHZhbHVlKSB7XG4gICAgICBpZiAodGhpcy5yZW1vdmVGbGFnKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTmFtZSA9IHZhbHVlLmNsYXNzX25pY2tuYW1lXG4gICAgICAgIHRoaXMucmVtb3ZlSWQgPSB2YWx1ZS5pZFxuICAgICAgICB0aGlzLnJlbW92ZUZsYWcgPSBmYWxzZVxuICAgICAgICB0aGlzLnNob3dBZGQgPSBmYWxzZVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhdXRob3JpemVSZXEuYWRkQXV0aCh7XG4gICAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgICAgIHJvbGVfaWQ6IHRoaXMuY3VycmVudFJvbGVJZCxcbiAgICAgICAgICBqb2luX21lbWJlcl9pZDogdmFsdWUuaWRcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgICBzaG93TXNnKCfmt7vliqDmiJDlip8nKVxuICAgICAgICAgICAgdGhpcy5nZXRBdXRoTGlzdCgpXG4gICAgICAgICAgICB0aGlzLnNob3dBZGQgPSBmYWxzZVxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9LFxuICAgIGNhbmNlbCgpIHtcbiAgICAgIHRoaXMuc2hvd0FkZCA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBhZGROZXcoYm9vbGVhblZhbHVlLCBpZCwgdHlwZSkge1xuICAgICAgdGhpcy5zaG93QWRkID0gYm9vbGVhblZhbHVlXG4gICAgICB0aGlzLmN1cnJlbnRSb2xlSWQgPSBpZFxuICAgICAgaWYodHlwZSA9PT0gJ3JlbW92ZScpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVGbGFnID0gdHJ1ZVxuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgc3VyZSh2YWx1ZSkge1xuICAgICAgYXV0aG9yaXplUmVxLnNlYXJjaE1lbWJlcih7XG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgICAga2V5d29yZHM6IHZhbHVlXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGxldCBsaXN0ID0gcmVzLmRhdGEubGlzdFxuICAgICAgICBpZiAobGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLnN0dWRlbnRMaXN0ID0gbGlzdFxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cbiJdfQ==