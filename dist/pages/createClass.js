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
      schoolId: 0,
      cityList: [],
      cityIndex: -1
    }, _this2.methods = {
      deleteSchool: function deleteSchool() {
        this.keywords = '';
        this.schoolId = 0;
        this.showSchool = false;
        this.$apply();
      },
      setSchool: function setSchool(obj) {
        this.schoolId = obj.id;
        this.keywords = obj.name;
        this.showSchool = false;
        this.$apply();
      },
      createSchool: function createSchool() {
        var _this3 = this;

        (0, _createClass2.createSchool)({
          name: this.keywords,
          city_name: this.cityName
        }).then(function (res) {
          if (res.data.success) {
            (0, _common.showMsg)('学校创建成功');
            _this3.hideSchool();
          }
        });
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
        var id = e.currentTarget.id;
        var value = e.detail.value;
        this[id] = value;
        if (id === 'cityIndex') {
          this.cityName = this.cityList[value].city_name;
        }
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
      var _this4 = this;

      return new Promise(function (resolve) {
        (0, _createClass2.getCityInfo)({
          lat: _this4.latitude,
          lng: _this4.longitude
        }).then(function (res) {
          _this4.cityName = res.data.data.regeocode.addressComponent.province;
          _this4.$apply();
          resolve();
        });
      });
    }
  }, {
    key: 'getCityList',
    value: function getCityList() {
      var _this5 = this;

      var cityList = wx.getStorageSync('cityList');
      if (cityList.length) {
        this.cityList = cityList;
        this.$apply();
        return;
      }
      (0, _createClass2.getCityList)().then(function (res) {
        _this5.cityList = res.data.list;
        wx.setStorageSync('cityList', _this5.cityList);
        _this5.$apply();
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
      wx.setNavigationBarTitle({
        title: this.type === 'join' ? '加入班级' : '创建班级'
      });
      var globalData = this.$parent.globalData;
      this.memberInfo = globalData.memberInfo;
      this.$apply();
      var _this = this;
      wx.getLocation({
        type: 'wgs84',
        complete: function complete(res) {
          _this.latitude = res.latitude;
          _this.longitude = res.longitude;
          _this.getCity();
          _this.$apply();
          _this.getCityList();
        }
      });
    }
  }, {
    key: 'getSchoolList',
    value: function getSchoolList() {
      var _this6 = this;

      (0, _createClass2.schoolList)({
        keywords: this.keywords,
        city_name: this.cityName
      }).then(function (res) {
        _this6.schoolList = res.data.list;
        _this6.showSchool = true;
        _this6.$apply();
      });
    }
  }]);

  return joinClass;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(joinClass , 'pages/createClass'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZUNsYXNzLmpzIl0sIm5hbWVzIjpbImpvaW5DbGFzcyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJjbGFzc051bWJlciIsImdyYWRlTnVtYmVyIiwiYWN0aXZlQ2xhc3NUeXBlIiwic2hvd1NjaG9vbCIsImNsYXNzVHlwZXMiLCJ0aXRsZSIsImlkIiwidmFsdWUiLCJtZW1iZXJJbmZvIiwic2Nob29sTGlzdCIsInR5cGUiLCJjaXR5TmFtZSIsImtleXdvcmRzIiwic2Nob29sSWQiLCJjaXR5TGlzdCIsImNpdHlJbmRleCIsIm1ldGhvZHMiLCJkZWxldGVTY2hvb2wiLCIkYXBwbHkiLCJzZXRTY2hvb2wiLCJvYmoiLCJuYW1lIiwiY3JlYXRlU2Nob29sIiwiY2l0eV9uYW1lIiwidGhlbiIsInJlcyIsInN1Y2Nlc3MiLCJoaWRlU2Nob29sIiwiYmluZElucHV0IiwiZSIsImN1cnJlbnRUYXJnZXQiLCJkZXRhaWwiLCJnZXRTY2hvb2xMaXN0Iiwic2VsZWN0IiwiaW5kZXgiLCJiaW5kUGlja2VyIiwic3VibWl0Iiwic2Nob29sX2lkIiwiZ3JhZGUiLCJ5ZWFyIiwiTnVtYmVyIiwiY2xhc3MiLCJjcmVhdGVDbGFzc0NhbGxiYWNrIiwiY2hlY2tDbGFzc0V4aXN0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJsYXQiLCJsbmciLCJyZWdlb2NvZGUiLCJhZGRyZXNzQ29tcG9uZW50IiwicHJvdmluY2UiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwibGVuZ3RoIiwibGlzdCIsInNldFN0b3JhZ2VTeW5jIiwid2VweSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImNyZWF0ZUNsYXNzIiwicGFyYW1zIiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwiX3RoaXMiLCJnZXRMb2NhdGlvbiIsImNvbXBsZXRlIiwiZ2V0Q2l0eSIsImdldENpdHlMaXN0IiwicGFnZSJd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QUE3QjtBQUNBLFdBQUtVLE1BQUw7QUFDQSxVQUFJOEMsUUFBUSxJQUFaO0FBQ0FiLFNBQUdjLFdBQUgsQ0FBZTtBQUNidkQsY0FBTSxPQURPO0FBRWJ3RCxnQkFGYSxvQkFFSnpDLEdBRkksRUFFQztBQUNadUMsZ0JBQU1sRSxRQUFOLEdBQWlCMkIsSUFBSTNCLFFBQXJCO0FBQ0FrRSxnQkFBTWpFLFNBQU4sR0FBa0IwQixJQUFJMUIsU0FBdEI7QUFDQWlFLGdCQUFNRyxPQUFOO0FBQ0FILGdCQUFNOUMsTUFBTjtBQUNBOEMsZ0JBQU1JLFdBQU47QUFDRDtBQVJZLE9BQWY7QUFVRDs7O29DQUNlO0FBQUE7O0FBQ2Qsb0NBQVc7QUFDVHhELGtCQUFVLEtBQUtBLFFBRE47QUFFVFcsbUJBQVcsS0FBS1o7QUFGUCxPQUFYLEVBR0dhLElBSEgsQ0FHUSxlQUFPO0FBQ2IsZUFBS2YsVUFBTCxHQUFrQmdCLElBQUk1QixJQUFKLENBQVN5RCxJQUEzQjtBQUNBLGVBQUtuRCxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsZUFBS2UsTUFBTDtBQUNELE9BUEQ7QUFRRDs7OztFQTVMb0NzQyxlQUFLYSxJOztrQkFBdkIzRSxTIiwiZmlsZSI6ImNyZWF0ZUNsYXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHsgc2hvd01zZywgdGhyb3R0bGUsIGlzRW1wdHlTdHJpbmcgfSBmcm9tICcuLi91dGlscy9jb21tb24nXG5pbXBvcnQgeyBzY2hvb2xMaXN0LCBzZWFyY2hDbGFzcywgZ2V0Q2l0eUluZm8sIGdldENpdHlMaXN0LCBjcmVhdGVTY2hvb2x9IGZyb20gJy4uL2FwaS9jcmVhdGVDbGFzcydcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGpvaW5DbGFzcyBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Yib5bu654+t57qnJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgbGF0aXR1ZGU6ICcnLFxuICAgIGxvbmdpdHVkZTogJycsXG4gICAgY2xhc3NOdW1iZXI6IDAsXG4gICAgZ3JhZGVOdW1iZXI6IDAsXG4gICAgYWN0aXZlQ2xhc3NUeXBlOiAwLFxuICAgIHNob3dTY2hvb2w6IGZhbHNlLFxuICAgIGNsYXNzVHlwZXM6IFtcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICflsI/lraYnLFxuICAgICAgICBpZDogMCxcbiAgICAgICAgdmFsdWU6ICdwcmltYXJ5J1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICfliJ3kuK0nLFxuICAgICAgICBpZDogMSxcbiAgICAgICAgdmFsdWU6ICdtaWRkbGUnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aXRsZTogJ+mrmOS4rScsXG4gICAgICAgIGlkOiAyLFxuICAgICAgICB2YWx1ZTogJ2hpZ2gnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aXRsZTogJ+Wkp+WtpicsXG4gICAgICAgIGlkOiAzLFxuICAgICAgICB2YWx1ZTogJ3VuaXZlcnNpdHknXG4gICAgICB9XG4gICAgXSxcbiAgICBtZW1iZXJJbmZvOiBudWxsLFxuICAgIHNjaG9vbExpc3Q6IFtdLFxuICAgIHR5cGU6ICcnLFxuICAgIGNpdHlOYW1lOiAn5q2j5Zyo5a6a5L2N5LitJyxcbiAgICBrZXl3b3JkczogJycsXG4gICAgc2Nob29sSWQ6IDAsXG4gICAgY2l0eUxpc3Q6IFtdLFxuICAgIGNpdHlJbmRleDogLTFcbiAgfVxuICBnZXRDaXR5KCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgZ2V0Q2l0eUluZm8oe1xuICAgICAgICBsYXQ6IHRoaXMubGF0aXR1ZGUsXG4gICAgICAgIGxuZzogdGhpcy5sb25naXR1ZGVcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgdGhpcy5jaXR5TmFtZSA9IHJlcy5kYXRhLmRhdGEucmVnZW9jb2RlLmFkZHJlc3NDb21wb25lbnQucHJvdmluY2VcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICByZXNvbHZlKClcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuICBnZXRDaXR5TGlzdCgpIHtcbiAgICBjb25zdCBjaXR5TGlzdCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjaXR5TGlzdCcpXG4gICAgaWYgKGNpdHlMaXN0Lmxlbmd0aCkgIHtcbiAgICAgIHRoaXMuY2l0eUxpc3QgPSBjaXR5TGlzdFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGdldENpdHlMaXN0KCkudGhlbihyZXMgPT4ge1xuICAgICAgdGhpcy5jaXR5TGlzdCA9IHJlcy5kYXRhLmxpc3RcbiAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdjaXR5TGlzdCcsIHRoaXMuY2l0eUxpc3QpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSlcbiAgfVxuICBjaGVja0NsYXNzRXhpc3QoZGF0YSkge1xuICAgIHNlYXJjaENsYXNzKGRhdGEpLnRoZW4ocmVzID0+IHtcbiAgICAgIGxldCBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgaWYgKGRhdGEgJiYgZGF0YS5pZCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogYGpvaW5DbGFzcz9jbGFzc0lkPSR7ZGF0YS5pZH0mbmFtZT0ke2RhdGEubmFtZX1gXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzaG93TXNnKCfmgqjovpPlhaXnmoTnj63nuqfkuI3lrZjlnKjvvIzor7fph43or5UnKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgY3JlYXRlQ2xhc3NDYWxsYmFjayhkYXRhKSB7XG4gICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuY3JlYXRlQ2xhc3MgPSBkYXRhXG4gICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogJ2JpbmRSZWxhdGlvbnNoaXA/dHlwZT1jcmVhdGUnXG4gICAgfSlcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIGRlbGV0ZVNjaG9vbCgpIHtcbiAgICAgIHRoaXMua2V5d29yZHMgPSAnJ1xuICAgICAgdGhpcy5zY2hvb2xJZCA9IDBcbiAgICAgIHRoaXMuc2hvd1NjaG9vbCA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBzZXRTY2hvb2wob2JqKSB7XG4gICAgICB0aGlzLnNjaG9vbElkID0gb2JqLmlkXG4gICAgICB0aGlzLmtleXdvcmRzID0gb2JqLm5hbWVcbiAgICAgIHRoaXMuc2hvd1NjaG9vbCA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBjcmVhdGVTY2hvb2woKSB7XG4gICAgICBjcmVhdGVTY2hvb2woe1xuICAgICAgICBuYW1lOiB0aGlzLmtleXdvcmRzLFxuICAgICAgICBjaXR5X25hbWU6IHRoaXMuY2l0eU5hbWVcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgIHNob3dNc2coJ+WtpuagoeWIm+W7uuaIkOWKnycpXG4gICAgICAgICAgdGhpcy5oaWRlU2Nob29sKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIGhpZGVTY2hvb2woKSB7XG4gICAgICB0aGlzLnNob3dTY2hvb2wgPSBmYWxzZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgYmluZElucHV0KGUpIHtcbiAgICAgIGNvbnN0IGlkID0gZS5jdXJyZW50VGFyZ2V0LmlkXG4gICAgICB0aGlzW2lkXSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICBpZiAoaWQgPT09ICdrZXl3b3JkcycgJiYgIWlzRW1wdHlTdHJpbmcodGhpcy5rZXl3b3JkcykpIHtcbiAgICAgICAgdGhyb3R0bGUodGhpcy5nZXRTY2hvb2xMaXN0LCB0aGlzLCAxMDAwKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zaG93U2Nob29sID0gZmFsc2VcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIHNlbGVjdChpbmRleCkge1xuICAgICAgdGhpcy5hY3RpdmVDbGFzc1R5cGUgPSBpbmRleFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgYmluZFBpY2tlcihlKSB7XG4gICAgICBjb25zdCBpZCA9IGUuY3VycmVudFRhcmdldC5pZFxuICAgICAgY29uc3QgdmFsdWUgPSBlLmRldGFpbC52YWx1ZVxuICAgICAgdGhpc1tpZF0gPSB2YWx1ZVxuICAgICAgaWYoaWQgPT09ICdjaXR5SW5kZXgnKSB7XG4gICAgICAgIHRoaXMuY2l0eU5hbWUgPSB0aGlzLmNpdHlMaXN0W3ZhbHVlXS5jaXR5X25hbWVcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIHN1Ym1pdCgpIHtcbiAgICAgIGlmICghdGhpcy5ncmFkZU51bWJlcikge1xuICAgICAgICBzaG93TXNnKCfor7fovpPlhaXnuqfliKvlj7cnKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5jbGFzc051bWJlcikge1xuICAgICAgICBzaG93TXNnKCfor7fovpPlhaXnj63nuqflj7cnKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5zY2hvb2xJZCkge1xuICAgICAgICBzaG93TXNnKCfor7fovpPlhaXlrabmoKHlkI3np7AnKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICBzY2hvb2xfaWQ6IHRoaXMuc2Nob29sSWQsXG4gICAgICAgIGdyYWRlOiB0aGlzLmNsYXNzVHlwZXNbdGhpcy5hY3RpdmVDbGFzc1R5cGVdLnZhbHVlLFxuICAgICAgICB5ZWFyOiBOdW1iZXIodGhpcy5ncmFkZU51bWJlciksXG4gICAgICAgIGNsYXNzOiBOdW1iZXIodGhpcy5jbGFzc051bWJlcilcbiAgICAgIH1cbiAgICAgIHRoaXMudHlwZSA9PT0gJ2NyZWF0ZScgJiYgdGhpcy5jcmVhdGVDbGFzc0NhbGxiYWNrKGRhdGEpXG4gICAgICB0aGlzLnR5cGUgPT09ICdqb2luJyAmJiB0aGlzLmNoZWNrQ2xhc3NFeGlzdChkYXRhKVxuICAgIH1cbiAgfVxuICBvbkxvYWQocGFyYW1zKSB7XG4gICAgdGhpcy50eXBlID0gcGFyYW1zLnR5cGVcbiAgICB3eC5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe1xuICAgICAgdGl0bGU6IHRoaXMudHlwZSA9PT0gJ2pvaW4nID8gJ+WKoOWFpeePree6pycgOiAn5Yib5bu654+t57qnJ1xuICAgIH0pXG4gICAgY29uc3QgZ2xvYmFsRGF0YSA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhXG4gICAgdGhpcy5tZW1iZXJJbmZvID0gZ2xvYmFsRGF0YS5tZW1iZXJJbmZvXG4gICAgdGhpcy4kYXBwbHkoKVxuICAgIGxldCBfdGhpcyA9IHRoaXNcbiAgICB3eC5nZXRMb2NhdGlvbih7XG4gICAgICB0eXBlOiAnd2dzODQnLFxuICAgICAgY29tcGxldGUocmVzKSB7XG4gICAgICAgIF90aGlzLmxhdGl0dWRlID0gcmVzLmxhdGl0dWRlXG4gICAgICAgIF90aGlzLmxvbmdpdHVkZSA9IHJlcy5sb25naXR1ZGVcbiAgICAgICAgX3RoaXMuZ2V0Q2l0eSgpXG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgIF90aGlzLmdldENpdHlMaXN0KClcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIGdldFNjaG9vbExpc3QoKSB7XG4gICAgc2Nob29sTGlzdCh7XG4gICAgICBrZXl3b3JkczogdGhpcy5rZXl3b3JkcyxcbiAgICAgIGNpdHlfbmFtZTogdGhpcy5jaXR5TmFtZVxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHRoaXMuc2Nob29sTGlzdCA9IHJlcy5kYXRhLmxpc3RcbiAgICAgIHRoaXMuc2hvd1NjaG9vbCA9IHRydWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9KVxuICB9XG59XG4iXX0=