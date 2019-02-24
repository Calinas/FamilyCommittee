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
        if (this.type && this.currentType === 'parents') {
          // 如果是直接修改身份绑定
          filterList = this.list.map(function (item) {
            return {
              identity_id: item.relationship[item.activeIndex].id,
              student_name: item.value,
              member_identity_id: item.id
            };
          });
          this.joinClassCallback(this.classInfo.id, filterList);
        } else if (this.type && this.currentType === 'teacher') {
          this.teacherCallback();
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
      (0, _user.bindIdentity)({
        class_id: id,
        item: filterList
      }).then(function (res) {
        if (res.data.success) {
          wx.navigateBack();
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
          wx.navigateBack();
        }
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
        _this3.teacherName = teacherObj[0].teacher.name;
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
        _this4.type && _this4.getClassIdentity();
        _this4.$apply();
      });
    }
  }]);

  return bindRelationship;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(bindRelationship , 'pages/bindRelationship'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJpbmRSZWxhdGlvbnNoaXAuanMiXSwibmFtZXMiOlsiYmluZFJlbGF0aW9uc2hpcCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwicmVsYXRpb25zaGlwIiwicGFyZW50SW5kZXgiLCJjYW5TdWJtaXQiLCJzdHVkZW50TmFtZSIsInRlYWNoZXJOYW1lIiwibGlzdCIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJjbGFzc0lkIiwiam9pbkNsYXNzSWQiLCJjbGFzc0lkZW50aXR5TGlzdCIsInR5cGUiLCJjdXJyZW50VHlwZSIsInJlbGF0aW9uc2hpcFR5cGVzIiwiY2hlY2tlZCIsImxhYmVsIiwidmFsdWUiLCJ3YXRjaCIsIm5ld1ZhbHVlIiwib2xkVmFsdWUiLCJtZXRob2RzIiwicGlja2VyQ2hhbmdlIiwiZSIsImN1cnJlbnRUYXJnZXQiLCJpZCIsImRldGFpbCIsIiRhcHBseSIsImRlbGV0ZSIsImlkeCIsInNwbGljZSIsImFkZE5ldyIsIml0ZW0iLCJhY3RpdmVJbmRleCIsInB1c2giLCJiaW5kRm9ybSIsInRhcmdldCIsImRhdGFzZXQiLCJzdWJtaXQiLCJjaGVja0RhdGEiLCJjaGVja0NhblN1Ym1pdCIsImZpbHRlckxpc3QiLCJtYXAiLCJpZGVudGl0eV9pZCIsInN0dWRlbnRfbmFtZSIsIm1lbWJlcl9pZGVudGl0eV9pZCIsImpvaW5DbGFzc0NhbGxiYWNrIiwidGVhY2hlckNhbGxiYWNrIiwiY3JlYXRlQ2xhc3NEYXRhIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJjcmVhdGVDbGFzcyIsInNjaG9vbF9pZCIsImdyYWRlX3R5cGUiLCJncmFkZSIsInllYXJfY2xhc3MiLCJ5ZWFyIiwiY2xhc3MiLCJhZGRDbGFzc0NhbGxiYWNrIiwid3giLCJnZXRTdG9yYWdlU3luYyIsImdldFJlbGF0aW9uU2hpcCIsIk9iamVjdCIsImFzc2lnbiIsInRoZW4iLCJjb21tb25GbiIsInJlcyIsImNsYXNzX2lkIiwic3VjY2VzcyIsIm5hdmlnYXRlQmFjayIsIm5hbWUiLCJ1cmwiLCJxcl9jb2RlIiwiam9pbl9rZXkiLCJjbGFzc0hhc0NoYW5nZSIsInNldFRpbWVvdXQiLCJuYXZpZ2F0ZVRvIiwidGVhY2hlck9iaiIsImZpbHRlciIsImFwcF90eXBlIiwicGFyZW50TGlzdCIsInN0dWRlbnQiLCJpZGVudGl0eSIsInRlYWNoZXIiLCJpIiwibGVuIiwibGVuZ3RoIiwiZ2V0Q2xhc3NJZGVudGl0eSIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBQ3FCQSxnQjs7Ozs7Ozs7Ozs7Ozs7ME1BQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLG9CQUFjLEVBRFQ7QUFFTEMsbUJBQWEsQ0FGUjtBQUdMQyxpQkFBVyxLQUhOO0FBSUxDLG1CQUFhLEVBSlI7QUFLTEMsbUJBQWEsRUFMUjtBQU1MQyxZQUFNLEVBTkQ7QUFPTEMsa0JBQVksSUFQUDtBQVFMQyxpQkFBVyxJQVJOO0FBU0xDLGVBQVMsQ0FBQyxDQVRMO0FBVUxDLG1CQUFhLENBVlI7QUFXTEMseUJBQW1CLEVBWGQ7QUFZTEMsWUFBTSxFQVpEO0FBYUxDLG1CQUFhLFNBYlI7QUFjTEMseUJBQW1CLENBQ2pCO0FBQ0VDLGlCQUFTLElBRFg7QUFFRUMsZUFBTyxNQUZUO0FBR0VDLGVBQU87QUFIVCxPQURpQixFQU1qQjtBQUNFRixpQkFBUyxLQURYO0FBRUVDLGVBQU8sTUFGVDtBQUdFQyxlQUFPO0FBSFQsT0FOaUI7QUFkZCxLLFFBMkJQQyxLLEdBQVE7QUFDTmQsaUJBRE0sdUJBQ09lLFFBRFAsRUFDaUJDLFFBRGpCLEVBQzJCO0FBQy9CLGFBQUtqQixTQUFMLEdBQWlCLENBQUMsMkJBQWNnQixRQUFkLENBQWxCO0FBQ0Q7QUFISyxLLFFBd0VSRSxPLEdBQVU7QUFDUkMsa0JBRFEsd0JBQ0tDLENBREwsRUFDUTtBQUNkLGFBQUtBLEVBQUVDLGFBQUYsQ0FB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VWdGLE1BQWhDLEVBQXdDRixJQUFJQyxHQUE1QyxFQUFpREQsR0FBakQsRUFBc0Q7QUFDcEQsWUFBSSwyQkFBYyxLQUFLOUUsSUFBTCxDQUFVOEUsQ0FBVixFQUFhbkUsS0FBM0IsQ0FBSixFQUF1QztBQUNyQ2Qsc0JBQVksS0FBWjtBQUNBO0FBQ0QsU0FIRCxNQUdPO0FBQ0xBLHNCQUFZLElBQVo7QUFDRDtBQUNGO0FBQ0QsYUFBT0EsU0FBUDtBQUNEOzs7c0NBQ2lCO0FBQUE7O0FBQ2hCLG1DQUFrQjZELElBQWxCLENBQXVCLGVBQU87QUFDNUIsZUFBSy9ELFlBQUwsR0FBb0JpRSxJQUFJbEUsSUFBSixDQUFTTSxJQUE3QjtBQUNBLFlBQU0wQixPQUFPO0FBQ1gvQix3QkFBYyxPQUFLQSxZQURSO0FBRVhnQixpQkFBTyxFQUZJO0FBR1hnQix1QkFBYTtBQUhGLFNBQWI7QUFLQSxlQUFLM0IsSUFBTCxDQUFVNEIsSUFBVixDQUFlRixJQUFmO0FBQ0EsZUFBS3BCLElBQUwsSUFBYSxPQUFLMkUsZ0JBQUwsRUFBYjtBQUNBLGVBQUs1RCxNQUFMO0FBQ0QsT0FWRDtBQVdEOzs7O0VBbk0yQzZELGVBQUtDLEk7O2tCQUE5QjVGLGdCIiwiZmlsZSI6ImJpbmRSZWxhdGlvbnNoaXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgeyBnZXRJZGVudGl0eUxpc3QsIGJpbmRJZGVudGl0eSwgaWRlbnRpdHlMaXN0LCBiaW5kVGVhY2hlciB9IGZyb20gJy4uL2FwaS91c2VyJ1xuaW1wb3J0IHsgYWRkQ2xhc3MgfSBmcm9tICcuLi9hcGkvY3JlYXRlQ2xhc3MnXG5pbXBvcnQgeyBzaG93TXNnLCBpc0VtcHR5U3RyaW5nIH0gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgYmluZFJlbGF0aW9uc2hpcCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6Lqr5Lu957uR5a6aJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgcmVsYXRpb25zaGlwOiBbXSxcbiAgICBwYXJlbnRJbmRleDogMCxcbiAgICBjYW5TdWJtaXQ6IGZhbHNlLFxuICAgIHN0dWRlbnROYW1lOiAnJyxcbiAgICB0ZWFjaGVyTmFtZTogJycsXG4gICAgbGlzdDogW10sXG4gICAgbWVtYmVySW5mbzogbnVsbCxcbiAgICBjbGFzc0luZm86IG51bGwsXG4gICAgY2xhc3NJZDogLTEsXG4gICAgam9pbkNsYXNzSWQ6IDAsXG4gICAgY2xhc3NJZGVudGl0eUxpc3Q6IFtdLFxuICAgIHR5cGU6ICcnLFxuICAgIGN1cnJlbnRUeXBlOiAncGFyZW50cycsXG4gICAgcmVsYXRpb25zaGlwVHlwZXM6IFtcbiAgICAgIHtcbiAgICAgICAgY2hlY2tlZDogdHJ1ZSxcbiAgICAgICAgbGFiZWw6ICfmiJHmmK/lrrbplb8nLFxuICAgICAgICB2YWx1ZTogJ3BhcmVudHMnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBjaGVja2VkOiBmYWxzZSxcbiAgICAgICAgbGFiZWw6ICfmiJHmmK/mlZnluIgnLFxuICAgICAgICB2YWx1ZTogJ3RlYWNoZXInXG4gICAgICB9XG4gICAgXVxuICB9XG4gIHdhdGNoID0ge1xuICAgIHN0dWRlbnROYW1lIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgIHRoaXMuY2FuU3VibWl0ID0gIWlzRW1wdHlTdHJpbmcobmV3VmFsdWUpXG4gICAgfVxuICB9XG4gIG9uTG9hZChlKSB7XG4gICAgdGhpcy5tZW1iZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nKVxuICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXG4gICAgdGhpcy5qb2luQ2xhc3NJZCA9IGUuaWRcbiAgICB0aGlzLnR5cGUgPSBlLnR5cGVcbiAgICB0aGlzLmdldFJlbGF0aW9uU2hpcCgpXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIGFkZENsYXNzQ2FsbGJhY2soZGF0YSwgZmlsdGVyTGlzdCkge1xuICAgIGFkZENsYXNzKE9iamVjdC5hc3NpZ24oe30sIGRhdGEsIHtcbiAgICAgIGl0ZW06IGZpbHRlckxpc3RcbiAgICB9KSkudGhlbihyZXMgPT4ge1xuICAgICAgdGhpcy5jb21tb25GbihyZXMpXG4gICAgfSlcbiAgfVxuICBqb2luQ2xhc3NDYWxsYmFjayhpZCwgZmlsdGVyTGlzdCkge1xuICAgIGJpbmRJZGVudGl0eSh7XG4gICAgICBjbGFzc19pZDogaWQsXG4gICAgICBpdGVtOiBmaWx0ZXJMaXN0XG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgaWYocmVzLmRhdGEuc3VjY2Vzcyl7XG4gICAgICAgIHd4Lm5hdmlnYXRlQmFjaygpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICB0ZWFjaGVyQ2FsbGJhY2soKSB7XG4gICAgYmluZFRlYWNoZXIoe1xuICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgbmFtZTogdGhpcy50ZWFjaGVyTmFtZVxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIGlmKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgd3gubmF2aWdhdGVCYWNrKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIGNvbW1vbkZuKHJlcykge1xuICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICBzaG93TXNnKCfnj63nuqfliJvlu7rmiJDlip8nKVxuICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICBsZXQgdXJsID0gYGNyZWF0ZUNsYXNzU3VjY2Vzcz9uYW1lPSR7ZGF0YS5uYW1lfSZjb2RlPSR7ZGF0YS5xcl9jb2RlfSZrZXk9JHtkYXRhLmpvaW5fa2V5fWBcbiAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmNsYXNzSGFzQ2hhbmdlID0gdHJ1ZVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogdXJsXG4gICAgICAgIH0pXG4gICAgICB9LCAxMDAwKVxuICAgIH1cbiAgfVxuICBnZXRDbGFzc0lkZW50aXR5KCkge1xuICAgIGlkZW50aXR5TGlzdCh7XG4gICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWRcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICBjb25zdCBsaXN0ID0gcmVzLmRhdGEubGlzdFxuICAgICAgY29uc3QgdGVhY2hlck9iaiA9IGxpc3QuZmlsdGVyKGl0ZW0gPT4gaXRlbS5hcHBfdHlwZSA9PT0gJ3RlYWNoZXInKVxuICAgICAgY29uc3QgcGFyZW50TGlzdCA9IGxpc3QuZmlsdGVyKGl0ZW0gPT4gaXRlbS5hcHBfdHlwZSA9PT0gJ3N0dWRlbnQnKVxuICAgICAgdGhpcy5saXN0ID0gcGFyZW50TGlzdC5tYXAoaXRlbSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcmVsYXRpb25zaGlwOiB0aGlzLnJlbGF0aW9uc2hpcCxcbiAgICAgICAgICB2YWx1ZTogaXRlbS5zdHVkZW50Lm5hbWUsXG4gICAgICAgICAgYWN0aXZlSW5kZXg6IGl0ZW0uaWRlbnRpdHkuaWQgLSAxLFxuICAgICAgICAgIGlkOiBpdGVtLmlkXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICB0aGlzLnRlYWNoZXJOYW1lID0gdGVhY2hlck9ialswXS50ZWFjaGVyLm5hbWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9KVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgcGlja2VyQ2hhbmdlKGUpIHtcbiAgICAgIHRoaXNbZS5jdXJyZW50VGFyZ2V0LmlkXSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBkZWxldGUoaWR4KSB7XG4gICAgICB0aGlzLmxpc3Quc3BsaWNlKGlkeCwgMSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGFkZE5ldygpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSB7XG4gICAgICAgIHJlbGF0aW9uc2hpcDogdGhpcy5yZWxhdGlvbnNoaXAsXG4gICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgYWN0aXZlSW5kZXg6IDBcbiAgICAgIH1cbiAgICAgIHRoaXMubGlzdC5wdXNoKGl0ZW0pXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBiaW5kRm9ybShlKSB7XG4gICAgICBjb25zdCB0YXJnZXQgPSBlLmN1cnJlbnRUYXJnZXRcbiAgICAgIGNvbnN0IGlkeCA9IHRhcmdldC5kYXRhc2V0LmlkeFxuICAgICAgdGhpcy5saXN0W2lkeF1bdGFyZ2V0LmlkXSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBzdWJtaXQoKSB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50VHlwZSA9PT0gJ3BhcmVudHMnICYmICF0aGlzLmNoZWNrRGF0YSgpKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+Whq+WGmeaCqOWtqeWtkOWnk+WQjScpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdGhpcy5jaGVja0NhblN1Ym1pdCgpXG4gICAgICBsZXQgZmlsdGVyTGlzdCA9IHRoaXMubGlzdC5tYXAoaXRlbSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaWRlbnRpdHlfaWQ6IGl0ZW0ucmVsYXRpb25zaGlwW2l0ZW0uYWN0aXZlSW5kZXhdLmlkLFxuICAgICAgICAgIHN0dWRlbnRfbmFtZTogaXRlbS52YWx1ZVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgaWYgKHRoaXMudHlwZSAmJiB0aGlzLmN1cnJlbnRUeXBlPT09ICdwYXJlbnRzJykgeyAvLyDlpoLmnpzmmK/nm7TmjqXkv67mlLnouqvku73nu5HlrppcbiAgICAgICAgZmlsdGVyTGlzdCA9IHRoaXMubGlzdC5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkZW50aXR5X2lkOiBpdGVtLnJlbGF0aW9uc2hpcFtpdGVtLmFjdGl2ZUluZGV4XS5pZCxcbiAgICAgICAgICAgIHN0dWRlbnRfbmFtZTogaXRlbS52YWx1ZSxcbiAgICAgICAgICAgIG1lbWJlcl9pZGVudGl0eV9pZDogaXRlbS5pZFxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5qb2luQ2xhc3NDYWxsYmFjayh0aGlzLmNsYXNzSW5mby5pZCwgZmlsdGVyTGlzdClcbiAgICAgIH0gZWxzZSBpZih0aGlzLnR5cGUgJiYgdGhpcy5jdXJyZW50VHlwZSA9PT0gJ3RlYWNoZXInKSB7XG4gICAgICAgIHRoaXMudGVhY2hlckNhbGxiYWNrKClcbiAgICAgIH0gZWxzZSBpZiAoIXRoaXMuam9pbkNsYXNzSWQpIHsgLy8g5aaC5p6c5piv5Yib5bu654+t57qn5b6XXG4gICAgICAgIGxldCBjcmVhdGVDbGFzc0RhdGEgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5jcmVhdGVDbGFzc1xuICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICBzY2hvb2xfaWQ6IGNyZWF0ZUNsYXNzRGF0YS5zY2hvb2xfaWQsXG4gICAgICAgICAgZ3JhZGVfdHlwZTogY3JlYXRlQ2xhc3NEYXRhLmdyYWRlLFxuICAgICAgICAgIHllYXJfY2xhc3M6IGNyZWF0ZUNsYXNzRGF0YS55ZWFyLFxuICAgICAgICAgIGNsYXNzOiBjcmVhdGVDbGFzc0RhdGEuY2xhc3NcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFkZENsYXNzQ2FsbGJhY2soZGF0YSwgZmlsdGVyTGlzdClcbiAgICAgIH0gZWxzZSB7IC8vIOWmguaenOaYr+WKoOWFpeePree6p1xuICAgICAgICB0aGlzLmpvaW5DbGFzc0lkICYmIHRoaXMuam9pbkNsYXNzQ2FsbGJhY2sodGhpcy5qb2luQ2xhc3NJZCwgZmlsdGVyTGlzdClcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgY2hlY2tDYW5TdWJtaXQoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudFR5cGUgPT09ICd0ZWFjaGVyJyAmJiBpc0VtcHR5U3RyaW5nKHRoaXMudGVhY2hlck5hbWUpKSB7XG4gICAgICBzaG93TXNnKCflpoLmnpzmgqjli77pgInkuobogIHluIjouqvku73vvIzor7floavlhpnmgqjnmoTlp5PlkI0nKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIHJldHVybiB0cnVlXG4gIH1cbiAgY2hlY2tEYXRhKCkge1xuICAgIGxldCBjYW5TdWJtaXQgPSB0cnVlXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMubGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgaWYgKGlzRW1wdHlTdHJpbmcodGhpcy5saXN0W2ldLnZhbHVlKSkge1xuICAgICAgICBjYW5TdWJtaXQgPSBmYWxzZVxuICAgICAgICBicmVha1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FuU3VibWl0ID0gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2FuU3VibWl0XG4gIH1cbiAgZ2V0UmVsYXRpb25TaGlwKCkge1xuICAgIGdldElkZW50aXR5TGlzdCgpLnRoZW4ocmVzID0+IHtcbiAgICAgIHRoaXMucmVsYXRpb25zaGlwID0gcmVzLmRhdGEubGlzdFxuICAgICAgY29uc3QgaXRlbSA9IHtcbiAgICAgICAgcmVsYXRpb25zaGlwOiB0aGlzLnJlbGF0aW9uc2hpcCxcbiAgICAgICAgdmFsdWU6ICcnLFxuICAgICAgICBhY3RpdmVJbmRleDogMFxuICAgICAgfVxuICAgICAgdGhpcy5saXN0LnB1c2goaXRlbSlcbiAgICAgIHRoaXMudHlwZSAmJiB0aGlzLmdldENsYXNzSWRlbnRpdHkoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0pXG4gIH1cbn1cbiJdfQ==