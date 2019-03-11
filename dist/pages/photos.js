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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBob3Rvcy5qcyJdLCJuYW1lcyI6WyJiaW5kUmVsYXRpb25zaGlwIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJtc2ciLCJsaXN0IiwibWVtYmVySW5mbyIsImNsYXNzSW5mbyIsInBzIiwicG4iLCJtYXhDb3VudCIsImltZ0xpc3QiLCJ1cGxvYWRzIiwibWV0aG9kcyIsInByZXZpZXciLCJ1cmwiLCJ1cmxzIiwidXBsb2FkIiwiX3RoaXMiLCJ3eCIsImNob29zZUltYWdlIiwiY291bnQiLCJzaXplVHlwZSIsInNvdXJjZVR5cGUiLCJzdWNjZXNzIiwibGVuZ3RoIiwicmVzIiwidGVtcEZpbGVQYXRocyIsIm1heFBob3RvQ291bnQiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJzaG93TG9hZGluZyIsImZvckVhY2giLCJwYXRoIiwiZXJyb3IiLCJ1cGxvYWRQcm9ncmVzcyIsInVwbG9hZEZpbGUiLCJmaWxlUGF0aCIsImZvcm1EYXRhIiwibWVtYmVyX2lkIiwibWVtYmVyX3Rva2VuIiwibmFtZSIsIkpTT04iLCJwYXJzZSIsImZpbGVfdXJsIiwicHVzaCIsInNldFRpbWVvdXQiLCJoaWRlTG9hZGluZyIsImFkZFBob3RvcyIsIiRhcHBseSIsIm9uUHJvZ3Jlc3NVcGRhdGUiLCJwcm9ncmVzcyIsImdldFN0b3JhZ2VTeW5jIiwiZ2V0UGhvdG9MaXN0IiwiY2xhc3NfaWQiLCJpZCIsInRoZW4iLCJyZXR1cm5MaXN0IiwiaSIsImxlbiIsImltZ19saXN0IiwidXBsb2FkX2RhdGUiLCJ1cGxvYWRfbWVtYmVycyIsImoiLCJvYmoiLCJpbWdfdXJsIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7SUFDcUJBLGdCOzs7Ozs7Ozs7Ozs7Ozs2TUFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdUQyxJLEdBQU87QUFDTEMsV0FBSyxFQURBO0FB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T0FWRDtBQVdEOzs7O0VBeEQyQ2lCLGVBQUtDLEk7O2tCQUE5QnBFLGdCIiwiZmlsZSI6InBob3Rvcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7IHVwbG9hZEltYWdlLCBzaG93TXNnLCBwcmV2aWV3SW1hZ2UgfSBmcm9tICcuLi91dGlscy9jb21tb24nXG5pbXBvcnQgeyBwaG90b0luZGV4LCBhZGRQaG90byB9IGZyb20gJy4uL2FwaS96b25lJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgYmluZFJlbGF0aW9uc2hpcCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn55u45YaMJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgbXNnOiAnJyxcbiAgICBsaXN0OiBbXSxcbiAgICBtZW1iZXJJbmZvOiBudWxsLFxuICAgIGNsYXNzSW5mbzogbnVsbCxcbiAgICBwczogMTAsXG4gICAgcG46IDEsXG4gICAgbWF4Q291bnQ6IDYsXG4gICAgaW1nTGlzdDogW10sXG4gICAgdXBsb2FkczogW11cbiAgfVxuICBvbkxvYWQoKSB7XG4gICAgdGhpcy5jbGFzc0luZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnY2xhc3NJbmZvJylcbiAgICB0aGlzLm1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXG4gICAgdGhpcy5nZXRQaG90b0xpc3QoKVxuICAgIHRoaXMuJGFwcGx5KClcbiAgfVxuICBnZXRQaG90b0xpc3QoKSB7XG4gICAgcGhvdG9JbmRleCh7XG4gICAgICBwczogdGhpcy5wcyxcbiAgICAgIHBuOiB0aGlzLnBuLFxuICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IGxpc3QgPSBbXVxuICAgICAgbGV0IHJldHVybkxpc3QgPSByZXMuZGF0YS5saXN0XG4gICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gcmV0dXJuTGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBsaXN0W2ldID0ge1xuICAgICAgICAgIGltZ19saXN0OiBbXSxcbiAgICAgICAgICB1cGxvYWRfZGF0ZTogcmV0dXJuTGlzdFtpXS51cGxvYWRfZGF0ZSxcbiAgICAgICAgICB1cGxvYWRfbWVtYmVyczogcmV0dXJuTGlzdFtpXS51cGxvYWRfbWVtYmVyc1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGogPSAwLCBsZW4gPSByZXR1cm5MaXN0W2ldLmltZ19saXN0Lmxlbmd0aDsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgICAgbGV0IG9iaiA9IHJldHVybkxpc3RbaV0uaW1nX2xpc3Rbal1cbiAgICAgICAgICBsaXN0W2ldLmltZ19saXN0LnB1c2gob2JqLmltZ191cmwpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMubGlzdCA9IGxpc3RcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9KVxuICB9XG4gIGFkZFBob3RvcyAoKSB7XG4gICAgYWRkUGhvdG8oe1xuICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgaW1nX3VybDogdGhpcy5pbWdMaXN0XG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgc2hvd01zZygn5o+Q5Lqk5oiQ5YqfJylcbiAgICAgICAgdGhpcy5nZXRQaG90b0xpc3QoKVxuICAgICAgICB0aGlzLmltZ0xpc3QgPSBbXVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIHByZXZpZXcodXJsLCB1cmxzKSB7XG4gICAgICBwcmV2aWV3SW1hZ2UodXJsLCB1cmxzKVxuICAgIH0sXG4gICAgdXBsb2FkKCkge1xuICAgICAgbGV0IF90aGlzID0gdGhpc1xuICAgICAgd3guY2hvb3NlSW1hZ2Uoe1xuICAgICAgICBjb3VudDogOSxcbiAgICAgICAgc2l6ZVR5cGU6IFsnb3JpZ2luYWwnLCAnY29tcHJlc3NlZCddLFxuICAgICAgICBzb3VyY2VUeXBlOiBbJ2FsYnVtJywgJ2NhbWVyYSddLFxuICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgIGNvbnN0IGxlbmd0aCA9IHJlcy50ZW1wRmlsZVBhdGhzLmxlbmd0aFxuICAgICAgICAgIGlmIChsZW5ndGggPiB0aGlzLm1heFBob3RvQ291bnQpIHtcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn5pyA5aSa5Y+q6IO96YCJ5oupJyArIHRoaXMubWF4UGhvdG9Db3VudCArICflvKDlm77niYcnLFxuICAgICAgICAgICAgICBpY29uOiAnbm9uZSdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHt0aXRsZTogJ+WbvueJh+S4iuS8oOS4rSd9KVxuICAgICAgICAgIHJlcy50ZW1wRmlsZVBhdGhzLmZvckVhY2gocGF0aCA9PiB7XG4gICAgICAgICAgICBsZXQgdXBsb2FkID0ge31cbiAgICAgICAgICAgIHVwbG9hZC5wYXRoID0gcGF0aFxuICAgICAgICAgICAgdXBsb2FkLmVycm9yID0gZmFsc2VcbiAgICAgICAgICAgIHVwbG9hZC51cGxvYWRQcm9ncmVzcyA9IHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICAgICAgICB1cmw6ICdodHRwczovL3Rlc3QuY3Rqd2guY29tL2FwaS92MS9maWxlL3VwbG9hZFBpYycsXG4gICAgICAgICAgICAgIGZpbGVQYXRoOiBwYXRoLFxuICAgICAgICAgICAgICBmb3JtRGF0YToge1xuICAgICAgICAgICAgICAgICdtZW1iZXJfaWQnOiB0aGlzLm1lbWJlckluZm8ubWVtYmVyX2lkLFxuICAgICAgICAgICAgICAgICdtZW1iZXJfdG9rZW4nOiB0aGlzLm1lbWJlckluZm8ubWVtYmVyX3Rva2VuLFxuICAgICAgICAgICAgICAgICdmb2xkZXInOiAnY29tbWl0dGVlJ1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBuYW1lOiAnZmlsZScsXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuZGF0YSAmJiBkYXRhLmRhdGEuZmlsZV91cmwpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IGRhdGEuZGF0YS5maWxlX3VybFxuICAgICAgICAgICAgICAgICAgX3RoaXMuaW1nTGlzdC5wdXNoKHVybClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmltZ0xpc3QubGVuZ3RoID09PSBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICAgICAgICAgICAgICB9LCAyMDAwKVxuICAgICAgICAgICAgICAgICAgX3RoaXMuYWRkUGhvdG9zKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHVwbG9hZC51cGxvYWRQcm9ncmVzcy5vblByb2dyZXNzVXBkYXRlKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICB1cGxvYWQucHJvZ3Jlc3MgPSByZXMucHJvZ3Jlc3NcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBfdGhpcy51cGxvYWRzLnB1c2godXBsb2FkKVxuICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxufVxuIl19