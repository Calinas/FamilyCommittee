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
      data: Object.assign({}, (0, _commonData2.default)(), {
        class_id: data.class_id
      })
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbmFuY2UuanMiXSwibmFtZXMiOlsiZ2V0RmluYW5jZUxpc3QiLCJnZXRQZXJzb25GaW5hbmNlTGlzdCIsImdldEZpbmFuY2VJbmZvIiwiYWRkT3JkZXIiLCJnZXRQYXltZW50UGFyYW1zIiwid2l0aGRyYXdDYXNoIiwiZGF0YSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwid2VweSIsInJlcXVlc3QiLCJ1cmwiLCJtZW1iZXJfaWQiLCJjbGFzc19pZCIsInBzIiwicG4iLCJ0aGVuIiwicmVzIiwicGFyYW1zIiwiT2JqZWN0IiwiYXNzaWduIiwic3R1ZGVudF9pZHMiLCJjb2xsZWN0aW9uX2l0ZW1faWQiLCJtZXRob2QiLCJvcmRlcl9pZCIsInBheW1lbnRfdHlwZSIsInBheW1lbnRfc291cmNlIiwiY29sbGVjdGlvbl9pZCIsImFtb3VudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7UUFJZ0JBLGMsR0FBQUEsYztRQWlCQUMsb0IsR0FBQUEsb0I7UUFjQUMsYyxHQUFBQSxjO1FBY0FDLFEsR0FBQUEsUTtRQWlCQUMsZ0IsR0FBQUEsZ0I7UUFpQkFDLFksR0FBQUEsWTs7QUFuRmhCOzs7O0FBQ0E7Ozs7OztBQUVBO0FBQ08sU0FBU0wsY0FBVCxDQUF3Qk0sSUFBeEIsRUFBOEI7QUFDbkMsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLFdBQUssd0JBRE07QUFFWE4sWUFBTTtBQUNKTyxtQkFBV1AsS0FBS08sU0FEWjtBQUVKQyxrQkFBVVIsS0FBS1EsUUFGWDtBQUdKQyxZQUFJVCxLQUFLUyxFQUhMO0FBSUpDLFlBQUlWLEtBQUtVO0FBSkw7QUFGSyxLQUFiLEVBUUdDLElBUkgsQ0FRUSxlQUFPO0FBQ2JULGNBQVFVLEdBQVI7QUFDRCxLQVZEO0FBV0QsR0FaTSxDQUFQO0FBYUQ7O0FBRUQ7QUFDTyxTQUFTakIsb0JBQVQsQ0FBOEJrQixNQUE5QixFQUFzQztBQUMzQyxTQUFPLElBQUlaLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLG1CQUFLQyxPQUFMLENBQWE7QUFDWEMsV0FBSyx5QkFETTtBQUVYTixZQUFNYyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQiwyQkFBbEIsRUFBa0M7QUFDdENQLGtCQUFVSyxPQUFPTDtBQURxQixPQUFsQztBQUZLLEtBQWIsRUFLR0csSUFMSCxDQUtRLGVBQU87QUFDYlQsY0FBUVUsR0FBUjtBQUNELEtBUEQ7QUFRRCxHQVRNLENBQVA7QUFVRDs7QUFFRDtBQUNPLFNBQVNoQixjQUFULENBQXdCSSxJQUF4QixFQUE4QjtBQUNuQyxTQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLG1CQUFLQyxPQUFMLENBQWE7QUFDWEMsV0FBSyx1QkFETTtBQUVYTixZQUFNYyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQiwyQkFBbEIsRUFBa0M7QUFDdENQLGtCQUFVUixLQUFLUTtBQUR1QixPQUFsQztBQUZLLEtBQWIsRUFLR0csSUFMSCxDQUtRLGVBQU87QUFDYlQsY0FBUVUsR0FBUjtBQUNELEtBUEQ7QUFRRCxHQVRNLENBQVA7QUFVRDs7QUFFRDtBQUNPLFNBQVNmLFFBQVQsQ0FBa0JHLElBQWxCLEVBQXdCO0FBQzdCLFNBQU8sSUFBSUMsT0FBSixDQUFZLG1CQUFXO0FBQzVCRyxtQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLFdBQUssNkJBRE07QUFFWE4sWUFBTWMsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsMkJBQWxCLEVBQWtDO0FBQ3RDUCxrQkFBVVIsS0FBS1EsUUFEdUI7QUFFdENRLHFCQUFhaEIsS0FBS2dCLFdBRm9CO0FBR3RDQyw0QkFBb0JqQixLQUFLaUI7QUFIYSxPQUFsQyxDQUZLO0FBT1hDLGNBQVE7QUFQRyxLQUFiLEVBUUdQLElBUkgsQ0FRUSxlQUFPO0FBQ2JULGNBQVFVLEdBQVI7QUFDRCxLQVZEO0FBV0QsR0FaTSxDQUFQO0FBYUQ7O0FBRUQ7QUFDTyxTQUFTZCxnQkFBVCxDQUEwQkUsSUFBMUIsRUFBZ0M7QUFDckMsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLFdBQUssd0JBRE07QUFFWE4sWUFBTWMsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsMkJBQWxCLEVBQWtDO0FBQ3RDSSxrQkFBVW5CLEtBQUttQixRQUR1QjtBQUV0Q0Msc0JBQWMsT0FGd0I7QUFHdENDLHdCQUFnQjtBQUhzQixPQUFsQyxDQUZLO0FBT1hILGNBQVE7QUFQRyxLQUFiLEVBUUdQLElBUkgsQ0FRUSxlQUFPO0FBQ2JULGNBQVFVLEdBQVI7QUFDRCxLQVZEO0FBV0QsR0FaTSxDQUFQO0FBYUQ7O0FBRUQ7QUFDTyxTQUFTYixZQUFULENBQXNCQyxJQUF0QixFQUE0QjtBQUNqQyxTQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLG1CQUFLQyxPQUFMLENBQWE7QUFDWEMsV0FBSyw4QkFETTtBQUVYTixZQUFNYyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQiwyQkFBbEIsRUFBa0M7QUFDdENQLGtCQUFVUixLQUFLUSxRQUR1QjtBQUV0Q2MsdUJBQWV0QixLQUFLc0IsYUFGa0I7QUFHdENDLGdCQUFRdkIsS0FBS3VCO0FBSHlCLE9BQWxDLENBRks7QUFPWEwsY0FBUTtBQVBHLEtBQWIsRUFRR1AsSUFSSCxDQVFRLGVBQU87QUFDYlQsY0FBUVUsR0FBUjtBQUNELEtBVkQ7QUFXRCxHQVpNLENBQVA7QUFhRCIsImZpbGUiOiJmaW5hbmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IGNvbW1vblBhcmFtcyBmcm9tICcuL2NvbW1vbkRhdGEnXHJcblxyXG4vLyDojrflj5bnj63nuqfotKLliqHmtYHmsLTliJfooahcclxuZXhwb3J0IGZ1bmN0aW9uIGdldEZpbmFuY2VMaXN0KGRhdGEpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiAnL2NsYXNzL2ZpbmFuY2lhbC9pbmRleCcsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBtZW1iZXJfaWQ6IGRhdGEubWVtYmVyX2lkLFxyXG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxyXG4gICAgICAgIHBzOiBkYXRhLnBzLFxyXG4gICAgICAgIHBuOiBkYXRhLnBuXHJcbiAgICAgIH1cclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgcmVzb2x2ZShyZXMpXHJcbiAgICB9KVxyXG4gIH0pXHJcbn1cclxuXHJcbi8vIOiOt+WPluS4quS6uui0ouWKoea1geawtOWIl+ihqFxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGVyc29uRmluYW5jZUxpc3QocGFyYW1zKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgIHVybDogJy9tZW1iZXIvY2xhc3Mvb3JkZXJMaXN0JyxcclxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcclxuICAgICAgICBjbGFzc19pZDogcGFyYW1zLmNsYXNzX2lkXHJcbiAgICAgIH0pXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHJlc29sdmUocmVzKVxyXG4gICAgfSlcclxuICB9KVxyXG59XHJcblxyXG4vLyDojrflj5bnj63nuqfotKLliqHkv6Hmga9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEZpbmFuY2VJbmZvKGRhdGEpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiAnL2NsYXNzL2ZpbmFuY2lhbC9pbmZvJyxcclxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcclxuICAgICAgICBjbGFzc19pZDogZGF0YS5jbGFzc19pZFxyXG4gICAgICB9KVxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICByZXNvbHZlKHJlcylcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG5cclxuLy8g5re75Yqg6K6i5Y2VXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRPcmRlcihkYXRhKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiAnL21vbWVudC9jb2xsZWN0aW9uL2FkZE9yZGVyJyxcclxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcclxuICAgICAgICBjbGFzc19pZDogZGF0YS5jbGFzc19pZCxcclxuICAgICAgICBzdHVkZW50X2lkczogZGF0YS5zdHVkZW50X2lkcyxcclxuICAgICAgICBjb2xsZWN0aW9uX2l0ZW1faWQ6IGRhdGEuY29sbGVjdGlvbl9pdGVtX2lkXHJcbiAgICAgIH0pLFxyXG4gICAgICBtZXRob2Q6ICdwb3N0J1xyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICByZXNvbHZlKHJlcylcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG5cclxuLy8g6I635Y+W5pSv5LuY5Y+C5pWwXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXltZW50UGFyYW1zKGRhdGEpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiAnL3BheW1lbnQvcGF5bWVudFBhcmFtcycsXHJcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XHJcbiAgICAgICAgb3JkZXJfaWQ6IGRhdGEub3JkZXJfaWQsXHJcbiAgICAgICAgcGF5bWVudF90eXBlOiAnd3hwYXknLFxyXG4gICAgICAgIHBheW1lbnRfc291cmNlOiAnbW9iaWxlJ1xyXG4gICAgICB9KSxcclxuICAgICAgbWV0aG9kOiAncG9zdCdcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgcmVzb2x2ZShyZXMpXHJcbiAgICB9KVxyXG4gIH0pXHJcbn1cclxuXHJcbi8vIOeUs+ivt+aPkOeOsFxyXG5leHBvcnQgZnVuY3Rpb24gd2l0aGRyYXdDYXNoKGRhdGEpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiAnL2NsYXNzL2NvbGxlY3Rpb24vd2l0aGRyYXdhbCcsXHJcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XHJcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXHJcbiAgICAgICAgY29sbGVjdGlvbl9pZDogZGF0YS5jb2xsZWN0aW9uX2lkLFxyXG4gICAgICAgIGFtb3VudDogZGF0YS5hbW91bnRcclxuICAgICAgfSksXHJcbiAgICAgIG1ldGhvZDogJ3Bvc3QnXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHJlc29sdmUocmVzKVxyXG4gICAgfSlcclxuICB9KVxyXG59XHJcbiJdfQ==