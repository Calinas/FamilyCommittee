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
      classId: -1
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
        title: this.memberInfo.nickname + '\u9080\u8BF7\u60A8\u4E00\u8D77\u52A0\u5165' + this.classInfo.name + ',\u9A8C\u8BC1\u7801\u662F' + this.classInfo.join_key,
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
        this.classInfo = wx.getStorageSync('classInfo');
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzTGlzdC5qcyJdLCJuYW1lcyI6WyJDbGFzc0xpc3QiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImNsYXNzTGlzdCIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJsaXN0Iiwia2V5IiwibmFtZSIsImNsYXNzSWQiLCJtZXRob2RzIiwic2V0Q2xhc3MiLCJpbmRleCIsInd4Iiwic2V0U3RvcmFnZSIsImNsYXNzIiwic3VjY2VzcyIsInN3aXRjaFRhYiIsInVybCIsIiRhcHBseSIsInRoZW4iLCJyZXMiLCJ0aXRsZSIsIm5pY2tuYW1lIiwiam9pbl9rZXkiLCJwYXRoIiwiaWQiLCJyZXNldERhdGEiLCJnZXRDbGFzc0xpc3QiLCJMaXN0IiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJjbGFzc0hhc0NoYW5nZSIsImdldFN0b3JhZ2VTeW5jIiwicGFyYW1zIiwidXNlckRhdGEiLCJtZW1iZXJfaWQiLCJyZWRpcmVjdFRvIiwibmF2aWdhdGVUbyIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0lBQ3FCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsaUJBQVcsRUFETjtBQUVMQyxrQkFBWSxFQUZQO0FBR0xDLGlCQUFXLElBSE47QUFJTEMsWUFBTSxFQUpEO0FBS0xDLFdBQUssRUFMQTtBQU1MQyxZQUFNLEVBTkQ7QUFPTEMsZUFBUyxDQUFDO0FBUEwsSyxRQTZCUEMsTyxHQUFVO0FBQ1JDLGNBRFEsb0JBQ0NDLEtBREQsRUFDUTtBQUFBOztBQUNkQyxXQUFHQyxVQUFILENBQWM7QUFDWlAsZUFBSyxXQURPO0FBRVpMLGdCQUFNLEtBQUtJLElBQUwsQ0FBVU0sS0FBVixFQUFpQkcsS0FGWDtBQUdaQyxtQkFBUyxzQkFBTztBQUNkLG1CQUFLWCxTQUFMLEdBQWlCLE9BQUtDLElBQUwsQ0FBVU0sS0FBVixFQUFpQkcsS0FBbEM7QUFDQUYsZUFBR0ksU0FBSCxDQUFhLEVBQUNDLEtBQUssTUFBTixFQUFiO0FBQ0EsbUJBQUtDLE1BQUw7QUFDRDtBQVBXLFNBQWQ7QUFTRDtBQVhPLEs7Ozs7O21DQXBCSztBQUFBOztBQUNiLHdDQUFlQyxJQUFmLENBQW9CLGVBQU87QUFDekIsZUFBS2QsSUFBTCxHQUFZZSxJQUFJbkIsSUFBSixDQUFTSSxJQUFyQjtBQUNBLGVBQUthLE1BQUw7QUFDRCxPQUhEO0FBSUQ7OztzQ0FDaUJFLEcsRUFBSztBQUNyQixhQUFPO0FBQ0xDLGVBQVUsS0FBS2xCLFVBQUwsQ0FBZ0JtQixRQUExQixrREFBNEMsS0FBS2xCLFNBQUwsQ0FBZUcsSUFBM0QsaUNBQXVFLEtBQUtILFNBQUwsQ0FBZW1CLFFBRGpGO0FBRUxDLDJDQUFpQyxLQUFLcEIsU0FBTCxDQUFlcUIsRUFBaEQsY0FBMkQsS0FBS3JCLFNBQUwsQ0FBZUcsSUFBMUUsYUFBc0YsS0FBS0gsU0FBTCxDQUFlbUI7QUFGaEcsT0FBUDtBQUlEOzs7d0NBQ21CO0FBQ2xCLFdBQUtHLFNBQUw7QUFDQSxXQUFLQyxZQUFMO0FBQ0Q7OztnQ0FDVztBQUNWLFdBQUtDLElBQUwsR0FBWSxFQUFaO0FBQ0EsV0FBS1YsTUFBTDtBQUNEOzs7NkJBY1E7QUFDUCxVQUFJLEtBQUtXLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkMsY0FBNUIsRUFBNEM7QUFDMUMsYUFBSzNCLFNBQUwsR0FBaUJRLEdBQUdvQixjQUFILENBQWtCLFdBQWxCLENBQWpCO0FBQ0EsYUFBS0wsWUFBTDtBQUNBLGFBQUtFLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkMsY0FBeEIsR0FBeUMsS0FBekM7QUFDRDtBQUNGOzs7MkJBQ01FLE0sRUFBUTtBQUNiLFdBQUs5QixVQUFMLEdBQWtCUyxHQUFHb0IsY0FBSCxDQUFrQixZQUFsQixDQUFsQjtBQUNBLFdBQUs1QixTQUFMLEdBQWlCUSxHQUFHb0IsY0FBSCxDQUFrQixXQUFsQixDQUFqQjtBQUNBLFdBQUtILE9BQUwsQ0FBYUMsVUFBYixDQUF3QkksUUFBeEIsR0FBbUMsS0FBSy9CLFVBQXhDO0FBQ0EsV0FBS0ksSUFBTCxHQUFZMEIsT0FBTzFCLElBQW5CO0FBQ0EsV0FBS0MsT0FBTCxHQUFleUIsT0FBT3pCLE9BQXRCO0FBQ0EsV0FBS0YsR0FBTCxHQUFXMkIsT0FBTzNCLEdBQWxCO0FBQ0EsVUFBSSxLQUFLQSxHQUFMLElBQVksQ0FBQyxLQUFLSCxVQUFMLENBQWdCZ0MsU0FBakMsRUFBNEM7QUFDMUM7QUFDQXZCLFdBQUd3QixVQUFILENBQWM7QUFDWm5CLDhCQUFrQixLQUFLWDtBQURYLFNBQWQ7QUFHRCxPQUxELE1BS08sSUFBSSxLQUFLQSxHQUFMLElBQVksS0FBS0gsVUFBTCxDQUFnQmdDLFNBQWhDLEVBQTBDO0FBQy9DdkIsV0FBR3lCLFVBQUgsQ0FBYztBQUNacEIsc0NBQTBCLEtBQUtULE9BQS9CLGNBQStDLEtBQUtELElBQXBELGFBQWdFLEtBQUtEO0FBRHpELFNBQWQ7QUFHRDtBQUNELFdBQUtxQixZQUFMO0FBQ0EsV0FBS1QsTUFBTDtBQUNEOzs7O0VBeEVvQ29CLGVBQUtDLEk7O2tCQUF2QnpDLFMiLCJmaWxlIjoiY2xhc3NMaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHsgZ2V0Q2xhc3NMaXN0IH0gZnJvbSAnLi4vYXBpL2NyZWF0ZUNsYXNzJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2xhc3NMaXN0IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmiJHnmoTnj63nuqcnXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBjbGFzc0xpc3Q6IFtdLFxuICAgIG1lbWJlckluZm86IHt9LFxuICAgIGNsYXNzSW5mbzogbnVsbCxcbiAgICBsaXN0OiBbXSxcbiAgICBrZXk6ICcnLFxuICAgIG5hbWU6ICcnLFxuICAgIGNsYXNzSWQ6IC0xXG4gIH1cbiAgZ2V0Q2xhc3NMaXN0KCkge1xuICAgIGdldENsYXNzTGlzdCgpLnRoZW4ocmVzID0+IHtcbiAgICAgIHRoaXMubGlzdCA9IHJlcy5kYXRhLmxpc3RcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9KVxuICB9XG4gIG9uU2hhcmVBcHBNZXNzYWdlKHJlcykge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogYCR7dGhpcy5tZW1iZXJJbmZvLm5pY2tuYW1lfemCgOivt+aCqOS4gOi1t+WKoOWFpSR7dGhpcy5jbGFzc0luZm8ubmFtZX0s6aqM6K+B56CB5pivJHt0aGlzLmNsYXNzSW5mby5qb2luX2tleX1gLFxuICAgICAgcGF0aDogYHBhZ2VzL2NsYXNzTGlzdD9jbGFzc0lkPSR7dGhpcy5jbGFzc0luZm8uaWR9Jm5hbWU9JHt0aGlzLmNsYXNzSW5mby5uYW1lfSZrZXk9JHt0aGlzLmNsYXNzSW5mby5qb2luX2tleX1gXG4gICAgfVxuICB9XG4gIG9uUHVsbERvd25SZWZyZXNoKCkge1xuICAgIHRoaXMucmVzZXREYXRhKClcbiAgICB0aGlzLmdldENsYXNzTGlzdCgpXG4gIH1cbiAgcmVzZXREYXRhKCkge1xuICAgIHRoaXMuTGlzdCA9IFtdXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgc2V0Q2xhc3MoaW5kZXgpIHtcbiAgICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAgICBrZXk6ICdjbGFzc0luZm8nLFxuICAgICAgICBkYXRhOiB0aGlzLmxpc3RbaW5kZXhdLmNsYXNzLFxuICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgIHRoaXMuY2xhc3NJbmZvID0gdGhpcy5saXN0W2luZGV4XS5jbGFzc1xuICAgICAgICAgIHd4LnN3aXRjaFRhYih7dXJsOiAnem9uZSd9KVxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgb25TaG93KCkge1xuICAgIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5jbGFzc0hhc0NoYW5nZSkge1xuICAgICAgdGhpcy5jbGFzc0luZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnY2xhc3NJbmZvJylcbiAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KClcbiAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmNsYXNzSGFzQ2hhbmdlID0gZmFsc2VcbiAgICB9XG4gIH1cbiAgb25Mb2FkKHBhcmFtcykge1xuICAgIHRoaXMubWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcbiAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxuICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJEYXRhID0gdGhpcy5tZW1iZXJJbmZvXG4gICAgdGhpcy5uYW1lID0gcGFyYW1zLm5hbWVcbiAgICB0aGlzLmNsYXNzSWQgPSBwYXJhbXMuY2xhc3NJZFxuICAgIHRoaXMua2V5ID0gcGFyYW1zLmtleVxuICAgIGlmICh0aGlzLmtleSAmJiAhdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCkge1xuICAgICAgLy8g5aaC5p6c5piv5LuO5YiG5Lqr6ZO+5o6l6L+b5YWl5LiU5rKh5pyJ5rOo5YaM77yM5YWI6LWw5rOo5YaM5rWB56iLXG4gICAgICB3eC5yZWRpcmVjdFRvKHtcbiAgICAgICAgdXJsOiBgbG9naW4/a2V5PSR7dGhpcy5rZXl9YFxuICAgICAgfSlcbiAgICB9IGVsc2UgaWYgKHRoaXMua2V5ICYmIHRoaXMubWVtYmVySW5mby5tZW1iZXJfaWQpe1xuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogYGpvaW5DbGFzcz9jbGFzc0lkPSR7dGhpcy5jbGFzc0lkfSZuYW1lPSR7dGhpcy5uYW1lfSZrZXk9JHt0aGlzLmtleX1gXG4gICAgICB9KVxuICAgIH1cbiAgICB0aGlzLmdldENsYXNzTGlzdCgpXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG59XG4iXX0=