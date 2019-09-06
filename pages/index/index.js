const fetch = require('../../utils/testfetch')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    slides: [],
    categories: [],
    interval: 5000,
    duration: 1000,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 轮播图数据渲染
    fetch("/getslides").then(res => {
      this.setData({ "slides": res.data });
   });

    // grid 列表渲染
    fetch("/theme").then(res => {
      this.setData({ "categories": res.data });
    });
  },

})
