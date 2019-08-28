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
      let params = {
        name: username,
        pass: password,
        mail:email
      }
      return fetch(`user/register?_format=json`, params)
        .then(res => {
          if (res.statusCode) {
            var userInfo = {
              csrf_token: res.data.csrf_token,
              logout_token: res.data.logout_token,
              id: res.data.current_user.id,
              loginname: res.data.current_user.name,
            };
            wx.setStorageSync('userInfo', userInfo);

            setTimeout(function () {
              wx.showToast({
                title: '注册成功!',
                icon: 'none',
                duration: 1000
              })
              wx.switchTab({
                url: '../index/index'
              })
            }, 3000);
          }
          else {
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '用户名或密码有误，请重新输入'
            });
            this.setLoginData2();
          }
        })

    }
  }


})