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
        wx.previewImage({
          current: url.img_url,
          urls: urls
        });
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBob3Rvcy5qcyJdLCJuYW1lcyI6WyJzdG9yZSIsImJpbmRSZWxhdGlvbnNoaXAiLCJpc1ByZXNpZGVudCIsInN0YXRlIiwiem9uZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwibXNnIiwibGlzdCIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJwcyIsInBuIiwibWF4Q291bnQiLCJpbWdMaXN0IiwidXBsb2FkcyIsImlzRWRpdE1vZGUiLCJkZWxldGVJZHMiLCJsb2FkaW5nIiwibG9hZEZpbmlzaGVkIiwibWV0aG9kcyIsImVkaXRQaG90byIsImxpc3RJZHgiLCJpbWdMaXN0SWR4IiwidHlwZSIsIm1lbWJlcklkIiwibWVtYmVyX2lkIiwidmFsIiwiaWQiLCJpbWdfbGlzdCIsInBob3RvX2ltZ19pZCIsInB1c2giLCJpZHgiLCJpbmRleE9mIiwic3BsaWNlIiwiJGFwcGx5IiwiY2hvb3NlQWxsIiwibG9vcFBob3RvIiwicmVzZXQiLCJyZXNldFBob3RvIiwiZGVsZXRlUGhvdG8iLCJsZW5ndGgiLCJwaG90b19pbWdfaWRzIiwiY2xhc3NfaWQiLCJ0aGVuIiwicmVzIiwic3VjY2VzcyIsInJlc2V0RGF0YSIsImdldFBob3RvTGlzdCIsInNldFBob3RvRWRpdCIsInByZXZpZXciLCJ1cmwiLCJ1cmxzIiwid3giLCJwcmV2aWV3SW1hZ2UiLCJjdXJyZW50IiwiaW1nX3VybCIsInVwbG9hZCIsIl90aGlzIiwiY2hvb3NlSW1hZ2UiLCJjb3VudCIsInNpemVUeXBlIiwic291cmNlVHlwZSIsInRlbXBGaWxlUGF0aHMiLCJtYXhQaG90b0NvdW50Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwic2hvd0xvYWRpbmciLCJmb3JFYWNoIiwicGF0aCIsImVycm9yIiwidXBsb2FkUHJvZ3Jlc3MiLCJ1cGxvYWRGaWxlIiwid2VweSIsIiRhcHBDb25maWciLCJiYXNlVXJsIiwiZmlsZVBhdGgiLCJmb3JtRGF0YSIsIm1lbWJlcl90b2tlbiIsIm5hbWUiLCJKU09OIiwicGFyc2UiLCJmaWxlX3VybCIsInNldFRpbWVvdXQiLCJoaWRlTG9hZGluZyIsImFkZFBob3RvcyIsIm9uUHJvZ3Jlc3NVcGRhdGUiLCJwcm9ncmVzcyIsImNvbnNvbGUiLCJsb2ciLCJnZXRTdGF0ZSIsImdldFN0b3JhZ2VTeW5jIiwicmV0dXJuTGlzdCIsImkiLCJsZW4iLCJ1cGxvYWRfZGF0ZSIsInVwbG9hZF9tZW1iZXJzIiwicHJldmlld19saXN0IiwiaiIsIm9iaiIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSUEsUUFBUSwwQkFBWjs7SUFRcUJDLGdCLFdBTnBCLHdCQUFRO0FBQ1BDLGFBRE8sdUJBQ0tDLEtBREwsRUFDWTtBQUNqQixXQUFPQSxNQUFNQyxJQUFOLENBQVdGLFdBQWxCO0FBQ0Q7QUFITSxDQUFSLEM7Ozs7Ozs7Ozs7Ozs7OzZNQU9DRyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVEMsSSxHQUFPO0FBQ0xDLFdBQUssRUFEQTtBQUVMQyxZQUFNLEVBRkQ7QUFHTEMsa0JBQVksSUFIUDtBQUlMQyxpQkFBVyxJQUpOO0FBS0xDLFVBQUksQ0FMQztBQU1MQyxVQUFJLENBTkM7QUFPTEMsZ0JBQVUsQ0FQTDtBQVFMQyxlQUFTLEVBUko7QUFTTEMsZUFBUyxFQVRKO0FBVUxDLGtCQUFZLEtBVlA7QUFXTEMsaUJBQVcsRUFYTjtBQVlMQyxlQUFTLEtBWko7QUFhTEMsb0JBQWM7QUFiVCxLLFNBbUdQQyxPLEdBQVU7QUFDUkMsZUFEUSxxQkFDRUMsT0FERixFQUNXQyxVQURYLEVBQ3VCQyxJQUR2QixFQUM2QkMsUUFEN0IsRUFDdUM7QUFDN0MsWUFBSSxLQUFLaEIsVUFBTCxDQUFnQmlCLFNBQWhCLEtBQThCRCxRQUE5QixJQUEwQyxDQUFDLEtBQUt4QixXQUFwRCxFQUFpRTtBQUMvRCwrQkFBUSxZQUFSO0FBQ0E7QUFDRDtBQUNELFlBQU0wQixN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TUFBbEI7QUFDRCxXQUpELE1BS0s7QUFDSFYsb0JBQVFxRixDQUFSLEVBQVczRSxJQUFYLEdBQWtCQSxJQUFsQjtBQUNEO0FBQ0Y7QUFDRjtBQUNGOzs7aUNBQ1k7QUFDWCxXQUFLUCxTQUFMLEdBQWlCLEVBQWpCO0FBQ0EsV0FBS0QsVUFBTCxHQUFrQixLQUFsQjtBQUNBLFdBQUtxQixTQUFMLENBQWUsTUFBZjtBQUNBLFdBQUtGLE1BQUw7QUFDRDs7O2dDQUNXO0FBQ1YsV0FBS3hCLEVBQUwsR0FBVSxDQUFWO0FBQ0EsV0FBS0MsRUFBTCxHQUFVLENBQVY7QUFDQSxXQUFLTSxPQUFMLEdBQWUsS0FBZjtBQUNBLFdBQUtDLFlBQUwsR0FBb0IsS0FBcEI7QUFDQSxXQUFLWCxJQUFMLEdBQVksRUFBWjtBQUNBLFdBQUsyQixNQUFMO0FBQ0Q7Ozs7RUF0RzJDdUMsZUFBSzJCLEk7a0JBQTlCckcsZ0IiLCJmaWxlIjoicGhvdG9zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHsgY29ubmVjdCwgZ2V0U3RvcmUgfSBmcm9tICd3ZXB5LXJlZHV4J1xuaW1wb3J0IHsgc2hvd01zZywgcHJldmlld0ltYWdlIH0gZnJvbSAndXRpbHMvY29tbW9uJ1xuaW1wb3J0IHsgcGhvdG9JbmRleCwgYWRkUGhvdG8sIGRlbFBob3RvIH0gZnJvbSAnYXBpL3pvbmUnXG5cbmxldCBzdG9yZSA9IGdldFN0b3JlKClcblxuQGNvbm5lY3Qoe1xuICBpc1ByZXNpZGVudChzdGF0ZSkge1xuICAgIHJldHVybiBzdGF0ZS56b25lLmlzUHJlc2lkZW50XG4gIH1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGJpbmRSZWxhdGlvbnNoaXAgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ebuOWGjCdcbiAgfVxuICBkYXRhID0ge1xuICAgIG1zZzogJycsXG4gICAgbGlzdDogW10sXG4gICAgbWVtYmVySW5mbzogbnVsbCxcbiAgICBjbGFzc0luZm86IG51bGwsXG4gICAgcHM6IDYsXG4gICAgcG46IDEsXG4gICAgbWF4Q291bnQ6IDYsXG4gICAgaW1nTGlzdDogW10sXG4gICAgdXBsb2FkczogW10sXG4gICAgaXNFZGl0TW9kZTogZmFsc2UsXG4gICAgZGVsZXRlSWRzOiBbXSxcbiAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICBsb2FkRmluaXNoZWQ6IGZhbHNlXG4gIH1cbiAgb25SZWFjaEJvdHRvbSgpIHtcbiAgICBpZiAodGhpcy5sb2FkaW5nIHx8IHRoaXMubG9hZEZpbmlzaGVkKSByZXR1cm5cbiAgICB0aGlzLmdldFBob3RvTGlzdCgpXG4gIH1cbiAgb25Mb2FkKCkge1xuICAgIGNvbnNvbGUubG9nKHN0b3JlLmdldFN0YXRlKCkpXG4gICAgdGhpcy5jbGFzc0luZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnY2xhc3NJbmZvJylcbiAgICB0aGlzLm1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXG4gICAgdGhpcy5nZXRQaG90b0xpc3QoKVxuICAgIHRoaXMuJGFwcGx5KClcbiAgfVxuICBnZXRQaG90b0xpc3QoKSB7XG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZVxuICAgIHBob3RvSW5kZXgoe1xuICAgICAgcHM6IHRoaXMucHMsXG4gICAgICBwbjogdGhpcy5wbixcbiAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZFxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIGxldCByZXR1cm5MaXN0ID0gWy4uLnJlcy5kYXRhLmxpc3RdXG4gICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gcmV0dXJuTGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICByZXR1cm5MaXN0W2ldID0ge1xuICAgICAgICAgIGltZ19saXN0OiByZXR1cm5MaXN0W2ldLmltZ19saXN0LFxuICAgICAgICAgIHVwbG9hZF9kYXRlOiByZXR1cm5MaXN0W2ldLnVwbG9hZF9kYXRlLFxuICAgICAgICAgIHVwbG9hZF9tZW1iZXJzOiByZXR1cm5MaXN0W2ldLnVwbG9hZF9tZW1iZXJzLFxuICAgICAgICAgIHByZXZpZXdfbGlzdDogW11cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBqID0gMCwgbGVuID0gcmV0dXJuTGlzdFtpXS5pbWdfbGlzdC5sZW5ndGg7IGogPCBsZW47IGorKykge1xuICAgICAgICAgIGxldCBvYmogPSByZXR1cm5MaXN0W2ldLmltZ19saXN0W2pdXG4gICAgICAgICAgb2JqLnR5cGUgPSB0aGlzLmlzRWRpdE1vZGUgPyAnZWRpdCcgOiAnbm9uZSdcbiAgICAgICAgICByZXR1cm5MaXN0W2ldLnByZXZpZXdfbGlzdC5wdXNoKG9iai5pbWdfdXJsKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmxpc3QgPSBbLi4udGhpcy5saXN0LCAuLi5yZXR1cm5MaXN0XVxuICAgICAgaWYgKHJlcy5kYXRhLmxpc3QubGVuZ3RoIDwgdGhpcy5wcykge1xuICAgICAgICB0aGlzLmxvYWRGaW5pc2hlZCA9IHRydWVcbiAgICAgIH1cbiAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlXG4gICAgICB0aGlzLnBuKytcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9KVxuICB9XG4gIGFkZFBob3RvcyAoKSB7XG4gICAgYWRkUGhvdG8oe1xuICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgaW1nX3VybDogdGhpcy5pbWdMaXN0XG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgc2hvd01zZygn5o+Q5Lqk5oiQ5YqfJylcbiAgICAgICAgdGhpcy5yZXNldERhdGEoKVxuICAgICAgICB0aGlzLmdldFBob3RvTGlzdCgpXG4gICAgICAgIHRoaXMuaW1nTGlzdCA9IFtdXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIGxvb3BQaG90byAodHlwZSkge1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLmxpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGxldCBpbWdMaXN0ID0gdGhpcy5saXN0W2ldLmltZ19saXN0XG4gICAgICBmb3IgKGxldCBqID0gMCwgbGVuZ3RoID0gaW1nTGlzdC5sZW5ndGg7IGogPCBsZW5ndGg7IGorKykge1xuICAgICAgICBpZiAodHlwZSA9PT0gJ2VkaXQnICYmIChpbWdMaXN0W2pdLm1lbWJlcl9pZCAhPT0gdGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCAmJiAhdGhpcy5pc1ByZXNpZGVudCkpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygxKVxuICAgICAgICAgIC8vIOe8lui+keaooeW8j+S4i++8jOWmguaenOS4jeaYr+acrOS6uuS5n+S4jeaYr+S8mumVv++8jOWImeS4jeWxleekuue8lui+keahhlxuICAgICAgICAgIGltZ0xpc3Rbal0udHlwZSA9ICdub25lJ1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGltZ0xpc3Rbal0udHlwZSA9IHR5cGVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXNldFBob3RvKCkge1xuICAgIHRoaXMuZGVsZXRlSWRzID0gW11cbiAgICB0aGlzLmlzRWRpdE1vZGUgPSBmYWxzZVxuICAgIHRoaXMubG9vcFBob3RvKCdub25lJylcbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgcmVzZXREYXRhKCkge1xuICAgIHRoaXMucHMgPSA2XG4gICAgdGhpcy5wbiA9IDFcbiAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZVxuICAgIHRoaXMubG9hZEZpbmlzaGVkID0gZmFsc2VcbiAgICB0aGlzLmxpc3QgPSBbXVxuICAgIHRoaXMuJGFwcGx5KClcbiAgfVxuICBtZXRob2RzID0ge1xuICAgIGVkaXRQaG90byhsaXN0SWR4LCBpbWdMaXN0SWR4LCB0eXBlLCBtZW1iZXJJZCkge1xuICAgICAgaWYgKHRoaXMubWVtYmVySW5mby5tZW1iZXJfaWQgIT09IG1lbWJlcklkICYmICF0aGlzLmlzUHJlc2lkZW50KSB7XG4gICAgICAgIHNob3dNc2coJ+aCqOayoeacieadg+mZkOWIoOmZpOivpeeFp+eJhycpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgY29uc3QgdmFsID0gdHlwZSA9PT0gJ2VkaXQnID8gJ2RlbGV0ZScgOiAnZWRpdCdcbiAgICAgIGNvbnN0IGlkID0gdGhpcy5saXN0W2xpc3RJZHhdLmltZ19saXN0W2ltZ0xpc3RJZHhdLnBob3RvX2ltZ19pZFxuICAgICAgdGhpcy5saXN0W2xpc3RJZHhdLmltZ19saXN0W2ltZ0xpc3RJZHhdLnR5cGUgPSB2YWxcbiAgICAgIGlmICh2YWwgPT09ICdkZWxldGUnKSB7XG4gICAgICAgIHRoaXMuZGVsZXRlSWRzLnB1c2goaWQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBpZHggPSB0aGlzLmRlbGV0ZUlkcy5pbmRleE9mKGlkKVxuICAgICAgICB0aGlzLmRlbGV0ZUlkcy5zcGxpY2UoaWR4LCAxKVxuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgY2hvb3NlQWxsKCkge1xuICAgICAgdGhpcy5sb29wUGhvdG8oJ2RlbGV0ZScpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSxcbiAgICByZXNldCgpIHtcbiAgICAgIHRoaXMucmVzZXRQaG90bygpXG4gICAgfSxcbiAgICBkZWxldGVQaG90bygpIHtcbiAgICAgIGlmICghdGhpcy5kZWxldGVJZHMubGVuZ3RoKSByZXR1cm5cbiAgICAgIGRlbFBob3RvKHtwaG90b19pbWdfaWRzOiB0aGlzLmRlbGV0ZUlkcywgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgIHNob3dNc2coJ+WIoOmZpOaIkOWKnycpXG4gICAgICAgICAgdGhpcy5yZXNldFBob3RvKClcbiAgICAgICAgICB0aGlzLnJlc2V0RGF0YSgpXG4gICAgICAgICAgdGhpcy5nZXRQaG90b0xpc3QoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgc2V0UGhvdG9FZGl0KCkge1xuICAgICAgdGhpcy5pc0VkaXRNb2RlID0gdHJ1ZVxuICAgICAgdGhpcy5sb29wUGhvdG8oJ2VkaXQnKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgcHJldmlldyh1cmwsIHVybHMpIHtcbiAgICAgIHd4LnByZXZpZXdJbWFnZSh7XG4gICAgICAgIGN1cnJlbnQ6IHVybC5pbWdfdXJsLFxuICAgICAgICB1cmxzOiB1cmxzXG4gICAgICB9KVxuICAgIH0sXG4gICAgdXBsb2FkKCkge1xuICAgICAgbGV0IF90aGlzID0gdGhpc1xuICAgICAgd3guY2hvb3NlSW1hZ2Uoe1xuICAgICAgICBjb3VudDogOSxcbiAgICAgICAgc2l6ZVR5cGU6IFsnb3JpZ2luYWwnLCAnY29tcHJlc3NlZCddLFxuICAgICAgICBzb3VyY2VUeXBlOiBbJ2FsYnVtJywgJ2NhbWVyYSddLFxuICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgIGNvbnN0IGxlbmd0aCA9IHJlcy50ZW1wRmlsZVBhdGhzLmxlbmd0aFxuICAgICAgICAgIGlmIChsZW5ndGggPiB0aGlzLm1heFBob3RvQ291bnQpIHtcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn5pyA5aSa5Y+q6IO96YCJ5oupJyArIHRoaXMubWF4UGhvdG9Db3VudCArICflvKDlm77niYcnLFxuICAgICAgICAgICAgICBpY29uOiAnbm9uZSdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHt0aXRsZTogJ+WbvueJh+S4iuS8oOS4rSd9KVxuICAgICAgICAgIHJlcy50ZW1wRmlsZVBhdGhzLmZvckVhY2gocGF0aCA9PiB7XG4gICAgICAgICAgICBsZXQgdXBsb2FkID0ge31cbiAgICAgICAgICAgIHVwbG9hZC5wYXRoID0gcGF0aFxuICAgICAgICAgICAgdXBsb2FkLmVycm9yID0gZmFsc2VcbiAgICAgICAgICAgIHVwbG9hZC51cGxvYWRQcm9ncmVzcyA9IHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICAgICAgICB1cmw6IGAke3dlcHkuJGFwcENvbmZpZy5iYXNlVXJsfS9maWxlL3VwbG9hZFBpY2AsXG4gICAgICAgICAgICAgIGZpbGVQYXRoOiBwYXRoLFxuICAgICAgICAgICAgICBmb3JtRGF0YToge1xuICAgICAgICAgICAgICAgICdtZW1iZXJfaWQnOiB0aGlzLm1lbWJlckluZm8ubWVtYmVyX2lkLFxuICAgICAgICAgICAgICAgICdtZW1iZXJfdG9rZW4nOiB0aGlzLm1lbWJlckluZm8ubWVtYmVyX3Rva2VuLFxuICAgICAgICAgICAgICAgICdmb2xkZXInOiAnY29tbWl0dGVlJ1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBuYW1lOiAnZmlsZScsXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuZGF0YSAmJiBkYXRhLmRhdGEuZmlsZV91cmwpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IGRhdGEuZGF0YS5maWxlX3VybFxuICAgICAgICAgICAgICAgICAgX3RoaXMuaW1nTGlzdC5wdXNoKHVybClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmltZ0xpc3QubGVuZ3RoID09PSBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICAgICAgICAgICAgICB9LCAyMDAwKVxuICAgICAgICAgICAgICAgICAgX3RoaXMuYWRkUGhvdG9zKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHVwbG9hZC51cGxvYWRQcm9ncmVzcy5vblByb2dyZXNzVXBkYXRlKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICB1cGxvYWQucHJvZ3Jlc3MgPSByZXMucHJvZ3Jlc3NcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBfdGhpcy51cGxvYWRzLnB1c2godXBsb2FkKVxuICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxufVxuIl19