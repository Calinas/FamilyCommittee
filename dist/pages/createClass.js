'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _common = require('./../utils/common.js');

var _createClass2 = require('./../api/createClass.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var joinClass = function (_wepy$page) {
  _inherits(joinClass, _wepy$page);

  function joinClass() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, joinClass);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = joinClass.__proto__ || Object.getPrototypeOf(joinClass)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      navigationBarTitleText: '创建班级'
    }, _this2.data = {
      latitude: '',
      longitude: '',
      classNumber: 0,
      gradeNumber: 0,
      activeClassType: 0,
      showSchool: false,
      classTypes: [{
        title: '小学',
        id: 0,
        value: 'primary'
      }, {
        title: '初中',
        id: 1,
        value: 'middle'
      }, {
        title: '高中',
        id: 2,
        value: 'high'
      }, {
        title: '大学',
        id: 3,
        value: 'university'
      }],
      memberInfo: null,
      schoolList: [],
      type: '',
      cityName: '正在定位中',
      keywords: '',
      schoolId: 0
    }, _this2.methods = {
      deleteSchool: function deleteSchool() {
        this.keywords = '';
        this.schoolId = 0;
        this.$apply();
      },
      setSchool: function setSchool(obj) {
        this.schoolId = obj.id;
        this.keywords = obj.name;
        this.showSchool = false;
        this.$apply();
      },
      hideSchool: function hideSchool() {
        this.showSchool = false;
        this.$apply();
      },
      bindInput: function bindInput(e) {
        var id = e.currentTarget.id;
        this[id] = e.detail.value;
        if (id === 'keywords' && !(0, _common.isEmptyString)(this.keywords)) {
          (0, _common.throttle)(this.getSchoolList, this, 1000);
        } else {
          this.showSchool = false;
        }
        this.$apply();
      },
      select: function select(index) {
        this.activeClassType = index;
        this.$apply();
      },
      bindPicker: function bindPicker(e) {
        this[e.currentTarget.id] = e.detail.value;
        this.$apply();
      },
      submit: function submit() {
        if (!this.gradeNumber) {
          (0, _common.showMsg)('请输入级别号');
          return;
        }
        if (!this.classNumber) {
          (0, _common.showMsg)('请输入班级号');
          return;
        }
        if (!this.schoolId) {
          (0, _common.showMsg)('请输入学校名称');
          return;
        }
        var data = {
          school_id: this.schoolId,
          grade: this.classTypes[this.activeClassType].value,
          year: Number(this.gradeNumber),
          class: Number(this.classNumber)
        };
        this.type === 'create' && this.createClassCallback(data);
        this.type === 'join' && this.checkClassExist(data);
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(joinClass, [{
    key: 'getCity',
    value: function getCity() {
      var _this3 = this;

      return new Promise(function (resolve) {
        (0, _createClass2.getCityInfo)({
          lat: _this3.latitude,
          lng: _this3.longitude
        }).then(function (res) {
          _this3.cityName = res.data.data.regeocode.addressComponent.province;
          _this3.$apply();
          resolve();
        });
      });
    }
  }, {
    key: 'checkClassExist',
    value: function checkClassExist(data) {
      (0, _createClass2.searchClass)(data).then(function (res) {
        var data = res.data.data;
        if (data && data.id) {
          _wepy2.default.navigateTo({
            url: 'joinClass?classId=' + data.id + '&name=' + data.name
          });
        } else {
          (0, _common.showMsg)('您输入的班级不存在，请重试');
        }
      });
    }
  }, {
    key: 'createClassCallback',
    value: function createClassCallback(data) {
      this.$parent.globalData.createClass = data;
      _wepy2.default.navigateTo({
        url: 'bindRelationship?type=create'
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad(params) {
      this.type = params.type;
      var globalData = this.$parent.globalData;
      this.memberInfo = globalData.memberInfo;
      this.$apply();
      var _this = this;
      wx.getLocation({
        type: 'wgs84',
        success: function success(res) {
          _this.latitude = res.latitude;
          _this.longitude = res.longitude;
          _this.getCity();
          _this.$apply();
        }
      });
    }
  }, {
    key: 'getSchoolList',
    value: function getSchoolList() {
      var _this4 = this;

      (0, _createClass2.schoolList)({
        keywords: this.keywords,
        city_name: this.cityName
      }).then(function (res) {
        _this4.schoolList = res.data.list;
        _this4.showSchool = true;
        _this4.$apply();
      });
    }
  }]);

  return joinClass;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(joinClass , 'pages/createClass'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZUNsYXNzLmpzIl0sIm5hbWVzIjpbImpvaW5DbGFzcyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJjbGFzc051bWJlciIsImdyYWRlTnVtYmVyIiwiYWN0aXZlQ2xhc3NUeXBlIiwic2hvd1NjaG9vbCIsImNsYXNzVHlwZXMiLCJ0aXRsZSIsImlkIiwidmFsdWUiLCJtZW1iZXJJbmZvIiwic2Nob29sTGlzdCIsInR5cGUiLCJjaXR5TmFtZSIsImtleXdvcmRzIiwic2Nob29sSWQiLCJtZXRob2RzIiwiZGVsZXRlU2Nob29sIiwiJGFwcGx5Iiwic2V0U2Nob29sIiwib2JqIiwibmFtZSIsImhpZGVTY2hvb2wiLCJiaW5kSW5wdXQiLCJlIiwiY3VycmVudFRhcmdldCIsImRldGFpbCIsImdldFNjaG9vbExpc3QiLCJzZWxlY3QiLCJpbmRleCIsImJpbmRQaWNrZXIiLCJzdWJtaXQiLCJzY2hvb2xfaWQiLCJncmFkZSIsInllYXIiLCJOdW1iZXIiLCJjbGFzcyIsImNyZWF0ZUNsYXNzQ2FsbGJhY2siLCJjaGVja0NsYXNzRXhpc3QiLCJQcm9taXNlIiwicmVzb2x2ZSIsImxhdCIsImxuZyIsInRoZW4iLCJyZXMiLCJyZWdlb2NvZGUiLCJhZGRyZXNzQ29tcG9uZW50IiwicHJvdmluY2UiLCJ3ZXB5IiwibmF2aWdhdGVUbyIsInVybCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiY3JlYXRlQ2xhc3MiLCJwYXJhbXMiLCJfdGhpcyIsInd4IiwiZ2V0TG9jYXRpb24iLCJzdWNjZXNzIiwiZ2V0Q2l0eSIsImNpdHlfbmFtZSIsImxpc3QiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBQ3FCQSxTOzs7Ozs7Ozs7Ozs7OzsrTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdUQyxJLEdBQU87QUFDTEMsZ0JB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Q0FDLFNBQUdDLFdBQUgsQ0FBZTtBQUNiN0MsY0FBTSxPQURPO0FBRWI4QyxlQUZhLG1CQUVMZCxHQUZLLEVBRUE7QUFDWFcsZ0JBQU12RCxRQUFOLEdBQWlCNEMsSUFBSTVDLFFBQXJCO0FBQ0F1RCxnQkFBTXRELFNBQU4sR0FBa0IyQyxJQUFJM0MsU0FBdEI7QUFDQXNELGdCQUFNSSxPQUFOO0FBQ0FKLGdCQUFNckMsTUFBTjtBQUNEO0FBUFksT0FBZjtBQVNEOzs7b0NBQ2U7QUFBQTs7QUFDZCxvQ0FBVztBQUNUSixrQkFBVSxLQUFLQSxRQUROO0FBRVQ4QyxtQkFBVyxLQUFLL0M7QUFGUCxPQUFYLEVBR0c4QixJQUhILENBR1EsZUFBTztBQUNiLGVBQUtoQyxVQUFMLEdBQWtCaUMsSUFBSTdDLElBQUosQ0FBUzhELElBQTNCO0FBQ0EsZUFBS3hELFVBQUwsR0FBa0IsSUFBbEI7QUFDQSxlQUFLYSxNQUFMO0FBQ0QsT0FQRDtBQVFEOzs7O0VBeEpvQzhCLGVBQUtjLEk7O2tCQUF2QmxFLFMiLCJmaWxlIjoiY3JlYXRlQ2xhc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgeyBzaG93TXNnLCB0aHJvdHRsZSwgaXNFbXB0eVN0cmluZyB9IGZyb20gJy4uL3V0aWxzL2NvbW1vbidcbmltcG9ydCB7IHNjaG9vbExpc3QsIHNlYXJjaENsYXNzLCBnZXRDaXR5SW5mbyB9IGZyb20gJy4uL2FwaS9jcmVhdGVDbGFzcydcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGpvaW5DbGFzcyBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Yib5bu654+t57qnJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgbGF0aXR1ZGU6ICcnLFxuICAgIGxvbmdpdHVkZTogJycsXG4gICAgY2xhc3NOdW1iZXI6IDAsXG4gICAgZ3JhZGVOdW1iZXI6IDAsXG4gICAgYWN0aXZlQ2xhc3NUeXBlOiAwLFxuICAgIHNob3dTY2hvb2w6IGZhbHNlLFxuICAgIGNsYXNzVHlwZXM6IFtcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICflsI/lraYnLFxuICAgICAgICBpZDogMCxcbiAgICAgICAgdmFsdWU6ICdwcmltYXJ5J1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICfliJ3kuK0nLFxuICAgICAgICBpZDogMSxcbiAgICAgICAgdmFsdWU6ICdtaWRkbGUnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aXRsZTogJ+mrmOS4rScsXG4gICAgICAgIGlkOiAyLFxuICAgICAgICB2YWx1ZTogJ2hpZ2gnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aXRsZTogJ+Wkp+WtpicsXG4gICAgICAgIGlkOiAzLFxuICAgICAgICB2YWx1ZTogJ3VuaXZlcnNpdHknXG4gICAgICB9XG4gICAgXSxcbiAgICBtZW1iZXJJbmZvOiBudWxsLFxuICAgIHNjaG9vbExpc3Q6IFtdLFxuICAgIHR5cGU6ICcnLFxuICAgIGNpdHlOYW1lOiAn5q2j5Zyo5a6a5L2N5LitJyxcbiAgICBrZXl3b3JkczogJycsXG4gICAgc2Nob29sSWQ6IDBcbiAgfVxuICBnZXRDaXR5KCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgZ2V0Q2l0eUluZm8oe1xuICAgICAgICBsYXQ6IHRoaXMubGF0aXR1ZGUsXG4gICAgICAgIGxuZzogdGhpcy5sb25naXR1ZGVcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgdGhpcy5jaXR5TmFtZSA9IHJlcy5kYXRhLmRhdGEucmVnZW9jb2RlLmFkZHJlc3NDb21wb25lbnQucHJvdmluY2VcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICByZXNvbHZlKClcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuICBjaGVja0NsYXNzRXhpc3QoZGF0YSkge1xuICAgIHNlYXJjaENsYXNzKGRhdGEpLnRoZW4ocmVzID0+IHtcbiAgICAgIGxldCBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgaWYgKGRhdGEgJiYgZGF0YS5pZCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogYGpvaW5DbGFzcz9jbGFzc0lkPSR7ZGF0YS5pZH0mbmFtZT0ke2RhdGEubmFtZX1gXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzaG93TXNnKCfmgqjovpPlhaXnmoTnj63nuqfkuI3lrZjlnKjvvIzor7fph43or5UnKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgY3JlYXRlQ2xhc3NDYWxsYmFjayhkYXRhKSB7XG4gICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuY3JlYXRlQ2xhc3MgPSBkYXRhXG4gICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogJ2JpbmRSZWxhdGlvbnNoaXA/dHlwZT1jcmVhdGUnXG4gICAgfSlcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIGRlbGV0ZVNjaG9vbCgpIHtcbiAgICAgIHRoaXMua2V5d29yZHMgPSAnJ1xuICAgICAgdGhpcy5zY2hvb2xJZCA9IDBcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIHNldFNjaG9vbChvYmopIHtcbiAgICAgIHRoaXMuc2Nob29sSWQgPSBvYmouaWRcbiAgICAgIHRoaXMua2V5d29yZHMgPSBvYmoubmFtZVxuICAgICAgdGhpcy5zaG93U2Nob29sID0gZmFsc2VcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGhpZGVTY2hvb2woKSB7XG4gICAgICB0aGlzLnNob3dTY2hvb2wgPSBmYWxzZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgYmluZElucHV0KGUpIHtcbiAgICAgIGNvbnN0IGlkID0gZS5jdXJyZW50VGFyZ2V0LmlkXG4gICAgICB0aGlzW2lkXSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICBpZiAoaWQgPT09ICdrZXl3b3JkcycgJiYgIWlzRW1wdHlTdHJpbmcodGhpcy5rZXl3b3JkcykpIHtcbiAgICAgICAgdGhyb3R0bGUodGhpcy5nZXRTY2hvb2xMaXN0LCB0aGlzLCAxMDAwKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zaG93U2Nob29sID0gZmFsc2VcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIHNlbGVjdChpbmRleCkge1xuICAgICAgdGhpcy5hY3RpdmVDbGFzc1R5cGUgPSBpbmRleFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgYmluZFBpY2tlcihlKSB7XG4gICAgICB0aGlzW2UuY3VycmVudFRhcmdldC5pZF0gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgc3VibWl0KCkge1xuICAgICAgaWYgKCF0aGlzLmdyYWRlTnVtYmVyKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+i+k+WFpee6p+WIq+WPtycpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLmNsYXNzTnVtYmVyKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+i+k+WFpeePree6p+WPtycpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLnNjaG9vbElkKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+i+k+WFpeWtpuagoeWQjeensCcpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgIHNjaG9vbF9pZDogdGhpcy5zY2hvb2xJZCxcbiAgICAgICAgZ3JhZGU6IHRoaXMuY2xhc3NUeXBlc1t0aGlzLmFjdGl2ZUNsYXNzVHlwZV0udmFsdWUsXG4gICAgICAgIHllYXI6IE51bWJlcih0aGlzLmdyYWRlTnVtYmVyKSxcbiAgICAgICAgY2xhc3M6IE51bWJlcih0aGlzLmNsYXNzTnVtYmVyKVxuICAgICAgfVxuICAgICAgdGhpcy50eXBlID09PSAnY3JlYXRlJyAmJiB0aGlzLmNyZWF0ZUNsYXNzQ2FsbGJhY2soZGF0YSlcbiAgICAgIHRoaXMudHlwZSA9PT0gJ2pvaW4nICYmIHRoaXMuY2hlY2tDbGFzc0V4aXN0KGRhdGEpXG4gICAgfVxuICB9XG4gIG9uTG9hZChwYXJhbXMpIHtcbiAgICB0aGlzLnR5cGUgPSBwYXJhbXMudHlwZVxuICAgIGNvbnN0IGdsb2JhbERhdGEgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YVxuICAgIHRoaXMubWVtYmVySW5mbyA9IGdsb2JhbERhdGEubWVtYmVySW5mb1xuICAgIHRoaXMuJGFwcGx5KClcbiAgICBsZXQgX3RoaXMgPSB0aGlzXG4gICAgd3guZ2V0TG9jYXRpb24oe1xuICAgICAgdHlwZTogJ3dnczg0JyxcbiAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgIF90aGlzLmxhdGl0dWRlID0gcmVzLmxhdGl0dWRlXG4gICAgICAgIF90aGlzLmxvbmdpdHVkZSA9IHJlcy5sb25naXR1ZGVcbiAgICAgICAgX3RoaXMuZ2V0Q2l0eSgpXG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBnZXRTY2hvb2xMaXN0KCkge1xuICAgIHNjaG9vbExpc3Qoe1xuICAgICAga2V5d29yZHM6IHRoaXMua2V5d29yZHMsXG4gICAgICBjaXR5X25hbWU6IHRoaXMuY2l0eU5hbWVcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICB0aGlzLnNjaG9vbExpc3QgPSByZXMuZGF0YS5saXN0XG4gICAgICB0aGlzLnNob3dTY2hvb2wgPSB0cnVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSlcbiAgfVxufVxuIl19