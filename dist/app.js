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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJzdG9yZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwicGFnZXMiLCJwZXJtaXNzaW9uIiwiZGVzYyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwidGFiQmFyIiwiYmFja2dyb3VuZENvbG9yIiwiYm9yZGVyU3R5bGUiLCJwb3NpdGlvbiIsInNlbGVjdGVkQ29sb3IiLCJsaXN0IiwicGFnZVBhdGgiLCJpY29uUGF0aCIsInRleHQiLCJzZWxlY3RlZEljb25QYXRoIiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwiYXBpVXJsIiwidXNlckRhdGEiLCJjbGFzc0hhc0NoYW5nZSIsInVzZSIsImludGVyY2VwdCIsInJlcSIsInVybCIsInd4Iiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsIm1hc2siLCJzdWNjZXNzIiwicmVzIiwiaGlkZUxvYWRpbmciLCJkYXRhIiwibXNnIiwiZXJyb3JfbXNnIiwiY29kZSIsImVycm9yX2NvZGUiLCJzaG93VG9hc3QiLCJpY29uIiwiZHVyYXRpb24iLCJOdW1iZXIiLCJyZUxhdW5jaCIsImZhaWwiLCJjb25zb2xlIiwibG9nIiwiZ2V0VXBkYXRlTWFuYWdlciIsInVwZGF0ZU1hbmFnZXIiLCJvblVwZGF0ZVJlYWR5IiwiYXBwbHlVcGRhdGUiLCJzaG93TW9kYWwiLCJzaG93Q2FuY2VsIiwiY29udGVudCIsIndlcHkiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFFBQVEsc0JBQWQ7QUFDQSx5QkFBU0EsS0FBVDs7Ozs7QUF5RUUsc0JBQWU7QUFBQTs7QUFBQTs7QUFBQSxVQXRFZkMsTUFzRWUsR0F0RU47QUFDUEMsb0NBQThCLFNBRHZCO0FBRVBDLDhCQUF3QixPQUZqQjtBQUdQ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QUFIRSxTQUFiO0FBS0Q7QUFDRjs7OztFQTVIMEJDLGVBQUtDLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xuaW1wb3J0IHsgc2V0U3RvcmUgfSBmcm9tICd3ZXB5LXJlZHV4J1xuaW1wb3J0IGNvbmZpZ1N0b3JlIGZyb20gJy4vc3RvcmUnXG5cbmNvbnN0IHN0b3JlID0gY29uZmlnU3RvcmUoKVxuc2V0U3RvcmUoc3RvcmUpXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyMwMDAwMDAnLFxuICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICd3aGl0ZScsXG4gICAgcGFnZXM6IFtcbiAgICAgICdwYWdlcy96b25lJyxcbiAgICAgICdwYWdlcy9wZXJzb25hbENhc2hmbG93JyxcbiAgICAgICdwYWdlcy9jbGFzc0xpc3QnLFxuICAgICAgJ3BhZ2VzL2JpbmRSZWxhdGlvbnNoaXAnLFxuICAgICAgJ3BhZ2VzL2F1dGhvcml6ZScsXG4gICAgICAncGFnZXMvcHVibGlzaCcsXG4gICAgICAncGFnZXMvbG9naW4nLFxuICAgICAgJ3BhZ2VzL2Nhc2hXaXRoZHJhdycsXG4gICAgICAncGFnZXMvY2FzaGZsb3cnLFxuICAgICAgJ3BhZ2VzL3Bob3RvcycsXG4gICAgICAncGFnZXMvcmVjb3JkQ2FzaGZsb3cnLFxuICAgICAgJ3BhZ2VzL2NyZWF0ZUNsYXNzRmFpbCcsXG4gICAgICAncGFnZXMvY3JlYXRlQ2xhc3NTdWNjZXNzJyxcbiAgICAgICdwYWdlcy9qb2luQ2xhc3MnLFxuICAgICAgJ3BhZ2VzL2NyZWF0ZUNsYXNzJyxcbiAgICAgICdwYWdlcy9tZW1iZXInLFxuICAgICAgJ3BhZ2VzL2Rpc2NvdmVyeScsXG4gICAgICAncGFnZXMvd2l0aGRyYXcnLFxuICAgICAgJ3BhZ2VzL2FkdmljZSdcbiAgICBdLFxuICAgIHBlcm1pc3Npb246IHtcbiAgICAgICdzY29wZS51c2VyTG9jYXRpb24nOiB7XG4gICAgICAgIGRlc2M6ICfkvaDnmoTkvY3nva7kv6Hmga/lsIbnlKjkuo7lsI/nqIvluo/kvY3nva7mjqXlj6PnmoTmlYjmnpzlsZXnpLonXG4gICAgICB9XG4gICAgfSxcbiAgICB3aW5kb3c6IHtcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdsaWdodCcsXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnV2VDaGF0JyxcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaydcbiAgICB9LFxuICAgIHRhYkJhcjoge1xuICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXG4gICAgICBib3JkZXJTdHlsZTogJ3doaXRlJyxcbiAgICAgIHBvc2l0aW9uOiAnYm90dG9tJyxcbiAgICAgIHNlbGVjdGVkQ29sb3I6ICcjZmY3ODExJyxcbiAgICAgIGxpc3Q6IFtcbiAgICAgICAge1xuICAgICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvem9uZScsXG4gICAgICAgICAgaWNvblBhdGg6ICdpbWFnZXMvdGFiL2luZGV4LnBuZycsXG4gICAgICAgICAgdGV4dDogJ+acgOi/keePree6pycsXG4gICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlcy90YWIvaW5kZXgtYWN0aXZlLnBuZydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvZGlzY292ZXJ5JyxcbiAgICAgICAgICBpY29uUGF0aDogJ2ltYWdlcy90YWIvb3JkZXIucG5nJyxcbiAgICAgICAgICB0ZXh0OiAn5a626ZW/5ZyI5a2QJyxcbiAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2VzL3RhYi9vcmRlci1hY3RpdmUucG5nJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9jbGFzc0xpc3QnLFxuICAgICAgICAgIGljb25QYXRoOiAnaW1hZ2VzL3RhYi9teS5wbmcnLFxuICAgICAgICAgIHRleHQ6ICfmiJHnmoTnj63nuqcnLFxuICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZXMvdGFiL215LWFjdGl2ZS5wbmcnXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH1cblxuICBnbG9iYWxEYXRhID0ge1xuICAgIHVzZXJJbmZvOiBudWxsLFxuICAgIGFwaVVybDogJ2h0dHBzOi8vdGVzdC5jdGp3aC5jb20vYXBpL3YxJyxcbiAgICB1c2VyRGF0YToge30sXG4gICAgY2xhc3NIYXNDaGFuZ2U6IGZhbHNlXG4gIH1cblxuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMudXNlKCdyZXF1ZXN0Zml4JylcbiAgICB0aGlzLnVzZSgncHJvbWlzaWZ5JylcbiAgICB0aGlzLmludGVyY2VwdCgncmVxdWVzdCcsIHtcblxuICAgICAgY29uZmlnKHJlcSkge1xuICAgICAgICAvLyByZXEudXJsID0gJ2h0dHA6Ly93d3cucGF0cmlhcmNoLmNtL2FwaS92MScgKyByZXEudXJsXG4gICAgICAgIHJlcS51cmwgPSAnaHR0cHM6Ly90ZXN0LmN0andoLmNvbS9hcGkvdjEnICsgcmVxLnVybFxuICAgICAgICAvLyByZXEudXJsID0gJ2h0dHBzOi8vd3d3LmN0andoLmNvbS9hcGkvdjEnICsgcmVxLnVybFxuICAgICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxuICAgICAgICAgIG1hc2s6IHRydWVcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHJlcVxuICAgICAgfSxcbiAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YVxuICAgICAgICBpZiAoIWRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgIGxldCBtc2cgPSBkYXRhLmVycm9yX21zZ1xuICAgICAgICAgIGxldCBjb2RlID0gZGF0YS5lcnJvcl9jb2RlXG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiBtc2csXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgICAgIH0pXG4gICAgICAgICAgaWYgKE51bWJlcihjb2RlKSA9PT0gMTAwMDEwICkge1xuICAgICAgICAgICAgd3gucmVMYXVuY2goe3VybDogJ2xvZ2luJ30pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNcbiAgICAgIH0sXG4gICAgICBmYWlsKHJlcSkge1xuICAgICAgICBjb25zb2xlLmxvZygncmVxdWVzdCBmYWlsOiAnLCByZXEpXG4gICAgICAgIHJldHVybiByZXFcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgb25MYXVuY2goKSB7XG4gICAgaWYgKHd4LmdldFVwZGF0ZU1hbmFnZXIpIHtcbiAgICAgIGNvbnN0IHVwZGF0ZU1hbmFnZXIgPSB3eC5nZXRVcGRhdGVNYW5hZ2VyKClcbiAgICAgIHVwZGF0ZU1hbmFnZXIub25VcGRhdGVSZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgICAgIHVwZGF0ZU1hbmFnZXIuYXBwbHlVcGRhdGUoKVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgIHRpdGxlOiAn5b2T5YmN5b6u5L+h54mI5pys6L+H5L2OJyxcbiAgICAgICAgY29udGVudDogJ+mDqOWIhuWKn+iDveWPr+iDveaXoOazleS9v+eUqO+8jOivt+WNh+e6p+WIsOacgOaWsOW+ruS/oeeJiOacrOWQjumHjeivleOAgidcbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG4iXX0=