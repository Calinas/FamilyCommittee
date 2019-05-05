'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

var _wepyRedux = require('./npm/wepy-redux/lib/index.js');

var _store = require('./store/index.js');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var store = (0, _store2.default)();
(0, _wepyRedux.setStore)(store);

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

    _this.config = {
      navigationBarBackgroundColor: '#000000',
      navigationBarTextStyle: 'white',
      pages: ['pages/zone', 'pages/personalCashflow', 'pages/classList', 'pages/bindRelationship', 'pages/authorize', 'pages/publish', 'pages/login', 'pages/cashWithdraw', 'pages/cashflow', 'pages/photos', 'pages/recordCashflow', 'pages/createClassFail', 'pages/createClassSuccess', 'pages/joinClass', 'pages/createClass', 'pages/member', 'pages/discovery', 'pages/withdraw', 'pages/advice'],
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
      userData: {},
      classHasChange: false
    };

    _this.use('requestfix');
    _this.use('promisify');

    _this.intercept('request', {
      config: function config(req) {
        req.url = _wepy2.default.$appConfig.baseUrl + req.url;
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
          if (Number(code) === 100010) {
            wx.clearStorageSync();
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
    }
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"],"baseUrl":"https://test.ctjwh.com/api/v1"}));
require('./_wepylogs.js')

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJzdG9yZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwicGFnZXMiLCJwZXJtaXNzaW9uIiwiZGVzYyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwidGFiQmFyIiwiYmFja2dyb3VuZENvbG9yIiwiYm9yZGVyU3R5bGUiLCJwb3NpdGlvbiIsInNlbGVjdGVkQ29sb3IiLCJsaXN0IiwicGFnZVBhdGgiLCJpY29uUGF0aCIsInRleHQiLCJzZWxlY3RlZEljb25QYXRoIiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwidXNlckRhdGEiLCJjbGFzc0hhc0NoYW5nZSIsInVzZSIsImludGVyY2VwdCIsInJlcSIsInVybCIsIndlcHkiLCIkYXBwQ29uZmlnIiwiYmFzZVVybCIsInd4Iiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsIm1hc2siLCJzdWNjZXNzIiwicmVzIiwiaGlkZUxvYWRpbmciLCJkYXRhIiwibXNnIiwiZXJyb3JfbXNnIiwiY29kZSIsImVycm9yX2NvZGUiLCJzaG93VG9hc3QiLCJpY29uIiwiZHVyYXRpb24iLCJOdW1iZXIiLCJjbGVhclN0b3JhZ2VTeW5jIiwicmVMYXVuY2giLCJmYWlsIiwiY29uc29sZSIsImxvZyIsImdldFVwZGF0ZU1hbmFnZXIiLCJ1cGRhdGVNYW5hZ2VyIiwib25VcGRhdGVSZWFkeSIsImFwcGx5VXBkYXRlIiwic2hvd01vZGFsIiwic2hvd0NhbmNlbCIsImNvbnRlbnQiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFFBQVEsc0JBQWQ7QUFDQSx5QkFBU0EsS0FBVDs7Ozs7QUF3RUUsc0JBQWU7QUFBQTs7QUFBQTs7QUFBQSxVQXJFZkMsTUFxRWUsR0FyRU47QUFDUEMsb0NB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QWE7QUFDWEMsc0JBQVksS0FERDtBQUVYeEIsaUJBQU8sVUFGSTtBQUdYeUIsbUJBQVM7QUFIRSxTQUFiO0FBS0Q7QUFDRjs7OztFQTFIMEI5QixlQUFLK0IsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgJ3dlcHktYXN5bmMtZnVuY3Rpb24nXG5pbXBvcnQgeyBzZXRTdG9yZSB9IGZyb20gJ3dlcHktcmVkdXgnXG5pbXBvcnQgY29uZmlnU3RvcmUgZnJvbSAnLi9zdG9yZSdcblxuY29uc3Qgc3RvcmUgPSBjb25maWdTdG9yZSgpXG5zZXRTdG9yZShzdG9yZSlcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnIzAwMDAwMCcsXG4gICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ3doaXRlJyxcbiAgICBwYWdlczogW1xuICAgICAgJ3BhZ2VzL3pvbmUnLFxuICAgICAgJ3BhZ2VzL3BlcnNvbmFsQ2FzaGZsb3cnLFxuICAgICAgJ3BhZ2VzL2NsYXNzTGlzdCcsXG4gICAgICAncGFnZXMvYmluZFJlbGF0aW9uc2hpcCcsXG4gICAgICAncGFnZXMvYXV0aG9yaXplJyxcbiAgICAgICdwYWdlcy9wdWJsaXNoJyxcbiAgICAgICdwYWdlcy9sb2dpbicsXG4gICAgICAncGFnZXMvY2FzaFdpdGhkcmF3JyxcbiAgICAgICdwYWdlcy9jYXNoZmxvdycsXG4gICAgICAncGFnZXMvcGhvdG9zJyxcbiAgICAgICdwYWdlcy9yZWNvcmRDYXNoZmxvdycsXG4gICAgICAncGFnZXMvY3JlYXRlQ2xhc3NGYWlsJyxcbiAgICAgICdwYWdlcy9jcmVhdGVDbGFzc1N1Y2Nlc3MnLFxuICAgICAgJ3BhZ2VzL2pvaW5DbGFzcycsXG4gICAgICAncGFnZXMvY3JlYXRlQ2xhc3MnLFxuICAgICAgJ3BhZ2VzL21lbWJlcicsXG4gICAgICAncGFnZXMvZGlzY292ZXJ5JyxcbiAgICAgICdwYWdlcy93aXRoZHJhdycsXG4gICAgICAncGFnZXMvYWR2aWNlJ1xuICAgIF0sXG4gICAgcGVybWlzc2lvbjoge1xuICAgICAgJ3Njb3BlLnVzZXJMb2NhdGlvbic6IHtcbiAgICAgICAgZGVzYzogJ+S9oOeahOS9jee9ruS/oeaBr+WwhueUqOS6juWwj+eoi+W6j+S9jee9ruaOpeWPo+eahOaViOaenOWxleekuidcbiAgICAgIH1cbiAgICB9LFxuICAgIHdpbmRvdzoge1xuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdXZUNoYXQnLFxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJ1xuICAgIH0sXG4gICAgdGFiQmFyOiB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcbiAgICAgIGJvcmRlclN0eWxlOiAnd2hpdGUnLFxuICAgICAgcG9zaXRpb246ICdib3R0b20nLFxuICAgICAgc2VsZWN0ZWRDb2xvcjogJyNmZjc4MTEnLFxuICAgICAgbGlzdDogW1xuICAgICAgICB7XG4gICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy96b25lJyxcbiAgICAgICAgICBpY29uUGF0aDogJ2ltYWdlcy90YWIvaW5kZXgucG5nJyxcbiAgICAgICAgICB0ZXh0OiAn5pyA6L+R54+t57qnJyxcbiAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2VzL3RhYi9pbmRleC1hY3RpdmUucG5nJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9kaXNjb3ZlcnknLFxuICAgICAgICAgIGljb25QYXRoOiAnaW1hZ2VzL3RhYi9vcmRlci5wbmcnLFxuICAgICAgICAgIHRleHQ6ICflrrbplb/lnIjlrZAnLFxuICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZXMvdGFiL29yZGVyLWFjdGl2ZS5wbmcnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2NsYXNzTGlzdCcsXG4gICAgICAgICAgaWNvblBhdGg6ICdpbWFnZXMvdGFiL215LnBuZycsXG4gICAgICAgICAgdGV4dDogJ+aIkeeahOePree6pycsXG4gICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlcy90YWIvbXktYWN0aXZlLnBuZydcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgfVxuXG4gIGdsb2JhbERhdGEgPSB7XG4gICAgdXNlckluZm86IG51bGwsXG4gICAgdXNlckRhdGE6IHt9LFxuICAgIGNsYXNzSGFzQ2hhbmdlOiBmYWxzZVxuICB9XG5cbiAgY29uc3RydWN0b3IgKCkge1xuXG4gICAgc3VwZXIoKVxuICAgIHRoaXMudXNlKCdyZXF1ZXN0Zml4JylcbiAgICB0aGlzLnVzZSgncHJvbWlzaWZ5JylcblxuICAgIHRoaXMuaW50ZXJjZXB0KCdyZXF1ZXN0Jywge1xuICAgICAgY29uZmlnKHJlcSkge1xuICAgICAgICByZXEudXJsID0gd2VweS4kYXBwQ29uZmlnLmJhc2VVcmwgKyByZXEudXJsXG4gICAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXG4gICAgICAgICAgbWFzazogdHJ1ZVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gcmVxXG4gICAgICB9LFxuICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhXG4gICAgICAgIGlmICghZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgbGV0IG1zZyA9IGRhdGEuZXJyb3JfbXNnXG4gICAgICAgICAgbGV0IGNvZGUgPSBkYXRhLmVycm9yX2NvZGVcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6IG1zZyxcbiAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgfSlcbiAgICAgICAgICBpZiAoTnVtYmVyKGNvZGUpID09PSAxMDAwMTAgKSB7XG4gICAgICAgICAgICB3eC5jbGVhclN0b3JhZ2VTeW5jKClcbiAgICAgICAgICAgIHd4LnJlTGF1bmNoKHt1cmw6ICdsb2dpbid9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzXG4gICAgICB9LFxuICAgICAgZmFpbChyZXEpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3JlcXVlc3QgZmFpbDogJywgcmVxKVxuICAgICAgICByZXR1cm4gcmVxXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBvbkxhdW5jaCgpIHtcbiAgICBpZiAod3guZ2V0VXBkYXRlTWFuYWdlcikge1xuICAgICAgY29uc3QgdXBkYXRlTWFuYWdlciA9IHd4LmdldFVwZGF0ZU1hbmFnZXIoKVxuICAgICAgdXBkYXRlTWFuYWdlci5vblVwZGF0ZVJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdXBkYXRlTWFuYWdlci5hcHBseVVwZGF0ZSgpXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgdGl0bGU6ICflvZPliY3lvq7kv6HniYjmnKzov4fkvY4nLFxuICAgICAgICBjb250ZW50OiAn6YOo5YiG5Yqf6IO95Y+v6IO95peg5rOV5L2/55So77yM6K+35Y2H57qn5Yiw5pyA5paw5b6u5L+h54mI5pys5ZCO6YeN6K+V44CCJ1xuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cbiJdfQ==