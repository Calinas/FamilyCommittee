'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _createClass2 = require('./../api/createClass.js');

var _user = require('./../api/user.js');

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
            _this2.getMemberInfo();
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
        console.log(info);
        wx.setStorageSync('memberInfo', info);
      });
    }
  }, {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzTGlzdC5qcyJdLCJuYW1lcyI6WyJDbGFzc0xpc3QiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImNsYXNzTGlzdCIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJsaXN0Iiwia2V5IiwibmFtZSIsImNsYXNzSWQiLCJtZXRob2RzIiwic2V0Q2xhc3MiLCJpbmRleCIsInd4Iiwic2V0U3RvcmFnZSIsImNsYXNzIiwic3VjY2VzcyIsInN3aXRjaFRhYiIsInVybCIsImdldE1lbWJlckluZm8iLCIkYXBwbHkiLCJjbGFzc19pZCIsImlkIiwidGhlbiIsInJlcyIsImNsYXNzTmlja25hbWUiLCJjbGFzc19uaWNrbmFtZSIsImNhcmRJbmZvIiwibWVtYmVyX2V4dGVuZCIsImdldFN0b3JhZ2VTeW5jIiwiaW5mbyIsIk9iamVjdCIsImFzc2lnbiIsImNhcmRfaW5mbyIsImNvbnNvbGUiLCJsb2ciLCJzZXRTdG9yYWdlU3luYyIsInRpdGxlIiwibmlja25hbWUiLCJqb2luX2tleSIsInBhdGgiLCJyZXNldERhdGEiLCJnZXRDbGFzc0xpc3QiLCJMaXN0IiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJjbGFzc0hhc0NoYW5nZSIsInBhcmFtcyIsInVzZXJEYXRhIiwibWVtYmVyX2lkIiwicmVkaXJlY3RUbyIsIm5hdmlnYXRlVG8iLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQUNxQkEsUzs7Ozs7Ozs7Ozs7Ozs7NExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLGlCQUFXLEVBRE47QUFFTEMsa0JBQVksRUFGUDtBQUdMQyxpQkFBVyxJQUhOO0FBSUxDLFlBQU0sRUFKRDtBQUtMQyxXQUFLLEVBTEE7QUFNTEMsWUFBTSxFQU5EO0FBT0xDLGVBQVMsQ0FBQztBQVBMLEssUUE2Q1BDLE8sR0FBVTtBQUNSQyxj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ZDtBQUdELE9BTEQsTUFLTyxJQUFJLEtBQUtELEdBQUwsSUFBWSxLQUFLSCxVQUFMLENBQWdCNkMsU0FBaEMsRUFBMkM7QUFDaERwQyxXQUFHc0MsVUFBSCxDQUFjO0FBQ1pqQyxzQ0FBMEIsS0FBS1QsT0FBL0IsY0FBK0MsS0FBS0QsSUFBcEQsYUFBZ0UsS0FBS0Q7QUFEekQsU0FBZDtBQUdEO0FBQ0QsV0FBS21DLFlBQUw7QUFDQSxXQUFLdEIsTUFBTDtBQUNEOzs7O0VBekZvQ2dDLGVBQUtDLEk7O2tCQUF2QnRELFMiLCJmaWxlIjoiY2xhc3NMaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHsgZ2V0Q2xhc3NMaXN0IH0gZnJvbSAnLi4vYXBpL2NyZWF0ZUNsYXNzJ1xuaW1wb3J0IHsgbWVtYmVySW5mbyB9IGZyb20gJy4uL2FwaS91c2VyJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2xhc3NMaXN0IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmiJHnmoTnj63nuqcnXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBjbGFzc0xpc3Q6IFtdLFxuICAgIG1lbWJlckluZm86IHt9LFxuICAgIGNsYXNzSW5mbzogbnVsbCxcbiAgICBsaXN0OiBbXSxcbiAgICBrZXk6ICcnLFxuICAgIG5hbWU6ICcnLFxuICAgIGNsYXNzSWQ6IC0xXG4gIH1cbiAgZ2V0TWVtYmVySW5mbygpIHtcbiAgICBtZW1iZXJJbmZvKHtcbiAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZFxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIGxldCBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgbGV0IGNsYXNzTmlja25hbWUgPSBkYXRhLmNsYXNzX25pY2tuYW1lXG4gICAgICBsZXQgY2FyZEluZm8gPSBkYXRhLm1lbWJlcl9leHRlbmRcbiAgICAgIGxldCBtZW1iZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nKVxuICAgICAgbGV0IGluZm8gPSBPYmplY3QuYXNzaWduKHt9LCB7XG4gICAgICAgIGNsYXNzX25pY2tuYW1lOiBjbGFzc05pY2tuYW1lLFxuICAgICAgICBjYXJkX2luZm86IGNhcmRJbmZvXG4gICAgICB9LCBtZW1iZXJJbmZvKVxuICAgICAgY29uc29sZS5sb2coaW5mbylcbiAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJywgaW5mbylcbiAgICB9KVxuICB9XG4gIGdldENsYXNzTGlzdCgpIHtcbiAgICBnZXRDbGFzc0xpc3QoKS50aGVuKHJlcyA9PiB7XG4gICAgICB0aGlzLmxpc3QgPSByZXMuZGF0YS5saXN0XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSlcbiAgfVxuICBvblNoYXJlQXBwTWVzc2FnZShyZXMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6IGAke3RoaXMubWVtYmVySW5mby5uaWNrbmFtZX3pgoDor7fmgqjliqDlhaXlrrblp5TkvJrnj63nuqcs6aqM6K+B56CB5pivJHt0aGlzLmNsYXNzSW5mby5qb2luX2tleX1gLFxuICAgICAgcGF0aDogYHBhZ2VzL2NsYXNzTGlzdD9jbGFzc0lkPSR7dGhpcy5jbGFzc0luZm8uaWR9Jm5hbWU9JHt0aGlzLmNsYXNzSW5mby5uYW1lfSZrZXk9JHt0aGlzLmNsYXNzSW5mby5qb2luX2tleX1gXG4gICAgfVxuICB9XG4gIG9uUHVsbERvd25SZWZyZXNoKCkge1xuICAgIHRoaXMucmVzZXREYXRhKClcbiAgICB0aGlzLmdldENsYXNzTGlzdCgpXG4gIH1cbiAgcmVzZXREYXRhKCkge1xuICAgIHRoaXMuTGlzdCA9IFtdXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgc2V0Q2xhc3MoaW5kZXgpIHtcbiAgICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAgICBrZXk6ICdjbGFzc0luZm8nLFxuICAgICAgICBkYXRhOiB0aGlzLmxpc3RbaW5kZXhdLmNsYXNzLFxuICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgIHRoaXMuY2xhc3NJbmZvID0gdGhpcy5saXN0W2luZGV4XS5jbGFzc1xuICAgICAgICAgIHd4LnN3aXRjaFRhYih7dXJsOiAnem9uZSd9KVxuICAgICAgICAgIHRoaXMuZ2V0TWVtYmVySW5mbygpXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuICBvblNob3coKSB7XG4gICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmNsYXNzSGFzQ2hhbmdlKSB7XG4gICAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxuICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKVxuICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuY2xhc3NIYXNDaGFuZ2UgPSBmYWxzZVxuICAgIH1cbiAgfVxuICBvbkxvYWQocGFyYW1zKSB7XG4gICAgdGhpcy5tZW1iZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nKVxuICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXG4gICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckRhdGEgPSB0aGlzLm1lbWJlckluZm9cbiAgICB0aGlzLm5hbWUgPSBwYXJhbXMubmFtZVxuICAgIHRoaXMuY2xhc3NJZCA9IHBhcmFtcy5jbGFzc0lkXG4gICAgdGhpcy5rZXkgPSBwYXJhbXMua2V5XG4gICAgaWYgKHRoaXMua2V5ICYmICF0aGlzLm1lbWJlckluZm8ubWVtYmVyX2lkKSB7XG4gICAgICAvLyDlpoLmnpzmmK/ku47liIbkuqvpk77mjqXov5vlhaXkuJTmsqHmnInms6jlhozvvIzlhYjotbDms6jlhozmtYHnqItcbiAgICAgIHd4LnJlZGlyZWN0VG8oe1xuICAgICAgICB1cmw6IGBsb2dpbj9rZXk9JHt0aGlzLmtleX1jbGFzc0lkPSR7dGhpcy5jbGFzc0lkfSZuYW1lPSR7dGhpcy5uYW1lfWBcbiAgICAgIH0pXG4gICAgfSBlbHNlIGlmICh0aGlzLmtleSAmJiB0aGlzLm1lbWJlckluZm8ubWVtYmVyX2lkKSB7XG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiBgam9pbkNsYXNzP2NsYXNzSWQ9JHt0aGlzLmNsYXNzSWR9Jm5hbWU9JHt0aGlzLm5hbWV9JmtleT0ke3RoaXMua2V5fWBcbiAgICAgIH0pXG4gICAgfVxuICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KClcbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbn1cbiJdfQ==