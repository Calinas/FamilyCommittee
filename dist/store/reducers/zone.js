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
}), _handleActions), {
  city_name: '正在定位中...',
  city_list: [],
  from_publish: false,
  relationship: []
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInpvbmUuanMiXSwibmFtZXMiOlsidHlwZXMiLCJGUk9NX1BVQkxJU0giLCJzdGF0ZSIsImFjdGlvbiIsImZyb21fcHVibGlzaCIsImRhdGEiLCJTQVZFX0xPQ0FUSU9OIiwibGF0IiwibG5nIiwiU0FWRV9DSVRZX05BTUUiLCJjaXR5X25hbWUiLCJTRVRfQ0lUWV9OQU1FIiwibmFtZSIsIkdFVF9DSVRZX0xJU1QiLCJjaXR5X2xpc3QiLCJTQVZFX0lERU5USVRZX0xJU1QiLCJyZWxhdGlvbnNoaXAiLCJsaXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0lBQVlBLEs7Ozs7OztrQkFFRyx1RkFDWkEsTUFBTUMsWUFETSxZQUNTQyxLQURULEVBQ2dCQyxNQURoQixFQUN3QjtBQUNuQyxzQkFDS0QsS0FETDtBQUVFRSxrQkFBY0QsT0FBT0U7QUFGdkI7QUFJRCxDQU5ZLG1DQU9aTCxNQUFNTSxhQVBNLFlBT1VKLEtBUFYsRUFPaUJDLE1BUGpCLEVBT3lCO0FBQ3BDLHNCQUNLRCxLQURMO0FBRUVLLFNBQUtKLE9BQU9JLEdBRmQ7QUFHRUMsU0FBS0wsT0FBT0s7QUFIZDtBQUtELENBYlksbUNBY1pSLE1BQU1TLGNBZE0sWUFjV1AsS0FkWCxFQWNrQkMsTUFkbEIsRUFjMEI7QUFDckMsc0JBQ0tELEtBREw7QUFFRVEsZUFBV1AsT0FBT0U7QUFGcEI7QUFJRCxDQW5CWSxtQ0FvQlpMLE1BQU1XLGFBcEJNLFlBb0JVVCxLQXBCVixFQW9CaUJDLE1BcEJqQixFQW9CeUI7QUFDcEMsc0JBQ0tELEtBREw7QUFFRVEsZUFBV1AsT0FBT1M7QUFGcEI7QUFJRCxDQXpCWSxtQ0EwQlpaLE1BQU1hLGFBMUJNLFlBMEJVWCxLQTFCVixFQTBCaUJDLE1BMUJqQixFQTBCeUI7QUFDcEMsc0JBQ0tELEtBREw7QUFFRVksZUFBV1gsT0FBT0U7QUFGcEI7QUFJRCxDQS9CWSxtQ0FnQ1pMLE1BQU1lLGtCQWhDTSxZQWdDY2IsS0FoQ2QsRUFnQ3FCQyxNQWhDckIsRUFnQzZCO0FBQ3hDLHNCQUNLRCxLQURMO0FBRUVjLGtCQUFjYixPQUFPYztBQUZ2QjtBQUlELENBckNZLG9CQXNDWjtBQUNEUCxhQUFXLFVBRFY7QUFFREksYUFBVyxFQUZWO0FBR0RWLGdCQUFjLEtBSGI7QUFJRFksZ0JBQWM7QUFKYixDQXRDWSxDIiwiZmlsZSI6InpvbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoYW5kbGVBY3Rpb25zIH0gZnJvbSAncmVkdXgtYWN0aW9ucydcbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gJy4uL3R5cGVzL3pvbmUnXG5cbmV4cG9ydCBkZWZhdWx0IGhhbmRsZUFjdGlvbnMoe1xuICBbdHlwZXMuRlJPTV9QVUJMSVNIXSAoc3RhdGUsIGFjdGlvbikge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGZyb21fcHVibGlzaDogYWN0aW9uLmRhdGFcbiAgICB9XG4gIH0sXG4gIFt0eXBlcy5TQVZFX0xPQ0FUSU9OXSAoc3RhdGUsIGFjdGlvbikge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGxhdDogYWN0aW9uLmxhdCxcbiAgICAgIGxuZzogYWN0aW9uLmxuZ1xuICAgIH1cbiAgfSxcbiAgW3R5cGVzLlNBVkVfQ0lUWV9OQU1FXSAoc3RhdGUsIGFjdGlvbikge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGNpdHlfbmFtZTogYWN0aW9uLmRhdGFcbiAgICB9XG4gIH0sXG4gIFt0eXBlcy5TRVRfQ0lUWV9OQU1FXSAoc3RhdGUsIGFjdGlvbikge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGNpdHlfbmFtZTogYWN0aW9uLm5hbWVcbiAgICB9XG4gIH0sXG4gIFt0eXBlcy5HRVRfQ0lUWV9MSVNUXSAoc3RhdGUsIGFjdGlvbikge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGNpdHlfbGlzdDogYWN0aW9uLmRhdGFcbiAgICB9XG4gIH0sXG4gIFt0eXBlcy5TQVZFX0lERU5USVRZX0xJU1RdKHN0YXRlLCBhY3Rpb24pIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICByZWxhdGlvbnNoaXA6IGFjdGlvbi5saXN0XG4gICAgfVxuICB9XG59LCB7XG4gIGNpdHlfbmFtZTogJ+ato+WcqOWumuS9jeS4rS4uLicsXG4gIGNpdHlfbGlzdDogW10sXG4gIGZyb21fcHVibGlzaDogZmFsc2UsXG4gIHJlbGF0aW9uc2hpcDogW11cbn0pXG4iXX0=