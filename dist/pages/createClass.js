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
        this.type === 'create' && this.crateClassCallback(data);
        this.type === 'join' && this.checkClassExist(data);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(joinClass, [{
    key: 'checkClassExist',
    value: function checkClassExist(data) {
      (0, _createClass2.searchClass)(data).then(function (res) {
        _wepy2.default.navigateTo({
          url: 'joinClass?id=' + res.data.data.id
        });
      });
    }
  }, {
    key: 'createClassCallback',
    value: function createClassCallback(data) {
      this.$parent.globalData.createClass = data;
      _wepy2.default.navigateTo({
        url: 'bindRelationship'
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
    key: 'onShareAppMessage',
    value: function onShareAppMessage(res) {
      return {
        title: this.memberInfo.nickname + '\u9080\u8BF7\u60A8\u4E00\u8D77\u521B\u5EFA\u73ED\u7EA7'
      };
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZUNsYXNzLmpzIl0sIm5hbWVzIjpbImpvaW5DbGFzcyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiY2xhc3NOdW1iZXIiLCJncmFkZU51bWJlciIsImFjdGl2ZUNsYXNzVHlwZSIsImNsYXNzVHlwZXMiLCJ0aXRsZSIsImlkIiwidmFsdWUiLCJtZW1iZXJJbmZvIiwic2Nob29sTGlzdCIsInNjaG9vbEluZGV4IiwidHlwZSIsIm1ldGhvZHMiLCJiaW5kSW5wdXQiLCJlIiwiY3VycmVudFRhcmdldCIsImRldGFpbCIsIiRhcHBseSIsInNlbGVjdCIsImluZGV4IiwiYmluZFBpY2tlciIsInN1Ym1pdCIsInNjaG9vbF9pZCIsImdyYWRlIiwieWVhciIsIk51bWJlciIsImNsYXNzIiwiY3JhdGVDbGFzc0NhbGxiYWNrIiwiY2hlY2tDbGFzc0V4aXN0IiwidGhlbiIsIndlcHkiLCJuYXZpZ2F0ZVRvIiwidXJsIiwicmVzIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJjcmVhdGVDbGFzcyIsInBhcmFtcyIsImdldFNjaG9vbExpc3QiLCJuaWNrbmFtZSIsImxpc3QiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBQ3FCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsbUJBQWEsQ0FEUjtBQUVMQyxtQkFBYSxDQUZSO0FBR0xDLHVCQUFpQixDQUhaO0FBSUxDLGtCQUFZLENBQ1Y7QUFDRUMsZUFBTyxJQURUO0FBRUVDLFlBQUksQ0FGTjtBQUdFQyxlQUFPO0FBSFQsT0FEVSxFQU1WO0FBQ0VGLGVBQU8sSUFEVDtBQUVFQyxZQUFJLENBRk47QUFHRUMsZUFBTztBQUhULE9BTlUsRUFXVjtBQUNFRixlQUFPLElBRFQ7QUFFRUMsWUFBSSxDQUZOO0FBR0VDLGVBQU87QUFIVCxPQVhVLEVBZ0JWO0FBQ0VGLGVBQU8sSUFEVDtBQUVFQyxZQUFJLENBRk47QUFHRUMsZUFBTztBQUhULE9BaEJVLENBSlA7QUEwQkxDLGtCQUFZLElBMUJQO0FBMkJMQyxrQkFBWSxFQTNCUDtBQTRCTEMsbUJBQWEsQ0E1QlI7QUE2QkxDLFlBQU07QUE3QkQsSyxRQTRDUEMsTyxHQUFVO0FBQ1JDLGVBRFEscUJBQ0VDLENBREYsRUFDSztBQUNYLGFBQUtBLEVBQUVDLGFBQUYsQ0FBZ0JULEVBQXJCLElBQTJCUSxFQUFFRSxNQUFGLENBQVNULEtBQXBDO0FBQ0EsYUFBS1UsTUFBTDtBQUNELE9BSk87QUFLUkMsWUFMUSxrQkFLREMsS0FMQyxFQUtNO0FBQ1osYUFBS2hCLGVBQUwsR0FBdUJnQixLQUF2QjtBQUNBLGFBQUtGLE1BQUw7QUFDRCxPQVJPO0FBU1JHLGdCQVRRLHNCQVNHTixDQVRILEVBU007QUFDWixhQUFLQSxFQUFFQyxhQUFGLENBQWdCVCxFQUFyQixJQUEyQlEsRUFBRUUsTUFBRixDQUFTVCxLQUFwQztBQUNBLGFBQUtVLE1BQUw7QUFDRCxPQVpPO0FBYVJJLFlBYlEsb0JBYUM7QUFDUCxZQUFJLENBQUMsS0FBS25CLFdBQVYsRUFBdUI7QUFDckIsK0JBQVEsUUFBUjtBQUNBO0FBQ0Q7QUFDRCxZQUFJLENBQUMsS0FBS0QsV0FBVixFQUF1QjtBQUNyQiwrQkFBUSxRQUFSO0FBQ0E7QUFDRDtBQUNELFlBQUlELE9BQU87QUFDVHNCLHFCQUFXLEtBQUtiLFVBQUwsQ0FBZ0IsS0FBS0MsV0FBckIsRUFBa0NKLEVBRHBDO0FBRVRpQixpQkFBTyxLQUFLbkIsVUFBTCxDQUFnQixLQUFLRCxlQUFyQixFQUFzQ0ksS0FGcEM7QUFHVGlCLGdCQUFNQyxPQUFPLEtBQUt2QixXQUFaLENBSEc7QUFJVHdCLGlCQUFPRCxPQUFPLEtBQUt4QixXQUFaO0FBSkUsU0FBWDtBQU1BLGFBQUtVLElBQUwsS0FBYyxRQUFkLElBQTBCLEtBQUtnQixrQkFBTCxDQUF3QjNCLElBQXhCLENBQTFCO0FBQ0EsYUFBS1csSUFBTCxLQUFjLE1BQWQsSUFBd0IsS0FBS2lCLGVBQUwsQ0FBcUI1QixJQUFyQixDQUF4QjtBQUVEO0FBL0JPLEs7Ozs7O29DQWJNQSxJLEVBQUs7QUFDbkIscUNBQVlBLElBQVosRUFBa0I2QixJQUFsQixDQUF1QixlQUFPO0FBQzVCQyx1QkFBS0MsVUFBTCxDQUFnQjtBQUNkQyxpQ0FBcUJDLElBQUlqQyxJQUFKLENBQVNBLElBQVQsQ0FBY007QUFEckIsU0FBaEI7QUFHRCxPQUpEO0FBS0Q7Ozt3Q0FDbUJOLEksRUFBSztBQUN2QixXQUFLa0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCQyxXQUF4QixHQUFzQ3BDLElBQXRDO0FBQ0E4QixxQkFBS0MsVUFBTCxDQUFnQjtBQUNaQyxhQUFLO0FBRE8sT0FBaEI7QUFHRDs7OzJCQWtDTUssTSxFQUFRO0FBQ2IsV0FBSzFCLElBQUwsR0FBWTBCLE9BQU8xQixJQUFuQjtBQUNBLFVBQU13QixhQUFhLEtBQUtELE9BQUwsQ0FBYUMsVUFBaEM7QUFDQSxXQUFLM0IsVUFBTCxHQUFrQjJCLFdBQVczQixVQUE3QjtBQUNBLFdBQUs4QixhQUFMO0FBQ0EsV0FBS3JCLE1BQUw7QUFDRDs7O3NDQUNpQmdCLEcsRUFBSztBQUNyQixhQUFPO0FBQ0w1QixlQUFVLEtBQUtHLFVBQUwsQ0FBZ0IrQixRQUExQjtBQURLLE9BQVA7QUFHRDs7O29DQUNlO0FBQUE7O0FBQ2Qsc0NBQWFWLElBQWIsQ0FBa0IsZUFBTztBQUN2QixlQUFLcEIsVUFBTCxHQUFrQndCLElBQUlqQyxJQUFKLENBQVN3QyxJQUEzQjtBQUNBLGVBQUt2QixNQUFMO0FBQ0QsT0FIRDtBQUlEOzs7O0VBbEdvQ2EsZUFBS1csSTs7a0JBQXZCNUMsUyIsImZpbGUiOiJjcmVhdGVDbGFzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7IHNob3dNc2cgfSBmcm9tICcuLi91dGlscy9jb21tb24nXG5pbXBvcnQgeyBzY2hvb2xMaXN0LCBzZWFyY2hDbGFzcyB9IGZyb20gJy4uL2FwaS9jcmVhdGVDbGFzcydcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGpvaW5DbGFzcyBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Yib5bu654+t57qnJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgY2xhc3NOdW1iZXI6IDAsXG4gICAgZ3JhZGVOdW1iZXI6IDAsXG4gICAgYWN0aXZlQ2xhc3NUeXBlOiAwLFxuICAgIGNsYXNzVHlwZXM6IFtcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICflsI/lraYnLFxuICAgICAgICBpZDogMCxcbiAgICAgICAgdmFsdWU6ICdwcmltYXJ5J1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICfliJ3kuK0nLFxuICAgICAgICBpZDogMSxcbiAgICAgICAgdmFsdWU6ICdtaWRkbGUnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aXRsZTogJ+mrmOS4rScsXG4gICAgICAgIGlkOiAyLFxuICAgICAgICB2YWx1ZTogJ2hpZ2gnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aXRsZTogJ+Wkp+WtpicsXG4gICAgICAgIGlkOiAzLFxuICAgICAgICB2YWx1ZTogJ3VuaXZlcnNpdHknXG4gICAgICB9XG4gICAgXSxcbiAgICBtZW1iZXJJbmZvOiBudWxsLFxuICAgIHNjaG9vbExpc3Q6IFtdLFxuICAgIHNjaG9vbEluZGV4OiAwLFxuICAgIHR5cGU6ICcnXG4gIH1cbiAgY2hlY2tDbGFzc0V4aXN0KGRhdGEpe1xuICAgIHNlYXJjaENsYXNzKGRhdGEpLnRoZW4ocmVzID0+IHtcbiAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogYGpvaW5DbGFzcz9pZD0ke3Jlcy5kYXRhLmRhdGEuaWR9YFxuICAgICAgfSlcbiAgICB9KVxuICB9XG4gIGNyZWF0ZUNsYXNzQ2FsbGJhY2soZGF0YSl7XG4gICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuY3JlYXRlQ2xhc3MgPSBkYXRhXG4gICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiAnYmluZFJlbGF0aW9uc2hpcCdcbiAgICAgIH0pXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBiaW5kSW5wdXQoZSkge1xuICAgICAgdGhpc1tlLmN1cnJlbnRUYXJnZXQuaWRdID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIHNlbGVjdChpbmRleCkge1xuICAgICAgdGhpcy5hY3RpdmVDbGFzc1R5cGUgPSBpbmRleFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgYmluZFBpY2tlcihlKSB7XG4gICAgICB0aGlzW2UuY3VycmVudFRhcmdldC5pZF0gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgc3VibWl0KCkge1xuICAgICAgaWYgKCF0aGlzLmdyYWRlTnVtYmVyKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+i+k+WFpee6p+WIq+WPtycpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLmNsYXNzTnVtYmVyKSB7XG4gICAgICAgIHNob3dNc2coJ+ivt+i+k+WFpeePree6p+WPtycpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgIHNjaG9vbF9pZDogdGhpcy5zY2hvb2xMaXN0W3RoaXMuc2Nob29sSW5kZXhdLmlkLFxuICAgICAgICBncmFkZTogdGhpcy5jbGFzc1R5cGVzW3RoaXMuYWN0aXZlQ2xhc3NUeXBlXS52YWx1ZSxcbiAgICAgICAgeWVhcjogTnVtYmVyKHRoaXMuZ3JhZGVOdW1iZXIpLFxuICAgICAgICBjbGFzczogTnVtYmVyKHRoaXMuY2xhc3NOdW1iZXIpXG4gICAgICB9XG4gICAgICB0aGlzLnR5cGUgPT09ICdjcmVhdGUnICYmIHRoaXMuY3JhdGVDbGFzc0NhbGxiYWNrKGRhdGEpXG4gICAgICB0aGlzLnR5cGUgPT09ICdqb2luJyAmJiB0aGlzLmNoZWNrQ2xhc3NFeGlzdChkYXRhKVxuXG4gICAgfVxuICB9XG4gIG9uTG9hZChwYXJhbXMpIHtcbiAgICB0aGlzLnR5cGUgPSBwYXJhbXMudHlwZVxuICAgIGNvbnN0IGdsb2JhbERhdGEgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YVxuICAgIHRoaXMubWVtYmVySW5mbyA9IGdsb2JhbERhdGEubWVtYmVySW5mb1xuICAgIHRoaXMuZ2V0U2Nob29sTGlzdCgpXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIG9uU2hhcmVBcHBNZXNzYWdlKHJlcykge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogYCR7dGhpcy5tZW1iZXJJbmZvLm5pY2tuYW1lfemCgOivt+aCqOS4gOi1t+WIm+W7uuePree6p2BcbiAgICB9XG4gIH1cbiAgZ2V0U2Nob29sTGlzdCgpIHtcbiAgICBzY2hvb2xMaXN0KCkudGhlbihyZXMgPT4ge1xuICAgICAgdGhpcy5zY2hvb2xMaXN0ID0gcmVzLmRhdGEubGlzdFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0pXG4gIH1cbn1cbiJdfQ==