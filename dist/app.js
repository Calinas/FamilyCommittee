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
      pages: ['pages/zone', 'pages/classList', 'pages/bindRelationship', 'pages/authorize', 'pages/publish', 'pages/login', 'pages/cashWithdraw', 'pages/bindPhone', 'pages/cashflow', 'pages/photos', 'pages/recordCashflow', 'pages/createClassFail', 'pages/createClassSuccess', 'pages/joinClass', 'pages/createClass'],
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
          text: '首页',
          selectedIconPath: 'images/tab/index-active.png'
        }, {
          pagePath: 'pages/classList',
          iconPath: 'images/tab/order.png',
          text: '班级',
          selectedIconPath: 'images/tab/order-active.png'
        }]
      }
    };
    _this.globalData = {
      userInfo: null,
      apiUrl: 'http://www.patriarch.cm/api/v1',
      userData: {},
      classHasChange: false
    };

    _this.use('requestfix');
    _this.use('promisify');
    _this.intercept('request', {
      config: function config(req) {
        // req.url = 'http://127.0.0.1:3000/mock/11/api/v1' + req.url
        req.url = 'http://www.patriarch.cm:8080/api/v1' + req.url;
        wx.showLoading({
          title: '加载中',
          mask: true
        });
        return req;
      },
      success: function success(res) {
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
      },
      complete: function complete(req) {
        wx.hideLoading();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsInBhZ2VzIiwid2luZG93IiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJ0YWJCYXIiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3JkZXJTdHlsZSIsInBvc2l0aW9uIiwic2VsZWN0ZWRDb2xvciIsImxpc3QiLCJwYWdlUGF0aCIsImljb25QYXRoIiwidGV4dCIsInNlbGVjdGVkSWNvblBhdGgiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJhcGlVcmwiLCJ1c2VyRGF0YSIsImNsYXNzSGFzQ2hhbmdlIiwidXNlIiwiaW50ZXJjZXB0IiwicmVxIiwidXJsIiwid3giLCJzaG93TG9hZGluZyIsInRpdGxlIiwibWFzayIsInN1Y2Nlc3MiLCJyZXMiLCJkYXRhIiwic2hvd1RvYXN0IiwiZXJyb3JfbXNnIiwiaWNvbiIsImR1cmF0aW9uIiwiZmFpbCIsImNvbnNvbGUiLCJsb2ciLCJjb21wbGV0ZSIsImhpZGVMb2FkaW5nIiwidGVzdEFzeW5jIiwicyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic2V0VGltZW91dCIsInNsZWVwIiwiY2IiLCJ0aGF0Iiwid2VweSIsImdldFVzZXJJbmZvIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUEwREUsc0JBQWU7QUFBQTs7QUFBQTs7QUFBQSxVQXZEZkEsTUF1RGUsR0F2RE47QUFDUEMsb0NBQThCLFNBRHZCO0FBRVBDLDhCQUF3QixPQUZqQjtBQUdQQyxhQUFPLENBQ0wsWUFESyxFQUVMLGlCQUZLLEVBR0wsd0JBSEssRUFJTCxpQkFKSyxFQUtMLGVBTEssRUFNTCxhQU5LLEVBT0wsb0JBUEssRUFRTCxpQkFSSyxFQVNMLGdCQVRLLEVBVUwsY0FWSyxFQVdMLHNCQVhL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eSdcbmltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnIzAwMDAwMCcsXG4gICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ3doaXRlJyxcbiAgICBwYWdlczogW1xuICAgICAgJ3BhZ2VzL3pvbmUnLFxuICAgICAgJ3BhZ2VzL2NsYXNzTGlzdCcsXG4gICAgICAncGFnZXMvYmluZFJlbGF0aW9uc2hpcCcsXG4gICAgICAncGFnZXMvYXV0aG9yaXplJyxcbiAgICAgICdwYWdlcy9wdWJsaXNoJyxcbiAgICAgICdwYWdlcy9sb2dpbicsXG4gICAgICAncGFnZXMvY2FzaFdpdGhkcmF3JyxcbiAgICAgICdwYWdlcy9iaW5kUGhvbmUnLFxuICAgICAgJ3BhZ2VzL2Nhc2hmbG93JyxcbiAgICAgICdwYWdlcy9waG90b3MnLFxuICAgICAgJ3BhZ2VzL3JlY29yZENhc2hmbG93JyxcbiAgICAgICdwYWdlcy9jcmVhdGVDbGFzc0ZhaWwnLFxuICAgICAgJ3BhZ2VzL2NyZWF0ZUNsYXNzU3VjY2VzcycsXG4gICAgICAncGFnZXMvam9pbkNsYXNzJyxcbiAgICAgICdwYWdlcy9jcmVhdGVDbGFzcydcbiAgICBdLFxuICAgIHdpbmRvdzoge1xuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdXZUNoYXQnLFxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJ1xuICAgIH0sXG4gICAgdGFiQmFyOiB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcbiAgICAgIGJvcmRlclN0eWxlOiAnd2hpdGUnLFxuICAgICAgcG9zaXRpb246ICdib3R0b20nLFxuICAgICAgc2VsZWN0ZWRDb2xvcjogJyNmZjc4MTEnLFxuICAgICAgbGlzdDogW1xuICAgICAgICB7XG4gICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy96b25lJyxcbiAgICAgICAgICBpY29uUGF0aDogJ2ltYWdlcy90YWIvaW5kZXgucG5nJyxcbiAgICAgICAgICB0ZXh0OiAn6aaW6aG1JyxcbiAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2VzL3RhYi9pbmRleC1hY3RpdmUucG5nJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9jbGFzc0xpc3QnLFxuICAgICAgICAgIGljb25QYXRoOiAnaW1hZ2VzL3RhYi9vcmRlci5wbmcnLFxuICAgICAgICAgIHRleHQ6ICfnj63nuqcnLFxuICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZXMvdGFiL29yZGVyLWFjdGl2ZS5wbmcnXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH1cblxuICBnbG9iYWxEYXRhID0ge1xuICAgIHVzZXJJbmZvOiBudWxsLFxuICAgIGFwaVVybDogJ2h0dHA6Ly93d3cucGF0cmlhcmNoLmNtL2FwaS92MScsXG4gICAgdXNlckRhdGE6IHt9LFxuICAgIGNsYXNzSGFzQ2hhbmdlOiBmYWxzZVxuICB9XG5cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLnVzZSgncmVxdWVzdGZpeCcpXG4gICAgdGhpcy51c2UoJ3Byb21pc2lmeScpXG4gICAgdGhpcy5pbnRlcmNlcHQoJ3JlcXVlc3QnLCB7XG5cbiAgICAgIGNvbmZpZyhyZXEpIHtcbiAgICAgICAgLy8gcmVxLnVybCA9ICdodHRwOi8vMTI3LjAuMC4xOjMwMDAvbW9jay8xMS9hcGkvdjEnICsgcmVxLnVybFxuICAgICAgICByZXEudXJsID0gJ2h0dHA6Ly93d3cucGF0cmlhcmNoLmNtOjgwODAvYXBpL3YxJyArIHJlcS51cmxcbiAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcbiAgICAgICAgICBtYXNrOiB0cnVlXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiByZXFcbiAgICAgIH0sXG4gICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICBpZiAoIXJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6IHJlcy5kYXRhLmVycm9yX21zZyxcbiAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzXG4gICAgICB9LFxuICAgICAgZmFpbChyZXEpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3JlcXVlc3QgZmFpbDogJywgcmVxKVxuICAgICAgICByZXR1cm4gcmVxXG4gICAgICB9LFxuICAgICAgY29tcGxldGUocmVxKSB7XG4gICAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgb25MYXVuY2goKSB7XG4gICAgdGhpcy50ZXN0QXN5bmMoKVxuICB9XG5cbiAgc2xlZXAgKHMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHJlc29sdmUoJ3Byb21pc2UgcmVzb2x2ZWQnKVxuICAgICAgfSwgcyAqIDEwMDApXG4gICAgfSlcbiAgfVxuXG4gIGFzeW5jIHRlc3RBc3luYyAoKSB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuc2xlZXAoMylcbiAgICBjb25zb2xlLmxvZyhkYXRhKVxuICB9XG5cbiAgZ2V0VXNlckluZm8oY2IpIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpc1xuICAgIGlmICh0aGlzLmdsb2JhbERhdGEudXNlckluZm8pIHtcbiAgICAgIHJldHVybiB0aGlzLmdsb2JhbERhdGEudXNlckluZm9cbiAgICB9XG4gICAgd2VweS5nZXRVc2VySW5mbyh7XG4gICAgICBzdWNjZXNzIChyZXMpIHtcbiAgICAgICAgdGhhdC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXG4gICAgICAgIGNiICYmIGNiKHJlcy51c2VySW5mbylcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG4iXX0=