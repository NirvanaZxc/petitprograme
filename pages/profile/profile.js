const util = require("../../utils/util.js");
const fetch = require('../../utils/logout')

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
    var logout_token = wx.getStorageSync('userInfo').logout_token
    var csrf_token = wx.getStorageSync('userInfo').csrf_token
    var cookies = wx.getStorageSync('userInfo').cookies
    var logoutUrl = `user/logout?_format=json`
    let header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': cookies
    }
    return fetch(logoutUrl, 'GET', header)
        .then(res => {
          if (res.statusCode == 200) {
            wx.removeStorage({
              key: 'userInfo',
              success: function(res) {
                wx.showToast({
                  title: '注册成功!',
                  icon: 'success',
                  duration: 1000,
                  success: function () {
                    setTimeout(function () {
                      //要延时执行的代码
                      wx.switchTab({
                        url: '../index/index',
                      })
                    }, 2000) //延迟时间
                  },
                });
              },
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

