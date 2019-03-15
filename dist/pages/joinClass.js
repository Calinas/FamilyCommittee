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
      this.isShare = options.is_share;
      this.classId = options.classId;
      this.name = options.name;
      this.key = options.key;
      this.memberInfo = wx.getStorageSync('memberInfo');
      this.$apply();
      if (this.isShare) {
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
          console.log(_this3.classId, _this3.list);
          resolve((0, _common.checkHasJoinClass)(_this3.classId, _this3.list));
        });
      });
    }
  }]);

  return JoinClass;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(JoinClass , 'pages/joinClass'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvaW5DbGFzcy5qcyJdLCJuYW1lcyI6WyJKb2luQ2xhc3MiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJjbGFzc0lkIiwia2V5IiwiY3JlYXRlQ2xhc3NJbmZvIiwibmFtZSIsImlzU2hhcmUiLCJsaXN0IiwibWV0aG9kcyIsImJhY2siLCJ3eCIsInN3aXRjaFRhYiIsInVybCIsImJpbmRJbnB1dCIsImUiLCJjdXJyZW50VGFyZ2V0IiwiaWQiLCJkZXRhaWwiLCJ2YWx1ZSIsIiRhcHBseSIsImpvaW5Ob3ciLCJjbGFzc19pZCIsImpvaW5fa2V5IiwidGhlbiIsInJlcyIsInN1Y2Nlc3MiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImNsYXNzSGFzQ2hhbmdlIiwic2V0U3RvcmFnZSIsImNsYXNzIiwic2V0VGltZW91dCIsIndlcHkiLCJuYXZpZ2F0ZVRvIiwib3B0aW9ucyIsImlzX3NoYXJlIiwiZ2V0U3RvcmFnZVN5bmMiLCJtZW1iZXJfaWQiLCJyZWRpcmVjdFRvIiwiZ2V0Q2xhc3NMaXN0SW5mbyIsIlByb21pc2UiLCJjb25zb2xlIiwibG9nIiwicmVzb2x2ZSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7SUFDcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxrQkFBWSxFQURQO0FBRUxDLGlCQUFXLEVBRk47QUFHTEMsZUFBUyxDQUFDLENBSEw7QUFJTEMsV0FBSyxFQUpBO0FBS0xDLHVCQUFpQixFQUxaO0FBTUxDLFlBQU0sRUFORDtBQU9MQyxlQUFTLEVBUEo7QUFRTEMsWUFBTTtBQVJELEssUUE0Q1BDLE8sR0FBVTtBQUNSQyxVQURRLGtCQUNEO0FBQ0xDLFdBQUdDLFNBQUgsQ0FBYSxFQUFFQyxLQUFLLE1BQVAsRUFBYjtBQUNELE9BSE87QUFJUkMsZUFKUSxxQkFJRUMsQ0FKRixFQUlLO0FBQ1gsYUFBS0EsRUFBRUMsYUFBRixDQUFnQkMsRUFBckIsSUFBMkJGLEVBQUVHLE1BQUYsQ0FBU0MsS0FBcEM7QUFDQSxhQUFLQyxNQUFMO0FBQ0QsT0FQTztBQVFSQyxhQVJRLHFCQVFFO0FBQUE7O0FBQ1IscUNBQVU7QUFDUkMsb0JBQVUsS0FBS25CLE9BRFA7QUFFUm9CLG9CQUFVLEtBQUtuQjtBQUZQLFNBQVYsRUFHR29CLElBSEgsQ0FHUSxlQUFPO0FBQ2IsY0FBSUMsSUFBSXpCLElBQUosQ0FBUzBCLE9BQWIsRUFBc0I7QUFDcEIsaUNBQVEsUUFBUjtBQUNBLG1CQUFLQyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JDLGNBQXhCLEdBQXlDLElBQXpDO0FBQ0FsQixlQUFHbUIsVUFBSCxDQUFjO0FBQ1oxQixtQkFBSyxXQURPO0FBRVpKLG9CQUFNeUIsSUFBSXpCLElBQUosQ0FBUytCO0FBRkgsYUFBZDtBQUlBQyx1QkFBVyxZQUFNO0FBQ2ZDLDZCQUFLQyxVQUFMLENBQWdCLEVBQUNyQiw4QkFBNEIsT0FBS1YsT0FBakMsdUJBQTBELE9BQUtDLEdBQWhFLEVBQWhCO0FBQ0QsYUFGRCxFQUVHLElBRkg7QUFHRDtBQUNGLFNBZkQ7QUFnQkQ7QUF6Qk8sSzs7Ozs7MkJBbENIK0IsTyxFQUFTO0FBQ2QsV0FBSzVCLE9BQUwsR0FBZTRCLFFBQVFDLFFBQXZCO0FBQ0EsV0FBS2pDLE9BQUwsR0FBZWdDLFFBQVFoQyxPQUF2QjtBQUNBLFdBQUtHLElBQUwsR0FBWTZCLFFBQVE3QixJQUFwQjtBQUNBLFdBQUtGLEdBQUwsR0FBVytCLFFBQVEvQixHQUFuQjtBQUNBLFdBQUtILFVBQUwsR0FBa0JVLEdBQUcwQixjQUFILENBQWtCLFlBQWxCLENBQWxCO0FBQ0EsV0FBS2pCLE1BQUw7QUFDQSxVQUFJLEtBQUtiLE9BQVQsRUFBa0I7QUFDaEIsWUFBSSxDQUFDLEtBQUtOLFVBQUwsQ0FBZ0JxQyxTQUFyQixFQUFnQztBQUFFO0FBQ2hDM0IsYUFBRzRCLFVBQUgsQ0FBYztBQUNaMUIsb0NBQXNCLEtBQUtWLE9BQTNCLGNBQTJDLEtBQUtHLElBQWhELGFBQTRELEtBQUtGO0FBRHJELFdBQWQ7QUFHRCxTQUpELE1BSU87QUFBRTtBQUNQLGVBQUtvQyxnQkFBTCxHQUF3QmhCLElBQXhCLENBQTZCLGVBQU87QUFDbEMsZ0JBQUlDLEdBQUosRUFBUztBQUFFO0FBQ1QsbUNBQVEsbUJBQVI7QUFDQU8seUJBQVcsWUFBTTtBQUNmckIsbUJBQUdDLFNBQUgsQ0FBYSxFQUFDQyxLQUFLLE1BQU4sRUFBYjtBQUNELGVBRkQsRUFFRyxJQUZIO0FBR0Q7QUFDRixXQVBEO0FBUUQ7QUFDRjtBQUNGOzs7dUNBQ2tCO0FBQUE7O0FBQ2pCLGFBQU8sSUFBSTRCLE9BQUosQ0FBWSxtQkFBVztBQUM1QiwwQ0FBZWpCLElBQWYsQ0FBb0IsZUFBTztBQUN6QixpQkFBS2hCLElBQUwsR0FBWWlCLElBQUl6QixJQUFKLENBQVNRLElBQXJCO0FBQ0EsaUJBQUtZLE1BQUw7QUFDQXNCLGtCQUFRQyxHQUFSLENBQVksT0FBS3hDLE9BQWpCLEVBQTBCLE9BQUtLLElBQS9CO0FBQ0FvQyxrQkFBUSwrQkFBa0IsT0FBS3pDLE9BQXZCLEVBQWdDLE9BQUtLLElBQXJDLENBQVI7QUFDRCxTQUxEO0FBTUQsT0FQTSxDQUFQO0FBUUQ7Ozs7RUEvQ29DeUIsZUFBS1ksSTs7a0JBQXZCaEQsUyIsImZpbGUiOiJqb2luQ2xhc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgeyBqb2luQ2xhc3MsIGdldENsYXNzTGlzdCB9IGZyb20gJy4uL2FwaS9jcmVhdGVDbGFzcydcbmltcG9ydCB7IHNob3dNc2csIGNoZWNrSGFzSm9pbkNsYXNzIH0gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSm9pbkNsYXNzIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnlLPor7fliqDlhaXnj63nuqcnXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBtZW1iZXJJbmZvOiB7fSxcbiAgICBjbGFzc0luZm86IHt9LFxuICAgIGNsYXNzSWQ6IC0xLFxuICAgIGtleTogJycsXG4gICAgY3JlYXRlQ2xhc3NJbmZvOiB7fSxcbiAgICBuYW1lOiAnJyxcbiAgICBpc1NoYXJlOiAnJyxcbiAgICBsaXN0OiBbXVxuICB9XG4gIG9uTG9hZChvcHRpb25zKSB7XG4gICAgdGhpcy5pc1NoYXJlID0gb3B0aW9ucy5pc19zaGFyZVxuICAgIHRoaXMuY2xhc3NJZCA9IG9wdGlvbnMuY2xhc3NJZFxuICAgIHRoaXMubmFtZSA9IG9wdGlvbnMubmFtZVxuICAgIHRoaXMua2V5ID0gb3B0aW9ucy5rZXlcbiAgICB0aGlzLm1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXG4gICAgdGhpcy4kYXBwbHkoKVxuICAgIGlmICh0aGlzLmlzU2hhcmUpIHtcbiAgICAgIGlmICghdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCkgeyAvLyDlpoLmnpzmmK/ku47liIbkuqvpk77mjqXov5vlhaXkuJTmsqHmnInms6jlhozvvIzlhYjotbDms6jlhozmtYHnqItcbiAgICAgICAgd3gucmVkaXJlY3RUbyh7XG4gICAgICAgICAgdXJsOiBgbG9naW4/Y2xhc3NJZD0ke3RoaXMuY2xhc3NJZH0mbmFtZT0ke3RoaXMubmFtZX0ma2V5PSR7dGhpcy5rZXl9YFxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHsgLy8g5aaC5p6c5bey57uP5rOo5YaM5LqG77yM5Yik5pat5piv5ZCm5bey57uP5Yqg5YWl6L+H5LqGXG4gICAgICAgIHRoaXMuZ2V0Q2xhc3NMaXN0SW5mbygpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICBpZiAocmVzKSB7IC8vIOWmguaenOW3sue7j+WKoOWFpeePree6p++8jOmCo+S5iOiHquWKqOi3s+i9rOWIsOmmlumhtVxuICAgICAgICAgICAgc2hvd01zZygn5oKo5bey57uP5Yqg5YWl6K+l54+t57qn77yM5bCG6Ieq5Yqo6Lez6L2s5Yiw6aaW6aG1JylcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICB3eC5zd2l0Y2hUYWIoe3VybDogJ3pvbmUnfSlcbiAgICAgICAgICAgIH0sIDIwMDApXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBnZXRDbGFzc0xpc3RJbmZvKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGdldENsYXNzTGlzdCgpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgdGhpcy5saXN0ID0gcmVzLmRhdGEubGlzdFxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2xhc3NJZCwgdGhpcy5saXN0KVxuICAgICAgICByZXNvbHZlKGNoZWNrSGFzSm9pbkNsYXNzKHRoaXMuY2xhc3NJZCwgdGhpcy5saXN0KSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIGJhY2soKSB7XG4gICAgICB3eC5zd2l0Y2hUYWIoeyB1cmw6ICd6b25lJyB9KVxuICAgIH0sXG4gICAgYmluZElucHV0KGUpIHtcbiAgICAgIHRoaXNbZS5jdXJyZW50VGFyZ2V0LmlkXSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBqb2luTm93KCkge1xuICAgICAgam9pbkNsYXNzKHtcbiAgICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJZCxcbiAgICAgICAgam9pbl9rZXk6IHRoaXMua2V5XG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgc2hvd01zZygn5oiQ5Yqf5Yqg5YWl54+t57qnJylcbiAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5jbGFzc0hhc0NoYW5nZSA9IHRydWVcbiAgICAgICAgICB3eC5zZXRTdG9yYWdlKHtcbiAgICAgICAgICAgIGtleTogJ2NsYXNzSW5mbycsXG4gICAgICAgICAgICBkYXRhOiByZXMuZGF0YS5jbGFzc1xuICAgICAgICAgIH0pXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe3VybDogYGJpbmRSZWxhdGlvbnNoaXA/aWQ9JHt0aGlzLmNsYXNzSWR9JnR5cGU9am9pbiZrZXk9JHt0aGlzLmtleX1gfSlcbiAgICAgICAgICB9LCAyMDAwKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxufVxuIl19