'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveIdentityList = exports.saveLocation = exports.setCityName = exports.getCityName = exports.setCityList = exports.setFromPublish = undefined;

var _zone = require('./../types/zone.js');

var types = _interopRequireWildcard(_zone);

var _wepyRedux = require('./../../npm/wepy-redux/lib/index.js');

var _createClass = require('./../../api/createClass.js');

var _user = require('./../../api/user.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var store = (0, _wepyRedux.getStore)();

var setPublish = function setPublish(data) {
  return { type: types.FROM_PUBLISH, data: data };
};

var saveCityList = function saveCityList(data) {
  return { type: types.GET_CITY_LIST, data: data };
};

var saveCityName = function saveCityName(data) {
  return { type: types.SAVE_CITY_NAME, data: data };
};

var setFromPublish = exports.setFromPublish = function setFromPublish(val) {
  store.dispatch(setPublish(val));
};

var setCityList = exports.setCityList = function setCityList() {
  (0, _createClass.getCityList)().then(function (res) {
    var cityList = res.data.list;
    store.dispatch(saveCityList(cityList));
  });
};

var getCityName = exports.getCityName = function getCityName(params) {
  (0, _createClass.getCityInfo)(params).then(function (res) {
    var cityName = res.data.data.regeocode.addressComponent.province;
    store.dispatch(saveCityName(cityName));
  });
};

var setCityName = exports.setCityName = function setCityName(name) {
  store.dispatch({
    type: types.SET_CITY_NAME,
    name: name
  });
};

var saveLocation = exports.saveLocation = function saveLocation(params) {
  store.dispatch({
    type: types.SAVE_LOCATION,
    lng: params.lng,
    lat: params.lat
  });
};

var saveIdentityList = exports.saveIdentityList = function saveIdentityList() {
  (0, _user.getIdentityList)().then(function (res) {
    store.dispatch({
      type: types.SAVE_IDENTITY_LIST,
      list: res.data.list
    });
  });
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInpvbmUuanMiXSwibmFtZXMiOlsidHlwZXMiLCJzdG9yZSIsInNldFB1Ymxpc2giLCJkYXRhIiwidHlwZSIsIkZST01fUFVCTElTSCIsInNhdmVDaXR5TGlzdCIsIkdFVF9DSVRZX0xJU1QiLCJzYXZlQ2l0eU5hbWUiLCJTQVZFX0NJVFlfTkFNRSIsInNldEZyb21QdWJsaXNoIiwidmFsIiwiZGlzcGF0Y2giLCJzZXRDaXR5TGlzdCIsInRoZW4iLCJjaXR5TGlzdCIsInJlcyIsImxpc3QiLCJnZXRDaXR5TmFtZSIsInBhcmFtcyIsImNpdHlOYW1lIiwicmVnZW9jb2RlIiwiYWRkcmVzc0NvbXBvbmVudCIsInByb3ZpbmNlIiwic2V0Q2l0eU5hbWUiLCJuYW1lIiwiU0VUX0NJVFlfTkFNRSIsInNhdmVMb2NhdGlvbiIsIlNBVkVfTE9DQVRJT04iLCJsbmciLCJsYXQiLCJzYXZlSWRlbnRpdHlMaXN0IiwiU0FWRV9JREVOVElUWV9MSVNUIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0lBQVlBLEs7O0FBQ1o7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFJQyxRQUFRLDBCQUFaOztBQUVBLElBQU1DLGFBQWEsU0FBYkEsVUFBYSxDQUFDQyxJQUFEO0FBQUEsU0FBVyxFQUFDQyxNQUFNSixNQUFNSyxZQUFiLEVBQTJCRixVQUEzQixFQUFYO0FBQUEsQ0FBbkI7O0FBRUEsSUFBTUcsZUFBZSxTQUFmQSxZQUFlLENBQUNILElBQUQ7QUFBQSxTQUFXLEVBQUNDLE1BQU1KLE1BQU1PLGFBQWIsRUFBNEJKLFVBQTVCLEVBQVg7QUFBQSxDQUFyQjs7QUFFQSxJQUFNSyxlQUFlLFNBQWZBLFlBQWUsQ0FBQ0wsSUFBRDtBQUFBLFNBQVcsRUFBQ0MsTUFBTUosTUFBTVMsY0FBYixFQUE2Qk4sVUFBN0IsRUFBWDtBQUFBLENBQXJCOztBQUVPLElBQU1PLDBDQUFpQixTQUFqQkEsY0FBaUIsQ0FBQ0MsR0FBRCxFQUFTO0FBQ3JDVixRQUFNVyxRQUFOLENBQWVWLFdBQVdTLEdBQVgsQ0FBZjtBQUNELENBRk07O0FBSUEsSUFBTUUsb0NBQWMsU0FBZEEsV0FBYyxHQUFNO0FBQy9CLGtDQUFjQyxJQUFkLENBQW1CLGVBQU87QUFDeEIsUUFBTUMsV0FBV0MsSUFBSWIsSUFBSixDQUFTYyxJQUExQjtBQUNBaEIsVUFBTVcsUUFBTixDQUFlTixhQUFhUyxRQUFiLENBQWY7QUFDRCxHQUhEO0FBSUQsQ0FMTTs7QUFPQSxJQUFNRyxvQ0FBYyxTQUFkQSxXQUFjLENBQUNDLE1BQUQsRUFBWTtBQUNyQyxnQ0FBWUEsTUFBWixFQUFvQkwsSUFBcEIsQ0FBeUIsZUFBTztBQUM5QixRQUFNTSxXQUFXSixJQUFJYixJQUFKLENBQVNBLElBQVQsQ0FBY2tCLFNBQWQsQ0FBd0JDLGdCQUF4QixDQUF5Q0MsUUFBMUQ7QUFDQXRCLFVBQU1XLFFBQU4sQ0FBZUosYUFBYVksUUFBYixDQUFmO0FBQ0QsR0FIRDtBQUlELENBTE07O0FBT0EsSUFBTUksb0NBQWMsU0FBZEEsV0FBYyxDQUFDQyxJQUFELEVBQVU7QUFDbkN4QixRQUFNVyxRQUFOLENBQWU7QUFDYlIsVUFBTUosTUFBTTBCLGFBREM7QUFFYkQ7QUFGYSxHQUFmO0FBSUQsQ0FMTTs7QUFPQSxJQUFNRSxzQ0FBZSxTQUFmQSxZQUFlLENBQUNSLE1BQUQsRUFBWTtBQUN0Q2xCLFFBQU1XLFFBQU4sQ0FBZTtBQUNiUixVQUFNSixNQUFNNEIsYUFEQztBQUViQyxTQUFLVixPQUFPVSxHQUZDO0FBR2JDLFNBQUtYLE9BQU9XO0FBSEMsR0FBZjtBQUtELENBTk07O0FBUUEsSUFBTUMsOENBQW1CLFNBQW5CQSxnQkFBbUIsR0FBTTtBQUNwQywrQkFBa0JqQixJQUFsQixDQUF1QixlQUFPO0FBQzVCYixVQUFNVyxRQUFOLENBQWU7QUFDYlIsWUFBTUosTUFBTWdDLGtCQURDO0FBRWJmLFlBQU1ELElBQUliLElBQUosQ0FBU2M7QUFGRixLQUFmO0FBSUQsR0FMRDtBQU1ELENBUE0iLCJmaWxlIjoiem9uZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHR5cGVzIGZyb20gJy4uL3R5cGVzL3pvbmUnXG5pbXBvcnQgeyBnZXRTdG9yZSB9IGZyb20gJ3dlcHktcmVkdXgnXG5pbXBvcnQgeyBnZXRDaXR5TGlzdCwgZ2V0Q2l0eUluZm8gfSBmcm9tICcuLi8uLi9hcGkvY3JlYXRlQ2xhc3MnXG5pbXBvcnQgeyBnZXRJZGVudGl0eUxpc3QgfSBmcm9tICcuLi8uLi9hcGkvdXNlcidcblxubGV0IHN0b3JlID0gZ2V0U3RvcmUoKVxuXG5jb25zdCBzZXRQdWJsaXNoID0gKGRhdGEpID0+ICh7dHlwZTogdHlwZXMuRlJPTV9QVUJMSVNILCBkYXRhfSlcblxuY29uc3Qgc2F2ZUNpdHlMaXN0ID0gKGRhdGEpID0+ICh7dHlwZTogdHlwZXMuR0VUX0NJVFlfTElTVCwgZGF0YX0pXG5cbmNvbnN0IHNhdmVDaXR5TmFtZSA9IChkYXRhKSA9PiAoe3R5cGU6IHR5cGVzLlNBVkVfQ0lUWV9OQU1FLCBkYXRhfSlcblxuZXhwb3J0IGNvbnN0IHNldEZyb21QdWJsaXNoID0gKHZhbCkgPT4ge1xuICBzdG9yZS5kaXNwYXRjaChzZXRQdWJsaXNoKHZhbCkpXG59XG5cbmV4cG9ydCBjb25zdCBzZXRDaXR5TGlzdCA9ICgpID0+IHtcbiAgZ2V0Q2l0eUxpc3QoKS50aGVuKHJlcyA9PiB7XG4gICAgY29uc3QgY2l0eUxpc3QgPSByZXMuZGF0YS5saXN0XG4gICAgc3RvcmUuZGlzcGF0Y2goc2F2ZUNpdHlMaXN0KGNpdHlMaXN0KSlcbiAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IGdldENpdHlOYW1lID0gKHBhcmFtcykgPT4ge1xuICBnZXRDaXR5SW5mbyhwYXJhbXMpLnRoZW4ocmVzID0+IHtcbiAgICBjb25zdCBjaXR5TmFtZSA9IHJlcy5kYXRhLmRhdGEucmVnZW9jb2RlLmFkZHJlc3NDb21wb25lbnQucHJvdmluY2VcbiAgICBzdG9yZS5kaXNwYXRjaChzYXZlQ2l0eU5hbWUoY2l0eU5hbWUpKVxuICB9KVxufVxuXG5leHBvcnQgY29uc3Qgc2V0Q2l0eU5hbWUgPSAobmFtZSkgPT4ge1xuICBzdG9yZS5kaXNwYXRjaCh7XG4gICAgdHlwZTogdHlwZXMuU0VUX0NJVFlfTkFNRSxcbiAgICBuYW1lXG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCBzYXZlTG9jYXRpb24gPSAocGFyYW1zKSA9PiB7XG4gIHN0b3JlLmRpc3BhdGNoKHtcbiAgICB0eXBlOiB0eXBlcy5TQVZFX0xPQ0FUSU9OLFxuICAgIGxuZzogcGFyYW1zLmxuZyxcbiAgICBsYXQ6IHBhcmFtcy5sYXRcbiAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IHNhdmVJZGVudGl0eUxpc3QgPSAoKSA9PiB7XG4gIGdldElkZW50aXR5TGlzdCgpLnRoZW4ocmVzID0+IHtcbiAgICBzdG9yZS5kaXNwYXRjaCh7XG4gICAgICB0eXBlOiB0eXBlcy5TQVZFX0lERU5USVRZX0xJU1QsXG4gICAgICBsaXN0OiByZXMuZGF0YS5saXN0XG4gICAgfSlcbiAgfSlcbn1cbiJdfQ==