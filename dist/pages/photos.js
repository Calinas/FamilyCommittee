'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _common = require('./../utils/common.js');

var _zone = require('./../api/zone.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var bindRelationship = function (_wepy$page) {
  _inherits(bindRelationship, _wepy$page);

  function bindRelationship() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, bindRelationship);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = bindRelationship.__proto__ || Object.getPrototypeOf(bindRelationship)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      navigationBarTitleText: '相册'
    }, _this2.data = {
      msg: '',
      list: [],
      memberInfo: null,
      classInfo: null,
      ps: 10,
      pn: 1,
      maxCount: 6,
      imgList: [],
      uploads: []
    }, _this2.methods = {
      preview: function preview(url, urls) {
        (0, _common.previewImage)(url, urls);
      },
      upload: function upload() {
        var _this3 = this;

        var _this = this;
        wx.chooseImage({
          count: 9,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success: function success(res) {
            var length = res.tempFilePaths.length;
            if (length > _this3.maxPhotoCount) {
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
                    _this.imgList.push(url);
                  }
                  if (_this.imgList.length === length) {
                    setTimeout(function () {
                      wx.hideLoading();
                    }, 2000);
                    _this.addPhotos();
                  }
                  _this.$apply();
                }
              });
              upload.uploadProgress.onProgressUpdate(function (res) {
                upload.progress = res.progress;
              });
              _this.uploads.push(upload);
              _this.$apply();
            });
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(bindRelationship, [{
    key: 'onLoad',
    value: function onLoad() {
      this.classInfo = wx.getStorageSync('classInfo');
      this.memberInfo = wx.getStorageSync('memberInfo');
      this.getPhotoList();
      this.$apply();
    }
  }, {
    key: 'getPhotoList',
    value: function getPhotoList() {
      var _this4 = this;

      (0, _zone.photoIndex)({
        ps: this.ps,
        pn: this.pn,
        class_id: this.classInfo.id
      }).then(function (res) {
        var list = [];
        var returnList = res.data.list;
        for (var i = 0, len = returnList.length; i < len; i++) {
          list[i] = {
            img_list: [],
            upload_date: returnList[i].upload_date,
            upload_members: returnList[i].upload_members
          };
          for (var j = 0, _len2 = returnList[i].img_list.length; j < _len2; j++) {
            var obj = returnList[i].img_list[j];
            list[i].img_list.push(obj.img_url);
          }
        }
        _this4.list = list;
        _this4.$apply();
      });
    }
  }, {
    key: 'addPhotos',
    value: function addPhotos() {
      var _this5 = this;

      (0, _zone.addPhoto)({
        class_id: this.classInfo.id,
        img_url: this.imgList
      }).then(function (res) {
        if (res.data.success) {
          (0, _common.showMsg)('提交成功');
          _this5.getPhotoList();
          _this5.imgList = [];
          _this5.$apply();
        }
      });
    }
  }]);

  return bindRelationship;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(bindRelationship , 'pages/photos'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBob3Rvcy5qcyJdLCJuYW1lcyI6WyJiaW5kUmVsYXRpb25zaGlwIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJtc2ciLCJsaXN0IiwibWVtYmVySW5mbyIsImNsYXNzSW5mbyIsInBzIiwicG4iLCJtYXhDb3VudCIsImltZ0xpc3QiLCJ1cGxvYWRzIiwibWV0aG9kcyIsInByZXZpZXciLCJ1cmwiLCJ1cmxzIiwidXBsb2FkIiwiX3RoaXMiLCJ3eCIsImNob29zZUltYWdlIiwiY291bnQiLCJzaXplVHlwZSIsInNvdXJjZVR5cGUiLCJzdWNjZXNzIiwibGVuZ3RoIiwicmVzIiwidGVtcEZpbGVQYXRocyIsIm1heFBob3RvQ291bnQiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJzaG93TG9hZGluZyIsImZvckVhY2giLCJwYXRoIiwiZXJyb3IiLCJ1cGxvYWRQcm9ncmVzcyIsInVwbG9hZEZpbGUiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImFwaVVybCIsImZpbGVQYXRoIiwiZm9ybURhdGEiLCJtZW1iZXJfaWQiLCJtZW1iZXJfdG9rZW4iLCJuYW1lIiwiSlNPTiIsInBhcnNlIiwiZmlsZV91cmwiLCJwdXNoIiwic2V0VGltZW91dCIsImhpZGVMb2FkaW5nIiwiYWRkUGhvdG9zIiwiJGFwcGx5Iiwib25Qcm9ncmVzc1VwZGF0ZSIsInByb2dyZXNzIiwiZ2V0U3RvcmFnZVN5bmMiLCJnZXRQaG90b0xpc3QiLCJjbGFzc19pZCIsImlkIiwidGhlbiIsInJldHVybkxpc3QiLCJpIiwibGVuIiwiaW1nX2xpc3QiLCJ1cGxvYWRfZGF0ZSIsInVwbG9hZF9tZW1iZXJzIiwiaiIsIm9iaiIsImltZ191cmwiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQUNxQkEsZ0I7Ozs7Ozs7Ozs7Ozs7OzZNQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixL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aUJBQUtpQyxZQUFMO0FBQ0EsaUJBQUs5QyxPQUFMLEdBQWUsRUFBZjtBQUNBLGlCQUFLMEMsTUFBTDtBQUNEO0FBQ0YsT0FWRDtBQVdEOzs7O0VBeEQyQ2lCLGVBQUtDLEk7O2tCQUE5QnZFLGdCIiwiZmlsZSI6InBob3Rvcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgeyB1cGxvYWRJbWFnZSwgc2hvd01zZywgcHJldmlld0ltYWdlIH0gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xyXG5pbXBvcnQgeyBwaG90b0luZGV4LCBhZGRQaG90byB9IGZyb20gJy4uL2FwaS96b25lJ1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBiaW5kUmVsYXRpb25zaGlwIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn55u45YaMJ1xyXG4gIH1cclxuICBkYXRhID0ge1xyXG4gICAgbXNnOiAnJyxcclxuICAgIGxpc3Q6IFtdLFxyXG4gICAgbWVtYmVySW5mbzogbnVsbCxcclxuICAgIGNsYXNzSW5mbzogbnVsbCxcclxuICAgIHBzOiAxMCxcclxuICAgIHBuOiAxLFxyXG4gICAgbWF4Q291bnQ6IDYsXHJcbiAgICBpbWdMaXN0OiBbXSxcclxuICAgIHVwbG9hZHM6IFtdXHJcbiAgfVxyXG4gIG9uTG9hZCgpIHtcclxuICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXHJcbiAgICB0aGlzLm1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXHJcbiAgICB0aGlzLmdldFBob3RvTGlzdCgpXHJcbiAgICB0aGlzLiRhcHBseSgpXHJcbiAgfVxyXG4gIGdldFBob3RvTGlzdCgpIHtcclxuICAgIHBob3RvSW5kZXgoe1xyXG4gICAgICBwczogdGhpcy5wcyxcclxuICAgICAgcG46IHRoaXMucG4sXHJcbiAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZFxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICBsZXQgbGlzdCA9IFtdXHJcbiAgICAgIGxldCByZXR1cm5MaXN0ID0gcmVzLmRhdGEubGlzdFxyXG4gICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gcmV0dXJuTGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgIGxpc3RbaV0gPSB7XHJcbiAgICAgICAgICBpbWdfbGlzdDogW10sXHJcbiAgICAgICAgICB1cGxvYWRfZGF0ZTogcmV0dXJuTGlzdFtpXS51cGxvYWRfZGF0ZSxcclxuICAgICAgICAgIHVwbG9hZF9tZW1iZXJzOiByZXR1cm5MaXN0W2ldLnVwbG9hZF9tZW1iZXJzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGogPSAwLCBsZW4gPSByZXR1cm5MaXN0W2ldLmltZ19saXN0Lmxlbmd0aDsgaiA8IGxlbjsgaisrKSB7XHJcbiAgICAgICAgICBsZXQgb2JqID0gcmV0dXJuTGlzdFtpXS5pbWdfbGlzdFtqXVxyXG4gICAgICAgICAgbGlzdFtpXS5pbWdfbGlzdC5wdXNoKG9iai5pbWdfdXJsKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB0aGlzLmxpc3QgPSBsaXN0XHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH0pXHJcbiAgfVxyXG4gIGFkZFBob3RvcyAoKSB7XHJcbiAgICBhZGRQaG90byh7XHJcbiAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcclxuICAgICAgaW1nX3VybDogdGhpcy5pbWdMaXN0XHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgc2hvd01zZygn5o+Q5Lqk5oiQ5YqfJylcclxuICAgICAgICB0aGlzLmdldFBob3RvTGlzdCgpXHJcbiAgICAgICAgdGhpcy5pbWdMaXN0ID0gW11cclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBwcmV2aWV3KHVybCwgdXJscykge1xyXG4gICAgICBwcmV2aWV3SW1hZ2UodXJsLCB1cmxzKVxyXG4gICAgfSxcclxuICAgIHVwbG9hZCgpIHtcclxuICAgICAgbGV0IF90aGlzID0gdGhpc1xyXG4gICAgICB3eC5jaG9vc2VJbWFnZSh7XHJcbiAgICAgICAgY291bnQ6IDksXHJcbiAgICAgICAgc2l6ZVR5cGU6IFsnb3JpZ2luYWwnLCAnY29tcHJlc3NlZCddLFxyXG4gICAgICAgIHNvdXJjZVR5cGU6IFsnYWxidW0nLCAnY2FtZXJhJ10sXHJcbiAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgIGNvbnN0IGxlbmd0aCA9IHJlcy50ZW1wRmlsZVBhdGhzLmxlbmd0aFxyXG4gICAgICAgICAgaWYgKGxlbmd0aCA+IHRoaXMubWF4UGhvdG9Db3VudCkge1xyXG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAn5pyA5aSa5Y+q6IO96YCJ5oupJyArIHRoaXMubWF4UGhvdG9Db3VudCArICflvKDlm77niYcnLFxyXG4gICAgICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgd3guc2hvd0xvYWRpbmcoe3RpdGxlOiAn5Zu+54mH5LiK5Lyg5LitJ30pXHJcbiAgICAgICAgICByZXMudGVtcEZpbGVQYXRocy5mb3JFYWNoKHBhdGggPT4ge1xyXG4gICAgICAgICAgICBsZXQgdXBsb2FkID0ge31cclxuICAgICAgICAgICAgdXBsb2FkLnBhdGggPSBwYXRoXHJcbiAgICAgICAgICAgIHVwbG9hZC5lcnJvciA9IGZhbHNlXHJcbiAgICAgICAgICAgIHVwbG9hZC51cGxvYWRQcm9ncmVzcyA9IHd4LnVwbG9hZEZpbGUoe1xyXG4gICAgICAgICAgICAgIHVybDogYCR7X3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmFwaVVybH0vZmlsZS91cGxvYWRQaWNgLFxyXG4gICAgICAgICAgICAgIGZpbGVQYXRoOiBwYXRoLFxyXG4gICAgICAgICAgICAgIGZvcm1EYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAnbWVtYmVyX2lkJzogdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCxcclxuICAgICAgICAgICAgICAgICdtZW1iZXJfdG9rZW4nOiB0aGlzLm1lbWJlckluZm8ubWVtYmVyX3Rva2VuLFxyXG4gICAgICAgICAgICAgICAgJ2ZvbGRlcic6ICdjb21taXR0ZWUnXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBuYW1lOiAnZmlsZScsXHJcbiAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKVxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuZGF0YSAmJiBkYXRhLmRhdGEuZmlsZV91cmwpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc3QgdXJsID0gZGF0YS5kYXRhLmZpbGVfdXJsXHJcbiAgICAgICAgICAgICAgICAgIF90aGlzLmltZ0xpc3QucHVzaCh1cmwpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuaW1nTGlzdC5sZW5ndGggPT09IGxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICAgICAgICAgIH0sIDIwMDApXHJcbiAgICAgICAgICAgICAgICAgIF90aGlzLmFkZFBob3RvcygpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBfdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdXBsb2FkLnVwbG9hZFByb2dyZXNzLm9uUHJvZ3Jlc3NVcGRhdGUoZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgdXBsb2FkLnByb2dyZXNzID0gcmVzLnByb2dyZXNzXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIF90aGlzLnVwbG9hZHMucHVzaCh1cGxvYWQpXHJcbiAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19