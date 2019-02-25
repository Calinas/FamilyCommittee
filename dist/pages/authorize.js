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
      var _this7 = this;

      authorizeReq.authList({
        class_id: this.classInfo.id
      }).then(function (res) {
        _this7.list = res.data.list;
        _this7.$apply();
      });
    }
  }]);

  return bindRelationship;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(bindRelationship , 'pages/authorize'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGhvcml6ZS5qcyJdLCJuYW1lcyI6WyJhdXRob3JpemVSZXEiLCJiaW5kUmVsYXRpb25zaGlwIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIk1vZGFsIiwiU2VhcmNoIiwiZGF0YSIsInNob3dBZGQiLCJsaXN0IiwiY3VycmVudFJvbGVJZCIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJzdHVkZW50TGlzdCIsImNvZGUiLCJyZW1vdmVGbGFnIiwicmVtb3ZlTmFtZSIsInJlbW92ZUlkIiwibWV0aG9kcyIsInJlbW92ZSIsInJlbW92ZU1lbWJlciIsImNsYXNzX2lkIiwiaWQiLCJyZW1vdmVfbWVtYmVyX2lkIiwidGhlbiIsInJlcyIsInN1Y2Nlc3MiLCIkYXBwbHkiLCJjaGFuZ2VDb2RlIiwiam9pbl9rZXkiLCJ3eCIsInNldFN0b3JhZ2VTeW5jIiwiYmluZEZvcm0iLCJlIiwiY3VycmVudFRhcmdldCIsImRldGFpbCIsInZhbHVlIiwiY2xvc2VTZWFyY2giLCJkZWwiLCJhdXRoSWQiLCJkZWxldGVBdXRoIiwiY2xhc3NfYXV0aF9pZCIsImdldEF1dGhMaXN0Iiwic2VsZWN0U3R1ZGVudCIsImNsYXNzX25pY2tuYW1lIiwiYWRkQXV0aCIsInJvbGVfaWQiLCJqb2luX21lbWJlcl9pZCIsImNhbmNlbCIsImFkZE5ldyIsImJvb2xlYW5WYWx1ZSIsInR5cGUiLCJzdXJlIiwic2VhcmNoTWVtYmVyIiwia2V5d29yZHMiLCJsZW5ndGgiLCJnZXRTdG9yYWdlU3luYyIsImF1dGhMaXN0Iiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztJQUFZQSxZOzs7Ozs7Ozs7Ozs7SUFDU0MsZ0I7Ozs7Ozs7Ozs7Ozs7OzBNQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1ZD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LGVBQU87QUFDYixjQUFJZixPQUFPZ0IsSUFBSWxCLElBQUosQ0FBU0UsSUFBcEI7QUFDQSxjQUFJQSxLQUFLOEMsTUFBVCxFQUFpQjtBQUNmLG1CQUFLMUMsV0FBTCxHQUFtQkosSUFBbkI7QUFDQSxtQkFBS2tCLE1BQUw7QUFDRDtBQUNGLFNBVEQ7QUFVRDtBQTdGTyxLOzs7Ozs2QkFkRDtBQUNQLFdBQUtmLFNBQUwsR0FBaUJrQixHQUFHMEIsY0FBSCxDQUFrQixXQUFsQixDQUFqQjtBQUNBLFdBQUs3QyxVQUFMLEdBQWtCbUIsR0FBRzBCLGNBQUgsQ0FBa0IsWUFBbEIsQ0FBbEI7QUFDQSxXQUFLZCxXQUFMO0FBQ0EsV0FBS2YsTUFBTDtBQUNEOzs7a0NBQ2E7QUFBQTs7QUFDWjlCLG1CQUFhNEQsUUFBYixDQUFzQjtBQUNwQnBDLGtCQUFVLEtBQUtULFNBQUwsQ0FBZVU7QUFETCxPQUF0QixFQUVHRSxJQUZILENBRVEsZUFBTztBQUNiLGVBQUtmLElBQUwsR0FBWWdCLElBQUlsQixJQUFKLENBQVNFLElBQXJCO0FBQ0EsZUFBS2tCLE1BQUw7QUFDRCxPQUxEO0FBTUQ7Ozs7RUFwQzJDK0IsZUFBS0MsSTs7a0JBQTlCN0QsZ0IiLCJmaWxlIjoiYXV0aG9yaXplLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHsgc2hvd01zZyB9IGZyb20gJy4uL3V0aWxzL2NvbW1vbidcbmltcG9ydCBNb2RhbCBmcm9tICcuLi9jb21wb25lbnRzL21vZGFsJ1xuaW1wb3J0IFNlYXJjaCBmcm9tICcuLi9jb21wb25lbnRzL3NlYXJjaFJlc3VsdCdcbmltcG9ydCAqIGFzIGF1dGhvcml6ZVJlcSBmcm9tICcuLi9hcGkvYXV0aG9yaXplJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgYmluZFJlbGF0aW9uc2hpcCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5a625aeU5Lya566h55CGJ1xuICB9XG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJNb2RhbFwiOntcInN1cmVCdG5UZXh0XCI6XCLnoa7orqTmt7vliqBcIixcImNhbmNlbEJ0blRleHRcIjpcIuWPlua2iFwiLFwicGxhY2Vob2xkZXJUZXh0XCI6XCLor7fovpPlhaXlp5PlkI1cIixcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6ZmxhZy5zeW5jXCI6XCJzaG93QWRkXCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJTZWFyY2hcIjp7XCJ4bWxuczp2LW9uXCI6XCJcIixcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6ZmxhZy5zeW5jXCI6XCJzaG93QWRkXCIsXCJ2LWJpbmQ6c3R1ZGVudExpc3Quc3luY1wiOlwic3R1ZGVudExpc3RcIn19O1xyXG4kZXZlbnRzID0ge1wiTW9kYWxcIjp7XCJ2LW9uOmNhbmNlbFwiOlwiY2FuY2VsXCIsXCJ2LW9uOnN1cmVcIjpcInN1cmVcIn0sXCJTZWFyY2hcIjp7XCJ2LW9uOmNsb3NlTW9kYWxcIjpcImNsb3NlU2VhcmNoXCIsXCJ2LW9uOnN1cmVcIjpcInN1cmVcIixcInYtb246c2VsZWN0U3R1ZGVudFwiOlwic2VsZWN0U3R1ZGVudFwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgIE1vZGFsLFxuICAgIFNlYXJjaFxuICB9XG4gIGRhdGEgPSB7XG4gICAgc2hvd0FkZDogZmFsc2UsXG4gICAgbGlzdDogW10sXG4gICAgY3VycmVudFJvbGVJZDogLTEsXG4gICAgbWVtYmVySW5mbzogbnVsbCxcbiAgICBjbGFzc0luZm86IHt9LFxuICAgIHN0dWRlbnRMaXN0OiBbXSxcbiAgICBjb2RlOiAnJyxcbiAgICByZW1vdmVGbGFnOiBmYWxzZSxcbiAgICByZW1vdmVOYW1lOiAnJyxcbiAgICByZW1vdmVJZDogLTFcbiAgfVxuICBvbkxvYWQoKSB7XG4gICAgdGhpcy5jbGFzc0luZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnY2xhc3NJbmZvJylcbiAgICB0aGlzLm1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXG4gICAgdGhpcy5nZXRBdXRoTGlzdCgpXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIGdldEF1dGhMaXN0KCkge1xuICAgIGF1dGhvcml6ZVJlcS5hdXRoTGlzdCh7XG4gICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWRcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICB0aGlzLmxpc3QgPSByZXMuZGF0YS5saXN0XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSlcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIHJlbW92ZSgpIHtcbiAgICAgIGF1dGhvcml6ZVJlcS5yZW1vdmVNZW1iZXIoe1xuICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXG4gICAgICAgIHJlbW92ZV9tZW1iZXJfaWQ6IHRoaXMucmVtb3ZlSWRcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICBzaG93TXNnKCfmk43kvZzmiJDlip8nKVxuICAgICAgICAgIHRoaXMucmVtb3ZlTmFtZSA9ICcnXG4gICAgICAgICAgdGhpcy5yZW1vdmVJZCA9IC0xXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgY2hhbmdlQ29kZSgpIHtcbiAgICAgIGF1dGhvcml6ZVJlcS5jaGFuZ2VDb2RlKHtcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgICBqb2luX2tleTogdGhpcy5jb2RlXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgdGhpcy5jbGFzc0luZm8uam9pbl9rZXkgPSB0aGlzLmNvZGVcbiAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnY2xhc3NJbmZvJywgdGhpcy5jbGFzc0luZm8pXG4gICAgICAgICAgdGhpcy5jb2RlID0gJydcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgc2hvd01zZygn5pu05paw5oiQ5YqfJylcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIGJpbmRGb3JtKGUpIHtcbiAgICAgIHRoaXNbZS5jdXJyZW50VGFyZ2V0LmlkXSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBjbG9zZVNlYXJjaCgpIHtcbiAgICAgIHRoaXMuc2hvd0FkZCA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBkZWwoYXV0aElkKSB7XG4gICAgICBhdXRob3JpemVSZXEuZGVsZXRlQXV0aCh7XG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgICAgY2xhc3NfYXV0aF9pZDogYXV0aElkXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgc2hvd01zZygn5Yig6Zmk5oiQ5YqfJylcbiAgICAgICAgICB0aGlzLmdldEF1dGhMaXN0KClcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBzZWxlY3RTdHVkZW50KHZhbHVlKSB7XG4gICAgICBpZiAodGhpcy5yZW1vdmVGbGFnKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTmFtZSA9IHZhbHVlLmNsYXNzX25pY2tuYW1lXG4gICAgICAgIHRoaXMucmVtb3ZlSWQgPSB2YWx1ZS5pZFxuICAgICAgICB0aGlzLnJlbW92ZUZsYWcgPSBmYWxzZVxuICAgICAgICB0aGlzLnNob3dBZGQgPSBmYWxzZVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhdXRob3JpemVSZXEuYWRkQXV0aCh7XG4gICAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgICAgIHJvbGVfaWQ6IHRoaXMuY3VycmVudFJvbGVJZCxcbiAgICAgICAgICBqb2luX21lbWJlcl9pZDogdmFsdWUuaWRcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICBzaG93TXNnKCfmt7vliqDmiJDlip8nKVxuICAgICAgICAgIHRoaXMuZ2V0QXV0aExpc3QoKVxuICAgICAgICAgIHRoaXMuc2hvd0FkZCA9IGZhbHNlXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgfVxuICAgIH0sXG4gICAgY2FuY2VsKCkge1xuICAgICAgdGhpcy5zaG93QWRkID0gZmFsc2VcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGFkZE5ldyhib29sZWFuVmFsdWUsIGlkLCB0eXBlKSB7XG4gICAgICB0aGlzLnNob3dBZGQgPSBib29sZWFuVmFsdWVcbiAgICAgIHRoaXMuY3VycmVudFJvbGVJZCA9IGlkXG4gICAgICBpZih0eXBlID09PSAncmVtb3ZlJykge1xuICAgICAgICB0aGlzLnJlbW92ZUZsYWcgPSB0cnVlXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBzdXJlKHZhbHVlKSB7XG4gICAgICBhdXRob3JpemVSZXEuc2VhcmNoTWVtYmVyKHtcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgICBrZXl3b3JkczogdmFsdWVcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgbGV0IGxpc3QgPSByZXMuZGF0YS5saXN0XG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuc3R1ZGVudExpc3QgPSBsaXN0XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxufVxuIl19