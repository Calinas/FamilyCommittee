'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _common = require('./../utils/common.js');

var _user = require('./../api/user.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Advice = function (_wepy$page) {
  _inherits(Advice, _wepy$page);

  function Advice() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, Advice);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Advice.__proto__ || Object.getPrototypeOf(Advice)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      navigationBarTitleText: '发布'
    }, _this2.data = {
      description: '',
      img: [],
      memberInfo: {}
    }, _this2.onLoad = function (e) {
      _this2.memberInfo = wx.getStorageSync('memberInfo');
      _this2.$apply();
    }, _this2.methods = {
      deleteFn: function deleteFn(arr, index) {
        this[arr].splice(index, 1);
        this.$apply();
      },
      bindChange: function bindChange(e) {
        this[e.currentTarget.id] = e.detail.value;
        this.$apply();
      },
      chooseImage: function chooseImage() {
        var _this3 = this;

        if (this.img.length > this.maxPhotoCount) {
          (0, _common.showMsg)('最多上传9张图');
          return;
        }
        var _this = this;
        wx.chooseImage({
          count: this.maxPhotoCount,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success: function success(res) {
            var length = res.tempFilePaths.length;
            var tempArr = [];
            if (_this3.img.length + length > _this3.maxPhotoCount) {
              wx.showToast({
                title: '最多只能选择' + _this3.maxPhotoCount + '张图片',
                icon: 'none'
              });
            }
            wx.showLoading({ title: '图片上传中' });
            res.tempFilePaths.forEach(function (path) {
              var upload = {};
              upload.path = path;
              upload.error = false;
              upload.uploadProgress = wx.uploadFile({
                url: _this.$parent.globalData.apiUrl + '/file/uploadPic',
                filePath: path,
                formData: {
                  'member_id': _this3.memberInfo.member_id,
                  'member_token': _this3.memberInfo.member_token,
                  'folder': 'committee'
                },
                name: 'file',
                success: function success(res) {
                  var data = JSON.parse(res.data);
                  if (data.data && data.data.file_url) {
                    var url = data.data.file_url;
                    tempArr.push(url);
                    _this.img.push(url);
                  }
                  if (tempArr.length === length) {
                    setTimeout(function () {
                      wx.hideLoading();
                    }, 1000);
                  }
                  _this.$apply();
                }
              });
            });
          }
        });
      },
      submit: function submit() {
        (0, _user.addAdvice)({
          description: this.description,
          imgList: this.img
        }).then(function (res) {
          if (res.data.success) {
            (0, _common.showMsg)('发布成功，谢谢您的反馈');
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  return Advice;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Advice , 'pages/advice'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkdmljZS5qcyJdLCJuYW1lcyI6WyJBZHZpY2UiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImRlc2NyaXB0aW9uIiwiaW1nIiwibWVtYmVySW5mbyIsIm9uTG9hZCIsImUiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwiJGFwcGx5IiwibWV0aG9kcyIsImRlbGV0ZUZuIiwiYXJyIiwiaW5kZXgiLCJzcGxpY2UiLCJiaW5kQ2hhbmdlIiwiY3VycmVudFRhcmdldCIsImlkIiwiZGV0YWlsIiwidmFsdWUiLCJjaG9vc2VJbWFnZSIsImxlbmd0aCIsIm1heFBob3RvQ291bnQiLCJfdGhpcyIsImNvdW50Iiwic2l6ZVR5cGUiLCJzb3VyY2VUeXBlIiwic3VjY2VzcyIsInJlcyIsInRlbXBGaWxlUGF0aHMiLCJ0ZW1wQXJyIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwic2hvd0xvYWRpbmciLCJmb3JFYWNoIiwidXBsb2FkIiwicGF0aCIsImVycm9yIiwidXBsb2FkUHJvZ3Jlc3MiLCJ1cGxvYWRGaWxlIiwidXJsIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJhcGlVcmwiLCJmaWxlUGF0aCIsImZvcm1EYXRhIiwibWVtYmVyX2lkIiwibWVtYmVyX3Rva2VuIiwibmFtZSIsIkpTT04iLCJwYXJzZSIsImZpbGVfdXJsIiwicHVzaCIsInNldFRpbWVvdXQiLCJoaWRlTG9hZGluZyIsInN1Ym1pdCIsImltZ0xpc3QiLCJ0aGVuIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBQ3FCQSxNOzs7Ozs7Ozs7Ozs7Ozt5TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdUQyxJLEdBQU87QUFDTEMsbUJBQWEsRUFEUjtBQUVMQyxXQUFLLEVBRkE7QUFHTEMsa0JBQVk7QUFIUCxLLFNBS1BDLE0sR0FBUyxVQUFDQyxDQUFELEVBQU87QUFDZCxhQUFLRixV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STNCLElBQUosQ0FBUzBCLE9BQWIsRUFBc0I7QUFDcEIsaUNBQVEsYUFBUjtBQUNEO0FBQ0YsU0FQRDtBQVFEO0FBdEVPLEs7Ozs7RUFid0JnQyxlQUFLQyxJOztrQkFBcEI5RCxNIiwiZmlsZSI6ImFkdmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7IHNob3dNc2cgfSBmcm9tICcuLi91dGlscy9jb21tb24nXG5pbXBvcnQgeyBhZGRBZHZpY2UgfSBmcm9tICcuLi9hcGkvdXNlcidcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkdmljZSBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Y+R5biDJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgZGVzY3JpcHRpb246ICcnLFxuICAgIGltZzogW10sXG4gICAgbWVtYmVySW5mbzoge31cbiAgfVxuICBvbkxvYWQgPSAoZSkgPT4ge1xuICAgIHRoaXMubWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBkZWxldGVGbiAoYXJyLCBpbmRleCkge1xuICAgICAgdGhpc1thcnJdLnNwbGljZShpbmRleCwgMSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGJpbmRDaGFuZ2UoZSkge1xuICAgICAgdGhpc1tlLmN1cnJlbnRUYXJnZXQuaWRdID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGNob29zZUltYWdlKCkge1xuICAgICAgaWYgKHRoaXMuaW1nLmxlbmd0aCA+IHRoaXMubWF4UGhvdG9Db3VudCkge1xuICAgICAgICBzaG93TXNnKCfmnIDlpJrkuIrkvKA55byg5Zu+JylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBsZXQgX3RoaXMgPSB0aGlzXG4gICAgICB3eC5jaG9vc2VJbWFnZSh7XG4gICAgICAgIGNvdW50OiB0aGlzLm1heFBob3RvQ291bnQsXG4gICAgICAgIHNpemVUeXBlOiBbJ29yaWdpbmFsJywgJ2NvbXByZXNzZWQnXSxcbiAgICAgICAgc291cmNlVHlwZTogWydhbGJ1bScsICdjYW1lcmEnXSxcbiAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICBjb25zdCBsZW5ndGggPSByZXMudGVtcEZpbGVQYXRocy5sZW5ndGhcbiAgICAgICAgICBsZXQgdGVtcEFyciA9IFtdXG4gICAgICAgICAgaWYgKHRoaXMuaW1nLmxlbmd0aCArIGxlbmd0aCA+IHRoaXMubWF4UGhvdG9Db3VudCkge1xuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfmnIDlpJrlj6rog73pgInmi6knICsgdGhpcy5tYXhQaG90b0NvdW50ICsgJ+W8oOWbvueJhycsXG4gICAgICAgICAgICAgIGljb246ICdub25lJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgICAgd3guc2hvd0xvYWRpbmcoe3RpdGxlOiAn5Zu+54mH5LiK5Lyg5LitJ30pXG4gICAgICAgICAgcmVzLnRlbXBGaWxlUGF0aHMuZm9yRWFjaChwYXRoID0+IHtcbiAgICAgICAgICAgIGxldCB1cGxvYWQgPSB7fVxuICAgICAgICAgICAgdXBsb2FkLnBhdGggPSBwYXRoXG4gICAgICAgICAgICB1cGxvYWQuZXJyb3IgPSBmYWxzZVxuICAgICAgICAgICAgdXBsb2FkLnVwbG9hZFByb2dyZXNzID0gd3gudXBsb2FkRmlsZSh7XG4gICAgICAgICAgICAgIHVybDogYCR7X3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmFwaVVybH0vZmlsZS91cGxvYWRQaWNgLFxuICAgICAgICAgICAgICBmaWxlUGF0aDogcGF0aCxcbiAgICAgICAgICAgICAgZm9ybURhdGE6IHtcbiAgICAgICAgICAgICAgICAnbWVtYmVyX2lkJzogdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCxcbiAgICAgICAgICAgICAgICAnbWVtYmVyX3Rva2VuJzogdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl90b2tlbixcbiAgICAgICAgICAgICAgICAnZm9sZGVyJzogJ2NvbW1pdHRlZSdcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKVxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmRhdGEgJiYgZGF0YS5kYXRhLmZpbGVfdXJsKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBkYXRhLmRhdGEuZmlsZV91cmxcbiAgICAgICAgICAgICAgICAgIHRlbXBBcnIucHVzaCh1cmwpXG4gICAgICAgICAgICAgICAgICBfdGhpcy5pbWcucHVzaCh1cmwpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0ZW1wQXJyLmxlbmd0aCA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgICAgICAgICAgICAgfSwgMTAwMClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgc3VibWl0KCkge1xuICAgICAgYWRkQWR2aWNlKHtcbiAgICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXG4gICAgICAgIGltZ0xpc3Q6IHRoaXMuaW1nXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgc2hvd01zZygn5Y+R5biD5oiQ5Yqf77yM6LCi6LCi5oKo55qE5Y+N6aaIJylcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cbiJdfQ==