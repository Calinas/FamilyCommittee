'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _wepyRedux = require('./../npm/wepy-redux/lib/index.js');

var _actions = require('./../store/actions/index.js');

var _user = require('./../api/user.js');

var _createClass2 = require('./../api/createClass.js');

var _common = require('./../utils/common.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var store = (0, _wepyRedux.getStore)();

var bindRelationship = (_dec = (0, _wepyRedux.connect)({
  relationship: function relationship(state) {
    return state.zone.relationship;
  }
}), _dec(_class = function (_wepy$page) {
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
      relationship: function relationship(newValue, oldValue) {
        if (!oldValue.length && newValue.length && (this.type === 'create' || this.type === 'join')) {
          // 从redux-store第一次取值，需要初始化一个input输入框
          this.addNewFn();
        }
      },
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
        this.addNewFn();
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
          if (this.currentType === 'teacher') {
            var item = {
              type: 'teacher',
              list: [{ name: this.teacherName }]
            };
            this.addClassCallback(data, item);
          } else {
            var _item = {
              type: 'partiarch',
              list: filterList
            };
            this.addClassCallback(data, _item);
          }
        } else if (this.type === 'join' && this.currentType === 'parents') {
          // 如果是加入班级
          this.joinClassCallback(this.joinClassId, filterList);
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(bindRelationship, [{
    key: 'onShow',
    value: function onShow() {
      // 第一次进来初始化获取relationship的时候，length此时为0，和上面的watch是不会同时执行的
      if (this.relationship.length && (this.type === 'create' || this.type === 'join')) {
        this.addNewFn();
      }
    }
  }, {
    key: 'onLoad',
    value: function onLoad(e) {
      !this.relationship.length && (0, _actions.saveIdentityList)();
      this.memberInfo = wx.getStorageSync('memberInfo');
      this.classInfo = wx.getStorageSync('classInfo');
      this.joinClassId = Number(e.id);
      this.key = e.key;
      this.type = e.type;
      this.type === 'edit' && this.getClassIdentity();
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
        wx.setStorage({
          key: 'classInfo',
          data: data
        });
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
    key: 'addNewFn',
    value: function addNewFn() {
      var item = {
        relationship: this.relationship,
        value: '',
        activeIndex: 0
      };
      this.list.push(item);
      this.$apply();
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
  }]);

  return bindRelationship;
}(_wepy2.default.page)) || _class);

Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(bindRelationship , 'pages/bindRelationship'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJpbmRSZWxhdGlvbnNoaXAuanMiXSwibmFtZXMiOlsic3RvcmUiLCJiaW5kUmVsYXRpb25zaGlwIiwicmVsYXRpb25zaGlwIiwic3RhdGUiLCJ6b25lIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJwYXJlbnRJbmRleCIsImNhblN1Ym1pdCIsInN0dWRlbnROYW1lIiwidGVhY2hlck5hbWUiLCJsaXN0IiwibWVtYmVySW5mbyIsImNsYXNzSW5mbyIsImNsYXNzSWQiLCJqb2luQ2xhc3NJZCIsImNsYXNzSWRlbnRpdHlMaXN0IiwidHlwZSIsImtleSIsImN1cnJlbnRUeXBlIiwicmVsYXRpb25zaGlwVHlwZXMiLCJjaGVja2VkIiwibGFiZWwiLCJ2YWx1ZSIsIndhdGNoIiwibmV3VmFsdWUiLCJvbGRWYWx1ZSIsImxlbmd0aCIsImFkZE5ld0ZuIiwibWV0aG9kcyIsInBpY2tlckNoYW5nZSIsImUiLCJjdXJyZW50VGFyZ2V0IiwiaWQiLCJkZXRhaWwiLCIkYXBwbHkiLCJkZWxldGUiLCJpZHgiLCJzcGxpY2UiLCJhZGROZXciLCJiaW5kRm9ybSIsInRhcmdldCIsImRhdGFzZXQiLCJzdWJtaXQiLCJjaGVja0RhdGEiLCJjaGVja0NhblN1Ym1pdCIsImZpbHRlckxpc3QiLCJtYXAiLCJpZGVudGl0eV9pZCIsIml0ZW0iLCJhY3RpdmVJbmRleCIsInN0dWRlbnRfbmFtZSIsIm1lbWJlcl9pZGVudGl0eV9pZCIsImpvaW5DbGFzc0NhbGxiYWNrIiwidGVhY2hlckNhbGxiYWNrIiwiY3JlYXRlQ2xhc3NEYXRhIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJjcmVhdGVDbGFzcyIsInNjaG9vbF9pZCIsImdyYWRlX3R5cGUiLCJncmFkZSIsInllYXJfY2xhc3MiLCJ5ZWFyIiwiY2xhc3MiLCJuYW1lIiwiYWRkQ2xhc3NDYWxsYmFjayIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJOdW1iZXIiLCJnZXRDbGFzc0lkZW50aXR5IiwiT2JqZWN0IiwiYXNzaWduIiwidGhlbiIsImNvbW1vbkZuIiwicmVzIiwiY2xhc3NfaWQiLCJzdWNjZXNzIiwic2V0VGltZW91dCIsInN3aXRjaFRhYiIsInVybCIsInNldFN0b3JhZ2UiLCJxcl9jb2RlIiwiam9pbl9rZXkiLCJjbGFzc0hhc0NoYW5nZSIsIm5hdmlnYXRlVG8iLCJ0ZWFjaGVyT2JqIiwiZmlsdGVyIiwiYXBwX3R5cGUiLCJwYXJlbnRMaXN0Iiwic3R1ZGVudCIsImlkZW50aXR5IiwidGVhY2hlciIsInB1c2giLCJpIiwibGVuIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztBQUNBLElBQUlBLFFBQVEsMEJBQVo7O0lBT3FCQyxnQixXQUxwQix3QkFBUTtBQUNQQyxjQURPLHdCQUNNQyxLQUROLEVBQ1k7QUFDakIsV0FBT0EsTUFBTUMsSUFBTixDQUFXRixZQUFsQjtBQUNEO0FBSE0sQ0FBUixDOzs7Ozs7Ozs7Ozs7OzswTUFNQ0csTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxtQkFBYSxDQURSO0FBRUxDLGlCQUFXLEtBRk47QUFHTEMsbUJBQWEsRUFIUjtBQUlMQyxtQkFBYSxFQUpSO0FBS0xDLFlBQU0sRUFMRDtBQU1MQyxrQkFBWSxJQU5QO0FBT0xDLGlCQUFXLElBUE47QUFRTEMsZUFBUyxDQUFDLENBUkw7QUFTTEMsbUJBQWEsQ0FUUjtBQVVMQyx5QkFBbUIsRUFWZDtBQVdMQyxZQUFNLFFBWEQ7QUFZTEMsV0FBSyxFQVpBO0FBYUxDLG1CQUFhLFNBYlI7QUFjTEMseUJBQW1CLENBQ2pCO0FBQ0VDLGlCQUFTLElBRFg7QUFFRUMsZUFBTyxNQUZUO0FBR0VDLGVBQU87QUFIVCxPQURpQixFQU1qQjtBQUNFRixpQkFBUyxLQURYO0FBRUVDLGVBQU8sTUFGVDtBQUdFQyxlQUFPO0FBSFQsT0FOaUI7QUFkZCxLLFFBMkJQQyxLLEdBQVE7QUFD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QU1jLE9BQU87QUFDWGhELHNCQUFjLEtBQUtBLFlBRFI7QUFFWHNCLGVBQU8sRUFGSTtBQUdYMkIscUJBQWE7QUFIRixPQUFiO0FBS0EsV0FBS3ZDLElBQUwsQ0FBVWtGLElBQVYsQ0FBZTVDLElBQWY7QUFDQSxXQUFLZCxNQUFMO0FBQ0Q7OztxQ0FvRWdCO0FBQ2YsVUFBSSxLQUFLaEIsV0FBTCxLQUFxQixTQUFyQixJQUFrQywyQkFBYyxLQUFLVCxXQUFuQixDQUF0QyxFQUF1RTtBQUNyRSw2QkFBUSxvQkFBUjtBQUNBLGVBQU8sS0FBUDtBQUNEO0FBQ0QsYUFBTyxJQUFQO0FBQ0Q7OztnQ0FDVztBQUNWLFVBQUlGLFlBQVksSUFBaEI7QUFDQSxXQUFLLElBQUlzRixJQUFJLENBQVIsRUFBV0MsTUFBTSxLQUFLcEYsSUFBTCxDQUFVZ0IsTUFBaEMsRUFBd0NtRSxJQUFJQyxHQUE1QyxFQUFpREQsR0FBakQsRUFBc0Q7QUFDcEQsWUFBSSwyQkFBYyxLQUFLbkYsSUFBTCxDQUFVbUYsQ0FBVixFQUFhdkUsS0FBM0IsQ0FBSixFQUF1QztBQUNyQ2Ysc0JBQVksS0FBWjtBQUNBO0FBQ0QsU0FIRCxNQUdPO0FBQ0xBLHNCQUFZLElBQVo7QUFDRDtBQUNGO0FBQ0QsYUFBT0EsU0FBUDtBQUNEOzs7O0VBNU4yQ3dGLGVBQUtDLEk7a0JBQTlCakcsZ0IiLCJmaWxlIjoiYmluZFJlbGF0aW9uc2hpcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7IGNvbm5lY3QsIGdldFN0b3JlIH0gZnJvbSAnd2VweS1yZWR1eCdcbmltcG9ydCB7IHNhdmVJZGVudGl0eUxpc3QgfSBmcm9tICcuLi9zdG9yZS9hY3Rpb25zJ1xuaW1wb3J0IHsgZ2V0SWRlbnRpdHlMaXN0LCBiaW5kSWRlbnRpdHksIGlkZW50aXR5TGlzdCwgYmluZFRlYWNoZXIgfSBmcm9tICcuLi9hcGkvdXNlcidcbmltcG9ydCB7IGFkZENsYXNzIH0gZnJvbSAnLi4vYXBpL2NyZWF0ZUNsYXNzJ1xuaW1wb3J0IHsgc2hvd01zZywgaXNFbXB0eVN0cmluZyB9IGZyb20gJy4uL3V0aWxzL2NvbW1vbidcbmxldCBzdG9yZSA9IGdldFN0b3JlKClcblxuQGNvbm5lY3Qoe1xuICByZWxhdGlvbnNoaXAoc3RhdGUpe1xuICAgIHJldHVybiBzdGF0ZS56b25lLnJlbGF0aW9uc2hpcFxuICB9XG59KVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgYmluZFJlbGF0aW9uc2hpcCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6Lqr5Lu957uR5a6aJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgcGFyZW50SW5kZXg6IDAsXG4gICAgY2FuU3VibWl0OiBmYWxzZSxcbiAgICBzdHVkZW50TmFtZTogJycsXG4gICAgdGVhY2hlck5hbWU6ICcnLFxuICAgIGxpc3Q6IFtdLFxuICAgIG1lbWJlckluZm86IG51bGwsXG4gICAgY2xhc3NJbmZvOiBudWxsLFxuICAgIGNsYXNzSWQ6IC0xLFxuICAgIGpvaW5DbGFzc0lkOiAwLFxuICAgIGNsYXNzSWRlbnRpdHlMaXN0OiBbXSxcbiAgICB0eXBlOiAnY3JlYXRlJyxcbiAgICBrZXk6ICcnLFxuICAgIGN1cnJlbnRUeXBlOiAncGFyZW50cycsXG4gICAgcmVsYXRpb25zaGlwVHlwZXM6IFtcbiAgICAgIHtcbiAgICAgICAgY2hlY2tlZDogdHJ1ZSxcbiAgICAgICAgbGFiZWw6ICfmiJHmmK/lrrbplb8nLFxuICAgICAgICB2YWx1ZTogJ3BhcmVudHMnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBjaGVja2VkOiBmYWxzZSxcbiAgICAgICAgbGFiZWw6ICfmiJHmmK/mlZnluIgnLFxuICAgICAgICB2YWx1ZTogJ3RlYWNoZXInXG4gICAgICB9XG4gICAgXVxuICB9XG4gIHdhdGNoID0ge1xuICAgIHJlbGF0aW9uc2hpcChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgIGlmICghb2xkVmFsdWUubGVuZ3RoICYmIG5ld1ZhbHVlLmxlbmd0aCAmJiAodGhpcy50eXBlID09PSAnY3JlYXRlJyB8fCB0aGlzLnR5cGUgPT09ICdqb2luJykpIHtcbiAgICAgICAgLy8g5LuOcmVkdXgtc3RvcmXnrKzkuIDmrKHlj5blgLzvvIzpnIDopoHliJ3lp4vljJbkuIDkuKppbnB1dOi+k+WFpeahhlxuICAgICAgICB0aGlzLmFkZE5ld0ZuKClcbiAgICAgIH1cbiAgICB9LFxuICAgIHN0dWRlbnROYW1lIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgIHRoaXMuY2FuU3VibWl0ID0gIWlzRW1wdHlTdHJpbmcobmV3VmFsdWUpXG4gICAgfVxuICB9XG4gIG9uU2hvdygpIHtcbiAgICAvLyDnrKzkuIDmrKHov5vmnaXliJ3lp4vljJbojrflj5ZyZWxhdGlvbnNoaXDnmoTml7blgJnvvIxsZW5ndGjmraTml7bkuLow77yM5ZKM5LiK6Z2i55qEd2F0Y2jmmK/kuI3kvJrlkIzml7bmiafooYznmoRcbiAgICBpZiAodGhpcy5yZWxhdGlvbnNoaXAubGVuZ3RoICYmICh0aGlzLnR5cGUgPT09ICdjcmVhdGUnIHx8IHRoaXMudHlwZSA9PT0gJ2pvaW4nKSkge1xuICAgICAgdGhpcy5hZGROZXdGbigpXG4gICAgfVxuICB9XG4gIG9uTG9hZChlKSB7XG4gICAgIXRoaXMucmVsYXRpb25zaGlwLmxlbmd0aCAmJiBzYXZlSWRlbnRpdHlMaXN0KClcbiAgICB0aGlzLm1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXG4gICAgdGhpcy5jbGFzc0luZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnY2xhc3NJbmZvJylcbiAgICB0aGlzLmpvaW5DbGFzc0lkID0gTnVtYmVyKGUuaWQpXG4gICAgdGhpcy5rZXkgPSBlLmtleVxuICAgIHRoaXMudHlwZSA9IGUudHlwZVxuICAgIHRoaXMudHlwZSA9PT0gJ2VkaXQnICYmIHRoaXMuZ2V0Q2xhc3NJZGVudGl0eSgpXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIGFkZENsYXNzQ2FsbGJhY2soZGF0YSwgZmlsdGVyTGlzdCkge1xuICAgIGFkZENsYXNzKE9iamVjdC5hc3NpZ24oe30sIGRhdGEsIHtcbiAgICAgIGl0ZW06IGZpbHRlckxpc3RcbiAgICB9KSkudGhlbihyZXMgPT4ge1xuICAgICAgdGhpcy5jb21tb25GbihyZXMpXG4gICAgfSlcbiAgfVxuICBqb2luQ2xhc3NDYWxsYmFjayhpZCwgZmlsdGVyTGlzdCkge1xuICAgIGJpbmRJZGVudGl0eSh7XG4gICAgICBjbGFzc19pZDogaWQsXG4gICAgICBpdGVtOiBmaWx0ZXJMaXN0XG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgc2hvd01zZygn5oiQ5Yqf57uR5a6a6Lqr5Lu9JylcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgd3guc3dpdGNoVGFiKHt1cmw6ICd6b25lJ30pXG4gICAgICAgIH0sIDIwMDApXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICB0ZWFjaGVyQ2FsbGJhY2soKSB7XG4gICAgYmluZFRlYWNoZXIoe1xuICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgbmFtZTogdGhpcy50ZWFjaGVyTmFtZVxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgIHd4LnN3aXRjaFRhYih7dXJsOiAnem9uZSd9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgY29tbW9uRm4ocmVzKSB7XG4gICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgIHNob3dNc2coJ+ePree6p+WIm+W7uuaIkOWKnycpXG4gICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAgICBrZXk6ICdjbGFzc0luZm8nLFxuICAgICAgICBkYXRhOiBkYXRhXG4gICAgICB9KVxuICAgICAgbGV0IHVybCA9IGBjcmVhdGVDbGFzc1N1Y2Nlc3M/bmFtZT0ke2RhdGEubmFtZX0mY29kZT0ke2RhdGEucXJfY29kZX0ma2V5PSR7ZGF0YS5qb2luX2tleX0mY2xhc3NJZD0ke2RhdGEuaWR9YFxuICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuY2xhc3NIYXNDaGFuZ2UgPSB0cnVlXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiB1cmxcbiAgICAgICAgfSlcbiAgICAgIH0sIDEwMDApXG4gICAgfVxuICB9XG4gIGdldENsYXNzSWRlbnRpdHkoKSB7XG4gICAgaWRlbnRpdHlMaXN0KHtcbiAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZFxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIGNvbnN0IGxpc3QgPSByZXMuZGF0YS5saXN0XG4gICAgICBjb25zdCB0ZWFjaGVyT2JqID0gbGlzdC5maWx0ZXIoaXRlbSA9PiBpdGVtLmFwcF90eXBlID09PSAndGVhY2hlcicpXG4gICAgICBjb25zdCBwYXJlbnRMaXN0ID0gbGlzdC5maWx0ZXIoaXRlbSA9PiBpdGVtLmFwcF90eXBlID09PSAnc3R1ZGVudCcpXG4gICAgICB0aGlzLmxpc3QgPSBwYXJlbnRMaXN0Lm1hcChpdGVtID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICByZWxhdGlvbnNoaXA6IHRoaXMucmVsYXRpb25zaGlwLFxuICAgICAgICAgIHZhbHVlOiBpdGVtLnN0dWRlbnQubmFtZSxcbiAgICAgICAgICBhY3RpdmVJbmRleDogaXRlbS5pZGVudGl0eS5pZCAtIDEsXG4gICAgICAgICAgaWQ6IGl0ZW0uaWRcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGlmICh0aGlzLnRlYWNoZXJPYmogJiYgdGhpcy50ZWFjaGVyT2JqLmxlbmd0aCkge1xuICAgICAgICB0aGlzLnRlYWNoZXJOYW1lID0gdGVhY2hlck9ialswXS50ZWFjaGVyLm5hbWVcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9KVxuICB9XG4gIGFkZE5ld0ZuKCkge1xuICAgIGNvbnN0IGl0ZW0gPSB7XG4gICAgICByZWxhdGlvbnNoaXA6IHRoaXMucmVsYXRpb25zaGlwLFxuICAgICAgdmFsdWU6ICcnLFxuICAgICAgYWN0aXZlSW5kZXg6IDBcbiAgICB9XG4gICAgdGhpcy5saXN0LnB1c2goaXRlbSlcbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBwaWNrZXJDaGFuZ2UoZSkge1xuICAgICAgdGhpc1tlLmN1cnJlbnRUYXJnZXQuaWRdID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGRlbGV0ZShpZHgpIHtcbiAgICAgIHRoaXMubGlzdC5zcGxpY2UoaWR4LCAxKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgYWRkTmV3KCkge1xuICAgICAgdGhpcy5hZGROZXdGbigpXG4gICAgfSxcbiAgICBiaW5kRm9ybShlKSB7XG4gICAgICBjb25zdCB0YXJnZXQgPSBlLmN1cnJlbnRUYXJnZXRcbiAgICAgIGNvbnN0IGlkeCA9IHRhcmdldC5kYXRhc2V0LmlkeFxuICAgICAgdGhpcy5saXN0W2lkeF1bdGFyZ2V0LmlkXSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBzdWJtaXQoKSB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50VHlwZSA9PT0gJ3BhcmVudHMnICYmICF0aGlzLmNoZWNrRGF0YSgpKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+Whq+WGmeaCqOWtqeWtkOWnk+WQjScpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdGhpcy5jaGVja0NhblN1Ym1pdCgpXG4gICAgICBsZXQgZmlsdGVyTGlzdCA9IHRoaXMubGlzdC5tYXAoaXRlbSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaWRlbnRpdHlfaWQ6IGl0ZW0ucmVsYXRpb25zaGlwW2l0ZW0uYWN0aXZlSW5kZXhdLmlkLFxuICAgICAgICAgIHN0dWRlbnRfbmFtZTogaXRlbS52YWx1ZSxcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdlZGl0JyAmJiB0aGlzLmN1cnJlbnRUeXBlPT09ICdwYXJlbnRzJykgeyAvLyDlpoLmnpzmmK/nm7TmjqXkv67mlLnouqvku73nu5HlrppcbiAgICAgICAgZmlsdGVyTGlzdCA9IHRoaXMubGlzdC5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkZW50aXR5X2lkOiBpdGVtLnJlbGF0aW9uc2hpcFtpdGVtLmFjdGl2ZUluZGV4XS5pZCxcbiAgICAgICAgICAgIHN0dWRlbnRfbmFtZTogaXRlbS52YWx1ZSxcbiAgICAgICAgICAgIG1lbWJlcl9pZGVudGl0eV9pZDogaXRlbS5pZFxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5qb2luQ2xhc3NDYWxsYmFjayh0aGlzLmNsYXNzSW5mby5pZCwgZmlsdGVyTGlzdClcbiAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSAnZWRpdCcgJiYgdGhpcy5jdXJyZW50VHlwZSA9PT0gJ3RlYWNoZXInKSB7Ly8g5aaC5p6c5piv55u05o6l5L+u5pS56Lqr5Lu957uR5a6aXG4gICAgICAgIHRoaXMudGVhY2hlckNhbGxiYWNrKClcbiAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSAnY3JlYXRlJykgeyAvLyDlpoLmnpzmmK/liJvlu7rnj63nuqflvpdcbiAgICAgICAgbGV0IGNyZWF0ZUNsYXNzRGF0YSA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmNyZWF0ZUNsYXNzXG4gICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgIHNjaG9vbF9pZDogY3JlYXRlQ2xhc3NEYXRhLnNjaG9vbF9pZCxcbiAgICAgICAgICBncmFkZV90eXBlOiBjcmVhdGVDbGFzc0RhdGEuZ3JhZGUsXG4gICAgICAgICAgeWVhcl9jbGFzczogY3JlYXRlQ2xhc3NEYXRhLnllYXIsXG4gICAgICAgICAgY2xhc3M6IGNyZWF0ZUNsYXNzRGF0YS5jbGFzc1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRUeXBlID09PSAndGVhY2hlcicpIHtcbiAgICAgICAgICBsZXQgaXRlbSA9IHtcbiAgICAgICAgICAgIHR5cGU6ICd0ZWFjaGVyJyxcbiAgICAgICAgICAgIGxpc3Q6IFt7bmFtZTogdGhpcy50ZWFjaGVyTmFtZX1dXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYWRkQ2xhc3NDYWxsYmFjayhkYXRhLCBpdGVtKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxldCBpdGVtID0ge1xuICAgICAgICAgICAgdHlwZTogJ3BhcnRpYXJjaCcsXG4gICAgICAgICAgICBsaXN0OiBmaWx0ZXJMaXN0XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYWRkQ2xhc3NDYWxsYmFjayhkYXRhLCBpdGVtKVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gJ2pvaW4nICYmIHRoaXMuY3VycmVudFR5cGUgPT09ICdwYXJlbnRzJykgeyAvLyDlpoLmnpzmmK/liqDlhaXnj63nuqdcbiAgICAgICAgdGhpcy5qb2luQ2xhc3NDYWxsYmFjayh0aGlzLmpvaW5DbGFzc0lkLCBmaWx0ZXJMaXN0KVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBjaGVja0NhblN1Ym1pdCgpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50VHlwZSA9PT0gJ3RlYWNoZXInICYmIGlzRW1wdHlTdHJpbmcodGhpcy50ZWFjaGVyTmFtZSkpIHtcbiAgICAgIHNob3dNc2coJ+WmguaenOaCqOWLvumAieS6huiAgeW4iOi6q+S7ve+8jOivt+Whq+WGmeaCqOeahOWnk+WQjScpXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuICBjaGVja0RhdGEoKSB7XG4gICAgbGV0IGNhblN1Ym1pdCA9IHRydWVcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5saXN0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBpZiAoaXNFbXB0eVN0cmluZyh0aGlzLmxpc3RbaV0udmFsdWUpKSB7XG4gICAgICAgIGNhblN1Ym1pdCA9IGZhbHNlXG4gICAgICAgIGJyZWFrXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYW5TdWJtaXQgPSB0cnVlXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjYW5TdWJtaXRcbiAgfVxufVxuIl19