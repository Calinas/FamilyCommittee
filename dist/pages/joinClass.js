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
          if (res.data.success) {
            (0, _common.showMsg)('成功加入班级');
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvaW5DbGFzcy5qcyJdLCJuYW1lcyI6WyJKb2luQ2xhc3MiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJjbGFzc0lkIiwia2V5IiwiY3JlYXRlQ2xhc3NJbmZvIiwibmFtZSIsImlzU2hhcmUiLCJsaXN0IiwibWV0aG9kcyIsImJhY2siLCJ3eCIsInN3aXRjaFRhYiIsInVybCIsImJpbmRJbnB1dCIsImUiLCJjdXJyZW50VGFyZ2V0IiwiaWQiLCJkZXRhaWwiLCJ2YWx1ZSIsIiRhcHBseSIsImpvaW5Ob3ciLCJjbGFzc19pZCIsImpvaW5fa2V5IiwidGhlbiIsInJlcyIsInN1Y2Nlc3MiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImNsYXNzSGFzQ2hhbmdlIiwic2V0U3RvcmFnZSIsImNsYXNzIiwic2V0VGltZW91dCIsIndlcHkiLCJuYXZpZ2F0ZVRvIiwib3B0aW9ucyIsImdldFN0b3JhZ2VTeW5jIiwibWVtYmVyX2lkIiwicmVkaXJlY3RUbyIsImdldENsYXNzTGlzdEluZm8iLCJQcm9taXNlIiwicmVzb2x2ZSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7SUFDcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxrQkFBWSxFQURQO0FBRUxDLGlCQUFXLEVBRk47QUFHTEMsZUFBUyxDQUFDLENBSEw7QUFJTEMsV0FBSyxFQUpBO0FBS0xDLHVCQUFpQixFQUxaO0FBTUxDLFlBQU0sRUFORDtBQU9MQyxlQUFTLEVBUEo7QUFRTEMsWUFBTTtBQVJELEssUUEwQ1BDLE8sR0FBVTtBQUNSQyxVQURRLGtCQUNEO0FBQ0xDLFdBQUdDLFNBQUgsQ0FBYSxFQUFFQyxLQUFLLE1BQVAsRUFBYjtBQUNELE9BSE87QUFJUkMsZUFKUSxxQkFJRUMsQ0FKRixFQUlLO0FBQ1gsYUFBS0EsRUFBRUMsYUFBRixDQUFnQkMsRUFBckIsSUFBMkJGLEVBQUVHLE1BQUYsQ0FBU0MsS0FBcEM7QUFDQSxhQUFLQyxNQUFMO0FBQ0QsT0FQTztBQVFSQyxhQVJRLHFCQVFFO0FBQUE7O0FBQ1IscUNBQVU7QUFDUkMsb0JBQVUsS0FBS25CLE9BRFA7QUFFUm9CLG9CQUFVLEtBQUtuQjtBQUZQLFNBQVYsRUFHR29CLElBSEgsQ0FHUSxlQUFPO0FBQ2IsY0FBSUMsSUFBSXpCLElBQUosQ0FBUzBCLE9BQWIsRUFBc0I7QUFDcEIsaUNBQVEsUUFBUjtBQUNBLG1CQUFLQyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JDLGNBQXhCLEdBQXlDLElBQXpDO0FBQ0FsQixlQUFHbUIsVUFBSCxDQUFjO0FBQ1oxQixtQkFBSyxXQURPO0FBRVpKLG9CQUFNeUIsSUFBSXpCLElBQUosQ0FBUytCO0FBRkgsYUFBZDtBQUlBQyx1QkFBVyxZQUFNO0FBQ2ZDLDZCQUFLQyxVQUFMLENBQWdCLEVBQUNyQiw4QkFBNEIsT0FBS1YsT0FBakMsdUJBQTBELE9BQUtDLEdBQWhFLEVBQWhCO0FBQ0QsYUFGRCxFQUVHLElBRkg7QUFHRDtBQUNGLFNBZkQ7QUFnQkQ7QUF6Qk8sSzs7Ozs7MkJBaENIK0IsTyxFQUFTO0FBQ2QsV0FBS2hDLE9BQUwsR0FBZWdDLFFBQVFoQyxPQUF2QjtBQUNBLFdBQUtHLElBQUwsR0FBWTZCLFFBQVE3QixJQUFwQjtBQUNBLFdBQUtGLEdBQUwsR0FBVytCLFFBQVEvQixHQUFuQixDQUhjLENBR1c7QUFDekIsV0FBS0gsVUFBTCxHQUFrQlUsR0FBR3lCLGNBQUgsQ0FBa0IsWUFBbEIsQ0FBbEI7QUFDQSxXQUFLaEIsTUFBTDtBQUNBLFVBQUksS0FBS2hCLEdBQVQsRUFBYztBQUNaLFlBQUksQ0FBQyxLQUFLSCxVQUFMLENBQWdCb0MsU0FBckIsRUFBZ0M7QUFBRTtBQUNoQzFCLGFBQUcyQixVQUFILENBQWM7QUFDWnpCLG9DQUFzQixLQUFLVixPQUEzQixjQUEyQyxLQUFLRyxJQUFoRCxhQUE0RCxLQUFLRjtBQURyRCxXQUFkO0FBR0QsU0FKRCxNQUlPO0FBQUU7QUFDUCxlQUFLbUMsZ0JBQUwsR0FBd0JmLElBQXhCLENBQTZCLGVBQU87QUFDbEMsZ0JBQUlDLEdBQUosRUFBUztBQUFFO0FBQ1QsbUNBQVEsbUJBQVI7QUFDQU8seUJBQVcsWUFBTTtBQUNmckIsbUJBQUdDLFNBQUgsQ0FBYSxFQUFDQyxLQUFLLE1BQU4sRUFBYjtBQUNELGVBRkQsRUFFRyxJQUZIO0FBR0Q7QUFDRixXQVBEO0FBUUQ7QUFDRjtBQUNGOzs7dUNBQ2tCO0FBQUE7O0FBQ2pCLGFBQU8sSUFBSTJCLE9BQUosQ0FBWSxtQkFBVztBQUM1QiwwQ0FBZWhCLElBQWYsQ0FBb0IsZUFBTztBQUN6QixpQkFBS2hCLElBQUwsR0FBWWlCLElBQUl6QixJQUFKLENBQVNRLElBQXJCO0FBQ0EsaUJBQUtZLE1BQUw7QUFDQXFCLGtCQUFRLCtCQUFrQixPQUFLdEMsT0FBdkIsRUFBZ0MsT0FBS0ssSUFBckMsQ0FBUjtBQUNELFNBSkQ7QUFLRCxPQU5NLENBQVA7QUFPRDs7OztFQTdDb0N5QixlQUFLUyxJOztrQkFBdkI3QyxTIiwiZmlsZSI6ImpvaW5DbGFzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgeyBqb2luQ2xhc3MsIGdldENsYXNzTGlzdCB9IGZyb20gJy4uL2FwaS9jcmVhdGVDbGFzcydcclxuaW1wb3J0IHsgc2hvd01zZywgY2hlY2tIYXNKb2luQ2xhc3MgfSBmcm9tICcuLi91dGlscy9jb21tb24nXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpvaW5DbGFzcyBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+eUs+ivt+WKoOWFpeePree6pydcclxuICB9XHJcbiAgZGF0YSA9IHtcclxuICAgIG1lbWJlckluZm86IHt9LFxyXG4gICAgY2xhc3NJbmZvOiB7fSxcclxuICAgIGNsYXNzSWQ6IC0xLFxyXG4gICAga2V5OiAnJyxcclxuICAgIGNyZWF0ZUNsYXNzSW5mbzoge30sXHJcbiAgICBuYW1lOiAnJyxcclxuICAgIGlzU2hhcmU6ICcnLFxyXG4gICAgbGlzdDogW11cclxuICB9XHJcbiAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgIHRoaXMuY2xhc3NJZCA9IG9wdGlvbnMuY2xhc3NJZFxyXG4gICAgdGhpcy5uYW1lID0gb3B0aW9ucy5uYW1lXHJcbiAgICB0aGlzLmtleSA9IG9wdGlvbnMua2V5ICAgLy8g5qC55o2ua2V55piv5ZCm5a2Y5Zyo5p2l5Yik5pat5piv5YiG5Lqr5Yqg5YWlIOi/mOaYr+ebtOaOpei+k+WFpeePree6p+WKoOWFpVxyXG4gICAgdGhpcy5tZW1iZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nKVxyXG4gICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgaWYgKHRoaXMua2V5KSB7XHJcbiAgICAgIGlmICghdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCkgeyAvLyDlpoLmnpzmmK/ku47liIbkuqvpk77mjqXov5vlhaXkuJTmsqHmnInms6jlhozvvIzlhYjotbDms6jlhozmtYHnqItcclxuICAgICAgICB3eC5yZWRpcmVjdFRvKHtcclxuICAgICAgICAgIHVybDogYGxvZ2luP2NsYXNzSWQ9JHt0aGlzLmNsYXNzSWR9Jm5hbWU9JHt0aGlzLm5hbWV9JmtleT0ke3RoaXMua2V5fWBcclxuICAgICAgICB9KVxyXG4gICAgICB9IGVsc2UgeyAvLyDlpoLmnpzlt7Lnu4/ms6jlhozkuobvvIzliKTmlq3mmK/lkKblt7Lnu4/liqDlhaXov4fkuoZcclxuICAgICAgICB0aGlzLmdldENsYXNzTGlzdEluZm8oKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICBpZiAocmVzKSB7IC8vIOWmguaenOW3sue7j+WKoOWFpeePree6p++8jOmCo+S5iOiHquWKqOi3s+i9rOWIsOmmlumhtVxyXG4gICAgICAgICAgICBzaG93TXNnKCfmgqjlt7Lnu4/liqDlhaXor6Xnj63nuqfvvIzlsIboh6rliqjot7PovazliLDpppbpobUnKVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICB3eC5zd2l0Y2hUYWIoe3VybDogJ3pvbmUnfSlcclxuICAgICAgICAgICAgfSwgMjAwMClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldENsYXNzTGlzdEluZm8oKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgIGdldENsYXNzTGlzdCgpLnRoZW4ocmVzID0+IHtcclxuICAgICAgICB0aGlzLmxpc3QgPSByZXMuZGF0YS5saXN0XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIHJlc29sdmUoY2hlY2tIYXNKb2luQ2xhc3ModGhpcy5jbGFzc0lkLCB0aGlzLmxpc3QpKVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGJhY2soKSB7XHJcbiAgICAgIHd4LnN3aXRjaFRhYih7IHVybDogJ3pvbmUnIH0pXHJcbiAgICB9LFxyXG4gICAgYmluZElucHV0KGUpIHtcclxuICAgICAgdGhpc1tlLmN1cnJlbnRUYXJnZXQuaWRdID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSxcclxuICAgIGpvaW5Ob3coKSB7XHJcbiAgICAgIGpvaW5DbGFzcyh7XHJcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJZCxcclxuICAgICAgICBqb2luX2tleTogdGhpcy5rZXlcclxuICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICBzaG93TXNnKCfmiJDlip/liqDlhaXnj63nuqcnKVxyXG4gICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuY2xhc3NIYXNDaGFuZ2UgPSB0cnVlXHJcbiAgICAgICAgICB3eC5zZXRTdG9yYWdlKHtcclxuICAgICAgICAgICAga2V5OiAnY2xhc3NJbmZvJyxcclxuICAgICAgICAgICAgZGF0YTogcmVzLmRhdGEuY2xhc3NcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6IGBiaW5kUmVsYXRpb25zaGlwP2lkPSR7dGhpcy5jbGFzc0lkfSZ0eXBlPWpvaW4ma2V5PSR7dGhpcy5rZXl9YH0pXHJcbiAgICAgICAgICB9LCAyMDAwKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19