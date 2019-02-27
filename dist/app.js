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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsInBhZ2VzIiwicGVybWlzc2lvbiIsImRlc2MiLCJ3aW5kb3ciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsInRhYkJhciIsImJhY2tncm91bmRDb2xvciIsImJvcmRlclN0eWxlIiwicG9zaXRpb24iLCJzZWxlY3RlZENvbG9yIiwibGlzdCIsInBhZ2VQYXRoIiwiaWNvblBhdGgiLCJ0ZXh0Iiwic2VsZWN0ZWRJY29uUGF0aCIsImdsb2JhbERhdGEiLCJ1c2VySW5mbyIsImFwaVVybCIsInVzZXJEYXRhIiwiY2xhc3NIYXNDaGFuZ2UiLCJ1c2UiLCJpbnRlcmNlcHQiLCJyZXEiLCJ1cmwiLCJ3eCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJtYXNrIiwic3VjY2VzcyIsInJlcyIsImhpZGVMb2FkaW5nIiwiZGF0YSIsInNob3dUb2FzdCIsImVycm9yX21zZyIsImljb24iLCJkdXJhdGlvbiIsImZhaWwiLCJjb25zb2xlIiwibG9nIiwidGVzdEFzeW5jIiwicyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic2V0VGltZW91dCIsInNsZWVwIiwiY2IiLCJ0aGF0Iiwid2VweSIsImdldFVzZXJJbmZvIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUFnRUUsc0JBQWU7QUFBQTs7QUFBQTs7QUFBQSxVQTdEZkEsTUE2RGUsR0E3RE47QUFDUEMsb0NBQThCLFNBRHZCO0FBRVBDLDhCQUF3QixPQUZqQjtBQUdQQyxhQUFPLENBQ0wsWUFESyxFQUVMLHdCQUZLLEVBR0wsaUJBSEssRUFJTCx3QkFKSyxFQUtMLGlCQUxLLEVBTUwsZUFOSyxFQU9MLGFBUEssRUFRTCxvQkFSSyxFQVNMLGlCQVRLLEVBVUwsZ0JBVkss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IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnIzAwMDAwMCcsXG4gICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ3doaXRlJyxcbiAgICBwYWdlczogW1xuICAgICAgJ3BhZ2VzL3pvbmUnLFxuICAgICAgJ3BhZ2VzL3BlcnNvbmFsQ2FzaGZsb3cnLFxuICAgICAgJ3BhZ2VzL2NsYXNzTGlzdCcsXG4gICAgICAncGFnZXMvYmluZFJlbGF0aW9uc2hpcCcsXG4gICAgICAncGFnZXMvYXV0aG9yaXplJyxcbiAgICAgICdwYWdlcy9wdWJsaXNoJyxcbiAgICAgICdwYWdlcy9sb2dpbicsXG4gICAgICAncGFnZXMvY2FzaFdpdGhkcmF3JyxcbiAgICAgICdwYWdlcy9iaW5kUGhvbmUnLFxuICAgICAgJ3BhZ2VzL2Nhc2hmbG93JyxcbiAgICAgICdwYWdlcy9waG90b3MnLFxuICAgICAgJ3BhZ2VzL3JlY29yZENhc2hmbG93JyxcbiAgICAgICdwYWdlcy9jcmVhdGVDbGFzc0ZhaWwnLFxuICAgICAgJ3BhZ2VzL2NyZWF0ZUNsYXNzU3VjY2VzcycsXG4gICAgICAncGFnZXMvam9pbkNsYXNzJyxcbiAgICAgICdwYWdlcy9jcmVhdGVDbGFzcydcbiAgICBdLFxuICAgIHBlcm1pc3Npb246IHtcbiAgICAgICdzY29wZS51c2VyTG9jYXRpb24nOiB7XG4gICAgICAgIGRlc2M6ICfkvaDnmoTkvY3nva7kv6Hmga/lsIbnlKjkuo7lsI/nqIvluo/kvY3nva7mjqXlj6PnmoTmlYjmnpzlsZXnpLonXG4gICAgICB9XG4gICAgfSxcbiAgICB3aW5kb3c6IHtcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdsaWdodCcsXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnV2VDaGF0JyxcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaydcbiAgICB9LFxuICAgIHRhYkJhcjoge1xuICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXG4gICAgICBib3JkZXJTdHlsZTogJ3doaXRlJyxcbiAgICAgIHBvc2l0aW9uOiAnYm90dG9tJyxcbiAgICAgIHNlbGVjdGVkQ29sb3I6ICcjZmY3ODExJyxcbiAgICAgIGxpc3Q6IFtcbiAgICAgICAge1xuICAgICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvem9uZScsXG4gICAgICAgICAgaWNvblBhdGg6ICdpbWFnZXMvdGFiL2luZGV4LnBuZycsXG4gICAgICAgICAgdGV4dDogJ+mmlumhtScsXG4gICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlcy90YWIvaW5kZXgtYWN0aXZlLnBuZydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvY2xhc3NMaXN0JyxcbiAgICAgICAgICBpY29uUGF0aDogJ2ltYWdlcy90YWIvb3JkZXIucG5nJyxcbiAgICAgICAgICB0ZXh0OiAn54+t57qnJyxcbiAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2VzL3RhYi9vcmRlci1hY3RpdmUucG5nJ1xuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9XG5cbiAgZ2xvYmFsRGF0YSA9IHtcbiAgICB1c2VySW5mbzogbnVsbCxcbiAgICBhcGlVcmw6ICdodHRwczovL3Rlc3QuY3Rqd2guY29tL2FwaS92MScsXG4gICAgdXNlckRhdGE6IHt9LFxuICAgIGNsYXNzSGFzQ2hhbmdlOiBmYWxzZVxuICB9XG5cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLnVzZSgncmVxdWVzdGZpeCcpXG4gICAgdGhpcy51c2UoJ3Byb21pc2lmeScpXG4gICAgdGhpcy5pbnRlcmNlcHQoJ3JlcXVlc3QnLCB7XG5cbiAgICAgIGNvbmZpZyhyZXEpIHtcbiAgICAgICAgLy8gcmVxLnVybCA9ICdodHRwOi8vd3d3LnBhdHJpYXJjaC5jbTo4MDgwL2FwaS92MScgKyByZXEudXJsXG4gICAgICAgIHJlcS51cmwgPSAnaHR0cHM6Ly90ZXN0LmN0andoLmNvbS9hcGkvdjEnICsgcmVxLnVybFxuICAgICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxuICAgICAgICAgIG1hc2s6IHRydWVcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHJlcVxuICAgICAgfSxcbiAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgICAgaWYgKCFyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiByZXMuZGF0YS5lcnJvcl9tc2csXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgfSxcbiAgICAgIGZhaWwocmVxKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZXF1ZXN0IGZhaWw6ICcsIHJlcSlcbiAgICAgICAgcmV0dXJuIHJlcVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBvbkxhdW5jaCgpIHtcbiAgICB0aGlzLnRlc3RBc3luYygpXG4gIH1cblxuICBzbGVlcCAocykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcmVzb2x2ZSgncHJvbWlzZSByZXNvbHZlZCcpXG4gICAgICB9LCBzICogMTAwMClcbiAgICB9KVxuICB9XG5cbiAgYXN5bmMgdGVzdEFzeW5jICgpIHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5zbGVlcCgzKVxuICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gIH1cblxuICBnZXRVc2VySW5mbyhjYikge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzXG4gICAgaWYgKHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbykge1xuICAgICAgcmV0dXJuIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mb1xuICAgIH1cbiAgICB3ZXB5LmdldFVzZXJJbmZvKHtcbiAgICAgIHN1Y2Nlc3MgKHJlcykge1xuICAgICAgICB0aGF0Lmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cbiAgICAgICAgY2IgJiYgY2IocmVzLnVzZXJJbmZvKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cbiJdfQ==