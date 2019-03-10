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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGhvcml6ZS5qcyJdLCJuYW1lcyI6WyJhdXRob3JpemVSZXEiLCJiaW5kUmVsYXRpb25zaGlwIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIk1vZGFsIiwiU2VhcmNoIiwiZGF0YSIsInNob3dBZGQiLCJsaXN0IiwiY3VycmVudFJvbGVJZCIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJzdHVkZW50TGlzdCIsImNvZGUiLCJyZW1vdmVGbGFnIiwicmVtb3ZlTmFtZSIsInJlbW92ZUlkIiwibWV0aG9kcyIsInJlbW92ZSIsInJlbW92ZU1lbWJlciIsImNsYXNzX2lkIiwiaWQiLCJyZW1vdmVfbWVtYmVyX2lkIiwidGhlbiIsInJlcyIsInN1Y2Nlc3MiLCIkYXBwbHkiLCJjaGFuZ2VDb2RlIiwiam9pbl9rZXkiLCJ3eCIsInNldFN0b3JhZ2VTeW5jIiwiYmluZEZvcm0iLCJlIiwiY3VycmVudFRhcmdldCIsImRldGFpbCIsInZhbHVlIiwiY2xvc2VTZWFyY2giLCJkZWwiLCJhdXRoSWQiLCJkZWxldGVBdXRoIiwiY2xhc3NfYXV0aF9pZCIsImdldEF1dGhMaXN0Iiwic2VsZWN0U3R1ZGVudCIsImNsYXNzX25pY2tuYW1lIiwiYWRkQXV0aCIsInJvbGVfaWQiLCJqb2luX21lbWJlcl9pZCIsImNhbmNlbCIsImFkZE5ldyIsImJvb2xlYW5WYWx1ZSIsInR5cGUiLCJzdXJlIiwic2VhcmNoTWVtYmVyIiwia2V5d29yZHMiLCJsZW5ndGgiLCJnZXRTdG9yYWdlU3luYyIsImF1dGhMaXN0Iiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztJQUFZQSxZOzs7Ozs7Ozs7Ozs7SUFDU0MsZ0I7Ozs7Ozs7Ozs7Ozs7OzBNQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1ZD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LGVBQU87QUFDYixjQUFJZixPQUFPZ0IsSUFBSWxCLElBQUosQ0FBU0UsSUFBcEI7QUFDQSxjQUFJQSxLQUFLOEMsTUFBVCxFQUFpQjtBQUNmLG1CQUFLMUMsV0FBTCxHQUFtQkosSUFBbkI7QUFDQSxtQkFBS2tCLE1BQUw7QUFDRDtBQUNGLFNBVEQ7QUFVRDtBQTdGTyxLOzs7Ozs2QkFkRDtBQUNQLFdBQUtmLFNBQUwsR0FBaUJrQixHQUFHMEIsY0FBSCxDQUFrQixXQUFsQixDQUFqQjtBQUNBLFdBQUs3QyxVQUFMLEdBQWtCbUIsR0FBRzBCLGNBQUgsQ0FBa0IsWUFBbEIsQ0FBbEI7QUFDQSxXQUFLZCxXQUFMO0FBQ0EsV0FBS2YsTUFBTDtBQUNEOzs7a0NBQ2E7QUFBQTs7QUFDWjlCLG1CQUFhNEQsUUFBYixDQUFzQjtBQUNwQnBDLGtCQUFVLEtBQUtULFNBQUwsQ0FBZVU7QUFETCxPQUF0QixFQUVHRSxJQUZILENBRVEsZUFBTztBQUNiLGVBQUtmLElBQUwsR0FBWWdCLElBQUlsQixJQUFKLENBQVNFLElBQXJCO0FBQ0EsZUFBS2tCLE1BQUw7QUFDRCxPQUxEO0FBTUQ7Ozs7RUFwQzJDK0IsZUFBS0MsSTs7a0JBQTlCN0QsZ0IiLCJmaWxlIjoiYXV0aG9yaXplLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCB7IHNob3dNc2cgfSBmcm9tICcuLi91dGlscy9jb21tb24nXHJcbmltcG9ydCBNb2RhbCBmcm9tICcuLi9jb21wb25lbnRzL21vZGFsJ1xyXG5pbXBvcnQgU2VhcmNoIGZyb20gJy4uL2NvbXBvbmVudHMvc2VhcmNoUmVzdWx0J1xyXG5pbXBvcnQgKiBhcyBhdXRob3JpemVSZXEgZnJvbSAnLi4vYXBpL2F1dGhvcml6ZSdcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgYmluZFJlbGF0aW9uc2hpcCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WutuWnlOS8mueuoeeQhidcclxuICB9XHJcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIk1vZGFsXCI6e1wic3VyZUJ0blRleHRcIjpcIuehruiupOa3u+WKoFwiLFwiY2FuY2VsQnRuVGV4dFwiOlwi5Y+W5raIXCIsXCJwbGFjZWhvbGRlclRleHRcIjpcIuivt+i+k+WFpeWnk+WQjVwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpmbGFnLnN5bmNcIjpcInNob3dBZGRcIixcInhtbG5zOnYtb25cIjpcIlwifSxcIlNlYXJjaFwiOntcInhtbG5zOnYtb25cIjpcIlwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpmbGFnLnN5bmNcIjpcInNob3dBZGRcIixcInYtYmluZDpzdHVkZW50TGlzdC5zeW5jXCI6XCJzdHVkZW50TGlzdFwifX07XHJcbiRldmVudHMgPSB7XCJNb2RhbFwiOntcInYtb246Y2FuY2VsXCI6XCJjYW5jZWxcIixcInYtb246c3VyZVwiOlwic3VyZVwifSxcIlNlYXJjaFwiOntcInYtb246Y2xvc2VNb2RhbFwiOlwiY2xvc2VTZWFyY2hcIixcInYtb246c3VyZVwiOlwic3VyZVwiLFwidi1vbjpzZWxlY3RTdHVkZW50XCI6XCJzZWxlY3RTdHVkZW50XCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICBNb2RhbCxcclxuICAgIFNlYXJjaFxyXG4gIH1cclxuICBkYXRhID0ge1xyXG4gICAgc2hvd0FkZDogZmFsc2UsXHJcbiAgICBsaXN0OiBbXSxcclxuICAgIGN1cnJlbnRSb2xlSWQ6IC0xLFxyXG4gICAgbWVtYmVySW5mbzogbnVsbCxcclxuICAgIGNsYXNzSW5mbzoge30sXHJcbiAgICBzdHVkZW50TGlzdDogW10sXHJcbiAgICBjb2RlOiAnJyxcclxuICAgIHJlbW92ZUZsYWc6IGZhbHNlLFxyXG4gICAgcmVtb3ZlTmFtZTogJycsXHJcbiAgICByZW1vdmVJZDogLTFcclxuICB9XHJcbiAgb25Mb2FkKCkge1xyXG4gICAgdGhpcy5jbGFzc0luZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnY2xhc3NJbmZvJylcclxuICAgIHRoaXMubWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcclxuICAgIHRoaXMuZ2V0QXV0aExpc3QoKVxyXG4gICAgdGhpcy4kYXBwbHkoKVxyXG4gIH1cclxuICBnZXRBdXRoTGlzdCgpIHtcclxuICAgIGF1dGhvcml6ZVJlcS5hdXRoTGlzdCh7XHJcbiAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZFxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICB0aGlzLmxpc3QgPSByZXMuZGF0YS5saXN0XHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0pXHJcbiAgfVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICByZW1vdmUoKSB7XHJcbiAgICAgIGF1dGhvcml6ZVJlcS5yZW1vdmVNZW1iZXIoe1xyXG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcclxuICAgICAgICByZW1vdmVfbWVtYmVyX2lkOiB0aGlzLnJlbW92ZUlkXHJcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgc2hvd01zZygn5pON5L2c5oiQ5YqfJylcclxuICAgICAgICAgIHRoaXMucmVtb3ZlTmFtZSA9ICcnXHJcbiAgICAgICAgICB0aGlzLnJlbW92ZUlkID0gLTFcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgY2hhbmdlQ29kZSgpIHtcclxuICAgICAgYXV0aG9yaXplUmVxLmNoYW5nZUNvZGUoe1xyXG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcclxuICAgICAgICBqb2luX2tleTogdGhpcy5jb2RlXHJcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgdGhpcy5jbGFzc0luZm8uam9pbl9rZXkgPSB0aGlzLmNvZGVcclxuICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nLCB0aGlzLmNsYXNzSW5mbylcclxuICAgICAgICAgIHRoaXMuY29kZSA9ICcnXHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICBzaG93TXNnKCfmm7TmlrDmiJDlip8nKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBiaW5kRm9ybShlKSB7XHJcbiAgICAgIHRoaXNbZS5jdXJyZW50VGFyZ2V0LmlkXSA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0sXHJcbiAgICBjbG9zZVNlYXJjaCgpIHtcclxuICAgICAgdGhpcy5zaG93QWRkID0gZmFsc2VcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSxcclxuICAgIGRlbChhdXRoSWQpIHtcclxuICAgICAgYXV0aG9yaXplUmVxLmRlbGV0ZUF1dGgoe1xyXG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcclxuICAgICAgICBjbGFzc19hdXRoX2lkOiBhdXRoSWRcclxuICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICBzaG93TXNnKCfliKDpmaTmiJDlip8nKVxyXG4gICAgICAgICAgdGhpcy5nZXRBdXRoTGlzdCgpXHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIHNlbGVjdFN0dWRlbnQodmFsdWUpIHtcclxuICAgICAgaWYgKHRoaXMucmVtb3ZlRmxhZykge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlTmFtZSA9IHZhbHVlLmNsYXNzX25pY2tuYW1lXHJcbiAgICAgICAgdGhpcy5yZW1vdmVJZCA9IHZhbHVlLmlkXHJcbiAgICAgICAgdGhpcy5yZW1vdmVGbGFnID0gZmFsc2VcclxuICAgICAgICB0aGlzLnNob3dBZGQgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhdXRob3JpemVSZXEuYWRkQXV0aCh7XHJcbiAgICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXHJcbiAgICAgICAgICByb2xlX2lkOiB0aGlzLmN1cnJlbnRSb2xlSWQsXHJcbiAgICAgICAgICBqb2luX21lbWJlcl9pZDogdmFsdWUuaWRcclxuICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICBzaG93TXNnKCfmt7vliqDmiJDlip8nKVxyXG4gICAgICAgICAgdGhpcy5nZXRBdXRoTGlzdCgpXHJcbiAgICAgICAgICB0aGlzLnNob3dBZGQgPSBmYWxzZVxyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNhbmNlbCgpIHtcclxuICAgICAgdGhpcy5zaG93QWRkID0gZmFsc2VcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSxcclxuICAgIGFkZE5ldyhib29sZWFuVmFsdWUsIGlkLCB0eXBlKSB7XHJcbiAgICAgIHRoaXMuc2hvd0FkZCA9IGJvb2xlYW5WYWx1ZVxyXG4gICAgICB0aGlzLmN1cnJlbnRSb2xlSWQgPSBpZFxyXG4gICAgICBpZih0eXBlID09PSAncmVtb3ZlJykge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlRmxhZyA9IHRydWVcclxuICAgICAgfVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9LFxyXG4gICAgc3VyZSh2YWx1ZSkge1xyXG4gICAgICBhdXRob3JpemVSZXEuc2VhcmNoTWVtYmVyKHtcclxuICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXHJcbiAgICAgICAga2V5d29yZHM6IHZhbHVlXHJcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICBsZXQgbGlzdCA9IHJlcy5kYXRhLmxpc3RcclxuICAgICAgICBpZiAobGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgIHRoaXMuc3R1ZGVudExpc3QgPSBsaXN0XHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=