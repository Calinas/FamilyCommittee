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
          (0, _common.throttle)(this.getSchoolList, this, 100);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZUNsYXNzLmpzIl0sIm5hbWVzIjpbInN0b3JlIiwiam9pbkNsYXNzIiwiY2l0eUxpc3QiLCJzdGF0ZSIsInpvbmUiLCJjaXR5X2xpc3QiLCJjaXR5TmFtZSIsImNpdHlfbmFtZSIsImxvbmdpdHVkZSIsImxuZyIsImxhdGl0dWRlIiwibGF0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJjbGFzc051bWJlciIsImdyYWRlTnVtYmVyIiwiYWN0aXZlQ2xhc3NUeXBlIiwic2hvd1NjaG9vbCIsImNsYXNzVHlwZXMiLCJ0aXRsZSIsImlkIiwidmFsdWUiLCJtZW1iZXJJbmZvIiwic2Nob29sTGlzdCIsInR5cGUiLCJrZXl3b3JkcyIsInNjaG9vbElkIiwiY2l0eUluZGV4IiwibWV0aG9kcyIsInNldFBhZ2UiLCJwYWdlIiwid3giLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCIkYXBwbHkiLCJzd2l0Y2hUYWIiLCJ1cmwiLCJkZWxldGVTY2hvb2wiLCJzZXRTY2hvb2wiLCJvYmoiLCJuYW1lIiwiY3JlYXRlU2Nob29sIiwidGhlbiIsInJlcyIsInN1Y2Nlc3MiLCJzY2hvb2xfaWQiLCJoaWRlU2Nob29sIiwiYmluZElucHV0IiwiZSIsImN1cnJlbnRUYXJnZXQiLCJkZXRhaWwiLCJnZXRTY2hvb2xMaXN0Iiwic2VsZWN0IiwiaW5kZXgiLCJiaW5kUGlja2VyIiwic3VibWl0IiwiZ3JhZGUiLCJ5ZWFyIiwiTnVtYmVyIiwiY2xhc3MiLCJjcmVhdGVDbGFzc0NhbGxiYWNrIiwiY2hlY2tDbGFzc0V4aXN0Iiwid2VweSIsIm5hdmlnYXRlVG8iLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImNyZWF0ZUNsYXNzIiwicGFyYW1zIiwibGVuZ3RoIiwid3hHZXRMb2NhdGlvbiIsImdldExvY2F0aW9uIiwiY29tcGxldGUiLCJsaXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7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QUFEaEIsT0FBekI7QUFHQSxVQUFNd0MsYUFBYSxLQUFLRCxPQUFMLENBQWFDLFVBQWhDO0FBQ0EsV0FBSzFDLFVBQUwsR0FBa0IwQyxXQUFXMUMsVUFBN0I7QUFDQSxXQUFLVyxNQUFMO0FBQ0Q7OztvQ0FDZTtBQUNkRixTQUFHc0MsV0FBSCxDQUFlO0FBQ2I3QyxjQUFNLE9BRE87QUFFYjhDLGdCQUZhLG9CQUVKNUIsR0FGSSxFQUVDO0FBQ1osY0FBTWhDLE1BQU1nQyxJQUFJakMsUUFBaEI7QUFBQSxjQUNNRCxNQUFNa0MsSUFBSW5DLFNBRGhCO0FBRUEscUNBQWEsRUFBQ0csUUFBRCxFQUFNRixRQUFOLEVBQWI7QUFDQSxvQ0FBWSxFQUFDRSxRQUFELEVBQU1GLFFBQU4sRUFBWjtBQUNEO0FBUFksT0FBZjtBQVNEOzs7b0NBQ2U7QUFBQTs7QUFDZCxVQUFJLENBQUMsS0FBS2lCLFFBQUwsQ0FBYzBDLE1BQW5CLEVBQTJCO0FBQzNCO0FBQ0Esb0NBQVc7QUFDVDFDLGtCQUFVLEtBQUtBLFFBRE47QUFFVG5CLG1CQUFXLEtBQUtEO0FBRlAsT0FBWCxFQUdHb0MsSUFISCxDQUdRLGVBQU87QUFDYixlQUFLbEIsVUFBTCxHQUFrQm1CLElBQUk3QixJQUFKLENBQVMwRCxJQUEzQjtBQUNBLGVBQUt0RCxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsZUFBS2dCLE1BQUw7QUFDRCxPQVBEO0FBUUQ7Ozs7RUFqTG9DNEIsZUFBSy9CLEk7a0JBQXZCOUIsUyIsImZpbGUiOiJjcmVhdGVDbGFzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7IGNvbm5lY3QsIGdldFN0b3JlIH0gZnJvbSAnd2VweS1yZWR1eCdcbmltcG9ydCB7IHNldENpdHlMaXN0LCBnZXRDaXR5TmFtZSwgc2F2ZUxvY2F0aW9uLCBzZXRDaXR5TmFtZSB9IGZyb20gJy4uL3N0b3JlL2FjdGlvbnMnXG5pbXBvcnQgeyBzaG93TXNnLCB0aHJvdHRsZSwgaXNFbXB0eVN0cmluZyB9IGZyb20gJy4uL3V0aWxzL2NvbW1vbidcbmltcG9ydCB7IHNjaG9vbExpc3QsIHNlYXJjaENsYXNzLCBnZXRDaXR5SW5mbywgZ2V0Q2l0eUxpc3QsIGNyZWF0ZVNjaG9vbH0gZnJvbSAnLi4vYXBpL2NyZWF0ZUNsYXNzJ1xuXG5sZXQgc3RvcmUgPSBnZXRTdG9yZSgpXG5cbkBjb25uZWN0KFxuICB7XG4gICAgY2l0eUxpc3Qoc3RhdGUpIHtcbiAgICAgIHJldHVybiBzdGF0ZS56b25lLmNpdHlfbGlzdFxuICAgIH0sXG4gICAgY2l0eU5hbWUoc3RhdGUpIHtcbiAgICAgIHJldHVybiBzdGF0ZS56b25lLmNpdHlfbmFtZVxuICAgIH0sXG4gICAgbG9uZ2l0dWRlKHN0YXRlKSB7XG4gICAgICByZXR1cm4gc3RhdGUuem9uZS5sbmdcbiAgICB9LFxuICAgIGxhdGl0dWRlKHN0YXRlKSB7XG4gICAgICByZXR1cm4gc3RhdGUuem9uZS5sYXRcbiAgICB9XG4gIH1cbilcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgam9pbkNsYXNzIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfliJvlu7rnj63nuqcnXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBjbGFzc051bWJlcjogMCxcbiAgICBncmFkZU51bWJlcjogMCxcbiAgICBhY3RpdmVDbGFzc1R5cGU6IDAsXG4gICAgc2hvd1NjaG9vbDogZmFsc2UsXG4gICAgY2xhc3NUeXBlczogW1xuICAgICAge1xuICAgICAgICB0aXRsZTogJ+W5vOWEv+WbrScsXG4gICAgICAgIGlkOiAwLFxuICAgICAgICB2YWx1ZTogJ2tpbmRlcmdhcnRlbidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAn5bCP5a2mJyxcbiAgICAgICAgaWQ6IDEsXG4gICAgICAgIHZhbHVlOiAncHJpbWFyeSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAn5Yid5LitJyxcbiAgICAgICAgaWQ6IDIsXG4gICAgICAgIHZhbHVlOiAnbWlkZGxlJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICfpq5jkuK0nLFxuICAgICAgICBpZDogMyxcbiAgICAgICAgdmFsdWU6ICdoaWdoJ1xuICAgICAgfVxuICAgIF0sXG4gICAgbWVtYmVySW5mbzogbnVsbCxcbiAgICBzY2hvb2xMaXN0OiBbXSxcbiAgICB0eXBlOiAnJyxcbiAgICBrZXl3b3JkczogJycsXG4gICAgc2Nob29sSWQ6IDAsXG4gICAgY2l0eUluZGV4OiAtMVxuICB9XG4gIGNoZWNrQ2xhc3NFeGlzdChkYXRhKSB7XG4gICAgc2VhcmNoQ2xhc3MoZGF0YSkudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICBpZiAoZGF0YSAmJiBkYXRhLmlkKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiBgam9pbkNsYXNzP2NsYXNzSWQ9JHtkYXRhLmlkfSZuYW1lPSR7ZGF0YS5uYW1lfWBcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNob3dNc2coJ+aCqOi+k+WFpeeahOePree6p+S4jeWtmOWcqO+8jOivt+mHjeivlScpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBjcmVhdGVDbGFzc0NhbGxiYWNrKGRhdGEpIHtcbiAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5jcmVhdGVDbGFzcyA9IGRhdGFcbiAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiAnYmluZFJlbGF0aW9uc2hpcD90eXBlPWNyZWF0ZSdcbiAgICB9KVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgc2V0UGFnZShwYWdlLCB0eXBlKSB7XG4gICAgICBpZiAocGFnZSA9PT0gJ2NyZWF0ZUNsYXNzJykge1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlXG4gICAgICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XG4gICAgICAgICAgdGl0bGU6IHRoaXMudHlwZSA9PT0gJ2pvaW4nID8gJ+WKoOWFpeePree6pycgOiAn5Yib5bu654+t57qnJ1xuICAgICAgICB9KVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3eC5zd2l0Y2hUYWIoe1xuICAgICAgICAgIHVybDogJ2NsYXNzTGlzdCdcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9LFxuICAgIGRlbGV0ZVNjaG9vbCgpIHtcbiAgICAgIHRoaXMua2V5d29yZHMgPSAnJ1xuICAgICAgdGhpcy5zY2hvb2xJZCA9IDBcbiAgICAgIHRoaXMuc2hvd1NjaG9vbCA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBzZXRTY2hvb2wob2JqKSB7XG4gICAgICB0aGlzLnNjaG9vbElkID0gb2JqLmlkXG4gICAgICB0aGlzLmtleXdvcmRzID0gb2JqLm5hbWVcbiAgICAgIHRoaXMuc2hvd1NjaG9vbCA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBjcmVhdGVTY2hvb2woKSB7XG4gICAgICBjcmVhdGVTY2hvb2woe1xuICAgICAgICBuYW1lOiB0aGlzLmtleXdvcmRzLFxuICAgICAgICBjaXR5X25hbWU6IHRoaXMuY2l0eU5hbWVcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YVxuICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgc2hvd01zZygn5a2m5qCh5Yib5bu65oiQ5YqfJylcbiAgICAgICAgICB0aGlzLnNjaG9vbElkID0gZGF0YS5kYXRhLnNjaG9vbF9pZFxuICAgICAgICAgIHRoaXMuc2hvd1NjaG9vbCA9IGZhbHNlXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgaGlkZVNjaG9vbCgpIHtcbiAgICAgIHRoaXMuc2hvd1NjaG9vbCA9IGZhbHNlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBiaW5kSW5wdXQoZSkge1xuICAgICAgY29uc3QgaWQgPSBlLmN1cnJlbnRUYXJnZXQuaWRcbiAgICAgIHRoaXNbaWRdID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIGlmIChpZCA9PT0gJ2tleXdvcmRzJyAmJiAhaXNFbXB0eVN0cmluZyh0aGlzLmtleXdvcmRzKSkge1xuICAgICAgICB0aHJvdHRsZSh0aGlzLmdldFNjaG9vbExpc3QsIHRoaXMsIDEwMClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2hvd1NjaG9vbCA9IGZhbHNlXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBzZWxlY3QoaW5kZXgpIHtcbiAgICAgIHRoaXMuYWN0aXZlQ2xhc3NUeXBlID0gaW5kZXhcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGJpbmRQaWNrZXIoZSkge1xuICAgICAgY29uc3QgaWQgPSBlLmN1cnJlbnRUYXJnZXQuaWRcbiAgICAgIGNvbnN0IHZhbHVlID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIHRoaXNbaWRdID0gdmFsdWVcbiAgICAgIGlkID09PSAnY2l0eUluZGV4JyAmJiBzZXRDaXR5TmFtZSh0aGlzLmNpdHlMaXN0W3ZhbHVlXS5jaXR5X25hbWUpXG4gICAgfSxcbiAgICBzdWJtaXQoKSB7XG4gICAgICBpZiAoIXRoaXMuZ3JhZGVOdW1iZXIpIHtcbiAgICAgICAgc2hvd01zZygn6K+36L6T5YWl57qn5Yir5Y+3JylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuY2xhc3NOdW1iZXIpIHtcbiAgICAgICAgc2hvd01zZygn6K+36L6T5YWl54+t57qn5Y+3JylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuc2Nob29sSWQpIHtcbiAgICAgICAgc2hvd01zZygn6K+36L6T5YWl5a2m5qCh5ZCN56ewJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgc2Nob29sX2lkOiB0aGlzLnNjaG9vbElkLFxuICAgICAgICBncmFkZTogdGhpcy5jbGFzc1R5cGVzW3RoaXMuYWN0aXZlQ2xhc3NUeXBlXS52YWx1ZSxcbiAgICAgICAgeWVhcjogTnVtYmVyKHRoaXMuZ3JhZGVOdW1iZXIpLFxuICAgICAgICBjbGFzczogTnVtYmVyKHRoaXMuY2xhc3NOdW1iZXIpXG4gICAgICB9XG4gICAgICB0aGlzLnR5cGUgPT09ICdjcmVhdGUnICYmIHRoaXMuY3JlYXRlQ2xhc3NDYWxsYmFjayhkYXRhKVxuICAgICAgdGhpcy50eXBlID09PSAnam9pbicgJiYgdGhpcy5jaGVja0NsYXNzRXhpc3QoZGF0YSlcbiAgICB9XG4gIH1cbiAgb25Mb2FkKHBhcmFtcykge1xuICAgIC8v5Zyo5bCP56iL5bqP5LiA5Liq55Sf5ZG95ZGo5pyf5YaF77yM5bqU6K+l5Y+q5pyJ5LiA5qyh5a6a5L2N5ZKM5LiA5qyh6K+35rGC5omA5pyJ5Z+O5biCXG4gICAgIXRoaXMuY2l0eUxpc3QubGVuZ3RoICYmIHNldENpdHlMaXN0KClcbiAgICAhdGhpcy5sb25naXR1ZGUgJiYgdGhpcy53eEdldExvY2F0aW9uKClcbiAgICB0aGlzLnR5cGUgPSBwYXJhbXMudHlwZVxuICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XG4gICAgICB0aXRsZTogdGhpcy50eXBlID09PSAnam9pbicgPyAn5Yqg5YWl54+t57qnJyA6ICfliJvlu7rnj63nuqcnXG4gICAgfSlcbiAgICBjb25zdCBnbG9iYWxEYXRhID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGFcbiAgICB0aGlzLm1lbWJlckluZm8gPSBnbG9iYWxEYXRhLm1lbWJlckluZm9cbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgd3hHZXRMb2NhdGlvbigpIHtcbiAgICB3eC5nZXRMb2NhdGlvbih7XG4gICAgICB0eXBlOiAnd2dzODQnLFxuICAgICAgY29tcGxldGUocmVzKSB7XG4gICAgICAgIGNvbnN0IGxhdCA9IHJlcy5sYXRpdHVkZSxcbiAgICAgICAgICAgICAgbG5nID0gcmVzLmxvbmdpdHVkZVxuICAgICAgICBzYXZlTG9jYXRpb24oe2xhdCwgbG5nfSlcbiAgICAgICAgZ2V0Q2l0eU5hbWUoe2xhdCwgbG5nfSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIGdldFNjaG9vbExpc3QoKSB7XG4gICAgaWYgKCF0aGlzLmtleXdvcmRzLmxlbmd0aCkgcmV0dXJuXG4gICAgLy8g5aaC5p6c6L6T5YWl5Lik5Liq5a2X77yM5Yig6Zmk5LiA5Liq5a2X77yM5Ymp5L2Z5LiA5Liq5a2X55qE5pe25YCZ5Lmf5Lya6Kem5Y+RZ2V0U2Nob29sTGlzdO+8iOWunumZheS4iuS4pOS4quWtl+mDveWIoOmZpO+8iSzmiYDku6Xov5nph4zlpJrliqDkuIDlsYLliKTmlq1cbiAgICBzY2hvb2xMaXN0KHtcbiAgICAgIGtleXdvcmRzOiB0aGlzLmtleXdvcmRzLFxuICAgICAgY2l0eV9uYW1lOiB0aGlzLmNpdHlOYW1lXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgdGhpcy5zY2hvb2xMaXN0ID0gcmVzLmRhdGEubGlzdFxuICAgICAgdGhpcy5zaG93U2Nob29sID0gdHJ1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0pXG4gIH1cbn1cbiJdfQ==