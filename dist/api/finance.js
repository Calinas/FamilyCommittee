'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFinanceList = getFinanceList;
exports.getPersonFinanceList = getPersonFinanceList;
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

// 获取个人财务流水列表
function getPersonFinanceList(params) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/member/class/orderList',
      data: Object.assign({}, (0, _commonData2.default)(), {
        class_id: params.class_id
      })
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbmFuY2UuanMiXSwibmFtZXMiOlsiZ2V0RmluYW5jZUxpc3QiLCJnZXRQZXJzb25GaW5hbmNlTGlzdCIsImdldEZpbmFuY2VJbmZvIiwiYWRkT3JkZXIiLCJnZXRQYXltZW50UGFyYW1zIiwid2l0aGRyYXdDYXNoIiwiZGF0YSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwid2VweSIsInJlcXVlc3QiLCJ1cmwiLCJtZW1iZXJfaWQiLCJjbGFzc19pZCIsInBzIiwicG4iLCJ0aGVuIiwicmVzIiwicGFyYW1zIiwiT2JqZWN0IiwiYXNzaWduIiwic3R1ZGVudF9pZHMiLCJjb2xsZWN0aW9uX2l0ZW1faWQiLCJtZXRob2QiLCJvcmRlcl9pZCIsInBheW1lbnRfdHlwZSIsInBheW1lbnRfc291cmNlIiwiY29sbGVjdGlvbl9pZCIsImFtb3VudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7UUFJZ0JBLGMsR0FBQUEsYztRQWlCQUMsb0IsR0FBQUEsb0I7UUFjQUMsYyxHQUFBQSxjO1FBZUFDLFEsR0FBQUEsUTtRQWlCQUMsZ0IsR0FBQUEsZ0I7UUFpQkFDLFksR0FBQUEsWTs7QUFwRmhCOzs7O0FBQ0E7Ozs7OztBQUVBO0FBQ08sU0FBU0wsY0FBVCxDQUF3Qk0sSUFBeEIsRUFBOEI7QUFDbkMsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLFdBQUssd0JBRE07QUFFWE4sWUFBTTtBQUNKTyxtQkFBV1AsS0FBS08sU0FEWjtBQUVKQyxrQkFBVVIsS0FBS1EsUUFGWDtBQUdKQyxZQUFJVCxLQUFLUyxFQUhMO0FBSUpDLFlBQUlWLEtBQUtVO0FBSkw7QUFGSyxLQUFiLEVBUUdDLElBUkgsQ0FRUSxlQUFPO0FBQ2JULGNBQVFVLEdBQVI7QUFDRCxLQVZEO0FBV0QsR0FaTSxDQUFQO0FBYUQ7O0FBRUQ7QUFDTyxTQUFTakIsb0JBQVQsQ0FBOEJrQixNQUE5QixFQUFzQztBQUMzQyxTQUFPLElBQUlaLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLG1CQUFLQyxPQUFMLENBQWE7QUFDWEMsV0FBSyx5QkFETTtBQUVYTixZQUFNYyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQiwyQkFBbEIsRUFBa0M7QUFDdENQLGtCQUFVSyxPQUFPTDtBQURxQixPQUFsQztBQUZLLEtBQWIsRUFLR0csSUFMSCxDQUtRLGVBQU87QUFDYlQsY0FBUVUsR0FBUjtBQUNELEtBUEQ7QUFRRCxHQVRNLENBQVA7QUFVRDs7QUFFRDtBQUNPLFNBQVNoQixjQUFULENBQXdCSSxJQUF4QixFQUE4QjtBQUNuQyxTQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLG1CQUFLQyxPQUFMLENBQWE7QUFDWEMsV0FBSyx1QkFETTtBQUVYTixZQUFNO0FBQ0pPLG1CQUFXUCxLQUFLTyxTQURaO0FBRUpDLGtCQUFVUixLQUFLUTtBQUZYO0FBRkssS0FBYixFQU1HRyxJQU5ILENBTVEsZUFBTztBQUNiVCxjQUFRVSxHQUFSO0FBQ0QsS0FSRDtBQVNELEdBVk0sQ0FBUDtBQVdEOztBQUVEO0FBQ08sU0FBU2YsUUFBVCxDQUFrQkcsSUFBbEIsRUFBd0I7QUFDN0IsU0FBTyxJQUFJQyxPQUFKLENBQVksbUJBQVc7QUFDNUJHLG1CQUFLQyxPQUFMLENBQWE7QUFDWEMsV0FBSyw2QkFETTtBQUVYTixZQUFNYyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQiwyQkFBbEIsRUFBa0M7QUFDdENQLGtCQUFVUixLQUFLUSxRQUR1QjtBQUV0Q1EscUJBQWFoQixLQUFLZ0IsV0FGb0I7QUFHdENDLDRCQUFvQmpCLEtBQUtpQjtBQUhhLE9BQWxDLENBRks7QUFPWEMsY0FBUTtBQVBHLEtBQWIsRUFRR1AsSUFSSCxDQVFRLGVBQU87QUFDYlQsY0FBUVUsR0FBUjtBQUNELEtBVkQ7QUFXRCxHQVpNLENBQVA7QUFhRDs7QUFFRDtBQUNPLFNBQVNkLGdCQUFULENBQTBCRSxJQUExQixFQUFnQztBQUNyQyxTQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLG1CQUFLQyxPQUFMLENBQWE7QUFDWEMsV0FBSyx3QkFETTtBQUVYTixZQUFNYyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQiwyQkFBbEIsRUFBa0M7QUFDdENJLGtCQUFVbkIsS0FBS21CLFFBRHVCO0FBRXRDQyxzQkFBYyxPQUZ3QjtBQUd0Q0Msd0JBQWdCO0FBSHNCLE9BQWxDLENBRks7QUFPWEgsY0FBUTtBQVBHLEtBQWIsRUFRR1AsSUFSSCxDQVFRLGVBQU87QUFDYlQsY0FBUVUsR0FBUjtBQUNELEtBVkQ7QUFXRCxHQVpNLENBQVA7QUFhRDs7QUFFRDtBQUNPLFNBQVNiLFlBQVQsQ0FBc0JDLElBQXRCLEVBQTRCO0FBQ2pDLFNBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q0MsbUJBQUtDLE9BQUwsQ0FBYTtBQUNYQyxXQUFLLDhCQURNO0FBRVhOLFlBQU1jLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLDJCQUFsQixFQUFrQztBQUN0Q1Asa0JBQVVSLEtBQUtRLFFBRHVCO0FBRXRDYyx1QkFBZXRCLEtBQUtzQixhQUZrQjtBQUd0Q0MsZ0JBQVF2QixLQUFLdUI7QUFIeUIsT0FBbEMsQ0FGSztBQU9YTCxjQUFRO0FBUEcsS0FBYixFQVFHUCxJQVJILENBUVEsZUFBTztBQUNiVCxjQUFRVSxHQUFSO0FBQ0QsS0FWRDtBQVdELEdBWk0sQ0FBUDtBQWFEIiwiZmlsZSI6ImZpbmFuY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IGNvbW1vblBhcmFtcyBmcm9tICcuL2NvbW1vbkRhdGEnXG5cbi8vIOiOt+WPluePree6p+i0ouWKoea1geawtOWIl+ihqFxuZXhwb3J0IGZ1bmN0aW9uIGdldEZpbmFuY2VMaXN0KGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2NsYXNzL2ZpbmFuY2lhbC9pbmRleCcsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIG1lbWJlcl9pZDogZGF0YS5tZW1iZXJfaWQsXG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxuICAgICAgICBwczogZGF0YS5wcyxcbiAgICAgICAgcG46IGRhdGEucG5cbiAgICAgIH1cbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDojrflj5bkuKrkurrotKLliqHmtYHmsLTliJfooahcbmV4cG9ydCBmdW5jdGlvbiBnZXRQZXJzb25GaW5hbmNlTGlzdChwYXJhbXMpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL21lbWJlci9jbGFzcy9vcmRlckxpc3QnLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcbiAgICAgICAgY2xhc3NfaWQ6IHBhcmFtcy5jbGFzc19pZFxuICAgICAgfSlcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDojrflj5bnj63nuqfotKLliqHkv6Hmga9cbmV4cG9ydCBmdW5jdGlvbiBnZXRGaW5hbmNlSW5mbyhkYXRhKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9jbGFzcy9maW5hbmNpYWwvaW5mbycsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIG1lbWJlcl9pZDogZGF0YS5tZW1iZXJfaWQsXG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkXG4gICAgICB9XG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLy8g5re75Yqg6K6i5Y2VXG5leHBvcnQgZnVuY3Rpb24gYWRkT3JkZXIoZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogJy9tb21lbnQvY29sbGVjdGlvbi9hZGRPcmRlcicsXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xuICAgICAgICBjbGFzc19pZDogZGF0YS5jbGFzc19pZCxcbiAgICAgICAgc3R1ZGVudF9pZHM6IGRhdGEuc3R1ZGVudF9pZHMsXG4gICAgICAgIGNvbGxlY3Rpb25faXRlbV9pZDogZGF0YS5jb2xsZWN0aW9uX2l0ZW1faWRcbiAgICAgIH0pLFxuICAgICAgbWV0aG9kOiAncG9zdCdcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDojrflj5bmlK/ku5jlj4LmlbBcbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXltZW50UGFyYW1zKGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL3BheW1lbnQvcGF5bWVudFBhcmFtcycsXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xuICAgICAgICBvcmRlcl9pZDogZGF0YS5vcmRlcl9pZCxcbiAgICAgICAgcGF5bWVudF90eXBlOiAnd3hwYXknLFxuICAgICAgICBwYXltZW50X3NvdXJjZTogJ21vYmlsZSdcbiAgICAgIH0pLFxuICAgICAgbWV0aG9kOiAncG9zdCdcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vLyDnlLPor7fmj5DnjrBcbmV4cG9ydCBmdW5jdGlvbiB3aXRoZHJhd0Nhc2goZGF0YSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6ICcvY2xhc3MvY29sbGVjdGlvbi93aXRoZHJhd2FsJyxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxuICAgICAgICBjb2xsZWN0aW9uX2lkOiBkYXRhLmNvbGxlY3Rpb25faWQsXG4gICAgICAgIGFtb3VudDogZGF0YS5hbW91bnRcbiAgICAgIH0pLFxuICAgICAgbWV0aG9kOiAncG9zdCdcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuIl19