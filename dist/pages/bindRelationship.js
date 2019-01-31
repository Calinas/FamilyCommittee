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
      isTeacher: false,
      teacherName: '',
      canSubmit: false,
      studentName: '',
      list: [],
      memberInfo: null,
      classInfo: null,
      classId: -1,
      joinClassId: 0,
      classIdentityList: [],
      type: ''
    }, _this.watch = {
      studentName: function studentName(newValue, oldValue) {
        this.canSubmit = !(0, _common.isEmptyString)(newValue);
      }
    }, _this.methods = {
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
      selectTeacher: function selectTeacher() {
        this.isTeacher = !this.isTeacher;
        this.$apply();
      },
      submit: function submit() {
        if (!this.checkData()) {
          (0, _common.showMsg)('请填写您孩子姓名');
          return;
        }
        var filterList = this.list.map(function (item) {
          return {
            identity_id: item.relationship[item.activeIndex].id,
            student_name: item.value
          };
        });
        if (this.type) {
          // 如果是直接修改身份绑定
          filterList = this.list.map(function (item) {
            return {
              identity_id: item.relationship[item.activeIndex].id,
              student_name: item.value,
              member_identity_id: item.id
            };
          });
          this.joinClassCallback(this.classInfo.id, filterList);
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
      var _this3 = this;

      (0, _user.bindIdentity)({
        class_id: id,
        item: filterList
      }).then(function (res) {
        _this3.commonFn(res);
      });
    }
  }, {
    key: 'commonFn',
    value: function commonFn(res) {
      if (res.data.success) {
        this.$parent.globalData.classHasChange = true;
        setTimeout(function () {
          wx.switchTab({
            url: 'classList?id=2'
          });
        }, 2000);
      }
    }
  }, {
    key: 'getClassIdentity',
    value: function getClassIdentity() {
      var _this4 = this;

      (0, _user.identityList)({
        class_id: this.classInfo.id
      }).then(function (res) {
        _this4.list = res.data.list.map(function (item) {
          return {
            relationship: _this4.relationship,
            value: item.student.name,
            activeIndex: item.identity.id - 1,
            id: item.id
          };
        });
        _this4.$apply();
      });
    }
  }, {
    key: 'checkCanSubmit',
    value: function checkCanSubmit() {
      if (this.isTeacher && (0, _common.isEmptyString)(this.teacherName)) {
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
        _this5.type && _this5.getClassIdentity();
        _this5.$apply();
      });
    }
  }]);

  return bindRelationship;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(bindRelationship , 'pages/bindRelationship'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJpbmRSZWxhdGlvbnNoaXAuanMiXSwibmFtZXMiOlsiYmluZFJlbGF0aW9uc2hpcCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwicmVsYXRpb25zaGlwIiwicGFyZW50SW5kZXgiLCJpc1RlYWNoZXIiLCJ0ZWFjaGVyTmFtZSIsImNhblN1Ym1pdCIsInN0dWRlbnROYW1lIiwibGlzdCIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJjbGFzc0lkIiwiam9pbkNsYXNzSWQiLCJjbGFzc0lkZW50aXR5TGlzdCIsInR5cGUiLCJ3YXRjaCIsIm5ld1ZhbHVlIiwib2xkVmFsdWUiLCJtZXRob2RzIiwiZGVsZXRlIiwiaWR4Iiwic3BsaWNlIiwiJGFwcGx5IiwiYWRkTmV3IiwiaXRlbSIsInZhbHVlIiwiYWN0aXZlSW5kZXgiLCJwdXNoIiwiYmluZEZvcm0iLCJlIiwidGFyZ2V0IiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJpZCIsImRldGFpbCIsInNlbGVjdFRlYWNoZXIiLCJzdWJtaXQiLCJjaGVja0RhdGEiLCJmaWx0ZXJMaXN0IiwibWFwIiwiaWRlbnRpdHlfaWQiLCJzdHVkZW50X25hbWUiLCJtZW1iZXJfaWRlbnRpdHlfaWQiLCJqb2luQ2xhc3NDYWxsYmFjayIsImNyZWF0ZUNsYXNzRGF0YSIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiY3JlYXRlQ2xhc3MiLCJzY2hvb2xfaWQiLCJncmFkZV90eXBlIiwiZ3JhZGUiLCJ5ZWFyX2NsYXNzIiwieWVhciIsImNsYXNzIiwiYWRkQ2xhc3NDYWxsYmFjayIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJnZXRSZWxhdGlvblNoaXAiLCJPYmplY3QiLCJhc3NpZ24iLCJ0aGVuIiwiY29tbW9uRm4iLCJyZXMiLCJjbGFzc19pZCIsInN1Y2Nlc3MiLCJjbGFzc0hhc0NoYW5nZSIsInNldFRpbWVvdXQiLCJzd2l0Y2hUYWIiLCJ1cmwiLCJzdHVkZW50IiwibmFtZSIsImlkZW50aXR5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QXVCLGVBQU87QUFDNUIsZUFBSzFELFlBQUwsR0FBb0I0RCxJQUFJN0QsSUFBSixDQUFTTyxJQUE3QjtBQUNBLFlBQU1nQixPQUFPO0FBQ1h0Qix3QkFBYyxPQUFLQSxZQURSO0FBRVh1QixpQkFBTyxFQUZJO0FBR1hDLHVCQUFhO0FBSEYsU0FBYjtBQUtBLGVBQUtsQixJQUFMLENBQVVtQixJQUFWLENBQWVILElBQWY7QUFDQSxlQUFLVixJQUFMLElBQWEsT0FBSzZELGdCQUFMLEVBQWI7QUFDQSxlQUFLckQsTUFBTDtBQUNELE9BVkQ7QUFXRDs7OztFQWpLMkNzRCxlQUFLQyxJOztrQkFBOUIvRSxnQiIsImZpbGUiOiJiaW5kUmVsYXRpb25zaGlwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHsgZ2V0SWRlbnRpdHlMaXN0LCBiaW5kSWRlbnRpdHksIGlkZW50aXR5TGlzdCB9IGZyb20gJy4uL2FwaS91c2VyJ1xuaW1wb3J0IHsgYWRkQ2xhc3MgfSBmcm9tICcuLi9hcGkvY3JlYXRlQ2xhc3MnXG5pbXBvcnQgeyBzaG93TXNnLCBpc0VtcHR5U3RyaW5nIH0gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgYmluZFJlbGF0aW9uc2hpcCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6Lqr5Lu957uR5a6aJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgcmVsYXRpb25zaGlwOiBbXSxcbiAgICBwYXJlbnRJbmRleDogMCxcbiAgICBpc1RlYWNoZXI6IGZhbHNlLFxuICAgIHRlYWNoZXJOYW1lOiAnJyxcbiAgICBjYW5TdWJtaXQ6IGZhbHNlLFxuICAgIHN0dWRlbnROYW1lOiAnJyxcbiAgICBsaXN0OiBbXSxcbiAgICBtZW1iZXJJbmZvOiBudWxsLFxuICAgIGNsYXNzSW5mbzogbnVsbCxcbiAgICBjbGFzc0lkOiAtMSxcbiAgICBqb2luQ2xhc3NJZDogMCxcbiAgICBjbGFzc0lkZW50aXR5TGlzdDogW10sXG4gICAgdHlwZTogJydcbiAgfVxuICB3YXRjaCA9IHtcbiAgICBzdHVkZW50TmFtZSAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICB0aGlzLmNhblN1Ym1pdCA9ICFpc0VtcHR5U3RyaW5nKG5ld1ZhbHVlKVxuICAgIH1cbiAgfVxuICBvbkxvYWQoZSkge1xuICAgIHRoaXMubWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcbiAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxuICAgIHRoaXMuam9pbkNsYXNzSWQgPSBlLmlkXG4gICAgdGhpcy50eXBlID0gZS50eXBlXG4gICAgdGhpcy5nZXRSZWxhdGlvblNoaXAoKVxuICAgIHRoaXMuJGFwcGx5KClcbiAgfVxuICBhZGRDbGFzc0NhbGxiYWNrKGRhdGEsIGZpbHRlckxpc3QpIHtcbiAgICBhZGRDbGFzcyhPYmplY3QuYXNzaWduKHt9LCBkYXRhLCB7XG4gICAgICBpdGVtOiBmaWx0ZXJMaXN0XG4gICAgfSkpLnRoZW4ocmVzID0+IHtcbiAgICAgIHRoaXMuY29tbW9uRm4ocmVzKVxuICAgIH0pXG4gIH1cbiAgam9pbkNsYXNzQ2FsbGJhY2soaWQsIGZpbHRlckxpc3QpIHtcbiAgICBiaW5kSWRlbnRpdHkoe1xuICAgICAgY2xhc3NfaWQ6IGlkLFxuICAgICAgaXRlbTogZmlsdGVyTGlzdFxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHRoaXMuY29tbW9uRm4ocmVzKVxuICAgIH0pXG4gIH1cbiAgY29tbW9uRm4ocmVzKSB7XG4gICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmNsYXNzSGFzQ2hhbmdlID0gdHJ1ZVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHd4LnN3aXRjaFRhYih7XG4gICAgICAgICAgdXJsOiAnY2xhc3NMaXN0P2lkPTInXG4gICAgICAgIH0pXG4gICAgICB9LCAyMDAwKVxuICAgIH1cbiAgfVxuICBnZXRDbGFzc0lkZW50aXR5KCkge1xuICAgIGlkZW50aXR5TGlzdCh7XG4gICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWRcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICB0aGlzLmxpc3QgPSByZXMuZGF0YS5saXN0Lm1hcChpdGVtID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICByZWxhdGlvbnNoaXA6IHRoaXMucmVsYXRpb25zaGlwLFxuICAgICAgICAgIHZhbHVlOiBpdGVtLnN0dWRlbnQubmFtZSxcbiAgICAgICAgICBhY3RpdmVJbmRleDogaXRlbS5pZGVudGl0eS5pZCAtIDEsXG4gICAgICAgICAgaWQ6IGl0ZW0uaWRcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9KVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgZGVsZXRlKGlkeCkge1xuICAgICAgdGhpcy5saXN0LnNwbGljZShpZHgsIDEpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBhZGROZXcoKSB7XG4gICAgICBjb25zdCBpdGVtID0ge1xuICAgICAgICByZWxhdGlvbnNoaXA6IHRoaXMucmVsYXRpb25zaGlwLFxuICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgIGFjdGl2ZUluZGV4OiAwXG4gICAgICB9XG4gICAgICB0aGlzLmxpc3QucHVzaChpdGVtKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgYmluZEZvcm0oZSkge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gZS5jdXJyZW50VGFyZ2V0XG4gICAgICBjb25zdCBpZHggPSB0YXJnZXQuZGF0YXNldC5pZHhcbiAgICAgIHRoaXMubGlzdFtpZHhdW3RhcmdldC5pZF0gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgc2VsZWN0VGVhY2hlcigpIHtcbiAgICAgIHRoaXMuaXNUZWFjaGVyID0gIXRoaXMuaXNUZWFjaGVyXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBzdWJtaXQoKSB7XG4gICAgICBpZiAoIXRoaXMuY2hlY2tEYXRhKCkpIHtcbiAgICAgICAgc2hvd01zZygn6K+35aGr5YaZ5oKo5a2p5a2Q5aeT5ZCNJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBsZXQgZmlsdGVyTGlzdCA9IHRoaXMubGlzdC5tYXAoaXRlbSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaWRlbnRpdHlfaWQ6IGl0ZW0ucmVsYXRpb25zaGlwW2l0ZW0uYWN0aXZlSW5kZXhdLmlkLFxuICAgICAgICAgIHN0dWRlbnRfbmFtZTogaXRlbS52YWx1ZVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgaWYgKHRoaXMudHlwZSkgeyAvLyDlpoLmnpzmmK/nm7TmjqXkv67mlLnouqvku73nu5HlrppcbiAgICAgICAgZmlsdGVyTGlzdCA9IHRoaXMubGlzdC5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkZW50aXR5X2lkOiBpdGVtLnJlbGF0aW9uc2hpcFtpdGVtLmFjdGl2ZUluZGV4XS5pZCxcbiAgICAgICAgICAgIHN0dWRlbnRfbmFtZTogaXRlbS52YWx1ZSxcbiAgICAgICAgICAgIG1lbWJlcl9pZGVudGl0eV9pZDogaXRlbS5pZFxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5qb2luQ2xhc3NDYWxsYmFjayh0aGlzLmNsYXNzSW5mby5pZCwgZmlsdGVyTGlzdClcbiAgICAgIH0gZWxzZSBpZiAoIXRoaXMuam9pbkNsYXNzSWQpIHsgLy8g5aaC5p6c5piv5Yib5bu654+t57qn5b6XXG4gICAgICAgIGxldCBjcmVhdGVDbGFzc0RhdGEgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5jcmVhdGVDbGFzc1xuICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICBzY2hvb2xfaWQ6IGNyZWF0ZUNsYXNzRGF0YS5zY2hvb2xfaWQsXG4gICAgICAgICAgZ3JhZGVfdHlwZTogY3JlYXRlQ2xhc3NEYXRhLmdyYWRlLFxuICAgICAgICAgIHllYXJfY2xhc3M6IGNyZWF0ZUNsYXNzRGF0YS55ZWFyLFxuICAgICAgICAgIGNsYXNzOiBjcmVhdGVDbGFzc0RhdGEuY2xhc3NcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFkZENsYXNzQ2FsbGJhY2soZGF0YSwgZmlsdGVyTGlzdClcbiAgICAgIH0gZWxzZSB7IC8vIOWmguaenOaYr+WKoOWFpeePree6p1xuICAgICAgICB0aGlzLmpvaW5DbGFzc0lkICYmIHRoaXMuam9pbkNsYXNzQ2FsbGJhY2sodGhpcy5qb2luQ2xhc3NJZCwgZmlsdGVyTGlzdClcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgY2hlY2tDYW5TdWJtaXQoKSB7XG4gICAgaWYgKHRoaXMuaXNUZWFjaGVyICYmIGlzRW1wdHlTdHJpbmcodGhpcy50ZWFjaGVyTmFtZSkpIHtcbiAgICAgIHNob3dNc2coJ+WmguaenOaCqOWLvumAieS6huiAgeW4iOi6q+S7ve+8jOivt+Whq+WGmeaCqOeahOWnk+WQjScpXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuICBjaGVja0RhdGEoKSB7XG4gICAgbGV0IGNhblN1Ym1pdCA9IHRydWVcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5saXN0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBpZiAoaXNFbXB0eVN0cmluZyh0aGlzLmxpc3RbaV0udmFsdWUpKSB7XG4gICAgICAgIGNhblN1Ym1pdCA9IGZhbHNlXG4gICAgICAgIGJyZWFrXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYW5TdWJtaXQgPSB0cnVlXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjYW5TdWJtaXRcbiAgfVxuICBnZXRSZWxhdGlvblNoaXAoKSB7XG4gICAgZ2V0SWRlbnRpdHlMaXN0KCkudGhlbihyZXMgPT4ge1xuICAgICAgdGhpcy5yZWxhdGlvbnNoaXAgPSByZXMuZGF0YS5saXN0XG4gICAgICBjb25zdCBpdGVtID0ge1xuICAgICAgICByZWxhdGlvbnNoaXA6IHRoaXMucmVsYXRpb25zaGlwLFxuICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgIGFjdGl2ZUluZGV4OiAwXG4gICAgICB9XG4gICAgICB0aGlzLmxpc3QucHVzaChpdGVtKVxuICAgICAgdGhpcy50eXBlICYmIHRoaXMuZ2V0Q2xhc3NJZGVudGl0eSgpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSlcbiAgfVxufVxuIl19