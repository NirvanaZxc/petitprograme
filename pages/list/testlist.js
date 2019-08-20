const fetch = require('../../utils/testfetch')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    category: [],
    catId:0,
    catType: 0,
    shops: [],
    pageIndex: 0,
    pageSize: 5,
    totalCount: 0,
    hasMore: true
  },

  loadMore() {
    let { pageIndex, pageSize, category, hasMore, catId } = this.data
    this.getCatList(pageIndex, pageSize, this.data.catId);
  },

  getCatList(pageIndex, pageSize, catId) {
    const params = { pageIndex: pageIndex * pageSize, pageSize: pageSize, category: catId }
    this.data.pageIndex = ++pageIndex;
    this.data.catId = catId;
    const hasMore = this.data.hasMore;
    if (!hasMore) {
      return;
    }
    return fetch(`/list/restaurant`, params)
      .then(res => {
        const totalCount = parseInt(res.header['X-Total-Count'])
        if (totalCount > 0) {
          const hasMore = this.data.pageIndex * this.data.pageSize < totalCount
          const shops = this.data.shops.concat(res.data)
          this.setData({ shops, totalCount, pageIndex, hasMore })
        }
        else{
          wx.showToast({
            title: res.data.message || '网络异常',
            icon: 'none',
            duration: 2000
          })
        }
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    fetch(`/category/${options.cat}`)
     .then(res => {
       this.setData({ category: res.data })
       wx.setNavigationBarTitle({ title: options.name })
       this.loadMore()
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    let { pageIndex, pageSize, category, hasMore, catId } = this.data
    this.getCatList(this.data.pageIndex, this.data.pageSize, this.data.catId).then(() => wx.stopPullDownRefresh())
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // TODO：节流
    if (!this.data.hasMore){
      return
    }
    this.loadMore()
  },

  changeCatType(e) {
    // TODO: stop previous request
    const self = this;
    const catType = e.currentTarget.dataset.type;
    this.setData({ shops: [], pageIndex: 0, hasMore: true, catType: catType })
    this.getCatList(0, 5, catType);
  },
})
