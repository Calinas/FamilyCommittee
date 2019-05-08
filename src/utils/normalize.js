import { getOnlyDate } from './common'

// 收款提现
export const cashWithdrawObj = item => ({
  id: item.app_id,
  desc: `${getOnlyDate(item.created_at)},您发起了一个收款，共收到${item.info.total_money}`,
  money: item.info.can_withdraw_money,
  created_at: item.created_at
})

// 个人财务流水
export const personalCashflowObj = item => ({
  class_nickname: item.info.member.class_nickname,
  money: item.pay_amount,
  time: item.updated_at
})

// 班级列表
export const classListObj = item => ({
  class: item.class
})

// 财务记账
export const cashflowObj = item => ({
  member: item.member,
  app_type: item.app_type,
  created_at: item.created_at,
  info: item.info,
  image: item.image,
  deleted_at: item.deleted_at
})
