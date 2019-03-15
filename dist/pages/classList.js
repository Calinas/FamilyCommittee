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
          url: 'login?key=' + this.key + 'classId=' + this.classId + '&name=' + this.name
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzTGlzdC5qcyJdLCJuYW1lcyI6WyJDbGFzc0xpc3QiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImNsYXNzTGlzdCIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJsaXN0Iiwia2V5IiwibmFtZSIsImNsYXNzSWQiLCJtZXRob2RzIiwic2V0Q2xhc3MiLCJpbmRleCIsInd4Iiwic2V0U3RvcmFnZSIsImNsYXNzIiwic3VjY2VzcyIsInN3aXRjaFRhYiIsInVybCIsIiRhcHBseSIsInRoZW4iLCJyZXMiLCJ0aXRsZSIsIm5pY2tuYW1lIiwiam9pbl9rZXkiLCJwYXRoIiwiaWQiLCJyZXNldERhdGEiLCJnZXRDbGFzc0xpc3QiLCJMaXN0IiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJjbGFzc0hhc0NoYW5nZSIsImdldFN0b3JhZ2VTeW5jIiwicGFyYW1zIiwidXNlckRhdGEiLCJtZW1iZXJfaWQiLCJyZWRpcmVjdFRvIiwibmF2aWdhdGVUbyIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0lBQ3FCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsaUJBQVcsRUFETjtBQUVMQyxrQkFBWSxFQUZQO0FBR0xDLGlCQUFXLElBSE47QUFJTEMsWUFBTSxFQUpEO0FBS0xDLFdBQUssRUFMQTtBQU1MQyxZQUFNLEVBTkQ7QUFPTEMsZUFBUyxDQUFDO0FBUEwsSyxRQTZCUEMsTyxHQUFVO0FBQ1JDLGNBRFEsb0JBQ0NDLEtBREQsRUFDUTtBQUFBOztBQUNkQyxXQUFHQyxVQUFILENBQWM7QUFDWlAsZUFBSyxXQURPO0FBRVpMLGdCQUFNLEtBQUtJLElBQUwsQ0FBVU0sS0FBVixFQUFpQkcsS0FGWDtBQUdaQyxtQkFBUyxzQkFBTztBQUNkLG1CQUFLWCxTQUFMLEdBQWlCLE9BQUtDLElBQUwsQ0FBVU0sS0FBVixFQUFpQkcsS0FBbEM7QUFDQUYsZUFBR0ksU0FBSCxDQUFhLEVBQUNDLEtBQUssTUFBTixFQUFiO0FBQ0EsbUJBQUtDLE1BQUw7QUFDRDtBQVBXLFNBQWQ7QUFTRDtBQVhPLEs7Ozs7O21DQXBCSztBQUFBOztBQUNiLHdDQUFlQyxJQUFmLENBQW9CLGVBQU87QUFDekIsZUFBS2QsSUFBTCxHQUFZZSxJQUFJbkIsSUFBSixDQUFTSSxJQUFyQjtBQUNBLGVBQUthLE1BQUw7QUFDRCxPQUhEO0FBSUQ7OztzQ0FDaUJFLEcsRUFBSztBQUNyQixhQUFPO0FBQ0xDLGVBQVUsS0FBS2xCLFVBQUwsQ0FBZ0JtQixRQUExQixrREFBNEMsS0FBS2xCLFNBQUwsQ0FBZUcsSUFBM0QsaUNBQXVFLEtBQUtILFNBQUwsQ0FBZW1CLFFBRGpGO0FBRUxDLDJDQUFpQyxLQUFLcEIsU0FBTCxDQUFlcUIsRUFBaEQsY0FBMkQsS0FBS3JCLFNBQUwsQ0FBZUcsSUFBMUUsYUFBc0YsS0FBS0gsU0FBTCxDQUFlbUI7QUFGaEcsT0FBUDtBQUlEOzs7d0NBQ21CO0FBQ2xCLFdBQUtHLFNBQUw7QUFDQSxXQUFLQyxZQUFMO0FBQ0Q7OztnQ0FDVztBQUNWLFdBQUtDLElBQUwsR0FBWSxFQUFaO0FBQ0EsV0FBS1YsTUFBTDtBQUNEOzs7NkJBY1E7QUFDUCxVQUFJLEtBQUtXLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkMsY0FBNUIsRUFBNEM7QUFDMUMsYUFBSzNCLFNBQUwsR0FBaUJRLEdBQUdvQixjQUFILENBQWtCLFdBQWxCLENBQWpCO0FBQ0EsYUFBS0wsWUFBTDtBQUNBLGFBQUtFLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkMsY0FBeEIsR0FBeUMsS0FBekM7QUFDRDtBQUNGOzs7MkJBQ01FLE0sRUFBUTtBQUNiLFdBQUs5QixVQUFMLEdBQWtCUyxHQUFHb0IsY0FBSCxDQUFrQixZQUFsQixDQUFsQjtBQUNBLFdBQUs1QixTQUFMLEdBQWlCUSxHQUFHb0IsY0FBSCxDQUFrQixXQUFsQixDQUFqQjtBQUNBLFdBQUtILE9BQUwsQ0FBYUMsVUFBYixDQUF3QkksUUFBeEIsR0FBbUMsS0FBSy9CLFVBQXhDO0FBQ0EsV0FBS0ksSUFBTCxHQUFZMEIsT0FBTzFCLElBQW5CO0FBQ0EsV0FBS0MsT0FBTCxHQUFleUIsT0FBT3pCLE9BQXRCO0FBQ0EsV0FBS0YsR0FBTCxHQUFXMkIsT0FBTzNCLEdBQWxCO0FBQ0EsVUFBSSxLQUFLQSxHQUFMLElBQVksQ0FBQyxLQUFLSCxVQUFMLENBQWdCZ0MsU0FBakMsRUFBNEM7QUFDMUM7QUFDQXZCLFdBQUd3QixVQUFILENBQWM7QUFDWm5CLDhCQUFrQixLQUFLWCxHQUF2QixnQkFBcUMsS0FBS0UsT0FBMUMsY0FBMEQsS0FBS0Q7QUFEbkQsU0FBZDtBQUdELE9BTEQsTUFLTyxJQUFJLEtBQUtELEdBQUwsSUFBWSxLQUFLSCxVQUFMLENBQWdCZ0MsU0FBaEMsRUFBMkM7QUFDaER2QixXQUFHeUIsVUFBSCxDQUFjO0FBQ1pwQixzQ0FBMEIsS0FBS1QsT0FBL0IsY0FBK0MsS0FBS0QsSUFBcEQsYUFBZ0UsS0FBS0Q7QUFEekQsU0FBZDtBQUdEO0FBQ0QsV0FBS3FCLFlBQUw7QUFDQSxXQUFLVCxNQUFMO0FBQ0Q7Ozs7RUF4RW9Db0IsZUFBS0MsSTs7a0JBQXZCekMsUyIsImZpbGUiOiJjbGFzc0xpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgeyBnZXRDbGFzc0xpc3QgfSBmcm9tICcuLi9hcGkvY3JlYXRlQ2xhc3MnXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbGFzc0xpc3QgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aIkeeahOePree6pydcbiAgfVxuICBkYXRhID0ge1xuICAgIGNsYXNzTGlzdDogW10sXG4gICAgbWVtYmVySW5mbzoge30sXG4gICAgY2xhc3NJbmZvOiBudWxsLFxuICAgIGxpc3Q6IFtdLFxuICAgIGtleTogJycsXG4gICAgbmFtZTogJycsXG4gICAgY2xhc3NJZDogLTFcbiAgfVxuICBnZXRDbGFzc0xpc3QoKSB7XG4gICAgZ2V0Q2xhc3NMaXN0KCkudGhlbihyZXMgPT4ge1xuICAgICAgdGhpcy5saXN0ID0gcmVzLmRhdGEubGlzdFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0pXG4gIH1cbiAgb25TaGFyZUFwcE1lc3NhZ2UocmVzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiBgJHt0aGlzLm1lbWJlckluZm8ubmlja25hbWV96YKA6K+35oKo5LiA6LW35Yqg5YWlJHt0aGlzLmNsYXNzSW5mby5uYW1lfSzpqozor4HnoIHmmK8ke3RoaXMuY2xhc3NJbmZvLmpvaW5fa2V5fWAsXG4gICAgICBwYXRoOiBgcGFnZXMvY2xhc3NMaXN0P2NsYXNzSWQ9JHt0aGlzLmNsYXNzSW5mby5pZH0mbmFtZT0ke3RoaXMuY2xhc3NJbmZvLm5hbWV9JmtleT0ke3RoaXMuY2xhc3NJbmZvLmpvaW5fa2V5fWBcbiAgICB9XG4gIH1cbiAgb25QdWxsRG93blJlZnJlc2goKSB7XG4gICAgdGhpcy5yZXNldERhdGEoKVxuICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KClcbiAgfVxuICByZXNldERhdGEoKSB7XG4gICAgdGhpcy5MaXN0ID0gW11cbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBzZXRDbGFzcyhpbmRleCkge1xuICAgICAgd3guc2V0U3RvcmFnZSh7XG4gICAgICAgIGtleTogJ2NsYXNzSW5mbycsXG4gICAgICAgIGRhdGE6IHRoaXMubGlzdFtpbmRleF0uY2xhc3MsXG4gICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgdGhpcy5jbGFzc0luZm8gPSB0aGlzLmxpc3RbaW5kZXhdLmNsYXNzXG4gICAgICAgICAgd3guc3dpdGNoVGFiKHt1cmw6ICd6b25lJ30pXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuICBvblNob3coKSB7XG4gICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmNsYXNzSGFzQ2hhbmdlKSB7XG4gICAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxuICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKVxuICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuY2xhc3NIYXNDaGFuZ2UgPSBmYWxzZVxuICAgIH1cbiAgfVxuICBvbkxvYWQocGFyYW1zKSB7XG4gICAgdGhpcy5tZW1iZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nKVxuICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXG4gICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckRhdGEgPSB0aGlzLm1lbWJlckluZm9cbiAgICB0aGlzLm5hbWUgPSBwYXJhbXMubmFtZVxuICAgIHRoaXMuY2xhc3NJZCA9IHBhcmFtcy5jbGFzc0lkXG4gICAgdGhpcy5rZXkgPSBwYXJhbXMua2V5XG4gICAgaWYgKHRoaXMua2V5ICYmICF0aGlzLm1lbWJlckluZm8ubWVtYmVyX2lkKSB7XG4gICAgICAvLyDlpoLmnpzmmK/ku47liIbkuqvpk77mjqXov5vlhaXkuJTmsqHmnInms6jlhozvvIzlhYjotbDms6jlhozmtYHnqItcbiAgICAgIHd4LnJlZGlyZWN0VG8oe1xuICAgICAgICB1cmw6IGBsb2dpbj9rZXk9JHt0aGlzLmtleX1jbGFzc0lkPSR7dGhpcy5jbGFzc0lkfSZuYW1lPSR7dGhpcy5uYW1lfWBcbiAgICAgIH0pXG4gICAgfSBlbHNlIGlmICh0aGlzLmtleSAmJiB0aGlzLm1lbWJlckluZm8ubWVtYmVyX2lkKSB7XG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiBgam9pbkNsYXNzP2NsYXNzSWQ9JHt0aGlzLmNsYXNzSWR9Jm5hbWU9JHt0aGlzLm5hbWV9JmtleT0ke3RoaXMua2V5fWBcbiAgICAgIH0pXG4gICAgfVxuICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KClcbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbn1cbiJdfQ==