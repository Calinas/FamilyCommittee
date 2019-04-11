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
        this.list[listIdx].img_list[imgListIdx].type = val;
        this.deleteIds.push(this.list[listIdx].img_list[imgListIdx].photo_img_id);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBob3Rvcy5qcyJdLCJuYW1lcyI6WyJzdG9yZSIsImJpbmRSZWxhdGlvbnNoaXAiLCJpc1ByZXNpZGVudCIsInN0YXRlIiwiem9uZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwibXNnIiwibGlzdCIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJwcyIsInBuIiwibWF4Q291bnQiLCJpbWdMaXN0IiwidXBsb2FkcyIsImlzRWRpdE1vZGUiLCJkZWxldGVJZHMiLCJsb2FkaW5nIiwibG9hZEZpbmlzaGVkIiwibWV0aG9kcyIsImVkaXRQaG90byIsImxpc3RJZHgiLCJpbWdMaXN0SWR4IiwidHlwZSIsIm1lbWJlcklkIiwibWVtYmVyX2lkIiwidmFsIiwiaW1nX2xpc3QiLCJwdXNoIiwicGhvdG9faW1nX2lkIiwiJGFwcGx5IiwiY2hvb3NlQWxsIiwibG9vcFBob3RvIiwicmVzZXQiLCJyZXNldFBob3RvIiwiZGVsZXRlUGhvdG8iLCJwaG90b19pbWdfaWRzIiwiY2xhc3NfaWQiLCJpZCIsInRoZW4iLCJyZXMiLCJzdWNjZXNzIiwicmVzZXREYXRhIiwiZ2V0UGhvdG9MaXN0Iiwic2V0UGhvdG9FZGl0IiwicHJldmlldyIsInVybCIsInVybHMiLCJ1cGxvYWQiLCJfdGhpcyIsInd4IiwiY2hvb3NlSW1hZ2UiLCJjb3VudCIsInNpemVUeXBlIiwic291cmNlVHlwZSIsImxlbmd0aCIsInRlbXBGaWxlUGF0aHMiLCJtYXhQaG90b0NvdW50Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwic2hvd0xvYWRpbmciLCJmb3JFYWNoIiwicGF0aCIsImVycm9yIiwidXBsb2FkUHJvZ3Jlc3MiLCJ1cGxvYWRGaWxlIiwid2VweSIsIiRhcHBDb25maWciLCJiYXNlVXJsIiwiZmlsZVBhdGgiLCJmb3JtRGF0YSIsIm1lbWJlcl90b2tlbiIsIm5hbWUiLCJKU09OIiwicGFyc2UiLCJmaWxlX3VybCIsInNldFRpbWVvdXQiLCJoaWRlTG9hZGluZyIsImFkZFBob3RvcyIsIm9uUHJvZ3Jlc3NVcGRhdGUiLCJwcm9ncmVzcyIsImNvbnNvbGUiLCJsb2ciLCJnZXRTdGF0ZSIsImdldFN0b3JhZ2VTeW5jIiwicmV0dXJuTGlzdCIsImkiLCJsZW4iLCJ1cGxvYWRfZGF0ZSIsInVwbG9hZF9tZW1iZXJzIiwicHJldmlld19saXN0IiwiaiIsIm9iaiIsImltZ191cmwiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQUlBLFFBQVEsMEJBQVo7O0lBUXFCQyxnQixXQU5wQix3QkFBUTtBQUNQQyxhQURPLHVCQUNLQyxLQURMLEVBQ1k7QUFDakIsV0FBT0EsTUFBTUMsSUFBTixDQUFXRixXQUFsQjtBQUNEO0FBSE0sQ0FBUixDOzs7Ozs7Ozs7Ozs7Ozs2TUFPQ0csTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1RDLEksR0FBTztBQUNMQyxXQUFLLEVBREE7QUFFTEMsWUFBTSxFQUZEO0FBR0xDLGtCQUFZLElBSFA7QUFJTEMsaUJBQVcsSUFKTjtBQUtMQyxVQUFJLENBTEM7QUFNTEMsVUFBSSxDQU5DO0FBT0xDLGdCQUFVLENBUEw7QUFRTEMsZUFBUyxFQVJKO0FBU0xDLGVBQVMsRUFUSjtBQVVMQyxrQkFBWSxLQVZQO0FBV0xDLGlCQUFXLEVBWE47QUFZTEMsZUFBUyxLQVpKO0FBYUxDLG9CQUFjO0FBYlQsSyxTQWtHUEMsTyxHQUFVO0FBQ1JDLGVBRFEscUJBQ0VDLE9BREYsRUFDV0MsVUFEWCxFQUN1QkMsSUFEdkIsRUFDNkJDLFFBRDdCLEVBQ3VDO0FBQzdDLFlBQUksS0FBS2hCLFVBQUwsQ0FBZ0JpQixTQUFoQixLQUE4QkQsUUFBOUIsSUFBMEMsQ0FBQyxLQUFLeEIsV0FBcEQsRUFBaUU7QUFDL0QsK0JBQVEsWUFBUjtBQUNBO0FBQ0Q7QUFDRCxZQUFNMEIsTUFBTUgsU0FBUyxNQUFULEdBQWtCLFFBQWxCLEdBQTZCLE1BQXpDO0FBQ0EsYUFBS2hC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OztFQXJHMkNxQyxlQUFLNEIsSTtrQkFBOUJoRyxnQiIsImZpbGUiOiJwaG90b3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgeyBjb25uZWN0LCBnZXRTdG9yZSB9IGZyb20gJ3dlcHktcmVkdXgnXG5pbXBvcnQgeyBzaG93TXNnLCBwcmV2aWV3SW1hZ2UgfSBmcm9tICd1dGlscy9jb21tb24nXG5pbXBvcnQgeyBwaG90b0luZGV4LCBhZGRQaG90bywgZGVsUGhvdG8gfSBmcm9tICdhcGkvem9uZSdcblxubGV0IHN0b3JlID0gZ2V0U3RvcmUoKVxuXG5AY29ubmVjdCh7XG4gIGlzUHJlc2lkZW50KHN0YXRlKSB7XG4gICAgcmV0dXJuIHN0YXRlLnpvbmUuaXNQcmVzaWRlbnRcbiAgfVxufSlcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgYmluZFJlbGF0aW9uc2hpcCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn55u45YaMJ1xuICB9XG4gIGRhdGEgPSB7XG4gICAgbXNnOiAnJyxcbiAgICBsaXN0OiBbXSxcbiAgICBtZW1iZXJJbmZvOiBudWxsLFxuICAgIGNsYXNzSW5mbzogbnVsbCxcbiAgICBwczogNixcbiAgICBwbjogMSxcbiAgICBtYXhDb3VudDogNixcbiAgICBpbWdMaXN0OiBbXSxcbiAgICB1cGxvYWRzOiBbXSxcbiAgICBpc0VkaXRNb2RlOiBmYWxzZSxcbiAgICBkZWxldGVJZHM6IFtdLFxuICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgIGxvYWRGaW5pc2hlZDogZmFsc2VcbiAgfVxuICBvblJlYWNoQm90dG9tKCkge1xuICAgIGlmICh0aGlzLmxvYWRpbmcgfHwgdGhpcy5sb2FkRmluaXNoZWQpIHJldHVyblxuICAgIHRoaXMuZ2V0UGhvdG9MaXN0KClcbiAgfVxuICBvbkxvYWQoKSB7XG4gICAgY29uc29sZS5sb2coc3RvcmUuZ2V0U3RhdGUoKSlcbiAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxuICAgIHRoaXMubWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcbiAgICB0aGlzLmdldFBob3RvTGlzdCgpXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIGdldFBob3RvTGlzdCgpIHtcbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlXG4gICAgcGhvdG9JbmRleCh7XG4gICAgICBwczogdGhpcy5wcyxcbiAgICAgIHBuOiB0aGlzLnBuLFxuICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IHJldHVybkxpc3QgPSBbLi4ucmVzLmRhdGEubGlzdF1cbiAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSByZXR1cm5MaXN0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHJldHVybkxpc3RbaV0gPSB7XG4gICAgICAgICAgaW1nX2xpc3Q6IHJldHVybkxpc3RbaV0uaW1nX2xpc3QsXG4gICAgICAgICAgdXBsb2FkX2RhdGU6IHJldHVybkxpc3RbaV0udXBsb2FkX2RhdGUsXG4gICAgICAgICAgdXBsb2FkX21lbWJlcnM6IHJldHVybkxpc3RbaV0udXBsb2FkX21lbWJlcnMsXG4gICAgICAgICAgcHJldmlld19saXN0OiBbXVxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGogPSAwLCBsZW4gPSByZXR1cm5MaXN0W2ldLmltZ19saXN0Lmxlbmd0aDsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgICAgbGV0IG9iaiA9IHJldHVybkxpc3RbaV0uaW1nX2xpc3Rbal1cbiAgICAgICAgICBvYmoudHlwZSA9IHRoaXMuaXNFZGl0TW9kZSA/ICdlZGl0JyA6ICdub25lJ1xuICAgICAgICAgIHJldHVybkxpc3RbaV0ucHJldmlld19saXN0LnB1c2gob2JqLmltZ191cmwpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMubGlzdCA9IFsuLi50aGlzLmxpc3QsIC4uLnJldHVybkxpc3RdXG4gICAgICBpZiAocmVzLmRhdGEubGlzdC5sZW5ndGggPCB0aGlzLnBzKSB7XG4gICAgICAgIHRoaXMubG9hZEZpbmlzaGVkID0gdHJ1ZVxuICAgICAgfVxuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2VcbiAgICAgIHRoaXMucG4rK1xuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0pXG4gIH1cbiAgYWRkUGhvdG9zICgpIHtcbiAgICBhZGRQaG90byh7XG4gICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWQsXG4gICAgICBpbWdfdXJsOiB0aGlzLmltZ0xpc3RcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICBzaG93TXNnKCfmj5DkuqTmiJDlip8nKVxuICAgICAgICB0aGlzLnJlc2V0RGF0YSgpXG4gICAgICAgIHRoaXMuZ2V0UGhvdG9MaXN0KClcbiAgICAgICAgdGhpcy5pbWdMaXN0ID0gW11cbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgbG9vcFBob3RvICh0eXBlKSB7XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMubGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgbGV0IGltZ0xpc3QgPSB0aGlzLmxpc3RbaV0uaW1nX2xpc3RcbiAgICAgIGZvciAobGV0IGogPSAwLCBsZW5ndGggPSBpbWdMaXN0Lmxlbmd0aDsgaiA8IGxlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmICh0eXBlID09PSAnZWRpdCcgJiYgKGltZ0xpc3Rbal0ubWVtYmVyX2lkICE9PSB0aGlzLm1lbWJlckluZm8ubWVtYmVyX2lkICYmICF0aGlzLmlzUHJlc2lkZW50KSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKDEpXG4gICAgICAgICAgLy8g57yW6L6R5qih5byP5LiL77yM5aaC5p6c5LiN5piv5pys5Lq65Lmf5LiN5piv5Lya6ZW/77yM5YiZ5LiN5bGV56S657yW6L6R5qGGXG4gICAgICAgICAgaW1nTGlzdFtqXS50eXBlID0gJ25vbmUnXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaW1nTGlzdFtqXS50eXBlID0gdHlwZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJlc2V0UGhvdG8oKSB7XG4gICAgdGhpcy5pc0VkaXRNb2RlID0gZmFsc2VcbiAgICB0aGlzLmxvb3BQaG90bygnbm9uZScpXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIHJlc2V0RGF0YSgpIHtcbiAgICB0aGlzLnBzID0gNlxuICAgIHRoaXMucG4gPSAxXG4gICAgdGhpcy5sb2FkaW5nID0gZmFsc2VcbiAgICB0aGlzLmxvYWRGaW5pc2hlZCA9IGZhbHNlXG4gICAgdGhpcy5saXN0ID0gW11cbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBlZGl0UGhvdG8obGlzdElkeCwgaW1nTGlzdElkeCwgdHlwZSwgbWVtYmVySWQpIHtcbiAgICAgIGlmICh0aGlzLm1lbWJlckluZm8ubWVtYmVyX2lkICE9PSBtZW1iZXJJZCAmJiAhdGhpcy5pc1ByZXNpZGVudCkge1xuICAgICAgICBzaG93TXNnKCfmgqjmsqHmnInmnYPpmZDliKDpmaTor6XnhafniYcnKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGNvbnN0IHZhbCA9IHR5cGUgPT09ICdlZGl0JyA/ICdkZWxldGUnIDogJ2VkaXQnXG4gICAgICB0aGlzLmxpc3RbbGlzdElkeF0uaW1nX2xpc3RbaW1nTGlzdElkeF0udHlwZSA9IHZhbFxuICAgICAgdGhpcy5kZWxldGVJZHMucHVzaCh0aGlzLmxpc3RbbGlzdElkeF0uaW1nX2xpc3RbaW1nTGlzdElkeF0ucGhvdG9faW1nX2lkKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgY2hvb3NlQWxsKCkge1xuICAgICAgdGhpcy5sb29wUGhvdG8oJ2RlbGV0ZScpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICByZXNldCgpIHtcbiAgICAgIHRoaXMucmVzZXRQaG90bygpXG4gICAgfSxcbiAgICBkZWxldGVQaG90bygpIHtcbiAgICAgIGRlbFBob3RvKHtwaG90b19pbWdfaWRzOiB0aGlzLmRlbGV0ZUlkcywgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgIHNob3dNc2coJ+WIoOmZpOaIkOWKnycpXG4gICAgICAgICAgdGhpcy5yZXNldFBob3RvKClcbiAgICAgICAgICB0aGlzLnJlc2V0RGF0YSgpXG4gICAgICAgICAgdGhpcy5nZXRQaG90b0xpc3QoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgc2V0UGhvdG9FZGl0KCkge1xuICAgICAgdGhpcy5pc0VkaXRNb2RlID0gdHJ1ZVxuICAgICAgdGhpcy5sb29wUGhvdG8oJ2VkaXQnKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgcHJldmlldyh1cmwsIHVybHMpIHtcbiAgICAgIHByZXZpZXdJbWFnZSh1cmwsIHVybHMpXG4gICAgfSxcbiAgICB1cGxvYWQoKSB7XG4gICAgICBsZXQgX3RoaXMgPSB0aGlzXG4gICAgICB3eC5jaG9vc2VJbWFnZSh7XG4gICAgICAgIGNvdW50OiA5LFxuICAgICAgICBzaXplVHlwZTogWydvcmlnaW5hbCcsICdjb21wcmVzc2VkJ10sXG4gICAgICAgIHNvdXJjZVR5cGU6IFsnYWxidW0nLCAnY2FtZXJhJ10sXG4gICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgY29uc3QgbGVuZ3RoID0gcmVzLnRlbXBGaWxlUGF0aHMubGVuZ3RoXG4gICAgICAgICAgaWYgKGxlbmd0aCA+IHRoaXMubWF4UGhvdG9Db3VudCkge1xuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfmnIDlpJrlj6rog73pgInmi6knICsgdGhpcy5tYXhQaG90b0NvdW50ICsgJ+W8oOWbvueJhycsXG4gICAgICAgICAgICAgIGljb246ICdub25lJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgICAgd3guc2hvd0xvYWRpbmcoe3RpdGxlOiAn5Zu+54mH5LiK5Lyg5LitJ30pXG4gICAgICAgICAgcmVzLnRlbXBGaWxlUGF0aHMuZm9yRWFjaChwYXRoID0+IHtcbiAgICAgICAgICAgIGxldCB1cGxvYWQgPSB7fVxuICAgICAgICAgICAgdXBsb2FkLnBhdGggPSBwYXRoXG4gICAgICAgICAgICB1cGxvYWQuZXJyb3IgPSBmYWxzZVxuICAgICAgICAgICAgdXBsb2FkLnVwbG9hZFByb2dyZXNzID0gd3gudXBsb2FkRmlsZSh7XG4gICAgICAgICAgICAgIHVybDogYCR7d2VweS4kYXBwQ29uZmlnLmJhc2VVcmx9L2ZpbGUvdXBsb2FkUGljYCxcbiAgICAgICAgICAgICAgZmlsZVBhdGg6IHBhdGgsXG4gICAgICAgICAgICAgIGZvcm1EYXRhOiB7XG4gICAgICAgICAgICAgICAgJ21lbWJlcl9pZCc6IHRoaXMubWVtYmVySW5mby5tZW1iZXJfaWQsXG4gICAgICAgICAgICAgICAgJ21lbWJlcl90b2tlbic6IHRoaXMubWVtYmVySW5mby5tZW1iZXJfdG9rZW4sXG4gICAgICAgICAgICAgICAgJ2ZvbGRlcic6ICdjb21taXR0ZWUnXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSlcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5kYXRhICYmIGRhdGEuZGF0YS5maWxlX3VybCkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgdXJsID0gZGF0YS5kYXRhLmZpbGVfdXJsXG4gICAgICAgICAgICAgICAgICBfdGhpcy5pbWdMaXN0LnB1c2godXJsKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuaW1nTGlzdC5sZW5ndGggPT09IGxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICAgICAgICAgIH0sIDIwMDApXG4gICAgICAgICAgICAgICAgICBfdGhpcy5hZGRQaG90b3MoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdXBsb2FkLnVwbG9hZFByb2dyZXNzLm9uUHJvZ3Jlc3NVcGRhdGUoZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgIHVwbG9hZC5wcm9ncmVzcyA9IHJlcy5wcm9ncmVzc1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF90aGlzLnVwbG9hZHMucHVzaCh1cGxvYWQpXG4gICAgICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG4iXX0=