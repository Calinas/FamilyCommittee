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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJpbmRSZWxhdGlvbnNoaXAuanMiXSwibmFtZXMiOlsiYmluZFJlbGF0aW9uc2hpcCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwicmVsYXRpb25zaGlwIiwicGFyZW50SW5kZXgiLCJjYW5TdWJtaXQiLCJzdHVkZW50TmFtZSIsInRlYWNoZXJOYW1lIiwibGlzdCIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJjbGFzc0lkIiwiam9pbkNsYXNzSWQiLCJjbGFzc0lkZW50aXR5TGlzdCIsInR5cGUiLCJrZXkiLCJjdXJyZW50VHlwZSIsInJlbGF0aW9uc2hpcFR5cGVzIiwiY2hlY2tlZCIsImxhYmVsIiwidmFsdWUiLCJ3YXRjaCIsIm5ld1ZhbHVlIiwib2xkVmFsdWUiLCJtZXRob2RzIiwicGlja2VyQ2hhbmdlIiwiZSIsImN1cnJlbnRUYXJnZXQiLCJpZCIsImRldGFpbCIsIiRhcHBseSIsImRlbGV0ZSIsImlkeCIsInNwbGljZSIsImFkZE5ldyIsIml0ZW0iLCJhY3RpdmVJbmRleCIsInB1c2giLCJiaW5kRm9ybSIsInRhcmdldCIsImRhdGFzZXQiLCJzdWJtaXQiLCJjaGVja0RhdGEiLCJjaGVja0NhblN1Ym1pdCIsImZpbHRlckxpc3QiLCJtYXAiLCJpZGVudGl0eV9pZCIsInN0dWRlbnRfbmFtZSIsIm1lbWJlcl9pZGVudGl0eV9pZCIsImpvaW5DbGFzc0NhbGxiYWNrIiwidGVhY2hlckNhbGxiYWNrIiwiY3JlYXRlQ2xhc3NEYXRhIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJjcmVhdGVDbGFzcyIsInNjaG9vbF9pZCIsImdyYWRlX3R5cGUiLCJncmFkZSIsInllYXJfY2xhc3MiLCJ5ZWFyIiwiY2xhc3MiLCJuYW1lIiwiYWRkQ2xhc3NDYWxsYmFjayIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJOdW1iZXIiLCJnZXRSZWxhdGlvblNoaXAiLCJPYmplY3QiLCJhc3NpZ24iLCJ0aGVuIiwiY29tbW9uRm4iLCJyZXMiLCJjbGFzc19pZCIsInN1Y2Nlc3MiLCJzZXRUaW1lb3V0Iiwic3dpdGNoVGFiIiwidXJsIiwicXJfY29kZSIsImpvaW5fa2V5IiwiY2xhc3NIYXNDaGFuZ2UiLCJuYXZpZ2F0ZVRvIiwidGVhY2hlck9iaiIsImZpbHRlciIsImFwcF90eXBlIiwicGFyZW50TGlzdCIsInN0dWRlbnQiLCJpZGVudGl0eSIsImxlbmd0aCIsInRlYWNoZXIiLCJpIiwibGVuIiwiZ2V0Q2xhc3NJZGVudGl0eSIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBQ3FCQSxnQjs7Ozs7Ozs7Ozs7Ozs7ME1BQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLG9CQUFjLEVBRFQ7QUFFTEMsbUJBQWEsQ0FGUjtBQUdMQyxpQkFBVyxLQUhOO0FBSUxDLG1CQUFhLEVBSlI7QUFLTEMsbUJBQWEsRUFMUjtBQU1MQyxZQUFNLEVBTkQ7QUFPTEMsa0JBQVksSUFQUDtBQVFMQyxpQkFBVyxJQVJOO0FBU0xDLGVBQVMsQ0FBQyxDQVRMO0FBVUxDLG1CQUFhLENBVlI7QUFXTEMseUJBQW1CLEVBWGQ7QUFZTEMsWUFBTSxRQVpEO0FBYUxDLFdBQUssRUFiQTtBQWNMQyxtQkFBYSxTQWRSO0FBZUxDLHlCQUFtQixDQUNqQjtBQUNFQyxpQkFBUyxJQURYO0FBRUVDLGVBQU8sTUFGVDtBQUdFQyxlQUFPO0FBSFQsT0FEaUIsRUFNakI7QUFDRUYsaUJBQVMsS0FEWDtBQUVFQyxlQUFPLE1BRlQ7QUFHRUMsZUFBTztBQUhULE9BTmlCO0FBZmQsSyxRQTRCUEMsSyxHQUFRO0FBQ05mLGlCQURNLHVCQUNPZ0IsUUFEUCxFQUNpQkMsUUFEakIsRUFDMkI7QUFDL0IsYUFBS2xCLFNBQUwsR0FBaUIsQ0FBQywyQkFBY2lCLFFBQWQsQ0FBbEI7QUFDRDtBQUhLLEssUUE4RVJFLE8sR0FBVTtBQUNSQyxrQkFEUSx3QkFDS0MsQ0FETCxF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QUNBLFlBQU0yQixPQUFPO0FBQ1hoQyx3QkFBYyxPQUFLQSxZQURSO0FBRVhpQixpQkFBTyxFQUZJO0FBR1hnQix1QkFBYTtBQUhGLFNBQWI7QUFLQSxlQUFLNUIsSUFBTCxDQUFVNkIsSUFBVixDQUFlRixJQUFmO0FBQ0EsZUFBS3JCLElBQUwsS0FBYyxNQUFkLElBQXdCLE9BQUs2RSxnQkFBTCxFQUF4QjtBQUNBLGVBQUs3RCxNQUFMO0FBQ0QsT0FWRDtBQVdEOzs7O0VBdE4yQzhELGVBQUtDLEk7O2tCQUE5QjlGLGdCIiwiZmlsZSI6ImJpbmRSZWxhdGlvbnNoaXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgeyBnZXRJZGVudGl0eUxpc3QsIGJpbmRJZGVudGl0eSwgaWRlbnRpdHlMaXN0LCBiaW5kVGVhY2hlciB9IGZyb20gJy4uL2FwaS91c2VyJ1xuaW1wb3J0IHsgYWRkQ2xhc3MsIGpvaW5DbGFzcyB9IGZyb20gJy4uL2FwaS9jcmVhdGVDbGFzcydcbmltcG9ydCB7IHNob3dNc2csIGlzRW1wdHlTdHJpbmcgfSBmcm9tICcuLi91dGlscy9jb21tb24nXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBiaW5kUmVsYXRpb25zaGlwIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfouqvku73nu5HlrponXG4gIH1cbiAgZGF0YSA9IHtcbiAgICByZWxhdGlvbnNoaXA6IFtdLFxuICAgIHBhcmVudEluZGV4OiAwLFxuICAgIGNhblN1Ym1pdDogZmFsc2UsXG4gICAgc3R1ZGVudE5hbWU6ICcnLFxuICAgIHRlYWNoZXJOYW1lOiAnJyxcbiAgICBsaXN0OiBbXSxcbiAgICBtZW1iZXJJbmZvOiBudWxsLFxuICAgIGNsYXNzSW5mbzogbnVsbCxcbiAgICBjbGFzc0lkOiAtMSxcbiAgICBqb2luQ2xhc3NJZDogMCxcbiAgICBjbGFzc0lkZW50aXR5TGlzdDogW10sXG4gICAgdHlwZTogJ2NyZWF0ZScsXG4gICAga2V5OiAnJyxcbiAgICBjdXJyZW50VHlwZTogJ3BhcmVudHMnLFxuICAgIHJlbGF0aW9uc2hpcFR5cGVzOiBbXG4gICAgICB7XG4gICAgICAgIGNoZWNrZWQ6IHRydWUsXG4gICAgICAgIGxhYmVsOiAn5oiR5piv5a626ZW/JyxcbiAgICAgICAgdmFsdWU6ICdwYXJlbnRzJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgY2hlY2tlZDogZmFsc2UsXG4gICAgICAgIGxhYmVsOiAn5oiR5piv5pWZ5biIJyxcbiAgICAgICAgdmFsdWU6ICd0ZWFjaGVyJ1xuICAgICAgfVxuICAgIF1cbiAgfVxuICB3YXRjaCA9IHtcbiAgICBzdHVkZW50TmFtZSAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICB0aGlzLmNhblN1Ym1pdCA9ICFpc0VtcHR5U3RyaW5nKG5ld1ZhbHVlKVxuICAgIH1cbiAgfVxuICBvbkxvYWQoZSkge1xuICAgIHRoaXMubWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcbiAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxuICAgIHRoaXMuam9pbkNsYXNzSWQgPSBOdW1iZXIoZS5pZClcbiAgICB0aGlzLmtleSA9IGUua2V5XG4gICAgdGhpcy50eXBlID0gZS50eXBlXG4gICAgdGhpcy5nZXRSZWxhdGlvblNoaXAoKVxuICAgIHRoaXMuJGFwcGx5KClcbiAgfVxuICBhZGRDbGFzc0NhbGxiYWNrKGRhdGEsIGZpbHRlckxpc3QpIHtcbiAgICBhZGRDbGFzcyhPYmplY3QuYXNzaWduKHt9LCBkYXRhLCB7XG4gICAgICBpdGVtOiBmaWx0ZXJMaXN0XG4gICAgfSkpLnRoZW4ocmVzID0+IHtcbiAgICAgIHRoaXMuY29tbW9uRm4ocmVzKVxuICAgIH0pXG4gIH1cbiAgam9pbkNsYXNzQ2FsbGJhY2soaWQsIGZpbHRlckxpc3QpIHtcbiAgICBiaW5kSWRlbnRpdHkoe1xuICAgICAgY2xhc3NfaWQ6IGlkLFxuICAgICAgaXRlbTogZmlsdGVyTGlzdFxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIGlmKHJlcy5kYXRhLnN1Y2Nlc3Mpe1xuICAgICAgICBzaG93TXNnKCfmiJDlip/nu5Hlrprouqvku70nKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgd3guc3dpdGNoVGFiKHt1cmw6ICd6b25lJ30pXG4gICAgICAgIH0sMjAwMClcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIHRlYWNoZXJDYWxsYmFjaygpIHtcbiAgICBiaW5kVGVhY2hlcih7XG4gICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXG4gICAgICBuYW1lOiB0aGlzLnRlYWNoZXJOYW1lXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgaWYocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICB3eC5zd2l0Y2hUYWIoe3VybDogJ3pvbmUnfSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIGNvbW1vbkZuKHJlcykge1xuICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICBzaG93TXNnKCfnj63nuqfliJvlu7rmiJDlip8nKVxuICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICBsZXQgdXJsID0gYGNyZWF0ZUNsYXNzU3VjY2Vzcz9uYW1lPSR7ZGF0YS5uYW1lfSZjb2RlPSR7ZGF0YS5xcl9jb2RlfSZrZXk9JHtkYXRhLmpvaW5fa2V5fSZjbGFzc0lkPSR7ZGF0YS5pZH1gXG4gICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5jbGFzc0hhc0NoYW5nZSA9IHRydWVcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6IHVybFxuICAgICAgICB9KVxuICAgICAgfSwgMTAwMClcbiAgICB9XG4gIH1cbiAgZ2V0Q2xhc3NJZGVudGl0eSgpIHtcbiAgICBpZGVudGl0eUxpc3Qoe1xuICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgY29uc3QgbGlzdCA9IHJlcy5kYXRhLmxpc3RcbiAgICAgIGNvbnN0IHRlYWNoZXJPYmogPSBsaXN0LmZpbHRlcihpdGVtID0+IGl0ZW0uYXBwX3R5cGUgPT09ICd0ZWFjaGVyJylcbiAgICAgIGNvbnN0IHBhcmVudExpc3QgPSBsaXN0LmZpbHRlcihpdGVtID0+IGl0ZW0uYXBwX3R5cGUgPT09ICdzdHVkZW50JylcbiAgICAgIHRoaXMubGlzdCA9IHBhcmVudExpc3QubWFwKGl0ZW0gPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHJlbGF0aW9uc2hpcDogdGhpcy5yZWxhdGlvbnNoaXAsXG4gICAgICAgICAgdmFsdWU6IGl0ZW0uc3R1ZGVudC5uYW1lLFxuICAgICAgICAgIGFjdGl2ZUluZGV4OiBpdGVtLmlkZW50aXR5LmlkIC0gMSxcbiAgICAgICAgICBpZDogaXRlbS5pZFxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgaWYodGhpcy50ZWFjaGVyT2JqICYmIHRoaXMudGVhY2hlck9iai5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy50ZWFjaGVyTmFtZSA9IHRlYWNoZXJPYmpbMF0udGVhY2hlci5uYW1lXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSlcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIHBpY2tlckNoYW5nZShlKSB7XG4gICAgICB0aGlzW2UuY3VycmVudFRhcmdldC5pZF0gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgZGVsZXRlKGlkeCkge1xuICAgICAgdGhpcy5saXN0LnNwbGljZShpZHgsIDEpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBhZGROZXcoKSB7XG4gICAgICBjb25zdCBpdGVtID0ge1xuICAgICAgICByZWxhdGlvbnNoaXA6IHRoaXMucmVsYXRpb25zaGlwLFxuICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgIGFjdGl2ZUluZGV4OiAwXG4gICAgICB9XG4gICAgICB0aGlzLmxpc3QucHVzaChpdGVtKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgYmluZEZvcm0oZSkge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gZS5jdXJyZW50VGFyZ2V0XG4gICAgICBjb25zdCBpZHggPSB0YXJnZXQuZGF0YXNldC5pZHhcbiAgICAgIHRoaXMubGlzdFtpZHhdW3RhcmdldC5pZF0gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgc3VibWl0KCkge1xuICAgICAgaWYgKHRoaXMuY3VycmVudFR5cGUgPT09ICdwYXJlbnRzJyAmJiAhdGhpcy5jaGVja0RhdGEoKSkge1xuICAgICAgICBzaG93TXNnKCfor7floavlhpnmgqjlranlrZDlp5PlkI0nKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHRoaXMuY2hlY2tDYW5TdWJtaXQoKVxuICAgICAgbGV0IGZpbHRlckxpc3QgPSB0aGlzLmxpc3QubWFwKGl0ZW0gPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGlkZW50aXR5X2lkOiBpdGVtLnJlbGF0aW9uc2hpcFtpdGVtLmFjdGl2ZUluZGV4XS5pZCxcbiAgICAgICAgICBzdHVkZW50X25hbWU6IGl0ZW0udmFsdWUsXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBpZiAodGhpcy50eXBlID09PSAnZWRpdCcgJiYgdGhpcy5jdXJyZW50VHlwZT09PSAncGFyZW50cycpIHsgLy8g5aaC5p6c5piv55u05o6l5L+u5pS56Lqr5Lu957uR5a6aXG4gICAgICAgIGZpbHRlckxpc3QgPSB0aGlzLmxpc3QubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpZGVudGl0eV9pZDogaXRlbS5yZWxhdGlvbnNoaXBbaXRlbS5hY3RpdmVJbmRleF0uaWQsXG4gICAgICAgICAgICBzdHVkZW50X25hbWU6IGl0ZW0udmFsdWUsXG4gICAgICAgICAgICBtZW1iZXJfaWRlbnRpdHlfaWQ6IGl0ZW0uaWRcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuam9pbkNsYXNzQ2FsbGJhY2sodGhpcy5jbGFzc0luZm8uaWQsIGZpbHRlckxpc3QpXG4gICAgICB9IGVsc2UgaWYodGhpcy50eXBlID09PSAnZWRpdCcgJiYgdGhpcy5jdXJyZW50VHlwZSA9PT0gJ3RlYWNoZXInKSB7Ly8g5aaC5p6c5piv55u05o6l5L+u5pS56Lqr5Lu957uR5a6aXG4gICAgICAgIHRoaXMudGVhY2hlckNhbGxiYWNrKClcbiAgICAgIH0gZWxzZSBpZiAoIHRoaXMudHlwZSA9PT0gJ2NyZWF0ZScpIHsgLy8g5aaC5p6c5piv5Yib5bu654+t57qn5b6XXG4gICAgICAgIGxldCBjcmVhdGVDbGFzc0RhdGEgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5jcmVhdGVDbGFzc1xuICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICBzY2hvb2xfaWQ6IGNyZWF0ZUNsYXNzRGF0YS5zY2hvb2xfaWQsXG4gICAgICAgICAgZ3JhZGVfdHlwZTogY3JlYXRlQ2xhc3NEYXRhLmdyYWRlLFxuICAgICAgICAgIHllYXJfY2xhc3M6IGNyZWF0ZUNsYXNzRGF0YS55ZWFyLFxuICAgICAgICAgIGNsYXNzOiBjcmVhdGVDbGFzc0RhdGEuY2xhc3NcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jdXJyZW50VHlwZSA9PT0gJ3RlYWNoZXInKSB7XG4gICAgICAgICAgbGV0IGl0ZW0gPSB7XG4gICAgICAgICAgICB0eXBlOiAndGVhY2hlcicsXG4gICAgICAgICAgICBsaXN0OiBbe25hbWU6IHRoaXMudGVhY2hlck5hbWV9XVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFkZENsYXNzQ2FsbGJhY2soZGF0YSwgaXRlbSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgaXRlbSA9IHtcbiAgICAgICAgICAgIHR5cGU6ICdwYXJ0aWFyY2gnLFxuICAgICAgICAgICAgbGlzdDogZmlsdGVyTGlzdFxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFkZENsYXNzQ2FsbGJhY2soZGF0YSwgaXRlbSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmKHRoaXMudHlwZSA9PT0gJ2pvaW4nICYmIHRoaXMuY3VycmVudFR5cGUgPT09ICdwYXJlbnRzJyl7IC8vIOWmguaenOaYr+WKoOWFpeePree6p1xuICAgICAgICB0aGlzLmpvaW5DbGFzc0NhbGxiYWNrKHRoaXMuam9pbkNsYXNzSWQsIGZpbHRlckxpc3QpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIGNoZWNrQ2FuU3VibWl0KCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRUeXBlID09PSAndGVhY2hlcicgJiYgaXNFbXB0eVN0cmluZyh0aGlzLnRlYWNoZXJOYW1lKSkge1xuICAgICAgc2hvd01zZygn5aaC5p6c5oKo5Yu+6YCJ5LqG6ICB5biI6Lqr5Lu977yM6K+35aGr5YaZ5oKo55qE5aeT5ZCNJylcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG4gIGNoZWNrRGF0YSgpIHtcbiAgICBsZXQgY2FuU3VibWl0ID0gdHJ1ZVxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLmxpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmIChpc0VtcHR5U3RyaW5nKHRoaXMubGlzdFtpXS52YWx1ZSkpIHtcbiAgICAgICAgY2FuU3VibWl0ID0gZmFsc2VcbiAgICAgICAgYnJlYWtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhblN1Ym1pdCA9IHRydWVcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNhblN1Ym1pdFxuICB9XG4gIGdldFJlbGF0aW9uU2hpcCgpIHtcbiAgICBnZXRJZGVudGl0eUxpc3QoKS50aGVuKHJlcyA9PiB7XG4gICAgICB0aGlzLnJlbGF0aW9uc2hpcCA9IHJlcy5kYXRhLmxpc3RcbiAgICAgIGNvbnN0IGl0ZW0gPSB7XG4gICAgICAgIHJlbGF0aW9uc2hpcDogdGhpcy5yZWxhdGlvbnNoaXAsXG4gICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgYWN0aXZlSW5kZXg6IDBcbiAgICAgIH1cbiAgICAgIHRoaXMubGlzdC5wdXNoKGl0ZW0pXG4gICAgICB0aGlzLnR5cGUgPT09ICdlZGl0JyAmJiB0aGlzLmdldENsYXNzSWRlbnRpdHkoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0pXG4gIH1cbn1cbiJdfQ==