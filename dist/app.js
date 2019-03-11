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
        if (!res.data.success) {
          wx.showToast({
            title: res.data.error_msg,
            icon: 'none',
            duration: 2000
          });
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsInBhZ2VzIiwicGVybWlzc2lvbiIsImRlc2MiLCJ3aW5kb3ciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsInRhYkJhciIsImJhY2tncm91bmRDb2xvciIsImJvcmRlclN0eWxlIiwicG9zaXRpb24iLCJzZWxlY3RlZENvbG9yIiwibGlzdCIsInBhZ2VQYXRoIiwiaWNvblBhdGgiLCJ0ZXh0Iiwic2VsZWN0ZWRJY29uUGF0aCIsImdsb2JhbERhdGEiLCJ1c2VySW5mbyIsImFwaVVybCIsInVzZXJEYXRhIiwiY2xhc3NIYXNDaGFuZ2UiLCJ1c2UiLCJpbnRlcmNlcHQiLCJyZXEiLCJ1cmwiLCJ3eCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJtYXNrIiwic3VjY2VzcyIsInJlcyIsImhpZGVMb2FkaW5nIiwiZGF0YSIsInNob3dUb2FzdCIsImVycm9yX21zZyIsImljb24iLCJkdXJhdGlvbiIsImZhaWwiLCJjb25zb2xlIiwibG9nIiwidGVzdEFzeW5jIiwicyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic2V0VGltZW91dCIsInNsZWVwIiwiY2IiLCJ0aGF0Iiwid2VweSIsImdldFVzZXJJbmZvIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUF3RUUsc0JBQWU7QUFBQTs7QUFBQTs7QUFBQSxVQXJFZkEsTUFxRWUsR0FyRU47QUFDUEMsb0NBQThCLFNBRHZCO0FBRVBDLDhCQUF3QixPQUZqQjtBQUdQQyxhQUFPLENBQ0wsWUFESyxFQUVMLHdCQUZLLEVBR0wsaUJBSEssRUFJTCx3QkFKSyxFQUtMLGlCQUxLLEVBTUwsZUFOSyxFQU9MLGFBUEssRUFRTCxvQkFSSyxFQVNMLGlCQVRLLEVBVUwsZ0JBVkss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QThCLGdCQUFNQSxHQUFHakIsSUFBSWIsUUFBUCxDQUFOO0FBQ0Q7QUFKYyxPQUFqQjtBQU1EOzs7O0VBbkkwQmdDLGVBQUtFLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjMDAwMDAwJyxcclxuICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICd3aGl0ZScsXHJcbiAgICBwYWdlczogW1xyXG4gICAgICAncGFnZXMvem9uZScsXHJcbiAgICAgICdwYWdlcy9wZXJzb25hbENhc2hmbG93JyxcclxuICAgICAgJ3BhZ2VzL2NsYXNzTGlzdCcsXHJcbiAgICAgICdwYWdlcy9iaW5kUmVsYXRpb25zaGlwJyxcclxuICAgICAgJ3BhZ2VzL2F1dGhvcml6ZScsXHJcbiAgICAgICdwYWdlcy9wdWJsaXNoJyxcclxuICAgICAgJ3BhZ2VzL2xvZ2luJyxcclxuICAgICAgJ3BhZ2VzL2Nhc2hXaXRoZHJhdycsXHJcbiAgICAgICdwYWdlcy9iaW5kUGhvbmUnLFxyXG4gICAgICAncGFnZXMvY2FzaGZsb3cnLFxyXG4gICAgICAncGFnZXMvcGhvdG9zJyxcclxuICAgICAgJ3BhZ2VzL3JlY29yZENhc2hmbG93JyxcclxuICAgICAgJ3BhZ2VzL2NyZWF0ZUNsYXNzRmFpbCcsXHJcbiAgICAgICdwYWdlcy9jcmVhdGVDbGFzc1N1Y2Nlc3MnLFxyXG4gICAgICAncGFnZXMvam9pbkNsYXNzJyxcclxuICAgICAgJ3BhZ2VzL2NyZWF0ZUNsYXNzJyxcclxuICAgICAgJ3BhZ2VzL21lbWJlcicsXHJcbiAgICAgICdwYWdlcy9kaXNjb3ZlcnknXHJcbiAgICBdLFxyXG4gICAgcGVybWlzc2lvbjoge1xyXG4gICAgICAnc2NvcGUudXNlckxvY2F0aW9uJzoge1xyXG4gICAgICAgIGRlc2M6ICfkvaDnmoTkvY3nva7kv6Hmga/lsIbnlKjkuo7lsI/nqIvluo/kvY3nva7mjqXlj6PnmoTmlYjmnpzlsZXnpLonXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICB3aW5kb3c6IHtcclxuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcclxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnV2VDaGF0JyxcclxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJ1xyXG4gICAgfSxcclxuICAgIHRhYkJhcjoge1xyXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcclxuICAgICAgYm9yZGVyU3R5bGU6ICd3aGl0ZScsXHJcbiAgICAgIHBvc2l0aW9uOiAnYm90dG9tJyxcclxuICAgICAgc2VsZWN0ZWRDb2xvcjogJyNmZjc4MTEnLFxyXG4gICAgICBsaXN0OiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy96b25lJyxcclxuICAgICAgICAgIGljb25QYXRoOiAnaW1hZ2VzL3RhYi9pbmRleC5wbmcnLFxyXG4gICAgICAgICAgdGV4dDogJ+acgOi/keePree6pycsXHJcbiAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2VzL3RhYi9pbmRleC1hY3RpdmUucG5nJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9kaXNjb3ZlcnknLFxyXG4gICAgICAgICAgaWNvblBhdGg6ICdpbWFnZXMvdGFiL29yZGVyLnBuZycsXHJcbiAgICAgICAgICB0ZXh0OiAn5a626ZW/5ZyI5a2QJyxcclxuICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZXMvdGFiL29yZGVyLWFjdGl2ZS5wbmcnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2NsYXNzTGlzdCcsXHJcbiAgICAgICAgICBpY29uUGF0aDogJ2ltYWdlcy90YWIvbXkucG5nJyxcclxuICAgICAgICAgIHRleHQ6ICfmiJHnmoTnj63nuqcnLFxyXG4gICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlcy90YWIvbXktYWN0aXZlLnBuZydcclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdsb2JhbERhdGEgPSB7XHJcbiAgICB1c2VySW5mbzogbnVsbCxcclxuICAgIGFwaVVybDogJ2h0dHBzOi8vdGVzdC5jdGp3aC5jb20vYXBpL3YxJyxcclxuICAgIHVzZXJEYXRhOiB7fSxcclxuICAgIGNsYXNzSGFzQ2hhbmdlOiBmYWxzZVxyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgc3VwZXIoKVxyXG4gICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxyXG4gICAgdGhpcy51c2UoJ3Byb21pc2lmeScpXHJcbiAgICB0aGlzLmludGVyY2VwdCgncmVxdWVzdCcsIHtcclxuXHJcbiAgICAgIGNvbmZpZyhyZXEpIHtcclxuICAgICAgICAvLyByZXEudXJsID0gJ2h0dHA6Ly93d3cucGF0cmlhcmNoLmNtOjgwODAvYXBpL3YxJyArIHJlcS51cmxcclxuICAgICAgICByZXEudXJsID0gJ2h0dHBzOi8vdGVzdC5jdGp3aC5jb20vYXBpL3YxJyArIHJlcS51cmxcclxuICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXHJcbiAgICAgICAgICBtYXNrOiB0cnVlXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gcmVxXHJcbiAgICAgIH0sXHJcbiAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgIGlmICghcmVzLmRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6IHJlcy5kYXRhLmVycm9yX21zZyxcclxuICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc1xyXG4gICAgICB9LFxyXG4gICAgICBmYWlsKHJlcSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdyZXF1ZXN0IGZhaWw6ICcsIHJlcSlcclxuICAgICAgICByZXR1cm4gcmVxXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBvbkxhdW5jaCgpIHtcclxuICAgIHRoaXMudGVzdEFzeW5jKClcclxuICB9XHJcblxyXG4gIHNsZWVwIChzKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICByZXNvbHZlKCdwcm9taXNlIHJlc29sdmVkJylcclxuICAgICAgfSwgcyAqIDEwMDApXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgdGVzdEFzeW5jICgpIHtcclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLnNsZWVwKDMpXHJcbiAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG4gIH1cclxuXHJcbiAgZ2V0VXNlckluZm8oY2IpIHtcclxuICAgIGNvbnN0IHRoYXQgPSB0aGlzXHJcbiAgICBpZiAodGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdsb2JhbERhdGEudXNlckluZm9cclxuICAgIH1cclxuICAgIHdlcHkuZ2V0VXNlckluZm8oe1xyXG4gICAgICBzdWNjZXNzIChyZXMpIHtcclxuICAgICAgICB0aGF0Lmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cclxuICAgICAgICBjYiAmJiBjYihyZXMudXNlckluZm8pXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG59XHJcbiJdfQ==