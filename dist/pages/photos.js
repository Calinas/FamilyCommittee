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
                  if (_this.imgList.length === length) {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBob3Rvcy5qcyJdLCJuYW1lcyI6WyJiaW5kUmVsYXRpb25zaGlwIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJtc2ciLCJsaXN0IiwibWVtYmVySW5mbyIsImNsYXNzSW5mbyIsInBzIiwicG4iLCJtYXhDb3VudCIsImltZ0xpc3QiLCJ1cGxvYWRzIiwibWV0aG9kcyIsInByZXZpZXciLCJ1cmwiLCJ1cmxzIiwidXBsb2FkIiwiX3RoaXMiLCJ3eCIsImNob29zZUltYWdlIiwiY291bnQiLCJzaXplVHlwZSIsInNvdXJjZVR5cGUiLCJzdWNjZXNzIiwibGVuZ3RoIiwicmVzIiwidGVtcEZpbGVQYXRocyIsIm1heFBob3RvQ291bnQiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJmb3JFYWNoIiwicGF0aCIsImVycm9yIiwidXBsb2FkUHJvZ3Jlc3MiLCJ1cGxvYWRGaWxlIiwiZmlsZVBhdGgiLCJmb3JtRGF0YSIsIm1lbWJlcl9pZCIsIm1lbWJlcl90b2tlbiIsIm5hbWUiLCJKU09OIiwicGFyc2UiLCJmaWxlX3VybCIsInB1c2giLCJhZGRQaG90b3MiLCIkYXBwbHkiLCJvblByb2dyZXNzVXBkYXRlIiwicHJvZ3Jlc3MiLCJnZXRTdG9yYWdlU3luYyIsImdldFBob3RvTGlzdCIsImNsYXNzX2lkIiwiaWQiLCJ0aGVuIiwicmV0dXJuTGlzdCIsImkiLCJsZW4iLCJpbWdfbGlzdCIsInVwbG9hZF9kYXRlIiwidXBsb2FkX21lbWJlciIsImoiLCJvYmoiLCJpbWdfdXJsIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7SUFDcUJBLGdCOzs7Ozs7Ozs7Ozs7Ozs2TUFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdUQyxJLEdBQU87QUFDTEMsV0FBSyxFQURBO0FBRUxDLFlBQU0sRUFGRDtBQUdMQyxrQkFBWSxJQUhQO0FBSUxDLGlCQUFX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RCxHQUFsRCxFQUF1RDtBQUNyRG5ELGVBQUttRCxDQUFMLElBQVU7QUFDUkUsc0JBQVUsRUFERjtBQUVSQyx5QkFBYUosV0FBV0MsQ0FBWCxFQUFjRyxXQUZuQjtBQUdSQywyQkFBZUwsV0FBV0MsQ0FBWCxFQUFjSTtBQUhyQixXQUFWO0FBS0EsZUFBSyxJQUFJQyxJQUFJLENBQVIsRUFBV0osUUFBTUYsV0FBV0MsQ0FBWCxFQUFjRSxRQUFkLENBQXVCakMsTUFBN0MsRUFBcURvQyxJQUFJSixLQUF6RCxFQUE4REksR0FBOUQsRUFBbUU7QUFDakUsZ0JBQUlDLE1BQU1QLFdBQVdDLENBQVgsRUFBY0UsUUFBZCxDQUF1QkcsQ0FBdkIsQ0FBVjtBQUNBeEQsaUJBQUttRCxDQUFMLEVBQVFFLFFBQVIsQ0FBaUJiLElBQWpCLENBQXNCaUIsSUFBSUMsT0FBMUI7QUFDRDtBQUNGO0FBQ0QsZUFBSzFELElBQUwsR0FBWUEsSUFBWjtBQUNBLGVBQUswQyxNQUFMO0FBQ0QsT0FwQkQ7QUFxQkQ7OztnQ0FDWTtBQUFBOztBQUNYLDBCQUFTO0FBQ1BLLGtCQUFVLEtBQUs3QyxTQUFMLENBQWU4QyxFQURsQjtBQUVQVSxpQkFBUyxLQUFLcEQ7QUFGUCxPQUFULEVBR0cyQyxJQUhILENBR1EsZUFBTztBQUNiLFlBQUk1QixJQUFJdkIsSUFBSixDQUFTcUIsT0FBYixFQUFzQjtBQUNwQiwrQkFBUSxNQUFSO0FBQ0EsaUJBQUsyQixZQUFMO0FBQ0EsaUJBQUt4QyxPQUFMLEdBQWUsRUFBZjtBQUNBLGlCQUFLb0MsTUFBTDtBQUNEO0FBQ0YsT0FWRDtBQVdEOzs7O0VBeEQyQ2lCLGVBQUtDLEk7O2tCQUE5QmpFLGdCIiwiZmlsZSI6InBob3Rvcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCB7IHVwbG9hZEltYWdlLCBzaG93TXNnLCBwcmV2aWV3SW1hZ2UgfSBmcm9tICcuLi91dGlscy9jb21tb24nXG5pbXBvcnQgeyBwaG90b0luZGV4LCBhZGRQaG90byB9IGZyb20gJy4uL2FwaS96b25lJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgYmluZFJlbGF0aW9uc2hpcCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn55u45YaMJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgbXNnOiAnJyxcbiAgICBsaXN0OiBbXSxcbiAgICBtZW1iZXJJbmZvOiBudWxsLFxuICAgIGNsYXNzSW5mbzogbnVsbCxcbiAgICBwczogMTAsXG4gICAgcG46IDEsXG4gICAgbWF4Q291bnQ6IDYsXG4gICAgaW1nTGlzdDogW10sXG4gICAgdXBsb2FkczogW11cbiAgfVxuICBvbkxvYWQoKSB7XG4gICAgdGhpcy5jbGFzc0luZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnY2xhc3NJbmZvJylcbiAgICB0aGlzLm1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXG4gICAgdGhpcy5nZXRQaG90b0xpc3QoKVxuICAgIHRoaXMuJGFwcGx5KClcbiAgfVxuICBnZXRQaG90b0xpc3QoKSB7XG4gICAgcGhvdG9JbmRleCh7XG4gICAgICBwczogdGhpcy5wcyxcbiAgICAgIHBuOiB0aGlzLnBuLFxuICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IGxpc3QgPSBbXVxuICAgICAgbGV0IHJldHVybkxpc3QgPSByZXMuZGF0YS5saXN0XG4gICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gcmV0dXJuTGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBsaXN0W2ldID0ge1xuICAgICAgICAgIGltZ19saXN0OiBbXSxcbiAgICAgICAgICB1cGxvYWRfZGF0ZTogcmV0dXJuTGlzdFtpXS51cGxvYWRfZGF0ZSxcbiAgICAgICAgICB1cGxvYWRfbWVtYmVyOiByZXR1cm5MaXN0W2ldLnVwbG9hZF9tZW1iZXJcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBqID0gMCwgbGVuID0gcmV0dXJuTGlzdFtpXS5pbWdfbGlzdC5sZW5ndGg7IGogPCBsZW47IGorKykge1xuICAgICAgICAgIGxldCBvYmogPSByZXR1cm5MaXN0W2ldLmltZ19saXN0W2pdXG4gICAgICAgICAgbGlzdFtpXS5pbWdfbGlzdC5wdXNoKG9iai5pbWdfdXJsKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmxpc3QgPSBsaXN0XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSlcbiAgfVxuICBhZGRQaG90b3MgKCkge1xuICAgIGFkZFBob3RvKHtcbiAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgIGltZ191cmw6IHRoaXMuaW1nTGlzdFxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgIHNob3dNc2coJ+aPkOS6pOaIkOWKnycpXG4gICAgICAgIHRoaXMuZ2V0UGhvdG9MaXN0KClcbiAgICAgICAgdGhpcy5pbWdMaXN0ID0gW11cbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBwcmV2aWV3KHVybCwgdXJscykge1xuICAgICAgcHJldmlld0ltYWdlKHVybCwgdXJscylcbiAgICB9LFxuICAgIHVwbG9hZCgpIHtcbiAgICAgIGxldCBfdGhpcyA9IHRoaXNcbiAgICAgIHd4LmNob29zZUltYWdlKHtcbiAgICAgICAgY291bnQ6IDksXG4gICAgICAgIHNpemVUeXBlOiBbJ29yaWdpbmFsJywgJ2NvbXByZXNzZWQnXSxcbiAgICAgICAgc291cmNlVHlwZTogWydhbGJ1bScsICdjYW1lcmEnXSxcbiAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICBjb25zdCBsZW5ndGggPSByZXMudGVtcEZpbGVQYXRocy5sZW5ndGhcbiAgICAgICAgICBpZiAobGVuZ3RoID4gdGhpcy5tYXhQaG90b0NvdW50KSB7XG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+acgOWkmuWPquiDvemAieaLqScgKyB0aGlzLm1heFBob3RvQ291bnQgKyAn5byg5Zu+54mHJyxcbiAgICAgICAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXMudGVtcEZpbGVQYXRocy5mb3JFYWNoKHBhdGggPT4ge1xuICAgICAgICAgICAgbGV0IHVwbG9hZCA9IHt9XG4gICAgICAgICAgICB1cGxvYWQucGF0aCA9IHBhdGhcbiAgICAgICAgICAgIHVwbG9hZC5lcnJvciA9IGZhbHNlXG4gICAgICAgICAgICB1cGxvYWQudXBsb2FkUHJvZ3Jlc3MgPSB3eC51cGxvYWRGaWxlKHtcbiAgICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly90ZXN0LmN0andoLmNvbS9hcGkvdjEvZmlsZS91cGxvYWRQaWMnLFxuICAgICAgICAgICAgICBmaWxlUGF0aDogcGF0aCxcbiAgICAgICAgICAgICAgZm9ybURhdGE6IHtcbiAgICAgICAgICAgICAgICAnbWVtYmVyX2lkJzogdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCxcbiAgICAgICAgICAgICAgICAnbWVtYmVyX3Rva2VuJzogdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl90b2tlbixcbiAgICAgICAgICAgICAgICAnZm9sZGVyJzogJ2NvbW1pdHRlZSdcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKVxuICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IGRhdGEuZGF0YS5maWxlX3VybFxuICAgICAgICAgICAgICAgIF90aGlzLmltZ0xpc3QucHVzaCh1cmwpXG4gICAgICAgICAgICAgICAgaWYoX3RoaXMuaW1nTGlzdC5sZW5ndGggPT09IGxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgX3RoaXMuYWRkUGhvdG9zKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHVwbG9hZC51cGxvYWRQcm9ncmVzcy5vblByb2dyZXNzVXBkYXRlKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICB1cGxvYWQucHJvZ3Jlc3MgPSByZXMucHJvZ3Jlc3NcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBfdGhpcy51cGxvYWRzLnB1c2godXBsb2FkKVxuICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxufVxuIl19