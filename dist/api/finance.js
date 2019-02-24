'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFinanceList = getFinanceList;
exports.getFinanceInfo = getFinanceInfo;
exports.addOrder = addOrder;
exports.getPaymentParams = getPaymentParams;
exports.withdrawCash = withdrawCash;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _commonData = require('./commonData.js');

var _commonData2 = _interopRequireDefault(_commonData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 获取班级财务流水列表
function getFinanceList(data) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/class/financial/index',
      data: {
        member_id: data.member_id,
        class_id: data.class_id,
        ps: data.ps,
        pn: data.pn
      }
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 获取班级财务信息
function getFinanceInfo(data) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/class/financial/info',
      data: {
        member_id: data.member_id,
        class_id: data.class_id
      }
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 添加订单
function addOrder(data) {
  return new Promise(function (resolve) {
    _wepy2.default.request({
      url: '/moment/collection/addOrder',
      data: Object.assign({}, (0, _commonData2.default)(), {
        class_id: data.class_id,
        student_ids: data.student_ids,
        collection_item_id: data.collection_item_id
      }),
      method: 'post'
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 获取支付参数
function getPaymentParams(data) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/payment/paymentParams',
      data: Object.assign({}, (0, _commonData2.default)(), {
        order_id: data.order_id,
        payment_type: 'wxpay',
        payment_source: 'mobile'
      }),
      method: 'post'
    }).then(function (res) {
      resolve(res);
    });
  });
}

// 申请提现
function withdrawCash(data) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/class/collection/withdrawal',
      data: Object.assign({}, (0, _commonData2.default)(), {
        class_id: data.class_id,
        collection_id: data.collection_id,
        amount: data.amount
      }),
      method: 'post'
    }).then(function (res) {
      resolve(res);
    });
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbmFuY2UuanMiXSwibmFtZXMiOlsiZ2V0RmluYW5jZUxpc3QiLCJnZXRGaW5hbmNlSW5mbyIsImFkZE9yZGVyIiwiZ2V0UGF5bWVudFBhcmFtcyIsIndpdGhkcmF3Q2FzaCIsImRhdGEiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIndlcHkiLCJyZXF1ZXN0IiwidXJsIiwibWVtYmVyX2lkIiwiY2xhc3NfaWQiLCJwcyIsInBuIiwidGhlbiIsInJlcyIsIk9iamVjdCIsImFzc2lnbiIsInN0dWRlbnRfaWRzIiwiY29sbGVjdGlvbl9pdGVtX2lkIiwibWV0aG9kIiwib3JkZXJfaWQiLCJwYXltZW50X3R5cGUiLCJwYXltZW50X3NvdXJjZSIsImNvbGxlY3Rpb25faWQiLCJhbW91bnQiXSwibWFwcGluZ3MiOiI7Ozs7O1FBSWdCQSxjLEdBQUFBLGM7UUFpQkFDLGMsR0FBQUEsYztRQWVBQyxRLEdBQUFBLFE7UUFpQkFDLGdCLEdBQUFBLGdCO1FBaUJBQyxZLEdBQUFBLFk7O0FBdEVoQjs7OztBQUNBOzs7Ozs7QUFFQTtBQUNPLFNBQVNKLGNBQVQsQ0FBd0JLLElBQXhCLEVBQThCO0FBQ25DLFNBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q0MsbUJBQUtDLE9BQUwsQ0FBYTtBQUNYQyxXQUFLLHdCQURNO0FBRVhOLFlBQU07QUFDSk8sbUJBQVdQLEtBQUtPLFNBRFo7QUFFSkMsa0JBQVVSLEtBQUtRLFFBRlg7QUFHSkMsWUFBSVQsS0FBS1MsRUFITDtBQUlKQyxZQUFJVixLQUFLVTtBQUpMO0FBRkssS0FBYixFQVFHQyxJQVJILENBUVEsZUFBTztBQUNiVCxjQUFRVSxHQUFSO0FBQ0QsS0FWRDtBQVdELEdBWk0sQ0FBUDtBQWFEOztBQUVEO0FBQ08sU0FBU2hCLGNBQVQsQ0FBd0JJLElBQXhCLEVBQThCO0FBQ25DLFNBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q0MsbUJBQUtDLE9BQUwsQ0FBYTtBQUNYQyxXQUFLLHVCQURNO0FBRVhOLFlBQU07QUFDSk8sbUJBQVdQLEtBQUtPLFNBRFo7QUFFSkMsa0JBQVVSLEtBQUtRO0FBRlg7QUFGSyxLQUFiLEVBTUdHLElBTkgsQ0FNUSxlQUFPO0FBQ2JULGNBQVFVLEdBQVI7QUFDRCxLQVJEO0FBU0QsR0FWTSxDQUFQO0FBV0Q7O0FBRUQ7QUFDTyxTQUFTZixRQUFULENBQWtCRyxJQUFsQixFQUF3QjtBQUM3QixTQUFPLElBQUlDLE9BQUosQ0FBWSxtQkFBVztBQUM1QkcsbUJBQUtDLE9BQUwsQ0FBYTtBQUNYQyxXQUFLLDZCQURNO0FBRVhOLFlBQU1hLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLDJCQUFsQixFQUFrQztBQUN0Q04sa0JBQVVSLEtBQUtRLFFBRHVCO0FBRXRDTyxxQkFBYWYsS0FBS2UsV0FGb0I7QUFHdENDLDRCQUFvQmhCLEtBQUtnQjtBQUhhLE9BQWxDLENBRks7QUFPWEMsY0FBUTtBQVBHLEtBQWIsRUFRR04sSUFSSCxDQVFRLGVBQU87QUFDYlQsY0FBUVUsR0FBUjtBQUNELEtBVkQ7QUFXRCxHQVpNLENBQVA7QUFhRDs7QUFFRDtBQUNPLFNBQVNkLGdCQUFULENBQTBCRSxJQUExQixFQUFnQztBQUNyQyxTQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLG1CQUFLQyxPQUFMLENBQWE7QUFDWEMsV0FBSyx3QkFETTtBQUVYTixZQUFNYSxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQiwyQkFBbEIsRUFBa0M7QUFDdENJLGtCQUFVbEIsS0FBS2tCLFFBRHVCO0FBRXRDQyxzQkFBYyxPQUZ3QjtBQUd0Q0Msd0JBQWdCO0FBSHNCLE9BQWxDLENBRks7QUFPWEgsY0FBUTtBQVBHLEtBQWIsRUFRR04sSUFSSCxDQVFRLGVBQU87QUFDYlQsY0FBUVUsR0FBUjtBQUNELEtBVkQ7QUFXRCxHQVpNLENBQVA7QUFhRDs7QUFFRDtBQUNPLFNBQVNiLFlBQVQsQ0FBc0JDLElBQXRCLEVBQTRCO0FBQ2pDLFNBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q0MsbUJBQUtDLE9BQUwsQ0FBYTtBQUNYQyxXQUFLLDhCQURNO0FBRVhOLFlBQU1hLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLDJCQUFsQixFQUFrQztBQUN0Q04sa0JBQVVSLEtBQUtRLFFBRHVCO0FBRXRDYSx1QkFBZXJCLEtBQUtxQixhQUZrQjtBQUd0Q0MsZ0JBQVF0QixLQUFLc0I7QUFIeUIsT0FBbEMsQ0FGSztBQU9YTCxjQUFRO0FBUEcsS0FBYixFQVFHTixJQVJILENBUVEsZUFBTztBQUNiVCxjQUFRVSxHQUFSO0FBQ0QsS0FWRDtBQVdELEdBWk0sQ0FBUDtBQWFEIiwiZmlsZSI6ImZpbmFuY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgY29tbW9uUGFyYW1zIGZyb20gJy4vY29tbW9uRGF0YSdcclxuXHJcbi8vIOiOt+WPluePree6p+i0ouWKoea1geawtOWIl+ihqFxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmluYW5jZUxpc3QoZGF0YSkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICB1cmw6ICcvY2xhc3MvZmluYW5jaWFsL2luZGV4JyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIG1lbWJlcl9pZDogZGF0YS5tZW1iZXJfaWQsXHJcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXHJcbiAgICAgICAgcHM6IGRhdGEucHMsXHJcbiAgICAgICAgcG46IGRhdGEucG5cclxuICAgICAgfVxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICByZXNvbHZlKHJlcylcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG5cclxuLy8g6I635Y+W54+t57qn6LSi5Yqh5L+h5oGvXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRGaW5hbmNlSW5mbyhkYXRhKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgIHVybDogJy9jbGFzcy9maW5hbmNpYWwvaW5mbycsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBtZW1iZXJfaWQ6IGRhdGEubWVtYmVyX2lkLFxyXG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkXHJcbiAgICAgIH1cclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgcmVzb2x2ZShyZXMpXHJcbiAgICB9KVxyXG4gIH0pXHJcbn1cclxuXHJcbi8vIOa3u+WKoOiuouWNlVxyXG5leHBvcnQgZnVuY3Rpb24gYWRkT3JkZXIoZGF0YSkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgIHVybDogJy9tb21lbnQvY29sbGVjdGlvbi9hZGRPcmRlcicsXHJcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XHJcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXHJcbiAgICAgICAgc3R1ZGVudF9pZHM6IGRhdGEuc3R1ZGVudF9pZHMsXHJcbiAgICAgICAgY29sbGVjdGlvbl9pdGVtX2lkOiBkYXRhLmNvbGxlY3Rpb25faXRlbV9pZFxyXG4gICAgICB9KSxcclxuICAgICAgbWV0aG9kOiAncG9zdCdcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgcmVzb2x2ZShyZXMpXHJcbiAgICB9KVxyXG4gIH0pXHJcbn1cclxuXHJcbi8vIOiOt+WPluaUr+S7mOWPguaVsFxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGF5bWVudFBhcmFtcyhkYXRhKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgIHVybDogJy9wYXltZW50L3BheW1lbnRQYXJhbXMnLFxyXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xyXG4gICAgICAgIG9yZGVyX2lkOiBkYXRhLm9yZGVyX2lkLFxyXG4gICAgICAgIHBheW1lbnRfdHlwZTogJ3d4cGF5JyxcclxuICAgICAgICBwYXltZW50X3NvdXJjZTogJ21vYmlsZSdcclxuICAgICAgfSksXHJcbiAgICAgIG1ldGhvZDogJ3Bvc3QnXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHJlc29sdmUocmVzKVxyXG4gICAgfSlcclxuICB9KVxyXG59XHJcblxyXG4vLyDnlLPor7fmj5DnjrBcclxuZXhwb3J0IGZ1bmN0aW9uIHdpdGhkcmF3Q2FzaChkYXRhKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgIHVybDogJy9jbGFzcy9jb2xsZWN0aW9uL3dpdGhkcmF3YWwnLFxyXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xyXG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxyXG4gICAgICAgIGNvbGxlY3Rpb25faWQ6IGRhdGEuY29sbGVjdGlvbl9pZCxcclxuICAgICAgICBhbW91bnQ6IGRhdGEuYW1vdW50XHJcbiAgICAgIH0pLFxyXG4gICAgICBtZXRob2Q6ICdwb3N0J1xyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICByZXNvbHZlKHJlcylcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG4iXX0=