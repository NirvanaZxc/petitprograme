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
    hasMore: true,
    bundle:null,
  },

  loadMore(bundle) {
    let { pageIndex, pageSize, category, hasMore, catId } = this.data
    this.getCatList(pageIndex, pageSize, this.data.catId, bundle);
  },

  getCatList(pageIndex, pageSize, catId, bundle) {
    const params = { pageIndex: pageIndex * pageSize, pageSize: pageSize, category: catId }
    this.data.pageIndex = ++pageIndex;
    this.data.catId = catId;
    const hasMore = this.data.hasMore;
    if (!hasMore) {
      return;
    }
    switch (bundle) {
      case 'restaurant':
        var url = '/list/restaurant';
        break;
      case 'book':
        var url = '/list/book';
        break;  
      case 'appart':
        var url = '/list/appart';
        break;    
    }
    
    return fetch(url, params)
      .then(res => {
        const totalCount = parseInt(res.header['X-Total-Count'])
        if (totalCount > 0) {
          const hasMore = this.data.pageIndex * this.data.pageSize < totalCount
          const shops = this.data.shops.concat(res.data)
          const bundle = this.data.bundle
          this.setData({ shops, totalCount, pageIndex, hasMore, bundle})
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
    this.setData({ bundle: options.bundle })
    fetch(`/category/${options.cat}`)
     .then(res => {
       this.setData({ category: res.data })
       wx.setNavigationBarTitle({ title: options.name })
       this.loadMore(this.data.bundle)
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    let { pageIndex, pageSize, category, hasMore, catId, bundle } = this.data
    this.getCatList(this.data.pageIndex, this.data.pageSize, this.data.catId, this.data.bundle)
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // TODO：节流
    if (!this.data.hasMore){
      return
    }
    this.loadMore(this.data.bundle)
  },

  changeCatType(e) {
    // TODO: stop previous request
    const self = this;
    const catType = e.currentTarget.dataset.type;
    const nodeType = e.currentTarget.dataset.name;
    this.setData({ shops: [], pageIndex: 0, hasMore: true, catType: catType })
    this.getCatList(0, 5, catType, this.data.bundle);
  },
})
