'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _handleActions;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reduxActions = require('./../../npm/redux-actions/lib/index.js');

var _zone = require('./../types/zone.js');

var types = _interopRequireWildcard(_zone);

var _normalize = require('./../../utils/normalize.js');

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
}), _defineProperty(_handleActions, types.SET_PRESIDENT, function (state, action) {
  return _extends({}, state, {
    isPresident: action.data
  });
}), _defineProperty(_handleActions, types.CLASS_HAS_CHANGED, function (state, action) {
  return _extends({}, state, {
    classChanged: action.data
  });
}), _defineProperty(_handleActions, types.GET_CLASS_LIST, function (state, action) {
  return _extends({}, state, {
    classList: action.data.map(_normalize.classListObj)
  });
}), _handleActions), {
  city_name: '正在定位中...',
  city_list: [],
  from_publish: false,
  relationship: [],
  classChanged: false,
  isPresident: false
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInpvbmUuanMiXSwibmFtZXMiOlsidHlwZXMiLCJGUk9NX1BVQkxJU0giLCJzdGF0ZSIsImFjdGlvbiIsImZyb21fcHVibGlzaCIsImRhdGEiLCJTQVZFX0xPQ0FUSU9OIiwibGF0IiwibG5nIiwiU0FWRV9DSVRZX05BTUUiLCJjaXR5X25hbWUiLCJTRVRfQ0lUWV9OQU1FIiwibmFtZSIsIkdFVF9DSVRZX0xJU1QiLCJjaXR5X2xpc3QiLCJTQVZFX0lERU5USVRZX0xJU1QiLCJyZWxhdGlvbnNoaXAiLCJsaXN0IiwiU0VUX1BSRVNJREVOVCIsImlzUHJlc2lkZW50IiwiQ0xBU1NfSEFTX0NIQU5HRUQiLCJjbGFzc0NoYW5nZWQiLCJHRVRfQ0xBU1NfTElTVCIsImNsYXNzTGlzdCIsIm1hcCIsImNsYXNzTGlzdE9iaiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOztBQUNBOztJQUFZQSxLOztBQUNaOzs7Ozs7a0JBRWUsdUZBQ1pBLE1BQU1DLFlBRE0sWUFDU0MsS0FEVCxFQUNnQkMsTUFEaEIsRUFDd0I7QUFDbkMsc0JBQ0tELEtBREw7QUFFRUUsa0JBQWNELE9BQU9FO0FBRnZCO0FBSUQsQ0FOWSxtQ0FPWkwsTUFBTU0sYUFQTSxZQU9VSixLQVBWLEVBT2lCQyxNQVBqQixFQU95QjtBQUNwQyxzQkFDS0QsS0FETDtBQUVFSyxTQUFLSixPQUFPSSxHQUZkO0FBR0VDLFNBQUtMLE9BQU9LO0FBSGQ7QUFLRCxDQWJZLG1DQWNaUixNQUFNUyxjQWRNLFlBY1dQLEtBZFgsRUFja0JDLE1BZGxCLEVBYzBCO0FBQ3JDLHNCQUNLRCxLQURMO0FBRUVRLGVBQVdQLE9BQU9FO0FBRnBCO0FBSUQsQ0FuQlksbUNBb0JaTCxNQUFNVyxhQXBCTSxZQW9CVVQsS0FwQlYsRUFvQmlCQyxNQXBCakIsRUFvQnlCO0FBQ3BDLHNCQUNLRCxLQURMO0FBRUVRLGVBQVdQLE9BQU9TO0FBRnBCO0FBSUQsQ0F6QlksbUNBMEJaWixNQUFNYSxhQTFCTSxZQTBCVVgsS0ExQlYsRUEwQmlCQyxNQTFCakIsRUEwQnlCO0FBQ3BDLHNCQUNLRCxLQURMO0FBRUVZLGVBQVdYLE9BQU9FO0FBRnBCO0FBSUQsQ0EvQlksbUNBZ0NaTCxNQUFNZSxrQkFoQ00sWUFnQ2NiLEtBaENkLEVBZ0NxQkMsTUFoQ3JCLEVBZ0M2QjtBQUN4QyxzQkFDS0QsS0FETDtBQUVFYyxrQkFBY2IsT0FBT2M7QUFGdkI7QUFJRCxDQXJDWSxtQ0FzQ1pqQixNQUFNa0IsYUF0Q00sWUFzQ1NoQixLQXRDVCxFQXNDZ0JDLE1BdENoQixFQXNDd0I7QUFDbkMsc0JBQ0tELEtBREw7QUFFRWlCLGlCQUFhaEIsT0FBT0U7QUFGdEI7QUFJRCxDQTNDWSxtQ0E0Q1pMLE1BQU1vQixpQkE1Q00sWUE0Q2FsQixLQTVDYixFQTRDb0JDLE1BNUNwQixFQTRDNEI7QUFDdkMsc0JBQ0tELEtBREw7QUFFRW1CLGtCQUFjbEIsT0FBT0U7QUFGdkI7QUFJRCxDQWpEWSxtQ0FrRFpMLE1BQU1zQixjQWxETSxZQWtEVXBCLEtBbERWLEVBa0RpQkMsTUFsRGpCLEVBa0R5QjtBQUNwQyxzQkFDS0QsS0FETDtBQUVFcUIsZUFBV3BCLE9BQU9FLElBQVAsQ0FBWW1CLEdBQVosQ0FBZ0JDLHVCQUFoQjtBQUZiO0FBSUQsQ0F2RFksb0JBd0RaO0FBQ0RmLGFBQVcsVUFEVjtBQUVESSxhQUFXLEVBRlY7QUFHRFYsZ0JBQWMsS0FIYjtBQUlEWSxnQkFBYyxFQUpiO0FBS0RLLGdCQUFjLEtBTGI7QUFNREYsZUFBYTtBQU5aLENBeERZLEMiLCJmaWxlIjoiem9uZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGhhbmRsZUFjdGlvbnMgfSBmcm9tICdyZWR1eC1hY3Rpb25zJ1xuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi4vdHlwZXMvem9uZSdcbmltcG9ydCB7IGNsYXNzTGlzdE9iaiB9IGZyb20gJy4uLy4uL3V0aWxzL25vcm1hbGl6ZSdcblxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlQWN0aW9ucyh7XG4gIFt0eXBlcy5GUk9NX1BVQkxJU0hdIChzdGF0ZSwgYWN0aW9uKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgZnJvbV9wdWJsaXNoOiBhY3Rpb24uZGF0YVxuICAgIH1cbiAgfSxcbiAgW3R5cGVzLlNBVkVfTE9DQVRJT05dIChzdGF0ZSwgYWN0aW9uKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgbGF0OiBhY3Rpb24ubGF0LFxuICAgICAgbG5nOiBhY3Rpb24ubG5nXG4gICAgfVxuICB9LFxuICBbdHlwZXMuU0FWRV9DSVRZX05BTUVdIChzdGF0ZSwgYWN0aW9uKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgY2l0eV9uYW1lOiBhY3Rpb24uZGF0YVxuICAgIH1cbiAgfSxcbiAgW3R5cGVzLlNFVF9DSVRZX05BTUVdIChzdGF0ZSwgYWN0aW9uKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgY2l0eV9uYW1lOiBhY3Rpb24ubmFtZVxuICAgIH1cbiAgfSxcbiAgW3R5cGVzLkdFVF9DSVRZX0xJU1RdIChzdGF0ZSwgYWN0aW9uKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgY2l0eV9saXN0OiBhY3Rpb24uZGF0YVxuICAgIH1cbiAgfSxcbiAgW3R5cGVzLlNBVkVfSURFTlRJVFlfTElTVF0oc3RhdGUsIGFjdGlvbikge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIHJlbGF0aW9uc2hpcDogYWN0aW9uLmxpc3RcbiAgICB9XG4gIH0sXG4gIFt0eXBlcy5TRVRfUFJFU0lERU5UXShzdGF0ZSwgYWN0aW9uKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgaXNQcmVzaWRlbnQ6IGFjdGlvbi5kYXRhXG4gICAgfVxuICB9LFxuICBbdHlwZXMuQ0xBU1NfSEFTX0NIQU5HRURdKHN0YXRlLCBhY3Rpb24pIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBjbGFzc0NoYW5nZWQ6IGFjdGlvbi5kYXRhXG4gICAgfVxuICB9LFxuICBbdHlwZXMuR0VUX0NMQVNTX0xJU1RdKHN0YXRlLCBhY3Rpb24pIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBjbGFzc0xpc3Q6IGFjdGlvbi5kYXRhLm1hcChjbGFzc0xpc3RPYmopXG4gICAgfVxuICB9XG59LCB7XG4gIGNpdHlfbmFtZTogJ+ato+WcqOWumuS9jeS4rS4uLicsXG4gIGNpdHlfbGlzdDogW10sXG4gIGZyb21fcHVibGlzaDogZmFsc2UsXG4gIHJlbGF0aW9uc2hpcDogW10sXG4gIGNsYXNzQ2hhbmdlZDogZmFsc2UsXG4gIGlzUHJlc2lkZW50OiBmYWxzZVxufSlcbiJdfQ==