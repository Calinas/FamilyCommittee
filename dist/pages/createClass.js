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
      schoolIndex: 0,
      type: ''
    }, _this.methods = {
      bindInput: function bindInput(e) {
        this[e.currentTarget.id] = e.detail.value;
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
        var data = {
          school_id: this.schoolList[this.schoolIndex].id,
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
      this.type = params.type;
      var globalData = this.$parent.globalData;
      this.memberInfo = globalData.memberInfo;
      this.getSchoolList();
      this.$apply();
    }
  }, {
    key: 'getSchoolList',
    value: function getSchoolList() {
      var _this2 = this;

      (0, _createClass2.schoolList)().then(function (res) {
        _this2.schoolList = res.data.list;
        _this2.$apply();
      });
    }
  }]);

  return joinClass;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(joinClass , 'pages/createClass'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZUNsYXNzLmpzIl0sIm5hbWVzIjpbImpvaW5DbGFzcyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiY2xhc3NOdW1iZXIiLCJncmFkZU51bWJlciIsImFjdGl2ZUNsYXNzVHlwZSIsImNsYXNzVHlwZXMiLCJ0aXRsZSIsImlkIiwidmFsdWUiLCJtZW1iZXJJbmZvIiwic2Nob29sTGlzdCIsInNjaG9vbEluZGV4IiwidHlwZSIsIm1ldGhvZHMiLCJiaW5kSW5wdXQiLCJlIiwiY3VycmVudFRhcmdldCIsImRldGFpbCIsIiRhcHBseSIsInNlbGVjdCIsImluZGV4IiwiYmluZFBpY2tlciIsInN1Ym1pdCIsInNjaG9vbF9pZCIsImdyYWRlIiwieWVhciIsIk51bWJlciIsImNsYXNzIiwiY3JlYXRlQ2xhc3NDYWxsYmFjayIsImNoZWNrQ2xhc3NFeGlzdCIsInRoZW4iLCJyZXMiLCJ3ZXB5IiwibmF2aWdhdGVUbyIsInVybCIsIm5hbWUiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImNyZWF0ZUNsYXNzIiwicGFyYW1zIiwiZ2V0U2Nob29sTGlzdCIsImxpc3QiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBQ3FCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsbUJBQWEsQ0FEUjtBQUVMQyxtQkFBYSxDQUZSO0FBR0xDLHVCQUFpQixDQUhaO0FBSUxDLGtCQUFZLENBQ1Y7QUFDRUMsZUFBTyxJQURUO0FBRUVDLFlBQUksQ0FGTjtBQUdFQyxlQUFPO0FBSFQsT0FEVSxFQU1WO0FBQ0VGLGVBQU8sSUFEVDtBQUVFQyxZQUFJLENBRk47QUFHRUMsZUFBTztBQUhULE9BTlUsRUFXVjtBQUNFRixlQUFPLElBRFQ7QUFFRUMsWUFBSSxDQUZOO0FBR0VDLGVBQU87QUFIVCxPQVhVLEVBZ0JWO0FBQ0VGLGVBQU8sSUFEVDtBQUVFQyxZQUFJLENBRk47QUFHRUMsZUFBTztBQUhULE9BaEJVLENBSlA7QUEwQkxDLGtCQUFZLElBMUJQO0FBMkJMQyxrQkFBWSxFQTNCUDtBQTRCTEMsbUJBQWEsQ0E1QlI7QUE2QkxDLFlBQU07QUE3QkQsSyxRQWlEUEMsTyxHQUFVO0FBQ1JDLGVBRFEscUJBQ0VDLENBREYsRUFDSztBQUNYLGFBQUtBLEVBQUVDLGFBQUYsQ0FBZ0JULEVBQXJCLElBQTJCUSxFQUFFRSxNQUFGLENBQVNULEtBQXBDO0FBQ0EsYUFBS1UsTUFBTDtBQUNELE9BSk87QUFLUkMsWUFMUSxrQkFLREMsS0FMQyxFQUtNO0FBQ1osYUFBS2hCLGVBQUwsR0FBdUJnQixLQUF2QjtBQUNBLGFBQUtGLE1BQUw7QUFDRCxPQVJPO0FBU1JHLGdCQVRRLHNCQVNHTixDQVRILEVBU007QUFDWixhQUFLQSxFQUFFQyxhQUFGLENBQWdCVCxFQUFyQixJQUEyQlEsRUFBRUUsTUFBRixDQUFTVCxLQUFwQztBQUNBLGFBQUtVLE1BQUw7QUFDRCxPQVpPO0FBYVJJLFlBYlEsb0JBYUM7QUFDUCxZQUFJLENBQUMsS0FBS25CLFdBQVYsRUFBdUI7QUFDckIsK0JBQVEsUUFBUjtBQUNBO0FBQ0Q7QUFDRCxZQUFJLENBQUMsS0FBS0QsV0FBVixFQUF1QjtBQUNyQiwrQkFBUSxRQUFSO0FBQ0E7QUFDRDtBQUNELFlBQUlELE9BQU87QUFDVHNCLHFCQUFXLEtBQUtiLFVBQUwsQ0FBZ0IsS0FBS0MsV0FBckIsRUFBa0NKLEVBRHBDO0FBRVRpQixpQkFBTyxLQUFLbkIsVUFBTCxDQUFnQixLQUFLRCxlQUFyQixFQUFzQ0ksS0FGcEM7QUFHVGlCLGdCQUFNQyxPQUFPLEtBQUt2QixXQUFaLENBSEc7QUFJVHdCLGlCQUFPRCxPQUFPLEtBQUt4QixXQUFaO0FBSkUsU0FBWDtBQU1BLGFBQUtVLElBQUwsS0FBYyxRQUFkLElBQTBCLEtBQUtnQixtQkFBTCxDQUF5QjNCLElBQXpCLENBQTFCO0FBQ0EsYUFBS1csSUFBTCxLQUFjLE1BQWQsSUFBd0IsS0FBS2lCLGVBQUwsQ0FBcUI1QixJQUFyQixDQUF4QjtBQUNEO0FBOUJPLEs7Ozs7O29DQWxCTUEsSSxFQUFLO0FBQ25CLHFDQUFZQSxJQUFaLEVBQWtCNkIsSUFBbEIsQ0FBdUIsZUFBTztBQUM1QixZQUFJN0IsT0FBTzhCLElBQUk5QixJQUFKLENBQVNBLElBQXBCO0FBQ0EsWUFBR0EsUUFBUUEsS0FBS00sRUFBaEIsRUFBb0I7QUFDbEJ5Qix5QkFBS0MsVUFBTCxDQUFnQjtBQUNkQyx3Q0FBMEJqQyxLQUFLTSxFQUEvQixjQUEwQ04sS0FBS2tDO0FBRGpDLFdBQWhCO0FBR0QsU0FKRCxNQUlPO0FBQ0wsK0JBQVEsZUFBUjtBQUNEO0FBQ0YsT0FURDtBQVVEOzs7d0NBQ21CbEMsSSxFQUFLO0FBQ3ZCLFdBQUttQyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JDLFdBQXhCLEdBQXNDckMsSUFBdEM7QUFDQStCLHFCQUFLQyxVQUFMLENBQWdCO0FBQ1pDLGFBQUs7QUFETyxPQUFoQjtBQUdEOzs7MkJBaUNNSyxNLEVBQVE7QUFDYixXQUFLM0IsSUFBTCxHQUFZMkIsT0FBTzNCLElBQW5CO0FBQ0EsVUFBTXlCLGFBQWEsS0FBS0QsT0FBTCxDQUFhQyxVQUFoQztBQUNBLFdBQUs1QixVQUFMLEdBQWtCNEIsV0FBVzVCLFVBQTdCO0FBQ0EsV0FBSytCLGFBQUw7QUFDQSxXQUFLdEIsTUFBTDtBQUNEOzs7b0NBQ2U7QUFBQTs7QUFDZCxzQ0FBYVksSUFBYixDQUFrQixlQUFPO0FBQ3ZCLGVBQUtwQixVQUFMLEdBQWtCcUIsSUFBSTlCLElBQUosQ0FBU3dDLElBQTNCO0FBQ0EsZUFBS3ZCLE1BQUw7QUFDRCxPQUhEO0FBSUQ7Ozs7RUFqR29DYyxlQUFLVSxJOztrQkFBdkI1QyxTIiwiZmlsZSI6ImNyZWF0ZUNsYXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCB7IHNob3dNc2cgfSBmcm9tICcuLi91dGlscy9jb21tb24nXHJcbmltcG9ydCB7IHNjaG9vbExpc3QsIHNlYXJjaENsYXNzIH0gZnJvbSAnLi4vYXBpL2NyZWF0ZUNsYXNzJ1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBqb2luQ2xhc3MgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfliJvlu7rnj63nuqcnXHJcbiAgfVxyXG4gIGRhdGEgPSB7XHJcbiAgICBjbGFzc051bWJlcjogMCxcclxuICAgIGdyYWRlTnVtYmVyOiAwLFxyXG4gICAgYWN0aXZlQ2xhc3NUeXBlOiAwLFxyXG4gICAgY2xhc3NUeXBlczogW1xyXG4gICAgICB7XHJcbiAgICAgICAgdGl0bGU6ICflsI/lraYnLFxyXG4gICAgICAgIGlkOiAwLFxyXG4gICAgICAgIHZhbHVlOiAncHJpbWFyeSdcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRpdGxlOiAn5Yid5LitJyxcclxuICAgICAgICBpZDogMSxcclxuICAgICAgICB2YWx1ZTogJ21pZGRsZSdcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRpdGxlOiAn6auY5LitJyxcclxuICAgICAgICBpZDogMixcclxuICAgICAgICB2YWx1ZTogJ2hpZ2gnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0aXRsZTogJ+Wkp+WtpicsXHJcbiAgICAgICAgaWQ6IDMsXHJcbiAgICAgICAgdmFsdWU6ICd1bml2ZXJzaXR5J1xyXG4gICAgICB9XHJcbiAgICBdLFxyXG4gICAgbWVtYmVySW5mbzogbnVsbCxcclxuICAgIHNjaG9vbExpc3Q6IFtdLFxyXG4gICAgc2Nob29sSW5kZXg6IDAsXHJcbiAgICB0eXBlOiAnJ1xyXG4gIH1cclxuICBjaGVja0NsYXNzRXhpc3QoZGF0YSl7XHJcbiAgICBzZWFyY2hDbGFzcyhkYXRhKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGxldCBkYXRhID0gcmVzLmRhdGEuZGF0YVxyXG4gICAgICBpZihkYXRhICYmIGRhdGEuaWQpIHtcclxuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgdXJsOiBgam9pbkNsYXNzP2NsYXNzSWQ9JHtkYXRhLmlkfSZuYW1lPSR7ZGF0YS5uYW1lfWBcclxuICAgICAgICB9KVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNob3dNc2coJ+aCqOi+k+WFpeeahOePree6p+S4jeWtmOWcqO+8jOivt+mHjeivlScpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG4gIGNyZWF0ZUNsYXNzQ2FsbGJhY2soZGF0YSl7XHJcbiAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5jcmVhdGVDbGFzcyA9IGRhdGFcclxuICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgdXJsOiAnYmluZFJlbGF0aW9uc2hpcD90eXBlPWNyZWF0ZSdcclxuICAgICAgfSlcclxuICB9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGJpbmRJbnB1dChlKSB7XHJcbiAgICAgIHRoaXNbZS5jdXJyZW50VGFyZ2V0LmlkXSA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0sXHJcbiAgICBzZWxlY3QoaW5kZXgpIHtcclxuICAgICAgdGhpcy5hY3RpdmVDbGFzc1R5cGUgPSBpbmRleFxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9LFxyXG4gICAgYmluZFBpY2tlcihlKSB7XHJcbiAgICAgIHRoaXNbZS5jdXJyZW50VGFyZ2V0LmlkXSA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0sXHJcbiAgICBzdWJtaXQoKSB7XHJcbiAgICAgIGlmICghdGhpcy5ncmFkZU51bWJlcikge1xyXG4gICAgICAgIHNob3dNc2coJ+ivt+i+k+WFpee6p+WIq+WPtycpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgaWYgKCF0aGlzLmNsYXNzTnVtYmVyKSB7XHJcbiAgICAgICAgc2hvd01zZygn6K+36L6T5YWl54+t57qn5Y+3JylcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgICBzY2hvb2xfaWQ6IHRoaXMuc2Nob29sTGlzdFt0aGlzLnNjaG9vbEluZGV4XS5pZCxcclxuICAgICAgICBncmFkZTogdGhpcy5jbGFzc1R5cGVzW3RoaXMuYWN0aXZlQ2xhc3NUeXBlXS52YWx1ZSxcclxuICAgICAgICB5ZWFyOiBOdW1iZXIodGhpcy5ncmFkZU51bWJlciksXHJcbiAgICAgICAgY2xhc3M6IE51bWJlcih0aGlzLmNsYXNzTnVtYmVyKVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMudHlwZSA9PT0gJ2NyZWF0ZScgJiYgdGhpcy5jcmVhdGVDbGFzc0NhbGxiYWNrKGRhdGEpXHJcbiAgICAgIHRoaXMudHlwZSA9PT0gJ2pvaW4nICYmIHRoaXMuY2hlY2tDbGFzc0V4aXN0KGRhdGEpXHJcbiAgICB9XHJcbiAgfVxyXG4gIG9uTG9hZChwYXJhbXMpIHtcclxuICAgIHRoaXMudHlwZSA9IHBhcmFtcy50eXBlXHJcbiAgICBjb25zdCBnbG9iYWxEYXRhID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGFcclxuICAgIHRoaXMubWVtYmVySW5mbyA9IGdsb2JhbERhdGEubWVtYmVySW5mb1xyXG4gICAgdGhpcy5nZXRTY2hvb2xMaXN0KClcclxuICAgIHRoaXMuJGFwcGx5KClcclxuICB9XHJcbiAgZ2V0U2Nob29sTGlzdCgpIHtcclxuICAgIHNjaG9vbExpc3QoKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHRoaXMuc2Nob29sTGlzdCA9IHJlcy5kYXRhLmxpc3RcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuIl19