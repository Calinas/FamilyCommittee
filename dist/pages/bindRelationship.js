'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _user = require('./../api/user.js');

var _createClass2 = require('./../api/createClass.js');

var _common = require('./../utils/common.js');

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
      navigationBarTitleText: '身份绑定'
    }, _this.data = {
      relationship: [],
      parentIndex: 0,
      isTeacher: false,
      teacherName: '',
      canSubmit: false,
      studentName: '',
      list: [],
      memberInfo: null,
      classInfo: null,
      classId: -1,
      joinClassId: 0,
      classIdentityList: [],
      type: ''
    }, _this.watch = {
      studentName: function studentName(newValue, oldValue) {
        this.canSubmit = !(0, _common.isEmptyString)(newValue);
      }
    }, _this.methods = {
      delete: function _delete(idx) {
        this.list.splice(idx, 1);
        this.$apply();
      },
      addNew: function addNew() {
        var item = {
          relationship: this.relationship,
          value: '',
          activeIndex: 0
        };
        this.list.push(item);
        this.$apply();
      },
      bindForm: function bindForm(e) {
        var target = e.currentTarget;
        var idx = target.dataset.idx;
        this.list[idx][target.id] = e.detail.value;
        this.$apply();
      },
      selectTeacher: function selectTeacher() {
        this.isTeacher = !this.isTeacher;
        this.$apply();
      },
      submit: function submit() {
        if (!this.checkData()) {
          (0, _common.showMsg)('请填写您孩子姓名');
          return;
        }
        var filterList = this.list.map(function (item) {
          return {
            identity_id: item.relationship[item.activeIndex].id,
            student_name: item.value
          };
        });
        if (this.type) {
          // 如果是直接修改身份绑定
          filterList = this.list.map(function (item) {
            return {
              identity_id: item.relationship[item.activeIndex].id,
              student_name: item.value,
              member_identity_id: item.id
            };
          });
          this.joinClassCallback(this.classInfo.id, filterList);
        } else if (!this.joinClassId) {
          // 如果是创建班级得
          var createClassData = this.$parent.globalData.createClass;
          var data = {
            school_id: createClassData.school_id,
            grade_type: createClassData.grade,
            year_class: createClassData.year,
            class: createClassData.class
          };
          this.addClassCallback(data, filterList);
        } else {
          // 如果是加入班级
          this.joinClassId && this.joinClassCallback(this.joinClassId, filterList);
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(bindRelationship, [{
    key: 'onLoad',
    value: function onLoad(e) {
      this.memberInfo = wx.getStorageSync('memberInfo');
      this.classInfo = wx.getStorageSync('classInfo');
      this.joinClassId = e.id;
      this.type = e.type;
      this.getRelationShip();
      this.$apply();
    }
  }, {
    key: 'addClassCallback',
    value: function addClassCallback(data, filterList) {
      var _this2 = this;

      (0, _createClass2.addClass)(Object.assign({}, data, {
        item: filterList
      })).then(function (res) {
        _this2.commonFn(res);
      });
    }
  }, {
    key: 'joinClassCallback',
    value: function joinClassCallback(id, filterList) {
      var _this3 = this;

      (0, _user.bindIdentity)({
        class_id: id,
        item: filterList
      }).then(function (res) {
        _this3.commonFn(res);
      });
    }
  }, {
    key: 'commonFn',
    value: function commonFn(res) {
      if (res.data.success) {
        (0, _common.showMsg)('班级创建成功');
        var data = res.data.data;
        var url = 'createClassSuccess?name=' + data.name + '&code=' + data.qr_code + '&key=' + data.join_key;
        this.$parent.globalData.classHasChange = true;
        setTimeout(function () {
          wx.navigateTo({
            url: url
          });
        }, 1000);
      }
    }
  }, {
    key: 'getClassIdentity',
    value: function getClassIdentity() {
      var _this4 = this;

      (0, _user.identityList)({
        class_id: this.classInfo.id
      }).then(function (res) {
        _this4.list = res.data.list.map(function (item) {
          return {
            relationship: _this4.relationship,
            value: item.student.name,
            activeIndex: item.identity.id - 1,
            id: item.id
          };
        });
        _this4.$apply();
      });
    }
  }, {
    key: 'checkCanSubmit',
    value: function checkCanSubmit() {
      if (this.isTeacher && (0, _common.isEmptyString)(this.teacherName)) {
        (0, _common.showMsg)('如果您勾选了老师身份，请填写您的姓名');
        return false;
      }
      return true;
    }
  }, {
    key: 'checkData',
    value: function checkData() {
      var canSubmit = true;
      for (var i = 0, len = this.list.length; i < len; i++) {
        if ((0, _common.isEmptyString)(this.list[i].value)) {
          canSubmit = false;
          break;
        } else {
          canSubmit = true;
        }
      }
      return canSubmit;
    }
  }, {
    key: 'getRelationShip',
    value: function getRelationShip() {
      var _this5 = this;

      (0, _user.getIdentityList)().then(function (res) {
        _this5.relationship = res.data.list;
        var item = {
          relationship: _this5.relationship,
          value: '',
          activeIndex: 0
        };
        _this5.list.push(item);
        _this5.type && _this5.getClassIdentity();
        _this5.$apply();
      });
    }
  }]);

  return bindRelationship;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(bindRelationship , 'pages/bindRelationship'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJpbmRSZWxhdGlvbnNoaXAuanMiXSwibmFtZXMiOlsiYmluZFJlbGF0aW9uc2hpcCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwicmVsYXRpb25zaGlwIiwicGFyZW50SW5kZXgiLCJpc1RlYWNoZXIiLCJ0ZWFjaGVyTmFtZSIsImNhblN1Ym1pdCIsInN0dWRlbnROYW1lIiwibGlzdCIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJjbGFzc0lkIiwiam9pbkNsYXNzSWQiLCJjbGFzc0lkZW50aXR5TGlzdCIsInR5cGUiLCJ3YXRjaCIsIm5ld1ZhbHVlIiwib2xkVmFsdWUiLCJtZXRob2RzIiwiZGVsZXRlIiwiaWR4Iiwic3BsaWNlIiwiJGFwcGx5IiwiYWRkTmV3IiwiaXRlbSIsInZhbHVlIiwiYWN0aXZlSW5kZXgiLCJwdXNoIiwiYmluZEZvcm0iLCJlIiwidGFyZ2V0IiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJpZCIsImRldGFpbCIsInNlbGVjdFRlYWNoZXIiLCJzdWJtaXQiLCJjaGVja0RhdGEiLCJmaWx0ZXJMaXN0IiwibWFwIiwiaWRlbnRpdHlfaWQiLCJzdHVkZW50X25hbWUiLCJtZW1iZXJfaWRlbnRpdHlfaWQiLCJqb2luQ2xhc3NDYWxsYmFjayIsImNyZWF0ZUNsYXNzRGF0YSIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiY3JlYXRlQ2xhc3MiLCJzY2hvb2xfaWQiLCJncmFkZV90eXBlIiwiZ3JhZGUiLCJ5ZWFyX2NsYXNzIiwieWVhciIsImNsYXNzIiwiYWRkQ2xhc3NDYWxsYmFjayIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJnZXRSZWxhdGlvblNoaXAiLCJPYmplY3QiLCJhc3NpZ24iLCJ0aGVuIiwiY29tbW9uRm4iLCJyZXMiLCJjbGFzc19pZCIsInN1Y2Nlc3MiLCJ1cmwiLCJuYW1lIiwicXJfY29kZSIsImpvaW5fa2V5IiwiY2xhc3NIYXNDaGFuZ2UiLCJzZXRUaW1lb3V0IiwibmF2aWdhdGVUbyIsInN0dWRlbnQiLCJpZGVudGl0eSIsImkiLCJsZW4iLCJsZW5ndGgiLCJnZXRDbGFzc0lkZW50aXR5Iiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7SUFDcUJBLGdCOzs7Ozs7Ozs7Ozs7OzswTUFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsb0JBQWMsRUFEVDtBQUVMQyxtQkFBYSxDQUZSO0FBR0xDLGlCQUFXLEtBSE47QUFJTEMsbUJBQWEsRUFKUjtBQUtMQyxpQkFBVyxLQUxOO0FBTUxDLG1CQUFhLEVBTlI7QUFPTEMsWUFBTSxFQVBEO0FBUUxDLGtCQUFZLElBUlA7QUFTTEMsaUJBQVcsSUFUTjtBQVVMQyxlQUFTLENBQUMsQ0FWTDtBQVdMQyxtQkFBYSxDQVhSO0FBWUxDLHlCQUFtQixFQVpkO0FBYUxDLFlBQU07QUFiRCxLLFFBZVBDLEssR0FBUTtBQUNOUixpQkFETSx1QkFDT1MsUUFEUCxFQUNpQkMsUUFEakIsRUFDMkI7QUFDL0IsYUFBS1gsU0FBTCxHQUFpQixDQUFDLDJCQUFjVSxRQUFkLENBQWxCO0FBQ0Q7QUFISyxLLFFBd0RSRSxPLEdBQVU7QUFDUkMsWUFEUSxtQkFDREMsR0FEQyxFQUNJO0FBQ1YsYUFBS1osSUFBTCxDQUFVYSxNQUFWLENBQWlCRCxHQUFqQixFQUFzQixDQUF0QjtBQUNBLGFBQUtFLE1BQUw7QUFDRCxPQUpPO0FBS1JDLFlBTFEsb0JBS0M7QUFDUCxZQUFNQyxPQUFPO0FBQ1h0Qix3QkFBYyxLQUFLQSxZQURSO0FBRVh1QixpQkFBTyxFQUZJO0FBR1hDLHVCQUFhO0FBSEYsU0FBYjtBQUtBLGFBQUtsQixJQUFMLENBQVVtQixJQUFWLENBQWVILElBQWY7QUFDQSxhQUFLRixNQUFMO0FBQ0QsT0FiTztBQWNSTSxjQWRRLG9CQWNDQyxDQWRELEVBY0k7QUFDVixZQUFNQyxTQUFTRCxFQUFFRSxhQUFqQjtBQUNBLFlBQU1YLE1BQU1V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QVVrRSxDQUFWLEVBQWFqRCxLQUEzQixDQUFKLEVBQXVDO0FBQ3JDbkIsc0JBQVksS0FBWjtBQUNBO0FBQ0QsU0FIRCxNQUdPO0FBQ0xBLHNCQUFZLElBQVo7QUFDRDtBQUNGO0FBQ0QsYUFBT0EsU0FBUDtBQUNEOzs7c0NBQ2lCO0FBQUE7O0FBQ2hCLG1DQUFrQnNELElBQWxCLENBQXVCLGVBQU87QUFDNUIsZUFBSzFELFlBQUwsR0FBb0I0RCxJQUFJN0QsSUFBSixDQUFTTyxJQUE3QjtBQUNBLFlBQU1nQixPQUFPO0FBQ1h0Qix3QkFBYyxPQUFLQSxZQURSO0FBRVh1QixpQkFBTyxFQUZJO0FBR1hDLHVCQUFhO0FBSEYsU0FBYjtBQUtBLGVBQUtsQixJQUFMLENBQVVtQixJQUFWLENBQWVILElBQWY7QUFDQSxlQUFLVixJQUFMLElBQWEsT0FBSytELGdCQUFMLEVBQWI7QUFDQSxlQUFLdkQsTUFBTDtBQUNELE9BVkQ7QUFXRDs7OztFQXBLMkN3RCxlQUFLQyxJOztrQkFBOUJqRixnQiIsImZpbGUiOiJiaW5kUmVsYXRpb25zaGlwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCB7IGdldElkZW50aXR5TGlzdCwgYmluZElkZW50aXR5LCBpZGVudGl0eUxpc3QgfSBmcm9tICcuLi9hcGkvdXNlcidcclxuaW1wb3J0IHsgYWRkQ2xhc3MgfSBmcm9tICcuLi9hcGkvY3JlYXRlQ2xhc3MnXHJcbmltcG9ydCB7IHNob3dNc2csIGlzRW1wdHlTdHJpbmcgfSBmcm9tICcuLi91dGlscy9jb21tb24nXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGJpbmRSZWxhdGlvbnNoaXAgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfouqvku73nu5HlrponXHJcbiAgfVxyXG4gIGRhdGEgPSB7XHJcbiAgICByZWxhdGlvbnNoaXA6IFtdLFxyXG4gICAgcGFyZW50SW5kZXg6IDAsXHJcbiAgICBpc1RlYWNoZXI6IGZhbHNlLFxyXG4gICAgdGVhY2hlck5hbWU6ICcnLFxyXG4gICAgY2FuU3VibWl0OiBmYWxzZSxcclxuICAgIHN0dWRlbnROYW1lOiAnJyxcclxuICAgIGxpc3Q6IFtdLFxyXG4gICAgbWVtYmVySW5mbzogbnVsbCxcclxuICAgIGNsYXNzSW5mbzogbnVsbCxcclxuICAgIGNsYXNzSWQ6IC0xLFxyXG4gICAgam9pbkNsYXNzSWQ6IDAsXHJcbiAgICBjbGFzc0lkZW50aXR5TGlzdDogW10sXHJcbiAgICB0eXBlOiAnJ1xyXG4gIH1cclxuICB3YXRjaCA9IHtcclxuICAgIHN0dWRlbnROYW1lIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcclxuICAgICAgdGhpcy5jYW5TdWJtaXQgPSAhaXNFbXB0eVN0cmluZyhuZXdWYWx1ZSlcclxuICAgIH1cclxuICB9XHJcbiAgb25Mb2FkKGUpIHtcclxuICAgIHRoaXMubWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcclxuICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXHJcbiAgICB0aGlzLmpvaW5DbGFzc0lkID0gZS5pZFxyXG4gICAgdGhpcy50eXBlID0gZS50eXBlXHJcbiAgICB0aGlzLmdldFJlbGF0aW9uU2hpcCgpXHJcbiAgICB0aGlzLiRhcHBseSgpXHJcbiAgfVxyXG4gIGFkZENsYXNzQ2FsbGJhY2soZGF0YSwgZmlsdGVyTGlzdCkge1xyXG4gICAgYWRkQ2xhc3MoT2JqZWN0LmFzc2lnbih7fSwgZGF0YSwge1xyXG4gICAgICBpdGVtOiBmaWx0ZXJMaXN0XHJcbiAgICB9KSkudGhlbihyZXMgPT4ge1xyXG4gICAgICB0aGlzLmNvbW1vbkZuKHJlcylcclxuICAgIH0pXHJcbiAgfVxyXG4gIGpvaW5DbGFzc0NhbGxiYWNrKGlkLCBmaWx0ZXJMaXN0KSB7XHJcbiAgICBiaW5kSWRlbnRpdHkoe1xyXG4gICAgICBjbGFzc19pZDogaWQsXHJcbiAgICAgIGl0ZW06IGZpbHRlckxpc3RcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgdGhpcy5jb21tb25GbihyZXMpXHJcbiAgICB9KVxyXG4gIH1cclxuICBjb21tb25GbihyZXMpIHtcclxuICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgIHNob3dNc2coJ+ePree6p+WIm+W7uuaIkOWKnycpXHJcbiAgICAgIGxldCBkYXRhID0gcmVzLmRhdGEuZGF0YVxyXG4gICAgICBsZXQgdXJsID0gYGNyZWF0ZUNsYXNzU3VjY2Vzcz9uYW1lPSR7ZGF0YS5uYW1lfSZjb2RlPSR7ZGF0YS5xcl9jb2RlfSZrZXk9JHtkYXRhLmpvaW5fa2V5fWBcclxuICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuY2xhc3NIYXNDaGFuZ2UgPSB0cnVlXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgdXJsOiB1cmxcclxuICAgICAgICB9KVxyXG4gICAgICB9LCAxMDAwKVxyXG4gICAgfVxyXG4gIH1cclxuICBnZXRDbGFzc0lkZW50aXR5KCkge1xyXG4gICAgaWRlbnRpdHlMaXN0KHtcclxuICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHRoaXMubGlzdCA9IHJlcy5kYXRhLmxpc3QubWFwKGl0ZW0gPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICByZWxhdGlvbnNoaXA6IHRoaXMucmVsYXRpb25zaGlwLFxyXG4gICAgICAgICAgdmFsdWU6IGl0ZW0uc3R1ZGVudC5uYW1lLFxyXG4gICAgICAgICAgYWN0aXZlSW5kZXg6IGl0ZW0uaWRlbnRpdHkuaWQgLSAxLFxyXG4gICAgICAgICAgaWQ6IGl0ZW0uaWRcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0pXHJcbiAgfVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBkZWxldGUoaWR4KSB7XHJcbiAgICAgIHRoaXMubGlzdC5zcGxpY2UoaWR4LCAxKVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9LFxyXG4gICAgYWRkTmV3KCkge1xyXG4gICAgICBjb25zdCBpdGVtID0ge1xyXG4gICAgICAgIHJlbGF0aW9uc2hpcDogdGhpcy5yZWxhdGlvbnNoaXAsXHJcbiAgICAgICAgdmFsdWU6ICcnLFxyXG4gICAgICAgIGFjdGl2ZUluZGV4OiAwXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5saXN0LnB1c2goaXRlbSlcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSxcclxuICAgIGJpbmRGb3JtKGUpIHtcclxuICAgICAgY29uc3QgdGFyZ2V0ID0gZS5jdXJyZW50VGFyZ2V0XHJcbiAgICAgIGNvbnN0IGlkeCA9IHRhcmdldC5kYXRhc2V0LmlkeFxyXG4gICAgICB0aGlzLmxpc3RbaWR4XVt0YXJnZXQuaWRdID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSxcclxuICAgIHNlbGVjdFRlYWNoZXIoKSB7XHJcbiAgICAgIHRoaXMuaXNUZWFjaGVyID0gIXRoaXMuaXNUZWFjaGVyXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0sXHJcbiAgICBzdWJtaXQoKSB7XHJcbiAgICAgIGlmICghdGhpcy5jaGVja0RhdGEoKSkge1xyXG4gICAgICAgIHNob3dNc2coJ+ivt+Whq+WGmeaCqOWtqeWtkOWnk+WQjScpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgbGV0IGZpbHRlckxpc3QgPSB0aGlzLmxpc3QubWFwKGl0ZW0gPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBpZGVudGl0eV9pZDogaXRlbS5yZWxhdGlvbnNoaXBbaXRlbS5hY3RpdmVJbmRleF0uaWQsXHJcbiAgICAgICAgICBzdHVkZW50X25hbWU6IGl0ZW0udmFsdWVcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIGlmICh0aGlzLnR5cGUpIHsgLy8g5aaC5p6c5piv55u05o6l5L+u5pS56Lqr5Lu957uR5a6aXHJcbiAgICAgICAgZmlsdGVyTGlzdCA9IHRoaXMubGlzdC5tYXAoaXRlbSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpZGVudGl0eV9pZDogaXRlbS5yZWxhdGlvbnNoaXBbaXRlbS5hY3RpdmVJbmRleF0uaWQsXHJcbiAgICAgICAgICAgIHN0dWRlbnRfbmFtZTogaXRlbS52YWx1ZSxcclxuICAgICAgICAgICAgbWVtYmVyX2lkZW50aXR5X2lkOiBpdGVtLmlkXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLmpvaW5DbGFzc0NhbGxiYWNrKHRoaXMuY2xhc3NJbmZvLmlkLCBmaWx0ZXJMaXN0KVxyXG4gICAgICB9IGVsc2UgaWYgKCF0aGlzLmpvaW5DbGFzc0lkKSB7IC8vIOWmguaenOaYr+WIm+W7uuePree6p+W+l1xyXG4gICAgICAgIGxldCBjcmVhdGVDbGFzc0RhdGEgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5jcmVhdGVDbGFzc1xyXG4gICAgICAgIGxldCBkYXRhID0ge1xyXG4gICAgICAgICAgc2Nob29sX2lkOiBjcmVhdGVDbGFzc0RhdGEuc2Nob29sX2lkLFxyXG4gICAgICAgICAgZ3JhZGVfdHlwZTogY3JlYXRlQ2xhc3NEYXRhLmdyYWRlLFxyXG4gICAgICAgICAgeWVhcl9jbGFzczogY3JlYXRlQ2xhc3NEYXRhLnllYXIsXHJcbiAgICAgICAgICBjbGFzczogY3JlYXRlQ2xhc3NEYXRhLmNsYXNzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWRkQ2xhc3NDYWxsYmFjayhkYXRhLCBmaWx0ZXJMaXN0KVxyXG4gICAgICB9IGVsc2UgeyAvLyDlpoLmnpzmmK/liqDlhaXnj63nuqdcclxuICAgICAgICB0aGlzLmpvaW5DbGFzc0lkICYmIHRoaXMuam9pbkNsYXNzQ2FsbGJhY2sodGhpcy5qb2luQ2xhc3NJZCwgZmlsdGVyTGlzdClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBjaGVja0NhblN1Ym1pdCgpIHtcclxuICAgIGlmICh0aGlzLmlzVGVhY2hlciAmJiBpc0VtcHR5U3RyaW5nKHRoaXMudGVhY2hlck5hbWUpKSB7XHJcbiAgICAgIHNob3dNc2coJ+WmguaenOaCqOWLvumAieS6huiAgeW4iOi6q+S7ve+8jOivt+Whq+WGmeaCqOeahOWnk+WQjScpXHJcbiAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWVcclxuICB9XHJcbiAgY2hlY2tEYXRhKCkge1xyXG4gICAgbGV0IGNhblN1Ym1pdCA9IHRydWVcclxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLmxpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgaWYgKGlzRW1wdHlTdHJpbmcodGhpcy5saXN0W2ldLnZhbHVlKSkge1xyXG4gICAgICAgIGNhblN1Ym1pdCA9IGZhbHNlXHJcbiAgICAgICAgYnJlYWtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjYW5TdWJtaXQgPSB0cnVlXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjYW5TdWJtaXRcclxuICB9XHJcbiAgZ2V0UmVsYXRpb25TaGlwKCkge1xyXG4gICAgZ2V0SWRlbnRpdHlMaXN0KCkudGhlbihyZXMgPT4ge1xyXG4gICAgICB0aGlzLnJlbGF0aW9uc2hpcCA9IHJlcy5kYXRhLmxpc3RcclxuICAgICAgY29uc3QgaXRlbSA9IHtcclxuICAgICAgICByZWxhdGlvbnNoaXA6IHRoaXMucmVsYXRpb25zaGlwLFxyXG4gICAgICAgIHZhbHVlOiAnJyxcclxuICAgICAgICBhY3RpdmVJbmRleDogMFxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubGlzdC5wdXNoKGl0ZW0pXHJcbiAgICAgIHRoaXMudHlwZSAmJiB0aGlzLmdldENsYXNzSWRlbnRpdHkoKVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG4iXX0=