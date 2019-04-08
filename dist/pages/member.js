'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _user = require('./../api/user.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Member = function (_wepy$page) {
  _inherits(Member, _wepy$page);

  function Member() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Member);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Member.__proto__ || Object.getPrototypeOf(Member)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '成员'
    }, _this.data = {
      count: 0,
      teacherList: [],
      familyList: [],
      authList: []
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Member, [{
    key: 'onLoad',
    value: function onLoad() {
      this.classInfo = wx.getStorageSync('classInfo');
      this.getMemberList();
    }
  }, {
    key: 'getMemberList',
    value: function getMemberList() {
      var _this2 = this;

      (0, _user.getMemberList)({
        class_id: this.classInfo.id
      }).then(function (res) {
        var data = res.data;
        _this2.familyList = data.family_list;
        _this2.teacherList = data.teacher_list;
        _this2.count = _this2.familyList.count + _this2.teacherList.count;
        _this2.authList = data.admin_list;
        _this2.$apply();
      });
    }
  }]);

  return Member;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Member , 'pages/member'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbWJlci5qcyJdLCJuYW1lcyI6WyJNZW1iZXIiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImNvdW50IiwidGVhY2hlckxpc3QiLCJmYW1pbHlMaXN0IiwiYXV0aExpc3QiLCJjbGFzc0luZm8iLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwiZ2V0TWVtYmVyTGlzdCIsImNsYXNzX2lkIiwiaWQiLCJ0aGVuIiwicmVzIiwiZmFtaWx5X2xpc3QiLCJ0ZWFjaGVyX2xpc3QiLCJhZG1pbl9saXN0IiwiJGFwcGx5Iiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFDcUJBLE07Ozs7Ozs7Ozs7Ozs7O3NMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxhQUFPLENBREY7QUFFTEMsbUJBQWEsRUFGUjtBQUdMQyxrQkFBWSxFQUhQO0FBSUxDLGdCQUFVO0FBSkwsSzs7Ozs7NkJBTUU7QUFDUCxXQUFLQyxTQUFMLEdBQWlCQyxHQUFHQyxjQUFILENBQWtCLFdBQWxCLENBQWpCO0FBQ0EsV0FBS0MsYUFBTDtBQUNEOzs7b0NBQ2U7QUFBQTs7QUFDZCwrQkFBYztBQUNaQyxrQkFBVSxLQUFLSixTQUFMLENBQWVLO0FBRGIsT0FBZCxFQUVHQyxJQUZILENBRVEsZUFBTztBQUNiLFlBQUlYLE9BQU9ZLElBQUlaLElBQWY7QUFDQSxlQUFLRyxVQUFMLEdBQWtCSCxLQUFLYSxXQUF2QjtBQUNBLGVBQUtYLFdBQUwsR0FBbUJGLEtBQUtjLFlBQXhCO0FBQ0EsZUFBS2IsS0FBTCxHQUFhLE9BQUtFLFVBQUwsQ0FBZ0JGLEtBQWhCLEdBQXdCLE9BQUtDLFdBQUwsQ0FBaUJELEtBQXREO0FBQ0EsZUFBS0csUUFBTCxHQUFnQkosS0FBS2UsVUFBckI7QUFDQSxlQUFLQyxNQUFMO0FBQ0QsT0FURDtBQVVEOzs7O0VBekJpQ0MsZUFBS0MsSTs7a0JBQXBCckIsTSIsImZpbGUiOiJtZW1iZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IHsgZ2V0TWVtYmVyTGlzdCB9IGZyb20gJy4uL2FwaS91c2VyJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVtYmVyIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmiJDlkZgnXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBjb3VudDogMCxcbiAgICB0ZWFjaGVyTGlzdDogW10sXG4gICAgZmFtaWx5TGlzdDogW10sXG4gICAgYXV0aExpc3Q6IFtdXG4gIH1cbiAgb25Mb2FkKCkge1xuICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXG4gICAgdGhpcy5nZXRNZW1iZXJMaXN0KClcbiAgfVxuICBnZXRNZW1iZXJMaXN0KCkge1xuICAgIGdldE1lbWJlckxpc3Qoe1xuICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YVxuICAgICAgdGhpcy5mYW1pbHlMaXN0ID0gZGF0YS5mYW1pbHlfbGlzdFxuICAgICAgdGhpcy50ZWFjaGVyTGlzdCA9IGRhdGEudGVhY2hlcl9saXN0XG4gICAgICB0aGlzLmNvdW50ID0gdGhpcy5mYW1pbHlMaXN0LmNvdW50ICsgdGhpcy50ZWFjaGVyTGlzdC5jb3VudFxuICAgICAgdGhpcy5hdXRoTGlzdCA9IGRhdGEuYWRtaW5fbGlzdFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0pXG4gIH1cbn1cbiJdfQ==