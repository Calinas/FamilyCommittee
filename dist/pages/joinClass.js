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
          if (data.success || data.error_code === '100506') {
            data.success && (0, _common.showMsg)('成功加入班级');
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvaW5DbGFzcy5qcyJdLCJuYW1lcyI6WyJKb2luQ2xhc3MiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJjbGFzc0lkIiwia2V5IiwiY3JlYXRlQ2xhc3NJbmZvIiwibmFtZSIsImlzU2hhcmUiLCJsaXN0IiwibWV0aG9kcyIsImJhY2siLCJ3eCIsInN3aXRjaFRhYiIsInVybCIsImJpbmRJbnB1dCIsImUiLCJjdXJyZW50VGFyZ2V0IiwiaWQiLCJkZXRhaWwiLCJ2YWx1ZSIsIiRhcHBseSIsImpvaW5Ob3ciLCJjbGFzc19pZCIsImpvaW5fa2V5IiwidGhlbiIsInJlcyIsInN1Y2Nlc3MiLCJlcnJvcl9jb2RlIiwic2V0U3RvcmFnZSIsImNsYXNzIiwic2V0VGltZW91dCIsIndlcHkiLCJuYXZpZ2F0ZVRvIiwib3B0aW9ucyIsImdldFN0b3JhZ2VTeW5jIiwibWVtYmVyX2lkIiwicmVkaXJlY3RUbyIsImdldENsYXNzTGlzdEluZm8iLCJQcm9taXNlIiwicmVzb2x2ZSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7SUFDcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxrQkFBWSxFQURQO0FBRUxDLGlCQUFXLEVBRk47QUFHTEMsZUFBUyxDQUFDLENBSEw7QUFJTEMsV0FBSyxFQUpBO0FBS0xDLHVCQUFpQixFQUxaO0FBTUxDLFlBQU0sRUFORDtBQU9MQyxlQUFTLEVBUEo7QUFRTEMsWUFBTTtBQVJELEssUUEwQ1BDLE8sR0FBVTtBQUNSQyxVQURRLGtCQUNEO0FBQ0xDLFdBQUdDLFNBQUgsQ0FBYSxFQUFFQyxLQUFLLE1BQVAsRUFBYjtBQUNELE9BSE87QUFJUkMsZUFKUSxxQkFJRUMsQ0FKRixFQUlLO0FBQ1gsYUFBS0EsRUFBRUMsYUFBRixDQUFnQkMsRUFBckIsSUFBMkJGLEVBQUVHLE1BQUYsQ0FBU0MsS0FBcEM7QUFDQSxhQUFLQyxNQUFMO0FBQ0QsT0FQTztBQVFSQyxhQVJRLHFCQVFFO0FBQUE7O0FBQ1IscUNBQVU7QUFDUkMsb0JBQVUsS0FBS25CLE9BRFA7QUFFUm9CLG9CQUFVLEtBQUtuQjtBQUZQLFNBQVYsRUFHR29CLElBSEgsQ0FHUSxlQUFPO0FBQ2IsY0FBSXhCLE9BQU95QixJQUFJekIsSUFBZjtBQUNBLGNBQUlBLEtBQUswQixPQUFMLElBQWdCMUIsS0FBSzJCLFVBQUwsS0FBb0IsUUFBeEMsRUFBa0Q7QUFDaEQzQixpQkFBSzBCLE9BQUwsSUFBZ0IscUJBQVEsUUFBUixDQUFoQjtBQUNBZixlQUFHaUIsVUFBSCxDQUFjO0FBQ1p4QixtQkFBSyxXQURPO0FBRVpKLG9CQUFNeUIsSUFBSXpCLElBQUosQ0FBUzZCO0FBRkgsYUFBZDtBQUlBQyx1QkFBVyxZQUFNO0FBQ2ZDLDZCQUFLQyxVQUFMLENBQWdCLEVBQUNuQiw4QkFBNEIsT0FBS1YsT0FBakMsdUJBQTBELE9BQUtDLEdBQWhFLEVBQWhCO0FBQ0QsYUFGRCxFQUVHLElBRkg7QUFHRDtBQUNGLFNBZkQ7QUFnQkQ7QUF6Qk8sSzs7Ozs7MkJBaENINkIsTyxFQUFTO0FBQ2QsV0FBSzlCLE9BQUwsR0FBZThCLFFBQVE5QixPQUF2QjtBQUNBLFdBQUtHLElBQUwsR0FBWTJCLFFBQVEzQixJQUFwQjtBQUNBLFdBQUtGLEdBQUwsR0FBVzZCLFFBQVE3QixHQUFuQixDQUhjLENBR1c7QUFDekIsV0FBS0gsVUFBTCxHQUFrQlUsR0FBR3VCLGNBQUgsQ0FBa0IsWUFBbEIsQ0FBbEI7QUFDQSxXQUFLZCxNQUFMO0FBQ0EsVUFBSSxLQUFLaEIsR0FBVCxFQUFjO0FBQ1osWUFBSSxDQUFDLEtBQUtILFVBQUwsQ0FBZ0JrQyxTQUFyQixFQUFnQztBQUFFO0FBQ2hDeEIsYUFBR3lCLFVBQUgsQ0FBYztBQUNadkIsb0NBQXNCLEtBQUtWLE9BQTNCLGNBQTJDLEtBQUtHLElBQWhELGFBQTRELEtBQUtGO0FBRHJELFdBQWQ7QUFHRCxTQUpELE1BSU87QUFBRTtBQUNQLGVBQUtpQyxnQkFBTCxHQUF3QmIsSUFBeEIsQ0FBNkIsZUFBTztBQUNsQyxnQkFBSUMsR0FBSixFQUFTO0FBQUU7QUFDVCxtQ0FBUSxtQkFBUjtBQUNBSyx5QkFBVyxZQUFNO0FBQ2ZuQixtQkFBR0MsU0FBSCxDQUFhLEVBQUNDLEtBQUssTUFBTixFQUFiO0FBQ0QsZUFGRCxFQUVHLElBRkg7QUFHRDtBQUNGLFdBUEQ7QUFRRDtBQUNGO0FBQ0Y7Ozt1Q0FDa0I7QUFBQTs7QUFDakIsYUFBTyxJQUFJeUIsT0FBSixDQUFZLG1CQUFXO0FBQzVCLDBDQUFlZCxJQUFmLENBQW9CLGVBQU87QUFDekIsaUJBQUtoQixJQUFMLEdBQVlpQixJQUFJekIsSUFBSixDQUFTUSxJQUFyQjtBQUNBLGlCQUFLWSxNQUFMO0FBQ0FtQixrQkFBUSwrQkFBa0IsT0FBS3BDLE9BQXZCLEVBQWdDLE9BQUtLLElBQXJDLENBQVI7QUFDRCxTQUpEO0FBS0QsT0FOTSxDQUFQO0FBT0Q7Ozs7RUE3Q29DdUIsZUFBS1MsSTs7a0JBQXZCM0MsUyIsImZpbGUiOiJqb2luQ2xhc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgeyBqb2luQ2xhc3MsIGdldENsYXNzTGlzdCB9IGZyb20gJy4uL2FwaS9jcmVhdGVDbGFzcydcbmltcG9ydCB7IHNob3dNc2csIGNoZWNrSGFzSm9pbkNsYXNzIH0gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSm9pbkNsYXNzIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnlLPor7fliqDlhaXnj63nuqcnXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBtZW1iZXJJbmZvOiB7fSxcbiAgICBjbGFzc0luZm86IHt9LFxuICAgIGNsYXNzSWQ6IC0xLFxuICAgIGtleTogJycsXG4gICAgY3JlYXRlQ2xhc3NJbmZvOiB7fSxcbiAgICBuYW1lOiAnJyxcbiAgICBpc1NoYXJlOiAnJyxcbiAgICBsaXN0OiBbXVxuICB9XG4gIG9uTG9hZChvcHRpb25zKSB7XG4gICAgdGhpcy5jbGFzc0lkID0gb3B0aW9ucy5jbGFzc0lkXG4gICAgdGhpcy5uYW1lID0gb3B0aW9ucy5uYW1lXG4gICAgdGhpcy5rZXkgPSBvcHRpb25zLmtleSAgIC8vIOagueaNrmtleeaYr+WQpuWtmOWcqOadpeWIpOaWreaYr+WIhuS6q+WKoOWFpSDov5jmmK/nm7TmjqXovpPlhaXnj63nuqfliqDlhaVcbiAgICB0aGlzLm1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXG4gICAgdGhpcy4kYXBwbHkoKVxuICAgIGlmICh0aGlzLmtleSkge1xuICAgICAgaWYgKCF0aGlzLm1lbWJlckluZm8ubWVtYmVyX2lkKSB7IC8vIOWmguaenOaYr+S7juWIhuS6q+mTvuaOpei/m+WFpeS4lOayoeacieazqOWGjO+8jOWFiOi1sOazqOWGjOa1geeoi1xuICAgICAgICB3eC5yZWRpcmVjdFRvKHtcbiAgICAgICAgICB1cmw6IGBsb2dpbj9jbGFzc0lkPSR7dGhpcy5jbGFzc0lkfSZuYW1lPSR7dGhpcy5uYW1lfSZrZXk9JHt0aGlzLmtleX1gXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2UgeyAvLyDlpoLmnpzlt7Lnu4/ms6jlhozkuobvvIzliKTmlq3mmK/lkKblt7Lnu4/liqDlhaXov4fkuoZcbiAgICAgICAgdGhpcy5nZXRDbGFzc0xpc3RJbmZvKCkudGhlbihyZXMgPT4ge1xuICAgICAgICAgIGlmIChyZXMpIHsgLy8g5aaC5p6c5bey57uP5Yqg5YWl54+t57qn77yM6YKj5LmI6Ieq5Yqo6Lez6L2s5Yiw6aaW6aG1XG4gICAgICAgICAgICBzaG93TXNnKCfmgqjlt7Lnu4/liqDlhaXor6Xnj63nuqfvvIzlsIboh6rliqjot7PovazliLDpppbpobUnKVxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIHd4LnN3aXRjaFRhYih7dXJsOiAnem9uZSd9KVxuICAgICAgICAgICAgfSwgMjAwMClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9XG4gIGdldENsYXNzTGlzdEluZm8oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgZ2V0Q2xhc3NMaXN0KCkudGhlbihyZXMgPT4ge1xuICAgICAgICB0aGlzLmxpc3QgPSByZXMuZGF0YS5saXN0XG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgcmVzb2x2ZShjaGVja0hhc0pvaW5DbGFzcyh0aGlzLmNsYXNzSWQsIHRoaXMubGlzdCkpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBiYWNrKCkge1xuICAgICAgd3guc3dpdGNoVGFiKHsgdXJsOiAnem9uZScgfSlcbiAgICB9LFxuICAgIGJpbmRJbnB1dChlKSB7XG4gICAgICB0aGlzW2UuY3VycmVudFRhcmdldC5pZF0gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgam9pbk5vdygpIHtcbiAgICAgIGpvaW5DbGFzcyh7XG4gICAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSWQsXG4gICAgICAgIGpvaW5fa2V5OiB0aGlzLmtleVxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhXG4gICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MgfHwgZGF0YS5lcnJvcl9jb2RlID09PSAnMTAwNTA2Jykge1xuICAgICAgICAgIGRhdGEuc3VjY2VzcyAmJiBzaG93TXNnKCfmiJDlip/liqDlhaXnj63nuqcnKVxuICAgICAgICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAgICAgICAga2V5OiAnY2xhc3NJbmZvJyxcbiAgICAgICAgICAgIGRhdGE6IHJlcy5kYXRhLmNsYXNzXG4gICAgICAgICAgfSlcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOiBgYmluZFJlbGF0aW9uc2hpcD9pZD0ke3RoaXMuY2xhc3NJZH0mdHlwZT1qb2luJmtleT0ke3RoaXMua2V5fWB9KVxuICAgICAgICAgIH0sIDIwMDApXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG4iXX0=