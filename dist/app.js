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
      pages: ['pages/zone', 'pages/personalCashflow', 'pages/classList', 'pages/bindRelationship', 'pages/authorize', 'pages/publish', 'pages/login', 'pages/cashWithdraw', 'pages/bindPhone', 'pages/cashflow', 'pages/photos', 'pages/recordCashflow', 'pages/createClassFail', 'pages/createClassSuccess', 'pages/joinClass', 'pages/createClass'],
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
      apiUrl: 'https://test.ctjwh.com/api/v1',
      userData: {},
      classHasChange: false
    };

    _this.use('requestfix');
    _this.use('promisify');
    _this.intercept('request', {
      config: function config(req) {
        // req.url = 'http://127.0.0.1:3000/mock/11/api/v1' + req.url
        req.url = 'https://test.ctjwh.com/api/v1' + req.url;
        // wx.showLoading({
        //   title: '加载中',
        //   mask: true
        // })
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsInBhZ2VzIiwid2luZG93IiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJ0YWJCYXIiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3JkZXJTdHlsZSIsInBvc2l0aW9uIiwic2VsZWN0ZWRDb2xvciIsImxpc3QiLCJwYWdlUGF0aCIsImljb25QYXRoIiwidGV4dCIsInNlbGVjdGVkSWNvblBhdGgiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJhcGlVcmwiLCJ1c2VyRGF0YSIsImNsYXNzSGFzQ2hhbmdlIiwidXNlIiwiaW50ZXJjZXB0IiwicmVxIiwidXJsIiwic3VjY2VzcyIsInJlcyIsInd4IiwiaGlkZUxvYWRpbmciLCJkYXRhIiwic2hvd1RvYXN0IiwidGl0bGUiLCJlcnJvcl9tc2ciLCJpY29uIiwiZHVyYXRpb24iLCJmYWlsIiwiY29uc29sZSIsImxvZyIsInRlc3RBc3luYyIsInMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInNldFRpbWVvdXQiLCJzbGVlcCIsImNiIiwidGhhdCIsIndlcHkiLCJnZXRVc2VySW5mbyIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FBMkRFLHNCQUFlO0FBQUE7O0FBQUE7O0FBQUEsVUF4RGZBLE1Bd0RlLEdBeEROO0FBQ1BDLG9DQUE4QixTQUR2QjtBQUVQQyw4QkFBd0IsT0FGakI7QUFHUEMsYUFBTyxDQUNMLFlBREssRUFFTCx3QkFGSyxFQUdMLGlCQUhLLEVBSUwsd0JBSkssRUFLTCxpQkFMSyxFQU1MLGVBTkssRUFPTCxhQVBLLEVBUUwsb0JBUkssRUFTTCxpQkFUSyxFQVVMLGdCQVZLLEVBV0wsY0FYSyxFQVlMLHNCQVpLLEVBYUwsdUJBYkssRUFjTCwwQkFkSyxFQWVMLGlCQWZLLEVBZ0JMLG1CQWhCSyxDQUhBO0FBcUJQQyxjQUFRO0FBQ05DLDZCQUFxQixPQURmO0FBRU5KLHNDQUE4QixNQUZ4QjtBQUdOSyxnQ0FBd0IsUUFIbEI7QUFJTkosZ0NBQXdCO0FBSmxCLE9BckJEO0FBMkJQSyxjQUFRO0FBQ05DLHlCQUFpQixNQURYO0FBRU5DLHFCQUFhLE9BRlA7QUFHTkMsa0JBQVUsUUFISjtBQUlOQyx1QkFBZSxTQUpUO0FBS05DLGNBQU0sQ0FDSjtBQUNFQyxvQkFBVSxZQURaO0FBRUVDLG9CQUFVLHNCQUZaO0FBR0VDLGdCQUFNLElBSFI7QUFJRUMsNEJBQWtCO0FBSnBCLFNBREksRUFPSjtBQUNFSCxvQkFBVSxpQkFEWjtBQUVFQyxvQkFBVSxzQkFGWjtBQUdFQyxnQkFBTSxJQUhSO0FBSUVDLDRCQUFrQjtBQUpwQixTQVBJO0FBTEE7QUEzQkQsS0F3RE07QUFBQSxVQVBmQyxVQU9lLEdBUEY7QUFDWEMsZ0JBQVUsSUFEQztBQUVYQyxjQUFRLCtCQUZHO0FBR1hDLGdCQUFVLEVBSEM7QUFJWEMsc0JBQWdCO0FBSkwsS0FPRTs7QUFFYixVQUFLQyxHQUFMLENBQVMsWUFBVDtBQUNBLFVBQUtBLEdBQUwsQ0FBUyxXQUFUO0FBQ0EsVUFBS0MsU0FBTCxDQUFlLFNBQWYsRUFBMEI7QUFFeEJ2QixZQUZ3QixrQkFFakJ3QixHQUZpQixFQUVaO0FBQ1Y7QUFDQUEsWUFBSUMsR0FBSixHQUFVLGtDQUFrQ0QsSUFBSUMsR0FBaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQU9ELEdBQVA7QUFDRCxPQVZ1QjtBQVd4QkUsYUFYd0IsbUJBV2hCQyxHQVhnQixFQVdYO0FBQ1hDLFdBQUdDLFdBQUg7QUFDQSxZQUFJLENBQUNGLElBQUlHLElBQUosQ0FBU0osT0FBZCxFQUF1QjtBQUNyQkUsYUFBR0csU0FBSCxDQUFhO0FBQ1hDLG1CQUFPTCxJQUFJRyxJQUFKLENBQVNHLFNBREw7QUFFWEMsa0JBQU0sTUFGSztBQUdYQyxzQkFBVTtBQUhDLFdBQWI7QUFLRDtBQUNELGVBQU9SLEdBQVA7QUFDRCxPQXJCdUI7QUFzQnhCUyxVQXRCd0IsZ0JBc0JuQlosR0F0Qm1CLEVBc0JkO0FBQ1JhLGdCQUFRQyxHQUFSLENBQVksZ0JBQVosRUFBOEJkLEdBQTlCO0FBQ0EsZUFBT0EsR0FBUDtBQUNEO0FBekJ1QixLQUExQjtBQUphO0FBK0JkOzs7OytCQUVVO0FBQ1QsV0FBS2UsU0FBTDtBQUNEOzs7MEJBRU1DLEMsRUFBRztBQUNSLGFBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q0MsbUJBQVcsWUFBTTtBQUNmRixrQkFBUSxrQkFBUjtBQUNELFNBRkQsRUFFR0YsSUFBSSxJQUZQO0FBR0QsT0FKTSxDQUFQO0FBS0Q7Ozs7Ozs7Ozs7O3VCQUdvQixLQUFLSyxLQUFMLENBQVcsQ0FBWCxDOzs7QUFBYmYsb0I7O0FBQ05PLHdCQUFRQyxHQUFSLENBQVlSLElBQVo7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQ0FHVWdCLEUsRUFBSTtBQUNkLFVBQU1DLE9BQU8sSUFBYjtBQUNBLFVBQUksS0FBSzlCLFVBQUwsQ0FBZ0JDLFFBQXBCLEVBQThCO0FBQzVCLGVBQU8sS0FBS0QsVUFBTCxDQUFnQkMsUUFBdkI7QUFDRDtBQUNEOEIscUJBQUtDLFdBQUwsQ0FBaUI7QUFDZnZCLGVBRGUsbUJBQ05DLEdBRE0sRUFDRDtBQUNab0IsZUFBSzlCLFVBQUwsQ0FBZ0JDLFFBQWhCLEdBQTJCUyxJQUFJVCxRQUEvQjtBQUNBNEIsZ0JBQU1BLEdBQUduQixJQUFJVCxRQUFQLENBQU47QUFDRDtBQUpjLE9BQWpCO0FBTUQ7Ozs7RUF0SDBCOEIsZUFBS0UsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgJ3dlcHktYXN5bmMtZnVuY3Rpb24nXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyMwMDAwMDAnLFxuICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICd3aGl0ZScsXG4gICAgcGFnZXM6IFtcbiAgICAgICdwYWdlcy96b25lJyxcbiAgICAgICdwYWdlcy9wZXJzb25hbENhc2hmbG93JyxcbiAgICAgICdwYWdlcy9jbGFzc0xpc3QnLFxuICAgICAgJ3BhZ2VzL2JpbmRSZWxhdGlvbnNoaXAnLFxuICAgICAgJ3BhZ2VzL2F1dGhvcml6ZScsXG4gICAgICAncGFnZXMvcHVibGlzaCcsXG4gICAgICAncGFnZXMvbG9naW4nLFxuICAgICAgJ3BhZ2VzL2Nhc2hXaXRoZHJhdycsXG4gICAgICAncGFnZXMvYmluZFBob25lJyxcbiAgICAgICdwYWdlcy9jYXNoZmxvdycsXG4gICAgICAncGFnZXMvcGhvdG9zJyxcbiAgICAgICdwYWdlcy9yZWNvcmRDYXNoZmxvdycsXG4gICAgICAncGFnZXMvY3JlYXRlQ2xhc3NGYWlsJyxcbiAgICAgICdwYWdlcy9jcmVhdGVDbGFzc1N1Y2Nlc3MnLFxuICAgICAgJ3BhZ2VzL2pvaW5DbGFzcycsXG4gICAgICAncGFnZXMvY3JlYXRlQ2xhc3MnXG4gICAgXSxcbiAgICB3aW5kb3c6IHtcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdsaWdodCcsXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnV2VDaGF0JyxcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaydcbiAgICB9LFxuICAgIHRhYkJhcjoge1xuICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXG4gICAgICBib3JkZXJTdHlsZTogJ3doaXRlJyxcbiAgICAgIHBvc2l0aW9uOiAnYm90dG9tJyxcbiAgICAgIHNlbGVjdGVkQ29sb3I6ICcjZmY3ODExJyxcbiAgICAgIGxpc3Q6IFtcbiAgICAgICAge1xuICAgICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvem9uZScsXG4gICAgICAgICAgaWNvblBhdGg6ICdpbWFnZXMvdGFiL2luZGV4LnBuZycsXG4gICAgICAgICAgdGV4dDogJ+mmlumhtScsXG4gICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlcy90YWIvaW5kZXgtYWN0aXZlLnBuZydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvY2xhc3NMaXN0JyxcbiAgICAgICAgICBpY29uUGF0aDogJ2ltYWdlcy90YWIvb3JkZXIucG5nJyxcbiAgICAgICAgICB0ZXh0OiAn54+t57qnJyxcbiAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2VzL3RhYi9vcmRlci1hY3RpdmUucG5nJ1xuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9XG5cbiAgZ2xvYmFsRGF0YSA9IHtcbiAgICB1c2VySW5mbzogbnVsbCxcbiAgICBhcGlVcmw6ICdodHRwczovL3Rlc3QuY3Rqd2guY29tL2FwaS92MScsXG4gICAgdXNlckRhdGE6IHt9LFxuICAgIGNsYXNzSGFzQ2hhbmdlOiBmYWxzZVxuICB9XG5cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLnVzZSgncmVxdWVzdGZpeCcpXG4gICAgdGhpcy51c2UoJ3Byb21pc2lmeScpXG4gICAgdGhpcy5pbnRlcmNlcHQoJ3JlcXVlc3QnLCB7XG5cbiAgICAgIGNvbmZpZyhyZXEpIHtcbiAgICAgICAgLy8gcmVxLnVybCA9ICdodHRwOi8vMTI3LjAuMC4xOjMwMDAvbW9jay8xMS9hcGkvdjEnICsgcmVxLnVybFxuICAgICAgICByZXEudXJsID0gJ2h0dHBzOi8vdGVzdC5jdGp3aC5jb20vYXBpL3YxJyArIHJlcS51cmxcbiAgICAgICAgLy8gd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICAvLyAgIHRpdGxlOiAn5Yqg6L295LitJyxcbiAgICAgICAgLy8gICBtYXNrOiB0cnVlXG4gICAgICAgIC8vIH0pXG4gICAgICAgIHJldHVybiByZXFcbiAgICAgIH0sXG4gICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICAgIGlmICghcmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogcmVzLmRhdGEuZXJyb3JfbXNnLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNcbiAgICAgIH0sXG4gICAgICBmYWlsKHJlcSkge1xuICAgICAgICBjb25zb2xlLmxvZygncmVxdWVzdCBmYWlsOiAnLCByZXEpXG4gICAgICAgIHJldHVybiByZXFcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgb25MYXVuY2goKSB7XG4gICAgdGhpcy50ZXN0QXN5bmMoKVxuICB9XG5cbiAgc2xlZXAgKHMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHJlc29sdmUoJ3Byb21pc2UgcmVzb2x2ZWQnKVxuICAgICAgfSwgcyAqIDEwMDApXG4gICAgfSlcbiAgfVxuXG4gIGFzeW5jIHRlc3RBc3luYyAoKSB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuc2xlZXAoMylcbiAgICBjb25zb2xlLmxvZyhkYXRhKVxuICB9XG5cbiAgZ2V0VXNlckluZm8oY2IpIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpc1xuICAgIGlmICh0aGlzLmdsb2JhbERhdGEudXNlckluZm8pIHtcbiAgICAgIHJldHVybiB0aGlzLmdsb2JhbERhdGEudXNlckluZm9cbiAgICB9XG4gICAgd2VweS5nZXRVc2VySW5mbyh7XG4gICAgICBzdWNjZXNzIChyZXMpIHtcbiAgICAgICAgdGhhdC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXG4gICAgICAgIGNiICYmIGNiKHJlcy51c2VySW5mbylcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG4iXX0=