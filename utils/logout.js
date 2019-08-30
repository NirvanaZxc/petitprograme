const app = getApp()

module.exports = (url, method, header ) => {
  wx.showLoading({ title: 'Loading...' })
  return new Promise((resolve, reject) => {
    wx.request({
      url: app.config.apiLogin + url,
      header,
      method,
      success: resolve,
      fail: reject,
      complete: wx.hideLoading
    })
  })
}