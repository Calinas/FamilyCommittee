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
    }, _this.$repeat = {}, _this.$props = { "Modal": { "sureBtnText": "确认添加", "cancelBtnText": "取消", "placeholderText": "请输入姓名", "xmlns:v-bind": "", "v-bind:flag.sync": "showAdd", "xmlns:v-on": "" }, "Search": { "xmlns:v-bind": "", "v-bind:flag.sync": "showAdd", "v-bind:studentList.sync": "studentList", "xmlns:v-on": "" } }, _this.$events = { "Modal": { "v-on:cancel": "cancel", "v-on:sure": "sure" }, "Search": { "v-on:sure": "sure", "v-on:selectStudent": "selectStudent" } }, _this.components = {
      Modal: _modal2.default,
      Search: _searchResult2.default
    }, _this.data = {
      showAdd: false,
      list: [],
      currentRoleId: -1,
      memberInfo: null,
      classInfo: {},
      studentList: []
    }, _this.methods = {
      del: function del(authId) {
        var _this2 = this;

        authorizeReq.deleteAuth({
          class_id: this.classInfo.id,
          class_auth_id: authId
        }).then(function (res) {
          if (res.data.success) {
            (0, _common.showMsg)('删除成功');
            _this2.getAuthList();
            _this2.$apply();
          }
        });
      },
      selectStudent: function selectStudent(studentId) {
        var _this3 = this;

        authorizeReq.addAuth({
          class_id: this.classInfo.id,
          role_id: this.currentRoleId,
          join_member_id: studentId
        }).then(function (res) {
          if (res.data.success) {
            (0, _common.showMsg)('添加成功');
            _this3.getAuthList();
            _this3.showAdd = false;
            _this3.$apply();
          }
        });
      },
      cancel: function cancel() {
        this.showAdd = false;
        this.$apply();
      },
      addNew: function addNew(booleanValue, id) {
        this.showAdd = booleanValue;
        this.currentRoleId = id;
        this.$apply();
      },
      sure: function sure(value) {
        var _this4 = this;

        authorizeReq.searchMember({
          class_id: this.classInfo.id,
          keywords: value
        }).then(function (res) {
          var list = res.data.list;
          if (list.length) {
            _this4.studentList = list;
            _this4.$apply();
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
      var _this5 = this;

      authorizeReq.authList({
        class_id: this.classInfo.id
      }).then(function (res) {
        _this5.list = res.data.list;
        _this5.$apply();
      });
    }
  }]);

  return bindRelationship;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(bindRelationship , 'pages/authorize'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGhvcml6ZS5qcyJdLCJuYW1lcyI6WyJhdXRob3JpemVSZXEiLCJiaW5kUmVsYXRpb25zaGlwIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIk1vZGFsIiwiU2VhcmNoIiwiZGF0YSIsInNob3dBZGQiLCJsaXN0IiwiY3VycmVudFJvbGVJZCIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJzdHVkZW50TGlzdCIsIm1ldGhvZHMiLCJkZWwiLCJhdXRoSWQiLCJkZWxldGVBdXRoIiwiY2xhc3NfaWQiLCJpZCIsImNsYXNzX2F1dGhfaWQiLCJ0aGVuIiwicmVzIiwic3VjY2VzcyIsImdldEF1dGhMaXN0IiwiJGFwcGx5Iiwic2VsZWN0U3R1ZGVudCIsInN0dWRlbnRJZCIsImFkZEF1dGgiLCJyb2xlX2lkIiwiam9pbl9tZW1iZXJfaWQiLCJjYW5jZWwiLCJhZGROZXciLCJib29sZWFuVmFsdWUiLCJzdXJlIiwidmFsdWUiLCJzZWFyY2hNZW1iZXIiLCJrZXl3b3JkcyIsImxlbmd0aCIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJhdXRoTGlzdCIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7SUFBWUEsWTs7Ozs7Ozs7Ozs7O0lBQ1NDLGdCOzs7Ozs7Ozs7Ozs7OzswTUFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdWQyxPLEdBQVUsRSxRQUNYQyxNLEdBQVMsRUFBQyxTQUFRLEVBQUMsZUFBYyxNQUFmLEVBQXNCLGlCQUFnQixJQUF0QyxFQUEyQyxtQkFBa0IsT0FBN0QsRUFBcUUsZ0JBQWUsRUFBcEYsRUFBdUYsb0JBQW1CLFNBQTFHLEVBQW9ILGNBQWEsRUFBakksRUFBVCxFQUE4SSxVQUFTLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsb0JBQW1CLFNBQXRDLEVB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c0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHsgc2hvd01zZyB9IGZyb20gJy4uL3V0aWxzL2NvbW1vbidcbmltcG9ydCBNb2RhbCBmcm9tICcuLi9jb21wb25lbnRzL21vZGFsJ1xuaW1wb3J0IFNlYXJjaCBmcm9tICcuLi9jb21wb25lbnRzL3NlYXJjaFJlc3VsdCdcbmltcG9ydCAqIGFzIGF1dGhvcml6ZVJlcSBmcm9tICcuLi9hcGkvYXV0aG9yaXplJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgYmluZFJlbGF0aW9uc2hpcCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5a625aeU5Lya566h55CGJ1xuICB9XG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJNb2RhbFwiOntcInN1cmVCdG5UZXh0XCI6XCLnoa7orqTmt7vliqBcIixcImNhbmNlbEJ0blRleHRcIjpcIuWPlua2iFwiLFwicGxhY2Vob2xkZXJUZXh0XCI6XCLor7fovpPlhaXlp5PlkI1cIixcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6ZmxhZy5zeW5jXCI6XCJzaG93QWRkXCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJTZWFyY2hcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmZsYWcuc3luY1wiOlwic2hvd0FkZFwiLFwidi1iaW5kOnN0dWRlbnRMaXN0LnN5bmNcIjpcInN0dWRlbnRMaXN0XCIsXCJ4bWxuczp2LW9uXCI6XCJcIn19O1xyXG4kZXZlbnRzID0ge1wiTW9kYWxcIjp7XCJ2LW9uOmNhbmNlbFwiOlwiY2FuY2VsXCIsXCJ2LW9uOnN1cmVcIjpcInN1cmVcIn0sXCJTZWFyY2hcIjp7XCJ2LW9uOnN1cmVcIjpcInN1cmVcIixcInYtb246c2VsZWN0U3R1ZGVudFwiOlwic2VsZWN0U3R1ZGVudFwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgIE1vZGFsLFxuICAgIFNlYXJjaFxuICB9XG4gIGRhdGEgPSB7XG4gICAgc2hvd0FkZDogZmFsc2UsXG4gICAgbGlzdDogW10sXG4gICAgY3VycmVudFJvbGVJZDogLTEsXG4gICAgbWVtYmVySW5mbzogbnVsbCxcbiAgICBjbGFzc0luZm86IHt9LFxuICAgIHN0dWRlbnRMaXN0OiBbXVxuICB9XG4gIG9uTG9hZCgpIHtcbiAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxuICAgIHRoaXMubWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcbiAgICB0aGlzLmdldEF1dGhMaXN0KClcbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgZ2V0QXV0aExpc3QoKSB7XG4gICAgYXV0aG9yaXplUmVxLmF1dGhMaXN0KHtcbiAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZFxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHRoaXMubGlzdCA9IHJlcy5kYXRhLmxpc3RcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9KVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgZGVsKGF1dGhJZCkge1xuICAgICAgYXV0aG9yaXplUmVxLmRlbGV0ZUF1dGgoe1xuICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXG4gICAgICAgIGNsYXNzX2F1dGhfaWQ6IGF1dGhJZFxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgIHNob3dNc2coJ+WIoOmZpOaIkOWKnycpXG4gICAgICAgICAgdGhpcy5nZXRBdXRoTGlzdCgpXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgc2VsZWN0U3R1ZGVudChzdHVkZW50SWQpIHtcbiAgICAgIGF1dGhvcml6ZVJlcS5hZGRBdXRoKHtcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgICByb2xlX2lkOiB0aGlzLmN1cnJlbnRSb2xlSWQsXG4gICAgICAgIGpvaW5fbWVtYmVyX2lkOiBzdHVkZW50SWRcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICBzaG93TXNnKCfmt7vliqDmiJDlip8nKVxuICAgICAgICAgIHRoaXMuZ2V0QXV0aExpc3QoKVxuICAgICAgICAgIHRoaXMuc2hvd0FkZCA9IGZhbHNlXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgY2FuY2VsKCkge1xuICAgICAgdGhpcy5zaG93QWRkID0gZmFsc2VcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGFkZE5ldyhib29sZWFuVmFsdWUsIGlkKSB7XG4gICAgICB0aGlzLnNob3dBZGQgPSBib29sZWFuVmFsdWVcbiAgICAgIHRoaXMuY3VycmVudFJvbGVJZCA9IGlkXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBzdXJlKHZhbHVlKSB7XG4gICAgICBhdXRob3JpemVSZXEuc2VhcmNoTWVtYmVyKHtcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgICBrZXl3b3JkczogdmFsdWVcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgbGV0IGxpc3QgPSByZXMuZGF0YS5saXN0XG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuc3R1ZGVudExpc3QgPSBsaXN0XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxufVxuIl19