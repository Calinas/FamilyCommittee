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

    var _temp, _this, _ret;

    _classCallCheck(this, bindRelationship);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = bindRelationship.__proto__ || Object.getPrototypeOf(bindRelationship)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '相册'
    }, _this.data = {
      msg: '',
      list: [],
      memberInfo: null,
      classInfo: null,
      ps: 10,
      pn: 1,
      maxCount: 6,
      imgList: [],
      uploads: []
    }, _this.methods = {
      preview: function preview(url) {
        wx.previewImage({
          current: url,
          urls: [url]
        });
      },
      upload: function upload() {
        var _this2 = this;

        (0, _common.uploadImage)().then(function (res) {
          _this2.imgList = [];
          _this2.imgList.push(res);
          _this2.addPhotos();
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
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
      var _this3 = this;

      (0, _zone.photoIndex)({
        ps: this.ps,
        pn: this.pn,
        class_id: this.classInfo.id
      }).then(function (res) {
        _this3.list = res.data.list;
        _this3.$apply();
      });
    }
  }, {
    key: 'addPhotos',
    value: function addPhotos() {
      var _this4 = this;

      (0, _zone.addPhoto)({
        class_id: this.classInfo.id,
        img_url: this.imgList
      }).then(function (res) {
        if (res.data.success) {
          (0, _common.showMsg)('提交成功');
          _this4.getPhotoList();
        }
      });
    }
  }]);

  return bindRelationship;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(bindRelationship , 'pages/photos'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBob3Rvcy5qcyJdLCJuYW1lcyI6WyJiaW5kUmVsYXRpb25zaGlwIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJtc2ciLCJsaXN0IiwibWVtYmVySW5mbyIsImNsYXNzSW5mbyIsInBzIiwicG4iLCJtYXhDb3VudCIsImltZ0xpc3QiLCJ1cGxvYWRzIiwibWV0aG9kcyIsInByZXZpZXciLCJ1cmwiLCJ3eCIsInByZXZpZXdJbWFnZSIsImN1cnJlbnQiLCJ1cmxzIiwidXBsb2FkIiwidGhlbiIsInB1c2giLCJyZXMiLCJhZGRQaG90b3MiLCJnZXRTdG9yYWdlU3luYyIsImdldFBob3RvTGlzdCIsIiRhcHBseSIsImNsYXNzX2lkIiwiaWQiLCJpbWdfdXJsIiwic3VjY2VzcyIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBQ3FCQSxnQjs7Ozs7Ozs7Ozs7Ozs7ME1BQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLFdBQUssRUFEQTtBQUVMQyxZQUFNLEVBRkQ7QUFHTEMsa0JBQVksSUFIUDtBQUlMQyxpQkFBVyxJQUpOO0FBS0xDLFVBQUksRUFMQztBQU1MQyxVQUFJLENBTkM7QUFPTEMsZ0JBQVUsQ0FQTDtBQVFMQyxlQUFTLEVBUko7QUFTTEMsZUFBUztBQVRKLEssUUFzQ1BDLE8sR0FBVTtBQUNSQyxhQURRLG1CQUNBQyxHQURBLEVBQ0s7QUFDWEMsV0FBR0MsWUFBSCxDQUFnQjtBQUNkQyxtQkFBU0gsR0FESztBQUVkSSxnQkFBTSxDQUFDSixHQUFEO0FBRlEsU0FBaEI7QUFJRCxPQU5PO0FBT1JLLFlBUFEsb0JBT0M7QUFBQTs7QUFDUCxtQ0FBY0MsSUFBZCxDQUFtQixlQUFPO0FBQ3hCLGlCQUFLVixPQUFMLEdBQWUsRUFBZjtBQUNBLGlCQUFLQSxPQUFMLENBQWFXLElBQWIsQ0FBa0JDLEdBQWxCO0FBQ0EsaUJBQUtDLFNBQUw7QUFDRCxTQUpEO0FBS0Q7QUFiTyxLOzs7Ozs2QkEzQkQ7QUFDUCxXQUFLakIsU0FBTCxHQUFpQlMsR0FBR1MsY0FBSCxDQUFrQixXQUFsQixDQUFqQjtBQUNBLFdBQUtuQixVQUFMLEdBQWtCVSxHQUFHUyxjQUFILENBQWtCLFlBQWxCLENBQWxCO0FBQ0EsV0FBS0MsWUFBTDtBQUNBLFdBQUtDLE1BQUw7QUFDRDs7O21DQUNjO0FBQUE7O0FBQ2IsNEJBQVc7QUFDVG5CLFlBQUksS0FBS0EsRUFEQTtBQUVUQyxZQUFJLEtBQUtBLEVBRkE7QUFHVG1CLGtCQUFVLEtBQUtyQixTQUFMLENBQWVzQjtBQUhoQixPQUFYLEVBSUdSLElBSkgsQ0FJUSxlQUFPO0FBQ2IsZUFBS2hCLElBQUwsR0FBWWtCLElBQUlwQixJQUFKLENBQVNFLElBQXJCO0FBQ0EsZUFBS3NCLE1BQUw7QUFDRCxPQVBEO0FBUUQ7OztnQ0FDWTtBQUFBOztBQUNYLDBCQUFTO0FBQ1BDLGtCQUFVLEtBQUtyQixTQUFMLENBQWVzQixFQURsQjtBQUVQQyxpQkFBUyxLQUFLbkI7QUFGUCxPQUFULEVBR0dVLElBSEgsQ0FHUSxlQUFPO0FBQ2IsWUFBSUUsSUFBSXBCLElBQUosQ0FBUzRCLE9BQWIsRUFBc0I7QUFDcEIsK0JBQVEsTUFBUjtBQUNBLGlCQUFLTCxZQUFMO0FBQ0Q7QUFDRixPQVJEO0FBU0Q7Ozs7RUF6QzJDTSxlQUFLQyxJOztrQkFBOUJqQyxnQiIsImZpbGUiOiJwaG90b3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgeyB1cGxvYWRJbWFnZSwgc2hvd01zZyB9IGZyb20gJy4uL3V0aWxzL2NvbW1vbidcbmltcG9ydCB7IHBob3RvSW5kZXgsIGFkZFBob3RvIH0gZnJvbSAnLi4vYXBpL3pvbmUnXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBiaW5kUmVsYXRpb25zaGlwIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnm7jlhownXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBtc2c6ICcnLFxuICAgIGxpc3Q6IFtdLFxuICAgIG1lbWJlckluZm86IG51bGwsXG4gICAgY2xhc3NJbmZvOiBudWxsLFxuICAgIHBzOiAxMCxcbiAgICBwbjogMSxcbiAgICBtYXhDb3VudDogNixcbiAgICBpbWdMaXN0OiBbXSxcbiAgICB1cGxvYWRzOiBbXVxuICB9XG4gIG9uTG9hZCgpIHtcbiAgICB0aGlzLmNsYXNzSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjbGFzc0luZm8nKVxuICAgIHRoaXMubWVtYmVySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1iZXJJbmZvJylcbiAgICB0aGlzLmdldFBob3RvTGlzdCgpXG4gICAgdGhpcy4kYXBwbHkoKVxuICB9XG4gIGdldFBob3RvTGlzdCgpIHtcbiAgICBwaG90b0luZGV4KHtcbiAgICAgIHBzOiB0aGlzLnBzLFxuICAgICAgcG46IHRoaXMucG4sXG4gICAgICBjbGFzc19pZDogdGhpcy5jbGFzc0luZm8uaWRcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICB0aGlzLmxpc3QgPSByZXMuZGF0YS5saXN0XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfSlcbiAgfVxuICBhZGRQaG90b3MgKCkge1xuICAgIGFkZFBob3RvKHtcbiAgICAgIGNsYXNzX2lkOiB0aGlzLmNsYXNzSW5mby5pZCxcbiAgICAgIGltZ191cmw6IHRoaXMuaW1nTGlzdFxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgIHNob3dNc2coJ+aPkOS6pOaIkOWKnycpXG4gICAgICAgIHRoaXMuZ2V0UGhvdG9MaXN0KClcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgcHJldmlldyh1cmwpIHtcbiAgICAgIHd4LnByZXZpZXdJbWFnZSh7XG4gICAgICAgIGN1cnJlbnQ6IHVybCxcbiAgICAgICAgdXJsczogW3VybF1cbiAgICAgIH0pXG4gICAgfSxcbiAgICB1cGxvYWQoKSB7XG4gICAgICB1cGxvYWRJbWFnZSgpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgdGhpcy5pbWdMaXN0ID0gW11cbiAgICAgICAgdGhpcy5pbWdMaXN0LnB1c2gocmVzKVxuICAgICAgICB0aGlzLmFkZFBob3RvcygpXG4gICAgICB9KVxuICAgIH1cbiAgfVxufVxuIl19