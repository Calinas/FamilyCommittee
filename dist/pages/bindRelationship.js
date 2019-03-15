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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJpbmRSZWxhdGlvbnNoaXAuanMiXSwibmFtZXMiOlsiYmluZFJlbGF0aW9uc2hpcCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwicmVsYXRpb25zaGlwIiwicGFyZW50SW5kZXgiLCJjYW5TdWJtaXQiLCJzdHVkZW50TmFtZSIsInRlYWNoZXJOYW1lIiwibGlzdCIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJjbGFzc0lkIiwiam9pbkNsYXNzSWQiLCJjbGFzc0lkZW50aXR5TGlzdCIsInR5cGUiLCJrZXkiLCJjdXJyZW50VHlwZSIsInJlbGF0aW9uc2hpcFR5cGVzIiwiY2hlY2tlZCIsImxhYmVsIiwidmFsdWUiLCJ3YXRjaCIsIm5ld1ZhbHVlIiwib2xkVmFsdWUiLCJtZXRob2RzIiwicGlja2VyQ2hhbmdlIiwiZSIsImN1cnJlbnRUYXJnZXQiLCJpZCIsImRldGFpbCIsIiRhcHBseSIsImRlbGV0ZSIsImlkeCIsInNwbGljZSIsImFkZE5ldyIsIml0ZW0iLCJhY3RpdmVJbmRleCIsInB1c2giLCJiaW5kRm9ybSIsInRhcmdldCIsImRhdGFzZXQiLCJzdWJtaXQiLCJjaGVja0RhdGEiLCJjaGVja0NhblN1Ym1pdCIsImZpbHRlckxpc3QiLCJtYXAiLCJpZGVudGl0eV9pZCIsInN0dWRlbnRfbmFtZSIsIm1lbWJlcl9pZGVudGl0eV9pZCIsImpvaW5DbGFzc0NhbGxiYWNrIiwidGVhY2hlckNhbGxiYWNrIiwiY3JlYXRlQ2xhc3NEYXRhIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJjcmVhdGVDbGFzcyIsInNjaG9vbF9pZCIsImdyYWRlX3R5cGUiLCJncmFkZSIsInllYXJfY2xhc3MiLCJ5ZWFyIiwiY2xhc3MiLCJuYW1lIiwiYWRkQ2xhc3NDYWxsYmFjayIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJOdW1iZXIiLCJnZXRSZWxhdGlvblNoaXAiLCJPYmplY3QiLCJhc3NpZ24iLCJ0aGVuIiwiY29tbW9uRm4iLCJyZXMiLCJjbGFzc19pZCIsInN1Y2Nlc3MiLCJzZXRUaW1lb3V0Iiwic3dpdGNoVGFiIiwidXJsIiwic2V0U3RvcmFnZSIsInFyX2NvZGUiLCJqb2luX2tleSIsImNsYXNzSGFzQ2hhbmdlIiwibmF2aWdhdGVUbyIsInRlYWNoZXJPYmoiLCJmaWx0ZXIiLCJhcHBfdHlwZSIsInBhcmVudExpc3QiLCJzdHVkZW50IiwiaWRlbnRpdHkiLCJsZW5ndGgiLCJ0ZWFjaGVyIiwiaSIsImxlbiIsImdldENsYXNzSWRlbnRpdHkiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQUNxQkEsZ0I7Ozs7Ozs7Ozs7Ozs7OzBNQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxvQkFBYyxFQURUO0FBRUxDLG1CQUFhLENBRlI7QUFHTEMsaUJBQVcsS0FITjtBQUlMQyxtQkFBYSxFQUpSO0FBS0xDLG1CQUFhLEVBTFI7QUFNTEMsWUFBTSxFQU5EO0FBT0xDLGtCQUFZLElBUFA7QUFRTEMsaUJBQVcsSUFSTjtBQVNMQyxlQUFTLENBQUMsQ0FUTDtBQVVMQyxtQkFBYSxDQVZSO0FBV0xDLHlCQUFtQixFQVhkO0FBWUxDLFlBQU0sUUFaRDtBQWFMQyxXQUFLLEVBYkE7QUFjTEMsbUJBQWEsU0FkUjtBQWVMQyx5QkFBbUIsQ0FDakI7QUFDRUMsaUJBQVMsSUFEWDtBQUVFQyxlQUFPLE1BRlQ7QUFHRUMsZUFBTztBQUhULE9BRGlCLEVBTWpCO0FBQ0VGLGlCQUFTLEtBRFg7QUFFRUMsZUFBTyxNQUZUO0FBR0VDLGVBQU87QUFIVCxPQU5pQjtBQWZkLEssUUE0QlBDLEssR0FBUTtBQUNOZixpQkFETSx1QkFDT2dCLFFBRFAsRUFDaUJDLFFBRGpCLEVBQzJCO0FBQy9CLGFBQUtsQixTQUFMLEdBQWlCLENBQUMsMkJBQWNpQixRQUFkLENBQWxCO0FBQ0Q7QUFISyxLLFFBa0ZSRSxPLEdBQVU7QUFDUkMsa0JBRFEs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Q0FBa0JnRSxJQUFsQixDQUF1QixlQUFPO0FBQzVCLGVBQUtsRSxZQUFMLEdBQW9Cb0UsSUFBSXJFLElBQUosQ0FBU00sSUFBN0I7QUFDQSxZQUFNMkIsT0FBTztBQUNYaEMsd0JBQWMsT0FBS0EsWUFEUjtBQUVYaUIsaUJBQU8sRUFGSTtBQUdYZ0IsdUJBQWE7QUFIRixTQUFiO0FBS0EsZUFBSzVCLElBQUwsQ0FBVTZCLElBQVYsQ0FBZUYsSUFBZjtBQUNBLGVBQUtyQixJQUFMLEtBQWMsTUFBZCxJQUF3QixPQUFLOEUsZ0JBQUwsRUFBeEI7QUFDQSxlQUFLOUQsTUFBTDtBQUNELE9BVkQ7QUFXRDs7OztFQTFOMkMrRCxlQUFLQyxJOztrQkFBOUIvRixnQiIsImZpbGUiOiJiaW5kUmVsYXRpb25zaGlwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHsgZ2V0SWRlbnRpdHlMaXN0LCBiaW5kSWRlbnRpdHksIGlkZW50aXR5TGlzdCwgYmluZFRlYWNoZXIgfSBmcm9tICcuLi9hcGkvdXNlcidcbmltcG9ydCB7IGFkZENsYXNzIH0gZnJvbSAnLi4vYXBpL2NyZWF0ZUNsYXNzJ1xuaW1wb3J0IHsgc2hvd01zZywgaXNFbXB0eVN0cmluZyB9IGZyb20gJy4uL3V0aWxzL2NvbW1vbidcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGJpbmRSZWxhdGlvbnNoaXAgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+i6q+S7vee7keWumidcbiAgfVxuICBkYXRhID0ge1xuICAgIHJlbGF0aW9uc2hpcDogW10sXG4gICAgcGFyZW50SW5kZXg6IDAsXG4gICAgY2FuU3VibWl0OiBmYWxzZSxcbiAgICBzdHVkZW50TmFtZTogJycsXG4gICAgdGVhY2hlck5hbWU6ICcnLFxuICAgIGxpc3Q6IFtdLFxuICAgIG1lbWJlckluZm86IG51bGwsXG4gICAgY2xhc3NJbmZvOiBudWxsLFxuICAgIGNsYXNzSWQ6IC0xLFxuICAgIGpvaW5DbGFzc0lkOiAwLFxuICAgIGNsYXNzSWRlbnRpdHlMaXN0OiBbXSxcbiAgICB0eXBlOiAnY3JlYXRlJyxcbiAgICBrZXk6ICcnLFxuICAgIGN1cnJlbnRUeXBlOiAncGFyZW50cycsXG4gICAgcmVsYXRpb25zaGlwVHlwZXM6IFtcbiAgICAgIHtcbiAgICAgICAgY2hlY2tlZDogdHJ1ZSxcbiAgICAgICAgbGFiZWw6ICfmiJHmmK/lrrbplb8nLFxuICAgICAgICB2YWx1ZTogJ3BhcmVudHMnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBjaGVja2VkOiBmYWxzZSxcbiAgICAgICAgbGFiZWw6ICfmiJHmmK/mlZnluIgnLFxuICAgICAgICB2YWx1ZTogJ3RlYWNoZXInXG4gICAgICB9XG4gICAgXVxuICB9XG4gIHdhdGNoID0ge1xuICAgIHN0dWRlbnROYW1lIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgIHRoaXMuY2FuU3VibWl0ID0gIWlzRW1wdHlTdHJpbmcobmV3VmFsdWUpXG4gICAgfVxuICB9XG4gIG9uTG9hZChlKSB7XG4gICAgdGhpcy5tZW1iZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nKVxuICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXG4gICAgdGhpcy5qb2luQ2xhc3NJZCA9IE51bWJlcihlLmlkKVxuICAgIHRoaXMua2V5ID0gZS5rZXlcbiAgICB0aGlzLnR5cGUgPSBlLnR5cGVcbiAgICB0aGlzLmdldFJlbGF0aW9uU2hpcCgpXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIGFkZENsYXNzQ2FsbGJhY2soZGF0YSwgZmlsdGVyTGlzdCkge1xuICAgIGFkZENsYXNzKE9iamVjdC5hc3NpZ24oe30sIGRhdGEsIHtcbiAgICAgIGl0ZW06IGZpbHRlckxpc3RcbiAgICB9KSkudGhlbihyZXMgPT4ge1xuICAgICAgdGhpcy5jb21tb25GbihyZXMpXG4gICAgfSlcbiAgfVxuICBqb2luQ2xhc3NDYWxsYmFjayhpZCwgZmlsdGVyTGlzdCkge1xuICAgIGJpbmRJZGVudGl0eSh7XG4gICAgICBjbGFzc19pZDogaWQsXG4gICAgICBpdGVtOiBmaWx0ZXJMaXN0XG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgc2hvd01zZygn5oiQ5Yqf57uR5a6a6Lqr5Lu9JylcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgd3guc3dpdGNoVGFiKHt1cmw6ICd6b25lJ30pXG4gICAgICAgIH0sIDIwMDApXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICB0ZWFjaGVyQ2FsbGJhY2soKSB7XG4gICAgYmluZFRlYWNoZXIoe1xuICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgbmFtZTogdGhpcy50ZWFjaGVyTmFtZVxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgIHd4LnN3aXRjaFRhYih7dXJsOiAnem9uZSd9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgY29tbW9uRm4ocmVzKSB7XG4gICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgIHNob3dNc2coJ+ePree6p+WIm+W7uuaIkOWKnycpXG4gICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAgICBrZXk6ICdjbGFzc0luZm8nLFxuICAgICAgICBkYXRhOiBkYXRhXG4gICAgICB9KVxuICAgICAgbGV0IHVybCA9IGBjcmVhdGVDbGFzc1N1Y2Nlc3M/bmFtZT0ke2RhdGEubmFtZX0mY29kZT0ke2RhdGEucXJfY29kZX0ma2V5PSR7ZGF0YS5qb2luX2tleX0mY2xhc3NJZD0ke2RhdGEuaWR9YFxuICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuY2xhc3NIYXNDaGFuZ2UgPSB0cnVlXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiB1cmxcbiAgICAgICAgfSlcbiAgICAgIH0sIDEwMDApXG4gICAgfVxuICB9XG4gIGdldENsYXNzSWRlbnRpdHkoKSB7XG4gICAgaWRlbnRpdHlMaXN0KHtcbiAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZFxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIGNvbnN0IGxpc3QgPSByZXMuZGF0YS5saXN0XG4gICAgICBjb25zdCB0ZWFjaGVyT2JqID0gbGlzdC5maWx0ZXIoaXRlbSA9PiBpdGVtLmFwcF90eXBlID09PSAndGVhY2hlcicpXG4gICAgICBjb25zdCBwYXJlbnRMaXN0ID0gbGlzdC5maWx0ZXIoaXRlbSA9PiBpdGVtLmFwcF90eXBlID09PSAnc3R1ZGVudCcpXG4gICAgICB0aGlzLmxpc3QgPSBwYXJlbnRMaXN0Lm1hcChpdGVtID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICByZWxhdGlvbnNoaXA6IHRoaXMucmVsYXRpb25zaGlwLFxuICAgICAgICAgIHZhbHVlOiBpdGVtLnN0dWRlbnQubmFtZSxcbiAgICAgICAgICBhY3RpdmVJbmRleDogaXRlbS5pZGVudGl0eS5pZCAtIDEsXG4gICAgICAgICAgaWQ6IGl0ZW0uaWRcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGlmICh0aGlzLnRlYWNoZXJPYmogJiYgdGhpcy50ZWFjaGVyT2JqLmxlbmd0aCkge1xuICAgICAgICB0aGlzLnRlYWNoZXJOYW1lID0gdGVhY2hlck9ialswXS50ZWFjaGVyLm5hbWVcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9KVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgcGlja2VyQ2hhbmdlKGUpIHtcbiAgICAgIHRoaXNbZS5jdXJyZW50VGFyZ2V0LmlkXSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBkZWxldGUoaWR4KSB7XG4gICAgICB0aGlzLmxpc3Quc3BsaWNlKGlkeCwgMSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGFkZE5ldygpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSB7XG4gICAgICAgIHJlbGF0aW9uc2hpcDogdGhpcy5yZWxhdGlvbnNoaXAsXG4gICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgYWN0aXZlSW5kZXg6IDBcbiAgICAgIH1cbiAgICAgIHRoaXMubGlzdC5wdXNoKGl0ZW0pXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBiaW5kRm9ybShlKSB7XG4gICAgICBjb25zdCB0YXJnZXQgPSBlLmN1cnJlbnRUYXJnZXRcbiAgICAgIGNvbnN0IGlkeCA9IHRhcmdldC5kYXRhc2V0LmlkeFxuICAgICAgdGhpcy5saXN0W2lkeF1bdGFyZ2V0LmlkXSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBzdWJtaXQoKSB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50VHlwZSA9PT0gJ3BhcmVudHMnICYmICF0aGlzLmNoZWNrRGF0YSgpKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+Whq+WGmeaCqOWtqeWtkOWnk+WQjScpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdGhpcy5jaGVja0NhblN1Ym1pdCgpXG4gICAgICBsZXQgZmlsdGVyTGlzdCA9IHRoaXMubGlzdC5tYXAoaXRlbSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaWRlbnRpdHlfaWQ6IGl0ZW0ucmVsYXRpb25zaGlwW2l0ZW0uYWN0aXZlSW5kZXhdLmlkLFxuICAgICAgICAgIHN0dWRlbnRfbmFtZTogaXRlbS52YWx1ZSxcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdlZGl0JyAmJiB0aGlzLmN1cnJlbnRUeXBlPT09ICdwYXJlbnRzJykgeyAvLyDlpoLmnpzmmK/nm7TmjqXkv67mlLnouqvku73nu5HlrppcbiAgICAgICAgZmlsdGVyTGlzdCA9IHRoaXMubGlzdC5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkZW50aXR5X2lkOiBpdGVtLnJlbGF0aW9uc2hpcFtpdGVtLmFjdGl2ZUluZGV4XS5pZCxcbiAgICAgICAgICAgIHN0dWRlbnRfbmFtZTogaXRlbS52YWx1ZSxcbiAgICAgICAgICAgIG1lbWJlcl9pZGVudGl0eV9pZDogaXRlbS5pZFxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5qb2luQ2xhc3NDYWxsYmFjayh0aGlzLmNsYXNzSW5mby5pZCwgZmlsdGVyTGlzdClcbiAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSAnZWRpdCcgJiYgdGhpcy5jdXJyZW50VHlwZSA9PT0gJ3RlYWNoZXInKSB7Ly8g5aaC5p6c5piv55u05o6l5L+u5pS56Lqr5Lu957uR5a6aXG4gICAgICAgIHRoaXMudGVhY2hlckNhbGxiYWNrKClcbiAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSAnY3JlYXRlJykgeyAvLyDlpoLmnpzmmK/liJvlu7rnj63nuqflvpdcbiAgICAgICAgbGV0IGNyZWF0ZUNsYXNzRGF0YSA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmNyZWF0ZUNsYXNzXG4gICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgIHNjaG9vbF9pZDogY3JlYXRlQ2xhc3NEYXRhLnNjaG9vbF9pZCxcbiAgICAgICAgICBncmFkZV90eXBlOiBjcmVhdGVDbGFzc0RhdGEuZ3JhZGUsXG4gICAgICAgICAgeWVhcl9jbGFzczogY3JlYXRlQ2xhc3NEYXRhLnllYXIsXG4gICAgICAgICAgY2xhc3M6IGNyZWF0ZUNsYXNzRGF0YS5jbGFzc1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRUeXBlID09PSAndGVhY2hlcicpIHtcbiAgICAgICAgICBsZXQgaXRlbSA9IHtcbiAgICAgICAgICAgIHR5cGU6ICd0ZWFjaGVyJyxcbiAgICAgICAgICAgIGxpc3Q6IFt7bmFtZTogdGhpcy50ZWFjaGVyTmFtZX1dXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYWRkQ2xhc3NDYWxsYmFjayhkYXRhLCBpdGVtKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxldCBpdGVtID0ge1xuICAgICAgICAgICAgdHlwZTogJ3BhcnRpYXJjaCcsXG4gICAgICAgICAgICBsaXN0OiBmaWx0ZXJMaXN0XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYWRkQ2xhc3NDYWxsYmFjayhkYXRhLCBpdGVtKVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gJ2pvaW4nICYmIHRoaXMuY3VycmVudFR5cGUgPT09ICdwYXJlbnRzJykgeyAvLyDlpoLmnpzmmK/liqDlhaXnj63nuqdcbiAgICAgICAgdGhpcy5qb2luQ2xhc3NDYWxsYmFjayh0aGlzLmpvaW5DbGFzc0lkLCBmaWx0ZXJMaXN0KVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBjaGVja0NhblN1Ym1pdCgpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50VHlwZSA9PT0gJ3RlYWNoZXInICYmIGlzRW1wdHlTdHJpbmcodGhpcy50ZWFjaGVyTmFtZSkpIHtcbiAgICAgIHNob3dNc2coJ+WmguaenOaCqOWLvumAieS6huiAgeW4iOi6q+S7ve+8jOivt+Whq+WGmeaCqOeahOWnk+WQjScpXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuICBjaGVja0RhdGEoKSB7XG4gICAgbGV0IGNhblN1Ym1pdCA9IHRydWVcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5saXN0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBpZiAoaXNFbXB0eVN0cmluZyh0aGlzLmxpc3RbaV0udmFsdWUpKSB7XG4gICAgICAgIGNhblN1Ym1pdCA9IGZhbHNlXG4gICAgICAgIGJyZWFrXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYW5TdWJtaXQgPSB0cnVlXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjYW5TdWJtaXRcbiAgfVxuICBnZXRSZWxhdGlvblNoaXAoKSB7XG4gICAgZ2V0SWRlbnRpdHlMaXN0KCkudGhlbihyZXMgPT4ge1xuICAgICAgdGhpcy5yZWxhdGlvbnNoaXAgPSByZXMuZGF0YS5saXN0XG4gICAgICBjb25zdCBpdGVtID0ge1xuICAgICAgICByZWxhdGlvbnNoaXA6IHRoaXMucmVsYXRpb25zaGlwLFxuICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgIGFjdGl2ZUluZGV4OiAwXG4gICAgICB9XG4gICAgICB0aGlzLmxpc3QucHVzaChpdGVtKVxuICAgICAgdGhpcy50eXBlID09PSAnZWRpdCcgJiYgdGhpcy5nZXRDbGFzc0lkZW50aXR5KClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9KVxuICB9XG59XG4iXX0=