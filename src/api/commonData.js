function commonParams() {
  const memberInfo = wx.getStorageSync('memberInfo')
  const data = {
    member_id: memberInfo.member_id,
    member_token: memberInfo.member_token
  }
  return data
}
export default commonParams
