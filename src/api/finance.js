import wepy from 'wepy'

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

