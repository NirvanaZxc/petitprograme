const util = require("../../utils/util.js");
const fetch = require('../../utils/loginApi')
Page({
  data: {
    loginBtnTxt: "注册账户",
    loginBtnBgBgColor: "#4abdcc",
    disabled: false,
    },

  onLoad: function (options) {

  },

  formRegister: function (e) {
    let username = e.detail.value.username;
    let password = e.detail.value.password;
    let confirm_password = e.detail.value.confirm_password;
    let email = e.detail.value.email;
    if (username.length < 4 || password.length < 4 || confirm_password.length < 4) {
      wx.showToast({
        title: '用户名或密码不得为空且用户名和密码需要4 个或更多字符',
        icon: 'none',
        duration: 1000
      })
    } else if (password !== confirm_password) {
      wx.showToast({
        title: '两次输入密码不一致!',
        icon: 'none',
        duration: 1000
      })
    } else if (!email.includes('@')) {
      wx.showToast({
        title: '请输入正确的邮箱地址!',
        icon: 'none',
        duration: 1000
      })
    }else {
      const params = { name: [username], pass: [password], mail:[email] }
      return fetch(`/user/register?_format=json`, params, 'POST')
        .then(res => {
          if (res.statusCode == 200) {
            var userInfo = {
              email: res.data.mail,
              id: res.data.uid,
              loginname: res.data.name,
            };
            wx.setStorageSync('userInfo', userInfo);
            wx.showToast({
              title: '注册成功!',
              icon: 'success',
              duration: 3000,
              success: function () {
                setTimeout(function () {
                  //要延时执行的代码
                  wx.navigateBack();
                }, 4000) //延迟时间
              },
            });
          
          }
          else {
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '用户名或密码有误，请重新输入'
            });
          }
        })

    }
  }


})