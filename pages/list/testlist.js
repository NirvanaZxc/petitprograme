const fetch = require('../../utils/testfetch')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    category: null,
    shops: [],
    pageIndex: 0,
    pageSize: 5,
    totalCount: 0,
    hasMore: true
  },

  loadMore() {
    let { pageIndex, pageSize, searchText } = this.data
    const params = { pageIndex: ++pageIndex, pageSize: pageSize }
    if (searchText) params.q = searchText
    return fetch(`/list/restaurant`, params)
      .then(res => {
        const totalCount = parseInt(res.header['X-Total-Count'])
        const hasMore = this.data.pageIndex * this.data.pageSize < totalCount
        const shops = this.data.shops.concat(res.data)
        this.setData({ shops, totalCount, pageIndex, hasMore })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
//    fetch(`/list/restaurant`, params)
//      .then(res => {
//        this.setData({ category: res.data })
//        wx.setNavigationBarTitle({ title: "美食" })
//        this.loadMore()
//      })
    this.loadMore()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.setData({ shops: [], pageIndex: 0, hasMore: true })
    this.loadMore().then(() => wx.stopPullDownRefresh())
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // TODO：节流
    this.loadMore()
  },

  searchHandle() {
    // console.log(this.data.searchText)
    this.setData({ shops: [], pageIndex: 0, hasMore: true })
    this.loadMore()
  },

  showSearchHandle() {
    this.setData({ searchShowed: true })
  },
  hideSearchHandle() {
    this.setData({ searchText: '', searchShowed: false })
  },
  clearSearchHandle() {
    this.setData({ searchText: '' })
  },
  searchChangeHandle(e) {
    this.setData({ searchText: e.detail.value })
  }
})
