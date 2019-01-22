const memberInfo = wx.getStorageSync('memberInfo')
const commonParams = {
  member_id: memberInfo.member_id,
  member_token: memberInfo.member_token
}

export default commonParams
