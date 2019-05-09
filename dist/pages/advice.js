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
        if (!this.description) {
          (0, _common.showMsg)('请输入意见内容');
          return;
        }
        (0, _user.addAdvice)({
          description: this.description,
          imgList: this.img
        }).then(function (res) {
          if (res.data.success) {
            (0, _common.showMsg)('发布成功，谢谢您的反馈');
            setTimeout(function () {
              wx.navigateBack();
            }, 2000);
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  return Advice;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Advice , 'pages/advice'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkdmljZS5qcyJdLCJuYW1lcyI6WyJBZHZpY2UiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImRlc2NyaXB0aW9uIiwiaW1nIiwibWVtYmVySW5mbyIsIm9uTG9hZCIsImUiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwiJGFwcGx5IiwibWV0aG9kcyIsImRlbGV0ZUZuIiwiYXJyIiwiaW5kZXgiLCJzcGxpY2UiLCJiaW5kQ2hhbmdlIiwiY3VycmVudFRhcmdldCIsImlkIiwiZGV0YWlsIiwidmFsdWUiLCJjaG9vc2VJbWFnZSIsImxlbmd0aCIsIm1heFBob3RvQ291bnQiLCJfdGhpcyIsImNvdW50Iiwic2l6ZVR5cGUiLCJzb3VyY2VUeXBlIiwic3VjY2VzcyIsInJlcyIsInRlbXBGaWxlUGF0aHMiLCJ0ZW1wQXJyIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwic2hvd0xvYWRpbmciLCJmb3JFYWNoIiwidXBsb2FkIiwicGF0aCIsImVycm9yIiwidXBsb2FkUHJvZ3Jlc3MiLCJ1cGxvYWRGaWxlIiwidXJsIiwid2VweSIsIiRhcHBDb25maWciLCJiYXNlVXJsIiwiZmlsZVBhdGgiLCJmb3JtRGF0YSIsIm1lbWJlcl9pZCIsIm1lbWJlcl90b2tlbiIsIm5hbWUiLCJKU09OIiwicGFyc2UiLCJmaWxlX3VybCIsInB1c2giLCJzZXRUaW1lb3V0IiwiaGlkZUxvYWRpbmciLCJzdWJtaXQiLCJpbWdMaXN0IiwidGhlbiIsIm5hdmlnYXRlQmFjayIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBQ3FCQSxNOzs7Ozs7Ozs7Ozs7Ozt5TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdUQyxJLEdBQU87QUFDTEMsbUJBQWEsRUFEUjtBQUVMQyxXQUFLLEVBRkE7QUFHTEMsa0JBQVk7QUFIUCxLLFNBS1BDLE0sR0FBUyxVQUFDQyxDQUFELEVBQU87QUFDZCxh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QUt0RDtBQUZOLFNBQVYsRUFHR3VELElBSEgsQ0FHUSxlQUFPO0FBQ2IsY0FBSTlCLElBQUkzQixJQUFKLENBQVMwQixPQUFiLEVBQXNCO0FBQ3BCLGlDQUFRLGFBQVI7QUFDQTJCLHVCQUFXLFlBQU07QUFDZi9DLGlCQUFHb0QsWUFBSDtBQUNELGFBRkQsRUFFRyxJQUZIO0FBR0Q7QUFDRixTQVZEO0FBV0Q7QUE3RU8sSzs7OztFQWJ3QmpCLGVBQUtrQixJOztrQkFBcEI5RCxNIiwiZmlsZSI6ImFkdmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7IHNob3dNc2cgfSBmcm9tICcuLi91dGlscy9jb21tb24nXG5pbXBvcnQgeyBhZGRBZHZpY2UgfSBmcm9tICcuLi9hcGkvdXNlcidcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkdmljZSBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Y+R5biDJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgZGVzY3JpcHRpb246ICcnLFxuICAgIGltZzogW10sXG4gICAgbWVtYmVySW5mbzoge31cbiAgfVxuICBvbkxvYWQgPSAoZSkgPT4ge1xuICAgIHRoaXMubWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBkZWxldGVGbiAoYXJyLCBpbmRleCkge1xuICAgICAgdGhpc1thcnJdLnNwbGljZShpbmRleCwgMSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGJpbmRDaGFuZ2UoZSkge1xuICAgICAgdGhpc1tlLmN1cnJlbnRUYXJnZXQuaWRdID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGNob29zZUltYWdlKCkge1xuICAgICAgaWYgKHRoaXMuaW1nLmxlbmd0aCA+IHRoaXMubWF4UGhvdG9Db3VudCkge1xuICAgICAgICBzaG93TXNnKCfmnIDlpJrkuIrkvKA55byg5Zu+JylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBsZXQgX3RoaXMgPSB0aGlzXG4gICAgICB3eC5jaG9vc2VJbWFnZSh7XG4gICAgICAgIGNvdW50OiB0aGlzLm1heFBob3RvQ291bnQsXG4gICAgICAgIHNpemVUeXBlOiBbJ29yaWdpbmFsJywgJ2NvbXByZXNzZWQnXSxcbiAgICAgICAgc291cmNlVHlwZTogWydhbGJ1bScsICdjYW1lcmEnXSxcbiAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICBjb25zdCBsZW5ndGggPSByZXMudGVtcEZpbGVQYXRocy5sZW5ndGhcbiAgICAgICAgICBsZXQgdGVtcEFyciA9IFtdXG4gICAgICAgICAgaWYgKHRoaXMuaW1nLmxlbmd0aCArIGxlbmd0aCA+IHRoaXMubWF4UGhvdG9Db3VudCkge1xuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfmnIDlpJrlj6rog73pgInmi6knICsgdGhpcy5tYXhQaG90b0NvdW50ICsgJ+W8oOWbvueJhycsXG4gICAgICAgICAgICAgIGljb246ICdub25lJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgICAgd3guc2hvd0xvYWRpbmcoe3RpdGxlOiAn5Zu+54mH5LiK5Lyg5LitJ30pXG4gICAgICAgICAgcmVzLnRlbXBGaWxlUGF0aHMuZm9yRWFjaChwYXRoID0+IHtcbiAgICAgICAgICAgIGxldCB1cGxvYWQgPSB7fVxuICAgICAgICAgICAgdXBsb2FkLnBhdGggPSBwYXRoXG4gICAgICAgICAgICB1cGxvYWQuZXJyb3IgPSBmYWxzZVxuICAgICAgICAgICAgdXBsb2FkLnVwbG9hZFByb2dyZXNzID0gd3gudXBsb2FkRmlsZSh7XG4gICAgICAgICAgICAgIHVybDogYCR7d2VweS4kYXBwQ29uZmlnLmJhc2VVcmx9L2ZpbGUvdXBsb2FkUGljYCxcbiAgICAgICAgICAgICAgZmlsZVBhdGg6IHBhdGgsXG4gICAgICAgICAgICAgIGZvcm1EYXRhOiB7XG4gICAgICAgICAgICAgICAgJ21lbWJlcl9pZCc6IHRoaXMubWVtYmVySW5mby5tZW1iZXJfaWQsXG4gICAgICAgICAgICAgICAgJ21lbWJlcl90b2tlbic6IHRoaXMubWVtYmVySW5mby5tZW1iZXJfdG9rZW4sXG4gICAgICAgICAgICAgICAgJ2ZvbGRlcic6ICdjb21taXR0ZWUnXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSlcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5kYXRhICYmIGRhdGEuZGF0YS5maWxlX3VybCkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgdXJsID0gZGF0YS5kYXRhLmZpbGVfdXJsXG4gICAgICAgICAgICAgICAgICB0ZW1wQXJyLnB1c2godXJsKVxuICAgICAgICAgICAgICAgICAgX3RoaXMuaW1nLnB1c2godXJsKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGVtcEFyci5sZW5ndGggPT09IGxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICAgICAgICAgIH0sIDEwMDApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIHN1Ym1pdCgpIHtcbiAgICAgIGlmICghdGhpcy5kZXNjcmlwdGlvbikge1xuICAgICAgICBzaG93TXNnKCfor7fovpPlhaXmhI/op4HlhoXlrrknKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGFkZEFkdmljZSh7XG4gICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgICBpbWdMaXN0OiB0aGlzLmltZ1xuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgIHNob3dNc2coJ+WPkeW4g+aIkOWKn++8jOiwouiwouaCqOeahOWPjemmiCcpXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soKVxuICAgICAgICAgIH0sIDIwMDApXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG4iXX0=