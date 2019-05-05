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

var _common = require('./../utils/common.js');

var _createClass2 = require('./../api/createClass.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var store = (0, _wepyRedux.getStore)();

var joinClass = (_dec = (0, _wepyRedux.connect)({
  cityList: function cityList(state) {
    return state.zone.city_list;
  },
  cityName: function cityName(state) {
    return state.zone.city_name;
  },
  longitude: function longitude(state) {
    return state.zone.lng;
  },
  latitude: function latitude(state) {
    return state.zone.lat;
  }
}), _dec(_class = function (_wepy$page) {
  _inherits(joinClass, _wepy$page);

  function joinClass() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, joinClass);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = joinClass.__proto__ || Object.getPrototypeOf(joinClass)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '创建班级'
    }, _this.data = {
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
      keywords: '',
      schoolId: 0,
      cityIndex: -1
    }, _this.methods = {
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
        var _this2 = this;

        (0, _createClass2.createSchool)({
          name: this.keywords,
          city_name: this.cityName
        }).then(function (res) {
          var data = res.data;
          if (data.success) {
            (0, _common.showMsg)('学校创建成功');
            _this2.schoolId = data.data.school_id;
            _this2.showSchool = false;
            _this2.$apply();
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
        id === 'cityIndex' && (0, _actions.setCityName)(this.cityList[value].city_name);
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
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(joinClass, [{
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
      //在小程序一个生命周期内，应该只有一次定位和一次请求所有城市
      !this.cityList.length && (0, _actions.setCityList)();
      !this.longitude && this.wxGetLocation();
      this.type = params.type;
      wx.setNavigationBarTitle({
        title: this.type === 'join' ? '加入班级' : '创建班级'
      });
      var globalData = this.$parent.globalData;
      this.memberInfo = globalData.memberInfo;
      this.$apply();
    }
  }, {
    key: 'wxGetLocation',
    value: function wxGetLocation() {
      wx.getLocation({
        type: 'wgs84',
        complete: function complete(res) {
          var lat = res.latitude,
              lng = res.longitude;
          (0, _actions.saveLocation)({ lat: lat, lng: lng });
          (0, _actions.getCityName)({ lat: lat, lng: lng });
        }
      });
    }
  }, {
    key: 'getSchoolList',
    value: function getSchoolList() {
      var _this3 = this;

      if (!this.keywords.length) return;
      // 如果输入两个字，删除一个字，剩余一个字的时候也会触发getSchoolList（实际上两个字都删除）,所以这里多加一层判断
      (0, _createClass2.schoolList)({
        keywords: this.keywords,
        city_name: this.cityName
      }).then(function (res) {
        _this3.schoolList = res.data.list;
        _this3.showSchool = true;
        _this3.$apply();
      });
    }
  }]);

  return joinClass;
}(_wepy2.default.page)) || _class);

Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(joinClass , 'pages/createClass'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZUNsYXNzLmpzIl0sIm5hbWVzIjpbInN0b3JlIiwiam9pbkNsYXNzIiwiY2l0eUxpc3QiLCJzdGF0ZSIsInpvbmUiLCJjaXR5X2xpc3QiLCJjaXR5TmFtZSIsImNpdHlfbmFtZSIsImxvbmdpdHVkZSIsImxuZyIsImxhdGl0dWRlIiwibGF0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJjbGFzc051bWJlciIsImdyYWRlTnVtYmVyIiwiYWN0aXZlQ2xhc3NUeXBlIiwic2hvd1NjaG9vbCIsImNsYXNzVHlwZXMiLCJ0aXRsZSIsImlkIiwidmFsdWUiLCJtZW1iZXJJbmZvIiwic2Nob29sTGlzdCIsInR5cGUiLCJrZXl3b3JkcyIsInNjaG9vbElkIiwiY2l0eUluZGV4IiwibWV0aG9kcyIsInNldFBhZ2UiLCJwYWdlIiwid3giLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCIkYXBwbHkiLCJzd2l0Y2hUYWIiLCJ1cmwiLCJkZWxldGVTY2hvb2wiLCJzZXRTY2hvb2wiLCJvYmoiLCJuYW1lIiwiY3JlYXRlU2Nob29sIiwidGhlbiIsInJlcyIsInN1Y2Nlc3MiLCJzY2hvb2xfaWQiLCJoaWRlU2Nob29sIiwiYmluZElucHV0IiwiZSIsImN1cnJlbnRUYXJnZXQiLCJkZXRhaWwiLCJnZXRTY2hvb2xMaXN0Iiwic2VsZWN0IiwiaW5kZXgiLCJiaW5kUGlja2VyIiwic3VibWl0IiwiZ3JhZGUiLCJ5ZWFyIiwiTnVtYmVyIiwiY2xhc3MiLCJjcmVhdGVDbGFzc0NhbGxiYWNrIiwiY2hlY2tDbGFzc0V4aXN0Iiwid2VweSIsIm5hdmlnYXRlVG8iLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImNyZWF0ZUNsYXNzIiwicGFyYW1zIiwibGVuZ3RoIiwid3hHZXRMb2NhdGlvbiIsImdldExvY2F0aW9uIiwiY29tcGxldGUiLCJsaXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7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QUFEaEIsT0FBekI7QUFHQSxVQUFNd0MsYUFBYSxLQUFLRCxPQUFMLENBQWFDLFVBQWhDO0FBQ0EsV0FBSzFDLFVBQUwsR0FBa0IwQyxXQUFXMUMsVUFBN0I7QUFDQSxXQUFLVyxNQUFMO0FBQ0Q7OztvQ0FDZTtBQUNkRixTQUFHc0MsV0FBSCxDQUFlO0FBQ2I3QyxjQUFNLE9BRE87QUFFYjhDLGdCQUZhLG9CQUVKNUIsR0FGSSxFQUVDO0FBQ1osY0FBTWhDLE1BQU1nQyxJQUFJakMsUUFBaEI7QUFBQSxjQUNNRCxNQUFNa0MsSUFBSW5DLFNBRGhCO0FBRUEscUNBQWEsRUFBQ0csUUFBRCxFQUFNRixRQUFOLEVBQWI7QUFDQSxvQ0FBWSxFQUFDRSxRQUFELEVBQU1GLFFBQU4sRUFBWjtBQUNEO0FBUFksT0FBZjtBQVNEOzs7b0NBQ2U7QUFBQTs7QUFDZCxVQUFJLENBQUMsS0FBS2lCLFFBQUwsQ0FBYzBDLE1BQW5CLEVBQTJCO0FBQzNCO0FBQ0Esb0NBQVc7QUFDVDFDLGtCQUFVLEtBQUtBLFFBRE47QUFFVG5CLG1CQUFXLEtBQUtEO0FBRlAsT0FBWCxFQUdHb0MsSUFISCxDQUdRLGVBQU87QUFDYixlQUFLbEIsVUFBTCxHQUFrQm1CLElBQUk3QixJQUFKLENBQVMwRCxJQUEzQjtBQUNBLGVBQUt0RCxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsZUFBS2dCLE1BQUw7QUFDRCxPQVBEO0FBUUQ7Ozs7RUFqTG9DNEIsZUFBSy9CLEk7a0JBQXZCOUIsUyIsImZpbGUiOiJjcmVhdGVDbGFzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgeyBjb25uZWN0LCBnZXRTdG9yZSB9IGZyb20gJ3dlcHktcmVkdXgnXHJcbmltcG9ydCB7IHNldENpdHlMaXN0LCBnZXRDaXR5TmFtZSwgc2F2ZUxvY2F0aW9uLCBzZXRDaXR5TmFtZSB9IGZyb20gJy4uL3N0b3JlL2FjdGlvbnMnXHJcbmltcG9ydCB7IHNob3dNc2csIHRocm90dGxlLCBpc0VtcHR5U3RyaW5nIH0gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xyXG5pbXBvcnQgeyBzY2hvb2xMaXN0LCBzZWFyY2hDbGFzcywgZ2V0Q2l0eUluZm8sIGdldENpdHlMaXN0LCBjcmVhdGVTY2hvb2x9IGZyb20gJy4uL2FwaS9jcmVhdGVDbGFzcydcclxuXHJcbmxldCBzdG9yZSA9IGdldFN0b3JlKClcclxuXHJcbkBjb25uZWN0KFxyXG4gIHtcclxuICAgIGNpdHlMaXN0KHN0YXRlKSB7XHJcbiAgICAgIHJldHVybiBzdGF0ZS56b25lLmNpdHlfbGlzdFxyXG4gICAgfSxcclxuICAgIGNpdHlOYW1lKHN0YXRlKSB7XHJcbiAgICAgIHJldHVybiBzdGF0ZS56b25lLmNpdHlfbmFtZVxyXG4gICAgfSxcclxuICAgIGxvbmdpdHVkZShzdGF0ZSkge1xyXG4gICAgICByZXR1cm4gc3RhdGUuem9uZS5sbmdcclxuICAgIH0sXHJcbiAgICBsYXRpdHVkZShzdGF0ZSkge1xyXG4gICAgICByZXR1cm4gc3RhdGUuem9uZS5sYXRcclxuICAgIH1cclxuICB9XHJcbilcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGpvaW5DbGFzcyBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WIm+W7uuePree6pydcclxuICB9XHJcbiAgZGF0YSA9IHtcclxuICAgIGNsYXNzTnVtYmVyOiAwLFxyXG4gICAgZ3JhZGVOdW1iZXI6IDAsXHJcbiAgICBhY3RpdmVDbGFzc1R5cGU6IDAsXHJcbiAgICBzaG93U2Nob29sOiBmYWxzZSxcclxuICAgIGNsYXNzVHlwZXM6IFtcclxuICAgICAge1xyXG4gICAgICAgIHRpdGxlOiAn5bm85YS/5ZutJyxcclxuICAgICAgICBpZDogMCxcclxuICAgICAgICB2YWx1ZTogJ2tpbmRlcmdhcnRlbidcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRpdGxlOiAn5bCP5a2mJyxcclxuICAgICAgICBpZDogMSxcclxuICAgICAgICB2YWx1ZTogJ3ByaW1hcnknXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogJ+WIneS4rScsXHJcbiAgICAgICAgaWQ6IDIsXHJcbiAgICAgICAgdmFsdWU6ICdtaWRkbGUnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogJ+mrmOS4rScsXHJcbiAgICAgICAgaWQ6IDMsXHJcbiAgICAgICAgdmFsdWU6ICdoaWdoJ1xyXG4gICAgICB9XHJcbiAgICBdLFxyXG4gICAgbWVtYmVySW5mbzogbnVsbCxcclxuICAgIHNjaG9vbExpc3Q6IFtdLFxyXG4gICAgdHlwZTogJycsXHJcbiAgICBrZXl3b3JkczogJycsXHJcbiAgICBzY2hvb2xJZDogMCxcclxuICAgIGNpdHlJbmRleDogLTFcclxuICB9XHJcbiAgY2hlY2tDbGFzc0V4aXN0KGRhdGEpIHtcclxuICAgIHNlYXJjaENsYXNzKGRhdGEpLnRoZW4ocmVzID0+IHtcclxuICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YS5kYXRhXHJcbiAgICAgIGlmIChkYXRhICYmIGRhdGEuaWQpIHtcclxuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgdXJsOiBgam9pbkNsYXNzP2NsYXNzSWQ9JHtkYXRhLmlkfSZuYW1lPSR7ZGF0YS5uYW1lfWBcclxuICAgICAgICB9KVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNob3dNc2coJ+aCqOi+k+WFpeeahOePree6p+S4jeWtmOWcqO+8jOivt+mHjeivlScpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG4gIGNyZWF0ZUNsYXNzQ2FsbGJhY2soZGF0YSkge1xyXG4gICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuY3JlYXRlQ2xhc3MgPSBkYXRhXHJcbiAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICB1cmw6ICdiaW5kUmVsYXRpb25zaGlwP3R5cGU9Y3JlYXRlJ1xyXG4gICAgfSlcclxuICB9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIHNldFBhZ2UocGFnZSwgdHlwZSkge1xyXG4gICAgICBpZiAocGFnZSA9PT0gJ2NyZWF0ZUNsYXNzJykge1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGVcclxuICAgICAgICB3eC5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe1xyXG4gICAgICAgICAgdGl0bGU6IHRoaXMudHlwZSA9PT0gJ2pvaW4nID8gJ+WKoOWFpeePree6pycgOiAn5Yib5bu654+t57qnJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHd4LnN3aXRjaFRhYih7XHJcbiAgICAgICAgICB1cmw6ICdjbGFzc0xpc3QnXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGRlbGV0ZVNjaG9vbCgpIHtcclxuICAgICAgdGhpcy5rZXl3b3JkcyA9ICcnXHJcbiAgICAgIHRoaXMuc2Nob29sSWQgPSAwXHJcbiAgICAgIHRoaXMuc2hvd1NjaG9vbCA9IGZhbHNlXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0sXHJcbiAgICBzZXRTY2hvb2wob2JqKSB7XHJcbiAgICAgIHRoaXMuc2Nob29sSWQgPSBvYmouaWRcclxuICAgICAgdGhpcy5rZXl3b3JkcyA9IG9iai5uYW1lXHJcbiAgICAgIHRoaXMuc2hvd1NjaG9vbCA9IGZhbHNlXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0sXHJcbiAgICBjcmVhdGVTY2hvb2woKSB7XHJcbiAgICAgIGNyZWF0ZVNjaG9vbCh7XHJcbiAgICAgICAgbmFtZTogdGhpcy5rZXl3b3JkcyxcclxuICAgICAgICBjaXR5X25hbWU6IHRoaXMuY2l0eU5hbWVcclxuICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGFcclxuICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICBzaG93TXNnKCflrabmoKHliJvlu7rmiJDlip8nKVxyXG4gICAgICAgICAgdGhpcy5zY2hvb2xJZCA9IGRhdGEuZGF0YS5zY2hvb2xfaWRcclxuICAgICAgICAgIHRoaXMuc2hvd1NjaG9vbCA9IGZhbHNlXHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIGhpZGVTY2hvb2woKSB7XHJcbiAgICAgIHRoaXMuc2hvd1NjaG9vbCA9IGZhbHNlXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0sXHJcbiAgICBiaW5kSW5wdXQoZSkge1xyXG4gICAgICBjb25zdCBpZCA9IGUuY3VycmVudFRhcmdldC5pZFxyXG4gICAgICB0aGlzW2lkXSA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgIGlmIChpZCA9PT0gJ2tleXdvcmRzJyAmJiAhaXNFbXB0eVN0cmluZyh0aGlzLmtleXdvcmRzKSkge1xyXG4gICAgICAgIHRocm90dGxlKHRoaXMuZ2V0U2Nob29sTGlzdCwgdGhpcywgMTAwMClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnNob3dTY2hvb2wgPSBmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0sXHJcbiAgICBzZWxlY3QoaW5kZXgpIHtcclxuICAgICAgdGhpcy5hY3RpdmVDbGFzc1R5cGUgPSBpbmRleFxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9LFxyXG4gICAgYmluZFBpY2tlcihlKSB7XHJcbiAgICAgIGNvbnN0IGlkID0gZS5jdXJyZW50VGFyZ2V0LmlkXHJcbiAgICAgIGNvbnN0IHZhbHVlID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgdGhpc1tpZF0gPSB2YWx1ZVxyXG4gICAgICBpZCA9PT0gJ2NpdHlJbmRleCcgJiYgc2V0Q2l0eU5hbWUodGhpcy5jaXR5TGlzdFt2YWx1ZV0uY2l0eV9uYW1lKVxyXG4gICAgfSxcclxuICAgIHN1Ym1pdCgpIHtcclxuICAgICAgaWYgKCF0aGlzLmdyYWRlTnVtYmVyKSB7XHJcbiAgICAgICAgc2hvd01zZygn6K+36L6T5YWl57qn5Yir5Y+3JylcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICBpZiAoIXRoaXMuY2xhc3NOdW1iZXIpIHtcclxuICAgICAgICBzaG93TXNnKCfor7fovpPlhaXnj63nuqflj7cnKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICAgIGlmICghdGhpcy5zY2hvb2xJZCkge1xyXG4gICAgICAgIHNob3dNc2coJ+ivt+i+k+WFpeWtpuagoeWQjeensCcpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgICAgc2Nob29sX2lkOiB0aGlzLnNjaG9vbElkLFxyXG4gICAgICAgIGdyYWRlOiB0aGlzLmNsYXNzVHlwZXNbdGhpcy5hY3RpdmVDbGFzc1R5cGVdLnZhbHVlLFxyXG4gICAgICAgIHllYXI6IE51bWJlcih0aGlzLmdyYWRlTnVtYmVyKSxcclxuICAgICAgICBjbGFzczogTnVtYmVyKHRoaXMuY2xhc3NOdW1iZXIpXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy50eXBlID09PSAnY3JlYXRlJyAmJiB0aGlzLmNyZWF0ZUNsYXNzQ2FsbGJhY2soZGF0YSlcclxuICAgICAgdGhpcy50eXBlID09PSAnam9pbicgJiYgdGhpcy5jaGVja0NsYXNzRXhpc3QoZGF0YSlcclxuICAgIH1cclxuICB9XHJcbiAgb25Mb2FkKHBhcmFtcykge1xyXG4gICAgLy/lnKjlsI/nqIvluo/kuIDkuKrnlJ/lkb3lkajmnJ/lhoXvvIzlupTor6Xlj6rmnInkuIDmrKHlrprkvY3lkozkuIDmrKHor7fmsYLmiYDmnInln47luIJcclxuICAgICF0aGlzLmNpdHlMaXN0Lmxlbmd0aCAmJiBzZXRDaXR5TGlzdCgpXHJcbiAgICAhdGhpcy5sb25naXR1ZGUgJiYgdGhpcy53eEdldExvY2F0aW9uKClcclxuICAgIHRoaXMudHlwZSA9IHBhcmFtcy50eXBlXHJcbiAgICB3eC5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe1xyXG4gICAgICB0aXRsZTogdGhpcy50eXBlID09PSAnam9pbicgPyAn5Yqg5YWl54+t57qnJyA6ICfliJvlu7rnj63nuqcnXHJcbiAgICB9KVxyXG4gICAgY29uc3QgZ2xvYmFsRGF0YSA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhXHJcbiAgICB0aGlzLm1lbWJlckluZm8gPSBnbG9iYWxEYXRhLm1lbWJlckluZm9cclxuICAgIHRoaXMuJGFwcGx5KClcclxuICB9XHJcbiAgd3hHZXRMb2NhdGlvbigpIHtcclxuICAgIHd4LmdldExvY2F0aW9uKHtcclxuICAgICAgdHlwZTogJ3dnczg0JyxcclxuICAgICAgY29tcGxldGUocmVzKSB7XHJcbiAgICAgICAgY29uc3QgbGF0ID0gcmVzLmxhdGl0dWRlLFxyXG4gICAgICAgICAgICAgIGxuZyA9IHJlcy5sb25naXR1ZGVcclxuICAgICAgICBzYXZlTG9jYXRpb24oe2xhdCwgbG5nfSlcclxuICAgICAgICBnZXRDaXR5TmFtZSh7bGF0LCBsbmd9KVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuICBnZXRTY2hvb2xMaXN0KCkge1xyXG4gICAgaWYgKCF0aGlzLmtleXdvcmRzLmxlbmd0aCkgcmV0dXJuXHJcbiAgICAvLyDlpoLmnpzovpPlhaXkuKTkuKrlrZfvvIzliKDpmaTkuIDkuKrlrZfvvIzliankvZnkuIDkuKrlrZfnmoTml7blgJnkuZ/kvJrop6blj5FnZXRTY2hvb2xMaXN077yI5a6e6ZmF5LiK5Lik5Liq5a2X6YO95Yig6Zmk77yJLOaJgOS7pei/memHjOWkmuWKoOS4gOWxguWIpOaWrVxyXG4gICAgc2Nob29sTGlzdCh7XHJcbiAgICAgIGtleXdvcmRzOiB0aGlzLmtleXdvcmRzLFxyXG4gICAgICBjaXR5X25hbWU6IHRoaXMuY2l0eU5hbWVcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgdGhpcy5zY2hvb2xMaXN0ID0gcmVzLmRhdGEubGlzdFxyXG4gICAgICB0aGlzLnNob3dTY2hvb2wgPSB0cnVlXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcbiJdfQ==