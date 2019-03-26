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
                url: _this3.globalData.url + '/file/uploadPic',
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBob3Rvcy5qcyJdLCJuYW1lcyI6WyJiaW5kUmVsYXRpb25zaGlwIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJtc2ciLCJsaXN0IiwibWVtYmVySW5mbyIsImNsYXNzSW5mbyIsInBzIiwicG4iLCJtYXhDb3VudCIsImltZ0xpc3QiLCJ1cGxvYWRzIiwibWV0aG9kcyIsInByZXZpZXciLCJ1cmwiLCJ1cmxzIiwidXBsb2FkIiwiX3RoaXMiLCJ3eCIsImNob29zZUltYWdlIiwiY291bnQiLCJzaXplVHlwZSIsInNvdXJjZVR5cGUiLCJzdWNjZXNzIiwibGVuZ3RoIiwicmVzIiwidGVtcEZpbGVQYXRocyIsIm1heFBob3RvQ291bnQiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJzaG93TG9hZGluZyIsImZvckVhY2giLCJwYXRoIiwiZXJyb3IiLCJ1cGxvYWRQcm9ncmVzcyIsInVwbG9hZEZpbGUiLCJnbG9iYWxEYXRhIiwiZmlsZVBhdGgiLCJmb3JtRGF0YSIsIm1lbWJlcl9pZCIsIm1lbWJlcl90b2tlbiIsIm5hbWUiLCJKU09OIiwicGFyc2UiLCJmaWxlX3VybCIsInB1c2giLCJzZXRUaW1lb3V0IiwiaGlkZUxvYWRpbmciLCJhZGRQaG90b3MiLCIkYXBwbHkiLCJvblByb2dyZXNzVXBkYXRlIiwicHJvZ3Jlc3MiLCJnZXRTdG9yYWdlU3luYyIsImdldFBob3RvTGlzdCIsImNsYXNzX2lkIiwiaWQiLCJ0aGVuIiwicmV0dXJuTGlzdCIsImkiLCJsZW4iLCJpbWdfbGlzdCIsInVwbG9hZF9kYXRlIiwidXBsb2FkX21lbWJlcnMiLCJqIiwib2JqIiwiaW1nX3VybCIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBQ3FCQSxnQjs7Ozs7Ozs7Ozs7Ozs7Nk1BQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVEMsSSxHQUFPO0FBQ0xDLFdBQUssRUFEQTtBQUVMQyxZQUFNLEVBRkQ7QUFHTEMsa0JBQVksSUFIUDtBQUlMQyxpQkFBVyxJQUpOO0FBS0xDLFVBQUksRUFMQztBQU1MQyxVQUFJLENBTkM7QUFPTEMsZ0JBQVUsQ0FQTDtBQVFMQyxlQUFTLEVBUko7QUFTTEMsZUFBUztBQVRKLEssU0FxRFBDLE8sR0FBVTtBQUNSQyxhQURRLG1CQUNBQyxHQURBLEVBQ0tDLElBREwsRUFDVztBQUNqQixrQ0FBYUQsR0FBYixFQUFrQkMsSUFBbEI7QUFDRCxPQUhPO0FBSVJDLFlBSlEsb0JBSUM7QUFBQTs7QUFDUCxZQUFJQyxRQUFRLElBQVo7QUFDQUMsV0FBR0MsV0FBSCxDQUFlO0FBQ2JDLGlCQUFPLENBRE07QUFFYkMsb0JBQVUsQ0FBQyxVQUFELEVBQWEsWUFBYixDQUZHO0FBR2JDLHNCQUFZLENBQUMsT0FBRCxFQUFVLFFBQVYsQ0FIQztBQUliQyxtQkFBUyxzQkFBTztBQUNkLGdCQUFNQyxTQUFTQyxJQUFJQyxhQUFKLENBQWtCRixNQUFqQztBQUNBLGdCQUFJQSxTQUFTLE9BQUtHLGFBQWxCLEVBQWlDO0FBQy9CVCxpQkFBR1UsU0FBSCxDQUFhO0FBQ1hDLHVCQUFPLFdBQVcsT0FBS0YsYUFBaEIsR0FBZ0MsS0FENUI7QUFFWEcsc0JBQU07QUFGSyxlQUFiO0FBSUQ7QUFDRFosZUFBR2EsV0FBSCxDQUFlLEVBQUNGLE9BQU8sT0FBUixFQUFmO0FBQ0FKLGdCQUFJQyxhQUFKLENBQWtCTSxPQUFsQixDQUEwQixnQkFBUTtBQUNoQyxrQkFBSWhCLFNBQVMsRUFBYjtBQUNBQSxxQkFBT2lCLElBQVAsR0FBY0EsSUFBZDtBQUNBakIscUJBQU9rQixLQUFQLEdBQWUsS0FBZjtBQUNBbEIscUJBQU9tQixjQUFQLEdBQXdCakIsR0FBR2tCLFVBQUgsQ0FBYztBQUNwQ3RCLHFCQUFRLE9BQUt1QixVQUFMLENBQWdCdkIsR0FBeEIsb0JBRG9DO0FBRXBDd0IsMEJBQVVMLElBRjBCO0FBR3BDTSwwQkFBVTtBQUNSLCtCQUFhLE9BQUtsQyxVQUFMLENBQWdCbUMsU0FEckI7QUFFUixrQ0FBZ0IsT0FBS25DLFVBQUwsQ0FBZ0JvQyxZQUZ4QjtBQUdSLDRCQUFVO0FBSEYsaUJBSDBCO0FBUXBDQyxzQkFBTSxNQVI4QjtBQVNwQ25CLHlCQUFTLHNCQUFPO0FBQ2Qsc0JBQU1yQixPQUFPeUMsS0FBS0MsS0FBTCxDQUFXbkIsSUFBSXZCLElBQWYsQ0FBYjtBQUNBLHNCQUFJQSxLQUFLQSxJQUFMLElBQWFBLEtBQUtBLElBQUwsQ0FBVTJDLFFBQTNCLEVBQXFDO0FBQ25DLHdCQUFNL0IsTUFBTVosS0FBS0EsSUFBTCxDQUFVMkMsUUFBdEI7QUFDQTVCLDBCQUFNUCxPQUFOLENBQWNvQyxJQUFkLENBQW1CaEMsR0FBbkI7QUFDRDtBQUNELHNCQUFJRyxNQUFNUCxPQUFOLENBQWNjLE1BQWQsS0FBeUJBLE1BQTdCLEVBQXFDO0FBQ25DdUIsK0JBQVcsWUFBTTtBQUNmN0IseUJBQUc4QixXQUFIO0FBQ0QscUJBRkQsRUFFRyxJQUZIO0FBR0EvQiwwQkFBTWdDLFNBQU47QUFDRDtBQUNEaEMsd0JBQU1pQyxNQUFOO0FBQ0Q7QUF0Qm1DLGVBQWQsQ0FBeEI7QUF3QkFsQyxxQkFBT21CLGNBQVAsQ0FBc0JnQixnQkFBdEIsQ0FBdUMsVUFBUzFCLEdBQVQsRUFBYztBQUNuRFQsdUJBQU9vQyxRQUFQLEdBQWtCM0IsSUFBSTJCLFFBQXRCO0FBQ0QsZUFGRDtBQUdBbkMsb0JBQU1OLE9BQU4sQ0FBY21DLElBQWQsQ0FBbUI5QixNQUFuQjtBQUNBQyxvQkFBTWlDLE1BQU47QUFDRCxhQWpDRDtBQWtDRDtBQS9DWSxTQUFmO0FBaUREO0FBdkRPLEs7Ozs7OzZCQTFDRDtBQUNQLFdBQUs1QyxTQUFMLEdBQWlCWSxHQUFHbUMsY0FBSCxDQUFrQixXQUFsQixDQUFqQjtBQUNBLFdBQUtoRCxVQUFMLEdBQWtCYSxHQUFHbUMsY0FBSCxDQUFrQixZQUFsQixDQUFsQjtBQUNBLFdBQUtDLFlBQUw7QUFDQSxXQUFLSixNQUFMO0FBQ0Q7OzttQ0FDYztBQUFBOztBQUNiLDRCQUFXO0FBQ1QzQyxZQUFJLEtBQUtBLEVBREE7QUFFVEMsWUFBSSxLQUFLQSxFQUZBO0FBR1QrQyxrQkFBVSxLQUFLakQsU0FBTCxDQUFla0Q7QUFIaEIsT0FBWCxFQUlHQyxJQUpILENBSVEsZUFBTztBQUNiLFlBQUlyRCxPQUFPLEVBQVg7QUFDQSxZQUFJc0QsYUFBYWpDLElBQUl2QixJQUFKLENBQVNFLElBQTFCO0FBQ0EsYUFBSyxJQUFJdUQsSUFBSSxDQUFSLEVBQVdDLE1BQU1GLFdBQVdsQyxNQUFqQyxFQUF5Q21DLElBQUlDLEdBQTdDLEVBQWtERCxHQUFsRCxFQUF1RDtBQUNyRHZELGVBQUt1RCxDQUFMLElBQVU7QUFDUkUsc0JBQVUsRUFERjtBQUVSQyx5QkFBYUosV0FBV0MsQ0FBWCxFQUFjRyxXQUZuQjtBQUdSQyw0QkFBZ0JMLFdBQVdDLENBQVgsRUFBY0k7QUFIdEIsV0FBVjtBQUtBLGVBQUssSUFBSUMsSUFBSSxDQUFSLEVBQVdKLFFBQU1GLFdBQVdDLENBQVgsRUFBY0UsUUFBZCxDQUF1QnJDLE1BQTdDLEVBQXFEd0MsSUFBSUosS0FBekQsRUFBOERJLEdBQTlELEVBQW1FO0FBQ2pFLGdCQUFJQyxNQUFNUCxXQUFXQyxDQUFYLEVBQWNFLFFBQWQsQ0FBdUJHLENBQXZCLENBQVY7QUFDQTVELGlCQUFLdUQsQ0FBTCxFQUFRRSxRQUFSLENBQWlCZixJQUFqQixDQUFzQm1CLElBQUlDLE9BQTFCO0FBQ0Q7QUFDRjtBQUNELGVBQUs5RCxJQUFMLEdBQVlBLElBQVo7QUFDQSxlQUFLOEMsTUFBTDtBQUNELE9BcEJEO0FBcUJEOzs7Z0NBQ1k7QUFBQTs7QUFDWCwwQkFBUztBQUNQSyxrQkFBVSxLQUFLakQsU0FBTCxDQUFla0QsRUFEbEI7QUFFUFUsaUJBQVMsS0FBS3hEO0FBRlAsT0FBVCxFQUdHK0MsSUFISCxDQUdRLGVBQU87QUFDYixZQUFJaEMsSUFBSXZCLElBQUosQ0FBU3FCLE9BQWIsRUFBc0I7QUFDcEIsK0JBQVEsTUFBUjtBQUNBLGlCQUFLK0IsWUFBTDtBQUNBLGlCQUFLNUMsT0FBTCxHQUFlLEVBQWY7QUFDQSxpQkFBS3dDLE1BQUw7QUFDRDtBQUNGLE9BVkQ7QUFXRDs7OztFQXhEMkNpQixlQUFLQyxJOztrQkFBOUJyRSxnQiIsImZpbGUiOiJwaG90b3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgeyB1cGxvYWRJbWFnZSwgc2hvd01zZywgcHJldmlld0ltYWdlIH0gZnJvbSAnLi4vdXRpbHMvY29tbW9uJ1xuaW1wb3J0IHsgcGhvdG9JbmRleCwgYWRkUGhvdG8gfSBmcm9tICcuLi9hcGkvem9uZSdcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGJpbmRSZWxhdGlvbnNoaXAgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ebuOWGjCdcbiAgfVxuICBkYXRhID0ge1xuICAgIG1zZzogJycsXG4gICAgbGlzdDogW10sXG4gICAgbWVtYmVySW5mbzogbnVsbCxcbiAgICBjbGFzc0luZm86IG51bGwsXG4gICAgcHM6IDEwLFxuICAgIHBuOiAxLFxuICAgIG1heENvdW50OiA2LFxuICAgIGltZ0xpc3Q6IFtdLFxuICAgIHVwbG9hZHM6IFtdXG4gIH1cbiAgb25Mb2FkKCkge1xuICAgIHRoaXMuY2xhc3NJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2NsYXNzSW5mbycpXG4gICAgdGhpcy5tZW1iZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbWJlckluZm8nKVxuICAgIHRoaXMuZ2V0UGhvdG9MaXN0KClcbiAgICB0aGlzLiRhcHBseSgpXG4gIH1cbiAgZ2V0UGhvdG9MaXN0KCkge1xuICAgIHBob3RvSW5kZXgoe1xuICAgICAgcHM6IHRoaXMucHMsXG4gICAgICBwbjogdGhpcy5wbixcbiAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZFxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIGxldCBsaXN0ID0gW11cbiAgICAgIGxldCByZXR1cm5MaXN0ID0gcmVzLmRhdGEubGlzdFxuICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHJldHVybkxpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgbGlzdFtpXSA9IHtcbiAgICAgICAgICBpbWdfbGlzdDogW10sXG4gICAgICAgICAgdXBsb2FkX2RhdGU6IHJldHVybkxpc3RbaV0udXBsb2FkX2RhdGUsXG4gICAgICAgICAgdXBsb2FkX21lbWJlcnM6IHJldHVybkxpc3RbaV0udXBsb2FkX21lbWJlcnNcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBqID0gMCwgbGVuID0gcmV0dXJuTGlzdFtpXS5pbWdfbGlzdC5sZW5ndGg7IGogPCBsZW47IGorKykge1xuICAgICAgICAgIGxldCBvYmogPSByZXR1cm5MaXN0W2ldLmltZ19saXN0W2pdXG4gICAgICAgICAgbGlzdFtpXS5pbWdfbGlzdC5wdXNoKG9iai5pbWdfdXJsKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmxpc3QgPSBsaXN0XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSlcbiAgfVxuICBhZGRQaG90b3MgKCkge1xuICAgIGFkZFBob3RvKHtcbiAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgIGltZ191cmw6IHRoaXMuaW1nTGlzdFxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgIHNob3dNc2coJ+aPkOS6pOaIkOWKnycpXG4gICAgICAgIHRoaXMuZ2V0UGhvdG9MaXN0KClcbiAgICAgICAgdGhpcy5pbWdMaXN0ID0gW11cbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgbWV0aG9kcyA9IHtcbiAgICBwcmV2aWV3KHVybCwgdXJscykge1xuICAgICAgcHJldmlld0ltYWdlKHVybCwgdXJscylcbiAgICB9LFxuICAgIHVwbG9hZCgpIHtcbiAgICAgIGxldCBfdGhpcyA9IHRoaXNcbiAgICAgIHd4LmNob29zZUltYWdlKHtcbiAgICAgICAgY291bnQ6IDksXG4gICAgICAgIHNpemVUeXBlOiBbJ29yaWdpbmFsJywgJ2NvbXByZXNzZWQnXSxcbiAgICAgICAgc291cmNlVHlwZTogWydhbGJ1bScsICdjYW1lcmEnXSxcbiAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICBjb25zdCBsZW5ndGggPSByZXMudGVtcEZpbGVQYXRocy5sZW5ndGhcbiAgICAgICAgICBpZiAobGVuZ3RoID4gdGhpcy5tYXhQaG90b0NvdW50KSB7XG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+acgOWkmuWPquiDvemAieaLqScgKyB0aGlzLm1heFBob3RvQ291bnQgKyAn5byg5Zu+54mHJyxcbiAgICAgICAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgICB3eC5zaG93TG9hZGluZyh7dGl0bGU6ICflm77niYfkuIrkvKDkuK0nfSlcbiAgICAgICAgICByZXMudGVtcEZpbGVQYXRocy5mb3JFYWNoKHBhdGggPT4ge1xuICAgICAgICAgICAgbGV0IHVwbG9hZCA9IHt9XG4gICAgICAgICAgICB1cGxvYWQucGF0aCA9IHBhdGhcbiAgICAgICAgICAgIHVwbG9hZC5lcnJvciA9IGZhbHNlXG4gICAgICAgICAgICB1cGxvYWQudXBsb2FkUHJvZ3Jlc3MgPSB3eC51cGxvYWRGaWxlKHtcbiAgICAgICAgICAgICAgdXJsOiBgJHt0aGlzLmdsb2JhbERhdGEudXJsfS9maWxlL3VwbG9hZFBpY2AsXG4gICAgICAgICAgICAgIGZpbGVQYXRoOiBwYXRoLFxuICAgICAgICAgICAgICBmb3JtRGF0YToge1xuICAgICAgICAgICAgICAgICdtZW1iZXJfaWQnOiB0aGlzLm1lbWJlckluZm8ubWVtYmVyX2lkLFxuICAgICAgICAgICAgICAgICdtZW1iZXJfdG9rZW4nOiB0aGlzLm1lbWJlckluZm8ubWVtYmVyX3Rva2VuLFxuICAgICAgICAgICAgICAgICdmb2xkZXInOiAnY29tbWl0dGVlJ1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBuYW1lOiAnZmlsZScsXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuZGF0YSAmJiBkYXRhLmRhdGEuZmlsZV91cmwpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IGRhdGEuZGF0YS5maWxlX3VybFxuICAgICAgICAgICAgICAgICAgX3RoaXMuaW1nTGlzdC5wdXNoKHVybClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmltZ0xpc3QubGVuZ3RoID09PSBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICAgICAgICAgICAgICB9LCAyMDAwKVxuICAgICAgICAgICAgICAgICAgX3RoaXMuYWRkUGhvdG9zKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHVwbG9hZC51cGxvYWRQcm9ncmVzcy5vblByb2dyZXNzVXBkYXRlKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICB1cGxvYWQucHJvZ3Jlc3MgPSByZXMucHJvZ3Jlc3NcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBfdGhpcy51cGxvYWRzLnB1c2godXBsb2FkKVxuICAgICAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxufVxuIl19