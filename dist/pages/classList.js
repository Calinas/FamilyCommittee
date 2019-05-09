'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _wepyRedux = require('./../npm/wepy-redux/lib/index.js');

var _actions = require('./../store/actions/index.js');

var _user = require('./../api/user.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ClassList = (_dec = (0, _wepyRedux.connect)({
  classHasChanged: function classHasChanged(state) {
    return state.zone.classChanged;
  },
  list: function list(state) {
    return state.zone.classList;
  }
}), _dec(_class = function (_wepy$page) {
  _inherits(ClassList, _wepy$page);

  function ClassList() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ClassList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ClassList.__proto__ || Object.getPrototypeOf(ClassList)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '我的班级',
      enablePullDownRefresh: true
    }, _this.data = {
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
            _this2.getMemberInfo();
            (0, _actions.setClassChanged)(true);
            setTimeout(function () {
              wx.switchTab({ url: 'zone' });
            }, 1000);
            _this2.$apply();
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ClassList, [{
    key: 'getMemberInfo',
    value: function getMemberInfo() {
      (0, _user.memberInfo)({
        class_id: this.classInfo.id
      }).then(function (res) {
        var data = res.data.data;
        var classNickname = data.class_nickname;
        var cardInfo = data.member_extend;
        var memberInfo = wx.getStorageSync('memberInfo');
        var info = Object.assign({}, {
          class_nickname: classNickname,
          card_info: cardInfo
        }, memberInfo);
        wx.setStorageSync('memberInfo', info);
      });
    }
  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage(res) {
      return {
        title: this.memberInfo.nickname + '\u9080\u8BF7\u60A8\u52A0\u5165\u5BB6\u59D4\u4F1A\u73ED\u7EA7,\u9A8C\u8BC1\u7801\u662F' + this.classInfo.join_key,
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
      if (this.classHasChanged) {
        this.classInfo = wx.getStorageSync('classInfo');
        // this.getClassList()
        (0, _actions.setClassChanged)(false);
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
      if (this.memberInfo && this.memberInfo.member_id === -1) return; //微信测试用户
      (0, _actions.getClass)();
      this.$apply();
    }
  }]);

  return ClassList;
}(_wepy2.default.page)) || _class);

Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ClassList , 'pages/classList'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzTGlzdC5qcyJdLCJuYW1lcyI6WyJDbGFzc0xpc3QiLCJjbGFzc0hhc0NoYW5nZWQiLCJzdGF0ZSIsInpvbmUiLCJjbGFzc0NoYW5nZWQiLCJsaXN0IiwiY2xhc3NMaXN0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsImRhdGEiLCJtZW1iZXJJbmZvIiwiY2xhc3NJbmZvIiwia2V5IiwibmFtZSIsImNsYXNzSWQiLCJtZXRob2RzIiwic2V0Q2xhc3MiLCJpbmRleCIsInd4Iiwic2V0U3RvcmFnZSIsImNsYXNzIiwic3VjY2VzcyIsImdldE1lbWJlckluZm8iLCJzZXRUaW1lb3V0Iiwic3dpdGNoVGFiIiwidXJsIiwiJGFwcGx5IiwiY2xhc3NfaWQiLCJpZCIsInRoZW4iLCJyZXMiLCJjbGFzc05pY2tuYW1lIiwiY2xhc3Nfbmlja25hbWUiLCJjYXJkSW5mbyIsIm1lbWJlcl9leHRlbmQiLCJnZXRTdG9yYWdlU3luYyIsImluZm8iLCJPYmplY3QiLCJhc3NpZ24iLCJjYXJkX2luZm8iLCJzZXRTdG9yYWdlU3luYyIsInRpdGxlIiwibmlja25hbWUiLCJqb2luX2tleSIsInBhdGgiLCJyZXNldERhdGEiLCJnZXRDbGFzc0xpc3QiLCJMaXN0IiwicGFyYW1zIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJ1c2VyRGF0YSIsIm1lbWJlcl9pZCIsInJlZGlyZWN0VG8iLCJuYXZpZ2F0ZVRvIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQVdxQkEsUyxXQVRwQix3QkFBUTtBQUNQQyxpQkFETywyQkFDU0MsS0FEVCxFQUNnQjtBQUNyQixXQUFPQSxNQUFNQyxJQUFOLENBQVdDLFlBQWxCO0FBQ0QsR0FITTtBQUlQQyxNQUpPLGdCQUlGSCxLQUpFLEVBSUs7QUFDVixXQUFPQSxNQUFNQyxJQUFOLENBQVdHLFNB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Qiw4QkFBa0IsS0FBS2IsR0FBdkIsZ0JBQXFDLEtBQUtFLE9BQTFDLGNBQTBELEtBQUtEO0FBRG5ELFNBQWQ7QUFHRCxPQUxELE1BS08sSUFBSSxLQUFLRCxHQUFMLElBQVksS0FBS0YsVUFBTCxDQUFnQjBDLFNBQWhDLEVBQTJDO0FBQ2hEbEMsV0FBR29DLFVBQUgsQ0FBYztBQUNaN0Isc0NBQTBCLEtBQUtYLE9BQS9CLGNBQStDLEtBQUtELElBQXBELGFBQWdFLEtBQUtEO0FBRHpELFNBQWQ7QUFHRDtBQUNELFVBQUksS0FBS0YsVUFBTCxJQUFtQixLQUFLQSxVQUFMLENBQWdCMEMsU0FBaEIsS0FBOEIsQ0FBQyxDQUF0RCxFQUF5RCxPQWpCNUMsQ0FpQnFEO0FBQ2xFO0FBQ0EsV0FBSzFCLE1BQUw7QUFDRDs7OztFQXRGb0M2QixlQUFLQyxJO2tCQUF2QnpELFMiLCJmaWxlIjoiY2xhc3NMaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHsgY29ubmVjdCwgZ2V0U3RvcmUgfSBmcm9tICd3ZXB5LXJlZHV4J1xuaW1wb3J0IHsgc2V0Q2xhc3NDaGFuZ2VkLCBnZXRDbGFzcyB9IGZyb20gJy4uL3N0b3JlL2FjdGlvbnMnXG5pbXBvcnQgeyBtZW1iZXJJbmZvIH0gZnJvbSAnLi4vYXBpL3VzZXInXG5cbkBjb25uZWN0KHtcbiAgY2xhc3NIYXNDaGFuZ2VkKHN0YXRlKSB7XG4gICAgcmV0dXJuIHN0YXRlLnpvbmUuY2xhc3NDaGFuZ2VkXG4gIH0sXG4gIGxpc3Qoc3RhdGUpIHtcbiAgICByZXR1cm4gc3RhdGUuem9uZS5jbGFzc0xpc3RcbiAgfVxufSlcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2xhc3NMaXN0IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmiJHnmoTnj63nuqcnLFxuICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogdHJ1ZVxuICB9XG4gIGRhdGEgPSB7XG4gICAgbWVtYmVySW5mbzoge30sXG4gICAgY2xhc3NJbmZvOiBudWxsLFxuICAgIGxpc3Q6IFtdLFxuICAgIGtleTogJycsXG4gICAgbmFtZTogJycsXG4gICAgY2xhc3NJZDogLTFcbiAgfVxuICBnZXRNZW1iZXJJbmZvKCkge1xuICAgIG1lbWJlckluZm8oe1xuICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICBsZXQgY2xhc3NOaWNrbmFtZSA9IGRhdGEuY2xhc3Nfbmlja25hbWVcbiAgICAgIGxldCBjYXJkSW5mbyA9IGRhdGEubWVtYmVyX2V4dGVuZFxuICAgICAgbGV0IG1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXG4gICAgICBsZXQgaW5mbyA9IE9iamVjdC5hc3NpZ24oe30sIHtcbiAgICAgICAgY2xhc3Nfbmlja25hbWU6IGNsYXNzTmlja25hbWUsXG4gICAgICAgIGNhcmRfaW5mbzogY2FyZEluZm9cbiAgICAgIH0sIG1lbWJlckluZm8pXG4gICAgICB3eC5zZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycsIGluZm8pXG4gICAgfSlcbiAgfVxuICBvblNoYXJlQXBwTWVzc2FnZShyZXMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6IGAke3RoaXMubWVtYmVySW5mby5uaWNrbmFtZX3pgoDor7fmgqjliqDlhaXlrrblp5TkvJrnj63nuqcs6aqM6K+B56CB5pivJHt0aGlzLmNsYXNzSW5mby5qb2luX2tleX1gLFxuICAgICAgcGF0aDogYHBhZ2VzL2NsYXNzTGlzdD9jbGFzc0lkPSR7dGhpcy5jbGFzc0luZm8uaWR9Jm5hbWU9JHt0aGlzLmNsYXNzSW5mby5uYW1lfSZrZXk9JHt0aGlzLmNsYXNzSW5mby5qb2luX2tleX1gXG4gICAgfVxuICB9XG4gIG9uUHVsbERvd25SZWZyZXNoKCkge1xuICAgIHRoaXMucmVzZXREYXRhKClcbiAgICB0aGlzLmdldENsYXNzTGlzdCgpXG4gIH1cbiAgcmVzZXREYXRhKCkge1xuICAgIHRoaXMuTGlzdCA9IFtdXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgc2V0Q2xhc3MoaW5kZXgpIHtcbiAgICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAgICBrZXk6ICdjbGFzc0luZm8nLFxuICAgICAgICBkYXRhOiB0aGlzLmxpc3RbaW5kZXhdLmNsYXNzLFxuICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgIHRoaXMuY2xhc3NJbmZvID0gdGhpcy5saXN0W2luZGV4XS5jbGFzc1xuICAgICAgICAgIHRoaXMuZ2V0TWVtYmVySW5mbygpXG4gICAgICAgICAgc2V0Q2xhc3NDaGFuZ2VkKHRydWUpXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB3eC5zd2l0Y2hUYWIoe3VybDogJ3pvbmUnfSlcbiAgICAgICAgICB9LCAxMDAwKVxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgb25TaG93KCkge1xuICAgIGlmICh0aGlzLmNsYXNzSGFzQ2hhbmdlZCkge1xuICAgICAgdGhpcy5jbGFzc0luZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnY2xhc3NJbmZvJylcbiAgICAgIC8vIHRoaXMuZ2V0Q2xhc3NMaXN0KClcbiAgICAgIHNldENsYXNzQ2hhbmdlZChmYWxzZSlcbiAgICB9XG4gIH1cbiAgb25Mb2FkKHBhcmFtcykge1xuICAgIHRoaXMubWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcbiAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxuICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJEYXRhID0gdGhpcy5tZW1iZXJJbmZvXG4gICAgdGhpcy5uYW1lID0gcGFyYW1zLm5hbWVcbiAgICB0aGlzLmNsYXNzSWQgPSBwYXJhbXMuY2xhc3NJZFxuICAgIHRoaXMua2V5ID0gcGFyYW1zLmtleVxuICAgIGlmICh0aGlzLmtleSAmJiAhdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCkge1xuICAgICAgLy8g5aaC5p6c5piv5LuO5YiG5Lqr6ZO+5o6l6L+b5YWl5LiU5rKh5pyJ5rOo5YaM77yM5YWI6LWw5rOo5YaM5rWB56iLXG4gICAgICB3eC5yZWRpcmVjdFRvKHtcbiAgICAgICAgdXJsOiBgbG9naW4/a2V5PSR7dGhpcy5rZXl9Y2xhc3NJZD0ke3RoaXMuY2xhc3NJZH0mbmFtZT0ke3RoaXMubmFtZX1gXG4gICAgICB9KVxuICAgIH0gZWxzZSBpZiAodGhpcy5rZXkgJiYgdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCkge1xuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogYGpvaW5DbGFzcz9jbGFzc0lkPSR7dGhpcy5jbGFzc0lkfSZuYW1lPSR7dGhpcy5uYW1lfSZrZXk9JHt0aGlzLmtleX1gXG4gICAgICB9KVxuICAgIH1cbiAgICBpZiAodGhpcy5tZW1iZXJJbmZvICYmIHRoaXMubWVtYmVySW5mby5tZW1iZXJfaWQgPT09IC0xKSByZXR1cm4gICAvL+W+ruS/oea1i+ivleeUqOaIt1xuICAgIGdldENsYXNzKClcbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbn1cbiJdfQ==