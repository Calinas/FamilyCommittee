'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

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
      removeName: ''
    }, _this.methods = {
      changeCode: function changeCode() {
        var _this2 = this;

        authorizeReq.changeCode({
          class_id: this.classInfo.id,
          join_key: this.code
        }).then(function (res) {
          if (res.data.success) {
            _this2.classInfo.join_key = _this2.code;
            wx.setStorageSync('classInfo', _this2.classInfo);
            _this2.code = '';
            _this2.$apply();
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
        var _this3 = this;

        authorizeReq.deleteAuth({
          class_id: this.classInfo.id,
          class_auth_id: authId
        }).then(function (res) {
          if (res.data.success) {
            (0, _common.showMsg)('删除成功');
            _this3.getAuthList();
            _this3.$apply();
          }
        });
      },
      selectStudent: function selectStudent(value) {
        var _this4 = this;

        if (this.removeFlag) {
          this.removeName = value.class_nickname;
          this.$apply();
          authorizeReq.removeMember({
            class_id: this.classInfo.id,
            remove_member_id: value.id
          }).then(function (res) {
            if (res.data.success) {
              (0, _common.showMsg)('操作成功');
              _this4.removeFlag = false;
              _this4.showAdd = false;
              _this4.$apply();
            }
          });
        } else {
          authorizeReq.addAuth({
            class_id: this.classInfo.id,
            role_id: this.currentRoleId,
            join_member_id: value.id
          }).then(function (res) {
            if (res.data.success) {
              (0, _common.showMsg)('添加成功');
              _this4.getAuthList();
              _this4.showAdd = false;
              _this4.$apply();
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
        var _this5 = this;

        authorizeReq.searchMember({
          class_id: this.classInfo.id,
          keywords: value
        }).then(function (res) {
          var list = res.data.list;
          if (list.length) {
            _this5.studentList = list;
            _this5.$apply();
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(bindRelationship, [{
    key: 'onLoad',
    value: function onLoad() {
      this.classInfo = wx.getStorageSync('classInfo');
      this.memberInfo = wx.getStorageSync('memberInfo');
      this.getAuthList();
      this.$apply();
    }
  }, {
    key: 'getAuthList',
    value: function getAuthList() {
      var _this6 = this;

      authorizeReq.authList({
        class_id: this.classInfo.id
      }).then(function (res) {
        _this6.list = res.data.list;
        _this6.$apply();
      });
    }
  }]);

  return bindRelationship;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(bindRelationship , 'pages/authorize'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGhvcml6ZS5qcyJdLCJuYW1lcyI6WyJhdXRob3JpemVSZXEiLCJiaW5kUmVsYXRpb25zaGlwIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIk1vZGFsIiwiU2VhcmNoIiwiZGF0YSIsInNob3dBZGQiLCJsaXN0IiwiY3VycmVudFJvbGVJZCIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJzdHVkZW50TGlzdCIsImNvZGUiLCJyZW1vdmVGbGFnIiwicmVtb3ZlTmFtZSIsIm1ldGhvZHMiLCJjaGFuZ2VDb2RlIiwiY2xhc3NfaWQiLCJpZCIsImpvaW5fa2V5IiwidGhlbiIsInJlcyIsInN1Y2Nlc3MiLCJ3eCIsInNldFN0b3JhZ2VTeW5jIiwiJGFwcGx5IiwiYmluZEZvcm0iLCJlIiwiY3VycmVudFRhcmdldCIsImRldGFpbCIsInZhbHVlIiwiY2xvc2VTZWFyY2giLCJkZWwiLCJhdXRoSWQiLCJkZWxldGVBdXRoIiwiY2xhc3NfYXV0aF9pZCIsImdldEF1dGhMaXN0Iiwic2VsZWN0U3R1ZGVudCIsImNsYXNzX25pY2tuYW1lIiwicmVtb3ZlTWVtYmVyIiwicmVtb3ZlX21lbWJlcl9pZCIsImFkZEF1dGgiLCJyb2xlX2lkIiwiam9pbl9tZW1iZXJfaWQiLCJjYW5jZWwiLCJhZGROZXciLCJib29sZWFuVmFsdWUiLCJ0eXBlIiwic3VyZSIsInNlYXJjaE1lbWJlciIsImtleXdvcmRzIiwibGVuZ3RoIiwiZ2V0U3RvcmFnZVN5bmMiLCJhdXRoTGlzdCIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7SUFBWUEsWTs7Ozs7Ozs7Ozs7O0lBQ1NDLGdCOzs7Ozs7Ozs7Ozs7OzswTUFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdWQyxPLEdBQVUsRSxRQUNYQyxNLEdB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QWlCYSxHQUFHNkIsY0FBSCxDQUFrQixXQUFsQixDQUFqQjtBQUNBLFdBQUszQyxVQUFMLEdBQWtCYyxHQUFHNkIsY0FBSCxDQUFrQixZQUFsQixDQUFsQjtBQUNBLFdBQUtoQixXQUFMO0FBQ0EsV0FBS1gsTUFBTDtBQUNEOzs7a0NBQ2E7QUFBQTs7QUFDWjlCLG1CQUFhMEQsUUFBYixDQUFzQjtBQUNwQnBDLGtCQUFVLEtBQUtQLFNBQUwsQ0FBZVE7QUFETCxPQUF0QixFQUVHRSxJQUZILENBRVEsZUFBTztBQUNiLGVBQUtiLElBQUwsR0FBWWMsSUFBSWhCLElBQUosQ0FBU0UsSUFBckI7QUFDQSxlQUFLa0IsTUFBTDtBQUNELE9BTEQ7QUFNRDs7OztFQW5DMkM2QixlQUFLQyxJOztrQkFBOUIzRCxnQiIsImZpbGUiOiJhdXRob3JpemUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgeyBzaG93TXNnIH0gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xuaW1wb3J0IE1vZGFsIGZyb20gJy4uL2NvbXBvbmVudHMvbW9kYWwnXG5pbXBvcnQgU2VhcmNoIGZyb20gJy4uL2NvbXBvbmVudHMvc2VhcmNoUmVzdWx0J1xuaW1wb3J0ICogYXMgYXV0aG9yaXplUmVxIGZyb20gJy4uL2FwaS9hdXRob3JpemUnXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBiaW5kUmVsYXRpb25zaGlwIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflrrblp5TkvJrnrqHnkIYnXG4gIH1cbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIk1vZGFsXCI6e1wic3VyZUJ0blRleHRcIjpcIuehruiupOa3u+WKoFwiLFwiY2FuY2VsQnRuVGV4dFwiOlwi5Y+W5raIXCIsXCJwbGFjZWhvbGRlclRleHRcIjpcIuivt+i+k+WFpeWnk+WQjVwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpmbGFnLnN5bmNcIjpcInNob3dBZGRcIixcInhtbG5zOnYtb25cIjpcIlwifSxcIlNlYXJjaFwiOntcInhtbG5zOnYtb25cIjpcIlwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpmbGFnLnN5bmNcIjpcInNob3dBZGRcIixcInYtYmluZDpzdHVkZW50TGlzdC5zeW5jXCI6XCJzdHVkZW50TGlzdFwifX07XHJcbiRldmVudHMgPSB7XCJNb2RhbFwiOntcInYtb246Y2FuY2VsXCI6XCJjYW5jZWxcIixcInYtb246c3VyZVwiOlwic3VyZVwifSxcIlNlYXJjaFwiOntcInYtb246Y2xvc2VNb2RhbFwiOlwiY2xvc2VTZWFyY2hcIixcInYtb246c3VyZVwiOlwic3VyZVwiLFwidi1vbjpzZWxlY3RTdHVkZW50XCI6XCJzZWxlY3RTdHVkZW50XCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgTW9kYWwsXG4gICAgU2VhcmNoXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBzaG93QWRkOiBmYWxzZSxcbiAgICBsaXN0OiBbXSxcbiAgICBjdXJyZW50Um9sZUlkOiAtMSxcbiAgICBtZW1iZXJJbmZvOiBudWxsLFxuICAgIGNsYXNzSW5mbzoge30sXG4gICAgc3R1ZGVudExpc3Q6IFtdLFxuICAgIGNvZGU6ICcnLFxuICAgIHJlbW92ZUZsYWc6IGZhbHNlLFxuICAgIHJlbW92ZU5hbWU6ICcnXG4gIH1cbiAgb25Mb2FkKCkge1xuICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXG4gICAgdGhpcy5tZW1iZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nKVxuICAgIHRoaXMuZ2V0QXV0aExpc3QoKVxuICAgIHRoaXMuJGFwcGx5KClcbiAgfVxuICBnZXRBdXRoTGlzdCgpIHtcbiAgICBhdXRob3JpemVSZXEuYXV0aExpc3Qoe1xuICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgdGhpcy5saXN0ID0gcmVzLmRhdGEubGlzdFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0pXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBjaGFuZ2VDb2RlKCkge1xuICAgICAgYXV0aG9yaXplUmVxLmNoYW5nZUNvZGUoe1xuICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXG4gICAgICAgIGpvaW5fa2V5OiB0aGlzLmNvZGVcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICB0aGlzLmNsYXNzSW5mby5qb2luX2tleSA9IHRoaXMuY29kZVxuICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nLCB0aGlzLmNsYXNzSW5mbylcbiAgICAgICAgICB0aGlzLmNvZGUgPSAnJ1xuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICBzaG93TXNnKCfmm7TmlrDmiJDlip8nKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgYmluZEZvcm0oZSkge1xuICAgICAgdGhpc1tlLmN1cnJlbnRUYXJnZXQuaWRdID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGNsb3NlU2VhcmNoKCkge1xuICAgICAgdGhpcy5zaG93QWRkID0gZmFsc2VcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGRlbChhdXRoSWQpIHtcbiAgICAgIGF1dGhvcml6ZVJlcS5kZWxldGVBdXRoKHtcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgICBjbGFzc19hdXRoX2lkOiBhdXRoSWRcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICBzaG93TXNnKCfliKDpmaTmiJDlip8nKVxuICAgICAgICAgIHRoaXMuZ2V0QXV0aExpc3QoKVxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIHNlbGVjdFN0dWRlbnQodmFsdWUpIHtcbiAgICAgIGlmICh0aGlzLnJlbW92ZUZsYWcpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVOYW1lID0gdmFsdWUuY2xhc3Nfbmlja25hbWVcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICBhdXRob3JpemVSZXEucmVtb3ZlTWVtYmVyKHtcbiAgICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXG4gICAgICAgICAgcmVtb3ZlX21lbWJlcl9pZDogdmFsdWUuaWRcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgICBzaG93TXNnKCfmk43kvZzmiJDlip8nKVxuICAgICAgICAgICAgdGhpcy5yZW1vdmVGbGFnID0gZmFsc2VcbiAgICAgICAgICAgIHRoaXMuc2hvd0FkZCA9IGZhbHNlXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXV0aG9yaXplUmVxLmFkZEF1dGgoe1xuICAgICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgICAgICByb2xlX2lkOiB0aGlzLmN1cnJlbnRSb2xlSWQsXG4gICAgICAgICAgam9pbl9tZW1iZXJfaWQ6IHZhbHVlLmlkXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgc2hvd01zZygn5re75Yqg5oiQ5YqfJylcbiAgICAgICAgICB0aGlzLmdldEF1dGhMaXN0KClcbiAgICAgICAgICB0aGlzLnNob3dBZGQgPSBmYWxzZVxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIH1cbiAgICB9LFxuICAgIGNhbmNlbCgpIHtcbiAgICAgIHRoaXMuc2hvd0FkZCA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBhZGROZXcoYm9vbGVhblZhbHVlLCBpZCwgdHlwZSkge1xuICAgICAgdGhpcy5zaG93QWRkID0gYm9vbGVhblZhbHVlXG4gICAgICB0aGlzLmN1cnJlbnRSb2xlSWQgPSBpZFxuICAgICAgaWYodHlwZSA9PT0gJ3JlbW92ZScpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVGbGFnID0gdHJ1ZVxuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgc3VyZSh2YWx1ZSkge1xuICAgICAgYXV0aG9yaXplUmVxLnNlYXJjaE1lbWJlcih7XG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgICAga2V5d29yZHM6IHZhbHVlXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGxldCBsaXN0ID0gcmVzLmRhdGEubGlzdFxuICAgICAgICBpZiAobGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLnN0dWRlbnRMaXN0ID0gbGlzdFxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cbiJdfQ==