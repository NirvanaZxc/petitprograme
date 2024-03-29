const app = getApp()

let header = {
  'content-type': 'application/json',
  'Authorization': 'Basic Zmd4eDpmZ3h4Pw=='
}

module.exports = (url, data, method = 'GET', header = header) => {
  wx.showLoading({ title: 'Loading...' })
  return new Promise((resolve, reject) => {
    wx.request({
      url: app.config.apiTest + url,
      data, 
      header,
      method,
      success: resolve,
      fail: reject,
      complete: wx.hideLoading
    })
  })
}