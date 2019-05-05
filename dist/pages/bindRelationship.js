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
        (0, _actions.setClassChanged)(true);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJpbmRSZWxhdGlvbnNoaXAuanMiXSwibmFtZXMiOlsiYmluZFJlbGF0aW9uc2hpcCIsInJlbGF0aW9uc2hpcCIsInN0YXRlIiwiem9uZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwicGFyZW50SW5kZXgiLCJjYW5TdWJtaXQiLCJzdHVkZW50TmFtZSIsInRlYWNoZXJOYW1lIiwibGlzdCIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJjbGFzc0lkIiwiam9pbkNsYXNzSWQiLCJjbGFzc0lkZW50aXR5TGlzdCIsInR5cGUiLCJrZXkiLCJjdXJyZW50VHlwZSIsInJlbGF0aW9uc2hpcFR5cGVzIiwiY2hlY2tlZCIsImxhYmVsIiwidmFsdWUiLCJ3YXRjaCIsIm5ld1ZhbHVlIiwib2xkVmFsdWUiLCJsZW5ndGgiLCJhZGROZXdGbiIsIm1ldGhvZHMiLCJwaWNrZXJDaGFuZ2UiLCJlIiwiY3VycmVudFRhcmdldCIsImlkIiwiZGV0YWlsIiwiJGFwcGx5IiwiZGVsZXRlIiwiaWR4Iiwic3BsaWNlIiwiYWRkTmV3IiwiYmluZEZvcm0iLCJ0YXJnZXQiLCJkYXRhc2V0Iiwic3VibWl0IiwiY2hlY2tEYXRhIiwiY2hlY2tDYW5TdWJtaXQiLCJmaWx0ZXJMaXN0IiwibWFwIiwiaWRlbnRpdHlfaWQiLCJpdGVtIiwiYWN0aXZlSW5kZXgiLCJzdHVkZW50X25hbWUiLCJtZW1iZXJfaWRlbnRpdHlfaWQiLCJqb2luQ2xhc3NDYWxsYmFjayIsInRlYWNoZXJDYWxsYmFjayIsImNyZWF0ZUNsYXNzRGF0YSIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiY3JlYXRlQ2xhc3MiLCJzY2hvb2xfaWQiLCJncmFkZV90eXBlIiwiZ3JhZGUiLCJ5ZWFyX2NsYXNzIiwieWVhciIsImNsYXNzIiwibmFtZSIsImFkZENsYXNzQ2FsbGJhY2siLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwiTnVtYmVyIiwiZ2V0Q2xhc3NJZGVudGl0eSIsIk9iamVjdCIsImFzc2lnbiIsInRoZW4iLCJjb21tb25GbiIsInJlcyIsImNsYXNzX2lkIiwic3VjY2VzcyIsInNldFRpbWVvdXQiLCJzd2l0Y2hUYWIiLCJ1cmwiLCJzZXRTdG9yYWdlIiwicXJfY29kZSIsImpvaW5fa2V5IiwibmF2aWdhdGVUbyIsInRlYWNoZXJPYmoiLCJmaWx0ZXIiLCJhcHBfdHlwZSIsInBhcmVudExpc3QiLCJzdHVkZW50IiwiaWRlbnRpdHkiLCJ0ZWFjaGVyIiwicHVzaCIsImkiLCJsZW4iLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBT3FCQSxnQixXQUxwQix3QkFBUTtBQUNQQyxjQURPLHdCQUNNQyxLQUROLEVBQ1k7QUFDakIsV0FBT0EsTUFBTUMsSUFBTixDQUFXRixZQUFsQjtBQUNEO0FBSE0sQ0FBUixDOzs7Ozs7Ozs7Ozs7OzswTUFNQ0csTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxtQkFBYSxDQURSO0FBRUxDLGlCQUFXLEtBRk47QUFHTEMsbUJBQWEsRUFIUjtBQUlMQyxtQkFBYSxFQUpSO0FBS0xDLFlBQU0sRUFMRDtBQU1MQyxrQkFBWSxJQU5QO0FBT0xDLGlCQUFXLElBUE47QUFRTEMsZUFBUyxDQUFDLENBUkw7QUFTTEMsbUJBQWEsQ0FUUjtBQVVMQyx5QkFBbUIsRUFWZDtBQVdMQyxZQUFNLFFBWEQ7QUFZTEMsV0FBSyxFQVpBO0FBYUxDLG1CQUFhLFNBYlI7QUFjTEMseUJBQW1CLENBQ2pCO0FBQ0VDLGlCQUFTLElBRFg7QUFFRUMsZUFBTyxNQUZUO0FBR0VDLGVBQU87QUFIVCxPQURpQixFQU1qQjtBQUNFRixpQkFBUyxLQURYO0FBRUVDLGVBQU8sTUFGVDtBQUdFQyxlQUFPO0FBSFQsT0FOaUI7QUFkZCxLLFFBMkJQQyxLLEdBQVE7QUFDTnZCLGtCQURNLHdCQUNPd0IsUUFEUCxFQUNpQkMsUUFEakIsRUFDMkI7QUFDL0Is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QyxJQUFMLENBQVVpRixJQUFWLENBQWUzQyxJQUFmO0FBQ0EsV0FBS2QsTUFBTDtBQUNEOzs7cUNBb0VnQjtBQUNmLFVBQUksS0FBS2hCLFdBQUwsS0FBcUIsU0FBckIsSUFBa0MsMkJBQWMsS0FBS1QsV0FBbkIsQ0FBdEMsRUFBdUU7QUFDckUsNkJBQVEsb0JBQVI7QUFDQSxlQUFPLEtBQVA7QUFDRDtBQUNELGFBQU8sSUFBUDtBQUNEOzs7Z0NBQ1c7QUFDVixVQUFJRixZQUFZLElBQWhCO0FBQ0EsV0FBSyxJQUFJcUYsSUFBSSxDQUFSLEVBQVdDLE1BQU0sS0FBS25GLElBQUwsQ0FBVWdCLE1BQWhDLEVBQXdDa0UsSUFBSUMsR0FBNUMsRUFBaURELEdBQWpELEVBQXNEO0FBQ3BELFlBQUksMkJBQWMsS0FBS2xGLElBQUwsQ0FBVWtGLENBQVYsRUFBYXRFLEtBQTNCLENBQUosRUFBdUM7QUFDckNmLHNCQUFZLEtBQVo7QUFDQTtBQUNELFNBSEQsTUFHTztBQUNMQSxzQkFBWSxJQUFaO0FBQ0Q7QUFDRjtBQUNELGFBQU9BLFNBQVA7QUFDRDs7OztFQTVOMkN1RixlQUFLQyxJO2tCQUE5QmhHLGdCIiwiZmlsZSI6ImJpbmRSZWxhdGlvbnNoaXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgeyBjb25uZWN0LCBnZXRTdG9yZSB9IGZyb20gJ3dlcHktcmVkdXgnXG5pbXBvcnQgeyBzYXZlSWRlbnRpdHlMaXN0LCBzZXRDbGFzc0NoYW5nZWQgfSBmcm9tICdzdG9yZS9hY3Rpb25zJ1xuaW1wb3J0IHsgYmluZElkZW50aXR5LCBpZGVudGl0eUxpc3QsIGJpbmRUZWFjaGVyIH0gZnJvbSAnLi4vYXBpL3VzZXInXG5pbXBvcnQgeyBhZGRDbGFzcyB9IGZyb20gJy4uL2FwaS9jcmVhdGVDbGFzcydcbmltcG9ydCB7IHNob3dNc2csIGlzRW1wdHlTdHJpbmcgfSBmcm9tICcuLi91dGlscy9jb21tb24nXG5cbkBjb25uZWN0KHtcbiAgcmVsYXRpb25zaGlwKHN0YXRlKXtcbiAgICByZXR1cm4gc3RhdGUuem9uZS5yZWxhdGlvbnNoaXBcbiAgfVxufSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGJpbmRSZWxhdGlvbnNoaXAgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+i6q+S7vee7keWumidcbiAgfVxuICBkYXRhID0ge1xuICAgIHBhcmVudEluZGV4OiAwLFxuICAgIGNhblN1Ym1pdDogZmFsc2UsXG4gICAgc3R1ZGVudE5hbWU6ICcnLFxuICAgIHRlYWNoZXJOYW1lOiAnJyxcbiAgICBsaXN0OiBbXSxcbiAgICBtZW1iZXJJbmZvOiBudWxsLFxuICAgIGNsYXNzSW5mbzogbnVsbCxcbiAgICBjbGFzc0lkOiAtMSxcbiAgICBqb2luQ2xhc3NJZDogMCxcbiAgICBjbGFzc0lkZW50aXR5TGlzdDogW10sXG4gICAgdHlwZTogJ2NyZWF0ZScsXG4gICAga2V5OiAnJyxcbiAgICBjdXJyZW50VHlwZTogJ3BhcmVudHMnLFxuICAgIHJlbGF0aW9uc2hpcFR5cGVzOiBbXG4gICAgICB7XG4gICAgICAgIGNoZWNrZWQ6IHRydWUsXG4gICAgICAgIGxhYmVsOiAn5oiR5piv5a626ZW/JyxcbiAgICAgICAgdmFsdWU6ICdwYXJlbnRzJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgY2hlY2tlZDogZmFsc2UsXG4gICAgICAgIGxhYmVsOiAn5oiR5piv5pWZ5biIJyxcbiAgICAgICAgdmFsdWU6ICd0ZWFjaGVyJ1xuICAgICAgfVxuICAgIF1cbiAgfVxuICB3YXRjaCA9IHtcbiAgICByZWxhdGlvbnNoaXAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICBpZiAoIW9sZFZhbHVlLmxlbmd0aCAmJiBuZXdWYWx1ZS5sZW5ndGggJiYgKHRoaXMudHlwZSA9PT0gJ2NyZWF0ZScgfHwgdGhpcy50eXBlID09PSAnam9pbicpKSB7XG4gICAgICAgIC8vIOS7jnJlZHV4LXN0b3Jl56ys5LiA5qyh5Y+W5YC877yM6ZyA6KaB5Yid5aeL5YyW5LiA5LiqaW5wdXTovpPlhaXmoYZcbiAgICAgICAgdGhpcy5hZGROZXdGbigpXG4gICAgICB9XG4gICAgfSxcbiAgICBzdHVkZW50TmFtZSAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICB0aGlzLmNhblN1Ym1pdCA9ICFpc0VtcHR5U3RyaW5nKG5ld1ZhbHVlKVxuICAgIH1cbiAgfVxuICBvblNob3coKSB7XG4gICAgLy8g56ys5LiA5qyh6L+b5p2l5Yid5aeL5YyW6I635Y+WcmVsYXRpb25zaGlw55qE5pe25YCZ77yMbGVuZ3Ro5q2k5pe25Li6MO+8jOWSjOS4iumdoueahHdhdGNo5piv5LiN5Lya5ZCM5pe25omn6KGM55qEXG4gICAgaWYgKHRoaXMucmVsYXRpb25zaGlwLmxlbmd0aCAmJiAodGhpcy50eXBlID09PSAnY3JlYXRlJyB8fCB0aGlzLnR5cGUgPT09ICdqb2luJykpIHtcbiAgICAgIHRoaXMuYWRkTmV3Rm4oKVxuICAgIH1cbiAgfVxuICBvbkxvYWQoZSkge1xuICAgICF0aGlzLnJlbGF0aW9uc2hpcC5sZW5ndGggJiYgc2F2ZUlkZW50aXR5TGlzdCgpXG4gICAgdGhpcy5tZW1iZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nKVxuICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXG4gICAgdGhpcy5qb2luQ2xhc3NJZCA9IE51bWJlcihlLmlkKVxuICAgIHRoaXMua2V5ID0gZS5rZXlcbiAgICB0aGlzLnR5cGUgPSBlLnR5cGVcbiAgICB0aGlzLnR5cGUgPT09ICdlZGl0JyAmJiB0aGlzLmdldENsYXNzSWRlbnRpdHkoKVxuICAgIHRoaXMuJGFwcGx5KClcbiAgfVxuICBhZGRDbGFzc0NhbGxiYWNrKGRhdGEsIGZpbHRlckxpc3QpIHtcbiAgICBhZGRDbGFzcyhPYmplY3QuYXNzaWduKHt9LCBkYXRhLCB7XG4gICAgICBpdGVtOiBmaWx0ZXJMaXN0XG4gICAgfSkpLnRoZW4ocmVzID0+IHtcbiAgICAgIHRoaXMuY29tbW9uRm4ocmVzKVxuICAgIH0pXG4gIH1cbiAgam9pbkNsYXNzQ2FsbGJhY2soaWQsIGZpbHRlckxpc3QpIHtcbiAgICBiaW5kSWRlbnRpdHkoe1xuICAgICAgY2xhc3NfaWQ6IGlkLFxuICAgICAgaXRlbTogZmlsdGVyTGlzdFxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgIHNob3dNc2coJ+aIkOWKn+e7keWumui6q+S7vScpXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHd4LnN3aXRjaFRhYih7dXJsOiAnem9uZSd9KVxuICAgICAgICB9LCAyMDAwKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgdGVhY2hlckNhbGxiYWNrKCkge1xuICAgIGJpbmRUZWFjaGVyKHtcbiAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgIG5hbWU6IHRoaXMudGVhY2hlck5hbWVcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICB3eC5zd2l0Y2hUYWIoe3VybDogJ3pvbmUnfSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIGNvbW1vbkZuKHJlcykge1xuICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICBzaG93TXNnKCfnj63nuqfliJvlu7rmiJDlip8nKVxuICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICB3eC5zZXRTdG9yYWdlKHtcbiAgICAgICAga2V5OiAnY2xhc3NJbmZvJyxcbiAgICAgICAgZGF0YTogZGF0YVxuICAgICAgfSlcbiAgICAgIGxldCB1cmwgPSBgY3JlYXRlQ2xhc3NTdWNjZXNzP25hbWU9JHtkYXRhLm5hbWV9JmNvZGU9JHtkYXRhLnFyX2NvZGV9JmtleT0ke2RhdGEuam9pbl9rZXl9JmNsYXNzSWQ9JHtkYXRhLmlkfWBcbiAgICAgIHNldENsYXNzQ2hhbmdlZCh0cnVlKVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogdXJsXG4gICAgICAgIH0pXG4gICAgICB9LCAxMDAwKVxuICAgIH1cbiAgfVxuICBnZXRDbGFzc0lkZW50aXR5KCkge1xuICAgIGlkZW50aXR5TGlzdCh7XG4gICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWRcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICBjb25zdCBsaXN0ID0gcmVzLmRhdGEubGlzdFxuICAgICAgY29uc3QgdGVhY2hlck9iaiA9IGxpc3QuZmlsdGVyKGl0ZW0gPT4gaXRlbS5hcHBfdHlwZSA9PT0gJ3RlYWNoZXInKVxuICAgICAgY29uc3QgcGFyZW50TGlzdCA9IGxpc3QuZmlsdGVyKGl0ZW0gPT4gaXRlbS5hcHBfdHlwZSA9PT0gJ3N0dWRlbnQnKVxuICAgICAgdGhpcy5saXN0ID0gcGFyZW50TGlzdC5tYXAoaXRlbSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcmVsYXRpb25zaGlwOiB0aGlzLnJlbGF0aW9uc2hpcCxcbiAgICAgICAgICB2YWx1ZTogaXRlbS5zdHVkZW50Lm5hbWUsXG4gICAgICAgICAgYWN0aXZlSW5kZXg6IGl0ZW0uaWRlbnRpdHkuaWQgLSAxLFxuICAgICAgICAgIGlkOiBpdGVtLmlkXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBpZiAodGhpcy50ZWFjaGVyT2JqICYmIHRoaXMudGVhY2hlck9iai5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy50ZWFjaGVyTmFtZSA9IHRlYWNoZXJPYmpbMF0udGVhY2hlci5uYW1lXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSlcbiAgfVxuICBhZGROZXdGbigpIHtcbiAgICBjb25zdCBpdGVtID0ge1xuICAgICAgcmVsYXRpb25zaGlwOiB0aGlzLnJlbGF0aW9uc2hpcCxcbiAgICAgIHZhbHVlOiAnJyxcbiAgICAgIGFjdGl2ZUluZGV4OiAwXG4gICAgfVxuICAgIHRoaXMubGlzdC5wdXNoKGl0ZW0pXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgcGlja2VyQ2hhbmdlKGUpIHtcbiAgICAgIHRoaXNbZS5jdXJyZW50VGFyZ2V0LmlkXSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBkZWxldGUoaWR4KSB7XG4gICAgICB0aGlzLmxpc3Quc3BsaWNlKGlkeCwgMSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGFkZE5ldygpIHtcbiAgICAgIHRoaXMuYWRkTmV3Rm4oKVxuICAgIH0sXG4gICAgYmluZEZvcm0oZSkge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gZS5jdXJyZW50VGFyZ2V0XG4gICAgICBjb25zdCBpZHggPSB0YXJnZXQuZGF0YXNldC5pZHhcbiAgICAgIHRoaXMubGlzdFtpZHhdW3RhcmdldC5pZF0gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgc3VibWl0KCkge1xuICAgICAgaWYgKHRoaXMuY3VycmVudFR5cGUgPT09ICdwYXJlbnRzJyAmJiAhdGhpcy5jaGVja0RhdGEoKSkge1xuICAgICAgICBzaG93TXNnKCfor7floavlhpnmgqjlranlrZDlp5PlkI0nKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHRoaXMuY2hlY2tDYW5TdWJtaXQoKVxuICAgICAgbGV0IGZpbHRlckxpc3QgPSB0aGlzLmxpc3QubWFwKGl0ZW0gPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGlkZW50aXR5X2lkOiBpdGVtLnJlbGF0aW9uc2hpcFtpdGVtLmFjdGl2ZUluZGV4XS5pZCxcbiAgICAgICAgICBzdHVkZW50X25hbWU6IGl0ZW0udmFsdWUsXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBpZiAodGhpcy50eXBlID09PSAnZWRpdCcgJiYgdGhpcy5jdXJyZW50VHlwZT09PSAncGFyZW50cycpIHsgLy8g5aaC5p6c5piv55u05o6l5L+u5pS56Lqr5Lu957uR5a6aXG4gICAgICAgIGZpbHRlckxpc3QgPSB0aGlzLmxpc3QubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpZGVudGl0eV9pZDogaXRlbS5yZWxhdGlvbnNoaXBbaXRlbS5hY3RpdmVJbmRleF0uaWQsXG4gICAgICAgICAgICBzdHVkZW50X25hbWU6IGl0ZW0udmFsdWUsXG4gICAgICAgICAgICBtZW1iZXJfaWRlbnRpdHlfaWQ6IGl0ZW0uaWRcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuam9pbkNsYXNzQ2FsbGJhY2sodGhpcy5jbGFzc0luZm8uaWQsIGZpbHRlckxpc3QpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gJ2VkaXQnICYmIHRoaXMuY3VycmVudFR5cGUgPT09ICd0ZWFjaGVyJykgey8vIOWmguaenOaYr+ebtOaOpeS/ruaUuei6q+S7vee7keWumlxuICAgICAgICB0aGlzLnRlYWNoZXJDYWxsYmFjaygpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gJ2NyZWF0ZScpIHsgLy8g5aaC5p6c5piv5Yib5bu654+t57qn5b6XXG4gICAgICAgIGxldCBjcmVhdGVDbGFzc0RhdGEgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5jcmVhdGVDbGFzc1xuICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICBzY2hvb2xfaWQ6IGNyZWF0ZUNsYXNzRGF0YS5zY2hvb2xfaWQsXG4gICAgICAgICAgZ3JhZGVfdHlwZTogY3JlYXRlQ2xhc3NEYXRhLmdyYWRlLFxuICAgICAgICAgIHllYXJfY2xhc3M6IGNyZWF0ZUNsYXNzRGF0YS55ZWFyLFxuICAgICAgICAgIGNsYXNzOiBjcmVhdGVDbGFzc0RhdGEuY2xhc3NcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jdXJyZW50VHlwZSA9PT0gJ3RlYWNoZXInKSB7XG4gICAgICAgICAgbGV0IGl0ZW0gPSB7XG4gICAgICAgICAgICB0eXBlOiAndGVhY2hlcicsXG4gICAgICAgICAgICBsaXN0OiBbe25hbWU6IHRoaXMudGVhY2hlck5hbWV9XVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFkZENsYXNzQ2FsbGJhY2soZGF0YSwgaXRlbSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgaXRlbSA9IHtcbiAgICAgICAgICAgIHR5cGU6ICdwYXJ0aWFyY2gnLFxuICAgICAgICAgICAgbGlzdDogZmlsdGVyTGlzdFxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFkZENsYXNzQ2FsbGJhY2soZGF0YSwgaXRlbSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09ICdqb2luJyAmJiB0aGlzLmN1cnJlbnRUeXBlID09PSAncGFyZW50cycpIHsgLy8g5aaC5p6c5piv5Yqg5YWl54+t57qnXG4gICAgICAgIHRoaXMuam9pbkNsYXNzQ2FsbGJhY2sodGhpcy5qb2luQ2xhc3NJZCwgZmlsdGVyTGlzdClcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgY2hlY2tDYW5TdWJtaXQoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudFR5cGUgPT09ICd0ZWFjaGVyJyAmJiBpc0VtcHR5U3RyaW5nKHRoaXMudGVhY2hlck5hbWUpKSB7XG4gICAgICBzaG93TXNnKCflpoLmnpzmgqjli77pgInkuobogIHluIjouqvku73vvIzor7floavlhpnmgqjnmoTlp5PlkI0nKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIHJldHVybiB0cnVlXG4gIH1cbiAgY2hlY2tEYXRhKCkge1xuICAgIGxldCBjYW5TdWJtaXQgPSB0cnVlXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMubGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgaWYgKGlzRW1wdHlTdHJpbmcodGhpcy5saXN0W2ldLnZhbHVlKSkge1xuICAgICAgICBjYW5TdWJtaXQgPSBmYWxzZVxuICAgICAgICBicmVha1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FuU3VibWl0ID0gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2FuU3VibWl0XG4gIH1cbn1cbiJdfQ==