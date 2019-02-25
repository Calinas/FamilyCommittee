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
            if (res.tempFilePaths.length > _this3.maxPhotoCount) {
              wx.showToast({
                title: '最多只能选择' + _this3.maxPhotoCount + '张图片',
                icon: 'none'
              });
            }
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
                  var url = data.data.file_url;
                  _this.imgList.push(url);
                  _this.addPhotos();
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
        }
      });
    }
  }]);

  return bindRelationship;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(bindRelationship , 'pages/photos'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBob3Rvcy5qcyJdLCJuYW1lcyI6WyJiaW5kUmVsYXRpb25zaGlwIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJtc2ciLCJsaXN0IiwibWVtYmVySW5mbyIsImNsYXNzSW5mbyIsInBzIiwicG4iLCJtYXhDb3VudCIsImltZ0xpc3QiLCJ1cGxvYWRzIiwibWV0aG9kcyIsInByZXZpZXciLCJ1cmwiLCJ1cmxzIiwidXBsb2FkIiwiX3RoaXMiLCJ3eCIsImNob29zZUltYWdlIiwiY291bnQiLCJzaXplVHlwZSIsInNvdXJjZVR5cGUiLCJzdWNjZXNzIiwicmVzIiwidGVtcEZpbGVQYXRocyIsImxlbmd0aCIsIm1heFBob3RvQ291bnQiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJmb3JFYWNoIiwicGF0aCIsImVycm9yIiwidXBsb2FkUHJvZ3Jlc3MiLCJ1cGxvYWRGaWxlIiwiZmlsZVBhdGgiLCJmb3JtRGF0YSIsIm1lbWJlcl9pZCIsIm1lbWJlcl90b2tlbiIsIm5hbWUiLCJKU09OIiwicGFyc2UiLCJmaWxlX3VybCIsInB1c2giLCJhZGRQaG90b3MiLCIkYXBwbHkiLCJvblByb2dyZXNzVXBkYXRlIiwicHJvZ3Jlc3MiLCJnZXRTdG9yYWdlU3luYyIsImdldFBob3RvTGlzdCIsImNsYXNzX2lkIiwiaWQiLCJ0aGVuIiwicmV0dXJuTGlzdCIsImkiLCJsZW4iLCJpbWdfbGlzdCIsInVwbG9hZF9kYXRlIiwidXBsb2FkX21lbWJlciIsImoiLCJvYmoiLCJpbWdfdXJsIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7SUFDcUJBLGdCOzs7Ozs7Ozs7Ozs7Ozs2TUFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdUQyxJLEdBQU87QUFDTEMsV0FBSyxFQURBO0FBRUxDLFlBQU0sRUFGRDtBQUdMQyxrQkFBWSxJQUhQO0FBSUxDLGlCQUFX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QVgsRUFBY0csV0FGbkI7QUFHUkMsMkJBQWVMLFdBQVdDLENBQVgsRUFBY0k7QUFIckIsV0FBVjtBQUtBLGVBQUssSUFBSUMsSUFBSSxDQUFSLEVBQVdKLFFBQU1GLFdBQVdDLENBQVgsRUFBY0UsUUFBZCxDQUF1Qi9CLE1BQTdDLEVBQXFEa0MsSUFBSUosS0FBekQsRUFBOERJLEdBQTlELEVBQW1FO0FBQ2pFLGdCQUFJQyxNQUFNUCxXQUFXQyxDQUFYLEVBQWNFLFFBQWQsQ0FBdUJHLENBQXZCLENBQVY7QUFDQXhELGlCQUFLbUQsQ0FBTCxFQUFRRSxRQUFSLENBQWlCYixJQUFqQixDQUFzQmlCLElBQUlDLE9BQTFCO0FBQ0Q7QUFDRjtBQUNELGVBQUsxRCxJQUFMLEdBQVlBLElBQVo7QUFDQSxlQUFLMEMsTUFBTDtBQUNELE9BcEJEO0FBcUJEOzs7Z0NBQ1k7QUFBQTs7QUFDWCwwQkFBUztBQUNQSyxrQkFBVSxLQUFLN0MsU0FBTCxDQUFlOEMsRUFEbEI7QUFFUFUsaUJBQVMsS0FBS3BEO0FBRlAsT0FBVCxFQUdHMkMsSUFISCxDQUdRLGVBQU87QUFDYixZQUFJN0IsSUFBSXRCLElBQUosQ0FBU3FCLE9BQWIsRUFBc0I7QUFDcEIsK0JBQVEsTUFBUjtBQUNBLGlCQUFLMkIsWUFBTDtBQUNEO0FBQ0YsT0FSRDtBQVNEOzs7O0VBdEQyQ2EsZUFBS0MsSTs7a0JBQTlCakUsZ0IiLCJmaWxlIjoicGhvdG9zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHsgdXBsb2FkSW1hZ2UsIHNob3dNc2csIHByZXZpZXdJbWFnZSB9IGZyb20gJy4uL3V0aWxzL2NvbW1vbidcbmltcG9ydCB7IHBob3RvSW5kZXgsIGFkZFBob3RvIH0gZnJvbSAnLi4vYXBpL3pvbmUnXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBiaW5kUmVsYXRpb25zaGlwIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnm7jlhownXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBtc2c6ICcnLFxuICAgIGxpc3Q6IFtdLFxuICAgIG1lbWJlckluZm86IG51bGwsXG4gICAgY2xhc3NJbmZvOiBudWxsLFxuICAgIHBzOiAxMCxcbiAgICBwbjogMSxcbiAgICBtYXhDb3VudDogNixcbiAgICBpbWdMaXN0OiBbXSxcbiAgICB1cGxvYWRzOiBbXVxuICB9XG4gIG9uTG9hZCgpIHtcbiAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxuICAgIHRoaXMubWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcbiAgICB0aGlzLmdldFBob3RvTGlzdCgpXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIGdldFBob3RvTGlzdCgpIHtcbiAgICBwaG90b0luZGV4KHtcbiAgICAgIHBzOiB0aGlzLnBzLFxuICAgICAgcG46IHRoaXMucG4sXG4gICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWRcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgbGlzdCA9IFtdXG4gICAgICBsZXQgcmV0dXJuTGlzdCA9IHJlcy5kYXRhLmxpc3RcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSByZXR1cm5MaXN0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGxpc3RbaV0gPSB7XG4gICAgICAgICAgaW1nX2xpc3Q6IFtdLFxuICAgICAgICAgIHVwbG9hZF9kYXRlOiByZXR1cm5MaXN0W2ldLnVwbG9hZF9kYXRlLFxuICAgICAgICAgIHVwbG9hZF9tZW1iZXI6IHJldHVybkxpc3RbaV0udXBsb2FkX21lbWJlclxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGogPSAwLCBsZW4gPSByZXR1cm5MaXN0W2ldLmltZ19saXN0Lmxlbmd0aDsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgICAgbGV0IG9iaiA9IHJldHVybkxpc3RbaV0uaW1nX2xpc3Rbal1cbiAgICAgICAgICBsaXN0W2ldLmltZ19saXN0LnB1c2gob2JqLmltZ191cmwpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMubGlzdCA9IGxpc3RcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9KVxuICB9XG4gIGFkZFBob3RvcyAoKSB7XG4gICAgYWRkUGhvdG8oe1xuICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgaW1nX3VybDogdGhpcy5pbWdMaXN0XG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgc2hvd01zZygn5o+Q5Lqk5oiQ5YqfJylcbiAgICAgICAgdGhpcy5nZXRQaG90b0xpc3QoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBwcmV2aWV3KHVybCwgdXJscykge1xuICAgICAgcHJldmlld0ltYWdlKHVybCwgdXJscylcbiAgICB9LFxuICAgIHVwbG9hZCgpIHtcbiAgICAgIGxldCBfdGhpcyA9IHRoaXNcbiAgICAgIHd4LmNob29zZUltYWdlKHtcbiAgICAgICAgY291bnQ6IDksXG4gICAgICAgIHNpemVUeXBlOiBbJ29yaWdpbmFsJywgJ2NvbXByZXNzZWQnXSxcbiAgICAgICAgc291cmNlVHlwZTogWydhbGJ1bScsICdjYW1lcmEnXSxcbiAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICBpZiAocmVzLnRlbXBGaWxlUGF0aHMubGVuZ3RoID4gdGhpcy5tYXhQaG90b0NvdW50KSB7XG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+acgOWkmuWPquiDvemAieaLqScgKyB0aGlzLm1heFBob3RvQ291bnQgKyAn5byg5Zu+54mHJyxcbiAgICAgICAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXMudGVtcEZpbGVQYXRocy5mb3JFYWNoKHBhdGggPT4ge1xuICAgICAgICAgICAgbGV0IHVwbG9hZCA9IHt9XG4gICAgICAgICAgICB1cGxvYWQucGF0aCA9IHBhdGhcbiAgICAgICAgICAgIHVwbG9hZC5lcnJvciA9IGZhbHNlXG4gICAgICAgICAgICB1cGxvYWQudXBsb2FkUHJvZ3Jlc3MgPSB3eC51cGxvYWRGaWxlKHtcbiAgICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly90ZXN0LmN0andoLmNvbS9hcGkvdjEvZmlsZS91cGxvYWRQaWMnLFxuICAgICAgICAgICAgICBmaWxlUGF0aDogcGF0aCxcbiAgICAgICAgICAgICAgZm9ybURhdGE6IHtcbiAgICAgICAgICAgICAgICAnbWVtYmVyX2lkJzogdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCxcbiAgICAgICAgICAgICAgICAnbWVtYmVyX3Rva2VuJzogdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl90b2tlbixcbiAgICAgICAgICAgICAgICAnZm9sZGVyJzogJ2NvbW1pdHRlZSdcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKVxuICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IGRhdGEuZGF0YS5maWxlX3VybFxuICAgICAgICAgICAgICAgIF90aGlzLmltZ0xpc3QucHVzaCh1cmwpXG4gICAgICAgICAgICAgICAgX3RoaXMuYWRkUGhvdG9zKClcbiAgICAgICAgICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdXBsb2FkLnVwbG9hZFByb2dyZXNzLm9uUHJvZ3Jlc3NVcGRhdGUoZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgIHVwbG9hZC5wcm9ncmVzcyA9IHJlcy5wcm9ncmVzc1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF90aGlzLnVwbG9hZHMucHVzaCh1cGxvYWQpXG4gICAgICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG4iXX0=