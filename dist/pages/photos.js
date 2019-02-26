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
                url: 'https://test.ctjwh.com/api/v1/file/uploadPic',
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
            upload_member: returnList[i].upload_member
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBob3Rvcy5qcyJdLCJuYW1lcyI6WyJiaW5kUmVsYXRpb25zaGlwIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJtc2ciLCJsaXN0IiwibWVtYmVySW5mbyIsImNsYXNzSW5mbyIsInBzIiwicG4iLCJtYXhDb3VudCIsImltZ0xpc3QiLCJ1cGxvYWRzIiwibWV0aG9kcyIsInByZXZpZXciLCJ1cmwiLCJ1cmxzIiwidXBsb2FkIiwiX3RoaXMiLCJ3eCIsImNob29zZUltYWdlIiwiY291bnQiLCJzaXplVHlwZSIsInNvdXJjZVR5cGUiLCJzdWNjZXNzIiwibGVuZ3RoIiwicmVzIiwidGVtcEZpbGVQYXRocyIsIm1heFBob3RvQ291bnQiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJzaG93TG9hZGluZyIsImZvckVhY2giLCJwYXRoIiwiZXJyb3IiLCJ1cGxvYWRQcm9ncmVzcyIsInVwbG9hZEZpbGUiLCJmaWxlUGF0aCIsImZvcm1EYXRhIiwibWVtYmVyX2lkIiwibWVtYmVyX3Rva2VuIiwibmFtZSIsIkpTT04iLCJwYXJzZSIsImZpbGVfdXJsIiwicHVzaCIsInNldFRpbWVvdXQiLCJoaWRlTG9hZGluZyIsImFkZFBob3RvcyIsIiRhcHBseSIsIm9uUHJvZ3Jlc3NVcGRhdGUiLCJwcm9ncmVzcyIsImdldFN0b3JhZ2VTeW5jIiwiZ2V0UGhvdG9MaXN0IiwiY2xhc3NfaWQiLCJpZCIsInRoZW4iLCJyZXR1cm5MaXN0IiwiaSIsImxlbiIsImltZ19saXN0IiwidXBsb2FkX2RhdGUiLCJ1cGxvYWRfbWVtYmVyIiwiaiIsIm9iaiIsImltZ191cmwiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQUNxQkEsZ0I7Ozs7Ozs7Ozs7Ozs7OzZNQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1RDLEksR0FBTztBQUNMQyxXQUFLLEVBREE7QUFF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VkQ7QUFXRDs7OztFQXhEMkNpQixlQUFLQyxJOztrQkFBOUJwRSxnQiIsImZpbGUiOiJwaG90b3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IHsgdXBsb2FkSW1hZ2UsIHNob3dNc2csIHByZXZpZXdJbWFnZSB9IGZyb20gJy4uL3V0aWxzL2NvbW1vbidcclxuaW1wb3J0IHsgcGhvdG9JbmRleCwgYWRkUGhvdG8gfSBmcm9tICcuLi9hcGkvem9uZSdcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgYmluZFJlbGF0aW9uc2hpcCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ebuOWGjCdcclxuICB9XHJcbiAgZGF0YSA9IHtcclxuICAgIG1zZzogJycsXHJcbiAgICBsaXN0OiBbXSxcclxuICAgIG1lbWJlckluZm86IG51bGwsXHJcbiAgICBjbGFzc0luZm86IG51bGwsXHJcbiAgICBwczogMTAsXHJcbiAgICBwbjogMSxcclxuICAgIG1heENvdW50OiA2LFxyXG4gICAgaW1nTGlzdDogW10sXHJcbiAgICB1cGxvYWRzOiBbXVxyXG4gIH1cclxuICBvbkxvYWQoKSB7XHJcbiAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxyXG4gICAgdGhpcy5tZW1iZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nKVxyXG4gICAgdGhpcy5nZXRQaG90b0xpc3QoKVxyXG4gICAgdGhpcy4kYXBwbHkoKVxyXG4gIH1cclxuICBnZXRQaG90b0xpc3QoKSB7XHJcbiAgICBwaG90b0luZGV4KHtcclxuICAgICAgcHM6IHRoaXMucHMsXHJcbiAgICAgIHBuOiB0aGlzLnBuLFxyXG4gICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWRcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgbGV0IGxpc3QgPSBbXVxyXG4gICAgICBsZXQgcmV0dXJuTGlzdCA9IHJlcy5kYXRhLmxpc3RcclxuICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHJldHVybkxpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICBsaXN0W2ldID0ge1xyXG4gICAgICAgICAgaW1nX2xpc3Q6IFtdLFxyXG4gICAgICAgICAgdXBsb2FkX2RhdGU6IHJldHVybkxpc3RbaV0udXBsb2FkX2RhdGUsXHJcbiAgICAgICAgICB1cGxvYWRfbWVtYmVyOiByZXR1cm5MaXN0W2ldLnVwbG9hZF9tZW1iZXJcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDAsIGxlbiA9IHJldHVybkxpc3RbaV0uaW1nX2xpc3QubGVuZ3RoOyBqIDwgbGVuOyBqKyspIHtcclxuICAgICAgICAgIGxldCBvYmogPSByZXR1cm5MaXN0W2ldLmltZ19saXN0W2pdXHJcbiAgICAgICAgICBsaXN0W2ldLmltZ19saXN0LnB1c2gob2JqLmltZ191cmwpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubGlzdCA9IGxpc3RcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfSlcclxuICB9XHJcbiAgYWRkUGhvdG9zICgpIHtcclxuICAgIGFkZFBob3RvKHtcclxuICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxyXG4gICAgICBpbWdfdXJsOiB0aGlzLmltZ0xpc3RcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICBzaG93TXNnKCfmj5DkuqTmiJDlip8nKVxyXG4gICAgICAgIHRoaXMuZ2V0UGhvdG9MaXN0KClcclxuICAgICAgICB0aGlzLmltZ0xpc3QgPSBbXVxyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIHByZXZpZXcodXJsLCB1cmxzKSB7XHJcbiAgICAgIHByZXZpZXdJbWFnZSh1cmwsIHVybHMpXHJcbiAgICB9LFxyXG4gICAgdXBsb2FkKCkge1xyXG4gICAgICBsZXQgX3RoaXMgPSB0aGlzXHJcbiAgICAgIHd4LmNob29zZUltYWdlKHtcclxuICAgICAgICBjb3VudDogOSxcclxuICAgICAgICBzaXplVHlwZTogWydvcmlnaW5hbCcsICdjb21wcmVzc2VkJ10sXHJcbiAgICAgICAgc291cmNlVHlwZTogWydhbGJ1bScsICdjYW1lcmEnXSxcclxuICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgY29uc3QgbGVuZ3RoID0gcmVzLnRlbXBGaWxlUGF0aHMubGVuZ3RoXHJcbiAgICAgICAgICBpZiAobGVuZ3RoID4gdGhpcy5tYXhQaG90b0NvdW50KSB7XHJcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICfmnIDlpJrlj6rog73pgInmi6knICsgdGhpcy5tYXhQaG90b0NvdW50ICsgJ+W8oOWbvueJhycsXHJcbiAgICAgICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB3eC5zaG93TG9hZGluZyh7dGl0bGU6ICflm77niYfkuIrkvKDkuK0nfSlcclxuICAgICAgICAgIHJlcy50ZW1wRmlsZVBhdGhzLmZvckVhY2gocGF0aCA9PiB7XHJcbiAgICAgICAgICAgIGxldCB1cGxvYWQgPSB7fVxyXG4gICAgICAgICAgICB1cGxvYWQucGF0aCA9IHBhdGhcclxuICAgICAgICAgICAgdXBsb2FkLmVycm9yID0gZmFsc2VcclxuICAgICAgICAgICAgdXBsb2FkLnVwbG9hZFByb2dyZXNzID0gd3gudXBsb2FkRmlsZSh7XHJcbiAgICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly90ZXN0LmN0andoLmNvbS9hcGkvdjEvZmlsZS91cGxvYWRQaWMnLFxyXG4gICAgICAgICAgICAgIGZpbGVQYXRoOiBwYXRoLFxyXG4gICAgICAgICAgICAgIGZvcm1EYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAnbWVtYmVyX2lkJzogdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCxcclxuICAgICAgICAgICAgICAgICdtZW1iZXJfdG9rZW4nOiB0aGlzLm1lbWJlckluZm8ubWVtYmVyX3Rva2VuLFxyXG4gICAgICAgICAgICAgICAgJ2ZvbGRlcic6ICdjb21taXR0ZWUnXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBuYW1lOiAnZmlsZScsXHJcbiAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKVxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuZGF0YSAmJiBkYXRhLmRhdGEuZmlsZV91cmwpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc3QgdXJsID0gZGF0YS5kYXRhLmZpbGVfdXJsXHJcbiAgICAgICAgICAgICAgICAgIF90aGlzLmltZ0xpc3QucHVzaCh1cmwpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuaW1nTGlzdC5sZW5ndGggPT09IGxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICAgICAgICAgIH0sIDIwMDApXHJcbiAgICAgICAgICAgICAgICAgIF90aGlzLmFkZFBob3RvcygpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBfdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdXBsb2FkLnVwbG9hZFByb2dyZXNzLm9uUHJvZ3Jlc3NVcGRhdGUoZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgdXBsb2FkLnByb2dyZXNzID0gcmVzLnByb2dyZXNzXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIF90aGlzLnVwbG9hZHMucHVzaCh1cGxvYWQpXHJcbiAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19