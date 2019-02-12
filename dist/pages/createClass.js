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
      schoolIndex: 0
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
        this.$parent.globalData.createClass = data;
        _wepy2.default.navigateTo({
          url: 'bindRelationship'
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(joinClass, [{
    key: 'onLoad',
    value: function onLoad() {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZUNsYXNzLmpzIl0sIm5hbWVzIjpbImpvaW5DbGFzcyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiY2xhc3NOdW1iZXIiLCJncmFkZU51bWJlciIsImFjdGl2ZUNsYXNzVHlwZSIsImNsYXNzVHlwZXMiLCJ0aXRsZSIsImlkIiwidmFsdWUiLCJtZW1iZXJJbmZvIiwic2Nob29sTGlzdCIsInNjaG9vbEluZGV4IiwibWV0aG9kcyIsImJpbmRJbnB1dCIsImUiLCJjdXJyZW50VGFyZ2V0IiwiZGV0YWlsIiwiJGFwcGx5Iiwic2VsZWN0IiwiaW5kZXgiLCJiaW5kUGlja2VyIiwic3VibWl0Iiwic2Nob29sX2lkIiwiZ3JhZGUiLCJ5ZWFyIiwiTnVtYmVyIiwiY2xhc3MiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImNyZWF0ZUNsYXNzIiwid2VweSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnZXRTY2hvb2xMaXN0IiwicmVzIiwibmlja25hbWUiLCJ0aGVuIiwibGlzdCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7SUFDcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxtQkFBYSxDQURSO0FBRUxDLG1CQUFhLENBRlI7QUFHTEMsdUJBQWlCLENBSFo7QUFJTEMsa0JBQVksQ0FDVjtBQUNFQyxlQUFPLElBRFQ7QUFFRUMsWUFBSSxDQUZOO0FBR0VDLGVBQU87QUFIVCxPQURVLEVBTVY7QUFDRUYsZUFBTyxJQURUO0FBRUVDLFlBQUksQ0FGTjtBQUdFQyxlQUFPO0FBSFQsT0FOVSxFQVdWO0FBQ0VGLGVBQU8sSUFEVDtBQUVFQyxZQUFJLENBRk47QUFHRUMsZUFBTztBQUhULE9BWFUsRUFnQlY7QUFDRUYsZUFBTyxJQURUO0FBRUVDLFlBQUksQ0FGTjtBQUdFQyxlQUFPO0FBSFQsT0FoQlUsQ0FKUDtBQTBCTEMsa0JBQVksSUExQlA7QUEyQkxDLGtCQUFZLEVBM0JQO0FBNEJMQyxtQkFBYTtBQTVCUixLLFFBOEJQQyxPLEdBQVU7QUFDUkMsZUFEUSxxQkFDRUMsQ0FERixFQUNLO0FBQ1gsYUFBS0EsRUFBRUMsYUFBRixDQUFnQlIsRUFBckIsSUFBMkJPLEVBQUVFLE1BQUYsQ0FBU1IsS0FBcEM7QUFDQSxhQUFLUyxNQUFMO0FBQ0QsT0FKTztBQUtSQyxZQUxRLGtCQUtEQyxLQUxDLEVBS007QUFDWixhQUFLZixlQUFMLEdBQXVCZSxLQUF2QjtBQUNBLGFBQUtGLE1BQUw7QUFDRCxPQVJPO0FBU1JHLGdCQVRRLHNCQVNHTixDQVRILEVBU007QUFDWixhQUFLQSxFQUFFQyxhQUFGLENBQWdCUixFQUFyQixJQUEyQk8sRUFBRUUsTUFBRixDQUFTUixLQUFwQztBQUNBLGFBQUtTLE1BQUw7QUFDRCxPQVpPO0FBYVJJLFlBYlEsb0JBYUM7QUFDUCxZQUFJLENBQUMsS0FBS2xCLFdBQVYsRUFBdUI7QUFDckIsK0JBQVEsUUFBUjtBQUNBO0FBQ0Q7QUFDRCxZQUFJLENBQUMsS0FBS0QsV0FBVixFQUF1QjtBQUNyQiwrQkFBUSxRQUFSO0FBQ0E7QUFDRDtBQUNELFlBQUlELE9BQU87QUFDVHFCLHFCQUFXLEtBQUtaLFVBQUwsQ0FBZ0IsS0FBS0MsV0FBckIsRUFBa0NKLEVBRHBDO0FBRVRnQixpQkFBTyxLQUFLbEIsVUFBTCxDQUFnQixLQUFLRCxlQUFyQixFQUFzQ0ksS0FGcEM7QUFHVGdCLGdCQUFNQyxPQUFPLEtBQUt0QixXQUFaLENBSEc7QUFJVHVCLGlCQUFPRCxPQUFPLEtBQUt2QixXQUFaO0FBSkUsU0FBWDtBQU1BLGFBQUt5QixPQUFMLENBQWFDLFVBQWIsQ0FBd0JDLFdBQXhCLEdBQXNDNUIsSUFBdEM7QUFDQTZCLHVCQUFLQyxVQUFMLENBQWdCO0FBQ2RDLGVBQUs7QUFEUyxTQUFoQjtBQUdEO0FBaENPLEs7Ozs7OzZCQWtDRDtBQUNQLFVBQU1KLGFBQWEsS0FBS0QsT0FBTCxDQUFhQyxVQUFoQztBQUNBLFdBQUtuQixVQUFMLEdBQWtCbUIsV0FBV25CLFVBQTdCO0FBQ0EsV0FBS3dCLGFBQUw7QUFDQSxXQUFLaEIsTUFBTDtBQUNEOzs7c0NBQ2lCaUIsRyxFQUFLO0FBQ3JCLGFBQU87QUFDTDVCLGVBQVUsS0FBS0csVUFBTCxDQUFnQjBCLFFBQTFCO0FBREssT0FBUDtBQUdEOzs7b0NBQ2U7QUFBQTs7QUFDZCxzQ0FBYUMsSUFBYixDQUFrQixlQUFPO0FBQ3ZCLGVBQUsxQixVQUFMLEdBQWtCd0IsSUFBSWpDLElBQUosQ0FBU29DLElBQTNCO0FBQ0EsZUFBS3BCLE1BQUw7QUFDRCxPQUhEO0FBSUQ7Ozs7RUFwRm9DYSxlQUFLUSxJOztrQkFBdkJ4QyxTIiwiZmlsZSI6ImNyZWF0ZUNsYXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHsgc2hvd01zZyB9IGZyb20gJy4uL3V0aWxzL2NvbW1vbidcbmltcG9ydCB7IHNjaG9vbExpc3QgfSBmcm9tICcuLi9hcGkvY3JlYXRlQ2xhc3MnXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBqb2luQ2xhc3MgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WIm+W7uuePree6pydcbiAgfVxuICBkYXRhID0ge1xuICAgIGNsYXNzTnVtYmVyOiAwLFxuICAgIGdyYWRlTnVtYmVyOiAwLFxuICAgIGFjdGl2ZUNsYXNzVHlwZTogMCxcbiAgICBjbGFzc1R5cGVzOiBbXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAn5bCP5a2mJyxcbiAgICAgICAgaWQ6IDAsXG4gICAgICAgIHZhbHVlOiAncHJpbWFyeSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAn5Yid5LitJyxcbiAgICAgICAgaWQ6IDEsXG4gICAgICAgIHZhbHVlOiAnbWlkZGxlJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICfpq5jkuK0nLFxuICAgICAgICBpZDogMixcbiAgICAgICAgdmFsdWU6ICdoaWdoJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICflpKflraYnLFxuICAgICAgICBpZDogMyxcbiAgICAgICAgdmFsdWU6ICd1bml2ZXJzaXR5J1xuICAgICAgfVxuICAgIF0sXG4gICAgbWVtYmVySW5mbzogbnVsbCxcbiAgICBzY2hvb2xMaXN0OiBbXSxcbiAgICBzY2hvb2xJbmRleDogMFxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgYmluZElucHV0KGUpIHtcbiAgICAgIHRoaXNbZS5jdXJyZW50VGFyZ2V0LmlkXSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBzZWxlY3QoaW5kZXgpIHtcbiAgICAgIHRoaXMuYWN0aXZlQ2xhc3NUeXBlID0gaW5kZXhcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGJpbmRQaWNrZXIoZSkge1xuICAgICAgdGhpc1tlLmN1cnJlbnRUYXJnZXQuaWRdID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIHN1Ym1pdCgpIHtcbiAgICAgIGlmICghdGhpcy5ncmFkZU51bWJlcikge1xuICAgICAgICBzaG93TXNnKCfor7fovpPlhaXnuqfliKvlj7cnKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5jbGFzc051bWJlcikge1xuICAgICAgICBzaG93TXNnKCfor7fovpPlhaXnj63nuqflj7cnKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICBzY2hvb2xfaWQ6IHRoaXMuc2Nob29sTGlzdFt0aGlzLnNjaG9vbEluZGV4XS5pZCxcbiAgICAgICAgZ3JhZGU6IHRoaXMuY2xhc3NUeXBlc1t0aGlzLmFjdGl2ZUNsYXNzVHlwZV0udmFsdWUsXG4gICAgICAgIHllYXI6IE51bWJlcih0aGlzLmdyYWRlTnVtYmVyKSxcbiAgICAgICAgY2xhc3M6IE51bWJlcih0aGlzLmNsYXNzTnVtYmVyKVxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuY3JlYXRlQ2xhc3MgPSBkYXRhXG4gICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6ICdiaW5kUmVsYXRpb25zaGlwJ1xuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgb25Mb2FkKCkge1xuICAgIGNvbnN0IGdsb2JhbERhdGEgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YVxuICAgIHRoaXMubWVtYmVySW5mbyA9IGdsb2JhbERhdGEubWVtYmVySW5mb1xuICAgIHRoaXMuZ2V0U2Nob29sTGlzdCgpXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIG9uU2hhcmVBcHBNZXNzYWdlKHJlcykge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogYCR7dGhpcy5tZW1iZXJJbmZvLm5pY2tuYW1lfemCgOivt+aCqOS4gOi1t+WIm+W7uuePree6p2BcbiAgICB9XG4gIH1cbiAgZ2V0U2Nob29sTGlzdCgpIHtcbiAgICBzY2hvb2xMaXN0KCkudGhlbihyZXMgPT4ge1xuICAgICAgdGhpcy5zY2hvb2xMaXN0ID0gcmVzLmRhdGEubGlzdFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0pXG4gIH1cbn1cbiJdfQ==