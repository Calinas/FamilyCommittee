'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getClass = exports.setPresident = exports.setClassChanged = exports.saveIdentityList = exports.saveLocation = exports.setCityName = exports.getCityName = exports.setCityList = exports.setFromPublish = undefined;

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

var setClassChanged = exports.setClassChanged = function setClassChanged(data) {
  store.dispatch({
    type: types.CLASS_HAS_CHANGED,
    data: data
  });
};

var setPresident = exports.setPresident = function setPresident(data) {
  store.dispatch({
    type: types.SET_PRESIDENT,
    data: data
  });
};

var getClass = exports.getClass = function getClass(data) {
  (0, _createClass.getClassList)().then(function (res) {
    store.dispatch({
      type: types.GET_CLASS_LIST,
      data: res.data.list
    });
  });
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInpvbmUuanMiXSwibmFtZXMiOlsidHlwZXMiLCJzdG9yZSIsInNldFB1Ymxpc2giLCJkYXRhIiwidHlwZSIsIkZST01fUFVCTElTSCIsInNhdmVDaXR5TGlzdCIsIkdFVF9DSVRZX0xJU1QiLCJzYXZlQ2l0eU5hbWUiLCJTQVZFX0NJVFlfTkFNRSIsInNldEZyb21QdWJsaXNoIiwidmFsIiwiZGlzcGF0Y2giLCJzZXRDaXR5TGlzdCIsInRoZW4iLCJjaXR5TGlzdCIsInJlcyIsImxpc3QiLCJnZXRDaXR5TmFtZSIsInBhcmFtcyIsImNpdHlOYW1lIiwicmVnZW9jb2RlIiwiYWRkcmVzc0NvbXBvbmVudCIsInByb3ZpbmNlIiwic2V0Q2l0eU5hbWUiLCJuYW1lIiwiU0VUX0NJVFlfTkFNRSIsInNhdmVMb2NhdGlvbiIsIlNBVkVfTE9DQVRJT04iLCJsbmciLCJsYXQiLCJzYXZlSWRlbnRpdHlMaXN0IiwiU0FWRV9JREVOVElUWV9MSVNUIiwic2V0Q2xhc3NDaGFuZ2VkIiwiQ0xBU1NfSEFTX0NIQU5HRUQiLCJzZXRQcmVzaWRlbnQiLCJTRVRfUFJFU0lERU5UIiwiZ2V0Q2xhc3MiLCJHRVRfQ0xBU1NfTElTVCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztJQUFZQSxLOztBQUNaOztBQUNBOztBQUNBOzs7O0FBRUEsSUFBSUMsUUFBUSwwQkFBWjs7QUFFQSxJQUFNQyxhQUFhLFNBQWJBLFVBQWEsQ0FBQ0MsSUFBRDtBQUFBLFNBQVcsRUFBQ0MsTUFBTUosTUFBTUssWUFBYixFQUEyQkYsVUFBM0IsRUFBWDtBQUFBLENBQW5COztBQUVBLElBQU1HLGVBQWUsU0FBZkEsWUFBZSxDQUFDSCxJQUFEO0FBQUEsU0FBVyxFQUFDQyxNQUFNSixNQUFNTyxhQUFiLEVBQTRCSixVQUE1QixFQUFYO0FBQUEsQ0FBckI7O0FBRUEsSUFBTUssZUFBZSxTQUFmQSxZQUFlLENBQUNMLElBQUQ7QUFBQSxTQUFXLEVBQUNDLE1BQU1KLE1BQU1TLGNBQWIsRUFBNkJOLFVBQTdCLEVBQVg7QUFBQSxDQUFyQjs7QUFFTyxJQUFNTywwQ0FBaUIsU0FBakJBLGNBQWlCLENBQUNDLEdBQUQsRUFBUztBQUNyQ1YsUUFBTVcsUUFBTixDQUFlVixXQUFXUyxHQUFYLENBQWY7QUFDRCxDQUZNOztBQUlBLElBQU1FLG9DQUFjLFNBQWRBLFdBQWMsR0FBTTtBQUMvQixrQ0FBY0MsSUFBZCxDQUFtQixlQUFPO0FBQ3hCLFFBQU1DLFdBQVdDLElBQUliLElBQUosQ0FBU2MsSUFBMUI7QUFDQWhCLFVBQU1XLFFBQU4sQ0FBZU4sYUFBYVMsUUFBYixDQUFmO0FBQ0QsR0FIRDtBQUlELENBTE07O0FBT0EsSUFBTUcsb0NBQWMsU0FBZEEsV0FBYyxDQUFDQyxNQUFELEVBQVk7QUFDckMsZ0NBQVlBLE1BQVosRUFBb0JMLElBQXBCLENBQXlCLGVBQU87QUFDOUIsUUFBTU0sV0FBV0osSUFBSWIsSUFBSixDQUFTQSxJQUFULENBQWNrQixTQUFkLENBQXdCQyxnQkFBeEIsQ0FBeUNDLFFBQTFEO0FBQ0F0QixVQUFNVyxRQUFOLENBQWVKLGFBQWFZLFFBQWIsQ0FBZjtBQUNELEdBSEQ7QUFJRCxDQUxNOztBQU9BLElBQU1JLG9DQUFjLFNBQWRBLFdBQWMsQ0FBQ0MsSUFBRCxFQUFVO0FBQ25DeEIsUUFBTVcsUUFBTixDQUFlO0FBQ2JSLFVBQU1KLE1BQU0wQixhQURDO0FBRWJEO0FBRmEsR0FBZjtBQUlELENBTE07O0FBT0EsSUFBTUUsc0NBQWUsU0FBZkEsWUFBZSxDQUFDUixNQUFELEVBQVk7QUFDdENsQixRQUFNVyxRQUFOLENBQWU7QUFDYlIsVUFBTUosTUFBTTRCLGFBREM7QUFFYkMsU0FBS1YsT0FBT1UsR0FGQztBQUdiQyxTQUFLWCxPQUFPVztBQUhDLEdBQWY7QUFLRCxDQU5NOztBQVFBLElBQU1DLDhDQUFtQixTQUFuQkEsZ0JBQW1CLEdBQU07QUFDcEMsK0JBQWtCakIsSUFBbEIsQ0FBdUIsZUFBTztBQUM1QmIsVUFBTVcsUUFBTixDQUFlO0FBQ2JSLFlBQU1KLE1BQU1nQyxrQkFEQztBQUViZixZQUFNRCxJQUFJYixJQUFKLENBQVNjO0FBRkYsS0FBZjtBQUlELEdBTEQ7QUFNRCxDQVBNOztBQVNBLElBQU1nQiw0Q0FBa0IsU0FBbEJBLGVBQWtCLENBQUM5QixJQUFELEVBQVU7QUFDdkNGLFFBQU1XLFFBQU4sQ0FBZTtBQUNiUixVQUFNSixNQUFNa0MsaUJBREM7QUFFYi9CO0FBRmEsR0FBZjtBQUlELENBTE07O0FBT0EsSUFBTWdDLHNDQUFlLFNBQWZBLFlBQWUsQ0FBQ2hDLElBQUQsRUFBVTtBQUNwQ0YsUUFBTVcsUUFBTixDQUFlO0FBQ2JSLFVBQU1KLE1BQU1vQyxhQURDO0FBRWJqQztBQUZhLEdBQWY7QUFJRCxDQUxNOztBQU9BLElBQU1rQyw4QkFBVyxTQUFYQSxRQUFXLE9BQVE7QUFDOUIsbUNBQWV2QixJQUFmLENBQW9CLGVBQU87QUFDekJiLFVBQU1XLFFBQU4sQ0FBZTtBQUNiUixZQUFNSixNQUFNc0MsY0FEQztBQUVibkMsWUFBTWEsSUFBSWIsSUFBSixDQUFTYztBQUZGLEtBQWY7QUFJRCxHQUxEO0FBTUQsQ0FQTSIsImZpbGUiOiJ6b25lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi4vdHlwZXMvem9uZSdcbmltcG9ydCB7IGdldFN0b3JlIH0gZnJvbSAnd2VweS1yZWR1eCdcbmltcG9ydCB7IGdldENpdHlMaXN0LCBnZXRDaXR5SW5mbywgZ2V0Q2xhc3NMaXN0IH0gZnJvbSAnLi4vLi4vYXBpL2NyZWF0ZUNsYXNzJ1xuaW1wb3J0IHsgZ2V0SWRlbnRpdHlMaXN0IH0gZnJvbSAnLi4vLi4vYXBpL3VzZXInXG5cbmxldCBzdG9yZSA9IGdldFN0b3JlKClcblxuY29uc3Qgc2V0UHVibGlzaCA9IChkYXRhKSA9PiAoe3R5cGU6IHR5cGVzLkZST01fUFVCTElTSCwgZGF0YX0pXG5cbmNvbnN0IHNhdmVDaXR5TGlzdCA9IChkYXRhKSA9PiAoe3R5cGU6IHR5cGVzLkdFVF9DSVRZX0xJU1QsIGRhdGF9KVxuXG5jb25zdCBzYXZlQ2l0eU5hbWUgPSAoZGF0YSkgPT4gKHt0eXBlOiB0eXBlcy5TQVZFX0NJVFlfTkFNRSwgZGF0YX0pXG5cbmV4cG9ydCBjb25zdCBzZXRGcm9tUHVibGlzaCA9ICh2YWwpID0+IHtcbiAgc3RvcmUuZGlzcGF0Y2goc2V0UHVibGlzaCh2YWwpKVxufVxuXG5leHBvcnQgY29uc3Qgc2V0Q2l0eUxpc3QgPSAoKSA9PiB7XG4gIGdldENpdHlMaXN0KCkudGhlbihyZXMgPT4ge1xuICAgIGNvbnN0IGNpdHlMaXN0ID0gcmVzLmRhdGEubGlzdFxuICAgIHN0b3JlLmRpc3BhdGNoKHNhdmVDaXR5TGlzdChjaXR5TGlzdCkpXG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCBnZXRDaXR5TmFtZSA9IChwYXJhbXMpID0+IHtcbiAgZ2V0Q2l0eUluZm8ocGFyYW1zKS50aGVuKHJlcyA9PiB7XG4gICAgY29uc3QgY2l0eU5hbWUgPSByZXMuZGF0YS5kYXRhLnJlZ2VvY29kZS5hZGRyZXNzQ29tcG9uZW50LnByb3ZpbmNlXG4gICAgc3RvcmUuZGlzcGF0Y2goc2F2ZUNpdHlOYW1lKGNpdHlOYW1lKSlcbiAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IHNldENpdHlOYW1lID0gKG5hbWUpID0+IHtcbiAgc3RvcmUuZGlzcGF0Y2goe1xuICAgIHR5cGU6IHR5cGVzLlNFVF9DSVRZX05BTUUsXG4gICAgbmFtZVxuICB9KVxufVxuXG5leHBvcnQgY29uc3Qgc2F2ZUxvY2F0aW9uID0gKHBhcmFtcykgPT4ge1xuICBzdG9yZS5kaXNwYXRjaCh7XG4gICAgdHlwZTogdHlwZXMuU0FWRV9MT0NBVElPTixcbiAgICBsbmc6IHBhcmFtcy5sbmcsXG4gICAgbGF0OiBwYXJhbXMubGF0XG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCBzYXZlSWRlbnRpdHlMaXN0ID0gKCkgPT4ge1xuICBnZXRJZGVudGl0eUxpc3QoKS50aGVuKHJlcyA9PiB7XG4gICAgc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgdHlwZTogdHlwZXMuU0FWRV9JREVOVElUWV9MSVNULFxuICAgICAgbGlzdDogcmVzLmRhdGEubGlzdFxuICAgIH0pXG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCBzZXRDbGFzc0NoYW5nZWQgPSAoZGF0YSkgPT4ge1xuICBzdG9yZS5kaXNwYXRjaCh7XG4gICAgdHlwZTogdHlwZXMuQ0xBU1NfSEFTX0NIQU5HRUQsXG4gICAgZGF0YVxuICB9KVxufVxuXG5leHBvcnQgY29uc3Qgc2V0UHJlc2lkZW50ID0gKGRhdGEpID0+IHtcbiAgc3RvcmUuZGlzcGF0Y2goe1xuICAgIHR5cGU6IHR5cGVzLlNFVF9QUkVTSURFTlQsXG4gICAgZGF0YVxuICB9KVxufVxuXG5leHBvcnQgY29uc3QgZ2V0Q2xhc3MgPSBkYXRhID0+IHtcbiAgZ2V0Q2xhc3NMaXN0KCkudGhlbihyZXMgPT4ge1xuICAgIHN0b3JlLmRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IHR5cGVzLkdFVF9DTEFTU19MSVNULFxuICAgICAgZGF0YTogcmVzLmRhdGEubGlzdFxuICAgIH0pXG4gIH0pXG59XG4iXX0=