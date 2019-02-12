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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsInBhZ2VzIiwid2luZG93IiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJ0YWJCYXIiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3JkZXJTdHlsZSIsInBvc2l0aW9uIiwic2VsZWN0ZWRDb2xvciIsImxpc3QiLCJwYWdlUGF0aCIsImljb25QYXRoIiwidGV4dCIsInNlbGVjdGVkSWNvblBhdGgiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJhcGlVcmwiLCJ1c2VyRGF0YSIsImNsYXNzSGFzQ2hhbmdlIiwidXNlIiwiaW50ZXJjZXB0IiwicmVxIiwidXJsIiwic3VjY2VzcyIsInJlcyIsInd4IiwiaGlkZUxvYWRpbmciLCJkYXRhIiwic2hvd1RvYXN0IiwidGl0bGUiLCJlcnJvcl9tc2ciLCJpY29uIiwiZHVyYXRpb24iLCJmYWlsIiwiY29uc29sZSIsImxvZyIsInRlc3RBc3luYyIsInMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInNldFRpbWVvdXQiLCJzbGVlcCIsImNiIiwidGhhdCIsIndlcHkiLCJnZXRVc2VySW5mbyIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FBMERFLHNCQUFlO0FBQUE7O0FBQUE7O0FBQUEsVUF2RGZBLE1BdURlLEdBdkROO0FBQ1BDLG9DQUE4QixTQUR2QjtBQUVQQyw4QkFBd0IsT0FGakI7QUFHUEMsYUFBTyxDQUNMLFlBREssRUFFTCxpQkFGSyxFQUdMLHdCQUhLLEVBSUwsaUJBSkssRUFLTCxlQUxLLEVBTUwsYUFOSyxFQU9MLG9CQVBLLEVBUUwsaUJBUkssRUFTTCxnQkFUSyxFQVVMLGNBVkssRUFXTCxzQkFYSyxFQVlMLHVCQVpLLEVBYUwsMEJBYkssRUFjTCxpQkFkSyxFQWVMLG1CQWZLLENBSEE7QUFvQlBDLGNBQVE7QUFDTkMsNkJBQXFCLE9BRGY7QUFFTkosc0NBQThCLE1BRnhCO0FBR05LLGdDQUF3QixRQUhsQjtBQUlOSixnQ0FBd0I7QUFKbEIsT0FwQkQ7QUEwQlBLLGNBQVE7QUFDTkMseUJBQWlCLE1BRFg7QUFFTkMscUJBQWEsT0FGUDtBQUdOQyxrQkFBVSxRQUhKO0FBSU5DLHVCQUFlLFNBSlQ7QUFLTkMsY0FBTSxDQUNKO0FBQ0VDLG9CQUFVLFlBRFo7QUFFRUMsb0JBQVUsc0JBRlo7QUFHRUMsZ0JBQU0sSUFIUjtBQUlFQyw0QkFBa0I7QUFKcEIsU0FESSxFQU9KO0FBQ0VILG9CQUFVLGlCQURaO0FBRUVDLG9CQUFVLHNCQUZaO0FBR0VDLGdCQUFNLElBSFI7QUFJRUMsNEJBQWtCO0FBSnBCLFNBUEk7QUFMQTtBQTFCRCxLQXVETTtBQUFBLFVBUGZDLFVBT2UsR0FQRjtBQUNYQyxnQkFBVSxJQURDO0FBRVhDLGNBQVEsK0JBRkc7QUFHWEMsZ0JBQVUsRUFIQztBQUlYQyxzQkFBZ0I7QUFKTCxLQU9FOztBQUViLFVBQUtDLEdBQUwsQ0FBUyxZQUFUO0FBQ0EsVUFBS0EsR0FBTCxDQUFTLFdBQVQ7QUFDQSxVQUFLQyxTQUFMLENBQWUsU0FBZixFQUEwQjtBQUV4QnZCLFlBRndCLGtCQUVqQndCLEdBRmlCLEVBRVo7QUFDVjtBQUNBQSxZQUFJQyxHQUFKLEdBQVUsa0NBQWtDRCxJQUFJQyxHQUFoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBT0QsR0FBUDtBQUNELE9BVnVCO0FBV3hCRSxhQVh3QixtQkFXaEJDLEdBWGdCLEVBV1g7QUFDWEMsV0FBR0MsV0FBSDtBQUNBLFlBQUksQ0FBQ0YsSUFBSUcsSUFBSixDQUFTSixPQUFkLEVBQXVCO0FBQ3JCRSxhQUFHRyxTQUFILENBQWE7QUFDWEMsbUJBQU9MLElBQUlHLElBQUosQ0FBU0csU0FETDtBQUVYQyxrQkFBTSxNQUZLO0FBR1hDLHNCQUFVO0FBSEMsV0FBYjtBQUtEO0FBQ0QsZUFBT1IsR0FBUDtBQUNELE9BckJ1QjtBQXNCeEJTLFVBdEJ3QixnQkFzQm5CWixHQXRCbUIsRUFzQmQ7QUFDUmEsZ0JBQVFDLEdBQVIsQ0FBWSxnQkFBWixFQUE4QmQsR0FBOUI7QUFDQSxlQUFPQSxHQUFQO0FBQ0Q7QUF6QnVCLEtBQTFCO0FBSmE7QUErQmQ7Ozs7K0JBRVU7QUFDVCxXQUFLZSxTQUFMO0FBQ0Q7OzswQkFFTUMsQyxFQUFHO0FBQ1IsYUFBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBVyxZQUFNO0FBQ2ZGLGtCQUFRLGtCQUFSO0FBQ0QsU0FGRCxFQUVHRixJQUFJLElBRlA7QUFHRCxPQUpNLENBQVA7QUFLRDs7Ozs7Ozs7Ozs7dUJBR29CLEtBQUtLLEtBQUwsQ0FBVyxDQUFYLEM7OztBQUFiZixvQjs7QUFDTk8sd0JBQVFDLEdBQVIsQ0FBWVIsSUFBWjs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dDQUdVZ0IsRSxFQUFJO0FBQ2QsVUFBTUMsT0FBTyxJQUFiO0FBQ0EsVUFBSSxLQUFLOUIsVUFBTCxDQUFnQkMsUUFBcEIsRUFBOEI7QUFDNUIsZUFBTyxLQUFLRCxVQUFMLENBQWdCQyxRQUF2QjtBQUNEO0FBQ0Q4QixxQkFBS0MsV0FBTCxDQUFpQjtBQUNmdkIsZUFEZSxtQkFDTkMsR0FETSxFQUNEO0FBQ1pvQixlQUFLOUIsVUFBTCxDQUFnQkMsUUFBaEIsR0FBMkJTLElBQUlULFFBQS9CO0FBQ0E0QixnQkFBTUEsR0FBR25CLElBQUlULFFBQVAsQ0FBTjtBQUNEO0FBSmMsT0FBakI7QUFNRDs7OztFQXJIMEI4QixlQUFLRSxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnIzAwMDAwMCcsXG4gICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ3doaXRlJyxcbiAgICBwYWdlczogW1xuICAgICAgJ3BhZ2VzL3pvbmUnLFxuICAgICAgJ3BhZ2VzL2NsYXNzTGlzdCcsXG4gICAgICAncGFnZXMvYmluZFJlbGF0aW9uc2hpcCcsXG4gICAgICAncGFnZXMvYXV0aG9yaXplJyxcbiAgICAgICdwYWdlcy9wdWJsaXNoJyxcbiAgICAgICdwYWdlcy9sb2dpbicsXG4gICAgICAncGFnZXMvY2FzaFdpdGhkcmF3JyxcbiAgICAgICdwYWdlcy9iaW5kUGhvbmUnLFxuICAgICAgJ3BhZ2VzL2Nhc2hmbG93JyxcbiAgICAgICdwYWdlcy9waG90b3MnLFxuICAgICAgJ3BhZ2VzL3JlY29yZENhc2hmbG93JyxcbiAgICAgICdwYWdlcy9jcmVhdGVDbGFzc0ZhaWwnLFxuICAgICAgJ3BhZ2VzL2NyZWF0ZUNsYXNzU3VjY2VzcycsXG4gICAgICAncGFnZXMvam9pbkNsYXNzJyxcbiAgICAgICdwYWdlcy9jcmVhdGVDbGFzcydcbiAgICBdLFxuICAgIHdpbmRvdzoge1xuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdXZUNoYXQnLFxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJ1xuICAgIH0sXG4gICAgdGFiQmFyOiB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcbiAgICAgIGJvcmRlclN0eWxlOiAnd2hpdGUnLFxuICAgICAgcG9zaXRpb246ICdib3R0b20nLFxuICAgICAgc2VsZWN0ZWRDb2xvcjogJyNmZjc4MTEnLFxuICAgICAgbGlzdDogW1xuICAgICAgICB7XG4gICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy96b25lJyxcbiAgICAgICAgICBpY29uUGF0aDogJ2ltYWdlcy90YWIvaW5kZXgucG5nJyxcbiAgICAgICAgICB0ZXh0OiAn6aaW6aG1JyxcbiAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2VzL3RhYi9pbmRleC1hY3RpdmUucG5nJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9jbGFzc0xpc3QnLFxuICAgICAgICAgIGljb25QYXRoOiAnaW1hZ2VzL3RhYi9vcmRlci5wbmcnLFxuICAgICAgICAgIHRleHQ6ICfnj63nuqcnLFxuICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZXMvdGFiL29yZGVyLWFjdGl2ZS5wbmcnXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH1cblxuICBnbG9iYWxEYXRhID0ge1xuICAgIHVzZXJJbmZvOiBudWxsLFxuICAgIGFwaVVybDogJ2h0dHBzOi8vdGVzdC5jdGp3aC5jb20vYXBpL3YxJyxcbiAgICB1c2VyRGF0YToge30sXG4gICAgY2xhc3NIYXNDaGFuZ2U6IGZhbHNlXG4gIH1cbiAgXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxuICAgIHRoaXMudXNlKCdwcm9taXNpZnknKVxuICAgIHRoaXMuaW50ZXJjZXB0KCdyZXF1ZXN0Jywge1xuXG4gICAgICBjb25maWcocmVxKSB7XG4gICAgICAgIC8vIHJlcS51cmwgPSAnaHR0cDovLzEyNy4wLjAuMTozMDAwL21vY2svMTEvYXBpL3YxJyArIHJlcS51cmxcbiAgICAgICAgcmVxLnVybCA9ICdodHRwczovL3Rlc3QuY3Rqd2guY29tL2FwaS92MScgKyByZXEudXJsXG4gICAgICAgIC8vIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgLy8gICB0aXRsZTogJ+WKoOi9veS4rScsXG4gICAgICAgIC8vICAgbWFzazogdHJ1ZVxuICAgICAgICAvLyB9KVxuICAgICAgICByZXR1cm4gcmVxXG4gICAgICB9LFxuICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgICBpZiAoIXJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6IHJlcy5kYXRhLmVycm9yX21zZyxcbiAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzXG4gICAgICB9LFxuICAgICAgZmFpbChyZXEpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3JlcXVlc3QgZmFpbDogJywgcmVxKVxuICAgICAgICByZXR1cm4gcmVxXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIG9uTGF1bmNoKCkge1xuICAgIHRoaXMudGVzdEFzeW5jKClcbiAgfVxuXG4gIHNsZWVwIChzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICByZXNvbHZlKCdwcm9taXNlIHJlc29sdmVkJylcbiAgICAgIH0sIHMgKiAxMDAwKVxuICAgIH0pXG4gIH1cblxuICBhc3luYyB0ZXN0QXN5bmMgKCkge1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLnNsZWVwKDMpXG4gICAgY29uc29sZS5sb2coZGF0YSlcbiAgfVxuXG4gIGdldFVzZXJJbmZvKGNiKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXNcbiAgICBpZiAodGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XG4gICAgICByZXR1cm4gdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvXG4gICAgfVxuICAgIHdlcHkuZ2V0VXNlckluZm8oe1xuICAgICAgc3VjY2VzcyAocmVzKSB7XG4gICAgICAgIHRoYXQuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xuICAgICAgICBjYiAmJiBjYihyZXMudXNlckluZm8pXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuIl19