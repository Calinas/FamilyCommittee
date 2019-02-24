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
      studentList: []
    }, _this.methods = {
      closeSearch: function closeSearch() {
        this.showAdd = false;
        this.$apply();
      },
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGhvcml6ZS5qcyJdLCJuYW1lcyI6WyJhdXRob3JpemVSZXEiLCJiaW5kUmVsYXRpb25zaGlwIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIk1vZGFsIiwiU2VhcmNoIiwiZGF0YSIsInNob3dBZGQiLCJsaXN0IiwiY3VycmVudFJvbGVJZCIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJzdHVkZW50TGlzdCIsIm1ldGhvZHMiLCJjbG9zZVNlYXJjaCIsIiRhcHBseSIsImRlbCIsImF1dGhJZCIsImRlbGV0ZUF1dGgiLCJjbGFzc19pZCIsImlkIiwiY2xhc3NfYXV0aF9pZCIsInRoZW4iLCJyZXMiLCJzdWNjZXNzIiwiZ2V0QXV0aExpc3QiLCJzZWxlY3RTdHVkZW50Iiwic3R1ZGVudElkIiwiYWRkQXV0aCIsInJvbGVfaWQiLCJqb2luX21lbWJlcl9pZCIsImNhbmNlbCIsImFkZE5ldyIsImJvb2xlYW5WYWx1ZSIsInN1cmUiLCJ2YWx1ZSIsInNlYXJjaE1lbWJlciIsImtleXdvcmRzIiwibGVuZ3RoIiwid3giLCJnZXRTdG9yYWdlU3luYyIsImF1dGhMaXN0Iiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztJQUFZQSxZOzs7Ozs7Ozs7Ozs7SUFDU0MsZ0I7Ozs7Ozs7Ozs7Ozs7OzBNQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1ZDLE8sR0FBVSxFLFFBQ1hDLE0sR0FBUyxFQUFDLFNBQVEsRUFBQyxlQUFjLE1BQWYsRUFBc0IsaUJBQWdCLElBQXRDLEVBQTJDLG1CQUFrQixPQUE3RCxFQUFxRSxnQkFBZSxFQUFwRixFQUF1RixvQkFBbUIsU0FBMUcsRUFBb0gsY0FBYSxFQUFqSSxFQUFULEVBQThJLFVBQVMsRUFBQyxjQUFhLEVBQWQsRUFBaUIsZ0JBQWUsRUFBaEMsRUFBbUMsb0JBQW1CLFNBQXRELEVBQWdFLDJCQUEwQixhQUExRixFQUF2SixFLFFBQ1RDLE8sR0FBVSxFQUFDLFNBQVEsRUFBQyxlQUFjLFFBQWYsRUFBd0IsYUFBWSxNQUFwQyxFQUFULEVBQXFELFVBQVMsRUFBQyxtQkFBa0IsYUFBbkIsRUFBaUMsYUFBWSxNQUE3QyxFQUFvRCxzQkFBcUIsZUFBekUsRUFBOUQsRSxRQUNUQyxVLEdBQWE7QUFDVkMsNEJBRFU7QUFFVkM7QUFGVSxLLFFBSVpDLEksR0FBTztBQUNMQyxlQUFTLEtBREo7QUFFTEMsWUFBTSxFQUZEO0FBR0xDLHFCQUFlLENBQUMsQ0FIWDtBQUlMQyxrQkFBWSxJQUpQO0FBS0xDLGlCQUFXLEVBTE47QUFNTEMsbUJBQWE7QUFOUixLLFFBc0JQQyxPLEdBQVU7QUFDUkMsaUJBRFEseUJBQ007QUFDWixhQUFLUCxPQUFMLEdBQWUsS0FBZjtBQUNBLGFBQUtRLE1BQUw7QUFDRCxPQUpPO0FBS1JDLFNBTFEsZUFLSkMsTUFMSSxFQUtJO0FBQUE7O0FBQ1ZyQixxQkFBYXNCLFVBQWIsQ0FBd0I7QUFDdEJDLG9CQUFVLEtBQUtSLFNBQUwsQ0FBZVMsRUFESDtBQUV0QkMseUJBQWVKO0FBRk8sU0FBeEIsRUFHR0ssSUFISCxDQUdRLGVBQU87QUFDYixjQUFJQyxJQUFJakIsSUFBSixDQUFTa0IsT0FBYixFQUFzQjtBQUNwQixpQ0FBUSxNQUFSO0FBQ0EsbUJBQUtDLFdBQUw7QUFDQSxtQkFBS1YsTUFBTDtBQUNEO0FBQ0YsU0FURDtBQVVELE9BaEJPO0FBaUJSVyxtQkFqQlEseUJBaUJNQyxTQWpCTixFQWlCaUI7QUFBQTs7QUFDdkIvQixxQkFBYWdDLE9BQWIsQ0FBcUI7QUFDbkJULG9CQUFVLEtBQUtSLFNBQUwsQ0FBZVMsRUFETjtBQUVuQlMsbUJBQVMsS0FBS3BCLGFBRks7QUFHbkJxQiwwQkFBZ0JIO0FBSEcsU0FBckIsRUFJR0wsSUFKSCxDQUlRLGVBQU87QUFDYixjQUFJQyxJQUFJakIsSUFBSixDQUFTa0IsT0FBYixFQUFzQjtBQUNwQixpQ0FBUSxNQUFSO0FBQ0EsbUJBQUtDLFdBQUw7QUFDQSxtQkFBS2xCLE9BQUwsR0FBZSxLQUFmO0FBQ0EsbUJBQUtRLE1BQUw7QUFDRDtBQUNGLFNBWEQ7QUFZRCxPQTlCTztBQStCUmdCLFlBL0JRLG9CQStCQztBQUNQLGFBQUt4QixPQUFMLEdBQWUsS0FBZjtBQUNBLGFBQUtRLE1BQUw7QUFDRCxPQWxDTztBQW1DUmlCLFlBbkNRLGtCQW1DREMsWUFuQ0MsRUFtQ2FiLEVBbkNiLEVBbUNpQjtBQUN2QixhQUFLYixPQUFMLEdBQWUwQixZQUFmO0FBQ0EsYUFBS3hCLGFBQUwsR0FBcUJXLEVBQXJCO0FBQ0EsYUFBS0wsTUFBTDtBQUNELE9BdkNPO0FBd0NSbUIsVUF4Q1EsZ0JBd0NIQyxLQXhDRyxFQXdDSTtBQUFBOztBQUNWdkMscUJBQWF3QyxZQUFiLENBQTBCO0FBQ3hCakIsb0JBQVUsS0FBS1IsU0FBTCxDQUFlUyxFQUREO0FBRXhCaUIsb0JBQVVGO0FBRmMsU0FBMUIsRUFHR2IsSUFISCxDQUdRLGVBQU87QUFDYixjQUFJZCxPQUFPZSxJQUFJakIsSUFBSixDQUFTRSxJQUFwQjtBQUNBLGNBQUlBLEtBQUs4QixNQUFULEVBQWlCO0FBQ2YsbUJBQUsxQixXQUFMLEdBQW1CSixJQUFuQjtBQUNBLG1CQUFLTyxNQUFMO0FBQ0Q7QUFDRixTQVREO0FBVUQ7QUFuRE8sSzs7Ozs7NkJBZEQ7QUFDUCxXQUFLSixTQUFMLEdBQWlCNEIsR0FBR0MsY0FBSCxDQUFrQixXQUFsQixDQUFqQjtBQUNBLFdBQUs5QixVQUFMLEdBQWtCNkIsR0FBR0MsY0FBSCxDQUFrQixZQUFsQixDQUFsQjtBQUNBLFdBQUtmLFdBQUw7QUFDQSxXQUFLVixNQUFMO0FBQ0Q7OztrQ0FDYTtBQUFBOztBQUNabkIsbUJBQWE2QyxRQUFiLENBQXNCO0FBQ3BCdEIsa0JBQVUsS0FBS1IsU0FBTCxDQUFlUztBQURMLE9BQXRCLEVBRUdFLElBRkgsQ0FFUSxlQUFPO0FBQ2IsZUFBS2QsSUFBTCxHQUFZZSxJQUFJakIsSUFBSixDQUFTRSxJQUFyQjtBQUNBLGVBQUtPLE1BQUw7QUFDRCxPQUxEO0FBTUQ7Ozs7RUFoQzJDMkIsZUFBS0MsSTs7a0JBQTlCOUMsZ0IiLCJmaWxlIjoiYXV0aG9yaXplLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCB7IHNob3dNc2cgfSBmcm9tICcuLi91dGlscy9jb21tb24nXHJcbmltcG9ydCBNb2RhbCBmcm9tICcuLi9jb21wb25lbnRzL21vZGFsJ1xyXG5pbXBvcnQgU2VhcmNoIGZyb20gJy4uL2NvbXBvbmVudHMvc2VhcmNoUmVzdWx0J1xyXG5pbXBvcnQgKiBhcyBhdXRob3JpemVSZXEgZnJvbSAnLi4vYXBpL2F1dGhvcml6ZSdcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgYmluZFJlbGF0aW9uc2hpcCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WutuWnlOS8mueuoeeQhidcclxuICB9XHJcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIk1vZGFsXCI6e1wic3VyZUJ0blRleHRcIjpcIuehruiupOa3u+WKoFwiLFwiY2FuY2VsQnRuVGV4dFwiOlwi5Y+W5raIXCIsXCJwbGFjZWhvbGRlclRleHRcIjpcIuivt+i+k+WFpeWnk+WQjVwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpmbGFnLnN5bmNcIjpcInNob3dBZGRcIixcInhtbG5zOnYtb25cIjpcIlwifSxcIlNlYXJjaFwiOntcInhtbG5zOnYtb25cIjpcIlwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpmbGFnLnN5bmNcIjpcInNob3dBZGRcIixcInYtYmluZDpzdHVkZW50TGlzdC5zeW5jXCI6XCJzdHVkZW50TGlzdFwifX07XHJcbiRldmVudHMgPSB7XCJNb2RhbFwiOntcInYtb246Y2FuY2VsXCI6XCJjYW5jZWxcIixcInYtb246c3VyZVwiOlwic3VyZVwifSxcIlNlYXJjaFwiOntcInYtb246Y2xvc2VNb2RhbFwiOlwiY2xvc2VTZWFyY2hcIixcInYtb246c3VyZVwiOlwic3VyZVwiLFwidi1vbjpzZWxlY3RTdHVkZW50XCI6XCJzZWxlY3RTdHVkZW50XCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICBNb2RhbCxcclxuICAgIFNlYXJjaFxyXG4gIH1cclxuICBkYXRhID0ge1xyXG4gICAgc2hvd0FkZDogZmFsc2UsXHJcbiAgICBsaXN0OiBbXSxcclxuICAgIGN1cnJlbnRSb2xlSWQ6IC0xLFxyXG4gICAgbWVtYmVySW5mbzogbnVsbCxcclxuICAgIGNsYXNzSW5mbzoge30sXHJcbiAgICBzdHVkZW50TGlzdDogW11cclxuICB9XHJcbiAgb25Mb2FkKCkge1xyXG4gICAgdGhpcy5jbGFzc0luZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnY2xhc3NJbmZvJylcclxuICAgIHRoaXMubWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcclxuICAgIHRoaXMuZ2V0QXV0aExpc3QoKVxyXG4gICAgdGhpcy4kYXBwbHkoKVxyXG4gIH1cclxuICBnZXRBdXRoTGlzdCgpIHtcclxuICAgIGF1dGhvcml6ZVJlcS5hdXRoTGlzdCh7XHJcbiAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZFxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICB0aGlzLmxpc3QgPSByZXMuZGF0YS5saXN0XHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0pXHJcbiAgfVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBjbG9zZVNlYXJjaCgpIHtcclxuICAgICAgdGhpcy5zaG93QWRkID0gZmFsc2VcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSxcclxuICAgIGRlbChhdXRoSWQpIHtcclxuICAgICAgYXV0aG9yaXplUmVxLmRlbGV0ZUF1dGgoe1xyXG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcclxuICAgICAgICBjbGFzc19hdXRoX2lkOiBhdXRoSWRcclxuICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICBzaG93TXNnKCfliKDpmaTmiJDlip8nKVxyXG4gICAgICAgICAgdGhpcy5nZXRBdXRoTGlzdCgpXHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIHNlbGVjdFN0dWRlbnQoc3R1ZGVudElkKSB7XHJcbiAgICAgIGF1dGhvcml6ZVJlcS5hZGRBdXRoKHtcclxuICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXHJcbiAgICAgICAgcm9sZV9pZDogdGhpcy5jdXJyZW50Um9sZUlkLFxyXG4gICAgICAgIGpvaW5fbWVtYmVyX2lkOiBzdHVkZW50SWRcclxuICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICBzaG93TXNnKCfmt7vliqDmiJDlip8nKVxyXG4gICAgICAgICAgdGhpcy5nZXRBdXRoTGlzdCgpXHJcbiAgICAgICAgICB0aGlzLnNob3dBZGQgPSBmYWxzZVxyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBjYW5jZWwoKSB7XHJcbiAgICAgIHRoaXMuc2hvd0FkZCA9IGZhbHNlXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0sXHJcbiAgICBhZGROZXcoYm9vbGVhblZhbHVlLCBpZCkge1xyXG4gICAgICB0aGlzLnNob3dBZGQgPSBib29sZWFuVmFsdWVcclxuICAgICAgdGhpcy5jdXJyZW50Um9sZUlkID0gaWRcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSxcclxuICAgIHN1cmUodmFsdWUpIHtcclxuICAgICAgYXV0aG9yaXplUmVxLnNlYXJjaE1lbWJlcih7XHJcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxyXG4gICAgICAgIGtleXdvcmRzOiB2YWx1ZVxyXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgbGV0IGxpc3QgPSByZXMuZGF0YS5saXN0XHJcbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICB0aGlzLnN0dWRlbnRMaXN0ID0gbGlzdFxyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19