const fetch = require('../../utils/testfetch')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    shop: {},
    bunlde:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    fetch(`/node/${options.item}`)
      .then(res => {
        this.setData({ shop: res.data })
        this.setData({ bundle: options.bundle })
        wx.setNavigationBarTitle({ title: res.data.title[0].value})
      })
  },

  previewHandle(e) {
    wx.previewImage({
      current: e.target.dataset.src,
      urls: this.data.shop.slide
    })
  },

  /**
   * Call phone
   */

  callPhone(e) {
    var phone_number = e.target.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone_number
    })
    this.setData({
      block: true
    })
  },

  callDownload(e) {
    var url = 'http://intermagasin.com/' + e.target.dataset.url
    wx.reLaunch({
      url: url,
    })

  },

})
