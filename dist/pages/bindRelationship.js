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
      type: '',
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
        } else if (this.type === 'create' && !this.joinClassId) {
          // 如果是创建班级得
          var createClassData = this.$parent.globalData.createClass;
          var data = {
            school_id: createClassData.school_id,
            grade_type: createClassData.grade,
            year_class: createClassData.year,
            class: createClassData.class
          };
          this.addClassCallback(data, filterList);
        } else if (this.type === 'join') {
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
      var _this3 = this;

      (0, _user.bindIdentity)({
        class_id: id,
        item: filterList
      }).then(function (res) {
        if (res.data.success) {
          _this3.checkJoinKey();
        }
      });
    }
  }, {
    key: 'checkJoinKey',
    value: function checkJoinKey() {
      (0, _createClass2.joinClass)({
        class_id: this.joinClassId,
        join_key: this.key
      }).then(function (res) {
        if (res.data.success) {
          (0, _common.showMsg)('成功加入班级');
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
      var _this4 = this;

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
        _this4.list = parentList.map(function (item) {
          return {
            relationship: _this4.relationship,
            value: item.student.name,
            activeIndex: item.identity.id - 1,
            id: item.id
          };
        });
        if (_this4.teacherObj.length) {
          _this4.teacherName = teacherObj[0].teacher.name;
        }
        _this4.$apply();
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
      var _this5 = this;

      (0, _user.getIdentityList)().then(function (res) {
        _this5.relationship = res.data.list;
        var item = {
          relationship: _this5.relationship,
          value: '',
          activeIndex: 0
        };
        _this5.list.push(item);
        _this5.type === 'edit' && _this5.getClassIdentity();
        _this5.$apply();
      });
    }
  }]);

  return bindRelationship;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(bindRelationship , 'pages/bindRelationship'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJpbmRSZWxhdGlvbnNoaXAuanMiXSwibmFtZXMiOlsiYmluZFJlbGF0aW9uc2hpcCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwicmVsYXRpb25zaGlwIiwicGFyZW50SW5kZXgiLCJjYW5TdWJtaXQiLCJzdHVkZW50TmFtZSIsInRlYWNoZXJOYW1lIiwibGlzdCIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJjbGFzc0lkIiwiam9pbkNsYXNzSWQiLCJjbGFzc0lkZW50aXR5TGlzdCIsInR5cGUiLCJrZXkiLCJjdXJyZW50VHlwZSIsInJlbGF0aW9uc2hpcFR5cGVzIiwiY2hlY2tlZCIsImxhYmVsIiwidmFsdWUiLCJ3YXRjaCIsIm5ld1ZhbHVlIiwib2xkVmFsdWUiLCJtZXRob2RzIiwicGlja2VyQ2hhbmdlIiwiZSIsImN1cnJlbnRUYXJnZXQiLCJpZCIsImRldGFpbCIsIiRhcHBseSIsImRlbGV0ZSIsImlkeCIsInNwbGljZSIsImFkZE5ldyIsIml0ZW0iLCJhY3RpdmVJbmRleCIsInB1c2giLCJiaW5kRm9ybSIsInRhcmdldCIsImRhdGFzZXQiLCJzdWJtaXQiLCJjaGVja0RhdGEiLCJjaGVja0NhblN1Ym1pdCIsImZpbHRlckxpc3QiLCJtYXAiLCJpZGVudGl0eV9pZCIsInN0dWRlbnRfbmFtZSIsIm1lbWJlcl9pZGVudGl0eV9pZCIsImpvaW5DbGFzc0NhbGxiYWNrIiwidGVhY2hlckNhbGxiYWNrIiwiY3JlYXRlQ2xhc3NEYXRhIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJjcmVhdGVDbGFzcyIsInNjaG9vbF9pZCIsImdyYWRlX3R5cGUiLCJncmFkZSIsInllYXJfY2xhc3MiLCJ5ZWFyIiwiY2xhc3MiLCJhZGRDbGFzc0NhbGxiYWNrIiwid3giLCJnZXRTdG9yYWdlU3luYyIsIk51bWJlciIsImdldFJlbGF0aW9uU2hpcCIsIk9iamVjdCIsImFzc2lnbiIsInRoZW4iLCJjb21tb25GbiIsInJlcyIsImNsYXNzX2lkIiwic3VjY2VzcyIsImNoZWNrSm9pbktleSIsImpvaW5fa2V5Iiwic2V0VGltZW91dCIsInN3aXRjaFRhYiIsInVybCIsIm5hbWUiLCJxcl9jb2RlIiwiY2xhc3NIYXNDaGFuZ2UiLCJuYXZpZ2F0ZVRvIiwidGVhY2hlck9iaiIsImZpbHRlciIsImFwcF90eXBlIiwicGFyZW50TGlzdCIsInN0dWRlbnQiLCJpZGVudGl0eSIsImxlbmd0aCIsInRlYWNoZXIiLCJpIiwibGVuIiwiZ2V0Q2xhc3NJZGVudGl0eSIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBQ3FCQSxnQjs7Ozs7Ozs7Ozs7Ozs7ME1BQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLG9CQUFjLEVBRFQ7QUFFTEMsbUJBQWEsQ0FGUjtBQUdMQyxpQkFBVyxLQUhOO0FBSUxDLG1CQUFhLEVBSlI7QUFLTEMsbUJBQWEsRUFMUjtBQU1MQyxZQUFNLEVBTkQ7QUFPTEMsa0JBQVksSUFQUDtBQVFMQyxpQkFBVyxJQVJOO0FBU0xDLGVBQVMsQ0FBQyxDQVRMO0FBVUxDLG1CQUFhLENBVlI7QUFXTEMseUJBQW1CLEVBWGQ7QUFZTEMsWUFBTSxFQVpEO0FBYUxDLFdBQUssRUFiQTtBQWNMQyxtQkFBYSxTQWRSO0FBZUxDLHlCQUFtQixDQUNqQjtBQUNFQyxpQkFBUyxJQURYO0FBRUVDLGVBQU8sTUFGVDtBQUdFQyxlQUFPO0FBSFQsT0FEaUIsRUFNakI7QUFDRUYsaUJBQVMsS0FEWDtBQUVFQyxlQUFPLE1BRlQ7QUFHRUMsZUFBTztBQUhULE9BTmlCO0FBZmQsSyxRQTRCUEMsSyxHQUFRO0FBQ05mLGlCQURNLHVCQUNPZ0IsUUFEUCxFQUNpQkMsUUFEakIsRUFDMkI7QUFDL0IsYUFBS2xCLFNBQUwsR0FBaUIsQ0FBQywyQkFBY2lCLFFBQWQsQ0FBbEI7QUFDRDtBQUhLLEssUUF3RlJFLE8sR0FBVTtBQUNSQyxrQkFE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O0FBSEYsU0FBYjtBQUtBLGVBQUs1QixJQUFMLENBQVU2QixJQUFWLENBQWVGLElBQWY7QUFDQSxlQUFLckIsSUFBTCxLQUFjLE1BQWQsSUFBd0IsT0FBSzhFLGdCQUFMLEVBQXhCO0FBQ0EsZUFBSzlELE1BQUw7QUFDRCxPQVZEO0FBV0Q7Ozs7RUFwTjJDK0QsZUFBS0MsSTs7a0JBQTlCL0YsZ0IiLCJmaWxlIjoiYmluZFJlbGF0aW9uc2hpcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgeyBnZXRJZGVudGl0eUxpc3QsIGJpbmRJZGVudGl0eSwgaWRlbnRpdHlMaXN0LCBiaW5kVGVhY2hlciB9IGZyb20gJy4uL2FwaS91c2VyJ1xyXG5pbXBvcnQgeyBhZGRDbGFzcywgam9pbkNsYXNzIH0gZnJvbSAnLi4vYXBpL2NyZWF0ZUNsYXNzJ1xyXG5pbXBvcnQgeyBzaG93TXNnLCBpc0VtcHR5U3RyaW5nIH0gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBiaW5kUmVsYXRpb25zaGlwIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6Lqr5Lu957uR5a6aJ1xyXG4gIH1cclxuICBkYXRhID0ge1xyXG4gICAgcmVsYXRpb25zaGlwOiBbXSxcclxuICAgIHBhcmVudEluZGV4OiAwLFxyXG4gICAgY2FuU3VibWl0OiBmYWxzZSxcclxuICAgIHN0dWRlbnROYW1lOiAnJyxcclxuICAgIHRlYWNoZXJOYW1lOiAnJyxcclxuICAgIGxpc3Q6IFtdLFxyXG4gICAgbWVtYmVySW5mbzogbnVsbCxcclxuICAgIGNsYXNzSW5mbzogbnVsbCxcclxuICAgIGNsYXNzSWQ6IC0xLFxyXG4gICAgam9pbkNsYXNzSWQ6IDAsXHJcbiAgICBjbGFzc0lkZW50aXR5TGlzdDogW10sXHJcbiAgICB0eXBlOiAnJyxcclxuICAgIGtleTogJycsXHJcbiAgICBjdXJyZW50VHlwZTogJ3BhcmVudHMnLFxyXG4gICAgcmVsYXRpb25zaGlwVHlwZXM6IFtcclxuICAgICAge1xyXG4gICAgICAgIGNoZWNrZWQ6IHRydWUsXHJcbiAgICAgICAgbGFiZWw6ICfmiJHmmK/lrrbplb8nLFxyXG4gICAgICAgIHZhbHVlOiAncGFyZW50cydcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxyXG4gICAgICAgIGxhYmVsOiAn5oiR5piv5pWZ5biIJyxcclxuICAgICAgICB2YWx1ZTogJ3RlYWNoZXInXHJcbiAgICAgIH1cclxuICAgIF1cclxuICB9XHJcbiAgd2F0Y2ggPSB7XHJcbiAgICBzdHVkZW50TmFtZSAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XHJcbiAgICAgIHRoaXMuY2FuU3VibWl0ID0gIWlzRW1wdHlTdHJpbmcobmV3VmFsdWUpXHJcbiAgICB9XHJcbiAgfVxyXG4gIG9uTG9hZChlKSB7XHJcbiAgICB0aGlzLm1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXHJcbiAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxyXG4gICAgdGhpcy5qb2luQ2xhc3NJZCA9IE51bWJlcihlLmlkKVxyXG4gICAgdGhpcy5rZXkgPSBlLmtleVxyXG4gICAgdGhpcy50eXBlID0gZS50eXBlXHJcbiAgICB0aGlzLmdldFJlbGF0aW9uU2hpcCgpXHJcbiAgICB0aGlzLiRhcHBseSgpXHJcbiAgfVxyXG4gIGFkZENsYXNzQ2FsbGJhY2soZGF0YSwgZmlsdGVyTGlzdCkge1xyXG4gICAgYWRkQ2xhc3MoT2JqZWN0LmFzc2lnbih7fSwgZGF0YSwge1xyXG4gICAgICBpdGVtOiBmaWx0ZXJMaXN0XHJcbiAgICB9KSkudGhlbihyZXMgPT4ge1xyXG4gICAgICB0aGlzLmNvbW1vbkZuKHJlcylcclxuICAgIH0pXHJcbiAgfVxyXG4gIGpvaW5DbGFzc0NhbGxiYWNrKGlkLCBmaWx0ZXJMaXN0KSB7XHJcbiAgICBiaW5kSWRlbnRpdHkoe1xyXG4gICAgICBjbGFzc19pZDogaWQsXHJcbiAgICAgIGl0ZW06IGZpbHRlckxpc3RcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgaWYocmVzLmRhdGEuc3VjY2Vzcyl7XHJcbiAgICAgICAgdGhpcy5jaGVja0pvaW5LZXkoKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuICBjaGVja0pvaW5LZXkoKSB7XHJcbiAgICBqb2luQ2xhc3Moe1xyXG4gICAgICBjbGFzc19pZDogdGhpcy5qb2luQ2xhc3NJZCxcclxuICAgICAgam9pbl9rZXk6IHRoaXMua2V5XHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGlmKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICBzaG93TXNnKCfmiJDlip/liqDlhaXnj63nuqcnKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHd4LnN3aXRjaFRhYih7dXJsOiAnem9uZSd9KVxyXG4gICAgICAgIH0sMjAwMClcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbiAgdGVhY2hlckNhbGxiYWNrKCkge1xyXG4gICAgYmluZFRlYWNoZXIoe1xyXG4gICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXHJcbiAgICAgIG5hbWU6IHRoaXMudGVhY2hlck5hbWVcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgaWYocmVzLmRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgIHd4LnN3aXRjaFRhYih7dXJsOiAnem9uZSd9KVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuICBjb21tb25GbihyZXMpIHtcclxuICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgIHNob3dNc2coJ+ePree6p+WIm+W7uuaIkOWKnycpXHJcbiAgICAgIGxldCBkYXRhID0gcmVzLmRhdGEuZGF0YVxyXG4gICAgICBsZXQgdXJsID0gYGNyZWF0ZUNsYXNzU3VjY2Vzcz9uYW1lPSR7ZGF0YS5uYW1lfSZjb2RlPSR7ZGF0YS5xcl9jb2RlfSZrZXk9JHtkYXRhLmpvaW5fa2V5fSZjbGFzc0lkPSR7ZGF0YS5pZH1gXHJcbiAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmNsYXNzSGFzQ2hhbmdlID0gdHJ1ZVxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgIHVybDogdXJsXHJcbiAgICAgICAgfSlcclxuICAgICAgfSwgMTAwMClcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0Q2xhc3NJZGVudGl0eSgpIHtcclxuICAgIGlkZW50aXR5TGlzdCh7XHJcbiAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZFxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICBjb25zdCBsaXN0ID0gcmVzLmRhdGEubGlzdFxyXG4gICAgICBjb25zdCB0ZWFjaGVyT2JqID0gbGlzdC5maWx0ZXIoaXRlbSA9PiBpdGVtLmFwcF90eXBlID09PSAndGVhY2hlcicpXHJcbiAgICAgIGNvbnN0IHBhcmVudExpc3QgPSBsaXN0LmZpbHRlcihpdGVtID0+IGl0ZW0uYXBwX3R5cGUgPT09ICdzdHVkZW50JylcclxuICAgICAgdGhpcy5saXN0ID0gcGFyZW50TGlzdC5tYXAoaXRlbSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHJlbGF0aW9uc2hpcDogdGhpcy5yZWxhdGlvbnNoaXAsXHJcbiAgICAgICAgICB2YWx1ZTogaXRlbS5zdHVkZW50Lm5hbWUsXHJcbiAgICAgICAgICBhY3RpdmVJbmRleDogaXRlbS5pZGVudGl0eS5pZCAtIDEsXHJcbiAgICAgICAgICBpZDogaXRlbS5pZFxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgaWYodGhpcy50ZWFjaGVyT2JqLmxlbmd0aCkge1xyXG4gICAgICAgIHRoaXMudGVhY2hlck5hbWUgPSB0ZWFjaGVyT2JqWzBdLnRlYWNoZXIubmFtZVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0pXHJcbiAgfVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBwaWNrZXJDaGFuZ2UoZSkge1xyXG4gICAgICB0aGlzW2UuY3VycmVudFRhcmdldC5pZF0gPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9LFxyXG4gICAgZGVsZXRlKGlkeCkge1xyXG4gICAgICB0aGlzLmxpc3Quc3BsaWNlKGlkeCwgMSlcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSxcclxuICAgIGFkZE5ldygpIHtcclxuICAgICAgY29uc3QgaXRlbSA9IHtcclxuICAgICAgICByZWxhdGlvbnNoaXA6IHRoaXMucmVsYXRpb25zaGlwLFxyXG4gICAgICAgIHZhbHVlOiAnJyxcclxuICAgICAgICBhY3RpdmVJbmRleDogMFxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubGlzdC5wdXNoKGl0ZW0pXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0sXHJcbiAgICBiaW5kRm9ybShlKSB7XHJcbiAgICAgIGNvbnN0IHRhcmdldCA9IGUuY3VycmVudFRhcmdldFxyXG4gICAgICBjb25zdCBpZHggPSB0YXJnZXQuZGF0YXNldC5pZHhcclxuICAgICAgdGhpcy5saXN0W2lkeF1bdGFyZ2V0LmlkXSA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0sXHJcbiAgICBzdWJtaXQoKSB7XHJcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRUeXBlID09PSAncGFyZW50cycgJiYgIXRoaXMuY2hlY2tEYXRhKCkpIHtcclxuICAgICAgICBzaG93TXNnKCfor7floavlhpnmgqjlranlrZDlp5PlkI0nKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY2hlY2tDYW5TdWJtaXQoKVxyXG4gICAgICBsZXQgZmlsdGVyTGlzdCA9IHRoaXMubGlzdC5tYXAoaXRlbSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGlkZW50aXR5X2lkOiBpdGVtLnJlbGF0aW9uc2hpcFtpdGVtLmFjdGl2ZUluZGV4XS5pZCxcclxuICAgICAgICAgIHN0dWRlbnRfbmFtZTogaXRlbS52YWx1ZVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ2VkaXQnICYmIHRoaXMuY3VycmVudFR5cGU9PT0gJ3BhcmVudHMnKSB7IC8vIOWmguaenOaYr+ebtOaOpeS/ruaUuei6q+S7vee7keWumlxyXG4gICAgICAgIGZpbHRlckxpc3QgPSB0aGlzLmxpc3QubWFwKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaWRlbnRpdHlfaWQ6IGl0ZW0ucmVsYXRpb25zaGlwW2l0ZW0uYWN0aXZlSW5kZXhdLmlkLFxyXG4gICAgICAgICAgICBzdHVkZW50X25hbWU6IGl0ZW0udmFsdWUsXHJcbiAgICAgICAgICAgIG1lbWJlcl9pZGVudGl0eV9pZDogaXRlbS5pZFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5qb2luQ2xhc3NDYWxsYmFjayh0aGlzLmNsYXNzSW5mby5pZCwgZmlsdGVyTGlzdClcclxuICAgICAgfSBlbHNlIGlmKHRoaXMudHlwZSA9PT0gJ2VkaXQnICYmIHRoaXMuY3VycmVudFR5cGUgPT09ICd0ZWFjaGVyJykgey8vIOWmguaenOaYr+ebtOaOpeS/ruaUuei6q+S7vee7keWumlxyXG4gICAgICAgIHRoaXMudGVhY2hlckNhbGxiYWNrKClcclxuICAgICAgfSBlbHNlIGlmICggdGhpcy50eXBlID09PSAnY3JlYXRlJyAmJiAhdGhpcy5qb2luQ2xhc3NJZCkgeyAvLyDlpoLmnpzmmK/liJvlu7rnj63nuqflvpdcclxuICAgICAgICBsZXQgY3JlYXRlQ2xhc3NEYXRhID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuY3JlYXRlQ2xhc3NcclxuICAgICAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgICAgIHNjaG9vbF9pZDogY3JlYXRlQ2xhc3NEYXRhLnNjaG9vbF9pZCxcclxuICAgICAgICAgIGdyYWRlX3R5cGU6IGNyZWF0ZUNsYXNzRGF0YS5ncmFkZSxcclxuICAgICAgICAgIHllYXJfY2xhc3M6IGNyZWF0ZUNsYXNzRGF0YS55ZWFyLFxyXG4gICAgICAgICAgY2xhc3M6IGNyZWF0ZUNsYXNzRGF0YS5jbGFzc1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFkZENsYXNzQ2FsbGJhY2soZGF0YSwgZmlsdGVyTGlzdClcclxuICAgICAgfSBlbHNlIGlmKHRoaXMudHlwZSA9PT0gJ2pvaW4nKXsgLy8g5aaC5p6c5piv5Yqg5YWl54+t57qnXHJcbiAgICAgICAgdGhpcy5qb2luQ2xhc3NJZCAmJiB0aGlzLmpvaW5DbGFzc0NhbGxiYWNrKHRoaXMuam9pbkNsYXNzSWQsIGZpbHRlckxpc3QpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgY2hlY2tDYW5TdWJtaXQoKSB7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50VHlwZSA9PT0gJ3RlYWNoZXInICYmIGlzRW1wdHlTdHJpbmcodGhpcy50ZWFjaGVyTmFtZSkpIHtcclxuICAgICAgc2hvd01zZygn5aaC5p6c5oKo5Yu+6YCJ5LqG6ICB5biI6Lqr5Lu977yM6K+35aGr5YaZ5oKo55qE5aeT5ZCNJylcclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZVxyXG4gIH1cclxuICBjaGVja0RhdGEoKSB7XHJcbiAgICBsZXQgY2FuU3VibWl0ID0gdHJ1ZVxyXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMubGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICBpZiAoaXNFbXB0eVN0cmluZyh0aGlzLmxpc3RbaV0udmFsdWUpKSB7XHJcbiAgICAgICAgY2FuU3VibWl0ID0gZmFsc2VcclxuICAgICAgICBicmVha1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNhblN1Ym1pdCA9IHRydWVcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNhblN1Ym1pdFxyXG4gIH1cclxuICBnZXRSZWxhdGlvblNoaXAoKSB7XHJcbiAgICBnZXRJZGVudGl0eUxpc3QoKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHRoaXMucmVsYXRpb25zaGlwID0gcmVzLmRhdGEubGlzdFxyXG4gICAgICBjb25zdCBpdGVtID0ge1xyXG4gICAgICAgIHJlbGF0aW9uc2hpcDogdGhpcy5yZWxhdGlvbnNoaXAsXHJcbiAgICAgICAgdmFsdWU6ICcnLFxyXG4gICAgICAgIGFjdGl2ZUluZGV4OiAwXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5saXN0LnB1c2goaXRlbSlcclxuICAgICAgdGhpcy50eXBlID09PSAnZWRpdCcgJiYgdGhpcy5nZXRDbGFzc0lkZW50aXR5KClcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuIl19