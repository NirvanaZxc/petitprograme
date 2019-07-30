const fetch = require('../../utils/testfetch')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    shop: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    fetch(`/node/${options.item}`)
      .then(res => {
        console.log(res.data.title[0].value);
        this.setData({ shop: res.data })
      })
  },

})
