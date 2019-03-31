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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJzdG9yZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwicGFnZXMiLCJwZXJtaXNzaW9uIiwiZGVzYyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwidGFiQmFyIiwiYmFja2dyb3VuZENvbG9yIiwiYm9yZGVyU3R5bGUiLCJwb3NpdGlvbiIsInNlbGVjdGVkQ29sb3IiLCJsaXN0IiwicGFnZVBhdGgiLCJpY29uUGF0aCIsInRleHQiLCJzZWxlY3RlZEljb25QYXRoIiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwiYXBpVXJsIiwidXNlckRhdGEiLCJjbGFzc0hhc0NoYW5nZSIsInVzZSIsImludGVyY2VwdCIsInJlcSIsInVybCIsInd4Iiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsIm1hc2siLCJzdWNjZXNzIiwicmVzIiwiaGlkZUxvYWRpbmciLCJkYXRhIiwibXNnIiwiZXJyb3JfbXNnIiwiY29kZSIsImVycm9yX2NvZGUiLCJzaG93VG9hc3QiLCJpY29uIiwiZHVyYXRpb24iLCJOdW1iZXIiLCJyZUxhdW5jaCIsImZhaWwiLCJjb25zb2xlIiwibG9nIiwiZ2V0VXBkYXRlTWFuYWdlciIsInVwZGF0ZU1hbmFnZXIiLCJvblVwZGF0ZVJlYWR5IiwiYXBwbHlVcGRhdGUiLCJzaG93TW9kYWwiLCJzaG93Q2FuY2VsIiwiY29udGVudCIsIndlcHkiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFFBQVEsc0JBQWQ7QUFDQSx5QkFBU0EsS0FBVDs7Ozs7QUF3RUUsc0JBQWU7QUFBQTs7QUFBQTs7QUFBQSxVQXJFZkMsTUFxRWUsR0FyRU47QUFDUEMsb0NBQThCLFNBRHZCO0FBRVBDLDhCQUF3QixPQUZqQjtBQUdQ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S0Q7QUFDRjs7OztFQTNIMEJDLGVBQUtDLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xuaW1wb3J0IHsgc2V0U3RvcmUgfSBmcm9tICd3ZXB5LXJlZHV4J1xuaW1wb3J0IGNvbmZpZ1N0b3JlIGZyb20gJy4vc3RvcmUnXG5cbmNvbnN0IHN0b3JlID0gY29uZmlnU3RvcmUoKVxuc2V0U3RvcmUoc3RvcmUpXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyMwMDAwMDAnLFxuICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICd3aGl0ZScsXG4gICAgcGFnZXM6IFtcbiAgICAgICdwYWdlcy96b25lJyxcbiAgICAgICdwYWdlcy9wZXJzb25hbENhc2hmbG93JyxcbiAgICAgICdwYWdlcy9jbGFzc0xpc3QnLFxuICAgICAgJ3BhZ2VzL2JpbmRSZWxhdGlvbnNoaXAnLFxuICAgICAgJ3BhZ2VzL2F1dGhvcml6ZScsXG4gICAgICAncGFnZXMvcHVibGlzaCcsXG4gICAgICAncGFnZXMvbG9naW4nLFxuICAgICAgJ3BhZ2VzL2Nhc2hXaXRoZHJhdycsXG4gICAgICAncGFnZXMvY2FzaGZsb3cnLFxuICAgICAgJ3BhZ2VzL3Bob3RvcycsXG4gICAgICAncGFnZXMvcmVjb3JkQ2FzaGZsb3cnLFxuICAgICAgJ3BhZ2VzL2NyZWF0ZUNsYXNzRmFpbCcsXG4gICAgICAncGFnZXMvY3JlYXRlQ2xhc3NTdWNjZXNzJyxcbiAgICAgICdwYWdlcy9qb2luQ2xhc3MnLFxuICAgICAgJ3BhZ2VzL2NyZWF0ZUNsYXNzJyxcbiAgICAgICdwYWdlcy9tZW1iZXInLFxuICAgICAgJ3BhZ2VzL2Rpc2NvdmVyeScsXG4gICAgICAncGFnZXMvd2l0aGRyYXcnXG4gICAgXSxcbiAgICBwZXJtaXNzaW9uOiB7XG4gICAgICAnc2NvcGUudXNlckxvY2F0aW9uJzoge1xuICAgICAgICBkZXNjOiAn5L2g55qE5L2N572u5L+h5oGv5bCG55So5LqO5bCP56iL5bqP5L2N572u5o6l5Y+j55qE5pWI5p6c5bGV56S6J1xuICAgICAgfVxuICAgIH0sXG4gICAgd2luZG93OiB7XG4gICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnbGlnaHQnLFxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ1dlQ2hhdCcsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnYmxhY2snXG4gICAgfSxcbiAgICB0YWJCYXI6IHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxuICAgICAgYm9yZGVyU3R5bGU6ICd3aGl0ZScsXG4gICAgICBwb3NpdGlvbjogJ2JvdHRvbScsXG4gICAgICBzZWxlY3RlZENvbG9yOiAnI2ZmNzgxMScsXG4gICAgICBsaXN0OiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL3pvbmUnLFxuICAgICAgICAgIGljb25QYXRoOiAnaW1hZ2VzL3RhYi9pbmRleC5wbmcnLFxuICAgICAgICAgIHRleHQ6ICfmnIDov5Hnj63nuqcnLFxuICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZXMvdGFiL2luZGV4LWFjdGl2ZS5wbmcnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2Rpc2NvdmVyeScsXG4gICAgICAgICAgaWNvblBhdGg6ICdpbWFnZXMvdGFiL29yZGVyLnBuZycsXG4gICAgICAgICAgdGV4dDogJ+WutumVv+WciOWtkCcsXG4gICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlcy90YWIvb3JkZXItYWN0aXZlLnBuZydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvY2xhc3NMaXN0JyxcbiAgICAgICAgICBpY29uUGF0aDogJ2ltYWdlcy90YWIvbXkucG5nJyxcbiAgICAgICAgICB0ZXh0OiAn5oiR55qE54+t57qnJyxcbiAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2VzL3RhYi9teS1hY3RpdmUucG5nJ1xuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9XG5cbiAgZ2xvYmFsRGF0YSA9IHtcbiAgICB1c2VySW5mbzogbnVsbCxcbiAgICBhcGlVcmw6ICdodHRwczovL3Rlc3QuY3Rqd2guY29tL2FwaS92MScsXG4gICAgdXNlckRhdGE6IHt9LFxuICAgIGNsYXNzSGFzQ2hhbmdlOiBmYWxzZVxuICB9XG5cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLnVzZSgncmVxdWVzdGZpeCcpXG4gICAgdGhpcy51c2UoJ3Byb21pc2lmeScpXG4gICAgdGhpcy5pbnRlcmNlcHQoJ3JlcXVlc3QnLCB7XG5cbiAgICAgIGNvbmZpZyhyZXEpIHtcbiAgICAgICAgLy8gcmVxLnVybCA9ICdodHRwOi8vd3d3LnBhdHJpYXJjaC5jbS9hcGkvdjEnICsgcmVxLnVybFxuICAgICAgICByZXEudXJsID0gJ2h0dHBzOi8vdGVzdC5jdGp3aC5jb20vYXBpL3YxJyArIHJlcS51cmxcbiAgICAgICAgLy8gcmVxLnVybCA9ICdodHRwczovL3d3dy5jdGp3aC5jb20vYXBpL3YxJyArIHJlcS51cmxcbiAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcbiAgICAgICAgICBtYXNrOiB0cnVlXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiByZXFcbiAgICAgIH0sXG4gICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGFcbiAgICAgICAgaWYgKCFkYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICBsZXQgbXNnID0gZGF0YS5lcnJvcl9tc2dcbiAgICAgICAgICBsZXQgY29kZSA9IGRhdGEuZXJyb3JfY29kZVxuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogbXNnLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgICB9KVxuICAgICAgICAgIGlmIChOdW1iZXIoY29kZSkgPT09IDEwMDAxMCApIHtcbiAgICAgICAgICAgIHd4LnJlTGF1bmNoKHt1cmw6ICdsb2dpbid9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzXG4gICAgICB9LFxuICAgICAgZmFpbChyZXEpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3JlcXVlc3QgZmFpbDogJywgcmVxKVxuICAgICAgICByZXR1cm4gcmVxXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIG9uTGF1bmNoKCkge1xuICAgIGlmICh3eC5nZXRVcGRhdGVNYW5hZ2VyKSB7XG4gICAgICBjb25zdCB1cGRhdGVNYW5hZ2VyID0gd3guZ2V0VXBkYXRlTWFuYWdlcigpXG4gICAgICB1cGRhdGVNYW5hZ2VyLm9uVXBkYXRlUmVhZHkoZnVuY3Rpb24gKCkge1xuICAgICAgICB1cGRhdGVNYW5hZ2VyLmFwcGx5VXBkYXRlKClcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICB0aXRsZTogJ+W9k+WJjeW+ruS/oeeJiOacrOi/h+S9jicsXG4gICAgICAgIGNvbnRlbnQ6ICfpg6jliIblip/og73lj6/og73ml6Dms5Xkvb/nlKjvvIzor7fljYfnuqfliLDmnIDmlrDlvq7kv6HniYjmnKzlkI7ph43or5XjgIInXG4gICAgICB9KVxuICAgIH1cbiAgfVxufVxuIl19