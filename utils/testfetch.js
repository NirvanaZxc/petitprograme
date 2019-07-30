const app = getApp()

let header = {
  'content-type': 'application/json',
  'Authorization': 'Basic YWRtaW46YWRtaW4='
}

module.exports = (url, method = 'GET', header = header) => {
  wx.showLoading({ title: 'Loading...' })
  return new Promise((resolve, reject) => {
    wx.request({
      url: app.config.apiTest + url + '?_format=json',
      header,
      method,
      success: resolve,
      fail: reject,
      complete: wx.hideLoading
    })
  })
}