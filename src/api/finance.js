import wepy from 'wepy'
import commonParams from './commonData'

// 获取班级财务流水列表
export function getFinanceList(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/class/financial/index',
      data: {
        member_id: data.member_id,
        class_id: data.class_id,
        ps: data.ps,
        pn: data.pn
      }
    }).then(res => {
      resolve(res)
    })
  })
}

// 获取个人财务流水列表
export function getPersonFinanceList(params) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/member/class/orderList',
      data: Object.assign({}, commonParams(), {
        class_id: params.class_id
      })
    }).then(res => {
      resolve(res)
    })
  })
}

// 获取班级财务信息
export function getFinanceInfo(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/class/financial/info',
      data: {
        member_id: data.member_id,
        class_id: data.class_id
      }
    }).then(res => {
      resolve(res)
    })
  })
}

// 添加订单
export function addOrder(data) {
  return new Promise(resolve => {
    wepy.request({
      url: '/moment/collection/addOrder',
      data: Object.assign({}, commonParams(), {
        class_id: data.class_id,
        student_ids: data.student_ids,
        collection_item_id: data.collection_item_id
      }),
      method: 'post'
    }).then(res => {
      resolve(res)
    })
  })
}

// 获取支付参数
export function getPaymentParams(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/payment/paymentParams',
      data: Object.assign({}, commonParams(), {
        order_id: data.order_id,
        payment_type: 'wxpay',
        payment_source: 'mobile'
      }),
      method: 'post'
    }).then(res => {
      resolve(res)
    })
  })
}

// 申请提现
export function withdrawCash(data) {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: '/class/collection/withdrawal',
      data: Object.assign({}, commonParams(), {
        class_id: data.class_id,
        collection_id: data.collection_id,
        amount: data.amount
      }),
      method: 'post'
    }).then(res => {
      resolve(res)
    })
  })
}
