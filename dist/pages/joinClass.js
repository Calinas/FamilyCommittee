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
          resolve((0, _common.checkHasJoinClass)(_this3.classId, _this3.list));
        });
      });
    }
  }]);

  return JoinClass;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(JoinClass , 'pages/joinClass'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvaW5DbGFzcy5qcyJdLCJuYW1lcyI6WyJKb2luQ2xhc3MiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJjbGFzc0lkIiwia2V5IiwiY3JlYXRlQ2xhc3NJbmZvIiwibmFtZSIsImlzU2hhcmUiLCJsaXN0IiwibWV0aG9kcyIsImJhY2siLCJ3eCIsInN3aXRjaFRhYiIsInVybCIsImJpbmRJbnB1dCIsImUiLCJjdXJyZW50VGFyZ2V0IiwiaWQiLCJkZXRhaWwiLCJ2YWx1ZSIsIiRhcHBseSIsImpvaW5Ob3ciLCJjbGFzc19pZCIsImpvaW5fa2V5IiwidGhlbiIsInJlcyIsInN1Y2Nlc3MiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImNsYXNzSGFzQ2hhbmdlIiwic2V0U3RvcmFnZSIsImNsYXNzIiwic2V0VGltZW91dCIsIndlcHkiLCJuYXZpZ2F0ZVRvIiwib3B0aW9ucyIsImlzX3NoYXJlIiwiZ2V0U3RvcmFnZVN5bmMiLCJtZW1iZXJfaWQiLCJyZWRpcmVjdFRvIiwiZ2V0Q2xhc3NMaXN0SW5mbyIsIlByb21pc2UiLCJyZXNvbHZlIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQUNxQkEsUzs7Ozs7Ozs7Ozs7Ozs7NExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLGtCQUFZLEVBRFA7QUFFTEMsaUJBQVcsRUFGTjtBQUdMQyxlQUFTLENBQUMsQ0FITDtBQUlMQyxXQUFLLEVBSkE7QUFLTEMsdUJBQWlCLEVBTFo7QUFNTEMsWUFBTSxFQU5EO0FBT0xDLGVBQVMsRUFQSjtBQVFMQyxZQUFNO0FBUkQsSyxRQTBDUEMsTyxHQUFVO0FBQ1JDLFVBRFEsa0JBQ0Q7QUFDTEMsV0FBR0MsU0FBSCxDQUFhLEVBQUVDLEtBQUssTUFBUCxFQUFiO0FBQ0QsT0FITztBQUlSQyxlQUpRLHFCQUlFQyxDQUpGLEVBSUs7QUFDWCxhQUFLQSxFQUFFQyxhQUFGLENBQWdCQyxFQUFyQixJQUEyQkYsRUFBRUcsTUFBRixDQUFTQyxLQUFwQztBQUNBLGFBQUtDLE1BQUw7QUFDRCxPQVBPO0FBUVJDLGFBUlEscUJBUUU7QUFBQTs7QUFDUixxQ0FBVTtBQUNSQyxvQkFBVSxLQUFLbkIsT0FEUDtBQUVSb0Isb0JBQVUsS0FBS25CO0FBRlAsU0FBVixFQUdHb0IsSUFISCxDQUdRLGVBQU87QUFDYixjQUFJQyxJQUFJekIsSUFBSixDQUFTMEIsT0FBYixFQUFzQjtBQUNwQixpQ0FBUSxRQUFSO0FBQ0EsbUJBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkMsY0FBeEIsR0FBeUMsSUFBekM7QUFDQWxCLGVBQUdtQixVQUFILENBQWM7QUFDWjFCLG1CQUFLLFdBRE87QUFFWkosb0JBQU15QixJQUFJekIsSUFBSixDQUFTK0I7QUFGSCxhQUFkO0FBSUFDLHVCQUFXLFlBQU07QUFDZkMsNkJBQUtDLFVBQUwsQ0FBZ0IsRUFBQ3JCLDhCQUE0QixPQUFLVixPQUFqQyx1QkFBMEQsT0FBS0MsR0FBaEUsRUFBaEI7QUFDRCxhQUZELEVBRUcsSUFGSDtBQUdEO0FBQ0YsU0FmRDtBQWdCRDtBQXpCTyxLOzs7OzsyQkFoQ0grQixPLEVBQVM7QUFDZCxXQUFLNUIsT0FBTCxHQUFlNEIsUUFBUUMsUUFBdkI7QUFDQSxXQUFLakMsT0FBTCxHQUFlZ0MsUUFBUWhDLE9BQXZCO0FBQ0EsV0FBS0csSUFBTCxHQUFZNkIsUUFBUTdCLElBQXBCO0FBQ0EsV0FBS0YsR0FBTCxHQUFXK0IsUUFBUS9CLEdBQW5CO0FBQ0EsV0FBS0gsVUFBTCxHQUFrQlUsR0FBRzBCLGNBQUgsQ0FBa0IsWUFBbEIsQ0FBbEI7QUFDQSxXQUFLakIsTUFBTDtBQUNBLFVBQUksS0FBS2IsT0FBVCxFQUFrQjtBQUNoQixZQUFJLENBQUMsS0FBS04sVUFBTCxDQUFnQnFDLFNBQXJCLEVBQWdDO0FBQUU7QUFDaEMzQixhQUFHNEIsVUFBSCxDQUFjO0FBQ1oxQixvQ0FBc0IsS0FBS1YsT0FBM0IsY0FBMkMsS0FBS0csSUFBaEQsYUFBNEQsS0FBS0Y7QUFEckQsV0FBZDtBQUdELFNBSkQsTUFJTztBQUFFO0FBQ1AsZUFBS29DLGdCQUFMLEdBQXdCaEIsSUFBeEIsQ0FBNkIsZUFBTztBQUNsQyxnQkFBSUMsR0FBSixFQUFTO0FBQUU7QUFDVCxtQ0FBUSxtQkFBUjtBQUNBTyx5QkFBVyxZQUFNO0FBQ2ZyQixtQkFBR0MsU0FBSCxDQUFhLEVBQUNDLEtBQUssTUFBTixFQUFiO0FBQ0QsZUFGRCxFQUVHLElBRkg7QUFHRDtBQUNGLFdBUEQ7QUFRRDtBQUNGO0FBQ0Y7Ozt1Q0FDa0I7QUFBQTs7QUFDakIsYUFBTyxJQUFJNEIsT0FBSixDQUFZLG1CQUFXO0FBQzVCLDBDQUFlakIsSUFBZixDQUFvQixlQUFPO0FBQ3pCLGlCQUFLaEIsSUFBTCxHQUFZaUIsSUFBSXpCLElBQUosQ0FBU1EsSUFBckI7QUFDQWtDLGtCQUFRLCtCQUFrQixPQUFLdkMsT0FBdkIsRUFBZ0MsT0FBS0ssSUFBckMsQ0FBUjtBQUNELFNBSEQ7QUFJRCxPQUxNLENBQVA7QUFNRDs7OztFQTdDb0N5QixlQUFLVSxJOztrQkFBdkI5QyxTIiwiZmlsZSI6ImpvaW5DbGFzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7IGpvaW5DbGFzcywgZ2V0Q2xhc3NMaXN0IH0gZnJvbSAnLi4vYXBpL2NyZWF0ZUNsYXNzJ1xuaW1wb3J0IHsgc2hvd01zZywgY2hlY2tIYXNKb2luQ2xhc3MgfSBmcm9tICcuLi91dGlscy9jb21tb24nXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKb2luQ2xhc3MgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+eUs+ivt+WKoOWFpeePree6pydcbiAgfVxuICBkYXRhID0ge1xuICAgIG1lbWJlckluZm86IHt9LFxuICAgIGNsYXNzSW5mbzoge30sXG4gICAgY2xhc3NJZDogLTEsXG4gICAga2V5OiAnJyxcbiAgICBjcmVhdGVDbGFzc0luZm86IHt9LFxuICAgIG5hbWU6ICcnLFxuICAgIGlzU2hhcmU6ICcnLFxuICAgIGxpc3Q6IFtdXG4gIH1cbiAgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICB0aGlzLmlzU2hhcmUgPSBvcHRpb25zLmlzX3NoYXJlXG4gICAgdGhpcy5jbGFzc0lkID0gb3B0aW9ucy5jbGFzc0lkXG4gICAgdGhpcy5uYW1lID0gb3B0aW9ucy5uYW1lXG4gICAgdGhpcy5rZXkgPSBvcHRpb25zLmtleVxuICAgIHRoaXMubWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcbiAgICB0aGlzLiRhcHBseSgpXG4gICAgaWYgKHRoaXMuaXNTaGFyZSkge1xuICAgICAgaWYgKCF0aGlzLm1lbWJlckluZm8ubWVtYmVyX2lkKSB7IC8vIOWmguaenOaYr+S7juWIhuS6q+mTvuaOpei/m+WFpeS4lOayoeacieazqOWGjO+8jOWFiOi1sOazqOWGjOa1geeoi1xuICAgICAgICB3eC5yZWRpcmVjdFRvKHtcbiAgICAgICAgICB1cmw6IGBsb2dpbj9jbGFzc0lkPSR7dGhpcy5jbGFzc0lkfSZuYW1lPSR7dGhpcy5uYW1lfSZrZXk9JHt0aGlzLmtleX1gXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2UgeyAvLyDlpoLmnpzlt7Lnu4/ms6jlhozkuobvvIzliKTmlq3mmK/lkKblt7Lnu4/liqDlhaXov4fkuoZcbiAgICAgICAgdGhpcy5nZXRDbGFzc0xpc3RJbmZvKCkudGhlbihyZXMgPT4ge1xuICAgICAgICAgIGlmIChyZXMpIHsgLy8g5aaC5p6c5bey57uP5Yqg5YWl54+t57qn77yM6YKj5LmI6Ieq5Yqo6Lez6L2s5Yiw6aaW6aG1XG4gICAgICAgICAgICBzaG93TXNnKCfmgqjlt7Lnu4/liqDlhaXor6Xnj63nuqfvvIzlsIboh6rliqjot7PovazliLDpppbpobUnKVxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIHd4LnN3aXRjaFRhYih7dXJsOiAnem9uZSd9KVxuICAgICAgICAgICAgfSwgMjAwMClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9XG4gIGdldENsYXNzTGlzdEluZm8oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgZ2V0Q2xhc3NMaXN0KCkudGhlbihyZXMgPT4ge1xuICAgICAgICB0aGlzLmxpc3QgPSByZXMuZGF0YS5saXN0XG4gICAgICAgIHJlc29sdmUoY2hlY2tIYXNKb2luQ2xhc3ModGhpcy5jbGFzc0lkLCB0aGlzLmxpc3QpKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgYmFjaygpIHtcbiAgICAgIHd4LnN3aXRjaFRhYih7IHVybDogJ3pvbmUnIH0pXG4gICAgfSxcbiAgICBiaW5kSW5wdXQoZSkge1xuICAgICAgdGhpc1tlLmN1cnJlbnRUYXJnZXQuaWRdID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGpvaW5Ob3coKSB7XG4gICAgICBqb2luQ2xhc3Moe1xuICAgICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0lkLFxuICAgICAgICBqb2luX2tleTogdGhpcy5rZXlcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICBzaG93TXNnKCfmiJDlip/liqDlhaXnj63nuqcnKVxuICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmNsYXNzSGFzQ2hhbmdlID0gdHJ1ZVxuICAgICAgICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAgICAgICAga2V5OiAnY2xhc3NJbmZvJyxcbiAgICAgICAgICAgIGRhdGE6IHJlcy5kYXRhLmNsYXNzXG4gICAgICAgICAgfSlcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOiBgYmluZFJlbGF0aW9uc2hpcD9pZD0ke3RoaXMuY2xhc3NJZH0mdHlwZT1qb2luJmtleT0ke3RoaXMua2V5fWB9KVxuICAgICAgICAgIH0sIDIwMDApXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG4iXX0=