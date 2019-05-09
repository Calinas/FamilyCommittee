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
      var _this3 = this;

      (0, _user.bindIdentity)({
        class_id: id,
        item: filterList
      }).then(function (res) {
        if (res.data.success) {
          if (_this3.type === 'join') {
            (0, _actions.setClassChanged)(true);
            (0, _actions.getClass)();
          }
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
        (0, _actions.setClassChanged)(true);
        (0, _actions.getClass)();
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
        if (_this4.teacherObj && _this4.teacherObj.length) {
          _this4.teacherName = teacherObj[0].teacher.name;
        }
        _this4.$apply();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJpbmRSZWxhdGlvbnNoaXAuanMiXSwibmFtZXMiOlsiYmluZFJlbGF0aW9uc2hpcCIsInJlbGF0aW9uc2hpcCIsInN0YXRlIiwiem9uZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwicGFyZW50SW5kZXgiLCJjYW5TdWJtaXQiLCJzdHVkZW50TmFtZSIsInRlYWNoZXJOYW1lIiwibGlzdCIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJjbGFzc0lkIiwiam9pbkNsYXNzSWQiLCJjbGFzc0lkZW50aXR5TGlzdCIsInR5cGUiLCJrZXkiLCJjdXJyZW50VHlwZSIsInJlbGF0aW9uc2hpcFR5cGVzIiwiY2hlY2tlZCIsImxhYmVsIiwidmFsdWUiLCJ3YXRjaCIsIm5ld1ZhbHVlIiwib2xkVmFsdWUiLCJsZW5ndGgiLCJhZGROZXdGbiIsIm1ldGhvZHMiLCJwaWNrZXJDaGFuZ2UiLCJlIiwiY3VycmVudFRhcmdldCIsImlkIiwiZGV0YWlsIiwiJGFwcGx5IiwiZGVsZXRlIiwiaWR4Iiwic3BsaWNlIiwiYWRkTmV3IiwiYmluZEZvcm0iLCJ0YXJnZXQiLCJkYXRhc2V0Iiwic3VibWl0IiwiY2hlY2tEYXRhIiwiY2hlY2tDYW5TdWJtaXQiLCJmaWx0ZXJMaXN0IiwibWFwIiwiaWRlbnRpdHlfaWQiLCJpdGVtIiwiYWN0aXZlSW5kZXgiLCJzdHVkZW50X25hbWUiLCJtZW1iZXJfaWRlbnRpdHlfaWQiLCJqb2luQ2xhc3NDYWxsYmFjayIsInRlYWNoZXJDYWxsYmFjayIsImNyZWF0ZUNsYXNzRGF0YSIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiY3JlYXRlQ2xhc3MiLCJzY2hvb2xfaWQiLCJncmFkZV90eXBlIiwiZ3JhZGUiLCJ5ZWFyX2NsYXNzIiwieWVhciIsImNsYXNzIiwibmFtZSIsImFkZENsYXNzQ2FsbGJhY2siLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwiTnVtYmVyIiwiZ2V0Q2xhc3NJZGVudGl0eSIsIk9iamVjdCIsImFzc2lnbiIsInRoZW4iLCJjb21tb25GbiIsInJlcyIsImNsYXNzX2lkIiwic3VjY2VzcyIsInNldFRpbWVvdXQiLCJzd2l0Y2hUYWIiLCJ1cmwiLCJzZXRTdG9yYWdlIiwicXJfY29kZSIsImpvaW5fa2V5IiwibmF2aWdhdGVUbyIsInRlYWNoZXJPYmoiLCJmaWx0ZXIiLCJhcHBfdHlwZSIsInBhcmVudExpc3QiLCJzdHVkZW50IiwiaWRlbnRpdHkiLCJ0ZWFjaGVyIiwicHVzaCIsImkiLCJsZW4iLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBT3FCQSxnQixXQUxwQix3QkFBUTtBQUNQQyxjQURPLHdCQUNNQyxLQUROLEVBQ1k7QUFDakIsV0FBT0EsTUFBTUMsSUFBTixDQUFXRixZQUFsQjtBQUNEO0FBSE0sQ0FBUixDOzs7Ozs7Ozs7Ozs7OzswTUFNQ0csTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxtQkFBYSxDQURSO0FBRUxDLGlCQUFXLEtBRk47QUFHTEMsbUJBQWEsRUFIUjtBQUlMQyxtQkFBYSxFQUpSO0FBS0xDLFlBQU0sRUFMRDtBQU1MQyxrQkFBWSxJQU5QO0FBT0xDLGlCQUFXLElBUE47QUFRTEMsZUFBUyxDQUFDLENBUkw7QUFTTEMsbUJBQWEsQ0FUUjtBQVVMQyx5QkFBbUIsRUFWZDtBQVdMQyxZQUFNLFFBWEQ7QUFZTEMsV0FBSyxFQVpBO0FBYUxDLG1CQUFhLFNBYlI7QUFjTEMseUJBQW1CLENBQ2pCO0FBQ0VDLGlCQUFTLElBRFg7QUFFRUMsZUFBTyxNQUZUO0FBR0VDLGVBQU87QUFIVCxPQURpQixFQU1qQjtBQUNFRixpQkFBUyxLQURYO0FBRUVDLGVBQU8sTUFGVDtBQUdFQyxlQUFPO0FBSFQsT0FOaUI7QUFkZCxLLFFBMkJQQyxLLEdBQVE7QUFDTnZCLGtCQURNLHdCQUNPd0IsUUFEUCxFQUNpQkMsUUFEakIsRUFDMkI7QUFDL0Is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LE9BQU87QUFDWGhELHNCQUFjLEtBQUtBLFlBRFI7QUFFWHNCLGVBQU8sRUFGSTtBQUdYMkIscUJBQWE7QUFIRixPQUFiO0FBS0EsV0FBS3ZDLElBQUwsQ0FBVWlGLElBQVYsQ0FBZTNDLElBQWY7QUFDQSxXQUFLZCxNQUFMO0FBQ0Q7OztxQ0FvRWdCO0FBQ2YsVUFBSSxLQUFLaEIsV0FBTCxLQUFxQixTQUFyQixJQUFrQywyQkFBYyxLQUFLVCxXQUFuQixDQUF0QyxFQUF1RTtBQUNyRSw2QkFBUSxvQkFBUjtBQUNBLGVBQU8sS0FBUDtBQUNEO0FBQ0QsYUFBTyxJQUFQO0FBQ0Q7OztnQ0FDVztBQUNWLFVBQUlGLFlBQVksSUFBaEI7QUFDQSxXQUFLLElBQUlxRixJQUFJLENBQVIsRUFBV0MsTUFBTSxLQUFLbkYsSUFBTCxDQUFVZ0IsTUFBaEMsRUFBd0NrRSxJQUFJQyxHQUE1QyxFQUFpREQsR0FBakQsRUFBc0Q7QUFDcEQsWUFBSSwyQkFBYyxLQUFLbEYsSUFBTCxDQUFVa0YsQ0FBVixFQUFhdEUsS0FBM0IsQ0FBSixFQUF1QztBQUNyQ2Ysc0JBQVksS0FBWjtBQUNBO0FBQ0QsU0FIRCxNQUdPO0FBQ0xBLHNCQUFZLElBQVo7QUFDRDtBQUNGO0FBQ0QsYUFBT0EsU0FBUDtBQUNEOzs7O0VBak8yQ3VGLGVBQUtDLEk7a0JBQTlCaEcsZ0IiLCJmaWxlIjoiYmluZFJlbGF0aW9uc2hpcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7IGNvbm5lY3QsIGdldFN0b3JlIH0gZnJvbSAnd2VweS1yZWR1eCdcbmltcG9ydCB7IHNhdmVJZGVudGl0eUxpc3QsIHNldENsYXNzQ2hhbmdlZCwgZ2V0Q2xhc3MgfSBmcm9tICdzdG9yZS9hY3Rpb25zJ1xuaW1wb3J0IHsgYmluZElkZW50aXR5LCBpZGVudGl0eUxpc3QsIGJpbmRUZWFjaGVyIH0gZnJvbSAnLi4vYXBpL3VzZXInXG5pbXBvcnQgeyBhZGRDbGFzcyB9IGZyb20gJy4uL2FwaS9jcmVhdGVDbGFzcydcbmltcG9ydCB7IHNob3dNc2csIGlzRW1wdHlTdHJpbmcgfSBmcm9tICcuLi91dGlscy9jb21tb24nXG5cbkBjb25uZWN0KHtcbiAgcmVsYXRpb25zaGlwKHN0YXRlKXtcbiAgICByZXR1cm4gc3RhdGUuem9uZS5yZWxhdGlvbnNoaXBcbiAgfVxufSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGJpbmRSZWxhdGlvbnNoaXAgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+i6q+S7vee7keWumidcbiAgfVxuICBkYXRhID0ge1xuICAgIHBhcmVudEluZGV4OiAwLFxuICAgIGNhblN1Ym1pdDogZmFsc2UsXG4gICAgc3R1ZGVudE5hbWU6ICcnLFxuICAgIHRlYWNoZXJOYW1lOiAnJyxcbiAgICBsaXN0OiBbXSxcbiAgICBtZW1iZXJJbmZvOiBudWxsLFxuICAgIGNsYXNzSW5mbzogbnVsbCxcbiAgICBjbGFzc0lkOiAtMSxcbiAgICBqb2luQ2xhc3NJZDogMCxcbiAgICBjbGFzc0lkZW50aXR5TGlzdDogW10sXG4gICAgdHlwZTogJ2NyZWF0ZScsXG4gICAga2V5OiAnJyxcbiAgICBjdXJyZW50VHlwZTogJ3BhcmVudHMnLFxuICAgIHJlbGF0aW9uc2hpcFR5cGVzOiBbXG4gICAgICB7XG4gICAgICAgIGNoZWNrZWQ6IHRydWUsXG4gICAgICAgIGxhYmVsOiAn5oiR5piv5a626ZW/JyxcbiAgICAgICAgdmFsdWU6ICdwYXJlbnRzJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgY2hlY2tlZDogZmFsc2UsXG4gICAgICAgIGxhYmVsOiAn5oiR5piv5pWZ5biIJyxcbiAgICAgICAgdmFsdWU6ICd0ZWFjaGVyJ1xuICAgICAgfVxuICAgIF1cbiAgfVxuICB3YXRjaCA9IHtcbiAgICByZWxhdGlvbnNoaXAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICBpZiAoIW9sZFZhbHVlLmxlbmd0aCAmJiBuZXdWYWx1ZS5sZW5ndGggJiYgKHRoaXMudHlwZSA9PT0gJ2NyZWF0ZScgfHwgdGhpcy50eXBlID09PSAnam9pbicpKSB7XG4gICAgICAgIC8vIOS7jnJlZHV4LXN0b3Jl56ys5LiA5qyh5Y+W5YC877yM6ZyA6KaB5Yid5aeL5YyW5LiA5LiqaW5wdXTovpPlhaXmoYZcbiAgICAgICAgdGhpcy5hZGROZXdGbigpXG4gICAgICB9XG4gICAgfSxcbiAgICBzdHVkZW50TmFtZSAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICB0aGlzLmNhblN1Ym1pdCA9ICFpc0VtcHR5U3RyaW5nKG5ld1ZhbHVlKVxuICAgIH1cbiAgfVxuICBvblNob3coKSB7XG4gICAgLy8g56ys5LiA5qyh6L+b5p2l5Yid5aeL5YyW6I635Y+WcmVsYXRpb25zaGlw55qE5pe25YCZ77yMbGVuZ3Ro5q2k5pe25Li6MO+8jOWSjOS4iumdoueahHdhdGNo5piv5LiN5Lya5ZCM5pe25omn6KGM55qEXG4gICAgaWYgKHRoaXMucmVsYXRpb25zaGlwLmxlbmd0aCAmJiAodGhpcy50eXBlID09PSAnY3JlYXRlJyB8fCB0aGlzLnR5cGUgPT09ICdqb2luJykpIHtcbiAgICAgIHRoaXMuYWRkTmV3Rm4oKVxuICAgIH1cbiAgfVxuICBvbkxvYWQoZSkge1xuICAgICF0aGlzLnJlbGF0aW9uc2hpcC5sZW5ndGggJiYgc2F2ZUlkZW50aXR5TGlzdCgpXG4gICAgdGhpcy5tZW1iZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nKVxuICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXG4gICAgdGhpcy5qb2luQ2xhc3NJZCA9IE51bWJlcihlLmlkKVxuICAgIHRoaXMua2V5ID0gZS5rZXlcbiAgICB0aGlzLnR5cGUgPSBlLnR5cGVcbiAgICB0aGlzLnR5cGUgPT09ICdlZGl0JyAmJiB0aGlzLmdldENsYXNzSWRlbnRpdHkoKVxuICAgIHRoaXMuJGFwcGx5KClcbiAgfVxuICBhZGRDbGFzc0NhbGxiYWNrKGRhdGEsIGZpbHRlckxpc3QpIHtcbiAgICBhZGRDbGFzcyhPYmplY3QuYXNzaWduKHt9LCBkYXRhLCB7XG4gICAgICBpdGVtOiBmaWx0ZXJMaXN0XG4gICAgfSkpLnRoZW4ocmVzID0+IHtcbiAgICAgIHRoaXMuY29tbW9uRm4ocmVzKVxuICAgIH0pXG4gIH1cbiAgam9pbkNsYXNzQ2FsbGJhY2soaWQsIGZpbHRlckxpc3QpIHtcbiAgICBiaW5kSWRlbnRpdHkoe1xuICAgICAgY2xhc3NfaWQ6IGlkLFxuICAgICAgaXRlbTogZmlsdGVyTGlzdFxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdqb2luJykge1xuICAgICAgICAgIHNldENsYXNzQ2hhbmdlZCh0cnVlKVxuICAgICAgICAgIGdldENsYXNzKClcbiAgICAgICAgfVxuICAgICAgICBzaG93TXNnKCfmiJDlip/nu5Hlrprouqvku70nKVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB3eC5zd2l0Y2hUYWIoe3VybDogJ3pvbmUnfSlcbiAgICAgICAgfSwgMjAwMClcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIHRlYWNoZXJDYWxsYmFjaygpIHtcbiAgICBiaW5kVGVhY2hlcih7XG4gICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXG4gICAgICBuYW1lOiB0aGlzLnRlYWNoZXJOYW1lXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgd3guc3dpdGNoVGFiKHt1cmw6ICd6b25lJ30pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBjb21tb25GbihyZXMpIHtcbiAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgc2hvd01zZygn54+t57qn5Yib5bu65oiQ5YqfJylcbiAgICAgIGxldCBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgd3guc2V0U3RvcmFnZSh7XG4gICAgICAgIGtleTogJ2NsYXNzSW5mbycsXG4gICAgICAgIGRhdGE6IGRhdGFcbiAgICAgIH0pXG4gICAgICBsZXQgdXJsID0gYGNyZWF0ZUNsYXNzU3VjY2Vzcz9uYW1lPSR7ZGF0YS5uYW1lfSZjb2RlPSR7ZGF0YS5xcl9jb2RlfSZrZXk9JHtkYXRhLmpvaW5fa2V5fSZjbGFzc0lkPSR7ZGF0YS5pZH1gXG4gICAgICBzZXRDbGFzc0NoYW5nZWQodHJ1ZSlcbiAgICAgIGdldENsYXNzKClcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6IHVybFxuICAgICAgICB9KVxuICAgICAgfSwgMTAwMClcbiAgICB9XG4gIH1cbiAgZ2V0Q2xhc3NJZGVudGl0eSgpIHtcbiAgICBpZGVudGl0eUxpc3Qoe1xuICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgY29uc3QgbGlzdCA9IHJlcy5kYXRhLmxpc3RcbiAgICAgIGNvbnN0IHRlYWNoZXJPYmogPSBsaXN0LmZpbHRlcihpdGVtID0+IGl0ZW0uYXBwX3R5cGUgPT09ICd0ZWFjaGVyJylcbiAgICAgIGNvbnN0IHBhcmVudExpc3QgPSBsaXN0LmZpbHRlcihpdGVtID0+IGl0ZW0uYXBwX3R5cGUgPT09ICdzdHVkZW50JylcbiAgICAgIHRoaXMubGlzdCA9IHBhcmVudExpc3QubWFwKGl0ZW0gPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHJlbGF0aW9uc2hpcDogdGhpcy5yZWxhdGlvbnNoaXAsXG4gICAgICAgICAgdmFsdWU6IGl0ZW0uc3R1ZGVudC5uYW1lLFxuICAgICAgICAgIGFjdGl2ZUluZGV4OiBpdGVtLmlkZW50aXR5LmlkIC0gMSxcbiAgICAgICAgICBpZDogaXRlbS5pZFxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgaWYgKHRoaXMudGVhY2hlck9iaiAmJiB0aGlzLnRlYWNoZXJPYmoubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMudGVhY2hlck5hbWUgPSB0ZWFjaGVyT2JqWzBdLnRlYWNoZXIubmFtZVxuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0pXG4gIH1cbiAgYWRkTmV3Rm4oKSB7XG4gICAgY29uc3QgaXRlbSA9IHtcbiAgICAgIHJlbGF0aW9uc2hpcDogdGhpcy5yZWxhdGlvbnNoaXAsXG4gICAgICB2YWx1ZTogJycsXG4gICAgICBhY3RpdmVJbmRleDogMFxuICAgIH1cbiAgICB0aGlzLmxpc3QucHVzaChpdGVtKVxuICAgIHRoaXMuJGFwcGx5KClcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIHBpY2tlckNoYW5nZShlKSB7XG4gICAgICB0aGlzW2UuY3VycmVudFRhcmdldC5pZF0gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgZGVsZXRlKGlkeCkge1xuICAgICAgdGhpcy5saXN0LnNwbGljZShpZHgsIDEpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBhZGROZXcoKSB7XG4gICAgICB0aGlzLmFkZE5ld0ZuKClcbiAgICB9LFxuICAgIGJpbmRGb3JtKGUpIHtcbiAgICAgIGNvbnN0IHRhcmdldCA9IGUuY3VycmVudFRhcmdldFxuICAgICAgY29uc3QgaWR4ID0gdGFyZ2V0LmRhdGFzZXQuaWR4XG4gICAgICB0aGlzLmxpc3RbaWR4XVt0YXJnZXQuaWRdID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIHN1Ym1pdCgpIHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRUeXBlID09PSAncGFyZW50cycgJiYgIXRoaXMuY2hlY2tEYXRhKCkpIHtcbiAgICAgICAgc2hvd01zZygn6K+35aGr5YaZ5oKo5a2p5a2Q5aeT5ZCNJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB0aGlzLmNoZWNrQ2FuU3VibWl0KClcbiAgICAgIGxldCBmaWx0ZXJMaXN0ID0gdGhpcy5saXN0Lm1hcChpdGVtID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBpZGVudGl0eV9pZDogaXRlbS5yZWxhdGlvbnNoaXBbaXRlbS5hY3RpdmVJbmRleF0uaWQsXG4gICAgICAgICAgc3R1ZGVudF9uYW1lOiBpdGVtLnZhbHVlLFxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ2VkaXQnICYmIHRoaXMuY3VycmVudFR5cGU9PT0gJ3BhcmVudHMnKSB7IC8vIOWmguaenOaYr+ebtOaOpeS/ruaUuei6q+S7vee7keWumlxuICAgICAgICBmaWx0ZXJMaXN0ID0gdGhpcy5saXN0Lm1hcChpdGVtID0+IHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWRlbnRpdHlfaWQ6IGl0ZW0ucmVsYXRpb25zaGlwW2l0ZW0uYWN0aXZlSW5kZXhdLmlkLFxuICAgICAgICAgICAgc3R1ZGVudF9uYW1lOiBpdGVtLnZhbHVlLFxuICAgICAgICAgICAgbWVtYmVyX2lkZW50aXR5X2lkOiBpdGVtLmlkXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLmpvaW5DbGFzc0NhbGxiYWNrKHRoaXMuY2xhc3NJbmZvLmlkLCBmaWx0ZXJMaXN0KVxuICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09ICdlZGl0JyAmJiB0aGlzLmN1cnJlbnRUeXBlID09PSAndGVhY2hlcicpIHsvLyDlpoLmnpzmmK/nm7TmjqXkv67mlLnouqvku73nu5HlrppcbiAgICAgICAgdGhpcy50ZWFjaGVyQ2FsbGJhY2soKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09ICdjcmVhdGUnKSB7IC8vIOWmguaenOaYr+WIm+W7uuePree6p+W+l1xuICAgICAgICBsZXQgY3JlYXRlQ2xhc3NEYXRhID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuY3JlYXRlQ2xhc3NcbiAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgc2Nob29sX2lkOiBjcmVhdGVDbGFzc0RhdGEuc2Nob29sX2lkLFxuICAgICAgICAgIGdyYWRlX3R5cGU6IGNyZWF0ZUNsYXNzRGF0YS5ncmFkZSxcbiAgICAgICAgICB5ZWFyX2NsYXNzOiBjcmVhdGVDbGFzc0RhdGEueWVhcixcbiAgICAgICAgICBjbGFzczogY3JlYXRlQ2xhc3NEYXRhLmNsYXNzXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFR5cGUgPT09ICd0ZWFjaGVyJykge1xuICAgICAgICAgIGxldCBpdGVtID0ge1xuICAgICAgICAgICAgdHlwZTogJ3RlYWNoZXInLFxuICAgICAgICAgICAgbGlzdDogW3tuYW1lOiB0aGlzLnRlYWNoZXJOYW1lfV1cbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hZGRDbGFzc0NhbGxiYWNrKGRhdGEsIGl0ZW0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IGl0ZW0gPSB7XG4gICAgICAgICAgICB0eXBlOiAncGFydGlhcmNoJyxcbiAgICAgICAgICAgIGxpc3Q6IGZpbHRlckxpc3RcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hZGRDbGFzc0NhbGxiYWNrKGRhdGEsIGl0ZW0pXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSAnam9pbicgJiYgdGhpcy5jdXJyZW50VHlwZSA9PT0gJ3BhcmVudHMnKSB7IC8vIOWmguaenOaYr+WKoOWFpeePree6p1xuICAgICAgICB0aGlzLmpvaW5DbGFzc0NhbGxiYWNrKHRoaXMuam9pbkNsYXNzSWQsIGZpbHRlckxpc3QpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIGNoZWNrQ2FuU3VibWl0KCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRUeXBlID09PSAndGVhY2hlcicgJiYgaXNFbXB0eVN0cmluZyh0aGlzLnRlYWNoZXJOYW1lKSkge1xuICAgICAgc2hvd01zZygn5aaC5p6c5oKo5Yu+6YCJ5LqG6ICB5biI6Lqr5Lu977yM6K+35aGr5YaZ5oKo55qE5aeT5ZCNJylcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG4gIGNoZWNrRGF0YSgpIHtcbiAgICBsZXQgY2FuU3VibWl0ID0gdHJ1ZVxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLmxpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmIChpc0VtcHR5U3RyaW5nKHRoaXMubGlzdFtpXS52YWx1ZSkpIHtcbiAgICAgICAgY2FuU3VibWl0ID0gZmFsc2VcbiAgICAgICAgYnJlYWtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhblN1Ym1pdCA9IHRydWVcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNhblN1Ym1pdFxuICB9XG59XG4iXX0=