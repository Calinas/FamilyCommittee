'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _createClass2 = require('./../api/createClass.js');

var _common = require('./../utils/common.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JoinClass = function (_wepy$page) {
  _inherits(JoinClass, _wepy$page);

  function JoinClass() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, JoinClass);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = JoinClass.__proto__ || Object.getPrototypeOf(JoinClass)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '申请加入班级'
    }, _this.data = {
      memberInfo: {},
      classInfo: {},
      classId: -1,
      key: '',
      createClassInfo: {},
      name: '',
      isShare: '',
      list: []
    }, _this.methods = {
      back: function back() {
        wx.switchTab({ url: 'zone' });
      },
      bindInput: function bindInput(e) {
        this[e.currentTarget.id] = e.detail.value;
        this.$apply();
      },
      joinNow: function joinNow() {
        var _this2 = this;

        (0, _createClass2.joinClass)({
          class_id: this.classId,
          join_key: this.key
        }).then(function (res) {
          var data = res.data;
          var msg = data.success ? '成功加入班级' : res.data.error_msg;
          if (data.success || data.error_code === '100506') {
            (0, _common.showMsg)(msg);
            _this2.$parent.globalData.classHasChange = true;
            wx.setStorage({
              key: 'classInfo',
              data: res.data.class
            });
            setTimeout(function () {
              _wepy2.default.navigateTo({ url: 'bindRelationship?id=' + _this2.classId + '&type=join&key=' + _this2.key });
            }, 2000);
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(JoinClass, [{
    key: 'onLoad',
    value: function onLoad(options) {
      this.classId = options.classId;
      this.name = options.name;
      this.key = options.key; // 根据key是否存在来判断是分享加入 还是直接输入班级加入
      this.memberInfo = wx.getStorageSync('memberInfo');
      this.$apply();
      if (this.key) {
        if (!this.memberInfo.member_id) {
          // 如果是从分享链接进入且没有注册，先走注册流程
          wx.redirectTo({
            url: 'login?classId=' + this.classId + '&name=' + this.name + '&key=' + this.key
          });
        } else {
          // 如果已经注册了，判断是否已经加入过了
          this.getClassListInfo().then(function (res) {
            if (res) {
              // 如果已经加入班级，那么自动跳转到首页
              (0, _common.showMsg)('您已经加入该班级，将自动跳转到首页');
              setTimeout(function () {
                wx.switchTab({ url: 'zone' });
              }, 2000);
            }
          });
        }
      }
    }
  }, {
    key: 'getClassListInfo',
    value: function getClassListInfo() {
      var _this3 = this;

      return new Promise(function (resolve) {
        (0, _createClass2.getClassList)().then(function (res) {
          _this3.list = res.data.list;
          _this3.$apply();
          resolve((0, _common.checkHasJoinClass)(_this3.classId, _this3.list));
        });
      });
    }
  }]);

  return JoinClass;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(JoinClass , 'pages/joinClass'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvaW5DbGFzcy5qcyJdLCJuYW1lcyI6WyJKb2luQ2xhc3MiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJjbGFzc0lkIiwia2V5IiwiY3JlYXRlQ2xhc3NJbmZvIiwibmFtZSIsImlzU2hhcmUiLCJsaXN0IiwibWV0aG9kcyIsImJhY2siLCJ3eCIsInN3aXRjaFRhYiIsInVybCIsImJpbmRJbnB1dCIsImUiLCJjdXJyZW50VGFyZ2V0IiwiaWQiLCJkZXRhaWwiLCJ2YWx1ZSIsIiRhcHBseSIsImpvaW5Ob3ciLCJjbGFzc19pZCIsImpvaW5fa2V5IiwidGhlbiIsInJlcyIsIm1zZyIsInN1Y2Nlc3MiLCJlcnJvcl9tc2ciLCJlcnJvcl9jb2RlIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJjbGFzc0hhc0NoYW5nZSIsInNldFN0b3JhZ2UiLCJjbGFzcyIsInNldFRpbWVvdXQiLCJ3ZXB5IiwibmF2aWdhdGVUbyIsIm9wdGlvbnMiLCJnZXRTdG9yYWdlU3luYyIsIm1lbWJlcl9pZCIsInJlZGlyZWN0VG8iLCJnZXRDbGFzc0xpc3RJbmZvIiwiUHJvbWlzZSIsInJlc29sdmUiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBQ3FCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsa0JBQVksRUFEUDtBQUVMQyxpQkFBVyxFQUZOO0FBR0xDLGVBQVMsQ0FBQyxDQUhMO0FBSUxDLFdBQUssRUFKQTtBQUtMQyx1QkFBaUIsRUFMWjtBQU1MQyxZQUFNLEVBTkQ7QUFPTEMsZUFBUyxFQVBKO0FBUUxDLFlBQU07QUFSRCxLLFFBMENQQyxPLEdBQVU7QUFDUkMsVUFEUSxrQkFDRDtBQUNMQyxXQUFHQyxTQUFILENBQWEsRUFBRUMsS0FBSyxNQUFQLEVBQWI7QUFDRCxPQUhPO0FBSVJDLGVBSlEscUJBSUVDLENBSkYsRUFJSztBQUNYLGFBQUtBLEVBQUVDLGFBQUYsQ0FBZ0JDLEVBQXJCLElBQTJCRixFQUFFRyxNQUFGLENBQVNDLEtBQXBDO0FBQ0EsYUFBS0MsTUFBTDtBQUNELE9BUE87QUFRUkMsYUFSUSxxQkFRRTtBQUFBOztBQUNSLHFDQUFVO0FBQ1JDLG9CQUFVLEtBQUtuQixPQURQO0FBRVJvQixvQkFBVSxLQUFLbkI7QUFGUCxTQUFWLEVBR0dvQixJQUhILENBR1EsZUFBTztBQUNiLGNBQUl4QixPQUFPeUIsSUFBSXpCLElBQWY7QUFDQSxjQUFJMEIsTUFBTTFCLEtBQUsyQixPQUFMLEdBQWUsUUFBZixHQUEwQkYsSUFBSXpCLElBQUosQ0FBUzRCLFNBQTdDO0FBQ0EsY0FBSTVCLEtBQUsyQixPQUFMLElBQWdCM0IsS0FBSzZCLFVBQUwsS0FBb0IsUUFBeEMsRUFBa0Q7QUFDaEQsaUNBQVFILEdBQVI7QUFDQSxtQkFBS0ksT0FBTCxDQUFhQyxVQUFiLENBQXdCQyxjQUF4QixHQUF5QyxJQUF6QztBQUNBckIsZUFBR3NCLFVBQUgsQ0FBYztBQUNaN0IsbUJBQUssV0FETztBQUVaSixvQkFBTXlCLElBQUl6QixJQUFKLENBQVNrQztBQUZILGFBQWQ7QUFJQUMsdUJBQVcsWUFBTTtBQUNmQyw2QkFBS0MsVUFBTCxDQUFnQixFQUFDeEIsOEJBQTRCLE9BQUtWLE9BQWpDLHVCQUEwRCxPQUFLQyxHQUFoRSxFQUFoQjtBQUNELGFBRkQsRUFFRyxJQUZIO0FBR0Q7QUFDRixTQWpCRDtBQWtCRDtBQTNCTyxLOzs7OzsyQkFoQ0hrQyxPLEVBQVM7QUFDZCxXQUFLbkMsT0FBTCxHQUFlbUMsUUFBUW5DLE9BQXZCO0FBQ0EsV0FBS0csSUFBTCxHQUFZZ0MsUUFBUWhDLElBQXBCO0FBQ0EsV0FBS0YsR0FBTCxHQUFXa0MsUUFBUWxDLEdBQW5CLENBSGMsQ0FHVztBQUN6QixXQUFLSCxVQUFMLEdBQWtCVSxHQUFHNEIsY0FBSCxDQUFrQixZQUFsQixDQUFsQjtBQUNBLFdBQUtuQixNQUFMO0FBQ0EsVUFBSSxLQUFLaEIsR0FBVCxFQUFjO0FBQ1osWUFBSSxDQUFDLEtBQUtILFVBQUwsQ0FBZ0J1QyxTQUFyQixFQUFnQztBQUFFO0FBQ2hDN0IsYUFBRzhCLFVBQUgsQ0FBYztBQUNaNUIsb0NBQXNCLEtBQUtWLE9BQTNCLGNBQTJDLEtBQUtHLElBQWhELGFBQTRELEtBQUtGO0FBRHJELFdBQWQ7QUFHRCxTQUpELE1BSU87QUFBRTtBQUNQLGVBQUtzQyxnQkFBTCxHQUF3QmxCLElBQXhCLENBQTZCLGVBQU87QUFDbEMsZ0JBQUlDLEdBQUosRUFBUztBQUFFO0FBQ1QsbUNBQVEsbUJBQVI7QUFDQVUseUJBQVcsWUFBTTtBQUNmeEIsbUJBQUdDLFNBQUgsQ0FBYSxFQUFDQyxLQUFLLE1BQU4sRUFBYjtBQUNELGVBRkQsRUFFRyxJQUZIO0FBR0Q7QUFDRixXQVBEO0FBUUQ7QUFDRjtBQUNGOzs7dUNBQ2tCO0FBQUE7O0FBQ2pCLGFBQU8sSUFBSThCLE9BQUosQ0FBWSxtQkFBVztBQUM1QiwwQ0FBZW5CLElBQWYsQ0FBb0IsZUFBTztBQUN6QixpQkFBS2hCLElBQUwsR0FBWWlCLElBQUl6QixJQUFKLENBQVNRLElBQXJCO0FBQ0EsaUJBQUtZLE1BQUw7QUFDQXdCLGtCQUFRLCtCQUFrQixPQUFLekMsT0FBdkIsRUFBZ0MsT0FBS0ssSUFBckMsQ0FBUjtBQUNELFNBSkQ7QUFLRCxPQU5NLENBQVA7QUFPRDs7OztFQTdDb0M0QixlQUFLUyxJOztrQkFBdkJoRCxTIiwiZmlsZSI6ImpvaW5DbGFzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7IGpvaW5DbGFzcywgZ2V0Q2xhc3NMaXN0IH0gZnJvbSAnLi4vYXBpL2NyZWF0ZUNsYXNzJ1xuaW1wb3J0IHsgc2hvd01zZywgY2hlY2tIYXNKb2luQ2xhc3MgfSBmcm9tICcuLi91dGlscy9jb21tb24nXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKb2luQ2xhc3MgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+eUs+ivt+WKoOWFpeePree6pydcbiAgfVxuICBkYXRhID0ge1xuICAgIG1lbWJlckluZm86IHt9LFxuICAgIGNsYXNzSW5mbzoge30sXG4gICAgY2xhc3NJZDogLTEsXG4gICAga2V5OiAnJyxcbiAgICBjcmVhdGVDbGFzc0luZm86IHt9LFxuICAgIG5hbWU6ICcnLFxuICAgIGlzU2hhcmU6ICcnLFxuICAgIGxpc3Q6IFtdXG4gIH1cbiAgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICB0aGlzLmNsYXNzSWQgPSBvcHRpb25zLmNsYXNzSWRcbiAgICB0aGlzLm5hbWUgPSBvcHRpb25zLm5hbWVcbiAgICB0aGlzLmtleSA9IG9wdGlvbnMua2V5ICAgLy8g5qC55o2ua2V55piv5ZCm5a2Y5Zyo5p2l5Yik5pat5piv5YiG5Lqr5Yqg5YWlIOi/mOaYr+ebtOaOpei+k+WFpeePree6p+WKoOWFpVxuICAgIHRoaXMubWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcbiAgICB0aGlzLiRhcHBseSgpXG4gICAgaWYgKHRoaXMua2V5KSB7XG4gICAgICBpZiAoIXRoaXMubWVtYmVySW5mby5tZW1iZXJfaWQpIHsgLy8g5aaC5p6c5piv5LuO5YiG5Lqr6ZO+5o6l6L+b5YWl5LiU5rKh5pyJ5rOo5YaM77yM5YWI6LWw5rOo5YaM5rWB56iLXG4gICAgICAgIHd4LnJlZGlyZWN0VG8oe1xuICAgICAgICAgIHVybDogYGxvZ2luP2NsYXNzSWQ9JHt0aGlzLmNsYXNzSWR9Jm5hbWU9JHt0aGlzLm5hbWV9JmtleT0ke3RoaXMua2V5fWBcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7IC8vIOWmguaenOW3sue7j+azqOWGjOS6hu+8jOWIpOaWreaYr+WQpuW3sue7j+WKoOWFpei/h+S6hlxuICAgICAgICB0aGlzLmdldENsYXNzTGlzdEluZm8oKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgaWYgKHJlcykgeyAvLyDlpoLmnpzlt7Lnu4/liqDlhaXnj63nuqfvvIzpgqPkuYjoh6rliqjot7PovazliLDpppbpobVcbiAgICAgICAgICAgIHNob3dNc2coJ+aCqOW3sue7j+WKoOWFpeivpeePree6p++8jOWwhuiHquWKqOi3s+i9rOWIsOmmlumhtScpXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgd3guc3dpdGNoVGFiKHt1cmw6ICd6b25lJ30pXG4gICAgICAgICAgICB9LCAyMDAwKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZ2V0Q2xhc3NMaXN0SW5mbygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBnZXRDbGFzc0xpc3QoKS50aGVuKHJlcyA9PiB7XG4gICAgICAgIHRoaXMubGlzdCA9IHJlcy5kYXRhLmxpc3RcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICByZXNvbHZlKGNoZWNrSGFzSm9pbkNsYXNzKHRoaXMuY2xhc3NJZCwgdGhpcy5saXN0KSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIGJhY2soKSB7XG4gICAgICB3eC5zd2l0Y2hUYWIoeyB1cmw6ICd6b25lJyB9KVxuICAgIH0sXG4gICAgYmluZElucHV0KGUpIHtcbiAgICAgIHRoaXNbZS5jdXJyZW50VGFyZ2V0LmlkXSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBqb2luTm93KCkge1xuICAgICAgam9pbkNsYXNzKHtcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJZCxcbiAgICAgICAgam9pbl9rZXk6IHRoaXMua2V5XG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGFcbiAgICAgICAgbGV0IG1zZyA9IGRhdGEuc3VjY2VzcyA/ICfmiJDlip/liqDlhaXnj63nuqcnIDogcmVzLmRhdGEuZXJyb3JfbXNnXG4gICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MgfHwgZGF0YS5lcnJvcl9jb2RlID09PSAnMTAwNTA2Jykge1xuICAgICAgICAgIHNob3dNc2cobXNnKVxuICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmNsYXNzSGFzQ2hhbmdlID0gdHJ1ZVxuICAgICAgICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAgICAgICAga2V5OiAnY2xhc3NJbmZvJyxcbiAgICAgICAgICAgIGRhdGE6IHJlcy5kYXRhLmNsYXNzXG4gICAgICAgICAgfSlcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOiBgYmluZFJlbGF0aW9uc2hpcD9pZD0ke3RoaXMuY2xhc3NJZH0mdHlwZT1qb2luJmtleT0ke3RoaXMua2V5fWB9KVxuICAgICAgICAgIH0sIDIwMDApXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG4iXX0=