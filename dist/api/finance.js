'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFinanceList = getFinanceList;
exports.getFinanceInfo = getFinanceInfo;
exports.addOrder = addOrder;
exports.getPaymentParams = getPaymentParams;

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
      data: Object.assign({}, _commonData2.default, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbmFuY2UuanMiXSwibmFtZXMiOlsiZ2V0RmluYW5jZUxpc3QiLCJnZXRGaW5hbmNlSW5mbyIsImFkZE9yZGVyIiwiZ2V0UGF5bWVudFBhcmFtcyIsImRhdGEiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIndlcHkiLCJyZXF1ZXN0IiwidXJsIiwibWVtYmVyX2lkIiwiY2xhc3NfaWQiLCJwcyIsInBuIiwidGhlbiIsInJlcyIsIk9iamVjdCIsImFzc2lnbiIsInN0dWRlbnRfaWRzIiwiY29sbGVjdGlvbl9pdGVtX2lkIiwibWV0aG9kIiwiY29tbW9uUGFyYW1zIiwib3JkZXJfaWQiLCJwYXltZW50X3R5cGUiLCJwYXltZW50X3NvdXJjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7UUFJZ0JBLGMsR0FBQUEsYztRQWlCQUMsYyxHQUFBQSxjO1FBZUFDLFEsR0FBQUEsUTtRQWlCQUMsZ0IsR0FBQUEsZ0I7O0FBckRoQjs7OztBQUNBOzs7Ozs7QUFFQTtBQUNPLFNBQVNILGNBQVQsQ0FBd0JJLElBQXhCLEVBQThCO0FBQ25DLFNBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q0MsbUJBQUtDLE9BQUwsQ0FBYTtBQUNYQyxXQUFLLHdCQURNO0FBRVhOLFlBQU07QUFDSk8sbUJBQVdQLEtBQUtPLFNBRFo7QUFFSkMsa0JBQVVSLEtBQUtRLFFBRlg7QUFHSkMsWUFBSVQsS0FBS1MsRUFITDtBQUlKQyxZQUFJVixLQUFLVTtBQUpMO0FBRkssS0FBYixFQVFHQyxJQVJILENBUVEsZUFBTztBQUNiVCxjQUFRVSxHQUFSO0FBQ0QsS0FWRDtBQVdELEdBWk0sQ0FBUDtBQWFEOztBQUVEO0FBQ08sU0FBU2YsY0FBVCxDQUF3QkcsSUFBeEIsRUFBOEI7QUFDbkMsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLFdBQUssdUJBRE07QUFFWE4sWUFBTTtBQUNKTyxtQkFBV1AsS0FBS08sU0FEWjtBQUVKQyxrQkFBVVIsS0FBS1E7QUFGWDtBQUZLLEtBQWIsRUFNR0csSUFOSCxDQU1RLGVBQU87QUFDYlQsY0FBUVUsR0FBUjtBQUNELEtBUkQ7QUFTRCxHQVZNLENBQVA7QUFXRDs7QUFFRDtBQUNPLFNBQVNkLFFBQVQsQ0FBa0JFLElBQWxCLEVBQXdCO0FBQzdCLFNBQU8sSUFBSUMsT0FBSixDQUFZLG1CQUFXO0FBQzVCRyxtQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLFdBQUssNkJBRE07QUFFWE4sWUFBTWEsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsMkJBQWxCLEVBQWtDO0FBQ3RDTixrQkFBVVIsS0FBS1EsUUFEdUI7QUFFdENPLHFCQUFhZixLQUFLZSxXQUZvQjtBQUd0Q0MsNEJBQW9CaEIsS0FBS2dCO0FBSGEsT0FBbEMsQ0FGSztBQU9YQyxjQUFRO0FBUEcsS0FBYixFQVFHTixJQVJILENBUVEsZUFBTztBQUNiVCxjQUFRVSxHQUFSO0FBQ0QsS0FWRDtBQVdELEdBWk0sQ0FBUDtBQWFEOztBQUVEO0FBQ08sU0FBU2IsZ0JBQVQsQ0FBMEJDLElBQTFCLEVBQWdDO0FBQ3JDLFNBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q0MsbUJBQUtDLE9BQUwsQ0FBYTtBQUNYQyxXQUFLLHdCQURNO0FBRVhOLFlBQU1hLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCSSxvQkFBbEIsRUFBZ0M7QUFDcENDLGtCQUFVbkIsS0FBS21CLFFBRHFCO0FBRXBDQyxzQkFBYyxPQUZzQjtBQUdwQ0Msd0JBQWdCO0FBSG9CLE9BQWhDLENBRks7QUFPWEosY0FBUTtBQVBHLEtBQWIsRUFRR04sSUFSSCxDQVFRLGVBQU87QUFDYlQsY0FBUVUsR0FBUjtBQUNELEtBVkQ7QUFXRCxHQVpNLENBQVA7QUFhRCIsImZpbGUiOiJmaW5hbmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCBjb21tb25QYXJhbXMgZnJvbSAnLi9jb21tb25EYXRhJ1xuXG4vLyDojrflj5bnj63nuqfotKLliqHmtYHmsLTliJfooahcbmV4cG9ydCBmdW5jdGlvbiBnZXRGaW5hbmNlTGlzdChkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9jbGFzcy9maW5hbmNpYWwvaW5kZXgnLFxuICAgICAgZGF0YToge1xuICAgICAgICBtZW1iZXJfaWQ6IGRhdGEubWVtYmVyX2lkLFxuICAgICAgICBjbGFzc19pZDogZGF0YS5jbGFzc19pZCxcbiAgICAgICAgcHM6IGRhdGEucHMsXG4gICAgICAgIHBuOiBkYXRhLnBuXG4gICAgICB9XG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLy8g6I635Y+W54+t57qn6LSi5Yqh5L+h5oGvXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmluYW5jZUluZm8oZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvY2xhc3MvZmluYW5jaWFsL2luZm8nLFxuICAgICAgZGF0YToge1xuICAgICAgICBtZW1iZXJfaWQ6IGRhdGEubWVtYmVyX2lkLFxuICAgICAgICBjbGFzc19pZDogZGF0YS5jbGFzc19pZFxuICAgICAgfVxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIOa3u+WKoOiuouWNlVxuZXhwb3J0IGZ1bmN0aW9uIGFkZE9yZGVyKGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvbW9tZW50L2NvbGxlY3Rpb24vYWRkT3JkZXInLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXG4gICAgICAgIHN0dWRlbnRfaWRzOiBkYXRhLnN0dWRlbnRfaWRzLFxuICAgICAgICBjb2xsZWN0aW9uX2l0ZW1faWQ6IGRhdGEuY29sbGVjdGlvbl9pdGVtX2lkXG4gICAgICB9KSxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLy8g6I635Y+W5pSv5LuY5Y+C5pWwXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGF5bWVudFBhcmFtcyhkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9wYXltZW50L3BheW1lbnRQYXJhbXMnLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zLCB7XG4gICAgICAgIG9yZGVyX2lkOiBkYXRhLm9yZGVyX2lkLFxuICAgICAgICBwYXltZW50X3R5cGU6ICd3eHBheScsXG4gICAgICAgIHBheW1lbnRfc291cmNlOiAnbW9iaWxlJ1xuICAgICAgfSksXG4gICAgICBtZXRob2Q6ICdwb3N0J1xuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG4iXX0=