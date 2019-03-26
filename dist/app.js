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
      pages: ['pages/zone', 'pages/personalCashflow', 'pages/classList', 'pages/bindRelationship', 'pages/authorize', 'pages/publish', 'pages/login', 'pages/cashWithdraw', 'pages/bindPhone', 'pages/cashflow', 'pages/photos', 'pages/recordCashflow', 'pages/createClassFail', 'pages/createClassSuccess', 'pages/joinClass', 'pages/createClass', 'pages/member', 'pages/discovery', 'pages/withdraw'],
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsInBhZ2VzIiwicGVybWlzc2lvbiIsImRlc2MiLCJ3aW5kb3ciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsInRhYkJhciIsImJhY2tncm91bmRDb2xvciIsImJvcmRlclN0eWxlIiwicG9zaXRpb24iLCJzZWxlY3RlZENvbG9yIiwibGlzdCIsInBhZ2VQYXRoIiwiaWNvblBhdGgiLCJ0ZXh0Iiwic2VsZWN0ZWRJY29uUGF0aCIsImdsb2JhbERhdGEiLCJ1c2VySW5mbyIsImFwaVVybCIsInVzZXJEYXRhIiwiY2xhc3NIYXNDaGFuZ2UiLCJ1c2UiLCJpbnRlcmNlcHQiLCJyZXEiLCJ1cmwiLCJ3eCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJtYXNrIiwic3VjY2VzcyIsInJlcyIsImhpZGVMb2FkaW5nIiwiZGF0YSIsIm1zZyIsImVycm9yX21zZyIsImNvZGUiLCJlcnJvcl9jb2RlIiwic2hvd1RvYXN0IiwiaWNvbiIsImR1cmF0aW9uIiwiTnVtYmVyIiwicmVMYXVuY2giLCJmYWlsIiwiY29uc29sZSIsImxvZyIsImdldFVwZGF0ZU1hbmFnZXIiLCJ1cGRhdGVNYW5hZ2VyIiwib25VcGRhdGVSZWFkeSIsImFwcGx5VXBkYXRlIiwic2hvd01vZGFsIiwic2hvd0NhbmNlbCIsImNvbnRlbnQiLCJ0ZXN0QXN5bmMiLCJzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzZXRUaW1lb3V0Iiwic2xlZXAiLCJjYiIsInRoYXQiLCJ3ZXB5IiwiZ2V0VXNlckluZm8iLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQXlFRSxzQkFBZTtBQUFBOztBQUFBOztBQUFBLFVBdEVmQSxNQXNFZSxHQXRFTjtBQUNQQyxvQ0FB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QkFBWSxLQUREO0FBRVh2QixpQkFBTyxVQUZJO0FBR1h3QixtQkFBUztBQUhFLFNBQWI7QUFLRDtBQUNELFdBQUtDLFNBQUw7QUFDRDs7OzBCQUVNQyxDLEVBQUc7QUFDUixhQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLG1CQUFXLFlBQU07QUFDZkYsa0JBQVEsa0JBQVI7QUFDRCxTQUZELEVBRUdGLElBQUksSUFGUDtBQUdELE9BSk0sQ0FBUDtBQUtEOzs7Ozs7Ozs7Ozt1QkFHb0IsS0FBS0ssS0FBTCxDQUFXLENBQVgsQzs7O0FBQWIxQixvQjs7QUFDTlcsd0JBQVFDLEdBQVIsQ0FBWVosSUFBWjs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dDQUdVMkIsRSxFQUFJO0FBQ2QsVUFBTUMsT0FBTyxJQUFiO0FBQ0EsVUFBSSxLQUFLNUMsVUFBTCxDQUFnQkMsUUFBcEIsRUFBOEI7QUFDNUIsZUFBTyxLQUFLRCxVQUFMLENBQWdCQyxRQUF2QjtBQUNEO0FBQ0Q0QyxxQkFBS0MsV0FBTCxDQUFpQjtBQUNmakMsZUFEZSxtQkFDTkMsR0FETSxFQUNEO0FBQ1o4QixlQUFLNUMsVUFBTCxDQUFnQkMsUUFBaEIsR0FBMkJhLElBQUliLFFBQS9CO0FBQ0EwQyxnQkFBTUEsR0FBRzdCLElBQUliLFFBQVAsQ0FBTjtBQUNEO0FBSmMsT0FBakI7QUFNRDs7OztFQXRKMEI0QyxlQUFLRSxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnIzAwMDAwMCcsXG4gICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ3doaXRlJyxcbiAgICBwYWdlczogW1xuICAgICAgJ3BhZ2VzL3pvbmUnLFxuICAgICAgJ3BhZ2VzL3BlcnNvbmFsQ2FzaGZsb3cnLFxuICAgICAgJ3BhZ2VzL2NsYXNzTGlzdCcsXG4gICAgICAncGFnZXMvYmluZFJlbGF0aW9uc2hpcCcsXG4gICAgICAncGFnZXMvYXV0aG9yaXplJyxcbiAgICAgICdwYWdlcy9wdWJsaXNoJyxcbiAgICAgICdwYWdlcy9sb2dpbicsXG4gICAgICAncGFnZXMvY2FzaFdpdGhkcmF3JyxcbiAgICAgICdwYWdlcy9iaW5kUGhvbmUnLFxuICAgICAgJ3BhZ2VzL2Nhc2hmbG93JyxcbiAgICAgICdwYWdlcy9waG90b3MnLFxuICAgICAgJ3BhZ2VzL3JlY29yZENhc2hmbG93JyxcbiAgICAgICdwYWdlcy9jcmVhdGVDbGFzc0ZhaWwnLFxuICAgICAgJ3BhZ2VzL2NyZWF0ZUNsYXNzU3VjY2VzcycsXG4gICAgICAncGFnZXMvam9pbkNsYXNzJyxcbiAgICAgICdwYWdlcy9jcmVhdGVDbGFzcycsXG4gICAgICAncGFnZXMvbWVtYmVyJyxcbiAgICAgICdwYWdlcy9kaXNjb3ZlcnknLFxuICAgICAgJ3BhZ2VzL3dpdGhkcmF3J1xuICAgIF0sXG4gICAgcGVybWlzc2lvbjoge1xuICAgICAgJ3Njb3BlLnVzZXJMb2NhdGlvbic6IHtcbiAgICAgICAgZGVzYzogJ+S9oOeahOS9jee9ruS/oeaBr+WwhueUqOS6juWwj+eoi+W6j+S9jee9ruaOpeWPo+eahOaViOaenOWxleekuidcbiAgICAgIH1cbiAgICB9LFxuICAgIHdpbmRvdzoge1xuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdXZUNoYXQnLFxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJ1xuICAgIH0sXG4gICAgdGFiQmFyOiB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcbiAgICAgIGJvcmRlclN0eWxlOiAnd2hpdGUnLFxuICAgICAgcG9zaXRpb246ICdib3R0b20nLFxuICAgICAgc2VsZWN0ZWRDb2xvcjogJyNmZjc4MTEnLFxuICAgICAgbGlzdDogW1xuICAgICAgICB7XG4gICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy96b25lJyxcbiAgICAgICAgICBpY29uUGF0aDogJ2ltYWdlcy90YWIvaW5kZXgucG5nJyxcbiAgICAgICAgICB0ZXh0OiAn5pyA6L+R54+t57qnJyxcbiAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2VzL3RhYi9pbmRleC1hY3RpdmUucG5nJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9kaXNjb3ZlcnknLFxuICAgICAgICAgIGljb25QYXRoOiAnaW1hZ2VzL3RhYi9vcmRlci5wbmcnLFxuICAgICAgICAgIHRleHQ6ICflrrbplb/lnIjlrZAnLFxuICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZXMvdGFiL29yZGVyLWFjdGl2ZS5wbmcnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2NsYXNzTGlzdCcsXG4gICAgICAgICAgaWNvblBhdGg6ICdpbWFnZXMvdGFiL215LnBuZycsXG4gICAgICAgICAgdGV4dDogJ+aIkeeahOePree6pycsXG4gICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlcy90YWIvbXktYWN0aXZlLnBuZydcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgfVxuXG4gIGdsb2JhbERhdGEgPSB7XG4gICAgdXNlckluZm86IG51bGwsXG4gICAgYXBpVXJsOiAnaHR0cHM6Ly90ZXN0LmN0andoLmNvbS9hcGkvdjEnLFxuICAgIHVzZXJEYXRhOiB7fSxcbiAgICBjbGFzc0hhc0NoYW5nZTogZmFsc2VcbiAgfVxuXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxuICAgIHRoaXMudXNlKCdwcm9taXNpZnknKVxuICAgIHRoaXMuaW50ZXJjZXB0KCdyZXF1ZXN0Jywge1xuXG4gICAgICBjb25maWcocmVxKSB7XG4gICAgICAgIC8vIHJlcS51cmwgPSAnaHR0cDovL3d3dy5wYXRyaWFyY2guY206ODA4MC9hcGkvdjEnICsgcmVxLnVybFxuICAgICAgICByZXEudXJsID0gJ2h0dHBzOi8vdGVzdC5jdGp3aC5jb20vYXBpL3YxJyArIHJlcS51cmxcbiAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcbiAgICAgICAgICBtYXNrOiB0cnVlXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiByZXFcbiAgICAgIH0sXG4gICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGFcbiAgICAgICAgaWYgKCFkYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICBsZXQgbXNnID0gZGF0YS5lcnJvcl9tc2dcbiAgICAgICAgICBsZXQgY29kZSA9IGRhdGEuZXJyb3JfY29kZVxuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogbXNnLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgICB9KVxuICAgICAgICAgIGlmIChOdW1iZXIoY29kZSkgPT09IDEwMDAxMCB8fCBOdW1iZXIoKSkge1xuICAgICAgICAgICAgd3gucmVMYXVuY2goe3VybDogJ2xvZ2luJ30pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNcbiAgICAgIH0sXG4gICAgICBmYWlsKHJlcSkge1xuICAgICAgICBjb25zb2xlLmxvZygncmVxdWVzdCBmYWlsOiAnLCByZXEpXG4gICAgICAgIHJldHVybiByZXFcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgb25MYXVuY2goKSB7XG4gICAgaWYgKHd4LmdldFVwZGF0ZU1hbmFnZXIpIHtcbiAgICAgIGNvbnN0IHVwZGF0ZU1hbmFnZXIgPSB3eC5nZXRVcGRhdGVNYW5hZ2VyKClcbiAgICAgIHVwZGF0ZU1hbmFnZXIub25VcGRhdGVSZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgICAgIHVwZGF0ZU1hbmFnZXIuYXBwbHlVcGRhdGUoKVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgIHRpdGxlOiAn5b2T5YmN5b6u5L+h54mI5pys6L+H5L2OJyxcbiAgICAgICAgY29udGVudDogJ+mDqOWIhuWKn+iDveWPr+iDveaXoOazleS9v+eUqO+8jOivt+WNh+e6p+WIsOacgOaWsOW+ruS/oeeJiOacrOWQjumHjeivleOAgidcbiAgICAgIH0pXG4gICAgfVxuICAgIHRoaXMudGVzdEFzeW5jKClcbiAgfVxuXG4gIHNsZWVwIChzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICByZXNvbHZlKCdwcm9taXNlIHJlc29sdmVkJylcbiAgICAgIH0sIHMgKiAxMDAwKVxuICAgIH0pXG4gIH1cblxuICBhc3luYyB0ZXN0QXN5bmMgKCkge1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLnNsZWVwKDMpXG4gICAgY29uc29sZS5sb2coZGF0YSlcbiAgfVxuXG4gIGdldFVzZXJJbmZvKGNiKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXNcbiAgICBpZiAodGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XG4gICAgICByZXR1cm4gdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvXG4gICAgfVxuICAgIHdlcHkuZ2V0VXNlckluZm8oe1xuICAgICAgc3VjY2VzcyAocmVzKSB7XG4gICAgICAgIHRoYXQuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xuICAgICAgICBjYiAmJiBjYihyZXMudXNlckluZm8pXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuIl19