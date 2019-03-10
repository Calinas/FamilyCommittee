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
        // let list = data.family_list.list
        // for(let i in list) {
        //   this.familyList.push(data.family_list[i])
        // }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbWJlci5qcyJdLCJuYW1lcyI6WyJNZW1iZXIiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImNvdW50IiwidGVhY2hlckxpc3QiLCJmYW1pbHlMaXN0IiwiYXV0aExpc3QiLCJjbGFzc0luZm8iLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwiZ2V0TWVtYmVyTGlzdCIsImNsYXNzX2lkIiwiaWQiLCJ0aGVuIiwicmVzIiwiZmFtaWx5X2xpc3QiLCJ0ZWFjaGVyX2xpc3QiLCJhZG1pbl9saXN0IiwiJGFwcGx5Iiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFDcUJBLE07Ozs7Ozs7Ozs7Ozs7O3NMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxhQUFPLENBREY7QUFFTEMsbUJBQWEsRUFGUjtBQUdMQyxrQkFBWSxFQUhQO0FBSUxDLGdCQUFVO0FBSkwsSzs7Ozs7NkJBTUU7QUFDUCxXQUFLQyxTQUFMLEdBQWlCQyxHQUFHQyxjQUFILENBQWtCLFdBQWxCLENBQWpCO0FBQ0EsV0FBS0MsYUFBTDtBQUNEOzs7b0NBQ2U7QUFBQTs7QUFDZCwrQkFBYztBQUNaQyxrQkFBVSxLQUFLSixTQUFMLENBQWVLO0FBRGIsT0FBZCxFQUVHQyxJQUZILENBRVEsZUFBTztBQUNiLFlBQUlYLE9BQU9ZLElBQUlaLElBQWY7QUFDQSxlQUFLRyxVQUFMLEdBQWtCSCxLQUFLYSxXQUF2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBS1gsV0FBTCxHQUFtQkYsS0FBS2MsWUFBeEI7QUFDQSxlQUFLYixLQUFMLEdBQWEsT0FBS0UsVUFBTCxDQUFnQkYsS0FBaEIsR0FBd0IsT0FBS0MsV0FBTCxDQUFpQkQsS0FBdEQ7QUFDQSxlQUFLRyxRQUFMLEdBQWdCSixLQUFLZSxVQUFyQjtBQUNBLGVBQUtDLE1BQUw7QUFDRCxPQWJEO0FBY0Q7Ozs7RUE3QmlDQyxlQUFLQyxJOztrQkFBcEJyQixNIiwiZmlsZSI6Im1lbWJlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgeyBnZXRNZW1iZXJMaXN0IH0gZnJvbSAnLi4vYXBpL3VzZXInXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZW1iZXIgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aIkOWRmCdcbiAgfVxuICBkYXRhID0ge1xuICAgIGNvdW50OiAwLFxuICAgIHRlYWNoZXJMaXN0OiBbXSxcbiAgICBmYW1pbHlMaXN0OiBbXSxcbiAgICBhdXRoTGlzdDogW11cbiAgfVxuICBvbkxvYWQoKSB7XG4gICAgdGhpcy5jbGFzc0luZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnY2xhc3NJbmZvJylcbiAgICB0aGlzLmdldE1lbWJlckxpc3QoKVxuICB9XG4gIGdldE1lbWJlckxpc3QoKSB7XG4gICAgZ2V0TWVtYmVyTGlzdCh7XG4gICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWRcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhXG4gICAgICB0aGlzLmZhbWlseUxpc3QgPSBkYXRhLmZhbWlseV9saXN0XG4gICAgICAvLyBsZXQgbGlzdCA9IGRhdGEuZmFtaWx5X2xpc3QubGlzdFxuICAgICAgLy8gZm9yKGxldCBpIGluIGxpc3QpIHtcbiAgICAgIC8vICAgdGhpcy5mYW1pbHlMaXN0LnB1c2goZGF0YS5mYW1pbHlfbGlzdFtpXSlcbiAgICAgIC8vIH1cbiAgICAgIHRoaXMudGVhY2hlckxpc3QgPSBkYXRhLnRlYWNoZXJfbGlzdFxuICAgICAgdGhpcy5jb3VudCA9IHRoaXMuZmFtaWx5TGlzdC5jb3VudCArIHRoaXMudGVhY2hlckxpc3QuY291bnRcbiAgICAgIHRoaXMuYXV0aExpc3QgPSBkYXRhLmFkbWluX2xpc3RcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9KVxuICB9XG59XG4iXX0=