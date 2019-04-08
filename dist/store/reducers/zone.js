'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _handleActions;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reduxActions = require('./../../npm/redux-actions/lib/index.js');

var _zone = require('./../types/zone.js');

var types = _interopRequireWildcard(_zone);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, types.FROM_PUBLISH, function (state, action) {
  return _extends({}, state, {
    from_publish: action.data
  });
}), _defineProperty(_handleActions, types.SAVE_LOCATION, function (state, action) {
  return _extends({}, state, {
    lat: action.lat,
    lng: action.lng
  });
}), _defineProperty(_handleActions, types.SAVE_CITY_NAME, function (state, action) {
  return _extends({}, state, {
    city_name: action.data
  });
}), _defineProperty(_handleActions, types.SET_CITY_NAME, function (state, action) {
  return _extends({}, state, {
    city_name: action.name
  });
}), _defineProperty(_handleActions, types.GET_CITY_LIST, function (state, action) {
  return _extends({}, state, {
    city_list: action.data
  });
}), _defineProperty(_handleActions, types.SAVE_IDENTITY_LIST, function (state, action) {
  return _extends({}, state, {
    relationship: action.list
  });
}), _defineProperty(_handleActions, types.CLASS_HAS_CHANGED, function (state, action) {
  return _extends({}, state, {
    classChanged: action.data
  });
}), _handleActions), {
  city_name: '正在定位中...',
  city_list: [],
  from_publish: false,
  relationship: [],
  classChanged: false
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInpvbmUuanMiXSwibmFtZXMiOlsidHlwZXMiLCJGUk9NX1BVQkxJU0giLCJzdGF0ZSIsImFjdGlvbiIsImZyb21fcHVibGlzaCIsImRhdGEiLCJTQVZFX0xPQ0FUSU9OIiwibGF0IiwibG5nIiwiU0FWRV9DSVRZX05BTUUiLCJjaXR5X25hbWUiLCJTRVRfQ0lUWV9OQU1FIiwibmFtZSIsIkdFVF9DSVRZX0xJU1QiLCJjaXR5X2xpc3QiLCJTQVZFX0lERU5USVRZX0xJU1QiLCJyZWxhdGlvbnNoaXAiLCJsaXN0IiwiQ0xBU1NfSEFTX0NIQU5HRUQiLCJjbGFzc0NoYW5nZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7SUFBWUEsSzs7Ozs7O2tCQUVHLHVGQUNaQSxNQUFNQyxZQURNLFlBQ1NDLEtBRFQsRUFDZ0JDLE1BRGhCLEVBQ3dCO0FBQ25DLHNCQUNLRCxLQURMO0FBRUVFLGtCQUFjRCxPQUFPRTtBQUZ2QjtBQUlELENBTlksbUNBT1pMLE1BQU1NLGFBUE0sWUFPVUosS0FQVixFQU9pQkMsTUFQakIsRUFPeUI7QUFDcEMsc0JBQ0tELEtBREw7QUFFRUssU0FBS0osT0FBT0ksR0FGZDtBQUdFQyxTQUFLTCxPQUFPSztBQUhkO0FBS0QsQ0FiWSxtQ0FjWlIsTUFBTVMsY0FkTSxZQWNXUCxLQWRYLEVBY2tCQyxNQWRsQixFQWMwQjtBQUNyQyxzQkFDS0QsS0FETDtBQUVFUSxlQUFXUCxPQUFPRTtBQUZwQjtBQUlELENBbkJZLG1DQW9CWkwsTUFBTVcsYUFwQk0sWUFvQlVULEtBcEJWLEVBb0JpQkMsTUFwQmpCLEVBb0J5QjtBQUNwQyxzQkFDS0QsS0FETDtBQUVFUSxlQUFXUCxPQUFPUztBQUZwQjtBQUlELENBekJZLG1DQTBCWlosTUFBTWEsYUExQk0sWUEwQlVYLEtBMUJWLEVBMEJpQkMsTUExQmpCLEVBMEJ5QjtBQUNwQyxzQkFDS0QsS0FETDtBQUVFWSxlQUFXWCxPQUFPRTtBQUZwQjtBQUlELENBL0JZLG1DQWdDWkwsTUFBTWUsa0JBaENNLFlBZ0NjYixLQWhDZCxFQWdDcUJDLE1BaENyQixFQWdDNkI7QUFDeEMsc0JBQ0tELEtBREw7QUFFRWMsa0JBQWNiLE9BQU9jO0FBRnZCO0FBSUQsQ0FyQ1ksbUNBc0NaakIsTUFBTWtCLGlCQXRDTSxZQXNDYWhCLEtBdENiLEVBc0NvQkMsTUF0Q3BCLEVBc0M0QjtBQUN2QyxzQkFDS0QsS0FETDtBQUVFaUIsa0JBQWNoQixPQUFPRTtBQUZ2QjtBQUlELENBM0NZLG9CQTRDWjtBQUNESyxhQUFXLFVBRFY7QUFFREksYUFBVyxFQUZWO0FBR0RWLGdCQUFjLEtBSGI7QUFJRFksZ0JBQWMsRUFKYjtBQUtERyxnQkFBYztBQUxiLENBNUNZLEMiLCJmaWxlIjoiem9uZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGhhbmRsZUFjdGlvbnMgfSBmcm9tICdyZWR1eC1hY3Rpb25zJ1xuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi4vdHlwZXMvem9uZSdcblxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlQWN0aW9ucyh7XG4gIFt0eXBlcy5GUk9NX1BVQkxJU0hdIChzdGF0ZSwgYWN0aW9uKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgZnJvbV9wdWJsaXNoOiBhY3Rpb24uZGF0YVxuICAgIH1cbiAgfSxcbiAgW3R5cGVzLlNBVkVfTE9DQVRJT05dIChzdGF0ZSwgYWN0aW9uKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgbGF0OiBhY3Rpb24ubGF0LFxuICAgICAgbG5nOiBhY3Rpb24ubG5nXG4gICAgfVxuICB9LFxuICBbdHlwZXMuU0FWRV9DSVRZX05BTUVdIChzdGF0ZSwgYWN0aW9uKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgY2l0eV9uYW1lOiBhY3Rpb24uZGF0YVxuICAgIH1cbiAgfSxcbiAgW3R5cGVzLlNFVF9DSVRZX05BTUVdIChzdGF0ZSwgYWN0aW9uKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgY2l0eV9uYW1lOiBhY3Rpb24ubmFtZVxuICAgIH1cbiAgfSxcbiAgW3R5cGVzLkdFVF9DSVRZX0xJU1RdIChzdGF0ZSwgYWN0aW9uKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgY2l0eV9saXN0OiBhY3Rpb24uZGF0YVxuICAgIH1cbiAgfSxcbiAgW3R5cGVzLlNBVkVfSURFTlRJVFlfTElTVF0oc3RhdGUsIGFjdGlvbikge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIHJlbGF0aW9uc2hpcDogYWN0aW9uLmxpc3RcbiAgICB9XG4gIH0sXG4gIFt0eXBlcy5DTEFTU19IQVNfQ0hBTkdFRF0oc3RhdGUsIGFjdGlvbikge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGNsYXNzQ2hhbmdlZDogYWN0aW9uLmRhdGFcbiAgICB9XG4gIH1cbn0sIHtcbiAgY2l0eV9uYW1lOiAn5q2j5Zyo5a6a5L2N5LitLi4uJyxcbiAgY2l0eV9saXN0OiBbXSxcbiAgZnJvbV9wdWJsaXNoOiBmYWxzZSxcbiAgcmVsYXRpb25zaGlwOiBbXSxcbiAgY2xhc3NDaGFuZ2VkOiBmYWxzZVxufSlcbiJdfQ==