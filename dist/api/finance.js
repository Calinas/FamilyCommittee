'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveBankInfo = undefined;
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

// 保存银行信息
var saveBankInfo = exports.saveBankInfo = function saveBankInfo(data) {
  return new Promise(function (resolve, reject) {
    _wepy2.default.request({
      url: '/member/addBank',
      data: Object.assign({}, (0, _commonData2.default)(), {
        bank_name: data.bankName,
        bank_reserved_name: data.bankReservedName,
        bank_card: data.bankCard,
        bank_mobile: data.bankMobile
      }),
      method: 'post'
    }).then(function (res) {
      resolve(res);
    });
  });
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbmFuY2UuanMiXSwibmFtZXMiOlsiZ2V0RmluYW5jZUxpc3QiLCJnZXRQZXJzb25GaW5hbmNlTGlzdCIsImdldEZpbmFuY2VJbmZvIiwiYWRkT3JkZXIiLCJnZXRQYXltZW50UGFyYW1zIiwid2l0aGRyYXdDYXNoIiwiZGF0YSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwid2VweSIsInJlcXVlc3QiLCJ1cmwiLCJtZW1iZXJfaWQiLCJjbGFzc19pZCIsInBzIiwicG4iLCJ0aGVuIiwicmVzIiwicGFyYW1zIiwiT2JqZWN0IiwiYXNzaWduIiwic3R1ZGVudF9pZHMiLCJjb2xsZWN0aW9uX2l0ZW1faWQiLCJtZXRob2QiLCJvcmRlcl9pZCIsInBheW1lbnRfdHlwZSIsInBheW1lbnRfc291cmNlIiwiY29sbGVjdGlvbl9pZCIsImFtb3VudCIsInNhdmVCYW5rSW5mbyIsImJhbmtfbmFtZSIsImJhbmtOYW1lIiwiYmFua19yZXNlcnZlZF9uYW1lIiwiYmFua1Jlc2VydmVkTmFtZSIsImJhbmtfY2FyZCIsImJhbmtDYXJkIiwiYmFua19tb2JpbGUiLCJiYW5rTW9iaWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7UUFJZ0JBLGMsR0FBQUEsYztRQWlCQUMsb0IsR0FBQUEsb0I7UUFjQUMsYyxHQUFBQSxjO1FBY0FDLFEsR0FBQUEsUTtRQWlCQUMsZ0IsR0FBQUEsZ0I7UUFpQkFDLFksR0FBQUEsWTs7QUFuRmhCOzs7O0FBQ0E7Ozs7OztBQUVBO0FBQ08sU0FBU0wsY0FBVCxDQUF3Qk0sSUFBeEIsRUFBOEI7QUFDbkMsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLFdBQUssd0JBRE07QUFFWE4sWUFBTTtBQUNKTyxtQkFBV1AsS0FBS08sU0FEWjtBQUVKQyxrQkFBVVIsS0FBS1EsUUFGWDtBQUdKQyxZQUFJVCxLQUFLUyxFQUhMO0FBSUpDLFlBQUlWLEtBQUtV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UTtBQUNsQyxTQUFPLElBQUl2QixPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLFdBQUssaUJBRE07QUFFWE4sWUFBTWMsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsMkJBQWxCLEVBQWtDO0FBQ3RDVSxtQkFBV3pCLEtBQUswQixRQURzQjtBQUV0Q0MsNEJBQW9CM0IsS0FBSzRCLGdCQUZhO0FBR3RDQyxtQkFBVzdCLEtBQUs4QixRQUhzQjtBQUl0Q0MscUJBQWEvQixLQUFLZ0M7QUFKb0IsT0FBbEMsQ0FGSztBQVFYZCxjQUFRO0FBUkcsS0FBYixFQVNHUCxJQVRILENBU1EsZUFBTztBQUNiVCxjQUFRVSxHQUFSO0FBQ0QsS0FYRDtBQVlELEdBYk0sQ0FBUDtBQWNELENBZk0iLCJmaWxlIjoiZmluYW5jZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBjb21tb25QYXJhbXMgZnJvbSAnLi9jb21tb25EYXRhJ1xyXG5cclxuLy8g6I635Y+W54+t57qn6LSi5Yqh5rWB5rC05YiX6KGoXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRGaW5hbmNlTGlzdChkYXRhKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgIHVybDogJy9jbGFzcy9maW5hbmNpYWwvaW5kZXgnLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgbWVtYmVyX2lkOiBkYXRhLm1lbWJlcl9pZCxcclxuICAgICAgICBjbGFzc19pZDogZGF0YS5jbGFzc19pZCxcclxuICAgICAgICBwczogZGF0YS5wcyxcclxuICAgICAgICBwbjogZGF0YS5wblxyXG4gICAgICB9XHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHJlc29sdmUocmVzKVxyXG4gICAgfSlcclxuICB9KVxyXG59XHJcblxyXG4vLyDojrflj5bkuKrkurrotKLliqHmtYHmsLTliJfooahcclxuZXhwb3J0IGZ1bmN0aW9uIGdldFBlcnNvbkZpbmFuY2VMaXN0KHBhcmFtcykge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICB1cmw6ICcvbWVtYmVyL2NsYXNzL29yZGVyTGlzdCcsXHJcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XHJcbiAgICAgICAgY2xhc3NfaWQ6IHBhcmFtcy5jbGFzc19pZFxyXG4gICAgICB9KVxyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICByZXNvbHZlKHJlcylcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG5cclxuLy8g6I635Y+W54+t57qn6LSi5Yqh5L+h5oGvXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRGaW5hbmNlSW5mbyhkYXRhKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgIHVybDogJy9jbGFzcy9maW5hbmNpYWwvaW5mbycsXHJcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XHJcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWRcclxuICAgICAgfSlcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgcmVzb2x2ZShyZXMpXHJcbiAgICB9KVxyXG4gIH0pXHJcbn1cclxuXHJcbi8vIOa3u+WKoOiuouWNlVxyXG5leHBvcnQgZnVuY3Rpb24gYWRkT3JkZXIoZGF0YSkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgIHVybDogJy9tb21lbnQvY29sbGVjdGlvbi9hZGRPcmRlcicsXHJcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblBhcmFtcygpLCB7XHJcbiAgICAgICAgY2xhc3NfaWQ6IGRhdGEuY2xhc3NfaWQsXHJcbiAgICAgICAgc3R1ZGVudF9pZHM6IGRhdGEuc3R1ZGVudF9pZHMsXHJcbiAgICAgICAgY29sbGVjdGlvbl9pdGVtX2lkOiBkYXRhLmNvbGxlY3Rpb25faXRlbV9pZFxyXG4gICAgICB9KSxcclxuICAgICAgbWV0aG9kOiAncG9zdCdcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgcmVzb2x2ZShyZXMpXHJcbiAgICB9KVxyXG4gIH0pXHJcbn1cclxuXHJcbi8vIOiOt+WPluaUr+S7mOWPguaVsFxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGF5bWVudFBhcmFtcyhkYXRhKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgIHVybDogJy9wYXltZW50L3BheW1lbnRQYXJhbXMnLFxyXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xyXG4gICAgICAgIG9yZGVyX2lkOiBkYXRhLm9yZGVyX2lkLFxyXG4gICAgICAgIHBheW1lbnRfdHlwZTogJ3d4cGF5JyxcclxuICAgICAgICBwYXltZW50X3NvdXJjZTogJ21vYmlsZSdcclxuICAgICAgfSksXHJcbiAgICAgIG1ldGhvZDogJ3Bvc3QnXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHJlc29sdmUocmVzKVxyXG4gICAgfSlcclxuICB9KVxyXG59XHJcblxyXG4vLyDnlLPor7fmj5DnjrBcclxuZXhwb3J0IGZ1bmN0aW9uIHdpdGhkcmF3Q2FzaChkYXRhKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgIHVybDogJy9jbGFzcy9jb2xsZWN0aW9uL3dpdGhkcmF3YWwnLFxyXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25QYXJhbXMoKSwge1xyXG4gICAgICAgIGNsYXNzX2lkOiBkYXRhLmNsYXNzX2lkLFxyXG4gICAgICAgIGNvbGxlY3Rpb25faWQ6IGRhdGEuY29sbGVjdGlvbl9pZCxcclxuICAgICAgICBhbW91bnQ6IGRhdGEuYW1vdW50XHJcbiAgICAgIH0pLFxyXG4gICAgICBtZXRob2Q6ICdwb3N0J1xyXG4gICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICByZXNvbHZlKHJlcylcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG5cclxuLy8g5L+d5a2Y6ZO26KGM5L+h5oGvXHJcbmV4cG9ydCBjb25zdCBzYXZlQmFua0luZm8gPSBkYXRhID0+IHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiAnL21lbWJlci9hZGRCYW5rJyxcclxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uUGFyYW1zKCksIHtcclxuICAgICAgICBiYW5rX25hbWU6IGRhdGEuYmFua05hbWUsXHJcbiAgICAgICAgYmFua19yZXNlcnZlZF9uYW1lOiBkYXRhLmJhbmtSZXNlcnZlZE5hbWUsXHJcbiAgICAgICAgYmFua19jYXJkOiBkYXRhLmJhbmtDYXJkLFxyXG4gICAgICAgIGJhbmtfbW9iaWxlOiBkYXRhLmJhbmtNb2JpbGVcclxuICAgICAgfSksXHJcbiAgICAgIG1ldGhvZDogJ3Bvc3QnXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgIHJlc29sdmUocmVzKVxyXG4gICAgfSlcclxuICB9KVxyXG59Il19