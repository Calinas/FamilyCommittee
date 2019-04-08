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

var _createClass2 = require('./../api/createClass.js');

var _normalize = require('./../utils/normalize.js');

var _user = require('./../api/user.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ClassList = (_dec = (0, _wepyRedux.connect)({
  classHasChanged: function classHasChanged(state) {
    return state.zone.classChanged;
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
}(_wepy2.default.page)) || _class);

Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ClassList , 'pages/classList'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsYXNzTGlzdC5qcyJdLCJuYW1lcyI6WyJDbGFzc0xpc3QiLCJjbGFzc0hhc0NoYW5nZWQiLCJzdGF0ZSIsInpvbmUiLCJjbGFzc0NoYW5nZWQiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJsaXN0Iiwia2V5IiwibmFtZSIsImNsYXNzSWQiLCJtZXRob2RzIiwic2V0Q2xhc3MiLCJpbmRleCIsInd4Iiwic2V0U3RvcmFnZSIsImNsYXNzIiwic3VjY2VzcyIsImdldE1lbWJlckluZm8iLCJzZXRUaW1lb3V0Iiwic3dpdGNoVGFiIiwidXJsIiwiJGFwcGx5IiwiY2xhc3NfaWQiLCJpZCIsInRoZW4iLCJyZXMiLCJjbGFzc05pY2tuYW1lIiwiY2xhc3Nfbmlja25hbWUiLCJjYXJkSW5mbyIsIm1lbWJlcl9leHRlbmQiLCJnZXRTdG9yYWdlU3luYyIsImluZm8iLCJPYmplY3QiLCJhc3NpZ24iLCJjYXJkX2luZm8iLCJzZXRTdG9yYWdlU3luYyIsIm1hcCIsImNsYXNzTGlzdE9iaiIsInRpdGxlIiwibmlja25hbWUiLCJqb2luX2tleSIsInBhdGgiLCJyZXNldERhdGEiLCJnZXRDbGFzc0xpc3QiLCJMaXN0IiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJjbGFzc0hhc0NoYW5nZSIsInBhcmFtcyIsInVzZXJEYXRhIiwibWVtYmVyX2lkIiwicmVkaXJlY3RUbyIsIm5hdmlnYXRlVG8iLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBUXFCQSxTLFdBTnBCLHdCQUFRO0FBQ1BDLGlCQURPLDJCQUNTQyxLQURULEVBQ2dCO0FBQ3JCLFdBQU9BLE1BQU1DLElBQU4sQ0FBV0MsWUFBbEI7QUFDRDtBQUhNLENBQVIsQzs7Ozs7Ozs7Ozs7Ozs7NExBT0NDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsa0JBQVksRUFEUDtBQUVMQyxpQkFBVyxJQUZOO0FBR0xDLFlBQU0sRUFIRDtBQUlMQyxXQUFLLEVBSkE7QUFLTEMsWUFBTSxFQUxEO0FBTUxDLGVBQVMsQ0FBQztBQU5MLEssUUE0Q1BDLE8sR0FBVTtBQUNSQyxjQURRLG9CQUNDQyxLQURELEVBQ1E7QUFBQTs7QUFDZEMsV0FBR0MsVUFBSCxDQUFjO0FBQ1pQLGVBQUssV0FETztBQUVaSixnQkFBTSxLQUFLRyxJQUFMLENBQVVNLEtBQVYsRUFBaUJHLEtBRlg7QUFHWkMsbUJBQVMsc0JBQU87QUFDZCxtQkFBS1gsU0FBTCxHQUFpQixPQUFLQyxJQUFMLENBQVVNLEtBQVYsRUFBaUJHLEtBQWxDO0FBQ0EsbUJBQUtFLGFBQUw7QUFDQSwwQ0FBZ0IsSUFBaEI7QUFDQUMsdUJBQVcsWUFBTTtBQUNmTCxpQkFBR00sU0FBSCxDQUFhLEVBQUNDLEtBQUssTUFBTixFQUFiO0FBQ0QsYUFGRCxFQUVHLElBRkg7QUFHQSxtQkFBS0MsTUFBTDtBQUNEO0FBWFcsU0FBZDtBQWFEO0FBZk8sSzs7Ozs7b0NBcENNO0FBQ2QsNEJBQVc7QUFDVEMsa0JBQVUsS0FBS2pCLFNBQUwsQ0FBZWtCO0FBRGhCLE9BQVgsRUFFR0MsSUFGSCxDQUVRLGVBQU87QUFDYixZQUFJckIsT0FBT3NCLElBQUl0QixJQUFKLENBQVNBLElBQXBCO0FBQ0EsWUFBSXVCLGdCQUFnQnZCLEtBQUt3QixjQUF6QjtBQUNBLFlBQUlDLFdBQVd6QixLQUFLMEIsYUFBcEI7QUFDQSxZQUFJekIsYUFBYVMsR0FBR2lCLGNBQUgsQ0FBa0IsWUFBbEIsQ0FBakI7QUFDQSxZQUFJQyxPQUFPQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQjtBQUMzQk4sMEJBQWdCRCxhQURXO0FBRTNCUSxxQkFBV047QUFGZ0IsU0FBbEIsRUFHUnhCLFVBSFEsQ0FBWDtBQUlBUyxXQUFHc0IsY0FBSCxDQUFrQixZQUFsQixFQUFnQ0osSUFBaEM7QUFDRCxPQVpEO0FBYUQ7OzttQ0FDYztBQUFBOztBQUNiLHdDQUFlUCxJQUFmLENBQW9CLGVBQU87QUFDekIsWUFBSWxCLE9BQU9tQixJQUFJdEIsSUFBSixDQUFTRyxJQUFwQjtBQUNBLGVBQUtBLElBQUwsR0FBWUEsS0FBSzhCLEdBQUwsQ0FBU0MsdUJBQVQsQ0FBWjtBQUNBLGVBQUtoQixNQUFMO0FBQ0QsT0FKRDtBQUtEOzs7c0NBQ2lCSSxHLEVBQUs7QUFDckIsYUFBTztBQUNMYSxlQUFVLEtBQUtsQyxVQUFMLENBQWdCbUMsUUFBMUIsNkZBQW9ELEtBQUtsQyxTQUFMLENBQWVtQyxRQUQ5RDtBQUVMQywyQ0FBaUMsS0FBS3BDLFNBQUwsQ0FBZWtCLEVBQWhELGNBQTJELEtBQUtsQixTQUFMLENBQWVHLElBQTFFLGFBQXNGLEtBQUtILFNBQUwsQ0FBZW1DO0FBRmhHLE9BQVA7QUFJRDs7O3dDQUNtQjtBQUNsQixXQUFLRSxTQUFMO0FBQ0EsV0FBS0MsWUFBTDtBQUNEOzs7Z0NBQ1c7QUFDVixXQUFLQyxJQUFMLEdBQVksRUFBWjtBQUNBLFdBQUt2QixNQUFMO0FBQ0Q7Ozs2QkFrQlE7QUFDUCxVQUFJLEtBQUt3QixPQUFMLENBQWFDLFVBQWIsQ0FBd0JDLGNBQTVCLEVBQTRDO0FBQzFDLGFBQUsxQyxTQUFMLEdBQWlCUSxHQUFHaUIsY0FBSCxDQUFrQixXQUFsQixDQUFqQjtBQUNBLGFBQUthLFlBQUw7QUFDQSxhQUFLRSxPQUFMLENBQWFDLFVBQWIsQ0FBd0JDLGNBQXhCLEdBQXlDLEtBQXpDO0FBQ0Q7QUFDRjs7OzJCQUNNQyxNLEVBQVE7QUFDYixXQUFLNUMsVUFBTCxHQUFrQlMsR0FBR2lCLGNBQUgsQ0FBa0IsWUFBbEIsQ0FBbEI7QUFDQSxXQUFLekIsU0FBTCxHQUFpQlEsR0FBR2lCLGNBQUgsQ0FBa0IsV0FBbEIsQ0FBakI7QUFDQSxXQUFLZSxPQUFMLENBQWFDLFVBQWIsQ0FBd0JHLFFBQXhCLEdBQW1DLEtBQUs3QyxVQUF4QztBQUNBLFdBQUtJLElBQUwsR0FBWXdDLE9BQU94QyxJQUFuQjtBQUNBLFdBQUtDLE9BQUwsR0FBZXVDLE9BQU92QyxPQUF0QjtBQUNBLFdBQUtGLEdBQUwsR0FBV3lDLE9BQU96QyxHQUFsQjtBQUNBLFVBQUksS0FBS0EsR0FBTCxJQUFZLENBQUMsS0FBS0gsVUFBTCxDQUFnQjhDLFNBQWpDLEVBQTRDO0FBQzFDO0FBQ0FyQyxXQUFHc0MsVUFBSCxDQUFjO0FBQ1ovQiw4QkFBa0IsS0FBS2IsR0FBdkIsZ0JBQXFDLEtBQUtFLE9BQTFDLGNBQTBELEtBQUtEO0FBRG5ELFNBQWQ7QUFHRCxPQUxELE1BS08sSUFBSSxLQUFLRCxHQUFMLElBQVksS0FBS0gsVUFBTCxDQUFnQjhDLFNBQWhDLEVBQTJDO0FBQ2hEckMsV0FBR3VDLFVBQUgsQ0FBYztBQUNaaEMsc0NBQTBCLEtBQUtYLE9BQS9CLGNBQStDLEtBQUtELElBQXBELGFBQWdFLEtBQUtEO0FBRHpELFNBQWQ7QUFHRDtBQUNELFdBQUtvQyxZQUFMO0FBQ0EsV0FBS3RCLE1BQUw7QUFDRDs7OztFQTNGb0NnQyxlQUFLQyxJO2tCQUF2QjFELFMiLCJmaWxlIjoiY2xhc3NMaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHsgY29ubmVjdCwgZ2V0U3RvcmUgfSBmcm9tICd3ZXB5LXJlZHV4J1xuaW1wb3J0IHsgc2V0Q2xhc3NDaGFuZ2VkIH0gZnJvbSAnLi4vc3RvcmUvYWN0aW9ucydcbmltcG9ydCB7IGdldENsYXNzTGlzdCB9IGZyb20gJy4uL2FwaS9jcmVhdGVDbGFzcydcbmltcG9ydCB7IGNsYXNzTGlzdE9iaiB9IGZyb20gJy4uL3V0aWxzL25vcm1hbGl6ZSdcbmltcG9ydCB7IG1lbWJlckluZm8gfSBmcm9tICcuLi9hcGkvdXNlcidcblxuQGNvbm5lY3Qoe1xuICBjbGFzc0hhc0NoYW5nZWQoc3RhdGUpIHtcbiAgICByZXR1cm4gc3RhdGUuem9uZS5jbGFzc0NoYW5nZWRcbiAgfVxufSlcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2xhc3NMaXN0IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmiJHnmoTnj63nuqcnXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBtZW1iZXJJbmZvOiB7fSxcbiAgICBjbGFzc0luZm86IG51bGwsXG4gICAgbGlzdDogW10sXG4gICAga2V5OiAnJyxcbiAgICBuYW1lOiAnJyxcbiAgICBjbGFzc0lkOiAtMVxuICB9XG4gIGdldE1lbWJlckluZm8oKSB7XG4gICAgbWVtYmVySW5mbyh7XG4gICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWRcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgIGxldCBjbGFzc05pY2tuYW1lID0gZGF0YS5jbGFzc19uaWNrbmFtZVxuICAgICAgbGV0IGNhcmRJbmZvID0gZGF0YS5tZW1iZXJfZXh0ZW5kXG4gICAgICBsZXQgbWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcbiAgICAgIGxldCBpbmZvID0gT2JqZWN0LmFzc2lnbih7fSwge1xuICAgICAgICBjbGFzc19uaWNrbmFtZTogY2xhc3NOaWNrbmFtZSxcbiAgICAgICAgY2FyZF9pbmZvOiBjYXJkSW5mb1xuICAgICAgfSwgbWVtYmVySW5mbylcbiAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJywgaW5mbylcbiAgICB9KVxuICB9XG4gIGdldENsYXNzTGlzdCgpIHtcbiAgICBnZXRDbGFzc0xpc3QoKS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgbGlzdCA9IHJlcy5kYXRhLmxpc3RcbiAgICAgIHRoaXMubGlzdCA9IGxpc3QubWFwKGNsYXNzTGlzdE9iailcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9KVxuICB9XG4gIG9uU2hhcmVBcHBNZXNzYWdlKHJlcykge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogYCR7dGhpcy5tZW1iZXJJbmZvLm5pY2tuYW1lfemCgOivt+aCqOWKoOWFpeWutuWnlOS8muePree6pyzpqozor4HnoIHmmK8ke3RoaXMuY2xhc3NJbmZvLmpvaW5fa2V5fWAsXG4gICAgICBwYXRoOiBgcGFnZXMvY2xhc3NMaXN0P2NsYXNzSWQ9JHt0aGlzLmNsYXNzSW5mby5pZH0mbmFtZT0ke3RoaXMuY2xhc3NJbmZvLm5hbWV9JmtleT0ke3RoaXMuY2xhc3NJbmZvLmpvaW5fa2V5fWBcbiAgICB9XG4gIH1cbiAgb25QdWxsRG93blJlZnJlc2goKSB7XG4gICAgdGhpcy5yZXNldERhdGEoKVxuICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KClcbiAgfVxuICByZXNldERhdGEoKSB7XG4gICAgdGhpcy5MaXN0ID0gW11cbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBzZXRDbGFzcyhpbmRleCkge1xuICAgICAgd3guc2V0U3RvcmFnZSh7XG4gICAgICAgIGtleTogJ2NsYXNzSW5mbycsXG4gICAgICAgIGRhdGE6IHRoaXMubGlzdFtpbmRleF0uY2xhc3MsXG4gICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgdGhpcy5jbGFzc0luZm8gPSB0aGlzLmxpc3RbaW5kZXhdLmNsYXNzXG4gICAgICAgICAgdGhpcy5nZXRNZW1iZXJJbmZvKClcbiAgICAgICAgICBzZXRDbGFzc0NoYW5nZWQodHJ1ZSlcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHd4LnN3aXRjaFRhYih7dXJsOiAnem9uZSd9KVxuICAgICAgICAgIH0sIDEwMDApXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuICBvblNob3coKSB7XG4gICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmNsYXNzSGFzQ2hhbmdlKSB7XG4gICAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxuICAgICAgdGhpcy5nZXRDbGFzc0xpc3QoKVxuICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuY2xhc3NIYXNDaGFuZ2UgPSBmYWxzZVxuICAgIH1cbiAgfVxuICBvbkxvYWQocGFyYW1zKSB7XG4gICAgdGhpcy5tZW1iZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nKVxuICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXG4gICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckRhdGEgPSB0aGlzLm1lbWJlckluZm9cbiAgICB0aGlzLm5hbWUgPSBwYXJhbXMubmFtZVxuICAgIHRoaXMuY2xhc3NJZCA9IHBhcmFtcy5jbGFzc0lkXG4gICAgdGhpcy5rZXkgPSBwYXJhbXMua2V5XG4gICAgaWYgKHRoaXMua2V5ICYmICF0aGlzLm1lbWJlckluZm8ubWVtYmVyX2lkKSB7XG4gICAgICAvLyDlpoLmnpzmmK/ku47liIbkuqvpk77mjqXov5vlhaXkuJTmsqHmnInms6jlhozvvIzlhYjotbDms6jlhozmtYHnqItcbiAgICAgIHd4LnJlZGlyZWN0VG8oe1xuICAgICAgICB1cmw6IGBsb2dpbj9rZXk9JHt0aGlzLmtleX1jbGFzc0lkPSR7dGhpcy5jbGFzc0lkfSZuYW1lPSR7dGhpcy5uYW1lfWBcbiAgICAgIH0pXG4gICAgfSBlbHNlIGlmICh0aGlzLmtleSAmJiB0aGlzLm1lbWJlckluZm8ubWVtYmVyX2lkKSB7XG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiBgam9pbkNsYXNzP2NsYXNzSWQ9JHt0aGlzLmNsYXNzSWR9Jm5hbWU9JHt0aGlzLm5hbWV9JmtleT0ke3RoaXMua2V5fWBcbiAgICAgIH0pXG4gICAgfVxuICAgIHRoaXMuZ2V0Q2xhc3NMaXN0KClcbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbn1cbiJdfQ==