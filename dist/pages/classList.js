'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _createClass2 = require('./../api/createClass.js');

var _normalize = require('./../utils/normalize.js');

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
        wx.setStorageSync('memberInfo', info);
      });
    }
  }, {
    key: 'getClassList',
    value: function getClassList() {
      var _this3 = this;

      (0, _createClass2.getClassList)().then(function (res) {
        var list = res.data.list;
        _this3.list = list.map(_normalize.classListObj);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzTGlzdC5qcyJdLCJuYW1lcyI6WyJDbGFzc0xpc3QiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJsaXN0Iiwia2V5IiwibmFtZSIsImNsYXNzSWQiLCJtZXRob2RzIiwic2V0Q2xhc3MiLCJpbmRleCIsInd4Iiwic2V0U3RvcmFnZSIsImNsYXNzIiwic3VjY2VzcyIsInN3aXRjaFRhYiIsInVybCIsImdldE1lbWJlckluZm8iLCIkYXBwbHkiLCJjbGFzc19pZCIsImlkIiwidGhlbiIsInJlcyIsImNsYXNzTmlja25hbWUiLCJjbGFzc19uaWNrbmFtZSIsImNhcmRJbmZvIiwibWVtYmVyX2V4dGVuZCIsImdldFN0b3JhZ2VTeW5jIiwiaW5mbyIsIk9iamVjdCIsImFzc2lnbiIsImNhcmRfaW5mbyIsInNldFN0b3JhZ2VTeW5jIiwibWFwIiwiY2xhc3NMaXN0T2JqIiwidGl0bGUiLCJuaWNrbmFtZSIsImpvaW5fa2V5IiwicGF0aCIsInJlc2V0RGF0YSIsImdldENsYXNzTGlzdCIsIkxpc3QiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImNsYXNzSGFzQ2hhbmdlIiwicGFyYW1zIiwidXNlckRhdGEiLCJtZW1iZXJfaWQiLCJyZWRpcmVjdFRvIiwibmF2aWdhdGVUbyIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBQ3FCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsa0JBQVksRUFEUDtBQUVMQyxpQkFBVyxJQUZOO0FBR0xDLFlBQU0sRUFIRDtBQUlMQyxXQUFLLEVBSkE7QUFLTEMsWUFBTSxFQUxEO0FBTUxDLGVBQVMsQ0FBQztBQU5MLEssUUE0Q1BDLE8sR0FBVTtBQUNSQyxjQURRLG9CQUNDQyxLQURELEVB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QUFHRCxPQUxELE1BS08sSUFBSSxLQUFLRCxHQUFMLElBQVksS0FBS0gsVUFBTCxDQUFnQjZDLFNBQWhDLEVBQTJDO0FBQ2hEcEMsV0FBR3NDLFVBQUgsQ0FBYztBQUNaakMsc0NBQTBCLEtBQUtULE9BQS9CLGNBQStDLEtBQUtELElBQXBELGFBQWdFLEtBQUtEO0FBRHpELFNBQWQ7QUFHRDtBQUNELFdBQUttQyxZQUFMO0FBQ0EsV0FBS3RCLE1BQUw7QUFDRDs7OztFQXhGb0NnQyxlQUFLQyxJOztrQkFBdkJyRCxTIiwiZmlsZSI6ImNsYXNzTGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7IGdldENsYXNzTGlzdCB9IGZyb20gJy4uL2FwaS9jcmVhdGVDbGFzcydcbmltcG9ydCB7IGNsYXNzTGlzdE9iaiB9IGZyb20gJy4uL3V0aWxzL25vcm1hbGl6ZSdcbmltcG9ydCB7IG1lbWJlckluZm8gfSBmcm9tICcuLi9hcGkvdXNlcidcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsYXNzTGlzdCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5oiR55qE54+t57qnJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgbWVtYmVySW5mbzoge30sXG4gICAgY2xhc3NJbmZvOiBudWxsLFxuICAgIGxpc3Q6IFtdLFxuICAgIGtleTogJycsXG4gICAgbmFtZTogJycsXG4gICAgY2xhc3NJZDogLTFcbiAgfVxuICBnZXRNZW1iZXJJbmZvKCkge1xuICAgIG1lbWJlckluZm8oe1xuICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICBsZXQgY2xhc3NOaWNrbmFtZSA9IGRhdGEuY2xhc3Nfbmlja25hbWVcbiAgICAgIGxldCBjYXJkSW5mbyA9IGRhdGEubWVtYmVyX2V4dGVuZFxuICAgICAgbGV0IG1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXG4gICAgICBsZXQgaW5mbyA9IE9iamVjdC5hc3NpZ24oe30sIHtcbiAgICAgICAgY2xhc3Nfbmlja25hbWU6IGNsYXNzTmlja25hbWUsXG4gICAgICAgIGNhcmRfaW5mbzogY2FyZEluZm9cbiAgICAgIH0sIG1lbWJlckluZm8pXG4gICAgICB3eC5zZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycsIGluZm8pXG4gICAgfSlcbiAgfVxuICBnZXRDbGFzc0xpc3QoKSB7XG4gICAgZ2V0Q2xhc3NMaXN0KCkudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IGxpc3QgPSByZXMuZGF0YS5saXN0XG4gICAgICB0aGlzLmxpc3QgPSBsaXN0Lm1hcChjbGFzc0xpc3RPYmopXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSlcbiAgfVxuICBvblNoYXJlQXBwTWVzc2FnZShyZXMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6IGAke3RoaXMubWVtYmVySW5mby5uaWNrbmFtZX3pgoDor7fmgqjliqDlhaXlrrblp5TkvJrnj63nuqcs6aqM6K+B56CB5pivJHt0aGlzLmNsYXNzSW5mby5qb2luX2tleX1gLFxuICAgICAgcGF0aDogYHBhZ2VzL2NsYXNzTGlzdD9jbGFzc0lkPSR7dGhpcy5jbGFzc0luZm8uaWR9Jm5hbWU9JHt0aGlzLmNsYXNzSW5mby5uYW1lfSZrZXk9JHt0aGlzLmNsYXNzSW5mby5qb2luX2tleX1gXG4gICAgfVxuICB9XG4gIG9uUHVsbERvd25SZWZyZXNoKCkge1xuICAgIHRoaXMucmVzZXREYXRhKClcbiAgICB0aGlzLmdldENsYXNzTGlzdCgpXG4gIH1cbiAgcmVzZXREYXRhKCkge1xuICAgIHRoaXMuTGlzdCA9IFtdXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgc2V0Q2xhc3MoaW5kZXgpIHtcbiAgICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAgICBrZXk6ICdjbGFzc0luZm8nLFxuICAgICAgICBkYXRhOiB0aGlzLmxpc3RbaW5kZXhdLmNsYXNzLFxuICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgIHRoaXMuY2xhc3NJbmZvID0gdGhpcy5saXN0W2luZGV4XS5jbGFzc1xuICAgICAgICAgIHd4LnN3aXRjaFRhYih7dXJsOiAnem9uZSd9KVxuICAgICAgICAgIHRoaXMuZ2V0TWVtYmVySW5mbygpXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuICBvblNob3coKSB7XG4gICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmNsYXNzSGFzQ2hhbmdlKSB7XG4gICAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxuICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKVxuICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuY2xhc3NIYXNDaGFuZ2UgPSBmYWxzZVxuICAgIH1cbiAgfVxuICBvbkxvYWQocGFyYW1zKSB7XG4gICAgdGhpcy5tZW1iZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nKVxuICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXG4gICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckRhdGEgPSB0aGlzLm1lbWJlckluZm9cbiAgICB0aGlzLm5hbWUgPSBwYXJhbXMubmFtZVxuICAgIHRoaXMuY2xhc3NJZCA9IHBhcmFtcy5jbGFzc0lkXG4gICAgdGhpcy5rZXkgPSBwYXJhbXMua2V5XG4gICAgaWYgKHRoaXMua2V5ICYmICF0aGlzLm1lbWJlckluZm8ubWVtYmVyX2lkKSB7XG4gICAgICAvLyDlpoLmnpzmmK/ku47liIbkuqvpk77mjqXov5vlhaXkuJTmsqHmnInms6jlhozvvIzlhYjotbDms6jlhozmtYHnqItcbiAgICAgIHd4LnJlZGlyZWN0VG8oe1xuICAgICAgICB1cmw6IGBsb2dpbj9rZXk9JHt0aGlzLmtleX1jbGFzc0lkPSR7dGhpcy5jbGFzc0lkfSZuYW1lPSR7dGhpcy5uYW1lfWBcbiAgICAgIH0pXG4gICAgfSBlbHNlIGlmICh0aGlzLmtleSAmJiB0aGlzLm1lbWJlckluZm8ubWVtYmVyX2lkKSB7XG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiBgam9pbkNsYXNzP2NsYXNzSWQ9JHt0aGlzLmNsYXNzSWR9Jm5hbWU9JHt0aGlzLm5hbWV9JmtleT0ke3RoaXMua2V5fWBcbiAgICAgIH0pXG4gICAgfVxuICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KClcbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbn1cbiJdfQ==