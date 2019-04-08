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
        if (!oldValue.length && newValue.length && this.type === 'create') {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJpbmRSZWxhdGlvbnNoaXAuanMiXSwibmFtZXMiOlsic3RvcmUiLCJiaW5kUmVsYXRpb25zaGlwIiwicmVsYXRpb25zaGlwIiwic3RhdGUiLCJ6b25lIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJwYXJlbnRJbmRleCIsImNhblN1Ym1pdCIsInN0dWRlbnROYW1lIiwidGVhY2hlck5hbWUiLCJsaXN0IiwibWVtYmVySW5mbyIsImNsYXNzSW5mbyIsImNsYXNzSWQiLCJqb2luQ2xhc3NJZCIsImNsYXNzSWRlbnRpdHlMaXN0IiwidHlwZSIsImtleSIsImN1cnJlbnRUeXBlIiwicmVsYXRpb25zaGlwVHlwZXMiLCJjaGVja2VkIiwibGFiZWwiLCJ2YWx1ZSIsIndhdGNoIiwibmV3VmFsdWUiLCJvbGRWYWx1ZSIsImxlbmd0aCIsImFkZE5ld0ZuIiwibWV0aG9kcyIsInBpY2tlckNoYW5nZSIsImUiLCJjdXJyZW50VGFyZ2V0IiwiaWQiLCJkZXRhaWwiLCIkYXBwbHkiLCJkZWxldGUiLCJpZHgiLCJzcGxpY2UiLCJhZGROZXciLCJiaW5kRm9ybSIsInRhcmdldCIsImRhdGFzZXQiLCJzdWJtaXQiLCJjaGVja0RhdGEiLCJjaGVja0NhblN1Ym1pdCIsImZpbHRlckxpc3QiLCJtYXAiLCJpZGVudGl0eV9pZCIsIml0ZW0iLCJhY3RpdmVJbmRleCIsInN0dWRlbnRfbmFtZSIsIm1lbWJlcl9pZGVudGl0eV9pZCIsImpvaW5DbGFzc0NhbGxiYWNrIiwidGVhY2hlckNhbGxiYWNrIiwiY3JlYXRlQ2xhc3NEYXRhIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJjcmVhdGVDbGFzcyIsInNjaG9vbF9pZCIsImdyYWRlX3R5cGUiLCJncmFkZSIsInllYXJfY2xhc3MiLCJ5ZWFyIiwiY2xhc3MiLCJuYW1lIiwiYWRkQ2xhc3NDYWxsYmFjayIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJOdW1iZXIiLCJnZXRDbGFzc0lkZW50aXR5IiwiT2JqZWN0IiwiYXNzaWduIiwidGhlbiIsImNvbW1vbkZuIiwicmVzIiwiY2xhc3NfaWQiLCJzdWNjZXNzIiwic2V0VGltZW91dCIsInN3aXRjaFRhYiIsInVybCIsInNldFN0b3JhZ2UiLCJxcl9jb2RlIiwiam9pbl9rZXkiLCJjbGFzc0hhc0NoYW5nZSIsIm5hdmlnYXRlVG8iLCJ0ZWFjaGVyT2JqIiwiZmlsdGVyIiwiYXBwX3R5cGUiLCJwYXJlbnRMaXN0Iiwic3R1ZGVudCIsImlkZW50aXR5IiwidGVhY2hlciIsInB1c2giLCJpIiwibGVuIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztBQUNBLElBQUlBLFFBQVEsMEJBQVo7O0lBT3FCQyxnQixXQUxwQix3QkFBUTtBQUNQQyxjQURPLHdCQUNNQyxLQUROLEVBQ1k7QUFDakIsV0FBT0EsTUFBTUMsSUFBTixDQUFXRixZQUFsQjtBQUNEO0FBSE0sQ0FBUixDOzs7Ozs7Ozs7Ozs7OzswTUFNQ0csTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxtQkFBYSxDQURSO0FBRUxDLGlCQUFXLEtBRk47QUFHTEMsbUJBQWEsRUFIUjtBQUlMQyxtQkFBYSxFQUpSO0FBS0xDLFlBQU0sRUFMRDtBQU1MQyxrQkFBWSxJQU5QO0FBT0xDLGlCQUFXLElBUE47QUFRTEMsZUFBUyxDQUFDLENBUkw7QUFTTEMsbUJBQWEsQ0FUUjtBQVVMQyx5QkFBbUIsRUFWZDtBQVdMQyxZQUFNLFFBWEQ7QUFZTEMsV0FBSyxFQVpBO0FBYUxDLG1CQUFhLFNBYlI7QUFjTEMseUJBQW1CLENBQ2pCO0FBQ0VDLGlCQUFTLElBRFg7QUFFRUMsZUFBTyxNQUZUO0FBR0VDLGVBQU87QUFIVCxPQURpQixFQU1qQjtBQUNFRixpQkFBUyxLQURYO0FBRUVDLGVBQU8sTUFGVDtBQUdFQyxlQUFPO0FBSFQsT0FOaUI7QUFkZCxLLFFBMkJQQyxLLEdBQVE7QUFD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SUFBa0MsMkJBQWMsS0FBS1QsV0FBbkIsQ0FBdEMsRUFBdUU7QUFDckUsNkJBQVEsb0JBQVI7QUFDQSxlQUFPLEtBQVA7QUFDRDtBQUNELGFBQU8sSUFBUDtBQUNEOzs7Z0NBQ1c7QUFDVixVQUFJRixZQUFZLElBQWhCO0FBQ0EsV0FBSyxJQUFJc0YsSUFBSSxDQUFSLEVBQVdDLE1BQU0sS0FBS3BGLElBQUwsQ0FBVWdCLE1BQWhDLEVBQXdDbUUsSUFBSUMsR0FBNUMsRUFBaURELEdBQWpELEVBQXNEO0FBQ3BELFlBQUksMkJBQWMsS0FBS25GLElBQUwsQ0FBVW1GLENBQVYsRUFBYXZFLEtBQTNCLENBQUosRUFBdUM7QUFDckNmLHNCQUFZLEtBQVo7QUFDQTtBQUNELFNBSEQsTUFHTztBQUNMQSxzQkFBWSxJQUFaO0FBQ0Q7QUFDRjtBQUNELGFBQU9BLFNBQVA7QUFDRDs7OztFQXJOMkN3RixlQUFLQyxJO2tCQUE5QmpHLGdCIiwiZmlsZSI6ImJpbmRSZWxhdGlvbnNoaXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IHsgY29ubmVjdCwgZ2V0U3RvcmUgfSBmcm9tICd3ZXB5LXJlZHV4J1xyXG5pbXBvcnQgeyBzYXZlSWRlbnRpdHlMaXN0IH0gZnJvbSAnLi4vc3RvcmUvYWN0aW9ucydcclxuaW1wb3J0IHsgZ2V0SWRlbnRpdHlMaXN0LCBiaW5kSWRlbnRpdHksIGlkZW50aXR5TGlzdCwgYmluZFRlYWNoZXIgfSBmcm9tICcuLi9hcGkvdXNlcidcclxuaW1wb3J0IHsgYWRkQ2xhc3MgfSBmcm9tICcuLi9hcGkvY3JlYXRlQ2xhc3MnXHJcbmltcG9ydCB7IHNob3dNc2csIGlzRW1wdHlTdHJpbmcgfSBmcm9tICcuLi91dGlscy9jb21tb24nXHJcbmxldCBzdG9yZSA9IGdldFN0b3JlKClcclxuXHJcbkBjb25uZWN0KHtcclxuICByZWxhdGlvbnNoaXAoc3RhdGUpe1xyXG4gICAgcmV0dXJuIHN0YXRlLnpvbmUucmVsYXRpb25zaGlwXHJcbiAgfVxyXG59KVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBiaW5kUmVsYXRpb25zaGlwIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6Lqr5Lu957uR5a6aJ1xyXG4gIH1cclxuICBkYXRhID0ge1xyXG4gICAgcGFyZW50SW5kZXg6IDAsXHJcbiAgICBjYW5TdWJtaXQ6IGZhbHNlLFxyXG4gICAgc3R1ZGVudE5hbWU6ICcnLFxyXG4gICAgdGVhY2hlck5hbWU6ICcnLFxyXG4gICAgbGlzdDogW10sXHJcbiAgICBtZW1iZXJJbmZvOiBudWxsLFxyXG4gICAgY2xhc3NJbmZvOiBudWxsLFxyXG4gICAgY2xhc3NJZDogLTEsXHJcbiAgICBqb2luQ2xhc3NJZDogMCxcclxuICAgIGNsYXNzSWRlbnRpdHlMaXN0OiBbXSxcclxuICAgIHR5cGU6ICdjcmVhdGUnLFxyXG4gICAga2V5OiAnJyxcclxuICAgIGN1cnJlbnRUeXBlOiAncGFyZW50cycsXHJcbiAgICByZWxhdGlvbnNoaXBUeXBlczogW1xyXG4gICAgICB7XHJcbiAgICAgICAgY2hlY2tlZDogdHJ1ZSxcclxuICAgICAgICBsYWJlbDogJ+aIkeaYr+WutumVvycsXHJcbiAgICAgICAgdmFsdWU6ICdwYXJlbnRzJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgY2hlY2tlZDogZmFsc2UsXHJcbiAgICAgICAgbGFiZWw6ICfmiJHmmK/mlZnluIgnLFxyXG4gICAgICAgIHZhbHVlOiAndGVhY2hlcidcclxuICAgICAgfVxyXG4gICAgXVxyXG4gIH1cclxuICB3YXRjaCA9IHtcclxuICAgIHJlbGF0aW9uc2hpcChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcclxuICAgICAgaWYgKCFvbGRWYWx1ZS5sZW5ndGggJiYgbmV3VmFsdWUubGVuZ3RoICYmIHRoaXMudHlwZSA9PT0gJ2NyZWF0ZScpIHtcclxuICAgICAgICB0aGlzLmFkZE5ld0ZuKClcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHN0dWRlbnROYW1lIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcclxuICAgICAgdGhpcy5jYW5TdWJtaXQgPSAhaXNFbXB0eVN0cmluZyhuZXdWYWx1ZSlcclxuICAgIH1cclxuICB9XHJcbiAgb25Mb2FkKGUpIHtcclxuICAgICF0aGlzLnJlbGF0aW9uc2hpcC5sZW5ndGggJiYgc2F2ZUlkZW50aXR5TGlzdCgpXHJcbiAgICB0aGlzLm1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXHJcbiAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxyXG4gICAgdGhpcy5qb2luQ2xhc3NJZCA9IE51bWJlcihlLmlkKVxyXG4gICAgdGhpcy5rZXkgPSBlLmtleVxyXG4gICAgdGhpcy50eXBlID0gZS50eXBlXHJcbiAgICB0aGlzLnR5cGUgPT09ICdlZGl0JyAmJiB0aGlzLmdldENsYXNzSWRlbnRpdHkoKVxyXG4gICAgdGhpcy4kYXBwbHkoKVxyXG4gIH1cclxuICBhZGRDbGFzc0NhbGxiYWNrKGRhdGEsIGZpbHRlckxpc3QpIHtcclxuICAgIGFkZENsYXNzKE9iamVjdC5hc3NpZ24oe30sIGRhdGEsIHtcclxuICAgICAgaXRlbTogZmlsdGVyTGlzdFxyXG4gICAgfSkpLnRoZW4ocmVzID0+IHtcclxuICAgICAgdGhpcy5jb21tb25GbihyZXMpXHJcbiAgICB9KVxyXG4gIH1cclxuICBqb2luQ2xhc3NDYWxsYmFjayhpZCwgZmlsdGVyTGlzdCkge1xyXG4gICAgYmluZElkZW50aXR5KHtcclxuICAgICAgY2xhc3NfaWQ6IGlkLFxyXG4gICAgICBpdGVtOiBmaWx0ZXJMaXN0XHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgc2hvd01zZygn5oiQ5Yqf57uR5a6a6Lqr5Lu9JylcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHd4LnN3aXRjaFRhYih7dXJsOiAnem9uZSd9KVxyXG4gICAgICAgIH0sIDIwMDApXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG4gIHRlYWNoZXJDYWxsYmFjaygpIHtcclxuICAgIGJpbmRUZWFjaGVyKHtcclxuICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxyXG4gICAgICBuYW1lOiB0aGlzLnRlYWNoZXJOYW1lXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgd3guc3dpdGNoVGFiKHt1cmw6ICd6b25lJ30pXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG4gIGNvbW1vbkZuKHJlcykge1xyXG4gICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgc2hvd01zZygn54+t57qn5Yib5bu65oiQ5YqfJylcclxuICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YS5kYXRhXHJcbiAgICAgIHd4LnNldFN0b3JhZ2Uoe1xyXG4gICAgICAgIGtleTogJ2NsYXNzSW5mbycsXHJcbiAgICAgICAgZGF0YTogZGF0YVxyXG4gICAgICB9KVxyXG4gICAgICBsZXQgdXJsID0gYGNyZWF0ZUNsYXNzU3VjY2Vzcz9uYW1lPSR7ZGF0YS5uYW1lfSZjb2RlPSR7ZGF0YS5xcl9jb2RlfSZrZXk9JHtkYXRhLmpvaW5fa2V5fSZjbGFzc0lkPSR7ZGF0YS5pZH1gXHJcbiAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmNsYXNzSGFzQ2hhbmdlID0gdHJ1ZVxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgIHVybDogdXJsXHJcbiAgICAgICAgfSlcclxuICAgICAgfSwgMTAwMClcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0Q2xhc3NJZGVudGl0eSgpIHtcclxuICAgIGlkZW50aXR5TGlzdCh7XHJcbiAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZFxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICBjb25zdCBsaXN0ID0gcmVzLmRhdGEubGlzdFxyXG4gICAgICBjb25zdCB0ZWFjaGVyT2JqID0gbGlzdC5maWx0ZXIoaXRlbSA9PiBpdGVtLmFwcF90eXBlID09PSAndGVhY2hlcicpXHJcbiAgICAgIGNvbnN0IHBhcmVudExpc3QgPSBsaXN0LmZpbHRlcihpdGVtID0+IGl0ZW0uYXBwX3R5cGUgPT09ICdzdHVkZW50JylcclxuICAgICAgdGhpcy5saXN0ID0gcGFyZW50TGlzdC5tYXAoaXRlbSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHJlbGF0aW9uc2hpcDogdGhpcy5yZWxhdGlvbnNoaXAsXHJcbiAgICAgICAgICB2YWx1ZTogaXRlbS5zdHVkZW50Lm5hbWUsXHJcbiAgICAgICAgICBhY3RpdmVJbmRleDogaXRlbS5pZGVudGl0eS5pZCAtIDEsXHJcbiAgICAgICAgICBpZDogaXRlbS5pZFxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgaWYgKHRoaXMudGVhY2hlck9iaiAmJiB0aGlzLnRlYWNoZXJPYmoubGVuZ3RoKSB7XHJcbiAgICAgICAgdGhpcy50ZWFjaGVyTmFtZSA9IHRlYWNoZXJPYmpbMF0udGVhY2hlci5uYW1lXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSlcclxuICB9XHJcbiAgYWRkTmV3Rm4oKSB7XHJcbiAgICBjb25zdCBpdGVtID0ge1xyXG4gICAgICByZWxhdGlvbnNoaXA6IHRoaXMucmVsYXRpb25zaGlwLFxyXG4gICAgICB2YWx1ZTogJycsXHJcbiAgICAgIGFjdGl2ZUluZGV4OiAwXHJcbiAgICB9XHJcbiAgICB0aGlzLmxpc3QucHVzaChpdGVtKVxyXG4gICAgdGhpcy4kYXBwbHkoKVxyXG4gIH1cclxuICBtZXRob2RzID0ge1xyXG4gICAgcGlja2VyQ2hhbmdlKGUpIHtcclxuICAgICAgdGhpc1tlLmN1cnJlbnRUYXJnZXQuaWRdID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSxcclxuICAgIGRlbGV0ZShpZHgpIHtcclxuICAgICAgdGhpcy5saXN0LnNwbGljZShpZHgsIDEpXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0sXHJcbiAgICBhZGROZXcoKSB7XHJcbiAgICAgIHRoaXMuYWRkTmV3Rm4oKVxyXG4gICAgfSxcclxuICAgIGJpbmRGb3JtKGUpIHtcclxuICAgICAgY29uc3QgdGFyZ2V0ID0gZS5jdXJyZW50VGFyZ2V0XHJcbiAgICAgIGNvbnN0IGlkeCA9IHRhcmdldC5kYXRhc2V0LmlkeFxyXG4gICAgICB0aGlzLmxpc3RbaWR4XVt0YXJnZXQuaWRdID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSxcclxuICAgIHN1Ym1pdCgpIHtcclxuICAgICAgaWYgKHRoaXMuY3VycmVudFR5cGUgPT09ICdwYXJlbnRzJyAmJiAhdGhpcy5jaGVja0RhdGEoKSkge1xyXG4gICAgICAgIHNob3dNc2coJ+ivt+Whq+WGmeaCqOWtqeWtkOWnk+WQjScpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5jaGVja0NhblN1Ym1pdCgpXHJcbiAgICAgIGxldCBmaWx0ZXJMaXN0ID0gdGhpcy5saXN0Lm1hcChpdGVtID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgaWRlbnRpdHlfaWQ6IGl0ZW0ucmVsYXRpb25zaGlwW2l0ZW0uYWN0aXZlSW5kZXhdLmlkLFxyXG4gICAgICAgICAgc3R1ZGVudF9uYW1lOiBpdGVtLnZhbHVlLFxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ2VkaXQnICYmIHRoaXMuY3VycmVudFR5cGU9PT0gJ3BhcmVudHMnKSB7IC8vIOWmguaenOaYr+ebtOaOpeS/ruaUuei6q+S7vee7keWumlxyXG4gICAgICAgIGZpbHRlckxpc3QgPSB0aGlzLmxpc3QubWFwKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaWRlbnRpdHlfaWQ6IGl0ZW0ucmVsYXRpb25zaGlwW2l0ZW0uYWN0aXZlSW5kZXhdLmlkLFxyXG4gICAgICAgICAgICBzdHVkZW50X25hbWU6IGl0ZW0udmFsdWUsXHJcbiAgICAgICAgICAgIG1lbWJlcl9pZGVudGl0eV9pZDogaXRlbS5pZFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5qb2luQ2xhc3NDYWxsYmFjayh0aGlzLmNsYXNzSW5mby5pZCwgZmlsdGVyTGlzdClcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09ICdlZGl0JyAmJiB0aGlzLmN1cnJlbnRUeXBlID09PSAndGVhY2hlcicpIHsvLyDlpoLmnpzmmK/nm7TmjqXkv67mlLnouqvku73nu5HlrppcclxuICAgICAgICB0aGlzLnRlYWNoZXJDYWxsYmFjaygpXHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSAnY3JlYXRlJykgeyAvLyDlpoLmnpzmmK/liJvlu7rnj63nuqflvpdcclxuICAgICAgICBsZXQgY3JlYXRlQ2xhc3NEYXRhID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuY3JlYXRlQ2xhc3NcclxuICAgICAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgICAgIHNjaG9vbF9pZDogY3JlYXRlQ2xhc3NEYXRhLnNjaG9vbF9pZCxcclxuICAgICAgICAgIGdyYWRlX3R5cGU6IGNyZWF0ZUNsYXNzRGF0YS5ncmFkZSxcclxuICAgICAgICAgIHllYXJfY2xhc3M6IGNyZWF0ZUNsYXNzRGF0YS55ZWFyLFxyXG4gICAgICAgICAgY2xhc3M6IGNyZWF0ZUNsYXNzRGF0YS5jbGFzc1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50VHlwZSA9PT0gJ3RlYWNoZXInKSB7XHJcbiAgICAgICAgICBsZXQgaXRlbSA9IHtcclxuICAgICAgICAgICAgdHlwZTogJ3RlYWNoZXInLFxyXG4gICAgICAgICAgICBsaXN0OiBbe25hbWU6IHRoaXMudGVhY2hlck5hbWV9XVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5hZGRDbGFzc0NhbGxiYWNrKGRhdGEsIGl0ZW0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGxldCBpdGVtID0ge1xyXG4gICAgICAgICAgICB0eXBlOiAncGFydGlhcmNoJyxcclxuICAgICAgICAgICAgbGlzdDogZmlsdGVyTGlzdFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5hZGRDbGFzc0NhbGxiYWNrKGRhdGEsIGl0ZW0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gJ2pvaW4nICYmIHRoaXMuY3VycmVudFR5cGUgPT09ICdwYXJlbnRzJykgeyAvLyDlpoLmnpzmmK/liqDlhaXnj63nuqdcclxuICAgICAgICB0aGlzLmpvaW5DbGFzc0NhbGxiYWNrKHRoaXMuam9pbkNsYXNzSWQsIGZpbHRlckxpc3QpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgY2hlY2tDYW5TdWJtaXQoKSB7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50VHlwZSA9PT0gJ3RlYWNoZXInICYmIGlzRW1wdHlTdHJpbmcodGhpcy50ZWFjaGVyTmFtZSkpIHtcclxuICAgICAgc2hvd01zZygn5aaC5p6c5oKo5Yu+6YCJ5LqG6ICB5biI6Lqr5Lu977yM6K+35aGr5YaZ5oKo55qE5aeT5ZCNJylcclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZVxyXG4gIH1cclxuICBjaGVja0RhdGEoKSB7XHJcbiAgICBsZXQgY2FuU3VibWl0ID0gdHJ1ZVxyXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMubGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICBpZiAoaXNFbXB0eVN0cmluZyh0aGlzLmxpc3RbaV0udmFsdWUpKSB7XHJcbiAgICAgICAgY2FuU3VibWl0ID0gZmFsc2VcclxuICAgICAgICBicmVha1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNhblN1Ym1pdCA9IHRydWVcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNhblN1Ym1pdFxyXG4gIH1cclxufVxyXG4iXX0=