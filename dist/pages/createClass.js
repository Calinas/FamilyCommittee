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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZUNsYXNzLmpzIl0sIm5hbWVzIjpbImpvaW5DbGFzcyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJjbGFzc051bWJlciIsImdyYWRlTnVtYmVyIiwiYWN0aXZlQ2xhc3NUeXBlIiwic2hvd1NjaG9vbCIsImNsYXNzVHlwZXMiLCJ0aXRsZSIsImlkIiwidmFsdWUiLCJtZW1iZXJJbmZvIiwic2Nob29sTGlzdCIsInR5cGUiLCJjaXR5TmFtZSIsImtleXdvcmRzIiwic2Nob29sSWQiLCJjaXR5TGlzdCIsImNpdHlJbmRleCIsIm1ldGhvZHMiLCJkZWxldGVTY2hvb2wiLCIkYXBwbHkiLCJzZXRTY2hvb2wiLCJvYmoiLCJuYW1lIiwiY3JlYXRlU2Nob29sIiwiY2l0eV9uYW1lIiwidGhlbiIsInJlcyIsInN1Y2Nlc3MiLCJoaWRlU2Nob29sIiwiYmluZElucHV0IiwiZSIsImN1cnJlbnRUYXJnZXQiLCJkZXRhaWwiLCJnZXRTY2hvb2xMaXN0Iiwic2VsZWN0IiwiaW5kZXgiLCJiaW5kUGlja2VyIiwic3VibWl0Iiwic2Nob29sX2lkIiwiZ3JhZGUiLCJ5ZWFyIiwiTnVtYmVyIiwiY2xhc3MiLCJjcmVhdGVDbGFzc0NhbGxiYWNrIiwiY2hlY2tDbGFzc0V4aXN0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJsYXQiLCJsbmciLCJyZWdlb2NvZGUiLCJhZGRyZXNzQ29tcG9uZW50IiwicHJvdmluY2UiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwibGVuZ3RoIiwibGlzdCIsInNldFN0b3JhZ2VTeW5jIiwid2VweSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImNyZWF0ZUNsYXNzIiwicGFyYW1zIiwiX3RoaXMiLCJnZXRMb2NhdGlvbiIsImNvbXBsZXRlIiwiZ2V0Q2l0eSIsImdldENpdHlMaXN0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FB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QUFDWnNDLGdCQUFNakUsUUFBTixHQUFpQjJCLElBQUkzQixRQUFyQjtBQUNBaUUsZ0JBQU1oRSxTQUFOLEdBQWtCMEIsSUFBSTFCLFNBQXRCO0FBQ0FnRSxnQkFBTUcsT0FBTjtBQUNBSCxnQkFBTTdDLE1BQU47QUFDQTZDLGdCQUFNSSxXQUFOO0FBQ0Q7QUFSWSxPQUFmO0FBVUQ7OztvQ0FDZTtBQUFBOztBQUNkLG9DQUFXO0FBQ1R2RCxrQkFBVSxLQUFLQSxRQUROO0FBRVRXLG1CQUFXLEtBQUtaO0FBRlAsT0FBWCxFQUdHYSxJQUhILENBR1EsZUFBTztBQUNiLGVBQUtmLFVBQUwsR0FBa0JnQixJQUFJNUIsSUFBSixDQUFTeUQsSUFBM0I7QUFDQSxlQUFLbkQsVUFBTCxHQUFrQixJQUFsQjtBQUNBLGVBQUtlLE1BQUw7QUFDRCxPQVBEO0FBUUQ7Ozs7RUF6TG9Dc0MsZUFBS1ksSTs7a0JBQXZCMUUsUyIsImZpbGUiOiJjcmVhdGVDbGFzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7IHNob3dNc2csIHRocm90dGxlLCBpc0VtcHR5U3RyaW5nIH0gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xuaW1wb3J0IHsgc2Nob29sTGlzdCwgc2VhcmNoQ2xhc3MsIGdldENpdHlJbmZvLCBnZXRDaXR5TGlzdCwgY3JlYXRlU2Nob29sfSBmcm9tICcuLi9hcGkvY3JlYXRlQ2xhc3MnXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBqb2luQ2xhc3MgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WIm+W7uuePree6pydcbiAgfVxuICBkYXRhID0ge1xuICAgIGxhdGl0dWRlOiAnJyxcbiAgICBsb25naXR1ZGU6ICcnLFxuICAgIGNsYXNzTnVtYmVyOiAwLFxuICAgIGdyYWRlTnVtYmVyOiAwLFxuICAgIGFjdGl2ZUNsYXNzVHlwZTogMCxcbiAgICBzaG93U2Nob29sOiBmYWxzZSxcbiAgICBjbGFzc1R5cGVzOiBbXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAn5bCP5a2mJyxcbiAgICAgICAgaWQ6IDAsXG4gICAgICAgIHZhbHVlOiAncHJpbWFyeSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAn5Yid5LitJyxcbiAgICAgICAgaWQ6IDEsXG4gICAgICAgIHZhbHVlOiAnbWlkZGxlJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICfpq5jkuK0nLFxuICAgICAgICBpZDogMixcbiAgICAgICAgdmFsdWU6ICdoaWdoJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICflpKflraYnLFxuICAgICAgICBpZDogMyxcbiAgICAgICAgdmFsdWU6ICd1bml2ZXJzaXR5J1xuICAgICAgfVxuICAgIF0sXG4gICAgbWVtYmVySW5mbzogbnVsbCxcbiAgICBzY2hvb2xMaXN0OiBbXSxcbiAgICB0eXBlOiAnJyxcbiAgICBjaXR5TmFtZTogJ+ato+WcqOWumuS9jeS4rScsXG4gICAga2V5d29yZHM6ICcnLFxuICAgIHNjaG9vbElkOiAwLFxuICAgIGNpdHlMaXN0OiBbXSxcbiAgICBjaXR5SW5kZXg6IC0xXG4gIH1cbiAgZ2V0Q2l0eSgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGdldENpdHlJbmZvKHtcbiAgICAgICAgbGF0OiB0aGlzLmxhdGl0dWRlLFxuICAgICAgICBsbmc6IHRoaXMubG9uZ2l0dWRlXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIHRoaXMuY2l0eU5hbWUgPSByZXMuZGF0YS5kYXRhLnJlZ2VvY29kZS5hZGRyZXNzQ29tcG9uZW50LnByb3ZpbmNlXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgcmVzb2x2ZSgpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbiAgZ2V0Q2l0eUxpc3QoKSB7XG4gICAgY29uc3QgY2l0eUxpc3QgPSB3eC5nZXRTdG9yYWdlU3luYygnY2l0eUxpc3QnKVxuICAgIGlmIChjaXR5TGlzdC5sZW5ndGgpICB7XG4gICAgICB0aGlzLmNpdHlMaXN0ID0gY2l0eUxpc3RcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBnZXRDaXR5TGlzdCgpLnRoZW4ocmVzID0+IHtcbiAgICAgIHRoaXMuY2l0eUxpc3QgPSByZXMuZGF0YS5saXN0XG4gICAgICB3eC5zZXRTdG9yYWdlU3luYygnY2l0eUxpc3QnLCB0aGlzLmNpdHlMaXN0KVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0pXG4gIH1cbiAgY2hlY2tDbGFzc0V4aXN0KGRhdGEpIHtcbiAgICBzZWFyY2hDbGFzcyhkYXRhKS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgIGlmIChkYXRhICYmIGRhdGEuaWQpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6IGBqb2luQ2xhc3M/Y2xhc3NJZD0ke2RhdGEuaWR9Jm5hbWU9JHtkYXRhLm5hbWV9YFxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2hvd01zZygn5oKo6L6T5YWl55qE54+t57qn5LiN5a2Y5Zyo77yM6K+36YeN6K+VJylcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIGNyZWF0ZUNsYXNzQ2FsbGJhY2soZGF0YSkge1xuICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmNyZWF0ZUNsYXNzID0gZGF0YVxuICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICB1cmw6ICdiaW5kUmVsYXRpb25zaGlwP3R5cGU9Y3JlYXRlJ1xuICAgIH0pXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBkZWxldGVTY2hvb2woKSB7XG4gICAgICB0aGlzLmtleXdvcmRzID0gJydcbiAgICAgIHRoaXMuc2Nob29sSWQgPSAwXG4gICAgICB0aGlzLnNob3dTY2hvb2wgPSBmYWxzZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgc2V0U2Nob29sKG9iaikge1xuICAgICAgdGhpcy5zY2hvb2xJZCA9IG9iai5pZFxuICAgICAgdGhpcy5rZXl3b3JkcyA9IG9iai5uYW1lXG4gICAgICB0aGlzLnNob3dTY2hvb2wgPSBmYWxzZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgY3JlYXRlU2Nob29sKCkge1xuICAgICAgY3JlYXRlU2Nob29sKHtcbiAgICAgICAgbmFtZTogdGhpcy5rZXl3b3JkcyxcbiAgICAgICAgY2l0eV9uYW1lOiB0aGlzLmNpdHlOYW1lXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICBzaG93TXNnKCflrabmoKHliJvlu7rmiJDlip8nKVxuICAgICAgICAgIHRoaXMuaGlkZVNjaG9vbCgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBoaWRlU2Nob29sKCkge1xuICAgICAgdGhpcy5zaG93U2Nob29sID0gZmFsc2VcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGJpbmRJbnB1dChlKSB7XG4gICAgICBjb25zdCBpZCA9IGUuY3VycmVudFRhcmdldC5pZFxuICAgICAgdGhpc1tpZF0gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgaWYgKGlkID09PSAna2V5d29yZHMnICYmICFpc0VtcHR5U3RyaW5nKHRoaXMua2V5d29yZHMpKSB7XG4gICAgICAgIHRocm90dGxlKHRoaXMuZ2V0U2Nob29sTGlzdCwgdGhpcywgMTAwMClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2hvd1NjaG9vbCA9IGZhbHNlXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBzZWxlY3QoaW5kZXgpIHtcbiAgICAgIHRoaXMuYWN0aXZlQ2xhc3NUeXBlID0gaW5kZXhcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGJpbmRQaWNrZXIoZSkge1xuICAgICAgY29uc3QgaWQgPSBlLmN1cnJlbnRUYXJnZXQuaWRcbiAgICAgIGNvbnN0IHZhbHVlID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIHRoaXNbaWRdID0gdmFsdWVcbiAgICAgIGlmKGlkID09PSAnY2l0eUluZGV4Jykge1xuICAgICAgICB0aGlzLmNpdHlOYW1lID0gdGhpcy5jaXR5TGlzdFt2YWx1ZV0uY2l0eV9uYW1lXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBzdWJtaXQoKSB7XG4gICAgICBpZiAoIXRoaXMuZ3JhZGVOdW1iZXIpIHtcbiAgICAgICAgc2hvd01zZygn6K+36L6T5YWl57qn5Yir5Y+3JylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuY2xhc3NOdW1iZXIpIHtcbiAgICAgICAgc2hvd01zZygn6K+36L6T5YWl54+t57qn5Y+3JylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuc2Nob29sSWQpIHtcbiAgICAgICAgc2hvd01zZygn6K+36L6T5YWl5a2m5qCh5ZCN56ewJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgc2Nob29sX2lkOiB0aGlzLnNjaG9vbElkLFxuICAgICAgICBncmFkZTogdGhpcy5jbGFzc1R5cGVzW3RoaXMuYWN0aXZlQ2xhc3NUeXBlXS52YWx1ZSxcbiAgICAgICAgeWVhcjogTnVtYmVyKHRoaXMuZ3JhZGVOdW1iZXIpLFxuICAgICAgICBjbGFzczogTnVtYmVyKHRoaXMuY2xhc3NOdW1iZXIpXG4gICAgICB9XG4gICAgICB0aGlzLnR5cGUgPT09ICdjcmVhdGUnICYmIHRoaXMuY3JlYXRlQ2xhc3NDYWxsYmFjayhkYXRhKVxuICAgICAgdGhpcy50eXBlID09PSAnam9pbicgJiYgdGhpcy5jaGVja0NsYXNzRXhpc3QoZGF0YSlcbiAgICB9XG4gIH1cbiAgb25Mb2FkKHBhcmFtcykge1xuICAgIHRoaXMudHlwZSA9IHBhcmFtcy50eXBlXG4gICAgY29uc3QgZ2xvYmFsRGF0YSA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhXG4gICAgdGhpcy5tZW1iZXJJbmZvID0gZ2xvYmFsRGF0YS5tZW1iZXJJbmZvXG4gICAgdGhpcy4kYXBwbHkoKVxuICAgIGxldCBfdGhpcyA9IHRoaXNcbiAgICB3eC5nZXRMb2NhdGlvbih7XG4gICAgICB0eXBlOiAnd2dzODQnLFxuICAgICAgY29tcGxldGUocmVzKSB7XG4gICAgICAgIF90aGlzLmxhdGl0dWRlID0gcmVzLmxhdGl0dWRlXG4gICAgICAgIF90aGlzLmxvbmdpdHVkZSA9IHJlcy5sb25naXR1ZGVcbiAgICAgICAgX3RoaXMuZ2V0Q2l0eSgpXG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgIF90aGlzLmdldENpdHlMaXN0KClcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIGdldFNjaG9vbExpc3QoKSB7XG4gICAgc2Nob29sTGlzdCh7XG4gICAgICBrZXl3b3JkczogdGhpcy5rZXl3b3JkcyxcbiAgICAgIGNpdHlfbmFtZTogdGhpcy5jaXR5TmFtZVxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHRoaXMuc2Nob29sTGlzdCA9IHJlcy5kYXRhLmxpc3RcbiAgICAgIHRoaXMuc2hvd1NjaG9vbCA9IHRydWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9KVxuICB9XG59XG4iXX0=