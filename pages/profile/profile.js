const util = require("../../utils/util.js");
const fetch = require('../../utils/loginApi')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },
  onShow: function () {
    //初始化加载，先判断用户登录状态
    if (!wx.getStorageSync('userInfo')) {
      wx.reLaunch({
        url: '../login/login'
      })
    }
  },
onLoad: function() {

},

  getUserInfo (e) {
    this.setData({
      userInfo: e.detail.userInfo
    })
  },
  userLogout(e) {
    return fetch(`session/token?_format=json`)
      .then(res => {
        if (res.statusCode) {
          var logoutUrl = 'user/logout?_format=json&token=' + res
          fetch(logoutUrl, '', 'GET' )
            .then(res => {
              if (res.statusCode) {
                wx.removeStorage({
                  key: 'userInfo',
                  success: function(res) {
                    wx.switchTab({
                      url: '../index/index'
                    })
                  },
                })

              }
            })
        }
        else {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '网络错误'
          });
        }
      })
  }

})
