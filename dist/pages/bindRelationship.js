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
      canSubmit: false,
      studentName: '',
      teacherName: '',
      list: [],
      memberInfo: null,
      classInfo: null,
      classId: -1,
      joinClassId: 0,
      classIdentityList: [],
      type: 'create',
      key: '',
      currentType: 'parents',
      relationshipTypes: [{
        checked: true,
        label: '我是家长',
        value: 'parents'
      }, {
        checked: false,
        label: '我是教师',
        value: 'teacher'
      }]
    }, _this.watch = {
      studentName: function studentName(newValue, oldValue) {
        this.canSubmit = !(0, _common.isEmptyString)(newValue);
      }
    }, _this.methods = {
      pickerChange: function pickerChange(e) {
        this[e.currentTarget.id] = e.detail.value;
        this.$apply();
      },
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
      submit: function submit() {
        if (this.currentType === 'parents' && !this.checkData()) {
          (0, _common.showMsg)('请填写您孩子姓名');
          return;
        }
        this.checkCanSubmit();
        var filterList = this.list.map(function (item) {
          return {
            identity_id: item.relationship[item.activeIndex].id,
            student_name: item.value
          };
        });
        if (this.type === 'edit' && this.currentType === 'parents') {
          // 如果是直接修改身份绑定
          filterList = this.list.map(function (item) {
            return {
              identity_id: item.relationship[item.activeIndex].id,
              student_name: item.value,
              member_identity_id: item.id
            };
          });
          this.joinClassCallback(this.classInfo.id, filterList);
        } else if (this.type === 'edit' && this.currentType === 'teacher') {
          // 如果是直接修改身份绑定
          this.teacherCallback();
        } else if (this.type === 'create') {
          // 如果是创建班级得
          var createClassData = this.$parent.globalData.createClass;
          var data = {
            school_id: createClassData.school_id,
            grade_type: createClassData.grade,
            year_class: createClassData.year,
            class: createClassData.class
          };
          this.addClassCallback(data, filterList);
        } else if (this.type === 'join' && this.currentType === 'parents') {
          // 如果是加入班级
          this.joinClassCallback(this.joinClassId, filterList);
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(bindRelationship, [{
    key: 'onLoad',
    value: function onLoad(e) {
      this.memberInfo = wx.getStorageSync('memberInfo');
      this.classInfo = wx.getStorageSync('classInfo');
      this.joinClassId = Number(e.id);
      this.key = e.key;
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
      (0, _user.bindIdentity)({
        class_id: id,
        item: filterList
      }).then(function (res) {
        if (res.data.success) {
          (0, _common.showMsg)('成功绑定身份');
          setTimeout(function () {
            wx.switchTab({ url: 'zone' });
          }, 2000);
        }
      });
    }
  }, {
    key: 'teacherCallback',
    value: function teacherCallback() {
      (0, _user.bindTeacher)({
        class_id: this.classInfo.id,
        name: this.teacherName
      }).then(function (res) {
        if (res.data.success) {
          wx.switchTab({ url: 'zone' });
        }
      });
    }
  }, {
    key: 'commonFn',
    value: function commonFn(res) {
      if (res.data.success) {
        (0, _common.showMsg)('班级创建成功');
        var data = res.data.data;
        var url = 'createClassSuccess?name=' + data.name + '&code=' + data.qr_code + '&key=' + data.join_key + '&classId=' + data.id;
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
      var _this3 = this;

      (0, _user.identityList)({
        class_id: this.classInfo.id
      }).then(function (res) {
        var list = res.data.list;
        var teacherObj = list.filter(function (item) {
          return item.app_type === 'teacher';
        });
        var parentList = list.filter(function (item) {
          return item.app_type === 'student';
        });
        _this3.list = parentList.map(function (item) {
          return {
            relationship: _this3.relationship,
            value: item.student.name,
            activeIndex: item.identity.id - 1,
            id: item.id
          };
        });
        if (_this3.teacherObj.length) {
          _this3.teacherName = teacherObj[0].teacher.name;
        }
        _this3.$apply();
      });
    }
  }, {
    key: 'checkCanSubmit',
    value: function checkCanSubmit() {
      if (this.currentType === 'teacher' && (0, _common.isEmptyString)(this.teacherName)) {
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
      var _this4 = this;

      (0, _user.getIdentityList)().then(function (res) {
        _this4.relationship = res.data.list;
        var item = {
          relationship: _this4.relationship,
          value: '',
          activeIndex: 0
        };
        _this4.list.push(item);
        _this4.type === 'edit' && _this4.getClassIdentity();
        _this4.$apply();
      });
    }
  }]);

  return bindRelationship;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(bindRelationship , 'pages/bindRelationship'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJpbmRSZWxhdGlvbnNoaXAuanMiXSwibmFtZXMiOlsiYmluZFJlbGF0aW9uc2hpcCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwicmVsYXRpb25zaGlwIiwicGFyZW50SW5kZXgiLCJjYW5TdWJtaXQiLCJzdHVkZW50TmFtZSIsInRlYWNoZXJOYW1lIiwibGlzdCIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJjbGFzc0lkIiwiam9pbkNsYXNzSWQiLCJjbGFzc0lkZW50aXR5TGlzdCIsInR5cGUiLCJrZXkiLCJjdXJyZW50VHlwZSIsInJlbGF0aW9uc2hpcFR5cGVzIiwiY2hlY2tlZCIsImxhYmVsIiwidmFsdWUiLCJ3YXRjaCIsIm5ld1ZhbHVlIiwib2xkVmFsdWUiLCJtZXRob2RzIiwicGlja2VyQ2hhbmdlIiwiZSIsImN1cnJlbnRUYXJnZXQiLCJpZCIsImRldGFpbCIsIiRhcHBseSIsImRlbGV0ZSIsImlkeCIsInNwbGljZSIsImFkZE5ldyIsIml0ZW0iLCJhY3RpdmVJbmRleCIsInB1c2giLCJiaW5kRm9ybSIsInRhcmdldCIsImRhdGFzZXQiLCJzdWJtaXQiLCJjaGVja0RhdGEiLCJjaGVja0NhblN1Ym1pdCIsImZpbHRlckxpc3QiLCJtYXAiLCJpZGVudGl0eV9pZCIsInN0dWRlbnRfbmFtZSIsIm1lbWJlcl9pZGVudGl0eV9pZCIsImpvaW5DbGFzc0NhbGxiYWNrIiwidGVhY2hlckNhbGxiYWNrIiwiY3JlYXRlQ2xhc3NEYXRhIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJjcmVhdGVDbGFzcyIsInNjaG9vbF9pZCIsImdyYWRlX3R5cGUiLCJncmFkZSIsInllYXJfY2xhc3MiLCJ5ZWFyIiwiY2xhc3MiLCJhZGRDbGFzc0NhbGxiYWNrIiwid3giLCJnZXRTdG9yYWdlU3luYyIsIk51bWJlciIsImdldFJlbGF0aW9uU2hpcCIsIk9iamVjdCIsImFzc2lnbiIsInRoZW4iLCJjb21tb25GbiIsInJlcyIsImNsYXNzX2lkIiwic3VjY2VzcyIsInNldFRpbWVvdXQiLCJzd2l0Y2hUYWIiLCJ1cmwiLCJuYW1lIiwicXJfY29kZSIsImpvaW5fa2V5IiwiY2xhc3NIYXNDaGFuZ2UiLCJuYXZpZ2F0ZVRvIiwidGVhY2hlck9iaiIsImZpbHRlciIsImFwcF90eXBlIiwicGFyZW50TGlzdCIsInN0dWRlbnQiLCJpZGVudGl0eSIsImxlbmd0aCIsInRlYWNoZXIiLCJpIiwibGVuIiwiZ2V0Q2xhc3NJZGVudGl0eSIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBQ3FCQSxnQjs7Ozs7Ozs7Ozs7Ozs7ME1BQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLG9CQUFjLEVBRFQ7QUFFTEMsbUJBQWEsQ0FGUjtBQUdMQyxpQkFBVyxLQUhOO0FBSUxDLG1CQUFhLEVBSlI7QUFLTEMsbUJBQWEsRUFMUjtBQU1MQyxZQUFNLEVBTkQ7QUFPTEMsa0JBQVksSUFQUDtBQVFMQyxpQkFBVyxJQVJOO0FBU0xDLGVBQVMsQ0FBQyxDQVRMO0FBVUxDLG1CQUFhLENBVlI7QUFXTEMseUJBQW1CLEVBWGQ7QUFZTEMsWUFBTSxRQVpEO0FBYUxDLFdBQUssRUFiQTtBQWNMQyxtQkFBYSxTQWRSO0FBZUxDLHlCQUFtQixDQUNqQjtBQUNFQyxpQkFBUyxJQURYO0FBRUVDLGVBQU8sTUFGVDtBQUdFQyxlQUFPO0FBSFQsT0FEaUIsRUFNakI7QUFDRUYsaUJBQVMsS0FEWDtBQUVFQyxlQUFPLE1BRlQ7QUFHRUMsZUFBTztBQUhULE9BTmlCO0FBZmQsSyxRQTRCUEMsSyxHQUFRO0FBQ05mLGlCQURNLHVCQUNPZ0IsUUFEUCxFQUNpQkMsUUFEakIsRUFDMkI7QUFDL0IsYUFBS2xCLFNBQUwsR0FBaUIsQ0FBQywyQkFBY2lCLFFBQWQsQ0FBbEI7QUFDRDtBQUhLLEssUUE4RVJFLE8sR0FBVTtBQUNSQyxrQkFEUSx3QkFDS0MsQ0FETCxF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dCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IHsgZ2V0SWRlbnRpdHlMaXN0LCBiaW5kSWRlbnRpdHksIGlkZW50aXR5TGlzdCwgYmluZFRlYWNoZXIgfSBmcm9tICcuLi9hcGkvdXNlcidcclxuaW1wb3J0IHsgYWRkQ2xhc3MsIGpvaW5DbGFzcyB9IGZyb20gJy4uL2FwaS9jcmVhdGVDbGFzcydcclxuaW1wb3J0IHsgc2hvd01zZywgaXNFbXB0eVN0cmluZyB9IGZyb20gJy4uL3V0aWxzL2NvbW1vbidcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgYmluZFJlbGF0aW9uc2hpcCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+i6q+S7vee7keWumidcclxuICB9XHJcbiAgZGF0YSA9IHtcclxuICAgIHJlbGF0aW9uc2hpcDogW10sXHJcbiAgICBwYXJlbnRJbmRleDogMCxcclxuICAgIGNhblN1Ym1pdDogZmFsc2UsXHJcbiAgICBzdHVkZW50TmFtZTogJycsXHJcbiAgICB0ZWFjaGVyTmFtZTogJycsXHJcbiAgICBsaXN0OiBbXSxcclxuICAgIG1lbWJlckluZm86IG51bGwsXHJcbiAgICBjbGFzc0luZm86IG51bGwsXHJcbiAgICBjbGFzc0lkOiAtMSxcclxuICAgIGpvaW5DbGFzc0lkOiAwLFxyXG4gICAgY2xhc3NJZGVudGl0eUxpc3Q6IFtdLFxyXG4gICAgdHlwZTogJ2NyZWF0ZScsXHJcbiAgICBrZXk6ICcnLFxyXG4gICAgY3VycmVudFR5cGU6ICdwYXJlbnRzJyxcclxuICAgIHJlbGF0aW9uc2hpcFR5cGVzOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBjaGVja2VkOiB0cnVlLFxyXG4gICAgICAgIGxhYmVsOiAn5oiR5piv5a626ZW/JyxcclxuICAgICAgICB2YWx1ZTogJ3BhcmVudHMnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBjaGVja2VkOiBmYWxzZSxcclxuICAgICAgICBsYWJlbDogJ+aIkeaYr+aVmeW4iCcsXHJcbiAgICAgICAgdmFsdWU6ICd0ZWFjaGVyJ1xyXG4gICAgICB9XHJcbiAgICBdXHJcbiAgfVxyXG4gIHdhdGNoID0ge1xyXG4gICAgc3R1ZGVudE5hbWUgKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xyXG4gICAgICB0aGlzLmNhblN1Ym1pdCA9ICFpc0VtcHR5U3RyaW5nKG5ld1ZhbHVlKVxyXG4gICAgfVxyXG4gIH1cclxuICBvbkxvYWQoZSkge1xyXG4gICAgdGhpcy5tZW1iZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nKVxyXG4gICAgdGhpcy5jbGFzc0luZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnY2xhc3NJbmZvJylcclxuICAgIHRoaXMuam9pbkNsYXNzSWQgPSBOdW1iZXIoZS5pZClcclxuICAgIHRoaXMua2V5ID0gZS5rZXlcclxuICAgIHRoaXMudHlwZSA9IGUudHlwZVxyXG4gICAgdGhpcy5nZXRSZWxhdGlvblNoaXAoKVxyXG4gICAgdGhpcy4kYXBwbHkoKVxyXG4gIH1cclxuICBhZGRDbGFzc0NhbGxiYWNrKGRhdGEsIGZpbHRlckxpc3QpIHtcclxuICAgIGFkZENsYXNzKE9iamVjdC5hc3NpZ24oe30sIGRhdGEsIHtcclxuICAgICAgaXRlbTogZmlsdGVyTGlzdFxyXG4gICAgfSkpLnRoZW4ocmVzID0+IHtcclxuICAgICAgdGhpcy5jb21tb25GbihyZXMpXHJcbiAgICB9KVxyXG4gIH1cclxuICBqb2luQ2xhc3NDYWxsYmFjayhpZCwgZmlsdGVyTGlzdCkge1xyXG4gICAgYmluZElkZW50aXR5KHtcclxuICAgICAgY2xhc3NfaWQ6IGlkLFxyXG4gICAgICBpdGVtOiBmaWx0ZXJMaXN0XHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGlmKHJlcy5kYXRhLnN1Y2Nlc3Mpe1xyXG4gICAgICAgIHNob3dNc2coJ+aIkOWKn+e7keWumui6q+S7vScpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgd3guc3dpdGNoVGFiKHt1cmw6ICd6b25lJ30pXHJcbiAgICAgICAgfSwyMDAwKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuICB0ZWFjaGVyQ2FsbGJhY2soKSB7XHJcbiAgICBiaW5kVGVhY2hlcih7XHJcbiAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcclxuICAgICAgbmFtZTogdGhpcy50ZWFjaGVyTmFtZVxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICBpZihyZXMuZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgd3guc3dpdGNoVGFiKHt1cmw6ICd6b25lJ30pXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG4gIGNvbW1vbkZuKHJlcykge1xyXG4gICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgc2hvd01zZygn54+t57qn5Yib5bu65oiQ5YqfJylcclxuICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YS5kYXRhXHJcbiAgICAgIGxldCB1cmwgPSBgY3JlYXRlQ2xhc3NTdWNjZXNzP25hbWU9JHtkYXRhLm5hbWV9JmNvZGU9JHtkYXRhLnFyX2NvZGV9JmtleT0ke2RhdGEuam9pbl9rZXl9JmNsYXNzSWQ9JHtkYXRhLmlkfWBcclxuICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuY2xhc3NIYXNDaGFuZ2UgPSB0cnVlXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgdXJsOiB1cmxcclxuICAgICAgICB9KVxyXG4gICAgICB9LCAxMDAwKVxyXG4gICAgfVxyXG4gIH1cclxuICBnZXRDbGFzc0lkZW50aXR5KCkge1xyXG4gICAgaWRlbnRpdHlMaXN0KHtcclxuICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGNvbnN0IGxpc3QgPSByZXMuZGF0YS5saXN0XHJcbiAgICAgIGNvbnN0IHRlYWNoZXJPYmogPSBsaXN0LmZpbHRlcihpdGVtID0+IGl0ZW0uYXBwX3R5cGUgPT09ICd0ZWFjaGVyJylcclxuICAgICAgY29uc3QgcGFyZW50TGlzdCA9IGxpc3QuZmlsdGVyKGl0ZW0gPT4gaXRlbS5hcHBfdHlwZSA9PT0gJ3N0dWRlbnQnKVxyXG4gICAgICB0aGlzLmxpc3QgPSBwYXJlbnRMaXN0Lm1hcChpdGVtID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgcmVsYXRpb25zaGlwOiB0aGlzLnJlbGF0aW9uc2hpcCxcclxuICAgICAgICAgIHZhbHVlOiBpdGVtLnN0dWRlbnQubmFtZSxcclxuICAgICAgICAgIGFjdGl2ZUluZGV4OiBpdGVtLmlkZW50aXR5LmlkIC0gMSxcclxuICAgICAgICAgIGlkOiBpdGVtLmlkXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICBpZih0aGlzLnRlYWNoZXJPYmoubGVuZ3RoKSB7XHJcbiAgICAgICAgdGhpcy50ZWFjaGVyTmFtZSA9IHRlYWNoZXJPYmpbMF0udGVhY2hlci5uYW1lXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSlcclxuICB9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIHBpY2tlckNoYW5nZShlKSB7XHJcbiAgICAgIHRoaXNbZS5jdXJyZW50VGFyZ2V0LmlkXSA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0sXHJcbiAgICBkZWxldGUoaWR4KSB7XHJcbiAgICAgIHRoaXMubGlzdC5zcGxpY2UoaWR4LCAxKVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9LFxyXG4gICAgYWRkTmV3KCkge1xyXG4gICAgICBjb25zdCBpdGVtID0ge1xyXG4gICAgICAgIHJlbGF0aW9uc2hpcDogdGhpcy5yZWxhdGlvbnNoaXAsXHJcbiAgICAgICAgdmFsdWU6ICcnLFxyXG4gICAgICAgIGFjdGl2ZUluZGV4OiAwXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5saXN0LnB1c2goaXRlbSlcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSxcclxuICAgIGJpbmRGb3JtKGUpIHtcclxuICAgICAgY29uc3QgdGFyZ2V0ID0gZS5jdXJyZW50VGFyZ2V0XHJcbiAgICAgIGNvbnN0IGlkeCA9IHRhcmdldC5kYXRhc2V0LmlkeFxyXG4gICAgICB0aGlzLmxpc3RbaWR4XVt0YXJnZXQuaWRdID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSxcclxuICAgIHN1Ym1pdCgpIHtcclxuICAgICAgaWYgKHRoaXMuY3VycmVudFR5cGUgPT09ICdwYXJlbnRzJyAmJiAhdGhpcy5jaGVja0RhdGEoKSkge1xyXG4gICAgICAgIHNob3dNc2coJ+ivt+Whq+WGmeaCqOWtqeWtkOWnk+WQjScpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5jaGVja0NhblN1Ym1pdCgpXHJcbiAgICAgIGxldCBmaWx0ZXJMaXN0ID0gdGhpcy5saXN0Lm1hcChpdGVtID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgaWRlbnRpdHlfaWQ6IGl0ZW0ucmVsYXRpb25zaGlwW2l0ZW0uYWN0aXZlSW5kZXhdLmlkLFxyXG4gICAgICAgICAgc3R1ZGVudF9uYW1lOiBpdGVtLnZhbHVlXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICBpZiAodGhpcy50eXBlID09PSAnZWRpdCcgJiYgdGhpcy5jdXJyZW50VHlwZSA9PT0gJ3BhcmVudHMnKSB7IC8vIOWmguaenOaYr+ebtOaOpeS/ruaUuei6q+S7vee7keWumlxyXG4gICAgICAgIGZpbHRlckxpc3QgPSB0aGlzLmxpc3QubWFwKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaWRlbnRpdHlfaWQ6IGl0ZW0ucmVsYXRpb25zaGlwW2l0ZW0uYWN0aXZlSW5kZXhdLmlkLFxyXG4gICAgICAgICAgICBzdHVkZW50X25hbWU6IGl0ZW0udmFsdWUsXHJcbiAgICAgICAgICAgIG1lbWJlcl9pZGVudGl0eV9pZDogaXRlbS5pZFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5qb2luQ2xhc3NDYWxsYmFjayh0aGlzLmNsYXNzSW5mby5pZCwgZmlsdGVyTGlzdClcclxuICAgICAgfSBlbHNlIGlmKHRoaXMudHlwZSA9PT0gJ2VkaXQnICYmIHRoaXMuY3VycmVudFR5cGUgPT09ICd0ZWFjaGVyJykgey8vIOWmguaenOaYr+ebtOaOpeS/ruaUuei6q+S7vee7keWumlxyXG4gICAgICAgIHRoaXMudGVhY2hlckNhbGxiYWNrKClcclxuICAgICAgfSBlbHNlIGlmICggdGhpcy50eXBlID09PSAnY3JlYXRlJykgeyAvLyDlpoLmnpzmmK/liJvlu7rnj63nuqflvpdcclxuICAgICAgICBsZXQgY3JlYXRlQ2xhc3NEYXRhID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuY3JlYXRlQ2xhc3NcclxuICAgICAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgICAgIHNjaG9vbF9pZDogY3JlYXRlQ2xhc3NEYXRhLnNjaG9vbF9pZCxcclxuICAgICAgICAgIGdyYWRlX3R5cGU6IGNyZWF0ZUNsYXNzRGF0YS5ncmFkZSxcclxuICAgICAgICAgIHllYXJfY2xhc3M6IGNyZWF0ZUNsYXNzRGF0YS55ZWFyLFxyXG4gICAgICAgICAgY2xhc3M6IGNyZWF0ZUNsYXNzRGF0YS5jbGFzc1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFkZENsYXNzQ2FsbGJhY2soZGF0YSwgZmlsdGVyTGlzdClcclxuICAgICAgfSBlbHNlIGlmKHRoaXMudHlwZSA9PT0gJ2pvaW4nICYmIHRoaXMuY3VycmVudFR5cGUgPT09ICdwYXJlbnRzJyl7IC8vIOWmguaenOaYr+WKoOWFpeePree6p1xyXG4gICAgICAgIHRoaXMuam9pbkNsYXNzQ2FsbGJhY2sodGhpcy5qb2luQ2xhc3NJZCwgZmlsdGVyTGlzdClcclxuICAgICAgfSBcclxuICAgIH1cclxuICB9XHJcbiAgY2hlY2tDYW5TdWJtaXQoKSB7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50VHlwZSA9PT0gJ3RlYWNoZXInICYmIGlzRW1wdHlTdHJpbmcodGhpcy50ZWFjaGVyTmFtZSkpIHtcclxuICAgICAgc2hvd01zZygn5aaC5p6c5oKo5Yu+6YCJ5LqG6ICB5biI6Lqr5Lu977yM6K+35aGr5YaZ5oKo55qE5aeT5ZCNJylcclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZVxyXG4gIH1cclxuICBjaGVja0RhdGEoKSB7XHJcbiAgICBsZXQgY2FuU3VibWl0ID0gdHJ1ZVxyXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMubGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICBpZiAoaXNFbXB0eVN0cmluZyh0aGlzLmxpc3RbaV0udmFsdWUpKSB7XHJcbiAgICAgICAgY2FuU3VibWl0ID0gZmFsc2VcclxuICAgICAgICBicmVha1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNhblN1Ym1pdCA9IHRydWVcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNhblN1Ym1pdFxyXG4gIH1cclxuICBnZXRSZWxhdGlvblNoaXAoKSB7XHJcbiAgICBnZXRJZGVudGl0eUxpc3QoKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHRoaXMucmVsYXRpb25zaGlwID0gcmVzLmRhdGEubGlzdFxyXG4gICAgICBjb25zdCBpdGVtID0ge1xyXG4gICAgICAgIHJlbGF0aW9uc2hpcDogdGhpcy5yZWxhdGlvbnNoaXAsXHJcbiAgICAgICAgdmFsdWU6ICcnLFxyXG4gICAgICAgIGFjdGl2ZUluZGV4OiAwXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5saXN0LnB1c2goaXRlbSlcclxuICAgICAgdGhpcy50eXBlID09PSAnZWRpdCcgJiYgdGhpcy5nZXRDbGFzc0lkZW50aXR5KClcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuIl19