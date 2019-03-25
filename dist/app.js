'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

    _this.config = {
      navigationBarBackgroundColor: '#000000',
      navigationBarTextStyle: 'white',
      pages: ['pages/zone', 'pages/personalCashflow', 'pages/classList', 'pages/bindRelationship', 'pages/authorize', 'pages/publish', 'pages/login', 'pages/cashWithdraw', 'pages/bindPhone', 'pages/cashflow', 'pages/photos', 'pages/recordCashflow', 'pages/createClassFail', 'pages/createClassSuccess', 'pages/joinClass', 'pages/createClass', 'pages/member', 'pages/discovery'],
      permission: {
        'scope.userLocation': {
          desc: '你的位置信息将用于小程序位置接口的效果展示'
        }
      },
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black'
      },
      tabBar: {
        backgroundColor: '#fff',
        borderStyle: 'white',
        position: 'bottom',
        selectedColor: '#ff7811',
        list: [{
          pagePath: 'pages/zone',
          iconPath: 'images/tab/index.png',
          text: '最近班级',
          selectedIconPath: 'images/tab/index-active.png'
        }, {
          pagePath: 'pages/discovery',
          iconPath: 'images/tab/order.png',
          text: '家长圈子',
          selectedIconPath: 'images/tab/order-active.png'
        }, {
          pagePath: 'pages/classList',
          iconPath: 'images/tab/my.png',
          text: '我的班级',
          selectedIconPath: 'images/tab/my-active.png'
        }]
      }
    };
    _this.globalData = {
      userInfo: null,
      apiUrl: 'https://test.ctjwh.com/api/v1',
      userData: {},
      classHasChange: false
    };

    _this.use('requestfix');
    _this.use('promisify');
    _this.intercept('request', {
      config: function config(req) {
        // req.url = 'http://www.patriarch.cm:8080/api/v1' + req.url
        req.url = 'https://test.ctjwh.com/api/v1' + req.url;
        wx.showLoading({
          title: '加载中',
          mask: true
        });
        return req;
      },
      success: function success(res) {
        wx.hideLoading();
        var data = res.data;
        if (!data.success) {
          var msg = data.error_msg;
          var code = data.error_code;
          wx.showToast({
            title: msg,
            icon: 'none',
            duration: 2000
          });
          if (Number(code) === 100010 || Number()) {
            wx.reLaunch({ url: 'login' });
          }
        }
        return res;
      },
      fail: function fail(req) {
        console.log('request fail: ', req);
        return req;
      }
    });
    return _this;
  }

  _createClass(_default, [{
    key: 'onLaunch',
    value: function onLaunch() {
      if (wx.getUpdateManager) {
        var updateManager = wx.getUpdateManager();
        updateManager.onUpdateReady(function () {
          updateManager.applyUpdate();
        });
      } else {
        wx.showModal({
          showCancel: false,
          title: '当前微信版本过低',
          content: '部分功能可能无法使用，请升级到最新微信版本后重试。'
        });
      }
      this.testAsync();
    }
  }, {
    key: 'sleep',
    value: function sleep(s) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve('promise resolved');
        }, s * 1000);
      });
    }
  }, {
    key: 'testAsync',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.sleep(3);

              case 2:
                data = _context.sent;

                console.log(data);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function testAsync() {
        return _ref.apply(this, arguments);
      }

      return testAsync;
    }()
  }, {
    key: 'getUserInfo',
    value: function getUserInfo(cb) {
      var that = this;
      if (this.globalData.userInfo) {
        return this.globalData.userInfo;
      }
      _wepy2.default.getUserInfo({
        success: function success(res) {
          that.globalData.userInfo = res.userInfo;
          cb && cb(res.userInfo);
        }
      });
    }
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));
require('./_wepylogs.js')

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsInBhZ2VzIiwicGVybWlzc2lvbiIsImRlc2MiLCJ3aW5kb3ciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsInRhYkJhciIsImJhY2tncm91bmRDb2xvciIsImJvcmRlclN0eWxlIiwicG9zaXRpb24iLCJzZWxlY3RlZENvbG9yIiwibGlzdCIsInBhZ2VQYXRoIiwiaWNvblBhdGgiLCJ0ZXh0Iiwic2VsZWN0ZWRJY29uUGF0aCIsImdsb2JhbERhdGEiLCJ1c2VySW5mbyIsImFwaVVybCIsInVzZXJEYXRhIiwiY2xhc3NIYXNDaGFuZ2UiLCJ1c2UiLCJpbnRlcmNlcHQiLCJyZXEiLCJ1cmwiLCJ3eCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJtYXNrIiwic3VjY2VzcyIsInJlcyIsImhpZGVMb2FkaW5nIiwiZGF0YSIsIm1zZyIsImVycm9yX21zZyIsImNvZGUiLCJlcnJvcl9jb2RlIiwic2hvd1RvYXN0IiwiaWNvbiIsImR1cmF0aW9uIiwiTnVtYmVyIiwicmVMYXVuY2giLCJmYWlsIiwiY29uc29sZSIsImxvZyIsImdldFVwZGF0ZU1hbmFnZXIiLCJ1cGRhdGVNYW5hZ2VyIiwib25VcGRhdGVSZWFkeSIsImFwcGx5VXBkYXRlIiwic2hvd01vZGFsIiwic2hvd0NhbmNlbCIsImNvbnRlbnQiLCJ0ZXN0QXN5bmMiLCJzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzZXRUaW1lb3V0Iiwic2xlZXAiLCJjYiIsInRoYXQiLCJ3ZXB5IiwiZ2V0VXNlckluZm8iLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQXdFRSxzQkFBZTtBQUFBOztBQUFBOztBQUFBLFVBckVmQSxNQXFFZSxHQXJFTjtBQUNQQyxvQ0FB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WHZCLGlCQUFPLFVBRkk7QUFHWHdCLG1CQUFTO0FBSEUsU0FBYjtBQUtEO0FBQ0QsV0FBS0MsU0FBTDtBQUNEOzs7MEJBRU1DLEMsRUFBRztBQUNSLGFBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q0MsbUJBQVcsWUFBTTtBQUNmRixrQkFBUSxrQkFBUjtBQUNELFNBRkQsRUFFR0YsSUFBSSxJQUZQO0FBR0QsT0FKTSxDQUFQO0FBS0Q7Ozs7Ozs7Ozs7O3VCQUdvQixLQUFLSyxLQUFMLENBQVcsQ0FBWCxDOzs7QUFBYjFCLG9COztBQUNOVyx3QkFBUUMsR0FBUixDQUFZWixJQUFaOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBR1UyQixFLEVBQUk7QUFDZCxVQUFNQyxPQUFPLElBQWI7QUFDQSxVQUFJLEtBQUs1QyxVQUFMLENBQWdCQyxRQUFwQixFQUE4QjtBQUM1QixlQUFPLEtBQUtELFVBQUwsQ0FBZ0JDLFFBQXZCO0FBQ0Q7QUFDRDRDLHFCQUFLQyxXQUFMLENBQWlCO0FBQ2ZqQyxlQURlLG1CQUNOQyxHQURNLEVBQ0Q7QUFDWjhCLGVBQUs1QyxVQUFMLENBQWdCQyxRQUFoQixHQUEyQmEsSUFBSWIsUUFBL0I7QUFDQTBDLGdCQUFNQSxHQUFHN0IsSUFBSWIsUUFBUCxDQUFOO0FBQ0Q7QUFKYyxPQUFqQjtBQU1EOzs7O0VBckowQjRDLGVBQUtFLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjMDAwMDAwJyxcbiAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnd2hpdGUnLFxuICAgIHBhZ2VzOiBbXG4gICAgICAncGFnZXMvem9uZScsXG4gICAgICAncGFnZXMvcGVyc29uYWxDYXNoZmxvdycsXG4gICAgICAncGFnZXMvY2xhc3NMaXN0JyxcbiAgICAgICdwYWdlcy9iaW5kUmVsYXRpb25zaGlwJyxcbiAgICAgICdwYWdlcy9hdXRob3JpemUnLFxuICAgICAgJ3BhZ2VzL3B1Ymxpc2gnLFxuICAgICAgJ3BhZ2VzL2xvZ2luJyxcbiAgICAgICdwYWdlcy9jYXNoV2l0aGRyYXcnLFxuICAgICAgJ3BhZ2VzL2JpbmRQaG9uZScsXG4gICAgICAncGFnZXMvY2FzaGZsb3cnLFxuICAgICAgJ3BhZ2VzL3Bob3RvcycsXG4gICAgICAncGFnZXMvcmVjb3JkQ2FzaGZsb3cnLFxuICAgICAgJ3BhZ2VzL2NyZWF0ZUNsYXNzRmFpbCcsXG4gICAgICAncGFnZXMvY3JlYXRlQ2xhc3NTdWNjZXNzJyxcbiAgICAgICdwYWdlcy9qb2luQ2xhc3MnLFxuICAgICAgJ3BhZ2VzL2NyZWF0ZUNsYXNzJyxcbiAgICAgICdwYWdlcy9tZW1iZXInLFxuICAgICAgJ3BhZ2VzL2Rpc2NvdmVyeSdcbiAgICBdLFxuICAgIHBlcm1pc3Npb246IHtcbiAgICAgICdzY29wZS51c2VyTG9jYXRpb24nOiB7XG4gICAgICAgIGRlc2M6ICfkvaDnmoTkvY3nva7kv6Hmga/lsIbnlKjkuo7lsI/nqIvluo/kvY3nva7mjqXlj6PnmoTmlYjmnpzlsZXnpLonXG4gICAgICB9XG4gICAgfSxcbiAgICB3aW5kb3c6IHtcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdsaWdodCcsXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnV2VDaGF0JyxcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaydcbiAgICB9LFxuICAgIHRhYkJhcjoge1xuICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXG4gICAgICBib3JkZXJTdHlsZTogJ3doaXRlJyxcbiAgICAgIHBvc2l0aW9uOiAnYm90dG9tJyxcbiAgICAgIHNlbGVjdGVkQ29sb3I6ICcjZmY3ODExJyxcbiAgICAgIGxpc3Q6IFtcbiAgICAgICAge1xuICAgICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvem9uZScsXG4gICAgICAgICAgaWNvblBhdGg6ICdpbWFnZXMvdGFiL2luZGV4LnBuZycsXG4gICAgICAgICAgdGV4dDogJ+acgOi/keePree6pycsXG4gICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlcy90YWIvaW5kZXgtYWN0aXZlLnBuZydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvZGlzY292ZXJ5JyxcbiAgICAgICAgICBpY29uUGF0aDogJ2ltYWdlcy90YWIvb3JkZXIucG5nJyxcbiAgICAgICAgICB0ZXh0OiAn5a626ZW/5ZyI5a2QJyxcbiAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2VzL3RhYi9vcmRlci1hY3RpdmUucG5nJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9jbGFzc0xpc3QnLFxuICAgICAgICAgIGljb25QYXRoOiAnaW1hZ2VzL3RhYi9teS5wbmcnLFxuICAgICAgICAgIHRleHQ6ICfmiJHnmoTnj63nuqcnLFxuICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZXMvdGFiL215LWFjdGl2ZS5wbmcnXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH1cblxuICBnbG9iYWxEYXRhID0ge1xuICAgIHVzZXJJbmZvOiBudWxsLFxuICAgIGFwaVVybDogJ2h0dHBzOi8vdGVzdC5jdGp3aC5jb20vYXBpL3YxJyxcbiAgICB1c2VyRGF0YToge30sXG4gICAgY2xhc3NIYXNDaGFuZ2U6IGZhbHNlXG4gIH1cblxuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMudXNlKCdyZXF1ZXN0Zml4JylcbiAgICB0aGlzLnVzZSgncHJvbWlzaWZ5JylcbiAgICB0aGlzLmludGVyY2VwdCgncmVxdWVzdCcsIHtcblxuICAgICAgY29uZmlnKHJlcSkge1xuICAgICAgICAvLyByZXEudXJsID0gJ2h0dHA6Ly93d3cucGF0cmlhcmNoLmNtOjgwODAvYXBpL3YxJyArIHJlcS51cmxcbiAgICAgICAgcmVxLnVybCA9ICdodHRwczovL3Rlc3QuY3Rqd2guY29tL2FwaS92MScgKyByZXEudXJsXG4gICAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXG4gICAgICAgICAgbWFzazogdHJ1ZVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gcmVxXG4gICAgICB9LFxuICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhXG4gICAgICAgIGlmICghZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgbGV0IG1zZyA9IGRhdGEuZXJyb3JfbXNnXG4gICAgICAgICAgbGV0IGNvZGUgPSBkYXRhLmVycm9yX2NvZGVcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6IG1zZyxcbiAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgfSlcbiAgICAgICAgICBpZiAoTnVtYmVyKGNvZGUpID09PSAxMDAwMTAgfHwgTnVtYmVyKCkpIHtcbiAgICAgICAgICAgIHd4LnJlTGF1bmNoKHt1cmw6ICdsb2dpbid9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzXG4gICAgICB9LFxuICAgICAgZmFpbChyZXEpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3JlcXVlc3QgZmFpbDogJywgcmVxKVxuICAgICAgICByZXR1cm4gcmVxXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIG9uTGF1bmNoKCkge1xuICAgIGlmICh3eC5nZXRVcGRhdGVNYW5hZ2VyKSB7XG4gICAgICBjb25zdCB1cGRhdGVNYW5hZ2VyID0gd3guZ2V0VXBkYXRlTWFuYWdlcigpXG4gICAgICB1cGRhdGVNYW5hZ2VyLm9uVXBkYXRlUmVhZHkoZnVuY3Rpb24gKCkge1xuICAgICAgICB1cGRhdGVNYW5hZ2VyLmFwcGx5VXBkYXRlKClcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICB0aXRsZTogJ+W9k+WJjeW+ruS/oeeJiOacrOi/h+S9jicsXG4gICAgICAgIGNvbnRlbnQ6ICfpg6jliIblip/og73lj6/og73ml6Dms5Xkvb/nlKjvvIzor7fljYfnuqfliLDmnIDmlrDlvq7kv6HniYjmnKzlkI7ph43or5XjgIInXG4gICAgICB9KVxuICAgIH1cbiAgICB0aGlzLnRlc3RBc3luYygpXG4gIH1cblxuICBzbGVlcCAocykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcmVzb2x2ZSgncHJvbWlzZSByZXNvbHZlZCcpXG4gICAgICB9LCBzICogMTAwMClcbiAgICB9KVxuICB9XG5cbiAgYXN5bmMgdGVzdEFzeW5jICgpIHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5zbGVlcCgzKVxuICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gIH1cblxuICBnZXRVc2VySW5mbyhjYikge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzXG4gICAgaWYgKHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbykge1xuICAgICAgcmV0dXJuIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mb1xuICAgIH1cbiAgICB3ZXB5LmdldFVzZXJJbmZvKHtcbiAgICAgIHN1Y2Nlc3MgKHJlcykge1xuICAgICAgICB0aGF0Lmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cbiAgICAgICAgY2IgJiYgY2IocmVzLnVzZXJJbmZvKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cbiJdfQ==