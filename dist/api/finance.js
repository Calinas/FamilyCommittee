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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbmFuY2UuanMiXSwibmFtZXMiOlsiZ2V0RmluYW5jZUxpc3QiLCJnZXRQZXJzb25GaW5hbmNlTGlzdCIsImdldEZpbmFuY2VJbmZvIiwiYWRkT3JkZXIiLCJnZXRQYXltZW50UGFyYW1zIiwid2l0aGRyYXdDYXNoIiwiZGF0YSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwid2VweSIsInJlcXVlc3QiLCJ1cmwiLCJtZW1iZXJfaWQiLCJjbGFzc19pZCIsInBzIiwicG4iLCJ0aGVuIiwicmVzIiwicGFyYW1zIiwiT2JqZWN0IiwiYXNzaWduIiwic3R1ZGVudF9pZHMiLCJjb2xsZWN0aW9uX2l0ZW1faWQiLCJtZXRob2QiLCJvcmRlcl9pZCIsInBheW1lbnRfdHlwZSIsInBheW1lbnRfc291cmNlIiwiY29sbGVjdGlvbl9pZCIsImFtb3VudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7UUFJZ0JBLGMsR0FBQUEsYztRQWlCQUMsb0IsR0FBQUEsb0I7UUFjQUMsYyxHQUFBQSxjO1FBZUFDLFEsR0FBQUEsUTtRQWlCQUMsZ0IsR0FBQUEsZ0I7UUFpQkFDLFksR0FBQUEsWTs7QUFwRmhCOzs7O0FBQ0E7Ozs7OztBQUVBO0FBQ08sU0FBU0wsY0FBVCxDQUF3Qk0sSUFBeEIsRUFBOEI7QUFDbkMsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLFdBQUssd0JBRE07QUFFWE4sWUFBTTtBQUNKTyxtQkFBV1AsS0FBS08sU0FEWjtBQUVKQyxrQkFBVVIsS0FBS1EsUUFGWDtBQUdKQyxZQUFJVCxLQUFLUyxFQUhMO0FBSUpDLFlBQUlWLEtBQUtVO0FBSkw7QUFGSyxLQUFiLEVBUUdDLElBUkgsQ0FRUSxlQUFPO0FBQ2JULGNBQVFVLEdBQVI7QUFDRCxLQVZEO0FBV0QsR0FaTSxDQUFQO0FBYUQ7O0FBRUQ7QUFDTyxTQUFTakIsb0JBQVQsQ0FBOEJrQixNQUE5QixFQUFzQztBQUMzQyxTQUFPLElBQUlaLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLG1CQUFLQyxPQUFMLENBQWE7QUFDWEMsV0FBSyx5QkFETTtBQUVYTixZQUFNYyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQiwyQkFBbEIsRUFBa0M7QUFDdENQLGtCQUFVSyxPQUFPTDtBQURxQixPQUFsQztBQUZLLEtBQWIsRUFLR0csSUFMSCxDQUtRLGVBQU87QUFDYlQsY0FBUVUsR0FBUjtBQUNELEtBUEQ7QUFRRCxHQVRNLENBQVA7QUFVRDs7QUFFRDtBQUNPLFNBQVNoQixjQUFULENBQXdCSSxJQUF4QixFQUE4QjtBQUNuQyxTQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLG1CQUFLQyxPQUFMLENBQWE7QUFDWEMsV0FBSyx1QkFETTtBQUVYTixZQUFNO0FBQ0pPLG1CQUFXUCxLQUFLTyxTQURaO0FBRUpDLGtCQUFVUixLQUFLUTtBQUZYO0FBRkssS0FBYixFQU1HRyxJQU5ILENBTVEsZUFBTztBQUNiVCxjQUFRVSxHQUFSO0FBQ0QsS0FSRDtBQVNELEdBVk0sQ0FBUDtBQVdEOztBQUVEO0FBQ08sU0FBU2YsUUFBVCxDQUFrQkcsSUFBbEIsRUFBd0I7QUFDN0IsU0FBTyxJQUFJQyxPQUFKLENBQVksbUJBQVc7QUFDNUJHLG1CQUFLQyxPQUFMLENBQWE7QUFDWEMsV0FBSyw2QkFETTtBQUVYTixZQUFNYyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQiwyQkFBbEIsRUFBa0M7QUFDdENQLGtCQUFVUixLQUFLUSxRQUR1QjtBQUV0Q1EscUJBQWFoQixLQUFLZ0IsV0FGb0I7QUFHdENDLDRCQUFvQmpCLEtBQUtpQjtBQUhhLE9BQWxDLENBRks7QUFPWEMsY0FBUTtBQVBHLEtBQWIsRUFRR1AsSUFSSCxDQVFRLGVBQU87QUFDYlQsY0FBUVUsR0FBUjtBQUNELEtBVkQ7QUFXRCxHQVpNLENBQVA7QUFhRDs7QUFFRDtBQUNPLFNBQVNkLGdCQUFULENBQTBCRSxJQUExQixFQUFnQztBQUNyQyxTQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLG1CQUFLQyxPQUFMLENBQWE7QUFDWEMsV0FBSyx3QkFETTtBQUVYTixZQUFNYyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQiwyQkFBbEIsRUFBa0M7QUFDdENJLGtCQUFVbkIsS0FBS21CLFFBRHVCO0FBRXRDQyxzQkFBYyxPQUZ3QjtBQUd0Q0Msd0JBQWdCO0FBSHNCLE9BQWxDLENBRks7QUFPWEgsY0FBUTtBQVBHLEtBQWIsRUFRR1AsSUFSSCxDQVFRLGVBQU87QUFDYlQsY0FBUVUsR0FBUjtBQUNELEtBVkQ7QUFXRCxHQVpNLENBQVA7QUFhRDs7QUFFRDtBQUNPLFNBQVNiLFlBQVQsQ0FBc0JDLElBQXRCLEVBQTRCO0FBQ2pDLFNBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q0MsbUJBQUtDLE9BQUwsQ0FBYTtBQUNYQyxXQUFLLDhCQURNO0FBRVhOLFlBQU1jLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLDJCQUFsQixFQUFrQztBQUN0Q1Asa0JBQVVSLEtBQUtRLFFBRHVCO0FBRXRDYyx1QkFBZXRCLEtBQUtzQixhQUZrQjtBQUd0Q0MsZ0JBQVF2QixLQUFLdUI7QUFIeUIsT0FBbEMsQ0FGSztBQU9YTCxjQUFRO0FBUEcsS0FBYixFQVFHUCxJQVJILENBUVEsZUFBTztBQUNiVCxjQUFRVSxHQUFSO0FBQ0QsS0FWRDtBQVdELEdBWk0sQ0FBUDtBQWFEIiwiZmlsZSI6ImZpbmFuY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgY29tbW9uUGFyYW1zIGZyb20gJy4vY29tbW9uRGF0YSdcclxuXHJcbi8vIOiOt+WPluePree6p+i0ouWKoea1geawtOWIl+ihqFxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmluYW5jZUxpc3QoZGF0YSkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICB1cmw6ICcvY2xhc3MvZmluYW5jaWFsL2luZGV4JyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIG1lbWJlcl9pZDogZGF0YS5tZW1iZXJfaWQsXHJcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXHJcbiAgICAgICAgcHM6IGRhdGEucHMsXHJcbiAgICAgICAgcG46IGRhdGEucG5cclxuICAgICAgfVxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICByZXNvbHZlKHJlcylcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG5cclxuLy8g6I635Y+W5Liq5Lq66LSi5Yqh5rWB5rC05YiX6KGoXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRQZXJzb25GaW5hbmNlTGlzdChwYXJhbXMpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiAnL21lbWJlci9jbGFzcy9vcmRlckxpc3QnLFxyXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xyXG4gICAgICAgIGNsYXNzX2lkOiBwYXJhbXMuY2xhc3NfaWRcclxuICAgICAgfSlcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgcmVzb2x2ZShyZXMpXHJcbiAgICB9KVxyXG4gIH0pXHJcbn1cclxuXHJcbi8vIOiOt+WPluePree6p+i0ouWKoeS/oeaBr1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmluYW5jZUluZm8oZGF0YSkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICB1cmw6ICcvY2xhc3MvZmluYW5jaWFsL2luZm8nLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgbWVtYmVyX2lkOiBkYXRhLm1lbWJlcl9pZCxcclxuICAgICAgICBjbGFzc19pZDogZGF0YS5jbGFzc19pZFxyXG4gICAgICB9XHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHJlc29sdmUocmVzKVxyXG4gICAgfSlcclxuICB9KVxyXG59XHJcblxyXG4vLyDmt7vliqDorqLljZVcclxuZXhwb3J0IGZ1bmN0aW9uIGFkZE9yZGVyKGRhdGEpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICB1cmw6ICcvbW9tZW50L2NvbGxlY3Rpb24vYWRkT3JkZXInLFxyXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xyXG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxyXG4gICAgICAgIHN0dWRlbnRfaWRzOiBkYXRhLnN0dWRlbnRfaWRzLFxyXG4gICAgICAgIGNvbGxlY3Rpb25faXRlbV9pZDogZGF0YS5jb2xsZWN0aW9uX2l0ZW1faWRcclxuICAgICAgfSksXHJcbiAgICAgIG1ldGhvZDogJ3Bvc3QnXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHJlc29sdmUocmVzKVxyXG4gICAgfSlcclxuICB9KVxyXG59XHJcblxyXG4vLyDojrflj5bmlK/ku5jlj4LmlbBcclxuZXhwb3J0IGZ1bmN0aW9uIGdldFBheW1lbnRQYXJhbXMoZGF0YSkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICB1cmw6ICcvcGF5bWVudC9wYXltZW50UGFyYW1zJyxcclxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcclxuICAgICAgICBvcmRlcl9pZDogZGF0YS5vcmRlcl9pZCxcclxuICAgICAgICBwYXltZW50X3R5cGU6ICd3eHBheScsXHJcbiAgICAgICAgcGF5bWVudF9zb3VyY2U6ICdtb2JpbGUnXHJcbiAgICAgIH0pLFxyXG4gICAgICBtZXRob2Q6ICdwb3N0J1xyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICByZXNvbHZlKHJlcylcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG5cclxuLy8g55Sz6K+35o+Q546wXHJcbmV4cG9ydCBmdW5jdGlvbiB3aXRoZHJhd0Nhc2goZGF0YSkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICB1cmw6ICcvY2xhc3MvY29sbGVjdGlvbi93aXRoZHJhd2FsJyxcclxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcclxuICAgICAgICBjbGFzc19pZDogZGF0YS5jbGFzc19pZCxcclxuICAgICAgICBjb2xsZWN0aW9uX2lkOiBkYXRhLmNvbGxlY3Rpb25faWQsXHJcbiAgICAgICAgYW1vdW50OiBkYXRhLmFtb3VudFxyXG4gICAgICB9KSxcclxuICAgICAgbWV0aG9kOiAncG9zdCdcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgcmVzb2x2ZShyZXMpXHJcbiAgICB9KVxyXG4gIH0pXHJcbn1cclxuIl19