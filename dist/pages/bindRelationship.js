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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJpbmRSZWxhdGlvbnNoaXAuanMiXSwibmFtZXMiOlsic3RvcmUiLCJiaW5kUmVsYXRpb25zaGlwIiwicmVsYXRpb25zaGlwIiwic3RhdGUiLCJ6b25lIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJwYXJlbnRJbmRleCIsImNhblN1Ym1pdCIsInN0dWRlbnROYW1lIiwidGVhY2hlck5hbWUiLCJsaXN0IiwibWVtYmVySW5mbyIsImNsYXNzSW5mbyIsImNsYXNzSWQiLCJqb2luQ2xhc3NJZCIsImNsYXNzSWRlbnRpdHlMaXN0IiwidHlwZSIsImtleSIsImN1cnJlbnRUeXBlIiwicmVsYXRpb25zaGlwVHlwZXMiLCJjaGVja2VkIiwibGFiZWwiLCJ2YWx1ZSIsIndhdGNoIiwibmV3VmFsdWUiLCJvbGRWYWx1ZSIsImxlbmd0aCIsImFkZE5ld0ZuIiwibWV0aG9kcyIsInBpY2tlckNoYW5nZSIsImUiLCJjdXJyZW50VGFyZ2V0IiwiaWQiLCJkZXRhaWwiLCIkYXBwbHkiLCJkZWxldGUiLCJpZHgiLCJzcGxpY2UiLCJhZGROZXciLCJiaW5kRm9ybSIsInRhcmdldCIsImRhdGFzZXQiLCJzdWJtaXQiLCJjaGVja0RhdGEiLCJjaGVja0NhblN1Ym1pdCIsImZpbHRlckxpc3QiLCJtYXAiLCJpZGVudGl0eV9pZCIsIml0ZW0iLCJhY3RpdmVJbmRleCIsInN0dWRlbnRfbmFtZSIsIm1lbWJlcl9pZGVudGl0eV9pZCIsImpvaW5DbGFzc0NhbGxiYWNrIiwidGVhY2hlckNhbGxiYWNrIiwiY3JlYXRlQ2xhc3NEYXRhIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJjcmVhdGVDbGFzcyIsInNjaG9vbF9pZCIsImdyYWRlX3R5cGUiLCJncmFkZSIsInllYXJfY2xhc3MiLCJ5ZWFyIiwiY2xhc3MiLCJuYW1lIiwiYWRkQ2xhc3NDYWxsYmFjayIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJOdW1iZXIiLCJnZXRDbGFzc0lkZW50aXR5IiwiT2JqZWN0IiwiYXNzaWduIiwidGhlbiIsImNvbW1vbkZuIiwicmVzIiwiY2xhc3NfaWQiLCJzdWNjZXNzIiwic2V0VGltZW91dCIsInN3aXRjaFRhYiIsInVybCIsInNldFN0b3JhZ2UiLCJxcl9jb2RlIiwiam9pbl9rZXkiLCJjbGFzc0hhc0NoYW5nZSIsIm5hdmlnYXRlVG8iLCJ0ZWFjaGVyT2JqIiwiZmlsdGVyIiwiYXBwX3R5cGUiLCJwYXJlbnRMaXN0Iiwic3R1ZGVudCIsImlkZW50aXR5IiwidGVhY2hlciIsInB1c2giLCJpIiwibGVuIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztBQUNBLElBQUlBLFFBQVEsMEJBQVo7O0lBT3FCQyxnQixXQUxwQix3QkFBUTtBQUNQQyxjQURPLHdCQUNNQyxLQUROLEVBQ1k7QUFDakIsV0FBT0EsTUFBTUMsSUFBTixDQUFXRixZQUFsQjtBQUNEO0FBSE0sQ0FBUixDOzs7Ozs7Ozs7Ozs7OzswTUFNQ0csTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxtQkFBYSxDQURSO0FBRUxDLGlCQUFXLEtBRk47QUFHTEMsbUJBQWEsRUFIUjtBQUlMQyxtQkFBYSxFQUpSO0FBS0xDLFlBQU0sRUFMRDtBQU1MQyxrQkFBWSxJQU5QO0FBT0xDLGlCQUFXLElBUE47QUFRTEMsZUFBUyxDQUFDLENBUkw7QUFTTEMsbUJBQWEsQ0FUUjtBQVVMQyx5QkFBbUIsRUFWZDtBQVdMQyxZQUFNLFFBWEQ7QUFZTEMsV0FBSyxFQVpBO0FBYUxDLG1CQUFhLFNBYlI7QUFjTEMseUJBQW1CLENBQ2pCO0FBQ0VDLGlCQUFTLElBRFg7QUFFRUMsZUFBTyxNQUZUO0FBR0VDLGVBQU87QUFIVCxPQURpQixFQU1qQjtBQUNFRixpQkFBUyxLQURYO0FBRUVDLGVBQU8sTUFGVDtBQUdFQyxlQUFPO0FBSFQsT0FOaUI7QUFkZCxLLFFBMkJQQyxLLEdBQVE7QUFD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SUFBa0MsMkJBQWMsS0FBS1QsV0FBbkIsQ0FBdEMsRUFBdUU7QUFDckUsNkJBQVEsb0JBQVI7QUFDQSxlQUFPLEtBQVA7QUFDRDtBQUNELGFBQU8sSUFBUDtBQUNEOzs7Z0NBQ1c7QUFDVixVQUFJRixZQUFZLElBQWhCO0FBQ0EsV0FBSyxJQUFJc0YsSUFBSSxDQUFSLEVBQVdDLE1BQU0sS0FBS3BGLElBQUwsQ0FBVWdCLE1BQWhDLEVBQXdDbUUsSUFBSUMsR0FBNUMsRUFBaURELEdBQWpELEVBQXNEO0FBQ3BELFlBQUksMkJBQWMsS0FBS25GLElBQUwsQ0FBVW1GLENBQVYsRUFBYXZFLEtBQTNCLENBQUosRUFBdUM7QUFDckNmLHNCQUFZLEtBQVo7QUFDQTtBQUNELFNBSEQsTUFHTztBQUNMQSxzQkFBWSxJQUFaO0FBQ0Q7QUFDRjtBQUNELGFBQU9BLFNBQVA7QUFDRDs7OztFQXJOMkN3RixlQUFLQyxJO2tCQUE5QmpHLGdCIiwiZmlsZSI6ImJpbmRSZWxhdGlvbnNoaXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgeyBjb25uZWN0LCBnZXRTdG9yZSB9IGZyb20gJ3dlcHktcmVkdXgnXG5pbXBvcnQgeyBzYXZlSWRlbnRpdHlMaXN0IH0gZnJvbSAnLi4vc3RvcmUvYWN0aW9ucydcbmltcG9ydCB7IGdldElkZW50aXR5TGlzdCwgYmluZElkZW50aXR5LCBpZGVudGl0eUxpc3QsIGJpbmRUZWFjaGVyIH0gZnJvbSAnLi4vYXBpL3VzZXInXG5pbXBvcnQgeyBhZGRDbGFzcyB9IGZyb20gJy4uL2FwaS9jcmVhdGVDbGFzcydcbmltcG9ydCB7IHNob3dNc2csIGlzRW1wdHlTdHJpbmcgfSBmcm9tICcuLi91dGlscy9jb21tb24nXG5sZXQgc3RvcmUgPSBnZXRTdG9yZSgpXG5cbkBjb25uZWN0KHtcbiAgcmVsYXRpb25zaGlwKHN0YXRlKXtcbiAgICByZXR1cm4gc3RhdGUuem9uZS5yZWxhdGlvbnNoaXBcbiAgfVxufSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGJpbmRSZWxhdGlvbnNoaXAgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+i6q+S7vee7keWumidcbiAgfVxuICBkYXRhID0ge1xuICAgIHBhcmVudEluZGV4OiAwLFxuICAgIGNhblN1Ym1pdDogZmFsc2UsXG4gICAgc3R1ZGVudE5hbWU6ICcnLFxuICAgIHRlYWNoZXJOYW1lOiAnJyxcbiAgICBsaXN0OiBbXSxcbiAgICBtZW1iZXJJbmZvOiBudWxsLFxuICAgIGNsYXNzSW5mbzogbnVsbCxcbiAgICBjbGFzc0lkOiAtMSxcbiAgICBqb2luQ2xhc3NJZDogMCxcbiAgICBjbGFzc0lkZW50aXR5TGlzdDogW10sXG4gICAgdHlwZTogJ2NyZWF0ZScsXG4gICAga2V5OiAnJyxcbiAgICBjdXJyZW50VHlwZTogJ3BhcmVudHMnLFxuICAgIHJlbGF0aW9uc2hpcFR5cGVzOiBbXG4gICAgICB7XG4gICAgICAgIGNoZWNrZWQ6IHRydWUsXG4gICAgICAgIGxhYmVsOiAn5oiR5piv5a626ZW/JyxcbiAgICAgICAgdmFsdWU6ICdwYXJlbnRzJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgY2hlY2tlZDogZmFsc2UsXG4gICAgICAgIGxhYmVsOiAn5oiR5piv5pWZ5biIJyxcbiAgICAgICAgdmFsdWU6ICd0ZWFjaGVyJ1xuICAgICAgfVxuICAgIF1cbiAgfVxuICB3YXRjaCA9IHtcbiAgICByZWxhdGlvbnNoaXAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICBpZiAoIW9sZFZhbHVlLmxlbmd0aCAmJiBuZXdWYWx1ZS5sZW5ndGggJiYgdGhpcy50eXBlID09PSAnY3JlYXRlJykge1xuICAgICAgICB0aGlzLmFkZE5ld0ZuKClcbiAgICAgIH1cbiAgICB9LFxuICAgIHN0dWRlbnROYW1lIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgIHRoaXMuY2FuU3VibWl0ID0gIWlzRW1wdHlTdHJpbmcobmV3VmFsdWUpXG4gICAgfVxuICB9XG4gIG9uTG9hZChlKSB7XG4gICAgIXRoaXMucmVsYXRpb25zaGlwLmxlbmd0aCAmJiBzYXZlSWRlbnRpdHlMaXN0KClcbiAgICB0aGlzLm1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXG4gICAgdGhpcy5jbGFzc0luZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnY2xhc3NJbmZvJylcbiAgICB0aGlzLmpvaW5DbGFzc0lkID0gTnVtYmVyKGUuaWQpXG4gICAgdGhpcy5rZXkgPSBlLmtleVxuICAgIHRoaXMudHlwZSA9IGUudHlwZVxuICAgIHRoaXMudHlwZSA9PT0gJ2VkaXQnICYmIHRoaXMuZ2V0Q2xhc3NJZGVudGl0eSgpXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIGFkZENsYXNzQ2FsbGJhY2soZGF0YSwgZmlsdGVyTGlzdCkge1xuICAgIGFkZENsYXNzKE9iamVjdC5hc3NpZ24oe30sIGRhdGEsIHtcbiAgICAgIGl0ZW06IGZpbHRlckxpc3RcbiAgICB9KSkudGhlbihyZXMgPT4ge1xuICAgICAgdGhpcy5jb21tb25GbihyZXMpXG4gICAgfSlcbiAgfVxuICBqb2luQ2xhc3NDYWxsYmFjayhpZCwgZmlsdGVyTGlzdCkge1xuICAgIGJpbmRJZGVudGl0eSh7XG4gICAgICBjbGFzc19pZDogaWQsXG4gICAgICBpdGVtOiBmaWx0ZXJMaXN0XG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgc2hvd01zZygn5oiQ5Yqf57uR5a6a6Lqr5Lu9JylcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgd3guc3dpdGNoVGFiKHt1cmw6ICd6b25lJ30pXG4gICAgICAgIH0sIDIwMDApXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICB0ZWFjaGVyQ2FsbGJhY2soKSB7XG4gICAgYmluZFRlYWNoZXIoe1xuICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgbmFtZTogdGhpcy50ZWFjaGVyTmFtZVxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgIHd4LnN3aXRjaFRhYih7dXJsOiAnem9uZSd9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgY29tbW9uRm4ocmVzKSB7XG4gICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgIHNob3dNc2coJ+ePree6p+WIm+W7uuaIkOWKnycpXG4gICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAgICBrZXk6ICdjbGFzc0luZm8nLFxuICAgICAgICBkYXRhOiBkYXRhXG4gICAgICB9KVxuICAgICAgbGV0IHVybCA9IGBjcmVhdGVDbGFzc1N1Y2Nlc3M/bmFtZT0ke2RhdGEubmFtZX0mY29kZT0ke2RhdGEucXJfY29kZX0ma2V5PSR7ZGF0YS5qb2luX2tleX0mY2xhc3NJZD0ke2RhdGEuaWR9YFxuICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuY2xhc3NIYXNDaGFuZ2UgPSB0cnVlXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiB1cmxcbiAgICAgICAgfSlcbiAgICAgIH0sIDEwMDApXG4gICAgfVxuICB9XG4gIGdldENsYXNzSWRlbnRpdHkoKSB7XG4gICAgaWRlbnRpdHlMaXN0KHtcbiAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZFxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIGNvbnN0IGxpc3QgPSByZXMuZGF0YS5saXN0XG4gICAgICBjb25zdCB0ZWFjaGVyT2JqID0gbGlzdC5maWx0ZXIoaXRlbSA9PiBpdGVtLmFwcF90eXBlID09PSAndGVhY2hlcicpXG4gICAgICBjb25zdCBwYXJlbnRMaXN0ID0gbGlzdC5maWx0ZXIoaXRlbSA9PiBpdGVtLmFwcF90eXBlID09PSAnc3R1ZGVudCcpXG4gICAgICB0aGlzLmxpc3QgPSBwYXJlbnRMaXN0Lm1hcChpdGVtID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICByZWxhdGlvbnNoaXA6IHRoaXMucmVsYXRpb25zaGlwLFxuICAgICAgICAgIHZhbHVlOiBpdGVtLnN0dWRlbnQubmFtZSxcbiAgICAgICAgICBhY3RpdmVJbmRleDogaXRlbS5pZGVudGl0eS5pZCAtIDEsXG4gICAgICAgICAgaWQ6IGl0ZW0uaWRcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGlmICh0aGlzLnRlYWNoZXJPYmogJiYgdGhpcy50ZWFjaGVyT2JqLmxlbmd0aCkge1xuICAgICAgICB0aGlzLnRlYWNoZXJOYW1lID0gdGVhY2hlck9ialswXS50ZWFjaGVyLm5hbWVcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9KVxuICB9XG4gIGFkZE5ld0ZuKCkge1xuICAgIGNvbnN0IGl0ZW0gPSB7XG4gICAgICByZWxhdGlvbnNoaXA6IHRoaXMucmVsYXRpb25zaGlwLFxuICAgICAgdmFsdWU6ICcnLFxuICAgICAgYWN0aXZlSW5kZXg6IDBcbiAgICB9XG4gICAgdGhpcy5saXN0LnB1c2goaXRlbSlcbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBwaWNrZXJDaGFuZ2UoZSkge1xuICAgICAgdGhpc1tlLmN1cnJlbnRUYXJnZXQuaWRdID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGRlbGV0ZShpZHgpIHtcbiAgICAgIHRoaXMubGlzdC5zcGxpY2UoaWR4LCAxKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgYWRkTmV3KCkge1xuICAgICAgdGhpcy5hZGROZXdGbigpXG4gICAgfSxcbiAgICBiaW5kRm9ybShlKSB7XG4gICAgICBjb25zdCB0YXJnZXQgPSBlLmN1cnJlbnRUYXJnZXRcbiAgICAgIGNvbnN0IGlkeCA9IHRhcmdldC5kYXRhc2V0LmlkeFxuICAgICAgdGhpcy5saXN0W2lkeF1bdGFyZ2V0LmlkXSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBzdWJtaXQoKSB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50VHlwZSA9PT0gJ3BhcmVudHMnICYmICF0aGlzLmNoZWNrRGF0YSgpKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+Whq+WGmeaCqOWtqeWtkOWnk+WQjScpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdGhpcy5jaGVja0NhblN1Ym1pdCgpXG4gICAgICBsZXQgZmlsdGVyTGlzdCA9IHRoaXMubGlzdC5tYXAoaXRlbSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaWRlbnRpdHlfaWQ6IGl0ZW0ucmVsYXRpb25zaGlwW2l0ZW0uYWN0aXZlSW5kZXhdLmlkLFxuICAgICAgICAgIHN0dWRlbnRfbmFtZTogaXRlbS52YWx1ZSxcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdlZGl0JyAmJiB0aGlzLmN1cnJlbnRUeXBlPT09ICdwYXJlbnRzJykgeyAvLyDlpoLmnpzmmK/nm7TmjqXkv67mlLnouqvku73nu5HlrppcbiAgICAgICAgZmlsdGVyTGlzdCA9IHRoaXMubGlzdC5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkZW50aXR5X2lkOiBpdGVtLnJlbGF0aW9uc2hpcFtpdGVtLmFjdGl2ZUluZGV4XS5pZCxcbiAgICAgICAgICAgIHN0dWRlbnRfbmFtZTogaXRlbS52YWx1ZSxcbiAgICAgICAgICAgIG1lbWJlcl9pZGVudGl0eV9pZDogaXRlbS5pZFxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5qb2luQ2xhc3NDYWxsYmFjayh0aGlzLmNsYXNzSW5mby5pZCwgZmlsdGVyTGlzdClcbiAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSAnZWRpdCcgJiYgdGhpcy5jdXJyZW50VHlwZSA9PT0gJ3RlYWNoZXInKSB7Ly8g5aaC5p6c5piv55u05o6l5L+u5pS56Lqr5Lu957uR5a6aXG4gICAgICAgIHRoaXMudGVhY2hlckNhbGxiYWNrKClcbiAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSAnY3JlYXRlJykgeyAvLyDlpoLmnpzmmK/liJvlu7rnj63nuqflvpdcbiAgICAgICAgbGV0IGNyZWF0ZUNsYXNzRGF0YSA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmNyZWF0ZUNsYXNzXG4gICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgIHNjaG9vbF9pZDogY3JlYXRlQ2xhc3NEYXRhLnNjaG9vbF9pZCxcbiAgICAgICAgICBncmFkZV90eXBlOiBjcmVhdGVDbGFzc0RhdGEuZ3JhZGUsXG4gICAgICAgICAgeWVhcl9jbGFzczogY3JlYXRlQ2xhc3NEYXRhLnllYXIsXG4gICAgICAgICAgY2xhc3M6IGNyZWF0ZUNsYXNzRGF0YS5jbGFzc1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRUeXBlID09PSAndGVhY2hlcicpIHtcbiAgICAgICAgICBsZXQgaXRlbSA9IHtcbiAgICAgICAgICAgIHR5cGU6ICd0ZWFjaGVyJyxcbiAgICAgICAgICAgIGxpc3Q6IFt7bmFtZTogdGhpcy50ZWFjaGVyTmFtZX1dXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYWRkQ2xhc3NDYWxsYmFjayhkYXRhLCBpdGVtKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxldCBpdGVtID0ge1xuICAgICAgICAgICAgdHlwZTogJ3BhcnRpYXJjaCcsXG4gICAgICAgICAgICBsaXN0OiBmaWx0ZXJMaXN0XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYWRkQ2xhc3NDYWxsYmFjayhkYXRhLCBpdGVtKVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gJ2pvaW4nICYmIHRoaXMuY3VycmVudFR5cGUgPT09ICdwYXJlbnRzJykgeyAvLyDlpoLmnpzmmK/liqDlhaXnj63nuqdcbiAgICAgICAgdGhpcy5qb2luQ2xhc3NDYWxsYmFjayh0aGlzLmpvaW5DbGFzc0lkLCBmaWx0ZXJMaXN0KVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBjaGVja0NhblN1Ym1pdCgpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50VHlwZSA9PT0gJ3RlYWNoZXInICYmIGlzRW1wdHlTdHJpbmcodGhpcy50ZWFjaGVyTmFtZSkpIHtcbiAgICAgIHNob3dNc2coJ+WmguaenOaCqOWLvumAieS6huiAgeW4iOi6q+S7ve+8jOivt+Whq+WGmeaCqOeahOWnk+WQjScpXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuICBjaGVja0RhdGEoKSB7XG4gICAgbGV0IGNhblN1Ym1pdCA9IHRydWVcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5saXN0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBpZiAoaXNFbXB0eVN0cmluZyh0aGlzLmxpc3RbaV0udmFsdWUpKSB7XG4gICAgICAgIGNhblN1Ym1pdCA9IGZhbHNlXG4gICAgICAgIGJyZWFrXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYW5TdWJtaXQgPSB0cnVlXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjYW5TdWJtaXRcbiAgfVxufVxuIl19