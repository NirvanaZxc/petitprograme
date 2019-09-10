const app = getApp()

let header = {
  'content-type': 'application/json',
}


module.exports = (url, data, method, header = header) => {
  wx.showLoading({ title: 'Loading...' })
  return new Promise((resolve, reject) => {
    wx.request({
      url: app.config.apiLogin + url,
      data,
      header,
      method,
      success: resolve,
      fail: reject,
      complete: wx.hideLoading
    })
  })
}