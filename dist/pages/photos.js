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
          imgList[j].type = type;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBob3Rvcy5qcyJdLCJuYW1lcyI6WyJzdG9yZSIsImJpbmRSZWxhdGlvbnNoaXAiLCJpc1ByZXNpZGVudCIsInN0YXRlIiwiem9uZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwibXNnIiwibGlzdCIsIm1lbWJlckluZm8iLCJjbGFzc0luZm8iLCJwcyIsInBuIiwibWF4Q291bnQiLCJpbWdMaXN0IiwidXBsb2FkcyIsImlzRWRpdE1vZGUiLCJkZWxldGVJZHMiLCJsb2FkaW5nIiwibG9hZEZpbmlzaGVkIiwibWV0aG9kcyIsImVkaXRQaG90byIsImxpc3RJZHgiLCJpbWdMaXN0SWR4IiwidHlwZSIsIm1lbWJlcklkIiwibWVtYmVyX2lkIiwidmFsIiwiaW1nX2xpc3QiLCJwdXNoIiwicGhvdG9faW1nX2lkIiwiJGFwcGx5IiwiY2hvb3NlQWxsIiwibG9vcFBob3RvIiwicmVzZXQiLCJyZXNldFBob3RvIiwiZGVsZXRlUGhvdG8iLCJwaG90b19pbWdfaWRzIiwiY2xhc3NfaWQiLCJpZCIsInRoZW4iLCJyZXMiLCJzdWNjZXNzIiwicmVzZXREYXRhIiwiZ2V0UGhvdG9MaXN0Iiwic2V0UGhvdG9FZGl0IiwicHJldmlldyIsInVybCIsInVybHMiLCJ1cGxvYWQiLCJfdGhpcyIsInd4IiwiY2hvb3NlSW1hZ2UiLCJjb3VudCIsInNpemVUeXBlIiwic291cmNlVHlwZSIsImxlbmd0aCIsInRlbXBGaWxlUGF0aHMiLCJtYXhQaG90b0NvdW50Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwic2hvd0xvYWRpbmciLCJmb3JFYWNoIiwicGF0aCIsImVycm9yIiwidXBsb2FkUHJvZ3Jlc3MiLCJ1cGxvYWRGaWxlIiwid2VweSIsIiRhcHBDb25maWciLCJiYXNlVXJsIiwiZmlsZVBhdGgiLCJmb3JtRGF0YSIsIm1lbWJlcl90b2tlbiIsIm5hbWUiLCJKU09OIiwicGFyc2UiLCJmaWxlX3VybCIsInNldFRpbWVvdXQiLCJoaWRlTG9hZGluZyIsImFkZFBob3RvcyIsIm9uUHJvZ3Jlc3NVcGRhdGUiLCJwcm9ncmVzcyIsImNvbnNvbGUiLCJsb2ciLCJnZXRTdGF0ZSIsImdldFN0b3JhZ2VTeW5jIiwicmV0dXJuTGlzdCIsImkiLCJsZW4iLCJ1cGxvYWRfZGF0ZSIsInVwbG9hZF9tZW1iZXJzIiwicHJldmlld19saXN0IiwiaiIsIm9iaiIsImltZ191cmwiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQUlBLFFBQVEsMEJBQVo7O0lBUXFCQyxnQixXQU5wQix3QkFBUTtBQUNQQyxhQURPLHVCQUNLQyxLQURMLEVBQ1k7QUFDakIsV0FBT0EsTUFBTUMsSUFBTixDQUFXRixXQUFsQjtBQUNEO0FBSE0sQ0FBUixDOzs7Ozs7Ozs7Ozs7Ozs2TUFPQ0csTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1RDLEksR0FBTztBQUNMQyxXQUFLLEVBREE7QUFFTEMsWUFBTSxFQUZEO0FBR0xDLGtCQUFZLElBSFA7QUFJTEMsaUJBQVcsSUFKTjtBQUtMQyxVQUFJLENBTEM7QUFNTEMsVUFBSSxDQU5DO0FBT0xDLGdCQUFVLENBUEw7QUFRTEMsZUFBUyxFQVJKO0FBU0xDLGVBQVMsRUFUSjtBQVVMQyxrQkFBWSxLQVZQO0FBV0xDLGlCQUFXLEVBWE47QUFZTEMsZUFBUyxLQVpKO0FBYUxDLG9CQUFjO0FBYlQsSyxTQTBGUEMsTyxHQUFVO0FBQ1JDLGVBRFEscUJBQ0VDLE9BREYsRUFDV0MsVUFEWCxFQUN1QkMsSUFEdkIsRUFDNkJDLFFBRDdCLEVBQ3VDO0FBQzdDLFlBQUksS0FBS2hCLFVBQUwsQ0FBZ0JpQixTQUFoQixLQUE4QkQsUUFBOUIsSUFBMEMsQ0FBQyxLQUFLeEIsV0FBcEQsRUFBaUU7QUFDL0QsK0JBQVEsWUFBUjtBQUNBO0FBQ0Q7QUFDRCxZQUFNMEIsTUFBTUgsU0FBUyxNQUFULEdBQWtCLFFBQWxCLEdBQTZCLE1BQXpDO0FBQ0EsYUFBS2hC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K0JBQVEsTUFBUjtBQUNBLGlCQUFLRSxZQUFMO0FBQ0EsaUJBQUs5QixPQUFMLEdBQWUsRUFBZjtBQUNBLGlCQUFLaUIsTUFBTDtBQUNEO0FBQ0YsT0FWRDtBQVdEOzs7OEJBQ1VQLEksRUFBTTtBQUNmLFdBQUssSUFBSWdFLElBQUksQ0FBUixFQUFXQyxNQUFNLEtBQUtqRixJQUFMLENBQVVnRCxNQUFoQyxFQUF3Q2dDLElBQUlDLEdBQTVDLEVBQWlERCxHQUFqRCxFQUFzRDtBQUNwRCxZQUFJMUUsVUFBVSxLQUFLTixJQUFMLENBQVVnRixDQUFWLEVBQWE1RCxRQUEzQjtBQUNBLGFBQUssSUFBSWlFLElBQUksQ0FBUixFQUFXckMsU0FBUzFDLFFBQVEwQyxNQUFqQyxFQUF5Q3FDLElBQUlyQyxNQUE3QyxFQUFxRHFDLEdBQXJELEVBQTBEO0FBQ3hEL0Usa0JBQVErRSxDQUFSLEVBQVdyRSxJQUFYLEdBQWtCQSxJQUFsQjtBQUNEO0FBQ0Y7QUFDRjs7O2lDQUNZO0FBQ1gsV0FBS1IsVUFBTCxHQUFrQixLQUFsQjtBQUNBLFdBQUtpQixTQUFMLENBQWUsTUFBZjtBQUNBLFdBQUtGLE1BQUw7QUFDRDs7O2dDQUNXO0FBQ1YsV0FBS3BCLEVBQUwsR0FBVSxDQUFWO0FBQ0EsV0FBS0MsRUFBTCxHQUFVLENBQVY7QUFDQSxXQUFLTSxPQUFMLEdBQWUsS0FBZjtBQUNBLFdBQUtDLFlBQUwsR0FBb0IsS0FBcEI7QUFDQSxXQUFLWCxJQUFMLEdBQVksRUFBWjtBQUNBLFdBQUt1QixNQUFMO0FBQ0Q7Ozs7RUE3RjJDcUMsZUFBSzRCLEk7a0JBQTlCaEcsZ0IiLCJmaWxlIjoicGhvdG9zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHsgY29ubmVjdCwgZ2V0U3RvcmUgfSBmcm9tICd3ZXB5LXJlZHV4J1xuaW1wb3J0IHsgc2hvd01zZywgcHJldmlld0ltYWdlIH0gZnJvbSAndXRpbHMvY29tbW9uJ1xuaW1wb3J0IHsgcGhvdG9JbmRleCwgYWRkUGhvdG8sIGRlbFBob3RvIH0gZnJvbSAnYXBpL3pvbmUnXG5cbmxldCBzdG9yZSA9IGdldFN0b3JlKClcblxuQGNvbm5lY3Qoe1xuICBpc1ByZXNpZGVudChzdGF0ZSkge1xuICAgIHJldHVybiBzdGF0ZS56b25lLmlzUHJlc2lkZW50XG4gIH1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGJpbmRSZWxhdGlvbnNoaXAgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ebuOWGjCdcbiAgfVxuICBkYXRhID0ge1xuICAgIG1zZzogJycsXG4gICAgbGlzdDogW10sXG4gICAgbWVtYmVySW5mbzogbnVsbCxcbiAgICBjbGFzc0luZm86IG51bGwsXG4gICAgcHM6IDYsXG4gICAgcG46IDEsXG4gICAgbWF4Q291bnQ6IDYsXG4gICAgaW1nTGlzdDogW10sXG4gICAgdXBsb2FkczogW10sXG4gICAgaXNFZGl0TW9kZTogZmFsc2UsXG4gICAgZGVsZXRlSWRzOiBbXSxcbiAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICBsb2FkRmluaXNoZWQ6IGZhbHNlXG4gIH1cbiAgb25SZWFjaEJvdHRvbSgpIHtcbiAgICBpZiAodGhpcy5sb2FkaW5nIHx8IHRoaXMubG9hZEZpbmlzaGVkKSByZXR1cm5cbiAgICB0aGlzLmdldFBob3RvTGlzdCgpXG4gIH1cbiAgb25Mb2FkKCkge1xuICAgIGNvbnNvbGUubG9nKHN0b3JlLmdldFN0YXRlKCkpXG4gICAgdGhpcy5jbGFzc0luZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnY2xhc3NJbmZvJylcbiAgICB0aGlzLm1lbWJlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtYmVySW5mbycpXG4gICAgdGhpcy5nZXRQaG90b0xpc3QoKVxuICAgIHRoaXMuJGFwcGx5KClcbiAgfVxuICBnZXRQaG90b0xpc3QoKSB7XG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZVxuICAgIHBob3RvSW5kZXgoe1xuICAgICAgcHM6IHRoaXMucHMsXG4gICAgICBwbjogdGhpcy5wbixcbiAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZFxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIGxldCByZXR1cm5MaXN0ID0gWy4uLnJlcy5kYXRhLmxpc3RdXG4gICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gcmV0dXJuTGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICByZXR1cm5MaXN0W2ldID0ge1xuICAgICAgICAgIGltZ19saXN0OiByZXR1cm5MaXN0W2ldLmltZ19saXN0LFxuICAgICAgICAgIHVwbG9hZF9kYXRlOiByZXR1cm5MaXN0W2ldLnVwbG9hZF9kYXRlLFxuICAgICAgICAgIHVwbG9hZF9tZW1iZXJzOiByZXR1cm5MaXN0W2ldLnVwbG9hZF9tZW1iZXJzLFxuICAgICAgICAgIHByZXZpZXdfbGlzdDogW11cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBqID0gMCwgbGVuID0gcmV0dXJuTGlzdFtpXS5pbWdfbGlzdC5sZW5ndGg7IGogPCBsZW47IGorKykge1xuICAgICAgICAgIGxldCBvYmogPSByZXR1cm5MaXN0W2ldLmltZ19saXN0W2pdXG4gICAgICAgICAgb2JqLnR5cGUgPSB0aGlzLmlzRWRpdE1vZGUgPyAnZWRpdCcgOiAnbm9uZSdcbiAgICAgICAgICByZXR1cm5MaXN0W2ldLnByZXZpZXdfbGlzdC5wdXNoKG9iai5pbWdfdXJsKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmxpc3QgPSBbLi4udGhpcy5saXN0LCAuLi5yZXR1cm5MaXN0XVxuICAgICAgaWYgKHJlcy5kYXRhLmxpc3QubGVuZ3RoIDwgdGhpcy5wcykge1xuICAgICAgICB0aGlzLmxvYWRGaW5pc2hlZCA9IHRydWVcbiAgICAgIH1cbiAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlXG4gICAgICB0aGlzLnBuKytcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9KVxuICB9XG4gIGFkZFBob3RvcyAoKSB7XG4gICAgYWRkUGhvdG8oe1xuICAgICAgY2xhc3NfaWQ6IHRoaXMuY2xhc3NJbmZvLmlkLFxuICAgICAgaW1nX3VybDogdGhpcy5pbWdMaXN0XG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgc2hvd01zZygn5o+Q5Lqk5oiQ5YqfJylcbiAgICAgICAgdGhpcy5nZXRQaG90b0xpc3QoKVxuICAgICAgICB0aGlzLmltZ0xpc3QgPSBbXVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBsb29wUGhvdG8gKHR5cGUpIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5saXN0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBsZXQgaW1nTGlzdCA9IHRoaXMubGlzdFtpXS5pbWdfbGlzdFxuICAgICAgZm9yIChsZXQgaiA9IDAsIGxlbmd0aCA9IGltZ0xpc3QubGVuZ3RoOyBqIDwgbGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaW1nTGlzdFtqXS50eXBlID0gdHlwZVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXNldFBob3RvKCkge1xuICAgIHRoaXMuaXNFZGl0TW9kZSA9IGZhbHNlXG4gICAgdGhpcy5sb29wUGhvdG8oJ25vbmUnKVxuICAgIHRoaXMuJGFwcGx5KClcbiAgfVxuICByZXNldERhdGEoKSB7XG4gICAgdGhpcy5wcyA9IDZcbiAgICB0aGlzLnBuID0gMVxuICAgIHRoaXMubG9hZGluZyA9IGZhbHNlXG4gICAgdGhpcy5sb2FkRmluaXNoZWQgPSBmYWxzZVxuICAgIHRoaXMubGlzdCA9IFtdXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgZWRpdFBob3RvKGxpc3RJZHgsIGltZ0xpc3RJZHgsIHR5cGUsIG1lbWJlcklkKSB7XG4gICAgICBpZiAodGhpcy5tZW1iZXJJbmZvLm1lbWJlcl9pZCAhPT0gbWVtYmVySWQgJiYgIXRoaXMuaXNQcmVzaWRlbnQpIHtcbiAgICAgICAgc2hvd01zZygn5oKo5rKh5pyJ5p2D6ZmQ5Yig6Zmk6K+l54Wn54mHJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBjb25zdCB2YWwgPSB0eXBlID09PSAnZWRpdCcgPyAnZGVsZXRlJyA6ICdlZGl0J1xuICAgICAgdGhpcy5saXN0W2xpc3RJZHhdLmltZ19saXN0W2ltZ0xpc3RJZHhdLnR5cGUgPSB2YWxcbiAgICAgIHRoaXMuZGVsZXRlSWRzLnB1c2godGhpcy5saXN0W2xpc3RJZHhdLmltZ19saXN0W2ltZ0xpc3RJZHhdLnBob3RvX2ltZ19pZClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIGNob29zZUFsbCgpIHtcbiAgICAgIHRoaXMubG9vcFBob3RvKCdkZWxldGUnKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0sXG4gICAgcmVzZXQoKSB7XG4gICAgICB0aGlzLnJlc2V0UGhvdG8oKVxuICAgIH0sXG4gICAgZGVsZXRlUGhvdG8oKSB7XG4gICAgICBkZWxQaG90byh7cGhvdG9faW1nX2lkczogdGhpcy5kZWxldGVJZHMsIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICBzaG93TXNnKCfliKDpmaTmiJDlip8nKVxuICAgICAgICAgIHRoaXMucmVzZXRQaG90bygpXG4gICAgICAgICAgdGhpcy5yZXNldERhdGEoKVxuICAgICAgICAgIHRoaXMuZ2V0UGhvdG9MaXN0KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIHNldFBob3RvRWRpdCgpIHtcbiAgICAgIHRoaXMuaXNFZGl0TW9kZSA9IHRydWVcbiAgICAgIHRoaXMubG9vcFBob3RvKCdlZGl0JylcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9LFxuICAgIHByZXZpZXcodXJsLCB1cmxzKSB7XG4gICAgICBwcmV2aWV3SW1hZ2UodXJsLCB1cmxzKVxuICAgIH0sXG4gICAgdXBsb2FkKCkge1xuICAgICAgbGV0IF90aGlzID0gdGhpc1xuICAgICAgd3guY2hvb3NlSW1hZ2Uoe1xuICAgICAgICBjb3VudDogOSxcbiAgICAgICAgc2l6ZVR5cGU6IFsnb3JpZ2luYWwnLCAnY29tcHJlc3NlZCddLFxuICAgICAgICBzb3VyY2VUeXBlOiBbJ2FsYnVtJywgJ2NhbWVyYSddLFxuICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgIGNvbnN0IGxlbmd0aCA9IHJlcy50ZW1wRmlsZVBhdGhzLmxlbmd0aFxuICAgICAgICAgIGlmIChsZW5ndGggPiB0aGlzLm1heFBob3RvQ291bnQpIHtcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn5pyA5aSa5Y+q6IO96YCJ5oupJyArIHRoaXMubWF4UGhvdG9Db3VudCArICflvKDlm77niYcnLFxuICAgICAgICAgICAgICBpY29uOiAnbm9uZSdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHt0aXRsZTogJ+WbvueJh+S4iuS8oOS4rSd9KVxuICAgICAgICAgIHJlcy50ZW1wRmlsZVBhdGhzLmZvckVhY2gocGF0aCA9PiB7XG4gICAgICAgICAgICBsZXQgdXBsb2FkID0ge31cbiAgICAgICAgICAgIHVwbG9hZC5wYXRoID0gcGF0aFxuICAgICAgICAgICAgdXBsb2FkLmVycm9yID0gZmFsc2VcbiAgICAgICAgICAgIHVwbG9hZC51cGxvYWRQcm9ncmVzcyA9IHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICAgICAgICB1cmw6IGAke3dlcHkuJGFwcENvbmZpZy5iYXNlVXJsfS9maWxlL3VwbG9hZFBpY2AsXG4gICAgICAgICAgICAgIGZpbGVQYXRoOiBwYXRoLFxuICAgICAgICAgICAgICBmb3JtRGF0YToge1xuICAgICAgICAgICAgICAgICdtZW1iZXJfaWQnOiB0aGlzLm1lbWJlckluZm8ubWVtYmVyX2lkLFxuICAgICAgICAgICAgICAgICdtZW1iZXJfdG9rZW4nOiB0aGlzLm1lbWJlckluZm8ubWVtYmVyX3Rva2VuLFxuICAgICAgICAgICAgICAgICdmb2xkZXInOiAnY29tbWl0dGVlJ1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBuYW1lOiAnZmlsZScsXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuZGF0YSAmJiBkYXRhLmRhdGEuZmlsZV91cmwpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IGRhdGEuZGF0YS5maWxlX3VybFxuICAgICAgICAgICAgICAgICAgX3RoaXMuaW1nTGlzdC5wdXNoKHVybClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmltZ0xpc3QubGVuZ3RoID09PSBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICAgICAgICAgICAgICB9LCAyMDAwKVxuICAgICAgICAgICAgICAgICAgX3RoaXMuYWRkUGhvdG9zKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHVwbG9hZC51cGxvYWRQcm9ncmVzcy5vblByb2dyZXNzVXBkYXRlKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICB1cGxvYWQucHJvZ3Jlc3MgPSByZXMucHJvZ3Jlc3NcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBfdGhpcy51cGxvYWRzLnB1c2godXBsb2FkKVxuICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxufVxuIl19