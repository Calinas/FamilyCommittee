"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFSA = isFSA;
exports.isError = isError;

var _isString2 = _interopRequireDefault(require('./../../lodash/isString.js'));

var _isPlainObject2 = _interopRequireDefault(require('./../../lodash/isPlainObject.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isFSA(action) {
  return (0, _isPlainObject2.default)(action) && (0, _isString2.default)(action.type) && Object.keys(action).every(isValidKey);
}

function isError(action) {
  return isFSA(action) && action.error === true;
}

function isValidKey(key) {
  return ['type', 'payload', 'error', 'meta'].indexOf(key) > -1;
}