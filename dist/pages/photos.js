'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _wepyRedux = require('./../npm/wepy-redux/lib/index.js');

var _common = require('./../utils/common.js');

var _zone = require('./../api/zone.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var store = (0, _wepyRedux.getStore)();

var bindRelationship = (_dec = (0, _wepyRedux.connect)({
  isPresident: function isPresident(state) {
    return state.zone.isPresident;
  }
}), _dec(_class = function (_wepy$page) {
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
      ps: 6,
      pn: 1,
      maxCount: 6,
      imgList: [],
      uploads: [],
      isEditMode: false,
      deleteIds: [],
      loading: false,
      loadFinished: false
    }, _this2.methods = {
      editPhoto: function editPhoto(listIdx, imgListIdx, type, memberId) {
        if (this.memberInfo.member_id !== memberId && !this.isPresident) {
          (0, _common.showMsg)('您没有权限删除该照片');
          return;
        }
        var val = type === 'edit' ? 'delete' : 'edit';
        var id = this.list[listIdx].img_list[imgListIdx].photo_img_id;
        this.list[listIdx].img_list[imgListIdx].type = val;
        if (val === 'delete') {
          this.deleteIds.push(id);
        } else {
          var idx = this.deleteIds.indexOf(id);
          this.deleteIds.splice(idx, 1);
        }
        this.$apply();
      },
      chooseAll: function chooseAll() {
        this.loopPhoto('delete');
        this.$apply();
      },
      reset: function reset() {
        this.resetPhoto();
      },
      deletePhoto: function deletePhoto() {
        var _this3 = this;

        if (!this.deleteIds.length) return;
        (0, _zone.delPhoto)({ photo_img_ids: this.deleteIds, class_id: this.classInfo.id }).then(function (res) {
          if (res.data.success) {
            (0, _common.showMsg)('删除成功');
            _this3.resetPhoto();
            _this3.resetData();
            _this3.getPhotoList();
          }
        });
        this.$apply();
      },
      setPhotoEdit: function setPhotoEdit() {
        this.isEditMode = true;
        this.loopPhoto('edit');
        this.$apply();
      },
      preview: function preview(url, urls) {
        (0, _common.previewImage)(url, urls);
      },
      upload: function upload() {
        var _this4 = this;

        var _this = this;
        wx.chooseImage({
          count: 9,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success: function success(res) {
            var length = res.tempFilePaths.length;
            if (length > _this4.maxPhotoCount) {
              wx.showToast({
                title: '最多只能选择' + _this4.maxPhotoCount + '张图片',
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
                  'member_id': _this4.memberInfo.member_id,
                  'member_token': _this4.memberInfo.member_token,
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
    key: 'onReachBottom',
    value: function onReachBottom() {
      if (this.loading || this.loadFinished) return;
      this.getPhotoList();
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      console.log(store.getState());
      this.classInfo = wx.getStorageSync('classInfo');
      this.memberInfo = wx.getStorageSync('memberInfo');
      this.getPhotoList();
      this.$apply();
    }
  }, {
    key: 'getPhotoList',
    value: function getPhotoList() {
      var _this5 = this;

      this.loading = true;
      (0, _zone.photoIndex)({
        ps: this.ps,
        pn: this.pn,
        class_id: this.classInfo.id
      }).then(function (res) {
        var returnList = [].concat(_toConsumableArray(res.data.list));
        for (var i = 0, len = returnList.length; i < len; i++) {
          returnList[i] = {
            img_list: returnList[i].img_list,
            upload_date: returnList[i].upload_date,
            upload_members: returnList[i].upload_members,
            preview_list: []
          };
          for (var j = 0, _len2 = returnList[i].img_list.length; j < _len2; j++) {
            var obj = returnList[i].img_list[j];
            obj.type = _this5.isEditMode ? 'edit' : 'none';
            returnList[i].preview_list.push(obj.img_url);
          }
        }
        _this5.list = [].concat(_toConsumableArray(_this5.list), _toConsumableArray(returnList));
        if (res.data.list.length < _this5.ps) {
          _this5.loadFinished = true;
        }
        _this5.loading = false;
        _this5.pn++;
        _this5.$apply();
      });
    }
  }, {
    key: 'addPhotos',
    value: function addPhotos() {
      var _this6 = this;

      (0, _zone.addPhoto)({
        class_id: this.classInfo.id,
        img_url: this.imgList
      }).then(function (res) {
        if (res.data.success) {
          (0, _common.showMsg)('提交成功');
          _this6.resetData();
          _this6.getPhotoList();
          _this6.imgList = [];
          _this6.$apply();
        }
      });
    }
  }, {
    key: 'loopPhoto',
    value: function loopPhoto(type) {
      for (var i = 0, len = this.list.length; i < len; i++) {
        var imgList = this.list[i].img_list;
        for (var j = 0, length = imgList.length; j < length; j++) {
          if (type === 'edit' && imgList[j].member_id !== this.memberInfo.member_id && !this.isPresident) {
            console.log(1);
            // 编辑模式下，如果不是本人也不是会长，则不展示编辑框
            imgList[j].type = 'none';
          } else {
            imgList[j].type = type;
          }
        }
      }
    }
  }, {
    key: 'resetPhoto',
    value: function resetPhoto() {
      this.deleteIds = [];
      this.isEditMode = false;
      this.loopPhoto('none');
      this.$apply();
    }
  }, {
    key: 'resetData',
    value: function resetData() {
      this.ps = 6;
      this.pn = 1;
      this.loading = false;
      this.loadFinished = false;
      this.list = [];
      this.$apply();
    }
  }]);

  return bindRelationship;
}(_wepy2.default.page)) || _class);

Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(bindRelationship , 'pages/photos'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBob3Rvcy5qcyJdLCJuYW1lcyI6WyJzdG9yZSIsImJpbmRSZWxhdGlvbnNoaXAiLCJpc1ByZXNpZGVudCIsInN0YXRlIiwiem9uZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwibXNnIiwibGlzdCIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJwcyIsInBuIiwibWF4Q291bnQiLCJpbWdMaXN0IiwidXBsb2FkcyIsImlzRWRpdE1vZGUiLCJkZWxldGVJZHMiLCJsb2FkaW5nIiwibG9hZEZpbmlzaGVkIiwibWV0aG9kcyIsImVkaXRQaG90byIsImxpc3RJZHgiLCJpbWdMaXN0SWR4IiwidHlwZSIsIm1lbWJlcklkIiwibWVtYmVyX2lkIiwidmFsIiwiaWQiLCJpbWdfbGlzdCIsInBob3RvX2ltZ19pZCIsInB1c2giLCJpZHgiLCJpbmRleE9mIiwic3BsaWNlIiwiJGFwcGx5IiwiY2hvb3NlQWxsIiwibG9vcFBob3RvIiwicmVzZXQiLCJyZXNldFBob3RvIiwiZGVsZXRlUGhvdG8iLCJsZW5ndGgiLCJwaG90b19pbWdfaWRzIiwiY2xhc3NfaWQiLCJ0aGVuIiwicmVzIiwic3VjY2VzcyIsInJlc2V0RGF0YSIsImdldFBob3RvTGlzdCIsInNldFBob3RvRWRpdCIsInByZXZpZXciLCJ1cmwiLCJ1cmxzIiwidXBsb2FkIiwiX3RoaXMiLCJ3eCIsImNob29zZUltYWdlIiwiY291bnQiLCJzaXplVHlwZSIsInNvdXJjZVR5cGUiLCJ0ZW1wRmlsZVBhdGhzIiwibWF4UGhvdG9Db3VudCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsInNob3dMb2FkaW5nIiwiZm9yRWFjaCIsInBhdGgiLCJlcnJvciIsInVwbG9hZFByb2dyZXNzIiwidXBsb2FkRmlsZSIsIndlcHkiLCIkYXBwQ29uZmlnIiwiYmFzZVVybCIsImZpbGVQYXRoIiwiZm9ybURhdGEiLCJtZW1iZXJfdG9rZW4iLCJuYW1lIiwiSlNPTiIsInBhcnNlIiwiZmlsZV91cmwiLCJzZXRUaW1lb3V0IiwiaGlkZUxvYWRpbmciLCJhZGRQaG90b3MiLCJvblByb2dyZXNzVXBkYXRlIiwicHJvZ3Jlc3MiLCJjb25zb2xlIiwibG9nIiwiZ2V0U3RhdGUiLCJnZXRTdG9yYWdlU3luYyIsInJldHVybkxpc3QiLCJpIiwibGVuIiwidXBsb2FkX2RhdGUiLCJ1cGxvYWRfbWVtYmVycyIsInByZXZpZXdfbGlzdCIsImoiLCJvYmoiLCJpbWdfdXJsIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxRQUFRLDBCQUFaOztJQVFxQkMsZ0IsV0FOcEIsd0JBQVE7QUFDUEMsYUFETyx1QkFDS0MsS0FETCxFQUNZO0FBQ2pCLFdBQU9BLE1BQU1DLElBQU4sQ0FBV0YsV0FBbEI7QUFDRDtBQUhNLENBQVIsQzs7Ozs7Ozs7Ozs7Ozs7Nk1BT0NHLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdUQyxJLEdBQU87QUFDTEMsV0FBSyxFQURBO0FBRUxDLFlBQU0sRUFGRDtBQUdMQyxrQkFBWSxJQUhQO0FBSUxDLGlCQUFXLElBSk47QUFLTEMsVUFBSSxDQUxDO0FBTUxDLFVBQUksQ0FOQztBQU9MQyxnQkFBVSxDQVBMO0FBUUxDLGVBQVMsRUFSSjtBQVNMQyxlQUFTLEVBVEo7QUFVTEMsa0JBQVksS0FWUDtBQVdMQyxpQkFBVyxFQVhOO0FBWUxDLGVBQVMsS0FaSjtBQWFMQyxvQkFBYztBQWJULEssU0FtR1BDLE8sR0FBVTtBQUNSQyxlQURRLHFCQUNFQyxPQURGLEVBQ1dDLFVBRFgsRUFDdUJDLElBRHZCLEVBQzZCQyxRQUQ3QixFQUN1QztBQUM3QyxZQUFJLEtBQUtoQixVQUFMLENBQWdCaUIsU0FBaEIsS0FBOEJELFFBQTlCLElBQTBDLENBQUMsS0FBS3hCLFdBQXBELEVBQWlFO0FBQy9ELCtCQUFRLFlBQVI7QUFDQTtBQUNEO0FBQ0QsWUFBTTBCLE1BQU1ILFNBQVMsTUFBVCxHQUFrQixRQUFs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QUFDRjtBQUNGO0FBQ0Y7OztpQ0FDWTtBQUNYLFdBQUtQLFNBQUwsR0FBaUIsRUFBakI7QUFDQSxXQUFLRCxVQUFMLEdBQWtCLEtBQWxCO0FBQ0EsV0FBS3FCLFNBQUwsQ0FBZSxNQUFmO0FBQ0EsV0FBS0YsTUFBTDtBQUNEOzs7Z0NBQ1c7QUFDVixXQUFLeEIsRUFBTCxHQUFVLENBQVY7QUFDQSxXQUFLQyxFQUFMLEdBQVUsQ0FBVjtBQUNBLFdBQUtNLE9BQUwsR0FBZSxLQUFmO0FBQ0EsV0FBS0MsWUFBTCxHQUFvQixLQUFwQjtBQUNBLFdBQUtYLElBQUwsR0FBWSxFQUFaO0FBQ0EsV0FBSzJCLE1BQUw7QUFDRDs7OztFQXRHMkNvQyxlQUFLNEIsSTtrQkFBOUJuRyxnQiIsImZpbGUiOiJwaG90b3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgeyBjb25uZWN0LCBnZXRTdG9yZSB9IGZyb20gJ3dlcHktcmVkdXgnXG5pbXBvcnQgeyBzaG93TXNnLCBwcmV2aWV3SW1hZ2UgfSBmcm9tICd1dGlscy9jb21tb24nXG5pbXBvcnQgeyBwaG90b0luZGV4LCBhZGRQaG90bywgZGVsUGhvdG8gfSBmcm9tICdhcGkvem9uZSdcblxubGV0IHN0b3JlID0gZ2V0U3RvcmUoKVxuXG5AY29ubmVjdCh7XG4gIGlzUHJlc2lkZW50KHN0YXRlKSB7XG4gICAgcmV0dXJuIHN0YXRlLnpvbmUuaXNQcmVzaWRlbnRcbiAgfVxufSlcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgYmluZFJlbGF0aW9uc2hpcCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn55u45YaMJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgbXNnOiAnJyxcbiAgICBsaXN0OiBbXSxcbiAgICBtZW1iZXJJbmZvOiBudWxsLFxuICAgIGNsYXNzSW5mbzogbnVsbCxcbiAgICBwczogNixcbiAgICBwbjogMSxcbiAgICBtYXhDb3VudDogNixcbiAgICBpbWdMaXN0OiBbXSxcbiAgICB1cGxvYWRzOiBbXSxcbiAgICBpc0VkaXRNb2RlOiBmYWxzZSxcbiAgICBkZWxldGVJZHM6IFtdLFxuICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgIGxvYWRGaW5pc2hlZDogZmFsc2VcbiAgfVxuICBvblJlYWNoQm90dG9tKCkge1xuICAgIGlmICh0aGlzLmxvYWRpbmcgfHwgdGhpcy5sb2FkRmluaXNoZWQpIHJldHVyblxuICAgIHRoaXMuZ2V0UGhvdG9MaXN0KClcbiAgfVxuICBvbkxvYWQoKSB7XG4gICAgY29uc29sZS5sb2coc3RvcmUuZ2V0U3RhdGUoKSlcbiAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxuICAgIHRoaXMubWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcbiAgICB0aGlzLmdldFBob3RvTGlzdCgpXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIGdldFBob3RvTGlzdCgpIHtcbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlXG4gICAgcGhvdG9JbmRleCh7XG4gICAgICBwczogdGhpcy5wcyxcbiAgICAgIHBuOiB0aGlzLnBuLFxuICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IHJldHVybkxpc3QgPSBbLi4ucmVzLmRhdGEubGlzdF1cbiAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSByZXR1cm5MaXN0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHJldHVybkxpc3RbaV0gPSB7XG4gICAgICAgICAgaW1nX2xpc3Q6IHJldHVybkxpc3RbaV0uaW1nX2xpc3QsXG4gICAgICAgICAgdXBsb2FkX2RhdGU6IHJldHVybkxpc3RbaV0udXBsb2FkX2RhdGUsXG4gICAgICAgICAgdXBsb2FkX21lbWJlcnM6IHJldHVybkxpc3RbaV0udXBsb2FkX21lbWJlcnMsXG4gICAgICAgICAgcHJldmlld19saXN0OiBbXVxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGogPSAwLCBsZW4gPSByZXR1cm5MaXN0W2ldLmltZ19saXN0Lmxlbmd0aDsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgICAgbGV0IG9iaiA9IHJldHVybkxpc3RbaV0uaW1nX2xpc3Rbal1cbiAgICAgICAgICBvYmoudHlwZSA9IHRoaXMuaXNFZGl0TW9kZSA/ICdlZGl0JyA6ICdub25lJ1xuICAgICAgICAgIHJldHVybkxpc3RbaV0ucHJldmlld19saXN0LnB1c2gob2JqLmltZ191cmwpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMubGlzdCA9IFsuLi50aGlzLmxpc3QsIC4uLnJldHVybkxpc3RdXG4gICAgICBpZiAocmVzLmRhdGEubGlzdC5sZW5ndGggPCB0aGlzLnBzKSB7XG4gICAgICAgIHRoaXMubG9hZEZpbmlzaGVkID0gdHJ1ZVxuICAgICAgfVxuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2VcbiAgICAgIHRoaXMucG4rK1xuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0pXG4gIH1cbiAgYWRkUGhvdG9zICgpIHtcbiAgICBhZGRQaG90byh7XG4gICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXG4gICAgICBpbWdfdXJsOiB0aGlzLmltZ0xpc3RcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICBzaG93TXNnKCfmj5DkuqTmiJDlip8nKVxuICAgICAgICB0aGlzLnJlc2V0RGF0YSgpXG4gICAgICAgIHRoaXMuZ2V0UGhvdG9MaXN0KClcbiAgICAgICAgdGhpcy5pbWdMaXN0ID0gW11cbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgbG9vcFBob3RvICh0eXBlKSB7XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMubGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgbGV0IGltZ0xpc3QgPSB0aGlzLmxpc3RbaV0uaW1nX2xpc3RcbiAgICAgIGZvciAobGV0IGogPSAwLCBsZW5ndGggPSBpbWdMaXN0Lmxlbmd0aDsgaiA8IGxlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmICh0eXBlID09PSAnZWRpdCcgJiYgKGltZ0xpc3Rbal0ubWVtYmVyX2lkICE9PSB0aGlzLm1lbWJlckluZm8ubWVtYmVyX2lkICYmICF0aGlzLmlzUHJlc2lkZW50KSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKDEpXG4gICAgICAgICAgLy8g57yW6L6R5qih5byP5LiL77yM5aaC5p6c5LiN5piv5pys5Lq65Lmf5LiN5piv5Lya6ZW/77yM5YiZ5LiN5bGV56S657yW6L6R5qGGXG4gICAgICAgICAgaW1nTGlzdFtqXS50eXBlID0gJ25vbmUnXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaW1nTGlzdFtqXS50eXBlID0gdHlwZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJlc2V0UGhvdG8oKSB7XG4gICAgdGhpcy5kZWxldGVJZHMgPSBbXVxuICAgIHRoaXMuaXNFZGl0TW9kZSA9IGZhbHNlXG4gICAgdGhpcy5sb29wUGhvdG8oJ25vbmUnKVxuICAgIHRoaXMuJGFwcGx5KClcbiAgfVxuICByZXNldERhdGEoKSB7XG4gICAgdGhpcy5wcyA9IDZcbiAgICB0aGlzLnBuID0gMVxuICAgIHRoaXMubG9hZGluZyA9IGZhbHNlXG4gICAgdGhpcy5sb2FkRmluaXNoZWQgPSBmYWxzZVxuICAgIHRoaXMubGlzdCA9IFtdXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgZWRpdFBob3RvKGxpc3RJZHgsIGltZ0xpc3RJZHgsIHR5cGUsIG1lbWJlcklkKSB7XG4gICAgICBpZiAodGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCAhPT0gbWVtYmVySWQgJiYgIXRoaXMuaXNQcmVzaWRlbnQpIHtcbiAgICAgICAgc2hvd01zZygn5oKo5rKh5pyJ5p2D6ZmQ5Yig6Zmk6K+l54Wn54mHJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBjb25zdCB2YWwgPSB0eXBlID09PSAnZWRpdCcgPyAnZGVsZXRlJyA6ICdlZGl0J1xuICAgICAgY29uc3QgaWQgPSB0aGlzLmxpc3RbbGlzdElkeF0uaW1nX2xpc3RbaW1nTGlzdElkeF0ucGhvdG9faW1nX2lkXG4gICAgICB0aGlzLmxpc3RbbGlzdElkeF0uaW1nX2xpc3RbaW1nTGlzdElkeF0udHlwZSA9IHZhbFxuICAgICAgaWYgKHZhbCA9PT0gJ2RlbGV0ZScpIHtcbiAgICAgICAgdGhpcy5kZWxldGVJZHMucHVzaChpZClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGlkeCA9IHRoaXMuZGVsZXRlSWRzLmluZGV4T2YoaWQpXG4gICAgICAgIHRoaXMuZGVsZXRlSWRzLnNwbGljZShpZHgsIDEpXG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBjaG9vc2VBbGwoKSB7XG4gICAgICB0aGlzLmxvb3BQaG90bygnZGVsZXRlJylcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIHJlc2V0KCkge1xuICAgICAgdGhpcy5yZXNldFBob3RvKClcbiAgICB9LFxuICAgIGRlbGV0ZVBob3RvKCkge1xuICAgICAgaWYgKCF0aGlzLmRlbGV0ZUlkcy5sZW5ndGgpIHJldHVyblxuICAgICAgZGVsUGhvdG8oe3Bob3RvX2ltZ19pZHM6IHRoaXMuZGVsZXRlSWRzLCBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWR9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgc2hvd01zZygn5Yig6Zmk5oiQ5YqfJylcbiAgICAgICAgICB0aGlzLnJlc2V0UGhvdG8oKVxuICAgICAgICAgIHRoaXMucmVzZXREYXRhKClcbiAgICAgICAgICB0aGlzLmdldFBob3RvTGlzdCgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBzZXRQaG90b0VkaXQoKSB7XG4gICAgICB0aGlzLmlzRWRpdE1vZGUgPSB0cnVlXG4gICAgICB0aGlzLmxvb3BQaG90bygnZWRpdCcpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICBwcmV2aWV3KHVybCwgdXJscykge1xuICAgICAgcHJldmlld0ltYWdlKHVybCwgdXJscylcbiAgICB9LFxuICAgIHVwbG9hZCgpIHtcbiAgICAgIGxldCBfdGhpcyA9IHRoaXNcbiAgICAgIHd4LmNob29zZUltYWdlKHtcbiAgICAgICAgY291bnQ6IDksXG4gICAgICAgIHNpemVUeXBlOiBbJ29yaWdpbmFsJywgJ2NvbXByZXNzZWQnXSxcbiAgICAgICAgc291cmNlVHlwZTogWydhbGJ1bScsICdjYW1lcmEnXSxcbiAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICBjb25zdCBsZW5ndGggPSByZXMudGVtcEZpbGVQYXRocy5sZW5ndGhcbiAgICAgICAgICBpZiAobGVuZ3RoID4gdGhpcy5tYXhQaG90b0NvdW50KSB7XG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+acgOWkmuWPquiDvemAieaLqScgKyB0aGlzLm1heFBob3RvQ291bnQgKyAn5byg5Zu+54mHJyxcbiAgICAgICAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgICB3eC5zaG93TG9hZGluZyh7dGl0bGU6ICflm77niYfkuIrkvKDkuK0nfSlcbiAgICAgICAgICByZXMudGVtcEZpbGVQYXRocy5mb3JFYWNoKHBhdGggPT4ge1xuICAgICAgICAgICAgbGV0IHVwbG9hZCA9IHt9XG4gICAgICAgICAgICB1cGxvYWQucGF0aCA9IHBhdGhcbiAgICAgICAgICAgIHVwbG9hZC5lcnJvciA9IGZhbHNlXG4gICAgICAgICAgICB1cGxvYWQudXBsb2FkUHJvZ3Jlc3MgPSB3eC51cGxvYWRGaWxlKHtcbiAgICAgICAgICAgICAgdXJsOiBgJHt3ZXB5LiRhcHBDb25maWcuYmFzZVVybH0vZmlsZS91cGxvYWRQaWNgLFxuICAgICAgICAgICAgICBmaWxlUGF0aDogcGF0aCxcbiAgICAgICAgICAgICAgZm9ybURhdGE6IHtcbiAgICAgICAgICAgICAgICAnbWVtYmVyX2lkJzogdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCxcbiAgICAgICAgICAgICAgICAnbWVtYmVyX3Rva2VuJzogdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl90b2tlbixcbiAgICAgICAgICAgICAgICAnZm9sZGVyJzogJ2NvbW1pdHRlZSdcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKVxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmRhdGEgJiYgZGF0YS5kYXRhLmZpbGVfdXJsKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBkYXRhLmRhdGEuZmlsZV91cmxcbiAgICAgICAgICAgICAgICAgIF90aGlzLmltZ0xpc3QucHVzaCh1cmwpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5pbWdMaXN0Lmxlbmd0aCA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgICAgICAgICAgICAgfSwgMjAwMClcbiAgICAgICAgICAgICAgICAgIF90aGlzLmFkZFBob3RvcygpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB1cGxvYWQudXBsb2FkUHJvZ3Jlc3Mub25Qcm9ncmVzc1VwZGF0ZShmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgdXBsb2FkLnByb2dyZXNzID0gcmVzLnByb2dyZXNzXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgX3RoaXMudXBsb2Fkcy5wdXNoKHVwbG9hZClcbiAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cbiJdfQ==