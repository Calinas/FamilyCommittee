'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _createClass2 = require('./../api/createClass.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ClassList = function (_wepy$page) {
  _inherits(ClassList, _wepy$page);

  function ClassList() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ClassList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ClassList.__proto__ || Object.getPrototypeOf(ClassList)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '我的班级'
    }, _this.data = {
      classList: [],
      memberInfo: {},
      classInfo: null,
      list: [],
      key: '',
      name: '',
      clasId: -1
    }, _this.methods = {
      setClass: function setClass(index) {
        var _this2 = this;

        wx.setStorage({
          key: 'classInfo',
          data: this.list[index].class,
          success: function success(res) {
            _this2.classInfo = _this2.list[index].class;
            wx.switchTab({ url: 'zone' });
            _this2.$apply();
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ClassList, [{
    key: 'getClassList',
    value: function getClassList() {
      var _this3 = this;

      (0, _createClass2.getClassList)().then(function (res) {
        _this3.list = res.data.list;
        _this3.$apply();
      });
    }
  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage(res) {
      return {
        title: this.memberInfo.nickname + '\u9080\u8BF7\u60A8\u4E00\u8D77\u52A0\u5165' + this.classInfo.name,
        path: 'pages/classList?classId=' + this.classInfo.id + '&name=' + this.classInfo.name + '&key=' + this.classInfo.join_key
      };
    }
  }, {
    key: 'onPullDownRefresh',
    value: function onPullDownRefresh() {
      this.resetData();
      this.getClassList();
    }
  }, {
    key: 'resetData',
    value: function resetData() {
      this.List = [];
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      if (this.$parent.globalData.classHasChange) {
        this.getClassList();
        this.$parent.globalData.classHasChange = false;
      }
    }
  }, {
    key: 'onLoad',
    value: function onLoad(params) {
      this.memberInfo = wx.getStorageSync('memberInfo');
      this.classInfo = wx.getStorageSync('classInfo');
      this.$parent.globalData.userData = this.memberInfo;
      this.name = params.name;
      this.classId = params.classId;
      this.key = params.key;
      if (this.key && !this.memberInfo.member_id) {
        // 如果是从分享链接进入且没有注册，先走注册流程
        wx.redirectTo({
          url: 'login?key=' + this.key
        });
      } else if (this.key && this.memberInfo.member_id) {
        wx.navigateTo({
          url: 'joinClass?classId=' + this.classId + '&name=' + this.name + '&key=' + this.key
        });
      }
      this.getClassList();
      this.$apply();
    }
  }]);

  return ClassList;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ClassList , 'pages/classList'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzTGlzdC5qcyJdLCJuYW1lcyI6WyJDbGFzc0xpc3QiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImNsYXNzTGlzdCIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJsaXN0Iiwia2V5IiwibmFtZSIsImNsYXNJZCIsIm1ldGhvZHMiLCJzZXRDbGFzcyIsImluZGV4Iiwid3giLCJzZXRTdG9yYWdlIiwiY2xhc3MiLCJzdWNjZXNzIiwic3dpdGNoVGFiIiwidXJsIiwiJGFwcGx5IiwidGhlbiIsInJlcyIsInRpdGxlIiwibmlja25hbWUiLCJwYXRoIiwiaWQiLCJqb2luX2tleSIsInJlc2V0RGF0YSIsImdldENsYXNzTGlzdCIsIkxpc3QiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImNsYXNzSGFzQ2hhbmdlIiwicGFyYW1zIiwiZ2V0U3RvcmFnZVN5bmMiLCJ1c2VyRGF0YSIsImNsYXNzSWQiLCJtZW1iZXJfaWQiLCJyZWRpcmVjdFRvIiwibmF2aWdhdGVUbyIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0lBQ3FCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsaUJBQVcsRUFETjtBQUVMQyxrQkFBWSxFQUZQO0FBR0xDLGlCQUFXLElBSE47QUFJTEMsWUFBTSxFQUpEO0FBS0xDLFdBQUssRUFMQTtBQU1MQyxZQUFNLEVBTkQ7QUFPTEMsY0FBUSxDQUFDO0FBUEosSyxRQTZCUEMsTyxHQUFVO0FBQ1JDLGNBRFEsb0JBQ0NDLEtBREQsRUFDUTtBQUFBOztBQUNkQyxXQUFHQyxVQUFILENBQWM7QUFDWlAsZUFBSyxXQURPO0FBRVpMLGdCQUFNLEtBQUtJLElBQUwsQ0FBVU0sS0FBVixFQUFpQkcsS0FGWDtBQUdaQyxtQkFBUyxzQkFBTztBQUNkLG1CQUFLWCxTQUFMLEdBQWlCLE9BQUtDLElBQUwsQ0FBVU0sS0FBVixFQUFpQkcsS0FBbEM7QUFDQUYsZUFBR0ksU0FBSCxDQUFhLEVBQUNDLEtBQUssTUFBTixFQUFiO0FBQ0EsbUJBQUtDLE1BQUw7QUFDRDtBQVBXLFNBQWQ7QUFTRDtBQVhPLEs7Ozs7O21DQXBCSztBQUFBOztBQUNiLHdDQUFlQyxJQUFmLENBQW9CLGVBQU87QUFDekIsZUFBS2QsSUFBTCxHQUFZZSxJQUFJbkIsSUFBSixDQUFTSSxJQUFyQjtBQUNBLGVBQUthLE1BQUw7QUFDRCxPQUhEO0FBSUQ7OztzQ0FDaUJFLEcsRUFBSztBQUNyQixhQUFPO0FBQ0xDLGVBQVUsS0FBS2xCLFVBQUwsQ0FBZ0JtQixRQUExQixrREFBNEMsS0FBS2xCLFNBQUwsQ0FBZUcsSUFEdEQ7QUFFTGdCLDJDQUFpQyxLQUFLbkIsU0FBTCxDQUFlb0IsRUFBaEQsY0FBMkQsS0FBS3BCLFNBQUwsQ0FBZUcsSUFBMUUsYUFBc0YsS0FBS0gsU0FBTCxDQUFlcUI7QUFGaEcsT0FBUDtBQUlEOzs7d0NBQ21CO0FBQ2xCLFdBQUtDLFNBQUw7QUFDQSxXQUFLQyxZQUFMO0FBQ0Q7OztnQ0FDVztBQUNWLFdBQUtDLElBQUwsR0FBWSxFQUFaO0FBQ0EsV0FBS1YsTUFBTDtBQUNEOzs7NkJBY1E7QUFDUCxVQUFJLEtBQUtXLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkMsY0FBNUIsRUFBNEM7QUFDMUMsYUFBS0osWUFBTDtBQUNBLGFBQUtFLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkMsY0FBeEIsR0FBeUMsS0FBekM7QUFDRDtBQUNGOzs7MkJBQ01DLE0sRUFBUTtBQUNiLFdBQUs3QixVQUFMLEdBQWtCUyxHQUFHcUIsY0FBSCxDQUFrQixZQUFsQixDQUFsQjtBQUNBLFdBQUs3QixTQUFMLEdBQWlCUSxHQUFHcUIsY0FBSCxDQUFrQixXQUFsQixDQUFqQjtBQUNBLFdBQUtKLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkksUUFBeEIsR0FBbUMsS0FBSy9CLFVBQXhDO0FBQ0EsV0FBS0ksSUFBTCxHQUFZeUIsT0FBT3pCLElBQW5CO0FBQ0EsV0FBSzRCLE9BQUwsR0FBZUgsT0FBT0csT0FBdEI7QUFDQSxXQUFLN0IsR0FBTCxHQUFXMEIsT0FBTzFCLEdBQWxCO0FBQ0EsVUFBSSxLQUFLQSxHQUFMLElBQVksQ0FBQyxLQUFLSCxVQUFMLENBQWdCaUMsU0FBakMsRUFBNEM7QUFDMUM7QUFDQXhCLFdBQUd5QixVQUFILENBQWM7QUFDWnBCLDhCQUFrQixLQUFLWDtBQURYLFNBQWQ7QUFHRCxPQUxELE1BS08sSUFBSSxLQUFLQSxHQUFMLElBQVksS0FBS0gsVUFBTCxDQUFnQmlDLFNBQWhDLEVBQTBDO0FBQy9DeEIsV0FBRzBCLFVBQUgsQ0FBYztBQUNackIsc0NBQTBCLEtBQUtrQixPQUEvQixjQUErQyxLQUFLNUIsSUFBcEQsYUFBZ0UsS0FBS0Q7QUFEekQsU0FBZDtBQUdEO0FBQ0QsV0FBS3FCLFlBQUw7QUFDQSxXQUFLVCxNQUFMO0FBQ0Q7Ozs7RUF2RW9DcUIsZUFBS0MsSTs7a0JBQXZCMUMsUyIsImZpbGUiOiJjbGFzc0xpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IHsgZ2V0Q2xhc3NMaXN0IH0gZnJvbSAnLi4vYXBpL2NyZWF0ZUNsYXNzJ1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbGFzc0xpc3QgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmiJHnmoTnj63nuqcnXHJcbiAgfVxyXG4gIGRhdGEgPSB7XHJcbiAgICBjbGFzc0xpc3Q6IFtdLFxyXG4gICAgbWVtYmVySW5mbzoge30sXHJcbiAgICBjbGFzc0luZm86IG51bGwsXHJcbiAgICBsaXN0OiBbXSxcclxuICAgIGtleTogJycsXHJcbiAgICBuYW1lOiAnJyxcclxuICAgIGNsYXNJZDogLTFcclxuICB9XHJcbiAgZ2V0Q2xhc3NMaXN0KCkge1xyXG4gICAgZ2V0Q2xhc3NMaXN0KCkudGhlbihyZXMgPT4ge1xyXG4gICAgICB0aGlzLmxpc3QgPSByZXMuZGF0YS5saXN0XHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0pXHJcbiAgfVxyXG4gIG9uU2hhcmVBcHBNZXNzYWdlKHJlcykge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGl0bGU6IGAke3RoaXMubWVtYmVySW5mby5uaWNrbmFtZX3pgoDor7fmgqjkuIDotbfliqDlhaUke3RoaXMuY2xhc3NJbmZvLm5hbWV9YCxcclxuICAgICAgcGF0aDogYHBhZ2VzL2NsYXNzTGlzdD9jbGFzc0lkPSR7dGhpcy5jbGFzc0luZm8uaWR9Jm5hbWU9JHt0aGlzLmNsYXNzSW5mby5uYW1lfSZrZXk9JHt0aGlzLmNsYXNzSW5mby5qb2luX2tleX1gXHJcbiAgICB9XHJcbiAgfVxyXG4gIG9uUHVsbERvd25SZWZyZXNoKCkge1xyXG4gICAgdGhpcy5yZXNldERhdGEoKVxyXG4gICAgdGhpcy5nZXRDbGFzc0xpc3QoKVxyXG4gIH1cclxuICByZXNldERhdGEoKSB7XHJcbiAgICB0aGlzLkxpc3QgPSBbXVxyXG4gICAgdGhpcy4kYXBwbHkoKVxyXG4gIH1cclxuICBtZXRob2RzID0ge1xyXG4gICAgc2V0Q2xhc3MoaW5kZXgpIHtcclxuICAgICAgd3guc2V0U3RvcmFnZSh7XHJcbiAgICAgICAga2V5OiAnY2xhc3NJbmZvJyxcclxuICAgICAgICBkYXRhOiB0aGlzLmxpc3RbaW5kZXhdLmNsYXNzLFxyXG4gICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICB0aGlzLmNsYXNzSW5mbyA9IHRoaXMubGlzdFtpbmRleF0uY2xhc3NcclxuICAgICAgICAgIHd4LnN3aXRjaFRhYih7dXJsOiAnem9uZSd9KVxyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbiAgb25TaG93KCkge1xyXG4gICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmNsYXNzSGFzQ2hhbmdlKSB7XHJcbiAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KClcclxuICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuY2xhc3NIYXNDaGFuZ2UgPSBmYWxzZVxyXG4gICAgfVxyXG4gIH1cclxuICBvbkxvYWQocGFyYW1zKSB7XHJcbiAgICB0aGlzLm1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXHJcbiAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxyXG4gICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckRhdGEgPSB0aGlzLm1lbWJlckluZm9cclxuICAgIHRoaXMubmFtZSA9IHBhcmFtcy5uYW1lXHJcbiAgICB0aGlzLmNsYXNzSWQgPSBwYXJhbXMuY2xhc3NJZFxyXG4gICAgdGhpcy5rZXkgPSBwYXJhbXMua2V5XHJcbiAgICBpZiAodGhpcy5rZXkgJiYgIXRoaXMubWVtYmVySW5mby5tZW1iZXJfaWQpIHtcclxuICAgICAgLy8g5aaC5p6c5piv5LuO5YiG5Lqr6ZO+5o6l6L+b5YWl5LiU5rKh5pyJ5rOo5YaM77yM5YWI6LWw5rOo5YaM5rWB56iLXHJcbiAgICAgIHd4LnJlZGlyZWN0VG8oe1xyXG4gICAgICAgIHVybDogYGxvZ2luP2tleT0ke3RoaXMua2V5fWBcclxuICAgICAgfSlcclxuICAgIH0gZWxzZSBpZiAodGhpcy5rZXkgJiYgdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCl7XHJcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgIHVybDogYGpvaW5DbGFzcz9jbGFzc0lkPSR7dGhpcy5jbGFzc0lkfSZuYW1lPSR7dGhpcy5uYW1lfSZrZXk9JHt0aGlzLmtleX1gXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICB0aGlzLmdldENsYXNzTGlzdCgpXHJcbiAgICB0aGlzLiRhcHBseSgpXHJcbiAgfVxyXG59XHJcbiJdfQ==