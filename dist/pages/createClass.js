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
        title: '幼儿园',
        id: 0,
        value: 'kindergarten'
      }, {
        title: '小学',
        id: 1,
        value: 'primary'
      }, {
        title: '初中',
        id: 2,
        value: 'middle'
      }, {
        title: '高中',
        id: 3,
        value: 'high'
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
      setPage: function setPage(page, type) {
        if (page === 'createClass') {
          this.type = type;
          wx.setNavigationBarTitle({
            title: this.type === 'join' ? '加入班级' : '创建班级'
          });
          this.$apply();
        } else {
          wx.switchTab({
            url: 'classList'
          });
        }
      },
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
          var data = res.data;
          if (data.success) {
            (0, _common.showMsg)('学校创建成功');
            _this3.schoolId = data.data.school_id;
            _this3.showSchool = false;
            _this3.$apply();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZUNsYXNzLmpzIl0sIm5hbWVzIjpbImpvaW5DbGFzcyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJjbGFzc051bWJlciIsImdyYWRlTnVtYmVyIiwiYWN0aXZlQ2xhc3NUeXBlIiwic2hvd1NjaG9vbCIsImNsYXNzVHlwZXMiLCJ0aXRsZSIsImlkIiwidmFsdWUiLCJtZW1iZXJJbmZvIiwic2Nob29sTGlzdCIsInR5cGUiLCJjaXR5TmFtZSIsImtleXdvcmRzIiwic2Nob29sSWQiLCJjaXR5TGlzdCIsImNpdHlJbmRleCIsIm1ldGhvZHMiLCJzZXRQYWdlIiwicGFnZSIsInd4Iiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwiJGFwcGx5Iiwic3dpdGNoVGFiIiwidXJsIiwiZGVsZXRlU2Nob29sIiwic2V0U2Nob29sIiwib2JqIiwibmFtZSIsImNyZWF0ZVNjaG9vbCIsImNpdHlfbmFtZSIsInRoZW4iLCJyZXMiLCJzdWNjZXNzIiwic2Nob29sX2lkIiwiaGlkZVNjaG9vbCIsImJpbmRJbnB1dCIsImUiLCJjdXJyZW50VGFyZ2V0IiwiZGV0YWlsIiwiZ2V0U2Nob29sTGlzdCIsInNlbGVjdCIsImluZGV4IiwiYmluZFBpY2tlciIsInN1Ym1pdCIsImdyYWRlIiwieWVhciIsIk51bWJlciIsImNsYXNzIiwiY3JlYXRlQ2xhc3NDYWxsYmFjayIsImNoZWNrQ2xhc3NFeGlzdCIsIlByb21pc2UiLCJyZXNvbHZlIiwibGF0IiwibG5nIiwicmVnZW9jb2RlIiwiYWRkcmVzc0NvbXBvbmVudCIsInByb3ZpbmNlIiwiZ2V0U3RvcmFnZVN5bmMiLCJsZW5ndGgiLCJsaXN0Iiwic2V0U3RvcmFnZVN5bmMiLCJ3ZXB5IiwibmF2aWdhdGVUbyIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiY3JlYXRlQ2xhc3MiLCJwYXJhbXMiLCJfdGhpcyIsImdldExvY2F0aW9uIiwiY29tcGxldGUiLCJn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RDtBQVFEOzs7O0VBNU1vQ3dDLGVBQUszQyxJOztrQkFBdkJ4QixTIiwiZmlsZSI6ImNyZWF0ZUNsYXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHsgc2hvd01zZywgdGhyb3R0bGUsIGlzRW1wdHlTdHJpbmcgfSBmcm9tICcuLi91dGlscy9jb21tb24nXG5pbXBvcnQgeyBzY2hvb2xMaXN0LCBzZWFyY2hDbGFzcywgZ2V0Q2l0eUluZm8sIGdldENpdHlMaXN0LCBjcmVhdGVTY2hvb2x9IGZyb20gJy4uL2FwaS9jcmVhdGVDbGFzcydcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGpvaW5DbGFzcyBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Yib5bu654+t57qnJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgbGF0aXR1ZGU6ICcnLFxuICAgIGxvbmdpdHVkZTogJycsXG4gICAgY2xhc3NOdW1iZXI6IDAsXG4gICAgZ3JhZGVOdW1iZXI6IDAsXG4gICAgYWN0aXZlQ2xhc3NUeXBlOiAwLFxuICAgIHNob3dTY2hvb2w6IGZhbHNlLFxuICAgIGNsYXNzVHlwZXM6IFtcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICflubzlhL/lm60nLFxuICAgICAgICBpZDogMCxcbiAgICAgICAgdmFsdWU6ICdraW5kZXJnYXJ0ZW4nXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aXRsZTogJ+Wwj+WtpicsXG4gICAgICAgIGlkOiAxLFxuICAgICAgICB2YWx1ZTogJ3ByaW1hcnknXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aXRsZTogJ+WIneS4rScsXG4gICAgICAgIGlkOiAyLFxuICAgICAgICB2YWx1ZTogJ21pZGRsZSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAn6auY5LitJyxcbiAgICAgICAgaWQ6IDMsXG4gICAgICAgIHZhbHVlOiAnaGlnaCdcbiAgICAgIH1cbiAgICBdLFxuICAgIG1lbWJlckluZm86IG51bGwsXG4gICAgc2Nob29sTGlzdDogW10sXG4gICAgdHlwZTogJycsXG4gICAgY2l0eU5hbWU6ICfmraPlnKjlrprkvY3kuK0nLFxuICAgIGtleXdvcmRzOiAnJyxcbiAgICBzY2hvb2xJZDogMCxcbiAgICBjaXR5TGlzdDogW10sXG4gICAgY2l0eUluZGV4OiAtMVxuICB9XG4gIGdldENpdHkoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBnZXRDaXR5SW5mbyh7XG4gICAgICAgIGxhdDogdGhpcy5sYXRpdHVkZSxcbiAgICAgICAgbG5nOiB0aGlzLmxvbmdpdHVkZVxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICB0aGlzLmNpdHlOYW1lID0gcmVzLmRhdGEuZGF0YS5yZWdlb2NvZGUuYWRkcmVzc0NvbXBvbmVudC5wcm92aW5jZVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIHJlc29sdmUoKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG4gIGdldENpdHlMaXN0KCkge1xuICAgIGNvbnN0IGNpdHlMaXN0ID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NpdHlMaXN0JylcbiAgICBpZiAoY2l0eUxpc3QubGVuZ3RoKSAge1xuICAgICAgdGhpcy5jaXR5TGlzdCA9IGNpdHlMaXN0XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgZ2V0Q2l0eUxpc3QoKS50aGVuKHJlcyA9PiB7XG4gICAgICB0aGlzLmNpdHlMaXN0ID0gcmVzLmRhdGEubGlzdFxuICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2NpdHlMaXN0JywgdGhpcy5jaXR5TGlzdClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9KVxuICB9XG4gIGNoZWNrQ2xhc3NFeGlzdChkYXRhKSB7XG4gICAgc2VhcmNoQ2xhc3MoZGF0YSkudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICBpZiAoZGF0YSAmJiBkYXRhLmlkKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiBgam9pbkNsYXNzP2NsYXNzSWQ9JHtkYXRhLmlkfSZuYW1lPSR7ZGF0YS5uYW1lfWBcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNob3dNc2coJ+aCqOi+k+WFpeeahOePree6p+S4jeWtmOWcqO+8jOivt+mHjeivlScpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBjcmVhdGVDbGFzc0NhbGxiYWNrKGRhdGEpIHtcbiAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5jcmVhdGVDbGFzcyA9IGRhdGFcbiAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiAnYmluZFJlbGF0aW9uc2hpcD90eXBlPWNyZWF0ZSdcbiAgICB9KVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgc2V0UGFnZShwYWdlLCB0eXBlKSB7XG4gICAgICBpZiAocGFnZSA9PT0gJ2NyZWF0ZUNsYXNzJykge1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlXG4gICAgICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XG4gICAgICAgICAgdGl0bGU6IHRoaXMudHlwZSA9PT0gJ2pvaW4nID8gJ+WKoOWFpeePree6pycgOiAn5Yib5bu654+t57qnJ1xuICAgICAgICB9KVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3eC5zd2l0Y2hUYWIoe1xuICAgICAgICAgIHVybDogJ2NsYXNzTGlzdCdcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9LFxuICAgIGRlbGV0ZVNjaG9vbCgpIHtcbiAgICAgIHRoaXMua2V5d29yZHMgPSAnJ1xuICAgICAgdGhpcy5zY2hvb2xJZCA9IDBcbiAgICAgIHRoaXMuc2hvd1NjaG9vbCA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBzZXRTY2hvb2wob2JqKSB7XG4gICAgICB0aGlzLnNjaG9vbElkID0gb2JqLmlkXG4gICAgICB0aGlzLmtleXdvcmRzID0gb2JqLm5hbWVcbiAgICAgIHRoaXMuc2hvd1NjaG9vbCA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBjcmVhdGVTY2hvb2woKSB7XG4gICAgICBjcmVhdGVTY2hvb2woe1xuICAgICAgICBuYW1lOiB0aGlzLmtleXdvcmRzLFxuICAgICAgICBjaXR5X25hbWU6IHRoaXMuY2l0eU5hbWVcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YVxuICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgc2hvd01zZygn5a2m5qCh5Yib5bu65oiQ5YqfJylcbiAgICAgICAgICB0aGlzLnNjaG9vbElkID0gZGF0YS5kYXRhLnNjaG9vbF9pZFxuICAgICAgICAgIHRoaXMuc2hvd1NjaG9vbCA9IGZhbHNlXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgaGlkZVNjaG9vbCgpIHtcbiAgICAgIHRoaXMuc2hvd1NjaG9vbCA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBiaW5kSW5wdXQoZSkge1xuICAgICAgY29uc3QgaWQgPSBlLmN1cnJlbnRUYXJnZXQuaWRcbiAgICAgIHRoaXNbaWRdID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIGlmIChpZCA9PT0gJ2tleXdvcmRzJyAmJiAhaXNFbXB0eVN0cmluZyh0aGlzLmtleXdvcmRzKSkge1xuICAgICAgICB0aHJvdHRsZSh0aGlzLmdldFNjaG9vbExpc3QsIHRoaXMsIDEwMDApXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNob3dTY2hvb2wgPSBmYWxzZVxuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgc2VsZWN0KGluZGV4KSB7XG4gICAgICB0aGlzLmFjdGl2ZUNsYXNzVHlwZSA9IGluZGV4XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBiaW5kUGlja2VyKGUpIHtcbiAgICAgIGNvbnN0IGlkID0gZS5jdXJyZW50VGFyZ2V0LmlkXG4gICAgICBjb25zdCB2YWx1ZSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB0aGlzW2lkXSA9IHZhbHVlXG4gICAgICBpZihpZCA9PT0gJ2NpdHlJbmRleCcpIHtcbiAgICAgICAgdGhpcy5jaXR5TmFtZSA9IHRoaXMuY2l0eUxpc3RbdmFsdWVdLmNpdHlfbmFtZVxuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgc3VibWl0KCkge1xuICAgICAgaWYgKCF0aGlzLmdyYWRlTnVtYmVyKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+i+k+WFpee6p+WIq+WPtycpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLmNsYXNzTnVtYmVyKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+i+k+WFpeePree6p+WPtycpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLnNjaG9vbElkKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+i+k+WFpeWtpuagoeWQjeensCcpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgIHNjaG9vbF9pZDogdGhpcy5zY2hvb2xJZCxcbiAgICAgICAgZ3JhZGU6IHRoaXMuY2xhc3NUeXBlc1t0aGlzLmFjdGl2ZUNsYXNzVHlwZV0udmFsdWUsXG4gICAgICAgIHllYXI6IE51bWJlcih0aGlzLmdyYWRlTnVtYmVyKSxcbiAgICAgICAgY2xhc3M6IE51bWJlcih0aGlzLmNsYXNzTnVtYmVyKVxuICAgICAgfVxuICAgICAgdGhpcy50eXBlID09PSAnY3JlYXRlJyAmJiB0aGlzLmNyZWF0ZUNsYXNzQ2FsbGJhY2soZGF0YSlcbiAgICAgIHRoaXMudHlwZSA9PT0gJ2pvaW4nICYmIHRoaXMuY2hlY2tDbGFzc0V4aXN0KGRhdGEpXG4gICAgfVxuICB9XG4gIG9uTG9hZChwYXJhbXMpIHtcbiAgICB0aGlzLnR5cGUgPSBwYXJhbXMudHlwZVxuICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XG4gICAgICB0aXRsZTogdGhpcy50eXBlID09PSAnam9pbicgPyAn5Yqg5YWl54+t57qnJyA6ICfliJvlu7rnj63nuqcnXG4gICAgfSlcbiAgICBjb25zdCBnbG9iYWxEYXRhID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGFcbiAgICB0aGlzLm1lbWJlckluZm8gPSBnbG9iYWxEYXRhLm1lbWJlckluZm9cbiAgICB0aGlzLiRhcHBseSgpXG4gICAgbGV0IF90aGlzID0gdGhpc1xuICAgIHd4LmdldExvY2F0aW9uKHtcbiAgICAgIHR5cGU6ICd3Z3M4NCcsXG4gICAgICBjb21wbGV0ZShyZXMpIHtcbiAgICAgICAgX3RoaXMubGF0aXR1ZGUgPSByZXMubGF0aXR1ZGVcbiAgICAgICAgX3RoaXMubG9uZ2l0dWRlID0gcmVzLmxvbmdpdHVkZVxuICAgICAgICBfdGhpcy5nZXRDaXR5KClcbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgX3RoaXMuZ2V0Q2l0eUxpc3QoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgZ2V0U2Nob29sTGlzdCgpIHtcbiAgICBzY2hvb2xMaXN0KHtcbiAgICAgIGtleXdvcmRzOiB0aGlzLmtleXdvcmRzLFxuICAgICAgY2l0eV9uYW1lOiB0aGlzLmNpdHlOYW1lXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgdGhpcy5zY2hvb2xMaXN0ID0gcmVzLmRhdGEubGlzdFxuICAgICAgdGhpcy5zaG93U2Nob29sID0gdHJ1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0pXG4gIH1cbn1cbiJdfQ==