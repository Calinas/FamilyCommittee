'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      pages: ['pages/zone', 'pages/personalCashflow', 'pages/classList', 'pages/bindRelationship', 'pages/authorize', 'pages/publish', 'pages/login', 'pages/cashWithdraw', 'pages/cashflow', 'pages/photos', 'pages/recordCashflow', 'pages/createClassFail', 'pages/createClassSuccess', 'pages/joinClass', 'pages/createClass', 'pages/member', 'pages/discovery', 'pages/withdraw'],
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
        // req.url = 'http://www.patriarch.cm/api/v1' + req.url
        req.url = 'https://test.ctjwh.com/api/v1' + req.url;
        // req.url = 'https://www.ctjwh.com/api/v1' + req.url
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


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));
require('./_wepylogs.js')

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsInBhZ2VzIiwicGVybWlzc2lvbiIsImRlc2MiLCJ3aW5kb3ciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsInRhYkJhciIsImJhY2tncm91bmRDb2xvciIsImJvcmRlclN0eWxlIiwicG9zaXRpb24iLCJzZWxlY3RlZENvbG9yIiwibGlzdCIsInBhZ2VQYXRoIiwiaWNvblBhdGgiLCJ0ZXh0Iiwic2VsZWN0ZWRJY29uUGF0aCIsImdsb2JhbERhdGEiLCJ1c2VySW5mbyIsImFwaVVybCIsInVzZXJEYXRhIiwiY2xhc3NIYXNDaGFuZ2UiLCJ1c2UiLCJpbnRlcmNlcHQiLCJyZXEiLCJ1cmwiLCJ3eCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJtYXNrIiwic3VjY2VzcyIsInJlcyIsImhpZGVMb2FkaW5nIiwiZGF0YSIsIm1zZyIsImVycm9yX21zZyIsImNvZGUiLCJlcnJvcl9jb2RlIiwic2hvd1RvYXN0IiwiaWNvbiIsImR1cmF0aW9uIiwiTnVtYmVyIiwicmVMYXVuY2giLCJmYWlsIiwiY29uc29sZSIsImxvZyIsImdldFVwZGF0ZU1hbmFnZXIiLCJ1cGRhdGVNYW5hZ2VyIiwib25VcGRhdGVSZWFkeSIsImFwcGx5VXBkYXRlIiwic2hvd01vZGFsIiwic2hvd0NhbmNlbCIsImNvbnRlbnQiLCJ3ZXB5IiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7O0FBd0VFLHNCQUFlO0FBQUE7O0FBQUE7O0FBQUEsVUFyRWZBLE1BcUVlLEdBckVOO0FBQ1BDLG9DQUE4QixTQUR2QjtBQUVQQyw4QkFBd0IsT0FGakI7QUFHUEMsYUFBTyxDQUNMLFlBREssRUFFTCx3QkFGSyxFQUdMLGlCQUhLLEVBSUwsd0JBSkssRUFLTCxpQkFMSyxF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IlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnIzAwMDAwMCcsXG4gICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ3doaXRlJyxcbiAgICBwYWdlczogW1xuICAgICAgJ3BhZ2VzL3pvbmUnLFxuICAgICAgJ3BhZ2VzL3BlcnNvbmFsQ2FzaGZsb3cnLFxuICAgICAgJ3BhZ2VzL2NsYXNzTGlzdCcsXG4gICAgICAncGFnZXMvYmluZFJlbGF0aW9uc2hpcCcsXG4gICAgICAncGFnZXMvYXV0aG9yaXplJyxcbiAgICAgICdwYWdlcy9wdWJsaXNoJyxcbiAgICAgICdwYWdlcy9sb2dpbicsXG4gICAgICAncGFnZXMvY2FzaFdpdGhkcmF3JyxcbiAgICAgICdwYWdlcy9jYXNoZmxvdycsXG4gICAgICAncGFnZXMvcGhvdG9zJyxcbiAgICAgICdwYWdlcy9yZWNvcmRDYXNoZmxvdycsXG4gICAgICAncGFnZXMvY3JlYXRlQ2xhc3NGYWlsJyxcbiAgICAgICdwYWdlcy9jcmVhdGVDbGFzc1N1Y2Nlc3MnLFxuICAgICAgJ3BhZ2VzL2pvaW5DbGFzcycsXG4gICAgICAncGFnZXMvY3JlYXRlQ2xhc3MnLFxuICAgICAgJ3BhZ2VzL21lbWJlcicsXG4gICAgICAncGFnZXMvZGlzY292ZXJ5JyxcbiAgICAgICdwYWdlcy93aXRoZHJhdydcbiAgICBdLFxuICAgIHBlcm1pc3Npb246IHtcbiAgICAgICdzY29wZS51c2VyTG9jYXRpb24nOiB7XG4gICAgICAgIGRlc2M6ICfkvaDnmoTkvY3nva7kv6Hmga/lsIbnlKjkuo7lsI/nqIvluo/kvY3nva7mjqXlj6PnmoTmlYjmnpzlsZXnpLonXG4gICAgICB9XG4gICAgfSxcbiAgICB3aW5kb3c6IHtcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdsaWdodCcsXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnV2VDaGF0JyxcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaydcbiAgICB9LFxuICAgIHRhYkJhcjoge1xuICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXG4gICAgICBib3JkZXJTdHlsZTogJ3doaXRlJyxcbiAgICAgIHBvc2l0aW9uOiAnYm90dG9tJyxcbiAgICAgIHNlbGVjdGVkQ29sb3I6ICcjZmY3ODExJyxcbiAgICAgIGxpc3Q6IFtcbiAgICAgICAge1xuICAgICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvem9uZScsXG4gICAgICAgICAgaWNvblBhdGg6ICdpbWFnZXMvdGFiL2luZGV4LnBuZycsXG4gICAgICAgICAgdGV4dDogJ+acgOi/keePree6pycsXG4gICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlcy90YWIvaW5kZXgtYWN0aXZlLnBuZydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvZGlzY292ZXJ5JyxcbiAgICAgICAgICBpY29uUGF0aDogJ2ltYWdlcy90YWIvb3JkZXIucG5nJyxcbiAgICAgICAgICB0ZXh0OiAn5a626ZW/5ZyI5a2QJyxcbiAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2VzL3RhYi9vcmRlci1hY3RpdmUucG5nJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9jbGFzc0xpc3QnLFxuICAgICAgICAgIGljb25QYXRoOiAnaW1hZ2VzL3RhYi9teS5wbmcnLFxuICAgICAgICAgIHRleHQ6ICfmiJHnmoTnj63nuqcnLFxuICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZXMvdGFiL215LWFjdGl2ZS5wbmcnXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH1cblxuICBnbG9iYWxEYXRhID0ge1xuICAgIHVzZXJJbmZvOiBudWxsLFxuICAgIGFwaVVybDogJ2h0dHBzOi8vdGVzdC5jdGp3aC5jb20vYXBpL3YxJyxcbiAgICB1c2VyRGF0YToge30sXG4gICAgY2xhc3NIYXNDaGFuZ2U6IGZhbHNlXG4gIH1cblxuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMudXNlKCdyZXF1ZXN0Zml4JylcbiAgICB0aGlzLnVzZSgncHJvbWlzaWZ5JylcbiAgICB0aGlzLmludGVyY2VwdCgncmVxdWVzdCcsIHtcblxuICAgICAgY29uZmlnKHJlcSkge1xuICAgICAgICAvLyByZXEudXJsID0gJ2h0dHA6Ly93d3cucGF0cmlhcmNoLmNtL2FwaS92MScgKyByZXEudXJsXG4gICAgICAgIHJlcS51cmwgPSAnaHR0cHM6Ly90ZXN0LmN0andoLmNvbS9hcGkvdjEnICsgcmVxLnVybFxuICAgICAgICAvLyByZXEudXJsID0gJ2h0dHBzOi8vd3d3LmN0andoLmNvbS9hcGkvdjEnICsgcmVxLnVybFxuICAgICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxuICAgICAgICAgIG1hc2s6IHRydWVcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHJlcVxuICAgICAgfSxcbiAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YVxuICAgICAgICBpZiAoIWRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgIGxldCBtc2cgPSBkYXRhLmVycm9yX21zZ1xuICAgICAgICAgIGxldCBjb2RlID0gZGF0YS5lcnJvcl9jb2RlXG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiBtc2csXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgICAgIH0pXG4gICAgICAgICAgaWYgKE51bWJlcihjb2RlKSA9PT0gMTAwMDEwICkge1xuICAgICAgICAgICAgd3gucmVMYXVuY2goe3VybDogJ2xvZ2luJ30pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNcbiAgICAgIH0sXG4gICAgICBmYWlsKHJlcSkge1xuICAgICAgICBjb25zb2xlLmxvZygncmVxdWVzdCBmYWlsOiAnLCByZXEpXG4gICAgICAgIHJldHVybiByZXFcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgb25MYXVuY2goKSB7XG4gICAgaWYgKHd4LmdldFVwZGF0ZU1hbmFnZXIpIHtcbiAgICAgIGNvbnN0IHVwZGF0ZU1hbmFnZXIgPSB3eC5nZXRVcGRhdGVNYW5hZ2VyKClcbiAgICAgIHVwZGF0ZU1hbmFnZXIub25VcGRhdGVSZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgICAgIHVwZGF0ZU1hbmFnZXIuYXBwbHlVcGRhdGUoKVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgIHRpdGxlOiAn5b2T5YmN5b6u5L+h54mI5pys6L+H5L2OJyxcbiAgICAgICAgY29udGVudDogJ+mDqOWIhuWKn+iDveWPr+iDveaXoOazleS9v+eUqO+8jOivt+WNh+e6p+WIsOacgOaWsOW+ruS/oeeJiOacrOWQjumHjeivleOAgidcbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG4iXX0=