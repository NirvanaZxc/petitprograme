const util = require("../../utils/util.js");
const fetch = require('../../utils/loginApi')
Page({
  data: {
    loginBtnTxt: "登录",
    loginBtnBgBgColor: "#4abdcc",
    btnLoading: false,
    disabled: false,
    inputUserName: '',
    inputPassword: '',
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  formSubmit: function (e) {
    var param = e.detail.value;
    this.mysubmit(param);
  },
  mysubmit: function (param) {
    var flag = this.checkUserName(param) && this.checkPassword(param)
    if (flag) {
      this.setLoginData1();
      this.checkUserInfo(param);
    }
  },
  setLoginData1: function () {
    this.setData({
      loginBtnTxt: "登录中",
      disabled: !this.data.disabled,
      loginBtnBgBgColor: "#4abdcc",
      btnLoading: !this.data.btnLoading
    });
  },
  setLoginData2: function () {
    this.setData({
      loginBtnTxt: "登录",
      disabled: !this.data.disabled,
      loginBtnBgBgColor: "#4abdcc",
      btnLoading: !this.data.btnLoading
    });
  },
  checkUserName: function (param) {
    var inputUserName = param.username.trim();
    if (inputUserName.length >= 4) {
      return true;
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入正确的用户名'
      });
      return false;
    }
  },
  checkPassword: function (param) {
    var userName = param.username.trim();
    var password = param.password.trim();
    if (password.length <= 0) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入密码'
      });
      return false;
    } else {
      return true;
    }
  },
  checkUserInfo: function (param) {
    var username = param.username.trim();
    var password = param.password.trim();
    var that = this;
    const params = { name: username, pass: password}
    return fetch(`/user/login?_format=json`,  params, 'POST')
      .then(res => {
        if (res.statusCode == 200) {
          console.log(res.cookies);
          var userInfo = {
            csrf_token: res.data.csrf_token,
            logout_token: res.data.logout_token,
            id: res.data.current_user.uid,
            loginname: res.data.current_user.name,
            cookies: res.cookies
          };
          wx.setStorageSync('userInfo', userInfo);

          setTimeout(function () {
            that.setData({ loading: false });
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
  },

  forgotPassword(e) {
    const catType = e.currentTarget.dataset.src;
    wx.navigateTo({
      url: catType,
    })
  },
  registerCompte(e) {
    const catType = e.currentTarget.dataset.src;
    wx.navigateTo({
      url: catType,
    })
  }

})