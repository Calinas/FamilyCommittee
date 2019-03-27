'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.personalCashflowObj = exports.cashWithdrawObj = undefined;

var _common = require('./common.js');

// 收款提现
var cashWithdrawObj = exports.cashWithdrawObj = function cashWithdrawObj(item) {
  return {
    id: item.app_id,
    desc: (0, _common.getOnlyDate)(item.created_at) + ',\u60A8\u53D1\u8D77\u4E86\u4E00\u4E2A\u6536\u6B3E\uFF0C\u5171\u6536\u5230' + item.info.total_money,
    money: item.info.can_withdraw_money,
    created_at: item.created_at
  };
};

// 个人财务流水
var personalCashflowObj = exports.personalCashflowObj = function personalCashflowObj(item) {
  return {
    class_nickname: item.info.member.class_nickname,
    money: item.pay_amount,
    time: item.updated_at
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vcm1hbGl6ZS5qcyJdLCJuYW1lcyI6WyJjYXNoV2l0aGRyYXdPYmoiLCJpZCIsIml0ZW0iLCJhcHBfaWQiLCJkZXNjIiwiY3JlYXRlZF9hdCIsImluZm8iLCJ0b3RhbF9tb25leSIsIm1vbmV5IiwiY2FuX3dpdGhkcmF3X21vbmV5IiwicGVyc29uYWxDYXNoZmxvd09iaiIsImNsYXNzX25pY2tuYW1lIiwibWVtYmVyIiwicGF5X2Ftb3VudCIsInRpbWUiLCJ1cGRhdGVkX2F0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUE7QUFDTyxJQUFNQSw0Q0FBa0IsU0FBbEJBLGVBQWtCO0FBQUEsU0FBUztBQUN0Q0MsUUFBSUMsS0FBS0MsTUFENkI7QUFFdENDLFVBQVMseUJBQVlGLEtBQUtHLFVBQWpCLENBQVQsaUZBQXFESCxLQUFLSSxJQUFMLENBQVVDLFdBRnpCO0FBR3RDQyxXQUFPTixLQUFLSSxJQUFMLENBQVVHLGtCQUhxQjtBQUl0Q0osZ0JBQVlILEtBQUtHO0FBSnFCLEdBQVQ7QUFBQSxDQUF4Qjs7QUFPUDtBQUNPLElBQU1LLG9EQUFzQixTQUF0QkEsbUJBQXNCO0FBQUEsU0FBUztBQUMxQ0Msb0JBQWdCVCxLQUFLSSxJQUFMLENBQVVNLE1BQVYsQ0FBaUJELGNBRFM7QUFFMUNILFdBQU9OLEtBQUtXLFVBRjhCO0FBRzFDQyxVQUFNWixLQUFLYTtBQUgrQixHQUFUO0FBQUEsQ0FBNUIiLCJmaWxlIjoibm9ybWFsaXplLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0T25seURhdGUgfSBmcm9tICcuL2NvbW1vbidcblxuLy8g5pS25qy+5o+Q546wXG5leHBvcnQgY29uc3QgY2FzaFdpdGhkcmF3T2JqID0gaXRlbSA9PiAoe1xuICBpZDogaXRlbS5hcHBfaWQsXG4gIGRlc2M6IGAke2dldE9ubHlEYXRlKGl0ZW0uY3JlYXRlZF9hdCl9LOaCqOWPkei1t+S6huS4gOS4quaUtuasvu+8jOWFseaUtuWIsCR7aXRlbS5pbmZvLnRvdGFsX21vbmV5fWAsXG4gIG1vbmV5OiBpdGVtLmluZm8uY2FuX3dpdGhkcmF3X21vbmV5LFxuICBjcmVhdGVkX2F0OiBpdGVtLmNyZWF0ZWRfYXRcbn0pXG5cbi8vIOS4quS6uui0ouWKoea1geawtFxuZXhwb3J0IGNvbnN0IHBlcnNvbmFsQ2FzaGZsb3dPYmogPSBpdGVtID0+ICh7XG4gIGNsYXNzX25pY2tuYW1lOiBpdGVtLmluZm8ubWVtYmVyLmNsYXNzX25pY2tuYW1lLFxuICBtb25leTogaXRlbS5wYXlfYW1vdW50LFxuICB0aW1lOiBpdGVtLnVwZGF0ZWRfYXRcbn0pXG4iXX0=