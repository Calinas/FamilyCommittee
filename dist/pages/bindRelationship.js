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
        if (_this3.teacherObj && _this3.teacherObj.length) {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJpbmRSZWxhdGlvbnNoaXAuanMiXSwibmFtZXMiOlsiYmluZFJlbGF0aW9uc2hpcCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwicmVsYXRpb25zaGlwIiwicGFyZW50SW5kZXgiLCJjYW5TdWJtaXQiLCJzdHVkZW50TmFtZSIsInRlYWNoZXJOYW1lIiwibGlzdCIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJjbGFzc0lkIiwiam9pbkNsYXNzSWQiLCJjbGFzc0lkZW50aXR5TGlzdCIsInR5cGUiLCJrZXkiLCJjdXJyZW50VHlwZSIsInJlbGF0aW9uc2hpcFR5cGVzIiwiY2hlY2tlZCIsImxhYmVsIiwidmFsdWUiLCJ3YXRjaCIsIm5ld1ZhbHVlIiwib2xkVmFsdWUiLCJtZXRob2RzIiwicGlja2VyQ2hhbmdlIiwiZSIsImN1cnJlbnRUYXJnZXQiLCJpZCIsImRldGFpbCIsIiRhcHBseSIsImRlbGV0ZSIsImlkeCIsInNwbGljZSIsImFkZE5ldyIsIml0ZW0iLCJhY3RpdmVJbmRleCIsInB1c2giLCJiaW5kRm9ybSIsInRhcmdldCIsImRhdGFzZXQiLCJzdWJtaXQiLCJjaGVja0RhdGEiLCJjaGVja0NhblN1Ym1pdCIsImZpbHRlckxpc3QiLCJtYXAiLCJpZGVudGl0eV9pZCIsInN0dWRlbnRfbmFtZSIsIm1lbWJlcl9pZGVudGl0eV9pZCIsImpvaW5DbGFzc0NhbGxiYWNrIiwidGVhY2hlckNhbGxiYWNrIiwiY3JlYXRlQ2xhc3NEYXRhIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJjcmVhdGVDbGFzcyIsInNjaG9vbF9pZCIsImdyYWRlX3R5cGUiLCJncmFkZSIsInllYXJfY2xhc3MiLCJ5ZWFyIiwiY2xhc3MiLCJhZGRDbGFzc0NhbGxiYWNrIiwid3giLCJnZXRTdG9yYWdlU3luYyIsIk51bWJlciIsImdldFJlbGF0aW9uU2hpcCIsIk9iamVjdCIsImFzc2lnbiIsInRoZW4iLCJjb21tb25GbiIsInJlcyIsImNsYXNzX2lkIiwic3VjY2VzcyIsInNldFRpbWVvdXQiLCJzd2l0Y2hUYWIiLCJ1cmwiLCJuYW1lIiwicXJfY29kZSIsImpvaW5fa2V5IiwiY2xhc3NIYXNDaGFuZ2UiLCJuYXZpZ2F0ZVRvIiwidGVhY2hlck9iaiIsImZpbHRlciIsImFwcF90eXBlIiwicGFyZW50TGlzdCIsInN0dWRlbnQiLCJpZGVudGl0eSIsImxlbmd0aCIsInRlYWNoZXIiLCJpIiwibGVuIiwiZ2V0Q2xhc3NJZGVudGl0eSIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBQ3FCQSxnQjs7Ozs7Ozs7Ozs7Ozs7ME1BQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLG9CQUFjLEVBRFQ7QUFFTEMsbUJBQWEsQ0FGUjtBQUdMQyxpQkFBVyxLQUhOO0FBSUxDLG1CQUFhLEVBSlI7QUFLTEMsbUJBQWEsRUFMUjtBQU1MQyxZQUFNLEVBTkQ7QUFPTEMsa0JBQVksSUFQUDtBQVFMQyxpQkFBVyxJQVJOO0FBU0xDLGVBQVMsQ0FBQyxDQVRMO0FBVUxDLG1CQUFhLENBVlI7QUFXTEMseUJBQW1CLEVBWGQ7QUFZTEMsWUFBTSxRQVpEO0FBYUxDLFdBQUssRUFiQTtBQWNMQyxtQkFBYSxTQWRSO0FBZUxDLHlCQUFtQixDQUNqQjtBQUNFQyxpQkFBUyxJQURYO0FBRUVDLGVBQU8sTUFGVDtBQUdFQyxlQUFPO0FBSFQsT0FEaUIsRUFNakI7QUFDRUYsaUJBQVMsS0FEWDtBQUVFQyxlQUFPLE1BRlQ7QUFHRUMsZUFBTztBQUhULE9BTmlCO0FBZmQsSyxRQTRCUEMsSyxHQUFRO0FBQ05mLGlCQURNLHVCQUNPZ0IsUUFEUCxFQUNpQkMsUUFEakIsRUFDMkI7QUFDL0IsYUFBS2xCLFNBQUwsR0FBaUIsQ0FBQywyQkFBY2lCLFFBQWQsQ0FBbEI7QUFDRDtBQUhLLEssUUE4RVJFLE8sR0FBVTtBQUNSQyxrQkFEUSx3QkFDS0MsQ0FETCxF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cyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7IGdldElkZW50aXR5TGlzdCwgYmluZElkZW50aXR5LCBpZGVudGl0eUxpc3QsIGJpbmRUZWFjaGVyIH0gZnJvbSAnLi4vYXBpL3VzZXInXG5pbXBvcnQgeyBhZGRDbGFzcywgam9pbkNsYXNzIH0gZnJvbSAnLi4vYXBpL2NyZWF0ZUNsYXNzJ1xuaW1wb3J0IHsgc2hvd01zZywgaXNFbXB0eVN0cmluZyB9IGZyb20gJy4uL3V0aWxzL2NvbW1vbidcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGJpbmRSZWxhdGlvbnNoaXAgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+i6q+S7vee7keWumidcbiAgfVxuICBkYXRhID0ge1xuICAgIHJlbGF0aW9uc2hpcDogW10sXG4gICAgcGFyZW50SW5kZXg6IDAsXG4gICAgY2FuU3VibWl0OiBmYWxzZSxcbiAgICBzdHVkZW50TmFtZTogJycsXG4gICAgdGVhY2hlck5hbWU6ICcnLFxuICAgIGxpc3Q6IFtdLFxuICAgIG1lbWJlckluZm86IG51bGwsXG4gICAgY2xhc3NJbmZvOiBudWxsLFxuICAgIGNsYXNzSWQ6IC0xLFxuICAgIGpvaW5DbGFzc0lkOiAwLFxuICAgIGNsYXNzSWRlbnRpdHlMaXN0OiBbXSxcbiAgICB0eXBlOiAnY3JlYXRlJyxcbiAgICBrZXk6ICcnLFxuICAgIGN1cnJlbnRUeXBlOiAncGFyZW50cycsXG4gICAgcmVsYXRpb25zaGlwVHlwZXM6IFtcbiAgICAgIHtcbiAgICAgICAgY2hlY2tlZDogdHJ1ZSxcbiAgICAgICAgbGFiZWw6ICfmiJHmmK/lrrbplb8nLFxuICAgICAgICB2YWx1ZTogJ3BhcmVudHMnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBjaGVja2VkOiBmYWxzZSxcbiAgICAgICAgbGFiZWw6ICfmiJHmmK/mlZnluIgnLFxuICAgICAgICB2YWx1ZTogJ3RlYWNoZXInXG4gICAgICB9XG4gICAgXVxuICB9XG4gIHdhdGNoID0ge1xuICAgIHN0dWRlbnROYW1lIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgIHRoaXMuY2FuU3VibWl0ID0gIWlzRW1wdHlTdHJpbmcobmV3VmFsdWUpXG4gICAgfVxuICB9XG4gIG9uTG9hZChlKSB7XG4gICAgdGhpcy5tZW1iZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nKVxuICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXG4gICAgdGhpcy5qb2luQ2xhc3NJZCA9IE51bWJlcihlLmlkKVxuICAgIHRoaXMua2V5ID0gZS5rZXlcbiAgICB0aGlzLnR5cGUgPSBlLnR5cGVcbiAgICB0aGlzLmdldFJlbGF0aW9uU2hpcCgpXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIGFkZENsYXNzQ2FsbGJhY2soZGF0YSwgZmlsdGVyTGlzdCkge1xuICAgIGFkZENsYXNzKE9iamVjdC5hc3NpZ24oe30sIGRhdGEsIHtcbiAgICAgIGl0ZW06IGZpbHRlckxpc3RcbiAgICB9KSkudGhlbihyZXMgPT4ge1xuICAgICAgdGhpcy5jb21tb25GbihyZXMpXG4gICAgfSlcbiAgfVxuICBqb2luQ2xhc3NDYWxsYmFjayhpZCwgZmlsdGVyTGlzdCkge1xuICAgIGJpbmRJZGVudGl0eSh7XG4gICAgICBjbGFzc19pZDogaWQsXG4gICAgICBpdGVtOiBmaWx0ZXJMaXN0XG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgaWYocmVzLmRhdGEuc3VjY2Vzcyl7XG4gICAgICAgIHNob3dNc2coJ+aIkOWKn+e7keWumui6q+S7vScpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB3eC5zd2l0Y2hUYWIoe3VybDogJ3pvbmUnfSlcbiAgICAgICAgfSwyMDAwKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgdGVhY2hlckNhbGxiYWNrKCkge1xuICAgIGJpbmRUZWFjaGVyKHtcbiAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgIG5hbWU6IHRoaXMudGVhY2hlck5hbWVcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICBpZihyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgIHd4LnN3aXRjaFRhYih7dXJsOiAnem9uZSd9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgY29tbW9uRm4ocmVzKSB7XG4gICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgIHNob3dNc2coJ+ePree6p+WIm+W7uuaIkOWKnycpXG4gICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgIGxldCB1cmwgPSBgY3JlYXRlQ2xhc3NTdWNjZXNzP25hbWU9JHtkYXRhLm5hbWV9JmNvZGU9JHtkYXRhLnFyX2NvZGV9JmtleT0ke2RhdGEuam9pbl9rZXl9JmNsYXNzSWQ9JHtkYXRhLmlkfWBcbiAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmNsYXNzSGFzQ2hhbmdlID0gdHJ1ZVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogdXJsXG4gICAgICAgIH0pXG4gICAgICB9LCAxMDAwKVxuICAgIH1cbiAgfVxuICBnZXRDbGFzc0lkZW50aXR5KCkge1xuICAgIGlkZW50aXR5TGlzdCh7XG4gICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWRcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICBjb25zdCBsaXN0ID0gcmVzLmRhdGEubGlzdFxuICAgICAgY29uc3QgdGVhY2hlck9iaiA9IGxpc3QuZmlsdGVyKGl0ZW0gPT4gaXRlbS5hcHBfdHlwZSA9PT0gJ3RlYWNoZXInKVxuICAgICAgY29uc3QgcGFyZW50TGlzdCA9IGxpc3QuZmlsdGVyKGl0ZW0gPT4gaXRlbS5hcHBfdHlwZSA9PT0gJ3N0dWRlbnQnKVxuICAgICAgdGhpcy5saXN0ID0gcGFyZW50TGlzdC5tYXAoaXRlbSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcmVsYXRpb25zaGlwOiB0aGlzLnJlbGF0aW9uc2hpcCxcbiAgICAgICAgICB2YWx1ZTogaXRlbS5zdHVkZW50Lm5hbWUsXG4gICAgICAgICAgYWN0aXZlSW5kZXg6IGl0ZW0uaWRlbnRpdHkuaWQgLSAxLFxuICAgICAgICAgIGlkOiBpdGVtLmlkXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBpZih0aGlzLnRlYWNoZXJPYmogJiYgdGhpcy50ZWFjaGVyT2JqLmxlbmd0aCkge1xuICAgICAgICB0aGlzLnRlYWNoZXJOYW1lID0gdGVhY2hlck9ialswXS50ZWFjaGVyLm5hbWVcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9KVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgcGlja2VyQ2hhbmdlKGUpIHtcbiAgICAgIHRoaXNbZS5jdXJyZW50VGFyZ2V0LmlkXSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBkZWxldGUoaWR4KSB7XG4gICAgICB0aGlzLmxpc3Quc3BsaWNlKGlkeCwgMSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGFkZE5ldygpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSB7XG4gICAgICAgIHJlbGF0aW9uc2hpcDogdGhpcy5yZWxhdGlvbnNoaXAsXG4gICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgYWN0aXZlSW5kZXg6IDBcbiAgICAgIH1cbiAgICAgIHRoaXMubGlzdC5wdXNoKGl0ZW0pXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBiaW5kRm9ybShlKSB7XG4gICAgICBjb25zdCB0YXJnZXQgPSBlLmN1cnJlbnRUYXJnZXRcbiAgICAgIGNvbnN0IGlkeCA9IHRhcmdldC5kYXRhc2V0LmlkeFxuICAgICAgdGhpcy5saXN0W2lkeF1bdGFyZ2V0LmlkXSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBzdWJtaXQoKSB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50VHlwZSA9PT0gJ3BhcmVudHMnICYmICF0aGlzLmNoZWNrRGF0YSgpKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+Whq+WGmeaCqOWtqeWtkOWnk+WQjScpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdGhpcy5jaGVja0NhblN1Ym1pdCgpXG4gICAgICBsZXQgZmlsdGVyTGlzdCA9IHRoaXMubGlzdC5tYXAoaXRlbSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaWRlbnRpdHlfaWQ6IGl0ZW0ucmVsYXRpb25zaGlwW2l0ZW0uYWN0aXZlSW5kZXhdLmlkLFxuICAgICAgICAgIHN0dWRlbnRfbmFtZTogaXRlbS52YWx1ZVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ2VkaXQnICYmIHRoaXMuY3VycmVudFR5cGU9PT0gJ3BhcmVudHMnKSB7IC8vIOWmguaenOaYr+ebtOaOpeS/ruaUuei6q+S7vee7keWumlxuICAgICAgICBmaWx0ZXJMaXN0ID0gdGhpcy5saXN0Lm1hcChpdGVtID0+IHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWRlbnRpdHlfaWQ6IGl0ZW0ucmVsYXRpb25zaGlwW2l0ZW0uYWN0aXZlSW5kZXhdLmlkLFxuICAgICAgICAgICAgc3R1ZGVudF9uYW1lOiBpdGVtLnZhbHVlLFxuICAgICAgICAgICAgbWVtYmVyX2lkZW50aXR5X2lkOiBpdGVtLmlkXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLmpvaW5DbGFzc0NhbGxiYWNrKHRoaXMuY2xhc3NJbmZvLmlkLCBmaWx0ZXJMaXN0KVxuICAgICAgfSBlbHNlIGlmKHRoaXMudHlwZSA9PT0gJ2VkaXQnICYmIHRoaXMuY3VycmVudFR5cGUgPT09ICd0ZWFjaGVyJykgey8vIOWmguaenOaYr+ebtOaOpeS/ruaUuei6q+S7vee7keWumlxuICAgICAgICB0aGlzLnRlYWNoZXJDYWxsYmFjaygpXG4gICAgICB9IGVsc2UgaWYgKCB0aGlzLnR5cGUgPT09ICdjcmVhdGUnKSB7IC8vIOWmguaenOaYr+WIm+W7uuePree6p+W+l1xuICAgICAgICBsZXQgY3JlYXRlQ2xhc3NEYXRhID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuY3JlYXRlQ2xhc3NcbiAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgc2Nob29sX2lkOiBjcmVhdGVDbGFzc0RhdGEuc2Nob29sX2lkLFxuICAgICAgICAgIGdyYWRlX3R5cGU6IGNyZWF0ZUNsYXNzRGF0YS5ncmFkZSxcbiAgICAgICAgICB5ZWFyX2NsYXNzOiBjcmVhdGVDbGFzc0RhdGEueWVhcixcbiAgICAgICAgICBjbGFzczogY3JlYXRlQ2xhc3NEYXRhLmNsYXNzXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hZGRDbGFzc0NhbGxiYWNrKGRhdGEsIGZpbHRlckxpc3QpXG4gICAgICB9IGVsc2UgaWYodGhpcy50eXBlID09PSAnam9pbicgJiYgdGhpcy5jdXJyZW50VHlwZSA9PT0gJ3BhcmVudHMnKXsgLy8g5aaC5p6c5piv5Yqg5YWl54+t57qnXG4gICAgICAgIHRoaXMuam9pbkNsYXNzQ2FsbGJhY2sodGhpcy5qb2luQ2xhc3NJZCwgZmlsdGVyTGlzdClcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgY2hlY2tDYW5TdWJtaXQoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudFR5cGUgPT09ICd0ZWFjaGVyJyAmJiBpc0VtcHR5U3RyaW5nKHRoaXMudGVhY2hlck5hbWUpKSB7XG4gICAgICBzaG93TXNnKCflpoLmnpzmgqjli77pgInkuobogIHluIjouqvku73vvIzor7floavlhpnmgqjnmoTlp5PlkI0nKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIHJldHVybiB0cnVlXG4gIH1cbiAgY2hlY2tEYXRhKCkge1xuICAgIGxldCBjYW5TdWJtaXQgPSB0cnVlXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMubGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgaWYgKGlzRW1wdHlTdHJpbmcodGhpcy5saXN0W2ldLnZhbHVlKSkge1xuICAgICAgICBjYW5TdWJtaXQgPSBmYWxzZVxuICAgICAgICBicmVha1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FuU3VibWl0ID0gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2FuU3VibWl0XG4gIH1cbiAgZ2V0UmVsYXRpb25TaGlwKCkge1xuICAgIGdldElkZW50aXR5TGlzdCgpLnRoZW4ocmVzID0+IHtcbiAgICAgIHRoaXMucmVsYXRpb25zaGlwID0gcmVzLmRhdGEubGlzdFxuICAgICAgY29uc3QgaXRlbSA9IHtcbiAgICAgICAgcmVsYXRpb25zaGlwOiB0aGlzLnJlbGF0aW9uc2hpcCxcbiAgICAgICAgdmFsdWU6ICcnLFxuICAgICAgICBhY3RpdmVJbmRleDogMFxuICAgICAgfVxuICAgICAgdGhpcy5saXN0LnB1c2goaXRlbSlcbiAgICAgIHRoaXMudHlwZSA9PT0gJ2VkaXQnICYmIHRoaXMuZ2V0Q2xhc3NJZGVudGl0eSgpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSlcbiAgfVxufVxuIl19