const util = require("../../utils/util.js");
const fetch = require('../../utils/logout')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    cookies: null
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
  return fetch('/session/token?_format=json', 'GET')
    .then(res => {
      if (res.statusCode == 200) {
        console.log(res.data);
        this.setData({
          cookies: res.data
        });
      }
      else {
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '网络错误'
        });
      }
    })
},

  userLogout(e) {
    var logoutUrl = `/user/logout?_format=json`
    let header = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': this.data.cookies,
    }
    console.log(header);
    return fetch(logoutUrl, 'GET', header)
        .then(res => {
          if (res.statusCode == 200) {
            wx.removeStorage({
              key: 'userInfo',
              success: function(res) {
                wx.showToast({
                  title: '退出成功!',
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

