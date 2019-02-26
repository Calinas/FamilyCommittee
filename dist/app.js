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
        // req.url = 'http://www.patriarch.cm:8080/api/v1' + req.url
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsInBhZ2VzIiwid2luZG93IiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJ0YWJCYXIiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3JkZXJTdHlsZSIsInBvc2l0aW9uIiwic2VsZWN0ZWRDb2xvciIsImxpc3QiLCJwYWdlUGF0aCIsImljb25QYXRoIiwidGV4dCIsInNlbGVjdGVkSWNvblBhdGgiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJhcGlVcmwiLCJ1c2VyRGF0YSIsImNsYXNzSGFzQ2hhbmdlIiwidXNlIiwiaW50ZXJjZXB0IiwicmVxIiwidXJsIiwic3VjY2VzcyIsInJlcyIsInd4IiwiaGlkZUxvYWRpbmciLCJkYXRhIiwic2hvd1RvYXN0IiwidGl0bGUiLCJlcnJvcl9tc2ciLCJpY29uIiwiZHVyYXRpb24iLCJmYWlsIiwiY29uc29sZSIsImxvZyIsInRlc3RBc3luYyIsInMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInNldFRpbWVvdXQiLCJzbGVlcCIsImNiIiwidGhhdCIsIndlcHkiLCJnZXRVc2VySW5mbyIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FBMkRFLHNCQUFlO0FBQUE7O0FBQUE7O0FBQUEsVUF4RGZBLE1Bd0RlLEdBeEROO0FBQ1BDLG9DQUE4QixTQUR2QjtBQUVQQyw4QkFBd0IsT0FGakI7QUFHUEMsYUFBTyxDQUNMLFlBREssRUFFTCx3QkFGSyxFQUdMLGlCQUhLLEVBSUwsd0JBSkssRUFLTCxpQkFMSyxFQU1MLGVBTkssRUFPTCxhQVBLLEVBUUwsb0JBUkssRUFTTCxpQkFUSyxFQVVMLGdCQVZLLEVBV0wsY0FYSyxFQVlMLHNCQVpLLEVBYUwsdUJBYkssRUFjTCwwQkFkSyxFQWVMLGlCQWZLLEVBZ0JMLG1CQWhCSyxDQUhBO0FBcUJQQyxjQUFRO0FBQ05DLDZCQUFxQixPQURmO0FBRU5KLHNDQUE4QixNQUZ4QjtBQUdOSyxnQ0FBd0IsUUFIbEI7QUFJTkosZ0NBQXdCO0FBSmxCLE9BckJEO0FBMkJQSyxjQUFRO0FBQ05DLHlCQUFpQixNQURYO0FBRU5DLHFCQUFhLE9BRlA7QUFHTkMsa0JBQVUsUUFISjtBQUlOQyx1QkFBZSxTQUpUO0FBS05DLGNBQU0sQ0FDSjtBQUNFQyxvQkFBVSxZQURaO0FBRUVDLG9CQUFVLHNCQUZaO0FBR0VDLGdCQUFNLElBSFI7QUFJRUMsNEJBQWtCO0FBSnBCLFNBREksRUFPSjtBQUNFSCxvQkFBVSxpQkFEWjtBQUVFQyxvQkFBVSxzQkFGWjtBQUdFQyxnQkFBTSxJQUhSO0FBSUVDLDRCQUFrQjtBQUpwQixTQVBJO0FBTEE7QUEzQkQsS0F3RE07QUFBQSxVQVBmQyxVQU9lLEdBUEY7QUFDWEMsZ0JBQVUsSUFEQztBQUVYQyxjQUFRLCtCQUZHO0FBR1hDLGdCQUFVLEVBSEM7QUFJWEMsc0JBQWdCO0FBSkwsS0FPRTs7QUFFYixVQUFLQyxHQUFMLENBQVMsWUFBVDtBQUNBLFVBQUtBLEdBQUwsQ0FBUyxXQUFUO0FBQ0EsVUFBS0MsU0FBTCxDQUFlLFNBQWYsRUFBMEI7QUFFeEJ2QixZQUZ3QixrQkFFakJ3QixHQUZpQixFQUVaO0FBQ1Y7QUFDQUEsWUFBSUMsR0FBSixHQUFVLGtDQUFrQ0QsSUFBSUMsR0FBaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQU9ELEdBQVA7QUFDRCxPQVZ1QjtBQVd4QkUsYUFYd0IsbUJBV2hCQyxHQVhnQixFQVdYO0FBQ1hDLFdBQUdDLFdBQUg7QUFDQSxZQUFJLENBQUNGLElBQUlHLElBQUosQ0FBU0osT0FBZCxFQUF1QjtBQUNyQkUsYUFBR0csU0FBSCxDQUFhO0FBQ1hDLG1CQUFPTCxJQUFJRyxJQUFKLENBQVNHLFNBREw7QUFFWEMsa0JBQU0sTUFGSztBQUdYQyxzQkFBVTtBQUhDLFdBQWI7QUFLRDtBQUNELGVBQU9SLEdBQVA7QUFDRCxPQXJCdUI7QUFzQnhCUyxVQXRCd0IsZ0JBc0JuQlosR0F0Qm1CLEVBc0JkO0FBQ1JhLGdCQUFRQyxHQUFSLENBQVksZ0JBQVosRUFBOEJkLEdBQTlCO0FBQ0EsZUFBT0EsR0FBUDtBQUNEO0FBekJ1QixLQUExQjtBQUphO0FBK0JkOzs7OytCQUVVO0FBQ1QsV0FBS2UsU0FBTDtBQUNEOzs7MEJBRU1DLEMsRUFBRztBQUNSLGFBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q0MsbUJBQVcsWUFBTTtBQUNmRixrQkFBUSxrQkFBUjtBQUNELFNBRkQsRUFFR0YsSUFBSSxJQUZQO0FBR0QsT0FKTSxDQUFQO0FBS0Q7Ozs7Ozs7Ozs7O3VCQUdvQixLQUFLSyxLQUFMLENBQVcsQ0FBWCxDOzs7QUFBYmYsb0I7O0FBQ05PLHdCQUFRQyxHQUFSLENBQVlSLElBQVo7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQ0FHVWdCLEUsRUFBSTtBQUNkLFVBQU1DLE9BQU8sSUFBYjtBQUNBLFVBQUksS0FBSzlCLFVBQUwsQ0FBZ0JDLFFBQXBCLEVBQThCO0FBQzVCLGVBQU8sS0FBS0QsVUFBTCxDQUFnQkMsUUFBdkI7QUFDRDtBQUNEOEIscUJBQUtDLFdBQUwsQ0FBaUI7QUFDZnZCLGVBRGUsbUJBQ05DLEdBRE0sRUFDRDtBQUNab0IsZUFBSzlCLFVBQUwsQ0FBZ0JDLFFBQWhCLEdBQTJCUyxJQUFJVCxRQUEvQjtBQUNBNEIsZ0JBQU1BLEdBQUduQixJQUFJVCxRQUFQLENBQU47QUFDRDtBQUpjLE9BQWpCO0FBTUQ7Ozs7RUF0SDBCOEIsZUFBS0UsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyMwMDAwMDAnLFxyXG4gICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ3doaXRlJyxcclxuICAgIHBhZ2VzOiBbXHJcbiAgICAgICdwYWdlcy96b25lJyxcclxuICAgICAgJ3BhZ2VzL3BlcnNvbmFsQ2FzaGZsb3cnLFxyXG4gICAgICAncGFnZXMvY2xhc3NMaXN0JyxcclxuICAgICAgJ3BhZ2VzL2JpbmRSZWxhdGlvbnNoaXAnLFxyXG4gICAgICAncGFnZXMvYXV0aG9yaXplJyxcclxuICAgICAgJ3BhZ2VzL3B1Ymxpc2gnLFxyXG4gICAgICAncGFnZXMvbG9naW4nLFxyXG4gICAgICAncGFnZXMvY2FzaFdpdGhkcmF3JyxcclxuICAgICAgJ3BhZ2VzL2JpbmRQaG9uZScsXHJcbiAgICAgICdwYWdlcy9jYXNoZmxvdycsXHJcbiAgICAgICdwYWdlcy9waG90b3MnLFxyXG4gICAgICAncGFnZXMvcmVjb3JkQ2FzaGZsb3cnLFxyXG4gICAgICAncGFnZXMvY3JlYXRlQ2xhc3NGYWlsJyxcclxuICAgICAgJ3BhZ2VzL2NyZWF0ZUNsYXNzU3VjY2VzcycsXHJcbiAgICAgICdwYWdlcy9qb2luQ2xhc3MnLFxyXG4gICAgICAncGFnZXMvY3JlYXRlQ2xhc3MnXHJcbiAgICBdLFxyXG4gICAgd2luZG93OiB7XHJcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdsaWdodCcsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ1dlQ2hhdCcsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaydcclxuICAgIH0sXHJcbiAgICB0YWJCYXI6IHtcclxuICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXHJcbiAgICAgIGJvcmRlclN0eWxlOiAnd2hpdGUnLFxyXG4gICAgICBwb3NpdGlvbjogJ2JvdHRvbScsXHJcbiAgICAgIHNlbGVjdGVkQ29sb3I6ICcjZmY3ODExJyxcclxuICAgICAgbGlzdDogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvem9uZScsXHJcbiAgICAgICAgICBpY29uUGF0aDogJ2ltYWdlcy90YWIvaW5kZXgucG5nJyxcclxuICAgICAgICAgIHRleHQ6ICfpppbpobUnLFxyXG4gICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlcy90YWIvaW5kZXgtYWN0aXZlLnBuZydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvY2xhc3NMaXN0JyxcclxuICAgICAgICAgIGljb25QYXRoOiAnaW1hZ2VzL3RhYi9vcmRlci5wbmcnLFxyXG4gICAgICAgICAgdGV4dDogJ+ePree6pycsXHJcbiAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2VzL3RhYi9vcmRlci1hY3RpdmUucG5nJ1xyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2xvYmFsRGF0YSA9IHtcclxuICAgIHVzZXJJbmZvOiBudWxsLFxyXG4gICAgYXBpVXJsOiAnaHR0cHM6Ly90ZXN0LmN0andoLmNvbS9hcGkvdjEnLFxyXG4gICAgdXNlckRhdGE6IHt9LFxyXG4gICAgY2xhc3NIYXNDaGFuZ2U6IGZhbHNlXHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgICB0aGlzLnVzZSgncmVxdWVzdGZpeCcpXHJcbiAgICB0aGlzLnVzZSgncHJvbWlzaWZ5JylcclxuICAgIHRoaXMuaW50ZXJjZXB0KCdyZXF1ZXN0Jywge1xyXG5cclxuICAgICAgY29uZmlnKHJlcSkge1xyXG4gICAgICAgIC8vIHJlcS51cmwgPSAnaHR0cDovL3d3dy5wYXRyaWFyY2guY206ODA4MC9hcGkvdjEnICsgcmVxLnVybFxyXG4gICAgICAgIHJlcS51cmwgPSAnaHR0cHM6Ly90ZXN0LmN0andoLmNvbS9hcGkvdjEnICsgcmVxLnVybFxyXG4gICAgICAgIC8vIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAvLyAgIHRpdGxlOiAn5Yqg6L295LitJyxcclxuICAgICAgICAvLyAgIG1hc2s6IHRydWVcclxuICAgICAgICAvLyB9KVxyXG4gICAgICAgIHJldHVybiByZXFcclxuICAgICAgfSxcclxuICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgaWYgKCFyZXMuZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICB0aXRsZTogcmVzLmRhdGEuZXJyb3JfbXNnLFxyXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzXHJcbiAgICAgIH0sXHJcbiAgICAgIGZhaWwocmVxKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3JlcXVlc3QgZmFpbDogJywgcmVxKVxyXG4gICAgICAgIHJldHVybiByZXFcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIG9uTGF1bmNoKCkge1xyXG4gICAgdGhpcy50ZXN0QXN5bmMoKVxyXG4gIH1cclxuXHJcbiAgc2xlZXAgKHMpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHJlc29sdmUoJ3Byb21pc2UgcmVzb2x2ZWQnKVxyXG4gICAgICB9LCBzICogMTAwMClcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBhc3luYyB0ZXN0QXN5bmMgKCkge1xyXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuc2xlZXAoMylcclxuICAgIGNvbnNvbGUubG9nKGRhdGEpXHJcbiAgfVxyXG5cclxuICBnZXRVc2VySW5mbyhjYikge1xyXG4gICAgY29uc3QgdGhhdCA9IHRoaXNcclxuICAgIGlmICh0aGlzLmdsb2JhbERhdGEudXNlckluZm8pIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mb1xyXG4gICAgfVxyXG4gICAgd2VweS5nZXRVc2VySW5mbyh7XHJcbiAgICAgIHN1Y2Nlc3MgKHJlcykge1xyXG4gICAgICAgIHRoYXQuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xyXG4gICAgICAgIGNiICYmIGNiKHJlcy51c2VySW5mbylcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuIl19