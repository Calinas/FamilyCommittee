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
                url: _wepy2.default.$appConfig.baseUrl + '/file/uploadPic',
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkdmljZS5qcyJdLCJuYW1lcyI6WyJBZHZpY2UiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImRlc2NyaXB0aW9uIiwiaW1nIiwibWVtYmVySW5mbyIsIm9uTG9hZCIsImUiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwiJGFwcGx5IiwibWV0aG9kcyIsImRlbGV0ZUZuIiwiYXJyIiwiaW5kZXgiLCJzcGxpY2UiLCJiaW5kQ2hhbmdlIiwiY3VycmVudFRhcmdldCIsImlkIiwiZGV0YWlsIiwidmFsdWUiLCJjaG9vc2VJbWFnZSIsImxlbmd0aCIsIm1heFBob3RvQ291bnQiLCJfdGhpcyIsImNvdW50Iiwic2l6ZVR5cGUiLCJzb3VyY2VUeXBlIiwic3VjY2VzcyIsInJlcyIsInRlbXBGaWxlUGF0aHMiLCJ0ZW1wQXJyIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwic2hvd0xvYWRpbmciLCJmb3JFYWNoIiwidXBsb2FkIiwicGF0aCIsImVycm9yIiwidXBsb2FkUHJvZ3Jlc3MiLCJ1cGxvYWRGaWxlIiwidXJsIiwid2VweSIsIiRhcHBDb25maWciLCJiYXNlVXJsIiwiZmlsZVBhdGgiLCJmb3JtRGF0YSIsIm1lbWJlcl9pZCIsIm1lbWJlcl90b2tlbiIsIm5hbWUiLCJKU09OIiwicGFyc2UiLCJmaWxlX3VybCIsInB1c2giLCJzZXRUaW1lb3V0IiwiaGlkZUxvYWRpbmciLCJzdWJtaXQiLCJpbWdMaXN0IiwidGhlbiIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBQ3FCQSxNOzs7Ozs7Ozs7Ozs7Ozt5TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdUQyxJLEdBQU87QUFDTEMsbUJBQWEsRUFEUjtBQUVMQyxXQUFLLEVBRkE7QUFHTEMsa0JBQVk7QUFIUCxLLFNBS1BDLE0sR0FBUyxVQUFDQyxDQUFELEVBQU87QUFDZCxhQUFLRixVQUFMLEdBQWtC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QUFzQjtBQUNwQixpQ0FBUSxhQUFSO0FBQ0Q7QUFDRixTQVBEO0FBUUQ7QUF0RU8sSzs7OztFQWJ3QmUsZUFBS2lCLEk7O2tCQUFwQjdELE0iLCJmaWxlIjoiYWR2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHsgc2hvd01zZyB9IGZyb20gJy4uL3V0aWxzL2NvbW1vbidcbmltcG9ydCB7IGFkZEFkdmljZSB9IGZyb20gJy4uL2FwaS91c2VyJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWR2aWNlIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflj5HluIMnXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgaW1nOiBbXSxcbiAgICBtZW1iZXJJbmZvOiB7fVxuICB9XG4gIG9uTG9hZCA9IChlKSA9PiB7XG4gICAgdGhpcy5tZW1iZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nKVxuICAgIHRoaXMuJGFwcGx5KClcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIGRlbGV0ZUZuIChhcnIsIGluZGV4KSB7XG4gICAgICB0aGlzW2Fycl0uc3BsaWNlKGluZGV4LCAxKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgYmluZENoYW5nZShlKSB7XG4gICAgICB0aGlzW2UuY3VycmVudFRhcmdldC5pZF0gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgY2hvb3NlSW1hZ2UoKSB7XG4gICAgICBpZiAodGhpcy5pbWcubGVuZ3RoID4gdGhpcy5tYXhQaG90b0NvdW50KSB7XG4gICAgICAgIHNob3dNc2coJ+acgOWkmuS4iuS8oDnlvKDlm74nKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGxldCBfdGhpcyA9IHRoaXNcbiAgICAgIHd4LmNob29zZUltYWdlKHtcbiAgICAgICAgY291bnQ6IHRoaXMubWF4UGhvdG9Db3VudCxcbiAgICAgICAgc2l6ZVR5cGU6IFsnb3JpZ2luYWwnLCAnY29tcHJlc3NlZCddLFxuICAgICAgICBzb3VyY2VUeXBlOiBbJ2FsYnVtJywgJ2NhbWVyYSddLFxuICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgIGNvbnN0IGxlbmd0aCA9IHJlcy50ZW1wRmlsZVBhdGhzLmxlbmd0aFxuICAgICAgICAgIGxldCB0ZW1wQXJyID0gW11cbiAgICAgICAgICBpZiAodGhpcy5pbWcubGVuZ3RoICsgbGVuZ3RoID4gdGhpcy5tYXhQaG90b0NvdW50KSB7XG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+acgOWkmuWPquiDvemAieaLqScgKyB0aGlzLm1heFBob3RvQ291bnQgKyAn5byg5Zu+54mHJyxcbiAgICAgICAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgICB3eC5zaG93TG9hZGluZyh7dGl0bGU6ICflm77niYfkuIrkvKDkuK0nfSlcbiAgICAgICAgICByZXMudGVtcEZpbGVQYXRocy5mb3JFYWNoKHBhdGggPT4ge1xuICAgICAgICAgICAgbGV0IHVwbG9hZCA9IHt9XG4gICAgICAgICAgICB1cGxvYWQucGF0aCA9IHBhdGhcbiAgICAgICAgICAgIHVwbG9hZC5lcnJvciA9IGZhbHNlXG4gICAgICAgICAgICB1cGxvYWQudXBsb2FkUHJvZ3Jlc3MgPSB3eC51cGxvYWRGaWxlKHtcbiAgICAgICAgICAgICAgdXJsOiBgJHt3ZXB5LiRhcHBDb25maWcuYmFzZVVybH0vZmlsZS91cGxvYWRQaWNgLFxuICAgICAgICAgICAgICBmaWxlUGF0aDogcGF0aCxcbiAgICAgICAgICAgICAgZm9ybURhdGE6IHtcbiAgICAgICAgICAgICAgICAnbWVtYmVyX2lkJzogdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCxcbiAgICAgICAgICAgICAgICAnbWVtYmVyX3Rva2VuJzogdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl90b2tlbixcbiAgICAgICAgICAgICAgICAnZm9sZGVyJzogJ2NvbW1pdHRlZSdcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKVxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmRhdGEgJiYgZGF0YS5kYXRhLmZpbGVfdXJsKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBkYXRhLmRhdGEuZmlsZV91cmxcbiAgICAgICAgICAgICAgICAgIHRlbXBBcnIucHVzaCh1cmwpXG4gICAgICAgICAgICAgICAgICBfdGhpcy5pbWcucHVzaCh1cmwpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0ZW1wQXJyLmxlbmd0aCA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgICAgICAgICAgICAgfSwgMTAwMClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgc3VibWl0KCkge1xuICAgICAgYWRkQWR2aWNlKHtcbiAgICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXG4gICAgICAgIGltZ0xpc3Q6IHRoaXMuaW1nXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgc2hvd01zZygn5Y+R5biD5oiQ5Yqf77yM6LCi6LCi5oKo55qE5Y+N6aaIJylcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cbiJdfQ==